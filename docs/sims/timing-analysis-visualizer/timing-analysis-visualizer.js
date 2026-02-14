// Timing Analysis Visualizer MicroSim
// Explore critical path delays and maximum clock frequency calculation

let containerWidth;
let canvasWidth = 400;
let drawHeight = 430;
let controlHeight = 0;
let canvasHeight = drawHeight + controlHeight;

// Delay parameters (in nanoseconds)
let andDelay = 3;
let orDelay = 4;
let routingDelay = 1;

// Fixed timing parameters
let tSetup = 2;      // Setup time in ns
let tCQ = 1;          // Clock-to-Q delay in ns
let tHold = 0.5;      // Hold time in ns

// Parameter definitions
let params = [
  { label: "AND Delay", min: 1, max: 10, step: 1, unit: "ns" },
  { label: "OR Delay",  min: 1, max: 10, step: 1, unit: "ns" },
  { label: "Routing",   min: 0.5, max: 5, step: 0.5, unit: "ns" }
];

// Button bounds for hit detection
let paramBtns = []; // [{minus, plus, val}]

// Colors
const COLOR_CRITICAL = '#E91E63';
const COLOR_PATH = '#4CAF50';
const COLOR_GATE = '#5C6BC0';
const COLOR_TIMING = '#FF9800';
const COLOR_FF = '#7E57C2';

function getParamValue(i) {
  if (i === 0) return andDelay;
  if (i === 1) return orDelay;
  return routingDelay;
}

function setParamValue(i, v) {
  v = constrain(v, params[i].min, params[i].max);
  if (i === 0) andDelay = v;
  else if (i === 1) orDelay = v;
  else routingDelay = v;
}

function setup() {
  updateCanvasSize();
  var mainElement = document.querySelector('main');

  // --- DOM flex control bar (above canvas) ---
  var bar = document.createElement('div');
  bar.className = 'ta-controls';
  mainElement.appendChild(bar);

  // Reset button
  var rstBtn = document.createElement('button');
  rstBtn.className = 'ta-controls__btn ta-controls__btn--reset';
  rstBtn.textContent = 'Reset Defaults';
  rstBtn.addEventListener('click', function() {
    andDelay = 3;
    orDelay = 4;
    routingDelay = 1;
  });
  bar.appendChild(rstBtn);

  // Fullscreen / Close link (pushed to right)
  var navLink = document.createElement('a');
  navLink.style.cssText = 'margin-left:auto;font-size:11px;font-weight:bold;color:#5C6BC0;';
  if (window.self !== window.top) {
    navLink.href = 'main.html';
    navLink.target = '_blank';
    navLink.textContent = 'Fullscreen';
  } else {
    navLink.href = '#';
    navLink.textContent = 'Close';
    navLink.addEventListener('click', function(e) {
      e.preventDefault();
      window.close();
    });
  }
  bar.appendChild(navLink);

  const canvas = createCanvas(containerWidth, canvasHeight);
  canvas.parent(mainElement);
  describe('Timing analysis visualizer showing critical path delays, gate delays, and maximum clock frequency', LABEL);
}

function draw() {
  updateCanvasSize();
  background(245);

  // Calculate path delays
  let path1Delay = andDelay + orDelay + routingDelay;
  let path2Delay = andDelay + orDelay + routingDelay;
  let criticalPath = Math.max(path1Delay, path2Delay);
  let tMin = tCQ + criticalPath + tSetup;
  let fMax = 1000 / tMin; // Convert to MHz

  drawCircuitDiagram(criticalPath);
  drawParamControls();
  drawCalculations(path1Delay, path2Delay, criticalPath, tMin, fMax);
  drawTimingDiagram(tMin, criticalPath);

  // Hand cursor on hover for +/- buttons
  let hovering = false;
  for (let i = 0; i < paramBtns.length; i++) {
    let b = paramBtns[i];
    if (b && b.minus && isInside(mouseX, mouseY, b.minus)) hovering = true;
    if (b && b.plus && isInside(mouseX, mouseY, b.plus)) hovering = true;
  }
  cursor(hovering ? HAND : ARROW);
}

