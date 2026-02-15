// VHDL FSM Implementation Walkthrough MicroSim
// Implement a "101" sequence detector Moore FSM in VHDL
// Bloom Level: Apply (L3) - Apply VHDL FSM design patterns
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
const CODE_BG = '#263238';
const CODE_FG = '#ECEFF1';
const KEYWORD_COLOR = '#CE93D8';
const TYPE_COLOR = '#80CBC4';
const COMMENT_COLOR = '#78909C';
const STATE_IDLE = '#5C6BC0';
const STATE_GOT1 = '#FF9800';
const STATE_GOT10 = '#E91E63';
const ACTIVE_STATE = '#4CAF50';

// FSM states for "101" detector
// S0 (IDLE) --1--> S1 (GOT1) --0--> S2 (GOT10) --1--> S0 (output=1)
// Other transitions return to S0 or S1

let steps = [
  {
    title: "VHDL FSM: \"101\" Sequence Detector",
    desc: "We will implement a Moore FSM in VHDL that detects\nthe input sequence 1-0-1 and asserts output 'detected'.",
    rule: "Moore FSM: output depends on state only",
    visual: "intro"
  },
  {
    title: "Step 1: State Diagram",
    desc: "Three states: IDLE, GOT_1, GOT_10. Output 'detected'\nasserts when returning to IDLE after seeing 1\u21920\u21921.",
    rule: "3 states, 1 output, detect \"101\"",
    visual: "state-diagram",
    activeState: -1
  },
  {
    title: "Step 2: Type Declaration & Signals",
    desc: "Declare an enumerated type for states and two signals:\ncurrent_state (register) and next_state (combinational).",
    rule: "TYPE state_type IS (IDLE, GOT_1, GOT_10)",
    visual: "code-type"
  },
  {
    title: "Step 3: State Register Process",
    desc: "Sequential process: on rising_edge(clk), load next_state\ninto current_state. Reset sets state to IDLE.",
    rule: "Rising edge clocked register process",
    visual: "code-register"
  },
  {
    title: "Step 4: Next-State Logic (Part 1)",
    desc: "Combinational process with CASE statement. IDLE: if\ninput=1 go to GOT_1, else stay. GOT_1: if 0 go to GOT_10.",
    rule: "CASE current_state IS WHEN ...",
    visual: "code-next-state-1"
  },
  {
    title: "Step 5: Next-State Logic (Part 2)",
    desc: "GOT_10: if input=1 go to IDLE (detected!), else back to\nIDLE. Complete all transitions for every state/input pair.",
    rule: "All state/input combinations covered",
    visual: "code-next-state-2"
  },
  {
    title: "Step 6: Output Logic",
    desc: "Moore output: detected='1' only in the transition from\nGOT_10 when input=1. Use concurrent signal assignment.",
    rule: "Moore: output = f(state) only",
    visual: "code-output"
  },
  {
    title: "Step 7: Simulate \u2014 Input: 1, 0, 1",
    desc: "Trace: IDLE\u21921\u2192GOT_1\u21920\u2192GOT_10\u21921\u2192IDLE\n'detected' asserts on the final transition. Pattern found!",
    rule: "Trace: IDLE \u2192 GOT_1 \u2192 GOT_10 \u2192 IDLE",
    visual: "simulate"
  },
  {
    title: "Result: FSM Implementation Complete",
    desc: "The VHDL FSM uses 3 processes: state register,\nnext-state logic, and output logic \u2014 a clean, standard pattern.",
    rule: "3-process FSM design pattern",
    visual: "result"
  }
];

