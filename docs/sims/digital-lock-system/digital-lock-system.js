// Digital Lock System — RTL Block Diagram MicroSim
// Hardware-design-level architecture: sequential vs combinational,
// global clk/rst, labeled data & control buses, FSM transition conditions

let containerWidth;
let canvasWidth = 400;
let drawHeight = 710;
let controlHeight = 0;
let canvasHeight = drawHeight + controlHeight;

// ── FSM states ──
const STATE_IDLE = 0;
const STATE_DIGIT_1 = 1;
const STATE_DIGIT_2 = 2;
const STATE_DIGIT_3 = 3;
const STATE_DIGIT_4 = 4;
const STATE_CHECK = 5;
const STATE_UNLOCKED = 6;
const STATE_LOCKED_OUT = 7;

let stateNames = [
  "IDLE", "DIGIT_1", "DIGIT_2", "DIGIT_3",
  "DIGIT_4", "CHECK", "UNLOCKED", "LOCKED_OUT"
];
let currentState = STATE_IDLE;

// Correct code & input tracking
let correctCode = [1, 2, 3, 4];
let enteredDigits = [];
let failedAttempts = 0;
let maxAttempts = 3;

// Lockout timer
let lockoutTimer = 0;
let lockoutDuration = 10;
let lockoutStartTime = 0;

// Status
let statusMessage = "Enter 4-digit code";
let statusColor = '#2196F3';

// Animation
let lockAngle = 0;
let targetLockAngle = 0;
let shakeAmount = 0;
let flashTimer = 0;

// Keypad
let keypadLabels = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['C', '0', 'E']
];
let keypadButtons = [];

// ── Color palette ──
const COL_SEQ      = '#1565C0';   // sequential block border
const COL_SEQ_FILL = '#E3F2FD';   // sequential block fill
const COL_COMB     = '#2E7D32';   // combinational block border
const COL_COMB_FILL= '#E8F5E9';   // combinational block fill
const COL_FSM_BG   = '#F3E5F5';   // FSM panel background
const COL_FSM      = '#6A1B9A';   // FSM border / text
const COL_DATA     = '#1565C0';   // data bus arrows (blue)
const COL_CTRL     = '#C62828';   // control signal arrows (red)
const COL_CLK      = '#EF6C00';   // clock / reset
const COL_IO_IN    = '#E65100';   // input subsystem
const COL_IO_OUT   = '#1B5E20';   // output subsystem

// FSM highlight colors
const COL_ST_IDLE   = '#2196F3';
const COL_ST_UNLOCK = '#4CAF50';
const COL_ST_LOCK   = '#FF5722';
const COL_ST_CHECK  = '#FF9800';

