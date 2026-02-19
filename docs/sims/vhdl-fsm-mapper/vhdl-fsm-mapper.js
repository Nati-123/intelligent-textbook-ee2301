// VHDL FSM Mapper MicroSim
// Cross-highlight between VHDL FSM code and state diagram

let containerWidth;
let canvasWidth = 400;
let drawHeight = 500;
let minDrawHeight = 500;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

// FSM state
let currentState = 0; // 0=IDLE, 1=ACTIVE, 2=DONE
let inputStart = 0;
let inputDone = 0;

// Highlighting
let highlightedState = -1; // -1=none, 0=IDLE, 1=ACTIVE, 2=DONE
let highlightedTransition = -1; // index of highlighted transition
let highlightedCodeLine = -1;

// Colors
const IDLE_COLOR = '#2196F3';
const ACTIVE_COLOR = '#4CAF50';
const DONE_COLOR = '#FF9800';
const HIGHLIGHT_BG = '#FFF9C4';
const CODE_BG = '#263238';
const CODE_TEXT = '#ECEFF1';
const KEYWORD_COLOR = '#82B1FF';
const COMMENT_COLOR = '#69F0AE';

// State definitions
const states = [
  { name: 'IDLE', color: IDLE_COLOR, output: "LED <= '0'" },
  { name: 'ACTIVE', color: ACTIVE_COLOR, output: "LED <= '1'" },
  { name: 'DONE', color: DONE_COLOR, output: "LED <= '0'" }
];

// Transitions: from, to, condition, code line range
const transitions = [
  { from: 0, to: 1, label: "start='1'", codeLines: [10, 11] },
  { from: 0, to: 0, label: "start='0'", codeLines: [12, 12], selfLoop: true },
  { from: 1, to: 2, label: "done='1'", codeLines: [14, 15] },
  { from: 1, to: 1, label: "done='0'", codeLines: [16, 16], selfLoop: true },
  { from: 2, to: 0, label: "always", codeLines: [18, 18] }
];

// VHDL code lines (0-indexed internally)
const codeLines = [
  "type state_type is (IDLE, ACTIVE, DONE);",     // 0
  "signal state, next_state : state_type;",         // 1
  "",                                                // 2
  "-- State register process",                       // 3
  "process(CLK, RST)",                               // 4
  "begin",                                           // 5
  "  if RST='1' then state <= IDLE;",                // 6
  "  elsif rising_edge(CLK) then",                   // 7
  "    state <= next_state;",                        // 8
  "  end if;",                                       // 9
  "-- Transition process",                           // 10 (just a label)
  "  when IDLE =>",                                  // 11 - actually line index matters for highlighting
  "    if start='1' then next_state <= ACTIVE;",     // 12
  "    else next_state <= IDLE; end if;",            // 13
  "  when ACTIVE =>",                                // 14
  "    if done='1' then next_state <= DONE;",        // 15
  "    else next_state <= ACTIVE; end if;",          // 16
  "  when DONE =>",                                  // 17
  "    next_state <= IDLE;",                         // 18
  "end case;",                                       // 19
  "",                                                // 20
  "-- Output process",                               // 21
  "  when IDLE   => LED <= '0';",                    // 22
  "  when ACTIVE => LED <= '1';",                    // 23
  "  when DONE   => LED <= '0';",                    // 24
  "end case;"                                        // 25
];

// Map state indices to code line ranges for highlighting
const stateCodeLines = {
  0: [11, 13, 22], // IDLE
  1: [14, 16, 23], // ACTIVE
  2: [17, 18, 24]  // DONE
};

// Button bounds
let stepBtn, startBtn, doneBtn, resetBtn;
let stateCircles = []; // {x, y, r} for click detection
let codeLineRects = []; // {x, y, w, h, lineIdx} for click detection

function setup() {
  updateCanvasSize();
  var mainElement = document.querySelector('main');

  // -- Nav bar: Fullscreen / Exit Fullscreen (expand iframe only) --
  var navBar = document.createElement('div');
  navBar.style.cssText = 'display:flex;justify-content:flex-end;padding:4px 8px;background:#37474F;';
  var navLink = document.createElement('a');
  navLink.href = '#';
  navLink.style.cssText = 'font-size:12px;font-weight:bold;color:#80CBC4;text-decoration:none;cursor:pointer;';
  navLink.textContent = '⛶ Fullscreen';
  var isFullscreen = false;
  var iframe = window.frameElement;
  var origStyle = iframe ? iframe.style.cssText : '';
  navLink.addEventListener('click', function(e) {
    e.preventDefault();
    if (iframe) {
      if (!isFullscreen) {
        origStyle = iframe.style.cssText;
        iframe.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:99999;border:none;background:#fff;';
        navLink.textContent = '✕ Exit Fullscreen';
        setTimeout(function() { window.dispatchEvent(new Event('resize')); }, 100);
      } else {
        iframe.style.cssText = origStyle;
        navLink.textContent = '⛶ Fullscreen';
        setTimeout(function() { window.dispatchEvent(new Event('resize')); }, 100);
      }
      isFullscreen = !isFullscreen;
    }
  });
  navBar.appendChild(navLink);
  mainElement.appendChild(navBar);

  const canvas = createCanvas(containerWidth, canvasHeight);
  canvas.parent(mainElement);
  describe('VHDL FSM Mapper');
}

