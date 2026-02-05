// Shannon Expansion Explorer MicroSim
// Explore Shannon's expansion theorem
// Bloom Level: Analyze (L4) - Analyze function decomposition
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 450;
let controlHeight = 70;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let functionSelect;
let varSelect;
let currentFunc = 0;
let expansionVar = 0;

let functions = [
  {
    name: 'F = AB + BC',
    vars: ['A', 'B', 'C'],
    expr: 'AB + BC',
    truthTable: [0, 0, 0, 1, 0, 1, 1, 1] // m3, m5, m6, m7
  },
  {
    name: "F = A'B + AB'C",
    vars: ['A', 'B', 'C'],
    expr: "A'B + AB'C",
    truthTable: [0, 0, 1, 1, 0, 1, 0, 0] // m2, m3, m5
  },
  {
    name: 'F = ABC + AB',
    vars: ['A', 'B', 'C'],
    expr: 'ABC + AB',
    truthTable: [0, 0, 0, 0, 0, 0, 1, 1] // m6, m7 (simplifies to AB)
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  functionSelect = createSelect();
  functionSelect.position(100, drawHeight + 12);
  functionSelect.size(200);
  for (let i = 0; i < functions.length; i++) {
    functionSelect.option(functions[i].name, i);
  }
  functionSelect.changed(() => {
    currentFunc = parseInt(functionSelect.value());
    expansionVar = 0;
    varSelect.value(0);
  });

  varSelect = createSelect();
  varSelect.position(100, drawHeight + 42);
  varSelect.option('A', 0);
  varSelect.option('B', 1);
  varSelect.option('C', 2);
  varSelect.changed(() => { expansionVar = parseInt(varSelect.value()); });

  describe('Shannon expansion theorem explorer showing function decomposition', LABEL);
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
  text("Shannon's Expansion Theorem", canvasWidth / 2, 10);

  let func = functions[currentFunc];
  let varName = func.vars[expansionVar];

  // Draw original function
  drawOriginalFunction(func);

  // Draw expansion theorem
  drawExpansionTheorem(func, varName);

  // Draw cofactors
  drawCofactors(func, varName);

  // Draw result
  drawExpansionResult(func, varName);

  // Control labels
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(11);
  text('Function:', 20, drawHeight + 24);
  text('Expand on:', 20, drawHeight + 54);
}

function drawOriginalFunction(func) {
  let y = 40;

  fill('#e3f2fd');
  stroke('#2196f3');
  strokeWeight(2);
  rect(25, y, canvasWidth - 50, 40, 5);

  fill('#2196f3');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);
  text('F(' + func.vars.join(', ') + ') = ' + func.expr, canvasWidth / 2, y + 20);
}

function drawExpansionTheorem(func, varName) {
  let y = 95;

  fill('#fff3e0');
  stroke('#ff9800');
  strokeWeight(2);
  rect(25, y, canvasWidth - 50, 55, 8);

  fill('#ff9800');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(11);
  text("Shannon's Expansion Theorem", canvasWidth / 2, y + 8);

  textSize(13);
  fill('black');
  text("F = " + varName + "' · F|" + varName + "=0  +  " + varName + " · F|" + varName + "=1", canvasWidth / 2, y + 30);
}

function drawCofactors(func, varName) {
  let y = 165;
  let halfW = (canvasWidth - 60) / 2;

  // Calculate cofactors
  let f0 = getCofactor(func, expansionVar, 0);
  let f1 = getCofactor(func, expansionVar, 1);

  // Cofactor F|x=0
  fill('#e8f5e9');
  stroke('#4CAF50');
  strokeWeight(2);
  rect(25, y, halfW, 80, 8);

  fill('#4CAF50');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(11);
  text('Cofactor F|' + varName + '=0', 25 + halfW / 2, y + 8);

  fill('black');
  textSize(12);
  text('Set ' + varName + ' = 0 in F:', 25 + halfW / 2, y + 28);
  text('F|' + varName + '=0 = ' + f0.expr, 25 + halfW / 2, y + 48);

  fill('#666');
  textSize(9);
  text('Values: ' + f0.values.join(', '), 25 + halfW / 2, y + 65);

  // Cofactor F|x=1
  let rightX = 35 + halfW;
  fill('#ffebee');
  stroke('#f44336');
  strokeWeight(2);
  rect(rightX, y, halfW, 80, 8);

  fill('#f44336');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(11);
  text('Cofactor F|' + varName + '=1', rightX + halfW / 2, y + 8);

  fill('black');
  textSize(12);
  text('Set ' + varName + ' = 1 in F:', rightX + halfW / 2, y + 28);
  text('F|' + varName + '=1 = ' + f1.expr, rightX + halfW / 2, y + 48);

  fill('#666');
  textSize(9);
  text('Values: ' + f1.values.join(', '), rightX + halfW / 2, y + 65);
}

