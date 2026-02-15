// VHDL Modeling Styles MicroSim
// Compare dataflow, structural, and behavioral VHDL modeling approaches

let containerWidth;
let canvasWidth = 400;
let drawHeight = 450;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

// Input state
let inputA = 0;
let inputB = 1;
let inputSel = 0;

// Selected column (0=dataflow, 1=structural, 2=behavioral)
let selectedCol = -1;

// Color palette
const DATAFLOW_COLOR = '#2196F3';
const STRUCTURAL_COLOR = '#FF9800';
const BEHAVIORAL_COLOR = '#9C27B0';
const CODE_BG = '#263238';
const CODE_TEXT = '#ECEFF1';
const KEYWORD_COLOR = '#82B1FF';
const ON_COLOR = '#4CAF50';
const OFF_COLOR = '#999999';

// Button bounds
let btnA, btnB, btnSel;
let colHeaders = [];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  describe('Compare three VHDL modeling styles for a 2-to-1 multiplexer with interactive inputs', LABEL);
}

function draw() {
  updateCanvasSize();
  background(245);

  // Compute the MUX output
  let output = (inputSel === 0) ? inputA : inputB;

  // Draw input toggles at top
  drawInputToggles();

  // Column width
  let colW = (canvasWidth - 40) / 3;
  let colStartY = 80;
  let colH = 340;

  // Draw three columns
  drawColumn(0, 10, colStartY, colW, colH, 'Dataflow', DATAFLOW_COLOR, output);
  drawColumn(1, 15 + colW, colStartY, colW, colH, 'Structural', STRUCTURAL_COLOR, output);
  drawColumn(2, 20 + colW * 2, colStartY, colW, colH, 'Behavioral', BEHAVIORAL_COLOR, output);

  // Draw shared output at bottom
  drawOutputBar(output);
}

function drawInputToggles() {
  let y = 10;
  let btnW = 70;
  let btnH = 28;
  let spacing = 15;

  textAlign(CENTER, CENTER);
  textSize(13);

  // A toggle
  let ax = 10;
  btnA = { x: ax, y: y, w: btnW, h: btnH };
  fill(inputA ? ON_COLOR : OFF_COLOR);
  noStroke();
  rect(ax, y, btnW, btnH, 4);
  fill(255);
  text('A = ' + inputA, ax + btnW / 2, y + btnH / 2);

  // B toggle
  let bx = ax + btnW + spacing;
  btnB = { x: bx, y: y, w: btnW, h: btnH };
  fill(inputB ? ON_COLOR : OFF_COLOR);
  rect(bx, y, btnW, btnH, 4);
  fill(255);
  text('B = ' + inputB, bx + btnW / 2, y + btnH / 2);

  // Sel toggle
  let sx = bx + btnW + spacing;
  btnSel = { x: sx, y: y, w: btnW, h: btnH };
  fill(inputSel ? '#E91E63' : '#607D8B');
  rect(sx, y, btnW, btnH, 4);
  fill(255);
  text('Sel = ' + inputSel, sx + btnW / 2, y + btnH / 2);

  // Output preview
  fill(60);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(14);
  textStyle(BOLD);
  let output = (inputSel === 0) ? inputA : inputB;
  text('Y = ' + output, sx + btnW + 20, y + btnH / 2);
  textStyle(NORMAL);
}

function drawColumn(idx, x, y, w, h, title, color, output) {
  let isSelected = (selectedCol === idx);

  // Column background
  fill(255);
  stroke(isSelected ? color : 200);
  strokeWeight(isSelected ? 3 : 1);
  rect(x, y, w, h, 6);

  // Store header bounds
  colHeaders[idx] = { x: x, y: y, w: w, h: 30 };

  // Header
  fill(color);
  noStroke();
  rect(x, y, w, 30, 6, 6, 0, 0);
  // Cover bottom rounding
  rect(x, y + 20, w, 10);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(14);
  textStyle(BOLD);
  text(title, x + w / 2, y + 15);
  textStyle(NORMAL);

  // Draw circuit diagram in middle section
  let diagY = y + 35;
  let diagH = 130;
  drawCircuitDiagram(idx, x + 5, diagY, w - 10, diagH, color);

  // Draw VHDL code at bottom of column
  let codeY = diagY + diagH + 5;
  let codeH = h - (codeY - y) - 5;
  drawColumnCode(idx, x + 5, codeY, w - 10, codeH);
}

