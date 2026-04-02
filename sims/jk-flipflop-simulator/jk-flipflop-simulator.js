// JK Flip-Flop Simulator MicroSim
// Interactive edge-triggered JK flip-flop
// Bloom Level: Understand/Apply (L2-L3)

let containerWidth;
let canvasWidth = 400;
let drawHeight = 530;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;

let J = false, K = false;
let Q = false;
let clockBtn, resetBtn;
let edgeFlash = 0; // countdown for edge indicator
let history = [];
const maxHistory = 20;

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

  resetBtn = createButton('Reset');
  resetBtn.mousePressed(resetSim);

  positionUIElements();

  // Initialize history
  for (let i = 0; i < maxHistory; i++) {
    history.push({ j: false, k: false, clk: false, q: false });
  }

  describe('Interactive JK flip-flop simulator', LABEL);
}

function positionUIElements() {
  let mainRect = document.querySelector('main').getBoundingClientRect();
  clockBtn.position(mainRect.left + 20, mainRect.top + drawHeight + 15);
  resetBtn.position(mainRect.left + 150, mainRect.top + drawHeight + 15);
}

function triggerClock() {
  if (!J && !K) {
    // Hold
  } else if (!J && K) {
    Q = false;
  } else if (J && !K) {
    Q = true;
  } else {
    Q = !Q;
  }
  edgeFlash = 30;

  // Record rising edge
  history.push({ j: J, k: K, clk: true, q: Q });
  if (history.length > maxHistory) history.shift();

  // Record falling edge after brief delay
  setTimeout(() => {
    history.push({ j: J, k: K, clk: false, q: Q });
    if (history.length > maxHistory) history.shift();
  }, 100);
}

