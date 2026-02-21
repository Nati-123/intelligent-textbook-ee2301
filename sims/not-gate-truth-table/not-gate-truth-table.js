// NOT Gate with Truth Table MicroSim
// Interactive NOT gate (inverter) demonstration with truth table and Boolean expression
// Bloom Level: Understand (L2) - Explain, demonstrate
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 370;
let canvasHeight = drawHeight;
let containerHeight = canvasHeight;

// State
let inputA = 0;

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
  describe('Interactive NOT gate (inverter) with clickable input and truth table', LABEL);
}

function draw() {
  updateCanvasSize();
  background(255);

  let output = 1 - inputA;
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
  text('NOT Gate (Inverter)', canvasWidth / 2, margin + 18);

  // Boolean expression
  fill(60);
  textSize(14);
  textStyle(NORMAL);
  textAlign(CENTER, TOP);
  text("Y = A'  (output is the inverse of the input)", canvasWidth / 2, margin + 46);

  // --- Left side: Gate symbol with wires ---
  let gateX = canvasWidth * 0.3;
  let gateY = 160;
  let gateW = 70;
  let gateH = 55;

  // Input wire
  stroke(WIRE_COLOR);
  strokeWeight(2);
  line(gateX - gateW / 2 - 50, gateY, gateX - gateW / 2, gateY);

  // Output wire (after bubble)
  let bubbleR = 7;
  let outX = gateX + gateW / 2 + bubbleR * 2;
  line(outX, gateY, outX + 50, gateY);

  // NOT gate body (triangle)
  fill('white');
  stroke(WIRE_COLOR);
  strokeWeight(2);
  triangle(
    gateX - gateW / 2, gateY - gateH / 2,
    gateX + gateW / 2, gateY,
    gateX - gateW / 2, gateY + gateH / 2
  );

  // Inversion bubble
  fill('white');
  stroke(WIRE_COLOR);
  strokeWeight(2);
  circle(gateX + gateW / 2 + bubbleR, gateY, bubbleR * 2);

  // Input label and value
  noStroke();
  textSize(15);
  textStyle(BOLD);
  textAlign(RIGHT, CENTER);
  fill(inputA ? HIGH_GREEN : LOW_GRAY);
  text(inputA, gateX - gateW / 2 - 55, gateY);

  // Input variable label
  fill('#333');
  textSize(11);
  textStyle(NORMAL);
  textAlign(RIGHT, CENTER);
  text('A', gateX - gateW / 2 - 55, gateY - 16);

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

  // Clickable toggle button for input
  drawToggleButton(gateX - gateW / 2 - 90, gateY - 14, 28, 28, inputA, 'A');

  // --- Right side: Truth table ---
  let tableX = canvasWidth * 0.58;
  let tableY = 105;
  let colW = 52;
  let rowH = 34;
  let tableW = colW * 2;

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
  text('Y', tableX + colW * 1.5, tableY + rowH / 2);

  // Data rows (only 2 rows for NOT gate)
  let truthRows = [[0, 1], [1, 0]];
  for (let r = 0; r < 2; r++) {
    let y = tableY + rowH * (r + 1);
    let row = truthRows[r];
    let isCurrent = (row[0] === inputA);

    // Row background
    if (isCurrent) {
      fill(HIGHLIGHT_BG);
    } else {
      fill(r % 2 === 0 ? '#F5F5F5' : 255);
    }
    stroke('#DDD');
    strokeWeight(1);
    let corners = (r === 1) ? [0, 0, 4, 4] : [0, 0, 0, 0];
    rect(tableX, y, tableW, rowH, ...corners);

    // Cell divider
    stroke('#DDD');
    line(tableX + colW, y, tableX + colW, y + rowH);

    noStroke();
    textSize(15);
    textStyle(isCurrent ? BOLD : NORMAL);

    // A column
    fill(isCurrent ? '#E65100' : 60);
    textAlign(CENTER, CENTER);
    text(row[0], tableX + colW * 0.5, y + rowH / 2);

    // Y column
    fill(isCurrent ? (row[1] ? HIGH_GREEN : '#E65100') : (row[1] ? HIGH_GREEN : LOW_GRAY));
    textStyle(BOLD);
    text(row[1], tableX + colW * 1.5, y + rowH / 2);
  }

  // Current state display
  let stateY = tableY + rowH * 3 + 15;
  fill(output ? '#E8F5E9' : '#FFEBEE');
  stroke(output ? HIGH_GREEN : '#EF5350');
  strokeWeight(2);
  rect(tableX, stateY, tableW, 36, 5);
  noStroke();
  fill(output ? '#1B5E20' : '#B71C1C');
  textAlign(CENTER, CENTER);
  textSize(14);
  textStyle(BOLD);
  text(inputA + "' = " + output, tableX + tableW / 2, stateY + 18);

  // Click instruction
  fill(100);
  textSize(12);
  textStyle(NORMAL);
  textAlign(CENTER, TOP);
  text('Click box to toggle input', canvasWidth * 0.3, gateY + gateH / 2 + 25);

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
  text('The NOT gate inverts its input: 0 becomes 1, and 1 becomes 0.', canvasWidth / 2, boxY + 13);
  text('The small circle (bubble) at the output indicates inversion.', canvasWidth / 2, boxY + 29);
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
  let gateW = 70;
  let btnX = gateX - gateW / 2 - 90;
  let btnW = 28;
  let btnH = 28;
  let inAY = 160;

  // Toggle A
  if (mouseX >= btnX && mouseX <= btnX + btnW &&
      mouseY >= inAY - 14 && mouseY <= inAY - 14 + btnH) {
    inputA = 1 - inputA;
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
