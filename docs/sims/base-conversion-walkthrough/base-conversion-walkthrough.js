// Base Conversion Walkthrough MicroSim
// Convert any decimal number to binary, octal, and hexadecimal using repeated division
// Bloom Level: Apply (L3) - Apply number base conversion algorithms
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 580;
let controlHeight = 90;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let currentStep = 0;
let totalSteps; // set in setup based on steps array length
let currentNumber = 156;

// UI elements
let numberInput;
let goButton;

// Color scheme
const TITLE_BG = '#2196F3';
const STEP_BG = '#E3F2FD';
const HIGHLIGHT = '#FF9800';
const RESULT_BG = '#E8F5E9';

// Conversion results stored for summary display
let convResults = {};

function generateSteps(num) {
  let newSteps = [];
  convResults = {};

  // Intro step
  newSteps.push({
    title: "Convert " + num + "\u2081\u2080 to Binary, Octal, and Hexadecimal",
    desc: "We will convert the decimal number " + num + " to three different bases using the repeated division method.",
    rule: "Repeated Division Method",
    visual: "intro"
  });

  let bases = [
    {base: 2, name: "Binary", visual: "binary", resultVisual: "binary-result", subscript: "\u2082"},
    {base: 8, name: "Octal", visual: "octal", resultVisual: "octal-result", subscript: "\u2088"},
    {base: 16, name: "Hexadecimal", visual: "hex", resultVisual: "hex-result", subscript: "\u2081\u2086"}
  ];

  for (let b of bases) {
    let divisions = [];
    let q = num;
    let stepNum = 0;

    while (q > 0) {
      stepNum++;
      let remainder = q % b.base;
      let quotient = Math.floor(q / b.base);
      divisions.push({dividend: q, divisor: b.base, quotient: quotient, remainder: remainder});

      let isLast = quotient === 0;
      let remText = remainder.toString();
      if (b.base === 16 && remainder >= 10) {
        remText = remainder + ' (' + '0123456789ABCDEF'[remainder] + ')';
      }
      let descText = "Divide " + q + " by " + b.base + ":\n" + q + " \u00f7 " + b.base + " = " + quotient + " remainder " + remText;
      if (isLast) descText += "\nQuotient is 0, so we stop.";

      newSteps.push({
        title: b.name + " Conversion: Step " + stepNum,
        desc: descText,
        rule: stepNum === 1 ? "Divide by target base (" + b.base + "), record remainder" :
              (isLast ? "Stop when quotient = 0" : "Continue dividing quotient by " + b.base),
        visual: b.visual,
        divisions: divisions.map(function(d) { return {dividend: d.dividend, divisor: d.divisor, quotient: d.quotient, remainder: d.remainder}; })
      });

      q = quotient;
    }

    // Build result string from remainders (reverse order)
    let resultStr = divisions.map(function(d) {
      if (b.base === 16 && d.remainder >= 10) return '0123456789ABCDEF'[d.remainder];
      return d.remainder.toString();
    }).reverse().join('');
    convResults[b.name] = resultStr;

    // Result step
    let ruleText = "Read remainders from last to first";
    if (b.base === 2) ruleText += " (LSB \u2192 MSB)";
    if (b.base === 16) ruleText += "; digits > 9 use A-F";

    let descSuffix = '';
    if (b.base === 16) {
      // Check if any hex digit > 9
      let hexDigits = divisions.filter(function(d) { return d.remainder >= 10; });
      if (hexDigits.length > 0) {
        descSuffix = '\n(' + hexDigits.map(function(d) { return d.remainder + ' in hex = ' + '0123456789ABCDEF'[d.remainder]; }).join(', ') + ')';
      }
    }

    newSteps.push({
      title: b.name + " Result",
      desc: "Read remainders bottom-to-top:\n" + num + "\u2081\u2080 = " + resultStr + b.subscript + descSuffix,
      rule: ruleText,
      visual: b.resultVisual,
      result: resultStr
    });
  }

  // Summary step
  newSteps.push({
    title: "Summary",
    desc: num + "\u2081\u2080 = " + convResults["Binary"] + "\u2082 = " + convResults["Octal"] + "\u2088 = " + convResults["Hexadecimal"] + "\u2081\u2086\n\nAll conversions use the same method: repeatedly divide by the target base and read remainders bottom-to-top.",
    rule: "Repeated Division Method",
    visual: "summary"
  });

  return newSteps;
}

let steps = generateSteps(156);

function setup() {
  updateCanvasSize();
  totalSteps = steps.length;
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  // Input field for decimal number
  numberInput = createInput('156');
  numberInput.size(80);
  numberInput.attribute('placeholder', 'e.g., 168');
  numberInput.attribute('type', 'number');
  numberInput.attribute('min', '1');
  numberInput.attribute('max', '9999');

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
  describe('Base conversion walkthrough showing step-by-step division method', LABEL);
}

function positionUIElements() {
  let mainRect = document.querySelector('main').getBoundingClientRect();
  numberInput.position(mainRect.left + 85, mainRect.top + drawHeight + 10);
  goButton.position(mainRect.left + 180, mainRect.top + drawHeight + 8);
}

function handleGo() {
  let val = parseInt(numberInput.value());
  if (isNaN(val) || val < 1 || val > 9999) {
    numberInput.style('border', '2px solid red');
    return;
  }
  numberInput.style('border', '');
  currentNumber = val;
  steps = generateSteps(val);
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

  // Input label
  fill(60);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(13);
  textStyle(BOLD);
  text('Decimal:', margin, drawHeight + 18);

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
    text(currentNumber + '\u2081\u2080 = ?\u2082 = ?\u2088 = ?\u2081\u2086', cx, vy + vh / 2 - 20);
    textSize(14);
    textStyle(NORMAL);
    fill(100);
    text('Click "Next \u2192" to begin', cx, vy + vh / 2 + 20);
  }
  else if (step.visual === 'summary') {
    textAlign(CENTER, CENTER);
    textSize(20);
    textStyle(BOLD);
    fill('#1B5E20');
    text(currentNumber + '\u2081\u2080', cx, vy + 40);
    fill(60);
    textSize(16);
    let results = [
      {label: 'Binary (base 2):', val: convResults['Binary'] + '\u2082'},
      {label: 'Octal (base 8):', val: convResults['Octal'] + '\u2088'},
      {label: 'Hex (base 16):', val: convResults['Hexadecimal'] + '\u2081\u2086'}
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
    text(currentNumber + '\u2081\u2080 = ' + step.result + (base === 2 ? '\u2082' : base === 8 ? '\u2088' : '\u2081\u2086'), cx, vy + vh - rh / 2 - 10);
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
  text('\u00f7 ' + base, tableX + colW * 1.5, startY + rowH / 2);
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
    text('Read \u2191', 0, 0);
    pop();
  }
}

function drawButtons() {
  let btnY = drawHeight + 48;
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
  text('\u2190 Previous', startX + btnW / 2, btnY + btnH / 2);

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
