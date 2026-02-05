// Binary-Gray Code Converter MicroSim
// Interactive binary to Gray code conversion
// Bloom Level: Understand/Apply (L2-L3)

let containerWidth;
let canvasWidth = 400;
let drawHeight = 450;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;

let bits = [false, true, false, true]; // 4-bit input (MSB first)
let modeBtn;
let binaryToGray = true;

const colors = {
  high: '#4CAF50',
  low: '#F44336',
  xor: '#FF9800',
  wire: '#666',
  bg: '#f5f5f5',
  text: '#212121'
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  modeBtn = createButton('Switch to Gray→Binary');
  modeBtn.mousePressed(toggleMode);

  positionUIElements();
  describe('Interactive binary to Gray code converter', LABEL);
}

function positionUIElements() {
  let mainRect = document.querySelector('main').getBoundingClientRect();
  modeBtn.position(mainRect.left + 20, mainRect.top + drawHeight + 15);
}

function toggleMode() {
  binaryToGray = !binaryToGray;
  modeBtn.html(binaryToGray ? 'Switch to Gray→Binary' : 'Switch to Binary→Gray');
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
  text('Binary-Gray Code Converter', canvasWidth / 2, 10);

  // Mode subtitle
  textSize(12);
  fill('#666');
  text(binaryToGray ? 'Binary → Gray Conversion' : 'Gray → Binary Conversion', canvasWidth / 2, 35);

  // Calculate conversion
  let output = binaryToGray ? binaryToGrayCode(bits) : grayToBinaryCode(bits);

  // Draw conversion visualization
  drawConversion(bits, output);

  // Draw code table
  drawCodeTable();

  // Instructions
  fill(colors.text);
  textAlign(LEFT, CENTER);
  textSize(11);
  text('Click bits to toggle', 200, drawHeight + 30);
}

function binaryToGrayCode(binary) {
  let gray = [];
  gray[0] = binary[0]; // MSB stays the same
  for (let i = 1; i < binary.length; i++) {
    gray[i] = binary[i - 1] !== binary[i]; // XOR adjacent bits
  }
  return gray;
}

function grayToBinaryCode(gray) {
  let binary = [];
  binary[0] = gray[0]; // MSB stays the same
  for (let i = 1; i < gray.length; i++) {
    binary[i] = binary[i - 1] !== gray[i]; // XOR with previous binary bit
  }
  return binary;
}

