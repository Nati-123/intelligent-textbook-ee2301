// Course Integration Map MicroSim
// Force-directed graph showing connections between all 13 course units

let containerWidth;
let canvasWidth = 400;
let drawHeight = 500;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

// Unit definitions
let units = [
  { id: 1,  name: "Number Systems",         category: "fundamentals" },
  { id: 2,  name: "Boolean Algebra",         category: "fundamentals" },
  { id: 3,  name: "Applications",            category: "design" },
  { id: 4,  name: "Minterms & Maxterms",     category: "design" },
  { id: 5,  name: "Karnaugh Maps",           category: "design" },
  { id: 6,  name: "Quine-McCluskey",         category: "design" },
  { id: 7,  name: "Multi-Level Gates",       category: "implementation" },
  { id: 8,  name: "Combinational Modules",   category: "implementation" },
  { id: 9,  name: "Sequential Fundamentals", category: "sequential" },
  { id: 10, name: "Sequential Design",       category: "sequential" },
  { id: 11, name: "Programmable Logic",       category: "advanced" },
  { id: 12, name: "VHDL",                     category: "advanced" },
  { id: 13, name: "System Integration",       category: "advanced" }
];

// Edges (directed: from prerequisite to dependent)
let edges = [
  { from: 1, to: 2 },
  { from: 1, to: 3 },
  { from: 1, to: 4 },
  { from: 2, to: 3 },
  { from: 2, to: 4 },
  { from: 2, to: 5 },
  { from: 2, to: 7 },
  { from: 3, to: 8 },
  { from: 4, to: 5 },
  { from: 4, to: 6 },
  { from: 5, to: 6 },
  { from: 7, to: 8 },
  { from: 8, to: 10 },
  { from: 9, to: 10 },
  { from: 10, to: 11 },
  { from: 10, to: 13 },
  { from: 11, to: 12 },
  { from: 12, to: 13 }
];

// Category colors
let categoryColors = {
  fundamentals:   '#2196F3',  // blue
  design:         '#4CAF50',  // green
  implementation: '#FF9800',  // orange
  sequential:     '#9C27B0',  // purple
  advanced:       '#F44336'   // red
};

let categoryLabels = {
  fundamentals:   'Fundamentals (U1-U2)',
  design:         'Design Methods (U3-U6)',
  implementation: 'Implementation (U7-U8)',
  sequential:     'Sequential (U9-U10)',
  advanced:       'Advanced (U11-U13)'
};

// Physics simulation
let nodes = [];      // Node objects with position, velocity
let nodeRadius = 22;

// Interaction state
let selectedNode = -1;   // Selected node index (-1 = none)
let draggedNode = -1;    // Currently dragged node index
let hoveredNode = -1;    // Hovered node index
let hoveredEdge = -1;    // Hovered edge index
let dragOffsetX = 0;
let dragOffsetY = 0;

// Force parameters
let repulsionStrength = 3000;
let attractionStrength = 0.005;
let centerStrength = 0.01;
let damping = 0.85;
let initialized = false;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  describe('Force-directed graph showing prerequisite relationships between all 13 EE2301 course units', LABEL);
  initializeNodes();
}

function initializeNodes() {
  // Place nodes in a roughly circular layout initially
  let cx = canvasWidth / 2;
  let cy = drawHeight / 2;
  let initRadius = min(canvasWidth, drawHeight) * 0.3;

  nodes = [];
  for (let i = 0; i < units.length; i++) {
    let angle = (i / units.length) * TWO_PI - HALF_PI;
    nodes.push({
      x: cx + cos(angle) * initRadius + random(-20, 20),
      y: cy + sin(angle) * initRadius + random(-20, 20),
      vx: 0,
      vy: 0
    });
  }
  initialized = true;
}

function draw() {
  updateCanvasSize();
  background(245);

  // Reinitialize if canvas size changed significantly
  if (!initialized) {
    initializeNodes();
  }

  // Run force simulation
  applyForces();
  updatePositions();

  // Draw edges first (behind nodes)
  drawEdges();

  // Draw nodes
  drawNodes();

  // Draw legend
  drawLegend();

  // Draw info panel for selected/hovered node
  drawInfoPanel();

  // Draw controls
  drawControlBar();
}

