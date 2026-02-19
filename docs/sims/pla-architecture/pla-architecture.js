// PLA Architecture MicroSim
// Interactive PLA with programmable AND and OR arrays

let containerWidth;
let canvasWidth = 400;
let drawHeight = 500;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

// 3 inputs: A, B, C
let inputs = [0, 0, 0];
let inputLabels = ['A', 'B', 'C'];

// AND array: 4 product terms x 6 columns (A, A', B, B', C, C')
// 0 = not connected, 1 = connected
let andArray = [
  [1, 0, 1, 0, 0, 0], // P0: A AND B
  [0, 0, 0, 0, 1, 0], // P1: C
  [1, 0, 0, 0, 1, 0], // P2: A AND C
  [0, 0, 0, 0, 0, 0]  // P3: (empty)
];

// OR array: 4 product terms x 2 outputs
let orArray = [
  [1, 0], // P0 -> F0
  [1, 1], // P1 -> F0, F1
  [0, 1], // P2 -> F1
  [0, 0]  // P3 -> (none)
];

let numProducts = 4;
let numInputCols = 6; // A, A', B, B', C, C'
let numOutputs = 2;

// Layout
let andStartX, andStartY, andCellW, andCellH;
let orStartX, orStartY, orCellW, orCellH;
let evaluated = false;
let productResults = [0, 0, 0, 0];
let outputResults = [0, 0];

// Button
let evalButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  describe('Interactive PLA with programmable AND and OR arrays. Configure product terms and outputs.', LABEL);

  evalButton = createButton('Evaluate');
  evalButton.parent(mainElement);
  evalButton.style('font-size', '14px');
  evalButton.style('font-weight', '500');
  evalButton.style('padding', '8px 24px');
  evalButton.style('margin', '8px');
  evalButton.style('cursor', 'pointer');
  evalButton.style('border', 'none');
  evalButton.style('border-radius', '6px');
  evalButton.style('background-color', '#4CAF50');
  evalButton.style('color', 'white');
  evalButton.style('box-shadow', '0 1px 3px rgba(0,0,0,0.15)');
  evalButton.style('transition', 'background-color 0.2s, box-shadow 0.2s');
  evalButton.mousePressed(evaluatePLA);
}

