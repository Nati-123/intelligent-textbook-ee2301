// Moore vs Mealy Machine Comparison MicroSim
// Side-by-side "101" sequence detector as Moore and Mealy machines
// Unit 10: Sequential Circuit Design
// Bloom Level: Analyze (L4)

let containerWidth;
let canvasWidth = 800;
let drawHeight = 600;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

// Moore machine state
let mooreState = 0;
// Mealy machine state
let mealyState = 0;

let inputHistory = [];
let mooreOutputHistory = [];
let mealyOutputHistory = [];

let detectedFlashMoore = 0;
let detectedFlashMealy = 0;

let input0Btn, input1Btn, resetBtn;

// Moore machine: 4 states for "101" detector
// S0: initial (output=0), S1: seen "1" (output=0), S2: seen "10" (output=0), S3: seen "101" (output=1)
const mooreStates = [
  { name: 'S0', label: 'S0/0', output: 0, desc: 'Start' },
  { name: 'S1', label: 'S1/0', output: 0, desc: 'Seen "1"' },
  { name: 'S2', label: 'S2/0', output: 0, desc: 'Seen "10"' },
  { name: 'S3', label: 'S3/1', output: 1, desc: 'Detected "101"' }
];

// Moore transitions: [state][input] = next_state
const mooreTransitions = [
  [0, 1],  // S0: 0->S0, 1->S1
  [2, 1],  // S1: 0->S2, 1->S1
  [0, 3],  // S2: 0->S0, 1->S3
  [2, 1]   // S3: 0->S2, 1->S1 (overlapping)
];

// Mealy machine: 3 states for "101" detector
// S0: initial, S1: seen "1", S2: seen "10"
// Output is on transitions
const mealyStates = [
  { name: 'S0', desc: 'Start' },
  { name: 'S1', desc: 'Seen "1"' },
  { name: 'S2', desc: 'Seen "10"' }
];

// Mealy transitions: [state][input] = { next, output }
const mealyTransitions = [
  [{ next: 0, output: 0 }, { next: 1, output: 0 }],  // S0: 0/0->S0, 1/0->S1
  [{ next: 2, output: 0 }, { next: 1, output: 0 }],  // S1: 0/0->S2, 1/0->S1
  [{ next: 0, output: 0 }, { next: 1, output: 1 }]   // S2: 0/0->S0, 1/1->S1 (detected!)
];

const colors = {
  purple: '#5A3EED',
  activeState: '#4488FF',
  outputHigh: '#4CAF50',
  inactive: '#D0D0D0',
  detected: '#FF3333',
  bg: '#FAFAFA',
  text: '#212121',
  wire: '#666666',
  lightBg: '#F0F0F0'
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textFont('Arial');

  input0Btn = createButton('Input 0');
  input0Btn.mousePressed(() => applyInput(0));
  input0Btn.style('font-size', '14px');
  input0Btn.style('padding', '6px 18px');
  input0Btn.style('cursor', 'pointer');
  input0Btn.style('background', '#E0E0E0');
  input0Btn.style('border', '2px solid #999');
  input0Btn.style('border-radius', '6px');
  input0Btn.style('font-weight', 'bold');

  input1Btn = createButton('Input 1');
  input1Btn.mousePressed(() => applyInput(1));
  input1Btn.style('font-size', '14px');
  input1Btn.style('padding', '6px 18px');
  input1Btn.style('cursor', 'pointer');
  input1Btn.style('background', '#E0E0E0');
  input1Btn.style('border', '2px solid #999');
  input1Btn.style('border-radius', '6px');
  input1Btn.style('font-weight', 'bold');

  resetBtn = createButton('Reset');
  resetBtn.mousePressed(resetMachines);
  resetBtn.style('font-size', '14px');
  resetBtn.style('padding', '6px 18px');
  resetBtn.style('cursor', 'pointer');
  resetBtn.style('background', '#FFCDD2');
  resetBtn.style('border', '2px solid #E57373');
  resetBtn.style('border-radius', '6px');
  resetBtn.style('font-weight', 'bold');

  positionButtons();
  describe('Moore vs Mealy machine comparison for 101 sequence detection', LABEL);
}

