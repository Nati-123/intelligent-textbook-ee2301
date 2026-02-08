// Quine-McCluskey Method Walkthrough MicroSim
// Minimize Boolean functions via Quine-McCluskey
// Bloom Level: Apply (L3) - Apply systematic minimization algorithm
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 400;
let drawHeight = 500;
let controlHeight = 90;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let currentStep = 0;
let totalSteps;

const TITLE_BG = '#2196F3';
const STEP_BG = '#E3F2FD';
const HIGHLIGHT = '#FF9800';
const RESULT_BG = '#E8F5E9';
const ESSENTIAL_COLOR = '#E91E63';

// UI elements
let presetSelect;
let goButton;

// Preset definitions
let presets = [
  {
    label: "\u03A3m(1,2,5,6,7)",
    introExpr: "F(A,B,C) = \u03A3m(1,2,5,6,7)",
    resultExpr: "F = B'C + BC' + AC",
    resultEssentials: "Essential PIs: B'C, BC'",
    resultSelected: "Selected for m7: AC",
    resultCount: "All 5 minterms covered \u2713",
    // Binary list data
    minterms: [
      {n: 1, bin: '001'}, {n: 2, bin: '010'},
      {n: 5, bin: '101'}, {n: 6, bin: '110'}, {n: 7, bin: '111'}
    ],
    // Groups data
    groups: [
      {label: 'Group 0 (one 1)', items: ['m1: 001', 'm2: 010']},
      {label: 'Group 1 (two 1s)', items: ['m5: 101', 'm6: 110']},
      {label: 'Group 2 (three 1s)', items: ['m7: 111']}
    ],
    // Combination round 1
    combine1Title: 'Group 0 \u00d7 Group 1 Comparisons',
    combine1: [
      {pair: 'm1,m5: 001,101', result: '-01', term: "B'C", ok: true},
      {pair: 'm1,m6: 001,110', result: 'differ 2 bits', term: '', ok: false},
      {pair: 'm2,m5: 010,101', result: 'differ 3 bits', term: '', ok: false},
      {pair: 'm2,m6: 010,110', result: '-10', term: "BC'", ok: true}
    ],
    // Combination round 2
    combine2Title: 'Group 1 \u00d7 Group 2 Comparisons',
    combine2: [
      {pair: 'm5,m7: 101,111', result: '1-1', term: 'AC', ok: true},
      {pair: 'm6,m7: 110,111', result: '11-', term: 'AB', ok: true}
    ],
    combine2Footer: 'No further combinations possible',
    combine2Footer2: '(all pairs differ in \u2265 2 positions)',
    // Prime implicants table
    piList: [
      {term: "B'C", pattern: '-01', covers: 'm1, m5'},
      {term: "BC'", pattern: '-10', covers: 'm2, m6'},
      {term: 'AC', pattern: '1-1', covers: 'm5, m7'},
      {term: 'AB', pattern: '11-', covers: 'm6, m7'}
    ],
    // PI chart data
    piNames: ["B'C", "BC'", "AC", "AB"],
    piMinterms: [1, 2, 5, 6, 7],
    piCoverage: [
      [true, false, true, false, false],   // B'C covers m1, m5
      [false, true, false, true, false],   // BC' covers m2, m6
      [false, false, true, false, true],   // AC covers m5, m7
      [false, false, false, true, true]    // AB covers m6, m7
    ],
    essentialRows: [0, 1],       // indices of essential PIs
    selectedRow: 2,              // index of selected non-essential PI for coverage
    essentialAnnotations: [
      "\u2605 B'C is essential (only PI covering m1)",
      "\u2605 BC' is essential (only PI covering m2)"
    ],
    coverAnnotation: "\u2713 Select AC to cover remaining m7",
    steps: [
      {
        title: "QM Method: F(A,B,C) = \u03A3m(1,2,5,6,7)",
        desc: "The Quine-McCluskey method is a systematic algorithm for\nminimizing Boolean functions. Let's minimize F step by step.",
        rule: "Quine-McCluskey Algorithm",
        visual: "intro"
      },
      {
        title: "Step 1: List Minterms in Binary",
        desc: "Convert each minterm number to its binary representation.\nWe have 3 variables (A, B, C) so each is 3 bits.",
        rule: "Convert minterms to binary",
        visual: "binary-list"
      },
      {
        title: "Step 2: Group by Number of 1s",
        desc: "Sort minterms into groups based on how many 1s are in\ntheir binary representation.",
        rule: "Group by 1-count for systematic combining",
        visual: "groups"
      },
      {
        title: "Step 3: Combine Adjacent Groups (0\u21921)",
        desc: "Compare each minterm in Group 0 with each in Group 1.\nCombine if they differ in exactly one bit position.",
        rule: "Combine terms differing in exactly 1 bit",
        visual: "combine1"
      },
      {
        title: "Step 4: Combine Adjacent Groups (1\u21922)",
        desc: "Compare each minterm in Group 1 with each in Group 2.\nCombine if they differ in exactly one bit position.",
        rule: "Combine terms differing in exactly 1 bit",
        visual: "combine2"
      },
      {
        title: "Step 5: All Prime Implicants",
        desc: "No further combinations possible (all pairs differ in \u22652\npositions). These are the Prime Implicants (PIs).",
        rule: "PIs = terms that cannot be further combined",
        visual: "prime-implicants"
      },
      {
        title: "Step 6: Prime Implicant Chart",
        desc: "Build a chart showing which minterms each PI covers.\nThis helps identify essential prime implicants.",
        rule: "PI Chart for coverage analysis",
        visual: "pi-chart"
      },
      {
        title: "Step 7: Find Essential Prime Implicants",
        desc: "m1 is only covered by B'C \u2192 B'C is essential.\nm2 is only covered by BC' \u2192 BC' is essential.",
        rule: "Essential PI: only PI covering some minterm",
        visual: "essential"
      },
      {
        title: "Step 8: Cover Remaining Minterms",
        desc: "After selecting B'C and BC': m1,m2,m5,m6 are covered.\nm7 still needs coverage \u2192 select AC (or AB).",
        rule: "Cover all remaining minterms",
        visual: "cover"
      },
      {
        title: "Result: Minimized Expression",
        desc: "F(A,B,C) = B'C + BC' + AC\nThis is the minimum SOP form found by QM method.",
        rule: "Minimum SOP Expression",
        visual: "result"
      }
    ]
  },
  {
    label: "\u03A3m(0,1,2,4)",
    introExpr: "F(A,B,C) = \u03A3m(0,1,2,4)",
    resultExpr: "F = A'B' + A'C' + B'C'",
    resultEssentials: "Essential PIs: A'B', A'C', B'C'",
    resultSelected: "All PIs are essential",
    resultCount: "All 4 minterms covered \u2713",
    minterms: [
      {n: 0, bin: '000'}, {n: 1, bin: '001'},
      {n: 2, bin: '010'}, {n: 4, bin: '100'}
    ],
    groups: [
      {label: 'Group 0 (zero 1s)', items: ['m0: 000']},
      {label: 'Group 1 (one 1)', items: ['m1: 001', 'm2: 010', 'm4: 100']}
    ],
    combine1Title: 'Group 0 \u00d7 Group 1 Comparisons',
    combine1: [
      {pair: 'm0,m1: 000,001', result: '00-', term: "A'B'", ok: true},
      {pair: 'm0,m2: 000,010', result: '0-0', term: "A'C'", ok: true},
      {pair: 'm0,m4: 000,100', result: '-00', term: "B'C'", ok: true}
    ],
    combine2Title: 'Within Group 1 Comparisons',
    combine2: [
      {pair: 'm1,m2: 001,010', result: 'differ 2 bits', term: '', ok: false},
      {pair: 'm1,m4: 001,100', result: 'differ 2 bits', term: '', ok: false},
      {pair: 'm2,m4: 010,100', result: 'differ 2 bits', term: '', ok: false}
    ],
    combine2Footer: 'No further combinations possible',
    combine2Footer2: '(all remaining pairs differ in \u2265 2 positions)',
    piList: [
      {term: "A'B'", pattern: '00-', covers: 'm0, m1'},
      {term: "A'C'", pattern: '0-0', covers: 'm0, m2'},
      {term: "B'C'", pattern: '-00', covers: 'm0, m4'}
    ],
    piNames: ["A'B'", "A'C'", "B'C'"],
    piMinterms: [0, 1, 2, 4],
    piCoverage: [
      [true, true, false, false],    // A'B' covers m0, m1
      [true, false, true, false],    // A'C' covers m0, m2
      [true, false, false, true]     // B'C' covers m0, m4
    ],
    essentialRows: [0, 1, 2],
    selectedRow: -1,
    essentialAnnotations: [
      "\u2605 A'B' is essential (only PI covering m1)",
      "\u2605 A'C' is essential (only PI covering m2)",
      "\u2605 B'C' is essential (only PI covering m4)"
    ],
    coverAnnotation: "\u2713 All minterms covered by essential PIs",
    steps: [
      {
        title: "QM Method: F(A,B,C) = \u03A3m(0,1,2,4)",
        desc: "The Quine-McCluskey method is a systematic algorithm for\nminimizing Boolean functions. Let's minimize F step by step.",
        rule: "Quine-McCluskey Algorithm",
        visual: "intro"
      },
      {
        title: "Step 1: List Minterms in Binary",
        desc: "Convert each minterm number to its binary representation.\nWe have 3 variables (A, B, C) so each is 3 bits.",
        rule: "Convert minterms to binary",
        visual: "binary-list"
      },
      {
        title: "Step 2: Group by Number of 1s",
        desc: "Sort minterms into groups based on how many 1s are in\ntheir binary representation.",
        rule: "Group by 1-count for systematic combining",
        visual: "groups"
      },
      {
        title: "Step 3: Combine Adjacent Groups (0\u21921)",
        desc: "Compare each minterm in Group 0 with each in Group 1.\nCombine if they differ in exactly one bit position.",
        rule: "Combine terms differing in exactly 1 bit",
        visual: "combine1"
      },
      {
        title: "Step 4: Check for Further Combinations",
        desc: "Check if any terms within Group 1 can combine.\nAll pairs differ in 2 bits, so no combinations possible.",
        rule: "No more combinations possible",
        visual: "combine2"
      },
      {
        title: "Step 5: All Prime Implicants",
        desc: "No further combinations possible. These three terms\nare the Prime Implicants (PIs).",
        rule: "PIs = terms that cannot be further combined",
        visual: "prime-implicants"
      },
      {
        title: "Step 6: Prime Implicant Chart",
        desc: "Build a chart showing which minterms each PI covers.\nThis helps identify essential prime implicants.",
        rule: "PI Chart for coverage analysis",
        visual: "pi-chart"
      },
      {
        title: "Step 7: Find Essential Prime Implicants",
        desc: "m1 only covered by A'B', m2 only by A'C', m4 only by B'C'.\nAll three PIs are essential!",
        rule: "Essential PI: only PI covering some minterm",
        visual: "essential"
      },
      {
        title: "Step 8: Cover Remaining Minterms",
        desc: "All three essential PIs together cover every minterm.\nNo additional PIs needed.",
        rule: "All minterms covered by essentials",
        visual: "cover"
      },
      {
        title: "Result: Minimized Expression",
        desc: "F(A,B,C) = A'B' + A'C' + B'C'\nThis is the minimum SOP form found by QM method.",
        rule: "Minimum SOP Expression",
        visual: "result"
      }
    ]
  },
  {
    label: "\u03A3m(2,3,4,5)",
    introExpr: "F(A,B,C) = \u03A3m(2,3,4,5)",
    resultExpr: "F = A'B + AB'",
    resultEssentials: "Essential PIs: A'B, AB'",
    resultSelected: "Both PIs are essential",
    resultCount: "All 4 minterms covered \u2713",
    minterms: [
      {n: 2, bin: '010'}, {n: 3, bin: '011'},
      {n: 4, bin: '100'}, {n: 5, bin: '101'}
    ],
    groups: [
      {label: 'Group 0 (one 1)', items: ['m2: 010', 'm4: 100']},
      {label: 'Group 1 (two 1s)', items: ['m3: 011', 'm5: 101']}
    ],
    combine1Title: 'Group 0 \u00d7 Group 1 Comparisons',
    combine1: [
      {pair: 'm2,m3: 010,011', result: '01-', term: "A'B", ok: true},
      {pair: 'm2,m5: 010,101', result: 'differ 3 bits', term: '', ok: false},
      {pair: 'm4,m3: 100,011', result: 'differ 3 bits', term: '', ok: false},
      {pair: 'm4,m5: 100,101', result: '10-', term: "AB'", ok: true}
    ],
    combine2Title: 'Check for Further Combinations',
    combine2: [
      {pair: '01-,10-: differ 2 bits', result: 'differ 2 bits', term: '', ok: false}
    ],
    combine2Footer: 'No further combinations possible',
    combine2Footer2: '(all pairs differ in \u2265 2 positions)',
    piList: [
      {term: "A'B", pattern: '01-', covers: 'm2, m3'},
      {term: "AB'", pattern: '10-', covers: 'm4, m5'}
    ],
    piNames: ["A'B", "AB'"],
    piMinterms: [2, 3, 4, 5],
    piCoverage: [
      [true, true, false, false],    // A'B covers m2, m3
      [false, false, true, true]     // AB' covers m4, m5
    ],
    essentialRows: [0, 1],
    selectedRow: -1,
    essentialAnnotations: [
      "\u2605 A'B is essential (only PI covering m2, m3)",
      "\u2605 AB' is essential (only PI covering m4, m5)"
    ],
    coverAnnotation: "\u2713 All minterms covered by essential PIs",
    steps: [
      {
        title: "QM Method: F(A,B,C) = \u03A3m(2,3,4,5)",
        desc: "The Quine-McCluskey method is a systematic algorithm for\nminimizing Boolean functions. Let's minimize F step by step.",
        rule: "Quine-McCluskey Algorithm",
        visual: "intro"
      },
      {
        title: "Step 1: List Minterms in Binary",
        desc: "Convert each minterm number to its binary representation.\nWe have 3 variables (A, B, C) so each is 3 bits.",
        rule: "Convert minterms to binary",
        visual: "binary-list"
      },
      {
        title: "Step 2: Group by Number of 1s",
        desc: "Sort minterms into groups based on how many 1s are in\ntheir binary representation.",
        rule: "Group by 1-count for systematic combining",
        visual: "groups"
      },
      {
        title: "Step 3: Combine Adjacent Groups (0\u21921)",
        desc: "Compare each minterm in Group 0 with each in Group 1.\nCombine if they differ in exactly one bit position.",
        rule: "Combine terms differing in exactly 1 bit",
        visual: "combine1"
      },
      {
        title: "Step 4: Check for Further Combinations",
        desc: "Check if the two combined terms (01- and 10-) can combine.\nThey differ in 2 bits, so no further combinations.",
        rule: "No more combinations possible",
        visual: "combine2"
      },
      {
        title: "Step 5: All Prime Implicants",
        desc: "No further combinations possible. These two terms\nare the Prime Implicants (PIs).",
        rule: "PIs = terms that cannot be further combined",
        visual: "prime-implicants"
      },
      {
        title: "Step 6: Prime Implicant Chart",
        desc: "Build a chart showing which minterms each PI covers.\nThis helps identify essential prime implicants.",
        rule: "PI Chart for coverage analysis",
        visual: "pi-chart"
      },
      {
        title: "Step 7: Find Essential Prime Implicants",
        desc: "m2,m3 only covered by A'B; m4,m5 only covered by AB'.\nBoth PIs are essential!",
        rule: "Essential PI: only PI covering some minterm",
        visual: "essential"
      },
      {
        title: "Step 8: Cover Remaining Minterms",
        desc: "Both essential PIs together cover every minterm.\nNo additional PIs needed.",
        rule: "All minterms covered by essentials",
        visual: "cover"
      },
      {
        title: "Result: Minimized Expression",
        desc: "F(A,B,C) = A'B + AB'\nThis is the minimum SOP form found by QM method.",
        rule: "Minimum SOP Expression",
        visual: "result"
      }
    ]
  }
];

