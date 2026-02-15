// Base Conversion Walkthrough MicroSim
// Convert numbers between binary, octal, decimal, and hexadecimal using
// positional notation (to decimal) and repeated division (from decimal)
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
let inputBase = 10;
let inputStr = '156';

// UI elements
let numberInput;
let baseSelect;
let goButton;

// Color scheme
const TITLE_BG = '#2196F3';
const STEP_BG = '#E3F2FD';
const HIGHLIGHT = '#FF9800';
const RESULT_BG = '#E8F5E9';

// Conversion results stored for summary display
let convResults = {};

// Unicode subscript helper
function toSubscript(n) {
  let sub = {
    '0': '\u2080', '1': '\u2081', '2': '\u2082', '3': '\u2083',
    '4': '\u2084', '5': '\u2085', '6': '\u2086', '7': '\u2087',
    '8': '\u2088', '9': '\u2089'
  };
  return String(n).split('').map(function(c) { return sub[c] || c; }).join('');
}

// Base name helper
function baseName(b) {
  if (b === 2) return 'Binary';
  if (b === 8) return 'Octal';
  if (b === 10) return 'Decimal';
  if (b === 16) return 'Hexadecimal';
  return 'Base ' + b;
}

// Validate input string for a given base
function isValidInput(str, base) {
  if (!str || str.length === 0) return false;
  let upper = str.toUpperCase();
  for (let i = 0; i < upper.length; i++) {
    let ch = upper[i];
    let value;
    if (ch >= '0' && ch <= '9') {
      value = ch.charCodeAt(0) - '0'.charCodeAt(0);
    } else if (ch >= 'A' && ch <= 'F') {
      value = ch.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
    } else {
      return false;
    }
    if (value >= base) return false;
  }
  return true;
}

