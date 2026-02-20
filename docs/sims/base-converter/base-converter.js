// Base Converter MicroSim
// Convert between arbitrary number bases (2-36)
// Bloom Level: Apply (L3) - Calculate, convert, use
// MicroSim template version 2026.02

// Canvas dimensions — canvas is visual area only; controls are HTML below
let containerWidth;
let canvasWidth = 400;
let drawHeight = 385;
let canvasHeight = drawHeight;

// Margins
let margin = 15;
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

// Accent colors per base (matches project palette)
function getBaseAccentColor(base) {
  if (base === 2)  return '#2196F3'; // Blue
  if (base === 8)  return '#009688'; // Teal
  if (base === 10) return '#4CAF50'; // Green
  if (base === 16) return '#7B1FA2'; // Purple
  return '#FF9800';                  // Orange (custom)
}

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  textSize(defaultTextSize);

  // --- Control grid (HTML elements below canvas) ---
  let controlDiv = createDiv('');
  controlDiv.parent(mainElement);
  controlDiv.addClass('control-grid');

  // Row 1: Number label + [input, checkbox]
  let l1 = createSpan('Number:');
  l1.parent(controlDiv);

  let row1 = createDiv('');
  row1.parent(controlDiv);
  row1.addClass('ctrl-row');

  numberInput = createInput('42');
  numberInput.parent(row1);
  numberInput.attribute('placeholder', 'Enter number');
  numberInput.input(handleInput);

  signedCheckbox = createCheckbox("Two's comp (8-bit)", false);
  signedCheckbox.parent(row1);
  signedCheckbox.addClass('ctrl-checkbox');
  signedCheckbox.changed(handleSignedChange);

  // Row 2: Input Base label + select
  let l2 = createSpan('Input Base:');
  l2.parent(controlDiv);

  baseSelect = createSelect();
  baseSelect.parent(controlDiv);
  for (let b = 2; b <= 36; b++) {
    let label = BASE_LABELS[b] ? `${b} - ${BASE_LABELS[b]}` : String(b);
    baseSelect.option(label, b);
  }
  baseSelect.selected('10');
  baseSelect.changed(handleBaseChange);

  // Row 3: Output Base label + select
  let l3 = createSpan('Output Base:');
  l3.parent(controlDiv);

  outputBaseSelect = createSelect();
  outputBaseSelect.parent(controlDiv);
  for (let b = 2; b <= 36; b++) {
    let label = BASE_LABELS[b] ? `${b} - ${BASE_LABELS[b]}` : String(b);
    outputBaseSelect.option(label, b);
  }
  outputBaseSelect.selected('2');
  outputBaseSelect.changed(handleOutputBaseChange);

  // Set initial input value from the field
  inputNumber = numberInput.value().trim().toUpperCase();

  // Initial conversion
  performConversion();

  describe('Interactive base converter supporting arbitrary bases from 2 to 36', LABEL);
}

// ─── Draw (visual area only) ────────────────────────────────────────

function draw() {
  updateCanvasSize();
  background(245);

  // Title — matches ROM Architecture / Programmable Connections style
  fill(50);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(18);
  textStyle(BOLD);
  text('Base Converter', canvasWidth / 2, 20);
  let titleW = min(textWidth('Base Converter') + 20, canvasWidth - 40);
  textStyle(NORMAL);

  // Title underline
  stroke(220);
  strokeWeight(1);
  line(canvasWidth / 2 - titleW / 2, 35, canvasWidth / 2 + titleW / 2, 35);
  noStroke();

  // Draw results or error
  if (errorMessage) {
    drawError();
  } else {
    drawResults();
    drawConversionSteps();
  }
}

// ─── Result cards ───────────────────────────────────────────────────

