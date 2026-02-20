// Wrap iframe diagrams with styled container and fullscreen button
// Targets h4 headers containing "Diagram:" followed by an iframe
document.addEventListener('DOMContentLoaded', function () {
  var headings = document.querySelectorAll('.md-typeset h4');
  headings.forEach(function (h4) {
    if (!/Diagram:/i.test(h4.textContent)) return;

    // Style the heading as a diagram title
    h4.classList.add('diagram-title');

    // Find the next iframe sibling (skip whitespace/text nodes)
    var next = h4.nextElementSibling;
    if (!next) return;

    // The iframe might be directly next or inside a p tag
    var iframe = null;
    if (next.tagName === 'IFRAME') {
      iframe = next;
    } else if (next.querySelector && next.querySelector('iframe')) {
      iframe = next.querySelector('iframe');
    }
    if (!iframe) return;

    // Create wrapper div
    var wrap = document.createElement('div');
    wrap.className = 'diagram-wrap';

    // Insert wrapper before the iframe (or its parent element)
    var iframeParent = iframe.parentNode;
    var iframeTarget = iframe.tagName === 'IFRAME' && iframeParent.tagName === 'P' ? iframeParent : iframe;
    iframeTarget.parentNode.insertBefore(wrap, iframeTarget);
    wrap.appendChild(iframeTarget);

    // Add fullscreen button
    var btn = document.createElement('button');
    btn.className = 'diagram-fullscreen-btn';
    btn.title = 'Open fullscreen';
    btn.innerHTML = '&#x26F6;';
    btn.addEventListener('click', function () {
      var src = iframe.getAttribute('src');
      if (src) window.open(src, '_blank');
    });
    wrap.appendChild(btn);
  });
});