totalSteps = steps.length;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  describe('VHDL FSM walkthrough showing state diagram to code translation', LABEL);
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

  // Measure description
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
  } else if (step.visual === 'state-diagram') {
    drawStateDiagram(margin, visY, w, visH, -1);
  } else if (step.visual === 'code-type') {
    drawCodeBlock(margin, visY, w, visH, 'type');
  } else if (step.visual === 'code-register') {
    drawCodeBlock(margin, visY, w, visH, 'register');
  } else if (step.visual === 'code-next-state-1') {
    drawCodeBlock(margin, visY, w, visH, 'next1');
  } else if (step.visual === 'code-next-state-2') {
    drawCodeBlock(margin, visY, w, visH, 'next2');
  } else if (step.visual === 'code-output') {
    drawCodeBlock(margin, visY, w, visH, 'output');
  } else if (step.visual === 'simulate') {
    drawSimulation(margin, visY, w, visH);
  } else if (step.visual === 'result') {
    drawResultView(margin, visY, w, visH);
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

  drawButtons();
}

function drawIntro(mx, vy, w, vh) {
  let cx = canvasWidth / 2;

  fill(60);
  textAlign(CENTER, CENTER);
  textSize(15);
  textStyle(BOLD);
  text('"101" Sequence Detector', cx, vy + 20);

  // Input/output diagram
  let boxY = vy + 42;
  fill(240);
  stroke(100);
  strokeWeight(1);
  rect(cx - 70, boxY, 140, 55, 5);
  noStroke();
  fill(60);
  textSize(13);
  textStyle(BOLD);
  text('Moore FSM', cx, boxY + 15);
  textSize(10);
  textStyle(NORMAL);
  text('3 states', cx, boxY + 32);
  text('Detect: 1 \u2192 0 \u2192 1', cx, boxY + 45);

  // Input arrow
  stroke(STATE_IDLE);
  strokeWeight(2);
  line(cx - 110, boxY + 27, cx - 72, boxY + 27);
  line(cx - 77, boxY + 23, cx - 72, boxY + 27);
  line(cx - 77, boxY + 31, cx - 72, boxY + 27);
  noStroke();
  fill(STATE_IDLE);
  textAlign(RIGHT, CENTER);
  textSize(11);
  textStyle(BOLD);
  text('din', cx - 115, boxY + 27);

  // Output arrow
  stroke(ACTIVE_STATE);
  strokeWeight(2);
  line(cx + 70, boxY + 27, cx + 108, boxY + 27);
  line(cx + 103, boxY + 23, cx + 108, boxY + 27);
  line(cx + 103, boxY + 31, cx + 108, boxY + 27);
  noStroke();
  fill(ACTIVE_STATE);
  textAlign(LEFT, CENTER);
  textSize(11);
  textStyle(BOLD);
  text('detected', cx + 113, boxY + 27);

  // Clock arrow
  stroke(100);
  strokeWeight(1);
  line(cx - 10, boxY + 55, cx - 10, boxY + 62);
  line(cx - 10, boxY + 62, cx, boxY + 55);
  line(cx, boxY + 55, cx, boxY + 62);
  noStroke();
  fill(100);
  textSize(9);
  textAlign(CENTER, TOP);
  text('clk', cx - 5, boxY + 64);

  // VHDL approach
  let appY = boxY + 85;
  fill(60);
  textAlign(CENTER, CENTER);
  textSize(12);
  textStyle(BOLD);
  text('VHDL 3-Process Pattern:', cx, appY);

  let items = ['1. Type declaration & signals', '2. State register (sequential)', '3. Next-state logic (combinational)', '4. Output logic (combinational)'];
  textSize(11);
  textStyle(NORMAL);
  textAlign(LEFT, CENTER);
  for (let i = 0; i < items.length; i++) {
    fill(80);
    text(items[i], cx - 100, appY + 18 + i * 16);
  }

  fill(100);
  textAlign(CENTER, CENTER);
  textSize(13);
  text('Click "Next \u2192" to begin', cx, vy + vh - 12);
}

