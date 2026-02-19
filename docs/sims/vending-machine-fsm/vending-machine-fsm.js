// Vending Machine FSM — Saturation Model RTL MicroSim
// 5-state Moore FSM controller driving accumulator-based datapath
// Visual zones: FSM Controller, Control Bus, Datapath, I/O, Timing Diagram
// Bloom Level: Analyze (L4)

let containerWidth;
let canvasWidth = 400;
let drawHeight = 1050;
let controlHeight = 0;
let canvasHeight = drawHeight + controlHeight;

// ── FSM States (Moore) ──
const S_IDLE     = 0;
const S_ACCEPT   = 1;
const S_CHECK    = 2;
const S_DISPENSE = 3;
const S_DONE     = 4;

let stateNames = ['IDLE', 'ACCEPT', 'CHECK', 'DISPENSE', 'DONE'];
let currentState = S_IDLE;

// ── Datapath registers ──
let balance = 0;          // 6-bit accumulator (0–63)
let coinValue = 0;        // current coin: 0, 5, 10, 25
let pendingCoin = null;   // queued coin from button press
let compResult = false;   // comparator output (bal >= 30)
let changeAmount = 0;     // subtractor output (bal - 30)
let dispenseActive = false;
let lastDispenseChange = 0;

// ── Control signals (Moore outputs) ──
let sig_load_coin = 0;
let sig_add_en    = 0;
let sig_load_bal  = 0;
let sig_cmp_en    = 0;
let sig_disp_en   = 0;
let sig_sub_en    = 0;
let sig_load_chg  = 0;

// ── Waveform history ──
let waveHistory = [];
let maxWaveEntries = 20;

// ── Auto-run ──
let autoRunning = false;
let autoTimer = 0;
let autoInterval = 800;
let autoBtn = null;

// ── Done state timer ──
let doneTimestamp = 0;

// ── Coin label for waveform ──
let lastCoinLabel = '--';

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
const COL_ST_ACCEPT = '#FF9800';
const COL_ST_CHECK  = '#2196F3';
const COL_ST_DISP   = '#4CAF50';
const COL_ST_DONE   = '#9C27B0';

