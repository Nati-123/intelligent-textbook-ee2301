// Datapath-Controller RTL Teaching Simulator
// Moore FSM (5 states) driving a simple ALU datapath
// Visual zones: FSM Controller, Control Bus, Datapath, Timing Diagram
// Bloom Level: Analyze (L4)

let containerWidth;
let canvasWidth = 400;
let drawHeight = 920;
let controlHeight = 0;
let canvasHeight = drawHeight + controlHeight;

// ── FSM States (Moore) ──
const S_IDLE    = 0;
const S_LOAD_A  = 1;
const S_LOAD_B  = 2;
const S_EXECUTE = 3;
const S_DISPLAY = 4;

let stateNames = ['IDLE', 'LOAD_A', 'LOAD_B', 'EXECUTE', 'DISPLAY'];
let currentState = S_IDLE;

// ── Datapath registers ──
let regA = 0;
let regB = 0;
let regR = 0;
let displayOut = 0;
let displayValid = false;

// ── Input values ──
let inputA = 5;
let inputB = 3;
let aluOp = 'ADD'; // ADD, SUB, AND, OR

// ── Control signals (Moore outputs) ──
let sig_load_A = 0;
let sig_load_B = 0;
let sig_alu_op = 0; // 0=ADD,1=SUB,2=AND,3=OR
let sig_load_R = 0;
let sig_out_en = 0;

// ── Waveform history ──
let waveHistory = [];
let maxWaveEntries = 16;

// ── Auto-run ──
let autoRunning = false;
let autoTimer = 0;
let autoInterval = 800;
let autoBtn = null;

// ── Done state timer ──
let doneTimestamp = 0;

// ── Click targets for input ──
let inputABounds = null;
let inputBBounds = null;
let opBtnBounds = [];

// ── Color palette (matches project RTL style) ──
const COL_SEQ      = '#1565C0';
const COL_SEQ_FILL = '#E3F2FD';
const COL_COMB     = '#2E7D32';
const COL_COMB_FILL= '#E8F5E9';
const COL_FSM_BG   = '#F3E5F5';
const COL_FSM      = '#6A1B9A';
const COL_DATA     = '#1565C0';
const COL_CTRL     = '#C62828';
const COL_CLK      = '#EF6C00';
const COL_IO_IN    = '#E65100';
const COL_IO_OUT   = '#1B5E20';

const COL_ST_IDLE   = '#78909C';
const COL_ST_ACTIVE = '#FF9800';
const COL_ST_DONE   = '#4CAF50';

const ALU_OPS = ['ADD', 'SUB', 'AND', 'OR'];

