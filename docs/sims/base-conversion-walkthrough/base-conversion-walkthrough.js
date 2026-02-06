// Base Conversion Walkthrough MicroSim
// Convert 156₁₀ to binary, octal, and hexadecimal using repeated division
// Bloom Level: Apply (L3) - Apply number base conversion algorithms
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 580;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let currentStep = 0;
let totalSteps; // set in setup based on steps array length

// Color scheme
const TITLE_BG = '#2196F3';
const STEP_BG = '#E3F2FD';
const HIGHLIGHT = '#FF9800';
const RESULT_BG = '#E8F5E9';

// Steps data - converting 156 to binary, then octal, then hex
let steps = [
  {
    title: "Convert 156₁₀ to Binary, Octal, and Hexadecimal",
    desc: "We will convert the decimal number 156 to three different bases using the repeated division method.",
    rule: "Repeated Division Method",
    visual: "intro"
  },
  // Binary conversion: 156 / 2
  {
    title: "Binary Conversion: Step 1",
    desc: "Divide 156 by 2:\n156 ÷ 2 = 78 remainder 0",
    rule: "Divide by target base (2), record remainder",
    visual: "binary",
    divisions: [{dividend: 156, divisor: 2, quotient: 78, remainder: 0}]
  },
  {
    title: "Binary Conversion: Step 2",
    desc: "Divide 78 by 2:\n78 ÷ 2 = 39 remainder 0",
    rule: "Continue dividing quotient by 2",
    visual: "binary",
    divisions: [
      {dividend: 156, divisor: 2, quotient: 78, remainder: 0},
      {dividend: 78, divisor: 2, quotient: 39, remainder: 0}
    ]
  },
  {
    title: "Binary Conversion: Step 3",
    desc: "Divide 39 by 2:\n39 ÷ 2 = 19 remainder 1",
    rule: "Continue dividing quotient by 2",
    visual: "binary",
    divisions: [
      {dividend: 156, divisor: 2, quotient: 78, remainder: 0},
      {dividend: 78, divisor: 2, quotient: 39, remainder: 0},
      {dividend: 39, divisor: 2, quotient: 19, remainder: 1}
    ]
  },
  {
    title: "Binary Conversion: Step 4",
    desc: "Divide 19 by 2:\n19 ÷ 2 = 9 remainder 1",
    rule: "Continue dividing quotient by 2",
    visual: "binary",
    divisions: [
      {dividend: 156, divisor: 2, quotient: 78, remainder: 0},
      {dividend: 78, divisor: 2, quotient: 39, remainder: 0},
      {dividend: 39, divisor: 2, quotient: 19, remainder: 1},
      {dividend: 19, divisor: 2, quotient: 9, remainder: 1}
    ]
  },
  {
    title: "Binary Conversion: Step 5",
    desc: "Divide 9 by 2:\n9 ÷ 2 = 4 remainder 1",
    rule: "Continue dividing quotient by 2",
    visual: "binary",
    divisions: [
      {dividend: 156, divisor: 2, quotient: 78, remainder: 0},
      {dividend: 78, divisor: 2, quotient: 39, remainder: 0},
      {dividend: 39, divisor: 2, quotient: 19, remainder: 1},
      {dividend: 19, divisor: 2, quotient: 9, remainder: 1},
      {dividend: 9, divisor: 2, quotient: 4, remainder: 1}
    ]
  },
  {
    title: "Binary Conversion: Step 6",
    desc: "Divide 4 by 2:\n4 ÷ 2 = 2 remainder 0",
    rule: "Continue dividing quotient by 2",
    visual: "binary",
    divisions: [
      {dividend: 156, divisor: 2, quotient: 78, remainder: 0},
      {dividend: 78, divisor: 2, quotient: 39, remainder: 0},
      {dividend: 39, divisor: 2, quotient: 19, remainder: 1},
      {dividend: 19, divisor: 2, quotient: 9, remainder: 1},
      {dividend: 9, divisor: 2, quotient: 4, remainder: 1},
      {dividend: 4, divisor: 2, quotient: 2, remainder: 0}
    ]
  },
  {
    title: "Binary Conversion: Step 7",
    desc: "Divide 2 by 2:\n2 ÷ 2 = 1 remainder 0",
    rule: "Continue dividing quotient by 2",
    visual: "binary",
    divisions: [
      {dividend: 156, divisor: 2, quotient: 78, remainder: 0},
      {dividend: 78, divisor: 2, quotient: 39, remainder: 0},
      {dividend: 39, divisor: 2, quotient: 19, remainder: 1},
      {dividend: 19, divisor: 2, quotient: 9, remainder: 1},
      {dividend: 9, divisor: 2, quotient: 4, remainder: 1},
      {dividend: 4, divisor: 2, quotient: 2, remainder: 0},
      {dividend: 2, divisor: 2, quotient: 1, remainder: 0}
    ]
  },
  {
    title: "Binary Conversion: Step 8",
    desc: "Divide 1 by 2:\n1 ÷ 2 = 0 remainder 1\nQuotient is 0, so we stop.",
    rule: "Stop when quotient = 0",
    visual: "binary",
    divisions: [
      {dividend: 156, divisor: 2, quotient: 78, remainder: 0},
      {dividend: 78, divisor: 2, quotient: 39, remainder: 0},
      {dividend: 39, divisor: 2, quotient: 19, remainder: 1},
      {dividend: 19, divisor: 2, quotient: 9, remainder: 1},
      {dividend: 9, divisor: 2, quotient: 4, remainder: 1},
      {dividend: 4, divisor: 2, quotient: 2, remainder: 0},
      {dividend: 2, divisor: 2, quotient: 1, remainder: 0},
      {dividend: 1, divisor: 2, quotient: 0, remainder: 1}
    ]
  },
  {
    title: "Binary Result",
    desc: "Read remainders bottom-to-top:\n156₁₀ = 10011100₂",
    rule: "Read remainders from last to first (LSB → MSB)",
    visual: "binary-result",
    result: "10011100"
  },
  // Octal conversion: 156 / 8
  {
    title: "Octal Conversion: Step 1",
    desc: "Divide 156 by 8:\n156 ÷ 8 = 19 remainder 4",
    rule: "Divide by target base (8), record remainder",
    visual: "octal",
    divisions: [{dividend: 156, divisor: 8, quotient: 19, remainder: 4}]
  },
  {
    title: "Octal Conversion: Step 2",
    desc: "Divide 19 by 8:\n19 ÷ 8 = 2 remainder 3",
    rule: "Continue dividing quotient by 8",
    visual: "octal",
    divisions: [
      {dividend: 156, divisor: 8, quotient: 19, remainder: 4},
      {dividend: 19, divisor: 8, quotient: 2, remainder: 3}
    ]
  },
  {
    title: "Octal Conversion: Step 3",
    desc: "Divide 2 by 8:\n2 ÷ 8 = 0 remainder 2\nQuotient is 0, so we stop.",
    rule: "Stop when quotient = 0",
    visual: "octal",
    divisions: [
      {dividend: 156, divisor: 8, quotient: 19, remainder: 4},
      {dividend: 19, divisor: 8, quotient: 2, remainder: 3},
      {dividend: 2, divisor: 8, quotient: 0, remainder: 2}
    ]
  },
  {
    title: "Octal Result",
    desc: "Read remainders bottom-to-top:\n156₁₀ = 234₈",
    rule: "Read remainders from last to first",
    visual: "octal-result",
    result: "234"
  },
  // Hex conversion: 156 / 16
  {
    title: "Hexadecimal Conversion: Step 1",
    desc: "Divide 156 by 16:\n156 ÷ 16 = 9 remainder 12 (C)",
    rule: "Divide by target base (16), record remainder",
    visual: "hex",
    divisions: [{dividend: 156, divisor: 16, quotient: 9, remainder: 12}]
  },
  {
    title: "Hexadecimal Conversion: Step 2",
    desc: "Divide 9 by 16:\n9 ÷ 16 = 0 remainder 9\nQuotient is 0, so we stop.",
    rule: "Stop when quotient = 0",
    visual: "hex",
    divisions: [
      {dividend: 156, divisor: 16, quotient: 9, remainder: 12},
      {dividend: 9, divisor: 16, quotient: 0, remainder: 9}
    ]
  },
  {
    title: "Hexadecimal Result",
    desc: "Read remainders bottom-to-top:\n156₁₀ = 9C₁₆\n(12 in hex = C)",
    rule: "Read remainders from last to first; digits > 9 use A-F",
    visual: "hex-result",
    result: "9C"
  },
  {
    title: "Summary",
    desc: "156₁₀ = 10011100₂ = 234₈ = 9C₁₆\n\nAll conversions use the same method: repeatedly divide by the target base and read remainders bottom-to-top.",
    rule: "Repeated Division Method",
    visual: "summary"
  }
];

