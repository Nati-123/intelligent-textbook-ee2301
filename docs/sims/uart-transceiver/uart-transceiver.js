// UART Transceiver — RTL Block Diagram MicroSim
// TX + RX with controller-datapath separation, 16x oversampling,
// parity support, baud mismatch visualization, 7-signal waveform

let containerWidth;
let canvasWidth = 400;
let drawHeight = 1450;
let controlHeight = 0;
let canvasHeight = drawHeight + controlHeight;

// ── TX FSM States ──
const TX_IDLE  = 0;
const TX_START = 1;
const TX_DATA  = 2;
const TX_STOP  = 3;
const TX_DONE  = 4;
let txStateNames = ["IDLE", "START", "DATA", "STOP", "DONE"];
let txState = TX_IDLE;

// ── RX FSM States ──
const RX_IDLE   = 0;
const RX_START  = 1;
const RX_DATA   = 2;
const RX_PARITY = 3;
const RX_STOP   = 4;
const RX_DONE   = 5;
let rxStateNames = ["IDLE", "START", "DATA", "PARITY", "STOP", "DONE"];
let rxState = RX_IDLE;

// ── TX Data ──
let dataBits = [0, 1, 0, 0, 0, 0, 0, 1]; // 'A' = 0x41 (MSB first)
let txShiftReg = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]; // 10-bit idle
let txBitCount = 0;
let txFrameLen = 10; // start + 8 data + stop (no parity)

// ── RX Data ──
let rxShiftReg = [0, 0, 0, 0, 0, 0, 0, 0]; // 8-bit received data
let rxBitCount = 0;
let rxOversampleCnt = 0; // 0–15 counter for 16x oversampling
let rxSampledBit = 0;
let rxParityAccum = 0;
let rxReceivedParity = 0;
let rxFrameError = false;
let rxParityError = false;

// ── Signals ──
let sig_tx_out   = 1;
let sig_tx_busy  = false;
let sig_tx_done  = false;
let sig_tx_start = false;
let sig_rx_in    = 1; // connected to tx_out via wire
let sig_rx_sampling = false;
let sig_rx_done  = false;
let sig_rx_error = false;

// ── Parity Mode ──
const PAR_NONE = 0;
const PAR_EVEN = 1;
const PAR_ODD  = 2;
let parityMode = PAR_NONE;
let parityNames = ["None", "Even", "Odd"];

// ── Baud Mismatch ──
let baudMismatchPct = 0; // -5 to +5
let rxBaudAccum = 0; // fractional accumulator for mismatch

// ── Waveform ──
let waveHistory = [];
let maxWaveEntries = 14;

// ── Auto-run ──
let autoRunning = false;
let autoTimer = 0;
let autoInterval = 600;
let autoBtn = null;

// ── Done state timer ──
let txDoneTimestamp = 0;
let rxDoneTimestamp = 0;

// ── Click targets ──
let inputBitCells = [];
let presetBtnBounds = [];

// ── DOM refs ──
let parityBtns = [];
let mismatchSlider = null;
let mismatchLabel = null;

// ── Color palette (matches digital lock / uart-transmitter) ──
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

const COL_RX_FSM_BG = '#E0F7FA';
const COL_RX_FSM    = '#00695C';

// FSM highlight colors
const COL_ST_IDLE   = '#2196F3';
const COL_ST_ACTIVE = '#FF9800';
const COL_ST_DONE   = '#4CAF50';
const COL_ST_STOP   = '#FF5722';
const COL_ST_ERROR  = '#D32F2F';

// ═══════════════════════════════════════════
//  SETUP
// ═══════════════════════════════════════════
function setup() {
  updateCanvasSize();
  var mainEl = document.querySelector('main');

  // DOM control bar
  var bar = document.createElement('div');
  bar.className = 'uart-controls';
  mainEl.appendChild(bar);

  var txBtn = document.createElement('button');
  txBtn.className = 'uart-btn uart-btn--tx';
  txBtn.textContent = 'Transmit';
  txBtn.addEventListener('click', function() { startTransmit(); });
  bar.appendChild(txBtn);

  var stepBtn = document.createElement('button');
  stepBtn.className = 'uart-btn uart-btn--step';
  stepBtn.textContent = 'Step (Baud)';
  stepBtn.addEventListener('click', function() { stepBaud(); });
  bar.appendChild(stepBtn);

  var fineBtn = document.createElement('button');
  fineBtn.className = 'uart-btn uart-btn--fine';
  fineBtn.textContent = 'Fine Step (16x)';
  fineBtn.addEventListener('click', function() { stepFine(); });
  bar.appendChild(fineBtn);

  autoBtn = document.createElement('button');
  autoBtn.className = 'uart-btn uart-btn--auto';
  autoBtn.textContent = 'Auto';
  autoBtn.addEventListener('click', function() { toggleAutoRun(); });
  bar.appendChild(autoBtn);

  var resetBtn = document.createElement('button');
  resetBtn.className = 'uart-btn uart-btn--reset';
  resetBtn.textContent = 'Reset';
  resetBtn.addEventListener('click', function() { resetSystem(); });
  bar.appendChild(resetBtn);

  // Parity selector
  var parDiv = document.createElement('span');
  parDiv.className = 'uart-par-group';
  var parLabel = document.createElement('span');
  parLabel.className = 'uart-par-label';
  parLabel.textContent = 'Parity:';
  parDiv.appendChild(parLabel);

  for (var p = 0; p < 3; p++) {
    (function(idx) {
      var pb = document.createElement('button');
      pb.className = 'uart-btn uart-btn--par' + (idx === parityMode ? ' uart-btn--par-active' : '');
      pb.textContent = parityNames[idx];
      pb.addEventListener('click', function() { setParityMode(idx); });
      parDiv.appendChild(pb);
      parityBtns.push(pb);
    })(p);
  }
  bar.appendChild(parDiv);

  // Baud mismatch slider
  var msDiv = document.createElement('span');
  msDiv.className = 'uart-mismatch-group';
  var msLabel = document.createElement('span');
  msLabel.className = 'uart-mismatch-label';
  msLabel.textContent = 'RX Baud:';
  msDiv.appendChild(msLabel);

  mismatchSlider = document.createElement('input');
  mismatchSlider.type = 'range';
  mismatchSlider.min = -5;
  mismatchSlider.max = 5;
  mismatchSlider.value = 0;
  mismatchSlider.step = 0.5;
  mismatchSlider.className = 'uart-mismatch-slider';
  mismatchSlider.addEventListener('input', function() {
    baudMismatchPct = parseFloat(mismatchSlider.value);
    mismatchValLabel.textContent = (baudMismatchPct >= 0 ? '+' : '') + baudMismatchPct.toFixed(1) + '%';
  });
  msDiv.appendChild(mismatchSlider);

  var mismatchValLabel = document.createElement('span');
  mismatchValLabel.className = 'uart-mismatch-val';
  mismatchValLabel.textContent = '+0.0%';
  msDiv.appendChild(mismatchValLabel);
  mismatchLabel = mismatchValLabel;
  bar.appendChild(msDiv);

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
  describe('UART transceiver RTL block diagram with TX/RX FSMs, 16x oversampling, parity, baud mismatch, and 7-signal waveform', LABEL);

  resetSystem();
}

// ═══════════════════════════════════════════
//  PARITY HELPERS
// ═══════════════════════════════════════════
function setParityMode(mode) {
  if (txState !== TX_IDLE) return;
  parityMode = mode;
  for (var i = 0; i < parityBtns.length; i++) {
    parityBtns[i].className = 'uart-btn uart-btn--par' + (i === mode ? ' uart-btn--par-active' : '');
  }
  txFrameLen = (mode === PAR_NONE) ? 10 : 11;
}

function computeParity(bits) {
  var p = 0;
  for (var i = 0; i < bits.length; i++) p ^= bits[i];
  return (parityMode === PAR_ODD) ? (1 - p) : p;
}

