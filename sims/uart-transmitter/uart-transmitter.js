// UART Transmitter — RTL Block Diagram MicroSim
// Controller-Datapath architecture: FSM, shift register, baud generator,
// multi-signal waveform, educational annotations

let containerWidth;
let canvasWidth = 400;
let drawHeight = 760;
let controlHeight = 0;
let canvasHeight = drawHeight + controlHeight;

// ── FSM States ──
const STATE_IDLE  = 0;
const STATE_START = 1;
const STATE_DATA  = 2;
const STATE_STOP  = 3;
const STATE_DONE  = 4;

let stateNames = ["IDLE", "START", "DATA", "STOP", "DONE"];
let currentState = STATE_IDLE;

// ── UART Data ──
let dataBits = [0, 1, 0, 0, 0, 0, 0, 1]; // 'A' = 0x41 (MSB first)
let shiftReg = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]; // 10-bit idle
let bitCount = 0;

// ── Signals ──
let sig_tx_out   = 1;
let sig_tx_busy  = false;
let sig_tx_done  = false;
let sig_tx_start = false;

// ── Waveform ──
let waveHistory = [];
let maxWaveEntries = 14;

// ── Auto-run ──
let autoRunning = false;
let autoTimer = 0;
let autoInterval = 600;
let autoBtn = null;

// ── Done state timer ──
let doneTimestamp = 0;

// ── Click targets ──
let inputBitCells = [];
let presetBtnBounds = [];

// ── Color palette (matches digital lock) ──
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

