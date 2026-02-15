// Multi-Level Circuit Analyzer MicroSim
// Analyze propagation delay and critical paths
// Bloom Level: Analyze/Evaluate (L4-L5)

let containerWidth;
let canvasWidth = 400;
let drawHeight = 450;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;

let animateBtn, resetBtn;
let animating = false;
let animProgress = 0;
let gateDelay = 2; // ns per gate

const colors = {
  gate: '#2196F3',
  gateStroke: '#1565C0',
  wire: '#666',
  signal: '#4CAF50',
  critical: '#F44336',
  bg: '#f5f5f5',
  text: '#212121'
};

// Circuit definition: 3-level factored circuit
// F = A(B + C(D + E))
const gates = [
  { id: 0, type: 'OR', x: 80, y: 280, inputs: ['D', 'E'], level: 1 },
  { id: 1, type: 'AND', x: 160, y: 230, inputs: ['C', 'g0'], level: 2 },
  { id: 2, type: 'OR', x: 240, y: 180, inputs: ['B', 'g1'], level: 3 },
  { id: 3, type: 'AND', x: 320, y: 150, inputs: ['A', 'g2'], level: 4 }
];

const inputs = [
  { name: 'A', x: 40, y: 120 },
  { name: 'B', x: 40, y: 180 },
  { name: 'C', x: 40, y: 230 },
  { name: 'D', x: 40, y: 280 },
  { name: 'E', x: 40, y: 330 }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  animateBtn = createButton('▶ Animate Signal');
  animateBtn.mousePressed(toggleAnimate);

  resetBtn = createButton('Reset');
  resetBtn.mousePressed(resetAnim);

  positionUIElements();
  describe('Multi-level circuit analyzer showing propagation delay', LABEL);
}

function positionUIElements() {
  let mainRect = document.querySelector('main').getBoundingClientRect();
  animateBtn.position(mainRect.left + 20, mainRect.top + drawHeight + 15);
  resetBtn.position(mainRect.left + 150, mainRect.top + drawHeight + 15);
}

function toggleAnimate() {
  animating = !animating;
  if (animating) {
    animProgress = 0;
    animateBtn.html('⏸ Pause');
  } else {
    animateBtn.html('▶ Resume');
  }
}

function resetAnim() {
  animating = false;
  animProgress = 0;
  animateBtn.html('▶ Animate Signal');
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
  text('Multi-Level Circuit Analyzer', canvasWidth / 2, 10);

  // Circuit expression
  textSize(14);
  fill('#1565C0');
  text('F = A(B + C(D + E))', canvasWidth / 2, 35);

  textSize(11);
  fill('#666');
  text('4-level factored implementation', canvasWidth / 2, 55);

  // Draw circuit
  drawCircuit();

  // Draw level indicators
  drawLevelIndicators();

  // Draw timing info
  drawTimingInfo();

  // Update animation
  if (animating) {
    animProgress += 0.5;
    if (animProgress > 100) {
      animProgress = 0;
    }
  }

  // Critical path info
  fill(colors.text);
  textAlign(RIGHT, CENTER);
  textSize(11);
  text(`Gate delay: ${gateDelay} ns`, canvasWidth - 20, drawHeight + 50);
}

function drawCircuit() {
  // Draw wires first
  stroke(colors.wire);
  strokeWeight(2);

  // Input to gate 0 (D, E -> OR)
  line(inputs[3].x + 20, inputs[3].y, gates[0].x, gates[0].y - 10);
  line(inputs[4].x + 20, inputs[4].y, gates[0].x, gates[0].y + 10);

  // Input C and gate 0 to gate 1
  line(inputs[2].x + 20, inputs[2].y, gates[1].x, gates[1].y - 10);
  line(gates[0].x + 50, gates[0].y, gates[1].x, gates[1].y + 10);

  // Input B and gate 1 to gate 2
  line(inputs[1].x + 20, inputs[1].y, gates[2].x, gates[2].y - 10);
  line(gates[1].x + 50, gates[1].y, gates[2].x, gates[2].y + 10);

  // Input A and gate 2 to gate 3
  line(inputs[0].x + 20, inputs[0].y, gates[3].x, gates[3].y - 15);
  line(gates[2].x + 50, gates[2].y, gates[3].x, gates[3].y + 15);

  // Output
  line(gates[3].x + 50, gates[3].y, gates[3].x + 80, gates[3].y);

  // Draw critical path highlight
  if (animating || animProgress > 0) {
    drawCriticalPath();
  }

  // Draw inputs
  inputs.forEach(inp => {
    fill('#e3f2fd');
    stroke('#90caf9');
    strokeWeight(2);
    ellipse(inp.x, inp.y, 30);

    fill(colors.text);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(14);
    text(inp.name, inp.x, inp.y);
  });

  // Draw gates
  gates.forEach(gate => {
    drawGate(gate);
  });

  // Draw output
  fill('#c8e6c9');
  stroke('#81c784');
  strokeWeight(2);
  ellipse(gates[3].x + 100, gates[3].y, 30);

  fill(colors.text);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);
  text('F', gates[3].x + 100, gates[3].y);
}

