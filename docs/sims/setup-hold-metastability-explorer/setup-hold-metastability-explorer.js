// Setup & Hold Time / Metastability Explorer MicroSim
// Unit 9: Sequential Logic Fundamentals
// Bloom Level: Understand (L2)
//
// Students drag a data-transition marker to explore setup time,
// hold time, and metastability in a positive-edge-triggered D flip-flop.

let containerWidth;
let canvasWidth = 600;
let drawHeight = 520;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;

// Timing parameters (in pixels, mapped to ns for display)
let tsu = 40;        // setup time requirement (px)
let th  = 25;        // hold time requirement (px)
let dataOffset = 0;  // data transition offset relative to clock edge (px, negative = before edge)

// Flip-flop state
let qState = 1;        // 0 = captured 0, 1 = captured 1, -1 = metastable
let dataGoesHigh = true; // data transitions low-to-high (true) or high-to-low (false)

// Dragging state
let isDragging = false;
let markerX = 0;

// Sliders
let tsuSlider, thSlider;
let tsuLabel, thLabel;

// Layout constants
const TIMING_TOP = 195;
const SIGNAL_H = 45;
const SIGNAL_GAP = 12;
const WAVE_LEFT = 90;
const CLOCK_EDGE_FRAC = 0.5; // clock rising edge at 50% of waveform width

// Colors
const COL_PURPLE = '#5A3EED';
const COL_GREEN  = '#2E7D32';
const COL_YELLOW = '#F9A825';
const COL_RED    = '#D32F2F';
const COL_BLUE   = '#1565C0';
const COL_BG     = '#FAFAFA';
const COL_TEXT   = '#212121';
const COL_GRAY   = '#9E9E9E';

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  // Setup time slider
  tsuSlider = createSlider(15, 80, tsu, 1);
  tsuSlider.style('width', '130px');
  tsuSlider.parent(mainElement);

  // Hold time slider
  thSlider = createSlider(10, 60, th, 1);
  thSlider.style('width', '130px');
  thSlider.parent(mainElement);

  positionUIElements();
  textFont('Arial');
  describe('Interactive setup and hold time explorer with draggable data transition and timing diagram', LABEL);
}

function positionUIElements() {
  let mainRect = document.querySelector('main').getBoundingClientRect();
  let sliderY = mainRect.top + drawHeight + 18;
  let leftBase = mainRect.left + 20;

  tsuSlider.position(leftBase + 110, sliderY);
  thSlider.position(leftBase + 370, sliderY);
}

