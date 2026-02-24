// Two-Level vs Multi-Level Circuit Comparison MicroSim
// Compare implementations side by side
// Bloom Level: Understand (L2) - Compare, contrast
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 420;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

// Input values
let inputVals = { A: 1, B: 0, C: 1, D: 1, E: 0 };

// Animation
let animating = false;
let animProgress = 0;

// Gate delay in ns
let gateDelay = 2;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  describe('Side-by-side comparison of two-level and multi-level circuit implementations', LABEL);
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
  fill('#212121');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(16);
  text('Two-Level vs Multi-Level Comparison', canvasWidth / 2, 8);

  // Function
  fill('#1565C0');
  textSize(12);
  text('F = A(B + C(D + E))  =  AB + ACD + ACE', canvasWidth / 2, 28);

  // Divider
  stroke('#ccc');
  strokeWeight(1);
  let midX = canvasWidth / 2;
  line(midX, 45, midX, drawHeight - 5);

  // Draw left panel (Two-Level)
  drawTwoLevel(10, 50, midX - 20);

  // Draw right panel (Multi-Level)
  drawMultiLevel(midX + 10, 50, midX - 20);

  // Draw shared inputs
  drawInputToggles();

  // Draw comparison metrics
  drawMetrics();

  // Draw controls
  drawControls();

  // Animation
  if (animating) {
    animProgress += 0.8;
    if (animProgress > 100) {
      animProgress = 0;
    }
  }
}

// ── Evaluate functions ──
function evalTwoLevel() {
  let A = inputVals.A, B = inputVals.B, C = inputVals.C, D = inputVals.D, E = inputVals.E;
  let t1 = A & B;
  let t2 = A & C & D;
  let t3 = A & C & E;
  return t1 | t2 | t3;
}

function evalMultiLevel() {
  let A = inputVals.A, B = inputVals.B, C = inputVals.C, D = inputVals.D, E = inputVals.E;
  let g1 = D | E;
  let g2 = C & g1;
  let g3 = B | g2;
  return A & g3;
}

// ── Two-Level SOP: AB + ACD + ACE ──
function drawTwoLevel(ox, oy, w) {
  // Panel label
  fill('#5A3EED');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(13);
  textStyle(BOLD);
  text('Two-Level (SOP)', ox + w / 2, oy);
  textStyle(NORMAL);

  fill('#666');
  textSize(10);
  text('AB + ACD + ACE', ox + w / 2, oy + 16);

  let gateW = 36;
  let gateH = 22;
  let startY = oy + 42;
  let gateCol1 = ox + w * 0.55;
  let gateCol2 = ox + w * 0.85;

  // AND gates
  let andGates = [
    { label: 'AB', y: startY, inputs: ['A', 'B'], val: inputVals.A & inputVals.B },
    { label: 'ACD', y: startY + 50, inputs: ['A', 'C', 'D'], val: inputVals.A & inputVals.C & inputVals.D },
    { label: 'ACE', y: startY + 100, inputs: ['A', 'C', 'E'], val: inputVals.A & inputVals.C & inputVals.E }
  ];

  // Draw input labels
  let inputNames = ['A', 'B', 'C', 'D', 'E'];
  let inputYs = {};
  for (let i = 0; i < 5; i++) {
    let iy = startY - 8 + i * 28;
    inputYs[inputNames[i]] = iy;
    fill(inputVals[inputNames[i]] ? '#4CAF50' : '#999');
    noStroke();
    textAlign(RIGHT, CENTER);
    textSize(11);
    text(inputNames[i] + '=' + inputVals[inputNames[i]], ox + 30, iy);
  }

  // Draw wires from inputs to AND gates
  stroke('#bbb');
  strokeWeight(1);
  andGates.forEach(g => {
    g.inputs.forEach((inp, idx) => {
      let iy = inputYs[inp];
      let gy = g.y + (idx - (g.inputs.length - 1) / 2) * 8;
      line(ox + 33, iy, gateCol1, gy);
    });
  });

  // Draw AND gates
  andGates.forEach(g => {
    let active = g.val === 1;
    fill(active ? '#4CAF50' : '#2196F3');
    stroke(active ? '#388E3C' : '#1565C0');
    strokeWeight(1.5);
    rect(gateCol1, g.y - gateH / 2, gateW, gateH, 0, 8, 8, 0);

    fill('white');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(8);
    text('AND', gateCol1 + gateW / 2, g.y);

    // Fan-in label
    fill('#999');
    textSize(8);
    textAlign(LEFT, CENTER);
    text(g.inputs.length + '-in', gateCol1 + gateW + 2, g.y + 10);
  });

  // Wires from AND to OR
  let orY = startY + 50;
  stroke('#bbb');
  strokeWeight(1);
  andGates.forEach(g => {
    line(gateCol1 + gateW, g.y, gateCol2, orY + (g.y - orY) * 0.3);
  });

  // OR gate
  let orVal = evalTwoLevel();
  fill(orVal ? '#4CAF50' : '#9C27B0');
  stroke(orVal ? '#388E3C' : '#7B1FA2');
  strokeWeight(1.5);
  rect(gateCol2, orY - gateH / 2, gateW, gateH, 0, 12, 12, 0);

  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(8);
  text('OR', gateCol2 + gateW / 2, orY);

  // Fan-in label
  fill('#999');
  textSize(8);
  textAlign(LEFT, CENTER);
  text('3-in', gateCol2 + gateW + 2, orY + 10);

  // Output
  let outX = gateCol2 + gateW + 6;
  stroke(orVal ? '#4CAF50' : '#999');
  strokeWeight(2);
  line(gateCol2 + gateW, orY, outX + 12, orY);

  fill(orVal ? '#4CAF50' : '#ddd');
  stroke(orVal ? '#388E3C' : '#bbb');
  strokeWeight(1.5);
  ellipse(outX + 20, orY, 16);

  fill(orVal ? 'white' : '#666');
  noStroke();
  textSize(9);
  textAlign(CENTER, CENTER);
  text('F', outX + 20, orY);

  // Stats box
  let statsY = startY + 145;
  fill('#f5f0ff');
  stroke('#d1c4e9');
  strokeWeight(1);
  rect(ox + 5, statsY, w - 10, 55, 6);

  fill('#5A3EED');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(10);
  textStyle(BOLD);
  text('Two-Level Stats', ox + 12, statsY + 5);
  textStyle(NORMAL);
  fill('#333');
  textSize(9);
  text('Gates: 4 (3 AND + 1 OR)', ox + 12, statsY + 20);
  text('Levels: 2      Max fan-in: 3', ox + 12, statsY + 33);

  fill('#F44336');
  textStyle(BOLD);
  text('Delay: ' + (2 * gateDelay) + ' ns', ox + 12, statsY + 43);
  textStyle(NORMAL);
}

