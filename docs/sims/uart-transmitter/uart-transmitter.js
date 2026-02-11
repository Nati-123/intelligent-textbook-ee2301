// UART Transmitter MicroSim
// Visualize UART serial transmission with shift register and waveform

let containerWidth;
let canvasWidth = 400;
let drawHeight = 500;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

// Data bits (8-bit value, MSB first in array index 0)
let dataBits = [0, 1, 0, 0, 0, 0, 0, 1]; // 'A' = 0x41

// UART frame: [start] + 8 data bits (LSB first) + [stop]
let uartFrame = [];     // 10 bits: start + data[LSB..MSB] + stop
let currentBitIndex = -1;  // -1 = idle, 0-9 = transmitting
let transmitState = 'idle'; // idle, transmitting, done

// Waveform history
let waveform = [];

// Colors
const COLOR_IDLE_HIGH = '#4CAF50';
const COLOR_ACTIVE_LOW = '#E91E63';
const COLOR_DATA = '#2196F3';
const COLOR_SHIFT_BG = '#E3F2FD';

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  describe('UART transmitter showing parallel to serial conversion with shift register and waveform output', LABEL);
  buildFrame();
}

function draw() {
  updateCanvasSize();
  background(245);

  drawInputSection();
  drawShiftRegister();
  drawWaveform();
  drawControls();
}

function buildFrame() {
  // UART sends LSB first
  // Frame: [start=0] [D0] [D1] [D2] [D3] [D4] [D5] [D6] [D7] [stop=1]
  uartFrame = [0]; // start bit
  for (let i = 7; i >= 0; i--) {
    uartFrame.push(dataBits[i]); // LSB first: bit 7 is MSB, bit 0 is LSB
  }
  uartFrame.push(1); // stop bit
}

function getAsciiChar() {
  let val = 0;
  for (let i = 0; i < 8; i++) {
    val = (val << 1) | dataBits[i];
  }
  if (val >= 32 && val <= 126) return String.fromCharCode(val);
  return '?';
}

function getByteValue() {
  let val = 0;
  for (let i = 0; i < 8; i++) {
    val = (val << 1) | dataBits[i];
  }
  return val;
}

function drawInputSection() {
  let sectionY = 10;

  // Title
  fill(50);
  noStroke();
  textSize(13);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text("8-Bit Parallel Input", canvasWidth / 2, sectionY);
  textStyle(NORMAL);

  // Bit cells
  let cellW = 38;
  let cellH = 40;
  let cellGap = 4;
  let totalW = 8 * cellW + 7 * cellGap;
  let startX = (canvasWidth - totalW) / 2;
  let cellY = sectionY + 22;

  // Bit position labels
  fill(120);
  textSize(9);
  textAlign(CENTER, BOTTOM);
  for (let i = 0; i < 8; i++) {
    let cx = startX + i * (cellW + cellGap) + cellW / 2;
    text("b" + (7 - i), cx, cellY - 1);
  }

  // Clickable bit cells
  for (let i = 0; i < 8; i++) {
    let cx = startX + i * (cellW + cellGap);
    let bit = dataBits[i];

    let isHover = mouseX > cx && mouseX < cx + cellW &&
                  mouseY > cellY && mouseY < cellY + cellH;

    fill(bit === 1 ? COLOR_DATA : '#FFF');
    stroke(bit === 1 ? '#1565C0' : '#CCC');
    strokeWeight(isHover ? 2.5 : 1.5);
    rect(cx, cellY, cellW, cellH, 5);

    fill(bit === 1 ? 255 : '#666');
    noStroke();
    textSize(20);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text(bit, cx + cellW / 2, cellY + cellH / 2);
    textStyle(NORMAL);
  }

  // Store input cell bounds for click detection
  this._inputCells = { startX, cellY, cellW, cellH, cellGap };

  // ASCII and hex display
  let infoY = cellY + cellH + 8;
  fill(80);
  noStroke();
  textSize(12);
  textAlign(CENTER, TOP);
  let byteVal = getByteValue();
  let asciiChar = getAsciiChar();
  text("Hex: 0x" + byteVal.toString(16).toUpperCase().padStart(2, '0') +
       "  |  Dec: " + byteVal +
       "  |  ASCII: '" + asciiChar + "'", canvasWidth / 2, infoY);

  // Preset buttons
  let presetY = infoY + 20;
  let presets = [
    { label: "'A'", bits: [0, 1, 0, 0, 0, 0, 0, 1] },
    { label: "'Z'", bits: [0, 1, 0, 1, 1, 0, 1, 0] },
    { label: "'0'", bits: [0, 0, 1, 1, 0, 0, 0, 0] }
  ];

  let pBtnW = 50;
  let pBtnH = 22;
  let pBtnGap = 10;
  let pStartX = canvasWidth / 2 - (presets.length * pBtnW + (presets.length - 1) * pBtnGap) / 2;

  this._presetButtons = [];
  for (let i = 0; i < presets.length; i++) {
    let px = pStartX + i * (pBtnW + pBtnGap);
    let isHover = mouseX > px && mouseX < px + pBtnW &&
                  mouseY > presetY && mouseY < presetY + pBtnH;

    fill(isHover ? '#1565C0' : COLOR_DATA);
    noStroke();
    rect(px, presetY, pBtnW, pBtnH, 4);

    fill(255);
    textSize(11);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text(presets[i].label, px + pBtnW / 2, presetY + pBtnH / 2);
    textStyle(NORMAL);

    this._presetButtons.push({ x: px, y: presetY, w: pBtnW, h: pBtnH, bits: presets[i].bits });
  }
}

