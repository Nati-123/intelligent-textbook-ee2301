// QM Combination Process Simulator MicroSim
// Step-by-step demonstration of combining minterms in QM method
// Bloom Level: Apply (L3) - Execute, implement
// MicroSim template version 2026.02

// Canvas dimensions
let containerWidth;
let canvasWidth = 400;
let drawHeight = 500;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

// Margins
let margin = 20;
let sliderLeftMargin = 160;
let defaultTextSize = 14;

// UI Elements
let stepButton;
let runAllButton;
let resetButton;
let numVarsSelect;

// Data structures
let minterms = [];
let numVars = 4;
let columns = []; // Each column holds terms at that combination level
let currentStep = 0;
let totalSteps = 0;
let primeImplicants = [];
let comparisonHistory = [];
let currentComparison = null;

// Example minterms for 4 variables
let defaultMinterms = [0, 1, 2, 5, 6, 7, 8, 9, 10, 14];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  textSize(defaultTextSize);

  // Create buttons
  stepButton = createButton('Next Step');
  stepButton.mousePressed(nextStep);

  runAllButton = createButton('Run All');
  runAllButton.mousePressed(runAll);

  resetButton = createButton('Reset');
  resetButton.mousePressed(resetSimulation);

  // Create dropdown for number of variables
  numVarsSelect = createSelect();
  numVarsSelect.option('3 vars', 3);
  numVarsSelect.option('4 vars', 4);
  numVarsSelect.option('5 vars', 5);
  numVarsSelect.selected('4 vars');
  numVarsSelect.changed(updateNumVars);

  positionUIElements();

  // Initialize
  initializeSimulation();

  describe('Step-by-step visualization of Quine-McCluskey combination process', LABEL);
}

function positionUIElements() {
  let mainRect = document.querySelector('main').getBoundingClientRect();
  stepButton.position(mainRect.left + 10, mainRect.top + drawHeight + 10);
  runAllButton.position(mainRect.left + 100, mainRect.top + drawHeight + 10);
  resetButton.position(mainRect.left + 175, mainRect.top + drawHeight + 10);
  numVarsSelect.position(mainRect.left + 350, mainRect.top + drawHeight + 10);
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
  textSize(20);
  text('QM Combination Process', canvasWidth / 2, 8);

  // Draw columns
  drawColumns();

  // Draw current comparison highlight
  if (currentComparison) {
    drawComparisonHighlight();
  }

  // Draw prime implicants summary
  drawPrimeImplicantsSummary();

  // Draw control labels
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Variables:', 290, drawHeight + 20);

  // Step counter
  textAlign(LEFT, CENTER);
  text('Step: ' + currentStep + '/' + totalSteps, 10, drawHeight + 55);

  // Status
  if (currentStep >= totalSteps && totalSteps > 0) {
    fill('green');
    text('Complete! Prime implicants identified.', 120, drawHeight + 55);
  }
}

function initializeSimulation() {
  numVars = parseInt(numVarsSelect.value());
  currentStep = 0;
  primeImplicants = [];
  comparisonHistory = [];
  currentComparison = null;
  columns = [];

  // Initialize minterms based on number of variables
  if (numVars === 3) {
    defaultMinterms = [0, 1, 2, 5, 6, 7];
  } else if (numVars === 4) {
    defaultMinterms = [0, 1, 2, 5, 6, 7, 8, 9, 10, 14];
  } else {
    defaultMinterms = [0, 1, 2, 4, 5, 6, 8, 9, 10, 12, 13, 14];
  }

  // Create initial terms
  let initialTerms = [];
  for (let val of defaultMinterms) {
    let binary = val.toString(2).padStart(numVars, '0');
    let ones = (binary.match(/1/g) || []).length;
    initialTerms.push({
      pattern: binary,
      minterms: [val],
      ones: ones,
      combined: false,
      isPI: false
    });
  }

  // Group by number of ones
  let grouped = {};
  for (let term of initialTerms) {
    if (!grouped[term.ones]) {
      grouped[term.ones] = [];
    }
    grouped[term.ones].push(term);
  }

  columns.push({
    level: 0,
    groups: grouped,
    title: 'Original Minterms'
  });

  // Pre-calculate all combinations
  calculateAllCombinations();
}