function applyForces() {
  let cx = canvasWidth / 2;
  let cy = drawHeight / 2 - 10;

  // Reset forces
  for (let n of nodes) {
    n.fx = 0;
    n.fy = 0;
  }

  // Repulsion between all pairs (Coulomb-like)
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      let dx = nodes[j].x - nodes[i].x;
      let dy = nodes[j].y - nodes[i].y;
      let dist2 = dx * dx + dy * dy;
      let minDist = 40;
      if (dist2 < minDist * minDist) dist2 = minDist * minDist;
      let force = repulsionStrength / dist2;
      let d = sqrt(dist2);
      let fx = (dx / d) * force;
      let fy = (dy / d) * force;

      nodes[i].fx -= fx;
      nodes[i].fy -= fy;
      nodes[j].fx += fx;
      nodes[j].fy += fy;
    }
  }

  // Attraction along edges (spring-like)
  for (let edge of edges) {
    let ni = nodes[edge.from - 1];
    let nj = nodes[edge.to - 1];
    let dx = nj.x - ni.x;
    let dy = nj.y - ni.y;
    let d = sqrt(dx * dx + dy * dy);
    let targetDist = 100;
    let force = (d - targetDist) * attractionStrength;
    let fx = (dx / max(d, 1)) * force;
    let fy = (dy / max(d, 1)) * force;

    ni.fx += fx;
    ni.fy += fy;
    nj.fx -= fx;
    nj.fy -= fy;
  }

  // Centering force
  for (let n of nodes) {
    n.fx += (cx - n.x) * centerStrength;
    n.fy += (cy - n.y) * centerStrength;
  }

  // Gravity: gently push nodes with higher IDs downward for hierarchy
  for (let i = 0; i < nodes.length; i++) {
    let tier = getTier(i + 1);
    let targetY = cy - 150 + tier * 80;
    nodes[i].fy += (targetY - nodes[i].y) * 0.002;
  }
}

function getTier(unitId) {
  if (unitId <= 2) return 0;       // Fundamentals
  if (unitId <= 6) return 1;       // Design
  if (unitId <= 8) return 2;       // Implementation
  if (unitId <= 10) return 2.5;    // Sequential
  return 3.5;                       // Advanced
}

function updatePositions() {
  for (let i = 0; i < nodes.length; i++) {
    // Skip dragged node
    if (i === draggedNode) continue;

    let n = nodes[i];
    n.vx = (n.vx + n.fx) * damping;
    n.vy = (n.vy + n.fy) * damping;

    n.x += n.vx;
    n.y += n.vy;

    // Constrain to canvas bounds
    let margin = nodeRadius + 5;
    n.x = constrain(n.x, margin, canvasWidth - margin);
    n.y = constrain(n.y, margin, drawHeight - margin - 40);
  }
}

function drawEdges() {
  hoveredEdge = -1;

  for (let ei = 0; ei < edges.length; ei++) {
    let edge = edges[ei];
    let ni = nodes[edge.from - 1];
    let nj = nodes[edge.to - 1];

    let dx = nj.x - ni.x;
    let dy = nj.y - ni.y;
    let d = sqrt(dx * dx + dy * dy);
    let nx = dx / max(d, 1);
    let ny = dy / max(d, 1);

    let x1 = ni.x + nx * nodeRadius;
    let y1 = ni.y + ny * nodeRadius;
    let x2 = nj.x - nx * nodeRadius;
    let y2 = nj.y - ny * nodeRadius;

    // Check if edge is connected to selected node
    let isHighlighted = (selectedNode >= 0 &&
      (edge.from === selectedNode + 1 || edge.to === selectedNode + 1));

    // Check if edge is dimmed (node selected but edge not connected)
    let isDimmed = (selectedNode >= 0 && !isHighlighted);

    // Check hover on edge (approximate: distance from mouse to line segment)
    let edgeDist = distToSegment(mouseX, mouseY, x1, y1, x2, y2);
    if (edgeDist < 8) {
      hoveredEdge = ei;
    }

    let isHovered = (hoveredEdge === ei);

    // Edge color
    let alpha = isDimmed ? 40 : (isHighlighted || isHovered ? 255 : 120);
    let edgeColor;
    if (isHighlighted) {
      edgeColor = color(edge.from === selectedNode + 1 ? '#FF5722' : '#2196F3');
    } else if (isHovered) {
      edgeColor = color('#FF9800');
    } else {
      edgeColor = color(150, 150, 150, alpha);
    }

    stroke(edgeColor);
    strokeWeight(isHighlighted || isHovered ? 2.5 : 1.5);
    line(x1, y1, x2, y2);

    // Arrowhead
    let arrowSize = isHighlighted || isHovered ? 10 : 7;
    let angle = atan2(y2 - y1, x2 - x1);
    fill(edgeColor);
    noStroke();
    push();
    translate(x2, y2);
    rotate(angle);
    triangle(0, 0, -arrowSize, -arrowSize / 2, -arrowSize, arrowSize / 2);
    pop();

    // Hover tooltip for edge
    if (isHovered) {
      let midX = (x1 + x2) / 2;
      let midY = (y1 + y2) / 2;
      let fromName = units[edge.from - 1].name;
      let toName = units[edge.to - 1].name;
      let tooltipText = "U" + edge.from + " -> U" + edge.to;

      fill(0, 0, 0, 200);
      noStroke();
      let tw = textWidth(tooltipText) + 16;
      rect(midX - tw / 2, midY - 22, tw, 20, 4);

      fill(255);
      textSize(10);
      textAlign(CENTER, CENTER);
      text(tooltipText, midX, midY - 12);
    }
  }
}

