// LUT Explorer MicroSim
// Interactive 4-input Look-Up Table demonstration
// Bloom Level: Apply (L3)

let containerWidth;
let canvasWidth = 400;
let drawHeight = 450;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

// LUT state: 16 SRAM cells storing output values
let lutCells = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

// 4 input bits: A(MSB), B, C, D(LSB)
let inputBits = [0, 0, 0, 0];

// Currently selected preset function name
let currentPreset = 'Custom';

// Preset function definitions
const presets = {
  'AND':  [0,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,1],
  'OR':   [0,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,1],
  'XOR':  [0,1,1,0, 1,0,0,1, 1,0,0,1, 0,1,1,0],
  'NAND': [1,1,1,1, 1,1,1,1, 1,1,1,1, 1,1,1,0],
  'NOR':  [1,0,0,0, 0,0,0,0, 0,0,0,0, 0,0,0,0],
  'XNOR': [1,0,0,1, 0,1,1,0, 0,1,1,0, 1,0,0,1]
};

// Preset button definitions
const presetNames = ['AND', 'OR', 'XOR', 'NAND', 'NOR', 'XNOR', 'Custom'];

const colors = {
  active: '#4CAF50',
  inactive: '#E0E0E0',
  highlight: '#FFC107',
  header: '#2196F3',
  wire: '#666',
  bg: '#f5f5f5',
  text: '#212121',
  cellBorder: '#BDBDBD',
  mux: '#7E57C2'
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  describe('Interactive 4-input LUT explorer showing SRAM cells and address selection', LABEL);
}

function draw() {
  updateCanvasSize();

  // Background
  fill(colors.bg);
  noStroke();
  rect(0, 0, canvasWidth, drawHeight);

  // Control area
  fill(243, 245, 250);
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill(colors.text);
  noStroke();
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(18);
  text('4-Input LUT Explorer', canvasWidth / 2, 18);
  textStyle(NORMAL);
  // Decorative underline
  stroke(220);
  strokeWeight(1);
  line(canvasWidth / 2 - 80, 30, canvasWidth / 2 + 80, 30);

  // Compute current address from input bits
  let currentAddress = inputBits[0] * 8 + inputBits[1] * 4 + inputBits[2] * 2 + inputBits[3];
  let outputValue = lutCells[currentAddress];

  // Readout panel
  let addrStr = inputBits[0].toString() + inputBits[1].toString() + inputBits[2].toString() + inputBits[3].toString();
  let panelW = 320;
  let panelX = (canvasWidth - panelW) / 2;
  let panelY = 36;
  fill(247, 249, 252);
  stroke(210, 215, 225);
  strokeWeight(1);
  rect(panelX, panelY, panelW, 22, 8);
  // Accent line
  noStroke();
  fill(33, 150, 243);
  rect(panelX, panelY + 4, 4, 14, 2, 0, 0, 2);
  // Readout text
  textAlign(LEFT, CENTER);
  textSize(11);
  fill(33, 150, 243);
  text('Addr: ' + addrStr + ' (cell ' + currentAddress + ')', panelX + 14, panelY + 11);
  fill(76, 175, 80);
  text('= ' + outputValue, panelX + 160, panelY + 11);
  fill(120);
  text('|  Function: ' + currentPreset, panelX + 185, panelY + 11);

  // Draw input toggles
  drawInputToggles();

  // Draw SRAM grid
  drawSramGrid(currentAddress);

  // Draw MUX symbol
  drawMuxSymbol(currentAddress, outputValue);

  // Draw output display
  drawOutput(outputValue);

  // Draw preset buttons
  drawPresetButtons();

  // Instructions in control area
  let instrW = canvasWidth - 24;
  fill(235, 237, 242);
  noStroke();
  rect(12, drawHeight + 3, instrW, 18, 8);
  fill(100);
  textAlign(CENTER, CENTER);
  textSize(10);
  text('Click inputs to toggle  |  Click SRAM cells to set values  |  Select preset functions below', canvasWidth / 2, drawHeight + 12);

  // Cursor management
  let overInteractive = false;
  // Check input toggles
  for (let i = 0; i < 4; i++) {
    let iy = 90 + i * 55;
    if (dist(mouseX, mouseY, 50, iy) < 22) overInteractive = true;
  }
  // Check SRAM cells
  let gx = 120, gy = 65, cs = 40, hs = 30;
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      let cx = gx + hs + c * cs;
      let cy = gy + hs + r * cs;
      if (mouseX >= cx && mouseX <= cx + cs && mouseY >= cy && mouseY <= cy + cs) overInteractive = true;
    }
  }
  // Check preset buttons
  let bW = (canvasWidth - 20) / presetNames.length;
  for (let i = 0; i < presetNames.length; i++) {
    let bx = 10 + i * bW;
    if (mouseX >= bx && mouseX <= bx + bW - 4 && mouseY >= drawHeight + 28 && mouseY <= drawHeight + 46) overInteractive = true;
  }
  cursor(overInteractive ? HAND : ARROW);
}

