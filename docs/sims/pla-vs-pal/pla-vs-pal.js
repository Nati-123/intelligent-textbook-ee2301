// PLA vs PAL Comparison MicroSim
// Side-by-side comparison of PLA and PAL architectures

let containerWidth;
let canvasWidth = 400;
let drawHeight = 450;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

// Shared inputs: A, B
let inputs = [0, 0];
let inputLabels = ['A', 'B'];

// PLA side: programmable AND (3 product terms x 4 cols: A, A', B, B')
// and programmable OR (3 product terms x 2 outputs)
let plaAnd = [
  [1, 0, 1, 0], // P0: A AND B
  [0, 1, 0, 0], // P1: A'
  [0, 0, 0, 1]  // P2: B'
];
let plaOr = [
  [1, 0], // P0 -> F0
  [1, 0], // P1 -> F0
  [0, 1]  // P2 -> F1
];

// PAL side: programmable AND (3 product terms x 4 cols)
// FIXED OR (product terms 0,1 -> output 0; product term 2 -> output 1)
let palAnd = [
  [1, 0, 1, 0], // P0: A AND B
  [0, 1, 0, 0], // P1: A'
  [0, 0, 0, 1]  // P2: B'
];
// PAL OR is fixed: P0,P1 -> F0; P2 -> F1
let palOrFixed = [
  [1, 0], // P0 -> F0 (fixed)
  [1, 0], // P1 -> F0 (fixed)
  [0, 1]  // P2 -> F1 (fixed)
];

let numProducts = 3;
let numInputCols = 4;
let numOutputs = 2;

// Evaluation results
let plaProductRes = [0, 0, 0];
let plaOutputRes = [0, 0];
let palProductRes = [0, 0, 0];
let palOutputRes = [0, 0];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  describe('Side-by-side comparison of PLA and PAL architectures showing programmable vs fixed OR arrays.', LABEL);
}

function draw() {
  updateCanvasSize();
  background(245);

  // Always evaluate
  evaluateArrays();

  // Title
  fill(50);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(18);
  text('PLA vs PAL Comparison', canvasWidth / 2, 18);

  // Divider
  stroke(180);
  strokeWeight(2);
  let midX = canvasWidth / 2;
  line(midX, 35, midX, drawHeight - 5);

  // Draw shared input toggles
  drawInputToggles();

  // Left side: PLA
  let halfW = midX - 10;
  drawSide(10, halfW, 'PLA: Both Programmable', '#9C27B0', '#FF5722',
           plaAnd, plaOr, true, plaProductRes, plaOutputRes);

  // Right side: PAL
  drawSide(midX + 10, halfW, 'PAL: Fixed OR Array', '#9C27B0', '#795548',
           palAnd, palOrFixed, false, palProductRes, palOutputRes);

  // Bottom comparison text
  fill(80);
  noStroke();
  textSize(11);
  textAlign(CENTER, CENTER);
  let bottomY = drawHeight + 10;
  text('PLA: More flexible, slower (two programmable arrays)', canvasWidth / 4, bottomY);
  text('PAL: Less flexible, faster (fixed OR = simpler routing)', canvasWidth * 3 / 4, bottomY);

  fill(100);
  textSize(11);
  text('Click inputs to toggle | Click crosspoints in programmable arrays', canvasWidth / 2, bottomY + 25);
}

function drawInputToggles() {
  let y = 48;

  for (let i = 0; i < 2; i++) {
    let x = canvasWidth / 2 - 40 + i * 80;
    let isOne = inputs[i] === 1;

    fill(isOne ? '#4CAF50' : '#ccc');
    stroke(isOne ? '#388E3C' : '#999');
    strokeWeight(2);
    ellipse(x, y, 28, 28);

    fill(isOne ? 255 : 60);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(13);
    textStyle(BOLD);
    text(inputLabels[i] + '=' + inputs[i], x, y);
    textStyle(NORMAL);
  }
}

