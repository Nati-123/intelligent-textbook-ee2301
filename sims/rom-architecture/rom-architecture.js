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
  textStyle(BOLD);
  text('ROM Architecture', canvasWidth / 2, 20);
  textStyle(NORMAL);

  // Subtitle
  textSize(12);
  fill(120);
  text('Fixed AND Array (Decoder) + Programmable OR Array', canvasWidth / 2, 40);

  // Title underline
  stroke(220);
  strokeWeight(1);
  let titleW = min(textWidth('ROM Architecture') + 60, canvasWidth - 40);
  line(canvasWidth / 2 - titleW / 2, 52, canvasWidth / 2 + titleW / 2, 52);

  // Compute active word line
  let activeWord = addressBits[0] * 4 + addressBits[1] * 2 + addressBits[2];

  // Centered layout calculations
  let inputAreaW = 70;
  let inputGap = 10;
  decoderW = 80;
  decoderH = numRows * cellSize + 20;
  let decoderArrayGap = 45;
  let totalContentW = inputAreaW + inputGap + decoderW + decoderArrayGap + numCols * cellSize;
  let layoutX = max(15, (canvasWidth - totalContentW) / 2);

  let leftMargin = layoutX;
  decoderX = layoutX + inputAreaW + inputGap;
  let decoderY = 80;

  arrayStartX = decoderX + decoderW + decoderArrayGap;
  arrayStartY = decoderY + 10;

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

  // Cursor management
  let overInteractive = false;
  let spacing = decoderH / 4;
  for (let i = 0; i < 3; i++) {
    let y = decoderY + spacing * (i + 1);
    let cx = leftMargin + 45;
    if (dist(mouseX, mouseY, cx, y) < 15) {
      overInteractive = true;
      break;
    }
  }
  if (!overInteractive) {
    for (let r = 0; r < numRows; r++) {
      for (let c = 0; c < numCols; c++) {
        let cx = arrayStartX + c * cellSize + cellSize / 2;
        let cy = arrayStartY + r * cellSize + cellSize / 2;
        if (dist(mouseX, mouseY, cx, cy) < cellSize / 2) {
          overInteractive = true;
          break;
        }
      }
      if (overInteractive) break;
    }
  }
  cursor(overInteractive ? HAND : ARROW);

  // Instruction area with styled background
  fill(243, 245, 250);
  noStroke();
  rect(12, drawHeight + 6, canvasWidth - 24, controlHeight - 12, 8);
  fill(130);
  textSize(12);
  textAlign(CENTER, CENTER);
  text('Click address inputs to change  |  Click OR array dots to program ROM', canvasWidth / 2, drawHeight + controlHeight / 2);
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
  // Shadow
  noStroke();
  fill(0, 0, 0, 15);
  rect(x + 2, y + 2, w, h, 8);

  // Decoder block
  fill(232, 240, 255);
  stroke('#2196F3');
  strokeWeight(2);
  rect(x, y, w, h, 8);

  // Label
  fill('#2196F3');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  textStyle(BOLD);
  text('3-to-8', x + w / 2, y + h / 2 - 9);
  text('Decoder', x + w / 2, y + h / 2 + 9);
  textStyle(NORMAL);

  // Word line labels on right side of decoder
  for (let r = 0; r < numRows; r++) {
    let wy = arrayStartY + r * cellSize + cellSize / 2;
    let isActive = (r === activeWord);

    fill(isActive ? '#4CAF50' : 160);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(10);
    textStyle(isActive ? BOLD : NORMAL);
    text(r.toString(), x + w + 4, wy);
    textStyle(NORMAL);
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
  // OR array label
  fill('#2196F3');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  textStyle(BOLD);
  text('OR Array', arrayStartX + (numCols * cellSize) / 2, arrayStartY - 32);
  textStyle(NORMAL);

  // Column headers (output labels)
  fill(70);
  textSize(12);
  textStyle(BOLD);
  for (let c = 0; c < numCols; c++) {
    let cx = arrayStartX + c * cellSize + cellSize / 2;
    text('O' + (numCols - 1 - c), cx, arrayStartY - 15);
  }
  textStyle(NORMAL);

  // Array background
  fill(252, 253, 255);
  stroke(200);
  strokeWeight(1);
  rect(arrayStartX, arrayStartY, numCols * cellSize, numRows * cellSize, 3);

  // Vertical output lines
  for (let c = 0; c < numCols; c++) {
    let cx = arrayStartX + c * cellSize + cellSize / 2;
    stroke(225);
    strokeWeight(1);
    line(cx, arrayStartY, cx, arrayStartY + numRows * cellSize);
  }

  // Draw grid and connections
  for (let r = 0; r < numRows; r++) {
    let wy = arrayStartY + r * cellSize + cellSize / 2;
    let isActive = (r === activeWord);

    // Horizontal word line through array
    stroke(isActive ? '#4CAF50' : '#eee');
    strokeWeight(isActive ? 2.5 : 0.5);
    line(arrayStartX, wy, arrayStartX + numCols * cellSize, wy);

    for (let c = 0; c < numCols; c++) {
      let cx = arrayStartX + c * cellSize + cellSize / 2;
      let hasConnection = orArray[r][c];

      if (hasConnection && isActive) {
        // Active connection: glow ring + solid dot
        noStroke();
        fill(76, 175, 80, 50);
        ellipse(cx, wy, 20, 20);
        fill('#4CAF50');
        ellipse(cx, wy, 12, 12);
      } else if (hasConnection) {
        // Inactive connection dot
        fill(90);
        noStroke();
        ellipse(cx, wy, 10, 10);
      } else {
        // Empty crosspoint (subtle ring)
        noFill();
        stroke(215);
        strokeWeight(1);
        ellipse(cx, wy, 8, 8);
      }
    }
  }
}

