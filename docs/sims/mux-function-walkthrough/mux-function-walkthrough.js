// MUX Function Walkthrough MicroSim
// Implement F(A,B,C) using 4:1 MUX
// Bloom Level: Apply (L3) - Apply MUX-based function implementation
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
const MUX_COLOR = '#7B1FA2';

let truthTable = [
  [0,0,0, 0], [0,0,1, 1],
  [0,1,0, 1], [0,1,1, 0],
  [1,0,0, 0], [1,0,1, 0],
  [1,1,0, 1], [1,1,1, 1]
];

let steps = [
  {
    title: "Implement F(A,B,C) Using a 4:1 MUX",
    desc: "We will implement F(A,B,C) = Σm(1,2,6,7) using a 4-to-1\nmultiplexer with A and B as select inputs.",
    rule: "MUX-based Function Implementation",
    visual: "intro"
  },
  {
    title: "Step 1: Write the Truth Table",
    desc: "List all 8 input combinations.\nF = 1 for minterms 1, 2, 6, and 7.",
    rule: "Truth Table for F(A,B,C)",
    visual: "truth-table",
    highlightGroup: -1
  },
  {
    title: "Step 2: Choose Select Variables",
    desc: "Use A and B as the MUX select inputs (S1=A, S0=B).\nThe remaining variable C connects to data inputs.\n4:1 MUX has 2 select lines → needs 2 variables.",
    rule: "n select lines → 2ⁿ:1 MUX",
    visual: "select-vars"
  },
  {
    title: "Step 3: Group by AB = 00",
    desc: "When AB = 00: F(C=0) = 0, F(C=1) = 1\nF follows C exactly → D0 = C",
    rule: "Group rows by select variable values",
    visual: "truth-table",
    highlightGroup: 0,
    dinput: "D0 = C"
  },
  {
    title: "Step 4: Group by AB = 01",
    desc: "When AB = 01: F(C=0) = 1, F(C=1) = 0\nF is the complement of C → D1 = C'",
    rule: "Determine data input for each group",
    visual: "truth-table",
    highlightGroup: 1,
    dinput: "D1 = C'"
  },
  {
    title: "Step 5: Group by AB = 10",
    desc: "When AB = 10: F(C=0) = 0, F(C=1) = 0\nF is always 0 → D2 = 0",
    rule: "Determine data input for each group",
    visual: "truth-table",
    highlightGroup: 2,
    dinput: "D2 = 0"
  },
  {
    title: "Step 6: Group by AB = 11",
    desc: "When AB = 11: F(C=0) = 1, F(C=1) = 1\nF is always 1 → D3 = 1",
    rule: "Determine data input for each group",
    visual: "truth-table",
    highlightGroup: 3,
    dinput: "D3 = 1"
  },
  {
    title: "Step 7: Summary of Data Inputs",
    desc: "D0 = C,  D1 = C',  D2 = 0,  D3 = 1\nThese are the four possible values: C, C', 0, 1.",
    rule: "Data inputs: {0, 1, C, C'}",
    visual: "summary-inputs"
  },
  {
    title: "Complete: 4:1 MUX Circuit",
    desc: "The 4:1 MUX implements F(A,B,C) = Σm(1,2,6,7)\nwith A,B as select and C,C',0,1 as data inputs.",
    rule: "MUX Implementation Complete",
    visual: "mux-circuit"
  }
];

