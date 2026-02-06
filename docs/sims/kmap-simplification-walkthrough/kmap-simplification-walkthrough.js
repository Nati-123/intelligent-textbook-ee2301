// K-Map Simplification Walkthrough MicroSim
// Simplify F(A,B,C,D) = Σm(0,2,5,7,8,10,13,15) using K-map
// Bloom Level: Apply (L3) - Apply K-map grouping and simplification
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
const GROUP1_COLOR = '#E91E63';
const GROUP2_COLOR = '#4CAF50';

// K-map values in Gray code order: AB\CD = 00,01,11,10
// Row order: AB = 00, 01, 11, 10
let kmapValues = [
  [1, 0, 0, 1],  // AB=00: m0=1, m1=0, m3=0, m2=1
  [0, 1, 1, 0],  // AB=01: m4=0, m5=1, m7=1, m6=0
  [0, 1, 1, 0],  // AB=11: m12=0, m13=1, m15=1, m14=0
  [1, 0, 0, 1]   // AB=10: m8=1, m9=0, m11=0, m10=1
];

let mintermNumbers = [
  [0, 1, 3, 2],
  [4, 5, 7, 6],
  [12, 13, 15, 14],
  [8, 9, 11, 10]
];

let steps = [
  {
    title: "Simplify F(A,B,C,D) = Σm(0,2,5,7,8,10,13,15)",
    desc: "We will use a 4-variable Karnaugh Map to simplify this function.\nThe K-map lets us visually identify groups of adjacent 1s.",
    rule: "K-Map Simplification Method",
    visual: "intro",
    showValues: false,
    groups: []
  },
  {
    title: "Step 1: Draw the K-Map Grid",
    desc: "Set up a 4×4 K-map with Gray code ordering on both axes.\nRows: AB (00, 01, 11, 10)  Columns: CD (00, 01, 11, 10)",
    rule: "Gray code ensures adjacent cells differ by 1 bit",
    visual: "kmap",
    showValues: false,
    groups: []
  },
  {
    title: "Step 2: Fill in the Minterms",
    desc: "Place 1 in cells for minterms {0,2,5,7,8,10,13,15}.\nAll other cells are 0.",
    rule: "Mark cells where F = 1",
    visual: "kmap",
    showValues: true,
    groups: []
  },
  {
    title: "Step 3: Identify Group 1",
    desc: "The four corners {m0, m2, m8, m10} form a group.\nK-maps wrap: top↔bottom and left↔right edges are adjacent.",
    rule: "K-map edges wrap around (toroidal)",
    visual: "kmap",
    showValues: true,
    groups: ["group1"]
  },
  {
    title: "Step 4: Extract Term from Group 1",
    desc: "In cells {m0, m2, m8, m10}:\nA changes (0,0,1,1) → A varies, eliminate A\nB is always 0 → keep B'\nC changes → eliminate C\nD is always 0 → keep D'",
    rule: "Eliminate variables that change within group",
    visual: "kmap",
    showValues: true,
    groups: ["group1"],
    term: "B'D'"
  },
  {
    title: "Step 5: Identify Group 2",
    desc: "Cells {m5, m7, m13, m15} form a 2×2 block in the center.\nAll are adjacent — valid group of 4.",
    rule: "Groups must be powers of 2 (1, 2, 4, 8, 16)",
    visual: "kmap",
    showValues: true,
    groups: ["group1", "group2"]
  },
  {
    title: "Step 6: Extract Term from Group 2",
    desc: "In cells {m5, m7, m13, m15}:\nA changes (0,0,1,1) → eliminate A\nB is always 1 → keep B\nC changes → eliminate C\nD is always 1 → keep D",
    rule: "Eliminate variables that change within group",
    visual: "kmap",
    showValues: true,
    groups: ["group1", "group2"],
    term: "BD"
  },
  {
    title: "Result: Simplified Expression",
    desc: "F = B'D' + BD\nAll 1s are covered. The expression is minimized.\nNote: This equals B XNOR D (B ⊙ D).",
    rule: "OR the terms from all groups",
    visual: "result",
    showValues: true,
    groups: ["group1", "group2"]
  }
];

function setup() {
  updateCanvasSize();
  totalSteps = steps.length;
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  describe('K-map simplification walkthrough for a 4-variable function', LABEL);
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

  if (step.visual === 'intro') {
    drawIntro(margin, visY, w, visH);
  } else if (step.visual === 'kmap') {
    drawKmap(margin, visY, w, visH, step);
  } else if (step.visual === 'result') {
    drawResult(margin, visY, w, visH, step);
  }

  // Description
  let descY = drawHeight - 62;
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
  fill(60);
  textAlign(CENTER, CENTER);
  textSize(18);
  textStyle(BOLD);
  text('F(A,B,C,D) = Σm(0,2,5,7,8,10,13,15)', cx, vy + 40);
  textSize(14);
  textStyle(NORMAL);
  fill(100);
  text('8 minterms out of 16 possible', cx, vy + 70);
  text('Use a 4-variable K-map to find the', cx, vy + 100);
  text('minimum SOP expression', cx, vy + 118);
  fill(HIGHLIGHT);
  textSize(13);
  text('Click "Next →" to begin', cx, vy + vh - 20);
}

