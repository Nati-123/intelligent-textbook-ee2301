// Boolean Proof Walkthrough MicroSim
// Prove Boolean algebra theorems using step-by-step laws
// Bloom Level: Apply (L3) - Apply Boolean algebra theorems
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 450;
let controlHeight = 90;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let currentStep = 0;
let totalSteps;

const TITLE_BG = '#2196F3';
const STEP_BG = '#E3F2FD';
const HIGHLIGHT = '#FF9800';
const RESULT_BG = '#E8F5E9';
const CHANGED_COLOR = '#D32F2F';

// UI elements
let presetSelect;
let goButton;

// Preset proofs
let presets = [
  {
    label: "A + AB = A",
    startExpr: "A + AB",
    finalExpr: "A + AB = A",
    proofName: "Absorption Theorem Proof",
    lawName: "Absorption Law (Proven)",
    steps: [
      { title: "Prove: A + AB = A", expr: "A + AB", rule: "Absorption Theorem Proof", desc: "We will prove that A + AB simplifies to A using Boolean algebra laws.\nThis is known as the Absorption Law.", highlight: null },
      { title: "Step 1: Apply Identity Law", expr: "A\u00b71 + AB", rule: "Identity Law: A = A\u00b71", desc: "Replace A with A\u00b71 since multiplying by 1 does not change the value.\nThis sets up the expression for factoring.", highlight: "A\u00b71", prev: "A" },
      { title: "Step 2: Factor out A", expr: "A(1 + B)", rule: "Distributive Law: A\u00b71 + A\u00b7B = A(1 + B)", desc: "Factor A out of both terms.\nA\u00b71 + A\u00b7B becomes A(1 + B).", highlight: "A(", prev: "A\u00b71 + AB" },
      { title: "Step 3: Apply Dominance Law", expr: "A \u00b7 1", rule: "Dominance Law: 1 + B = 1", desc: "The OR of 1 with anything is always 1.\nSo (1 + B) simplifies to 1.", highlight: "1", prev: "(1 + B)" },
      { title: "Step 4: Apply Identity Law", expr: "A", rule: "Identity Law: A \u00b7 1 = A", desc: "Multiplying A by 1 gives A.\nTherefore A + AB = A. \u220e", highlight: "A", prev: "A \u00b7 1" },
      { title: "Proof Complete!", expr: "A + AB = A", rule: "Absorption Law (Proven)", desc: "We have proven the Absorption Law:\nA + AB = A\n\nLaws used: Identity, Distributive, Dominance, Identity", highlight: null }
    ],
    summarySteps: ["A + AB", "A\u00b71 + AB", "A(1 + B)", "A\u00b71", "A"]
  },
  {
    label: "A(A + B) = A",
    startExpr: "A(A + B)",
    finalExpr: "A(A + B) = A",
    proofName: "Absorption (Dual) Proof",
    lawName: "Absorption Dual (Proven)",
    steps: [
      { title: "Prove: A(A + B) = A", expr: "A(A + B)", rule: "Absorption (Dual) Proof", desc: "We will prove that A(A + B) simplifies to A.\nThis is the dual form of the Absorption Law.", highlight: null },
      { title: "Step 1: Distribute A", expr: "AA + AB", rule: "Distributive Law: A(A + B) = AA + AB", desc: "Apply the distributive law to expand the expression.\nA(A + B) becomes A\u00b7A + A\u00b7B.", highlight: "AA + AB", prev: "A(A + B)" },
      { title: "Step 2: Apply Idempotent Law", expr: "A + AB", rule: "Idempotent Law: AA = A", desc: "A AND A is just A (idempotent law).\nSo AA + AB becomes A + AB.", highlight: "A", prev: "AA" },
      { title: "Step 3: Apply Absorption Law", expr: "A", rule: "Absorption Law: A + AB = A", desc: "By the absorption law we already proved,\nA + AB = A.", highlight: "A", prev: "A + AB" },
      { title: "Proof Complete!", expr: "A(A + B) = A", rule: "Absorption Dual (Proven)", desc: "We have proven the dual Absorption Law:\nA(A + B) = A\n\nLaws used: Distributive, Idempotent, Absorption", highlight: null }
    ],
    summarySteps: ["A(A + B)", "AA + AB", "A + AB", "A"]
  },
  {
    label: "A + A'B = A + B",
    startExpr: "A + A'B",
    finalExpr: "A + A'B = A + B",
    proofName: "Simplification Theorem Proof",
    lawName: "Simplification Theorem (Proven)",
    steps: [
      { title: "Prove: A + A'B = A + B", expr: "A + A'B", rule: "Simplification Theorem Proof", desc: "We will prove that A + A'B simplifies to A + B.\nThis is a commonly used Boolean simplification.", highlight: null },
      { title: "Step 1: OR with AB", expr: "(A + AB) + A'B", rule: "Absorption: A = A + AB", desc: "By absorption law, A = A + AB.\nReplace A with (A + AB).", highlight: "(A + AB)", prev: "A" },
      { title: "Step 2: Rearrange terms", expr: "A + (AB + A'B)", rule: "Associative Law: regroup", desc: "Use associative law to regroup.\nGroup the last two terms together.", highlight: "(AB + A'B)", prev: "AB) + A'B" },
      { title: "Step 3: Factor out B", expr: "A + B(A + A')", rule: "Distributive Law: AB + A'B = B(A + A')", desc: "Factor B out of AB + A'B.\nAB + A'B = B(A + A').", highlight: "B(A + A')", prev: "AB + A'B" },
      { title: "Step 4: Apply Complement Law", expr: "A + B\u00b71", rule: "Complement Law: A + A' = 1", desc: "A OR A' is always 1.\nSo (A + A') = 1.", highlight: "1", prev: "(A + A')" },
      { title: "Step 5: Apply Identity Law", expr: "A + B", rule: "Identity Law: B\u00b71 = B", desc: "B times 1 is just B.\nTherefore A + A'B = A + B. \u220e", highlight: "B", prev: "B\u00b71" },
      { title: "Proof Complete!", expr: "A + A'B = A + B", rule: "Simplification Theorem (Proven)", desc: "We have proven the Simplification Theorem:\nA + A'B = A + B\n\nLaws used: Absorption, Associative, Distributive, Complement, Identity", highlight: null }
    ],
    summarySteps: ["A + A'B", "(A + AB) + A'B", "A + B(A + A')", "A + B\u00b71", "A + B"]
  },
  {
    label: "(A + B)(A + B') = A",
    startExpr: "(A + B)(A + B')",
    finalExpr: "(A + B)(A + B') = A",
    proofName: "Consensus-Adjacent Proof",
    lawName: "Consensus-Adjacent (Proven)",
    steps: [
      { title: "Prove: (A+B)(A+B') = A", expr: "(A + B)(A + B')", rule: "Consensus-Adjacent Proof", desc: "We will prove that (A + B)(A + B') simplifies to A.\nThis uses the distributive and complement laws.", highlight: null },
      { title: "Step 1: Distribute (FOIL)", expr: "AA + AB' + BA + BB'", rule: "Distributive Law: expand product", desc: "Expand using the distributive law (FOIL method).\n(A+B)(A+B') = AA + AB' + BA + BB'", highlight: "AA + AB' + BA + BB'", prev: "(A + B)(A + B')" },
      { title: "Step 2: Simplify AA and BB'", expr: "A + AB' + AB + 0", rule: "Idempotent: AA=A; Complement: BB'=0", desc: "AA = A (idempotent law).\nBB' = 0 (complement law).", highlight: "A", prev: "AA" },
      { title: "Step 3: Drop the 0 term", expr: "A + AB' + AB", rule: "Identity Law: X + 0 = X", desc: "Adding 0 does not change the value.\nRemove the 0 term.", highlight: "A + AB' + AB", prev: "+ 0" },
      { title: "Step 4: Factor A from last two", expr: "A + A(B' + B)", rule: "Distributive: AB' + AB = A(B' + B)", desc: "Factor A out of the last two terms.\nAB' + AB = A(B' + B).", highlight: "A(B' + B)", prev: "AB' + AB" },
      { title: "Step 5: Apply Complement Law", expr: "A + A\u00b71", rule: "Complement Law: B' + B = 1", desc: "B' + B is always 1.\nSo A(B' + B) = A\u00b71.", highlight: "1", prev: "(B' + B)" },
      { title: "Step 6: Apply Identity & Absorption", expr: "A", rule: "Identity: A\u00b71 = A; Absorption: A + A = A", desc: "A\u00b71 = A, and A + A = A.\nTherefore (A+B)(A+B') = A. \u220e", highlight: "A", prev: "A + A\u00b71" },
      { title: "Proof Complete!", expr: "(A+B)(A+B') = A", rule: "Consensus-Adjacent (Proven)", desc: "We have proven:\n(A + B)(A + B') = A\n\nLaws used: Distributive, Idempotent, Complement, Identity, Absorption", highlight: null }
    ],
    summarySteps: ["(A+B)(A+B')", "AA+AB'+BA+BB'", "A+AB'+AB", "A+A(B'+B)", "A+A\u00b71", "A"]
  }
];

