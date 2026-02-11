// Timing Analysis Visualizer MicroSim
// Explore critical path delays and maximum clock frequency calculation

let containerWidth;
let canvasWidth = 400;
let drawHeight = 450;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

// Delay parameters (in nanoseconds)
let andDelay = 3;
let orDelay = 4;
let routingDelay = 1;

// Fixed timing parameters
let tSetup = 2;      // Setup time in ns
let tCQ = 1;          // Clock-to-Q delay in ns
let tHold = 0.5;      // Hold time in ns

// Slider definitions
let sliders = [
  { label: "AND Delay", min: 1, max: 10, value: 3, unit: "ns", y: 0 },
  { label: "OR Delay",  min: 1, max: 10, value: 4, unit: "ns", y: 0 },
  { label: "Routing",   min: 0.5, max: 5, value: 1, unit: "ns", step: 0.5, y: 0 }
];

// Drag state
let draggingSlider = -1;

// Colors
const COLOR_CRITICAL = '#E91E63';
const COLOR_PATH = '#4CAF50';
const COLOR_GATE = '#5C6BC0';
const COLOR_TIMING = '#FF9800';
const COLOR_FF = '#7E57C2';

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  describe('Timing analysis visualizer showing critical path delays, gate delays, and maximum clock frequency', LABEL);
}