// ═══════════════════════════════════════════
//  SETUP
// ═══════════════════════════════════════════
function setup() {
  updateCanvasSize();
  var mainEl = document.querySelector('main');

  // DOM control bar
  var bar = document.createElement('div');
  bar.className = 'dl-controls';
  mainEl.appendChild(bar);

  var resetBtn = document.createElement('button');
  resetBtn.className = 'dl-controls__btn dl-controls__btn--reset';
  resetBtn.textContent = 'Reset System';
  resetBtn.addEventListener('click', function() { resetSystem(); });
  bar.appendChild(resetBtn);

  var navLink = document.createElement('a');
  navLink.href = '#';
  navLink.style.cssText = 'margin-left:auto;font-size:11px;font-weight:bold;color:#5C6BC0;cursor:pointer;text-decoration:none;';
  navLink.textContent = '⛶ Fullscreen';
  var _isFs = false, _iframe = window.frameElement, _origSt = _iframe ? _iframe.style.cssText : '';
  navLink.addEventListener('click', function(e) {
    e.preventDefault();
    if (_iframe) {
      if (!_isFs) { _origSt = _iframe.style.cssText; _iframe.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:99999;border:none;background:#fff;'; navLink.textContent = '✕ Exit Fullscreen'; }
      else { _iframe.style.cssText = _origSt; navLink.textContent = '⛶ Fullscreen'; }
      _isFs = !_isFs;
    }
  });
  bar.appendChild(navLink);

  const canvas = createCanvas(containerWidth, canvasHeight);
  canvas.parent(mainEl);
  describe('Digital lock RTL block diagram with FSM, sequential/combinational datapath, clk/rst, and interactive keypad', LABEL);
}

// ═══════════════════════════════════════════
//  DRAW
// ═══════════════════════════════════════════
function draw() {
  updateCanvasSize();
  background(250, 250, 252);

  // Lockout countdown
  if (currentState === STATE_LOCKED_OUT) {
    let elapsed = (millis() - lockoutStartTime) / 1000;
    lockoutTimer = lockoutDuration - elapsed;
    if (lockoutTimer <= 0) {
      lockoutTimer = 0; currentState = STATE_IDLE; failedAttempts = 0;
      statusMessage = "Lockout expired. Try again."; statusColor = '#2196F3';
    }
  }
  lockAngle = lerp(lockAngle, targetLockAngle, 0.1);
  if (shakeAmount > 0) { shakeAmount *= 0.9; if (shakeAmount < 0.1) shakeAmount = 0; }
  if (flashTimer > 0) flashTimer--;

  // ── Zone geometry ──
  let m = 6;                           // margin
  let W = canvasWidth - 2 * m;        // usable width
  let titleH  = 22;
  let clkH    = 20;                    // global signals bar
  let fsmH    = 128;
  let ctrlH   = 16;                    // control-bus gap
  let dpH     = 100;
  let dataH   = 16;                    // data-bus gap
  let ioH     = drawHeight - titleH - clkH - fsmH - ctrlH - dpH - dataH - 32;

  let y0 = m;                                     // title
  let y1 = y0 + titleH;                           // clk bar
  let y2 = y1 + clkH;                             // FSM
  let y3 = y2 + fsmH;                             // control gap
  let y4 = y3 + ctrlH;                            // datapath
  let y5 = y4 + dpH;                              // data gap
  let y6 = y5 + dataH;                            // I/O

  drawTitle(m, y0, W);
  drawGlobalSignals(m, y1, W, clkH);
  drawFSM(m, y2, W, fsmH);
  drawControlBus(m, y3, W, ctrlH, y2, fsmH, y4);
  drawDatapath(m, y4, W, dpH);
  drawDataBus(m, y5, W, dataH, y4, dpH, y6, ioH);
  drawIO(m, y6, W, ioH);
  drawLegend(m, drawHeight - 22, W);

  // Cursor
  let h = false;
  for (let b of keypadButtons) if (isInside(mouseX, mouseY, b)) { h = true; break; }
  cursor(h ? HAND : ARROW);
}

// ═══════════════════════════════════════════
//  TITLE
// ═══════════════════════════════════════════
function drawTitle(x, y, w) {
  fill(30);
  noStroke();
  textSize(13);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text("Digital Combination Lock — RTL Block Diagram", x + w / 2, y + 2);
  textStyle(NORMAL);
}

// ═══════════════════════════════════════════
//  GLOBAL SIGNALS (clk, rst_n)
// ═══════════════════════════════════════════
function drawGlobalSignals(x, y, w, h) {
  let midY = y + h / 2;

  // clk waveform icon
  stroke(COL_CLK);
  strokeWeight(2);
  let cx = x + 8;
  // small square wave
  line(cx, midY + 3, cx + 5, midY + 3);
  line(cx + 5, midY + 3, cx + 5, midY - 3);
  line(cx + 5, midY - 3, cx + 10, midY - 3);
  line(cx + 10, midY - 3, cx + 10, midY + 3);
  line(cx + 10, midY + 3, cx + 15, midY + 3);

  fill(COL_CLK);
  noStroke();
  textSize(10);
  textStyle(BOLD);
  textAlign(LEFT, CENTER);
  text("clk", cx + 18, midY);

  // rst_n
  let rx = x + 60;
  stroke(COL_CLK);
  strokeWeight(2);
  line(rx, midY, rx + 12, midY);
  // active-low bar (overline via line above text)
  noStroke();
  fill(COL_CLK);
  text("rst_n", rx + 16, midY);
  stroke(COL_CLK);
  strokeWeight(1);
  let tw = textWidth("rst_n");
  // overline on "rst"
  line(rx + 16, midY - 7, rx + 16 + textWidth("rst"), midY - 7);

  // Dashed vertical distribution lines going down the full diagram
  stroke(COL_CLK);
  strokeWeight(0.7);
  drawingContext.setLineDash([3, 4]);
  // clk line
  let clkX = cx + 9;
  line(clkX, y + h, clkX, y + h + 300);
  // rst line
  let rstX = rx + 6;
  line(rstX, y + h, rstX, y + h + 300);
  drawingContext.setLineDash([]);

  // Legend note
  fill('#888');
  noStroke();
  textSize(8);
  textStyle(ITALIC);
  textAlign(RIGHT, CENTER);
  text("distributed to all sequential blocks (▷)", x + w - 4, midY);
  textStyle(NORMAL);
}

// ═══════════════════════════════════════════
//  FSM CONTROLLER (sequential — Moore machine)
// ═══════════════════════════════════════════
function drawFSM(x, y, w, h) {
  // Panel
  fill(COL_FSM_BG);
  stroke(COL_FSM);
  strokeWeight(1.5);
  rect(x, y, w, h, 4);

  // Label with clock triangle
  fill(COL_FSM);
  noStroke();
  textSize(10);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text("FSM Controller  (Moore, sequential)", x + 6, y + 3);
  drawClkTriangle(x + w - 16, y + h - 12, 8, COL_FSM);
  textStyle(NORMAL);

  // ── State diagram layout ──
  // Row 1: IDLE → DIGIT_1 → DIGIT_2 → DIGIT_3 → DIGIT_4
  // Row 2:            CHECK → UNLOCKED
  //                   CHECK → LOCKED_OUT
  let row1 = [0, 1, 2, 3, 4];
  let row2 = [5, 6, 7];
  let r = 16;   // state circle radius
  let row1Y = y + 36;
  let row2Y = y + 90;

  let r1Sp = (w - 24) / row1.length;
  let r2Sp = (w - 24) / (row2.length + 1);

  // Row 1 circles + arrows
  for (let j = 0; j < row1.length; j++) {
    let cx = x + 12 + r1Sp * (j + 0.5);
    drawStateCircle(cx, row1Y, r, row1[j]);

    if (j < row1.length - 1) {
      let nx = x + 12 + r1Sp * (j + 1.5);
      drawArrow(cx + r + 2, row1Y, nx - r - 2, row1Y, COL_FSM, 1);
      // Condition label
      fill('#555');
      noStroke();
      textSize(7);
      textAlign(CENTER, BOTTOM);
      if (j === 0) text("key_valid", (cx + nx) / 2, row1Y - r - 1);
      else text("key_valid", (cx + nx) / 2, row1Y - r - 1);
    }
  }

  // DIGIT_4 → CHECK (down)
  let d4cx = x + 12 + r1Sp * 4.5;
  let chkCx = x + 12 + r2Sp * 1;
  drawArrow(d4cx, row1Y + r + 2, chkCx, row2Y - r - 2, COL_FSM, 1);
  fill('#555'); noStroke(); textSize(7); textAlign(RIGHT, CENTER);
  text("cnt==4", d4cx - 4, (row1Y + row2Y) / 2);

  // Row 2 circles
  for (let j = 0; j < row2.length; j++) {
    let cx = x + 12 + r2Sp * (j + 1);
    drawStateCircle(cx, row2Y, r, row2[j]);
  }

  // CHECK → UNLOCKED
  let unlCx = x + 12 + r2Sp * 2;
  let loCx  = x + 12 + r2Sp * 3;
  drawArrow(chkCx + r + 2, row2Y, unlCx - r - 2, row2Y, COL_FSM, 1);
  fill('#555'); noStroke(); textSize(7); textAlign(CENTER, BOTTOM);
  text("match==1", (chkCx + unlCx) / 2, row2Y - r - 1);

  // CHECK → LOCKED_OUT
  drawArrow(chkCx + r * 0.7 + 2, row2Y + r * 0.7, loCx - r * 0.7 - 2, row2Y + r * 0.7, COL_FSM, 1);
  fill('#555'); noStroke(); textSize(7); textAlign(CENTER, TOP);
  text("fail≥3", (chkCx + loCx) / 2, row2Y + r + 2);

  // CHECK → IDLE (fail<3)
  let idleCx = x + 12 + r1Sp * 0.5;
  stroke('#999'); strokeWeight(0.8);
  drawingContext.setLineDash([3, 3]);
  noFill();
  bezier(chkCx - r * 0.5, row2Y - r, chkCx - r1Sp * 0.8, row1Y + r * 2.5,
         idleCx + r * 2, row1Y + r * 2.5, idleCx, row1Y + r);
  drawingContext.setLineDash([]);
  fill('#999'); noStroke(); textSize(6); textAlign(LEFT, CENTER);
  text("match==0", idleCx + r + 4, (row1Y + row2Y) / 2 + 6);
  text("∧ fail<3", idleCx + r + 4, (row1Y + row2Y) / 2 + 14);

  // UNLOCKED → IDLE (clear/reset)
  stroke('#999'); strokeWeight(0.8);
  drawingContext.setLineDash([3, 3]);
  noFill();
  bezier(unlCx, row2Y - r, unlCx - 20, y + 18, idleCx + 20, y + 18, idleCx, row1Y - r);
  drawingContext.setLineDash([]);
  fill('#999'); noStroke(); textSize(6); textAlign(CENTER, TOP);
  text("clear", (idleCx + unlCx) / 2, y + 16);

  // LOCKED_OUT → IDLE (timeout)
  stroke('#999'); strokeWeight(0.8);
  drawingContext.setLineDash([3, 3]);
  noFill();
  bezier(loCx, row2Y - r, loCx + 10, y + 14, idleCx + 50, y + 14, idleCx + r * 0.7, row1Y - r * 0.7);
  drawingContext.setLineDash([]);
  fill('#999'); noStroke(); textSize(6); textAlign(CENTER, TOP);
  text("timeout", (idleCx + loCx) / 2 + 20, y + 14);
}

function drawStateCircle(cx, cy, r, idx) {
  let cur = (currentState === idx);
  let bg;
  if (cur) {
    if (idx === STATE_UNLOCKED) bg = COL_ST_UNLOCK;
    else if (idx === STATE_LOCKED_OUT) bg = COL_ST_LOCK;
    else if (idx === STATE_CHECK) bg = COL_ST_CHECK;
    else bg = COL_ST_IDLE;
  } else {
    bg = '#D1C4E9';
  }
  fill(bg);
  stroke(cur ? '#333' : '#9575CD');
  strokeWeight(cur ? 2.5 : 1);
  ellipse(cx, cy, r * 2, r * 2);

  // Double circle for accept states (UNLOCKED)
  if (idx === STATE_UNLOCKED) {
    noFill();
    stroke(cur ? '#333' : '#9575CD');
    strokeWeight(cur ? 1.5 : 0.7);
    ellipse(cx, cy, r * 2 - 5, r * 2 - 5);
  }

  fill(cur ? 255 : '#555');
  noStroke();
  textSize(6.5);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text(stateNames[idx], cx, cy);
  textStyle(NORMAL);
}

// ═══════════════════════════════════════════
//  CONTROL BUS (FSM → Datapath)
// ═══════════════════════════════════════════
function drawControlBus(x, y, w, h, fsmY, fsmH, dpY) {
  let midY = y + h / 2;

  // Control signals: shift_en, compare_en, inc_fail, start_timer, clear
  let sigs = [
    { name: "shift_en",    xf: 0.12 },
    { name: "compare_en",  xf: 0.30 },
    { name: "inc_fail",    xf: 0.52 },
    { name: "start_timer", xf: 0.72 },
    { name: "clear",       xf: 0.90 }
  ];

  for (let s of sigs) {
    let ax = x + w * s.xf;
    // Down arrow
    stroke(COL_CTRL);
    strokeWeight(1.2);
    line(ax, y, ax, y + h);
    // Arrowhead
    fill(COL_CTRL);
    noStroke();
    triangle(ax, y + h, ax - 3, y + h - 5, ax + 3, y + h - 5);
    // Label
    textSize(7);
    textAlign(CENTER, BOTTOM);
    fill(COL_CTRL);
    text(s.name, ax, y - 1);
  }

  // "control" annotation
  fill(COL_CTRL);
  noStroke();
  textSize(7);
  textStyle(ITALIC);
  textAlign(RIGHT, CENTER);
  text("control ↓", x + w, midY);
  textStyle(NORMAL);
}

// ═══════════════════════════════════════════
//  DATAPATH (left-to-right data flow)
// ═══════════════════════════════════════════
function drawDatapath(x, y, w, h) {
  // Light background
  fill(252, 252, 255);
  stroke('#CFD8DC');
  strokeWeight(1);
  rect(x, y, w, h, 4);

  // Section label
  fill('#37474F');
  noStroke();
  textSize(10);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text("Datapath (left→right data flow)", x + 6, y + 3);
  textStyle(NORMAL);

  // Block layout (left to right)
  let bH = 50;
  let bY = y + 20;
  let gap = 4;
  let pad = 8;

  // Proportional widths
  let fracs = [0.20, 0.14, 0.20, 0.18, 0.20];
  let usable = w - 2 * pad - gap * (fracs.length - 1);
  let bxs = [];  // block x positions
  let bws = [];  // block widths
  let bx = x + pad;
  for (let i = 0; i < fracs.length; i++) {
    let bw = usable * fracs[i];
    bxs.push(bx);
    bws.push(bw);
    bx += bw + gap;
  }

  // Block definitions: [label, subtitle, type]
  // type: 'seq' = sequential (▷), 'comb' = combinational
  let blocks = [
    ["Digit Shift\nRegister",   "4×4-bit",     "seq"],
    ["ROM\n(Code Store)",       "16-bit",      "comb"],
    ["Comparator",              "16-bit ==",   "comb"],
    ["Attempt\nCounter",        "2-bit up",    "seq"],
    ["Lockout\nTimer",          "countdown",   "seq"]
  ];

  for (let i = 0; i < blocks.length; i++) {
    drawHWBlock(bxs[i], bY, bws[i], bH, blocks[i][0], blocks[i][1], blocks[i][2]);
  }

  // Data arrows between blocks (thick blue)
  // Digit Register → Comparator (data[15:0])
  let ar1x1 = bxs[0] + bws[0];
  let ar1x2 = bxs[2];
  let arY = bY + bH * 0.35;
  drawDataArrow(ar1x1, arY, ar1x2, arY, "entered[15:0]", 4);

  // ROM → Comparator (code[15:0])
  let ar2x1 = bxs[1] + bws[1];
  let ar2x2 = bxs[2];
  let arY2 = bY + bH * 0.65;
  drawDataArrow(ar2x1, arY2, ar2x2, arY2, "code[15:0]", 4);

  // Comparator → status signal (match, 1-bit) — goes right then up (to FSM)
  let matchOutX = bxs[2] + bws[2];
  let matchMidX = matchOutX + gap / 2;
  stroke(COL_DATA);
  strokeWeight(1.2);
  line(matchOutX, bY + bH / 2, matchMidX + 6, bY + bH / 2);
  // "match" label
  fill(COL_DATA);
  noStroke();
  textSize(7);
  textAlign(LEFT, BOTTOM);
  text("match", matchMidX + 8, bY + bH / 2 - 1);

  // Attempt Counter output → "fail_count[1:0]"
  let acOutX = bxs[3] + bws[3];
  stroke(COL_DATA);
  strokeWeight(1.2);
  line(acOutX, bY + bH / 2, acOutX + gap / 2 + 4, bY + bH / 2);
  fill(COL_DATA); noStroke();
  textSize(7); textAlign(LEFT, BOTTOM);
  text("fail_cnt[1:0]", acOutX + gap / 2 + 6, bY + bH / 2 - 1);

  // Lockout Timer output → "lockout_active"
  let ltOutX = bxs[4] + bws[4];
  stroke(COL_DATA);
  strokeWeight(1.2);
  line(ltOutX, bY + bH / 2, ltOutX + 6, bY + bH / 2);
  fill(COL_DATA); noStroke();
  textSize(7); textAlign(LEFT, BOTTOM);
  text("lockout", ltOutX + 8, bY + bH / 2 - 1);

  // Live values below blocks
  textSize(7); textAlign(CENTER, TOP);
  let lvY = bY + bH + 4;

  fill(COL_SEQ);
  textStyle(BOLD);
  let digStr = enteredDigits.length > 0 ? enteredDigits.join("") : "----";
  text(digStr, bxs[0] + bws[0] / 2, lvY);

  fill(COL_COMB);
  text("1234", bxs[1] + bws[1] / 2, lvY);

  text(currentState === STATE_UNLOCKED ? "1" : "0", bxs[2] + bws[2] / 2, lvY);

  fill(COL_SEQ);
  text(String(failedAttempts), bxs[3] + bws[3] / 2, lvY);
  text(currentState === STATE_LOCKED_OUT ? Math.ceil(lockoutTimer) + "s" : "off", bxs[4] + bws[4] / 2, lvY);
  textStyle(NORMAL);

  // match → FSM feedback arrow (upward, right side)
  let fbX = x + w - 14;
  stroke(COL_DATA);
  strokeWeight(1.2);
  drawingContext.setLineDash([]);
  line(fbX, bY + bH / 2, fbX, y - 2);
  // Arrowhead up
  fill(COL_DATA); noStroke();
  triangle(fbX, y - 2, fbX - 3, y + 3, fbX + 3, y + 3);
  textSize(7); textAlign(RIGHT, CENTER);
  fill(COL_DATA);
  text("match ↑", fbX - 4, y + (bY + bH / 2 - y) / 2);

  // Horizontal connector from comparator output to feedback line
  stroke(COL_DATA); strokeWeight(1.2);
  line(matchMidX + 6, bY + bH / 2, fbX, bY + bH / 2);
}

function drawHWBlock(bx, by, bw, bh, label, sub, type) {
  let isSeq = (type === 'seq');
  let borderCol = isSeq ? COL_SEQ : COL_COMB;
  let fillCol = isSeq ? COL_SEQ_FILL : COL_COMB_FILL;

  fill(fillCol);
  stroke(borderCol);
  strokeWeight(1.5);
  rect(bx, by, bw, bh, 3);

  // Clock triangle for sequential blocks
  if (isSeq) {
    drawClkTriangle(bx + 3, by + bh - 10, 7, borderCol);
  }

  // Label
  fill(borderCol);
  noStroke();
  textSize(8);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(label, bx + bw / 2, by + bh / 2 - (isSeq ? 4 : 2));
  textStyle(NORMAL);

  // Subtitle
  textSize(6);
  fill('#888');
  text(sub, bx + bw / 2, by + bh - (isSeq ? 14 : 8));

  // Type annotation
  textSize(5);
  fill(borderCol);
  textStyle(ITALIC);
  textAlign(RIGHT, TOP);
  text(isSeq ? "SEQ" : "COMB", bx + bw - 3, by + 2);
  textStyle(NORMAL);
}

function drawClkTriangle(tx, ty, sz, col) {
  stroke(col);
  strokeWeight(1);
  noFill();
  triangle(tx, ty, tx, ty + sz, tx + sz * 0.7, ty + sz / 2);
}

function drawDataArrow(x1, y1, x2, y2, label, busWidth) {
  stroke(COL_DATA);
  strokeWeight(1.8);
  line(x1, y1, x2, y2);
  // Arrowhead
  fill(COL_DATA);
  noStroke();
  let ang = atan2(y2 - y1, x2 - x1);
  push();
  translate(x2, y2);
  rotate(ang);
  triangle(0, 0, -6, -3, -6, 3);
  pop();

  // Bus width slash
  let mx = (x1 + x2) / 2;
  let my = (y1 + y2) / 2;
  stroke(COL_DATA);
  strokeWeight(1);
  line(mx - 3, my - 4, mx + 3, my + 4);
  // Width number
  fill(COL_DATA);
  noStroke();
  textSize(6);
  textAlign(LEFT, BOTTOM);
  text(String(busWidth), mx + 4, my - 1);

  // Label
  textSize(7);
  textAlign(CENTER, BOTTOM);
  text(label, mx, my - 5);
}

// ═══════════════════════════════════════════
//  DATA BUS (Datapath ↔ I/O)
// ═══════════════════════════════════════════
function drawDataBus(x, y, w, h, dpY, dpH, ioY, ioH) {
  let midY = y + h / 2;

  // digit_in: Input → Datapath (upward, left side)
  let diX = x + w * 0.15;
  stroke(COL_DATA); strokeWeight(1.5);
  line(diX, y + h, diX, y);
  fill(COL_DATA); noStroke();
  triangle(diX, y, diX - 3, y + 5, diX + 3, y + 5);
  textSize(7); textAlign(CENTER, CENTER); fill(COL_DATA);
  text("digit_in[3:0] ↑", diX + 2, midY);

  // enter_pulse: Input → FSM (annotated)
  let epX = x + w * 0.35;
  stroke(COL_CTRL); strokeWeight(1);
  drawingContext.setLineDash([3, 3]);
  line(epX, y + h, epX, y);
  drawingContext.setLineDash([]);
  fill(COL_CTRL); noStroke();
  triangle(epX, y, epX - 3, y + 5, epX + 3, y + 5);
  textSize(7); textAlign(CENTER, CENTER); fill(COL_CTRL);
  text("enter_pulse ↑", epX, midY);

  // display_data: Datapath → Output (downward, right side)
  let ddX = x + w * 0.65;
  stroke(COL_DATA); strokeWeight(1.5);
  line(ddX, y, ddX, y + h);
  fill(COL_DATA); noStroke();
  triangle(ddX, y + h, ddX - 3, y + h - 5, ddX + 3, y + h - 5);
  textSize(7); textAlign(CENTER, CENTER); fill(COL_DATA);
  text("display[15:0] ↓", ddX, midY);

  // lock_status: FSM → Output (downward, far right)
  let lsX = x + w * 0.88;
  stroke(COL_CTRL); strokeWeight(1);
  drawingContext.setLineDash([3, 3]);
  line(lsX, y, lsX, y + h);
  drawingContext.setLineDash([]);
  fill(COL_CTRL); noStroke();
  triangle(lsX, y + h, lsX - 3, y + h - 5, lsX + 3, y + h - 5);
  textSize(7); textAlign(CENTER, CENTER); fill(COL_CTRL);
  text("unlock_en ↓", lsX, midY);
}

// ═══════════════════════════════════════════
//  I/O SECTION
// ═══════════════════════════════════════════
function drawIO(x, y, w, h) {
  let inW = w * 0.44;
  let outW = w * 0.53;
  let gapW = w - inW - outW;

  // ── Input subsystem ──
  let inX = x;
  fill('#FFF8E1');
  stroke(COL_IO_IN);
  strokeWeight(1.5);
  rect(inX, y, inW, h, 4);

  fill(COL_IO_IN);
  noStroke();
  textSize(10);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text("Input Interface", inX + 6, y + 3);
  textSize(7);
  textStyle(ITALIC);
  text("Keypad + Encoder (COMB)", inX + 6, y + 16);
  textStyle(NORMAL);

  drawCompactKeypad(inX + 4, y + 30, inW - 8, h - 36);

  // ── Output subsystem ──
  let outX = x + inW + gapW;
  fill('#E8F5E9');
  stroke(COL_IO_OUT);
  strokeWeight(1.5);
  rect(outX, y, outW, h, 4);

  fill(COL_IO_OUT);
  noStroke();
  textSize(10);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text("Output Interface", outX + 6, y + 3);
  textSize(7);
  textStyle(ITALIC);
  text("Display + Lock Driver (COMB)", outX + 6, y + 16);
  textStyle(NORMAL);

  drawDigitDisplay(outX + 6, y + 30, outW - 12, 55);

  let lockCx = outX + outW / 2;
  let lockCy = y + 110;
  drawLockIcon(lockCx, lockCy);

  fill(statusColor);
  noStroke();
  textSize(10);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text(statusMessage, lockCx, lockCy + 38);
  textStyle(NORMAL);

  if (currentState === STATE_LOCKED_OUT) {
    fill(COL_ST_LOCK);
    textSize(12);
    textStyle(BOLD);
    text("Lockout: " + Math.ceil(lockoutTimer) + "s", lockCx, lockCy + 52);
    textStyle(NORMAL);
  } else {
    fill(100);
    textSize(8);
    text("Attempts: " + failedAttempts + " / " + maxAttempts, lockCx, lockCy + 52);
  }
}

// ═══════════════════════════════════════════
//  LEGEND
// ═══════════════════════════════════════════
function drawLegend(x, y, w) {
  let lx = x + 4;
  textSize(7);
  textAlign(LEFT, CENTER);
  noStroke();

  // Sequential
  fill(COL_SEQ_FILL);
  stroke(COL_SEQ);
  strokeWeight(1.2);
  rect(lx, y, 18, 10, 2);
  drawClkTriangle(lx + 1, y + 2, 5, COL_SEQ);
  fill(COL_SEQ);
  noStroke();
  text("Sequential", lx + 22, y + 5);

  // Combinational
  let cx = lx + 80;
  fill(COL_COMB_FILL);
  stroke(COL_COMB);
  strokeWeight(1.2);
  rect(cx, y, 18, 10, 2);
  fill(COL_COMB);
  noStroke();
  text("Combinational", cx + 22, y + 5);

  // Data bus
  let dx = cx + 90;
  stroke(COL_DATA);
  strokeWeight(2);
  line(dx, y + 5, dx + 18, y + 5);
  fill(COL_DATA); noStroke();
  triangle(dx + 18, y + 5, dx + 14, y + 2, dx + 14, y + 8);
  text("Data bus", dx + 22, y + 5);

  // Control
  let rx = dx + 75;
  stroke(COL_CTRL);
  strokeWeight(1);
  drawingContext.setLineDash([3, 3]);
  line(rx, y + 5, rx + 18, y + 5);
  drawingContext.setLineDash([]);
  fill(COL_CTRL); noStroke();
  triangle(rx + 18, y + 5, rx + 14, y + 2, rx + 14, y + 8);
  text("Control", rx + 22, y + 5);
}

// ═══════════════════════════════════════════
//  COMPACT KEYPAD
// ═══════════════════════════════════════════
function drawCompactKeypad(kx, ky, kw, kh) {
  let cols = 3, rows = 4, gap = 3;
  let bW = (kw - gap * (cols - 1)) / cols;
  let bH = (kh - gap * (rows - 1)) / rows;
  if (bH > 46) bH = 46;

  keypadButtons = [];
  let dis = (currentState === STATE_LOCKED_OUT);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let lab = keypadLabels[r][c];
      let bx = kx + c * (bW + gap);
      let by = ky + r * (bH + gap);
      keypadButtons.push({ x: bx, y: by, w: bW, h: bH, label: lab });

      let hov = isInside(mouseX, mouseY, { x: bx, y: by, w: bW, h: bH });
      let col;
      if (lab === 'C') col = hov ? '#EF5350' : '#FFCDD2';
      else if (lab === 'E') col = hov ? '#66BB6A' : '#C8E6C9';
      else col = hov ? '#CFD8DC' : '#ECEFF1';
      if (dis) col = '#E0E0E0';

      fill(col);
      stroke(dis ? '#CCC' : '#B0BEC5');
      strokeWeight(1);
      rect(bx, by, bW, bH, 4);

      fill(dis ? '#CCC' : (lab === 'C' ? '#C62828' : (lab === 'E' ? '#2E7D32' : '#37474F')));
      noStroke();
      textSize(lab === 'E' || lab === 'C' ? 9 : 15);
      textStyle(BOLD);
      textAlign(CENTER, CENTER);
      text(lab === 'E' ? 'Enter' : (lab === 'C' ? 'Clr' : lab), bx + bW / 2, by + bH / 2);
      textStyle(NORMAL);
    }
  }
}