// Draw the 4 input toggle circles on the left
function drawInputToggles() {
  let startX = 50;
  let startY = 90;
  let spacing = 55;
  let labels = ['A', 'B', 'C', 'D'];

  fill(colors.text);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(13);
  text('Inputs', startX, startY - 25);

  for (let i = 0; i < 4; i++) {
    let y = startY + i * spacing;
    let isHigh = inputBits[i] === 1;

    // Circle
    fill(isHigh ? colors.active : colors.inactive);
    stroke(colors.wire);
    strokeWeight(2);
    ellipse(startX, y, 40);

    // Label and value
    fill(isHigh ? 'white' : colors.text);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(14);
    text(labels[i] + ':' + inputBits[i], startX, y);

    // Wire from input to grid area
    stroke(isHigh ? colors.active : '#BDBDBD');
    strokeWeight(isHigh ? 2 : 1);
    line(startX + 22, y, 110, y);
  }
}

// Draw the 4x4 SRAM cell grid in the center
function drawSramGrid(currentAddress) {
  let gridX = 120;
  let gridY = 65;
  let cellSize = 40;
  let headerSize = 30;

  // Grid title
  fill(colors.text);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(12);
  text('SRAM Cells (Truth Table)', gridX + headerSize + cellSize * 2, gridY - 15);

  // Column headers (top two bits of address)
  textSize(10);
  textAlign(CENTER, CENTER);
  for (let col = 0; col < 4; col++) {
    let x = gridX + headerSize + col * cellSize;
    let colBits = ((col >> 1) & 1).toString() + (col & 1).toString();
    fill(colors.header);
    noStroke();
    rect(x, gridY, cellSize, headerSize, 3);
    fill('white');
    text('CD=' + colBits, x + cellSize / 2, gridY + headerSize / 2);
  }

  // Row headers (bottom two bits of address)
  for (let row = 0; row < 4; row++) {
    let y = gridY + headerSize + row * cellSize;
    let rowBits = ((row >> 1) & 1).toString() + (row & 1).toString();
    fill(colors.header);
    noStroke();
    rect(gridX, y, headerSize, cellSize, 3);
    fill('white');
    textAlign(CENTER, CENTER);
    text('AB=' + rowBits, gridX + headerSize / 2, y + cellSize / 2);
  }

  // Draw cells in gray-code-like order mapping to linear addresses
  // Row = AB bits, Col = CD bits
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      let cellIndex = row * 4 + col;
      let x = gridX + headerSize + col * cellSize;
      let y = gridY + headerSize + row * cellSize;
      let isCurrentAddr = cellIndex === currentAddress;
      let cellVal = lutCells[cellIndex];

      // Cell background with glow on active cell
      if (isCurrentAddr) {
        // Glow ring
        noStroke();
        fill(255, 193, 7, 50);
        rect(x - 3, y - 3, cellSize + 6, cellSize + 6, 7);
        fill(colors.highlight);
        stroke('#F57F17');
        strokeWeight(2.5);
        rect(x, y, cellSize, cellSize, 5);
      } else {
        fill(cellVal === 1 ? '#C8E6C9' : 'white');
        stroke(colors.cellBorder);
        strokeWeight(1);
        rect(x, y, cellSize, cellSize, 3);
      }

      // Cell value
      fill(cellVal === 1 ? '#2E7D32' : '#999');
      noStroke();
      textAlign(CENTER, CENTER);
      textSize(16);
      text(cellVal, x + cellSize / 2, y + cellSize / 2 - 6);

      // Cell address label
      textSize(8);
      fill('#999');
      text('[' + cellIndex + ']', x + cellSize / 2, y + cellSize / 2 + 12);
    }
  }
}

