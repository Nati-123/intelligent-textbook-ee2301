// JK Flip-Flop Simulator MicroSim
// Interactive edge-triggered JK flip-flop
// Bloom Level: Understand/Apply (L2-L3)

let containerWidth;
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 70;
let canvasHeight = drawHeight + controlHeight;

let J = false, K = false;
let Q = false;
let clockBtn;

const colors = {
  high: '#4CAF50',
  low: '#F44336',
  toggle: '#FF9800',
  ff: '#00BCD4',
  wire: '#666',
  bg: '#f5f5f5',
  text: '#212121'
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  clockBtn = createButton('⬆ Clock Pulse');
  clockBtn.mousePressed(triggerClock);

  positionUIElements();
  describe('Interactive JK flip-flop simulator', LABEL);
}

function positionUIElements() {
  let mainRect = document.querySelector('main').getBoundingClientRect();
  clockBtn.position(mainRect.left + 20, mainRect.top + drawHeight + 15);
}

function triggerClock() {
  // JK flip-flop logic
  if (!J && !K) {
    // Hold - no change
  } else if (!J && K) {
    Q = false; // Reset
  } else if (J && !K) {
    Q = true; // Set
  } else {
    Q = !Q; // Toggle
  }
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
  text('JK Flip-Flop Simulator', canvasWidth / 2, 10);

  // Current operation
  let operation = (!J && !K) ? 'HOLD' :
                  (!J && K) ? 'RESET' :
                  (J && !K) ? 'SET' : 'TOGGLE';
  textSize(12);
  fill(operation === 'TOGGLE' ? colors.toggle : '#666');
  text(`J=${J?1:0}, K=${K?1:0} → ${operation}`, canvasWidth / 2, 35);

  // Draw flip-flop
  drawFlipFlop();

  // Draw truth table
  drawTruthTable();

  // Instructions
  fill(colors.text);
  textAlign(LEFT, CENTER);
  textSize(10);
  text('Click J/K inputs to toggle, then clock', 150, drawHeight + 40);
}

function drawFlipFlop() {
  let ffX = 130;
  let ffY = 80;
  let ffW = 100;
  let ffH = 120;

  // J input
  fill(J ? colors.high : colors.low);
  stroke(colors.wire);
  strokeWeight(2);
  ellipse(50, ffY + 25, 40);
  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(16);
  text(J ? '1' : '0', 50, ffY + 25);
  fill(colors.text);
  textSize(12);
  text('J', 50, ffY + 55);

  // K input
  fill(K ? colors.high : colors.low);
  stroke(colors.wire);
  strokeWeight(2);
  ellipse(50, ffY + 95, 40);
  fill('white');
  noStroke();
  textSize(16);
  text(K ? '1' : '0', 50, ffY + 95);
  fill(colors.text);
  textSize(12);
  text('K', 50, ffY + 125);

  // Wires
  stroke(J ? colors.high : colors.low);
  strokeWeight(2);
  line(70, ffY + 25, ffX, ffY + 25);
  stroke(K ? colors.high : colors.low);
  line(70, ffY + 95, ffX, ffY + 95);

  // Flip-flop body
  fill(colors.ff);
  stroke('#00838F');
  strokeWeight(2);
  rect(ffX, ffY, ffW, ffH, 5);

  // Clock triangle
  fill('white');
  noStroke();
  triangle(ffX, ffY + 55, ffX + 15, ffY + 60, ffX, ffY + 65);

  // Labels
  fill('white');
  textSize(11);
  textAlign(LEFT, CENTER);
  text('J', ffX + 8, ffY + 25);
  text('K', ffX + 8, ffY + 95);
  text('CLK', ffX + 8, ffY + 60);

  textAlign(RIGHT, CENTER);
  text('Q', ffX + ffW - 8, ffY + 35);
  text("Q'", ffX + ffW - 8, ffY + 85);

  textAlign(CENTER, CENTER);
  textSize(14);
  text('JK FF', ffX + ffW/2, ffY + ffH/2);

  // Outputs
  stroke(Q ? colors.high : colors.low);
  strokeWeight(2);
  line(ffX + ffW, ffY + 35, ffX + ffW + 40, ffY + 35);

  fill(Q ? colors.high : colors.low);
  stroke(colors.wire);
  ellipse(ffX + ffW + 60, ffY + 35, 40);
  fill('white');
  noStroke();
  textSize(16);
  text(Q ? '1' : '0', ffX + ffW + 60, ffY + 35);
  fill(colors.text);
  textSize(12);
  text('Q', ffX + ffW + 60, ffY + 65);

  stroke(!Q ? colors.high : colors.low);
  strokeWeight(2);
  line(ffX + ffW, ffY + 85, ffX + ffW + 40, ffY + 85);

  fill(!Q ? colors.high : colors.low);
  stroke(colors.wire);
  ellipse(ffX + ffW + 60, ffY + 85, 40);
  fill('white');
  noStroke();
  textSize(16);
  text(!Q ? '1' : '0', ffX + ffW + 60, ffY + 85);
  fill(colors.text);
  textSize(12);
  text("Q'", ffX + ffW + 60, ffY + 115);
}

function drawTruthTable() {
  let tableX = 40;
  let tableY = 240;
  let cellW = 40;
  let cellH = 24;

  fill(colors.text);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  text('JK Flip-Flop Truth Table', canvasWidth / 2, tableY - 20);

  // Header
  let headers = ['J', 'K', 'Q(next)', 'Operation'];
  fill('#e0f7fa');
  stroke('#80deea');
  for (let i = 0; i < 4; i++) {
    rect(tableX + i * cellW, tableY, cellW, cellH);
  }

  fill(colors.text);
  noStroke();
  textSize(9);
  headers.forEach((h, i) => {
    text(h, tableX + cellW * (i + 0.5), tableY + cellH/2);
  });

  // Rows
  let rows = [
    { j: 0, k: 0, q: 'Q', op: 'Hold' },
    { j: 0, k: 1, q: '0', op: 'Reset' },
    { j: 1, k: 0, q: '1', op: 'Set' },
    { j: 1, k: 1, q: "Q'", op: 'Toggle' }
  ];

  rows.forEach((row, idx) => {
    let y = tableY + cellH * (idx + 1);
    let isCurrentRow = (row.j === (J ? 1 : 0)) && (row.k === (K ? 1 : 0));

    fill(isCurrentRow ? '#fff9c4' : 'white');
    stroke('#bdbdbd');
    for (let i = 0; i < 4; i++) {
      rect(tableX + i * cellW, y, cellW, cellH);
    }

    fill(colors.text);
    noStroke();
    textSize(9);
    text(row.j, tableX + cellW * 0.5, y + cellH/2);
    text(row.k, tableX + cellW * 1.5, y + cellH/2);
    text(row.q, tableX + cellW * 2.5, y + cellH/2);
    text(row.op, tableX + cellW * 3.5, y + cellH/2);
  });

  // Equation
  fill(colors.text);
  textSize(10);
  textAlign(CENTER, TOP);
  text("Q+ = JQ' + K'Q", canvasWidth / 2, tableY + cellH * 5.5);
}

function mousePressed() {
  // Check J click
  if (dist(mouseX, mouseY, 50, 105) < 22) {
    J = !J;
    return;
  }
  // Check K click
  if (dist(mouseX, mouseY, 50, 175) < 22) {
    K = !K;
    return;
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