function drawCircuitDiagram(criticalPath) {
  let circuitY = 20;
  let circuitH = 130;

  // Title
  fill(50);
  noStroke();
  textSize(13);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text("Circuit Diagram", canvasWidth / 2, circuitY);
  textStyle(NORMAL);

  // Layout positions
  let gateW = 45;
  let gateH = 30;
  let cx = canvasWidth / 2;
  let and1X = cx - 100;
  let and2X = cx - 100;
  let and1Y = circuitY + 40;
  let and2Y = circuitY + 95;
  let orX = cx + 10;
  let orY = circuitY + 67;
  let ffX = cx + 120;
  let ffY = circuitY + 60;
  let ffW = 40;
  let ffH = 45;

  // Input labels
  fill(80);
  textSize(10);
  textAlign(RIGHT, CENTER);
  text("A", and1X - gateW / 2 - 20, and1Y - 6);
  text("B", and1X - gateW / 2 - 20, and1Y + 6);
  text("C", and2X - gateW / 2 - 20, and2Y - 6);
  text("D", and2X - gateW / 2 - 20, and2Y + 6);

  // Input wires
  stroke(COLOR_PATH);
  strokeWeight(1.5);
  line(and1X - gateW / 2 - 15, and1Y - 6, and1X - gateW / 2, and1Y - 6);
  line(and1X - gateW / 2 - 15, and1Y + 6, and1X - gateW / 2, and1Y + 6);
  line(and2X - gateW / 2 - 15, and2Y - 6, and2X - gateW / 2, and2Y - 6);
  line(and2X - gateW / 2 - 15, and2Y + 6, and2X - gateW / 2, and2Y + 6);

  // AND gate 1
  fill('#E3F2FD');
  stroke(COLOR_GATE);
  strokeWeight(2);
  rect(and1X - gateW / 2, and1Y - gateH / 2, gateW, gateH, 0, 10, 10, 0);
  fill(COLOR_GATE);
  noStroke();
  textSize(10);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text("AND", and1X, and1Y);
  textStyle(NORMAL);

  // AND gate 2
  fill('#E3F2FD');
  stroke(COLOR_GATE);
  strokeWeight(2);
  rect(and2X - gateW / 2, and2Y - gateH / 2, gateW, gateH, 0, 10, 10, 0);
  fill(COLOR_GATE);
  noStroke();
  textSize(10);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text("AND", and2X, and2Y);
  textStyle(NORMAL);

  // Wires: AND gates to OR gate
  stroke(COLOR_CRITICAL);
  strokeWeight(2);
  line(and1X + gateW / 2, and1Y, orX - gateW / 2, orY - 8);
  line(and2X + gateW / 2, and2Y, orX - gateW / 2, orY + 8);

  // OR gate
  fill('#FFF3E0');
  stroke(COLOR_TIMING);
  strokeWeight(2);
  rect(orX - gateW / 2, orY - gateH / 2, gateW, gateH, 10);
  fill(COLOR_TIMING);
  noStroke();
  textSize(10);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text("OR", orX, orY);
  textStyle(NORMAL);

  // Wire: OR to FF
  stroke(COLOR_CRITICAL);
  strokeWeight(2);
  drawingContext.setLineDash([]);
  line(orX + gateW / 2, orY, ffX - ffW / 2, ffY + ffH / 2 - 15);

  // Routing delay label
  fill(COLOR_CRITICAL);
  noStroke();
  textSize(9);
  textAlign(CENTER, BOTTOM);
  text("routing", (orX + gateW / 2 + ffX - ffW / 2) / 2, orY - 5);

  // Flip-flop
  fill('#F3E5F5');
  stroke(COLOR_FF);
  strokeWeight(2);
  rect(ffX - ffW / 2, ffY - ffH / 2 + 7, ffW, ffH, 3);

  fill(COLOR_FF);
  noStroke();
  textSize(10);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text("FF", ffX, ffY + 7);
  textStyle(NORMAL);

  // Clock triangle on FF
  stroke(COLOR_FF);
  strokeWeight(1);
  noFill();
  let triSize = 6;
  let triY = ffY + ffH / 2 + 4;
  triangle(ffX - triSize, triY, ffX + triSize, triY, ffX, triY - triSize);

  // Delay annotations
  fill(80);
  noStroke();
  textSize(9);
  textAlign(CENTER, TOP);
  text(andDelay + "ns", and1X, and1Y + gateH / 2 + 2);
  text(andDelay + "ns", and2X, and2Y + gateH / 2 + 2);
  text(orDelay + "ns", orX, orY + gateH / 2 + 2);
}

