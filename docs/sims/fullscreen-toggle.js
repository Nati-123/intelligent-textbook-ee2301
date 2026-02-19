// fullscreen-toggle.js — Reusable fullscreen toggle for MicroSim iframes
// Include via <script src="../fullscreen-toggle.js"></script> in each main.html
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var iframe = window.frameElement;
    if (!iframe) return; // Only activate when embedded in an iframe

    var origStyle = '';
    var isFs = false;

    var btn = document.createElement('button');
    btn.textContent = '\u26F6 Fullscreen';
    btn.setAttribute('aria-label', 'Toggle fullscreen');
    btn.style.cssText =
      'position:fixed;top:4px;right:4px;z-index:10000;' +
      'background:rgba(255,255,255,0.92);border:1px solid #ccc;' +
      'border-radius:4px;padding:3px 10px;font-size:11px;' +
      'font-weight:bold;cursor:pointer;font-family:Arial,sans-serif;' +
      'color:#5C6BC0;transition:background 0.2s,opacity 0.3s;' +
      'opacity:0.75;line-height:1.4;';

    btn.addEventListener('mouseenter', function () {
      btn.style.opacity = '1';
      btn.style.background = 'rgba(232,234,246,0.95)';
    });
    btn.addEventListener('mouseleave', function () {
      btn.style.opacity = isFs ? '1' : '0.75';
      btn.style.background = 'rgba(255,255,255,0.92)';
    });

    btn.addEventListener('click', function () {
      if (!isFs) {
        origStyle = iframe.style.cssText;
        iframe.style.cssText =
          'position:fixed;top:0;left:0;width:100vw;height:100vh;' +
          'z-index:99999;border:none;background:#fff;';
        btn.textContent = '\u2715 Exit Fullscreen';
        btn.style.opacity = '1';
        isFs = true;
      } else {
        iframe.style.cssText = origStyle;
        btn.textContent = '\u26F6 Fullscreen';
        btn.style.opacity = '0.75';
        isFs = false;
      }
      setTimeout(function () {
        window.dispatchEvent(new Event('resize'));
      }, 100);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isFs) btn.click();
    });

    document.body.appendChild(btn);
  });
})();
