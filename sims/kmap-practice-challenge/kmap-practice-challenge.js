// K-map Practice Challenge MicroSim
// Practice problems for K-map simplification
// Bloom Level: Apply (L3) - Apply K-map techniques
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 440;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let currentChallenge = 0;
let showAnswer = false;
let score = 0;
let attempts = 0;

let challenges = [
  {
    name: 'Challenge 1',
    numVars: 3,
    minterms: [0, 2, 4, 6],
    answer: "C'",
    hint: 'Look for a column pattern'
  },
  {
    name: 'Challenge 2',
    numVars: 3,
    minterms: [1, 3, 5, 7],
    answer: 'C',
    hint: 'All 1s share what in common?'
  },
  {
    name: 'Challenge 3',
    numVars: 3,
    minterms: [3, 5, 6, 7],
    answer: 'AB + AC + BC',
    hint: 'Majority function - 2 or more inputs are 1'
  },
  {
    name: 'Challenge 4',
    numVars: 4,
    minterms: [0, 2, 8, 10],
    answer: "B'D'",
    hint: 'Find the common pattern in corners'
  },
  {
    name: 'Challenge 5',
    numVars: 4,
    minterms: [0, 1, 2, 3, 4, 5, 6, 7],
    answer: "A'",
    hint: 'Half the K-map is filled'
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  describe('K-map practice challenges for testing simplification skills', LABEL);
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
  text('K-map Practice Challenge', canvasWidth / 2, 10);

  // Score
  fill('#666');
  textSize(11);
  textAlign(RIGHT, TOP);
  text('Score: ' + score + '/' + attempts, canvasWidth - 30, 15);

  let challenge = challenges[currentChallenge];

  // Challenge info
  drawChallengeInfo(challenge);

  // Draw K-map
  if (challenge.numVars === 3) {
    draw3VarKmap(challenge);
  } else {
    draw4VarKmap(challenge);
  }

  // Draw answer area
  drawAnswerArea(challenge);

  // Draw controls
  drawControls();
}

function drawChallengeInfo(challenge) {
  let y = 38;

  fill('#e3f2fd');
  stroke('#2196f3');
  strokeWeight(2);
  rect(25, y, canvasWidth - 50, 35, 5);

  fill('#2196f3');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  text(challenge.name + ': F = Σm(' + challenge.minterms.join(', ') + ')', canvasWidth / 2, y + 17);
}

function draw3VarKmap(challenge) {
  let startX = (canvasWidth - 220) / 2;
  let startY = 90;
  let cellW = 50;
  let cellH = 45;
  let grayOrder = [0, 1, 3, 2];

  // Labels
  fill('#2196f3');
  noStroke();
  textAlign(CENTER, BOTTOM);
  textSize(10);
  text('BC', startX + 2 * cellW + 25, startY - 3);

  let colLabels = ['00', '01', '11', '10'];
  for (let c = 0; c < 4; c++) {
    text(colLabels[c], startX + 40 + c * cellW + cellW / 2, startY);
  }

  textAlign(RIGHT, CENTER);
  text('A', startX + 30, startY + cellH);
  fill('#666');
  text('0', startX + 35, startY + cellH / 2);
  text('1', startX + 35, startY + cellH + cellH / 2);

  // Cells
  for (let row = 0; row < 2; row++) {
    for (let col = 0; col < 4; col++) {
      let x = startX + 40 + col * cellW;
      let y = startY + row * cellH;

      let cellIdx = row * 4 + grayOrder[col];
      let isMinterm = challenge.minterms.includes(cellIdx);

      fill(isMinterm ? '#c8e6c9' : 'white');
      stroke('#333');
      strokeWeight(1);
      rect(x, y, cellW, cellH);

      fill(isMinterm ? '#4CAF50' : '#999');
      noStroke();
      textAlign(CENTER, CENTER);
      textSize(18);
      text(isMinterm ? '1' : '0', x + cellW / 2, y + cellH / 2);

      fill('#999');
      textSize(8);
      textAlign(LEFT, TOP);
      text(cellIdx, x + 2, y + 2);
    }
  }
}

function draw4VarKmap(challenge) {
  let startX = (canvasWidth - 200) / 2;
  let startY = 90;
  let cellW = 42;
  let cellH = 38;
  let grayOrder = [0, 1, 3, 2];

  // Labels
  fill('#2196f3');
  noStroke();
  textAlign(CENTER, BOTTOM);
  textSize(9);
  text('CD', startX + 2 * cellW + 20, startY - 3);

  let colLabels = ['00', '01', '11', '10'];
  for (let c = 0; c < 4; c++) {
    text(colLabels[c], startX + 35 + c * cellW + cellW / 2, startY);
  }

  textAlign(RIGHT, CENTER);
  text('AB', startX + 25, startY + 2 * cellH);
  fill('#666');
  for (let r = 0; r < 4; r++) {
    text(colLabels[r], startX + 30, startY + r * cellH + cellH / 2);
  }

  // Cells
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      let x = startX + 35 + col * cellW;
      let y = startY + row * cellH;

      let grayRow = grayOrder[row];
      let grayCol = grayOrder[col];
      let cellIdx = grayRow * 4 + grayCol;
      let isMinterm = challenge.minterms.includes(cellIdx);

      fill(isMinterm ? '#c8e6c9' : 'white');
      stroke('#333');
      strokeWeight(1);
      rect(x, y, cellW, cellH);

      fill(isMinterm ? '#4CAF50' : '#999');
      noStroke();
      textAlign(CENTER, CENTER);
      textSize(14);
      text(isMinterm ? '1' : '0', x + cellW / 2, y + cellH / 2);

      fill('#999');
      textSize(7);
      textAlign(LEFT, TOP);
      text(cellIdx, x + 2, y + 2);
    }
  }
}