function draw() {
  updateCanvasSize();
  background(245);

  // Title
  fill(50);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(18);
  textStyle(BOLD);
  text('PLA Architecture', canvasWidth / 2, 18);
  textStyle(NORMAL);

  // Subtitle
  textSize(12);
  fill(120);
  text('Programmable AND Array + Programmable OR Array', canvasWidth / 2, 38);

  // Title underline
  stroke(220);
  strokeWeight(1);
  let titleW = min(textWidth('PLA Architecture') + 60, canvasWidth - 40);
  line(canvasWidth / 2 - titleW / 2, 50, canvasWidth / 2 + titleW / 2, 50);

  // Compute layout
  let margin = 15;
  let inputToggleH = 40;
  let topY = 55;

  // Input toggles
  drawInputToggles(topY);

  // AND array area
  andCellW = 30;
  andCellH = 32;
  let andArrayW = numInputCols * andCellW;
  let andArrayH = numProducts * andCellH;

  // OR array area
  orCellW = 36;
  orCellH = andCellH;
  let orArrayW = numOutputs * orCellW;

  // Center both arrays
  let totalW = andArrayW + 50 + orArrayW;
  let startX = (canvasWidth - totalW) / 2;

  andStartX = startX;
  andStartY = topY + inputToggleH + 40;

  orStartX = andStartX + andArrayW + 50;
  orStartY = andStartY;

  // Draw AND array
  drawANDArray();

  // Draw OR array
  drawORArray();

  // Draw product term lines connecting AND to OR
  drawProductLines();

  // Draw input column labels
  drawColumnLabels();

  // Draw output labels and values
  drawOutputLabels();

  // Hand cursor on hover over clickable elements
  let hovering = false;
  // Check input toggles
  let hSpacing = 70;
  let hStartX = canvasWidth / 2 - hSpacing;
  for (let i = 0; i < 3; i++) {
    let hx = hStartX + i * hSpacing;
    let hy = topY + 15;
    if (dist(mouseX, mouseY, hx, hy) < 18) { hovering = true; break; }
  }
  // Check AND crosspoints
  if (!hovering) {
    for (let r = 0; r < numProducts; r++) {
      for (let c = 0; c < numInputCols; c++) {
        let hx = andStartX + c * andCellW + andCellW / 2;
        let hy = andStartY + r * andCellH + andCellH / 2;
        if (Math.abs(mouseX - hx) < 11 && Math.abs(mouseY - hy) < 9) { hovering = true; break; }
      }
      if (hovering) break;
    }
  }
  // Check OR crosspoints
  if (!hovering) {
    for (let r = 0; r < numProducts; r++) {
      for (let c = 0; c < numOutputs; c++) {
        let hx = orStartX + c * orCellW + orCellW / 2;
        let hy = orStartY + r * orCellH + orCellH / 2;
        if (Math.abs(mouseX - hx) < 11 && Math.abs(mouseY - hy) < 9) { hovering = true; break; }
      }
      if (hovering) break;
    }
  }
  cursor(hovering ? HAND : ARROW);

  // Readout panel for evaluation results
  let readoutY = andStartY + numProducts * andCellH + 65;
  let readoutH = 40;
  let readoutW = min(canvasWidth - 24, 400);
  let readoutX = (canvasWidth - readoutW) / 2;

  if (evaluated) {
    // Panel background
    fill(247, 249, 252);
    stroke(210, 215, 225);
    strokeWeight(1);
    rect(readoutX, readoutY, readoutW, readoutH, 8);

    // Accent line
    noStroke();
    fill('#4CAF50');
    rect(readoutX + 10, readoutY, 3, readoutH, 2);

    // Input values
    let labelX = readoutX + 22;
    let labelCY = readoutY + readoutH / 2;

    textAlign(LEFT, CENTER);
    textSize(13);
    textStyle(BOLD);
    fill('#2196F3');
    let inputStr = 'A=' + inputs[0] + '  B=' + inputs[1] + '  C=' + inputs[2];
    text(inputStr, labelX, labelCY);

    let seg1W = textWidth(inputStr);
    textStyle(NORMAL);
    fill(160);
    textSize(12);
    text('|', labelX + seg1W + 8, labelCY);

    // Output values
    textStyle(BOLD);
    fill('#4CAF50');
    text('F0 = ' + outputResults[0] + '   F1 = ' + outputResults[1], labelX + seg1W + 22, labelCY);
    textStyle(NORMAL);
  }

  // Instruction area with styled background
  fill(243, 245, 250);
  noStroke();
  rect(12, drawHeight + 6, canvasWidth - 24, controlHeight - 12, 8);
  fill(130);
  textSize(12);
  textAlign(CENTER, CENTER);
  text('Click boxes to toggle connections  |  Click inputs to toggle values', canvasWidth / 2, drawHeight + controlHeight / 2);
}

function drawInputToggles(topY) {
  let spacing = 70;
  let startX = canvasWidth / 2 - spacing;

  for (let i = 0; i < 3; i++) {
    let x = startX + i * spacing;
    let y = topY + 15;
    let isOne = inputs[i] === 1;

    // Circle toggle
    fill(isOne ? '#4CAF50' : '#ccc');
    stroke(isOne ? '#388E3C' : '#999');
    strokeWeight(2);
    ellipse(x, y, 30, 30);

    // Label and value
    fill(isOne ? 255 : 60);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(14);
    textStyle(BOLD);
    text(inputLabels[i] + '=' + inputs[i], x, y);
    textStyle(NORMAL);
  }
}

function drawColumnLabels() {
  let colLabels = ['A', "A'", 'B', "B'", 'C', "C'"];

  fill(80);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  textStyle(BOLD);

  // AND array column labels
  for (let c = 0; c < numInputCols; c++) {
    let x = andStartX + c * andCellW + andCellW / 2;
    text(colLabels[c], x, andStartY - 15);
  }

  // AND array label
  fill('#9C27B0');
  textSize(12);
  text('AND Array (Programmable)', andStartX + (numInputCols * andCellW) / 2, andStartY - 32);

  // OR array column labels
  fill(80);
  textSize(11);
  for (let c = 0; c < numOutputs; c++) {
    let x = orStartX + c * orCellW + orCellW / 2;
    text('F' + c, x, orStartY - 15);
  }

  // OR array label
  fill('#FF5722');
  textSize(12);
  text('OR Array (Programmable)', orStartX + (numOutputs * orCellW) / 2, orStartY - 32);

  textStyle(NORMAL);

  // Product term labels
  fill(80);
  textSize(11);
  textAlign(RIGHT, CENTER);
  for (let r = 0; r < numProducts; r++) {
    let y = andStartY + r * andCellH + andCellH / 2;
    text('P' + r, andStartX - 8, y);
  }
}

