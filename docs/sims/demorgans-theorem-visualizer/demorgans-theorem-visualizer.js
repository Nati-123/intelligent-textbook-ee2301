// De Morgan's Theorem Visualizer MicroSim
// Visualize De Morgan's theorem transformations
// Bloom Level: Analyze (L4) - Compare equivalent expressions
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 420;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let theoremSelect;
let inputA = 1;
let inputB = 1;
let currentTheorem = 0;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  theoremSelect = createSelect();
  theoremSelect.option("(A · B)' = A' + B'", 0);
  theoremSelect.option("(A + B)' = A' · B'", 1);
  theoremSelect.changed(() => { currentTheorem = parseInt(theoremSelect.value()); });

  positionUIElements();

  describe("De Morgan's theorem visualizer showing gate equivalence", LABEL);
}

function positionUIElements() {
  let mainRect = document.querySelector('main').getBoundingClientRect();
  theoremSelect.position(mainRect.left + 120, mainRect.top + drawHeight + 15);
}

function draw() {
  updateCanvasSize();

  // Drawing area
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  text("De Morgan's Theorem", canvasWidth / 2, 10);

  // Show theorem
  textSize(16);
  fill('#2196f3');
  if (currentTheorem === 0) {
    text("(A · B)' = A' + B'", canvasWidth / 2, 40);
  } else {
    text("(A + B)' = A' · B'", canvasWidth / 2, 40);
  }

  // Draw both circuit representations
  drawCircuits();

  // Draw input toggles
  drawInputToggles();

  // Control label
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(14);
  text('Theorem:', 30, drawHeight + 27);

  // Instructions
  fill('#666');
  textSize(11);
  textAlign(CENTER, CENTER);
  text('Click A or B to toggle inputs', canvasWidth / 2, drawHeight + 60);
}

function drawCircuits() {
  let leftX = canvasWidth / 4;
  let rightX = 3 * canvasWidth / 4;
  let y = 180;

  // Calculate results
  let leftResult, rightResult;
  if (currentTheorem === 0) {
    leftResult = (inputA && inputB) ? 0 : 1;  // (A · B)'
    rightResult = (1 - inputA) || (1 - inputB) ? 1 : 0;  // A' + B'
  } else {
    leftResult = (inputA || inputB) ? 0 : 1;  // (A + B)'
    rightResult = (1 - inputA) && (1 - inputB) ? 1 : 0;  // A' · B'
  }

  // Left side - NAND or NOR with bubble
  drawNandNorGate(leftX, y, currentTheorem === 0 ? 'NAND' : 'NOR', leftResult);

  // Equals sign
  fill('black');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(30);
  text('=', canvasWidth / 2, y + 20);

  // Right side - OR or AND with inverted inputs
  drawInvertedInputGate(rightX, y, currentTheorem === 0 ? 'OR' : 'AND', rightResult);

  // Results
  let resultY = 330;
  textSize(14);

  fill(leftResult ? '#4CAF50' : '#f44336');
  textAlign(CENTER, TOP);
  text('Output: ' + leftResult, leftX, resultY);

  fill(rightResult ? '#4CAF50' : '#f44336');
  text('Output: ' + rightResult, rightX, resultY);

  // Verification
  fill(leftResult === rightResult ? '#4CAF50' : '#f44336');
  textSize(16);
  text(leftResult === rightResult ? '✓ Equal!' : '✗ Not equal', canvasWidth / 2, resultY + 40);
}

function drawNandNorGate(x, y, type, result) {
  let gateWidth = 60;
  let gateHeight = 50;

  // Input lines
  stroke('#666');
  strokeWeight(2);
  line(x - 60, y - 15, x - 25, y - 15);
  line(x - 60, y + 15, x - 25, y + 15);

  // Input labels
  fill(inputA ? '#4CAF50' : '#f44336');
  noStroke();
  textAlign(RIGHT, CENTER);
  textSize(14);
  text('A=' + inputA, x - 65, y - 15);

  fill(inputB ? '#4CAF50' : '#f44336');
  text('B=' + inputB, x - 65, y + 15);

  // Gate body
  fill('white');
  stroke('#2196f3');
  strokeWeight(2);

  if (type === 'NAND') {
    // AND shape with bubble
    beginShape();
    vertex(x - 25, y - 25);
    vertex(x, y - 25);
    for (let a = -HALF_PI; a <= HALF_PI; a += 0.1) {
      vertex(x + cos(a) * 25, y + sin(a) * 25);
    }
    vertex(x - 25, y + 25);
    endShape(CLOSE);
  } else {
    // OR shape with bubble
    beginShape();
    vertex(x - 25, y - 25);
    bezierVertex(x - 10, y - 25, x + 15, y - 15, x + 25, y);
    bezierVertex(x + 15, y + 15, x - 10, y + 25, x - 25, y + 25);
    bezierVertex(x - 15, y, x - 15, y, x - 25, y - 25);
    endShape(CLOSE);
  }

  // Bubble (NOT)
  fill('white');
  stroke('#e91e63');
  strokeWeight(2);
  ellipse(x + 35, y, 10);

  // Output line
  stroke('#666');
  strokeWeight(2);
  line(x + 40, y, x + 60, y);

  // Gate label
  fill('#333');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(10);
  text(type, x, y);
}