// ═══════════════════════════════════════════
//  DRAW
// ═══════════════════════════════════════════
function draw() {
  updateCanvasSize();
  background(250, 250, 252);

  // Auto-run logic
  if (autoRunning) {
    if (txState === TX_IDLE && rxState === RX_IDLE) {
      autoRunning = false;
      updateAutoBtn();
    } else if (txState === TX_DONE && rxState === RX_DONE) {
      if (millis() - Math.max(txDoneTimestamp, rxDoneTimestamp) > 500) {
        txState = TX_IDLE;
        rxState = RX_IDLE;
        updateTxOutputs();
        updateRxOutputs();
        addWaveEntry();
        autoRunning = false;
        updateAutoBtn();
      }
    } else if (millis() - autoTimer > autoInterval) {
      autoTimer = millis();
      stepBaud();
    }
  }

  // Auto-transition DONE → IDLE (manual mode)
  if (!autoRunning && txState === TX_DONE && millis() - txDoneTimestamp > 1000) {
    txState = TX_IDLE;
    updateTxOutputs();
  }
  if (!autoRunning && rxState === RX_DONE && millis() - rxDoneTimestamp > 1000) {
    rxState = RX_IDLE;
    updateRxOutputs();
    addWaveEntry();
  }

  // ── Zone geometry ──
  var m = 6;
  var W = canvasWidth - 2 * m;

  var titleH   = 20;
  var clkH     = 18;
  var txFsmH   = 100;
  var txCtrlH  = 14;
  var txDpH    = 90;
  var txDataH  = 14;
  var txIoH    = 110;
  var wireH    = 30;
  var rxFsmH   = 100;
  var rxCtrlH  = 14;
  var rxDpH    = 75;
  var rxIoH    = 75;
  var legendH  = 20;
  var totalFixed = titleH + clkH + txFsmH + txCtrlH + txDpH + txDataH + txIoH +
                   wireH + rxFsmH + rxCtrlH + rxDpH + rxIoH + legendH + 28;
  var wfH = drawHeight - totalFixed;
  if (wfH < 100) wfH = 100;

  var y = m;
  var yTitle = y;        y += titleH;
  var yClk = y;          y += clkH;
  var yTxFsm = y;        y += txFsmH;
  var yTxCtrl = y;       y += txCtrlH;
  var yTxDp = y;         y += txDpH;
  var yTxData = y;       y += txDataH;
  var yTxIo = y;         y += txIoH;
  var yWire = y;         y += wireH;
  var yRxFsm = y;        y += rxFsmH;
  var yRxCtrl = y;       y += rxCtrlH;
  var yRxDp = y;         y += rxDpH;
  var yRxIo = y;         y += rxIoH;
  var yWf = y;           y += wfH;
  var yLeg = y;

  drawTitle(m, yTitle, W);
  drawGlobalSignals(m, yClk, W, clkH);
  drawTxFSM(m, yTxFsm, W, txFsmH);
  drawControlBus(m, yTxCtrl, W, txCtrlH, 'tx');
  drawTxDatapath(m, yTxDp, W, txDpH);
  drawDataBus(m, yTxData, W, txDataH, 'tx');
  drawTxIO(m, yTxIo, W, txIoH);
  drawSerialWire(m, yWire, W, wireH);
  drawRxFSM(m, yRxFsm, W, rxFsmH);
  drawControlBus(m, yRxCtrl, W, rxCtrlH, 'rx');
  drawRxDatapath(m, yRxDp, W, rxDpH);
  drawRxIO(m, yRxIo, W, rxIoH);
  drawWaveform(m, yWf, W, wfH);
  drawLegend(m, yLeg, W);

  // Cursor
  var h = false;
  for (var b of inputBitCells) if (isInside(mouseX, mouseY, b)) { h = true; break; }
  if (!h) for (var b of presetBtnBounds) if (isInside(mouseX, mouseY, b)) { h = true; break; }
  cursor(h ? HAND : ARROW);
}

// ═══════════════════════════════════════════
//  TITLE
// ═══════════════════════════════════════════
function drawTitle(x, y, w) {
  fill(30); noStroke();
  textSize(13); textStyle(BOLD); textAlign(CENTER, TOP);
  text("UART Transceiver — RTL Block Diagram", x + w / 2, y + 2);
  textStyle(NORMAL);
}

// ═══════════════════════════════════════════
//  GLOBAL SIGNALS (clk, rst_n)
// ═══════════════════════════════════════════
function drawGlobalSignals(x, y, w, h) {
  var midY = y + h / 2;

  // clk waveform icon
  stroke(COL_CLK); strokeWeight(2);
  var cx = x + 8;
  line(cx, midY + 3, cx + 5, midY + 3);
  line(cx + 5, midY + 3, cx + 5, midY - 3);
  line(cx + 5, midY - 3, cx + 10, midY - 3);
  line(cx + 10, midY - 3, cx + 10, midY + 3);
  line(cx + 10, midY + 3, cx + 15, midY + 3);

  fill(COL_CLK); noStroke();
  textSize(10); textStyle(BOLD); textAlign(LEFT, CENTER);
  text("clk", cx + 18, midY);

  // rst_n
  var rx = x + 60;
  stroke(COL_CLK); strokeWeight(2);
  line(rx, midY, rx + 12, midY);
  noStroke(); fill(COL_CLK);
  text("rst_n", rx + 16, midY);
  stroke(COL_CLK); strokeWeight(1);
  var tw = textWidth("rst");
  line(rx + 16, midY - 7, rx + 16 + tw, midY - 7);

  fill('#888'); noStroke();
  textSize(8); textStyle(ITALIC); textAlign(RIGHT, CENTER);
  text("distributed to all sequential blocks (\u25B7)", x + w - 4, midY);
  textStyle(NORMAL);
}

// ═══════════════════════════════════════════
//  TX FSM CONTROLLER (Moore machine)
// ═══════════════════════════════════════════
function drawTxFSM(x, y, w, h) {
  fill(COL_FSM_BG); stroke(COL_FSM); strokeWeight(1.5);
  rect(x, y, w, h, 4);

  fill(COL_FSM); noStroke();
  textSize(9); textStyle(BOLD); textAlign(LEFT, TOP);
  text("TX FSM Controller  (Moore, sequential)", x + 6, y + 3);
  drawClkTriangle(x + w - 16, y + h - 10, 7, COL_FSM);
  textStyle(NORMAL);

  var r = 14;
  var row1Y = y + 34;
  var row2Y = y + 76;

  var idleCx  = x + w * 0.12;
  var startCx = x + w * 0.32;
  var dataCx  = x + w * 0.55;
  var stopCx  = x + w * 0.55;
  var doneCx  = x + w * 0.32;

  drawTxStateCircle(idleCx, row1Y, r, TX_IDLE);
  drawTxStateCircle(startCx, row1Y, r, TX_START);
  drawTxStateCircle(dataCx, row1Y, r, TX_DATA);
  drawTxStateCircle(stopCx, row2Y, r, TX_STOP);
  drawTxStateCircle(doneCx, row2Y, r, TX_DONE);

  // IDLE → START
  drawFSMArrow(idleCx + r + 2, row1Y, startCx - r - 2, row1Y, COL_FSM, 1);
  fill('#555'); noStroke(); textSize(6); textAlign(CENTER, BOTTOM);
  text("tx_start", (idleCx + startCx) / 2, row1Y - r - 1);

  // START → DATA
  drawFSMArrow(startCx + r + 2, row1Y, dataCx - r - 2, row1Y, COL_FSM, 1);
  fill('#555'); noStroke(); textSize(6); textAlign(CENTER, BOTTOM);
  text("baud_tick", (startCx + dataCx) / 2, row1Y - r - 1);

  // DATA self-loop
  noFill(); stroke(COL_FSM); strokeWeight(1);
  arc(dataCx, row1Y - r - 4, r * 2, 12, PI + 0.3, TWO_PI - 0.3);
  var arcRx = dataCx + r * cos(-0.3);
  var arcRy = row1Y - r - 4 + 6 * sin(-0.3);
  fill(COL_FSM); noStroke();
  triangle(arcRx, arcRy, arcRx - 4, arcRy - 3, arcRx - 5, arcRy + 2);
  fill('#555'); noStroke(); textSize(5); textAlign(CENTER, BOTTOM);
  text("tick \u2227 cnt<N", dataCx, row1Y - r - 11);

  // DATA → STOP
  drawFSMArrow(dataCx, row1Y + r + 2, stopCx, row2Y - r - 2, COL_FSM, 1);
  fill('#555'); noStroke(); textSize(6); textAlign(LEFT, CENTER);
  text("cnt==N", dataCx + 4, (row1Y + row2Y) / 2);

  // STOP → DONE
  drawFSMArrow(stopCx - r - 2, row2Y, doneCx + r + 2, row2Y, COL_FSM, 1);
  fill('#555'); noStroke(); textSize(6); textAlign(CENTER, BOTTOM);
  text("baud_tick", (stopCx + doneCx) / 2, row2Y - r - 1);

  // DONE → IDLE (dashed)
  stroke('#999'); strokeWeight(0.8);
  drawingContext.setLineDash([3, 3]);
  noFill();
  bezier(doneCx - r * 0.7, row2Y - r * 0.7,
         doneCx - w * 0.12, row1Y + r,
         idleCx + r * 2, row1Y + r * 2,
         idleCx, row1Y + r);
  drawingContext.setLineDash([]);
  fill('#999'); noStroke(); textSize(5); textAlign(LEFT, CENTER);
  text("auto", idleCx + r + 2, (row1Y + row2Y) / 2 + 6);

  // Parity indicator
  if (parityMode !== PAR_NONE) {
    fill('#888'); noStroke(); textSize(7); textAlign(RIGHT, TOP);
    text("Parity: " + parityNames[parityMode], x + w - 6, y + 3);
  }
}

