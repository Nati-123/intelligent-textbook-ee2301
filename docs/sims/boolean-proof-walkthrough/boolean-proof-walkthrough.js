// Boolean Proof Walkthrough MicroSim
// Prove A + AB = A using Boolean algebra laws
// Bloom Level: Apply (L3) - Apply Boolean algebra theorems
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 450;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let currentStep = 0;
let totalSteps;

const TITLE_BG = '#2196F3';
const STEP_BG = '#E3F2FD';
const HIGHLIGHT = '#FF9800';
const RESULT_BG = '#E8F5E9';
const CHANGED_COLOR = '#D32F2F';

let steps = [
  {
    title: "Prove: A + AB = A",
    expr: "A + AB",
    rule: "Absorption Theorem Proof",
    desc: "We will prove that A + AB simplifies to A using Boolean algebra laws.\nThis is known as the Absorption Law.",
    highlight: null
  },
  {
    title: "Step 1: Apply Identity Law",
    expr: "A·1 + AB",
    rule: "Identity Law: A = A·1",
    desc: "Replace A with A·1 since multiplying by 1 does not change the value.\nThis sets up the expression for factoring.",
    highlight: "A·1",
    prev: "A"
  },
  {
    title: "Step 2: Factor out A",
    expr: "A(1 + B)",
    rule: "Distributive Law: A·1 + A·B = A(1 + B)",
    desc: "Factor A out of both terms.\nA·1 + A·B becomes A(1 + B).",
    highlight: "A(",
    prev: "A·1 + AB"
  },
  {
    title: "Step 3: Apply Dominance Law",
    expr: "A · 1",
    rule: "Dominance Law: 1 + B = 1",
    desc: "The OR of 1 with anything is always 1.\nSo (1 + B) simplifies to 1.",
    highlight: "1",
    prev: "(1 + B)"
  },
  {
    title: "Step 4: Apply Identity Law",
    expr: "A",
    rule: "Identity Law: A · 1 = A",
    desc: "Multiplying A by 1 gives A.\nTherefore A + AB = A. ∎",
    highlight: "A",
    prev: "A · 1"
  },
  {
    title: "Proof Complete!",
    expr: "A + AB = A",
    rule: "Absorption Law (Proven)",
    desc: "We have proven the Absorption Law:\nA + AB = A\n\nLaws used: Identity, Distributive, Dominance, Identity",
    highlight: null
  }
];

function setup() {
  updateCanvasSize();
  totalSteps = steps.length;
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  describe('Boolean proof walkthrough showing step-by-step algebraic simplification', LABEL);
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
  textSize(12);
  textStyle(BOLD);
  let rw = textWidth(step.rule) + 20;
  rw = max(rw, 100);
  rect(canvasWidth / 2 - rw / 2, ruleY, rw, 24, 12);
  fill(255);
  textAlign(CENTER, CENTER);
  text(step.rule, canvasWidth / 2, ruleY + 12);

  // Visual area
  let visY = ruleY + 40;
  let visH = 200;
  fill(STEP_BG);
  stroke(200);
  strokeWeight(1);
  rect(margin, visY, w, visH, 5);
  noStroke();

  // Draw expression chain
  drawExpressionChain(step, margin, visY, w, visH);

  // Description
  let descY = visY + visH + 15;
  fill(60);
  textAlign(LEFT, TOP);
  textSize(13);
  textStyle(NORMAL);
  let lines = step.desc.split('\n');
  for (let i = 0; i < lines.length; i++) {
    text(lines[i], margin + 10, descY + i * 18);
  }

  drawButtons();
}

function drawExpressionChain(step, mx, vy, w, vh) {
  let cx = canvasWidth / 2;

  if (currentStep === 0) {
    // Show starting expression large
    fill(60);
    textAlign(CENTER, CENTER);
    textSize(36);
    textStyle(BOLD);
    text('A + AB', cx, vy + vh / 2 - 10);
    textSize(14);
    textStyle(NORMAL);
    fill(100);
    text('Click "Next →" to start the proof', cx, vy + vh / 2 + 30);
    return;
  }

  if (currentStep === steps.length - 1) {
    // Final summary
    fill(RESULT_BG);
    stroke('#4CAF50');
    strokeWeight(2);
    rect(mx + 20, vy + 20, w - 40, vh - 40, 10);
    noStroke();
    fill('#1B5E20');
    textAlign(CENTER, CENTER);
    textSize(32);
    textStyle(BOLD);
    text('A + AB = A  ∎', cx, vy + vh / 2 - 20);

    // Show all steps summary
    textSize(11);
    textStyle(NORMAL);
    fill(100);
    let summarySteps = ['A + AB', 'A·1 + AB', 'A(1 + B)', 'A·1', 'A'];
    let arrows = ' → ';
    text(summarySteps.join(arrows), cx, vy + vh / 2 + 20);
    return;
  }

  // Show previous expression → current expression
  let prevExpr = steps[currentStep - 1].expr;
  let currExpr = step.expr;

  // Previous expression (faded)
  fill(150);
  textAlign(CENTER, CENTER);
  textSize(24);
  textStyle(NORMAL);
  text(prevExpr, cx, vy + vh / 2 - 40);

  // Arrow
  fill(HIGHLIGHT);
  textSize(20);
  text('↓', cx, vy + vh / 2 - 10);

  // Current expression (bold, colored)
  fill(TITLE_BG);
  textSize(32);
  textStyle(BOLD);
  text(currExpr, cx, vy + vh / 2 + 25);
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
  textSize(14);
  textStyle(BOLD);
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
