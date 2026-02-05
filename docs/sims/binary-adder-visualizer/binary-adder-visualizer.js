// Binary Adder Visualizer MicroSim
// Step through half adder and full adder operations with visual circuit
// Bloom Level: Understand (L2) - Explain, demonstrate, trace
// MicroSim template version 2026.02

// Canvas dimensions
let containerWidth;
let canvasWidth = 400;
let drawHeight = 470;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

// Margins
let margin = 20;
let defaultTextSize = 14;

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
  modeSelect.position(100, drawHeight + 15);
  modeSelect.option('Half Adder', 'half');
  modeSelect.option('Full Adder', 'full');
  modeSelect.option('4-bit Ripple Adder', 'ripple');
  modeSelect.selected('Half Adder');
  modeSelect.changed(handleModeChange);

  // Create step button
  stepButton = createButton('Step');
  stepButton.position(260, drawHeight + 15);
  stepButton.mousePressed(handleStep);

  // Create reset button
  resetButton = createButton('Reset');
  resetButton.position(320, drawHeight + 15);
  resetButton.mousePressed(handleReset);

  updateMaxStep();
  describe('Interactive binary adder visualizer showing half adder, full adder, and ripple carry adder operations', LABEL);
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
  let title = mode === 'half' ? 'Half Adder' : (mode === 'full' ? 'Full Adder' : '4-bit Ripple Carry Adder');
  text(title, canvasWidth / 2, 10);

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
  let centerY = 180;

  // Draw circuit diagram
  drawHalfAdderCircuit(centerX, centerY, inputA[0], inputB[0]);

  // Draw input section
  drawInputSection(canvasWidth / 2 - 100, 70, 'A', inputA[0], 0, 0);
  drawInputSection(canvasWidth / 2 + 20, 70, 'B', inputB[0], 0, 1);

  // Draw output section
  let sum = inputA[0] ^ inputB[0];
  let carry = inputA[0] & inputB[0];

  drawOutputSection(centerX, 340, sum, carry);

  // Draw explanation
  drawHalfAdderExplanation(centerX, 400, inputA[0], inputB[0], sum, carry);
}

function drawHalfAdderCircuit(x, y, a, b) {
  // XOR gate for sum
  stroke('black');
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
  stroke('black');
  beginShape();
  vertex(andX - 30, andY - 20);
  vertex(andX, andY - 20);
  bezierVertex(andX + 30, andY - 20, andX + 30, andY + 20, andX, andY + 20);
  vertex(andX - 30, andY + 20);
  endShape(CLOSE);

  // Input wires
  stroke(a ? '#4CAF50' : '#999');
  strokeWeight(3);
  line(x - 120, y - 40, xorX - 40, xorY - 10);
  line(x - 120, y - 40, andX - 30, andY - 10);

  stroke(b ? '#4CAF50' : '#999');
  line(x - 120, y + 40, xorX - 40, xorY + 10);
  line(x - 120, y + 40, andX - 30, andY + 10);

  // Output wires
  let sum = a ^ b;
  let carry = a & b;

  stroke(sum ? '#4CAF50' : '#999');
  line(xorX + 30, xorY, x + 120, xorY);

  stroke(carry ? '#4CAF50' : '#999');
  line(andX + 30, andY, x + 120, andY);

  // Labels
  fill('black');
  noStroke();
  textSize(12);
  textAlign(LEFT, CENTER);
  text('A = ' + a, x - 140, y - 40);
  text('B = ' + b, x - 140, y + 40);

  textAlign(CENTER, CENTER);
  text('XOR', xorX, xorY);
  text('AND', andX, andY);

  textAlign(LEFT, CENTER);
  text('Sum = ' + sum, x + 125, xorY);
  text('Carry = ' + carry, x + 125, andY);
}

function drawFullAdder() {
  let centerX = canvasWidth / 2;
  let centerY = 200;

  // Draw input section
  drawInputSection(centerX - 150, 60, 'A', inputA[0], 0, 0);
  drawInputSection(centerX - 50, 60, 'B', inputB[0], 0, 1);
  drawInputSection(centerX + 50, 60, 'Cin', carryIn, -1, -1);

  // Calculate outputs
  let sum = inputA[0] ^ inputB[0] ^ carryIn;
  let carry = (inputA[0] & inputB[0]) | (carryIn & (inputA[0] ^ inputB[0]));

  // Draw simplified circuit representation
  drawFullAdderBlock(centerX, centerY, inputA[0], inputB[0], carryIn, sum, carry);

  // Draw output section
  drawOutputSection(centerX, 340, sum, carry);

  // Draw explanation
  drawFullAdderExplanation(centerX, 410, inputA[0], inputB[0], carryIn, sum, carry);
}

