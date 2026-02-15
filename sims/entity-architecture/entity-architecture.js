// Entity-Architecture RTL Teaching Module — v2
// Interactive VHDL entity/architecture explorer with 3-phase signal flow
// animation, delta-cycle visualization, side-by-side behavioral/structural
// comparison, LUT hardware realization, Test All Cases, and waveform.
// Bloom Level: Analyze (L4)

let containerWidth;
let canvasWidth = 400;
let drawHeight = 950;
let controlHeight = 0;
let canvasHeight = drawHeight + controlHeight;

// ── View state ──
let currentComponent = 0; // 0=AND, 1=OR, 2=NAND, 3=XOR

// ── Interactive signals ──
let sigA = 0;
let sigB = 0;
let sigY = 0;

// ── 3-Phase Signal Flow Animation ──
// Phase 0: input wire glow  Phase 1: gate evaluation  Phase 2: output update
let animPhase = -1;        // -1 = idle, 0/1/2 = phase
let animProgress = 0;      // 0..1 within current phase
let animStart = 0;
let animPhaseDuration = 350; // ms per phase
let animTotalDuration = 1050;
let animating = false;
let animChangedInput = ''; // 'A' or 'B'

// ── Delta-Cycle Animation ──
let deltaAnimProgress = 0;

// ── Test All Cases ──
let testAllRunning = false;
let testAllStep = 0; // 0..3
let testAllTimer = 0;
let testAllInterval = 900;
let testAllResults = [null, null, null, null];
let testAllFilledCount = 0;

// ── Waveform ──
let waveHistory = [];
let maxWaveEntries = 24;
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
const COL_DELTA    = '#7E57C2';
const COL_LUT      = '#0277BD';

// ── Gate definitions ──
const GATES = [
  { name: 'and2',  label: 'AND',  op: function(a,b){ return a & b; }, vhdlOp: 'and',  symbol: 'AND'  },
  { name: 'or2',   label: 'OR',   op: function(a,b){ return a | b; }, vhdlOp: 'or',   symbol: 'OR'   },
  { name: 'nand2', label: 'NAND', op: function(a,b){ return (a & b) ^ 1; }, vhdlOp: 'nand', symbol: 'NAND' },
  { name: 'xor2',  label: 'XOR',  op: function(a,b){ return a ^ b; }, vhdlOp: 'xor',  symbol: 'XOR'  },
  { name: 'xnor2', label: 'XNOR', op: function(a,b){ return (a ^ b) ^ 1; }, vhdlOp: 'xnor', symbol: 'XNOR' }
];

// ── Click targets ──
let switchABounds = null;
let switchBBounds = null;

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
  addSep(bar);

  // Test All Cases button
  var testBtn = document.createElement('button');
  testBtn.className = 'ea-btn ea-btn--test';
  testBtn.textContent = 'Test All Cases';
  testBtn.id = 'test-all-btn';
  testBtn.addEventListener('click', function() { startTestAll(); });
  bar.appendChild(testBtn);

  addSep(bar);

  // Reset button
  var resetBtn = document.createElement('button');
  resetBtn.className = 'ea-btn ea-btn--reset';
  resetBtn.textContent = 'Reset';
  resetBtn.addEventListener('click', function() { resetAll(); });
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
  describe('Interactive VHDL entity-architecture guided learning module with signal flow animation, delta-cycle visualization, side-by-side code comparison, LUT realization, test all cases, and waveform', LABEL);

  textFont('monospace');
  computeOutput();
  addWaveEntry();
}

function addSep(bar) {
  var sep = document.createElement('span');
  sep.style.cssText = 'width:1px;height:24px;background:#bbb;margin:0 4px;';
  bar.appendChild(sep);
}

function selectGate(idx) {
  currentComponent = idx;
  for (var i = 0; i < GATES.length; i++) {
    var btn = document.getElementById('gate-btn-' + i);
    if (btn) btn.className = 'ea-btn ea-btn--gate' + (i === idx ? ' ea-btn--gate-active' : '');
  }
  computeOutput();
  testAllResults = [null, null, null, null];
  testAllFilledCount = 0;
}

function resetAll() {
  sigA = 0; sigB = 0;
  computeOutput();
  waveHistory = [];
  waveTime = 0;
  addWaveEntry();
  testAllResults = [null, null, null, null];
  testAllFilledCount = 0;
  testAllRunning = false;
  animating = false;
  animPhase = -1;
  var tb = document.getElementById('test-all-btn');
  if (tb) { tb.textContent = 'Test All Cases'; tb.style.background = '#7B1FA2'; }
}

