// Seven Segment Decoder MicroSim
// Design and test a 7-segment display decoder
// Bloom Level: Apply (L3) - Apply decoder design
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 430;
let controlHeight = 70;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let valueSlider;
let currentValue = 5;
let showEquations = false;

// Segment patterns for 0-F (a,b,c,d,e,f,g)
let segmentPatterns = [
  [1,1,1,1,1,1,0], // 0
  [0,1,1,0,0,0,0], // 1
  [1,1,0,1,1,0,1], // 2
  [1,1,1,1,0,0,1], // 3
  [0,1,1,0,0,1,1], // 4
  [1,0,1,1,0,1,1], // 5
  [1,0,1,1,1,1,1], // 6
  [1,1,1,0,0,0,0], // 7
  [1,1,1,1,1,1,1], // 8
  [1,1,1,1,0,1,1], // 9
  [1,1,1,0,1,1,1], // A
  [0,0,1,1,1,1,1], // b
  [1,0,0,1,1,1,0], // C
  [0,1,1,1,1,0,1], // d
  [1,0,0,1,1,1,1], // E
  [1,0,0,0,1,1,1]  // F
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  valueSlider = createSlider(0, 15, 5);
  valueSlider.size(180);
  valueSlider.input(() => { currentValue = valueSlider.value(); });

  positionUIElements();

  describe('Seven segment display decoder showing BCD to segment conversion', LABEL);
}

function positionUIElements() {
  let mainRect = document.querySelector('main').getBoundingClientRect();
  valueSlider.position(mainRect.left + 100, mainRect.top + drawHeight + 15);
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
  text('7-Segment Display Decoder', canvasWidth / 2, 10);

  // Draw input
  drawInput();

  // Draw decoder block
  drawDecoder();

  // Draw 7-segment display
  drawSevenSegment();

  // Draw truth table excerpt
  drawTruthTable();

  // Control labels
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(11);
  text('BCD Input (0-F):', 20, drawHeight + 27);
  textAlign(RIGHT, CENTER);
  text(currentValue.toString(16).toUpperCase() + ' (' + currentValue + ')', canvasWidth - 30, drawHeight + 27);

  // Toggle button for equations
  drawEquationToggle();
}

function drawInput() {
  let y = 45;
  let binary = currentValue.toString(2).padStart(4, '0');

  fill('#e3f2fd');
  stroke('#2196f3');
  strokeWeight(2);
  rect(30, y, 150, 50, 5);

  fill('#2196f3');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(11);
  text('BCD Input', 105, y + 5);

  // Binary bits
  textSize(18);
  fill('black');
  text(binary, 105, y + 22);

  // Bit labels
  textSize(9);
  fill('#666');
  let bitLabels = ['D', 'C', 'B', 'A'];
  let startX = 70;
  for (let i = 0; i < 4; i++) {
    text(bitLabels[i], startX + i * 18, y + 42);
  }
}

function drawDecoder() {
  let y = 110;
  let centerX = canvasWidth / 2 - 30;

  // Decoder box
  fill('#fff3e0');
  stroke('#ff9800');
  strokeWeight(2);
  rect(30, y, 150, 80, 8);

  fill('#ff9800');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(11);
  text('BCD to 7-Segment', 105, y + 8);
  text('Decoder', 105, y + 22);

  // Arrows from input to decoder
  stroke('#2196f3');
  strokeWeight(2);
  line(105, 95, 105, 110);
  fill('#2196f3');
  noStroke();
  triangle(105, 110, 100, 103, 110, 103);

  // Segment outputs
  textSize(10);
  fill('#666');
  let segments = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
  let pattern = segmentPatterns[currentValue];

  for (let i = 0; i < 7; i++) {
    let sx = 45 + i * 20;
    fill(pattern[i] ? '#4CAF50' : '#ccc');
    text(segments[i] + '=' + pattern[i], sx, y + 55);
  }

  // Arrow to display
  stroke('#ff9800');
  strokeWeight(2);
  line(105, y + 80, 105, y + 95);
  fill('#ff9800');
  noStroke();
  triangle(105, y + 100, 100, y + 93, 110, y + 93);
}