function drawConversion(input, output) {
  let inputY = 100;
  let outputY = 300;
  let startX = 80;
  let spacing = 70;

  // Input label
  fill(colors.text);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);
  text(binaryToGray ? 'Binary Input' : 'Gray Input', canvasWidth / 2, inputY - 30);

  // Draw input bits
  for (let i = 0; i < 4; i++) {
    let x = startX + i * spacing;

    // Input bit circle
    fill(input[i] ? colors.high : colors.low);
    stroke(colors.wire);
    strokeWeight(2);
    ellipse(x, inputY, 45);

    // Value
    fill('white');
    noStroke();
    textSize(18);
    text(input[i] ? '1' : '0', x, inputY);

    // Bit label
    fill(colors.text);
    textSize(11);
    text(binaryToGray ? `B${3-i}` : `G${3-i}`, x, inputY + 35);
  }

  // Draw XOR operations
  for (let i = 0; i < 4; i++) {
    let x = startX + i * spacing;
    let xorY = 200;

    if (i === 0) {
      // MSB passes through
      stroke(input[0] ? colors.high : colors.low);
      strokeWeight(2);
      line(x, inputY + 25, x, outputY - 25);

      fill('#e3f2fd');
      stroke('#90caf9');
      rect(x - 20, xorY - 15, 40, 30, 5);

      fill(colors.text);
      noStroke();
      textSize(10);
      text('pass', x, xorY);
    } else {
      // XOR operation
      if (binaryToGray) {
        // B(i-1) XOR B(i)
        stroke(colors.wire);
        strokeWeight(1);
        line(startX + (i-1) * spacing, inputY + 25, startX + (i-1) * spacing, xorY - 20);
        line(startX + (i-1) * spacing, xorY - 20, x - 15, xorY - 20);
        line(x - 15, xorY - 20, x - 15, xorY - 10);

        line(x, inputY + 25, x, xorY - 30);
        line(x, xorY - 30, x + 5, xorY - 10);
      } else {
        // B(i-1) XOR G(i)
        stroke(colors.wire);
        strokeWeight(1);
        line(startX + (i-1) * spacing, outputY - 25, startX + (i-1) * spacing, xorY + 20);
        line(startX + (i-1) * spacing, xorY + 20, x - 15, xorY + 20);
        line(x - 15, xorY + 20, x - 15, xorY + 10);

        line(x, inputY + 25, x, xorY - 10);
      }

      // XOR gate
      fill(colors.xor);
      stroke('#F57C00');
      strokeWeight(2);
      ellipse(x, xorY, 35);

      fill('white');
      noStroke();
      textSize(12);
      text('XOR', x, xorY);

      // Output wire
      stroke(output[i] ? colors.high : colors.low);
      strokeWeight(2);
      line(x, xorY + 18, x, outputY - 25);
    }
  }

  // Output label
  fill(colors.text);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);
  text(binaryToGray ? 'Gray Output' : 'Binary Output', canvasWidth / 2, outputY - 45);

  // Draw output bits
  for (let i = 0; i < 4; i++) {
    let x = startX + i * spacing;

    // Output bit circle
    fill(output[i] ? colors.high : colors.low);
    stroke(colors.wire);
    strokeWeight(2);
    ellipse(x, outputY, 45);

    // Value
    fill('white');
    noStroke();
    textSize(18);
    text(output[i] ? '1' : '0', x, outputY);

    // Bit label
    fill(colors.text);
    textSize(11);
    text(binaryToGray ? `G${3-i}` : `B${3-i}`, x, outputY + 35);
  }

  // Show decimal values
  let inputDec = bitsToDecimal(input);
  let outputDec = bitsToDecimal(output);

  fill(colors.text);
  textSize(12);
  textAlign(CENTER, TOP);
  text(`Decimal: ${inputDec}`, canvasWidth / 2, inputY + 50);
}

function bitsToDecimal(bits) {
  let val = 0;
  for (let i = 0; i < bits.length; i++) {
    if (bits[i]) val += Math.pow(2, bits.length - 1 - i);
  }
  return val;
}

function drawCodeTable() {
  let tableX = canvasWidth - 100;
  let tableY = 90;

  fill(colors.text);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(10);
  text('Code Table', tableX + 30, tableY - 10);

  textSize(8);
  text('Dec', tableX, tableY + 8);
  text('Bin', tableX + 25, tableY + 8);
  text('Gray', tableX + 55, tableY + 8);

  for (let i = 0; i < 8; i++) {
    let y = tableY + 20 + i * 14;
    let binStr = i.toString(2).padStart(3, '0');
    let grayVal = i ^ (i >> 1);
    let grayStr = grayVal.toString(2).padStart(3, '0');

    // Highlight matching row
    let inputDec = bitsToDecimal(bits.slice(1)); // Use lower 3 bits
    fill(i === (inputDec % 8) ? '#fff9c4' : 'white');
    stroke('#bdbdbd');
    rect(tableX - 12, y - 6, 80, 14);

    fill(colors.text);
    noStroke();
    textSize(8);
    text(i, tableX, y);
    text(binStr, tableX + 25, y);
    text(grayStr, tableX + 55, y);
  }
}

function mousePressed() {
  let inputY = 100;
  let startX = 80;
  let spacing = 70;

  for (let i = 0; i < 4; i++) {
    let x = startX + i * spacing;
    if (dist(mouseX, mouseY, x, inputY) < 25) {
      bits[i] = !bits[i];
      return;
    }
  }
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
