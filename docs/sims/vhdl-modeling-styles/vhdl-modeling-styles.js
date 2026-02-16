// VHDL Modeling Styles Comparison — Enhanced v2
// Interactive comparison of dataflow, structural, and behavioral VHDL
// with synthesis result, abstraction levels, and usage guidance.
// Bloom Level: Analyze (L4)

let containerWidth;
let canvasWidth = 400;
let drawHeight = 880;
let controlHeight = 0;
let canvasHeight = drawHeight;

// Input state
let inputA = 0;
let inputB = 1;
let inputSel = 0;

// Selected column (0=dataflow, 1=structural, 2=behavioral, -1=none)
let selectedCol = -1;

// Color palette
const DATAFLOW_COLOR = '#2196F3';
const STRUCTURAL_COLOR = '#FF9800';
const BEHAVIORAL_COLOR = '#9C27B0';
const SYNTH_COLOR = '#00897B';
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
  var mainEl = document.querySelector('main');

  // -- Nav bar: Fullscreen (in iframe) / Back to Docs (standalone) --
  var navBar = document.createElement('div');
  navBar.style.cssText = 'display:flex;justify-content:flex-end;padding:4px 8px;background:#37474F;';
  var navLink = document.createElement('a');
  navLink.style.cssText = 'font-size:12px;font-weight:bold;color:#80CBC4;text-decoration:none;';
  if (window.self !== window.top) {
    navLink.href = 'main.html';
    navLink.target = '_blank';
    navLink.textContent = '⛶ Fullscreen';
  } else {
    navLink.href = 'index.html';
    navLink.textContent = '← Back to Docs';
  }
  navBar.appendChild(navLink);
  mainEl.appendChild(navBar);

  const canvas = createCanvas(containerWidth, canvasHeight);
  canvas.parent(mainEl);
  describe('Compare three VHDL modeling styles for a 2-to-1 MUX with synthesis result and abstraction guide', LABEL);
  textFont('monospace');
}

function draw() {
  updateCanvasSize();
  background(248, 249, 250);

  let output = (inputSel === 0) ? inputA : inputB;
  let m = 8;
  let y = 0;

  // ── Title bar ──
  fill('#37474F');
  noStroke();
  rect(0, 0, canvasWidth, 28);
  fill('#fff');
  textAlign(CENTER, CENTER);
  textSize(13);
  textStyle(BOLD);
  text('VHDL Modeling Styles: 2-to-1 MUX', canvasWidth / 2, 14);
  textStyle(NORMAL);
  y = 32;

  // ── Input toggles ──
  drawInputToggles(m, y, output);
  y += 38;

  // ── Three columns ──
  let colGap = 6;
  let colW = (canvasWidth - 2 * m - 2 * colGap) / 3;
  let colH = 490;

  drawStyleColumn(0, m, y, colW, colH, output);
  drawStyleColumn(1, m + colW + colGap, y, colW, colH, output);
  drawStyleColumn(2, m + 2 * (colW + colGap), y, colW, colH, output);
  y += colH + 8;

  // ── Bottom row: Synthesis Result | Abstraction Guide ──
  let botH = drawHeight - y - 4;
  let leftW = (canvasWidth - 2 * m - colGap) * 0.55;
  let rightW = canvasWidth - 2 * m - colGap - leftW;

  drawSynthesisResult(m, y, leftW, botH, output);
  drawAbstractionGuide(m + leftW + colGap, y, rightW, botH);
}

