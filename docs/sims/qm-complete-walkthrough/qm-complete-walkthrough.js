// QM Complete Walkthrough MicroSim
// Full end-to-end Quine-McCluskey solution builder
// Bloom Level: Create (L6) - Construct, develop
// MicroSim template version 2026.02

// Canvas dimensions
let containerWidth;
let canvasWidth = 400;
let drawHeight = 550;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

// Margins
let margin = 15;
let defaultTextSize = 12;

// UI Elements
let mintermInput;
let dontCareInput;
let numVarsSelect;
let generateButton;
let resetButton;
let copyButton;

// Algorithm state
let numVars = 4;
let minterms = [];
let dontCares = [];
let columns = [];
let primeImplicants = [];
let essentialPIs = [];
let solution = [];
let finalExpression = '';
let currentPhase = 0; // 0=input, 1=grouping, 2=combination, 3=PI chart, 4=solution

// Scroll position for each panel
let scroll1 = 0;
let scroll2 = 0;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  textSize(defaultTextSize);

  // Input field for minterms
  mintermInput = createInput('0,2,5,6,7,8,10,12,13,14,15');
  mintermInput.size(150);
  mintermInput.attribute('placeholder', 'e.g., 0,1,2,5');

  // Input field for don't cares
  dontCareInput = createInput('');
  dontCareInput.size(150);
  dontCareInput.attribute('placeholder', 'e.g., 3,11 (optional)');

  // Variables dropdown
  numVarsSelect = createSelect();
  numVarsSelect.option('3 vars', 3);
  numVarsSelect.option('4 vars', 4);
  numVarsSelect.option('5 vars', 5);
  numVarsSelect.selected('4 vars');

  // Generate button
  generateButton = createButton('Generate Solution');
  generateButton.mousePressed(generateSolution);

  // Reset button
  resetButton = createButton('Reset');
  resetButton.mousePressed(resetSimulation);

  // Copy button
  copyButton = createButton('Copy Result');
  copyButton.mousePressed(copyResult);

  positionUIElements();

  describe('Complete Quine-McCluskey solver showing all steps from input to minimal expression', LABEL);
}

function positionUIElements() {
  let mainRect = document.querySelector('main').getBoundingClientRect();
  mintermInput.position(mainRect.left + 85, mainRect.top + drawHeight + 10);
  dontCareInput.position(mainRect.left + 85, mainRect.top + drawHeight + 40);
  numVarsSelect.position(mainRect.left + 85, mainRect.top + drawHeight + 70);
  generateButton.position(mainRect.left + 250, mainRect.top + drawHeight + 10);
  resetButton.position(mainRect.left + 250, mainRect.top + drawHeight + 40);
  copyButton.position(mainRect.left + 250, mainRect.top + drawHeight + 70);
}

function draw() {
  updateCanvasSize();

  // Draw background
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(18);
  text('Complete QM Method Solution', canvasWidth / 2, 5);

  if (currentPhase === 0) {
    drawInstructions();
  } else {
    drawSolution();
  }

  // Draw control labels
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Minterms:', 10, drawHeight + 20);
  text("Don't cares:", 10, drawHeight + 50);
  text('Variables:', 10, drawHeight + 80);
}

function drawInstructions() {
  fill('#666');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);
  text('Enter minterms and click "Generate Solution"', canvasWidth / 2, drawHeight / 2 - 20);
  text('to see the complete QM algorithm in action', canvasWidth / 2, drawHeight / 2 + 10);
}

function drawSolution() {
  // Divide canvas into sections
  let panelWidth = (canvasWidth - 3 * margin) / 2;
  let panelHeight = (drawHeight - 80) / 2;

  // Panel 1: Original Grouping (top-left)
  drawPanel(margin, 30, panelWidth, panelHeight, 'Step 1: Group by 1-count', drawGroupingPanel);

  // Panel 2: Combination Table (top-right)
  drawPanel(2 * margin + panelWidth, 30, panelWidth, panelHeight, 'Step 2: Combine Terms', drawCombinationPanel);

  // Panel 3: Prime Implicants (bottom-left)
  drawPanel(margin, 35 + panelHeight, panelWidth, panelHeight, 'Step 3: Prime Implicants', drawPIPanel);

  // Panel 4: Final Solution (bottom-right)
  drawPanel(2 * margin + panelWidth, 35 + panelHeight, panelWidth, panelHeight, 'Step 4: Minimum Cover', drawSolutionPanel);
}

