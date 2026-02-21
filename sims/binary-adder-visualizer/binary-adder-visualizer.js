// Binary Adder Visualizer MicroSim
// Step through half adder and full adder operations with visual circuit
// Bloom Level: Understand (L2) - Explain, demonstrate, trace
// MicroSim template version 2026.02

// Canvas dimensions
let containerWidth;
let canvasWidth = 400;
let drawHeight = 430;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

// Margins
let margin = 16;
let defaultTextSize = 14;

// Theme colors
const PURPLE = '#5A3EED';
const PURPLE_LIGHT = '#7A5CFF';
const PURPLE_BG = '#F4F0FF';
const PURPLE_BORDER = '#C9B9FF';
const GOLD = '#D4A017';
const GREEN_ON = '#4CAF50';
const GRAY_OFF = '#bbb';

// UI Elements
let modeSelect;
let bit1Inputs = [];
let bit2Inputs = [];
let stepButton;
let resetButton;

// State
let mode = 'half'; // 'half', 'full', 'ripple'
let inputA = [0, 0, 0, 0]; // 4-bit
let inputB = [0, 0, 0, 0]; // 4-bit
let carryIn = 0;
let currentStep = -1;
let maxStep = 0;
let carries = [0, 0, 0, 0, 0];
let sums = [0, 0, 0, 0];
let animating = false;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  textSize(defaultTextSize);

  // Create mode selector
  modeSelect = createSelect();
  modeSelect.option('Half Adder', 'half');
  modeSelect.option('Full Adder', 'full');
  modeSelect.option('4-bit Ripple Adder', 'ripple');
  modeSelect.selected('Half Adder');
  modeSelect.changed(handleModeChange);

  // Create step button
  stepButton = createButton('Step');
  stepButton.mousePressed(handleStep);

  // Create reset button
  resetButton = createButton('Reset');
  resetButton.mousePressed(handleReset);

  positionUIElements();

  updateMaxStep();
  describe('Interactive binary adder visualizer showing half adder, full adder, and ripple carry adder operations', LABEL);
}

function positionUIElements() {
  let mainRect = document.querySelector('main').getBoundingClientRect();
  modeSelect.position(mainRect.left + 100, mainRect.top + drawHeight + 15);
  stepButton.position(mainRect.left + 260, mainRect.top + drawHeight + 15);
  resetButton.position(mainRect.left + 320, mainRect.top + drawHeight + 15);
}

function draw() {
  updateCanvasSize();

  // Draw background
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
  let title = mode === 'half' ? 'Half Adder' : (mode === 'full' ? 'Full Adder' : '4-bit Ripple Carry Adder');
  text(title, canvasWidth / 2, 12);
  textStyle(NORMAL);

  // Draw based on mode
  if (mode === 'half') {
    drawHalfAdder();
  } else if (mode === 'full') {
    drawFullAdder();
  } else {
    drawRippleAdder();
  }

  // Control labels
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Mode:', 20, drawHeight + 25);
  text('Click bits to toggle', 20, drawHeight + 55);
}

function drawHalfAdder() {
  let centerX = canvasWidth / 2;
  let centerY = 160;

  // Draw circuit diagram
  drawHalfAdderCircuit(centerX, centerY, inputA[0], inputB[0]);

  // Draw input section
  drawInputSection(canvasWidth / 2 - 100, 55, 'A', inputA[0], 0, 0);
  drawInputSection(canvasWidth / 2 + 20, 55, 'B', inputB[0], 0, 1);

  // Draw output section
  let sum = inputA[0] ^ inputB[0];
  let carry = inputA[0] & inputB[0];

  drawOutputSection(centerX, 290, sum, carry);

  // Draw explanation
  drawHalfAdderExplanation(centerX, 350, inputA[0], inputB[0], sum, carry);
}

