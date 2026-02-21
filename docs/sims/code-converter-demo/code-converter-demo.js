// Code Converter Demo MicroSim
// Demonstrate binary code conversions (BCD, Gray, etc.)
// Bloom Level: Apply (L3) - Apply code conversion techniques
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 430;
let controlHeight = 90;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

// Theme colors
const PURPLE = '#6A5BFF';
const PURPLE_DARK = '#5A3EED';
const PURPLE_LIGHT = '#7A5CFF';
const PURPLE_BG = '#F4F0FF';
const PURPLE_BORDER = '#C9B9FF';
const GOLD = '#D4A017';
const GREEN_OK = '#4CAF50';
const BLUE_INPUT = '#5C6BC0';

// Band colors (soft pastels matching theme)
const BAND_INPUT_BG = '#E8E0FF';
const BAND_INPUT_BORDER = '#C9B9FF';
const BAND_STEPS_BG = '#FFF8E1';
const BAND_STEPS_BORDER = '#FFD54F';
const BAND_OUTPUT_BG = '#E8F5E9';
const BAND_OUTPUT_BORDER = '#81C784';

let conversionSelect;
let currentConversion = 'binary-gray';

// Store individual bits
let valueBits = [0, 1, 0, 1]; // 5 (0101)
let bitBoxSize = 32;
let bitSpacing = 10;

let conversions = [
  { id: 'binary-gray', name: 'Binary \u2192 Gray Code', from: 'Binary', to: 'Gray' },
  { id: 'gray-binary', name: 'Gray Code \u2192 Binary', from: 'Gray', to: 'Binary' },
  { id: 'decimal-bcd', name: 'Decimal \u2192 BCD', from: 'Decimal', to: 'BCD' },
  { id: 'bcd-excess3', name: 'BCD \u2192 Excess-3', from: 'BCD', to: 'Excess-3' }
];

function bitsToValue(bits) {
  return bits[0] * 8 + bits[1] * 4 + bits[2] * 2 + bits[3];
}

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  conversionSelect = createSelect();
  conversionSelect.size(220);
  for (let c of conversions) {
    conversionSelect.option(c.name, c.id);
  }
  conversionSelect.changed(() => { currentConversion = conversionSelect.value(); });

  positionUIElements();

  describe('Code converter demonstrating binary, Gray, BCD, and Excess-3 conversions', LABEL);
}

function positionUIElements() {
  let mainRect = document.querySelector('main').getBoundingClientRect();
  conversionSelect.position(mainRect.left + 110, mainRect.top + drawHeight + 10);
}

function draw() {
  updateCanvasSize();
  let currentValue = bitsToValue(valueBits);

  // Card background
  fill(PURPLE_BG);
  stroke(PURPLE_BORDER);
  strokeWeight(1.5);
  rect(1, 1, canvasWidth - 2, drawHeight - 2, 14);

  // Control area
  fill('white');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill(PURPLE);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(18);
  textStyle(BOLD);
  text('Code Converter Demo', canvasWidth / 2, 10);
  textStyle(NORMAL);

  // Subtitle
  let conv = conversions.find(c => c.id === currentConversion);
  textSize(12);
  fill('#555');
  text(conv.from + ' \u2192 ' + conv.to, canvasWidth / 2, 33);

  // Draw conversion
  drawConversion();

  // Control labels
  fill(PURPLE);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(11);
  textStyle(BOLD);
  text('Conversion:', 20, drawHeight + 22);
  textStyle(NORMAL);

  // Draw clickable bit toggles
  drawBitToggles();
}

function drawBitToggles() {
  let currentValue = bitsToValue(valueBits);
  let bitY = drawHeight + 45;

  // Label
  fill(PURPLE_DARK);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  textStyle(BOLD);
  text('Value=' + currentValue, 20, bitY + bitBoxSize / 2);
  textStyle(NORMAL);

  // Bit boxes — purple active, light inactive
  let boxStartX = 100;
  for (let i = 0; i < 4; i++) {
    let x = boxStartX + i * (bitBoxSize + bitSpacing);

    if (valueBits[i] === 1) {
      drawingContext.shadowColor = 'rgba(106, 91, 255, 0.3)';
      drawingContext.shadowBlur = 5;
    }

    fill(valueBits[i] === 1 ? PURPLE : '#E0E0E0');
    stroke(PURPLE_BORDER);
    strokeWeight(1.5);
    rect(x, bitY, bitBoxSize, bitBoxSize, 8);

    drawingContext.shadowBlur = 0;

    fill('white');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(16);
    textStyle(BOLD);
    text(valueBits[i], x + bitBoxSize / 2, bitY + bitBoxSize / 2);
    textStyle(NORMAL);
  }

  // Bit position labels
  fill(PURPLE_LIGHT);
  noStroke();
  textSize(9);
  textAlign(CENTER, TOP);
  for (let i = 0; i < 4; i++) {
    let bx = boxStartX + i * (bitBoxSize + bitSpacing) + bitBoxSize / 2;
    text(3 - i, bx, bitY + bitBoxSize + 3);
  }

  // Decimal display
  fill('#777');
  textSize(11);
  textAlign(LEFT, CENTER);
  let afterBitsX = boxStartX + 4 * (bitBoxSize + bitSpacing) + 10;
  text('= ' + currentValue + ' (decimal)', afterBitsX, bitY + bitBoxSize / 2);
}