function drawFullAdderBlock(x, y, a, b, cin, sum, cout) {
  // Full adder box
  fill('white');
  stroke('black');
  strokeWeight(2);
  rect(x - 60, y - 40, 120, 80, 10);

  // Label
  fill('black');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(16);
  text('Full Adder', x, y);

  // Input wires
  stroke(a ? '#4CAF50' : '#999');
  strokeWeight(3);
  line(x - 40, y - 60, x - 40, y - 40);

  stroke(b ? '#4CAF50' : '#999');
  line(x, y - 60, x, y - 40);

  stroke(cin ? '#4CAF50' : '#999');
  line(x + 40, y - 60, x + 40, y - 40);

  // Output wires
  stroke(sum ? '#4CAF50' : '#999');
  line(x - 20, y + 40, x - 20, y + 70);

  stroke(cout ? '#4CAF50' : '#999');
  line(x + 20, y + 40, x + 20, y + 70);

  // Labels
  fill('black');
  noStroke();
  textSize(12);
  textAlign(CENTER, BOTTOM);
  text('A=' + a, x - 40, y - 62);
  text('B=' + b, x, y - 62);
  text('Cin=' + cin, x + 40, y - 62);

  textAlign(CENTER, TOP);
  text('Sum=' + sum, x - 20, y + 72);
  text('Cout=' + cout, x + 20, y + 72);
}

function drawRippleAdder() {
  let startX = 60;
  let y = 200;
  let spacing = (canvasWidth - 120) / 4;

  // Title with values
  fill('black');
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

  // Draw carry chain
  stroke('#ff9800');
  strokeWeight(2);
  for (let i = 0; i < 3; i++) {
    let x1 = startX + (3 - i) * spacing + 35;
    let x2 = startX + (3 - i - 1) * spacing - 35;
    let highlighted = currentStep > i;

    stroke(highlighted ? '#4CAF50' : '#ccc');
    strokeWeight(highlighted ? 3 : 2);
    line(x1, y, x2, y);

    // Arrow
    if (highlighted) {
      fill('#4CAF50');
      noStroke();
      triangle(x2 + 8, y - 5, x2 + 8, y + 5, x2, y);
    }
  }

  // Draw result
  fill(240);
  stroke('silver');
  strokeWeight(1);
  rect(margin, 320, canvasWidth - 2 * margin, 60, 5);

  fill('black');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);
  text('Result: ' + carries[4] + sums.slice().reverse().join('') + ' = ' + result, canvasWidth / 2, 340);

  // Step indicator
  textSize(12);
  fill('#666');
  if (currentStep >= 0 && currentStep < 4) {
    text('Step ' + (currentStep + 1) + ': Adding bit position ' + currentStep, canvasWidth / 2, 365);
  } else if (currentStep >= 4) {
    text('Complete! Final carry = ' + carries[4], canvasWidth / 2, 365);
  } else {
    text('Click "Step" to begin addition', canvasWidth / 2, 365);
  }

  // Explanation
  drawRippleExplanation(400);
}

function drawFullAdderSmall(x, y, a, b, cin, sum, cout, isActive, index) {
  // Box
  if (isActive) {
    fill('#fff3e0');
    stroke('#ff9800');
    strokeWeight(3);
  } else if (currentStep > index) {
    fill('#e8f5e9');
    stroke('#4CAF50');
    strokeWeight(2);
  } else {
    fill('white');
    stroke('#ccc');
    strokeWeight(1);
  }
  rect(x - 30, y - 35, 60, 70, 5);

  // Label
  fill('black');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(10);
  text('FA', x, y - 20);
  text('Bit ' + index, x, y - 8);

  // Values (shown after processed)
  if (currentStep >= index) {
    textSize(9);
    fill('#666');
    text('S=' + sum, x, y + 8);
    text('C=' + cout, x, y + 20);
  }
}