// ═══════════════════════════════════════════
//  SETUP
// ═══════════════════════════════════════════
function setup() {
  updateCanvasSize();
  var mainEl = document.querySelector('main');

  // DOM control bar
  var bar = document.createElement('div');
  bar.className = 'dp-controls';
  mainEl.appendChild(bar);

  // Start button
  var startBtn = document.createElement('button');
  startBtn.className = 'dp-btn dp-btn--start';
  startBtn.textContent = 'Start';
  startBtn.addEventListener('click', function() { startSequence(); });
  bar.appendChild(startBtn);

  // Step button
  var stepBtn = document.createElement('button');
  stepBtn.className = 'dp-btn dp-btn--step';
  stepBtn.textContent = 'Step (Clock)';
  stepBtn.addEventListener('click', function() { stepClock(); });
  bar.appendChild(stepBtn);

  // Auto button
  autoBtn = document.createElement('button');
  autoBtn.className = 'dp-btn dp-btn--auto';
  autoBtn.textContent = 'Auto';
  autoBtn.addEventListener('click', function() { toggleAutoRun(); });
  bar.appendChild(autoBtn);

  // Reset button
  var resetBtn = document.createElement('button');
  resetBtn.className = 'dp-btn dp-btn--reset';
  resetBtn.textContent = 'Reset';
  resetBtn.addEventListener('click', function() { resetSystem(); });
  bar.appendChild(resetBtn);

  // Fullscreen / Exit (expand iframe only)
  var navLink = document.createElement('a');
  navLink.href = '#';
  navLink.style.cssText = 'margin-left:auto;font-size:11px;font-weight:bold;color:#5C6BC0;cursor:pointer;text-decoration:none;';
  navLink.textContent = '⛶ Fullscreen';
  var _isFs = false, _iframe = window.frameElement, _origSt = _iframe ? _iframe.style.cssText : '';
  navLink.addEventListener('click', function(e) {
    e.preventDefault();
    if (_iframe) {
      if (!_isFs) { _origSt = _iframe.style.cssText; _iframe.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:99999;border:none;background:#fff;'; navLink.textContent = '✕ Exit Fullscreen'; }
      else { _iframe.style.cssText = _origSt; navLink.textContent = '⛶ Fullscreen'; setTimeout(function() { window.dispatchEvent(new Event('resize')); }, 100); }
      _isFs = !_isFs;
    }
  });
  bar.appendChild(navLink);

  const canvas = createCanvas(containerWidth, canvasHeight);
  canvas.parent(mainEl);
  describe('ALU datapath-controller RTL block diagram with Moore FSM, registers, ALU, control bus, and timing diagram', LABEL);

  resetSystem();
}

// ═══════════════════════════════════════════
//  DRAW
// ═══════════════════════════════════════════
function draw() {
  updateCanvasSize();
  background(250, 250, 252);

  // Auto-run logic
  if (autoRunning) {
    if (currentState === S_IDLE && waveHistory.length > 0) {
      autoRunning = false;
      updateAutoBtn();
    } else if (millis() - autoTimer > autoInterval) {
      autoTimer = millis();
      stepClock();
    }
  }

  // Auto-transition from DISPLAY back to IDLE
  if (!autoRunning && currentState === S_DISPLAY && millis() - doneTimestamp > 1500) {
    currentState = S_IDLE;
    updateControlSignals();
    addWaveEntry();
  }

  let m = 12; // margin
  let y = 4;

  // ── Title ──
  fill(COL_FSM);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(14);
  textStyle(BOLD);
  text('ALU Datapath–Controller RTL Block Diagram', canvasWidth / 2, y);
  y += 20;

  // ── Zone heights ──
  let fsmH = 115;
  let ctrlBusH = 36;
  let dpH = 280;
  let ioH = 95;
  let wfMinH = 250;
  let fixedH = fsmH + ctrlBusH + dpH + ioH + 60;
  let wfH = max(wfMinH, drawHeight - y - fixedH);

  // ── FSM Controller Zone ──
  drawFSMZone(m, y, canvasWidth - 2 * m, fsmH);
  y += fsmH + 4;

  // ── Control Bus Zone ──
  drawControlBus(m, y, canvasWidth - 2 * m, ctrlBusH);
  y += ctrlBusH + 4;

  // ── Datapath Zone ──
  drawDatapath(m, y, canvasWidth - 2 * m, dpH);
  y += dpH + 4;

  // ── I/O Zone ──
  drawIOZone(m, y, canvasWidth - 2 * m, ioH);
  y += ioH + 4;

  // ── Legend ──
  drawLegend(m, y, canvasWidth - 2 * m, 18);
  y += 22;

  // ── Timing Diagram Zone ──
  drawWaveform(m, y, canvasWidth - 2 * m, wfH);
}

// ═══════════════════════════════════════════
//  FSM CONTROLLER ZONE
// ═══════════════════════════════════════════
function drawFSMZone(x, y, w, h) {
  // Zone background
  fill(COL_FSM_BG);
  stroke(COL_FSM);
  strokeWeight(1.5);
  rect(x, y, w, h, 6);
  noStroke();

  // Zone label
  fill(COL_FSM);
  textAlign(LEFT, TOP);
  textSize(11);
  textStyle(BOLD);
  text('FSM Controller (Moore)', x + 8, y + 4);

  // Type badge
  fill('#F3E5F5');
  stroke(COL_FSM);
  strokeWeight(1);
  let badgeW = 64;
  rect(x + w - badgeW - 6, y + 3, badgeW, 16, 8);
  noStroke();
  fill(COL_FSM);
  textAlign(CENTER, CENTER);
  textSize(8);
  textStyle(BOLD);
  text('SEQUENTIAL', x + w - badgeW / 2 - 6, y + 11);

  // State circles
  let stateR = 24;
  let numStates = 5;
  let gap = (w - 40) / numStates;
  let startX = x + 20 + gap / 2;
  let cy = y + 62;

  let stateColors = [COL_ST_IDLE, COL_SEQ, COL_SEQ, COL_COMB, COL_ST_DONE];

  for (let i = 0; i < numStates; i++) {
    let sx = startX + i * gap;
    let isActive = (i === currentState);
    let col = stateColors[i];

    // Double circle for active
    if (isActive) {
      fill(col + '30');
      stroke(col);
      strokeWeight(3);
      ellipse(sx, cy, stateR * 2 + 6, stateR * 2 + 6);
    }

    fill(isActive ? col + '40' : '#FAFAFA');
    stroke(isActive ? col : '#9E9E9E');
    strokeWeight(isActive ? 2.5 : 1.5);
    ellipse(sx, cy, stateR * 2, stateR * 2);
    noStroke();

    // State label
    fill(isActive ? col : '#555');
    textAlign(CENTER, CENTER);
    textSize(10);
    textStyle(BOLD);
    text('S' + i, sx, cy - 7);
    textSize(7);
    textStyle(NORMAL);
    text(stateNames[i], sx, cy + 6);

    // Transition arrow to next state
    if (i < numStates - 1) {
      let nx = startX + (i + 1) * gap;
      let ax1 = sx + stateR + 3;
      let ax2 = nx - stateR - 3;
      stroke(isActive ? col : '#BDBDBD');
      strokeWeight(isActive ? 2 : 1);
      line(ax1, cy, ax2, cy);
      // Arrowhead
      line(ax2, cy, ax2 - 6, cy - 4);
      line(ax2, cy, ax2 - 6, cy + 4);
      noStroke();

      // Condition label
      if (i === 0) {
        fill(isActive ? col : '#999');
        textSize(7);
        text('start', (ax1 + ax2) / 2, cy - 10);
      }
    }
  }

  // Wrap-around arrow from S4 → S0
  let s4x = startX + 4 * gap;
  let s0x = startX;
  let arrowY = cy + stateR + 12;
  let isS4 = (currentState === S_DISPLAY);
  stroke(isS4 ? '#C62828' : '#BDBDBD');
  strokeWeight(isS4 ? 2 : 1);
  strokeCap(SQUARE);
  // Down from S4
  line(s4x, cy + stateR + 3, s4x, arrowY);
  // Horizontal
  line(s4x, arrowY, s0x, arrowY);
  // Up to S0
  line(s0x, arrowY, s0x, cy + stateR + 3);
  // Arrowhead
  line(s0x, cy + stateR + 3, s0x - 4, cy + stateR + 9);
  line(s0x, cy + stateR + 3, s0x + 4, cy + stateR + 9);
  noStroke();

  fill(isS4 ? '#C62828' : '#999');
  textSize(7);
  textAlign(CENTER, TOP);
  text('done', (s4x + s0x) / 2, arrowY + 1);

  // Reset arrow into S0
  stroke('#333');
  strokeWeight(1.5);
  line(s0x - stateR - 18, cy, s0x - stateR - 3, cy);
  line(s0x - stateR - 3, cy, s0x - stateR - 9, cy - 4);
  line(s0x - stateR - 3, cy, s0x - stateR - 9, cy + 4);
  noStroke();
  fill('#555');
  textSize(7);
  textAlign(CENTER, CENTER);
  text('rst', s0x - stateR - 18, cy - 8);
}

// ═══════════════════════════════════════════
//  CONTROL BUS ZONE
// ═══════════════════════════════════════════
function drawControlBus(x, y, w, h) {
  // Zone background
  fill('#FFF3E0');
  stroke(COL_CTRL);
  strokeWeight(1.5);
  rect(x, y, w, h, 6);
  noStroke();

  // Zone label
  fill(COL_CTRL);
  textAlign(LEFT, TOP);
  textSize(10);
  textStyle(BOLD);
  text('Control Bus', x + 8, y + 3);

  // Signal indicators
  let signals = [
    { name: 'load_A', val: sig_load_A },
    { name: 'load_B', val: sig_load_B },
    { name: 'alu_op', val: sig_alu_op > 0 ? 1 : 0 },
    { name: 'load_R', val: sig_load_R },
    { name: 'out_en', val: sig_out_en }
  ];

  let sigW = (w - 90) / signals.length;
  let startSigX = x + 80;
  let sigY = y + 16;

  for (let i = 0; i < signals.length; i++) {
    let sx = startSigX + i * sigW + sigW / 2;
    let s = signals[i];
    let active = s.val === 1;

    // Signal pill
    fill(active ? '#4CAF50' : '#E0E0E0');
    noStroke();
    let pillW = min(sigW - 6, 58);
    rect(sx - pillW / 2, sigY, pillW, 16, 8);

    fill(active ? '#fff' : '#999');
    textAlign(CENTER, CENTER);
    textSize(8);
    textStyle(BOLD);
    text(s.name + '=' + s.val, sx, sigY + 8);
  }

  // Micro-operation annotation
  let microOp = getMicroOp();
  if (microOp) {
    fill(COL_CTRL);
    textAlign(RIGHT, CENTER);
    textSize(8);
    textStyle(BOLD);
    text(microOp, x + w - 8, y + 10);
  }
}

function getMicroOp() {
  switch (currentState) {
    case S_LOAD_A:  return 'A \u2190 input';
    case S_LOAD_B:  return 'B \u2190 input';
    case S_EXECUTE: return 'R \u2190 A ' + getOpSymbol() + ' B';
    case S_DISPLAY: return 'out \u2190 R';
    default:        return '';
  }
}

function getOpSymbol() {
  switch (aluOp) {
    case 'ADD': return '+';
    case 'SUB': return '\u2212';
    case 'AND': return '&';
    case 'OR':  return '|';
    default:    return '+';
  }
}

// ═══════════════════════════════════════════
//  DATAPATH ZONE
// ═══════════════════════════════════════════
function drawDatapath(x, y, w, h) {
  // Zone background
  fill('#FAFAFA');
  stroke(COL_DATA);
  strokeWeight(1.5);
  rect(x, y, w, h, 6);
  noStroke();

  // Zone label
  fill(COL_DATA);
  textAlign(LEFT, TOP);
  textSize(11);
  textStyle(BOLD);
  text('Datapath', x + 8, y + 4);

  let cx = x + w / 2;
  let compW = 70;
  let compH = 38;

  // ── MUX at top ──
  let muxY = y + 24;
  let muxW = 44;
  let muxH = 28;
  let muxActive = (currentState === S_LOAD_A || currentState === S_LOAD_B);
  drawTrapezoid(cx, muxY, muxW, muxH, 'MUX', COL_COMB, COL_COMB_FILL, muxActive);

  // sel label
  fill(muxActive ? COL_COMB : '#999');
  textAlign(LEFT, CENTER);
  textSize(7);
  textStyle(NORMAL);
  text('sel', cx + muxW / 2 + 3, muxY + muxH / 2);

  // ── Data bus from MUX splits to Reg A and Reg B ──
  let regY = muxY + muxH + 30;
  let regAx = cx - w * 0.22;
  let regBx = cx + w * 0.22;

  // Bus lines from MUX
  stroke(muxActive ? COL_DATA : '#BDBDBD');
  strokeWeight(muxActive ? 2 : 1);
  drawBus(cx, muxY + muxH, cx, muxY + muxH + 12);
  drawBus(cx, muxY + muxH + 12, regAx, muxY + muxH + 12);
  drawBus(cx, muxY + muxH + 12, regBx, muxY + muxH + 12);
  drawBusDown(regAx, muxY + muxH + 12, regY);
  drawBusDown(regBx, muxY + muxH + 12, regY);
  noStroke();

  // ── Register A ──
  let regAactive = (currentState === S_LOAD_A);
  drawRegBlock(regAx - compW / 2, regY, compW, compH, 'Reg A', regA, COL_SEQ, COL_SEQ_FILL, regAactive);

  // load_A control arrow
  drawCtrlArrow(regAx - compW / 2 - 2, regY + compH / 2, 'load_A', sig_load_A);

  // ── Register B ──
  let regBactive = (currentState === S_LOAD_B);
  drawRegBlock(regBx - compW / 2, regY, compW, compH, 'Reg B', regB, COL_SEQ, COL_SEQ_FILL, regBactive);

  // load_B control arrow
  drawCtrlArrow(regBx + compW / 2 + 2, regY + compH / 2, 'load_B', sig_load_B, true);

  // ── ALU ──
  let aluY = regY + compH + 28;
  let aluW = 80;
  let aluH = 42;
  let aluActive = (currentState === S_EXECUTE);

  // Bus lines from registers to ALU
  stroke(aluActive ? COL_DATA : '#BDBDBD');
  strokeWeight(aluActive ? 2 : 1);
  let aluLeftIn = cx - aluW * 0.3;
  let aluRightIn = cx + aluW * 0.3;
  drawBusDown(regAx, regY + compH, aluY);
  drawBusDown(regBx, regY + compH, aluY);
  // Horizontal turns into ALU
  drawBus(regAx, aluY, aluLeftIn, aluY);
  drawBus(regBx, aluY, aluRightIn, aluY);
  noStroke();

  // ALU shape (V-shape)
  drawALUShape(cx, aluY, aluW, aluH, aluActive);

  // alu_op control arrow
  drawCtrlArrow(cx + aluW / 2 + 2, aluY + aluH / 2 - 4, 'alu_op', sig_alu_op > 0 ? 1 : 0, true);

  // Op label inside ALU
  fill(aluActive ? '#fff' : COL_COMB);
  textAlign(CENTER, CENTER);
  textSize(10);
  textStyle(BOLD);
  text(aluOp, cx, aluY + aluH / 2 - 2);

  // ── Result Register ──
  let resY = aluY + aluH + 25;
  let resActive = (currentState === S_EXECUTE);

  // Bus from ALU to Reg R
  stroke(resActive ? COL_DATA : '#BDBDBD');
  strokeWeight(resActive ? 2 : 1);
  drawBusDown(cx, aluY + aluH, resY);
  noStroke();

  drawRegBlock(cx - compW / 2, resY, compW, compH, 'Reg R', regR, COL_SEQ, COL_SEQ_FILL, resActive);

  // load_R control arrow
  drawCtrlArrow(cx + compW / 2 + 2, resY + compH / 2, 'load_R', sig_load_R, true);

  // ── Output enable / tri-state buffer ──
  let outY = resY + compH + 20;
  let outActive = (currentState === S_DISPLAY);

  // Bus from Reg R to output
  stroke(outActive ? COL_DATA : '#BDBDBD');
  strokeWeight(outActive ? 2 : 1);
  drawBusDown(cx, resY + compH, outY);
  noStroke();

  // Tri-state buffer triangle
  let triH = 18;
  let triW = 24;
  fill(outActive ? COL_COMB + '40' : '#F5F5F5');
  stroke(outActive ? COL_COMB : '#BDBDBD');
  strokeWeight(outActive ? 2 : 1);
  beginShape();
  vertex(cx - triW / 2, outY);
  vertex(cx + triW / 2, outY);
  vertex(cx, outY + triH);
  endShape(CLOSE);
  noStroke();

  // out_en label
  drawCtrlArrow(cx + triW / 2 + 2, outY + triH / 2, 'out_en', sig_out_en, true);

  // Output bus
  stroke(outActive ? '#1B5E20' : '#BDBDBD');
  strokeWeight(outActive ? 2.5 : 1);
  drawBusDown(cx, outY + triH, outY + triH + 14);
  noStroke();

  // Output value label
  if (displayValid) {
    fill('#1B5E20');
    textAlign(CENTER, TOP);
    textSize(11);
    textStyle(BOLD);
    text('Output: ' + displayOut, cx, outY + triH + 16);
  }

  // ── Data movement arrows (animated pulse) ──
  if (currentState !== S_IDLE) {
    drawDataFlow(cx, muxY, regAx, regBx, regY, aluY, aluH, resY, compH, outY, triH, w, x);
  }
}

function drawDataFlow(cx, muxY, regAx, regBx, regY, aluY, aluH, resY, compH, outY, triH, w, x) {
  let pulse = (millis() % 1000) / 1000;
  let dotR = 5;
  noStroke();

  if (currentState === S_LOAD_A) {
    // Pulse from MUX to Reg A
    fill(COL_ST_ACTIVE);
    let py = lerp(muxY + 28, regY, pulse);
    let px = lerp(cx, regAx, pulse);
    ellipse(px, py, dotR * 2);
  } else if (currentState === S_LOAD_B) {
    fill(COL_ST_ACTIVE);
    let py = lerp(muxY + 28, regY, pulse);
    let px = lerp(cx, regBx, pulse);
    ellipse(px, py, dotR * 2);
  } else if (currentState === S_EXECUTE) {
    // Pulse from registers through ALU to Reg R
    fill(COL_ST_ACTIVE);
    if (pulse < 0.5) {
      let p = pulse * 2;
      let pyA = lerp(regY + compH, aluY, p);
      ellipse(regAx, pyA, dotR * 2);
      let pyB = lerp(regY + compH, aluY, p);
      ellipse(regBx, pyB, dotR * 2);
    } else {
      let p = (pulse - 0.5) * 2;
      let py = lerp(aluY + aluH, resY, p);
      ellipse(cx, py, dotR * 2);
    }
  } else if (currentState === S_DISPLAY) {
    fill(COL_ST_DONE);
    let py = lerp(resY + compH, outY + triH, pulse);
    ellipse(cx, py, dotR * 2);
  }
}

// ═══════════════════════════════════════════
//  I/O ZONE
// ═══════════════════════════════════════════
function drawIOZone(x, y, w, h) {
  // Zone background
  fill('#FFF8E1');
  stroke(COL_IO_IN);
  strokeWeight(1.5);
  rect(x, y, w, h, 6);
  noStroke();

  // Zone label
  fill(COL_IO_IN);
  textAlign(LEFT, TOP);
  textSize(10);
  textStyle(BOLD);
  text('Input Interface', x + 8, y + 4);

  let cx = x + w / 2;
  let rowY = y + 22;

  // Input A
  let aLabelX = x + 20;
  fill('#555');
  textAlign(LEFT, CENTER);
  textSize(11);
  textStyle(BOLD);
  text('A:', aLabelX, rowY + 12);

  // A value box (clickable)
  let aBoxX = aLabelX + 22;
  let boxW = 40;
  let boxH = 24;
  fill('#fff');
  stroke(COL_SEQ);
  strokeWeight(1.5);
  rect(aBoxX, rowY, boxW, boxH, 4);
  noStroke();
  fill(COL_SEQ);
  textAlign(CENTER, CENTER);
  textSize(13);
  textStyle(BOLD);
  text(inputA, aBoxX + boxW / 2, rowY + boxH / 2);
  inputABounds = { x: aBoxX, y: rowY, w: boxW, h: boxH };

  // +/- buttons for A
  drawPlusMinus(aBoxX + boxW + 6, rowY, 'A');

  // Input B
  let bLabelX = cx + 10;
  fill('#555');
  textAlign(LEFT, CENTER);
  textSize(11);
  textStyle(BOLD);
  text('B:', bLabelX, rowY + 12);

  let bBoxX = bLabelX + 22;
  fill('#fff');
  stroke(COL_SEQ);
  strokeWeight(1.5);
  rect(bBoxX, rowY, boxW, boxH, 4);
  noStroke();
  fill(COL_SEQ);
  textAlign(CENTER, CENTER);
  textSize(13);
  textStyle(BOLD);
  text(inputB, bBoxX + boxW / 2, rowY + boxH / 2);
  inputBBounds = { x: bBoxX, y: rowY, w: boxW, h: boxH };

  // +/- buttons for B
  drawPlusMinus(bBoxX + boxW + 6, rowY, 'B');

  // ALU Operation selector
  let opY = rowY + boxH + 10;
  fill('#555');
  textAlign(LEFT, CENTER);
  textSize(10);
  textStyle(BOLD);
  text('ALU Op:', x + 20, opY + 12);

  opBtnBounds = [];
  let opStartX = x + 72;
  let opBtnW = 38;
  let opBtnH = 22;
  let opGap = 4;

  for (let i = 0; i < ALU_OPS.length; i++) {
    let bx = opStartX + i * (opBtnW + opGap);
    let isSelected = (aluOp === ALU_OPS[i]);

    fill(isSelected ? COL_COMB : '#E0E0E0');
    noStroke();
    rect(bx, opY, opBtnW, opBtnH, 4);

    fill(isSelected ? '#fff' : '#666');
    textAlign(CENTER, CENTER);
    textSize(9);
    textStyle(BOLD);
    text(ALU_OPS[i], bx + opBtnW / 2, opY + opBtnH / 2);

    opBtnBounds.push({ x: bx, y: opY, w: opBtnW, h: opBtnH, op: ALU_OPS[i] });
  }

  // Result display
  let resX = cx + 50;
  fill('#555');
  textAlign(LEFT, CENTER);
  textSize(10);
  textStyle(BOLD);
  text('Result:', resX, opY + 12);

  fill(displayValid ? '#E8F5E9' : '#F5F5F5');
  stroke(displayValid ? '#4CAF50' : '#E0E0E0');
  strokeWeight(1.5);
  rect(resX + 48, opY - 2, 50, opBtnH + 4, 4);
  noStroke();
  fill(displayValid ? '#1B5E20' : '#BDBDBD');
  textAlign(CENTER, CENTER);
  textSize(14);
  textStyle(BOLD);
  text(displayValid ? displayOut : '—', resX + 73, opY + opBtnH / 2);
}

function drawPlusMinus(x, y, which) {
  let btnS = 22;
  // Minus
  fill('#FFCDD2');
  noStroke();
  rect(x, y, btnS, btnS, 3);
  fill('#C62828');
  textAlign(CENTER, CENTER);
  textSize(14);
  textStyle(BOLD);
  text('\u2212', x + btnS / 2, y + btnS / 2 - 1);

  // Plus
  fill('#C8E6C9');
  rect(x + btnS + 4, y, btnS, btnS, 3);
  fill('#2E7D32');
  text('+', x + btnS + 4 + btnS / 2, y + btnS / 2 - 1);
}

// ═══════════════════════════════════════════
//  LEGEND
// ═══════════════════════════════════════════
function drawLegend(x, y, w, h) {
  fill('#fff');
  stroke('#E0E0E0');
  strokeWeight(1);
  rect(x, y, w, h, 4);
  noStroke();

  let items = [
    { label: 'Sequential', color: COL_SEQ },
    { label: 'Combinational', color: COL_COMB },
    { label: 'FSM', color: COL_FSM },
    { label: 'Control', color: COL_CTRL },
    { label: 'Active', color: '#4CAF50' }
  ];

  let gap = w / items.length;
  for (let i = 0; i < items.length; i++) {
    let ix = x + i * gap + gap / 2;
    fill(items[i].color);
    noStroke();
    rect(ix - 22, y + h / 2 - 3, 12, 6, 2);
    fill(items[i].color);
    textAlign(LEFT, CENTER);
    textSize(8);
    textStyle(BOLD);
    text(items[i].label, ix - 7, y + h / 2);
  }
}

// ═══════════════════════════════════════════
//  WAVEFORM / TIMING DIAGRAM
// ═══════════════════════════════════════════
function drawWaveform(x, y, w, h) {
  // Zone background
  fill('#ECEFF1');
  stroke('#90A4AE');
  strokeWeight(1.5);
  rect(x, y, w, h, 6);
  noStroke();

  // Zone label
  fill('#37474F');
  textAlign(LEFT, TOP);
  textSize(11);
  textStyle(BOLD);
  text('Timing Diagram', x + 8, y + 4);

  if (waveHistory.length === 0) {
    fill('#90A4AE');
    textAlign(CENTER, CENTER);
    textSize(12);
    textStyle(NORMAL);
    text('Press Start then Step (Clock) to begin', x + w / 2, y + h / 2);
    return;
  }

  let labelW = 62;
  let plotX = x + labelW + 4;
  let plotW = w - labelW - 12;
  let topY = y + 22;
  let botY = y + h - 6;

  let signals = [
    { name: 'clk',     key: 'clk',     color: COL_CLK },
    { name: 'state',   key: 'state',   color: COL_FSM },
    { name: 'load_A',  key: 'load_A',  color: COL_SEQ },
    { name: 'load_B',  key: 'load_B',  color: COL_SEQ },
    { name: 'alu_op',  key: 'alu_op',  color: COL_COMB },
    { name: 'load_R',  key: 'load_R',  color: COL_COMB },
    { name: 'out_en',  key: 'out_en',  color: COL_ST_DONE }
  ];

  let sigCount = signals.length;
  let sigH = min(28, (botY - topY) / sigCount);
  let entries = waveHistory.length;
  let colW = min(plotW / maxWaveEntries, plotW / max(entries, 1));

  for (let s = 0; s < sigCount; s++) {
    let sig = signals[s];
    let sy = topY + s * sigH;
    let baseY = sy + sigH - 4;
    let highY = sy + 4;

    // Signal name
    fill(sig.color);
    textAlign(RIGHT, CENTER);
    textSize(9);
    textStyle(BOLD);
    text(sig.name, plotX - 6, sy + sigH / 2);

    // Separator line
    stroke('#CFD8DC');
    strokeWeight(0.5);
    line(plotX, sy + sigH, x + w - 6, sy + sigH);
    noStroke();

    // Draw waveform
    for (let e = 0; e < entries; e++) {
      let ex = plotX + e * colW;
      let entry = waveHistory[e];

      if (sig.key === 'clk') {
        // Clock: square wave pulse
        stroke(sig.color);
        strokeWeight(1.5);
        let midX = ex + colW / 2;
        line(ex, baseY, ex, highY);
        line(ex, highY, midX, highY);
        line(midX, highY, midX, baseY);
        line(midX, baseY, ex + colW, baseY);
        noStroke();
      } else if (sig.key === 'state') {
        // State: bus-style with name
        let val = entry.state;
        let nextVal = (e < entries - 1) ? waveHistory[e + 1].state : val;

        fill(sig.color + '15');
        noStroke();
        rect(ex + 1, highY, colW - 2, baseY - highY, 2);

        // Transition marks
        if (e > 0 && waveHistory[e - 1].state !== val) {
          stroke(sig.color);
          strokeWeight(1);
          line(ex, highY, ex + 3, (highY + baseY) / 2);
          line(ex, baseY, ex + 3, (highY + baseY) / 2);
          noStroke();
        }

        fill(sig.color);
        textAlign(CENTER, CENTER);
        textSize(7);
        textStyle(BOLD);
        let sName = stateNames[val];
        if (colW > 24) {
          text('S' + val, ex + colW / 2, (highY + baseY) / 2);
        } else {
          text(val, ex + colW / 2, (highY + baseY) / 2);
        }
      } else {
        // Binary signal
        let val = entry[sig.key];
        let prevVal = (e > 0) ? waveHistory[e - 1][sig.key] : 0;

        stroke(sig.color);
        strokeWeight(1.5);
        let ly = val ? highY : baseY;
        let prevLy = prevVal ? highY : baseY;

        // Transition edge
        if (e > 0 && prevVal !== val) {
          line(ex, prevLy, ex, ly);
        }
        // Horizontal at level
        line(ex, ly, ex + colW, ly);
        noStroke();

        // Highlight active=1 region
        if (val) {
          fill(sig.color + '15');
          noStroke();
          rect(ex, highY, colW, baseY - highY);
        }
      }
    }
  }

  // Clock edge numbers along bottom
  fill('#78909C');
  textAlign(CENTER, TOP);
  textSize(7);
  textStyle(NORMAL);
  for (let e = 0; e < entries; e++) {
    text(e + 1, plotX + e * colW + colW / 2, botY - 3);
  }
}

// ═══════════════════════════════════════════
//  DRAWING HELPERS
// ═══════════════════════════════════════════
function drawRegBlock(x, y, w, h, label, value, col, fillCol, active) {
  fill(active ? col + '30' : fillCol);
  stroke(active ? col : '#BDBDBD');
  strokeWeight(active ? 2.5 : 1.5);
  rect(x, y, w, h, 5);

  // Clock triangle
  let triS = 6;
  stroke(active ? col : '#BDBDBD');
  strokeWeight(1);
  line(x, y + h - triS - 2, x + triS, y + h - 2);
  line(x + triS, y + h - 2, x, y + h + 2 - triS + triS);
  noStroke();

  fill(active ? col : '#555');
  textAlign(CENTER, CENTER);
  textSize(10);
  textStyle(BOLD);
  text(label, x + w / 2, y + 12);

  // Value
  fill(active ? '#fff' : '#888');
  textSize(12);
  textStyle(BOLD);
  let valStr = (currentState > S_IDLE || value !== 0 || displayValid) ? String(value) : '—';
  text(valStr, x + w / 2, y + h - 12);
}

function drawALUShape(cx, y, w, h, active) {
  fill(active ? COL_COMB + '40' : COL_COMB_FILL);
  stroke(active ? COL_COMB : '#BDBDBD');
  strokeWeight(active ? 2.5 : 1.5);
  beginShape();
  vertex(cx - w / 2, y);
  vertex(cx + w / 2, y);
  vertex(cx + w / 3, y + h);
  vertex(cx, y + h * 0.75);
  vertex(cx - w / 3, y + h);
  endShape(CLOSE);
  noStroke();
}

function drawTrapezoid(cx, y, w, h, label, col, fillCol, active) {
  fill(active ? col + '30' : fillCol);
  stroke(active ? col : '#BDBDBD');
  strokeWeight(active ? 2 : 1.5);
  let inset = 8;
  beginShape();
  vertex(cx - w / 2, y);
  vertex(cx + w / 2, y);
  vertex(cx + w / 2 - inset, y + h);
  vertex(cx - w / 2 + inset, y + h);
  endShape(CLOSE);
  noStroke();

  fill(active ? col : '#555');
  textAlign(CENTER, CENTER);
  textSize(9);
  textStyle(BOLD);
  text(label, cx, y + h / 2);
}

function drawBus(x1, y1, x2, y2) {
  line(x1, y1, x2, y2);
}

function drawBusDown(x, y1, y2) {
  line(x, y1, x, y2);
  // Small arrowhead
  line(x - 3, y2 - 5, x, y2);
  line(x + 3, y2 - 5, x, y2);
}

function drawCtrlArrow(x, y, label, active, fromRight) {
  let len = 18;
  let dir = fromRight ? 1 : -1;
  let startX = x + dir * len;
  let endX = x;

  stroke(active ? '#4CAF50' : '#E0E0E0');
  strokeWeight(active ? 1.5 : 1);
  line(startX, y, endX, y);
  // Arrow tip
  line(endX, y, endX + dir * 4, y - 3);
  line(endX, y, endX + dir * 4, y + 3);
  noStroke();

  fill(active ? COL_CTRL : '#BDBDBD');
  textAlign(fromRight ? LEFT : RIGHT, CENTER);
  textSize(7);
  textStyle(BOLD);
  text(label, startX + dir * 2, y);
}

// ═══════════════════════════════════════════
//  STATE MACHINE LOGIC
// ═══════════════════════════════════════════
function startSequence() {
  if (currentState !== S_IDLE) return;
  resetDatapath();
  currentState = S_LOAD_A;
  updateControlSignals();
  addWaveEntry();
}

function stepClock() {
  if (currentState === S_IDLE) return;

  // Execute current state's datapath operation
  executeState();

  // Advance to next state
  switch (currentState) {
    case S_LOAD_A:  currentState = S_LOAD_B;  break;
    case S_LOAD_B:  currentState = S_EXECUTE;  break;
    case S_EXECUTE: currentState = S_DISPLAY;  break;
    case S_DISPLAY:
      doneTimestamp = millis();
      currentState = S_IDLE;
      break;
  }

  updateControlSignals();
  addWaveEntry();

  if (currentState === S_IDLE && autoRunning) {
    autoRunning = false;
    updateAutoBtn();
  }
}

function executeState() {
  switch (currentState) {
    case S_LOAD_A:
      regA = inputA;
      break;
    case S_LOAD_B:
      regB = inputB;
      break;
    case S_EXECUTE:
      switch (aluOp) {
        case 'ADD': regR = regA + regB; break;
        case 'SUB': regR = regA - regB; break;
        case 'AND': regR = regA & regB; break;
        case 'OR':  regR = regA | regB; break;
      }
      break;
    case S_DISPLAY:
      displayOut = regR;
      displayValid = true;
      break;
  }
}

function updateControlSignals() {
  sig_load_A = 0;
  sig_load_B = 0;
  sig_alu_op = 0;
  sig_load_R = 0;
  sig_out_en = 0;

  switch (currentState) {
    case S_LOAD_A:
      sig_load_A = 1;
      break;
    case S_LOAD_B:
      sig_load_B = 1;
      break;
    case S_EXECUTE:
      sig_alu_op = ALU_OPS.indexOf(aluOp);
      sig_load_R = 1;
      break;
    case S_DISPLAY:
      sig_out_en = 1;
      break;
  }
}

function addWaveEntry() {
  waveHistory.push({
    clk: 1,
    state: currentState,
    load_A: sig_load_A,
    load_B: sig_load_B,
    alu_op: sig_load_R, // Show as 1 when ALU is active
    load_R: sig_load_R,
    out_en: sig_out_en
  });

  if (waveHistory.length > maxWaveEntries) {
    waveHistory.shift();
  }
}

function toggleAutoRun() {
  if (currentState === S_IDLE) {
    startSequence();
  }
  autoRunning = !autoRunning;
  autoTimer = millis();
  updateAutoBtn();
}

function updateAutoBtn() {
  if (autoBtn) {
    autoBtn.textContent = autoRunning ? 'Stop' : 'Auto';
    autoBtn.style.background = autoRunning ? '#F44336' : '#FF9800';
    autoBtn.style.borderColor = autoRunning ? '#C62828' : '#E65100';
  }
}

function resetSystem() {
  currentState = S_IDLE;
  resetDatapath();
  waveHistory = [];
  autoRunning = false;
  updateAutoBtn();
  updateControlSignals();
}

function resetDatapath() {
  regA = 0;
  regB = 0;
  regR = 0;
  displayOut = 0;
  displayValid = false;
}

// ═══════════════════════════════════════════
//  MOUSE INTERACTION
// ═══════════════════════════════════════════
function mousePressed() {
  // Only allow input changes when IDLE
  if (currentState !== S_IDLE) return;

  // Check +/- buttons for A
  if (inputABounds) {
    let ax = inputABounds.x + inputABounds.w + 6;
    let ay = inputABounds.y;
    let btnS = 22;
    // Minus A
    if (mouseX >= ax && mouseX <= ax + btnS && mouseY >= ay && mouseY <= ay + btnS) {
      inputA = max(0, inputA - 1);
    }
    // Plus A
    if (mouseX >= ax + btnS + 4 && mouseX <= ax + 2 * btnS + 4 && mouseY >= ay && mouseY <= ay + btnS) {
      inputA = min(255, inputA + 1);
    }
  }

  // Check +/- buttons for B
  if (inputBBounds) {
    let bx = inputBBounds.x + inputBBounds.w + 6;
    let by = inputBBounds.y;
    let btnS = 22;
    // Minus B
    if (mouseX >= bx && mouseX <= bx + btnS && mouseY >= by && mouseY <= by + btnS) {
      inputB = max(0, inputB - 1);
    }
    // Plus B
    if (mouseX >= bx + btnS + 4 && mouseX <= bx + 2 * btnS + 4 && mouseY >= by && mouseY <= by + btnS) {
      inputB = min(255, inputB + 1);
    }
  }

  // Check ALU op buttons
  for (let i = 0; i < opBtnBounds.length; i++) {
    let b = opBtnBounds[i];
    if (mouseX >= b.x && mouseX <= b.x + b.w && mouseY >= b.y && mouseY <= b.y + b.h) {
      aluOp = b.op;
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