// ═══════════════════════════════════════════
//  DRAW
// ═══════════════════════════════════════════
function draw() {
  updateCanvasSize();
  background(248, 249, 250);

  // Update 3-phase animation
  if (animating) {
    let elapsed = millis() - animStart;
    if (elapsed >= animTotalDuration) {
      animating = false;
      animPhase = -1;
    } else {
      animPhase = floor(elapsed / animPhaseDuration);
      animProgress = (elapsed % animPhaseDuration) / animPhaseDuration;
      deltaAnimProgress = elapsed / animTotalDuration;
    }
  }

  // Test All Cases auto-run
  if (testAllRunning) {
    if (millis() - testAllTimer > testAllInterval) {
      testAllTimer = millis();
      runTestAllStep();
    }
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

  // ── Layout ──
  let halfW = (canvasWidth - 3 * m) / 2;

  // ── Row 1: Block Diagram | Entity Code ──
  let row1H = 210;
  drawBlockDiagram(m, y, halfW, row1H, gate);
  drawEntityCode(m * 2 + halfW, y, halfW, row1H, gate);
  y += row1H + 6;

  // ── Row 2: Behavioral vs Structural side-by-side ──
  let row2H = 155;
  drawCodeComparison(m, y, canvasWidth - 2 * m, row2H, gate);
  y += row2H + 6;

  // ── Row 3: Delta-Cycle | Hardware Realization (LUT) ──
  let row3H = 135;
  drawDeltaCycle(m, y, halfW, row3H);
  drawHardwareRealization(m * 2 + halfW, y, halfW, row3H, gate);
  y += row3H + 6;

  // ── Row 4: Truth Table | Key Concepts ──
  let row4H = 175;
  drawTruthTable(m, y, halfW, row4H, gate);
  drawExplanation(m * 2 + halfW, y, halfW, row4H);
  y += row4H + 6;

  // ── Row 5: Waveform ──
  let wfH = max(200, drawHeight - y - 6);
  drawWaveform(m, y, canvasWidth - 2 * m, wfH);
}

// ═══════════════════════════════════════════
//  BLOCK DIAGRAM with 3-Phase Signal Flow
// ═══════════════════════════════════════════
function drawBlockDiagram(x, y, w, h, gate) {
  fill(COL_ENTITY_BG);
  stroke(COL_ENTITY);
  strokeWeight(1.5);
  rect(x, y, w, h, 6);
  noStroke();

  fill(COL_ENTITY);
  textAlign(LEFT, TOP);
  textSize(10);
  textStyle(BOLD);
  text('Block Diagram', x + 6, y + 3);

  let cx = x + w / 2;
  let cy = y + h / 2 + 8;

  // Entity black box
  let boxW = 80;
  let boxH = 70;
  let boxX = cx - boxW / 2;
  let boxY = cy - boxH / 2;

  // Phase 1 glow on entity box
  if (animating && animPhase === 1) {
    noStroke();
    fill(COL_ACTIVE + hexAlpha(80 * (1 - animProgress)));
    rect(boxX - 4, boxY - 4, boxW + 8, boxH + 8, 10);
  }

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

  // Phase 1: show operation inside box
  if (animating && animPhase === 1) {
    fill(COL_ACTIVE);
    textSize(8);
    textStyle(BOLD);
    text(sigA + ' ' + gate.vhdlOp + ' ' + sigB + ' = ' + sigY, cx, cy + 22);
  }

  // ── Toggle Switch A ──
  let swX = x + 18;
  let swAY = boxY + boxH * 0.3;
  drawToggleSwitch(swX, swAY, 'A', sigA);
  switchABounds = { x: swX - 4, y: swAY - 10, w: 32, h: 20 };

  // Wire A → box (Phase 0 glow for input A)
  let wireAGlow = animating && animPhase === 0 && animChangedInput === 'A';
  stroke(wireAGlow ? COL_ACTIVE : (sigA ? COL_WIRE_HI : COL_WIRE_LO));
  strokeWeight(wireAGlow ? 3.5 : (sigA ? 2.5 : 1.5));
  line(swX + 30, swAY, boxX, swAY);
  noStroke();

  // Phase 0 pulse dot on wire A
  if (wireAGlow) {
    noStroke();
    fill(COL_ACTIVE);
    let px = lerp(swX + 30, boxX, animProgress);
    ellipse(px, swAY, 8, 8);
  }

  // ── Toggle Switch B ──
  let swBY = boxY + boxH * 0.7;
  drawToggleSwitch(swX, swBY, 'B', sigB);
  switchBBounds = { x: swX - 4, y: swBY - 10, w: 32, h: 20 };

  // Wire B → box
  let wireBGlow = animating && animPhase === 0 && animChangedInput === 'B';
  stroke(wireBGlow ? COL_ACTIVE : (sigB ? COL_WIRE_HI : COL_WIRE_LO));
  strokeWeight(wireBGlow ? 3.5 : (sigB ? 2.5 : 1.5));
  line(swX + 30, swBY, boxX, swBY);
  noStroke();

  if (wireBGlow) {
    noStroke();
    fill(COL_ACTIVE);
    let px = lerp(swX + 30, boxX, animProgress);
    ellipse(px, swBY, 8, 8);
  }

  // ── Output Y ──
  let outX = boxX + boxW;
  let outY = cy;
  let wireYGlow = animating && animPhase === 2;
  stroke(wireYGlow ? COL_ACTIVE : (sigY ? COL_WIRE_HI : COL_WIRE_LO));
  strokeWeight(wireYGlow ? 3.5 : (sigY ? 2.5 : 1.5));
  line(outX, outY, outX + 30, outY);
  noStroke();

  // Phase 2 pulse dot on output
  if (wireYGlow) {
    noStroke();
    fill(COL_ACTIVE);
    let px = lerp(outX, outX + 30, animProgress);
    ellipse(px, outY, 8, 8);
  }

  // Output LED
  let ledX = outX + 38;
  let ledGlow = wireYGlow && animProgress > 0.5;
  fill(sigY ? '#4CAF50' : '#555');
  stroke(sigY ? '#2E7D32' : '#333');
  strokeWeight(ledGlow ? 3 : 1.5);
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

  // Port direction labels
  fill('#999');
  textSize(7);
  textStyle(NORMAL);
  textAlign(CENTER, TOP);
  text('in', (swX + 30 + boxX) / 2, swAY + 6);
  text('in', (swX + 30 + boxX) / 2, swBY + 6);
  text('out', outX + 15, outY + 6);

  // Phase legend at bottom
  if (animating) {
    let phases = ['Input Signal', 'Evaluation', 'Output Update'];
    let phaseColors = [COL_INPUT, COL_ACTIVE, COL_OUTPUT];
    let legY = y + h - 14;
    textSize(7);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    let legW = w / 3;
    for (let p = 0; p < 3; p++) {
      let lx = x + p * legW + legW / 2;
      fill(p === animPhase ? phaseColors[p] : '#BDBDBD');
      text((p === animPhase ? '\u25B6 ' : '') + phases[p], lx, legY);
    }
  }
}

function hexAlpha(a) {
  let v = max(0, min(255, Math.round(a)));
  return (v < 16 ? '0' : '') + v.toString(16);
}

function drawToggleSwitch(x, y, label, val) {
  let trackW = 28;
  let trackH = 14;
  fill(val ? COL_INPUT : '#CFD8DC');
  stroke(val ? '#2E7D32' : '#90A4AE');
  strokeWeight(1);
  rect(x, y - trackH / 2, trackW, trackH, trackH / 2);

  let knobX = val ? x + trackW - trackH / 2 : x + trackH / 2;
  fill('#fff');
  stroke(val ? '#2E7D32' : '#78909C');
  strokeWeight(1.5);
  ellipse(knobX, y, trackH - 2, trackH - 2);
  noStroke();

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
  fill(COL_CODE_BG);
  stroke('#37474F');
  strokeWeight(1.5);
  rect(x, y, w, h, 6);
  noStroke();

  fill('#82B1FF');
  textAlign(LEFT, TOP);
  textSize(10);
  textStyle(BOLD);
  text('Entity Declaration', x + 8, y + 4);

  drawBadge(x, y, w, 'INTERFACE', '#82B1FF');

  let lines = [
    { tokens: [{ t: 'library ', c: COL_KEYWORD }, { t: 'IEEE', c: COL_IDENT }, { t: ';', c: COL_PUNCT }] },
    { tokens: [{ t: 'use ', c: COL_KEYWORD }, { t: 'IEEE.STD_LOGIC_1164.', c: COL_IDENT }, { t: 'all', c: COL_KEYWORD }, { t: ';', c: COL_PUNCT }] },
    { tokens: [] },
    { tokens: [{ t: 'entity ', c: COL_KEYWORD }, { t: gate.name + ' ', c: COL_IDENT }, { t: 'is', c: COL_KEYWORD }] },
    { tokens: [{ t: '  port ', c: COL_KEYWORD }, { t: '(', c: COL_PUNCT }] },
    { tokens: [{ t: '    A ', c: sigA ? COL_INPUT : COL_CODE_TXT }, { t: ': ', c: COL_PUNCT }, { t: 'in  ', c: COL_KEYWORD }, { t: 'STD_LOGIC', c: COL_IDENT }, { t: ';', c: COL_PUNCT }], hl: animating && animPhase === 0 && animChangedInput === 'A' },
    { tokens: [{ t: '    B ', c: sigB ? COL_INPUT : COL_CODE_TXT }, { t: ': ', c: COL_PUNCT }, { t: 'in  ', c: COL_KEYWORD }, { t: 'STD_LOGIC', c: COL_IDENT }, { t: ';', c: COL_PUNCT }], hl: animating && animPhase === 0 && animChangedInput === 'B' },
    { tokens: [{ t: '    Y ', c: sigY ? COL_OUTPUT : COL_CODE_TXT }, { t: ': ', c: COL_PUNCT }, { t: 'out ', c: COL_KEYWORD }, { t: 'STD_LOGIC', c: COL_IDENT }], hl: animating && animPhase === 2 },
    { tokens: [{ t: '  ', c: COL_CODE_TXT }, { t: ')', c: COL_PUNCT }, { t: ';', c: COL_PUNCT }] },
    { tokens: [{ t: 'end entity ', c: COL_KEYWORD }, { t: gate.name, c: COL_IDENT }, { t: ';', c: COL_PUNCT }] }
  ];

  renderCodeLines(x, y + 20, w, h - 20, lines);
}

// ═══════════════════════════════════════════
//  BEHAVIORAL vs STRUCTURAL COMPARISON
// ═══════════════════════════════════════════
function drawCodeComparison(x, y, w, h, gate) {
  // Full-width panel
  fill('#1E272C');
  stroke('#37474F');
  strokeWeight(1.5);
  rect(x, y, w, h, 6);
  noStroke();

  fill('#C3E88D');
  textAlign(LEFT, TOP);
  textSize(10);
  textStyle(BOLD);
  text('Architecture Comparison: Behavioral vs Structural', x + 8, y + 4);

  let halfW = (w - 12) / 2;
  let codeY = y + 20;
  let codeH = h - 24;

  // Left: Behavioral
  fill('#263238');
  stroke('#4CAF50');
  strokeWeight(1);
  rect(x + 4, codeY, halfW, codeH, 4);
  noStroke();

  fill(COL_INPUT);
  textSize(8);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text('BEHAVIORAL', x + 4 + halfW / 2, codeY + 2);

  let behLines = getBehavioralCode(gate);
  renderCodeLines(x + 4, codeY + 14, halfW, codeH - 14, behLines);

  // Right: Structural
  fill('#263238');
  stroke('#E91E63');
  strokeWeight(1);
  rect(x + 8 + halfW, codeY, halfW, codeH, 4);
  noStroke();

  fill(COL_OUTPUT);
  textSize(8);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text('STRUCTURAL', x + 8 + halfW + halfW / 2, codeY + 2);

  let strLines = getStructuralCode(gate);
  renderCodeLines(x + 8 + halfW, codeY + 14, halfW, codeH - 14, strLines);

  // Center divider with VS label
  let divX = x + 4 + halfW + 2;
  fill(COL_ACTIVE);
  noStroke();
  ellipse(divX, codeY + codeH / 2, 20, 20);
  fill('#fff');
  textAlign(CENTER, CENTER);
  textSize(8);
  textStyle(BOLD);
  text('vs', divX, codeY + codeH / 2);

  // Difference highlight: behavioral line 2 and structural line 5
  if (!animating) {
    let lineH = 13;
    // Behavioral highlight on Y <= line
    let behHlY = codeY + 14 + 5 + 2 * lineH;
    noStroke();
    fill(COL_INPUT + '18');
    rect(x + 6, behHlY - 1, halfW - 4, lineH, 2);

    // Structural highlight on port map line
    let strHlY = codeY + 14 + 5 + 4 * lineH;
    fill(COL_OUTPUT + '18');
    rect(x + 10 + halfW, strHlY - 1, halfW - 4, lineH, 2);
  }
}

function getBehavioralCode(gate) {
  let evalStr = 'A ' + gate.vhdlOp + ' B';
  let resultComment = ' -- = \'' + sigY + '\'';
  return [
    { tokens: [{ t: 'architecture ', c: COL_KEYWORD }, { t: 'behavioral ', c: COL_IDENT }, { t: 'of ', c: COL_KEYWORD }, { t: gate.name + ' ', c: COL_IDENT }, { t: 'is', c: COL_KEYWORD }] },
    { tokens: [{ t: 'begin', c: COL_KEYWORD }] },
    { tokens: [{ t: '  Y ', c: sigY ? COL_OUTPUT : COL_CODE_TXT }, { t: '<= ', c: COL_PUNCT }, { t: evalStr, c: COL_IDENT }, { t: ';', c: COL_PUNCT }, { t: resultComment, c: COL_COMMENT }], hl: animating && animPhase === 1 },
    { tokens: [{ t: 'end ', c: COL_KEYWORD }, { t: 'behavioral', c: COL_IDENT }, { t: ';', c: COL_PUNCT }] }
  ];
}

function getStructuralCode(gate) {
  let gc = gate.label.toUpperCase();
  return [
    { tokens: [{ t: 'architecture ', c: COL_KEYWORD }, { t: 'structural ', c: COL_IDENT }, { t: 'of ', c: COL_KEYWORD }, { t: gate.name + ' ', c: COL_IDENT }, { t: 'is', c: COL_KEYWORD }] },
    { tokens: [{ t: '  component ', c: COL_KEYWORD }, { t: gc + '2 ', c: COL_IDENT }, { t: '...', c: COL_COMMENT }] },
    { tokens: [{ t: '  end component', c: COL_KEYWORD }, { t: ';', c: COL_PUNCT }] },
    { tokens: [{ t: 'begin', c: COL_KEYWORD }] },
    { tokens: [{ t: '  U1: ' + gc + '2 ', c: COL_IDENT }, { t: 'port map', c: COL_KEYWORD }, { t: '(', c: COL_PUNCT }, { t: 'A,B,Y', c: COL_IDENT }, { t: ');', c: COL_PUNCT }], hl: animating && animPhase === 1 },
    { tokens: [{ t: 'end ', c: COL_KEYWORD }, { t: 'structural', c: COL_IDENT }, { t: ';', c: COL_PUNCT }] }
  ];
}

function drawBadge(x, y, w, label, col) {
  fill('#37474F');
  stroke('#546E7A');
  strokeWeight(1);
  let bw = textWidth(label) + 16;
  bw = max(bw, 58);
  rect(x + w - bw - 6, y + 2, bw, 14, 7);
  noStroke();
  fill(col);
  textAlign(CENTER, CENTER);
  textSize(7);
  textStyle(BOLD);
  text(label, x + w - bw / 2 - 6, y + 9);
}

function renderCodeLines(x, y, w, h, lines) {
  let lineH = 13;
  let startY = y + 5;
  textSize(10);
  textStyle(NORMAL);
  textAlign(LEFT, TOP);

  for (let i = 0; i < lines.length; i++) {
    let ly = startY + i * lineH;
    if (ly + lineH > y + h) break;

    // Line highlight
    if (lines[i].hl) {
      noStroke();
      fill(COL_ACTIVE + '25');
      rect(x + 2, ly - 1, w - 4, lineH, 2);
    }

    // Line number
    fill('#546E7A');
    text((i + 1).toString().padStart(2, ' '), x + 4, ly);

    // Tokens
    let tx = x + 24;
    let tokens = lines[i].tokens;
    for (let j = 0; j < tokens.length; j++) {
      fill(tokens[j].c);
      text(tokens[j].t, tx, ly);
      tx += textWidth(tokens[j].t);
    }
  }
}

// ═══════════════════════════════════════════
//  DELTA-CYCLE EXPLANATION
// ═══════════════════════════════════════════
function drawDeltaCycle(x, y, w, h) {
  fill('#EDE7F6');
  stroke(COL_DELTA);
  strokeWeight(1.5);
  rect(x, y, w, h, 6);
  noStroke();

  fill(COL_DELTA);
  textAlign(LEFT, TOP);
  textSize(10);
  textStyle(BOLD);
  text('Delta-Cycle Simulation', x + 6, y + 3);

  let cx = x + w / 2;
  let stageW = 60;
  let stageH = 32;
  let stageY = y + 28;
  let gap = (w - 3 * stageW - 30) / 2;
  let startX = x + 15;

  let stages = [
    { label: 'Signal\nChange', desc: 'A or B toggles', color: COL_INPUT },
    { label: 'Logic\nEvaluation', desc: gate().vhdlOp.toUpperCase() + ' computed', color: COL_ACTIVE },
    { label: 'Output\nUpdate', desc: 'Y assigned', color: COL_OUTPUT }
  ];

  for (let i = 0; i < 3; i++) {
    let sx = startX + i * (stageW + gap);
    let s = stages[i];
    let isActive = animating && animPhase === i;

    // Stage box
    fill(isActive ? s.color + '30' : '#fff');
    stroke(isActive ? s.color : '#BDBDBD');
    strokeWeight(isActive ? 2.5 : 1);
    rect(sx, stageY, stageW, stageH, 5);
    noStroke();

    // Stage label
    fill(isActive ? s.color : '#666');
    textAlign(CENTER, CENTER);
    textSize(8);
    textStyle(BOLD);
    let sLines = s.label.split('\n');
    text(sLines[0], sx + stageW / 2, stageY + stageH / 2 - 5);
    text(sLines[1], sx + stageW / 2, stageY + stageH / 2 + 6);

    // Arrow to next
    if (i < 2) {
      let arrowX1 = sx + stageW + 2;
      let arrowX2 = sx + stageW + gap - 2;
      let arrowY = stageY + stageH / 2;
      stroke(isActive ? s.color : '#BDBDBD');
      strokeWeight(isActive ? 2 : 1);
      line(arrowX1, arrowY, arrowX2, arrowY);
      line(arrowX2, arrowY, arrowX2 - 5, arrowY - 3);
      line(arrowX2, arrowY, arrowX2 - 5, arrowY + 3);
      noStroke();
    }

    // Animated dot moving through stages
    if (animating && animPhase === i) {
      noStroke();
      fill(s.color);
      let dotX = lerp(sx, sx + stageW, animProgress);
      ellipse(dotX, stageY - 6, 7, 7);
    }
  }

  // Description text
  let descY = stageY + stageH + 10;
  fill('#555');
  textAlign(CENTER, TOP);
  textSize(8);
  textStyle(NORMAL);

  if (animating) {
    fill(stages[max(0, animPhase)].color);
    textStyle(BOLD);
    text('\u25B6 ' + stages[max(0, animPhase)].desc, cx, descY);
  } else {
    text('VHDL simulation uses delta cycles:', cx, descY);
    text('signal changes propagate in zero simulation time', cx, descY + 11);
  }

  // Timeline bar
  let barY = descY + 26;
  let barW = w - 30;
  let barX = x + 15;

  fill('#E0E0E0');
  noStroke();
  rect(barX, barY, barW, 6, 3);

  if (animating) {
    fill(COL_DELTA);
    rect(barX, barY, barW * deltaAnimProgress, 6, 3);

    // Phase markers
    for (let p = 0; p < 3; p++) {
      let mx = barX + barW * (p / 3);
      fill(p <= animPhase ? stages[p].color : '#BDBDBD');
      noStroke();
      ellipse(mx, barY + 3, 8, 8);
    }
  }

  // Labels
  fill('#999');
  textSize(7);
  textAlign(LEFT, TOP);
  text('t', barX, barY + 8);
  textAlign(RIGHT, TOP);
  text('t + \u03B4', barX + barW, barY + 8);
}

function gate() { return GATES[currentComponent]; }

// ═══════════════════════════════════════════
//  HARDWARE REALIZATION (LUT + Gate)
// ═══════════════════════════════════════════
function drawHardwareRealization(x, y, w, h, gate) {
  fill('#E0F2F1');
  stroke(COL_SYNTH);
  strokeWeight(1.5);
  rect(x, y, w, h, 6);
  noStroke();

  fill(COL_SYNTH);
  textAlign(LEFT, TOP);
  textSize(10);
  textStyle(BOLD);
  text('Hardware Realization', x + 6, y + 3);

  let leftW = w * 0.45;
  let rightW = w * 0.45;
  let gapW = w * 0.1;

  // ── Left: Gate Symbol ──
  let gcx = x + leftW / 2 + 4;
  let gcy = y + 50;
  drawGateSymbol(gcx, gcy, gate);

  // Gate labels
  fill(sigA ? COL_INPUT : '#999');
  textSize(8); textStyle(BOLD); textAlign(RIGHT, CENTER);
  text('A=' + sigA, gcx - 30, gcy - 8);
  text('B=' + sigB, gcx - 30, gcy + 8);
  fill(sigY ? COL_OUTPUT : '#999');
  textAlign(LEFT, CENTER);
  text('Y=' + sigY, gcx + 30, gcy);

  fill('#555');
  textSize(7);
  textStyle(NORMAL);
  textAlign(CENTER, TOP);
  text('Gate Symbol', gcx, gcy + 22);

  // Arrow between
  let arrowX = x + leftW + gapW / 2;
  stroke('#999');
  strokeWeight(1);
  line(arrowX - 8, y + 50, arrowX + 8, y + 50);
  line(arrowX + 8, y + 50, arrowX + 4, y + 47);
  line(arrowX + 8, y + 50, arrowX + 4, y + 53);
  noStroke();
  fill('#999');
  textSize(6);
  textAlign(CENTER, TOP);
  text('maps\nto', arrowX, y + 56);

  // ── Right: 2-input LUT ──
  let lutX = x + leftW + gapW + 4;
  let lutY = y + 24;
  let lutW = rightW - 8;
  let lutRowH = 14;

  // LUT header
  fill(COL_LUT);
  noStroke();
  rect(lutX, lutY, lutW, lutRowH, 3);
  fill('#fff');
  textAlign(CENTER, CENTER);
  textSize(8);
  textStyle(BOLD);
  let col3 = lutW / 3;
  text('A', lutX + col3 / 2, lutY + lutRowH / 2);
  text('B', lutX + col3 + col3 / 2, lutY + lutRowH / 2);
  text('LUT', lutX + 2 * col3 + col3 / 2, lutY + lutRowH / 2);

  // LUT rows
  let inputs = [[0,0],[0,1],[1,0],[1,1]];
  for (let r = 0; r < 4; r++) {
    let a = inputs[r][0];
    let b = inputs[r][1];
    let out = gate.op(a, b);
    let ry = lutY + lutRowH + r * lutRowH;
    let isCurrent = (a === sigA && b === sigB);

    fill(isCurrent ? COL_ACTIVE + '25' : (r % 2 === 0 ? '#F5F5F5' : '#fff'));
    noStroke();
    rect(lutX, ry, lutW, lutRowH);

    if (isCurrent) {
      fill(COL_ACTIVE);
      rect(lutX, ry, 2, lutRowH);
    }

    fill(isCurrent ? '#333' : '#777');
    textSize(9);
    textStyle(isCurrent ? BOLD : NORMAL);
    textAlign(CENTER, CENTER);
    text(a, lutX + col3 / 2, ry + lutRowH / 2);
    text(b, lutX + col3 + col3 / 2, ry + lutRowH / 2);

    fill(out ? COL_LUT : '#999');
    textStyle(BOLD);
    text(out, lutX + 2 * col3 + col3 / 2, ry + lutRowH / 2);
  }

  // LUT border
  stroke(COL_LUT);
  strokeWeight(1);
  noFill();
  rect(lutX, lutY, lutW, lutRowH * 5, 3);
  noStroke();

  // Label
  fill('#555');
  textSize(7);
  textStyle(NORMAL);
  textAlign(CENTER, TOP);
  text('FPGA Look-Up Table', lutX + lutW / 2, lutY + lutRowH * 5 + 4);

  // SRAM note
  fill('#999');
  textSize(6);
  text('4\u00D71 SRAM programmed at config', lutX + lutW / 2, lutY + lutRowH * 5 + 14);
}

function drawGateSymbol(cx, cy, gate) {
  let gw = 26;
  let gh = 20;

  stroke(sigA ? COL_WIRE_HI : COL_WIRE_LO); strokeWeight(1.5);
  line(cx - gw - 6, cy - 7, cx - gw / 2, cy - 7);
  line(cx - gw - 6, cy + 7, cx - gw / 2, cy + 7);
  stroke(sigY ? COL_WIRE_HI : COL_WIRE_LO);
  line(cx + gw / 2 + 2, cy, cx + gw + 6, cy);

  fill('#fff');
  stroke(COL_GATE);
  strokeWeight(2);

  if (gate.symbol === 'AND' || gate.symbol === 'NAND') {
    beginShape();
    vertex(cx - gw / 2, cy - gh / 2);
    vertex(cx, cy - gh / 2);
    bezierVertex(cx + gw / 2 + 3, cy - gh / 2, cx + gw / 2 + 3, cy + gh / 2, cx, cy + gh / 2);
    vertex(cx - gw / 2, cy + gh / 2);
    endShape(CLOSE);
  } else {
    beginShape();
    vertex(cx - gw / 2, cy - gh / 2);
    bezierVertex(cx, cy - gh / 2 - 1, cx + gw / 3, cy - gh / 4, cx + gw / 2 + 2, cy);
    bezierVertex(cx + gw / 3, cy + gh / 4, cx, cy + gh / 2 + 1, cx - gw / 2, cy + gh / 2);
    bezierVertex(cx - gw / 4, cy, cx - gw / 4, cy, cx - gw / 2, cy - gh / 2);
    endShape(CLOSE);
    if (gate.symbol === 'XOR' || gate.symbol === 'XNOR') {
      noFill(); stroke(COL_GATE); strokeWeight(2);
      bezier(cx - gw / 2 - 4, cy - gh / 2, cx - gw / 4 - 4, cy, cx - gw / 4 - 4, cy, cx - gw / 2 - 4, cy + gh / 2);
    }
  }

  if (gate.symbol === 'NAND' || gate.symbol === 'XNOR') {
    fill('#fff'); stroke(COL_GATE); strokeWeight(2);
    ellipse(cx + gw / 2 + 4, cy, 6, 6);
  }

  noStroke();
  fill(COL_GATE);
  textAlign(CENTER, CENTER);
  textSize(7);
  textStyle(BOLD);
  let labelOffset = (gate.symbol === 'NAND' || gate.symbol === 'XNOR') ? -2 : 0;
  text(gate.symbol, cx + labelOffset, cy);
}

// ═══════════════════════════════════════════
//  TRUTH TABLE with Test All Cases
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

  // Test All status badge
  if (testAllRunning) {
    fill(COL_ACTIVE);
    textAlign(RIGHT, TOP);
    textSize(8);
    textStyle(BOLD);
    text('Testing ' + (testAllStep + 1) + '/4...', x + w - 6, y + 4);
  } else if (testAllFilledCount === 4) {
    fill(COL_INPUT);
    textAlign(RIGHT, TOP);
    textSize(8);
    textStyle(BOLD);
    text('\u2714 All Passed', x + w - 6, y + 4);
  }

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

  let inputs = [[0,0],[0,1],[1,0],[1,1]];
  for (let r = 0; r < 4; r++) {
    let a = inputs[r][0];
    let b = inputs[r][1];
    let out = gate.op(a, b);
    let ry = tableY + rowH + r * rowH;
    let isCurrentRow = (a === sigA && b === sigB);
    let isFilled = testAllResults[r] !== null;

    // Row background
    if (isCurrentRow && animating) {
      fill(COL_ACTIVE + '30');
    } else if (isFilled) {
      fill('#E8F5E9');
    } else {
      fill(r % 2 === 0 ? '#FAFAFA' : '#fff');
    }
    noStroke();
    rect(tableX, ry, w - 12, rowH);

    // Active row indicator
    if (isCurrentRow) {
      fill(COL_ACTIVE);
      rect(tableX, ry, 3, rowH);
    }

    // Filled check
    if (isFilled) {
      fill('#4CAF50');
      textAlign(LEFT, CENTER);
      textSize(10);
      text('\u2714', tableX + 4, ry + rowH / 2);
    }

    stroke('#E0E0E0');
    strokeWeight(0.5);
    line(tableX, ry + rowH, tableX + w - 12, ry + rowH);
    noStroke();

    textSize(12);
    textStyle(isCurrentRow ? BOLD : NORMAL);

    fill(a ? COL_INPUT : '#999');
    textAlign(CENTER, CENTER);
    text(a, tableX + colW / 2, ry + rowH / 2);

    fill(b ? COL_INPUT : '#999');
    text(b, tableX + colW + colW / 2, ry + rowH / 2);

    // Show Y only if filled or current
    if (isFilled || isCurrentRow) {
      fill(out ? COL_OUTPUT : '#999');
      textStyle(BOLD);
      text(out, tableX + 2 * colW + colW / 2, ry + rowH / 2);
    } else {
      fill('#BDBDBD');
      textStyle(NORMAL);
      text('?', tableX + 2 * colW + colW / 2, ry + rowH / 2);
    }
  }

  // Expression
  let exprY = tableY + rowH * 5 + 6;
  fill('#555');
  textAlign(CENTER, TOP);
  textSize(9);
  textStyle(BOLD);
  text('Y = A ' + gate.vhdlOp.toUpperCase() + ' B', x + w / 2, exprY);

  fill(COL_ACTIVE);
  textSize(9);
  text(sigA + ' ' + gate.vhdlOp.toUpperCase() + ' ' + sigB + ' = ' + sigY, x + w / 2, exprY + 14);
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

  let concepts = [
    { title: 'Entity = Interface', lines: [
      'Declares port names,',
      'directions (in/out), and',
      'types. The "what" visible',
      'from outside.'
    ]},
    { title: 'Architecture = Body', lines: [
      'Implements the logic.',
      'The "how" it works',
      'internally. Hidden from',
      'the external view.'
    ]},
    { title: 'Behavioral vs Structural', lines: [
      'Behavioral: describes',
      'function (Y <= A and B).',
      'Structural: instantiates',
      'components (port map).'
    ]},
    { title: 'Delta Cycle', lines: [
      'VHDL signals update in',
      'delta cycles: change \u2192',
      'evaluate \u2192 update, all',
      'at zero simulation time.'
    ]}
  ];

  for (let c = 0; c < concepts.length; c++) {
    let sec = concepts[c];

    fill('#BF360C');
    textStyle(BOLD);
    textSize(8);
    text(sec.title, x + 6, noteY);
    noteY += lineH;

    fill('#555');
    textStyle(NORMAL);
    textSize(7);
    for (let i = 0; i < sec.lines.length; i++) {
      text(sec.lines[i], x + 8, noteY);
      noteY += lineH - 2;
    }
    noteY += 2;
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
    text('Toggle A or B to generate waveform, or click Test All Cases', x + w / 2, y + h / 2);
    return;
  }

  let labelW = 30;
  let plotX = x + labelW + 4;
  let plotW = w - labelW - 12;
  let topY = y + 22;
  let botY = y + h - 14;

  let signals = [
    { name: 'A', key: 'a', color: COL_INPUT },
    { name: 'B', key: 'b', color: COL_INPUT },
    { name: 'Y', key: 'y', color: COL_OUTPUT }
  ];

  let sigCount = signals.length;
  let sigH = min(45, (botY - topY) / sigCount);
  let entries = waveHistory.length;
  let colW = min(plotW / maxWaveEntries, plotW / max(entries, 1));

  for (let s = 0; s < sigCount; s++) {
    let sig = signals[s];
    let sy = topY + s * sigH;
    let baseY = sy + sigH - 8;
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

    for (let e = 0; e < entries; e++) {
      let ex = plotX + e * colW;
      let entry = waveHistory[e];
      let val = entry[sig.key];
      let prevVal = (e > 0) ? waveHistory[e - 1][sig.key] : val;

      stroke(sig.color);
      strokeWeight(2);
      let ly = val ? highY : baseY;
      let prevLy = prevVal ? highY : baseY;

      if (e > 0 && prevVal !== val) {
        line(ex, prevLy, ex, ly);
      }
      line(ex, ly, ex + colW, ly);
      noStroke();

      if (val) {
        fill(sig.color + '12');
        noStroke();
        rect(ex, highY, colW, baseY - highY);
      }
    }
  }

  // Time axis markers
  fill('#78909C');
  textAlign(CENTER, TOP);
  textSize(7);
  textStyle(NORMAL);
  let step = entries > 16 ? 2 : 1;
  for (let e = 0; e < entries; e += step) {
    text(e, plotX + e * colW + colW / 2, botY + 2);
  }

  // Time axis label
  fill('#90A4AE');
  textAlign(RIGHT, TOP);
  textSize(7);
  text('time \u2192', x + w - 8, botY + 2);
}

