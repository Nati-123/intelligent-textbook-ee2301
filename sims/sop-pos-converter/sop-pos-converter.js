// SOP-POS Converter MicroSim
// Convert between Sum of Products and Product of Sums forms
// Bloom Level: Apply (L3) - Apply conversion techniques
// MicroSim template version 2026.02
// All controls drawn on canvas — pill buttons only, no DOM elements.

let containerWidth;
let canvasWidth = 400;
let drawHeight = 860;
let canvasHeight = drawHeight;

// Theme colors (universal style template)
const PURPLE = '#6A5BFF';
const PURPLE_DARK = '#5A3EED';
const PURPLE_LIGHT = '#7A5CFF';
const PURPLE_BG = '#F4F0FF';
const PURPLE_BORDER = '#C9B9FF';
const GOLD = '#D4A017';

// Section-specific colors
const SOP_BG = '#E7F7E7';
const SOP_BORDER = '#81C784';
const SOP_TEXT = '#388E3C';
const SOP_DARK = '#1B5E20';

const POS_BG = '#FFE7E7';
const POS_BORDER = '#E57373';
const POS_TEXT = '#D32F2F';
const POS_DARK = '#B71C1C';

const CONVERT_BG = '#FFF2D9';
const CONVERT_BORDER = '#FFD54F';
const CONVERT_TEXT = '#E65100';

const TRUTH_BG = '#EEF4FF';
const TRUTH_BORDER = '#B8D4FF';

const BTN_INACTIVE = '#F6F6F6';
const BTN_INACTIVE_BORDER = '#E0E0E0';

let currentExample = 0;

let examples = [
  {
    name: 'F(A,B,C) = \u03A3m(1,2,5,6)',
    minterms: [1, 2, 5, 6],
    numVars: 3,
    vars: ['A', 'B', 'C']
  },
  {
    name: 'F(A,B,C) = \u03A3m(0,2,4,6)',
    minterms: [0, 2, 4, 6],
    numVars: 3,
    vars: ['A', 'B', 'C']
  },
  {
    name: 'F(A,B) = \u03A3m(1,3)',
    minterms: [1, 3],
    numVars: 2,
    vars: ['A', 'B']
  },
  {
    name: 'F(A,B,C,D) = \u03A3m(0,1,4,5,6,7)',
    minterms: [0, 1, 4, 5, 6, 7],
    numVars: 4,
    vars: ['A', 'B', 'C', 'D']
  }
];

// Layout constants
const MX = 30;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  describe('SOP to POS converter showing canonical form transformations');
}

function draw() {
  updateCanvasSize();

  // Card background
  fill(PURPLE_BG);
  stroke(PURPLE_BORDER);
  strokeWeight(1.5);
  rect(1, 1, canvasWidth - 2, drawHeight - 2, 14);

  // Title
  fill(PURPLE);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  textStyle(BOLD);
  text('SOP \u2194 POS Converter', canvasWidth / 2, 16);
  textStyle(NORMAL);

  // Subtitle
  textSize(13);
  fill('#555');
  text('Click an example below to see the conversion', canvasWidth / 2, 42);

  // Sections
  drawExampleSelector();
  drawFunctionSpec();
  drawSOPSection();
  drawConversionSection();
  drawPOSSection();
  drawTruthTable();
}

// ── Example selector (pill buttons at top) ──