function drawShiftRegister() {
  let sectionY = 145;

  // Title
  fill(50);
  noStroke();
  textSize(13);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text("Shift Register (UART Frame)", canvasWidth / 2, sectionY);
  textStyle(NORMAL);

  // 10 cells: start + 8 data + stop
  let cellW = 38;
  let cellH = 45;
  let cellGap = 3;
  let totalW = 10 * cellW + 9 * cellGap;
  let startX = (canvasWidth - totalW) / 2;
  let cellY = sectionY + 20;

  // Labels
  let labels = ["Start", "D0", "D1", "D2", "D3", "D4", "D5", "D6", "D7", "Stop"];

  for (let i = 0; i < 10; i++) {
    let cx = startX + i * (cellW + cellGap);
    let isCurrent = (transmitState === 'transmitting' && i === currentBitIndex);
    let isTransmitted = (transmitState === 'transmitting' && i < currentBitIndex) ||
                        (transmitState === 'done');

    // Cell background
    let bgColor;
    if (isCurrent) {
      bgColor = COLOR_ACTIVE_LOW;
    } else if (isTransmitted) {
      bgColor = '#E0E0E0';
    } else if (transmitState !== 'idle') {
      bgColor = COLOR_SHIFT_BG;
    } else {
      bgColor = '#F5F5F5';
    }

    fill(bgColor);
    stroke(isCurrent ? '#880E4F' : '#B0BEC5');
    strokeWeight(isCurrent ? 3 : 1);
    rect(cx, cellY, cellW, cellH, 4);

    // Label
    fill(isCurrent ? 255 : '#666');
    noStroke();
    textSize(8);
    textAlign(CENTER, TOP);
    text(labels[i], cx + cellW / 2, cellY + 3);

    // Bit value
    if (transmitState !== 'idle') {
      fill(isCurrent ? 255 : '#333');
      textSize(18);
      textStyle(BOLD);
      textAlign(CENTER, CENTER);
      text(uartFrame[i], cx + cellW / 2, cellY + cellH / 2 + 5);
      textStyle(NORMAL);
    }
  }

  // Transmission direction arrow
  if (transmitState === 'transmitting') {
    let arrowY = cellY + cellH + 8;
    fill(COLOR_ACTIVE_LOW);
    noStroke();
    textSize(10);
    textAlign(CENTER, TOP);
    text(">>> Serial Output (LSB first) >>>", canvasWidth / 2, arrowY);
  }

  // Bit counter
  fill(100);
  textSize(11);
  textAlign(CENTER, TOP);
  let statusText = transmitState === 'idle' ? "Ready" :
                   transmitState === 'done' ? "Transmission Complete" :
                   "Transmitting bit " + currentBitIndex + " of 9";
  text(statusText, canvasWidth / 2, cellY + cellH + 22);
}