let activePreset = presets[0];
let steps = activePreset.steps.slice();

function setup() {
  updateCanvasSize();
  totalSteps = steps.length;
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  // Dropdown for preset selection
  presetSelect = createSelect();
  for (let i = 0; i < presets.length; i++) {
    presetSelect.option(presets[i].label, i);
  }

  // Go button
  goButton = createButton('Go');
  goButton.mousePressed(handleGo);
  goButton.style('background-color', '#388E3C');
  goButton.style('color', 'white');
  goButton.style('border', 'none');
  goButton.style('padding', '4px 16px');
  goButton.style('border-radius', '4px');
  goButton.style('cursor', 'pointer');
  goButton.style('font-weight', 'bold');

  positionUIElements();
  describe('Quine-McCluskey method walkthrough for Boolean minimization', LABEL);
}

function positionUIElements() {
  let mainRect = document.querySelector('main').getBoundingClientRect();
  presetSelect.position(mainRect.left + 80, mainRect.top + drawHeight + 10);
  goButton.position(mainRect.left + 250, mainRect.top + drawHeight + 8);
}

function handleGo() {
  let idx = parseInt(presetSelect.value());
  activePreset = presets[idx];
  steps = activePreset.steps.slice();
  totalSteps = steps.length;
  currentStep = 0;
}

