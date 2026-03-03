// Critical Path Delay Explorer MicroSim
// Visualize propagation delay through a multi-level gate circuit
// Bloom Level: Analyze (L4) - Identify and calculate critical path delays
// Unit 7: Multi-Level Gate Circuits

let containerWidth;
let canvasWidth = 400;
let drawHeight = 500;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;

// Gate delay parameters (nanoseconds)
let notDelay = 1;
let andBCDelay = 2;
let orDelay = 2;
let andCDDelay = 2;
let andFinalDelay = 2;

// Gate definitions with layout positions (fractions of canvas)
// Circuit topology:
//   Level 1: G1=NOT(A),  G2=AND(B,C)
//   Level 2: G3=OR(G1,G2),  G4=AND(C,D)
//   Level 3: G5=AND(G3,G4) -> F
let gates = [];
let wires = [];
let paths = [];

// +/- button hit areas
let paramBtns = [];

// Parameter definitions for the 5 gates
let params = [
  { label: "NOT (G1)",      get: function() { return notDelay; },      set: function(v) { notDelay = v; },      min: 1, max: 8, step: 1 },
  { label: "AND (G2)",      get: function() { return andBCDelay; },    set: function(v) { andBCDelay = v; },    min: 1, max: 8, step: 1 },
  { label: "OR (G3)",       get: function() { return orDelay; },       set: function(v) { orDelay = v; },       min: 1, max: 8, step: 1 },
  { label: "AND (G4)",      get: function() { return andCDDelay; },    set: function(v) { andCDDelay = v; },    min: 1, max: 8, step: 1 },
  { label: "AND (G5)",      get: function() { return andFinalDelay; }, set: function(v) { andFinalDelay = v; }, min: 1, max: 8, step: 1 }
];

