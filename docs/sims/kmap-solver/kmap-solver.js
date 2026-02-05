// K-Map Solver MicroSim
// Interactive K-map simplification for 2-4 variables
// Bloom Level: Analyze (L4) - Identify, classify, simplify
// MicroSim template version 2026.02

// Canvas dimensions
let containerWidth;
let canvasWidth = 400;
let drawHeight = 470;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

// Margins
let margin = 20;
let defaultTextSize = 14;

// UI Elements
let numVarsSelect;
let solveButton;
let clearButton;

// K-map state
let numVars = 3;
let cells = [];
let groups = [];
let expression = '';
let varNames = ['A', 'B', 'C', 'D'];

// Group colors
const groupColors = [
  [66, 133, 244, 100],   // Blue
  [234, 67, 53, 100],    // Red
  [251, 188, 4, 100],    // Yellow
  [52, 168, 83, 100],    // Green
  [153, 0, 255, 100],    // Purple
  [255, 109, 0, 100],    // Orange
  [0, 188, 212, 100],    // Cyan
  [233, 30, 99, 100]     // Pink
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  textSize(defaultTextSize);

  // Create variable count selector
  numVarsSelect = createSelect();
  numVarsSelect.option('2 variables', 2);
  numVarsSelect.option('3 variables', 3);
  numVarsSelect.option('4 variables', 4);
  numVarsSelect.selected('3 variables');
  numVarsSelect.changed(handleVarsChange);

  // Create solve button
  solveButton = createButton('Solve');
  solveButton.mousePressed(handleSolve);

  // Create clear button
  clearButton = createButton('Clear');
  clearButton.mousePressed(handleClear);

  positionUIElements();

  initializeCells();

  describe('Interactive K-map solver for Boolean function simplification', LABEL);
}

function positionUIElements() {
  let mainRect = document.querySelector('main').getBoundingClientRect();
  numVarsSelect.position(mainRect.left + 100, mainRect.top + drawHeight + 15);
  solveButton.position(mainRect.left + 250, mainRect.top + drawHeight + 15);
  clearButton.position(mainRect.left + 310, mainRect.top + drawHeight + 15);
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
  text('K-Map Solver', canvasWidth / 2, 10);

  // Instructions
  textSize(12);
  fill('#666');
  text('Click cells to toggle: 0 → 1 → X → 0', canvasWidth / 2, 35);

  // Draw K-map
  drawKmap();

  // Draw expression
  drawExpression();

  // Control labels
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Variables:', 20, drawHeight + 25);
  text('Click cells, then Solve', 20, drawHeight + 55);
}

function drawKmap() {
  let cellSize = 50;
  let startX, startY;
  let rows, cols;
  let rowLabels, colLabels;
  let rowVars, colVars;

  if (numVars === 2) {
    rows = 2; cols = 2;
    rowLabels = ['0', '1'];
    colLabels = ['0', '1'];
    rowVars = 'A';
    colVars = 'B';
    startX = canvasWidth / 2 - cellSize;
    startY = 90;
  } else if (numVars === 3) {
    rows = 2; cols = 4;
    rowLabels = ['0', '1'];
    colLabels = ['00', '01', '11', '10'];
    rowVars = 'A';
    colVars = 'BC';
    startX = canvasWidth / 2 - cellSize * 2;
    startY = 90;
  } else {
    rows = 4; cols = 4;
    rowLabels = ['00', '01', '11', '10'];
    colLabels = ['00', '01', '11', '10'];
    rowVars = 'AB';
    colVars = 'CD';
    startX = canvasWidth / 2 - cellSize * 2;
    startY = 80;
  }

  // Draw column labels
  fill('black');
  noStroke();
  textAlign(CENTER, BOTTOM);
  textSize(12);
  text(colVars, startX + cols * cellSize / 2, startY - 25);

  textSize(11);
  for (let c = 0; c < cols; c++) {
    text(colLabels[c], startX + c * cellSize + cellSize / 2, startY - 5);
  }

  // Draw row labels
  textAlign(RIGHT, CENTER);
  text(rowVars, startX - 25, startY + rows * cellSize / 2);

  for (let r = 0; r < rows; r++) {
    text(rowLabels[r], startX - 8, startY + r * cellSize + cellSize / 2);
  }

  // Draw group highlights (behind cells)
  for (let g = 0; g < groups.length; g++) {
    drawGroup(groups[g], startX, startY, cellSize, rows, cols, g);
  }

  // Draw cells
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let idx = getCellIndex(r, c, rows, cols);
      let x = startX + c * cellSize;
      let y = startY + r * cellSize;
      let value = cells[idx];

      // Cell background
      fill('white');
      stroke('#333');
      strokeWeight(1);
      rect(x, y, cellSize, cellSize);

      // Cell value
      noStroke();
      if (value === 1) {
        fill('#4CAF50');
      } else if (value === 'X') {
        fill('#ff9800');
      } else {
        fill('#ccc');
      }
      textAlign(CENTER, CENTER);
      textSize(18);
      text(value === 'X' ? 'X' : value, x + cellSize / 2, y + cellSize / 2);

      // Minterm index
      fill('#999');
      textSize(9);
      textAlign(RIGHT, BOTTOM);
      text(idx, x + cellSize - 3, y + cellSize - 3);
    }
  }

  // Draw prime implicants legend
  if (groups.length > 0) {
    drawLegend(startY + rows * cellSize + 20);
  }
}