// ═══════════════════════════════════════════
//  INPUT TOGGLES
// ═══════════════════════════════════════════
function drawInputToggles(x, y, output) {
  let btnW = 68;
  let btnH = 26;
  let gap = 8;

  textAlign(CENTER, CENTER);
  textSize(12);
  textStyle(BOLD);

  // A toggle
  btnA = { x: x, y: y, w: btnW, h: btnH };
  fill(inputA ? ON_COLOR : OFF_COLOR);
  noStroke();
  rect(x, y, btnW, btnH, 4);
  fill(255);
  text('A = ' + inputA, x + btnW / 2, y + btnH / 2);

  // B toggle
  let bx = x + btnW + gap;
  btnB = { x: bx, y: y, w: btnW, h: btnH };
  fill(inputB ? ON_COLOR : OFF_COLOR);
  rect(bx, y, btnW, btnH, 4);
  fill(255);
  text('B = ' + inputB, bx + btnW / 2, y + btnH / 2);

  // Sel toggle
  let sx = bx + btnW + gap;
  btnSel = { x: sx, y: y, w: btnW, h: btnH };
  fill(inputSel ? '#E91E63' : '#607D8B');
  rect(sx, y, btnW, btnH, 4);
  fill(255);
  text('Sel = ' + inputSel, sx + btnW / 2, y + btnH / 2);

  // Output preview
  let ox = sx + btnW + gap + 4;
  fill(output ? ON_COLOR : '#78909C');
  noStroke();
  rect(ox, y, 70, btnH, 4);
  fill('#fff');
  textSize(13);
  text('Y = ' + output, ox + 35, y + btnH / 2);
  textStyle(NORMAL);
}

// ═══════════════════════════════════════════
//  STYLE COLUMN
// ═══════════════════════════════════════════
function drawStyleColumn(idx, x, y, w, h, output) {
  let isSelected = (selectedCol === idx);
  let colors = [DATAFLOW_COLOR, STRUCTURAL_COLOR, BEHAVIORAL_COLOR];
  let titles = ['Dataflow', 'Structural', 'Behavioral'];
  let subtitles = [
    'Concurrent signal assignment',
    'Gate-level component instantiation',
    'Process-based algorithmic description'
  ];
  let color = colors[idx];

  // Column background
  fill(255);
  stroke(isSelected ? color : '#ddd');
  strokeWeight(isSelected ? 2.5 : 1);
  rect(x, y, w, h, 6);

  // Store header bounds for click
  colHeaders[idx] = { x: x, y: y, w: w, h: 50 };

  // ── Header (title + subtitle) ──
  fill(color);
  noStroke();
  rect(x, y, w, 50, 6, 6, 0, 0);
  rect(x, y + 40, w, 10);

  fill('#fff');
  textAlign(CENTER, CENTER);
  textSize(13);
  textStyle(BOLD);
  text(titles[idx], x + w / 2, y + 16);
  textSize(8);
  textStyle(NORMAL);
  fill(255, 255, 255, 200);
  text(subtitles[idx], x + w / 2, y + 36);

  // ── Key Concept Highlight ──
  let kcY = y + 54;
  let kcH = 38;
  drawKeyConcept(idx, x + 4, kcY, w - 8, kcH, color);

  // ── Circuit Diagram ──
  let diagY = kcY + kcH + 4;
  let diagH = 130;
  drawCircuitDiagram(idx, x + 4, diagY, w - 8, diagH, color);

  // ── VHDL Code ──
  let codeY = diagY + diagH + 4;
  let codeH = h - (codeY - y) - 4;
  drawColumnCode(idx, x + 4, codeY, w - 8, codeH, output);
}

