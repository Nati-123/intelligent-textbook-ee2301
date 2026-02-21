// Counter Simulator MicroSim
// Interactive 4-bit binary up/down counter
// Bloom Level: Understand/Apply (L2-L3)

let containerWidth;
let canvasWidth = 400;
let drawHeight = 420;
let controlHeight = 70;
let canvasHeight = drawHeight + controlHeight;

let count = 0;
let autoCount = false;
let countUp = true;
let lastAutoTime = 0;
let upBtn, downBtn, autoBtn, resetBtn;

const colors = {
  high: '#4CAF50',
  low: '#F44336',
  counter: '#673AB7',
  wire: '#666',
  bg: '#f5f5f5',
  text: '#212121'
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  upBtn = createButton('Count Up ▲');
  upBtn.mousePressed(() => {
    count = (count + 1) % 16;
    countUp = true;
  });

  downBtn = createButton('Count Down ▼');
  downBtn.mousePressed(() => {
    count = (count - 1 + 16) % 16;
    countUp = false;
  });

  autoBtn = createButton('Auto: OFF');
  autoBtn.mousePressed(() => {
    autoCount = !autoCount;
    autoBtn.html('Auto: ' + (autoCount ? 'ON' : 'OFF'));
  });

  resetBtn = createButton('Reset');
  resetBtn.mousePressed(() => count = 0);

  positionUIElements();
  describe('Interactive 4-bit binary counter simulator', LABEL);
}

function positionUIElements() {
  let mainRect = document.querySelector('main').getBoundingClientRect();
  upBtn.position(mainRect.left + 20, mainRect.top + drawHeight + 10);
  downBtn.position(mainRect.left + 110, mainRect.top + drawHeight + 10);
  autoBtn.position(mainRect.left + 220, mainRect.top + drawHeight + 10);
  resetBtn.position(mainRect.left + 300, mainRect.top + drawHeight + 10);
}

function draw() {
  updateCanvasSize();

  // Auto counting
  if (autoCount && millis() - lastAutoTime > 500) {
    if (countUp) {
      count = (count + 1) % 16;
    } else {
      count = (count - 1 + 16) % 16;
    }
    lastAutoTime = millis();
  }

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
  text('4-Bit Binary Counter', canvasWidth / 2, 10);

  // Direction indicator
  textSize(12);
  fill('#666');
  text('Synchronous ' + (countUp ? 'Up' : 'Down') + ' Counter', canvasWidth / 2, 35);

  // Draw counter
  drawCounter();

  // Draw state diagram
  drawStateCircle();

  // Instructions
  fill(colors.text);
  textAlign(CENTER, CENTER);
  textSize(10);
  text('Click buttons to count or enable auto-counting', canvasWidth / 2, drawHeight + 50);
}

function drawCounter() {
  let centerX = canvasWidth / 2;
  let y = 100;

  // Large decimal display
  fill(colors.counter);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(60);
  text(count, centerX, y + 30);

  // Binary display
  let bits = [];
  for (let i = 3; i >= 0; i--) {
    bits.push((count >> i) & 1);
  }

  // Flip-flop representations
  let startX = centerX - 120;
  let ffY = y + 90;

  for (let i = 0; i < 4; i++) {
    let x = startX + i * 65;
    let bitVal = bits[i];

    // FF box
    fill(bitVal ? colors.high : colors.low);
    stroke(colors.wire);
    strokeWeight(2);
    rect(x, ffY, 50, 60, 5);

    // Value
    fill('white');
    noStroke();
    textSize(24);
    text(bitVal, x + 25, ffY + 30);

    // Bit label
    fill(colors.text);
    textSize(11);
    text('Q' + (3 - i), x + 25, ffY + 70);

    // Weight
    textSize(9);
    fill('#666');
    text('2^' + (3 - i) + '=' + Math.pow(2, 3 - i), x + 25, ffY - 12);
  }

  // Binary string
  fill(colors.text);
  textSize(14);
  textAlign(CENTER, CENTER);
  let binaryStr = bits.join('');
  text('Binary: ' + binaryStr + '₂ = ' + count + '₁₀', centerX, ffY + 95);
}

function drawStateCircle() {
  let centerX = canvasWidth / 2;
  let centerY = 340;
  let radius = 60;

  // Draw circular state representation
  fill('#e8eaf6');
  stroke('#9fa8da');
  strokeWeight(1);
  ellipse(centerX, centerY, radius * 2);

  // Mark all states
  for (let i = 0; i < 16; i++) {
    let angle = (i / 16) * TWO_PI - HALF_PI;
    let x = centerX + cos(angle) * (radius - 10);
    let y = centerY + sin(angle) * (radius - 10);

    if (i === count) {
      fill(colors.counter);
      noStroke();
      ellipse(x, y, 20);
      fill('white');
    } else {
      fill(colors.text);
      noStroke();
    }
    textSize(8);
    textAlign(CENTER, CENTER);
    text(i, x, y);
  }

  // Direction arrow
  let arrowAngle = (count / 16) * TWO_PI - HALF_PI;
  let arrowX = centerX + cos(arrowAngle) * radius;
  let arrowY = centerY + sin(arrowAngle) * radius;

  stroke(colors.counter);
  strokeWeight(3);
  line(centerX, centerY, arrowX, arrowY);

  // State label
  fill(colors.text);
  noStroke();
  textSize(10);
  text('State Circle (0-15)', centerX, centerY + radius + 20);
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
