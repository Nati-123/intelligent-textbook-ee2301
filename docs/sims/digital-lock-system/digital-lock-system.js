// Digital Lock System Architecture MicroSim
// Hardware architecture diagram with FSM, Datapath, Input/Output subsystems

let containerWidth;
let canvasWidth = 400;
let drawHeight = 620;
let controlHeight = 0;
let canvasHeight = drawHeight + controlHeight;

// FSM states
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

// Correct code
let correctCode = [1, 2, 3, 4];

// Input tracking
let enteredDigits = [];
let failedAttempts = 0;
let maxAttempts = 3;

// Lockout timer
let lockoutTimer = 0;
let lockoutDuration = 10;
let lockoutStartTime = 0;

// Status message
let statusMessage = "Enter 4-digit code";
let statusColor = '#2196F3';

// Animation
let lockAngle = 0;
let targetLockAngle = 0;
let shakeAmount = 0;
let flashTimer = 0;

// Keypad layout
let keypadLabels = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['C', '0', 'E']
];

// Colors
const COLOR_IDLE = '#2196F3';
const COLOR_UNLOCKED = '#4CAF50';
const COLOR_LOCKED = '#E91E63';
const COLOR_LOCKOUT = '#FF5722';

const COLOR_FSM_BG   = '#EDE7F6';
const COLOR_FSM_BOX  = '#7E57C2';
const COLOR_DP_BG    = '#E3F2FD';
const COLOR_DP_BOX   = '#1976D2';
const COLOR_IN_BG    = '#FFF3E0';
const COLOR_IN_BOX   = '#F57C00';
const COLOR_OUT_BG   = '#E8F5E9';
const COLOR_OUT_BOX  = '#388E3C';
const COLOR_SIGNAL   = '#5C6BC0';
const COLOR_ARROW    = '#455A64';

// Button bounds
let keypadButtons = [];

function setup() {
  updateCanvasSize();
  var mainElement = document.querySelector('main');

  // DOM control bar
  var bar = document.createElement('div');
  bar.className = 'dl-controls';
  mainElement.appendChild(bar);

  // Reset button
  var resetBtn = document.createElement('button');
  resetBtn.className = 'dl-controls__btn dl-controls__btn--reset';
  resetBtn.textContent = 'Reset System';
  resetBtn.addEventListener('click', function() { resetSystem(); });
  bar.appendChild(resetBtn);

  // Fullscreen / Close link
  var navLink = document.createElement('a');
  navLink.style.cssText = 'margin-left:auto;font-size:11px;font-weight:bold;color:#5C6BC0;';
  if (window.self !== window.top) {
    navLink.href = 'main.html';
    navLink.target = '_blank';
    navLink.textContent = 'Fullscreen';
  } else {
    navLink.href = '#';
    navLink.textContent = 'Close';
    navLink.addEventListener('click', function(e) {
      e.preventDefault();
      window.close();
    });
  }
  bar.appendChild(navLink);

  const canvas = createCanvas(containerWidth, canvasHeight);
  canvas.parent(mainElement);
  describe('Digital lock system architecture diagram with FSM controller, datapath, and interactive keypad', LABEL);
}

function draw() {
  updateCanvasSize();
  background(245);

  // Update lockout timer
  if (currentState === STATE_LOCKED_OUT) {
    let elapsed = (millis() - lockoutStartTime) / 1000;
    lockoutTimer = lockoutDuration - elapsed;
    if (lockoutTimer <= 0) {
      lockoutTimer = 0;
      currentState = STATE_IDLE;
      failedAttempts = 0;
      statusMessage = "Lockout expired. Try again.";
      statusColor = COLOR_IDLE;
    }
  }

  // Animate lock
  lockAngle = lerp(lockAngle, targetLockAngle, 0.1);
  if (shakeAmount > 0) { shakeAmount *= 0.9; if (shakeAmount < 0.1) shakeAmount = 0; }
  if (flashTimer > 0) flashTimer--;

  // --- Layout zones ---
  let margin = 8;
  let fsmY = 6, fsmH = 108;
  let dpY = fsmY + fsmH + 4, dpH = 100;
  let ioY = dpY + dpH + 4, ioH = drawHeight - ioY - 4;

  drawFSMSection(margin, fsmY, canvasWidth - 2 * margin, fsmH);
  drawDatapathSection(margin, dpY, canvasWidth - 2 * margin, dpH);
  drawIOSection(margin, ioY, canvasWidth - 2 * margin, ioH);
  drawSignalArrows(margin, fsmY, fsmH, dpY, dpH, ioY, ioH);

  // Cursor
  let hovering = false;
  for (let i = 0; i < keypadButtons.length; i++) {
    if (isInside(mouseX, mouseY, keypadButtons[i])) { hovering = true; break; }
  }
  cursor(hovering ? HAND : ARROW);
}

