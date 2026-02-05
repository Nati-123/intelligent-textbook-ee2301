// Prime Implicant Chart Interactive MicroSim
// Analyze PI charts to find essential PIs and minimum cover
// Bloom Level: Analyze (L4) - Examine, differentiate
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
let defaultTextSize = 14;

// UI Elements
let findEPIButton;
let checkSolutionButton;
let resetButton;
let exampleSelect;

// Data structures
let primeImplicants = [];
let minterms = [];
let chart = []; // 2D array: chart[pi][minterm] = true/false
let selectedPIs = new Set();
let essentialPIs = new Set();
let coveredMinterms = new Set();
let highlightedCol = -1;
let message = '';
let messageColor = 'black';

// Example data
let examples = {
  'Example 1': {
    pis: [
      { id: 'PI1', pattern: '0-01', minterms: [1, 5], expr: "A'C'D" },
      { id: 'PI2', pattern: '-001', minterms: [1, 9], expr: "B'C'D" },
      { id: 'PI3', pattern: '01-1', minterms: [5, 7], expr: "A'BD" },
      { id: 'PI4', pattern: '011-', minterms: [6, 7], expr: "A'BC" },
      { id: 'PI5', pattern: '-00-', minterms: [0, 1, 8, 9], expr: "B'C'" },
      { id: 'PI6', pattern: '-0-0', minterms: [0, 2, 8, 10], expr: "B'D'" },
      { id: 'PI7', pattern: '--10', minterms: [2, 6, 10, 14], expr: "CD'" }
    ],
    minterms: [0, 1, 2, 5, 6, 7, 8, 9, 10, 14]
  },
  'Cyclic': {
    pis: [
      { id: 'PI1', pattern: '0-0', minterms: [0, 2], expr: "A'C'" },
      { id: 'PI2', pattern: '-00', minterms: [0, 4], expr: "B'C'" },
      { id: 'PI3', pattern: '01-', minterms: [2, 3], expr: "A'B" },
      { id: 'PI4', pattern: '1-0', minterms: [4, 6], expr: "AC'" },
      { id: 'PI5', pattern: '-11', minterms: [3, 7], expr: "BC" },
      { id: 'PI6', pattern: '11-', minterms: [6, 7], expr: "AB" }
    ],
    minterms: [0, 2, 3, 4, 6, 7]
  }
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  textSize(defaultTextSize);

  // Create buttons
  findEPIButton = createButton('Find Essential PIs');
  findEPIButton.position(10, drawHeight + 10);
  findEPIButton.mousePressed(findEssentialPIs);

  checkSolutionButton = createButton('Check Solution');
  checkSolutionButton.position(140, drawHeight + 10);
  checkSolutionButton.mousePressed(checkSolution);

  resetButton = createButton('Reset');
  resetButton.position(255, drawHeight + 10);
  resetButton.mousePressed(resetSimulation);

  // Example selector
  exampleSelect = createSelect();
  exampleSelect.position(10, drawHeight + 45);
  exampleSelect.option('Example 1');
  exampleSelect.option('Cyclic');
  exampleSelect.changed(loadExample);

  // Initialize with first example
  loadExample();

  describe('Interactive prime implicant chart for selecting essential PIs and finding minimum cover', LABEL);
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
  text('Prime Implicant Chart', canvasWidth / 2, 10);

  // Draw the chart
  drawChart();

  // Draw status
  drawStatus();

  // Draw message
  if (message) {
    fill(messageColor);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(12);
    text(message, 120, drawHeight + 55);
  }

  // Control label
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Example:', 320, drawHeight + 20);
}

function loadExample() {
  let exampleName = exampleSelect.value();
  let example = examples[exampleName];

  primeImplicants = example.pis.map((pi, idx) => ({
    ...pi,
    index: idx
  }));

  minterms = [...example.minterms];

  // Build coverage chart
  chart = [];
  for (let pi of primeImplicants) {
    let row = [];
    for (let mt of minterms) {
      row.push(pi.minterms.includes(mt));
    }
    chart.push(row);
  }

  selectedPIs = new Set();
  essentialPIs = new Set();
  coveredMinterms = new Set();
  highlightedCol = -1;
  message = '';
}

