// K-Map Simplification Walkthrough MicroSim
// Simplify Boolean functions using K-map with preset selector
// Bloom Level: Apply (L3) - Apply K-map grouping and simplification
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 500;
let controlHeight = 90;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let currentStep = 0;
let totalSteps;
let currentPreset = 0;

let presetSelect;
let goButton;

const TITLE_BG = '#2196F3';
const STEP_BG = '#E3F2FD';
const HIGHLIGHT = '#FF9800';
const RESULT_BG = '#E8F5E9';
const GROUP1_COLOR = '#E91E63';
const GROUP2_COLOR = '#4CAF50';

// Active K-map values (set from preset)
let kmapValues;

let mintermNumbers = [
  [0, 1, 3, 2],
  [4, 5, 7, 6],
  [12, 13, 15, 14],
  [8, 9, 11, 10]
];

// --- Preset definitions ---

let presets = [
  {
    label: "F = \u03A3m(0,2,5,7,8,10,13,15)",
    mintermStr: "\u03A3m(0,2,5,7,8,10,13,15)",
    finalExpr: "F = B'D' + BD",
    kmapValues: [
      [1, 0, 0, 1],  // AB=00: m0=1, m1=0, m3=0, m2=1
      [0, 1, 1, 0],  // AB=01: m4=0, m5=1, m7=1, m6=0
      [0, 1, 1, 0],  // AB=11: m12=0, m13=1, m15=1, m14=0
      [1, 0, 0, 1]   // AB=10: m8=1, m9=0, m11=0, m10=1
    ],
    steps: [
      {
        title: "Simplify F(A,B,C,D) = \u03A3m(0,2,5,7,8,10,13,15)",
        desc: "We will use a 4-variable Karnaugh Map to simplify this function.\nThe K-map lets us visually identify groups of adjacent 1s.",
        rule: "K-Map Simplification Method",
        visual: "intro",
        showValues: false,
        groups: [],
        groupCells: {}
      },
      {
        title: "Step 1: Draw the K-Map Grid",
        desc: "Set up a 4\u00D74 K-map with Gray code ordering on both axes.\nRows: AB (00, 01, 11, 10)  Columns: CD (00, 01, 11, 10)",
        rule: "Gray code ensures adjacent cells differ by 1 bit",
        visual: "kmap",
        showValues: false,
        groups: [],
        groupCells: {}
      },
      {
        title: "Step 2: Fill in the Minterms",
        desc: "Place 1 in cells for minterms {0,2,5,7,8,10,13,15}.\nAll other cells are 0.",
        rule: "Mark cells where F = 1",
        visual: "kmap",
        showValues: true,
        groups: [],
        groupCells: {}
      },
      {
        title: "Step 3: Identify Group 1",
        desc: "The four corners {m0, m2, m8, m10} form a group.\nK-maps wrap: top\u2194bottom and left\u2194right edges are adjacent.",
        rule: "K-map edges wrap around (toroidal)",
        visual: "kmap",
        showValues: true,
        groups: ["group1"],
        groupCells: {
          'group1': [[0,0],[0,3],[3,0],[3,3]]
        }
      },
      {
        title: "Step 4: Extract Term from Group 1",
        desc: "In cells {m0, m2, m8, m10}:\nA changes (0,0,1,1) \u2192 eliminate A\nB is always 0 \u2192 keep B'\nC changes \u2192 eliminate C\nD is always 0 \u2192 keep D'",
        rule: "Eliminate variables that change within group",
        visual: "kmap",
        showValues: true,
        groups: ["group1"],
        groupCells: {
          'group1': [[0,0],[0,3],[3,0],[3,3]]
        },
        term: "B'D'"
      },
      {
        title: "Step 5: Identify Group 2",
        desc: "Cells {m5, m7, m13, m15} form a 2\u00D72 block in the center.\nAll are adjacent \u2014 valid group of 4.",
        rule: "Groups must be powers of 2 (1, 2, 4, 8, 16)",
        visual: "kmap",
        showValues: true,
        groups: ["group1", "group2"],
        groupCells: {
          'group1': [[0,0],[0,3],[3,0],[3,3]],
          'group2': [[1,1],[1,2],[2,1],[2,2]]
        }
      },
      {
        title: "Step 6: Extract Term from Group 2",
        desc: "In cells {m5, m7, m13, m15}:\nA changes (0,0,1,1) \u2192 eliminate A\nB is always 1 \u2192 keep B\nC changes \u2192 eliminate C\nD is always 1 \u2192 keep D",
        rule: "Eliminate variables that change within group",
        visual: "kmap",
        showValues: true,
        groups: ["group1", "group2"],
        groupCells: {
          'group1': [[0,0],[0,3],[3,0],[3,3]],
          'group2': [[1,1],[1,2],[2,1],[2,2]]
        },
        term: "BD"
      },
      {
        title: "Result: Simplified Expression",
        desc: "F = B'D' + BD\nAll 1s are covered. The expression is minimized.\nNote: This equals B XNOR D (B \u2299 D).",
        rule: "OR the terms from all groups",
        visual: "result",
        showValues: true,
        groups: ["group1", "group2"],
        groupCells: {
          'group1': [[0,0],[0,3],[3,0],[3,3]],
          'group2': [[1,1],[1,2],[2,1],[2,2]]
        }
      }
    ]
  },
  {
    label: "F = \u03A3m(1,3,5,7,9,11,13,15)",
    mintermStr: "\u03A3m(1,3,5,7,9,11,13,15)",
    finalExpr: "F = D",
    kmapValues: [
      [0, 1, 1, 0],  // AB=00: m0=0, m1=1, m3=1, m2=0
      [0, 1, 1, 0],  // AB=01: m4=0, m5=1, m7=1, m6=0
      [0, 1, 1, 0],  // AB=11: m12=0, m13=1, m15=1, m14=0
      [0, 1, 1, 0]   // AB=10: m8=0, m9=1, m11=1, m10=0
    ],
    steps: [
      {
        title: "Simplify F(A,B,C,D) = \u03A3m(1,3,5,7,9,11,13,15)",
        desc: "We will use a 4-variable Karnaugh Map to simplify this function.\nAll odd-numbered minterms are included.",
        rule: "K-Map Simplification Method",
        visual: "intro",
        showValues: false,
        groups: [],
        groupCells: {}
      },
      {
        title: "Step 1: Draw the K-Map Grid",
        desc: "Set up a 4\u00D74 K-map with Gray code ordering on both axes.\nRows: AB (00, 01, 11, 10)  Columns: CD (00, 01, 11, 10)",
        rule: "Gray code ensures adjacent cells differ by 1 bit",
        visual: "kmap",
        showValues: false,
        groups: [],
        groupCells: {}
      },
      {
        title: "Step 2: Fill in the Minterms",
        desc: "Place 1 in cells for minterms {1,3,5,7,9,11,13,15}.\nAll other cells are 0. Notice the two middle columns are all 1s.",
        rule: "Mark cells where F = 1",
        visual: "kmap",
        showValues: true,
        groups: [],
        groupCells: {}
      },
      {
        title: "Step 3: Identify the Single Large Group",
        desc: "All eight 1s form one large group covering\ncolumns CD=01 and CD=11 across all rows.\nThis is a valid group of 8 (power of 2).",
        rule: "Larger groups yield simpler terms",
        visual: "kmap",
        showValues: true,
        groups: ["group1"],
        groupCells: {
          'group1': [[0,1],[0,2],[1,1],[1,2],[2,1],[2,2],[3,1],[3,2]]
        }
      },
      {
        title: "Step 4: Extract Term from Group",
        desc: "In the group of 8 cells:\nA changes \u2192 eliminate A\nB changes \u2192 eliminate B\nC changes \u2192 eliminate C\nD is always 1 \u2192 keep D",
        rule: "Eliminate variables that change within group",
        visual: "kmap",
        showValues: true,
        groups: ["group1"],
        groupCells: {
          'group1': [[0,1],[0,2],[1,1],[1,2],[2,1],[2,2],[3,1],[3,2]]
        },
        term: "D"
      },
      {
        title: "Result: Simplified Expression",
        desc: "F = D\nAll 1s are covered by a single group of 8.\nThe function depends only on variable D.",
        rule: "OR the terms from all groups",
        visual: "result",
        showValues: true,
        groups: ["group1"],
        groupCells: {
          'group1': [[0,1],[0,2],[1,1],[1,2],[2,1],[2,2],[3,1],[3,2]]
        }
      }
    ]
  },
  {
    label: "F = \u03A3m(0,4,8,12)",
    mintermStr: "\u03A3m(0,4,8,12)",
    finalExpr: "F = C'D'",
    kmapValues: [
      [1, 0, 0, 0],  // AB=00: m0=1, m1=0, m3=0, m2=0
      [1, 0, 0, 0],  // AB=01: m4=1, m5=0, m7=0, m6=0
      [1, 0, 0, 0],  // AB=11: m12=1, m13=0, m15=0, m14=0
      [1, 0, 0, 0]   // AB=10: m8=1, m9=0, m11=0, m10=0
    ],
    steps: [
      {
        title: "Simplify F(A,B,C,D) = \u03A3m(0,4,8,12)",
        desc: "We will use a 4-variable Karnaugh Map to simplify this function.\nThese minterms all have C=0 and D=0.",
        rule: "K-Map Simplification Method",
        visual: "intro",
        showValues: false,
        groups: [],
        groupCells: {}
      },
      {
        title: "Step 1: Draw the K-Map Grid",
        desc: "Set up a 4\u00D74 K-map with Gray code ordering on both axes.\nRows: AB (00, 01, 11, 10)  Columns: CD (00, 01, 11, 10)",
        rule: "Gray code ensures adjacent cells differ by 1 bit",
        visual: "kmap",
        showValues: false,
        groups: [],
        groupCells: {}
      },
      {
        title: "Step 2: Fill in the Minterms",
        desc: "Place 1 in cells for minterms {0,4,8,12}.\nAll other cells are 0. Notice only column CD=00 has 1s.",
        rule: "Mark cells where F = 1",
        visual: "kmap",
        showValues: true,
        groups: [],
        groupCells: {}
      },
      {
        title: "Step 3: Identify the Column Group",
        desc: "All four 1s in column CD=00 form a group.\n{m0, m4, m12, m8} \u2014 a valid group of 4 (power of 2).",
        rule: "Groups must be powers of 2 (1, 2, 4, 8, 16)",
        visual: "kmap",
        showValues: true,
        groups: ["group1"],
        groupCells: {
          'group1': [[0,0],[1,0],[2,0],[3,0]]
        }
      },
      {
        title: "Step 4: Extract Term from Group",
        desc: "In the group of 4 cells:\nA changes \u2192 eliminate A\nB changes \u2192 eliminate B\nC is always 0 \u2192 keep C'\nD is always 0 \u2192 keep D'",
        rule: "Eliminate variables that change within group",
        visual: "kmap",
        showValues: true,
        groups: ["group1"],
        groupCells: {
          'group1': [[0,0],[1,0],[2,0],[3,0]]
        },
        term: "C'D'"
      },
      {
        title: "Result: Simplified Expression",
        desc: "F = C'D'\nAll 1s are covered by a single group of 4.\nThe function depends only on variables C and D.",
        rule: "OR the terms from all groups",
        visual: "result",
        showValues: true,
        groups: ["group1"],
        groupCells: {
          'group1': [[0,0],[1,0],[2,0],[3,0]]
        }
      }
    ]
  }
];

