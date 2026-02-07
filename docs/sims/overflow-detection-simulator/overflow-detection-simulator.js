// Overflow Detection Simulator MicroSim
// Visualize overflow in signed binary arithmetic
// Bloom Level: Analyze (L4) - Detect and explain overflow conditions
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 420;
let controlHeight = 130;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let aSlider, bSlider;
let operationSelect;
let valueA = 3;
let valueB = 4;
let operation = 'add';

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  // Operation selector
  operationSelect = createSelect();
  operationSelect.option('Addition', 'add');
  operationSelect.option('Subtraction', 'sub');
  operationSelect.changed(() => { operation = operationSelect.value(); });

  // Value A slider
  aSlider = createSlider(-8, 7, 3);
  aSlider.size(180);
  aSlider.input(() => { valueA = aSlider.value(); });

  // Value B slider
  bSlider = createSlider(-8, 7, 4);
  bSlider.size(180);
  bSlider.input(() => { valueB = bSlider.value(); });

  positionUIElements();

  describe('Overflow detection simulator showing when signed arithmetic overflows', LABEL);
}

function positionUIElements() {
  let mainRect = document.querySelector('main').getBoundingClientRect();
  operationSelect.position(mainRect.left + 120, mainRect.top + drawHeight + 15);
  aSlider.position(mainRect.left + 120, mainRect.top + drawHeight + 50);
  bSlider.position(mainRect.left + 120, mainRect.top + drawHeight + 85);
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
  text('Overflow Detection (4-bit Two\'s Complement)', canvasWidth / 2, 10);

  // Calculate result
  let result, hasOverflow;
  if (operation === 'add') {
    result = valueA + valueB;
    hasOverflow = detectAddOverflow(valueA, valueB);
  } else {
    result = valueA - valueB;
    hasOverflow = detectSubOverflow(valueA, valueB);
  }

  // Draw the operation
  drawOperation(result, hasOverflow);

  // Draw overflow explanation
  drawExplanation(result, hasOverflow);

  // Hint text for clickable bits
  fill('#999');
  textAlign(CENTER, TOP);
  textSize(10);
  text('Click bits to toggle', canvasWidth / 2, 38);

  // Set pointer cursor when hovering over clickable operand bits
  let hBitWidth = 35;
  let hStartX = canvasWidth / 2 - 80;
  let bitRows = [40, 75]; // y positions of operand A and B bit rows
  let overBit = false;
  for (let r = 0; r < bitRows.length; r++) {
    if (mouseY >= bitRows[r] && mouseY <= bitRows[r] + 30) {
      for (let i = 0; i < 4; i++) {
        let bx = hStartX + i * hBitWidth;
        if (mouseX >= bx && mouseX <= bx + hBitWidth - 4) {
          overBit = true;
          break;
        }
      }
      if (overBit) break;
    }
  }
  cursor(overBit ? HAND : ARROW);

  // Control labels
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(14);
  text('Operation:', 20, drawHeight + 27);
  text('Value A:', 20, drawHeight + 62);
  text('Value B:', 20, drawHeight + 97);

  textAlign(RIGHT, CENTER);
  text(valueA, canvasWidth - 30, drawHeight + 62);
  text(valueB, canvasWidth - 30, drawHeight + 97);
}

function drawOperation(result, hasOverflow) {
  let y = 55;
  let x = canvasWidth / 2 - 80;

  // Binary representations
  let binA = toTwosComplement(valueA);
  let binB = toTwosComplement(valueB);
  let binResult = toTwosComplement(result);
  let actualResult = fromTwosComplement(binResult);

  textSize(16);
  textAlign(RIGHT, CENTER);
  fill('black');

  // First operand
  text(valueA + ' =', x - 10, y);
  drawBinary(binA, x, y, '#2196f3');

  y += 35;
  // Operator and second operand
  text((operation === 'add' ? '+' : '−') + ' ' + valueB + ' =', x - 10, y);
  drawBinary(binB, x, y, '#ff9800');

  // Line
  y += 25;
  stroke('black');
  strokeWeight(2);
  line(x, y, x + 160, y);

  // Result
  y += 25;
  noStroke();
  let expectedResult = operation === 'add' ? valueA + valueB : valueA - valueB;
  text(actualResult + ' =', x - 10, y);
  drawBinary(binResult, x, y, hasOverflow ? '#f44336' : '#4CAF50');

  // Show expected vs actual
  y += 40;
  textAlign(CENTER, CENTER);
  textSize(14);
  if (hasOverflow) {
    fill('#f44336');
    text('Expected: ' + expectedResult + ' | Got: ' + actualResult + ' (OVERFLOW!)', canvasWidth / 2, y);
  } else {
    fill('#4CAF50');
    text('Result: ' + actualResult + ' (No overflow)', canvasWidth / 2, y);
  }
}

