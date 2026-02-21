// VHDL Synthesis Inference MicroSim
// See what hardware is inferred from common VHDL code patterns

let containerWidth;
let canvasWidth = 400;
let drawHeight = 450;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

// Current pattern selection
let currentPattern = 0;

// Colors
const CODE_BG = '#263238';
const CODE_TEXT = '#ECEFF1';
const KEYWORD_COLOR = '#82B1FF';
const COMMENT_COLOR = '#69F0AE';
const HW_BG = '#FAFAFA';
const WARNING_COLOR = '#E91E63';
const GATE_COLOR = '#5C6BC0';
const WIRE_COLOR = '#455A64';

// Pattern definitions
const patterns = [
  {
    name: 'AND Gate',
    code: [
      '-- Concurrent signal assignment',
      'Y <= A AND B;'
    ],
    explanation: 'A concurrent signal assignment with AND infers a simple 2-input AND gate. No process needed for combinational logic.',
    warning: false
  },
  {
    name: 'MUX',
    code: [
      '-- Conditional assignment',
      'Y <= A when Sel = \'0\'',
      '     else B;'
    ],
    explanation: 'A conditional signal assignment (when/else) infers a 2-to-1 multiplexer. The condition becomes the select input.',
    warning: false
  },
  {
    name: 'D Flip-Flop',
    code: [
      'process(CLK)',
      'begin',
      '  if rising_edge(CLK) then',
      '    Q <= D;',
      '  end if;',
      'end process;'
    ],
    explanation: 'A process sensitive to CLK with rising_edge() infers a D flip-flop. The signal assigned (Q) becomes the register output.',
    warning: false
  },
  {
    name: 'Latch (intended)',
    code: [
      'process(EN, D)',
      'begin',
      '  if EN = \'1\' then',
      '    Q <= D;',
      '  end if;',
      'end process;'
    ],
    explanation: 'A process with an incomplete if (no else) and no clock infers a latch. Here Q holds its value when EN=0. This is intentional.',
    warning: false
  },
  {
    name: 'Latch (accidental)',
    code: [
      'process(A, B)',
      'begin',
      '  if A = \'1\' then',
      '    Y <= B;',
      '  -- MISSING else clause!',
      '  end if;',
      'end process;'
    ],
    explanation: 'Missing else clause creates an unintended latch. Y must hold its value when A=0. Always assign all outputs in all branches to avoid this!',
    warning: true
  },
  {
    name: 'Counter',
    code: [
      'process(CLK)',
      'begin',
      '  if rising_edge(CLK) then',
      '    count <= count + 1;',
      '  end if;',
      'end process;',
      'Q <= count;'
    ],
    explanation: 'A registered addition infers an adder feeding into a register (flip-flops). The feedback path creates the counting behavior.',
    warning: false
  }
];

// Button bounds
let patternButtons = [];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  describe('VHDL synthesis inference explorer showing code patterns and their inferred hardware', LABEL);
}

function draw() {
  updateCanvasSize();
  background(245);

  // Title
  fill('#212121');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);
  textStyle(BOLD);
  text('VHDL Synthesis Inference', canvasWidth / 2, 12);
  textStyle(NORMAL);
  stroke(220); strokeWeight(1);
  line(canvasWidth / 2 - 90, 23, canvasWidth / 2 + 90, 23);
  noStroke();

  // Draw pattern selector buttons
  drawPatternButtons();

  let pat = patterns[currentPattern];

  // Split layout
  let dividerX = canvasWidth * 0.45;
  let contentY = 68;
  let contentH = drawHeight - contentY - 60;

  // Left: VHDL code
  drawCodePanel(10, contentY, dividerX - 20, contentH, pat);

  // Right: Hardware diagram
  drawHardwarePanel(dividerX + 5, contentY, canvasWidth - dividerX - 15, contentH, pat);

  // Bottom: Explanation
  drawExplanation(10, drawHeight - 55, canvasWidth - 20, 50, pat);

  // Cursor management
  let overInteractive = false;
  for (let i = 0; i < patternButtons.length; i++) {
    let b = patternButtons[i];
    if (b && mouseX > b.x && mouseX < b.x + b.w && mouseY > b.y && mouseY < b.y + b.h) overInteractive = true;
  }
  cursor(overInteractive ? HAND : ARROW);
}