function drawChart() {
  let startX = 80;
  let startY = 50;
  let cellWidth = Math.min(40, (canvasWidth - startX - 40) / minterms.length);
  let cellHeight = 30;

  // Draw column headers (minterms)
  fill('black');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);

  for (let j = 0; j < minterms.length; j++) {
    let x = startX + j * cellWidth + cellWidth / 2;

    // Highlight if single coverage (essential)
    if (highlightedCol === j) {
      fill('#FFD700');
      noStroke();
      rect(startX + j * cellWidth, startY - 25, cellWidth, 25);
    }

    // Covered minterm background
    if (coveredMinterms.has(minterms[j])) {
      fill('#90EE90');
      noStroke();
      rect(startX + j * cellWidth, startY - 25, cellWidth, 25);
    }

    fill('black');
    text('m' + minterms[j], x, startY - 12);
  }

  // Draw rows (prime implicants)
  for (let i = 0; i < primeImplicants.length; i++) {
    let pi = primeImplicants[i];
    let y = startY + i * cellHeight;

    // Row header background
    if (selectedPIs.has(i)) {
      fill('#2196F3');
    } else if (essentialPIs.has(i)) {
      fill('#4CAF50');
    } else {
      fill('#f5f5f5');
    }
    stroke('#ddd');
    strokeWeight(1);
    rect(5, y, startX - 10, cellHeight);

    // Row header text
    fill(selectedPIs.has(i) || essentialPIs.has(i) ? 'white' : 'black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(10);
    text(pi.id + ': ' + pi.pattern, 10, y + cellHeight / 2);

    // Draw cells
    for (let j = 0; j < minterms.length; j++) {
      let x = startX + j * cellWidth;

      // Cell background
      if (coveredMinterms.has(minterms[j]) && chart[i][j]) {
        fill('#e0e0e0');
      } else if (selectedPIs.has(i) && chart[i][j]) {
        fill('#BBDEFB');
      } else if (essentialPIs.has(i) && chart[i][j]) {
        fill('#C8E6C9');
      } else {
        fill('white');
      }
      stroke('#ddd');
      strokeWeight(1);
      rect(x, y, cellWidth, cellHeight);

      // Coverage mark
      if (chart[i][j]) {
        fill('black');
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(16);
        text('×', x + cellWidth / 2, y + cellHeight / 2);
      }
    }
  }

  // Draw click instruction
  fill('#666');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(11);
  let instructY = startY + primeImplicants.length * cellHeight + 10;
  text('Click row headers to select/deselect PIs', 10, instructY);
}

function drawStatus() {
  let statusY = drawHeight - 100;

  fill(255, 255, 255, 230);
  stroke('#2196F3');
  strokeWeight(1);
  rect(margin, statusY, canvasWidth - 2 * margin, 90, 5);

  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);

  // Selected PIs
  let selectedText = 'Selected: ';
  if (selectedPIs.size > 0 || essentialPIs.size > 0) {
    let allSelected = [...essentialPIs, ...selectedPIs];
    selectedText += allSelected.map(i => primeImplicants[i].id).join(', ');
  } else {
    selectedText += '(none)';
  }
  text(selectedText, margin + 10, statusY + 10);

  // Covered minterms
  let coveredText = 'Covered: ';
  if (coveredMinterms.size > 0) {
    coveredText += [...coveredMinterms].sort((a, b) => a - b).map(m => 'm' + m).join(', ');
  } else {
    coveredText += '(none)';
  }
  text(coveredText, margin + 10, statusY + 30);

  // Uncovered minterms
  let uncovered = minterms.filter(m => !coveredMinterms.has(m));
  let uncoveredText = 'Uncovered: ';
  if (uncovered.length > 0) {
    fill('red');
    uncoveredText += uncovered.map(m => 'm' + m).join(', ');
  } else {
    fill('green');
    uncoveredText += '(all covered!)';
  }
  text(uncoveredText, margin + 10, statusY + 50);

  // Boolean expression
  fill('black');
  let exprText = 'Expression: ';
  let allSelected = [...essentialPIs, ...selectedPIs];
  if (allSelected.length > 0) {
    exprText += allSelected.map(i => primeImplicants[i].expr).join(' + ');
  } else {
    exprText += '(select PIs)';
  }
  textSize(11);
  text(exprText, margin + 10, statusY + 70);
}

function findEssentialPIs() {
  essentialPIs = new Set();
  highlightedCol = -1;

  // For each minterm, count how many PIs cover it
  for (let j = 0; j < minterms.length; j++) {
    let coveringPIs = [];
    for (let i = 0; i < primeImplicants.length; i++) {
      if (chart[i][j]) {
        coveringPIs.push(i);
      }
    }

    // If only one PI covers this minterm, it's essential
    if (coveringPIs.length === 1) {
      essentialPIs.add(coveringPIs[0]);
    }
  }

  // Update covered minterms
  updateCoveredMinterms();

  if (essentialPIs.size > 0) {
    message = 'Found ' + essentialPIs.size + ' essential PI(s)';
    messageColor = 'green';
  } else {
    message = 'No essential PIs found (cyclic chart)';
    messageColor = 'orange';
  }
}

function updateCoveredMinterms() {
  coveredMinterms = new Set();

  let allSelected = [...essentialPIs, ...selectedPIs];
  for (let piIdx of allSelected) {
    for (let j = 0; j < minterms.length; j++) {
      if (chart[piIdx][j]) {
        coveredMinterms.add(minterms[j]);
      }
    }
  }
}

function checkSolution() {
  let uncovered = minterms.filter(m => !coveredMinterms.has(m));

  if (uncovered.length === 0) {
    let total = essentialPIs.size + selectedPIs.size;
    message = 'Valid solution with ' + total + ' PI(s)!';
    messageColor = 'green';
  } else {
    message = 'Incomplete: ' + uncovered.length + ' minterm(s) uncovered';
    messageColor = 'red';
  }
}

function resetSimulation() {
  loadExample();
}

function mousePressed() {
  // Check if clicked on a PI row header
  let startX = 80;
  let startY = 50;
  let cellHeight = 30;

  if (mouseX >= 5 && mouseX <= startX - 5) {
    for (let i = 0; i < primeImplicants.length; i++) {
      let y = startY + i * cellHeight;
      if (mouseY >= y && mouseY <= y + cellHeight) {
        // Toggle selection (but not if it's essential)
        if (!essentialPIs.has(i)) {
          if (selectedPIs.has(i)) {
            selectedPIs.delete(i);
          } else {
            selectedPIs.add(i);
          }
          updateCoveredMinterms();
          message = '';
        }
        break;
      }
    }
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