function resetSim() {
  J = false;
  K = false;
  Q = false;
  edgeFlash = 0;
  history = [];
  for (let i = 0; i < maxHistory; i++) {
    history.push({ j: false, k: false, clk: false, q: false });
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

  // Decrement flash
  if (edgeFlash > 0) edgeFlash--;

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
  text('J=' + (J?1:0) + ', K=' + (K?1:0) + ' → ' + operation, canvasWidth / 2, 35);

  // Layout: flip-flop left, truth table right
  drawFlipFlop();
  drawTruthTable();
  drawTimingDiagram();

  // Instructions
  fill(colors.text);
  textAlign(CENTER, CENTER);
  textSize(10);
  text('Click J/K inputs to toggle, then press Clock Pulse', canvasWidth / 2, drawHeight + 42);
}

function drawFlipFlop() {
  let cx = canvasWidth * 0.32; // center of flip-flop area
  let ffW = 110;
  let ffH = 130;
  let ffX = cx - ffW / 2;
  let ffY = 70;

  let inputX = ffX - 80;

  // J input circle
  fill(J ? colors.high : colors.low);
  stroke(colors.wire);
  strokeWeight(2);
  ellipse(inputX, ffY + 28, 38);
  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(15);
  text(J ? '1' : '0', inputX, ffY + 28);
  fill(colors.text);
  textSize(11);
  text('J', inputX, ffY + 55);

  // K input circle
  fill(K ? colors.high : colors.low);
  stroke(colors.wire);
  strokeWeight(2);
  ellipse(inputX, ffY + 100, 38);
  fill('white');
  noStroke();
  textSize(15);
  text(K ? '1' : '0', inputX, ffY + 100);
  fill(colors.text);
  textSize(11);
  text('K', inputX, ffY + 127);

  // Wires to FF
  stroke(J ? colors.high : colors.low);
  strokeWeight(2);
  line(inputX + 19, ffY + 28, ffX, ffY + 28);
  stroke(K ? colors.high : colors.low);
  line(inputX + 19, ffY + 100, ffX, ffY + 100);

  // Flip-flop body
  fill(colors.ff);
  stroke('#00838F');
  strokeWeight(2);
  rect(ffX, ffY, ffW, ffH, 6);

  // Clock triangle with edge flash
  if (edgeFlash > 0) {
    fill(255, 235, 59, map(edgeFlash, 0, 30, 80, 255));
    noStroke();
    triangle(ffX, ffY + 58, ffX + 18, ffY + 65, ffX, ffY + 72);
  }
  fill('white');
  noStroke();
  triangle(ffX, ffY + 60, ffX + 15, ffY + 65, ffX, ffY + 70);

  // Edge indicator arrow (flashes on clock)
  if (edgeFlash > 0) {
    let alpha = map(edgeFlash, 0, 30, 0, 255);
    fill(255, 235, 59, alpha);
    noStroke();
    textSize(16);
    textAlign(CENTER, CENTER);
    text('↑', ffX - 14, ffY + 65);
  }

  // Labels inside FF
  fill('white');
  textSize(11);
  textAlign(LEFT, CENTER);
  text('J', ffX + 8, ffY + 28);
  text('K', ffX + 8, ffY + 100);
  text('CLK', ffX + 8, ffY + 65);

  textAlign(RIGHT, CENTER);
  text('Q', ffX + ffW - 8, ffY + 38);
  text("Q'", ffX + ffW - 8, ffY + 90);

  textAlign(CENTER, CENTER);
  textSize(13);
  text('JK Flip-Flop', ffX + ffW / 2, ffY + ffH / 2 + 2);

  // Q output
  stroke(Q ? colors.high : colors.low);
  strokeWeight(2);
  line(ffX + ffW, ffY + 38, ffX + ffW + 35, ffY + 38);

  fill(Q ? colors.high : colors.low);
  stroke(colors.wire);
  ellipse(ffX + ffW + 55, ffY + 38, 38);
  fill('white');
  noStroke();
  textSize(15);
  text(Q ? '1' : '0', ffX + ffW + 55, ffY + 38);
  fill(colors.text);
  textSize(11);
  text('Q', ffX + ffW + 55, ffY + 65);

  // Q' output
  stroke(!Q ? colors.high : colors.low);
  strokeWeight(2);
  line(ffX + ffW, ffY + 90, ffX + ffW + 35, ffY + 90);

  fill(!Q ? colors.high : colors.low);
  stroke(colors.wire);
  ellipse(ffX + ffW + 55, ffY + 90, 38);
  fill('white');
  noStroke();
  textSize(15);
  text(!Q ? '1' : '0', ffX + ffW + 55, ffY + 90);
  fill(colors.text);
  textSize(11);
  text("Q'", ffX + ffW + 55, ffY + 117);
}

function drawTruthTable() {
  let tableW = 175;
  let tableX = canvasWidth * 0.68 - tableW / 2;
  let tableY = 240;
  let cols = [35, 35, 50, 55];
  let cellH = 24;

  // Title
  fill(colors.text);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  text('Truth Table', tableX + tableW / 2, tableY - 14);

  // Header
  let headers = ['J', 'K', 'Q(next)', 'Mode'];
  let hx = tableX;
  for (let i = 0; i < 4; i++) {
    fill('#b2ebf2');
    stroke('#4dd0e1');
    rect(hx, tableY, cols[i], cellH);
    fill(colors.text);
    noStroke();
    textSize(9);
    text(headers[i], hx + cols[i] / 2, tableY + cellH / 2);
    hx += cols[i];
  }

  // Rows
  let rows = [
    { j: 0, k: 0, q: 'Q', op: 'Hold' },
    { j: 0, k: 1, q: '0', op: 'Reset' },
    { j: 1, k: 0, q: '1', op: 'Set' },
    { j: 1, k: 1, q: "Q'", op: 'Toggle' }
  ];

  rows.forEach((row, idx) => {
    let y = tableY + cellH * (idx + 1);
    let isActive = (row.j === (J ? 1 : 0)) && (row.k === (K ? 1 : 0));

    let hx = tableX;
    for (let i = 0; i < 4; i++) {
      if (isActive) {
        fill('#fff176');
        stroke('#fdd835');
        strokeWeight(2);
      } else {
        fill('white');
        stroke('#bdbdbd');
        strokeWeight(1);
      }
      rect(hx, y, cols[i], cellH);
      hx += cols[i];
    }

    fill(isActive ? '#333' : colors.text);
    noStroke();
    textSize(9);
    textStyle(isActive ? BOLD : NORMAL);
    hx = tableX;
    let vals = [row.j, row.k, row.q, row.op];
    for (let i = 0; i < 4; i++) {
      text(vals[i], hx + cols[i] / 2, y + cellH / 2);
      hx += cols[i];
    }
    textStyle(NORMAL);
  });

  // Active row indicator arrow
  let activeIdx = (!J && !K) ? 0 : (!J && K) ? 1 : (J && !K) ? 2 : 3;
  fill(colors.toggle);
  noStroke();
  textSize(12);
  textAlign(RIGHT, CENTER);
  text('▸', tableX - 4, tableY + cellH * (activeIdx + 1) + cellH / 2);

  // Equation box
  let eqY = tableY + cellH * 5 + 8;
  fill('#e0f7fa');
  stroke('#4dd0e1');
  strokeWeight(1);
  rect(tableX, eqY, tableW, 28, 6);

  fill(colors.text);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  textStyle(BOLD);
  text("Q⁺ = J·Q' + K'·Q", tableX + tableW / 2, eqY + 14);
  textStyle(NORMAL);
}

function drawTimingDiagram() {
  let diagramY = 375;
  let signalH = 25;
  let gap = 8;
  let startX = 50;
  let w = canvasWidth - 80;
  let labels = ['CLK', 'J', 'K', 'Q'];
  let sigColors = ['#2196F3', colors.high, colors.low, '#9C27B0'];

  // Title
  fill(colors.text);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(12);
  text('Timing Diagram', canvasWidth / 2, diagramY - 18);

  let stepW = w / maxHistory;

  for (let s = 0; s < 4; s++) {
    let baseY = diagramY + s * (signalH + gap);

    // Label
    fill(colors.text);
    noStroke();
    textAlign(RIGHT, CENTER);
    textSize(10);
    text(labels[s], startX - 8, baseY + signalH / 2);

    // Waveform
    stroke(sigColors[s]);
    strokeWeight(2);
    for (let i = 0; i < history.length - 1; i++) {
      let x1 = startX + i * stepW;
      let x2 = startX + (i + 1) * stepW;

      let val1, val2;
      if (s === 0) { val1 = history[i].clk; val2 = history[i + 1].clk; }
      else if (s === 1) { val1 = history[i].j; val2 = history[i + 1].j; }
      else if (s === 2) { val1 = history[i].k; val2 = history[i + 1].k; }
      else { val1 = history[i].q; val2 = history[i + 1].q; }

      let y1 = baseY + (val1 ? 3 : signalH - 3);
      let y2 = baseY + (val2 ? 3 : signalH - 3);

      line(x1, y1, x2, y1);
      if (y1 !== y2) line(x2, y1, x2, y2);
    }
  }
}

function mousePressed() {
  let cx = canvasWidth * 0.32;
  let ffW = 110;
  let ffX = cx - ffW / 2;
  let ffY = 70;
  let inputX = ffX - 80;

  if (dist(mouseX, mouseY, inputX, ffY + 28) < 19) {
    J = !J;
    return;
  }
  if (dist(mouseX, mouseY, inputX, ffY + 100) < 19) {
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
