// Quine-McCluskey Method Walkthrough MicroSim
// Minimize F(A,B,C) = Σm(1,2,5,6,7) via Quine-McCluskey
// Bloom Level: Apply (L3) - Apply systematic minimization algorithm
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 500;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let currentStep = 0;
let totalSteps;

const TITLE_BG = '#2196F3';
const STEP_BG = '#E3F2FD';
const HIGHLIGHT = '#FF9800';
const RESULT_BG = '#E8F5E9';
const ESSENTIAL_COLOR = '#E91E63';

let steps = [
  {
    title: "QM Method: F(A,B,C) = Σm(1,2,5,6,7)",
    desc: "The Quine-McCluskey method is a systematic algorithm for\nminimizing Boolean functions. Let's minimize F step by step.",
    rule: "Quine-McCluskey Algorithm",
    visual: "intro"
  },
  {
    title: "Step 1: List Minterms in Binary",
    desc: "Convert each minterm number to its binary representation.\nWe have 3 variables (A, B, C) so each is 3 bits.",
    rule: "Convert minterms to binary",
    visual: "binary-list"
  },
  {
    title: "Step 2: Group by Number of 1s",
    desc: "Sort minterms into groups based on how many 1s are in\ntheir binary representation.",
    rule: "Group by 1-count for systematic combining",
    visual: "groups"
  },
  {
    title: "Step 3: Combine Adjacent Groups (0→1)",
    desc: "Compare each minterm in Group 0 with each in Group 1.\nCombine if they differ in exactly one bit position.",
    rule: "Combine terms differing in exactly 1 bit",
    visual: "combine1"
  },
  {
    title: "Step 4: Combine Adjacent Groups (1→2)",
    desc: "Compare each minterm in Group 1 with each in Group 2.\nCombine if they differ in exactly one bit position.",
    rule: "Combine terms differing in exactly 1 bit",
    visual: "combine2"
  },
  {
    title: "Step 5: All Prime Implicants",
    desc: "No further combinations possible (all pairs differ in ≥2\npositions). These are the Prime Implicants (PIs).",
    rule: "PIs = terms that cannot be further combined",
    visual: "prime-implicants"
  },
  {
    title: "Step 6: Prime Implicant Chart",
    desc: "Build a chart showing which minterms each PI covers.\nThis helps identify essential prime implicants.",
    rule: "PI Chart for coverage analysis",
    visual: "pi-chart"
  },
  {
    title: "Step 7: Find Essential Prime Implicants",
    desc: "m1 is only covered by B'C → B'C is essential.\nm2 is only covered by BC' → BC' is essential.",
    rule: "Essential PI: only PI covering some minterm",
    visual: "essential"
  },
  {
    title: "Step 8: Cover Remaining Minterms",
    desc: "After selecting B'C and BC': m1,m2,m5,m6 are covered.\nm7 still needs coverage → select AC (or AB).",
    rule: "Cover all remaining minterms",
    visual: "cover"
  },
  {
    title: "Result: Minimized Expression",
    desc: "F(A,B,C) = B'C + BC' + AC\nThis is the minimum SOP form found by QM method.",
    rule: "Minimum SOP Expression",
    visual: "result"
  }
];

