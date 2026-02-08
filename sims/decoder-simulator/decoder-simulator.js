// Decoder Simulator MicroSim
// Interactive 2-to-4 decoder demonstration
// Bloom Level: Understand/Apply (L2-L3)

let containerWidth;
let canvasWidth = 400;
let drawHeight = 420;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;

let inputs = [false, false]; // A1, A0

const colors = {
  high: '#4CAF50',
  low: '#F44336',
  decoder: '#9C27B0',
  wire: '#666',
  bg: '#f5f5f5',
  text: '#212121'
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  describe('Interactive 2-to-4 decoder simulator', LABEL);
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
  text('2-to-4 Decoder Simulator', canvasWidth / 2, 10);

  // Calculate active output
  let activeOutput = (inputs[0] ? 2 : 0) + (inputs[1] ? 1 : 0);

  // Subtitle
  textSize(12);
  fill('#666');
  text(`Input = ${inputs[0] ? 1 : 0}${inputs[1] ? 1 : 0} (${activeOutput}) → Y${activeOutput} = 1`, canvasWidth / 2, 35);

  // Draw decoder
  drawDecoder(activeOutput);

  // Draw inputs
  drawInputs();

  // Draw outputs
  drawOutputs(activeOutput);

  // Draw truth table
  drawTruthTable(activeOutput);

  // Instructions
  fill(colors.text);
  textAlign(CENTER, CENTER);
  textSize(11);
  text('Click inputs to toggle values', canvasWidth / 2, drawHeight + 30);
}

function drawDecoder(activeOutput) {
  let decX = 140;
  let decY = 100;
  let decW = 80;
  let decH = 180;

  // Decoder body
  fill(colors.decoder);
  stroke('#7B1FA2');
  strokeWeight(2);
  rect(decX, decY, decW, decH, 5);

  // Label
  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);
  text('2-to-4', decX + decW / 2, decY + decH / 2 - 15);
  text('DEC', decX + decW / 2, decY + decH / 2 + 5);

  // Input labels
  textSize(10);
  text('A1', decX + 20, decY + decH - 20);
  text('A0', decX + decW - 20, decY + decH - 20);

  // Output labels
  for (let i = 0; i < 4; i++) {
    let y = decY + 30 + i * 35;
    text(`Y${i}`, decX + decW - 15, y);
  }
}

function drawInputs() {
  let y = 330;
  let startX = 150;

  fill(colors.text);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(11);
  text('Binary Input', startX + 25, y - 35);

  for (let i = 0; i < 2; i++) {
    let x = startX + i * 50;

    // Input circle
    fill(inputs[i] ? colors.high : colors.low);
    stroke(colors.wire);
    strokeWeight(2);
    ellipse(x, y, 40);

    // Value
    fill('white');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(16);
    text(inputs[i] ? '1' : '0', x, y);

    // Label
    fill(colors.text);
    textSize(12);
    text(`A${1 - i}`, x, y + 30);

    // Wire to decoder
    stroke(colors.wire);
    strokeWeight(1);
    line(x, y - 20, x, 280);
  }
}

function drawOutputs(activeOutput) {
  let decX = 220;
  let startY = 130;

  for (let i = 0; i < 4; i++) {
    let y = startY + i * 35;
    let isActive = i === activeOutput;

    // Wire from decoder
    stroke(isActive ? colors.high : colors.wire);
    strokeWeight(isActive ? 3 : 1);
    line(decX, y, decX + 50, y);

    // Output circle
    fill(isActive ? colors.high : colors.low);
    stroke(colors.wire);
    strokeWeight(2);
    ellipse(decX + 70, y, 35);

    // Value
    fill('white');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(14);
    text(isActive ? '1' : '0', decX + 70, y);

    // Label
    fill(colors.text);
    textSize(11);
    text(`Y${i}`, decX + 70, y + 25);

    // Minterm notation
    fill('#666');
    textSize(9);
    let minterm = `m${i}`;
    text(minterm, decX + 100, y);
  }
}

function drawTruthTable(activeOutput) {
  let tableX = canvasWidth - 150;
  let tableY = 90;
  let cellW = 28;
  let cellH = 24;

  fill(colors.text);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  text('Truth Table', tableX + 55, tableY - 15);

  // Header
  let headers = ['A1', 'A0', 'Y3', 'Y2', 'Y1', 'Y0'];
  fill('#e1bee7');
  stroke('#ce93d8');
  for (let i = 0; i < 6; i++) {
    if (i < 2) {
      rect(tableX + i * cellW, tableY, cellW, cellH);
    }
  }

  fill('#c8e6c9');
  stroke('#a5d6a7');
  for (let i = 2; i < 6; i++) {
    rect(tableX + i * cellW, tableY, cellW, cellH);
  }

  fill(colors.text);
  noStroke();
  textSize(9);
  text('A1', tableX + cellW * 0.5, tableY + cellH/2);
  text('A0', tableX + cellW * 1.5, tableY + cellH/2);
  for (let i = 0; i < 4; i++) {
    text(`Y${3-i}`, tableX + cellW * (2.5 + i), tableY + cellH/2);
  }

  // Data rows
  for (let row = 0; row < 4; row++) {
    let y = tableY + cellH * (row + 1);
    let a1 = (row >> 1) & 1;
    let a0 = row & 1;

    // Highlight current row
    fill(row === activeOutput ? '#fff9c4' : 'white');
    stroke('#bdbdbd');
    for (let col = 0; col < 6; col++) {
      rect(tableX + col * cellW, y, cellW, cellH);
    }

    fill(colors.text);
    noStroke();
    textSize(9);
    text(a1, tableX + cellW * 0.5, y + cellH/2);
    text(a0, tableX + cellW * 1.5, y + cellH/2);

    // Output columns (Y3, Y2, Y1, Y0)
    for (let out = 0; out < 4; out++) {
      let outIdx = 3 - out;
      let val = row === outIdx ? 1 : 0;
      fill(val ? colors.high : colors.text);
      text(val, tableX + cellW * (2.5 + out), y + cellH/2);
    }
  }
}

function mousePressed() {
  let y = 330;
  let startX = 150;

  for (let i = 0; i < 2; i++) {
    let x = startX + i * 50;
    if (dist(mouseX, mouseY, x, y) < 22) {
      inputs[i] = !inputs[i];
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
