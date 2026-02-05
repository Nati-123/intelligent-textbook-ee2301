// Course Structure Tree MicroSim
// Interactive visualization of the textbook hierarchy
// Bloom Level: Understand (L2) - Visualize course organization
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 550;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let expandAllBtn, collapseAllBtn;
let treeData;
let nodeRadius = 8;
let levelIndent = 25;
let nodeHeight = 28;
let scrollOffset = 0;
let maxScroll = 0;
let hoveredNode = null;

// Color scheme
const colors = {
  root: '#1976D2',
  unit: '#7B1FA2',
  content: '#388E3C',
  quiz: '#F57C00',
  references: '#00796B',
  microsim: '#C2185B',
  resource: '#455A64',
  line: '#BDBDBD',
  hover: '#FFF9C4',
  text: '#212121',
  textLight: '#757575'
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  expandAllBtn = createButton('Expand All');
  expandAllBtn.mousePressed(expandAll);

  collapseAllBtn = createButton('Collapse All');
  collapseAllBtn.mousePressed(collapseAll);

  positionUIElements();

  // Initialize tree data
  initTreeData();

  describe('Interactive course structure tree showing textbook organization', LABEL);
}

function positionUIElements() {
  let mainRect = document.querySelector('main').getBoundingClientRect();
  expandAllBtn.position(mainRect.left + 20, mainRect.top + drawHeight + 12);
  collapseAllBtn.position(mainRect.left + 110, mainRect.top + drawHeight + 12);
}

