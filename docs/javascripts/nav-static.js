(function () {
  'use strict';

  // =========================================================================
  //  SIDEBAR ACCORDION — only one unit section open at a time
  //  Also collapses the TOC (section headings) under "Content" by default.
  //
  //  navigation.expand is enabled in mkdocs.yml so all units are listed,
  //  but it adds md-toggle--indeterminate to every toggle, expanding them.
  //  This script removes that class from non-active units and from #__toc
  //  to enforce accordion + collapsed TOC behavior.
  // =========================================================================

  // Get all unit-level toggle checkboxes (level 2: __nav_6_1, __nav_6_2, etc.)
  function getUnitToggles() {
    var all = document.querySelectorAll('.md-sidebar .md-nav__toggle');
    var unitToggles = [];
    for (var i = 0; i < all.length; i++) {
      var toggle = all[i];
      // Skip the TOC toggle
      if (toggle.id === '__toc') continue;
      // Skip toggles that are inside a unit (sub-items within a unit section)
      var parentNav = toggle.closest('nav[data-md-level="2"]');
      if (parentNav) continue;
      // Unit-level toggles have a sibling nav with data-md-level="2"
      var siblingNav = toggle.parentNode.querySelector('nav[data-md-level="2"]');
      if (siblingNav) {
        unitToggles.push(toggle);
      }
    }
    return unitToggles;
  }

  // Close all unit sections except the given one
  function closeOtherUnits(keepOpenId) {
    var toggles = getUnitToggles();
    for (var i = 0; i < toggles.length; i++) {
      if (toggles[i].id !== keepOpenId) {
        toggles[i].checked = false;
        toggles[i].classList.remove('md-toggle--indeterminate');
      }
    }
  }

  // Initialize accordion: expand only the active unit, collapse others
  function initAccordion() {
    var toggles = getUnitToggles();

    // Find the active unit (contains md-nav__item--active)
    for (var i = 0; i < toggles.length; i++) {
      var li = toggles[i].closest('.md-nav__item');
      if (li && li.classList.contains('md-nav__item--active')) {
        toggles[i].checked = true;
        toggles[i].classList.remove('md-toggle--indeterminate');
      } else {
        // Collapse non-active units: uncheck AND remove indeterminate
        toggles[i].checked = false;
        toggles[i].classList.remove('md-toggle--indeterminate');
      }
    }

    // Keep the "Unit Modules" parent always open
    var parentToggle = document.getElementById('__nav_6');
    if (parentToggle) {
      parentToggle.checked = true;
      parentToggle.classList.remove('md-toggle--indeterminate');
    }

    // Collapse the TOC (section headings) by default on content pages.
    // The user can click the "Content" label to expand/collapse it.
    // On quiz pages, quiz-ui.js hides it entirely via body.quiz-page class.
    collapseToc();

    // Listen for toggle changes to enforce accordion
    attachAccordionListeners(toggles);
  }

  // Collapse the TOC dropdown so section headings don't expand under Content
  function collapseToc() {
    var tocToggle = document.getElementById('__toc');
    if (tocToggle) {
      tocToggle.checked = false;
      tocToggle.classList.remove('md-toggle--indeterminate');
    }
  }

  // Watch the #__toc element for MkDocs Material re-adding md-toggle--indeterminate
  function watchToc() {
    var tocToggle = document.getElementById('__toc');
    if (!tocToggle || tocToggle.dataset.tocWatched) return;
    tocToggle.dataset.tocWatched = 'true';

    new MutationObserver(function () {
      if (tocToggle.classList.contains('md-toggle--indeterminate')) {
        tocToggle.classList.remove('md-toggle--indeterminate');
        tocToggle.checked = false;
      }
    }).observe(tocToggle, { attributes: true, attributeFilter: ['class'] });
  }

  // Attach change listeners to enforce one-at-a-time behavior
  function attachAccordionListeners(toggles) {
    for (var i = 0; i < toggles.length; i++) {
      (function (toggle) {
        var label = document.querySelector('label[for="' + toggle.id + '"]');
        if (!label || label.dataset.accordionBound) return;
        label.dataset.accordionBound = 'true';

        toggle.addEventListener('change', function () {
          if (toggle.checked) {
            closeOtherUnits(toggle.id);
          }
        });
      })(toggles[i]);
    }
  }

  // =========================================================================
  //  INIT
  // =========================================================================
  function init() {
    // Small delay to let MkDocs Material finish rendering
    setTimeout(function () {
      initAccordion();
      watchToc();
    }, 50);
  }

  // Run on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Re-init after MkDocs Material instant navigation
  var lastUrl = location.href;
  new MutationObserver(function () {
    if (location.href !== lastUrl) {
      lastUrl = location.href;
      setTimeout(function () {
        initAccordion();
        watchToc();
      }, 200);
    }
  }).observe(document.body, { childList: true, subtree: true });
})();
