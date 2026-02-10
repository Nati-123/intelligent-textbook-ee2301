// Don't Care Optimizer MicroSim
// Show how don't cares enable better optimization
// Bloom Level: Analyze (L4) - Analyze optimization opportunities
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 500;
let drawHeight = 580;
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
  exampleSelect.size(250);
  for (let i = 0; i < examples.length; i++) {
    exampleSelect.option(examples[i].name, i);
  }
  exampleSelect.changed(() => { currentExample = parseInt(exampleSelect.value()); });

  positionUIElements();

  describe('Don\'t care optimizer showing how undefined inputs enable simpler circuits', LABEL);
}

function positionUIElements() {
  let mainRect = document.querySelector('main').getBoundingClientRect();
  exampleSelect.position(mainRect.left + 100, mainRect.top + drawHeight + 12);
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
  text("Don't Care Optimization", canvasWidth / 2, 10);

  let example = examples[currentExample];

  // Description
  textSize(14);
  fill('#555');
  text(example.description, canvasWidth / 2, 38);

  // Draw function specification
  drawSpecification(example);

  // Draw comparison
  drawComparison(example);

  // Control label
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text('Example:', 25, drawHeight + 24);
}

function drawSpecification(example) {
  let y = 60;

  fill('#64B5F6');
  stroke('#1565C0');
  strokeWeight(2);
  rect(20, y, canvasWidth - 40, 90, 8);

  fill('#0D47A1');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(13);
  text('Function Specification:', 30, y + 10);

  fill('#1a1a1a');
  textSize(12);

  // Minterms
  text('Minterms (F=1): Σm(' + example.minterms.join(', ') + ')', 35, y + 32);

  // Don't cares
  fill('#E65100');
  text("Don't Cares (F=X): Σd(" + example.dontcares.join(', ') + ')', 35, y + 52);

  // Explanation
  fill('#333');
  textSize(10);
  text("Don't cares: input combinations that never occur or whose output doesn't matter", 35, y + 72);
}

function drawComparison(example) {
  let y = 165;
  let halfW = (canvasWidth - 60) / 2;

  // Without don't cares
  fill('#FF8A80');
  stroke('#C62828');
  strokeWeight(2);
  rect(20, y, halfW, 150, 8);

  fill('#B71C1C');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(13);
  text("Without Don't Cares", 20 + halfW / 2, y + 10);

  fill('#1a1a1a');
  textSize(11);
  textAlign(LEFT, TOP);

  // Wrap expression
  let expr1 = example.withoutDC;
  let charLimit = Math.floor(halfW / 7);
  text('F = ' + expr1.substring(0, charLimit), 30, y + 35);
  if (expr1.length > charLimit) {
    text('    ' + expr1.substring(charLimit, charLimit * 2), 30, y + 52);
    if (expr1.length > charLimit * 2) {
      text('    ' + expr1.substring(charLimit * 2), 30, y + 69);
    }
  }

  fill('#333');
  textSize(10);
  text('Gates: ' + example.gatesWithout, 30, y + 100);

  // With don't cares
  fill('#69F0AE');
  stroke('#1B5E20');
  strokeWeight(2);
  rect(40 + halfW, y, halfW, 150, 8);

  fill('#1B5E20');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(13);
  text("With Don't Cares", 40 + halfW + halfW / 2, y + 10);

  fill('#1a1a1a');
  textSize(11);
  textAlign(LEFT, TOP);
  text('F = ' + example.withDC, 50 + halfW, y + 35);

  fill('#333');
  textSize(10);
  text('Gates: ' + example.gatesWith, 50 + halfW, y + 100);

  // Savings indicator
  fill('#1B5E20');
  textAlign(CENTER, TOP);
  textSize(12);
  textStyle(BOLD);
  text('✓ Simpler!', 40 + halfW + halfW / 2, y + 122);
  textStyle(NORMAL);

  // Draw K-map visualization hint
  drawKmapHint(y + 165);

  // Explanation
  drawExplanation(y + 275);
}

function drawKmapHint(y) {
  let example = examples[currentExample];

  fill('#E1BEE7');
  stroke('#7B1FA2');
  strokeWeight(2);
  rect(20, y, canvasWidth - 40, 100, 5);

  fill('#4A148C');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);
  text('K-Map Visualization:', 30, y + 10);

  // Draw mini K-map
  let kmapX = 40;
  let kmapY = y + 30;
  let cellW = 30;
  let cellH = 22;

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
          fill('#66BB6A');
        } else if (isDontcare) {
          fill('#FFB74D');
        } else {
          fill('white');
        }
        stroke('#666');
        strokeWeight(1);
        rect(cellX, cellY, cellW, cellH);

        fill(isDontcare ? '#E65100' : '#1a1a1a');
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(11);
        textStyle(BOLD);
        text(isMinterterm ? '1' : (isDontcare ? 'X' : '0'), cellX + cellW / 2, cellY + cellH / 2);
        textStyle(NORMAL);
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
          fill('#66BB6A');
        } else if (isDontcare) {
          fill('#FFB74D');
        } else {
          fill('white');
        }
        stroke('#666');
        strokeWeight(1);
        rect(cellX, cellY, cellW, cellH);

        fill(isDontcare ? '#E65100' : '#1a1a1a');
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(11);
        textStyle(BOLD);
        text(isMinterterm ? '1' : (isDontcare ? 'X' : '0'), cellX + cellW / 2, cellY + cellH / 2);
        textStyle(NORMAL);
      }
    }
  }

  // Legend
  let legendX = kmapX + 160;
  fill('#66BB6A');
  stroke('#666');
  strokeWeight(1);
  rect(legendX, kmapY, 16, 16);
  fill('#1a1a1a');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(11);
  text('= 1 (minterm)', legendX + 22, kmapY + 8);

  fill('#FFB74D');
  stroke('#666');
  strokeWeight(1);
  rect(legendX, kmapY + 24, 16, 16);
  fill('#1a1a1a');
  noStroke();
  text("= X (don't care)", legendX + 22, kmapY + 32);
}

function drawExplanation(y) {
  fill('#80D8FF');
  stroke('#0277BD');
  strokeWeight(2);
  rect(20, y, canvasWidth - 40, 90, 5);

  fill('#01579B');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);
  textStyle(BOLD);
  text('Key Insight:', 30, y + 10);
  textStyle(NORMAL);

  fill('#1a1a1a');
  textSize(11);
  text("Don't care conditions can be treated as either 0 or 1,", 30, y + 30);
  text('whichever allows for larger groupings in the K-map.', 30, y + 46);
  text('This results in simpler Boolean expressions and', 30, y + 62);
  text('fewer gates in the final circuit implementation.', 30, y + 78);
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