function drawTxStateCircle(cx, cy, r, idx) {
  var cur = (txState === idx);
  var bg;
  if (cur) {
    if (idx === TX_DONE) bg = COL_ST_DONE;
    else if (idx === TX_STOP) bg = COL_ST_STOP;
    else if (idx === TX_IDLE) bg = COL_ST_IDLE;
    else bg = COL_ST_ACTIVE;
  } else {
    bg = '#D1C4E9';
  }
  fill(bg); stroke(cur ? '#333' : '#9575CD'); strokeWeight(cur ? 2.5 : 1);
  ellipse(cx, cy, r * 2, r * 2);
  if (idx === TX_DONE) {
    noFill(); stroke(cur ? '#333' : '#9575CD'); strokeWeight(cur ? 1.5 : 0.7);
    ellipse(cx, cy, r * 2 - 5, r * 2 - 5);
  }
  fill(cur ? 255 : '#555'); noStroke();
  textSize(6); textAlign(CENTER, CENTER); textStyle(BOLD);
  text(txStateNames[idx], cx, cy);
  textStyle(NORMAL);
}

// ═══════════════════════════════════════════
//  RX FSM CONTROLLER (Moore machine)
// ═══════════════════════════════════════════
function drawRxFSM(x, y, w, h) {
  fill(COL_RX_FSM_BG); stroke(COL_RX_FSM); strokeWeight(1.5);
  rect(x, y, w, h, 4);

  fill(COL_RX_FSM); noStroke();
  textSize(9); textStyle(BOLD); textAlign(LEFT, TOP);
  text("RX FSM Controller  (Moore, sequential)", x + 6, y + 3);
  drawClkTriangle(x + w - 16, y + h - 10, 7, COL_RX_FSM);
  textStyle(NORMAL);

  var r = 13;
  var row1Y = y + 32;
  var row2Y = y + 74;

  // Top row: IDLE → START → DATA
  var idleCx  = x + w * 0.10;
  var startCx = x + w * 0.28;
  var dataCx  = x + w * 0.48;
  // Bottom row: PARITY ← or → STOP → DONE
  var parCx   = x + w * 0.63;
  var stopCx  = x + w * 0.78;
  var doneCx  = x + w * 0.93;

  drawRxStateCircle(idleCx, row1Y, r, RX_IDLE);
  drawRxStateCircle(startCx, row1Y, r, RX_START);
  drawRxStateCircle(dataCx, row1Y, r, RX_DATA);
  drawRxStateCircle(parCx, row2Y, r, RX_PARITY);
  drawRxStateCircle(stopCx, row2Y, r, RX_STOP);
  drawRxStateCircle(doneCx, row2Y, r, RX_DONE);

  // IDLE → START
  drawFSMArrow(idleCx + r + 2, row1Y, startCx - r - 2, row1Y, COL_RX_FSM, 1);
  fill('#555'); noStroke(); textSize(5); textAlign(CENTER, BOTTOM);
  text("fall edge", (idleCx + startCx) / 2, row1Y - r - 1);

  // START → DATA
  drawFSMArrow(startCx + r + 2, row1Y, dataCx - r - 2, row1Y, COL_RX_FSM, 1);
  fill('#555'); noStroke(); textSize(5); textAlign(CENTER, BOTTOM);
  text("mid-bit", (startCx + dataCx) / 2, row1Y - r - 1);

  // DATA self-loop
  noFill(); stroke(COL_RX_FSM); strokeWeight(1);
  arc(dataCx, row1Y - r - 3, r * 2, 10, PI + 0.3, TWO_PI - 0.3);
  fill(COL_RX_FSM); noStroke();
  var alx = dataCx + r * cos(-0.3);
  var aly = row1Y - r - 3 + 5 * sin(-0.3);
  triangle(alx, aly, alx - 4, aly - 3, alx - 4, aly + 2);
  fill('#555'); noStroke(); textSize(5); textAlign(CENTER, BOTTOM);
  text("sample \u2227 cnt<8", dataCx, row1Y - r - 9);

  // DATA → PARITY (if parity enabled)
  drawFSMArrow(dataCx + r * 0.5, row1Y + r + 2, parCx - r * 0.5, row2Y - r - 2, COL_RX_FSM, 1);
  fill('#555'); noStroke(); textSize(5); textAlign(LEFT, CENTER);
  var dpLabel = (parityMode !== PAR_NONE) ? "cnt==8" : "cnt==8\n(par)";
  text(dpLabel, dataCx + r, (row1Y + row2Y) / 2 - 2);

  // DATA → STOP (skip parity if none)
  if (parityMode === PAR_NONE) {
    stroke('#999'); strokeWeight(0.8);
    drawingContext.setLineDash([3, 3]);
    line(dataCx + r, row1Y + r * 0.5, stopCx, row2Y - r - 2);
    drawingContext.setLineDash([]);
    fill('#999'); noStroke();
    triangle(stopCx, row2Y - r - 2, stopCx - 3, row2Y - r - 7, stopCx + 3, row2Y - r - 7);
    textSize(5); textAlign(RIGHT, CENTER);
    text("no par", stopCx - 2, (row1Y + row2Y) / 2 + 2);
  }

  // PARITY → STOP
  drawFSMArrow(parCx + r + 2, row2Y, stopCx - r - 2, row2Y, COL_RX_FSM, 1);
  fill('#555'); noStroke(); textSize(5); textAlign(CENTER, BOTTOM);
  text("sample", (parCx + stopCx) / 2, row2Y - r - 1);

  // STOP → DONE
  drawFSMArrow(stopCx + r + 2, row2Y, doneCx - r - 2, row2Y, COL_RX_FSM, 1);
  fill('#555'); noStroke(); textSize(5); textAlign(CENTER, BOTTOM);
  text("sample", (stopCx + doneCx) / 2, row2Y - r - 1);

  // DONE → IDLE (dashed)
  stroke('#999'); strokeWeight(0.8);
  drawingContext.setLineDash([3, 3]);
  noFill();
  bezier(doneCx, row2Y + r, doneCx + r, row2Y + r + 10,
         idleCx + r, row2Y + r + 10, idleCx, row2Y);
  drawingContext.setLineDash([]);

  // 16x oversampling note
  fill('#888'); noStroke(); textSize(7); textAlign(RIGHT, TOP);
  text("16x oversample", x + w - 6, y + 3);
}

function drawRxStateCircle(cx, cy, r, idx) {
  var cur = (rxState === idx);
  var bg;
  if (cur) {
    if (idx === RX_DONE) bg = (rxFrameError || rxParityError) ? COL_ST_ERROR : COL_ST_DONE;
    else if (idx === RX_STOP) bg = COL_ST_STOP;
    else if (idx === RX_IDLE) bg = COL_ST_IDLE;
    else bg = COL_ST_ACTIVE;
  } else {
    bg = '#B2DFDB';
  }
  fill(bg); stroke(cur ? '#333' : '#80CBC4'); strokeWeight(cur ? 2.5 : 1);
  ellipse(cx, cy, r * 2, r * 2);
  if (idx === RX_DONE) {
    noFill(); stroke(cur ? '#333' : '#80CBC4'); strokeWeight(cur ? 1.5 : 0.7);
    ellipse(cx, cy, r * 2 - 5, r * 2 - 5);
  }
  // Dim PARITY when not used
  if (idx === RX_PARITY && parityMode === PAR_NONE && !cur) {
    fill('#B2DFDB'); noStroke();
    textSize(6); textAlign(CENTER, CENTER); textStyle(ITALIC);
    text("(skip)", cx, cy);
    textStyle(NORMAL);
    return;
  }
  fill(cur ? 255 : '#444'); noStroke();
  textSize(5); textAlign(CENTER, CENTER); textStyle(BOLD);
  text(rxStateNames[idx], cx, cy);
  textStyle(NORMAL);
}

