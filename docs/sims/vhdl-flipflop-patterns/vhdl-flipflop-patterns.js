// VHDL Flip-Flop Patterns MicroSim
// Common VHDL patterns for D flip-flop variants with timing diagrams

let containerWidth;
let canvasWidth = 400;
let drawHeight = 450;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

// State
let currentTab = 0; // 0=Basic, 1=SyncRst, 2=AsyncRst, 3=Enable
let inputD = 1;
let inputRST = 0;
let inputEN = 1;
let outputQ = 0;
let cycle = 0;
const MAX_CYCLES = 16;

// Timing history arrays
let clkHistory = [];
let dHistory = [];
let rstHistory = [];
let enHistory = [];
let qHistory = [];

// Colors
const CLK_COLOR = '#2196F3';
const D_COLOR = '#4CAF50';
const RST_COLOR = '#E91E63';
const Q_COLOR = '#FF9800';
const EN_COLOR = '#9C27B0';
const CODE_BG = '#263238';
const KEYWORD_COLOR = '#82B1FF';
const CODE_TEXT = '#ECEFF1';
const COMMENT_COLOR = '#69F0AE';

// Tab definitions
const tabs = ['Basic DFF', 'Sync Reset', 'Async Reset', 'With Enable'];

// VHDL code for each variant
const vhdlCode = [
  [ // Basic DFF
    'process(CLK)',
    'begin',
    '  if rising_edge(CLK) then',
    '    Q <= D;',
    '  end if;',
    'end process;'
  ],
  [ // Sync Reset
    'process(CLK)',
    'begin',
    '  if rising_edge(CLK) then',
    '    if RST = \'1\' then',
    '      Q <= \'0\';',
    '    else',
    '      Q <= D;',
    '    end if;',
    '  end if;',
    'end process;'
  ],
  [ // Async Reset
    'process(CLK, RST)',
    'begin',
    '  if RST = \'1\' then',
    '    Q <= \'0\';',
    '  elsif rising_edge(CLK) then',
    '    Q <= D;',
    '  end if;',
    'end process;'
  ],
  [ // With Enable
    'process(CLK)',
    'begin',
    '  if rising_edge(CLK) then',
    '    if EN = \'1\' then',
    '      Q <= D;',
    '    end if;',
    '  end if;',
    'end process;'
  ]
];

// Button bounds
let tabButtons = [];
let clockBtn, dBtn, rstBtn, enBtn;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  describe('Interactive VHDL flip-flop pattern explorer with timing diagrams for DFF variants', LABEL);
  resetHistory();
}

function resetHistory() {
  clkHistory = [];
  dHistory = [];
  rstHistory = [];
  enHistory = [];
  qHistory = [];
  cycle = 0;
  outputQ = 0;
}

function draw() {
  updateCanvasSize();
  background(245);

  // Draw tabs
  drawTabs();

  // Draw VHDL code section
  drawCodeSection();

  // Draw timing diagram
  drawTimingDiagram();

  // Draw control buttons
  drawControls();
}

function drawTabs() {
  let tabW = (canvasWidth - 20) / 4;
  let tabH = 30;
  let y = 5;

  textAlign(CENTER, CENTER);
  textSize(12);

  for (let i = 0; i < tabs.length; i++) {
    let x = 10 + i * tabW;
    tabButtons[i] = { x: x, y: y, w: tabW - 2, h: tabH };

    let isSelected = (i === currentTab);
    fill(isSelected ? CLK_COLOR : 220);
    stroke(isSelected ? CLK_COLOR : 180);
    strokeWeight(1);
    rect(x, y, tabW - 2, tabH, 4, 4, 0, 0);

    fill(isSelected ? 255 : 60);
    noStroke();
    textStyle(isSelected ? BOLD : NORMAL);
    text(tabs[i], x + (tabW - 2) / 2, y + tabH / 2);
  }
  textStyle(NORMAL);
}