function drawCircuitDiagram(idx, x, y, w, h, color) {
  let cx = x + w / 2;
  let cy = y + h / 2;

  fill(252);
  stroke(220);
  strokeWeight(1);
  rect(x, y, w, h, 4);

  if (idx === 0) {
    // Dataflow: signal flow arrows
    drawDataflowDiagram(x, y, w, h);
  } else if (idx === 1) {
    // Structural: gate-level components
    drawStructuralDiagram(x, y, w, h);
  } else {
    // Behavioral: process block
    drawBehavioralDiagram(x, y, w, h);
  }
}

function drawDataflowDiagram(x, y, w, h) {
  let cx = x + w / 2;
  let cy = y + h / 2;

  // Signal flow: A and B inputs → concurrent assignment → Y
  fill(60);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(10);
  text('A', x + 8, cy - 20);
  text('B', x + 8, cy + 20);
  text('Sel', x + 8, cy + 40);

  // Assignment box
  fill(230, 240, 255);
  stroke(DATAFLOW_COLOR);
  strokeWeight(1.5);
  rect(cx - 25, cy - 25, 50, 50, 4);
  fill(DATAFLOW_COLOR);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(9);
  text('<=', cx, cy - 5);
  textSize(8);
  text('concurrent', cx, cy + 10);

  // Arrows
  stroke(100);
  strokeWeight(1);
  line(x + 22, cy - 20, cx - 25, cy - 10);
  line(x + 22, cy + 20, cx - 25, cy + 10);
  line(cx + 25, cy, x + w - 20, cy);

  // Output label
  fill(60);
  noStroke();
  textAlign(RIGHT, CENTER);
  textSize(10);
  text('Y', x + w - 8, cy);
}

function drawStructuralDiagram(x, y, w, h) {
  let cx = x + w / 2;
  let cy = y + h / 2;
  let gW = 34;
  let gH = 24;

  // Input labels
  fill(60);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(10);
  textStyle(BOLD);
  text('A', x + 6, cy - 30);
  text('B', x + 6, cy + 30);
  text('Sel', x + 6, cy + 50);
  textStyle(NORMAL);

  // NOT gate for Sel (triangle + bubble)
  let notX = x + 30;
  let notY = cy - 5;
  fill(255, 245, 230);
  stroke(STRUCTURAL_COLOR);
  strokeWeight(1.5);
  beginShape();
  vertex(notX, notY - 8);
  vertex(notX + 16, notY);
  vertex(notX, notY + 8);
  endShape(CLOSE);
  // Bubble
  noFill();
  stroke(STRUCTURAL_COLOR);
  strokeWeight(1.5);
  ellipse(notX + 19, notY, 5, 5);
  // NOT label
  fill(STRUCTURAL_COLOR);
  noStroke();
  textSize(7);
  textAlign(CENTER, CENTER);
  text('NOT', notX + 8, notY - 14);

  // AND gate 1 (A AND NOT Sel) — flat left + rounded right
  let a1X = cx - 12;
  let a1Y = cy - 28;
  fill(255, 245, 230);
  stroke(STRUCTURAL_COLOR);
  strokeWeight(1.5);
  beginShape();
  vertex(a1X, a1Y - gH / 2);
  vertex(a1X + gW / 2, a1Y - gH / 2);
  endShape();
  arc(a1X + gW / 2, a1Y, gW, gH, -HALF_PI, HALF_PI);
  line(a1X, a1Y - gH / 2, a1X, a1Y + gH / 2);
  line(a1X, a1Y + gH / 2, a1X + gW / 2, a1Y + gH / 2);
  // Label
  fill(STRUCTURAL_COLOR);
  noStroke();
  textSize(8);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text('AND', a1X + gW / 3, a1Y);
  textStyle(NORMAL);

  // AND gate 2 (B AND Sel)
  let a2X = cx - 12;
  let a2Y = cy + 28;
  fill(255, 245, 230);
  stroke(STRUCTURAL_COLOR);
  strokeWeight(1.5);
  beginShape();
  vertex(a2X, a2Y - gH / 2);
  vertex(a2X + gW / 2, a2Y - gH / 2);
  endShape();
  arc(a2X + gW / 2, a2Y, gW, gH, -HALF_PI, HALF_PI);
  line(a2X, a2Y - gH / 2, a2X, a2Y + gH / 2);
  line(a2X, a2Y + gH / 2, a2X + gW / 2, a2Y + gH / 2);
  // Label
  fill(STRUCTURAL_COLOR);
  noStroke();
  textSize(8);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text('AND', a2X + gW / 3, a2Y);
  textStyle(NORMAL);

  // OR gate — curved shape
  let orX = cx + 30;
  let orY = cy;
  let orW = 34;
  let orH = 30;
  fill(255, 245, 230);
  stroke(STRUCTURAL_COLOR);
  strokeWeight(1.5);
  beginShape();
  vertex(orX - orW / 2, orY - orH / 2);
  bezierVertex(orX - orW / 4, orY - orH / 2, orX + orW / 3, orY - orH / 3, orX + orW / 2, orY);
  bezierVertex(orX + orW / 3, orY + orH / 3, orX - orW / 4, orY + orH / 2, orX - orW / 2, orY + orH / 2);
  bezierVertex(orX - orW / 4, orY, orX - orW / 4, orY, orX - orW / 2, orY - orH / 2);
  endShape(CLOSE);
  // Label
  fill(STRUCTURAL_COLOR);
  noStroke();
  textSize(8);
  textStyle(BOLD);
  text('OR', orX, orY);
  textStyle(NORMAL);

  // Wires: inputs to AND gates
  stroke('#FF9800');
  strokeWeight(1.2);
  // A -> AND1 top input
  line(x + 16, cy - 30, a1X, a1Y - 6);
  // Sel_n -> AND1 bottom input
  line(notX + 22, notY, a1X - 4, notY);
  line(a1X - 4, notY, a1X, a1Y + 6);
  // B -> AND2 top input
  line(x + 16, cy + 30, a2X, a2Y - 6);
  // Sel -> AND2 bottom input
  line(x + 22, cy + 50, a2X - 8, cy + 50);
  line(a2X - 8, cy + 50, a2X, a2Y + 6);
  // Sel -> NOT
  line(x + 22, cy + 50, x + 22, notY);
  line(x + 22, notY, notX, notY);

  // AND outputs to OR inputs
  line(a1X + gW / 2 + gW / 2, a1Y, orX - orW / 2 + 2, orY - 8);
  line(a2X + gW / 2 + gW / 2, a2Y, orX - orW / 2 + 2, orY + 8);

  // OR output to Y
  stroke('#FF9800');
  strokeWeight(1.5);
  line(orX + orW / 2, orY, x + w - 14, orY);

  // Output label
  fill(60);
  noStroke();
  textAlign(RIGHT, CENTER);
  textSize(10);
  textStyle(BOLD);
  text('Y', x + w - 5, orY);
  textStyle(NORMAL);
}

