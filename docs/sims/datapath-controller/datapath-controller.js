// Datapath-Controller Interaction MicroSim
// Interactive datapath with FSM controller and clock stepping

let containerWidth;
let canvasWidth = 400;
let drawHeight = 500;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

// FSM states
const IDLE = 0;
const LOAD = 1;
const COMPUTE = 2;
const DONE = 3;

let currentState = IDLE;
let stateNames = ["IDLE", "LOAD", "COMPUTE", "DONE"];

// Register values
let regA = 0;
let regB = 0;
let regResult = 0;
let inputA = 7;  // Input value for A
let inputB = 5;  // Input value for B
let aluOutput = 0;

// Control signals
let controlSignals = {
  load_A: false,
  load_B: false,
  alu_op: "NOP",
  mux_sel: "INPUT",
  load_result: false
};

// Button bounds
let _clockBtn, _aBtn, _bBtn, _resetBtn;

// Colors
const COLOR_FSM = '#5C6BC0';
const COLOR_DATAPATH = '#FF7043';
const COLOR_ACTIVE = '#4CAF50';
const COLOR_WIRE = '#666';
const COLOR_INACTIVE = '#BDBDBD';

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  describe('Datapath-controller interaction showing FSM states and data flow through registers, MUX, and ALU', LABEL);
}

function draw() {
  updateCanvasSize();
  background(245);

  // Layout
  let fsmAreaWidth = canvasWidth * 0.38;
  let dpAreaX = fsmAreaWidth;
  let dpAreaWidth = canvasWidth - fsmAreaWidth;

  // Section divider
  stroke(200);
  strokeWeight(1);
  line(fsmAreaWidth, 0, fsmAreaWidth, drawHeight);

  // Draw section titles
  fill(50);
  noStroke();
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text("Controller (FSM)", fsmAreaWidth / 2, 8);
  text("Datapath", dpAreaX + dpAreaWidth / 2, 8);
  textStyle(NORMAL);

  drawFSM(fsmAreaWidth);
  drawDatapath(dpAreaX, dpAreaWidth);
  drawControlSignals(fsmAreaWidth, dpAreaX);
  drawControls();

  // Hand cursor on hover
  let hovering = false;
  if (_clockBtn && isInside(mouseX, mouseY, _clockBtn)) hovering = true;
  if (_aBtn && isInside(mouseX, mouseY, _aBtn)) hovering = true;
  if (_bBtn && isInside(mouseX, mouseY, _bBtn)) hovering = true;
  if (_resetBtn && isInside(mouseX, mouseY, _resetBtn)) hovering = true;
  cursor(hovering ? HAND : ARROW);
}

function drawFSM(areaWidth) {
  let centerX = areaWidth / 2;
  let centerY = 180;
  let radius = 65;

  // State positions in a diamond layout
  let statePos = [
    { x: centerX, y: centerY - radius },          // IDLE (top)
    { x: centerX + radius, y: centerY },           // LOAD (right)
    { x: centerX, y: centerY + radius },            // COMPUTE (bottom)
    { x: centerX - radius, y: centerY }             // DONE (left)
  ];

  let stateRadius = 30;

  // Draw transition arrows
  for (let i = 0; i < 3; i++) {
    let from = statePos[i];
    let to = statePos[i + 1];
    drawArrow(from.x, from.y, to.x, to.y, stateRadius, COLOR_FSM);
  }

  // Arrow from DONE back to IDLE
  let fromDone = statePos[3];
  let toIdle = statePos[0];
  // Curved arrow
  stroke(COLOR_FSM);
  strokeWeight(1.5);
  noFill();
  let cpx = centerX - radius - 30;
  let cpy = centerY - radius / 2;
  bezier(fromDone.x - stateRadius * 0.7, fromDone.y - stateRadius * 0.7,
         cpx, cpy - 30, cpx, cpy + 10,
         toIdle.x - stateRadius * 0.7, toIdle.y + stateRadius * 0.3);

  // Draw state circles
  for (let i = 0; i < 4; i++) {
    let pos = statePos[i];
    let isCurrent = (currentState === i);

    // Circle
    fill(isCurrent ? COLOR_ACTIVE : 255);
    stroke(isCurrent ? '#388E3C' : COLOR_FSM);
    strokeWeight(isCurrent ? 3 : 1.5);
    ellipse(pos.x, pos.y, stateRadius * 2, stateRadius * 2);

    // State name
    fill(isCurrent ? 255 : COLOR_FSM);
    noStroke();
    textSize(10);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text(stateNames[i], pos.x, pos.y);
    textStyle(NORMAL);
  }

  // Current state info box
  let infoY = 290;
  fill(255);
  stroke(COLOR_FSM);
  strokeWeight(1);
  rect(10, infoY, areaWidth - 20, 90, 5);

  fill(COLOR_FSM);
  noStroke();
  textSize(12);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text("Current State: " + stateNames[currentState], areaWidth / 2, infoY + 8);
  textStyle(NORMAL);

  textSize(10);
  fill(80);
  textAlign(LEFT, TOP);
  let descriptions = [
    "Waiting for start.\nNo operations active.",
    "Loading input values\ninto registers A and B.",
    "ALU computes A + B.\nResult on ALU output.",
    "Storing result in\noutput register."
  ];
  text(descriptions[currentState], 20, infoY + 30);

  // Cycle counter
  fill(100);
  textSize(11);
  textAlign(CENTER, TOP);
  text("Cycle: " + currentState + " / 3", areaWidth / 2, infoY + 75);
}

