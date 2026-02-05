// Design Flow Visualization MicroSim
// Visualize the digital design flow from specification to implementation
// Bloom Level: Understand (L2) - Explain design process
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 450;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let currentStep = 0;
let animating = false;

let designSteps = [
  {
    name: 'Problem Specification',
    color: '#9c27b0',
    description: 'Define the problem in plain language. What should the circuit do?',
    example: '"Design a circuit that outputs 1 when exactly two of three inputs are 1"'
  },
  {
    name: 'Truth Table',
    color: '#2196f3',
    description: 'List all input combinations and their corresponding outputs.',
    example: 'ABC | F\n000 | 0\n001 | 0\n010 | 0\n011 | 1\n100 | 0\n101 | 1\n110 | 1\n111 | 0'
  },
  {
    name: 'Boolean Expression',
    color: '#4CAF50',
    description: 'Derive the Boolean expression from the truth table (SOP or POS form).',
    example: "F = A'BC + AB'C + ABC'"
  },
  {
    name: 'Simplification',
    color: '#ff9800',
    description: 'Simplify using Boolean algebra, K-maps, or other methods.',
    example: "F = A'BC + AB'C + ABC'\n(No further simplification possible for this function)"
  },
  {
    name: 'Gate Implementation',
    color: '#f44336',
    description: 'Draw the logic circuit using basic gates (AND, OR, NOT).',
    example: '3 AND gates + 1 OR gate + 3 NOT gates'
  },
  {
    name: 'Verification',
    color: '#795548',
    description: 'Verify the circuit produces correct outputs for all inputs.',
    example: 'Test all 8 input combinations against original truth table'
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  describe('Digital design flow visualization from specification to implementation', LABEL);
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
  text('Digital Design Flow', canvasWidth / 2, 10);

  // Draw flow diagram
  drawFlowDiagram();

  // Draw current step details
  drawStepDetails();

  // Navigation hint
  fill('#666');
  textSize(11);
  textAlign(CENTER, CENTER);
  text('Click on a step or use arrows to navigate', canvasWidth / 2, drawHeight + 25);
}

function drawFlowDiagram() {
  let startY = 50;
  let stepWidth = 100;
  let stepHeight = 40;
  let gap = 20;

  // Calculate layout - 2 rows of 3
  let stepsPerRow = 3;
  let totalWidth = stepsPerRow * stepWidth + (stepsPerRow - 1) * gap;
  let startX = (canvasWidth - totalWidth) / 2;

  for (let i = 0; i < designSteps.length; i++) {
    let row = Math.floor(i / stepsPerRow);
    let col = i % stepsPerRow;

    // Reverse direction on second row
    if (row === 1) {
      col = stepsPerRow - 1 - col;
    }

    let x = startX + col * (stepWidth + gap);
    let y = startY + row * (stepHeight + 50);

    let step = designSteps[i];
    let isActive = i === currentStep;

    // Step box
    if (isActive) {
      fill(step.color);
      stroke('white');
      strokeWeight(3);
    } else {
      fill('white');
      stroke(step.color);
      strokeWeight(2);
    }
    rect(x, y, stepWidth, stepHeight, 5);

    // Step number
    fill(isActive ? 'white' : step.color);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    text((i + 1) + '. ' + step.name.split(' ')[0], x + stepWidth / 2, y + stepHeight / 2 - 6);
    textSize(9);
    text(step.name.split(' ').slice(1).join(' '), x + stepWidth / 2, y + stepHeight / 2 + 8);

    // Draw arrows
    if (i < designSteps.length - 1) {
      let nextRow = Math.floor((i + 1) / stepsPerRow);
      let nextCol = (i + 1) % stepsPerRow;
      if (nextRow === 1) {
        nextCol = stepsPerRow - 1 - nextCol;
      }

      stroke('#999');
      strokeWeight(2);

      if (row === nextRow) {
        // Horizontal arrow
        let arrowX1 = x + stepWidth;
        let arrowX2 = startX + nextCol * (stepWidth + gap);
        let arrowY = y + stepHeight / 2;

        if (row === 0) {
          line(arrowX1, arrowY, arrowX2, arrowY);
          drawArrow(arrowX2, arrowY, 0);
        } else {
          line(arrowX2 + stepWidth, arrowY, arrowX1, arrowY);
          drawArrow(arrowX1, arrowY, PI);
        }
      } else {
        // Vertical arrow (between rows)
        let arrowX = x + stepWidth / 2;
        let arrowY1 = y + stepHeight;
        let arrowY2 = startY + nextRow * (stepHeight + 50);
        line(arrowX, arrowY1, arrowX, arrowY2);
        drawArrow(arrowX, arrowY2, HALF_PI);
      }
    }
  }
}

function drawArrow(x, y, angle) {
  fill('#999');
  noStroke();
  push();
  translate(x, y);
  rotate(angle);
  triangle(0, 0, -10, -5, -10, 5);
  pop();
}

function drawStepDetails() {
  let step = designSteps[currentStep];
  let detailY = 180;

  // Detail box
  fill('white');
  stroke(step.color);
  strokeWeight(2);
  rect(20, detailY, canvasWidth - 40, 260, 8);

  // Step name
  fill(step.color);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(16);
  text('Step ' + (currentStep + 1) + ': ' + step.name, canvasWidth / 2, detailY + 15);

  // Description
  fill('#333');
  textSize(12);
  textAlign(LEFT, TOP);
  text(step.description, 35, detailY + 45, canvasWidth - 70);

  // Example
  fill('#666');
  textSize(11);
  text('Example:', 35, detailY + 85);

  fill('#333');
  textSize(10);
  let exampleLines = step.example.split('\n');
  let lineY = detailY + 105;
  for (let line of exampleLines) {
    text(line, 45, lineY);
    lineY += 14;
  }

  // Navigation arrows
  let arrowY = detailY + 220;

  // Previous arrow
  if (currentStep > 0) {
    fill('#ff9800');
    stroke('#f57c00');
    strokeWeight(2);
    rect(40, arrowY, 80, 30, 5);
    fill('white');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(12);
    text('← Previous', 80, arrowY + 15);
  }

  // Next arrow
  if (currentStep < designSteps.length - 1) {
    fill('#4CAF50');
    stroke('#388E3C');
    strokeWeight(2);
    rect(canvasWidth - 120, arrowY, 80, 30, 5);
    fill('white');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(12);
    text('Next →', canvasWidth - 80, arrowY + 15);
  }

  // Progress
  fill('#666');
  textSize(10);
  text((currentStep + 1) + ' / ' + designSteps.length, canvasWidth / 2, arrowY + 15);
}

function mousePressed() {
  // Check step boxes
  let startY = 50;
  let stepWidth = 100;
  let stepHeight = 40;
  let gap = 20;
  let stepsPerRow = 3;
  let totalWidth = stepsPerRow * stepWidth + (stepsPerRow - 1) * gap;
  let startX = (canvasWidth - totalWidth) / 2;

  for (let i = 0; i < designSteps.length; i++) {
    let row = Math.floor(i / stepsPerRow);
    let col = i % stepsPerRow;
    if (row === 1) col = stepsPerRow - 1 - col;

    let x = startX + col * (stepWidth + gap);
    let y = startY + row * (stepHeight + 50);

    if (mouseX >= x && mouseX <= x + stepWidth && mouseY >= y && mouseY <= y + stepHeight) {
      currentStep = i;
      return;
    }
  }

  // Check navigation buttons
  let arrowY = 180 + 220;

  // Previous button
  if (mouseX >= 40 && mouseX <= 120 && mouseY >= arrowY && mouseY <= arrowY + 30) {
    if (currentStep > 0) currentStep--;
  }

  // Next button
  if (mouseX >= canvasWidth - 120 && mouseX <= canvasWidth - 40 && mouseY >= arrowY && mouseY <= arrowY + 30) {
    if (currentStep < designSteps.length - 1) currentStep++;
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
