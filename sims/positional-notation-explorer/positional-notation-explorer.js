// Positional Notation Explorer MicroSim
// Understand how positional notation represents numbers in any base
// Bloom Level: Understand (L2) - Explain, interpret
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 420;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let numberInput;
let baseSelect;
let currentNumber = '1011';
let currentBase = 2;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  numberInput = createInput('1011');
  numberInput.size(120);
  numberInput.input(handleInput);

  baseSelect = createSelect();
  baseSelect.option('Binary (2)', 2);
  baseSelect.option('Octal (8)', 8);
  baseSelect.option('Decimal (10)', 10);
  baseSelect.option('Hexadecimal (16)', 16);
  baseSelect.selected('Binary (2)');
  baseSelect.changed(handleBaseChange);

  positionUIElements();

  describe('Interactive positional notation explorer showing place values', LABEL);
}

function positionUIElements() {
  let mainRect = document.querySelector('main').getBoundingClientRect();
  numberInput.position(mainRect.left + 100, mainRect.top + drawHeight + 15);
  baseSelect.position(mainRect.left + 100, mainRect.top + drawHeight + 50);
}

function draw() {
  updateCanvasSize();

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
  text('Positional Notation Explorer', canvasWidth / 2, 10);

  textSize(12);
  fill('#666');
  text('See how each digit contributes to the total value', canvasWidth / 2, 35);

  drawPositionalBreakdown();

  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(14);
  text('Number:', 20, drawHeight + 25);
  text('Base:', 20, drawHeight + 60);
}

function drawPositionalBreakdown() {
  let digits = currentNumber.toUpperCase().split('');
  let numDigits = digits.length;

  if (numDigits === 0 || !isValidNumber(currentNumber, currentBase)) {
    fill('#f44336');
    textAlign(CENTER, CENTER);
    textSize(14);
    text('Invalid number for base ' + currentBase, canvasWidth / 2, 150);
    return;
  }

  let cellWidth = Math.min(70, (canvasWidth - 40) / numDigits);
  let startX = (canvasWidth - cellWidth * numDigits) / 2;
  let y = 60;

  // Position row
  fill('#e3f2fd');
  stroke('#2196f3');
  strokeWeight(1);
  for (let i = 0; i < numDigits; i++) {
    rect(startX + i * cellWidth, y, cellWidth, 30);
  }

  fill('#1565c0');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  for (let i = 0; i < numDigits; i++) {
    text('Position ' + (numDigits - 1 - i), startX + i * cellWidth + cellWidth / 2, y + 15);
  }

  // Digit row
  y += 35;
  fill('white');
  stroke('#333');
  strokeWeight(2);
  for (let i = 0; i < numDigits; i++) {
    rect(startX + i * cellWidth, y, cellWidth, 40);
  }

  fill('black');
  noStroke();
  textSize(24);
  for (let i = 0; i < numDigits; i++) {
    text(digits[i], startX + i * cellWidth + cellWidth / 2, y + 20);
  }

  // Power row
  y += 45;
  fill('#fff3e0');
  stroke('#ff9800');
  strokeWeight(1);
  for (let i = 0; i < numDigits; i++) {
    rect(startX + i * cellWidth, y, cellWidth, 30);
  }

  fill('#e65100');
  noStroke();
  textSize(12);
  for (let i = 0; i < numDigits; i++) {
    let power = numDigits - 1 - i;
    text(currentBase + '^' + power, startX + i * cellWidth + cellWidth / 2, y + 15);
  }

  // Value row
  y += 35;
  fill('#e8f5e9');
  stroke('#4CAF50');
  strokeWeight(1);
  for (let i = 0; i < numDigits; i++) {
    rect(startX + i * cellWidth, y, cellWidth, 30);
  }

  fill('#2e7d32');
  noStroke();
  textSize(11);
  for (let i = 0; i < numDigits; i++) {
    let power = numDigits - 1 - i;
    let value = Math.pow(currentBase, power);
    text('= ' + value, startX + i * cellWidth + cellWidth / 2, y + 15);
  }

  // Contribution row
  y += 35;
  fill('#fce4ec');
  stroke('#e91e63');
  strokeWeight(1);
  for (let i = 0; i < numDigits; i++) {
    rect(startX + i * cellWidth, y, cellWidth, 30);
  }

  fill('#c2185b');
  noStroke();
  textSize(11);
  let contributions = [];
  for (let i = 0; i < numDigits; i++) {
    let digitVal = parseInt(digits[i], currentBase);
    let power = numDigits - 1 - i;
    let contribution = digitVal * Math.pow(currentBase, power);
    contributions.push(contribution);
    text(digitVal + '×' + Math.pow(currentBase, power), startX + i * cellWidth + cellWidth / 2, y + 15);
  }

  // Sum equation
  y += 50;
  fill('black');
  textAlign(CENTER, TOP);
  textSize(14);

  let equation = contributions.join(' + ');
  let total = contributions.reduce((a, b) => a + b, 0);

  text(equation, canvasWidth / 2, y);
  y += 25;
  textSize(18);
  fill('#4CAF50');
  text('= ' + total + ' (decimal)', canvasWidth / 2, y);

  // Formula
  y += 40;
  fill(240);
  stroke('silver');
  strokeWeight(1);
  rect(20, y, canvasWidth - 40, 60, 5);

  fill('black');
  noStroke();
  textSize(12);
  textAlign(LEFT, TOP);
  text('Formula: N = Σ(digit × base^position)', 30, y + 10);
  text(`${currentNumber} in base ${currentBase} = ${total} in base 10`, 30, y + 30);
}

function isValidNumber(num, base) {
  let validChars;
  if (base === 2) validChars = /^[01]+$/;
  else if (base === 8) validChars = /^[0-7]+$/;
  else if (base === 10) validChars = /^[0-9]+$/;
  else if (base === 16) validChars = /^[0-9A-Fa-f]+$/;
  else return false;
  return validChars.test(num);
}

function handleInput() {
  currentNumber = numberInput.value().trim();
}

function handleBaseChange() {
  currentBase = parseInt(baseSelect.value());
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