function positionButtons() {
  let mainRect = document.querySelector('main').getBoundingClientRect();
  let centerX = mainRect.left + canvasWidth / 2;
  input0Btn.position(centerX - 130, mainRect.top + drawHeight + 10);
  input1Btn.position(centerX - 30, mainRect.top + drawHeight + 10);
  resetBtn.position(centerX + 70, mainRect.top + drawHeight + 10);
}

function resetMachines() {
  mooreState = 0;
  mealyState = 0;
  inputHistory = [];
  mooreOutputHistory = [];
  mealyOutputHistory = [];
  detectedFlashMoore = 0;
  detectedFlashMealy = 0;
}

function applyInput(inp) {
  inputHistory.push(inp);

  // Moore transition
  let prevMooreState = mooreState;
  mooreState = mooreTransitions[mooreState][inp];
  let mooreOut = mooreStates[mooreState].output;
  mooreOutputHistory.push(mooreOut);
  if (mooreOut === 1) {
    detectedFlashMoore = 60; // flash for 60 frames
  }

  // Mealy transition
  let mealyTrans = mealyTransitions[mealyState][inp];
  let mealyOut = mealyTrans.output;
  mealyState = mealyTrans.next;
  mealyOutputHistory.push(mealyOut);
  if (mealyOut === 1) {
    detectedFlashMealy = 60;
  }

  // Limit history length
  if (inputHistory.length > 20) {
    inputHistory.shift();
    mooreOutputHistory.shift();
    mealyOutputHistory.shift();
  }
}

function draw() {
  updateCanvasSize();

  // Background
  background(colors.bg);

  // Control area
  fill(255);
  stroke('#DDD');
  strokeWeight(1);
  rect(0, drawHeight, canvasWidth, controlHeight);

  let halfW = canvasWidth / 2;

  // Title
  noStroke();
  fill(colors.purple);
  textAlign(CENTER, TOP);
  textSize(min(20, canvasWidth * 0.028));
  textStyle(BOLD);
  text('Moore vs Mealy Machine Comparison', canvasWidth / 2, 8);

  textSize(min(12, canvasWidth * 0.017));
  textStyle(NORMAL);
  fill('#666');
  text('Both machines detect the "101" pattern in a serial bit stream — click Input 0 or Input 1 to step through', canvasWidth / 2, 32);

  // Divider line
  stroke(colors.purple);
  strokeWeight(2);
  line(halfW, 50, halfW, drawHeight - 5);

  // Section headers
  noStroke();
  fill(colors.purple);
  textAlign(CENTER, TOP);
  textSize(min(16, canvasWidth * 0.022));
  textStyle(BOLD);
  text('MOORE Machine', halfW / 2, 50);
  text('MEALY Machine', halfW + halfW / 2, 50);

  textSize(min(11, canvasWidth * 0.015));
  textStyle(NORMAL);
  fill('#888');
  text('Output on STATES', halfW / 2, 68);
  text('Output on TRANSITIONS', halfW + halfW / 2, 68);

  // Legend
  drawLegend(canvasWidth / 2, 82);

  // Draw state diagrams
  drawMooreStateDiagram(halfW / 2, 195);
  drawMealyStateDiagram(halfW + halfW / 2, 195);

  // Draw info panels
  drawMooreInfo(10, 330, halfW - 20);
  drawMealyInfo(halfW + 10, 330, halfW - 20);

  // Draw timing comparison at bottom
  drawTimingComparison(10, 450, canvasWidth - 20);

  // Decrement flash timers
  if (detectedFlashMoore > 0) detectedFlashMoore--;
  if (detectedFlashMealy > 0) detectedFlashMealy--;
}