// ═══════════════════════════════════════════
//  FSM CONTROLLER (top section)
// ═══════════════════════════════════════════
function drawFSMSection(sx, sy, sw, sh) {
  // Background panel
  fill(COLOR_FSM_BG);
  stroke('#B39DDB');
  strokeWeight(1.5);
  rect(sx, sy, sw, sh, 6);

  // Section label
  fill(COLOR_FSM_BOX);
  noStroke();
  textSize(11);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text("FSM Controller", sx + 8, sy + 4);
  textStyle(NORMAL);

  // State circles
  let stateR = 18;
  let stateY = sy + 22 + stateR;
  let totalStates = stateNames.length;

  // Two rows: IDLE..DIGIT_4 on row 1, CHECK..LOCKED_OUT on row 2
  let row1 = [0, 1, 2, 3, 4];
  let row2 = [5, 6, 7];
  let row1Y = sy + 32;
  let row2Y = sy + 72;

  let r1Gap = (sw - 20) / row1.length;
  let r2Gap = (sw - 20) / (row2.length + 1);

  // Draw row 1 states
  for (let j = 0; j < row1.length; j++) {
    let i = row1[j];
    let cx = sx + 10 + r1Gap * (j + 0.5);
    let cy = row1Y;
    drawStateCircle(cx, cy, stateR, i);

    // Transition arrow to next
    if (j < row1.length - 1) {
      let nx = sx + 10 + r1Gap * (j + 1.5);
      drawArrowLine(cx + stateR + 1, cy, nx - stateR - 1, cy, COLOR_ARROW, 1.2);
    }
  }

  // Arrow from DIGIT_4 down to CHECK
  let d4x = sx + 10 + r1Gap * 4.5;
  let chkX = sx + 10 + r2Gap * 1;
  drawArrowLine(d4x, row1Y + stateR + 1, chkX, row2Y - stateR - 1, COLOR_ARROW, 1.2);

  // Draw row 2 states
  for (let j = 0; j < row2.length; j++) {
    let i = row2[j];
    let cx = sx + 10 + r2Gap * (j + 1);
    let cy = row2Y;
    drawStateCircle(cx, cy, stateR, i);

    // Arrow from CHECK to UNLOCKED and LOCKED_OUT
    if (j > 0) {
      let prevCx = sx + 10 + r2Gap * 1;
      drawArrowLine(prevCx + stateR + 1, cy, cx - stateR - 1, cy, COLOR_ARROW, 1.2);
    }
  }

  // Labels on transition arrows
  fill('#666');
  noStroke();
  textSize(7);
  textAlign(CENTER, BOTTOM);
  // digit_in label above row1 arrows
  text("digit_in", sx + 10 + r1Gap * 1.5, row1Y - stateR - 1);
  // enter label near DIGIT_4→CHECK
  textAlign(RIGHT, CENTER);
  text("enter", d4x - 4, (row1Y + row2Y) / 2);
  // match / fail labels
  textAlign(CENTER, BOTTOM);
  let chkCx = sx + 10 + r2Gap * 1;
  let unlCx = sx + 10 + r2Gap * 2;
  let loCx  = sx + 10 + r2Gap * 3;
  text("match", (chkCx + unlCx) / 2, row2Y - 4);
  text("fail×3", (chkCx + loCx) / 2, row2Y - 4);

  // Feedback: UNLOCKED → IDLE (curved)
  let idleCx = sx + 10 + r1Gap * 0.5;
  stroke('#999');
  strokeWeight(0.8);
  drawingContext.setLineDash([3, 3]);
  noFill();
  // Curve from UNLOCKED up-left to IDLE
  bezier(unlCx, row2Y - stateR, unlCx - 30, row1Y + 30, idleCx + 30, row1Y + 30, idleCx, row1Y + stateR);
  drawingContext.setLineDash([]);
  // Small label
  fill('#999');
  noStroke();
  textSize(6);
  textAlign(CENTER, CENTER);
  text("reset", idleCx + 20, (row1Y + row2Y) / 2 + 10);
}

