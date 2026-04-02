// Full Adder Walkthrough MicroSim
// Design a full adder from truth table to gate circuit
// Bloom Level: Apply (L3) - Apply combinational design methodology
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 500;
let controlHeight = 90;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let currentStep = 0;
let totalSteps;

const TITLE_BG = '#5A3EED';
const STEP_BG = '#F4F0FF';
const HIGHLIGHT = '#D4A017';
const RESULT_BG = '#EDE7F6';
const HIGHLIGHT_ROW = '#F4F0FF';

// UI elements
let presetSelect;
let goButton;

// Preset circuits
let presets = [
  {
    label: "Full Adder",
    colHeaders: ['A', 'B', 'Cin', 'Sum', 'Cout'],
    numInputs: 3,
    truthTable: [
      [0,0,0, 0,0],
      [0,0,1, 1,0],
      [0,1,0, 1,0],
      [0,1,1, 0,1],
      [1,0,0, 1,0],
      [1,0,1, 0,1],
      [1,1,0, 0,1],
      [1,1,1, 1,1]
    ],
    steps: [
      {
        title: "Design a Full Adder Circuit",
        desc: "A full adder adds three 1-bit inputs (A, B, Carry-in) and produces\na Sum and Carry-out. Let's design it step by step.",
        rule: "Combinational Design Flow",
        visual: "intro"
      },
      {
        title: "Step 1: Write the Truth Table",
        desc: "List all 8 input combinations for A, B, Cin.\nCalculate Sum and Cout for each row.",
        rule: "Truth Table: 2^n rows for n inputs",
        visual: "truth-table",
        highlightRows: []
      },
      {
        title: "Step 2: Identify Minterms for Sum",
        desc: "Sum = 1 at rows 1, 2, 4, 7 (counting from 0).\nSum minterms: m(1, 2, 4, 7)",
        rule: "Minterms: rows where output = 1",
        visual: "truth-table",
        highlightRows: [1, 2, 4, 7],
        highlightCol: "sum"
      },
      {
        title: "Step 3: SOP Expression for Sum",
        desc: "Sum = A'B'Cin + A'BCin' + AB'Cin' + ABCin\nThis is equivalent to Sum = A XOR B XOR Cin",
        rule: "Sum-of-Products from minterms",
        visual: "sop-sum"
      },
      {
        title: "Step 4: Identify Minterms for Cout",
        desc: "Cout = 1 at rows 3, 5, 6, 7 (counting from 0).\nCout minterms: m(3, 5, 6, 7)",
        rule: "Minterms: rows where output = 1",
        visual: "truth-table",
        highlightRows: [3, 5, 6, 7],
        highlightCol: "cout"
      },
      {
        title: "Step 5: SOP Expression for Cout",
        desc: "Cout = A'BCin + AB'Cin + ABCin' + ABCin\nSimplifies to: Cout = AB + ACin + BCin",
        rule: "Sum-of-Products -> Simplified",
        visual: "sop-cout"
      },
      {
        title: "Step 6: Gate Circuit for Sum",
        desc: "Sum = A XOR B XOR Cin\nImplemented with two XOR gates in cascade.",
        rule: "XOR gate implements odd-parity function",
        visual: "circuit-sum"
      },
      {
        title: "Step 7: Gate Circuit for Cout",
        desc: "Cout = AB + ACin + BCin\nThree AND gates feeding one OR gate.",
        rule: "SOP -> AND-OR implementation",
        visual: "circuit-cout"
      },
      {
        title: "Complete Full Adder",
        desc: "The full adder is complete with:\n- Sum = A XOR B XOR Cin (two XOR gates)\n- Cout = AB + ACin + BCin (three AND + one OR)",
        rule: "Full Adder Design Complete",
        visual: "complete"
      }
    ]
  },
  {
    label: "Half Adder",
    colHeaders: ['A', 'B', 'Sum', 'Carry'],
    numInputs: 2,
    truthTable: [
      [0,0, 0,0],
      [0,1, 1,0],
      [1,0, 1,0],
      [1,1, 0,1]
    ],
    steps: [
      {
        title: "Design a Half Adder Circuit",
        desc: "A half adder adds two 1-bit inputs (A, B) and produces\na Sum and Carry output. Let's design it step by step.",
        rule: "Combinational Design Flow",
        visual: "intro"
      },
      {
        title: "Step 1: Write the Truth Table",
        desc: "List all 4 input combinations for A, B.\nCalculate Sum and Carry for each row.",
        rule: "Truth Table: 2^n rows for n inputs",
        visual: "truth-table",
        highlightRows: []
      },
      {
        title: "Step 2: Identify Minterms for Sum",
        desc: "Sum = 1 at rows 1, 2 (counting from 0).\nSum minterms: m(1, 2)",
        rule: "Minterms: rows where output = 1",
        visual: "truth-table",
        highlightRows: [1, 2],
        highlightCol: "sum"
      },
      {
        title: "Step 3: Expression for Sum",
        desc: "Sum = A'B + AB'\nThis is equivalent to Sum = A XOR B (XOR)",
        rule: "Sum-of-Products from minterms",
        visual: "ha-sop-sum"
      },
      {
        title: "Step 4: Identify Minterms for Carry",
        desc: "Carry = 1 at row 3 (counting from 0).\nCarry minterms: m(3)",
        rule: "Minterms: rows where output = 1",
        visual: "truth-table",
        highlightRows: [3],
        highlightCol: "cout"
      },
      {
        title: "Step 5: Expression for Carry",
        desc: "Carry = AB\nOnly one minterm, so the expression is simply AB.",
        rule: "Single minterm -> AND gate",
        visual: "ha-sop-carry"
      },
      {
        title: "Step 6: Gate Circuit for Sum",
        desc: "Sum = A XOR B\nImplemented with one XOR gate.",
        rule: "XOR gate implements odd-parity function",
        visual: "ha-circuit-sum"
      },
      {
        title: "Step 7: Gate Circuit for Carry",
        desc: "Carry = AB\nImplemented with one AND gate.",
        rule: "Single AND gate for product term",
        visual: "ha-circuit-carry"
      },
      {
        title: "Complete Half Adder",
        desc: "The half adder is complete with:\n- Sum = A XOR B (one XOR gate)\n- Carry = AB (one AND gate)",
        rule: "Half Adder Design Complete",
        visual: "ha-complete"
      }
    ]
  },
  {
    label: "Full Subtractor",
    colHeaders: ['A', 'B', 'Bin', 'Diff', 'Bout'],
    numInputs: 3,
    truthTable: [
      [0,0,0, 0,0],
      [0,0,1, 1,1],
      [0,1,0, 1,1],
      [0,1,1, 0,1],
      [1,0,0, 1,0],
      [1,0,1, 0,0],
      [1,1,0, 0,0],
      [1,1,1, 1,1]
    ],
    steps: [
      {
        title: "Design a Full Subtractor Circuit",
        desc: "A full subtractor computes A - B - Bin and produces\na Difference and Borrow-out. Let's design it step by step.",
        rule: "Combinational Design Flow",
        visual: "intro"
      },
      {
        title: "Step 1: Write the Truth Table",
        desc: "List all 8 input combinations for A, B, Bin.\nCalculate Diff and Bout for each row.",
        rule: "Truth Table: 2^n rows for n inputs",
        visual: "truth-table",
        highlightRows: []
      },
      {
        title: "Step 2: Identify Minterms for Diff",
        desc: "Diff = 1 at rows 1, 2, 4, 7 (counting from 0).\nDiff minterms: m(1, 2, 4, 7)",
        rule: "Minterms: rows where output = 1",
        visual: "truth-table",
        highlightRows: [1, 2, 4, 7],
        highlightCol: "sum"
      },
      {
        title: "Step 3: Expression for Diff",
        desc: "Diff = A'B'Bin + A'BBin' + AB'Bin' + ABBin\nThis is equivalent to Diff = A XOR B XOR Bin",
        rule: "Sum-of-Products from minterms",
        visual: "fs-sop-diff"
      },
      {
        title: "Step 4: Identify Minterms for Bout",
        desc: "Bout = 1 at rows 1, 2, 3, 7 (counting from 0).\nBout minterms: m(1, 2, 3, 7)",
        rule: "Minterms: rows where output = 1",
        visual: "truth-table",
        highlightRows: [1, 2, 3, 7],
        highlightCol: "cout"
      },
      {
        title: "Step 5: Expression for Bout",
        desc: "Bout = A'B'Bin + A'BBin' + A'BBin + ABBin\nSimplifies to: Bout = A'B + A'Bin + BBin",
        rule: "Sum-of-Products -> Simplified",
        visual: "fs-sop-bout"
      },
      {
        title: "Step 6: Gate Circuit for Diff",
        desc: "Diff = A XOR B XOR Bin\nImplemented with two XOR gates in cascade.",
        rule: "XOR gate implements odd-parity function",
        visual: "fs-circuit-diff"
      },
      {
        title: "Step 7: Gate Circuit for Bout",
        desc: "Bout = A'B + A'Bin + BBin\nNOT gate on A, three AND gates feeding one OR gate.",
        rule: "SOP -> NOT-AND-OR implementation",
        visual: "fs-circuit-bout"
      },
      {
        title: "Complete Full Subtractor",
        desc: "The full subtractor is complete with:\n- Diff = A XOR B XOR Bin (two XOR gates)\n- Bout = A'B + A'Bin + BBin (three AND + one OR)",
        rule: "Full Subtractor Design Complete",
        visual: "fs-complete"
      }
    ]
  }
];