// ═══════════════════════════════════════════
//  SETUP
// ═══════════════════════════════════════════
function setup() {
  updateCanvasSize();
  var mainEl = document.querySelector('main');

  // DOM control bar
  var bar = document.createElement('div');
  bar.className = 'vm-controls';
  mainEl.appendChild(bar);

  // Nickel button
  var nickelBtn = document.createElement('button');
  nickelBtn.className = 'vm-btn vm-btn--nickel';
  nickelBtn.textContent = 'Nickel (5\u00A2)';
  nickelBtn.addEventListener('click', function() { queueCoin(5); });
  bar.appendChild(nickelBtn);

  // Dime button
  var dimeBtn = document.createElement('button');
  dimeBtn.className = 'vm-btn vm-btn--dime';
  dimeBtn.textContent = 'Dime (10\u00A2)';
  dimeBtn.addEventListener('click', function() { queueCoin(10); });
  bar.appendChild(dimeBtn);

  // Quarter button
  var quarterBtn = document.createElement('button');
  quarterBtn.className = 'vm-btn vm-btn--quarter';
  quarterBtn.textContent = 'Quarter (25\u00A2)';
  quarterBtn.addEventListener('click', function() { queueCoin(25); });
  bar.appendChild(quarterBtn);

  // Separator
  var sep = document.createElement('span');
  sep.style.cssText = 'width:2px;height:24px;background:#BDBDBD;margin:0 4px;';
  bar.appendChild(sep);

  // Step button
  var stepBtn = document.createElement('button');
  stepBtn.className = 'vm-btn vm-btn--step';
  stepBtn.textContent = 'Step (Clock)';
  stepBtn.addEventListener('click', function() { stepClock(); });
  bar.appendChild(stepBtn);

  // Auto button
  autoBtn = document.createElement('button');
  autoBtn.className = 'vm-btn vm-btn--auto';
  autoBtn.textContent = 'Auto';
  autoBtn.addEventListener('click', function() { toggleAutoRun(); });
  bar.appendChild(autoBtn);

  // Reset button
  var resetBtn = document.createElement('button');
  resetBtn.className = 'vm-btn vm-btn--reset';
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
  describe('Vending machine FSM saturation model with Moore controller, accumulator datapath, and timing diagram', LABEL);

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
    if (millis() - autoTimer > autoInterval) {
      autoTimer = millis();
      stepClock();
    }
  }

  // Auto-transition from DONE back to IDLE
  if (!autoRunning && currentState === S_DONE && millis() - doneTimestamp > 1500) {
    balance = 0;
    dispenseActive = false;
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
  text('Vending Machine \u2014 Controller\u2013Datapath RTL Block Diagram (Saturation Model)', canvasWidth / 2, y);
  y += 22;

  // ── Zone heights ──
  let fsmH = 130;
  let ctrlBusH = 40;
  let dpH = 300;
  let ioH = 110;
  let legendH = 18;
  let wfMinH = 280;
  let fixedH = fsmH + ctrlBusH + dpH + ioH + legendH + 30;
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
  drawLegend(m, y, canvasWidth - 2 * m, legendH);
  y += legendH + 4;

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
  let stateR = 22;
  let numStates = 5;
  let gap = (w - 40) / numStates;
  let startX = x + 20 + gap / 2;
  let cy = y + 55;

  let stateColors = [COL_ST_IDLE, COL_ST_ACCEPT, COL_ST_CHECK, COL_ST_DISP, COL_ST_DONE];

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
    textSize(9);
    textStyle(BOLD);
    text('S' + i, sx, cy - 7);
    textSize(7);
    textStyle(NORMAL);
    text(stateNames[i], sx, cy + 6);

    // Transition arrow to next state (except from S2 which has conditional fork)
    if (i < numStates - 1 && i !== 2) {
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
        text('coin', (ax1 + ax2) / 2, cy - 10);
      }
    }
  }

  // S2 (CHECK) conditional fork: forward to S3 (bal>=30) and back to S0 (bal<30)
  let s2x = startX + 2 * gap;
  let s3x = startX + 3 * gap;
  let s0x = startX;
  let isS2 = (currentState === S_CHECK);

  // Forward arrow: S2 → S3 (bal >= 30)
  let f1 = s2x + stateR + 3;
  let f2 = s3x - stateR - 3;
  stroke(isS2 && compResult ? COL_ST_DISP : '#BDBDBD');
  strokeWeight(isS2 && compResult ? 2 : 1);
  line(f1, cy, f2, cy);
  line(f2, cy, f2 - 6, cy - 4);
  line(f2, cy, f2 - 6, cy + 4);
  noStroke();
  fill(isS2 && compResult ? COL_ST_DISP : '#999');
  textSize(7);
  textAlign(CENTER, CENTER);
  text('bal\u226530', (f1 + f2) / 2, cy - 10);

  // Back arrow: S2 → S0 (bal < 30) — curved below
  let backY = cy + stateR + 14;
  stroke(isS2 && !compResult ? COL_ST_IDLE : '#BDBDBD');
  strokeWeight(isS2 && !compResult ? 2 : 1);
  // Down from S2
  line(s2x, cy + stateR + 3, s2x, backY);
  // Horizontal back
  line(s2x, backY, s0x, backY);
  // Up to S0
  line(s0x, backY, s0x, cy + stateR + 3);
  // Arrowhead
  line(s0x, cy + stateR + 3, s0x - 4, cy + stateR + 9);
  line(s0x, cy + stateR + 3, s0x + 4, cy + stateR + 9);
  noStroke();
  fill(isS2 && !compResult ? COL_ST_IDLE : '#999');
  textSize(7);
  textAlign(CENTER, TOP);
  text('bal<30', (s2x + s0x) / 2, backY + 1);

  // Wrap-around arrow from S4 → S0 (below the back arrow)
  let s4x = startX + 4 * gap;
  let wrapY = backY + 14;
  let isS4 = (currentState === S_DONE);
  stroke(isS4 ? COL_ST_DONE : '#BDBDBD');
  strokeWeight(isS4 ? 2 : 1);
  // Down from S4
  line(s4x, cy + stateR + 3, s4x, wrapY);
  // Horizontal
  line(s4x, wrapY, s0x - 10, wrapY);
  // Up to S0
  line(s0x - 10, wrapY, s0x - 10, cy);
  // Into S0
  line(s0x - 10, cy, s0x - stateR - 3, cy);
  line(s0x - stateR - 3, cy, s0x - stateR + 3, cy - 4);
  line(s0x - stateR - 3, cy, s0x - stateR + 3, cy + 4);
  noStroke();
  fill(isS4 ? COL_ST_DONE : '#999');
  textSize(7);
  textAlign(CENTER, TOP);
  text('done', (s4x + s0x) / 2, wrapY + 1);

  // Reset arrow into S0
  stroke('#333');
  strokeWeight(1.5);
  let rstX = s0x - stateR - 20;
  line(rstX - 12, cy - 18, rstX, cy - 18);
  line(rstX, cy - 18, rstX, cy);
  line(rstX, cy, s0x - stateR - 3, cy);
  noStroke();
  fill('#555');
  textSize(7);
  textAlign(CENTER, CENTER);
  text('rst', rstX - 12, cy - 24);
}