// ── Multi-Level Factored: A(B + C(D + E)) ──
function drawMultiLevel(ox, oy, w) {
  // Panel label
  fill('#5A3EED');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(13);
  textStyle(BOLD);
  text('Multi-Level (Factored)', ox + w / 2, oy);
  textStyle(NORMAL);

  fill('#666');
  textSize(10);
  text('A(B + C(D + E))', ox + w / 2, oy + 16);

  let gateW = 34;
  let gateH = 20;
  let startY = oy + 42;

  // Gate positions (4 levels)
  let g1 = { x: ox + w * 0.25, y: startY + 90, type: 'OR', label: 'D+E' };
  let g2 = { x: ox + w * 0.45, y: startY + 60, type: 'AND', label: 'C·g1' };
  let g3 = { x: ox + w * 0.65, y: startY + 30, type: 'OR', label: 'B+g2' };
  let g4 = { x: ox + w * 0.85, y: startY + 10, type: 'AND', label: 'A·g3' };

  let allGates = [g1, g2, g3, g4];

  // Evaluate
  let v1 = inputVals.D | inputVals.E;
  let v2 = inputVals.C & v1;
  let v3 = inputVals.B | v2;
  let v4 = inputVals.A & v3;
  let gateVals = [v1, v2, v3, v4];

  // Input labels
  let inputMap = [
    { name: 'A', gateIdx: 3, side: 'top' },
    { name: 'B', gateIdx: 2, side: 'top' },
    { name: 'C', gateIdx: 1, side: 'top' },
    { name: 'D', gateIdx: 0, side: 'top' },
    { name: 'E', gateIdx: 0, side: 'bot' }
  ];

  // Draw wires between gates
  stroke('#bbb');
  strokeWeight(1);
  // g1 → g2
  line(g1.x + gateW, g1.y, g2.x, g2.y + 5);
  // g2 → g3
  line(g2.x + gateW, g2.y, g3.x, g3.y + 5);
  // g3 → g4
  line(g3.x + gateW, g3.y, g4.x, g4.y + 5);

  // Draw input wires
  inputMap.forEach(im => {
    let g = allGates[im.gateIdx];
    let gy = im.side === 'top' ? g.y - 5 : g.y + 5;
    let ix = g.x - 18;
    let iy = gy - 15;

    stroke('#bbb');
    strokeWeight(1);
    line(ix + 10, iy + 10, g.x, gy);

    fill(inputVals[im.name] ? '#4CAF50' : '#999');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(10);
    text(im.name, ix + 5, iy + 3);
  });

  // Draw critical path animation
  if (animating || animProgress > 0) {
    let p = animProgress / 100;
    stroke('#F44336');
    strokeWeight(3);

    // D → g1
    if (p > 0) {
      let t = min(p * 5, 1);
      let ey = g1.y + 5;
      line(g1.x - 8, ey - 10, lerp(g1.x - 8, g1.x, t), lerp(ey - 10, ey, t));
    }
    // g1 → g2
    if (p > 0.2) {
      let t = min((p - 0.2) * 5, 1);
      line(g1.x + gateW, g1.y, lerp(g1.x + gateW, g2.x, t), lerp(g1.y, g2.y + 5, t));
    }
    // g2 → g3
    if (p > 0.4) {
      let t = min((p - 0.4) * 5, 1);
      line(g2.x + gateW, g2.y, lerp(g2.x + gateW, g3.x, t), lerp(g2.y, g3.y + 5, t));
    }
    // g3 → g4
    if (p > 0.6) {
      let t = min((p - 0.6) * 5, 1);
      line(g3.x + gateW, g3.y, lerp(g3.x + gateW, g4.x, t), lerp(g3.y, g4.y + 5, t));
    }
    // g4 → F
    if (p > 0.8) {
      let t = min((p - 0.8) * 5, 1);
      line(g4.x + gateW, g4.y, lerp(g4.x + gateW, g4.x + gateW + 18, t), g4.y);
    }
  }

  // Draw gates
  allGates.forEach((g, i) => {
    let active = gateVals[i] === 1;
    let isAnd = g.type === 'AND';

    fill(active ? '#4CAF50' : (isAnd ? '#2196F3' : '#9C27B0'));
    stroke(active ? '#388E3C' : (isAnd ? '#1565C0' : '#7B1FA2'));
    strokeWeight(1.5);

    if (isAnd) {
      rect(g.x, g.y - gateH / 2, gateW, gateH, 0, 8, 8, 0);
    } else {
      rect(g.x, g.y - gateH / 2, gateW, gateH, 0, 10, 10, 0);
    }

    fill('white');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(7);
    text(g.type, g.x + gateW / 2, g.y);

    // Level label
    fill('#999');
    textSize(7);
    textAlign(CENTER, TOP);
    text('L' + (i + 1), g.x + gateW / 2, g.y + gateH / 2 + 2);
  });

  // Output
  let outVal = v4;
  stroke(outVal ? '#4CAF50' : '#999');
  strokeWeight(2);
  line(g4.x + gateW, g4.y, g4.x + gateW + 18, g4.y);

  fill(outVal ? '#4CAF50' : '#ddd');
  stroke(outVal ? '#388E3C' : '#bbb');
  strokeWeight(1.5);
  ellipse(g4.x + gateW + 26, g4.y, 16);

  fill(outVal ? 'white' : '#666');
  noStroke();
  textSize(9);
  textAlign(CENTER, CENTER);
  text('F', g4.x + gateW + 26, g4.y);

  // Stats box
  let statsY = startY + 145;
  fill('#f5f0ff');
  stroke('#d1c4e9');
  strokeWeight(1);
  rect(ox + 5, statsY, w - 10, 55, 6);

  fill('#5A3EED');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(10);
  textStyle(BOLD);
  text('Multi-Level Stats', ox + 12, statsY + 5);
  textStyle(NORMAL);
  fill('#333');
  textSize(9);
  text('Gates: 4 (2 AND + 2 OR)', ox + 12, statsY + 20);
  text('Levels: 4      Max fan-in: 2', ox + 12, statsY + 33);

  fill('#F44336');
  textStyle(BOLD);
  text('Delay: ' + (4 * gateDelay) + ' ns', ox + 12, statsY + 43);
  textStyle(NORMAL);
}