function drawArrow(x1, y1, x2, y2, nodeRadius, col) {
  let angle = atan2(y2 - y1, x2 - x1);
  let startX = x1 + cos(angle) * nodeRadius;
  let startY = y1 + sin(angle) * nodeRadius;
  let endX = x2 - cos(angle) * nodeRadius;
  let endY = y2 - sin(angle) * nodeRadius;

  stroke(col);
  strokeWeight(1.5);
  line(startX, startY, endX, endY);

  // Arrowhead
  let arrowSize = 8;
  fill(col);
  noStroke();
  push();
  translate(endX, endY);
  rotate(angle);
  triangle(0, 0, -arrowSize, -arrowSize / 2, -arrowSize, arrowSize / 2);
  pop();
}

function drawDatapath(dpX, dpWidth) {
  let cx = dpX + dpWidth / 2;
  let regW = 70;
  let regH = 40;

  // Register A
  let regAX = cx - 50;
  let regAY = 50;
  drawRegister(regAX, regAY, regW, regH, "Reg A", regA, controlSignals.load_A);

  // Register B
  let regBX = cx + 50;
  let regBY = 50;
  drawRegister(regBX, regBY, regW, regH, "Reg B", regB, controlSignals.load_B);

  // Input labels
  fill(100);
  noStroke();
  textSize(10);
  textAlign(CENTER, BOTTOM);
  text("In: " + inputA, regAX, regAY - regH / 2 - 2);
  text("In: " + inputB, regBX, regBY - regH / 2 - 2);

  // Wires from registers down to MUX/ALU
  let wireColor = controlSignals.alu_op === "ADD" ? COLOR_ACTIVE : COLOR_WIRE;
  stroke(wireColor);
  strokeWeight(1.5);
  // Wire from Reg A down
  line(regAX, regAY + regH / 2, regAX, 160);
  // Wire from Reg B down
  line(regBX, regBY + regH / 2, regBX, 160);

  // ALU (triangle)
  let aluX = cx;
  let aluY = 200;
  let aluW = 80;
  let aluH = 60;

  fill(controlSignals.alu_op === "ADD" ? '#C8E6C9' : '#E0E0E0');
  stroke(controlSignals.alu_op === "ADD" ? COLOR_ACTIVE : COLOR_WIRE);
  strokeWeight(2);
  // ALU as trapezoid
  beginShape();
  vertex(aluX - aluW / 2, aluY - aluH / 2);      // Top-left
  vertex(aluX + aluW / 2, aluY - aluH / 2);       // Top-right
  vertex(aluX + aluW / 3, aluY + aluH / 2);       // Bottom-right
  vertex(aluX - aluW / 3, aluY + aluH / 2);       // Bottom-left
  endShape(CLOSE);

  // ALU label
  fill(controlSignals.alu_op === "ADD" ? '#2E7D32' : 100);
  noStroke();
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text("ALU", aluX, aluY - 5);
  textSize(10);
  textStyle(NORMAL);
  text(controlSignals.alu_op === "ADD" ? "A + B" : "---", aluX, aluY + 15);

  // Wires into ALU
  stroke(wireColor);
  strokeWeight(1.5);
  line(regAX, 160, aluX - 20, aluY - aluH / 2);
  line(regBX, 160, aluX + 20, aluY - aluH / 2);

  // ALU output wire
  let aluOutY = aluY + aluH / 2;
  stroke(controlSignals.alu_op === "ADD" ? COLOR_ACTIVE : COLOR_WIRE);
  line(aluX, aluOutY, aluX, aluOutY + 30);

  // ALU output value
  if (controlSignals.alu_op === "ADD" || currentState === DONE) {
    fill(COLOR_ACTIVE);
    noStroke();
    textSize(11);
    textAlign(LEFT, CENTER);
    text("= " + aluOutput, aluX + 10, aluOutY + 15);
  }

  // MUX
  let muxY = aluOutY + 40;
  let muxW = 40;
  let muxH = 35;

  fill(controlSignals.mux_sel === "ALU" ? '#C8E6C9' : '#E0E0E0');
  stroke(controlSignals.mux_sel === "ALU" ? COLOR_ACTIVE : COLOR_WIRE);
  strokeWeight(1.5);
  rect(aluX - muxW / 2, muxY, muxW, muxH, 3);

  fill(controlSignals.mux_sel === "ALU" ? '#2E7D32' : 100);
  noStroke();
  textSize(10);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text("MUX", aluX, muxY + muxH / 2);
  textStyle(NORMAL);

  // MUX sel label
  textSize(9);
  fill(150);
  textAlign(LEFT, CENTER);
  text("sel:" + controlSignals.mux_sel, aluX + muxW / 2 + 5, muxY + muxH / 2);

  // Wire from ALU to MUX
  stroke(controlSignals.mux_sel === "ALU" ? COLOR_ACTIVE : COLOR_WIRE);
  strokeWeight(1.5);
  line(aluX, aluOutY + 30, aluX, muxY);

  // Wire from MUX to Result register
  let resultY = muxY + muxH + 40;
  stroke(controlSignals.load_result ? COLOR_ACTIVE : COLOR_WIRE);
  line(aluX, muxY + muxH, aluX, resultY - regH / 2);

  // Result register
  drawRegister(aluX, resultY, regW + 10, regH, "Result", regResult, controlSignals.load_result);

  // Final output label
  if (currentState === DONE) {
    fill(COLOR_ACTIVE);
    noStroke();
    textSize(14);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    text(inputA + " + " + inputB + " = " + regResult, aluX, resultY + regH / 2 + 8);
    textStyle(NORMAL);
  }
}

