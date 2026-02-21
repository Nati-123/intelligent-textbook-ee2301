// Boolean Operations Visualizer MicroSim
// Visualize AND, OR, NOT operations with Venn diagrams
// Bloom Level: Understand (L2) - Explain Boolean operations
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let operationSelect;
let currentOp = 'AND';
let inputA = 1;
let inputB = 1;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  operationSelect = createSelect();
  operationSelect.option('AND');
  operationSelect.option('OR');
  operationSelect.option('NOT A');
  operationSelect.option('NAND');
  operationSelect.option('NOR');
  operationSelect.option('XOR');
  operationSelect.changed(() => { currentOp = operationSelect.value(); });

  positionUIElements();

  describe('Boolean operations visualized with Venn diagrams and truth values', LABEL);
}

function positionUIElements() {
  let mainRect = document.querySelector('main').getBoundingClientRect();
  operationSelect.position(mainRect.left + 120, mainRect.top + drawHeight + 15);
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
  text('Boolean Operations Visualizer', canvasWidth / 2, 10);

  // Draw Venn diagram
  drawVennDiagram();

  // Draw input toggles
  drawInputToggles();

  // Draw result
  drawResult();

  // Control label
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(14);
  text('Operation:', 30, drawHeight + 27);

  // Draw truth table
  drawMiniTruthTable();
}

function drawVennDiagram() {
  let centerX = canvasWidth / 2;
  let centerY = 160;
  let circleR = 80;
  let overlap = 50;

  // Calculate result
  let result = calculateResult();

  // Draw circles based on operation
  if (currentOp === 'NOT A') {
    // NOT operation - single circle
    // Background (NOT A region)
    fill(result ? '#4CAF50' : '#ffcdd2');
    stroke('#666');
    strokeWeight(2);
    rect(centerX - 100, centerY - 80, 200, 160, 10);

    // Circle A (what we're negating)
    fill(inputA ? '#2196f3' : '#e3f2fd');
    ellipse(centerX, centerY, circleR * 2);

    fill('black');
    noStroke();
    textSize(24);
    textAlign(CENTER, CENTER);
    text('A', centerX, centerY);
  } else {
    // Two-input operations - overlapping circles
    let leftX = centerX - overlap;
    let rightX = centerX + overlap;

    // Determine which regions to highlight
    let highlightA = false, highlightB = false, highlightAB = false, highlightOutside = false;

    if (currentOp === 'AND') {
      highlightAB = inputA && inputB;
    } else if (currentOp === 'OR') {
      highlightA = inputA;
      highlightB = inputB;
      highlightAB = inputA || inputB;
    } else if (currentOp === 'NAND') {
      highlightOutside = !(inputA && inputB);
      highlightA = !inputB;
      highlightB = !inputA;
    } else if (currentOp === 'NOR') {
      highlightOutside = !(inputA || inputB);
    } else if (currentOp === 'XOR') {
      highlightA = inputA && !inputB;
      highlightB = inputB && !inputA;
    }

    // Draw background for NAND/NOR
    if (currentOp === 'NAND' || currentOp === 'NOR') {
      fill(highlightOutside ? '#4CAF50' : '#f5f5f5');
      stroke('#ccc');
      strokeWeight(1);
      rect(centerX - 130, centerY - 100, 260, 200, 10);
    }

    // Circle A
    fill(highlightA || highlightAB ? '#4CAF50' : (inputA ? '#e3f2fd' : '#f5f5f5'));
    stroke('#2196f3');
    strokeWeight(3);
    ellipse(leftX, centerY, circleR * 2);

    // Circle B
    fill(highlightB || highlightAB ? '#4CAF50' : (inputB ? '#fff3e0' : '#f5f5f5'));
    stroke('#ff9800');
    strokeWeight(3);
    ellipse(rightX, centerY, circleR * 2);

    // Redraw intersection area for AND
    if (currentOp === 'AND' && highlightAB) {
      // Draw intersection
      fill('#4CAF50');
      noStroke();
      beginShape();
      for (let a = -PI/2; a <= PI/2; a += 0.1) {
        let x = rightX + cos(a) * circleR;
        let y = centerY + sin(a) * circleR;
        if (dist(x, y, leftX, centerY) <= circleR) {
          vertex(x, y);
        }
      }
      endShape(CLOSE);
    }

    // Labels
    fill('black');
    noStroke();
    textSize(24);
    textAlign(CENTER, CENTER);
    text('A', leftX - 30, centerY);
    text('B', rightX + 30, centerY);
  }

  // Operation symbol
  textSize(16);
  fill('#666');
  text(getOperationSymbol(), centerX, centerY + 110);
}