function drawSevenSegment() {
  let x = 50;
  let y = 225;
  let segW = 35;
  let segH = 8;
  let gap = 2;

  let pattern = segmentPatterns[currentValue];

  // Background
  fill('#1a1a1a');
  stroke('#333');
  strokeWeight(2);
  rect(x - 15, y - 10, 80, 120, 5);

  // Segments
  let onColor = '#ff0000';
  let offColor = '#330000';

  // Segment a (top)
  fill(pattern[0] ? onColor : offColor);
  noStroke();
  rect(x + gap, y, segW, segH, 2);

  // Segment b (top right)
  fill(pattern[1] ? onColor : offColor);
  rect(x + segW + gap, y + gap, segH, segW, 2);

  // Segment c (bottom right)
  fill(pattern[2] ? onColor : offColor);
  rect(x + segW + gap, y + segW + 2 * gap, segH, segW, 2);

  // Segment d (bottom)
  fill(pattern[3] ? onColor : offColor);
  rect(x + gap, y + 2 * segW + 2 * gap, segW, segH, 2);

  // Segment e (bottom left)
  fill(pattern[4] ? onColor : offColor);
  rect(x - gap, y + segW + 2 * gap, segH, segW, 2);

  // Segment f (top left)
  fill(pattern[5] ? onColor : offColor);
  rect(x - gap, y + gap, segH, segW, 2);

  // Segment g (middle)
  fill(pattern[6] ? onColor : offColor);
  rect(x + gap, y + segW + gap, segW, segH, 2);

  // Segment labels
  if (showEquations) {
    fill('#999');
    textSize(8);
    textAlign(CENTER, CENTER);
    text('a', x + segW / 2 + gap, y - 8);
    text('b', x + segW + segH + 5, y + segW / 2);
    text('c', x + segW + segH + 5, y + 1.5 * segW + gap);
    text('d', x + segW / 2 + gap, y + 2 * segW + segH + 10);
    text('e', x - segH - 5, y + 1.5 * segW + gap);
    text('f', x - segH - 5, y + segW / 2);
    text('g', x + segW + 15, y + segW + gap);
  }

  // Display value label
  fill('white');
  textSize(14);
  textAlign(CENTER, TOP);
  text('Display: ' + currentValue.toString(16).toUpperCase(), x + 25, y + 110);
}

function drawTruthTable() {
  let x = 200;
  let y = 210;
  let w = canvasWidth - x - 30;
  let h = 180;

  fill('#f5f5f5');
  stroke('#ccc');
  strokeWeight(1);
  rect(x, y, w, h, 5);

  fill('#333');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(10);
  text('Segment Equations (simplified):', x + 10, y + 8);

  if (showEquations) {
    textSize(8);
    fill('#666');
    let eqY = y + 25;
    let equations = [
      "a = A'C + B + A'D + CD'",
      "b = A' + C'D' + CD",
      "c = A + C + D'",
      "d = A'C + CD' + B'D + BC'D",
      "e = A'C + CD'",
      "f = A'B + B'C' + A'D + C'D",
      "g = A'C + B + CD'"
    ];

    for (let eq of equations) {
      text(eq, x + 10, eqY);
      eqY += 14;
    }

    textSize(8);
    fill('#999');
    text('(Active high outputs)', x + 10, eqY + 8);
  } else {
    // Show current segment states
    textSize(9);
    fill('#666');
    let pattern = segmentPatterns[currentValue];
    let segments = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
    let stateY = y + 30;

    text('Current output for ' + currentValue.toString(16).toUpperCase() + ':', x + 10, stateY);
    stateY += 18;

    for (let i = 0; i < 7; i++) {
      fill(pattern[i] ? '#4CAF50' : '#f44336');
      text(segments[i] + ' = ' + pattern[i] + (pattern[i] ? ' (ON)' : ' (OFF)'), x + 15, stateY);
      stateY += 14;
    }
  }
}

function drawEquationToggle() {
  let btnX = 200;
  let btnY = drawHeight + 40;
  let btnW = 120;
  let btnH = 25;

  fill(showEquations ? '#4CAF50' : '#2196f3');
  stroke(showEquations ? '#388E3C' : '#1976d2');
  strokeWeight(1);
  rect(btnX, btnY, btnW, btnH, 3);

  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(10);
  text(showEquations ? 'Show States' : 'Show Equations', btnX + btnW / 2, btnY + btnH / 2);
}

function mousePressed() {
  // Check equation toggle button
  let btnX = 200;
  let btnY = drawHeight + 40;
  let btnW = 120;
  let btnH = 25;

  if (mouseX >= btnX && mouseX <= btnX + btnW && mouseY >= btnY && mouseY <= btnY + btnH) {
    showEquations = !showEquations;
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  positionUIElements();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