function drawPatternButtons() {
  let btnH = 26;
  let y = 28;
  let spacing = 6;
  let names = patterns.map(p => p.name);

  // Calculate button widths to fit
  textSize(11);
  let totalW = 0;
  let widths = [];
  for (let n of names) {
    let w = textWidth(n) + 20;
    widths.push(w);
    totalW += w + spacing;
  }
  totalW -= spacing;

  let startX = (canvasWidth - totalW) / 2;
  let x = startX;

  patternButtons = [];
  for (let i = 0; i < names.length; i++) {
    let btnW = widths[i];
    patternButtons[i] = { x: x, y: y, w: btnW, h: btnH };

    let isSelected = (i === currentPattern);
    let isWarning = (i === 4); // Accidental latch

    if (isSelected) {
      fill(isWarning ? WARNING_COLOR : GATE_COLOR);
    } else {
      fill(220);
    }
    stroke(isWarning && isSelected ? WARNING_COLOR : (isSelected ? GATE_COLOR : 180));
    strokeWeight(1);
    rect(x, y, btnW, btnH, 4);

    fill(isSelected ? 255 : 60);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    text(names[i], x + btnW / 2, y + btnH / 2);

    x += btnW + spacing;
  }
}

function drawCodePanel(x, y, w, h, pat) {
  // Header
  fill(80);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);
  textStyle(BOLD);
  text('VHDL Code', x, y);
  textStyle(NORMAL);

  // Code background
  let codeY = y + 20;
  let codeH = h - 20;
  fill(CODE_BG);
  noStroke();
  rect(x, codeY, w, codeH, 6);

  // Warning border for accidental latch
  if (pat.warning) {
    noFill();
    stroke(WARNING_COLOR);
    strokeWeight(3);
    rect(x, codeY, w, codeH, 6);
  }

  // Code lines
  let lineH = 18;
  let startY = codeY + 12;

  textSize(12);
  textAlign(LEFT, TOP);
  textFont('monospace');

  let keywords = ['process', 'begin', 'end', 'if', 'then', 'else', 'elsif',
                   'rising_edge', 'when', 'AND', 'OR', 'NOT'];

  for (let i = 0; i < pat.code.length; i++) {
    let ly = startY + i * lineH;
    if (ly + lineH > codeY + codeH) break;

    let lineText = pat.code[i];

    // Line number
    fill(100);
    text((i + 1).toString().padStart(2, ' '), x + 6, ly);

    let xPos = x + 30;

    if (lineText.startsWith('--')) {
      // Comment
      fill(pat.warning && lineText.includes('MISSING') ? WARNING_COLOR : COMMENT_COLOR);
      text(lineText, xPos, ly);
    } else {
      // Syntax highlighting
      let tokens = lineText.split(/(\s+)/);
      for (let t of tokens) {
        let cleaned = t.replace(/[;,()':<=]/g, '');
        if (keywords.includes(cleaned)) {
          fill(KEYWORD_COLOR);
        } else {
          fill(CODE_TEXT);
        }
        text(t, xPos, ly);
        xPos += textWidth(t);
      }
    }
  }
}

function drawHardwarePanel(x, y, w, h, pat) {
  // Header
  fill(80);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);
  textStyle(BOLD);
  text('Inferred Hardware', x, y);
  textStyle(NORMAL);

  // Hardware background
  let hwY = y + 20;
  let hwH = h - 20;
  fill(HW_BG);
  stroke(220);
  strokeWeight(1);
  rect(x, hwY, w, hwH, 6);

  // Warning border
  if (pat.warning) {
    noFill();
    stroke(WARNING_COLOR);
    strokeWeight(3);
    rect(x, hwY, w, hwH, 6);
  }

  let cx = x + w / 2;
  let cy = hwY + hwH / 2;

  // Draw hardware based on pattern
  switch (currentPattern) {
    case 0: drawANDGate(cx, cy, w); break;
    case 1: drawMUXHW(cx, cy, w); break;
    case 2: drawDFFHW(cx, cy, w); break;
    case 3: drawLatchHW(cx, cy, w, false); break;
    case 4: drawLatchHW(cx, cy, w, true); break;
    case 5: drawCounterHW(cx, cy, w); break;
  }
}

