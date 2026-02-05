// Number Systems Concept Map MicroSim
// Interactive concept map showing relationships between number systems
// Bloom Level: Understand (L2) - Explain relationships
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 450;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let nodes = [];
let edges = [];
let selectedNode = null;
let hoveredNode = null;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  initializeGraph();

  describe('Interactive concept map showing number system relationships', LABEL);
}

function initializeGraph() {
  let centerX = canvasWidth / 2;
  let centerY = drawHeight / 2;

  nodes = [
    { id: 'number', label: 'Number\nSystems', x: centerX, y: centerY - 20,
      color: '#9c27b0', info: 'Methods for representing numeric values using different bases' },

    { id: 'binary', label: 'Binary\n(Base 2)', x: centerX - 150, y: centerY - 100,
      color: '#2196f3', info: 'Uses digits 0 and 1. Foundation of digital systems. Each bit represents a power of 2.' },

    { id: 'decimal', label: 'Decimal\n(Base 10)', x: centerX + 150, y: centerY - 100,
      color: '#4CAF50', info: 'Uses digits 0-9. Human-friendly format we use daily.' },

    { id: 'octal', label: 'Octal\n(Base 8)', x: centerX - 150, y: centerY + 80,
      color: '#ff9800', info: 'Uses digits 0-7. Each octal digit = 3 binary bits. Shorthand for binary.' },

    { id: 'hex', label: 'Hexadecimal\n(Base 16)', x: centerX + 150, y: centerY + 80,
      color: '#f44336', info: 'Uses 0-9 and A-F. Each hex digit = 4 binary bits. Common in programming.' },

    { id: 'signed', label: 'Signed\nNumbers', x: centerX, y: centerY + 170,
      color: '#795548', info: 'Representations for positive and negative values: sign-magnitude, 1\'s complement, 2\'s complement.' },

    { id: 'unsigned', label: 'Unsigned\nNumbers', x: centerX - 100, y: centerY + 250,
      color: '#607d8b', info: 'Non-negative integers only. Full range used for magnitude.' },

    { id: 'twos', label: "Two's\nComplement", x: centerX + 100, y: centerY + 250,
      color: '#e91e63', info: 'Most common signed representation. Simple addition hardware. One zero value.' }
  ];

  edges = [
    { from: 'number', to: 'binary', label: 'includes' },
    { from: 'number', to: 'decimal', label: 'includes' },
    { from: 'number', to: 'octal', label: 'includes' },
    { from: 'number', to: 'hex', label: 'includes' },
    { from: 'binary', to: 'octal', label: '3 bits = 1 digit' },
    { from: 'binary', to: 'hex', label: '4 bits = 1 digit' },
    { from: 'binary', to: 'signed', label: 'can be' },
    { from: 'signed', to: 'unsigned', label: 'vs' },
    { from: 'signed', to: 'twos', label: 'uses' }
  ];
}

function draw() {
  updateCanvasSize();
  updateNodePositions();

  // Drawing area
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(18);
  text('Number Systems Concept Map', canvasWidth / 2, 10);

  // Draw edges first
  for (let edge of edges) {
    drawEdge(edge);
  }

  // Draw nodes
  for (let node of nodes) {
    drawNode(node);
  }

  // Draw info box
  if (hoveredNode || selectedNode) {
    drawInfoBox(hoveredNode || selectedNode);
  }

  // Instructions
  fill('#666');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  text('Click or hover over concepts to learn more', canvasWidth / 2, drawHeight + 25);
}

function updateNodePositions() {
  let centerX = canvasWidth / 2;

  // Update x positions relative to center
  nodes[0].x = centerX;  // number
  nodes[1].x = centerX - min(150, canvasWidth * 0.3);  // binary
  nodes[2].x = centerX + min(150, canvasWidth * 0.3);  // decimal
  nodes[3].x = centerX - min(150, canvasWidth * 0.3);  // octal
  nodes[4].x = centerX + min(150, canvasWidth * 0.3);  // hex
  nodes[5].x = centerX;  // signed
  nodes[6].x = centerX - min(100, canvasWidth * 0.2);  // unsigned
  nodes[7].x = centerX + min(100, canvasWidth * 0.2);  // twos
}

function drawNode(node) {
  let isHovered = hoveredNode === node;
  let isSelected = selectedNode === node;

  // Node circle
  if (isHovered || isSelected) {
    fill(node.color);
    stroke('white');
    strokeWeight(3);
  } else {
    fill(node.color);
    stroke('white');
    strokeWeight(2);
  }

  let radius = isHovered || isSelected ? 45 : 40;
  ellipse(node.x, node.y, radius * 2);

  // Node label
  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  let lines = node.label.split('\n');
  let lineHeight = 13;
  let startY = node.y - (lines.length - 1) * lineHeight / 2;
  for (let i = 0; i < lines.length; i++) {
    text(lines[i], node.x, startY + i * lineHeight);
  }
}

function drawEdge(edge) {
  let fromNode = nodes.find(n => n.id === edge.from);
  let toNode = nodes.find(n => n.id === edge.to);

  if (!fromNode || !toNode) return;

  // Calculate direction
  let dx = toNode.x - fromNode.x;
  let dy = toNode.y - fromNode.y;
  let dist = sqrt(dx * dx + dy * dy);

  // Offset from node centers
  let offset = 42;
  let startX = fromNode.x + (dx / dist) * offset;
  let startY = fromNode.y + (dy / dist) * offset;
  let endX = toNode.x - (dx / dist) * offset;
  let endY = toNode.y - (dy / dist) * offset;

  // Draw line
  stroke('#999');
  strokeWeight(2);
  line(startX, startY, endX, endY);

  // Draw arrowhead
  let angle = atan2(dy, dx);
  let arrowSize = 8;
  fill('#999');
  noStroke();
  push();
  translate(endX, endY);
  rotate(angle);
  triangle(0, 0, -arrowSize, -arrowSize / 2, -arrowSize, arrowSize / 2);
  pop();

  // Draw edge label
  if (edge.label) {
    let midX = (startX + endX) / 2;
    let midY = (startY + endY) / 2;
    fill('white');
    noStroke();
    rect(midX - 35, midY - 8, 70, 16, 3);
    fill('#666');
    textAlign(CENTER, CENTER);
    textSize(9);
    text(edge.label, midX, midY);
  }
}

function drawInfoBox(node) {
  let boxY = drawHeight - 85;
  let boxHeight = 75;

  fill('white');
  stroke(node.color);
  strokeWeight(2);
  rect(20, boxY, canvasWidth - 40, boxHeight, 5);

  fill(node.color);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(13);
  text(node.label.replace('\n', ' '), 30, boxY + 8);

  fill('#333');
  textSize(11);
  text(node.info, 30, boxY + 28, canvasWidth - 60, boxHeight - 35);
}

function mouseMoved() {
  hoveredNode = null;
  for (let node of nodes) {
    let d = dist(mouseX, mouseY, node.x, node.y);
    if (d < 40) {
      hoveredNode = node;
      break;
    }
  }
}

function mousePressed() {
  for (let node of nodes) {
    let d = dist(mouseX, mouseY, node.x, node.y);
    if (d < 40) {
      selectedNode = selectedNode === node ? null : node;
      break;
    }
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
