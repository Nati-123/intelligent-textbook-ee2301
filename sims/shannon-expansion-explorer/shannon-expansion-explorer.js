// Shannon Expansion Explorer MicroSim
// Explore Shannon's expansion theorem
// Bloom Level: Analyze (L4) - Analyze function decomposition
// MicroSim template version 2026.02
// All controls drawn on canvas — pill buttons only, no DOM elements.

let containerWidth;
let canvasWidth = 400;
let drawHeight = 820;
let canvasHeight = drawHeight;

// Theme colors (universal style template)
const PURPLE = '#6A5BFF';
const PURPLE_DARK = '#5A3EED';
const PURPLE_LIGHT = '#7A5CFF';
const PURPLE_BG = '#F4F0FF';
const PURPLE_BORDER = '#C9B9FF';
const GOLD = '#D4A017';

// Section-specific colors
const HEADER_BG = '#E8F1FF';
const HEADER_BORDER = '#B3D1FF';
const THEOREM_BG = '#FFF2D9';
const THEOREM_BORDER = '#FFD54F';
const THEOREM_TEXT = '#E65100';
const COF_POS_BG = '#E7F7E7';
const COF_POS_BORDER = '#81C784';
const COF_POS_TEXT = '#388E3C';
const COF_POS_DARK = '#1B5E20';
const COF_NEG_BG = '#FFE7E7';
const COF_NEG_BORDER = '#E57373';
const COF_NEG_TEXT = '#D32F2F';
const COF_NEG_DARK = '#B71C1C';
const RESULT_BG = '#EEF4FF';
const RESULT_BORDER = '#B8D4FF';
const APP_BG = '#FAFBFF';
const BTN_INACTIVE = '#F6F6F6';
const BTN_INACTIVE_BORDER = '#E0E0E0';

let currentFunc = 0;
let expansionVar = 0;

let functions = [
  {
    name: 'AB + BC',
    vars: ['A', 'B', 'C'],
    expr: 'AB + BC',
    truthTable: [0, 0, 0, 1, 0, 1, 1, 1]
  },
  {
    name: "A'B + AB'C",
    vars: ['A', 'B', 'C'],
    expr: "A'B + AB'C",
    truthTable: [0, 0, 1, 1, 0, 1, 0, 0]
  },
  {
    name: "AB + A'C + BC",
    vars: ['A', 'B', 'C'],
    expr: "AB + A'C + BC",
    truthTable: [0, 0, 0, 1, 0, 1, 1, 1]
  },
  {
    name: 'A + BC',
    vars: ['A', 'B', 'C'],
    expr: 'A + BC',
    truthTable: [0, 0, 0, 1, 1, 1, 1, 1]
  }
];

// Layout constants
const MX = 30;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  describe('Shannon expansion theorem explorer showing function decomposition into cofactors');
}

function draw() {
  updateCanvasSize();

  // Card background
  fill(PURPLE_BG);
  stroke(PURPLE_BORDER);
  strokeWeight(1.5);
  rect(1, 1, canvasWidth - 2, drawHeight - 2, 14);

  // Title
  fill(PURPLE);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  textStyle(BOLD);
  text("Shannon Expansion Explorer", canvasWidth / 2, 16);
  textStyle(NORMAL);

  // Subtitle
  textSize(13);
  fill('#555');
  text('Select a function and expansion variable', canvasWidth / 2, 42);

  // Draw sections
  drawFunctionSelector();
  drawVariableSelector();
  drawOriginalFunction();
  drawTheoremBar();
  drawCofactorCards();
  drawResultBox();
  drawApplications();
}

// ── Function selector (pill buttons) ──

function drawFunctionSelector() {
  let y = 68;
  let bandW = canvasWidth - 2 * MX;

  fill('#FAFBFF');
  stroke(PURPLE_BORDER);
  strokeWeight(1.5);
  rect(MX, y, bandW, 46, 12);

  fill(PURPLE);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(11);
  textStyle(BOLD);
  text('Function:', MX + 14, y + 23);
  textStyle(NORMAL);

  let btnStartX = MX + 80;
  let btnW = (bandW - 100) / 4 - 6;
  let btnH = 28;
  let btnY = y + 9;

  for (let i = 0; i < functions.length; i++) {
    let bx = btnStartX + i * (btnW + 6);
    let isActive = (currentFunc === i);

    if (isActive) {
      drawingContext.shadowColor = 'rgba(106,91,255,0.25)';
      drawingContext.shadowBlur = 4;
    }
    fill(isActive ? PURPLE : '#F0EDFF');
    stroke(isActive ? PURPLE_DARK : PURPLE_BORDER);
    strokeWeight(1.2);
    rect(bx, btnY, btnW, btnH, 6);
    drawingContext.shadowBlur = 0;

    fill(isActive ? 'white' : PURPLE);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(12);
    textStyle(BOLD);
    text('F' + (i + 1), bx + btnW / 2, btnY + btnH / 2);
    textStyle(NORMAL);
  }
}

