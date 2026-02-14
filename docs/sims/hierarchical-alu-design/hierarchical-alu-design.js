// Hierarchical ALU Design - Animated MicroSim
// Shows how an 8-bit calculator system is built from hierarchical modules

let nodes = [];
let edges = [];
let animationStep = 0;
let maxStep = 0;
let autoPlay = false;
let autoTimer = 0;
let autoDelay = 60; // frames between steps
let hoveredNode = null;
let canvasW, canvasH;
let controlH = 60;

// Color palette
const COLORS = {
  system:   [41, 128, 185],   // blue
  datapath: [39, 174, 96],    // green
  control:  [192, 57, 43],    // red
  io:       [142, 68, 173],   // purple
  alu:      [44, 62, 80],     // dark blue-gray
  adder:    [22, 160, 133],   // teal
  leaf:     [243, 156, 18],   // orange
  register: [52, 73, 94],     // charcoal
  bg:       [248, 249, 250],
  line:     [149, 165, 166],
  text:     [44, 62, 80],
  highlight:[241, 196, 15]
};

function setup() {
  canvasW = min(windowWidth, 820);
  canvasH = 620;
  createCanvas(canvasW, canvasH + controlH);
  textFont('Arial');
  buildTree();
  maxStep = nodes.length;
}

function windowResized() {
  canvasW = min(windowWidth, 820);
  resizeCanvas(canvasW, canvasH + controlH);
  buildTree();
}

function buildTree() {
  nodes = [];
  edges = [];

  let cx = canvasW / 2;
  let yGap = 80;
  let y0 = 55;

  // Level 0: System
  addNode(0, "8-bit Calculator", cx, y0, COLORS.system, 0, "Top-level system integrating all subsystems");

  // Level 1: Datapath, Control, I/O
  let l1y = y0 + yGap;
  let l1w = canvasW * 0.32;
  addNode(1, "Datapath", cx - l1w, l1y, COLORS.datapath, 1, "Stores, transports, and transforms data");
  addNode(2, "Control Unit (FSM)", cx, l1y, COLORS.control, 1, "Generates control signals for the datapath");
  addNode(3, "I/O Interface", cx + l1w, l1y, COLORS.io, 1, "Handles external communication");

  addEdge(0, 1); addEdge(0, 2); addEdge(0, 3);

  // Level 2 under Datapath
  let l2y = l1y + yGap;
  let dpX = cx - l1w;
  addNode(4, "8-bit ALU", dpX - canvasW*0.14, l2y, COLORS.alu, 2, "Performs arithmetic and logic operations");
  addNode(5, "Register File\n(4×8 bits)", dpX, l2y, COLORS.register, 2, "4 general-purpose 8-bit registers");
  addNode(6, "Status Register\n(Z,C,N,V)", dpX + canvasW*0.14, l2y, COLORS.register, 2, "Zero, Carry, Negative, Overflow flags");

  addEdge(1, 4); addEdge(1, 5); addEdge(1, 6);

  // Level 2 under Control
  let ctrlX = cx;
  addNode(7, "Instruction\nDecoder", ctrlX - 55, l2y, COLORS.control, 2, "Decodes opcode into control signals");
  addNode(8, "Sequence\nController", ctrlX + 55, l2y, COLORS.control, 2, "FSM that sequences micro-operations");

  addEdge(2, 7); addEdge(2, 8);

  // Level 2 under I/O
  let ioX = cx + l1w;
  addNode(9, "Input Register", ioX - 55, l2y, COLORS.io, 2, "Latches external input data");
  addNode(10, "Output +\nDisplay Driver", ioX + 55, l2y, COLORS.io, 2, "Drives output display from result register");

  addEdge(3, 9); addEdge(3, 10);

  // Level 3 under ALU
  let l3y = l2y + yGap;
  let aluX = dpX - canvasW*0.14;
  let aluSpread = canvasW * 0.065;
  addNode(11, "8-bit\nAdder", aluX - 2*aluSpread, l3y, COLORS.adder, 3, "Ripple-carry adder from 8 full adders");
  addNode(12, "8-bit\nSubtractor", aluX - aluSpread, l3y, COLORS.adder, 3, "Uses adder + 2's complement");
  addNode(13, "8-bit\nAND", aluX, l3y, COLORS.leaf, 3, "Bitwise AND operation");
  addNode(14, "8-bit\nOR", aluX + aluSpread, l3y, COLORS.leaf, 3, "Bitwise OR operation");
  addNode(15, "Result\nMUX 4:1", aluX + 2*aluSpread, l3y, COLORS.leaf, 3, "Selects ALU output based on opcode");

  addEdge(4, 11); addEdge(4, 12); addEdge(4, 13); addEdge(4, 14); addEdge(4, 15);

  // Level 4 under Adder
  let l4y = l3y + yGap;
  addNode(16, "Full Adder ×8\n(ripple carry)", aluX - 2*aluSpread - 30, l4y, COLORS.leaf, 4, "8 cascaded full adders with carry chain");
  addEdge(11, 16);

  // Level 5 under Full Adder
  let l5y = l4y + yGap;
  addNode(17, "Half Adder ×2", aluX - 2*aluSpread - 30, l5y, COLORS.leaf, 5, "Basic building block: XOR + AND gates");
  addEdge(16, 17);
}

