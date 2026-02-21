// Magnitude Comparator MicroSim
// Interactive 4-bit magnitude comparator
// Bloom Level: Understand/Apply (L2-L3)

let containerWidth;
let canvasWidth = 400;
let drawHeight = 420;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

let bitsA = [false, true, false, true]; // 4-bit number A
let bitsB = [false, false, true, true]; // 4-bit number B

// Theme colors
const PURPLE = '#6A5BFF';
const PURPLE_DARK = '#5A3EED';
const PURPLE_LIGHT = '#7A5CFF';
const PURPLE_BG = '#F4F0FF';
const PURPLE_BORDER = '#C9B9FF';
const BIT_ACTIVE = '#6A5BFF';
const BIT_INACTIVE = '#E7E1FF';
const GOLD = '#D4A017';

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  describe('Interactive 4-bit magnitude comparator', LABEL);
}

function draw() {
  updateCanvasSize();

  // Card background
  fill(PURPLE_BG);
  stroke(PURPLE_BORDER);
  strokeWeight(1.5);
  rect(1, 1, canvasWidth - 2, drawHeight - 2, 14);

  // Control area
  fill('white');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill(PURPLE);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(18);
  textStyle(BOLD);
  text('4-Bit Magnitude Comparator', canvasWidth / 2, 12);
  textStyle(NORMAL);

  // Calculate comparison
  let valueA = bitsToDecimal(bitsA);
  let valueB = bitsToDecimal(bitsB);
  let aGreaterB = valueA > valueB;
  let aEqualB = valueA === valueB;
  let aLessB = valueA < valueB;

  // Subtitle
  textSize(12);
  fill('#555');
  let relation = aGreaterB ? '>' : (aLessB ? '<' : '=');
  text(`A (${valueA}) ${relation} B (${valueB})`, canvasWidth / 2, 35);

  // Draw inputs
  drawInputs();

  // Draw comparator
  drawComparator();

  // Draw outputs
  drawOutputs(aGreaterB, aEqualB, aLessB);

  // Instructions
  fill(PURPLE_LIGHT);
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
  drawNumberInput('A', bitsA, 50, 100);
  drawNumberInput('B', bitsB, 50, 250);
}

function drawNumberInput(label, bits, x, y) {
  // Label
  fill(PURPLE);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);
  textStyle(BOLD);
  text(`${label} =`, x - 10, y + 20);
  textStyle(NORMAL);

  // Decimal value
  let value = bitsToDecimal(bits);
  textSize(20);
  textStyle(BOLD);
  fill(PURPLE_DARK);
  text(value, x + 130, y + 20);
  textStyle(NORMAL);

  // Bit circles
  for (let i = 0; i < 4; i++) {
    let bitX = x + 20 + i * 40;

    // Subtle shadow for active bits
    if (bits[i]) {
      drawingContext.shadowColor = 'rgba(106, 91, 255, 0.35)';
      drawingContext.shadowBlur = 6;
    }

    fill(bits[i] ? BIT_ACTIVE : BIT_INACTIVE);
    stroke(PURPLE_BORDER);
    strokeWeight(2);
    ellipse(bitX, y + 20, 32);

    // Reset shadow
    drawingContext.shadowBlur = 0;

    fill('white');
    noStroke();
    textSize(14);
    textAlign(CENTER, CENTER);
    text(bits[i] ? '1' : '0', bitX, y + 20);

    // Bit weight
    fill(PURPLE_LIGHT);
    textSize(9);
    text(`2${String.fromCharCode(8304 + (3 - i))}`, bitX, y + 45);
  }

  // Binary string
  fill(PURPLE_LIGHT);
  textSize(11);
  textAlign(LEFT, CENTER);
  let binStr = bits.map(b => b ? '1' : '0').join('');
  text(`(${binStr})\u2082`, x + 175, y + 20);
}