function drawLegend(cx, y) {
  let legendW = min(420, canvasWidth * 0.55);
  let legendH = 22;
  let lx = cx - legendW / 2;

  fill('#F5F5FF');
  stroke(colors.purple);
  strokeWeight(1);
  rect(lx, y, legendW, legendH, 6);

  noStroke();
  fill(colors.text);
  textAlign(CENTER, CENTER);
  textSize(min(10, canvasWidth * 0.013));
  textStyle(NORMAL);
  text('Moore labels: input only (e.g. 0, 1)  |  Mealy labels: input / output (e.g. 1/1)', cx, y + legendH / 2);
}

function drawMooreStateDiagram(cx, cy) {
  let r = min(28, canvasWidth * 0.04);
  let spread = min(70, canvasWidth * 0.09);

  // State positions: diamond layout
  let positions = [
    { x: cx - spread, y: cy - spread * 0.4 },   // S0 top-left
    { x: cx + spread, y: cy - spread * 0.4 },    // S1 top-right
    { x: cx - spread, y: cy + spread * 0.4 },    // S2 bottom-left
    { x: cx + spread, y: cy + spread * 0.4 }     // S3 bottom-right
  ];

  // Draw transitions first (behind states)
  drawMooreTransitions(positions, r);

  // Draw states
  for (let i = 0; i < 4; i++) {
    let pos = positions[i];
    let isActive = (i === mooreState);
    let isOutput1 = mooreStates[i].output === 1;

    // State circle
    if (isActive) {
      if (isOutput1 && detectedFlashMoore > 0) {
        // Flashing detected state
        let flashIntensity = (sin(frameCount * 0.3) + 1) / 2;
        fill(lerpColor(color(colors.outputHigh), color(colors.detected), flashIntensity));
      } else {
        fill(colors.activeState);
      }
      stroke(isOutput1 ? colors.outputHigh : '#2266CC');
      strokeWeight(3);
    } else if (isOutput1) {
      fill('#A5D6A7');
      stroke(colors.outputHigh);
      strokeWeight(2);
    } else {
      fill(colors.inactive);
      stroke('#AAAAAA');
      strokeWeight(2);
    }

    ellipse(pos.x, pos.y, r * 2);

    // Double circle for output=1 states
    if (isOutput1) {
      noFill();
      stroke(isActive ? '#2E7D32' : '#66BB6A');
      strokeWeight(1.5);
      ellipse(pos.x, pos.y, r * 2 - 8);
    }

    // State label
    noStroke();
    fill(isActive ? 'white' : colors.text);
    textAlign(CENTER, CENTER);
    textSize(min(11, canvasWidth * 0.015));
    textStyle(BOLD);
    text(mooreStates[i].label, pos.x, pos.y);
  }

  // Initial state arrow
  stroke(colors.wire);
  strokeWeight(1.5);
  let startX = positions[0].x - r - 20;
  let startY = positions[0].y;
  drawArrowLine(startX, startY, positions[0].x - r - 2, startY);
  noStroke();
  fill(colors.text);
  textSize(min(9, canvasWidth * 0.012));
  textAlign(CENTER, CENTER);
  text('start', startX - 10, startY);
}

function drawMooreTransitions(pos, r) {
  let labelSize = min(9, canvasWidth * 0.012);

  // S0 -> S1 (input=1): top
  drawCurvedArrow(pos[0].x, pos[0].y, pos[1].x, pos[1].y, r, -15, '1', labelSize);

  // S1 -> S2 (input=0): right side going down then left
  drawCurvedArrow(pos[1].x, pos[1].y, pos[2].x, pos[2].y, r, -20, '0', labelSize);

  // S2 -> S3 (input=1): bottom
  drawCurvedArrow(pos[2].x, pos[2].y, pos[3].x, pos[3].y, r, -15, '1', labelSize);

  // S3 -> S2 (input=0): bottom, reverse direction
  drawCurvedArrow(pos[3].x, pos[3].y, pos[2].x, pos[2].y, r, 15, '0', labelSize);

  // S3 -> S1 (input=1): right side going up
  drawCurvedArrow(pos[3].x, pos[3].y, pos[1].x, pos[1].y, r, 15, '1', labelSize);

  // S2 -> S0 (input=0): left side going up
  drawCurvedArrow(pos[2].x, pos[2].y, pos[0].x, pos[0].y, r, 15, '0', labelSize);

  // S0 -> S0 self-loop (input=0)
  drawSelfLoop(pos[0].x, pos[0].y, r, -135, '0', labelSize);

  // S1 -> S1 self-loop (input=1)
  drawSelfLoop(pos[1].x, pos[1].y, r, -45, '1', labelSize);
}