function drawStateDiagram(mx, vy, w, vh, activeIdx) {
  let cx = canvasWidth / 2;
  let stateR = 28;

  // State positions
  let states = [
    { name: 'IDLE', x: cx - 100, y: vy + vh / 2 - 10, color: STATE_IDLE, out: '0' },
    { name: 'GOT_1', x: cx + 10, y: vy + 25, color: STATE_GOT1, out: '0' },
    { name: 'GOT_10', x: cx + 10, y: vy + vh / 2 + 35, color: STATE_GOT10, out: '0' }
  ];

  // Draw transitions first (behind states)
  stroke(100);
  strokeWeight(1.5);

  // IDLE --1--> GOT_1
  drawArrowBetween(states[0].x, states[0].y, states[1].x, states[1].y, stateR, '1');
  // GOT_1 --0--> GOT_10
  drawArrowBetween(states[1].x, states[1].y, states[2].x, states[2].y, stateR, '0');
  // GOT_10 --1--> IDLE (detected!)
  drawCurvedArrow(states[2].x, states[2].y, states[0].x, states[0].y, stateR, '1/det=1', -30);
  // GOT_1 --1--> GOT_1 (self-loop)
  drawSelfLoop(states[1].x, states[1].y, stateR, '1', -1);
  // IDLE --0--> IDLE (self-loop)
  drawSelfLoop(states[0].x, states[0].y, stateR, '0', 1);
  // GOT_10 --0--> IDLE
  drawArrowBetween(states[2].x, states[2].y - 5, states[0].x, states[0].y + 15, stateR, '0');

  // Draw state circles
  for (let i = 0; i < states.length; i++) {
    let s = states[i];
    let isActive = (i === activeIdx);

    fill(isActive ? ACTIVE_STATE + '30' : s.color + '20');
    stroke(isActive ? ACTIVE_STATE : s.color);
    strokeWeight(2);
    ellipse(s.x, s.y, stateR * 2, stateR * 2);
    noStroke();

    fill(isActive ? ACTIVE_STATE : s.color);
    textAlign(CENTER, CENTER);
    textSize(10);
    textStyle(BOLD);
    text(s.name, s.x, s.y - 3);
    textSize(8);
    textStyle(NORMAL);
    text('det=' + s.out, s.x, s.y + 10);
  }

  // Reset arrow to IDLE
  stroke(100);
  strokeWeight(1.5);
  let resetX = states[0].x - stateR - 25;
  line(resetX, states[0].y, states[0].x - stateR, states[0].y);
  line(states[0].x - stateR - 5, states[0].y - 4, states[0].x - stateR, states[0].y);
  line(states[0].x - stateR - 5, states[0].y + 4, states[0].x - stateR, states[0].y);
  noStroke();
  fill(100);
  textSize(9);
  textAlign(CENTER, CENTER);
  text('reset', resetX - 5, states[0].y - 10);
}

function drawArrowBetween(x1, y1, x2, y2, r, label) {
  let angle = atan2(y2 - y1, x2 - x1);
  let sx = x1 + r * cos(angle);
  let sy = y1 + r * sin(angle);
  let ex = x2 - r * cos(angle);
  let ey = y2 - r * sin(angle);

  stroke(100);
  strokeWeight(1.5);
  line(sx, sy, ex, ey);
  // Arrowhead
  let aLen = 8;
  line(ex, ey, ex - aLen * cos(angle - 0.4), ey - aLen * sin(angle - 0.4));
  line(ex, ey, ex - aLen * cos(angle + 0.4), ey - aLen * sin(angle + 0.4));
  noStroke();

  // Label
  let mx = (sx + ex) / 2;
  let my = (sy + ey) / 2;
  let perpX = -sin(angle) * 10;
  let perpY = cos(angle) * 10;
  fill(HIGHLIGHT);
  textAlign(CENTER, CENTER);
  textSize(10);
  textStyle(BOLD);
  text(label, mx + perpX, my + perpY);
}

