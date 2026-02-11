// Datapath-Controller Design Walkthrough MicroSim
// Design a simple ALU system: Load A, Load B, Add, Display
// Bloom Level: Apply (L3) - Apply datapath-controller methodology
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
const REG_COLOR = '#5C6BC0';
const ALU_COLOR = '#E91E63';
const CTRL_COLOR = '#009688';
const MUX_COLOR = '#FF9800';
const BUS_COLOR = '#78909C';
const ACTIVE_COLOR = '#4CAF50';

let steps = [
  {
    title: "Datapath-Controller: ALU System",
    desc: "Design a system that loads two values, adds them, and\ndisplays the result. We separate datapath from controller.",
    rule: "Datapath + Controller = Complete System",
    visual: "intro"
  },
  {
    title: "Step 1: Design the Datapath",
    desc: "Components: Register A, Register B, ALU (add), output\nregister. Data bus connects input to registers via MUX.",
    rule: "Datapath: registers + ALU + buses",
    visual: "datapath"
  },
  {
    title: "Step 2: Identify Control Signals",
    desc: "5 control signals needed: ld_A (load Reg A), ld_B (load\nReg B), alu_op, ld_out (load output), out_en (display).",
    rule: "5 control signals identified",
    visual: "control-signals"
  },
  {
    title: "Step 3: Control Signal Table",
    desc: "Each operation requires specific control signal values.\nOnly one register loads per clock cycle.",
    rule: "One operation per clock cycle",
    visual: "signal-table"
  },
  {
    title: "Step 4: Controller FSM Design",
    desc: "4-state FSM: S0 (Load A) \u2192 S1 (Load B) \u2192 S2 (Add) \u2192\nS3 (Display). Sequences through automatically.",
    rule: "4-state sequential controller",
    visual: "fsm"
  },
  {
    title: "Step 5: Map FSM States to Signals",
    desc: "Each FSM state asserts specific control signals.\nS0: ld_A=1, S1: ld_B=1, S2: alu+ld_out=1, S3: out_en=1.",
    rule: "State \u2192 control signal mapping",
    visual: "mapping"
  },
  {
    title: "Step 6: Integrated System",
    desc: "Controller outputs connect to datapath control inputs.\nThe controller sequences the datapath through operations.",
    rule: "Controller drives datapath signals",
    visual: "integration"
  },
  {
    title: "Step 7: Trace \u2014 Compute 5 + 3",
    desc: "S0: Load A=5 \u2192 S1: Load B=3 \u2192 S2: ALU adds 5+3=8\n\u2192 S3: Display output = 8. Complete in 4 clock cycles.",
    rule: "Trace: 5 + 3 = 8 in 4 clocks",
    visual: "trace"
  },
  {
    title: "Result: System Design Complete",
    desc: "The datapath-controller partition separates \"what\" (data\noperations) from \"when\" (sequencing) \u2014 a key design pattern.",
    rule: "Datapath = what, Controller = when",
    visual: "result"
  }
];

totalSteps = steps.length;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  describe('Datapath-controller design walkthrough showing system integration', LABEL);
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

  // Measure description
  let descLines = step.desc.split('\n');
  let descHeight = descLines.length * 15 + 10;

  // Visual area
  let visY = ruleY + 40;
  let visH = drawHeight - visY - descHeight - 12;
  fill(STEP_BG);
  stroke(200);
  strokeWeight(1);
  rect(margin, visY, w, visH, 5);
  noStroke();

  if (step.visual === 'intro') {
    drawIntro(margin, visY, w, visH);
  } else if (step.visual === 'datapath') {
    drawDatapath(margin, visY, w, visH, null);
  } else if (step.visual === 'control-signals') {
    drawControlSignals(margin, visY, w, visH);
  } else if (step.visual === 'signal-table') {
    drawSignalTable(margin, visY, w, visH);
  } else if (step.visual === 'fsm') {
    drawFSM(margin, visY, w, visH, -1);
  } else if (step.visual === 'mapping') {
    drawMapping(margin, visY, w, visH);
  } else if (step.visual === 'integration') {
    drawIntegration(margin, visY, w, visH);
  } else if (step.visual === 'trace') {
    drawTrace(margin, visY, w, visH);
  } else if (step.visual === 'result') {
    drawResultView(margin, visY, w, visH);
  }

  // Description
  let descY = visY + visH + 8;
  fill(60);
  textAlign(LEFT, TOP);
  textSize(12);
  textStyle(NORMAL);
  for (let i = 0; i < descLines.length; i++) {
    text(descLines[i], margin + 10, descY + i * 15);
  }

  drawButtons();
}

