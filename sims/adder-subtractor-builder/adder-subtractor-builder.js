// Adder-Subtractor Builder MicroSim
// Build and understand adder-subtractor circuits
// Bloom Level: Create (L6) - Design circuits
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 430;
let controlHeight = 90;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let modeSelect;
let currentMode = 'add';

// Store individual bits for A and B
let aBits = [0, 1, 0, 1]; // A = 5 (0101)
let bBits = [0, 0, 1, 1]; // B = 3 (0011)

let bitBoxSize = 28;
let bitSpacing = 6;

function bitsToValue(bits) {
  return bits[0] * 8 + bits[1] * 4 + bits[2] * 2 + bits[3];
}

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  modeSelect = createSelect();
  modeSelect.option('Addition (A + B)', 'add');
  modeSelect.option('Subtraction (A - B)', 'sub');
  modeSelect.changed(() => { currentMode = modeSelect.value(); });

  positionUIElements();

  describe('Adder-subtractor builder showing how one circuit does both operations', LABEL);
}

function positionUIElements() {
  let mainRect = document.querySelector('main').getBoundingClientRect();
  modeSelect.position(mainRect.left + 100, mainRect.top + drawHeight + 10);
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
  text('4-Bit Adder-Subtractor', canvasWidth / 2, 10);

  // Draw circuit
  drawCircuit();

  // Draw operation display
  drawOperation();

  // Control labels
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text('Mode:', 25, drawHeight + 22);

  // Draw clickable bit toggles
  drawBitToggles();
}

function drawBitToggles() {
  let valueA = bitsToValue(aBits);
  let valueB = bitsToValue(bBits);

  // A bits
  let aStartX = 30;
  let bitY = drawHeight + 45;

  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text('A=' + valueA, aStartX, bitY + bitBoxSize / 2);

  let aBoxStartX = aStartX + 40;
  for (let i = 0; i < 4; i++) {
    let x = aBoxStartX + i * (bitBoxSize + bitSpacing);
    fill(aBits[i] === 1 ? '#2196f3' : '#e0e0e0');
    stroke('#999');
    strokeWeight(1);
    rect(x, bitY, bitBoxSize, bitBoxSize, 4);

    fill(aBits[i] === 1 ? 'white' : '#333');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(14);
    text(aBits[i], x + bitBoxSize / 2, bitY + bitBoxSize / 2);
  }

  // B bits
  let bStartX = canvasWidth / 2 + 20;

  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text('B=' + valueB, bStartX, bitY + bitBoxSize / 2);

  let bBoxStartX = bStartX + 40;
  for (let i = 0; i < 4; i++) {
    let x = bBoxStartX + i * (bitBoxSize + bitSpacing);
    fill(bBits[i] === 1 ? '#ff9800' : '#e0e0e0');
    stroke('#999');
    strokeWeight(1);
    rect(x, bitY, bitBoxSize, bitBoxSize, 4);

    fill(bBits[i] === 1 ? 'white' : '#333');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(14);
    text(bBits[i], x + bitBoxSize / 2, bitY + bitBoxSize / 2);
  }

  // Bit position labels
  fill('#999');
  noStroke();
  textSize(9);
  textAlign(CENTER, TOP);
  for (let i = 0; i < 4; i++) {
    let ax = aBoxStartX + i * (bitBoxSize + bitSpacing) + bitBoxSize / 2;
    text(3 - i, ax, bitY + bitBoxSize + 2);
    let bx = bBoxStartX + i * (bitBoxSize + bitSpacing) + bitBoxSize / 2;
    text(3 - i, bx, bitY + bitBoxSize + 2);
  }
}

function mousePressed() {
  let bitY = drawHeight + 45;
  let aBoxStartX = 30 + 40;
  let bBoxStartX = canvasWidth / 2 + 20 + 40;

  // Check A bits
  for (let i = 0; i < 4; i++) {
    let x = aBoxStartX + i * (bitBoxSize + bitSpacing);
    if (mouseX >= x && mouseX <= x + bitBoxSize &&
        mouseY >= bitY && mouseY <= bitY + bitBoxSize) {
      aBits[i] = aBits[i] === 0 ? 1 : 0;
      return;
    }
  }

  // Check B bits
  for (let i = 0; i < 4; i++) {
    let x = bBoxStartX + i * (bitBoxSize + bitSpacing);
    if (mouseX >= x && mouseX <= x + bitBoxSize &&
        mouseY >= bitY && mouseY <= bitY + bitBoxSize) {
      bBits[i] = bBits[i] === 0 ? 1 : 0;
      return;
    }
  }
}

