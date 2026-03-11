// Shift Register Simulator MicroSim
// Interactive 4-bit shift register with animated bit movement
// Bloom Level: Understand/Apply (L2-L3)

let containerWidth;
let canvasWidth = 400;
let drawHeight = 440;
let controlHeight = 110;
let canvasHeight = drawHeight + controlHeight;

let bits = [false, false, false, false];
let serialIn = false;
let shiftBtn, clearBtn, toggleInBtn;
let clockCount = 0;

// Animation state
let animating = false;
let animProgress = 0;       // 0..1
const ANIM_DURATION = 28;   // frames
let animFrame = 0;
let prevBits = [false, false, false, false];
let prevSerialIn = false;
let clockFlash = 0;         // frames remaining for clock flash

const colors = {
  high:  '#4CAF50',
  low:   '#F44336',
  ff:    '#2196F3',
  ffStroke: '#1565C0',
  wire:  '#666',
  bg:    '#f5f5f5',
  text:  '#212121',
  arrow: '#5A3EED',
  clock: '#FF9800',
  clockFlash: '#FFF3E0',
  msbLsb: '#7B1FA2'
};

// Layout constants computed in updateLayout()
let ffW, ffH, gap, startX, regY;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  toggleInBtn = createButton('Serial In (SI): 0');
  toggleInBtn.mousePressed(() => {
    if (animating) return;
    serialIn = !serialIn;
    toggleInBtn.html('Serial In (SI): ' + (serialIn ? '1' : '0'));
  });

  shiftBtn = createButton('⏱ Shift Right (CLK)');
  shiftBtn.mousePressed(() => {
    if (animating) return;
    startShiftAnimation();
  });

  clearBtn = createButton('Clear');
  clearBtn.mousePressed(() => {
    if (animating) return;
    bits = [false, false, false, false];
    clockCount = 0;
  });

  styleButton(toggleInBtn);
  styleButton(shiftBtn);
  styleButton(clearBtn);

  positionUIElements();
  describe('Interactive 4-bit shift register simulator with animated data flow', LABEL);
}

function styleButton(btn) {
  btn.style('font-family', 'Arial, sans-serif');
  btn.style('font-size', '13px');
  btn.style('padding', '7px 14px');
  btn.style('border', '2px solid #1565C0');
  btn.style('border-radius', '6px');
  btn.style('background', '#E3F2FD');
  btn.style('color', '#1565C0');
  btn.style('cursor', 'pointer');
  btn.style('font-weight', '600');
}

function positionUIElements() {
  let mainRect = document.querySelector('main').getBoundingClientRect();
  let btnY = mainRect.top + drawHeight + 14;
  let totalW = canvasWidth;
  // Center buttons in a row
  let btnWidths = [150, 170, 80];
  let btnGap = 12;
  let totalBtnW = btnWidths.reduce((a,b)=>a+b,0) + btnGap * 2;
  let btnStartX = mainRect.left + (totalW - totalBtnW) / 2;

  toggleInBtn.position(btnStartX, btnY);
  toggleInBtn.style('width', btnWidths[0] + 'px');
  shiftBtn.position(btnStartX + btnWidths[0] + btnGap, btnY);
  shiftBtn.style('width', btnWidths[1] + 'px');
  clearBtn.position(btnStartX + btnWidths[0] + btnWidths[1] + btnGap * 2, btnY);
  clearBtn.style('width', btnWidths[2] + 'px');
}

function startShiftAnimation() {
  // Snapshot current state
  prevBits = [...bits];
  prevSerialIn = serialIn;
  animating = true;
  animFrame = 0;
  animProgress = 0;
  clockFlash = 18;
  clockCount++;

  // Perform the actual shift
  for (let i = bits.length - 1; i > 0; i--) {
    bits[i] = bits[i - 1];
  }
  bits[0] = serialIn;
}