function generateSteps(numStr, fromBase) {
  let newSteps = [];
  convResults = {};

  numStr = numStr.toUpperCase();
  let decimalValue;
  if (fromBase === 10) {
    decimalValue = parseInt(numStr, 10);
  } else {
    decimalValue = parseInt(numStr, fromBase);
  }

  // Target bases: all standard bases except the input base
  let allBases = [2, 8, 10, 16];
  let targetBases = allBases.filter(function(b) { return b !== fromBase; });

  // Build intro text: numStr₍fromBase₎ = ?₍t1₎ = ?₍t2₎ = ?₍t3₎
  let introText = numStr + toSubscript(fromBase);
  for (let i = 0; i < targetBases.length; i++) {
    introText += ' = ?' + toSubscript(targetBases[i]);
  }

  // Intro step
  let targetNames = targetBases.map(function(b) { return baseName(b); }).join(', ');
  newSteps.push({
    title: "Convert " + numStr + toSubscript(fromBase) + " to " + targetNames,
    desc: "We will convert " + numStr + toSubscript(fromBase) + " to " + targetNames + ".",
    rule: fromBase === 10 ? "Repeated Division Method" : "Positional Notation + Division",
    visual: "intro",
    introText: introText
  });

  // If input is not decimal, show positional notation conversion to decimal
  if (fromBase !== 10) {
    let digits = numStr.split('');
    let numDigits = digits.length;
    let posData = [];
    for (let i = 0; i < numDigits; i++) {
      let pos = numDigits - 1 - i;
      let digitChar = digits[i];
      let digitVal = parseInt(digitChar, fromBase);
      let weight = Math.pow(fromBase, pos);
      let value = digitVal * weight;
      posData.push({
        digitChar: digitChar,
        digitVal: digitVal,
        pos: pos,
        weight: weight,
        value: value
      });
    }

    // Step 1: Show positional breakdown
    let breakdownParts = posData.map(function(p) {
      return p.digitChar + ' \u00d7 ' + fromBase + '^' + p.pos;
    });
    newSteps.push({
      title: baseName(fromBase) + " to Decimal: Positional Notation",
      desc: "Each digit is multiplied by its positional weight (" + fromBase + " raised to the position power).\n" +
            numStr + toSubscript(fromBase) + " = " + breakdownParts.join(' + '),
      rule: "Multiply each digit by base^position",
      visual: "positional",
      posData: posData,
      fromBase: fromBase,
      numStr: numStr
    });

    // Step 2: Show result
    let sumParts = posData.map(function(p) { return p.value; });
    let sumStr = sumParts.join(' + ');
    convResults['Decimal'] = String(decimalValue);
    newSteps.push({
      title: baseName(fromBase) + " to Decimal: Result",
      desc: sumStr + " = " + decimalValue + "\n" +
            numStr + toSubscript(fromBase) + " = " + decimalValue + toSubscript(10),
      rule: "Sum all weighted values",
      visual: "positional-result",
      posData: posData,
      fromBase: fromBase,
      numStr: numStr,
      decimalValue: decimalValue
    });
  }

  // Repeated division for each non-decimal target base
  let divisionBases = targetBases.filter(function(b) { return b !== 10; });

  let baseInfo = {
    2:  {name: "Binary", subscript: toSubscript(2)},
    8:  {name: "Octal", subscript: toSubscript(8)},
    16: {name: "Hexadecimal", subscript: toSubscript(16)}
  };

  for (let bi = 0; bi < divisionBases.length; bi++) {
    let b = divisionBases[bi];
    let info = baseInfo[b];
    let divisions = [];
    let q = decimalValue;
    let stepNum = 0;

    while (q > 0) {
      stepNum++;
      let remainder = q % b;
      let quotient = Math.floor(q / b);
      divisions.push({dividend: q, divisor: b, quotient: quotient, remainder: remainder});

      let isLast = quotient === 0;
      let remText = remainder.toString();
      if (b === 16 && remainder >= 10) {
        remText = remainder + ' (' + '0123456789ABCDEF'[remainder] + ')';
      }
      let descText = "Divide " + q + " by " + b + ":\n" + q + " \u00f7 " + b + " = " + quotient + " remainder " + remText;
      if (isLast) descText += "\nQuotient is 0, so we stop.";

      newSteps.push({
        title: info.name + " Conversion: Step " + stepNum,
        desc: descText,
        rule: stepNum === 1 ? "Divide by target base (" + b + "), record remainder" :
              (isLast ? "Stop when quotient = 0" : "Continue dividing quotient by " + b),
        visual: "division",
        divBase: b,
        divisions: divisions.map(function(d) { return {dividend: d.dividend, divisor: d.divisor, quotient: d.quotient, remainder: d.remainder}; })
      });

      q = quotient;
    }

    // Build result string from remainders (reverse order)
    let resultStr = divisions.map(function(d) {
      if (b === 16 && d.remainder >= 10) return '0123456789ABCDEF'[d.remainder];
      return d.remainder.toString();
    }).reverse().join('');
    convResults[info.name] = resultStr;

    // Result step
    let ruleText = "Read remainders from last to first";
    if (b === 2) ruleText += " (LSB \u2192 MSB)";
    if (b === 16) ruleText += "; digits > 9 use A-F";

    let descSuffix = '';
    if (b === 16) {
      let hexDigits = divisions.filter(function(d) { return d.remainder >= 10; });
      if (hexDigits.length > 0) {
        descSuffix = '\n(' + hexDigits.map(function(d) { return d.remainder + ' in hex = ' + '0123456789ABCDEF'[d.remainder]; }).join(', ') + ')';
      }
    }

    newSteps.push({
      title: info.name + " Result",
      desc: "Read remainders bottom-to-top:\n" + decimalValue + toSubscript(10) + " = " + resultStr + info.subscript + descSuffix,
      rule: ruleText,
      visual: "division-result",
      divBase: b,
      result: resultStr
    });
  }

  // Summary step - build dynamic results
  let summaryResults = [];
  let summaryParts = [];

  // Start with input representation
  summaryParts.push(numStr + toSubscript(fromBase));

  for (let i = 0; i < targetBases.length; i++) {
    let tb = targetBases[i];
    let name = baseName(tb);
    let val = convResults[name];
    summaryResults.push({label: name + ' (base ' + tb + '):', val: val + toSubscript(tb)});
    summaryParts.push(val + toSubscript(tb));
  }

  let methodDesc = fromBase === 10
    ? "All conversions use the same method: repeatedly divide by the target base and read remainders bottom-to-top."
    : "Positional notation converts to decimal; repeated division converts from decimal to other bases.";

  newSteps.push({
    title: "Summary",
    desc: summaryParts.join(' = ') + "\n\n" + methodDesc,
    rule: fromBase === 10 ? "Repeated Division Method" : "Positional Notation + Division",
    visual: "summary",
    summaryResults: summaryResults,
    summarySource: numStr + toSubscript(fromBase)
  });

  return newSteps;
}

