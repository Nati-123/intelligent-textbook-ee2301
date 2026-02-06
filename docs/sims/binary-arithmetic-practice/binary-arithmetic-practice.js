// Binary Arithmetic Practice MicroSim
// Practice binary addition, subtraction, multiplication
// Bloom Level: Apply (L3) - Execute, calculate, practice
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 420;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let operandA = [1, 0, 1, 1];
let operandB = [0, 1, 0, 1];
let operation = 'add';
let opSelect;
let newProblemBtn;
let showAnswerBtn;
let showAnswer = false;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  opSelect = createSelect();
  opSelect.option('Addition', 'add');
  opSelect.option('Subtraction', 'sub');
  opSelect.selected('Addition');
  opSelect.changed(() => { showAnswer = false; });

  newProblemBtn = createButton('New Problem');
  newProblemBtn.mousePressed(generateNewProblem);

  showAnswerBtn = createButton('Show Answer');
  showAnswerBtn.mousePressed(() => { showAnswer = true; });

  positionUIElements();

  describe('Binary arithmetic practice for addition and subtraction', LABEL);
}

function positionUIElements() {
  let mainRect = document.querySelector('main').getBoundingClientRect();
  opSelect.position(mainRect.left + 100, mainRect.top + drawHeight + 15);
  newProblemBtn.position(mainRect.left + 220, mainRect.top + drawHeight + 15);
  showAnswerBtn.position(mainRect.left + 320, mainRect.top + drawHeight + 15);
}

function draw() {
  updateCanvasSize();
  operation = opSelect.value();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  text('Binary Arithmetic Practice', canvasWidth / 2, 10);

  drawProblem();
  drawInputArea();

  // Set pointer cursor when hovering over clickable operand bits
  let hoverCenterX = canvasWidth / 2;
  let hoverBitWidth = 40;
  let hoverStartX = hoverCenterX - (4 * hoverBitWidth) / 2;
  let overOperand = false;
  for (let i = 0; i < 4; i++) {
    let bx = hoverStartX + i * hoverBitWidth;
    if (mouseX >= bx && mouseX <= bx + hoverBitWidth - 2 &&
        ((mouseY >= 50 && mouseY <= 80) || (mouseY >= 90 && mouseY <= 120))) {
      overOperand = true;
      break;
    }
  }
  cursor(overOperand ? HAND : ARROW);

  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(14);
  text('Operation:', 20, drawHeight + 25);
  text('Click operand or answer bits to toggle', 20, drawHeight + 55);
}

function drawProblem() {
  let centerX = canvasWidth / 2;
  let y = 50;
  let bitWidth = 40;
  let startX = centerX - (4 * bitWidth) / 2;

  // Operand A
  fill('black');
  noStroke();
  textAlign(RIGHT, CENTER);
  textSize(14);
  text('A:', startX - 10, y + 15);

  for (let i = 0; i < 4; i++) {
    fill('#e3f2fd');
    stroke('#2196f3');
    strokeWeight(1);
    rect(startX + i * bitWidth, y, bitWidth - 2, 30, 3);

    fill('#1565c0');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(18);
    text(operandA[i], startX + i * bitWidth + bitWidth / 2 - 1, y + 15);
  }

  // Decimal value
  let aVal = parseInt(operandA.join(''), 2);
  fill('#666');
  textSize(12);
  textAlign(LEFT, CENTER);
  text('= ' + aVal, startX + 4 * bitWidth + 5, y + 15);

  // Operation symbol
  y += 40;
  fill('black');
  textAlign(RIGHT, CENTER);
  textSize(20);
  text(operation === 'add' ? '+' : '−', startX - 10, y + 15);

  // Operand B
  for (let i = 0; i < 4; i++) {
    fill('#fff3e0');
    stroke('#ff9800');
    strokeWeight(1);
    rect(startX + i * bitWidth, y, bitWidth - 2, 30, 3);

    fill('#e65100');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(18);
    text(operandB[i], startX + i * bitWidth + bitWidth / 2 - 1, y + 15);
  }

  let bVal = parseInt(operandB.join(''), 2);
  fill('#666');
  textSize(12);
  textAlign(LEFT, CENTER);
  text('= ' + bVal, startX + 4 * bitWidth + 5, y + 15);

  // Line
  y += 40;
  stroke('#333');
  strokeWeight(2);
  line(startX - 20, y, startX + 4 * bitWidth, y);
}

