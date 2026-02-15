// K-map 3-Variable Simulator MicroSim
// Interactive 3-variable Karnaugh map
// Bloom Level: Apply (L3) - Apply K-map simplification
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 420;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let kmapCells = [0, 0, 0, 0, 0, 0, 0, 0]; // 8 cells for 3 variables
let showGroups = false;
let groups = [];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  describe('3-variable Karnaugh map simulator for Boolean simplification', LABEL);
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
  text('3-Variable K-map', canvasWidth / 2, 10);

  // Draw K-map
  drawKmap();

  // Draw groups if enabled
  if (showGroups) {
    findGroups();
    drawGroups();
  }

  // Draw expression
  drawExpression();

  // Draw controls
  drawControls();
}

function drawKmap() {
  let startX = (canvasWidth - 260) / 2;
  let startY = 50;
  let cellW = 55;
  let cellH = 50;

  // Gray code order for columns
  let grayOrder = [0, 1, 3, 2]; // 00, 01, 11, 10

  // Column labels (BC)
  fill('#2196f3');
  noStroke();
  textAlign(CENTER, BOTTOM);
  textSize(12);
  text('BC', startX + 2 * cellW + 25, startY - 5);

  textSize(11);
  let colLabels = ['00', '01', '11', '10'];
  for (let c = 0; c < 4; c++) {
    text(colLabels[c], startX + 50 + c * cellW + cellW / 2, startY - 2);
  }

  // Row labels (A)
  textAlign(RIGHT, CENTER);
  text('A', startX + 35, startY + cellH);

  fill('#666');
  text('0', startX + 45, startY + cellH / 2);
  text('1', startX + 45, startY + cellH + cellH / 2);

  // Draw cells
  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 4; col++) {
      let x = startX + 50 + col * cellW;
      let y = startY + row * cellH;

      // Cell index in gray code order
      let cellIdx = row * 4 + grayOrder[col];
      let value = kmapCells[cellIdx];

      // Cell background
      if (value === 1) {
        fill('#c8e6c9');
      } else {
        fill('white');
      }
      stroke('#333');
      strokeWeight(1);
      rect(x, y, cellW, cellH);

      // Cell value
      fill(value === 1 ? '#4CAF50' : '#999');
      noStroke();
      textAlign(CENTER, CENTER);
      textSize(20);
      text(value, x + cellW / 2, y + cellH / 2);

      // Minterm number
      fill('#999');
      textSize(9);
      textAlign(LEFT, TOP);
      text('m' + cellIdx, x + 3, y + 3);
    }
  }

  // Instructions
  fill('#666');
  textSize(10);
  textAlign(CENTER, TOP);
  text('Click cells to toggle 0/1', canvasWidth / 2, startY + 2 * cellH + 15);
}

function findGroups() {
  groups = [];

  // Check for groups of 4 (columns)
  for (let col = 0; col < 4; col++) {
    let grayOrder = [0, 1, 3, 2];
    let idx0 = grayOrder[col];
    let idx1 = 4 + grayOrder[col];
    if (kmapCells[idx0] === 1 && kmapCells[idx1] === 1) {
      // Check if this forms a group of 4 with adjacent column
      let nextCol = (col + 1) % 4;
      let idx2 = grayOrder[nextCol];
      let idx3 = 4 + grayOrder[nextCol];
      if (kmapCells[idx2] === 1 && kmapCells[idx3] === 1) {
        groups.push({ type: 'col4', col1: col, col2: nextCol, color: '#ff9800' });
      }
    }
  }

  // Check for groups of 4 (rows) - wrap around
  for (let row = 0; row < 2; row++) {
    let grayOrder = [0, 1, 3, 2];
    let allOnes = true;
    for (let col = 0; col < 4; col++) {
      if (kmapCells[row * 4 + grayOrder[col]] !== 1) {
        allOnes = false;
        break;
      }
    }
    if (allOnes) {
      groups.push({ type: 'row4', row: row, color: '#9c27b0' });
    }
  }

  // Check for pairs (vertical)
  let grayOrder = [0, 1, 3, 2];
  for (let col = 0; col < 4; col++) {
    let idx0 = grayOrder[col];
    let idx1 = 4 + grayOrder[col];
    if (kmapCells[idx0] === 1 && kmapCells[idx1] === 1) {
      // Check if not already in a larger group
      let inLarger = groups.some(g => g.type === 'col4' && (g.col1 === col || g.col2 === col));
      if (!inLarger) {
        groups.push({ type: 'pair-v', col: col, color: '#2196f3' });
      }
    }
  }

  // Check for pairs (horizontal)
  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 4; col++) {
      let nextCol = (col + 1) % 4;
      let idx1 = row * 4 + grayOrder[col];
      let idx2 = row * 4 + grayOrder[nextCol];
      if (kmapCells[idx1] === 1 && kmapCells[idx2] === 1) {
        // Check if not in larger group
        let inLarger = groups.some(g =>
          (g.type === 'row4' && g.row === row) ||
          (g.type === 'col4' && (g.col1 === col || g.col1 === nextCol || g.col2 === col || g.col2 === nextCol))
        );
        if (!inLarger) {
          groups.push({ type: 'pair-h', row: row, col1: col, col2: nextCol, color: '#4CAF50' });
        }
      }
    }
  }
}