function drawExampleSelector() {
  let y = 68;
  let bandW = canvasWidth - 2 * MX;

  fill('#FAFBFF');
  stroke(PURPLE_BORDER);
  strokeWeight(1.5);
  rect(MX, y, bandW, 46, 12);

  fill(PURPLE);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(11);
  textStyle(BOLD);
  text('Example:', MX + 14, y + 23);
  textStyle(NORMAL);

  let btnStartX = MX + 80;
  let btnW = (bandW - 100) / 4 - 6;
  let btnH = 28;
  let btnY = y + 9;

  for (let i = 0; i < examples.length; i++) {
    let bx = btnStartX + i * (btnW + 6);
    let isActive = (currentExample === i);

    if (isActive) {
      drawingContext.shadowColor = 'rgba(106,91,255,0.25)';
      drawingContext.shadowBlur = 4;
    }
    fill(isActive ? PURPLE : '#F0EDFF');
    stroke(isActive ? PURPLE_DARK : PURPLE_BORDER);
    strokeWeight(1.2);
    rect(bx, btnY, btnW, btnH, 6);
    drawingContext.shadowBlur = 0;

    fill(isActive ? 'white' : PURPLE);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(12);
    textStyle(BOLD);
    text((i + 1).toString(), bx + btnW / 2, btnY + btnH / 2);
    textStyle(NORMAL);
  }
}

// ── Function specification bar ──

function drawFunctionSpec() {
  let y = 128;
  let bandW = canvasWidth - 2 * MX;
  let example = examples[currentExample];

  drawingContext.shadowColor = 'rgba(106, 91, 255, 0.12)';
  drawingContext.shadowBlur = 8;
  drawingContext.shadowOffsetY = 2;

  fill('#E8F1FF');
  stroke('#B3D1FF');
  strokeWeight(1.5);
  rect(MX, y, bandW, 52, 12);

  drawingContext.shadowBlur = 0;
  drawingContext.shadowOffsetY = 0;

  fill(PURPLE);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(11);
  textStyle(BOLD);
  text('Function Definition', canvasWidth / 2, y + 8);
  textStyle(NORMAL);

  textSize(17);
  textStyle(BOLD);
  fill(PURPLE_DARK);
  text('F(' + example.vars.join(',') + ') = \u03A3m(' + example.minterms.join(', ') + ')', canvasWidth / 2, y + 26);
  textStyle(NORMAL);
}

// ── SOP Section ──

function drawSOPSection() {
  let y = 194;
  let bandW = canvasWidth - 2 * MX;
  let example = examples[currentExample];

  drawingContext.shadowColor = 'rgba(129, 199, 132, 0.2)';
  drawingContext.shadowBlur = 6;
  drawingContext.shadowOffsetY = 2;

  fill(SOP_BG);
  stroke(SOP_BORDER);
  strokeWeight(1.5);
  rect(MX, y, bandW, 110, 12);

  drawingContext.shadowBlur = 0;
  drawingContext.shadowOffsetY = 0;

  fill(SOP_TEXT);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(13);
  textStyle(BOLD);
  text('Sum of Products (SOP)', canvasWidth / 2, y + 12);
  textStyle(NORMAL);

  // Compact notation
  fill(SOP_DARK);
  textSize(15);
  textStyle(BOLD);
  text('F = \u03A3m(' + example.minterms.join(', ') + ')', canvasWidth / 2, y + 34);
  textStyle(NORMAL);

  // Build SOP expression
  let sopTerms = [];
  for (let m of example.minterms) {
    sopTerms.push(getMintermExpr(m, example.numVars, example.vars));
  }

  fill('#333');
  textSize(12);
  let sopLine1 = 'F = ' + sopTerms.slice(0, 3).join(' + ');
  text(sopLine1, canvasWidth / 2, y + 58);
  if (sopTerms.length > 3) {
    let sopLine2 = '    + ' + sopTerms.slice(3).join(' + ');
    text(sopLine2, canvasWidth / 2, y + 76);
  }

  fill('#666');
  textSize(10);
  text('OR of minterms (AND terms) — F = 1 rows', canvasWidth / 2, y + 94);
}

// ── Conversion Section ──

