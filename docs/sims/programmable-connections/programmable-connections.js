// Programmable Connections MicroSim
// Compare fuse, antifuse, SRAM, and flash programmable connection technologies

let containerWidth;
let canvasWidth = 400;
let drawHeight = 450;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

// Connection technology data
let technologies = [
  {
    name: 'Fuse',
    color: '#E91E63',
    connected: true,         // default state: connected
    programmed: false,
    defaultState: 'Connected',
    programmedState: 'Blown (Disconnected)',
    volatility: 'Non-volatile',
    method: 'High current blows fuse',
    reprogrammable: 'No (OTP)'
  },
  {
    name: 'Antifuse',
    color: '#FF9800',
    connected: false,        // default state: disconnected
    programmed: false,
    defaultState: 'Disconnected',
    programmedState: 'Connected',
    volatility: 'Non-volatile',
    method: 'High voltage creates connection',
    reprogrammable: 'No (OTP)'
  },
  {
    name: 'SRAM',
    color: '#2196F3',
    connected: false,        // default state: off
    programmed: false,
    defaultState: 'Off (0)',
    programmedState: 'On (1)',
    volatility: 'Volatile',
    method: 'Write bit to memory cell',
    reprogrammable: 'Yes (in-system)'
  },
  {
    name: 'Flash',
    color: '#4CAF50',
    connected: false,        // default state: off
    programmed: false,
    defaultState: 'Off (no charge)',
    programmedState: 'On (charge stored)',
    volatility: 'Non-volatile',
    method: 'Trap charge on floating gate',
    reprogrammable: 'Yes (electrically)'
  }
];

let selectedIndex = 0;
let toggleButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  describe('Interactive comparison of four programmable connection technologies: fuse, antifuse, SRAM, and flash.', LABEL);

  // Create toggle button
  toggleButton = createButton('Toggle Connection');
  toggleButton.parent(mainElement);
  toggleButton.style('font-size', '14px');
  toggleButton.style('padding', '8px 20px');
  toggleButton.style('margin', '5px');
  toggleButton.style('cursor', 'pointer');
  toggleButton.style('border', 'none');
  toggleButton.style('border-radius', '4px');
  toggleButton.style('background-color', technologies[selectedIndex].color);
  toggleButton.style('color', 'white');
  toggleButton.mousePressed(toggleConnection);
}

function draw() {
  updateCanvasSize();
  background(245);

  // Title bar
  fill(50);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(18);
  text('Programmable Connection Technologies', canvasWidth / 2, 20);

  // Draw 2x2 grid of panels
  let panelMargin = 10;
  let panelW = (canvasWidth - panelMargin * 3) / 2;
  let panelH = (drawHeight - 90 - panelMargin * 3) / 2;
  let startY = 45;

  for (let i = 0; i < 4; i++) {
    let col = i % 2;
    let row = Math.floor(i / 2);
    let px = panelMargin + col * (panelW + panelMargin);
    let py = startY + row * (panelH + panelMargin);

    drawPanel(i, px, py, panelW, panelH);
  }

  // Info bar at bottom
  let tech = technologies[selectedIndex];
  let infoY = drawHeight - 40;
  fill(255);
  stroke(200);
  strokeWeight(1);
  rect(5, infoY, canvasWidth - 10, 35, 5);

  fill(80);
  noStroke();
  textSize(12);
  textAlign(CENTER, CENTER);
  let stateLabel = tech.programmed ? tech.programmedState : tech.defaultState;
  text(
    tech.name + '  |  State: ' + stateLabel +
    '  |  ' + tech.volatility +
    '  |  ' + tech.reprogrammable,
    canvasWidth / 2, infoY + 17
  );
}

function drawPanel(index, px, py, pw, ph) {
  let tech = technologies[index];
  let isSelected = (index === selectedIndex);

  // Panel background
  if (isSelected) {
    stroke(tech.color);
    strokeWeight(3);
  } else {
    stroke(200);
    strokeWeight(1);
  }
  fill(255);
  rect(px, py, pw, ph, 8);

  // Panel title
  fill(tech.color);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(15);
  textStyle(BOLD);
  text(tech.name, px + pw / 2, py + 8);
  textStyle(NORMAL);

  // Connection diagram area
  let diagCenterX = px + pw / 2;
  let diagCenterY = py + ph * 0.45;
  let diagWidth = pw * 0.6;

  // Draw connection diagram based on type
  drawConnectionDiagram(index, diagCenterX, diagCenterY, diagWidth, ph * 0.25);

  // State indicator
  let isConnected;
  if (index === 0) {
    // Fuse: default connected, programmed = blown
    isConnected = !tech.programmed;
  } else {
    // Antifuse, SRAM, Flash: default disconnected, programmed = connected
    isConnected = tech.programmed;
  }

  let stateY = py + ph * 0.72;
  fill(isConnected ? '#4CAF50' : '#F44336');
  noStroke();
  ellipse(diagCenterX - 40, stateY, 12, 12);
  fill(80);
  textSize(12);
  textAlign(LEFT, CENTER);
  text(isConnected ? 'Connected' : 'Disconnected', diagCenterX - 30, stateY);

  // Volatility label
  let volY = py + ph * 0.86;
  fill(120);
  textSize(11);
  textAlign(CENTER, CENTER);
  text(tech.volatility, px + pw / 2, volY);
}

