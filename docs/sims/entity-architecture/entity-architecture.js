// Entity-Architecture RTL Teaching Module
// Interactive VHDL entity/architecture explorer with toggle switches,
// live logic evaluation, truth table, waveform, and synthesis mapping
// Bloom Level: Analyze (L4)

let containerWidth;
let canvasWidth = 400;
let drawHeight = 1250;
let controlHeight = 0;
let canvasHeight = drawHeight + controlHeight;

// ── View state ──
let archMode = 'behavioral'; // 'behavioral' or 'structural'
let currentComponent = 0;    // 0=AND, 1=OR, 2=NAND, 3=XOR

// ── Interactive signals ──
let sigA = 0;
let sigB = 0;
let sigY = 0;
let prevA = 0;
let prevB = 0;
let prevY = 0;

// ── Animation ──
let evalAnimProgress = 0;
let evalAnimating = false;
let evalAnimStart = 0;
let evalAnimDuration = 400;

// ── Waveform ──
let waveHistory = [];
let maxWaveEntries = 20;
let waveTime = 0;

// ── Color palette ──
const COL_ENTITY   = '#5C6BC0';
const COL_ENTITY_BG= '#E8EAF6';
const COL_INPUT    = '#4CAF50';
const COL_OUTPUT   = '#E91E63';
const COL_WIRE_HI  = '#4CAF50';
const COL_WIRE_LO  = '#90A4AE';
const COL_GATE     = '#37474F';
const COL_CODE_BG  = '#263238';
const COL_CODE_TXT = '#ECEFF1';
const COL_KEYWORD  = '#82B1FF';
const COL_STRING   = '#C3E88D';
const COL_COMMENT  = '#546E7A';
const COL_IDENT    = '#FFCB6B';
const COL_PUNCT    = '#89DDFF';
const COL_ACTIVE   = '#FF9800';
const COL_SYNTH    = '#00897B';

// ── Gate definitions ──
const GATES = [
  { name: 'and2',  label: 'AND',  op: function(a,b){ return a & b; }, vhdlOp: 'and',  symbol: 'AND'  },
  { name: 'or2',   label: 'OR',   op: function(a,b){ return a | b; }, vhdlOp: 'or',   symbol: 'OR'   },
  { name: 'nand2', label: 'NAND', op: function(a,b){ return (a & b) ^ 1; }, vhdlOp: 'nand', symbol: 'NAND' },
  { name: 'xor2',  label: 'XOR',  op: function(a,b){ return a ^ b; }, vhdlOp: 'xor',  symbol: 'XOR'  }
];

// ── Click targets ──
let switchABounds = null;
let switchBBounds = null;
let gateBtnBounds = [];
let modeBtnBounds = {};

// ═══════════════════════════════════════════
//  SETUP
// ═══════════════════════════════════════════
function setup() {
  updateCanvasSize();
  var mainEl = document.querySelector('main');

  // DOM control bar
  var bar = document.createElement('div');
  bar.className = 'ea-controls';
  mainEl.appendChild(bar);

  // Gate selector buttons
  for (var i = 0; i < GATES.length; i++) {
    (function(idx) {
      var btn = document.createElement('button');
      btn.className = 'ea-btn ea-btn--gate' + (idx === 0 ? ' ea-btn--gate-active' : '');
      btn.textContent = GATES[idx].label;
      btn.id = 'gate-btn-' + idx;
      btn.addEventListener('click', function() { selectGate(idx); });
      bar.appendChild(btn);
    })(i);
  }

  // Separator
  var sep = document.createElement('span');
  sep.style.cssText = 'width:1px;height:24px;background:#bbb;margin:0 4px;';
  bar.appendChild(sep);

  // Mode toggle buttons
  var behBtn = document.createElement('button');
  behBtn.className = 'ea-btn ea-btn--mode ea-btn--mode-active';
  behBtn.textContent = 'Behavioral';
  behBtn.id = 'mode-beh';
  behBtn.addEventListener('click', function() { setMode('behavioral'); });
  bar.appendChild(behBtn);

  var strBtn = document.createElement('button');
  strBtn.className = 'ea-btn ea-btn--mode';
  strBtn.textContent = 'Structural';
  strBtn.id = 'mode-str';
  strBtn.addEventListener('click', function() { setMode('structural'); });
  bar.appendChild(strBtn);

  // Reset waveform
  var resetBtn = document.createElement('button');
  resetBtn.className = 'ea-btn ea-btn--reset';
  resetBtn.textContent = 'Reset';
  resetBtn.addEventListener('click', function() { resetWaveform(); });
  bar.appendChild(resetBtn);

  // Fullscreen link
  var navLink = document.createElement('a');
  navLink.style.cssText = 'margin-left:auto;font-size:11px;font-weight:bold;color:#5C6BC0;';
  if (window.self !== window.top) {
    navLink.href = 'main.html'; navLink.target = '_blank'; navLink.textContent = 'Fullscreen';
  } else {
    navLink.href = '#'; navLink.textContent = 'Close';
    navLink.addEventListener('click', function(e) { e.preventDefault(); window.close(); });
  }
  bar.appendChild(navLink);

  const canvas = createCanvas(containerWidth, canvasHeight);
  canvas.parent(mainEl);
  describe('Interactive VHDL entity-architecture teaching module with toggle switches, code panels, truth table, waveform, and synthesis view', LABEL);

  textFont('monospace');
  computeOutput();
  addWaveEntry();
}