function drawCurvedArrow(x1, y1, x2, y2, r, label, offset) {
  let mx = (x1 + x2) / 2;
  let my = (y1 + y2) / 2 + offset;

  stroke(100);
  strokeWeight(1.5);
  noFill();
  beginShape();
  let angle1 = atan2(my - y1, mx - x1);
  let sx = x1 + r * cos(atan2(my - y1, mx - x1));
  let sy = y1 + r * sin(atan2(my - y1, mx - x1));
  let angle2 = atan2(y2 - my, x2 - mx);
  let ex = x2 + r * cos(atan2(my - y2, mx - x2));
  let ey = y2 + r * sin(atan2(my - y2, mx - x2));
  bezier(sx, sy, mx, my - 20, mx, my - 20, ex, ey);
  endShape();

  // Arrowhead at end
  let aAngle = atan2(ey - (my - 20), ex - mx);
  line(ex, ey, ex - 8 * cos(aAngle - 0.4), ey - 8 * sin(aAngle - 0.4));
  line(ex, ey, ex - 8 * cos(aAngle + 0.4), ey - 8 * sin(aAngle + 0.4));
  noStroke();

  fill(ACTIVE_STATE);
  textAlign(CENTER, CENTER);
  textSize(9);
  textStyle(BOLD);
  text(label, mx, my - 35);
}

function drawSelfLoop(x, y, r, label, side) {
  let loopX = x + side * (r + 15);
  let loopY = y - r - 10;

  stroke(100);
  strokeWeight(1.5);
  noFill();
  arc(loopX, loopY, 22, 22, side > 0 ? -PI / 2 : -PI / 2, side > 0 ? PI * 1.2 : PI + PI / 2);
  noStroke();

  fill(HIGHLIGHT);
  textAlign(CENTER, CENTER);
  textSize(10);
  textStyle(BOLD);
  text(label, loopX + side * 5, loopY - 16);
}

