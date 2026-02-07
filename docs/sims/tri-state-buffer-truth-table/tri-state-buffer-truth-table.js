// Tri-State Buffer with Truth Table MicroSim
// Interactive tri-state buffer demonstration with truth table and Boolean expression
// Bloom Level: Understand (L2) - Explain, demonstrate
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 400;
let canvasHeight = drawHeight;
let containerHeight = canvasHeight;

// State
let inputA = 0;
let inputEN = 0;

// Color scheme
const GATE_BLUE = '#2196F3';
const HIGH_GREEN = '#4CAF50';
const LOW_GRAY = '#9E9E9E';
const HIZ_AMBER = '#FF9800';
const WIRE_COLOR = '#333';
const HIGHLIGHT_BG = '#FFF3E0';

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  describe('Interactive tri-state buffer with clickable inputs and truth table showing high-impedance state', LABEL);
}

function draw() {
  updateCanvasSize();
  background(255);

  let outputStr = inputEN ? String(inputA) : 'Z';
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
  text('Tri-State Buffer', canvasWidth / 2, margin + 18);

  // Boolean expression
  fill(60);
  textSize(14);
  textStyle(NORMAL);
  textAlign(CENTER, TOP);
  text('Y = A when EN = 1;  Y = Z (high-impedance) when EN = 0', canvasWidth / 2, margin + 46);

  // --- Left side: Gate symbol with wires ---
  let gateX = canvasWidth * 0.3;
  let gateY = 170;
  let gateW = 70;
  let gateH = 55;

  // Input wire (A)
  stroke(WIRE_COLOR);
  strokeWeight(2);
  line(gateX - gateW / 2 - 50, gateY, gateX - gateW / 2, gateY);

  // Enable wire (EN) - comes from top into the triangle
  let enX = gateX;
  let enTopY = gateY - gateH / 2 - 40;
  stroke(WIRE_COLOR);
  strokeWeight(2);
  line(enX, enTopY, enX, gateY - gateH / 2);

  // Output wire
  let outX = gateX + gateW / 2;
  line(outX, gateY, outX + 50, gateY);

  // Buffer gate body (triangle)
  fill('white');
  stroke(WIRE_COLOR);
  strokeWeight(2);
  triangle(
    gateX - gateW / 2, gateY - gateH / 2,
    gateX + gateW / 2, gateY,
    gateX - gateW / 2, gateY + gateH / 2
  );

  // Input A label and value
  noStroke();
  textSize(15);
  textStyle(BOLD);
  textAlign(RIGHT, CENTER);
  fill(inputA ? HIGH_GREEN : LOW_GRAY);
  text(inputA, gateX - gateW / 2 - 55, gateY);
  fill('#333');
  textSize(11);
  textStyle(NORMAL);
  text('A', gateX - gateW / 2 - 55, gateY - 16);

  // Enable label and value
  textAlign(CENTER, CENTER);
  textSize(15);
  textStyle(BOLD);
  fill(inputEN ? HIGH_GREEN : LOW_GRAY);
  text(inputEN, enX, enTopY - 12);
  fill('#333');
  textSize(11);
  textStyle(NORMAL);
  text('EN', enX + 18, enTopY - 12);

  // Output value
  textAlign(LEFT, CENTER);
  textSize(15);
  textStyle(BOLD);
  if (inputEN) {
    fill(inputA ? HIGH_GREEN : LOW_GRAY);
  } else {
    fill(HIZ_AMBER);
  }
  text(outputStr, outX + 55, gateY);
  fill('#333');
  textSize(11);
  textStyle(NORMAL);
  text('Y', outX + 55, gateY - 16);

  // Clickable toggle buttons
  drawToggleButton(gateX - gateW / 2 - 90, gateY - 14, 28, 28, inputA, 'A');
  drawToggleButton(enX - 14, enTopY - 32, 28, 28, inputEN, 'EN');

  // --- Right side: Truth table ---
  let tableX = canvasWidth * 0.56;
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
  text('EN', tableX + colW * 0.5, tableY + rowH / 2);
  text('A', tableX + colW * 1.5, tableY + rowH / 2);
  text('Y', tableX + colW * 2.5, tableY + rowH / 2);

  // Data rows: EN=0 A=0 -> Z, EN=0 A=1 -> Z, EN=1 A=0 -> 0, EN=1 A=1 -> 1
  let truthRows = [
    {en: 0, a: 0, y: 'Z'},
    {en: 0, a: 1, y: 'Z'},
    {en: 1, a: 0, y: '0'},
    {en: 1, a: 1, y: '1'}
  ];
  for (let r = 0; r < 4; r++) {
    let y = tableY + rowH * (r + 1);
    let row = truthRows[r];
    let isCurrent = (row.en === inputEN && row.a === inputA);

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

    // EN column
    fill(isCurrent ? '#E65100' : 60);
    textAlign(CENTER, CENTER);
    text(row.en, tableX + colW * 0.5, y + rowH / 2);

    // A column
    text(row.a, tableX + colW * 1.5, y + rowH / 2);

    // Y column
    textStyle(BOLD);
    if (row.y === 'Z') {
      fill(isCurrent ? HIZ_AMBER : '#FB8C00');
    } else {
      let yVal = parseInt(row.y);
      fill(isCurrent ? (yVal ? HIGH_GREEN : '#E65100') : (yVal ? HIGH_GREEN : LOW_GRAY));
    }
    text(row.y, tableX + colW * 2.5, y + rowH / 2);
  }

  // Current state display
  let stateY = tableY + rowH * 5 + 15;
  if (inputEN) {
    fill(inputA ? '#E8F5E9' : '#FFEBEE');
    stroke(inputA ? HIGH_GREEN : '#EF5350');
  } else {
    fill('#FFF3E0');
    stroke(HIZ_AMBER);
  }
  strokeWeight(2);
  rect(tableX, stateY, tableW, 36, 5);
  noStroke();
  if (inputEN) {
    fill(inputA ? '#1B5E20' : '#B71C1C');
  } else {
    fill('#E65100');
  }
  textAlign(CENTER, CENTER);
  textSize(14);
  textStyle(BOLD);
  text('Y = ' + outputStr, tableX + tableW / 2, stateY + 18);

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
  text('When disabled (EN=0), output is high-impedance (Z): electrically disconnected.', canvasWidth / 2, boxY + 13);
  text('Tri-state buffers allow multiple devices to share a common bus.', canvasWidth / 2, boxY + 29);
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
  let btnW = 28;
  let btnH = 28;

  // Toggle A
  let btnAX = gateX - gateW / 2 - 90;
  let btnAY = 170 - 14;
  if (mouseX >= btnAX && mouseX <= btnAX + btnW &&
      mouseY >= btnAY && mouseY <= btnAY + btnH) {
    inputA = 1 - inputA;
  }

  // Toggle EN
  let enX = gateX;
  let enTopY = 170 - 55 / 2 - 40;
  let btnENX = enX - 14;
  let btnENY = enTopY - 32;
  if (mouseX >= btnENX && mouseX <= btnENX + btnW &&
      mouseY >= btnENY && mouseY <= btnENY + btnH) {
    inputEN = 1 - inputEN;
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
