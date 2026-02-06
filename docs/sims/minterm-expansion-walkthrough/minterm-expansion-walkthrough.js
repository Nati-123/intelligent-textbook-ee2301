// Minterm Expansion Walkthrough MicroSim
// Express Boolean functions as sum of minterms
// Bloom Level: Apply (L3) - Apply minterm expansion technique
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 480;
let controlHeight = 90;
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

// UI elements
let presetSelect;
let goButton;

// Preset expressions
let presets = [
  {
    label: "A'B + BC'",
    steps: [
      {
        title: "Expand F(A,B,C) = A'B + BC' to Minterms",
        desc: "We will expand each product term to include all three variables\n(A, B, C) to get the canonical Sum-of-Minterms form.",
        rule: "Minterm Expansion Method",
        visual: "intro",
        funcExpr: "A'B + BC'"
      },
      {
        title: "Step 1: Examine Term A'B",
        desc: "The term A'B is missing variable C.\nWe need all 3 variables in each minterm.",
        rule: "Each minterm must contain all variables",
        visual: "examine-term1",
        funcExpr: "A'B + BC'",
        term: "A'B",
        termPrefix: "F = ",
        termSuffix: " + BC'",
        missing: "C",
        checks: [
          { ok: true,  label: "A (as A')" },
          { ok: true,  label: "B" },
          { ok: false, label: "C" }
        ],
        boxX: -70, boxW: 60
      },
      {
        title: "Step 2: Expand A'B",
        desc: "Multiply A'B by (C + C') = 1:\nA'B = A'B \u00b7 1 = A'B(C + C') = A'BC + A'BC'",
        rule: "X \u00b7 1 = X, where 1 = (C + C')",
        visual: "expand-term1",
        term: "A'B",
        missingVar: "C",
        expandedIntermediate: "A'B(C + C')",
        expanded: "A'BC  +  A'BC'"
      },
      {
        title: "Step 3: Identify Minterms from A'B",
        desc: "A'BC = m\u2083 (A=0, B=1, C=1 \u2192 011 = 3)\nA'BC' = m\u2082 (A=0, B=1, C=0 \u2192 010 = 2)",
        rule: "Convert to minterm numbers",
        visual: "identify-term1",
        minterms: [
          { expr: "A'BC",  bits: "A=0, B=1, C=1", binary: "011\u2082 = 3\u2081\u2080", label: "m\u2083" },
          { expr: "A'BC'", bits: "A=0, B=1, C=0", binary: "010\u2082 = 2\u2081\u2080", label: "m\u2082" }
        ],
        dupNote: null
      },
      {
        title: "Step 4: Examine Term BC'",
        desc: "The term BC' is missing variable A.\nWe need all 3 variables in each minterm.",
        rule: "Each minterm must contain all variables",
        visual: "examine-term2",
        funcExpr: "A'B + BC'",
        term: "BC'",
        termPrefix: "F = A'B + ",
        termSuffix: "",
        missing: "A",
        checks: [
          { ok: false, label: "A" },
          { ok: true,  label: "B" },
          { ok: true,  label: "C (as C')" }
        ],
        boxX: 30, boxW: 55
      },
      {
        title: "Step 5: Expand BC'",
        desc: "Multiply BC' by (A + A') = 1:\nBC' = BC' \u00b7 1 = (A + A')BC' = ABC' + A'BC'",
        rule: "X \u00b7 1 = X, where 1 = (A + A')",
        visual: "expand-term2",
        term: "BC'",
        missingVar: "A",
        expandedIntermediate: "(A + A')BC'",
        expanded: "ABC'  +  A'BC'"
      },
      {
        title: "Step 6: Identify Minterms from BC'",
        desc: "ABC' = m\u2086 (A=1, B=1, C=0 \u2192 110 = 6)\nA'BC' = m\u2082 (A=0, B=1, C=0 \u2192 010 = 2)",
        rule: "Convert to minterm numbers",
        visual: "identify-term2",
        minterms: [
          { expr: "ABC'",  bits: "A=1, B=1, C=0", binary: "110\u2082 = 6\u2081\u2080", label: "m\u2086" },
          { expr: "A'BC'", bits: "A=0, B=1, C=0", binary: "010\u2082 = 2\u2081\u2080", label: "m\u2082" }
        ],
        dupNote: "(duplicate of m\u2082 from Term 1)"
      },
      {
        title: "Step 7: Combine and Remove Duplicates",
        desc: "F = A'BC + A'BC' + ABC' + A'BC'\nA'BC' appears twice \u2192 remove duplicate (X + X = X)",
        rule: "Idempotent Law: X + X = X",
        visual: "combine",
        term1Summary: "From A'B:  m\u2082, m\u2083",
        term2Summary: "From BC':  m\u2086, m\u2082",
        combineNote: "\u2193 combine & remove duplicate m\u2082",
        combinedMinterms: "m\u2082 + m\u2083 + m\u2086"
      },
      {
        title: "Result: Canonical Form",
        desc: "F(A,B,C) = A'BC' + A'BC + ABC'\nF = \u03a3m(2, 3, 6)",
        rule: "Sum-of-Minterms (Canonical SOP)",
        visual: "result",
        resultExpr: "F(A,B,C) = \u03a3m(2, 3, 6)",
        resultExpanded: "= A'BC' + A'BC + ABC'",
        verification: "m\u2082: A'BC' (010) \u2713  |  m\u2083: A'BC (011) \u2713  |  m\u2086: ABC' (110) \u2713"
      }
    ]
  },
  {
    label: "AB + C'",
    steps: [
      {
        title: "Expand F(A,B,C) = AB + C' to Minterms",
        desc: "We will expand each product term to include all three variables\n(A, B, C) to get the canonical Sum-of-Minterms form.",
        rule: "Minterm Expansion Method",
        visual: "intro",
        funcExpr: "AB + C'"
      },
      {
        title: "Step 1: Examine Term AB",
        desc: "The term AB is missing variable C.\nWe need all 3 variables in each minterm.",
        rule: "Each minterm must contain all variables",
        visual: "examine-term1",
        funcExpr: "AB + C'",
        term: "AB",
        termPrefix: "F = ",
        termSuffix: " + C'",
        missing: "C",
        checks: [
          { ok: true,  label: "A" },
          { ok: true,  label: "B" },
          { ok: false, label: "C" }
        ],
        boxX: -55, boxW: 50
      },
      {
        title: "Step 2: Expand AB",
        desc: "Multiply AB by (C + C') = 1:\nAB = AB \u00b7 1 = AB(C + C') = ABC + ABC'",
        rule: "X \u00b7 1 = X, where 1 = (C + C')",
        visual: "expand-term1",
        term: "AB",
        missingVar: "C",
        expandedIntermediate: "AB(C + C')",
        expanded: "ABC  +  ABC'"
      },
      {
        title: "Step 3: Identify Minterms from AB",
        desc: "ABC = m\u2087 (A=1, B=1, C=1 \u2192 111 = 7)\nABC' = m\u2086 (A=1, B=1, C=0 \u2192 110 = 6)",
        rule: "Convert to minterm numbers",
        visual: "identify-term1",
        minterms: [
          { expr: "ABC",  bits: "A=1, B=1, C=1", binary: "111\u2082 = 7\u2081\u2080", label: "m\u2087" },
          { expr: "ABC'", bits: "A=1, B=1, C=0", binary: "110\u2082 = 6\u2081\u2080", label: "m\u2086" }
        ],
        dupNote: null
      },
      {
        title: "Step 4: Examine Term C'",
        desc: "The term C' is missing variables A and B.\nWe need all 3 variables in each minterm.",
        rule: "Each minterm must contain all variables",
        visual: "examine-term2",
        funcExpr: "AB + C'",
        term: "C'",
        termPrefix: "F = AB + ",
        termSuffix: "",
        missing: "A, B",
        checks: [
          { ok: false, label: "A" },
          { ok: false, label: "B" },
          { ok: true,  label: "C (as C')" }
        ],
        boxX: 35, boxW: 40
      },
      {
        title: "Step 5: Expand C'",
        desc: "Multiply C' by (A+A')=1 and (B+B')=1:\nC' = (A+A')(B+B')C' = A'B'C' + A'BC' + AB'C' + ABC'",
        rule: "X \u00b7 1 = X, where 1 = (A+A')(B+B')",
        visual: "expand-term2",
        term: "C'",
        missingVar: "A, B",
        expandedIntermediate: "(A+A')(B+B')C'",
        expanded: "A'B'C' + A'BC' + AB'C' + ABC'"
      },
      {
        title: "Step 6: Identify Minterms from C'",
        desc: "A'B'C'=m\u2080 (000=0)  A'BC'=m\u2082 (010=2)\nAB'C'=m\u2084 (100=4)  ABC'=m\u2086 (110=6)",
        rule: "Convert to minterm numbers",
        visual: "identify-term2",
        minterms: [
          { expr: "A'B'C'", bits: "A=0, B=0, C=0", binary: "000\u2082 = 0\u2081\u2080", label: "m\u2080" },
          { expr: "A'BC'",  bits: "A=0, B=1, C=0", binary: "010\u2082 = 2\u2081\u2080", label: "m\u2082" },
          { expr: "AB'C'",  bits: "A=1, B=0, C=0", binary: "100\u2082 = 4\u2081\u2080", label: "m\u2084" },
          { expr: "ABC'",   bits: "A=1, B=1, C=0", binary: "110\u2082 = 6\u2081\u2080", label: "m\u2086" }
        ],
        dupNote: "(m\u2086 duplicates Term 1)"
      },
      {
        title: "Step 7: Combine and Remove Duplicates",
        desc: "From AB: m\u2087, m\u2086   From C': m\u2080, m\u2082, m\u2084, m\u2086\nABC' (m\u2086) appears twice \u2192 remove duplicate",
        rule: "Idempotent Law: X + X = X",
        visual: "combine",
        term1Summary: "From AB:  m\u2086, m\u2087",
        term2Summary: "From C':  m\u2080, m\u2082, m\u2084, m\u2086",
        combineNote: "\u2193 combine & remove duplicate m\u2086",
        combinedMinterms: "m\u2080 + m\u2082 + m\u2084 + m\u2086 + m\u2087"
      },
      {
        title: "Result: Canonical Form",
        desc: "F(A,B,C) = A'B'C' + A'BC' + AB'C' + ABC' + ABC\nF = \u03a3m(0, 2, 4, 6, 7)",
        rule: "Sum-of-Minterms (Canonical SOP)",
        visual: "result",
        resultExpr: "F(A,B,C) = \u03a3m(0, 2, 4, 6, 7)",
        resultExpanded: "= A'B'C' + A'BC' + AB'C' + ABC' + ABC",
        verification: "m\u2080(000) m\u2082(010) m\u2084(100) m\u2086(110) m\u2087(111) \u2713"
      }
    ]
  },
  {
    label: "A'C + B",
    steps: [
      {
        title: "Expand F(A,B,C) = A'C + B to Minterms",
        desc: "We will expand each product term to include all three variables\n(A, B, C) to get the canonical Sum-of-Minterms form.",
        rule: "Minterm Expansion Method",
        visual: "intro",
        funcExpr: "A'C + B"
      },
      {
        title: "Step 1: Examine Term A'C",
        desc: "The term A'C is missing variable B.\nWe need all 3 variables in each minterm.",
        rule: "Each minterm must contain all variables",
        visual: "examine-term1",
        funcExpr: "A'C + B",
        term: "A'C",
        termPrefix: "F = ",
        termSuffix: " + B",
        missing: "B",
        checks: [
          { ok: true,  label: "A (as A')" },
          { ok: false, label: "B" },
          { ok: true,  label: "C" }
        ],
        boxX: -60, boxW: 55
      },
      {
        title: "Step 2: Expand A'C",
        desc: "Multiply A'C by (B + B') = 1:\nA'C = A'C \u00b7 1 = A'C(B + B') = A'BC + A'B'C",
        rule: "X \u00b7 1 = X, where 1 = (B + B')",
        visual: "expand-term1",
        term: "A'C",
        missingVar: "B",
        expandedIntermediate: "A'C(B + B')",
        expanded: "A'BC  +  A'B'C"
      },
      {
        title: "Step 3: Identify Minterms from A'C",
        desc: "A'BC = m\u2083 (A=0, B=1, C=1 \u2192 011 = 3)\nA'B'C = m\u2081 (A=0, B=0, C=1 \u2192 001 = 1)",
        rule: "Convert to minterm numbers",
        visual: "identify-term1",
        minterms: [
          { expr: "A'BC",  bits: "A=0, B=1, C=1", binary: "011\u2082 = 3\u2081\u2080", label: "m\u2083" },
          { expr: "A'B'C", bits: "A=0, B=0, C=1", binary: "001\u2082 = 1\u2081\u2080", label: "m\u2081" }
        ],
        dupNote: null
      },
      {
        title: "Step 4: Examine Term B",
        desc: "The term B is missing variables A and C.\nWe need all 3 variables in each minterm.",
        rule: "Each minterm must contain all variables",
        visual: "examine-term2",
        funcExpr: "A'C + B",
        term: "B",
        termPrefix: "F = A'C + ",
        termSuffix: "",
        missing: "A, C",
        checks: [
          { ok: false, label: "A" },
          { ok: true,  label: "B" },
          { ok: false, label: "C" }
        ],
        boxX: 38, boxW: 30
      },
      {
        title: "Step 5: Expand B",
        desc: "Multiply B by (A+A')=1 and (C+C')=1:\nB = (A+A')B(C+C') = A'BC+A'BC'+ABC+ABC'",
        rule: "X \u00b7 1 = X, where 1 = (A+A')(C+C')",
        visual: "expand-term2",
        term: "B",
        missingVar: "A, C",
        expandedIntermediate: "(A+A')B(C+C')",
        expanded: "A'BC + A'BC' + ABC + ABC'"
      },
      {
        title: "Step 6: Identify Minterms from B",
        desc: "A'BC=m\u2083 (011=3)  A'BC'=m\u2082 (010=2)\nABC=m\u2087 (111=7)  ABC'=m\u2086 (110=6)",
        rule: "Convert to minterm numbers",
        visual: "identify-term2",
        minterms: [
          { expr: "A'BC",  bits: "A=0, B=1, C=1", binary: "011\u2082 = 3\u2081\u2080", label: "m\u2083" },
          { expr: "A'BC'", bits: "A=0, B=1, C=0", binary: "010\u2082 = 2\u2081\u2080", label: "m\u2082" },
          { expr: "ABC",   bits: "A=1, B=1, C=1", binary: "111\u2082 = 7\u2081\u2080", label: "m\u2087" },
          { expr: "ABC'",  bits: "A=1, B=1, C=0", binary: "110\u2082 = 6\u2081\u2080", label: "m\u2086" }
        ],
        dupNote: "(m\u2083 duplicates Term 1)"
      },
      {
        title: "Step 7: Combine and Remove Duplicates",
        desc: "From A'C: m\u2081, m\u2083   From B: m\u2082, m\u2083, m\u2086, m\u2087\nA'BC (m\u2083) appears twice \u2192 remove duplicate",
        rule: "Idempotent Law: X + X = X",
        visual: "combine",
        term1Summary: "From A'C:  m\u2081, m\u2083",
        term2Summary: "From B:  m\u2082, m\u2083, m\u2086, m\u2087",
        combineNote: "\u2193 combine & remove duplicate m\u2083",
        combinedMinterms: "m\u2081 + m\u2082 + m\u2083 + m\u2086 + m\u2087"
      },
      {
        title: "Result: Canonical Form",
        desc: "F(A,B,C) = A'B'C + A'BC' + A'BC + ABC' + ABC\nF = \u03a3m(1, 2, 3, 6, 7)",
        rule: "Sum-of-Minterms (Canonical SOP)",
        visual: "result",
        resultExpr: "F(A,B,C) = \u03a3m(1, 2, 3, 6, 7)",
        resultExpanded: "= A'B'C + A'BC' + A'BC + ABC' + ABC",
        verification: "m\u2081(001) m\u2082(010) m\u2083(011) m\u2086(110) m\u2087(111) \u2713"
      }
    ]
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
  describe('Minterm expansion walkthrough for Boolean expressions', LABEL);
}

function positionUIElements() {
  let mainRect = document.querySelector('main').getBoundingClientRect();
  presetSelect.position(mainRect.left + 75, mainRect.top + drawHeight + 10);
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

  // Preset label
  fill(60);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(13);
  textStyle(BOLD);
  text('Function:', margin, drawHeight + 18);

  drawButtons();
}

function drawVisual(step, mx, vy, w, vh) {
  let cx = canvasWidth / 2;

  if (step.visual === 'intro') {
    fill(60);
    textAlign(CENTER, CENTER);
    textSize(24);
    textStyle(BOLD);
    text("F(A,B,C) = " + step.funcExpr, cx, vy + 40);
    textSize(18);
    fill(HIGHLIGHT);
    text('\u2193', cx, vy + 70);
    fill(100);
    textSize(16);
    textStyle(NORMAL);
    text('\u03a3m( ? )', cx, vy + 100);
    textSize(13);
    text('Click "Next \u2192" to begin expansion', cx, vy + vh - 20);
  }
  else if (step.visual === 'examine-term1') {
    fill(60);
    textAlign(CENTER, CENTER);
    textSize(20);
    textStyle(BOLD);
    text(step.termPrefix, cx - 90, vy + 50);
    fill(TERM1_COLOR);
    text(step.term, cx - 40, vy + 50);
    fill(60);
    text(step.termSuffix, cx + 30, vy + 50);
    // Show missing variable
    fill(TERM1_COLOR);
    stroke(TERM1_COLOR);
    strokeWeight(2);
    noFill();
    rect(cx + step.boxX, vy + 35, step.boxW, 35, 5);
    noStroke();
    fill(TERM1_COLOR);
    textSize(14);
    textStyle(NORMAL);
    text("Missing: " + step.missing, cx - 40, vy + 95);
    // Variable checklist
    textAlign(LEFT, CENTER);
    textSize(13);
    for (let i = 0; i < step.checks.length; i++) {
      let c = step.checks[i];
      fill(c.ok ? '#4CAF50' : '#D32F2F');
      let sym = c.ok ? '\u2713 ' : '\u2717 ';
      let suffix = c.ok ? '' : ' \u2014 missing!';
      text(sym + c.label + suffix, mx + 30, vy + 130 + i * 20);
    }
  }
  else if (step.visual === 'expand-term1') {
    fill(60);
    textAlign(CENTER, CENTER);
    textSize(16);
    textStyle(NORMAL);
    text(step.term, cx, vy + 30);
    fill(HIGHLIGHT);
    textSize(16);
    text('\u2193 multiply by (' + step.missingVar + ' + ' + step.missingVar + "') = 1", cx, vy + 55);
    fill(60);
    textSize(16);
    text(step.expandedIntermediate, cx, vy + 80);
    fill(HIGHLIGHT);
    text('\u2193 distribute', cx, vy + 105);
    fill(TERM1_COLOR);
    textSize(20);
    textStyle(BOLD);
    text(step.expanded, cx, vy + 135);
  }
  else if (step.visual === 'identify-term1') {
    drawMintermIdentification(step, cx, vy, TERM1_COLOR, mx);
  }
  else if (step.visual === 'examine-term2') {
    fill(60);
    textAlign(CENTER, CENTER);
    textSize(20);
    textStyle(BOLD);
    text(step.termPrefix, cx - 30, vy + 50);
    fill(TERM2_COLOR);
    text(step.term, cx + 55, vy + 50);
    // Show missing variable
    stroke(TERM2_COLOR); strokeWeight(2); noFill();
    rect(cx + step.boxX, vy + 35, step.boxW, 35, 5);
    noStroke();
    fill(TERM2_COLOR);
    textSize(14); textStyle(NORMAL);
    text("Missing: " + step.missing, cx + 55, vy + 95);
    textAlign(LEFT, CENTER);
    textSize(13);
    for (let i = 0; i < step.checks.length; i++) {
      let c = step.checks[i];
      fill(c.ok ? '#4CAF50' : '#D32F2F');
      let sym = c.ok ? '\u2713 ' : '\u2717 ';
      let suffix = c.ok ? '' : ' \u2014 missing!';
      text(sym + c.label + suffix, mx + 30, vy + 130 + i * 20);
    }
  }
  else if (step.visual === 'expand-term2') {
    fill(60);
    textAlign(CENTER, CENTER);
    textSize(16);
    textStyle(NORMAL);
    text(step.term, cx, vy + 30);
    fill(HIGHLIGHT);
    let missingParts = step.missingVar.split(', ');
    let mulLabel;
    if (missingParts.length === 1) {
      mulLabel = '\u2193 multiply by (' + missingParts[0] + ' + ' + missingParts[0] + "') = 1";
    } else {
      mulLabel = '\u2193 multiply by (' + missingParts[0] + "+'" + missingParts[0] + "')(" + missingParts[1] + '+' + missingParts[1] + "') = 1";
    }
    text(mulLabel, cx, vy + 55);
    fill(60);
    textSize(16);
    text(step.expandedIntermediate, cx, vy + 80);
    fill(HIGHLIGHT);
    text('\u2193 distribute', cx, vy + 105);
    fill(TERM2_COLOR);
    textSize(step.expanded.length > 30 ? 14 : 20);
    textStyle(BOLD);
    text(step.expanded, cx, vy + 135);
  }
  else if (step.visual === 'identify-term2') {
    drawMintermIdentification(step, cx, vy, TERM2_COLOR, mx);
  }
  else if (step.visual === 'combine') {
    textAlign(CENTER, CENTER);
    textSize(14); textStyle(NORMAL);
    fill(TERM1_COLOR);
    text(step.term1Summary, cx, vy + 30);
    fill(TERM2_COLOR);
    text(step.term2Summary, cx, vy + 55);
    fill(HIGHLIGHT);
    textSize(16);
    text(step.combineNote, cx, vy + 82);
    fill(60);
    textSize(16); textStyle(BOLD);
    text(step.combinedMinterms, cx, vy + 115);
  }
  else if (step.visual === 'result') {
    fill(RESULT_BG);
    stroke('#4CAF50'); strokeWeight(2);
    rect(mx + 20, vy + 15, w - 40, vh - 30, 10);
    noStroke();
    fill('#1B5E20');
    textAlign(CENTER, CENTER);
    textSize(20); textStyle(BOLD);
    text(step.resultExpr, cx, vy + 45);
    textSize(15); textStyle(NORMAL);
    text(step.resultExpanded, cx, vy + 75);
    // Verification
    fill(100);
    textSize(12);
    text("Verification:", cx, vy + 110);
    textSize(11);
    text(step.verification, cx, vy + 130);
  }
}

function drawMintermIdentification(step, cx, vy, termColor, mx) {
  let minterms = step.minterms;
  let count = minterms.length;

  if (count <= 2) {
    // Two-column layout
    let positions = [cx - 70, cx + 70];
    textAlign(CENTER, CENTER);
    for (let i = 0; i < count; i++) {
      let m = minterms[i];
      let px = positions[i];

      fill(termColor);
      textSize(16); textStyle(BOLD);
      text(m.expr, px, vy + 30);
      fill(60);
      textSize(13); textStyle(NORMAL);
      text(m.bits, px, vy + 52);
      text(m.binary, px, vy + 70);
      fill(RESULT_BG);
      stroke('#4CAF50'); strokeWeight(2);
      rect(px - 40, vy + 82, 80, 30, 5);
      noStroke();
      fill('#1B5E20');
      textSize(16); textStyle(BOLD);
      text(m.label, px, vy + 97);
    }
  } else {
    // Grid layout for 3-4 minterms
    let cols = 2;
    let colW = 140;
    let startX = cx - colW;
    textAlign(CENTER, CENTER);
    for (let i = 0; i < count; i++) {
      let m = minterms[i];
      let col = i % cols;
      let row = Math.floor(i / cols);
      let px = startX + col * colW + colW / 2;
      let rowOff = row * 80;

      fill(termColor);
      textSize(14); textStyle(BOLD);
      text(m.expr, px, vy + 18 + rowOff);
      fill(60);
      textSize(11); textStyle(NORMAL);
      text(m.bits, px, vy + 35 + rowOff);
      text(m.binary, px, vy + 49 + rowOff);
      fill(RESULT_BG);
      stroke('#4CAF50'); strokeWeight(2);
      rect(px - 30, vy + 56 + rowOff, 60, 22, 5);
      noStroke();
      fill('#1B5E20');
      textSize(13); textStyle(BOLD);
      text(m.label, px, vy + 67 + rowOff);
    }
  }

  // Duplicate note
  if (step.dupNote) {
    fill(100);
    textSize(12); textStyle(NORMAL);
    textAlign(CENTER, CENTER);
    let noteY = (count <= 2) ? vy + 120 : vy + 170;
    text(step.dupNote, cx, noteY);
  }
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