// ═══════════════════════════════════════════
//  CONTROL BUS
// ═══════════════════════════════════════════
function drawControlBus(x, y, w, h, side) {
  var midY = y + h / 2;
  var col = (side === 'tx') ? COL_CTRL : COL_RX_FSM;
  var sigs = (side === 'tx')
    ? [{ name: "load_en", xf: 0.15 }, { name: "shift_en", xf: 0.38 }, { name: "cnt_en", xf: 0.58 }, { name: "cnt_rst", xf: 0.78 }]
    : [{ name: "sample_en", xf: 0.15 }, { name: "shift_en", xf: 0.35 }, { name: "cnt_rst", xf: 0.55 }, { name: "par_chk", xf: 0.75 }];

  for (var s of sigs) {
    var ax = x + w * s.xf;
    stroke(col); strokeWeight(1);
    line(ax, y, ax, y + h);
    fill(col); noStroke();
    triangle(ax, y + h, ax - 2, y + h - 4, ax + 2, y + h - 4);
    textSize(6); textAlign(CENTER, BOTTOM);
    text(s.name, ax, y - 1);
  }

  fill(col); noStroke();
  textSize(6); textStyle(ITALIC); textAlign(RIGHT, CENTER);
  text(side.toUpperCase() + " control \u2193", x + w, midY);
  textStyle(NORMAL);
}

// ═══════════════════════════════════════════
//  TX DATAPATH
// ═══════════════════════════════════════════
function drawTxDatapath(x, y, w, h) {
  fill(252, 252, 255); stroke('#CFD8DC'); strokeWeight(1);
  rect(x, y, w, h, 4);

  fill('#37474F'); noStroke();
  textSize(9); textStyle(BOLD); textAlign(LEFT, TOP);
  text("TX Datapath", x + 6, y + 3);
  textStyle(NORMAL);

  var bH = 36;
  var bY = y + 16;
  var gap = 5;
  var pad = 6;
  var fracs = [0.22, 0.48, 0.22];
  var usable = w - 2 * pad - gap * (fracs.length - 1);
  var bxs = [], bws = [];
  var bx = x + pad;
  for (var i = 0; i < fracs.length; i++) {
    var bw = usable * fracs[i];
    bxs.push(bx); bws.push(bw);
    bx += bw + gap;
  }

  var blocks = [
    ["Baud Rate\nGenerator", "clk\u00F7div", "seq"],
    ["10-bit Shift Register", "parallel load / serial out", "seq"],
    ["Bit Counter", "4-bit up", "seq"]
  ];

  for (var i = 0; i < blocks.length; i++) {
    drawHWBlock(bxs[i], bY, bws[i], bH, blocks[i][0], blocks[i][1], blocks[i][2]);
  }

  // Baud Gen → Shift Reg
  var baudOutX = bxs[0] + bws[0];
  var arY = bY + bH * 0.4;
  stroke(COL_CLK); strokeWeight(1);
  line(baudOutX, arY, bxs[1], arY);
  fill(COL_CLK); noStroke();
  triangle(bxs[1], arY, bxs[1] - 4, arY - 2, bxs[1] - 4, arY + 2);
  textSize(6); textAlign(CENTER, BOTTOM);
  text("baud_tick", (baudOutX + bxs[1]) / 2, arY - 2);

  // Shift Reg → tx_out
  var srOutX = bxs[1] + bws[1];
  stroke(COL_DATA); strokeWeight(1.2);
  line(srOutX, arY, srOutX + 8, arY);
  fill(COL_DATA); noStroke();
  textSize(6); textAlign(LEFT, BOTTOM);
  text("tx_out", srOutX + 10, arY - 1);

  // Shift register live display
  var srY = bY + bH + 4;
  var srCellW = Math.min(18, (bws[1]) / txShiftReg.length - 1);
  var srTotalW = txShiftReg.length * (srCellW + 1) - 1;
  var srStartX = bxs[1] + (bws[1] - srTotalW) / 2;
  var srLabels = (parityMode === PAR_NONE)
    ? ["St", "D0", "D1", "D2", "D3", "D4", "D5", "D6", "D7", "Sp"]
    : ["St", "D0", "D1", "D2", "D3", "D4", "D5", "D6", "D7", "P", "Sp"];

  for (var i = 0; i < txShiftReg.length; i++) {
    var scx = srStartX + i * (srCellW + 1);
    var isActive = (txState !== TX_IDLE && txState !== TX_DONE && i === 0);
    fill(isActive ? '#FFCC80' : '#F5F5F5');
    stroke(isActive ? COL_CLK : '#B0BEC5');
    strokeWeight(isActive ? 1.5 : 0.7);
    rect(scx, srY, srCellW, 16, 2);
    fill(isActive ? '#E65100' : '#555'); noStroke();
    textSize(7); textStyle(BOLD); textAlign(CENTER, TOP);
    text(String(txShiftReg[i]), scx + srCellW / 2, srY + 1);
    textStyle(NORMAL);
    if (i < srLabels.length) {
      textSize(4); fill('#999'); textAlign(CENTER, BOTTOM);
      text(srLabels[i], scx + srCellW / 2, srY + 15);
    }
  }

  // Bit counter value
  fill(COL_SEQ); noStroke();
  textSize(7); textStyle(BOLD); textAlign(CENTER, TOP);
  text("cnt=" + txBitCount, bxs[2] + bws[2] / 2, bY + bH + 4);
  textStyle(NORMAL);
}

// ═══════════════════════════════════════════
//  RX DATAPATH
// ═══════════════════════════════════════════
function drawRxDatapath(x, y, w, h) {
  fill('#F1F8E9'); stroke('#AED581'); strokeWeight(1);
  rect(x, y, w, h, 4);

  fill('#33691E'); noStroke();
  textSize(9); textStyle(BOLD); textAlign(LEFT, TOP);
  text("RX Datapath", x + 6, y + 3);
  textStyle(NORMAL);

  var bH = 32;
  var bY = y + 16;
  var gap = 4;
  var pad = 6;
  var nBlocks = (parityMode !== PAR_NONE) ? 5 : 4;
  var fracs = (parityMode !== PAR_NONE)
    ? [0.18, 0.20, 0.15, 0.28, 0.14]
    : [0.20, 0.22, 0.18, 0.34];
  var usable = w - 2 * pad - gap * (nBlocks - 1);
  var bxs = [], bws = [];
  var bx = x + pad;
  for (var i = 0; i < nBlocks; i++) {
    var bw = usable * fracs[i];
    bxs.push(bx); bws.push(bw);
    bx += bw + gap;
  }

  var blocks = (parityMode !== PAR_NONE)
    ? [
        ["Edge\nDetector", "fall detect", "comb"],
        ["Oversample\nCounter", "4-bit, 0\u201315", "seq"],
        ["Bit\nSampler", "cnt==7", "comb"],
        ["8-bit Shift Reg", "LSB first", "seq"],
        ["Parity\nChecker", "XOR accum", "comb"]
      ]
    : [
        ["Edge\nDetector", "fall detect", "comb"],
        ["Oversample\nCounter", "4-bit, 0\u201315", "seq"],
        ["Bit Sampler", "cnt==7", "comb"],
        ["8-bit Shift Register", "LSB first", "seq"]
      ];

  for (var i = 0; i < nBlocks; i++) {
    drawHWBlock(bxs[i], bY, bws[i], bH, blocks[i][0], blocks[i][1], blocks[i][2]);
  }

  // Arrows between blocks
  for (var i = 0; i < nBlocks - 1; i++) {
    var ax1 = bxs[i] + bws[i];
    var ax2 = bxs[i + 1];
    var ay = bY + bH * 0.4;
    stroke(COL_DATA); strokeWeight(1);
    line(ax1, ay, ax2, ay);
    fill(COL_DATA); noStroke();
    triangle(ax2, ay, ax2 - 4, ay - 2, ax2 - 4, ay + 2);
  }

  // Oversample counter live value
  fill(COL_SEQ); noStroke();
  textSize(7); textStyle(BOLD); textAlign(CENTER, TOP);
  text("os=" + rxOversampleCnt, bxs[1] + bws[1] / 2, bY + bH + 2);
  textStyle(NORMAL);

  // RX shift register display
  var rxSrY = bY + bH + 2;
  var srIdx = (parityMode !== PAR_NONE) ? 3 : 3;
  if (srIdx < nBlocks) {
    var srCellW = Math.min(16, bws[srIdx] / 8 - 1);
    var srTotal = 8 * (srCellW + 1) - 1;
    var srX = bxs[srIdx] + (bws[srIdx] - srTotal) / 2;
    for (var i = 0; i < 8; i++) {
      var scx = srX + i * (srCellW + 1);
      fill(rxShiftReg[i] ? '#C8E6C9' : '#F5F5F5');
      stroke('#81C784'); strokeWeight(0.7);
      rect(scx, rxSrY, srCellW, 14, 2);
      fill('#333'); noStroke();
      textSize(6); textStyle(BOLD); textAlign(CENTER, CENTER);
      text(String(rxShiftReg[i]), scx + srCellW / 2, rxSrY + 7);
      textStyle(NORMAL);
    }
  }

  // bit count display
  fill('#33691E'); noStroke();
  textSize(7); textStyle(BOLD); textAlign(LEFT, TOP);
  text("bits=" + rxBitCount, bxs[0] + bws[0] / 2 - 8, bY + bH + 2);
  textStyle(NORMAL);
}

