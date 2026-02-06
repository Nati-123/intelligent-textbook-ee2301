// Flip-Flop Timing Walkthrough MicroSim
// Trace D flip-flop with clock and input timing diagram
// Bloom Level: Apply (L3) - Apply flip-flop timing analysis
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 480;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let currentStep = 0;
let totalSteps;

const TITLE_BG = '#2196F3';
const STEP_BG = '#E3F2FD';
const HIGHLIGHT = '#FF9800';
const RESULT_BG = '#E8F5E9';
const CLK_COLOR = '#1976D2';
const D_COLOR = '#E91E63';
const Q_COLOR = '#388E3C';

// D values at each rising edge (8 edges)
let dValues = [1, 0, 1, 1, 0, 0, 1, 0];
// Q values after each edge (Q starts at 0)
let qValues = [0, 1, 0, 1, 1, 0, 0, 1, 0]; // index 0 is initial, 1-8 after each edge

let steps = [
  {
    title: "D Flip-Flop Timing Analysis",
    desc: "We will trace the output Q of a positive-edge-triggered D\nflip-flop given a clock and data input sequence.",
    rule: "Positive-Edge-Triggered D Flip-Flop",
    visual: "intro",
    edgesShown: 0
  },
  {
    title: "Step 1: Clock and D Input Waveforms",
    desc: "The clock (CLK) is a regular square wave. D changes between\nclock edges. Q is initially 0 (unknown state → assume 0).",
    rule: "Setup: CLK, D waveforms given",
    visual: "timing",
    edgesShown: 0
  },
  {
    title: "Step 2: Rising Edge 1",
    desc: "At the first rising clock edge, D = 1.\nQ samples D and becomes 1.",
    rule: "Rising edge: Q ← D",
    visual: "timing",
    edgesShown: 1
  },
  {
    title: "Step 3: Rising Edge 2",
    desc: "At the second rising clock edge, D = 0.\nQ samples D and becomes 0.",
    rule: "Rising edge: Q ← D",
    visual: "timing",
    edgesShown: 2
  },
  {
    title: "Step 4: Rising Edge 3",
    desc: "At the third rising clock edge, D = 1.\nQ samples D and becomes 1.",
    rule: "Rising edge: Q ← D",
    visual: "timing",
    edgesShown: 3
  },
  {
    title: "Step 5: Rising Edge 4",
    desc: "At the fourth rising clock edge, D = 1.\nQ samples D and stays at 1 (no change).",
    rule: "Rising edge: Q ← D (Q unchanged if D = Q)",
    visual: "timing",
    edgesShown: 4
  },
  {
    title: "Step 6: Rising Edges 5-6",
    desc: "Edge 5: D=0 → Q becomes 0.\nEdge 6: D=0 → Q stays 0.",
    rule: "Rising edge: Q ← D",
    visual: "timing",
    edgesShown: 6
  },
  {
    title: "Step 7: Rising Edges 7-8",
    desc: "Edge 7: D=1 → Q becomes 1.\nEdge 8: D=0 → Q becomes 0.",
    rule: "Rising edge: Q ← D",
    visual: "timing",
    edgesShown: 8
  },
  {
    title: "Complete Timing Diagram",
    desc: "Key insight: Q only changes at rising clock edges.\nBetween edges, Q holds its value regardless of D changes.\nThis is the fundamental behavior of edge-triggered storage.",
    rule: "D Flip-Flop: Edge-Triggered Storage Element",
    visual: "complete"
  }
];

function setup() {
  updateCanvasSize();
  totalSteps = steps.length;
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  describe('D flip-flop timing diagram walkthrough', LABEL);
}

function draw() {
  updateCanvasSize();
  background(255);

  let step = steps[currentStep];
  let margin = 15;
  let w = canvasWidth - 2 * margin;

  // Title bar
  fill(TITLE_BG);
  noStroke();
  rect(margin, margin, w, 40, 5);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(16);
  textStyle(BOLD);
  text(step.title, canvasWidth / 2, margin + 20);

  // Step indicator
  fill(100);
  textSize(12);
  textStyle(NORMAL);
  textAlign(RIGHT, TOP);
  text('Step ' + (currentStep + 1) + ' of ' + totalSteps, canvasWidth - margin - 5, margin + 50);

  // Progress bar
  let progY = margin + 48;
  fill(220);
  rect(margin, progY, w, 6, 3);
  fill(TITLE_BG);
  rect(margin, progY, w * (currentStep + 1) / totalSteps, 6, 3);

  // Rule label
  fill(HIGHLIGHT);
  noStroke();
  let ruleY = margin + 65;
  textSize(11);
  textStyle(BOLD);
  let rw = textWidth(step.rule) + 20;
  rw = max(rw, 100);
  rect(canvasWidth / 2 - rw / 2, ruleY, rw, 24, 12);
  fill(255);
  textAlign(CENTER, CENTER);
  text(step.rule, canvasWidth / 2, ruleY + 12);

  // Visual area
  let visY = ruleY + 40;
  let visH = drawHeight - visY - 60;
  fill(STEP_BG);
  stroke(200);
  strokeWeight(1);
  rect(margin, visY, w, visH, 5);
  noStroke();

  if (step.visual === 'intro') {
    drawIntro(margin, visY, w, visH);
  } else {
    drawTimingDiagram(margin, visY, w, visH, step.edgesShown, step.visual === 'complete');
  }

  // Description
  let descY = drawHeight - 52;
  fill(60);
  textAlign(LEFT, TOP);
  textSize(12);
  textStyle(NORMAL);
  let lines = step.desc.split('\n');
  for (let i = 0; i < lines.length; i++) {
    text(lines[i], margin + 10, descY + i * 15);
  }

  drawButtons();
}