function setup() {
  updateCanvasSize();
  totalSteps = steps.length;
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  describe('Base conversion walkthrough showing step-by-step division method', LABEL);
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
  let ruleW = textWidth(step.rule) + 20;
  textSize(12);
  textAlign(CENTER, CENTER);
  ruleW = max(ruleW, 100);
  rect(canvasWidth / 2 - ruleW / 2, ruleY, ruleW, 24, 12);
  fill(255);
  textStyle(BOLD);
  text(step.rule, canvasWidth / 2, ruleY + 12);

  // Description text - measure first to allocate space
  let descLines = step.desc.split('\n');
  let descHeight = descLines.length * 16 + 10;

  // Visual area
  let visY = ruleY + 40;
  let visH = drawHeight - visY - descHeight - 15;
  fill(STEP_BG);
  stroke(200);
  strokeWeight(1);
  rect(margin, visY, w, visH, 5);
  noStroke();

  // Draw visual content based on step type
  drawVisual(step, margin, visY, w, visH);

  // Description text
  let descY = visY + visH + 8;
  fill(60);
  textAlign(LEFT, TOP);
  textSize(13);
  textStyle(NORMAL);
  for (let i = 0; i < descLines.length; i++) {
    text(descLines[i], margin + 10, descY + i * 16);
  }

  // Buttons
  drawButtons();
}

