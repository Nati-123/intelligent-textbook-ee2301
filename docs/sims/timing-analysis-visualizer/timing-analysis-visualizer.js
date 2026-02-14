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

// Waveform interaction state
let showDetails = true;        // true = detailed view with annotations
let hoverRegions = [];          // [{x,y,w,h,label,value,desc}]
let waveformBounds = null;      // {x,y,w,h} for click detection

// Time cursor state
let timeCursor = 0;             // current time position in ns (0 = start)
let timePlaying = false;        // auto-advance mode
let timeSlider, timeLabel, playBtn;

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

  // Play/Pause button
  playBtn = document.createElement('button');
  playBtn.className = 'ta-controls__btn ta-controls__btn--play';
  playBtn.textContent = 'Play';
  playBtn.addEventListener('click', function() {
    timePlaying = !timePlaying;
    if (timePlaying) {
      // If at end, restart from 0
      var tMax = tCQ + (andDelay + orDelay + routingDelay) + tSetup;
      if (timeCursor >= tMax) timeCursor = 0;
      playBtn.textContent = 'Pause';
      playBtn.className = 'ta-controls__btn ta-controls__btn--pause';
    } else {
      playBtn.textContent = 'Play';
      playBtn.className = 'ta-controls__btn ta-controls__btn--play';
    }
  });
  bar.appendChild(playBtn);

  // Time slider group
  var timeGrp = document.createElement('div');
  timeGrp.className = 'ta-controls__group';
  bar.appendChild(timeGrp);

  var timeLbl = document.createElement('span');
  timeLbl.className = 'ta-controls__label';
  timeLbl.textContent = 'Time (ns)';
  timeGrp.appendChild(timeLbl);

  timeSlider = document.createElement('input');
  timeSlider.type = 'range';
  timeSlider.className = 'ta-controls__slider';
  timeSlider.min = '0';
  timeSlider.max = '1000';
  timeSlider.step = '1';
  timeSlider.value = '0';
  timeSlider.addEventListener('input', function() {
    var tMax = tCQ + (andDelay + orDelay + routingDelay) + tSetup;
    timeCursor = Math.round((parseFloat(this.value) / 1000) * tMax * 10) / 10;
    timePlaying = false;
    playBtn.textContent = 'Play';
    playBtn.className = 'ta-controls__btn ta-controls__btn--play';
  });
  timeGrp.appendChild(timeSlider);

  // Time value display
  timeLabel = document.createElement('span');
  timeLabel.className = 'ta-controls__label';
  timeLabel.style.minWidth = '52px';
  timeLabel.textContent = '0.0 ns';
  timeGrp.appendChild(timeLabel);

  // Reset Time button
  var rstTimeBtn = document.createElement('button');
  rstTimeBtn.className = 'ta-controls__btn ta-controls__btn--reset';
  rstTimeBtn.textContent = 't=0';
  rstTimeBtn.style.fontSize = '11px';
  rstTimeBtn.style.padding = '0 8px';
  rstTimeBtn.addEventListener('click', function() {
    timeCursor = 0;
    timePlaying = false;
    playBtn.textContent = 'Play';
    playBtn.className = 'ta-controls__btn ta-controls__btn--play';
  });
  bar.appendChild(rstTimeBtn);

  // Reset Defaults button
  var rstBtn = document.createElement('button');
  rstBtn.className = 'ta-controls__btn ta-controls__btn--reset';
  rstBtn.textContent = 'Reset';
  rstBtn.style.fontSize = '11px';
  rstBtn.addEventListener('click', function() {
    andDelay = 3;
    orDelay = 4;
    routingDelay = 1;
    timeCursor = 0;
    timePlaying = false;
    playBtn.textContent = 'Play';
    playBtn.className = 'ta-controls__btn ta-controls__btn--play';
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

  // Auto-advance time cursor (stops at T_min)
  let tEnd = tMin;
  if (timePlaying) {
    timeCursor += 0.06;
    if (timeCursor >= tEnd) {
      timeCursor = tEnd;
      timePlaying = false;
      playBtn.textContent = 'Play';
      playBtn.className = 'ta-controls__btn ta-controls__btn--play';
    }
  }
  // Clamp cursor to valid range
  timeCursor = constrain(timeCursor, 0, tEnd);

  // Sync slider and label
  if (timeSlider) {
    timeSlider.value = String((timeCursor / tEnd) * 1000);
  }
  if (timeLabel) {
    timeLabel.textContent = timeCursor.toFixed(1) + ' ns';
  }

  drawCircuitDiagram(criticalPath);
  drawParamControls();
  drawCalculations(path1Delay, path2Delay, criticalPath, tMin, fMax);
  renderWaveform(timeCursor, tMin, criticalPath);

  // Draw tooltip if hovering a region
  drawTooltip();

  // Hand cursor on hover for +/- buttons or waveform area
  let hovering = false;
  for (let i = 0; i < paramBtns.length; i++) {
    let b = paramBtns[i];
    if (b && b.minus && isInside(mouseX, mouseY, b.minus)) hovering = true;
    if (b && b.plus && isInside(mouseX, mouseY, b.plus)) hovering = true;
  }
  if (waveformBounds && isInside(mouseX, mouseY, waveformBounds)) hovering = true;
  for (let i = 0; i < hoverRegions.length; i++) {
    if (isInside(mouseX, mouseY, hoverRegions[i])) hovering = true;
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

// renderWaveform(ct, tMin, criticalPath)
// THE ONLY function that determines CLK level, Data level, shading,
// annotations, and marker position. Everything depends on ct (currentTime).
function renderWaveform(ct, tMin, criticalPath) {
  let tdY = 280;
  let tdX = 20;
  let tdW = canvasWidth - 40;
  let diagramY = tdY + 28;
  let sigH = 25;
  let gap = 35;
  let timeScale = tdW / (tMin * 1.1);
  let bottomY = diagramY + gap + sigH * 2 + 10;

  // Timing boundaries (all in ns)
  let tCqEnd = tCQ;
  let tDataValid = tCQ + criticalPath;
  let tSetupStart = tMin - tSetup;

  // Pixel positions for boundaries
  let cqEndPx = tdX + tCqEnd * timeScale;
  let dataValidPx = tdX + tDataValid * timeScale;
  let setupStartPx = tdX + tSetupStart * timeScale;
  let tMinPx = tdX + tMin * timeScale;
  let cursorPx = constrain(tdX + ct * timeScale, tdX, tdX + tdW);

  // Store waveform bounds for click detection
  waveformBounds = { x: tdX, y: tdY, w: tdW, h: bottomY - tdY + 20 };
  hoverRegions = [];

  // Title
  fill(50); noStroke();
  textSize(12); textStyle(BOLD); textAlign(CENTER, TOP);
  text("Timing Diagram", canvasWidth / 2, tdY);
  textStyle(NORMAL);

  // Hint text
  fill(140); textSize(9); textAlign(CENTER, TOP);
  text(showDetails
    ? "Click waveform to toggle details. Hover markers for values."
    : "Click waveform to show details.", canvasWidth / 2, tdY + 14);

  // Waveform background
  fill(252); stroke(showDetails ? 220 : 235); strokeWeight(1);
  rect(tdX - 2, diagramY - 4, tdW + 4, bottomY - diagramY + 8, 4);

  // Time axis
  stroke(150); strokeWeight(1);
  line(tdX, bottomY, tdX + tdW, bottomY);

  // Time grid markers
  fill(100); noStroke(); textSize(8); textAlign(CENTER, TOP);
  for (let t = 0; t <= tMin * 1.05; t += 2) {
    let x = tdX + t * timeScale;
    if (x <= tdX + tdW) {
      stroke(220); strokeWeight(0.5);
      line(x, diagramY, x, bottomY);
      fill(100); noStroke();
      text(t.toFixed(0) + "ns", x, bottomY + 2);
    }
  }

  // ── CLK waveform (computed from ct) ──
  drawSignalLabel("CLK", tdX - 5, diagramY + sigH / 2);
  if (ct > 0) {
    stroke(COLOR_GATE); strokeWeight(2); noFill();
    beginShape();
    for (let t = 0; t <= ct; t += 0.05) {
      let x = tdX + t * timeScale;
      let phase = (t % tMin) / tMin;
      let level = phase < 0.5 ? 1 : 0;
      vertex(x, diagramY + (1 - level) * sigH);
    }
    // Final point at exact ct
    let finalPhase = (ct % tMin) / tMin;
    let finalLevel = finalPhase < 0.5 ? 1 : 0;
    vertex(cursorPx, diagramY + (1 - finalLevel) * sigH);
    endShape();
  }

  // ── Data waveform (computed from ct) ──
  let dataY = diagramY + gap;
  drawSignalLabel("Data", tdX - 5, dataY + sigH / 2);

  // Data signal logic: at t=0 data is low (invalid).
  // 0 → tCQ:        data stays low (old value, FF hasn't output yet)
  // tCQ:             rising transition (FF outputs new data)
  // tCQ → tDataValid: data is changing/propagating (shown as high/transitioning)
  // tDataValid → tMin: data is stable and valid (high)
  if (ct > 0) {
    stroke(COLOR_TIMING); strokeWeight(2); noFill();

    // Phase 1: data low from t=0 to t=tCQ (or ct if ct < tCQ)
    let phase1End = min(tCqEnd, ct);
    let phase1EndPx = tdX + phase1End * timeScale;
    line(tdX, dataY + sigH, phase1EndPx, dataY + sigH);

    // Phase 2: rising edge at t=tCQ
    if (ct > tCqEnd) {
      let riseEndPx = tdX + min(tCqEnd + 0.3, ct) * timeScale;
      line(cqEndPx, dataY + sigH, riseEndPx, dataY);
    }

    // Phase 3: data high from tCQ+0.3 to ct (or tMin)
    if (ct > tCqEnd + 0.3) {
      let highStartPx = tdX + (tCqEnd + 0.3) * timeScale;
      let highEndPx = tdX + min(ct, tMin) * timeScale;
      line(highStartPx, dataY, highEndPx, dataY);
    }
  }

  // ── Detail shading (computed from ct) ──
  if (showDetails && ct > 0) {
    // t_cq region (pink) — grows from 0 to tCQ
    let cqShadeEnd = min(tCqEnd, ct);
    if (cqShadeEnd > 0) {
      fill(255, 235, 238, 150); noStroke();
      rect(tdX, dataY, cqShadeEnd * timeScale, sigH);
    }

    // Data valid region (green) — from tDataValid to min(tSetupStart, ct)
    if (ct > tDataValid) {
      let validEnd = min(tSetupStart, ct);
      if (validEnd > tDataValid) {
        fill(200, 230, 201, 150); noStroke();
        rect(dataValidPx, dataY, (validEnd - tDataValid) * timeScale, sigH);
      }
    }

    // Setup region (orange) — from tSetupStart to min(tMin, ct)
    if (ct > tSetupStart) {
      let suEnd = min(tMin, ct);
      fill(255, 243, 224, 150); noStroke();
      rect(setupStartPx, dataY, (suEnd - tSetupStart) * timeScale, sigH);
    }
  }

  // ── Cursor line (always at ct) ──
  if (ct > 0) {
    stroke(COLOR_CRITICAL); strokeWeight(1.5);
    drawingContext.setLineDash([4, 3]);
    line(cursorPx, diagramY - 4, cursorPx, bottomY);
    drawingContext.setLineDash([]);

    fill(COLOR_CRITICAL); noStroke();
    textSize(9); textStyle(BOLD); textAlign(CENTER, BOTTOM);
    text(ct.toFixed(1) + " ns", cursorPx, diagramY - 5);
    textStyle(NORMAL);
  }

  // ── Annotations (appear when ct passes each boundary) ──
  if (showDetails) {
    let braceH = 18;

    if (ct >= tCqEnd) {
      fill(COLOR_CRITICAL); noStroke();
      drawBrace(tdX, cqEndPx, dataY + sigH + 12, "t_cq = " + tCQ + "ns");
      hoverRegions.push({
        x: tdX, y: dataY + sigH + 4, w: cqEndPx - tdX, h: braceH,
        label: "t_cq", value: tCQ.toFixed(1) + " ns",
        desc: "Clock-to-Q: delay from clock edge to FF output changing"
      });
    }

    if (ct >= tDataValid) {
      fill(COLOR_CRITICAL); noStroke();
      drawBrace(cqEndPx, dataValidPx, dataY + sigH + 12, "critical path = " + criticalPath.toFixed(1) + "ns");
      hoverRegions.push({
        x: cqEndPx, y: dataY + sigH + 4, w: dataValidPx - cqEndPx, h: braceH,
        label: "Critical Path", value: criticalPath.toFixed(1) + " ns",
        desc: "Longest combinational delay through gates + routing"
      });
    }

    if (ct >= tMin) {
      fill(COLOR_TIMING); noStroke();
      drawBrace(setupStartPx, tMinPx, dataY + sigH + 12, "t_setup = " + tSetup + "ns");
      hoverRegions.push({
        x: setupStartPx, y: dataY + sigH + 4, w: tMinPx - setupStartPx, h: braceH,
        label: "t_setup", value: tSetup.toFixed(1) + " ns",
        desc: "Setup time: data must be stable before next clock edge"
      });

      // Next clock edge marker
      stroke(COLOR_FF); strokeWeight(1.5);
      drawingContext.setLineDash([3, 3]);
      line(tMinPx, diagramY, tMinPx, dataY + sigH + 20);
      drawingContext.setLineDash([]);

      fill(COLOR_FF); noStroke();
      textSize(8); textAlign(CENTER, TOP);
      text("next edge", tMinPx, dataY + sigH + 22);
      hoverRegions.push({
        x: tMinPx - 12, y: diagramY, w: 24, h: dataY + sigH + 30 - diagramY,
        label: "Next Edge", value: tMin.toFixed(1) + " ns",
        desc: "Next rising clock edge — defines minimum clock period"
      });
    }
  }
}

function drawTooltip() {
  if (!showDetails) return;
  for (let i = 0; i < hoverRegions.length; i++) {
    let r = hoverRegions[i];
    if (isInside(mouseX, mouseY, r)) {
      let tipW = 200;
      let tipH = 38;
      let tx = mouseX + 12;
      let ty = mouseY - tipH - 6;
      // Keep tooltip on screen
      if (tx + tipW > canvasWidth - 4) tx = mouseX - tipW - 12;
      if (ty < 4) ty = mouseY + 16;

      fill(44, 62, 80, 240);
      noStroke();
      rect(tx, ty, tipW, tipH, 5);
      // Arrow nub
      triangle(mouseX, mouseY - 2, mouseX - 5, ty + tipH, mouseX + 5, ty + tipH);

      fill(255);
      noStroke();
      textSize(11);
      textStyle(BOLD);
      textAlign(LEFT, TOP);
      text(r.label + " = " + r.value, tx + 8, ty + 5);
      textStyle(NORMAL);
      textSize(9);
      fill(200);
      text(r.desc, tx + 8, ty + 21);
      break;
    }
  }
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
  // Check waveform click to toggle details
  if (waveformBounds && isInside(mouseX, mouseY, waveformBounds)) {
    showDetails = !showDetails;
    return;
  }

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