function drawIntro(mx, vy, w, vh) {
  let cx = canvasWidth / 2;

  fill(60);
  textAlign(CENTER, CENTER);
  textSize(15);
  textStyle(BOLD);
  text('Simple ALU System', cx, vy + 20);

  // Operations list
  let ops = [
    { label: '1. Load A', icon: 'A \u2190 input', color: REG_COLOR },
    { label: '2. Load B', icon: 'B \u2190 input', color: REG_COLOR },
    { label: '3. Add', icon: 'R \u2190 A + B', color: ALU_COLOR },
    { label: '4. Display', icon: 'out \u2190 R', color: ACTIVE_COLOR }
  ];

  let boxW = 130;
  let boxH = 30;
  let startY = vy + 42;

  for (let i = 0; i < ops.length; i++) {
    let y = startY + i * (boxH + 8);
    fill(ops[i].color + '15');
    stroke(ops[i].color);
    strokeWeight(1);
    rect(cx - boxW / 2, y, boxW, boxH, 5);
    noStroke();
    fill(ops[i].color);
    textAlign(CENTER, CENTER);
    textSize(12);
    textStyle(BOLD);
    text(ops[i].label + ':  ' + ops[i].icon, cx, y + boxH / 2);

    if (i < 3) {
      fill(100);
      textSize(10);
      text('\u2193', cx, y + boxH + 3);
    }
  }

  // Design approach
  let appY = startY + 4 * (boxH + 8) + 5;
  fill(80);
  textSize(12);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text('Design Approach: Separate Datapath & Controller', cx, appY);

  fill(100);
  textSize(13);
  textStyle(NORMAL);
  text('Click "Next \u2192" to begin', cx, vy + vh - 12);
}

