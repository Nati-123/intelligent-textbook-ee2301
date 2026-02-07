// Base Converter MicroSim
// Convert between arbitrary number bases (2-36)
// Bloom Level: Apply (L3) - Calculate, convert, use
// MicroSim template version 2026.02

// Canvas dimensions
let containerWidth;
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 110;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

// Margins
let margin = 20;
let defaultTextSize = 14;

// UI Elements
let numberInput;
let baseSelect;
let outputBaseSelect;
let signedCheckbox;

// Data
let inputNumber = '';
let inputBase = 10;
let outputBase = 2;
let isSigned = false;
let bitWidth = 8;
let results = {};
let conversionSteps = [];
let errorMessage = '';

// Common base labels
const BASE_LABELS = {
  2: 'Binary',
  3: 'Ternary',
  5: 'Quinary',
  8: 'Octal',
  10: 'Decimal',
  12: 'Duodecimal',
  16: 'Hexadecimal',
  20: 'Vigesimal',
  36: 'Base 36'
};

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

  // Create input base selector (2-36)
  baseSelect = createSelect();
  for (let b = 2; b <= 36; b++) {
    let label = BASE_LABELS[b] ? `${b} - ${BASE_LABELS[b]}` : String(b);
    baseSelect.option(label, b);
  }
  baseSelect.selected('10');
  baseSelect.changed(handleBaseChange);

  // Create output base selector (2-36)
  outputBaseSelect = createSelect();
  for (let b = 2; b <= 36; b++) {
    let label = BASE_LABELS[b] ? `${b} - ${BASE_LABELS[b]}` : String(b);
    outputBaseSelect.option(label, b);
  }
  outputBaseSelect.selected('2');
  outputBaseSelect.changed(handleOutputBaseChange);

  // Create signed checkbox
  signedCheckbox = createCheckbox("Two's complement (8-bit)", false);
  signedCheckbox.changed(handleSignedChange);

  positionUIElements();

  // Set initial input value from the field
  inputNumber = numberInput.value().trim().toUpperCase();

  // Initial conversion
  performConversion();

  describe('Interactive base converter supporting arbitrary bases from 2 to 36', LABEL);
}

function positionUIElements() {
  let mainRect = document.querySelector('main').getBoundingClientRect();
  numberInput.position(mainRect.left + 110, mainRect.top + drawHeight + 12);
  signedCheckbox.position(mainRect.left + 270, mainRect.top + drawHeight + 12);
  baseSelect.position(mainRect.left + 110, mainRect.top + drawHeight + 45);
  outputBaseSelect.position(mainRect.left + 110, mainRect.top + drawHeight + 78);
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
  text('Number:', 20, drawHeight + 22);
  text('Input Base:', 20, drawHeight + 55);
  text('Output Base:', 20, drawHeight + 88);
}

function drawResults() {
  let startY = 45;
  let boxHeight = 42;
  let boxWidth = canvasWidth - 2 * margin;
  let spacing = 4;

  let bases = [
    { base: 2, name: 'Binary (2)', key: 'base2', prefix: '0b' },
    { base: 8, name: 'Octal (8)', key: 'base8', prefix: '0o' },
    { base: 10, name: 'Decimal (10)', key: 'base10', prefix: '' },
    { base: 16, name: 'Hexadecimal (16)', key: 'base16', prefix: '0x' },
    { base: outputBase, name: getBaseName(outputBase) + ' (' + outputBase + ')', key: 'custom', prefix: '' }
  ];

  for (let i = 0; i < bases.length; i++) {
    let y = startY + i * (boxHeight + spacing);
    let isInput = (bases[i].base === inputBase);
    let isCustom = (i === 4);

    // Box background
    if (isInput) {
      fill('#e3f2fd');
      stroke('#2196f3');
    } else if (isCustom) {
      fill('#fff8e1');
      stroke('#ffa000');
    } else {
      fill('white');
      stroke('#ccc');
    }
    strokeWeight(isInput ? 2 : (isCustom ? 2 : 1));
    rect(margin, y, boxWidth, boxHeight, 5);

    // Label
    fill(isInput ? '#1565c0' : (isCustom ? '#e65100' : '#666'));
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(11);
    let labelSuffix = isInput ? ' (input)' : (isCustom ? ' (output)' : '');
    text(bases[i].name + labelSuffix, margin + 10, y + 12);

    // Value
    fill('black');
    textSize(16);
    textFont('monospace');
    let displayValue = bases[i].prefix + (results[bases[i].key] || '—');
    text(displayValue, margin + 10, y + 30);
    textFont('sans-serif');
  }
}

function drawConversionSteps() {
  let startY = 280;

  fill(240);
  stroke('silver');
  strokeWeight(1);
  rect(margin, startY, canvasWidth - 2 * margin, 80, 5);

  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);
  text('Conversion Steps:', margin + 10, startY + 8);

  textSize(11);
  fill('#333');

  if (conversionSteps.length > 0) {
    let stepY = startY + 25;
    for (let i = 0; i < Math.min(conversionSteps.length, 3); i++) {
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

function handleOutputBaseChange() {
  outputBase = parseInt(outputBaseSelect.value());
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
    errorMessage = `Invalid base-${inputBase} number: "${inputNumber}"`;
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
    results.base2 = twosComp.toString(2).padStart(8, '0');
    results.base8 = twosComp.toString(8);
    results.base10 = decimalValue.toString();
    results.base16 = twosComp.toString(16).toUpperCase();
    results.custom = twosComp.toString(outputBase).toUpperCase();
  } else {
    results.base2 = decimalValue.toString(2);
    results.base8 = decimalValue.toString(8);
    results.base10 = decimalValue.toString();
    results.base16 = decimalValue.toString(16).toUpperCase();
    results.custom = decimalValue.toString(outputBase).toUpperCase();

    if (isSigned) {
      results.base2 = results.base2.padStart(8, '0');
    }
  }

  // Generate conversion steps
  generateConversionSteps(decimalValue);
}

function generateConversionSteps(decimalValue) {
  if (inputBase !== 10) {
    conversionSteps.push(`Step 1: ${inputNumber} (base ${inputBase}) → ${decimalValue} (base 10)`);
  } else {
    conversionSteps.push(`Input: ${decimalValue} (base 10)`);
  }

  if (outputBase !== 10 && outputBase !== inputBase) {
    conversionSteps.push(`Step 2: ${decimalValue} (base 10) → ${results.custom} (base ${outputBase})`);
  }

  // Show binary grouping for hex if relevant
  if (results.base2 && results.base2.length >= 4) {
    let padded = results.base2.padStart(Math.ceil(results.base2.length / 4) * 4, '0');
    let groups = padded.match(/.{4}/g).join(' ');
    conversionSteps.push(`Binary groups: ${groups}`);
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

  // Allow leading minus for base 10 (signed mode)
  let digits = str;
  if (base === 10 && str[0] === '-') {
    digits = str.substring(1);
    if (digits.length === 0) return false;
  }

  // Valid characters for base N: 0-9 for positions up to 9, A-Z for 10-35
  for (let i = 0; i < digits.length; i++) {
    let ch = digits[i];
    let value;
    if (ch >= '0' && ch <= '9') {
      value = ch.charCodeAt(0) - '0'.charCodeAt(0);
    } else if (ch >= 'A' && ch <= 'Z') {
      value = ch.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
    } else {
      return false;
    }
    if (value >= base) return false;
  }
  return true;
}

function getBaseName(base) {
  return BASE_LABELS[base] || ('Base ' + base);
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