// ═══════════════════════════════════════════
//  TX DATA BUS
// ═══════════════════════════════════════════
function drawDataBus(x, y, w, h, side) {
  var midY = y + h / 2;
  var col = (side === 'tx') ? COL_DATA : COL_RX_FSM;

  if (side === 'tx') {
    var diX = x + w * 0.18;
    stroke(col); strokeWeight(1.2);
    line(diX, y + h, diX, y);
    fill(col); noStroke();
    triangle(diX, y, diX - 2, y + 4, diX + 2, y + 4);
    textSize(6); textAlign(CENTER, CENTER);
    text("data_in[7:0] \u2191", diX + 2, midY);

    var ddX = x + w * 0.55;
    stroke(col); strokeWeight(1.2);
    line(ddX, y, ddX, y + h);
    fill(col); noStroke();
    triangle(ddX, y + h, ddX - 2, y + h - 4, ddX + 2, y + h - 4);
    textSize(6); textAlign(CENTER, CENTER);
    text("tx_out \u2193", ddX, midY);

    var lsX = x + w * 0.82;
    stroke(COL_CTRL); strokeWeight(1);
    drawingContext.setLineDash([3, 3]);
    line(lsX, y, lsX, y + h);
    drawingContext.setLineDash([]);
    fill(COL_CTRL); noStroke();
    triangle(lsX, y + h, lsX - 2, y + h - 4, lsX + 2, y + h - 4);
    textSize(6); textAlign(CENTER, CENTER);
    text("busy/done \u2193", lsX, midY);
  }
}

// ═══════════════════════════════════════════
//  TX I/O SECTION
// ═══════════════════════════════════════════
function drawTxIO(x, y, w, h) {
  var inW = w * 0.50;
  var outW = w * 0.48;
  var gapW = w - inW - outW;

  // ── Input Interface ──
  var inX = x;
  fill('#FFF8E1'); stroke(COL_IO_IN); strokeWeight(1.5);
  rect(inX, y, inW, h, 4);

  fill(COL_IO_IN); noStroke();
  textSize(9); textStyle(BOLD); textAlign(LEFT, TOP);
  text("TX Input Interface", inX + 6, y + 3);
  textSize(6); textStyle(ITALIC);
  text("Parallel data + tx_start (COMB)", inX + 6, y + 14);
  textStyle(NORMAL);

  // 8-bit input cells
  var cellW = Math.min(24, (inW - 16) / 8 - 2);
  var cellH = 22;
  var cellGap = 2;
  var totalCellW = 8 * cellW + 7 * cellGap;
  var cellStartX = inX + (inW - totalCellW) / 2;
  var cellY = y + 26;

  fill(120); noStroke(); textSize(6); textAlign(CENTER, BOTTOM);
  for (var i = 0; i < 8; i++) {
    text("b" + (7 - i), cellStartX + i * (cellW + cellGap) + cellW / 2, cellY - 1);
  }

  inputBitCells = [];
  var dis = (txState !== TX_IDLE);
  for (var i = 0; i < 8; i++) {
    var ccx = cellStartX + i * (cellW + cellGap);
    var bit = dataBits[i];
    inputBitCells.push({ x: ccx, y: cellY, w: cellW, h: cellH, index: i });
    var hov = !dis && isInside(mouseX, mouseY, { x: ccx, y: cellY, w: cellW, h: cellH });
    fill(bit === 1 ? COL_DATA : '#FFF');
    stroke(bit === 1 ? '#1565C0' : (dis ? '#DDD' : '#CCC'));
    strokeWeight(hov ? 2 : 1);
    rect(ccx, cellY, cellW, cellH, 3);
    fill(bit === 1 ? 255 : (dis ? '#BBB' : '#666'));
    noStroke(); textSize(12); textStyle(BOLD); textAlign(CENTER, CENTER);
    text(bit, ccx + cellW / 2, cellY + cellH / 2);
    textStyle(NORMAL);
  }

  // Value display
  var valY = cellY + cellH + 3;
  var byteVal = getByteValue();
  var asciiChar = getAsciiChar();
  fill(80); noStroke(); textSize(7); textAlign(CENTER, TOP);
  text("0x" + byteVal.toString(16).toUpperCase().padStart(2, '0') +
       " | " + byteVal + " | '" + asciiChar + "'", inX + inW / 2, valY);

  // Preset buttons
  var presets = [
    { label: "'A'", bits: [0, 1, 0, 0, 0, 0, 0, 1] },
    { label: "'Z'", bits: [0, 1, 0, 1, 1, 0, 1, 0] },
    { label: "'0'", bits: [0, 0, 1, 1, 0, 0, 0, 0] },
    { label: "0xFF", bits: [1, 1, 1, 1, 1, 1, 1, 1] }
  ];
  var pBtnW = Math.min(32, (inW - 16) / presets.length - 3);
  var pBtnH = 16;
  var pStartX = inX + (inW - (presets.length * pBtnW + (presets.length - 1) * 3)) / 2;
  var pY = valY + 12;

  presetBtnBounds = [];
  for (var i = 0; i < presets.length; i++) {
    var px = pStartX + i * (pBtnW + 3);
    var hov = !dis && isInside(mouseX, mouseY, { x: px, y: pY, w: pBtnW, h: pBtnH });
    presetBtnBounds.push({ x: px, y: pY, w: pBtnW, h: pBtnH, bits: presets[i].bits });
    fill(dis ? '#CCC' : (hov ? '#1565C0' : COL_DATA));
    noStroke(); rect(px, pY, pBtnW, pBtnH, 3);
    fill(255); textSize(8); textStyle(BOLD); textAlign(CENTER, CENTER);
    text(presets[i].label, px + pBtnW / 2, pY + pBtnH / 2);
    textStyle(NORMAL);
  }

  // ── Output Interface ──
  var outX = x + inW + gapW;
  fill('#E8F5E9'); stroke(COL_IO_OUT); strokeWeight(1.5);
  rect(outX, y, outW, h, 4);

  fill(COL_IO_OUT); noStroke();
  textSize(9); textStyle(BOLD); textAlign(LEFT, TOP);
  text("TX Output Interface", outX + 6, y + 3);
  textStyle(NORMAL);

  // TX line visualization
  var lineY = y + 26;
  stroke(sig_tx_out === 1 ? COL_ST_DONE : COL_ST_STOP);
  strokeWeight(3);
  line(outX + 10, lineY, outX + outW - 10, lineY);
  fill(sig_tx_out === 1 ? COL_ST_DONE : COL_ST_STOP); noStroke();
  textSize(10); textStyle(BOLD); textAlign(CENTER, CENTER);
  text("tx_out = " + sig_tx_out + (sig_tx_out === 1 ? " (idle)" : " (LOW)"),
       outX + outW / 2, lineY + 14);
  textStyle(NORMAL);

  // Status LEDs
  var ledY = lineY + 30;
  var ledR = 5;

  fill(sig_tx_busy ? '#FF9800' : '#E0E0E0');
  stroke(sig_tx_busy ? '#E65100' : '#BDBDBD'); strokeWeight(1);
  ellipse(outX + 20, ledY, ledR * 2, ledR * 2);
  fill(sig_tx_busy ? '#E65100' : '#999'); noStroke();
  textSize(8); textAlign(LEFT, CENTER);
  text("tx_busy=" + (sig_tx_busy ? "1" : "0"), outX + 30, ledY);

  var ledY2 = ledY + 16;
  fill(sig_tx_done ? COL_ST_DONE : '#E0E0E0');
  stroke(sig_tx_done ? '#2E7D32' : '#BDBDBD'); strokeWeight(1);
  ellipse(outX + 20, ledY2, ledR * 2, ledR * 2);
  fill(sig_tx_done ? '#2E7D32' : '#999'); noStroke();
  textSize(8); textAlign(LEFT, CENTER);
  text("tx_done=" + (sig_tx_done ? "1" : "0"), outX + 30, ledY2);

  // State + bit count
  fill('#37474F'); noStroke();
  textSize(9); textStyle(BOLD); textAlign(CENTER, TOP);
  text(txStateNames[txState] + " | cnt=" + txBitCount + "/" + txFrameLen,
       outX + outW / 2, ledY2 + 16);
  textStyle(NORMAL);
}