function drawANDGate(cx, cy, w) {
  let gateW = 50;
  let gateH = 40;

  // Gate body
  fill(255);
  stroke(GATE_COLOR);
  strokeWeight(2);
  rectMode(CENTER);
  rect(cx - 5, cy, gateW * 0.5, gateH);
  arc(cx + gateW * 0.15, cy, gateW * 0.5, gateH, -HALF_PI, HALF_PI);
  rectMode(CORNER);

  // Label
  fill(GATE_COLOR);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  text('AND', cx, cy);

  // Input wires
  stroke(WIRE_COLOR);
  strokeWeight(1.5);
  line(cx - gateW, cy - 10, cx - gateW * 0.3, cy - 10);
  line(cx - gateW, cy + 10, cx - gateW * 0.3, cy + 10);

  // Output wire
  line(cx + gateW * 0.4, cy, cx + gateW, cy);

  // Labels
  fill(60);
  noStroke();
  textSize(12);
  textAlign(RIGHT, CENTER);
  text('A', cx - gateW - 5, cy - 10);
  text('B', cx - gateW - 5, cy + 10);
  textAlign(LEFT, CENTER);
  text('Y', cx + gateW + 5, cy);
}

function drawMUXHW(cx, cy, w) {
  // MUX trapezoid
  fill(255);
  stroke(GATE_COLOR);
  strokeWeight(2);

  let mw = 40;
  let mh = 60;
  beginShape();
  vertex(cx - mw / 2, cy - mh / 2);
  vertex(cx + mw / 2, cy - mh / 3);
  vertex(cx + mw / 2, cy + mh / 3);
  vertex(cx - mw / 2, cy + mh / 2);
  endShape(CLOSE);

  // Label
  fill(GATE_COLOR);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  text('MUX', cx, cy);
  textSize(8);
  text('0', cx - 10, cy - 15);
  text('1', cx - 10, cy + 15);

  // Input wires
  stroke(WIRE_COLOR);
  strokeWeight(1.5);
  line(cx - mw * 1.2, cy - 18, cx - mw / 2, cy - 18);
  line(cx - mw * 1.2, cy + 18, cx - mw / 2, cy + 18);
  line(cx, cy + mh / 2, cx, cy + mh / 2 + 20);

  // Output wire
  line(cx + mw / 2, cy, cx + mw * 1.2, cy);

  // Labels
  fill(60);
  noStroke();
  textSize(12);
  textAlign(RIGHT, CENTER);
  text('A', cx - mw * 1.2 - 5, cy - 18);
  text('B', cx - mw * 1.2 - 5, cy + 18);
  textAlign(CENTER, TOP);
  text('Sel', cx, cy + mh / 2 + 22);
  textAlign(LEFT, CENTER);
  text('Y', cx + mw * 1.2 + 5, cy);
}