function drawGroup(group, startX, startY, cellSize, rows, cols, colorIdx) {
  if (group.cells.length === 0) return;

  let color = groupColors[colorIdx % groupColors.length];

  // Find bounding box in K-map coordinates
  let minR = Infinity, maxR = -Infinity;
  let minC = Infinity, maxC = -Infinity;

  // Check for wrap-around
  let rowSet = new Set();
  let colSet = new Set();

  for (let cellIdx of group.cells) {
    let { row, col } = getRowCol(cellIdx, rows, cols);
    rowSet.add(row);
    colSet.add(col);
  }

  // Simple rectangular drawing (not handling wrap for simplicity)
  for (let cellIdx of group.cells) {
    let { row, col } = getRowCol(cellIdx, rows, cols);
    if (row < minR) minR = row;
    if (row > maxR) maxR = row;
    if (col < minC) minC = col;
    if (col > maxC) maxC = col;
  }

  // Draw rounded rectangle around the group
  fill(color[0], color[1], color[2], color[3]);
  stroke(color[0], color[1], color[2]);
  strokeWeight(3);

  let padding = 4;
  let x = startX + minC * cellSize + padding;
  let y = startY + minR * cellSize + padding;
  let w = (maxC - minC + 1) * cellSize - padding * 2;
  let h = (maxR - minR + 1) * cellSize - padding * 2;

  rect(x, y, w, h, 8);
}

function drawLegend(startY) {
  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);
  text('Prime Implicants:', margin, startY);

  let y = startY + 18;
  for (let i = 0; i < groups.length; i++) {
    let color = groupColors[i % groupColors.length];

    // Color box
    fill(color[0], color[1], color[2], 200);
    stroke(color[0], color[1], color[2]);
    strokeWeight(2);
    rect(margin, y, 15, 15, 3);

    // Term
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(11);
    text(groups[i].term, margin + 22, y + 7);

    y += 20;
    if (y > drawHeight - 80) break;
  }
}

function drawExpression() {
  let y = numVars === 4 ? 370 : 340;

  fill(240);
  stroke('silver');
  strokeWeight(1);
  rect(margin, y, canvasWidth - 2 * margin, 60, 5);

  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);
  text('Minimal SOP Expression:', margin + 10, y + 8);

  textSize(14);
  if (expression) {
    text('F = ' + expression, margin + 10, y + 28);
  } else {
    fill('#999');
    text('Click "Solve" to find minimal expression', margin + 10, y + 28);
  }

  // Stats
  textSize(10);
  fill('#666');
  let onesCount = cells.filter(c => c === 1).length;
  let dcCount = cells.filter(c => c === 'X').length;
  text(`Ones: ${onesCount}  Don't cares: ${dcCount}  Groups: ${groups.length}`, margin + 10, y + 46);
}

function initializeCells() {
  let totalCells = Math.pow(2, numVars);
  cells = new Array(totalCells).fill(0);
  groups = [];
  expression = '';
}

function getCellIndex(row, col, rows, cols) {
  // Convert K-map position to minterm index
  // Gray code ordering for columns: 00, 01, 11, 10
  let grayCol = [0, 1, 3, 2];
  let grayRow = [0, 1, 3, 2];

  if (numVars === 2) {
    return row * 2 + col;
  } else if (numVars === 3) {
    return row * 4 + grayCol[col];
  } else {
    return grayRow[row] * 4 + grayCol[col];
  }
}

function getRowCol(idx, rows, cols) {
  // Convert minterm index to K-map position
  if (numVars === 2) {
    return { row: Math.floor(idx / 2), col: idx % 2 };
  } else if (numVars === 3) {
    let grayColInv = [0, 1, 3, 2];
    return { row: Math.floor(idx / 4), col: grayColInv[idx % 4] };
  } else {
    let grayInv = [0, 1, 3, 2];
    return { row: grayInv[Math.floor(idx / 4)], col: grayInv[idx % 4] };
  }
}

function handleVarsChange() {
  numVars = parseInt(numVarsSelect.value());
  initializeCells();
}

