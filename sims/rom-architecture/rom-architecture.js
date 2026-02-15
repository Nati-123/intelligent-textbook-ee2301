// ROM Architecture MicroSim
// Explore ROM structure with address decoder and OR-plane output array

let containerWidth;
let canvasWidth = 400;
let drawHeight = 500;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

// Address inputs (3 bits)
let addressBits = [0, 0, 0]; // A2, A1, A0

// OR array connections: 8 word lines x 4 output columns
// Each entry is true/false indicating a connection
let orArray = [];

// Layout constants
let decoderX, decoderW, decoderH;
let arrayStartX, arrayStartY;
let cellSize = 28;
let numRows = 8;
let numCols = 4;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  describe('ROM architecture with 3-to-8 decoder and programmable OR array showing address decoding and output generation.', LABEL);

  // Initialize OR array with some default connections
  for (let r = 0; r < numRows; r++) {
    orArray[r] = [];
    for (let c = 0; c < numCols; c++) {
      orArray[r][c] = false;
    }
  }
  // Set some example ROM contents
  // Word 0 (000): 1010
  orArray[0][0] = true; orArray[0][2] = true;
  // Word 1 (001): 0110
  orArray[1][1] = true; orArray[1][2] = true;
  // Word 3 (011): 1001
  orArray[3][0] = true; orArray[3][3] = true;
  // Word 5 (101): 1111
  orArray[5][0] = true; orArray[5][1] = true; orArray[5][2] = true; orArray[5][3] = true;
  // Word 7 (111): 0101
  orArray[7][1] = true; orArray[7][3] = true;
}

function draw() {
  updateCanvasSize();
  background(245);

  // Title
  fill(50);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(18);
  text('ROM Architecture', canvasWidth / 2, 20);

  textSize(13);
  fill(100);
  text('Fixed AND Array (Decoder) + Programmable OR Array', canvasWidth / 2, 40);

  // Compute active word line
  let activeWord = addressBits[0] * 4 + addressBits[1] * 2 + addressBits[2];

  // Layout calculations
  let leftMargin = 20;
  let inputAreaW = 70;
  decoderX = leftMargin + inputAreaW + 10;
  decoderW = 70;
  decoderH = numRows * cellSize + 20;
  let decoderY = 80;

  arrayStartX = decoderX + decoderW + 40;
  arrayStartY = decoderY + 10;

  // Ensure array fits in canvas
  let arrayEndX = arrayStartX + numCols * cellSize + 60;
  if (arrayEndX > canvasWidth - 10) {
    let shift = arrayEndX - (canvasWidth - 10);
    arrayStartX -= shift / 2;
    decoderX -= shift / 2;
  }

  // Draw address input labels and toggles
  drawAddressInputs(leftMargin, decoderY, inputAreaW);

  // Draw decoder block
  drawDecoder(decoderX, decoderY, decoderW, decoderH, activeWord);

  // Draw word lines from decoder to OR array
  drawWordLines(decoderY, activeWord);

  // Draw OR array
  drawORArray(activeWord);

  // Draw output values
  drawOutputs(activeWord);

  // Control area label
  fill(100);
  noStroke();
  textSize(12);
  textAlign(CENTER, CENTER);
  text('Click address inputs to change | Click OR array dots to program ROM', canvasWidth / 2, drawHeight + 25);
}

function drawAddressInputs(x, startY, w) {
  let labels = ['A2', 'A1', 'A0'];
  let spacing = decoderH / 4;

  for (let i = 0; i < 3; i++) {
    let y = startY + spacing * (i + 1);
    let isOne = addressBits[i] === 1;

    // Label
    fill(80);
    noStroke();
    textAlign(RIGHT, CENTER);
    textSize(14);
    textStyle(BOLD);
    text(labels[i], x + 25, y);
    textStyle(NORMAL);

    // Toggle circle
    let cx = x + 45;
    fill(isOne ? '#4CAF50' : '#ccc');
    stroke(isOne ? '#388E3C' : '#999');
    strokeWeight(2);
    ellipse(cx, y, 24, 24);

    // Value text
    fill(isOne ? 255 : 80);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(13);
    text(addressBits[i], cx, y);

    // Line to decoder
    stroke(isOne ? '#4CAF50' : '#ccc');
    strokeWeight(isOne ? 2 : 1);
    line(cx + 12, y, decoderX, y);
  }
}

function drawDecoder(x, y, w, h, activeWord) {
  // Decoder block
  fill(230, 240, 255);
  stroke('#2196F3');
  strokeWeight(2);
  rect(x, y, w, h, 5);

  // Label
  fill('#2196F3');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  textStyle(BOLD);
  text('3-to-8', x + w / 2, y + h / 2 - 8);
  text('Decoder', x + w / 2, y + h / 2 + 8);
  textStyle(NORMAL);

  // Word line labels on right side of decoder
  for (let r = 0; r < numRows; r++) {
    let wy = arrayStartY + r * cellSize + cellSize / 2;
    let isActive = (r === activeWord);

    fill(isActive ? '#4CAF50' : 150);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(10);
    text(r.toString(), x + w + 3, wy);
  }
}