function drawKmap(mx, vy, w, vh, step) {
  let cellSize = min(55, (w - 100) / 4);
  let gridW = cellSize * 4;
  let gridH = cellSize * 4;
  let gridX = mx + (w - gridW) / 2 + 20;
  let gridY = vy + 40;

  let abLabels = ['00', '01', '11', '10'];
  let cdLabels = ['00', '01', '11', '10'];

  // AB label
  fill(60);
  textAlign(CENTER, CENTER);
  textSize(12);
  textStyle(BOLD);
  text('AB', gridX - 25, gridY - 25);

  // CD label
  text('CD', gridX + gridW / 2, gridY - 25);

  // Column headers
  textSize(11);
  textStyle(NORMAL);
  for (let c = 0; c < 4; c++) {
    text(cdLabels[c], gridX + c * cellSize + cellSize / 2, gridY - 10);
  }

  // Row headers
  for (let r = 0; r < 4; r++) {
    textAlign(RIGHT, CENTER);
    text(abLabels[r], gridX - 8, gridY + r * cellSize + cellSize / 2);
  }

  // Draw group highlights BEHIND cells
  if (step.groups.includes('group1')) {
    // Group 1: corners {m0(r0c0), m2(r0c3), m8(r3c0), m10(r3c3)}
    stroke(GROUP1_COLOR);
    strokeWeight(3);
    noFill();
    // Top-left corner
    arc(gridX, gridY, cellSize, cellSize, 0, HALF_PI);
    // Top-right corner
    arc(gridX + gridW, gridY, cellSize, cellSize, HALF_PI, PI);
    // Bottom-right corner
    arc(gridX + gridW, gridY + gridH, cellSize, cellSize, PI, PI + HALF_PI);
    // Bottom-left corner
    arc(gridX, gridY + gridH, cellSize, cellSize, PI + HALF_PI, TWO_PI);
    noStroke();
  }

  if (step.groups.includes('group2')) {
    // Group 2: {m5(r1c1), m7(r1c2), m13(r2c1), m15(r2c2)}
    stroke(GROUP2_COLOR);
    strokeWeight(3);
    noFill();
    rect(gridX + cellSize + 3, gridY + cellSize + 3, cellSize * 2 - 6, cellSize * 2 - 6, 8);
    noStroke();
  }

  // Draw cells
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      let x = gridX + c * cellSize;
      let y = gridY + r * cellSize;
      let val = kmapValues[r][c];

      // Cell background
      let isGroup1 = (r === 0 || r === 3) && (c === 0 || c === 3);
      let isGroup2 = (r === 1 || r === 2) && (c === 1 || c === 2);

      if (step.groups.includes('group1') && isGroup1 && val === 1) {
        fill(255, 200, 200, 150);
      } else if (step.groups.includes('group2') && isGroup2 && val === 1) {
        fill(200, 255, 200, 150);
      } else {
        fill(255);
      }
      stroke(180);
      strokeWeight(1);
      rect(x, y, cellSize, cellSize);
      noStroke();

      // Cell value
      if (step.showValues) {
        fill(val === 1 ? '#1B5E20' : '#BDBDBD');
        textAlign(CENTER, CENTER);
        textSize(16);
        textStyle(BOLD);
        text(val, x + cellSize / 2, y + cellSize / 2);
      }

      // Minterm number (small, in corner)
      fill(180);
      textSize(8);
      textStyle(NORMAL);
      textAlign(LEFT, TOP);
      text('m' + mintermNumbers[r][c], x + 2, y + 2);
    }
  }

  // Show extracted term if present
  if (step.term) {
    let termColor = step.groups[step.groups.length - 1] === 'group1' ? GROUP1_COLOR : GROUP2_COLOR;
    fill(termColor);
    textAlign(CENTER, CENTER);
    textSize(16);
    textStyle(BOLD);
    text('→ ' + step.term, gridX + gridW + 40, gridY + gridH / 2);
  }
}

function drawResult(mx, vy, w, vh, step) {
  let cx = canvasWidth / 2;

  // Draw mini K-map
  let cellSize = 35;
  let gridW = cellSize * 4;
  let gridX = mx + (w - gridW) / 2 + 15;
  let gridY = vy + 15;

  // Simplified K-map
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      let x = gridX + c * cellSize;
      let y = gridY + r * cellSize;
      let val = kmapValues[r][c];
      let isG1 = (r === 0 || r === 3) && (c === 0 || c === 3) && val === 1;
      let isG2 = (r === 1 || r === 2) && (c === 1 || c === 2) && val === 1;
      fill(isG1 ? '#FFCDD2' : isG2 ? '#C8E6C9' : 255);
      stroke(180); strokeWeight(1);
      rect(x, y, cellSize, cellSize);
      noStroke();
      fill(val === 1 ? '#1B5E20' : '#BDBDBD');
      textAlign(CENTER, CENTER);
      textSize(14); textStyle(BOLD);
      text(val, x + cellSize / 2, y + cellSize / 2);
    }
  }

  // Result box
  let resY = gridY + cellSize * 4 + 15;
  fill(RESULT_BG);
  stroke('#4CAF50'); strokeWeight(2);
  rect(mx + 20, resY, w - 40, 45, 8);
  noStroke();
  fill('#1B5E20');
  textAlign(CENTER, CENTER);
  textSize(20); textStyle(BOLD);
  text("F = B'D' + BD", cx, resY + 22);
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