function drawGate(gate) {
  let x = gate.x;
  let y = gate.y;
  let w = 50;
  let h = 35;

  // Highlight if signal has reached this gate
  let signalReached = animProgress > gate.level * 20;
  let gateColor = signalReached ? colors.signal : colors.gate;

  fill(gateColor);
  stroke(colors.gateStroke);
  strokeWeight(2);

  if (gate.type === 'AND') {
    beginShape();
    vertex(x, y - h/2);
    vertex(x + w * 0.5, y - h/2);
    bezierVertex(x + w, y - h/2, x + w, y + h/2, x + w * 0.5, y + h/2);
    vertex(x, y + h/2);
    endShape(CLOSE);
  } else {
    beginShape();
    vertex(x, y - h/2);
    bezierVertex(x + w * 0.5, y - h/2, x + w * 0.8, y - h/4, x + w, y);
    bezierVertex(x + w * 0.8, y + h/4, x + w * 0.5, y + h/2, x, y + h/2);
    bezierVertex(x + w * 0.15, y, x + w * 0.15, y, x, y - h/2);
    endShape(CLOSE);
  }

  // Gate label
  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(10);
  text(gate.type, x + w * 0.4, y);

  // Delay label
  fill(colors.text);
  textSize(9);
  text(`${gateDelay}ns`, x + w/2, y + h/2 + 12);
}

function drawCriticalPath() {
  // Critical path: D/E -> g0 -> g1 -> g2 -> g3 -> F (4 levels)
  stroke(colors.critical);
  strokeWeight(4);

  let progress = animProgress / 100;

  // Animate along critical path
  if (progress > 0) {
    // D to gate 0
    let p1 = min(progress * 5, 1);
    line(inputs[3].x + 20, inputs[3].y,
         lerp(inputs[3].x + 20, gates[0].x, p1),
         lerp(inputs[3].y, gates[0].y - 10, p1));
  }

  if (progress > 0.2) {
    // Gate 0 to gate 1
    let p2 = min((progress - 0.2) * 5, 1);
    line(gates[0].x + 50, gates[0].y,
         lerp(gates[0].x + 50, gates[1].x, p2),
         lerp(gates[0].y, gates[1].y + 10, p2));
  }

  if (progress > 0.4) {
    // Gate 1 to gate 2
    let p3 = min((progress - 0.4) * 5, 1);
    line(gates[1].x + 50, gates[1].y,
         lerp(gates[1].x + 50, gates[2].x, p3),
         lerp(gates[1].y, gates[2].y + 10, p3));
  }

  if (progress > 0.6) {
    // Gate 2 to gate 3
    let p4 = min((progress - 0.6) * 5, 1);
    line(gates[2].x + 50, gates[2].y,
         lerp(gates[2].x + 50, gates[3].x, p4),
         lerp(gates[2].y, gates[3].y + 15, p4));
  }

  if (progress > 0.8) {
    // Gate 3 to output
    let p5 = min((progress - 0.8) * 5, 1);
    line(gates[3].x + 50, gates[3].y,
         lerp(gates[3].x + 50, gates[3].x + 80, p5),
         gates[3].y);
  }
}

function drawLevelIndicators() {
  let y = 380;

  fill(colors.text);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(11);
  text('Logic Levels:', 60, y);

  for (let i = 1; i <= 4; i++) {
    let x = 100 + (i - 1) * 70;
    fill('#e3f2fd');
    stroke('#90caf9');
    strokeWeight(1);
    rect(x, y - 5, 50, 25, 3);

    fill(colors.text);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(10);
    text(`Level ${i}`, x + 25, y + 7);
  }
}

function drawTimingInfo() {
  let x = canvasWidth - 130;
  let y = 90;

  fill('#fff3e0');
  stroke('#ffcc80');
  strokeWeight(1);
  rect(x - 10, y - 10, 120, 90, 5);

  fill(colors.text);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(11);
  text('Timing Analysis', x, y);

  textSize(10);
  text(`Levels: 4`, x, y + 20);
  text(`Gate delay: ${gateDelay} ns`, x, y + 35);
  text(`Critical path:`, x, y + 50);

  fill(colors.critical);
  text(`${4 * gateDelay} ns total`, x, y + 65);
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