let activePreset = presets[0];
let truthTable = activePreset.truthTable.slice();
let colHeaders = activePreset.colHeaders.slice();
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
  goButton.style('background-color', '#5A3EED');
  goButton.style('color', 'white');
  goButton.style('border', 'none');
  goButton.style('padding', '4px 16px');
  goButton.style('border-radius', '4px');
  goButton.style('cursor', 'pointer');
  goButton.style('font-weight', 'bold');

  positionUIElements();
  describe('Full adder design walkthrough from truth table to gate circuit', LABEL);
}

function positionUIElements() {
  let mainRect = document.querySelector('main').getBoundingClientRect();
  presetSelect.position(mainRect.left + 65, mainRect.top + drawHeight + 10);
  goButton.position(mainRect.left + 250, mainRect.top + drawHeight + 8);
}

function handleGo() {
  let idx = parseInt(presetSelect.value());
  activePreset = presets[idx];
  truthTable = activePreset.truthTable.slice();
  colHeaders = activePreset.colHeaders.slice();
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

  // Soft purple card background
  fill('#F4F0FF');
  stroke('#C9B9FF');
  strokeWeight(1.5);
  rect(margin - 5, margin - 5, w + 10, drawHeight - margin + 5, 14);
  noStroke();

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
  let visH = drawHeight - visY - 75;
  fill(STEP_BG);
  stroke(200);
  strokeWeight(1);
  rect(margin, visY, w, visH, 5);
  noStroke();

  drawVisual(step, margin, visY, w, visH);

  // Description
  let descY = drawHeight - 65;
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
  text('Circuit:', margin, drawHeight + 18);

  drawButtons();
}

