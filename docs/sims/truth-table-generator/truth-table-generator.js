// Truth Table Generator MicroSim
// Generate truth tables for Boolean expressions
// Bloom Level: Apply (L3) - Construct truth tables
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 420;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let expressionInput;
let numVarsSelect;
let numVars = 2;
let expression = "A AND B";
let truthTable = [];
let errorMsg = '';

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  // Number of variables selector
  numVarsSelect = createSelect();
  numVarsSelect.position(100, drawHeight + 15);
  numVarsSelect.option('2 variables', 2);
  numVarsSelect.option('3 variables', 3);
  numVarsSelect.option('4 variables', 4);
  numVarsSelect.changed(() => {
    numVars = parseInt(numVarsSelect.value());
    generateTruthTable();
  });

  // Expression input
  expressionInput = createInput('A AND B');
  expressionInput.position(100, drawHeight + 50);
  expressionInput.size(200);
  expressionInput.input(() => {
    expression = expressionInput.value();
    generateTruthTable();
  });

  generateTruthTable();
  describe('Truth table generator for Boolean expressions', LABEL);
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
  text('Truth Table Generator', canvasWidth / 2, 10);

  // Show expression
  textSize(14);
  fill('#2196f3');
  text('F = ' + expression, canvasWidth / 2, 38);

  if (errorMsg) {
    fill('#f44336');
    textSize(12);
    text(errorMsg, canvasWidth / 2, 58);
  }

  // Draw truth table
  drawTruthTable();

  // Control labels
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text('Variables:', 20, drawHeight + 27);
  text('Expression:', 20, drawHeight + 62);

  // Help text
  fill('#666');
  textSize(10);
  textAlign(RIGHT, CENTER);
  text('Use: AND, OR, NOT, XOR, NAND, NOR', canvasWidth - 20, drawHeight + 27);
}

function drawTruthTable() {
  let startY = 75;
  let rowHeight = 25;
  let cols = numVars + 1;
  let colWidth = min(60, (canvasWidth - 80) / cols);
  let tableWidth = colWidth * cols;
  let startX = (canvasWidth - tableWidth) / 2;

  // Header
  fill('#2196f3');
  stroke('#1976d2');
  strokeWeight(1);
  rect(startX, startY, tableWidth, rowHeight);

  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);

  let varNames = ['A', 'B', 'C', 'D'];
  for (let i = 0; i < numVars; i++) {
    text(varNames[i], startX + colWidth * i + colWidth / 2, startY + rowHeight / 2);
  }
  text('F', startX + colWidth * numVars + colWidth / 2, startY + rowHeight / 2);

  // Data rows
  let numRows = Math.pow(2, numVars);
  for (let row = 0; row < numRows; row++) {
    let y = startY + (row + 1) * rowHeight;

    // Alternating row colors
    fill(row % 2 === 0 ? '#f5f5f5' : 'white');
    stroke('#ddd');
    strokeWeight(1);
    rect(startX, y, tableWidth, rowHeight);

    // Values
    noStroke();
    textSize(14);
    for (let col = 0; col < numVars; col++) {
      let bit = (row >> (numVars - 1 - col)) & 1;
      fill(bit ? '#4CAF50' : '#999');
      text(bit, startX + colWidth * col + colWidth / 2, y + rowHeight / 2);
    }

    // Result
    let result = truthTable[row];
    fill(result === 1 ? '#4CAF50' : (result === 0 ? '#f44336' : '#999'));
    text(result !== undefined ? result : '?', startX + colWidth * numVars + colWidth / 2, y + rowHeight / 2);
  }

  // Draw border
  stroke('#2196f3');
  strokeWeight(2);
  noFill();
  rect(startX, startY, tableWidth, rowHeight * (numRows + 1));

  // Show minterms
  if (truthTable.length > 0 && !errorMsg) {
    let minterms = [];
    for (let i = 0; i < truthTable.length; i++) {
      if (truthTable[i] === 1) minterms.push(i);
    }
    fill('#666');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(12);
    let mintermY = startY + (numRows + 1) * rowHeight + 15;
    text('Minterms: Σm(' + (minterms.length > 0 ? minterms.join(', ') : 'none') + ')', canvasWidth / 2, mintermY);
  }
}