function drawDFFHW(cx, cy, w) {
  let boxW = 60;
  let boxH = 50;

  // DFF box
  fill(255);
  stroke(GATE_COLOR);
  strokeWeight(2);
  rectMode(CENTER);
  rect(cx, cy, boxW, boxH, 4);
  rectMode(CORNER);

  // Clock triangle
  stroke(GATE_COLOR);
  strokeWeight(1.5);
  let triSize = 8;
  let triY = cy + boxH / 2;
  triangle(cx - triSize / 2, triY, cx + triSize / 2, triY, cx, triY - triSize);

  // Labels
  fill(GATE_COLOR);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  textStyle(BOLD);
  text('D FF', cx, cy - 8);
  textStyle(NORMAL);
  textSize(9);
  text('D', cx - boxW / 2 + 10, cy + 2);
  text('Q', cx + boxW / 2 - 10, cy + 2);

  // Input wires
  stroke(WIRE_COLOR);
  strokeWeight(1.5);
  line(cx - boxW * 1.2, cy + 2, cx - boxW / 2, cy + 2);
  line(cx - boxW * 0.5, cy + boxH / 2, cx - boxW * 0.5, cy + boxH / 2 + 20);

  // Output wire
  line(cx + boxW / 2, cy + 2, cx + boxW * 1.2, cy + 2);

  // External labels
  fill(60);
  noStroke();
  textSize(12);
  textAlign(RIGHT, CENTER);
  text('D', cx - boxW * 1.2 - 5, cy + 2);
  textAlign(CENTER, TOP);
  text('CLK', cx - boxW * 0.5, cy + boxH / 2 + 22);
  textAlign(LEFT, CENTER);
  text('Q', cx + boxW * 1.2 + 5, cy + 2);
}

function drawLatchHW(cx, cy, w, isAccidental) {
  let boxW = 60;
  let boxH = 50;

  // Latch box
  fill(isAccidental ? '#FFF0F0' : 255);
  stroke(isAccidental ? WARNING_COLOR : GATE_COLOR);
  strokeWeight(2);
  rectMode(CENTER);
  rect(cx, cy - 10, boxW, boxH, 4);
  rectMode(CORNER);

  // Labels
  fill(isAccidental ? WARNING_COLOR : GATE_COLOR);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  textStyle(BOLD);
  text('LATCH', cx, cy - 18);
  textStyle(NORMAL);
  textSize(9);
  text(isAccidental ? 'D' : 'D', cx - boxW / 2 + 10, cy - 8);
  text('Q', cx + boxW / 2 - 10, cy - 8);
  text(isAccidental ? 'A (EN)' : 'EN', cx, cy + boxH / 2 - 12);

  // Input wires
  stroke(WIRE_COLOR);
  strokeWeight(1.5);
  line(cx - boxW * 1.2, cy - 8, cx - boxW / 2, cy - 8);
  line(cx, cy - 10 + boxH / 2, cx, cy - 10 + boxH / 2 + 20);

  // Output wire
  line(cx + boxW / 2, cy - 8, cx + boxW * 1.2, cy - 8);

  // External labels
  fill(60);
  noStroke();
  textSize(12);
  textAlign(RIGHT, CENTER);
  text(isAccidental ? 'B' : 'D', cx - boxW * 1.2 - 5, cy - 8);
  textAlign(CENTER, TOP);
  text(isAccidental ? 'A' : 'EN', cx, cy - 10 + boxH / 2 + 22);
  textAlign(LEFT, CENTER);
  text(isAccidental ? 'Y' : 'Q', cx + boxW * 1.2 + 5, cy - 8);

  // Warning for accidental latch
  if (isAccidental) {
    fill(WARNING_COLOR);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(13);
    textStyle(BOLD);

    // Warning icon (triangle)
    let warningY = cy + 50;
    stroke(WARNING_COLOR);
    strokeWeight(2);
    fill(255, 220, 220);
    triangle(cx - 15, warningY + 10, cx + 15, warningY + 10, cx, warningY - 8);
    fill(WARNING_COLOR);
    noStroke();
    textSize(14);
    text('!', cx, warningY + 3);

    textSize(11);
    text('WARNING: Unintended latch!', cx, warningY + 25);
    textStyle(NORMAL);
    textSize(9);
    text('Add else clause to fix', cx, warningY + 40);
  }
}

