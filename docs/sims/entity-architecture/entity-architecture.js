// Entity-Architecture Explorer MicroSim
// Visualize VHDL entity declarations and architecture bodies

let containerWidth;
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

// View state
let currentView = 'entity'; // 'entity' or 'architecture'
let currentComponent = 0;   // 0=AND, 1=MUX, 2=Counter
let hoveredPort = null;

// Color palette
const ENTITY_COLOR = '#5C6BC0';
const INPUT_COLOR = '#4CAF50';
const OUTPUT_COLOR = '#E91E63';
const CODE_BG = '#263238';
const CODE_TEXT = '#ECEFF1';
const KEYWORD_COLOR = '#82B1FF';
const COMMENT_COLOR = '#69F0AE';
const IDENT_COLOR = '#ECEFF1';

// Component definitions
const components = [
  {
    name: 'and2',
    label: 'AND Gate',
    inputs: [
      { name: 'A', type: 'STD_LOGIC' },
      { name: 'B', type: 'STD_LOGIC' }
    ],
    outputs: [
      { name: 'Y', type: 'STD_LOGIC' }
    ],
    entityCode: [
      { text: 'entity ', style: 'keyword' },
      { text: 'and2 ', style: 'ident' },
      { text: 'is', style: 'keyword' }
    ],
    entityPorts: [
      '  port (',
      '    A : in  STD_LOGIC;',
      '    B : in  STD_LOGIC;',
      '    Y : out STD_LOGIC',
      '  );'
    ],
    entityEnd: 'end entity and2;',
    archCode: [
      'architecture behavioral of and2 is',
      'begin',
      '  Y <= A AND B;',
      'end architecture behavioral;'
    ],
    archDesc: 'Simple AND operation'
  },
  {
    name: 'mux4to1',
    label: '4:1 MUX',
    inputs: [
      { name: 'A', type: 'STD_LOGIC' },
      { name: 'B', type: 'STD_LOGIC' },
      { name: 'C', type: 'STD_LOGIC' },
      { name: 'D', type: 'STD_LOGIC' },
      { name: 'Sel', type: 'STD_LOGIC_VECTOR(1 downto 0)' }
    ],
    outputs: [
      { name: 'Y', type: 'STD_LOGIC' }
    ],
    entityCode: [
      { text: 'entity ', style: 'keyword' },
      { text: 'mux4to1 ', style: 'ident' },
      { text: 'is', style: 'keyword' }
    ],
    entityPorts: [
      '  port (',
      '    A   : in  STD_LOGIC;',
      '    B   : in  STD_LOGIC;',
      '    C   : in  STD_LOGIC;',
      '    D   : in  STD_LOGIC;',
      '    Sel : in  STD_LOGIC_VECTOR(1 downto 0);',
      '    Y   : out STD_LOGIC',
      '  );'
    ],
    entityEnd: 'end entity mux4to1;',
    archCode: [
      'architecture behavioral of mux4to1 is',
      'begin',
      '  with Sel select',
      '    Y <= A when "00",',
      '         B when "01",',
      '         C when "10",',
      '         D when others;',
      'end architecture behavioral;'
    ],
    archDesc: 'Selected signal assignment'
  },
  {
    name: 'counter4',
    label: '4-bit Counter',
    inputs: [
      { name: 'CLK', type: 'STD_LOGIC' },
      { name: 'RST', type: 'STD_LOGIC' }
    ],
    outputs: [
      { name: 'Q', type: 'STD_LOGIC_VECTOR(3 downto 0)' }
    ],
    entityCode: [
      { text: 'entity ', style: 'keyword' },
      { text: 'counter4 ', style: 'ident' },
      { text: 'is', style: 'keyword' }
    ],
    entityPorts: [
      '  port (',
      '    CLK : in  STD_LOGIC;',
      '    RST : in  STD_LOGIC;',
      '    Q   : out STD_LOGIC_VECTOR(3 downto 0)',
      '  );'
    ],
    entityEnd: 'end entity counter4;',
    archCode: [
      'architecture behavioral of counter4 is',
      '  signal count : unsigned(3 downto 0);',
      'begin',
      '  process(CLK, RST)',
      '  begin',
      '    if RST = \'1\' then',
      '      count <= (others => \'0\');',
      '    elsif rising_edge(CLK) then',
      '      count <= count + 1;',
      '    end if;',
      '  end process;',
      '  Q <= STD_LOGIC_VECTOR(count);',
      'end architecture behavioral;'
    ],
    archDesc: 'Process with async reset'
  }
];

