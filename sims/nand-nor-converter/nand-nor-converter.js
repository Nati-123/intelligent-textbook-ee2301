// AND-OR to NAND-NAND Step-by-Step Converter MicroSim
// Shows conversion process with bubble pushing and truth table
// Bloom Level: Apply (L3)
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 470;
let controlHeight = 65;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let circuitW;  // left portion width for circuit
let tableX;    // truth table start X
let tableW;    // truth table width

let currentStep = 0;
let inputVals = { A: 1, B: 1, C: 0, D: 1 };
let currentExample = 0;

const examples = [
  { name: 'F = AB + CD', terms: [['A','B'], ['C','D']] },
  { name: "F = XY + X'Z", terms: [['X','Y'], ["X'",'Z']], vars: {X:1,Y:0,"X'":0,Z:1} }
];

const stepInfo = [
  { title: 'Step 1: Original AND-OR Circuit', desc: 'Standard SOP two-level implementation', color: '#2196F3' },
  { title: 'Step 2: Add Double Inversion', desc: 'Insert bubbles at AND outputs and OR inputs', color: '#FF9800' },
  { title: 'Step 3: Bubbles Cancel', desc: 'Adjacent bubbles cancel (double negation)', color: '#9C27B0' },
  { title: 'Step 4: NAND-NAND Result', desc: 'AND+bubble = NAND, OR+input-bubbles = NAND', color: '#4CAF50' }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  describe('Step-by-step AND-OR to NAND-NAND conversion with truth table', LABEL);
}

function draw() {
  updateCanvasSize();

  // Drawing area background
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area background
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title (full width)
  fill('#212121');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(15);
  text('AND-OR to NAND-NAND Conversion', canvasWidth / 2, 6);

  // Expression name
  let ex = examples[currentExample];
  fill('#1565C0');
  textSize(13);
  text(ex.name, canvasWidth / 2, 24);

  // Step bar (full width)
  drawStepBar();

  // Step info (full width)
  let si = stepInfo[currentStep];
  fill(si.color);
  textAlign(CENTER, TOP);
  textSize(12);
  textStyle(BOLD);
  text(si.title, canvasWidth / 2, 64);
  textStyle(NORMAL);
  fill('#666');
  textSize(10);
  text(si.desc, canvasWidth / 2, 80);

  // Circuit (left portion)
  drawCircuit();

  // Truth table (right portion)
  drawTruthTable();

  // Expression box (left portion)
  drawExpressionBox();

  // Input toggles and output (left portion)
  drawInputsAndOutput();

  // Controls (full width)
  drawControls();
}

function drawStepBar() {
  let barY = 44;
  let barW = canvasWidth - 100;
  let startX = 50;

  for (let i = 0; i < 4; i++) {
    let x = startX + i * (barW / 3);
    let dotR = 12;

    // Connecting line
    if (i < 3) {
      stroke(i < currentStep ? '#4CAF50' : '#ddd');
      strokeWeight(2);
      line(x + dotR, barY, x + barW / 3 - dotR, barY);
    }

    // Dot
    fill(i <= currentStep ? stepInfo[i].color : '#e0e0e0');
    stroke(i <= currentStep ? stepInfo[i].color : '#ccc');
    strokeWeight(1.5);
    ellipse(x, barY, dotR * 2);

    fill(i <= currentStep ? 'white' : '#999');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(9);
    textStyle(BOLD);
    text(i + 1, x, barY);
    textStyle(NORMAL);
  }
}