function drawMealyStateDiagram(cx, cy) {
  let r = min(28, canvasWidth * 0.04);
  let spread = min(65, canvasWidth * 0.085);

  // State positions: triangle layout
  let positions = [
    { x: cx, y: cy - spread * 0.7 },         // S0 top center
    { x: cx + spread, y: cy + spread * 0.5 }, // S1 bottom right
    { x: cx - spread, y: cy + spread * 0.5 }  // S2 bottom left
  ];

  // Draw transitions first
  drawMealyTransitions(positions, r);

  // Draw states
  for (let i = 0; i < 3; i++) {
    let pos = positions[i];
    let isActive = (i === mealyState);

    if (isActive) {
      fill(colors.activeState);
      stroke('#2266CC');
      strokeWeight(3);
    } else {
      fill(colors.inactive);
      stroke('#AAAAAA');
      strokeWeight(2);
    }

    ellipse(pos.x, pos.y, r * 2);

    // State label
    noStroke();
    fill(isActive ? 'white' : colors.text);
    textAlign(CENTER, CENTER);
    textSize(min(12, canvasWidth * 0.016));
    textStyle(BOLD);
    text(mealyStates[i].name, pos.x, pos.y);
  }

  // Initial state arrow
  stroke(colors.wire);
  strokeWeight(1.5);
  let startX = positions[0].x;
  let startY = positions[0].y - r - 22;
  drawArrowLine(startX, startY, startX, positions[0].y - r - 2);
  noStroke();
  fill(colors.text);
  textSize(min(9, canvasWidth * 0.012));
  textAlign(CENTER, CENTER);
  text('start', startX, startY - 8);
}

function drawMealyTransitions(pos, r) {
  let labelSize = min(9, canvasWidth * 0.012);

  // S0 -> S1 (1/0): right side
  drawCurvedArrow(pos[0].x, pos[0].y, pos[1].x, pos[1].y, r, -15, '1/0', labelSize);

  // S1 -> S2 (0/0): bottom
  drawCurvedArrow(pos[1].x, pos[1].y, pos[2].x, pos[2].y, r, -15, '0/0', labelSize);

  // S2 -> S0 (0/0): left side
  drawCurvedArrow(pos[2].x, pos[2].y, pos[0].x, pos[0].y, r, -15, '0/0', labelSize);

  // S2 -> S1 (1/1): bottom, going right -- this is the detection!
  let isDetecting = (detectedFlashMealy > 0);
  if (isDetecting) {
    stroke(colors.detected);
    strokeWeight(3);
  }
  drawCurvedArrow(pos[2].x, pos[2].y, pos[1].x, pos[1].y, r, 15, '1/1', labelSize, isDetecting);

  // S0 -> S0 self-loop (0/0)
  drawSelfLoop(pos[0].x, pos[0].y, r, -90, '0/0', labelSize);

  // S1 -> S1 self-loop (1/0)
  drawSelfLoop(pos[1].x, pos[1].y, r, 0, '1/0', labelSize);
}

