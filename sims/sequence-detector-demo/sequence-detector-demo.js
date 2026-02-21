// Sequence Detector Demo MicroSim
// "101" pattern detector with overlapping
// Bloom Level: Apply/Analyze (L3-L4)

let containerWidth;
let canvasWidth = 400;
let drawHeight = 450;
let controlHeight = 70;
let canvasHeight = drawHeight + controlHeight;

let currentState = 0;
let inputSequence = [];
let detections = [];
let input0Btn, input1Btn, clearBtn;

// States for "101" detector (Moore)
// S0: Initial / No pattern
// S1: Received "1"
// S2: Received "10"
// S3: Received "101" - DETECTED!
const states = [
  { name: 'S0', desc: 'None', output: 0 },
  { name: 'S1', desc: '"1"', output: 0 },
  { name: 'S2', desc: '"10"', output: 0 },
  { name: 'S3', desc: '"101"', output: 1 }
];

// Transitions: [state][input] = next_state
const transitions = [
  [0, 1],  // S0: 0->S0, 1->S1
  [2, 1],  // S1: 0->S2, 1->S1
  [0, 3],  // S2: 0->S0, 1->S3
  [2, 1]   // S3: 0->S2, 1->S1 (overlap!)
];

const colors = {
  state: '#607D8B',
  active: '#4CAF50',
  detected: '#FF9800',
  wire: '#666',
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

  clearBtn = createButton('Clear');
  clearBtn.mousePressed(() => {
    currentState = 0;
    inputSequence = [];
    detections = [];
  });

  positionUIElements();
  describe('101 sequence detector demonstration', LABEL);
}

function positionUIElements() {
  let mainRect = document.querySelector('main').getBoundingClientRect();
  input0Btn.position(mainRect.left + 20, mainRect.top + drawHeight + 15);
  input1Btn.position(mainRect.left + 100, mainRect.top + drawHeight + 15);
  clearBtn.position(mainRect.left + 180, mainRect.top + drawHeight + 15);
}

function applyInput(inp) {
  inputSequence.push(inp);
  currentState = transitions[currentState][inp];

  // Check for detection
  if (states[currentState].output === 1) {
    detections.push(inputSequence.length - 1);
  }

  // Keep limited history
  if (inputSequence.length > 16) {
    inputSequence.shift();
    detections = detections.map(d => d - 1).filter(d => d >= 0);
  }
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
  text('"101" Sequence Detector', canvasWidth / 2, 10);

  // Subtitle
  textSize(12);
  fill('#666');
  text('Moore FSM with overlapping detection', canvasWidth / 2, 35);

  // Draw state diagram
  drawStateDiagram();

  // Draw input sequence
  drawInputSequence();

  // Draw current state info
  drawCurrentState();

  // Instructions
  fill(colors.text);
  textAlign(LEFT, CENTER);
  textSize(10);
  text('Enter bits to detect "101" pattern', 260, drawHeight + 30);
}

function drawStateDiagram() {
  let centerX = 100;
  let centerY = 160;
  let radius = 70;

  // State positions in a line
  let positions = [
    { x: centerX, y: centerY },
    { x: centerX + 80, y: centerY - 50 },
    { x: centerX + 160, y: centerY },
    { x: centerX + 240, y: centerY }
  ];

  // Draw transitions
  stroke(colors.wire);
  strokeWeight(1);

  // S0->S1 (1)
  drawTransitionArrow(positions[0].x + 25, positions[0].y - 15,
                      positions[1].x - 20, positions[1].y + 15, '1');

  // S1->S2 (0)
  drawTransitionArrow(positions[1].x + 20, positions[1].y + 15,
                      positions[2].x - 20, positions[2].y - 15, '0');

  // S2->S3 (1)
  drawTransitionArrow(positions[2].x + 25, positions[2].y,
                      positions[3].x - 25, positions[3].y, '1');

  // S3->S2 (0) - overlap
  drawTransitionArrow(positions[3].x - 10, positions[3].y + 25,
                      positions[2].x + 10, positions[2].y + 25, '0');

  // Self loops
  drawSelfLoop(positions[0].x, positions[0].y, 180, '0');
  drawSelfLoop(positions[1].x, positions[1].y, -90, '1');
  drawSelfLoop(positions[3].x, positions[3].y, -90, '1');

  // S2->S0 (0)
  stroke(colors.wire);
  strokeWeight(1);
  noFill();
  bezier(positions[2].x - 15, positions[2].y + 25,
         positions[2].x - 40, positions[2].y + 60,
         positions[0].x + 40, positions[0].y + 60,
         positions[0].x + 15, positions[0].y + 25);
  fill(colors.text);
  noStroke();
  textSize(9);
  text('0', (positions[0].x + positions[2].x) / 2, positions[2].y + 55);

  // Draw states
  for (let i = 0; i < 4; i++) {
    let pos = positions[i];
    let isActive = i === currentState;
    let isDetection = states[i].output === 1;

    fill(isActive ? (isDetection ? colors.detected : colors.active) : colors.state);
    stroke(isActive ? '#1B5E20' : '#37474F');
    strokeWeight(isActive ? 3 : 2);
    ellipse(pos.x, pos.y, 45);

    fill('white');
    noStroke();
    textSize(12);
    textAlign(CENTER, CENTER);
    text(states[i].name, pos.x, pos.y - 5);
    textSize(9);
    text('/' + states[i].output, pos.x, pos.y + 10);
  }

  // Pattern labels
  fill(colors.text);
  textSize(9);
  textAlign(CENTER, TOP);
  text('Start', positions[0].x, positions[0].y + 28);
  text('"1"', positions[1].x, positions[1].y + 28);
  text('"10"', positions[2].x, positions[2].y + 28);
  text('"101"✓', positions[3].x, positions[3].y + 28);
}