function drawNodes() {
  hoveredNode = -1;

  for (let i = 0; i < nodes.length; i++) {
    let n = nodes[i];
    let unit = units[i];

    // Check hover
    let isHover = dist(mouseX, mouseY, n.x, n.y) < nodeRadius;
    if (isHover) hoveredNode = i;

    let isSelected = (selectedNode === i);
    let isConnected = false;

    // Check if connected to selected node
    if (selectedNode >= 0 && selectedNode !== i) {
      for (let edge of edges) {
        if ((edge.from === selectedNode + 1 && edge.to === i + 1) ||
            (edge.to === selectedNode + 1 && edge.from === i + 1)) {
          isConnected = true;
          break;
        }
      }
    }

    let isDimmed = (selectedNode >= 0 && !isSelected && !isConnected);

    // Node color
    let baseColor = color(categoryColors[unit.category]);
    let alpha = isDimmed ? 60 : 255;

    // Draw node circle
    fill(red(baseColor), green(baseColor), blue(baseColor), alpha);
    stroke(isSelected ? '#333' : (isHover ? '#666' : 255));
    strokeWeight(isSelected ? 3 : (isHover ? 2.5 : 1.5));
    ellipse(n.x, n.y, nodeRadius * 2, nodeRadius * 2);

    // Node label
    fill(255, 255, 255, alpha);
    noStroke();
    textSize(13);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text("U" + unit.id, n.x, n.y);
    textStyle(NORMAL);

    // Show full name on hover or selection
    if ((isHover || isSelected) && !isDimmed) {
      // Name label below node
      fill(0, 0, 0, 180);
      noStroke();
      textSize(10);
      let nameW = textWidth(unit.name) + 12;
      rect(n.x - nameW / 2, n.y + nodeRadius + 4, nameW, 18, 4);

      fill(255);
      textSize(10);
      textAlign(CENTER, CENTER);
      text(unit.name, n.x, n.y + nodeRadius + 13);
    }
  }
}

function drawLegend() {
  let legendX = 10;
  let legendY = drawHeight - 35;
  let dotSize = 10;
  let gap = 5;

  textSize(9);
  textAlign(LEFT, CENTER);

  let categories = Object.keys(categoryColors);
  let totalWidth = 0;
  for (let cat of categories) {
    totalWidth += dotSize + gap + textWidth(categoryLabels[cat]) + 15;
  }

  // Draw on one line if space allows, else stack
  let x = legendX;
  for (let cat of categories) {
    let col = color(categoryColors[cat]);
    fill(col);
    noStroke();
    ellipse(x + dotSize / 2, legendY + dotSize / 2, dotSize, dotSize);

    fill(80);
    text(categoryLabels[cat], x + dotSize + gap, legendY + dotSize / 2);

    x += dotSize + gap + textWidth(categoryLabels[cat]) + 15;
  }
}