function selectGate(idx) {
  currentComponent = idx;
  // Update button styles
  for (var i = 0; i < GATES.length; i++) {
    var btn = document.getElementById('gate-btn-' + i);
    if (btn) {
      btn.className = 'ea-btn ea-btn--gate' + (i === idx ? ' ea-btn--gate-active' : '');
    }
  }
  computeOutput();
}

function setMode(mode) {
  archMode = mode;
  var behBtn = document.getElementById('mode-beh');
  var strBtn = document.getElementById('mode-str');
  if (behBtn) behBtn.className = 'ea-btn ea-btn--mode' + (mode === 'behavioral' ? ' ea-btn--mode-active' : '');
  if (strBtn) strBtn.className = 'ea-btn ea-btn--mode' + (mode === 'structural' ? ' ea-btn--mode-active' : '');
}

function resetWaveform() {
  waveHistory = [];
  waveTime = 0;
  addWaveEntry();
}

// ═══════════════════════════════════════════
//  DRAW
// ═══════════════════════════════════════════
function draw() {
  updateCanvasSize();
  background(248, 249, 250);

  // Animation progress
  if (evalAnimating) {
    evalAnimProgress = min(1, (millis() - evalAnimStart) / evalAnimDuration);
    if (evalAnimProgress >= 1) evalAnimating = false;
  }

  let m = 10;
  let y = 4;
  let gate = GATES[currentComponent];

  // ── Title ──
  fill(COL_ENTITY);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(14);
  textStyle(BOLD);
  text('VHDL Entity–Architecture: ' + gate.label + ' Gate', canvasWidth / 2, y);
  y += 20;

  // ── Layout: 2-column top section ──
  let halfW = (canvasWidth - 3 * m) / 2;

  // ── LEFT: Block Diagram with Toggle Switches ──
  let blockH = 200;
  drawBlockDiagram(m, y, halfW, blockH, gate);

  // ── RIGHT: Entity Code Panel ──
  let entityH = 200;
  drawEntityCode(m * 2 + halfW, y, halfW, entityH, gate);

  y += max(blockH, entityH) + 6;

  // ── Architecture Code Panel (full width) ──
  let archH = 140;
  drawArchCode(m, y, canvasWidth - 2 * m, archH, gate);
  y += archH + 6;

  // ── 3-column: Truth Table | Synthesis Note | Explanation ──
  let thirdW = (canvasWidth - 4 * m) / 3;
  let bottomRowH = 175;

  drawTruthTable(m, y, thirdW, bottomRowH, gate);
  drawSynthesisNote(m * 2 + thirdW, y, thirdW, bottomRowH, gate);
  drawExplanation(m * 3 + thirdW * 2, y, thirdW, bottomRowH);

  y += bottomRowH + 6;

  // ── Signal Waveform (full width) ──
  let wfH = max(180, drawHeight - y - 6);
  drawWaveform(m, y, canvasWidth - 2 * m, wfH);
}