// ═══════════════════════════════════════════
//  KEY CONCEPT HIGHLIGHT
// ═══════════════════════════════════════════
function drawKeyConcept(idx, x, y, w, h, color) {
  // Light tinted background
  let bgColors = ['#E3F2FD', '#FFF3E0', '#F3E5F5'];
  fill(bgColors[idx]);
  stroke(color);
  strokeWeight(1);
  rect(x, y, w, h, 4);
  noStroke();

  textAlign(CENTER, CENTER);
  let cy = y + h / 2;

  if (idx === 0) {
    // Dataflow: highlight concurrent <=
    fill(color);
    textSize(8);
    textStyle(BOLD);
    text('Key Operator:', x + w / 2, cy - 10);
    textSize(14);
    text('<=', x + w / 2, cy + 7);
    // Small label
    fill('#555');
    textSize(6);
    textStyle(NORMAL);
  } else if (idx === 1) {
    // Structural: highlight component instantiation
    fill(color);
    textSize(8);
    textStyle(BOLD);
    text('Key Pattern:', x + w / 2, cy - 10);
    textSize(9);
    text('U1: AND2 port map(...)', x + w / 2, cy + 7);
    fill('#555');
    textSize(6);
    textStyle(NORMAL);
  } else {
    // Behavioral: highlight process block
    fill(color);
    textSize(8);
    textStyle(BOLD);
    text('Key Construct:', x + w / 2, cy - 10);
    textSize(9);
    text('process(...) begin ... end', x + w / 2, cy + 7);
    fill('#555');
    textSize(6);
    textStyle(NORMAL);
  }
}

// ═══════════════════════════════════════════
//  CIRCUIT DIAGRAMS
// ═══════════════════════════════════════════
function drawCircuitDiagram(idx, x, y, w, h, color) {
  fill(252);
  stroke(220);
  strokeWeight(1);
  rect(x, y, w, h, 4);

  if (idx === 0) drawDataflowDiagram(x, y, w, h);
  else if (idx === 1) drawStructuralDiagram(x, y, w, h);
  else drawBehavioralDiagram(x, y, w, h);
}

function drawDataflowDiagram(x, y, w, h) {
  let cx = x + w / 2;
  let cy = y + h / 2;

  // Input labels
  fill(60);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(10);
  textStyle(BOLD);
  text('A', x + 8, cy - 20);
  text('B', x + 8, cy + 20);
  text('Sel', x + 8, cy + 42);
  textStyle(NORMAL);

  // Concurrent assignment box
  fill(230, 240, 255);
  stroke(DATAFLOW_COLOR);
  strokeWeight(2);
  rect(cx - 30, cy - 28, 60, 56, 6);

  // <= symbol emphasized
  fill(DATAFLOW_COLOR);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(18);
  textStyle(BOLD);
  text('<=', cx, cy - 8);
  textSize(7);
  textStyle(NORMAL);
  text('concurrent', cx, cy + 10);
  text('assignment', cx, cy + 19);

  // Arrows
  stroke(DATAFLOW_COLOR);
  strokeWeight(1.2);
  line(x + 25, cy - 20, cx - 30, cy - 12);
  line(x + 25, cy + 20, cx - 30, cy + 5);
  line(x + 25, cy + 42, cx - 30, cy + 18);
  line(cx + 30, cy, x + w - 20, cy);
  // Arrowhead
  line(x + w - 20, cy, x + w - 26, cy - 4);
  line(x + w - 20, cy, x + w - 26, cy + 4);
  noStroke();

  // Output label
  fill(60);
  textAlign(RIGHT, CENTER);
  textSize(10);
  textStyle(BOLD);
  text('Y', x + w - 8, cy);
  textStyle(NORMAL);
}

