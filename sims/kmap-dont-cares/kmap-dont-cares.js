// K-map with Don't Cares MicroSim
// Practice K-map simplification with don't cares
// Bloom Level: Apply (L3) - Apply don't care optimization
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 430;
let controlHeight = 70;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

// 0 = false, 1 = true, 2 = don't care (X)
let kmapCells = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let showGroups = false;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  // Set up example: BCD > 5 detector
  kmapCells = [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2];

  describe('4-variable K-map with don\'t care conditions for optimization', LABEL);
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
  text("K-map with Don't Cares", canvasWidth / 2, 10);

  // Draw K-map
  drawKmap();

  // Draw expression
  drawExpression();

  // Draw controls
  drawControls();
}

function drawKmap() {
  let startX = (canvasWidth - 220) / 2;
  let startY = 45;
  let cellW = 45;
  let cellH = 40;

  // Gray code order
  let grayOrder = [0, 1, 3, 2];

  // Column labels (CD)
  fill('#2196f3');
  noStroke();
  textAlign(CENTER, BOTTOM);
  textSize(11);
  text('CD', startX + 2 * cellW + 20, startY - 3);

  textSize(10);
  let colLabels = ['00', '01', '11', '10'];
  for (let c = 0; c < 4; c++) {
    text(colLabels[c], startX + 40 + c * cellW + cellW / 2, startY);
  }

  // Row labels (AB)
  textAlign(RIGHT, CENTER);
  text('AB', startX + 30, startY + 2 * cellH);

  fill('#666');
  let rowLabels = ['00', '01', '11', '10'];
  for (let r = 0; r < 4; r++) {
    text(rowLabels[r], startX + 35, startY + r * cellH + cellH / 2);
  }

  // Draw cells
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      let x = startX + 40 + col * cellW;
      let y = startY + row * cellH;

      // Cell index in gray code order
      let grayRow = grayOrder[row];
      let grayCol = grayOrder[col];
      let cellIdx = grayRow * 4 + grayCol;
      let value = kmapCells[cellIdx];

      // Cell background
      if (value === 1) {
        fill('#c8e6c9');
      } else if (value === 2) {
        fill('#fff3e0');
      } else {
        fill('white');
      }
      stroke('#333');
      strokeWeight(1);
      rect(x, y, cellW, cellH);

      // Cell value
      if (value === 1) {
        fill('#4CAF50');
      } else if (value === 2) {
        fill('#ff9800');
      } else {
        fill('#999');
      }
      noStroke();
      textAlign(CENTER, CENTER);
      textSize(16);
      text(value === 2 ? 'X' : value, x + cellW / 2, y + cellH / 2);

      // Minterm number
      fill('#999');
      textSize(7);
      textAlign(LEFT, TOP);
      text(cellIdx, x + 2, y + 2);
    }
  }

  // Draw groups if enabled
  if (showGroups) {
    drawOptimalGroups(startX + 40, startY, cellW, cellH);
  }

  // Legend
  let legendY = startY + 4 * cellH + 10;
  textSize(9);
  textAlign(LEFT, CENTER);

  fill('#c8e6c9');
  stroke('#4CAF50');
  strokeWeight(1);
  rect(startX, legendY, 15, 15);
  fill('#333');
  noStroke();
  text('= 1 (minterm)', startX + 20, legendY + 8);

  fill('#fff3e0');
  stroke('#ff9800');
  strokeWeight(1);
  rect(startX + 100, legendY, 15, 15);
  fill('#333');
  noStroke();
  text("= X (don't care)", startX + 120, legendY + 8);
}

