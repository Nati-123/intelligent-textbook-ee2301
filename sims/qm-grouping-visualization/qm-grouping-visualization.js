// QM Grouping Visualization MicroSim
// Classifies minterms into groups based on number of 1s in binary representation
// Bloom Level: Understand (L2) - Classify, organize
// MicroSim template version 2026.02

// Canvas dimensions
let containerWidth;
let canvasWidth = 400;
let drawHeight = 450;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

// Margins
let margin = 25;
let sliderLeftMargin = 160;
let defaultTextSize = 16;

// UI Elements
let mintermInput;
let numVarsSelect;
let generateButton;
let resetButton;
let showBinaryCheckbox;

// Data structures
let minterms = [];
let numVars = 4;
let groups = {};
let maxGroups = 5;

// Animation state
let animationPhase = 0; // 0=idle, 1=showing binary, 2=grouping
let animationProgress = 0;
let mintermPositions = [];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  textSize(defaultTextSize);

  // Create input field for minterms
  mintermInput = createInput('0,1,2,5,6,7,8,9,10,14');
  mintermInput.size(180);
  mintermInput.attribute('placeholder', 'e.g., 0,1,2,5,6,7');

  // Create dropdown for number of variables
  numVarsSelect = createSelect();
  numVarsSelect.option('3 variables', 3);
  numVarsSelect.option('4 variables', 4);
  numVarsSelect.option('5 variables', 5);
  numVarsSelect.option('6 variables', 6);
  numVarsSelect.selected('4 variables');
  numVarsSelect.changed(updateNumVars);

  // Create Generate button
  generateButton = createButton('Generate Groups');
  generateButton.mousePressed(generateGroups);

  // Create Reset button
  resetButton = createButton('Reset');
  resetButton.mousePressed(resetSimulation);

  // Create checkbox
  showBinaryCheckbox = createCheckbox('Show binary', true);

  positionUIElements();

  describe('Interactive visualization showing how minterms are grouped by number of 1s for Quine-McCluskey method', LABEL);
}

function positionUIElements() {
  let mainRect = document.querySelector('main').getBoundingClientRect();
  mintermInput.position(mainRect.left + 120, mainRect.top + drawHeight + 10);
  numVarsSelect.position(mainRect.left + 120, mainRect.top + drawHeight + 45);
  generateButton.position(mainRect.left + 320, mainRect.top + drawHeight + 10);
  resetButton.position(mainRect.left + 320, mainRect.top + drawHeight + 45);
  showBinaryCheckbox.position(mainRect.left + 420, mainRect.top + drawHeight + 45);
}

function draw() {
  updateCanvasSize();

  // Draw background
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
  textSize(24);
  text('QM Minterm Grouping Visualization', canvasWidth / 2, 10);

  // Draw content based on state
  if (Object.keys(groups).length > 0) {
    drawGroupedMinterms();
  } else {
    drawInstructions();
  }

  // Draw control labels
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Minterms:', 10, drawHeight + 20);
  text('Variables:', 10, drawHeight + 55);
}

function drawInstructions() {
  fill('#666');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(16);
  text('Enter minterms separated by commas', canvasWidth / 2, drawHeight / 2 - 30);
  text('Select number of variables', canvasWidth / 2, drawHeight / 2);
  text('Click "Generate Groups" to visualize', canvasWidth / 2, drawHeight / 2 + 30);
}

