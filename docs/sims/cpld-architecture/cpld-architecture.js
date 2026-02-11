// CPLD Architecture MicroSim
// CPLD block diagram with function blocks and interconnect matrix

let containerWidth;
let canvasWidth = 400;
let drawHeight = 500;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

// Component types
const COMP_NONE = 0;
const COMP_FB = 1;
const COMP_MATRIX = 2;
const COMP_IO = 3;

// Selected component
let selectedType = COMP_NONE;
let selectedIndex = -1;

// Function block positions (computed in draw)
let fbPositions = [];
let matrixRect = {};
let ioBlocks = [];

// Function block names and details
let fbNames = ['FB1', 'FB2', 'FB3', 'FB4'];
let fbDetails = [
  {
    title: 'Function Block 1 (FB1)',
    desc: 'Contains PAL-like AND array with 16 product terms, 8 macrocells with programmable flip-flops, and output enable control.',
    features: ['16 Product Terms', '8 Macrocells', 'D/T Flip-Flops', 'Feedback paths']
  },
  {
    title: 'Function Block 2 (FB2)',
    desc: 'Identical structure to FB1. Each macrocell can be configured as combinational or registered output.',
    features: ['16 Product Terms', '8 Macrocells', 'Combinational/Registered', 'Clock selection']
  },
  {
    title: 'Function Block 3 (FB3)',
    desc: 'Contains dedicated product term allocator that can share unused terms with neighboring macrocells.',
    features: ['16 Product Terms', '8 Macrocells', 'PT Sharing', 'XOR gate option']
  },
  {
    title: 'Function Block 4 (FB4)',
    desc: 'Same architecture as other FBs. All FBs connect to the global interconnect for signal routing.',
    features: ['16 Product Terms', '8 Macrocells', 'Global routing', 'Direct feedback']
  }
];

let matrixDetail = {
  title: 'Global Interconnect Matrix',
  desc: 'Programmable switch matrix that routes any signal from any function block to any other function block. Uses multiplexer-based routing for deterministic timing.',
  features: ['Full crossbar connectivity', 'Deterministic delays', 'MUX-based routing', 'Feedback support']
};

let ioDetail = {
  title: 'I/O Block',
  desc: 'Provides interface between internal logic and external pins. Includes programmable output drivers, slew rate control, and input buffers.',
  features: ['Tri-state output', 'Slew rate control', 'Input register option', 'Pull-up/pull-down']
};

// Colors
let fbColor, matrixColor, ioColor;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  describe('CPLD architecture showing function blocks, global interconnect matrix, and I/O blocks.', LABEL);

  fbColor = color('#5C6BC0');
  matrixColor = color('#FF7043');
  ioColor = color('#66BB6A');
}

function draw() {
  updateCanvasSize();
  background(245);

  // Title
  fill(50);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(18);
  text('CPLD Architecture', canvasWidth / 2, 18);

  // Compute positions based on canvas size
  computePositions();

  // Draw I/O blocks first (behind everything)
  drawIOBlocks();

  // Draw connection lines from FBs to matrix
  drawConnections();

  // Draw interconnect matrix
  drawMatrix();

  // Draw function blocks
  drawFunctionBlocks();

  // Draw info panel at bottom
  drawInfoPanel();

  // Control area
  fill(100);
  noStroke();
  textSize(11);
  textAlign(CENTER, CENTER);
  text('Click on Function Blocks, Interconnect Matrix, or I/O Blocks for details',
       canvasWidth / 2, drawHeight + 25);
}