function drawSide(startX, width, title, andColor, orColor,
                  andArr, orArr, orProgrammable, prodRes, outRes) {
  let cellW = Math.min(28, (width - 80) / (numInputCols + numOutputs + 2));
  let cellH = 30;
  let colLabels = ['A', "A'", 'B', "B'"];

  // Side title
  fill(50);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  textStyle(BOLD);
  text(title, startX + width / 2, 75);
  textStyle(NORMAL);

  // AND array position
  let andX = startX + 30;
  let andY = 105;
  let andW = numInputCols * cellW;
  let andH = numProducts * cellH;

  // OR array position
  let orX = andX + andW + 30;
  let orY = andY;
  let orW = numOutputs * cellW;
  let orH = numProducts * cellH;

  // AND array label
  fill(andColor);
  textSize(10);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text('AND', andX + andW / 2, andY - 25);
  text('(Prog.)', andX + andW / 2, andY - 13);
  textStyle(NORMAL);

  // OR array label
  fill(orColor);
  textSize(10);
  textStyle(BOLD);
  text('OR', orX + orW / 2, orY - 25);
  text(orProgrammable ? '(Prog.)' : '(Fixed)', orX + orW / 2, orY - 13);
  textStyle(NORMAL);

  // Column labels for AND
  fill(80);
  textSize(10);
  for (let c = 0; c < numInputCols; c++) {
    text(colLabels[c], andX + c * cellW + cellW / 2, andY - 2);
  }

  // Product labels
  textAlign(RIGHT, CENTER);
  for (let r = 0; r < numProducts; r++) {
    let y = andY + r * cellH + cellH / 2;
    fill(80);
    textSize(9);
    text('P' + r, andX - 4, y);
  }

  // Draw AND array grid
  fill(255);
  stroke(200);
  strokeWeight(1);
  rect(andX, andY + 8, andW, andH);

  // Vertical lines
  for (let c = 0; c < numInputCols; c++) {
    let x = andX + c * cellW + cellW / 2;
    stroke(230);
    strokeWeight(0.5);
    line(x, andY + 8, x, andY + 8 + andH);
  }

  // Horizontal lines + crosspoints
  for (let r = 0; r < numProducts; r++) {
    let y = andY + 8 + r * cellH + cellH / 2;
    let isActive = prodRes[r] === 1;
    stroke(isActive ? '#4CAF50' : 230);
    strokeWeight(isActive ? 1.5 : 0.5);
    line(andX, y, andX + andW, y);

    for (let c = 0; c < numInputCols; c++) {
      let cx = andX + c * cellW + cellW / 2;
      if (andArr[r][c]) {
        fill(isActive ? '#4CAF50' : andColor);
        noStroke();
        ellipse(cx, y, 10, 10);
      } else {
        noFill();
        stroke(220);
        strokeWeight(1);
        ellipse(cx, y, 6, 6);
      }
    }
  }

  // Draw OR array grid
  fill(orProgrammable ? 255 : 240);
  stroke(200);
  strokeWeight(1);
  rect(orX, orY + 8, orW, orH);

  if (!orProgrammable) {
    // Hatching to show fixed
    stroke(220);
    strokeWeight(0.5);
    for (let i = 0; i < orW + orH; i += 8) {
      let x1 = orX + i;
      let y1 = orY + 8;
      let x2 = orX + i - orH;
      let y2 = orY + 8 + orH;
      x1 = constrain(x1, orX, orX + orW);
      x2 = constrain(x2, orX, orX + orW);
      if (x1 > orX + orW) { y1 = orY + 8 + (x1 - orX - orW); x1 = orX + orW; }
      if (x2 < orX) { y2 = orY + 8 + orH - (orX - x2); x2 = orX; }
      line(x1, y1, x2, y2);
    }
  }

  // Output column labels
  fill(80);
  noStroke();
  textSize(10);
  textAlign(CENTER, CENTER);
  for (let c = 0; c < numOutputs; c++) {
    text('F' + c, orX + c * cellW + cellW / 2, orY - 2);
  }

  // Vertical lines in OR
  for (let c = 0; c < numOutputs; c++) {
    let x = orX + c * cellW + cellW / 2;
    stroke(230);
    strokeWeight(0.5);
    line(x, orY + 8, x, orY + 8 + orH);
  }

  // Horizontal lines + crosspoints for OR
  for (let r = 0; r < numProducts; r++) {
    let y = orY + 8 + r * cellH + cellH / 2;
    let isActive = prodRes[r] === 1;
    stroke(isActive ? '#4CAF50' : 230);
    strokeWeight(isActive ? 1.5 : 0.5);
    line(orX, y, orX + orW, y);

    for (let c = 0; c < numOutputs; c++) {
      let cx = orX + c * cellW + cellW / 2;
      if (orArr[r][c]) {
        let dotActive = isActive && orArr[r][c];
        if (orProgrammable) {
          fill(dotActive ? '#4CAF50' : orColor);
        } else {
          fill(dotActive ? '#4CAF50' : '#795548');
        }
        noStroke();
        if (orProgrammable) {
          ellipse(cx, y, 10, 10);
        } else {
          // Fixed connections shown as squares
          rectMode(CENTER);
          rect(cx, y, 10, 10, 1);
          rectMode(CORNER);
        }
      } else {
        noFill();
        stroke(220);
        strokeWeight(1);
        ellipse(cx, y, 6, 6);
      }
    }
  }

  // Product term connector lines
  for (let r = 0; r < numProducts; r++) {
    let y = andY + 8 + r * cellH + cellH / 2;
    let isActive = prodRes[r] === 1;
    stroke(isActive ? '#4CAF50' : '#ddd');
    strokeWeight(isActive ? 2 : 1);
    line(andX + andW, y, orX, y);
  }

  // Output values
  let outY = orY + 8 + orH + 20;
  for (let c = 0; c < numOutputs; c++) {
    let x = orX + c * cellW + cellW / 2;
    let val = outRes[c];

    fill(val ? '#4CAF50' : '#eee');
    stroke(val ? '#388E3C' : '#ccc');
    strokeWeight(1.5);
    rect(x - 12, outY - 12, 24, 24, 4);

    fill(val ? 255 : 100);
    noStroke();
    textSize(13);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text(val, x, outY);
    textStyle(NORMAL);

    // Line from OR array to output
    stroke(val ? '#4CAF50' : '#ddd');
    strokeWeight(val ? 2 : 1);
    line(x, orY + 8 + orH, x, outY - 13);
  }
}