function drawANDArray() {
  // Grid background with subtle purple tint
  fill(250, 248, 255);
  stroke(200);
  strokeWeight(1);
  rect(andStartX, andStartY, numInputCols * andCellW, numProducts * andCellH, 4);

  // Vertical input lines
  for (let c = 0; c < numInputCols; c++) {
    let x = andStartX + c * andCellW + andCellW / 2;
    stroke('#B39DDB');
    strokeWeight(1.5);
    line(x, andStartY, x, andStartY + numProducts * andCellH);
  }

  // Horizontal product term lines
  for (let r = 0; r < numProducts; r++) {
    let y = andStartY + r * andCellH + andCellH / 2;
    let isActive = evaluated && productResults[r] === 1;
    stroke(isActive ? '#00E676' : '#CE93D8');
    strokeWeight(isActive ? 2.5 : 1.5);
    line(andStartX, y, andStartX + numInputCols * andCellW, y);
  }

  // Crosspoint bit boxes
  for (let r = 0; r < numProducts; r++) {
    for (let c = 0; c < numInputCols; c++) {
      let cx = andStartX + c * andCellW + andCellW / 2;
      let cy = andStartY + r * andCellH + andCellH / 2;
      let isConn = andArray[r][c];
      let isActive = evaluated && productResults[r] === 1;
      let boxW = 24;
      let boxH = 20;

      // Glow ring on active connected boxes
      if (isConn && isActive) {
        noStroke();
        fill(76, 175, 80, 45);
        rect(cx - boxW / 2 - 3, cy - boxH / 2 - 3, boxW + 6, boxH + 6, 7);
      }

      // Box background
      if (isConn) {
        fill(isActive ? '#4CAF50' : '#9C27B0');
        stroke(isActive ? '#388E3C' : '#7B1FA2');
      } else {
        fill(242);
        stroke(215);
      }
      strokeWeight(1.5);
      rect(cx - boxW / 2, cy - boxH / 2, boxW, boxH, 5);

      // Bit value
      fill(isConn ? 255 : 180);
      noStroke();
      textSize(12);
      textAlign(CENTER, CENTER);
      textStyle(BOLD);
      text(isConn ? '1' : '0', cx, cy);
      textStyle(NORMAL);
    }
  }
}

function drawORArray() {
  // Grid background with subtle orange tint
  fill(255, 251, 248);
  stroke(200);
  strokeWeight(1);
  rect(orStartX, orStartY, numOutputs * orCellW, numProducts * orCellH, 4);

  // Vertical output lines
  for (let c = 0; c < numOutputs; c++) {
    let x = orStartX + c * orCellW + orCellW / 2;
    stroke('#FFAB91');
    strokeWeight(1.5);
    line(x, orStartY, x, orStartY + numProducts * orCellH);
  }

  // Horizontal product term lines
  for (let r = 0; r < numProducts; r++) {
    let y = orStartY + r * orCellH + orCellH / 2;
    let isActive = evaluated && productResults[r] === 1;
    stroke(isActive ? '#00E676' : '#FF8A65');
    strokeWeight(isActive ? 2.5 : 1.5);
    line(orStartX, y, orStartX + numOutputs * orCellW, y);
  }

  // Crosspoint bit boxes
  for (let r = 0; r < numProducts; r++) {
    for (let c = 0; c < numOutputs; c++) {
      let cx = orStartX + c * orCellW + orCellW / 2;
      let cy = orStartY + r * orCellH + orCellH / 2;
      let isConn = orArray[r][c];
      let isActive = evaluated && productResults[r] === 1 && isConn;
      let boxW = 24;
      let boxH = 20;

      // Glow ring on active connected boxes
      if (isActive) {
        noStroke();
        fill(76, 175, 80, 45);
        rect(cx - boxW / 2 - 3, cy - boxH / 2 - 3, boxW + 6, boxH + 6, 7);
      }

      // Box background
      if (isConn) {
        fill(isActive ? '#4CAF50' : '#FF5722');
        stroke(isActive ? '#388E3C' : '#D84315');
      } else {
        fill(242);
        stroke(215);
      }
      strokeWeight(1.5);
      rect(cx - boxW / 2, cy - boxH / 2, boxW, boxH, 5);

      // Bit value
      fill(isConn ? 255 : 180);
      noStroke();
      textSize(12);
      textAlign(CENTER, CENTER);
      textStyle(BOLD);
      text(isConn ? '1' : '0', cx, cy);
      textStyle(NORMAL);
    }
  }
}