function addNode(id, label, x, y, col, level, desc) {
  nodes.push({ id, label, x, y, col, level, desc, visible: false, alpha: 0 });
}

function addEdge(fromId, toId) {
  edges.push({ from: fromId, to: toId });
}

function draw() {
  background(COLORS.bg);

  // Auto-play logic
  if (autoPlay) {
    autoTimer++;
    if (autoTimer >= autoDelay) {
      autoTimer = 0;
      if (animationStep < maxStep) {
        animationStep++;
        revealUpToStep(animationStep);
      } else {
        autoPlay = false;
      }
    }
  }

  // Animate alpha
  for (let n of nodes) {
    if (n.visible) {
      n.alpha = min(n.alpha + 12, 255);
    } else {
      n.alpha = max(n.alpha - 20, 0);
    }
  }

  // Draw edges
  for (let e of edges) {
    let fromN = nodes[e.from];
    let toN = nodes[e.to];
    let a = min(fromN.alpha, toN.alpha);
    if (a > 0) {
      stroke(COLORS.line[0], COLORS.line[1], COLORS.line[2], a);
      strokeWeight(2);
      line(fromN.x, fromN.y + 18, toN.x, toN.y - 18);
    }
  }

  // Draw nodes
  hoveredNode = null;
  for (let n of nodes) {
    if (n.alpha > 0) {
      drawNode(n);
    }
  }

  // Draw tooltip
  if (hoveredNode) {
    drawTooltip(hoveredNode);
  }

  // Draw title
  noStroke();
  fill(COLORS.text);
  textAlign(CENTER, TOP);
  textSize(15);
  textStyle(BOLD);
  text("Hierarchical ALU Design", canvasW / 2, 8);
  textStyle(NORMAL);

  // Draw level labels
  textSize(10);
  textAlign(LEFT, CENTER);
  fill(150);
  let levels = ["System", "Subsystems", "Components", "Sub-components", "Primitives", "Gates"];
  for (let i = 0; i <= 5; i++) {
    let ny = nodes.filter(n => n.level === i);
    if (ny.length > 0 && ny[0].alpha > 0) {
      let yy = ny[0].y;
      fill(150, 150, 150, ny[0].alpha);
      text("L" + i + ": " + levels[i], 5, yy);
    }
  }

  // Draw controls
  drawControls();
}

function drawNode(n) {
  let isHovered = dist(mouseX, mouseY, n.x, n.y) < 40;
  if (isHovered && mouseY < canvasH) hoveredNode = n;

  let w = 90, h = 36;
  let lines = n.label.split('\n');
  if (lines.length > 1) h = 44;

  // Shadow
  noStroke();
  fill(0, 0, 0, n.alpha * 0.1);
  rect(n.x - w/2 + 2, n.y - h/2 + 2, w, h, 8);

  // Box
  let c = n.col;
  if (isHovered && mouseY < canvasH) {
    fill(COLORS.highlight[0], COLORS.highlight[1], COLORS.highlight[2], n.alpha);
    stroke(c[0], c[1], c[2], n.alpha);
    strokeWeight(2);
  } else {
    fill(c[0], c[1], c[2], n.alpha);
    noStroke();
  }
  rect(n.x - w/2, n.y - h/2, w, h, 8);

  // Label
  fill(255, 255, 255, n.alpha);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(10);
  textStyle(BOLD);
  if (lines.length === 1) {
    text(n.label, n.x, n.y);
  } else {
    text(lines[0], n.x, n.y - 7);
    textStyle(NORMAL);
    textSize(9);
    text(lines[1], n.x, n.y + 7);
  }
  textStyle(NORMAL);
}

