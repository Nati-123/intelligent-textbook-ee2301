// Shift Register Walkthrough MicroSim
// Trace 4-bit shift register loading serial input
// Bloom Level: Apply (L3) - Apply shift register operation
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 480;
let controlHeight = 90;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let currentStep = 0;
let totalSteps;

const TITLE_BG = '#2196F3';
const STEP_BG = '#E3F2FD';
const HIGHLIGHT = '#FF9800';
const RESULT_BG = '#E8F5E9';
const FF_COLOR = '#5C6BC0';
const NEW_DATA_COLOR = '#E91E63';
const SHIFTED_COLOR = '#FF9800';

// UI elements
let bitsInput;
let goButton;

// Serial input bits (MSB first)
let serialBits = [1, 0, 1, 1];

// Register state at each step [Q0, Q1, Q2, Q3]
let regStates = [];

function generateRegStates(bits) {
  let states = [[0, 0, 0, 0]];
  for (let i = 0; i < bits.length; i++) {
    let prev = states[states.length - 1];
    let next = [bits[i], prev[0], prev[1], prev[2]];
    states.push(next);
  }
  return states;
}

function generateSteps(bits) {
  let n = bits.length;
  let bitStr = bits.join('');
  serialBits = bits.slice();
  regStates = generateRegStates(bits);

  let newSteps = [];

  // Intro
  newSteps.push({
    title: "4-Bit Shift Register: Load " + bitStr,
    desc: "We will trace a 4-bit serial-in parallel-out (SIPO) shift\nregister as it loads the binary value " + bitStr + " one bit at a time.",
    rule: "Serial-In Parallel-Out (SIPO) Shift Register",
    visual: "intro",
    stateIdx: 0
  });

  // Initial state
  newSteps.push({
    title: "Step 1: Initial State",
    desc: "All four flip-flops start at 0.\nRegister value: 0000",
    rule: "Initial state: all FFs cleared",
    visual: "register",
    stateIdx: 0,
    inputBit: null,
    clockNum: 0
  });

  // Clock pulse steps
  for (let i = 0; i < n; i++) {
    let state = regStates[i + 1];
    let regVal = '' + state[3] + state[2] + state[1] + state[0];
    let bitLabel = i === 0 ? ' (MSB of ' + bitStr + ')' : (i === n - 1 ? ' (LSB)' : '');
    let desc;
    if (i === 0) {
      desc = "Serial input = " + bits[i] + bitLabel + " enters Q0.\nAll other FFs shift: Q0\u2192Q1, Q1\u2192Q2, Q2\u2192Q3.\nRegister: " + regVal;
    } else if (i === n - 1) {
      desc = "Serial input = " + bits[i] + bitLabel + " enters Q0. All " + n + " bits now loaded.\nRegister: " + regVal;
    } else {
      desc = "Serial input = " + bits[i] + " enters Q0. Data continues shifting right.\nRegister: " + regVal;
    }

    newSteps.push({
      title: "Step " + (i + 2) + ": Clock Pulse " + (i + 1) + " \u2014 Input: " + bits[i],
      desc: desc,
      rule: "Clock " + (i + 1) + ": Serial In = " + bits[i] + (i === 0 ? " (MSB)" : (i === n - 1 ? " (LSB)" : "")),
      visual: "register",
      stateIdx: i + 1,
      inputBit: bits[i],
      clockNum: i + 1
    });
  }

  // Result
  let finalState = regStates[n];
  let finalRegVal = '' + finalState[3] + finalState[2] + finalState[1] + finalState[0];
  let decVal = parseInt(finalRegVal, 2);

  newSteps.push({
    title: "Result: " + bitStr + " Loaded Successfully",
    desc: "After " + n + " clock pulses, the shift register contains " + finalRegVal + ".\nQ3=" + finalState[3] + ", Q2=" + finalState[2] + ", Q1=" + finalState[1] + ", Q0=" + finalState[0] + " \u2192 " + finalRegVal + "\u2082 = " + decVal + "\u2081\u2080",
    rule: n + " clocks to load " + n + "-bit serial data",
    visual: "result",
    stateIdx: n
  });

  return newSteps;
}

let steps = generateSteps([1, 0, 1, 1]);

function setup() {
  updateCanvasSize();
  totalSteps = steps.length;
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  // Input field for bit pattern
  bitsInput = createInput('1011');
  bitsInput.size(80);
  bitsInput.attribute('placeholder', 'e.g., 1101');

  // Go button
  goButton = createButton('Go');
  goButton.mousePressed(handleGo);
  goButton.style('background-color', '#388E3C');
  goButton.style('color', 'white');
  goButton.style('border', 'none');
  goButton.style('padding', '4px 16px');
  goButton.style('border-radius', '4px');
  goButton.style('cursor', 'pointer');
  goButton.style('font-weight', 'bold');

  positionUIElements();
  describe('Shift register walkthrough showing data flowing through flip-flops', LABEL);
}

