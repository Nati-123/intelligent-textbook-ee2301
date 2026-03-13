// sim-accessibility.js — Shared accessibility enhancements for all MicroSims
// Include via <script src="../sim-accessibility.js"></script> in each main.html
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    // Add role="application" and tabindex to canvas for screen reader context
    var canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.setAttribute('role', 'application');
      canvas.setAttribute('tabindex', '0');
    }

    // Add accessible labels to unlabeled form controls
    var inputs = document.querySelectorAll('input:not([aria-label]):not([id])');
    inputs.forEach(function (input) {
      var placeholder = input.getAttribute('placeholder');
      if (placeholder) {
        input.setAttribute('aria-label', placeholder);
      }
    });

    var selects = document.querySelectorAll('select:not([aria-label]):not([id])');
    selects.forEach(function (select) {
      // Try to use preceding label text
      var prev = select.previousElementSibling;
      if (prev && prev.tagName === 'SPAN') {
        select.setAttribute('aria-label', prev.textContent.replace(':', '').trim());
      }
    });
  });
})();
