// FPGA Configuration Flow MicroSim
// Compare SRAM-based and Flash-based FPGA configuration
// Bloom Level: Understand (L2)

let containerWidth;
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;

// Active tab: 'sram' or 'flash'
let activeTab = 'sram';

// Current step index for each flow
let sramStep = 0;
let flashStep = 0;

// SRAM flow steps
const sramSteps = [
  { label: 'Power On', desc: 'FPGA receives power. Internal SRAM cells are empty (volatile memory).' },
  { label: 'FPGA Blank', desc: 'All configuration bits are cleared. The FPGA has no programmed logic.' },
  { label: 'Read Bitstream', desc: 'FPGA reads bitstream from external flash memory or configuration interface.' },
  { label: 'Load Config', desc: 'Bitstream is loaded into SRAM configuration cells throughout the FPGA.' },
  { label: 'Verify CRC', desc: 'Cyclic Redundancy Check verifies bitstream integrity. Retries if failed.' },
  { label: 'FPGA Active', desc: 'Configuration complete. FPGA is now operational with programmed logic.' }
];

// Flash flow steps
const flashSteps = [
  { label: 'Power On', desc: 'FPGA receives power. Flash memory retains configuration from last programming.' },
  { label: 'Config Retained', desc: 'Non-volatile flash cells already hold the configuration. No loading needed.' },
  { label: 'FPGA Active', desc: 'FPGA is immediately operational (instant-on). No external memory required.' }
];

// Comparison table data
const comparisonData = [
  { property: 'Volatile?', sram: 'Yes', flash: 'No' },
  { property: 'Boot Time', sram: '~100ms', flash: '<1ms' },
  { property: 'Ext. Memory', sram: 'Required', flash: 'Not Needed' },
  { property: 'Reprogram', sram: 'Unlimited', flash: '~10K cycles' },
  { property: 'Density', sram: 'Higher', flash: 'Lower' }
];

const colors = {
  sram: '#2196F3',
  flash: '#4CAF50',
  active: '#FFC107',
  done: '#E0E0E0',
  pending: '#FAFAFA',
  bg: '#f5f5f5',
  text: '#212121',
  arrow: '#666'
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  describe('FPGA configuration flow comparison between SRAM-based and Flash-based approaches', LABEL);
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
  text('FPGA Configuration Flow', canvasWidth / 2, 16);
  textStyle(NORMAL);
  // Decorative underline
  stroke(220);
  strokeWeight(1);
  line(canvasWidth / 2 - 90, 28, canvasWidth / 2 + 90, 28);

  // Draw tabs
  drawTabs();

  // Draw flowchart for active tab
  let steps = activeTab === 'sram' ? sramSteps : flashSteps;
  let currentStep = activeTab === 'sram' ? sramStep : flashStep;
  drawFlowchart(steps, currentStep);

  // Draw step description
  drawStepDescription(steps, currentStep);

  // Draw comparison table
  drawComparisonTable();

  // Draw control buttons
  drawControlButtons();
}

function drawTabs() {
  let tabW = 120;
  let tabH = 28;
  let tabY = 35;
  let tabStartX = canvasWidth / 2 - tabW;

  // SRAM tab
  let isSram = activeTab === 'sram';
  if (isSram) {
    noStroke();
    fill(33, 150, 243, 30);
    rect(tabStartX - 1, tabY - 1, tabW + 2, tabH + 2, 7, 7, 0, 0);
  }
  fill(isSram ? colors.sram : '#E8E8E8');
  stroke(isSram ? '#1565C0' : '#CACACA');
  strokeWeight(isSram ? 2 : 1);
  rect(tabStartX, tabY, tabW, tabH, 6, 6, 0, 0);
  fill(isSram ? 'white' : colors.text);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  textStyle(isSram ? BOLD : NORMAL);
  text('SRAM-Based', tabStartX + tabW / 2, tabY + tabH / 2);
  textStyle(NORMAL);

  // Flash tab
  let isFlash = activeTab === 'flash';
  if (isFlash) {
    noStroke();
    fill(76, 175, 80, 30);
    rect(tabStartX + tabW - 1, tabY - 1, tabW + 2, tabH + 2, 7, 7, 0, 0);
  }
  fill(isFlash ? colors.flash : '#E8E8E8');
  stroke(isFlash ? '#2E7D32' : '#CACACA');
  strokeWeight(isFlash ? 2 : 1);
  rect(tabStartX + tabW, tabY, tabW, tabH, 6, 6, 0, 0);
  fill(isFlash ? 'white' : colors.text);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  textStyle(isFlash ? BOLD : NORMAL);
  text('Flash-Based', tabStartX + tabW + tabW / 2, tabY + tabH / 2);
  textStyle(NORMAL);
}