function drawOptimalGroups(startX, startY, cellW, cellH) {
  // For the BCD > 5 example, optimal groups are:
  // A (covers m8,m9,m10,m11,m12,m13,m14,m15 - using don't cares)
  // BC (covers m6,m7,m14,m15 - using don't cares)

  let grayOrder = [0, 1, 3, 2];

  // Group for A (bottom two rows)
  stroke('#9c27b0');
  strokeWeight(3);
  noFill();
  rect(startX + 2, startY + 2 * cellH + 2, 4 * cellW - 4, 2 * cellH - 4, 8);

  // Group for BC (columns 2,3 of top rows - but we only have minterms 6,7)
  stroke('#2196f3');
  strokeWeight(3);
  // This would be row 1, cols 2-3 in display (which is gray rows 0-1, cols 2-3)
  rect(startX + 2 * cellW + 2, startY + cellH + 2, 2 * cellW - 4, cellH - 4, 6);
}

function drawExpression() {
  let y = 240;

  fill('#f5f5f5');
  stroke('#ccc');
  strokeWeight(1);
  rect(25, y, canvasWidth - 50, 95, 5);

  fill('#333');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(11);
  text('Simplification:', 35, y + 10);

  // Get minterms and don't cares
  let minterms = [];
  let dontcares = [];
  for (let i = 0; i < 16; i++) {
    if (kmapCells[i] === 1) minterms.push(i);
    if (kmapCells[i] === 2) dontcares.push(i);
  }

  fill('#2196f3');
  textSize(10);
  text('F = Σm(' + minterms.join(',') + ') + Σd(' + dontcares.join(',') + ')', 35, y + 28);

  if (showGroups) {
    fill('#4CAF50');
    textSize(12);
    text('Simplified: F = A + BC', 35, y + 50);

    fill('#666');
    textSize(9);
    text('Using X as 1 enables larger groups → simpler expression', 35, y + 72);
  } else {
    fill('#666');
    textSize(10);
    text("Without using don't cares: F = AB'C'D' + AB'C'D + A'BCD' + A'BCD", 35, y + 50);
    textSize(9);
    text('(Much more complex!)', 35, y + 70);
  }
}

function drawControls() {
  let btnY = drawHeight + 15;

  // Preset: BCD > 5
  fill('#2196f3');
  stroke('#1976d2');
  strokeWeight(1);
  rect(30, btnY, 90, 25, 3);

  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(10);
  text('BCD > 5', 75, btnY + 12);

  // Clear
  fill('#f44336');
  stroke('#d32f2f');
  strokeWeight(1);
  rect(130, btnY, 60, 25, 3);

  fill('white');
  noStroke();
  text('Clear', 160, btnY + 12);

  // Show groups
  fill(showGroups ? '#4CAF50' : '#e0e0e0');
  stroke(showGroups ? '#388E3C' : '#bdbdbd');
  strokeWeight(1);
  rect(200, btnY, 100, 25, 3);

  fill(showGroups ? 'white' : '#333');
  noStroke();
  text(showGroups ? '✓ Optimized' : 'Show Optimal', 250, btnY + 12);

  // Instructions
  fill('#666');
  textSize(9);
  textAlign(CENTER, CENTER);
  text('Click cells to cycle: 0 → 1 → X → 0', canvasWidth / 2, drawHeight + 52);
}

function mousePressed() {
  // Check K-map cells
  let startX = (canvasWidth - 220) / 2 + 40;
  let startY = 45;
  let cellW = 45;
  let cellH = 40;
  let grayOrder = [0, 1, 3, 2];

  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      let x = startX + col * cellW;
      let y = startY + row * cellH;

      if (mouseX >= x && mouseX <= x + cellW && mouseY >= y && mouseY <= y + cellH) {
        let grayRow = grayOrder[row];
        let grayCol = grayOrder[col];
        let cellIdx = grayRow * 4 + grayCol;
        kmapCells[cellIdx] = (kmapCells[cellIdx] + 1) % 3;
        return;
      }
    }
  }

  // Check buttons
  let btnY = drawHeight + 15;

  // BCD > 5 preset
  if (mouseX >= 30 && mouseX <= 120 && mouseY >= btnY && mouseY <= btnY + 25) {
    kmapCells = [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2];
  }

  // Clear
  if (mouseX >= 130 && mouseX <= 190 && mouseY >= btnY && mouseY <= btnY + 25) {
    kmapCells = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    showGroups = false;
  }

  // Show groups
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