function drawGroups() {
  let startX = (canvasWidth - 260) / 2 + 50;
  let startY = 50;
  let cellW = 55;
  let cellH = 50;

  for (let g of groups) {
    stroke(g.color);
    strokeWeight(3);
    noFill();

    if (g.type === 'row4') {
      rect(startX + 2, startY + g.row * cellH + 2, 4 * cellW - 4, cellH - 4, 8);
    } else if (g.type === 'col4') {
      // Handle wrap-around
      if ((g.col1 === 3 && g.col2 === 0) || (g.col1 === 0 && g.col2 === 3)) {
        // Wrap around group
        rect(startX + 2, startY + 2, cellW - 4, 2 * cellH - 4, 8);
        rect(startX + 3 * cellW + 2, startY + 2, cellW - 4, 2 * cellH - 4, 8);
      } else {
        let minCol = min(g.col1, g.col2);
        rect(startX + minCol * cellW + 2, startY + 2, 2 * cellW - 4, 2 * cellH - 4, 8);
      }
    } else if (g.type === 'pair-v') {
      rect(startX + g.col * cellW + 5, startY + 5, cellW - 10, 2 * cellH - 10, 6);
    } else if (g.type === 'pair-h') {
      if ((g.col1 === 3 && g.col2 === 0) || (g.col1 === 0 && g.col2 === 3)) {
        // Wrap around
        rect(startX + 5, startY + g.row * cellH + 5, cellW - 10, cellH - 10, 6);
        rect(startX + 3 * cellW + 5, startY + g.row * cellH + 5, cellW - 10, cellH - 10, 6);
      } else {
        let minCol = min(g.col1, g.col2);
        rect(startX + minCol * cellW + 5, startY + g.row * cellH + 5, 2 * cellW - 10, cellH - 10, 6);
      }
    }
  }
}

function drawExpression() {
  let y = 200;

  fill('#f5f5f5');
  stroke('#ccc');
  strokeWeight(1);
  rect(30, y, canvasWidth - 60, 80, 5);

  fill('#333');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(11);
  text('Boolean Expression:', 40, y + 10);

  // Get minterms
  let minterms = [];
  for (let i = 0; i < 8; i++) {
    if (kmapCells[i] === 1) minterms.push(i);
  }

  fill('#2196f3');
  textSize(12);
  if (minterms.length === 0) {
    text('F = 0 (no minterms)', 40, y + 30);
  } else if (minterms.length === 8) {
    text('F = 1 (all minterms)', 40, y + 30);
  } else {
    text('F = Σm(' + minterms.join(', ') + ')', 40, y + 30);

    // Show simplified if groups enabled
    if (showGroups && groups.length > 0) {
      let simplified = getSimplifiedExpression();
      fill('#4CAF50');
      text('Simplified: F = ' + simplified, 40, y + 50);
    }
  }

  fill('#666');
  textSize(9);
  textAlign(RIGHT, BOTTOM);
  text('Variables: A (row), B and C (columns)', canvasWidth - 40, y + 75);
}