function drawParamControls() {
  let areaY = 165;
  let startX = 15;
  let rowH = 30;
  let btnSize = 24;
  let valW = 50;

  paramBtns = [];

  for (let i = 0; i < params.length; i++) {
    let p = params[i];
    let y = areaY + i * rowH;
    let x = startX;
    let val = getParamValue(i);

    // Label
    fill(60);
    noStroke();
    textSize(11);
    textAlign(LEFT, CENTER);
    text(p.label + ":", x, y + btnSize / 2);

    // Minus button
    x += 78;
    let minusBtn = { x: x, y: y, w: btnSize, h: btnSize };
    fill(val <= p.min ? '#ccc' : COLOR_CRITICAL);
    stroke(val <= p.min ? '#aaa' : '#C2185B');
    strokeWeight(1.5);
    rect(x, y, btnSize, btnSize, 4);
    fill(255);
    noStroke();
    textSize(16);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text('-', x + btnSize / 2, y + btnSize / 2);
    textStyle(NORMAL);

    // Value display
    x += btnSize + 4;
    let valBtn = { x: x, y: y, w: valW, h: btnSize };
    fill(255);
    stroke(COLOR_GATE);
    strokeWeight(2);
    rect(x, y, valW, btnSize, 4);
    fill(COLOR_GATE);
    noStroke();
    textSize(13);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text(val.toFixed(p.step < 1 ? 1 : 0) + " " + p.unit, x + valW / 2, y + btnSize / 2);
    textStyle(NORMAL);

    // Plus button
    x += valW + 4;
    let plusBtn = { x: x, y: y, w: btnSize, h: btnSize };
    fill(val >= p.max ? '#ccc' : COLOR_PATH);
    stroke(val >= p.max ? '#aaa' : '#388E3C');
    strokeWeight(1.5);
    rect(x, y, btnSize, btnSize, 4);
    fill(255);
    noStroke();
    textSize(16);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text('+', x + btnSize / 2, y + btnSize / 2);
    textStyle(NORMAL);

    paramBtns.push({ minus: minusBtn, plus: plusBtn, val: valBtn });
  }
}

function drawCalculations(path1, path2, critical, tMin, fMax) {
  let calcX = canvasWidth * 0.5 + 10;
  let calcY = 165;
  let calcW = canvasWidth * 0.48 - 10;

  // Background
  fill(255);
  stroke(200);
  strokeWeight(1);
  rect(calcX, calcY, calcW, 100, 5);

  // Title
  fill(50);
  noStroke();
  textSize(12);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text("Timing Calculations", calcX + 8, calcY + 6);
  textStyle(NORMAL);

  textSize(10);
  fill(80);
  let lineH = 14;
  let ty = calcY + 24;

  text("Path 1 = " + andDelay + " + " + orDelay + " + " + routingDelay.toFixed(1) + " = " + path1.toFixed(1) + " ns", calcX + 8, ty);
  ty += lineH;
  text("Path 2 = " + andDelay + " + " + orDelay + " + " + routingDelay.toFixed(1) + " = " + path2.toFixed(1) + " ns", calcX + 8, ty);
  ty += lineH;

  fill(COLOR_CRITICAL);
  textStyle(BOLD);
  text("Critical Path = " + critical.toFixed(1) + " ns", calcX + 8, ty);
  ty += lineH;

  fill(80);
  textStyle(NORMAL);
  text("T_min = t_cq(" + tCQ + ") + CP(" + critical.toFixed(1) + ") + t_su(" + tSetup + ") = " + tMin.toFixed(1) + " ns", calcX + 8, ty);
  ty += lineH;

  fill(COLOR_PATH);
  textStyle(BOLD);
  textSize(12);
  text("f_max = " + fMax.toFixed(1) + " MHz", calcX + 8, ty);
  textStyle(NORMAL);
}