function draw() {
  updateCanvasSize();
  background(245);

  // Update slider values
  andDelay = sliders[0].value;
  orDelay = sliders[1].value;
  routingDelay = sliders[2].value;

  // Calculate path delays
  let path1Delay = andDelay + orDelay + routingDelay;
  let path2Delay = andDelay + orDelay + routingDelay;
  let criticalPath = Math.max(path1Delay, path2Delay);
  let tMin = tCQ + criticalPath + tSetup;
  let fMax = 1000 / tMin; // Convert to MHz

  drawCircuitDiagram(criticalPath);
  drawSliders();
  drawCalculations(path1Delay, path2Delay, criticalPath, tMin, fMax);
  drawTimingDiagram(tMin, criticalPath);
  drawControls();
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
  // Path 1 inputs
  line(and1X - gateW / 2 - 15, and1Y - 6, and1X - gateW / 2, and1Y - 6);
  line(and1X - gateW / 2 - 15, and1Y + 6, and1X - gateW / 2, and1Y + 6);
  // Path 2 inputs
  line(and2X - gateW / 2 - 15, and2Y - 6, and2X - gateW / 2, and2Y - 6);
  line(and2X - gateW / 2 - 15, and2Y + 6, and2X - gateW / 2, and2Y + 6);

  // AND gate 1 - critical path highlight
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
  // From AND1 to OR
  line(and1X + gateW / 2, and1Y, orX - gateW / 2, orY - 8);
  // From AND2 to OR
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

  // Wire: OR to FF (routing delay segment)
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

  // FF label and clock triangle
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

function drawSliders() {
  let sliderAreaY = 165;
  let sliderX = 20;
  let sliderW = canvasWidth * 0.4;
  let sliderH = 20;
  let gap = 35;

  for (let i = 0; i < sliders.length; i++) {
    let s = sliders[i];
    let sy = sliderAreaY + i * gap;
    s.y = sy;

    // Label
    fill(60);
    noStroke();
    textSize(11);
    textAlign(LEFT, CENTER);
    text(s.label + ":", sliderX, sy + sliderH / 2);

    // Track
    let trackX = sliderX + 80;
    let trackW = sliderW - 80;
    fill(220);
    stroke(180);
    strokeWeight(1);
    rect(trackX, sy + sliderH / 2 - 3, trackW, 6, 3);

    // Filled portion
    let fraction = (s.value - s.min) / (s.max - s.min);
    fill(COLOR_GATE);
    noStroke();
    rect(trackX, sy + sliderH / 2 - 3, trackW * fraction, 6, 3);

    // Thumb
    let thumbX = trackX + trackW * fraction;
    fill(draggingSlider === i ? COLOR_CRITICAL : COLOR_GATE);
    stroke(255);
    strokeWeight(2);
    ellipse(thumbX, sy + sliderH / 2, 14, 14);

    // Value display
    fill(COLOR_GATE);
    noStroke();
    textSize(11);
    textStyle(BOLD);
    textAlign(LEFT, CENTER);
    text(s.value.toFixed(1) + " " + s.unit, trackX + trackW + 10, sy + sliderH / 2);
    textStyle(NORMAL);

    // Store track bounds for drag detection
    s.trackX = trackX;
    s.trackW = trackW;
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

  // Data transition (after t_cq, data propagates through logic)
  stroke(COLOR_TIMING);
  strokeWeight(2);
  noFill();
  // Old data (hatched low)
  line(tdX, dataY + sigH, cqEndX, dataY + sigH);
  // Transition
  line(cqEndX, dataY + sigH, cqEndX + 3, dataY);
  // New data valid
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
  // t_cq annotation
  drawBrace(tdX, cqEndX, dataY + sigH + 12, "t_cq");
  // Critical path annotation
  drawBrace(cqEndX, dataValidX, dataY + sigH + 12, "critical path");
  // Setup time annotation
  fill(COLOR_TIMING);
  drawBrace(setupStartX, setupStartX + tSetup * timeScale, dataY + sigH + 12, "t_setup");

  // Setup requirement arrow
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

function drawControls() {
  // Control area background
  fill(230);
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Reset button
  let btnW = 100;
  let btnH = 30;
  let btnX = canvasWidth / 2 - btnW / 2;
  let btnY = drawHeight + 10;

  let isHover = mouseX > btnX && mouseX < btnX + btnW &&
                mouseY > btnY && mouseY < btnY + btnH;

  fill(isHover ? '#1976D2' : COLOR_GATE);
  stroke('#303F9F');
  strokeWeight(1);
  rect(btnX, btnY, btnW, btnH, 5);

  fill(255);
  noStroke();
  textSize(13);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text("Reset Defaults", btnX + btnW / 2, btnY + btnH / 2);
  textStyle(NORMAL);
}

function mousePressed() {
  // Check Reset button
  let btnW = 100;
  let btnH = 30;
  let btnX = canvasWidth / 2 - btnW / 2;
  let btnY = drawHeight + 10;

  if (mouseX > btnX && mouseX < btnX + btnW &&
      mouseY > btnY && mouseY < btnY + btnH) {
    sliders[0].value = 3;
    sliders[1].value = 4;
    sliders[2].value = 1;
    return;
  }

  // Check slider thumb clicks
  for (let i = 0; i < sliders.length; i++) {
    let s = sliders[i];
    let fraction = (s.value - s.min) / (s.max - s.min);
    let thumbX = s.trackX + s.trackW * fraction;
    let thumbY = s.y + 10;

    if (dist(mouseX, mouseY, thumbX, thumbY) < 12) {
      draggingSlider = i;
      return;
    }
  }

  // Check if click is on slider track
  for (let i = 0; i < sliders.length; i++) {
    let s = sliders[i];
    let trackY = s.y + 10;
    if (mouseX >= s.trackX && mouseX <= s.trackX + s.trackW &&
        mouseY >= trackY - 10 && mouseY <= trackY + 10) {
      draggingSlider = i;
      updateSliderValue(i, mouseX);
      return;
    }
  }
}

function mouseDragged() {
  if (draggingSlider >= 0) {
    updateSliderValue(draggingSlider, mouseX);
  }
}

function mouseReleased() {
  draggingSlider = -1;
}

function updateSliderValue(index, mx) {
  let s = sliders[index];
  let fraction = constrain((mx - s.trackX) / s.trackW, 0, 1);
  let rawValue = s.min + fraction * (s.max - s.min);

  // Snap to step if defined
  let step = s.step || 1;
  s.value = Math.round(rawValue / step) * step;
  s.value = constrain(s.value, s.min, s.max);
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
