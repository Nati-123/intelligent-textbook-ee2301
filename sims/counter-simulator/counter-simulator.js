// Counter Simulator MicroSim
// Interactive 4-bit binary synchronous up/down counter
// Bloom Level: Understand/Apply (L2-L3)

let containerWidth;
let canvasWidth = 400;
let drawHeight = 460;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;

let count = 0;
let autoCount = false;
let countUp = true;
let lastAutoTime = 0;
let clockPulses = 0;
let clockFlash = 0;
let upBtn, downBtn, autoBtn, resetBtn;

const colors = {
  high:    '#4CAF50',
  low:     '#F44336',
  counter: '#673AB7',
  wire:    '#666',
  bg:      '#f5f5f5',
  text:    '#212121',
  accent:  '#5A3EED',
  clock:   '#FF9800',
  msbLsb:  '#7B1FA2'
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  upBtn = createButton('⏱ Count Up');
  upBtn.mousePressed(() => {
    count = (count + 1) % 16;
    countUp = true;
    clockPulses++;
    clockFlash = 14;
  });

  downBtn = createButton('⏱ Count Down');
  downBtn.mousePressed(() => {
    count = (count - 1 + 16) % 16;
    countUp = false;
    clockPulses++;
    clockFlash = 14;
  });

  autoBtn = createButton('Auto: OFF');
  autoBtn.mousePressed(() => {
    autoCount = !autoCount;
    autoBtn.html('Auto: ' + (autoCount ? 'ON' : 'OFF'));
  });

  resetBtn = createButton('Reset');
  resetBtn.mousePressed(() => { count = 0; clockPulses = 0; });

  styleButton(upBtn);
  styleButton(downBtn);
  styleButton(autoBtn);
  styleButton(resetBtn);

  positionUIElements();
  describe('Interactive 4-bit binary counter simulator', LABEL);
}

function styleButton(btn) {
  btn.style('font-family', 'Arial, sans-serif');
  btn.style('font-size', '13px');
  btn.style('padding', '7px 12px');
  btn.style('border', '2px solid #5A3EED');
  btn.style('border-radius', '6px');
  btn.style('background', '#F0EDFF');
  btn.style('color', '#5A3EED');
  btn.style('cursor', 'pointer');
  btn.style('font-weight', '600');
}

function positionUIElements() {
  let mainRect = document.querySelector('main').getBoundingClientRect();
  let btnY = mainRect.top + drawHeight + 12;
  let btnWidths = [130, 140, 100, 80];
  let btnGap = 10;
  let totalBtnW = btnWidths.reduce((a, b) => a + b, 0) + btnGap * 3;
  let btnStartX = mainRect.left + (canvasWidth - totalBtnW) / 2;

  upBtn.position(btnStartX, btnY);
  upBtn.style('width', btnWidths[0] + 'px');
  downBtn.position(btnStartX + btnWidths[0] + btnGap, btnY);
  downBtn.style('width', btnWidths[1] + 'px');
  autoBtn.position(btnStartX + btnWidths[0] + btnWidths[1] + btnGap * 2, btnY);
  autoBtn.style('width', btnWidths[2] + 'px');
  resetBtn.position(btnStartX + btnWidths[0] + btnWidths[1] + btnWidths[2] + btnGap * 3, btnY);
  resetBtn.style('width', btnWidths[3] + 'px');
}

function draw() {
  updateCanvasSize();

  // Auto counting
  if (autoCount && millis() - lastAutoTime > 500) {
    if (countUp) {
      count = (count + 1) % 16;
    } else {
      count = (count - 1 + 16) % 16;
    }
    clockPulses++;
    clockFlash = 14;
    lastAutoTime = millis();
  }

  if (clockFlash > 0) clockFlash--;

  // Background
  fill(colors.bg);
  noStroke();
  rect(0, 0, canvasWidth, drawHeight);

  // Control area
  fill('white');
  stroke('#ddd');
  strokeWeight(1);
  rect(0, drawHeight, canvasWidth, controlHeight);

  drawTitle();
  drawCounter();
  drawStateCircle();
  drawClockInfo();
  drawInstructions();
}

function drawTitle() {
  fill(colors.text);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(16);
  textStyle(BOLD);
  text('4-Bit Binary Counter', canvasWidth / 2, 10);
  textStyle(NORMAL);
  textSize(12);
  fill('#666');
  text('Synchronous ' + (countUp ? 'Up' : 'Down') + ' Counter', canvasWidth / 2, 32);
}