function setup() {
  updateCanvasSize();
  totalSteps = steps.length;
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  describe('MUX function implementation walkthrough', LABEL);
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
    text('F(A,B,C) = Σm(1,2,6,7)', cx, vy + 35);
    fill(HIGHLIGHT);
    textSize(18);
    text('↓', cx, vy + 60);
    // MUX box
    fill(MUX_COLOR + '22');
    stroke(MUX_COLOR); strokeWeight(2);
    rect(cx - 40, vy + 75, 80, 60, 5);
    noStroke();
    fill(MUX_COLOR);
    textSize(16); textStyle(BOLD);
    text('4:1', cx, vy + 95);
    text('MUX', cx, vy + 115);
    fill(100);
    textSize(13); textStyle(NORMAL);
    text('Click "Next →" to begin', cx, vy + vh - 20);
  }
  else if (step.visual === 'truth-table') {
    drawTruthTable(mx, vy, w, vh, step.highlightGroup, step.dinput);
  }
  else if (step.visual === 'select-vars') {
    fill(60);
    textAlign(CENTER, CENTER);
    textSize(14); textStyle(NORMAL);
    text('3 variables: A, B, C', cx, vy + 25);
    text('4:1 MUX needs 2 select lines', cx, vy + 50);
    // Select assignment
    fill(TITLE_BG);
    textSize(18); textStyle(BOLD);
    text('S1 = A,  S0 = B', cx, vy + 85);
    fill(HIGHLIGHT);
    text('Remaining: C → data inputs', cx, vy + 115);
    // MUX diagram
    fill(MUX_COLOR + '22');
    stroke(MUX_COLOR); strokeWeight(2);
    rect(cx - 35, vy + 140, 70, 50, 5);
    noStroke();
    fill(MUX_COLOR);
    textSize(12); textStyle(BOLD);
    text('4:1 MUX', cx, vy + 165);
    // Labels
    fill(60); textSize(11); textStyle(NORMAL);
    textAlign(RIGHT, CENTER);
    text('D0', cx - 40, vy + 148);
    text('D1', cx - 40, vy + 158);
    text('D2', cx - 40, vy + 168);
    text('D3', cx - 40, vy + 178);
    textAlign(LEFT, CENTER);
    text('F', cx + 40, vy + 165);
    textAlign(CENTER, TOP);
    text('S1(A)  S0(B)', cx, vy + 195);
  }
  else if (step.visual === 'summary-inputs') {
    let inputs = [
      {label: 'D0', value: 'C', color: '#1976D2'},
      {label: 'D1', value: "C'", color: '#E91E63'},
      {label: 'D2', value: '0', color: '#757575'},
      {label: 'D3', value: '1', color: '#388E3C'}
    ];
    for (let i = 0; i < 4; i++) {
      let y = vy + 15 + i * 42;
      fill(inputs[i].color + '15');
      stroke(inputs[i].color); strokeWeight(1.5);
      rect(mx + 30, y, w - 60, 35, 5);
      noStroke();
      fill(inputs[i].color);
      textAlign(LEFT, CENTER);
      textSize(16); textStyle(BOLD);
      text(inputs[i].label + ' = ' + inputs[i].value, mx + 50, y + 17);
      // AB values
      fill(100); textSize(12); textStyle(NORMAL);
      textAlign(RIGHT, CENTER);
      let abVals = ['AB=00', 'AB=01', 'AB=10', 'AB=11'];
      text(abVals[i], mx + w - 40, y + 17);
    }
  }
  else if (step.visual === 'mux-circuit') {
    drawMuxCircuit(mx, vy, w, vh);
  }
}