function drawOutputs(activeWord) {
  let outputY = arrayStartY + numRows * cellSize + 30;

  for (let c = 0; c < numCols; c++) {
    let cx = arrayStartX + c * cellSize + cellSize / 2;
    let val = orArray[activeWord][c] ? 1 : 0;

    // Line from array to output box
    stroke(val ? '#4CAF50' : '#ddd');
    strokeWeight(val ? 2 : 1);
    line(cx, arrayStartY + numRows * cellSize, cx, outputY - 15);

    // Output value box — styled to match project bit toggle boxes
    fill(val ? '#4CAF50' : 225);
    stroke(val ? '#388E3C' : 180);
    strokeWeight(1.5);
    rect(cx - 14, outputY - 14, 28, 28, 5);

    // Value text
    fill(val ? 255 : 110);
    noStroke();
    textSize(15);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text(val, cx, outputY);
    textStyle(NORMAL);

    // Column label below box
    fill(140);
    textSize(10);
    text('O' + (numCols - 1 - c), cx, outputY + 22);
  }

  // Readout info panel
  let addrStr = addressBits[0].toString() + addressBits[1].toString() + addressBits[2].toString();
  let dataStr = '';
  for (let c = 0; c < numCols; c++) {
    dataStr += orArray[activeWord][c] ? '1' : '0';
  }

  let panelY = outputY + 40;
  let panelH = 40;
  let panelW = min(canvasWidth - 24, 380);
  let panelX = (canvasWidth - panelW) / 2;

  // Panel background
  fill(247, 249, 252);
  stroke(210, 215, 225);
  strokeWeight(1);
  rect(panelX, panelY, panelW, panelH, 8);

  // Accent line
  noStroke();
  fill('#2196F3');
  rect(panelX + 10, panelY, 3, panelH, 2);

  // Readout text segments
  let labelX = panelX + 22;
  let labelCY = panelY + panelH / 2;

  textAlign(LEFT, CENTER);
  textSize(13);
  textStyle(BOLD);
  fill('#2196F3');
  text('Addr: ' + addrStr, labelX, labelCY);

  let seg1W = textWidth('Addr: ' + addrStr);
  textStyle(NORMAL);
  fill(160);
  textSize(12);
  text('|', labelX + seg1W + 8, labelCY);

  fill(80);
  text('Word ' + activeWord, labelX + seg1W + 22, labelCY);

  let seg2X = labelX + seg1W + 22;
  let seg2W = textWidth('Word ' + activeWord);
  fill(160);
  text('|', seg2X + seg2W + 8, labelCY);

  textStyle(BOLD);
  fill('#4CAF50');
  text('Data: ' + dataStr, seg2X + seg2W + 22, labelCY);
  textStyle(NORMAL);
}

function mousePressed() {
  // Check address input clicks
  let leftMargin = decoderX - 80; // inputAreaW + inputGap
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
