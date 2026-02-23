// Minterm Visualizer MicroSim
// Visualize minterms and maxterms
// Bloom Level: Understand (L2) - Explain minterm/maxterm concepts
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 540;
let canvasHeight = drawHeight;

// Theme colors (universal style template)
const PURPLE = '#6A5BFF';
const PURPLE_DARK = '#5A3EED';
const PURPLE_LIGHT = '#7A5CFF';
const PURPLE_BG = '#F4F0FF';
const PURPLE_BORDER = '#C9B9FF';
const GOLD = '#D4A017';

// Section-specific colors
const HEADER_BG = '#E8F1FF';
const HEADER_BORDER = '#B3D1FF';
const TRUTH_BG = '#EEF4FF';
const TRUTH_BORDER = '#B8D4FF';
const MINTERM_BG = '#E7F7E7';
const MINTERM_BORDER = '#81C784';
const MAXTERM_BG = '#FFE7E7';
const MAXTERM_BORDER = '#E57373';
const RELATION_BG = '#FFF2D9';
const RELATION_BORDER = '#FFD54F';
const BTN_INACTIVE = '#F6F6F6';
const BTN_INACTIVE_BORDER = '#E0E0E0';

let numVars = 3;
let selectedMinterm = 3;

// Layout constants
const MX = 40; // horizontal margin

// Native HTML control references
let varsSelect, mintermSliderEl, sliderLabelEl, sliderValueEl;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  // Wire up native HTML controls
  varsSelect = document.getElementById('vars-select');
  mintermSliderEl = document.getElementById('minterm-slider');
  sliderLabelEl = document.getElementById('slider-label');
  sliderValueEl = document.getElementById('slider-value');

  // Variable count change
  varsSelect.addEventListener('change', onVarsChange);

  // Slider input (fires continuously while dragging)
  mintermSliderEl.addEventListener('input', onSliderChange);

  describe('Minterm and maxterm visualizer showing product and sum terms', LABEL);
}

// ── Event handlers ──

function onVarsChange() {
  numVars = parseInt(varsSelect.value);
  let maxVal = Math.pow(2, numVars) - 1;
  mintermSliderEl.max = maxVal;
  if (selectedMinterm > maxVal) {
    selectedMinterm = maxVal;
  }
  mintermSliderEl.value = selectedMinterm;
  syncSliderDisplay();
}

function onSliderChange() {
  selectedMinterm = parseInt(mintermSliderEl.value);
  syncSliderDisplay();
}

function onMintermButtonClick(index) {
  selectedMinterm = index;
  mintermSliderEl.value = index;
  syncSliderDisplay();
}

function syncSliderDisplay() {
  sliderLabelEl.textContent = 'm' + selectedMinterm + ':';
  sliderValueEl.textContent = selectedMinterm;
}

// ── Drawing ──

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
  textSize(18);
  textStyle(BOLD);
  text('Minterm & Maxterm Visualizer', canvasWidth / 2, 12);
  textStyle(NORMAL);

  // Subtitle
  textSize(12);
  fill('#555');
  text('Select a minterm to explore its product and sum terms', canvasWidth / 2, 35);

  // Draw sections
  drawBitDisplay();
  drawTruthTableRow();
  drawMintermMaxterm();
  drawMintermList();
}

function drawBitDisplay() {
  let y = 55;
  let bandW = canvasWidth - 2 * MX;
  let binary = selectedMinterm.toString(2).padStart(numVars, '0');
  let varNames = ['A', 'B', 'C', 'D'].slice(0, numVars);

  // Header box with soft shadow
  drawingContext.shadowColor = 'rgba(106, 91, 255, 0.12)';
  drawingContext.shadowBlur = 8;
  drawingContext.shadowOffsetY = 2;

  fill(HEADER_BG);
  stroke(HEADER_BORDER);
  strokeWeight(1.5);
  rect(MX, y, bandW, 78, 12);

  drawingContext.shadowBlur = 0;
  drawingContext.shadowOffsetY = 0;

  // Label
  fill(PURPLE);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(12);
  textStyle(BOLD);
  text('Minterm m' + selectedMinterm + '  (decimal ' + selectedMinterm + ')', canvasWidth / 2, y + 10);
  textStyle(NORMAL);

  // Bit circles with spacing
  let circleD = 36;
  let circleGap = 16;
  let totalW = numVars * circleD + (numVars - 1) * circleGap;
  let startX = canvasWidth / 2 - totalW / 2 + circleD / 2;

  for (let i = 0; i < numVars; i++) {
    let cx = startX + i * (circleD + circleGap);
    let cy = y + 42;
    let bit = binary[i];

    if (bit === '1') {
      drawingContext.shadowColor = 'rgba(76, 175, 80, 0.3)';
      drawingContext.shadowBlur = 6;
    } else {
      drawingContext.shadowColor = 'rgba(229, 115, 115, 0.3)';
      drawingContext.shadowBlur = 6;
    }

    fill(bit === '1' ? '#4CAF50' : '#EF5350');
    stroke(bit === '1' ? '#388E3C' : '#D32F2F');
    strokeWeight(1.5);
    ellipse(cx, cy, circleD, circleD);

    drawingContext.shadowBlur = 0;

    fill('white');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(16);
    textStyle(BOLD);
    text(bit, cx, cy);
    textStyle(NORMAL);

    fill('#555');
    textSize(11);
    textStyle(BOLD);
    text(varNames[i], cx, cy + circleD / 2 + 12);
    textStyle(NORMAL);
  }
}

