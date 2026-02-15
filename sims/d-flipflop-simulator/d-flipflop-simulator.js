// D Flip-Flop Simulator MicroSim
// Interactive edge-triggered D flip-flop
// Bloom Level: Understand/Apply (L2-L3)

let containerWidth;
let canvasWidth = 400;
let drawHeight = 420;
let controlHeight = 70;
let canvasHeight = drawHeight + controlHeight;

let D = false;
let Q = false;
let clock = false;
let clockBtn, dBtn;
let history = []; // Store timing diagram history
const maxHistory = 20;

const colors = {
  high: '#4CAF50',
  low: '#F44336',
  clock: '#2196F3',
  ff: '#9C27B0',
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

  dBtn = createButton('Toggle D');
  dBtn.mousePressed(() => D = !D);

  positionUIElements();

  // Initialize history
  for (let i = 0; i < maxHistory; i++) {
    history.push({ d: false, clk: false, q: false });
  }

  describe('Interactive D flip-flop simulator with timing diagram', LABEL);
}

function positionUIElements() {
  let mainRect = document.querySelector('main').getBoundingClientRect();
  clockBtn.position(mainRect.left + 20, mainRect.top + drawHeight + 15);
  dBtn.position(mainRect.left + 140, mainRect.top + drawHeight + 15);
}

function triggerClock() {
  // Rising edge - capture D
  Q = D;

  // Add to history
  history.push({ d: D, clk: true, q: Q });
  if (history.length > maxHistory) history.shift();

  // Reset clock after brief delay (visual feedback)
  setTimeout(() => {
    history.push({ d: D, clk: false, q: Q });
    if (history.length > maxHistory) history.shift();
  }, 100);
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
  text('D Flip-Flop Simulator', canvasWidth / 2, 10);

  // Subtitle
  textSize(12);
  fill('#666');
  text('Positive Edge-Triggered', canvasWidth / 2, 35);

  // Draw flip-flop
  drawFlipFlop();

  // Draw timing diagram
  drawTimingDiagram();

  // Draw characteristic table
  drawCharacteristicTable();

  // Instructions
  fill(colors.text);
  textAlign(LEFT, CENTER);
  textSize(10);
  text('Q captures D at rising edge only', 250, drawHeight + 40);
}

function drawFlipFlop() {
  let ffX = 140;
  let ffY = 90;
  let ffW = 100;
  let ffH = 100;

  // D input
  fill(D ? colors.high : colors.low);
  stroke(colors.wire);
  strokeWeight(2);
  ellipse(50, ffY + 25, 40);
  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(16);
  text(D ? '1' : '0', 50, ffY + 25);
  fill(colors.text);
  textSize(12);
  text('D', 50, ffY + 55);

  // Wire D to FF
  stroke(D ? colors.high : colors.low);
  strokeWeight(2);
  line(70, ffY + 25, ffX, ffY + 25);

  // Flip-flop body
  fill(colors.ff);
  stroke('#7B1FA2');
  strokeWeight(2);
  rect(ffX, ffY, ffW, ffH, 5);

  // Clock triangle
  fill('white');
  noStroke();
  triangle(ffX, ffY + 70, ffX + 15, ffY + 80, ffX, ffY + 90);

  // Labels
  fill('white');
  textSize(11);
  textAlign(LEFT, CENTER);
  text('D', ffX + 8, ffY + 25);
  text('CLK', ffX + 8, ffY + 80);

  textAlign(RIGHT, CENTER);
  text('Q', ffX + ffW - 8, ffY + 25);
  text("Q'", ffX + ffW - 8, ffY + 75);

  // FF type label
  textAlign(CENTER, CENTER);
  textSize(14);
  text('D FF', ffX + ffW/2, ffY + ffH/2);

  // Q output
  stroke(Q ? colors.high : colors.low);
  strokeWeight(2);
  line(ffX + ffW, ffY + 25, ffX + ffW + 40, ffY + 25);

  fill(Q ? colors.high : colors.low);
  stroke(colors.wire);
  ellipse(ffX + ffW + 60, ffY + 25, 40);
  fill('white');
  noStroke();
  textSize(16);
  text(Q ? '1' : '0', ffX + ffW + 60, ffY + 25);
  fill(colors.text);
  textSize(12);
  text('Q', ffX + ffW + 60, ffY + 55);

  // Q' output
  stroke(!Q ? colors.high : colors.low);
  strokeWeight(2);
  line(ffX + ffW, ffY + 75, ffX + ffW + 40, ffY + 75);

  fill(!Q ? colors.high : colors.low);
  stroke(colors.wire);
  ellipse(ffX + ffW + 60, ffY + 75, 40);
  fill('white');
  noStroke();
  textSize(16);
  text(!Q ? '1' : '0', ffX + ffW + 60, ffY + 75);
  fill(colors.text);
  textSize(12);
  text("Q'", ffX + ffW + 60, ffY + 105);

  // Clock input indicator
  fill(colors.clock);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(10);
  text('↑', ffX - 15, ffY + 80);
}