function updateLayout() {
  ffW = Math.min(70, canvasWidth * 0.15);
  ffH = 72;
  gap = Math.min(28, canvasWidth * 0.05);
  let totalRegW = 4 * ffW + 3 * gap;
  startX = (canvasWidth - totalRegW) / 2;
  regY = 145;
}

function draw() {
  updateCanvasSize();
  updateLayout();

  // Animation update
  if (animating) {
    animFrame++;
    animProgress = constrain(animFrame / ANIM_DURATION, 0, 1);
    if (animFrame >= ANIM_DURATION) {
      animating = false;
      animProgress = 1;
    }
  }
  if (clockFlash > 0) clockFlash--;

  // Background
  noStroke();
  fill(colors.bg);
  rect(0, 0, canvasWidth, drawHeight, 0);

  // Control area
  fill('white');
  stroke('#ddd');
  strokeWeight(1);
  rect(0, drawHeight, canvasWidth, controlHeight);

  drawTitle();
  drawFlowArrow();
  drawShiftRegister();
  drawClockPulse();
  drawValueDisplay();
  drawInstructions();
}

function drawTitle() {
  fill(colors.text);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(17);
  textStyle(BOLD);
  text('4-Bit SISO Shift Register', canvasWidth / 2, 12);
  textStyle(NORMAL);
  textSize(12);
  fill('#666');
  text('Serial-In Serial-Out  —  Data flows from SI → Q3 → Q2 → Q1 → Q0 → SO', canvasWidth / 2, 34);
}

function drawFlowArrow() {
  // Large direction arrow above the register
  let arrowY = regY - 28;
  let arrowLeft = startX + 10;
  let arrowRight = startX + 4 * ffW + 3 * gap - 10;

  stroke(colors.arrow);
  strokeWeight(2.5);
  line(arrowLeft, arrowY, arrowRight, arrowY);
  // Arrowhead
  fill(colors.arrow);
  noStroke();
  triangle(arrowRight, arrowY, arrowRight - 10, arrowY - 5, arrowRight - 10, arrowY + 5);

  textAlign(CENTER, BOTTOM);
  textSize(11);
  fill(colors.arrow);
  textStyle(BOLD);
  text('Shift Direction  →', (arrowLeft + arrowRight) / 2, arrowY - 5);
  textStyle(NORMAL);
}