// ═══════════════════════════════════════════
//  DIGIT DISPLAY
// ═══════════════════════════════════════════
function drawDigitDisplay(dx, dy, dw, dh) {
  let dW = (dw - 24) / 4;
  let dH = dh - 10;
  let dG = 5;
  let total = 4 * dW + 3 * dG;
  let sx = dx + (dw - total) / 2;
  let shk = shakeAmount > 0 ? random(-shakeAmount, shakeAmount) : 0;

  let bg = (currentState === STATE_UNLOCKED) ? '#C8E6C9' :
           (currentState === STATE_LOCKED_OUT) ? '#FFCDD2' : '#BBDEFB';
  fill(bg); stroke(200); strokeWeight(1);
  rect(dx, dy, dw, dh, 4);

  for (let i = 0; i < 4; i++) {
    let ddx = sx + i * (dW + dG) + shk;
    let ent = (i < enteredDigits.length);
    fill(ent ? '#FFF' : '#F5F5F5');
    stroke(ent ? '#2196F3' : '#CCC');
    strokeWeight(ent ? 1.5 : 0.8);
    rect(ddx, dy + 5, dW, dH, 3);
    if (ent) {
      fill(50); noStroke(); textSize(16);
      textAlign(CENTER, CENTER); textStyle(BOLD);
      text(currentState === STATE_UNLOCKED ? enteredDigits[i] : "*", ddx + dW / 2, dy + 5 + dH / 2);
      textStyle(NORMAL);
    }
  }
}