// ═══════════════════════════════════════════
//  SERIAL WIRE ZONE
// ═══════════════════════════════════════════
function drawSerialWire(x, y, w, h) {
  var midY = y + h / 2;

  // Background
  fill('#FAFAFA'); stroke('#E0E0E0'); strokeWeight(1);
  rect(x, y, w, h, 4);

  // Wire
  var wireX1 = x + 30;
  var wireX2 = x + w - 30;
  var wireCol = (sig_tx_out === 1) ? COL_ST_DONE : COL_ST_STOP;

  stroke(wireCol); strokeWeight(3);
  line(wireX1, midY, wireX2, midY);

  // Arrowhead
  fill(wireCol); noStroke();
  triangle(wireX2 + 6, midY, wireX2 - 2, midY - 5, wireX2 - 2, midY + 5);

  // Labels
  fill(COL_IO_OUT); noStroke();
  textSize(8); textStyle(BOLD); textAlign(RIGHT, CENTER);
  text("tx_out", wireX1 - 4, midY);

  fill(COL_RX_FSM); textAlign(LEFT, CENTER);
  text("rx_in", wireX2 + 12, midY);
  textStyle(NORMAL);

  // Current level
  fill('#666'); textSize(8); textAlign(CENTER, TOP);
  text("Serial Wire: " + (sig_tx_out === 1 ? "HIGH (idle)" : "LOW (active)"), x + w / 2, midY + 6);

  // Animated pulse dot
  if (txState !== TX_IDLE && txState !== TX_DONE) {
    var dotPhase = (millis() % 1000) / 1000;
    var dotX = wireX1 + dotPhase * (wireX2 - wireX1);
    fill(wireCol); noStroke();
    ellipse(dotX, midY, 8, 8);
  }

  // Baud mismatch indicator
  if (baudMismatchPct !== 0) {
    fill('#FF5722'); textSize(7); textStyle(BOLD); textAlign(CENTER, BOTTOM);
    text("RX clock offset: " + (baudMismatchPct >= 0 ? "+" : "") +
         baudMismatchPct.toFixed(1) + "%", x + w / 2, y + 8);
    textStyle(NORMAL);
  }
}

// ═══════════════════════════════════════════
//  RX I/O SECTION
// ═══════════════════════════════════════════
function drawRxIO(x, y, w, h) {
  fill('#E0F2F1'); stroke(COL_RX_FSM); strokeWeight(1.5);
  rect(x, y, w, h, 4);

  fill(COL_RX_FSM); noStroke();
  textSize(9); textStyle(BOLD); textAlign(LEFT, TOP);
  text("RX Output Interface", x + 6, y + 3);
  textStyle(NORMAL);

  // Received data display
  var dataX = x + 10;
  var dataY = y + 18;
  var cellW = 20;
  var rxVal = getRxByteValue();
  var rxAscii = getRxAsciiChar();

  for (var i = 0; i < 8; i++) {
    fill(rxShiftReg[i] ? '#C8E6C9' : '#F5F5F5');
    stroke('#81C784'); strokeWeight(0.7);
    rect(dataX + i * (cellW + 1), dataY, cellW, 18, 2);
    fill('#333'); noStroke();
    textSize(9); textStyle(BOLD); textAlign(CENTER, CENTER);
    text(String(rxShiftReg[i]), dataX + i * (cellW + 1) + cellW / 2, dataY + 9);
    textStyle(NORMAL);
  }

  // Value
  var vx = dataX + 8 * (cellW + 1) + 8;
  fill('#333'); noStroke();
  textSize(10); textStyle(BOLD); textAlign(LEFT, CENTER);
  text("= 0x" + rxVal.toString(16).toUpperCase().padStart(2, '0') +
       " (" + rxVal + ") '" + rxAscii + "'", vx, dataY + 9);
  textStyle(NORMAL);

  // Status LEDs
  var ledX = x + w * 0.65;
  var ledY = dataY + 2;
  var ledR = 5;

  // rx_done
  fill(sig_rx_done ? COL_ST_DONE : '#E0E0E0');
  stroke(sig_rx_done ? '#2E7D32' : '#BDBDBD'); strokeWeight(1);
  ellipse(ledX, ledY, ledR * 2, ledR * 2);
  fill(sig_rx_done ? '#2E7D32' : '#999'); noStroke();
  textSize(8); textAlign(LEFT, CENTER);
  text("rx_done=" + (sig_rx_done ? "1" : "0"), ledX + 10, ledY);

  // rx_error
  var ledY2 = ledY + 14;
  fill(sig_rx_error ? COL_ST_ERROR : '#E0E0E0');
  stroke(sig_rx_error ? '#B71C1C' : '#BDBDBD'); strokeWeight(1);
  ellipse(ledX, ledY2, ledR * 2, ledR * 2);
  fill(sig_rx_error ? '#B71C1C' : '#999'); noStroke();
  textSize(8); textAlign(LEFT, CENTER);
  var errText = "rx_error=" + (sig_rx_error ? "1" : "0");
  if (sig_rx_error) {
    errText += (rxFrameError ? " [frame]" : "") + (rxParityError ? " [parity]" : "");
  }
  text(errText, ledX + 10, ledY2);

  // State info
  fill(COL_RX_FSM); noStroke();
  textSize(8); textStyle(BOLD); textAlign(RIGHT, BOTTOM);
  text(rxStateNames[rxState] + " | bits=" + rxBitCount + " | os=" + rxOversampleCnt,
       x + w - 6, y + h - 3);
  textStyle(NORMAL);

  // Sampling indicator
  if (sig_rx_sampling) {
    fill('#FF9800'); noStroke();
    textSize(8); textStyle(BOLD); textAlign(CENTER, BOTTOM);
    text("\u25CF SAMPLING", dataX + 4 * (cellW + 1), dataY - 2);
    textStyle(NORMAL);
  }
}

// ═══════════════════════════════════════════
//  MULTI-SIGNAL WAVEFORM
// ═══════════════════════════════════════════
function drawWaveform(x, y, w, h) {
  fill(255); stroke('#CFD8DC'); strokeWeight(1);
  rect(x, y, w, h, 4);

  fill('#37474F'); noStroke();
  textSize(9); textStyle(BOLD); textAlign(LEFT, TOP);
  text("7-Signal Timing Diagram", x + 6, y + 3);
  textSize(6); textStyle(ITALIC); textAlign(RIGHT, TOP);
  fill('#888');
  text("each column = 1 baud period", x + w - 6, y + 3);
  textStyle(NORMAL);

  var signals = [
    { name: "tx_start",    key: "tx_start",    color: COL_CLK,      type: "bit" },
    { name: "tx_out/rx_in",key: "tx_out",      color: COL_DATA,     type: "bit" },
    { name: "tx_busy",     key: "tx_busy",     color: '#FF9800',    type: "bit" },
    { name: "rx_sampling", key: "rx_sampling",  color: COL_RX_FSM,  type: "bit" },
    { name: "rx_data",     key: "rx_data",     color: '#33691E',    type: "bus" },
    { name: "rx_done",     key: "rx_done",     color: COL_ST_DONE,  type: "bit" },
    { name: "rx_error",    key: "rx_error",    color: COL_ST_ERROR, type: "bit" }
  ];

  var labelW = 62;
  var topPad = 16;
  var botPad = 18;
  var sigAreaH = h - topPad - botPad;
  var sigH = sigAreaH / signals.length;
  var traceX = x + labelW;
  var traceW = w - labelW - 6;
  var colW = traceW / maxWaveEntries;
  var hi = 3;
  var lo = sigH - 4;

  for (var s = 0; s < signals.length; s++) {
    var sig = signals[s];
    var sigY = y + topPad + s * sigH;

    fill(sig.color); noStroke();
    textSize(7); textStyle(BOLD); textAlign(RIGHT, CENTER);
    text(sig.name, traceX - 4, sigY + sigH / 2);
    textStyle(NORMAL);

    stroke('#EEE'); strokeWeight(0.5);
    line(traceX, sigY + sigH, x + w - 4, sigY + sigH);

    stroke('#F0F0F0'); strokeWeight(0.3);
    for (var g = 0; g <= maxWaveEntries; g++) {
      line(traceX + g * colW, sigY, traceX + g * colW, sigY + sigH);
    }

    if (sig.type === 'bit') {
      drawBitTrace(traceX, sigY, colW, sigH, hi, lo, sig.key, sig.color);
    } else {
      drawBusTrace(traceX, sigY, colW, sigH, sig.key, sig.color);
    }
  }

  // Bit period labels at bottom
  var labelY = y + topPad + sigAreaH + 2;
  fill('#888'); noStroke();
  textSize(5); textAlign(CENTER, TOP);
  for (var i = 0; i < waveHistory.length && i < maxWaveEntries; i++) {
    text(waveHistory[i].label, traceX + (i + 0.5) * colW, labelY);
  }
}

