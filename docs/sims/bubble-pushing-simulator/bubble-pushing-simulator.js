// Bubble Pushing Simulator MicroSim
// Interactive demonstration of bubble pushing technique
// Bloom Level: Analyze (L4)

let containerWidth;
let canvasWidth = 400;
let drawHeight = 450;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;

let stepBtn, resetBtn;
let currentStep = 0;
const maxSteps = 4;

const colors = {
  and: '#2196F3',
  or: '#4CAF50',
  nand: '#9C27B0',
  nor: '#FF9800',
  wire: '#333',
  bubble: '#F44336',
  bg: '#f5f5f5',
  text: '#212121'
};

// Circuit state at each step
const steps = [
  {
    title: 'Step 1: Original AND-OR Circuit',
    description: 'F = AB + CD (SOP form)',
    gates: [
      { type: 'AND', x: 100, y: 120, inputs: ['A', 'B'], bubbleOut: false },
      { type: 'AND', x: 100, y: 220, inputs: ['C', 'D'], bubbleOut: false },
      { type: 'OR', x: 250, y: 170, inputs: ['g1', 'g2'], bubbleOut: false, bubbleIn: [false, false] }
    ]
  },
  {
    title: 'Step 2: Add Bubble Pairs',
    description: 'Insert bubbles at AND outputs and OR inputs (they cancel)',
    gates: [
      { type: 'AND', x: 100, y: 120, inputs: ['A', 'B'], bubbleOut: true },
      { type: 'AND', x: 100, y: 220, inputs: ['C', 'D'], bubbleOut: true },
      { type: 'OR', x: 250, y: 170, inputs: ['g1', 'g2'], bubbleOut: false, bubbleIn: [true, true] }
    ]
  },
  {
    title: 'Step 3: Recognize NAND Gates',
    description: 'AND + output bubble = NAND',
    gates: [
      { type: 'NAND', x: 100, y: 120, inputs: ['A', 'B'], bubbleOut: false },
      { type: 'NAND', x: 100, y: 220, inputs: ['C', 'D'], bubbleOut: false },
      { type: 'OR', x: 250, y: 170, inputs: ['g1', 'g2'], bubbleOut: false, bubbleIn: [true, true] }
    ]
  },
  {
    title: 'Step 4: Apply De Morgan\'s',
    description: 'OR with input bubbles = NAND (complete conversion!)',
    gates: [
      { type: 'NAND', x: 100, y: 120, inputs: ['A', 'B'], bubbleOut: false },
      { type: 'NAND', x: 100, y: 220, inputs: ['C', 'D'], bubbleOut: false },
      { type: 'NAND', x: 250, y: 170, inputs: ['g1', 'g2'], bubbleOut: false, bubbleIn: [false, false] }
    ]
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  stepBtn = createButton('Next Step →');
  stepBtn.mousePressed(nextStep);

  resetBtn = createButton('Reset');
  resetBtn.mousePressed(resetSteps);

  positionUIElements();
  describe('Interactive bubble pushing simulator for gate conversion', LABEL);
}

function positionUIElements() {
  let mainRect = document.querySelector('main').getBoundingClientRect();
  stepBtn.position(mainRect.left + 20, mainRect.top + drawHeight + 20);
  resetBtn.position(mainRect.left + 130, mainRect.top + drawHeight + 20);
}

function nextStep() {
  if (currentStep < maxSteps - 1) {
    currentStep++;
  }
}

function resetSteps() {
  currentStep = 0;
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
  text('Bubble Pushing Simulator', canvasWidth / 2, 10);

  // Current step info
  let step = steps[currentStep];
  textSize(14);
  fill('#1565C0');
  text(step.title, canvasWidth / 2, 40);

  textSize(12);
  fill('#666');
  text(step.description, canvasWidth / 2, 60);

  // Draw circuit
  drawCircuit(step.gates);

  // Progress indicator
  fill(colors.text);
  textAlign(RIGHT, CENTER);
  textSize(12);
  text(`Step ${currentStep + 1} of ${maxSteps}`, canvasWidth - 20, drawHeight + 40);

  // De Morgan's reference
  drawDeMorganReference();
}

function drawCircuit(gates) {
  let inputY = [120, 150, 220, 250];
  let inputLabels = ['A', 'B', 'C', 'D'];

  // Draw inputs
  for (let i = 0; i < 4; i++) {
    fill(colors.text);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(14);
    text(inputLabels[i], 40, inputY[i]);

    stroke(colors.wire);
    strokeWeight(2);
    line(50, inputY[i], 80, inputY[i]);
  }

  // Draw gates
  gates.forEach((gate, idx) => {
    drawGate(gate, idx);
  });

  // Draw connections
  stroke(colors.wire);
  strokeWeight(2);

  // First AND/NAND to OR/NAND
  let g1 = gates[0];
  let g2 = gates[1];
  let g3 = gates[2];

  line(g1.x + 70, g1.y, g3.x - 20, g3.y - 25);
  line(g2.x + 70, g2.y, g3.x - 20, g3.y + 25);

  // Output
  line(g3.x + 70, g3.y, g3.x + 120, g3.y);
  fill(colors.text);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);
  text('F', g3.x + 135, g3.y);
}

