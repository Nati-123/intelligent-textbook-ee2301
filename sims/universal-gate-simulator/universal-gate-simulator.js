// Universal Gate Simulator MicroSim
// Demonstrates NAND and NOR gate universality
// Bloom Level: Understand/Apply (L2-L3)

let containerWidth;
let canvasWidth = 400;
let drawHeight = 450;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;

let gateSelector, implSelector;
let inputA = false, inputB = false;
let btnA, btnB;

const colors = {
  high: '#4CAF50',
  low: '#F44336',
  wire: '#333',
  gate: '#2196F3',
  gateStroke: '#1565C0',
  bg: '#f5f5f5',
  text: '#212121'
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  // Create controls
  gateSelector = createSelect();
  gateSelector.option('NOT');
  gateSelector.option('AND');
  gateSelector.option('OR');
  gateSelector.option('NAND');
  gateSelector.option('NOR');
  gateSelector.option('XOR');
  gateSelector.selected('AND');

  implSelector = createSelect();
  implSelector.option('NAND-only');
  implSelector.option('NOR-only');
  implSelector.selected('NAND-only');

  btnA = createButton('A: 0');
  btnA.mousePressed(() => {
    inputA = !inputA;
    btnA.html('A: ' + (inputA ? '1' : '0'));
  });

  btnB = createButton('B: 0');
  btnB.mousePressed(() => {
    inputB = !inputB;
    btnB.html('B: ' + (inputB ? '1' : '0'));
  });

  positionUIElements();
  describe('Interactive universal gate simulator showing NAND and NOR implementations', LABEL);
}

function positionUIElements() {
  let mainRect = document.querySelector('main').getBoundingClientRect();
  gateSelector.position(mainRect.left + 20, mainRect.top + drawHeight + 15);
  implSelector.position(mainRect.left + 100, mainRect.top + drawHeight + 15);
  btnA.position(mainRect.left + 220, mainRect.top + drawHeight + 15);
  btnB.position(mainRect.left + 280, mainRect.top + drawHeight + 15);
}

function draw() {
  updateCanvasSize();

  // Background
  fill(colors.bg);
  noStroke();
  rect(0, 0, canvasWidth, drawHeight);

  // Control area
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill(colors.text);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(18);
  text('Universal Gate Simulator', canvasWidth / 2, 10);

  let targetGate = gateSelector.value();
  let useNAND = implSelector.value() === 'NAND-only';

  // Subtitle
  textSize(12);
  fill('#666');
  text(`Implementing ${targetGate} using ${useNAND ? 'NAND' : 'NOR'} gates`, canvasWidth / 2, 35);

  // Draw the circuit
  drawCircuit(targetGate, useNAND);

  // Draw truth table
  drawTruthTable(targetGate);
}

