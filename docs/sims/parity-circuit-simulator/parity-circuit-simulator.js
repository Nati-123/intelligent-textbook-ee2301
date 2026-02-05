// Parity Circuit Simulator MicroSim
// Simulate parity generation and checking circuits
// Bloom Level: Apply (L3) - Apply parity concepts
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 420;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

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
  modeSelect.position(80, drawHeight + 15);
  modeSelect.option('Generate Parity', 'generate');
  modeSelect.option('Check Parity', 'check');
  modeSelect.changed(() => { currentMode = modeSelect.value(); });

  parityTypeSelect = createSelect();
  parityTypeSelect.position(230, drawHeight + 15);
  parityTypeSelect.option('Even Parity', 'even');
  parityTypeSelect.option('Odd Parity', 'odd');
  parityTypeSelect.changed(() => { parityType = parityTypeSelect.value(); });

  describe('Parity generation and checking circuit simulator', LABEL);
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
  text('Parity Circuit Simulator', canvasWidth / 2, 10);

  // Subtitle
  textSize(12);
  fill('#666');
  text(parityType.charAt(0).toUpperCase() + parityType.slice(1) + ' Parity ' +
       (currentMode === 'generate' ? 'Generator' : 'Checker'), canvasWidth / 2, 35);

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
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(11);
  text('Mode:', 20, drawHeight + 27);
  text('Type:', 180, drawHeight + 27);

  fill('#666');
  textSize(10);
  textAlign(CENTER, CENTER);
  text('Click data bits to toggle', canvasWidth / 2, drawHeight + 55);
}

function drawBitToggles(expectedParity) {
  let y = 70;
  let bitW = 45;
  let spacing = 55;
  let startX = (canvasWidth - 4 * spacing - bitW) / 2;

  // Data bits
  fill('#333');
  noStroke();
  textAlign(CENTER, BOTTOM);
  textSize(12);
  text('Data Bits', startX + 2 * spacing, y - 5);

  for (let i = 0; i < 4; i++) {
    let x = startX + i * spacing;

    fill(dataBits[i] ? '#4CAF50' : '#f44336');
    stroke('#333');
    strokeWeight(2);
    rect(x, y, bitW, 35, 5);

    fill('white');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(16);
    text(dataBits[i], x + bitW / 2, y + 17);

    fill('#666');
    textSize(9);
    text('D' + (3 - i), x + bitW / 2, y + 42);
  }

  // Parity bit
  if (currentMode === 'check') {
    let parityX = startX + 4.5 * spacing;

    fill('#333');
    noStroke();
    textAlign(CENTER, BOTTOM);
    textSize(11);
    text('Parity', parityX + bitW / 2, y - 5);

    fill(parityBit ? '#2196f3' : '#90caf9');
    stroke('#1976d2');
    strokeWeight(2);
    rect(parityX, y, bitW, 35, 5);

    fill('white');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(16);
    text(parityBit, parityX + bitW / 2, y + 17);

    fill('#666');
    textSize(9);
    text('P', parityX + bitW / 2, y + 42);
  }
}

function drawGeneratorCircuit(expectedParity) {
  let circuitY = 140;
  let centerX = canvasWidth / 2;

  // XOR tree
  fill('#fff3e0');
  stroke('#ff9800');
  strokeWeight(2);
  rect(centerX - 100, circuitY, 200, 80, 8);

  fill('#ff9800');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(11);
  text('XOR Tree (Parity Generator)', centerX, circuitY + 8);

  // XOR gates inside
  textSize(9);
  text('D3 ⊕ D2 ⊕ D1 ⊕ D0', centerX, circuitY + 30);

  if (parityType === 'odd') {
    text('(inverted for odd parity)', centerX, circuitY + 45);
  }

  // Result
  textSize(14);
  fill(expectedParity ? '#4CAF50' : '#f44336');
  text('P = ' + expectedParity, centerX, circuitY + 58);

  // Output arrow
  stroke('#4CAF50');
  strokeWeight(2);
  line(centerX, circuitY + 80, centerX, circuitY + 100);
  fill('#4CAF50');
  noStroke();
  triangle(centerX, circuitY + 110, centerX - 8, circuitY + 100, centerX + 8, circuitY + 100);

  // Transmitted word
  let wordY = circuitY + 125;
  fill('#e8f5e9');
  stroke('#4CAF50');
  strokeWeight(2);
  rect(centerX - 80, wordY, 160, 35, 5);

  fill('#4CAF50');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  let word = dataBits.join('') + expectedParity;
  text('Transmitted: ' + word, centerX, wordY + 17);
}