function drawStateCircle(cx, cy, r, stateIdx) {
  let isCurrent = (currentState === stateIdx);
  let bgColor;
  if (isCurrent) {
    if (stateIdx === STATE_UNLOCKED) bgColor = COLOR_UNLOCKED;
    else if (stateIdx === STATE_LOCKED_OUT) bgColor = COLOR_LOCKOUT;
    else if (stateIdx === STATE_CHECK) bgColor = '#FF9800';
    else bgColor = COLOR_IDLE;
  } else {
    bgColor = '#D1C4E9';
  }

  fill(bgColor);
  stroke(isCurrent ? '#333' : '#9575CD');
  strokeWeight(isCurrent ? 2.5 : 1);
  ellipse(cx, cy, r * 2, r * 2);

  fill(isCurrent ? 255 : '#666');
  noStroke();
  textSize(7);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text(stateNames[stateIdx], cx, cy);
  textStyle(NORMAL);
}

// ═══════════════════════════════════════════
//  DATAPATH (middle section)
// ═══════════════════════════════════════════
function drawDatapathSection(sx, sy, sw, sh) {
  fill(COLOR_DP_BG);
  stroke('#90CAF9');
  strokeWeight(1.5);
  rect(sx, sy, sw, sh, 6);

  fill(COLOR_DP_BOX);
  noStroke();
  textSize(11);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text("Datapath", sx + 8, sy + 4);
  textStyle(NORMAL);

  // Datapath blocks: Digit Register, ROM, Comparator, Attempt Counter, Lockout Timer
  let blockH = 42;
  let blockY = sy + 22;
  let gap = 6;

  let blocks = [
    { label: "Digit\nRegister", sub: "4×4-bit", w: 0.17 },
    { label: "ROM\n(Code)", sub: "stored code", w: 0.14 },
    { label: "Comparator", sub: "4-bit ==", w: 0.17 },
    { label: "Attempt\nCounter", sub: "2-bit", w: 0.15 },
    { label: "Lockout\nTimer", sub: "countdown", w: 0.16 }
  ];

  let totalFrac = 0;
  for (let b of blocks) totalFrac += b.w;
  let usableW = sw - 20 - gap * (blocks.length - 1);
  let bx = sx + 10;

  for (let k = 0; k < blocks.length; k++) {
    let bw = usableW * (blocks[k].w / totalFrac);
    drawHWBlock(bx, blockY, bw, blockH, blocks[k].label, blocks[k].sub, COLOR_DP_BOX);

    // Arrows between blocks
    if (k < blocks.length - 1 && k < 2) {
      drawArrowLine(bx + bw, blockY + blockH / 2, bx + bw + gap, blockY + blockH / 2, COLOR_DP_BOX, 1);
    }
    bx += bw + gap;
  }

  // Signal labels below blocks
  fill('#666');
  noStroke();
  textSize(7);
  textAlign(CENTER, TOP);
  let labY = blockY + blockH + 6;

  // digit_value under Digit Register
  let bx0 = sx + 10 + usableW * (blocks[0].w / totalFrac) / 2;
  text("digit_value[3:0]", bx0, labY);

  // match under Comparator
  let bx2start = sx + 10;
  for (let k = 0; k < 2; k++) bx2start += usableW * (blocks[k].w / totalFrac) + gap;
  let bx2 = bx2start + usableW * (blocks[2].w / totalFrac) / 2;
  text("match", bx2, labY);

  // attempt_count under Attempt Counter
  let bx3start = bx2start + usableW * (blocks[2].w / totalFrac) + gap;
  let bx3 = bx3start + usableW * (blocks[3].w / totalFrac) / 2;
  text("attempt_count", bx3, labY);

  // lockout_en under Lockout Timer
  let bx4start = bx3start + usableW * (blocks[3].w / totalFrac) + gap;
  let bx4 = bx4start + usableW * (blocks[4].w / totalFrac) / 2;
  text("lockout_en", bx4, labY);

  // Live values
  textSize(7);
  fill(COLOR_DP_BOX);
  textStyle(BOLD);
  let digStr = enteredDigits.length > 0 ? enteredDigits.join("") : "----";
  text(digStr, bx0, labY + 10);
  text(currentState === STATE_UNLOCKED ? "1" : "0", bx2, labY + 10);
  text(String(failedAttempts), bx3, labY + 10);
  text(currentState === STATE_LOCKED_OUT ? Math.ceil(lockoutTimer) + "s" : "off", bx4, labY + 10);
  textStyle(NORMAL);
}