function drawDatapath(mx, vy, w, vh, activeComponent) {
  let cx = canvasWidth / 2;
  let compW = 55;
  let compH = 35;

  // Input bus
  let inputY = vy + 12;
  fill(BUS_COLOR);
  textAlign(CENTER, CENTER);
  textSize(10);
  textStyle(BOLD);
  text('Data Input', cx, inputY);

  // Input arrow down
  stroke(BUS_COLOR);
  strokeWeight(2);
  line(cx, inputY + 8, cx, inputY + 22);
  noStroke();

  // MUX
  let muxY = inputY + 24;
  let muxColor = activeComponent === 'mux' ? ACTIVE_COLOR : MUX_COLOR;
  fill(muxColor + '20');
  stroke(muxColor);
  strokeWeight(1.5);
  // Trapezoid for MUX
  beginShape();
  vertex(cx - 25, muxY);
  vertex(cx + 25, muxY);
  vertex(cx + 18, muxY + 22);
  vertex(cx - 18, muxY + 22);
  endShape(CLOSE);
  noStroke();
  fill(muxColor);
  textSize(9);
  textStyle(BOLD);
  text('MUX', cx, muxY + 11);

  // Split to Reg A and Reg B
  let regY = muxY + 38;
  let regAx = cx - 55;
  let regBx = cx + 55;

  // Bus lines from MUX
  stroke(BUS_COLOR);
  strokeWeight(1.5);
  line(cx, muxY + 22, cx, muxY + 28);
  line(cx, muxY + 28, regAx, muxY + 28);
  line(cx, muxY + 28, regBx, muxY + 28);
  line(regAx, muxY + 28, regAx, regY);
  line(regBx, muxY + 28, regBx, regY);
  noStroke();

  // Register A
  let regAcolor = activeComponent === 'regA' ? ACTIVE_COLOR : REG_COLOR;
  drawComponent(regAx - compW / 2, regY, compW, compH, 'Reg A', regAcolor);

  // Register B
  let regBcolor = activeComponent === 'regB' ? ACTIVE_COLOR : REG_COLOR;
  drawComponent(regBx - compW / 2, regY, compW, compH, 'Reg B', regBcolor);

  // ALU
  let aluY = regY + compH + 20;
  let aluColor = activeComponent === 'alu' ? ACTIVE_COLOR : ALU_COLOR;

  // Bus lines to ALU
  stroke(BUS_COLOR);
  strokeWeight(1.5);
  line(regAx, regY + compH, regAx, aluY + 5);
  line(regBx, regY + compH, regBx, aluY + 5);
  noStroke();

  // ALU shape (pentagon-like)
  fill(aluColor + '20');
  stroke(aluColor);
  strokeWeight(1.5);
  beginShape();
  vertex(cx - 35, aluY);
  vertex(cx + 35, aluY);
  vertex(cx + 25, aluY + 30);
  vertex(cx, aluY + 22);
  vertex(cx - 25, aluY + 30);
  endShape(CLOSE);
  noStroke();
  fill(aluColor);
  textSize(10);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text('ALU', cx, aluY + 12);

  // Output Register
  let outY = aluY + 42;
  let outColor = activeComponent === 'out' ? ACTIVE_COLOR : CTRL_COLOR;

  stroke(BUS_COLOR);
  strokeWeight(1.5);
  line(cx, aluY + 30, cx, outY);
  noStroke();

  drawComponent(cx - compW / 2, outY, compW, compH, 'Out Reg', outColor);

  // Output
  stroke(BUS_COLOR);
  strokeWeight(1.5);
  line(cx, outY + compH, cx, outY + compH + 12);
  noStroke();
  fill(ACTIVE_COLOR);
  textSize(10);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text('Display', cx, outY + compH + 20);

  // Control signal labels on the side
  fill(CTRL_COLOR);
  textSize(8);
  textStyle(NORMAL);
  textAlign(RIGHT, CENTER);
  text('ld_A \u2192', regAx - compW / 2 - 3, regY + compH / 2);
  text('ld_B \u2192', regBx + compW / 2 + 28, regY + compH / 2);
  textAlign(LEFT, CENTER);
  text('\u2190 alu_op', cx + 38, aluY + 12);
  text('\u2190 ld_out', cx + compW / 2 + 3, outY + compH / 2);
  text('\u2190 out_en', cx + compW / 2 + 3, outY + compH + 20);
}

function drawComponent(x, y, w, h, label, color) {
  fill(color + '20');
  stroke(color);
  strokeWeight(1.5);
  rect(x, y, w, h, 4);
  noStroke();
  fill(color);
  textAlign(CENTER, CENTER);
  textSize(10);
  textStyle(BOLD);
  text(label, x + w / 2, y + h / 2);
}

function drawControlSignals(mx, vy, w, vh) {
  let cx = canvasWidth / 2;

  fill(60);
  textAlign(CENTER, CENTER);
  textSize(13);
  textStyle(BOLD);
  text('Control Signals', cx, vy + 15);

  let signals = [
    { name: 'ld_A', desc: 'Load Register A from input', color: REG_COLOR },
    { name: 'ld_B', desc: 'Load Register B from input', color: REG_COLOR },
    { name: 'alu_op', desc: 'ALU operation (0=pass, 1=add)', color: ALU_COLOR },
    { name: 'ld_out', desc: 'Load output register from ALU', color: CTRL_COLOR },
    { name: 'out_en', desc: 'Enable display output', color: ACTIVE_COLOR }
  ];

  let startY = vy + 32;
  let rowH = 30;

  for (let i = 0; i < signals.length; i++) {
    let y = startY + i * rowH;
    let s = signals[i];

    fill(s.color + '15');
    stroke(s.color);
    strokeWeight(1);
    rect(mx + 15, y, w - 30, rowH - 4, 4);
    noStroke();

    fill(s.color);
    textAlign(LEFT, CENTER);
    textSize(11);
    textStyle(BOLD);
    text(s.name, mx + 25, y + (rowH - 4) / 2);

    fill(80);
    textSize(10);
    textStyle(NORMAL);
    text(s.desc, mx + 80, y + (rowH - 4) / 2);
  }

  let noteY = startY + signals.length * rowH + 8;
  fill(HIGHLIGHT);
  textAlign(CENTER, CENTER);
  textSize(11);
  textStyle(BOLD);
  text('Each signal = 1 bit from controller to datapath', cx, noteY);
}