function setup() {
  updateCanvasSize();
  totalSteps = steps.length;
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  describe('Quine-McCluskey method walkthrough for Boolean minimization', LABEL);
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
  textSize(14);
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
  let visH = drawHeight - visY - 65;
  fill(STEP_BG);
  stroke(200);
  strokeWeight(1);
  rect(margin, visY, w, visH, 5);
  noStroke();

  drawVisual(step, margin, visY, w, visH);

  // Description
  let descY = drawHeight - 55;
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

function drawVisual(step, mx, vy, w, vh) {
  let cx = canvasWidth / 2;

  if (step.visual === 'intro') {
    fill(60);
    textAlign(CENTER, CENTER);
    textSize(20);
    textStyle(BOLD);
    text('F(A,B,C) = Σm(1,2,5,6,7)', cx, vy + 40);
    textSize(14);
    textStyle(NORMAL);
    fill(100);
    text('Systematic minimization algorithm', cx, vy + 70);
    text('Works for any number of variables', cx, vy + 90);
    fill(HIGHLIGHT);
    textSize(13);
    text('Click "Next →" to begin', cx, vy + vh - 20);
  }
  else if (step.visual === 'binary-list') {
    let minterms = [
      {n: 1, bin: '001'}, {n: 2, bin: '010'},
      {n: 5, bin: '101'}, {n: 6, bin: '110'}, {n: 7, bin: '111'}
    ];
    // Header
    fill(TITLE_BG);
    rect(mx + 30, vy + 10, w - 60, 25, 3, 3, 0, 0);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(12); textStyle(BOLD);
    text('Minterm', mx + 30 + (w - 60) * 0.25, vy + 22);
    text('A B C', mx + 30 + (w - 60) * 0.6, vy + 22);
    text('# of 1s', mx + 30 + (w - 60) * 0.85, vy + 22);
    // Rows
    for (let i = 0; i < minterms.length; i++) {
      let y = vy + 35 + i * 28;
      fill(i % 2 === 0 ? 245 : 255);
      stroke(220); strokeWeight(0.5);
      rect(mx + 30, y, w - 60, 28);
      noStroke();
      fill(60); textSize(13); textStyle(NORMAL);
      textAlign(CENTER, CENTER);
      text('m' + minterms[i].n, mx + 30 + (w - 60) * 0.25, y + 14);
      textStyle(BOLD);
      text(minterms[i].bin.split('').join('  '), mx + 30 + (w - 60) * 0.6, y + 14);
      let ones = minterms[i].bin.split('').filter(x => x === '1').length;
      textStyle(NORMAL);
      text(ones, mx + 30 + (w - 60) * 0.85, y + 14);
    }
  }
  else if (step.visual === 'groups') {
    let groups = [
      {label: 'Group 0 (one 1)', items: ['m1: 001', 'm2: 010']},
      {label: 'Group 1 (two 1s)', items: ['m5: 101', 'm6: 110']},
      {label: 'Group 2 (three 1s)', items: ['m7: 111']}
    ];
    let gx = mx + 30;
    let gy = vy + 15;
    for (let g = 0; g < groups.length; g++) {
      let gw = w - 60;
      let gh = 20 + groups[g].items.length * 22;
      fill('#E8EAF6');
      stroke('#5C6BC0'); strokeWeight(1);
      rect(gx, gy, gw, gh, 5);
      noStroke();
      fill('#283593');
      textAlign(LEFT, CENTER);
      textSize(12); textStyle(BOLD);
      text(groups[g].label, gx + 10, gy + 12);
      textStyle(NORMAL); textSize(13); fill(60);
      for (let i = 0; i < groups[g].items.length; i++) {
        text(groups[g].items[i], gx + 25, gy + 32 + i * 22);
      }
      gy += gh + 10;
    }
  }
  else if (step.visual === 'combine1') {
    textAlign(LEFT, TOP);
    textSize(12); textStyle(NORMAL);
    let y = vy + 15;
    let items = [
      {pair: 'm1,m5: 001,101', result: '-01', term: "B'C", ok: true},
      {pair: 'm1,m6: 001,110', result: 'differ 2 bits', term: '', ok: false},
      {pair: 'm2,m5: 010,101', result: 'differ 3 bits', term: '', ok: false},
      {pair: 'm2,m6: 010,110', result: '-10', term: "BC'", ok: true}
    ];
    fill(TITLE_BG);
    noStroke();
    rect(mx + 20, y, w - 40, 22, 3, 3, 0, 0);
    fill(255); textAlign(CENTER, CENTER);
    textSize(11); textStyle(BOLD);
    text('Group 0 × Group 1 Comparisons', cx, y + 11);
    y += 28;
    for (let i = 0; i < items.length; i++) {
      fill(items[i].ok ? '#E8F5E9' : '#FFEBEE');
      stroke(220); strokeWeight(0.5);
      rect(mx + 20, y, w - 40, 26);
      noStroke();
      fill(60); textSize(11); textStyle(NORMAL);
      textAlign(LEFT, CENTER);
      text(items[i].pair, mx + 30, y + 13);
      textAlign(RIGHT, CENTER);
      if (items[i].ok) {
        fill('#1B5E20'); textStyle(BOLD);
        text('→ ' + items[i].result + ' = ' + items[i].term + ' ✓', mx + w - 30, y + 13);
      } else {
        fill('#C62828');
        text(items[i].result + ' ✗', mx + w - 30, y + 13);
      }
      y += 26;
    }
  }
  else if (step.visual === 'combine2') {
    textAlign(LEFT, TOP);
    textSize(12); textStyle(NORMAL);
    let y = vy + 15;
    let items = [
      {pair: 'm5,m7: 101,111', result: '1-1', term: 'AC', ok: true},
      {pair: 'm6,m7: 110,111', result: '11-', term: 'AB', ok: true}
    ];
    fill(TITLE_BG);
    noStroke();
    rect(mx + 20, y, w - 40, 22, 3, 3, 0, 0);
    fill(255); textAlign(CENTER, CENTER);
    textSize(11); textStyle(BOLD);
    text('Group 1 × Group 2 Comparisons', cx, y + 11);
    y += 28;
    for (let i = 0; i < items.length; i++) {
      fill('#E8F5E9');
      stroke(220); strokeWeight(0.5);
      rect(mx + 20, y, w - 40, 26);
      noStroke();
      fill(60); textSize(11); textStyle(NORMAL);
      textAlign(LEFT, CENTER);
      text(items[i].pair, mx + 30, y + 13);
      textAlign(RIGHT, CENTER);
      fill('#1B5E20'); textStyle(BOLD);
      text('→ ' + items[i].result + ' = ' + items[i].term + ' ✓', mx + w - 30, y + 13);
      y += 26;
    }
    y += 15;
    fill(100);
    textAlign(CENTER, CENTER);
    textSize(12); textStyle(NORMAL);
    text('No further combinations possible', cx, y + 10);
    text('(all pairs differ in ≥ 2 positions)', cx, y + 28);
  }
  else if (step.visual === 'prime-implicants') {
    let pis = [
      {term: "B'C", pattern: '-01', covers: 'm1, m5'},
      {term: "BC'", pattern: '-10', covers: 'm2, m6'},
      {term: 'AC', pattern: '1-1', covers: 'm5, m7'},
      {term: 'AB', pattern: '11-', covers: 'm6, m7'}
    ];
    fill(TITLE_BG);
    noStroke();
    rect(mx + 20, vy + 10, w - 40, 25, 3, 3, 0, 0);
    fill(255); textAlign(CENTER, CENTER);
    textSize(12); textStyle(BOLD);
    let colW = (w - 40) / 3;
    text('PI', mx + 20 + colW * 0.5, vy + 22);
    text('Pattern', mx + 20 + colW * 1.5, vy + 22);
    text('Covers', mx + 20 + colW * 2.5, vy + 22);
    for (let i = 0; i < pis.length; i++) {
      let y = vy + 35 + i * 30;
      fill(i % 2 === 0 ? 245 : 255);
      stroke(220); strokeWeight(0.5);
      rect(mx + 20, y, w - 40, 30);
      noStroke();
      fill(60); textSize(13); textStyle(BOLD);
      textAlign(CENTER, CENTER);
      text(pis[i].term, mx + 20 + colW * 0.5, y + 15);
      textStyle(NORMAL);
      text(pis[i].pattern, mx + 20 + colW * 1.5, y + 15);
      text(pis[i].covers, mx + 20 + colW * 2.5, y + 15);
    }
  }
  else if (step.visual === 'pi-chart') {
    drawPIChart(mx, vy, w, vh, false, false);
  }
  else if (step.visual === 'essential') {
    drawPIChart(mx, vy, w, vh, true, false);
  }
  else if (step.visual === 'cover') {
    drawPIChart(mx, vy, w, vh, true, true);
  }
  else if (step.visual === 'result') {
    fill(RESULT_BG);
    stroke('#4CAF50'); strokeWeight(2);
    rect(mx + 20, vy + 20, w - 40, vh - 40, 10);
    noStroke();
    fill('#1B5E20');
    textAlign(CENTER, CENTER);
    textSize(22); textStyle(BOLD);
    text("F = B'C + BC' + AC", cx, vy + 55);
    textSize(14); textStyle(NORMAL);
    fill(100);
    text("Essential PIs: B'C, BC'", cx, vy + 90);
    text("Selected for m7: AC", cx, vy + 112);
    text("All 5 minterms covered ✓", cx, vy + 145);
  }
}

function drawPIChart(mx, vy, w, vh, showEssential, showCover) {
  let pis = ["B'C", "BC'", "AC", "AB"];
  let minterms = [1, 2, 5, 6, 7];
  let coverage = [
    [true, false, true, false, false],   // B'C covers m1, m5
    [false, true, false, true, false],   // BC' covers m2, m6
    [false, false, true, false, true],   // AC covers m5, m7
    [false, false, false, true, true]    // AB covers m6, m7
  ];

  let tableX = mx + 20;
  let tableW = w - 40;
  let colW = tableW / 6;
  let rowH = 28;
  let startY = vy + 10;

  // Header
  fill(TITLE_BG);
  noStroke();
  rect(tableX, startY, tableW, rowH, 3, 3, 0, 0);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(11); textStyle(BOLD);
  text('PI', tableX + colW * 0.5, startY + rowH / 2);
  for (let j = 0; j < 5; j++) {
    text('m' + minterms[j], tableX + colW * (j + 1) + colW / 2, startY + rowH / 2);
  }

  for (let i = 0; i < 4; i++) {
    let y = startY + rowH * (i + 1);
    let isEssential = (i === 0 || i === 1);
    let isSelected = showCover && i === 2;

    if (showEssential && isEssential) {
      fill('#FCE4EC');
    } else if (isSelected) {
      fill('#E8F5E9');
    } else {
      fill(i % 2 === 0 ? 245 : 255);
    }
    stroke(220); strokeWeight(0.5);
    rect(tableX, y, tableW, rowH);
    noStroke();

    fill(showEssential && isEssential ? ESSENTIAL_COLOR : 60);
    textSize(12);
    textStyle(isEssential && showEssential ? BOLD : NORMAL);
    textAlign(CENTER, CENTER);
    text(pis[i], tableX + colW * 0.5, y + rowH / 2);

    for (let j = 0; j < 5; j++) {
      if (coverage[i][j]) {
        fill(showEssential && isEssential ? ESSENTIAL_COLOR : (isSelected ? '#1B5E20' : 60));
        textSize(14); textStyle(BOLD);
        text('×', tableX + colW * (j + 1) + colW / 2, y + rowH / 2);
      }
    }
  }

  // Annotations
  if (showEssential) {
    let annY = startY + rowH * 5 + 10;
    fill(ESSENTIAL_COLOR);
    textAlign(LEFT, TOP);
    textSize(11); textStyle(BOLD);
    text("★ B'C is essential (only PI covering m1)", mx + 25, annY);
    text("★ BC' is essential (only PI covering m2)", mx + 25, annY + 16);
    if (showCover) {
      fill('#1B5E20');
      text("✓ Select AC to cover remaining m7", mx + 25, annY + 36);
    }
  }
}

function drawButtons() {
  let btnY = drawHeight + 8;
  let btnW = 90;
  let btnH = 34;
  let gap = 10;
  let totalBtnW = btnW * 3 + gap * 2;
  let startX = (canvasWidth - totalBtnW) / 2;

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
  let totalBtnW = btnW * 3 + gap * 2;
  let startX = (canvasWidth - totalBtnW) / 2;

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
