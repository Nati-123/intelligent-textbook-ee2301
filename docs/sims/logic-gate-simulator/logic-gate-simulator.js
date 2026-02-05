// Logic Gate Simulator MicroSim
// Interactive demonstration of basic and derived logic gates
// Bloom Level: Analyze (L4) - Compare, differentiate, examine
// MicroSim template version 2026.02

// Canvas dimensions
let containerWidth;
let canvasWidth = 400;
let drawHeight = 420;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

// Margins
let margin = 20;
let defaultTextSize = 14;

// UI Elements
let gateSelect;
let inputCountSelect;

// State
let inputs = [0, 0, 0];
let inputCount = 2;
let currentGate = 'AND';
let output = 0;

// Gate definitions
const gates = {
  'AND': { symbol: '&', description: 'Output is 1 only when ALL inputs are 1' },
  'OR': { symbol: '≥1', description: 'Output is 1 when ANY input is 1' },
  'NOT': { symbol: '1', description: 'Output is the inverse of input', maxInputs: 1 },
  'NAND': { symbol: '&', description: 'Output is 0 only when ALL inputs are 1', inverted: true },
  'NOR': { symbol: '≥1', description: 'Output is 0 when ANY input is 1', inverted: true },
  'XOR': { symbol: '=1', description: 'Output is 1 when inputs differ (odd number of 1s)' },
  'XNOR': { symbol: '=1', description: 'Output is 1 when inputs are the same', inverted: true }
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  textSize(defaultTextSize);

  // Create gate selector
  gateSelect = createSelect();
  for (let gate in gates) {
    gateSelect.option(gate);
  }
  gateSelect.selected('AND');
  gateSelect.changed(handleGateChange);

  // Create input count selector
  inputCountSelect = createSelect();
  inputCountSelect.option('2 inputs', 2);
  inputCountSelect.option('3 inputs', 3);
  inputCountSelect.selected('2 inputs');
  inputCountSelect.changed(handleInputCountChange);

  positionUIElements();

  calculateOutput();

  describe('Interactive logic gate simulator showing AND, OR, NOT, NAND, NOR, XOR, and XNOR gates', LABEL);
}

function positionUIElements() {
  let mainRect = document.querySelector('main').getBoundingClientRect();
  gateSelect.position(mainRect.left + 100, mainRect.top + drawHeight + 15);
  inputCountSelect.position(mainRect.left + 100, mainRect.top + drawHeight + 50);
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
  text('Logic Gate Simulator', canvasWidth / 2, 10);

  // Gate description
  textSize(12);
  fill('#666');
  text(gates[currentGate].description, canvasWidth / 2, 35);

  // Draw main content
  drawGateSymbol();
  drawInputToggles();
  drawOutput();
  drawTruthTable();

  // Control labels
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Gate:', 20, drawHeight + 25);
  text('Inputs:', 20, drawHeight + 60);
}

