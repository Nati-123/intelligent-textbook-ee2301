// FPGA Design Flow MicroSim
// Complete 10-step FPGA design flow visualization
// Bloom Level: Remember (L1)

let containerWidth;
let canvasWidth = 400;
let drawHeight = 550;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

// Currently selected step (0-9, or -1 for none)
let selectedStep = -1;

// Animation state
let animating = false;
let animDot = 0; // 0.0 to 10.0 representing position along the flow
let animSpeed = 0.015;

// 10 design flow steps
const steps = [
  { label: 'Design\nSpecification', desc: 'Define the design requirements, functionality, I/O ports, timing constraints, and target FPGA device. This is the blueprint for the entire project.' },
  { label: 'HDL Coding\n(VHDL/Verilog)', desc: 'Write the hardware description in VHDL or Verilog. Describe the digital logic behavior using RTL (Register Transfer Level) code.' },
  { label: 'Behavioral\nSimulation', desc: 'Simulate the HDL code to verify functional correctness before synthesis. Uses testbenches to apply stimulus and check outputs.' },
  { label: 'Synthesis', desc: 'Convert HDL code into a gate-level netlist. The synthesis tool maps behavioral descriptions to logic gates and flip-flops.' },
  { label: 'Technology\nMapping', desc: 'Map the generic gate netlist to the specific FPGA architecture (LUTs, CLBs, IOBs). Optimizes for area, speed, or power.' },
  { label: 'Place &\nRoute', desc: 'Place mapped components into specific FPGA locations and route interconnections. This determines the physical layout of the design.' },
  { label: 'Timing\nAnalysis', desc: 'Verify that all signal paths meet timing constraints (setup/hold times, max frequency). Reports critical paths and slack.' },
  { label: 'Post-Route\nSimulation', desc: 'Simulate with actual timing delays from place & route. Verifies functionality with real propagation delays included.' },
  { label: 'Bitstream\nGeneration', desc: 'Generate the binary configuration file (bitstream) that programs the FPGA. Contains all LUT contents, routing, and I/O configurations.' },
  { label: 'Device\nProgramming', desc: 'Download the bitstream to the FPGA via JTAG or other interface. The FPGA is now configured and operational.' }
];

// Feedback loops: [from_step, to_step, label]
const feedbackLoops = [
  { from: 6, to: 1, label: 'Timing Failed' },
  { from: 7, to: 1, label: 'Functional Failed' }
];

const colors = {
  step: '#5C6BC0',
  active: '#FFC107',
  forward: '#4CAF50',
  feedback: '#E91E63',
  bg: '#f5f5f5',
  text: '#212121',
  done: '#C5CAE9',
  pending: '#E8EAF6'
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  describe('10-step FPGA design flow with forward arrows and feedback loops', LABEL);
}

function draw() {
  updateCanvasSize();

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
  textSize(18);
  text('FPGA Design Flow', canvasWidth / 2, 16);
  textStyle(NORMAL);
  // Decorative underline
  stroke(220);
  strokeWeight(1);
  line(canvasWidth / 2 - 72, 28, canvasWidth / 2 + 72, 28);

  // Calculate step positions (zigzag layout: 2 columns)
  let stepPositions = calculateStepPositions();

  // Draw feedback loops (behind everything)
  drawFeedbackLoops(stepPositions);

  // Draw forward arrows
  drawForwardArrows(stepPositions);

  // Draw step boxes
  drawStepBoxes(stepPositions);

  // Draw animation dot
  if (animating) {
    drawAnimationDot(stepPositions);
    animDot += animSpeed;
    if (animDot >= 10.0) {
      animDot = 0;
      animating = false;
    }
  }

  // Draw info panel for selected step
  drawInfoPanel();

  // Draw control buttons
  drawControlButtons();
}

function calculateStepPositions() {
  let positions = [];
  let stepW = Math.min(130, canvasWidth * 0.3);
  let stepH = 40;
  let marginTop = 35;
  let spacingY = 48;
  let colLeft = canvasWidth * 0.25 - stepW / 2;
  let colRight = canvasWidth * 0.70 - stepW / 2;

  for (let i = 0; i < 10; i++) {
    let row = Math.floor(i / 2);
    let isLeft = i % 2 === 0;
    let x = isLeft ? colLeft : colRight;
    let y = marginTop + row * spacingY;
    positions.push({ x: x, y: y, w: stepW, h: stepH, index: i });
  }
  return positions;
}