function drawTimingDiagram(tMin, criticalPath) {
  let tdY = 280;
  let tdH = 160;
  let tdX = 20;
  let tdW = canvasWidth - 40;

  // Title
  fill(50);
  noStroke();
  textSize(12);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text("Timing Diagram", canvasWidth / 2, tdY);
  textStyle(NORMAL);

  let diagramY = tdY + 18;
  let sigH = 25;
  let gap = 35;
  let timeScale = tdW / (tMin * 1.3);

  // Time axis
  stroke(150);
  strokeWeight(1);
  line(tdX, diagramY + gap * 3 + sigH + 10, tdX + tdW, diagramY + gap * 3 + sigH + 10);

  // Time markers
  fill(100);
  noStroke();
  textSize(8);
  textAlign(CENTER, TOP);
  for (let t = 0; t <= tMin * 1.2; t += 2) {
    let x = tdX + t * timeScale;
    if (x < tdX + tdW) {
      stroke(220);
      strokeWeight(0.5);
      line(x, diagramY, x, diagramY + gap * 3 + sigH + 10);
      fill(100);
      noStroke();
      text(t.toFixed(0) + "ns", x, diagramY + gap * 3 + sigH + 12);
    }
  }

  // CLK signal
  drawSignalLabel("CLK", tdX - 5, diagramY + sigH / 2);
  stroke(COLOR_GATE);
  strokeWeight(2);
  noFill();
  let clkPeriod = tMin;
  beginShape();
  for (let t = 0; t < tMin * 1.2; t += 0.1) {
    let x = tdX + t * timeScale;
    let phase = (t % clkPeriod) / clkPeriod;
    let level = phase < 0.5 ? 1 : 0;
    vertex(x, diagramY + (1 - level) * sigH);
  }
  endShape();

  // Data valid signal
  let dataY = diagramY + gap;
  drawSignalLabel("Data", tdX - 5, dataY + sigH / 2);

  // t_cq region
  let cqEndX = tdX + tCQ * timeScale;
  fill(255, 235, 238, 150);
  noStroke();
  rect(tdX, dataY, tCQ * timeScale, sigH);

  // Data transition
  stroke(COLOR_TIMING);
  strokeWeight(2);
  noFill();
  line(tdX, dataY + sigH, cqEndX, dataY + sigH);
  line(cqEndX, dataY + sigH, cqEndX + 3, dataY);
  let dataValidX = cqEndX + criticalPath * timeScale;
  line(cqEndX + 3, dataY, dataValidX, dataY);

  // Data valid shading
  let setupStartX = tdX + (tMin - tSetup) * timeScale;
  fill(200, 230, 201, 150);
  noStroke();
  rect(dataValidX, dataY, setupStartX - dataValidX, sigH);

  // Setup time region
  fill(255, 243, 224, 150);
  noStroke();
  rect(setupStartX, dataY, tSetup * timeScale, sigH);

  // Annotations
  fill(COLOR_CRITICAL);
  noStroke();
  textSize(8);
  textAlign(CENTER, BOTTOM);
  drawBrace(tdX, cqEndX, dataY + sigH + 12, "t_cq");
  drawBrace(cqEndX, dataValidX, dataY + sigH + 12, "critical path");
  fill(COLOR_TIMING);
  drawBrace(setupStartX, setupStartX + tSetup * timeScale, dataY + sigH + 12, "t_setup");

  // Next clock edge
  let nextClkX = tdX + tMin * timeScale;
  stroke(COLOR_FF);
  strokeWeight(1.5);
  drawingContext.setLineDash([3, 3]);
  line(nextClkX, diagramY, nextClkX, dataY + sigH + 20);
  drawingContext.setLineDash([]);

  fill(COLOR_FF);
  noStroke();
  textSize(8);
  textAlign(CENTER, TOP);
  text("next edge", nextClkX, dataY + sigH + 22);
}

function drawSignalLabel(label, x, y) {
  fill(60);
  noStroke();
  textSize(10);
  textStyle(BOLD);
  textAlign(RIGHT, CENTER);
  text(label, x, y);
  textStyle(NORMAL);
}

function drawBrace(x1, x2, y, label) {
  let cx = (x1 + x2) / 2;
  stroke(100);
  strokeWeight(1);
  line(x1, y, x2, y);
  line(x1, y - 3, x1, y + 3);
  line(x2, y - 3, x2, y + 3);

  noStroke();
  textSize(8);
  textAlign(CENTER, TOP);
  text(label, cx, y + 2);
}

function mousePressed() {
  // Check param +/- buttons
  for (let i = 0; i < paramBtns.length; i++) {
    let b = paramBtns[i];
    if (!b) continue;
    let val = getParamValue(i);
    let step = params[i].step;

    if (isInside(mouseX, mouseY, b.minus)) {
      setParamValue(i, val - step);
      return;
    }
    if (isInside(mouseX, mouseY, b.plus)) {
      setParamValue(i, val + step);
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
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