function drawTimingDiagram() {
  let diagramY = 220;
  let diagramH = 100;
  let signalH = 25;
  let startX = 60;
  let width = canvasWidth - 100;

  fill(colors.text);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(12);
  text('Timing Diagram', canvasWidth / 2, diagramY - 20);

  // Signal labels
  textAlign(RIGHT, CENTER);
  textSize(10);
  text('CLK', startX - 10, diagramY + 15);
  text('D', startX - 10, diagramY + 15 + signalH + 10);
  text('Q', startX - 10, diagramY + 15 + (signalH + 10) * 2);

  // Draw waveforms
  let stepW = width / maxHistory;

  for (let i = 0; i < history.length - 1; i++) {
    let x1 = startX + i * stepW;
    let x2 = startX + (i + 1) * stepW;

    // Clock
    let clkY = diagramY + (history[i].clk ? 5 : signalH - 5);
    let clkY2 = diagramY + (history[i + 1].clk ? 5 : signalH - 5);
    stroke(colors.clock);
    strokeWeight(2);
    line(x1, clkY, x2, clkY);
    if (clkY !== clkY2) line(x2, clkY, x2, clkY2);

    // D
    let dY = diagramY + signalH + 10 + (history[i].d ? 5 : signalH - 5);
    let dY2 = diagramY + signalH + 10 + (history[i + 1].d ? 5 : signalH - 5);
    stroke(colors.high);
    line(x1, dY, x2, dY);
    if (dY !== dY2) line(x2, dY, x2, dY2);

    // Q
    let qY = diagramY + (signalH + 10) * 2 + (history[i].q ? 5 : signalH - 5);
    let qY2 = diagramY + (signalH + 10) * 2 + (history[i + 1].q ? 5 : signalH - 5);
    stroke(colors.ff);
    line(x1, qY, x2, qY);
    if (qY !== qY2) line(x2, qY, x2, qY2);
  }
}

function drawCharacteristicTable() {
  let tableX = canvasWidth - 100;
  let tableY = 90;
  let cellW = 35;
  let cellH = 22;

  fill(colors.text);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(10);
  text('Characteristic', tableX + 17, tableY - 15);

  // Header
  fill('#e1bee7');
  stroke('#ce93d8');
  rect(tableX - 20, tableY, cellW, cellH);
  rect(tableX - 20 + cellW, tableY, cellW, cellH);

  fill(colors.text);
  noStroke();
  textSize(9);
  text('D', tableX - 20 + cellW/2, tableY + cellH/2);
  text('Q+', tableX - 20 + cellW * 1.5, tableY + cellH/2);

  // Data rows
  for (let i = 0; i < 2; i++) {
    let y = tableY + cellH * (i + 1);

    fill(i === (D ? 1 : 0) ? '#fff9c4' : 'white');
    stroke('#bdbdbd');
    rect(tableX - 20, y, cellW, cellH);
    rect(tableX - 20 + cellW, y, cellW, cellH);

    fill(colors.text);
    noStroke();
    text(i, tableX - 20 + cellW/2, y + cellH/2);
    text(i, tableX - 20 + cellW * 1.5, y + cellH/2);
  }

  // Equation
  fill(colors.text);
  textSize(10);
  text('Q+ = D', tableX + 17, tableY + cellH * 3.5);
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