function drawCounterHW(cx, cy, w) {
  let boxW = 45;
  let boxH = 40;

  // Adder
  let adderX = cx - 35;
  fill(255);
  stroke(GATE_COLOR);
  strokeWeight(2);
  rectMode(CENTER);
  rect(adderX, cy, boxW, boxH, 4);

  fill(GATE_COLOR);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  textStyle(BOLD);
  text('+1', adderX, cy);
  textStyle(NORMAL);

  // Register
  let regX = cx + 35;
  fill(255);
  stroke(GATE_COLOR);
  strokeWeight(2);
  rect(regX, cy, boxW, boxH, 4);

  // Clock triangle on register
  stroke(GATE_COLOR);
  strokeWeight(1.5);
  let triSize = 7;
  let triY = cy + boxH / 2;
  triangle(regX - triSize / 2, triY, regX + triSize / 2, triY, regX, triY - triSize);

  fill(GATE_COLOR);
  noStroke();
  textSize(11);
  textStyle(BOLD);
  text('REG', regX, cy - 5);
  textStyle(NORMAL);

  rectMode(CORNER);

  // Connection: adder -> register
  stroke(WIRE_COLOR);
  strokeWeight(1.5);
  line(adderX + boxW / 2, cy, regX - boxW / 2, cy);
  // Arrow
  fill(WIRE_COLOR);
  noStroke();
  let arrowX = regX - boxW / 2;
  triangle(arrowX - 6, cy - 4, arrowX - 6, cy + 4, arrowX, cy);

  // Feedback path: register output back to adder input
  stroke(WIRE_COLOR);
  strokeWeight(1.5);
  let outX = regX + boxW / 2;
  line(outX, cy, outX + 20, cy);
  line(outX + 20, cy, outX + 20, cy + 40);
  line(outX + 20, cy + 40, adderX - boxW / 2 - 20, cy + 40);
  line(adderX - boxW / 2 - 20, cy + 40, adderX - boxW / 2 - 20, cy);
  line(adderX - boxW / 2 - 20, cy, adderX - boxW / 2, cy);

  // Arrow on feedback
  fill(WIRE_COLOR);
  noStroke();
  let fbArrowX = adderX - boxW / 2;
  triangle(fbArrowX - 6, cy - 4, fbArrowX - 6, cy + 4, fbArrowX, cy);

  // Clock input
  stroke(WIRE_COLOR);
  strokeWeight(1.5);
  line(regX, cy + boxH / 2, regX, cy + boxH / 2 + 25);

  // Output
  line(outX + 20, cy, outX + 40, cy);

  // Labels
  fill(60);
  noStroke();
  textSize(11);
  textAlign(CENTER, TOP);
  text('CLK', regX, cy + boxH / 2 + 27);
  textAlign(LEFT, CENTER);
  text('Q', outX + 42, cy);
  textSize(9);
  fill(100);
  textAlign(CENTER, TOP);
  text('feedback', cx, cy + 48);
}

function drawExplanation(x, y, w, h, pat) {
  // Explanation background
  fill(pat.warning ? '#FFF0F0' : '#F5F5F5');
  stroke(pat.warning ? WARNING_COLOR : 200);
  strokeWeight(pat.warning ? 2 : 1);
  rect(x, y, w, h, 6);

  // Text
  fill(pat.warning ? WARNING_COLOR : 60);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(11);
  textFont('sans-serif');

  // Word wrap the explanation
  let words = pat.explanation.split(' ');
  let lineText = '';
  let ly = y + 6;
  let lineH = 14;
  let maxW = w - 16;

  for (let word of words) {
    let testLine = lineText + (lineText ? ' ' : '') + word;
    if (textWidth(testLine) > maxW && lineText) {
      text(lineText, x + 8, ly);
      lineText = word;
      ly += lineH;
    } else {
      lineText = testLine;
    }
  }
  if (lineText) {
    text(lineText, x + 8, ly);
  }
}

function mousePressed() {
  // Check pattern buttons
  for (let i = 0; i < patternButtons.length; i++) {
    let b = patternButtons[i];
    if (b && mouseX > b.x && mouseX < b.x + b.w && mouseY > b.y && mouseY < b.y + b.h) {
      currentPattern = i;
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