function computePositions() {
  let cx = canvasWidth / 2;
  let cy = 210;
  let matW = Math.min(160, canvasWidth * 0.3);
  let matH = Math.min(120, 120);

  matrixRect = {
    x: cx - matW / 2,
    y: cy - matH / 2,
    w: matW,
    h: matH
  };

  let fbW = Math.min(110, canvasWidth * 0.2);
  let fbH = 50;
  let gap = 30;

  // FB1: top
  fbPositions[0] = {
    x: cx - fbW / 2,
    y: matrixRect.y - fbH - gap,
    w: fbW, h: fbH
  };
  // FB2: right
  fbPositions[1] = {
    x: matrixRect.x + matrixRect.w + gap,
    y: cy - fbH / 2,
    w: fbW, h: fbH
  };
  // FB3: bottom
  fbPositions[2] = {
    x: cx - fbW / 2,
    y: matrixRect.y + matrixRect.h + gap,
    w: fbW, h: fbH
  };
  // FB4: left
  fbPositions[3] = {
    x: matrixRect.x - fbW - gap,
    y: cy - fbH / 2,
    w: fbW, h: fbH
  };

  // I/O blocks: small rectangles on the outer edges
  ioBlocks = [];
  let ioW = 20;
  let ioH = 16;

  // Top I/O blocks (above FB1)
  for (let i = 0; i < 4; i++) {
    let ioX = fbPositions[0].x - 10 + i * (fbW + 20) / 4;
    ioBlocks.push({
      x: ioX, y: fbPositions[0].y - ioH - 10,
      w: ioW, h: ioH, side: 'top'
    });
  }
  // Right I/O blocks
  for (let i = 0; i < 3; i++) {
    let ioY = fbPositions[1].y - 10 + i * (fbH + 20) / 3;
    ioBlocks.push({
      x: fbPositions[1].x + fbW + 10, y: ioY,
      w: ioW, h: ioH, side: 'right'
    });
  }
  // Bottom I/O blocks
  for (let i = 0; i < 4; i++) {
    let ioX = fbPositions[2].x - 10 + i * (fbW + 20) / 4;
    ioBlocks.push({
      x: ioX, y: fbPositions[2].y + fbH + 10,
      w: ioW, h: ioH, side: 'bottom'
    });
  }
  // Left I/O blocks
  for (let i = 0; i < 3; i++) {
    let ioY = fbPositions[3].y - 10 + i * (fbH + 20) / 3;
    ioBlocks.push({
      x: fbPositions[3].x - ioW - 10, y: ioY,
      w: ioW, h: ioH, side: 'left'
    });
  }
}

function drawMatrix() {
  let m = matrixRect;
  let isSelected = (selectedType === COMP_MATRIX);

  // Matrix background with crosshatch pattern
  fill(255, 240, 235);
  if (isSelected) {
    stroke(matrixColor);
    strokeWeight(3);
  } else {
    stroke(matrixColor);
    strokeWeight(1.5);
  }
  rect(m.x, m.y, m.w, m.h, 8);

  // Crosshatch pattern inside
  stroke(255, 200, 180);
  strokeWeight(0.5);
  let step = 10;
  for (let i = step; i < m.w + m.h; i += step) {
    let x1 = m.x + min(i, m.w);
    let y1 = m.y + max(0, i - m.w);
    let x2 = m.x + max(0, i - m.h);
    let y2 = m.y + min(i, m.h);
    line(x1, y1, x2, y2);
  }

  // Label
  fill(matrixColor);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  textStyle(BOLD);
  text('Global', m.x + m.w / 2, m.y + m.h / 2 - 12);
  text('Interconnect', m.x + m.w / 2, m.y + m.h / 2 + 2);
  text('Matrix', m.x + m.w / 2, m.y + m.h / 2 + 16);
  textStyle(NORMAL);
}

function drawFunctionBlocks() {
  for (let i = 0; i < 4; i++) {
    let fb = fbPositions[i];
    let isSelected = (selectedType === COMP_FB && selectedIndex === i);

    // Shadow
    noStroke();
    fill(200, 200, 220, 80);
    rect(fb.x + 3, fb.y + 3, fb.w, fb.h, 8);

    // Block
    fill(235, 237, 255);
    if (isSelected) {
      stroke(fbColor);
      strokeWeight(3);
    } else {
      stroke(fbColor);
      strokeWeight(1.5);
    }
    rect(fb.x, fb.y, fb.w, fb.h, 8);

    // Label
    fill(fbColor);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(13);
    textStyle(BOLD);
    text(fbNames[i], fb.x + fb.w / 2, fb.y + fb.h / 2 - 7);
    textStyle(NORMAL);
    textSize(9);
    fill(120);
    text('8 Macrocells', fb.x + fb.w / 2, fb.y + fb.h / 2 + 10);
  }
}

