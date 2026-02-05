// Don't Care Optimizer MicroSim
// Show how don't cares enable better optimization
// Bloom Level: Analyze (L4) - Analyze optimization opportunities
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 450;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let exampleSelect;
let currentExample = 0;

let examples = [
  {
    name: 'BCD Odd Parity',
    description: 'Generate odd parity for BCD digits (0-9)',
    vars: ['A', 'B', 'C', 'D'],
    minterms: [1, 2, 4, 7, 8],
    dontcares: [10, 11, 12, 13, 14, 15],
    withoutDC: "A'B'C'D + A'B'CD' + A'BC'D' + A'BCD + AB'C'D'",
    withDC: "A'D + A'B'C + A'BC'D' + AB'C'D'",
    gatesWithout: '5 AND + 1 OR (17 gate inputs)',
    gatesWith: '4 AND + 1 OR (11 gate inputs)'
  },
  {
    name: 'BCD > 5 Detector',
    description: 'Detect if BCD digit is greater than 5',
    vars: ['A', 'B', 'C', 'D'],
    minterms: [6, 7, 8, 9],
    dontcares: [10, 11, 12, 13, 14, 15],
    withoutDC: "A'BCD' + A'BCD + AB'C'D' + AB'C'D",
    withDC: "A + BC",
    gatesWithout: '4 AND + 1 OR (14 gate inputs)',
    gatesWith: '1 AND + 1 OR (3 gate inputs)'
  },
  {
    name: 'Simplified Example',
    description: '3-variable function with don\'t cares',
    vars: ['A', 'B', 'C'],
    minterms: [1, 2],
    dontcares: [6, 7],
    withoutDC: "A'B'C + A'BC'",
    withDC: "A'C + A'B",
    gatesWithout: '2 AND + 1 OR (6 gate inputs)',
    gatesWith: '2 AND + 1 OR (4 gate inputs)'
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  exampleSelect = createSelect();
  exampleSelect.position(100, drawHeight + 12);
  exampleSelect.size(250);
  for (let i = 0; i < examples.length; i++) {
    exampleSelect.option(examples[i].name, i);
  }
  exampleSelect.changed(() => { currentExample = parseInt(exampleSelect.value()); });

  describe('Don\'t care optimizer showing how undefined inputs enable simpler circuits', LABEL);
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
  text("Don't Care Optimization", canvasWidth / 2, 10);

  let example = examples[currentExample];

  // Description
  textSize(12);
  fill('#666');
  text(example.description, canvasWidth / 2, 35);

  // Draw function specification
  drawSpecification(example);

  // Draw comparison
  drawComparison(example);

  // Control label
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(11);
  text('Example:', 25, drawHeight + 24);
}

function drawSpecification(example) {
  let y = 60;

  fill('#e3f2fd');
  stroke('#2196f3');
  strokeWeight(2);
  rect(20, y, canvasWidth - 40, 80, 8);

  fill('#2196f3');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(11);
  text('Function Specification:', 30, y + 8);

  fill('#333');
  textSize(10);

  // Minterms
  text('Minterms (F=1): Σm(' + example.minterms.join(', ') + ')', 35, y + 28);

  // Don't cares
  fill('#ff9800');
  text("Don't Cares (F=X): Σd(" + example.dontcares.join(', ') + ')', 35, y + 45);

  // Explanation
  fill('#666');
  textSize(9);
  text("Don't cares are input combinations that will never occur or whose output doesn't matter", 35, y + 62);
}

function drawComparison(example) {
  let y = 155;
  let halfW = (canvasWidth - 50) / 2;

  // Without don't cares
  fill('#ffebee');
  stroke('#f44336');
  strokeWeight(2);
  rect(20, y, halfW, 135, 8);

  fill('#f44336');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(11);
  text("Without Don't Cares", 20 + halfW / 2, y + 8);

  fill('#333');
  textSize(9);
  textAlign(LEFT, TOP);

  // Wrap expression
  let expr1 = example.withoutDC;
  text('F = ' + expr1.substring(0, 25), 30, y + 30);
  if (expr1.length > 25) {
    text('    ' + expr1.substring(25, 50), 30, y + 45);
    if (expr1.length > 50) {
      text('    ' + expr1.substring(50), 30, y + 60);
    }
  }

  fill('#666');
  text('Gates: ' + example.gatesWithout, 30, y + 85);

  // With don't cares
  fill('#e8f5e9');
  stroke('#4CAF50');
  strokeWeight(2);
  rect(30 + halfW, y, halfW, 135, 8);

  fill('#4CAF50');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(11);
  text("With Don't Cares", 30 + halfW + halfW / 2, y + 8);

  fill('#333');
  textSize(9);
  textAlign(LEFT, TOP);
  text('F = ' + example.withDC, 40 + halfW, y + 30);

  fill('#666');
  text('Gates: ' + example.gatesWith, 40 + halfW, y + 85);

  // Savings indicator
  fill('#4CAF50');
  textAlign(CENTER, TOP);
  textSize(10);
  text('✓ Simpler!', 30 + halfW + halfW / 2, y + 105);

  // Draw K-map visualization hint
  drawKmapHint(y + 150);

  // Explanation
  drawExplanation(y + 250);
}

function drawKmapHint(y) {
  let example = examples[currentExample];

  fill('#f5f5f5');
  stroke('#ccc');
  strokeWeight(1);
  rect(20, y, canvasWidth - 40, 90, 5);

  fill('#333');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(10);
  text('K-Map Visualization:', 30, y + 8);

  // Draw mini K-map
  let kmapX = 40;
  let kmapY = y + 28;
  let cellW = 25;
  let cellH = 20;

  // For 4-variable examples
  if (example.vars.length === 4) {
    // Draw grid
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        let cellX = kmapX + col * cellW;
        let cellY = kmapY + row * cellH;

        // Gray code mapping
        let grayRow = [0, 1, 3, 2][row];
        let grayCol = [0, 1, 3, 2][col];
        let minterm = grayRow * 4 + grayCol;

        let isMinterterm = example.minterms.includes(minterm);
        let isDontcare = example.dontcares.includes(minterm);

        if (isMinterterm) {
          fill('#c8e6c9');
        } else if (isDontcare) {
          fill('#fff3e0');
        } else {
          fill('white');
        }
        stroke('#999');
        strokeWeight(1);
        rect(cellX, cellY, cellW, cellH);

        fill(isDontcare ? '#ff9800' : '#333');
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(9);
        text(isMinterterm ? '1' : (isDontcare ? 'X' : '0'), cellX + cellW / 2, cellY + cellH / 2);
      }
    }
  } else {
    // 3-variable K-map
    for (let row = 0; row < 2; row++) {
      for (let col = 0; col < 4; col++) {
        let cellX = kmapX + col * cellW;
        let cellY = kmapY + row * cellH;

        let grayCol = [0, 1, 3, 2][col];
        let minterm = row * 4 + grayCol;

        let isMinterterm = example.minterms.includes(minterm);
        let isDontcare = example.dontcares.includes(minterm);

        if (isMinterterm) {
          fill('#c8e6c9');
        } else if (isDontcare) {
          fill('#fff3e0');
        } else {
          fill('white');
        }
        stroke('#999');
        strokeWeight(1);
        rect(cellX, cellY, cellW, cellH);

        fill(isDontcare ? '#ff9800' : '#333');
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(9);
        text(isMinterterm ? '1' : (isDontcare ? 'X' : '0'), cellX + cellW / 2, cellY + cellH / 2);
      }
    }
  }

  // Legend
  let legendX = kmapX + 140;
  fill('#c8e6c9');
  stroke('#999');
  strokeWeight(1);
  rect(legendX, kmapY, 15, 15);
  fill('#333');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(9);
  text('= 1 (minterm)', legendX + 20, kmapY + 8);

  fill('#fff3e0');
  stroke('#999');
  strokeWeight(1);
  rect(legendX, kmapY + 22, 15, 15);
  fill('#333');
  noStroke();
  text("= X (don't care)", legendX + 20, kmapY + 30);
}

function drawExplanation(y) {
  fill('#e3f2fd');
  stroke('#2196f3');
  strokeWeight(1);
  rect(20, y, canvasWidth - 40, 85, 5);

  fill('#2196f3');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(10);
  text('Key Insight:', 30, y + 8);

  fill('#333');
  textSize(9);
  text("Don't care conditions can be treated as either 0 or 1,", 30, y + 25);
  text('whichever allows for larger groupings in the K-map.', 30, y + 38);
  text('This results in simpler Boolean expressions and', 30, y + 53);
  text('fewer gates in the final circuit implementation.', 30, y + 66);
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
