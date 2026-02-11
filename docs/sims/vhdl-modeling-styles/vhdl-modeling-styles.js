// VHDL Modeling Styles MicroSim
// Compare dataflow, structural, and behavioral VHDL modeling approaches

let containerWidth;
let canvasWidth = 400;
let drawHeight = 530;
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
  let colGap = 8;
  let colW = (canvasWidth - 20 - colGap * 2) / 3;
  let colStartY = 55;
  let colH = 420;

  // Draw three columns
  drawColumn(0, 10, colStartY, colW, colH, 'Dataflow', DATAFLOW_COLOR, output);
  drawColumn(1, 10 + colW + colGap, colStartY, colW, colH, 'Structural', STRUCTURAL_COLOR, output);
  drawColumn(2, 10 + (colW + colGap) * 2, colStartY, colW, colH, 'Behavioral', BEHAVIORAL_COLOR, output);

  // Draw shared output at bottom
  drawOutputBar(output);

  // Hand cursor on hover over clickable elements
  let hovering = false;
  if (btnA && isInside(mouseX, mouseY, btnA)) hovering = true;
  if (btnB && isInside(mouseX, mouseY, btnB)) hovering = true;
  if (btnSel && isInside(mouseX, mouseY, btnSel)) hovering = true;
  for (let i = 0; i < colHeaders.length; i++) {
    if (colHeaders[i] && isInside(mouseX, mouseY, colHeaders[i])) { hovering = true; break; }
  }
  cursor(hovering ? HAND : ARROW);
}

