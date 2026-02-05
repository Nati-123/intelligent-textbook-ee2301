// Code Converter Demo MicroSim
// Demonstrate binary code conversions (BCD, Gray, etc.)
// Bloom Level: Apply (L3) - Apply code conversion techniques
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 430;
let controlHeight = 70;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let conversionSelect;
let valueSlider;
let currentValue = 5;
let currentConversion = 'binary-gray';

let conversions = [
  { id: 'binary-gray', name: 'Binary → Gray Code', from: 'Binary', to: 'Gray' },
  { id: 'gray-binary', name: 'Gray Code → Binary', from: 'Gray', to: 'Binary' },
  { id: 'decimal-bcd', name: 'Decimal → BCD', from: 'Decimal', to: 'BCD' },
  { id: 'bcd-excess3', name: 'BCD → Excess-3', from: 'BCD', to: 'Excess-3' }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  conversionSelect = createSelect();
  conversionSelect.position(100, drawHeight + 15);
  conversionSelect.size(220);
  for (let c of conversions) {
    conversionSelect.option(c.name, c.id);
  }
  conversionSelect.changed(() => { currentConversion = conversionSelect.value(); });

  valueSlider = createSlider(0, 15, 5);
  valueSlider.position(100, drawHeight + 45);
  valueSlider.size(180);
  valueSlider.input(() => { currentValue = valueSlider.value(); });

  describe('Code converter demonstrating binary, Gray, BCD, and Excess-3 conversions', LABEL);
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
  textSize(18);
  text('Code Converter Demo', canvasWidth / 2, 10);

  let conv = conversions.find(c => c.id === currentConversion);
  textSize(12);
  fill('#666');
  text(conv.from + ' → ' + conv.to, canvasWidth / 2, 35);

  // Draw conversion
  drawConversion();

  // Control labels
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(11);
  text('Conversion:', 20, drawHeight + 27);
  text('Value (0-15):', 20, drawHeight + 57);
  textAlign(RIGHT, CENTER);
  text(currentValue, canvasWidth - 30, drawHeight + 57);
}

function drawConversion() {
  let centerX = canvasWidth / 2;
  let y = 65;

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

  // Input display
  fill('#e3f2fd');
  stroke('#2196f3');
  strokeWeight(2);
  rect(30, y, canvasWidth - 60, 50, 8);

  fill('#2196f3');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(11);
  text('Input (' + conversions.find(c => c.id === currentConversion).from + ')', centerX, y + 5);

  textSize(22);
  fill('black');
  text(inputBinary, centerX, y + 22);

  // Arrow
  y += 60;
  fill('#ff9800');
  noStroke();
  triangle(centerX, y + 20, centerX - 15, y, centerX + 15, y);

  // Conversion steps
  y += 30;
  fill('#fff3e0');
  stroke('#ff9800');
  strokeWeight(2);
  rect(30, y, canvasWidth - 60, 100, 8);

  fill('#ff9800');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(11);
  text('Conversion Steps', centerX, y + 5);

  textSize(10);
  fill('#333');
  let stepY = y + 25;
  for (let step of steps) {
    text(step, centerX, stepY);
    stepY += 16;
  }

  // Arrow
  y += 110;
  fill('#4CAF50');
  noStroke();
  triangle(centerX, y + 20, centerX - 15, y, centerX + 15, y);

  // Output display
  y += 30;
  fill('#e8f5e9');
  stroke('#4CAF50');
  strokeWeight(2);
  rect(30, y, canvasWidth - 60, 50, 8);

  fill('#4CAF50');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(11);
  text('Output (' + outputLabel + ')', centerX, y + 5);

  textSize(22);
  fill('black');
  text(outputCode, centerX, y + 22);

  // Draw bit comparison
  drawBitComparison(y + 65, inputBinary, outputCode);
}

function drawBitComparison(y, input, output) {
  fill('#f5f5f5');
  stroke('#ccc');
  strokeWeight(1);
  rect(30, y, canvasWidth - 60, 60, 5);

  fill('#333');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(10);
  text('Bit-by-bit Comparison:', 40, y + 8);

  // Only show for 4-bit codes
  if (input.length === 4 && output.length === 4) {
    let startX = 60;
    let bitW = 50;

    textAlign(CENTER, TOP);
    textSize(9);
    fill('#666');
    for (let i = 0; i < 4; i++) {
      text('Bit ' + (3 - i), startX + i * bitW, y + 25);
    }

    textSize(14);
    for (let i = 0; i < 4; i++) {
      fill(input[i] === output[i] ? '#999' : '#f44336');
      text(input[i] + '→' + output[i], startX + i * bitW, y + 40);
    }
  } else {
    fill('#666');
    textAlign(CENTER, CENTER);
    textSize(10);
    text('Input: ' + input + '  →  Output: ' + output, canvasWidth / 2, y + 35);
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
    'G₃ = B₃ = ' + binary[0],
    'G₂ = B₃ ⊕ B₂ = ' + binary[0] + ' ⊕ ' + binary[1] + ' = ' + (parseInt(binary[0]) ^ parseInt(binary[1])),
    'G₁ = B₂ ⊕ B₁ = ' + binary[1] + ' ⊕ ' + binary[2] + ' = ' + (parseInt(binary[1]) ^ parseInt(binary[2])),
    'G₀ = B₁ ⊕ B₀ = ' + binary[2] + ' ⊕ ' + binary[3] + ' = ' + (parseInt(binary[2]) ^ parseInt(binary[3]))
  ];
}

function getGrayToBinarySteps(gray) {
  let b3 = gray[0];
  let b2 = (parseInt(b3) ^ parseInt(gray[1])).toString();
  let b1 = (parseInt(b2) ^ parseInt(gray[2])).toString();
  let b0 = (parseInt(b1) ^ parseInt(gray[3])).toString();

  return [
    'B₃ = G₃ = ' + b3,
    'B₂ = B₃ ⊕ G₂ = ' + b3 + ' ⊕ ' + gray[1] + ' = ' + b2,
    'B₁ = B₂ ⊕ G₁ = ' + b2 + ' ⊕ ' + gray[2] + ' = ' + b1,
    'B₀ = B₁ ⊕ G₀ = ' + b1 + ' ⊕ ' + gray[3] + ' = ' + b0
  ];
}

function getDecimalToBCDSteps(decimal) {
  if (decimal > 9) {
    let tens = Math.floor(decimal / 10);
    let ones = decimal % 10;
    return [
      'Split into digits: ' + tens + ' and ' + ones,
      'Tens digit ' + tens + ' → ' + tens.toString(2).padStart(4, '0'),
      'Ones digit ' + ones + ' → ' + ones.toString(2).padStart(4, '0'),
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
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