// ═══════════════════════════════════════════
//  LOCK ICON
// ═══════════════════════════════════════════
function drawLockIcon(cx, cy) {
  let sz = 32;
  push(); translate(cx, cy);
  let u = (currentState === STATE_UNLOCKED);
  let lo = (currentState === STATE_LOCKED_OUT);
  fill(u ? COL_ST_UNLOCK : (lo ? COL_ST_LOCK : '#78909C'));
  stroke(u ? '#388E3C' : (lo ? '#D84315' : '#546E7A'));
  strokeWeight(2);
  rect(-sz / 2, 0, sz, sz * 0.7, 3);
  noFill();
  stroke(u ? COL_ST_UNLOCK : (lo ? COL_ST_LOCK : '#78909C'));
  strokeWeight(3.5);
  if (u) { push(); rotate(radians(lockAngle)); arc(-3, -sz * 0.05, sz * 0.4, sz * 0.45, PI, TWO_PI); pop(); }
  else arc(0, 0, sz * 0.4, sz * 0.45, PI, TWO_PI);
  fill(u ? '#E8F5E9' : (lo ? '#FFCDD2' : '#455A64'));
  noStroke();
  ellipse(0, sz * 0.25, 7, 7);
  rect(-1.5, sz * 0.25, 3, sz * 0.13);
  pop();

  fill(u ? COL_ST_UNLOCK : (lo ? COL_ST_LOCK : '#78909C'));
  noStroke(); textSize(9); textStyle(BOLD);
  textAlign(CENTER, TOP);
  text(u ? "UNLOCKED" : (lo ? "LOCKED OUT" : "LOCKED"), cx, cy + sz * 0.7 + 3);
  textStyle(NORMAL);
}