// ═══════════════════════════════════════════
//  BLOCK DIAGRAM (Interactive)
// ═══════════════════════════════════════════
function drawBlockDiagram(x, y, w, h, gate) {
  // Panel background
  fill(COL_ENTITY_BG);
  stroke(COL_ENTITY);
  strokeWeight(1.5);
  rect(x, y, w, h, 6);
  noStroke();

  // Panel label
  fill(COL_ENTITY);
  textAlign(LEFT, TOP);
  textSize(10);
  textStyle(BOLD);
  text('Block Diagram', x + 6, y + 3);

  let cx = x + w / 2;
  let cy = y + h / 2 + 10;

  // ── Entity black box ──
  let boxW = 80;
  let boxH = 70;
  let boxX = cx - boxW / 2;
  let boxY = cy - boxH / 2;

  fill(COL_ENTITY);
  stroke('#303F9F');
  strokeWeight(2);
  rect(boxX, boxY, boxW, boxH, 6);
  noStroke();

  // Entity name
  fill('#fff');
  textAlign(CENTER, CENTER);
  textSize(13);
  textStyle(BOLD);
  text(gate.name, cx, cy - 8);
  textSize(9);
  textStyle(NORMAL);
  fill('#C5CAE9');
  text('entity', cx, cy + 8);

  // ── Toggle Switch A ──
  let swX = x + 18;
  let swAY = boxY + boxH * 0.3;
  drawToggleSwitch(swX, swAY, 'A', sigA);
  switchABounds = { x: swX - 4, y: swAY - 10, w: 32, h: 20 };

  // Wire A → box
  let wireAColor = sigA ? COL_WIRE_HI : COL_WIRE_LO;
  stroke(wireAColor);
  strokeWeight(sigA ? 2.5 : 1.5);
  line(swX + 30, swAY, boxX, swAY);
  noStroke();

  // ── Toggle Switch B ──
  let swBY = boxY + boxH * 0.7;
  drawToggleSwitch(swX, swBY, 'B', sigB);
  switchBBounds = { x: swX - 4, y: swBY - 10, w: 32, h: 20 };

  // Wire B → box
  let wireBColor = sigB ? COL_WIRE_HI : COL_WIRE_LO;
  stroke(wireBColor);
  strokeWeight(sigB ? 2.5 : 1.5);
  line(swX + 30, swBY, boxX, swBY);
  noStroke();

  // ── Output Y ──
  let outX = boxX + boxW;
  let outY = cy;
  let wireYColor = sigY ? COL_WIRE_HI : COL_WIRE_LO;
  stroke(wireYColor);
  strokeWeight(sigY ? 2.5 : 1.5);
  line(outX, outY, outX + 30, outY);
  noStroke();

  // Output LED
  let ledX = outX + 38;
  fill(sigY ? '#4CAF50' : '#555');
  stroke(sigY ? '#2E7D32' : '#333');
  strokeWeight(1.5);
  ellipse(ledX, outY, 14, 14);
  noStroke();
  fill('#fff');
  textAlign(CENTER, CENTER);
  textSize(9);
  textStyle(BOLD);
  text(sigY, ledX, outY);

  // Output label
  fill(COL_OUTPUT);
  textAlign(LEFT, CENTER);
  textSize(11);
  textStyle(BOLD);
  text('Y=' + sigY, ledX + 12, outY);

  // ── Port direction labels ──
  fill('#999');
  textSize(7);
  textStyle(NORMAL);
  textAlign(CENTER, TOP);
  text('in', (swX + 30 + boxX) / 2, swAY + 6);
  text('in', (swX + 30 + boxX) / 2, swBY + 6);
  text('out', outX + 15, outY + 6);

  // ── Evaluation animation ──
  if (evalAnimating) {
    noStroke();
    fill(COL_ACTIVE + hexAlpha(200 * (1 - evalAnimProgress)));
    let pulseX = lerp(boxX, outX, evalAnimProgress);
    ellipse(pulseX, outY, 10, 10);
  }
}

function hexAlpha(a) {
  let v = max(0, min(255, Math.round(a)));
  return (v < 16 ? '0' : '') + v.toString(16);
}

function drawToggleSwitch(x, y, label, val) {
  // Switch track
  let trackW = 28;
  let trackH = 14;
  fill(val ? COL_INPUT : '#CFD8DC');
  stroke(val ? '#2E7D32' : '#90A4AE');
  strokeWeight(1);
  rect(x, y - trackH / 2, trackW, trackH, trackH / 2);

  // Switch knob
  let knobX = val ? x + trackW - trackH / 2 : x + trackH / 2;
  fill('#fff');
  stroke(val ? '#2E7D32' : '#78909C');
  strokeWeight(1.5);
  ellipse(knobX, y, trackH - 2, trackH - 2);
  noStroke();

  // Label
  fill(val ? COL_INPUT : '#78909C');
  textAlign(RIGHT, CENTER);
  textSize(11);
  textStyle(BOLD);
  text(label + '=' + val, x - 4, y);
}