function draw() {
  updateCanvasSize();

  // Read slider values
  tsu = tsuSlider.value();
  th  = thSlider.value();

  // Background
  background(COL_BG);

  // Control area
  fill('white');
  stroke('#E0E0E0');
  strokeWeight(1);
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Draw slider labels in control area
  noStroke();
  fill(COL_TEXT);
  textAlign(LEFT, CENTER);
  textSize(12);
  let controlY = drawHeight + 28;
  text('Setup Time (tsu): ' + tsu + ' px', 20, controlY);
  text('Hold Time (th): ' + th + ' px', 280, controlY);

  // Title
  fill(COL_PURPLE);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(17);
  textStyle(BOLD);
  text('Setup & Hold Time / Metastability Explorer', canvasWidth / 2, 10);
  textStyle(NORMAL);
  textSize(11);
  fill('#666');
  text('Drag the orange marker to move the data transition relative to the clock edge', canvasWidth / 2, 32);

  // Compute key x-positions
  let waveWidth = canvasWidth - WAVE_LEFT - 40;
  let clockEdgeX = WAVE_LEFT + waveWidth * CLOCK_EDGE_FRAC;

  // The marker's x position determines dataOffset
  if (!isDragging) {
    markerX = clockEdgeX + dataOffset;
  }

  // Clamp markerX to waveform region
  let minMarkerX = WAVE_LEFT + 10;
  let maxMarkerX = WAVE_LEFT + waveWidth - 10;
  markerX = constrain(markerX, minMarkerX, maxMarkerX);
  dataOffset = markerX - clockEdgeX;

  // Determine timing status
  // dataOffset < 0 means data transitions BEFORE clock edge
  // dataOffset > 0 means data transitions AFTER clock edge
  // Setup violation: data transitions too close before the edge (within tsu window)
  // Hold violation: data transitions too close after the edge (within th window)
  let status; // 'valid', 'marginal', 'violation'
  let violationType = ''; // 'setup', 'hold', or ''

  let marginPx = 8; // extra margin for "marginal" zone

  if (dataOffset <= -tsu - marginPx) {
    // Data transitions well before setup window => valid
    status = 'valid';
    qState = dataGoesHigh ? 1 : 0; // data has settled, captures new value
  } else if (dataOffset <= -tsu) {
    // Just at the edge of setup window => marginal
    status = 'marginal';
    violationType = 'setup';
    qState = dataGoesHigh ? 1 : 0;
  } else if (dataOffset < 0) {
    // Inside setup window => violation
    status = 'violation';
    violationType = 'setup';
    qState = -1;
  } else if (dataOffset <= th) {
    // Inside hold window => violation
    status = 'violation';
    violationType = 'hold';
    qState = -1;
  } else if (dataOffset <= th + marginPx) {
    // Just past hold window => marginal
    status = 'marginal';
    violationType = 'hold';
    qState = dataGoesHigh ? 1 : 0;
  } else {
    // Well after hold window => valid (but data changed after capture, so old value captured)
    status = 'valid';
    qState = dataGoesHigh ? 0 : 1; // data hadn't transitioned yet at clock edge, captures old value
  }

  // ---- Draw flip-flop symbol ----
  drawFlipFlopSymbol(status);

  // ---- Draw timing diagram ----
  drawTimingDiagram(clockEdgeX, waveWidth, status);

  // ---- Draw setup/hold windows ----
  drawTimingWindows(clockEdgeX, waveWidth);

  // ---- Draw data transition marker ----
  drawMarker(clockEdgeX, waveWidth);

  // ---- Draw status panel ----
  drawStatusPanel(clockEdgeX, status, violationType);

  // ---- Draw offset readout ----
  drawOffsetReadout(clockEdgeX);
}

function drawFlipFlopSymbol(status) {
  let ffX = canvasWidth / 2 - 50;
  let ffY = 55;
  let ffW = 100;
  let ffH = 80;

  // Flip-flop body
  let bodyColor;
  if (status === 'valid') bodyColor = color(COL_GREEN);
  else if (status === 'marginal') bodyColor = color(COL_YELLOW);
  else bodyColor = color(COL_RED);

  fill(bodyColor);
  stroke(0);
  strokeWeight(2);
  rect(ffX, ffY, ffW, ffH, 6);

  // Labels
  fill('white');
  noStroke();
  textSize(13);
  textAlign(LEFT, CENTER);
  text('D', ffX + 8, ffY + 20);
  textAlign(RIGHT, CENTER);
  text('Q', ffX + ffW - 8, ffY + 20);

  // Clock triangle
  fill('white');
  noStroke();
  triangle(ffX, ffY + 60, ffX + 14, ffY + 68, ffX, ffY + 76);
  textAlign(LEFT, CENTER);
  textSize(10);
  text('CLK', ffX + 16, ffY + 68);

  // Type label
  textAlign(CENTER, CENTER);
  textSize(14);
  textStyle(BOLD);
  text('D FF', ffX + ffW / 2, ffY + ffH / 2 - 2);
  textStyle(NORMAL);

  // D input wire and value
  stroke(COL_BLUE);
  strokeWeight(2);
  line(ffX - 40, ffY + 20, ffX, ffY + 20);
  noStroke();
  fill(COL_BLUE);
  textAlign(CENTER, CENTER);
  textSize(14);
  textStyle(BOLD);
  text(dataGoesHigh ? '1' : '0', ffX - 52, ffY + 20);
  textStyle(NORMAL);

  // Q output wire and value
  let qColor, qText;
  if (qState === 1) { qColor = COL_GREEN; qText = '1'; }
  else if (qState === 0) { qColor = COL_GREEN; qText = '0'; }
  else { qColor = COL_RED; qText = '?'; }

  stroke(qColor);
  strokeWeight(2);
  line(ffX + ffW, ffY + 20, ffX + ffW + 40, ffY + 20);
  noStroke();
  fill(qColor);
  textAlign(CENTER, CENTER);
  textSize(14);
  textStyle(BOLD);
  text(qText, ffX + ffW + 52, ffY + 20);
  textStyle(NORMAL);

  // State label below
  textSize(10);
  fill('#666');
  textAlign(CENTER, TOP);
  if (status === 'valid') {
    text('Valid capture: Q = ' + (qState === 1 ? '1' : '0'), canvasWidth / 2, ffY + ffH + 8);
  } else if (status === 'marginal') {
    fill(COL_YELLOW);
    text('Marginal timing - unreliable', canvasWidth / 2, ffY + ffH + 8);
  } else {
    fill(COL_RED);
    text('METASTABLE - Q is unknown!', canvasWidth / 2, ffY + ffH + 8);
  }
}