function drawVisual(step, mx, vy, w, vh) {
  let cx = canvasWidth / 2;

  if (step.visual === 'intro') {
    fill(60);
    textAlign(CENTER, CENTER);
    textSize(28);
    textStyle(BOLD);
    text('156₁₀ = ?₂ = ?₈ = ?₁₆', cx, vy + vh / 2 - 20);
    textSize(14);
    textStyle(NORMAL);
    fill(100);
    text('Click "Next →" to begin', cx, vy + vh / 2 + 20);
  }
  else if (step.visual === 'summary') {
    textAlign(CENTER, CENTER);
    textSize(20);
    textStyle(BOLD);
    fill('#1B5E20');
    text('156₁₀', cx, vy + 40);
    fill(60);
    textSize(16);
    let results = [
      {label: 'Binary (base 2):', val: '10011100₂'},
      {label: 'Octal (base 8):', val: '234₈'},
      {label: 'Hex (base 16):', val: '9C₁₆'}
    ];
    for (let i = 0; i < results.length; i++) {
      let y = vy + 80 + i * 50;
      fill(RESULT_BG);
      stroke(200);
      rect(mx + 30, y, w - 60, 36, 5);
      noStroke();
      fill(60);
      textStyle(NORMAL);
      textAlign(LEFT, CENTER);
      text(results[i].label, mx + 45, y + 18);
      textStyle(BOLD);
      textAlign(RIGHT, CENTER);
      fill(TITLE_BG);
      text(results[i].val, mx + w - 45, y + 18);
    }
  }
  else if (step.visual.includes('-result')) {
    // Show the division table + highlighted result
    let base = step.visual.startsWith('binary') ? 2 : step.visual.startsWith('octal') ? 8 : 16;
    let baseLabel = base === 2 ? 'Binary' : base === 8 ? 'Octal' : 'Hexadecimal';
    let prevStep = steps[currentStep - 1];
    let divs = prevStep.divisions || [];
    drawDivisionTable(divs, mx, vy, w, vh, base, true);
    // Show result at bottom
    fill(RESULT_BG);
    stroke('#4CAF50');
    strokeWeight(2);
    let rh = 40;
    rect(mx + 30, vy + vh - rh - 10, w - 60, rh, 5);
    noStroke();
    fill('#1B5E20');
    textAlign(CENTER, CENTER);
    textSize(18);
    textStyle(BOLD);
    text('156₁₀ = ' + step.result + (base === 2 ? '₂' : base === 8 ? '₈' : '₁₆'), cx, vy + vh - rh / 2 - 10);
  }
  else if (step.divisions) {
    let base = step.visual === 'binary' ? 2 : step.visual === 'octal' ? 8 : 16;
    drawDivisionTable(step.divisions, mx, vy, w, vh, base, false);
  }
}