function draw() {
  updateCanvasSize();
  background(255);

  let step = steps[currentStep];
  let margin = 15;
  let w = canvasWidth - 2 * margin;

  // Title bar
  fill(TITLE_BG);
  noStroke();
  rect(margin, margin, w, 40, 5);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(14);
  textStyle(BOLD);
  text(step.title, canvasWidth / 2, margin + 20);

  // Step indicator
  fill(100);
  textSize(12);
  textStyle(NORMAL);
  textAlign(RIGHT, TOP);
  text('Step ' + (currentStep + 1) + ' of ' + totalSteps, canvasWidth - margin - 5, margin + 50);

  // Progress bar
  let progY = margin + 48;
  fill(220);
  rect(margin, progY, w, 6, 3);
  fill(TITLE_BG);
  rect(margin, progY, w * (currentStep + 1) / totalSteps, 6, 3);

  // Rule label
  fill(HIGHLIGHT);
  noStroke();
  let ruleY = margin + 65;
  textSize(11);
  textStyle(BOLD);
  let rw = textWidth(step.rule) + 20;
  rw = max(rw, 100);
  rect(canvasWidth / 2 - rw / 2, ruleY, rw, 24, 12);
  fill(255);
  textAlign(CENTER, CENTER);
  text(step.rule, canvasWidth / 2, ruleY + 12);

  // Visual area
  let visY = ruleY + 40;
  let visH = drawHeight - visY - 65;
  fill(STEP_BG);
  stroke(200);
  strokeWeight(1);
  rect(margin, visY, w, visH, 5);
  noStroke();

  drawVisual(step, margin, visY, w, visH);

  // Description
  let descY = drawHeight - 55;
  fill(60);
  textAlign(LEFT, TOP);
  textSize(12);
  textStyle(NORMAL);
  let lines = step.desc.split('\n');
  for (let i = 0; i < lines.length; i++) {
    text(lines[i], margin + 10, descY + i * 15);
  }

  // Preset label
  fill(60);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(13);
  textStyle(BOLD);
  text('Minterms:', margin, drawHeight + 18);

  drawButtons();
}