function drawBinary(binary, x, y, color) {
  let bits = binary.split('');
  let bitWidth = 35;

  for (let i = 0; i < 4; i++) {
    fill('white');
    stroke(color);
    strokeWeight(2);
    rect(x + i * bitWidth, y - 15, bitWidth - 4, 30, 3);

    fill(i === 0 ? '#e91e63' : 'black');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(18);
    text(bits[i], x + i * bitWidth + (bitWidth - 4) / 2, y);
  }

  // Sign bit label
  fill('#666');
  textSize(9);
  text('sign', x + (bitWidth - 4) / 2, y + 22);
}

function drawExplanation(result, hasOverflow) {
  let y = 260;
  fill(240);
  stroke('silver');
  strokeWeight(1);
  rect(20, y, canvasWidth - 40, 150, 5);

  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);
  text('Overflow Detection Rules:', 30, y + 10);

  textSize(11);
  let ruleY = y + 35;

  // Rule explanation
  fill('#666');
  if (operation === 'add') {
    text('• Adding two positives → result must be positive', 30, ruleY);
    ruleY += 20;
    text('• Adding two negatives → result must be negative', 30, ruleY);
    ruleY += 20;
    text('• Adding opposite signs → never overflows', 30, ruleY);
  } else {
    text('• Subtracting is like adding the negation', 30, ruleY);
    ruleY += 20;
    text('• pos − neg = pos + pos (can overflow positive)', 30, ruleY);
    ruleY += 20;
    text('• neg − pos = neg + neg (can overflow negative)', 30, ruleY);
  }

  ruleY += 25;
  stroke('#ccc');
  line(30, ruleY, canvasWidth - 50, ruleY);
  ruleY += 10;

  // Current status
  noStroke();
  if (hasOverflow) {
    fill('#f44336');
    text('⚠ OVERFLOW: Sign of result is incorrect!', 30, ruleY);
    ruleY += 18;
    fill('#666');
    text('The result ' + result + ' is outside the range [-8, +7]', 30, ruleY);
  } else {
    fill('#4CAF50');
    text('✓ No overflow: Result is within valid range [-8, +7]', 30, ruleY);
  }
}

function toTwosComplement(val) {
  if (val >= 0) {
    return val.toString(2).padStart(4, '0');
  } else {
    return ((16 + val) >>> 0).toString(2).padStart(4, '0');
  }
}

function fromTwosComplement(binary) {
  let val = parseInt(binary, 2);
  if (binary[0] === '1') {
    return val - 16;
  }
  return val;
}

function detectAddOverflow(a, b) {
  let result = a + b;
  // Overflow if result is outside 4-bit two's complement range
  return result < -8 || result > 7;
}

function detectSubOverflow(a, b) {
  let result = a - b;
  return result < -8 || result > 7;
}

function mousePressed() {
  let bitWidth = 35;
  let x = canvasWidth / 2 - 80;

  // Row A bits: drawBinary called with y=55, rect top = 55-15 = 40
  // Row B bits: drawBinary called with y=90, rect top = 90-15 = 75
  let rows = [
    { bitY: 40, currentValue: valueA },
    { bitY: 75, currentValue: valueB }
  ];

  for (let r = 0; r < rows.length; r++) {
    if (mouseY >= rows[r].bitY && mouseY <= rows[r].bitY + 30) {
      for (let i = 0; i < 4; i++) {
        let bx = x + i * bitWidth;
        if (mouseX >= bx && mouseX <= bx + bitWidth - 4) {
          let binary = toTwosComplement(rows[r].currentValue);
          let bits = binary.split('');
          bits[i] = bits[i] === '0' ? '1' : '0';
          let newValue = fromTwosComplement(bits.join(''));
          newValue = constrain(newValue, -8, 7);
          if (r === 0) {
            valueA = newValue;
            aSlider.value(valueA);
          } else {
            valueB = newValue;
            bSlider.value(valueB);
          }
          return;
        }
      }
    }
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
