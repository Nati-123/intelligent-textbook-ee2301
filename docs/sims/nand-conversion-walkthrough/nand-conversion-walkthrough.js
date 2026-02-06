// NAND Conversion Walkthrough MicroSim
// Convert SOP expression F = AB + CD to all-NAND circuit
// Bloom Level: Apply (L3) - Apply NAND conversion technique
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
const NAND_COLOR = '#7B1FA2';
const AND_COLOR = '#1976D2';
const OR_COLOR = '#388E3C';

let steps = [
  {
    title: "Convert F = AB + CD to All-NAND",
    desc: "We will convert a two-level AND-OR circuit into an equivalent\ncircuit using only NAND gates.",
    rule: "NAND is a Universal Gate",
    visual: "intro"
  },
  {
    title: "Step 1: AND-OR Implementation",
    desc: "Start with the standard SOP implementation:\nTwo AND gates feed into one OR gate.",
    rule: "SOP \u2192 AND-OR circuit (2 levels)",
    visual: "and-or"
  },
  {
    title: "Step 2: Apply Double Inversion",
    desc: "Add two inversions (bubbles) between each AND gate and the\nOR gate. Double inversion doesn't change the logic.",
    rule: "Double Inversion: X = (X')' = X",
    visual: "double-inv"
  },
  {
    title: "Step 3: Absorb Bubbles into Gates",
    desc: "Each AND gate absorbs its output bubble \u2192 becomes NAND.\nThe OR gate absorbs its input bubbles \u2192 becomes NAND.\n(De Morgan's: OR with inverted inputs = NAND)",
    rule: "De Morgan's Theorem: (A'+B')' = AB",
    visual: "absorb"
  },
  {
    title: "Step 4: All-NAND Circuit",
    desc: "The circuit now uses only NAND gates!\nLevel 1: NAND(A,B) and NAND(C,D)\nLevel 2: NAND of the two NAND outputs",
    rule: "2-level SOP \u2192 2-level NAND-NAND",
    visual: "all-nand"
  },
  {
    title: "Step 5: Verify Equivalence",
    desc: "NAND(NAND(A,B), NAND(C,D))\n= ((AB)')·((CD)')' = (AB)'' + (CD)'' ... wait\nActually: ((AB)'\u00b7(CD)')' = (AB) + (CD) = AB + CD \u2713",
    rule: "Verify: NAND-NAND = AND-OR",
    visual: "verify"
  },
  {
    title: "Summary: SOP \u2192 NAND Conversion",
    desc: "Any SOP expression can be converted to all-NAND:\n1. Replace AND gates with NAND gates\n2. Replace OR gate with NAND gate\nThe double inversion cancels out.",
    rule: "General Rule: SOP \u2192 NAND-NAND",
    visual: "summary"
  }
];