function drawVisual(step, mx, vy, w, vh) {
  let cx = canvasWidth / 2;

  if (step.visual === 'intro') {
    fill(60);
    textAlign(CENTER, CENTER);
    textSize(20);
    textStyle(BOLD);
    text(activePreset.introExpr, cx, vy + 40);
    textSize(14);
    textStyle(NORMAL);
    fill(100);
    text('Systematic minimization algorithm', cx, vy + 70);
    text('Works for any number of variables', cx, vy + 90);
    fill(HIGHLIGHT);
    textSize(13);
    text('Click "Next \u2192" to begin', cx, vy + vh - 20);
  }
  else if (step.visual === 'binary-list') {
    drawBinaryList(mx, vy, w, vh);
  }
  else if (step.visual === 'groups') {
    drawGroups(mx, vy, w, vh);
  }
  else if (step.visual === 'combine1') {
    drawCombination(mx, vy, w, vh, activePreset.combine1Title, activePreset.combine1, null, null);
  }
  else if (step.visual === 'combine2') {
    drawCombination(mx, vy, w, vh, activePreset.combine2Title, activePreset.combine2, activePreset.combine2Footer, activePreset.combine2Footer2);
  }
  else if (step.visual === 'prime-implicants') {
    drawPrimeImplicants(mx, vy, w, vh);
  }
  else if (step.visual === 'pi-chart') {
    drawPIChart(mx, vy, w, vh, false, false);
  }
  else if (step.visual === 'essential') {
    drawPIChart(mx, vy, w, vh, true, false);
  }
  else if (step.visual === 'cover') {
    drawPIChart(mx, vy, w, vh, true, true);
  }
  else if (step.visual === 'result') {
    fill(RESULT_BG);
    stroke('#4CAF50'); strokeWeight(2);
    rect(mx + 20, vy + 20, w - 40, vh - 40, 10);
    noStroke();
    fill('#1B5E20');
    textAlign(CENTER, CENTER);
    textSize(22); textStyle(BOLD);
    text(activePreset.resultExpr, cx, vy + 55);
    textSize(14); textStyle(NORMAL);
    fill(100);
    text(activePreset.resultEssentials, cx, vy + 90);
    text(activePreset.resultSelected, cx, vy + 112);
    text(activePreset.resultCount, cx, vy + 145);
  }
}