function drawSignalTable(mx, vy, w, vh) {
  let cx = canvasWidth / 2;
  let tableLeft = mx + 10;
  let colW = (w - 20) / 6;
  let rowH = 24;
  let headerY = vy + 8;

  // Headers
  let headers = ['State', 'ld_A', 'ld_B', 'alu_op', 'ld_out', 'out_en'];
  fill(TITLE_BG);
  noStroke();
  rect(tableLeft, headerY, w - 20, rowH, 3);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(9);
  textStyle(BOLD);
  for (let i = 0; i < headers.length; i++) {
    text(headers[i], tableLeft + i * colW + colW / 2, headerY + rowH / 2);
  }

  // Rows
  let rows = [
    { state: 'S0: Load A', vals: ['1', '0', '-', '0', '0'], color: REG_COLOR },
    { state: 'S1: Load B', vals: ['0', '1', '-', '0', '0'], color: REG_COLOR },
    { state: 'S2: Add', vals: ['0', '0', '1', '1', '0'], color: ALU_COLOR },
    { state: 'S3: Display', vals: ['0', '0', '0', '0', '1'], color: ACTIVE_COLOR }
  ];

  for (let r = 0; r < rows.length; r++) {
    let y = headerY + rowH + r * rowH;
    let row = rows[r];

    fill(r % 2 === 0 ? '#FAFAFA' : 255);
    stroke(220);
    strokeWeight(0.5);
    rect(tableLeft, y, w - 20, rowH);
    noStroke();

    // State name
    fill(row.color);
    textAlign(CENTER, CENTER);
    textSize(9);
    textStyle(BOLD);
    text(row.state, tableLeft + colW / 2, y + rowH / 2);

    // Signal values
    for (let c = 0; c < row.vals.length; c++) {
      let val = row.vals[c];
      fill(val === '1' ? ACTIVE_COLOR : (val === '-' ? '#BDBDBD' : '#999'));
      textSize(12);
      textStyle(val === '1' ? BOLD : NORMAL);
      text(val, tableLeft + (c + 1) * colW + colW / 2, y + rowH / 2);
    }
  }

  // Legend
  let legY = headerY + rowH + rows.length * rowH + 10;
  fill(80);
  textAlign(CENTER, CENTER);
  textSize(10);
  textStyle(NORMAL);
  text('1 = asserted    0 = deasserted    - = don\'t care', cx, legY);
}

