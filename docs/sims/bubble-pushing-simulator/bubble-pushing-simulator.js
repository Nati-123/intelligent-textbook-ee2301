// Bubble Pushing Simulator MicroSim
// Interactive step-by-step demonstration of bubble pushing technique
// Bloom Level: Analyze (L4)
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 460;
let controlHeight = 65;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let currentStep = 0;
let currentExample = 0;

const stepColors = ['#2196F3', '#FF9800', '#9C27B0', '#4CAF50'];

const examples = [
  {
    name: 'AND-OR \u2192 All NAND',
    inputs: ['A', 'B', 'C', 'D'],
    steps: [
      {
        title: 'Step 1: Original AND-OR Circuit',
        desc: 'Standard SOP implementation: F = AB + CD',
        expr: 'F = AB + CD',
        g1: { type: 'AND', col: '#2196F3' },
        g2: { type: 'AND', col: '#2196F3' },
        g3: { type: 'OR',  col: '#4CAF50', bubIn: false },
        wireBubbles: false,
        cancelBubbles: false,
        ruleIdx: -1,
        annotation: ''
      },
      {
        title: 'Step 2: Insert Bubble Pairs on Wires',
        desc: 'Add two bubbles per wire (double inversion = no change)',
        expr: 'F = AB + CD   (unchanged)',
        g1: { type: 'AND', col: '#2196F3' },
        g2: { type: 'AND', col: '#2196F3' },
        g3: { type: 'OR',  col: '#4CAF50', bubIn: false },
        wireBubbles: true,
        cancelBubbles: false,
        ruleIdx: 2,
        annotation: 'Each wire gets a\nbubble pair (cancel)'
      },
      {
        title: 'Step 3: Absorb Bubbles into Gates',
        desc: 'Left bubble \u2192 AND output = NAND \u00B7 Right bubble \u2192 OR input = NAND',
        expr: 'AND+bubble = NAND \u00B7 OR+input bubbles = NAND',
        g1: { type: 'NAND', col: '#9C27B0' },
        g2: { type: 'NAND', col: '#9C27B0' },
        g3: { type: 'NAND', col: '#9C27B0', bubIn: false },
        wireBubbles: false,
        cancelBubbles: true,
        ruleIdx: 0,
        annotation: 'Bubbles absorbed\ninto gates!'
      },
      {
        title: 'Step 4: All-NAND Circuit Complete!',
        desc: 'Every gate is now NAND \u2014 conversion successful',
        expr: 'F = (A NAND B) NAND (C NAND D)',
        g1: { type: 'NAND', col: '#9C27B0' },
        g2: { type: 'NAND', col: '#9C27B0' },
        g3: { type: 'NAND', col: '#9C27B0', bubIn: false },
        wireBubbles: false,
        cancelBubbles: false,
        ruleIdx: -1,
        annotation: ''
      }
    ]
  },
  {
    name: 'OR-AND \u2192 All NOR',
    inputs: ['A', 'B', 'C', 'D'],
    steps: [
      {
        title: 'Step 1: Original OR-AND Circuit',
        desc: 'Standard POS implementation: F = (A+B)(C+D)',
        expr: 'F = (A+B)(C+D)',
        g1: { type: 'OR',  col: '#4CAF50' },
        g2: { type: 'OR',  col: '#4CAF50' },
        g3: { type: 'AND', col: '#2196F3', bubIn: false },
        wireBubbles: false,
        cancelBubbles: false,
        ruleIdx: -1,
        annotation: ''
      },
      {
        title: 'Step 2: Insert Bubble Pairs on Wires',
        desc: 'Add two bubbles per wire (double inversion = no change)',
        expr: 'F = (A+B)(C+D)   (unchanged)',
        g1: { type: 'OR',  col: '#4CAF50' },
        g2: { type: 'OR',  col: '#4CAF50' },
        g3: { type: 'AND', col: '#2196F3', bubIn: false },
        wireBubbles: true,
        cancelBubbles: false,
        ruleIdx: 2,
        annotation: 'Each wire gets a\nbubble pair (cancel)'
      },
      {
        title: 'Step 3: Absorb Bubbles into Gates',
        desc: 'Left bubble \u2192 OR output = NOR \u00B7 Right bubble \u2192 AND input = NOR',
        expr: 'OR+bubble = NOR \u00B7 AND+input bubbles = NOR',
        g1: { type: 'NOR', col: '#FF9800' },
        g2: { type: 'NOR', col: '#FF9800' },
        g3: { type: 'NOR', col: '#FF9800', bubIn: false },
        wireBubbles: false,
        cancelBubbles: true,
        ruleIdx: 0,
        annotation: 'Bubbles absorbed\ninto gates!'
      },
      {
        title: 'Step 4: All-NOR Circuit Complete!',
        desc: 'Every gate is now NOR \u2014 conversion successful',
        expr: 'F = (A NOR B) NOR (C NOR D)',
        g1: { type: 'NOR', col: '#FF9800' },
        g2: { type: 'NOR', col: '#FF9800' },
        g3: { type: 'NOR', col: '#FF9800', bubIn: false },
        wireBubbles: false,
        cancelBubbles: false,
        ruleIdx: -1,
        annotation: ''
      }
    ]
  }
];