function drawInputToggles() {
  let y = 12;
  let spacing = 20;

  // Input boxes layout
  let inputs = [
    { label: 'A', val: inputA, color: ON_COLOR, offColor: OFF_COLOR },
    { label: 'B', val: inputB, color: ON_COLOR, offColor: OFF_COLOR },
    { label: 'Sel', val: inputSel, color: '#E91E63', offColor: '#607D8B' }
  ];

  let totalW = inputs.length * 80 + (inputs.length - 1) * spacing;
  let startX = (canvasWidth - totalW - 80) / 2;

  for (let i = 0; i < inputs.length; i++) {
    let inp = inputs[i];
    let bx = startX + i * (80 + spacing);
    let btnW = 80;
    let btnH = 32;

    // Label
    fill(80);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(13);
    textStyle(BOLD);
    text(inp.label, bx, y + btnH / 2);
    textStyle(NORMAL);

    // Bit box
    let boxX = bx + 30;
    let boxW = 44;
    let boxH = btnH;

    fill(inp.val ? inp.color : inp.offColor);
    stroke(inp.val ? inp.color : color(160));
    strokeWeight(2);
    rect(boxX, y, boxW, boxH, 5);

    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(15);
    textStyle(BOLD);
    text(inp.val, boxX + boxW / 2, y + boxH / 2);
    textStyle(NORMAL);

    // Store bounds
    if (i === 0) btnA = { x: boxX, y: y, w: boxW, h: boxH };
    else if (i === 1) btnB = { x: boxX, y: y, w: boxW, h: boxH };
    else btnSel = { x: boxX, y: y, w: boxW, h: boxH };
  }

  // Output preview
  let output = (inputSel === 0) ? inputA : inputB;
  let outX = startX + inputs.length * (80 + spacing);
  fill(output ? ON_COLOR : OFF_COLOR);
  stroke(output ? '#388E3C' : color(160));
  strokeWeight(2);
  rect(outX, y, 50, 32, 5);

  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(15);
  textStyle(BOLD);
  text('Y=' + output, outX + 25, y + 16);
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
  let diagY = y + 38;
  let diagH = 150;
  drawCircuitDiagram(idx, x + 5, diagY, w - 10, diagH, color);

  // Draw VHDL code
  let codeY = diagY + diagH + 8;
  let codeH = h - (codeY - y) - 50;
  drawColumnCode(idx, x + 5, codeY, w - 10, codeH);

  // Output Y box at bottom of column
  let outBoxY = y + h - 38;
  let outBoxH = 30;
  let outBoxX = x + 10;
  let outBoxW = w - 20;

  fill(output ? ON_COLOR : OFF_COLOR);
  stroke(output ? '#388E3C' : color(160));
  strokeWeight(2);
  rect(outBoxX, outBoxY, outBoxW, outBoxH, 5);

  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);
  textStyle(BOLD);
  text('Y = ' + output, outBoxX + outBoxW / 2, outBoxY + outBoxH / 2);
  textStyle(NORMAL);
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
  let gateW = 28;
  let gateH = 18;

  // NOT gate for Sel
  fill(255);
  stroke(STRUCTURAL_COLOR);
  strokeWeight(1.2);
  let notX = x + 25;
  let notY = cy - 25;
  triangle(notX, notY - 7, notX, notY + 7, notX + 14, notY);
  ellipse(notX + 16, notY, 4, 4);

  // AND gate 1 (A AND NOT Sel)
  let and1X = cx - 15;
  let and1Y = cy - 20;
  fill(255);
  stroke(STRUCTURAL_COLOR);
  rect(and1X, and1Y - gateH / 2, gateW / 2, gateH);
  arc(and1X + gateW / 2, and1Y, gateW, gateH, -HALF_PI, HALF_PI);
  fill(60);
  noStroke();
  textSize(7);
  textAlign(CENTER, CENTER);
  text('AND', and1X + 10, and1Y);

  // AND gate 2 (B AND Sel)
  let and2X = cx - 15;
  let and2Y = cy + 20;
  fill(255);
  stroke(STRUCTURAL_COLOR);
  strokeWeight(1.2);
  rect(and2X, and2Y - gateH / 2, gateW / 2, gateH);
  arc(and2X + gateW / 2, and2Y, gateW, gateH, -HALF_PI, HALF_PI);
  fill(60);
  noStroke();
  textSize(7);
  text('AND', and2X + 10, and2Y);

  // OR gate
  let orX = cx + 25;
  let orY = cy;
  fill(255);
  stroke(STRUCTURAL_COLOR);
  strokeWeight(1.2);
  arc(orX, orY, gateW, gateH * 2, -HALF_PI, HALF_PI);
  fill(60);
  noStroke();
  textSize(7);
  text('OR', orX + 5, orY);

  // Connection lines
  stroke(150);
  strokeWeight(0.8);
  line(and1X + gateW, and1Y, orX, orY - 8);
  line(and2X + gateW, and2Y, orX, orY + 8);
  line(orX + gateW / 2 + 2, orY, x + w - 15, orY);

  // Labels
  fill(60);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(9);
  text('A', x + 5, and1Y - 5);
  text('B', x + 5, and2Y + 5);
  text('Sel', x + 5, cy + 40);
  textAlign(RIGHT, CENTER);
  text('Y', x + w - 5, orY);
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

  let lines = [];
  if (idx === 0) {
    lines = [
      '-- Dataflow',
      'Y <= (A AND NOT Sel)',
      '     OR',
      '     (B AND Sel);'
    ];
  } else if (idx === 1) {
    lines = [
      '-- Structural',
      'U1: NOT1 port map',
      '  (Sel, Sel_n);',
      'U2: AND2 port map',
      '  (A, Sel_n, T1);',
      'U3: AND2 port map',
      '  (B, Sel, T2);',
      'U4: OR2 port map',
      '  (T1, T2, Y);'
    ];
  } else {
    lines = [
      '-- Behavioral',
      'process(A, B, Sel)',
      'begin',
      '  if Sel=\'0\' then',
      '    Y <= A;',
      '  else',
      '    Y <= B;',
      '  end if;',
      'end process;'
    ];
  }

  textSize(10);
  textAlign(LEFT, TOP);
  let lineH = 15;

  for (let i = 0; i < lines.length; i++) {
    let ly = y + 6 + i * lineH;
    if (ly + lineH > y + h) break;

    let line = lines[i];
    if (line.startsWith('--')) {
      fill('#69F0AE');
    } else {
      // Simple keyword highlighting
      let keywords = ['process', 'begin', 'end', 'if', 'then', 'else', 'port', 'map', 'NOT', 'AND', 'OR'];
      let hasKeyword = keywords.some(k => line.includes(k));
      fill(hasKeyword ? KEYWORD_COLOR : CODE_TEXT);
    }
    text(line, x + 6, ly);
  }
}

function drawOutputBar(output) {
  let y = drawHeight + 8;
  let barH = 34;

  fill(output ? ON_COLOR : OFF_COLOR);
  noStroke();
  rect(10, y, canvasWidth - 20, barH, 5);

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(13);
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