function drawRegister(x, y, w, h, label, value, active) {
  // Register box
  fill(active ? '#C8E6C9' : 255);
  stroke(active ? COLOR_ACTIVE : COLOR_WIRE);
  strokeWeight(active ? 2.5 : 1.5);
  rect(x - w / 2, y - h / 2, w, h, 4);

  // Label
  fill(active ? '#2E7D32' : 80);
  noStroke();
  textSize(10);
  textAlign(CENTER, TOP);
  text(label, x, y - h / 2 + 3);

  // Value
  textSize(16);
  textStyle(BOLD);
  textAlign(CENTER, BOTTOM);
  text(value, x, y + h / 2 - 3);
  textStyle(NORMAL);
}

function drawControlSignals(fsmWidth, dpX) {
  // Draw control signal labels between FSM and datapath
  let sigY = 400;
  let sigX = fsmWidth + 10;

  fill(50);
  noStroke();
  textSize(11);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text("Control Signals:", sigX, sigY);
  textStyle(NORMAL);

  let signals = [
    { name: "load_A", val: controlSignals.load_A },
    { name: "load_B", val: controlSignals.load_B },
    { name: "alu_op", val: controlSignals.alu_op },
    { name: "mux_sel", val: controlSignals.mux_sel },
    { name: "load_result", val: controlSignals.load_result }
  ];

  textSize(10);
  for (let i = 0; i < signals.length; i++) {
    let sy = sigY + 18 + i * 16;
    let isActive = (signals[i].val === true || signals[i].val === "ADD" || signals[i].val === "ALU");

    // Signal indicator dot
    fill(isActive ? COLOR_ACTIVE : COLOR_INACTIVE);
    noStroke();
    ellipse(sigX + 6, sy + 4, 8, 8);

    // Signal name and value
    fill(isActive ? '#2E7D32' : 100);
    textAlign(LEFT, CENTER);
    let displayVal = (typeof signals[i].val === 'boolean')
      ? (signals[i].val ? "1" : "0")
      : signals[i].val;
    text(signals[i].name + " = " + displayVal, sigX + 14, sy + 4);
  }
}