const rules = [
  '1. Move bubble from output \u2192 all inputs, change gate (AND\u2194OR)',
  '2. Move bubbles from all inputs \u2192 output, change gate (AND\u2194OR)',
  '3. Adjacent bubbles on a wire cancel (double negation)'
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  describe('Interactive bubble pushing simulator with step-by-step gate conversion', LABEL);
}

function draw() {
  updateCanvasSize();

  let ex = examples[currentExample];
  let step = ex.steps[currentStep];

  // Drawing area
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill('#212121');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(15);
  textStyle(BOLD);
  text('Bubble Pushing Technique', canvasWidth / 2, 8);
  textStyle(NORMAL);

  // Example name
  fill('#1565C0');
  textSize(13);
  text(ex.name, canvasWidth / 2, 28);

  drawStepBar();
  drawStepInfo(step);
  drawCircuit(step, ex);
  drawExpressionBox(step);
  drawRuleCard(step);
  drawControls();
}

// ── Step progress bar ──
function drawStepBar() {
  let barY = 50;
  let barW = canvasWidth - 120;
  let startX = 60;

  for (let i = 0; i < 4; i++) {
    let x = startX + i * (barW / 3);
    let dotR = 12;

    // Connecting line
    if (i < 3) {
      stroke(i < currentStep ? '#4CAF50' : '#ddd');
      strokeWeight(2);
      line(x + dotR, barY, x + barW / 3 - dotR, barY);
    }

    // Dot
    let c = i <= currentStep ? stepColors[i] : '#e0e0e0';
    fill(c);
    stroke(i <= currentStep ? c : '#ccc');
    strokeWeight(1.5);
    ellipse(x, barY, dotR * 2);

    // Number
    fill(i <= currentStep ? 'white' : '#999');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(10);
    textStyle(BOLD);
    text(i + 1, x, barY);
    textStyle(NORMAL);
  }
}

// ── Step title + description ──
function drawStepInfo(step) {
  fill(stepColors[currentStep]);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(13);
  textStyle(BOLD);
  text(step.title, canvasWidth / 2, 70);
  textStyle(NORMAL);

  fill('#555');
  textSize(11);
  text(step.desc, canvasWidth / 2, 88);
}