function drawHalfAdderCircuit(x, y, a, b) {
  // XOR gate for sum
  stroke(PURPLE);
  strokeWeight(2);
  fill('white');

  // XOR gate body
  let xorX = x - 50;
  let xorY = y - 30;
  beginShape();
  vertex(xorX - 30, xorY - 20);
  bezierVertex(xorX, xorY - 20, xorX + 20, xorY - 10, xorX + 30, xorY);
  bezierVertex(xorX + 20, xorY + 10, xorX, xorY + 20, xorX - 30, xorY + 20);
  bezierVertex(xorX - 20, xorY, xorX - 20, xorY, xorX - 30, xorY - 20);
  endShape(CLOSE);

  // Extra XOR curve
  noFill();
  beginShape();
  vertex(xorX - 40, xorY - 20);
  bezierVertex(xorX - 30, xorY, xorX - 30, xorY, xorX - 40, xorY + 20);
  endShape();

  // AND gate for carry
  let andX = x + 50;
  let andY = y + 30;
  fill('white');
  stroke(PURPLE);
  beginShape();
  vertex(andX - 30, andY - 20);
  vertex(andX, andY - 20);
  bezierVertex(andX + 30, andY - 20, andX + 30, andY + 20, andX, andY + 20);
  vertex(andX - 30, andY + 20);
  endShape(CLOSE);

  // Input wires
  stroke(a ? PURPLE : '#ccc');
  strokeWeight(3);
  line(x - 120, y - 40, xorX - 40, xorY - 10);
  line(x - 120, y - 40, andX - 30, andY - 10);

  stroke(b ? PURPLE : '#ccc');
  line(x - 120, y + 40, xorX - 40, xorY + 10);
  line(x - 120, y + 40, andX - 30, andY + 10);

  // Output wires
  let sum = a ^ b;
  let carry = a & b;

  stroke(sum ? GREEN_ON : '#ccc');
  line(xorX + 30, xorY, x + 120, xorY);

  stroke(carry ? GOLD : '#ccc');
  line(andX + 30, andY, x + 120, andY);

  // Labels
  fill(PURPLE);
  noStroke();
  textSize(12);
  textAlign(LEFT, CENTER);
  text('A = ' + a, x - 140, y - 40);
  text('B = ' + b, x - 140, y + 40);

  textAlign(CENTER, CENTER);
  fill(PURPLE);
  text('XOR', xorX, xorY);
  text('AND', andX, andY);

  textAlign(LEFT, CENTER);
  fill(sum ? GREEN_ON : '#666');
  text('Sum = ' + sum, x + 125, xorY);
  fill(carry ? GOLD : '#666');
  text('Carry = ' + carry, x + 125, andY);
}

function drawFullAdder() {
  let centerX = canvasWidth / 2;
  let centerY = 170;

  // Draw input section
  drawInputSection(centerX - 150, 48, 'A', inputA[0], 0, 0);
  drawInputSection(centerX - 50, 48, 'B', inputB[0], 0, 1);
  drawInputSection(centerX + 50, 48, 'Cin', carryIn, -1, -1);

  // Calculate outputs
  let sum = inputA[0] ^ inputB[0] ^ carryIn;
  let carry = (inputA[0] & inputB[0]) | (carryIn & (inputA[0] ^ inputB[0]));

  // Draw simplified circuit representation
  drawFullAdderBlock(centerX, centerY, inputA[0], inputB[0], carryIn, sum, carry);

  // Draw output section
  drawOutputSection(centerX, 290, sum, carry);

  // Draw explanation
  drawFullAdderExplanation(centerX, 355, inputA[0], inputB[0], carryIn, sum, carry);
}