// ═══════════════════════════════════════════
//  ENTITY CODE PANEL
// ═══════════════════════════════════════════
function drawEntityCode(x, y, w, h, gate) {
  // Panel background
  fill(COL_CODE_BG);
  stroke('#37474F');
  strokeWeight(1.5);
  rect(x, y, w, h, 6);
  noStroke();

  // Panel label
  fill('#82B1FF');
  textAlign(LEFT, TOP);
  textSize(10);
  textStyle(BOLD);
  text('Entity Declaration', x + 8, y + 4);

  // Badge
  fill('#37474F');
  stroke('#546E7A');
  strokeWeight(1);
  let bw = 58;
  rect(x + w - bw - 6, y + 2, bw, 14, 7);
  noStroke();
  fill('#82B1FF');
  textAlign(CENTER, CENTER);
  textSize(7);
  textStyle(BOLD);
  text('INTERFACE', x + w - bw / 2 - 6, y + 9);

  // Code lines
  let lines = [
    { tokens: [
      { t: 'library ', c: COL_KEYWORD }, { t: 'IEEE', c: COL_IDENT }, { t: ';', c: COL_PUNCT }
    ]},
    { tokens: [
      { t: 'use ', c: COL_KEYWORD }, { t: 'IEEE.STD_LOGIC_1164.', c: COL_IDENT },
      { t: 'all', c: COL_KEYWORD }, { t: ';', c: COL_PUNCT }
    ]},
    { tokens: [] },
    { tokens: [
      { t: 'entity ', c: COL_KEYWORD }, { t: gate.name + ' ', c: COL_IDENT },
      { t: 'is', c: COL_KEYWORD }
    ]},
    { tokens: [
      { t: '  port ', c: COL_KEYWORD }, { t: '(', c: COL_PUNCT }
    ]},
    { tokens: [
      { t: '    A ', c: sigA ? COL_INPUT : COL_CODE_TXT },
      { t: ': ', c: COL_PUNCT },
      { t: 'in  ', c: COL_KEYWORD },
      { t: 'STD_LOGIC', c: COL_IDENT },
      { t: ';', c: COL_PUNCT }
    ]},
    { tokens: [
      { t: '    B ', c: sigB ? COL_INPUT : COL_CODE_TXT },
      { t: ': ', c: COL_PUNCT },
      { t: 'in  ', c: COL_KEYWORD },
      { t: 'STD_LOGIC', c: COL_IDENT },
      { t: ';', c: COL_PUNCT }
    ]},
    { tokens: [
      { t: '    Y ', c: sigY ? COL_OUTPUT : COL_CODE_TXT },
      { t: ': ', c: COL_PUNCT },
      { t: 'out ', c: COL_KEYWORD },
      { t: 'STD_LOGIC', c: COL_IDENT }
    ]},
    { tokens: [
      { t: '  ', c: COL_CODE_TXT }, { t: ')', c: COL_PUNCT }, { t: ';', c: COL_PUNCT }
    ]},
    { tokens: [
      { t: 'end entity ', c: COL_KEYWORD }, { t: gate.name, c: COL_IDENT },
      { t: ';', c: COL_PUNCT }
    ]}
  ];

  renderCodeLines(x, y + 20, w, h - 20, lines);
}

// ═══════════════════════════════════════════
//  ARCHITECTURE CODE PANEL
// ═══════════════════════════════════════════
function drawArchCode(x, y, w, h, gate) {
  fill(COL_CODE_BG);
  stroke('#37474F');
  strokeWeight(1.5);
  rect(x, y, w, h, 6);
  noStroke();

  // Panel label
  fill('#C3E88D');
  textAlign(LEFT, TOP);
  textSize(10);
  textStyle(BOLD);
  text('Architecture Body (' + archMode + ')', x + 8, y + 4);

  // Badge
  fill('#37474F');
  stroke('#546E7A');
  strokeWeight(1);
  let bw = 82;
  rect(x + w - bw - 6, y + 2, bw, 14, 7);
  noStroke();
  fill('#C3E88D');
  textAlign(CENTER, CENTER);
  textSize(7);
  textStyle(BOLD);
  text('IMPLEMENTATION', x + w - bw / 2 - 6, y + 9);

  let lines;
  if (archMode === 'behavioral') {
    lines = getBehavioralCode(gate);
  } else {
    lines = getStructuralCode(gate);
  }

  renderCodeLines(x, y + 20, w, h - 20, lines);

  // Highlight the active assignment line
  if (evalAnimating) {
    let lineH = 14;
    let activeLineIdx = archMode === 'behavioral' ? 2 : 5;
    let highlightY = y + 20 + 6 + activeLineIdx * lineH;
    noStroke();
    fill(COL_ACTIVE + '30');
    rect(x + 4, highlightY - 1, w - 8, lineH, 2);
  }
}

