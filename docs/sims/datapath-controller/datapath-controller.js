// Datapath-Controller Interaction MicroSim
// Interactive datapath with FSM controller and clock stepping

let containerWidth;
let canvasWidth = 400;
let drawHeight = 500;
let controlHeight = 0;
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
let inputA = 7;
let inputB = 5;
let aluOutput = 0;

// ALU operation
let selectedOp = "ADD";

// Control signals
let controlSignals = {
  load_A: false,
  load_B: false,
  alu_op: "NOP",
  mux_sel: "INPUT",
  load_result: false
};

// DOM elements
let inputAField, inputBField, opSelect, stateDisplay;

// Transition glow tracking
let lastTransition = -1;
let transitionTime = 0;
let reducedMotion = false;
let resultLoaded = false;

// Colors
const COLOR_FSM = '#5C6BC0';
const COLOR_DATAPATH = '#FF7043';
const COLOR_ACTIVE = '#4CAF50';
const COLOR_WIRE = '#666';
const COLOR_INACTIVE = '#BDBDBD';

function setup() {
  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  describe('Datapath-controller interaction showing FSM states and data flow through registers, MUX, and ALU', LABEL);

  // --- DOM flex control bar ---
  var bar = document.createElement('div');
  bar.className = 'dp-controls';
  mainElement.appendChild(bar);

  // CLK button
  var clkBtn = document.createElement('button');
  clkBtn.className = 'dp-controls__btn dp-controls__btn--clk';
  clkBtn.textContent = 'CLK';
  clkBtn.addEventListener('click', function() { advanceClock(); });
  bar.appendChild(clkBtn);

  // A group
  var aGrp = document.createElement('div');
  aGrp.className = 'dp-controls__group';
  aGrp.innerHTML = '<span class="dp-controls__label">A</span>';
  bar.appendChild(aGrp);
  inputAField = createInput(String(inputA), 'number');
  inputAField.parent(aGrp);
  inputAField.style('width', '50px');
  inputAField.style('height', '28px');
  inputAField.style('font-size', '14px');
  inputAField.style('font-weight', 'bold');
  inputAField.style('text-align', 'center');
  inputAField.style('border', '2px solid #D84315');
  inputAField.style('border-radius', '4px');
  inputAField.style('background', '#FFF3E0');
  inputAField.style('color', '#BF360C');
  inputAField.attribute('min', '-999');
  inputAField.attribute('max', '999');
  inputAField.input(function() {
    let v = parseInt(this.value());
    if (!isNaN(v)) inputA = v;
  });

  // B group
  var bGrp = document.createElement('div');
  bGrp.className = 'dp-controls__group';
  bGrp.innerHTML = '<span class="dp-controls__label">B</span>';
  bar.appendChild(bGrp);
  inputBField = createInput(String(inputB), 'number');
  inputBField.parent(bGrp);
  inputBField.style('width', '50px');
  inputBField.style('height', '28px');
  inputBField.style('font-size', '14px');
  inputBField.style('font-weight', 'bold');
  inputBField.style('text-align', 'center');
  inputBField.style('border', '2px solid #D84315');
  inputBField.style('border-radius', '4px');
  inputBField.style('background', '#FFF3E0');
  inputBField.style('color', '#BF360C');
  inputBField.attribute('min', '-999');
  inputBField.attribute('max', '999');
  inputBField.input(function() {
    let v = parseInt(this.value());
    if (!isNaN(v)) inputB = v;
  });

  // Op group
  var opGrp = document.createElement('div');
  opGrp.className = 'dp-controls__group';
  opGrp.innerHTML = '<span class="dp-controls__label">Op</span>';
  bar.appendChild(opGrp);
  opSelect = createSelect();
  opSelect.parent(opGrp);
  opSelect.option('ADD');
  opSelect.option('SUB');
  opSelect.selected('ADD');
  opSelect.style('width', '65px');
  opSelect.style('height', '30px');
  opSelect.style('font-size', '13px');
  opSelect.style('font-weight', 'bold');
  opSelect.style('text-align', 'center');
  opSelect.style('border', '2px solid #388E3C');
  opSelect.style('border-radius', '4px');
  opSelect.style('background', '#E8F5E9');
  opSelect.style('color', '#1B5E20');
  opSelect.style('cursor', 'pointer');
  opSelect.changed(function() {
    selectedOp = this.value();
  });

  // Reset button
  var rstBtn = document.createElement('button');
  rstBtn.className = 'dp-controls__btn dp-controls__btn--reset';
  rstBtn.textContent = 'Reset';
  rstBtn.addEventListener('click', function() { resetSystem(); });
  bar.appendChild(rstBtn);

  // State display
  stateDisplay = document.createElement('span');
  stateDisplay.className = 'dp-controls__state';
  stateDisplay.textContent = stateNames[currentState];
  bar.appendChild(stateDisplay);
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
}

