// Parity Circuit Simulator MicroSim
// Simulate parity generation and checking circuits
// Bloom Level: Apply (L3) - Apply parity concepts
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 410;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

// Theme colors
const PURPLE = '#6A5BFF';
const PURPLE_DARK = '#5A3EED';
const PURPLE_LIGHT = '#7A5CFF';
const PURPLE_BG = '#F4F0FF';
const PURPLE_BORDER = '#C9B9FF';
const GOLD = '#D4A017';
const GREEN_ON = '#4CAF50';
const RED_OFF = '#E57373';
const BLUE_PARITY = '#5C6BC0';

let modeSelect;
let parityTypeSelect;
let dataBits = [1, 0, 1, 1];
let parityBit = 0;
let currentMode = 'generate';
let parityType = 'even';

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  modeSelect = createSelect();
  modeSelect.option('Generate Parity', 'generate');
  modeSelect.option('Check Parity', 'check');
  modeSelect.changed(() => { currentMode = modeSelect.value(); });

  parityTypeSelect = createSelect();
  parityTypeSelect.option('Even Parity', 'even');
  parityTypeSelect.option('Odd Parity', 'odd');
  parityTypeSelect.changed(() => { parityType = parityTypeSelect.value(); });

  positionUIElements();

  describe('Parity generation and checking circuit simulator', LABEL);
}

function positionUIElements() {
  let mainRect = document.querySelector('main').getBoundingClientRect();
  modeSelect.position(mainRect.left + 80, mainRect.top + drawHeight + 15);
  parityTypeSelect.position(mainRect.left + 240, mainRect.top + drawHeight + 15);
}

function draw() {
  updateCanvasSize();

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
  text('Parity Circuit Simulator', canvasWidth / 2, 10);
  textStyle(NORMAL);

  // Subtitle
  textSize(12);
  fill('#555');
  text(parityType.charAt(0).toUpperCase() + parityType.slice(1) + ' Parity ' +
       (currentMode === 'generate' ? 'Generator' : 'Checker'), canvasWidth / 2, 33);

  // Calculate parity
  let oneCount = dataBits.reduce((a, b) => a + b, 0);
  let expectedParity;
  if (parityType === 'even') {
    expectedParity = oneCount % 2;
  } else {
    expectedParity = (oneCount + 1) % 2;
  }

  // Draw bit toggles
  drawBitToggles(expectedParity);

  // Draw circuit
  if (currentMode === 'generate') {
    drawGeneratorCircuit(expectedParity);
  } else {
    drawCheckerCircuit(expectedParity);
  }

  // Draw explanation
  drawExplanation(oneCount, expectedParity);

  // Control labels
  fill(PURPLE);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(11);
  textStyle(BOLD);
  text('Mode:', 20, drawHeight + 27);
  text('Type:', 190, drawHeight + 27);
  textStyle(NORMAL);

  fill(PURPLE_LIGHT);
  textSize(10);
  textAlign(CENTER, CENTER);
  text('Click data bits to toggle', canvasWidth / 2, drawHeight + 55);
}

function drawBitToggles(expectedParity) {
  let y = 58;
  let bitW = 46;
  let spacing = 56;
  let startX = (canvasWidth - 4 * spacing - bitW) / 2;

  // Data bits header
  fill(PURPLE);
  noStroke();
  textAlign(CENTER, BOTTOM);
  textSize(12);
  textStyle(BOLD);
  text('Data Bits', startX + 2 * spacing, y - 4);
  textStyle(NORMAL);

  for (let i = 0; i < 4; i++) {
    let x = startX + i * spacing;

    // Subtle shadow on active bits
    if (dataBits[i]) {
      drawingContext.shadowColor = 'rgba(76, 175, 80, 0.3)';
      drawingContext.shadowBlur = 6;
    } else {
      drawingContext.shadowColor = 'rgba(229, 115, 115, 0.25)';
      drawingContext.shadowBlur = 4;
    }

    fill(dataBits[i] ? GREEN_ON : RED_OFF);
    stroke(PURPLE_BORDER);
    strokeWeight(1.5);
    rect(x, y, bitW, 36, 10);

    drawingContext.shadowBlur = 0;

    fill('white');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(16);
    textStyle(BOLD);
    text(dataBits[i], x + bitW / 2, y + 18);
    textStyle(NORMAL);

    // Bit label
    fill(PURPLE_LIGHT);
    textSize(10);
    text('D' + (3 - i), x + bitW / 2, y + 44);
  }

  // Parity bit (check mode only)
  if (currentMode === 'check') {
    let parityX = startX + 4.5 * spacing;

    fill(PURPLE);
    noStroke();
    textAlign(CENTER, BOTTOM);
    textSize(11);
    textStyle(BOLD);
    text('Parity', parityX + bitW / 2, y - 4);
    textStyle(NORMAL);

    drawingContext.shadowColor = 'rgba(92, 107, 192, 0.3)';
    drawingContext.shadowBlur = 5;

    fill(parityBit ? BLUE_PARITY : '#B3BAE8');
    stroke(PURPLE_BORDER);
    strokeWeight(1.5);
    rect(parityX, y, bitW, 36, 10);

    drawingContext.shadowBlur = 0;

    fill('white');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(16);
    textStyle(BOLD);
    text(parityBit, parityX + bitW / 2, y + 18);
    textStyle(NORMAL);

    fill(PURPLE_LIGHT);
    textSize(10);
    text('P', parityX + bitW / 2, y + 44);
  }
}

