// Truth Table to Canonical Form Generator
// Interactive MicroSim for Unit 4: Minterm & Maxterm Expansions
// Click output cells to cycle through 0, 1, X (don't care)
// Real-time display of Sigma, Pi, and DC-set notation
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 620;
let controlHeight = 45;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 20;
let defaultTextSize = 16;

// Application state
let numVars = 3;
let outputs = []; // 0, 1, or -1 (don't care)
let varNames = ['A', 'B', 'C', 'D'];
let varButtons = [];
let resetButton;

// Colors
const COL_ON = [200, 240, 200];    // green for 1 (on-set)
const COL_OFF = [255, 210, 210];   // red for 0 (off-set)
const COL_DC = [220, 220, 220];    // grey for X (dc-set)
const COL_HEADER = [90, 62, 237];  // purple theme
const COL_BLUE = [168, 200, 255];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textFont('Arial');

  initOutputs();
  createControls();

  describe('Interactive truth table where clicking output cells cycles through 0, 1, and X to generate canonical SOP and POS expressions in real time', LABEL);
}

function initOutputs() {
  let rows = Math.pow(2, numVars);
  outputs = new Array(rows).fill(0);
}

function createControls() {
  // Remove old buttons
  for (let b of varButtons) b.remove();
  varButtons = [];
  if (resetButton) resetButton.remove();

  // Variable count buttons
  for (let v = 2; v <= 4; v++) {
    let btn = createButton(v + ' Vars');
    btn.position(margin + (v - 2) * 80, drawHeight + 10);
    btn.style('padding', '6px 16px');
    btn.style('font-size', '14px');
    btn.style('border-radius', '6px');
    btn.style('border', v === numVars ? '2px solid #5A3EED' : '1px solid #aaa');
    btn.style('background', v === numVars ? '#EEF4FF' : '#fff');
    btn.style('cursor', 'pointer');
    btn.mousePressed(() => {
      numVars = v;
      initOutputs();
      createControls();
    });
    varButtons.push(btn);
  }

  // Reset button
  resetButton = createButton('Reset All');
  resetButton.position(margin + 3 * 80, drawHeight + 10);
  resetButton.style('padding', '6px 16px');
  resetButton.style('font-size', '14px');
  resetButton.style('border-radius', '6px');
  resetButton.style('border', '1px solid #c00');
  resetButton.style('color', '#c00');
  resetButton.style('background', '#fff');
  resetButton.style('cursor', 'pointer');
  resetButton.mousePressed(() => {
    initOutputs();
  });
  varButtons.push(resetButton);
}

function draw() {
  updateCanvasSize();

  // Drawing region
  fill(245, 248, 255);
  stroke(192);
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control region
  fill(255);
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill(COL_HEADER);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  textStyle(BOLD);
  text('Truth Table \u2192 Canonical Form', canvasWidth / 2, 10);
  textStyle(NORMAL);

  drawTruthTable();
  drawCanonicalForms();
}

function drawTruthTable() {
  let rows = Math.pow(2, numVars);
  let tableX = margin;
  let tableY = 42;
  let colW = 42;
  let rowH = Math.min(28, (drawHeight * 0.45 - tableY) / (rows + 1));
  let fColX = tableX + numVars * colW;
  let tableW = (numVars + 1) * colW;

  // Header row
  fill(COL_HEADER);
  noStroke();
  rect(tableX, tableY, tableW, rowH, 6, 6, 0, 0);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(14);
  textStyle(BOLD);
  for (let v = 0; v < numVars; v++) {
    text(varNames[v], tableX + v * colW + colW / 2, tableY + rowH / 2);
  }
  text('F', fColX + colW / 2, tableY + rowH / 2);
  textStyle(NORMAL);

  // Data rows
  for (let r = 0; r < rows; r++) {
    let y = tableY + (r + 1) * rowH;
    let outVal = outputs[r];

    // Row background based on output
    if (outVal === 1) fill(COL_ON);
    else if (outVal === 0) fill(COL_OFF);
    else fill(COL_DC);

    noStroke();
    if (r === rows - 1) {
      rect(tableX, y, tableW, rowH, 0, 0, 6, 6);
    } else {
      rect(tableX, y, tableW, rowH);
    }

    // Grid lines
    stroke(200);
    strokeWeight(0.5);
    line(tableX, y, tableX + tableW, y);
    for (let c = 1; c <= numVars; c++) {
      line(tableX + c * colW, y, tableX + c * colW, y + rowH);
    }
    noStroke();

    // Input bits
    fill(50);
    textSize(14);
    textAlign(CENTER, CENTER);
    for (let v = 0; v < numVars; v++) {
      let bit = (r >> (numVars - 1 - v)) & 1;
      text(bit, tableX + v * colW + colW / 2, y + rowH / 2);
    }

    // Output value (clickable area)
    let fVal = outVal === -1 ? 'X' : outVal;
    fill(outVal === 1 ? [0, 120, 0] : outVal === 0 ? [180, 0, 0] : [100, 100, 100]);
    textStyle(BOLD);
    textSize(15);
    text(fVal, fColX + colW / 2, y + rowH / 2);
    textStyle(NORMAL);
  }

  // Outer border
  noFill();
  stroke(COL_HEADER);
  strokeWeight(2);
  rect(tableX, tableY, tableW, (rows + 1) * rowH, 6);

  // Store table geometry for click detection
  this._tableX = tableX;
  this._tableY = tableY;
  this._colW = colW;
  this._rowH = rowH;
  this._fColX = fColX;
  this._rows = rows;

  // Row index label
  noStroke();
  fill(120);
  textSize(11);
  textAlign(LEFT, CENTER);
  text('Row', tableX + tableW + 8, tableY + rowH / 2);
  for (let r = 0; r < rows; r++) {
    let y = tableY + (r + 1) * rowH;
    text('m' + r, tableX + tableW + 8, y + rowH / 2);
  }
}

