// AND-OR to NAND-NAND Step-by-Step Converter MicroSim
// Shows conversion process with bubble pushing
// Bloom Level: Apply (L3)
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 450;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

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
  describe('Step-by-step AND-OR to NAND-NAND conversion showing bubble pushing', LABEL);
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
  textSize(15);
  text('AND-OR to NAND-NAND Conversion', canvasWidth / 2, 8);

  // Expression
  let ex = examples[currentExample];
  fill('#1565C0');
  textSize(13);
  text(ex.name, canvasWidth / 2, 28);

  // Step indicator bar
  drawStepBar();

  // Step info
  let si = stepInfo[currentStep];
  fill(si.color);
  textAlign(CENTER, TOP);
  textSize(13);
  textStyle(BOLD);
  text(si.title, canvasWidth / 2, 70);
  textStyle(NORMAL);
  fill('#666');
  textSize(11);
  text(si.desc, canvasWidth / 2, 88);

  // Draw circuit
  drawCircuit();

  // Draw expression transformation
  drawExpressionBox();

  // Draw input toggles and output
  drawInputsAndOutput();

  // Draw controls
  drawControls();
}

function drawStepBar() {
  let barY = 50;
  let barW = canvasWidth - 80;
  let startX = 40;

  for (let i = 0; i < 4; i++) {
    let x = startX + i * (barW / 3);
    let dotR = 14;

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
    textSize(10);
    textStyle(BOLD);
    text(i + 1, x, barY);
    textStyle(NORMAL);
  }
}

function drawCircuit() {
  let cx = canvasWidth / 2;
  let cy = 195;
  let gateW = 50;
  let gateH = 30;

  // Gate positions
  let and1 = { x: cx - 80, y: cy - 40 };
  let and2 = { x: cx - 80, y: cy + 40 };
  let orGate = { x: cx + 40, y: cy };

  // Input positions
  let inputs = [
    { label: 'A', x: cx - 180, y: cy - 55 },
    { label: 'B', x: cx - 180, y: cy - 25 },
    { label: 'C', x: cx - 180, y: cy + 25 },
    { label: 'D', x: cx - 180, y: cy + 55 }
  ];

  if (currentExample === 1) {
    inputs = [
      { label: 'X', x: cx - 180, y: cy - 55 },
      { label: 'Y', x: cx - 180, y: cy - 25 },
      { label: "X'", x: cx - 180, y: cy + 25 },
      { label: 'Z', x: cx - 180, y: cy + 55 }
    ];
  }

  // Draw input wires
  stroke('#888');
  strokeWeight(1.5);
  inputs.forEach((inp, i) => {
    let gateIdx = i < 2 ? 0 : 1;
    let gate = gateIdx === 0 ? and1 : and2;
    let yOff = (i % 2 === 0) ? -8 : 8;
    line(inp.x + 22, inp.y, gate.x, gate.y + yOff);
  });

  // Draw wires from gates to OR/final
  stroke('#888');
  strokeWeight(1.5);
  line(and1.x + gateW, and1.y, orGate.x, orGate.y - 12);
  line(and2.x + gateW, and2.y, orGate.x, orGate.y + 12);
  line(orGate.x + gateW, orGate.y, orGate.x + gateW + 40, orGate.y);

  // Draw bubbles based on step
  if (currentStep === 1) {
    // Show all 4 bubbles (AND outputs + OR inputs) - they're about to be added
    drawBubble(and1.x + gateW + 1, and1.y, '#FF9800', true);
    drawBubble(and2.x + gateW + 1, and2.y, '#FF9800', true);
    drawBubble(orGate.x - 1, orGate.y - 12, '#FF9800', true);
    drawBubble(orGate.x - 1, orGate.y + 12, '#FF9800', true);
    // Output bubble pair
    drawBubble(orGate.x + gateW + 1, orGate.y, '#FF9800', true);
    drawBubble(orGate.x + gateW + 10, orGate.y, '#FF9800', true);
  }

  if (currentStep === 2) {
    // Cancellation - show X marks on the internal bubbles
    drawCancelledBubble(and1.x + gateW + 1, and1.y);
    drawCancelledBubble(and2.x + gateW + 1, and2.y);
    drawCancelledBubble(orGate.x - 1, orGate.y - 12);
    drawCancelledBubble(orGate.x - 1, orGate.y + 12);
    // Output pair cancels too
    drawCancelledBubble(orGate.x + gateW + 1, orGate.y);
    drawCancelledBubble(orGate.x + gateW + 10, orGate.y);
  }

  // Draw input circles
  inputs.forEach(inp => {
    let val = getInputVal(inp.label);
    fill(val ? '#4CAF50' : '#e0e0e0');
    stroke(val ? '#388E3C' : '#bbb');
    strokeWeight(1.5);
    ellipse(inp.x + 10, inp.y, 22);

    fill(val ? 'white' : '#666');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    text(inp.label, inp.x + 10, inp.y);
  });

  // Draw first-level gates
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
  let vOut = v1 | v2; // always same output

  drawGateShape(and1.x, and1.y, gateW, gateH, gate1Type, gate1Color, v1);
  drawGateShape(and2.x, and2.y, gateW, gateH, gate1Type, gate1Color, v2);
  drawGateShape(orGate.x, orGate.y, gateW, gateH, gate2Type, gate2Color, vOut);

  // Gate labels below
  fill('#666');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(9);
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
  fill(vOut ? '#4CAF50' : '#e0e0e0');
  stroke(vOut ? '#388E3C' : '#bbb');
  strokeWeight(1.5);
  ellipse(orGate.x + gateW + 48, orGate.y, 22);

  fill(vOut ? 'white' : '#666');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  textStyle(BOLD);
  text('F', orGate.x + gateW + 48, orGate.y);
  textStyle(NORMAL);

  // Level labels
  fill('#999');
  textSize(9);
  textAlign(CENTER, BOTTOM);
  text('Level 1', and1.x + gateW / 2, and1.y - gateH / 2 - 18);
  text('Level 2', orGate.x + gateW / 2, orGate.y - gateH / 2 - 18);
}