// ═══════════════════════════════════════════
//  ARROW UTILITY
// ═══════════════════════════════════════════
function drawArrow(x1, y1, x2, y2, col, sw) {
  stroke(col); strokeWeight(sw);
  drawingContext.setLineDash([]);
  line(x1, y1, x2, y2);
  let a = atan2(y2 - y1, x2 - x1);
  fill(col); noStroke();
  push(); translate(x2, y2); rotate(a);
  triangle(0, 0, -5, -2.5, -5, 2.5);
  pop();
}

// ═══════════════════════════════════════════
//  FUNCTIONAL LOGIC (unchanged)
// ═══════════════════════════════════════════
function handleKeyPress(label) {
  if (currentState === STATE_LOCKED_OUT) return;
  if (label === 'C') {
    enteredDigits = []; currentState = STATE_IDLE;
    statusMessage = "Enter 4-digit code"; statusColor = '#2196F3'; return;
  }
  if (label === 'E') {
    if (enteredDigits.length === 4) { currentState = STATE_CHECK; checkCode(); }
    else { statusMessage = "Enter all 4 digits first"; statusColor = '#FF9800'; shakeAmount = 5; }
    return;
  }
  if (currentState === STATE_UNLOCKED) return;
  let digit = parseInt(label);
  if (enteredDigits.length < 4) {
    enteredDigits.push(digit);
    switch (enteredDigits.length) {
      case 1: currentState = STATE_DIGIT_1; statusMessage = "Enter digit 2..."; statusColor = '#2196F3'; break;
      case 2: currentState = STATE_DIGIT_2; statusMessage = "Enter digit 3..."; statusColor = '#2196F3'; break;
      case 3: currentState = STATE_DIGIT_3; statusMessage = "Enter digit 4..."; statusColor = '#2196F3'; break;
      case 4: currentState = STATE_DIGIT_4; currentState = STATE_CHECK; checkCode(); break;
    }
  }
}