function drawMooreInfo(x, y, w) {
  let panelH = 110;

  // Background panel
  fill('#F5F5FF');
  stroke(colors.purple);
  strokeWeight(1.5);
  rect(x, y, w, panelH, 8);

  noStroke();
  let tx = x + 10;
  let ty = y + 12;
  let lineH = 17;
  let labelSize = min(12, canvasWidth * 0.016);

  fill(colors.purple);
  textAlign(LEFT, TOP);
  textSize(labelSize);
  textStyle(BOLD);
  text('Moore Machine Status', tx, ty);
  ty += lineH + 4;

  textStyle(NORMAL);
  textSize(min(11, canvasWidth * 0.015));

  fill(colors.text);
  text('Current State: ', tx, ty);
  fill(colors.activeState);
  textStyle(BOLD);
  text(mooreStates[mooreState].name + '  (' + mooreStates[mooreState].desc + ')', tx + 90, ty);
  ty += lineH;

  textStyle(NORMAL);
  fill(colors.text);
  text('Output: ', tx, ty);
  let mooreOut = mooreStates[mooreState].output;
  fill(mooreOut === 1 ? colors.outputHigh : '#999');
  textStyle(BOLD);
  text(mooreOut.toString(), tx + 90, ty);
  if (detectedFlashMoore > 0) {
    fill(colors.detected);
    text('  DETECTED!', tx + 105, ty);
  }
  ty += lineH;

  textStyle(NORMAL);
  fill(colors.text);
  textSize(min(10, canvasWidth * 0.013));
  let inputStr = inputHistory.length > 0 ? inputHistory.join(', ') : '(none)';
  text('Inputs:  ' + inputStr, tx, ty);
  ty += lineH;

  let outStr = mooreOutputHistory.length > 0 ? mooreOutputHistory.join(', ') : '(none)';
  text('Outputs: ' + outStr, tx, ty);
}

function drawMealyInfo(x, y, w) {
  let panelH = 110;

  // Background panel
  fill('#F5F5FF');
  stroke(colors.purple);
  strokeWeight(1.5);
  rect(x, y, w, panelH, 8);

  noStroke();
  let tx = x + 10;
  let ty = y + 12;
  let lineH = 17;
  let labelSize = min(12, canvasWidth * 0.016);

  fill(colors.purple);
  textAlign(LEFT, TOP);
  textSize(labelSize);
  textStyle(BOLD);
  text('Mealy Machine Status', tx, ty);
  ty += lineH + 4;

  textStyle(NORMAL);
  textSize(min(11, canvasWidth * 0.015));

  fill(colors.text);
  text('Current State: ', tx, ty);
  fill(colors.activeState);
  textStyle(BOLD);
  text(mealyStates[mealyState].name + '  (' + mealyStates[mealyState].desc + ')', tx + 90, ty);
  ty += lineH;

  textStyle(NORMAL);
  fill(colors.text);
  text('Output: ', tx, ty);
  let mealyOut = mealyOutputHistory.length > 0 ? mealyOutputHistory[mealyOutputHistory.length - 1] : 0;
  fill(mealyOut === 1 ? colors.outputHigh : '#999');
  textStyle(BOLD);
  text(mealyOut.toString(), tx + 90, ty);
  if (detectedFlashMealy > 0) {
    fill(colors.detected);
    text('  DETECTED!', tx + 105, ty);
  }
  ty += lineH;

  textStyle(NORMAL);
  fill(colors.text);
  textSize(min(10, canvasWidth * 0.013));
  let inputStr = inputHistory.length > 0 ? inputHistory.join(', ') : '(none)';
  text('Inputs:  ' + inputStr, tx, ty);
  ty += lineH;

  let outStr = mealyOutputHistory.length > 0 ? mealyOutputHistory.join(', ') : '(none)';
  text('Outputs: ' + outStr, tx, ty);
}