function drawCodeSection() {
  let codeX = 10;
  let codeY = 40;
  let codeW = canvasWidth - 20;
  let codeH = 130;

  // Background
  fill(CODE_BG);
  noStroke();
  rect(codeX, codeY, codeW, codeH, 0, 0, 6, 6);

  let lines = vhdlCode[currentTab];
  let lineH = 14;
  let startY = codeY + 10;

  textSize(11);
  textAlign(LEFT, TOP);
  textFont('monospace');

  let keywords = ['process', 'begin', 'end', 'if', 'then', 'else', 'elsif', 'rising_edge'];

  for (let i = 0; i < lines.length; i++) {
    let y = startY + i * lineH;
    if (y + lineH > codeY + codeH) break;

    // Line number
    fill(100);
    text((i + 1).toString().padStart(2, ' '), codeX + 6, y);

    // Syntax highlighting - word by word
    let lineText = lines[i];
    let xPos = codeX + 30;
    let tokens = lineText.split(/(\s+)/);

    for (let t of tokens) {
      let cleaned = t.replace(/[;,()':<=]/g, '');
      if (keywords.includes(cleaned)) {
        fill(KEYWORD_COLOR);
      } else if (t.includes("'")) {
        fill(Q_COLOR);
      } else {
        fill(CODE_TEXT);
      }
      text(t, xPos, y);
      xPos += textWidth(t);
    }
  }
}

function drawTimingDiagram() {
  let diagX = 60;
  let diagY = 185;
  let diagW = canvasWidth - 80;
  let diagH = 220;
  let signalH = 35;
  let waveH = 22;

  // Background
  fill(255);
  stroke(220);
  strokeWeight(1);
  rect(10, diagY - 10, canvasWidth - 20, diagH + 20, 6);

  // Determine which signals to show based on tab
  let signals = [];
  signals.push({ name: 'CLK', color: CLK_COLOR, history: clkHistory });
  signals.push({ name: 'D', color: D_COLOR, history: dHistory });

  if (currentTab === 1 || currentTab === 2) {
    signals.push({ name: 'RST', color: RST_COLOR, history: rstHistory });
  }
  if (currentTab === 3) {
    signals.push({ name: 'EN', color: EN_COLOR, history: enHistory });
  }
  signals.push({ name: 'Q', color: Q_COLOR, history: qHistory });

  // Adjust spacing based on number of signals
  let actualSignalH = Math.min(signalH, (diagH - 10) / signals.length);

  // Draw each signal waveform
  for (let s = 0; s < signals.length; s++) {
    let sy = diagY + s * actualSignalH + 5;
    let sig = signals[s];

    // Signal label
    fill(sig.color);
    noStroke();
    textAlign(RIGHT, CENTER);
    textSize(12);
    textStyle(BOLD);
    text(sig.name, diagX - 8, sy + waveH / 2);
    textStyle(NORMAL);

    // Draw waveform
    stroke(sig.color);
    strokeWeight(2);
    noFill();

    let stepW = diagW / MAX_CYCLES;
    let history = sig.history;

    for (let i = 0; i < history.length; i++) {
      let x1 = diagX + i * stepW;
      let x2 = diagX + (i + 1) * stepW;
      let highY = sy + 2;
      let lowY = sy + waveH - 2;

      let val = history[i];

      if (sig.name === 'CLK') {
        // Clock: draw square wave (low first half, high second half)
        let midX = (x1 + x2) / 2;
        line(x1, lowY, midX, lowY);
        line(midX, lowY, midX, highY);
        line(midX, highY, x2, highY);
        if (i < history.length - 1) {
          line(x2, highY, x2, lowY);
        }
      } else {
        // Digital signal
        let yVal = val ? highY : lowY;
        line(x1, yVal, x2, yVal);

        // Transition edge
        if (i > 0 && history[i - 1] !== val) {
          let prevY = history[i - 1] ? highY : lowY;
          line(x1, prevY, x1, yVal);
        }
      }
    }

    // Draw gridlines
    stroke(230);
    strokeWeight(0.5);
    for (let i = 0; i <= MAX_CYCLES; i++) {
      let gx = diagX + i * stepW;
      line(gx, sy, gx, sy + waveH);
    }
  }

  // Cycle counter
  fill(80);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(10);
  text('Cycle: ' + cycle + ' / ' + MAX_CYCLES, diagX, diagY + diagH - 5);
}

function drawControls() {
  let y = drawHeight + 8;
  let btnW = 70;
  let btnH = 30;
  let x = 10;
  let spacing = 8;

  textAlign(CENTER, CENTER);
  textSize(12);

  // Clock button
  clockBtn = { x: x, y: y, w: btnW, h: btnH };
  fill(CLK_COLOR);
  noStroke();
  rect(x, y, btnW, btnH, 4);
  fill(255);
  textStyle(BOLD);
  text('Clock', x + btnW / 2, y + btnH / 2);
  textStyle(NORMAL);

  // D toggle
  x += btnW + spacing;
  dBtn = { x: x, y: y, w: btnW, h: btnH };
  fill(inputD ? D_COLOR : '#999');
  rect(x, y, btnW, btnH, 4);
  fill(255);
  text('D = ' + inputD, x + btnW / 2, y + btnH / 2);

  // RST toggle (show for sync/async reset)
  x += btnW + spacing;
  rstBtn = { x: x, y: y, w: btnW, h: btnH };
  if (currentTab === 1 || currentTab === 2) {
    fill(inputRST ? RST_COLOR : '#999');
    rect(x, y, btnW, btnH, 4);
    fill(255);
    text('RST = ' + inputRST, x + btnW / 2, y + btnH / 2);
  } else {
    fill(210);
    rect(x, y, btnW, btnH, 4);
    fill(170);
    text('RST --', x + btnW / 2, y + btnH / 2);
  }

  // EN toggle (show for enable variant)
  x += btnW + spacing;
  enBtn = { x: x, y: y, w: btnW, h: btnH };
  if (currentTab === 3) {
    fill(inputEN ? EN_COLOR : '#999');
    rect(x, y, btnW, btnH, 4);
    fill(255);
    text('EN = ' + inputEN, x + btnW / 2, y + btnH / 2);
  } else {
    fill(210);
    rect(x, y, btnW, btnH, 4);
    fill(170);
    text('EN --', x + btnW / 2, y + btnH / 2);
  }

  // Reset sim button
  x += btnW + spacing;
  let resetBtn = { x: x, y: y, w: btnW, h: btnH };
  fill(100);
  rect(x, y, btnW, btnH, 4);
  fill(255);
  text('Reset', x + btnW / 2, y + btnH / 2);
  // Store for click detection
  this._resetBtn = resetBtn;

  // Q output display
  x += btnW + spacing + 10;
  fill(Q_COLOR);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(16);
  textStyle(BOLD);
  text('Q = ' + outputQ, x, y + btnH / 2);
  textStyle(NORMAL);
}

function advanceClock() {
  if (cycle >= MAX_CYCLES) return;

  // Record current input states
  clkHistory.push(1); // CLK always toggles (represented as full cycle)
  dHistory.push(inputD);
  rstHistory.push(inputRST);
  enHistory.push(inputEN);

  // Compute new Q based on current tab (variant)
  let newQ = outputQ;

  switch (currentTab) {
    case 0: // Basic DFF: Q follows D on rising edge
      newQ = inputD;
      break;

    case 1: // Sync Reset: Q=0 when RST=1 on rising edge, else Q=D
      if (inputRST === 1) {
        newQ = 0;
      } else {
        newQ = inputD;
      }
      break;

    case 2: // Async Reset: Q=0 immediately when RST=1
      if (inputRST === 1) {
        newQ = 0;
      } else {
        newQ = inputD;
      }
      break;

    case 3: // With Enable: Q follows D only when EN=1
      if (inputEN === 1) {
        newQ = inputD;
      }
      // else Q holds its value
      break;
  }

  outputQ = newQ;
  qHistory.push(outputQ);
  cycle++;
}

function mousePressed() {
  // Check tab buttons
  for (let i = 0; i < tabButtons.length; i++) {
    if (tabButtons[i] && isInside(mouseX, mouseY, tabButtons[i])) {
      currentTab = i;
      resetHistory();
      return;
    }
  }

  // Check Clock button
  if (clockBtn && isInside(mouseX, mouseY, clockBtn)) {
    advanceClock();
    return;
  }

  // Check D toggle
  if (dBtn && isInside(mouseX, mouseY, dBtn)) {
    inputD = 1 - inputD;
    // For async reset, check if RST is active
    if (currentTab === 2 && inputRST === 1) {
      outputQ = 0;
    }
    return;
  }

  // Check RST toggle
  if (rstBtn && isInside(mouseX, mouseY, rstBtn) && (currentTab === 1 || currentTab === 2)) {
    inputRST = 1 - inputRST;
    // For async reset, immediately update Q
    if (currentTab === 2 && inputRST === 1) {
      outputQ = 0;
    }
    return;
  }

  // Check EN toggle
  if (enBtn && isInside(mouseX, mouseY, enBtn) && currentTab === 3) {
    inputEN = 1 - inputEN;
    return;
  }

  // Check Reset button
  if (this._resetBtn && isInside(mouseX, mouseY, this._resetBtn)) {
    resetHistory();
    return;
  }
}

function isInside(mx, my, bounds) {
  return mx > bounds.x && mx < bounds.x + bounds.w && my > bounds.y && my < bounds.y + bounds.h;
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