function drawProductLines() {
  // Lines from AND array outputs to OR array inputs
  for (let r = 0; r < numProducts; r++) {
    let y = andStartY + r * andCellH + andCellH / 2;
    let x1 = andStartX + numInputCols * andCellW;
    let x2 = orStartX;
    let isActive = evaluated && productResults[r] === 1;

    stroke(isActive ? '#00E676' : '#FF9800');
    strokeWeight(isActive ? 3 : 2);
    // Arrow-like connector
    line(x1, y, x2, y);

    // Arrow head
    fill(isActive ? '#00E676' : '#FF9800');
    noStroke();
    triangle(x2 - 2, y - 4, x2 - 2, y + 4, x2 + 3, y);
  }
}

function drawOutputLabels() {
  let outputY = orStartY + numProducts * orCellH + 25;

  for (let c = 0; c < numOutputs; c++) {
    let x = orStartX + c * orCellW + orCellW / 2;
    let val = evaluated ? outputResults[c] : '-';
    let isHigh = evaluated && outputResults[c];

    // Line from array to output box
    stroke(isHigh ? '#00E676' : '#FF8A65');
    strokeWeight(isHigh ? 2.5 : 1.5);
    line(x, orStartY + numProducts * orCellH, x, outputY - 15);

    // Output value box — styled to match project bit toggle pattern
    fill(isHigh ? '#4CAF50' : 225);
    stroke(isHigh ? '#388E3C' : 180);
    strokeWeight(1.5);
    rect(x - 14, outputY - 14, 28, 28, 5);

    // Value
    fill(isHigh ? 255 : 110);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(15);
    textStyle(BOLD);
    text(val.toString(), x, outputY);
    textStyle(NORMAL);

    // Column label below box
    fill(140);
    textSize(10);
    text('F' + c, x, outputY + 22);
  }
}

function evaluatePLA() {
  evaluated = true;

  // Get literal values: A, A', B, B', C, C'
  let literals = [
    inputs[0],
    1 - inputs[0],
    inputs[1],
    1 - inputs[1],
    inputs[2],
    1 - inputs[2]
  ];

  // Evaluate each product term
  for (let r = 0; r < numProducts; r++) {
    let hasAnyConnection = false;
    let result = 1;
    for (let c = 0; c < numInputCols; c++) {
      if (andArray[r][c]) {
        hasAnyConnection = true;
        result = result & literals[c];
      }
    }
    // If no connections, product term is 0 (not configured)
    productResults[r] = hasAnyConnection ? result : 0;
  }

  // Evaluate each output (OR of connected product terms)
  for (let c = 0; c < numOutputs; c++) {
    let result = 0;
    for (let r = 0; r < numProducts; r++) {
      if (orArray[r][c]) {
        result = result | productResults[r];
      }
    }
    outputResults[c] = result;
  }
}

function mousePressed() {
  // Check input toggles
  let spacing = 70;
  let startX = canvasWidth / 2 - spacing;
  let topY = 55;

  for (let i = 0; i < 3; i++) {
    let x = startX + i * spacing;
    let y = topY + 15;
    if (dist(mouseX, mouseY, x, y) < 18) {
      inputs[i] = 1 - inputs[i];
      evaluatePLA();
      return;
    }
  }

  // Check AND array clicks
  for (let r = 0; r < numProducts; r++) {
    for (let c = 0; c < numInputCols; c++) {
      let cx = andStartX + c * andCellW + andCellW / 2;
      let cy = andStartY + r * andCellH + andCellH / 2;
      if (Math.abs(mouseX - cx) < 11 && Math.abs(mouseY - cy) < 9) {
        andArray[r][c] = andArray[r][c] ? 0 : 1;
        evaluatePLA();
        return;
      }
    }
  }

  // Check OR array clicks
  for (let r = 0; r < numProducts; r++) {
    for (let c = 0; c < numOutputs; c++) {
      let cx = orStartX + c * orCellW + orCellW / 2;
      let cy = orStartY + r * orCellH + orCellH / 2;
      if (Math.abs(mouseX - cx) < 11 && Math.abs(mouseY - cy) < 9) {
        orArray[r][c] = orArray[r][c] ? 0 : 1;
        evaluatePLA();
        return;
      }
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