function drawTruthTableRow() {
  let y = 145;
  let bandW = canvasWidth - 2 * MX;
  let binary = selectedMinterm.toString(2).padStart(numVars, '0');
  let varNames = ['A', 'B', 'C', 'D'].slice(0, numVars);

  fill(TRUTH_BG);
  stroke(TRUTH_BORDER);
  strokeWeight(1.5);
  rect(MX, y, bandW, 62, 12);

  fill(PURPLE);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(11);
  textStyle(BOLD);
  text('Truth Table Row', canvasWidth / 2, y + 8);
  textStyle(NORMAL);

  let colW = 36;
  let separatorW = 20;
  let totalTableW = numVars * colW + separatorW + colW;
  let tableStartX = canvasWidth / 2 - totalTableW / 2 + colW / 2;

  textSize(12);
  textStyle(BOLD);
  fill(PURPLE_DARK);
  textAlign(CENTER, TOP);

  for (let i = 0; i < numVars; i++) {
    text(varNames[i], tableStartX + i * colW, y + 26);
  }

  fill(PURPLE_BORDER);
  noStroke();
  let sepX = tableStartX + numVars * colW + separatorW / 2 - colW / 2 - 2;
  rect(sepX, y + 24, 1.5, 30, 1);

  fill(PURPLE_DARK);
  textAlign(CENTER, TOP);
  text('F', tableStartX + numVars * colW + separatorW, y + 26);

  textStyle(NORMAL);
  textSize(13);

  for (let i = 0; i < numVars; i++) {
    let bit = binary[i];
    fill(bit === '1' ? '#4CAF50' : '#EF5350');
    textStyle(BOLD);
    text(bit, tableStartX + i * colW, y + 43);
  }

  fill('#4CAF50');
  textStyle(BOLD);
  text('1', tableStartX + numVars * colW + separatorW, y + 43);
  textStyle(NORMAL);
}

function drawMintermMaxterm() {
  let y = 220;
  let bandW = canvasWidth - 2 * MX;
  let cardW = (bandW - 16) / 2;
  let cardH = 115;
  let binary = selectedMinterm.toString(2).padStart(numVars, '0');
  let varNames = ['A', 'B', 'C', 'D'].slice(0, numVars);

  // ── Minterm card (green) ──
  let leftX = MX;
  drawingContext.shadowColor = 'rgba(129, 199, 132, 0.2)';
  drawingContext.shadowBlur = 6;
  drawingContext.shadowOffsetY = 2;

  fill(MINTERM_BG);
  stroke(MINTERM_BORDER);
  strokeWeight(1.5);
  rect(leftX, y, cardW, cardH, 12);

  drawingContext.shadowBlur = 0;
  drawingContext.shadowOffsetY = 0;

  fill('#388E3C');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(12);
  textStyle(BOLD);
  text('Minterm (Product Term)', leftX + cardW / 2, y + 12);
  textStyle(NORMAL);

  let minterm = '';
  for (let i = 0; i < numVars; i++) {
    if (binary[i] === '0') {
      minterm += varNames[i] + "'";
    } else {
      minterm += varNames[i];
    }
    if (i < numVars - 1) minterm += ' \u00B7 ';
  }

  textSize(17);
  textStyle(BOLD);
  fill('#1B5E20');
  text('m' + selectedMinterm + ' = ' + minterm, leftX + cardW / 2, y + 40);
  textStyle(NORMAL);

  fill('#555');
  textSize(10);
  text('AND of literals', leftX + cardW / 2, y + 72);
  fill('#888');
  textSize(9);
  text('Complement if bit = 0', leftX + cardW / 2, y + 90);

  // ── Maxterm card (red) ──
  let rightX = MX + cardW + 16;
  drawingContext.shadowColor = 'rgba(229, 115, 115, 0.2)';
  drawingContext.shadowBlur = 6;
  drawingContext.shadowOffsetY = 2;

  fill(MAXTERM_BG);
  stroke(MAXTERM_BORDER);
  strokeWeight(1.5);
  rect(rightX, y, cardW, cardH, 12);

  drawingContext.shadowBlur = 0;
  drawingContext.shadowOffsetY = 0;

  fill('#D32F2F');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(12);
  textStyle(BOLD);
  text('Maxterm (Sum Term)', rightX + cardW / 2, y + 12);
  textStyle(NORMAL);

  let maxterm = '';
  for (let i = 0; i < numVars; i++) {
    if (binary[i] === '1') {
      maxterm += varNames[i] + "'";
    } else {
      maxterm += varNames[i];
    }
    if (i < numVars - 1) maxterm += ' + ';
  }

  textSize(17);
  textStyle(BOLD);
  fill('#B71C1C');
  text('M' + selectedMinterm + ' = ' + maxterm, rightX + cardW / 2, y + 40);
  textStyle(NORMAL);

  fill('#555');
  textSize(10);
  text('OR of literals', rightX + cardW / 2, y + 72);
  fill('#888');
  textSize(9);
  text('Complement if bit = 1', rightX + cardW / 2, y + 90);

  // ── Relationship bar (orange) ──
  let relY = y + cardH + 14;
  drawingContext.shadowColor = 'rgba(255, 213, 79, 0.2)';
  drawingContext.shadowBlur = 6;
  drawingContext.shadowOffsetY = 2;

  fill(RELATION_BG);
  stroke(RELATION_BORDER);
  strokeWeight(1.5);
  rect(MX, relY, bandW, 48, 12);

  drawingContext.shadowBlur = 0;
  drawingContext.shadowOffsetY = 0;

  fill('#E65100');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(10);
  textStyle(BOLD);
  text('Relationship', canvasWidth / 2, relY + 6);
  textStyle(NORMAL);

  textSize(14);
  textStyle(BOLD);
  fill('#BF360C');
  textAlign(CENTER, CENTER);
  text("m" + selectedMinterm + " = (M" + selectedMinterm + ")'     M" + selectedMinterm + " = (m" + selectedMinterm + ")'", canvasWidth / 2, relY + 32);
  textStyle(NORMAL);
}

