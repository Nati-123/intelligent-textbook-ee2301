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
let viewRange = 0;              // 0 = auto (T_min), or specific ns value
let timeSlider, timeInput, playBtn, viewSelect;

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

function getMaxTime() {
  if (viewRange > 0) return viewRange;
  var t = tCQ + (andDelay + orDelay + routingDelay) + tSetup;
  return t * 1.1;
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
      var tMinL = tCQ + (andDelay + orDelay + routingDelay) + tSetup;
      var maxT = getMaxTime();
      if (timeCursor >= Math.min(tMinL, maxT)) timeCursor = 0;
      playBtn.textContent = 'Pause';
      playBtn.className = 'ta-controls__btn ta-controls__btn--pause';
    } else {
      playBtn.textContent = 'Play';
      playBtn.className = 'ta-controls__btn ta-controls__btn--play';
    }
  });
  bar.appendChild(playBtn);

  // Time input group
  var timeGrp = document.createElement('div');
  timeGrp.className = 'ta-controls__group';
  bar.appendChild(timeGrp);

  var timeLbl = document.createElement('span');
  timeLbl.className = 'ta-controls__label';
  timeLbl.textContent = 'Time (ns)';
  timeGrp.appendChild(timeLbl);

  timeInput = document.createElement('input');
  timeInput.type = 'number';
  timeInput.min = '0';
  timeInput.step = '0.1';
  timeInput.value = '0.0';
  timeInput.style.cssText = 'width:55px;height:28px;text-align:center;font-size:12px;border:2px solid #5C6BC0;border-radius:4px;';
  timeInput.addEventListener('change', function() {
    var val = parseFloat(this.value) || 0;
    if (val < 0) val = 0;
    // Auto-expand range dropdown if typed value exceeds current range
    var maxT = getMaxTime();
    if (val > maxT) {
      var presets = [5, 10, 20, 50, 100];
      for (var pi = 0; pi < presets.length; pi++) {
        if (presets[pi] >= val) {
          viewRange = presets[pi];
          viewSelect.value = String(presets[pi]);
          break;
        }
      }
      if (val > 100) { viewRange = 100; viewSelect.value = '100'; val = 100; }
      maxT = getMaxTime();
    }
    timeCursor = constrain(val, 0, maxT);
    this.value = timeCursor.toFixed(1);
    timePlaying = false;
    playBtn.textContent = 'Play';
    playBtn.className = 'ta-controls__btn ta-controls__btn--play';
  });
  timeInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') this.blur();
  });
  timeGrp.appendChild(timeInput);

  timeSlider = document.createElement('input');
  timeSlider.type = 'range';
  timeSlider.className = 'ta-controls__slider';
  timeSlider.min = '0';
  timeSlider.max = '1000';
  timeSlider.step = '1';
  timeSlider.value = '0';
  timeSlider.addEventListener('input', function() {
    var maxT = getMaxTime();
    timeCursor = Math.round((parseFloat(this.value) / 1000) * maxT * 10) / 10;
    timePlaying = false;
    playBtn.textContent = 'Play';
    playBtn.className = 'ta-controls__btn ta-controls__btn--play';
  });
  timeGrp.appendChild(timeSlider);

  // View range dropdown
  var rangeGrp = document.createElement('div');
  rangeGrp.className = 'ta-controls__group';
  bar.appendChild(rangeGrp);

  var rangeLbl = document.createElement('span');
  rangeLbl.className = 'ta-controls__label';
  rangeLbl.textContent = 'Range';
  rangeGrp.appendChild(rangeLbl);

  viewSelect = document.createElement('select');
  viewSelect.style.cssText = 'height:30px;font-size:12px;border-radius:4px;border:2px solid #5C6BC0;padding:0 4px;';
  var rangeOpts = [
    { value: '0', text: 'Auto (T_min)' },
    { value: '5', text: '5 ns' },
    { value: '10', text: '10 ns' },
    { value: '20', text: '20 ns' },
    { value: '50', text: '50 ns' },
    { value: '100', text: '100 ns' }
  ];
  for (var ri = 0; ri < rangeOpts.length; ri++) {
    var o = document.createElement('option');
    o.value = rangeOpts[ri].value;
    o.textContent = rangeOpts[ri].text;
    viewSelect.appendChild(o);
  }
  viewSelect.addEventListener('change', function() {
    viewRange = parseFloat(this.value);
    var maxT = getMaxTime();
    timeCursor = constrain(timeCursor, 0, maxT);
  });
  rangeGrp.appendChild(viewSelect);

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

  // Compute visible time range
  let maxTime = getMaxTime();

  // Auto-advance time cursor
  let tEnd = Math.min(tMin, maxTime);
  if (timePlaying) {
    timeCursor += 0.06;
    if (timeCursor >= tEnd) {
      timeCursor = tEnd;
      timePlaying = false;
      playBtn.textContent = 'Play';
      playBtn.className = 'ta-controls__btn ta-controls__btn--play';
    }
  }
  timeCursor = constrain(timeCursor, 0, maxTime);

  // Sync slider and numeric input
  if (timeSlider) {
    timeSlider.value = String((timeCursor / maxTime) * 1000);
  }
  if (timeInput && document.activeElement !== timeInput) {
    timeInput.value = timeCursor.toFixed(1);
    timeInput.max = maxTime.toFixed(1);
  }

  drawCircuitDiagram(criticalPath);
  drawParamControls();
  drawCalculations(path1Delay, path2Delay, criticalPath, tMin, fMax);
  renderWaveform(timeCursor, tMin, criticalPath, maxTime);

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

  // Input labels with live values
  let inputVal = timeCursor > 0 ? 1 : 0;
  textSize(9);
  textAlign(RIGHT, CENTER);
  fill(inputVal ? COLOR_PATH : '#999');
  text("A=" + inputVal, and1X - gateW / 2 - 5, and1Y - 6);
  text("B=" + inputVal, and1X - gateW / 2 - 5, and1Y + 6);
  text("C=" + inputVal, and2X - gateW / 2 - 5, and2Y - 6);
  text("D=" + inputVal, and2X - gateW / 2 - 5, and2Y + 6);

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

  // Intermediate signal labels with live values
  let x1Val = timeCursor >= andDelay ? 1 : 0;
  let x2Val = timeCursor >= andDelay ? 1 : 0;
  let yVal = timeCursor >= (andDelay + orDelay) ? 1 : 0;
  let dVal = timeCursor >= (andDelay + orDelay + routingDelay) ? 1 : 0;

  textSize(8);
  textStyle(BOLD);

  // X1 (AND1→OR wire, placed above wire near AND1 output)
  textAlign(LEFT, BOTTOM);
  fill(x1Val ? COLOR_PATH : '#999');
  text("X1=" + x1Val, and1X + gateW / 2 + 4, and1Y - 2);

  // X2 (AND2→OR wire, placed below wire near AND2 output)
  textAlign(LEFT, TOP);
  fill(x2Val ? COLOR_PATH : '#999');
  text("X2=" + x2Val, and2X + gateW / 2 + 4, and2Y + 4);

  // Y (OR→FF wire, placed below the routing label)
  textAlign(CENTER, TOP);
  fill(yVal ? COLOR_PATH : '#999');
  text("Y=" + yVal, (orX + gateW / 2 + ffX - ffW / 2) / 2, orY + 4);

  // Q (FF output)
  stroke(COLOR_FF);
  strokeWeight(1.5);
  line(ffX + ffW / 2, ffY + 7, ffX + ffW / 2 + 15, ffY + 7);
  textAlign(LEFT, CENTER);
  fill(dVal ? COLOR_PATH : '#999');
  noStroke();
  text("Q=" + dVal, ffX + ffW / 2 + 17, ffY + 7);

  textStyle(NORMAL);
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
// Draws 4 signals (CLK, AND_out, OR_out, FF_in) progressively up to ct.
// All transitions and shading are computed purely from currentTime.
function renderWaveform(ct, tMin, criticalPath, maxTime) {
  let tdY = 278;
  let tdX = 58;
  let tdW = canvasWidth - 72;
  let sigStartY = tdY + 30;
  let sigH = 14;
  let sigGap = 8;
  let timeScale = tdW / maxTime;

  // Propagation boundaries (ns)
  let tAnd = andDelay;
  let tAndOr = andDelay + orDelay;
  let tComb = criticalPath;                // AND + OR + routing
  let tSetupBegin = tMin - tSetup;

  // Signal definitions
  let signals = [
    { name: "CLK",     type: "clock", color: COLOR_GATE },
    { name: "AND_out", type: "prop",  color: COLOR_GATE,     tChange: tAnd },
    { name: "OR_out",  type: "prop",  color: COLOR_TIMING,   tChange: tAndOr },
    { name: "FF_in",   type: "prop",  color: COLOR_CRITICAL, tChange: tComb },
    { name: "FF_out",  type: "prop",  color: COLOR_FF,       tChange: tMin }
  ];

  let bottomY = sigStartY + signals.length * (sigH + sigGap) - sigGap + 2;

  waveformBounds = { x: 0, y: tdY, w: canvasWidth, h: bottomY - tdY + 25 };
  hoverRegions = [];

  // ── Title & hint ──
  fill(50); noStroke();
  textSize(12); textStyle(BOLD); textAlign(CENTER, TOP);
  text("Timing Diagram", canvasWidth / 2, tdY);
  textStyle(NORMAL);

  fill(140); textSize(9); textAlign(CENTER, TOP);
  text(showDetails
    ? "Click waveform to hide details \u2022 Hover regions for info"
    : "Click waveform to show details", canvasWidth / 2, tdY + 14);

  // ── Background ──
  fill(252); stroke(220); strokeWeight(1);
  rect(tdX - 2, sigStartY - 4, tdW + 4, bottomY - sigStartY + 8, 4);

  // ── Delay shading bands (detail mode, grow with ct) ──
  if (showDetails && ct > 0) {
    let sT = sigStartY - 2;
    let sH = bottomY - sT + 4;
    let bands = [
      { t0: 0,           t1: tAnd,        c: [200, 220, 255, 70],
        label: "AND Delay",     value: andDelay + " ns",
        desc: "AND gate propagation delay" },
      { t0: tAnd,        t1: tAndOr,      c: [255, 230, 190, 70],
        label: "OR Delay",      value: orDelay + " ns",
        desc: "OR gate propagation delay" },
      { t0: tAndOr,      t1: tComb,       c: [255, 210, 220, 70],
        label: "Routing Delay", value: routingDelay.toFixed(1) + " ns",
        desc: "Wire routing delay to flip-flop" },
      { t0: tComb,       t1: tSetupBegin, c: [200, 240, 200, 70],
        label: "Slack",         value: max(0, tSetupBegin - tComb).toFixed(1) + " ns",
        desc: "Timing margin \u2014 data valid and stable" },
      { t0: tSetupBegin, t1: tMin,        c: [255, 245, 190, 90],
        label: "Setup Time",    value: tSetup + " ns",
        desc: "Data must be stable before next clock edge" }
    ];

    for (let b of bands) {
      if (b.t1 <= b.t0) continue;
      if (ct <= b.t0) continue;
      let drawT1 = min(b.t1, ct);
      fill(b.c[0], b.c[1], b.c[2], b.c[3]); noStroke();
      rect(tdX + b.t0 * timeScale, sT, (drawT1 - b.t0) * timeScale, sH);

      if (ct >= b.t1) {
        hoverRegions.push({
          x: tdX + b.t0 * timeScale, y: sT,
          w: (b.t1 - b.t0) * timeScale, h: sH,
          label: b.label, value: b.value, desc: b.desc
        });
      }
    }
  }

  // ── Time axis & grid ──
  stroke(150); strokeWeight(1);
  line(tdX, bottomY, tdX + tdW, bottomY);

  let gridStep = maxTime <= 12 ? 1 : maxTime <= 25 ? 2 : maxTime <= 60 ? 5 : 10;
  fill(100); noStroke(); textSize(8); textAlign(CENTER, TOP);
  for (let t = 0; t <= maxTime; t += gridStep) {
    let x = tdX + t * timeScale;
    if (x <= tdX + tdW) {
      stroke(230); strokeWeight(0.5);
      line(x, sigStartY, x, bottomY);
      fill(100); noStroke();
      text(t + "ns", x, bottomY + 3);
    }
  }

  // ── Draw signals ──
  for (let s = 0; s < signals.length; s++) {
    let sig = signals[s];
    let y = sigStartY + s * (sigH + sigGap);

    drawSignalLabel(sig.name, tdX - 5, y + sigH / 2);

    if (ct <= 0) continue;

    let drawEnd = min(ct, maxTime);

    if (sig.type === "clock") {
      // CLK: starts high at t=0, square wave with period = tMin
      stroke(sig.color); strokeWeight(2); noFill();
      let half = tMin / 2;
      let hY = y;
      let lY = y + sigH;
      let period = 0;

      while (period * tMin < drawEnd) {
        let pStart = period * tMin;
        let highEnd = pStart + half;
        let lowEnd = pStart + tMin;

        // High phase
        if (pStart < drawEnd) {
          let he = min(highEnd, drawEnd);
          line(tdX + pStart * timeScale, hY, tdX + he * timeScale, hY);
          if (he < drawEnd && he === highEnd) {
            line(tdX + he * timeScale, hY, tdX + he * timeScale, lY);
          }
        }
        // Low phase
        if (highEnd < drawEnd) {
          let le = min(lowEnd, drawEnd);
          line(tdX + highEnd * timeScale, lY, tdX + le * timeScale, lY);
          if (le < drawEnd && le === lowEnd) {
            line(tdX + le * timeScale, lY, tdX + le * timeScale, hY);
          }
        }
        period++;
      }
    } else {
      // Propagation signal: low until tChange, rising edge, then high
      stroke(sig.color); strokeWeight(2); noFill();
      let tChange = sig.tChange;
      let rise = 0.3;

      if (drawEnd <= tChange) {
        line(tdX, y + sigH, tdX + drawEnd * timeScale, y + sigH);
      } else {
        line(tdX, y + sigH, tdX + tChange * timeScale, y + sigH);
        let riseEnd = min(tChange + rise, drawEnd);
        line(tdX + tChange * timeScale, y + sigH, tdX + riseEnd * timeScale, y);
        if (drawEnd > tChange + rise) {
          line(tdX + (tChange + rise) * timeScale, y, tdX + drawEnd * timeScale, y);
        }
      }
    }
  }

  // ── Delay boundary markers (detail mode) ──
  if (showDetails) {
    let boundaries = [
      { t: tAnd,        color: COLOR_GATE },
      { t: tAndOr,      color: COLOR_TIMING },
      { t: tComb,       color: COLOR_CRITICAL },
      { t: tSetupBegin, color: COLOR_FF },
      { t: tMin,        color: COLOR_FF }
    ];

    for (let b of boundaries) {
      if (ct >= b.t && b.t <= maxTime) {
        let bx = tdX + b.t * timeScale;
        stroke(b.color); strokeWeight(1);
        drawingContext.setLineDash([3, 3]);
        line(bx, sigStartY - 2, bx, bottomY + 2);
        drawingContext.setLineDash([]);
      }
    }
  }

  // ── Time cursor ──
  if (ct > 0) {
    let cursorPx = constrain(tdX + ct * timeScale, tdX, tdX + tdW);
    stroke(COLOR_CRITICAL); strokeWeight(2);
    drawingContext.setLineDash([4, 3]);
    line(cursorPx, sigStartY - 4, cursorPx, bottomY + 2);
    drawingContext.setLineDash([]);

    fill(COLOR_CRITICAL); noStroke();
    textSize(9); textStyle(BOLD); textAlign(CENTER, BOTTOM);
    text(ct.toFixed(1) + " ns", cursorPx, sigStartY - 5);
    textStyle(NORMAL);
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
