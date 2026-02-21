// Minterm Visualizer MicroSim
// Visualize minterms and maxterms
// Bloom Level: Understand (L2) - Explain minterm/maxterm concepts
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 450;
let controlHeight = 70;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let numVarsSelect;
let mintermSlider;
let numVars = 3;
let selectedMinterm = 3;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  numVarsSelect = createSelect();
  numVarsSelect.option('2 variables', 2);
  numVarsSelect.option('3 variables', 3);
  numVarsSelect.option('4 variables', 4);
  numVarsSelect.changed(() => {
    numVars = parseInt(numVarsSelect.value());
    selectedMinterm = min(selectedMinterm, Math.pow(2, numVars) - 1);
    mintermSlider.remove();
    mintermSlider = createSlider(0, Math.pow(2, numVars) - 1, selectedMinterm);
    mintermSlider.size(180);
    mintermSlider.input(() => { selectedMinterm = mintermSlider.value(); });
    positionUIElements();
  });
  numVarsSelect.selected('3 variables');

  mintermSlider = createSlider(0, 7, 3);
  mintermSlider.size(180);
  mintermSlider.input(() => { selectedMinterm = mintermSlider.value(); });

  positionUIElements();

  describe('Minterm and maxterm visualizer showing product and sum terms', LABEL);
}

function positionUIElements() {
  let mainRect = document.querySelector('main').getBoundingClientRect();
  numVarsSelect.position(mainRect.left + 100, mainRect.top + drawHeight + 12);
  mintermSlider.position(mainRect.left + 100, mainRect.top + drawHeight + 42);
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
  text('Minterm & Maxterm Visualizer', canvasWidth / 2, 10);

  // Draw minterm info
  drawMintermInfo();

  // Draw truth table row
  drawTruthTableRow();

  // Draw minterm and maxterm
  drawMintermMaxterm();

  // Draw all minterms list
  drawMintermList();

  // Control labels
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(11);
  text('Variables:', 20, drawHeight + 24);
  text('Minterm m' + selectedMinterm + ':', 20, drawHeight + 54);
  textAlign(RIGHT, CENTER);
  text(selectedMinterm, canvasWidth - 30, drawHeight + 54);
}

function drawMintermInfo() {
  let y = 45;
  let binary = selectedMinterm.toString(2).padStart(numVars, '0');
  let varNames = ['A', 'B', 'C', 'D'].slice(0, numVars);

  fill('#e3f2fd');
  stroke('#2196f3');
  strokeWeight(2);
  rect(25, y, canvasWidth - 50, 60, 8);

  fill('#2196f3');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(12);
  text('Minterm m' + selectedMinterm + ' (decimal ' + selectedMinterm + ')', canvasWidth / 2, y + 8);

  // Binary representation
  textSize(22);
  fill('black');

  let bitW = 35;
  let startX = canvasWidth / 2 - (numVars * bitW) / 2;
  for (let i = 0; i < numVars; i++) {
    let bit = binary[i];

    // Bit box
    fill(bit === '1' ? '#4CAF50' : '#f44336');
    stroke('#333');
    strokeWeight(1);
    rect(startX + i * bitW, y + 28, bitW - 5, 25, 3);

    // Bit value
    fill('white');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(16);
    text(bit, startX + i * bitW + (bitW - 5) / 2, y + 40);

    // Variable label
    fill('#666');
    textSize(10);
    text(varNames[i], startX + i * bitW + (bitW - 5) / 2, y + 58);
  }
}

function drawTruthTableRow() {
  let y = 120;
  let binary = selectedMinterm.toString(2).padStart(numVars, '0');
  let varNames = ['A', 'B', 'C', 'D'].slice(0, numVars);

  fill('#f5f5f5');
  stroke('#ccc');
  strokeWeight(1);
  rect(25, y, canvasWidth - 50, 55, 5);

  fill('#333');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(11);
  text('Truth Table Row:', 35, y + 8);

  // Show the row
  textSize(12);
  let rowStr = varNames.join('  ') + '  |  F';
  text(rowStr, 50, y + 28);

  // Values
  let valStr = binary.split('').join('   ') + '  |  1';
  fill('#4CAF50');
  text(valStr, 50, y + 42);

  // Explanation
  fill('#666');
  textSize(9);
  textAlign(RIGHT, CENTER);
  text('F = 1 only when ' + varNames.join(', ') + ' = ' + binary.split('').join(', '), canvasWidth - 35, y + 35);
}

