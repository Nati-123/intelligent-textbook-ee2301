// Boolean Simplification Tutor MicroSim
// Step-by-step Boolean expression simplification
// Bloom Level: Apply (L3) - Apply simplification rules
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 450;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let exampleSelect;
let currentExample = 0;
let currentStep = 0;

let examples = [
  {
    name: "AB + AB'",
    steps: [
      { expr: "AB + AB'", rule: 'Original expression' },
      { expr: "A(B + B')", rule: 'Factor out A (Distributive)' },
      { expr: 'A(1)', rule: "B + B' = 1 (Complement)" },
      { expr: 'A', rule: 'A · 1 = A (Identity)' }
    ]
  },
  {
    name: "A + AB",
    steps: [
      { expr: 'A + AB', rule: 'Original expression' },
      { expr: 'A(1) + AB', rule: 'A = A · 1 (Identity)' },
      { expr: 'A(1 + B)', rule: 'Factor out A (Distributive)' },
      { expr: 'A(1)', rule: '1 + B = 1 (Null)' },
      { expr: 'A', rule: 'A · 1 = A (Identity)' }
    ]
  },
  {
    name: "(A + B)(A + B')",
    steps: [
      { expr: "(A + B)(A + B')", rule: 'Original expression' },
      { expr: "AA + AB' + BA + BB'", rule: 'FOIL / Distributive' },
      { expr: "A + AB' + AB + 0", rule: "AA = A, BB' = 0" },
      { expr: "A + A(B' + B)", rule: 'Factor out A' },
      { expr: 'A + A(1)', rule: "B' + B = 1 (Complement)" },
      { expr: 'A + A', rule: 'A · 1 = A (Identity)' },
      { expr: 'A', rule: 'A + A = A (Idempotent)' }
    ]
  },
  {
    name: "A'B + AB + AB'",
    steps: [
      { expr: "A'B + AB + AB'", rule: 'Original expression' },
      { expr: "(A' + A)B + AB'", rule: 'Factor B from first two terms' },
      { expr: "(1)B + AB'", rule: "A' + A = 1 (Complement)" },
      { expr: "B + AB'", rule: '1 · B = B (Identity)' },
      { expr: "B + A", rule: "B + AB' = B + A (Absorption variant)" }
    ]
  },
  {
    name: "(A + B)'",
    steps: [
      { expr: "(A + B)'", rule: 'Original expression' },
      { expr: "A' · B'", rule: "De Morgan's Theorem" }
    ]
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  exampleSelect = createSelect();
  exampleSelect.position(100, drawHeight + 20);
  exampleSelect.size(250);
  for (let i = 0; i < examples.length; i++) {
    exampleSelect.option(examples[i].name, i);
  }
  exampleSelect.changed(() => {
    currentExample = parseInt(exampleSelect.value());
    currentStep = 0;
  });

  describe('Boolean simplification tutor with step-by-step solutions', LABEL);
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
  textSize(20);
  text('Boolean Simplification Tutor', canvasWidth / 2, 10);

  let example = examples[currentExample];

  // Show starting expression
  textSize(14);
  fill('#666');
  text('Simplify: ' + example.name, canvasWidth / 2, 40);

  // Draw steps
  drawSteps(example);

  // Draw navigation buttons
  drawNavButtons(example);

  // Control label
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(14);
  text('Example:', 20, drawHeight + 32);
}

function drawSteps(example) {
  let startY = 75;
  let stepHeight = 55;
  let maxVisible = min(example.steps.length, 6);

  for (let i = 0; i <= currentStep && i < example.steps.length; i++) {
    let step = example.steps[i];
    let y = startY + i * stepHeight;

    // Step background
    if (i === currentStep) {
      fill('#e3f2fd');
      stroke('#2196f3');
    } else {
      fill('white');
      stroke('#ddd');
    }
    strokeWeight(2);
    rect(30, y, canvasWidth - 60, stepHeight - 5, 5);

    // Step number
    fill(i === currentStep ? '#2196f3' : '#999');
    noStroke();
    textAlign(LEFT, TOP);
    textSize(11);
    text('Step ' + (i + 1), 40, y + 5);

    // Expression
    fill('black');
    textSize(18);
    textAlign(CENTER, TOP);
    text(step.expr, canvasWidth / 2, y + 8);

    // Rule applied
    fill('#666');
    textSize(11);
    text(step.rule, canvasWidth / 2, y + 32);

    // Arrow to next step
    if (i < currentStep && i < example.steps.length - 1) {
      fill('#4CAF50');
      noStroke();
      let arrowY = y + stepHeight - 5;
      triangle(canvasWidth / 2, arrowY + 5, canvasWidth / 2 - 8, arrowY - 3, canvasWidth / 2 + 8, arrowY - 3);
    }
  }

  // Final result highlight
  if (currentStep === example.steps.length - 1) {
    let finalY = startY + currentStep * stepHeight + stepHeight + 10;
    fill('#4CAF50');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(14);
    text('✓ Simplified to: ' + example.steps[example.steps.length - 1].expr, canvasWidth / 2, finalY);
  }
}

function drawNavButtons(example) {
  let btnY = 400;
  let btnW = 100;
  let btnH = 35;

  // Previous button
  let prevX = canvasWidth / 2 - btnW - 20;
  if (currentStep > 0) {
    fill('#ff9800');
    stroke('#f57c00');
  } else {
    fill('#ccc');
    stroke('#aaa');
  }
  strokeWeight(2);
  rect(prevX, btnY, btnW, btnH, 5);

  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);
  text('← Previous', prevX + btnW / 2, btnY + btnH / 2);

  // Next button
  let nextX = canvasWidth / 2 + 20;
  if (currentStep < example.steps.length - 1) {
    fill('#4CAF50');
    stroke('#388E3C');
  } else {
    fill('#ccc');
    stroke('#aaa');
  }
  strokeWeight(2);
  rect(nextX, btnY, btnW, btnH, 5);

  fill('white');
  noStroke();
  text('Next →', nextX + btnW / 2, btnY + btnH / 2);

  // Progress indicator
  fill('#666');
  textSize(12);
  text('Step ' + (currentStep + 1) + ' of ' + example.steps.length, canvasWidth / 2, btnY + btnH + 15);
}

function mousePressed() {
  let btnY = 400;
  let btnW = 100;
  let btnH = 35;

  let example = examples[currentExample];

  // Previous button
  let prevX = canvasWidth / 2 - btnW - 20;
  if (mouseX >= prevX && mouseX <= prevX + btnW && mouseY >= btnY && mouseY <= btnY + btnH) {
    if (currentStep > 0) currentStep--;
  }

  // Next button
  let nextX = canvasWidth / 2 + 20;
  if (mouseX >= nextX && mouseX <= nextX + btnW && mouseY >= btnY && mouseY <= btnY + btnH) {
    if (currentStep < example.steps.length - 1) currentStep++;
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