function drawBitTrace(traceX, sigY, colW, sigH, hi, lo, key, col) {
  if (waveHistory.length === 0) return;
  stroke(col); strokeWeight(1.5); noFill();

  for (var i = 0; i < waveHistory.length && i < maxWaveEntries; i++) {
    var val = waveHistory[i][key];
    var x1 = traceX + i * colW;
    var x2 = x1 + colW;
    var yVal = val ? sigY + hi : sigY + lo;

    if (i > 0) {
      var prevVal = waveHistory[i - 1][key];
      if (prevVal !== val) {
        var prevY = prevVal ? sigY + hi : sigY + lo;
        line(x1, prevY, x1, yVal);
      }
    }
    line(x1, yVal, x2, yVal);

    // Mid-bit sample tick for rx_sampling
    if (key === 'rx_sampling' && val) {
      stroke('#FF5722'); strokeWeight(1);
      line(x1 + colW / 2, sigY + hi - 2, x1 + colW / 2, sigY + lo + 2);
      stroke(col); strokeWeight(1.5);
    }
  }
}

function drawBusTrace(traceX, sigY, colW, sigH, key, col) {
  if (waveHistory.length === 0) return;
  var hi = 4;
  var lo = sigH - 5;

  for (var i = 0; i < waveHistory.length && i < maxWaveEntries; i++) {
    var val = waveHistory[i][key];
    var x1 = traceX + i * colW;
    var x2 = x1 + colW;
    var changed = (i > 0 && waveHistory[i - 1][key] !== val);

    stroke(col); strokeWeight(1);
    if (changed) {
      line(x1, sigY + hi, x1 + 3, sigY + lo);
      line(x1, sigY + lo, x1 + 3, sigY + hi);
      line(x1 + 3, sigY + hi, x2, sigY + hi);
      line(x1 + 3, sigY + lo, x2, sigY + lo);
    } else {
      line(x1, sigY + hi, x2, sigY + hi);
      line(x1, sigY + lo, x2, sigY + lo);
    }

    fill(col); noStroke();
    textSize(7); textStyle(BOLD); textAlign(CENTER, CENTER);
    var dispVal = (typeof val === 'number') ? "0x" + val.toString(16).toUpperCase().padStart(2, '0') : String(val);
    text(dispVal, (x1 + x2) / 2, sigY + (hi + lo) / 2);
    textStyle(NORMAL);
  }
}

// ═══════════════════════════════════════════
//  LEGEND
// ═══════════════════════════════════════════
function drawLegend(x, y, w) {
  var lx = x + 4;
  textSize(6); textAlign(LEFT, CENTER); noStroke();

  fill(COL_SEQ_FILL); stroke(COL_SEQ); strokeWeight(1);
  rect(lx, y, 16, 10, 2);
  drawClkTriangle(lx + 1, y + 2, 5, COL_SEQ);
  fill(COL_SEQ); noStroke();
  text("Sequential", lx + 20, y + 5);

  var cx = lx + 72;
  fill(COL_COMB_FILL); stroke(COL_COMB); strokeWeight(1);
  rect(cx, y, 16, 10, 2);
  fill(COL_COMB); noStroke();
  text("Combinational", cx + 20, y + 5);

  var dx = cx + 82;
  stroke(COL_DATA); strokeWeight(2);
  line(dx, y + 5, dx + 14, y + 5);
  fill(COL_DATA); noStroke();
  triangle(dx + 14, y + 5, dx + 10, y + 2, dx + 10, y + 8);
  text("Data", dx + 18, y + 5);

  var rx = dx + 46;
  stroke(COL_CTRL); strokeWeight(1);
  drawingContext.setLineDash([3, 3]);
  line(rx, y + 5, rx + 14, y + 5);
  drawingContext.setLineDash([]);
  fill(COL_CTRL); noStroke();
  text("Control", rx + 18, y + 5);

  var fx = rx + 52;
  fill('#888'); textSize(5); textStyle(ITALIC);
  var parText = (parityMode === PAR_NONE)
    ? "Frame: [Start=0][D0..D7][Stop=1]"
    : "Frame: [Start=0][D0..D7][" + parityNames[parityMode] + " parity][Stop=1]";
  text(parText, fx, y + 5);
  textStyle(NORMAL);
}

// ═══════════════════════════════════════════
//  SHARED DRAWING HELPERS
// ═══════════════════════════════════════════
function drawHWBlock(bx, by, bw, bh, label, sub, type) {
  var isSeq = (type === 'seq');
  var borderCol = isSeq ? COL_SEQ : COL_COMB;
  var fillCol = isSeq ? COL_SEQ_FILL : COL_COMB_FILL;

  fill(fillCol); stroke(borderCol); strokeWeight(1.5);
  rect(bx, by, bw, bh, 3);
  if (isSeq) drawClkTriangle(bx + 3, by + bh - 8, 6, borderCol);

  fill(borderCol); noStroke();
  textSize(7); textStyle(BOLD); textAlign(CENTER, CENTER);
  text(label, bx + bw / 2, by + bh / 2 - 3);
  textStyle(NORMAL);

  textSize(5); fill('#888');
  text(sub, bx + bw / 2, by + bh - (isSeq ? 12 : 7));

  textSize(4); fill(borderCol); textStyle(ITALIC); textAlign(RIGHT, TOP);
  text(isSeq ? "SEQ" : "COMB", bx + bw - 2, by + 1);
  textStyle(NORMAL);
}

function drawClkTriangle(tx, ty, sz, col) {
  stroke(col); strokeWeight(1); noFill();
  triangle(tx, ty, tx, ty + sz, tx + sz * 0.7, ty + sz / 2);
}

function drawFSMArrow(x1, y1, x2, y2, col, sw) {
  stroke(col); strokeWeight(sw);
  drawingContext.setLineDash([]);
  line(x1, y1, x2, y2);
  var a = atan2(y2 - y1, x2 - x1);
  fill(col); noStroke();
  push(); translate(x2, y2); rotate(a);
  triangle(0, 0, -5, -2.5, -5, 2.5);
  pop();
}

// ═══════════════════════════════════════════
//  TX FSM LOGIC
// ═══════════════════════════════════════════
function startTransmit() {
  if (txState !== TX_IDLE) return;

  // Build TX frame: [start=0, D0(LSB), D1, ..., D7(MSB), (parity), stop=1]
  txShiftReg = [0]; // start bit
  var parBits = [];
  for (var i = 7; i >= 0; i--) {
    txShiftReg.push(dataBits[i]); // LSB first
    parBits.push(dataBits[i]);
  }
  if (parityMode !== PAR_NONE) {
    txShiftReg.push(computeParity(parBits));
  }
  txShiftReg.push(1); // stop bit
  txFrameLen = txShiftReg.length;

  txBitCount = 0;
  txState = TX_START;
  sig_tx_busy = true;
  sig_tx_start = true;
  sig_tx_out = txShiftReg[0]; // start bit = 0
  sig_rx_in = sig_tx_out;

  // Start RX reception
  rxStartReception();

  addWaveEntry();
  sig_tx_start = false;
}

function stepBaud() {
  if (txState === TX_IDLE && rxState === RX_IDLE) return;

  // TX side step
  if (txState !== TX_IDLE && txState !== TX_DONE) {
    txStepOneBaud();
  }

  // RX side: advance 16 oversample ticks (1 full baud period)
  if (rxState !== RX_IDLE && rxState !== RX_DONE) {
    rxStepOneBaud();
  }

  addWaveEntry();
}

function stepFine() {
  // Advance RX by 1 oversample tick (1/16 baud)
  if (rxState === RX_IDLE || rxState === RX_DONE) return;
  rxStepOneOversample();
  // Don't add wave entry on fine step — too granular
}

function txStepOneBaud() {
  switch (txState) {
    case TX_START:
      txShiftRight();
      txBitCount = 1;
      txState = TX_DATA;
      break;
    case TX_DATA:
      txShiftRight();
      txBitCount++;
      if (txBitCount >= txFrameLen - 1) {
        txState = TX_STOP;
      }
      break;
    case TX_STOP:
      txBitCount = txFrameLen;
      txState = TX_DONE;
      txDoneTimestamp = millis();
      break;
  }
  updateTxOutputs();
}

function txShiftRight() {
  txShiftReg.shift();
  txShiftReg.push(1);
}