function getBehavioralCode(gate) {
  let evalStr = 'A ' + gate.vhdlOp + ' B';
  let resultStr = ' -- = \'' + sigY + '\'';
  return [
    { tokens: [
      { t: 'architecture ', c: COL_KEYWORD }, { t: 'behavioral ', c: COL_IDENT },
      { t: 'of ', c: COL_KEYWORD }, { t: gate.name + ' ', c: COL_IDENT },
      { t: 'is', c: COL_KEYWORD }
    ]},
    { tokens: [{ t: 'begin', c: COL_KEYWORD }] },
    { tokens: [
      { t: '  Y ', c: sigY ? COL_OUTPUT : COL_CODE_TXT },
      { t: '<= ', c: COL_PUNCT },
      { t: evalStr, c: COL_IDENT },
      { t: ';', c: COL_PUNCT },
      { t: resultStr, c: COL_COMMENT }
    ]},
    { tokens: [
      { t: 'end ', c: COL_KEYWORD }, { t: 'behavioral', c: COL_IDENT },
      { t: ';', c: COL_PUNCT }
    ]}
  ];
}

function getStructuralCode(gate) {
  let gateComp = gate.label.toUpperCase();
  return [
    { tokens: [
      { t: 'architecture ', c: COL_KEYWORD }, { t: 'structural ', c: COL_IDENT },
      { t: 'of ', c: COL_KEYWORD }, { t: gate.name + ' ', c: COL_IDENT },
      { t: 'is', c: COL_KEYWORD }
    ]},
    { tokens: [
      { t: '  component ', c: COL_KEYWORD }, { t: gateComp + '2', c: COL_IDENT }
    ]},
    { tokens: [
      { t: '    port ', c: COL_KEYWORD }, { t: '(', c: COL_PUNCT },
      { t: 'I0,I1', c: COL_IDENT }, { t: ':', c: COL_PUNCT },
      { t: 'in ', c: COL_KEYWORD }, { t: 'STD_LOGIC', c: COL_IDENT },
      { t: '; ', c: COL_PUNCT }, { t: 'O', c: COL_IDENT }, { t: ':', c: COL_PUNCT },
      { t: 'out ', c: COL_KEYWORD }, { t: 'STD_LOGIC', c: COL_IDENT },
      { t: ');', c: COL_PUNCT }
    ]},
    { tokens: [
      { t: '  end component', c: COL_KEYWORD }, { t: ';', c: COL_PUNCT }
    ]},
    { tokens: [{ t: 'begin', c: COL_KEYWORD }] },
    { tokens: [
      { t: '  U1', c: COL_IDENT }, { t: ': ', c: COL_PUNCT },
      { t: gateComp + '2 ', c: COL_IDENT },
      { t: 'port map', c: COL_KEYWORD }, { t: '(', c: COL_PUNCT },
      { t: 'I0', c: COL_IDENT }, { t: '=>', c: COL_PUNCT }, { t: 'A', c: sigA ? COL_INPUT : COL_CODE_TXT },
      { t: ', ', c: COL_PUNCT },
      { t: 'I1', c: COL_IDENT }, { t: '=>', c: COL_PUNCT }, { t: 'B', c: sigB ? COL_INPUT : COL_CODE_TXT },
      { t: ', ', c: COL_PUNCT },
      { t: 'O', c: COL_IDENT }, { t: '=>', c: COL_PUNCT }, { t: 'Y', c: sigY ? COL_OUTPUT : COL_CODE_TXT },
      { t: ');', c: COL_PUNCT }
    ]},
    { tokens: [
      { t: 'end ', c: COL_KEYWORD }, { t: 'structural', c: COL_IDENT },
      { t: ';', c: COL_PUNCT }
    ]}
  ];
}

function renderCodeLines(x, y, w, h, lines) {
  let lineH = 14;
  let startY = y + 6;
  textSize(11);
  textStyle(NORMAL);
  textAlign(LEFT, TOP);

  for (let i = 0; i < lines.length; i++) {
    let ly = startY + i * lineH;
    if (ly + lineH > y + h) break;

    // Line number
    fill('#546E7A');
    text((i + 1).toString().padStart(2, ' '), x + 6, ly);

    // Tokens
    let tx = x + 28;
    let tokens = lines[i].tokens;
    for (let j = 0; j < tokens.length; j++) {
      fill(tokens[j].c);
      text(tokens[j].t, tx, ly);
      tx += textWidth(tokens[j].t);
    }
  }
}

