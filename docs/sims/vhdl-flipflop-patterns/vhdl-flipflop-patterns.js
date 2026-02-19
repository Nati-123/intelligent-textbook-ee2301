// VHDL Flip-Flop Patterns MicroSim
// Common VHDL patterns for D flip-flop variants with timing diagrams

let containerWidth;
let canvasWidth = 400;
let drawHeight = 460;
let controlHeight = 55;
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
let clockBtn, dBtn, rstBtn, enBtn, _resetBtn;

function setup() {
  updateCanvasSize();
  var mainElement = document.querySelector('main');

  // -- Nav bar: Fullscreen (in iframe) / Back to Docs (standalone) --
  var navBar = document.createElement('div');
  navBar.style.cssText = 'display:flex;justify-content:flex-end;padding:4px 8px;background:#37474F;';
  var navLink = document.createElement('a');
  navLink.style.cssText = 'font-size:12px;font-weight:bold;color:#80CBC4;text-decoration:none;';
  if (window.self !== window.top) {
    var parentUrl = '';
    try { parentUrl = window.parent.location.href; } catch(e) {}
    navLink.href = 'main.html' + (parentUrl ? '?back=' + encodeURIComponent(parentUrl) : '');
    navLink.target = '_blank';
    navLink.textContent = '⛶ Fullscreen';
  } else {
    var params = new URLSearchParams(window.location.search);
    var backUrl = params.get('back');
    navLink.href = backUrl || 'index.html';
    navLink.textContent = '← Back to Docs';
  }
  navBar.appendChild(navLink);
  mainElement.appendChild(navBar);

  const canvas = createCanvas(containerWidth, canvasHeight);
  canvas.parent(mainElement);
  describe('VHDL Flip-Flop Patterns');
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

  // Hand cursor on hover
  let hovering = false;
  for (let i = 0; i < tabButtons.length; i++) {
    if (tabButtons[i] && isInside(mouseX, mouseY, tabButtons[i])) hovering = true;
  }
  if (clockBtn && isInside(mouseX, mouseY, clockBtn)) hovering = true;
  if (dBtn && isInside(mouseX, mouseY, dBtn)) hovering = true;
  if (rstBtn && isInside(mouseX, mouseY, rstBtn) && (currentTab === 1 || currentTab === 2)) hovering = true;
  if (enBtn && isInside(mouseX, mouseY, enBtn) && currentTab === 3) hovering = true;
  if (_resetBtn && isInside(mouseX, mouseY, _resetBtn)) hovering = true;
  cursor(hovering ? HAND : ARROW);
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
  let codeH = 140;

  // Background
  fill(CODE_BG);
  noStroke();
  rect(codeX, codeY, codeW, codeH, 0, 0, 6, 6);

  let lines = vhdlCode[currentTab];
  let lineH = 14;
  let startY = codeY + 10;

  // Determine which lines are active based on current state
  let activeLines = getActiveLines();

  textSize(11);
  textAlign(LEFT, TOP);
  textFont('monospace');

  let keywords = ['process', 'begin', 'end', 'if', 'then', 'else', 'elsif', 'rising_edge'];

  for (let i = 0; i < lines.length; i++) {
    let y = startY + i * lineH;
    if (y + lineH > codeY + codeH) break;

    // Highlight active line background
    if (activeLines.includes(i)) {
      noStroke();
      fill(255, 255, 255, 25);
      rect(codeX + 2, y - 1, codeW - 4, lineH, 2);
    }

    // Line number
    fill(activeLines.includes(i) ? 200 : 100);
    text((i + 1).toString().padStart(2, ' '), codeX + 6, y);

    // Syntax highlighting - word by word
    let lineText = lines[i];
    let xPos = codeX + 30;
    let tokens = lineText.split(/(\s+)/);

    for (let t of tokens) {
      let cleaned = t.replace(/[;,()':<=]/g, '');
      if (activeLines.includes(i) && (t.includes('Q') || t.includes('D'))) {
        fill('#FFEB3B'); // Yellow for active assignments
      } else if (keywords.includes(cleaned)) {
        fill(KEYWORD_COLOR);
      } else if (t.includes("'")) {
        fill(Q_COLOR);
      } else if (activeLines.includes(i)) {
        fill('#FFEB3B');
      } else {
        fill(CODE_TEXT);
      }
      text(t, xPos, y);
      xPos += textWidth(t);
    }
  }

  // Show current state below code
  fill(200);
  textSize(10);
  textAlign(LEFT, TOP);
  let stateStr = 'D=' + inputD + '  RST=' + inputRST + '  EN=' + inputEN + '  Q=' + outputQ;
  text(stateStr, codeX + 10, codeY + codeH - 16);
}

function getActiveLines() {
  // Returns indices of active VHDL lines based on current input state
  switch (currentTab) {
    case 0: // Basic DFF: Q <= D always active on clock
      return [2, 3]; // rising_edge line + Q <= D
    case 1: // Sync Reset
      if (inputRST === 1) return [2, 3, 4]; // rising_edge + RST check + Q <= 0
      else return [2, 5, 6]; // rising_edge + else + Q <= D
    case 2: // Async Reset
      if (inputRST === 1) return [2, 3]; // RST check + Q <= 0
      else return [4, 5]; // elsif rising_edge + Q <= D
    case 3: // With Enable
      if (inputEN === 1) return [2, 3, 4]; // rising_edge + EN check + Q <= D
      else return [2, 3]; // rising_edge + EN check (but no assignment)
    default: return [];
  }
}

function drawTimingDiagram() {
  let diagX = 60;
  let diagY = 190;
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
  let y = drawHeight + 10;
  let btnH = 34;
  let spacing = 6;
  let x = 10;

  textAlign(CENTER, CENTER);
  textSize(12);

  // Clock button (prominent)
  let clkW = 55;
  clockBtn = { x: x, y: y, w: clkW, h: btnH };
  fill(CLK_COLOR);
  stroke('#1565C0');
  strokeWeight(2);
  rect(x, y, clkW, btnH, 5);
  fill(255);
  noStroke();
  textStyle(BOLD);
  textSize(13);
  text('CLK', x + clkW / 2, y + btnH / 2);
  textStyle(NORMAL);

  // D bit box
  x += clkW + spacing;
  let boxW = 48;
  dBtn = { x: x, y: y, w: boxW, h: btnH };
  fill(80);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  textStyle(BOLD);
  text('D', x, y + btnH / 2);
  textStyle(NORMAL);
  let dBoxX = x + 16;
  let dBoxW = boxW - 18;
  fill(inputD ? D_COLOR : '#999');
  stroke(inputD ? '#388E3C' : '#777');
  strokeWeight(2);
  rect(dBoxX, y + 3, dBoxW, btnH - 6, 4);
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);
  textStyle(BOLD);
  text(inputD, dBoxX + dBoxW / 2, y + btnH / 2);
  textStyle(NORMAL);
  dBtn = { x: dBoxX, y: y + 3, w: dBoxW, h: btnH - 6 };

  // RST bit box
  x += boxW + spacing;
  let rstActive = (currentTab === 1 || currentTab === 2);
  fill(80);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  textStyle(BOLD);
  text('R', x, y + btnH / 2);
  textStyle(NORMAL);
  let rBoxX = x + 14;
  let rBoxW = boxW - 16;
  if (rstActive) {
    fill(inputRST ? RST_COLOR : '#999');
    stroke(inputRST ? '#C2185B' : '#777');
  } else {
    fill(210);
    stroke(190);
  }
  strokeWeight(2);
  rect(rBoxX, y + 3, rBoxW, btnH - 6, 4);
  fill(rstActive ? 255 : 170);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);
  textStyle(BOLD);
  text(rstActive ? inputRST : '-', rBoxX + rBoxW / 2, y + btnH / 2);
  textStyle(NORMAL);
  rstBtn = { x: rBoxX, y: y + 3, w: rBoxW, h: btnH - 6 };

  // EN bit box
  x += boxW + spacing;
  let enActive = (currentTab === 3);
  fill(80);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  textStyle(BOLD);
  text('E', x, y + btnH / 2);
  textStyle(NORMAL);
  let eBoxX = x + 14;
  let eBoxW = boxW - 16;
  if (enActive) {
    fill(inputEN ? EN_COLOR : '#999');
    stroke(inputEN ? '#7B1FA2' : '#777');
  } else {
    fill(210);
    stroke(190);
  }
  strokeWeight(2);
  rect(eBoxX, y + 3, eBoxW, btnH - 6, 4);
  fill(enActive ? 255 : 170);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);
  textStyle(BOLD);
  text(enActive ? inputEN : '-', eBoxX + eBoxW / 2, y + btnH / 2);
  textStyle(NORMAL);
  enBtn = { x: eBoxX, y: y + 3, w: eBoxW, h: btnH - 6 };

  // Reset sim button
  x += boxW + spacing;
  let rstBtnW = 45;
  _resetBtn = { x: x, y: y, w: rstBtnW, h: btnH };
  fill(100);
  noStroke();
  rect(x, y, rstBtnW, btnH, 5);
  fill(255);
  textSize(10);
  text('Reset', x + rstBtnW / 2, y + btnH / 2);

  // Q output display
  x += rstBtnW + spacing;
  fill(outputQ ? Q_COLOR : '#999');
  stroke(outputQ ? '#E65100' : '#777');
  strokeWeight(2);
  let qBoxW = 45;
  rect(x, y + 2, qBoxW, btnH - 4, 5);
  fill(255);
  noStroke();
  textSize(15);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text('Q=' + outputQ, x + qBoxW / 2, y + btnH / 2);
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
  if (_resetBtn && isInside(mouseX, mouseY, _resetBtn)) {
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