// Button definitions
let viewBtnEntity, viewBtnArch;
let compButtons = [];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  describe('Interactive VHDL entity and architecture explorer showing ports and implementations', LABEL);
  textFont('monospace');
}

function draw() {
  updateCanvasSize();
  background(245);

  let comp = components[currentComponent];

  // Draw component selector buttons
  drawComponentButtons(comp);

  // Draw view toggle buttons
  drawViewButtons();

  // Draw main visualization area
  if (currentView === 'entity') {
    drawEntityView(comp);
  } else {
    drawArchitectureView(comp);
  }

  // Draw VHDL code at bottom
  drawCodeSection(comp);
}

function drawComponentButtons(comp) {
  let btnW = 110;
  let btnH = 28;
  let startX = 10;
  let y = 8;

  for (let i = 0; i < components.length; i++) {
    let x = startX + i * (btnW + 10);
    let isSelected = (i === currentComponent);

    // Store button bounds for click detection
    compButtons[i] = { x: x, y: y, w: btnW, h: btnH };

    fill(isSelected ? ENTITY_COLOR : 220);
    stroke(isSelected ? ENTITY_COLOR : 180);
    strokeWeight(1);
    rect(x, y, btnW, btnH, 4);

    fill(isSelected ? 255 : 60);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(12);
    text(components[i].label, x + btnW / 2, y + btnH / 2);
  }
}

function drawViewButtons() {
  let btnW = 120;
  let btnH = 28;
  let y = 8;

  // Entity View button
  let ex = canvasWidth - 260;
  viewBtnEntity = { x: ex, y: y, w: btnW, h: btnH };
  fill(currentView === 'entity' ? INPUT_COLOR : 220);
  stroke(currentView === 'entity' ? INPUT_COLOR : 180);
  strokeWeight(1);
  rect(ex, y, btnW, btnH, 4);
  fill(currentView === 'entity' ? 255 : 60);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  text('Entity View', ex + btnW / 2, y + btnH / 2);

  // Architecture View button
  let ax = canvasWidth - 130;
  viewBtnArch = { x: ax, y: y, w: btnW, h: btnH };
  fill(currentView === 'architecture' ? OUTPUT_COLOR : 220);
  stroke(currentView === 'architecture' ? OUTPUT_COLOR : 180);
  strokeWeight(1);
  rect(ax, y, btnW, btnH, 4);
  fill(currentView === 'architecture' ? 255 : 60);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  text('Arch View', ax + btnW / 2, y + btnH / 2);
}