// ═══════════════════════════════════════════
//  TRUTH TABLE
// ═══════════════════════════════════════════
function drawTruthTable(x, y, w, h, gate) {
  fill('#fff');
  stroke('#E0E0E0');
  strokeWeight(1.5);
  rect(x, y, w, h, 6);
  noStroke();

  fill('#37474F');
  textAlign(LEFT, TOP);
  textSize(10);
  textStyle(BOLD);
  text('Truth Table', x + 6, y + 3);

  let tableX = x + 6;
  let tableY = y + 20;
  let colW = (w - 12) / 3;
  let rowH = 20;

  // Header
  fill(COL_ENTITY);
  noStroke();
  rect(tableX, tableY, w - 12, rowH, 3);
  fill('#fff');
  textAlign(CENTER, CENTER);
  textSize(10);
  textStyle(BOLD);
  text('A', tableX + colW / 2, tableY + rowH / 2);
  text('B', tableX + colW + colW / 2, tableY + rowH / 2);
  text('Y', tableX + 2 * colW + colW / 2, tableY + rowH / 2);

  // Rows
  let inputs = [[0,0],[0,1],[1,0],[1,1]];
  for (let r = 0; r < 4; r++) {
    let a = inputs[r][0];
    let b = inputs[r][1];
    let out = gate.op(a, b);
    let ry = tableY + rowH + r * rowH;
    let isCurrentRow = (a === sigA && b === sigB);

    // Row background
    fill(isCurrentRow ? COL_ACTIVE + '20' : (r % 2 === 0 ? '#FAFAFA' : '#fff'));
    noStroke();
    rect(tableX, ry, w - 12, rowH);

    // Active row indicator
    if (isCurrentRow) {
      fill(COL_ACTIVE);
      rect(tableX, ry, 3, rowH);
    }

    // Cell borders
    stroke('#E0E0E0');
    strokeWeight(0.5);
    line(tableX, ry + rowH, tableX + w - 12, ry + rowH);
    noStroke();

    // Values
    textSize(12);
    textStyle(isCurrentRow ? BOLD : NORMAL);

    fill(a ? COL_INPUT : '#999');
    textAlign(CENTER, CENTER);
    text(a, tableX + colW / 2, ry + rowH / 2);

    fill(b ? COL_INPUT : '#999');
    text(b, tableX + colW + colW / 2, ry + rowH / 2);

    fill(out ? COL_OUTPUT : '#999');
    textStyle(BOLD);
    text(out, tableX + 2 * colW + colW / 2, ry + rowH / 2);
  }

  // Boolean expression
  let exprY = tableY + rowH * 5 + 8;
  fill('#555');
  textAlign(CENTER, TOP);
  textSize(9);
  textStyle(BOLD);
  text('Y = A ' + gate.vhdlOp.toUpperCase() + ' B', x + w / 2, exprY);

  // Current evaluation
  fill(COL_ACTIVE);
  textSize(9);
  text(sigA + ' ' + gate.vhdlOp.toUpperCase() + ' ' + sigB + ' = ' + sigY, x + w / 2, exprY + 14);
}

// ═══════════════════════════════════════════
//  SYNTHESIS NOTE
// ═══════════════════════════════════════════
function drawSynthesisNote(x, y, w, h, gate) {
  fill('#E0F2F1');
  stroke(COL_SYNTH);
  strokeWeight(1.5);
  rect(x, y, w, h, 6);
  noStroke();

  fill(COL_SYNTH);
  textAlign(LEFT, TOP);
  textSize(10);
  textStyle(BOLD);
  text('Synthesis Mapping', x + 6, y + 3);

  let cx = x + w / 2;
  let gateY = y + 55;

  // Draw gate symbol
  drawGateSymbol(cx, gateY, gate);

  // Input labels
  fill(sigA ? COL_INPUT : '#999');
  textSize(9);
  textStyle(BOLD);
  textAlign(RIGHT, CENTER);
  text('A=' + sigA, cx - 32, gateY - 10);
  text('B=' + sigB, cx - 32, gateY + 10);

  // Output label
  fill(sigY ? COL_OUTPUT : '#999');
  textAlign(LEFT, CENTER);
  text('Y=' + sigY, cx + 32, gateY);

  // Note text
  let noteY = gateY + 40;
  fill('#555');
  textAlign(CENTER, TOP);
  textSize(8);
  textStyle(NORMAL);

  let noteLines = [
    'VHDL \u2192 Synthesis \u2192 Hardware',
    '',
    'The synthesizer maps the',
    gate.vhdlOp.toUpperCase() + ' operator to a physical',
    gate.label + ' gate in the FPGA',
    'look-up table (LUT).',
    '',
    'One 2-input ' + gate.label + ' gate',
    'uses 1 LUT in a CLB.'
  ];

  for (let i = 0; i < noteLines.length; i++) {
    text(noteLines[i], cx, noteY + i * 11);
  }
}