let activePreset = presets[0];
let steps = activePreset.steps.slice();

function setup() {
  updateCanvasSize();
  totalSteps = steps.length;
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  // Dropdown for preset selection
  presetSelect = createSelect();
  for (let i = 0; i < presets.length; i++) {
    presetSelect.option(presets[i].label, i);
  }

  // Go button
  goButton = createButton('Go');
  goButton.mousePressed(handleGo);
  goButton.style('background-color', '#388E3C');
  goButton.style('color', 'white');
  goButton.style('border', 'none');
  goButton.style('padding', '4px 16px');
  goButton.style('border-radius', '4px');
  goButton.style('cursor', 'pointer');
  goButton.style('font-weight', 'bold');

  positionUIElements();
  describe('Boolean proof walkthrough showing step-by-step algebraic simplification', LABEL);
}

function positionUIElements() {
  let mainRect = document.querySelector('main').getBoundingClientRect();
  presetSelect.position(mainRect.left + 65, mainRect.top + drawHeight + 10);
  goButton.position(mainRect.left + 250, mainRect.top + drawHeight + 8);
}

function handleGo() {
  let idx = parseInt(presetSelect.value());
  activePreset = presets[idx];
  steps = activePreset.steps.slice();
  totalSteps = steps.length;
  currentStep = 0;
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
  text(step.desc, margin + 10, descY, w - 20);

  // Preset label
  fill(60);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(13);
  textStyle(BOLD);
  text('Proof:', margin, drawHeight + 18);

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
    text(activePreset.startExpr, cx, vy + vh / 2 - 10);
    textSize(14);
    textStyle(NORMAL);
    fill(100);
    text('Click "Next \u2192" to start the proof', cx, vy + vh / 2 + 30);
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
    textStyle(BOLD);
    let finalSize = 32;
    textSize(finalSize);
    let finalText = activePreset.finalExpr + '  \u220e';
    while (textWidth(finalText) > w - 60 && finalSize > 16) {
      finalSize -= 2;
      textSize(finalSize);
    }
    text(finalText, cx, vy + vh / 2 - 20);

    // Show all steps summary
    textSize(10);
    textStyle(NORMAL);
    fill(100);
    let arrows = ' \u2192 ';
    textAlign(CENTER, TOP);
    text(activePreset.summarySteps.join(arrows), cx, vy + vh / 2 + 10, w - 60);
    return;
  }

  // Show previous expression -> current expression
  let prevExpr = steps[currentStep - 1].expr;
  let currExpr = step.expr;

  // Previous expression (faded) - auto-size to fit box
  fill(150);
  textAlign(CENTER, CENTER);
  textStyle(NORMAL);
  let prevSize = 24;
  textSize(prevSize);
  while (textWidth(prevExpr) > w - 40 && prevSize > 12) {
    prevSize -= 2;
    textSize(prevSize);
  }
  text(prevExpr, cx, vy + vh / 2 - 40);

  // Arrow
  fill(HIGHLIGHT);
  textSize(20);
  text('\u2193', cx, vy + vh / 2 - 10);

  // Current expression (bold, colored) - auto-size to fit box
  fill(TITLE_BG);
  textStyle(BOLD);
  let exprSize = 32;
  textSize(exprSize);
  while (textWidth(currExpr) > w - 40 && exprSize > 16) {
    exprSize -= 2;
    textSize(exprSize);
  }
  text(currExpr, cx, vy + vh / 2 + 25);
}

function drawButtons() {
  let btnY = drawHeight + 48;
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
  text('\u2190 Previous', startX + btnW / 2, btnY + btnH / 2);

  fill('#757575');
  rect(startX + btnW + gap, btnY, btnW, btnH, 5);
  fill(255);
  text('Reset', startX + btnW + gap + btnW / 2, btnY + btnH / 2);

  let nextEnabled = currentStep < totalSteps - 1;
  fill(nextEnabled ? '#388E3C' : '#BDBDBD');
  rect(startX + 2 * (btnW + gap), btnY, btnW, btnH, 5);
  fill(255);
  text('Next \u2192', startX + 2 * (btnW + gap) + btnW / 2, btnY + btnH / 2);
}

function mousePressed() {
  let btnY = drawHeight + 48;
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
  positionUIElements();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