// ═══════════════════════════════════════════
//  STATE LOGIC
// ═══════════════════════════════════════════
function computeOutput() {
  let g = GATES[currentComponent];
  sigY = g.op(sigA, sigB);
}

function toggleSignal(which) {
  if (which === 'A') sigA = sigA ? 0 : 1;
  if (which === 'B') sigB = sigB ? 0 : 1;
  computeOutput();

  // Start 3-phase animation
  animating = true;
  animStart = millis();
  animPhase = 0;
  animProgress = 0;
  animChangedInput = which;
  deltaAnimProgress = 0;

  // Mark truth table row
  let inputs = [[0,0],[0,1],[1,0],[1,1]];
  for (let i = 0; i < 4; i++) {
    if (inputs[i][0] === sigA && inputs[i][1] === sigB) {
      if (testAllResults[i] === null) testAllFilledCount++;
      testAllResults[i] = sigY;
    }
  }

  waveTime++;
  addWaveEntry();
}

function addWaveEntry() {
  waveHistory.push({ a: sigA, b: sigB, y: sigY });
  if (waveHistory.length > maxWaveEntries) waveHistory.shift();
}

// ═══════════════════════════════════════════
//  TEST ALL CASES
// ═══════════════════════════════════════════
function startTestAll() {
  if (testAllRunning) return;
  testAllRunning = true;
  testAllStep = 0;
  testAllResults = [null, null, null, null];
  testAllFilledCount = 0;
  testAllTimer = millis();

  var tb = document.getElementById('test-all-btn');
  if (tb) { tb.textContent = 'Testing...'; tb.style.background = '#E65100'; }

  // Set first case immediately
  runTestAllStep();
}