function drawBinaryList(mx, vy, w, vh) {
  let mintermData = activePreset.minterms;
  // Header
  fill(TITLE_BG);
  rect(mx + 30, vy + 10, w - 60, 25, 3, 3, 0, 0);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(12); textStyle(BOLD);
  text('Minterm', mx + 30 + (w - 60) * 0.25, vy + 22);
  text('A B C', mx + 30 + (w - 60) * 0.6, vy + 22);
  text('# of 1s', mx + 30 + (w - 60) * 0.85, vy + 22);
  // Rows
  for (let i = 0; i < mintermData.length; i++) {
    let y = vy + 35 + i * 28;
    fill(i % 2 === 0 ? 245 : 255);
    stroke(220); strokeWeight(0.5);
    rect(mx + 30, y, w - 60, 28);
    noStroke();
    fill(60); textSize(13); textStyle(NORMAL);
    textAlign(CENTER, CENTER);
    text('m' + mintermData[i].n, mx + 30 + (w - 60) * 0.25, y + 14);
    textStyle(BOLD);
    text(mintermData[i].bin.split('').join('  '), mx + 30 + (w - 60) * 0.6, y + 14);
    let ones = mintermData[i].bin.split('').filter(x => x === '1').length;
    textStyle(NORMAL);
    text(ones, mx + 30 + (w - 60) * 0.85, y + 14);
  }
}