function drawCircuit(targetGate, useNAND) {
  let startX = 50;
  let startY = 100;
  let gateWidth = 60;
  let gateHeight = 40;

  // Draw inputs
  fill(inputA ? colors.high : colors.low);
  noStroke();
  ellipse(startX, startY, 30);
  fill('white');
  textAlign(CENTER, CENTER);
  textSize(14);
  text('A', startX, startY);

  if (targetGate !== 'NOT') {
    fill(inputB ? colors.high : colors.low);
    noStroke();
    ellipse(startX, startY + 80, 30);
    fill('white');
    text('B', startX, startY + 80);
  }

  // Calculate output based on target gate
  let output = calculateGateOutput(targetGate, inputA, inputB);

  // Draw implementation
  let implX = startX + 80;
  let implY = startY + 40;

  if (targetGate === 'NOT') {
    // NOT: Single NAND/NOR with tied inputs
    drawUniversalGate(implX, startY, gateWidth, gateHeight, useNAND);

    // Wires
    stroke(inputA ? colors.high : colors.low);
    strokeWeight(2);
    line(startX + 15, startY, implX, startY - 10);
    line(startX + 15, startY, implX, startY + 10);

    // Output wire
    let gateOut = useNAND ? !(inputA && inputA) : !(inputA || inputA);
    stroke(gateOut ? colors.high : colors.low);
    line(implX + gateWidth, startY, implX + gateWidth + 40, startY);

    // Output indicator
    fill(output ? colors.high : colors.low);
    noStroke();
    ellipse(implX + gateWidth + 60, startY, 30);
    fill('white');
    textAlign(CENTER, CENTER);
    text('Y', implX + gateWidth + 60, startY);

  } else if (targetGate === 'AND' && useNAND) {
    // AND using NAND: Two NANDs
    drawUniversalGate(implX, implY - 20, gateWidth, gateHeight, true);
    drawUniversalGate(implX + 100, implY - 20, gateWidth, gateHeight, true);

    // Input wires
    stroke(inputA ? colors.high : colors.low);
    strokeWeight(2);
    line(startX + 15, startY, implX, implY - 30);
    stroke(inputB ? colors.high : colors.low);
    line(startX + 15, startY + 80, implX, implY - 10);

    // Intermediate wire
    let nandOut = !(inputA && inputB);
    stroke(nandOut ? colors.high : colors.low);
    line(implX + gateWidth, implY - 20, implX + 100, implY - 30);
    line(implX + gateWidth, implY - 20, implX + 100, implY - 10);

    // Output wire
    stroke(output ? colors.high : colors.low);
    line(implX + 100 + gateWidth, implY - 20, implX + 100 + gateWidth + 30, implY - 20);

    drawOutputIndicator(implX + 100 + gateWidth + 50, implY - 20, output);

  } else if (targetGate === 'OR' && useNAND) {
    // OR using NAND: Three NANDs (invert each input, then NAND)
    drawUniversalGate(implX, startY - 20, gateWidth * 0.8, gateHeight * 0.8, true);
    drawUniversalGate(implX, startY + 60, gateWidth * 0.8, gateHeight * 0.8, true);
    drawUniversalGate(implX + 80, implY - 20, gateWidth, gateHeight, true);

    // Input wires
    stroke(inputA ? colors.high : colors.low);
    strokeWeight(2);
    line(startX + 15, startY, implX, startY - 28);
    line(startX + 15, startY, implX, startY - 12);

    stroke(inputB ? colors.high : colors.low);
    line(startX + 15, startY + 80, implX, startY + 52);
    line(startX + 15, startY + 80, implX, startY + 68);

    // Inverted signals
    let notA = !inputA;
    let notB = !inputB;
    stroke(notA ? colors.high : colors.low);
    line(implX + gateWidth * 0.8, startY - 20, implX + 80, implY - 30);
    stroke(notB ? colors.high : colors.low);
    line(implX + gateWidth * 0.8, startY + 60, implX + 80, implY - 10);

    // Output
    stroke(output ? colors.high : colors.low);
    line(implX + 80 + gateWidth, implY - 20, implX + 80 + gateWidth + 30, implY - 20);

    drawOutputIndicator(implX + 80 + gateWidth + 50, implY - 20, output);

  } else {
    // Generic representation for other combinations
    drawGenericImplementation(implX, implY, targetGate, useNAND, output);
  }

  // Show equation
  fill(colors.text);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(14);
  let eq = getEquation(targetGate, useNAND);
  text(eq, canvasWidth / 2, drawHeight - 60);

  // Show result
  textSize(16);
  fill(output ? colors.high : colors.low);
  text(`Output: ${output ? '1' : '0'}`, canvasWidth / 2, drawHeight - 35);
}

function drawUniversalGate(x, y, w, h, isNAND) {
  // Gate body
  fill(colors.gate);
  stroke(colors.gateStroke);
  strokeWeight(2);

  beginShape();
  vertex(x, y - h/2);
  vertex(x + w * 0.6, y - h/2);
  bezierVertex(x + w, y - h/2, x + w, y + h/2, x + w * 0.6, y + h/2);
  vertex(x, y + h/2);
  endShape(CLOSE);

  // Inversion bubble
  fill('white');
  stroke(colors.gateStroke);
  ellipse(x + w + 5, y, 10);

  // Label
  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(10);
  text(isNAND ? 'NAND' : 'NOR', x + w * 0.4, y);
}