function drawTimingDiagram(clockEdgeX, waveWidth, status) {
  let waveRight = WAVE_LEFT + waveWidth;

  // Signal label style
  noStroke();
  textAlign(RIGHT, CENTER);
  textSize(13);
  textStyle(BOLD);

  // ---- CLK signal ----
  let clkY = TIMING_TOP;
  fill(COL_BLUE);
  text('CLK', WAVE_LEFT - 10, clkY + SIGNAL_H / 2);
  textStyle(NORMAL);

  // Draw clock waveform: low, then rising edge at clockEdgeX, then high, then falling
  let clkHigh = clkY + 5;
  let clkLow  = clkY + SIGNAL_H - 5;
  let fallX   = clockEdgeX + waveWidth * 0.25;

  stroke(COL_BLUE);
  strokeWeight(2);
  noFill();
  // Low before edge
  line(WAVE_LEFT, clkLow, clockEdgeX, clkLow);
  // Rising edge
  line(clockEdgeX, clkLow, clockEdgeX, clkHigh);
  // High after edge
  line(clockEdgeX, clkHigh, min(fallX, waveRight), clkHigh);
  // Falling edge
  if (fallX < waveRight) {
    line(fallX, clkHigh, fallX, clkLow);
    line(fallX, clkLow, waveRight, clkLow);
  }

  // Rising edge arrow
  fill(COL_BLUE);
  noStroke();
  triangle(clockEdgeX - 4, clkHigh + 10, clockEdgeX + 4, clkHigh + 10, clockEdgeX, clkHigh + 2);

  // ---- D signal ----
  let dY = TIMING_TOP + SIGNAL_H + SIGNAL_GAP;
  fill(COL_PURPLE);
  noStroke();
  textAlign(RIGHT, CENTER);
  textSize(13);
  textStyle(BOLD);
  text('D', WAVE_LEFT - 10, dY + SIGNAL_H / 2);
  textStyle(NORMAL);

  let dHigh = dY + 5;
  let dLow  = dY + SIGNAL_H - 5;
  let dataTransX = markerX;

  stroke(COL_PURPLE);
  strokeWeight(2);
  noFill();

  if (dataGoesHigh) {
    // Low then high
    line(WAVE_LEFT, dLow, dataTransX, dLow);
    line(dataTransX, dLow, dataTransX, dHigh);
    line(dataTransX, dHigh, waveRight, dHigh);
  } else {
    // High then low
    line(WAVE_LEFT, dHigh, dataTransX, dHigh);
    line(dataTransX, dHigh, dataTransX, dLow);
    line(dataTransX, dLow, waveRight, dLow);
  }

  // ---- Q signal ----
  let qY = TIMING_TOP + (SIGNAL_H + SIGNAL_GAP) * 2;
  noStroke();
  textAlign(RIGHT, CENTER);
  textSize(13);
  textStyle(BOLD);

  if (qState === -1) fill(COL_RED);
  else fill(COL_GREEN);
  text('Q', WAVE_LEFT - 10, qY + SIGNAL_H / 2);
  textStyle(NORMAL);

  let qHigh = qY + 5;
  let qLow  = qY + SIGNAL_H - 5;

  // Q changes at clock edge (with small propagation delay visual)
  let propDelay = 8;
  let qChangeX = clockEdgeX + propDelay;

  if (status === 'violation') {
    // Before clock edge: old value
    stroke(COL_GREEN);
    strokeWeight(2);
    let oldLevel = dataGoesHigh ? qLow : qHigh; // was at old value
    line(WAVE_LEFT, oldLevel, qChangeX, oldLevel);

    // Metastable region: hatched uncertain area
    drawMetastableRegion(qChangeX, waveRight, qHigh, qLow);
  } else {
    // Determine Q value before and after clock edge
    let qBeforeHigh, qAfterHigh;
    if (dataOffset <= -tsu) {
      // Data settled to new value before clock => captures new
      qBeforeHigh = !dataGoesHigh; // was at old value
      qAfterHigh = dataGoesHigh;
    } else {
      // Data transitions after hold window => captures old value
      qBeforeHigh = !dataGoesHigh;
      qAfterHigh = !dataGoesHigh;
    }

    stroke(COL_GREEN);
    strokeWeight(2);
    let beforeLevel = qBeforeHigh ? qHigh : qLow;
    let afterLevel  = qAfterHigh  ? qHigh : qLow;

    line(WAVE_LEFT, beforeLevel, qChangeX, beforeLevel);
    if (beforeLevel !== afterLevel) {
      line(qChangeX, beforeLevel, qChangeX, afterLevel);
    }
    line(qChangeX, afterLevel, waveRight, afterLevel);
  }

  // Baseline / axis lines
  stroke('#E0E0E0');
  strokeWeight(0.5);
  line(WAVE_LEFT, clkY + SIGNAL_H + 1, waveRight, clkY + SIGNAL_H + 1);
  line(WAVE_LEFT, dY + SIGNAL_H + 1, waveRight, dY + SIGNAL_H + 1);
  line(WAVE_LEFT, qY + SIGNAL_H + 1, waveRight, qY + SIGNAL_H + 1);
}