function drawVisual(step, mx, vy, w, vh) {
  let cx = canvasWidth / 2;

  if (step.visual === 'intro') {
    drawIntroVisual(cx, vy, vh);
  }
  else if (step.visual === 'truth-table') {
    drawTruthTable(mx, vy, w, vh, step.highlightRows || [], step.highlightCol || null);
  }
  else if (step.visual === 'sop-sum') {
    drawSOPVisual(cx, mx, vy, w,
      "m(1, 2, 4, 7)",
      "A'B'Cin + A'BCin' + AB'Cin' + ABCin",
      "Sum = A XOR B XOR Cin"
    );
  }
  else if (step.visual === 'sop-cout') {
    drawSOPVisual(cx, mx, vy, w,
      "m(3, 5, 6, 7)",
      "A'BCin + AB'Cin + ABCin' + ABCin",
      "Cout = AB + ACin + BCin"
    );
  }
  else if (step.visual === 'circuit-sum') {
    drawSumCircuit(mx, vy, w, vh);
  }
  else if (step.visual === 'circuit-cout') {
    drawCoutCircuit(mx, vy, w, vh);
  }
  else if (step.visual === 'complete') {
    drawCompleteFullAdder(cx, mx, vy, w, vh);
  }
  // Half Adder visuals
  else if (step.visual === 'ha-sop-sum') {
    drawSOPVisual(cx, mx, vy, w,
      "m(1, 2)",
      "A'B + AB'",
      "Sum = A XOR B"
    );
  }
  else if (step.visual === 'ha-sop-carry') {
    drawSOPVisual(cx, mx, vy, w,
      "m(3)",
      "AB",
      "Carry = AB"
    );
  }
  else if (step.visual === 'ha-circuit-sum') {
    drawHaSumCircuit(mx, vy, w, vh);
  }
  else if (step.visual === 'ha-circuit-carry') {
    drawHaCarryCircuit(mx, vy, w, vh);
  }
  else if (step.visual === 'ha-complete') {
    fill(RESULT_BG);
    stroke('#7A5CFF');
    strokeWeight(2);
    rect(mx + 20, vy + 20, w - 40, 50, 8);
    rect(mx + 20, vy + 85, w - 40, 50, 8);
    noStroke();
    fill('#3A2499');
    textAlign(CENTER, CENTER);
    textSize(18);
    textStyle(BOLD);
    text('Sum = A XOR B', cx, vy + 45);
    text('Carry = AB', cx, vy + 110);
    fill(100);
    textSize(13);
    textStyle(NORMAL);
    text('1 XOR gate', cx, vy + 150);
    text('1 AND gate', cx, vy + 170);
    text('Total: 2 gates', cx, vy + 195);
  }
  // Full Subtractor visuals
  else if (step.visual === 'fs-sop-diff') {
    drawSOPVisual(cx, mx, vy, w,
      "m(1, 2, 4, 7)",
      "A'B'Bin + A'BBin' + AB'Bin' + ABBin",
      "Diff = A XOR B XOR Bin"
    );
  }
  else if (step.visual === 'fs-sop-bout') {
    drawSOPVisual(cx, mx, vy, w,
      "m(1, 2, 3, 7)",
      "A'B'Bin + A'BBin' + A'BBin + ABBin",
      "Bout = A'B + A'Bin + BBin"
    );
  }
  else if (step.visual === 'fs-circuit-diff') {
    drawFsDiffCircuit(mx, vy, w, vh);
  }
  else if (step.visual === 'fs-circuit-bout') {
    drawFsBoutCircuit(mx, vy, w, vh);
  }
  else if (step.visual === 'fs-complete') {
    fill(RESULT_BG);
    stroke('#7A5CFF');
    strokeWeight(2);
    rect(mx + 20, vy + 20, w - 40, 50, 8);
    rect(mx + 20, vy + 85, w - 40, 50, 8);
    noStroke();
    fill('#3A2499');
    textAlign(CENTER, CENTER);
    textSize(18);
    textStyle(BOLD);
    text('Diff = A XOR B XOR Bin', cx, vy + 45);
    text('Bout = A\'B + A\'Bin + BBin', cx, vy + 110);
    fill(100);
    textSize(13);
    textStyle(NORMAL);
    text('2 XOR gates', cx, vy + 150);
    text('3 AND gates + 1 OR gate + 1 NOT gate', cx, vy + 170);
    text('Total: 7 gates', cx, vy + 195);
  }
}

