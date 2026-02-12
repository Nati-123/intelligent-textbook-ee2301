/**
 * Text-to-Speech Reader for Unit Overviews
 * Uses the Web Speech API for browser-native narration.
 * Places accessible play/pause/stop controls ABOVE the details element
 * so they are always visible even when the overview is collapsed.
 */
(function () {
  'use strict';

  var synth = window.speechSynthesis || null;
  var currentUtterance = null;
  var currentPlayBtn = null;

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
        text += 'Number ' + (j + 1) + '. ' + items[j].textContent + ' ';
      }
    }
    return text.trim();
  }

  function setButtonState(btn, state) {
    var icon = btn.querySelector('.tts-icon');
    var label = btn.querySelector('.tts-label');
    btn.setAttribute('data-state', state);
    if (state === 'playing') {
      icon.textContent = '\u23F8';
      label.textContent = 'Pause';
      btn.setAttribute('aria-label', 'Pause narration');
    } else if (state === 'paused') {
      icon.textContent = '\u25B6';
      label.textContent = 'Resume';
      btn.setAttribute('aria-label', 'Resume narration');
    } else {
      icon.textContent = '\u25B6';
      label.textContent = 'Listen to Overview';
      btn.setAttribute('aria-label', 'Listen to unit overview');
    }
  }

  function stopAll() {
    if (synth) synth.cancel();
    if (currentPlayBtn) {
      setButtonState(currentPlayBtn, 'idle');
      currentPlayBtn = null;
    }
    currentUtterance = null;
  }

  function handlePlay(btn, details) {
    if (!synth) return;
    var state = btn.getAttribute('data-state') || 'idle';

    if (state === 'playing') {
      synth.pause();
      setButtonState(btn, 'paused');
      return;
    }

    if (state === 'paused' && currentPlayBtn === btn) {
      synth.resume();
      setButtonState(btn, 'playing');
      return;
    }

    stopAll();
    details.open = true;

    var text = getOverviewText(details);
    if (!text) return;

    var utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    utterance.lang = 'en-US';

    // Pick a good voice if available
    var voices = synth.getVoices();
    for (var i = 0; i < voices.length; i++) {
      if (voices[i].lang.indexOf('en') === 0 && voices[i].localService === false) {
        utterance.voice = voices[i];
        break;
      }
    }

    utterance.onend = function () {
      setButtonState(btn, 'idle');
      currentPlayBtn = null;
      currentUtterance = null;
    };

    utterance.onerror = function () {
      setButtonState(btn, 'idle');
      currentPlayBtn = null;
      currentUtterance = null;
    };

    currentUtterance = utterance;
    currentPlayBtn = btn;
    setButtonState(btn, 'playing');
    synth.speak(utterance);
  }

  function createControls(details) {
    // Skip if controls already added
    if (details.previousElementSibling && details.previousElementSibling.classList.contains('tts-controls')) {
      return;
    }

    var container = document.createElement('div');
    container.className = 'tts-controls';

    var playBtn = document.createElement('button');
    playBtn.className = 'tts-btn tts-play';
    playBtn.type = 'button';
    playBtn.setAttribute('data-state', 'idle');
    playBtn.setAttribute('aria-label', 'Listen to unit overview');
    playBtn.innerHTML = '<span class="tts-icon">\u25B6</span> <span class="tts-label">Listen to Overview</span>';

    playBtn.addEventListener('click', function (e) {
      e.preventDefault();
      handlePlay(playBtn, details);
    });

    var stopBtn = document.createElement('button');
    stopBtn.className = 'tts-btn tts-stop';
    stopBtn.type = 'button';
    stopBtn.setAttribute('aria-label', 'Stop narration');
    stopBtn.innerHTML = '<span class="tts-icon">\u25A0</span> <span class="tts-label">Stop</span>';

    stopBtn.addEventListener('click', function (e) {
      e.preventDefault();
      stopAll();
    });

    container.appendChild(playBtn);
    container.appendChild(stopBtn);

    // Insert BEFORE the details element so buttons are always visible
    details.parentNode.insertBefore(container, details);
  }

  function init() {
    var overviews = document.querySelectorAll('details.video-overview');
    for (var i = 0; i < overviews.length; i++) {
      createControls(overviews[i]);
    }
  }

  // Show a message if speech synthesis is not supported
  function showUnsupported() {
    var overviews = document.querySelectorAll('details.video-overview');
    for (var i = 0; i < overviews.length; i++) {
      if (overviews[i].previousElementSibling && overviews[i].previousElementSibling.classList.contains('tts-controls')) {
        continue;
      }
      var msg = document.createElement('div');
      msg.className = 'tts-controls';
      msg.innerHTML = '<em style="color:#888;font-size:0.9rem;">Text-to-Speech is not supported in this browser.</em>';
      overviews[i].parentNode.insertBefore(msg, overviews[i]);
    }
  }

  function startup() {
    if (!synth) {
      showUnsupported();
      return;
    }
    init();
  }

  // MkDocs Material instant loading support
  var defined = false;
  try { defined = typeof document$ !== 'undefined' && document$; } catch(e) {}

  if (defined) {
    document$.subscribe(function () {
      stopAll();
      startup();
    });
  } else {
    // Fallback: run on DOMContentLoaded and also on load
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', startup);
    } else {
      startup();
    }
    window.addEventListener('load', function () {
      startup();
    });
  }
})();