function drawFSM(mx, vy, w, vh, activeState) {
  let cx = canvasWidth / 2;
  let stateR = 25;

  let states = [
    { name: 'S0', label: 'Load A', x: cx - 80, y: vy + 35, color: REG_COLOR },
    { name: 'S1', label: 'Load B', x: cx + 80, y: vy + 35, color: REG_COLOR },
    { name: 'S2', label: 'Add', x: cx + 80, y: vy + vh - 40, color: ALU_COLOR },
    { name: 'S3', label: 'Display', x: cx - 80, y: vy + vh - 40, color: ACTIVE_COLOR }
  ];

  // Draw transitions
  for (let i = 0; i < 4; i++) {
    let from = states[i];
    let to = states[(i + 1) % 4];

    let angle = atan2(to.y - from.y, to.x - from.x);
    let sx = from.x + stateR * cos(angle);
    let sy = from.y + stateR * sin(angle);
    let ex = to.x - stateR * cos(angle);
    let ey = to.y - stateR * sin(angle);

    stroke(100);
    strokeWeight(1.5);
    line(sx, sy, ex, ey);
    // Arrowhead
    line(ex, ey, ex - 8 * cos(angle - 0.4), ey - 8 * sin(angle - 0.4));
    line(ex, ey, ex - 8 * cos(angle + 0.4), ey - 8 * sin(angle + 0.4));
    noStroke();
  }

  // Draw states
  for (let i = 0; i < states.length; i++) {
    let s = states[i];
    let isActive = (i === activeState);

    fill(isActive ? ACTIVE_COLOR + '30' : s.color + '20');
    stroke(isActive ? ACTIVE_COLOR : s.color);
    strokeWeight(2);
    ellipse(s.x, s.y, stateR * 2, stateR * 2);
    noStroke();

    fill(isActive ? ACTIVE_COLOR : s.color);
    textAlign(CENTER, CENTER);
    textSize(10);
    textStyle(BOLD);
    text(s.name, s.x, s.y - 5);
    textSize(8);
    textStyle(NORMAL);
    text(s.label, s.x, s.y + 8);
  }

  // Reset arrow
  stroke(100);
  strokeWeight(1.5);
  let rx = states[0].x - stateR - 20;
  line(rx, states[0].y, states[0].x - stateR, states[0].y);
  line(states[0].x - stateR - 5, states[0].y - 4, states[0].x - stateR, states[0].y);
  line(states[0].x - stateR - 5, states[0].y + 4, states[0].x - stateR, states[0].y);
  noStroke();
  fill(100);
  textSize(9);
  textStyle(NORMAL);
  textAlign(CENTER, CENTER);
  text('reset', rx - 8, states[0].y - 10);

  // Cycle label in center
  fill(80);
  textSize(11);
  textStyle(NORMAL);
  textAlign(CENTER, CENTER);
  let midY = (states[0].y + states[3].y) / 2;
  text('Automatic', cx, midY - 8);
  text('sequencing', cx, midY + 6);
}

function drawMapping(mx, vy, w, vh) {
  let cx = canvasWidth / 2;
  let stateR = 18;
  let stateY = vy + 22;
  let sigY = vy + vh - 25;

  let states = [
    { name: 'S0', color: REG_COLOR, sigs: 'ld_A=1' },
    { name: 'S1', color: REG_COLOR, sigs: 'ld_B=1' },
    { name: 'S2', color: ALU_COLOR, sigs: 'alu=1, ld_out=1' },
    { name: 'S3', color: ACTIVE_COLOR, sigs: 'out_en=1' }
  ];

  let gap = (w - 40) / 4;
  let startX = mx + 20 + gap / 2;

  for (let i = 0; i < states.length; i++) {
    let s = states[i];
    let x = startX + i * gap;

    // State circle
    fill(s.color + '20');
    stroke(s.color);
    strokeWeight(2);
    ellipse(x, stateY, stateR * 2, stateR * 2);
    noStroke();
    fill(s.color);
    textAlign(CENTER, CENTER);
    textSize(10);
    textStyle(BOLD);
    text(s.name, x, stateY);

    // Arrow down
    stroke(s.color);
    strokeWeight(1.5);
    line(x, stateY + stateR + 2, x, sigY - 18);
    line(x - 4, sigY - 23, x, sigY - 18);
    line(x + 4, sigY - 23, x, sigY - 18);
    noStroke();

    // Signal box
    fill(s.color + '15');
    stroke(s.color);
    strokeWeight(1);
    let boxW = gap - 10;
    rect(x - boxW / 2, sigY - 14, boxW, 28, 4);
    noStroke();
    fill(s.color);
    textSize(8);
    textStyle(BOLD);
    text(s.sigs, x, sigY);
  }

  // "all others = 0" note
  let noteY = (stateY + stateR + sigY - 18) / 2;
  fill(80);
  textSize(9);
  textStyle(NORMAL);
  textAlign(CENTER, CENTER);
  text('all other\nsignals = 0', cx, noteY);
}

