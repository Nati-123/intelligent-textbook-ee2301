// CLB Architecture MicroSim
// Interactive FPGA Configurable Logic Block diagram
// Bloom Level: Analyze (L4)

let containerWidth;
let canvasWidth = 400;
let drawHeight = 560;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

// Component definitions with positions (will be scaled)
let components = [];
let selectedComponent = null;
let muxABypass = false; // false = through FF, true = bypass FF
let muxBBypass = false;

// Signal animation
let signalPhase = 0;
let animateSignal = true;

const colors = {
  lut: '#5C6BC0',
  ff: '#E91E63',
  mux: '#FF9800',
  carry: '#4CAF50',
  wire: '#666',
  selected: '#FFC107',
  bg: '#f5f5f5',
  text: '#212121',
  inputWire: '#42A5F5',
  outputWire: '#66BB6A'
};

// Info text for each component type
const componentInfo = {
  'LUT-A': 'LUT-A: 4-input Look-Up Table implementing any combinational function. Configured by loading 16-bit truth table into SRAM cells. Produces one output.',
  'LUT-B': 'LUT-B: Second 4-input LUT in this CLB slice. Can implement an independent function or combine with LUT-A for wider functions.',
  'FF-A': 'FF-A: D-type Flip-Flop that captures the LUT-A output on the rising clock edge. Provides registered (synchronous) output from the CLB.',
  'FF-B': 'FF-B: D-type Flip-Flop for LUT-B output. Can be bypassed using the output MUX for purely combinational paths.',
  'MUX-A': 'MUX-A: Output multiplexer selects between combinational (direct LUT) and registered (through FF) output. Click to toggle bypass mode.',
  'MUX-B': 'MUX-B: Output multiplexer for the B path. Allows selecting combinational or registered output independently from MUX-A.',
  'Carry': 'Carry Chain: Fast dedicated routing for arithmetic carry propagation. Connects vertically between CLBs for efficient adders and counters.'
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  describe('Interactive CLB architecture block diagram with LUTs, flip-flops, MUXes, and carry chain', LABEL);
  initComponents();
}

function initComponents() {
  // Component layout positions (relative to drawing area)
  // Each: { name, type, x, y, w, h }
  components = [
    { name: 'LUT-A', type: 'lut', x: 100, y: 70, w: 100, h: 90 },
    { name: 'LUT-B', type: 'lut', x: 100, y: 260, w: 100, h: 90 },
    { name: 'FF-A', type: 'ff', x: 265, y: 75, w: 80, h: 70 },
    { name: 'FF-B', type: 'ff', x: 265, y: 265, w: 80, h: 70 },
    { name: 'MUX-A', type: 'mux', x: 380, y: 70, w: 45, h: 90 },
    { name: 'MUX-B', type: 'mux', x: 380, y: 260, w: 45, h: 90 },
    { name: 'Carry', type: 'carry', x: 215, y: 400, w: 55, h: 65 }
  ];
}

function draw() {
  updateCanvasSize();
  signalPhase = (signalPhase + 0.02) % 1;

  // Background
  fill(colors.bg);
  noStroke();
  rect(0, 0, canvasWidth, drawHeight);

  // Control area
  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill(colors.text);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(18);
  text('CLB Architecture', canvasWidth / 2, 8);

  // Subtitle
  textSize(11);
  fill('#666');
  text('Click components to inspect | Click MUX to toggle bypass', canvasWidth / 2, 30);

  // Scale factor for responsive layout
  let scale = Math.min(canvasWidth / 520, 1.0);
  let offsetX = (canvasWidth - 520 * scale) / 2;

  push();
  translate(offsetX, 0);

  // Draw CLB boundary
  stroke('#BDBDBD');
  strokeWeight(2);
  fill(255, 255, 255, 60);
  rect(50 * scale, 50, 440 * scale, 430, 10);

  // CLB label
  fill('#999');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(10);
  text('Configurable Logic Block (CLB)', 60 * scale, 55);

  // Draw wires first (behind components)
  drawWires(scale);

  // Draw carry chain
  drawCarryChain(scale);

  // Draw all components
  for (let comp of components) {
    drawComponent(comp, scale, offsetX);
  }

  // Draw input labels
  drawInputLabels(scale);

  // Draw output labels
  drawOutputLabels(scale);

  // Draw clock signal
  drawClockSignal(scale);

  pop();

  // Draw info panel at bottom
  drawInfoPanel();

  // Hand cursor on hover over components
  let hovering = false;
  let hScale = Math.min(canvasWidth / 520, 1.0);
  let hOffsetX = (canvasWidth - 520 * hScale) / 2;
  let hmx = mouseX - hOffsetX;
  for (let comp of components) {
    // Check bit boxes
    if (comp._bitBox) {
      let bb = comp._bitBox;
      if (mouseX >= bb.x && mouseX <= bb.x + bb.w &&
          mouseY >= bb.y && mouseY <= bb.y + bb.h) { hovering = true; break; }
    }
    let hcx = comp.x * hScale;
    let hcw = comp.w * hScale;
    if (hmx >= hcx && hmx <= hcx + hcw &&
        mouseY >= comp.y && mouseY <= comp.y + comp.h) { hovering = true; break; }
  }
  cursor(hovering ? HAND : ARROW);

  // Control area text
  fill(colors.text);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  let modeA = muxABypass ? 'Combinational' : 'Registered';
  let modeB = muxBBypass ? 'Combinational' : 'Registered';
  text('Output A: ' + modeA + '   |   Output B: ' + modeB, canvasWidth / 2, drawHeight + 15);
  textSize(10);
  fill('#999');
  text('Click components to inspect | Click MUX bit box to toggle mode', canvasWidth / 2, drawHeight + 35);
}

