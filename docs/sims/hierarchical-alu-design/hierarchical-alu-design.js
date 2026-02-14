// Hierarchical ALU Design — Interactive Tree with Details Panel
// No external libraries. All CSS scoped under #alu-hierarchy.
// Supports multiple instances per page.

(function () {
  "use strict";

  // ── Tree data ──────────────────────────────────────────────
  var tree = {
    label: "8-bit Calculator", type: "system",
    desc: "Top-level system integrating all subsystems into one functional unit.",
    points: [
      "Combines datapath, control, and I/O into a single chip",
      "Each subsystem is designed and tested independently",
      "Top-level wiring is purely structural (port maps)"
    ],
    inputs: "8-bit operands, opcode, clock, reset",
    outputs: "8-bit result, status flags, display output",
    example: "ADD R1, R2 \u2192 Control sequences: fetch \u2192 decode \u2192 execute \u2192 writeback",
    children: [
      {
        label: "Datapath", type: "datapath",
        desc: "The hardware that stores, transports, and transforms data. All computation flows through here.",
        points: [
          "Contains ALU, registers, and status flags",
          "Controlled entirely by signals from the Control Unit",
          "Designed using combinational + sequential building blocks"
        ],
        inputs: "Control signals, external data",
        outputs: "Computation results, status flags",
        example: "To compute A+B: mux selects adder, register file supplies A and B, result written back",
        children: [
          {
            label: "8-bit ALU", type: "alu",
            desc: "Performs all arithmetic and logic operations selected by a 2-bit opcode.",
            points: [
              "Supports ADD, SUB, AND, OR (extensible)",
              "Opcode selects result via a 4:1 multiplexer",
              "Generates status flags: Zero, Carry, Negative, Overflow"
            ],
            inputs: "A[7:0], B[7:0], OpSelect[1:0]",
            outputs: "Result[7:0], Z, C, N, V",
            example: "OpSelect=00 \u2192 Add, 01 \u2192 Sub, 10 \u2192 AND, 11 \u2192 OR",
            children: [
              {
                label: "8-bit Adder", type: "adder",
                desc: "Ripple-carry adder built from 8 cascaded full adders.",
                points: [
                  "Carry propagates from bit 0 to bit 7 (ripple)",
                  "Simple but slow \u2014 delay grows linearly with width",
                  "Can be upgraded to carry-lookahead for speed"
                ],
                inputs: "A[7:0], B[7:0], Cin",
                outputs: "Sum[7:0], Cout",
                example: "01001011 + 00110101 = 10000000 with Cout=0",
                children: [
                  {
                    label: "Full Adder \u00d78", type: "leaf",
                    desc: "Each full adder computes one bit-position sum with carry-in and carry-out.",
                    points: [
                      "Sum = A \u2295 B \u2295 Cin",
                      "Cout = AB + Cin(A \u2295 B)",
                      "Built from two half adders + OR gate"
                    ],
                    inputs: "A, B, Cin (1 bit each)",
                    outputs: "Sum, Cout",
                    example: "A=1, B=1, Cin=0 \u2192 Sum=0, Cout=1",
                    children: [
                      {
                        label: "Half Adder \u00d72", type: "gate",
                        desc: "The simplest adder: adds two bits with no carry input.",
                        points: [
                          "Sum = A \u2295 B  (XOR gate)",
                          "Carry = A \u00b7 B  (AND gate)",
                          "Two gates total \u2014 the atomic building block"
                        ],
                        inputs: "A, B (1 bit each)",
                        outputs: "Sum, Carry",
                        example: "A=1, B=1 \u2192 Sum=0, Carry=1"
                      }
                    ]
                  }
                ]
              },
              {
                label: "8-bit Subtractor", type: "adder",
                desc: "Reuses the adder by complementing B and setting Cin=1 (two\u2019s complement).",
                points: [
                  "B is inverted through XOR gates controlled by mode bit",
                  "Cin = 1 completes the two\u2019s complement",
                  "A \u2212 B = A + NOT(B) + 1"
                ],
                inputs: "A[7:0], B[7:0], Mode=1",
                outputs: "Difference[7:0], Borrow",
                example: "5 \u2212 3: 00000101 + 11111101 = 00000010"
              },
              {
                label: "8-bit AND", type: "leaf",
                desc: "Bitwise AND \u2014 each output bit is the AND of corresponding input bits.",
                points: [
                  "Used for bit masking and clearing bits",
                  "Purely combinational, no carry chain",
                  "Result[i] = A[i] \u00b7 B[i]"
                ],
                inputs: "A[7:0], B[7:0]",
                outputs: "Result[7:0]",
                example: "10110011 AND 11001100 = 10000000"
              },
              {
                label: "8-bit OR", type: "leaf",
                desc: "Bitwise OR \u2014 each output bit is the OR of corresponding input bits.",
                points: [
                  "Used for setting bits and combining flags",
                  "Purely combinational, no carry chain",
                  "Result[i] = A[i] + B[i]"
                ],
                inputs: "A[7:0], B[7:0]",
                outputs: "Result[7:0]",
                example: "10110011 OR 11001100 = 11111111"
              },
              {
                label: "Result MUX 4:1", type: "leaf",
                desc: "Selects one of four ALU operation results based on the 2-bit opcode.",
                points: [
                  "4 inputs: Adder, Subtractor, AND, OR outputs",
                  "OpSelect[1:0] chooses which reaches the output",
                  "8 bits wide \u2014 actually eight 4:1 muxes in parallel"
                ],
                inputs: "Add[7:0], Sub[7:0], AND[7:0], OR[7:0], Sel[1:0]",
                outputs: "Result[7:0]",
                example: "Sel=10 \u2192 Result = AND output"
              }
            ]
          },
          {
            label: "Register File (4\u00d78)", type: "register",
            desc: "Four 8-bit general-purpose registers for storing operands and results.",
            points: [
              "Two read ports (A, B) and one write port",
              "Address lines select which register to read/write",
              "Synchronous write on rising clock edge"
            ],
            inputs: "WriteData[7:0], WriteAddr[1:0], ReadAddrA[1:0], ReadAddrB[1:0], WE, CLK",
            outputs: "ReadDataA[7:0], ReadDataB[7:0]",
            example: "Write 42 to R2, then read R2 on port A \u2192 outputs 42"
          },
          {
            label: "Status Register", type: "register",
            desc: "Stores the four condition flags produced by the ALU after each operation.",
            points: [
              "Z (Zero): result is all zeros",
              "C (Carry): unsigned overflow from MSB",
              "N (Negative): MSB of result (sign bit)",
              "V (Overflow): signed overflow detected"
            ],
            inputs: "Z_in, C_in, N_in, V_in, CLK, Update_EN",
            outputs: "Z, C, N, V",
            example: "After 127+1=\u2212128: Z=0, C=0, N=1, V=1"
          }
        ]
      },
      {
        label: "Control Unit (FSM)", type: "control",
        desc: "A finite state machine that orchestrates the datapath by generating timed control signals.",
        points: [
          "Decodes instructions into micro-operations",
          "Sequences through fetch \u2192 decode \u2192 execute \u2192 writeback",
          "Designed as a standard Moore or Mealy FSM"
        ],
        inputs: "Opcode[3:0], status flags, CLK, Reset",
        outputs: "RegWrite, ALUOp[1:0], MuxSel, etc.",
        example: "State S0: fetch instruction; S1: decode opcode; S2: execute ALU op; S3: write result",
        children: [
          {
            label: "Instruction Decoder", type: "control",
            desc: "Combinational logic that maps the opcode field to specific control signal values.",
            points: [
              "Pure combinational \u2014 no state",
              "Translates opcode bits into ALUOp, RegSel, etc.",
              "Can be implemented as a lookup ROM or logic equations"
            ],
            inputs: "Opcode[3:0]",
            outputs: "ALUOp[1:0], RegWrite, MemRead, etc.",
            example: "Opcode 0010 (ADD) \u2192 ALUOp=00, RegWrite=1"
          },
          {
            label: "Sequence Controller", type: "control",
            desc: "The FSM that steps through execution phases and generates timing for each micro-operation.",
            points: [
              "Implemented as a state register + next-state logic",
              "Typically 4\u20138 states for a simple processor",
              "Outputs depend on current state (Moore) or state+input (Mealy)"
            ],
            inputs: "CLK, Reset, Decoder outputs, Status flags",
            outputs: "Phase signals, register enables, MUX selects",
            example: "4-state Moore FSM: FETCH \u2192 DECODE \u2192 EXECUTE \u2192 WRITEBACK"
          }
        ]
      },
      {
        label: "I/O Interface", type: "io",
        desc: "Handles all communication between the calculator and the external world.",
        points: [
          "Buffers input data until the system is ready",
          "Latches output and drives a display",
          "Isolates internal bus from external signals"
        ],
        inputs: "External_Data[7:0], Load, CLK",
        outputs: "Display_Segments, Output_Data[7:0]",
        example: "User enters 42 on switches \u2192 Input Register latches on Load pulse",
        children: [
          {
            label: "Input Register", type: "io",
            desc: "An 8-bit register that latches external switch/button data on a load signal.",
            points: [
              "Synchronizes external asynchronous input to the system clock",
              "Load enable prevents data from changing mid-computation",
              "Directly feeds one operand port of the datapath"
            ],
            inputs: "External_Data[7:0], Load, CLK",
            outputs: "Latched_Data[7:0]",
            example: "Switches = 10101010, press Load \u2192 register captures 0xAA"
          },
          {
            label: "Output + Display", type: "io",
            desc: "Captures the ALU result and converts it to seven-segment display format.",
            points: [
              "Output register holds result until next computation",
              "BCD or binary-to-7seg decoder drives the display",
              "Active-low or active-high depending on display type"
            ],
            inputs: "Result[7:0], Store, CLK",
            outputs: "Seg_A\u2013G, Digit_Select",
            example: "Result = 42 \u2192 display shows '42' on two 7-segment digits"
          }
        ]
      }
    ]
  };

  // ── Scoped CSS ─────────────────────────────────────────────
  var PREFIX = "#alu-hierarchy";
  var css = '\
/* layout: tree + panel side by side */\n\
' + PREFIX + ' { font-family: "Segoe UI", system-ui, Arial, sans-serif; display: flex; gap: 20px; min-height: 360px; }\n\
' + PREFIX + ' .alu-h__tree { flex: 1 1 55%; min-width: 0; overflow-x: auto; }\n\
' + PREFIX + ' .alu-h__panel { flex: 0 0 280px; max-width: 320px; background: #f4f6f8; border: 1px solid #e0e4e8; border-radius: 10px; padding: 18px 16px; align-self: flex-start; position: sticky; top: 12px; transition: opacity 150ms; }\n\
' + PREFIX + ' .alu-h__panel--empty { opacity: .5; }\n\
' + PREFIX + ' .alu-h__panel-title { margin: 0 0 6px; font-size: 16px; font-weight: 700; color: #2c3e50; }\n\
' + PREFIX + ' .alu-h__panel-type { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; color: #fff; margin-bottom: 8px; }\n\
' + PREFIX + ' .alu-h__panel-desc { font-size: 13px; color: #555; margin: 0 0 10px; line-height: 1.45; }\n\
' + PREFIX + ' .alu-h__panel-section { margin: 0 0 10px; }\n\
' + PREFIX + ' .alu-h__panel-section h4 { margin: 0 0 4px; font-size: 12px; text-transform: uppercase; letter-spacing: .6px; color: #8e99a4; }\n\
' + PREFIX + ' .alu-h__panel-section ul { margin: 0; padding-left: 16px; font-size: 12px; color: #444; line-height: 1.5; }\n\
' + PREFIX + ' .alu-h__panel-section p { margin: 0; font-size: 12px; color: #444; line-height: 1.5; }\n\
' + PREFIX + ' .alu-h__panel-section code { background: #e8ecef; padding: 1px 5px; border-radius: 3px; font-size: 11px; }\n\
\n\
/* tree list reset */\n\
' + PREFIX + ' .alu-h__tree ul { list-style: none; margin: 0; padding-left: 24px; }\n\
' + PREFIX + ' .alu-h__tree > ul { padding-left: 0; }\n\
\n\
/* guide lines */\n\
' + PREFIX + ' .alu-h__tree li { position: relative; }\n\
' + PREFIX + ' .alu-h__tree li::before { content: ""; position: absolute; left: -12px; top: 0; bottom: 0; width: 2px; background: #e0e4e8; transition: background 150ms; }\n\
' + PREFIX + ' .alu-h__tree > ul > li::before { display: none; }\n\
' + PREFIX + ' .alu-h__tree li::after  { content: ""; position: absolute; left: -12px; top: 20px; width: 12px; height: 2px; background: #e0e4e8; transition: background 150ms; }\n\
' + PREFIX + ' .alu-h__tree > ul > li::after { display: none; }\n\
\n\
/* highlighted path guide lines */\n\
' + PREFIX + ' .alu-h__tree li.active-path::before,\n\
' + PREFIX + ' .alu-h__tree li.active-path::after { background: #3498db; }\n\
\n\
/* row */\n\
' + PREFIX + ' .alu-h__row { display: flex; align-items: center; gap: 7px; padding: 5px 8px; border-radius: 7px; cursor: pointer; transition: background 150ms, box-shadow 150ms; position: relative; }\n\
' + PREFIX + ' .alu-h__row:hover { background: rgba(52,152,219,.07); }\n\
\n\
/* selected row */\n\
' + PREFIX + ' .alu-h__row.active-node { background: rgba(52,152,219,.1); box-shadow: 0 0 0 2px #3498db, 0 0 8px rgba(52,152,219,.25); border-radius: 7px; }\n\
\n\
/* ancestor-on-path row */\n\
' + PREFIX + ' .alu-h__row.active-path { background: rgba(52,152,219,.04); box-shadow: inset 3px 0 0 #3498db; }\n\
\n\
/* arrow */\n\
' + PREFIX + ' .alu-h__arrow { display: inline-flex; align-items: center; justify-content: center; width: 18px; height: 18px; font-size: 11px; transition: transform 150ms ease; color: #95a5a6; flex-shrink: 0; }\n\
' + PREFIX + ' .alu-h__arrow--exp { transform: rotate(90deg); }\n\
' + PREFIX + ' .alu-h__arrow--none { visibility: hidden; }\n\
\n\
/* badge */\n\
' + PREFIX + ' .alu-h__badge { display: inline-block; padding: 3px 9px; border-radius: 5px; font-size: 12px; font-weight: 600; color: #fff; white-space: nowrap; letter-spacing: .2px; transition: box-shadow 150ms; }\n\
' + PREFIX + ' .alu-h__row:hover .alu-h__badge,\n\
' + PREFIX + ' .alu-h__row.active-node .alu-h__badge { box-shadow: 0 1px 4px rgba(0,0,0,.18); }\n\
\n\
/* level label */\n\
' + PREFIX + ' .alu-h__lvl { font-size: 9px; color: #b8c2cc; font-weight: 600; flex-shrink: 0; width: 66px; text-align: right; }\n\
\n\
/* inline desc (desktop only) */\n\
' + PREFIX + ' .alu-h__hint { font-size: 11px; color: #95a5a6; font-style: italic; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }\n\
\n\
/* collapse animation */\n\
' + PREFIX + ' .alu-h__kids { display: grid; grid-template-rows: 1fr; transition: grid-template-rows 150ms ease, opacity 150ms; opacity: 1; }\n\
' + PREFIX + ' .alu-h__kids--shut { grid-template-rows: 0fr; opacity: 0; pointer-events: none; }\n\
' + PREFIX + ' .alu-h__kids > div { overflow: hidden; }\n\
\n\
/* mobile tooltip */\n\
' + PREFIX + ' .alu-h__tip { display: none; position: absolute; left: 50%; bottom: calc(100% + 6px); transform: translateX(-50%); background: #2c3e50; color: #fff; font-size: 11px; padding: 5px 10px; border-radius: 6px; white-space: nowrap; z-index: 10; pointer-events: none; }\n\
' + PREFIX + ' .alu-h__tip::after { content: ""; position: absolute; top: 100%; left: 50%; margin-left: -4px; border: 4px solid transparent; border-top-color: #2c3e50; }\n\
' + PREFIX + ' .alu-h__row.alu-h--tipped .alu-h__tip { display: block; }\n\
\n\
/* type colours */\n\
' + PREFIX + ' .alu-h__badge--system   { background: #2980b9; }\n\
' + PREFIX + ' .alu-h__badge--datapath { background: #27ae60; }\n\
' + PREFIX + ' .alu-h__badge--control  { background: #c0392b; }\n\
' + PREFIX + ' .alu-h__badge--io       { background: #8e44ad; }\n\
' + PREFIX + ' .alu-h__badge--alu      { background: #2c3e50; }\n\
' + PREFIX + ' .alu-h__badge--adder    { background: #16a085; }\n\
' + PREFIX + ' .alu-h__badge--leaf     { background: #f39c12; }\n\
' + PREFIX + ' .alu-h__badge--register { background: #34495e; }\n\
' + PREFIX + ' .alu-h__badge--gate     { background: #e67e22; }\n\
\n\
/* responsive: stack on narrow */\n\
@media (max-width: 680px) {\n\
  ' + PREFIX + ' { flex-direction: column; }\n\
  ' + PREFIX + ' .alu-h__panel { flex: none; max-width: 100%; position: static; }\n\
  ' + PREFIX + ' .alu-h__hint { display: none; }\n\
  ' + PREFIX + ' .alu-h__lvl { width: auto; text-align: left; }\n\
}\n\
';

  // Inject styles once globally (idempotent)
  var STYLE_ID = "alu-hierarchy-styles";
  if (!document.getElementById(STYLE_ID)) {
    var s = document.createElement("style");
    s.id = STYLE_ID;
    s.textContent = css;
    document.head.appendChild(s);
  }

  // ── Colour map for panel badge ─────────────────────────────
  var TYPE_BG = {
    system: "#2980b9", datapath: "#27ae60", control: "#c0392b", io: "#8e44ad",
    alu: "#2c3e50", adder: "#16a085", leaf: "#f39c12", register: "#34495e", gate: "#e67e22"
  };
  var LEVEL_NAMES = ["L0 \u2014 System", "L1 \u2014 Subsystem", "L2 \u2014 Component", "L3 \u2014 Sub-component", "L4 \u2014 Primitive", "L5 \u2014 Gate"];

  // ── Per-instance factory ───────────────────────────────────
  function initInstance(root) {
    var selectedLi = null;  // currently selected <li>
    var tippedRow = null;   // mobile tooltip row
    var isTouchDevice = false;

    root.addEventListener("touchstart", function () { isTouchDevice = true; }, { once: true, passive: true });

    // -- Panel element --
    var panel = document.createElement("div");
    panel.className = "alu-h__panel alu-h__panel--empty";
    panel.innerHTML = '<p style="font-size:13px;color:#8e99a4;text-align:center;margin:40px 0;">Click a module<br>to see details</p>';

    // -- Tree container --
    var treeDiv = document.createElement("div");
    treeDiv.className = "alu-h__tree";

    // -- Build nodes recursively --
    function buildNode(data, depth, parentLi) {
      var li = document.createElement("li");
      li._nodeData = data;
      li._parentNodeLi = parentLi;
      var hasKids = data.children && data.children.length > 0;

      // row
      var row = document.createElement("div");
      row.className = "alu-h__row";

      // level
      var lvl = document.createElement("span");
      lvl.className = "alu-h__lvl";
      lvl.textContent = LEVEL_NAMES[depth] || ("L" + depth);
      row.appendChild(lvl);

      // arrow
      var arrow = document.createElement("span");
      arrow.className = "alu-h__arrow" + (hasKids ? " alu-h__arrow--exp" : " alu-h__arrow--none");
      arrow.textContent = "\u25b6";
      row.appendChild(arrow);

      // badge
      var badge = document.createElement("span");
      badge.className = "alu-h__badge alu-h__badge--" + data.type;
      badge.textContent = data.label;
      row.appendChild(badge);

      // inline desc
      var hint = document.createElement("span");
      hint.className = "alu-h__hint";
      hint.textContent = "\u2014 " + data.desc.split(".")[0];
      row.appendChild(hint);

      // mobile tooltip
      var tip = document.createElement("span");
      tip.className = "alu-h__tip";
      tip.textContent = data.desc.split(".")[0];
      row.appendChild(tip);

      li.appendChild(row);

      // children
      var wrapper = null;
      if (hasKids) {
        wrapper = document.createElement("div");
        wrapper.className = "alu-h__kids";
        var inner = document.createElement("div");
        var ul = document.createElement("ul");
        for (var i = 0; i < data.children.length; i++) {
          ul.appendChild(buildNode(data.children[i], depth + 1, li));
        }
        inner.appendChild(ul);
        wrapper.appendChild(inner);
        li.appendChild(wrapper);
      }

      // click handler
      row.addEventListener("click", function (e) {
        e.stopPropagation();

        // mobile tooltip
        if (isTouchDevice && tippedRow && tippedRow !== row) {
          tippedRow.classList.remove("alu-h--tipped");
        }
        if (isTouchDevice) {
          row.classList.toggle("alu-h--tipped");
          tippedRow = row.classList.contains("alu-h--tipped") ? row : null;
        }

        // expand / collapse
        if (hasKids) {
          var shut = wrapper.classList.toggle("alu-h__kids--shut");
          if (shut) arrow.classList.remove("alu-h__arrow--exp");
          else arrow.classList.add("alu-h__arrow--exp");
        }

        // select
        selectNode(li);
      });

      return li;
    }

    // -- Selection + path highlighting --
    function selectNode(li) {
      // clear old selection + path
      var oldSel = treeDiv.querySelectorAll(".active-node, .active-path");
      for (var i = 0; i < oldSel.length; i++) {
        oldSel[i].classList.remove("active-node", "active-path");
      }

      selectedLi = li;
      var row = li.querySelector(":scope > .alu-h__row");
      row.classList.add("active-node");

      // walk up to root and highlight ancestors + guide-line path
      var cur = li._parentNodeLi;
      while (cur) {
        cur.classList.add("active-path");
        var aRow = cur.querySelector(":scope > .alu-h__row");
        if (aRow) aRow.classList.add("active-path");
        cur = cur._parentNodeLi;
      }
      // the selected li itself gets path class for its own guide lines
      li.classList.add("active-path");

      // update panel
      renderPanel(li._nodeData);
    }

    // -- Details panel rendering --
    function renderPanel(d) {
      panel.classList.remove("alu-h__panel--empty");
      var h = '';
      h += '<div class="alu-h__panel-type" style="background:' + (TYPE_BG[d.type] || "#777") + '">' + d.type + '</div>';
      h += '<h3 class="alu-h__panel-title">' + esc(d.label) + '</h3>';
      h += '<p class="alu-h__panel-desc">' + esc(d.desc) + '</p>';

      // key points
      if (d.points && d.points.length) {
        h += '<div class="alu-h__panel-section"><h4>Key Points</h4><ul>';
        for (var i = 0; i < d.points.length; i++) h += '<li>' + esc(d.points[i]) + '</li>';
        h += '</ul></div>';
      }

      // inputs / outputs
      if (d.inputs) {
        h += '<div class="alu-h__panel-section"><h4>Inputs</h4><p><code>' + esc(d.inputs) + '</code></p></div>';
      }
      if (d.outputs) {
        h += '<div class="alu-h__panel-section"><h4>Outputs</h4><p><code>' + esc(d.outputs) + '</code></p></div>';
      }

      // example
      if (d.example) {
        h += '<div class="alu-h__panel-section"><h4>Example</h4><p>' + esc(d.example) + '</p></div>';
      }

      // anchor link
      var anchor = d.label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");
      h += '<div class="alu-h__panel-section"><h4>Link</h4><p><a href="#' + anchor + '" style="color:#2980b9;font-size:12px">#' + anchor + '</a></p></div>';

      panel.innerHTML = h;
    }

    function esc(s) {
      var el = document.createElement("span");
      el.textContent = s;
      return el.innerHTML;
    }

    // -- Assemble --
    var ul = document.createElement("ul");
    ul.appendChild(buildNode(tree, 0, null));
    treeDiv.appendChild(ul);

    root.appendChild(treeDiv);
    root.appendChild(panel);

    // dismiss mobile tooltip on outside tap
    document.addEventListener("click", function (e) {
      if (tippedRow && !root.contains(e.target)) {
        tippedRow.classList.remove("alu-h--tipped");
        tippedRow = null;
      }
    });
  }

  // ── Mount all #alu-hierarchy containers on the page ────────
  function mount() {
    var roots = document.querySelectorAll("#alu-hierarchy");
    for (var i = 0; i < roots.length; i++) {
      if (!roots[i].dataset.init) {
        roots[i].dataset.init = "1";
        initInstance(roots[i]);
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