function drawExpansionResult(func, varName) {
  let y = 260;

  // Calculate cofactors
  let f0 = getCofactor(func, expansionVar, 0);
  let f1 = getCofactor(func, expansionVar, 1);

  fill('#e3f2fd');
  stroke('#2196f3');
  strokeWeight(2);
  rect(25, y, canvasWidth - 50, 60, 8);

  fill('#2196f3');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(11);
  text('Expanded Form', canvasWidth / 2, y + 8);

  fill('black');
  textSize(13);
  text("F = " + varName + "' · (" + f0.expr + ") + " + varName + " · (" + f1.expr + ")", canvasWidth / 2, y + 30);

  // Draw application info
  y += 75;
  fill('#f5f5f5');
  stroke('#ccc');
  strokeWeight(1);
  rect(25, y, canvasWidth - 50, 105, 5);

  fill('#333');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(10);
  text('Applications of Shannon Expansion:', 35, y + 10);

  fill('#666');
  textSize(9);
  let appY = y + 28;
  text('• Multiplexer implementation (cofactors are MUX data inputs)', 40, appY);
  appY += 15;
  text('• Binary Decision Diagrams (BDDs) construction', 40, appY);
  appY += 15;
  text('• Function decomposition for FPGA mapping', 40, appY);
  appY += 15;
  text('• Recursive algorithm basis (divide and conquer)', 40, appY);
  appY += 18;

  fill('#2196f3');
  textSize(9);
  text('MUX: F = ' + varName + ' ? (' + f1.expr + ') : (' + f0.expr + ')', 40, appY);
}

function getCofactor(func, varIdx, value) {
  let tt = func.truthTable;
  let numVars = func.vars.length;
  let halfSize = Math.pow(2, numVars - 1);

  // Extract cofactor values
  let cofactorValues = [];
  for (let i = 0; i < Math.pow(2, numVars); i++) {
    let bit = (i >> (numVars - 1 - varIdx)) & 1;
    if (bit === value) {
      cofactorValues.push(tt[i]);
    }
  }

  // Get remaining variables
  let remainingVars = func.vars.filter((v, idx) => idx !== varIdx);

  // Try to determine simplified expression
  let expr = getCofactorExpression(cofactorValues, remainingVars, func.expr, func.vars[varIdx], value);

  return {
    values: cofactorValues,
    expr: expr
  };
}

function getCofactorExpression(values, vars, originalExpr, expandVar, expandValue) {
  // Simple cases
  if (values.every(v => v === 0)) return '0';
  if (values.every(v => v === 1)) return '1';

  // For 2 remaining variables, try to identify pattern
  if (vars.length === 2) {
    // values order: 00, 01, 10, 11
    if (arraysEqual(values, [0, 0, 0, 1])) return vars[0] + vars[1];
    if (arraysEqual(values, [0, 0, 1, 0])) return vars[0] + vars[1] + "'";
    if (arraysEqual(values, [0, 1, 0, 0])) return vars[0] + "'" + vars[1];
    if (arraysEqual(values, [1, 0, 0, 0])) return vars[0] + "'" + vars[1] + "'";
    if (arraysEqual(values, [0, 1, 1, 1])) return vars[0] + ' + ' + vars[1];
    if (arraysEqual(values, [1, 0, 1, 1])) return vars[0] + ' + ' + vars[1] + "'";
    if (arraysEqual(values, [1, 1, 0, 1])) return vars[0] + "' + " + vars[1];
    if (arraysEqual(values, [1, 1, 1, 0])) return vars[0] + "' + " + vars[1] + "'";
    if (arraysEqual(values, [0, 0, 1, 1])) return vars[0];
    if (arraysEqual(values, [1, 1, 0, 0])) return vars[0] + "'";
    if (arraysEqual(values, [0, 1, 0, 1])) return vars[1];
    if (arraysEqual(values, [1, 0, 1, 0])) return vars[1] + "'";
    if (arraysEqual(values, [0, 1, 1, 0])) return vars[0] + vars[1] + "' + " + vars[0] + "'" + vars[1];
    if (arraysEqual(values, [1, 0, 0, 1])) return vars[0] + vars[1] + " + " + vars[0] + "'" + vars[1] + "'";
  }

  // Fallback to substitution description
  return originalExpr.replace(new RegExp(expandVar + "'", 'g'), expandValue === 0 ? '1' : '0')
                     .replace(new RegExp(expandVar, 'g'), expandValue.toString());
}

function arraysEqual(a, b) {
  return a.length === b.length && a.every((v, i) => v === b[i]);
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