function generateTruthTable() {
  truthTable = [];
  errorMsg = '';

  let numRows = Math.pow(2, numVars);

  for (let row = 0; row < numRows; row++) {
    let vars = {};
    let varNames = ['A', 'B', 'C', 'D'];
    for (let i = 0; i < numVars; i++) {
      vars[varNames[i]] = (row >> (numVars - 1 - i)) & 1;
    }

    try {
      let result = evaluateExpression(expression, vars);
      truthTable.push(result);
    } catch (e) {
      errorMsg = 'Invalid expression';
      truthTable.push(undefined);
    }
  }
}

function evaluateExpression(expr, vars) {
  // Tokenize and parse simple Boolean expression
  let tokens = tokenize(expr.toUpperCase());
  if (tokens.length === 0) return 0;

  return parseOr(tokens, vars, { pos: 0 });
}

function tokenize(expr) {
  let tokens = [];
  let i = 0;

  while (i < expr.length) {
    if (expr[i] === ' ') {
      i++;
      continue;
    }

    if (expr[i] === '(' || expr[i] === ')') {
      tokens.push(expr[i]);
      i++;
    } else if (expr.substr(i, 4) === 'NAND') {
      tokens.push('NAND');
      i += 4;
    } else if (expr.substr(i, 3) === 'AND') {
      tokens.push('AND');
      i += 3;
    } else if (expr.substr(i, 3) === 'NOR') {
      tokens.push('NOR');
      i += 3;
    } else if (expr.substr(i, 3) === 'XOR') {
      tokens.push('XOR');
      i += 3;
    } else if (expr.substr(i, 3) === 'NOT') {
      tokens.push('NOT');
      i += 3;
    } else if (expr.substr(i, 2) === 'OR') {
      tokens.push('OR');
      i += 2;
    } else if (/[A-D]/.test(expr[i])) {
      tokens.push(expr[i]);
      i++;
    } else if (/[01]/.test(expr[i])) {
      tokens.push(parseInt(expr[i]));
      i++;
    } else {
      i++;
    }
  }

  return tokens;
}

function parseOr(tokens, vars, state) {
  let left = parseAnd(tokens, vars, state);

  while (state.pos < tokens.length) {
    if (tokens[state.pos] === 'OR') {
      state.pos++;
      let right = parseAnd(tokens, vars, state);
      left = left | right;
    } else if (tokens[state.pos] === 'NOR') {
      state.pos++;
      let right = parseAnd(tokens, vars, state);
      left = (left | right) ^ 1;
    } else if (tokens[state.pos] === 'XOR') {
      state.pos++;
      let right = parseAnd(tokens, vars, state);
      left = left ^ right;
    } else {
      break;
    }
  }

  return left;
}

function parseAnd(tokens, vars, state) {
  let left = parseNot(tokens, vars, state);

  while (state.pos < tokens.length) {
    if (tokens[state.pos] === 'AND') {
      state.pos++;
      let right = parseNot(tokens, vars, state);
      left = left & right;
    } else if (tokens[state.pos] === 'NAND') {
      state.pos++;
      let right = parseNot(tokens, vars, state);
      left = (left & right) ^ 1;
    } else {
      break;
    }
  }

  return left;
}

function parseNot(tokens, vars, state) {
  if (tokens[state.pos] === 'NOT') {
    state.pos++;
    return parseNot(tokens, vars, state) ^ 1;
  }
  return parsePrimary(tokens, vars, state);
}

function parsePrimary(tokens, vars, state) {
  let token = tokens[state.pos];

  if (token === '(') {
    state.pos++;
    let result = parseOr(tokens, vars, state);
    if (tokens[state.pos] === ')') state.pos++;
    return result;
  }

  if (typeof token === 'number') {
    state.pos++;
    return token;
  }

  if (typeof token === 'string' && /[A-D]/.test(token)) {
    state.pos++;
    return vars[token] || 0;
  }

  state.pos++;
  return 0;
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