function drawWires(scale) {
  strokeWeight(2);

  // LUT-A to FF-A
  stroke(colors.wire);
  line(200 * scale, 115, 265 * scale, 110);

  // LUT-A to MUX-A (bypass path)
  stroke(muxABypass ? colors.selected : '#BDBDBD');
  strokeWeight(muxABypass ? 2.5 : 1.5);
  setLineDash(muxABypass ? [] : [4, 4]);
  line(200 * scale, 105, 240 * scale, 82);
  line(240 * scale, 82, 380 * scale, 100);
  setLineDash([]);

  // FF-A to MUX-A (registered path)
  stroke(!muxABypass ? colors.selected : '#BDBDBD');
  strokeWeight(!muxABypass ? 2.5 : 1.5);
  setLineDash(!muxABypass ? [] : [4, 4]);
  line(345 * scale, 110, 380 * scale, 120);
  setLineDash([]);

  // LUT-B to FF-B
  strokeWeight(2);
  stroke(colors.wire);
  line(200 * scale, 305, 265 * scale, 300);

  // LUT-B to MUX-B (bypass path)
  stroke(muxBBypass ? colors.selected : '#BDBDBD');
  strokeWeight(muxBBypass ? 2.5 : 1.5);
  setLineDash(muxBBypass ? [] : [4, 4]);
  line(200 * scale, 295, 240 * scale, 272);
  line(240 * scale, 272, 380 * scale, 290);
  setLineDash([]);

  // FF-B to MUX-B (registered path)
  stroke(!muxBBypass ? colors.selected : '#BDBDBD');
  strokeWeight(!muxBBypass ? 2.5 : 1.5);
  setLineDash(!muxBBypass ? [] : [4, 4]);
  line(345 * scale, 300, 380 * scale, 310);
  setLineDash([]);

  // MUX-A output wire
  strokeWeight(2);
  stroke(colors.outputWire);
  setLineDash([]);
  line(425 * scale, 115, 475 * scale, 115);

  // MUX-B output wire
  line(425 * scale, 305, 475 * scale, 305);

  // Animated signal dot
  if (animateSignal) {
    let dotPhase = signalPhase;
    noStroke();
    fill(colors.selected);

    // Dot on path A
    if (muxABypass) {
      let dx = lerp(200 * scale, 380 * scale, dotPhase);
      let dy = lerp(105, 100, dotPhase);
      ellipse(dx, dy, 8);
    } else {
      if (dotPhase < 0.5) {
        let dx = lerp(200 * scale, 265 * scale, dotPhase * 2);
        ellipse(dx, 112, 8);
      } else {
        let dx = lerp(345 * scale, 380 * scale, (dotPhase - 0.5) * 2);
        ellipse(dx, 115, 8);
      }
    }

    // Dot on path B
    let dotPhaseB = (signalPhase + 0.3) % 1;
    if (muxBBypass) {
      let dx = lerp(200 * scale, 380 * scale, dotPhaseB);
      let dy = lerp(295, 290, dotPhaseB);
      ellipse(dx, dy, 8);
    } else {
      if (dotPhaseB < 0.5) {
        let dx = lerp(200 * scale, 265 * scale, dotPhaseB * 2);
        ellipse(dx, 302, 8);
      } else {
        let dx = lerp(345 * scale, 380 * scale, (dotPhaseB - 0.5) * 2);
        ellipse(dx, 305, 8);
      }
    }
  }
}