function evaluateArrays() {
  let literals = [inputs[0], 1 - inputs[0], inputs[1], 1 - inputs[1]];

  // Evaluate PLA
  for (let r = 0; r < numProducts; r++) {
    let hasConn = false;
    let result = 1;
    for (let c = 0; c < numInputCols; c++) {
      if (plaAnd[r][c]) {
        hasConn = true;
        result = result & literals[c];
      }
    }
    plaProductRes[r] = hasConn ? result : 0;
  }
  for (let c = 0; c < numOutputs; c++) {
    let result = 0;
    for (let r = 0; r < numProducts; r++) {
      if (plaOr[r][c]) result = result | plaProductRes[r];
    }
    plaOutputRes[c] = result;
  }

  // Evaluate PAL
  for (let r = 0; r < numProducts; r++) {
    let hasConn = false;
    let result = 1;
    for (let c = 0; c < numInputCols; c++) {
      if (palAnd[r][c]) {
        hasConn = true;
        result = result & literals[c];
      }
    }
    palProductRes[r] = hasConn ? result : 0;
  }
  for (let c = 0; c < numOutputs; c++) {
    let result = 0;
    for (let r = 0; r < numProducts; r++) {
      if (palOrFixed[r][c]) result = result | palProductRes[r];
    }
    palOutputRes[c] = result;
  }
}

function mousePressed() {
  // Check input toggles
  for (let i = 0; i < 2; i++) {
    let x = canvasWidth / 2 - 40 + i * 80;
    let y = 48;
    if (dist(mouseX, mouseY, x, y) < 16) {
      inputs[i] = 1 - inputs[i];
      return;
    }
  }

  let midX = canvasWidth / 2;
  let cellW = Math.min(28, (midX - 20 - 80) / (numInputCols + numOutputs + 2));
  let cellH = 30;

  // PLA side
  let plaAndX = 10 + 30;
  let plaAndY = 105 + 8;
  let plaOrX = plaAndX + numInputCols * cellW + 30;

  // Check PLA AND array
  for (let r = 0; r < numProducts; r++) {
    for (let c = 0; c < numInputCols; c++) {
      let cx = plaAndX + c * cellW + cellW / 2;
      let cy = plaAndY + r * cellH + cellH / 2;
      if (dist(mouseX, mouseY, cx, cy) < cellW / 2) {
        plaAnd[r][c] = plaAnd[r][c] ? 0 : 1;
        return;
      }
    }
  }

  // Check PLA OR array (programmable)
  for (let r = 0; r < numProducts; r++) {
    for (let c = 0; c < numOutputs; c++) {
      let cx = plaOrX + c * cellW + cellW / 2;
      let cy = plaAndY + r * cellH + cellH / 2;
      if (dist(mouseX, mouseY, cx, cy) < cellW / 2) {
        plaOr[r][c] = plaOr[r][c] ? 0 : 1;
        return;
      }
    }
  }

  // PAL side
  let halfW = midX - 10;
  let palAndX = midX + 10 + 30;
  let palAndY = 105 + 8;

  // Check PAL AND array (programmable)
  for (let r = 0; r < numProducts; r++) {
    for (let c = 0; c < numInputCols; c++) {
      let cx = palAndX + c * cellW + cellW / 2;
      let cy = palAndY + r * cellH + cellH / 2;
      if (dist(mouseX, mouseY, cx, cy) < cellW / 2) {
        palAnd[r][c] = palAnd[r][c] ? 0 : 1;
        return;
      }
    }
  }

  // PAL OR array is NOT clickable (fixed)
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