function drawGroupedMinterms() {
  let showBinary = showBinaryCheckbox.checked();
  let groupKeys = Object.keys(groups).sort((a, b) => parseInt(a) - parseInt(b));
  let numGroups = groupKeys.length;

  if (numGroups === 0) return;

  // Calculate layout
  let boxWidth = Math.min(120, (canvasWidth - 40) / numGroups - 10);
  let startX = (canvasWidth - (numGroups * (boxWidth + 10))) / 2;
  let headerY = 50;
  let boxStartY = 90;

  // Draw group boxes
  for (let i = 0; i < groupKeys.length; i++) {
    let groupNum = groupKeys[i];
    let groupMinterms = groups[groupNum];
    let x = startX + i * (boxWidth + 10);

    // Group header
    fill(getGroupColor(parseInt(groupNum)));
    noStroke();
    rect(x, headerY, boxWidth, 30, 5, 5, 0, 0);

    fill('white');
    textAlign(CENTER, CENTER);
    textSize(14);
    text('Group ' + groupNum, x + boxWidth / 2, headerY + 15);
    text('(' + groupNum + ' ones)', x + boxWidth / 2, headerY + 15);

    // Group box
    fill('white');
    stroke(getGroupColor(parseInt(groupNum)));
    strokeWeight(2);
    let boxHeight = Math.max(80, groupMinterms.length * 35 + 20);
    rect(x, headerY + 30, boxWidth, boxHeight, 0, 0, 5, 5);

    // Draw minterms in group
    fill('black');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(14);

    for (let j = 0; j < groupMinterms.length; j++) {
      let mt = groupMinterms[j];
      let mtY = headerY + 50 + j * 35;

      // Minterm value
      fill('black');
      textSize(16);
      text('m' + mt.value, x + boxWidth / 2 - 25, mtY);

      // Binary representation
      if (showBinary) {
        fill('#0066cc');
        textSize(12);
        text(mt.binary, x + boxWidth / 2 + 20, mtY);
      }
    }
  }

  // Draw legend
  drawLegend(headerY + 250);

  // Draw summary
  drawSummary();
}

function drawLegend(startY) {
  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(14);
  text('Color Legend:', margin, startY);

  let legendX = margin;
  let legendY = startY + 25;

  for (let i = 0; i <= numVars; i++) {
    fill(getGroupColor(i));
    noStroke();
    rect(legendX, legendY, 20, 20, 3);

    fill('black');
    textAlign(LEFT, CENTER);
    text(i + ' ones', legendX + 25, legendY + 10);

    legendX += 80;
    if (legendX > canvasWidth - 100) {
      legendX = margin;
      legendY += 30;
    }
  }
}

function drawSummary() {
  let y = drawHeight - 60;

  fill(240);
  stroke('silver');
  strokeWeight(1);
  rect(margin, y, canvasWidth - 2 * margin, 50, 5);

  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(14);

  let groupKeys = Object.keys(groups).sort((a, b) => parseInt(a) - parseInt(b));
  let summaryText = 'Groups: ' + groupKeys.length + ' | Minterms: ' + minterms.length;
  summaryText += ' | Variables: ' + numVars;
  text(summaryText, margin + 15, y + 15);

  textSize(12);
  fill('#666');
  text('Adjacent groups (differ by 1 in group number) will be compared for combinations', margin + 15, y + 35);
}

function getGroupColor(groupNum) {
  const colors = [
    '#4ECDC4', // 0 ones - teal
    '#95E1A3', // 1 one - light green
    '#FFE66D', // 2 ones - yellow
    '#FFA07A', // 3 ones - light salmon
    '#FF6B6B', // 4 ones - coral red
    '#C9A0DC', // 5 ones - light purple
    '#87CEEB'  // 6 ones - sky blue
  ];
  return colors[groupNum % colors.length];
}

function updateNumVars() {
  numVars = parseInt(numVarsSelect.value());
  resetSimulation();
}

function generateGroups() {
  // Parse minterms
  let input = mintermInput.value().trim();
  if (!input) {
    alert('Please enter minterms');
    return;
  }

  minterms = [];
  let parts = input.split(',');
  let maxMinterm = Math.pow(2, numVars) - 1;

  for (let p of parts) {
    let val = parseInt(p.trim());
    if (!isNaN(val) && val >= 0 && val <= maxMinterm) {
      // Check for duplicates
      if (!minterms.some(m => m.value === val)) {
        let binary = val.toString(2).padStart(numVars, '0');
        let ones = (binary.match(/1/g) || []).length;
        minterms.push({
          value: val,
          binary: binary,
          ones: ones
        });
      }
    }
  }

  if (minterms.length === 0) {
    alert('No valid minterms entered. Max value for ' + numVars + ' variables is ' + maxMinterm);
    return;
  }

  // Sort minterms by value
  minterms.sort((a, b) => a.value - b.value);

  // Group by number of ones
  groups = {};
  for (let mt of minterms) {
    if (!groups[mt.ones]) {
      groups[mt.ones] = [];
    }
    groups[mt.ones].push(mt);
  }
}

function resetSimulation() {
  minterms = [];
  groups = {};
  mintermInput.value('0,1,2,5,6,7,8,9,10,14');
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  mintermInput.size(Math.min(180, canvasWidth - 250));
  positionUIElements();
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
