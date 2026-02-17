(function () {
  'use strict';

  // =========================================================================
  //  PROBLEMS PAGE: Hide solutions behind a clickable "Show Answer" button.
  //
  //  Detects problem pages by the presence of <strong>Solution:</strong>.
  //  Wraps each solution block in a collapsible container and inserts a
  //  toggle button. No markdown files need modification.
  // =========================================================================

  function isProblemsPage() {
    var content = document.querySelector('.md-content');
    if (!content) return false;
    var strongs = content.querySelectorAll('strong');
    for (var i = 0; i < strongs.length; i++) {
      if (/^Solution:?$/i.test(strongs[i].textContent.trim()) ||
          /^Solution:/i.test(strongs[i].textContent.trim())) {
        return true;
      }
    }
    return false;
  }

  function initProblemsUI() {
    if (!isProblemsPage()) return;

    document.body.classList.add('problems-page');

    var content = document.querySelector('.md-content__inner');
    if (!content) return;

    // Find all paragraphs that start with <strong>Solution:</strong>
    var allStrongs = content.querySelectorAll('p > strong');
    var solutionStarts = [];

    for (var i = 0; i < allStrongs.length; i++) {
      var strong = allStrongs[i];
      var text = strong.textContent.trim();
      if (/^Solution:?/i.test(text)) {
        solutionStarts.push(strong.parentNode); // the <p> containing **Solution:**
      }
    }

    if (solutionStarts.length === 0) return;

    for (var s = 0; s < solutionStarts.length; s++) {
      wrapSolution(solutionStarts[s], s);
    }
  }

  function wrapSolution(solutionP, index) {
    // Collect all elements from solutionP until the next <hr> or <h3> or <h2>
    var elements = [solutionP];
    var next = solutionP.nextElementSibling;

    while (next) {
      var tag = next.tagName.toLowerCase();
      if (tag === 'hr' || tag === 'h3' || tag === 'h2') break;
      elements.push(next);
      next = next.nextElementSibling;
    }

    // Create the solution wrapper (hidden by default)
    var wrapper = document.createElement('div');
    wrapper.className = 'solution-wrapper';
    wrapper.dataset.index = index;

    var solutionDiv = document.createElement('div');
    solutionDiv.className = 'solution-content';
    solutionDiv.style.display = 'none';

    // Create the toggle button
    var btn = document.createElement('button');
    btn.className = 'solution-toggle';
    btn.type = 'button';
    btn.innerHTML = '<span class="solution-icon">&#9654;</span> Show Answer';
    btn.setAttribute('aria-expanded', 'false');

    // Insert wrapper before the first solution element
    solutionP.parentNode.insertBefore(wrapper, solutionP);
    wrapper.appendChild(btn);
    wrapper.appendChild(solutionDiv);

    // Move all solution elements into the hidden div
    for (var i = 0; i < elements.length; i++) {
      solutionDiv.appendChild(elements[i]);
    }

    // Toggle handler
    btn.addEventListener('click', function () {
      var isHidden = solutionDiv.style.display === 'none';
      if (isHidden) {
        solutionDiv.style.display = 'block';
        btn.innerHTML = '<span class="solution-icon solution-icon--open">&#9660;</span> Hide Answer';
        btn.setAttribute('aria-expanded', 'true');
        btn.classList.add('solution-toggle--open');
        // Re-render MathJax if present
        if (window.MathJax && MathJax.typesetPromise) {
          MathJax.typesetPromise([solutionDiv]);
        }
      } else {
        solutionDiv.style.display = 'none';
        btn.innerHTML = '<span class="solution-icon">&#9654;</span> Show Answer';
        btn.setAttribute('aria-expanded', 'false');
        btn.classList.remove('solution-toggle--open');
      }
    });
  }

  // =========================================================================
  //  INIT
  // =========================================================================
  function init() {
    setTimeout(initProblemsUI, 100);
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
      setTimeout(initProblemsUI, 300);
    }
  }).observe(document.body, { childList: true, subtree: true });
})();