function drawStructuralDiagram(x, y, w, h) {
  let cx = x + w / 2;
  let cy = y + h / 2;
  let gW = 30;
  let gH = 22;

  // Input labels
  fill(60);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(10);
  textStyle(BOLD);
  text('A', x + 6, cy - 30);
  text('B', x + 6, cy + 30);
  text('Sel', x + 6, cy + 48);
  textStyle(NORMAL);

  // NOT gate
  let notX = x + 28;
  let notY = cy - 5;
  fill(255, 245, 230);
  stroke(STRUCTURAL_COLOR);
  strokeWeight(1.5);
  beginShape();
  vertex(notX, notY - 7);
  vertex(notX + 14, notY);
  vertex(notX, notY + 7);
  endShape(CLOSE);
  noFill();
  ellipse(notX + 17, notY, 4, 4);
  fill(STRUCTURAL_COLOR);
  noStroke();
  textSize(6);
  textAlign(CENTER, CENTER);
  text('NOT', notX + 7, notY - 12);

  // AND gate 1
  let a1X = cx - 10;
  let a1Y = cy - 26;
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
  fill(STRUCTURAL_COLOR);
  noStroke();
  textSize(7);
  textStyle(BOLD);
  text('AND', a1X + gW / 3, a1Y);
  textStyle(NORMAL);

  // AND gate 2
  let a2X = cx - 10;
  let a2Y = cy + 26;
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
  fill(STRUCTURAL_COLOR);
  noStroke();
  textSize(7);
  textStyle(BOLD);
  text('AND', a2X + gW / 3, a2Y);
  textStyle(NORMAL);

  // OR gate
  let orX = cx + 28;
  let orY = cy;
  let orW = 30;
  let orH = 26;
  fill(255, 245, 230);
  stroke(STRUCTURAL_COLOR);
  strokeWeight(1.5);
  beginShape();
  vertex(orX - orW / 2, orY - orH / 2);
  bezierVertex(orX - orW / 4, orY - orH / 2, orX + orW / 3, orY - orH / 3, orX + orW / 2, orY);
  bezierVertex(orX + orW / 3, orY + orH / 3, orX - orW / 4, orY + orH / 2, orX - orW / 2, orY + orH / 2);
  bezierVertex(orX - orW / 4, orY, orX - orW / 4, orY, orX - orW / 2, orY - orH / 2);
  endShape(CLOSE);
  fill(STRUCTURAL_COLOR);
  noStroke();
  textSize(7);
  textStyle(BOLD);
  text('OR', orX, orY);
  textStyle(NORMAL);

  // Wires
  stroke(STRUCTURAL_COLOR);
  strokeWeight(1);
  line(x + 16, cy - 30, a1X, a1Y - 5);
  line(notX + 19, notY, a1X - 3, notY);
  line(a1X - 3, notY, a1X, a1Y + 5);
  line(x + 16, cy + 30, a2X, a2Y - 5);
  line(x + 22, cy + 48, a2X - 6, cy + 48);
  line(a2X - 6, cy + 48, a2X, a2Y + 5);
  line(x + 22, cy + 48, x + 22, notY);
  line(x + 22, notY, notX, notY);
  line(a1X + gW / 2 + gW / 2, a1Y, orX - orW / 2 + 2, orY - 7);
  line(a2X + gW / 2 + gW / 2, a2Y, orX - orW / 2 + 2, orY + 7);
  strokeWeight(1.5);
  line(orX + orW / 2, orY, x + w - 14, orY);
  noStroke();

  fill(60);
  textAlign(RIGHT, CENTER);
  textSize(10);
  textStyle(BOLD);
  text('Y', x + w - 5, orY);
  textStyle(NORMAL);
}