function drawIntro(mx, vy, w, vh) {
  let cx = canvasWidth / 2;

  // D flip-flop symbol
  let ffX = cx - 45;
  let ffY = vy + 20;
  let ffW = 90;
  let ffH = 80;

  fill(255);
  stroke(60); strokeWeight(2);
  rect(ffX, ffY, ffW, ffH, 3);

  // Labels inside
  noStroke();
  fill(60);
  textAlign(LEFT, CENTER);
  textSize(14); textStyle(BOLD);
  text('D', ffX + 8, ffY + 25);
  textAlign(RIGHT, CENTER);
  text('Q', ffX + ffW - 8, ffY + 25);
  // Clock triangle
  stroke(60); strokeWeight(1.5);
  let triY = ffY + ffH - 20;
  line(ffX, triY - 8, ffX + 12, triY);
  line(ffX, triY + 8, ffX + 12, triY);
  noStroke();
  fill(60);
  textAlign(CENTER, CENTER);
  textSize(10);
  text('CLK', ffX + ffW / 2, ffY + ffH - 12);

  // Input/output wires
  stroke(D_COLOR); strokeWeight(2);
  line(ffX - 30, ffY + 25, ffX, ffY + 25);
  stroke(Q_COLOR);
  line(ffX + ffW, ffY + 25, ffX + ffW + 30, ffY + 25);
  stroke(CLK_COLOR);
  line(cx, ffY + ffH, cx, ffY + ffH + 20);
  noStroke();

  // Labels
  fill(D_COLOR); textSize(13); textStyle(BOLD);
  textAlign(RIGHT, CENTER);
  text('D', ffX - 35, ffY + 25);
  fill(Q_COLOR);
  textAlign(LEFT, CENTER);
  text('Q', ffX + ffW + 35, ffY + 25);
  fill(CLK_COLOR);
  textAlign(CENTER, TOP);
  text('CLK', cx, ffY + ffH + 25);

  fill(100);
  textAlign(CENTER, CENTER);
  textSize(12); textStyle(NORMAL);
  text('Positive-edge-triggered D flip-flop', cx, vy + 135);
  text('Q captures D value at each rising clock edge', cx, vy + 155);
  fill(HIGHLIGHT);
  textSize(13);
  text('Click "Next →" to begin', cx, vy + vh - 15);
}