function drawGateSymbol() {
  let centerX = canvasWidth / 4;
  let centerY = 150;
  let gateWidth = 80;
  let gateHeight = 60;

  // Draw gate body
  stroke('black');
  strokeWeight(2);
  fill('white');

  let effectiveInputs = currentGate === 'NOT' ? 1 : inputCount;

  if (currentGate === 'AND' || currentGate === 'NAND') {
    // AND shape: flat left, curved right
    beginShape();
    vertex(centerX - gateWidth / 2, centerY - gateHeight / 2);
    vertex(centerX, centerY - gateHeight / 2);
    bezierVertex(
      centerX + gateWidth / 2, centerY - gateHeight / 2,
      centerX + gateWidth / 2, centerY + gateHeight / 2,
      centerX, centerY + gateHeight / 2
    );
    vertex(centerX - gateWidth / 2, centerY + gateHeight / 2);
    endShape(CLOSE);
  } else if (currentGate === 'OR' || currentGate === 'NOR') {
    // OR shape: curved left, pointed right
    beginShape();
    vertex(centerX - gateWidth / 2, centerY - gateHeight / 2);
    bezierVertex(
      centerX, centerY - gateHeight / 2,
      centerX + gateWidth / 3, centerY - gateHeight / 4,
      centerX + gateWidth / 2, centerY
    );
    bezierVertex(
      centerX + gateWidth / 3, centerY + gateHeight / 4,
      centerX, centerY + gateHeight / 2,
      centerX - gateWidth / 2, centerY + gateHeight / 2
    );
    bezierVertex(
      centerX - gateWidth / 4, centerY,
      centerX - gateWidth / 4, centerY,
      centerX - gateWidth / 2, centerY - gateHeight / 2
    );
    endShape(CLOSE);
  } else if (currentGate === 'XOR' || currentGate === 'XNOR') {
    // XOR shape: OR shape with extra curved line
    // Extra curve on left
    noFill();
    beginShape();
    vertex(centerX - gateWidth / 2 - 10, centerY - gateHeight / 2);
    bezierVertex(
      centerX - gateWidth / 4 - 10, centerY,
      centerX - gateWidth / 4 - 10, centerY,
      centerX - gateWidth / 2 - 10, centerY + gateHeight / 2
    );
    endShape();

    // OR shape
    fill('white');
    beginShape();
    vertex(centerX - gateWidth / 2, centerY - gateHeight / 2);
    bezierVertex(
      centerX, centerY - gateHeight / 2,
      centerX + gateWidth / 3, centerY - gateHeight / 4,
      centerX + gateWidth / 2, centerY
    );
    bezierVertex(
      centerX + gateWidth / 3, centerY + gateHeight / 4,
      centerX, centerY + gateHeight / 2,
      centerX - gateWidth / 2, centerY + gateHeight / 2
    );
    bezierVertex(
      centerX - gateWidth / 4, centerY,
      centerX - gateWidth / 4, centerY,
      centerX - gateWidth / 2, centerY - gateHeight / 2
    );
    endShape(CLOSE);
  } else if (currentGate === 'NOT') {
    // NOT shape: triangle
    triangle(
      centerX - gateWidth / 2, centerY - gateHeight / 2,
      centerX + gateWidth / 2 - 10, centerY,
      centerX - gateWidth / 2, centerY + gateHeight / 2
    );
  }

  // Draw inversion bubble if needed
  if (gates[currentGate].inverted || currentGate === 'NOT') {
    fill('white');
    stroke('black');
    strokeWeight(2);
    circle(centerX + gateWidth / 2 + 8, centerY, 12);
  }

  // Draw input wires
  stroke('black');
  strokeWeight(2);

  if (currentGate === 'NOT') {
    line(centerX - gateWidth / 2 - 40, centerY, centerX - gateWidth / 2, centerY);
  } else {
    let yOffsets = effectiveInputs === 2 ? [-20, 20] : [-25, 0, 25];
    for (let i = 0; i < effectiveInputs; i++) {
      let yOffset = yOffsets[i];
      line(centerX - gateWidth / 2 - 40, centerY + yOffset, centerX - gateWidth / 2, centerY + yOffset);
    }
  }

  // Draw output wire
  let outputX = gates[currentGate].inverted || currentGate === 'NOT' ? centerX + gateWidth / 2 + 14 : centerX + gateWidth / 2;
  line(outputX, centerY, outputX + 40, centerY);

  // Draw input values
  fill(inputs[0] ? '#4CAF50' : '#666');
  noStroke();
  textAlign(RIGHT, CENTER);
  textSize(16);

  if (currentGate === 'NOT') {
    text(inputs[0], centerX - gateWidth / 2 - 45, centerY);
  } else {
    let yOffsets = effectiveInputs === 2 ? [-20, 20] : [-25, 0, 25];
    for (let i = 0; i < effectiveInputs; i++) {
      fill(inputs[i] ? '#4CAF50' : '#666');
      text(inputs[i], centerX - gateWidth / 2 - 45, centerY + yOffsets[i]);
    }
  }

  // Draw output value
  fill(output ? '#4CAF50' : '#666');
  textAlign(LEFT, CENTER);
  text(output, outputX + 45, centerY);

  // Draw labels
  fill('#333');
  textSize(12);
  textAlign(CENTER, CENTER);
  if (currentGate === 'NOT') {
    text('A', centerX - gateWidth / 2 - 55, centerY - 15);
  } else {
    let labels = ['A', 'B', 'C'];
    let yOffsets = effectiveInputs === 2 ? [-20, 20] : [-25, 0, 25];
    for (let i = 0; i < effectiveInputs; i++) {
      text(labels[i], centerX - gateWidth / 2 - 55, centerY + yOffsets[i] - 15);
    }
  }
  text('Y', outputX + 55, centerY - 15);
}