function setup() {
  updateCanvasSize();
  var canvas = createCanvas(containerWidth, canvasHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  describe('Critical path delay explorer showing a 3-level gate circuit with adjustable gate delays and highlighted critical path', LABEL);
}

function draw() {
  updateCanvasSize();

  // Drawing area background
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area background
  fill(245);
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill('#5A3EED');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(18);
  textStyle(BOLD);
  text('Critical Path Delay Explorer', canvasWidth / 2, 10);
  textStyle(NORMAL);

  // Subtitle
  fill(100);
  textSize(12);
  text('F = (A\' + B\u00B7C) \u00B7 (C\u00B7D)', canvasWidth / 2, 33);

  // Compute paths and find critical path
  computePaths();

  // Build gate layout
  buildGateLayout();

  // Draw wires first (behind gates)
  drawWires();

  // Draw gates
  drawGates();

  // Draw input/output labels
  drawIOLabels();

  // Draw path summary
  drawPathSummary();

  // Draw control area with +/- buttons
  drawControls();

  // Cursor hint
  var hovering = false;
  for (var i = 0; i < paramBtns.length; i++) {
    var b = paramBtns[i];
    if (b && b.minus && isInside(mouseX, mouseY, b.minus)) hovering = true;
    if (b && b.plus && isInside(mouseX, mouseY, b.plus)) hovering = true;
  }
  cursor(hovering ? HAND : ARROW);
}

function computePaths() {
  // All source-to-output paths through the circuit:
  // Path 1: A -> G1(NOT) -> G3(OR) -> G5(AND) -> F
  // Path 2: B -> G2(AND) -> G3(OR) -> G5(AND) -> F
  // Path 3: C -> G2(AND) -> G3(OR) -> G5(AND) -> F
  // Path 4: C -> G4(AND) -> G5(AND) -> F
  // Path 5: D -> G4(AND) -> G5(AND) -> F

  paths = [
    {
      name: 'A \u2192 G1 \u2192 G3 \u2192 G5 \u2192 F',
      gates: ['G1(NOT)', 'G3(OR)', 'G5(AND)'],
      delays: [notDelay, orDelay, andFinalDelay],
      total: notDelay + orDelay + andFinalDelay,
      wireKeys: ['A-G1', 'G1-G3', 'G3-G5', 'G5-F']
    },
    {
      name: 'B \u2192 G2 \u2192 G3 \u2192 G5 \u2192 F',
      gates: ['G2(AND)', 'G3(OR)', 'G5(AND)'],
      delays: [andBCDelay, orDelay, andFinalDelay],
      total: andBCDelay + orDelay + andFinalDelay,
      wireKeys: ['B-G2', 'G2-G3', 'G3-G5', 'G5-F']
    },
    {
      name: 'C \u2192 G2 \u2192 G3 \u2192 G5 \u2192 F',
      gates: ['G2(AND)', 'G3(OR)', 'G5(AND)'],
      delays: [andBCDelay, orDelay, andFinalDelay],
      total: andBCDelay + orDelay + andFinalDelay,
      wireKeys: ['C-G2', 'G2-G3', 'G3-G5', 'G5-F']
    },
    {
      name: 'C \u2192 G4 \u2192 G5 \u2192 F',
      gates: ['G4(AND)', 'G5(AND)'],
      delays: [andCDDelay, andFinalDelay],
      total: andCDDelay + andFinalDelay,
      wireKeys: ['C-G4', 'G4-G5', 'G5-F']
    },
    {
      name: 'D \u2192 G4 \u2192 G5 \u2192 F',
      gates: ['G4(AND)', 'G5(AND)'],
      delays: [andCDDelay, andFinalDelay],
      total: andCDDelay + andFinalDelay,
      wireKeys: ['D-G4', 'G4-G5', 'G5-F']
    }
  ];
}

function buildGateLayout() {
  // Gate positions (center x, center y) in pixels
  var gateW = 60;
  var gateH = 36;

  // Horizontal positions for 3 levels
  var level1X = canvasWidth * 0.22;
  var level2X = canvasWidth * 0.46;
  var level3X = canvasWidth * 0.70;

  // Vertical positions
  var topY = 110;
  var midY = 165;
  var botY = 220;

  gates = [
    { id: 'G1', type: 'NOT',  delay: notDelay,      x: level1X, y: topY,  w: gateW, h: gateH },
    { id: 'G2', type: 'AND',  delay: andBCDelay,     x: level1X, y: midY,  w: gateW, h: gateH },
    { id: 'G3', type: 'OR',   delay: orDelay,        x: level2X, y: topY + 28, w: gateW, h: gateH },
    { id: 'G4', type: 'AND',  delay: andCDDelay,     x: level2X, y: botY + 10, w: gateW, h: gateH },
    { id: 'G5', type: 'AND',  delay: andFinalDelay,  x: level3X, y: midY + 20, w: gateW, h: gateH }
  ];

  // Input positions
  var inputX = canvasWidth * 0.06;
  var inputA = { x: inputX, y: topY };
  var inputB = { x: inputX, y: midY - 10 };
  var inputC = { x: inputX, y: midY + 10 };
  var inputD = { x: inputX, y: botY + 20 };

  // Output position
  var outputX = canvasWidth * 0.88;
  var outputY = midY + 20;

  // Determine critical path total
  var maxDelay = 0;
  for (var i = 0; i < paths.length; i++) {
    if (paths[i].total > maxDelay) maxDelay = paths[i].total;
  }

  // Build wire segments with keys for path highlighting
  // Each wire: { key, points: [{x,y}, ...], isCritical }
  wires = [];

  // Determine which wire keys belong to any critical path
  var criticalWireKeys = {};
  for (var i = 0; i < paths.length; i++) {
    if (paths[i].total === maxDelay) {
      for (var j = 0; j < paths[i].wireKeys.length; j++) {
        criticalWireKeys[paths[i].wireKeys[j]] = true;
      }
    }
  }

  // Helper to add a wire
  function addWire(key, pts) {
    wires.push({
      key: key,
      points: pts,
      isCritical: criticalWireKeys[key] === true
    });
  }

  // Input A -> G1
  addWire('A-G1', [
    { x: inputA.x + 18, y: inputA.y },
    { x: gates[0].x - gates[0].w / 2, y: gates[0].y }
  ]);

  // Input B -> G2 (top input)
  addWire('B-G2', [
    { x: inputB.x + 18, y: inputB.y },
    { x: gates[1].x - gates[1].w / 2 - 12, y: inputB.y },
    { x: gates[1].x - gates[1].w / 2 - 12, y: gates[1].y - 8 },
    { x: gates[1].x - gates[1].w / 2, y: gates[1].y - 8 }
  ]);

  // Input C -> G2 (bottom input)
  var cJunctionX = canvasWidth * 0.11;
  addWire('C-G2', [
    { x: inputC.x + 18, y: inputC.y },
    { x: cJunctionX, y: inputC.y },
    { x: cJunctionX, y: gates[1].y + 8 },
    { x: gates[1].x - gates[1].w / 2, y: gates[1].y + 8 }
  ]);

  // Input C -> G4 (top input) - branches from C line
  addWire('C-G4', [
    { x: cJunctionX, y: inputC.y },
    { x: cJunctionX, y: gates[3].y - 8 },
    { x: gates[3].x - gates[3].w / 2, y: gates[3].y - 8 }
  ]);

  // Input D -> G4 (bottom input)
  addWire('D-G4', [
    { x: inputD.x + 18, y: inputD.y },
    { x: gates[3].x - gates[3].w / 2 - 12, y: inputD.y },
    { x: gates[3].x - gates[3].w / 2 - 12, y: gates[3].y + 8 },
    { x: gates[3].x - gates[3].w / 2, y: gates[3].y + 8 }
  ]);

  // G1 -> G3 (top input)
  addWire('G1-G3', [
    { x: gates[0].x + gates[0].w / 2, y: gates[0].y },
    { x: gates[2].x - gates[2].w / 2 - 12, y: gates[0].y },
    { x: gates[2].x - gates[2].w / 2 - 12, y: gates[2].y - 8 },
    { x: gates[2].x - gates[2].w / 2, y: gates[2].y - 8 }
  ]);

  // G2 -> G3 (bottom input)
  addWire('G2-G3', [
    { x: gates[1].x + gates[1].w / 2, y: gates[1].y },
    { x: gates[2].x - gates[2].w / 2 - 12, y: gates[1].y },
    { x: gates[2].x - gates[2].w / 2 - 12, y: gates[2].y + 8 },
    { x: gates[2].x - gates[2].w / 2, y: gates[2].y + 8 }
  ]);

  // G3 -> G5 (top input)
  addWire('G3-G5', [
    { x: gates[2].x + gates[2].w / 2, y: gates[2].y },
    { x: gates[4].x - gates[4].w / 2 - 12, y: gates[2].y },
    { x: gates[4].x - gates[4].w / 2 - 12, y: gates[4].y - 8 },
    { x: gates[4].x - gates[4].w / 2, y: gates[4].y - 8 }
  ]);

  // G4 -> G5 (bottom input)
  addWire('G4-G5', [
    { x: gates[3].x + gates[3].w / 2, y: gates[3].y },
    { x: gates[4].x - gates[4].w / 2 - 12, y: gates[3].y },
    { x: gates[4].x - gates[4].w / 2 - 12, y: gates[4].y + 8 },
    { x: gates[4].x - gates[4].w / 2, y: gates[4].y + 8 }
  ]);

  // G5 -> F output
  addWire('G5-F', [
    { x: gates[4].x + gates[4].w / 2, y: gates[4].y },
    { x: outputX, y: gates[4].y }
  ]);
}

function drawWires() {
  for (var i = 0; i < wires.length; i++) {
    var w = wires[i];
    var pts = w.points;
    if (pts.length < 2) continue;

    if (w.isCritical) {
      stroke('#E53935');
      strokeWeight(3);
    } else {
      stroke('#4CAF50');
      strokeWeight(2);
    }
    noFill();

    for (var j = 0; j < pts.length - 1; j++) {
      line(pts[j].x, pts[j].y, pts[j + 1].x, pts[j + 1].y);
    }
  }

  // Draw junction dot where C branches
  var cJunctionX = canvasWidth * 0.11;
  var inputCY = 175; // midY + 10
  fill('#333');
  noStroke();
  ellipse(cJunctionX, inputCY, 6, 6);
}

function drawGates() {
  // Determine critical path max
  var maxDelay = 0;
  for (var i = 0; i < paths.length; i++) {
    if (paths[i].total > maxDelay) maxDelay = paths[i].total;
  }

  // Determine which gate IDs are on the critical path
  var criticalGateIds = {};
  for (var i = 0; i < paths.length; i++) {
    if (paths[i].total === maxDelay) {
      // Extract gate IDs from gate strings like "G1(NOT)"
      for (var j = 0; j < paths[i].gates.length; j++) {
        var gid = paths[i].gates[j].split('(')[0];
        criticalGateIds[gid] = true;
      }
    }
  }

  for (var i = 0; i < gates.length; i++) {
    var g = gates[i];
    var isCrit = criticalGateIds[g.id] === true;
    var gx = g.x - g.w / 2;
    var gy = g.y - g.h / 2;

    // Gate body
    if (isCrit) {
      fill('#FFEBEE');
      stroke('#E53935');
    } else {
      fill('#E8F5E9');
      stroke('#4CAF50');
    }
    strokeWeight(2);
    rect(gx, gy, g.w, g.h, 6);

    // Gate type label
    fill(isCrit ? '#C62828' : '#2E7D32');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(13);
    textStyle(BOLD);
    text(g.type, g.x, g.y - 3);
    textStyle(NORMAL);

    // Gate ID
    textSize(9);
    fill(isCrit ? '#E53935' : '#388E3C');
    text(g.id, g.x, g.y + 11);

    // Delay annotation below gate
    textSize(10);
    fill(isCrit ? '#E53935' : '#666');
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    text(g.delay + ' ns', g.x, gy + g.h + 3);
    textStyle(NORMAL);
  }
}

function drawIOLabels() {
  var inputX = canvasWidth * 0.06;
  var topY = 110;
  var midY = 165;
  var botY = 220;

  // Input labels
  fill('#333');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);
  textStyle(BOLD);

  text('A', inputX, topY);
  text('B', inputX, midY - 10);
  text('C', inputX, midY + 10);
  text('D', inputX, botY + 20);

  textStyle(NORMAL);

  // Output label
  var outputX = canvasWidth * 0.88;
  var outputY = midY + 20;
  textSize(14);
  textStyle(BOLD);
  fill('#5A3EED');
  text('F', outputX + 14, outputY);
  textStyle(NORMAL);

  // Output arrow
  stroke('#5A3EED');
  strokeWeight(2);
  var arrowX = outputX + 2;
  fill('#5A3EED');
  noStroke();
  triangle(arrowX + 8, outputY, arrowX, outputY - 5, arrowX, outputY + 5);
}