function positionDOMElements() {
  // Flex container handles layout; no manual positioning needed.
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
  stroke(COLOR_FSM);
  strokeWeight(1.5);
  noFill();
  let cpx = centerX - radius - 30;
  let cpy = centerY - radius / 2;
  bezier(fromDone.x - stateRadius * 0.7, fromDone.y - stateRadius * 0.7,
         cpx, cpy - 30, cpx, cpy + 10,
         toIdle.x - stateRadius * 0.7, toIdle.y + stateRadius * 0.3);

  // Glow on the just-taken transition arrow
  if (!reducedMotion && lastTransition >= 0) {
    let glowT = (millis() - transitionTime) / 300;
    if (glowT < 1) {
      let glowA = (1 - glowT) * 160;
      stroke(76, 175, 80, glowA);
      strokeWeight(7);
      noFill();
      if (lastTransition < 3) {
        let gFrom = statePos[lastTransition];
        let gTo = statePos[lastTransition + 1];
        let gAng = atan2(gTo.y - gFrom.y, gTo.x - gFrom.x);
        line(gFrom.x + cos(gAng) * stateRadius, gFrom.y + sin(gAng) * stateRadius,
             gTo.x - cos(gAng) * stateRadius, gTo.y - sin(gAng) * stateRadius);
      } else {
        bezier(fromDone.x - stateRadius * 0.7, fromDone.y - stateRadius * 0.7,
               cpx, cpy - 30, cpx, cpy + 10,
               toIdle.x - stateRadius * 0.7, toIdle.y + stateRadius * 0.3);
      }
    }
  }

  // Draw state circles
  for (let i = 0; i < 4; i++) {
    let pos = statePos[i];
    let isCurrent = (currentState === i);

    fill(isCurrent ? COLOR_ACTIVE : 255);
    stroke(isCurrent ? '#388E3C' : COLOR_FSM);
    strokeWeight(isCurrent ? 3 : 1.5);
    ellipse(pos.x, pos.y, stateRadius * 2, stateRadius * 2);

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
  let opDesc = selectedOp === "ADD" ? "A + B" : "A - B";
  let descriptions = [
    "Waiting for start.\nNo operations active.",
    "Loading input values\ninto registers A and B.",
    "ALU computes " + opDesc + ".\nResult on ALU output.",
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
  let aluActive = (controlSignals.alu_op === "ADD" || controlSignals.alu_op === "SUB");

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

  // Input flow arrows (visible when loading) with subtle pulse
  if (controlSignals.load_A) {
    let pulseA = reducedMotion ? 1 : 0.6 + 0.4 * sin(millis() * 0.008);
    stroke(76, 175, 80, pulseA * 255);
    strokeWeight(2.5);
    let ay = regAY - regH / 2;
    line(regAX, ay - 14, regAX, ay);
    fill(76, 175, 80, pulseA * 255);
    noStroke();
    triangle(regAX, ay, regAX - 4, ay - 6, regAX + 4, ay - 6);
  }
  if (controlSignals.load_B) {
    let pulseB = reducedMotion ? 1 : 0.6 + 0.4 * sin(millis() * 0.008);
    stroke(76, 175, 80, pulseB * 255);
    strokeWeight(2.5);
    let by = regBY - regH / 2;
    line(regBX, by - 14, regBX, by);
    fill(76, 175, 80, pulseB * 255);
    noStroke();
    triangle(regBX, by, regBX - 4, by - 6, regBX + 4, by - 6);
  }

  // Wires from registers down to ALU
  let wireColor = aluActive ? COLOR_ACTIVE : COLOR_WIRE;
  stroke(wireColor);
  strokeWeight(aluActive ? 2.5 : 1.5);
  line(regAX, regAY + regH / 2, regAX, 160);
  line(regBX, regBY + regH / 2, regBX, 160);

  // ALU (trapezoid)
  let aluX = cx;
  let aluY = 200;
  let aluW = 80;
  let aluH = 60;

  fill(aluActive ? '#C8E6C9' : '#E0E0E0');
  stroke(aluActive ? COLOR_ACTIVE : COLOR_WIRE);
  strokeWeight(2);
  beginShape();
  vertex(aluX - aluW / 2, aluY - aluH / 2);
  vertex(aluX + aluW / 2, aluY - aluH / 2);
  vertex(aluX + aluW / 3, aluY + aluH / 2);
  vertex(aluX - aluW / 3, aluY + aluH / 2);
  endShape(CLOSE);

  // ALU label
  fill(aluActive ? '#2E7D32' : 100);
  noStroke();
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text("ALU", aluX, aluY - 5);
  textSize(10);
  textStyle(NORMAL);
  let opSymbol = selectedOp === "ADD" ? '+' : '-';
  fill(aluActive ? '#2E7D32' : 180);
  text(aluActive ? "A " + opSymbol + " B" : "ALU idle", aluX, aluY + 15);

  // Wires into ALU
  stroke(wireColor);
  strokeWeight(1.5);
  line(regAX, 160, aluX - 20, aluY - aluH / 2);
  line(regBX, 160, aluX + 20, aluY - aluH / 2);

  // ALU output wire
  let aluOutY = aluY + aluH / 2;
  stroke(aluActive ? COLOR_ACTIVE : COLOR_WIRE);
  line(aluX, aluOutY, aluX, aluOutY + 30);

  // ALU output value
  if (aluActive || currentState === DONE) {
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

  let muxActive = controlSignals.mux_sel === "ALU";
  fill(muxActive ? '#C8E6C9' : '#EEEEEE');
  stroke(muxActive ? COLOR_ACTIVE : COLOR_INACTIVE);
  strokeWeight(muxActive ? 1.5 : 1);
  rect(aluX - muxW / 2, muxY, muxW, muxH, 3);

  fill(muxActive ? '#2E7D32' : 180);
  noStroke();
  textSize(10);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text("MUX", aluX, muxY + muxH / 2);
  textStyle(NORMAL);

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
  strokeWeight(controlSignals.load_result ? 2.5 : 1.5);
  line(aluX, muxY + muxH, aluX, resultY - regH / 2);

  // Result register
  let resultDisplay = resultLoaded ? regResult : "\u2014";
  drawRegister(aluX, resultY, regW + 10, regH, "Result", resultDisplay, controlSignals.load_result);

  // "Not updated" hint when result hasn't been computed yet
  if (!resultLoaded) {
    fill(180);
    noStroke();
    textSize(9);
    textAlign(CENTER, TOP);
    text("Result not updated", aluX, resultY + regH / 2 + 3);
  }

  // Final output label
  if (currentState === DONE && resultLoaded) {
    fill(COLOR_ACTIVE);
    noStroke();
    textSize(14);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    let sym = selectedOp === "ADD" ? '+' : '-';
    text(inputA + " " + sym + " " + inputB + " = " + regResult, aluX, resultY + regH / 2 + 8);
    textStyle(NORMAL);
  }
}

function drawRegister(x, y, w, h, label, value, active) {
  fill(active ? '#C8E6C9' : 255);
  stroke(active ? COLOR_ACTIVE : COLOR_WIRE);
  strokeWeight(active ? 2.5 : 1.5);
  rect(x - w / 2, y - h / 2, w, h, 4);

  fill(active ? '#2E7D32' : 80);
  noStroke();
  textSize(10);
  textAlign(CENTER, TOP);
  text(label, x, y - h / 2 + 3);

  textSize(16);
  textStyle(BOLD);
  textAlign(CENTER, BOTTOM);
  text(value, x, y + h / 2 - 3);
  textStyle(NORMAL);
}

function drawControlSignals(fsmWidth, dpX) {
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
    let isActive = (signals[i].val === true || signals[i].val === "ADD" || signals[i].val === "SUB" || signals[i].val === "ALU");

    fill(isActive ? COLOR_ACTIVE : COLOR_INACTIVE);
    noStroke();
    ellipse(sigX + 6, sy + 4, 8, 8);

    fill(isActive ? '#2E7D32' : 100);
    textAlign(LEFT, CENTER);
    let displayVal = (typeof signals[i].val === 'boolean')
      ? (signals[i].val ? "1" : "0")
      : signals[i].val;
    text(signals[i].name + " = " + displayVal, sigX + 14, sy + 4);
  }
}

function drawControls() {
  // Update DOM state badge
  if (stateDisplay) {
    stateDisplay.textContent = stateNames[currentState];
    stateDisplay.style.background = currentState === DONE ? COLOR_ACTIVE : COLOR_FSM;
    stateDisplay.style.borderColor = currentState === DONE ? '#388E3C' : '#303F9F';
  }
}

function advanceClock() {
  // Read latest values from input fields
  let va = parseInt(inputAField.value());
  let vb = parseInt(inputBField.value());
  if (!isNaN(va)) inputA = va;
  if (!isNaN(vb)) inputB = vb;
  selectedOp = opSelect.value();

  lastTransition = currentState;
  transitionTime = millis();

  switch (currentState) {
    case IDLE:
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
      currentState = COMPUTE;
      controlSignals.load_A = false;
      controlSignals.load_B = false;
      controlSignals.alu_op = selectedOp;
      controlSignals.mux_sel = "ALU";
      controlSignals.load_result = false;
      aluOutput = selectedOp === "ADD" ? regA + regB : regA - regB;
      break;

    case COMPUTE:
      currentState = DONE;
      controlSignals.load_A = false;
      controlSignals.load_B = false;
      controlSignals.alu_op = "NOP";
      controlSignals.mux_sel = "ALU";
      controlSignals.load_result = true;
      regResult = aluOutput;
      resultLoaded = true;
      break;

    case DONE:
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
  lastTransition = -1;
  resultLoaded = false;
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