function drawWaveform() {
  let wfY = 255;
  let wfH = 150;
  let wfX = 50;
  let wfW = canvasWidth - 80;

  // Title
  fill(50);
  noStroke();
  textSize(13);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text("Serial Output Waveform", canvasWidth / 2, wfY);
  textStyle(NORMAL);

  let graphY = wfY + 20;
  let graphH = wfH - 25;
  let highY = graphY + 10;
  let lowY = graphY + graphH - 10;

  // Background
  fill(255);
  stroke(200);
  strokeWeight(1);
  rect(wfX, graphY, wfW, graphH, 3);

  // Y-axis labels
  fill(80);
  noStroke();
  textSize(10);
  textAlign(RIGHT, CENTER);
  text("1", wfX - 5, highY);
  text("0", wfX - 5, lowY);

  // X-axis grid and labels
  let numSlots = 12; // idle + start + 8 data + stop + idle
  let slotW = wfW / numSlots;
  let slotLabels = ["idle", "start", "D0", "D1", "D2", "D3", "D4", "D5", "D6", "D7", "stop", "idle"];

  for (let i = 0; i <= numSlots; i++) {
    let x = wfX + i * slotW;
    stroke(230);
    strokeWeight(0.5);
    line(x, graphY, x, graphY + graphH);
  }

  // Slot labels
  fill(100);
  noStroke();
  textSize(8);
  textAlign(CENTER, TOP);
  for (let i = 0; i < numSlots; i++) {
    text(slotLabels[i], wfX + (i + 0.5) * slotW, graphY + graphH + 3);
  }

  // Draw waveform
  // Build full signal: idle(high) + frame bits + idle(high)
  let fullSignal = [1]; // idle high
  if (transmitState !== 'idle') {
    let bitsToShow = (transmitState === 'done') ? 10 : currentBitIndex + 1;
    for (let i = 0; i < bitsToShow; i++) {
      fullSignal.push(uartFrame[i]);
    }
  }

  // Draw the waveform
  stroke(COLOR_DATA);
  strokeWeight(2.5);
  noFill();

  if (fullSignal.length > 0) {
    let prevLevel = fullSignal[0];
    let prevX = wfX;
    let prevY_val = prevLevel === 1 ? highY : lowY;

    // Draw idle line before start
    line(prevX, prevY_val, wfX + slotW, prevY_val);

    for (let i = 1; i < fullSignal.length; i++) {
      let x1 = wfX + i * slotW;
      let x2 = wfX + (i + 1) * slotW;
      let level = fullSignal[i];
      let yVal = level === 1 ? highY : lowY;
      let prevYVal = fullSignal[i - 1] === 1 ? highY : lowY;

      // Transition line
      if (level !== fullSignal[i - 1]) {
        line(x1, prevYVal, x1, yVal);
      }

      // Horizontal line
      line(x1, yVal, Math.min(x2, wfX + wfW), yVal);

      // Color the slot background
      let slotColor;
      if (i === 1) slotColor = COLOR_ACTIVE_LOW;     // Start bit
      else if (i === 10) slotColor = COLOR_IDLE_HIGH; // Stop bit
      else slotColor = COLOR_DATA;                     // Data bits

      noStroke();
      fill(red(color(slotColor)), green(color(slotColor)), blue(color(slotColor)), 30);
      rect(x1, graphY + 1, slotW, graphH - 2);
      stroke(COLOR_DATA);
      strokeWeight(2.5);
    }

    // Remaining idle line
    if (transmitState === 'done') {
      let endX = wfX + 11 * slotW;
      line(endX, highY, wfX + wfW, highY);
    } else if (transmitState === 'idle') {
      // Full idle line
      stroke(COLOR_IDLE_HIGH);
      line(wfX, highY, wfX + wfW, highY);
    }
  }

  // Current bit indicator
  if (transmitState === 'transmitting') {
    let indicatorX = wfX + (currentBitIndex + 1) * slotW + slotW / 2;
    fill(COLOR_ACTIVE_LOW);
    noStroke();
    triangle(indicatorX, graphY - 2, indicatorX - 5, graphY - 8, indicatorX + 5, graphY - 8);
  }
}