function mousePressed() {
  let bitY = drawHeight + 45;
  let boxStartX = 100;

  for (let i = 0; i < 4; i++) {
    let x = boxStartX + i * (bitBoxSize + bitSpacing);
    if (mouseX >= x && mouseX <= x + bitBoxSize &&
        mouseY >= bitY && mouseY <= bitY + bitBoxSize) {
      valueBits[i] = valueBits[i] === 0 ? 1 : 0;
      return;
    }
  }
}

function drawConversion() {
  let currentValue = bitsToValue(valueBits);
  let centerX = canvasWidth / 2;
  let mx = 25; // horizontal margin
  let bandW = canvasWidth - 2 * mx;
  let y = 56;

  // Get input and output values
  let inputBinary, outputCode, outputLabel;
  let steps = [];

  switch (currentConversion) {
    case 'binary-gray':
      inputBinary = currentValue.toString(2).padStart(4, '0');
      outputCode = binaryToGray(inputBinary);
      outputLabel = 'Gray';
      steps = getBinaryToGraySteps(inputBinary);
      break;
    case 'gray-binary':
      inputBinary = binaryToGray(currentValue.toString(2).padStart(4, '0'));
      outputCode = grayToBinary(inputBinary);
      outputLabel = 'Binary';
      steps = getGrayToBinarySteps(inputBinary);
      break;
    case 'decimal-bcd':
      inputBinary = currentValue.toString();
      outputCode = decimalToBCD(currentValue);
      outputLabel = 'BCD';
      steps = getDecimalToBCDSteps(currentValue);
      break;
    case 'bcd-excess3':
      inputBinary = currentValue.toString(2).padStart(4, '0');
      outputCode = bcdToExcess3(currentValue);
      outputLabel = 'Excess-3';
      steps = getBCDToExcess3Steps(currentValue);
      break;
  }

  // ── Input band ──
  fill(BAND_INPUT_BG);
  stroke(BAND_INPUT_BORDER);
  strokeWeight(1.5);
  rect(mx, y, bandW, 52, 12);

  fill(PURPLE);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(11);
  textStyle(BOLD);
  text('Input (' + conversions.find(c => c.id === currentConversion).from + ')', centerX, y + 6);
  textStyle(NORMAL);

  textSize(22);
  textStyle(BOLD);
  fill(PURPLE_DARK);
  text(inputBinary, centerX, y + 24);
  textStyle(NORMAL);

  // Arrow down
  y += 62;
  fill(GOLD);
  noStroke();
  triangle(centerX, y + 16, centerX - 12, y, centerX + 12, y);

  // ── Conversion steps band ──
  y += 24;
  fill(BAND_STEPS_BG);
  stroke(BAND_STEPS_BORDER);
  strokeWeight(1.5);
  rect(mx, y, bandW, 105, 12);

  fill(GOLD);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(11);
  textStyle(BOLD);
  text('Conversion Steps', centerX, y + 7);
  textStyle(NORMAL);

  // Step equations — left-aligned for clean math look
  textSize(11);
  fill('#333');
  let stepY = y + 26;
  for (let step of steps) {
    if (step !== '') {
      textAlign(CENTER, TOP);
      text(step, centerX, stepY);
    }
    stepY += 18;
  }

  // Arrow down
  y += 115;
  fill(GREEN_OK);
  noStroke();
  triangle(centerX, y + 16, centerX - 12, y, centerX + 12, y);

  // ── Output band ──
  y += 24;
  fill(BAND_OUTPUT_BG);
  stroke(BAND_OUTPUT_BORDER);
  strokeWeight(1.5);
  rect(mx, y, bandW, 52, 12);

  fill(GREEN_OK);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(11);
  textStyle(BOLD);
  text('Output (' + outputLabel + ')', centerX, y + 6);
  textStyle(NORMAL);

  textSize(22);
  textStyle(BOLD);
  fill('#2E7D32');
  text(outputCode, centerX, y + 24);
  textStyle(NORMAL);

  // ── Bit comparison strip ──
  drawBitComparison(y + 62, inputBinary, outputCode);
}