function drawConversionSection() {
  let y = 318;
  let bandW = canvasWidth - 2 * MX;
  let example = examples[currentExample];

  // Down arrow
  fill(CONVERT_TEXT);
  noStroke();
  let arrowX = canvasWidth / 2;
  triangle(arrowX, y - 2, arrowX - 12, y - 18, arrowX + 12, y - 18);

  drawingContext.shadowColor = 'rgba(255, 213, 79, 0.2)';
  drawingContext.shadowBlur = 6;
  drawingContext.shadowOffsetY = 2;

  fill(CONVERT_BG);
  stroke(CONVERT_BORDER);
  strokeWeight(1.5);
  rect(MX, y, bandW, 100, 12);

  drawingContext.shadowBlur = 0;
  drawingContext.shadowOffsetY = 0;

  fill(CONVERT_TEXT);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(13);
  textStyle(BOLD);
  text('Conversion', canvasWidth / 2, y + 10);
  textStyle(NORMAL);

  // Calculate maxterms
  let allTerms = [];
  for (let i = 0; i < Math.pow(2, example.numVars); i++) {
    allTerms.push(i);
  }
  let maxterms = allTerms.filter(t => !example.minterms.includes(t));

  fill('#444');
  textSize(11);
  textAlign(CENTER, TOP);
  text('All indices:  {' + allTerms.join(', ') + '}', canvasWidth / 2, y + 34);

  fill(SOP_DARK);
  text('Minterms (F=1):  {' + example.minterms.join(', ') + '}', canvasWidth / 2, y + 54);

  fill(POS_DARK);
  text('Maxterms (F=0):  {' + maxterms.join(', ') + '}', canvasWidth / 2, y + 74);
}

// ── POS Section ──

function drawPOSSection() {
  let y = 440;
  let bandW = canvasWidth - 2 * MX;
  let example = examples[currentExample];

  // Down arrow
  fill(CONVERT_TEXT);
  noStroke();
  let arrowX = canvasWidth / 2;
  triangle(arrowX, y - 2, arrowX - 12, y - 18, arrowX + 12, y - 18);

  // Calculate maxterms
  let allTerms = [];
  for (let i = 0; i < Math.pow(2, example.numVars); i++) {
    allTerms.push(i);
  }
  let maxterms = allTerms.filter(t => !example.minterms.includes(t));

  drawingContext.shadowColor = 'rgba(229, 115, 115, 0.2)';
  drawingContext.shadowBlur = 6;
  drawingContext.shadowOffsetY = 2;

  fill(POS_BG);
  stroke(POS_BORDER);
  strokeWeight(1.5);
  rect(MX, y, bandW, 110, 12);

  drawingContext.shadowBlur = 0;
  drawingContext.shadowOffsetY = 0;

  fill(POS_TEXT);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(13);
  textStyle(BOLD);
  text('Product of Sums (POS)', canvasWidth / 2, y + 12);
  textStyle(NORMAL);

  // Compact notation
  fill(POS_DARK);
  textSize(15);
  textStyle(BOLD);
  if (maxterms.length === 0) {
    text('F = 1 (no maxterms)', canvasWidth / 2, y + 34);
  } else {
    text('F = \u03A0M(' + maxterms.join(', ') + ')', canvasWidth / 2, y + 34);
  }
  textStyle(NORMAL);

  // Build POS expression
  if (maxterms.length > 0) {
    let posTerms = [];
    for (let M of maxterms) {
      posTerms.push('(' + getMaxtermExpr(M, example.numVars, example.vars) + ')');
    }

    fill('#333');
    textSize(12);
    let posStr = 'F = ' + posTerms.join(' \u00B7 ');
    if (posStr.length > 50) {
      text('F = ' + posTerms.slice(0, 2).join(' \u00B7 '), canvasWidth / 2, y + 58);
      if (posTerms.length > 2) {
        text('    \u00B7 ' + posTerms.slice(2).join(' \u00B7 '), canvasWidth / 2, y + 76);
      }
    } else {
      text(posStr, canvasWidth / 2, y + 58);
    }
  }

  fill('#666');
  textSize(10);
  text('AND of maxterms (OR terms) — F = 0 rows', canvasWidth / 2, y + 94);
}