function drawWordLines(decoderY, activeWord) {
  for (let r = 0; r < numRows; r++) {
    let wy = arrayStartY + r * cellSize + cellSize / 2;
    let isActive = (r === activeWord);

    stroke(isActive ? '#4CAF50' : '#ddd');
    strokeWeight(isActive ? 2.5 : 1);
    line(decoderX + decoderW + 14, wy, arrayStartX, wy);
  }
}

function drawORArray(activeWord) {
  // Column headers (output labels)
  fill(80);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  textStyle(BOLD);
  for (let c = 0; c < numCols; c++) {
    let cx = arrayStartX + c * cellSize + cellSize / 2;
    text('O' + (numCols - 1 - c), cx, arrayStartY - 15);
  }
  textStyle(NORMAL);

  // OR array label
  fill('#2196F3');
  textSize(11);
  text('OR Array', arrayStartX + (numCols * cellSize) / 2, arrayStartY - 32);

  // Vertical output lines
  for (let c = 0; c < numCols; c++) {
    let cx = arrayStartX + c * cellSize + cellSize / 2;
    stroke('#ddd');
    strokeWeight(1);
    line(cx, arrayStartY, cx, arrayStartY + numRows * cellSize);
  }

  // Draw grid and connections
  for (let r = 0; r < numRows; r++) {
    let wy = arrayStartY + r * cellSize + cellSize / 2;
    let isActive = (r === activeWord);

    // Horizontal word line through array
    stroke(isActive ? '#4CAF50' : '#eee');
    strokeWeight(isActive ? 2 : 0.5);
    line(arrayStartX, wy, arrayStartX + numCols * cellSize, wy);

    for (let c = 0; c < numCols; c++) {
      let cx = arrayStartX + c * cellSize + cellSize / 2;
      let hasConnection = orArray[r][c];

      if (hasConnection) {
        // Connection dot
        let dotColor;
        if (isActive) {
          dotColor = color('#4CAF50');
        } else {
          dotColor = color(100);
        }
        fill(dotColor);
        noStroke();
        ellipse(cx, wy, 10, 10);
      } else {
        // Empty crosspoint (light ring)
        noFill();
        stroke(220);
        strokeWeight(1);
        ellipse(cx, wy, 8, 8);
      }
    }
  }

  // Array border
  noFill();
  stroke(180);
  strokeWeight(1);
  rect(arrayStartX, arrayStartY, numCols * cellSize, numRows * cellSize);
}

function drawOutputs(activeWord) {
  let outputY = arrayStartY + numRows * cellSize + 25;

  fill(80);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  text('Outputs:', arrayStartX - 30, outputY);

  for (let c = 0; c < numCols; c++) {
    let cx = arrayStartX + c * cellSize + cellSize / 2;
    let val = orArray[activeWord][c] ? 1 : 0;

    // Output value box
    fill(val ? '#4CAF50' : '#eee');
    stroke(val ? '#388E3C' : '#ccc');
    strokeWeight(1.5);
    rect(cx - 13, outputY - 13, 26, 26, 4);

    // Value
    fill(val ? 255 : 120);
    noStroke();
    textSize(14);
    textStyle(BOLD);
    text(val, cx, outputY);
    textStyle(NORMAL);

    // Line from array to output
    stroke(val ? '#4CAF50' : '#ddd');
    strokeWeight(val ? 2 : 1);
    line(cx, arrayStartY + numRows * cellSize, cx, outputY - 14);
  }

  // Show binary address
  let addrStr = addressBits[0].toString() + addressBits[1].toString() + addressBits[2].toString();
  let dataStr = '';
  for (let c = 0; c < numCols; c++) {
    dataStr += orArray[activeWord][c] ? '1' : '0';
  }
  fill(80);
  textSize(13);
  textStyle(NORMAL);
  textAlign(CENTER, CENTER);
  text('Address: ' + addrStr + ' (Word ' + activeWord + ')  =>  Data: ' + dataStr,
    canvasWidth / 2, outputY + 30);
}

function mousePressed() {
  // Check address input clicks
  let leftMargin = 20;
  let spacing = decoderH / 4;
  let decoderY = 80;

  for (let i = 0; i < 3; i++) {
    let y = decoderY + spacing * (i + 1);
    let cx = leftMargin + 45;
    if (dist(mouseX, mouseY, cx, y) < 15) {
      addressBits[i] = 1 - addressBits[i];
      return;
    }
  }

  // Check OR array clicks
  for (let r = 0; r < numRows; r++) {
    for (let c = 0; c < numCols; c++) {
      let cx = arrayStartX + c * cellSize + cellSize / 2;
      let cy = arrayStartY + r * cellSize + cellSize / 2;
      if (dist(mouseX, mouseY, cx, cy) < cellSize / 2) {
        orArray[r][c] = !orArray[r][c];
        return;
      }
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
