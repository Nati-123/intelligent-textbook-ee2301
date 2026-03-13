// PLD Selection Tree MicroSim
// Interactive decision tree for selecting programmable logic devices
// Bloom Level: Evaluate (L5)

let containerWidth;
let canvasWidth = 400;
let drawHeight = 450;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

// Decision tree structure
// Each node: { id, question, yes, no, result, type, detail }
// type: 'decision' or 'result'
let treeData = {
  id: 0,
  question: 'Gate count > 10,000?',
  type: 'decision',
  yes: {
    id: 1,
    question: 'Need DSP/Memory blocks?',
    type: 'decision',
    yes: {
      id: 2,
      type: 'result',
      result: 'FPGA (High-End)',
      detail: 'High-end FPGA with dedicated DSP slices and block RAM. Examples: Xilinx Virtex, Intel Stratix. Ideal for complex signal processing and large designs.',
      deviceType: 'fpga'
    },
    no: {
      id: 3,
      question: 'Clock speed > 200MHz?',
      type: 'decision',
      yes: {
        id: 4,
        type: 'result',
        result: 'FPGA',
        detail: 'Mid-range FPGA for high-speed designs without specialized blocks. Examples: Xilinx Artix, Intel Cyclone. Good balance of speed and capacity.',
        deviceType: 'fpga'
      },
      no: {
        id: 5,
        type: 'result',
        result: 'Large CPLD',
        detail: 'Large CPLD with many function blocks. Examples: Xilinx CoolRunner-II, Intel MAX V. Non-volatile, instant-on, and deterministic timing.',
        deviceType: 'cpld'
      }
    }
  },
  no: {
    id: 6,
    question: 'Need sequential logic?',
    type: 'decision',
    yes: {
      id: 7,
      question: 'Multiple clock domains?',
      type: 'decision',
      yes: {
        id: 8,
        type: 'result',
        result: 'CPLD',
        detail: 'CPLD handles multiple clock domains with its function block architecture. Predictable timing and non-volatile configuration.',
        deviceType: 'cpld'
      },
      no: {
        id: 9,
        question: 'Gate count > 500?',
        type: 'decision',
        yes: {
          id: 10,
          type: 'result',
          result: 'CPLD',
          detail: 'Small to medium CPLD for sequential designs. Offers flip-flops and combinational logic in each function block.',
          deviceType: 'cpld'
        },
        no: {
          id: 11,
          type: 'result',
          result: 'PAL/GAL (SPLD)',
          detail: 'Simple PAL or GAL device with registered outputs. Lowest cost option for small sequential circuits. One-time or reprogrammable.',
          deviceType: 'spld'
        }
      }
    },
    no: {
      id: 12,
      question: 'Simple combinational?',
      type: 'decision',
      yes: {
        id: 13,
        type: 'result',
        result: 'PLA/ROM (SPLD)',
        detail: 'PLA or ROM-based SPLD for combinational logic. PLA offers flexible AND-OR structure. ROM can implement any truth table directly.',
        deviceType: 'spld'
      },
      no: {
        id: 14,
        type: 'result',
        result: 'PAL (SPLD)',
        detail: 'PAL device with fixed OR array. Efficient for sum-of-products implementations. Low cost and simple programming.',
        deviceType: 'spld'
      }
    }
  }
};

// Path through the tree: array of { nodeId, answer }
let path = [];
let currentNode = treeData;
let treeFinished = false;

// Node positions for drawing (computed once)
let nodePositions = {};

const colors = {
  decision: '#5C6BC0',
  fpga: '#4CAF50',
  cpld: '#FF9800',
  spld: '#9C27B0',
  active: '#FFC107',
  pathLine: '#2196F3',
  bg: '#f5f5f5',
  text: '#212121',
  pending: '#E0E0E0',
  yesBtn: '#4CAF50',
  noBtn: '#F44336'
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  describe('Interactive PLD selection decision tree for choosing SPLD, CPLD, or FPGA', LABEL);
  computeNodePositions();
}

function computeNodePositions() {
  // Assign positions using a recursive layout
  nodePositions = {};
  layoutNode(treeData, canvasWidth / 2, 55, canvasWidth * 0.42, 0);
}

function layoutNode(node, x, y, spreadX, depth) {
  nodePositions[node.id] = { x: x, y: y, node: node };

  if (node.type === 'decision') {
    let childY = y + 70;
    let childSpread = spreadX * 0.55;
    if (node.yes) layoutNode(node.yes, x - spreadX / 2, childY, childSpread, depth + 1);
    if (node.no) layoutNode(node.no, x + spreadX / 2, childY, childSpread, depth + 1);
  }
}

