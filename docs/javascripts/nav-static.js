(function () {
  'use strict';

  // =========================================================================
  //  SIDEBAR: Accordion (one unit at a time) + TOC toggle (collapsed default)
  //
  //  navigation.expand adds md-toggle--indeterminate to every toggle.
  //  This script:
  //    1. Strips indeterminate from non-active unit toggles → accordion
  //    2. Strips indeterminate from #__toc → collapsed by default
  //    3. Lets user click "Content" to toggle TOC open/closed
  //    4. Collapses TOC when switching units
  // =========================================================================

  // --- Unit accordion ---

  function getUnitToggles() {
    var all = document.querySelectorAll('.md-sidebar .md-nav__toggle');
    var unitToggles = [];
    for (var i = 0; i < all.length; i++) {
      var t = all[i];
      if (t.id === '__toc') continue;
      if (t.closest('nav[data-md-level="2"]')) continue;
      if (t.parentNode.querySelector('nav[data-md-level="2"]')) {
        unitToggles.push(t);
      }
    }
    return unitToggles;
  }

  function collapseToggle(t) {
    t.checked = false;
    t.classList.remove('md-toggle--indeterminate');
  }

  function closeOtherUnits(keepId) {
    var toggles = getUnitToggles();
    for (var i = 0; i < toggles.length; i++) {
      if (toggles[i].id !== keepId) collapseToggle(toggles[i]);
    }
    // Collapse TOC when switching units
    collapseToc();
  }

  // --- TOC (Content outline) toggle ---

  function collapseToc() {
    var toc = document.getElementById('__toc');
    if (!toc) return;
    toc.checked = false;
    toc.classList.remove('md-toggle--indeterminate');
    updateTocLabel(false);
  }

  function updateTocLabel(expanded) {
    var labels = document.querySelectorAll('label[for="__toc"]');
    for (var i = 0; i < labels.length; i++) {
      if (expanded) {
        labels[i].classList.add('toc-expanded');
      } else {
        labels[i].classList.remove('toc-expanded');
      }
    }
  }

  function initTocToggle() {
    var toc = document.getElementById('__toc');
    if (!toc) return;

    // Force collapsed on init
    toc.checked = false;
    toc.classList.remove('md-toggle--indeterminate');
    updateTocLabel(false);

    // Listen for toggle changes
    if (!toc.dataset.tocBound) {
      toc.dataset.tocBound = 'true';
      toc.addEventListener('change', function () {
        // Strip indeterminate on any change so CSS :checked works cleanly
        toc.classList.remove('md-toggle--indeterminate');
        updateTocLabel(toc.checked);
      });
    }
  }

  // --- MutationObserver: prevent MkDocs Material from re-expanding ---

  function watchForIndeterminate(toggles) {
    if (document.body.dataset.accordionWatched) return;
    document.body.dataset.accordionWatched = 'true';

    var managedIds = {};
    for (var i = 0; i < toggles.length; i++) {
      managedIds[toggles[i].id] = true;
    }
    managedIds['__toc'] = true;

    var sidebar = document.querySelector('.md-sidebar--primary');
    if (!sidebar) return;

    new MutationObserver(function (mutations) {
      for (var m = 0; m < mutations.length; m++) {
        var target = mutations[m].target;
        if (!target.id || !managedIds[target.id]) continue;
        if (!target.classList.contains('md-toggle--indeterminate')) continue;

        if (target.id === '__toc') {
          // Always strip indeterminate from TOC — we manage it ourselves
          target.classList.remove('md-toggle--indeterminate');
        } else {
          // Only allow indeterminate on the active unit
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

  // --- Accordion listeners ---

  function attachAccordionListeners(toggles) {
    for (var i = 0; i < toggles.length; i++) {
      (function (toggle) {
        var label = document.querySelector('label[for="' + toggle.id + '"]');
        if (!label || label.dataset.accordionBound) return;
        label.dataset.accordionBound = 'true';
        toggle.addEventListener('change', function () {
          if (toggle.checked) closeOtherUnits(toggle.id);
        });
      })(toggles[i]);
    }
  }

  // --- Main init ---

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

    initTocToggle();
    attachAccordionListeners(toggles);
    watchForIndeterminate(toggles);
  }

  // =========================================================================
  //  BOOT
  // =========================================================================
  function init() {
    setTimeout(initAccordion, 50);
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
      document.body.removeAttribute('data-accordion-watched');
      setTimeout(initAccordion, 200);
    }
  }).observe(document.body, { childList: true, subtree: true });
})();