function drawIntroVisual(cx, vy, vh) {
  let preset = activePreset;
  let inputLabels, outputLabels, boxLabel;

  if (preset.label === 'Full Adder') {
    inputLabels = 'A, B, Cin';
    outputLabels = 'Sum, Cout';
    boxLabel = 'Full\nAdder';
  } else if (preset.label === 'Half Adder') {
    inputLabels = 'A, B';
    outputLabels = 'Sum, Carry';
    boxLabel = 'Half\nAdder';
  } else {
    inputLabels = 'A, B, Bin';
    outputLabels = 'Diff, Bout';
    boxLabel = 'Full\nSubtractor';
  }

  fill(60);
  textAlign(CENTER, CENTER);
  textSize(16);
  textStyle(BOLD);
  text(inputLabels, cx - 80, vy + vh / 2);
  // Box
  fill(TITLE_BG);
  rect(cx - 40, vy + vh / 2 - 25, 80, 50, 5);
  fill(255);
  textSize(14);
  text(boxLabel, cx, vy + vh / 2);
  // Outputs
  fill(60);
  textSize(16);
  text(outputLabels, cx + 90, vy + vh / 2);
  // Arrows
  stroke(60);
  strokeWeight(2);
  line(cx - 55, vy + vh / 2, cx - 40, vy + vh / 2);
  line(cx + 40, vy + vh / 2, cx + 55, vy + vh / 2);
  noStroke();
}

function drawSOPVisual(cx, mx, vy, w, mintermLabel, sopExpr, simplifiedExpr) {
  fill(60);
  textAlign(CENTER, CENTER);
  textSize(14);
  textStyle(NORMAL);
  text("Minterms: " + mintermLabel, cx, vy + 30);
  textSize(13);
  text(sopExpr, cx, vy + 60);
  // Arrow
  fill(HIGHLIGHT);
  textSize(18);
  text('v', cx, vy + 85);
  // Simplified
  fill(RESULT_BG);
  stroke('#7A5CFF');
  strokeWeight(2);
  rect(mx + 40, vy + 100, w - 80, 45, 8);
  noStroke();
  fill('#3A2499');
  textSize(22);
  textStyle(BOLD);
  text(simplifiedExpr, cx, vy + 122);
}

function drawCompleteFullAdder(cx, mx, vy, w, vh) {
  // Summary boxes
  fill(RESULT_BG);
  stroke('#7A5CFF');
  strokeWeight(2);
  rect(mx + 20, vy + 20, w - 40, 50, 8);
  rect(mx + 20, vy + 85, w - 40, 50, 8);
  noStroke();
  fill('#3A2499');
  textAlign(CENTER, CENTER);
  textSize(18);
  textStyle(BOLD);
  text('Sum = A XOR B XOR Cin', cx, vy + 45);
  text('Cout = AB + ACin + BCin', cx, vy + 110);
  // Gate counts
  fill(100);
  textSize(13);
  textStyle(NORMAL);
  text('2 XOR gates', cx, vy + 150);
  text('3 AND gates + 1 OR gate', cx, vy + 170);
  text('Total: 6 gates', cx, vy + 195);
}