// ── Circuit drawing ──
function drawCircuit(step, ex) {
  let cx = canvasWidth / 2;
  let cy = 190;
  let sc = Math.min(1, canvasWidth / 480);
  let gW = 56 * sc;
  let gH = 34;

  // Gate positions
  let g1pos = { x: cx - 95 * sc, y: cy - 50 };
  let g2pos = { x: cx - 95 * sc, y: cy + 50 };
  let g3pos = { x: cx + 55 * sc,  y: cy };

  // Input positions
  let inpX = cx - 195 * sc;
  let inp = [
    { label: ex.inputs[0], y: cy - 65 },
    { label: ex.inputs[1], y: cy - 35 },
    { label: ex.inputs[2], y: cy + 35 },
    { label: ex.inputs[3], y: cy + 65 }
  ];

  // ── Input labels and wires ──
  inp.forEach(function(input, i) {
    // Label circle
    fill('#f5f0ff');
    stroke('#9C88FF');
    strokeWeight(1.5);
    ellipse(inpX, input.y, 24);

    fill('#5A3EED');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(12);
    textStyle(BOLD);
    text(input.label, inpX, input.y);
    textStyle(NORMAL);

    // Wire to gate
    let gate = i < 2 ? g1pos : g2pos;
    let yOff = (i % 2 === 0) ? -9 : 9;
    stroke('#888');
    strokeWeight(2);
    line(inpX + 13, input.y, gate.x, gate.y + yOff);
  });

  // ── Connecting wires (gate1/gate2 → gate3) ──
  // Wire 1: gate1 output → gate3 upper input
  let w1x1 = g1pos.x + gW;
  let w1y1 = g1pos.y;
  let w1x2 = g3pos.x;
  let w1y2 = g3pos.y - 14;

  // Wire 2: gate2 output → gate3 lower input
  let w2x1 = g2pos.x + gW;
  let w2y1 = g2pos.y;
  let w2x2 = g3pos.x;
  let w2y2 = g3pos.y + 14;

  stroke('#888');
  strokeWeight(2);
  line(w1x1, w1y1, w1x2, w1y2);
  line(w2x1, w2y1, w2x2, w2y2);

  // ── Output wire ──
  let outEndX = g3pos.x + gW + 50 * sc;
  line(g3pos.x + gW, g3pos.y, outEndX, g3pos.y);

  // Output label
  fill('#212121');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);
  textStyle(BOLD);
  text('F', outEndX + 14, g3pos.y);
  textStyle(NORMAL);

  // ── Level labels ──
  fill('#aaa');
  noStroke();
  textAlign(CENTER, BOTTOM);
  textSize(9);
  text('Level 1', g1pos.x + gW / 2, g1pos.y - gH / 2 - 18);
  text('Level 2', g3pos.x + gW / 2, g3pos.y - gH / 2 - 18);

  // ── Draw gates ──
  drawGateShape(g1pos.x, g1pos.y, gW, gH, step.g1.type, step.g1.col);
  drawGateShape(g2pos.x, g2pos.y, gW, gH, step.g2.type, step.g2.col);
  drawGateShape(g3pos.x, g3pos.y, gW, gH, step.g3.type, step.g3.col);

  // ── Draw wire bubbles (step 2) ──
  if (step.wireBubbles) {
    // Midpoints of each wire
    let mid1x = (w1x1 + w1x2) / 2;
    let mid1y = (w1y1 + w1y2) / 2;
    let mid2x = (w2x1 + w2x2) / 2;
    let mid2y = (w2y1 + w2y2) / 2;

    // Wire 1: two bubbles with a gap
    let off = 14;
    drawBubblePulse(mid1x - off, mid1y - 3, '#F44336');
    drawBubblePulse(mid1x + off, mid1y + 3, '#F44336');

    // Wire 2: two bubbles with a gap
    drawBubblePulse(mid2x - off, mid2y + 3, '#F44336');
    drawBubblePulse(mid2x + off, mid2y - 3, '#F44336');

    // "= " label between each pair
    fill('#C62828');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(8);
    textStyle(BOLD);
    text('\u00D7 2', mid1x, mid1y - 16);
    text('\u00D7 2', mid2x, mid2y + 16);
    textStyle(NORMAL);
  }

  // ── Draw cancel animation (step 3) ──
  if (step.cancelBubbles) {
    let mid1x = (w1x1 + w1x2) / 2;
    let mid1y = (w1y1 + w1y2) / 2;
    let mid2x = (w2x1 + w2x2) / 2;
    let mid2y = (w2y1 + w2y2) / 2;

    // Fading crossed-out bubbles
    drawCancelledBubble(mid1x - 14, mid1y - 3);
    drawCancelledBubble(mid1x + 14, mid1y + 3);
    drawCancelledBubble(mid2x - 14, mid2y + 3);
    drawCancelledBubble(mid2x + 14, mid2y - 3);

    // "absorbed" arrows
    let t = (sin(frameCount * 0.06) + 1) / 2;
    let arrowAlpha = 100 + t * 155;

    // Arrow from left bubble to gate1
    stroke(step.g1.col + 'CC');
    strokeWeight(2);
    drawArrowLine(mid1x - 22, mid1y - 5, g1pos.x + gW + 6, g1pos.y);
    drawArrowLine(mid2x - 22, mid2y + 5, g2pos.x + gW + 6, g2pos.y);

    // Arrow from right bubble to gate3
    drawArrowLine(mid1x + 22, mid1y + 5, g3pos.x - 6, g3pos.y - 14);
    drawArrowLine(mid2x + 22, mid2y - 5, g3pos.x - 6, g3pos.y + 14);
  }

  // ── Annotation box ──
  if (step.annotation) {
    let annX = cx;
    let annY = cy + 95;
    let lines = step.annotation.split('\n');
    let boxW = 160;
    let boxH = lines.length * 15 + 12;

    fill('#FFF8E1');
    stroke('#FFB300');
    strokeWeight(1.5);
    rect(annX - boxW / 2, annY - boxH / 2, boxW, boxH, 5);

    fill('#E65100');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    textStyle(BOLD);
    for (let i = 0; i < lines.length; i++) {
      text(lines[i], annX, annY - (lines.length - 1) * 7.5 + i * 15);
    }
    textStyle(NORMAL);
  }
}