let steps = generateSteps('156', 10);

function setup() {
  updateCanvasSize();
  totalSteps = steps.length;
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  // Base selector dropdown
  baseSelect = createSelect();
  baseSelect.option('Binary (2)', '2');
  baseSelect.option('Octal (8)', '8');
  baseSelect.option('Decimal (10)', '10');
  baseSelect.option('Hexadecimal (16)', '16');
  baseSelect.selected('10');
  baseSelect.changed(function() {
    inputBase = parseInt(baseSelect.value());
    // Update placeholder based on selected base
    if (inputBase === 2) numberInput.attribute('placeholder', 'e.g., 10011100');
    else if (inputBase === 8) numberInput.attribute('placeholder', 'e.g., 234');
    else if (inputBase === 10) numberInput.attribute('placeholder', 'e.g., 156');
    else if (inputBase === 16) numberInput.attribute('placeholder', 'e.g., 9C');
  });

  // Input field for number (text to allow hex letters)
  numberInput = createInput('156');
  numberInput.size(80);
  numberInput.attribute('placeholder', 'e.g., 156');

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
  let labelWidth = 60;  // "Number:" label
  let inputLeft = mainRect.left + labelWidth + 5;
  numberInput.position(inputLeft, mainRect.top + drawHeight + 10);
  baseSelect.position(inputLeft + 90, mainRect.top + drawHeight + 10);
  goButton.position(inputLeft + 210, mainRect.top + drawHeight + 8);
}

function handleGo() {
  inputBase = parseInt(baseSelect.value());
  let raw = numberInput.value().trim().toUpperCase();

  if (!isValidInput(raw, inputBase)) {
    numberInput.style('border', '2px solid red');
    return;
  }

  // Convert to decimal to check range
  let decVal = parseInt(raw, inputBase);
  if (isNaN(decVal) || decVal < 1 || decVal > 9999) {
    numberInput.style('border', '2px solid red');
    return;
  }

  numberInput.style('border', '');
  currentNumber = decVal;
  inputStr = raw;
  steps = generateSteps(raw, inputBase);
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
  text('Number:', margin, drawHeight + 18);

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
    text(step.introText, cx, vy + vh / 2 - 20);
    textSize(14);
    textStyle(NORMAL);
    fill(100);
    text('Click "Next \u2192" to begin', cx, vy + vh / 2 + 20);
  }
  else if (step.visual === 'positional') {
    drawPositionalNotation(step, mx, vy, w, vh);
  }
  else if (step.visual === 'positional-result') {
    drawPositionalResult(step, mx, vy, w, vh);
  }
  else if (step.visual === 'summary') {
    textAlign(CENTER, CENTER);
    textSize(20);
    textStyle(BOLD);
    fill('#1B5E20');
    text(step.summarySource, cx, vy + 40);
    fill(60);
    textSize(16);
    let results = step.summaryResults;
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
  else if (step.visual === 'division-result') {
    // Show the division table + highlighted result
    let base = step.divBase;
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
    let subscript = toSubscript(base);
    text(currentNumber + toSubscript(10) + ' = ' + step.result + subscript, cx, vy + vh - rh / 2 - 10);
  }
  else if (step.visual === 'division' && step.divisions) {
    let base = step.divBase;
    drawDivisionTable(step.divisions, mx, vy, w, vh, base, false);
  }
}