function drawConnectionDiagram(index, cx, cy, w, h) {
  let tech = technologies[index];
  let halfW = w / 2;
  let isConnected;

  if (index === 0) {
    isConnected = !tech.programmed;
  } else {
    isConnected = tech.programmed;
  }

  // Terminal dots on each side
  fill(80);
  noStroke();
  ellipse(cx - halfW, cy, 10, 10);
  ellipse(cx + halfW, cy, 10, 10);

  switch (index) {
    case 0: // Fuse
      if (isConnected) {
        // Intact fuse: thin wire with bulge
        stroke(tech.color);
        strokeWeight(3);
        noFill();
        line(cx - halfW, cy, cx - 15, cy);
        // Fuse element (small rectangle)
        fill(tech.color);
        rect(cx - 15, cy - 6, 30, 12, 2);
        noFill();
        line(cx + 15, cy, cx + halfW, cy);
      } else {
        // Blown fuse: gap with X
        stroke(180);
        strokeWeight(2);
        line(cx - halfW, cy, cx - 15, cy);
        line(cx + 15, cy, cx + halfW, cy);
        // X mark
        stroke('#F44336');
        strokeWeight(3);
        line(cx - 10, cy - 10, cx + 10, cy + 10);
        line(cx - 10, cy + 10, cx + 10, cy - 10);
      }
      break;

    case 1: // Antifuse
      if (!isConnected) {
        // Default: gap (two plates with space)
        stroke(180);
        strokeWeight(2);
        line(cx - halfW, cy, cx - 8, cy);
        line(cx + 8, cy, cx + halfW, cy);
        // Plates
        stroke(tech.color);
        strokeWeight(3);
        line(cx - 8, cy - 12, cx - 8, cy + 12);
        line(cx + 8, cy - 12, cx + 8, cy + 12);
      } else {
        // Programmed: connected through
        stroke(tech.color);
        strokeWeight(3);
        line(cx - halfW, cy, cx + halfW, cy);
        // Small dot showing fusion point
        fill(tech.color);
        noStroke();
        ellipse(cx, cy, 8, 8);
      }
      break;

    case 2: // SRAM transistor switch
      stroke(180);
      strokeWeight(2);
      line(cx - halfW, cy, cx - 20, cy);
      line(cx + 20, cy, cx + halfW, cy);

      if (isConnected) {
        // Transistor ON: closed switch
        stroke(tech.color);
        strokeWeight(3);
        line(cx - 20, cy, cx + 20, cy);
        // Gate symbol
        stroke(tech.color);
        strokeWeight(2);
        line(cx, cy - 20, cx, cy - 8);
        fill(255);
        rect(cx - 12, cy - 8, 24, 6);
        // 1 label
        fill(tech.color);
        noStroke();
        textSize(14);
        textAlign(CENTER, CENTER);
        textStyle(BOLD);
        text('1', cx, cy - 25);
        textStyle(NORMAL);
      } else {
        // Transistor OFF: open switch
        stroke(180);
        strokeWeight(2);
        line(cx - 20, cy, cx - 5, cy - 15);
        // Gate symbol
        stroke(180);
        line(cx, cy - 20, cx, cy - 8);
        fill(255);
        stroke(180);
        rect(cx - 12, cy - 8, 24, 6);
        // 0 label
        fill(180);
        noStroke();
        textSize(14);
        textAlign(CENTER, CENTER);
        textStyle(BOLD);
        text('0', cx, cy - 25);
        textStyle(NORMAL);
      }
      break;

    case 3: // Flash floating gate
      stroke(180);
      strokeWeight(2);
      line(cx - halfW, cy + 5, cx - 20, cy + 5);
      line(cx + 20, cy + 5, cx + halfW, cy + 5);

      // MOSFET body
      stroke(isConnected ? tech.color : 180);
      strokeWeight(2);
      // Source/drain
      line(cx - 20, cy + 5, cx - 20, cy - 5);
      line(cx + 20, cy + 5, cx + 20, cy - 5);
      // Channel
      if (isConnected) {
        stroke(tech.color);
        strokeWeight(2);
        line(cx - 20, cy - 5, cx + 20, cy - 5);
      }
      // Floating gate (dashed)
      stroke(isConnected ? tech.color : 180);
      strokeWeight(2);
      let fgY = cy - 12;
      rect(cx - 16, fgY, 32, 6);
      if (isConnected) {
        // Show trapped charge
        fill(tech.color);
        noStroke();
        textSize(10);
        textAlign(CENTER, CENTER);
        text('e- e- e-', cx, fgY + 3);
      }
      // Control gate
      stroke(isConnected ? tech.color : 180);
      strokeWeight(2);
      noFill();
      rect(cx - 14, fgY - 10, 28, 6);
      // Gate line
      line(cx, fgY - 10, cx, fgY - 20);
      break;
  }
}

function toggleConnection() {
  let tech = technologies[selectedIndex];
  tech.programmed = !tech.programmed;
}

function mousePressed() {
  // Check which panel was clicked
  let panelMargin = 10;
  let panelW = (canvasWidth - panelMargin * 3) / 2;
  let panelH = (drawHeight - 90 - panelMargin * 3) / 2;
  let startY = 45;

  for (let i = 0; i < 4; i++) {
    let col = i % 2;
    let row = Math.floor(i / 2);
    let px = panelMargin + col * (panelW + panelMargin);
    let py = startY + row * (panelH + panelMargin);

    if (mouseX >= px && mouseX <= px + panelW &&
        mouseY >= py && mouseY <= py + panelH) {
      selectedIndex = i;
      // Update button color
      toggleButton.style('background-color', technologies[selectedIndex].color);
      break;
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