function drawGateShape(x, y, w, h, type, color, val) {
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
  textSize(10);
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
  text('○', x, y - 1);
  textStyle(NORMAL);
}

function drawCancelledBubble(x, y) {
  // Faded bubble with X
  fill(200, 200, 200, 120);
  stroke(150, 150, 150, 150);
  strokeWeight(1);
  ellipse(x, y, 8);

  stroke('#F44336');
  strokeWeight(2);
  line(x - 4, y - 4, x + 4, y + 4);
  line(x + 4, y - 4, x - 4, y + 4);
}

function drawExpressionBox() {
  let y = 275;
  let boxW = canvasWidth - 60;

  fill('#f5f0ff');
  stroke('#d1c4e9');
  strokeWeight(1);
  rect(30, y, boxW, 50, 6);

  fill('#5A3EED');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(11);
  textStyle(BOLD);
  text('Expression:', 42, y + 14);
  textStyle(NORMAL);

  fill('#333');
  textSize(12);
  textAlign(CENTER, CENTER);

  let ex = examples[currentExample];
  if (currentExample === 0) {
    if (currentStep === 0) {
      text('F = AB + CD', canvasWidth / 2, y + 36);
    } else if (currentStep === 1) {
      text('F = ̿(̿A̿B̿ ̿+̿ ̿C̿D̿)  →  double inversion added', canvasWidth / 2, y + 36);
    } else if (currentStep === 2) {
      textSize(11);
      text("F = (AB)' · (CD)'  →  De Morgan's applied, bubbles cancel", canvasWidth / 2, y + 36);
    } else {
      text('F = (A NAND B) NAND (C NAND D)', canvasWidth / 2, y + 36);
    }
  } else {
    if (currentStep === 0) {
      text("F = XY + X'Z", canvasWidth / 2, y + 36);
    } else if (currentStep === 1) {
      textSize(11);
      text("F = ̿(̿X̿Y̿ ̿+̿ ̿X̿'̿Z̿)  →  double inversion added", canvasWidth / 2, y + 36);
    } else if (currentStep === 2) {
      textSize(11);
      text("F = (XY)' · (X'Z)'  →  De Morgan's, bubbles cancel", canvasWidth / 2, y + 36);
    } else {
      text("F = (X NAND Y) NAND (X' NAND Z)", canvasWidth / 2, y + 36);
    }
  }
}

