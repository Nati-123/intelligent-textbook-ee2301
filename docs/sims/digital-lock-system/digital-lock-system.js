// Digital Lock System MicroSim
// Complete digital lock with keypad, FSM controller, and lockout security

let containerWidth;
let canvasWidth = 400;
let drawHeight = 550;
let controlHeight = 50;
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
const COLOR_KEYPAD = '#ECEFF1';

// Button bounds
let keypadButtons = [];
let _resetBtn;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  describe('Digital combination lock with keypad input, FSM controller, and lockout security feature', LABEL);
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

  // Shake decay
  if (shakeAmount > 0) {
    shakeAmount *= 0.9;
    if (shakeAmount < 0.1) shakeAmount = 0;
  }

  // Flash timer decay
  if (flashTimer > 0) flashTimer--;

  drawFSMDisplay();
  drawDisplay();
  drawLockIcon();
  drawKeypad();
  drawControls();

  // Hand cursor on hover
  let hovering = false;
  for (let i = 0; i < keypadButtons.length; i++) {
    if (isInside(mouseX, mouseY, keypadButtons[i])) { hovering = true; break; }
  }
  if (_resetBtn && isInside(mouseX, mouseY, _resetBtn)) hovering = true;
  cursor(hovering ? HAND : ARROW);
}

function drawFSMDisplay() {
  let fsmY = 10;
  let fsmH = 70;

  fill(255);
  stroke(200);
  strokeWeight(1);
  rect(10, fsmY, canvasWidth - 20, fsmH, 5);

  fill(80);
  noStroke();
  textSize(11);
  textAlign(LEFT, TOP);
  text("FSM Controller", 18, fsmY + 6);

  let stateBoxW = max(55, (canvasWidth - 80) / 8);
  let stateBoxH = 24;
  let startX = 18;
  let stateY = fsmY + 32;

  for (let i = 0; i < stateNames.length; i++) {
    let sx = startX + i * (stateBoxW + 4);
    let isCurrent = (currentState === i);

    let boxColor;
    if (isCurrent) {
      if (i === STATE_UNLOCKED) boxColor = COLOR_UNLOCKED;
      else if (i === STATE_LOCKED_OUT) boxColor = COLOR_LOCKOUT;
      else if (i === STATE_CHECK) boxColor = '#FF9800';
      else boxColor = COLOR_IDLE;
    } else {
      boxColor = '#E0E0E0';
    }

    fill(boxColor);
    stroke(isCurrent ? '#333' : '#BDBDBD');
    strokeWeight(isCurrent ? 2 : 1);
    rect(sx, stateY, stateBoxW, stateBoxH, 3);

    fill(isCurrent ? 255 : '#999');
    noStroke();
    textSize(7);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text(stateNames[i], sx + stateBoxW / 2, stateY + stateBoxH / 2);
    textStyle(NORMAL);

    if (i < stateNames.length - 1) {
      fill('#BDBDBD');
      noStroke();
      let ax = sx + stateBoxW + 2;
      triangle(ax, stateY + stateBoxH / 2,
               ax - 3, stateY + stateBoxH / 2 - 3,
               ax - 3, stateY + stateBoxH / 2 + 3);
    }
  }
}

function drawDisplay() {
  let dispY = 90;
  let dispH = 120;
  let dispX = 10;
  let dispW = canvasWidth * 0.6;

  let bgColor = (currentState === STATE_UNLOCKED) ? '#E8F5E9' :
                (currentState === STATE_LOCKED_OUT) ? '#FFEBEE' : '#E3F2FD';
  fill(bgColor);
  stroke(200);
  strokeWeight(1);
  rect(dispX, dispY, dispW, dispH, 8);

  let digitAreaY = dispY + 10;
  let digitW = 40;
  let digitH = 50;
  let digitGap = 10;
  let totalDigitW = 4 * digitW + 3 * digitGap;
  let digitStartX = dispX + (dispW - totalDigitW) / 2;

  let shakeX = shakeAmount > 0 ? random(-shakeAmount, shakeAmount) : 0;

  for (let i = 0; i < 4; i++) {
    let dx = digitStartX + i * (digitW + digitGap) + shakeX;

    let digitEntered = (i < enteredDigits.length);
    fill(digitEntered ? '#FFF' : '#F5F5F5');
    stroke(digitEntered ? COLOR_IDLE : '#CCC');
    strokeWeight(digitEntered ? 2 : 1);
    rect(dx, digitAreaY, digitW, digitH, 5);

    if (digitEntered) {
      fill(50);
      noStroke();
      textSize(24);
      textAlign(CENTER, CENTER);
      textStyle(BOLD);
      if (currentState === STATE_UNLOCKED) {
        text(enteredDigits[i], dx + digitW / 2, digitAreaY + digitH / 2);
      } else {
        text("*", dx + digitW / 2, digitAreaY + digitH / 2);
      }
      textStyle(NORMAL);
    }
  }

  // Status message
  fill(statusColor);
  noStroke();
  textSize(13);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text(statusMessage, dispX + dispW / 2, digitAreaY + digitH + 20);
  textStyle(NORMAL);

  // Attempt counter
  let attY = digitAreaY + digitH + 38;
  fill(100);
  textSize(10);
  textAlign(CENTER, CENTER);
  text("Attempts: " + failedAttempts + " / " + maxAttempts, dispX + dispW / 2, attY);

  if (currentState === STATE_LOCKED_OUT) {
    fill(COLOR_LOCKOUT);
    textSize(16);
    textStyle(BOLD);
    text("Lockout: " + Math.ceil(lockoutTimer) + "s", dispX + dispW / 2, attY + 20);
    textStyle(NORMAL);
  }
}

