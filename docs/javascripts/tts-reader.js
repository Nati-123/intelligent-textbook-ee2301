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

    try {
      // The content inside <details> is raw text (no <p> tags).
      // Use innerHTML replacement — simple, reliable.
      var html = details.innerHTML;
      var cut = html.indexOf('</summary>');
      if (cut < 0) return;
      cut += '</summary>'.length;

      var before = html.substring(0, cut);
      var content = html.substring(cut);

      var idx = 0;
      var wrapped = content.replace(/([^.!?]*[.!?]+)/g, function (match) {
        return '<span class="tts-sentence" data-idx="' + (idx++) + '">' + match + '</span>';
      });

      if (idx === 0) return; // nothing matched
      details.innerHTML = before + wrapped;
    } catch (e) {
      // Sentence wrapping failed — playback still works via fallback
    }
  }

  /* ---- Chunk building from sentence spans ---- */

  function buildChunksFromSpans(details) {
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

  /* ---- Fallback text extraction (no highlighting) ---- */

  function getOverviewText(details) {
    var fullText = details.textContent || '';
    var summary = details.querySelector('summary');
    if (summary) {
      fullText = fullText.replace(summary.textContent, '');
    }
    return fullText.replace(/\s+/g, ' ').trim();
  }

  function splitIntoChunks(text) {
    var sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    var result = [];
    var current = '';
    for (var i = 0; i < sentences.length; i++) {
      if ((current + sentences[i]).length > 200) {
        if (current) result.push(current.trim());
        current = sentences[i];
      } else {
        current += sentences[i];
      }
    }
    if (current.trim()) result.push(current.trim());
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

    // Try sentence-span approach first (enables highlighting)
    var result = buildChunksFromSpans(details);

    if (result.chunks.length) {
      chunks = result.chunks;
      chunkMap = result.map;
    } else {
      // Fallback: raw text extraction (no highlighting)
      var text = getOverviewText(details);
      if (!text) return;
      chunks = splitIntoChunks(text);
      chunkMap = [];
    }

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

    // Wrap sentences for highlighting and hover (non-blocking)
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