function drawAnswerArea(challenge) {
  let y = challenge.numVars === 3 ? 200 : 260;

  fill('#fff3e0');
  stroke('#ff9800');
  strokeWeight(2);
  rect(25, y, canvasWidth - 50, 70, 8);

  fill('#ff9800');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(11);
  text('Hint: ' + challenge.hint, 35, y + 10);

  if (showAnswer) {
    fill('#4CAF50');
    textSize(14);
    textAlign(CENTER, CENTER);
    text('Answer: F = ' + challenge.answer, canvasWidth / 2, y + 45);
  } else {
    fill('#666');
    textSize(12);
    textAlign(CENTER, CENTER);
    text('What is the simplified expression?', canvasWidth / 2, y + 45);
  }

  // Show/Check answer button
  y += 85;
  fill(showAnswer ? '#f44336' : '#4CAF50');
  stroke(showAnswer ? '#d32f2f' : '#388E3C');
  strokeWeight(2);
  rect(canvasWidth / 2 - 70, y, 140, 35, 5);

  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(13);
  text(showAnswer ? 'Hide Answer' : 'Show Answer', canvasWidth / 2, y + 17);

  // Explanation when answer shown
  if (showAnswer) {
    y += 50;
    fill('#f5f5f5');
    stroke('#ccc');
    strokeWeight(1);
    rect(25, y, canvasWidth - 50, 55, 5);

    fill('#333');
    noStroke();
    textAlign(LEFT, TOP);
    textSize(10);
    text('Explanation:', 35, y + 8);

    fill('#666');
    textSize(9);
    text(getExplanation(challenge), 35, y + 25, canvasWidth - 70);
  }
}

function getExplanation(challenge) {
  if (challenge.answer === "C'") {
    return "All minterms (0,2,4,6) have C=0. Group all 4 as one quad.";
  } else if (challenge.answer === 'C') {
    return "All minterms (1,3,5,7) have C=1. Group all 4 as one quad.";
  } else if (challenge.answer === 'AB + AC + BC') {
    return "Three pairs: m6-m7 (AB), m5-m7 (AC), m3-m7 (BC). Each covers 2 minterms.";
  } else if (challenge.answer === "B'D'") {
    return "Corner cells form a quad. Wrap-around grouping: B'D' is common.";
  } else if (challenge.answer === "A'") {
    return "All 8 cells in top half have A=0. One large group covers all.";
  }
  return "Group adjacent 1s to find the minimal expression.";
}

function drawControls() {
  let btnY = drawHeight + 15;

  // Previous
  let prevX = 40;
  fill(currentChallenge > 0 ? '#ff9800' : '#ccc');
  stroke(currentChallenge > 0 ? '#f57c00' : '#aaa');
  strokeWeight(1);
  rect(prevX, btnY, 80, 28, 3);

  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  text('← Previous', prevX + 40, btnY + 14);

  // Challenge indicator
  fill('#666');
  textSize(10);
  text((currentChallenge + 1) + ' / ' + challenges.length, canvasWidth / 2, btnY + 14);

  // Next
  let nextX = canvasWidth - 120;
  fill(currentChallenge < challenges.length - 1 ? '#4CAF50' : '#ccc');
  stroke(currentChallenge < challenges.length - 1 ? '#388E3C' : '#aaa');
  strokeWeight(1);
  rect(nextX, btnY, 80, 28, 3);

  fill('white');
  noStroke();
  text('Next →', nextX + 40, btnY + 14);
}

function mousePressed() {
  let challenge = challenges[currentChallenge];
  let answerBtnY = (challenge.numVars === 3 ? 200 : 260) + 85;

  // Show answer button
  if (mouseX >= canvasWidth / 2 - 70 && mouseX <= canvasWidth / 2 + 70 &&
      mouseY >= answerBtnY && mouseY <= answerBtnY + 35) {
    if (!showAnswer) {
      attempts++;
    }
    showAnswer = !showAnswer;
  }

  // Navigation
  let btnY = drawHeight + 15;

  if (mouseX >= 40 && mouseX <= 120 && mouseY >= btnY && mouseY <= btnY + 28) {
    if (currentChallenge > 0) {
      currentChallenge--;
      showAnswer = false;
    }
  }

  if (mouseX >= canvasWidth - 120 && mouseX <= canvasWidth - 40 && mouseY >= btnY && mouseY <= btnY + 28) {
    if (currentChallenge < challenges.length - 1) {
      currentChallenge++;
      showAnswer = false;
    }
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
