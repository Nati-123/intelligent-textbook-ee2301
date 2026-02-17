(function () {
  'use strict';

  /* ===== STATE ===== */
  var state = {
    questions: [],
    activeIndex: 0,
    answers: {},   // { 0: 'A', ... }
    checked: {},   // { 0: true, ... }
    results: {}    // { 0: true, ... }  (correct?)
  };

  /* ===== DOM REFS (set during build) ===== */
  var quizAppEl = null;
  var navListEl = null;
  var progressEl = null;
  var contentEl = null;
  var qnumEl = null;
  var conceptEl = null;
  var questionEl = null;
  var choicesEl = null;
  var checkBtn = null;
  var feedbackEl = null;
  var prevBtn = null;
  var nextBtn = null;

  /* ===== DETECTION ===== */
  function isQuizPage() {
    var article = document.querySelector('article.md-content__inner') ||
                  document.querySelector('.md-content__inner');
    if (!article) return false;
    var h4s = article.querySelectorAll('h4');
    if (h4s.length < 2) return false;
    return /^\s*1\./.test(h4s[0].textContent);
  }

  /* ===== PARSING ===== */
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
      // Strip leading "N. " from innerHTML to get question HTML
      var questionHTML = h4.innerHTML.replace(/^\s*\d+\.\s*/, '');
      var questionText = match[2].trim();

      // Walk siblings after h4
      var choicesDiv = null;
      var answerP = null;
      var conceptP = null;
      var sibling = h4.nextElementSibling;

      while (sibling && sibling.tagName !== 'H4' && sibling.tagName !== 'H2') {
        if (sibling.classList && sibling.classList.contains('upper-alpha')) {
          choicesDiv = sibling;
        } else if (sibling.tagName === 'P') {
          var firstStrong = sibling.querySelector('strong');
          if (firstStrong) {
            var txt = firstStrong.textContent.trim();
            if (txt === 'Answer:') {
              answerP = sibling;
            } else if (txt === 'Concept Tested:') {
              conceptP = sibling;
            }
          }
        }
        sibling = sibling.nextElementSibling;
      }

      // Extract correct answer letter
      var correctLetter = '';
      if (answerP) {
        var strongs = answerP.querySelectorAll('strong');
        if (strongs.length >= 2) {
          correctLetter = strongs[1].textContent.trim();
        }
      }

      // Extract choices as HTML
      var choices = [];
      if (choicesDiv) {
        var lis = choicesDiv.querySelectorAll('li');
        for (var j = 0; j < lis.length; j++) {
          choices.push(lis[j].innerHTML);
        }
      }

      // Extract explanation HTML (everything after "Answer: The correct answer is X.")
      var explanationHTML = '';
      if (answerP) {
        explanationHTML = answerP.innerHTML;
      }

      // Extract concept text
      var conceptText = '';
      if (conceptP) {
        // Get text after "Concept Tested:"
        conceptText = conceptP.textContent.replace(/^.*Concept Tested:\s*/, '').trim();
      }

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

  /* ===== BUILD UI ===== */
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

      var label = document.createElement('span');
      label.className = 'quiz-nav__label';
      label.textContent = 'Q' + questions[i].num;

      item.appendChild(num);
      item.appendChild(label);
      navListEl.appendChild(item);
    }

    nav.appendChild(navListEl);

    progressEl = document.createElement('div');
    progressEl.className = 'quiz-nav__progress';
    progressEl.textContent = '0 / ' + questions.length + ' answered';
    nav.appendChild(progressEl);

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

    headerRow.appendChild(qnumEl);
    headerRow.appendChild(conceptEl);
    contentEl.appendChild(headerRow);

    // Question text
    questionEl = document.createElement('div');
    questionEl.className = 'quiz-content__question';
    contentEl.appendChild(questionEl);

    // Choices container
    choicesEl = document.createElement('div');
    choicesEl.className = 'quiz-content__choices';
    choicesEl.setAttribute('role', 'radiogroup');
    choicesEl.setAttribute('aria-label', 'Answer choices');
    contentEl.appendChild(choicesEl);

    // Check answer button
    var actionsDiv = document.createElement('div');
    actionsDiv.className = 'quiz-content__actions';
    checkBtn = document.createElement('button');
    checkBtn.className = 'quiz-btn quiz-btn--check';
    checkBtn.textContent = 'Check Answer';
    checkBtn.disabled = true;
    actionsDiv.appendChild(checkBtn);
    contentEl.appendChild(actionsDiv);

    // Feedback area
    feedbackEl = document.createElement('div');
    feedbackEl.className = 'quiz-content__feedback';
    feedbackEl.setAttribute('aria-live', 'polite');
    feedbackEl.hidden = true;
    contentEl.appendChild(feedbackEl);

    // Nav buttons
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
      var item = e.target.closest('.quiz-nav__item');
      if (!item) return;
      var idx = parseInt(item.getAttribute('data-q'), 10);
      goToQuestion(idx);
    });

    checkBtn.addEventListener('click', function () {
      checkAnswer();
    });

    prevBtn.addEventListener('click', function () {
      goToQuestion(state.activeIndex - 1);
    });

    nextBtn.addEventListener('click', function () {
      goToQuestion(state.activeIndex + 1);
    });

    quizAppEl = app;
    return app;
  }

  /* ===== RENDER QUESTION ===== */
  function renderQuestion(index) {
    var q = state.questions[index];
    if (!q) return;

    state.activeIndex = index;

    // Update nav active state
    var items = navListEl.querySelectorAll('.quiz-nav__item');
    for (var i = 0; i < items.length; i++) {
      items[i].classList.toggle('quiz-nav__item--active', i === index);
    }
    // Scroll active item into view
    if (items[index]) {
      items[index].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }

    // Header
    qnumEl.textContent = 'Question ' + q.num + ' of ' + state.questions.length;
    conceptEl.textContent = q.conceptText;

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

      // If previously answered, pre-select
      if (state.answers[index] === letters[j]) {
        radio.checked = true;
        label.classList.add('quiz-choice--selected');
      }

      // Radio change handler
      (function (lbl, val) {
        radio.addEventListener('change', function () {
          if (state.checked[index]) return;
          state.answers[index] = val;
          // Update selected class on all choices
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

    // If already checked, show result state
    if (state.checked[index]) {
      disableChoices(q, index);
      showFeedback(state.results[index], q);
      checkBtn.disabled = true;
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

  /* ===== CHECK ANSWER ===== */
  function checkAnswer() {
    var idx = state.activeIndex;
    var selected = state.answers[idx];
    if (!selected) return;

    var q = state.questions[idx];
    var isCorrect = (selected === q.correctLetter);

    state.checked[idx] = true;
    state.results[idx] = isCorrect;

    disableChoices(q, idx);
    showFeedback(isCorrect, q);
    updateNavItemStatus(idx, isCorrect);
    updateProgressCount();
    checkBtn.disabled = true;
  }

  function disableChoices(q, idx) {
    var labels = choicesEl.querySelectorAll('.quiz-choice');
    var letters = ['A', 'B', 'C', 'D'];
    for (var i = 0; i < labels.length; i++) {
      labels[i].classList.add('quiz-choice--disabled');
      labels[i].querySelector('.quiz-choice__radio').disabled = true;

      if (letters[i] === q.correctLetter) {
        labels[i].classList.add('quiz-choice--correct');
      }
      if (letters[i] === state.answers[idx] && letters[i] !== q.correctLetter) {
        labels[i].classList.add('quiz-choice--incorrect');
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
    resultDiv.textContent = isCorrect ? 'Correct!' : 'Incorrect — the correct answer is ' + q.correctLetter + '.';

    var explanationDiv = document.createElement('div');
    explanationDiv.className = 'quiz-feedback__explanation';
    // Strip the leading "Answer: The correct answer is X." prefix from explanation
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

  function updateNavItemStatus(idx, isCorrect) {
    var items = navListEl.querySelectorAll('.quiz-nav__item');
    if (items[idx]) {
      items[idx].classList.remove('quiz-nav__item--correct', 'quiz-nav__item--incorrect');
      items[idx].classList.add(isCorrect ? 'quiz-nav__item--correct' : 'quiz-nav__item--incorrect');
    }
  }

  function updateProgressCount() {
    var count = 0;
    for (var key in state.checked) {
      if (state.checked[key]) count++;
    }
    progressEl.textContent = count + ' / ' + state.questions.length + ' answered';
  }

  /* ===== URL SYNC ===== */
  function syncURL(qNum) {
    var url = new URL(window.location);
    url.searchParams.set('q', qNum);
    window.history.replaceState(null, '', url);
  }

  function readURLQuestion() {
    var params = new URLSearchParams(window.location.search);
    var q = parseInt(params.get('q'), 10);
    if (q >= 1 && q <= state.questions.length) {
      return q - 1;
    }
    return 0;
  }

  /* ===== NAVIGATION ===== */
  function goToQuestion(index) {
    if (index < 0 || index >= state.questions.length) return;
    renderQuestion(index);
  }

  /* ===== KEYBOARD ===== */
  function handleKeydown(e) {
    if (!quizAppEl) return;
    // Don't intercept if user is typing in an input (other than radio)
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

  /* ===== MATHJAX ===== */
  function retypeset(container) {
    if (window.MathJax && MathJax.typesetPromise) {
      MathJax.typesetClear([container]);
      MathJax.typesetPromise([container]).catch(function (err) {
        console.warn('MathJax typeset error:', err);
      });
    }
  }

  /* ===== INIT ===== */
  function init() {
    // Clean up previous instance
    if (quizAppEl) {
      quizAppEl.remove();
      quizAppEl = null;
    }

    // Restore original content if it was hidden by a previous init
    var hidden = document.querySelector('.quiz-original-content');
    if (hidden) {
      var parent = hidden.parentNode;
      while (hidden.firstChild) {
        parent.appendChild(hidden.firstChild);
      }
      hidden.remove();
    }

    if (!isQuizPage()) return;

    var questions = parseQuestions();
    if (questions.length === 0) return;

    // Reset state
    state.questions = questions;
    state.answers = {};
    state.checked = {};
    state.results = {};

    // Hide original content
    var article = document.querySelector('article.md-content__inner') ||
                  document.querySelector('.md-content__inner');
    if (!article) return;

    var originalWrapper = document.createElement('div');
    originalWrapper.className = 'quiz-original-content';
    while (article.firstChild) {
      originalWrapper.appendChild(article.firstChild);
    }
    article.appendChild(originalWrapper);

    // Build and insert quiz app
    var app = buildQuizApp(questions);
    article.appendChild(app);

    // Read initial question from URL
    state.activeIndex = readURLQuestion();
    renderQuestion(state.activeIndex);

    // Keyboard listener
    document.addEventListener('keydown', handleKeydown);
  }

  // Run on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    // Small delay to let MathJax config load but run before typesetting
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
    if (idx !== state.activeIndex) {
      renderQuestion(idx);
    }
  });
})();