function drawInputArea() {
  let centerX = canvasWidth / 2;
  let y = 180;
  let bitWidth = 40;
  let startX = centerX - (5 * bitWidth) / 2;

  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(14);
  text('Your Answer (click bits to toggle):', canvasWidth / 2, y - 25);

  // Calculate correct answer
  let aVal = parseInt(operandA.join(''), 2);
  let bVal = parseInt(operandB.join(''), 2);
  let result;
  if (operation === 'add') {
    result = aVal + bVal;
  } else {
    result = aVal - bVal;
    if (result < 0) result = 16 + result; // 4-bit wrap
  }
  let correctBinary = result.toString(2).padStart(5, '0').slice(-5);

  if (showAnswer) {
    // Show correct answer
    for (let i = 0; i < 5; i++) {
      fill('#e8f5e9');
      stroke('#4CAF50');
      strokeWeight(2);
      rect(startX + i * bitWidth, y, bitWidth - 2, 40, 3);

      fill('#2e7d32');
      noStroke();
      textAlign(CENTER, CENTER);
      textSize(20);
      text(correctBinary[i], startX + i * bitWidth + bitWidth / 2 - 1, y + 20);
    }

    fill('#4CAF50');
    textSize(14);
    textAlign(LEFT, CENTER);
    text('= ' + result, startX + 5 * bitWidth + 5, y + 20);
  } else {
    // Show clickable input
    for (let i = 0; i < 5; i++) {
      fill('white');
      stroke('#ccc');
      strokeWeight(1);
      rect(startX + i * bitWidth, y, bitWidth - 2, 40, 3);

      fill('#999');
      noStroke();
      textAlign(CENTER, CENTER);
      textSize(20);
      text('?', startX + i * bitWidth + bitWidth / 2 - 1, y + 20);
    }
  }

  // Explanation
  y += 70;
  fill(240);
  stroke('silver');
  strokeWeight(1);
  rect(20, y, canvasWidth - 40, 120, 5);

  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);
  text('Binary ' + (operation === 'add' ? 'Addition' : 'Subtraction') + ' Rules:', 30, y + 10);

  if (operation === 'add') {
    textSize(11);
    text('0 + 0 = 0', 30, y + 30);
    text('0 + 1 = 1', 30, y + 45);
    text('1 + 0 = 1', 30, y + 60);
    text('1 + 1 = 10 (0 with carry 1)', 30, y + 75);
    text('1 + 1 + 1 = 11 (1 with carry 1)', 30, y + 90);
  } else {
    textSize(11);
    text('0 - 0 = 0', 30, y + 30);
    text('1 - 0 = 1', 30, y + 45);
    text('1 - 1 = 0', 30, y + 60);
    text('0 - 1 = 1 (with borrow)', 30, y + 75);
  }
}

function mousePressed() {
  let centerX = canvasWidth / 2;
  let bitWidth = 40;
  let startX = centerX - (4 * bitWidth) / 2;

  // Check operand A bits (y=50, height=30)
  for (let i = 0; i < 4; i++) {
    let bx = startX + i * bitWidth;
    if (mouseX >= bx && mouseX <= bx + bitWidth - 2 && mouseY >= 50 && mouseY <= 80) {
      operandA[i] = 1 - operandA[i];
      showAnswer = false;
      return;
    }
  }

  // Check operand B bits (y=90, height=30)
  for (let i = 0; i < 4; i++) {
    let bx = startX + i * bitWidth;
    if (mouseX >= bx && mouseX <= bx + bitWidth - 2 && mouseY >= 90 && mouseY <= 120) {
      operandB[i] = 1 - operandB[i];
      showAnswer = false;
      return;
    }
  }
}

function generateNewProblem() {
  for (let i = 0; i < 4; i++) {
    operandA[i] = floor(random(2));
    operandB[i] = floor(random(2));
  }
  showAnswer = false;
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
