// Analog vs Digital Signals MicroSim
// Compare continuous analog signals with discrete digital signals
// Bloom Level: Understand (L2) - Compare, contrast, explain
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 370;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 20;
let noiseSlider;
let timeOffset = 0;
let showThreshold = true;

function setup() {
  updateCanvasSize();
  var mainElement = document.querySelector('main');

  // -- Nav bar: Fullscreen (in iframe) / Back to Docs (standalone) --
  var navBar = document.createElement('div');
  navBar.style.cssText = 'display:flex;justify-content:flex-end;padding:4px 8px;background:#37474F;';
  var navLink = document.createElement('a');
  navLink.style.cssText = 'font-size:12px;font-weight:bold;color:#80CBC4;text-decoration:none;';
  if (window.self !== window.top) {
    var parentUrl = '';
    try { parentUrl = window.parent.location.href; } catch(e) {}
    navLink.href = 'main.html' + (parentUrl ? '?back=' + encodeURIComponent(parentUrl) : '');
    navLink.target = '_blank';
    navLink.textContent = '⛶ Fullscreen';
  } else {
    var params = new URLSearchParams(window.location.search);
    var backUrl = params.get('back');
    navLink.href = backUrl || 'index.html';
    navLink.textContent = '← Back to Docs';
  }
  navBar.appendChild(navLink);
  mainElement.appendChild(navBar);

  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(mainElement);

  // Noise slider
  noiseSlider = createSlider(0, 50, 10);
  noiseSlider.size(150);

  positionUIElements();

  describe('Comparison of analog and digital signal representations with noise visualization', LABEL);
}

function positionUIElements() {
  let mainRect = document.querySelector('main').getBoundingClientRect();
  noiseSlider.position(mainRect.left + 120, mainRect.top + drawHeight + 15);
}

function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  text('Analog vs Digital Signals', canvasWidth / 2, 10);

  let panelWidth = (canvasWidth - 3 * margin) / 2;
  let panelHeight = 140;

  // Analog panel
  drawPanel(margin, 45, panelWidth, panelHeight, 'Analog Signal', true);

  // Digital panel
  drawPanel(margin * 2 + panelWidth, 45, panelWidth, panelHeight, 'Digital Signal', false);

  // Comparison table
  drawComparison(220);

  // Controls
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(14);
  text('Noise Level:', 20, drawHeight + 25);
  text(noiseSlider.value() + '%', 280, drawHeight + 25);

  textSize(12);
  text('Digital signals maintain integrity despite noise', 20, drawHeight + 55);

  timeOffset += 0.02;
}

function drawPanel(x, y, w, h, title, isAnalog) {
  // Panel background
  fill('white');
  stroke('#ccc');
  strokeWeight(1);
  rect(x, y, w, h, 5);

  // Title
  fill(isAnalog ? '#2196f3' : '#4CAF50');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(12);
  text(title, x + w / 2, y + 5);

  // Draw signal
  let graphX = x + 10;
  let graphY = y + 25;
  let graphW = w - 20;
  let graphH = h - 35;

  // Grid
  stroke('#eee');
  strokeWeight(1);
  for (let i = 0; i <= 4; i++) {
    let ly = graphY + (graphH / 4) * i;
    line(graphX, ly, graphX + graphW, ly);
  }

  let noiseLevel = noiseSlider.value() / 100;

  if (isAnalog) {
    // Analog: smooth sine wave with noise
    stroke('#2196f3');
    strokeWeight(2);
    noFill();
    beginShape();
    for (let i = 0; i <= graphW; i++) {
      let t = (i / graphW) * TWO_PI * 2 + timeOffset;
      let baseValue = sin(t) * 0.4;
      let noise = (random() - 0.5) * noiseLevel * 0.8;
      let yVal = graphY + graphH / 2 - (baseValue + noise) * graphH;
      vertex(graphX + i, yVal);
    }
    endShape();

    // Show noise corruption
    if (noiseLevel > 0.2) {
      fill('#f44336');
      noStroke();
      textSize(9);
      textAlign(CENTER, BOTTOM);
      text('Signal corrupted!', x + w / 2, y + h - 2);
    }
  } else {
    // Digital: square wave
    stroke('#4CAF50');
    strokeWeight(2);
    noFill();

    // Threshold lines
    if (showThreshold) {
      stroke('#ccc');
      strokeWeight(1);
      let highThresh = graphY + graphH * 0.2;
      let lowThresh = graphY + graphH * 0.8;
      line(graphX, highThresh, graphX + graphW, highThresh);
      line(graphX, lowThresh, graphX + graphW, lowThresh);

      fill('#999');
      noStroke();
      textSize(8);
      textAlign(RIGHT, CENTER);
      text('HIGH', graphX - 2, highThresh);
      text('LOW', graphX - 2, lowThresh);
    }

    stroke('#4CAF50');
    strokeWeight(2);
    beginShape();
    let state = 0;
    for (let i = 0; i <= graphW; i++) {
      let t = (i / graphW) * TWO_PI * 2 + timeOffset;
      let baseValue = sin(t) > 0 ? 0.4 : -0.4;
      let noise = (random() - 0.5) * noiseLevel * 0.8;
      let displayValue = baseValue + noise;

      // Digital interpretation (threshold)
      let digitalValue = displayValue > 0 ? 0.35 : -0.35;
      let yVal = graphY + graphH / 2 - digitalValue * graphH;

      if (i > 0 && ((displayValue > 0) !== (state > 0))) {
        // Vertical transition
        vertex(graphX + i, graphY + graphH / 2 - state * graphH);
        vertex(graphX + i, yVal);
      }
      state = digitalValue;
      vertex(graphX + i, yVal);
    }
    endShape();

    // Show noise immunity
    fill('#4CAF50');
    noStroke();
    textSize(9);
    textAlign(CENTER, BOTTOM);
    text('Signal intact!', x + w / 2, y + h - 2);
  }
}

function drawComparison(startY) {
  let tableX = margin;
  let tableW = canvasWidth - 2 * margin;

  fill(240);
  stroke('silver');
  strokeWeight(1);
  rect(tableX, startY, tableW, 130, 5);

  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);
  text('Comparison:', tableX + 10, startY + 8);

  textSize(11);
  let col1 = tableX + 10;
  let col2 = tableX + tableW / 2;
  let rowH = 18;
  let y = startY + 28;

  // Headers
  fill('#2196f3');
  text('Analog', col1, y);
  fill('#4CAF50');
  text('Digital', col2, y);

  fill('#333');
  y += rowH;
  text('• Continuous values', col1, y);
  text('• Discrete values (0, 1)', col2, y);

  y += rowH;
  text('• Infinite precision', col1, y);
  text('• Fixed precision', col2, y);

  y += rowH;
  text('• Susceptible to noise', col1, y);
  text('• Noise immune (threshold)', col2, y);

  y += rowH;
  text('• Signal degrades', col1, y);
  text('• Perfect copies possible', col2, y);

  y += rowH;
  text('• Ex: Audio, temperature', col1, y);
  text('• Ex: Computer data', col2, y);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  positionUIElements();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