function drawGroups(mx, vy, w, vh) {
  let groupData = activePreset.groups;
  let gx = mx + 30;
  let gy = vy + 15;
  for (let g = 0; g < groupData.length; g++) {
    let gw = w - 60;
    let gh = 20 + groupData[g].items.length * 22;
    fill('#E8EAF6');
    stroke('#5C6BC0'); strokeWeight(1);
    rect(gx, gy, gw, gh, 5);
    noStroke();
    fill('#283593');
    textAlign(LEFT, CENTER);
    textSize(12); textStyle(BOLD);
    text(groupData[g].label, gx + 10, gy + 12);
    textStyle(NORMAL); textSize(13); fill(60);
    for (let i = 0; i < groupData[g].items.length; i++) {
      text(groupData[g].items[i], gx + 25, gy + 32 + i * 22);
    }
    gy += gh + 10;
  }
}

function drawCombination(mx, vy, w, vh, titleText, items, footerText, footerText2) {
  let cx = canvasWidth / 2;
  textAlign(LEFT, TOP);
  textSize(12); textStyle(NORMAL);
  let y = vy + 15;
  fill(TITLE_BG);
  noStroke();
  rect(mx + 20, y, w - 40, 22, 3, 3, 0, 0);
  fill(255); textAlign(CENTER, CENTER);
  textSize(11); textStyle(BOLD);
  text(titleText, cx, y + 11);
  y += 28;
  for (let i = 0; i < items.length; i++) {
    fill(items[i].ok ? '#E8F5E9' : '#FFEBEE');
    stroke(220); strokeWeight(0.5);
    rect(mx + 20, y, w - 40, 26);
    noStroke();
    fill(60); textSize(11); textStyle(NORMAL);
    textAlign(LEFT, CENTER);
    text(items[i].pair, mx + 30, y + 13);
    textAlign(RIGHT, CENTER);
    if (items[i].ok) {
      fill('#1B5E20'); textStyle(BOLD);
      text('\u2192 ' + items[i].result + ' = ' + items[i].term + ' \u2713', mx + w - 30, y + 13);
    } else {
      fill('#C62828');
      text(items[i].result + ' \u2717', mx + w - 30, y + 13);
    }
    y += 26;
  }
  if (footerText) {
    y += 15;
    fill(100);
    textAlign(CENTER, CENTER);
    textSize(12); textStyle(NORMAL);
    text(footerText, cx, y + 10);
    if (footerText2) {
      text(footerText2, cx, y + 28);
    }
  }
}