function drawTruthTable(mx, vy, w, vh, highlightRows, highlightCol) {
  let cols = colHeaders;
  let numCols = cols.length;
  let numRows = truthTable.length;
  let numInputCols = activePreset.numInputs;
  let tableW = min(w - 40, 350);
  let tableX = mx + (w - tableW) / 2;
  let colW = tableW / numCols;
  let rowH = 24;
  let startY = vy + 10;

  // Header
  fill(TITLE_BG);
  noStroke();
  rect(tableX, startY, tableW, rowH, 3, 3, 0, 0);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(12);
  textStyle(BOLD);
  for (let c = 0; c < numCols; c++) {
    text(cols[c], tableX + colW * c + colW / 2, startY + rowH / 2);
  }
  // Separator line between inputs and outputs
  stroke(255);
  strokeWeight(1);
  line(tableX + colW * numInputCols, startY, tableX + colW * numInputCols, startY + rowH);
  noStroke();

  // Data rows
  for (let r = 0; r < numRows; r++) {
    let y = startY + rowH * (r + 1);
    let isHighlighted = highlightRows.includes(r);
    fill(isHighlighted ? HIGHLIGHT_ROW : (r % 2 === 0 ? 245 : 255));
    stroke(220);
    strokeWeight(0.5);
    rect(tableX, y, tableW, rowH);
    noStroke();

    for (let c = 0; c < numCols; c++) {
      let val = truthTable[r][c];
      // "sum" highlights first output column, "cout" highlights second output column
      let isOutputCol = (c === numInputCols && highlightCol === 'sum') || (c === numInputCols + 1 && highlightCol === 'cout');
      if (isHighlighted && isOutputCol && val === 1) {
        fill(HIGHLIGHT);
        textStyle(BOLD);
      } else {
        fill(60);
        textStyle(NORMAL);
      }
      textSize(12);
      textAlign(CENTER, CENTER);
      text(val, tableX + colW * c + colW / 2, y + rowH / 2);
    }
  }
}

function drawSumCircuit(mx, vy, w, vh) {
  let cx = canvasWidth / 2;
  let startX = mx + 40;
  let gateX1 = cx - 40;
  let gateX2 = cx + 40;
  let endX = mx + w - 40;

  // Input labels
  fill(60);
  textAlign(RIGHT, CENTER);
  textSize(14);
  textStyle(BOLD);
  text('A', startX, vy + 40);
  text('B', startX, vy + 70);
  text('Cin', startX, vy + 110);

  // XOR gate 1
  stroke(60);
  strokeWeight(2);
  noFill();
  // Lines to gate 1
  line(startX + 5, vy + 40, gateX1 - 20, vy + 40);
  line(startX + 5, vy + 70, gateX1 - 20, vy + 70);
  // Gate 1 box
  fill('#E8E0FF');
  stroke(TITLE_BG);
  rect(gateX1 - 20, vy + 30, 50, 50, 5);
  fill(TITLE_BG);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(16);
  text('XOR', gateX1 + 5, vy + 55);

  // Wire from gate 1 to gate 2
  stroke(60);
  strokeWeight(2);
  line(gateX1 + 30, vy + 55, gateX2 - 20, vy + 55);
  // Cin to gate 2
  line(startX + 5, vy + 110, gateX2 - 30, vy + 110);
  line(gateX2 - 30, vy + 110, gateX2 - 20, vy + 85);

  // XOR gate 2
  fill('#E8E0FF');
  stroke(TITLE_BG);
  rect(gateX2 - 20, vy + 45, 50, 50, 5);
  fill(TITLE_BG);
  noStroke();
  textAlign(CENTER, CENTER);
  text('XOR', gateX2 + 5, vy + 70);

  // Output
  stroke(60);
  strokeWeight(2);
  line(gateX2 + 30, vy + 70, endX, vy + 70);
  noStroke();
  fill('#3A2499');
  textAlign(LEFT, CENTER);
  textSize(14);
  textStyle(BOLD);
  text('Sum', endX + 5, vy + 70);

  // Label
  noStroke();
  fill(100);
  textAlign(CENTER, CENTER);
  textSize(12);
  textStyle(NORMAL);
  text('Sum = A XOR B XOR Cin', cx, vy + vh - 20);
}