function initTreeData() {
  treeData = {
    name: 'Digital System Design (EE 2301)',
    type: 'root',
    expanded: true,
    children: [
      {
        name: 'Unit 1: Number Systems',
        type: 'unit',
        expanded: false,
        children: [
          { name: 'Content', type: 'content', children: [] },
          { name: 'Quiz', type: 'quiz', children: [] },
          { name: 'References', type: 'references', children: [] },
          {
            name: 'MicroSims (7)',
            type: 'microsim',
            expanded: false,
            children: [
              { name: 'Base Converter', type: 'microsim', children: [] },
              { name: 'Analog vs Digital Signals', type: 'microsim', children: [] },
              { name: 'Positional Notation Explorer', type: 'microsim', children: [] },
              { name: 'Binary Arithmetic Practice', type: 'microsim', children: [] },
              { name: 'Signed Number Comparison', type: 'microsim', children: [] },
              { name: 'Overflow Detection Simulator', type: 'microsim', children: [] },
              { name: 'Number Systems Concept Map', type: 'microsim', children: [] }
            ]
          }
        ]
      },
      {
        name: 'Unit 2: Boolean Algebra',
        type: 'unit',
        expanded: false,
        children: [
          { name: 'Content', type: 'content', children: [] },
          { name: 'Quiz', type: 'quiz', children: [] },
          { name: 'References', type: 'references', children: [] },
          {
            name: 'MicroSims (8)',
            type: 'microsim',
            expanded: false,
            children: [
              { name: 'Logic Gate Simulator', type: 'microsim', children: [] },
              { name: 'Boolean Operations Visualizer', type: 'microsim', children: [] },
              { name: 'Truth Table Generator', type: 'microsim', children: [] },
              { name: 'Boolean Laws Explorer', type: 'microsim', children: [] },
              { name: "De Morgan's Theorem Visualizer", type: 'microsim', children: [] },
              { name: 'Boolean Simplification Tutor', type: 'microsim', children: [] },
              { name: 'Gate Cascade Simulator', type: 'microsim', children: [] },
              { name: 'Circuit Analysis & Synthesis', type: 'microsim', children: [] }
            ]
          }
        ]
      },
      {
        name: 'Unit 3: Applications of Boolean Algebra',
        type: 'unit',
        expanded: false,
        children: [
          { name: 'Content', type: 'content', children: [] },
          { name: 'Quiz', type: 'quiz', children: [] },
          { name: 'References', type: 'references', children: [] },
          {
            name: 'MicroSims (8)',
            type: 'microsim',
            expanded: false,
            children: [
              { name: 'Binary Adder Visualizer', type: 'microsim', children: [] },
              { name: 'Design Flow Visualization', type: 'microsim', children: [] },
              { name: 'Word Problem Translator', type: 'microsim', children: [] },
              { name: 'Adder-Subtractor Builder', type: 'microsim', children: [] },
              { name: 'Parity Circuit Simulator', type: 'microsim', children: [] },
              { name: 'Code Converter Demo', type: 'microsim', children: [] },
              { name: 'Seven Segment Decoder', type: 'microsim', children: [] },
              { name: "Don't Care Optimizer", type: 'microsim', children: [] }
            ]
          }
        ]
      },
      {
        name: 'Unit 4: Minterm & Maxterm Expansions',
        type: 'unit',
        expanded: false,
        children: [
          { name: 'Content', type: 'content', children: [] },
          { name: 'Quiz', type: 'quiz', children: [] },
          { name: 'References', type: 'references', children: [] },
          {
            name: 'MicroSims (4)',
            type: 'microsim',
            expanded: false,
            children: [
              { name: 'Minterm/Maxterm Converter', type: 'microsim', children: [] },
              { name: 'Minterm Visualizer', type: 'microsim', children: [] },
              { name: 'SOP-POS Converter', type: 'microsim', children: [] },
              { name: 'Shannon Expansion Explorer', type: 'microsim', children: [] }
            ]
          }
        ]
      },
      {
        name: 'Unit 5: Karnaugh Maps',
        type: 'unit',
        expanded: false,
        children: [
          { name: 'Content', type: 'content', children: [] },
          { name: 'Quiz', type: 'quiz', children: [] },
          { name: 'References', type: 'references', children: [] },
          {
            name: 'MicroSims (5)',
            type: 'microsim',
            expanded: false,
            children: [
              { name: 'K-Map Solver', type: 'microsim', children: [] },
              { name: 'K-Map 3-Variable Simulator', type: 'microsim', children: [] },
              { name: 'Prime Implicant Finder', type: 'microsim', children: [] },
              { name: "K-Map with Don't Cares", type: 'microsim', children: [] },
              { name: 'K-Map Practice Challenge', type: 'microsim', children: [] }
            ]
          }
        ]
      },
      {
        name: 'Unit 6: Quine-McCluskey Method',
        type: 'unit',
        expanded: false,
        children: [
          { name: 'Content', type: 'content', children: [] },
          { name: 'Quiz', type: 'quiz', children: [] },
          { name: 'References', type: 'references', children: [] },
          {
            name: 'MicroSims (5)',
            type: 'microsim',
            expanded: false,
            children: [
              { name: 'QM Grouping Visualization', type: 'microsim', children: [] },
              { name: 'QM Combination Simulator', type: 'microsim', children: [] },
              { name: 'PI Chart Interactive', type: 'microsim', children: [] },
              { name: 'QM Complexity Chart', type: 'microsim', children: [] },
              { name: 'QM Complete Walkthrough', type: 'microsim', children: [] }
            ]
          }
        ]
      },
      {
        name: 'Unit 7: Multi-Level Gate Circuits',
        type: 'unit',
        expanded: false,
        children: [
          { name: 'Content', type: 'content', children: [] },
          { name: 'Quiz', type: 'quiz', children: [] },
          { name: 'References', type: 'references', children: [] }
        ]
      },
      {
        name: 'Unit 8: Combinational Logic Modules',
        type: 'unit',
        expanded: false,
        children: [
          { name: 'Content', type: 'content', children: [] },
          { name: 'Quiz', type: 'quiz', children: [] },
          { name: 'References', type: 'references', children: [] }
        ]
      },
      {
        name: 'Unit 9: Sequential Logic Fundamentals',
        type: 'unit',
        expanded: false,
        children: [
          { name: 'Content', type: 'content', children: [] },
          { name: 'Quiz', type: 'quiz', children: [] },
          { name: 'References', type: 'references', children: [] }
        ]
      },
      {
        name: 'Unit 10: Sequential Circuit Design',
        type: 'unit',
        expanded: false,
        children: [
          { name: 'Content', type: 'content', children: [] },
          { name: 'Quiz', type: 'quiz', children: [] },
          { name: 'References', type: 'references', children: [] }
        ]
      },
      {
        name: 'Resources',
        type: 'resource',
        expanded: false,
        children: [
          { name: 'Course Description', type: 'resource', children: [] },
          { name: 'FAQ (72 questions)', type: 'resource', children: [] },
          { name: 'Glossary (200 terms)', type: 'resource', children: [] },
          {
            name: 'Learning Graph',
            type: 'resource',
            expanded: false,
            children: [
              { name: 'Concept List', type: 'resource', children: [] },
              { name: 'Book Metrics', type: 'resource', children: [] },
              { name: 'Quality Reports', type: 'resource', children: [] }
            ]
          }
        ]
      }
    ]
  };
}

function draw() {
  updateCanvasSize();

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
  text('Course Structure Tree', canvasWidth / 2, 10);

  // Subtitle
  textSize(11);
  fill(colors.textLight);
  text('Click nodes to expand/collapse', canvasWidth / 2, 32);

  // Draw tree
  push();
  translate(0, -scrollOffset);
  hoveredNode = null;
  let y = 60;
  y = drawNode(treeData, 20, y, 0);
  maxScroll = Math.max(0, y - drawHeight + 80);
  pop();

  // Draw legend
  drawLegend();

  // Draw scroll indicator if needed
  if (maxScroll > 0) {
    drawScrollIndicator();
  }

  // Stats
  fill(colors.textLight);
  textAlign(RIGHT, CENTER);
  textSize(10);
  text('10 Units | 37 MicroSims', canvasWidth - 20, drawHeight + 25);
}