// ═══════════════════════════════════════════
//  CONTROL BUS ZONE
// ═══════════════════════════════════════════
function drawControlBus(x, y, w, h) {
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
    { name: 'load_coin', val: sig_load_coin },
    { name: 'add_en',    val: sig_add_en },
    { name: 'load_bal',  val: sig_load_bal },
    { name: 'cmp_en',    val: sig_cmp_en },
    { name: 'disp_en',   val: sig_disp_en },
    { name: 'sub_en',    val: sig_sub_en },
    { name: 'load_chg',  val: sig_load_chg }
  ];

  let sigW = (w - 90) / signals.length;
  let startSigX = x + 80;
  let sigY = y + 18;

  for (let i = 0; i < signals.length; i++) {
    let sx = startSigX + i * sigW + sigW / 2;
    let s = signals[i];
    let active = s.val === 1;

    // Signal pill
    fill(active ? '#4CAF50' : '#E0E0E0');
    noStroke();
    let pillW = min(sigW - 4, 52);
    rect(sx - pillW / 2, sigY, pillW, 16, 8);

    fill(active ? '#fff' : '#999');
    textAlign(CENTER, CENTER);
    textSize(7);
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
    case S_ACCEPT:   return 'bal \u2190 bal + coin';
    case S_CHECK:    return 'bal \u2265 30 ?';
    case S_DISPENSE: return 'change \u2190 bal \u2212 30; DISPENSE';
    case S_DONE:     return 'display result';
    default:         return '';
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
  let compW = 80;
  let compH = 36;

  // ── Row 1: Coin Decoder and Adder ──
  let row1Y = y + 28;
  let decoderX = x + w * 0.18;
  let adderX = cx + w * 0.05;
  let decoW = 78;
  let decoH = 34;

  // Coin Decoder
  let decoActive = (currentState === S_ACCEPT);
  drawCombBlock(decoderX - decoW / 2, row1Y, decoW, decoH,
    'Coin Decoder', 'N=5 D=10 Q=25',
    decoActive ? String(coinValue) : '\u2014', decoActive);
  drawCtrlArrow(decoderX - decoW / 2 - 2, row1Y + decoH / 2, 'load_coin', sig_load_coin);

  // Bus: Decoder → Adder
  stroke(decoActive ? COL_DATA : '#BDBDBD');
  strokeWeight(decoActive ? 2 : 1);
  drawBus(decoderX + decoW / 2, row1Y + decoH / 2, adderX - compW / 2, row1Y + decoH / 2);
  noStroke();

  // Adder (V-shape like ALU)
  let adderActive = (currentState === S_ACCEPT);
  drawALUShape(adderX, row1Y - 2, compW, compH + 6, adderActive);

  // Adder label
  fill(adderActive ? '#fff' : COL_COMB);
  textAlign(CENTER, CENTER);
  textSize(10);
  textStyle(BOLD);
  text('Adder (+)', adderX, row1Y + decoH / 2 - 2);

  drawCtrlArrow(adderX + compW / 2 + 2, row1Y + decoH / 2, 'add_en', sig_add_en, true);

  // ── Row 2: Balance Register ──
  let row2Y = row1Y + decoH + 28;
  let balX = adderX;

  // Bus: Adder → Balance Reg
  stroke(adderActive ? COL_DATA : '#BDBDBD');
  strokeWeight(adderActive ? 2 : 1);
  drawBusDown(balX, row1Y + decoH + 4, row2Y);
  noStroke();

  let balActive = (currentState === S_ACCEPT);
  drawRegBlock(balX - compW / 2, row2Y, compW, compH,
    'Balance Reg', balance, COL_SEQ, COL_SEQ_FILL, balActive);
  drawCtrlArrow(balX + compW / 2 + 2, row2Y + compH / 2, 'load_bal', sig_load_bal, true);

  // ── Feedback loop: Balance Reg output → Adder input B ──
  let fbX = adderX + compW / 2 + 30;
  let fbActive = (currentState === S_ACCEPT);
  stroke(fbActive ? COL_DATA + '80' : '#DCDCDC');
  strokeWeight(fbActive ? 1.5 : 1);
  strokeCap(SQUARE);
  // Right from Balance Reg
  line(balX + compW / 2, row2Y + compH / 2 - 6, fbX, row2Y + compH / 2 - 6);
  // Up to Adder level
  line(fbX, row2Y + compH / 2 - 6, fbX, row1Y + 4);
  // Left into Adder right input
  line(fbX, row1Y + 4, adderX + compW * 0.3, row1Y + 4);
  // Small arrowhead
  line(adderX + compW * 0.3, row1Y + 4, adderX + compW * 0.3 + 5, row1Y + 1);
  line(adderX + compW * 0.3, row1Y + 4, adderX + compW * 0.3 + 5, row1Y + 7);
  noStroke();

  // Feedback label
  fill(fbActive ? COL_DATA : '#BDBDBD');
  textAlign(CENTER, CENTER);
  textSize(6);
  textStyle(NORMAL);
  text('feedback', fbX + 2, (row1Y + row2Y + compH / 2) / 2);

  // ── Row 3: Comparator and Subtractor ──
  let row3Y = row2Y + compH + 30;
  let cmpX = cx - w * 0.18;
  let subX = cx + w * 0.22;
  let cmpW = 76;
  let cmpH = 34;

  // Bus from Balance Reg splitting down to both
  let splitY = row2Y + compH + 8;
  stroke((currentState === S_CHECK || currentState === S_DISPENSE) ? COL_DATA : '#BDBDBD');
  strokeWeight((currentState === S_CHECK || currentState === S_DISPENSE) ? 2 : 1);
  drawBusDown(balX, row2Y + compH, splitY);
  // Horizontal split
  drawBus(balX, splitY, cmpX, splitY);
  drawBus(balX, splitY, subX, splitY);
  // Down to each
  drawBusDown(cmpX, splitY, row3Y);
  drawBusDown(subX, splitY, row3Y);
  noStroke();

  // Comparator
  let cmpActive = (currentState === S_CHECK);
  drawCombBlock(cmpX - cmpW / 2, row3Y, cmpW, cmpH,
    'Comparator', '\u2265 30',
    compResult ? '1 (true)' : '0 (false)', cmpActive);
  drawCtrlArrow(cmpX - cmpW / 2 - 2, row3Y + cmpH / 2, 'cmp_en', sig_cmp_en);

  // Comparator output to FSM (dashed upward)
  if (cmpActive) {
    stroke(COL_FSM + '80');
    strokeWeight(1);
    drawingContext.setLineDash([4, 3]);
    line(cmpX - cmpW / 2 - 4, row3Y + 6, cmpX - cmpW / 2 - 20, row3Y - 16);
    drawingContext.setLineDash([]);
    noStroke();
    fill(COL_FSM);
    textSize(6);
    textAlign(LEFT, CENTER);
    text('\u2192 FSM', cmpX - cmpW / 2 - 38, row3Y - 20);
  }

  // Subtractor
  let subActive = (currentState === S_DISPENSE);
  drawCombBlock(subX - cmpW / 2, row3Y, cmpW, cmpH,
    'Subtractor', 'bal \u2212 30',
    subActive ? String(changeAmount) : '\u2014', subActive);
  drawCtrlArrow(subX + cmpW / 2 + 2, row3Y + cmpH / 2, 'sub_en', sig_sub_en, true);

  // ── Row 4: Output Register ──
  let row4Y = row3Y + cmpH + 28;
  let outRegX = subX;

  // Bus: Subtractor → Output Reg
  stroke(subActive ? COL_DATA : '#BDBDBD');
  strokeWeight(subActive ? 2 : 1);
  drawBusDown(subX, row3Y + cmpH, row4Y);
  noStroke();

  let outActive = (currentState === S_DISPENSE || currentState === S_DONE);
  drawRegBlock(outRegX - compW / 2, row4Y, compW, compH,
    'Output Reg', lastDispenseChange, COL_SEQ, COL_SEQ_FILL, outActive);
  drawCtrlArrow(outRegX + compW / 2 + 2, row4Y + compH / 2, 'load_chg', sig_load_chg, true);

  // Dispense output from Output Reg
  if (dispenseActive || currentState === S_DONE) {
    stroke(COL_IO_OUT);
    strokeWeight(2);
    drawBusDown(outRegX, row4Y + compH, row4Y + compH + 14);
    noStroke();
    fill(COL_IO_OUT);
    textAlign(CENTER, TOP);
    textSize(8);
    textStyle(BOLD);
    text('dispense=' + (dispenseActive ? '1' : '0') + ', change=' + lastDispenseChange + '\u00A2', outRegX, row4Y + compH + 16);
  }

  // ── Data flow animation ──
  if (currentState !== S_IDLE) {
    drawDataFlow(decoderX, decoW, adderX, balX, row1Y, decoH, row2Y, compH,
      cmpX, subX, cmpH, row3Y, outRegX, row4Y);
  }
}