function drawForwardArrows(positions) {
  stroke(colors.forward);
  strokeWeight(2);

  for (let i = 0; i < positions.length - 1; i++) {
    let curr = positions[i];
    let next = positions[i + 1];
    let fromX, fromY, toX, toY;

    if (i % 2 === 0) {
      // Left to right
      fromX = curr.x + curr.w;
      fromY = curr.y + curr.h / 2;
      toX = next.x;
      toY = next.y + next.h / 2;
    } else {
      // Right to left (go down)
      fromX = curr.x + curr.w / 2;
      fromY = curr.y + curr.h;
      toX = next.x + next.w / 2;
      toY = next.y;

      // Draw as a curved down-and-left path
      noFill();
      let midY = (fromY + toY) / 2;
      beginShape();
      vertex(fromX, fromY);
      vertex(fromX, midY);
      vertex(toX, midY);
      vertex(toX, toY);
      endShape();

      // Arrow head
      fill(colors.forward);
      noStroke();
      triangle(toX - 4, toY - 6, toX + 4, toY - 6, toX, toY);
      stroke(colors.forward);
      strokeWeight(2);
      continue;
    }

    // Straight horizontal arrow
    line(fromX, fromY, toX, toY);
    // Arrow head
    fill(colors.forward);
    noStroke();
    triangle(toX - 6, toY - 4, toX - 6, toY + 4, toX, toY);
    stroke(colors.forward);
    strokeWeight(2);
  }
}

function drawFeedbackLoops(positions) {
  for (let fb of feedbackLoops) {
    let fromPos = positions[fb.from];
    let toPos = positions[fb.to];

    stroke(colors.feedback);
    strokeWeight(2);
    setLineDash([6, 4]);
    noFill();

    // Draw curved feedback path on the right side
    let fbX = canvasWidth - 20;
    let fromY = fromPos.y + fromPos.h / 2;
    let toY = toPos.y + toPos.h / 2;

    beginShape();
    vertex(fromPos.x + fromPos.w, fromY);
    bezierVertex(fbX, fromY, fbX, toY, toPos.x + toPos.w, toY);
    endShape();

    setLineDash([]);

    // Arrow head at destination
    fill(colors.feedback);
    noStroke();
    let ax = toPos.x + toPos.w;
    triangle(ax + 6, toY - 4, ax + 6, toY + 4, ax, toY);

    // Label
    fill(colors.feedback);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(9);
    let labelY = (fromY + toY) / 2;
    push();
    translate(fbX - 8, labelY);
    rotate(-HALF_PI);
    text(fb.label, 0, 0);
    pop();
  }
}

function drawStepBoxes(positions) {
  for (let i = 0; i < positions.length; i++) {
    let pos = positions[i];
    let isSelected = selectedStep === i;
    let isAnimStep = animating && Math.floor(animDot) === i;

    // Box color with glow on selected/animated
    if (isSelected || isAnimStep) {
      noStroke();
      fill(255, 193, 7, 50);
      rect(pos.x - 3, pos.y - 3, pos.w + 6, pos.h + 6, 11);
      fill(colors.active);
      stroke('#F57F17');
      strokeWeight(2.5);
    } else {
      fill(colors.step);
      stroke('#3949AB');
      strokeWeight(1.5);
    }
    rect(pos.x, pos.y, pos.w, pos.h, 8);

    // Step number badge
    let badgeX = pos.x + 14;
    let badgeY = pos.y + pos.h / 2;
    fill(isSelected || isAnimStep ? '#F57F17' : '#3949AB');
    noStroke();
    ellipse(badgeX, badgeY, 20);
    fill('white');
    textAlign(CENTER, CENTER);
    textSize(10);
    text(i + 1, badgeX, badgeY);

    // Step label
    fill('white');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(9);
    text(steps[i].label.replace('\n', ' '), pos.x + 28, pos.y + pos.h / 2);
  }
}

function drawAnimationDot(positions) {
  let stepIndex = Math.floor(animDot);
  let frac = animDot - stepIndex;

  if (stepIndex >= 10) return;

  let curr = positions[stepIndex];
  let dotX, dotY;

  if (stepIndex < 9) {
    let next = positions[stepIndex + 1];
    dotX = lerp(curr.x + curr.w / 2, next.x + next.w / 2, frac);
    dotY = lerp(curr.y + curr.h / 2, next.y + next.h / 2, frac);
  } else {
    dotX = curr.x + curr.w / 2;
    dotY = curr.y + curr.h / 2;
  }

  // Glowing dot
  noStroke();
  fill(255, 193, 7, 100);
  ellipse(dotX, dotY, 20);
  fill(colors.active);
  ellipse(dotX, dotY, 12);
  fill('white');
  ellipse(dotX, dotY, 5);
}