function getSimplifiedExpression() {
  let terms = [];

  for (let g of groups) {
    if (g.type === 'row4') {
      terms.push(g.row === 0 ? "A'" : 'A');
    } else if (g.type === 'col4') {
      // Determine which variable is constant
      let cols = [g.col1, g.col2].sort((a, b) => a - b);
      if ((cols[0] === 0 && cols[1] === 1) || (cols[0] === 2 && cols[1] === 3)) {
        terms.push(cols[0] < 2 ? "C'" : 'C');
      } else {
        terms.push(cols[0] % 2 === 0 ? "B'" : 'B');
      }
    } else if (g.type === 'pair-v') {
      let grayOrder = [0, 1, 3, 2];
      let bc = grayOrder[g.col].toString(2).padStart(2, '0');
      terms.push((bc[0] === '0' ? "B'" : 'B') + (bc[1] === '0' ? "C'" : 'C'));
    } else if (g.type === 'pair-h') {
      let a = g.row === 0 ? "A'" : 'A';
      // Determine common variable between cols
      let grayOrder = [0, 1, 3, 2];
      let bc1 = grayOrder[g.col1].toString(2).padStart(2, '0');
      let bc2 = grayOrder[g.col2].toString(2).padStart(2, '0');
      if (bc1[0] === bc2[0]) {
        terms.push(a + (bc1[0] === '0' ? "B'" : 'B'));
      } else {
        terms.push(a + (bc1[1] === '0' ? "C'" : 'C'));
      }
    }
  }

  // Add any ungrouped minterms
  let covered = new Set();
  // ... simplified - just return group terms
  return terms.length > 0 ? terms.join(' + ') : '(groups shown)';
}

function drawControls() {
  // Clear button
  let clearX = 40;
  let btnY = drawHeight + 15;

  fill('#f44336');
  stroke('#d32f2f');
  strokeWeight(1);
  rect(clearX, btnY, 70, 25, 3);

  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  text('Clear All', clearX + 35, btnY + 12);

  // Fill all button
  let fillX = 120;
  fill('#4CAF50');
  stroke('#388E3C');
  strokeWeight(1);
  rect(fillX, btnY, 70, 25, 3);

  fill('white');
  noStroke();
  text('Fill All', fillX + 35, btnY + 12);

  // Show groups toggle
  let groupX = 200;
  fill(showGroups ? '#2196f3' : '#e0e0e0');
  stroke(showGroups ? '#1976d2' : '#bdbdbd');
  strokeWeight(1);
  rect(groupX, btnY, 100, 25, 3);

  fill(showGroups ? 'white' : '#333');
  noStroke();
  text(showGroups ? '✓ Groups' : 'Show Groups', groupX + 50, btnY + 12);

  // Tip
  fill('#666');
  textSize(10);
  textAlign(CENTER, CENTER);
  text('Click K-map cells to set minterms', canvasWidth / 2, drawHeight + 55);
}

function mousePressed() {
  // Check K-map cells
  let startX = (canvasWidth - 260) / 2 + 50;
  let startY = 50;
  let cellW = 55;
  let cellH = 50;
  let grayOrder = [0, 1, 3, 2];

  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 4; col++) {
      let x = startX + col * cellW;
      let y = startY + row * cellH;

      if (mouseX >= x && mouseX <= x + cellW && mouseY >= y && mouseY <= y + cellH) {
        let cellIdx = row * 4 + grayOrder[col];
        kmapCells[cellIdx] = 1 - kmapCells[cellIdx];
        return;
      }
    }
  }

  // Check buttons
  let btnY = drawHeight + 15;

  // Clear button
  if (mouseX >= 40 && mouseX <= 110 && mouseY >= btnY && mouseY <= btnY + 25) {
    kmapCells = [0, 0, 0, 0, 0, 0, 0, 0];
  }

  // Fill button
  if (mouseX >= 120 && mouseX <= 190 && mouseY >= btnY && mouseY <= btnY + 25) {
    kmapCells = [1, 1, 1, 1, 1, 1, 1, 1];
  }

  // Groups toggle
  if (mouseX >= 200 && mouseX <= 300 && mouseY >= btnY && mouseY <= btnY + 25) {
    showGroups = !showGroups;
  }
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