function drawCircuit() {
  let sc = Math.min(1, circuitW / 400);
  let cx = circuitW / 2;
  let cy = 210;
  let gateW = 50 * sc;
  let gateH = 30;

  // Gate positions
  let and1 = { x: cx - 75 * sc, y: cy - 40 };
  let and2 = { x: cx - 75 * sc, y: cy + 40 };
  let orGate = { x: cx + 35 * sc, y: cy };

  // Input positions
  let inpX = cx - 155 * sc;
  let inputs = [
    { label: 'A', x: inpX, y: cy - 55 },
    { label: 'B', x: inpX, y: cy - 25 },
    { label: 'C', x: inpX, y: cy + 25 },
    { label: 'D', x: inpX, y: cy + 55 }
  ];

  if (currentExample === 1) {
    inputs = [
      { label: 'X', x: inpX, y: cy - 55 },
      { label: 'Y', x: inpX, y: cy - 25 },
      { label: "X'", x: inpX, y: cy + 25 },
      { label: 'Z', x: inpX, y: cy + 55 }
    ];
  }

  // Draw input wires
  stroke('#888');
  strokeWeight(1.5);
  inputs.forEach((inp, i) => {
    let gate = i < 2 ? and1 : and2;
    let yOff = (i % 2 === 0) ? -8 : 8;
    line(inp.x + 20, inp.y, gate.x, gate.y + yOff);
  });

  // Draw wires from gates to OR/final
  stroke('#888');
  strokeWeight(1.5);
  line(and1.x + gateW, and1.y, orGate.x, orGate.y - 12);
  line(and2.x + gateW, and2.y, orGate.x, orGate.y + 12);
  line(orGate.x + gateW, orGate.y, orGate.x + gateW + 35 * sc, orGate.y);

  // Draw bubbles based on step
  if (currentStep === 1) {
    drawBubble(and1.x + gateW + 1, and1.y, '#FF9800', true);
    drawBubble(and2.x + gateW + 1, and2.y, '#FF9800', true);
    drawBubble(orGate.x - 1, orGate.y - 12, '#FF9800', true);
    drawBubble(orGate.x - 1, orGate.y + 12, '#FF9800', true);
    drawBubble(orGate.x + gateW + 1, orGate.y, '#FF9800', true);
    drawBubble(orGate.x + gateW + 10, orGate.y, '#FF9800', true);
  }

  if (currentStep === 2) {
    drawCancelledBubble(and1.x + gateW + 1, and1.y);
    drawCancelledBubble(and2.x + gateW + 1, and2.y);
    drawCancelledBubble(orGate.x - 1, orGate.y - 12);
    drawCancelledBubble(orGate.x - 1, orGate.y + 12);
    drawCancelledBubble(orGate.x + gateW + 1, orGate.y);
    drawCancelledBubble(orGate.x + gateW + 10, orGate.y);
  }

  // Draw input circles
  inputs.forEach(inp => {
    let val = getInputVal(inp.label);
    fill(val ? '#4CAF50' : '#e0e0e0');
    stroke(val ? '#388E3C' : '#bbb');
    strokeWeight(1.5);
    ellipse(inp.x + 10, inp.y, 20);

    fill(val ? 'white' : '#666');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(10);
    text(inp.label, inp.x + 10, inp.y);
  });

  // Determine gate types
  let gate1Type, gate2Type;
  if (currentStep <= 1) {
    gate1Type = 'AND'; gate2Type = 'OR';
  } else if (currentStep === 2) {
    gate1Type = 'AND*'; gate2Type = 'OR*';
  } else {
    gate1Type = 'NAND'; gate2Type = 'NAND';
  }

  let gate1Color = currentStep >= 3 ? '#9C27B0' : '#2196F3';
  let gate2Color = currentStep >= 3 ? '#9C27B0' : '#4CAF50';

  // Evaluate
  let v1 = evalGate1(0);
  let v2 = evalGate1(1);
  let vOut = v1 | v2;

  drawGateShape(and1.x, and1.y, gateW, gateH, gate1Type, gate1Color, v1, sc);
  drawGateShape(and2.x, and2.y, gateW, gateH, gate1Type, gate1Color, v2, sc);
  drawGateShape(orGate.x, orGate.y, gateW, gateH, gate2Type, gate2Color, vOut, sc);

  // Gate labels below
  fill('#666');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(8);
  if (currentStep <= 1) {
    text('AND', and1.x + gateW / 2, and1.y + gateH / 2 + 4);
    text('AND', and2.x + gateW / 2, and2.y + gateH / 2 + 4);
    text('OR', orGate.x + gateW / 2, orGate.y + gateH / 2 + 4);
  } else if (currentStep >= 3) {
    text('NAND', and1.x + gateW / 2, and1.y + gateH / 2 + 4);
    text('NAND', and2.x + gateW / 2, and2.y + gateH / 2 + 4);
    text('NAND', orGate.x + gateW / 2, orGate.y + gateH / 2 + 4);
  }

  // Output indicator
  let outX = orGate.x + gateW + 40 * sc;
  fill(vOut ? '#4CAF50' : '#e0e0e0');
  stroke(vOut ? '#388E3C' : '#bbb');
  strokeWeight(1.5);
  ellipse(outX, orGate.y, 20);

  fill(vOut ? 'white' : '#666');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  textStyle(BOLD);
  text('F', outX, orGate.y);
  textStyle(NORMAL);

  // Level labels
  fill('#999');
  textSize(8);
  textAlign(CENTER, BOTTOM);
  text('Level 1', and1.x + gateW / 2, and1.y - gateH / 2 - 16);
  text('Level 2', orGate.x + gateW / 2, orGate.y - gateH / 2 - 16);
}