function drawIntegration(mx, vy, w, vh) {
  let cx = canvasWidth / 2;

  // Controller box (top)
  let ctrlY = vy + 10;
  let ctrlW = 120;
  let ctrlH = 45;
  fill(CTRL_COLOR + '20');
  stroke(CTRL_COLOR);
  strokeWeight(2);
  rect(cx - ctrlW / 2, ctrlY, ctrlW, ctrlH, 5);
  noStroke();
  fill(CTRL_COLOR);
  textAlign(CENTER, CENTER);
  textSize(12);
  textStyle(BOLD);
  text('Controller', cx, ctrlY + 13);
  textSize(9);
  textStyle(NORMAL);
  text('FSM (S0-S3)', cx, ctrlY + 30);

  // Control signals arrows
  let sigNames = ['ld_A', 'ld_B', 'alu_op', 'ld_out', 'out_en'];
  let sigStartY = ctrlY + ctrlH;
  let sigEndY = sigStartY + 30;
  let sigGap = (w - 60) / sigNames.length;
  let sigStartX = mx + 30 + sigGap / 2;

  for (let i = 0; i < sigNames.length; i++) {
    let x = sigStartX + i * sigGap;
    stroke(CTRL_COLOR);
    strokeWeight(1);
    line(x, sigStartY, x, sigEndY);
    line(x - 3, sigEndY - 5, x, sigEndY);
    line(x + 3, sigEndY - 5, x, sigEndY);
    noStroke();
    fill(CTRL_COLOR);
    textSize(7);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text(sigNames[i], x, (sigStartY + sigEndY) / 2 - 2);
  }

  // Datapath box (bottom)
  let dpY = sigEndY + 5;
  let dpH = vh - (dpY - vy) - 5;
  fill(REG_COLOR + '10');
  stroke(REG_COLOR);
  strokeWeight(2);
  rect(mx + 10, dpY, w - 20, dpH, 5);
  noStroke();

  fill(REG_COLOR);
  textAlign(CENTER, TOP);
  textSize(12);
  textStyle(BOLD);
  text('Datapath', cx, dpY + 5);

  // Mini datapath components
  let compW = 40;
  let compH = 22;
  let compY = dpY + 25;

  // Reg A
  drawMiniComp(cx - 60, compY, compW, compH, 'Reg A', REG_COLOR);
  // Reg B
  drawMiniComp(cx + 20, compY, compW, compH, 'Reg B', REG_COLOR);
  // ALU
  drawMiniComp(cx - 20, compY + compH + 12, compW, compH, 'ALU', ALU_COLOR);
  // Out
  drawMiniComp(cx - 20, compY + 2 * (compH + 12), compW, compH, 'Out', ACTIVE_COLOR);

  // Input arrow
  stroke(BUS_COLOR);
  strokeWeight(1.5);
  line(mx + 20, dpY + dpH / 2, mx + 10, dpY + dpH / 2);
  noStroke();
  fill(BUS_COLOR);
  textSize(8);
  textAlign(RIGHT, CENTER);
  text('Data\nIn', mx + 8, dpY + dpH / 2);

  // Output arrow
  stroke(BUS_COLOR);
  strokeWeight(1.5);
  line(mx + w - 10, dpY + dpH / 2, mx + w - 20, dpY + dpH / 2);
  noStroke();
  fill(BUS_COLOR);
  textSize(8);
  textAlign(LEFT, CENTER);
  text('Data\nOut', mx + w - 8, dpY + dpH / 2);
}

function drawMiniComp(x, y, w, h, label, color) {
  fill(color + '20');
  stroke(color);
  strokeWeight(1);
  rect(x, y, w, h, 3);
  noStroke();
  fill(color);
  textAlign(CENTER, CENTER);
  textSize(8);
  textStyle(BOLD);
  text(label, x + w / 2, y + h / 2);
}