// ── Truth Table ──

function drawTruthTable() {
  let y = 568;
  let bandW = canvasWidth - 2 * MX;
  let example = examples[currentExample];
  let n = example.numVars;
  let totalRows = Math.pow(2, n);

  let tableH = 36 + totalRows * 22 + 12;

  drawingContext.shadowColor = 'rgba(106, 91, 255, 0.08)';
  drawingContext.shadowBlur = 6;
  drawingContext.shadowOffsetY = 2;

  fill(TRUTH_BG);
  stroke(TRUTH_BORDER);
  strokeWeight(1.5);
  rect(MX, y, bandW, tableH, 12);

  drawingContext.shadowBlur = 0;
  drawingContext.shadowOffsetY = 0;

  fill(PURPLE);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(12);
  textStyle(BOLD);
  text('Truth Table', canvasWidth / 2, y + 10);
  textStyle(NORMAL);

  // Column layout
  let cols = n + 1; // variables + F
  let colW = Math.min(44, (bandW - 40) / cols);
  let tableW = cols * colW;
  let startX = canvasWidth / 2 - tableW / 2;
  let headerY = y + 32;

  // Header row
  fill(PURPLE);
  noStroke();
  rect(startX, headerY, tableW, 22, 4);

  fill('white');
  textAlign(CENTER, CENTER);
  textSize(12);
  textStyle(BOLD);
  for (let i = 0; i < n; i++) {
    text(example.vars[i], startX + i * colW + colW / 2, headerY + 11);
  }
  text('F', startX + n * colW + colW / 2, headerY + 11);
  textStyle(NORMAL);

  // Data rows
  let rowY = headerY + 22;
  for (let r = 0; r < totalRows; r++) {
    let binary = r.toString(2).padStart(n, '0');
    let fVal = example.minterms.includes(r) ? 1 : 0;

    // Row background
    if (fVal === 1) {
      fill('#E8F5E9');
    } else {
      fill(r % 2 === 0 ? '#FFFFFF' : '#F8F6FF');
    }
    noStroke();
    let rr = (r === totalRows - 1) ? 4 : 0;
    rect(startX, rowY, tableW, 22, 0, 0, rr, rr);

    textSize(11);
    textAlign(CENTER, CENTER);

    for (let i = 0; i < n; i++) {
      fill(binary[i] === '1' ? '#333' : '#888');
      text(binary[i], startX + i * colW + colW / 2, rowY + 11);
    }

    fill(fVal === 1 ? SOP_DARK : POS_DARK);
    textStyle(BOLD);
    text(fVal.toString(), startX + n * colW + colW / 2, rowY + 11);
    textStyle(NORMAL);

    rowY += 22;
  }

  // Border around table body
  noFill();
  stroke(TRUTH_BORDER);
  strokeWeight(1);
  rect(startX, headerY, tableW, 22 + totalRows * 22, 4);
}

// ── Helper functions ──

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
  return terms.join('+');
}

// ── Interaction ──

function mousePressed() {
  // Check example selector buttons
  let ey = 68 + 9;
  let bandW = canvasWidth - 2 * MX;
  let btnStartX = MX + 80;
  let btnW = (bandW - 100) / 4 - 6;
  let btnH = 28;

  for (let i = 0; i < examples.length; i++) {
    let bx = btnStartX + i * (btnW + 6);
    if (mouseX >= bx && mouseX <= bx + btnW && mouseY >= ey && mouseY <= ey + btnH) {
      currentExample = i;
      // Resize canvas for different variable counts
      let n = examples[currentExample].numVars;
      let totalRows = Math.pow(2, n);
      drawHeight = 568 + 36 + totalRows * 22 + 12 + 20;
      canvasHeight = drawHeight;
      resizeCanvas(containerWidth, canvasHeight);
      return;
    }
  }
}

// ── Canvas sizing ──

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