function drawFlowchart(steps, currentStep) {
  let flowY = 75;
  let stepW = Math.min(110, (canvasWidth - 40) / steps.length - 10);
  let stepH = 45;
  let totalWidth = steps.length * (stepW + 20) - 20;
  let startX = (canvasWidth - totalWidth) / 2;
  let accentColor = activeTab === 'sram' ? colors.sram : colors.flash;

  for (let i = 0; i < steps.length; i++) {
    let x = startX + i * (stepW + 20);
    let y = flowY;

    // Determine step state
    let isDone = i < currentStep;
    let isActive = i === currentStep;
    let isPending = i > currentStep;

    // Step box with glow on active
    if (isActive) {
      noStroke();
      fill(255, 193, 7, 50);
      rect(x - 3, y - 3, stepW + 6, stepH + 6, 11);
      fill(colors.active);
      stroke('#F57F17');
      strokeWeight(2.5);
    } else if (isDone) {
      fill(accentColor);
      stroke(activeTab === 'sram' ? '#1565C0' : '#2E7D32');
      strokeWeight(1.5);
    } else {
      fill(colors.pending);
      stroke('#CACACA');
      strokeWeight(1);
    }
    rect(x, y, stepW, stepH, 8);

    // Step number
    fill(isActive ? colors.text : (isDone ? 'white' : '#999'));
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(9);
    text('Step ' + (i + 1), x + stepW / 2, y + 13);

    // Step label
    textSize(10);
    fill(isActive ? colors.text : (isDone ? 'white' : '#666'));
    text(steps[i].label, x + stepW / 2, y + 30);

    // Draw arrow to next step
    if (i < steps.length - 1) {
      let arrowStartX = x + stepW + 2;
      let arrowEndX = x + stepW + 18;
      let arrowY = y + stepH / 2;

      stroke(isDone ? accentColor : '#BDBDBD');
      strokeWeight(2);
      line(arrowStartX, arrowY, arrowEndX, arrowY);
      // Arrow head
      fill(isDone ? accentColor : '#BDBDBD');
      noStroke();
      triangle(arrowEndX - 2, arrowY - 4, arrowEndX - 2, arrowY + 4, arrowEndX + 4, arrowY);
    }

    // Checkmark on completed steps
    if (isDone) {
      fill('white');
      noStroke();
      textSize(14);
      textAlign(CENTER, CENTER);
      text('\u2713', x + stepW - 12, y + 12);
    }
  }
}

function drawStepDescription(steps, currentStep) {
  let descY = 135;
  let descH = 50;
  let accentColor = activeTab === 'sram' ? colors.sram : colors.flash;

  // Description box
  fill(247, 249, 252);
  stroke(210, 215, 225);
  strokeWeight(1);
  rect(20, descY, canvasWidth - 40, descH, 8);

  // Accent line
  noStroke();
  fill(accentColor);
  rect(20, descY + 8, 4, descH - 16, 2, 0, 0, 2);

  // Step label tag
  let stepInfo = steps[currentStep];
  let tagText = stepInfo.label;
  fill(accentColor);
  noStroke();
  rect(32, descY + 5, textWidth(tagText) + 16, 15, 4);
  fill(255);
  textAlign(LEFT, CENTER);
  textSize(10);
  textStyle(BOLD);
  text(tagText, 38, descY + 12);
  textStyle(NORMAL);

  // Description text
  fill(colors.text);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(11);
  text(stepInfo.desc, 32, descY + 24, canvasWidth - 64, descH - 28);

  // Step indicator
  fill(150);
  textAlign(RIGHT, TOP);
  textSize(10);
  text('Step ' + (currentStep + 1) + '/' + steps.length, canvasWidth - 30, descY + descH + 5);
}