function drawHWBlock(x, y, w, h, label, sub, col) {
  fill(255);
  stroke(col);
  strokeWeight(1.5);
  rect(x, y, w, h, 4);

  fill(col);
  noStroke();
  textSize(8);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(label, x + w / 2, y + h / 2 - 4);
  textStyle(NORMAL);
  textSize(6);
  fill('#999');
  text(sub, x + w / 2, y + h - 8);
}

// ═══════════════════════════════════════════
//  I/O SECTION (bottom) — Keypad left, Display+Lock right
// ═══════════════════════════════════════════
function drawIOSection(sx, sy, sw, sh) {
  let inputW = sw * 0.45;
  let outputW = sw * 0.52;
  let gapW = sw - inputW - outputW;

  // --- Input Subsystem (left) ---
  let inX = sx, inY = sy, inW = inputW, inH = sh;
  fill(COLOR_IN_BG);
  stroke('#FFCC80');
  strokeWeight(1.5);
  rect(inX, inY, inW, inH, 6);

  fill(COLOR_IN_BOX);
  noStroke();
  textSize(11);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text("User Interface (Input)", inX + 8, inY + 4);
  textStyle(NORMAL);

  // Compact keypad inside
  drawCompactKeypad(inX + 6, inY + 22, inW - 12, inH - 28);

  // --- Output Subsystem (right) ---
  let outX = sx + inputW + gapW, outY = sy, outW = outputW, outH = sh;
  fill(COLOR_OUT_BG);
  stroke('#A5D6A7');
  strokeWeight(1.5);
  rect(outX, outY, outW, outH, 6);

  fill(COLOR_OUT_BOX);
  noStroke();
  textSize(11);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text("Status Output", outX + 8, outY + 4);
  textStyle(NORMAL);

  // Digit display
  drawDigitDisplay(outX + 8, outY + 22, outW - 16, 60);

  // Lock icon
  let lockCx = outX + outW / 2;
  let lockCy = outY + 110;
  drawLockIcon(lockCx, lockCy);

  // Status text
  fill(statusColor);
  noStroke();
  textSize(11);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text(statusMessage, lockCx, lockCy + 42);
  textStyle(NORMAL);

  // Attempt counter
  if (currentState === STATE_LOCKED_OUT) {
    fill(COLOR_LOCKOUT);
    textSize(13);
    textStyle(BOLD);
    text("Lockout: " + Math.ceil(lockoutTimer) + "s", lockCx, lockCy + 58);
    textStyle(NORMAL);
  } else {
    fill(100);
    textSize(9);
    text("Attempts: " + failedAttempts + " / " + maxAttempts, lockCx, lockCy + 58);
  }
}