// ── Variable selector (pill buttons) ──

function drawVariableSelector() {
  let y = 124;
  let bandW = canvasWidth - 2 * MX;
  let func = functions[currentFunc];

  fill('#FAFBFF');
  stroke(PURPLE_BORDER);
  strokeWeight(1.5);
  rect(MX, y, bandW, 46, 12);

  fill(PURPLE);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(11);
  textStyle(BOLD);
  text('Expand on:', MX + 14, y + 23);
  textStyle(NORMAL);

  let btnStartX = MX + 90;
  let btnW = 40;
  let btnH = 28;
  let btnY = y + 9;
  let gap = 8;

  for (let i = 0; i < func.vars.length; i++) {
    let bx = btnStartX + i * (btnW + gap);
    let isActive = (expansionVar === i);

    if (isActive) {
      drawingContext.shadowColor = 'rgba(106,91,255,0.25)';
      drawingContext.shadowBlur = 4;
    }
    fill(isActive ? PURPLE : '#F0EDFF');
    stroke(isActive ? PURPLE_DARK : PURPLE_BORDER);
    strokeWeight(1.2);
    rect(bx, btnY, btnW, btnH, 6);
    drawingContext.shadowBlur = 0;

    fill(isActive ? 'white' : PURPLE);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(14);
    textStyle(BOLD);
    text(func.vars[i], bx + btnW / 2, btnY + btnH / 2);
    textStyle(NORMAL);
  }
}

// ── Original function display ──

function drawOriginalFunction() {
  let y = 184;
  let bandW = canvasWidth - 2 * MX;
  let func = functions[currentFunc];

  drawingContext.shadowColor = 'rgba(106, 91, 255, 0.12)';
  drawingContext.shadowBlur = 8;
  drawingContext.shadowOffsetY = 2;

  fill(HEADER_BG);
  stroke(HEADER_BORDER);
  strokeWeight(1.5);
  rect(MX, y, bandW, 52, 12);

  drawingContext.shadowBlur = 0;
  drawingContext.shadowOffsetY = 0;

  fill(PURPLE);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(11);
  textStyle(BOLD);
  text('Original Function', canvasWidth / 2, y + 8);
  textStyle(NORMAL);

  textSize(17);
  textStyle(BOLD);
  fill(PURPLE_DARK);
  text('F(' + func.vars.join(', ') + ') = ' + func.expr, canvasWidth / 2, y + 26);
  textStyle(NORMAL);
}

// ── Shannon theorem bar ──

function drawTheoremBar() {
  let y = 250;
  let bandW = canvasWidth - 2 * MX;
  let func = functions[currentFunc];
  let v = func.vars[expansionVar];

  drawingContext.shadowColor = 'rgba(255, 213, 79, 0.2)';
  drawingContext.shadowBlur = 6;
  drawingContext.shadowOffsetY = 2;

  fill(THEOREM_BG);
  stroke(THEOREM_BORDER);
  strokeWeight(1.5);
  rect(MX, y, bandW, 58, 12);

  drawingContext.shadowBlur = 0;
  drawingContext.shadowOffsetY = 0;

  fill(THEOREM_TEXT);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(11);
  textStyle(BOLD);
  text("Shannon's Expansion Theorem", canvasWidth / 2, y + 8);
  textStyle(NORMAL);

  textSize(15);
  textStyle(BOLD);
  fill('#BF360C');
  text("F = " + v + "' \u00B7 F|" + v + "=0  +  " + v + " \u00B7 F|" + v + "=1", canvasWidth / 2, y + 30);
  textStyle(NORMAL);
}

// ── Cofactor cards (side by side) ──