function drawInputToggles() {
  let startX = canvasWidth / 4 - 60;
  let startY = 240;

  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(14);
  text('Click to toggle inputs:', canvasWidth / 4, startY - 5);

  let effectiveInputs = currentGate === 'NOT' ? 1 : inputCount;
  let labels = ['A', 'B', 'C'];
  let buttonWidth = 50;
  let totalWidth = effectiveInputs * buttonWidth + (effectiveInputs - 1) * 10;
  let startButtonX = canvasWidth / 4 - totalWidth / 2;

  for (let i = 0; i < effectiveInputs; i++) {
    let x = startButtonX + i * (buttonWidth + 10);
    let y = startY + 20;

    // Button
    if (inputs[i]) {
      fill('#4CAF50');
    } else {
      fill('#ccc');
    }
    stroke('#333');
    strokeWeight(1);
    rect(x, y, buttonWidth, 35, 5);

    // Label
    fill('white');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(14);
    text(labels[i] + ' = ' + inputs[i], x + buttonWidth / 2, y + 17);
  }
}

function drawOutput() {
  let x = canvasWidth / 4;
  let y = 320;

  // Output box
  if (output) {
    fill('#4CAF50');
  } else {
    fill('#f44336');
  }
  stroke('#333');
  strokeWeight(2);
  rect(x - 50, y, 100, 40, 5);

  // Output text
  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(16);
  text('Output Y = ' + output, x, y + 20);
}

function drawTruthTable() {
  let startX = canvasWidth / 2 + 30;
  let startY = 70;
  let colWidth = 40;
  let rowHeight = 22;

  let effectiveInputs = currentGate === 'NOT' ? 1 : inputCount;
  let rows = Math.pow(2, effectiveInputs);

  // Table header
  fill('#2196f3');
  noStroke();
  rect(startX, startY, colWidth * (effectiveInputs + 1), rowHeight);

  fill('white');
  textAlign(CENTER, CENTER);
  textSize(12);
  let labels = ['A', 'B', 'C'];
  for (let i = 0; i < effectiveInputs; i++) {
    text(labels[i], startX + colWidth * i + colWidth / 2, startY + rowHeight / 2);
  }
  text('Y', startX + colWidth * effectiveInputs + colWidth / 2, startY + rowHeight / 2);

  // Table rows
  for (let r = 0; r < rows; r++) {
    let y = startY + rowHeight * (r + 1);

    // Determine input values for this row
    let rowInputs = [];
    for (let i = 0; i < effectiveInputs; i++) {
      rowInputs.push((r >> (effectiveInputs - 1 - i)) & 1);
    }

    // Check if this is the current state
    let isCurrent = true;
    for (let i = 0; i < effectiveInputs; i++) {
      if (rowInputs[i] !== inputs[i]) {
        isCurrent = false;
        break;
      }
    }

    // Background
    if (isCurrent) {
      fill('#fff3e0');
    } else {
      fill(r % 2 === 0 ? '#f5f5f5' : 'white');
    }
    stroke('#ddd');
    strokeWeight(1);
    rect(startX, y, colWidth * (effectiveInputs + 1), rowHeight);

    // Calculate output for this row
    let rowOutput = calculateGateOutput(rowInputs);

    // Draw values
    fill(isCurrent ? '#e65100' : 'black');
    noStroke();
    textSize(11);
    for (let i = 0; i < effectiveInputs; i++) {
      text(rowInputs[i], startX + colWidth * i + colWidth / 2, y + rowHeight / 2);
    }
    text(rowOutput, startX + colWidth * effectiveInputs + colWidth / 2, y + rowHeight / 2);
  }

  // Boolean expression
  fill('black');
  textAlign(LEFT, TOP);
  textSize(12);
  let expression = getExpression();
  text('Expression: ' + expression, startX, startY + rowHeight * (rows + 1) + 10);
}