function drawCompactKeypad(kx, ky, kw, kh) {
  let btnCols = 3, btnRows = 4;
  let btnGap = 4;
  let btnW = (kw - btnGap * (btnCols - 1)) / btnCols;
  let btnH = (kh - btnGap * (btnRows - 1)) / btnRows;
  if (btnH > 48) btnH = 48;

  keypadButtons = [];
  let disabled = (currentState === STATE_LOCKED_OUT);

  for (let row = 0; row < btnRows; row++) {
    for (let col = 0; col < btnCols; col++) {
      let label = keypadLabels[row][col];
      let bx = kx + col * (btnW + btnGap);
      let by = ky + row * (btnH + btnGap);

      keypadButtons.push({ x: bx, y: by, w: btnW, h: btnH, label: label });

      let isHover = isInside(mouseX, mouseY, { x: bx, y: by, w: btnW, h: btnH });
      let btnColor;
      if (label === 'C') btnColor = isHover ? '#EF5350' : '#FFCDD2';
      else if (label === 'E') btnColor = isHover ? '#66BB6A' : '#C8E6C9';
      else btnColor = isHover ? '#CFD8DC' : '#ECEFF1';
      if (disabled) btnColor = '#E0E0E0';

      fill(btnColor);
      stroke(disabled ? '#CCC' : '#B0BEC5');
      strokeWeight(1);
      rect(bx, by, btnW, btnH, 5);

      fill(disabled ? '#CCC' : (label === 'C' ? '#C62828' : (label === 'E' ? '#2E7D32' : '#37474F')));
      noStroke();
      textSize(label === 'E' || label === 'C' ? 10 : 16);
      textStyle(BOLD);
      textAlign(CENTER, CENTER);
      text(label === 'E' ? 'Enter' : (label === 'C' ? 'Clr' : label), bx + btnW / 2, by + btnH / 2);
      textStyle(NORMAL);
    }
  }
}

function drawDigitDisplay(dx, dy, dw, dh) {
  let digitW = (dw - 30) / 4;
  let digitH = dh - 10;
  let digitGap = 6;
  let totalDW = 4 * digitW + 3 * digitGap;
  let startX = dx + (dw - totalDW) / 2;
  let shakeX = shakeAmount > 0 ? random(-shakeAmount, shakeAmount) : 0;

  let bgColor = (currentState === STATE_UNLOCKED) ? '#C8E6C9' :
                (currentState === STATE_LOCKED_OUT) ? '#FFCDD2' : '#BBDEFB';
  fill(bgColor);
  stroke(200);
  strokeWeight(1);
  rect(dx, dy, dw, dh, 5);

  for (let i = 0; i < 4; i++) {
    let ddx = startX + i * (digitW + digitGap) + shakeX;
    let entered = (i < enteredDigits.length);
    fill(entered ? '#FFF' : '#F5F5F5');
    stroke(entered ? COLOR_IDLE : '#CCC');
    strokeWeight(entered ? 1.5 : 0.8);
    rect(ddx, dy + 5, digitW, digitH, 3);

    if (entered) {
      fill(50);
      noStroke();
      textSize(18);
      textAlign(CENTER, CENTER);
      textStyle(BOLD);
      text(currentState === STATE_UNLOCKED ? enteredDigits[i] : "*", ddx + digitW / 2, dy + 5 + digitH / 2);
      textStyle(NORMAL);
    }
  }
}

function drawLockIcon(cx, cy) {
  let sz = 36;
  push();
  translate(cx, cy);

  let isUnlocked = (currentState === STATE_UNLOCKED);
  let isLockedOut = (currentState === STATE_LOCKED_OUT);

  fill(isUnlocked ? COLOR_UNLOCKED : (isLockedOut ? COLOR_LOCKOUT : '#78909C'));
  stroke(isUnlocked ? '#388E3C' : (isLockedOut ? '#D84315' : '#546E7A'));
  strokeWeight(2);
  rect(-sz / 2, 0, sz, sz * 0.7, 4);

  noFill();
  stroke(isUnlocked ? COLOR_UNLOCKED : (isLockedOut ? COLOR_LOCKOUT : '#78909C'));
  strokeWeight(4);
  if (isUnlocked) {
    push();
    rotate(radians(lockAngle));
    arc(-4, -sz * 0.05, sz * 0.45, sz * 0.5, PI, TWO_PI);
    pop();
  } else {
    arc(0, 0, sz * 0.45, sz * 0.5, PI, TWO_PI);
  }

  fill(isUnlocked ? '#E8F5E9' : (isLockedOut ? '#FFCDD2' : '#455A64'));
  noStroke();
  ellipse(0, sz * 0.25, 8, 8);
  rect(-2, sz * 0.25, 4, sz * 0.15);
  pop();

  fill(isUnlocked ? COLOR_UNLOCKED : (isLockedOut ? COLOR_LOCKOUT : '#78909C'));
  noStroke();
  textSize(10);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  let lockLabel = isUnlocked ? "UNLOCKED" : (isLockedOut ? "LOCKED OUT" : "LOCKED");
  text(lockLabel, cx, cy + sz * 0.7 + 4);
  textStyle(NORMAL);
}

