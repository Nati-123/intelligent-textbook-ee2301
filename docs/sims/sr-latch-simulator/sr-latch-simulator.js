// SR Latch Simulator MicroSim
// Interactive NOR-gate SR latch
// Bloom Level: Understand/Analyze (L2-L4)

let containerWidth;
let canvasWidth = 400;
let drawHeight = 420;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;

let S = false, R = false;
let Q = false, Qbar = true;

const colors = {
  high: '#4CAF50',
  low: '#F44336',
  invalid: '#FF9800',
  gate: '#2196F3',
  wire: '#666',
  bg: '#f5f5f5',
  text: '#212121'
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  describe('Interactive SR latch simulator with NOR gates', LABEL);
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
  text('SR Latch Simulator', canvasWidth / 2, 10);

  // Calculate outputs
  let invalid = S && R;
  if (!invalid) {
    if (S && !R) {
      Q = true;
      Qbar = false;
    } else if (!S && R) {
      Q = false;
      Qbar = true;
    }
    // Hold state: Q and Qbar maintain previous values
  } else {
    Q = false;
    Qbar = false; // Invalid: both outputs forced to 0
  }

  // State description
  textSize(12);
  fill(invalid ? colors.invalid : '#666');
  let state = invalid ? 'INVALID STATE' :
              (S && !R) ? 'SET (Q=1)' :
              (!S && R) ? 'RESET (Q=0)' : 'HOLD';
  text(`S=${S?1:0}, R=${R?1:0} → ${state}`, canvasWidth / 2, 35);

  // Draw circuit
  drawCircuit(invalid);

  // Draw truth table
  drawTruthTable(invalid);

  // Instructions
  fill(colors.text);
  textAlign(CENTER, CENTER);
  textSize(11);
  text('Click S or R inputs to toggle', canvasWidth / 2, drawHeight + 30);
}

function drawCircuit(invalid) {
  let gateW = 60;
  let gateH = 40;

  // Gate positions
  let topGateX = 160;
  let topGateY = 130;
  let botGateX = 160;
  let botGateY = 230;

  // Draw inputs
  // S input
  fill(S ? colors.high : colors.low);
  stroke(colors.wire);
  strokeWeight(2);
  ellipse(60, topGateY - 15, 40);
  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(16);
  text(S ? '1' : '0', 60, topGateY - 15);
  fill(colors.text);
  textSize(12);
  text('S', 60, topGateY + 15);

  // R input
  fill(R ? colors.high : colors.low);
  stroke(colors.wire);
  strokeWeight(2);
  ellipse(60, botGateY + 15, 40);
  fill('white');
  noStroke();
  textSize(16);
  text(R ? '1' : '0', 60, botGateY + 15);
  fill(colors.text);
  textSize(12);
  text('R', 60, botGateY + 45);

  // Draw NOR gates
  drawNORGate(topGateX, topGateY, gateW, gateH, 'NOR');
  drawNORGate(botGateX, botGateY, gateW, gateH, 'NOR');

  // Draw wires
  // S to top gate
  stroke(S ? colors.high : colors.low);
  strokeWeight(2);
  line(80, topGateY - 15, topGateX, topGateY - 10);

  // R to bottom gate
  stroke(R ? colors.high : colors.low);
  line(80, botGateY + 15, botGateX, botGateY + 10);

  // Cross-coupled feedback
  // Q' to top gate (lower input)
  stroke(invalid ? colors.invalid : (Qbar ? colors.high : colors.low));
  line(topGateX + gateW + 10, topGateY, topGateX + gateW + 30, topGateY);
  line(topGateX + gateW + 30, topGateY, topGateX + gateW + 30, botGateY + 40);
  line(topGateX + gateW + 30, botGateY + 40, topGateX - 30, botGateY + 40);
  line(topGateX - 30, botGateY + 40, topGateX - 30, topGateY + 10);
  line(topGateX - 30, topGateY + 10, topGateX, topGateY + 10);

  // Q to bottom gate (upper input)
  stroke(invalid ? colors.invalid : (Q ? colors.high : colors.low));
  line(botGateX + gateW + 10, botGateY, botGateX + gateW + 50, botGateY);
  line(botGateX + gateW + 50, botGateY, botGateX + gateW + 50, topGateY - 40);
  line(botGateX + gateW + 50, topGateY - 40, botGateX - 50, topGateY - 40);
  line(botGateX - 50, topGateY - 40, botGateX - 50, botGateY - 10);
  line(botGateX - 50, botGateY - 10, botGateX, botGateY - 10);

  // Draw outputs
  let outX = 300;

  // Q output
  fill(invalid ? colors.invalid : (Q ? colors.high : colors.low));
  stroke(colors.wire);
  strokeWeight(2);
  ellipse(outX, topGateY, 40);
  fill('white');
  noStroke();
  textSize(16);
  text(invalid ? '?' : (Q ? '1' : '0'), outX, topGateY);
  fill(colors.text);
  textSize(12);
  text('Q', outX, topGateY + 30);

  // Q' output
  fill(invalid ? colors.invalid : (Qbar ? colors.high : colors.low));
  stroke(colors.wire);
  strokeWeight(2);
  ellipse(outX, botGateY, 40);
  fill('white');
  noStroke();
  textSize(16);
  text(invalid ? '?' : (Qbar ? '1' : '0'), outX, botGateY);
  fill(colors.text);
  textSize(12);
  text("Q'", outX, botGateY + 30);

  // Output wires
  stroke(invalid ? colors.invalid : (Q ? colors.high : colors.low));
  strokeWeight(2);
  line(topGateX + gateW + 10, topGateY, outX - 20, topGateY);

  stroke(invalid ? colors.invalid : (Qbar ? colors.high : colors.low));
  line(botGateX + gateW + 10, botGateY, outX - 20, botGateY);

  // Invalid warning
  if (invalid) {
    fill(colors.invalid);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(14);
    text('⚠ Invalid: Q ≠ Q\'', canvasWidth / 2, 290);
  }
}