function drawTimingDiagram(mx, vy, w, vh, edgesShown, isComplete) {
  let labelW = 35;
  let waveX = mx + labelW + 10;
  let waveW = w - labelW - 25;
  let cycleW = waveW / 8;
  let waveH = 35;
  let highY = 5;   // offset from baseline for high level
  let lowY = waveH; // offset from baseline for low level

  // CLK waveform
  let clkY = vy + 20;
  fill(CLK_COLOR);
  textAlign(RIGHT, CENTER);
  textSize(12); textStyle(BOLD);
  text('CLK', mx + labelW, clkY + waveH / 2);

  stroke(CLK_COLOR); strokeWeight(2); noFill();
  beginShape();
  for (let i = 0; i < 8; i++) {
    let x = waveX + i * cycleW;
    // Low for first half, high for second half
    vertex(x, clkY + lowY);
    vertex(x + cycleW / 2, clkY + lowY);
    vertex(x + cycleW / 2, clkY + highY);
    vertex(x + cycleW, clkY + highY);
    vertex(x + cycleW, clkY + lowY);
  }
  endShape();
  noStroke();

  // D waveform
  let dY = clkY + waveH + 25;
  fill(D_COLOR);
  textAlign(RIGHT, CENTER);
  textSize(12); textStyle(BOLD);
  text('D', mx + labelW, dY + waveH / 2);

  // D signal: changes before each rising edge
  stroke(D_COLOR); strokeWeight(2); noFill();
  beginShape();
  for (let i = 0; i < 8; i++) {
    let x = waveX + i * cycleW;
    let val = dValues[i];
    let yVal = val ? highY : lowY;
    vertex(x, dY + yVal);
    vertex(x + cycleW, dY + yVal);
    // Transition to next value
    if (i < 7) {
      let nextVal = dValues[i + 1];
      let nextYVal = nextVal ? highY : lowY;
      vertex(x + cycleW, dY + nextYVal);
    }
  }
  endShape();
  noStroke();

  // Q waveform (drawn up to edgesShown)
  let qY = dY + waveH + 25;
  fill(Q_COLOR);
  textAlign(RIGHT, CENTER);
  textSize(12); textStyle(BOLD);
  text('Q', mx + labelW, qY + waveH / 2);

  if (edgesShown > 0 || isComplete) {
    let showEdges = isComplete ? 8 : edgesShown;
    stroke(Q_COLOR); strokeWeight(2); noFill();
    beginShape();
    // Initial Q=0
    vertex(waveX, qY + lowY);
    for (let i = 0; i < showEdges; i++) {
      // Rising edge is at waveX + (i+0.5)*cycleW (middle of each cycle, where CLK goes high... actually rising edge is at i*cycleW + cycleW/2)
      let edgeX = waveX + i * cycleW + cycleW / 2;
      let prevQ = qValues[i];
      let newQ = qValues[i + 1];
      // Hold previous value until edge
      vertex(edgeX, qY + (prevQ ? highY : lowY));
      // Transition at edge
      vertex(edgeX, qY + (newQ ? highY : lowY));
      // Hold new value until next edge (or end)
      if (i < showEdges - 1) {
        let nextEdgeX = waveX + (i + 1) * cycleW + cycleW / 2;
        vertex(nextEdgeX, qY + (newQ ? highY : lowY));
      } else {
        vertex(waveX + waveW, qY + (newQ ? highY : lowY));
      }
    }
    if (edgesShown === 0 && !isComplete) {
      vertex(waveX + waveW, qY + lowY);
    }
    endShape();
    noStroke();
  } else {
    // Q not yet determined - draw dashed
    stroke(200); strokeWeight(1);
    for (let x = waveX; x < waveX + waveW; x += 8) {
      line(x, qY + waveH / 2, x + 4, qY + waveH / 2);
    }
    noStroke();
    fill(180);
    textAlign(CENTER, CENTER);
    textSize(10);
    text('(to be determined)', waveX + waveW / 2, qY + waveH + 10);
  }

  // Rising edge markers
  for (let i = 0; i < 8; i++) {
    let edgeX = waveX + i * cycleW + cycleW / 2;
    if (i < edgesShown || isComplete) {
      // Arrow marker
      stroke(HIGHLIGHT); strokeWeight(1.5);
      line(edgeX, clkY + lowY + 5, edgeX, qY + waveH + 5);
      // Small arrow head
      line(edgeX - 3, clkY + lowY + 10, edgeX, clkY + lowY + 5);
      line(edgeX + 3, clkY + lowY + 10, edgeX, clkY + lowY + 5);
      noStroke();

      // Edge number
      fill(HIGHLIGHT);
      textAlign(CENTER, TOP);
      textSize(9); textStyle(NORMAL);
      text(i + 1, edgeX, qY + waveH + 8);
    }
  }

  // Highlight current edge
  if (edgesShown > 0 && !isComplete && edgesShown <= 8) {
    let currentEdge = edgesShown - 1;
    // Just highlight the last shown edge more prominently
    let edgeX = waveX + currentEdge * cycleW + cycleW / 2;
    stroke(HIGHLIGHT); strokeWeight(2);
    line(edgeX - 5, clkY - 5, edgeX + 5, clkY - 5);
    line(edgeX - 5, clkY - 5, edgeX, clkY - 10);
    line(edgeX + 5, clkY - 5, edgeX, clkY - 10);
    noStroke();
  }
}

function drawButtons() {
  let btnY = drawHeight + 8;
  let btnW = 90;
  let btnH = 34;
  let gap = 10;
  let totalW = btnW * 3 + gap * 2;
  let startX = (canvasWidth - totalW) / 2;

  let prevEnabled = currentStep > 0;
  fill(prevEnabled ? '#1976D2' : '#BDBDBD');
  noStroke();
  rect(startX, btnY, btnW, btnH, 5);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(14); textStyle(BOLD);
  text('← Previous', startX + btnW / 2, btnY + btnH / 2);

  fill('#757575');
  rect(startX + btnW + gap, btnY, btnW, btnH, 5);
  fill(255);
  text('Reset', startX + btnW + gap + btnW / 2, btnY + btnH / 2);

  let nextEnabled = currentStep < totalSteps - 1;
  fill(nextEnabled ? '#388E3C' : '#BDBDBD');
  rect(startX + 2 * (btnW + gap), btnY, btnW, btnH, 5);
  fill(255);
  text('Next →', startX + 2 * (btnW + gap) + btnW / 2, btnY + btnH / 2);
}

function mousePressed() {
  let btnY = drawHeight + 8;
  let btnW = 90;
  let btnH = 34;
  let gap = 10;
  let totalW = btnW * 3 + gap * 2;
  let startX = (canvasWidth - totalW) / 2;

  if (mouseY >= btnY && mouseY <= btnY + btnH) {
    if (mouseX >= startX && mouseX <= startX + btnW && currentStep > 0) {
      currentStep--;
    } else if (mouseX >= startX + btnW + gap && mouseX <= startX + 2 * btnW + gap) {
      currentStep = 0;
    } else if (mouseX >= startX + 2 * (btnW + gap) && mouseX <= startX + 2 * (btnW + gap) + btnW && currentStep < totalSteps - 1) {
      currentStep++;
    }
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
