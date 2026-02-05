// Circuit Analysis and Synthesis MicroSim
// Analyze circuits to derive expressions, synthesize circuits from expressions
// Bloom Level: Evaluate (L5) - Evaluate and design circuits
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 420;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let modeSelect;
let currentMode = 'analyze';
let exampleIdx = 0;

let analyzeExamples = [
  {
    name: 'Two-Level AND-OR',
    circuit: [
      { type: 'AND', inputs: ['A', 'B'], id: 'g1' },
      { type: 'AND', inputs: ['C', 'D'], id: 'g2' },
      { type: 'OR', inputs: ['g1', 'g2'], id: 'out' }
    ],
    expression: 'F = AB + CD',
    minterms: 'Σm(3,7,11,12,13,14,15)'
  },
  {
    name: 'NAND-NAND Implementation',
    circuit: [
      { type: 'NAND', inputs: ['A', 'B'], id: 'g1' },
      { type: 'NAND', inputs: ['C', 'D'], id: 'g2' },
      { type: 'NAND', inputs: ['g1', 'g2'], id: 'out' }
    ],
    expression: "F = ((AB)'(CD)')' = AB + CD",
    minterms: 'Equivalent to AND-OR'
  },
  {
    name: 'XOR Implementation',
    circuit: [
      { type: 'NOT', inputs: ['A'], id: 'notA' },
      { type: 'NOT', inputs: ['B'], id: 'notB' },
      { type: 'AND', inputs: ['A', 'notB'], id: 'g1' },
      { type: 'AND', inputs: ['notA', 'B'], id: 'g2' },
      { type: 'OR', inputs: ['g1', 'g2'], id: 'out' }
    ],
    expression: "F = AB' + A'B = A ⊕ B",
    minterms: 'Σm(1,2)'
  }
];