function drawPanel(x, y, w, h, title, contentFunc) {
  // Panel background
  fill('white');
  stroke('#2196F3');
  strokeWeight(1);
  rect(x, y, w, h, 5);

  // Panel header
  fill('#2196F3');
  noStroke();
  rect(x, y, w, 22, 5, 5, 0, 0);

  fill('white');
  textAlign(CENTER, CENTER);
  textSize(11);
  text(title, x + w / 2, y + 11);

  // Content area
  push();
  // Create clipping region
  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.rect(x + 2, y + 24, w - 4, h - 26);
  drawingContext.clip();

  contentFunc(x + 5, y + 28, w - 10, h - 32);

  drawingContext.restore();
  pop();
}

function drawGroupingPanel(x, y, w, h) {
  if (columns.length === 0) return;

  let col = columns[0];
  let groupKeys = Object.keys(col.groups).map(Number).sort((a, b) => a - b);

  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(10);

  let lineY = y;
  for (let gk of groupKeys) {
    fill('#2196F3');
    text('Group ' + gk + ':', x, lineY);
    lineY += 14;

    fill('black');
    for (let term of col.groups[gk]) {
      let txt = 'm' + term.minterms[0] + ' = ' + term.pattern;
      text(txt, x + 10, lineY);
      lineY += 12;
      if (lineY > y + h - 10) break;
    }
    lineY += 4;
    if (lineY > y + h - 10) break;
  }
}

function drawCombinationPanel(x, y, w, h) {
  if (columns.length <= 1) return;

  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(10);

  let lineY = y;

  for (let c = 1; c < columns.length && lineY < y + h - 10; c++) {
    fill('#ff9800');
    text('Round ' + c + ':', x, lineY);
    lineY += 14;

    let col = columns[c];
    let groupKeys = Object.keys(col.groups).map(Number).sort((a, b) => a - b);

    fill('black');
    for (let gk of groupKeys) {
      for (let term of col.groups[gk]) {
        let txt = term.pattern + ' ← m' + term.minterms.slice(0, 3).join(',');
        if (term.minterms.length > 3) txt += '...';
        text(txt, x + 5, lineY);
        lineY += 11;
        if (lineY > y + h - 10) break;
      }
      if (lineY > y + h - 10) break;
    }
    lineY += 4;
  }
}

function drawPIPanel(x, y, w, h) {
  if (primeImplicants.length === 0) return;

  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(10);

  let lineY = y;
  text('Found ' + primeImplicants.length + ' prime implicants:', x, lineY);
  lineY += 16;

  for (let i = 0; i < primeImplicants.length && lineY < y + h - 10; i++) {
    let pi = primeImplicants[i];
    let isEssential = essentialPIs.some(e => e.pattern === pi.pattern);

    if (isEssential) {
      fill('#4CAF50');
      text('* ', x, lineY);
      fill('black');
    }

    let expr = patternToExpression(pi.pattern);
    let txt = 'PI' + (i + 1) + ': ' + pi.pattern + ' = ' + expr;
    text(txt, x + 10, lineY);

    fill('#666');
    textSize(9);
    text('covers m' + pi.minterms.slice(0, 4).join(',') + (pi.minterms.length > 4 ? '...' : ''), x + 10, lineY + 10);
    textSize(10);
    fill('black');

    lineY += 22;
  }

  if (essentialPIs.length > 0) {
    lineY += 5;
    fill('#4CAF50');
    textSize(9);
    text('* = Essential PI', x, lineY);
  }
}