function drawPositionalNotation(step, mx, vy, w, vh) {
  let posData = step.posData;
  let numDigits = posData.length;
  let cx = canvasWidth / 2;

  // Table layout
  let tableMargin = 20;
  let tableX = mx + tableMargin;
  let tableW = w - 2 * tableMargin;
  let colW = Math.min(50, Math.floor(tableW / (numDigits + 1)));
  let labelColW = tableW - colW * numDigits;
  // Center the table
  let totalTableW = labelColW + colW * numDigits;
  tableX = cx - totalTableW / 2;

  let rowH = Math.min(30, Math.floor((vh - 40) / 4));
  let startY = vy + 15;

  let rows = ['Position', 'Digit', '\u00d7 Weight', '= Value'];

  for (let r = 0; r < 4; r++) {
    let y = startY + r * rowH;

    // Row label
    if (r === 0) {
      fill(TITLE_BG);
    } else {
      fill(r % 2 === 0 ? 240 : 250);
    }
    stroke(200);
    strokeWeight(0.5);
    rect(tableX, y, labelColW, rowH);
    noStroke();
    fill(r === 0 ? 255 : 60);
    textAlign(CENTER, CENTER);
    textSize(11);
    textStyle(BOLD);
    text(rows[r], tableX + labelColW / 2, y + rowH / 2);

    // Data columns
    for (let c = 0; c < numDigits; c++) {
      let p = posData[c];
      let cellX = tableX + labelColW + c * colW;

      if (r === 0) {
        fill(TITLE_BG);
      } else if (r === 3 && p.value > 0) {
        fill('#C8E6C9'); // green for non-zero values
      } else {
        fill(r % 2 === 0 ? 240 : 250);
      }
      stroke(200);
      strokeWeight(0.5);
      rect(cellX, y, colW, rowH);
      noStroke();

      textSize(12);
      textStyle(r === 0 ? BOLD : NORMAL);
      fill(r === 0 ? 255 : 60);
      textAlign(CENTER, CENTER);

      if (r === 0) {
        text(p.pos, cellX + colW / 2, y + rowH / 2);
      } else if (r === 1) {
        textStyle(BOLD);
        fill('#E65100');
        text(p.digitChar, cellX + colW / 2, y + rowH / 2);
      } else if (r === 2) {
        text(p.digitChar + '\u00d7' + p.weight, cellX + colW / 2, y + rowH / 2);
      } else if (r === 3) {
        textStyle(BOLD);
        if (p.value > 0) fill('#1B5E20');
        text(p.value, cellX + colW / 2, y + rowH / 2);
      }
    }
  }

  // Sum at bottom
  let sumY = startY + 4 * rowH + 15;
  fill(60);
  textAlign(CENTER, CENTER);
  textSize(14);
  textStyle(NORMAL);
  let valParts = posData.map(function(p) { return p.value; });
  text(valParts.join(' + '), cx, sumY);
}

function drawPositionalResult(step, mx, vy, w, vh) {
  let posData = step.posData;
  let cx = canvasWidth / 2;

  // Show compact positional summary
  let sumY = vy + 30;
  fill(60);
  textAlign(CENTER, CENTER);
  textSize(14);
  textStyle(NORMAL);
  let valParts = posData.map(function(p) { return p.value; });
  text(valParts.join(' + ') + ' = ' + step.decimalValue, cx, sumY);

  // Show result box
  let rh = 44;
  let ry = vy + vh / 2 - rh / 2;
  fill(RESULT_BG);
  stroke('#4CAF50');
  strokeWeight(2);
  rect(mx + 30, ry, w - 60, rh, 5);
  noStroke();
  fill('#1B5E20');
  textAlign(CENTER, CENTER);
  textSize(20);
  textStyle(BOLD);
  text(step.numStr + toSubscript(step.fromBase) + ' = ' + step.decimalValue + toSubscript(10), cx, ry + rh / 2);
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
