/**
 * Audio Summary Player
 * Initializes all .audio-summary containers into full-featured players.
 * Supports multiple independent instances per page.
 */
(function () {
  'use strict';

  /* ---- SVG icons ---- */
  var ICON_PLAY =
    '<svg class="icon-play" viewBox="0 0 24 24" fill="currentColor"><polygon points="7,4 21,12 7,20"/></svg>';
  var ICON_PAUSE =
    '<svg class="icon-pause" viewBox="0 0 24 24" fill="currentColor"><rect x="5" y="4" width="4" height="16"/><rect x="15" y="4" width="4" height="16"/></svg>';
  var ICON_STOP =
    '<svg class="icon-stop" viewBox="0 0 24 24" fill="currentColor"><rect x="5" y="5" width="14" height="14" rx="1"/></svg>';
  var ICON_HEADPHONES =
    '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 3a9 9 0 0 0-9 9v7c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2v-3c0-1.1-.9-2-2-2H5v-2a7 7 0 1 1 14 0v2h-2c-1.1 0-2 .9-2 2v3c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2v-7a9 9 0 0 0-9-9z"/></svg>';

  var SPEEDS = [1, 1.25, 1.5, 2];

  function fmt(seconds) {
    if (!seconds || !isFinite(seconds)) return '0:00';
    var m = Math.floor(seconds / 60);
    var s = Math.floor(seconds % 60);
    return m + ':' + (s < 10 ? '0' : '') + s;
  }

  function el(tag, cls) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    return node;
  }

  function initPlayer(container) {
    var audio = container.querySelector('audio');
    if (!audio || container.dataset.playerReady) return;
    container.dataset.playerReady = 'true';

    /* ---- Build DOM ---- */

    // Header
    var header = el('div', 'audio-summary__header');
    header.innerHTML = ICON_HEADPHONES + ' Audio Summary';

    // Play button
    var playBtn = el('button', 'audio-summary__btn audio-summary__btn--play');
    playBtn.type = 'button';
    playBtn.setAttribute('aria-label', 'Play');
    playBtn.innerHTML = ICON_PLAY;

    // Stop button
    var stopBtn = el('button', 'audio-summary__btn audio-summary__btn--stop');
    stopBtn.type = 'button';
    stopBtn.setAttribute('aria-label', 'Stop');
    stopBtn.innerHTML = ICON_STOP;

    // Progress bar
    var progressWrap = el('div', 'audio-summary__progress-wrap');
    var progressBar = el('div', 'audio-summary__progress');
    var progressFill = el('div', 'audio-summary__progress-fill');
    progressBar.appendChild(progressFill);

    // Time
    var timeRow = el('div', 'audio-summary__time');
    var curTime = el('span');
    curTime.textContent = '0:00';
    var durTime = el('span');
    durTime.textContent = '0:00';
    timeRow.appendChild(curTime);
    timeRow.appendChild(durTime);

    progressWrap.appendChild(progressBar);
    progressWrap.appendChild(timeRow);

    // Controls row
    var controls = el('div', 'audio-summary__controls');
    controls.appendChild(playBtn);
    controls.appendChild(progressWrap);
    controls.appendChild(stopBtn);

    // Speed row
    var speedRow = el('div', 'audio-summary__speed');
    var speedLabel = el('span', 'audio-summary__speed-label');
    speedLabel.textContent = 'Speed';
    speedRow.appendChild(speedLabel);

    var speedBtns = [];
    SPEEDS.forEach(function (rate) {
      var btn = el('button', 'audio-summary__speed-btn');
      if (rate === 1) btn.classList.add('active');
      btn.type = 'button';
      btn.textContent = rate + '\u00d7';
      btn.dataset.rate = rate;
      btn.addEventListener('click', function () {
        audio.playbackRate = rate;
        speedBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
      });
      speedRow.appendChild(btn);
      speedBtns.push(btn);
    });

    // Insert into container (before the hidden <audio>)
    container.insertBefore(header, audio);
    container.insertBefore(controls, audio);
    container.insertBefore(speedRow, audio);

    /* ---- State helpers ---- */

    function setPlaying() {
      playBtn.innerHTML = ICON_PAUSE;
      playBtn.setAttribute('aria-label', 'Pause');
      stopBtn.classList.add('visible');
    }

    function setPaused() {
      playBtn.innerHTML = ICON_PLAY;
      playBtn.setAttribute('aria-label', 'Play');
      // Keep stop visible while paused (audio hasn't ended)
    }

    function setIdle() {
      playBtn.innerHTML = ICON_PLAY;
      playBtn.setAttribute('aria-label', 'Play');
      stopBtn.classList.remove('visible');
      progressFill.style.width = '0%';
      curTime.textContent = '0:00';
    }

    /* ---- Audio events ---- */

    audio.addEventListener('loadedmetadata', function () {
      durTime.textContent = fmt(audio.duration);
    });

    audio.addEventListener('durationchange', function () {
      durTime.textContent = fmt(audio.duration);
    });

    audio.addEventListener('timeupdate', function () {
      curTime.textContent = fmt(audio.currentTime);
      if (audio.duration) {
        progressFill.style.width = (audio.currentTime / audio.duration * 100) + '%';
      }
    });

    audio.addEventListener('play', setPlaying);
    audio.addEventListener('pause', function () {
      if (audio.currentTime > 0 && !audio.ended) setPaused();
    });
    audio.addEventListener('ended', setIdle);

    /* ---- User interactions ---- */

    playBtn.addEventListener('click', function () {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    });

    stopBtn.addEventListener('click', function () {
      audio.pause();
      audio.currentTime = 0;
      setIdle();
    });

    // Seek on progress bar click / drag
    function seek(e) {
      if (!audio.duration) return;
      var rect = progressBar.getBoundingClientRect();
      var pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      audio.currentTime = pct * audio.duration;
    }

    var dragging = false;

    progressBar.addEventListener('mousedown', function (e) {
      dragging = true;
      seek(e);
    });

    document.addEventListener('mousemove', function (e) {
      if (dragging) seek(e);
    });

    document.addEventListener('mouseup', function () {
      dragging = false;
    });

    // Touch support
    progressBar.addEventListener('touchstart', function (e) {
      seek(e.touches[0]);
    }, { passive: true });

    progressBar.addEventListener('touchmove', function (e) {
      seek(e.touches[0]);
    }, { passive: true });
  }

  /* ---- Init ---- */

  function init() {
    var containers = document.querySelectorAll('.audio-summary');
    for (var i = 0; i < containers.length; i++) {
      initPlayer(containers[i]);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // MkDocs Material instant navigation support
  var lastUrl = location.href;
  new MutationObserver(function () {
    if (location.href !== lastUrl) {
      lastUrl = location.href;
      setTimeout(init, 300);
    }
  }).observe(document.body, { childList: true, subtree: true });
})();