function drawSolutionPanel(x, y, w, h) {
  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(10);

  let lineY = y;

  // Essential PIs
  text('Essential PIs:', x, lineY);
  lineY += 14;

  if (essentialPIs.length > 0) {
    for (let pi of essentialPIs) {
      fill('#4CAF50');
      text('  ' + patternToExpression(pi.pattern), x, lineY);
      lineY += 12;
    }
  } else {
    fill('#666');
    text('  (none - cyclic chart)', x, lineY);
    lineY += 12;
  }

  fill('black');
  lineY += 8;
  text('Additional PIs needed:', x, lineY);
  lineY += 14;

  let additionalPIs = solution.filter(s => !essentialPIs.some(e => e.pattern === s.pattern));
  if (additionalPIs.length > 0) {
    for (let pi of additionalPIs) {
      fill('#2196F3');
      text('  ' + patternToExpression(pi.pattern), x, lineY);
      lineY += 12;
    }
  } else {
    fill('#666');
    text('  (none needed)', x, lineY);
    lineY += 12;
  }

  // Final expression
  fill('black');
  lineY += 12;
  text('Minimum Expression:', x, lineY);
  lineY += 16;

  fill('#d32f2f');
  textSize(12);
  textStyle(BOLD);

  // Word wrap for long expressions
  let words = finalExpression.split(' + ');
  let currentLine = '';
  for (let word of words) {
    if (textWidth(currentLine + word) > w - 10) {
      text('F = ' + currentLine, x, lineY);
      lineY += 14;
      currentLine = '    + ' + word + ' + ';
    } else {
      currentLine += word + ' + ';
    }
  }
  currentLine = currentLine.slice(0, -3); // Remove trailing ' + '
  text(currentLine.startsWith('F') ? currentLine : 'F = ' + currentLine, x, lineY);

  textStyle(NORMAL);
  textSize(10);

  // Stats
  fill('#666');
  lineY += 20;
  text('Terms: ' + solution.length + ' | Literals: ' + countLiterals(), x, lineY);
}