function draw() {
  updateCanvasSize();

  // Recompute positions on resize
  computeNodePositions();

  // Background
  fill(colors.bg);
  noStroke();
  rect(0, 0, canvasWidth, drawHeight);

  // Control area
  fill(243, 245, 250);
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill(colors.text);
  noStroke();
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(16);
  text('PLD Selection Decision Tree', canvasWidth / 2, 14);
  textStyle(NORMAL);
  // Decorative underline
  stroke(220);
  strokeWeight(1);
  line(canvasWidth / 2 - 100, 26, canvasWidth / 2 + 100, 26);

  // Readout panel
  let rpW = 280;
  let rpX = (canvasWidth - rpW) / 2;
  let rpY = 31;
  fill(247, 249, 252);
  stroke(210, 215, 225);
  strokeWeight(1);
  rect(rpX, rpY, rpW, 18, 8);
  noStroke();
  fill(92, 107, 192);
  rect(rpX, rpY + 3, 4, 12, 2, 0, 0, 2);
  textAlign(LEFT, CENTER);
  textSize(10);
  fill(92, 107, 192);
  text('Path: ' + (path.length === 0 ? 'Start' : path.length + ' decision' + (path.length > 1 ? 's' : '')), rpX + 12, rpY + 9);
  fill(120);
  if (treeFinished && currentNode.type === 'result') {
    let dc = colors[currentNode.deviceType] || colors.decision;
    fill(dc);
    text('|  Result: ' + currentNode.result, rpX + 130, rpY + 9);
  } else {
    text('|  Awaiting input...', rpX + 130, rpY + 9);
  }

  // Draw all edges first
  drawEdges(treeData);

  // Draw highlighted path
  drawPath();

  // Draw all nodes
  drawNodes(treeData);

  // Draw Yes/No buttons for current decision node
  if (!treeFinished && currentNode.type === 'decision') {
    drawDecisionButtons();
  }

  // Draw info panel
  drawInfoPanel();

  // Draw reset button
  drawResetButton();
}

function drawEdges(node) {
  if (node.type !== 'decision') return;

  let pos = nodePositions[node.id];
  if (!pos) return;

  // Draw edges to children
  if (node.yes) {
    let childPos = nodePositions[node.yes.id];
    if (childPos) {
      stroke(colors.pending);
      strokeWeight(1.5);
      line(pos.x, pos.y + 18, childPos.x, childPos.y - 18);

      // Yes/No labels on edges
      fill('#999');
      noStroke();
      textSize(8);
      textAlign(CENTER, CENTER);
      let midX = (pos.x + childPos.x) / 2 - 10;
      let midY = (pos.y + childPos.y) / 2;
      text('Yes', midX, midY);
    }
    drawEdges(node.yes);
  }

  if (node.no) {
    let childPos = nodePositions[node.no.id];
    if (childPos) {
      stroke(colors.pending);
      strokeWeight(1.5);
      line(pos.x, pos.y + 18, childPos.x, childPos.y - 18);

      // No label
      fill('#999');
      noStroke();
      textSize(8);
      textAlign(CENTER, CENTER);
      let midX = (pos.x + childPos.x) / 2 + 10;
      let midY = (pos.y + childPos.y) / 2;
      text('No', midX, midY);
    }
    drawEdges(node.no);
  }
}

function drawPath() {
  if (path.length === 0) return;

  stroke(colors.pathLine);
  strokeWeight(3);

  // Draw lines along path
  let prevNode = treeData;
  for (let step of path) {
    let fromPos = nodePositions[prevNode.id];
    let nextNode = step.answer === 'yes' ? prevNode.yes : prevNode.no;
    let toPos = nodePositions[nextNode.id];

    if (fromPos && toPos) {
      line(fromPos.x, fromPos.y + 18, toPos.x, toPos.y - 18);
    }

    prevNode = nextNode;
  }
}