function drawTimingComparison(x, y, w) {
  let h = 130;

  // Background panel
  fill('#FAFAFA');
  stroke('#DDD');
  strokeWeight(1);
  rect(x, y, w, h, 8);

  noStroke();
  fill(colors.purple);
  textAlign(CENTER, TOP);
  textSize(min(13, canvasWidth * 0.017));
  textStyle(BOLD);
  text('Timing Comparison', x + w / 2, y + 6);

  if (inputHistory.length === 0) {
    fill('#999');
    textSize(min(11, canvasWidth * 0.015));
    textStyle(NORMAL);
    text('Enter inputs to see timing comparison', x + w / 2, y + 55);
    return;
  }

  let margin = 80;
  let rightMargin = 20;
  let topY = y + 24;
  let rowH = 22;
  let stepW = min(30, (w - margin - rightMargin) / max(inputHistory.length, 1));
  let startX = x + margin;

  // Labels
  textAlign(RIGHT, CENTER);
  textSize(min(10, canvasWidth * 0.013));
  textStyle(BOLD);
  fill(colors.text);
  text('Input:', startX - 8, topY + rowH * 0.5);
  fill(colors.purple);
  text('Moore Output:', startX - 8, topY + rowH * 1.5);
  fill('#E65100');
  text('Mealy Output:', startX - 8, topY + rowH * 2.5);

  // Key difference label
  textAlign(LEFT, TOP);
  textSize(min(9, canvasWidth * 0.012));
  textStyle(ITALIC);
  fill('#888');
  text('Moore: output changes after state transition (delayed by one clock)', startX, topY + rowH * 3.4);
  text('Mealy: output changes immediately with the input', startX, topY + rowH * 3.4 + 14);

  // Draw timing waveforms
  let numSteps = inputHistory.length;

  for (let i = 0; i < numSteps; i++) {
    let sx = startX + i * stepW;

    // Step number
    textAlign(CENTER, TOP);
    textSize(min(8, canvasWidth * 0.01));
    textStyle(NORMAL);
    fill('#AAA');
    // Only draw step labels if there's room
    if (stepW >= 15) {
      text(i + 1, sx + stepW / 2, topY - 2);
    }

    // Input waveform
    let inp = inputHistory[i];
    drawWaveformStep(sx, topY + rowH * 0.2, stepW, rowH * 0.6, inp, '#333', '#E8E8E8');

    // Moore output waveform
    let mOut = mooreOutputHistory[i];
    let mColor = mOut === 1 ? colors.outputHigh : '#CCC';
    let mBg = mOut === 1 ? '#E8F5E9' : '#F5F5F5';
    drawWaveformStep(sx, topY + rowH * 1.2, stepW, rowH * 0.6, mOut, mColor, mBg);

    // Mealy output waveform
    let meOut = mealyOutputHistory[i];
    let meColor = meOut === 1 ? '#E65100' : '#CCC';
    let meBg = meOut === 1 ? '#FFF3E0' : '#F5F5F5';
    drawWaveformStep(sx, topY + rowH * 2.2, stepW, rowH * 0.6, meOut, meColor, meBg);

    // Vertical clock edge lines
    stroke('#DDD');
    strokeWeight(0.5);
    line(sx, topY, sx, topY + rowH * 3.1);
  }

  // Final vertical line
  let endX = startX + numSteps * stepW;
  stroke('#DDD');
  strokeWeight(0.5);
  line(endX, topY, endX, topY + rowH * 3.1);
}

function drawWaveformStep(x, y, w, h, val, col, bgCol) {
  // Background
  fill(bgCol);
  noStroke();
  rect(x, y, w, h);

  // Value bar
  if (val === 1) {
    fill(col);
    rect(x + 1, y + 1, w - 2, h * 0.4);
  } else {
    fill(col);
    rect(x + 1, y + h * 0.6 - 1, w - 2, h * 0.4);
  }

  // Value text
  fill(val === 1 ? col : '#999');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(min(9, canvasWidth * 0.012));
  textStyle(BOLD);
  text(val, x + w / 2, y + h / 2);
  textStyle(NORMAL);
}

// ---- Arrow and curve drawing helpers ----

function drawArrowLine(x1, y1, x2, y2) {
  line(x1, y1, x2, y2);
  let angle = atan2(y2 - y1, x2 - x1);
  let arrowLen = 7;
  line(x2, y2, x2 - arrowLen * cos(angle - PI / 6), y2 - arrowLen * sin(angle - PI / 6));
  line(x2, y2, x2 - arrowLen * cos(angle + PI / 6), y2 - arrowLen * sin(angle + PI / 6));
}