function drawInvertedInputGate(x, y, type, result) {
  let gateWidth = 60;
  let gateHeight = 50;

  // Input lines with bubbles
  stroke('#666');
  strokeWeight(2);
  line(x - 60, y - 15, x - 35, y - 15);
  line(x - 60, y + 15, x - 35, y + 15);

  // Input bubbles (inverters)
  fill('white');
  stroke('#e91e63');
  strokeWeight(2);
  ellipse(x - 30, y - 15, 10);
  ellipse(x - 30, y + 15, 10);

  // Lines from bubbles to gate
  stroke('#666');
  strokeWeight(2);
  line(x - 25, y - 15, x - 15, y - 15);
  line(x - 25, y + 15, x - 15, y + 15);

  // Input labels
  fill(inputA ? '#4CAF50' : '#f44336');
  noStroke();
  textAlign(RIGHT, CENTER);
  textSize(14);
  text('A=' + inputA, x - 65, y - 15);

  fill(inputB ? '#4CAF50' : '#f44336');
  text('B=' + inputB, x - 65, y + 15);

  // Inverted values
  fill('#e91e63');
  textSize(10);
  textAlign(LEFT, CENTER);
  text((1 - inputA), x - 20, y - 30);
  text((1 - inputB), x - 20, y + 30);

  // Gate body
  fill('white');
  stroke('#ff9800');
  strokeWeight(2);

  if (type === 'OR') {
    // OR shape
    beginShape();
    vertex(x - 15, y - 25);
    bezierVertex(x, y - 25, x + 25, y - 15, x + 35, y);
    bezierVertex(x + 25, y + 15, x, y + 25, x - 15, y + 25);
    bezierVertex(x - 5, y, x - 5, y, x - 15, y - 25);
    endShape(CLOSE);
  } else {
    // AND shape
    beginShape();
    vertex(x - 15, y - 25);
    vertex(x + 10, y - 25);
    for (let a = -HALF_PI; a <= HALF_PI; a += 0.1) {
      vertex(x + 10 + cos(a) * 25, y + sin(a) * 25);
    }
    vertex(x - 15, y + 25);
    endShape(CLOSE);
  }

  // Output line
  stroke('#666');
  strokeWeight(2);
  line(x + 35, y, x + 60, y);

  // Gate label
  fill('#333');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(10);
  text(type, x + 10, y);
}

function drawInputToggles() {
  let y = 365;
  let toggleW = 50;
  let toggleH = 30;

  // Input A
  let aX = canvasWidth / 2 - 70;
  fill(inputA ? '#4CAF50' : '#f44336');
  stroke('#333');
  strokeWeight(2);
  rect(aX, y, toggleW, toggleH, 5);

  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);
  text('A=' + inputA, aX + toggleW / 2, y + toggleH / 2);

  // Input B
  let bX = canvasWidth / 2 + 20;
  fill(inputB ? '#4CAF50' : '#f44336');
  stroke('#333');
  strokeWeight(2);
  rect(bX, y, toggleW, toggleH, 5);

  fill('white');
  noStroke();
  text('B=' + inputB, bX + toggleW / 2, y + toggleH / 2);
}

function mousePressed() {
  let y = 365;
  let toggleW = 50;
  let toggleH = 30;

  let aX = canvasWidth / 2 - 70;
  if (mouseX >= aX && mouseX <= aX + toggleW && mouseY >= y && mouseY <= y + toggleH) {
    inputA = 1 - inputA;
  }

  let bX = canvasWidth / 2 + 20;
  if (mouseX >= bX && mouseX <= bX + toggleW && mouseY >= y && mouseY <= y + toggleH) {
    inputB = 1 - inputB;
  }
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