function drawNodes(node) {
  let pos = nodePositions[node.id];
  if (!pos) return;

  let isCurrent = currentNode.id === node.id;
  let isOnPath = isNodeOnPath(node.id);
  let nodeW, nodeH;

  if (node.type === 'decision') {
    nodeW = Math.min(140, canvasWidth * 0.28);
    nodeH = 34;

    // Decision node (rounded rect) with glow on current
    if (isCurrent) {
      noStroke();
      fill(255, 193, 7, 50);
      rect(pos.x - nodeW / 2 - 3, pos.y - nodeH / 2 - 3, nodeW + 6, nodeH + 6, 9);
      fill(colors.active);
      stroke('#F57F17');
      strokeWeight(2.5);
    } else if (isOnPath) {
      fill(colors.decision);
      stroke('#3949AB');
      strokeWeight(1.5);
    } else {
      fill(colors.pending);
      stroke('#CACACA');
      strokeWeight(1);
    }
    rect(pos.x - nodeW / 2, pos.y - nodeH / 2, nodeW, nodeH, 6);

    // Question text
    fill(isCurrent ? colors.text : (isOnPath ? 'white' : '#999'));
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(9);
    text(node.question, pos.x, pos.y);

    // Recurse
    if (node.yes) drawNodes(node.yes);
    if (node.no) drawNodes(node.no);
  } else {
    // Result node
    nodeW = Math.min(120, canvasWidth * 0.25);
    nodeH = 30;

    let deviceColor = colors[node.deviceType] || colors.decision;
    if (isCurrent) {
      noStroke();
      fill(red(color(deviceColor)), green(color(deviceColor)), blue(color(deviceColor)), 50);
      rect(pos.x - nodeW / 2 - 3, pos.y - nodeH / 2 - 3, nodeW + 6, nodeH + 6, 18);
      fill(deviceColor);
      stroke('#333');
      strokeWeight(2.5);
    } else if (isOnPath) {
      fill(deviceColor);
      stroke('#333');
      strokeWeight(1.5);
    } else {
      fill(colors.pending);
      stroke('#CACACA');
      strokeWeight(1);
    }
    rect(pos.x - nodeW / 2, pos.y - nodeH / 2, nodeW, nodeH, 15);

    // Result text
    fill(isCurrent || isOnPath ? 'white' : '#999');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(9);
    text(node.result, pos.x, pos.y);
  }
}

function isNodeOnPath(nodeId) {
  if (treeData.id === nodeId && path.length > 0) return true;

  let node = treeData;
  for (let step of path) {
    let nextNode = step.answer === 'yes' ? node.yes : node.no;
    if (nextNode && nextNode.id === nodeId) return true;
    node = nextNode;
  }
  return false;
}

function drawDecisionButtons() {
  let pos = nodePositions[currentNode.id];
  if (!pos) return;

  let btnW = 50;
  let btnH = 22;
  let btnY = pos.y + 22;

  // Yes button with subtle glow
  let yesX = pos.x - btnW - 8;
  noStroke();
  fill(76, 175, 80, 30);
  rect(yesX - 1, btnY - 1, btnW + 2, btnH + 2, 6);
  fill(colors.yesBtn);
  stroke('#2E7D32');
  strokeWeight(1);
  rect(yesX, btnY, btnW, btnH, 5);
  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  textStyle(BOLD);
  text('Yes', yesX + btnW / 2, btnY + btnH / 2);
  textStyle(NORMAL);

  // No button with subtle glow
  let noX = pos.x + 8;
  noStroke();
  fill(244, 67, 54, 30);
  rect(noX - 1, btnY - 1, btnW + 2, btnH + 2, 6);
  fill(colors.noBtn);
  stroke('#C62828');
  strokeWeight(1);
  rect(noX, btnY, btnW, btnH, 5);
  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  textStyle(BOLD);
  text('No', noX + btnW / 2, btnY + btnH / 2);
  textStyle(NORMAL);
}