function drawCodeBlock(mx, vy, w, vh, mode) {
  // Dark code background
  fill(CODE_BG);
  noStroke();
  rect(mx + 5, vy + 5, w - 10, vh - 10, 5);

  textAlign(LEFT, TOP);
  textSize(11);
  let x = mx + 15;
  let y = vy + 15;
  let lineH = 14;

  if (mode === 'type') {
    drawCodeLine(x, y, lineH, 0, COMMENT_COLOR, '-- Type declaration');
    drawCodeLine(x, y, lineH, 1, KEYWORD_COLOR, 'TYPE', CODE_FG, ' state_type ', KEYWORD_COLOR, 'IS');
    drawCodeLine(x, y, lineH, 2, CODE_FG, '  (IDLE, GOT_1, GOT_10);');
    drawCodeLine(x, y, lineH, 3, CODE_FG, '');
    drawCodeLine(x, y, lineH, 4, COMMENT_COLOR, '-- State signals');
    drawCodeLine(x, y, lineH, 5, KEYWORD_COLOR, 'SIGNAL', CODE_FG, ' current_state : state_type;');
    drawCodeLine(x, y, lineH, 6, KEYWORD_COLOR, 'SIGNAL', CODE_FG, ' next_state    : state_type;');

    // Annotation
    let annY = vy + vh - 55;
    fill(TYPE_COLOR);
    textSize(10);
    textStyle(NORMAL);
    textAlign(LEFT, TOP);
    text('\u25B6 Enumerated type = readable state names', mx + 15, annY);
    text('\u25B6 Two signals separate register from logic', mx + 15, annY + 15);
  } else if (mode === 'register') {
    drawCodeLine(x, y, lineH, 0, COMMENT_COLOR, '-- State register process');
    drawCodeLine(x, y, lineH, 1, KEYWORD_COLOR, 'PROCESS', CODE_FG, '(clk, reset)');
    drawCodeLine(x, y, lineH, 2, KEYWORD_COLOR, 'BEGIN');
    drawCodeLine(x, y, lineH, 3, CODE_FG, '  ', KEYWORD_COLOR, 'IF', CODE_FG, ' reset = \'1\' ', KEYWORD_COLOR, 'THEN');
    drawCodeLine(x, y, lineH, 4, CODE_FG, '    current_state <= IDLE;');
    drawCodeLine(x, y, lineH, 5, CODE_FG, '  ', KEYWORD_COLOR, 'ELSIF', CODE_FG, ' rising_edge(clk) ', KEYWORD_COLOR, 'THEN');
    drawCodeLine(x, y, lineH, 6, CODE_FG, '    current_state <= next_state;');
    drawCodeLine(x, y, lineH, 7, CODE_FG, '  ', KEYWORD_COLOR, 'END IF', CODE_FG, ';');
    drawCodeLine(x, y, lineH, 8, KEYWORD_COLOR, 'END PROCESS', CODE_FG, ';');

    let annY = vy + vh - 40;
    fill(TYPE_COLOR);
    textSize(10);
    textStyle(NORMAL);
    textAlign(LEFT, TOP);
    text('\u25B6 Sensitivity list: clk, reset', mx + 15, annY);
    text('\u25B6 Async reset, sync state update', mx + 15, annY + 15);
  } else if (mode === 'next1') {
    drawCodeLine(x, y, lineH, 0, COMMENT_COLOR, '-- Next-state logic (part 1)');
    drawCodeLine(x, y, lineH, 1, KEYWORD_COLOR, 'PROCESS', CODE_FG, '(current_state, din)');
    drawCodeLine(x, y, lineH, 2, KEYWORD_COLOR, 'BEGIN');
    drawCodeLine(x, y, lineH, 3, CODE_FG, '  ', KEYWORD_COLOR, 'CASE', CODE_FG, ' current_state ', KEYWORD_COLOR, 'IS');
    drawCodeLine(x, y, lineH, 4, CODE_FG, '    ', KEYWORD_COLOR, 'WHEN', CODE_FG, ' IDLE =>');
    drawCodeLine(x, y, lineH, 5, CODE_FG, '      ', KEYWORD_COLOR, 'IF', CODE_FG, ' din=\'1\' ', KEYWORD_COLOR, 'THEN');
    drawCodeLine(x, y, lineH, 6, CODE_FG, '        next_state <= GOT_1;');
    drawCodeLine(x, y, lineH, 7, CODE_FG, '      ', KEYWORD_COLOR, 'ELSE');
    drawCodeLine(x, y, lineH, 8, CODE_FG, '        next_state <= IDLE;');
    drawCodeLine(x, y, lineH, 9, CODE_FG, '      ', KEYWORD_COLOR, 'END IF', CODE_FG, ';');

    let annY = vy + vh - 25;
    fill(TYPE_COLOR);
    textSize(10);
    textStyle(NORMAL);
    textAlign(LEFT, TOP);
    text('\u25B6 IDLE: wait for first \'1\' of pattern', mx + 15, annY);
  } else if (mode === 'next2') {
    drawCodeLine(x, y, lineH, 0, CODE_FG, '    ', KEYWORD_COLOR, 'WHEN', CODE_FG, ' GOT_1 =>');
    drawCodeLine(x, y, lineH, 1, CODE_FG, '      ', KEYWORD_COLOR, 'IF', CODE_FG, ' din=\'0\' ', KEYWORD_COLOR, 'THEN');
    drawCodeLine(x, y, lineH, 2, CODE_FG, '        next_state <= GOT_10;');
    drawCodeLine(x, y, lineH, 3, CODE_FG, '      ', KEYWORD_COLOR, 'ELSE');
    drawCodeLine(x, y, lineH, 4, CODE_FG, '        next_state <= GOT_1;');
    drawCodeLine(x, y, lineH, 5, CODE_FG, '      ', KEYWORD_COLOR, 'END IF', CODE_FG, ';');
    drawCodeLine(x, y, lineH, 6, CODE_FG, '    ', KEYWORD_COLOR, 'WHEN', CODE_FG, ' GOT_10 =>');
    drawCodeLine(x, y, lineH, 7, CODE_FG, '      ', KEYWORD_COLOR, 'IF', CODE_FG, ' din=\'1\' ', KEYWORD_COLOR, 'THEN');
    drawCodeLine(x, y, lineH, 8, CODE_FG, '        next_state <= IDLE;');
    drawCodeLine(x, y, lineH, 9, CODE_FG, '      ', KEYWORD_COLOR, 'ELSE');
    drawCodeLine(x, y, lineH, 10, CODE_FG, '        next_state <= IDLE;');
    drawCodeLine(x, y, lineH, 11, CODE_FG, '      ', KEYWORD_COLOR, 'END IF', CODE_FG, ';');
    drawCodeLine(x, y, lineH, 12, CODE_FG, '  ', KEYWORD_COLOR, 'END CASE', CODE_FG, ';');
    drawCodeLine(x, y, lineH, 13, KEYWORD_COLOR, 'END PROCESS', CODE_FG, ';');

    let annY = vy + vh - 25;
    fill(TYPE_COLOR);
    textSize(10);
    textStyle(NORMAL);
    textAlign(LEFT, TOP);
    text('\u25B6 All state/input pairs covered \u2192 no latches', mx + 15, annY);
  } else if (mode === 'output') {
    drawCodeLine(x, y, lineH, 0, COMMENT_COLOR, '-- Output logic (Moore)');
    drawCodeLine(x, y, lineH, 1, KEYWORD_COLOR, 'PROCESS', CODE_FG, '(current_state)');
    drawCodeLine(x, y, lineH, 2, KEYWORD_COLOR, 'BEGIN');
    drawCodeLine(x, y, lineH, 3, CODE_FG, '  ', KEYWORD_COLOR, 'CASE', CODE_FG, ' current_state ', KEYWORD_COLOR, 'IS');
    drawCodeLine(x, y, lineH, 4, CODE_FG, '    ', KEYWORD_COLOR, 'WHEN', CODE_FG, ' IDLE   => detected<=\'0\';');
    drawCodeLine(x, y, lineH, 5, CODE_FG, '    ', KEYWORD_COLOR, 'WHEN', CODE_FG, ' GOT_1  => detected<=\'0\';');
    drawCodeLine(x, y, lineH, 6, CODE_FG, '    ', KEYWORD_COLOR, 'WHEN', CODE_FG, ' GOT_10 => detected<=\'0\';');
    drawCodeLine(x, y, lineH, 7, CODE_FG, '  ', KEYWORD_COLOR, 'END CASE', CODE_FG, ';');
    drawCodeLine(x, y, lineH, 8, KEYWORD_COLOR, 'END PROCESS', CODE_FG, ';');

    let annY = vy + vh - 55;
    fill(TYPE_COLOR);
    textSize(10);
    textStyle(NORMAL);
    textAlign(LEFT, TOP);
    text('\u25B6 Moore: output depends on state only', mx + 15, annY);
    text('\u25B6 Detection signaled when FSM returns to', mx + 15, annY + 15);
    text('  IDLE after GOT_10 + din=1 transition', mx + 15, annY + 30);
  }
}