function drawCounter() {
  let centerX = canvasWidth / 2;
  let y = 70;

  // Large decimal display in a styled circle
  let decCircleR = 48;
  if (clockFlash > 8) {
    fill('#EDE7F6');
  } else {
    fill('#F3F0FF');
  }
  stroke(colors.counter);
  strokeWeight(2);
  ellipse(centerX, y + 28, decCircleR * 2);

  fill(colors.counter);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(48);
  textStyle(BOLD);
  text(count, centerX, y + 27);
  textStyle(NORMAL);

  // "Decimal" label below circle
  textSize(10);
  fill('#666');
  text('Decimal', centerX, y + 60);

  // Flip-flop representations
  let bits = [];
  for (let i = 3; i >= 0; i--) {
    bits.push((count >> i) & 1);
  }

  let ffW = 54;
  let ffGap = 14;
  let totalW = 4 * ffW + 3 * ffGap;
  let startX = centerX - totalW / 2;
  let ffY = y + 85;

  // MSB / LSB labels above the row
  fill(colors.msbLsb);
  noStroke();
  textSize(9);
  textStyle(BOLD);
  textAlign(CENTER, BOTTOM);
  text('MSB', startX + ffW / 2, ffY - 22);
  text('LSB', startX + 3 * (ffW + ffGap) + ffW / 2, ffY - 22);
  textStyle(NORMAL);

  // Bit weight labels
  fill('#666');
  textSize(9);
  textAlign(CENTER, BOTTOM);
  for (let i = 0; i < 4; i++) {
    let x = startX + i * (ffW + ffGap);
    let weight = Math.pow(2, 3 - i);
    text('2' + superscript(3 - i) + ' = ' + weight, x + ffW / 2, ffY - 2);
  }

  // Draw FF boxes
  for (let i = 0; i < 4; i++) {
    let x = startX + i * (ffW + ffGap);
    let bitVal = bits[i];

    // FF box with flash effect
    let boxColor = bitVal ? colors.high : colors.low;
    if (clockFlash > 8) {
      fill(lerpColor(color(boxColor), color(255), 0.3));
    } else {
      fill(boxColor);
    }
    stroke(bitVal ? '#388E3C' : '#D32F2F');
    strokeWeight(2);
    rect(x, ffY, ffW, 56, 6);

    // Value
    fill('white');
    noStroke();
    textSize(26);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text(bitVal, x + ffW / 2, ffY + 28);
    textStyle(NORMAL);

    // Bit label below box
    fill(colors.text);
    textSize(12);
    textStyle(BOLD);
    text('Q' + (3 - i), x + ffW / 2, ffY + 68);
    textStyle(NORMAL);
  }

  // Binary / Decimal display box
  let dispY = ffY + 86;
  fill('#E8EAF6');
  stroke('#9FA8DA');
  strokeWeight(1);
  rect(canvasWidth * 0.12, dispY, canvasWidth * 0.76, 38, 8);

  fill(colors.text);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);
  textStyle(BOLD);

  let binaryStr = bits.map(b => b.toString()).join('  ');
  text('Binary:  ' + binaryStr, canvasWidth / 2, dispY + 12);

  textStyle(NORMAL);
  textSize(11);
  let binaryCompact = bits.join('');
  text(binaryCompact + '\u2082  =  ' + count + '\u2081\u2080', canvasWidth / 2, dispY + 28);
}

function superscript(n) {
  const sup = ['\u2070', '\u00B9', '\u00B2', '\u00B3'];
  return sup[n] || n.toString();
}

function drawStateCircle() {
  let centerX = canvasWidth / 2;
  let centerY = 370;
  let radius = 58;

  // Background circle
  fill('#EDE7F6');
  stroke('#B39DDB');
  strokeWeight(1.5);
  ellipse(centerX, centerY, radius * 2 + 8);

  // State dots
  for (let i = 0; i < 16; i++) {
    let angle = (i / 16) * TWO_PI - HALF_PI;
    let x = centerX + cos(angle) * (radius - 8);
    let y = centerY + sin(angle) * (radius - 8);

    if (i === count) {
      // Active state - larger highlighted dot
      fill(colors.counter);
      noStroke();
      ellipse(x, y, 22);
      fill('white');
      textSize(9);
      textStyle(BOLD);
    } else {
      fill('#9E9E9E');
      noStroke();
      ellipse(x, y, 6);
      fill(colors.text);
      textSize(7);
      textStyle(NORMAL);
    }
    textAlign(CENTER, CENTER);
    if (i === count) {
      text(i, x, y);
    } else {
      // Place number outside dot for non-active states
      let lx = centerX + cos(angle) * (radius + 10);
      let ly = centerY + sin(angle) * (radius + 10);
      text(i, lx, ly);
    }
    textStyle(NORMAL);
  }

  // Direction arrow pointer
  let arrowAngle = (count / 16) * TWO_PI - HALF_PI;
  let ax = centerX + cos(arrowAngle) * (radius - 8);
  let ay = centerY + sin(arrowAngle) * (radius - 8);

  stroke(colors.counter);
  strokeWeight(2.5);
  line(centerX, centerY, ax, ay);

  // Center dot
  fill(colors.counter);
  noStroke();
  ellipse(centerX, centerY, 8);

  // Circular arrow to show direction
  noFill();
  stroke(countUp ? colors.high : colors.low);
  strokeWeight(2);
  let arcStart = arrowAngle + 0.3;
  let arcEnd = arrowAngle + (countUp ? 1.2 : -1.2);
  if (countUp) {
    arc(centerX, centerY, radius * 0.7, radius * 0.7, arcStart, arcEnd);
  } else {
    arc(centerX, centerY, radius * 0.7, radius * 0.7, arcEnd, arcStart);
  }

  // Label
  fill(colors.text);
  noStroke();
  textSize(10);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text('Counter State Diagram (Mod-16)', centerX, centerY + radius + 24);
  textStyle(NORMAL);
}

function drawClockInfo() {
  let y = drawHeight - 30;

  // Clock pulse indicator
  if (clockFlash > 0) {
    fill('#FFF3E0');
    noStroke();
    rect(canvasWidth / 2 - 100, y - 11, 200, 22, 11);
    fill(colors.clock);
  } else {
    fill(colors.text);
  }

  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  textStyle(BOLD);
  text('\u23F1 Clock Pulses: ' + clockPulses, canvasWidth / 2, y);
  textStyle(NORMAL);
}

function drawInstructions() {
  let y = drawHeight + 52;

  fill('#F0EDFF');
  noStroke();
  rect(canvasWidth * 0.05, y - 4, canvasWidth * 0.9, 34, 8);

  fill('#5A3EED');
  textAlign(CENTER, CENTER);
  textSize(10.5);
  text('Each button press = one clock pulse (rising edge).', canvasWidth / 2, y + 6);
  text('The counter increments or decrements by 1 on every clock pulse.', canvasWidth / 2, y + 20);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, canvasHeight);
  positionUIElements();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