function drawTooltip(n) {
  let tw = textWidth(n.desc) + 20;
  tw = min(tw, 260);
  let th = 30;
  let tx = constrain(mouseX, tw/2 + 5, canvasW - tw/2 - 5);
  let ty = mouseY - 35;
  if (ty < 10) ty = mouseY + 25;

  fill(44, 62, 80, 230);
  noStroke();
  rect(tx - tw/2, ty - th/2, tw, th, 6);

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(11);
  text(n.desc, tx, ty);
}

function drawControls() {
  let y0 = canvasH + 5;

  // Background bar
  noStroke();
  fill(230, 230, 235);
  rect(0, canvasH, canvasW, controlH);

  // Step indicator
  fill(COLORS.text);
  textAlign(LEFT, CENTER);
  textSize(12);
  textStyle(BOLD);
  text("Step: " + animationStep + " / " + maxStep, 15, y0 + 18);
  textStyle(NORMAL);

  // Buttons
  let btnY = y0 + 8;
  let btnX = 160;
  let btnW = 48, btnH = 28, gap = 8;

  drawBtn("⏮", btnX, btnY, btnW, btnH, "reset");
  drawBtn("◀", btnX + btnW + gap, btnY, btnW, btnH, "prev");
  drawBtn(autoPlay ? "⏸" : "▶", btnX + 2*(btnW + gap), btnY, btnW, btnH, "play");
  drawBtn("▶▶", btnX + 3*(btnW + gap), btnY, btnW, btnH, "next");
  drawBtn("⏭", btnX + 4*(btnW + gap), btnY, btnW, btnH, "end");

  // Progress bar
  let pbX = 15, pbY = y0 + 42, pbW = canvasW - 30, pbH = 8;
  fill(200);
  rect(pbX, pbY, pbW, pbH, 4);
  fill(COLORS.system);
  let prog = maxStep > 0 ? animationStep / maxStep : 0;
  rect(pbX, pbY, pbW * prog, pbH, 4);
}

function drawBtn(label, x, y, w, h, action) {
  let hover = mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;
  fill(hover ? 52 : 80, hover ? 73 : 100, hover ? 94 : 120);
  noStroke();
  rect(x, y, w, h, 6);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(14);
  text(label, x + w/2, y + h/2);
}

function mousePressed() {
  let y0 = canvasH + 5;
  let btnY = y0 + 8;
  let btnX = 160;
  let btnW = 48, btnH = 28, gap = 8;

  if (mouseY > btnY && mouseY < btnY + btnH) {
    if (mouseX > btnX && mouseX < btnX + btnW) {
      // Reset
      animationStep = 0; autoPlay = false;
      revealUpToStep(0);
    } else if (mouseX > btnX + btnW + gap && mouseX < btnX + 2*btnW + gap) {
      // Prev
      autoPlay = false;
      animationStep = max(0, animationStep - 1);
      revealUpToStep(animationStep);
    } else if (mouseX > btnX + 2*(btnW + gap) && mouseX < btnX + 3*btnW + 2*gap) {
      // Play/Pause
      autoPlay = !autoPlay;
      autoTimer = 0;
    } else if (mouseX > btnX + 3*(btnW + gap) && mouseX < btnX + 4*btnW + 3*gap) {
      // Next
      autoPlay = false;
      animationStep = min(maxStep, animationStep + 1);
      revealUpToStep(animationStep);
    } else if (mouseX > btnX + 4*(btnW + gap) && mouseX < btnX + 5*btnW + 4*gap) {
      // End
      autoPlay = false;
      animationStep = maxStep;
      revealUpToStep(animationStep);
    }
  }

  // Progress bar click
  let pbX = 15, pbY = y0 + 42, pbW = canvasW - 30, pbH = 8;
  if (mouseY > pbY - 5 && mouseY < pbY + pbH + 5 && mouseX > pbX && mouseX < pbX + pbW) {
    autoPlay = false;
    let frac = (mouseX - pbX) / pbW;
    animationStep = round(frac * maxStep);
    revealUpToStep(animationStep);
  }
}

function revealUpToStep(step) {
  // Reveal nodes in order of their index (which follows hierarchy)
  for (let i = 0; i < nodes.length; i++) {
    nodes[i].visible = i < step;
  }
}

function keyPressed() {
  if (key === ' ') {
    autoPlay = !autoPlay;
    autoTimer = 0;
  } else if (keyCode === RIGHT_ARROW) {
    autoPlay = false;
    animationStep = min(maxStep, animationStep + 1);
    revealUpToStep(animationStep);
  } else if (keyCode === LEFT_ARROW) {
    autoPlay = false;
    animationStep = max(0, animationStep - 1);
    revealUpToStep(animationStep);
  }
}