function positionUIElements() {
  let mainRect = document.querySelector('main').getBoundingClientRect();
  bitsInput.position(mainRect.left + 75, mainRect.top + drawHeight + 10);
  goButton.position(mainRect.left + 170, mainRect.top + drawHeight + 8);
}

function handleGo() {
  let val = bitsInput.value().trim();
  if (!/^[01]{1,8}$/.test(val)) {
    bitsInput.style('border', '2px solid red');
    return;
  }
  bitsInput.style('border', '');
  let bits = val.split('').map(Number);
  steps = generateSteps(bits);
  totalSteps = steps.length;
  currentStep = 0;
}

function draw() {
  updateCanvasSize();
  background(255);

  let step = steps[currentStep];
  let margin = 15;
  let w = canvasWidth - 2 * margin;

  // Title bar
  fill(TITLE_BG);
  noStroke();
  rect(margin, margin, w, 40, 5);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(15);
  textStyle(BOLD);
  text(step.title, canvasWidth / 2, margin + 20);

  // Step indicator
  fill(100);
  textSize(12);
  textStyle(NORMAL);
  textAlign(RIGHT, TOP);
  text('Step ' + (currentStep + 1) + ' of ' + totalSteps, canvasWidth - margin - 5, margin + 50);

  // Progress bar
  let progY = margin + 48;
  fill(220);
  rect(margin, progY, w, 6, 3);
  fill(TITLE_BG);
  rect(margin, progY, w * (currentStep + 1) / totalSteps, 6, 3);

  // Rule label
  fill(HIGHLIGHT);
  noStroke();
  let ruleY = margin + 65;
  textSize(11);
  textStyle(BOLD);
  let rw = textWidth(step.rule) + 20;
  rw = max(rw, 100);
  rect(canvasWidth / 2 - rw / 2, ruleY, rw, 24, 12);
  fill(255);
  textAlign(CENTER, CENTER);
  text(step.rule, canvasWidth / 2, ruleY + 12);

  // Measure description to allocate space
  let descLines = step.desc.split('\n');
  let descHeight = descLines.length * 15 + 10;

  // Visual area
  let visY = ruleY + 40;
  let visH = drawHeight - visY - descHeight - 12;
  fill(STEP_BG);
  stroke(200);
  strokeWeight(1);
  rect(margin, visY, w, visH, 5);
  noStroke();

  if (step.visual === 'intro') {
    drawIntro(margin, visY, w, visH);
  } else if (step.visual === 'register') {
    drawRegister(margin, visY, w, visH, step);
  } else if (step.visual === 'result') {
    drawResult(margin, visY, w, visH, step);
  }

  // Description
  let descY = visY + visH + 8;
  fill(60);
  textAlign(LEFT, TOP);
  textSize(12);
  textStyle(NORMAL);
  for (let i = 0; i < descLines.length; i++) {
    text(descLines[i], margin + 10, descY + i * 15);
  }

  // Input label
  fill(60);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(13);
  textStyle(BOLD);
  text('Bits:', margin, drawHeight + 18);

  drawButtons();
}

function drawIntro(mx, vy, w, vh) {
  let cx = canvasWidth / 2;

  // Show the concept
  fill(60);
  textAlign(CENTER, CENTER);
  textSize(18);
  textStyle(BOLD);
  text('Serial Input: ' + serialBits.join(' \u2192 '), cx, vy + 30);

  fill(HIGHLIGHT);
  textSize(16);
  text('\u2193', cx, vy + 55);

  // Draw 4 empty FF boxes
  let ffW = 50;
  let ffH = 50;
  let gap = 15;
  let totalFFW = 4 * ffW + 3 * gap;
  let startX = cx - totalFFW / 2;
  let ffY = vy + 70;

  for (let i = 0; i < 4; i++) {
    let x = startX + i * (ffW + gap);
    fill(255);
    stroke(FF_COLOR); strokeWeight(2);
    rect(x, ffY, ffW, ffH, 5);
    noStroke();
    fill(FF_COLOR);
    textAlign(CENTER, CENTER);
    textSize(12); textStyle(BOLD);
    text('Q' + i, x + ffW / 2, ffY - 10);
    fill(180);
    textSize(20);
    text('?', x + ffW / 2, ffY + ffH / 2);

    // Arrows between FFs
    if (i < 3) {
      stroke(60); strokeWeight(1.5);
      let arrowX1 = x + ffW + 2;
      let arrowX2 = x + ffW + gap - 2;
      let arrowY = ffY + ffH / 2;
      line(arrowX1, arrowY, arrowX2, arrowY);
      line(arrowX2 - 5, arrowY - 4, arrowX2, arrowY);
      line(arrowX2 - 5, arrowY + 4, arrowX2, arrowY);
      noStroke();
    }
  }

  // Serial input arrow
  stroke(NEW_DATA_COLOR); strokeWeight(2);
  line(startX - 30, ffY + ffH / 2, startX - 2, ffY + ffH / 2);
  line(startX - 7, ffY + ffH / 2 - 4, startX - 2, ffY + ffH / 2);
  line(startX - 7, ffY + ffH / 2 + 4, startX - 2, ffY + ffH / 2);
  noStroke();
  fill(NEW_DATA_COLOR);
  textAlign(RIGHT, CENTER);
  textSize(11); textStyle(BOLD);
  text('Serial\nIn', startX - 35, ffY + ffH / 2);

  fill(100);
  textAlign(CENTER, CENTER);
  textSize(13); textStyle(NORMAL);
  text('Click "Next \u2192" to begin', cx, vy + vh - 15);
}