function drawInfoPanel() {
  let panelY = drawHeight - 70;
  let panelH = 60;

  fill(247, 249, 252);
  stroke(210, 215, 225);
  strokeWeight(1);
  rect(15, panelY, canvasWidth - 30, panelH, 8);

  if (treeFinished && currentNode.type === 'result') {
    let deviceColor = colors[currentNode.deviceType] || colors.decision;
    // Accent line
    noStroke();
    fill(deviceColor);
    rect(15, panelY + 8, 4, panelH - 16, 2, 0, 0, 2);

    // Tag
    let tagText = currentNode.result;
    fill(deviceColor);
    rect(27, panelY + 5, textWidth(tagText) + 16, 15, 4);
    fill(255);
    textAlign(LEFT, CENTER);
    textSize(10);
    textStyle(BOLD);
    text(tagText, 33, panelY + 12);
    textStyle(NORMAL);

    // Description
    fill(colors.text);
    textAlign(LEFT, TOP);
    textSize(10);
    text(currentNode.detail, 27, panelY + 24, canvasWidth - 54, panelH - 30);
  } else if (currentNode.type === 'decision') {
    // Accent line
    noStroke();
    fill(92, 107, 192);
    rect(15, panelY + 8, 4, panelH - 16, 2, 0, 0, 2);

    // Question tag
    let tagText = 'Question';
    fill(92, 107, 192);
    rect(27, panelY + 5, textWidth(tagText) + 16, 15, 4);
    fill(255);
    textAlign(LEFT, CENTER);
    textSize(10);
    textStyle(BOLD);
    text(tagText, 33, panelY + 12);
    textStyle(NORMAL);

    fill(colors.text);
    textSize(11);
    text(currentNode.question, 27 + textWidth(tagText) + 22, panelY + 12);

    fill(150);
    textAlign(LEFT, TOP);
    textSize(10);
    text('Click Yes or No to proceed through the decision tree.', 27, panelY + 28);
  } else {
    fill(180);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    text('Start answering questions to find the right PLD', canvasWidth / 2, panelY + panelH / 2);
  }
}

function drawResetButton() {
  // Styled instruction area
  let instrW = canvasWidth - 24;
  fill(235, 237, 242);
  noStroke();
  rect(12, drawHeight + 4, instrW, 16, 8);
  fill(100);
  textAlign(CENTER, CENTER);
  textSize(10);
  text('Answer Yes/No at each decision  |  Reset to start over', canvasWidth / 2, drawHeight + 12);

  let btnW = 65;
  let btnH = 20;
  let btnX = canvasWidth / 2 - btnW / 2;
  let btnY = drawHeight + 26;

  fill('#FF5722');
  stroke('#BF360C');
  strokeWeight(1);
  rect(btnX, btnY, btnW, btnH, 5);
  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  textStyle(BOLD);
  text('Reset', btnX + btnW / 2, btnY + btnH / 2);
  textStyle(NORMAL);

  // Cursor management
  let overInteractive = false;
  // Check reset button
  if (mouseX >= btnX && mouseX <= btnX + btnW &&
      mouseY >= btnY && mouseY <= btnY + btnH) overInteractive = true;
  // Check Yes/No buttons
  if (!treeFinished && currentNode.type === 'decision') {
    let pos = nodePositions[currentNode.id];
    if (pos) {
      let dbW = 50, dbH = 22, dbY = pos.y + 22;
      let yX = pos.x - dbW - 8;
      let nX = pos.x + 8;
      if (mouseY >= dbY && mouseY <= dbY + dbH) {
        if (mouseX >= yX && mouseX <= yX + dbW) overInteractive = true;
        if (mouseX >= nX && mouseX <= nX + dbW) overInteractive = true;
      }
    }
  }
  cursor(overInteractive ? HAND : ARROW);
}

function mousePressed() {
  // Check Yes/No button clicks for current decision node
  if (!treeFinished && currentNode.type === 'decision') {
    let pos = nodePositions[currentNode.id];
    if (pos) {
      let btnW = 50;
      let btnH = 22;
      let btnY = pos.y + 22;

      // Yes button
      let yesX = pos.x - btnW - 8;
      if (mouseX >= yesX && mouseX <= yesX + btnW && mouseY >= btnY && mouseY <= btnY + btnH) {
        path.push({ nodeId: currentNode.id, answer: 'yes' });
        currentNode = currentNode.yes;
        if (currentNode.type === 'result') treeFinished = true;
        return;
      }

      // No button
      let noX = pos.x + 8;
      if (mouseX >= noX && mouseX <= noX + btnW && mouseY >= btnY && mouseY <= btnY + btnH) {
        path.push({ nodeId: currentNode.id, answer: 'no' });
        currentNode = currentNode.no;
        if (currentNode.type === 'result') treeFinished = true;
        return;
      }
    }
  }

  // Check reset button
  let resetW = 65;
  let resetH = 20;
  let resetX = canvasWidth / 2 - resetW / 2;
  let resetY = drawHeight + 26;
  if (mouseX >= resetX && mouseX <= resetX + resetW && mouseY >= resetY && mouseY <= resetY + resetH) {
    path = [];
    currentNode = treeData;
    treeFinished = false;
    return;
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