function drawMintermMaxterm() {
  let y = 190;
  let binary = selectedMinterm.toString(2).padStart(numVars, '0');
  let varNames = ['A', 'B', 'C', 'D'].slice(0, numVars);

  // Minterm (product term)
  fill('#e8f5e9');
  stroke('#4CAF50');
  strokeWeight(2);
  rect(25, y, (canvasWidth - 60) / 2, 100, 8);

  fill('#4CAF50');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(12);
  text('Minterm (Product Term)', 25 + (canvasWidth - 60) / 4, y + 8);

  // Build minterm expression
  let minterm = '';
  for (let i = 0; i < numVars; i++) {
    if (binary[i] === '0') {
      minterm += varNames[i] + "'";
    } else {
      minterm += varNames[i];
    }
    if (i < numVars - 1) minterm += ' · ';
  }

  textSize(18);
  fill('black');
  text('m' + selectedMinterm + ' = ' + minterm, 25 + (canvasWidth - 60) / 4, y + 35);

  fill('#666');
  textSize(9);
  text('AND of literals', 25 + (canvasWidth - 60) / 4, y + 65);
  text("Variable complemented if bit = 0", 25 + (canvasWidth - 60) / 4, y + 80);

  // Maxterm (sum term)
  let rightX = 35 + (canvasWidth - 60) / 2;
  fill('#ffebee');
  stroke('#f44336');
  strokeWeight(2);
  rect(rightX, y, (canvasWidth - 60) / 2, 100, 8);

  fill('#f44336');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(12);
  text('Maxterm (Sum Term)', rightX + (canvasWidth - 60) / 4, y + 8);

  // Build maxterm expression
  let maxterm = '';
  for (let i = 0; i < numVars; i++) {
    if (binary[i] === '1') {
      maxterm += varNames[i] + "'";
    } else {
      maxterm += varNames[i];
    }
    if (i < numVars - 1) maxterm += ' + ';
  }

  textSize(18);
  fill('black');
  text('M' + selectedMinterm + ' = ' + maxterm, rightX + (canvasWidth - 60) / 4, y + 35);

  fill('#666');
  textSize(9);
  text('OR of literals', rightX + (canvasWidth - 60) / 4, y + 65);
  text("Variable complemented if bit = 1", rightX + (canvasWidth - 60) / 4, y + 80);

  // Relationship
  y += 115;
  fill('#fff3e0');
  stroke('#ff9800');
  strokeWeight(2);
  rect(25, y, canvasWidth - 50, 35, 5);

  fill('#ff9800');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  text("Relationship: m" + selectedMinterm + " = (M" + selectedMinterm + ")'  and  M" + selectedMinterm + " = (m" + selectedMinterm + ")'", canvasWidth / 2, y + 17);
}

function drawMintermList() {
  let y = 355;
  let maxMinterms = Math.pow(2, numVars);

  fill('#f5f5f5');
  stroke('#ccc');
  strokeWeight(1);
  rect(25, y, canvasWidth - 50, 85, 5);

  fill('#333');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(10);
  text('All Minterms (click to select):', 35, y + 8);

  // Draw minterm buttons
  let cols = numVars === 4 ? 8 : (numVars === 3 ? 4 : 2);
  let rows = Math.ceil(maxMinterms / cols);
  let btnW = (canvasWidth - 80) / cols;
  let btnH = 22;
  let startX = 35;
  let startY = y + 28;

  for (let i = 0; i < maxMinterms; i++) {
    let col = i % cols;
    let row = Math.floor(i / cols);
    let bx = startX + col * btnW;
    let by = startY + row * (btnH + 3);

    fill(i === selectedMinterm ? '#4CAF50' : '#e0e0e0');
    stroke(i === selectedMinterm ? '#388E3C' : '#bbb');
    strokeWeight(1);
    rect(bx, by, btnW - 5, btnH, 3);

    fill(i === selectedMinterm ? 'white' : '#333');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(10);
    text('m' + i, bx + (btnW - 5) / 2, by + btnH / 2);
  }
}

function mousePressed() {
  // Check minterm buttons
  let y = 355;
  let maxMinterms = Math.pow(2, numVars);
  let cols = numVars === 4 ? 8 : (numVars === 3 ? 4 : 2);
  let btnW = (canvasWidth - 80) / cols;
  let btnH = 22;
  let startX = 35;
  let startY = y + 28;

  for (let i = 0; i < maxMinterms; i++) {
    let col = i % cols;
    let row = Math.floor(i / cols);
    let bx = startX + col * btnW;
    let by = startY + row * (btnH + 3);

    if (mouseX >= bx && mouseX <= bx + btnW - 5 && mouseY >= by && mouseY <= by + btnH) {
      selectedMinterm = i;
      mintermSlider.value(i);
      break;
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