function drawMintermList() {
  let y = 400;
  let bandW = canvasWidth - 2 * MX;
  let maxMinterms = Math.pow(2, numVars);

  fill('#FAFAFA');
  stroke(PURPLE_BORDER);
  strokeWeight(1.5);
  rect(MX, y, bandW, 128, 12);

  fill(PURPLE);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(11);
  textStyle(BOLD);
  text('All Minterms (click to select)', canvasWidth / 2, y + 10);
  textStyle(NORMAL);

  let cols = numVars === 4 ? 8 : (numVars === 3 ? 4 : 2);
  let gridPadX = 20;
  let gridPadY = 30;
  let gapX = 8;
  let gapY = 8;
  let availW = bandW - 2 * gridPadX;
  let btnW = (availW - (cols - 1) * gapX) / cols;
  let btnH = 32;

  let gridStartX = MX + gridPadX;
  let gridStartY = y + gridPadY;

  for (let i = 0; i < maxMinterms; i++) {
    let col = i % cols;
    let row = Math.floor(i / cols);
    let bx = gridStartX + col * (btnW + gapX);
    let by = gridStartY + row * (btnH + gapY);

    let isActive = (i === selectedMinterm);

    if (isActive) {
      drawingContext.shadowColor = 'rgba(106, 91, 255, 0.35)';
      drawingContext.shadowBlur = 8;
      drawingContext.shadowOffsetY = 2;
    }

    fill(isActive ? PURPLE : BTN_INACTIVE);
    stroke(isActive ? PURPLE_DARK : BTN_INACTIVE_BORDER);
    strokeWeight(isActive ? 1.5 : 1);
    rect(bx, by, btnW, btnH, 8);

    drawingContext.shadowBlur = 0;
    drawingContext.shadowOffsetY = 0;

    fill(isActive ? 'white' : '#555');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(12);
    textStyle(isActive ? BOLD : NORMAL);
    text('m' + i, bx + btnW / 2, by + btnH / 2);
    textStyle(NORMAL);
  }
}

function mousePressed() {
  let y = 400;
  let bandW = canvasWidth - 2 * MX;
  let maxMinterms = Math.pow(2, numVars);
  let cols = numVars === 4 ? 8 : (numVars === 3 ? 4 : 2);
  let gridPadX = 20;
  let gridPadY = 30;
  let gapX = 8;
  let gapY = 8;
  let availW = bandW - 2 * gridPadX;
  let btnW = (availW - (cols - 1) * gapX) / cols;
  let btnH = 32;
  let gridStartX = MX + gridPadX;
  let gridStartY = y + gridPadY;

  for (let i = 0; i < maxMinterms; i++) {
    let col = i % cols;
    let row = Math.floor(i / cols);
    let bx = gridStartX + col * (btnW + gapX);
    let by = gridStartY + row * (btnH + gapY);

    if (mouseX >= bx && mouseX <= bx + btnW && mouseY >= by && mouseY <= by + btnH) {
      onMintermButtonClick(i);
      break;
    }
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