function drawInfoPanel() {
  let panelY = drawHeight - 90;
  let panelH = 80;

  fill(247, 249, 252);
  stroke(210, 215, 225);
  strokeWeight(1);
  rect(15, panelY, canvasWidth - 30, panelH, 8);

  if (selectedStep >= 0) {
    // Accent line
    noStroke();
    fill(92, 107, 192);
    rect(15, panelY + 10, 4, panelH - 20, 2, 0, 0, 2);

    // Step tag
    let tagText = 'Step ' + (selectedStep + 1);
    fill(92, 107, 192);
    noStroke();
    rect(27, panelY + 7, textWidth(tagText) + 16, 16, 4);
    fill(255);
    textAlign(LEFT, CENTER);
    textSize(10);
    textStyle(BOLD);
    text(tagText, 33, panelY + 15);
    textStyle(NORMAL);

    // Step name
    fill(colors.text);
    textSize(11);
    textStyle(BOLD);
    text(steps[selectedStep].label.replace('\n', ' '), 27 + textWidth(tagText) + 22, panelY + 15);
    textStyle(NORMAL);

    // Description
    fill(colors.text);
    textAlign(LEFT, TOP);
    textSize(10);
    text(steps[selectedStep].desc, 27, panelY + 28, canvasWidth - 54, panelH - 36);
  } else {
    fill(180);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    text('Click any step to see its description', canvasWidth / 2, panelY + panelH / 2);
  }
}

function drawControlButtons() {
  // Styled instruction area
  let instrW = canvasWidth - 24;
  fill(235, 237, 242);
  noStroke();
  rect(12, drawHeight + 4, instrW, 16, 8);
  fill(100);
  textAlign(CENTER, CENTER);
  textSize(10);
  text('Click steps to inspect  |  Animate to watch the full flow', canvasWidth / 2, drawHeight + 12);

  let btnY = drawHeight + 26;
  let btnW = 80;
  let btnH = 22;

  // Animate button
  let animX = canvasWidth / 2 - btnW / 2;
  if (!animating) {
    noStroke();
    fill(92, 107, 192, 30);
    rect(animX - 1, btnY - 1, btnW + 2, btnH + 2, 6);
  }
  fill(animating ? colors.active : colors.step);
  stroke(animating ? '#F57F17' : '#3949AB');
  strokeWeight(1);
  rect(animX, btnY, btnW, btnH, 5);
  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  textStyle(BOLD);
  text(animating ? 'Running...' : 'Animate', animX + btnW / 2, btnY + btnH / 2);
  textStyle(NORMAL);

  // Cursor management
  let overInteractive = false;
  // Check step boxes
  let positions = calculateStepPositions();
  for (let pos of positions) {
    if (mouseX >= pos.x && mouseX <= pos.x + pos.w &&
        mouseY >= pos.y && mouseY <= pos.y + pos.h) overInteractive = true;
  }
  // Check animate button
  if (mouseX >= animX && mouseX <= animX + btnW &&
      mouseY >= btnY && mouseY <= btnY + btnH) overInteractive = true;
  cursor(overInteractive ? HAND : ARROW);
}

function setLineDash(list) {
  drawingContext.setLineDash(list);
}

function mousePressed() {
  // Check step box clicks
  let positions = calculateStepPositions();
  for (let pos of positions) {
    if (mouseX >= pos.x && mouseX <= pos.x + pos.w &&
        mouseY >= pos.y && mouseY <= pos.y + pos.h) {
      selectedStep = pos.index;
      return;
    }
  }

  // Check animate button click
  let btnY = drawHeight + 26;
  let btnW = 80;
  let btnH = 22;
  let animX = canvasWidth / 2 - btnW / 2;
  if (mouseX >= animX && mouseX <= animX + btnW && mouseY >= btnY && mouseY <= btnY + btnH) {
    if (!animating) {
      animating = true;
      animDot = 0;
    }
    return;
  }

  // Click elsewhere deselects
  if (mouseY < drawHeight - 90) {
    selectedStep = -1;
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