function drawPrimeImplicants(mx, vy, w, vh) {
  let pis = activePreset.piList;
  fill(TITLE_BG);
  noStroke();
  rect(mx + 20, vy + 10, w - 40, 25, 3, 3, 0, 0);
  fill(255); textAlign(CENTER, CENTER);
  textSize(12); textStyle(BOLD);
  let colW = (w - 40) / 3;
  text('PI', mx + 20 + colW * 0.5, vy + 22);
  text('Pattern', mx + 20 + colW * 1.5, vy + 22);
  text('Covers', mx + 20 + colW * 2.5, vy + 22);
  for (let i = 0; i < pis.length; i++) {
    let y = vy + 35 + i * 30;
    fill(i % 2 === 0 ? 245 : 255);
    stroke(220); strokeWeight(0.5);
    rect(mx + 20, y, w - 40, 30);
    noStroke();
    fill(60); textSize(13); textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text(pis[i].term, mx + 20 + colW * 0.5, y + 15);
    textStyle(NORMAL);
    text(pis[i].pattern, mx + 20 + colW * 1.5, y + 15);
    text(pis[i].covers, mx + 20 + colW * 2.5, y + 15);
  }
}

function drawPIChart(mx, vy, w, vh, showEssential, showCover) {
  let pis = activePreset.piNames;
  let minterms = activePreset.piMinterms;
  let coverage = activePreset.piCoverage;
  let essentialRows = activePreset.essentialRows;
  let selectedRow = activePreset.selectedRow;

  let numCols = minterms.length + 1;
  let tableX = mx + 20;
  let tableW = w - 40;
  let colW = tableW / numCols;
  let rowH = 28;
  let startY = vy + 10;

  // Header
  fill(TITLE_BG);
  noStroke();
  rect(tableX, startY, tableW, rowH, 3, 3, 0, 0);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(11); textStyle(BOLD);
  text('PI', tableX + colW * 0.5, startY + rowH / 2);
  for (let j = 0; j < minterms.length; j++) {
    text('m' + minterms[j], tableX + colW * (j + 1) + colW / 2, startY + rowH / 2);
  }

  for (let i = 0; i < pis.length; i++) {
    let y = startY + rowH * (i + 1);
    let isEssential = essentialRows.indexOf(i) !== -1;
    let isSelected = showCover && i === selectedRow;

    if (showEssential && isEssential) {
      fill('#FCE4EC');
    } else if (isSelected) {
      fill('#E8F5E9');
    } else {
      fill(i % 2 === 0 ? 245 : 255);
    }
    stroke(220); strokeWeight(0.5);
    rect(tableX, y, tableW, rowH);
    noStroke();

    fill(showEssential && isEssential ? ESSENTIAL_COLOR : 60);
    textSize(12);
    textStyle(isEssential && showEssential ? BOLD : NORMAL);
    textAlign(CENTER, CENTER);
    text(pis[i], tableX + colW * 0.5, y + rowH / 2);

    for (let j = 0; j < minterms.length; j++) {
      if (coverage[i][j]) {
        fill(showEssential && isEssential ? ESSENTIAL_COLOR : (isSelected ? '#1B5E20' : 60));
        textSize(14); textStyle(BOLD);
        text('\u00d7', tableX + colW * (j + 1) + colW / 2, y + rowH / 2);
      }
    }
  }

  // Annotations
  if (showEssential) {
    let annY = startY + rowH * (pis.length + 1) + 10;
    fill(ESSENTIAL_COLOR);
    textAlign(LEFT, TOP);
    textSize(11); textStyle(BOLD);
    for (let a = 0; a < activePreset.essentialAnnotations.length; a++) {
      text(activePreset.essentialAnnotations[a], mx + 25, annY + a * 16);
    }
    if (showCover) {
      fill('#1B5E20');
      text(activePreset.coverAnnotation, mx + 25, annY + activePreset.essentialAnnotations.length * 16 + 4);
    }
  }
}

