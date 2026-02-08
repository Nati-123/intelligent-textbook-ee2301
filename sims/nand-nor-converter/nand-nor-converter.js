// NAND-NOR Converter MicroSim
// Convert between AND-OR, NAND, and NOR implementations
// Bloom Level: Apply/Analyze (L3-L4)

let containerWidth;
let canvasWidth = 400;
let drawHeight = 500;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;

let exprSelector;

const expressions = [
  { expr: 'AB + CD', terms: 2, varsPerTerm: 2 },
  { expr: 'ABC + DE', terms: 2, varsPerTerm: [3, 2] },
  { expr: 'A + B', terms: 2, varsPerTerm: 1 },
  { expr: 'AB', terms: 1, varsPerTerm: 2 },
  { expr: "A'B + AB'", terms: 2, varsPerTerm: 2 }
];

const colors = {
  andOr: '#2196F3',
  nand: '#9C27B0',
  nor: '#FF9800',
  bg: '#f5f5f5',
  text: '#212121'
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  exprSelector = createSelect();
  expressions.forEach(e => exprSelector.option(e.expr));
  exprSelector.selected(expressions[0].expr);

  positionUIElements();
  describe('NAND-NOR converter showing equivalent implementations', LABEL);
}

function positionUIElements() {
  let mainRect = document.querySelector('main').getBoundingClientRect();
  exprSelector.position(mainRect.left + 20, mainRect.top + drawHeight + 15);
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
  text('NAND-NOR Converter', canvasWidth / 2, 10);

  let expr = exprSelector.value();
  let exprData = expressions.find(e => e.expr === expr);

  // Expression display
  textSize(16);
  fill('#1565C0');
  text(`F = ${expr}`, canvasWidth / 2, 40);

  // Draw three implementation panels
  let panelHeight = 130;
  let panelY = 70;

  drawImplementationPanel('AND-OR (Original)', panelY, colors.andOr, 'SOP', exprData, 'andor');
  drawImplementationPanel('NAND-only', panelY + panelHeight + 10, colors.nand, 'Universal', exprData, 'nand');
  drawImplementationPanel('NOR-only', panelY + (panelHeight + 10) * 2, colors.nor, 'Universal', exprData, 'nor');

  // Comparison
  drawComparison(exprData);

  // Label for control
  fill(colors.text);
  textAlign(LEFT, CENTER);
  textSize(12);
  text('Expression:', 90, drawHeight + 28);
}

function drawImplementationPanel(title, y, color, type, exprData, impl) {
  let panelWidth = canvasWidth - 40;
  let panelHeight = 125;

  // Panel background
  fill('white');
  stroke('#e0e0e0');
  strokeWeight(1);
  rect(20, y, panelWidth, panelHeight, 5);

  // Header
  fill(color);
  noStroke();
  rect(20, y, panelWidth, 25, 5, 5, 0, 0);

  fill('white');
  textAlign(LEFT, CENTER);
  textSize(12);
  text(title, 30, y + 12);

  fill('white');
  textAlign(RIGHT, CENTER);
  text(type, panelWidth + 10, y + 12);

  // Draw simplified circuit representation
  let circuitY = y + 70;
  let gateCount = getGateCount(exprData, impl);

  drawSimplifiedCircuit(impl, 40, circuitY, color, exprData);

  // Gate count
  fill(colors.text);
  textAlign(RIGHT, CENTER);
  textSize(11);
  text(`Gates: ${gateCount}`, panelWidth + 10, y + panelHeight - 15);
}