function drawCoutCircuit(mx, vy, w, vh) {
  let cx = canvasWidth / 2;
  let startX = mx + 40;
  let gateX = cx - 30;
  let orX = cx + 60;
  let endX = mx + w - 40;

  // Input labels
  fill(60);
  textAlign(RIGHT, CENTER);
  textSize(13);
  textStyle(BOLD);

  // AND gate 1: AB
  text('A', startX, vy + 25);
  text('B', startX, vy + 45);
  stroke(60); strokeWeight(1.5);
  line(startX + 5, vy + 25, gateX - 15, vy + 25);
  line(startX + 5, vy + 45, gateX - 15, vy + 45);
  fill('#FDF5E0'); stroke(HIGHLIGHT);
  rect(gateX - 15, vy + 15, 45, 40, 4);
  fill(HIGHLIGHT); noStroke();
  textAlign(CENTER, CENTER); textSize(12);
  text('AND', gateX + 8, vy + 35);

  // AND gate 2: ACin
  fill(60); textAlign(RIGHT, CENTER); textSize(13); textStyle(BOLD);
  text('A', startX, vy + 75);
  text('Cin', startX, vy + 95);
  stroke(60); strokeWeight(1.5);
  line(startX + 5, vy + 75, gateX - 15, vy + 75);
  line(startX + 5, vy + 95, gateX - 15, vy + 95);
  fill('#FDF5E0'); stroke(HIGHLIGHT);
  rect(gateX - 15, vy + 65, 45, 40, 4);
  fill(HIGHLIGHT); noStroke();
  textAlign(CENTER, CENTER); textSize(12);
  text('AND', gateX + 8, vy + 85);

  // AND gate 3: BCin
  fill(60); textAlign(RIGHT, CENTER); textSize(13); textStyle(BOLD);
  text('B', startX, vy + 125);
  text('Cin', startX, vy + 145);
  stroke(60); strokeWeight(1.5);
  line(startX + 5, vy + 125, gateX - 15, vy + 125);
  line(startX + 5, vy + 145, gateX - 15, vy + 145);
  fill('#FDF5E0'); stroke(HIGHLIGHT);
  rect(gateX - 15, vy + 115, 45, 40, 4);
  fill(HIGHLIGHT); noStroke();
  textAlign(CENTER, CENTER); textSize(12);
  text('AND', gateX + 8, vy + 135);

  // Wires to OR gate
  stroke(60); strokeWeight(1.5);
  line(gateX + 30, vy + 35, orX - 15, vy + 70);
  line(gateX + 30, vy + 85, orX - 15, vy + 85);
  line(gateX + 30, vy + 135, orX - 15, vy + 100);

  // OR gate
  fill('#E8E0FF'); stroke('#7A5CFF');
  rect(orX - 15, vy + 60, 45, 50, 4);
  fill('#7A5CFF'); noStroke();
  textAlign(CENTER, CENTER); textSize(12);
  text('OR', orX + 8, vy + 85);

  // Output
  stroke(60); strokeWeight(1.5);
  line(orX + 30, vy + 85, endX, vy + 85);
  noStroke();
  fill('#3A2499');
  textAlign(LEFT, CENTER);
  textSize(14); textStyle(BOLD);
  text('Cout', endX + 5, vy + 85);

  // Label
  fill(100); textAlign(CENTER, CENTER);
  textSize(12); textStyle(NORMAL);
  text('Cout = AB + ACin + BCin', cx, vy + vh - 20);
}

function drawHaSumCircuit(mx, vy, w, vh) {
  let cx = canvasWidth / 2;
  let startX = mx + 60;
  let gateX = cx - 25;
  let endX = mx + w - 60;

  // Input labels
  fill(60);
  textAlign(RIGHT, CENTER);
  textSize(14);
  textStyle(BOLD);
  text('A', startX, vy + 55);
  text('B', startX, vy + 85);

  // Wires to gate
  stroke(60);
  strokeWeight(2);
  line(startX + 5, vy + 55, gateX, vy + 55);
  line(startX + 5, vy + 85, gateX, vy + 85);

  // XOR gate
  fill('#E8E0FF');
  stroke(TITLE_BG);
  rect(gateX, vy + 45, 50, 50, 5);
  fill(TITLE_BG);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(16);
  text('XOR', gateX + 25, vy + 70);

  // Output wire
  stroke(60);
  strokeWeight(2);
  line(gateX + 50, vy + 70, endX, vy + 70);
  noStroke();
  fill('#3A2499');
  textAlign(LEFT, CENTER);
  textSize(14);
  textStyle(BOLD);
  text('Sum', endX + 5, vy + 70);

  // Label
  fill(100);
  textAlign(CENTER, CENTER);
  textSize(12);
  textStyle(NORMAL);
  text('Sum = A XOR B', cx, vy + vh - 20);
}