function calculateAllCombinations() {
  comparisonHistory = [];
  let colIndex = 0;

  while (true) {
    let currentColumn = columns[colIndex];
    let newGroups = {};
    let anyNewCombination = false;

    let groupKeys = Object.keys(currentColumn.groups).map(Number).sort((a, b) => a - b);

    // Compare adjacent groups
    for (let i = 0; i < groupKeys.length - 1; i++) {
      let group1 = currentColumn.groups[groupKeys[i]];
      let group2 = currentColumn.groups[groupKeys[i + 1]];

      for (let term1 of group1) {
        for (let term2 of group2) {
          let canCombine = checkCanCombine(term1.pattern, term2.pattern);

          comparisonHistory.push({
            term1: term1,
            term2: term2,
            canCombine: canCombine.result,
            diffPos: canCombine.diffPos,
            resultPattern: canCombine.result ? canCombine.newPattern : null,
            column: colIndex
          });

          if (canCombine.result) {
            anyNewCombination = true;
            term1.combined = true;
            term2.combined = true;

            let newTerm = {
              pattern: canCombine.newPattern,
              minterms: [...term1.minterms, ...term2.minterms].sort((a, b) => a - b),
              ones: (canCombine.newPattern.match(/1/g) || []).length,
              combined: false,
              isPI: false
            };

            // Check for duplicate patterns
            let newOnes = newTerm.ones;
            if (!newGroups[newOnes]) {
              newGroups[newOnes] = [];
            }

            let exists = newGroups[newOnes].some(t => t.pattern === newTerm.pattern);
            if (!exists) {
              newGroups[newOnes].push(newTerm);
            }
          }
        }
      }
    }

    // Mark uncombined terms as prime implicants
    for (let key of Object.keys(currentColumn.groups)) {
      for (let term of currentColumn.groups[key]) {
        if (!term.combined) {
          term.isPI = true;
          primeImplicants.push(term);
        }
      }
    }

    if (!anyNewCombination || Object.keys(newGroups).length === 0) {
      break;
    }

    columns.push({
      level: colIndex + 1,
      groups: newGroups,
      title: 'Combination ' + (colIndex + 1)
    });

    colIndex++;
  }

  totalSteps = comparisonHistory.length;
}

function checkCanCombine(pattern1, pattern2) {
  let diffCount = 0;
  let diffPos = -1;
  let newPattern = '';

  for (let i = 0; i < pattern1.length; i++) {
    if (pattern1[i] !== pattern2[i]) {
      if (pattern1[i] === '-' || pattern2[i] === '-') {
        return { result: false };
      }
      diffCount++;
      diffPos = i;
      newPattern += '-';
    } else {
      newPattern += pattern1[i];
    }
  }

  return {
    result: diffCount === 1,
    diffPos: diffPos,
    newPattern: newPattern
  };
}

function nextStep() {
  if (currentStep < totalSteps) {
    currentComparison = comparisonHistory[currentStep];
    currentStep++;
  }
}

function runAll() {
  currentStep = totalSteps;
  currentComparison = null;
}

function resetSimulation() {
  initializeSimulation();
}

function updateNumVars() {
  resetSimulation();
}