function drawCurvedArrow(x1, y1, x2, y2, r, curvature, label, labelSize, highlight) {
  // Calculate direction
  let dx = x2 - x1;
  let dy = y2 - y1;
  let dist = sqrt(dx * dx + dy * dy);

  // Angle from start to end
  let angle = atan2(dy, dx);

  // Start and end points on circle edges
  let sx = x1 + r * cos(angle);
  let sy = y1 + r * sin(angle);
  let ex = x2 - r * cos(angle);
  let ey = y2 - r * sin(angle);

  // Control point perpendicular to the line
  let mx = (sx + ex) / 2;
  let my = (sy + ey) / 2;
  let perpX = -sin(angle) * curvature;
  let perpY = cos(angle) * curvature;
  let cpx = mx + perpX;
  let cpy = my + perpY;

  // Draw curve
  if (!highlight) {
    stroke(colors.wire);
    strokeWeight(1.5);
  }
  noFill();
  beginShape();
  vertex(sx, sy);
  quadraticVertex(cpx, cpy, ex, ey);
  endShape();

  // Arrowhead at end
  // Tangent at endpoint of quadratic bezier
  let t = 0.98;
  let tangentX = 2 * (1 - t) * (cpx - sx) + 2 * t * (ex - cpx);
  let tangentY = 2 * (1 - t) * (cpy - sy) + 2 * t * (ey - cpy);
  let arrowAngle = atan2(tangentY, tangentX);
  let arrowLen = 7;

  line(ex, ey, ex - arrowLen * cos(arrowAngle - PI / 6), ey - arrowLen * sin(arrowAngle - PI / 6));
  line(ex, ey, ex - arrowLen * cos(arrowAngle + PI / 6), ey - arrowLen * sin(arrowAngle + PI / 6));

  // Label at control point
  noStroke();
  if (highlight) {
    fill(colors.detected);
    textStyle(BOLD);
  } else {
    fill(colors.text);
    textStyle(NORMAL);
  }
  textAlign(CENTER, CENTER);
  textSize(labelSize);

  // Offset label slightly more from the curve
  let labelOffX = perpX * 0.4;
  let labelOffY = perpY * 0.4;
  let lx = cpx + labelOffX;
  let ly = cpy + labelOffY;

  // Draw small background behind label for readability
  let tw = textWidth(label) + 6;
  fill(colors.bg);
  noStroke();
  rect(lx - tw / 2, ly - 7, tw, 14, 3);

  if (highlight) {
    fill(colors.detected);
    textStyle(BOLD);
  } else {
    fill(colors.text);
    textStyle(NORMAL);
  }
  text(label, lx, ly);

  // Reset style
  textStyle(NORMAL);
  stroke(colors.wire);
  strokeWeight(1.5);
}

function drawSelfLoop(x, y, r, angleDeg, label, labelSize) {
  let loopAngle = radians(angleDeg);
  let loopR = r * 0.55;

  // Center of the loop arc (outside the state circle)
  let lcx = x + (r + loopR * 0.7) * cos(loopAngle);
  let lcy = y + (r + loopR * 0.7) * sin(loopAngle);

  noFill();
  stroke(colors.wire);
  strokeWeight(1.5);

  // Draw arc
  let startA = loopAngle + PI * 0.65;
  let endA = loopAngle + PI * 2 - PI * 0.65;
  arc(lcx, lcy, loopR * 2, loopR * 2, startA, endA);

  // Arrowhead
  let arrowAngle = endA;
  let ax = lcx + loopR * cos(arrowAngle);
  let ay = lcy + loopR * sin(arrowAngle);
  let tangent = arrowAngle + PI / 2;
  let arrowLen = 6;
  line(ax, ay, ax - arrowLen * cos(tangent - PI / 5), ay - arrowLen * sin(tangent - PI / 5));
  line(ax, ay, ax - arrowLen * cos(tangent + PI / 5), ay - arrowLen * sin(tangent + PI / 5));

  // Label
  let labelDist = r + loopR * 1.5;
  let lx = x + labelDist * cos(loopAngle);
  let ly = y + labelDist * sin(loopAngle);

  noStroke();
  // Background for readability
  fill(colors.bg);
  let tw = textWidth(label) + 6;
  rect(lx - tw / 2, ly - 7, tw, 14, 3);

  fill(colors.text);
  textAlign(CENTER, CENTER);
  textSize(labelSize);
  text(label, lx, ly);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, canvasHeight);
  positionButtons();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
