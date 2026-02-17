(function () {
  'use strict';

  // Force all sidebar nav toggle checkboxes to be checked (expanded)
  // and prevent them from being toggled by user clicks or MkDocs JS.
  // Excludes #__toc (table of contents) which is hidden on quiz pages.
  function forceExpandAll() {
    var toggles = document.querySelectorAll('.md-sidebar .md-nav__toggle');
    for (var i = 0; i < toggles.length; i++) {
      if (toggles[i].id === '__toc') continue;
      toggles[i].checked = true;
      toggles[i].removeAttribute('data-md-state');
      toggles[i].classList.remove('md-toggle--indeterminate');
    }
  }

  // Run on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', forceExpandAll);
  } else {
    forceExpandAll();
  }

  // Re-run after MkDocs Material instant navigation
  var lastUrl = location.href;
  new MutationObserver(function () {
    if (location.href !== lastUrl) {
      lastUrl = location.href;
      setTimeout(forceExpandAll, 100);
    }
    forceExpandAll();
  }).observe(document.body, { childList: true, subtree: true });
})();