function drawGateShape(x, y, w, h, type, color, val, sc) {
  let isActive = val === 1;
  let baseType = type.replace('*', '');
  let isAnd = baseType === 'AND' || baseType === 'NAND';

  fill(isActive ? '#4CAF50' : color);
  stroke(isActive ? '#388E3C' : color);
  strokeWeight(2);

  if (isAnd) {
    beginShape();
    vertex(x, y - h / 2);
    vertex(x + w * 0.5, y - h / 2);
    bezierVertex(x + w, y - h / 2, x + w, y + h / 2, x + w * 0.5, y + h / 2);
    vertex(x, y + h / 2);
    endShape(CLOSE);
  } else {
    beginShape();
    vertex(x, y - h / 2);
    bezierVertex(x + w * 0.5, y - h / 2, x + w * 0.8, y - h / 4, x + w, y);
    bezierVertex(x + w * 0.8, y + h / 4, x + w * 0.5, y + h / 2, x, y + h / 2);
    bezierVertex(x + w * 0.15, y, x + w * 0.15, y, x, y - h / 2);
    endShape(CLOSE);
  }

  // Gate label inside
  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(Math.max(8, 10 * sc));
  textStyle(BOLD);
  if (currentStep >= 3) {
    text('NAND', x + w * 0.42, y);
  } else {
    text(isAnd ? 'AND' : 'OR', x + w * 0.42, y);
  }
  textStyle(NORMAL);
}

function drawBubble(x, y, col, pulse) {
  let r = 8;
  if (pulse) {
    let t = (sin(frameCount * 0.08) + 1) / 2;
    r = 7 + t * 3;
  }
  fill(col);
  stroke('white');
  strokeWeight(1.5);
  ellipse(x, y, r);
  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(7);
  textStyle(BOLD);
  text('\u25CB', x, y - 1);
  textStyle(NORMAL);
}

function drawCancelledBubble(x, y) {
  fill(200, 200, 200, 120);
  stroke(150, 150, 150, 150);
  strokeWeight(1);
  ellipse(x, y, 8);

  stroke('#F44336');
  strokeWeight(2);
  line(x - 4, y - 4, x + 4, y + 4);
  line(x + 4, y - 4, x - 4, y + 4);
}