function drawNode(node, x, y, depth) {
  let nodeY = y + scrollOffset;
  let isVisible = nodeY > 40 && nodeY < drawHeight - 10;

  if (isVisible) {
    // Check hover
    let isHovered = mouseX > x - 5 && mouseX < canvasWidth - 20 &&
                    mouseY > y - nodeHeight/2 && mouseY < y + nodeHeight/2;
    if (isHovered) hoveredNode = node;

    // Hover background
    if (isHovered) {
      fill(colors.hover);
      noStroke();
      rect(x - 5, y - nodeHeight/2 + 2, canvasWidth - x - 15, nodeHeight - 4, 3);
    }

    // Draw expand/collapse indicator
    if (node.children && node.children.length > 0) {
      fill(getNodeColor(node.type));
      noStroke();
      textAlign(CENTER, CENTER);
      textSize(12);
      text(node.expanded ? '▼' : '▶', x + 5, y);
    }

    // Draw node circle
    fill(getNodeColor(node.type));
    noStroke();
    ellipse(x + 20, y, nodeRadius * 2);

    // Draw node label
    fill(colors.text);
    textAlign(LEFT, CENTER);
    textSize(12);
    text(node.name, x + 35, y);
  }

  y += nodeHeight;

  // Draw children if expanded
  if (node.expanded && node.children) {
    for (let child of node.children) {
      // Draw connecting line
      if (isVisible || (y + scrollOffset > 40 && y + scrollOffset < drawHeight)) {
        stroke(colors.line);
        strokeWeight(1);
        line(x + 20, y - nodeHeight + 10, x + 20, y - 5);
        line(x + 20, y - 5, x + levelIndent + 10, y - 5);
      }
      y = drawNode(child, x + levelIndent, y, depth + 1);
    }
  }

  return y;
}

function getNodeColor(type) {
  return colors[type] || colors.resource;
}

function drawLegend() {
  let legendY = drawHeight - 60;
  let legendX = 15;
  let spacing = 85;

  fill(255, 255, 255, 230);
  stroke(colors.line);
  strokeWeight(1);
  rect(10, legendY - 5, canvasWidth - 20, 50, 5);

  textSize(9);
  textAlign(LEFT, CENTER);

  let items = [
    { color: colors.unit, label: 'Unit' },
    { color: colors.content, label: 'Content' },
    { color: colors.quiz, label: 'Quiz' },
    { color: colors.references, label: 'References' },
    { color: colors.microsim, label: 'MicroSim' },
    { color: colors.resource, label: 'Resource' }
  ];

  let row1 = items.slice(0, 3);
  let row2 = items.slice(3);

  for (let i = 0; i < row1.length; i++) {
    fill(row1[i].color);
    noStroke();
    ellipse(legendX + i * spacing + 8, legendY + 10, 12);
    fill(colors.text);
    text(row1[i].label, legendX + i * spacing + 18, legendY + 10);
  }

  for (let i = 0; i < row2.length; i++) {
    fill(row2[i].color);
    noStroke();
    ellipse(legendX + i * spacing + 8, legendY + 28, 12);
    fill(colors.text);
    text(row2[i].label, legendX + i * spacing + 18, legendY + 28);
  }
}

function drawScrollIndicator() {
  let barHeight = drawHeight - 100;
  let barX = canvasWidth - 12;
  let barY = 50;

  // Track
  fill(230);
  noStroke();
  rect(barX, barY, 8, barHeight, 4);

  // Thumb
  let thumbHeight = Math.max(30, barHeight * (drawHeight / (maxScroll + drawHeight)));
  let thumbY = barY + (scrollOffset / maxScroll) * (barHeight - thumbHeight);

  fill(180);
  rect(barX, thumbY, 8, thumbHeight, 4);
}

function mousePressed() {
  if (mouseY > drawHeight) return;

  if (hoveredNode && hoveredNode.children && hoveredNode.children.length > 0) {
    hoveredNode.expanded = !hoveredNode.expanded;
  }
}

function mouseWheel(event) {
  if (mouseY < drawHeight) {
    scrollOffset += event.delta;
    scrollOffset = constrain(scrollOffset, 0, maxScroll);
    return false;
  }
}

function expandAll() {
  setExpandedRecursive(treeData, true);
}

function collapseAll() {
  setExpandedRecursive(treeData, false);
  treeData.expanded = true; // Keep root expanded
}

function setExpandedRecursive(node, expanded) {
  if (node.children && node.children.length > 0) {
    node.expanded = expanded;
    for (let child of node.children) {
      setExpandedRecursive(child, expanded);
    }
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  positionUIElements();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
