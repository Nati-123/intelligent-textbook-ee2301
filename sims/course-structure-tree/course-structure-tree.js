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
  narration: '#0277BD',
  quiz: '#F57C00',
  problems: '#E64A19',
  challenge: '#AD1457',
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
          { name: 'Narration', type: 'narration', children: [] },
          { name: 'Quiz', type: 'quiz', children: [] },
          { name: 'Problems', type: 'problems', children: [] },
          { name: 'Challenge', type: 'challenge', children: [] },
          { name: 'References', type: 'references', children: [] },
          {
            name: 'MicroSims (8)',
            type: 'microsim',
            expanded: false,
            children: [
              { name: 'Base Converter', type: 'microsim', children: [] },
              { name: 'Analog vs Digital Signals', type: 'microsim', children: [] },
              { name: 'Positional Notation Explorer', type: 'microsim', children: [] },
              { name: 'Binary Arithmetic Practice', type: 'microsim', children: [] },
              { name: 'Signed Number Comparison', type: 'microsim', children: [] },
              { name: 'Overflow Detection Simulator', type: 'microsim', children: [] },
              { name: 'Number Systems Concept Map', type: 'microsim', children: [] },
              { name: 'Base Conversion Walkthrough', type: 'microsim', children: [] }
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
          { name: 'Narration', type: 'narration', children: [] },
          { name: 'Quiz', type: 'quiz', children: [] },
          { name: 'Problems', type: 'problems', children: [] },
          { name: 'Challenge', type: 'challenge', children: [] },
          { name: 'References', type: 'references', children: [] },
          {
            name: 'MicroSims (23)',
            type: 'microsim',
            expanded: false,
            children: [
              { name: 'AND Gate Truth Table', type: 'microsim', children: [] },
              { name: 'OR Gate Truth Table', type: 'microsim', children: [] },
              { name: 'NOT Gate Truth Table', type: 'microsim', children: [] },
              { name: 'Buffer Gate Truth Table', type: 'microsim', children: [] },
              { name: 'Tri-State Buffer Truth Table', type: 'microsim', children: [] },
              { name: 'NAND Gate Truth Table', type: 'microsim', children: [] },
              { name: 'NOR Gate Truth Table', type: 'microsim', children: [] },
              { name: 'XOR Gate Truth Table', type: 'microsim', children: [] },
              { name: 'XNOR Gate Truth Table', type: 'microsim', children: [] },
              { name: 'Logic Gate Simulator', type: 'microsim', children: [] },
              { name: 'Boolean Operations Visualizer', type: 'microsim', children: [] },
              { name: 'Truth Table Generator', type: 'microsim', children: [] },
              { name: 'Boolean Laws Explorer', type: 'microsim', children: [] },
              { name: "De Morgan's Theorem Visualizer", type: 'microsim', children: [] },
              { name: 'Boolean Simplification Tutor', type: 'microsim', children: [] },
              { name: '3-Input AND Gate', type: 'microsim', children: [] },
              { name: '3-Input OR Gate', type: 'microsim', children: [] },
              { name: '3-Input NAND Gate', type: 'microsim', children: [] },
              { name: '3-Input NOR Gate', type: 'microsim', children: [] },
              { name: '3-Input XOR Gate', type: 'microsim', children: [] },
              { name: 'Gate Cascade Simulator', type: 'microsim', children: [] },
              { name: 'Circuit Analysis & Synthesis', type: 'microsim', children: [] },
              { name: 'Boolean Proof Walkthrough', type: 'microsim', children: [] }
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
          { name: 'Narration', type: 'narration', children: [] },
          { name: 'Quiz', type: 'quiz', children: [] },
          { name: 'Problems', type: 'problems', children: [] },
          { name: 'Challenge', type: 'challenge', children: [] },
          { name: 'References', type: 'references', children: [] },
          {
            name: 'MicroSims (9)',
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
              { name: "Don't Care Optimizer", type: 'microsim', children: [] },
              { name: 'Full Adder Walkthrough', type: 'microsim', children: [] }
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
          { name: 'Narration', type: 'narration', children: [] },
          { name: 'Quiz', type: 'quiz', children: [] },
          { name: 'Problems', type: 'problems', children: [] },
          { name: 'Challenge', type: 'challenge', children: [] },
          { name: 'References', type: 'references', children: [] },
          {
            name: 'MicroSims (5)',
            type: 'microsim',
            expanded: false,
            children: [
              { name: 'Minterm/Maxterm Converter', type: 'microsim', children: [] },
              { name: 'Minterm Visualizer', type: 'microsim', children: [] },
              { name: 'SOP-POS Converter', type: 'microsim', children: [] },
              { name: 'Shannon Expansion Explorer', type: 'microsim', children: [] },
              { name: 'Minterm Expansion Walkthrough', type: 'microsim', children: [] }
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
          { name: 'Narration', type: 'narration', children: [] },
          { name: 'Quiz', type: 'quiz', children: [] },
          { name: 'Problems', type: 'problems', children: [] },
          { name: 'Challenge', type: 'challenge', children: [] },
          { name: 'References', type: 'references', children: [] },
          {
            name: 'MicroSims (6)',
            type: 'microsim',
            expanded: false,
            children: [
              { name: 'K-Map Solver', type: 'microsim', children: [] },
              { name: 'K-Map 3-Variable Simulator', type: 'microsim', children: [] },
              { name: 'Prime Implicant Finder', type: 'microsim', children: [] },
              { name: "K-Map with Don't Cares", type: 'microsim', children: [] },
              { name: 'K-Map Practice Challenge', type: 'microsim', children: [] },
              { name: 'K-Map Simplification Walkthrough', type: 'microsim', children: [] }
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
          { name: 'Narration', type: 'narration', children: [] },
          { name: 'Quiz', type: 'quiz', children: [] },
          { name: 'Problems', type: 'problems', children: [] },
          { name: 'Challenge', type: 'challenge', children: [] },
          { name: 'References', type: 'references', children: [] },
          {
            name: 'MicroSims (6)',
            type: 'microsim',
            expanded: false,
            children: [
              { name: 'QM Grouping Visualization', type: 'microsim', children: [] },
              { name: 'QM Combination Simulator', type: 'microsim', children: [] },
              { name: 'PI Chart Interactive', type: 'microsim', children: [] },
              { name: 'QM Complexity Chart', type: 'microsim', children: [] },
              { name: 'QM Complete Walkthrough', type: 'microsim', children: [] },
              { name: 'QM Method Walkthrough', type: 'microsim', children: [] }
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
          { name: 'Narration', type: 'narration', children: [] },
          { name: 'Quiz', type: 'quiz', children: [] },
          { name: 'Problems', type: 'problems', children: [] },
          { name: 'Challenge', type: 'challenge', children: [] },
          { name: 'References', type: 'references', children: [] },
          {
            name: 'MicroSims (5)',
            type: 'microsim',
            expanded: false,
            children: [
              { name: 'Universal Gate Simulator', type: 'microsim', children: [] },
              { name: 'Bubble Pushing Simulator', type: 'microsim', children: [] },
              { name: 'NAND-NOR Converter', type: 'microsim', children: [] },
              { name: 'Multi-Level Analyzer', type: 'microsim', children: [] },
              { name: 'NAND Conversion Walkthrough', type: 'microsim', children: [] }
            ]
          }
        ]
      },
      {
        name: 'Unit 8: Combinational Logic Modules',
        type: 'unit',
        expanded: false,
        children: [
          { name: 'Content', type: 'content', children: [] },
          { name: 'Narration', type: 'narration', children: [] },
          { name: 'Quiz', type: 'quiz', children: [] },
          { name: 'Problems', type: 'problems', children: [] },
          { name: 'Challenge', type: 'challenge', children: [] },
          { name: 'References', type: 'references', children: [] },
          {
            name: 'MicroSims (6)',
            type: 'microsim',
            expanded: false,
            children: [
              { name: 'MUX Simulator', type: 'microsim', children: [] },
              { name: 'Decoder Simulator', type: 'microsim', children: [] },
              { name: 'Priority Encoder Simulator', type: 'microsim', children: [] },
              { name: 'Binary-Gray Converter', type: 'microsim', children: [] },
              { name: 'Magnitude Comparator', type: 'microsim', children: [] },
              { name: 'MUX Function Walkthrough', type: 'microsim', children: [] }
            ]
          }
        ]
      },
      {
        name: 'Unit 9: Sequential Logic Fundamentals',
        type: 'unit',
        expanded: false,
        children: [
          { name: 'Content', type: 'content', children: [] },
          { name: 'Narration', type: 'narration', children: [] },
          { name: 'Quiz', type: 'quiz', children: [] },
          { name: 'Problems', type: 'problems', children: [] },
          { name: 'Challenge', type: 'challenge', children: [] },
          { name: 'References', type: 'references', children: [] },
          {
            name: 'MicroSims (5)',
            type: 'microsim',
            expanded: false,
            children: [
              { name: 'SR Latch Simulator', type: 'microsim', children: [] },
              { name: 'D Flip-Flop Simulator', type: 'microsim', children: [] },
              { name: 'JK Flip-Flop Simulator', type: 'microsim', children: [] },
              { name: 'Timing Diagram Analyzer', type: 'microsim', children: [] },
              { name: 'Flip-Flop Timing Walkthrough', type: 'microsim', children: [] }
            ]
          }
        ]
      },
      {
        name: 'Unit 10: Sequential Circuit Design',
        type: 'unit',
        expanded: false,
        children: [
          { name: 'Content', type: 'content', children: [] },
          { name: 'Narration', type: 'narration', children: [] },
          { name: 'Quiz', type: 'quiz', children: [] },
          { name: 'Problems', type: 'problems', children: [] },
          { name: 'Challenge', type: 'challenge', children: [] },
          { name: 'References', type: 'references', children: [] },
          {
            name: 'MicroSims (5)',
            type: 'microsim',
            expanded: false,
            children: [
              { name: 'Shift Register Simulator', type: 'microsim', children: [] },
              { name: 'Counter Simulator', type: 'microsim', children: [] },
              { name: 'FSM Designer', type: 'microsim', children: [] },
              { name: 'Sequence Detector Demo', type: 'microsim', children: [] },
              { name: 'Shift Register Walkthrough', type: 'microsim', children: [] }
            ]
          }
        ]
      },
      {
        name: 'Unit 11: Programmable Logic Devices',
        type: 'unit',
        expanded: false,
        children: [
          { name: 'Content', type: 'content', children: [] },
          { name: 'Narration', type: 'narration', children: [] },
          { name: 'Quiz', type: 'quiz', children: [] },
          { name: 'Problems', type: 'problems', children: [] },
          { name: 'Challenge', type: 'challenge', children: [] },
          { name: 'References', type: 'references', children: [] },
          {
            name: 'MicroSims (11)',
            type: 'microsim',
            expanded: false,
            children: [
              { name: 'Programmable Connections', type: 'microsim', children: [] },
              { name: 'ROM Architecture', type: 'microsim', children: [] },
              { name: 'PLA Architecture', type: 'microsim', children: [] },
              { name: 'PLA vs PAL Comparison', type: 'microsim', children: [] },
              { name: 'CPLD Architecture', type: 'microsim', children: [] },
              { name: 'LUT Explorer', type: 'microsim', children: [] },
              { name: 'CLB Architecture', type: 'microsim', children: [] },
              { name: 'FPGA Configuration Flow', type: 'microsim', children: [] },
              { name: 'FPGA Design Flow', type: 'microsim', children: [] },
              { name: 'PLD Selection Tree', type: 'microsim', children: [] },
              { name: 'PLA Programming Walkthrough', type: 'microsim', children: [] }
            ]
          }
        ]
      },
      {
        name: 'Unit 12: Introduction to VHDL',
        type: 'unit',
        expanded: false,
        children: [
          { name: 'Content', type: 'content', children: [] },
          { name: 'Narration', type: 'narration', children: [] },
          { name: 'Quiz', type: 'quiz', children: [] },
          { name: 'Problems', type: 'problems', children: [] },
          { name: 'Challenge', type: 'challenge', children: [] },
          { name: 'References', type: 'references', children: [] },
          {
            name: 'MicroSims (6)',
            type: 'microsim',
            expanded: false,
            children: [
              { name: 'Entity-Architecture Explorer', type: 'microsim', children: [] },
              { name: 'VHDL Modeling Styles', type: 'microsim', children: [] },
              { name: 'VHDL Flip-Flop Patterns', type: 'microsim', children: [] },
              { name: 'VHDL FSM Mapper', type: 'microsim', children: [] },
              { name: 'VHDL Synthesis Inference', type: 'microsim', children: [] },
              { name: 'VHDL FSM Walkthrough', type: 'microsim', children: [] }
            ]
          }
        ]
      },
      {
        name: 'Unit 13: System Integration',
        type: 'unit',
        expanded: false,
        children: [
          { name: 'Content', type: 'content', children: [] },
          { name: 'Narration', type: 'narration', children: [] },
          { name: 'Quiz', type: 'quiz', children: [] },
          { name: 'Problems', type: 'problems', children: [] },
          { name: 'Challenge', type: 'challenge', children: [] },
          { name: 'References', type: 'references', children: [] },
          {
            name: 'MicroSims (10)',
            type: 'microsim',
            expanded: false,
            children: [
              { name: 'Top-Down Design Flow', type: 'microsim', children: [] },
              { name: 'Datapath-Controller Interaction', type: 'microsim', children: [] },
              { name: 'Timing Analysis Visualizer', type: 'microsim', children: [] },
              { name: 'Digital Lock System', type: 'microsim', children: [] },
              { name: 'UART Transmitter', type: 'microsim', children: [] },
              { name: 'UART Transceiver', type: 'microsim', children: [] },
              { name: 'Course Integration Map', type: 'microsim', children: [] },
              { name: 'Datapath-Controller Walkthrough', type: 'microsim', children: [] },
              { name: 'Vending Machine FSM', type: 'microsim', children: [] },
              { name: 'Hierarchical ALU Design', type: 'microsim', children: [] }
            ]
          }
        ]
      },
      {
        name: 'Resources',
        type: 'resource',
        expanded: false,
        children: [
          { name: 'Course Description', type: 'resource', children: [] },
          { name: 'FAQ (76 questions)', type: 'resource', children: [] },
          { name: 'Glossary (398 terms)', type: 'resource', children: [] },
          {
            name: 'Learning Graph',
            type: 'resource',
            expanded: false,
            children: [
              { name: 'Concept List (410 concepts)', type: 'resource', children: [] },
              { name: 'Concept Taxonomy', type: 'resource', children: [] },
              { name: 'Taxonomy Distribution', type: 'resource', children: [] },
              { name: 'Quality Metrics', type: 'resource', children: [] },
              { name: 'Book Metrics', type: 'resource', children: [] },
              { name: 'Chapter Metrics', type: 'resource', children: [] },
              { name: 'Course Description Assessment', type: 'resource', children: [] },
              { name: 'Glossary Quality Report', type: 'resource', children: [] },
              { name: 'Quiz Generation Report', type: 'resource', children: [] },
              { name: 'FAQ Quality Report', type: 'resource', children: [] }
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
  text('13 Units | 105 MicroSims', canvasWidth - 20, drawHeight + 25);
}

function drawNode(node, x, y, depth) {
  let screenY = y - scrollOffset;
  let isVisible = screenY > 40 && screenY < drawHeight - 10;

  if (isVisible) {
    // Check hover (mouseY is in screen coords, so compare with screenY)
    let isHovered = mouseX > x - 5 && mouseX < canvasWidth - 20 &&
                    mouseY > screenY - nodeHeight/2 && mouseY < screenY + nodeHeight/2;
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
      if (isVisible || ((y - scrollOffset) > 40 && (y - scrollOffset) < drawHeight)) {
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
  let legendY = drawHeight - 75;
  let legendX = 15;

  fill(255, 255, 255, 230);
  stroke(colors.line);
  strokeWeight(1);
  rect(10, legendY - 5, canvasWidth - 20, 68, 5);

  textSize(9);
  textAlign(LEFT, CENTER);

  let items = [
    { color: colors.unit, label: 'Unit' },
    { color: colors.content, label: 'Content' },
    { color: colors.narration, label: 'Narration' },
    { color: colors.quiz, label: 'Quiz' },
    { color: colors.problems, label: 'Problems' },
    { color: colors.challenge, label: 'Challenge' },
    { color: colors.references, label: 'References' },
    { color: colors.microsim, label: 'MicroSim' },
    { color: colors.resource, label: 'Resource' }
  ];

  let cols = 3;
  let spacing = (canvasWidth - 40) / cols;
  for (let i = 0; i < items.length; i++) {
    let col = i % cols;
    let row = Math.floor(i / cols);
    let x = legendX + col * spacing;
    let y = legendY + 10 + row * 18;
    fill(items[i].color);
    noStroke();
    ellipse(x + 8, y, 10);
    fill(colors.text);
    text(items[i].label, x + 16, y);
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