function drawFullAdderBlock(x, y, a, b, cin, sum, cout) {
  // Full adder box — enlarged with purple theme
  fill('white');
  stroke(PURPLE);
  strokeWeight(2.5);
  rect(x - 70, y - 45, 140, 90, 12);

  // Label
  fill(PURPLE);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(17);
  textStyle(BOLD);
  text('Full Adder', x, y);
  textStyle(NORMAL);

  // Input wires
  stroke(a ? PURPLE : '#ccc');
  strokeWeight(3);
  line(x - 40, y - 65, x - 40, y - 45);

  stroke(b ? PURPLE : '#ccc');
  line(x, y - 65, x, y - 45);

  stroke(cin ? PURPLE : '#ccc');
  line(x + 40, y - 65, x + 40, y - 45);

  // Output wires
  stroke(sum ? GREEN_ON : '#ccc');
  line(x - 25, y + 45, x - 25, y + 75);

  stroke(cout ? GOLD : '#ccc');
  line(x + 25, y + 45, x + 25, y + 75);

  // Labels
  fill(PURPLE);
  noStroke();
  textSize(12);
  textAlign(CENTER, BOTTOM);
  text('A=' + a, x - 40, y - 67);
  text('B=' + b, x, y - 67);
  text('Cin=' + cin, x + 40, y - 67);

  textAlign(CENTER, TOP);
  fill(sum ? GREEN_ON : '#666');
  text('Sum=' + sum, x - 25, y + 77);
  fill(cout ? GOLD : '#666');
  text('Cout=' + cout, x + 25, y + 77);
}

function drawRippleAdder() {
  let startX = 60;
  let y = 200;
  let spacing = (canvasWidth - 120) / 4;

  // Title with values
  fill(PURPLE);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(14);

  let aVal = inputA[3] * 8 + inputA[2] * 4 + inputA[1] * 2 + inputA[0];
  let bVal = inputB[3] * 8 + inputB[2] * 4 + inputB[1] * 2 + inputB[0];
  let result = aVal + bVal;
  text(`A = ${inputA.slice().reverse().join('')} (${aVal})    B = ${inputB.slice().reverse().join('')} (${bVal})`, canvasWidth / 2, 40);

  // Draw input bit toggles
  for (let i = 0; i < 4; i++) {
    let x = startX + (3 - i) * spacing;

    // A input
    drawBitToggle(x - 15, 70, 'A' + i, inputA[i], i, 0);

    // B input
    drawBitToggle(x + 15, 70, 'B' + i, inputB[i], i, 1);
  }

  // Calculate all carries and sums
  carries[0] = 0;
  for (let i = 0; i < 4; i++) {
    sums[i] = inputA[i] ^ inputB[i] ^ carries[i];
    carries[i + 1] = (inputA[i] & inputB[i]) | (carries[i] & (inputA[i] ^ inputB[i]));
  }

  // Draw full adder blocks
  for (let i = 0; i < 4; i++) {
    let x = startX + (3 - i) * spacing;
    let isActive = currentStep === i;

    drawFullAdderSmall(x, y, inputA[i], inputB[i], carries[i], sums[i], carries[i + 1], isActive, i);
  }

  // Draw carry chain — gold arrows
  for (let i = 0; i < 3; i++) {
    let x1 = startX + (3 - i) * spacing + 35;
    let x2 = startX + (3 - i - 1) * spacing - 35;
    let highlighted = currentStep > i;

    stroke(highlighted ? GOLD : '#ddd');
    strokeWeight(highlighted ? 3 : 2);
    line(x1, y, x2, y);

    // Arrow
    if (highlighted) {
      fill(GOLD);
      noStroke();
      triangle(x2 + 8, y - 5, x2 + 8, y + 5, x2, y);
    }
  }

  // Draw result — purple themed card
  fill(PURPLE_BG);
  stroke(PURPLE_BORDER);
  strokeWeight(1.5);
  rect(margin, 320, canvasWidth - 2 * margin, 60, 8);

  fill(PURPLE);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);
  textStyle(BOLD);
  text('Result: ' + carries[4] + sums.slice().reverse().join('') + ' = ' + result, canvasWidth / 2, 340);
  textStyle(NORMAL);

  // Step indicator
  textSize(12);
  fill(PURPLE_LIGHT);
  if (currentStep >= 0 && currentStep < 4) {
    text('Step ' + (currentStep + 1) + ': Adding bit position ' + currentStep, canvasWidth / 2, 365);
  } else if (currentStep >= 4) {
    text('Complete! Final carry = ' + carries[4], canvasWidth / 2, 365);
  } else {
    fill('#888');
    text('Click "Step" to begin addition', canvasWidth / 2, 365);
  }

  // Explanation
  drawRippleExplanation(400);
}

