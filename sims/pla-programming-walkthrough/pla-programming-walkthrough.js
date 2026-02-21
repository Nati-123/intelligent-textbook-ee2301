// PLA Programming Walkthrough MicroSim
// Program a PLA for F1=AB+A'C, F2=AB+BC
// Bloom Level: Apply (L3) - Apply PLA programming
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
const AND_COLOR = '#5C6BC0';
const OR_COLOR = '#AB47BC';
const ACTIVE_COLOR = '#E91E63';
const WIRE_ON = '#4CAF50';
const WIRE_OFF = '#BDBDBD';

// PLA configuration
// Inputs: A, B, C  (and complements A', B', C')
// Product terms: P0=AB, P1=A'C, P2=BC
// Outputs: F1=AB+A'C (P0+P1), F2=AB+BC (P0+P2)

// AND plane: rows=product terms, cols=input literals (A, A', B, B', C, C')
// 1=connected, 0=not connected
let andPlane = [
  [1, 0, 1, 0, 0, 0], // P0: AB   -> A=1, B=1
  [0, 1, 0, 0, 1, 0], // P1: A'C  -> A'=1, C=1
  [0, 0, 1, 0, 1, 0]  // P2: BC   -> B=1, C=1
];

// OR plane: rows=product terms, cols=outputs
// 1=connected, 0=not connected
let orPlane = [
  [1, 1], // P0 -> F1, F2
  [1, 0], // P1 -> F1
  [0, 1]  // P2 -> F2
];

let inputLabels = ['A', "A'", 'B', "B'", 'C', "C'"];
let termLabels = ['P0: AB', "P1: A'C", 'P2: BC'];
let outputLabels = ['F1', 'F2'];

let steps = [
  {
    title: "PLA Programming: Two Functions",
    desc: "We will program a PLA to implement:\nF1 = AB + A'C    F2 = AB + BC",
    rule: "Programmable Logic Array (PLA)",
    visual: "intro"
  },
  {
    title: "Step 1: Identify Product Terms",
    desc: "Find all distinct product terms across both functions:\nP0 = AB, P1 = A'C, P2 = BC  (3 terms, AB is shared)",
    rule: "Share product terms between outputs",
    visual: "identify-terms"
  },
  {
    title: "Step 2: Blank PLA Grid",
    desc: "The PLA has 3 inputs (6 literals), 3 product term rows,\nand 2 outputs. All crosspoints start unprogrammed.",
    rule: "3 inputs \u00D7 3 terms \u00D7 2 outputs",
    visual: "blank-grid"
  },
  {
    title: "Step 3: AND Plane \u2014 P0 = AB",
    desc: "Connect A and B in the AND plane for product term P0.\nWhen both A=1 and B=1, P0 outputs 1.",
    rule: "P0: Connect A and B columns",
    visual: "and-plane",
    andRow: 0
  },
  {
    title: "Step 4: AND Plane \u2014 P1 = A'C",
    desc: "Connect A' and C in the AND plane for product term P1.\nWhen A=0 (A'=1) and C=1, P1 outputs 1.",
    rule: "P1: Connect A' and C columns",
    visual: "and-plane",
    andRow: 1
  },
  {
    title: "Step 5: AND Plane \u2014 P2 = BC",
    desc: "Connect B and C in the AND plane for product term P2.\nWhen both B=1 and C=1, P2 outputs 1.",
    rule: "P2: Connect B and C columns",
    visual: "and-plane",
    andRow: 2
  },
  {
    title: "Step 6: OR Plane \u2014 Connect to Outputs",
    desc: "F1 = P0 + P1 (connect P0,P1 to F1 column)\nF2 = P0 + P2 (connect P0,P2 to F2 column)",
    rule: "OR plane selects terms per output",
    visual: "or-plane"
  },
  {
    title: "Step 7: Verify \u2014 Input A=1, B=1, C=0",
    desc: "Trace: A=1,B=1,C=0 \u2192 P0=AB=1, P1=A'C=0, P2=BC=0\nF1 = 1+0 = 1,  F2 = 1+0 = 1  \u2714",
    rule: "Verify: A=1, B=1, C=0 \u2192 F1=1, F2=1",
    visual: "verify",
    testInput: [1, 1, 0]
  },
  {
    title: "Result: PLA Programmed Successfully",
    desc: "The PLA implements both functions using 3 shared product\nterms. AB is shared between F1 and F2, saving resources.",
    rule: "3 product terms, 2 outputs, shared AB",
    visual: "result"
  }
];