// Load a preset into the active state
function loadPreset(index) {
  currentPreset = index;
  let p = presets[index];
  kmapValues = p.kmapValues.map(function(row) { return row.slice(); });
  steps = p.steps;
  totalSteps = steps.length;
  currentStep = 0;
}

let steps; // will be set by loadPreset

function setup() {
  updateCanvasSize();
  loadPreset(0);
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  // Create preset dropdown
  presetSelect = createSelect();
  presetSelect.parent(mainElement);
  for (let i = 0; i < presets.length; i++) {
    presetSelect.option(presets[i].label, i);
  }
  presetSelect.style('font-size', '13px');
  presetSelect.style('padding', '4px 6px');
  presetSelect.style('border-radius', '4px');
  presetSelect.style('border', '1px solid #999');

  // Create Go button
  goButton = createButton('Go');
  goButton.parent(mainElement);
  goButton.style('font-size', '13px');
  goButton.style('padding', '4px 12px');
  goButton.style('border-radius', '4px');
  goButton.style('border', '1px solid #999');
  goButton.style('background', '#1976D2');
  goButton.style('color', '#fff');
  goButton.style('cursor', 'pointer');
  goButton.mousePressed(handleGo);

  positionUIElements();
  describe('K-map simplification walkthrough for a 4-variable function with preset selector', LABEL);
}