function drawInputsAndOutput() {
  let y = 340;

  fill('#333');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(11);
  textStyle(BOLD);
  text('Toggle inputs:', 15, y + 10);
  textStyle(NORMAL);

  let names = currentExample === 0 ? ['A', 'B', 'C', 'D'] : ['X', 'Y', "X'", 'Z'];
  let startX = 110;
  let spacing = 55;

  names.forEach((n, i) => {
    let x = startX + i * spacing;
    let val = getInputVal(n);

    fill(val ? '#4CAF50' : '#e0e0e0');
    stroke(val ? '#388E3C' : '#bbb');
    strokeWeight(1);
    rect(x, y, 42, 20, 4);

    fill(val ? 'white' : '#666');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(10);
    text(n + '=' + val, x + 21, y + 10);
  });

  // Output
  let outVal = evalCircuit();
  fill(outVal ? '#4CAF50' : '#F44336');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  textStyle(BOLD);
  text('F = ' + outVal, startX + 4 * spacing + 15, y + 10);
  textStyle(NORMAL);

  // Verification note
  fill('#666');
  textSize(9);
  textAlign(CENTER, TOP);
  text('Output is identical at every step — the function never changes', canvasWidth / 2, y + 28);
}

function drawControls() {
  let btnY = drawHeight + 12;
  let btnH = 26;

  // Prev button
  let prevEnabled = currentStep > 0;
  fill(prevEnabled ? '#2196F3' : '#e0e0e0');
  stroke(prevEnabled ? '#1976D2' : '#ccc');
  strokeWeight(1);
  rect(15, btnY, 80, btnH, 3);
  fill(prevEnabled ? 'white' : '#999');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  text('← Previous', 55, btnY + btnH / 2);

  // Next button
  let nextEnabled = currentStep < 3;
  fill(nextEnabled ? '#4CAF50' : '#e0e0e0');
  stroke(nextEnabled ? '#388E3C' : '#ccc');
  strokeWeight(1);
  rect(105, btnY, 80, btnH, 3);
  fill(nextEnabled ? 'white' : '#999');
  noStroke();
  text('Next →', 145, btnY + btnH / 2);

  // Reset button
  fill('#f44336');
  stroke('#d32f2f');
  strokeWeight(1);
  rect(195, btnY, 55, btnH, 3);
  fill('white');
  noStroke();
  text('Reset', 222, btnY + btnH / 2);

  // Example toggle
  fill('#9C27B0');
  stroke('#7B1FA2');
  strokeWeight(1);
  rect(260, btnY, 130, btnH, 3);
  fill('white');
  noStroke();
  textSize(10);
  text(examples[currentExample].name, 325, btnY + btnH / 2);

  // Tip
  fill('#666');
  textSize(9);
  textAlign(CENTER, CENTER);
  text('Step through to see how AND-OR becomes NAND-NAND', canvasWidth / 2, drawHeight + 60);
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
  let btnY = drawHeight + 12;
  let btnH = 26;

  // Previous
  if (mouseX >= 15 && mouseX <= 95 && mouseY >= btnY && mouseY <= btnY + btnH) {
    if (currentStep > 0) currentStep--;
    return;
  }

  // Next
  if (mouseX >= 105 && mouseX <= 185 && mouseY >= btnY && mouseY <= btnY + btnH) {
    if (currentStep < 3) currentStep++;
    return;
  }

  // Reset
  if (mouseX >= 195 && mouseX <= 250 && mouseY >= btnY && mouseY <= btnY + btnH) {
    currentStep = 0;
    return;
  }

  // Example toggle
  if (mouseX >= 260 && mouseX <= 390 && mouseY >= btnY && mouseY <= btnY + btnH) {
    currentExample = (currentExample + 1) % examples.length;
    currentStep = 0;
    return;
  }

  // Input toggles
  let toggleY = 340;
  let names = currentExample === 0 ? ['A', 'B', 'C', 'D'] : ['X', 'Y', "X'", 'Z'];
  let startX = 110;
  let spacing = 55;

  names.forEach((n, i) => {
    let x = startX + i * spacing;
    if (mouseX >= x && mouseX <= x + 42 && mouseY >= toggleY && mouseY <= toggleY + 20) {
      if (currentExample === 0) {
        inputVals[n] = 1 - (inputVals[n] || 0);
      } else {
        examples[1].vars[n] = 1 - (examples[1].vars[n] || 0);
      }
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
