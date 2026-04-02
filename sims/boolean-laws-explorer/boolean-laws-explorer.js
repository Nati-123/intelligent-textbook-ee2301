// Boolean Laws Explorer MicroSim
// Explore Boolean algebra laws with interactive examples
// Bloom Level: Understand (L2) - Explain Boolean laws
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 450;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let lawSelect;
let currentLaw = 0;

let laws = [
  {
    name: 'Identity',
    equations: ['A · 1 = A', 'A + 0 = A'],
    description: 'ANDing with 1 or ORing with 0 returns the original value.',
    examples: [
      { expr: 'A · 1', vals: [[0, 0], [1, 1]] },
      { expr: 'A + 0', vals: [[0, 0], [1, 1]] }
    ]
  },
  {
    name: 'Null (Annihilator)',
    equations: ['A · 0 = 0', 'A + 1 = 1'],
    description: 'ANDing with 0 always gives 0. ORing with 1 always gives 1.',
    examples: [
      { expr: 'A · 0', vals: [[0, 0], [1, 0]] },
      { expr: 'A + 1', vals: [[0, 1], [1, 1]] }
    ]
  },
  {
    name: 'Idempotent',
    equations: ['A · A = A', 'A + A = A'],
    description: 'A variable ANDed or ORed with itself equals itself.',
    examples: [
      { expr: 'A · A', vals: [[0, 0], [1, 1]] },
      { expr: 'A + A', vals: [[0, 0], [1, 1]] }
    ]
  },
  {
    name: 'Complement',
    equations: ["A · A' = 0", "A + A' = 1"],
    description: 'A variable ANDed with its complement is 0. ORed is 1.',
    examples: [
      { expr: "A · A'", vals: [[0, 0], [1, 0]] },
      { expr: "A + A'", vals: [[0, 1], [1, 1]] }
    ]
  },
  {
    name: 'Double Negation',
    equations: ["(A')' = A"],
    description: 'Complementing twice returns the original value.',
    examples: [
      { expr: "(A')'", vals: [[0, 0], [1, 1]] }
    ]
  },
  {
    name: 'Commutative',
    equations: ['A · B = B · A', 'A + B = B + A'],
    description: 'Order of operands does not matter for AND or OR.',
    examples: [
      { expr: 'A · B = B · A', twoVar: true },
      { expr: 'A + B = B + A', twoVar: true }
    ]
  },
  {
    name: 'Associative',
    equations: ['(A · B) · C = A · (B · C)', '(A + B) + C = A + (B + C)'],
    description: 'Grouping of operands does not matter for AND or OR.',
    examples: []
  },
  {
    name: 'Distributive',
    equations: ['A · (B + C) = A·B + A·C', 'A + B·C = (A+B) · (A+C)'],
    description: 'AND distributes over OR, and OR distributes over AND.',
    examples: []
  },
  {
    name: 'Absorption',
    equations: ['A + A·B = A', 'A · (A + B) = A'],
    description: 'The smaller term "absorbs" the larger term.',
    examples: [
      { expr: 'A + A·B', twoVar: true },
      { expr: 'A · (A + B)', twoVar: true }
    ]
  },
  {
    name: "De Morgan's",
    equations: ["(A · B)' = A' + B'", "(A + B)' = A' · B'"],
    description: 'Complement of AND equals OR of complements, and vice versa.',
    examples: [
      { expr: "(A · B)' = A' + B'", twoVar: true },
      { expr: "(A + B)' = A' · B'", twoVar: true }
    ]
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  lawSelect = createSelect();
  lawSelect.size(280);
  for (let i = 0; i < laws.length; i++) {
    lawSelect.option(laws[i].name, i);
  }
  lawSelect.changed(() => { currentLaw = parseInt(lawSelect.value()); });

  positionUIElements();

  describe('Boolean algebra laws explorer with interactive examples', LABEL);
}

function positionUIElements() {
  let mainRect = document.querySelector('main').getBoundingClientRect();
  lawSelect.position(mainRect.left + 80, mainRect.top + drawHeight + 20);
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
  textSize(20);
  text('Boolean Laws Explorer', canvasWidth / 2, 10);

  let law = laws[currentLaw];

  // Law name
  textSize(18);
  fill('#2196f3');
  text(law.name + ' Law', canvasWidth / 2, 45);

  // Equations
  textSize(16);
  fill('black');
  let eqY = 80;
  for (let eq of law.equations) {
    text(eq, canvasWidth / 2, eqY);
    eqY += 28;
  }

  // Description
  fill('#666');
  textSize(13);
  textAlign(CENTER, TOP);
  text(law.description, 30, eqY + 10, canvasWidth - 60);

  // Draw verification tables
  drawVerificationTables(law, eqY + 60);

  // Control label
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(14);
  text('Law:', 30, drawHeight + 32);
}

function drawVerificationTables(law, startY) {
  if (law.examples.length === 0) {
    // Show generic message for complex laws
    fill('#666');
    textAlign(CENTER, CENTER);
    textSize(12);
    text('Verify by constructing truth tables for both sides', canvasWidth / 2, startY + 50);
    return;
  }

  let tableWidth = 150;
  let tableX = (canvasWidth - tableWidth * min(2, law.examples.length) - 20) / 2;
  let rowH = 22;

  for (let i = 0; i < min(2, law.examples.length); i++) {
    let ex = law.examples[i];
    let x = tableX + i * (tableWidth + 20);
    let y = startY;

    // Table header
    fill('#2196f3');
    stroke('#1976d2');
    strokeWeight(1);
    rect(x, y, tableWidth, rowH);

    fill('white');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(12);

    if (ex.twoVar) {
      text('A  B  |  ' + ex.expr.split('=')[0].trim(), x + tableWidth / 2, y + rowH / 2);
    } else {
      text('A  |  ' + ex.expr, x + tableWidth / 2, y + rowH / 2);
    }

    // Table rows
    if (ex.twoVar) {
      let combos = [[0, 0], [0, 1], [1, 0], [1, 1]];
      for (let j = 0; j < 4; j++) {
        let rowY = y + (j + 1) * rowH;
        fill(j % 2 === 0 ? '#f5f5f5' : 'white');
        stroke('#ddd');
        strokeWeight(1);
        rect(x, rowY, tableWidth, rowH);

        noStroke();
        fill('#4CAF50');
        textSize(12);
        text(combos[j][0] + '   ' + combos[j][1] + '   |   ✓', x + tableWidth / 2, rowY + rowH / 2);
      }
    } else {
      for (let j = 0; j < ex.vals.length; j++) {
        let rowY = y + (j + 1) * rowH;
        fill(j % 2 === 0 ? '#f5f5f5' : 'white');
        stroke('#ddd');
        strokeWeight(1);
        rect(x, rowY, tableWidth, rowH);

        noStroke();
        let inVal = ex.vals[j][0];
        let outVal = ex.vals[j][1];
        fill(outVal ? '#4CAF50' : '#f44336');
        textSize(12);
        text(inVal + '   |   ' + outVal, x + tableWidth / 2, rowY + rowH / 2);
      }
    }
  }

  // Bottom note
  fill('#666');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(11);
  let noteY = startY + (law.examples[0].twoVar ? 5 : 3) * rowH + 15;
  text('Tables verify the law holds for all input combinations', canvasWidth / 2, noteY);
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