function drawRegister(mx, vy, w, vh, step) {
  let cx = canvasWidth / 2;
  let state = regStates[step.stateIdx];
  let prevState = step.stateIdx > 0 ? regStates[step.stateIdx - 1] : null;

  let ffW = 55;
  let ffH = 50;
  let gap = 15;
  let totalFFW = 4 * ffW + 3 * gap;
  let startX = cx - totalFFW / 2;
  let ffY = vy + 20;

  // Serial input indicator
  if (step.inputBit !== null) {
    fill(NEW_DATA_COLOR);
    textAlign(RIGHT, CENTER);
    textSize(14); textStyle(BOLD);
    text('In=' + step.inputBit, startX - 10, ffY + ffH / 2);
    // Arrow
    stroke(NEW_DATA_COLOR); strokeWeight(2);
    line(startX - 5, ffY + ffH / 2, startX - 1, ffY + ffH / 2);
    noStroke();
  }

  // Draw flip-flops
  for (let i = 0; i < 4; i++) {
    let x = startX + i * (ffW + gap);
    let val = state[i];
    let isNew = (i === 0 && step.inputBit !== null);
    let isShifted = prevState && i > 0 && state[i] !== prevState[i];

    // FF box
    let bgColor;
    if (isNew) {
      bgColor = NEW_DATA_COLOR;
    } else if (isShifted) {
      bgColor = SHIFTED_COLOR;
    } else {
      bgColor = FF_COLOR;
    }

    fill(bgColor + '20');
    stroke(bgColor); strokeWeight(2);
    rect(x, ffY, ffW, ffH, 5);
    noStroke();

    // FF label
    fill(bgColor);
    textAlign(CENTER, CENTER);
    textSize(11); textStyle(BOLD);
    text('Q' + i, x + ffW / 2, ffY - 10);

    // Value
    fill(val === 1 ? '#1B5E20' : '#BDBDBD');
    textSize(28); textStyle(BOLD);
    text(val, x + ffW / 2, ffY + ffH / 2);

    // D label
    fill(100);
    textSize(9); textStyle(NORMAL);
    textAlign(CENTER, TOP);
    text('D  Q', x + ffW / 2, ffY + ffH + 3);

    // Arrows between FFs
    if (i < 3) {
      stroke(60); strokeWeight(1.5);
      let arrowX1 = x + ffW + 2;
      let arrowX2 = x + ffW + gap - 2;
      let arrowY = ffY + ffH / 2;
      line(arrowX1, arrowY, arrowX2, arrowY);
      line(arrowX2 - 5, arrowY - 4, arrowX2, arrowY);
      line(arrowX2 - 5, arrowY + 4, arrowX2, arrowY);
      noStroke();
    }
  }

  // Clock indicator
  fill(TITLE_BG);
  textAlign(CENTER, CENTER);
  textSize(12); textStyle(BOLD);
  let clkY = ffY + ffH + 18;
  if (step.clockNum > 0) {
    text('Clock Pulse ' + step.clockNum, cx, clkY);
    // Clock symbol
    stroke(TITLE_BG); strokeWeight(1.5);
    let sy = clkY + 13;
    let sx = cx - 20;
    line(sx, sy + 8, sx + 5, sy + 8);
    line(sx + 5, sy + 8, sx + 5, sy);
    line(sx + 5, sy, sx + 15, sy);
    line(sx + 15, sy, sx + 15, sy + 8);
    line(sx + 15, sy + 8, sx + 20, sy + 8);
    noStroke();
    fill(TITLE_BG);
    textSize(9);
    text('\u2191 Rising Edge', cx + 25, sy + 4);
  }

  // Register value display
  let regVal = '' + state[3] + state[2] + state[1] + state[0];
  let valY = clkY + 35;
  fill(240);
  stroke(200); strokeWeight(1);
  rect(cx - 80, valY, 160, 28, 5);
  noStroke();
  fill(60);
  textAlign(CENTER, CENTER);
  textSize(14); textStyle(NORMAL);
  text('Register: ', cx - 30, valY + 14);
  fill(FF_COLOR);
  textSize(18); textStyle(BOLD);
  text(regVal, cx + 40, valY + 14);

  // Show input sequence progress
  let seqY = valY + 38;
  fill(100);
  textAlign(CENTER, CENTER);
  textSize(11); textStyle(NORMAL);
  text('Input sequence: ', cx - 50, seqY);
  for (let i = 0; i < serialBits.length; i++) {
    let bitX = cx + i * 18;
    if (i < step.clockNum) {
      fill(NEW_DATA_COLOR); textStyle(BOLD);
    } else {
      fill(200); textStyle(NORMAL);
    }
    textSize(14);
    text(serialBits[i], bitX, seqY);
  }
}