// ── Truth Table ──
function drawTruthTable() {
  let x = tableX + 8;
  let w = tableW - 16;
  let startY = 95;
  let headerH = 22;
  let rowH = 16;
  let numRows = 16;

  let colNames = currentExample === 0
    ? ['A', 'B', 'C', 'D', 'F']
    : ['X', 'Y', "X'", 'Z', 'F'];
  let numCols = colNames.length;
  let colW = w / numCols;

  // Table title
  fill('#333');
  noStroke();
  textAlign(CENTER, BOTTOM);
  textSize(11);
  textStyle(BOLD);
  text('Truth Table', x + w / 2, startY - 3);
  textStyle(NORMAL);

  // Header row
  fill('#6A5BFF');
  noStroke();
  rect(x, startY, w, headerH, 4, 4, 0, 0);

  fill('white');
  textAlign(CENTER, CENTER);
  textSize(10);
  textStyle(BOLD);
  for (let c = 0; c < numCols; c++) {
    text(colNames[c], x + c * colW + colW / 2, startY + headerH / 2);
  }
  textStyle(NORMAL);

  // Data rows
  for (let row = 0; row < numRows; row++) {
    let ry = startY + headerH + row * rowH;
    let bits = [(row >> 3) & 1, (row >> 2) & 1, (row >> 1) & 1, row & 1];
    let f = (bits[0] & bits[1]) | (bits[2] & bits[3]);

    let isCurrent = isCurrentRow(bits);

    // Row background
    if (isCurrent) {
      fill('#C8E6C9');
    } else {
      fill(row % 2 === 0 ? '#F5F5FF' : 'white');
    }
    noStroke();
    rect(x, ry, w, rowH);

    // Cell values
    let allVals = [...bits, f];
    for (let c = 0; c < numCols; c++) {
      let val = allVals[c];
      if (c === numCols - 1) {
        // F column: green for 1, red for 0
        fill(val ? '#2E7D32' : '#C62828');
        textStyle(BOLD);
      } else {
        fill(val ? '#333' : '#aaa');
        textStyle(NORMAL);
      }
      noStroke();
      textAlign(CENTER, CENTER);
      textSize(10);
      text(val, x + c * colW + colW / 2, ry + rowH / 2);
    }
    textStyle(NORMAL);

    // Highlight border for current row
    if (isCurrent) {
      noFill();
      stroke('#4CAF50');
      strokeWeight(2);
      rect(x, ry, w, rowH);
    }
  }

  // Table border
  noFill();
  stroke('#ccc');
  strokeWeight(1);
  rect(x, startY, w, headerH + numRows * rowH, 4);

  // Column grid lines
  stroke('#e8e8f0');
  strokeWeight(0.5);
  for (let c = 1; c < numCols; c++) {
    let lineX = x + c * colW;
    line(lineX, startY + headerH, lineX, startY + headerH + numRows * rowH);
  }

  // F column separator (darker)
  stroke('#bbb');
  strokeWeight(1);
  let fSepX = x + (numCols - 1) * colW;
  line(fSepX, startY, fSepX, startY + headerH + numRows * rowH);

  // Hint
  let tableBottom = startY + headerH + numRows * rowH;
  fill('#999');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(8);
  text('Click any row to set inputs', x + w / 2, tableBottom + 4);

  // Current output summary
  let outVal = evalCircuit();
  fill(outVal ? '#2E7D32' : '#C62828');
  textSize(12);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text('F = ' + outVal, x + w / 2, tableBottom + 20);
  textStyle(NORMAL);
}

function isCurrentRow(bits) {
  if (currentExample === 0) {
    return bits[0] === (inputVals['A'] || 0) &&
           bits[1] === (inputVals['B'] || 0) &&
           bits[2] === (inputVals['C'] || 0) &&
           bits[3] === (inputVals['D'] || 0);
  } else {
    let v = examples[1].vars;
    return bits[0] === (v['X'] || 0) &&
           bits[1] === (v['Y'] || 0) &&
           bits[2] === (v["X'"] || 0) &&
           bits[3] === (v['Z'] || 0);
  }
}