function drawGeneratorCircuit(expectedParity) {
  let circuitY = 128;
  let centerX = canvasWidth / 2;

  // XOR tree box — purple themed
  fill(PURPLE_BG);
  stroke(PURPLE_BORDER);
  strokeWeight(1.5);
  rect(centerX - 110, circuitY, 220, 85, 14);

  fill(PURPLE);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(12);
  textStyle(BOLD);
  text('XOR Tree (Parity Generator)', centerX, circuitY + 10);
  textStyle(NORMAL);

  // XOR formula
  fill(PURPLE_DARK);
  textSize(11);
  text('D3 \u2295 D2 \u2295 D1 \u2295 D0', centerX, circuitY + 32);

  if (parityType === 'odd') {
    fill('#888');
    textSize(9);
    text('(inverted for odd parity)', centerX, circuitY + 48);
  }

  // Result
  textSize(15);
  textStyle(BOLD);
  fill(PURPLE_DARK);
  text('P = ' + expectedParity, centerX, circuitY + 63);
  textStyle(NORMAL);

  // Output arrow — purple
  stroke(PURPLE_LIGHT);
  strokeWeight(2);
  line(centerX, circuitY + 85, centerX, circuitY + 103);
  fill(PURPLE_LIGHT);
  noStroke();
  triangle(centerX, circuitY + 112, centerX - 7, circuitY + 103, centerX + 7, circuitY + 103);

  // Transmitted word pill
  let wordY = circuitY + 120;
  fill(PURPLE_BG);
  stroke(PURPLE_BORDER);
  strokeWeight(1.5);
  rect(centerX - 90, wordY, 180, 36, 12);

  fill(PURPLE_DARK);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(13);
  textStyle(BOLD);
  let word = dataBits.join('') + expectedParity;
  text('Transmitted: ' + word, centerX, wordY + 18);
  textStyle(NORMAL);
}

function drawCheckerCircuit(expectedParity) {
  let circuitY = 128;
  let centerX = canvasWidth / 2;

  // XOR tree box — purple themed
  fill(PURPLE_BG);
  stroke(PURPLE_BORDER);
  strokeWeight(1.5);
  rect(centerX - 110, circuitY, 220, 85, 14);

  fill(PURPLE);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(12);
  textStyle(BOLD);
  text('XOR Tree (Parity Checker)', centerX, circuitY + 10);
  textStyle(NORMAL);

  // XOR formula
  fill(PURPLE_DARK);
  textSize(11);
  text('D3 \u2295 D2 \u2295 D1 \u2295 D0 \u2295 P', centerX, circuitY + 32);

  // Check result
  let totalOnes = dataBits.reduce((a, b) => a + b, 0) + parityBit;
  let errorDetected;
  if (parityType === 'even') {
    errorDetected = totalOnes % 2 !== 0;
  } else {
    errorDetected = totalOnes % 2 !== 1;
  }

  textSize(12);
  textStyle(BOLD);
  if (errorDetected) {
    fill('#D32F2F');
    text('Error = 1 (ERROR DETECTED)', centerX, circuitY + 56);
  } else {
    fill(GREEN_ON);
    text('Error = 0 (No error)', centerX, circuitY + 56);
  }
  textStyle(NORMAL);

  // Status indicator pill
  let statusY = circuitY + 100;

  drawingContext.shadowColor = errorDetected ? 'rgba(211, 47, 47, 0.25)' : 'rgba(76, 175, 80, 0.25)';
  drawingContext.shadowBlur = 8;

  if (errorDetected) {
    fill('#FFCDD2');
    stroke('#D32F2F');
  } else {
    fill('#C8E6C9');
    stroke(GREEN_ON);
  }
  strokeWeight(2);
  rect(centerX - 90, statusY, 180, 42, 14);

  drawingContext.shadowBlur = 0;

  fill(errorDetected ? '#D32F2F' : GREEN_ON);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(15);
  textStyle(BOLD);
  text(errorDetected ? '\u26A0 Parity Error!' : '\u2713 Parity OK', centerX, statusY + 21);
  textStyle(NORMAL);
}

function drawExplanation(oneCount, expectedParity) {
  let y = 298;

  fill(PURPLE_BG);
  stroke(PURPLE_BORDER);
  strokeWeight(1.5);
  rect(20, y, canvasWidth - 40, 102, 12);

  fill(PURPLE);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);
  textStyle(BOLD);
  text('How it Works:', 34, y + 10);
  textStyle(NORMAL);

  fill('#444');
  textSize(10);
  let lineY = y + 28;

  text('\u2022 Number of 1s in data: ' + oneCount, 38, lineY);
  lineY += 17;

  if (parityType === 'even') {
    text('\u2022 Even parity: Total 1s (including P) must be even', 38, lineY);
    lineY += 17;
    text('\u2022 P = ' + expectedParity + ' makes total ' + (oneCount + expectedParity) + ' (even)', 38, lineY);
  } else {
    text('\u2022 Odd parity: Total 1s (including P) must be odd', 38, lineY);
    lineY += 17;
    text('\u2022 P = ' + expectedParity + ' makes total ' + (oneCount + expectedParity) + ' (odd)', 38, lineY);
  }

  lineY += 19;
  text('\u2022 Parity detects single-bit errors but cannot correct them', 38, lineY);
}

function mousePressed() {
  let y = 58;
  let bitW = 46;
  let spacing = 56;
  let startX = (canvasWidth - 4 * spacing - bitW) / 2;

  // Check data bit clicks
  for (let i = 0; i < 4; i++) {
    let x = startX + i * spacing;
    if (mouseX >= x && mouseX <= x + bitW && mouseY >= y && mouseY <= y + 36) {
      dataBits[i] = 1 - dataBits[i];
      return;
    }
  }

  // Check parity bit click (only in check mode)
  if (currentMode === 'check') {
    let parityX = startX + 4.5 * spacing;
    if (mouseX >= parityX && mouseX <= parityX + bitW && mouseY >= y && mouseY <= y + 36) {
      parityBit = 1 - parityBit;
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