function drawShiftRegister() {
  let y = regY;

  // ---- Serial In indicator ----
  let siX = startX - 44;
  let siY = y + ffH / 2;
  let siVal = animating ? prevSerialIn : serialIn;

  fill(siVal ? colors.high : colors.low);
  stroke(colors.wire);
  strokeWeight(2);
  ellipse(siX, siY, 36);
  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(15);
  textStyle(BOLD);
  text(siVal ? '1' : '0', siX, siY);
  textStyle(NORMAL);
  fill(colors.text);
  textSize(9);
  textStyle(BOLD);
  text('Serial In', siX, siY + 28);
  text('(SI)', siX, siY + 39);
  textStyle(NORMAL);

  // Wire from SI to first FF
  stroke(siVal ? colors.high : colors.low);
  strokeWeight(2);
  line(siX + 18, siY, startX, siY);
  // small arrowhead
  fill(siVal ? colors.high : colors.low);
  noStroke();
  triangle(startX, siY, startX - 6, siY - 3, startX - 6, siY + 3);

  // ---- Animated traveling bits ----
  if (animating && animProgress < 1) {
    drawTravelingBits(y);
  }

  // ---- Flip-flops ----
  for (let i = 0; i < 4; i++) {
    let x = startX + i * (ffW + gap);
    let bitVal;
    if (animating) {
      // Show previous values during animation, switch at end
      bitVal = animProgress >= 1 ? bits[i] : prevBits[i];
    } else {
      bitVal = bits[i];
    }

    // FF box - flash on clock
    let boxFill = colors.ff;
    if (clockFlash > 10) {
      boxFill = lerpColor(color(colors.ff), color('#BBDEFB'), 0.5 * (1 - (clockFlash - 10) / 8));
    }
    fill(boxFill);
    stroke(colors.ffStroke);
    strokeWeight(2);
    rect(x, y, ffW, ffH, 6);

    // D label (left)
    fill('white');
    noStroke();
    textSize(10);
    textAlign(LEFT, CENTER);
    text('D', x + 5, y + 14);

    // Q label (right)
    textAlign(RIGHT, CENTER);
    text('Q', x + ffW - 5, y + 14);

    // Clock triangle (bottom-left)
    fill('#BBDEFB');
    noStroke();
    triangle(x, y + ffH - 14, x + 10, y + ffH - 8, x, y + ffH - 2);

    // FF name
    fill('white');
    textAlign(CENTER, CENTER);
    textSize(13);
    textStyle(BOLD);
    text('FF' + i, x + ffW / 2, y + ffH / 2 - 2);
    textStyle(NORMAL);

    // Current value bubble below FF
    let bubbleY = y + ffH + 26;
    fill(bitVal ? colors.high : colors.low);
    noStroke();
    ellipse(x + ffW / 2, bubbleY, 32);
    fill('white');
    textSize(15);
    textStyle(BOLD);
    text(bitVal ? '1' : '0', x + ffW / 2, bubbleY);
    textStyle(NORMAL);

    // Bit label Q3..Q0
    fill(colors.text);
    textSize(11);
    textStyle(BOLD);
    text('Q' + (3 - i), x + ffW / 2, bubbleY + 24);
    textStyle(NORMAL);

    // MSB / LSB label
    if (i === 0) {
      fill(colors.msbLsb);
      textSize(9);
      textStyle(BOLD);
      text('(MSB)', x + ffW / 2, bubbleY + 37);
      textStyle(NORMAL);
    }
    if (i === 3) {
      fill(colors.msbLsb);
      textSize(9);
      textStyle(BOLD);
      text('(LSB)', x + ffW / 2, bubbleY + 37);
      textStyle(NORMAL);
    }

    // Wire to next FF
    if (i < 3) {
      let wireColor = bitVal ? colors.high : colors.low;
      stroke(wireColor);
      strokeWeight(2);
      let wx1 = x + ffW;
      let wx2 = x + ffW + gap;
      let wy = y + ffH / 2;
      line(wx1, wy, wx2, wy);
      // small arrowhead on wire
      fill(wireColor);
      noStroke();
      triangle(wx2, wy, wx2 - 6, wy - 3, wx2 - 6, wy + 3);
    }
  }

  // ---- Serial Out indicator ----
  let lastX = startX + 3 * (ffW + gap) + ffW;
  let soX = lastX + 44;
  let soY = y + ffH / 2;
  let soVal = animating && animProgress < 1 ? prevBits[3] : bits[3];

  // Wire from last FF
  stroke(soVal ? colors.high : colors.low);
  strokeWeight(2);
  line(lastX, soY, soX - 18, soY);
  fill(soVal ? colors.high : colors.low);
  noStroke();
  triangle(soX - 18, soY, soX - 24, soY - 3, soX - 24, soY + 3);

  // SO circle
  fill(soVal ? colors.high : colors.low);
  stroke(colors.wire);
  strokeWeight(2);
  ellipse(soX, soY, 36);
  fill('white');
  noStroke();
  textSize(15);
  textStyle(BOLD);
  text(soVal ? '1' : '0', soX, soY);
  textStyle(NORMAL);
  fill(colors.text);
  textSize(9);
  textStyle(BOLD);
  text('Serial Out', soX, soY + 28);
  text('(SO)', soX, soY + 39);
  textStyle(NORMAL);
}