function drawDataFlow(decoderX, decoW, adderX, balX, row1Y, decoH, row2Y, compH,
  cmpX, subX, cmpH, row3Y, outRegX, row4Y) {
  let pulse = (millis() % 1000) / 1000;
  let dotR = 5;
  noStroke();

  if (currentState === S_ACCEPT) {
    // Pulse: Decoder → Adder → Balance Reg
    fill(COL_ST_ACCEPT);
    if (pulse < 0.33) {
      let p = pulse / 0.33;
      let px = lerp(decoderX + decoW / 2, adderX, p);
      ellipse(px, row1Y + decoH / 2, dotR * 2);
    } else if (pulse < 0.66) {
      let p = (pulse - 0.33) / 0.33;
      let py = lerp(row1Y + decoH + 4, row2Y, p);
      ellipse(adderX, py, dotR * 2);
    } else {
      // Feedback pulse
      fill(COL_ST_ACCEPT + '80');
      let p = (pulse - 0.66) / 0.34;
      let px = lerp(balX + 40, adderX + 30, p);
      let py = lerp(row2Y + compH / 2, row1Y + 4, p);
      ellipse(px, py, dotR * 2);
    }
  } else if (currentState === S_CHECK) {
    // Pulse: Balance Reg → Comparator
    fill(COL_ST_CHECK);
    let py = lerp(row2Y + compH, row3Y, pulse);
    let px = lerp(balX, cmpX, pulse);
    ellipse(px, py, dotR * 2);
  } else if (currentState === S_DISPENSE) {
    // Pulse: Balance Reg → Subtractor → Output Reg
    fill(COL_ST_DISP);
    if (pulse < 0.5) {
      let p = pulse / 0.5;
      let py = lerp(row2Y + compH, row3Y, p);
      let px = lerp(balX, subX, p);
      ellipse(px, py, dotR * 2);
    } else {
      let p = (pulse - 0.5) / 0.5;
      let py = lerp(row3Y + cmpH, row4Y, p);
      ellipse(subX, py, dotR * 2);
    }
  } else if (currentState === S_DONE) {
    // Pulse at output reg
    fill(COL_ST_DONE);
    let sz = dotR * 2 + sin(pulse * TWO_PI) * 3;
    ellipse(outRegX, row4Y + compH + 8, sz);
  }
}