function runTestAllStep() {
  let inputs = [[0,0],[0,1],[1,0],[1,1]];
  if (testAllStep >= 4) {
    testAllRunning = false;
    var tb = document.getElementById('test-all-btn');
    if (tb) { tb.textContent = 'Test All Cases'; tb.style.background = '#7B1FA2'; }
    return;
  }

  let target = inputs[testAllStep];
  // Set signals to target values
  let changedInput = '';
  if (sigA !== target[0]) { sigA = target[0]; changedInput = 'A'; }
  if (sigB !== target[1]) { sigB = target[1]; changedInput = changedInput ? 'A' : 'B'; }
  if (!changedInput) changedInput = 'A';

  computeOutput();

  // Mark result
  testAllResults[testAllStep] = sigY;
  testAllFilledCount = testAllStep + 1;

  // Start animation
  animating = true;
  animStart = millis();
  animPhase = 0;
  animProgress = 0;
  animChangedInput = changedInput;

  // Add to waveform
  waveTime++;
  addWaveEntry();

  testAllStep++;
}

// ═══════════════════════════════════════════
//  MOUSE INTERACTION
// ═══════════════════════════════════════════
function mousePressed() {
  if (testAllRunning) return;

  if (switchABounds) {
    let b = switchABounds;
    if (mouseX >= b.x && mouseX <= b.x + b.w && mouseY >= b.y && mouseY <= b.y + b.h) {
      toggleSignal('A');
      return;
    }
  }

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