function drawMetastableRegion(startX, endX, yHigh, yLow) {
  // Draw hatched region to indicate metastability
  let midY = (yHigh + yLow) / 2;

  // Red shaded background
  noStroke();
  fill(255, 0, 0, 25);
  rect(startX, yHigh - 2, endX - startX, yLow - yHigh + 4);

  // Oscillating line to show indeterminate state
  stroke(COL_RED);
  strokeWeight(2);
  let amplitude = (yLow - yHigh) / 2 - 3;
  let prevX = startX;
  let prevY = midY;
  for (let x = startX + 2; x <= endX; x += 2) {
    let t = (x - startX) / 60;
    let y = midY + sin(t * TWO_PI + frameCount * 0.08) * amplitude * exp(-0.015 * (x - startX));
    line(prevX, prevY, x, y);
    prevX = x;
    prevY = y;
  }

  // Question mark
  noStroke();
  fill(COL_RED);
  textAlign(CENTER, CENTER);
  textSize(16);
  textStyle(BOLD);
  text('?', (startX + min(startX + 60, endX)) / 2, midY);
  textStyle(NORMAL);
}

function drawTimingWindows(clockEdgeX, waveWidth) {
  let winTop = TIMING_TOP - 8;
  let winBot = TIMING_TOP + (SIGNAL_H + SIGNAL_GAP) * 3 + 5;
  let waveRight = WAVE_LEFT + waveWidth;

  // Setup time window (before clock edge)
  let setupLeft = max(WAVE_LEFT, clockEdgeX - tsu);
  noStroke();
  fill(255, 0, 0, 30);
  rect(setupLeft, winTop, clockEdgeX - setupLeft, winBot - winTop);

  // Setup time bracket on top
  stroke(COL_RED);
  strokeWeight(1.5);
  let bracketY = winTop - 2;
  line(setupLeft, bracketY, clockEdgeX, bracketY);
  line(setupLeft, bracketY, setupLeft, bracketY + 6);
  line(clockEdgeX, bracketY, clockEdgeX, bracketY + 6);

  noStroke();
  fill(COL_RED);
  textAlign(CENTER, BOTTOM);
  textSize(10);
  textStyle(BOLD);
  text('tsu', (setupLeft + clockEdgeX) / 2, bracketY - 1);
  textStyle(NORMAL);

  // Hold time window (after clock edge)
  let holdRight = min(waveRight, clockEdgeX + th);
  fill(255, 140, 0, 30);
  noStroke();
  rect(clockEdgeX, winTop, holdRight - clockEdgeX, winBot - winTop);

  // Hold time bracket on top
  stroke('#FF8C00');
  strokeWeight(1.5);
  line(clockEdgeX, bracketY, holdRight, bracketY);
  line(holdRight, bracketY, holdRight, bracketY + 6);

  noStroke();
  fill('#FF8C00');
  textAlign(CENTER, BOTTOM);
  textSize(10);
  textStyle(BOLD);
  text('th', (clockEdgeX + holdRight) / 2, bracketY - 1);
  textStyle(NORMAL);

  // Vertical dashed line at clock edge through all signals
  stroke(COL_BLUE);
  strokeWeight(1);
  drawingContext.setLineDash([4, 4]);
  line(clockEdgeX, winTop, clockEdgeX, winBot);
  drawingContext.setLineDash([]);
}

