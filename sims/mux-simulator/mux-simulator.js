// Multiplexer Simulator MicroSim
// Interactive 4-to-1 MUX demonstration
// Bloom Level: Understand/Apply (L2-L3)

let containerWidth;
let canvasWidth = 400;
let drawHeight = 450;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;

let dataInputs = [false, true, false, true]; // D0-D3
let selectInputs = [false, false]; // S1, S0

const colors = {
  high: '#4CAF50',
  low: '#F44336',
  selected: '#FFC107',
  mux: '#2196F3',
  wire: '#666',
  bg: '#f5f5f5',
  text: '#212121'
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  describe('Interactive 4-to-1 multiplexer simulator', LABEL);
}

function draw() {
  updateCanvasSize();

  // Background
  fill(colors.bg);
  noStroke();
  rect(0, 0, canvasWidth, drawHeight);

  // Control area
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill(colors.text);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(18);
  text('4-to-1 Multiplexer Simulator', canvasWidth / 2, 10);

  // Calculate selected input
  let selectVal = (selectInputs[0] ? 2 : 0) + (selectInputs[1] ? 1 : 0);
  let output = dataInputs[selectVal];

  // Subtitle
  textSize(12);
  fill('#666');
  text(`Select = ${selectInputs[0] ? 1 : 0}${selectInputs[1] ? 1 : 0} → D${selectVal} selected`, canvasWidth / 2, 35);

  // Draw MUX
  drawMux(selectVal, output);

  // Draw data inputs
  drawDataInputs(selectVal);

  // Draw select inputs
  drawSelectInputs();

  // Draw output
  drawOutput(output);

  // Draw truth table
  drawTruthTable(selectVal);

  // Instructions
  fill(colors.text);
  textAlign(CENTER, CENTER);
  textSize(11);
  text('Click inputs to toggle values', canvasWidth / 2, drawHeight + 30);
}

function drawMux(selectVal, output) {
  let muxX = 160;
  let muxY = 120;
  let muxW = 80;
  let muxH = 180;

  // MUX body (trapezoid shape)
  fill(colors.mux);
  stroke('#1565C0');
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
  textSize(14);
  text('MUX', muxX + muxW / 2, muxY + muxH / 2 - 20);
  textSize(11);
  text('4-to-1', muxX + muxW / 2, muxY + muxH / 2);

  // Input labels on MUX
  textSize(10);
  for (let i = 0; i < 4; i++) {
    let inputY = muxY + 30 + i * 35;
    fill(i === selectVal ? colors.selected : 'white');
    text(`D${i}`, muxX + 15, inputY);
  }

  // Select input label
  fill('white');
  text('S', muxX + muxW / 2, muxY + muxH - 15);

  // Output label
  text('Y', muxX + muxW - 10, muxY + muxH / 2);
}

function drawDataInputs(selectVal) {
  let startX = 40;
  let startY = 150;

  for (let i = 0; i < 4; i++) {
    let y = startY + i * 35;
    let isSelected = i === selectVal;

    // Input circle
    fill(dataInputs[i] ? colors.high : colors.low);
    stroke(isSelected ? colors.selected : colors.wire);
    strokeWeight(isSelected ? 3 : 2);
    ellipse(startX, y, 35);

    // Value
    fill('white');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(14);
    text(dataInputs[i] ? '1' : '0', startX, y);

    // Label
    fill(colors.text);
    textSize(11);
    text(`D${i}`, startX, y - 25);

    // Wire to MUX
    stroke(isSelected ? colors.selected : colors.wire);
    strokeWeight(isSelected ? 3 : 1);
    line(startX + 20, y, 160, y);
  }
}

function drawSelectInputs() {
  let startX = 180;
  let y = 340;

  fill(colors.text);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(11);
  text('Select Signals', startX + 20, y - 25);

  for (let i = 0; i < 2; i++) {
    let x = startX + i * 50;

    // Input circle
    fill(selectInputs[i] ? colors.high : colors.low);
    stroke(colors.wire);
    strokeWeight(2);
    ellipse(x, y + 20, 35);

    // Value
    fill('white');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(14);
    text(selectInputs[i] ? '1' : '0', x, y + 20);

    // Label
    fill(colors.text);
    textSize(11);
    text(`S${1 - i}`, x, y + 45);

    // Wire to MUX
    stroke(colors.wire);
    strokeWeight(1);
    line(x, y, x, 300);
  }
}

function drawOutput(output) {
  let x = 300;
  let y = 210;

  // Wire from MUX
  stroke(output ? colors.high : colors.low);
  strokeWeight(3);
  line(240, y, x - 20, y);

  // Output circle
  fill(output ? colors.high : colors.low);
  stroke(colors.wire);
  strokeWeight(2);
  ellipse(x + 15, y, 40);

  // Value
  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(16);
  text(output ? '1' : '0', x + 15, y);

  // Label
  fill(colors.text);
  textSize(12);
  text('Y (Output)', x + 15, y + 35);
}

function drawTruthTable(selectVal) {
  let tableX = canvasWidth - 110;
  let tableY = 100;
  let cellW = 25;
  let cellH = 22;

  fill(colors.text);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  text('Selection', tableX + 37, tableY - 15);

  // Header
  fill('#e3f2fd');
  stroke('#90caf9');
  rect(tableX, tableY, cellW, cellH);
  rect(tableX + cellW, tableY, cellW, cellH);
  rect(tableX + cellW * 2, tableY, cellW, cellH);

  fill(colors.text);
  noStroke();
  textSize(9);
  text('S1', tableX + cellW/2, tableY + cellH/2);
  text('S0', tableX + cellW * 1.5, tableY + cellH/2);
  text('Y', tableX + cellW * 2.5, tableY + cellH/2);

  // Rows
  for (let i = 0; i < 4; i++) {
    let y = tableY + cellH * (i + 1);
    let s1 = (i >> 1) & 1;
    let s0 = i & 1;

    // Highlight current selection
    fill(i === selectVal ? '#fff9c4' : 'white');
    stroke('#bdbdbd');
    rect(tableX, y, cellW, cellH);
    rect(tableX + cellW, y, cellW, cellH);
    rect(tableX + cellW * 2, y, cellW, cellH);

    fill(colors.text);
    noStroke();
    textSize(9);
    text(s1, tableX + cellW/2, y + cellH/2);
    text(s0, tableX + cellW * 1.5, y + cellH/2);
    text(`D${i}`, tableX + cellW * 2.5, y + cellH/2);
  }
}

function mousePressed() {
  // Check data input clicks
  let startX = 40;
  let startY = 150;
  for (let i = 0; i < 4; i++) {
    let y = startY + i * 35;
    if (dist(mouseX, mouseY, startX, y) < 20) {
      dataInputs[i] = !dataInputs[i];
      return;
    }
  }

  // Check select input clicks
  let selectStartX = 180;
  let selectY = 360;
  for (let i = 0; i < 2; i++) {
    let x = selectStartX + i * 50;
    if (dist(mouseX, mouseY, x, selectY) < 20) {
      selectInputs[i] = !selectInputs[i];
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