function drawCofactorCards() {
  let y = 324;
  let bandW = canvasWidth - 2 * MX;
  let cardW = (bandW - 16) / 2;
  let cardH = 130;
  let func = functions[currentFunc];
  let v = func.vars[expansionVar];

  let f0 = getCofactor(func, expansionVar, 0);
  let f1 = getCofactor(func, expansionVar, 1);

  // ── Negative cofactor (left, green = x=0) ──
  let leftX = MX;
  drawingContext.shadowColor = 'rgba(129, 199, 132, 0.2)';
  drawingContext.shadowBlur = 6;
  drawingContext.shadowOffsetY = 2;

  fill(COF_POS_BG);
  stroke(COF_POS_BORDER);
  strokeWeight(1.5);
  rect(leftX, y, cardW, cardH, 12);

  drawingContext.shadowBlur = 0;
  drawingContext.shadowOffsetY = 0;

  fill(COF_POS_TEXT);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(12);
  textStyle(BOLD);
  text('Cofactor F|' + v + '=0', leftX + cardW / 2, y + 12);
  textStyle(NORMAL);

  fill('#555');
  textSize(11);
  text('Set ' + v + ' = 0 in F:', leftX + cardW / 2, y + 36);

  fill(COF_POS_DARK);
  textSize(17);
  textStyle(BOLD);
  text('F|' + v + "=0 = " + f0.expr, leftX + cardW / 2, y + 60);
  textStyle(NORMAL);

  fill('#666');
  textSize(10);
  text('Values: [' + f0.values.join(', ') + ']', leftX + cardW / 2, y + 90);

  // Remaining vars label
  let remVars0 = func.vars.filter((_, idx) => idx !== expansionVar);
  fill('#888');
  textSize(9);
  text('Variables: ' + remVars0.join(', '), leftX + cardW / 2, y + 110);

  // ── Positive cofactor (right, red = x=1) ──
  let rightX = MX + cardW + 16;
  drawingContext.shadowColor = 'rgba(229, 115, 115, 0.2)';
  drawingContext.shadowBlur = 6;
  drawingContext.shadowOffsetY = 2;

  fill(COF_NEG_BG);
  stroke(COF_NEG_BORDER);
  strokeWeight(1.5);
  rect(rightX, y, cardW, cardH, 12);

  drawingContext.shadowBlur = 0;
  drawingContext.shadowOffsetY = 0;

  fill(COF_NEG_TEXT);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(12);
  textStyle(BOLD);
  text('Cofactor F|' + v + '=1', rightX + cardW / 2, y + 12);
  textStyle(NORMAL);

  fill('#555');
  textSize(11);
  text('Set ' + v + ' = 1 in F:', rightX + cardW / 2, y + 36);

  fill(COF_NEG_DARK);
  textSize(17);
  textStyle(BOLD);
  text('F|' + v + "=1 = " + f1.expr, rightX + cardW / 2, y + 60);
  textStyle(NORMAL);

  fill('#666');
  textSize(10);
  text('Values: [' + f1.values.join(', ') + ']', rightX + cardW / 2, y + 90);

  let remVars1 = func.vars.filter((_, idx) => idx !== expansionVar);
  fill('#888');
  textSize(9);
  text('Variables: ' + remVars1.join(', '), rightX + cardW / 2, y + 110);

  // Down arrow
  fill(PURPLE);
  noStroke();
  let arrowY = y + cardH + 8;
  triangle(canvasWidth / 2, arrowY + 16, canvasWidth / 2 - 12, arrowY, canvasWidth / 2 + 12, arrowY);
}

// ── Expanded result box ──

function drawResultBox() {
  let y = 486;
  let bandW = canvasWidth - 2 * MX;
  let func = functions[currentFunc];
  let v = func.vars[expansionVar];

  let f0 = getCofactor(func, expansionVar, 0);
  let f1 = getCofactor(func, expansionVar, 1);

  drawingContext.shadowColor = 'rgba(106, 91, 255, 0.12)';
  drawingContext.shadowBlur = 8;
  drawingContext.shadowOffsetY = 2;

  fill(RESULT_BG);
  stroke(RESULT_BORDER);
  strokeWeight(1.5);
  rect(MX, y, bandW, 90, 12);

  drawingContext.shadowBlur = 0;
  drawingContext.shadowOffsetY = 0;

  fill(PURPLE);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(12);
  textStyle(BOLD);
  text('Expanded Form', canvasWidth / 2, y + 10);
  textStyle(NORMAL);

  // Main expansion
  textSize(15);
  textStyle(BOLD);
  fill(PURPLE_DARK);
  text("F = " + v + "' \u00B7 (" + f0.expr + ")  +  " + v + " \u00B7 (" + f1.expr + ")", canvasWidth / 2, y + 34);
  textStyle(NORMAL);

  // MUX notation
  fill('#555');
  textSize(12);
  text('MUX:  F = ' + v + ' ? (' + f1.expr + ') : (' + f0.expr + ')', canvasWidth / 2, y + 64);
}