function drawCodeLine(x, y, lineH, lineNum) {
  let drawX = x;
  let drawY = y + lineNum * lineH;
  textStyle(NORMAL);
  textSize(11);

  // Process pairs of (color, text) from arguments starting at index 4
  for (let i = 4; i < arguments.length; i += 2) {
    let color = arguments[i];
    let txt = arguments[i + 1] || '';
    fill(color);
    textAlign(LEFT, TOP);
    text(txt, drawX, drawY);
    drawX += textWidth(txt);
  }
}

function drawSimulation(mx, vy, w, vh) {
  let cx = canvasWidth / 2;
  let stateR = 22;

  // States positioned horizontally for trace
  let statePositions = [
    { name: 'IDLE', x: cx - 110, y: vy + 35 },
    { name: 'GOT_1', x: cx, y: vy + 35 },
    { name: 'GOT_10', x: cx + 110, y: vy + 35 }
  ];
  let stateColors = [STATE_IDLE, STATE_GOT1, STATE_GOT10];

  // Draw state circles
  for (let i = 0; i < statePositions.length; i++) {
    let s = statePositions[i];
    fill(stateColors[i] + '20');
    stroke(stateColors[i]);
    strokeWeight(2);
    ellipse(s.x, s.y, stateR * 2, stateR * 2);
    noStroke();
    fill(stateColors[i]);
    textAlign(CENTER, CENTER);
    textSize(9);
    textStyle(BOLD);
    text(s.name, s.x, s.y);
  }

  // Trace sequence
  let traceInputs = [1, 0, 1];
  let traceStates = [0, 1, 2, 0]; // State indices
  let traceY = vy + 80;

  // Timeline header
  fill(60);
  textAlign(CENTER, CENTER);
  textSize(11);
  textStyle(BOLD);
  text('Clock', mx + 40, traceY);
  text('Input', mx + 90, traceY);
  text('State', cx + 10, traceY);
  text('Output', cx + 100, traceY);

  // Timeline rows
  let rowH = 28;
  for (let i = 0; i <= 3; i++) {
    let ry = traceY + 15 + i * rowH;
    let stateNames = ['IDLE', 'GOT_1', 'GOT_10', 'IDLE'];

    // Alternating row background
    if (i % 2 === 0) {
      fill(255, 255, 255, 80);
      noStroke();
      rect(mx + 10, ry - 2, w - 20, rowH, 2);
    }

    // Highlight active row
    fill(stateColors[traceStates[i]]);
    noStroke();
    rect(mx + 12, ry, 4, rowH - 6, 2);

    fill(80);
    textSize(11);
    textStyle(NORMAL);
    textAlign(CENTER, CENTER);
    text(i === 0 ? 'Init' : '' + i, mx + 40, ry + rowH / 2 - 3);
    text(i === 0 ? '-' : '' + traceInputs[i - 1], mx + 90, ry + rowH / 2 - 3);

    fill(stateColors[traceStates[i]]);
    textStyle(BOLD);
    text(stateNames[i], cx + 10, ry + rowH / 2 - 3);

    // Output
    let detected = (i === 3) ? '1' : '0';
    fill(detected === '1' ? ACTIVE_STATE : '#BDBDBD');
    textSize(13);
    textStyle(BOLD);
    text(detected, cx + 100, ry + rowH / 2 - 3);

    if (detected === '1') {
      fill(ACTIVE_STATE + '30');
      noStroke();
      rect(cx + 80, ry - 2, 40, rowH, 3);
      fill(ACTIVE_STATE);
      textAlign(CENTER, CENTER);
      textSize(13);
      textStyle(BOLD);
      text('1', cx + 100, ry + rowH / 2 - 3);
    }
  }

  // Detection indicator
  let detY = traceY + 15 + 4 * rowH + 5;
  fill(RESULT_BG);
  stroke('#4CAF50');
  strokeWeight(2);
  rect(mx + 20, detY, w - 40, 28, 5);
  noStroke();
  fill('#1B5E20');
  textAlign(CENTER, CENTER);
  textSize(12);
  textStyle(BOLD);
  text('\u2714 Pattern "101" detected! Output = 1', cx, detY + 14);
}

