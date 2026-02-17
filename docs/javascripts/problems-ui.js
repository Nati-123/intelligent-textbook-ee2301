(function () {
  'use strict';

  // =========================================================================
  //  PROBLEMS & CHALLENGE PAGES:
  //  Hide solutions/answers behind a clickable toggle button.
  //
  //  Problems pages:  detects <strong>Solution:</strong>
  //  Challenge pages: detects <strong>Answer:</strong>
  //
  //  Both hide everything from the marker to the next <hr>/<h3>/<h4>/<h2>.
  //  No markdown files need modification.
  // =========================================================================

  // Detect which type of page this is
  function getPageType() {
    var content = document.querySelector('.md-content');
    if (!content) return null;
    var strongs = content.querySelectorAll('strong');
    var hasSolution = false;
    var hasAnswer = false;
    for (var i = 0; i < strongs.length; i++) {
      var text = strongs[i].textContent.trim();
      if (/^Solution:?/i.test(text)) hasSolution = true;
      if (/^Answer:?/i.test(text)) hasAnswer = true;
    }
    // Challenge pages use **Answer:**, problems use **Solution:**
    // If both exist, treat as problems page
    if (hasSolution) return 'problems';
    if (hasAnswer) return 'challenge';
    return null;
  }

  function initUI() {
    // Clean up previous page classes (instant navigation)
    document.body.classList.remove('problems-page', 'challenge-page');

    var pageType = getPageType();
    if (!pageType) return;

    if (pageType === 'problems') {
      document.body.classList.add('problems-page');
    } else {
      document.body.classList.add('challenge-page');
    }

    var content = document.querySelector('.md-content__inner');
    if (!content) return;

    // Pattern to match: **Solution:** or **Answer:**
    var pattern = pageType === 'problems' ? /^Solution:?/i : /^Answer:?/i;
    var allStrongs = content.querySelectorAll('p > strong');
    var starts = [];

    for (var i = 0; i < allStrongs.length; i++) {
      if (pattern.test(allStrongs[i].textContent.trim())) {
        starts.push(allStrongs[i].parentNode);
      }
    }

    if (starts.length === 0) return;

    for (var s = 0; s < starts.length; s++) {
      wrapAnswer(starts[s], s, pageType);
    }
  }

  function wrapAnswer(answerP, index, pageType) {
    // Collect elements from answerP until next section break
    var elements = [answerP];
    var next = answerP.nextElementSibling;

    while (next) {
      var tag = next.tagName.toLowerCase();
      if (tag === 'hr' || tag === 'h2' || tag === 'h3' || tag === 'h4') break;
      elements.push(next);
      next = next.nextElementSibling;
    }

    // Create wrapper
    var wrapper = document.createElement('div');
    wrapper.className = 'solution-wrapper';
    wrapper.dataset.index = index;

    var answerDiv = document.createElement('div');
    answerDiv.className = 'solution-content';
    answerDiv.style.display = 'none';

    // Button text differs by page type
    var showLabel = pageType === 'challenge'
      ? '<span class="solution-icon">&#9654;</span> Reveal Answer'
      : '<span class="solution-icon">&#9654;</span> Show Answer';
    var hideLabel = pageType === 'challenge'
      ? '<span class="solution-icon solution-icon--open">&#9660;</span> Hide Answer'
      : '<span class="solution-icon solution-icon--open">&#9660;</span> Hide Answer';

    var btn = document.createElement('button');
    btn.className = 'solution-toggle';
    if (pageType === 'challenge') btn.classList.add('solution-toggle--challenge');
    btn.type = 'button';
    btn.innerHTML = showLabel;
    btn.setAttribute('aria-expanded', 'false');

    // Insert
    answerP.parentNode.insertBefore(wrapper, answerP);
    wrapper.appendChild(btn);
    wrapper.appendChild(answerDiv);

    for (var i = 0; i < elements.length; i++) {
      answerDiv.appendChild(elements[i]);
    }

    // Toggle
    btn.addEventListener('click', function () {
      var isHidden = answerDiv.style.display === 'none';
      if (isHidden) {
        answerDiv.style.display = 'block';
        btn.innerHTML = hideLabel;
        btn.setAttribute('aria-expanded', 'true');
        btn.classList.add('solution-toggle--open');
        if (window.MathJax && MathJax.typesetPromise) {
          MathJax.typesetPromise([answerDiv]);
        }
      } else {
        answerDiv.style.display = 'none';
        btn.innerHTML = showLabel;
        btn.setAttribute('aria-expanded', 'false');
        btn.classList.remove('solution-toggle--open');
      }
    });
  }

  // =========================================================================
  //  INIT
  // =========================================================================
  function init() {
    setTimeout(initUI, 100);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Re-init on MkDocs instant navigation
  var lastUrl = location.href;
  new MutationObserver(function () {
    if (location.href !== lastUrl) {
      lastUrl = location.href;
      setTimeout(initUI, 300);
    }
  }).observe(document.body, { childList: true, subtree: true });
})();