function drawExpressionBox() {
  let y = 350;
  let boxW = circuitW - 24;

  fill('#f5f0ff');
  stroke('#d1c4e9');
  strokeWeight(1);
  rect(12, y, boxW, 42, 6);

  fill('#5A3EED');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(10);
  textStyle(BOLD);
  text('Expression:', 22, y + 12);
  textStyle(NORMAL);

  fill('#333');
  textSize(11);
  textAlign(CENTER, CENTER);

  let midX = 12 + boxW / 2;
  if (currentExample === 0) {
    if (currentStep === 0) {
      text('F = AB + CD', midX, y + 30);
    } else if (currentStep === 1) {
      textSize(10);
      text('Double inversion added', midX, y + 30);
    } else if (currentStep === 2) {
      textSize(10);
      text("F = (AB)' \u00B7 (CD)'  \u2192  De Morgan's", midX, y + 30);
    } else {
      textSize(10);
      text('F = (A NAND B) NAND (C NAND D)', midX, y + 30);
    }
  } else {
    if (currentStep === 0) {
      text("F = XY + X'Z", midX, y + 30);
    } else if (currentStep === 1) {
      textSize(10);
      text('Double inversion added', midX, y + 30);
    } else if (currentStep === 2) {
      textSize(10);
      text("F = (XY)' \u00B7 (X'Z)'  \u2192  De Morgan's", midX, y + 30);
    } else {
      textSize(10);
      text("F = (X NAND Y) NAND (X' NAND Z)", midX, y + 30);
    }
  }
}

function drawInputsAndOutput() {
  let y = 400;
  let names = currentExample === 0 ? ['A', 'B', 'C', 'D'] : ['X', 'Y', "X'", 'Z'];
  let startX = 12;
  let boxW = 38;
  let spacing = Math.min(45, (circuitW - 24) / (names.length + 1));

  // Label
  fill('#333');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(10);
  textStyle(BOLD);
  text('Inputs:', startX, y + 10);
  textStyle(NORMAL);

  let toggleStart = startX + 50;
  names.forEach((n, i) => {
    let x = toggleStart + i * spacing;
    let val = getInputVal(n);

    fill(val ? '#4CAF50' : '#e0e0e0');
    stroke(val ? '#388E3C' : '#bbb');
    strokeWeight(1);
    rect(x, y, boxW, 20, 4);

    fill(val ? 'white' : '#666');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(9);
    text(n + '=' + val, x + boxW / 2, y + 10);
  });

  // Output
  let outVal = evalCircuit();
  let outX = toggleStart + names.length * spacing + 8;
  fill(outVal ? '#4CAF50' : '#F44336');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  textStyle(BOLD);
  text('F=' + outVal, outX, y + 10);
  textStyle(NORMAL);

  // Verification note
  fill('#888');
  textSize(8);
  textAlign(CENTER, TOP);
  text('Output identical at every step', circuitW / 2, y + 26);
}

function drawControls() {
  let btnY = drawHeight + 10;
  let btnH = 24;

  // Prev button
  let prevEnabled = currentStep > 0;
  fill(prevEnabled ? '#2196F3' : '#e0e0e0');
  stroke(prevEnabled ? '#1976D2' : '#ccc');
  strokeWeight(1);
  rect(15, btnY, 75, btnH, 3);
  fill(prevEnabled ? 'white' : '#999');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(10);
  text('\u2190 Previous', 52, btnY + btnH / 2);

  // Next button
  let nextEnabled = currentStep < 3;
  fill(nextEnabled ? '#4CAF50' : '#e0e0e0');
  stroke(nextEnabled ? '#388E3C' : '#ccc');
  strokeWeight(1);
  rect(100, btnY, 75, btnH, 3);
  fill(nextEnabled ? 'white' : '#999');
  noStroke();
  text('Next \u2192', 137, btnY + btnH / 2);

  // Reset button
  fill('#f44336');
  stroke('#d32f2f');
  strokeWeight(1);
  rect(185, btnY, 50, btnH, 3);
  fill('white');
  noStroke();
  text('Reset', 210, btnY + btnH / 2);

  // Example toggle
  fill('#9C27B0');
  stroke('#7B1FA2');
  strokeWeight(1);
  rect(245, btnY, 120, btnH, 3);
  fill('white');
  noStroke();
  textSize(9);
  text(examples[currentExample].name, 305, btnY + btnH / 2);

  // Tip
  fill('#888');
  textSize(8);
  textAlign(CENTER, CENTER);
  text('Step through to see how AND-OR becomes NAND-NAND', canvasWidth / 2, drawHeight + 50);
}