function drawPathSummary() {
  // Find critical delay
  var maxDelay = 0;
  for (var i = 0; i < paths.length; i++) {
    if (paths[i].total > maxDelay) maxDelay = paths[i].total;
  }

  // Summary box
  var boxX = 10;
  var boxY = 270;
  var boxW = canvasWidth - 20;
  var boxH = drawHeight - boxY - 10;

  fill(255);
  stroke(200);
  strokeWeight(1);
  rect(boxX, boxY, boxW, boxH, 8);

  // Title
  fill('#5A3EED');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(14);
  textStyle(BOLD);
  text('Path Delay Analysis', boxX + 12, boxY + 8);
  textStyle(NORMAL);

  // Critical path display
  textAlign(RIGHT, TOP);
  textSize(14);
  textStyle(BOLD);
  fill('#E53935');
  text('Critical Path Delay: ' + maxDelay + ' ns', boxX + boxW - 12, boxY + 8);
  textStyle(NORMAL);

  // Path list
  var lineY = boxY + 32;
  var lineH = 20;
  textSize(11);

  // De-duplicate paths with same total (B and C through G2 have same delay)
  for (var i = 0; i < paths.length; i++) {
    var p = paths[i];
    var isCrit = (p.total === maxDelay);

    // Path background highlight
    if (isCrit) {
      fill('#FFEBEE');
      noStroke();
      rect(boxX + 4, lineY - 2, boxW - 8, lineH, 3);
    }

    // Path name
    fill(isCrit ? '#E53935' : '#333');
    noStroke();
    textAlign(LEFT, TOP);
    textStyle(isCrit ? BOLD : NORMAL);
    text(p.name, boxX + 12, lineY);

    // Delay breakdown
    var delayStr = '';
    for (var j = 0; j < p.delays.length; j++) {
      if (j > 0) delayStr += ' + ';
      delayStr += p.delays[j];
    }
    delayStr += ' = ' + p.total + ' ns';

    textAlign(RIGHT, TOP);
    text(delayStr, boxX + boxW - 12, lineY);
    textStyle(NORMAL);

    // Critical marker
    if (isCrit) {
      fill('#E53935');
      textAlign(RIGHT, TOP);
      textSize(9);
      textStyle(BOLD);
      // Draw a small star/marker before the delay text
      textStyle(NORMAL);
      textSize(11);
    }

    lineY += lineH;
  }

  // Legend at bottom
  lineY += 8;
  textSize(10);
  textAlign(LEFT, TOP);

  // Critical legend
  fill('#FFEBEE');
  stroke('#E53935');
  strokeWeight(1);
  rect(boxX + 12, lineY, 14, 14, 2);
  fill('#E53935');
  noStroke();
  text('Critical Path (longest delay)', boxX + 32, lineY + 1);

  // Non-critical legend
  fill('#E8F5E9');
  stroke('#4CAF50');
  strokeWeight(1);
  rect(boxX + boxW / 2 + 12, lineY, 14, 14, 2);
  fill('#4CAF50');
  noStroke();
  text('Non-critical Path', boxX + boxW / 2 + 32, lineY + 1);
}