// ── Shared input toggles ──
function drawInputToggles() {
  let y = drawHeight - 32;

  fill('#333');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(11);
  textStyle(BOLD);
  text('Inputs:', 12, y);
  textStyle(NORMAL);

  let names = ['A', 'B', 'C', 'D', 'E'];
  let startX = 68;
  let spacing = 52;

  names.forEach((n, i) => {
    let x = startX + i * spacing;
    let val = inputVals[n];

    // Toggle button
    fill(val ? '#4CAF50' : '#e0e0e0');
    stroke(val ? '#388E3C' : '#bbb');
    strokeWeight(1);
    rect(x, y - 10, 38, 20, 4);

    fill(val ? 'white' : '#666');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(10);
    text(n + '=' + val, x + 19, y);
  });

  // Output display
  let outVal = evalTwoLevel();
  let outX = startX + 5 * spacing + 10;
  fill(outVal ? '#4CAF50' : '#F44336');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  textStyle(BOLD);
  text('F = ' + outVal, outX, y);
  textStyle(NORMAL);
}

// ── Comparison metrics bar ──
function drawMetrics() {
  let y = drawHeight - 62;
  let midX = canvasWidth / 2;

  // Comparison bar
  fill('#E8EAF6');
  stroke('#9FA8DA');
  strokeWeight(1);
  rect(10, y, canvasWidth - 20, 22, 4);

  fill('#333');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(10);
  text('Trade-off: Two-level has less delay (' + (2 * gateDelay) + ' ns) but needs higher fan-in (3)  |  Multi-level uses only 2-input gates but takes ' + (4 * gateDelay) + ' ns', canvasWidth / 2, y + 11);
}