function drawNORGate(x, y, w, h, label) {
  fill(colors.gate);
  stroke('#1565C0');
  strokeWeight(2);

  // OR shape with inversion bubble
  beginShape();
  vertex(x, y - h/2);
  bezierVertex(x + w * 0.5, y - h/2, x + w * 0.8, y - h/4, x + w, y);
  bezierVertex(x + w * 0.8, y + h/4, x + w * 0.5, y + h/2, x, y + h/2);
  bezierVertex(x + w * 0.15, y, x + w * 0.15, y, x, y - h/2);
  endShape(CLOSE);

  // Inversion bubble
  fill('white');
  ellipse(x + w + 5, y, 10);

  // Label
  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(10);
  text(label, x + w * 0.4, y);
}

function drawTruthTable(invalid) {
  let tableX = canvasWidth - 130;
  let tableY = 100;
  let cellW = 30;
  let cellH = 24;

  fill(colors.text);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  text('Truth Table', tableX + 45, tableY - 15);

  // Header
  let headers = ['S', 'R', 'Q', "Q'", 'Mode'];
  fill('#e3f2fd');
  stroke('#90caf9');
  for (let i = 0; i < 4; i++) {
    rect(tableX + i * cellW, tableY, cellW, cellH);
  }

  fill(colors.text);
  noStroke();
  textSize(9);
  for (let i = 0; i < 4; i++) {
    text(headers[i], tableX + cellW * (i + 0.5), tableY + cellH/2);
  }

  // Rows
  let rows = [
    { s: 0, r: 0, q: 'Q', qb: "Q'", mode: 'Hold' },
    { s: 0, r: 1, q: '0', qb: '1', mode: 'Reset' },
    { s: 1, r: 0, q: '1', qb: '0', mode: 'Set' },
    { s: 1, r: 1, q: '0', qb: '0', mode: 'Invalid' }
  ];

  rows.forEach((row, idx) => {
    let y = tableY + cellH * (idx + 1);
    let isCurrentRow = (row.s === (S ? 1 : 0)) && (row.r === (R ? 1 : 0));

    fill(isCurrentRow ? '#fff9c4' : 'white');
    if (row.mode === 'Invalid' && isCurrentRow) {
      fill('#ffccbc');
    }
    stroke('#bdbdbd');
    for (let i = 0; i < 4; i++) {
      rect(tableX + i * cellW, y, cellW, cellH);
    }

    fill(colors.text);
    noStroke();
    textSize(9);
    text(row.s, tableX + cellW * 0.5, y + cellH/2);
    text(row.r, tableX + cellW * 1.5, y + cellH/2);
    text(row.q, tableX + cellW * 2.5, y + cellH/2);
    text(row.qb, tableX + cellW * 3.5, y + cellH/2);
  });
}

function mousePressed() {
  // Check S input click
  if (dist(mouseX, mouseY, 60, 115) < 22) {
    S = !S;
    return;
  }

  // Check R input click
  if (dist(mouseX, mouseY, 60, 245) < 22) {
    R = !R;
    return;
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