// ═══════════════════════════════════════════
//  SIGNAL ARROWS between sections
// ═══════════════════════════════════════════
function drawSignalArrows(margin, fsmY, fsmH, dpY, dpH, ioY, ioH) {
  let sw = canvasWidth - 2 * margin;

  // --- FSM ↔ Datapath arrows ---
  let fsmBot = fsmY + fsmH;
  let dpTop = dpY;
  let midFD = (fsmBot + dpTop) / 2;

  // Control signals down: digit_done, check_en, unlock_en, lockout_en
  let labels_fd = ["digit_done", "check_en", "unlock_en", "lockout_en"];
  let nArrows = labels_fd.length;
  for (let i = 0; i < nArrows; i++) {
    let ax = margin + sw * (0.15 + 0.2 * i);
    // Down arrow (FSM → Datapath)
    stroke(COLOR_SIGNAL);
    strokeWeight(1.2);
    drawingContext.setLineDash([]);
    line(ax, fsmBot + 1, ax, dpTop - 1);
    // Arrowhead
    fill(COLOR_SIGNAL);
    noStroke();
    triangle(ax, dpTop - 1, ax - 3, dpTop - 6, ax + 3, dpTop - 6);
    // Label
    textSize(7);
    textAlign(CENTER, CENTER);
    fill(COLOR_SIGNAL);
    text(labels_fd[i], ax, midFD);
  }

  // match signal up: Datapath → FSM
  let matchX = margin + sw * 0.88;
  stroke('#E91E63');
  strokeWeight(1.2);
  line(matchX, dpTop - 1, matchX, fsmBot + 1);
  fill('#E91E63');
  noStroke();
  triangle(matchX, fsmBot + 1, matchX - 3, fsmBot + 6, matchX + 3, fsmBot + 6);
  textSize(7);
  textAlign(CENTER, CENTER);
  text("match↑", matchX, midFD);

  // --- Datapath ↔ I/O arrows ---
  let dpBot = dpY + dpH;
  let ioTop = ioY;
  let midDI = (dpBot + ioTop) / 2;

  // digit_value: Input → Datapath (up)
  let dvX = margin + sw * 0.2;
  stroke(COLOR_IN_BOX);
  strokeWeight(1.2);
  line(dvX, ioTop, dvX, dpBot);
  fill(COLOR_IN_BOX);
  noStroke();
  triangle(dvX, dpBot, dvX - 3, dpBot + 5, dvX + 3, dpBot + 5);
  textSize(7);
  textAlign(CENTER, CENTER);
  fill(COLOR_IN_BOX);
  text("digit_value", dvX + 1, midDI);

  // enter_pulse: Input → FSM (up, left side)
  let epX = margin + sw * 0.08;
  stroke(COLOR_IN_BOX);
  strokeWeight(1.2);
  drawingContext.setLineDash([4, 3]);
  line(epX, ioTop, epX, fsmY + fsmH);
  drawingContext.setLineDash([]);
  fill(COLOR_IN_BOX);
  noStroke();
  triangle(epX, fsmY + fsmH, epX - 3, fsmY + fsmH + 5, epX + 3, fsmY + fsmH + 5);
  textSize(7);
  textAlign(LEFT, CENTER);
  text("enter_pulse", epX + 4, (ioTop + fsmY + fsmH) / 2);

  // display_data: Datapath → Output (down, right side)
  let ddX = margin + sw * 0.7;
  stroke(COLOR_OUT_BOX);
  strokeWeight(1.2);
  line(ddX, dpBot, ddX, ioTop);
  fill(COLOR_OUT_BOX);
  noStroke();
  triangle(ddX, ioTop, ddX - 3, ioTop - 5, ddX + 3, ioTop - 5);
  textSize(7);
  textAlign(CENTER, CENTER);
  fill(COLOR_OUT_BOX);
  text("display_data", ddX, midDI);

  // lock_status: FSM → Output (right edge, long vertical)
  let lsX = margin + sw * 0.95;
  stroke(COLOR_OUT_BOX);
  strokeWeight(1.2);
  drawingContext.setLineDash([4, 3]);
  line(lsX, fsmY + fsmH, lsX, ioTop);
  drawingContext.setLineDash([]);
  fill(COLOR_OUT_BOX);
  noStroke();
  triangle(lsX, ioTop, lsX - 3, ioTop - 5, lsX + 3, ioTop - 5);
  textSize(7);
  textAlign(RIGHT, CENTER);
  fill(COLOR_OUT_BOX);
  text("lock_status", lsX - 4, (fsmY + fsmH + ioTop) / 2);
}

