(function () {
  'use strict';

  // =========================================================================
  //  SIDEBAR ACCORDION — only one unit section open at a time
  // =========================================================================

  // Get all unit-level toggle checkboxes (level 2: __nav_6_1, __nav_6_2, etc.)
  function getUnitToggles() {
    var all = document.querySelectorAll('.md-sidebar .md-nav__toggle');
    var unitToggles = [];
    for (var i = 0; i < all.length; i++) {
      var toggle = all[i];
      // Skip the TOC toggle and the top-level "Unit Modules" toggle
      if (toggle.id === '__toc') continue;
      // Unit toggles are inside data-md-level="2" parent navs
      var parentNav = toggle.closest('nav[data-md-level="2"]');
      if (parentNav) continue; // This is inside a unit, not a unit toggle itself
      // Check if it's a unit-level toggle (has a sibling nav with data-md-level="2")
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
    var activeToggleId = null;

    // Find the active unit (contains md-nav__item--active)
    for (var i = 0; i < toggles.length; i++) {
      var li = toggles[i].closest('.md-nav__item');
      if (li && li.classList.contains('md-nav__item--active')) {
        activeToggleId = toggles[i].id;
        toggles[i].checked = true;
        toggles[i].classList.remove('md-toggle--indeterminate');
      } else {
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

    // Listen for toggle changes to enforce accordion
    attachAccordionListeners(toggles);
  }

  // Attach change listeners to enforce one-at-a-time behavior
  function attachAccordionListeners(toggles) {
    for (var i = 0; i < toggles.length; i++) {
      (function (toggle) {
        // Remove existing listeners by cloning
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
    setTimeout(initAccordion, 50);
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
      setTimeout(initAccordion, 200);
    }
  }).observe(document.body, { childList: true, subtree: true });
})();
