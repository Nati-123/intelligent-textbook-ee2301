// SOP-POS Converter MicroSim
// Convert between Sum of Products and Product of Sums forms
// Bloom Level: Apply (L3) - Apply conversion techniques
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 450;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let exampleSelect;
let currentExample = 0;

let examples = [
  {
    name: 'Example 1: F(A,B,C)',
    minterms: [1, 2, 5, 6],
    numVars: 3,
    vars: ['A', 'B', 'C']
  },
  {
    name: 'Example 2: F(A,B,C)',
    minterms: [0, 2, 4, 6],
    numVars: 3,
    vars: ['A', 'B', 'C']
  },
  {
    name: 'Example 3: F(A,B)',
    minterms: [1, 3],
    numVars: 2,
    vars: ['A', 'B']
  },
  {
    name: 'Example 4: F(A,B,C,D)',
    minterms: [0, 1, 4, 5, 6, 7],
    numVars: 4,
    vars: ['A', 'B', 'C', 'D']
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  exampleSelect = createSelect();
  exampleSelect.position(100, drawHeight + 18);
  exampleSelect.size(250);
  for (let i = 0; i < examples.length; i++) {
    exampleSelect.option(examples[i].name, i);
  }
  exampleSelect.changed(() => { currentExample = parseInt(exampleSelect.value()); });

  describe('SOP to POS converter showing canonical form transformations', LABEL);
}

function draw() {
  updateCanvasSize();

  // Drawing area
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
  text('SOP ↔ POS Converter', canvasWidth / 2, 10);

  let example = examples[currentExample];

  // Draw function specification
  drawSpecification(example);

  // Draw SOP form
  drawSOPForm(example);

  // Draw conversion
  drawConversion(example);

  // Draw POS form
  drawPOSForm(example);

  // Control label
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(11);
  text('Function:', 25, drawHeight + 30);
}

function drawSpecification(example) {
  let y = 40;

  fill('#e3f2fd');
  stroke('#2196f3');
  strokeWeight(2);
  rect(25, y, canvasWidth - 50, 40, 5);

  fill('#2196f3');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  text('F(' + example.vars.join(',') + ') = Σm(' + example.minterms.join(', ') + ')', canvasWidth / 2, y + 20);
}

function drawSOPForm(example) {
  let y = 95;

  fill('#e8f5e9');
  stroke('#4CAF50');
  strokeWeight(2);
  rect(25, y, canvasWidth - 50, 80, 8);

  fill('#4CAF50');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(12);
  text('Sum of Products (SOP)', canvasWidth / 2, y + 8);

  // Build SOP expression
  let sopTerms = [];
  for (let m of example.minterms) {
    sopTerms.push(getMintermExpr(m, example.numVars, example.vars));
  }

  fill('black');
  textSize(11);
  text('F = ' + sopTerms.slice(0, 3).join(' + '), canvasWidth / 2, y + 30);
  if (sopTerms.length > 3) {
    text('    + ' + sopTerms.slice(3).join(' + '), canvasWidth / 2, y + 48);
  }

  fill('#666');
  textSize(9);
  text('OR of minterms (AND terms)', canvasWidth / 2, y + 65);
}

function drawConversion(example) {
  let y = 190;

  // Arrow and explanation
  fill('#ff9800');
  noStroke();
  triangle(canvasWidth / 2, y + 30, canvasWidth / 2 - 15, y + 10, canvasWidth / 2 + 15, y + 10);

  fill('#fff3e0');
  stroke('#ff9800');
  strokeWeight(2);
  rect(25, y + 40, canvasWidth - 50, 70, 8);

  fill('#ff9800');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(11);
  text('Conversion Method', canvasWidth / 2, y + 48);

  // Calculate maxterms
  let allTerms = [];
  for (let i = 0; i < Math.pow(2, example.numVars); i++) {
    allTerms.push(i);
  }
  let maxterms = allTerms.filter(t => !example.minterms.includes(t));

  fill('#333');
  textSize(10);
  text('All terms: {' + allTerms.join(', ') + '}', canvasWidth / 2, y + 68);
  text('Minterms (F=1): {' + example.minterms.join(', ') + '}', canvasWidth / 2, y + 83);
  text('Maxterms (F=0): {' + maxterms.join(', ') + '}', canvasWidth / 2, y + 98);
}

function drawPOSForm(example) {
  let y = 320;

  // Calculate maxterms
  let allTerms = [];
  for (let i = 0; i < Math.pow(2, example.numVars); i++) {
    allTerms.push(i);
  }
  let maxterms = allTerms.filter(t => !example.minterms.includes(t));

  fill('#ffebee');
  stroke('#f44336');
  strokeWeight(2);
  rect(25, y, canvasWidth - 50, 80, 8);

  fill('#f44336');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(12);
  text('Product of Sums (POS)', canvasWidth / 2, y + 8);

  // Build POS expression
  let posTerms = [];
  for (let M of maxterms) {
    posTerms.push('(' + getMaxtermExpr(M, example.numVars, example.vars) + ')');
  }

  fill('black');
  textSize(11);

  if (posTerms.length === 0) {
    text('F = 1 (no maxterms - always true)', canvasWidth / 2, y + 35);
  } else {
    let posStr = posTerms.join(' · ');
    if (posStr.length > 35) {
      text('F = ' + posTerms.slice(0, 2).join(' · '), canvasWidth / 2, y + 30);
      text('    · ' + posTerms.slice(2).join(' · '), canvasWidth / 2, y + 48);
    } else {
      text('F = ' + posStr, canvasWidth / 2, y + 35);
    }
  }

  // Maxterm notation
  fill('#666');
  textSize(10);
  if (maxterms.length > 0) {
    text('F = ΠM(' + maxterms.join(', ') + ')', canvasWidth / 2, y + 65);
  }

  // Equivalence note
  fill('#333');
  textSize(9);
  text('AND of maxterms (OR terms)', canvasWidth / 2, y + 78);
}

function getMintermExpr(m, numVars, vars) {
  let binary = m.toString(2).padStart(numVars, '0');
  let expr = '';
  for (let i = 0; i < numVars; i++) {
    expr += binary[i] === '0' ? vars[i] + "'" : vars[i];
  }
  return expr;
}

function getMaxtermExpr(M, numVars, vars) {
  let binary = M.toString(2).padStart(numVars, '0');
  let terms = [];
  for (let i = 0; i < numVars; i++) {
    terms.push(binary[i] === '1' ? vars[i] + "'" : vars[i]);
  }
  return terms.join(' + ');
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