function drawGateSymbol(cx, cy, gate) {
  let gw = 30;
  let gh = 24;

  // Input wires
  stroke(sigA ? COL_WIRE_HI : COL_WIRE_LO);
  strokeWeight(1.5);
  line(cx - gw - 8, cy - 8, cx - gw / 2, cy - 8);
  line(cx - gw - 8, cy + 8, cx - gw / 2, cy + 8);

  // Output wire
  stroke(sigY ? COL_WIRE_HI : COL_WIRE_LO);
  line(cx + gw / 2 + 2, cy, cx + gw + 8, cy);

  // Gate body
  fill('#fff');
  stroke(COL_GATE);
  strokeWeight(2);

  if (gate.symbol === 'AND' || gate.symbol === 'NAND') {
    // AND body: flat left, curved right
    beginShape();
    vertex(cx - gw / 2, cy - gh / 2);
    vertex(cx, cy - gh / 2);
    bezierVertex(cx + gw / 2 + 4, cy - gh / 2, cx + gw / 2 + 4, cy + gh / 2, cx, cy + gh / 2);
    vertex(cx - gw / 2, cy + gh / 2);
    endShape(CLOSE);
  } else if (gate.symbol === 'OR' || gate.symbol === 'XOR') {
    // OR body: curved left and right
    beginShape();
    vertex(cx - gw / 2, cy - gh / 2);
    bezierVertex(cx, cy - gh / 2 - 2, cx + gw / 3, cy - gh / 4, cx + gw / 2 + 2, cy);
    bezierVertex(cx + gw / 3, cy + gh / 4, cx, cy + gh / 2 + 2, cx - gw / 2, cy + gh / 2);
    bezierVertex(cx - gw / 4, cy, cx - gw / 4, cy, cx - gw / 2, cy - gh / 2);
    endShape(CLOSE);

    // XOR extra curve
    if (gate.symbol === 'XOR') {
      noFill();
      stroke(COL_GATE);
      strokeWeight(2);
      bezier(cx - gw / 2 - 5, cy - gh / 2, cx - gw / 4 - 5, cy, cx - gw / 4 - 5, cy, cx - gw / 2 - 5, cy + gh / 2);
    }
  }

  // NAND bubble
  if (gate.symbol === 'NAND') {
    fill('#fff');
    stroke(COL_GATE);
    strokeWeight(2);
    ellipse(cx + gw / 2 + 5, cy, 8, 8);
  }

  noStroke();

  // Gate label
  fill(COL_GATE);
  textAlign(CENTER, CENTER);
  textSize(8);
  textStyle(BOLD);
  let labelOffset = (gate.symbol === 'NAND') ? -2 : 0;
  text(gate.symbol, cx + labelOffset, cy);
}

// ═══════════════════════════════════════════
//  EXPLANATION SIDEBAR
// ═══════════════════════════════════════════
function drawExplanation(x, y, w, h) {
  fill('#FFF8E1');
  stroke('#FFA000');
  strokeWeight(1.5);
  rect(x, y, w, h, 6);
  noStroke();

  fill('#E65100');
  textAlign(LEFT, TOP);
  textSize(10);
  textStyle(BOLD);
  text('Key Concepts', x + 6, y + 3);

  let noteY = y + 18;
  let lineH = 11;
  textSize(8);

  let concepts = [
    { title: 'Entity = Interface', lines: [
      'Declares port names,',
      'directions (in/out),',
      'and types. The "what"',
      'is visible from outside.'
    ]},
    { title: 'Architecture = Body', lines: [
      'Implements the logic.',
      'The "how" it works',
      'internally. Hidden',
      'from external view.'
    ]},
    { title: 'Declaration vs Impl.', lines: [
      'Entity declares ports.',
      'Architecture defines',
      'behavior. One entity',
      'can have multiple',
      'architectures.'
    ]}
  ];

  for (let c = 0; c < concepts.length; c++) {
    let sec = concepts[c];

    fill('#BF360C');
    textStyle(BOLD);
    textSize(8);
    text(sec.title, x + 6, noteY);
    noteY += lineH + 1;

    fill('#555');
    textStyle(NORMAL);
    textSize(7.5);
    for (let i = 0; i < sec.lines.length; i++) {
      text(sec.lines[i], x + 8, noteY);
      noteY += lineH - 2;
    }
    noteY += 4;
  }
}