function drawTruthTable(mx, vy, w, vh, highlightGroup, dinput) {
  let cols = ['A', 'B', 'C', 'F'];
  let tableW = min(w - 40, 280);
  let tableX = mx + (w - tableW) / 2;
  let colW = tableW / 4;
  let rowH = 22;
  let startY = vy + 8;

  // Header
  fill(TITLE_BG);
  noStroke();
  rect(tableX, startY, tableW, rowH, 3, 3, 0, 0);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(11); textStyle(BOLD);
  for (let c = 0; c < 4; c++) {
    text(cols[c], tableX + colW * c + colW / 2, startY + rowH / 2);
  }

  let groupColors = ['#E3F2FD', '#F3E5F5', '#FFF3E0', '#E8F5E9'];

  for (let r = 0; r < 8; r++) {
    let y = startY + rowH * (r + 1);
    let group = Math.floor(r / 2);
    let isHighlighted = (group === highlightGroup);

    fill(isHighlighted ? groupColors[group] : (r % 2 === 0 ? 248 : 255));
    stroke(220); strokeWeight(0.5);
    rect(tableX, y, tableW, rowH);
    noStroke();

    for (let c = 0; c < 4; c++) {
      fill(isHighlighted && c === 3 ? HIGHLIGHT : 60);
      textSize(12);
      textStyle(isHighlighted && c === 3 ? BOLD : NORMAL);
      textAlign(CENTER, CENTER);
      text(truthTable[r][c], tableX + colW * c + colW / 2, y + rowH / 2);
    }
  }

  // Show dinput result if present
  if (dinput) {
    let resY = startY + rowH * 9 + 5;
    fill(RESULT_BG);
    stroke('#4CAF50'); strokeWeight(2);
    rect(tableX + 20, resY, tableW - 40, 30, 5);
    noStroke();
    fill('#1B5E20');
    textAlign(CENTER, CENTER);
    textSize(16); textStyle(BOLD);
    text(dinput, tableX + tableW / 2, resY + 15);
  }
}

function drawMuxCircuit(mx, vy, w, vh) {
  let cx = canvasWidth / 2;
  let muxX = cx - 40;
  let muxW = 80;
  let muxH = 120;
  let muxY = vy + 20;

  // MUX body
  fill(MUX_COLOR + '15');
  stroke(MUX_COLOR); strokeWeight(2);
  rect(muxX, muxY, muxW, muxH, 5);
  noStroke();
  fill(MUX_COLOR);
  textAlign(CENTER, CENTER);
  textSize(14); textStyle(BOLD);
  text('4:1 MUX', cx, muxY + muxH / 2);

  // Data inputs
  let inputs = ['C', "C'", '0', '1'];
  let inputColors = ['#1976D2', '#E91E63', '#757575', '#388E3C'];
  let inputX = muxX - 60;

  for (let i = 0; i < 4; i++) {
    let y = muxY + 15 + i * 25;
    // Wire
    stroke(inputColors[i]); strokeWeight(1.5);
    line(inputX + 35, y, muxX, y);
    noStroke();
    // Label
    fill(inputColors[i]);
    textAlign(RIGHT, CENTER);
    textSize(13); textStyle(BOLD);
    text('D' + i + '=' + inputs[i], inputX + 30, y);
    // Port label on MUX
    fill(MUX_COLOR);
    textAlign(LEFT, CENTER);
    textSize(10); textStyle(NORMAL);
    text('D' + i, muxX + 4, y);
  }

  // Select inputs (bottom)
  stroke(60); strokeWeight(1.5);
  line(cx - 15, muxY + muxH, cx - 15, muxY + muxH + 25);
  line(cx + 15, muxY + muxH, cx + 15, muxY + muxH + 25);
  noStroke();
  fill(60);
  textAlign(CENTER, TOP);
  textSize(12); textStyle(BOLD);
  text('A', cx - 15, muxY + muxH + 28);
  text('B', cx + 15, muxY + muxH + 28);
  textSize(10); textStyle(NORMAL);
  text('S1', cx - 15, muxY + muxH + 42);
  text('S0', cx + 15, muxY + muxH + 42);

  // Output
  stroke(60); strokeWeight(2);
  line(muxX + muxW, muxY + muxH / 2, muxX + muxW + 40, muxY + muxH / 2);
  noStroke();
  fill('#1B5E20');
  textAlign(LEFT, CENTER);
  textSize(16); textStyle(BOLD);
  text('F', muxX + muxW + 45, muxY + muxH / 2);

  // Result
  fill(RESULT_BG);
  stroke('#4CAF50'); strokeWeight(2);
  let resY = muxY + muxH + 55;
  rect(mx + 20, resY, w - 40, 30, 5);
  noStroke();
  fill('#1B5E20');
  textAlign(CENTER, CENTER);
  textSize(14); textStyle(BOLD);
  text('F(A,B,C) = Σm(1,2,6,7) ✓', cx, resY + 15);
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
