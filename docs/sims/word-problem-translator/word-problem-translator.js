// Word Problem Translator MicroSim
// Translate word problems into Boolean expressions
// Bloom Level: Apply (L3) - Apply translation techniques
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 450;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let problemSelect;
let currentProblem = 0;
let showSolution = false;

let problems = [
  {
    text: 'A light turns on when switch A AND switch B are both closed.',
    variables: { A: 'Switch A closed', B: 'Switch B closed' },
    expression: 'Light = A · B',
    explanation: '"Both" indicates AND operation'
  },
  {
    text: 'An alarm sounds when door is open OR window is open.',
    variables: { D: 'Door open', W: 'Window open' },
    expression: 'Alarm = D + W',
    explanation: '"Or" indicates OR operation'
  },
  {
    text: 'A motor runs when the start button is pressed AND the stop button is NOT pressed.',
    variables: { S: 'Start pressed', T: 'Stop pressed' },
    expression: "Motor = S · T'",
    explanation: '"NOT pressed" indicates complement'
  },
  {
    text: 'Access is granted when (badge AND PIN) OR (admin override).',
    variables: { B: 'Badge valid', P: 'PIN correct', A: 'Admin override' },
    expression: 'Access = (B · P) + A',
    explanation: 'Parentheses group related conditions'
  },
  {
    text: 'A pump activates when level is high AND (valve A OR valve B is open).',
    variables: { L: 'Level high', A: 'Valve A open', B: 'Valve B open' },
    expression: 'Pump = L · (A + B)',
    explanation: 'Nested condition requires parentheses'
  },
  {
    text: 'An error occurs when NEITHER input A NOR input B is valid.',
    variables: { A: 'Input A valid', B: 'Input B valid' },
    expression: "Error = (A + B)' = A' · B'",
    explanation: '"Neither...nor" is NOR operation'
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  problemSelect = createSelect();
  problemSelect.position(100, drawHeight + 18);
  problemSelect.size(250);
  for (let i = 0; i < problems.length; i++) {
    problemSelect.option('Problem ' + (i + 1), i);
  }
  problemSelect.changed(() => {
    currentProblem = parseInt(problemSelect.value());
    showSolution = false;
  });

  describe('Word problem to Boolean expression translator', LABEL);
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
  text('Word Problem Translator', canvasWidth / 2, 10);

  let problem = problems[currentProblem];

  // Problem text
  fill('#333');
  textSize(13);
  textAlign(LEFT, TOP);
  text('Problem:', 25, 45);

  fill('black');
  textSize(14);
  text(problem.text, 25, 70, canvasWidth - 50);

  // Variable definitions
  let varY = 130;
  fill('#2196f3');
  textSize(12);
  text('Variables:', 25, varY);

  fill('#333');
  textSize(11);
  varY += 22;
  for (let v in problem.variables) {
    text(v + ' = "' + problem.variables[v] + '"', 35, varY);
    varY += 18;
  }

  // Keywords section
  drawKeywordGuide(varY + 15);

  // Solution area
  drawSolution(problem);

  // Show/Hide button
  let btnY = 360;
  fill(showSolution ? '#f44336' : '#4CAF50');
  stroke(showSolution ? '#d32f2f' : '#388E3C');
  strokeWeight(2);
  rect(canvasWidth / 2 - 70, btnY, 140, 35, 5);

  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);
  text(showSolution ? 'Hide Solution' : 'Show Solution', canvasWidth / 2, btnY + 17);

  // Control label
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text('Problem:', 25, drawHeight + 30);
}

function drawKeywordGuide(startY) {
  fill('#f5f5f5');
  stroke('#ddd');
  strokeWeight(1);
  rect(25, startY, canvasWidth - 50, 80, 5);

  fill('#666');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(11);
  text('Translation Keywords:', 35, startY + 8);

  textSize(10);
  let col1 = 35, col2 = canvasWidth / 2 + 10;
  let y = startY + 28;

  fill('#333');
  text('• "AND", "both", "also" → · (AND)', col1, y);
  text('• "NOT", "unless", "except" → \' (NOT)', col2, y);
  y += 16;
  text('• "OR", "either", "any" → + (OR)', col1, y);
  text('• "NEITHER...NOR" → (A+B)\'', col2, y);
  y += 16;
  text('• "IF...THEN" → implies', col1, y);
  text('• "ONLY IF" → B → A', col2, y);
}

function drawSolution(problem) {
  let solY = 290;

  fill('#e8f5e9');
  stroke('#4CAF50');
  strokeWeight(2);
  rect(25, solY, canvasWidth - 50, 60, 5);

  if (showSolution) {
    fill('#4CAF50');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(14);
    text('Solution:', canvasWidth / 2, solY + 8);

    fill('black');
    textSize(16);
    text(problem.expression, canvasWidth / 2, solY + 28);

    fill('#666');
    textSize(10);
    text(problem.explanation, canvasWidth / 2, solY + 48);
  } else {
    fill('#999');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(12);
    text('Click "Show Solution" to see the answer', canvasWidth / 2, solY + 30);
  }
}

function mousePressed() {
  // Check show/hide button
  let btnY = 360;
  if (mouseX >= canvasWidth / 2 - 70 && mouseX <= canvasWidth / 2 + 70 &&
      mouseY >= btnY && mouseY <= btnY + 35) {
    showSolution = !showSolution;
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