function positionUIElements() {
  let margin = 15;
  let labelWidth = 62; // approximate width of 'Function:' text
  let selectX = margin + labelWidth;
  let selectY = drawHeight + 6;
  let selectW = canvasWidth - margin * 2 - labelWidth - 60;

  presetSelect.position(selectX, selectY);
  presetSelect.style('width', selectW + 'px');

  goButton.position(selectX + selectW + 6, selectY);
}

function handleGo() {
  let idx = parseInt(presetSelect.value());
  loadPreset(idx);
}

function draw() {
  updateCanvasSize();
  background(255);

  let step = steps[currentStep];
  let margin = 15;
  let w = canvasWidth - 2 * margin;

  // Title bar
  fill(TITLE_BG);
  noStroke();
  rect(margin, margin, w, 40, 5);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(15);
  textStyle(BOLD);
  text(step.title, canvasWidth / 2, margin + 20);

  // Step indicator
  fill(100);
  textSize(12);
  textStyle(NORMAL);
  textAlign(RIGHT, TOP);
  text('Step ' + (currentStep + 1) + ' of ' + totalSteps, canvasWidth - margin - 5, margin + 50);

  // Progress bar
  let progY = margin + 48;
  fill(220);
  rect(margin, progY, w, 6, 3);
  fill(TITLE_BG);
  rect(margin, progY, w * (currentStep + 1) / totalSteps, 6, 3);

  // Rule label
  fill(HIGHLIGHT);
  noStroke();
  let ruleY = margin + 65;
  textSize(11);
  textStyle(BOLD);
  let rw = textWidth(step.rule) + 20;
  rw = max(rw, 100);
  rect(canvasWidth / 2 - rw / 2, ruleY, rw, 24, 12);
  fill(255);
  textAlign(CENTER, CENTER);
  text(step.rule, canvasWidth / 2, ruleY + 12);

  // Visual area
  let visY = ruleY + 40;
  let visH = drawHeight - visY - 70;
  fill(STEP_BG);
  stroke(200);
  strokeWeight(1);
  rect(margin, visY, w, visH, 5);
  noStroke();

  if (step.visual === 'intro') {
    drawIntro(margin, visY, w, visH);
  } else if (step.visual === 'kmap') {
    drawKmap(margin, visY, w, visH, step);
  } else if (step.visual === 'result') {
    drawResult(margin, visY, w, visH, step);
  }

  // Description
  let descY = drawHeight - 62;
  fill(60);
  textAlign(LEFT, TOP);
  textSize(12);
  textStyle(NORMAL);
  let lines = step.desc.split('\n');
  for (let i = 0; i < lines.length; i++) {
    text(lines[i], margin + 10, descY + i * 15);
  }

  // Preset selector label
  fill(60);
  textAlign(LEFT, CENTER);
  textSize(13);
  textStyle(BOLD);
  text('Function:', margin, drawHeight + 18);

  drawButtons();
}

