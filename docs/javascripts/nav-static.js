(function () {
  'use strict';

  // =========================================================================
  //  SIDEBAR ACCORDION — only one unit section open at a time
  //
  //  navigation.expand is ON so all units are listed in the sidebar.
  //  It adds md-toggle--indeterminate to every toggle (acts like :checked).
  //  This script strips that class from non-active units to enforce accordion.
  //  The TOC (section headings under Content) is left alone so it stays visible.
  // =========================================================================

  // Get all unit-level toggle checkboxes (__nav_6_1 … __nav_6_13)
  function getUnitToggles() {
    var all = document.querySelectorAll('.md-sidebar .md-nav__toggle');
    var unitToggles = [];
    for (var i = 0; i < all.length; i++) {
      var toggle = all[i];
      if (toggle.id === '__toc') continue;
      var parentNav = toggle.closest('nav[data-md-level="2"]');
      if (parentNav) continue;
      var siblingNav = toggle.parentNode.querySelector('nav[data-md-level="2"]');
      if (siblingNav) {
        unitToggles.push(toggle);
      }
    }
    return unitToggles;
  }

  // Collapse a toggle: uncheck + strip indeterminate
  function collapseToggle(toggle) {
    toggle.checked = false;
    toggle.classList.remove('md-toggle--indeterminate');
  }

  // Close all unit sections except the given one
  function closeOtherUnits(keepOpenId) {
    var toggles = getUnitToggles();
    for (var i = 0; i < toggles.length; i++) {
      if (toggles[i].id !== keepOpenId) {
        collapseToggle(toggles[i]);
      }
    }
  }

  // Initialize accordion: expand only the active unit, collapse others
  function initAccordion() {
    var toggles = getUnitToggles();

    for (var i = 0; i < toggles.length; i++) {
      var li = toggles[i].closest('.md-nav__item');
      if (li && li.classList.contains('md-nav__item--active')) {
        toggles[i].checked = true;
        toggles[i].classList.remove('md-toggle--indeterminate');
      } else {
        collapseToggle(toggles[i]);
      }
    }

    // Keep "Unit Modules" parent always open
    var parentToggle = document.getElementById('__nav_6');
    if (parentToggle) {
      parentToggle.checked = true;
      parentToggle.classList.remove('md-toggle--indeterminate');
    }

    attachAccordionListeners(toggles);
    watchForIndeterminate(toggles);
  }

  // Watch unit toggles for MkDocs Material re-adding md-toggle--indeterminate
  function watchForIndeterminate(toggles) {
    if (document.body.dataset.accordionWatched) return;
    document.body.dataset.accordionWatched = 'true';

    // Only manage unit toggles (not #__toc)
    var managedIds = {};
    for (var i = 0; i < toggles.length; i++) {
      managedIds[toggles[i].id] = true;
    }

    var sidebar = document.querySelector('.md-sidebar--primary');
    if (!sidebar) return;

    new MutationObserver(function (mutations) {
      for (var m = 0; m < mutations.length; m++) {
        var target = mutations[m].target;
        if (target.id && managedIds[target.id] &&
            target.classList.contains('md-toggle--indeterminate')) {
          var li = target.closest('.md-nav__item');
          var isActive = li && li.classList.contains('md-nav__item--active');
          if (!isActive) {
            target.classList.remove('md-toggle--indeterminate');
            target.checked = false;
          }
        }
      }
    }).observe(sidebar, {
      attributes: true,
      attributeFilter: ['class'],
      subtree: true
    });
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
    setTimeout(initAccordion, 50);
  }

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
      document.body.removeAttribute('data-accordion-watched');
      setTimeout(initAccordion, 200);
    }
  }).observe(document.body, { childList: true, subtree: true });
})();