function drawFullAdderSmall(x, y, a, b, cin, sum, cout, isActive, index) {
  // Box — purple themed states
  if (isActive) {
    fill('#F4F0FF');
    stroke(GOLD);
    strokeWeight(3);
  } else if (currentStep > index) {
    fill('#EDE7F6');
    stroke(PURPLE_LIGHT);
    strokeWeight(2);
  } else {
    fill('white');
    stroke(PURPLE_BORDER);
    strokeWeight(1);
  }
  rect(x - 30, y - 35, 60, 70, 8);

  // Label
  fill(PURPLE);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(10);
  textStyle(BOLD);
  text('FA', x, y - 20);
  textStyle(NORMAL);
  text('Bit ' + index, x, y - 8);

  // Values (shown after processed)
  if (currentStep >= index) {
    textSize(9);
    fill(PURPLE_LIGHT);
    text('S=' + sum, x, y + 8);
    text('C=' + cout, x, y + 20);
  }
}

function drawBitToggle(x, y, label, value, bitIndex, inputIndex) {
  // Button — purple when active
  if (value) {
    fill(PURPLE);
  } else {
    fill('#ddd');
  }
  stroke(PURPLE_BORDER);
  strokeWeight(1);
  rect(x - 15, y, 30, 25, 5);

  // Value
  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  text(value, x, y + 12);

  // Label
  fill(PURPLE_LIGHT);
  textSize(9);
  textAlign(CENTER, BOTTOM);
  text(label, x, y - 2);
}

function drawInputSection(x, y, label, value, bitIdx, inputIdx) {
  // Box — purple when active
  if (value) {
    fill(PURPLE);
  } else {
    fill('#ddd');
  }
  stroke(PURPLE_BORDER);
  strokeWeight(1.5);
  rect(x, y, 60, 40, 8);

  // Label and value
  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);
  text(label + ' = ' + value, x + 30, y + 20);

  // Click hint
  fill(PURPLE_LIGHT);
  textSize(10);
  text('(click)', x + 30, y + 50);
}

function drawOutputSection(x, y, sum, carry) {
  // Sum box — green when 1
  fill(sum ? GREEN_ON : '#e8e8e8');
  stroke(sum ? GREEN_ON : PURPLE_BORDER);
  strokeWeight(1.5);
  rect(x - 85, y, 75, 38, 8);

  fill(sum ? 'white' : '#666');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);
  textStyle(BOLD);
  text('Sum = ' + sum, x - 47, y + 19);
  textStyle(NORMAL);

  // Carry box — gold when 1
  fill(carry ? GOLD : '#e8e8e8');
  stroke(carry ? GOLD : PURPLE_BORDER);
  strokeWeight(1.5);
  rect(x + 10, y, 75, 38, 8);

  fill(carry ? 'white' : '#666');
  noStroke();
  textSize(14);
  textStyle(BOLD);
  text('Carry = ' + carry, x + 47, y + 19);
  textStyle(NORMAL);
}

function drawHalfAdderExplanation(x, y, a, b, sum, carry) {
  fill(PURPLE_BG);
  stroke(PURPLE_BORDER);
  strokeWeight(1.5);
  rect(margin, y, canvasWidth - 2 * margin, 55, 8);

  fill(PURPLE);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(11);
  textStyle(BOLD);
  text('Equations:', margin + 10, y + 8);
  textStyle(NORMAL);
  fill('#444');
  text(`Sum = A XOR B = ${a} XOR ${b} = ${sum}`, margin + 10, y + 22);
  text(`Carry = A AND B = ${a} AND ${b} = ${carry}`, margin + 10, y + 36);
}