// ═══════════════════════════════════════════
//  I/O ZONE
// ═══════════════════════════════════════════
function drawIOZone(x, y, w, h) {
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
  text('I/O Interface', x + 8, y + 4);

  let cx = x + w / 2;

  // ── Left side: Coin input status ──
  let leftW = w * 0.45;
  let rowY = y + 24;

  // Pending coin indicator
  fill('#555');
  textAlign(LEFT, CENTER);
  textSize(10);
  textStyle(BOLD);
  text('Pending Coin:', x + 14, rowY + 10);

  let coinLabel = pendingCoin === null ? 'None' :
    pendingCoin === 5 ? 'Nickel (5\u00A2)' :
    pendingCoin === 10 ? 'Dime (10\u00A2)' : 'Quarter (25\u00A2)';
  let coinColor = pendingCoin === null ? '#BDBDBD' :
    pendingCoin === 5 ? '#2196F3' :
    pendingCoin === 10 ? '#4CAF50' : '#FF9800';

  fill(coinColor + (pendingCoin !== null ? '30' : ''));
  stroke(coinColor);
  strokeWeight(1.5);
  rect(x + 110, rowY, 100, 22, 4);
  noStroke();
  fill(pendingCoin !== null ? coinColor : '#BDBDBD');
  textAlign(CENTER, CENTER);
  textSize(11);
  textStyle(BOLD);
  text(coinLabel, x + 160, rowY + 11);

  // Balance display
  let balY = rowY + 34;
  fill('#555');
  textAlign(LEFT, CENTER);
  textSize(10);
  textStyle(BOLD);
  text('Balance:', x + 14, balY + 14);

  // Balance value box
  fill(balance >= 30 ? '#E8F5E9' : '#E3F2FD');
  stroke(balance >= 30 ? COL_ST_DISP : COL_SEQ);
  strokeWeight(2);
  rect(x + 75, balY, 60, 28, 4);
  noStroke();
  fill(balance >= 30 ? COL_ST_DISP : COL_SEQ);
  textAlign(CENTER, CENTER);
  textSize(16);
  textStyle(BOLD);
  text(balance + '\u00A2', x + 105, balY + 14);

  // Progress bar toward 30¢
  let barX = x + 145;
  let barW = leftW - 140;
  let barH = 10;
  let barY = balY + 9;
  fill('#E0E0E0');
  noStroke();
  rect(barX, barY, barW, barH, 3);
  let fillW = min(barW, barW * (balance / 30));
  fill(balance >= 30 ? COL_ST_DISP : COL_SEQ);
  rect(barX, barY, fillW, barH, 3);
  // 30¢ label
  fill('#999');
  textSize(7);
  textAlign(RIGHT, CENTER);
  text('30\u00A2', barX + barW + 16, barY + barH / 2);

  // ── Right side: Output status ──
  let rightX = x + leftW + 20;

  // Dispense LED
  fill('#555');
  textAlign(LEFT, CENTER);
  textSize(10);
  textStyle(BOLD);
  text('Dispense:', rightX, rowY + 10);

  let ledX = rightX + 68;
  let ledR = 10;
  fill(dispenseActive ? '#4CAF50' : '#E0E0E0');
  stroke(dispenseActive ? '#2E7D32' : '#BDBDBD');
  strokeWeight(2);
  ellipse(ledX, rowY + 10, ledR * 2);
  noStroke();

  if (dispenseActive) {
    // Glow
    fill('#4CAF5040');
    noStroke();
    ellipse(ledX, rowY + 10, ledR * 3);
  }

  fill(dispenseActive ? '#fff' : '#999');
  textAlign(CENTER, CENTER);
  textSize(8);
  textStyle(BOLD);
  text(dispenseActive ? 'ON' : 'OFF', ledX, rowY + 10);

  // Change amount display
  fill('#555');
  textAlign(LEFT, CENTER);
  textSize(10);
  textStyle(BOLD);
  text('Change:', rightX, balY + 14);

  fill(lastDispenseChange > 0 && (dispenseActive || currentState === S_DONE) ? '#E8F5E9' : '#F5F5F5');
  stroke(lastDispenseChange > 0 && (dispenseActive || currentState === S_DONE) ? COL_IO_OUT : '#E0E0E0');
  strokeWeight(1.5);
  rect(rightX + 56, balY, 52, 28, 4);
  noStroke();
  fill(lastDispenseChange > 0 && (dispenseActive || currentState === S_DONE) ? COL_IO_OUT : '#BDBDBD');
  textAlign(CENTER, CENTER);
  textSize(16);
  textStyle(BOLD);
  text((dispenseActive || currentState === S_DONE) ? lastDispenseChange + '\u00A2' : '\u2014', rightX + 82, balY + 14);

  // FSM state indicator
  let stateY = balY + 38;
  fill('#555');
  textAlign(LEFT, CENTER);
  textSize(9);
  textStyle(BOLD);
  text('FSM State:', rightX, stateY + 6);

  let stateColors = [COL_ST_IDLE, COL_ST_ACCEPT, COL_ST_CHECK, COL_ST_DISP, COL_ST_DONE];
  let sc = stateColors[currentState];
  fill(sc + '25');
  stroke(sc);
  strokeWeight(1.5);
  rect(rightX + 68, stateY, 80, 16, 4);
  noStroke();
  fill(sc);
  textAlign(CENTER, CENTER);
  textSize(9);
  textStyle(BOLD);
  text('S' + currentState + ': ' + stateNames[currentState], rightX + 108, stateY + 8);
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
    text('Insert a coin then press Step (Clock) to begin', x + w / 2, y + h / 2);
    return;
  }

  let labelW = 58;
  let plotX = x + labelW + 4;
  let plotW = w - labelW - 12;
  let topY = y + 22;
  let botY = y + h - 8;

  let signals = [
    { name: 'clk',      key: 'clk',      color: COL_CLK,    type: 'clock' },
    { name: 'state',    key: 'state',     color: COL_FSM,    type: 'bus' },
    { name: 'coin_in',  key: 'coin_in',   color: COL_IO_IN,  type: 'bus' },
    { name: 'balance',  key: 'balance',   color: COL_SEQ,    type: 'bus' },
    { name: 'bal\u226530', key: 'cmp_out', color: COL_COMB,   type: 'binary' },
    { name: 'dispense', key: 'dispense',  color: '#4CAF50',  type: 'binary' },
    { name: 'change',   key: 'change',    color: COL_IO_OUT, type: 'bus' },
    { name: 'load_bal', key: 'load_bal',  color: COL_CTRL,   type: 'binary' }
  ];

  let sigCount = signals.length;
  let sigH = min(26, (botY - topY) / sigCount);
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
    textSize(8);
    textStyle(BOLD);
    text(sig.name, plotX - 6, sy + sigH / 2);

    // Separator line
    stroke('#CFD8DC');
    strokeWeight(0.5);
    line(plotX, sy + sigH, x + w - 6, sy + sigH);
    noStroke();

    for (let e = 0; e < entries; e++) {
      let ex = plotX + e * colW;
      let entry = waveHistory[e];

      if (sig.type === 'clock') {
        // Clock: square wave pulse
        stroke(sig.color);
        strokeWeight(1.5);
        let midX = ex + colW / 2;
        line(ex, baseY, ex, highY);
        line(ex, highY, midX, highY);
        line(midX, highY, midX, baseY);
        line(midX, baseY, ex + colW, baseY);
        noStroke();
      } else if (sig.type === 'bus') {
        // Bus-style with value
        let val = entry[sig.key];
        let prevVal = (e > 0) ? waveHistory[e - 1][sig.key] : null;

        fill(sig.color + '15');
        noStroke();
        rect(ex + 1, highY, colW - 2, baseY - highY, 2);

        // Transition marks (X-crossing)
        if (e > 0 && prevVal !== val) {
          stroke(sig.color);
          strokeWeight(1);
          line(ex, highY, ex + 3, (highY + baseY) / 2);
          line(ex, baseY, ex + 3, (highY + baseY) / 2);
          noStroke();
        }

        // Value label
        fill(sig.color);
        textAlign(CENTER, CENTER);
        textSize(7);
        textStyle(BOLD);

        let displayVal = val;
        if (sig.key === 'state') {
          let abbrev = ['IDL', 'ACC', 'CHK', 'DSP', 'DON'];
          displayVal = colW > 28 ? 'S' + val : abbrev[val];
        } else if (sig.key === 'coin_in') {
          displayVal = val;
        } else {
          displayVal = String(val);
        }

        if (colW > 14) {
          text(displayVal, ex + colW / 2, (highY + baseY) / 2);
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
    text(e + 1, plotX + e * colW + colW / 2, botY - 1);
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
  textSize(9);
  textStyle(BOLD);
  text(label, x + w / 2, y + 10);

  // Value
  fill(active ? '#fff' : '#888');
  textSize(12);
  textStyle(BOLD);
  let valStr = (balance > 0 || currentState > S_IDLE || value !== 0) ? String(value) : '\u2014';
  text(valStr, x + w / 2, y + h - 10);
}

function drawCombBlock(x, y, w, h, label, subtitle, value, active) {
  fill(active ? COL_COMB + '30' : COL_COMB_FILL);
  stroke(active ? COL_COMB : '#BDBDBD');
  strokeWeight(active ? 2.5 : 1.5);
  rect(x, y, w, h, 5);
  noStroke();

  fill(active ? COL_COMB : '#555');
  textAlign(CENTER, CENTER);
  textSize(9);
  textStyle(BOLD);
  text(label, x + w / 2, y + 9);

  fill(active ? COL_COMB : '#999');
  textSize(7);
  textStyle(NORMAL);
  text(subtitle, x + w / 2, y + 19);

  if (value !== '\u2014' || active) {
    fill(active ? '#fff' : '#888');
    textSize(8);
    textStyle(BOLD);
    text(value, x + w / 2, y + h - 7);
  }
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
function queueCoin(val) {
  if (currentState === S_IDLE) {
    pendingCoin = val;
  }
}

function stepClock() {
  // Execute current state's datapath operation
  executeState();

  // Advance to next state
  switch (currentState) {
    case S_IDLE:
      if (pendingCoin !== null) {
        coinValue = pendingCoin;
        lastCoinLabel = coinValue === 5 ? 'N' : coinValue === 10 ? 'D' : 'Q';
        pendingCoin = null;
        currentState = S_ACCEPT;
      }
      break;
    case S_ACCEPT:
      currentState = S_CHECK;
      break;
    case S_CHECK:
      if (compResult) {
        currentState = S_DISPENSE;
      } else {
        currentState = S_IDLE;
      }
      break;
    case S_DISPENSE:
      currentState = S_DONE;
      break;
    case S_DONE:
      doneTimestamp = millis();
      balance = 0;
      dispenseActive = false;
      currentState = S_IDLE;
      break;
  }

  updateControlSignals();
  addWaveEntry();
}

function executeState() {
  switch (currentState) {
    case S_ACCEPT:
      balance = balance + coinValue;
      break;
    case S_CHECK:
      compResult = (balance >= 30);
      break;
    case S_DISPENSE:
      changeAmount = balance - 30;
      lastDispenseChange = changeAmount;
      dispenseActive = true;
      break;
    case S_DONE:
      // Hold display — balance cleared on exit
      break;
  }
}

function updateControlSignals() {
  sig_load_coin = 0;
  sig_add_en    = 0;
  sig_load_bal  = 0;
  sig_cmp_en    = 0;
  sig_disp_en   = 0;
  sig_sub_en    = 0;
  sig_load_chg  = 0;

  switch (currentState) {
    case S_ACCEPT:
      sig_load_coin = 1;
      sig_add_en    = 1;
      sig_load_bal  = 1;
      break;
    case S_CHECK:
      sig_cmp_en = 1;
      break;
    case S_DISPENSE:
      sig_disp_en  = 1;
      sig_sub_en   = 1;
      sig_load_chg = 1;
      break;
  }
}

function addWaveEntry() {
  let coinLabel = '--';
  if (currentState === S_ACCEPT) {
    coinLabel = lastCoinLabel;
  }

  waveHistory.push({
    clk: 1,
    state: currentState,
    coin_in: coinLabel,
    balance: balance,
    cmp_out: compResult ? 1 : 0,
    dispense: dispenseActive ? 1 : 0,
    change: changeAmount,
    load_bal: sig_load_bal
  });

  if (waveHistory.length > maxWaveEntries) {
    waveHistory.shift();
  }
}

function toggleAutoRun() {
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
  balance = 0;
  coinValue = 0;
  pendingCoin = null;
  compResult = false;
  changeAmount = 0;
  lastDispenseChange = 0;
  dispenseActive = false;
  lastCoinLabel = '--';

  sig_load_coin = 0;
  sig_add_en    = 0;
  sig_load_bal  = 0;
  sig_cmp_en    = 0;
  sig_disp_en   = 0;
  sig_sub_en    = 0;
  sig_load_chg  = 0;

  waveHistory = [];
  autoRunning = false;
  updateAutoBtn();
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