function setup() {
  updateCanvasSize();
  totalSteps = steps.length;
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  describe('NAND conversion walkthrough showing bubble pushing technique', LABEL);
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

  // Measure description to allocate space
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

  drawVisual(step, margin, visY, w, visH);

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

function drawVisual(step, mx, vy, w, vh) {
  let cx = canvasWidth / 2;

  if (step.visual === 'intro') {
    fill(60);
    textAlign(CENTER, CENTER);
    textSize(24);
    textStyle(BOLD);
    text('F = AB + CD', cx, vy + 40);
    fill(HIGHLIGHT);
    textSize(18);
    text('\u2193', cx, vy + 70);
    fill(NAND_COLOR);
    textSize(20);
    text('All NAND gates?', cx, vy + 100);
    fill(100);
    textSize(13);
    textStyle(NORMAL);
    text('Click "Next \u2192" to begin', cx, vy + vh - 20);
  }
  else if (step.visual === 'and-or') {
    drawCircuit(mx, vy, w, vh, 'and-or', false);
  }
  else if (step.visual === 'double-inv') {
    drawCircuit(mx, vy, w, vh, 'and-or', true);
  }
  else if (step.visual === 'absorb') {
    drawCircuit(mx, vy, w, vh, 'absorbing', false);
  }
  else if (step.visual === 'all-nand') {
    drawCircuit(mx, vy, w, vh, 'nand', false);
  }
  else if (step.visual === 'verify') {
    fill(60);
    textAlign(CENTER, CENTER);
    textSize(14); textStyle(NORMAL);
    let y = vy + 25;
    text('Verification using De Morgan\'s:', cx, y);
    y += 30;
    textSize(13);
    text('NAND(A,B) = (AB)\'', cx, y); y += 20;
    text('NAND(C,D) = (CD)\'', cx, y); y += 25;
    text('NAND( (AB)\', (CD)\' )', cx, y); y += 20;
    text('= ( (AB)\' \u00b7 (CD)\' )\'', cx, y); y += 20;
    fill(HIGHLIGHT); textStyle(BOLD);
    text('= AB + CD    (De Morgan\'s)', cx, y); y += 25;
    fill('#1B5E20');
    textSize(16);
    text('= F  \u2713', cx, y);
  }
  else if (step.visual === 'summary') {
    fill(RESULT_BG);
    stroke('#4CAF50'); strokeWeight(2);
    rect(mx + 20, vy + 15, w - 40, vh - 30, 10);
    noStroke();
    fill('#1B5E20');
    textAlign(CENTER, CENTER);
    textSize(16); textStyle(BOLD);
    text('SOP \u2192 NAND-NAND Conversion Rule', cx, vy + 40);

    textSize(13); textStyle(NORMAL); fill(60);
    let y = vy + 70;
    textAlign(LEFT, TOP);
    text('1. Start with AND-OR (SOP) implementation', mx + 40, y); y += 22;
    text('2. Replace each AND gate \u2192 NAND gate', mx + 40, y); y += 22;
    text('3. Replace the OR gate \u2192 NAND gate', mx + 40, y); y += 22;
    text('4. Double inversions cancel out', mx + 40, y); y += 30;

    fill(NAND_COLOR);
    textAlign(CENTER, CENTER);
    textSize(15); textStyle(BOLD);
    text('Works for any SOP expression!', cx, y);
  }
}

function drawCircuit(mx, vy, w, vh, mode, showBubbles) {
  let cx = canvasWidth / 2;
  let inputX = mx + 40;
  let gate1X = cx - 60;
  let gate2X = cx + 50;
  let outputX = mx + w - 40;

  let g1y1 = vy + 30;   // AND/NAND gate 1 center
  let g1y2 = vy + 120;  // AND/NAND gate 2 center
  let g2y = vy + 75;    // OR/NAND output gate center

  let gateW = 55;
  let gateH = 40;

  // Input labels
  fill(60);
  textAlign(RIGHT, CENTER);
  textSize(14); textStyle(BOLD);
  text('A', inputX - 5, g1y1 - 10);
  text('B', inputX - 5, g1y1 + 10);
  text('C', inputX - 5, g1y2 - 10);
  text('D', inputX - 5, g1y2 + 10);

  // Input wires
  stroke(60); strokeWeight(1.5);
  line(inputX, g1y1 - 10, gate1X, g1y1 - 10);
  line(inputX, g1y1 + 10, gate1X, g1y1 + 10);
  line(inputX, g1y2 - 10, gate1X, g1y2 - 10);
  line(inputX, g1y2 + 10, gate1X, g1y2 + 10);

  // Gate 1 (top)
  let g1Color, g1Label;
  if (mode === 'nand' || mode === 'absorbing') {
    g1Color = NAND_COLOR; g1Label = 'NAND';
  } else {
    g1Color = AND_COLOR; g1Label = 'AND';
  }
  fill(g1Color + '22');
  stroke(g1Color); strokeWeight(2);
  rect(gate1X, g1y1 - gateH / 2, gateW, gateH, 5);
  noStroke();
  fill(g1Color);
  textAlign(CENTER, CENTER);
  textSize(11); textStyle(BOLD);
  text(g1Label, gate1X + gateW / 2, g1y1);

  // Gate 2 (bottom)
  fill(g1Color + '22');
  stroke(g1Color); strokeWeight(2);
  rect(gate1X, g1y2 - gateH / 2, gateW, gateH, 5);
  noStroke();
  fill(g1Color);
  textAlign(CENTER, CENTER);
  text(g1Label, gate1X + gateW / 2, g1y2);

  // Bubbles on output of AND gates (for double inversion step)
  if (showBubbles) {
    fill(255);
    stroke(HIGHLIGHT); strokeWeight(2);
    circle(gate1X + gateW + 7, g1y1, 10);
    circle(gate1X + gateW + 7, g1y2, 10);
    noStroke();
  }

  // Wires to output gate
  stroke(60); strokeWeight(1.5);
  let wireStartX = gate1X + gateW + (showBubbles ? 12 : 0);
  line(wireStartX, g1y1, gate2X, g2y - 10);
  line(wireStartX, g1y2, gate2X, g2y + 10);

  // Bubbles on input of OR gate (for double inversion step)
  if (showBubbles) {
    fill(255);
    stroke(HIGHLIGHT); strokeWeight(2);
    circle(gate2X - 7, g2y - 10, 10);
    circle(gate2X - 7, g2y + 10, 10);
    noStroke();
  }

  // Output gate
  let g2Color, g2Label;
  if (mode === 'nand' || mode === 'absorbing') {
    g2Color = NAND_COLOR; g2Label = 'NAND';
  } else {
    g2Color = OR_COLOR; g2Label = 'OR';
  }
  fill(g2Color + '22');
  stroke(g2Color); strokeWeight(2);
  rect(gate2X, g2y - gateH / 2, gateW, gateH, 5);
  noStroke();
  fill(g2Color);
  textAlign(CENTER, CENTER);
  textSize(11); textStyle(BOLD);
  text(g2Label, gate2X + gateW / 2, g2y);

  // Output wire
  stroke(60); strokeWeight(1.5);
  line(gate2X + gateW, g2y, outputX, g2y);
  noStroke();
  fill('#1B5E20');
  textAlign(LEFT, CENTER);
  textSize(14); textStyle(BOLD);
  text('F', outputX + 5, g2y);

  // Expression label
  fill(100);
  textAlign(CENTER, CENTER);
  textSize(12); textStyle(NORMAL);
  if (mode === 'and-or') {
    text('F = AB + CD', cx, vy + vh - 15);
  } else if (mode === 'nand') {
    fill(NAND_COLOR); textStyle(BOLD);
    text('F = ((AB)\'\u00b7(CD)\')\'  = AB + CD', cx, vy + vh - 15);
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