function drawIntro(mx, vy, w, vh) {
  let cx = canvasWidth / 2;
  let p = presets[currentPreset];
  fill(60);
  textAlign(CENTER, CENTER);
  textSize(18);
  textStyle(BOLD);
  text('F(A,B,C,D) = ' + p.mintermStr, cx, vy + 40);
  textSize(14);
  textStyle(NORMAL);
  fill(100);
  let count = 0;
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (kmapValues[r][c] === 1) count++;
    }
  }
  text(count + ' minterms out of 16 possible', cx, vy + 70);
  text('Use a 4-variable K-map to find the', cx, vy + 100);
  text('minimum SOP expression', cx, vy + 118);
  fill(HIGHLIGHT);
  textSize(13);
  text('Click "Next \u2192" to begin', cx, vy + vh - 20);
}

// Helper: check if cell [r,c] is in a group's cell list
function cellInGroup(groupCells, r, c) {
  if (!groupCells) return false;
  for (let i = 0; i < groupCells.length; i++) {
    if (groupCells[i][0] === r && groupCells[i][1] === c) return true;
  }
  return false;
}

function drawKmap(mx, vy, w, vh, step) {
  let cellSize = min(55, (w - 100) / 4);
  let gridW = cellSize * 4;
  let gridH = cellSize * 4;
  let gridX = mx + (w - gridW) / 2 + 20;
  let gridY = vy + 40;

  let abLabels = ['00', '01', '11', '10'];
  let cdLabels = ['00', '01', '11', '10'];

  // AB label
  fill(60);
  textAlign(CENTER, CENTER);
  textSize(12);
  textStyle(BOLD);
  text('AB', gridX - 25, gridY - 25);

  // CD label
  text('CD', gridX + gridW / 2, gridY - 25);

  // Column headers
  textSize(11);
  textStyle(NORMAL);
  for (let c = 0; c < 4; c++) {
    text(cdLabels[c], gridX + c * cellSize + cellSize / 2, gridY - 10);
  }

  // Row headers
  for (let r = 0; r < 4; r++) {
    textAlign(RIGHT, CENTER);
    text(abLabels[r], gridX - 8, gridY + r * cellSize + cellSize / 2);
  }

  // Draw group highlight outlines BEHIND cells
  let gc = step.groupCells || {};
  for (let gi = 0; gi < step.groups.length; gi++) {
    let gName = step.groups[gi];
    let gColor = (gi === 0) ? GROUP1_COLOR : GROUP2_COLOR;
    let cells = gc[gName];
    if (!cells || cells.length === 0) continue;

    stroke(gColor);
    strokeWeight(3);
    noFill();

    // Check if this is a wrap-around group (corners)
    let isWrap = isWrapGroup(cells);
    if (isWrap) {
      // Draw arcs at corners for wrap-around groups
      let minR = 4, maxR = -1, minC = 4, maxC = -1;
      for (let k = 0; k < cells.length; k++) {
        if (cells[k][0] < minR) minR = cells[k][0];
        if (cells[k][0] > maxR) maxR = cells[k][0];
        if (cells[k][1] < minC) minC = cells[k][1];
        if (cells[k][1] > maxC) maxC = cells[k][1];
      }
      // Four corners case
      if (minR === 0 && maxR === 3 && minC === 0 && maxC === 3) {
        arc(gridX, gridY, cellSize, cellSize, 0, HALF_PI);
        arc(gridX + gridW, gridY, cellSize, cellSize, HALF_PI, PI);
        arc(gridX + gridW, gridY + gridH, cellSize, cellSize, PI, PI + HALF_PI);
        arc(gridX, gridY + gridH, cellSize, cellSize, PI + HALF_PI, TWO_PI);
      } else {
        // Generic wrap: draw bounding rect fallback
        drawGroupRect(cells, gridX, gridY, cellSize);
      }
    } else {
      drawGroupRect(cells, gridX, gridY, cellSize);
    }
    noStroke();
  }

  // Draw cells
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      let x = gridX + c * cellSize;
      let y = gridY + r * cellSize;
      let val = kmapValues[r][c];

      // Cell background based on group membership
      let cellColor = color(255);
      for (let gi = step.groups.length - 1; gi >= 0; gi--) {
        let gName = step.groups[gi];
        let cells = gc[gName];
        if (cells && cellInGroup(cells, r, c) && val === 1) {
          if (gi === 0) {
            cellColor = color(255, 200, 200, 150);
          } else {
            cellColor = color(200, 255, 200, 150);
          }
          break;
        }
      }
      fill(cellColor);
      stroke(180);
      strokeWeight(1);
      rect(x, y, cellSize, cellSize);
      noStroke();

      // Cell value
      if (step.showValues) {
        fill(val === 1 ? '#1B5E20' : '#BDBDBD');
        textAlign(CENTER, CENTER);
        textSize(16);
        textStyle(BOLD);
        text(val, x + cellSize / 2, y + cellSize / 2);
      }

      // Minterm number (small, in corner)
      fill(180);
      textSize(8);
      textStyle(NORMAL);
      textAlign(LEFT, TOP);
      text('m' + mintermNumbers[r][c], x + 2, y + 2);
    }
  }

  // Show extracted term if present
  if (step.term) {
    let lastGroup = step.groups[step.groups.length - 1];
    let gi = step.groups.indexOf(lastGroup);
    let termColor = (gi === 0) ? GROUP1_COLOR : GROUP2_COLOR;
    fill(termColor);
    textAlign(CENTER, CENTER);
    textSize(16);
    textStyle(BOLD);
    text('\u2192 ' + step.term, gridX + gridW + 40, gridY + gridH / 2);
  }
}