function drawInputToggles() {
  let y = 300;

  // Input A toggle
  let aX = canvasWidth / 2 - 80;
  fill(inputA ? '#4CAF50' : '#f44336');
  stroke('#333');
  strokeWeight(2);
  rect(aX, y, 60, 35, 5);

  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(16);
  text('A = ' + inputA, aX + 30, y + 17);

  // Input B toggle (if applicable)
  if (currentOp !== 'NOT A') {
    let bX = canvasWidth / 2 + 20;
    fill(inputB ? '#4CAF50' : '#f44336');
    stroke('#333');
    strokeWeight(2);
    rect(bX, y, 60, 35, 5);

    fill('white');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(16);
    text('B = ' + inputB, bX + 30, y + 17);
  }

  // Instruction
  fill('#666');
  textSize(11);
  text('Click to toggle inputs', canvasWidth / 2, y + 42);
}

function drawResult() {
  let result = calculateResult();
  let y = 375;

  fill(result ? '#4CAF50' : '#f44336');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(18);
  text('Result: ' + result, canvasWidth / 2, y);
}

function drawMiniTruthTable() {
  let x = canvasWidth - 120;
  let y = drawHeight + 10;

  fill('#f5f5f5');
  stroke('#ccc');
  strokeWeight(1);
  rect(x, y, 110, 60, 3);

  fill('#333');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(10);

  if (currentOp === 'NOT A') {
    text('A | NOT A', x + 8, y + 5);
    text('0 |   1', x + 8, y + 22);
    text('1 |   0', x + 8, y + 38);
  } else {
    text('A B | ' + currentOp, x + 5, y + 5);
    let vals = getTruthTableValues();
    text('0 0 |  ' + vals[0], x + 5, y + 18);
    text('0 1 |  ' + vals[1], x + 5, y + 30);
    text('1 0 |  ' + vals[2], x + 5, y + 42);
    text('1 1 |  ' + vals[3], x + 5, y + 54);
  }
}

function calculateResult() {
  switch (currentOp) {
    case 'AND': return inputA && inputB ? 1 : 0;
    case 'OR': return inputA || inputB ? 1 : 0;
    case 'NOT A': return inputA ? 0 : 1;
    case 'NAND': return !(inputA && inputB) ? 1 : 0;
    case 'NOR': return !(inputA || inputB) ? 1 : 0;
    case 'XOR': return inputA !== inputB ? 1 : 0;
    default: return 0;
  }
}

function getTruthTableValues() {
  switch (currentOp) {
    case 'AND': return [0, 0, 0, 1];
    case 'OR': return [0, 1, 1, 1];
    case 'NAND': return [1, 1, 1, 0];
    case 'NOR': return [1, 0, 0, 0];
    case 'XOR': return [0, 1, 1, 0];
    default: return [0, 0, 0, 0];
  }
}

function getOperationSymbol() {
  switch (currentOp) {
    case 'AND': return 'A · B (A AND B)';
    case 'OR': return 'A + B (A OR B)';
    case 'NOT A': return "A' (NOT A)";
    case 'NAND': return "(A · B)' (A NAND B)";
    case 'NOR': return "(A + B)' (A NOR B)";
    case 'XOR': return 'A ⊕ B (A XOR B)';
    default: return '';
  }
}

function mousePressed() {
  let y = 300;

  // Check A toggle
  let aX = canvasWidth / 2 - 80;
  if (mouseX >= aX && mouseX <= aX + 60 && mouseY >= y && mouseY <= y + 35) {
    inputA = 1 - inputA;
  }

  // Check B toggle
  if (currentOp !== 'NOT A') {
    let bX = canvasWidth / 2 + 20;
    if (mouseX >= bX && mouseX <= bX + 60 && mouseY >= y && mouseY <= y + 35) {
      inputB = 1 - inputB;
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
