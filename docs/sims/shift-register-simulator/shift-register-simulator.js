// Shift Register Simulator MicroSim
// Interactive 4-bit shift register
// Bloom Level: Understand/Apply (L2-L3)

let containerWidth;
let canvasWidth = 400;
let drawHeight = 380;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;

let bits = [false, false, false, false];
let serialIn = false;
let shiftBtn, loadBtn, clearBtn, toggleInBtn;

const colors = {
  high: '#4CAF50',
  low: '#F44336',
  ff: '#2196F3',
  wire: '#666',
  bg: '#f5f5f5',
  text: '#212121'
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  toggleInBtn = createButton('Serial In: 0');
  toggleInBtn.mousePressed(() => {
    serialIn = !serialIn;
    toggleInBtn.html('Serial In: ' + (serialIn ? '1' : '0'));
  });

  shiftBtn = createButton('Shift Right →');
  shiftBtn.mousePressed(shiftRight);

  clearBtn = createButton('Clear');
  clearBtn.mousePressed(() => bits = [false, false, false, false]);

  positionUIElements();
  describe('Interactive 4-bit shift register simulator', LABEL);
}

function positionUIElements() {
  let mainRect = document.querySelector('main').getBoundingClientRect();
  toggleInBtn.position(mainRect.left + 20, mainRect.top + drawHeight + 10);
  shiftBtn.position(mainRect.left + 120, mainRect.top + drawHeight + 10);
  clearBtn.position(mainRect.left + 240, mainRect.top + drawHeight + 10);
}

function shiftRight() {
  // Shift all bits right, insert serialIn at MSB position
  for (let i = bits.length - 1; i > 0; i--) {
    bits[i] = bits[i - 1];
  }
  bits[0] = serialIn;
}

function draw() {
  updateCanvasSize();

  // Background
  fill(colors.bg);
  noStroke();
  rect(0, 0, canvasWidth, drawHeight);

  // Control area
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill(colors.text);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(18);
  text('4-Bit Shift Register', canvasWidth / 2, 10);

  // Type indicator
  textSize(12);
  fill('#666');
  text('Serial-In Serial-Out (SISO)', canvasWidth / 2, 35);

  // Draw shift register
  drawShiftRegister();

  // Draw serial output indicator
  drawSerialOutput();

  // Binary and decimal display
  drawValueDisplay();

  // Instructions
  fill(colors.text);
  textAlign(CENTER, CENTER);
  textSize(10);
  text('Toggle serial input, then click Shift to move data right', canvasWidth / 2, drawHeight + 55);
}

function drawShiftRegister() {
  let startX = 60;
  let y = 130;
  let ffW = 60;
  let ffH = 70;
  let gap = 20;

  // Serial input
  fill(serialIn ? colors.high : colors.low);
  stroke(colors.wire);
  strokeWeight(2);
  ellipse(startX - 30, y + ffH/2, 35);
  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);
  text(serialIn ? '1' : '0', startX - 30, y + ffH/2);
  fill(colors.text);
  textSize(10);
  text('Sin', startX - 30, y + ffH/2 + 28);

  // Wire from serial input
  stroke(serialIn ? colors.high : colors.low);
  strokeWeight(2);
  line(startX - 12, y + ffH/2, startX, y + ffH/2);

  // Draw flip-flops
  for (let i = 0; i < 4; i++) {
    let x = startX + i * (ffW + gap);

    // Flip-flop box
    fill(colors.ff);
    stroke('#1565C0');
    strokeWeight(2);
    rect(x, y, ffW, ffH, 5);

    // D input label
    fill('white');
    noStroke();
    textSize(10);
    textAlign(LEFT, CENTER);
    text('D', x + 5, y + 15);

    // Q output label
    textAlign(RIGHT, CENTER);
    text('Q', x + ffW - 5, y + 15);

    // Clock triangle
    triangle(x, y + ffH - 15, x + 10, y + ffH - 10, x, y + ffH - 5);

    // FF label
    textAlign(CENTER, CENTER);
    textSize(12);
    text('FF' + i, x + ffW/2, y + ffH/2);

    // Current value
    fill(bits[i] ? colors.high : colors.low);
    noStroke();
    ellipse(x + ffW/2, y + ffH + 25, 30);
    fill('white');
    textSize(14);
    text(bits[i] ? '1' : '0', x + ffW/2, y + ffH + 25);

    // Bit position label
    fill(colors.text);
    textSize(9);
    text('Q' + (3-i), x + ffW/2, y + ffH + 45);

    // Wire to next FF (except last)
    if (i < 3) {
      stroke(bits[i] ? colors.high : colors.low);
      strokeWeight(2);
      line(x + ffW, y + ffH/2, x + ffW + gap, y + ffH/2);
    }
  }

  // Shift direction arrow
  fill(colors.text);
  noStroke();
  textSize(12);
  textAlign(CENTER, CENTER);
  text('← Shift Direction', canvasWidth/2, y - 20);
}

function drawSerialOutput() {
  let x = 340;
  let y = 165;

  // Wire from last FF
  stroke(bits[3] ? colors.high : colors.low);
  strokeWeight(2);
  line(320, y, x - 15, y);

  // Serial output indicator
  fill(bits[3] ? colors.high : colors.low);
  stroke(colors.wire);
  ellipse(x + 10, y, 35);
  fill('white');
  noStroke();
  textSize(14);
  text(bits[3] ? '1' : '0', x + 10, y);
  fill(colors.text);
  textSize(10);
  text('Sout', x + 10, y + 28);
}

function drawValueDisplay() {
  let y = 280;

  // Binary display
  fill(colors.text);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);

  let binaryStr = bits.map(b => b ? '1' : '0').join('');
  text('Binary: ' + binaryStr, canvasWidth/2, y);

  // Decimal display
  let decimal = 0;
  for (let i = 0; i < 4; i++) {
    if (bits[i]) decimal += Math.pow(2, 3 - i);
  }
  text('Decimal: ' + decimal, canvasWidth/2, y + 25);

  // History visualization
  fill('#e3f2fd');
  stroke('#90caf9');
  rect(50, y + 50, canvasWidth - 100, 50, 5);

  fill(colors.text);
  noStroke();
  textSize(11);
  textAlign(CENTER, TOP);
  text('Shift register moves data from left (MSB) to right (LSB)', canvasWidth/2, y + 60);
  text('Serial Out receives bits one at a time', canvasWidth/2, y + 78);
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