// FSM highlight colors
const COL_ST_IDLE   = '#2196F3';
const COL_ST_ACTIVE = '#FF9800';
const COL_ST_DONE   = '#4CAF50';
const COL_ST_STOP   = '#FF5722';

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
  stepBtn.textContent = 'Step (Baud Tick)';
  stepBtn.addEventListener('click', function() { stepBaud(); });
  bar.appendChild(stepBtn);

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
  describe('UART transmitter RTL block diagram with FSM, datapath, shift register, and multi-signal waveform', LABEL);

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
    if (currentState === STATE_IDLE) {
      autoRunning = false;
      updateAutoBtn();
    } else if (currentState === STATE_DONE) {
      if (millis() - doneTimestamp > 500) {
        currentState = STATE_IDLE;
        updateOutputs();
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
  if (!autoRunning && currentState === STATE_DONE && millis() - doneTimestamp > 1000) {
    currentState = STATE_IDLE;
    updateOutputs();
    addWaveEntry();
  }

  // ── Zone geometry ──
  var m = 6;
  var W = canvasWidth - 2 * m;
  var titleH  = 22;
  var clkH    = 20;
  var fsmH    = 125;
  var ctrlH   = 16;
  var dpH     = 110;
  var dataH   = 16;
  var ioH     = 130;
  var legendH = 22;
  var wfH     = drawHeight - titleH - clkH - fsmH - ctrlH - dpH - dataH - ioH - legendH - 32;

  var y0 = m;
  var y1 = y0 + titleH;
  var y2 = y1 + clkH;
  var y3 = y2 + fsmH;
  var y4 = y3 + ctrlH;
  var y5 = y4 + dpH;
  var y6 = y5 + dataH;
  var y7 = y6 + ioH;
  var y8 = y7 + wfH;

  drawTitle(m, y0, W);
  drawGlobalSignals(m, y1, W, clkH);
  drawFSM(m, y2, W, fsmH);
  drawControlBus(m, y3, W, ctrlH);
  drawDatapath(m, y4, W, dpH);
  drawDataBus(m, y5, W, dataH);
  drawIO(m, y6, W, ioH);
  drawWaveform(m, y7, W, wfH);
  drawLegend(m, y8, W);

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
  text("UART Transmitter — RTL Block Diagram", x + w / 2, y + 2);
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

  // Dashed distribution lines
  stroke(COL_CLK); strokeWeight(0.7);
  drawingContext.setLineDash([3, 4]);
  var clkX = cx + 9;
  line(clkX, y + h, clkX, y + h + 300);
  var rstX = rx + 6;
  line(rstX, y + h, rstX, y + h + 300);
  drawingContext.setLineDash([]);

  // Legend note
  fill('#888'); noStroke();
  textSize(8); textStyle(ITALIC); textAlign(RIGHT, CENTER);
  text("distributed to all sequential blocks (\u25B7)", x + w - 4, midY);
  textStyle(NORMAL);
}

// ═══════════════════════════════════════════
//  FSM CONTROLLER (Moore machine)
// ═══════════════════════════════════════════
function drawFSM(x, y, w, h) {
  // Panel background
  fill(COL_FSM_BG); stroke(COL_FSM); strokeWeight(1.5);
  rect(x, y, w, h, 4);

  // Label
  fill(COL_FSM); noStroke();
  textSize(10); textStyle(BOLD); textAlign(LEFT, TOP);
  text("FSM Controller  (Moore, sequential)", x + 6, y + 3);
  drawClkTriangle(x + w - 16, y + h - 12, 8, COL_FSM);
  textStyle(NORMAL);

  // ── State diagram layout ──
  // Row 1: IDLE → START → DATA (with self-loop)
  // Row 2:        DONE  ← STOP
  var r = 17;
  var row1Y = y + 42;
  var row2Y = y + 95;

  // Horizontal positions (fractions of panel width)
  var idleCx  = x + w * 0.15;
  var startCx = x + w * 0.42;
  var dataCx  = x + w * 0.72;
  var stopCx  = x + w * 0.68;
  var doneCx  = x + w * 0.38;

  // Row 1 circles
  drawStateCircle(idleCx, row1Y, r, STATE_IDLE);
  drawStateCircle(startCx, row1Y, r, STATE_START);
  drawStateCircle(dataCx, row1Y, r, STATE_DATA);

  // Row 2 circles
  drawStateCircle(stopCx, row2Y, r, STATE_STOP);
  drawStateCircle(doneCx, row2Y, r, STATE_DONE);

  // ── Transition arrows ──

  // IDLE → START
  drawFSMArrow(idleCx + r + 2, row1Y, startCx - r - 2, row1Y, COL_FSM, 1);
  fill('#555'); noStroke(); textSize(7); textAlign(CENTER, BOTTOM);
  text("tx_start", (idleCx + startCx) / 2, row1Y - r - 2);

  // START → DATA
  drawFSMArrow(startCx + r + 2, row1Y, dataCx - r - 2, row1Y, COL_FSM, 1);
  fill('#555'); noStroke(); textSize(7); textAlign(CENTER, BOTTOM);
  text("baud_tick", (startCx + dataCx) / 2, row1Y - r - 2);

  // DATA self-loop (arc above)
  noFill(); stroke(COL_FSM); strokeWeight(1);
  arc(dataCx, row1Y - r - 6, r * 2.2, 16, PI + 0.3, TWO_PI - 0.3);
  // Arrowhead on right side of arc
  var arcRx = dataCx + r * 1.1 * cos(-0.3);
  var arcRy = row1Y - r - 6 + 8 * sin(-0.3);
  fill(COL_FSM); noStroke();
  triangle(arcRx, arcRy, arcRx - 5, arcRy - 4, arcRx - 6, arcRy + 2);
  fill('#555'); noStroke(); textSize(6); textAlign(CENTER, BOTTOM);
  text("baud_tick", dataCx, row1Y - r - 14);
  text("\u2227 cnt<9", dataCx, row1Y - r - 7);

  // DATA → STOP
  drawFSMArrow(dataCx - r * 0.5, row1Y + r + 2, stopCx + r * 0.3, row2Y - r - 2, COL_FSM, 1);
  fill('#555'); noStroke(); textSize(7); textAlign(LEFT, CENTER);
  text("cnt==9", dataCx + 4, (row1Y + row2Y) / 2);

  // STOP → DONE
  drawFSMArrow(stopCx - r - 2, row2Y, doneCx + r + 2, row2Y, COL_FSM, 1);
  fill('#555'); noStroke(); textSize(7); textAlign(CENTER, BOTTOM);
  text("baud_tick", (stopCx + doneCx) / 2, row2Y - r - 2);

  // DONE → IDLE (dashed curved arrow)
  stroke('#999'); strokeWeight(0.8);
  drawingContext.setLineDash([3, 3]);
  noFill();
  bezier(doneCx - r * 0.7, row2Y - r * 0.7,
         doneCx - w * 0.15, row1Y + r * 2,
         idleCx + r * 2, row1Y + r * 2,
         idleCx, row1Y + r);
  drawingContext.setLineDash([]);
  fill('#999'); noStroke(); textSize(6); textAlign(LEFT, CENTER);
  text("auto", idleCx + r + 4, (row1Y + row2Y) / 2 + 8);
}

function drawStateCircle(cx, cy, r, idx) {
  var cur = (currentState === idx);
  var bg;
  if (cur) {
    if (idx === STATE_DONE) bg = COL_ST_DONE;
    else if (idx === STATE_STOP) bg = COL_ST_STOP;
    else if (idx === STATE_IDLE) bg = COL_ST_IDLE;
    else bg = COL_ST_ACTIVE;
  } else {
    bg = '#D1C4E9';
  }
  fill(bg);
  stroke(cur ? '#333' : '#9575CD');
  strokeWeight(cur ? 2.5 : 1);
  ellipse(cx, cy, r * 2, r * 2);

  // Double circle for DONE (accept state)
  if (idx === STATE_DONE) {
    noFill();
    stroke(cur ? '#333' : '#9575CD');
    strokeWeight(cur ? 1.5 : 0.7);
    ellipse(cx, cy, r * 2 - 5, r * 2 - 5);
  }

  fill(cur ? 255 : '#555'); noStroke();
  textSize(7); textAlign(CENTER, CENTER); textStyle(BOLD);
  text(stateNames[idx], cx, cy);
  textStyle(NORMAL);
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
//  CONTROL BUS (FSM → Datapath)
// ═══════════════════════════════════════════
function drawControlBus(x, y, w, h) {
  var midY = y + h / 2;
  var sigs = [
    { name: "load_en",  xf: 0.15 },
    { name: "shift_en", xf: 0.38 },
    { name: "cnt_en",   xf: 0.58 },
    { name: "cnt_rst",  xf: 0.78 }
  ];

  for (var s of sigs) {
    var ax = x + w * s.xf;
    stroke(COL_CTRL); strokeWeight(1.2);
    line(ax, y, ax, y + h);
    fill(COL_CTRL); noStroke();
    triangle(ax, y + h, ax - 3, y + h - 5, ax + 3, y + h - 5);
    textSize(7); textAlign(CENTER, BOTTOM);
    text(s.name, ax, y - 1);
  }

  fill(COL_CTRL); noStroke();
  textSize(7); textStyle(ITALIC); textAlign(RIGHT, CENTER);
  text("control \u2193", x + w, midY);
  textStyle(NORMAL);
}

// ═══════════════════════════════════════════
//  DATAPATH
// ═══════════════════════════════════════════
function drawDatapath(x, y, w, h) {
  // Background
  fill(252, 252, 255); stroke('#CFD8DC'); strokeWeight(1);
  rect(x, y, w, h, 4);

  fill('#37474F'); noStroke();
  textSize(10); textStyle(BOLD); textAlign(LEFT, TOP);
  text("Datapath (left\u2192right data flow)", x + 6, y + 3);
  textStyle(NORMAL);

  // Three blocks
  var bH = 44;
  var bY = y + 18;
  var gap = 6;
  var pad = 8;
  var fracs = [0.22, 0.50, 0.22];
  var usable = w - 2 * pad - gap * (fracs.length - 1);
  var bxs = [], bws = [];
  var bx = x + pad;
  for (var i = 0; i < fracs.length; i++) {
    var bw = usable * fracs[i];
    bxs.push(bx); bws.push(bw);
    bx += bw + gap;
  }

  var blocks = [
    ["Baud Rate\nGenerator", "clk\u00F7divisor", "seq"],
    ["10-bit Shift Register", "parallel load / serial out", "seq"],
    ["Bit\nCounter", "4-bit up", "seq"]
  ];

  for (var i = 0; i < blocks.length; i++) {
    drawHWBlock(bxs[i], bY, bws[i], bH, blocks[i][0], blocks[i][1], blocks[i][2]);
  }

  // Data arrows: Baud Gen → baud_tick → (to other blocks)
  var baudOutX = bxs[0] + bws[0];
  var arY = bY + bH * 0.4;
  stroke(COL_CLK); strokeWeight(1.2);
  line(baudOutX, arY, bxs[1], arY);
  fill(COL_CLK); noStroke();
  triangle(bxs[1], arY, bxs[1] - 5, arY - 2.5, bxs[1] - 5, arY + 2.5);
  textSize(7); textAlign(CENTER, BOTTOM);
  text("baud_tick", (baudOutX + bxs[1]) / 2, arY - 3);

  // Shift Reg → tx_out (output right)
  var srOutX = bxs[1] + bws[1];
  var srOutY = bY + bH * 0.4;
  stroke(COL_DATA); strokeWeight(1.5);
  line(srOutX, srOutY, srOutX + gap / 2 + 6, srOutY);
  fill(COL_DATA); noStroke();
  textSize(7); textAlign(LEFT, BOTTOM);
  text("tx_out", srOutX + gap / 2 + 8, srOutY - 1);

  // Bit Counter → cnt[3:0] (output right)
  var cntOutX = bxs[2] + bws[2];
  var cntOutY = bY + bH * 0.4;
  stroke(COL_DATA); strokeWeight(1.2);
  line(cntOutX, cntOutY, cntOutX + 6, cntOutY);
  fill(COL_DATA); noStroke();
  textSize(7); textAlign(LEFT, BOTTOM);
  text("cnt[3:0]", cntOutX + 8, cntOutY - 1);

  // Feedback arrows to FSM (match → FSM)
  var fbX = x + w - 14;
  stroke(COL_DATA); strokeWeight(1.2);
  line(fbX, bY + bH / 2, fbX, y - 2);
  fill(COL_DATA); noStroke();
  triangle(fbX, y - 2, fbX - 3, y + 3, fbX + 3, y + 3);
  textSize(7); textAlign(RIGHT, CENTER); fill(COL_DATA);
  text("cnt \u2191", fbX - 4, y + (bY + bH / 2 - y) / 2);

  // Connect bit counter output to feedback line
  stroke(COL_DATA); strokeWeight(1.2);
  line(cntOutX + 6, cntOutY, fbX, cntOutY);
  line(fbX, cntOutY, fbX, bY + bH / 2);

  // ── Shift register contents (live display) ──
  var srY = bY + bH + 6;
  var srCellW = Math.min(22, (bws[1] + bws[0] * 0.3) / 10 - 1);
  var srTotalW = 10 * (srCellW + 1) - 1;
  var srStartX = bxs[1] + (bws[1] - srTotalW) / 2;

  var srLabels = ["St", "D0", "D1", "D2", "D3", "D4", "D5", "D6", "D7", "Sp"];

  for (var i = 0; i < 10; i++) {
    var scx = srStartX + i * (srCellW + 1);
    var isActive = (currentState !== STATE_IDLE && currentState !== STATE_DONE && i === 0);
    fill(isActive ? '#FFCC80' : (i === 0 ? '#E3F2FD' : '#F5F5F5'));
    stroke(isActive ? COL_CLK : '#B0BEC5');
    strokeWeight(isActive ? 1.5 : 0.7);
    rect(scx, srY, srCellW, 20, 2);

    fill(isActive ? '#E65100' : '#555'); noStroke();
    textSize(8); textStyle(BOLD); textAlign(CENTER, TOP);
    text(String(shiftReg[i]), scx + srCellW / 2, srY + 1);
    textStyle(NORMAL);
    textSize(5); fill('#999'); textAlign(CENTER, BOTTOM);
    text(srLabels[i], scx + srCellW / 2, srY + 19);
  }

  // Arrow showing tx_out = reg[0]
  if (currentState !== STATE_IDLE) {
    fill(COL_CLK); noStroke();
    textSize(6); textStyle(ITALIC); textAlign(LEFT, CENTER);
    text("tx_out = reg[0]", srStartX, srY + 24);
    textStyle(NORMAL);
  }

  // Live values below the three blocks
  textSize(8); textAlign(CENTER, TOP); textStyle(BOLD);
  var lvY = srY + (currentState !== STATE_IDLE ? 30 : 6);

  fill(COL_SEQ);
  text("9600 baud", bxs[0] + bws[0] / 2, bY + bH + 6);

  fill(COL_SEQ);
  text("cnt=" + bitCount, bxs[2] + bws[2] / 2, bY + bH + 6);
  textStyle(NORMAL);
}

function drawHWBlock(bx, by, bw, bh, label, sub, type) {
  var isSeq = (type === 'seq');
  var borderCol = isSeq ? COL_SEQ : COL_COMB;
  var fillCol = isSeq ? COL_SEQ_FILL : COL_COMB_FILL;

  fill(fillCol); stroke(borderCol); strokeWeight(1.5);
  rect(bx, by, bw, bh, 3);

  if (isSeq) drawClkTriangle(bx + 3, by + bh - 10, 7, borderCol);

  fill(borderCol); noStroke();
  textSize(8); textStyle(BOLD); textAlign(CENTER, CENTER);
  text(label, bx + bw / 2, by + bh / 2 - 4);
  textStyle(NORMAL);

  textSize(6); fill('#888');
  text(sub, bx + bw / 2, by + bh - (isSeq ? 14 : 8));

  textSize(5); fill(borderCol); textStyle(ITALIC); textAlign(RIGHT, TOP);
  text("SEQ", bx + bw - 3, by + 2);
  textStyle(NORMAL);
}

function drawClkTriangle(tx, ty, sz, col) {
  stroke(col); strokeWeight(1); noFill();
  triangle(tx, ty, tx, ty + sz, tx + sz * 0.7, ty + sz / 2);
}

// ═══════════════════════════════════════════
//  DATA BUS (Datapath ↔ I/O)
// ═══════════════════════════════════════════
function drawDataBus(x, y, w, h) {
  var midY = y + h / 2;

  // data_in[7:0]: Input → Datapath (upward)
  var diX = x + w * 0.18;
  stroke(COL_DATA); strokeWeight(1.5);
  line(diX, y + h, diX, y);
  fill(COL_DATA); noStroke();
  triangle(diX, y, diX - 3, y + 5, diX + 3, y + 5);
  textSize(7); textAlign(CENTER, CENTER); fill(COL_DATA);
  text("data_in[7:0] \u2191", diX + 2, midY);

  // tx_start: Input → FSM
  var epX = x + w * 0.40;
  stroke(COL_CTRL); strokeWeight(1);
  drawingContext.setLineDash([3, 3]);
  line(epX, y + h, epX, y);
  drawingContext.setLineDash([]);
  fill(COL_CTRL); noStroke();
  triangle(epX, y, epX - 3, y + 5, epX + 3, y + 5);
  textSize(7); textAlign(CENTER, CENTER); fill(COL_CTRL);
  text("tx_start \u2191", epX, midY);

  // tx_out: Datapath → Output (downward)
  var ddX = x + w * 0.65;
  stroke(COL_DATA); strokeWeight(1.5);
  line(ddX, y, ddX, y + h);
  fill(COL_DATA); noStroke();
  triangle(ddX, y + h, ddX - 3, y + h - 5, ddX + 3, y + h - 5);
  textSize(7); textAlign(CENTER, CENTER); fill(COL_DATA);
  text("tx_out \u2193", ddX, midY);

  // tx_busy, tx_done: FSM → Output
  var lsX = x + w * 0.88;
  stroke(COL_CTRL); strokeWeight(1);
  drawingContext.setLineDash([3, 3]);
  line(lsX, y, lsX, y + h);
  drawingContext.setLineDash([]);
  fill(COL_CTRL); noStroke();
  triangle(lsX, y + h, lsX - 3, y + h - 5, lsX + 3, y + h - 5);
  textSize(7); textAlign(CENTER, CENTER); fill(COL_CTRL);
  text("busy/done \u2193", lsX, midY);
}

// ═══════════════════════════════════════════
//  I/O SECTION
// ═══════════════════════════════════════════
function drawIO(x, y, w, h) {
  var inW = w * 0.48;
  var outW = w * 0.49;
  var gapW = w - inW - outW;

  // ── Input Interface ──
  var inX = x;
  fill('#FFF8E1'); stroke(COL_IO_IN); strokeWeight(1.5);
  rect(inX, y, inW, h, 4);

  fill(COL_IO_IN); noStroke();
  textSize(10); textStyle(BOLD); textAlign(LEFT, TOP);
  text("Input Interface", inX + 6, y + 3);
  textSize(7); textStyle(ITALIC);
  text("Parallel Data + tx_start (COMB)", inX + 6, y + 15);
  textStyle(NORMAL);

  // 8-bit input cells
  var cellW = Math.min(28, (inW - 20) / 8 - 2);
  var cellH = 26;
  var cellGap = 2;
  var totalCellW = 8 * cellW + 7 * cellGap;
  var cellStartX = inX + (inW - totalCellW) / 2;
  var cellY = y + 28;

  // Bit labels
  fill(120); noStroke(); textSize(7); textAlign(CENTER, BOTTOM);
  for (var i = 0; i < 8; i++) {
    var ccx = cellStartX + i * (cellW + cellGap) + cellW / 2;
    text("b" + (7 - i), ccx, cellY - 1);
  }

  // Bit cells
  inputBitCells = [];
  var dis = (currentState !== STATE_IDLE);
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
    noStroke(); textSize(14); textStyle(BOLD); textAlign(CENTER, CENTER);
    text(bit, ccx + cellW / 2, cellY + cellH / 2);
    textStyle(NORMAL);
  }

  // Value display
  var valY = cellY + cellH + 4;
  var byteVal = getByteValue();
  var asciiChar = getAsciiChar();
  fill(80); noStroke(); textSize(8); textAlign(CENTER, TOP);
  text("0x" + byteVal.toString(16).toUpperCase().padStart(2, '0') +
       " | " + byteVal + " | '" + asciiChar + "'", inX + inW / 2, valY);

  // Preset buttons
  var presets = [
    { label: "'A'", bits: [0, 1, 0, 0, 0, 0, 0, 1] },
    { label: "'Z'", bits: [0, 1, 0, 1, 1, 0, 1, 0] },
    { label: "'0'", bits: [0, 0, 1, 1, 0, 0, 0, 0] },
    { label: "0xFF", bits: [1, 1, 1, 1, 1, 1, 1, 1] }
  ];
  var pBtnW = Math.min(36, (inW - 20) / presets.length - 4);
  var pBtnH = 18;
  var pStartX = inX + (inW - (presets.length * pBtnW + (presets.length - 1) * 4)) / 2;
  var pY = valY + 14;

  presetBtnBounds = [];
  for (var i = 0; i < presets.length; i++) {
    var px = pStartX + i * (pBtnW + 4);
    var hov = !dis && isInside(mouseX, mouseY, { x: px, y: pY, w: pBtnW, h: pBtnH });
    presetBtnBounds.push({ x: px, y: pY, w: pBtnW, h: pBtnH, bits: presets[i].bits });

    fill(dis ? '#CCC' : (hov ? '#1565C0' : COL_DATA));
    noStroke(); rect(px, pY, pBtnW, pBtnH, 3);
    fill(255); textSize(9); textStyle(BOLD); textAlign(CENTER, CENTER);
    text(presets[i].label, px + pBtnW / 2, pY + pBtnH / 2);
    textStyle(NORMAL);
  }

  // ── Output Interface ──
  var outX = x + inW + gapW;
  fill('#E8F5E9'); stroke(COL_IO_OUT); strokeWeight(1.5);
  rect(outX, y, outW, h, 4);

  fill(COL_IO_OUT); noStroke();
  textSize(10); textStyle(BOLD); textAlign(LEFT, TOP);
  text("Output Interface", outX + 6, y + 3);
  textSize(7); textStyle(ITALIC);
  text("Serial Line + Status (COMB)", outX + 6, y + 15);
  textStyle(NORMAL);

  // TX line visualization
  var lineY = y + 38;
  var lineW = outW - 20;
  var lineX = outX + 10;

  // Wire
  stroke(sig_tx_out === 1 ? COL_ST_DONE : COL_ST_STOP);
  strokeWeight(3);
  line(lineX, lineY, lineX + lineW, lineY);
  // Level label
  fill(sig_tx_out === 1 ? COL_ST_DONE : COL_ST_STOP); noStroke();
  textSize(12); textStyle(BOLD); textAlign(CENTER, CENTER);
  text("tx_out = " + sig_tx_out + (sig_tx_out === 1 ? " (HIGH/idle)" : " (LOW)"),
       outX + outW / 2, lineY + 16);
  textStyle(NORMAL);

  // Status LEDs
  var ledY = lineY + 36;
  var ledR = 6;

  // tx_busy
  fill(sig_tx_busy ? '#FF9800' : '#E0E0E0');
  stroke(sig_tx_busy ? '#E65100' : '#BDBDBD'); strokeWeight(1);
  ellipse(outX + 24, ledY, ledR * 2, ledR * 2);
  fill(sig_tx_busy ? '#E65100' : '#999'); noStroke();
  textSize(9); textAlign(LEFT, CENTER);
  text("tx_busy = " + (sig_tx_busy ? "1" : "0"), outX + 36, ledY);

  // tx_done
  var ledY2 = ledY + 20;
  fill(sig_tx_done ? COL_ST_DONE : '#E0E0E0');
  stroke(sig_tx_done ? '#2E7D32' : '#BDBDBD'); strokeWeight(1);
  ellipse(outX + 24, ledY2, ledR * 2, ledR * 2);
  fill(sig_tx_done ? '#2E7D32' : '#999'); noStroke();
  textSize(9); textAlign(LEFT, CENTER);
  text("tx_done = " + (sig_tx_done ? "1" : "0"), outX + 36, ledY2);

  // State + bit count info
  var infoY = ledY2 + 22;
  fill('#37474F'); noStroke();
  textSize(10); textStyle(BOLD); textAlign(CENTER, TOP);
  text("State: " + stateNames[currentState], outX + outW / 2, infoY);
  textStyle(NORMAL); textSize(9);
  text("Bit count: " + bitCount + " / 10", outX + outW / 2, infoY + 14);
}

// ═══════════════════════════════════════════
//  MULTI-SIGNAL WAVEFORM
// ═══════════════════════════════════════════
function drawWaveform(x, y, w, h) {
  // Background
  fill(255); stroke('#CFD8DC'); strokeWeight(1);
  rect(x, y, w, h, 4);

  // Title
  fill('#37474F'); noStroke();
  textSize(10); textStyle(BOLD); textAlign(LEFT, TOP);
  text("Multi-Signal Timing Diagram", x + 6, y + 3);
  textSize(7); textStyle(ITALIC); textAlign(RIGHT, TOP);
  fill('#888');
  text("each column = 1 baud period (1/9600 s \u2248 104 \u00B5s)", x + w - 6, y + 3);
  textStyle(NORMAL);

  // Signal definitions
  var signals = [
    { name: "tx_start", key: "tx_start", color: COL_CLK,     type: "bit" },
    { name: "tx_out",   key: "tx_out",   color: COL_DATA,    type: "bit" },
    { name: "tx_busy",  key: "tx_busy",  color: '#FF9800',   type: "bit" },
    { name: "tx_done",  key: "tx_done",  color: COL_ST_DONE, type: "bit" },
    { name: "bit_cnt",  key: "bit_cnt",  color: COL_FSM,     type: "bus" }
  ];

  var labelW = 52;
  var topPad = 18;
  var botPad = 22;
  var sigAreaH = h - topPad - botPad;
  var sigH = sigAreaH / signals.length;
  var traceX = x + labelW;
  var traceW = w - labelW - 6;

  var colW = traceW / maxWaveEntries;
  var hi = 3;  // high level offset from top
  var lo = sigH - 5;  // low level offset from top

  // Draw signal traces
  for (var s = 0; s < signals.length; s++) {
    var sig = signals[s];
    var sigY = y + topPad + s * sigH;

    // Label
    fill(sig.color); noStroke();
    textSize(8); textStyle(BOLD); textAlign(RIGHT, CENTER);
    text(sig.name, traceX - 4, sigY + sigH / 2);
    textStyle(NORMAL);

    // Separator line
    stroke('#EEE'); strokeWeight(0.5);
    line(traceX, sigY + sigH, x + w - 4, sigY + sigH);

    // Grid lines
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
  textSize(6); textAlign(CENTER, TOP);
  for (var i = 0; i < waveHistory.length && i < maxWaveEntries; i++) {
    text(waveHistory[i].label, traceX + (i + 0.5) * colW, labelY);
  }
}

function drawBitTrace(traceX, sigY, colW, sigH, hi, lo, key, col) {
  if (waveHistory.length === 0) return;

  stroke(col); strokeWeight(1.8); noFill();

  for (var i = 0; i < waveHistory.length && i < maxWaveEntries; i++) {
    var val = waveHistory[i][key];
    var x1 = traceX + i * colW;
    var x2 = x1 + colW;
    var yVal = val ? sigY + hi : sigY + lo;

    // Transition from previous
    if (i > 0) {
      var prevVal = waveHistory[i - 1][key];
      if (prevVal !== val) {
        var prevY = prevVal ? sigY + hi : sigY + lo;
        line(x1, prevY, x1, yVal);
      }
    }

    // Horizontal segment
    line(x1, yVal, x2, yVal);
  }

  // Draw 1/0 labels for reference on left edge
  fill('#CCC'); noStroke();
  textSize(5); textAlign(RIGHT, TOP);
  text("1", traceX - 1, sigY + hi - 2);
  textAlign(RIGHT, BOTTOM);
  text("0", traceX - 1, sigY + lo + 2);
}

function drawBusTrace(traceX, sigY, colW, sigH, key, col) {
  if (waveHistory.length === 0) return;

  var hi = 5;
  var lo = sigH - 7;

  for (var i = 0; i < waveHistory.length && i < maxWaveEntries; i++) {
    var val = waveHistory[i][key];
    var x1 = traceX + i * colW;
    var x2 = x1 + colW;
    var changed = (i > 0 && waveHistory[i - 1][key] !== val);

    // Bus waveform: two horizontal lines with crossover on change
    stroke(col); strokeWeight(1.2);

    if (changed) {
      // X crossover
      line(x1, sigY + hi, x1 + 4, sigY + lo);
      line(x1, sigY + lo, x1 + 4, sigY + hi);
      line(x1 + 4, sigY + hi, x2, sigY + hi);
      line(x1 + 4, sigY + lo, x2, sigY + lo);
    } else {
      line(x1, sigY + hi, x2, sigY + hi);
      line(x1, sigY + lo, x2, sigY + lo);
    }

    // Value text
    fill(col); noStroke();
    textSize(8); textStyle(BOLD); textAlign(CENTER, CENTER);
    text(String(val), (x1 + x2) / 2, sigY + (hi + lo) / 2);
    textStyle(NORMAL);
  }
}

// ═══════════════════════════════════════════
//  LEGEND
// ═══════════════════════════════════════════
function drawLegend(x, y, w) {
  var lx = x + 4;
  textSize(7); textAlign(LEFT, CENTER); noStroke();

  // Sequential
  fill(COL_SEQ_FILL); stroke(COL_SEQ); strokeWeight(1.2);
  rect(lx, y, 18, 10, 2);
  drawClkTriangle(lx + 1, y + 2, 5, COL_SEQ);
  fill(COL_SEQ); noStroke();
  text("Sequential", lx + 22, y + 5);

  // Data bus
  var dx = lx + 85;
  stroke(COL_DATA); strokeWeight(2);
  line(dx, y + 5, dx + 18, y + 5);
  fill(COL_DATA); noStroke();
  triangle(dx + 18, y + 5, dx + 14, y + 2, dx + 14, y + 8);
  text("Data bus", dx + 22, y + 5);

  // Control
  var rx = dx + 75;
  stroke(COL_CTRL); strokeWeight(1);
  drawingContext.setLineDash([3, 3]);
  line(rx, y + 5, rx + 18, y + 5);
  drawingContext.setLineDash([]);
  fill(COL_CTRL); noStroke();
  triangle(rx + 18, y + 5, rx + 14, y + 2, rx + 14, y + 8);
  text("Control", rx + 22, y + 5);

  // Frame annotation
  var fx = rx + 70;
  fill('#888');
  textSize(6); textStyle(ITALIC);
  text("Frame: [Start=0] [D0..D7 LSB-first] [Stop=1]", fx, y + 5);
  textStyle(NORMAL);
}

// ═══════════════════════════════════════════
//  FSM LOGIC
// ═══════════════════════════════════════════
function startTransmit() {
  if (currentState !== STATE_IDLE) return;

  // Load shift register: [start=0, D0(LSB), D1, ..., D7(MSB), stop=1]
  shiftReg = [0]; // start bit
  for (var i = 7; i >= 0; i--) {
    shiftReg.push(dataBits[i]); // LSB first
  }
  shiftReg.push(1); // stop bit

  bitCount = 0;
  currentState = STATE_START;
  sig_tx_busy = true;
  sig_tx_start = true;
  sig_tx_out = shiftReg[0]; // start bit = 0

  addWaveEntry();
  sig_tx_start = false; // pulse
}

function stepBaud() {
  if (currentState === STATE_IDLE || currentState === STATE_DONE) return;

  switch (currentState) {
    case STATE_START:
      // Start bit period complete → shift to D0
      shiftRight();
      bitCount = 1;
      currentState = STATE_DATA;
      break;

    case STATE_DATA:
      shiftRight();
      bitCount++;
      if (bitCount >= 9) {
        // All 8 data bits sent, stop bit now at reg[0]
        currentState = STATE_STOP;
      }
      break;

    case STATE_STOP:
      // Stop bit period complete
      bitCount = 10;
      currentState = STATE_DONE;
      doneTimestamp = millis();
      break;
  }

  updateOutputs();
  addWaveEntry();
}

function shiftRight() {
  shiftReg.shift();   // remove reg[0]
  shiftReg.push(1);   // fill MSB with idle (1)
}

function updateOutputs() {
  sig_tx_out  = (currentState === STATE_IDLE || currentState === STATE_DONE) ? 1 : shiftReg[0];
  sig_tx_busy = (currentState !== STATE_IDLE && currentState !== STATE_DONE);
  sig_tx_done = (currentState === STATE_DONE);
}

function addWaveEntry() {
  waveHistory.push({
    tx_out:   sig_tx_out,
    tx_busy:  sig_tx_busy ? 1 : 0,
    tx_done:  sig_tx_done ? 1 : 0,
    tx_start: sig_tx_start ? 1 : 0,
    bit_cnt:  bitCount,
    state:    currentState,
    label:    getEntryLabel()
  });
  if (waveHistory.length > maxWaveEntries) waveHistory.shift();
}

function getEntryLabel() {
  switch (currentState) {
    case STATE_IDLE:  return "Idle";
    case STATE_START: return "Start";
    case STATE_DATA:  return "D" + (bitCount - 1);
    case STATE_STOP:  return "Stop";
    case STATE_DONE:  return "Done";
  }
  return "";
}

function resetSystem() {
  currentState = STATE_IDLE;
  shiftReg = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  bitCount = 0;
  sig_tx_out = 1;
  sig_tx_busy = false;
  sig_tx_done = false;
  sig_tx_start = false;
  autoRunning = false;
  doneTimestamp = 0;
  waveHistory = [];
  updateAutoBtn();
  // Seed with idle entries
  addWaveEntry();
  addWaveEntry();
}

function toggleAutoRun() {
  autoRunning = !autoRunning;
  if (autoRunning) {
    autoTimer = millis();
    if (currentState === STATE_IDLE) {
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

function isInside(mx, my, b) {
  return mx > b.x && mx < b.x + b.w && my > b.y && my < b.y + b.h;
}

// ═══════════════════════════════════════════
//  INPUT HANDLING
// ═══════════════════════════════════════════
function mousePressed() {
  // Input bit cells (only in IDLE)
  if (currentState === STATE_IDLE) {
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