let synthesizeExamples = [
  {
    expression: 'F = A + BC',
    steps: [
      'Identify terms: A and BC',
      'A needs no gate (direct input)',
      'BC needs AND gate',
      'Combine with OR gate',
      'Result: 2 gates (1 AND, 1 OR)'
    ]
  },
  {
    expression: "F = AB' + A'B (XOR)",
    steps: [
      "Identify terms: AB' and A'B",
      "Need inverters for A' and B'",
      "Need AND gates for each term",
      'Need OR gate to combine',
      'Result: 5 gates (2 NOT, 2 AND, 1 OR)'
    ]
  },
  {
    expression: "F = (A + B)'",
    steps: [
      'This is a NOR function',
      'Option 1: OR gate + NOT gate',
      'Option 2: Single NOR gate',
      'NOR gate is more efficient',
      'Result: 1 NOR gate'
    ]
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  modeSelect = createSelect();
  modeSelect.option('Analysis (Circuit → Expression)', 'analyze');
  modeSelect.option('Synthesis (Expression → Circuit)', 'synthesize');
  modeSelect.changed(() => {
    currentMode = modeSelect.value();
    exampleIdx = 0;
  });

  positionUIElements();

  describe('Circuit analysis and synthesis showing the relationship between expressions and circuits', LABEL);
}

function positionUIElements() {
  let mainRect = document.querySelector('main').getBoundingClientRect();
  modeSelect.position(mainRect.left + 100, mainRect.top + drawHeight + 15);
}

function draw() {
  updateCanvasSize();

  // Drawing area
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(18);
  text('Circuit Analysis & Synthesis', canvasWidth / 2, 10);

  if (currentMode === 'analyze') {
    drawAnalysisMode();
  } else {
    drawSynthesisMode();
  }

  // Control label
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text('Mode:', 20, drawHeight + 27);

  // Navigation
  drawNavigation();
}

function drawAnalysisMode() {
  let example = analyzeExamples[exampleIdx];

  // Subtitle
  fill('#2196f3');
  textSize(14);
  textAlign(CENTER, TOP);
  text('Analysis: ' + example.name, canvasWidth / 2, 38);

  // Draw circuit representation
  drawCircuitDiagram(example.circuit);

  // Arrow
  fill('#666');
  textSize(24);
  textAlign(CENTER, CENTER);
  text('↓', canvasWidth / 2, 250);

  // Derived expression
  fill('black');
  textSize(16);
  text(example.expression, canvasWidth / 2, 285);

  // Minterms
  fill('#666');
  textSize(12);
  text(example.minterms, canvasWidth / 2, 315);

  // Analysis steps
  fill('#333');
  textAlign(LEFT, TOP);
  textSize(11);
  text('Analysis Process:', 30, 340);

  fill('#666');
  text('1. Identify gate types and connections', 30, 358);
  text('2. Write expression for each gate output', 30, 373);
  text('3. Substitute to get final expression', 30, 388);
}

function drawSynthesisMode() {
  let example = synthesizeExamples[exampleIdx];

  // Subtitle
  fill('#4CAF50');
  textSize(14);
  textAlign(CENTER, TOP);
  text('Synthesis: Expression to Circuit', canvasWidth / 2, 38);

  // Expression
  fill('black');
  textSize(18);
  textAlign(CENTER, CENTER);
  text(example.expression, canvasWidth / 2, 75);

  // Arrow
  fill('#666');
  textSize(24);
  text('↓', canvasWidth / 2, 110);

  // Synthesis steps
  fill('#333');
  textAlign(LEFT, TOP);
  textSize(12);
  text('Synthesis Steps:', 30, 140);

  fill('#666');
  textSize(11);
  let y = 165;
  for (let step of example.steps) {
    text('• ' + step, 40, y);
    y += 20;
  }

  // Visual representation placeholder
  fill('#e3f2fd');
  stroke('#2196f3');
  strokeWeight(2);
  rect(30, 280, canvasWidth - 60, 100, 5);

  fill('#2196f3');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  text('Circuit Implementation', canvasWidth / 2, 310);
  text('(Visualized based on synthesis steps)', canvasWidth / 2, 330);
  text(example.steps[example.steps.length - 1], canvasWidth / 2, 355);
}

function drawCircuitDiagram(circuit) {
  let startX = 50;
  let endX = canvasWidth - 50;
  let centerY = 150;

  // Simple visualization
  fill('#e3f2fd');
  stroke('#2196f3');
  strokeWeight(2);
  rect(30, 70, canvasWidth - 60, 160, 5);

  // Draw gates
  let gateSpacing = (endX - startX) / (circuit.length + 1);

  for (let i = 0; i < circuit.length; i++) {
    let gate = circuit[i];
    let x = startX + (i + 1) * gateSpacing;
    let y = centerY;

    // Gate box
    fill('white');
    stroke('#333');
    strokeWeight(2);
    rect(x - 25, y - 20, 50, 40, 5);

    // Gate label
    fill('#333');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    text(gate.type, x, y - 5);
    text(gate.id, x, y + 10);

    // Input labels
    fill('#666');
    textSize(9);
    textAlign(RIGHT, CENTER);
    if (gate.inputs.length === 1) {
      text(gate.inputs[0], x - 30, y);
    } else {
      text(gate.inputs[0], x - 30, y - 8);
      text(gate.inputs[1], x - 30, y + 8);
    }
  }

  // Connection lines (simplified)
  stroke('#999');
  strokeWeight(1);
  for (let i = 0; i < circuit.length - 1; i++) {
    let x1 = startX + (i + 1) * gateSpacing + 25;
    let x2 = startX + (i + 2) * gateSpacing - 25;
    line(x1, centerY, x2, centerY);
  }

  // Output label
  fill('#4CAF50');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  let lastX = startX + circuit.length * gateSpacing + 30;
  text('F', lastX, centerY);
}

function drawNavigation() {
  let examples = currentMode === 'analyze' ? analyzeExamples : synthesizeExamples;

  // Navigation buttons
  let y = drawHeight + 50;
  let btnW = 80;

  // Previous
  let prevX = canvasWidth / 2 - btnW - 10;
  fill(exampleIdx > 0 ? '#ff9800' : '#ccc');
  stroke(exampleIdx > 0 ? '#f57c00' : '#aaa');
  strokeWeight(1);
  rect(prevX, y, btnW, 25, 3);

  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  text('← Previous', prevX + btnW / 2, y + 12);

  // Next
  let nextX = canvasWidth / 2 + 10;
  fill(exampleIdx < examples.length - 1 ? '#4CAF50' : '#ccc');
  stroke(exampleIdx < examples.length - 1 ? '#388E3C' : '#aaa');
  strokeWeight(1);
  rect(nextX, y, btnW, 25, 3);

  fill('white');
  noStroke();
  text('Next →', nextX + btnW / 2, y + 12);

  // Counter
  fill('#666');
  textSize(10);
  text((exampleIdx + 1) + ' / ' + examples.length, canvasWidth - 40, drawHeight + 27);
}

function mousePressed() {
  let examples = currentMode === 'analyze' ? analyzeExamples : synthesizeExamples;
  let y = drawHeight + 50;
  let btnW = 80;

  // Previous button
  let prevX = canvasWidth / 2 - btnW - 10;
  if (mouseX >= prevX && mouseX <= prevX + btnW && mouseY >= y && mouseY <= y + 25) {
    if (exampleIdx > 0) exampleIdx--;
  }

  // Next button
  let nextX = canvasWidth / 2 + 10;
  if (mouseX >= nextX && mouseX <= nextX + btnW && mouseY >= y && mouseY <= y + 25) {
    if (exampleIdx < examples.length - 1) exampleIdx++;
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
