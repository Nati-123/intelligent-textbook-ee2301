// Base Converter MicroSim
// Convert between binary, decimal, octal, and hexadecimal number systems
// Bloom Level: Apply (L3) - Calculate, convert, use
// MicroSim template version 2026.02

// Canvas dimensions
let containerWidth;
let canvasWidth = 400;
let drawHeight = 370;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

// Margins
let margin = 20;
let defaultTextSize = 14;

// UI Elements
let numberInput;
let baseSelect;
let signedCheckbox;

// Data
let inputNumber = '';
let inputBase = 10;
let isSigned = false;
let bitWidth = 8;
let results = {};
let conversionSteps = [];
let errorMessage = '';

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  textSize(defaultTextSize);

  // Create input field
  numberInput = createInput('42');
  numberInput.size(150);
  numberInput.attribute('placeholder', 'Enter number');
  numberInput.input(handleInput);

  // Create base selector
  baseSelect = createSelect();
  baseSelect.option('Binary (2)', 2);
  baseSelect.option('Octal (8)', 8);
  baseSelect.option('Decimal (10)', 10);
  baseSelect.option('Hexadecimal (16)', 16);
  baseSelect.selected('Decimal (10)');
  baseSelect.changed(handleBaseChange);

  // Create signed checkbox
  signedCheckbox = createCheckbox("Two's complement (8-bit)", false);
  signedCheckbox.changed(handleSignedChange);

  positionUIElements();

  // Initial conversion
  performConversion();

  describe('Interactive base converter for binary, decimal, octal, and hexadecimal numbers', LABEL);
}

function positionUIElements() {
  let mainRect = document.querySelector('main').getBoundingClientRect();
  numberInput.position(mainRect.left + 100, mainRect.top + drawHeight + 15);
  baseSelect.position(mainRect.left + 100, mainRect.top + drawHeight + 50);
  signedCheckbox.position(mainRect.left + 270, mainRect.top + drawHeight + 15);
}

function draw() {
  updateCanvasSize();

  // Draw background
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
  text('Base Converter', canvasWidth / 2, 10);

  // Draw conversion results
  if (errorMessage) {
    drawError();
  } else {
    drawResults();
    drawConversionSteps();
  }

  // Control labels
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Number:', 20, drawHeight + 25);
  text('Base:', 20, drawHeight + 60);
}

function drawResults() {
  let startY = 45;
  let boxHeight = 50;
  let boxWidth = canvasWidth - 2 * margin;
  let spacing = 5;

  let bases = [
    { name: 'Binary (2)', key: 'binary', prefix: '0b' },
    { name: 'Octal (8)', key: 'octal', prefix: '0o' },
    { name: 'Decimal (10)', key: 'decimal', prefix: '' },
    { name: 'Hexadecimal (16)', key: 'hex', prefix: '0x' }
  ];

  for (let i = 0; i < bases.length; i++) {
    let y = startY + i * (boxHeight + spacing);
    let isInput = (bases[i].key === getBaseKey(inputBase));

    // Box background
    if (isInput) {
      fill('#e3f2fd');
      stroke('#2196f3');
    } else {
      fill('white');
      stroke('#ccc');
    }
    strokeWeight(isInput ? 2 : 1);
    rect(margin, y, boxWidth, boxHeight, 5);

    // Label
    fill(isInput ? '#1565c0' : '#666');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(12);
    text(bases[i].name + (isInput ? ' (input)' : ''), margin + 10, y + 15);

    // Value
    fill('black');
    textSize(18);
    textFont('monospace');
    let displayValue = bases[i].prefix + (results[bases[i].key] || '—');
    text(displayValue, margin + 10, y + 35);
    textFont('sans-serif');
  }
}

function drawConversionSteps() {
  let startY = 265;

  fill(240);
  stroke('silver');
  strokeWeight(1);
  rect(margin, startY, canvasWidth - 2 * margin, 95, 5);

  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);
  text('Conversion Steps:', margin + 10, startY + 8);

  textSize(11);
  fill('#333');

  if (conversionSteps.length > 0) {
    let stepY = startY + 25;
    for (let i = 0; i < Math.min(conversionSteps.length, 4); i++) {
      text(conversionSteps[i], margin + 10, stepY);
      stepY += 16;
    }
  }
}

function drawError() {
  fill('#ffebee');
  stroke('#f44336');
  strokeWeight(2);
  rect(margin, 50, canvasWidth - 2 * margin, 60, 5);

  fill('#c62828');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);
  text(errorMessage, canvasWidth / 2, 80);
}

function handleInput() {
  inputNumber = numberInput.value().trim().toUpperCase();
  performConversion();
}