function handleSolve() {
  groups = [];
  expression = '';

  // Get minterms (1s and Xs treated as 1s for grouping)
  let ones = [];
  let dontCares = [];

  for (let i = 0; i < cells.length; i++) {
    if (cells[i] === 1) ones.push(i);
    else if (cells[i] === 'X') dontCares.push(i);
  }

  if (ones.length === 0) {
    expression = '0';
    return;
  }

  if (ones.length + dontCares.length === cells.length) {
    expression = '1';
    return;
  }

  // Simple greedy algorithm for finding prime implicants
  let covered = new Set();
  let allOnes = [...ones, ...dontCares];

  // Find all possible groups (powers of 2)
  let possibleGroups = findAllGroups(allOnes);

  // Sort by size (largest first) then by coverage of required minterms
  possibleGroups.sort((a, b) => {
    let aCoversRequired = a.filter(m => ones.includes(m)).length;
    let bCoversRequired = b.filter(m => ones.includes(m)).length;
    if (b.length !== a.length) return b.length - a.length;
    return bCoversRequired - aCoversRequired;
  });

  // Greedy selection
  let selectedGroups = [];
  for (let group of possibleGroups) {
    let coversNew = group.some(m => ones.includes(m) && !covered.has(m));
    if (coversNew) {
      selectedGroups.push(group);
      for (let m of group) {
        if (ones.includes(m)) covered.add(m);
      }
    }
    if (covered.size === ones.length) break;
  }

  // Convert groups to terms
  let terms = [];
  for (let group of selectedGroups) {
    let term = groupToTerm(group);
    groups.push({ cells: group, term: term });
    terms.push(term);
  }

  expression = terms.join(' + ') || '0';
}

function findAllGroups(minterms) {
  let groups = [];
  let n = cells.length;

  // Check all possible rectangular groups (powers of 2)
  let sizes = [1, 2, 4, 8, 16].filter(s => s <= n);

  for (let size of sizes) {
    // Generate all combinations of 'size' minterms
    let combos = getCombinations(minterms, size);

    for (let combo of combos) {
      if (isValidGroup(combo)) {
        groups.push(combo);
      }
    }
  }

  return groups;
}

function getCombinations(arr, size) {
  if (size === 1) return arr.map(x => [x]);
  if (size > arr.length) return [];

  let result = [];

  function combine(start, current) {
    if (current.length === size) {
      result.push([...current]);
      return;
    }
    for (let i = start; i < arr.length; i++) {
      current.push(arr[i]);
      combine(i + 1, current);
      current.pop();
    }
  }

  combine(0, []);
  return result;
}

function isValidGroup(indices) {
  // A valid K-map group has all minterms differing in the same set of bit positions
  if (indices.length === 1) return true;

  let size = indices.length;
  if ((size & (size - 1)) !== 0) return false; // Must be power of 2

  // Check that the group forms a proper K-map rectangle
  // XOR all indices - result should have exactly log2(size) bits set
  let xorResult = indices.reduce((a, b) => a ^ b, 0);
  let bitsSet = 0;
  let temp = xorResult;
  while (temp) {
    bitsSet += temp & 1;
    temp >>= 1;
  }

  // For a valid group, each index should differ from others in exactly those bit positions
  // Check by masking
  let mask = xorResult;
  let base = indices[0] & ~mask;

  for (let idx of indices) {
    if ((idx & ~mask) !== base) return false;
  }

  // Verify all combinations of the varying bits are present
  let expectedCount = Math.pow(2, bitsSet);
  if (indices.length !== expectedCount) return false;

  let seen = new Set(indices.map(i => i & mask));
  return seen.size === expectedCount;
}

function groupToTerm(indices) {
  // Find which bits are constant across all indices in the group
  let allOnes = indices.reduce((a, b) => a & b, (1 << numVars) - 1);
  let allZeros = indices.reduce((a, b) => a | b, 0);

  let term = '';
  for (let i = 0; i < numVars; i++) {
    let bitPos = numVars - 1 - i;
    let isOne = (allOnes >> bitPos) & 1;
    let isZero = !((allZeros >> bitPos) & 1);

    if (isOne) {
      term += varNames[i];
    } else if (isZero) {
      term += varNames[i] + "'";
    }
    // If neither, the variable is eliminated
  }

  return term || '1';
}

function handleClear() {
  initializeCells();
}

function mousePressed() {
  // Check if clicking on a K-map cell
  let cellSize = 50;
  let startX, startY;
  let rows, cols;

  if (numVars === 2) {
    rows = 2; cols = 2;
    startX = canvasWidth / 2 - cellSize;
    startY = 90;
  } else if (numVars === 3) {
    rows = 2; cols = 4;
    startX = canvasWidth / 2 - cellSize * 2;
    startY = 90;
  } else {
    rows = 4; cols = 4;
    startX = canvasWidth / 2 - cellSize * 2;
    startY = 80;
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let x = startX + c * cellSize;
      let y = startY + r * cellSize;

      if (mouseX >= x && mouseX <= x + cellSize && mouseY >= y && mouseY <= y + cellSize) {
        let idx = getCellIndex(r, c, rows, cols);

        // Cycle through 0 -> 1 -> X -> 0
        if (cells[idx] === 0) {
          cells[idx] = 1;
        } else if (cells[idx] === 1) {
          cells[idx] = 'X';
        } else {
          cells[idx] = 0;
        }

        // Clear groups when cells change
        groups = [];
        expression = '';
        return;
      }
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
