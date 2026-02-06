// Minterm Expansion Walkthrough MicroSim
// Express F(A,B,C) = A'B + BC' as sum of minterms
// Bloom Level: Apply (L3) - Apply minterm expansion technique
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
const TERM1_COLOR = '#E91E63';
const TERM2_COLOR = '#9C27B0';

let steps = [
  {
    title: "Expand F(A,B,C) = A'B + BC' to Minterms",
    desc: "We will expand each product term to include all three variables\n(A, B, C) to get the canonical Sum-of-Minterms form.",
    rule: "Minterm Expansion Method",
    visual: "intro"
  },
  {
    title: "Step 1: Examine Term A'B",
    desc: "The term A'B is missing variable C.\nWe need all 3 variables in each minterm.",
    rule: "Each minterm must contain all variables",
    visual: "examine-term1"
  },
  {
    title: "Step 2: Expand A'B",
    desc: "Multiply A'B by (C + C') = 1:\nA'B = A'B · 1 = A'B(C + C') = A'BC + A'BC'",
    rule: "X · 1 = X, where 1 = (C + C')",
    visual: "expand-term1"
  },
  {
    title: "Step 3: Identify Minterms from A'B",
    desc: "A'BC = m₃ (A=0, B=1, C=1 → 011 = 3)\nA'BC' = m₂ (A=0, B=1, C=0 → 010 = 2)",
    rule: "Convert to minterm numbers",
    visual: "identify-term1"
  },
  {
    title: "Step 4: Examine Term BC'",
    desc: "The term BC' is missing variable A.\nWe need all 3 variables in each minterm.",
    rule: "Each minterm must contain all variables",
    visual: "examine-term2"
  },
  {
    title: "Step 5: Expand BC'",
    desc: "Multiply BC' by (A + A') = 1:\nBC' = BC' · 1 = (A + A')BC' = ABC' + A'BC'",
    rule: "X · 1 = X, where 1 = (A + A')",
    visual: "expand-term2"
  },
  {
    title: "Step 6: Identify Minterms from BC'",
    desc: "ABC' = m₆ (A=1, B=1, C=0 → 110 = 6)\nA'BC' = m₂ (A=0, B=1, C=0 → 010 = 2)",
    rule: "Convert to minterm numbers",
    visual: "identify-term2"
  },
  {
    title: "Step 7: Combine and Remove Duplicates",
    desc: "F = A'BC + A'BC' + ABC' + A'BC'\nA'BC' appears twice → remove duplicate (X + X = X)",
    rule: "Idempotent Law: X + X = X",
    visual: "combine"
  },
  {
    title: "Result: Canonical Form",
    desc: "F(A,B,C) = A'BC' + A'BC + ABC'\nF = Σm(2, 3, 6)",
    rule: "Sum-of-Minterms (Canonical SOP)",
    visual: "result"
  }
];

function setup() {
  updateCanvasSize();
  totalSteps = steps.length;
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  describe('Minterm expansion walkthrough for F = A\'B + BC\'', LABEL);
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
  textSize(15);
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
  let visH = drawHeight - visY - 70;
  fill(STEP_BG);
  stroke(200);
  strokeWeight(1);
  rect(margin, visY, w, visH, 5);
  noStroke();

  drawVisual(step, margin, visY, w, visH);

  // Description
  let descY = drawHeight - 60;
  fill(60);
  textAlign(LEFT, TOP);
  textSize(13);
  textStyle(NORMAL);
  let lines = step.desc.split('\n');
  for (let i = 0; i < lines.length; i++) {
    text(lines[i], margin + 10, descY + i * 16);
  }

  drawButtons();
}