// ═══════════════════════════════════════════
//  UTILITY
// ═══════════════════════════════════════════
function drawArrowLine(x1, y1, x2, y2, col, sw) {
  stroke(col);
  strokeWeight(sw);
  drawingContext.setLineDash([]);
  line(x1, y1, x2, y2);

  let angle = atan2(y2 - y1, x2 - x1);
  let aSize = 5;
  fill(col);
  noStroke();
  push();
  translate(x2, y2);
  rotate(angle);
  triangle(0, 0, -aSize, -aSize / 2, -aSize, aSize / 2);
  pop();
}

// ─── Functional logic (unchanged) ───

function handleKeyPress(label) {
  if (currentState === STATE_LOCKED_OUT) return;

  if (label === 'C') {
    enteredDigits = [];
    currentState = STATE_IDLE;
    statusMessage = "Enter 4-digit code";
    statusColor = COLOR_IDLE;
    return;
  }

  if (label === 'E') {
    if (enteredDigits.length === 4) {
      currentState = STATE_CHECK;
      checkCode();
    } else {
      statusMessage = "Enter all 4 digits first";
      statusColor = '#FF9800';
      shakeAmount = 5;
    }
    return;
  }

  if (currentState === STATE_UNLOCKED) return;

  let digit = parseInt(label);
  if (enteredDigits.length < 4) {
    enteredDigits.push(digit);

    switch (enteredDigits.length) {
      case 1:
        currentState = STATE_DIGIT_1;
        statusMessage = "Enter digit 2...";
        statusColor = COLOR_IDLE;
        break;
      case 2:
        currentState = STATE_DIGIT_2;
        statusMessage = "Enter digit 3...";
        statusColor = COLOR_IDLE;
        break;
      case 3:
        currentState = STATE_DIGIT_3;
        statusMessage = "Enter digit 4...";
        statusColor = COLOR_IDLE;
        break;
      case 4:
        currentState = STATE_DIGIT_4;
        currentState = STATE_CHECK;
        checkCode();
        break;
    }
  }
}

function checkCode() {
  let correct = true;
  for (let i = 0; i < 4; i++) {
    if (enteredDigits[i] !== correctCode[i]) {
      correct = false;
      break;
    }
  }

  if (correct) {
    currentState = STATE_UNLOCKED;
    statusMessage = "ACCESS GRANTED!";
    statusColor = COLOR_UNLOCKED;
    targetLockAngle = -30;
    flashTimer = 30;
  } else {
    failedAttempts++;
    shakeAmount = 10;

    if (failedAttempts >= maxAttempts) {
      currentState = STATE_LOCKED_OUT;
      statusMessage = "TOO MANY ATTEMPTS";
      statusColor = COLOR_LOCKOUT;
      lockoutStartTime = millis();
      lockoutTimer = lockoutDuration;
      enteredDigits = [];
    } else {
      currentState = STATE_IDLE;
      statusMessage = "WRONG (" + (maxAttempts - failedAttempts) + " left)";
      statusColor = COLOR_LOCKED;
      enteredDigits = [];
    }
  }
}

function resetSystem() {
  currentState = STATE_IDLE;
  enteredDigits = [];
  failedAttempts = 0;
  lockoutTimer = 0;
  statusMessage = "Enter 4-digit code";
  statusColor = COLOR_IDLE;
  targetLockAngle = 0;
  shakeAmount = 0;
  flashTimer = 0;
}

function mousePressed() {
  for (let i = 0; i < keypadButtons.length; i++) {
    let btn = keypadButtons[i];
    if (isInside(mouseX, mouseY, btn)) {
      handleKeyPress(btn.label);
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