function drawTrace(mx, vy, w, vh) {
  let cx = canvasWidth / 2;

  // Timeline
  let traceSteps = [
    { state: 'S0: Load A', action: 'Reg A \u2190 5', regA: '5', regB: '-', alu: '-', out: '-', color: REG_COLOR },
    { state: 'S1: Load B', action: 'Reg B \u2190 3', regA: '5', regB: '3', alu: '-', out: '-', color: REG_COLOR },
    { state: 'S2: Add', action: 'Out \u2190 5+3', regA: '5', regB: '3', alu: '8', out: '8', color: ALU_COLOR },
    { state: 'S3: Display', action: 'Show 8', regA: '5', regB: '3', alu: '8', out: '\u27A18', color: ACTIVE_COLOR }
  ];

  let headerY = vy + 5;
  let colW = (w - 20) / 6;
  let rowH = 28;

  // Headers
  let headers = ['Clock', 'State', 'Action', 'A', 'B', 'Out'];
  fill(TITLE_BG);
  noStroke();
  rect(mx + 10, headerY, w - 20, rowH, 3);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(9);
  textStyle(BOLD);
  for (let i = 0; i < headers.length; i++) {
    text(headers[i], mx + 10 + i * colW + colW / 2, headerY + rowH / 2);
  }

  // Rows
  for (let r = 0; r < traceSteps.length; r++) {
    let y = headerY + rowH + r * rowH;
    let ts = traceSteps[r];

    // Row background
    fill(ts.color + '10');
    noStroke();
    rect(mx + 10, y, w - 20, rowH);

    // Active indicator
    fill(ts.color);
    rect(mx + 10, y, 3, rowH);

    textAlign(CENTER, CENTER);
    textSize(9);

    // Clock
    fill(80);
    textStyle(NORMAL);
    text(r + 1, mx + 10 + colW / 2, y + rowH / 2);

    // State
    fill(ts.color);
    textStyle(BOLD);
    text(ts.state, mx + 10 + colW + colW / 2, y + rowH / 2);

    // Action
    fill(80);
    textSize(8);
    textStyle(NORMAL);
    text(ts.action, mx + 10 + 2 * colW + colW / 2, y + rowH / 2);

    // Register values
    let vals = [ts.regA, ts.regB, ts.out];
    for (let c = 0; c < vals.length; c++) {
      let val = vals[c];
      fill(val === '-' ? '#BDBDBD' : '#1B5E20');
      textSize(12);
      textStyle(val === '-' ? NORMAL : BOLD);
      text(val, mx + 10 + (c + 3) * colW + colW / 2, y + rowH / 2);
    }
  }

  // Result box
  let resY = headerY + rowH + traceSteps.length * rowH + 10;
  fill(RESULT_BG);
  stroke('#4CAF50');
  strokeWeight(2);
  rect(mx + 20, resY, w - 40, 32, 5);
  noStroke();
  fill('#1B5E20');
  textAlign(CENTER, CENTER);
  textSize(14);
  textStyle(BOLD);
  text('5 + 3 = 8  \u2714  (4 clock cycles)', cx, resY + 16);
}

function drawResultView(mx, vy, w, vh) {
  let cx = canvasWidth / 2;

  fill('#4CAF50');
  textAlign(CENTER, CENTER);
  textSize(16);
  textStyle(BOLD);
  text('\u2714 System Design Complete', cx, vy + 20);

  let y = vy + 45;
  let boxW = w - 40;
  let items = [
    { label: 'Datapath', detail: 'Reg A, Reg B, ALU, Output Register, MUX', color: REG_COLOR },
    { label: 'Control Signals', detail: 'ld_A, ld_B, alu_op, ld_out, out_en', color: MUX_COLOR },
    { label: 'Controller FSM', detail: '4 states: S0 \u2192 S1 \u2192 S2 \u2192 S3', color: CTRL_COLOR },
    { label: 'Verification', detail: '5 + 3 = 8, computed in 4 clock cycles', color: ACTIVE_COLOR }
  ];

  for (let i = 0; i < items.length; i++) {
    let item = items[i];
    fill(item.color + '15');
    stroke(item.color);
    strokeWeight(1);
    rect(mx + 20, y, boxW, 38, 5);
    noStroke();
    fill(item.color);
    textAlign(LEFT, CENTER);
    textSize(11);
    textStyle(BOLD);
    text(item.label, mx + 30, y + 12);
    fill(80);
    textSize(10);
    textStyle(NORMAL);
    text(item.detail, mx + 30, y + 27);
    y += 44;
  }

  // Key insight
  y += 5;
  fill(HIGHLIGHT + '20');
  stroke(HIGHLIGHT);
  strokeWeight(1);
  rect(mx + 20, y, boxW, 28, 5);
  noStroke();
  fill(HIGHLIGHT);
  textAlign(CENTER, CENTER);
  textSize(11);
  textStyle(BOLD);
  text('Datapath = "what"    Controller = "when"', cx, y + 14);
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
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
