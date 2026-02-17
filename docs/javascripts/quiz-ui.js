(function () {
  'use strict';

  // =========================================================================
  //  STATE
  // =========================================================================
  var state = {
    questions: [],
    activeIndex: 0,
    answers: {},        // { 0: 'A', ... }
    checked: {},        // { 0: true, ... }
    results: {},        // { 0: true/false, ... }
    mode: 'practice',   // 'practice' | 'exam'
    showSummary: false
  };

  // =========================================================================
  //  DOM REFS  (populated during build)
  // =========================================================================
  var quizAppEl = null;
  var modeBarEl = null;
  var navListEl = null;
  var navProgressEl = null;
  var contentEl = null;
  var qnumEl = null;
  var conceptEl = null;
  var progressWrapEl = null;
  var progressBarEl = null;
  var progressFillEl = null;
  var progressPctEl = null;
  var bodyWrapEl = null;
  var questionEl = null;
  var choicesEl = null;
  var checkBtn = null;
  var finishBtn = null;
  var feedbackEl = null;
  var prevBtn = null;
  var nextBtn = null;
  var badgeEl = null;

  // =========================================================================
  //  DETECTION — is the current page a quiz?
  // =========================================================================
  function isQuizPage() {
    var article = document.querySelector('article.md-content__inner') ||
                  document.querySelector('.md-content__inner');
    if (!article) return false;
    var h4s = article.querySelectorAll('h4');
    if (h4s.length < 2) return false;
    return /^\s*1\./.test(h4s[0].textContent);
  }

  // =========================================================================
  //  PARSING — extract questions from the rendered markdown DOM
  // =========================================================================
  function parseQuestions() {
    var article = document.querySelector('article.md-content__inner') ||
                  document.querySelector('.md-content__inner');
    if (!article) return [];

    var questions = [];
    var h4s = article.querySelectorAll('h4');

    for (var i = 0; i < h4s.length; i++) {
      var h4 = h4s[i];
      var match = h4.textContent.match(/^\s*(\d+)\.\s*([\s\S]*)/);
      if (!match) continue;

      var qNum = parseInt(match[1], 10);
      var questionHTML = h4.innerHTML.replace(/^\s*\d+\.\s*/, '');
      var questionText = match[2].trim();

      var choicesDiv = null, answerP = null, conceptP = null;
      var sibling = h4.nextElementSibling;

      while (sibling && sibling.tagName !== 'H4' && sibling.tagName !== 'H2') {
        if (sibling.classList && sibling.classList.contains('upper-alpha')) {
          choicesDiv = sibling;
        } else if (sibling.tagName === 'P') {
          var firstStrong = sibling.querySelector('strong');
          if (firstStrong) {
            var txt = firstStrong.textContent.trim();
            if (txt === 'Answer:') answerP = sibling;
            else if (txt === 'Concept Tested:') conceptP = sibling;
          }
        }
        sibling = sibling.nextElementSibling;
      }

      var correctLetter = '';
      if (answerP) {
        var strongs = answerP.querySelectorAll('strong');
        if (strongs.length >= 2) correctLetter = strongs[1].textContent.trim();
      }

      var choices = [];
      if (choicesDiv) {
        var lis = choicesDiv.querySelectorAll('li');
        for (var j = 0; j < lis.length; j++) choices.push(lis[j].innerHTML);
      }

      var explanationHTML = answerP ? answerP.innerHTML : '';
      var conceptText = '';
      if (conceptP) conceptText = conceptP.textContent.replace(/^.*Concept Tested:\s*/, '').trim();

      questions.push({
        num: qNum,
        questionHTML: questionHTML,
        questionText: questionText,
        choices: choices,
        correctLetter: correctLetter,
        correctIndex: correctLetter.charCodeAt(0) - 65,
        explanationHTML: explanationHTML,
        conceptText: conceptText
      });
    }
    return questions;
  }

  // =========================================================================
  //  BUILD — mode bar (practice / exam toggle)
  // =========================================================================
  function buildModeBar() {
    var bar = document.createElement('div');
    bar.className = 'quiz-mode-bar';

    var label = document.createElement('span');
    label.className = 'quiz-mode-bar__label';
    label.textContent = 'Mode:';
    bar.appendChild(label);

    var practiceBtn = document.createElement('button');
    practiceBtn.className = 'quiz-mode-btn quiz-mode-btn--active';
    practiceBtn.setAttribute('data-mode', 'practice');
    practiceBtn.innerHTML = '<span class="quiz-mode-btn__icon">&#128214;</span> Practice';

    var examBtn = document.createElement('button');
    examBtn.className = 'quiz-mode-btn';
    examBtn.setAttribute('data-mode', 'exam');
    examBtn.innerHTML = '<span class="quiz-mode-btn__icon">&#128221;</span> Exam';

    bar.appendChild(practiceBtn);
    bar.appendChild(examBtn);

    bar.addEventListener('click', function (e) {
      var btn = e.target.closest('.quiz-mode-btn');
      if (!btn) return;
      var newMode = btn.getAttribute('data-mode');
      if (newMode === state.mode) return;
      setMode(newMode);
    });

    modeBarEl = bar;
    return bar;
  }

  function setMode(newMode) {
    state.mode = newMode;
    // Update button active states
    var btns = modeBarEl.querySelectorAll('.quiz-mode-btn');
    for (var i = 0; i < btns.length; i++) {
      btns[i].classList.toggle('quiz-mode-btn--active', btns[i].getAttribute('data-mode') === newMode);
    }
    // Reset quiz state
    state.answers = {};
    state.checked = {};
    state.results = {};
    state.showSummary = false;
    state.activeIndex = 0;
    // Reset nav indicators
    resetNavIndicators();
    updateProgressCount();
    updateProgressBar();
    // Show finish button only in exam mode
    finishBtn.style.display = (newMode === 'exam') ? '' : 'none';
    renderQuestion(0);
  }

  // =========================================================================
  //  BUILD — main quiz app
  // =========================================================================
  function buildQuizApp(questions) {
    var app = document.createElement('div');
    app.className = 'quiz-app';
    app.setAttribute('role', 'application');
    app.setAttribute('aria-label', 'Interactive Quiz');

    // ---- Left nav ----
    var nav = document.createElement('nav');
    nav.className = 'quiz-nav';
    nav.setAttribute('role', 'navigation');
    nav.setAttribute('aria-label', 'Question navigation');

    var header = document.createElement('div');
    header.className = 'quiz-nav__header';
    header.textContent = 'Questions';
    nav.appendChild(header);

    navListEl = document.createElement('ul');
    navListEl.className = 'quiz-nav__list';

    for (var i = 0; i < questions.length; i++) {
      var item = document.createElement('li');
      item.className = 'quiz-nav__item';
      item.setAttribute('data-q', i);

      var num = document.createElement('span');
      num.className = 'quiz-nav__num';
      num.textContent = questions[i].num;

      var lbl = document.createElement('span');
      lbl.className = 'quiz-nav__label';
      lbl.textContent = 'Question ' + questions[i].num;

      var status = document.createElement('span');
      status.className = 'quiz-nav__status quiz-nav__status--unanswered';
      status.innerHTML = '&#9679;'; // small filled circle for unanswered

      item.appendChild(num);
      item.appendChild(lbl);
      item.appendChild(status);
      navListEl.appendChild(item);
    }
    nav.appendChild(navListEl);

    navProgressEl = document.createElement('div');
    navProgressEl.className = 'quiz-nav__progress';
    navProgressEl.textContent = '0 / ' + questions.length + ' answered';
    nav.appendChild(navProgressEl);

    app.appendChild(nav);

    // ---- Right content ----
    contentEl = document.createElement('main');
    contentEl.className = 'quiz-content';

    // Header row
    var headerRow = document.createElement('div');
    headerRow.className = 'quiz-content__header';

    qnumEl = document.createElement('span');
    qnumEl.className = 'quiz-content__qnum';

    conceptEl = document.createElement('span');
    conceptEl.className = 'quiz-content__concept';

    // Completion badge (hidden initially)
    badgeEl = document.createElement('span');
    badgeEl.className = 'quiz-badge quiz-badge--complete';
    badgeEl.innerHTML = '&#10003; Complete';
    badgeEl.style.display = 'none';

    headerRow.appendChild(qnumEl);
    headerRow.appendChild(badgeEl);
    headerRow.appendChild(conceptEl);
    contentEl.appendChild(headerRow);

    // Progress bar with percentage wrapper
    progressWrapEl = document.createElement('div');
    progressWrapEl.className = 'quiz-progress-wrap';

    progressBarEl = document.createElement('div');
    progressBarEl.className = 'quiz-progress';
    progressFillEl = document.createElement('div');
    progressFillEl.className = 'quiz-progress__fill';
    progressBarEl.appendChild(progressFillEl);

    progressPctEl = document.createElement('span');
    progressPctEl.className = 'quiz-progress__pct';
    progressPctEl.textContent = '0%';

    progressWrapEl.appendChild(progressBarEl);
    progressWrapEl.appendChild(progressPctEl);
    contentEl.appendChild(progressWrapEl);

    // Body wrapper for slide transition
    bodyWrapEl = document.createElement('div');
    bodyWrapEl.className = 'quiz-content__body';

    // Question text
    questionEl = document.createElement('div');
    questionEl.className = 'quiz-content__question';
    bodyWrapEl.appendChild(questionEl);

    // Choices container
    choicesEl = document.createElement('div');
    choicesEl.className = 'quiz-content__choices';
    choicesEl.setAttribute('role', 'radiogroup');
    choicesEl.setAttribute('aria-label', 'Answer choices');
    bodyWrapEl.appendChild(choicesEl);

    // Action buttons row
    var actionsDiv = document.createElement('div');
    actionsDiv.className = 'quiz-content__actions';

    checkBtn = document.createElement('button');
    checkBtn.className = 'quiz-btn quiz-btn--check';
    checkBtn.textContent = 'Check Answer';
    checkBtn.disabled = true;

    finishBtn = document.createElement('button');
    finishBtn.className = 'quiz-btn quiz-btn--finish';
    finishBtn.textContent = 'Finish Exam';
    finishBtn.style.display = 'none'; // hidden in practice mode

    actionsDiv.appendChild(checkBtn);
    actionsDiv.appendChild(finishBtn);
    bodyWrapEl.appendChild(actionsDiv);

    // Feedback area
    feedbackEl = document.createElement('div');
    feedbackEl.className = 'quiz-content__feedback';
    feedbackEl.setAttribute('aria-live', 'polite');
    feedbackEl.hidden = true;
    bodyWrapEl.appendChild(feedbackEl);

    contentEl.appendChild(bodyWrapEl);

    // Nav buttons (outside body wrapper so they don't slide)
    var navBtns = document.createElement('div');
    navBtns.className = 'quiz-content__nav-buttons';

    prevBtn = document.createElement('button');
    prevBtn.className = 'quiz-btn quiz-btn--prev';
    prevBtn.innerHTML = '&larr; Previous';

    nextBtn = document.createElement('button');
    nextBtn.className = 'quiz-btn quiz-btn--next';
    nextBtn.innerHTML = 'Next &rarr;';

    navBtns.appendChild(prevBtn);
    navBtns.appendChild(nextBtn);
    contentEl.appendChild(navBtns);

    app.appendChild(contentEl);

    // ---- Event listeners ----
    navListEl.addEventListener('click', function (e) {
      var el = e.target.closest('.quiz-nav__item');
      if (!el) return;
      // Block locked items in exam mode
      if (el.classList.contains('quiz-nav__item--locked')) return;
      var idx = parseInt(el.getAttribute('data-q'), 10);
      if (state.showSummary) {
        state.showSummary = false;
        showQuizContent();
      }
      goToQuestion(idx);
    });

    checkBtn.addEventListener('click', function () { checkAnswer(); });
    finishBtn.addEventListener('click', function () { showScoreSummary(); });
    prevBtn.addEventListener('click', function () { goToQuestion(state.activeIndex - 1); });
    nextBtn.addEventListener('click', function () { goToQuestion(state.activeIndex + 1); });

    quizAppEl = app;
    return app;
  }

  // =========================================================================
  //  RENDER — single question in the right panel
  // =========================================================================
  function renderQuestion(index) {
    var q = state.questions[index];
    if (!q) return;

    state.activeIndex = index;

    // Update nav active state + locking
    updateNavStates(index);

    // Scroll active nav item into view
    var activeItem = navListEl.querySelector('.quiz-nav__item--active');
    if (activeItem) {
      activeItem.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }

    // Header
    qnumEl.textContent = 'Question ' + q.num + ' of ' + state.questions.length;
    conceptEl.textContent = q.conceptText;

    // Progress bar
    updateProgressBar();

    // Trigger slide-in animation by re-adding the body wrapper
    triggerSlideIn();

    // Question text
    questionEl.innerHTML = q.questionHTML;

    // Choices
    choicesEl.innerHTML = '';
    var letters = ['A', 'B', 'C', 'D'];
    for (var j = 0; j < q.choices.length; j++) {
      var label = document.createElement('label');
      label.className = 'quiz-choice';

      var radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz-answer';
      radio.value = letters[j];
      radio.className = 'quiz-choice__radio';

      var letterSpan = document.createElement('span');
      letterSpan.className = 'quiz-choice__letter';
      letterSpan.textContent = letters[j];

      var textSpan = document.createElement('span');
      textSpan.className = 'quiz-choice__text';
      textSpan.innerHTML = q.choices[j];

      label.appendChild(radio);
      label.appendChild(letterSpan);
      label.appendChild(textSpan);

      // Pre-select if previously answered
      if (state.answers[index] === letters[j]) {
        radio.checked = true;
        label.classList.add('quiz-choice--selected');
      }

      // Radio change handler (closure)
      (function (lbl, val) {
        radio.addEventListener('change', function () {
          if (state.checked[index]) return;
          state.answers[index] = val;
          var allLabels = choicesEl.querySelectorAll('.quiz-choice');
          for (var k = 0; k < allLabels.length; k++) {
            allLabels[k].classList.toggle(
              'quiz-choice--selected',
              allLabels[k].querySelector('.quiz-choice__radio').checked
            );
          }
          checkBtn.disabled = false;
        });
      })(label, letters[j]);

      choicesEl.appendChild(label);
    }

    // Show result state if already checked
    if (state.checked[index]) {
      disableChoices(q, index);
      checkBtn.disabled = true;
      // Show feedback: always in practice; in exam only after summary
      if (state.mode === 'practice' || state.showSummary) {
        showFeedback(state.results[index], q);
      } else {
        feedbackEl.hidden = true;
        feedbackEl.innerHTML = '';
        feedbackEl.className = 'quiz-content__feedback';
      }
    } else {
      feedbackEl.hidden = true;
      feedbackEl.innerHTML = '';
      feedbackEl.className = 'quiz-content__feedback';
      checkBtn.disabled = !state.answers[index];
    }

    // Prev/Next
    prevBtn.disabled = (index === 0);
    nextBtn.disabled = (index === state.questions.length - 1);

    // URL sync
    syncURL(q.num);

    // MathJax re-typeset
    retypeset(contentEl);
  }

  // Trigger CSS slide-in animation on the body wrapper
  function triggerSlideIn() {
    if (!bodyWrapEl) return;
    bodyWrapEl.classList.remove('quiz-content__body');
    // Force reflow to restart animation
    void bodyWrapEl.offsetWidth;
    bodyWrapEl.classList.add('quiz-content__body');
  }

  // =========================================================================
  //  CHECK ANSWER
  // =========================================================================
  function checkAnswer() {
    var idx = state.activeIndex;
    var selected = state.answers[idx];
    if (!selected) return;

    var q = state.questions[idx];
    var isCorrect = (selected === q.correctLetter);

    state.checked[idx] = true;
    state.results[idx] = isCorrect;

    disableChoices(q, idx);
    checkBtn.disabled = true;

    if (state.mode === 'practice') {
      // Practice: show feedback immediately
      showFeedback(isCorrect, q);
      updateNavItemStatus(idx, isCorrect);
    } else {
      // Exam: just record, no feedback yet — show "answered" in nav
      updateNavItemAnswered(idx);
    }

    updateProgressCount();
    updateProgressBar();
    updateNavStates(state.activeIndex);
  }

  function disableChoices(q, idx) {
    var labels = choicesEl.querySelectorAll('.quiz-choice');
    var letters = ['A', 'B', 'C', 'D'];

    if (state.mode === 'practice' || state.showSummary) {
      // Show correct/incorrect highlighting
      for (var i = 0; i < labels.length; i++) {
        labels[i].classList.add('quiz-choice--disabled');
        labels[i].querySelector('.quiz-choice__radio').disabled = true;
        if (letters[i] === q.correctLetter) {
          labels[i].classList.add('quiz-choice--correct');
        }
        if (letters[i] === state.answers[idx] && letters[i] !== q.correctLetter) {
          labels[i].classList.add('quiz-choice--incorrect');
          // Add shake in exam review reveal
          if (state.showSummary && state.mode === 'exam') {
            labels[i].classList.add('quiz-choice--shake');
          }
        }
      }
    } else {
      // Exam mode before finish: just disable, no color hints
      for (var j = 0; j < labels.length; j++) {
        labels[j].classList.add('quiz-choice--disabled');
        labels[j].querySelector('.quiz-choice__radio').disabled = true;
      }
    }
  }

  function showFeedback(isCorrect, q) {
    feedbackEl.hidden = false;
    feedbackEl.className = 'quiz-content__feedback ' +
      (isCorrect ? 'quiz-content__feedback--correct' : 'quiz-content__feedback--incorrect');

    var resultDiv = document.createElement('div');
    resultDiv.className = 'quiz-feedback__result ' +
      (isCorrect ? 'quiz-feedback__result--correct' : 'quiz-feedback__result--incorrect');
    resultDiv.innerHTML = isCorrect
      ? '<span>&#10003;</span> Correct!'
      : '<span>&#10007;</span> Incorrect &mdash; the correct answer is ' + q.correctLetter + '.';

    var explanationDiv = document.createElement('div');
    explanationDiv.className = 'quiz-feedback__explanation';
    var cleanExplanation = q.explanationHTML
      .replace(/<strong>Answer:<\/strong>\s*/, '')
      .replace(/The correct answer is <strong>[A-D]<\/strong>\.\s*/, '');
    explanationDiv.innerHTML = cleanExplanation;

    var conceptDiv = document.createElement('div');
    conceptDiv.className = 'quiz-feedback__concept';
    conceptDiv.textContent = 'Concept: ' + q.conceptText;

    feedbackEl.innerHTML = '';
    feedbackEl.appendChild(resultDiv);
    feedbackEl.appendChild(explanationDiv);
    feedbackEl.appendChild(conceptDiv);

    retypeset(feedbackEl);
  }

  // =========================================================================
  //  NAV ITEM STATUS — icons, colors & locking
  // =========================================================================
  function updateNavItemStatus(idx, isCorrect) {
    var items = navListEl.querySelectorAll('.quiz-nav__item');
    if (!items[idx]) return;
    items[idx].classList.remove('quiz-nav__item--correct', 'quiz-nav__item--incorrect');
    items[idx].classList.add(isCorrect ? 'quiz-nav__item--correct' : 'quiz-nav__item--incorrect');

    var statusEl = items[idx].querySelector('.quiz-nav__status');
    if (statusEl) {
      statusEl.className = 'quiz-nav__status ' +
        (isCorrect ? 'quiz-nav__status--correct' : 'quiz-nav__status--incorrect');
      statusEl.innerHTML = isCorrect ? '&#10003;' : '&#10007;';
      statusEl.style.color = '';
    }
  }

  // Exam mode: grey check = "answered but not graded yet"
  function updateNavItemAnswered(idx) {
    var items = navListEl.querySelectorAll('.quiz-nav__item');
    if (!items[idx]) return;
    var statusEl = items[idx].querySelector('.quiz-nav__status');
    if (statusEl) {
      statusEl.className = 'quiz-nav__status';
      statusEl.style.color = '#9e9e9e';
      statusEl.innerHTML = '&#9679;';  // filled circle
    }
  }

  // Update active highlight + exam-mode locking
  function updateNavStates(activeIdx) {
    var items = navListEl.querySelectorAll('.quiz-nav__item');
    for (var i = 0; i < items.length; i++) {
      // Active state
      items[i].classList.toggle('quiz-nav__item--active', i === activeIdx);

      // Exam-mode locking: lock future unanswered questions
      // Allow: current, answered, and the first unanswered (next to answer)
      if (state.mode === 'exam' && !state.showSummary) {
        var isAnswered = !!state.checked[i];
        var isCurrent = (i === activeIdx);
        var isNextUnanswered = false;

        // Find the first unanswered question index
        if (!isAnswered && !isCurrent) {
          var firstUnanswered = -1;
          for (var j = 0; j < state.questions.length; j++) {
            if (!state.checked[j]) { firstUnanswered = j; break; }
          }
          isNextUnanswered = (i === firstUnanswered);
        }

        if (isAnswered || isCurrent || isNextUnanswered) {
          items[i].classList.remove('quiz-nav__item--locked');
        } else {
          items[i].classList.add('quiz-nav__item--locked');
        }
      } else {
        // Practice mode or review: no locking
        items[i].classList.remove('quiz-nav__item--locked');
      }
    }
  }

  // Reset all nav indicators to unanswered state
  function resetNavIndicators() {
    var items = navListEl.querySelectorAll('.quiz-nav__item');
    for (var j = 0; j < items.length; j++) {
      items[j].classList.remove('quiz-nav__item--correct', 'quiz-nav__item--incorrect', 'quiz-nav__item--locked');
      var statusEl = items[j].querySelector('.quiz-nav__status');
      if (statusEl) {
        statusEl.className = 'quiz-nav__status quiz-nav__status--unanswered';
        statusEl.innerHTML = '&#9679;';
        statusEl.style.color = '';
      }
    }
  }

  // =========================================================================
  //  PROGRESS — text counter + animated bar + percentage
  // =========================================================================
  function getAnsweredCount() {
    var count = 0;
    for (var key in state.checked) {
      if (state.checked[key]) count++;
    }
    return count;
  }

  function updateProgressCount() {
    var count = getAnsweredCount();
    navProgressEl.textContent = count + ' / ' + state.questions.length + ' answered';
  }

  function updateProgressBar() {
    var count = getAnsweredCount();
    var total = state.questions.length;
    var pct = total > 0 ? Math.round((count / total) * 100) : 0;

    progressFillEl.style.width = pct + '%';

    // Update percentage text
    if (progressPctEl) {
      progressPctEl.textContent = pct + '%';
      progressPctEl.classList.toggle('quiz-progress__pct--complete', pct >= 100);
    }

    if (pct >= 100) {
      progressFillEl.classList.add('quiz-progress__fill--complete');
    } else {
      progressFillEl.classList.remove('quiz-progress__fill--complete');
    }

    // Show/hide completion badge
    updateCompletionBadge(count >= total && total > 0);
  }

  function updateCompletionBadge(isComplete) {
    if (!badgeEl) return;
    if (isComplete) {
      badgeEl.style.display = '';
    } else {
      badgeEl.style.display = 'none';
    }
  }

  // =========================================================================
  //  SCORE SUMMARY (both modes)
  // =========================================================================
  function showScoreSummary() {
    state.showSummary = true;

    // In exam mode, reveal all results in nav now
    if (state.mode === 'exam') {
      for (var k = 0; k < state.questions.length; k++) {
        if (state.checked[k]) {
          updateNavItemStatus(k, state.results[k]);
        }
      }
      // Remove all locking in review
      var items = navListEl.querySelectorAll('.quiz-nav__item');
      for (var m = 0; m < items.length; m++) {
        items[m].classList.remove('quiz-nav__item--locked');
      }
    }

    // Calculate stats
    var total = state.questions.length;
    var correct = 0, incorrect = 0, skipped = 0;
    for (var i = 0; i < total; i++) {
      if (!state.checked[i]) { skipped++; continue; }
      if (state.results[i]) correct++;
      else incorrect++;
    }
    var pct = total > 0 ? Math.round((correct / total) * 100) : 0;

    // Hide question content, show summary
    contentEl.innerHTML = '';

    var summary = document.createElement('div');
    summary.className = 'quiz-summary';

    // Score ring
    var circumference = 2 * Math.PI * 60; // r=60
    var ringClass = pct >= 70 ? 'good' : pct >= 50 ? 'ok' : 'poor';

    var ringHTML = '<div class="quiz-summary__score-ring">' +
      '<svg viewBox="0 0 140 140">' +
      '<circle class="quiz-summary__ring-bg" cx="70" cy="70" r="60"></circle>' +
      '<circle class="quiz-summary__ring-fill quiz-summary__ring-fill--' + ringClass + '" cx="70" cy="70" r="60" ' +
      'stroke-dasharray="' + circumference + '" ' +
      'stroke-dashoffset="' + circumference + '"></circle>' +
      '</svg>' +
      '<div class="quiz-summary__score-text">' + pct + '%' +
      '<span class="quiz-summary__score-label">Score</span></div></div>';

    summary.innerHTML = ringHTML +
      '<div class="quiz-summary__title">Quiz Complete!</div>' +
      '<div class="quiz-summary__subtitle">You answered ' + correct + ' out of ' + total + ' questions correctly.</div>';

    // Breakdown stats
    var breakdown = document.createElement('div');
    breakdown.className = 'quiz-summary__breakdown';
    breakdown.innerHTML =
      '<div class="quiz-summary__stat"><div class="quiz-summary__stat-num quiz-summary__stat-num--correct">' + correct + '</div><div class="quiz-summary__stat-label">Correct</div></div>' +
      '<div class="quiz-summary__stat"><div class="quiz-summary__stat-num quiz-summary__stat-num--incorrect">' + incorrect + '</div><div class="quiz-summary__stat-label">Incorrect</div></div>' +
      '<div class="quiz-summary__stat"><div class="quiz-summary__stat-num quiz-summary__stat-num--skipped">' + skipped + '</div><div class="quiz-summary__stat-label">Skipped</div></div>';
    summary.appendChild(breakdown);

    // Review list
    var review = document.createElement('div');
    review.className = 'quiz-summary__review';
    review.innerHTML = '<div class="quiz-summary__review-title">Question Review</div>';

    for (var r = 0; r < state.questions.length; r++) {
      var q = state.questions[r];
      var rItem = document.createElement('div');
      rItem.className = 'quiz-summary__review-item';
      rItem.setAttribute('data-q', r);

      var icon = '';
      if (!state.checked[r]) icon = '<span class="quiz-summary__review-icon" style="color:#9e9e9e">&#8212;</span>';
      else if (state.results[r]) icon = '<span class="quiz-summary__review-icon" style="color:#4caf50">&#10003;</span>';
      else icon = '<span class="quiz-summary__review-icon" style="color:#f44336">&#10007;</span>';

      rItem.innerHTML = icon +
        '<span class="quiz-summary__review-q">Q' + q.num + '</span>' +
        '<span class="quiz-summary__review-text">' + q.questionText + '</span>';

      review.appendChild(rItem);
    }
    summary.appendChild(review);

    // Click review items to go to that question
    review.addEventListener('click', function (e) {
      var el = e.target.closest('.quiz-summary__review-item');
      if (!el) return;
      var idx = parseInt(el.getAttribute('data-q'), 10);
      rebuildContentPanel();
      renderQuestion(idx);
    });

    // Action buttons
    var actions = document.createElement('div');
    actions.className = 'quiz-summary__actions';

    var restartBtn = document.createElement('button');
    restartBtn.className = 'quiz-btn quiz-btn--restart';
    restartBtn.textContent = 'Restart Quiz';
    restartBtn.addEventListener('click', function () {
      state.answers = {};
      state.checked = {};
      state.results = {};
      state.showSummary = false;
      resetNavIndicators();
      updateProgressCount();
      rebuildContentPanel();
      renderQuestion(0);
    });

    var reviewBtn = document.createElement('button');
    reviewBtn.className = 'quiz-btn quiz-btn--review';
    reviewBtn.textContent = 'Review Answers';
    reviewBtn.addEventListener('click', function () {
      // Keep showSummary true so feedback is visible in review
      rebuildContentPanel();
      renderQuestion(0);
    });

    actions.appendChild(restartBtn);
    actions.appendChild(reviewBtn);
    summary.appendChild(actions);

    contentEl.appendChild(summary);

    // Animate the score ring after a tick
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        var fillCircle = contentEl.querySelector('.quiz-summary__ring-fill');
        if (fillCircle) {
          var offset = circumference - (circumference * pct / 100);
          fillCircle.setAttribute('stroke-dashoffset', offset);
        }
      });
    });
  }

  // Rebuild the right panel structure (after summary view)
  function rebuildContentPanel() {
    contentEl.innerHTML = '';

    // Header row
    var headerRow = document.createElement('div');
    headerRow.className = 'quiz-content__header';
    qnumEl = document.createElement('span');
    qnumEl.className = 'quiz-content__qnum';
    conceptEl = document.createElement('span');
    conceptEl.className = 'quiz-content__concept';
    badgeEl = document.createElement('span');
    badgeEl.className = 'quiz-badge quiz-badge--complete';
    badgeEl.innerHTML = '&#10003; Complete';
    badgeEl.style.display = 'none';
    headerRow.appendChild(qnumEl);
    headerRow.appendChild(badgeEl);
    headerRow.appendChild(conceptEl);
    contentEl.appendChild(headerRow);

    // Progress bar with percentage
    progressWrapEl = document.createElement('div');
    progressWrapEl.className = 'quiz-progress-wrap';
    progressBarEl = document.createElement('div');
    progressBarEl.className = 'quiz-progress';
    progressFillEl = document.createElement('div');
    progressFillEl.className = 'quiz-progress__fill';
    progressBarEl.appendChild(progressFillEl);
    progressPctEl = document.createElement('span');
    progressPctEl.className = 'quiz-progress__pct';
    progressPctEl.textContent = '0%';
    progressWrapEl.appendChild(progressBarEl);
    progressWrapEl.appendChild(progressPctEl);
    contentEl.appendChild(progressWrapEl);

    // Body wrapper
    bodyWrapEl = document.createElement('div');
    bodyWrapEl.className = 'quiz-content__body';

    questionEl = document.createElement('div');
    questionEl.className = 'quiz-content__question';
    bodyWrapEl.appendChild(questionEl);

    choicesEl = document.createElement('div');
    choicesEl.className = 'quiz-content__choices';
    choicesEl.setAttribute('role', 'radiogroup');
    choicesEl.setAttribute('aria-label', 'Answer choices');
    bodyWrapEl.appendChild(choicesEl);

    var actionsDiv = document.createElement('div');
    actionsDiv.className = 'quiz-content__actions';
    checkBtn = document.createElement('button');
    checkBtn.className = 'quiz-btn quiz-btn--check';
    checkBtn.textContent = 'Check Answer';
    checkBtn.disabled = true;
    checkBtn.addEventListener('click', function () { checkAnswer(); });

    finishBtn = document.createElement('button');
    finishBtn.className = 'quiz-btn quiz-btn--finish';
    finishBtn.textContent = 'Finish Exam';
    finishBtn.style.display = (state.mode === 'exam' && !state.showSummary) ? '' : 'none';
    finishBtn.addEventListener('click', function () { showScoreSummary(); });

    actionsDiv.appendChild(checkBtn);
    actionsDiv.appendChild(finishBtn);
    bodyWrapEl.appendChild(actionsDiv);

    feedbackEl = document.createElement('div');
    feedbackEl.className = 'quiz-content__feedback';
    feedbackEl.setAttribute('aria-live', 'polite');
    feedbackEl.hidden = true;
    bodyWrapEl.appendChild(feedbackEl);

    contentEl.appendChild(bodyWrapEl);

    var navBtns = document.createElement('div');
    navBtns.className = 'quiz-content__nav-buttons';
    prevBtn = document.createElement('button');
    prevBtn.className = 'quiz-btn quiz-btn--prev';
    prevBtn.innerHTML = '&larr; Previous';
    prevBtn.addEventListener('click', function () { goToQuestion(state.activeIndex - 1); });
    nextBtn = document.createElement('button');
    nextBtn.className = 'quiz-btn quiz-btn--next';
    nextBtn.innerHTML = 'Next &rarr;';
    nextBtn.addEventListener('click', function () { goToQuestion(state.activeIndex + 1); });
    navBtns.appendChild(prevBtn);
    navBtns.appendChild(nextBtn);
    contentEl.appendChild(navBtns);

    updateProgressBar();
  }

  // Helper: show quiz content (exit summary view)
  function showQuizContent() {
    if (contentEl.querySelector('.quiz-summary')) {
      rebuildContentPanel();
    }
  }

  // =========================================================================
  //  URL SYNC
  // =========================================================================
  function syncURL(qNum) {
    var url = new URL(window.location);
    url.searchParams.set('q', qNum);
    window.history.replaceState(null, '', url);
  }

  function readURLQuestion() {
    var params = new URLSearchParams(window.location.search);
    var q = parseInt(params.get('q'), 10);
    if (q >= 1 && q <= state.questions.length) return q - 1;
    return 0;
  }

  // =========================================================================
  //  NAVIGATION
  // =========================================================================
  function goToQuestion(index) {
    if (index < 0 || index >= state.questions.length) return;
    // In exam mode, block navigation to locked questions
    if (state.mode === 'exam' && !state.showSummary) {
      var items = navListEl.querySelectorAll('.quiz-nav__item');
      if (items[index] && items[index].classList.contains('quiz-nav__item--locked')) return;
    }
    renderQuestion(index);
  }

  // =========================================================================
  //  KEYBOARD
  // =========================================================================
  function handleKeydown(e) {
    if (!quizAppEl || state.showSummary) return;
    var tag = document.activeElement.tagName;
    if (tag === 'INPUT' && document.activeElement.type !== 'radio') return;
    if (tag === 'TEXTAREA' || tag === 'SELECT') return;

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        goToQuestion(state.activeIndex - 1);
        break;
      case 'ArrowRight':
        e.preventDefault();
        goToQuestion(state.activeIndex + 1);
        break;
      case 'Enter':
        if (checkBtn && !checkBtn.disabled && !state.checked[state.activeIndex]) {
          e.preventDefault();
          checkAnswer();
        }
        break;
      case '1': case '2': case '3': case '4':
      case 'a': case 'b': case 'c': case 'd':
      case 'A': case 'B': case 'C': case 'D':
        if (state.checked[state.activeIndex]) break;
        var letter = e.key.toUpperCase();
        if (/^[1-4]$/.test(e.key)) {
          letter = String.fromCharCode(64 + parseInt(e.key, 10));
        }
        selectAnswer(letter);
        break;
    }
  }

  function selectAnswer(letter) {
    var radios = choicesEl.querySelectorAll('.quiz-choice__radio');
    for (var i = 0; i < radios.length; i++) {
      if (radios[i].value === letter) {
        radios[i].checked = true;
        radios[i].dispatchEvent(new Event('change', { bubbles: true }));
        break;
      }
    }
  }

  // =========================================================================
  //  MATHJAX
  // =========================================================================
  function retypeset(container) {
    if (window.MathJax && MathJax.typesetPromise) {
      MathJax.typesetClear([container]);
      MathJax.typesetPromise([container]).catch(function (err) {
        console.warn('MathJax typeset error:', err);
      });
    }
  }

  // =========================================================================
  //  INIT
  // =========================================================================
  function init() {
    // Clean up previous instance
    if (quizAppEl) { quizAppEl.remove(); quizAppEl = null; }
    if (modeBarEl) { modeBarEl.remove(); modeBarEl = null; }

    // Remove quiz-page class from previous page (instant navigation)
    document.body.classList.remove('quiz-page');

    var hidden = document.querySelector('.quiz-original-content');
    if (hidden) {
      var parent = hidden.parentNode;
      while (hidden.firstChild) parent.appendChild(hidden.firstChild);
      hidden.remove();
    }

    if (!isQuizPage()) return;

    // Mark body so CSS can hide the sidebar TOC on quiz pages
    document.body.classList.add('quiz-page');

    var questions = parseQuestions();
    if (questions.length === 0) return;

    // Reset state
    state.questions = questions;
    state.activeIndex = 0;
    state.answers = {};
    state.checked = {};
    state.results = {};
    state.mode = 'practice';
    state.showSummary = false;

    // Hide original content
    var article = document.querySelector('article.md-content__inner') ||
                  document.querySelector('.md-content__inner');
    if (!article) return;

    var originalWrapper = document.createElement('div');
    originalWrapper.className = 'quiz-original-content';
    while (article.firstChild) originalWrapper.appendChild(article.firstChild);
    article.appendChild(originalWrapper);

    // Build mode bar + quiz app
    var modeBar = buildModeBar();
    article.appendChild(modeBar);

    var app = buildQuizApp(questions);
    article.appendChild(app);

    // Read initial question from URL
    state.activeIndex = readURLQuestion();
    renderQuestion(state.activeIndex);

    document.addEventListener('keydown', handleKeydown);
  }

  // Run on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    setTimeout(init, 50);
  }

  // MkDocs Material instant navigation support
  var lastUrl = location.href;
  new MutationObserver(function () {
    if (location.href !== lastUrl) {
      lastUrl = location.href;
      setTimeout(init, 300);
    }
  }).observe(document.body, { childList: true, subtree: true });

  // Handle popstate for URL sync
  window.addEventListener('popstate', function () {
    if (!quizAppEl) return;
    var idx = readURLQuestion();
    if (idx !== state.activeIndex) renderQuestion(idx);
  });
})();