function drawGateShape(x, y, w, h, type, col) {
  let isAnd = (type === 'AND' || type === 'NAND');

  // Gate body
  fill(col);
  stroke(col);
  strokeWeight(2);

  if (isAnd) {
    beginShape();
    vertex(x, y - h / 2);
    vertex(x + w * 0.5, y - h / 2);
    bezierVertex(x + w, y - h / 2, x + w, y + h / 2, x + w * 0.5, y + h / 2);
    vertex(x, y + h / 2);
    endShape(CLOSE);
  } else {
    beginShape();
    vertex(x, y - h / 2);
    bezierVertex(x + w * 0.5, y - h / 2, x + w * 0.8, y - h / 4, x + w, y);
    bezierVertex(x + w * 0.8, y + h / 4, x + w * 0.5, y + h / 2, x, y + h / 2);
    bezierVertex(x + w * 0.15, y, x + w * 0.15, y, x, y - h / 2);
    endShape(CLOSE);
  }

  // Gate label
  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(Math.max(8, type.length > 3 ? 9 : 11));
  textStyle(BOLD);
  text(type, x + w * 0.42, y);
  textStyle(NORMAL);

  // Success glow on final step
  if (currentStep === 3) {
    noFill();
    stroke(col + '44');
    strokeWeight(3);
    if (isAnd) {
      beginShape();
      vertex(x - 3, y - h / 2 - 3);
      vertex(x + w * 0.5, y - h / 2 - 3);
      bezierVertex(x + w + 3, y - h / 2 - 3, x + w + 3, y + h / 2 + 3, x + w * 0.5, y + h / 2 + 3);
      vertex(x - 3, y + h / 2 + 3);
      endShape(CLOSE);
    } else {
      beginShape();
      vertex(x - 3, y - h / 2 - 3);
      bezierVertex(x + w * 0.5, y - h / 2 - 3, x + w * 0.8, y - h / 4, x + w + 3, y);
      bezierVertex(x + w * 0.8, y + h / 4, x + w * 0.5, y + h / 2 + 3, x - 3, y + h / 2 + 3);
      bezierVertex(x + w * 0.12, y, x + w * 0.12, y, x - 3, y - h / 2 - 3);
      endShape(CLOSE);
    }
  }
}

function drawBubblePulse(x, y, col) {
  let t = (sin(frameCount * 0.08) + 1) / 2;
  let r = 9 + t * 3;

  // Glow ring
  noFill();
  stroke(255, 68, 68, 50 + t * 40);
  strokeWeight(3);
  ellipse(x, y, r + 6);

  // Bubble
  fill(col);
  stroke('white');
  strokeWeight(1.5);
  ellipse(x, y, r);

  // Inner dot
  fill('white');
  noStroke();
  ellipse(x - 1, y - 1, 3);
}

function drawCancelledBubble(x, y) {
  let t = (sin(frameCount * 0.06) + 1) / 2;
  let alpha = 80 + t * 40;

  fill(200, 200, 200, alpha);
  stroke(150, 150, 150, alpha + 40);
  strokeWeight(1);
  ellipse(x, y, 9);

  // X mark
  stroke(244, 67, 54, alpha + 80);
  strokeWeight(2);
  line(x - 4, y - 4, x + 4, y + 4);
  line(x + 4, y - 4, x - 4, y + 4);
}

function drawArrowLine(x1, y1, x2, y2) {
  let t = (sin(frameCount * 0.06) + 1) / 2;
  // Shorten line
  let dx = x2 - x1;
  let dy = y2 - y1;
  let len = Math.sqrt(dx * dx + dy * dy);
  if (len === 0) return;
  let nx = dx / len;
  let ny = dy / len;

  let sx = x1 + nx * 4;
  let sy = y1 + ny * 4;
  let ex = x2 - nx * 4;
  let ey = y2 - ny * 4;

  // Dashed arrow feel
  strokeWeight(1.5);
  line(sx, sy, ex, ey);

  // Arrowhead
  let aSize = 5;
  line(ex, ey, ex - nx * aSize + ny * aSize, ey - ny * aSize - nx * aSize);
  line(ex, ey, ex - nx * aSize - ny * aSize, ey - ny * aSize + nx * aSize);
}