function drawCircuit() {
  let valueA = bitsToValue(aBits);
  let valueB = bitsToValue(bBits);
  let centerX = canvasWidth / 2;
  let startY = 45;

  // Title for mode
  fill(currentMode === 'add' ? '#4CAF50' : '#f44336');
  textSize(14);
  textAlign(CENTER, TOP);
  text(currentMode === 'add' ? 'Addition Mode (M=0)' : 'Subtraction Mode (M=1)', centerX, startY);

  // Draw the adder-subtractor block
  let blockY = 85;
  let blockW = 280;
  let blockH = 150;
  let blockX = (canvasWidth - blockW) / 2;

  // Main block
  fill('#e3f2fd');
  stroke('#2196f3');
  strokeWeight(2);
  rect(blockX, blockY, blockW, blockH, 8);

  // Label
  fill('#2196f3');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(12);
  text('4-Bit Adder-Subtractor', centerX, blockY + 8);

  // Input A (top left)
  let inputAX = blockX + 50;
  drawInputBus('A', valueA, inputAX, blockY - 45);
  stroke('#2196f3');
  strokeWeight(2);
  line(inputAX, blockY - 25, inputAX, blockY);

  // Input B with XOR gates (top right)
  let inputBX = blockX + blockW - 50;
  drawInputBus('B', valueB, inputBX, blockY - 45);

  // XOR gates for B input
  let xorY = blockY + 35;
  let bBinary = valueB.toString(2).padStart(4, '0');
  let xorResult = currentMode === 'sub' ?
    (15 - valueB).toString(2).padStart(4, '0') :
    bBinary;

  fill('white');
  stroke('#ff9800');
  strokeWeight(2);
  rect(inputBX - 30, xorY, 60, 25, 3);

  fill('#ff9800');
  noStroke();
  textSize(9);
  text('XOR with M', inputBX, xorY + 12);

  // Show B XOR M result
  fill('#333');
  textSize(10);
  text('B\u2295M = ' + xorResult, inputBX, xorY + 35);

  // Mode input (M)
  let modeX = blockX + blockW - 20;
  stroke(currentMode === 'sub' ? '#f44336' : '#4CAF50');
  strokeWeight(2);
  line(modeX + 30, blockY + 50, modeX, blockY + 50);

  fill(currentMode === 'sub' ? '#f44336' : '#4CAF50');
  noStroke();
  textSize(11);
  textAlign(LEFT, CENTER);
  text('M=' + (currentMode === 'sub' ? '1' : '0'), modeX + 35, blockY + 50);

  // 4-bit adder inside
  let adderY = blockY + 75;
  fill('#fff3e0');
  stroke('#ff9800');
  strokeWeight(2);
  rect(blockX + 30, adderY, blockW - 60, 40, 5);

  fill('#ff9800');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  text('4-Bit Ripple Carry Adder', centerX, adderY + 20);

  // Carry in (from M)
  stroke(currentMode === 'sub' ? '#f44336' : '#4CAF50');
  strokeWeight(2);
  line(blockX + 10, adderY + 20, blockX + 30, adderY + 20);

  fill(currentMode === 'sub' ? '#f44336' : '#4CAF50');
  noStroke();
  textSize(9);
  textAlign(RIGHT, CENTER);
  text('Cin=' + (currentMode === 'sub' ? '1' : '0'), blockX + 8, adderY + 20);

  // Output
  let outY = blockY + blockH + 10;
  stroke('#4CAF50');
  strokeWeight(2);
  line(centerX, blockY + blockH, centerX, outY + 20);

  // Result
  let result;
  if (currentMode === 'add') {
    result = valueA + valueB;
  } else {
    result = valueA - valueB;
  }

  let resultBinary = result >= 0 ?
    result.toString(2).padStart(4, '0') :
    ((16 + result) >>> 0).toString(2).padStart(4, '0');

  fill('#4CAF50');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(12);
  text('Sum/Difference', centerX, outY + 25);
  textSize(14);
  text(resultBinary + ' = ' + result, centerX, outY + 42);

  // Overflow/Carry indication
  if ((currentMode === 'add' && result > 15) || (currentMode === 'sub' && result < 0)) {
    fill('#f44336');
    textSize(11);
    text('(Overflow/Borrow)', centerX, outY + 60);
  }
}

function drawInputBus(label, value, x, y) {
  let binary = value.toString(2).padStart(4, '0');

  fill('#2196f3');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);
  text(label + ' = ' + value, x, y);

  textSize(10);
  fill('#666');
  text('(' + binary + ')', x, y + 14);
}

function drawOperation() {
  let y = 320;

  fill('#f5f5f5');
  stroke('#ccc');
  strokeWeight(1);
  rect(30, y, canvasWidth - 60, 100, 5);

  fill('#333');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(11);
  text('How Adder-Subtractor Works:', 40, y + 10);

  textSize(10);
  fill('#666');
  let lineY = y + 30;

  if (currentMode === 'add') {
    text('* Mode M = 0 (Addition)', 45, lineY);
    text('* B XOR 0 = B (B unchanged)', 45, lineY + 15);
    text('* Carry-in = 0', 45, lineY + 30);
    text('* Result = A + B', 45, lineY + 45);
  } else {
    text("* Mode M = 1 (Subtraction)", 45, lineY);
    text("* B XOR 1 = B' (B inverted = one's complement)", 45, lineY + 15);
    text("* Carry-in = 1 (completes two's complement)", 45, lineY + 30);
    text("* Result = A + B' + 1 = A - B", 45, lineY + 45);
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