function drawMarker(clockEdgeX, waveWidth) {
  let dY = TIMING_TOP + SIGNAL_H + SIGNAL_GAP;
  let markerTop = dY - 3;
  let markerBot = dY + SIGNAL_H + 3;

  // Orange draggable triangle/line marker
  let hovered = isOverMarker(markerX, markerTop, markerBot);

  stroke(hovered || isDragging ? '#E65100' : '#FF9800');
  strokeWeight(2);
  line(markerX, markerTop - 12, markerX, markerBot + 12);

  // Triangle handle at top
  fill(hovered || isDragging ? '#E65100' : '#FF9800');
  noStroke();
  triangle(markerX - 8, markerTop - 18, markerX + 8, markerTop - 18, markerX, markerTop - 6);

  // Triangle handle at bottom
  triangle(markerX - 8, markerBot + 18, markerX + 8, markerBot + 18, markerX, markerBot + 6);

  // Drag label
  textSize(8);
  textAlign(CENTER, BOTTOM);
  fill('#FF9800');
  text('DRAG', markerX, markerTop - 19);
}

function drawStatusPanel(clockEdgeX, status, violationType) {
  let panelY = TIMING_TOP + (SIGNAL_H + SIGNAL_GAP) * 3 + 20;
  let panelW = canvasWidth - 40;
  let panelH = 68;
  let panelX = 20;

  // Panel background
  let bgCol, borderCol, textCol, statusText, detailText;
  if (status === 'valid') {
    bgCol = color(232, 245, 233);
    borderCol = color(129, 199, 132);
    textCol = color(COL_GREEN);
    statusText = 'VALID CAPTURE';
    if (dataOffset <= -tsu) {
      detailText = 'Data stable before setup window. Q reliably captures D = ' + (qState === 1 ? '1' : '0') + '.';
    } else {
      detailText = 'Data transitions after hold window. Q holds old value = ' + (qState === 1 ? '1' : '0') + '.';
    }
  } else if (status === 'marginal') {
    bgCol = color(255, 249, 196);
    borderCol = color(255, 213, 79);
    textCol = color('#F57F17');
    statusText = 'MARGINAL TIMING';
    detailText = violationType === 'setup'
      ? 'Data transition is near the setup boundary. May work but unreliable.'
      : 'Data transition is near the hold boundary. May work but unreliable.';
  } else {
    bgCol = color(255, 235, 238);
    borderCol = color(239, 154, 154);
    textCol = color(COL_RED);
    statusText = 'TIMING VIOLATION - METASTABLE';
    detailText = violationType === 'setup'
      ? 'Data changes inside setup window! Flip-flop may enter metastable state.'
      : 'Data changes inside hold window! Flip-flop may enter metastable state.';
  }

  fill(bgCol);
  stroke(borderCol);
  strokeWeight(2);
  rect(panelX, panelY, panelW, panelH, 8);

  noStroke();
  fill(textCol);
  textAlign(LEFT, TOP);
  textSize(13);
  textStyle(BOLD);
  text(statusText, panelX + 14, panelY + 10);
  textStyle(NORMAL);
  textSize(11);
  fill(COL_TEXT);
  text(detailText, panelX + 14, panelY + 30);

  // Numerical values on right
  textAlign(RIGHT, TOP);
  textSize(10);
  fill('#666');
  let offset_ns = dataOffset.toFixed(0);
  let sign = dataOffset >= 0 ? '+' : '';
  text('Offset: ' + sign + offset_ns + ' px', panelX + panelW - 14, panelY + 10);
  text('tsu req: ' + tsu + ' px  |  th req: ' + th + ' px', panelX + panelW - 14, panelY + 26);

  // Violation type indicator
  if (violationType) {
    textSize(10);
    fill(textCol);
    text(violationType === 'setup' ? 'Setup violation' : 'Hold violation', panelX + panelW - 14, panelY + 46);
  }
}

