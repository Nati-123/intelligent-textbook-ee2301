// Minterm/Maxterm Converter MicroSim
// Convert between SOP and POS canonical forms
// Bloom Level: Apply (L3) - Calculate, convert, derive
// MicroSim template version 2026.02

// Canvas dimensions
let containerWidth;
let canvasWidth = 400;
let drawHeight = 420;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

// Margins
let margin = 20;
let defaultTextSize = 14;

// UI Elements
let mintermInput;
let numVarsSelect;
let generateButton;

// Data
let numVars = 3;
let minterms = [];
let maxterms = [];
let errorMessage = '';
let varNames = ['A', 'B', 'C', 'D'];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  textSize(defaultTextSize);

  // Create minterm input
  mintermInput = createInput('1,3,5,7');
  mintermInput.size(150);
  mintermInput.attribute('placeholder', 'e.g., 1,3,5,7');

  // Create variable count selector
  numVarsSelect = createSelect();
  numVarsSelect.option('2 variables', 2);
  numVarsSelect.option('3 variables', 3);
  numVarsSelect.option('4 variables', 4);
  numVarsSelect.selected('3 variables');
  numVarsSelect.changed(handleVarsChange);

  // Create generate button
  generateButton = createButton('Generate');
  generateButton.mousePressed(handleGenerate);

  positionUIElements();

  handleGenerate();

  describe('Interactive converter between minterm and maxterm canonical forms for Boolean functions', LABEL);
}

function positionUIElements() {
  let mainRect = document.querySelector('main').getBoundingClientRect();
  mintermInput.position(mainRect.left + 130, mainRect.top + drawHeight + 15);
  numVarsSelect.position(mainRect.left + 130, mainRect.top + drawHeight + 50);
  generateButton.position(mainRect.left + 300, mainRect.top + drawHeight + 15);
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
  text('Minterm/Maxterm Converter', canvasWidth / 2, 10);

  if (errorMessage) {
    drawError();
  } else {
    drawResults();
    drawTruthTable();
  }

  // Control labels
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Minterm indices:', 20, drawHeight + 25);
  text('Variables:', 20, drawHeight + 60);
}

function drawError() {
  fill('#ffebee');
  stroke('#f44336');
  strokeWeight(2);
  rect(margin, 50, canvasWidth - 2 * margin, 60, 5);

  fill('#c62828');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);
  text(errorMessage, canvasWidth / 2, 80);
}

function drawResults() {
  let y = 45;

  // Sigma notation (SOP)
  fill('#e3f2fd');
  stroke('#2196f3');
  strokeWeight(2);
  rect(margin, y, canvasWidth - 2 * margin, 55, 5);

  fill('#1565c0');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);
  text('Sum of Minterms (Canonical SOP):', margin + 10, y + 8);

  fill('black');
  textSize(14);
  let sigmaNotation = `F(${varNames.slice(0, numVars).join(',')}) = Σm(${minterms.join(',')})`;
  text(sigmaNotation, margin + 10, y + 28);

  // Expanded SOP
  textSize(11);
  fill('#333');
  let sopExpanded = getSopExpression();
  text('= ' + sopExpanded, margin + 10, y + 44);

  y += 65;

  // Pi notation (POS)
  fill('#fff3e0');
  stroke('#ff9800');
  strokeWeight(2);
  rect(margin, y, canvasWidth - 2 * margin, 55, 5);

  fill('#e65100');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);
  text('Product of Maxterms (Canonical POS):', margin + 10, y + 8);

  fill('black');
  textSize(14);
  let piNotation = `F(${varNames.slice(0, numVars).join(',')}) = ΠM(${maxterms.join(',')})`;
  text(piNotation, margin + 10, y + 28);

  // Expanded POS
  textSize(11);
  fill('#333');
  let posExpanded = getPosExpression();
  text('= ' + posExpanded, margin + 10, y + 44);

  // Conversion explanation
  y += 65;
  fill(240);
  stroke('silver');
  strokeWeight(1);
  rect(margin, y, canvasWidth - 2 * margin, 50, 5);

  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(11);
  text('Conversion:', margin + 10, y + 8);

  let totalIndices = Math.pow(2, numVars);
  let allIndices = [];
  for (let i = 0; i < totalIndices; i++) allIndices.push(i);
  text(`Maxterm indices = All indices - Minterm indices`, margin + 10, y + 22);
  text(`{${allIndices.join(',')}} - {${minterms.join(',')}} = {${maxterms.join(',')}}`, margin + 10, y + 36);
}

