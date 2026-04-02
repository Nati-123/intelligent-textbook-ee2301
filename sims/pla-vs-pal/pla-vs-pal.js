// PLA vs PAL Comparison MicroSim
// Side-by-side comparison of PLA and PAL architectures

let containerWidth;
let canvasWidth = 400;
let drawHeight = 520;
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
  textStyle(BOLD);
  text('PLA vs PAL Comparison', canvasWidth / 2, 18);
  textStyle(NORMAL);

  // Title underline
  stroke(220);
  strokeWeight(1);
  let titleW = min(textWidth('PLA vs PAL Comparison') + 60, canvasWidth - 40);
  line(canvasWidth / 2 - titleW / 2, 32, canvasWidth / 2 + titleW / 2, 32);

  // Divider
  stroke(200);
  strokeWeight(1);
  let midX = canvasWidth / 2;
  line(midX, 40, midX, drawHeight - 5);

  // Draw shared input toggles
  drawInputToggles();

  // Left side: PLA
  let halfW = midX - 10;
  drawSide(10, halfW, 'PLA: Both Programmable', '#9C27B0', '#FF5722',
           plaAnd, plaOr, true, plaProductRes, plaOutputRes);

  // Right side: PAL
  drawSide(midX + 10, halfW, 'PAL: Fixed OR Array', '#9C27B0', '#795548',
           palAnd, palOrFixed, false, palProductRes, palOutputRes);

  // Hand cursor on hover over clickable elements
  let hovering = false;
  for (let i = 0; i < 2; i++) {
    let hx = canvasWidth / 2 - 40 + i * 80;
    if (dist(mouseX, mouseY, hx, 48) < 16) { hovering = true; break; }
  }
  if (!hovering) {
    let cW = 24, ocW = 32, cH = 36, g = 24;
    let aW = numInputCols * cW, oW = numOutputs * ocW;
    let tW = aW + g + oW;
    let sides = [
      { ax: 10 + ((midX - 10) - tW) / 2, orClick: true },
      { ax: midX + 10 + ((midX - 10) - tW) / 2, orClick: false }
    ];
    for (let s of sides) {
      for (let r = 0; r < numProducts && !hovering; r++) {
        for (let c = 0; c < numInputCols; c++) {
          let hx = s.ax + c * cW + cW / 2;
          let hy = 120 + r * cH + cH / 2;
          if (Math.abs(mouseX - hx) < 9 && Math.abs(mouseY - hy) < 8) { hovering = true; break; }
        }
      }
      if (s.orClick && !hovering) {
        let ox = s.ax + aW + g;
        for (let r = 0; r < numProducts && !hovering; r++) {
          for (let c = 0; c < numOutputs; c++) {
            let hx = ox + c * ocW + ocW / 2;
            let hy = 120 + r * cH + cH / 2;
            if (Math.abs(mouseX - hx) < 10 && Math.abs(mouseY - hy) < 8) { hovering = true; break; }
          }
        }
      }
    }
  }
  cursor(hovering ? HAND : ARROW);

  // Comparison badges
  noStroke();
  fill(248, 244, 252);
  rect(10, drawHeight + 4, midX - 15, 20, 6);
  fill('#9C27B0');
  textSize(11);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text('PLA: More flexible, slower', canvasWidth / 4, drawHeight + 14);
  textStyle(NORMAL);

  fill(248, 244, 240);
  noStroke();
  rect(midX + 5, drawHeight + 4, midX - 15, 20, 6);
  fill('#795548');
  textStyle(BOLD);
  text('PAL: Less flexible, faster', canvasWidth * 3 / 4, drawHeight + 14);
  textStyle(NORMAL);

  // Instruction area
  fill(243, 245, 250);
  noStroke();
  rect(12, drawHeight + 28, canvasWidth - 24, 18, 6);
  fill(130);
  textSize(11);
  text('Click inputs to toggle  |  Click bit boxes in programmable arrays', canvasWidth / 2, drawHeight + 37);
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
  let cellW = 24;
  let orCellW = 32; // wider cells for OR array
  let cellH = 36;
  let colLabels = ['A', "A'", 'B', "B'"];
  let gap = 24; // gap between AND and OR arrays

  // Side title
  fill(40);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(13);
  textStyle(BOLD);
  text(title, startX + width / 2, 75);
  textStyle(NORMAL);

  // Compute array widths
  let andW = numInputCols * cellW;
  let orW = numOutputs * orCellW;
  let totalW = andW + gap + orW;

  // Center both arrays within the side panel
  let andX = startX + (width - totalW) / 2;
  let andY = 120;
  let andH = numProducts * cellH;

  let orX = andX + andW + gap;
  let orY = andY;
  let orH = numProducts * cellH;

  // AND array label
  fill(andColor);
  textSize(10);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text('AND (Prog.)', andX + andW / 2, andY - 32);
  textStyle(NORMAL);

  // OR array label
  fill(orColor);
  textSize(10);
  textStyle(BOLD);
  text('OR', orX + orW / 2, andY - 32);
  text(orProgrammable ? '(Prog.)' : '(Fixed)', orX + orW / 2, andY - 20);
  textStyle(NORMAL);

  // Column labels for AND
  fill(80);
  textSize(10);
  textAlign(CENTER, CENTER);
  for (let c = 0; c < numInputCols; c++) {
    text(colLabels[c], andX + c * cellW + cellW / 2, andY - 8);
  }

  // Product labels
  textAlign(RIGHT, CENTER);
  for (let r = 0; r < numProducts; r++) {
    let y = andY + r * cellH + cellH / 2;
    fill(80);
    textSize(9);
    text('P' + r, andX - 6, y);
  }

  // Draw AND array grid with subtle purple tint
  fill(250, 248, 255);
  stroke(200);
  strokeWeight(1);
  rect(andX, andY, andW, andH, 4);

  // Vertical lines (bright purple)
  for (let c = 0; c < numInputCols; c++) {
    let x = andX + c * cellW + cellW / 2;
    stroke('#CE93D8');
    strokeWeight(1);
    line(x, andY, x, andY + andH);
  }

  // Horizontal lines + crosspoint bit boxes
  for (let r = 0; r < numProducts; r++) {
    let y = andY + r * cellH + cellH / 2;
    let isActive = prodRes[r] === 1;
    stroke(isActive ? '#00E676' : '#CE93D8');
    strokeWeight(isActive ? 2 : 1);
    line(andX, y, andX + andW, y);

    for (let c = 0; c < numInputCols; c++) {
      let cx = andX + c * cellW + cellW / 2;
      let boxW = 20;
      let boxH = 18;

      // Glow on active connected boxes
      if (andArr[r][c] && isActive) {
        noStroke();
        fill(76, 175, 80, 45);
        rect(cx - boxW / 2 - 2, y - boxH / 2 - 2, boxW + 4, boxH + 4, 7);
      }

      if (andArr[r][c]) {
        fill(isActive ? '#4CAF50' : andColor);
        stroke(isActive ? '#388E3C' : '#7B1FA2');
      } else {
        fill(242);
        stroke(215);
      }
      strokeWeight(1.5);
      rect(cx - boxW / 2, y - boxH / 2, boxW, boxH, 4);

      fill(andArr[r][c] ? 255 : 180);
      noStroke();
      textSize(10);
      textAlign(CENTER, CENTER);
      textStyle(BOLD);
      text(andArr[r][c] ? '1' : '0', cx, y);
      textStyle(NORMAL);
    }
  }

  // Draw OR array grid with subtle tint
  fill(orProgrammable ? color(255, 251, 248) : color(248, 246, 244));
  stroke(200);
  strokeWeight(1);
  rect(orX, orY, orW, orH, 4);

  if (!orProgrammable) {
    // Hatching to show fixed
    stroke(210);
    strokeWeight(0.5);
    for (let i = 0; i < orW + orH; i += 8) {
      let x1 = orX + i;
      let y1 = orY;
      let x2 = orX + i - orH;
      let y2 = orY + orH;
      x1 = constrain(x1, orX, orX + orW);
      x2 = constrain(x2, orX, orX + orW);
      if (x1 > orX + orW) { y1 = orY + (x1 - orX - orW); x1 = orX + orW; }
      if (x2 < orX) { y2 = orY + orH - (orX - x2); x2 = orX; }
      line(x1, y1, x2, y2);
    }
  }

  // Output column labels
  fill(80);
  noStroke();
  textSize(10);
  textAlign(CENTER, CENTER);
  for (let c = 0; c < numOutputs; c++) {
    text('F' + c, orX + c * orCellW + orCellW / 2, orY - 8);
  }

  // Vertical lines in OR (bright orange)
  for (let c = 0; c < numOutputs; c++) {
    let x = orX + c * orCellW + orCellW / 2;
    stroke('#FFAB91');
    strokeWeight(1);
    line(x, orY, x, orY + orH);
  }

  // Horizontal lines + crosspoint bit boxes for OR
  for (let r = 0; r < numProducts; r++) {
    let y = orY + r * cellH + cellH / 2;
    let isActive = prodRes[r] === 1;
    stroke(isActive ? '#00E676' : '#FFAB91');
    strokeWeight(isActive ? 2 : 1);
    line(orX, y, orX + orW, y);

    for (let c = 0; c < numOutputs; c++) {
      let cx = orX + c * orCellW + orCellW / 2;
      let boxW = 22;
      let boxH = 18;
      let dotActive = isActive && orArr[r][c];

      // Glow on active connected boxes
      if (dotActive) {
        noStroke();
        fill(76, 175, 80, 45);
        rect(cx - boxW / 2 - 2, y - boxH / 2 - 2, boxW + 4, boxH + 4, 7);
      }

      if (orArr[r][c]) {
        fill(dotActive ? '#4CAF50' : orColor);
        stroke(dotActive ? '#388E3C' : (orProgrammable ? '#D84315' : '#5D4037'));
      } else {
        fill(242);
        stroke(215);
      }
      strokeWeight(1.5);
      if (orProgrammable) {
        rect(cx - boxW / 2, y - boxH / 2, boxW, boxH, 4);
      } else {
        // Fixed connections shown as squares with subtle corners
        rect(cx - boxW / 2, y - boxH / 2, boxW, boxH, 2);
      }

      fill(orArr[r][c] ? 255 : 180);
      noStroke();
      textSize(10);
      textAlign(CENTER, CENTER);
      textStyle(BOLD);
      text(orArr[r][c] ? '1' : '0', cx, y);
      textStyle(NORMAL);
    }
  }

  // Product term connector lines (bright orange)
  for (let r = 0; r < numProducts; r++) {
    let y = andY + r * cellH + cellH / 2;
    let isActive = prodRes[r] === 1;
    stroke(isActive ? '#00E676' : '#FF9800');
    strokeWeight(isActive ? 2.5 : 1.5);
    line(andX + andW, y, orX, y);
    // Arrow head
    fill(isActive ? '#00E676' : '#FF9800');
    noStroke();
    triangle(orX - 1, y - 3, orX - 1, y + 3, orX + 3, y);
  }

  // Output section
  let outY = orY + orH + 45;
  for (let c = 0; c < numOutputs; c++) {
    let x = orX + c * orCellW + orCellW / 2;
    let val = outRes[c];

    // Line from OR array to output box
    stroke(val ? '#00E676' : '#FFAB91');
    strokeWeight(val ? 2.5 : 1.5);
    line(x, orY + orH, x, outY - 15);

    // Output box — styled to match project bit toggle pattern
    fill(val ? '#4CAF50' : 225);
    stroke(val ? '#388E3C' : 180);
    strokeWeight(1.5);
    rect(x - 14, outY - 14, 28, 28, 5);

    // Output value
    fill(val ? 255 : 110);
    noStroke();
    textSize(15);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text(val, x, outY);
    textStyle(NORMAL);

    // Output label below box
    fill(140);
    textSize(10);
    text('F' + c, x, outY + 22);
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
  let cellW = 24;
  let oCellW = 32;
  let cellH = 36;
  let gap = 24;
  let andW = numInputCols * cellW;
  let orW = numOutputs * oCellW;
  let totalW = andW + gap + orW;

  // PLA side
  let plaHalfW = midX - 10;
  let plaAndX = 10 + (plaHalfW - totalW) / 2;
  let plaAndY = 120;
  let plaOrX = plaAndX + andW + gap;

  // Check PLA AND array
  for (let r = 0; r < numProducts; r++) {
    for (let c = 0; c < numInputCols; c++) {
      let cx = plaAndX + c * cellW + cellW / 2;
      let cy = plaAndY + r * cellH + cellH / 2;
      if (Math.abs(mouseX - cx) < 9 && Math.abs(mouseY - cy) < 8) {
        plaAnd[r][c] = plaAnd[r][c] ? 0 : 1;
        return;
      }
    }
  }

  // Check PLA OR array (programmable)
  for (let r = 0; r < numProducts; r++) {
    for (let c = 0; c < numOutputs; c++) {
      let cx = plaOrX + c * oCellW + oCellW / 2;
      let cy = plaAndY + r * cellH + cellH / 2;
      if (Math.abs(mouseX - cx) < 10 && Math.abs(mouseY - cy) < 8) {
        plaOr[r][c] = plaOr[r][c] ? 0 : 1;
        return;
      }
    }
  }

  // PAL side
  let palHalfW = midX - 10;
  let palAndX = midX + 10 + (palHalfW - totalW) / 2;
  let palAndY = 120;

  // Check PAL AND array (programmable)
  for (let r = 0; r < numProducts; r++) {
    for (let c = 0; c < numInputCols; c++) {
      let cx = palAndX + c * cellW + cellW / 2;
      let cy = palAndY + r * cellH + cellH / 2;
      if (Math.abs(mouseX - cx) < 9 && Math.abs(mouseY - cy) < 8) {
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