function drawOffsetReadout(clockEdgeX) {
  // Small readout showing the offset arrow between data transition and clock edge
  let dY = TIMING_TOP + SIGNAL_H + SIGNAL_GAP;
  let arrowY = dY + SIGNAL_H + SIGNAL_GAP - 2;

  if (abs(dataOffset) > 5) {
    // Draw arrow between clock edge and data transition
    stroke('#FF9800');
    strokeWeight(1.5);
    let fromX = clockEdgeX;
    let toX = markerX;

    line(fromX, arrowY, toX, arrowY);
    // Arrowhead
    let dir = toX > fromX ? 1 : -1;
    line(toX, arrowY, toX - dir * 6, arrowY - 4);
    line(toX, arrowY, toX - dir * 6, arrowY + 4);

    noStroke();
    fill('#FF9800');
    textAlign(CENTER, TOP);
    textSize(9);
    let sign = dataOffset >= 0 ? '+' : '';
    text(sign + dataOffset.toFixed(0) + ' px', (fromX + toX) / 2, arrowY + 3);
  }
}

function isOverMarker(mx, markerTop, markerBot) {
  return abs(mouseX - mx) < 14 && mouseY > markerTop - 22 && mouseY < markerBot + 22;
}

function mousePressed() {
  let dY = TIMING_TOP + SIGNAL_H + SIGNAL_GAP;
  let markerTop = dY - 3;
  let markerBot = dY + SIGNAL_H + 3;

  if (isOverMarker(markerX, markerTop, markerBot)) {
    isDragging = true;
  }
}

function mouseDragged() {
  if (isDragging) {
    let waveWidth = canvasWidth - WAVE_LEFT - 40;
    let minX = WAVE_LEFT + 10;
    let maxX = WAVE_LEFT + waveWidth - 10;
    markerX = constrain(mouseX, minX, maxX);
    let clockEdgeX = WAVE_LEFT + waveWidth * CLOCK_EDGE_FRAC;
    dataOffset = markerX - clockEdgeX;
  }
}

function mouseReleased() {
  isDragging = false;
}

// Touch support for mobile
function touchStarted() {
  mousePressed();
  return false;
}

function touchMoved() {
  mouseDragged();
  return false;
}

function touchEnded() {
  mouseReleased();
  return false;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, canvasHeight);
  positionUIElements();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
