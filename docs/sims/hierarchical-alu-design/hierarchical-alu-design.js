// Hierarchical ALU Design — Interactive Tree Component
// Pure DOM, no external libraries. All styles scoped under .hierarchy

(function () {
  "use strict";

  var tree = {
    label: "8-bit Calculator", desc: "Top-level system integrating all subsystems", type: "system",
    children: [
      {
        label: "Datapath", desc: "Stores, transports, and transforms data", type: "datapath",
        children: [
          {
            label: "8-bit ALU", desc: "Performs arithmetic and logic operations", type: "alu",
            children: [
              {
                label: "8-bit Adder", desc: "Ripple-carry adder from 8 full adders", type: "adder",
                children: [
                  {
                    label: "Full Adder \u00d78", desc: "8 cascaded full adders with carry chain", type: "leaf",
                    children: [
                      { label: "Half Adder \u00d72", desc: "Basic building block: XOR + AND gates", type: "gate" }
                    ]
                  }
                ]
              },
              { label: "8-bit Subtractor", desc: "Uses adder + 2\u2019s complement", type: "adder" },
              { label: "8-bit AND", desc: "Bitwise AND operation", type: "leaf" },
              { label: "8-bit OR", desc: "Bitwise OR operation", type: "leaf" },
              { label: "Result MUX 4:1", desc: "Selects ALU output based on opcode", type: "leaf" }
            ]
          },
          { label: "Register File (4\u00d78 bits)", desc: "4 general-purpose 8-bit registers", type: "register" },
          { label: "Status Register (Z,C,N,V)", desc: "Zero, Carry, Negative, Overflow flags", type: "register" }
        ]
      },
      {
        label: "Control Unit (FSM)", desc: "Generates control signals for the datapath", type: "control",
        children: [
          { label: "Instruction Decoder", desc: "Decodes opcode into control signals", type: "control" },
          { label: "Sequence Controller", desc: "FSM that sequences micro-operations", type: "control" }
        ]
      },
      {
        label: "I/O Interface", desc: "Handles external communication", type: "io",
        children: [
          { label: "Input Register", desc: "Latches external input data", type: "io" },
          { label: "Output + Display Driver", desc: "Drives output display from result register", type: "io" }
        ]
      }
    ]
  };

  // ---------- inject scoped styles ----------
  var css = [
    ".hierarchy { font-family: 'Segoe UI', system-ui, Arial, sans-serif; max-width: 700px; margin: 0 auto; user-select: none; }",

    // reset lists
    ".hierarchy ul { list-style: none; margin: 0; padding-left: 22px; }",
    ".hierarchy > ul { padding-left: 0; }",

    // row
    ".hierarchy__row { display: flex; align-items: center; gap: 8px; padding: 6px 10px; border-radius: 8px; cursor: pointer; transition: background .2s, box-shadow .2s; position: relative; }",
    ".hierarchy__row:hover { background: rgba(52,152,219,.08); box-shadow: inset 3px 0 0 0 rgba(52,152,219,.45); }",

    // arrow
    ".hierarchy__arrow { display: inline-flex; align-items: center; justify-content: center; width: 18px; height: 18px; font-size: 12px; transition: transform .3s cubic-bezier(.4,0,.2,1); color: #7f8c8d; flex-shrink: 0; }",
    ".hierarchy__arrow--expanded { transform: rotate(90deg); }",
    ".hierarchy__arrow--hidden { visibility: hidden; }",

    // badge (colored chip)
    ".hierarchy__badge { display: inline-block; padding: 3px 10px; border-radius: 5px; font-size: 13px; font-weight: 600; color: #fff; white-space: nowrap; letter-spacing: .2px; }",

    // description
    ".hierarchy__desc { font-size: 12px; color: #7f8c8d; font-style: italic; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }",

    // collapsible children wrapper — animate via grid trick
    ".hierarchy__children { display: grid; grid-template-rows: 1fr; transition: grid-template-rows .35s cubic-bezier(.4,0,.2,1), opacity .3s; opacity: 1; }",
    ".hierarchy__children--collapsed { grid-template-rows: 0fr; opacity: 0; pointer-events: none; }",
    ".hierarchy__children > div { overflow: hidden; }",

    // vertical guide lines
    ".hierarchy li { position: relative; }",
    ".hierarchy li::before { content: ''; position: absolute; left: -11px; top: 0; bottom: 0; width: 1px; background: #dce1e3; }",
    ".hierarchy > ul > li::before { display: none; }",

    // connector tick
    ".hierarchy li::after { content: ''; position: absolute; left: -11px; top: 19px; width: 11px; height: 1px; background: #dce1e3; }",
    ".hierarchy > ul > li::after { display: none; }",

    // type colors
    ".hierarchy__badge--system    { background: #2980b9; }",
    ".hierarchy__badge--datapath  { background: #27ae60; }",
    ".hierarchy__badge--control   { background: #c0392b; }",
    ".hierarchy__badge--io        { background: #8e44ad; }",
    ".hierarchy__badge--alu       { background: #2c3e50; }",
    ".hierarchy__badge--adder     { background: #16a085; }",
    ".hierarchy__badge--leaf      { background: #f39c12; }",
    ".hierarchy__badge--register  { background: #34495e; }",
    ".hierarchy__badge--gate      { background: #e67e22; }",

    // level label
    ".hierarchy__level { font-size: 10px; color: #b0b8bc; font-weight: 600; margin-right: 2px; flex-shrink: 0; }",

    // responsive: hide desc on narrow screens
    "@media (max-width: 520px) { .hierarchy__desc { display: none; } .hierarchy__badge { font-size: 11px; padding: 2px 7px; } }"
  ].join("\n");

  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  // ---------- build DOM ----------
  var levelNames = ["L0 System", "L1 Subsystem", "L2 Component", "L3 Sub-comp", "L4 Primitive", "L5 Gate"];

  function buildNode(data, depth) {
    var li = document.createElement("li");
    var hasKids = data.children && data.children.length > 0;

    // row
    var row = document.createElement("div");
    row.className = "hierarchy__row";

    // level chip
    var lvl = document.createElement("span");
    lvl.className = "hierarchy__level";
    lvl.textContent = (levelNames[depth] || "L" + depth);
    row.appendChild(lvl);

    // arrow
    var arrow = document.createElement("span");
    arrow.className = "hierarchy__arrow" + (hasKids ? " hierarchy__arrow--expanded" : " hierarchy__arrow--hidden");
    arrow.textContent = "\u25b6"; // ▶
    row.appendChild(arrow);

    // badge
    var badge = document.createElement("span");
    badge.className = "hierarchy__badge hierarchy__badge--" + data.type;
    badge.textContent = data.label;
    row.appendChild(badge);

    // desc
    var desc = document.createElement("span");
    desc.className = "hierarchy__desc";
    desc.textContent = "\u2014 " + data.desc;
    row.appendChild(desc);

    li.appendChild(row);

    // children
    if (hasKids) {
      var wrapper = document.createElement("div");
      wrapper.className = "hierarchy__children";
      var inner = document.createElement("div");
      var ul = document.createElement("ul");
      for (var i = 0; i < data.children.length; i++) {
        ul.appendChild(buildNode(data.children[i], depth + 1));
      }
      inner.appendChild(ul);
      wrapper.appendChild(inner);
      li.appendChild(wrapper);

      // click to toggle
      row.addEventListener("click", (function (w, a) {
        return function () {
          var collapsed = w.classList.toggle("hierarchy__children--collapsed");
          if (collapsed) {
            a.classList.remove("hierarchy__arrow--expanded");
          } else {
            a.classList.add("hierarchy__arrow--expanded");
          }
        };
      })(wrapper, arrow));
    }

    return li;
  }

  // ---------- mount ----------
  function mount() {
    var root = document.querySelector(".hierarchy");
    if (!root) {
      root = document.createElement("div");
      root.className = "hierarchy";
      document.querySelector("main").appendChild(root);
    }
    var ul = document.createElement("ul");
    ul.appendChild(buildNode(tree, 0));
    root.appendChild(ul);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
