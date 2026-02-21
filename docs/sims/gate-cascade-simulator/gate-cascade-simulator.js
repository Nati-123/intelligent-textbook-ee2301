// Gate Cascade Simulator MicroSim
// Simulate multi-level logic gate circuits
// Bloom Level: Analyze (L4) - Trace signal propagation
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let inputs = [1, 0, 1];
let circuitSelect;
let currentCircuit = 0;

let circuits = [
  {
    name: '(A AND B) OR C',
    gates: [
      { type: 'AND', inputs: [0, 1], x: 0.3, y: 0.35 },
      { type: 'OR', inputs: ['g0', 2], x: 0.65, y: 0.5 }
    ],
    inputLabels: ['A', 'B', 'C']
  },
  {
    name: 'A AND (B OR C)',
    gates: [
      { type: 'OR', inputs: [1, 2], x: 0.3, y: 0.55 },
      { type: 'AND', inputs: [0, 'g0'], x: 0.65, y: 0.5 }
    ],
    inputLabels: ['A', 'B', 'C']
  },
  {
    name: '(A NAND B) AND C',
    gates: [
      { type: 'NAND', inputs: [0, 1], x: 0.3, y: 0.35 },
      { type: 'AND', inputs: ['g0', 2], x: 0.65, y: 0.5 }
    ],
    inputLabels: ['A', 'B', 'C']
  },
  {
    name: 'NOT(A) OR (B AND C)',
    gates: [
      { type: 'NOT', inputs: [0], x: 0.25, y: 0.3 },
      { type: 'AND', inputs: [1, 2], x: 0.35, y: 0.6 },
      { type: 'OR', inputs: ['g0', 'g1'], x: 0.65, y: 0.5 }
    ],
    inputLabels: ['A', 'B', 'C']
  },
  {
    name: '(A XOR B) AND C',
    gates: [
      { type: 'XOR', inputs: [0, 1], x: 0.3, y: 0.35 },
      { type: 'AND', inputs: ['g0', 2], x: 0.65, y: 0.5 }
    ],
    inputLabels: ['A', 'B', 'C']
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  circuitSelect = createSelect();
  circuitSelect.size(250);
  for (let i = 0; i < circuits.length; i++) {
    circuitSelect.option(circuits[i].name, i);
  }
  circuitSelect.changed(() => { currentCircuit = parseInt(circuitSelect.value()); });

  positionUIElements();

  describe('Gate cascade simulator showing signal propagation through multi-level circuits', LABEL);
}

function positionUIElements() {
  let mainRect = document.querySelector('main').getBoundingClientRect();
  circuitSelect.position(mainRect.left + 100, mainRect.top + drawHeight + 15);
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
  text('Gate Cascade Simulator', canvasWidth / 2, 10);

  let circuit = circuits[currentCircuit];

  // Expression
  textSize(14);
  fill('#2196f3');
  text('F = ' + circuit.name, canvasWidth / 2, 35);

  // Calculate gate outputs
  let gateOutputs = calculateOutputs(circuit);

  // Draw circuit
  drawCircuit(circuit, gateOutputs);

  // Draw input toggles
  drawInputToggles(circuit);

  // Draw final result
  let finalOutput = gateOutputs[gateOutputs.length - 1];
  fill(finalOutput ? '#4CAF50' : '#f44336');
  textSize(16);
  textAlign(CENTER, CENTER);
  text('Output F = ' + finalOutput, canvasWidth / 2, drawHeight - 30);

  // Control labels
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(14);
  text('Circuit:', 20, drawHeight + 27);
}

function calculateOutputs(circuit) {
  let outputs = [];

  for (let gate of circuit.gates) {
    let inVals = gate.inputs.map(inp => {
      if (typeof inp === 'number') {
        return inputs[inp];
      } else {
        // Reference to previous gate output
        let gateIdx = parseInt(inp.substring(1));
        return outputs[gateIdx];
      }
    });

    let result;
    switch (gate.type) {
      case 'AND': result = inVals[0] && inVals[1] ? 1 : 0; break;
      case 'OR': result = inVals[0] || inVals[1] ? 1 : 0; break;
      case 'NOT': result = inVals[0] ? 0 : 1; break;
      case 'NAND': result = (inVals[0] && inVals[1]) ? 0 : 1; break;
      case 'NOR': result = (inVals[0] || inVals[1]) ? 0 : 1; break;
      case 'XOR': result = inVals[0] !== inVals[1] ? 1 : 0; break;
      default: result = 0;
    }
    outputs.push(result);
  }

  return outputs;
}

function drawCircuit(circuit, gateOutputs) {
  // Draw input lines
  let inputY = [120, 180, 240];
  let startX = 50;

  for (let i = 0; i < 3; i++) {
    stroke(inputs[i] ? '#4CAF50' : '#999');
    strokeWeight(3);
    line(startX, inputY[i], startX + 60, inputY[i]);

    // Input label and value
    fill(inputs[i] ? '#4CAF50' : '#f44336');
    noStroke();
    textAlign(RIGHT, CENTER);
    textSize(14);
    text(circuit.inputLabels[i] + '=' + inputs[i], startX - 5, inputY[i]);
  }

  // Draw gates
  for (let i = 0; i < circuit.gates.length; i++) {
    let gate = circuit.gates[i];
    let x = gate.x * canvasWidth;
    let y = gate.y * drawHeight;
    let output = gateOutputs[i];

    drawGate(gate.type, x, y, output);

    // Draw connections to this gate
    drawConnections(gate, x, y, circuit, inputY, gateOutputs, i);
  }

  // Draw output line from last gate
  let lastGate = circuit.gates[circuit.gates.length - 1];
  let lastX = lastGate.x * canvasWidth;
  let lastY = lastGate.y * drawHeight;
  let finalOutput = gateOutputs[gateOutputs.length - 1];

  stroke(finalOutput ? '#4CAF50' : '#999');
  strokeWeight(3);
  let outEndX = lastX + 80;
  line(lastX + 35, lastY, outEndX, lastY);

  // Output arrow
  fill(finalOutput ? '#4CAF50' : '#999');
  noStroke();
  triangle(outEndX + 5, lastY, outEndX - 5, lastY - 8, outEndX - 5, lastY + 8);

  // Output label Y
  fill(finalOutput ? '#4CAF50' : '#f44336');
  textAlign(LEFT, CENTER);
  textSize(16);
  text('Y=' + finalOutput, outEndX + 12, lastY);
}

function drawGate(type, x, y, output) {
  fill('white');
  stroke(output ? '#4CAF50' : '#666');
  strokeWeight(2);

  let h = 35;

  if (type === 'NOT') {
    // Triangle with bubble
    triangle(x - 20, y - 15, x - 20, y + 15, x + 15, y);
    fill('white');
    ellipse(x + 20, y, 10);
  } else if (type === 'AND' || type === 'NAND') {
    // AND body: flat left, curved right
    beginShape();
    vertex(x - 20, y - h / 2);
    vertex(x, y - h / 2);
    for (let a = -HALF_PI; a <= HALF_PI; a += 0.1) {
      vertex(x + cos(a) * h / 2, y + sin(a) * h / 2);
    }
    vertex(x, y + h / 2);
    vertex(x - 20, y + h / 2);
    endShape(CLOSE);
    if (type === 'NAND') {
      fill('white');
      ellipse(x + h / 2 + 5, y, 10);
    }
  } else if (type === 'OR' || type === 'NOR' || type === 'XOR') {
    // OR body: curved left, pointed right
    beginShape();
    vertex(x - 20, y - h / 2);
    bezierVertex(x - 5, y - h / 2, x + 15, y - 10, x + 25, y);
    bezierVertex(x + 15, y + 10, x - 5, y + h / 2, x - 20, y + h / 2);
    bezierVertex(x - 10, y, x - 10, y, x - 20, y - h / 2);
    endShape(CLOSE);
    if (type === 'NOR') {
      fill('white');
      ellipse(x + 30, y, 10);
    }
    if (type === 'XOR') {
      noFill();
      stroke(output ? '#4CAF50' : '#666');
      bezier(x - 25, y - h / 2, x - 15, y - 5, x - 15, y + 5, x - 25, y + h / 2);
    }
  }

  // Gate label
  fill('#333');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(9);
  text(type, x - 2, y);
}

function drawConnections(gate, gateX, gateY, circuit, inputY, gateOutputs, gateIdx) {
  for (let i = 0; i < gate.inputs.length; i++) {
    let inp = gate.inputs[i];
    let yOffset = (i - (gate.inputs.length - 1) / 2) * 12;
    let targetY = gateY + yOffset;

    if (typeof inp === 'number') {
      // Connection from input
      let sourceY = inputY[inp];
      stroke(inputs[inp] ? '#4CAF50' : '#999');
      strokeWeight(2);

      // Horizontal then vertical then horizontal
      let midX = gateX - 30;
      line(110, sourceY, midX, sourceY);
      line(midX, sourceY, midX, targetY);
      line(midX, targetY, gateX - 20, targetY);
    } else {
      // Connection from previous gate
      let sourceIdx = parseInt(inp.substring(1));
      let sourceGate = circuit.gates[sourceIdx];
      let sourceX = sourceGate.x * canvasWidth + 35;
      let sourceY = sourceGate.y * drawHeight;
      let output = gateOutputs[sourceIdx];

      stroke(output ? '#4CAF50' : '#999');
      strokeWeight(2);

      let midX = (sourceX + gateX - 20) / 2;
      line(sourceX, sourceY, midX, sourceY);
      line(midX, sourceY, midX, targetY);
      line(midX, targetY, gateX - 20, targetY);
    }
  }
}

function drawInputToggles(circuit) {
  let y = drawHeight + 42;
  let toggleW = 45;
  let spacing = 60;
  let startX = canvasWidth / 2 - spacing;

  for (let i = 0; i < 3; i++) {
    let x = startX + (i - 1) * spacing;

    fill(inputs[i] ? '#4CAF50' : '#f44336');
    stroke('#333');
    strokeWeight(2);
    rect(x, y, toggleW, 28, 5);

    fill('white');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(12);
    text(circuit.inputLabels[i] + '=' + inputs[i], x + toggleW / 2, y + 14);
  }

  fill('#666');
  textSize(10);
  text('Click to toggle inputs', canvasWidth / 2, y + 36);
}

function mousePressed() {
  let y = drawHeight + 42;
  let toggleW = 45;
  let spacing = 60;
  let startX = canvasWidth / 2 - spacing;

  for (let i = 0; i < 3; i++) {
    let x = startX + (i - 1) * spacing;
    if (mouseX >= x && mouseX <= x + toggleW && mouseY >= y && mouseY <= y + 28) {
      inputs[i] = 1 - inputs[i];
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
