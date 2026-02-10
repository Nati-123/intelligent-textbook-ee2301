// Seven Segment Decoder MicroSim
// Design and test a 7-segment display decoder
// Bloom Level: Apply (L3) - Apply decoder design
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 430;
let controlHeight = 90;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let currentValue = 5;
let showEquations = false;

// Clickable bits
let valueBits = [0, 1, 0, 1]; // 5 (0101)
let bitBoxSize = 30;
let bitSpacing = 8;

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

// Bright distinct colors for each segment
let segmentColors = [
  '#ff1111', // a - bright red
  '#ff6600', // b - bright orange
  '#ffdd00', // c - bright yellow
  '#00e040', // d - bright green
  '#3399ff', // e - bright blue
  '#cc44ff', // f - bright purple
  '#00e5ff'  // g - bright cyan
];

let segmentOffColors = [
  '#550000', // a - dark red
  '#552200', // b - dark orange
  '#554400', // c - dark yellow
  '#005500', // d - dark green
  '#002255', // e - dark blue
  '#330055', // f - dark purple
  '#005555'  // g - dark cyan
];

function bitsToValue(bits) {
  return bits[0] * 8 + bits[1] * 4 + bits[2] * 2 + bits[3];
}

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  describe('Seven segment display decoder showing BCD to segment conversion', LABEL);
}

function draw() {
  updateCanvasSize();
  currentValue = bitsToValue(valueBits);

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

  // Draw clickable bit toggles and controls
  drawControls();
}