function drawOutputIndicator(x, y, value) {
  fill(value ? colors.high : colors.low);
  noStroke();
  ellipse(x, y, 30);
  fill('white');
  textAlign(CENTER, CENTER);
  textSize(14);
  text('Y', x, y);
}

function drawGenericImplementation(x, y, gate, useNAND, output) {
  // Simplified block representation
  fill(colors.gate);
  stroke(colors.gateStroke);
  strokeWeight(2);
  rectMode(CENTER);
  rect(x + 60, y, 100, 60, 10);

  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  text(`${gate} using`, x + 60, y - 10);
  text(useNAND ? 'NAND gates' : 'NOR gates', x + 60, y + 10);

  rectMode(CORNER);

  // Input wires
  stroke(inputA ? colors.high : colors.low);
  strokeWeight(2);
  line(50 + 15, 100, x + 10, y - 15);

  if (gate !== 'NOT') {
    stroke(inputB ? colors.high : colors.low);
    line(50 + 15, 180, x + 10, y + 15);
  }

  // Output wire
  stroke(output ? colors.high : colors.low);
  line(x + 110, y, x + 150, y);

  drawOutputIndicator(x + 170, y, output);
}

function calculateGateOutput(gate, a, b) {
  switch(gate) {
    case 'NOT': return !a;
    case 'AND': return a && b;
    case 'OR': return a || b;
    case 'NAND': return !(a && b);
    case 'NOR': return !(a || b);
    case 'XOR': return a !== b;
    case 'XNOR': return a === b;
    default: return false;
  }
}

function getEquation(gate, useNAND) {
  let base = useNAND ? 'NAND' : 'NOR';
  switch(gate) {
    case 'NOT': return `NOT A = A ${base} A`;
    case 'AND': return useNAND ? 'AND = (A NAND B) NAND (A NAND B)' : 'AND = (A NOR A) NOR (B NOR B)';
    case 'OR': return useNAND ? 'OR = (A NAND A) NAND (B NAND B)' : 'OR = (A NOR B) NOR (A NOR B)';
    case 'NAND': return useNAND ? 'NAND = A NAND B' : 'NAND = ((A NOR A) NOR (B NOR B)) NOR ...';
    case 'NOR': return useNAND ? 'NOR = (A NAND A) NAND (B NAND B) ...' : 'NOR = A NOR B';
    case 'XOR': return `XOR using ${base} gates (4-5 gates)`;
    default: return '';
  }
}

function drawTruthTable(gate) {
  let tableX = canvasWidth - 120;
  let tableY = 80;
  let cellW = 25;
  let cellH = 20;

  fill(colors.text);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  text('Truth Table', tableX + 37, tableY - 15);

  // Header
  fill('#e3f2fd');
  stroke('#90caf9');
  rect(tableX, tableY, cellW, cellH);
  rect(tableX + cellW, tableY, cellW, cellH);
  rect(tableX + cellW * 2, tableY, cellW, cellH);

  fill(colors.text);
  noStroke();
  textSize(10);
  text('A', tableX + cellW/2, tableY + cellH/2);
  text('B', tableX + cellW * 1.5, tableY + cellH/2);
  text('Y', tableX + cellW * 2.5, tableY + cellH/2);

  // Rows
  let inputs = [[false, false], [false, true], [true, false], [true, true]];
  for (let i = 0; i < inputs.length; i++) {
    let y = tableY + cellH * (i + 1);
    let a = inputs[i][0];
    let b = inputs[i][1];
    let out = calculateGateOutput(gate, a, b);

    // Highlight current row
    if (a === inputA && b === inputB) {
      fill('#fff9c4');
    } else {
      fill('white');
    }
    stroke('#bdbdbd');
    rect(tableX, y, cellW, cellH);
    rect(tableX + cellW, y, cellW, cellH);
    rect(tableX + cellW * 2, y, cellW, cellH);

    fill(colors.text);
    noStroke();
    text(a ? '1' : '0', tableX + cellW/2, y + cellH/2);
    text(b ? '1' : '0', tableX + cellW * 1.5, y + cellH/2);
    fill(out ? colors.high : colors.low);
    text(out ? '1' : '0', tableX + cellW * 2.5, y + cellH/2);
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, canvasHeight);
  positionUIElements();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