function drawLockIcon() {
  let lockX = canvasWidth * 0.6 + 30 + (canvasWidth * 0.4 - 30) / 2;
  let lockY = 140;
  let lockSize = 50;

  push();
  translate(lockX, lockY);

  let isUnlocked = (currentState === STATE_UNLOCKED);
  let isLockedOut = (currentState === STATE_LOCKED_OUT);

  fill(isUnlocked ? COLOR_UNLOCKED : (isLockedOut ? COLOR_LOCKOUT : '#78909C'));
  stroke(isUnlocked ? '#388E3C' : (isLockedOut ? '#D84315' : '#546E7A'));
  strokeWeight(3);
  rect(-lockSize / 2, 0, lockSize, lockSize * 0.7, 5);

  noFill();
  stroke(isUnlocked ? COLOR_UNLOCKED : (isLockedOut ? COLOR_LOCKOUT : '#78909C'));
  strokeWeight(5);

  if (isUnlocked) {
    push();
    rotate(radians(lockAngle));
    arc(-5, -lockSize * 0.05, lockSize * 0.5, lockSize * 0.6, PI, TWO_PI);
    pop();
  } else {
    arc(0, 0, lockSize * 0.5, lockSize * 0.6, PI, TWO_PI);
  }

  fill(isUnlocked ? '#E8F5E9' : (isLockedOut ? '#FFCDD2' : '#455A64'));
  noStroke();
  ellipse(0, lockSize * 0.25, 12, 12);
  rect(-3, lockSize * 0.25, 6, lockSize * 0.2);

  pop();

  fill(isUnlocked ? COLOR_UNLOCKED : (isLockedOut ? COLOR_LOCKOUT : '#78909C'));
  noStroke();
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  let lockLabel = isUnlocked ? "UNLOCKED" : (isLockedOut ? "LOCKED OUT" : "LOCKED");
  text(lockLabel, lockX, lockY + lockSize * 0.7 + 10);
  textStyle(NORMAL);
}

function drawKeypad() {
  let kpStartY = 225;
  let kpX = canvasWidth / 2;
  let btnSize = 55;
  let btnGap = 8;
  let totalW = 3 * btnSize + 2 * btnGap;
  let startX = kpX - totalW / 2;

  keypadButtons = [];

  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 3; col++) {
      let label = keypadLabels[row][col];
      let bx = startX + col * (btnSize + btnGap);
      let by = kpStartY + row * (btnSize + btnGap);

      keypadButtons.push({ x: bx, y: by, w: btnSize, h: btnSize, label: label });

      let isHover = isInside(mouseX, mouseY, { x: bx, y: by, w: btnSize, h: btnSize });

      let btnColor;
      if (label === 'C') {
        btnColor = isHover ? '#EF5350' : '#FFCDD2';
      } else if (label === 'E') {
        btnColor = isHover ? '#66BB6A' : '#C8E6C9';
      } else {
        btnColor = isHover ? '#CFD8DC' : COLOR_KEYPAD;
      }

      let disabled = (currentState === STATE_LOCKED_OUT);
      if (disabled) btnColor = '#E0E0E0';

      fill(btnColor);
      stroke(disabled ? '#CCC' : '#B0BEC5');
      strokeWeight(1.5);
      rect(bx, by, btnSize, btnSize, 8);

      fill(disabled ? '#CCC' : (label === 'C' ? '#C62828' : (label === 'E' ? '#2E7D32' : '#37474F')));
      noStroke();
      textSize(label === 'E' ? 14 : (label === 'C' ? 14 : 22));
      textStyle(BOLD);
      textAlign(CENTER, CENTER);
      text(label === 'E' ? 'Enter' : (label === 'C' ? 'Clear' : label), bx + btnSize / 2, by + btnSize / 2);
      textStyle(NORMAL);
    }
  }
}

function drawControls() {
  fill(230);
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  let btnW = 100;
  let btnH = 34;
  let btnX = canvasWidth / 2 - btnW / 2;
  let btnY = drawHeight + 8;

  _resetBtn = { x: btnX, y: btnY, w: btnW, h: btnH };

  fill('#F44336');
  stroke('#C62828');
  strokeWeight(2);
  rect(btnX, btnY, btnW, btnH, 5);

  fill(255);
  noStroke();
  textSize(13);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text("Reset System", btnX + btnW / 2, btnY + btnH / 2);
  textStyle(NORMAL);
}

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
        // Auto-check after 4th digit
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
      statusMessage = "TOO MANY ATTEMPTS - LOCKED OUT";
      statusColor = COLOR_LOCKOUT;
      lockoutStartTime = millis();
      lockoutTimer = lockoutDuration;
      enteredDigits = [];
    } else {
      currentState = STATE_IDLE;
      statusMessage = "WRONG CODE (" + (maxAttempts - failedAttempts) + " attempts left)";
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
  // Check Reset button
  if (_resetBtn && isInside(mouseX, mouseY, _resetBtn)) {
    resetSystem();
    return;
  }

  // Check keypad buttons
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
