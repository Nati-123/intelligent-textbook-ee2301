// AND Gate with Truth Table MicroSim
// Interactive AND gate demonstration with truth table and Boolean expression
// Bloom Level: Understand (L2) - Explain, demonstrate
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 400;
let canvasHeight = drawHeight;
let containerHeight = canvasHeight;

// State
let inputA = 0;
let inputB = 0;

// Color scheme
const GATE_BLUE = '#2196F3';
const HIGH_GREEN = '#4CAF50';
const LOW_GRAY = '#9E9E9E';
const WIRE_COLOR = '#333';
const HIGHLIGHT_BG = '#FFF3E0';

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  describe('Interactive AND gate with clickable inputs and truth table', LABEL);
}

function draw() {
  updateCanvasSize();
  background(255);

  let output = inputA & inputB;
  let margin = 15;
  let w = canvasWidth - 2 * margin;

  // Title
  fill(GATE_BLUE);
  noStroke();
  rect(margin, margin, w, 36, 5);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(17);
  textStyle(BOLD);
  text('AND Gate', canvasWidth / 2, margin + 18);

  // Boolean expression
  fill(60);
  textSize(14);
  textStyle(NORMAL);
  textAlign(CENTER, TOP);
  text('Y = A \u00b7 B  (output is 1 only when both inputs are 1)', canvasWidth / 2, margin + 46);

  // --- Left side: Gate symbol with wires ---
  let gateX = canvasWidth * 0.3;
  let gateY = 170;
  let gateW = 80;
  let gateH = 60;

  // Input wires
  stroke(WIRE_COLOR);
  strokeWeight(2);
  let inAY = gateY - 18;
  let inBY = gateY + 18;
  line(gateX - gateW / 2 - 50, inAY, gateX - gateW / 2, inAY);
  line(gateX - gateW / 2 - 50, inBY, gateX - gateW / 2, inBY);

  // Output wire
  let outX = gateX + gateW / 2;
  line(outX, gateY, outX + 50, gateY);

  // AND gate body (flat left, curved right)
  fill('white');
  stroke(WIRE_COLOR);
  strokeWeight(2);
  beginShape();
  vertex(gateX - gateW / 2, gateY - gateH / 2);
  vertex(gateX, gateY - gateH / 2);
  bezierVertex(
    gateX + gateW / 2, gateY - gateH / 2,
    gateX + gateW / 2, gateY + gateH / 2,
    gateX, gateY + gateH / 2
  );
  vertex(gateX - gateW / 2, gateY + gateH / 2);
  endShape(CLOSE);

  // Input labels and values
  noStroke();
  textSize(15);
  textStyle(BOLD);
  textAlign(RIGHT, CENTER);
  fill(inputA ? HIGH_GREEN : LOW_GRAY);
  text(inputA, gateX - gateW / 2 - 55, inAY);
  fill(inputB ? HIGH_GREEN : LOW_GRAY);
  text(inputB, gateX - gateW / 2 - 55, inBY);

  // Input variable labels
  fill('#333');
  textSize(11);
  textStyle(NORMAL);
  textAlign(RIGHT, CENTER);
  text('A', gateX - gateW / 2 - 55, inAY - 16);
  text('B', gateX - gateW / 2 - 55, inBY - 16);

  // Output value
  fill(output ? HIGH_GREEN : LOW_GRAY);
  textSize(15);
  textStyle(BOLD);
  textAlign(LEFT, CENTER);
  text(output, outX + 55, gateY);
  fill('#333');
  textSize(11);
  textStyle(NORMAL);
  text('Y', outX + 55, gateY - 16);

  // Clickable toggle buttons for inputs
  drawToggleButton(gateX - gateW / 2 - 90, inAY - 14, 28, 28, inputA, 'A');
  drawToggleButton(gateX - gateW / 2 - 90, inBY - 14, 28, 28, inputB, 'B');

  // --- Right side: Truth table ---
  let tableX = canvasWidth * 0.58;
  let tableY = 105;
  let colW = 44;
  let rowH = 32;
  let tableW = colW * 3;

  // Table title
  fill(60);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(13);
  textStyle(BOLD);
  text('Truth Table', tableX + tableW / 2, tableY - 14);

  // Header row
  fill(GATE_BLUE);
  noStroke();
  rect(tableX, tableY, tableW, rowH, 4, 4, 0, 0);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(14);
  textStyle(BOLD);
  text('A', tableX + colW * 0.5, tableY + rowH / 2);
  text('B', tableX + colW * 1.5, tableY + rowH / 2);
  text('Y', tableX + colW * 2.5, tableY + rowH / 2);

  // Data rows
  let truthRows = [[0,0,0], [0,1,0], [1,0,0], [1,1,1]];
  for (let r = 0; r < 4; r++) {
    let y = tableY + rowH * (r + 1);
    let row = truthRows[r];
    let isCurrent = (row[0] === inputA && row[1] === inputB);

    // Row background
    if (isCurrent) {
      fill(HIGHLIGHT_BG);
    } else {
      fill(r % 2 === 0 ? '#F5F5F5' : 255);
    }
    stroke('#DDD');
    strokeWeight(1);
    let corners = (r === 3) ? [0, 0, 4, 4] : [0, 0, 0, 0];
    rect(tableX, y, tableW, rowH, ...corners);

    // Cell dividers
    stroke('#DDD');
    line(tableX + colW, y, tableX + colW, y + rowH);
    line(tableX + colW * 2, y, tableX + colW * 2, y + rowH);

    noStroke();
    textSize(14);
    textStyle(isCurrent ? BOLD : NORMAL);

    // A column
    fill(isCurrent ? '#E65100' : 60);
    textAlign(CENTER, CENTER);
    text(row[0], tableX + colW * 0.5, y + rowH / 2);

    // B column
    text(row[1], tableX + colW * 1.5, y + rowH / 2);

    // Y column
    fill(isCurrent ? (row[2] ? HIGH_GREEN : '#E65100') : (row[2] ? HIGH_GREEN : LOW_GRAY));
    textStyle(BOLD);
    text(row[2], tableX + colW * 2.5, y + rowH / 2);
  }

  // Current state display
  let stateY = tableY + rowH * 5 + 15;
  fill(output ? '#E8F5E9' : '#FFEBEE');
  stroke(output ? HIGH_GREEN : '#EF5350');
  strokeWeight(2);
  rect(tableX, stateY, tableW, 36, 5);
  noStroke();
  fill(output ? '#1B5E20' : '#B71C1C');
  textAlign(CENTER, CENTER);
  textSize(14);
  textStyle(BOLD);
  text(inputA + ' \u00b7 ' + inputB + ' = ' + output, tableX + tableW / 2, stateY + 18);

  // Click instruction
  fill(100);
  textSize(12);
  textStyle(NORMAL);
  textAlign(CENTER, TOP);
  text('Click boxes to toggle inputs', canvasWidth * 0.3, gateY + gateH / 2 + 30);

  // Key insight box at bottom
  let boxY = drawHeight - 60;
  fill('#E3F2FD');
  stroke(GATE_BLUE);
  strokeWeight(1);
  rect(margin, boxY, w, 42, 5);
  noStroke();
  fill('#0D47A1');
  textAlign(CENTER, CENTER);
  textSize(13);
  textStyle(NORMAL);
  text('The AND gate outputs 1 only when A = 1 AND B = 1.', canvasWidth / 2, boxY + 13);
  text('In all other cases, the output is 0.', canvasWidth / 2, boxY + 29);
}

function drawToggleButton(x, y, w, h, val, label) {
  fill(val ? HIGH_GREEN : '#E0E0E0');
  stroke(val ? '#388E3C' : '#BDBDBD');
  strokeWeight(1.5);
  rect(x, y, w, h, 4);
  noStroke();
  fill(val ? 255 : '#666');
  textAlign(CENTER, CENTER);
  textSize(13);
  textStyle(BOLD);
  text(val, x + w / 2, y + h / 2);
}

function mousePressed() {
  let gateX = canvasWidth * 0.3;
  let gateW = 80;
  let inAY = 170 - 18;
  let inBY = 170 + 18;
  let btnX = gateX - gateW / 2 - 90;
  let btnW = 28;
  let btnH = 28;

  // Toggle A
  if (mouseX >= btnX && mouseX <= btnX + btnW &&
      mouseY >= inAY - 14 && mouseY <= inAY - 14 + btnH) {
    inputA = 1 - inputA;
  }
  // Toggle B
  if (mouseX >= btnX && mouseX <= btnX + btnW &&
      mouseY >= inBY - 14 && mouseY <= inBY - 14 + btnH) {
    inputB = 1 - inputB;
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
