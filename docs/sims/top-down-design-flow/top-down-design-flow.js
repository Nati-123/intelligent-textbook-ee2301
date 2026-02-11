// Top-Down Design Flow MicroSim
// Interactive 6-step top-down digital system design methodology

let containerWidth;
let canvasWidth = 400;
let drawHeight = 500;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

// Design step definitions
let steps = [
  {
    name: "System Specification",
    details: "Define requirements, constraints, interfaces, and performance targets. Create a detailed specification document.",
    activities: ["Requirements analysis", "Constraint definition", "Interface specification", "Performance targets"]
  },
  {
    name: "Architectural Design",
    details: "Create the high-level block diagram. Partition the system into major functional blocks and define data flow.",
    activities: ["Block diagram", "System partitioning", "Data flow definition", "Bus architecture"]
  },
  {
    name: "Module Design",
    details: "Specify individual modules with inputs, outputs, and behavior. Define module interfaces and timing.",
    activities: ["Module I/O specs", "Behavioral description", "Interface protocols", "Timing budgets"]
  },
  {
    name: "HDL Implementation",
    details: "Write VHDL or Verilog code for each module. Follow coding guidelines for synthesis compatibility.",
    activities: ["RTL coding", "Code review", "Lint checks", "Coding standards"]
  },
  {
    name: "Simulation & Verification",
    details: "Create testbenches and verify functionality. Run functional simulation, check corner cases and coverage.",
    activities: ["Testbench creation", "Functional simulation", "Coverage analysis", "Bug tracking"]
  },
  {
    name: "Physical Implementation",
    details: "Synthesize to gates, place and route, generate bitstream or layout. Verify timing closure.",
    activities: ["Logic synthesis", "Place & route", "Timing closure", "Bitstream generation"]
  }
];

let selectedStep = -1;       // Currently selected step index (-1 = none)
let animating = false;       // Whether animation is running
let animStep = 0;            // Current animation step
let animProgress = 0;        // Animation progress within a step (0-1)
let animDotY = 0;            // Y position of animated dot

// Colors
const COLOR_STEP = '#5C6BC0';
const COLOR_SELECTED = '#FFC107';
const COLOR_FORWARD = '#2196F3';
const COLOR_FEEDBACK = '#E91E63';
const COLOR_ANIMATE_DOT = '#4CAF50';

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  describe('Interactive top-down design flow with 6 hierarchical steps and verification feedback loops', LABEL);
  textAlign(CENTER, CENTER);
}