function drawTransitionArrow(x1, y1, x2, y2, label) {
  stroke(colors.wire);
  strokeWeight(1);
  line(x1, y1, x2, y2);

  let angle = atan2(y2 - y1, x2 - x1);
  line(x2, y2, x2 - 8 * cos(angle - PI/6), y2 - 8 * sin(angle - PI/6));
  line(x2, y2, x2 - 8 * cos(angle + PI/6), y2 - 8 * sin(angle + PI/6));

  fill(colors.text);
  noStroke();
  textSize(9);
  let midX = (x1 + x2) / 2 + 8;
  let midY = (y1 + y2) / 2;
  text(label, midX, midY);
}

function drawSelfLoop(x, y, angle, label) {
  noFill();
  stroke(colors.wire);
  strokeWeight(1);

  let lx = x + cos(radians(angle)) * 28;
  let ly = y + sin(radians(angle)) * 28;
  arc(lx, ly, 15, 15, radians(angle + 60), radians(angle + 300));

  fill(colors.text);
  noStroke();
  textSize(9);
  text(label, lx + cos(radians(angle)) * 15, ly + sin(radians(angle)) * 15 - 5);
}

function drawInputSequence() {
  let y = 280;
  let startX = 50;

  fill(colors.text);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);
  text('Input Sequence:', startX, y);

  // Draw bit boxes
  let boxSize = 25;
  for (let i = 0; i < inputSequence.length; i++) {
    let x = startX + i * (boxSize + 5);

    // Check if this position ends a detection
    let isDetected = detections.includes(i);

    fill(isDetected ? colors.detected : (inputSequence[i] ? '#c8e6c9' : '#ffcdd2'));
    stroke(isDetected ? '#E65100' : '#bdbdbd');
    strokeWeight(isDetected ? 2 : 1);
    rect(x, y + 20, boxSize, boxSize, 3);

    fill(colors.text);
    noStroke();
    textSize(14);
    textAlign(CENTER, CENTER);
    text(inputSequence[i], x + boxSize/2, y + 20 + boxSize/2);
  }

  // Detection count
  textAlign(LEFT, TOP);
  textSize(11);
  fill(colors.detected);
  text(`Patterns found: ${detections.length}`, startX, y + 55);
}

function drawCurrentState() {
  let x = canvasWidth - 110;
  let y = 80;

  let isDetected = states[currentState].output === 1;

  fill(isDetected ? '#fff3e0' : '#e8f5e9');
  stroke(isDetected ? '#ffcc80' : '#a5d6a7');
  strokeWeight(1);
  rect(x - 10, y - 10, 100, 90, 5);

  fill(colors.text);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(11);
  text('Current State', x + 40, y);

  textSize(20);
  fill(isDetected ? colors.detected : colors.active);
  text(states[currentState].name, x + 40, y + 18);

  textSize(11);
  fill(colors.text);
  text('Pattern: ' + states[currentState].desc, x + 40, y + 45);

  textSize(14);
  fill(isDetected ? colors.detected : colors.state);
  text('Output: ' + states[currentState].output, x + 40, y + 62);
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