function drawButtons() {
  let btnY = drawHeight + 48;
  let btnW = 90;
  let btnH = 34;
  let gap = 10;
  let totalBtnW = btnW * 3 + gap * 2;
  let startX = (canvasWidth - totalBtnW) / 2;

  let prevEnabled = currentStep > 0;
  fill(prevEnabled ? '#1976D2' : '#BDBDBD');
  noStroke();
  rect(startX, btnY, btnW, btnH, 5);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(14); textStyle(BOLD);
  text('\u2190 Previous', startX + btnW / 2, btnY + btnH / 2);

  fill('#757575');
  rect(startX + btnW + gap, btnY, btnW, btnH, 5);
  fill(255);
  text('Reset', startX + btnW + gap + btnW / 2, btnY + btnH / 2);

  let nextEnabled = currentStep < totalSteps - 1;
  fill(nextEnabled ? '#388E3C' : '#BDBDBD');
  rect(startX + 2 * (btnW + gap), btnY, btnW, btnH, 5);
  fill(255);
  text('Next \u2192', startX + 2 * (btnW + gap) + btnW / 2, btnY + btnH / 2);
}

function mousePressed() {
  let btnY = drawHeight + 48;
  let btnW = 90;
  let btnH = 34;
  let gap = 10;
  let totalBtnW = btnW * 3 + gap * 2;
  let startX = (canvasWidth - totalBtnW) / 2;

  if (mouseY >= btnY && mouseY <= btnY + btnH) {
    if (mouseX >= startX && mouseX <= startX + btnW && currentStep > 0) {
      currentStep--;
    } else if (mouseX >= startX + btnW + gap && mouseX <= startX + 2 * btnW + gap) {
      currentStep = 0;
    } else if (mouseX >= startX + 2 * (btnW + gap) && mouseX <= startX + 2 * (btnW + gap) + btnW && currentStep < totalSteps - 1) {
      currentStep++;
    }
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  positionUIElements();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