function drawBehavioralDiagram(x, y, w, h) {
  let cx = x + w / 2 - 8;
  let cy = y + h / 2;

  // Process block (larger, more prominent)
  fill(240, 230, 250);
  stroke(BEHAVIORAL_COLOR);
  strokeWeight(2);
  rect(cx - 38, cy - 32, 76, 64, 6);

  // Process header bar
  fill(BEHAVIORAL_COLOR);
  noStroke();
  rect(cx - 38, cy - 32, 76, 16, 6, 6, 0, 0);
  rect(cx - 38, cy - 22, 76, 6);
  fill('#fff');
  textAlign(CENTER, CENTER);
  textSize(8);
  textStyle(BOLD);
  text('process', cx, cy - 24);

  // Process body
  fill(BEHAVIORAL_COLOR);
  textStyle(NORMAL);
  textSize(7);
  text('if Sel=\'0\' then', cx, cy - 8);
  text('Y <= A;', cx, cy + 3);
  text('else Y <= B;', cx, cy + 14);
  text('end if;', cx, cy + 25);

  // Input arrows
  stroke(BEHAVIORAL_COLOR);
  strokeWeight(1);
  line(x + 10, cy - 15, cx - 38, cy - 15);
  line(x + 10, cy + 15, cx - 38, cy + 15);
  line(cx + 38, cy, x + w - 14, cy);
  // Arrowhead
  line(x + w - 14, cy, x + w - 20, cy - 4);
  line(x + w - 14, cy, x + w - 20, cy + 4);
  noStroke();

  // Labels
  fill(60);
  textAlign(LEFT, CENTER);
  textSize(9);
  textStyle(BOLD);
  text('A,B', x + 5, cy - 15);
  text('Sel', x + 5, cy + 15);
  textAlign(RIGHT, CENTER);
  text('Y', x + w - 5, cy);
  textStyle(NORMAL);

  // Sensitivity list note
  fill('#999');
  textSize(6);
  textAlign(CENTER, TOP);
  text('sensitivity list: (A, B, Sel)', cx, cy + 38);
}

// ═══════════════════════════════════════════
//  VHDL CODE PANELS
// ═══════════════════════════════════════════
function drawColumnCode(idx, x, y, w, h, output) {
  fill(CODE_BG);
  noStroke();
  rect(x, y, w, h, 4);

  // Code label
  let colors = [DATAFLOW_COLOR, STRUCTURAL_COLOR, BEHAVIORAL_COLOR];
  fill(colors[idx]);
  textAlign(LEFT, TOP);
  textSize(7);
  textStyle(BOLD);
  text('VHDL CODE', x + 5, y + 3);
  textStyle(NORMAL);

  let selN = 1 - inputSel;
  let t1 = inputA & selN;
  let t2 = inputB & inputSel;

  let codeLines = [];
  if (idx === 0) {
    codeLines = [
      { txt: 'architecture dataflow of', c: KEYWORD_COLOR },
      { txt: '  mux2to1 is', c: '#FFCB6B' },
      { txt: 'begin', c: KEYWORD_COLOR },
      { txt: '  Y <= (A and not Sel)', c: KEYWORD_COLOR, hl: true },
      { txt: '       or', c: KEYWORD_COLOR },
      { txt: '       (B and Sel);', c: KEYWORD_COLOR, hl: true },
      { txt: 'end dataflow;', c: KEYWORD_COLOR },
      { txt: '', c: CODE_TEXT },
      { txt: '-- A=' + inputA + ', B=' + inputB + ', Sel=' + inputSel, c: '#69F0AE' },
      { txt: '-- ' + inputA + ' and ' + selN + ' = ' + t1, c: '#69F0AE' },
      { txt: '-- ' + inputB + ' and ' + inputSel + ' = ' + t2, c: '#69F0AE' },
      { txt: '-- Y = ' + t1 + ' or ' + t2 + ' = ' + output, c: '#FFEB3B', hl: true }
    ];
  } else if (idx === 1) {
    codeLines = [
      { txt: 'architecture structural of', c: KEYWORD_COLOR },
      { txt: '  mux2to1 is', c: '#FFCB6B' },
      { txt: '  signal Sn,T1,T2: STD_LOGIC;', c: '#C3E88D' },
      { txt: 'begin', c: KEYWORD_COLOR },
      { txt: '  U1: NOT1 port map', c: '#FFCB6B', hl: true },
      { txt: '    (Sel, Sn);', c: CODE_TEXT },
      { txt: '  U2: AND2 port map', c: '#FFCB6B', hl: true },
      { txt: '    (A, Sn, T1);', c: CODE_TEXT },
      { txt: '  U3: AND2 port map', c: '#FFCB6B', hl: true },
      { txt: '    (B, Sel, T2);', c: CODE_TEXT },
      { txt: '  U4: OR2 port map', c: '#FFCB6B', hl: true },
      { txt: '    (T1, T2, Y);', c: CODE_TEXT },
      { txt: 'end structural;', c: KEYWORD_COLOR },
      { txt: '-- Y = ' + output, c: '#FFEB3B', hl: true }
    ];
  } else {
    let selIsZero = (inputSel === 0);
    codeLines = [
      { txt: 'architecture behavioral of', c: KEYWORD_COLOR },
      { txt: '  mux2to1 is', c: '#FFCB6B' },
      { txt: 'begin', c: KEYWORD_COLOR },
      { txt: '  process(A, B, Sel)', c: KEYWORD_COLOR, hl: true },
      { txt: '  begin', c: KEYWORD_COLOR },
      { txt: '    if Sel = \'0\' then', c: KEYWORD_COLOR, hl: selIsZero },
      { txt: '      Y <= A;', c: selIsZero ? '#FFEB3B' : '#546E7A', hl: selIsZero },
      { txt: '    else', c: KEYWORD_COLOR },
      { txt: '      Y <= B;', c: !selIsZero ? '#FFEB3B' : '#546E7A', hl: !selIsZero },
      { txt: '    end if;', c: KEYWORD_COLOR },
      { txt: '  end process;', c: KEYWORD_COLOR, hl: true },
      { txt: 'end behavioral;', c: KEYWORD_COLOR },
      { txt: '-- Y = ' + output, c: '#FFEB3B', hl: true }
    ];
  }

  textSize(8);
  textAlign(LEFT, TOP);
  let lineH = 12;
  let startY = y + 14;

  for (let i = 0; i < codeLines.length; i++) {
    let ly = startY + i * lineH;
    if (ly + lineH > y + h) break;

    if (codeLines[i].hl) {
      noStroke();
      fill(255, 255, 255, 18);
      rect(x + 2, ly - 1, w - 4, lineH, 2);
    }

    fill(codeLines[i].c);
    noStroke();
    text(codeLines[i].txt, x + 5, ly);
  }
}