function drawCarryChain(scale) {
  let cx = 242 * scale;

  // Vertical carry path
  stroke(colors.carry);
  strokeWeight(3);
  line(cx, 470, cx, 400);
  line(cx, 400, cx, 200);
  line(cx, 200, cx, 50);

  // Arrow at top (Cout)
  fill(colors.carry);
  noStroke();
  triangle(cx - 6, 60, cx + 6, 60, cx, 48);

  // Arrow at bottom (Cin)
  triangle(cx - 6, 465, cx + 6, 465, cx, 475);

  // Labels
  fill(colors.carry);
  textSize(10);
  textAlign(CENTER, CENTER);
  noStroke();
  text('Cout', cx + 22, 50);
  text('Cin', cx + 20, 475);

  // Carry logic box
  let comp = components[6]; // Carry component
  let isSelected = selectedComponent === 'Carry';
  fill(isSelected ? colors.selected : colors.carry);
  stroke(isSelected ? '#F57F17' : '#2E7D32');
  strokeWeight(2);
  rect(comp.x * scale, comp.y, comp.w * scale, comp.h, 6);

  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  text('Carry', (comp.x + comp.w / 2) * scale, comp.y + 20);
  text('Logic', (comp.x + comp.w / 2) * scale, comp.y + 38);
}

function drawComponent(comp, scale, offsetX) {
  if (comp.type === 'carry') return; // Already drawn

  let isSelected = selectedComponent === comp.name;
  let cx = comp.x * scale;
  let cw = comp.w * scale;

  // Component fill based on type
  let fillColor;
  if (isSelected) {
    fillColor = colors.selected;
  } else {
    fillColor = colors[comp.type] || colors.wire;
  }

  // Draw shape based on type
  if (comp.type === 'mux') {
    // Trapezoid shape for MUX
    let isBypass = comp.name === 'MUX-A' ? muxABypass : muxBBypass;
    fill(fillColor);
    stroke(isSelected ? '#F57F17' : '#BF360C');
    strokeWeight(2);
    beginShape();
    vertex(cx, comp.y);
    vertex(cx + cw, comp.y + 15);
    vertex(cx + cw, comp.y + comp.h - 15);
    vertex(cx, comp.y + comp.h);
    endShape(CLOSE);

    // MUX label
    fill('white');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    text('MUX', cx + cw / 2, comp.y + comp.h / 2 - 8);

    textSize(8);
    text(isBypass ? 'COMB' : 'REG', cx + cw / 2, comp.y + comp.h / 2 + 6);

    // Clickable bit box for MUX mode
    let boxW = 26;
    let boxH = 16;
    let boxX = cx + cw / 2 - boxW / 2;
    let boxY = comp.y + comp.h - boxH - 4;

    fill(isBypass ? color(255, 152, 0) : color(76, 175, 80));
    stroke(isBypass ? color(230, 126, 0) : color(56, 142, 60));
    strokeWeight(1.5);
    rect(boxX, boxY, boxW, boxH, 3);

    fill(255);
    noStroke();
    textSize(10);
    textStyle(BOLD);
    text(isBypass ? '0' : '1', boxX + boxW / 2, boxY + boxH / 2);
    textStyle(NORMAL);

    comp._bitBox = { x: boxX + offsetX, y: boxY, w: boxW, h: boxH };
  } else if (comp.type === 'ff') {
    // Rectangle with triangle (clock) for FF
    fill(fillColor);
    stroke(isSelected ? '#F57F17' : '#880E4F');
    strokeWeight(2);
    rect(cx, comp.y, cw, comp.h, 4);

    // Clock triangle at bottom edge
    fill('white');
    noStroke();
    let triX = cx + cw / 2;
    let triY = comp.y + comp.h;
    triangle(triX - 8, triY, triX + 8, triY, triX, triY - 10);

    // FF label
    textAlign(CENTER, CENTER);
    textSize(13);
    text(comp.name, cx + cw / 2, comp.y + comp.h / 2 - 6);
    textSize(10);
    text('D-FF', cx + cw / 2, comp.y + comp.h / 2 + 12);
  } else if (comp.type === 'lut') {
    // Rounded rectangle for LUT
    fill(fillColor);
    stroke(isSelected ? '#F57F17' : '#283593');
    strokeWeight(2);
    rect(cx, comp.y, cw, comp.h, 8);

    // LUT label
    fill('white');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(13);
    text(comp.name, cx + cw / 2, comp.y + comp.h / 2 - 10);
    textSize(10);
    text('4-Input', cx + cw / 2, comp.y + comp.h / 2 + 6);
    text('16x1 SRAM', cx + cw / 2, comp.y + comp.h / 2 + 20);
  }
}

