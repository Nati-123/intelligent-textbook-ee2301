/**
 * Text-to-Speech Reader for Unit Overviews
 * Uses the Web Speech API for browser-native narration.
 * Adds accessible play/pause/stop controls to each unit overview.
 */
(function () {
  'use strict';

  if (!('speechSynthesis' in window)) return;

  var synth = window.speechSynthesis;
  var currentUtterance = null;
  var currentBtn = null;

  function getOverviewText(details) {
    var paragraphs = details.querySelectorAll('p');
    var text = '';
    for (var i = 0; i < paragraphs.length; i++) {
      text += paragraphs[i].textContent + ' ';
    }
    // Include key takeaways from the ordered list
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
      icon.textContent = '\u275A\u275A';
      label.textContent = 'Pause';
      btn.setAttribute('aria-label', 'Pause narration');
    } else if (state === 'paused') {
      icon.textContent = '\u25B6';
      label.textContent = 'Resume';
      btn.setAttribute('aria-label', 'Resume narration');
    } else {
      icon.textContent = '\u25B6';
      label.textContent = 'Listen';
      btn.setAttribute('aria-label', 'Listen to unit overview');
    }
  }

  function stopAll() {
    synth.cancel();
    if (currentBtn) {
      setButtonState(currentBtn, 'idle');
      currentBtn = null;
    }
    currentUtterance = null;
  }

  function handleClick(btn, details) {
    var state = btn.getAttribute('data-state') || 'idle';

    if (state === 'playing') {
      synth.pause();
      setButtonState(btn, 'paused');
      return;
    }

    if (state === 'paused' && currentBtn === btn) {
      synth.resume();
      setButtonState(btn, 'playing');
      return;
    }

    // Stop any other playing narration
    stopAll();

    // Expand the details element so user can follow along
    details.open = true;

    var text = getOverviewText(details);
    var utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    // Try to pick a good English voice
    var voices = synth.getVoices();
    for (var i = 0; i < voices.length; i++) {
      if (voices[i].lang.indexOf('en') === 0 && voices[i].name.indexOf('Google') >= 0) {
        utterance.voice = voices[i];
        break;
      }
    }

    utterance.onend = function () {
      setButtonState(btn, 'idle');
      currentBtn = null;
      currentUtterance = null;
    };

    utterance.onerror = function () {
      setButtonState(btn, 'idle');
      currentBtn = null;
      currentUtterance = null;
    };

    currentUtterance = utterance;
    currentBtn = btn;
    setButtonState(btn, 'playing');
    synth.speak(utterance);
  }

  function createControls(details) {
    var container = document.createElement('div');
    container.className = 'tts-controls';

    var playBtn = document.createElement('button');
    playBtn.className = 'tts-btn tts-play';
    playBtn.setAttribute('data-state', 'idle');
    playBtn.setAttribute('aria-label', 'Listen to unit overview');
    playBtn.innerHTML = '<span class="tts-icon">\u25B6</span> <span class="tts-label">Listen</span>';

    playBtn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      handleClick(playBtn, details);
    });

    var stopBtn = document.createElement('button');
    stopBtn.className = 'tts-btn tts-stop';
    stopBtn.setAttribute('aria-label', 'Stop narration');
    stopBtn.innerHTML = '<span class="tts-icon">\u25A0</span> <span class="tts-label">Stop</span>';

    stopBtn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      stopAll();
    });

    container.appendChild(playBtn);
    container.appendChild(stopBtn);

    // Insert after the summary element
    var summary = details.querySelector('summary');
    if (summary) {
      summary.parentNode.insertBefore(container, summary.nextSibling);
    }
  }

  function init() {
    var overviews = document.querySelectorAll('details.video-overview');
    for (var i = 0; i < overviews.length; i++) {
      createControls(overviews[i]);
    }
  }

  // Voices may load asynchronously
  if (synth.getVoices().length === 0) {
    synth.addEventListener('voiceschanged', function () {}, { once: true });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Re-initialize on MkDocs page navigation (instant loading)
  if (typeof document$ !== 'undefined') {
    document$.subscribe(function () {
      stopAll();
      init();
    });
  }
})();