// ═══════════════════════════════════════════
//  SYNTHESIS RESULT (Bottom Left)
// ═══════════════════════════════════════════
function drawSynthesisResult(x, y, w, h, output) {
  fill('#E0F2F1');
  stroke(SYNTH_COLOR);
  strokeWeight(1.5);
  rect(x, y, w, h, 6);
  noStroke();

  // Header
  fill(SYNTH_COLOR);
  textAlign(LEFT, TOP);
  textSize(11);
  textStyle(BOLD);
  text('Synthesis Result', x + 8, y + 6);
  textStyle(NORMAL);

  // Subtitle
  fill('#555');
  textSize(8);
  text('All three styles synthesize to identical hardware', x + 8, y + 22);

  // ── Three arrows converging to MUX ──
  let cx = x + w / 2;
  let muxCY = y + h / 2 + 18;
  let arrowStartX = x + 20;
  let muxX = cx - 5;

  // Source labels with colored dots
  let sources = [
    { label: 'Dataflow', color: DATAFLOW_COLOR, yOff: -40 },
    { label: 'Structural', color: STRUCTURAL_COLOR, yOff: 0 },
    { label: 'Behavioral', color: BEHAVIORAL_COLOR, yOff: 40 }
  ];

  for (let i = 0; i < sources.length; i++) {
    let sy = muxCY + sources[i].yOff;
    let labelX = arrowStartX;

    // Colored dot
    fill(sources[i].color);
    noStroke();
    ellipse(labelX, sy, 8, 8);

    // Label
    textAlign(LEFT, CENTER);
    textSize(8);
    textStyle(BOLD);
    text(sources[i].label, labelX + 7, sy);
    textStyle(NORMAL);

    // Arrow to MUX
    stroke(sources[i].color);
    strokeWeight(1.2);
    let endX = muxX - 22;
    line(labelX + 55, sy, endX, sy);
    // Converge to MUX input
    stroke('#999');
    strokeWeight(1);
    line(endX, sy, muxX - 2, muxCY + (sources[i].yOff * 0.4));
    noStroke();
  }

  // ── MUX Symbol (trapezoid) ──
  let muxW = 30;
  let muxH = 55;
  let muxLeft = muxX;
  let muxRight = muxX + muxW;

  fill('#B2DFDB');
  stroke(SYNTH_COLOR);
  strokeWeight(2);
  beginShape();
  vertex(muxLeft, muxCY - muxH / 2);
  vertex(muxRight, muxCY - muxH / 3);
  vertex(muxRight, muxCY + muxH / 3);
  vertex(muxLeft, muxCY + muxH / 2);
  endShape(CLOSE);
  noStroke();

  // MUX labels inside
  fill(SYNTH_COLOR);
  textAlign(CENTER, CENTER);
  textSize(9);
  textStyle(BOLD);
  text('MUX', muxLeft + muxW / 2, muxCY - 6);
  textSize(7);
  textStyle(NORMAL);
  text('2:1', muxLeft + muxW / 2, muxCY + 6);

  // Input labels on MUX
  fill('#333');
  textSize(7);
  textStyle(BOLD);
  textAlign(RIGHT, CENTER);
  text('A', muxLeft - 3, muxCY - muxH / 3);
  text('B', muxLeft - 3, muxCY + muxH / 3);
  textAlign(CENTER, TOP);
  text('Sel', muxLeft + muxW / 2, muxCY + muxH / 2 + 3);
  textStyle(NORMAL);

  // Sel input wire (from bottom)
  stroke('#E91E63');
  strokeWeight(1.2);
  line(muxLeft + muxW / 2, muxCY + muxH / 2, muxLeft + muxW / 2, muxCY + muxH / 2 + 2);
  noStroke();

  // Output wire
  stroke(SYNTH_COLOR);
  strokeWeight(2);
  let outEndX = muxRight + 40;
  line(muxRight, muxCY, outEndX, muxCY);
  line(outEndX, muxCY, outEndX - 5, muxCY - 4);
  line(outEndX, muxCY, outEndX - 5, muxCY + 4);
  noStroke();

  // Output LED
  let ledX = outEndX + 10;
  fill(output ? ON_COLOR : '#888');
  stroke(output ? '#2E7D32' : '#555');
  strokeWeight(1.5);
  ellipse(ledX, muxCY, 16, 16);
  noStroke();
  fill('#fff');
  textAlign(CENTER, CENTER);
  textSize(10);
  textStyle(BOLD);
  text(output, ledX, muxCY);

  // Y label
  fill('#333');
  textAlign(LEFT, CENTER);
  textSize(10);
  text('Y=' + output, ledX + 12, muxCY);
  textStyle(NORMAL);

  // "Final Hardware" label
  fill(SYNTH_COLOR);
  textAlign(CENTER, TOP);
  textSize(8);
  textStyle(BOLD);
  text('Final Hardware', muxLeft + muxW / 2, muxCY + muxH / 2 + 14);
  textStyle(NORMAL);

  // Equal sign emphasis
  fill('#333');
  textSize(7);
  textAlign(CENTER, BOTTOM);
  text('Same gate-level netlist', cx - 15, y + h - 5);
}