function drawBitComparison(y, input, output) {
  let mx = 25;
  let bandW = canvasWidth - 2 * mx;

  fill(PURPLE_BG);
  stroke(PURPLE_BORDER);
  strokeWeight(1.5);
  rect(mx, y, bandW, 65, 12);

  fill(PURPLE);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(11);
  textStyle(BOLD);
  text('Bit-by-bit Comparison:', mx + 14, y + 8);
  textStyle(NORMAL);

  // Only show for 4-bit codes
  if (input.length === 4 && output.length === 4) {
    let conv = conversions.find(c => c.id === currentConversion);
    let startX = canvasWidth / 2 - 100;
    let bitW = 55;

    textAlign(CENTER, TOP);
    textSize(10);
    fill(PURPLE_LIGHT);
    for (let i = 0; i < 4; i++) {
      text('Bit ' + (3 - i), startX + i * bitW, y + 26);
    }

    textSize(15);
    textStyle(BOLD);
    for (let i = 0; i < 4; i++) {
      let changed = input[i] !== output[i];
      fill(changed ? GOLD : '#aaa');
      text(input[i] + '\u2192' + output[i], startX + i * bitW, y + 42);
    }
    textStyle(NORMAL);
  } else {
    fill('#666');
    textAlign(CENTER, CENTER);
    textSize(11);
    text('Input: ' + input + '  \u2192  Output: ' + output, canvasWidth / 2, y + 35);
  }
}

function binaryToGray(binary) {
  let gray = binary[0];
  for (let i = 1; i < binary.length; i++) {
    gray += (parseInt(binary[i - 1]) ^ parseInt(binary[i])).toString();
  }
  return gray;
}

function grayToBinary(gray) {
  let binary = gray[0];
  for (let i = 1; i < gray.length; i++) {
    binary += (parseInt(binary[i - 1]) ^ parseInt(gray[i])).toString();
  }
  return binary;
}

function decimalToBCD(decimal) {
  if (decimal > 9) {
    let tens = Math.floor(decimal / 10);
    let ones = decimal % 10;
    return tens.toString(2).padStart(4, '0') + ' ' + ones.toString(2).padStart(4, '0');
  }
  return decimal.toString(2).padStart(4, '0');
}

function bcdToExcess3(decimal) {
  if (decimal > 9) {
    return 'N/A (>9)';
  }
  return (decimal + 3).toString(2).padStart(4, '0');
}

function getBinaryToGraySteps(binary) {
  return [
    'G\u2083 = B\u2083 = ' + binary[0],
    'G\u2082 = B\u2083 \u2295 B\u2082 = ' + binary[0] + ' \u2295 ' + binary[1] + ' = ' + (parseInt(binary[0]) ^ parseInt(binary[1])),
    'G\u2081 = B\u2082 \u2295 B\u2081 = ' + binary[1] + ' \u2295 ' + binary[2] + ' = ' + (parseInt(binary[1]) ^ parseInt(binary[2])),
    'G\u2080 = B\u2081 \u2295 B\u2080 = ' + binary[2] + ' \u2295 ' + binary[3] + ' = ' + (parseInt(binary[2]) ^ parseInt(binary[3]))
  ];
}

function getGrayToBinarySteps(gray) {
  let b3 = gray[0];
  let b2 = (parseInt(b3) ^ parseInt(gray[1])).toString();
  let b1 = (parseInt(b2) ^ parseInt(gray[2])).toString();
  let b0 = (parseInt(b1) ^ parseInt(gray[3])).toString();

  return [
    'B\u2083 = G\u2083 = ' + b3,
    'B\u2082 = B\u2083 \u2295 G\u2082 = ' + b3 + ' \u2295 ' + gray[1] + ' = ' + b2,
    'B\u2081 = B\u2082 \u2295 G\u2081 = ' + b2 + ' \u2295 ' + gray[2] + ' = ' + b1,
    'B\u2080 = B\u2081 \u2295 G\u2080 = ' + b1 + ' \u2295 ' + gray[3] + ' = ' + b0
  ];
}

function getDecimalToBCDSteps(decimal) {
  if (decimal > 9) {
    let tens = Math.floor(decimal / 10);
    let ones = decimal % 10;
    return [
      'Split into digits: ' + tens + ' and ' + ones,
      'Tens digit ' + tens + ' \u2192 ' + tens.toString(2).padStart(4, '0'),
      'Ones digit ' + ones + ' \u2192 ' + ones.toString(2).padStart(4, '0'),
      'BCD = ' + tens.toString(2).padStart(4, '0') + ' ' + ones.toString(2).padStart(4, '0')
    ];
  }
  return [
    'Single digit: ' + decimal,
    'Convert to 4-bit binary',
    decimal + ' = ' + decimal.toString(2).padStart(4, '0'),
    ''
  ];
}

function getBCDToExcess3Steps(decimal) {
  if (decimal > 9) {
    return ['BCD valid only for 0-9', 'Value ' + decimal + ' is out of range', '', ''];
  }
  return [
    'BCD value: ' + decimal,
    'Add 3: ' + decimal + ' + 3 = ' + (decimal + 3),
    'Convert to binary:',
    (decimal + 3) + ' = ' + (decimal + 3).toString(2).padStart(4, '0')
  ];
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