function drawInputLabels(scale) {
  let inputX = 55 * scale;
  let inputLabels = ['I0', 'I1', 'I2', 'I3'];

  fill(colors.inputWire);
  noStroke();
  textAlign(RIGHT, CENTER);
  textSize(11);

  // LUT-A inputs
  for (let i = 0; i < 4; i++) {
    let y = 82 + i * 20;
    text(inputLabels[i], inputX - 5, y);
    stroke(colors.inputWire);
    strokeWeight(1.5);
    line(inputX, y, 100 * scale, y);
    noStroke();
  }

  // LUT-B inputs
  for (let i = 0; i < 4; i++) {
    let y = 272 + i * 20;
    text(inputLabels[i], inputX - 5, y);
    stroke(colors.inputWire);
    strokeWeight(1.5);
    line(inputX, y, 100 * scale, y);
    noStroke();
  }
}

function drawOutputLabels(scale) {
  let outX = 480 * scale;

  fill(colors.outputWire);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);

  // Output A
  text('Out-A', outX + 5, 115);
  // Output B
  text('Out-B', outX + 5, 305);
}

function drawClockSignal(scale) {
  let clkX = 50 * scale;
  let clkY = 390;

  fill(colors.text);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(10);
  text('CLK', clkX, clkY);

  // Draw clock waveform icon
  stroke(colors.ff);
  strokeWeight(1.5);
  noFill();
  let waveX = clkX + 25;
  beginShape();
  vertex(waveX, clkY + 5);
  vertex(waveX, clkY - 5);
  vertex(waveX + 8, clkY - 5);
  vertex(waveX + 8, clkY + 5);
  vertex(waveX + 16, clkY + 5);
  vertex(waveX + 16, clkY - 5);
  vertex(waveX + 24, clkY - 5);
  vertex(waveX + 24, clkY + 5);
  endShape();

  // Clock line to FFs
  stroke('#E91E63');
  strokeWeight(1);
  setLineDash([3, 3]);
  line(waveX + 28, clkY, 265 * scale, clkY);
  line(305 * scale, clkY, 305 * scale, 145);
  line(305 * scale, clkY, 305 * scale, 335);
  setLineDash([]);
}

function drawInfoPanel() {
  if (selectedComponent) {
    let panelY = drawHeight - 65;
    let panelH = 60;

    fill(255, 255, 255, 230);
    stroke(colors.selected);
    strokeWeight(2);
    rect(10, panelY, canvasWidth - 20, panelH, 6);

    let infoText = componentInfo[selectedComponent] || 'Click a component to see details.';
    fill(colors.text);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(11);
    text(infoText, 20, panelY + 10, canvasWidth - 40, panelH - 12);
  } else {
    let panelY = drawHeight - 30;
    fill('#999');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    text('Click any component to view details', canvasWidth / 2, panelY + 5);
  }
}

function setLineDash(list) {
  drawingContext.setLineDash(list);
}

function mousePressed() {
  let scale = Math.min(canvasWidth / 520, 1.0);
  let offsetX = (canvasWidth - 520 * scale) / 2;
  let mx = mouseX - offsetX;
  let my = mouseY;

  // Check MUX bit box clicks first (using absolute coords stored in _bitBox)
  for (let comp of components) {
    if (comp.type === 'mux' && comp._bitBox) {
      let bb = comp._bitBox;
      if (mouseX >= bb.x && mouseX <= bb.x + bb.w &&
          mouseY >= bb.y && mouseY <= bb.y + bb.h) {
        selectedComponent = comp.name;
        if (comp.name === 'MUX-A') muxABypass = !muxABypass;
        else if (comp.name === 'MUX-B') muxBBypass = !muxBBypass;
        return;
      }
    }
  }

  // Check component clicks
  for (let comp of components) {
    let cx = comp.x * scale;
    let cw = comp.w * scale;
    if (mx >= cx && mx <= cx + cw && my >= comp.y && my <= comp.y + comp.h) {
      selectedComponent = comp.name;

      // Toggle MUX bypass on click
      if (comp.name === 'MUX-A') {
        muxABypass = !muxABypass;
      } else if (comp.name === 'MUX-B') {
        muxBBypass = !muxBBypass;
      }
      return;
    }
  }

  // Click elsewhere deselects
  if (my < drawHeight) {
    selectedComponent = null;
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