function drawEntityView(comp) {
  let boxX = canvasWidth * 0.25;
  let boxY = 55;
  let boxW = canvasWidth * 0.5;
  let boxH = 140;

  // Draw black box
  fill(ENTITY_COLOR);
  stroke(40);
  strokeWeight(2);
  rect(boxX, boxY, boxW, boxH, 8);

  // Entity name on box
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(18);
  textStyle(BOLD);
  text(comp.name, boxX + boxW / 2, boxY + boxH / 2);
  textStyle(NORMAL);

  // Draw input ports (left side)
  hoveredPort = null;
  let inputSpacing = boxH / (comp.inputs.length + 1);
  for (let i = 0; i < comp.inputs.length; i++) {
    let py = boxY + inputSpacing * (i + 1);
    let px = boxX;
    let portInfo = comp.inputs[i];

    // Check hover
    let isHovered = (mouseX > px - 60 && mouseX < px + 10 && mouseY > py - 10 && mouseY < py + 10);
    if (isHovered) hoveredPort = portInfo;

    // Port arrow (pointing into box)
    stroke(INPUT_COLOR);
    strokeWeight(isHovered ? 3 : 2);
    line(px - 40, py, px, py);
    fill(INPUT_COLOR);
    noStroke();
    triangle(px - 5, py - 5, px - 5, py + 5, px + 3, py);

    // Port label
    fill(isHovered ? INPUT_COLOR : 60);
    textAlign(RIGHT, CENTER);
    textSize(13);
    text(portInfo.name, px - 45, py);
  }

  // Draw output ports (right side)
  let outputSpacing = boxH / (comp.outputs.length + 1);
  for (let i = 0; i < comp.outputs.length; i++) {
    let py = boxY + outputSpacing * (i + 1);
    let px = boxX + boxW;
    let portInfo = comp.outputs[i];

    let isHovered = (mouseX > px - 10 && mouseX < px + 60 && mouseY > py - 10 && mouseY < py + 10);
    if (isHovered) hoveredPort = portInfo;

    // Port arrow (pointing out of box)
    stroke(OUTPUT_COLOR);
    strokeWeight(isHovered ? 3 : 2);
    line(px, py, px + 40, py);
    fill(OUTPUT_COLOR);
    noStroke();
    triangle(px + 35, py - 5, px + 35, py + 5, px + 43, py);

    // Port label
    fill(isHovered ? OUTPUT_COLOR : 60);
    textAlign(LEFT, CENTER);
    textSize(13);
    text(portInfo.name, px + 48, py);
  }

  // Draw hover tooltip
  if (hoveredPort) {
    let dir = comp.inputs.includes(hoveredPort) ? 'in' : 'out';
    let tipText = hoveredPort.name + ' : ' + dir + '  ' + hoveredPort.type;
    let tipW = textWidth(tipText) + 20;
    let tipX = mouseX + 15;
    let tipY = mouseY - 25;
    if (tipX + tipW > canvasWidth) tipX = mouseX - tipW - 10;

    fill(50, 230);
    noStroke();
    rect(tipX, tipY, tipW, 24, 4);
    fill(255);
    textAlign(LEFT, CENTER);
    textSize(11);
    text(tipText, tipX + 10, tipY + 12);
  }
}

function drawArchitectureView(comp) {
  let boxX = canvasWidth * 0.25;
  let boxY = 55;
  let boxW = canvasWidth * 0.5;
  let boxH = 140;

  // Draw transparent box (architecture body visible)
  fill(255, 240);
  stroke(ENTITY_COLOR);
  strokeWeight(2);
  drawingContext.setLineDash([6, 4]);
  rect(boxX, boxY, boxW, boxH, 8);
  drawingContext.setLineDash([]);

  // Architecture name
  fill(100);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(10);
  text('architecture behavioral of ' + comp.name, boxX + boxW / 2, boxY + 5);

  // Draw internal logic representation
  drawInternalLogic(comp, boxX, boxY, boxW, boxH);

  // Draw input ports (left side)
  let inputSpacing = boxH / (comp.inputs.length + 1);
  for (let i = 0; i < comp.inputs.length; i++) {
    let py = boxY + inputSpacing * (i + 1);
    let px = boxX;
    stroke(INPUT_COLOR);
    strokeWeight(2);
    line(px - 40, py, px, py);
    fill(INPUT_COLOR);
    noStroke();
    triangle(px - 5, py - 5, px - 5, py + 5, px + 3, py);
    fill(60);
    textAlign(RIGHT, CENTER);
    textSize(13);
    text(comp.inputs[i].name, px - 45, py);
  }

  // Draw output ports (right side)
  let outputSpacing = boxH / (comp.outputs.length + 1);
  for (let i = 0; i < comp.outputs.length; i++) {
    let py = boxY + outputSpacing * (i + 1);
    let px = boxX + boxW;
    stroke(OUTPUT_COLOR);
    strokeWeight(2);
    line(px, py, px + 40, py);
    fill(OUTPUT_COLOR);
    noStroke();
    triangle(px + 35, py - 5, px + 35, py + 5, px + 43, py);
    fill(60);
    textAlign(LEFT, CENTER);
    textSize(13);
    text(comp.outputs[i].name, px + 48, py);
  }

  // Description text
  fill(80);
  textAlign(CENTER, CENTER);
  textSize(11);
  text(comp.archDesc, boxX + boxW / 2, boxY + boxH + 15);
}