function drawTruthTable() {
  let startX = margin;
  let startY = 235;
  let colWidth = 35;
  let rowHeight = 20;

  let totalRows = Math.pow(2, numVars);
  let tableWidth = colWidth * (numVars + 3); // vars + F + minterm + maxterm

  // Adjust column width if needed
  if (tableWidth > canvasWidth - 2 * margin) {
    colWidth = (canvasWidth - 2 * margin) / (numVars + 3);
  }

  // Header
  fill('#2196f3');
  noStroke();
  rect(startX, startY, colWidth * (numVars + 3), rowHeight);

  fill('white');
  textAlign(CENTER, CENTER);
  textSize(10);
  for (let i = 0; i < numVars; i++) {
    text(varNames[i], startX + colWidth * i + colWidth / 2, startY + rowHeight / 2);
  }
  text('F', startX + colWidth * numVars + colWidth / 2, startY + rowHeight / 2);
  text('m', startX + colWidth * (numVars + 1) + colWidth / 2, startY + rowHeight / 2);
  text('M', startX + colWidth * (numVars + 2) + colWidth / 2, startY + rowHeight / 2);

  // Rows
  for (let r = 0; r < totalRows; r++) {
    let y = startY + rowHeight * (r + 1);

    // Check if minterm
    let isMinterm = minterms.includes(r);

    // Background
    if (isMinterm) {
      fill('#e8f5e9');
    } else {
      fill('#ffebee');
    }
    stroke('#ddd');
    strokeWeight(1);
    rect(startX, y, colWidth * (numVars + 3), rowHeight);

    // Values
    fill('black');
    noStroke();
    textSize(10);

    // Variable values
    for (let i = 0; i < numVars; i++) {
      let bit = (r >> (numVars - 1 - i)) & 1;
      text(bit, startX + colWidth * i + colWidth / 2, y + rowHeight / 2);
    }

    // F value
    fill(isMinterm ? '#4CAF50' : '#f44336');
    text(isMinterm ? '1' : '0', startX + colWidth * numVars + colWidth / 2, y + rowHeight / 2);

    // Minterm
    fill(isMinterm ? '#4CAF50' : '#ccc');
    textSize(9);
    text(isMinterm ? 'm' + r : '-', startX + colWidth * (numVars + 1) + colWidth / 2, y + rowHeight / 2);

    // Maxterm
    fill(!isMinterm ? '#ff9800' : '#ccc');
    text(!isMinterm ? 'M' + r : '-', startX + colWidth * (numVars + 2) + colWidth / 2, y + rowHeight / 2);
  }
}

function getSopExpression() {
  if (minterms.length === 0) return '0';
  if (minterms.length === Math.pow(2, numVars)) return '1';

  let terms = minterms.map(m => {
    let term = '';
    for (let i = 0; i < numVars; i++) {
      let bit = (m >> (numVars - 1 - i)) & 1;
      if (bit === 0) {
        term += varNames[i] + "'";
      } else {
        term += varNames[i];
      }
    }
    return term;
  });

  return terms.join(' + ');
}

function getPosExpression() {
  if (maxterms.length === 0) return '1';
  if (maxterms.length === Math.pow(2, numVars)) return '0';

  let terms = maxterms.map(m => {
    let term = '(';
    let literals = [];
    for (let i = 0; i < numVars; i++) {
      let bit = (m >> (numVars - 1 - i)) & 1;
      if (bit === 1) {
        literals.push(varNames[i] + "'");
      } else {
        literals.push(varNames[i]);
      }
    }
    term += literals.join('+') + ')';
    return term;
  });

  return terms.join('');
}

function handleVarsChange() {
  numVars = parseInt(numVarsSelect.value());
  handleGenerate();
}

function handleGenerate() {
  errorMessage = '';
  minterms = [];
  maxterms = [];

  let input = mintermInput.value().trim();

  if (!input) {
    errorMessage = 'Please enter minterm indices';
    return;
  }

  let totalIndices = Math.pow(2, numVars);

  // Parse minterms
  let parts = input.split(',');
  let parsedMinterms = new Set();

  for (let p of parts) {
    let val = parseInt(p.trim());
    if (isNaN(val)) {
      errorMessage = `Invalid input: "${p.trim()}"`;
      return;
    }
    if (val < 0 || val >= totalIndices) {
      errorMessage = `Index ${val} out of range (0-${totalIndices - 1})`;
      return;
    }
    parsedMinterms.add(val);
  }

  minterms = Array.from(parsedMinterms).sort((a, b) => a - b);

  // Calculate maxterms (complement)
  for (let i = 0; i < totalIndices; i++) {
    if (!minterms.includes(i)) {
      maxterms.push(i);
    }
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