function draw() {
  updateCanvasSize();
  background(245);

  let dividerX = canvasWidth * 0.42;

  // Left side: State diagram
  drawStateDiagram(10, 10, dividerX - 20, drawHeight - 20);

  // Divider line
  stroke(200);
  strokeWeight(1);
  line(dividerX, 10, dividerX, drawHeight - 10);

  // Right side: VHDL code
  drawCodePanel(dividerX + 5, 10, canvasWidth - dividerX - 15, drawHeight - 20);

  // Bottom controls
  drawControls();
}

function drawStateDiagram(x, y, w, h) {
  // Title
  fill(60);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(14);
  textStyle(BOLD);
  text('State Diagram', x + w / 2, y);
  textStyle(NORMAL);

  let cx = x + w / 2;
  let cy = y + h / 2 - 20;
  let radius = min(w, h) * 0.28;
  let stateR = 35;

  // Calculate state positions (triangle layout)
  let positions = [
    { x: cx, y: cy - radius * 0.8 },        // IDLE (top)
    { x: cx + radius * 0.9, y: cy + radius * 0.5 },  // ACTIVE (bottom-right)
    { x: cx - radius * 0.9, y: cy + radius * 0.5 }   // DONE (bottom-left)
  ];

  stateCircles = [];

  // Draw transition arrows first (behind states)
  for (let t = 0; t < transitions.length; t++) {
    let tr = transitions[t];
    let isHighlighted = (highlightedTransition === t);

    if (tr.selfLoop) {
      // Self-loop arrow
      let pos = positions[tr.from];
      let loopAngle = (tr.from === 0) ? -HALF_PI : (tr.from === 1 ? 0 : PI);
      let lx = pos.x + cos(loopAngle) * (stateR + 15);
      let ly = pos.y + sin(loopAngle) * (stateR + 15);

      stroke(isHighlighted ? '#F44336' : 150);
      strokeWeight(isHighlighted ? 2.5 : 1.5);
      noFill();
      arc(lx, ly, 25, 25, loopAngle - PI * 0.7, loopAngle + PI * 0.7);

      // Label
      fill(isHighlighted ? '#F44336' : 100);
      noStroke();
      textSize(8);
      textAlign(CENTER, CENTER);
      let labelX = pos.x + cos(loopAngle) * (stateR + 32);
      let labelY = pos.y + sin(loopAngle) * (stateR + 32);
      text(tr.label, labelX, labelY);
    } else {
      // Arrow between states
      let fromPos = positions[tr.from];
      let toPos = positions[tr.to];

      // Calculate arrow endpoints at circle edges
      let angle = atan2(toPos.y - fromPos.y, toPos.x - fromPos.x);
      let x1 = fromPos.x + cos(angle) * stateR;
      let y1 = fromPos.y + sin(angle) * stateR;
      let x2 = toPos.x - cos(angle) * stateR;
      let y2 = toPos.y - sin(angle) * stateR;

      // Offset for bidirectional arrows
      let perpAngle = angle + HALF_PI;
      let offset = 6;
      x1 += cos(perpAngle) * offset;
      y1 += sin(perpAngle) * offset;
      x2 += cos(perpAngle) * offset;
      y2 += sin(perpAngle) * offset;

      stroke(isHighlighted ? '#F44336' : 100);
      strokeWeight(isHighlighted ? 2.5 : 1.5);
      line(x1, y1, x2, y2);

      // Arrowhead
      let arrowSize = 8;
      let ax = x2 - cos(angle) * arrowSize;
      let ay = y2 - sin(angle) * arrowSize;
      fill(isHighlighted ? '#F44336' : 100);
      noStroke();
      triangle(x2, y2,
        ax + cos(angle + 2.5) * arrowSize * 0.5,
        ay + sin(angle + 2.5) * arrowSize * 0.5,
        ax + cos(angle - 2.5) * arrowSize * 0.5,
        ay + sin(angle - 2.5) * arrowSize * 0.5);

      // Transition label
      let midX = (x1 + x2) / 2 + cos(perpAngle) * 12;
      let midY = (y1 + y2) / 2 + sin(perpAngle) * 12;
      fill(isHighlighted ? '#F44336' : 80);
      noStroke();
      textSize(9);
      textAlign(CENTER, CENTER);
      text(tr.label, midX, midY);
    }
  }

  // Draw state circles
  for (let i = 0; i < states.length; i++) {
    let pos = positions[i];
    let st = states[i];
    let isCurrent = (i === currentState);
    let isHighlighted2 = (i === highlightedState);

    stateCircles[i] = { x: pos.x, y: pos.y, r: stateR };

    // Highlight background
    if (isHighlighted2) {
      fill(HIGHLIGHT_BG);
      noStroke();
      ellipse(pos.x, pos.y, stateR * 2 + 12, stateR * 2 + 12);
    }

    // State circle
    if (isCurrent) {
      fill(st.color);
      stroke(st.color);
      strokeWeight(3);
    } else {
      fill(255);
      stroke(st.color);
      strokeWeight(2);
    }
    ellipse(pos.x, pos.y, stateR * 2, stateR * 2);

    // Double circle for current state
    if (isCurrent) {
      noFill();
      stroke(255);
      strokeWeight(1.5);
      ellipse(pos.x, pos.y, stateR * 2 - 8, stateR * 2 - 8);
    }

    // State name
    fill(isCurrent ? 255 : 60);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(13);
    textStyle(BOLD);
    text(st.name, pos.x, pos.y - 5);
    textStyle(NORMAL);
    textSize(8);
    text(st.output, pos.x, pos.y + 12);
  }

  // Current state label
  fill(states[currentState].color);
  noStroke();
  textAlign(CENTER, BOTTOM);
  textSize(12);
  textStyle(BOLD);
  text('Current: ' + states[currentState].name, cx, y + h - 5);
  textStyle(NORMAL);
}