function drawResultView(mx, vy, w, vh) {
  let cx = canvasWidth / 2;

  fill('#4CAF50');
  textAlign(CENTER, CENTER);
  textSize(16);
  textStyle(BOLD);
  text('\u2714 VHDL FSM Complete', cx, vy + 20);

  let y = vy + 45;
  let boxW = w - 40;
  let boxes = [
    { label: '1. Type Declaration', detail: 'TYPE state_type IS (IDLE, GOT_1, GOT_10)', color: STATE_IDLE },
    { label: '2. State Register', detail: 'PROCESS(clk, reset) - rising_edge update', color: STATE_GOT1 },
    { label: '3. Next-State Logic', detail: 'CASE statement covers all state/input pairs', color: STATE_GOT10 },
    { label: '4. Output Logic', detail: 'Moore: detected = f(current_state)', color: ACTIVE_STATE }
  ];

  for (let i = 0; i < boxes.length; i++) {
    let b = boxes[i];
    fill(b.color + '15');
    stroke(b.color);
    strokeWeight(1);
    rect(mx + 20, y, boxW, 38, 5);
    noStroke();
    fill(b.color);
    textSize(11);
    textStyle(BOLD);
    textAlign(LEFT, CENTER);
    text(b.label, mx + 30, y + 12);
    fill(80);
    textSize(10);
    textStyle(NORMAL);
    text(b.detail, mx + 30, y + 27);
    y += 44;
  }
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
  textSize(14);
  textStyle(BOLD);
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
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