function drawHaCarryCircuit(mx, vy, w, vh) {
  let cx = canvasWidth / 2;
  let startX = mx + 60;
  let gateX = cx - 25;
  let endX = mx + w - 60;

  // Input labels
  fill(60);
  textAlign(RIGHT, CENTER);
  textSize(14);
  textStyle(BOLD);
  text('A', startX, vy + 55);
  text('B', startX, vy + 85);

  // Wires to gate
  stroke(60);
  strokeWeight(2);
  line(startX + 5, vy + 55, gateX, vy + 55);
  line(startX + 5, vy + 85, gateX, vy + 85);

  // AND gate
  fill('#FDF5E0');
  stroke(HIGHLIGHT);
  rect(gateX, vy + 45, 50, 50, 5);
  fill(HIGHLIGHT);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(16);
  text('AND', gateX + 25, vy + 70);

  // Output wire
  stroke(60);
  strokeWeight(2);
  line(gateX + 50, vy + 70, endX, vy + 70);
  noStroke();
  fill('#3A2499');
  textAlign(LEFT, CENTER);
  textSize(14);
  textStyle(BOLD);
  text('Carry', endX + 5, vy + 70);

  // Label
  fill(100);
  textAlign(CENTER, CENTER);
  textSize(12);
  textStyle(NORMAL);
  text('Carry = AB', cx, vy + vh - 20);
}

function drawFsDiffCircuit(mx, vy, w, vh) {
  let cx = canvasWidth / 2;
  let startX = mx + 40;
  let gateX1 = cx - 40;
  let gateX2 = cx + 40;
  let endX = mx + w - 40;

  // Input labels
  fill(60);
  textAlign(RIGHT, CENTER);
  textSize(14);
  textStyle(BOLD);
  text('A', startX, vy + 40);
  text('B', startX, vy + 70);
  text('Bin', startX, vy + 110);

  // XOR gate 1
  stroke(60);
  strokeWeight(2);
  line(startX + 5, vy + 40, gateX1 - 20, vy + 40);
  line(startX + 5, vy + 70, gateX1 - 20, vy + 70);
  fill('#E8E0FF');
  stroke(TITLE_BG);
  rect(gateX1 - 20, vy + 30, 50, 50, 5);
  fill(TITLE_BG);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(16);
  text('XOR', gateX1 + 5, vy + 55);

  // Wire from gate 1 to gate 2
  stroke(60);
  strokeWeight(2);
  line(gateX1 + 30, vy + 55, gateX2 - 20, vy + 55);
  // Bin to gate 2
  line(startX + 5, vy + 110, gateX2 - 30, vy + 110);
  line(gateX2 - 30, vy + 110, gateX2 - 20, vy + 85);

  // XOR gate 2
  fill('#E8E0FF');
  stroke(TITLE_BG);
  rect(gateX2 - 20, vy + 45, 50, 50, 5);
  fill(TITLE_BG);
  noStroke();
  textAlign(CENTER, CENTER);
  text('XOR', gateX2 + 5, vy + 70);

  // Output
  stroke(60);
  strokeWeight(2);
  line(gateX2 + 30, vy + 70, endX, vy + 70);
  noStroke();
  fill('#3A2499');
  textAlign(LEFT, CENTER);
  textSize(14);
  textStyle(BOLD);
  text('Diff', endX + 5, vy + 70);

  // Label
  noStroke();
  fill(100);
  textAlign(CENTER, CENTER);
  textSize(12);
  textStyle(NORMAL);
  text('Diff = A XOR B XOR Bin', cx, vy + vh - 20);
}