function draw() {
  updateCanvasSize();
  background(245);

  // Layout calculations
  let flowX = canvasWidth * 0.35;      // Center of flowchart column
  let boxW = canvasWidth * 0.35;       // Width of step boxes
  let boxH = 52;                        // Height of step boxes
  let startY = 30;                      // Top margin
  let gapY = (drawHeight - startY - 40 - steps.length * boxH) / (steps.length - 1);
  if (gapY < 15) gapY = 15;
  let infoX = canvasWidth * 0.72;      // Center of info panel
  let infoW = canvasWidth * 0.42;      // Width of info panel

  // Draw title
  fill(50);
  noStroke();
  textSize(15);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text("Top-Down Design Flow", flowX, 5);
  textStyle(NORMAL);

  // Store step positions for click detection
  let stepPositions = [];

  // Draw feedback arrows (red dashed) - draw first so they appear behind boxes
  for (let i = 1; i < steps.length; i++) {
    let y1 = startY + i * (boxH + gapY) + boxH / 2;
    let y0 = startY + (i - 1) * (boxH + gapY) + boxH / 2;
    let feedbackX = flowX - boxW / 2 - 25;

    stroke(COLOR_FEEDBACK);
    strokeWeight(1.5);
    drawingContext.setLineDash([5, 5]);

    // Vertical line on the left side
    line(feedbackX, y1, feedbackX, y0);

    // Arrow from step i to left
    line(flowX - boxW / 2, y1, feedbackX, y1);

    // Arrow from left to step i-1
    line(feedbackX, y0, flowX - boxW / 2, y0);

    // Arrowhead pointing right at step i-1
    let arrowSize = 6;
    let ax = flowX - boxW / 2;
    fill(COLOR_FEEDBACK);
    noStroke();
    triangle(ax, y0, ax - arrowSize, y0 - arrowSize / 2, ax - arrowSize, y0 + arrowSize / 2);
    stroke(COLOR_FEEDBACK);

    drawingContext.setLineDash([]);
  }

  // Draw steps and forward arrows
  for (let i = 0; i < steps.length; i++) {
    let y = startY + i * (boxH + gapY);
    stepPositions.push({ x: flowX - boxW / 2, y: y, w: boxW, h: boxH, index: i });

    // Forward arrow from previous step
    if (i > 0) {
      let prevY = startY + (i - 1) * (boxH + gapY) + boxH;
      stroke(COLOR_FORWARD);
      strokeWeight(2);
      drawingContext.setLineDash([]);
      line(flowX, prevY, flowX, y);

      // Arrowhead
      fill(COLOR_FORWARD);
      noStroke();
      let arrowSize = 8;
      triangle(flowX, y, flowX - arrowSize / 2, y - arrowSize, flowX + arrowSize / 2, y - arrowSize);
    }

    // Step box (rounded rectangle)
    let isSelected = (selectedStep === i);
    let isAnimActive = animating && (animStep === i);
    let boxColor = isSelected ? COLOR_SELECTED : (isAnimActive ? COLOR_ANIMATE_DOT : COLOR_STEP);

    fill(boxColor);
    stroke(isSelected ? '#E6A800' : '#3F51B5');
    strokeWeight(isSelected ? 3 : 1.5);
    rect(flowX - boxW / 2, y, boxW, boxH, 10);

    // Step number and name
    fill(isSelected ? '#333' : 255);
    noStroke();
    textSize(12);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text((i + 1) + ". " + steps[i].name, flowX, y + boxH / 2);
    textStyle(NORMAL);
  }

  // Store positions for mousePressed
  this._stepPositions = stepPositions;

  // Draw info panel on the right
  if (selectedStep >= 0) {
    let step = steps[selectedStep];
    let panelX = infoX - infoW / 2;
    let panelY = startY;
    let panelH = drawHeight - startY - 20;

    // Panel background
    fill(255);
    stroke(COLOR_SELECTED);
    strokeWeight(2);
    rect(panelX, panelY, infoW, panelH, 8);

    // Panel title
    fill(COLOR_STEP);
    noStroke();
    textSize(14);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    text("Step " + (selectedStep + 1), infoX, panelY + 10);
    text(step.name, infoX, panelY + 28);
    textStyle(NORMAL);

    // Divider line
    stroke(200);
    strokeWeight(1);
    line(panelX + 10, panelY + 52, panelX + infoW - 10, panelY + 52);

    // Description
    fill(60);
    noStroke();
    textSize(11);
    textAlign(LEFT, TOP);
    textWrap(WORD);
    text(step.details, panelX + 12, panelY + 60, infoW - 24);

    // Key activities
    fill(COLOR_STEP);
    textSize(12);
    textStyle(BOLD);
    text("Key Activities:", panelX + 12, panelY + 130);
    textStyle(NORMAL);

    fill(80);
    textSize(11);
    for (let j = 0; j < step.activities.length; j++) {
      text("  " + step.activities[j], panelX + 16, panelY + 152 + j * 20);
    }

    // Feedback note
    fill(COLOR_FEEDBACK);
    textSize(11);
    textStyle(ITALIC);
    if (selectedStep > 0) {
      text("Verification feeds back to Step " + selectedStep, panelX + 12, panelY + 250);
    }
    textStyle(NORMAL);
  } else {
    // No step selected - show instruction
    fill(150);
    noStroke();
    textSize(13);
    textAlign(CENTER, CENTER);
    text("Click a step to\nsee its details", infoX, drawHeight / 2);
  }

  // Draw legend
  let legendY = drawHeight - 30;
  textSize(10);
  textAlign(LEFT, CENTER);

  // Forward arrow legend
  stroke(COLOR_FORWARD);
  strokeWeight(2);
  line(10, legendY, 35, legendY);
  fill(COLOR_FORWARD);
  noStroke();
  triangle(35, legendY, 30, legendY - 3, 30, legendY + 3);
  text("Forward Flow", 40, legendY);

  // Feedback arrow legend
  stroke(COLOR_FEEDBACK);
  strokeWeight(1.5);
  drawingContext.setLineDash([5, 5]);
  line(canvasWidth * 0.22, legendY, canvasWidth * 0.22 + 25, legendY);
  drawingContext.setLineDash([]);
  fill(COLOR_FEEDBACK);
  noStroke();
  text("Verification Feedback", canvasWidth * 0.22 + 30, legendY);

  // Animation logic
  if (animating) {
    animProgress += 0.02;
    if (animProgress >= 1) {
      animProgress = 0;
      animStep++;
      if (animStep >= steps.length) {
        animating = false;
        animStep = 0;
        animProgress = 0;
      }
    }

    if (animating) {
      // Draw animated green dot
      let currentY = startY + animStep * (boxH + gapY) + boxH / 2;
      let nextY = (animStep < steps.length - 1)
        ? startY + (animStep + 1) * (boxH + gapY) + boxH / 2
        : currentY;
      let dotY = lerp(currentY, nextY, animProgress);

      fill(COLOR_ANIMATE_DOT);
      noStroke();
      ellipse(flowX + boxW / 2 + 15, dotY, 14, 14);

      // Highlight current step during animation
      selectedStep = animStep;
    }
  }

  // Draw control bar
  drawControls();
}

function drawControls() {
  // Control area background
  fill(230);
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Animate button
  let btnX = canvasWidth / 2 - 50;
  let btnY = drawHeight + 10;
  let btnW = 100;
  let btnH = 30;

  let isHover = mouseX > btnX && mouseX < btnX + btnW &&
                mouseY > btnY && mouseY < btnY + btnH;

  fill(animating ? '#F44336' : (isHover ? '#45a049' : COLOR_ANIMATE_DOT));
  stroke(animating ? '#C62828' : '#388E3C');
  strokeWeight(1);
  rect(btnX, btnY, btnW, btnH, 5);

  fill(255);
  noStroke();
  textSize(13);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  text(animating ? "Stop" : "Animate", btnX + btnW / 2, btnY + btnH / 2);
  textStyle(NORMAL);
}

function mousePressed() {
  // Check Animate/Stop button
  let btnX = canvasWidth / 2 - 50;
  let btnY = drawHeight + 10;
  let btnW = 100;
  let btnH = 30;

  if (mouseX > btnX && mouseX < btnX + btnW &&
      mouseY > btnY && mouseY < btnY + btnH) {
    if (animating) {
      animating = false;
    } else {
      animating = true;
      animStep = 0;
      animProgress = 0;
      selectedStep = 0;
    }
    return;
  }

  // Check step clicks
  if (this._stepPositions) {
    for (let sp of this._stepPositions) {
      if (mouseX > sp.x && mouseX < sp.x + sp.w &&
          mouseY > sp.y && mouseY < sp.y + sp.h) {
        selectedStep = (selectedStep === sp.index) ? -1 : sp.index;
        animating = false;
        return;
      }
    }
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