function drawControls() {
  // Control area background
  fill(230);
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  let btnW = 80;
  let btnH = 30;
  let btnGap = 10;
  let totalBtnW = 3 * btnW + 2 * btnGap;
  let startBtnX = canvasWidth / 2 - totalBtnW / 2;
  let btnY = drawHeight + 10;

  // Transmit button
  let txHover = mouseX > startBtnX && mouseX < startBtnX + btnW &&
                mouseY > btnY && mouseY < btnY + btnH;
  fill(transmitState === 'idle' ? (txHover ? '#388E3C' : COLOR_IDLE_HIGH) : '#BDBDBD');
  stroke(transmitState === 'idle' ? '#2E7D32' : '#999');
  strokeWeight(1);
  rect(startBtnX, btnY, btnW, btnH, 5);
  fill(255);
  noStroke();
  textSize(12);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text("Transmit", startBtnX + btnW / 2, btnY + btnH / 2);

  // Step button
  let stepX = startBtnX + btnW + btnGap;
  let stepHover = mouseX > stepX && mouseX < stepX + btnW &&
                  mouseY > btnY && mouseY < btnY + btnH;
  let stepEnabled = (transmitState === 'transmitting');
  fill(stepEnabled ? (stepHover ? '#1565C0' : COLOR_DATA) : '#BDBDBD');
  stroke(stepEnabled ? '#0D47A1' : '#999');
  rect(stepX, btnY, btnW, btnH, 5);
  fill(255);
  noStroke();
  text("Step", stepX + btnW / 2, btnY + btnH / 2);

  // Reset button
  let resetX = stepX + btnW + btnGap;
  let resetHover = mouseX > resetX && mouseX < resetX + btnW &&
                   mouseY > btnY && mouseY < btnY + btnH;
  fill(resetHover ? '#D32F2F' : '#F44336');
  stroke('#C62828');
  rect(resetX, btnY, btnW, btnH, 5);
  fill(255);
  noStroke();
  text("Reset", resetX + btnW / 2, btnY + btnH / 2);
  textStyle(NORMAL);

  // Store button bounds
  this._txBtn = { x: startBtnX, y: btnY, w: btnW, h: btnH };
  this._stepBtn = { x: stepX, y: btnY, w: btnW, h: btnH };
  this._resetBtn = { x: resetX, y: btnY, w: btnW, h: btnH };
}

function startTransmit() {
  if (transmitState !== 'idle') return;
  buildFrame();
  transmitState = 'transmitting';
  currentBitIndex = 0;
}

function stepBit() {
  if (transmitState !== 'transmitting') return;
  currentBitIndex++;
  if (currentBitIndex >= 10) {
    transmitState = 'done';
    currentBitIndex = 9;
  }
}

function resetTransmit() {
  transmitState = 'idle';
  currentBitIndex = -1;
  waveform = [];
}

function mousePressed() {
  // Check Transmit button
  if (this._txBtn) {
    let b = this._txBtn;
    if (mouseX > b.x && mouseX < b.x + b.w && mouseY > b.y && mouseY < b.y + b.h) {
      startTransmit();
      return;
    }
  }

  // Check Step button
  if (this._stepBtn) {
    let b = this._stepBtn;
    if (mouseX > b.x && mouseX < b.x + b.w && mouseY > b.y && mouseY < b.y + b.h) {
      stepBit();
      return;
    }
  }

  // Check Reset button
  if (this._resetBtn) {
    let b = this._resetBtn;
    if (mouseX > b.x && mouseX < b.x + b.w && mouseY > b.y && mouseY < b.y + b.h) {
      resetTransmit();
      return;
    }
  }

  // Check preset buttons
  if (this._presetButtons) {
    for (let btn of this._presetButtons) {
      if (mouseX > btn.x && mouseX < btn.x + btn.w &&
          mouseY > btn.y && mouseY < btn.y + btn.h) {
        dataBits = [...btn.bits];
        resetTransmit();
        buildFrame();
        return;
      }
    }
  }

  // Check input bit cells (toggle bits)
  if (this._inputCells && transmitState === 'idle') {
    let ic = this._inputCells;
    for (let i = 0; i < 8; i++) {
      let cx = ic.startX + i * (ic.cellW + ic.cellGap);
      if (mouseX > cx && mouseX < cx + ic.cellW &&
          mouseY > ic.cellY && mouseY < ic.cellY + ic.cellH) {
        dataBits[i] = 1 - dataBits[i];
        buildFrame();
        return;
      }
    }
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
