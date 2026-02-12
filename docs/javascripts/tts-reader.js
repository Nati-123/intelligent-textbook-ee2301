/**
 * Text-to-Speech Reader for Unit Overviews
 * Uses the Web Speech API for browser-native narration.
 */
(function () {
  'use strict';

  var synth = window.speechSynthesis;
  if (!synth) return;

  var playing = false;
  var paused = false;
  var chunks = [];
  var chunkIndex = 0;
  var currentBtn = null;

  // Split text into sentences to avoid Chrome's ~15s cutoff bug
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

  function getOverviewText(details) {
    var paragraphs = details.querySelectorAll('p');
    var text = '';
    for (var i = 0; i < paragraphs.length; i++) {
      text += paragraphs[i].textContent + ' ';
    }
    var items = details.querySelectorAll('ol li');
    if (items.length > 0) {
      text += 'Key Takeaways. ';
      for (var j = 0; j < items.length; j++) {
        text += (j + 1) + '. ' + items[j].textContent + '. ';
      }
    }
    return text.trim();
  }

  function updateButton(btn, state) {
    if (!btn) return;
    var icon = btn.querySelector('.tts-icon');
    var label = btn.querySelector('.tts-label');
    if (state === 'playing') {
      icon.textContent = '\u23F8';
      label.textContent = 'Pause';
    } else if (state === 'paused') {
      icon.textContent = '\u25B6';
      label.textContent = 'Resume';
    } else {
      icon.textContent = '\u25B6';
      label.textContent = 'Listen to Overview';
    }
  }

  function speakNextChunk() {
    if (chunkIndex >= chunks.length) {
      stopSpeaking();
      return;
    }
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
    playing = false;
    paused = false;
    chunks = [];
    chunkIndex = 0;
    updateButton(currentBtn, 'idle');
    currentBtn = null;
  }

  function startSpeaking(btn, details) {
    stopSpeaking();
    details.open = true;

    var text = getOverviewText(details);
    if (!text) return;

    chunks = splitIntoChunks(text);
    chunkIndex = 0;
    playing = true;
    paused = false;
    currentBtn = btn;
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

  function addControls(details) {
    if (details.getAttribute('data-tts-ready')) return;
    details.setAttribute('data-tts-ready', 'true');

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