// Draw the MUX symbol on the right side
function drawMuxSymbol(currentAddress, outputValue) {
  let muxX = canvasWidth - 140;
  let muxY = 80;
  let muxW = 60;
  let muxH = 200;

  // MUX body (trapezoid)
  fill(colors.mux);
  stroke('#4527A0');
  strokeWeight(2);
  beginShape();
  vertex(muxX, muxY);
  vertex(muxX + muxW, muxY + 30);
  vertex(muxX + muxW, muxY + muxH - 30);
  vertex(muxX, muxY + muxH);
  endShape(CLOSE);

  // MUX label
  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  text('16:1', muxX + muxW / 2, muxY + muxH / 2 - 10);
  text('MUX', muxX + muxW / 2, muxY + muxH / 2 + 8);

  // Address input arrow from below
  stroke(colors.highlight);
  strokeWeight(2);
  let addrX = muxX + muxW / 2;
  line(addrX, muxY + muxH + 5, addrX, muxY + muxH + 35);
  // Arrow head
  fill(colors.highlight);
  noStroke();
  triangle(addrX - 5, muxY + muxH + 10, addrX + 5, muxY + muxH + 10, addrX, muxY + muxH + 2);

  // Address label
  fill(colors.text);
  textSize(10);
  textAlign(CENTER, TOP);
  text('Addr: ' + currentAddress, addrX, muxY + muxH + 38);

  // Output arrow to the right
  stroke(outputValue === 1 ? colors.active : '#F44336');
  strokeWeight(3);
  let outY = muxY + muxH / 2;
  line(muxX + muxW, outY, muxX + muxW + 40, outY);
  // Arrow head
  fill(outputValue === 1 ? colors.active : '#F44336');
  noStroke();
  triangle(muxX + muxW + 35, outY - 5, muxX + muxW + 35, outY + 5, muxX + muxW + 45, outY);

  // Input indication - line from grid area to MUX
  stroke(colors.wire);
  strokeWeight(1);
  setLineDash([4, 4]);
  line(120 + 30 + 4 * 40 + 5, muxY + muxH / 2, muxX - 5, muxY + muxH / 2);
  setLineDash([]);
}

// Draw the output display
function drawOutput(outputValue) {
  let outX = canvasWidth - 40;
  let outY = 180;

  // Output circle
  fill(outputValue === 1 ? colors.active : '#F44336');
  stroke(colors.wire);
  strokeWeight(2);
  ellipse(outX, outY, 45);

  // Output value
  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(20);
  text(outputValue, outX, outY);

  // Label
  fill(colors.text);
  textSize(11);
  text('OUT', outX, outY + 33);
}

// Draw preset function buttons at the bottom
function drawPresetButtons() {
  let btnY = drawHeight + 28;
  let btnW = (canvasWidth - 20) / presetNames.length;
  let btnH = 18;
  let startX = 10;

  for (let i = 0; i < presetNames.length; i++) {
    let x = startX + i * btnW;
    let isActive = currentPreset === presetNames[i];

    if (isActive) {
      // Glow behind active button
      noStroke();
      fill(33, 150, 243, 30);
      rect(x - 1, btnY - 1, btnW - 2, btnH + 2, 6);
    }
    fill(isActive ? colors.header : '#E8E8E8');
    stroke(isActive ? '#1565C0' : '#CACACA');
    strokeWeight(1);
    rect(x, btnY, btnW - 4, btnH, 5);

    fill(isActive ? 'white' : colors.text);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(10);
    textStyle(isActive ? BOLD : NORMAL);
    text(presetNames[i], x + (btnW - 4) / 2, btnY + btnH / 2);
    textStyle(NORMAL);
  }
}

// Helper to set dashed lines
function setLineDash(list) {
  drawingContext.setLineDash(list);
}

function mousePressed() {
  // Check input toggle clicks
  let startX = 50;
  let startY = 90;
  let spacing = 55;
  for (let i = 0; i < 4; i++) {
    let y = startY + i * spacing;
    if (dist(mouseX, mouseY, startX, y) < 22) {
      inputBits[i] = 1 - inputBits[i];
      return;
    }
  }

  // Check SRAM cell clicks
  let gridX = 120;
  let gridY = 65;
  let cellSize = 40;
  let headerSize = 30;
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      let x = gridX + headerSize + col * cellSize;
      let y = gridY + headerSize + row * cellSize;
      if (mouseX >= x && mouseX <= x + cellSize && mouseY >= y && mouseY <= y + cellSize) {
        let cellIndex = row * 4 + col;
        lutCells[cellIndex] = 1 - lutCells[cellIndex];
        currentPreset = 'Custom';
        return;
      }
    }
  }

  // Check preset button clicks
  let btnY = drawHeight + 28;
  let btnW = (canvasWidth - 20) / presetNames.length;
  let btnH = 18;
  let startBtnX = 10;
  for (let i = 0; i < presetNames.length; i++) {
    let x = startBtnX + i * btnW;
    if (mouseX >= x && mouseX <= x + btnW - 4 && mouseY >= btnY && mouseY <= btnY + btnH) {
      let name = presetNames[i];
      currentPreset = name;
      if (presets[name]) {
        lutCells = presets[name].slice();
      }
      return;
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
