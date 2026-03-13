// Timing Diagram Analyzer MicroSim
// Interactive timing diagram visualization
// Bloom Level: Apply/Analyze (L3-L4)

let containerWidth;
let canvasWidth = 400;
let drawHeight = 450;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;

let newPatternBtn;
let dPattern = [];
let qOutput = [];
const numCycles = 8;

const colors = {
  high: '#4CAF50',
  low: '#F44336',
  clock: '#2196F3',
  d: '#FF9800',
  q: '#9C27B0',
  edge: '#E91E63',
  bg: '#f5f5f5',
  text: '#212121'
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  newPatternBtn = createButton('Generate Random Timing Pattern');
  newPatternBtn.mousePressed(generatePattern);

  positionUIElements();
  generatePattern();

  describe('Interactive timing diagram analyzer for D flip-flop', LABEL);
}

function positionUIElements() {
  let mainRect = document.querySelector('main').getBoundingClientRect();
  newPatternBtn.position(mainRect.left + 20, mainRect.top + drawHeight + 15);
}

function generatePattern() {
  dPattern = [];
  qOutput = [];

  // Generate random D pattern
  for (let i = 0; i < numCycles * 2; i++) {
    dPattern.push(random() > 0.5);
  }

  // Calculate Q output (D sampled at rising edges)
  let currentQ = false;
  for (let i = 0; i < numCycles; i++) {
    // Sample D at the beginning of each cycle (rising edge)
    let sampledD = dPattern[i * 2];
    currentQ = sampledD;
    qOutput.push(currentQ);
    qOutput.push(currentQ);
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
  text('Timing Diagram Analyzer', canvasWidth / 2, 10);

  textSize(12);
  fill('#666');
  text('D Flip-Flop: Q captures D at each rising clock edge', canvasWidth / 2, 35);

  // Draw timing diagram
  drawTimingDiagram();

  // Draw legend
  drawLegend();

  // Instructions
  fill(colors.text);
  textAlign(LEFT, CENTER);
  textSize(10);
  text('Pink dots show D value captured at each rising edge', 220, drawHeight + 30);
}

function drawTimingDiagram() {
  let startX = 70;
  let startY = 80;
  let width = canvasWidth - 100;
  let signalH = 40;
  let signalGap = 70;
  let cycleW = width / numCycles;

  // Draw grid
  stroke('#e0e0e0');
  strokeWeight(1);
  for (let i = 0; i <= numCycles; i++) {
    let x = startX + i * cycleW;
    line(x, startY - 10, x, startY + signalGap * 2 + signalH + 10);
  }

  // Signal labels
  fill(colors.clock);
  noStroke();
  textAlign(RIGHT, CENTER);
  textSize(12);
  textStyle(BOLD);
  text('CLK', startX - 10, startY + signalH / 2);
  fill(colors.d);
  text('D', startX - 10, startY + signalGap + signalH / 2);
  fill(colors.q);
  text('Q', startX - 10, startY + signalGap * 2 + signalH / 2);
  textStyle(NORMAL);

  // Draw vertical dashed sampling lines at each rising edge
  for (let i = 0; i < numCycles; i++) {
    let edgeX = startX + i * cycleW + cycleW / 2;
    stroke(colors.edge);
    strokeWeight(1);
    drawingContext.setLineDash([4, 4]);
    line(edgeX, startY - 8, edgeX, startY + signalGap * 2 + signalH + 8);
    drawingContext.setLineDash([]);
  }

  // Draw clock signal
  stroke(colors.clock);
  strokeWeight(2);
  for (let i = 0; i < numCycles; i++) {
    let x = startX + i * cycleW;
    // Low for first half
    line(x, startY + signalH - 5, x + cycleW / 2, startY + signalH - 5);
    // Rising edge
    line(x + cycleW / 2, startY + signalH - 5, x + cycleW / 2, startY + 5);
    // High for second half
    line(x + cycleW / 2, startY + 5, x + cycleW, startY + 5);
    // Falling edge (if not last)
    if (i < numCycles - 1) {
      line(x + cycleW, startY + 5, x + cycleW, startY + signalH - 5);
    }

    // Rising edge arrow
    fill(colors.edge);
    noStroke();
    triangle(x + cycleW / 2 - 5, startY + signalH + 5,
             x + cycleW / 2 + 5, startY + signalH + 5,
             x + cycleW / 2, startY + signalH - 2);

    // "↑" label above first rising edge
    if (i === 0) {
      fill(colors.clock);
      textAlign(LEFT, CENTER);
      textSize(8);
      textStyle(BOLD);
      text('↑ Rising Edge', x + cycleW / 2 + 4, startY - 2);
      textStyle(NORMAL);
    }
  }

  // Draw D signal
  stroke(colors.d);
  strokeWeight(2);
  for (let i = 0; i < dPattern.length - 1; i++) {
    let x1 = startX + i * (cycleW / 2);
    let x2 = startX + (i + 1) * (cycleW / 2);
    let y1 = startY + signalGap + (dPattern[i] ? 5 : signalH - 5);
    let y2 = startY + signalGap + (dPattern[i + 1] ? 5 : signalH - 5);

    line(x1, y1, x2, y1);
    if (y1 !== y2) {
      line(x2, y1, x2, y2);
    }
  }

  // Draw Q signal
  stroke(colors.q);
  strokeWeight(2);
  for (let i = 0; i < qOutput.length - 1; i++) {
    let x1 = startX + i * (cycleW / 2);
    let x2 = startX + (i + 1) * (cycleW / 2);
    let y1 = startY + signalGap * 2 + (qOutput[i] ? 5 : signalH - 5);
    let y2 = startY + signalGap * 2 + (qOutput[i + 1] ? 5 : signalH - 5);

    line(x1, y1, x2, y1);
    if (y1 !== y2) {
      line(x2, y1, x2, y2);
    }
  }

  // Draw sampling indicators with captured value highlight
  for (let i = 0; i < numCycles; i++) {
    let edgeX = startX + i * cycleW + cycleW / 2;
    let sampledVal = dPattern[i * 2];
    let dY = startY + signalGap + (sampledVal ? 5 : signalH - 5);

    // Sampling dot on D
    fill(colors.edge);
    noStroke();
    ellipse(edgeX, dY, 10);

    // Captured value label inside dot
    fill('white');
    textAlign(CENTER, CENTER);
    textSize(7);
    textStyle(BOLD);
    text(sampledVal ? '1' : '0', edgeX, dY);
    textStyle(NORMAL);

    // Small arrow from D sample down to Q
    let qY = startY + signalGap * 2 + (sampledVal ? 5 : signalH - 5);
    stroke(colors.edge);
    strokeWeight(1);
    drawingContext.setLineDash([2, 2]);
    line(edgeX, dY + 6, edgeX, qY - 6);
    drawingContext.setLineDash([]);

    // Small dot on Q where value appears
    fill(colors.edge);
    noStroke();
    ellipse(edgeX, qY, 6);
  }

  // Time labels
  fill(colors.text);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(9);
  for (let i = 0; i <= numCycles; i++) {
    text(i + 'T', startX + i * cycleW, startY + signalGap * 2 + signalH + 15);
  }
}

function drawLegend() {
  let legendX = 70;
  let legendY = 340;

  fill('#fff');
  stroke('#e0e0e0');
  strokeWeight(1);
  rect(legendX - 10, legendY - 10, 310, 70, 5);

  fill(colors.text);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(11);
  textStyle(BOLD);
  text('Legend:', legendX, legendY + 5);
  textStyle(NORMAL);

  // Clock
  stroke(colors.clock);
  strokeWeight(3);
  line(legendX, legendY + 25, legendX + 30, legendY + 25);
  fill(colors.clock);
  noStroke();
  textSize(10);
  text('CLK (blue)', legendX + 36, legendY + 25);

  // D
  stroke(colors.d);
  strokeWeight(3);
  line(legendX + 130, legendY + 25, legendX + 160, legendY + 25);
  fill(colors.d);
  noStroke();
  text('D (orange)', legendX + 166, legendY + 25);

  // Q
  stroke(colors.q);
  strokeWeight(3);
  line(legendX, legendY + 45, legendX + 30, legendY + 45);
  fill(colors.q);
  noStroke();
  text('Q (purple)', legendX + 36, legendY + 45);

  // Sampling point
  fill(colors.edge);
  noStroke();
  ellipse(legendX + 145, legendY + 45, 9);
  fill('white');
  textSize(6);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text('1', legendX + 145, legendY + 45);
  textStyle(NORMAL);
  fill(colors.text);
  textAlign(LEFT, CENTER);
  textSize(10);
  text('Sampling point (↑)', legendX + 156, legendY + 45);
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
