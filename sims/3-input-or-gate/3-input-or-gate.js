// 3-Input OR Gate MicroSim
// Interactive 3-input OR gate with truth table
// Bloom Level: Understand (L2) - Explain, demonstrate
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 480;
let canvasHeight = drawHeight;
let containerHeight = canvasHeight;

let inputs = [0, 0, 0];

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
  describe('Interactive 3-input OR gate with clickable inputs and truth table', LABEL);
}

function draw() {
  updateCanvasSize();
  background(255);

  let output = inputs[0] | inputs[1] | inputs[2];
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
  text('3-Input OR Gate', canvasWidth / 2, margin + 18);

  // Boolean expression
  fill(60);
  textSize(14);
  textStyle(NORMAL);
  textAlign(CENTER, TOP);
  text('Y = A + B + C  (output is 1 when any input is 1)', canvasWidth / 2, margin + 46);

  // --- Left side: Gate symbol ---
  let gateX = canvasWidth * 0.28;
  let gateY = 165;
  let gateW = 80;
  let gateH = 70;

  let inYs = [gateY - 22, gateY, gateY + 22];
  let labels = ['A', 'B', 'C'];

  // Input wires
  stroke(WIRE_COLOR);
  strokeWeight(2);
  for (let i = 0; i < 3; i++) {
    line(gateX - gateW / 2 - 50, inYs[i], gateX - gateW / 2 + 8, inYs[i]);
  }

  // Output wire
  let outX = gateX + gateW / 2;
  line(outX, gateY, outX + 50, gateY);

  // OR gate body
  fill('white');
  stroke(WIRE_COLOR);
  strokeWeight(2);
  beginShape();
  vertex(gateX - gateW / 2, gateY - gateH / 2);
  bezierVertex(
    gateX, gateY - gateH / 2,
    gateX + gateW / 3, gateY - gateH / 4,
    gateX + gateW / 2, gateY
  );
  bezierVertex(
    gateX + gateW / 3, gateY + gateH / 4,
    gateX, gateY + gateH / 2,
    gateX - gateW / 2, gateY + gateH / 2
  );
  bezierVertex(
    gateX - gateW / 4, gateY,
    gateX - gateW / 4, gateY,
    gateX - gateW / 2, gateY - gateH / 2
  );
  endShape(CLOSE);

  // Input values and labels
  noStroke();
  for (let i = 0; i < 3; i++) {
    textSize(15);
    textStyle(BOLD);
    textAlign(RIGHT, CENTER);
    fill(inputs[i] ? HIGH_GREEN : LOW_GRAY);
    text(inputs[i], gateX - gateW / 2 - 55, inYs[i]);
    fill('#333');
    textSize(11);
    textStyle(NORMAL);
    text(labels[i], gateX - gateW / 2 - 55, inYs[i] - 14);
  }

  // Output value
  fill(output ? HIGH_GREEN : LOW_GRAY);
  textSize(15);
  textStyle(BOLD);
  textAlign(LEFT, CENTER);
  text(output, outX + 55, gateY);
  fill('#333');
  textSize(11);
  textStyle(NORMAL);
  text('Y', outX + 55, gateY - 14);

  // Toggle buttons
  for (let i = 0; i < 3; i++) {
    drawToggleButton(gateX - gateW / 2 - 90, inYs[i] - 12, 26, 24, inputs[i]);
  }

  fill(100);
  textSize(12);
  textStyle(NORMAL);
  textAlign(CENTER, TOP);
  text('Click boxes to toggle inputs', gateX, gateY + gateH / 2 + 25);

  // --- Right side: Truth table ---
  drawTruthTable(output);

  // Key insight box
  let boxY = drawHeight - 55;
  fill('#E3F2FD');
  stroke(GATE_BLUE);
  strokeWeight(1);
  rect(margin, boxY, w, 40, 5);
  noStroke();
  fill('#0D47A1');
  textAlign(CENTER, CENTER);
  textSize(13);
  textStyle(NORMAL);
  text('A 3-input OR outputs 1 when any of A, B, or C is 1.', canvasWidth / 2, boxY + 12);
  text('For n inputs: output is 0 only when ALL n inputs are 0.', canvasWidth / 2, boxY + 28);
}