// ── Controls ──
function drawControls() {
  let btnY = drawHeight + 15;
  let btnH = 25;

  // Animate button
  fill(animating ? '#F44336' : '#4CAF50');
  stroke(animating ? '#d32f2f' : '#388E3C');
  strokeWeight(1);
  rect(15, btnY, 110, btnH, 3);

  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  text(animating ? 'Pause Animation' : 'Animate Critical Path', 70, btnY + btnH / 2);

  // Reset button
  fill('#2196F3');
  stroke('#1976D2');
  strokeWeight(1);
  rect(135, btnY, 60, btnH, 3);

  fill('white');
  noStroke();
  text('Reset', 165, btnY + btnH / 2);

  // Delay control
  fill('#333');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(10);
  text('Gate delay:', 210, btnY + btnH / 2);

  // Decrease delay
  fill('#e0e0e0');
  stroke('#bbb');
  strokeWeight(1);
  rect(275, btnY + 2, 22, btnH - 4, 3);
  fill('#333');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(13);
  text('−', 286, btnY + btnH / 2);

  // Delay value
  fill('#1565C0');
  textSize(12);
  textStyle(BOLD);
  text(gateDelay + ' ns', 315, btnY + btnH / 2);
  textStyle(NORMAL);

  // Increase delay
  fill('#e0e0e0');
  stroke('#bbb');
  strokeWeight(1);
  rect(345, btnY + 2, 22, btnH - 4, 3);
  fill('#333');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(13);
  text('+', 356, btnY + btnH / 2);

  // Tip
  fill('#666');
  textSize(9);
  textAlign(CENTER, CENTER);
  text('Click input buttons to toggle values  |  Red path = critical path', canvasWidth / 2, drawHeight + 60);
}

function mousePressed() {
  let btnY = drawHeight + 15;
  let btnH = 25;

  // Animate button
  if (mouseX >= 15 && mouseX <= 125 && mouseY >= btnY && mouseY <= btnY + btnH) {
    animating = !animating;
    if (animating) animProgress = 0;
    return;
  }

  // Reset button
  if (mouseX >= 135 && mouseX <= 195 && mouseY >= btnY && mouseY <= btnY + btnH) {
    animating = false;
    animProgress = 0;
    return;
  }

  // Decrease delay
  if (mouseX >= 275 && mouseX <= 297 && mouseY >= btnY && mouseY <= btnY + btnH) {
    gateDelay = max(1, gateDelay - 1);
    return;
  }

  // Increase delay
  if (mouseX >= 345 && mouseX <= 367 && mouseY >= btnY && mouseY <= btnY + btnH) {
    gateDelay = min(10, gateDelay + 1);
    return;
  }

  // Input toggles
  let toggleY = drawHeight - 32;
  let names = ['A', 'B', 'C', 'D', 'E'];
  let startX = 68;
  let spacing = 52;

  names.forEach((n, i) => {
    let x = startX + i * spacing;
    if (mouseX >= x && mouseX <= x + 38 && mouseY >= toggleY - 10 && mouseY <= toggleY + 10) {
      inputVals[n] = 1 - inputVals[n];
    }
  });
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