function drawBehavioralDiagram(x, y, w, h) {
  let cx = x + w / 2;
  let cy = y + h / 2;

  // Process block
  fill(240, 230, 250);
  stroke(BEHAVIORAL_COLOR);
  strokeWeight(1.5);
  rect(cx - 35, cy - 30, 70, 60, 4);

  fill(BEHAVIORAL_COLOR);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(9);
  textStyle(BOLD);
  text('process', cx, cy - 20);
  textStyle(NORMAL);
  textSize(8);
  text('if Sel=0', cx, cy - 5);
  text('  Y <= A', cx, cy + 7);
  text('else Y <= B', cx, cy + 19);

  // Input arrows
  stroke(150);
  strokeWeight(1);
  line(x + 10, cy - 15, cx - 35, cy - 15);
  line(x + 10, cy + 15, cx - 35, cy + 15);
  line(cx + 35, cy, x + w - 10, cy);

  // Labels
  fill(60);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(9);
  text('A,B,Sel', x + 5, cy + 35);
  textAlign(RIGHT, CENTER);
  text('Y', x + w - 5, cy);
}

function drawColumnCode(idx, x, y, w, h) {
  // Code background
  fill(CODE_BG);
  noStroke();
  rect(x, y, w, h, 4);

  let output = (inputSel === 0) ? inputA : inputB;
  let selN = 1 - inputSel;
  let t1 = inputA & selN;
  let t2 = inputB & inputSel;

  let codeLines = [];
  if (idx === 0) {
    // Dataflow - show evaluated values
    codeLines = [
      { txt: '-- Dataflow (A=' + inputA + ' B=' + inputB + ')', color: '#69F0AE', active: false },
      { txt: 'Y <= (' + inputA + ' AND NOT ' + inputSel + ')', color: KEYWORD_COLOR, active: true },
      { txt: '     OR', color: KEYWORD_COLOR, active: false },
      { txt: '     (' + inputB + ' AND ' + inputSel + ');', color: KEYWORD_COLOR, active: true },
      { txt: '', color: CODE_TEXT, active: false },
      { txt: '-- ' + inputA + ' AND ' + selN + ' = ' + t1, color: '#69F0AE', active: false },
      { txt: '-- ' + inputB + ' AND ' + inputSel + ' = ' + t2, color: '#69F0AE', active: false },
      { txt: '-- Y = ' + t1 + ' OR ' + t2 + ' = ' + output, color: '#FFEB3B', active: true }
    ];
  } else if (idx === 1) {
    // Structural - show signal values at each gate
    codeLines = [
      { txt: '-- Structural', color: '#69F0AE', active: false },
      { txt: 'Sel=' + inputSel + ' -> NOT -> ' + selN, color: '#FFAB91', active: true },
      { txt: 'A=' + inputA + ', Sel_n=' + selN, color: CODE_TEXT, active: false },
      { txt: '  -> AND -> T1=' + t1, color: '#FFAB91', active: t1 === 1 },
      { txt: 'B=' + inputB + ', Sel=' + inputSel, color: CODE_TEXT, active: false },
      { txt: '  -> AND -> T2=' + t2, color: '#FFAB91', active: t2 === 1 },
      { txt: 'T1=' + t1 + ', T2=' + t2, color: CODE_TEXT, active: false },
      { txt: '  -> OR  -> Y=' + output, color: '#FFEB3B', active: true }
    ];
  } else {
    // Behavioral - highlight active branch
    let selIsZero = (inputSel === 0);
    codeLines = [
      { txt: '-- Behavioral', color: '#69F0AE', active: false },
      { txt: 'process(A,B,Sel)', color: KEYWORD_COLOR, active: false },
      { txt: 'begin', color: KEYWORD_COLOR, active: false },
      { txt: '  if Sel=\'0\' then', color: KEYWORD_COLOR, active: selIsZero },
      { txt: '    Y <= A;  -- ' + inputA, color: selIsZero ? '#FFEB3B' : '#546E7A', active: selIsZero },
      { txt: '  else', color: KEYWORD_COLOR, active: !selIsZero },
      { txt: '    Y <= B;  -- ' + inputB, color: !selIsZero ? '#FFEB3B' : '#546E7A', active: !selIsZero },
      { txt: '  end if;', color: KEYWORD_COLOR, active: false },
      { txt: 'end process;', color: KEYWORD_COLOR, active: false },
      { txt: '-- Y = ' + output, color: '#FFEB3B', active: true }
    ];
  }

  textSize(9);
  textAlign(LEFT, TOP);
  let lineH = 13;

  for (let i = 0; i < codeLines.length; i++) {
    let ly = y + 6 + i * lineH;
    if (ly + lineH > y + h) break;

    let cl = codeLines[i];

    // Highlight active lines with a background bar
    if (cl.active) {
      noStroke();
      fill(255, 255, 255, 20);
      rect(x + 2, ly - 1, w - 4, lineH, 2);
    }

    fill(cl.color);
    noStroke();
    text(cl.txt, x + 6, ly);
  }
}