function drawTruthTable(output) {
  let tableX = canvasWidth * 0.56;
  let tableY = 80;
  let colW = 34;
  let rowH = 24;
  let cols = 4;
  let tableW = colW * cols;

  fill(60);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(13);
  textStyle(BOLD);
  text('Truth Table', tableX + tableW / 2, tableY - 12);

  fill(GATE_BLUE);
  noStroke();
  rect(tableX, tableY, tableW, rowH, 4, 4, 0, 0);
  fill(255);
  textSize(12);
  textStyle(BOLD);
  let headers = ['A', 'B', 'C', 'Y'];
  for (let c = 0; c < cols; c++) {
    text(headers[c], tableX + colW * c + colW / 2, tableY + rowH / 2);
  }

  for (let r = 0; r < 8; r++) {
    let y = tableY + rowH * (r + 1);
    let a = (r >> 2) & 1;
    let b = (r >> 1) & 1;
    let c = r & 1;
    let yVal = a | b | c;
    let isCurrent = (a === inputs[0] && b === inputs[1] && c === inputs[2]);

    fill(isCurrent ? HIGHLIGHT_BG : (r % 2 === 0 ? '#F5F5F5' : 255));
    stroke('#DDD');
    strokeWeight(1);
    let corners = (r === 7) ? [0, 0, 4, 4] : [0, 0, 0, 0];
    rect(tableX, y, tableW, rowH, ...corners);

    for (let ci = 0; ci < cols - 1; ci++) {
      stroke('#DDD');
      line(tableX + colW * (ci + 1), y, tableX + colW * (ci + 1), y + rowH);
    }

    noStroke();
    textSize(12);
    textStyle(isCurrent ? BOLD : NORMAL);
    fill(isCurrent ? '#E65100' : 60);
    text(a, tableX + colW * 0.5, y + rowH / 2);
    text(b, tableX + colW * 1.5, y + rowH / 2);
    text(c, tableX + colW * 2.5, y + rowH / 2);

    fill(isCurrent ? (yVal ? HIGH_GREEN : '#E65100') : (yVal ? HIGH_GREEN : LOW_GRAY));
    textStyle(BOLD);
    text(yVal, tableX + colW * 3.5, y + rowH / 2);
  }

  let stateY = tableY + rowH * 9 + 10;
  fill(output ? '#E8F5E9' : '#FFEBEE');
  stroke(output ? HIGH_GREEN : '#EF5350');
  strokeWeight(2);
  rect(tableX, stateY, tableW, 32, 5);
  noStroke();
  fill(output ? '#1B5E20' : '#B71C1C');
  textAlign(CENTER, CENTER);
  textSize(13);
  textStyle(BOLD);
  text(inputs[0] + '+' + inputs[1] + '+' + inputs[2] + ' = ' + output, tableX + tableW / 2, stateY + 16);
}

function drawToggleButton(x, y, w, h, val) {
  fill(val ? HIGH_GREEN : '#E0E0E0');
  stroke(val ? '#388E3C' : '#BDBDBD');
  strokeWeight(1.5);
  rect(x, y, w, h, 4);
  noStroke();
  fill(val ? 255 : '#666');
  textAlign(CENTER, CENTER);
  textSize(12);
  textStyle(BOLD);
  text(val, x + w / 2, y + h / 2);
}

function mousePressed() {
  let gateX = canvasWidth * 0.28;
  let gateW = 80;
  let gateY = 165;
  let inYs = [gateY - 22, gateY, gateY + 22];
  let btnX = gateX - gateW / 2 - 90;

  for (let i = 0; i < 3; i++) {
    if (mouseX >= btnX && mouseX <= btnX + 26 &&
        mouseY >= inYs[i] - 12 && mouseY <= inYs[i] + 12) {
      inputs[i] = 1 - inputs[i];
    }
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