function drawVisual(step, mx, vy, w, vh) {
  let cx = canvasWidth / 2;

  if (step.visual === 'intro') {
    fill(60);
    textAlign(CENTER, CENTER);
    textSize(24);
    textStyle(BOLD);
    text("F(A,B,C) = A'B + BC'", cx, vy + 40);
    textSize(18);
    fill(HIGHLIGHT);
    text('↓', cx, vy + 70);
    fill(100);
    textSize(16);
    textStyle(NORMAL);
    text('Σm( ? )', cx, vy + 100);
    textSize(13);
    text('Click "Next →" to begin expansion', cx, vy + vh - 20);
  }
  else if (step.visual === 'examine-term1') {
    fill(60);
    textAlign(CENTER, CENTER);
    textSize(20);
    textStyle(BOLD);
    text("F = ", cx - 90, vy + 50);
    fill(TERM1_COLOR);
    text("A'B", cx - 40, vy + 50);
    fill(60);
    text(" + BC'", cx + 30, vy + 50);
    // Show missing variable
    fill(TERM1_COLOR);
    stroke(TERM1_COLOR);
    strokeWeight(2);
    noFill();
    rect(cx - 70, vy + 35, 60, 35, 5);
    noStroke();
    fill(TERM1_COLOR);
    textSize(14);
    textStyle(NORMAL);
    text("Missing: C", cx - 40, vy + 95);
    // Variable checklist
    textAlign(LEFT, CENTER);
    textSize(13);
    fill('#4CAF50'); text('✓ A (as A\')', mx + 30, vy + 130);
    fill('#4CAF50'); text('✓ B', mx + 30, vy + 150);
    fill('#D32F2F'); text('✗ C — missing!', mx + 30, vy + 170);
  }
  else if (step.visual === 'expand-term1') {
    fill(60);
    textAlign(CENTER, CENTER);
    textSize(16);
    textStyle(NORMAL);
    text("A'B", cx, vy + 30);
    fill(HIGHLIGHT);
    textSize(16);
    text('↓ multiply by (C + C\') = 1', cx, vy + 55);
    fill(60);
    textSize(16);
    text("A'B(C + C')", cx, vy + 80);
    fill(HIGHLIGHT);
    text('↓ distribute', cx, vy + 105);
    fill(TERM1_COLOR);
    textSize(20);
    textStyle(BOLD);
    text("A'BC  +  A'BC'", cx, vy + 135);
  }
  else if (step.visual === 'identify-term1') {
    textAlign(CENTER, CENTER);
    textSize(16);
    textStyle(BOLD);

    // Minterm 3
    fill(TERM1_COLOR);
    text("A'BC", cx - 70, vy + 30);
    fill(60);
    textSize(13);
    textStyle(NORMAL);
    text("A=0, B=1, C=1", cx - 70, vy + 52);
    text("011₂ = 3₁₀", cx - 70, vy + 70);
    fill(RESULT_BG);
    stroke('#4CAF50'); strokeWeight(2);
    rect(cx - 110, vy + 82, 80, 30, 5);
    noStroke();
    fill('#1B5E20');
    textSize(16); textStyle(BOLD);
    text("m₃", cx - 70, vy + 97);

    // Minterm 2
    fill(TERM1_COLOR);
    textSize(16); textStyle(BOLD);
    text("A'BC'", cx + 70, vy + 30);
    fill(60);
    textSize(13); textStyle(NORMAL);
    text("A=0, B=1, C=0", cx + 70, vy + 52);
    text("010₂ = 2₁₀", cx + 70, vy + 70);
    fill(RESULT_BG);
    stroke('#4CAF50'); strokeWeight(2);
    rect(cx + 30, vy + 82, 80, 30, 5);
    noStroke();
    fill('#1B5E20');
    textSize(16); textStyle(BOLD);
    text("m₂", cx + 70, vy + 97);
  }
  else if (step.visual === 'examine-term2') {
    fill(60);
    textAlign(CENTER, CENTER);
    textSize(20);
    textStyle(BOLD);
    text("F = A'B + ", cx - 30, vy + 50);
    fill(TERM2_COLOR);
    text("BC'", cx + 55, vy + 50);
    // Show missing variable
    stroke(TERM2_COLOR); strokeWeight(2); noFill();
    rect(cx + 30, vy + 35, 55, 35, 5);
    noStroke();
    fill(TERM2_COLOR);
    textSize(14); textStyle(NORMAL);
    text("Missing: A", cx + 55, vy + 95);
    textAlign(LEFT, CENTER);
    textSize(13);
    fill('#D32F2F'); text('✗ A — missing!', mx + 30, vy + 130);
    fill('#4CAF50'); text('✓ B', mx + 30, vy + 150);
    fill('#4CAF50'); text('✓ C (as C\')', mx + 30, vy + 170);
  }
  else if (step.visual === 'expand-term2') {
    fill(60);
    textAlign(CENTER, CENTER);
    textSize(16);
    textStyle(NORMAL);
    text("BC'", cx, vy + 30);
    fill(HIGHLIGHT);
    text('↓ multiply by (A + A\') = 1', cx, vy + 55);
    fill(60);
    text("(A + A')BC'", cx, vy + 80);
    fill(HIGHLIGHT);
    text('↓ distribute', cx, vy + 105);
    fill(TERM2_COLOR);
    textSize(20);
    textStyle(BOLD);
    text("ABC'  +  A'BC'", cx, vy + 135);
  }
  else if (step.visual === 'identify-term2') {
    textAlign(CENTER, CENTER);
    textSize(16); textStyle(BOLD);

    fill(TERM2_COLOR);
    text("ABC'", cx - 70, vy + 30);
    fill(60);
    textSize(13); textStyle(NORMAL);
    text("A=1, B=1, C=0", cx - 70, vy + 52);
    text("110₂ = 6₁₀", cx - 70, vy + 70);
    fill(RESULT_BG);
    stroke('#4CAF50'); strokeWeight(2);
    rect(cx - 110, vy + 82, 80, 30, 5);
    noStroke();
    fill('#1B5E20');
    textSize(16); textStyle(BOLD);
    text("m₆", cx - 70, vy + 97);

    fill(TERM2_COLOR);
    textSize(16); textStyle(BOLD);
    text("A'BC'", cx + 70, vy + 30);
    fill(60);
    textSize(13); textStyle(NORMAL);
    text("A=0, B=1, C=0", cx + 70, vy + 52);
    text("010₂ = 2₁₀", cx + 70, vy + 70);
    fill(RESULT_BG);
    stroke('#4CAF50'); strokeWeight(2);
    rect(cx + 30, vy + 82, 80, 30, 5);
    noStroke();
    fill('#1B5E20');
    textSize(16); textStyle(BOLD);
    text("m₂", cx + 70, vy + 97);

    fill(100);
    textSize(12); textStyle(NORMAL);
    text("(duplicate of m₂ from Term 1)", cx + 70, vy + 120);
  }
  else if (step.visual === 'combine') {
    textAlign(CENTER, CENTER);
    textSize(14); textStyle(NORMAL);
    fill(TERM1_COLOR);
    text("From A'B:  m₂, m₃", cx, vy + 30);
    fill(TERM2_COLOR);
    text("From BC':  m₆, m₂", cx, vy + 55);
    fill(HIGHLIGHT);
    textSize(16);
    text('↓ combine & remove duplicate m₂', cx, vy + 82);
    fill(60);
    textSize(16); textStyle(BOLD);
    text("m₂ + m₃ + m₆", cx, vy + 115);
  }
  else if (step.visual === 'result') {
    fill(RESULT_BG);
    stroke('#4CAF50'); strokeWeight(2);
    rect(mx + 20, vy + 15, w - 40, vh - 30, 10);
    noStroke();
    fill('#1B5E20');
    textAlign(CENTER, CENTER);
    textSize(20); textStyle(BOLD);
    text("F(A,B,C) = Σm(2, 3, 6)", cx, vy + 45);
    textSize(15); textStyle(NORMAL);
    text("= A'BC' + A'BC + ABC'", cx, vy + 75);
    // Verification
    fill(100);
    textSize(12);
    text("Verification:", cx, vy + 110);
    textSize(11);
    text("m₂: A'BC' (010) ✓  |  m₃: A'BC (011) ✓  |  m₆: ABC' (110) ✓", cx, vy + 130);
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