function drawCanonicalForms() {
  let rows = Math.pow(2, numVars);
  let startY = Math.min(42 + (rows + 1) * this._rowH + 20, drawHeight * 0.52);
  let boxX = margin;
  let boxW = canvasWidth - 2 * margin;
  let lineH = 22;

  // Compute sets
  let onSet = [], offSet = [], dcSet = [];
  for (let i = 0; i < rows; i++) {
    if (outputs[i] === 1) onSet.push(i);
    else if (outputs[i] === 0) offSet.push(i);
    else dcSet.push(i);
  }

  // Sigma (SOP) box
  let sopH = 70;
  fill(200, 240, 200, 180);
  stroke(100, 180, 100);
  strokeWeight(1.5);
  rect(boxX, startY, boxW, sopH, 8);
  noStroke();

  fill(0, 100, 0);
  textSize(14);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text('\u03A3 (On-Set / Minterms)', boxX + 10, startY + 6);
  textStyle(NORMAL);
  fill(30);
  textSize(13);

  let sigmaShort = onSet.length > 0
    ? 'F = \u03A3m(' + onSet.join(', ') + ')'
    : 'F = 0  (no minterms selected)';
  if (dcSet.length > 0 && onSet.length > 0) {
    sigmaShort += '  +  d(' + dcSet.join(', ') + ')';
  }
  text(sigmaShort, boxX + 10, startY + 26);

  let sigmaAlg = buildSOPExpression(onSet);
  textSize(12);
  fill(60);
  text('SOP: ' + sigmaAlg, boxX + 10, startY + 48);

  // Pi (POS) box
  let posY = startY + sopH + 10;
  let posH = 70;
  fill(255, 210, 210, 180);
  stroke(200, 100, 100);
  strokeWeight(1.5);
  rect(boxX, posY, boxW, posH, 8);
  noStroke();

  fill(150, 0, 0);
  textSize(14);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text('\u03A0 (Off-Set / Maxterms)', boxX + 10, posY + 6);
  textStyle(NORMAL);
  fill(30);
  textSize(13);

  let piShort = offSet.length > 0
    ? 'F = \u03A0M(' + offSet.join(', ') + ')'
    : 'F = 1  (no maxterms selected)';
  if (dcSet.length > 0 && offSet.length > 0) {
    piShort += '  \u00B7  d(' + dcSet.join(', ') + ')';
  }
  text(piShort, boxX + 10, posY + 26);

  let piAlg = buildPOSExpression(offSet);
  textSize(12);
  fill(60);
  text('POS: ' + piAlg, boxX + 10, posY + 48);

  // DC-set box
  let dcY = posY + posH + 10;
  let dcH = 48;
  fill(220, 220, 220, 180);
  stroke(160, 160, 160);
  strokeWeight(1.5);
  rect(boxX, dcY, boxW, dcH, 8);
  noStroke();

  fill(80);
  textSize(14);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text("Don't Care Set", boxX + 10, dcY + 6);
  textStyle(NORMAL);
  fill(30);
  textSize(13);
  let dcText = dcSet.length > 0
    ? 'd = {' + dcSet.join(', ') + '}  (' + dcSet.length + ' term' + (dcSet.length !== 1 ? 's' : '') + ')'
    : 'd = \u2205  (no don\'t cares)';
  text(dcText, boxX + 10, dcY + 28);

  // Summary counts
  let sumY = dcY + dcH + 14;
  fill(COL_HEADER);
  textSize(13);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text('Summary:', boxX, sumY);
  textStyle(NORMAL);
  fill(60);
  textSize(12);
  text('On-set: ' + onSet.length + '  |  Off-set: ' + offSet.length + '  |  DC-set: ' + dcSet.length + '  |  Total rows: ' + rows, boxX + 72, sumY + 1);

  // Instructions
  fill(120);
  textSize(11);
  textAlign(CENTER, TOP);
  text('Click the F column cells to cycle:  0 \u2192 1 \u2192 X \u2192 0', canvasWidth / 2, sumY + 22);
}

function buildSOPExpression(minterms) {
  if (minterms.length === 0) return '0';
  let terms = [];
  for (let m of minterms) {
    let literals = [];
    for (let v = 0; v < numVars; v++) {
      let bit = (m >> (numVars - 1 - v)) & 1;
      literals.push(bit === 1 ? varNames[v] : varNames[v] + "'");
    }
    terms.push(literals.join(''));
  }
  return 'F = ' + terms.join(' + ');
}

function buildPOSExpression(maxterms) {
  if (maxterms.length === 0) return '1';
  let terms = [];
  for (let m of maxterms) {
    let literals = [];
    for (let v = 0; v < numVars; v++) {
      let bit = (m >> (numVars - 1 - v)) & 1;
      literals.push(bit === 1 ? varNames[v] + "'" : varNames[v]);
    }
    terms.push('(' + literals.join('+') + ')');
  }
  return 'F = ' + terms.join('');
}

function mousePressed() {
  // Check if click is in the output column
  if (!this._tableX) return;

  let rows = this._rows;
  let fColX = this._fColX;
  let colW = this._colW;
  let tableY = this._tableY;
  let rowH = this._rowH;

  for (let r = 0; r < rows; r++) {
    let y = tableY + (r + 1) * rowH;
    if (mouseX >= fColX && mouseX <= fColX + colW &&
        mouseY >= y && mouseY <= y + rowH) {
      // Cycle: 0 -> 1 -> -1 (X) -> 0
      if (outputs[r] === 0) outputs[r] = 1;
      else if (outputs[r] === 1) outputs[r] = -1;
      else outputs[r] = 0;
      return;
    }
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