// ── Expression box ──
function drawExpressionBox(step) {
  let y = 320;
  let boxW = canvasWidth - 40;
  let boxH = 34;

  fill('#f5f0ff');
  stroke('#d1c4e9');
  strokeWeight(1);
  rect(20, y, boxW, boxH, 6);

  fill('#5A3EED');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(10);
  textStyle(BOLD);
  text('Expression:', 30, y + boxH / 2);
  textStyle(NORMAL);

  fill('#333');
  textSize(11);
  textAlign(CENTER, CENTER);
  text(step.expr, 20 + boxW / 2 + 20, y + boxH / 2);
}

// ── Rule reference card ──
function drawRuleCard(step) {
  let y = 365;
  let boxW = canvasWidth - 40;
  let boxH = 78;

  fill('#E8F5E9');
  stroke('#A5D6A7');
  strokeWeight(1);
  rect(20, y, boxW, boxH, 6);

  fill('#2E7D32');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(10);
  textStyle(BOLD);
  text('Bubble Pushing Rules:', 30, y + 7);
  textStyle(NORMAL);

  fill('#333');
  textSize(9);
  let ruleY = y + 24;
  for (let i = 0; i < rules.length; i++) {
    // Truncate if too wide
    let ruleText = rules[i];
    text(ruleText, 30, ruleY + i * 16);
  }

  // Highlight active rule
  if (step.ruleIdx >= 0) {
    let idx = step.ruleIdx;
    noFill();
    stroke('#FF9800');
    strokeWeight(2);
    rect(26, ruleY + idx * 16 - 4, boxW - 16, 18, 3);

    // Arrow indicator
    fill('#FF9800');
    noStroke();
    triangle(22, ruleY + idx * 16 + 5, 28, ruleY + idx * 16 + 1, 28, ruleY + idx * 16 + 9);
  }
}

// ── Controls ──
function drawControls() {
  let btnY = drawHeight + 12;
  let btnH = 26;

  // Previous
  let prevOn = currentStep > 0;
  fill(prevOn ? '#2196F3' : '#e0e0e0');
  stroke(prevOn ? '#1976D2' : '#ccc');
  strokeWeight(1);
  rect(15, btnY, 78, btnH, 4);
  fill(prevOn ? 'white' : '#999');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  text('\u2190 Previous', 54, btnY + btnH / 2);

  // Next
  let nextOn = currentStep < 3;
  fill(nextOn ? '#4CAF50' : '#e0e0e0');
  stroke(nextOn ? '#388E3C' : '#ccc');
  strokeWeight(1);
  rect(103, btnY, 62, btnH, 4);
  fill(nextOn ? 'white' : '#999');
  noStroke();
  text('Next \u2192', 134, btnY + btnH / 2);

  // Reset
  fill('#F44336');
  stroke('#D32F2F');
  strokeWeight(1);
  rect(175, btnY, 50, btnH, 4);
  fill('white');
  noStroke();
  text('Reset', 200, btnY + btnH / 2);

  // Example toggle
  fill('#7B1FA2');
  stroke('#6A1B9A');
  strokeWeight(1);
  let exW = canvasWidth - 245;
  rect(235, btnY, exW, btnH, 4);
  fill('white');
  noStroke();
  textSize(10);
  text(examples[currentExample].name, 235 + exW / 2, btnY + btnH / 2);

  // Hint text
  fill('#999');
  textSize(8);
  textAlign(CENTER, CENTER);
  text('Step through to see how bubbles convert the circuit', canvasWidth / 2, drawHeight + 53);
}

// ── Mouse interaction ──
function mousePressed() {
  let btnY = drawHeight + 12;
  let btnH = 26;

  // Previous
  if (mouseX >= 15 && mouseX <= 93 && mouseY >= btnY && mouseY <= btnY + btnH) {
    if (currentStep > 0) currentStep--;
    return;
  }
  // Next
  if (mouseX >= 103 && mouseX <= 165 && mouseY >= btnY && mouseY <= btnY + btnH) {
    if (currentStep < 3) currentStep++;
    return;
  }
  // Reset
  if (mouseX >= 175 && mouseX <= 225 && mouseY >= btnY && mouseY <= btnY + btnH) {
    currentStep = 0;
    return;
  }
  // Example toggle
  if (mouseX >= 235 && mouseX <= canvasWidth - 10 && mouseY >= btnY && mouseY <= btnY + btnH) {
    currentExample = (currentExample + 1) % examples.length;
    currentStep = 0;
    return;
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
