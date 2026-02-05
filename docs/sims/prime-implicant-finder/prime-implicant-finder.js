// Prime Implicant Finder MicroSim
// Find prime implicants and essential prime implicants
// Bloom Level: Analyze (L4) - Analyze coverage and essentiality
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
    name: 'F = Σm(0,1,2,5,6,7)',
    minterms: [0, 1, 2, 5, 6, 7],
    numVars: 3,
    primeImplicants: [
      { terms: [0, 1], expr: "A'B'", minterms: [0, 1] },
      { terms: [0, 2], expr: "A'C'", minterms: [0, 2] },
      { terms: [5, 7], expr: "AC", minterms: [5, 7] },
      { terms: [6, 7], expr: "AB", minterms: [6, 7] },
      { terms: [1, 5], expr: "B'C", minterms: [1, 5] },
      { terms: [2, 6], expr: "BC'", minterms: [2, 6] }
    ],
    essentialPIs: [0, 3], // Indices of essential PIs
    minimalCover: [0, 2, 3] // One minimal cover
  },
  {
    name: 'F = Σm(1,3,5,7)',
    minterms: [1, 3, 5, 7],
    numVars: 3,
    primeImplicants: [
      { terms: [1, 3, 5, 7], expr: "C", minterms: [1, 3, 5, 7] }
    ],
    essentialPIs: [0],
    minimalCover: [0]
  },
  {
    name: 'F = Σm(0,2,4,5,6)',
    minterms: [0, 2, 4, 5, 6],
    numVars: 3,
    primeImplicants: [
      { terms: [0, 2], expr: "A'C'", minterms: [0, 2] },
      { terms: [0, 4], expr: "B'C'", minterms: [0, 4] },
      { terms: [4, 5], expr: "AB'", minterms: [4, 5] },
      { terms: [4, 6], expr: "AC'", minterms: [4, 6] },
      { terms: [2, 6], expr: "BC'", minterms: [2, 6] }
    ],
    essentialPIs: [2], // AB' is essential for m5
    minimalCover: [0, 2, 3]
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  exampleSelect = createSelect();
  exampleSelect.size(250);
  for (let i = 0; i < examples.length; i++) {
    exampleSelect.option(examples[i].name, i);
  }
  exampleSelect.changed(() => { currentExample = parseInt(exampleSelect.value()); });

  positionUIElements();

  describe('Prime implicant finder showing essential prime implicants and minimal cover', LABEL);
}

function positionUIElements() {
  let mainRect = document.querySelector('main').getBoundingClientRect();
  exampleSelect.position(mainRect.left + 100, mainRect.top + drawHeight + 18);
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
  text('Prime Implicant Finder', canvasWidth / 2, 10);

  let example = examples[currentExample];

  // Draw function
  drawFunction(example);

  // Draw PI table
  drawPITable(example);

  // Draw coverage chart
  drawCoverageChart(example);

  // Draw result
  drawResult(example);

  // Control label
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(11);
  text('Function:', 25, drawHeight + 30);
}

function drawFunction(example) {
  let y = 40;

  fill('#e3f2fd');
  stroke('#2196f3');
  strokeWeight(2);
  rect(25, y, canvasWidth - 50, 35, 5);

  fill('#2196f3');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(13);
  text(example.name, canvasWidth / 2, y + 17);
}

function drawPITable(example) {
  let y = 90;

  fill('#f5f5f5');
  stroke('#ccc');
  strokeWeight(1);
  rect(25, y, canvasWidth - 50, 120, 5);

  fill('#333');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(11);
  text('Prime Implicants:', 35, y + 8);

  // List PIs
  let piY = y + 28;
  for (let i = 0; i < example.primeImplicants.length; i++) {
    let pi = example.primeImplicants[i];
    let isEssential = example.essentialPIs.includes(i);
    let isInCover = example.minimalCover.includes(i);

    // Indicator
    if (isEssential) {
      fill('#f44336');
      textSize(10);
      text('★', 40, piY);
    }

    // PI expression
    fill(isInCover ? '#4CAF50' : '#666');
    textSize(10);
    text('PI' + (i + 1) + ': ' + pi.expr, 55, piY);

    // Covered minterms
    fill('#999');
    textSize(9);
    text('covers m' + pi.minterms.join(', m'), 130, piY);

    piY += 16;
    if (piY > y + 110) break;
  }

  // Legend
  fill('#f44336');
  textSize(9);
  textAlign(RIGHT, TOP);
  text('★ = Essential PI', canvasWidth - 35, y + 100);
}

function drawCoverageChart(example) {
  let y = 220;

  fill('#fff3e0');
  stroke('#ff9800');
  strokeWeight(2);
  rect(25, y, canvasWidth - 50, 90, 8);

  fill('#ff9800');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(11);
  text('Coverage Chart:', 35, y + 8);

  // Column headers (minterms)
  let startX = 80;
  let colW = 25;
  let rowH = 16;

  textSize(9);
  fill('#666');
  for (let i = 0; i < example.minterms.length; i++) {
    textAlign(CENTER, TOP);
    text('m' + example.minterms[i], startX + i * colW, y + 25);
  }

  // PI rows
  let rowY = y + 42;
  for (let i = 0; i < min(3, example.primeImplicants.length); i++) {
    let pi = example.primeImplicants[i];

    // PI label
    textAlign(RIGHT, CENTER);
    fill(example.essentialPIs.includes(i) ? '#f44336' : '#333');
    text(pi.expr, startX - 10, rowY + rowH / 2);

    // Coverage marks
    for (let j = 0; j < example.minterms.length; j++) {
      let m = example.minterms[j];
      let x = startX + j * colW;

      if (pi.minterms.includes(m)) {
        fill('#4CAF50');
        textAlign(CENTER, CENTER);
        text('✓', x, rowY + rowH / 2);
      }
    }

    rowY += rowH;
  }

  if (example.primeImplicants.length > 3) {
    fill('#666');
    textAlign(LEFT, TOP);
    textSize(9);
    text('... and ' + (example.primeImplicants.length - 3) + ' more PIs', 35, rowY + 5);
  }
}

function drawResult(example) {
  let y = 325;

  fill('#e8f5e9');
  stroke('#4CAF50');
  strokeWeight(2);
  rect(25, y, canvasWidth - 50, 110, 8);

  fill('#4CAF50');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(12);
  text('Minimal Expression', canvasWidth / 2, y + 10);

  // Build expression from minimal cover
  let terms = [];
  for (let idx of example.minimalCover) {
    terms.push(example.primeImplicants[idx].expr);
  }

  fill('black');
  textSize(16);
  text('F = ' + terms.join(' + '), canvasWidth / 2, y + 35);

  // Explanation
  fill('#666');
  textSize(10);
  textAlign(LEFT, TOP);
  let expY = y + 65;
  text('• Essential PIs must be in every minimal cover', 35, expY);
  expY += 15;
  text('• Additional PIs chosen to cover remaining minterms', 35, expY);
  expY += 15;
  text('• Minimal cover uses fewest PIs for complete coverage', 35, expY);
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