function drawTravelingBits(y) {
  // Draw small circles moving from each FF to the next
  let eased = easeInOutCubic(animProgress);
  let bubbleSize = 18;
  let travelY = y + ffH / 2;

  // SI → FF0
  let fromX = startX - 24;
  let toX = startX + ffW / 2;
  let cx = lerp(fromX, toX, eased);
  let bitColor = prevSerialIn ? colors.high : colors.low;
  drawTravelBubble(cx, travelY - 18, bubbleSize, prevSerialIn, bitColor, eased);

  // FF0 → FF1, FF1 → FF2, FF2 → FF3
  for (let i = 0; i < 3; i++) {
    let fxFrom = startX + i * (ffW + gap) + ffW / 2;
    let fxTo = startX + (i + 1) * (ffW + gap) + ffW / 2;
    cx = lerp(fxFrom, fxTo, eased);
    bitColor = prevBits[i] ? colors.high : colors.low;
    drawTravelBubble(cx, travelY - 18, bubbleSize, prevBits[i], bitColor, eased);
  }

  // FF3 → SO
  let lastFFcenter = startX + 3 * (ffW + gap) + ffW / 2;
  let soTarget = lastFFcenter + ffW / 2 + 44;
  cx = lerp(lastFFcenter, soTarget, eased);
  bitColor = prevBits[3] ? colors.high : colors.low;
  drawTravelBubble(cx, travelY - 18, bubbleSize, prevBits[3], bitColor, eased);
}

function drawTravelBubble(x, y, size, val, col, alpha) {
  let a = map(alpha, 0, 1, 255, 80);
  let c = color(col);
  c.setAlpha(a);
  noStroke();
  fill(c);
  ellipse(x, y, size);
  fill(255, 255, 255, a);
  textAlign(CENTER, CENTER);
  textSize(10);
  textStyle(BOLD);
  text(val ? '1' : '0', x, y);
  textStyle(NORMAL);
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function drawClockPulse() {
  let y = regY + ffH + 82;

  // Clock pulse counter
  fill(colors.text);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);

  // Clock icon and count
  let labelX = canvasWidth / 2;

  if (clockFlash > 0) {
    // Flash background
    fill(colors.clockFlash);
    noStroke();
    rect(labelX - 90, y - 12, 180, 24, 12);
    fill(colors.clock);
  } else {
    fill(colors.text);
  }

  textStyle(BOLD);
  textSize(12);
  text('⏱ Clock Pulses: ' + clockCount, labelX, y);
  textStyle(NORMAL);
}

function drawValueDisplay() {
  let y = regY + ffH + 112;

  // Binary and decimal in a styled box
  fill('#E8EAF6');
  stroke('#9FA8DA');
  strokeWeight(1);
  rect(canvasWidth * 0.15, y, canvasWidth * 0.7, 44, 8);

  fill(colors.text);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);
  textStyle(BOLD);

  let dispBits = animating && animProgress < 1 ? prevBits : bits;
  let binaryStr = dispBits.map(b => b ? '1' : '0').join(' ');
  text('Register:  ' + binaryStr, canvasWidth / 2, y + 14);

  textStyle(NORMAL);
  textSize(12);
  let decimal = 0;
  for (let i = 0; i < 4; i++) {
    if (dispBits[i]) decimal += Math.pow(2, 3 - i);
  }
  text('Decimal: ' + decimal, canvasWidth / 2, y + 32);
}

function drawInstructions() {
  let y = drawHeight - 38;

  fill('#E3F2FD');
  noStroke();
  rect(canvasWidth * 0.05, y - 4, canvasWidth * 0.9, 34, 8);

  fill('#1565C0');
  textAlign(CENTER, CENTER);
  textSize(10.5);
  textStyle(NORMAL);
  text('Set the Serial In bit, then press Shift Right (CLK).', canvasWidth / 2, y + 6);
  text('Each shift is one clock pulse — bits move right, SI enters Q3, Q0 exits to SO.', canvasWidth / 2, y + 20);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, canvasHeight);
  positionUIElements();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