function drawResult(mx, vy, w, vh, step) {
  let cx = canvasWidth / 2;
  let state = regStates[step.stateIdx];

  // Final register display (large)
  let ffW = 60;
  let ffH = 65;
  let gap = 12;
  let totalFFW = 4 * ffW + 3 * gap;
  let startX = cx - totalFFW / 2;
  let ffY = vy + 20;

  for (let i = 0; i < 4; i++) {
    let x = startX + i * (ffW + gap);
    fill(RESULT_BG);
    stroke('#4CAF50'); strokeWeight(2);
    rect(x, ffY, ffW, ffH, 5);
    noStroke();

    fill('#4CAF50');
    textAlign(CENTER, CENTER);
    textSize(12); textStyle(BOLD);
    text('Q' + (3 - i), x + ffW / 2, ffY - 10);

    // Reading order: Q3, Q2, Q1, Q0
    let displayOrder = [3, 2, 1, 0];
    let val = state[displayOrder[i]];
    fill('#1B5E20');
    textSize(32); textStyle(BOLD);
    text(val, x + ffW / 2, ffY + ffH / 2);
  }

  // Result box
  let finalRegVal = '' + state[3] + state[2] + state[1] + state[0];
  let decVal = parseInt(finalRegVal, 2);
  let resY = ffY + ffH + 25;
  fill(RESULT_BG);
  stroke('#4CAF50'); strokeWeight(2);
  rect(mx + 20, resY, w - 40, 50, 8);
  noStroke();
  fill('#1B5E20');
  textAlign(CENTER, CENTER);
  textSize(20); textStyle(BOLD);
  text('Q3Q2Q1Q0 = ' + finalRegVal + '\u2082 = ' + decVal + '\u2081\u2080', cx, resY + 25);

  // Summary
  fill(100);
  textSize(12); textStyle(NORMAL);
  text(serialBits.length + ' serial bits loaded in ' + serialBits.length + ' clock cycles', cx, resY + 65);
}

function drawButtons() {
  let btnY = drawHeight + 48;
  let btnW = 90;
  let btnH = 34;
  let gap = 10;
  let totalW = btnW * 3 + gap * 2;
  let startX = (canvasWidth - totalW) / 2;

  let prevEnabled = currentStep > 0;
  fill(prevEnabled ? '#1976D2' : '#BDBDBD');
  noStroke();
  rect(startX, btnY, btnW, btnH, 5);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(14); textStyle(BOLD);
  text('\u2190 Previous', startX + btnW / 2, btnY + btnH / 2);

  fill('#757575');
  rect(startX + btnW + gap, btnY, btnW, btnH, 5);
  fill(255);
  text('Reset', startX + btnW + gap + btnW / 2, btnY + btnH / 2);

  let nextEnabled = currentStep < totalSteps - 1;
  fill(nextEnabled ? '#388E3C' : '#BDBDBD');
  rect(startX + 2 * (btnW + gap), btnY, btnW, btnH, 5);
  fill(255);
  text('Next \u2192', startX + 2 * (btnW + gap) + btnW / 2, btnY + btnH / 2);
}

function mousePressed() {
  let btnY = drawHeight + 48;
  let btnW = 90;
  let btnH = 34;
  let gap = 10;
  let totalW = btnW * 3 + gap * 2;
  let startX = (canvasWidth - totalW) / 2;

  if (mouseY >= btnY && mouseY <= btnY + btnH) {
    if (mouseX >= startX && mouseX <= startX + btnW && currentStep > 0) {
      currentStep--;
    } else if (mouseX >= startX + btnW + gap && mouseX <= startX + 2 * btnW + gap) {
      currentStep = 0;
    } else if (mouseX >= startX + 2 * (btnW + gap) && mouseX <= startX + 2 * (btnW + gap) + btnW && currentStep < totalSteps - 1) {
      currentStep++;
    }
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  positionUIElements();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