function drawComparisonTable() {
  let tableY = 210;
  let tableX = 30;
  let colW = (canvasWidth - 60) / 3;
  let rowH = 24;
  let totalH = rowH * (comparisonData.length + 1);

  // Table title
  fill(colors.text);
  noStroke();
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(12);
  text('Comparison', canvasWidth / 2, tableY - 10);
  textStyle(NORMAL);

  // Table background with rounded corners
  fill(247, 249, 252);
  stroke(210, 215, 225);
  strokeWeight(1);
  rect(tableX, tableY, colW * 3, totalH, 6);

  // Header row
  fill('#E8EAF6');
  noStroke();
  rect(tableX, tableY, colW * 3, rowH, 6, 6, 0, 0);

  fill(colors.text);
  noStroke();
  textSize(11);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text('Property', tableX + colW / 2, tableY + rowH / 2);
  fill(colors.sram);
  text('SRAM', tableX + colW * 1.5, tableY + rowH / 2);
  fill(colors.flash);
  text('Flash', tableX + colW * 2.5, tableY + rowH / 2);
  textStyle(NORMAL);

  // Data rows
  for (let i = 0; i < comparisonData.length; i++) {
    let y = tableY + rowH * (i + 1);
    let row = comparisonData[i];
    let isLast = i === comparisonData.length - 1;

    // Row separator
    stroke(225);
    strokeWeight(0.5);
    line(tableX + 6, y, tableX + colW * 3 - 6, y);

    // Highlight active tab column
    noStroke();
    if (activeTab === 'sram') {
      fill(227, 242, 253, 150);
      rect(tableX + colW, y, colW, rowH, 0, 0, isLast ? 0 : 0, isLast ? 0 : 0);
    } else {
      fill(232, 245, 233, 150);
      rect(tableX + colW * 2, y, colW, rowH, 0, 0, isLast ? 6 : 0, isLast ? 0 : 0);
    }

    fill(colors.text);
    noStroke();
    textSize(10);
    textAlign(CENTER, CENTER);
    text(row.property, tableX + colW / 2, y + rowH / 2);
    text(row.sram, tableX + colW * 1.5, y + rowH / 2);
    text(row.flash, tableX + colW * 2.5, y + rowH / 2);
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
  text('Select tab to compare  |  Step through each configuration flow', canvasWidth / 2, drawHeight + 12);

  let btnY = drawHeight + 26;
  let btnW = 80;
  let btnH = 22;

  // Next button
  let nextX = canvasWidth / 2 + 10;
  let steps = activeTab === 'sram' ? sramSteps : flashSteps;
  let currentStep = activeTab === 'sram' ? sramStep : flashStep;
  let canAdvance = currentStep < steps.length - 1;

  fill(canAdvance ? (activeTab === 'sram' ? colors.sram : colors.flash) : '#E0E0E0');
  stroke(canAdvance ? '#333' : '#CACACA');
  strokeWeight(1);
  rect(nextX, btnY, btnW, btnH, 5);
  fill(canAdvance ? 'white' : '#999');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  textStyle(BOLD);
  text('Next Step', nextX + btnW / 2, btnY + btnH / 2);
  textStyle(NORMAL);

  // Reset button
  let resetX = canvasWidth / 2 - btnW - 10;
  fill('#FF5722');
  stroke('#BF360C');
  strokeWeight(1);
  rect(resetX, btnY, btnW, btnH, 5);
  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  textStyle(BOLD);
  text('Reset', resetX + btnW / 2, btnY + btnH / 2);
  textStyle(NORMAL);

  // Cursor management
  let overInteractive = false;
  // Check tabs
  let tabW = 120, tabH = 28, tabY = 35;
  let tabStartX = canvasWidth / 2 - tabW;
  if (mouseY >= tabY && mouseY <= tabY + tabH &&
      mouseX >= tabStartX && mouseX <= tabStartX + tabW * 2) overInteractive = true;
  // Check buttons
  if (mouseY >= btnY && mouseY <= btnY + btnH) {
    if (mouseX >= nextX && mouseX <= nextX + btnW) overInteractive = true;
    if (mouseX >= resetX && mouseX <= resetX + btnW) overInteractive = true;
  }
  cursor(overInteractive ? HAND : ARROW);
}

function mousePressed() {
  // Check tab clicks
  let tabW = 120;
  let tabH = 28;
  let tabY = 35;
  let tabStartX = canvasWidth / 2 - tabW;

  if (mouseY >= tabY && mouseY <= tabY + tabH) {
    if (mouseX >= tabStartX && mouseX <= tabStartX + tabW) {
      activeTab = 'sram';
      return;
    }
    if (mouseX >= tabStartX + tabW && mouseX <= tabStartX + tabW * 2) {
      activeTab = 'flash';
      return;
    }
  }

  // Check control button clicks
  let btnY = drawHeight + 26;
  let btnW = 80;
  let btnH = 22;

  // Next button
  let nextX = canvasWidth / 2 + 10;
  if (mouseX >= nextX && mouseX <= nextX + btnW && mouseY >= btnY && mouseY <= btnY + btnH) {
    let steps = activeTab === 'sram' ? sramSteps : flashSteps;
    if (activeTab === 'sram' && sramStep < steps.length - 1) {
      sramStep++;
    } else if (activeTab === 'flash' && flashStep < steps.length - 1) {
      flashStep++;
    }
    return;
  }

  // Reset button
  let resetX = canvasWidth / 2 - btnW - 10;
  if (mouseX >= resetX && mouseX <= resetX + btnW && mouseY >= btnY && mouseY <= btnY + btnH) {
    if (activeTab === 'sram') {
      sramStep = 0;
    } else {
      flashStep = 0;
    }
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