function drawDivisionTable(divisions, mx, vy, w, vh, base, showArrow) {
  let tableX = mx + 30;
  let tableW = w - 60;
  // Adaptive row height: shrink for large tables so they fit
  let maxTableH = vh - (showArrow ? 80 : 30);
  let rowH = min(28, Math.floor(maxTableH / (divisions.length + 1)));
  rowH = max(rowH, 20);
  let startY = vy + 15;

  // Header
  fill(TITLE_BG);
  noStroke();
  rect(tableX, startY, tableW, rowH, 3, 3, 0, 0);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(12);
  textStyle(BOLD);
  let colW = tableW / 4;
  text('Dividend', tableX + colW * 0.5, startY + rowH / 2);
  text('÷ ' + base, tableX + colW * 1.5, startY + rowH / 2);
  text('Quotient', tableX + colW * 2.5, startY + rowH / 2);
  text('Remainder', tableX + colW * 3.5, startY + rowH / 2);

  // Rows
  for (let i = 0; i < divisions.length; i++) {
    let d = divisions[i];
    let y = startY + rowH * (i + 1);
    let isLast = (i === divisions.length - 1);
    fill(isLast ? '#FFF3E0' : (i % 2 === 0 ? 245 : 255));
    stroke(220);
    strokeWeight(0.5);
    rect(tableX, y, tableW, rowH);
    noStroke();
    fill(60);
    textStyle(NORMAL);
    textSize(13);
    text(d.dividend, tableX + colW * 0.5, y + rowH / 2);
    text(d.divisor, tableX + colW * 1.5, y + rowH / 2);
    text(d.quotient, tableX + colW * 2.5, y + rowH / 2);
    // Remainder - highlight
    fill(isLast ? HIGHLIGHT : '#E65100');
    textStyle(BOLD);
    let remText = d.remainder.toString();
    if (base === 16 && d.remainder >= 10) {
      remText = d.remainder + ' (' + '0123456789ABCDEF'[d.remainder] + ')';
    }
    text(remText, tableX + colW * 3.5, y + rowH / 2);
  }

  // Arrow showing read direction
  if (showArrow) {
    let arrowX = tableX + tableW + 10;
    let topY = startY + rowH * divisions.length + rowH / 2;
    let botY = startY + rowH + rowH / 2;
    stroke(HIGHLIGHT);
    strokeWeight(2);
    line(arrowX, topY, arrowX, botY);
    // arrowhead
    line(arrowX, botY, arrowX - 5, botY + 8);
    line(arrowX, botY, arrowX + 5, botY + 8);
    noStroke();
    fill(HIGHLIGHT);
    textSize(10);
    textAlign(LEFT, CENTER);
    push();
    translate(arrowX + 8, (topY + botY) / 2);
    rotate(-PI / 2);
    text('Read ↑', 0, 0);
    pop();
  }
}

function drawButtons() {
  let btnY = drawHeight + 8;
  let btnW = 90;
  let btnH = 34;
  let gap = 10;
  let totalW = btnW * 3 + gap * 2;
  let startX = (canvasWidth - totalW) / 2;

  // Previous button
  let prevEnabled = currentStep > 0;
  fill(prevEnabled ? '#1976D2' : '#BDBDBD');
  noStroke();
  rect(startX, btnY, btnW, btnH, 5);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(14);
  textStyle(BOLD);
  text('← Previous', startX + btnW / 2, btnY + btnH / 2);

  // Reset button
  fill('#757575');
  rect(startX + btnW + gap, btnY, btnW, btnH, 5);
  fill(255);
  text('Reset', startX + btnW + gap + btnW / 2, btnY + btnH / 2);

  // Next button
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