function drawControls() {
  var areaY = drawHeight + 6;
  var startX = 8;
  var colWidth = canvasWidth / 5;
  var btnSize = 22;
  var valW = 42;

  paramBtns = [];

  // Title for control area
  fill('#5A3EED');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(11);
  textStyle(BOLD);
  text('Adjust Gate Delays', canvasWidth / 2, areaY);
  textStyle(NORMAL);

  var rowY = areaY + 18;

  for (var i = 0; i < params.length; i++) {
    var p = params[i];
    var val = p.get();
    var cx = startX + i * colWidth + colWidth / 2;

    // Label
    fill(60);
    noStroke();
    textSize(9);
    textAlign(CENTER, TOP);
    text(p.label, cx, rowY);

    var btnY = rowY + 14;

    // Minus button
    var minusX = cx - valW / 2 - btnSize - 3;
    var minusBtn = { x: minusX, y: btnY, w: btnSize, h: btnSize };
    fill(val <= p.min ? '#ccc' : '#E53935');
    stroke(val <= p.min ? '#aaa' : '#C62828');
    strokeWeight(1.5);
    rect(minusX, btnY, btnSize, btnSize, 4);
    fill(255);
    noStroke();
    textSize(14);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text('-', minusX + btnSize / 2, btnY + btnSize / 2);
    textStyle(NORMAL);

    // Value display
    var valX = cx - valW / 2;
    fill(255);
    stroke('#5A3EED');
    strokeWeight(2);
    rect(valX, btnY, valW, btnSize, 4);
    fill('#5A3EED');
    noStroke();
    textSize(12);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text(val + 'ns', valX + valW / 2, btnY + btnSize / 2);
    textStyle(NORMAL);

    // Plus button
    var plusX = cx + valW / 2 + 3;
    var plusBtn = { x: plusX, y: btnY, w: btnSize, h: btnSize };
    fill(val >= p.max ? '#ccc' : '#4CAF50');
    stroke(val >= p.max ? '#aaa' : '#388E3C');
    strokeWeight(1.5);
    rect(plusX, btnY, btnSize, btnSize, 4);
    fill(255);
    noStroke();
    textSize(14);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text('+', plusX + btnSize / 2, btnY + btnSize / 2);
    textStyle(NORMAL);

    paramBtns.push({ minus: minusBtn, plus: plusBtn });
  }
}

function mousePressed() {
  // Check param +/- buttons
  for (var i = 0; i < paramBtns.length; i++) {
    var b = paramBtns[i];
    if (!b) continue;
    var val = params[i].get();
    var step = params[i].step;

    if (isInside(mouseX, mouseY, b.minus)) {
      var newVal = constrain(val - step, params[i].min, params[i].max);
      params[i].set(newVal);
      return;
    }
    if (isInside(mouseX, mouseY, b.plus)) {
      var newVal = constrain(val + step, params[i].min, params[i].max);
      params[i].set(newVal);
      return;
    }
  }
}

function isInside(mx, my, bounds) {
  return mx > bounds.x && mx < bounds.x + bounds.w && my > bounds.y && my < bounds.y + bounds.h;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, canvasHeight);
}

function updateCanvasSize() {
  var container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