function calculateGateOutput(ins) {
  let effectiveInputs = currentGate === 'NOT' ? 1 : ins.length;

  switch (currentGate) {
    case 'AND':
      return ins.slice(0, effectiveInputs).every(x => x === 1) ? 1 : 0;
    case 'OR':
      return ins.slice(0, effectiveInputs).some(x => x === 1) ? 1 : 0;
    case 'NOT':
      return ins[0] === 0 ? 1 : 0;
    case 'NAND':
      return ins.slice(0, effectiveInputs).every(x => x === 1) ? 0 : 1;
    case 'NOR':
      return ins.slice(0, effectiveInputs).some(x => x === 1) ? 0 : 1;
    case 'XOR':
      return ins.slice(0, effectiveInputs).reduce((a, b) => a ^ b, 0);
    case 'XNOR':
      return ins.slice(0, effectiveInputs).reduce((a, b) => a ^ b, 0) === 0 ? 1 : 0;
    default:
      return 0;
  }
}

function getExpression() {
  let effectiveInputs = currentGate === 'NOT' ? 1 : inputCount;
  let labels = ['A', 'B', 'C'].slice(0, effectiveInputs);

  switch (currentGate) {
    case 'AND':
      return 'Y = ' + labels.join(' · ');
    case 'OR':
      return 'Y = ' + labels.join(' + ');
    case 'NOT':
      return "Y = A'";
    case 'NAND':
      return "Y = (" + labels.join(' · ') + ")'";
    case 'NOR':
      return "Y = (" + labels.join(' + ') + ")'";
    case 'XOR':
      return 'Y = ' + labels.join(' ⊕ ');
    case 'XNOR':
      return "Y = (" + labels.join(' ⊕ ') + ")'";
    default:
      return 'Y = ?';
  }
}

function calculateOutput() {
  output = calculateGateOutput(inputs);
}

function handleGateChange() {
  currentGate = gateSelect.value();
  if (gates[currentGate].maxInputs === 1) {
    inputCountSelect.attribute('disabled', '');
  } else {
    inputCountSelect.removeAttribute('disabled');
  }
  calculateOutput();
}

function handleInputCountChange() {
  inputCount = parseInt(inputCountSelect.value());
  calculateOutput();
}

function mousePressed() {
  let startX = canvasWidth / 4;
  let startY = 255;

  let effectiveInputs = currentGate === 'NOT' ? 1 : inputCount;
  let buttonWidth = 50;
  let totalWidth = effectiveInputs * buttonWidth + (effectiveInputs - 1) * 10;
  let startButtonX = canvasWidth / 4 - totalWidth / 2;

  for (let i = 0; i < effectiveInputs; i++) {
    let x = startButtonX + i * (buttonWidth + 10);
    let y = startY + 5;

    if (mouseX >= x && mouseX <= x + buttonWidth && mouseY >= y && mouseY <= y + 35) {
      inputs[i] = inputs[i] === 0 ? 1 : 0;
      calculateOutput();
      return;
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