// Check if a group wraps around edges
function isWrapGroup(cells) {
  let rows = new Set();
  let cols = new Set();
  for (let i = 0; i < cells.length; i++) {
    rows.add(cells[i][0]);
    cols.add(cells[i][1]);
  }
  // Wraps if contains both row 0 and row 3 but not rows 1,2
  // or contains both col 0 and col 3 but not cols 1,2
  let rowWrap = rows.has(0) && rows.has(3) && !rows.has(1) && !rows.has(2);
  let colWrap = cols.has(0) && cols.has(3) && !cols.has(1) && !cols.has(2);
  return rowWrap || colWrap;
}

// Draw a rounded rectangle around a contiguous group of cells
function drawGroupRect(cells, gridX, gridY, cellSize) {
  let minR = 4, maxR = -1, minC = 4, maxC = -1;
  for (let k = 0; k < cells.length; k++) {
    if (cells[k][0] < minR) minR = cells[k][0];
    if (cells[k][0] > maxR) maxR = cells[k][0];
    if (cells[k][1] < minC) minC = cells[k][1];
    if (cells[k][1] > maxC) maxC = cells[k][1];
  }
  let rx = gridX + minC * cellSize + 3;
  let ry = gridY + minR * cellSize + 3;
  let rw = (maxC - minC + 1) * cellSize - 6;
  let rh = (maxR - minR + 1) * cellSize - 6;
  rect(rx, ry, rw, rh, 8);
}