function drawCodePanel(x, y, w, h) {
  // Title
  fill(60);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(14);
  textStyle(BOLD);
  text('VHDL Code', x + w / 2, y);
  textStyle(NORMAL);

  // Code background
  let codeY = y + 22;
  let codeH = h - 22;
  fill(CODE_BG);
  noStroke();
  rect(x, codeY, w, codeH, 6);

  codeLineRects = [];
  let lineH = 16;
  let startY = codeY + 6;

  textSize(10);
  textAlign(LEFT, TOP);
  textFont('monospace');

  let keywords = ['type', 'is', 'signal', 'process', 'begin', 'end', 'if', 'then', 'elsif',
                   'rising_edge', 'when', 'case', 'others', 'else'];

  for (let i = 0; i < codeLines.length; i++) {
    let ly = startY + i * lineH;
    if (ly + lineH > codeY + codeH) break;

    // Check if this line should be highlighted
    let isHighlightedLine = false;

    // Highlight from state selection
    if (highlightedState >= 0 && stateCodeLines[highlightedState]) {
      isHighlightedLine = stateCodeLines[highlightedState].includes(i);
    }

    // Highlight from transition selection
    if (highlightedTransition >= 0) {
      let tr = transitions[highlightedTransition];
      isHighlightedLine = isHighlightedLine || (i >= tr.codeLines[0] && i <= tr.codeLines[1]);
    }

    // Highlight from direct code click
    if (highlightedCodeLine === i) {
      isHighlightedLine = true;
    }

    // Draw highlight background
    if (isHighlightedLine) {
      fill(255, 249, 196, 80);
      noStroke();
      rect(x + 2, ly - 1, w - 4, lineH, 2);
    }

    // Store click region
    codeLineRects.push({ x: x, y: ly - 1, w: w, h: lineH, lineIdx: i });

    // Line number
    fill(100);
    noStroke();
    text((i + 1).toString().padStart(2, ' '), x + 4, ly);

    // Code text with syntax highlighting
    let lineText = codeLines[i];
    let xPos = x + 28;

    if (lineText.startsWith('--')) {
      fill(COMMENT_COLOR);
      text(lineText, xPos, ly);
    } else {
      let tokens = lineText.split(/(\s+)/);
      for (let t of tokens) {
        let cleaned = t.replace(/[;,()':<=]/g, '');
        if (keywords.includes(cleaned)) {
          fill(KEYWORD_COLOR);
        } else if (t === 'IDLE' || t === 'ACTIVE' || t === 'DONE') {
          let stIdx = t === 'IDLE' ? 0 : (t === 'ACTIVE' ? 1 : 2);
          fill(states[stIdx].color);
        } else {
          fill(CODE_TEXT);
        }
        text(t, xPos, ly);
        xPos += textWidth(t);
      }
    }
  }
}

function drawControls() {
  let y = drawHeight + 8;
  let btnW = 70;
  let btnH = 30;
  let spacing = 8;
  let x = 10;

  textAlign(CENTER, CENTER);
  textSize(12);

  // Step button
  stepBtn = { x: x, y: y, w: btnW, h: btnH };
  fill(IDLE_COLOR);
  noStroke();
  rect(x, y, btnW, btnH, 4);
  fill(255);
  textStyle(BOLD);
  text('Step', x + btnW / 2, y + btnH / 2);
  textStyle(NORMAL);

  // Start toggle
  x += btnW + spacing;
  startBtn = { x: x, y: y, w: 90, h: btnH };
  fill(inputStart ? ACTIVE_COLOR : '#999');
  rect(x, y, 90, btnH, 4);
  fill(255);
  text('start = ' + inputStart, x + 45, y + btnH / 2);

  // Done toggle
  x += 90 + spacing;
  doneBtn = { x: x, y: y, w: 90, h: btnH };
  fill(inputDone ? DONE_COLOR : '#999');
  rect(x, y, 90, btnH, 4);
  fill(255);
  text('done = ' + inputDone, x + 45, y + btnH / 2);

  // Reset button
  x += 90 + spacing;
  resetBtn = { x: x, y: y, w: btnW, h: btnH };
  fill(100);
  rect(x, y, btnW, btnH, 4);
  fill(255);
  text('Reset', x + btnW / 2, y + btnH / 2);
}

function stepFSM() {
  let nextState = currentState;

  switch (currentState) {
    case 0: // IDLE
      if (inputStart === 1) {
        nextState = 1; // -> ACTIVE
        highlightedTransition = 0;
      } else {
        highlightedTransition = 1;
      }
      break;
    case 1: // ACTIVE
      if (inputDone === 1) {
        nextState = 2; // -> DONE
        highlightedTransition = 2;
      } else {
        highlightedTransition = 3;
      }
      break;
    case 2: // DONE
      nextState = 0; // -> IDLE
      highlightedTransition = 4;
      break;
  }

  currentState = nextState;
  highlightedState = currentState;
}

function mousePressed() {
  // Check control buttons
  if (stepBtn && isInside(mouseX, mouseY, stepBtn)) {
    stepFSM();
    return;
  }
  if (startBtn && isInside(mouseX, mouseY, startBtn)) {
    inputStart = 1 - inputStart;
    return;
  }
  if (doneBtn && isInside(mouseX, mouseY, doneBtn)) {
    inputDone = 1 - inputDone;
    return;
  }
  if (resetBtn && isInside(mouseX, mouseY, resetBtn)) {
    currentState = 0;
    highlightedState = -1;
    highlightedTransition = -1;
    highlightedCodeLine = -1;
    return;
  }

  // Check state circles
  for (let i = 0; i < stateCircles.length; i++) {
    let sc = stateCircles[i];
    if (sc && dist(mouseX, mouseY, sc.x, sc.y) < sc.r) {
      highlightedState = (highlightedState === i) ? -1 : i;
      highlightedTransition = -1;
      highlightedCodeLine = -1;
      return;
    }
  }

  // Check code line clicks
  for (let cl of codeLineRects) {
    if (isInside(mouseX, mouseY, cl)) {
      let lineIdx = cl.lineIdx;
      highlightedCodeLine = lineIdx;

      // Cross-reference to state
      highlightedState = -1;
      highlightedTransition = -1;
      for (let s = 0; s < 3; s++) {
        if (stateCodeLines[s].includes(lineIdx)) {
          highlightedState = s;
          break;
        }
      }
      // Cross-reference to transition
      for (let t = 0; t < transitions.length; t++) {
        let tr = transitions[t];
        if (lineIdx >= tr.codeLines[0] && lineIdx <= tr.codeLines[1]) {
          highlightedTransition = t;
          break;
        }
      }
      return;
    }
  }

  // Click on empty area clears highlights
  highlightedState = -1;
  highlightedTransition = -1;
  highlightedCodeLine = -1;
}

function isInside(mx, my, bounds) {
  return mx > bounds.x && mx < bounds.x + bounds.w && my > bounds.y && my < bounds.y + bounds.h;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, canvasHeight);
}

function updateCanvasSize() {
  var mainEl = document.querySelector('main');
  containerWidth = Math.floor(mainEl.getBoundingClientRect().width);
  canvasWidth = containerWidth;

  var availableHeight = window.innerHeight;
  var children = mainEl.children;
  for (var i = 0; i < children.length; i++) {
    if (children[i].tagName !== 'CANVAS') {
      availableHeight -= children[i].offsetHeight;
    }
  }
  drawHeight = Math.max(minDrawHeight, availableHeight - controlHeight);
  canvasHeight = drawHeight + controlHeight;
}