function drawInternalLogic(comp, bx, by, bw, bh) {
  let cx = bx + bw / 2;
  let cy = by + bh / 2 + 10;

  if (currentComponent === 0) {
    // AND gate symbol
    fill(230);
    stroke(80);
    strokeWeight(1.5);
    rectMode(CENTER);
    rect(cx - 10, cy, 30, 30);
    arc(cx + 5, cy, 30, 30, -HALF_PI, HALF_PI);
    rectMode(CORNER);
    // Label
    fill(80);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(10);
    text('AND', cx, cy);
  } else if (currentComponent === 1) {
    // MUX trapezoid
    fill(230);
    stroke(80);
    strokeWeight(1.5);
    beginShape();
    vertex(cx - 20, cy - 30);
    vertex(cx + 15, cy - 15);
    vertex(cx + 15, cy + 15);
    vertex(cx - 20, cy + 30);
    endShape(CLOSE);
    fill(80);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(10);
    text('MUX', cx - 3, cy);
  } else {
    // Counter: adder + register
    fill(230);
    stroke(80);
    strokeWeight(1.5);
    rect(cx - 30, cy - 15, 25, 30, 3);
    rect(cx + 5, cy - 15, 25, 30, 3);
    fill(80);
    noStroke();
    textSize(9);
    textAlign(CENTER, CENTER);
    text('+1', cx - 18, cy);
    text('REG', cx + 17, cy);
    // Arrow between
    stroke(80);
    strokeWeight(1);
    line(cx - 5, cy, cx + 5, cy);
    fill(80);
    noStroke();
    triangle(cx + 2, cy - 3, cx + 2, cy + 3, cx + 6, cy);
  }
}

function drawCodeSection(comp) {
  let codeY = 220;
  let codeH = drawHeight - codeY;
  let codeX = 10;
  let codeW = canvasWidth - 20;

  // Code background
  fill(CODE_BG);
  noStroke();
  rect(codeX, codeY, codeW, codeH, 6);

  // Code lines
  let lineH = 15;
  let startY = codeY + 12;
  let lines;

  if (currentView === 'entity') {
    lines = [];
    // Build entity code text
    lines.push({ text: 'entity ' + comp.name + ' is', kw: ['entity', 'is'] });
    for (let p of comp.entityPorts) {
      lines.push({ text: p, kw: ['port', 'in', 'out', 'STD_LOGIC', 'STD_LOGIC_VECTOR'] });
    }
    lines.push({ text: comp.entityEnd, kw: ['end', 'entity'] });
  } else {
    lines = comp.archCode.map(l => ({
      text: l,
      kw: ['architecture', 'of', 'is', 'begin', 'end', 'process', 'signal', 'if', 'then', 'elsif', 'else',
           'rising_edge', 'with', 'select', 'when', 'others', 'unsigned']
    }));
  }

  textSize(12);
  textAlign(LEFT, TOP);

  for (let i = 0; i < lines.length; i++) {
    let y = startY + i * lineH;
    if (y + lineH > codeY + codeH) break;

    // Line number
    fill(100);
    text((i + 1).toString().padStart(2, ' '), codeX + 8, y);

    // Syntax-highlighted line
    let lineText = lines[i].text;
    let xPos = codeX + 32;
    let words = lineText.split(/(\s+)/);

    for (let w of words) {
      let trimmed = w.replace(/[;,()':]/g, '');
      if (lines[i].kw && lines[i].kw.includes(trimmed)) {
        fill(KEYWORD_COLOR);
      } else if (w.startsWith('--')) {
        fill(COMMENT_COLOR);
      } else {
        fill(IDENT_COLOR);
      }
      text(w, xPos, y);
      xPos += textWidth(w);
    }
  }
}

function mousePressed() {
  // Check component buttons
  for (let i = 0; i < compButtons.length; i++) {
    let b = compButtons[i];
    if (b && mouseX > b.x && mouseX < b.x + b.w && mouseY > b.y && mouseY < b.y + b.h) {
      currentComponent = i;
      return;
    }
  }

  // Check view buttons
  if (viewBtnEntity && mouseX > viewBtnEntity.x && mouseX < viewBtnEntity.x + viewBtnEntity.w &&
      mouseY > viewBtnEntity.y && mouseY < viewBtnEntity.y + viewBtnEntity.h) {
    currentView = 'entity';
    return;
  }
  if (viewBtnArch && mouseX > viewBtnArch.x && mouseX < viewBtnArch.x + viewBtnArch.w &&
      mouseY > viewBtnArch.y && mouseY < viewBtnArch.y + viewBtnArch.h) {
    currentView = 'architecture';
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
