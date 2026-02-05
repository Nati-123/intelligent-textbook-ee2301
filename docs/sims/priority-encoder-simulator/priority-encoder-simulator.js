// Priority Encoder Simulator MicroSim
// Interactive 4-to-2 priority encoder
// Bloom Level: Understand/Apply (L2-L3)

let containerWidth;
let canvasWidth = 400;
let drawHeight = 420;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;

let inputs = [false, false, true, false]; // D0-D3

const colors = {
  high: '#4CAF50',
  low: '#F44336',
  priority: '#FF9800',
  encoder: '#00BCD4',
  wire: '#666',
  bg: '#f5f5f5',
  text: '#212121'
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  describe('Interactive priority encoder simulator', LABEL);
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
  text('Priority Encoder Simulator', canvasWidth / 2, 10);

  // Find highest priority active input
  let highestPriority = -1;
  for (let i = 3; i >= 0; i--) {
    if (inputs[i]) {
      highestPriority = i;
      break;
    }
  }

  let valid = highestPriority >= 0;
  let y1 = valid ? (highestPriority >> 1) & 1 : 0;
  let y0 = valid ? highestPriority & 1 : 0;

  // Subtitle
  textSize(12);
  fill('#666');
  if (valid) {
    text(`D${highestPriority} is highest priority active input → Output = ${y1}${y0}`, canvasWidth / 2, 35);
  } else {
    text('No inputs active → Output invalid, Valid = 0', canvasWidth / 2, 35);
  }

  // Draw encoder
  drawEncoder();

  // Draw inputs
  drawInputs(highestPriority);

  // Draw outputs
  drawOutputs(y1, y0, valid);

  // Instructions
  fill(colors.text);
  textAlign(CENTER, CENTER);
  textSize(11);
  text('Click inputs to toggle - highest active input gets encoded', canvasWidth / 2, drawHeight + 30);
}

function drawEncoder() {
  let encX = 140;
  let encY = 90;
  let encW = 80;
  let encH = 200;

  // Encoder body
  fill(colors.encoder);
  stroke('#00838F');
  strokeWeight(2);

  beginShape();
  vertex(encX + encW, encY);
  vertex(encX, encY + 30);
  vertex(encX, encY + encH - 30);
  vertex(encX + encW, encY + encH);
  endShape(CLOSE);

  // Label
  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  text('Priority', encX + encW / 2, encY + encH / 2 - 15);
  text('Encoder', encX + encW / 2, encY + encH / 2 + 5);
  textSize(10);
  text('4-to-2', encX + encW / 2, encY + encH / 2 + 22);
}

function drawInputs(highestPriority) {
  let startX = 50;
  let startY = 130;

  fill(colors.text);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(11);
  text('Inputs', startX, startY - 35);
  textSize(9);
  text('(Priority: D3 > D2 > D1 > D0)', startX, startY - 22);

  for (let i = 0; i < 4; i++) {
    let y = startY + i * 45;
    let isHighest = i === highestPriority;

    // Input circle
    fill(inputs[i] ? colors.high : colors.low);
    stroke(isHighest ? colors.priority : colors.wire);
    strokeWeight(isHighest ? 4 : 2);
    ellipse(startX, y, 38);

    // Value
    fill('white');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(14);
    text(inputs[i] ? '1' : '0', startX, y);

    // Label
    fill(colors.text);
    textSize(11);
    text(`D${i}`, startX, y + 28);

    // Priority indicator
    if (isHighest) {
      fill(colors.priority);
      textSize(9);
      text('← highest', startX + 45, y);
    }

    // Wire to encoder
    stroke(inputs[i] ? colors.high : colors.wire);
    strokeWeight(isHighest && inputs[i] ? 3 : 1);
    line(startX + 22, y, 140, y);
  }
}

function drawOutputs(y1, y0, valid) {
  let encX = 220;
  let startY = 150;

  // Y1 output
  stroke(colors.wire);
  strokeWeight(valid ? 2 : 1);
  line(encX, startY, encX + 40, startY);

  fill(valid && y1 ? colors.high : colors.low);
  stroke(colors.wire);
  strokeWeight(2);
  ellipse(encX + 60, startY, 35);

  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);
  text(y1, encX + 60, startY);

  fill(colors.text);
  textSize(11);
  text('Y1', encX + 60, startY + 25);

  // Y0 output
  stroke(colors.wire);
  strokeWeight(valid ? 2 : 1);
  line(encX, startY + 50, encX + 40, startY + 50);

  fill(valid && y0 ? colors.high : colors.low);
  stroke(colors.wire);
  strokeWeight(2);
  ellipse(encX + 60, startY + 50, 35);

  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);
  text(y0, encX + 60, startY + 50);

  fill(colors.text);
  textSize(11);
  text('Y0', encX + 60, startY + 75);

  // Valid output
  stroke(colors.wire);
  strokeWeight(valid ? 2 : 1);
  line(encX, startY + 110, encX + 40, startY + 110);

  fill(valid ? colors.high : colors.low);
  stroke(colors.wire);
  strokeWeight(2);
  ellipse(encX + 60, startY + 110, 35);

  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);
  text(valid ? '1' : '0', encX + 60, startY + 110);

  fill(colors.text);
  textSize(11);
  text('Valid', encX + 60, startY + 135);

  // Binary output display
  fill('#e0f7fa');
  stroke('#80deea');
  rect(encX + 30, startY + 160, 80, 35, 5);

  fill(colors.text);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  text(`Output: ${y1}${y0}`, encX + 70, startY + 172);
  textSize(10);
  text(valid ? `(Binary ${y1 * 2 + y0})` : '(Invalid)', encX + 70, startY + 187);
}

function mousePressed() {
  let startX = 50;
  let startY = 130;

  for (let i = 0; i < 4; i++) {
    let y = startY + i * 45;
    if (dist(mouseX, mouseY, startX, y) < 22) {
      inputs[i] = !inputs[i];
      return;
    }
  }
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