function drawIOBlocks() {
  for (let i = 0; i < ioBlocks.length; i++) {
    let io = ioBlocks[i];
    let isSelected = (selectedType === COMP_IO && selectedIndex === i);

    fill(isSelected ? ioColor : color(220, 245, 220));
    if (isSelected) {
      stroke(ioColor);
      strokeWeight(2);
    } else {
      stroke(ioColor);
      strokeWeight(1);
    }
    rect(io.x, io.y, io.w, io.h, 3);

    // Pin line extending outward
    stroke(ioColor);
    strokeWeight(1);
    let pinLen = 8;
    switch (io.side) {
      case 'top':
        line(io.x + io.w / 2, io.y, io.x + io.w / 2, io.y - pinLen);
        break;
      case 'right':
        line(io.x + io.w, io.y + io.h / 2, io.x + io.w + pinLen, io.y + io.h / 2);
        break;
      case 'bottom':
        line(io.x + io.w / 2, io.y + io.h, io.x + io.w / 2, io.y + io.h + pinLen);
        break;
      case 'left':
        line(io.x, io.y + io.h / 2, io.x - pinLen, io.y + io.h / 2);
        break;
    }
  }
}

function drawConnections() {
  let m = matrixRect;
  let mCx = m.x + m.w / 2;
  let mCy = m.y + m.h / 2;

  for (let i = 0; i < 4; i++) {
    let fb = fbPositions[i];
    let fbCx = fb.x + fb.w / 2;
    let fbCy = fb.y + fb.h / 2;
    let isActive = (selectedType === COMP_FB && selectedIndex === i);

    // Determine connection points
    let fromX, fromY, toX, toY;

    switch (i) {
      case 0: // top
        fromX = fbCx; fromY = fb.y + fb.h;
        toX = mCx; toY = m.y;
        break;
      case 1: // right
        fromX = fb.x; fromY = fbCy;
        toX = m.x + m.w; toY = mCy;
        break;
      case 2: // bottom
        fromX = fbCx; fromY = fb.y;
        toX = mCx; toY = m.y + m.h;
        break;
      case 3: // left
        fromX = fb.x + fb.w; fromY = fbCy;
        toX = m.x; toY = mCy;
        break;
    }

    // Draw connection bus (multiple lines)
    let busWidth = 6;
    stroke(isActive ? fbColor : color(180));
    strokeWeight(isActive ? 2.5 : 1.5);
    line(fromX, fromY, toX, toY);

    // Draw parallel lines for bus effect
    let dx = toX - fromX;
    let dy = toY - fromY;
    let len = sqrt(dx * dx + dy * dy);
    let nx = -dy / len * busWidth / 2;
    let ny = dx / len * busWidth / 2;

    stroke(isActive ? fbColor : color(200));
    strokeWeight(isActive ? 1.5 : 0.8);
    line(fromX + nx, fromY + ny, toX + nx, toY + ny);
    line(fromX - nx, fromY - ny, toX - nx, toY - ny);

    // Arrow toward matrix
    let arrowSize = 6;
    let adx = toX - fromX;
    let ady = toY - fromY;
    let alen = sqrt(adx * adx + ady * ady);
    let ux = adx / alen;
    let uy = ady / alen;
    let ax = toX - ux * 2;
    let ay = toY - uy * 2;

    fill(isActive ? fbColor : color(180));
    noStroke();
    triangle(
      toX, toY,
      ax - uy * arrowSize - ux * arrowSize, ay + ux * arrowSize - uy * arrowSize,
      ax + uy * arrowSize - ux * arrowSize, ay - ux * arrowSize - uy * arrowSize
    );

    // Connect FB to its I/O blocks
    let ioStart, ioEnd;
    switch (i) {
      case 0: ioStart = 0; ioEnd = 4; break;
      case 1: ioStart = 4; ioEnd = 7; break;
      case 2: ioStart = 7; ioEnd = 11; break;
      case 3: ioStart = 11; ioEnd = 14; break;
    }

    for (let j = ioStart; j < ioEnd; j++) {
      let io = ioBlocks[j];
      let ioCx = io.x + io.w / 2;
      let ioCy = io.y + io.h / 2;

      stroke(isActive ? ioColor : color(210));
      strokeWeight(isActive ? 1.5 : 0.8);

      // Connect from FB edge to IO block
      switch (io.side) {
        case 'top':
          line(ioCx, fb.y, ioCx, io.y + io.h);
          break;
        case 'right':
          line(fb.x + fb.w, ioCy, io.x, ioCy);
          break;
        case 'bottom':
          line(ioCx, fb.y + fb.h, ioCx, io.y);
          break;
        case 'left':
          line(fb.x, ioCy, io.x + io.w, ioCy);
          break;
      }
    }
  }
}

