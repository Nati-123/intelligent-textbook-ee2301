/**
 * Text-to-Speech Reader for Unit Overviews
 * Uses the Web Speech API for browser-native narration.
 * Supports sentence-level highlighting during playback.
 */
(function () {
  'use strict';

  var synth = window.speechSynthesis;
  if (!synth) return;

  var playing = false;
  var paused = false;
  var chunks = [];
  var chunkIndex = 0;
  var chunkMap = [];
  var currentBtn = null;
  var currentDetails = null;

  /* ---- Sentence wrapping ---- */

  function wrapSentences(details) {
    if (details.dataset.ttsSentencesWrapped) return;
    details.dataset.ttsSentencesWrapped = 'true';

    var summary = details.querySelector('summary');
    var allNodes = details.querySelectorAll('p, li');
    var contentNodes = [];
    for (var i = 0; i < allNodes.length; i++) {
      if (!summary || !summary.contains(allNodes[i])) {
        contentNodes.push(allNodes[i]);
      }
    }

    var sentenceIndex = 0;

    for (var n = 0; n < contentNodes.length; n++) {
      var walker = document.createTreeWalker(contentNodes[n], NodeFilter.SHOW_TEXT, null, false);
      var textNodes = [];
      var tn;
      while (tn = walker.nextNode()) {
        if (tn.textContent.trim()) textNodes.push(tn);
      }

      for (var t = 0; t < textNodes.length; t++) {
        var text = textNodes[t].textContent;
        var sentences = text.match(/[^.!?]*[.!?]+/g) || [];
        var matchedLength = sentences.join('').length;
        var remaining = text.substring(matchedLength).trim();

        // Text with no sentence endings — wrap whole thing
        if (!sentences.length) {
          if (!remaining) continue;
          var solo = document.createElement('span');
          solo.className = 'tts-sentence';
          solo.dataset.idx = sentenceIndex++;
          solo.textContent = remaining;
          textNodes[t].parentNode.replaceChild(solo, textNodes[t]);
          continue;
        }

        var fragment = document.createDocumentFragment();
        for (var s = 0; s < sentences.length; s++) {
          var span = document.createElement('span');
          span.className = 'tts-sentence';
          span.dataset.idx = sentenceIndex++;
          span.textContent = sentences[s];
          fragment.appendChild(span);
        }

        if (remaining) {
          var rSpan = document.createElement('span');
          rSpan.className = 'tts-sentence';
          rSpan.dataset.idx = sentenceIndex++;
          rSpan.textContent = ' ' + remaining;
          fragment.appendChild(rSpan);
        }

        textNodes[t].parentNode.replaceChild(fragment, textNodes[t]);
      }
    }
  }

  /* ---- Chunk building from sentence spans ---- */

  function buildChunksFromDetails(details) {
    var spans = details.querySelectorAll('.tts-sentence');
    var result = { chunks: [], map: [] };
    var current = '';
    var currentIndices = [];

    for (var i = 0; i < spans.length; i++) {
      var text = spans[i].textContent.trim();
      if (!text) continue;

      if ((current + ' ' + text).length > 200 && current) {
        result.chunks.push(current.trim());
        result.map.push(currentIndices.slice());
        current = text;
        currentIndices = [parseInt(spans[i].dataset.idx, 10)];
      } else {
        current += (current ? ' ' : '') + text;
        currentIndices.push(parseInt(spans[i].dataset.idx, 10));
      }
    }

    if (current.trim()) {
      result.chunks.push(current.trim());
      result.map.push(currentIndices.slice());
    }

    return result;
  }

  /* ---- Highlighting ---- */

  function highlightChunk() {
    if (!currentDetails || chunkIndex >= chunkMap.length) return;
    clearHighlights();
    var indices = chunkMap[chunkIndex];
    for (var i = 0; i < indices.length; i++) {
      var span = currentDetails.querySelector('.tts-sentence[data-idx="' + indices[i] + '"]');
      if (span) span.classList.add('tts-reading');
    }
  }

  function clearHighlights() {
    if (!currentDetails) return;
    var reading = currentDetails.querySelectorAll('.tts-sentence.tts-reading');
    for (var i = 0; i < reading.length; i++) {
      reading[i].classList.remove('tts-reading');
    }
  }

  /* ---- Button state ---- */

  function updateButton(btn, state) {
    if (!btn) return;
    var icon = btn.querySelector('.tts-icon');
    var label = btn.querySelector('.tts-label');
    var controls = btn.closest('.tts-controls');
    if (state === 'playing') {
      icon.textContent = '\u23F8';
      label.textContent = 'Pause';
      if (controls) controls.classList.add('tts-active');
    } else if (state === 'paused') {
      icon.textContent = '\u25B6';
      label.textContent = 'Resume';
    } else {
      icon.textContent = '\u25B6';
      label.textContent = 'Listen to Overview';
      if (controls) controls.classList.remove('tts-active');
    }
  }

  /* ---- Speaking ---- */

  function speakNextChunk() {
    if (chunkIndex >= chunks.length) {
      stopSpeaking();
      return;
    }

    highlightChunk();

    var utterance = new SpeechSynthesisUtterance(chunks[chunkIndex]);
    utterance.lang = 'en-US';
    utterance.rate = 0.95;

    utterance.onend = function () {
      chunkIndex++;
      if (playing && !paused) {
        speakNextChunk();
      }
    };

    utterance.onerror = function () {
      stopSpeaking();
    };

    synth.speak(utterance);
  }

  function stopSpeaking() {
    synth.cancel();
    clearHighlights();
    playing = false;
    paused = false;
    chunks = [];
    chunkIndex = 0;
    chunkMap = [];
    updateButton(currentBtn, 'idle');
    currentBtn = null;
    currentDetails = null;
  }

  function startSpeaking(btn, details) {
    stopSpeaking();
    details.open = true;

    var result = buildChunksFromDetails(details);
    if (!result.chunks.length) return;

    chunks = result.chunks;
    chunkMap = result.map;
    chunkIndex = 0;
    playing = true;
    paused = false;
    currentBtn = btn;
    currentDetails = details;
    updateButton(btn, 'playing');
    speakNextChunk();
  }

  function togglePlay(btn, details) {
    if (playing && currentBtn === btn && !paused) {
      synth.pause();
      paused = true;
      updateButton(btn, 'paused');
    } else if (playing && currentBtn === btn && paused) {
      synth.resume();
      paused = false;
      updateButton(btn, 'playing');
    } else {
      startSpeaking(btn, details);
    }
  }

  /* ---- Controls setup ---- */

  function addControls(details) {
    if (details.getAttribute('data-tts-ready')) return;
    details.setAttribute('data-tts-ready', 'true');

    // Wrap sentences for highlighting and hover
    wrapSentences(details);

    var container = document.createElement('div');
    container.className = 'tts-controls';

    var playBtn = document.createElement('button');
    playBtn.className = 'tts-btn tts-play';
    playBtn.type = 'button';
    playBtn.setAttribute('aria-label', 'Listen to unit overview');
    playBtn.innerHTML = '<span class="tts-icon">\u25B6</span> <span class="tts-label">Listen to Overview</span>';
    playBtn.addEventListener('click', function () {
      togglePlay(playBtn, details);
    });

    var stopBtn = document.createElement('button');
    stopBtn.className = 'tts-btn tts-stop';
    stopBtn.type = 'button';
    stopBtn.setAttribute('aria-label', 'Stop narration');
    stopBtn.innerHTML = '<span class="tts-icon">\u25A0</span> <span class="tts-label">Stop</span>';
    stopBtn.addEventListener('click', function () {
      stopSpeaking();
    });

    container.appendChild(playBtn);
    container.appendChild(stopBtn);
    details.parentNode.insertBefore(container, details);
  }

  function init() {
    var overviews = document.querySelectorAll('details.video-overview');
    for (var i = 0; i < overviews.length; i++) {
      addControls(overviews[i]);
    }
  }

  // Run now
  init();

  // Re-init on page navigation (MkDocs Material instant loading)
  var lastUrl = location.href;
  new MutationObserver(function () {
    if (location.href !== lastUrl) {
      lastUrl = location.href;
      stopSpeaking();
      setTimeout(init, 300);
    }
  }).observe(document.body, { childList: true, subtree: true });
})();