function drawColumns() {
  let colWidth = Math.min(180, (canvasWidth - 40) / Math.min(columns.length, 3));
  let startX = 15;
  let headerY = 40;

  // Determine visible columns (show up to current step's column + 1)
  let maxVisibleCol = 0;
  for (let i = 0; i < currentStep; i++) {
    maxVisibleCol = Math.max(maxVisibleCol, comparisonHistory[i].column + 1);
  }
  maxVisibleCol = Math.min(maxVisibleCol + 1, columns.length);

  for (let c = 0; c < maxVisibleCol; c++) {
    let col = columns[c];
    let x = startX + c * (colWidth + 10);

    // Column header
    fill('#2196F3');
    noStroke();
    rect(x, headerY, colWidth, 25, 5, 5, 0, 0);

    fill('white');
    textAlign(CENTER, CENTER);
    textSize(12);
    text(col.title, x + colWidth / 2, headerY + 12);

    // Draw terms
    let y = headerY + 30;
    let groupKeys = Object.keys(col.groups).map(Number).sort((a, b) => a - b);

    for (let gk of groupKeys) {
      let group = col.groups[gk];

      // Group divider
      fill('#e0e0e0');
      noStroke();
      rect(x, y, colWidth, 2);
      y += 5;

      for (let term of group) {
        // Determine if this term should be shown
        let showTerm = (c === 0) || isTermVisible(term, c);

        if (showTerm) {
          // Background based on status
          if (term.isPI && currentStep >= totalSteps) {
            fill('#FFD700'); // Gold for prime implicants
          } else if (term.combined) {
            fill('#90EE90'); // Light green for combined
          } else {
            fill('white');
          }

          stroke('#ddd');
          strokeWeight(1);
          rect(x + 2, y, colWidth - 4, 22, 3);

          // Pattern text
          fill('black');
          noStroke();
          textAlign(CENTER, CENTER);
          textSize(11);

          // Format pattern with colored dashes
          let patternX = x + colWidth / 2;
          text(term.pattern, patternX, y + 11);

          // Check mark if combined
          if (term.combined) {
            fill('green');
            textSize(10);
            textAlign(RIGHT, CENTER);
            text('✓', x + colWidth - 5, y + 11);
          }

          y += 25;
        }
      }
    }
  }
}

function isTermVisible(term, column) {
  // A term is visible if it was created by a comparison we've already seen
  for (let i = 0; i < currentStep; i++) {
    let comp = comparisonHistory[i];
    if (comp.canCombine && comp.column === column - 1) {
      if (comp.resultPattern === term.pattern) {
        return true;
      }
    }
  }
  return false;
}

function drawComparisonHighlight() {
  if (!currentComparison) return;

  let infoY = drawHeight - 90;

  // Info box
  fill(255, 255, 255, 240);
  stroke('#2196F3');
  strokeWeight(2);
  rect(margin, infoY, canvasWidth - 2 * margin, 80, 5);

  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);

  let t1 = currentComparison.term1;
  let t2 = currentComparison.term2;

  text('Comparing:', margin + 10, infoY + 10);
  text(t1.pattern + ' (m' + t1.minterms.join(',') + ')', margin + 80, infoY + 10);
  text(t2.pattern + ' (m' + t2.minterms.join(',') + ')', margin + 80, infoY + 28);

  if (currentComparison.canCombine) {
    fill('green');
    text('✓ Can combine! Differ in position ' + currentComparison.diffPos, margin + 10, infoY + 48);
    fill('#0066cc');
    text('Result: ' + currentComparison.resultPattern, margin + 10, infoY + 63);
  } else {
    fill('red');
    text('✗ Cannot combine (differ in more than 1 position or dash mismatch)', margin + 10, infoY + 48);
  }
}

function drawPrimeImplicantsSummary() {
  if (currentStep < totalSteps) return;

  let boxY = drawHeight - 90;
  let boxHeight = 80;

  fill(255, 255, 240);
  stroke('#FFD700');
  strokeWeight(2);
  rect(margin, boxY, canvasWidth - 2 * margin, boxHeight, 5);

  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(13);
  text('Prime Implicants (unchecked terms):', margin + 10, boxY + 8);

  textSize(11);
  let x = margin + 10;
  let y = boxY + 28;

  for (let pi of primeImplicants) {
    let piText = pi.pattern + ' (m' + pi.minterms.join(',') + ')';
    let tw = textWidth(piText) + 15;

    if (x + tw > canvasWidth - margin) {
      x = margin + 10;
      y += 20;
    }

    fill('#FFD700');
    noStroke();
    rect(x, y, tw, 18, 3);

    fill('black');
    textAlign(LEFT, CENTER);
    text(piText, x + 5, y + 9);

    x += tw + 5;
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  positionUIElements();
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