// ═══════════════════════════════════════════
//  SIGNAL WAVEFORM
// ═══════════════════════════════════════════
function drawWaveform(x, y, w, h) {
  fill('#ECEFF1');
  stroke('#90A4AE');
  strokeWeight(1.5);
  rect(x, y, w, h, 6);
  noStroke();

  fill('#37474F');
  textAlign(LEFT, TOP);
  textSize(11);
  textStyle(BOLD);
  text('Signal Waveform', x + 8, y + 4);

  if (waveHistory.length < 2) {
    fill('#90A4AE');
    textAlign(CENTER, CENTER);
    textSize(11);
    textStyle(NORMAL);
    text('Toggle A or B switches to generate waveform', x + w / 2, y + h / 2);
    return;
  }

  let labelW = 30;
  let plotX = x + labelW + 4;
  let plotW = w - labelW - 12;
  let topY = y + 22;
  let botY = y + h - 8;

  let signals = [
    { name: 'A', key: 'a', color: COL_INPUT },
    { name: 'B', key: 'b', color: COL_INPUT },
    { name: 'Y', key: 'y', color: COL_OUTPUT }
  ];

  let sigCount = signals.length;
  let sigH = min(40, (botY - topY) / sigCount);
  let entries = waveHistory.length;
  let colW = min(plotW / maxWaveEntries, plotW / max(entries, 1));

  for (let s = 0; s < sigCount; s++) {
    let sig = signals[s];
    let sy = topY + s * sigH;
    let baseY = sy + sigH - 6;
    let highY = sy + 6;

    // Signal name
    fill(sig.color);
    textAlign(RIGHT, CENTER);
    textSize(11);
    textStyle(BOLD);
    text(sig.name, plotX - 6, sy + sigH / 2);

    // Separator
    stroke('#CFD8DC');
    strokeWeight(0.5);
    line(plotX, sy + sigH, x + w - 6, sy + sigH);
    noStroke();

    // Waveform
    for (let e = 0; e < entries; e++) {
      let ex = plotX + e * colW;
      let entry = waveHistory[e];
      let val = entry[sig.key];
      let prevVal = (e > 0) ? waveHistory[e - 1][sig.key] : val;

      stroke(sig.color);
      strokeWeight(2);
      let ly = val ? highY : baseY;
      let prevLy = prevVal ? highY : baseY;

      // Transition edge
      if (e > 0 && prevVal !== val) {
        line(ex, prevLy, ex, ly);
      }
      // Horizontal at level
      line(ex, ly, ex + colW, ly);
      noStroke();

      // Fill active region
      if (val) {
        fill(sig.color + '12');
        noStroke();
        rect(ex, highY, colW, baseY - highY);
      }
    }
  }

  // Time markers
  fill('#90A4AE');
  textAlign(CENTER, TOP);
  textSize(7);
  textStyle(NORMAL);
  for (let e = 0; e < entries; e++) {
    if (e % 2 === 0 || entries <= 10) {
      text(e, plotX + e * colW + colW / 2, botY);
    }
  }
}

// ═══════════════════════════════════════════
//  LOGIC
// ═══════════════════════════════════════════
function computeOutput() {
  let gate = GATES[currentComponent];
  prevY = sigY;
  sigY = gate.op(sigA, sigB);
}

function toggleSignal(which) {
  prevA = sigA;
  prevB = sigB;
  prevY = sigY;

  if (which === 'A') sigA = sigA ? 0 : 1;
  if (which === 'B') sigB = sigB ? 0 : 1;

  computeOutput();

  // Start eval animation
  evalAnimating = true;
  evalAnimStart = millis();
  evalAnimProgress = 0;

  // Add waveform entry
  waveTime++;
  addWaveEntry();
}

function addWaveEntry() {
  waveHistory.push({ a: sigA, b: sigB, y: sigY });
  if (waveHistory.length > maxWaveEntries) {
    waveHistory.shift();
  }
}

// ═══════════════════════════════════════════
//  MOUSE INTERACTION
// ═══════════════════════════════════════════
function mousePressed() {
  // Toggle switch A
  if (switchABounds) {
    let b = switchABounds;
    if (mouseX >= b.x && mouseX <= b.x + b.w && mouseY >= b.y && mouseY <= b.y + b.h) {
      toggleSignal('A');
      return;
    }
  }

  // Toggle switch B
  if (switchBBounds) {
    let b = switchBBounds;
    if (mouseX >= b.x && mouseX <= b.x + b.w && mouseY >= b.y && mouseY <= b.y + b.h) {
      toggleSignal('B');
      return;
    }
  }
}

// ═══════════════════════════════════════════
//  CANVAS SIZING
// ═══════════════════════════════════════════
function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
  canvasHeight = drawHeight;
}