function handleBaseChange() {
  inputBase = parseInt(baseSelect.value());
  performConversion();
}

function handleSignedChange() {
  isSigned = signedCheckbox.checked();
  performConversion();
}

function performConversion() {
  errorMessage = '';
  conversionSteps = [];
  results = {};

  if (!inputNumber || inputNumber === '') {
    return;
  }

  // Validate input for selected base
  if (!isValidInput(inputNumber, inputBase)) {
    errorMessage = `Invalid ${getBaseName(inputBase)} number: "${inputNumber}"`;
    return;
  }

  // Convert input to decimal first
  let decimalValue;
  try {
    if (isSigned && inputBase === 2) {
      decimalValue = parseSignedBinary(inputNumber);
    } else {
      decimalValue = parseInt(inputNumber, inputBase);
    }
  } catch (e) {
    errorMessage = 'Conversion error';
    return;
  }

  if (isNaN(decimalValue)) {
    errorMessage = 'Invalid number';
    return;
  }

  // Check range for signed numbers
  if (isSigned) {
    if (decimalValue < -128 || decimalValue > 127) {
      errorMessage = `Value out of 8-bit signed range (-128 to 127)`;
      return;
    }
  }

  // Convert to all bases
  if (isSigned && decimalValue < 0) {
    // Two's complement for negative numbers
    let twosComp = (256 + decimalValue) >>> 0;
    results.binary = twosComp.toString(2).padStart(8, '0');
    results.octal = twosComp.toString(8);
    results.decimal = decimalValue.toString();
    results.hex = twosComp.toString(16).toUpperCase();
  } else {
    results.binary = decimalValue.toString(2);
    results.octal = decimalValue.toString(8);
    results.decimal = decimalValue.toString();
    results.hex = decimalValue.toString(16).toUpperCase();

    if (isSigned) {
      results.binary = results.binary.padStart(8, '0');
    }
  }

  // Generate conversion steps
  generateConversionSteps(decimalValue);
}

function generateConversionSteps(decimalValue) {
  let baseKey = getBaseKey(inputBase);

  if (inputBase !== 10) {
    // Show conversion to decimal
    conversionSteps.push(`Step 1: Convert ${getBaseName(inputBase)} to Decimal`);

    if (inputBase === 2) {
      let bits = inputNumber.split('');
      let expanded = bits.map((b, i) => `${b}×2^${bits.length - 1 - i}`).join(' + ');
      conversionSteps.push(`  ${inputNumber}₂ = ${expanded}`);
      conversionSteps.push(`  = ${decimalValue}₁₀`);
    } else if (inputBase === 16) {
      conversionSteps.push(`  ${inputNumber}₁₆ = ${decimalValue}₁₀`);
    } else if (inputBase === 8) {
      conversionSteps.push(`  ${inputNumber}₈ = ${decimalValue}₁₀`);
    }
  } else {
    conversionSteps.push(`Input: ${decimalValue}₁₀ (Decimal)`);
  }

  // Show binary conversion
  if (inputBase !== 2) {
    conversionSteps.push(`Binary: ${results.binary}₂`);
  }

  // Show hex grouping if relevant
  if (results.binary.length >= 4) {
    let padded = results.binary.padStart(Math.ceil(results.binary.length / 4) * 4, '0');
    let groups = padded.match(/.{4}/g).join(' ');
    conversionSteps.push(`Binary groups (hex): ${groups}`);
  }
}

function parseSignedBinary(binaryStr) {
  if (binaryStr.length === 8 && binaryStr[0] === '1') {
    // Negative number in two's complement
    return parseInt(binaryStr, 2) - 256;
  }
  return parseInt(binaryStr, 2);
}

function isValidInput(str, base) {
  if (!str || str.length === 0) return false;

  let validChars;
  switch (base) {
    case 2:
      validChars = /^[01]+$/;
      break;
    case 8:
      validChars = /^[0-7]+$/;
      break;
    case 10:
      validChars = /^-?[0-9]+$/;
      break;
    case 16:
      validChars = /^[0-9A-F]+$/i;
      break;
    default:
      return false;
  }
  return validChars.test(str);
}

function getBaseKey(base) {
  switch (base) {
    case 2: return 'binary';
    case 8: return 'octal';
    case 10: return 'decimal';
    case 16: return 'hex';
    default: return 'decimal';
  }
}

function getBaseName(base) {
  switch (base) {
    case 2: return 'Binary';
    case 8: return 'Octal';
    case 10: return 'Decimal';
    case 16: return 'Hexadecimal';
    default: return 'Unknown';
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  positionUIElements();
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