// ═══════════════════════════════════════════
//  ABSTRACTION GUIDE (Bottom Right)
// ═══════════════════════════════════════════
function drawAbstractionGuide(x, y, w, h) {
  fill('#FFF8E1');
  stroke('#FFA000');
  strokeWeight(1.5);
  rect(x, y, w, h, 6);
  noStroke();

  // Header
  fill('#E65100');
  textAlign(LEFT, TOP);
  textSize(11);
  textStyle(BOLD);
  text('Modeling Guide', x + 8, y + 6);
  textStyle(NORMAL);

  // ── Abstraction Level Indicator ──
  let barX = x + 14;
  let barY = y + 28;
  let barH = 80;
  let barW = 6;

  // Gradient bar
  for (let i = 0; i < barH; i++) {
    let t = i / barH;
    let r = lerp(0x9C, 0x21, t);
    let g = lerp(0x27, 0x96, t);
    let b = lerp(0xB0, 0xF3, t);
    stroke(r, g, b);
    strokeWeight(1);
    line(barX, barY + i, barX + barW, barY + i);
  }
  noStroke();

  // Abstraction labels
  let levels = [
    { label: 'Behavioral', sublabel: 'Highest', color: BEHAVIORAL_COLOR, yFrac: 0.0 },
    { label: 'Dataflow', sublabel: 'Medium', color: DATAFLOW_COLOR, yFrac: 0.5 },
    { label: 'Structural', sublabel: 'Lowest', color: STRUCTURAL_COLOR, yFrac: 1.0 }
  ];

  textAlign(LEFT, CENTER);
  for (let i = 0; i < levels.length; i++) {
    let ly = barY + barH * levels[i].yFrac;
    // Dot on bar
    fill(levels[i].color);
    noStroke();
    ellipse(barX + barW / 2, ly, 10, 10);
    // Label
    textSize(8);
    textStyle(BOLD);
    text(levels[i].label, barX + barW + 8, ly - 4);
    fill('#888');
    textSize(6);
    textStyle(NORMAL);
    text(levels[i].sublabel + ' abstraction', barX + barW + 8, ly + 6);
  }

  // Arrow label
  fill('#999');
  textSize(6);
  textAlign(CENTER, CENTER);
  push();
  translate(barX - 4, barY + barH / 2);
  rotate(-HALF_PI);
  text('Abstraction', 0, 0);
  pop();

  // ── When to Use ──
  let guideY = barY + barH + 16;
  fill('#E65100');
  textAlign(LEFT, TOP);
  textSize(9);
  textStyle(BOLD);
  text('When to Use', x + 8, guideY);
  textStyle(NORMAL);

  guideY += 14;
  let guides = [
    { color: DATAFLOW_COLOR, lines: ['Simple combinational', 'logic, Boolean equations'] },
    { color: STRUCTURAL_COLOR, lines: ['Hierarchical designs,', 'reusing components'] },
    { color: BEHAVIORAL_COLOR, lines: ['Complex logic, FSMs,', 'sequential circuits'] }
  ];

  for (let i = 0; i < guides.length; i++) {
    let gy = guideY + i * 30;
    // Colored bullet
    fill(guides[i].color);
    noStroke();
    ellipse(x + 14, gy + 6, 6, 6);

    fill('#444');
    textAlign(LEFT, TOP);
    textSize(7);
    for (let j = 0; j < guides[i].lines.length; j++) {
      text(guides[i].lines[j], x + 20, gy + j * 10);
    }
  }
}

// ═══════════════════════════════════════════
//  MOUSE INTERACTION
// ═══════════════════════════════════════════
function mousePressed() {
  if (isInside(mouseX, mouseY, btnA)) { inputA = 1 - inputA; return; }
  if (isInside(mouseX, mouseY, btnB)) { inputB = 1 - inputB; return; }
  if (isInside(mouseX, mouseY, btnSel)) { inputSel = 1 - inputSel; return; }

  for (let i = 0; i < colHeaders.length; i++) {
    if (colHeaders[i] && isInside(mouseX, mouseY, colHeaders[i])) {
      selectedCol = (selectedCol === i) ? -1 : i;
      return;
    }
  }
}

function isInside(mx, my, b) {
  return mx > b.x && mx < b.x + b.w && my > b.y && my < b.y + b.h;
}

// ═══════════════════════════════════════════
//  CANVAS SIZING
// ═══════════════════════════════════════════
function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, canvasHeight);
}

function updateCanvasSize() {
  var container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
  canvasHeight = drawHeight;
}