function drawComparator() {
  let compX = 200;
  let compY = 170;
  let compW = 130;
  let compH = 75;

  // Comparator body
  fill(PURPLE);
  stroke(PURPLE);
  strokeWeight(2);
  rect(compX - compW / 2, compY - compH / 2, compW, compH, 14);

  // Label
  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(13);
  textStyle(BOLD);
  text('4-Bit', compX, compY - 12);
  text('Comparator', compX, compY + 10);
  textStyle(NORMAL);

  // Input labels
  textSize(10);
  text('A', compX - compW / 2 + 16, compY - 22);
  text('B', compX - compW / 2 + 16, compY + 22);

  // Wires from inputs
  stroke(PURPLE_BORDER);
  strokeWeight(1.5);
  line(150, 120, compX - compW / 2, compY - 22);
  line(150, 270, compX - compW / 2, compY + 22);
}

function drawOutputs(aGreaterB, aEqualB, aLessB) {
  let startX = 280;
  let startY = 115;
  let spacing = 50;

  let outputs = [
    { label: 'A > B (G)', value: aGreaterB },
    { label: 'A = B (E)', value: aEqualB },
    { label: 'A < B (L)', value: aLessB }
  ];

  // Output header
  fill(PURPLE);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  textStyle(BOLD);
  text('Outputs', startX + 50, startY - 20);
  textStyle(NORMAL);

  outputs.forEach((out, i) => {
    let y = startY + i * spacing;

    // Wire from comparator
    stroke(out.value ? PURPLE : '#ddd');
    strokeWeight(out.value ? 2.5 : 1);
    line(265, 170, startX, y + 15);

    // Rounded rectangle output indicator
    fill(out.value ? PURPLE_BG : '#f5f5f5');
    stroke(out.value ? PURPLE_DARK : PURPLE_BORDER);
    strokeWeight(out.value ? 2 : 1);
    rect(startX + 15, y, 70, 30, 10);

    // Value
    fill(out.value ? PURPLE_DARK : '#aaa');
    noStroke();
    textSize(16);
    textStyle(out.value ? BOLD : NORMAL);
    textAlign(CENTER, CENTER);
    text(out.value ? '1' : '0', startX + 50, y + 15);
    textStyle(NORMAL);

    // Label
    fill(out.value ? PURPLE : '#999');
    textSize(11);
    text(out.label, startX + 50, y + 38);
  });

  // Visual comparison bar
  drawComparisonBar(bitsToDecimal(bitsA), bitsToDecimal(bitsB));
}

function drawComparisonBar(valueA, valueB) {
  let barX = 50;
  let barY = 335;
  let barW = canvasWidth - 100;
  let barH = 24;

  // Legend
  fill(PURPLE);
  textSize(10);
  textStyle(BOLD);
  textAlign(LEFT, CENTER);
  text('Number Line (0\u201315)', barX, barY - 12);
  textStyle(NORMAL);

  // Track background
  fill('#EDE7FF');
  stroke(PURPLE_BORDER);
  strokeWeight(1);
  rect(barX, barY, barW, barH, 12);
  noStroke();

  // Tick marks for each position 0-15
  for (let i = 0; i <= 15; i++) {
    let x = barX + (i / 15) * barW;
    stroke('#ccc');
    strokeWeight(1);
    line(x, barY + barH - 4, x, barY + barH);
    noStroke();
  }

  // Scale labels at 0, 5, 10, 15
  fill('#888');
  textSize(9);
  textAlign(CENTER, TOP);
  for (let i = 0; i <= 15; i += 5) {
    let x = barX + (i / 15) * barW;
    text(i, x, barY + barH + 4);
  }

  // B marker (draw first so A overlaps if same position)
  let bX = barX + (valueB / 15) * barW;
  fill(GOLD);
  noStroke();
  ellipse(bX, barY + barH / 2, 22);
  fill('white');
  textSize(10);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text('B', bX, barY + barH / 2);
  textStyle(NORMAL);

  // A marker
  let aX = barX + (valueA / 15) * barW;
  fill(PURPLE);
  noStroke();
  ellipse(aX, barY + barH / 2, 22);
  fill('white');
  textSize(10);
  textStyle(BOLD);
  text('A', aX, barY + barH / 2);
  textStyle(NORMAL);
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