function drawInfoPanel() {
  if (selectedNode < 0) return;

  let unit = units[selectedNode];
  let panelW = 180;
  let panelH = 80;
  let panelX = canvasWidth - panelW - 10;
  let panelY = 10;

  // Background
  fill(255, 255, 255, 240);
  stroke(categoryColors[unit.category]);
  strokeWeight(2);
  rect(panelX, panelY, panelW, panelH, 5);

  // Unit info
  fill(categoryColors[unit.category]);
  noStroke();
  textSize(13);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text("Unit " + unit.id + ": " + unit.name, panelX + 8, panelY + 8);
  textStyle(NORMAL);

  // Count prerequisites and dependents
  let prereqs = [];
  let dependents = [];
  for (let edge of edges) {
    if (edge.to === unit.id) prereqs.push("U" + edge.from);
    if (edge.from === unit.id) dependents.push("U" + edge.to);
  }

  fill(80);
  textSize(10);
  text("Prereqs: " + (prereqs.length > 0 ? prereqs.join(", ") : "None"), panelX + 8, panelY + 30);
  text("Leads to: " + (dependents.length > 0 ? dependents.join(", ") : "None"), panelX + 8, panelY + 48);

  fill(120);
  textSize(9);
  textStyle(ITALIC);
  text("Click elsewhere to deselect", panelX + 8, panelY + 65);
  textStyle(NORMAL);
}

function drawControlBar() {
  // Control area background
  fill(230);
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Reset Layout button
  let btnW = 110;
  let btnH = 30;
  let btnX = canvasWidth / 2 - btnW / 2;
  let btnY = drawHeight + 10;

  let isHover = mouseX > btnX && mouseX < btnX + btnW &&
                mouseY > btnY && mouseY < btnY + btnH;

  fill(isHover ? '#1565C0' : '#2196F3');
  stroke('#0D47A1');
  strokeWeight(1);
  rect(btnX, btnY, btnW, btnH, 5);

  fill(255);
  noStroke();
  textSize(12);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text("Reset Layout", btnX + btnW / 2, btnY + btnH / 2);
  textStyle(NORMAL);
}

function mousePressed() {
  // Check Reset Layout button
  let btnW = 110;
  let btnH = 30;
  let btnX = canvasWidth / 2 - btnW / 2;
  let btnY = drawHeight + 10;

  if (mouseX > btnX && mouseX < btnX + btnW &&
      mouseY > btnY && mouseY < btnY + btnH) {
    initializeNodes();
    selectedNode = -1;
    return;
  }

  // Check node clicks
  for (let i = 0; i < nodes.length; i++) {
    if (dist(mouseX, mouseY, nodes[i].x, nodes[i].y) < nodeRadius) {
      draggedNode = i;
      dragOffsetX = nodes[i].x - mouseX;
      dragOffsetY = nodes[i].y - mouseY;

      // Toggle selection
      if (selectedNode === i) {
        selectedNode = -1;
      } else {
        selectedNode = i;
      }
      return;
    }
  }

  // Click on empty space deselects
  if (mouseY < drawHeight) {
    selectedNode = -1;
  }
}

function mouseDragged() {
  if (draggedNode >= 0) {
    nodes[draggedNode].x = mouseX + dragOffsetX;
    nodes[draggedNode].y = mouseY + dragOffsetY;
    nodes[draggedNode].vx = 0;
    nodes[draggedNode].vy = 0;

    // Constrain to canvas
    let margin = nodeRadius + 5;
    nodes[draggedNode].x = constrain(nodes[draggedNode].x, margin, canvasWidth - margin);
    nodes[draggedNode].y = constrain(nodes[draggedNode].y, margin, drawHeight - margin - 40);
  }
}

function mouseReleased() {
  draggedNode = -1;
}

// Utility: distance from point to line segment
function distToSegment(px, py, x1, y1, x2, y2) {
  let dx = x2 - x1;
  let dy = y2 - y1;
  let lenSq = dx * dx + dy * dy;
  if (lenSq === 0) return dist(px, py, x1, y1);

  let t = ((px - x1) * dx + (py - y1) * dy) / lenSq;
  t = constrain(t, 0, 1);

  let projX = x1 + t * dx;
  let projY = y1 + t * dy;
  return dist(px, py, projX, projY);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, canvasHeight);
  // Reinitialize nodes to fit new canvas size
  initializeNodes();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