function drawFullAdderExplanation(x, y, a, b, cin, sum, cout) {
  fill(PURPLE_BG);
  stroke(PURPLE_BORDER);
  strokeWeight(1.5);
  rect(margin, y, canvasWidth - 2 * margin, 50, 8);

  fill('#444');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(10);
  text(`Sum = A XOR B XOR Cin = ${a} XOR ${b} XOR ${cin} = ${sum}`, margin + 10, y + 8);
  text(`Cout = (A AND B) OR (Cin AND (A XOR B)) = ${cout}`, margin + 10, y + 24);
  fill(PURPLE);
  textStyle(BOLD);
  text(`${a} + ${b} + ${cin} = ${a + b + cin} → Sum=${sum}, Carry=${cout}`, margin + 10, y + 38);
  textStyle(NORMAL);
}

function drawRippleExplanation(y) {
  fill(PURPLE_BG);
  stroke(PURPLE_BORDER);
  strokeWeight(1.5);
  rect(margin, y, canvasWidth - 2 * margin, 55, 8);

  noStroke();
  textAlign(LEFT, TOP);
  textSize(10);
  fill(PURPLE);
  textStyle(BOLD);
  text('Ripple Carry Adder:', margin + 10, y + 8);
  textStyle(NORMAL);
  fill('#444');
  text('• Each full adder adds one bit position (A[i] + B[i] + Carry[i])', margin + 10, y + 22);
  text('• Carry "ripples" from LSB (bit 0) to MSB (bit 3)', margin + 10, y + 36);
}

function handleModeChange() {
  mode = modeSelect.value();
  currentStep = -1;
  updateMaxStep();
}

function handleStep() {
  currentStep++;
  if (currentStep > maxStep) {
    currentStep = -1;
  }
}

function handleReset() {
  currentStep = -1;
  inputA = [0, 0, 0, 0];
  inputB = [0, 0, 0, 0];
  carryIn = 0;
}

function updateMaxStep() {
  if (mode === 'ripple') {
    maxStep = 4;
  } else {
    maxStep = 0;
  }
}

function mousePressed() {
  // Handle input toggles based on mode
  if (mode === 'half') {
    // A input (drawInputSection at x=canvasWidth/2-100, y=55, w=60, h=40)
    if (mouseX >= canvasWidth / 2 - 100 && mouseX <= canvasWidth / 2 - 40 &&
        mouseY >= 55 && mouseY <= 95) {
      inputA[0] = 1 - inputA[0];
    }
    // B input (drawInputSection at x=canvasWidth/2+20, y=55, w=60, h=40)
    if (mouseX >= canvasWidth / 2 + 20 && mouseX <= canvasWidth / 2 + 80 &&
        mouseY >= 55 && mouseY <= 95) {
      inputB[0] = 1 - inputB[0];
    }
  } else if (mode === 'full') {
    // A input (drawInputSection at x=centerX-150, y=48, w=60, h=40)
    if (mouseX >= canvasWidth / 2 - 150 && mouseX <= canvasWidth / 2 - 90 &&
        mouseY >= 48 && mouseY <= 88) {
      inputA[0] = 1 - inputA[0];
    }
    // B input (drawInputSection at x=centerX-50, y=48, w=60, h=40)
    if (mouseX >= canvasWidth / 2 - 50 && mouseX <= canvasWidth / 2 + 10 &&
        mouseY >= 48 && mouseY <= 88) {
      inputB[0] = 1 - inputB[0];
    }
    // Cin input (drawInputSection at x=centerX+50, y=48, w=60, h=40)
    if (mouseX >= canvasWidth / 2 + 50 && mouseX <= canvasWidth / 2 + 110 &&
        mouseY >= 48 && mouseY <= 88) {
      carryIn = 1 - carryIn;
    }
  } else if (mode === 'ripple') {
    let startX = 60;
    let spacing = (canvasWidth - 120) / 4;

    for (let i = 0; i < 4; i++) {
      let x = startX + (3 - i) * spacing;

      // A toggle
      if (mouseX >= x - 30 && mouseX <= x && mouseY >= 70 && mouseY <= 95) {
        inputA[i] = 1 - inputA[i];
        currentStep = -1;
      }
      // B toggle
      if (mouseX >= x && mouseX <= x + 30 && mouseY >= 70 && mouseY <= 95) {
        inputB[i] = 1 - inputB[i];
        currentStep = -1;
      }
    }
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