function checkCode() {
  let ok = true;
  for (let i = 0; i < 4; i++) if (enteredDigits[i] !== correctCode[i]) { ok = false; break; }
  if (ok) {
    currentState = STATE_UNLOCKED; statusMessage = "ACCESS GRANTED!";
    statusColor = COL_ST_UNLOCK; targetLockAngle = -30; flashTimer = 30;
  } else {
    failedAttempts++; shakeAmount = 10;
    if (failedAttempts >= maxAttempts) {
      currentState = STATE_LOCKED_OUT; statusMessage = "TOO MANY ATTEMPTS";
      statusColor = COL_ST_LOCK; lockoutStartTime = millis(); lockoutTimer = lockoutDuration; enteredDigits = [];
    } else {
      currentState = STATE_IDLE;
      statusMessage = "WRONG (" + (maxAttempts - failedAttempts) + " left)";
      statusColor = '#E91E63'; enteredDigits = [];
    }
  }
}

function resetSystem() {
  currentState = STATE_IDLE; enteredDigits = []; failedAttempts = 0;
  lockoutTimer = 0; statusMessage = "Enter 4-digit code"; statusColor = '#2196F3';
  targetLockAngle = 0; shakeAmount = 0; flashTimer = 0;
}

function mousePressed() {
  for (let b of keypadButtons) if (isInside(mouseX, mouseY, b)) { handleKeyPress(b.label); return; }
}

function isInside(mx, my, b) {
  return mx > b.x && mx < b.x + b.w && my > b.y && my < b.y + b.h;
}

function windowResized() { updateCanvasSize(); resizeCanvas(containerWidth, canvasHeight); }

function updateCanvasSize() {
  const c = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(c.width);
  canvasWidth = containerWidth;
}