function drawCheckerCircuit(expectedParity) {
  let circuitY = 140;
  let centerX = canvasWidth / 2;

  // XOR tree including parity bit
  fill('#e3f2fd');
  stroke('#2196f3');
  strokeWeight(2);
  rect(centerX - 100, circuitY, 200, 80, 8);

  fill('#2196f3');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(11);
  text('XOR Tree (Parity Checker)', centerX, circuitY + 8);

  // XOR gates inside
  textSize(9);
  text('D3 ⊕ D2 ⊕ D1 ⊕ D0 ⊕ P', centerX, circuitY + 30);

  // Check result
  let totalOnes = dataBits.reduce((a, b) => a + b, 0) + parityBit;
  let errorDetected;
  if (parityType === 'even') {
    errorDetected = totalOnes % 2 !== 0;
  } else {
    errorDetected = totalOnes % 2 !== 1;
  }

  textSize(12);
  if (errorDetected) {
    fill('#f44336');
    text('Error = 1 (ERROR DETECTED!)', centerX, circuitY + 55);
  } else {
    fill('#4CAF50');
    text('Error = 0 (No error)', centerX, circuitY + 55);

  }

  // Status indicator
  let statusY = circuitY + 100;
  if (errorDetected) {
    fill('#ffcdd2');
    stroke('#f44336');
  } else {
    fill('#c8e6c9');
    stroke('#4CAF50');
  }
  strokeWeight(2);
  rect(centerX - 80, statusY, 160, 40, 5);

  fill(errorDetected ? '#f44336' : '#4CAF50');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);
  text(errorDetected ? '⚠ Parity Error!' : '✓ Parity OK', centerX, statusY + 20);
}

function drawExplanation(oneCount, expectedParity) {
  let y = 310;

  fill('#f5f5f5');
  stroke('#ccc');
  strokeWeight(1);
  rect(25, y, canvasWidth - 50, 100, 5);

  fill('#333');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(11);
  text('How it Works:', 35, y + 10);

  fill('#666');
  textSize(10);
  let lineY = y + 28;

  text('• Number of 1s in data: ' + oneCount, 40, lineY);
  lineY += 15;

  if (parityType === 'even') {
    text('• Even parity: Total 1s (including P) must be even', 40, lineY);
    lineY += 15;
    text('• P = ' + expectedParity + ' makes total ' + (oneCount + expectedParity) + ' (even)', 40, lineY);
  } else {
    text('• Odd parity: Total 1s (including P) must be odd', 40, lineY);
    lineY += 15;
    text('• P = ' + expectedParity + ' makes total ' + (oneCount + expectedParity) + ' (odd)', 40, lineY);
  }

  lineY += 18;
  text('• Parity detects single-bit errors but cannot correct them', 40, lineY);
}

function mousePressed() {
  let y = 70;
  let bitW = 45;
  let spacing = 55;
  let startX = (canvasWidth - 4 * spacing - bitW) / 2;

  // Check data bit clicks
  for (let i = 0; i < 4; i++) {
    let x = startX + i * spacing;
    if (mouseX >= x && mouseX <= x + bitW && mouseY >= y && mouseY <= y + 35) {
      dataBits[i] = 1 - dataBits[i];
      return;
    }
  }

  // Check parity bit click (only in check mode)
  if (currentMode === 'check') {
    let parityX = startX + 4.5 * spacing;
    if (mouseX >= parityX && mouseX <= parityX + bitW && mouseY >= y && mouseY <= y + 35) {
      parityBit = 1 - parityBit;
    }
  }
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