function updateTxOutputs() {
  sig_tx_out  = (txState === TX_IDLE || txState === TX_DONE) ? 1 : txShiftReg[0];
  sig_tx_busy = (txState !== TX_IDLE && txState !== TX_DONE);
  sig_tx_done = (txState === TX_DONE);
  sig_rx_in   = sig_tx_out;
}

// ═══════════════════════════════════════════
//  RX FSM LOGIC — 16x Oversampling
// ═══════════════════════════════════════════
function rxStartReception() {
  rxState = RX_START;
  rxShiftReg = [0, 0, 0, 0, 0, 0, 0, 0];
  rxBitCount = 0;
  rxOversampleCnt = 0;
  rxParityAccum = 0;
  rxReceivedParity = 0;
  rxFrameError = false;
  rxParityError = false;
  sig_rx_done = false;
  sig_rx_error = false;
  sig_rx_sampling = false;
  rxBaudAccum = 0;
}

function rxStepOneBaud() {
  // Simulate 16 oversample ticks at once for baud-level stepping
  for (var t = 0; t < 16; t++) {
    rxStepOneOversample();
    if (rxState === RX_DONE || rxState === RX_IDLE) break;
  }
}

function rxStepOneOversample() {
  if (rxState === RX_IDLE || rxState === RX_DONE) return;

  sig_rx_sampling = false;

  // Apply baud mismatch: the RX counter may advance faster or slower
  var ticksToAdvance = 1;
  if (baudMismatchPct !== 0) {
    rxBaudAccum += baudMismatchPct / 100.0;
    if (rxBaudAccum >= 1.0) {
      ticksToAdvance = 2; // RX clock is faster
      rxBaudAccum -= 1.0;
    } else if (rxBaudAccum <= -1.0) {
      ticksToAdvance = 0; // RX clock is slower, skip this tick
      rxBaudAccum += 1.0;
    }
  }

  for (var adv = 0; adv < ticksToAdvance; adv++) {
    rxOversampleCnt++;

    // Mid-bit sampling at count == 8 (center of 16 samples)
    if (rxOversampleCnt === 8) {
      sig_rx_sampling = true;
      rxSampledBit = sig_rx_in;
      rxProcessSample();
    }

    if (rxOversampleCnt >= 16) {
      rxOversampleCnt = 0;
    }
  }
}

function rxProcessSample() {
  switch (rxState) {
    case RX_START:
      // Verify start bit is still 0
      if (rxSampledBit !== 0) {
        // False start — return to idle
        rxState = RX_IDLE;
        return;
      }
      rxState = RX_DATA;
      rxBitCount = 0;
      rxOversampleCnt = 0;
      break;

    case RX_DATA:
      // Shift in sampled bit (LSB first)
      for (var i = 7; i > 0; i--) rxShiftReg[i] = rxShiftReg[i - 1];
      rxShiftReg[0] = rxSampledBit;
      rxParityAccum ^= rxSampledBit;
      rxBitCount++;
      rxOversampleCnt = 0;

      if (rxBitCount >= 8) {
        if (parityMode !== PAR_NONE) {
          rxState = RX_PARITY;
        } else {
          rxState = RX_STOP;
        }
      }
      break;

    case RX_PARITY:
      rxReceivedParity = rxSampledBit;
      rxOversampleCnt = 0;
      rxState = RX_STOP;
      break;

    case RX_STOP:
      // Check stop bit (should be 1)
      if (rxSampledBit !== 1) {
        rxFrameError = true;
      }
      // Check parity if enabled
      if (parityMode !== PAR_NONE) {
        var expectedParity = (parityMode === PAR_ODD)
          ? (1 - (rxParityAccum % 2))
          : (rxParityAccum % 2);
        // Re-compute: parity accum already has the XOR of data bits
        // For even parity: data_xor should equal the parity bit
        // For odd parity: data_xor ^ 1 should equal the parity bit
        if (parityMode === PAR_EVEN && rxReceivedParity !== rxParityAccum) {
          rxParityError = true;
        } else if (parityMode === PAR_ODD && rxReceivedParity !== (1 - rxParityAccum)) {
          rxParityError = true;
        }
      }
      sig_rx_error = rxFrameError || rxParityError;
      sig_rx_done = true;
      rxState = RX_DONE;
      rxDoneTimestamp = millis();
      rxOversampleCnt = 0;
      break;
  }
}

function updateRxOutputs() {
  if (rxState === RX_IDLE) {
    sig_rx_done = false;
    sig_rx_error = false;
    sig_rx_sampling = false;
    rxFrameError = false;
    rxParityError = false;
  }
}

// ═══════════════════════════════════════════
//  WAVEFORM ENTRY
// ═══════════════════════════════════════════
function addWaveEntry() {
  waveHistory.push({
    tx_out:      sig_tx_out,
    tx_busy:     sig_tx_busy ? 1 : 0,
    tx_done:     sig_tx_done ? 1 : 0,
    tx_start:    sig_tx_start ? 1 : 0,
    rx_sampling: sig_rx_sampling ? 1 : 0,
    rx_data:     getRxByteValue(),
    rx_done:     sig_rx_done ? 1 : 0,
    rx_error:    sig_rx_error ? 1 : 0,
    label:       getTxEntryLabel()
  });
  if (waveHistory.length > maxWaveEntries) waveHistory.shift();
}

function getTxEntryLabel() {
  switch (txState) {
    case TX_IDLE:  return "Idle";
    case TX_START: return "Start";
    case TX_DATA:  return "D" + (txBitCount - 1);
    case TX_STOP:  return "Stop";
    case TX_DONE:  return "Done";
  }
  return "";
}

// ═══════════════════════════════════════════
//  SYSTEM CONTROL
// ═══════════════════════════════════════════
function resetSystem() {
  txState = TX_IDLE;
  txShiftReg = (parityMode === PAR_NONE)
    ? [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    : [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  txBitCount = 0;
  sig_tx_out = 1;
  sig_tx_busy = false;
  sig_tx_done = false;
  sig_tx_start = false;
  sig_rx_in = 1;

  rxState = RX_IDLE;
  rxShiftReg = [0, 0, 0, 0, 0, 0, 0, 0];
  rxBitCount = 0;
  rxOversampleCnt = 0;
  rxBaudAccum = 0;
  rxParityAccum = 0;
  rxFrameError = false;
  rxParityError = false;
  sig_rx_sampling = false;
  sig_rx_done = false;
  sig_rx_error = false;

  autoRunning = false;
  txDoneTimestamp = 0;
  rxDoneTimestamp = 0;
  waveHistory = [];
  updateAutoBtn();

  addWaveEntry();
  addWaveEntry();
}

function toggleAutoRun() {
  autoRunning = !autoRunning;
  if (autoRunning) {
    autoTimer = millis();
    if (txState === TX_IDLE) {
      startTransmit();
    }
  }
  updateAutoBtn();
}

function updateAutoBtn() {
  if (autoBtn) {
    autoBtn.textContent = autoRunning ? 'Stop Auto' : 'Auto';
    autoBtn.style.background = autoRunning ? '#E65100' : '#FF9800';
  }
}

// ═══════════════════════════════════════════
//  HELPERS
// ═══════════════════════════════════════════
function getByteValue() {
  var val = 0;
  for (var i = 0; i < 8; i++) val = (val << 1) | dataBits[i];
  return val;
}

function getAsciiChar() {
  var val = getByteValue();
  if (val >= 32 && val <= 126) return String.fromCharCode(val);
  return '?';
}

function getRxByteValue() {
  // rxShiftReg is LSB first, index 0 = MSB after shifting
  var val = 0;
  for (var i = 0; i < 8; i++) val = (val << 1) | rxShiftReg[7 - i];
  return val;
}

function getRxAsciiChar() {
  var val = getRxByteValue();
  if (val >= 32 && val <= 126) return String.fromCharCode(val);
  return '?';
}

function isInside(mx, my, b) {
  return mx > b.x && mx < b.x + b.w && my > b.y && my < b.y + b.h;
}

// ═══════════════════════════════════════════
//  INPUT HANDLING
// ═══════════════════════════════════════════
function mousePressed() {
  if (txState === TX_IDLE) {
    for (var c of inputBitCells) {
      if (isInside(mouseX, mouseY, c)) {
        dataBits[c.index] = 1 - dataBits[c.index];
        return;
      }
    }
    for (var b of presetBtnBounds) {
      if (isInside(mouseX, mouseY, b)) {
        dataBits = b.bits.slice();
        return;
      }
    }
  }
}

function windowResized() { updateCanvasSize(); resizeCanvas(containerWidth, canvasHeight); }

function updateCanvasSize() {
  var c = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(c.width);
  canvasWidth = containerWidth;
}