function drawBitToggle(x, y, label, value, bitIndex, inputIndex) {
  // Button
  if (value) {
    fill('#4CAF50');
  } else {
    fill('#ccc');
  }
  stroke('#333');
  strokeWeight(1);
  rect(x - 15, y, 30, 25, 3);

  // Value
  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  text(value, x, y + 12);

  // Label
  fill('#666');
  textSize(9);
  textAlign(CENTER, BOTTOM);
  text(label, x, y - 2);
}

function drawInputSection(x, y, label, value, bitIdx, inputIdx) {
  // Box
  if (value) {
    fill('#4CAF50');
  } else {
    fill('#ccc');
  }
  stroke('#333');
  strokeWeight(1);
  rect(x, y, 60, 40, 5);

  // Label and value
  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);
  text(label + ' = ' + value, x + 30, y + 20);

  // Click hint
  fill('#666');
  textSize(10);
  text('(click)', x + 30, y + 50);
}

function drawOutputSection(x, y, sum, carry) {
  // Sum box
  fill(sum ? '#4CAF50' : '#e0e0e0');
  stroke('#333');
  strokeWeight(1);
  rect(x - 80, y, 70, 35, 5);

  fill(sum ? 'white' : 'black');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);
  text('Sum = ' + sum, x - 45, y + 17);

  // Carry box
  fill(carry ? '#ff9800' : '#e0e0e0');
  stroke('#333');
  strokeWeight(1);
  rect(x + 10, y, 70, 35, 5);

  fill(carry ? 'white' : 'black');
  noStroke();
  textSize(14);
  text('Carry = ' + carry, x + 45, y + 17);
}

function drawHalfAdderExplanation(x, y, a, b, sum, carry) {
  fill(240);
  stroke('silver');
  strokeWeight(1);
  rect(margin, y, canvasWidth - 2 * margin, 55, 5);

  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(11);
  text('Equations:', margin + 10, y + 8);
  text(`Sum = A XOR B = ${a} XOR ${b} = ${sum}`, margin + 10, y + 22);
  text(`Carry = A AND B = ${a} AND ${b} = ${carry}`, margin + 10, y + 36);
}

function drawFullAdderExplanation(x, y, a, b, cin, sum, cout) {
  fill(240);
  stroke('silver');
  strokeWeight(1);
  rect(margin, y, canvasWidth - 2 * margin, 50, 5);

  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(10);
  text(`Sum = A XOR B XOR Cin = ${a} XOR ${b} XOR ${cin} = ${sum}`, margin + 10, y + 8);
  text(`Cout = (A AND B) OR (Cin AND (A XOR B)) = ${cout}`, margin + 10, y + 24);
  text(`${a} + ${b} + ${cin} = ${a + b + cin} → Sum=${sum}, Carry=${cout}`, margin + 10, y + 38);
}

function drawRippleExplanation(y) {
  fill(240);
  stroke('silver');
  strokeWeight(1);
  rect(margin, y, canvasWidth - 2 * margin, 55, 5);

  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(10);
  text('Ripple Carry Adder:', margin + 10, y + 8);
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
    // A input
    if (mouseX >= canvasWidth / 2 - 100 && mouseX <= canvasWidth / 2 - 40 &&
        mouseY >= 70 && mouseY <= 120) {
      inputA[0] = 1 - inputA[0];
    }
    // B input
    if (mouseX >= canvasWidth / 2 + 20 && mouseX <= canvasWidth / 2 + 80 &&
        mouseY >= 70 && mouseY <= 120) {
      inputB[0] = 1 - inputB[0];
    }
  } else if (mode === 'full') {
    // A input
    if (mouseX >= canvasWidth / 2 - 150 && mouseX <= canvasWidth / 2 - 90 &&
        mouseY >= 60 && mouseY <= 110) {
      inputA[0] = 1 - inputA[0];
    }
    // B input
    if (mouseX >= canvasWidth / 2 - 50 && mouseX <= canvasWidth / 2 + 10 &&
        mouseY >= 60 && mouseY <= 110) {
      inputB[0] = 1 - inputB[0];
    }
    // Cin input
    if (mouseX >= canvasWidth / 2 + 50 && mouseX <= canvasWidth / 2 + 110 &&
        mouseY >= 60 && mouseY <= 110) {
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
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