function drawControls() {
  // Control area background
  fill(230);
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  let btnH = 34;
  let spacing = 8;
  let y = drawHeight + 8;
  let x = 10;

  textAlign(CENTER, CENTER);

  // Clock button (prominent)
  let clkW = 75;
  _clockBtn = { x: x, y: y, w: clkW, h: btnH };
  fill(COLOR_FSM);
  stroke('#303F9F');
  strokeWeight(2);
  rect(x, y, clkW, btnH, 5);
  fill(255);
  noStroke();
  textStyle(BOLD);
  textSize(14);
  text('Clock', x + clkW / 2, y + btnH / 2);
  textStyle(NORMAL);

  // Input A bit box
  x += clkW + spacing;
  let boxW = 55;
  fill(80);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  textStyle(BOLD);
  text('A', x, y + btnH / 2);
  textStyle(NORMAL);
  let aBoxX = x + 14;
  let aBoxW = boxW - 16;
  fill(COLOR_DATAPATH);
  stroke('#D84315');
  strokeWeight(2);
  rect(aBoxX, y + 3, aBoxW, btnH - 6, 4);
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);
  textStyle(BOLD);
  text(inputA, aBoxX + aBoxW / 2, y + btnH / 2);
  textStyle(NORMAL);
  _aBtn = { x: aBoxX, y: y + 3, w: aBoxW, h: btnH - 6 };

  // Input B bit box
  x += boxW + spacing;
  fill(80);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  textStyle(BOLD);
  text('B', x, y + btnH / 2);
  textStyle(NORMAL);
  let bBoxX = x + 14;
  let bBoxW = boxW - 16;
  fill(COLOR_DATAPATH);
  stroke('#D84315');
  strokeWeight(2);
  rect(bBoxX, y + 3, bBoxW, btnH - 6, 4);
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);
  textStyle(BOLD);
  text(inputB, bBoxX + bBoxW / 2, y + btnH / 2);
  textStyle(NORMAL);
  _bBtn = { x: bBoxX, y: y + 3, w: bBoxW, h: btnH - 6 };

  // Reset button
  x += boxW + spacing;
  let rstW = 60;
  _resetBtn = { x: x, y: y, w: rstW, h: btnH };
  fill('#F44336');
  stroke('#C62828');
  strokeWeight(2);
  rect(x, y, rstW, btnH, 5);
  fill(255);
  noStroke();
  textSize(12);
  textStyle(BOLD);
  text('Reset', x + rstW / 2, y + btnH / 2);
  textStyle(NORMAL);

  // State display box
  x += rstW + spacing;
  let stateW = 80;
  fill(currentState === DONE ? COLOR_ACTIVE : COLOR_FSM);
  stroke(currentState === DONE ? '#388E3C' : '#303F9F');
  strokeWeight(2);
  rect(x, y + 2, stateW, btnH - 4, 5);
  fill(255);
  noStroke();
  textSize(12);
  textStyle(BOLD);
  text(stateNames[currentState], x + stateW / 2, y + btnH / 2);
  textStyle(NORMAL);
}

function advanceClock() {
  switch (currentState) {
    case IDLE:
      // Transition to LOAD
      currentState = LOAD;
      controlSignals.load_A = true;
      controlSignals.load_B = true;
      controlSignals.alu_op = "NOP";
      controlSignals.mux_sel = "INPUT";
      controlSignals.load_result = false;
      regA = inputA;
      regB = inputB;
      break;

    case LOAD:
      // Transition to COMPUTE
      currentState = COMPUTE;
      controlSignals.load_A = false;
      controlSignals.load_B = false;
      controlSignals.alu_op = "ADD";
      controlSignals.mux_sel = "ALU";
      controlSignals.load_result = false;
      aluOutput = regA + regB;
      break;

    case COMPUTE:
      // Transition to DONE
      currentState = DONE;
      controlSignals.load_A = false;
      controlSignals.load_B = false;
      controlSignals.alu_op = "NOP";
      controlSignals.mux_sel = "ALU";
      controlSignals.load_result = true;
      regResult = aluOutput;
      break;

    case DONE:
      // Back to IDLE
      resetSystem();
      break;
  }
}

function resetSystem() {
  currentState = IDLE;
  regA = 0;
  regB = 0;
  regResult = 0;
  aluOutput = 0;
  controlSignals.load_A = false;
  controlSignals.load_B = false;
  controlSignals.alu_op = "NOP";
  controlSignals.mux_sel = "INPUT";
  controlSignals.load_result = false;
}

function mousePressed() {
  // Clock button
  if (_clockBtn && isInside(mouseX, mouseY, _clockBtn)) {
    advanceClock();
    return;
  }

  // Input A toggle (cycle 0-9)
  if (_aBtn && isInside(mouseX, mouseY, _aBtn)) {
    inputA = (inputA + 1) % 10;
    if (currentState === IDLE) resetSystem();
    return;
  }

  // Input B toggle (cycle 0-9)
  if (_bBtn && isInside(mouseX, mouseY, _bBtn)) {
    inputB = (inputB + 1) % 10;
    if (currentState === IDLE) resetSystem();
    return;
  }

  // Reset button
  if (_resetBtn && isInside(mouseX, mouseY, _resetBtn)) {
    resetSystem();
    return;
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