function generateSolution() {
  numVars = parseInt(numVarsSelect.value());

  // Parse minterms
  minterms = parseIntList(mintermInput.value());
  dontCares = parseIntList(dontCareInput.value());

  if (minterms.length === 0) {
    alert('Please enter at least one minterm');
    return;
  }

  // Validate
  let maxVal = Math.pow(2, numVars) - 1;
  minterms = minterms.filter(m => m >= 0 && m <= maxVal);
  dontCares = dontCares.filter(m => m >= 0 && m <= maxVal);

  // Initialize
  columns = [];
  primeImplicants = [];
  essentialPIs = [];
  solution = [];

  // Step 1: Create initial grouping
  let allTerms = [...minterms, ...dontCares];
  let initialTerms = [];

  for (let val of allTerms) {
    let binary = val.toString(2).padStart(numVars, '0');
    let ones = (binary.match(/1/g) || []).length;
    initialTerms.push({
      pattern: binary,
      minterms: [val],
      ones: ones,
      combined: false
    });
  }

  // Group by ones
  let grouped = {};
  for (let term of initialTerms) {
    if (!grouped[term.ones]) grouped[term.ones] = [];
    grouped[term.ones].push(term);
  }

  columns.push({ level: 0, groups: grouped });

  // Step 2: Iterative combination
  let colIndex = 0;
  while (true) {
    let currentColumn = columns[colIndex];
    let newGroups = {};
    let anyNew = false;

    let groupKeys = Object.keys(currentColumn.groups).map(Number).sort((a, b) => a - b);

    for (let i = 0; i < groupKeys.length - 1; i++) {
      let group1 = currentColumn.groups[groupKeys[i]];
      let group2 = currentColumn.groups[groupKeys[i + 1]];

      for (let term1 of group1) {
        for (let term2 of group2) {
          let result = canCombine(term1.pattern, term2.pattern);
          if (result.canCombine) {
            anyNew = true;
            term1.combined = true;
            term2.combined = true;

            let newTerm = {
              pattern: result.newPattern,
              minterms: [...term1.minterms, ...term2.minterms].sort((a, b) => a - b),
              ones: (result.newPattern.match(/1/g) || []).length,
              combined: false
            };

            if (!newGroups[newTerm.ones]) newGroups[newTerm.ones] = [];
            let exists = newGroups[newTerm.ones].some(t => t.pattern === newTerm.pattern);
            if (!exists) newGroups[newTerm.ones].push(newTerm);
          }
        }
      }
    }

    // Collect uncombined terms as PIs
    for (let key of Object.keys(currentColumn.groups)) {
      for (let term of currentColumn.groups[key]) {
        if (!term.combined) {
          // Check if already exists
          let exists = primeImplicants.some(p => p.pattern === term.pattern);
          if (!exists) primeImplicants.push(term);
        }
      }
    }

    if (!anyNew || Object.keys(newGroups).length === 0) break;

    columns.push({ level: colIndex + 1, groups: newGroups });
    colIndex++;
  }

  // Step 3: Find essential PIs (only consider required minterms, not don't cares)
  for (let mt of minterms) {
    let coveringPIs = primeImplicants.filter(pi => pi.minterms.includes(mt));
    if (coveringPIs.length === 1) {
      let exists = essentialPIs.some(e => e.pattern === coveringPIs[0].pattern);
      if (!exists) essentialPIs.push(coveringPIs[0]);
    }
  }

  // Step 4: Find minimum cover
  solution = [...essentialPIs];

  // Find uncovered minterms
  let covered = new Set();
  for (let pi of solution) {
    for (let mt of pi.minterms) {
      if (minterms.includes(mt)) covered.add(mt);
    }
  }

  // Greedy selection for remaining minterms
  let uncovered = minterms.filter(m => !covered.has(m));
  while (uncovered.length > 0) {
    // Find PI that covers most uncovered minterms
    let bestPI = null;
    let bestCount = 0;

    for (let pi of primeImplicants) {
      if (solution.some(s => s.pattern === pi.pattern)) continue;
      let count = pi.minterms.filter(m => uncovered.includes(m)).length;
      if (count > bestCount) {
        bestCount = count;
        bestPI = pi;
      }
    }

    if (bestPI) {
      solution.push(bestPI);
      for (let mt of bestPI.minterms) {
        if (minterms.includes(mt)) covered.add(mt);
      }
      uncovered = minterms.filter(m => !covered.has(m));
    } else {
      break;
    }
  }

  // Generate final expression
  finalExpression = solution.map(pi => patternToExpression(pi.pattern)).join(' + ');

  currentPhase = 1;
}

function canCombine(p1, p2) {
  let diffCount = 0;
  let newPattern = '';

  for (let i = 0; i < p1.length; i++) {
    if (p1[i] !== p2[i]) {
      if (p1[i] === '-' || p2[i] === '-') return { canCombine: false };
      diffCount++;
      newPattern += '-';
    } else {
      newPattern += p1[i];
    }
  }

  return { canCombine: diffCount === 1, newPattern: newPattern };
}

function patternToExpression(pattern) {
  let vars = ['A', 'B', 'C', 'D', 'E', 'F'];
  let expr = '';

  for (let i = 0; i < pattern.length; i++) {
    if (pattern[i] === '1') {
      expr += vars[i];
    } else if (pattern[i] === '0') {
      expr += vars[i] + "'";
    }
  }

  return expr || '1';
}

function countLiterals() {
  let count = 0;
  for (let pi of solution) {
    for (let c of pi.pattern) {
      if (c !== '-') count++;
    }
  }
  return count;
}

function parseIntList(str) {
  if (!str.trim()) return [];
  return str.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
}

function resetSimulation() {
  currentPhase = 0;
  columns = [];
  primeImplicants = [];
  essentialPIs = [];
  solution = [];
  finalExpression = '';
  mintermInput.value('0,2,5,6,7,8,10,12,13,14,15');
  dontCareInput.value('');
}

function copyResult() {
  if (finalExpression) {
    navigator.clipboard.writeText('F = ' + finalExpression).then(() => {
      alert('Copied to clipboard!');
    });
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  mintermInput.size(Math.min(150, canvasWidth - 200));
  dontCareInput.size(Math.min(150, canvasWidth - 200));
  positionUIElements();
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