totalSteps = steps.length;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  describe('PLA programming walkthrough showing AND and OR plane configuration', LABEL);
}

function draw() {
  updateCanvasSize();
  // Background
  fill('#f5f5f5');
  noStroke();
  rect(0, 0, canvasWidth, drawHeight);
  // Control area
  fill(243, 245, 250);
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  let step = steps[currentStep];
  let margin = 15;
  let w = canvasWidth - 2 * margin;

  // Title
  fill('#212121');
  noStroke();
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(16);
  text('PLA Programming Walkthrough', canvasWidth / 2, margin + 8);
  textStyle(NORMAL);
  // Decorative underline
  stroke(220);
  strokeWeight(1);
  line(canvasWidth / 2 - 105, margin + 19, canvasWidth / 2 + 105, margin + 19);

  // Step readout panel
  let rpW = Math.min(canvasWidth - 30, 380);
  let rpX = (canvasWidth - rpW) / 2;
  let rpY = margin + 24;
  fill(247, 249, 252);
  stroke(210, 215, 225);
  strokeWeight(1);
  rect(rpX, rpY, rpW, 22, 8);
  noStroke();
  fill(92, 107, 192);
  rect(rpX, rpY + 4, 4, 14, 2, 0, 0, 2);
  textAlign(LEFT, CENTER);
  textSize(11);
  textStyle(BOLD);
  fill(92, 107, 192);
  text(step.title, rpX + 14, rpY + 11);
  textStyle(NORMAL);
  fill(150);
  textAlign(RIGHT, CENTER);
  textSize(10);
  text((currentStep + 1) + ' / ' + totalSteps, rpX + rpW - 8, rpY + 11);

  // Progress bar
  let progY = rpY + 26;
  fill(230);
  noStroke();
  rect(margin, progY, w, 4, 2);
  fill(TITLE_BG);
  rect(margin, progY, w * (currentStep + 1) / totalSteps, 4, 2);

  // Rule label
  fill(HIGHLIGHT);
  noStroke();
  let ruleY = progY + 10;
  textSize(11);
  textStyle(BOLD);
  let rw = textWidth(step.rule) + 20;
  rw = max(rw, 100);
  rect(canvasWidth / 2 - rw / 2, ruleY, rw, 22, 11);
  fill(255);
  textAlign(CENTER, CENTER);
  text(step.rule, canvasWidth / 2, ruleY + 11);

  // Measure description
  let descLines = step.desc.split('\n');
  let descHeight = descLines.length * 15 + 10;

  // Visual area
  let visY = ruleY + 28;
  let visH = drawHeight - visY - descHeight - 12;
  fill(STEP_BG);
  stroke(210, 215, 225);
  strokeWeight(1);
  rect(margin, visY, w, visH, 8);
  noStroke();

  if (step.visual === 'intro') {
    drawIntro(margin, visY, w, visH);
  } else if (step.visual === 'identify-terms') {
    drawIdentifyTerms(margin, visY, w, visH);
  } else if (step.visual === 'blank-grid') {
    drawPLAGrid(margin, visY, w, visH, -1, false, null);
  } else if (step.visual === 'and-plane') {
    drawPLAGrid(margin, visY, w, visH, step.andRow, false, null);
  } else if (step.visual === 'or-plane') {
    drawPLAGrid(margin, visY, w, visH, 2, true, null);
  } else if (step.visual === 'verify') {
    drawPLAGrid(margin, visY, w, visH, 2, true, step.testInput);
  } else if (step.visual === 'result') {
    drawResult(margin, visY, w, visH);
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
  textSize(16);
  textStyle(BOLD);
  text('Target Functions', cx, vy + 25);

  // Function boxes
  let boxW = 160;
  let boxH = 40;
  let y1 = vy + 50;

  fill(AND_COLOR + '20');
  stroke(AND_COLOR);
  strokeWeight(2);
  rect(cx - boxW / 2, y1, boxW, boxH, 8);
  noStroke();
  fill(AND_COLOR);
  textSize(18);
  textStyle(BOLD);
  text("F1 = AB + A'C", cx, y1 + boxH / 2);

  let y2 = y1 + boxH + 15;
  fill(OR_COLOR + '20');
  stroke(OR_COLOR);
  strokeWeight(2);
  rect(cx - boxW / 2, y2, boxW, boxH, 8);
  noStroke();
  fill(OR_COLOR);
  textSize(18);
  textStyle(BOLD);
  text('F2 = AB + BC', cx, y2 + boxH / 2);

  // PLA block diagram
  let plaY = y2 + boxH + 25;
  fill(240);
  stroke(100);
  strokeWeight(1);
  rect(cx - 90, plaY, 180, 55, 5);
  noStroke();
  fill(100);
  textSize(14);
  textStyle(BOLD);
  text('PLA', cx, plaY + 15);
  textSize(10);
  textStyle(NORMAL);
  text('3 inputs \u2022 3 product terms \u2022 2 outputs', cx, plaY + 35);

  fill(100);
  textSize(13);
  textStyle(NORMAL);
  text('Click "Next \u2192" to begin', cx, vy + vh - 12);
}

function drawIdentifyTerms(mx, vy, w, vh) {
  let cx = canvasWidth / 2;
  let y = vy + 15;

  fill(60);
  textAlign(CENTER, CENTER);
  textSize(13);
  textStyle(BOLD);
  text("F1 = AB + A'C", cx, y);
  text('F2 = AB + BC', cx, y + 18);

  y += 42;
  stroke(200);
  strokeWeight(1);
  line(mx + 20, y, mx + w - 20, y);
  noStroke();

  y += 15;
  fill(60);
  textSize(14);
  textStyle(BOLD);
  text('Distinct Product Terms:', cx, y);

  // Term boxes
  let terms = ['P0 = AB', "P1 = A'C", 'P2 = BC'];
  let colors = [AND_COLOR, '#E91E63', '#009688'];
  let boxW = 100;
  let boxH = 35;
  let gap = 12;
  let totalW = terms.length * boxW + (terms.length - 1) * gap;
  let startX = cx - totalW / 2;
  y += 22;

  for (let i = 0; i < terms.length; i++) {
    let x = startX + i * (boxW + gap);
    fill(colors[i] + '20');
    stroke(colors[i]);
    strokeWeight(2);
    rect(x, y, boxW, boxH, 5);
    noStroke();
    fill(colors[i]);
    textAlign(CENTER, CENTER);
    textSize(14);
    textStyle(BOLD);
    text(terms[i], x + boxW / 2, y + boxH / 2);
  }

  // Sharing note
  y += boxH + 20;
  fill(HIGHLIGHT);
  textAlign(CENTER, CENTER);
  textSize(12);
  textStyle(BOLD);
  text('\u2B50 AB is shared between F1 and F2!', cx, y);

  y += 25;
  fill(80);
  textSize(11);
  textStyle(NORMAL);
  text('F1 uses P0, P1     F2 uses P0, P2', cx, y);
}

function drawPLAGrid(mx, vy, w, vh, activeAndRow, showOrPlane, testInput) {
  let cx = canvasWidth / 2;
  let gridLeft = mx + 55;
  let gridTop = vy + 10;
  let cellW = 28;
  let cellH = 28;

  // AND plane dimensions: 6 columns (literals) x 3 rows (terms)
  let andCols = 6;
  let andRows = 3;
  let andWidth = andCols * cellW;
  let andHeight = andRows * cellH;

  // OR plane: 2 columns x 3 rows
  let orCols = 2;
  let orGap = 20;
  let orLeft = gridLeft + andWidth + orGap;

  // Evaluate test
  let termVals = [0, 0, 0];
  let outVals = [0, 0];
  let litVals = [0, 0, 0, 0, 0, 0];
  if (testInput) {
    litVals = [testInput[0], 1 - testInput[0], testInput[1], 1 - testInput[1], testInput[2], 1 - testInput[2]];
    for (let r = 0; r < 3; r++) {
      termVals[r] = 1;
      for (let c = 0; c < 6; c++) {
        if (andPlane[r][c] && !litVals[c]) termVals[r] = 0;
      }
    }
    for (let c = 0; c < 2; c++) {
      outVals[c] = 0;
      for (let r = 0; r < 3; r++) {
        if (orPlane[r][c] && termVals[r]) outVals[c] = 1;
      }
    }
  }

  // Input labels
  textAlign(CENTER, CENTER);
  textSize(10);
  textStyle(BOLD);
  for (let c = 0; c < andCols; c++) {
    let x = gridLeft + c * cellW + cellW / 2;
    fill(testInput && litVals[c] ? WIRE_ON : 80);
    text(inputLabels[c], x, gridTop - 5);
  }

  // AND plane label
  fill(AND_COLOR);
  textSize(9);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text('AND Plane', gridLeft + andWidth / 2, gridTop + andHeight + 12);

  // Draw AND plane grid
  for (let r = 0; r < andRows; r++) {
    // Term label
    let rowY = gridTop + 8 + r * cellH;
    fill(80);
    textAlign(RIGHT, CENTER);
    textSize(9);
    textStyle(NORMAL);
    text(termLabels[r], gridLeft - 5, rowY + cellH / 2);

    for (let c = 0; c < andCols; c++) {
      let cellX = gridLeft + c * cellW;
      let cellY = rowY;
      let showDot = (r <= activeAndRow) && andPlane[r][c];

      // Cell background
      if (testInput && showDot) {
        fill(litVals[c] ? (WIRE_ON + '30') : '#FFEBEE');
      } else if (r === activeAndRow && andPlane[r][c]) {
        fill(ACTIVE_COLOR + '20');
      } else {
        fill(255);
      }
      stroke(200);
      strokeWeight(1);
      rect(cellX, cellY, cellW, cellH);
      noStroke();

      // Crosspoint dot with glow on active
      if (showDot) {
        let dotColor = testInput ? (litVals[c] ? WIRE_ON : '#EF5350') : (r === activeAndRow ? ACTIVE_COLOR : AND_COLOR);
        if (r === activeAndRow && !testInput) {
          fill(red(color(dotColor)), green(color(dotColor)), blue(color(dotColor)), 50);
          ellipse(cellX + cellW / 2, cellY + cellH / 2, 20, 20);
        }
        fill(dotColor);
        ellipse(cellX + cellW / 2, cellY + cellH / 2, 12, 12);
      }
    }

    // Term output value during verify
    if (testInput) {
      let valX = gridLeft + andWidth + 5;
      fill(termVals[r] ? WIRE_ON : '#EF5350');
      textAlign(LEFT, CENTER);
      textSize(11);
      textStyle(BOLD);
      text(termVals[r] ? '=1' : '=0', valX, rowY + cellH / 2);
    }
  }

  // OR plane
  if (showOrPlane) {
    let orLabelX = orLeft + orCols * cellW / 2;
    fill(OR_COLOR);
    textSize(9);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text('OR Plane', orLabelX, gridTop + andHeight + 12);

    // Output labels
    for (let c = 0; c < orCols; c++) {
      let x = orLeft + c * cellW + cellW / 2;
      fill(testInput && outVals[c] ? WIRE_ON : 80);
      textSize(10);
      textStyle(BOLD);
      text(outputLabels[c], x, gridTop - 5);
    }

    for (let r = 0; r < andRows; r++) {
      let rowY = gridTop + 8 + r * cellH;
      for (let c = 0; c < orCols; c++) {
        let cellX = orLeft + c * cellW;
        let cellY = rowY;
        let showDot = orPlane[r][c] === 1;

        if (testInput && showDot && termVals[r]) {
          fill(WIRE_ON + '30');
        } else if (showDot) {
          fill(OR_COLOR + '20');
        } else {
          fill(255);
        }
        stroke(200);
        strokeWeight(1);
        rect(cellX, cellY, cellW, cellH);
        noStroke();

        if (showDot) {
          let dotColor = testInput ? (termVals[r] ? WIRE_ON : '#BDBDBD') : OR_COLOR;
          if (!testInput) {
            fill(red(color(dotColor)), green(color(dotColor)), blue(color(dotColor)), 50);
            ellipse(cellX + cellW / 2, cellY + cellH / 2, 20, 20);
          }
          fill(dotColor);
          ellipse(cellX + cellW / 2, cellY + cellH / 2, 12, 12);
        }
      }
    }

    // Output values during verify
    if (testInput) {
      let outY = gridTop + 8 + andRows * cellH + 5;
      for (let c = 0; c < orCols; c++) {
        let x = orLeft + c * cellW + cellW / 2;
        fill(outVals[c] ? WIRE_ON : '#EF5350');
        textAlign(CENTER, CENTER);
        textSize(13);
        textStyle(BOLD);
        text(outputLabels[c] + '=' + outVals[c], x, outY);
      }
    }
  }

  // Test input display
  if (testInput) {
    let tiY = gridTop + 8 + andRows * cellH + 28;
    fill(RESULT_BG);
    stroke('#4CAF50');
    strokeWeight(1);
    rect(mx + 10, tiY, w - 20, 26, 5);
    noStroke();
    fill('#1B5E20');
    textAlign(CENTER, CENTER);
    textSize(12);
    textStyle(BOLD);
    text('Test: A=' + testInput[0] + ' B=' + testInput[1] + ' C=' + testInput[2] +
         '  \u2192  F1=' + outVals[0] + '  F2=' + outVals[1], cx, tiY + 13);
  }
}

function drawResult(mx, vy, w, vh) {
  let cx = canvasWidth / 2;

  // Success header
  fill('#4CAF50');
  textAlign(CENTER, CENTER);
  textSize(16);
  textStyle(BOLD);
  text('\u2714 PLA Programmed Successfully', cx, vy + 20);

  // Summary boxes
  let y = vy + 45;
  let boxW = w - 40;

  // AND plane summary
  fill(AND_COLOR + '15');
  stroke(AND_COLOR);
  strokeWeight(1);
  rect(mx + 20, y, boxW, 50, 5);
  noStroke();
  fill(AND_COLOR);
  textSize(12);
  textStyle(BOLD);
  text('AND Plane: 3 Product Terms', cx, y + 15);
  textStyle(NORMAL);
  textSize(11);
  text("P0 = AB     P1 = A'C     P2 = BC", cx, y + 35);

  y += 60;
  // OR plane summary
  fill(OR_COLOR + '15');
  stroke(OR_COLOR);
  strokeWeight(1);
  rect(mx + 20, y, boxW, 50, 5);
  noStroke();
  fill(OR_COLOR);
  textSize(12);
  textStyle(BOLD);
  text('OR Plane: 2 Outputs', cx, y + 15);
  textStyle(NORMAL);
  textSize(11);
  text("F1 = P0+P1 = AB+A'C     F2 = P0+P2 = AB+BC", cx, y + 35);

  y += 60;
  // Efficiency note
  fill(RESULT_BG);
  stroke('#4CAF50');
  strokeWeight(2);
  rect(mx + 20, y, boxW, 35, 8);
  noStroke();
  fill('#1B5E20');
  textSize(12);
  textStyle(BOLD);
  text('Product term AB shared \u2192 saves hardware!', cx, y + 17);
}

function drawButtons() {
  // Styled instruction area
  let instrW = canvasWidth - 24;
  fill(235, 237, 242);
  noStroke();
  rect(12, drawHeight + 4, instrW, 16, 8);
  fill(100);
  textAlign(CENTER, CENTER);
  textSize(10);
  text('Step through the PLA programming process  |  Reset to start over', canvasWidth / 2, drawHeight + 12);

  let btnY = drawHeight + 28;
  let btnW = 90;
  let btnH = 28;
  let gap = 10;
  let totalBtnW = btnW * 3 + gap * 2;
  let startX = (canvasWidth - totalBtnW) / 2;

  let prevEnabled = currentStep > 0;
  if (prevEnabled) {
    noStroke();
    fill(25, 118, 210, 25);
    rect(startX - 1, btnY - 1, btnW + 2, btnH + 2, 7);
  }
  fill(prevEnabled ? '#1976D2' : '#CACACA');
  noStroke();
  rect(startX, btnY, btnW, btnH, 6);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(13);
  textStyle(BOLD);
  text('\u2190 Previous', startX + btnW / 2, btnY + btnH / 2);

  fill('#757575');
  rect(startX + btnW + gap, btnY, btnW, btnH, 6);
  fill(255);
  text('Reset', startX + btnW + gap + btnW / 2, btnY + btnH / 2);

  let nextEnabled = currentStep < totalSteps - 1;
  if (nextEnabled) {
    noStroke();
    fill(56, 142, 60, 25);
    rect(startX + 2 * (btnW + gap) - 1, btnY - 1, btnW + 2, btnH + 2, 7);
  }
  fill(nextEnabled ? '#388E3C' : '#CACACA');
  noStroke();
  rect(startX + 2 * (btnW + gap), btnY, btnW, btnH, 6);
  fill(255);
  text('Next \u2192', startX + 2 * (btnW + gap) + btnW / 2, btnY + btnH / 2);
  textStyle(NORMAL);

  // Cursor management
  let overInteractive = false;
  if (mouseY >= btnY && mouseY <= btnY + btnH) {
    if (mouseX >= startX && mouseX <= startX + btnW && prevEnabled) overInteractive = true;
    if (mouseX >= startX + btnW + gap && mouseX <= startX + 2 * btnW + gap) overInteractive = true;
    if (mouseX >= startX + 2 * (btnW + gap) && mouseX <= startX + 2 * (btnW + gap) + btnW && nextEnabled) overInteractive = true;
  }
  cursor(overInteractive ? HAND : ARROW);
}

function mousePressed() {
  let btnY = drawHeight + 28;
  let btnW = 90;
  let btnH = 28;
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
