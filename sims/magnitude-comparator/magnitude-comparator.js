// Magnitude Comparator MicroSim
// Interactive 4-bit magnitude comparator
// Bloom Level: Understand/Apply (L2-L3)

let containerWidth;
let canvasWidth = 400;
let drawHeight = 450;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

let bitsA = [false, true, false, true]; // 4-bit number A
let bitsB = [false, false, true, true]; // 4-bit number B

const colors = {
  high: '#4CAF50',
  low: '#F44336',
  equal: '#2196F3',
  greater: '#4CAF50',
  less: '#F44336',
  comparator: '#673AB7',
  wire: '#666',
  bg: '#f5f5f5',
  text: '#212121'
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  describe('Interactive 4-bit magnitude comparator', LABEL);
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
  text('4-Bit Magnitude Comparator', canvasWidth / 2, 10);

  // Calculate comparison
  let valueA = bitsToDecimal(bitsA);
  let valueB = bitsToDecimal(bitsB);
  let aGreaterB = valueA > valueB;
  let aEqualB = valueA === valueB;
  let aLessB = valueA < valueB;

  // Subtitle
  textSize(12);
  fill('#666');
  let relation = aGreaterB ? '>' : (aLessB ? '<' : '=');
  text(`A (${valueA}) ${relation} B (${valueB})`, canvasWidth / 2, 35);

  // Draw inputs
  drawInputs();

  // Draw comparator
  drawComparator();

  // Draw outputs
  drawOutputs(aGreaterB, aEqualB, aLessB);

  // Instructions
  fill(colors.text);
  textAlign(CENTER, CENTER);
  textSize(11);
  text('Click bits to toggle values', canvasWidth / 2, drawHeight + 25);
}

function bitsToDecimal(bits) {
  let val = 0;
  for (let i = 0; i < bits.length; i++) {
    if (bits[i]) val += Math.pow(2, bits.length - 1 - i);
  }
  return val;
}

function drawInputs() {
  // Number A
  drawNumberInput('A', bitsA, 50, 100);

  // Number B
  drawNumberInput('B', bitsB, 50, 250);
}

function drawNumberInput(label, bits, x, y) {
  // Label
  fill(colors.text);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);
  text(`${label} =`, x - 10, y + 20);

  // Decimal value
  let value = bitsToDecimal(bits);
  textSize(20);
  fill('#1565C0');
  text(value, x + 130, y + 20);

  // Bit circles
  for (let i = 0; i < 4; i++) {
    let bitX = x + 20 + i * 40;

    fill(bits[i] ? colors.high : colors.low);
    stroke(colors.wire);
    strokeWeight(2);
    ellipse(bitX, y + 20, 32);

    fill('white');
    noStroke();
    textSize(14);
    textAlign(CENTER, CENTER);
    text(bits[i] ? '1' : '0', bitX, y + 20);

    // Bit weight
    fill(colors.text);
    textSize(9);
    text(`2^${3-i}`, bitX, y + 45);
  }

  // Binary string
  fill(colors.text);
  textSize(11);
  textAlign(LEFT, CENTER);
  let binStr = bits.map(b => b ? '1' : '0').join('');
  text(`(${binStr})₂`, x + 175, y + 20);
}

function drawComparator() {
  let compX = 200;
  let compY = 170;
  let compW = 120;
  let compH = 70;

  // Comparator body
  fill(colors.comparator);
  stroke('#512DA8');
  strokeWeight(2);
  rect(compX - compW/2, compY - compH/2, compW, compH, 8);

  // Label
  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  text('4-Bit', compX, compY - 12);
  text('Comparator', compX, compY + 8);

  // Input labels
  textSize(10);
  text('A', compX - compW/2 + 15, compY - 20);
  text('B', compX - compW/2 + 15, compY + 20);

  // Wires from inputs
  stroke(colors.wire);
  strokeWeight(1);
  // A inputs
  line(150, 120, compX - compW/2, compY - 20);
  // B inputs
  line(150, 270, compX - compW/2, compY + 20);
}

function drawOutputs(aGreaterB, aEqualB, aLessB) {
  let startX = 280;
  let startY = 120;
  let spacing = 55;

  let outputs = [
    { label: 'A > B', value: aGreaterB, color: colors.greater },
    { label: 'A = B', value: aEqualB, color: colors.equal },
    { label: 'A < B', value: aLessB, color: colors.less }
  ];

  // Output header
  fill(colors.text);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  text('Outputs', startX + 50, startY - 20);

  outputs.forEach((out, i) => {
    let y = startY + i * spacing;

    // Wire from comparator
    stroke(colors.wire);
    strokeWeight(out.value ? 3 : 1);
    line(260, 170, startX, y + 15);

    // Output circle
    fill(out.value ? out.color : '#e0e0e0');
    stroke(colors.wire);
    strokeWeight(2);
    ellipse(startX + 50, y + 15, 45);

    // Value
    fill(out.value ? 'white' : '#999');
    noStroke();
    textSize(16);
    text(out.value ? '1' : '0', startX + 50, y + 15);

    // Label
    fill(colors.text);
    textSize(12);
    text(out.label, startX + 50, y + 45);
  });

  // Visual comparison bar
  drawComparisonBar(bitsToDecimal(bitsA), bitsToDecimal(bitsB));
}

function drawComparisonBar(valueA, valueB) {
  let barX = 50;
  let barY = 350;
  let barW = canvasWidth - 100;
  let barH = 30;

  // Background
  fill('#e0e0e0');
  noStroke();
  rect(barX, barY, barW, barH, 5);

  // Scale labels
  fill(colors.text);
  textSize(9);
  textAlign(CENTER, TOP);
  for (let i = 0; i <= 15; i += 5) {
    let x = barX + (i / 15) * barW;
    text(i, x, barY + barH + 5);
  }

  // A marker
  let aX = barX + (valueA / 15) * barW;
  fill(colors.greater);
  noStroke();
  ellipse(aX, barY + barH/2, 20);
  fill('white');
  textSize(10);
  textAlign(CENTER, CENTER);
  text('A', aX, barY + barH/2);

  // B marker
  let bX = barX + (valueB / 15) * barW;
  fill(colors.less);
  noStroke();
  ellipse(bX, barY + barH/2, 20);
  fill('white');
  text('B', bX, barY + barH/2);

  // Legend
  fill(colors.text);
  textSize(10);
  textAlign(LEFT, CENTER);
  text('Number Line (0-15)', barX, barY - 10);
}

function mousePressed() {
  // Check A bits
  for (let i = 0; i < 4; i++) {
    let bitX = 70 + i * 40;
    if (dist(mouseX, mouseY, bitX, 120) < 18) {
      bitsA[i] = !bitsA[i];
      return;
    }
  }

  // Check B bits
  for (let i = 0; i < 4; i++) {
    let bitX = 70 + i * 40;
    if (dist(mouseX, mouseY, bitX, 270) < 18) {
      bitsB[i] = !bitsB[i];
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
