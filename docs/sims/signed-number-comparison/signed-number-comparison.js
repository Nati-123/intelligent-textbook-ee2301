// Signed Number Comparison MicroSim
// Compare sign-magnitude, one's complement, and two's complement
// Bloom Level: Analyze (L4) - Compare, differentiate, contrast
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 470;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let valueSlider;
let currentValue = 5;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  valueSlider = createSlider(-7, 7, 5);
  valueSlider.size(200);
  valueSlider.input(() => { currentValue = valueSlider.value(); });

  positionUIElements();

  describe('Comparison of sign-magnitude, ones complement, and twos complement representations', LABEL);
}

function positionUIElements() {
  let mainRect = document.querySelector('main').getBoundingClientRect();
  valueSlider.position(mainRect.left + 120, mainRect.top + drawHeight + 15);
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
  text('Signed Number Representations', canvasWidth / 2, 10);

  textSize(14);
  fill(currentValue >= 0 ? '#4CAF50' : '#f44336');
  text('Decimal Value: ' + currentValue, canvasWidth / 2, 38);

  drawRepresentations();
  drawComparisonTable();

  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(14);
  text('Value (-7 to +7):', 20, drawHeight + 25);
  text(currentValue, 330, drawHeight + 25);
  textSize(11);
  text('4-bit representations', 20, drawHeight + 55);
}

function drawRepresentations() {
  let y = 65;
  let boxHeight = 70;

  // Sign-Magnitude
  drawRepBox(y, 'Sign-Magnitude', getSignMagnitude(currentValue), '#2196f3', '#e3f2fd');
  y += boxHeight + 10;

  // One's Complement
  drawRepBox(y, "One's Complement", getOnesComplement(currentValue), '#ff9800', '#fff3e0');
  y += boxHeight + 10;

  // Two's Complement
  drawRepBox(y, "Two's Complement", getTwosComplement(currentValue), '#4CAF50', '#e8f5e9');
}

function drawRepBox(y, title, binary, color, bgColor) {
  let x = 20;
  let w = canvasWidth - 40;

  fill(bgColor);
  stroke(color);
  strokeWeight(2);
  rect(x, y, w, 70, 5);

  fill(color);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);
  text(title, x + 10, y + 8);

  // Binary display
  let bits = binary.split('');
  let bitWidth = 35;
  let startX = x + 20;

  for (let i = 0; i < 4; i++) {
    fill('white');
    stroke(color);
    strokeWeight(1);
    rect(startX + i * bitWidth, y + 28, bitWidth - 4, 30, 3);

    fill(i === 0 ? '#e91e63' : 'black');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(18);
    text(bits[i], startX + i * bitWidth + (bitWidth - 4) / 2, y + 43);
  }

  // Labels
  fill('#666');
  textSize(9);
  textAlign(CENTER, TOP);
  text('sign', startX + (bitWidth - 4) / 2, y + 58);
  text('magnitude', startX + 2 * bitWidth, y + 58);

  // Explanation
  fill('#333');
  textSize(11);
  textAlign(LEFT, CENTER);
  let explanation = getExplanation(title, currentValue);
  text(explanation, startX + 4 * bitWidth + 15, y + 43);
}

function getSignMagnitude(val) {
  if (val >= 0) {
    return '0' + Math.abs(val).toString(2).padStart(3, '0');
  } else {
    return '1' + Math.abs(val).toString(2).padStart(3, '0');
  }
}

function getOnesComplement(val) {
  if (val >= 0) {
    return '0' + val.toString(2).padStart(3, '0');
  } else {
    let positive = Math.abs(val).toString(2).padStart(4, '0');
    return positive.split('').map(b => b === '0' ? '1' : '0').join('');
  }
}

function getTwosComplement(val) {
  if (val >= 0) {
    return '0' + val.toString(2).padStart(3, '0');
  } else {
    return ((16 + val) >>> 0).toString(2).padStart(4, '0');
  }
}

function getExplanation(type, val) {
  if (val >= 0) {
    return 'Positive: same as unsigned';
  }
  if (type === 'Sign-Magnitude') {
    return 'MSB=1 for negative, rest=|' + val + '|';
  } else if (type === "One's Complement") {
    return 'Invert all bits of +' + Math.abs(val);
  } else {
    return 'Invert + 1 (or 16+(' + val + '))';
  }
}

function drawComparisonTable() {
  let y = 305;
  fill(240);
  stroke('silver');
  strokeWeight(1);
  rect(20, y, canvasWidth - 40, 155, 5);

  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);
  text('Comparison (4-bit range):', 30, y + 8);

  let col1 = 30, col2 = 150, col3 = 260, col4 = 360;
  let rowY = y + 30;
  let rowH = 20;

  textSize(10);
  fill('#666');
  text('Property', col1, rowY);
  text('Sign-Mag', col2, rowY);
  text("1's Comp", col3, rowY);
  text("2's Comp", col4, rowY);

  rowY += rowH;
  fill('black');
  text('Range', col1, rowY);
  text('-7 to +7', col2, rowY);
  text('-7 to +7', col3, rowY);
  text('-8 to +7', col4, rowY);

  rowY += rowH;
  text('Zero representations', col1, rowY);
  text('Two (+0, -0)', col2, rowY);
  text('Two (+0, -0)', col3, rowY);
  fill('#4CAF50');
  text('One', col4, rowY);

  rowY += rowH;
  fill('black');
  text('Addition hardware', col1, rowY);
  text('Complex', col2, rowY);
  text('End-around', col3, rowY);
  fill('#4CAF50');
  text('Simple', col4, rowY);

  rowY += rowH;
  fill('black');
  text('Negation', col1, rowY);
  text('Flip MSB', col2, rowY);
  text('Flip all', col3, rowY);
  text('Flip + 1', col4, rowY);

  rowY += rowH;
  text('Modern use', col1, rowY);
  fill('#999');
  text('Rare', col2, rowY);
  text('Rare', col3, rowY);
  fill('#4CAF50');
  text('Standard', col4, rowY);
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