function drawFsBoutCircuit(mx, vy, w, vh) {
  let cx = canvasWidth / 2;
  let startX = mx + 30;
  let notX = startX + 40;
  let gateX = cx - 30;
  let orX = cx + 60;
  let endX = mx + w - 40;

  // Input label A and NOT gate
  fill(60);
  textAlign(RIGHT, CENTER);
  textSize(13);
  textStyle(BOLD);
  text('A', startX, vy + 35);
  stroke(60); strokeWeight(1.5);
  line(startX + 5, vy + 35, notX - 5, vy + 35);
  // NOT gate
  fill('#E8E0FF'); stroke('#5A3EED');
  rect(notX - 5, vy + 22, 35, 26, 4);
  fill('#5A3EED'); noStroke();
  textAlign(CENTER, CENTER); textSize(11);
  text('NOT', notX + 13, vy + 35);
  // Wire from NOT output (A')
  stroke(60); strokeWeight(1.5);
  let notOutX = notX + 30;

  // AND gate 1: A'B
  fill(60); textAlign(RIGHT, CENTER); textSize(13); textStyle(BOLD);
  text('B', startX, vy + 55);
  stroke(60); strokeWeight(1.5);
  line(notOutX, vy + 35, notOutX + 5, vy + 35);
  line(notOutX + 5, vy + 35, gateX - 15, vy + 25);
  line(startX + 5, vy + 55, gateX - 15, vy + 45);
  fill('#FDF5E0'); stroke(HIGHLIGHT);
  rect(gateX - 15, vy + 15, 45, 40, 4);
  fill(HIGHLIGHT); noStroke();
  textAlign(CENTER, CENTER); textSize(12);
  text('AND', gateX + 8, vy + 35);

  // AND gate 2: A'Bin
  fill(60); textAlign(RIGHT, CENTER); textSize(13); textStyle(BOLD);
  text('Bin', startX, vy + 105);
  stroke(60); strokeWeight(1.5);
  // A' wire to gate 2
  line(notOutX + 5, vy + 35, notOutX + 5, vy + 75);
  line(notOutX + 5, vy + 75, gateX - 15, vy + 75);
  line(startX + 5, vy + 105, gateX - 15, vy + 95);
  fill('#FDF5E0'); stroke(HIGHLIGHT);
  rect(gateX - 15, vy + 65, 45, 40, 4);
  fill(HIGHLIGHT); noStroke();
  textAlign(CENTER, CENTER); textSize(12);
  text('AND', gateX + 8, vy + 85);

  // AND gate 3: BBin
  fill(60); textAlign(RIGHT, CENTER); textSize(13); textStyle(BOLD);
  text('B', startX, vy + 135);
  text('Bin', startX, vy + 155);
  stroke(60); strokeWeight(1.5);
  line(startX + 5, vy + 135, gateX - 15, vy + 125);
  line(startX + 5, vy + 155, gateX - 15, vy + 145);
  fill('#FDF5E0'); stroke(HIGHLIGHT);
  rect(gateX - 15, vy + 115, 45, 40, 4);
  fill(HIGHLIGHT); noStroke();
  textAlign(CENTER, CENTER); textSize(12);
  text('AND', gateX + 8, vy + 135);

  // Wires to OR gate
  stroke(60); strokeWeight(1.5);
  line(gateX + 30, vy + 35, orX - 15, vy + 70);
  line(gateX + 30, vy + 85, orX - 15, vy + 85);
  line(gateX + 30, vy + 135, orX - 15, vy + 100);

  // OR gate
  fill('#E8E0FF'); stroke('#7A5CFF');
  rect(orX - 15, vy + 60, 45, 50, 4);
  fill('#7A5CFF'); noStroke();
  textAlign(CENTER, CENTER); textSize(12);
  text('OR', orX + 8, vy + 85);

  // Output
  stroke(60); strokeWeight(1.5);
  line(orX + 30, vy + 85, endX, vy + 85);
  noStroke();
  fill('#3A2499');
  textAlign(LEFT, CENTER);
  textSize(14); textStyle(BOLD);
  text('Bout', endX + 5, vy + 85);

  // Label
  fill(100); textAlign(CENTER, CENTER);
  textSize(12); textStyle(NORMAL);
  text("Bout = A'B + A'Bin + BBin", cx, vy + vh - 20);
}

function drawButtons() {
  let btnY = drawHeight + 48;
  let btnW = 90;
  let btnH = 34;
  let gap = 10;
  let totalW = btnW * 3 + gap * 2;
  let startX = (canvasWidth - totalW) / 2;

  let prevEnabled = currentStep > 0;
  fill(prevEnabled ? '#5A3EED' : '#BDBDBD');
  noStroke();
  rect(startX, btnY, btnW, btnH, 8);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(14);
  textStyle(BOLD);
  text('<- Previous', startX + btnW / 2, btnY + btnH / 2);

  fill('#888');
  rect(startX + btnW + gap, btnY, btnW, btnH, 8);
  fill(255);
  text('Reset', startX + btnW + gap + btnW / 2, btnY + btnH / 2);

  let nextEnabled = currentStep < totalSteps - 1;
  fill(nextEnabled ? '#7A5CFF' : '#BDBDBD');
  rect(startX + 2 * (btnW + gap), btnY, btnW, btnH, 8);
  fill(255);
  text('Next ->', startX + 2 * (btnW + gap) + btnW / 2, btnY + btnH / 2);
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