function drawControls() {
  let bitY = drawHeight + 12;

  // BCD Input label
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(11);
  text('BCD Input:', 20, bitY + bitBoxSize / 2);

  // Bit boxes
  let boxStartX = 90;
  for (let i = 0; i < 4; i++) {
    let x = boxStartX + i * (bitBoxSize + bitSpacing);
    fill(valueBits[i] === 1 ? '#2196f3' : '#e0e0e0');
    stroke('#999');
    strokeWeight(1);
    rect(x, bitY, bitBoxSize, bitBoxSize, 4);

    fill(valueBits[i] === 1 ? 'white' : '#333');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(16);
    text(valueBits[i], x + bitBoxSize / 2, bitY + bitBoxSize / 2);
  }

  // Bit labels
  fill('#999');
  noStroke();
  textSize(9);
  textAlign(CENTER, TOP);
  let bitLabels = ['D', 'C', 'B', 'A'];
  for (let i = 0; i < 4; i++) {
    let bx = boxStartX + i * (bitBoxSize + bitSpacing) + bitBoxSize / 2;
    text(bitLabels[i], bx, bitY + bitBoxSize + 2);
  }

  // Value display
  fill('#666');
  textSize(11);
  textAlign(LEFT, CENTER);
  let afterBitsX = boxStartX + 4 * (bitBoxSize + bitSpacing) + 10;
  text('= ' + currentValue.toString(16).toUpperCase() + ' (' + currentValue + ')', afterBitsX, bitY + bitBoxSize / 2);

  // Equation toggle button
  let btnX = afterBitsX + 70;
  let btnY = bitY + 3;
  let btnW = 100;
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

  // Arrow from input to decoder
  stroke('#2196f3');
  strokeWeight(2);
  line(105, 95, 105, 110);
  fill('#2196f3');
  noStroke();
  triangle(105, 110, 100, 103, 110, 103);

  // Segment outputs with individual colors
  let segments = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
  let pattern = segmentPatterns[currentValue];

  textSize(10);
  for (let i = 0; i < 7; i++) {
    let sx = 45 + i * 20;
    fill(pattern[i] ? segmentColors[i] : '#ccc');
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

  noStroke();

  // Segment a (top)
  fill(pattern[0] ? segmentColors[0] : segmentOffColors[0]);
  rect(x + gap, y, segW, segH, 2);

  // Segment b (top right)
  fill(pattern[1] ? segmentColors[1] : segmentOffColors[1]);
  rect(x + segW + gap, y + gap, segH, segW, 2);

  // Segment c (bottom right)
  fill(pattern[2] ? segmentColors[2] : segmentOffColors[2]);
  rect(x + segW + gap, y + segW + 2 * gap, segH, segW, 2);

  // Segment d (bottom)
  fill(pattern[3] ? segmentColors[3] : segmentOffColors[3]);
  rect(x + gap, y + 2 * segW + 2 * gap, segW, segH, 2);

  // Segment e (bottom left)
  fill(pattern[4] ? segmentColors[4] : segmentOffColors[4]);
  rect(x - gap, y + segW + 2 * gap, segH, segW, 2);

  // Segment f (top left)
  fill(pattern[5] ? segmentColors[5] : segmentOffColors[5]);
  rect(x - gap, y + gap, segH, segW, 2);

  // Segment g (middle)
  fill(pattern[6] ? segmentColors[6] : segmentOffColors[6]);
  rect(x + gap, y + segW + gap, segW, segH, 2);

  // Segment labels (always visible for color reference)
  let segments = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
  textSize(9);
  textAlign(CENTER, CENTER);

  // a label
  fill(segmentColors[0]);
  text('a', x + segW / 2 + gap, y - 10);

  // b label
  fill(segmentColors[1]);
  text('b', x + segW + segH + 8, y + segW / 2);

  // c label
  fill(segmentColors[2]);
  text('c', x + segW + segH + 8, y + 1.5 * segW + gap);

  // d label
  fill(segmentColors[3]);
  text('d', x + segW / 2 + gap, y + 2 * segW + segH + 12);

  // e label
  fill(segmentColors[4]);
  text('e', x - segH - 8, y + 1.5 * segW + gap);

  // f label
  fill(segmentColors[5]);
  text('f', x - segH - 8, y + segW / 2);

  // g label
  fill(segmentColors[6]);
  text('g', x + segW + 18, y + segW + gap);

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

  if (showEquations) {
    text('Segment Equations (simplified):', x + 10, y + 8);
    textSize(8);
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

    for (let i = 0; i < equations.length; i++) {
      fill(segmentColors[i]);
      text(equations[i], x + 10, eqY);
      eqY += 14;
    }

    textSize(8);
    fill('#999');
    text('(Active high outputs)', x + 10, eqY + 8);
  } else {
    text('Segment states for ' + currentValue.toString(16).toUpperCase() + ':', x + 10, y + 8);

    let pattern = segmentPatterns[currentValue];
    let segments = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
    let stateY = y + 28;

    textSize(10);
    for (let i = 0; i < 7; i++) {
      // Color dot
      fill(pattern[i] ? segmentColors[i] : '#ccc');
      noStroke();
      ellipse(x + 18, stateY + 5, 8, 8);

      // Text
      fill(pattern[i] ? segmentColors[i] : '#999');
      textAlign(LEFT, TOP);
      text(segments[i] + ' = ' + pattern[i] + (pattern[i] ? '  (ON)' : '  (OFF)'), x + 28, stateY);
      stateY += 18;
    }

    // Color legend
    fill('#999');
    textSize(8);
    text('Each segment has a unique color', x + 10, stateY + 10);
  }
}

function mousePressed() {
  let bitY = drawHeight + 12;
  let boxStartX = 90;

  // Check bit toggles
  for (let i = 0; i < 4; i++) {
    let x = boxStartX + i * (bitBoxSize + bitSpacing);
    if (mouseX >= x && mouseX <= x + bitBoxSize &&
        mouseY >= bitY && mouseY <= bitY + bitBoxSize) {
      valueBits[i] = valueBits[i] === 0 ? 1 : 0;
      return;
    }
  }

  // Check equation toggle button
  let afterBitsX = boxStartX + 4 * (bitBoxSize + bitSpacing) + 10 + 70;
  let btnX = afterBitsX;
  let btnY = bitY + 3;
  let btnW = 100;
  let btnH = 25;

  if (mouseX >= btnX && mouseX <= btnX + btnW && mouseY >= btnY && mouseY <= btnY + btnH) {
    showEquations = !showEquations;
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