function drawInfoPanel() {
  let panelY = 330;
  let panelH = drawHeight - panelY - 5;
  let panelX = 10;
  let panelW = canvasWidth - 20;

  // Panel background
  fill(255);
  stroke(200);
  strokeWeight(1);
  rect(panelX, panelY, panelW, panelH, 6);

  if (selectedType === COMP_NONE) {
    fill(150);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(13);
    text('Click on a component to see its details', panelX + panelW / 2, panelY + panelH / 2);
    return;
  }

  let detail;
  if (selectedType === COMP_FB) {
    detail = fbDetails[selectedIndex];
  } else if (selectedType === COMP_MATRIX) {
    detail = matrixDetail;
  } else if (selectedType === COMP_IO) {
    detail = ioDetail;
  }

  // Title
  let titleColor;
  if (selectedType === COMP_FB) titleColor = fbColor;
  else if (selectedType === COMP_MATRIX) titleColor = matrixColor;
  else titleColor = ioColor;

  fill(titleColor);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(14);
  textStyle(BOLD);
  text(detail.title, panelX + 12, panelY + 10);
  textStyle(NORMAL);

  // Description
  fill(80);
  textSize(11);
  textAlign(LEFT, TOP);
  // Word wrap the description
  let descX = panelX + 12;
  let descY = panelY + 30;
  let maxW = panelW - 24;
  text(detail.desc, descX, descY, maxW, 40);

  // Features as tags
  let tagY = panelY + 72;
  let tagX = panelX + 12;

  for (let i = 0; i < detail.features.length; i++) {
    let feat = detail.features[i];
    let tw = textWidth(feat) + 16;

    // Check if tag fits on current line
    if (tagX + tw > panelX + panelW - 12) {
      tagX = panelX + 12;
      tagY += 22;
    }

    // Tag background
    fill(240, 240, 255);
    stroke(200);
    strokeWeight(1);
    rect(tagX, tagY, tw, 18, 9);

    // Tag text
    fill(80);
    noStroke();
    textSize(10);
    textAlign(CENTER, CENTER);
    text(feat, tagX + tw / 2, tagY + 9);

    tagX += tw + 6;
  }
}

function mousePressed() {
  // Check function blocks
  for (let i = 0; i < 4; i++) {
    let fb = fbPositions[i];
    if (mouseX >= fb.x && mouseX <= fb.x + fb.w &&
        mouseY >= fb.y && mouseY <= fb.y + fb.h) {
      selectedType = COMP_FB;
      selectedIndex = i;
      return;
    }
  }

  // Check interconnect matrix
  let m = matrixRect;
  if (mouseX >= m.x && mouseX <= m.x + m.w &&
      mouseY >= m.y && mouseY <= m.y + m.h) {
    selectedType = COMP_MATRIX;
    selectedIndex = 0;
    return;
  }

  // Check I/O blocks
  for (let i = 0; i < ioBlocks.length; i++) {
    let io = ioBlocks[i];
    if (mouseX >= io.x && mouseX <= io.x + io.w &&
        mouseY >= io.y && mouseY <= io.y + io.h) {
      selectedType = COMP_IO;
      selectedIndex = i;
      return;
    }
  }

  // Clicked nothing - deselect
  if (mouseY < drawHeight) {
    selectedType = COMP_NONE;
    selectedIndex = -1;
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