// ── Input/evaluation helpers ──
function getInputVal(label) {
  if (currentExample === 0) {
    return inputVals[label] || 0;
  } else {
    let vars = examples[1].vars;
    return vars[label] || 0;
  }
}

function evalGate1(gateIdx) {
  let ex = examples[currentExample];
  let term = ex.terms[gateIdx];
  let result = 1;
  for (let v of term) {
    result &= getInputVal(v);
  }
  return result;
}

function evalCircuit() {
  return evalGate1(0) | evalGate1(1);
}

function mousePressed() {
  let btnY = drawHeight + 10;
  let btnH = 24;

  // Previous
  if (mouseX >= 15 && mouseX <= 90 && mouseY >= btnY && mouseY <= btnY + btnH) {
    if (currentStep > 0) currentStep--;
    return;
  }

  // Next
  if (mouseX >= 100 && mouseX <= 175 && mouseY >= btnY && mouseY <= btnY + btnH) {
    if (currentStep < 3) currentStep++;
    return;
  }

  // Reset
  if (mouseX >= 185 && mouseX <= 235 && mouseY >= btnY && mouseY <= btnY + btnH) {
    currentStep = 0;
    return;
  }

  // Example toggle
  if (mouseX >= 245 && mouseX <= 365 && mouseY >= btnY && mouseY <= btnY + btnH) {
    currentExample = (currentExample + 1) % examples.length;
    currentStep = 0;
    return;
  }

  // Input toggles (left portion)
  let toggleY = 400;
  let names = currentExample === 0 ? ['A', 'B', 'C', 'D'] : ['X', 'Y', "X'", 'Z'];
  let toggleStart = 62;
  let boxW = 38;
  let spacing = Math.min(45, (circuitW - 24) / (names.length + 1));

  names.forEach((n, i) => {
    let x = toggleStart + i * spacing;
    if (mouseX >= x && mouseX <= x + boxW && mouseY >= toggleY && mouseY <= toggleY + 20) {
      if (currentExample === 0) {
        inputVals[n] = 1 - (inputVals[n] || 0);
      } else {
        examples[1].vars[n] = 1 - (examples[1].vars[n] || 0);
      }
    }
  });

  // Truth table row click
  let ttX = tableX + 8;
  let ttW = tableW - 16;
  let ttStartY = 95;
  let ttHeaderH = 22;
  let ttRowH = 16;

  if (mouseX >= ttX && mouseX <= ttX + ttW &&
      mouseY >= ttStartY + ttHeaderH &&
      mouseY <= ttStartY + ttHeaderH + 16 * ttRowH) {
    let rowIdx = Math.floor((mouseY - ttStartY - ttHeaderH) / ttRowH);
    if (rowIdx >= 0 && rowIdx < 16) {
      let bits = [(rowIdx >> 3) & 1, (rowIdx >> 2) & 1, (rowIdx >> 1) & 1, rowIdx & 1];
      if (currentExample === 0) {
        inputVals.A = bits[0];
        inputVals.B = bits[1];
        inputVals.C = bits[2];
        inputVals.D = bits[3];
      } else {
        examples[1].vars.X = bits[0];
        examples[1].vars.Y = bits[1];
        examples[1].vars["X'"] = bits[2];
        examples[1].vars.Z = bits[3];
      }
    }
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

  // Split: 57% circuit, 43% truth table
  circuitW = Math.floor(canvasWidth * 0.57);
  tableX = circuitW;
  tableW = canvasWidth - circuitW;
}