function drawResults() {
  let startY = 50;
  let boxHeight = 42;
  let boxWidth = canvasWidth - 2 * margin;
  let spacing = 5;

  let bases = [
    { base: 2, name: 'Binary (2)', key: 'base2', prefix: '0B' },
    { base: 8, name: 'Octal (8)', key: 'base8', prefix: '0O' },
    { base: 10, name: 'Decimal (10)', key: 'base10', prefix: '' },
    { base: 16, name: 'Hexadecimal (16)', key: 'base16', prefix: '0X' },
    { base: outputBase, name: getBaseName(outputBase) + ' (' + outputBase + ')', key: 'custom', prefix: '' }
  ];

  for (let i = 0; i < bases.length; i++) {
    let y = startY + i * (boxHeight + spacing);
    let isInput = (bases[i].base === inputBase);
    let isCustom = (i === 4);
    let accent = getBaseAccentColor(bases[i].base);

    // Card shadow
    noStroke();
    fill(0, 0, 0, 10);
    rect(margin + 2, y + 2, boxWidth, boxHeight, 8);

    // Card background
    if (isInput) {
      fill(227, 242, 253);      // light blue
      stroke(33, 150, 243);
      strokeWeight(1.5);
    } else if (isCustom) {
      fill(255, 248, 225);      // light amber
      stroke(255, 160, 0);
      strokeWeight(1.5);
    } else {
      fill(255);
      stroke(215);
      strokeWeight(1);
    }
    rect(margin, y, boxWidth, boxHeight, 8);

    // Accent bar (inside card, offset from edge)
    noStroke();
    fill(accent);
    rect(margin + 7, y + 6, 3, boxHeight - 12, 2);

    // Label
    fill(isInput ? '#1565c0' : (isCustom ? '#e65100' : '#666'));
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(11);
    textStyle(NORMAL);
    let labelSuffix = isInput ? ' (input)' : (isCustom ? ' (output)' : '');
    text(bases[i].name + labelSuffix, margin + 17, y + 13);

    // Value
    fill(40);
    textSize(15);
    textStyle(BOLD);
    textFont('monospace');
    let displayValue = bases[i].prefix + (results[bases[i].key] || '—');
    text(displayValue, margin + 17, y + 30);
    textFont('sans-serif');
    textStyle(NORMAL);
  }
}

// ─── Conversion steps panel ─────────────────────────────────────────

function drawConversionSteps() {
  let startY = 292;
  let panelW = canvasWidth - 2 * margin;
  let panelH = 78;

  // Panel shadow
  noStroke();
  fill(0, 0, 0, 8);
  rect(margin + 2, startY + 2, panelW, panelH, 8);

  // Panel background — matches ROM / Programmable Connections info bar
  fill(247, 249, 252);
  stroke(210, 215, 225);
  strokeWeight(1);
  rect(margin, startY, panelW, panelH, 8);

  // Accent bar
  noStroke();
  fill('#2196F3');
  rect(margin + 8, startY + 8, 3, panelH - 16, 2);

  // Title
  fill(80);
  textAlign(LEFT, TOP);
  textSize(12);
  textStyle(BOLD);
  text('Conversion Steps', margin + 18, startY + 10);
  textStyle(NORMAL);

  // Steps
  textSize(11);
  fill('#444');
  if (conversionSteps.length > 0) {
    let stepY = startY + 28;
    for (let i = 0; i < Math.min(conversionSteps.length, 3); i++) {
      text(conversionSteps[i], margin + 18, stepY);
      stepY += 16;
    }
  } else {
    fill(160);
    text('Enter a number above to see steps', margin + 18, startY + 38);
  }
}

// ─── Error display ──────────────────────────────────────────────────

function drawError() {
  let errW = canvasWidth - 2 * margin;

  // Shadow
  noStroke();
  fill(0, 0, 0, 10);
  rect(margin + 2, 57, errW, 50, 8);

  // Background
  fill('#ffebee');
  stroke('#ef5350');
  strokeWeight(1.5);
  rect(margin, 55, errW, 50, 8);

  // Accent bar
  noStroke();
  fill('#f44336');
  rect(margin + 8, 61, 3, 38, 2);

  // Error text
  fill('#c62828');
  textAlign(LEFT, CENTER);
  textSize(13);
  text(errorMessage, margin + 18, 80);
}

// ═══ ALL CONVERSION LOGIC UNCHANGED BELOW ═══════════════════════════

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

// ─── Responsive resize ─────────────────────────────────────────────

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, canvasHeight);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