// ── Applications section ──

function drawApplications() {
  let y = 592;
  let bandW = canvasWidth - 2 * MX;

  fill(APP_BG);
  stroke(PURPLE_BORDER);
  strokeWeight(1.5);
  rect(MX, y, bandW, 110, 12);

  fill(PURPLE);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(12);
  textStyle(BOLD);
  text('Applications', canvasWidth / 2, y + 10);
  textStyle(NORMAL);

  let items = [
    { icon: '\u25B6', label: 'Multiplexer Implementation', desc: 'cofactors become MUX data inputs' },
    { icon: '\u25B6', label: 'BDD Construction', desc: 'recursive decomposition builds decision diagrams' },
    { icon: '\u25B6', label: 'FPGA Mapping', desc: 'function decomposition for lookup tables' },
    { icon: '\u25B6', label: 'Divide & Conquer', desc: 'recursive algorithm basis for synthesis' }
  ];

  let itemY = y + 32;
  for (let item of items) {
    fill(PURPLE);
    textAlign(LEFT, TOP);
    textSize(10);
    text(item.icon, MX + 16, itemY);

    fill('#333');
    textSize(11);
    textStyle(BOLD);
    text(item.label, MX + 30, itemY);
    textStyle(NORMAL);

    fill('#666');
    textSize(10);
    let labelW = textWidth(item.label);
    text(' \u2014 ' + item.desc, MX + 30 + labelW + 2, itemY + 1);

    itemY += 20;
  }
}

// ── Cofactor computation ──

function getCofactor(func, varIdx, value) {
  let tt = func.truthTable;
  let numVars = func.vars.length;

  let cofactorValues = [];
  for (let i = 0; i < Math.pow(2, numVars); i++) {
    let bit = (i >> (numVars - 1 - varIdx)) & 1;
    if (bit === value) {
      cofactorValues.push(tt[i]);
    }
  }

  let remainingVars = func.vars.filter((v, idx) => idx !== varIdx);
  let expr = getCofactorExpression(cofactorValues, remainingVars, func.expr, func.vars[varIdx], value);

  return { values: cofactorValues, expr: expr };
}

function getCofactorExpression(values, vars, originalExpr, expandVar, expandValue) {
  if (values.every(v => v === 0)) return '0';
  if (values.every(v => v === 1)) return '1';

  if (vars.length === 2) {
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

  if (vars.length === 1) {
    if (arraysEqual(values, [0, 1])) return vars[0];
    if (arraysEqual(values, [1, 0])) return vars[0] + "'";
  }

  return originalExpr.replace(new RegExp(expandVar + "'", 'g'), expandValue === 0 ? '1' : '0')
                     .replace(new RegExp(expandVar, 'g'), expandValue.toString());
}

function arraysEqual(a, b) {
  return a.length === b.length && a.every((v, i) => v === b[i]);
}

// ── Interaction ──

function mousePressed() {
  let bandW = canvasWidth - 2 * MX;

  // Check function selector (y=68)
  let fy = 68 + 9;
  let btnStartX = MX + 80;
  let btnW = (bandW - 100) / 4 - 6;
  let btnH = 28;

  for (let i = 0; i < functions.length; i++) {
    let bx = btnStartX + i * (btnW + 6);
    if (mouseX >= bx && mouseX <= bx + btnW && mouseY >= fy && mouseY <= fy + btnH) {
      currentFunc = i;
      if (expansionVar >= functions[currentFunc].vars.length) {
        expansionVar = 0;
      }
      return;
    }
  }

  // Check variable selector (y=124)
  let vy = 124 + 9;
  let vBtnStartX = MX + 90;
  let vBtnW = 40;
  let vGap = 8;
  let func = functions[currentFunc];

  for (let i = 0; i < func.vars.length; i++) {
    let bx = vBtnStartX + i * (vBtnW + vGap);
    if (mouseX >= bx && mouseX <= bx + vBtnW && mouseY >= vy && mouseY <= vy + btnH) {
      expansionVar = i;
      return;
    }
  }
}

// ── Canvas sizing ──

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
