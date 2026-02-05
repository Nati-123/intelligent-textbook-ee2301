// FSM Designer MicroSim
// Interactive Moore state machine simulator
// Bloom Level: Understand/Analyze (L2-L4)

let containerWidth;
let canvasWidth = 400;
let drawHeight = 420;
let controlHeight = 70;
let canvasHeight = drawHeight + controlHeight;

let currentState = 0;
let inputHistory = [];
let input0Btn, input1Btn, resetBtn;

// Moore FSM: 3-state machine
const states = [
  { name: 'S0', output: 0, x: 100, y: 180 },
  { name: 'S1', output: 0, x: 220, y: 100 },
  { name: 'S2', output: 1, x: 220, y: 260 }
];

// Transition table: [current state][input] = next state
const transitions = [
  [0, 1],  // S0: input 0->S0, input 1->S1
  [2, 1],  // S1: input 0->S2, input 1->S1
  [0, 1]   // S2: input 0->S0, input 1->S1
];

const colors = {
  state: '#2196F3',
  active: '#4CAF50',
  output1: '#FF9800',
  transition: '#666',
  bg: '#f5f5f5',
  text: '#212121'
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  input0Btn = createButton('Input 0');
  input0Btn.mousePressed(() => applyInput(0));

  input1Btn = createButton('Input 1');
  input1Btn.mousePressed(() => applyInput(1));

  resetBtn = createButton('Reset');
  resetBtn.mousePressed(() => {
    currentState = 0;
    inputHistory = [];
  });

  positionUIElements();
  describe('Interactive Moore FSM simulator', LABEL);
}

function positionUIElements() {
  let mainRect = document.querySelector('main').getBoundingClientRect();
  input0Btn.position(mainRect.left + 20, mainRect.top + drawHeight + 15);
  input1Btn.position(mainRect.left + 100, mainRect.top + drawHeight + 15);
  resetBtn.position(mainRect.left + 180, mainRect.top + drawHeight + 15);
}

function applyInput(inp) {
  let nextState = transitions[currentState][inp];
  inputHistory.push({ from: currentState, to: nextState, input: inp });
  if (inputHistory.length > 8) inputHistory.shift();
  currentState = nextState;
}

function draw() {
  updateCanvasSize();

  // Background
  fill(colors.bg);
  noStroke();
  rect(0, 0, canvasWidth, drawHeight);

  // Control area
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill(colors.text);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(18);
  text('Moore FSM Simulator', canvasWidth / 2, 10);

  // Subtitle
  textSize(12);
  fill('#666');
  text('Output depends only on current state', canvasWidth / 2, 35);

  // Draw state diagram
  drawStateDiagram();

  // Draw current state info
  drawStateInfo();

  // Draw history
  drawHistory();

  // Instructions
  fill(colors.text);
  textAlign(LEFT, CENTER);
  textSize(10);
  text('Click Input 0/1 to trigger transitions', 260, drawHeight + 30);
}

function drawStateDiagram() {
  let offsetX = 50;

  // Draw transitions first (behind states)
  drawTransitions(offsetX);

  // Draw states
  for (let i = 0; i < states.length; i++) {
    let s = states[i];
    let x = s.x + offsetX;
    let y = s.y;
    let isActive = i === currentState;

    // State circle
    fill(isActive ? colors.active : (s.output ? colors.output1 : colors.state));
    stroke(isActive ? '#2E7D32' : '#1565C0');
    strokeWeight(isActive ? 4 : 2);
    ellipse(x, y, 60);

    // State name
    fill('white');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(16);
    text(s.name, x, y - 8);

    // Output
    textSize(12);
    text('/' + s.output, x, y + 12);
  }

  // Legend
  drawLegend();
}

function drawTransitions(offsetX) {
  // S0 self-loop (input 0)
  drawSelfLoop(states[0].x + offsetX, states[0].y, -90, '0');

  // S0 to S1 (input 1)
  drawArrow(states[0].x + offsetX + 25, states[0].y - 20,
            states[1].x + offsetX - 25, states[1].y + 20, '1');

  // S1 self-loop (input 1)
  drawSelfLoop(states[1].x + offsetX, states[1].y, -90, '1');

  // S1 to S2 (input 0)
  drawArrow(states[1].x + offsetX, states[1].y + 30,
            states[2].x + offsetX, states[2].y - 30, '0');

  // S2 to S0 (input 0)
  drawArrow(states[2].x + offsetX - 25, states[2].y + 10,
            states[0].x + offsetX + 20, states[0].y + 25, '0');

  // S2 to S1 (input 1)
  drawArrow(states[2].x + offsetX + 25, states[2].y - 20,
            states[1].x + offsetX + 25, states[1].y + 25, '1');
}

function drawArrow(x1, y1, x2, y2, label) {
  stroke(colors.transition);
  strokeWeight(2);
  line(x1, y1, x2, y2);

  // Arrowhead
  let angle = atan2(y2 - y1, x2 - x1);
  let arrowSize = 10;
  line(x2, y2, x2 - arrowSize * cos(angle - PI/6), y2 - arrowSize * sin(angle - PI/6));
  line(x2, y2, x2 - arrowSize * cos(angle + PI/6), y2 - arrowSize * sin(angle + PI/6));

  // Label
  fill(colors.text);
  noStroke();
  textSize(11);
  textAlign(CENTER, CENTER);
  let midX = (x1 + x2) / 2;
  let midY = (y1 + y2) / 2;
  text(label, midX + 10, midY);
}

function drawSelfLoop(x, y, angle, label) {
  noFill();
  stroke(colors.transition);
  strokeWeight(2);

  let loopSize = 20;
  let lx = x + cos(radians(angle)) * 35;
  let ly = y + sin(radians(angle)) * 35;

  arc(lx, ly, loopSize * 2, loopSize * 2, radians(angle + 60), radians(angle + 300));

  // Label
  fill(colors.text);
  noStroke();
  textSize(11);
  text(label, lx, ly - loopSize - 5);
}

function drawStateInfo() {
  let x = canvasWidth - 100;
  let y = 90;

  fill('#e8f5e9');
  stroke('#a5d6a7');
  strokeWeight(1);
  rect(x - 10, y - 10, 90, 80, 5);

  fill(colors.text);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(11);
  text('Current State', x + 35, y);

  textSize(24);
  fill(colors.active);
  text(states[currentState].name, x + 35, y + 20);

  textSize(14);
  fill(colors.text);
  text('Output: ' + states[currentState].output, x + 35, y + 52);
}

function drawHistory() {
  let y = 340;

  fill(colors.text);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(11);
  text('Transition History', canvasWidth / 2, y - 15);

  if (inputHistory.length === 0) {
    fill('#666');
    textSize(10);
    text('(No transitions yet)', canvasWidth / 2, y + 5);
    return;
  }

  let histStr = inputHistory.map(h =>
    `${states[h.from].name}-${h.input}->${states[h.to].name}`
  ).join(' | ');

  textSize(9);
  fill(colors.text);
  text(histStr, canvasWidth / 2, y + 5);
}

function drawLegend() {
  let x = 40;
  let y = 330;

  fill(colors.text);
  noStroke();
  textSize(9);
  textAlign(LEFT, CENTER);
  text('States show: Name/Output', x, y);
  text('Arrows show: Input', x, y + 15);
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