function drawSimplifiedCircuit(impl, x, y, color, exprData) {
  let gateW = 35;
  let gateH = 25;

  if (impl === 'andor') {
    // AND gates
    for (let i = 0; i < 2; i++) {
      drawMiniGate(x + 30, y - 25 + i * 50, gateW, gateH, 'AND', colors.andOr);
    }
    // OR gate
    drawMiniGate(x + 100, y, gateW, gateH, 'OR', '#4CAF50');

    // Wires
    stroke('#666');
    strokeWeight(1);
    line(x + 30 + gateW, y - 25, x + 100, y - 10);
    line(x + 30 + gateW, y + 25, x + 100, y + 10);
    line(x + 100 + gateW, y, x + 160, y);

  } else if (impl === 'nand') {
    // Three NAND gates
    for (let i = 0; i < 2; i++) {
      drawMiniGate(x + 30, y - 25 + i * 50, gateW, gateH, 'NAND', colors.nand);
    }
    drawMiniGate(x + 100, y, gateW, gateH, 'NAND', colors.nand);

    stroke('#666');
    strokeWeight(1);
    line(x + 30 + gateW, y - 25, x + 100, y - 10);
    line(x + 30 + gateW, y + 25, x + 100, y + 10);
    line(x + 100 + gateW, y, x + 160, y);

  } else if (impl === 'nor') {
    // Five NOR gates for SOP
    drawMiniGate(x + 10, y - 35, gateW * 0.8, gateH * 0.8, 'NOR', colors.nor);
    drawMiniGate(x + 10, y - 10, gateW * 0.8, gateH * 0.8, 'NOR', colors.nor);
    drawMiniGate(x + 10, y + 15, gateW * 0.8, gateH * 0.8, 'NOR', colors.nor);
    drawMiniGate(x + 10, y + 40, gateW * 0.8, gateH * 0.8, 'NOR', colors.nor);
    drawMiniGate(x + 60, y - 22, gateW * 0.8, gateH * 0.8, 'NOR', colors.nor);
    drawMiniGate(x + 60, y + 27, gateW * 0.8, gateH * 0.8, 'NOR', colors.nor);
    drawMiniGate(x + 110, y, gateW, gateH, 'NOR', colors.nor);

    stroke('#666');
    strokeWeight(1);
    line(x + 110 + gateW, y, x + 160, y);
  }

  // Output label
  fill(colors.text);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text('F', x + 165, y);
}

function drawMiniGate(x, y, w, h, type, color) {
  fill(color);
  stroke(color);
  strokeWeight(1);

  if (type === 'AND' || type === 'NAND') {
    beginShape();
    vertex(x, y - h/2);
    vertex(x + w * 0.5, y - h/2);
    bezierVertex(x + w, y - h/2, x + w, y + h/2, x + w * 0.5, y + h/2);
    vertex(x, y + h/2);
    endShape(CLOSE);

    if (type === 'NAND') {
      fill('white');
      ellipse(x + w + 4, y, 6);
    }
  } else if (type === 'OR' || type === 'NOR') {
    beginShape();
    vertex(x, y - h/2);
    bezierVertex(x + w * 0.5, y - h/2, x + w * 0.8, y - h/4, x + w, y);
    bezierVertex(x + w * 0.8, y + h/4, x + w * 0.5, y + h/2, x, y + h/2);
    bezierVertex(x + w * 0.15, y, x + w * 0.15, y, x, y - h/2);
    endShape(CLOSE);

    if (type === 'NOR') {
      fill('white');
      ellipse(x + w + 4, y, 6);
    }
  }

  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(7);
  text(type, x + w * 0.4, y);
}

function getGateCount(exprData, impl) {
  let terms = exprData.terms;

  if (impl === 'andor') {
    return terms + 1; // AND gates + 1 OR gate
  } else if (impl === 'nand') {
    return terms + 1; // Same structure with NAND
  } else if (impl === 'nor') {
    // NOR implementation of SOP requires more gates
    return terms * 2 + 3; // Inverters + NOR gates
  }
  return 0;
}

function drawComparison(exprData) {
  let y = drawHeight - 40;

  fill(colors.text);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(11);

  let andOrGates = getGateCount(exprData, 'andor');
  let nandGates = getGateCount(exprData, 'nand');
  let norGates = getGateCount(exprData, 'nor');

  text(`Comparison: AND-OR: ${andOrGates} gates | NAND: ${nandGates} gates | NOR: ${norGates} gates`, canvasWidth / 2, y);
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