function drawResult(mx, vy, w, vh, step) {
  let cx = canvasWidth / 2;
  let p = presets[currentPreset];
  let gc = step.groupCells || {};

  // Draw mini K-map
  let cellSize = 35;
  let gridW = cellSize * 4;
  let gridX = mx + (w - gridW) / 2 + 15;
  let gridY = vy + 15;

  // Simplified K-map
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      let x = gridX + c * cellSize;
      let y = gridY + r * cellSize;
      let val = kmapValues[r][c];

      // Determine cell highlight color from groups
      let cellFill = 255;
      for (let gi = step.groups.length - 1; gi >= 0; gi--) {
        let gName = step.groups[gi];
        let cells = gc[gName];
        if (cells && cellInGroup(cells, r, c) && val === 1) {
          cellFill = (gi === 0) ? '#FFCDD2' : '#C8E6C9';
          break;
        }
      }
      fill(cellFill);
      stroke(180); strokeWeight(1);
      rect(x, y, cellSize, cellSize);
      noStroke();
      fill(val === 1 ? '#1B5E20' : '#BDBDBD');
      textAlign(CENTER, CENTER);
      textSize(14); textStyle(BOLD);
      text(val, x + cellSize / 2, y + cellSize / 2);
    }
  }

  // Result box
  let resY = gridY + cellSize * 4 + 15;
  fill(RESULT_BG);
  stroke('#4CAF50'); strokeWeight(2);
  rect(mx + 20, resY, w - 40, 45, 8);
  noStroke();
  fill('#1B5E20');
  textAlign(CENTER, CENTER);
  textSize(20); textStyle(BOLD);
  text(p.finalExpr, cx, resY + 22);
}

function drawButtons() {
  let btnY = drawHeight + 48;
  let btnW = 90;
  let btnH = 34;
  let gap = 10;
  let totalW = btnW * 3 + gap * 2;
  let startX = (canvasWidth - totalW) / 2;

  let prevEnabled = currentStep > 0;
  fill(prevEnabled ? '#1976D2' : '#BDBDBD');
  noStroke();
  rect(startX, btnY, btnW, btnH, 5);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(14); textStyle(BOLD);
  text('\u2190 Previous', startX + btnW / 2, btnY + btnH / 2);

  fill('#757575');
  rect(startX + btnW + gap, btnY, btnW, btnH, 5);
  fill(255);
  text('Reset', startX + btnW + gap + btnW / 2, btnY + btnH / 2);

  let nextEnabled = currentStep < totalSteps - 1;
  fill(nextEnabled ? '#388E3C' : '#BDBDBD');
  rect(startX + 2 * (btnW + gap), btnY, btnW, btnH, 5);
  fill(255);
  text('Next \u2192', startX + 2 * (btnW + gap) + btnW / 2, btnY + btnH / 2);
}

function mousePressed() {
  let btnY = drawHeight + 48;
  let btnW = 90;
  let btnH = 34;
  let gap = 10;
  let totalW = btnW * 3 + gap * 2;
  let startX = (canvasWidth - totalW) / 2;

  if (mouseY >= btnY && mouseY <= btnY + btnH) {
    if (mouseX >= startX && mouseX <= startX + btnW && currentStep > 0) {
      currentStep--;
    } else if (mouseX >= startX + btnW + gap && mouseX <= startX + 2 * btnW + gap) {
      currentStep = 0;
    } else if (mouseX >= startX + 2 * (btnW + gap) && mouseX <= startX + 2 * (btnW + gap) + btnW && currentStep < totalSteps - 1) {
      currentStep++;
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