function drawGate(gate, idx) {
  let x = gate.x;
  let y = gate.y;
  let w = 60;
  let h = 50;

  // Choose color based on gate type
  let gateColor;
  switch(gate.type) {
    case 'AND': gateColor = colors.and; break;
    case 'OR': gateColor = colors.or; break;
    case 'NAND': gateColor = colors.nand; break;
    case 'NOR': gateColor = colors.nor; break;
    default: gateColor = colors.and;
  }

  fill(gateColor);
  stroke(gateColor);
  strokeWeight(2);

  if (gate.type === 'AND' || gate.type === 'NAND') {
    // AND shape
    beginShape();
    vertex(x, y - h/2);
    vertex(x + w * 0.5, y - h/2);
    bezierVertex(x + w, y - h/2, x + w, y + h/2, x + w * 0.5, y + h/2);
    vertex(x, y + h/2);
    endShape(CLOSE);
  } else {
    // OR shape
    beginShape();
    vertex(x, y - h/2);
    bezierVertex(x + w * 0.3, y - h/2, x + w * 0.8, y - h/4, x + w, y);
    bezierVertex(x + w * 0.8, y + h/4, x + w * 0.3, y + h/2, x, y + h/2);
    bezierVertex(x + w * 0.2, y, x + w * 0.2, y, x, y - h/2);
    endShape(CLOSE);
  }

  // Gate label
  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  text(gate.type, x + w * 0.4, y);

  // Output bubble
  if (gate.bubbleOut) {
    fill(colors.bubble);
    stroke('white');
    strokeWeight(2);
    ellipse(x + w + 8, y, 14);
  }

  // Input bubbles
  if (gate.bubbleIn) {
    gate.bubbleIn.forEach((hasBubble, i) => {
      if (hasBubble) {
        let bubbleY = y + (i === 0 ? -15 : 15);
        fill(colors.bubble);
        stroke('white');
        strokeWeight(2);
        ellipse(x - 8, bubbleY, 14);
      }
    });
  }
}

function drawDeMorganReference() {
  let refX = canvasWidth - 150;
  let refY = 300;

  fill('#e8f5e9');
  stroke('#a5d6a7');
  strokeWeight(1);
  rect(refX - 10, refY - 10, 140, 100, 5);

  fill(colors.text);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(11);
  text("De Morgan's Laws:", refX, refY);
  textSize(10);
  text("(AB)' = A' + B'", refX, refY + 20);
  text("(A+B)' = A'B'", refX, refY + 35);
  text("", refX, refY + 55);
  text("AND + bubble = NAND", refX, refY + 55);
  text("OR + input bubbles = NAND", refX, refY + 70);
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