function drawOutputBar(output) {
  let y = drawHeight + 10;
  let barH = 30;

  fill(output ? ON_COLOR : OFF_COLOR);
  noStroke();
  rect(10, y, canvasWidth - 20, barH, 4);

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(14);
  textStyle(BOLD);
  text('All 3 styles produce: Y = ' + output + '  (Sel=' + inputSel + ', selecting ' + (inputSel === 0 ? 'A=' + inputA : 'B=' + inputB) + ')', canvasWidth / 2, y + barH / 2);
  textStyle(NORMAL);
}

function mousePressed() {
  // Check input toggles
  if (isInside(mouseX, mouseY, btnA)) {
    inputA = 1 - inputA;
    return;
  }
  if (isInside(mouseX, mouseY, btnB)) {
    inputB = 1 - inputB;
    return;
  }
  if (isInside(mouseX, mouseY, btnSel)) {
    inputSel = 1 - inputSel;
    return;
  }

  // Check column headers
  for (let i = 0; i < colHeaders.length; i++) {
    if (colHeaders[i] && isInside(mouseX, mouseY, colHeaders[i])) {
      selectedCol = (selectedCol === i) ? -1 : i;
      return;
    }
  }
}

function isInside(mx, my, bounds) {
  return mx > bounds.x && mx < bounds.x + bounds.w && my > bounds.y && my < bounds.y + bounds.h;
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
