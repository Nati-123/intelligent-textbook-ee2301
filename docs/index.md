---
title: Home
description: AI-assisted interactive textbook for EE 2301 - Introduction to Digital System Design
---

<div class="hero" markdown>

<div class="hero-circuit">
  <svg viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg" class="circuit-svg">
    <!-- Circuit traces -->
    <g stroke="rgba(255,255,255,0.15)" stroke-width="1.5" fill="none">
      <path d="M0,40 H120 L140,60 H250"/>
      <path d="M0,100 H80 L100,80 H200 L220,100 H350"/>
      <path d="M0,160 H60 L80,140 H180"/>
      <path d="M450,40 H580 L600,60 H720 L740,40 H800"/>
      <path d="M500,100 H620 L640,120 H800"/>
      <path d="M420,160 H560 L580,140 H700 L720,160 H800"/>
      <path d="M250,60 V100" stroke-dasharray="4,4"/>
      <path d="M580,60 V140" stroke-dasharray="4,4"/>
    </g>
    <!-- AND gate -->
    <g transform="translate(250,45)" fill="none" stroke="rgba(255,235,59,0.6)" stroke-width="2">
      <path d="M0,0 H20 Q45,0 45,25 Q45,50 20,50 H0 Z"/>
      <line x1="-15" y1="12" x2="0" y2="12"/>
      <line x1="-15" y1="38" x2="0" y2="38"/>
      <line x1="45" y1="25" x2="60" y2="25"/>
    </g>
    <!-- OR gate -->
    <g transform="translate(350,75)" fill="none" stroke="rgba(255,235,59,0.6)" stroke-width="2">
      <path d="M0,0 Q10,0 20,0 Q45,0 50,25 Q45,50 20,50 Q10,50 0,50 Q15,25 0,0 Z"/>
      <line x1="-15" y1="12" x2="5" y2="12"/>
      <line x1="-15" y1="38" x2="5" y2="38"/>
      <line x1="50" y1="25" x2="65" y2="25"/>
    </g>
    <!-- NOT gate (triangle + bubble) -->
    <g transform="translate(180,125)" fill="none" stroke="rgba(255,235,59,0.6)" stroke-width="2">
      <polygon points="0,0 35,15 0,30"/>
      <circle cx="40" cy="15" r="5"/>
      <line x1="-15" y1="15" x2="0" y2="15"/>
      <line x1="45" y1="15" x2="60" y2="15"/>
    </g>
    <!-- Flip-flop box -->
    <g transform="translate(420,30)" fill="none" stroke="rgba(100,181,246,0.6)" stroke-width="2">
      <rect x="0" y="0" width="60" height="70" rx="3"/>
      <text x="30" y="22" fill="rgba(100,181,246,0.7)" font-size="10" text-anchor="middle" font-family="monospace">D</text>
      <text x="30" y="42" fill="rgba(100,181,246,0.7)" font-size="10" text-anchor="middle" font-family="monospace">FF</text>
      <text x="30" y="62" fill="rgba(100,181,246,0.7)" font-size="10" text-anchor="middle" font-family="monospace">Q</text>
      <polygon points="0,55 8,60 0,65" fill="rgba(100,181,246,0.4)"/>
      <line x1="-15" y1="20" x2="0" y2="20"/>
      <line x1="60" y1="20" x2="75" y2="20"/>
      <line x1="-15" y1="60" x2="0" y2="60"/>
    </g>
    <!-- Binary stream decorations -->
    <text fill="rgba(255,255,255,0.08)" font-size="14" font-family="monospace">
      <tspan x="50" y="30">1 0 1 1 0 0 1 0</tspan>
      <tspan x="520" y="170">0 1 1 0 1 0 0 1</tspan>
      <tspan x="620" y="30">1 1 0 1 0 1 1 0</tspan>
      <tspan x="100" y="190">0 0 1 0 1 1 0 1</tspan>
    </text>
  </svg>
</div>

# Digital System Design

## An Intelligent Interactive Textbook

**EE 2301 — Introduction to Digital System Design**

<p class="subtitle">University of Minnesota — Twin Cities<br>Department of Electrical & Computer Engineering</p>

<div class="hero-buttons">
  <a href="unit1-number-systems/" class="md-button md-button--primary">Get Started</a>
  <a href="sims/" class="md-button">Explore MicroSims</a>
  <a href="glossary/" class="md-button">View Glossary</a>
</div>

</div>

---

## Welcome

This is an **AI-assisted intelligent interactive textbook** for sophomore and junior-level Electrical and Computer Engineering students. Built using MkDocs Material and Claude Code, it provides modern, accessible learning materials covering the complete fundamentals of digital logic design.

!!! tip "Quick Navigation"
    - **New to digital logic?** Start with [Unit 1 — Number Systems](unit1-number-systems/index.md)
    - **Already familiar with binary?** Jump to [Unit 2 — Boolean Algebra](unit2-boolean-algebra/index.md)
    - **Looking for quick reference?** Check the [Glossary](glossary.md) or [FAQ](faq.md)

---

## Course Units

<div class="unit-section" markdown>

### Part I: Foundations

| Unit | Topic | Key Concepts |
|:----:|-------|--------------|
| 1 | [Number Systems](unit1-number-systems/index.md) | Binary, octal, hexadecimal, two's complement |
| 2 | [Boolean Algebra](unit2-boolean-algebra/index.md) | Logic gates, theorems, De Morgan's laws |
| 3 | [Applications of Boolean Algebra](unit3-applications-boolean-algebra/index.md) | Adders, subtractors, comparators, decoders |

</div>

<div class="unit-section" markdown>

### Part II: Minimization Techniques

| Unit | Topic | Key Concepts |
|:----:|-------|--------------|
| 4 | [Minterm & Maxterm Expansions](unit4-minterm-maxterm-expansions/index.md) | Canonical forms, SOP/POS, cofactors |
| 5 | [Karnaugh Maps](unit5-karnaugh-maps/index.md) | K-map simplification, prime implicants |
| 6 | [Quine-McCluskey Method](unit6-quine-mccluskey/index.md) | Algorithmic minimization, PI charts |

</div>

<div class="unit-section" markdown>

### Part III: Circuit Implementation

| Unit | Topic | Key Concepts |
|:----:|-------|--------------|
| 7 | [Multi-Level Gate Circuits](unit7-multi-level-gates/index.md) | NAND/NOR universality, bubble pushing |
| 8 | [Combinational Logic Modules](unit8-combinational-modules/index.md) | MUX, decoders, encoders, comparators |

</div>

<div class="unit-section" markdown>

### Part IV: Sequential Logic

| Unit | Topic | Key Concepts |
|:----:|-------|--------------|
| 9 | [Sequential Logic Fundamentals](unit9-sequential-fundamentals/index.md) | Latches, flip-flops, timing diagrams |
| 10 | [Sequential Circuit Design](unit10-sequential-design/index.md) | Counters, registers, FSM design |

</div>

<div class="unit-section" markdown>

### Part V: Advanced Topics

| Unit | Topic | Key Concepts |
|:----:|-------|--------------|
| 11 | [Programmable Logic Devices](unit11-programmable-logic/index.md) | ROM, PLA, PAL, CPLD, FPGA, LUTs |
| 12 | [Introduction to VHDL](unit12-vhdl/index.md) | Entities, architectures, behavioral modeling |
| 13 | [System Integration](unit13-system-integration/index.md) | Top-down design, datapath-controller, timing analysis |

</div>

---

## Interactive MicroSims

Explore digital logic concepts through **103 interactive simulations**:

<div class="feature-grid" markdown>

<div class="feature-card" markdown>

### :material-numeric: Number Systems

Base Converter, Binary Arithmetic, Overflow Detection

[:octicons-arrow-right-24: View 7 MicroSims](sims/index.md#unit-1-number-systems)

</div>

<div class="feature-card" markdown>

### :material-gate-and: Boolean Algebra

Logic Gates, Truth Tables, De Morgan's Theorem

[:octicons-arrow-right-24: View 8 MicroSims](sims/index.md#unit-2-boolean-algebra)

</div>

<div class="feature-card" markdown>

### :material-calculator: Combinational Logic

Adders, K-Maps, MUX, Decoders, Encoders

[:octicons-arrow-right-24: View 26 MicroSims](sims/index.md#unit-3-applications-of-boolean-algebra)

</div>

<div class="feature-card" markdown>

### :material-flip-to-back: Sequential Logic

Flip-Flops, Counters, Shift Registers, FSMs

[:octicons-arrow-right-24: View 8 MicroSims](sims/index.md#unit-9-sequential-logic-fundamentals)

</div>

<div class="feature-card" markdown>

### :material-memory: Programmable Logic & VHDL

FPGAs, PLDs, VHDL Modeling, Testbenches

[:octicons-arrow-right-24: View MicroSims](sims/index.md#unit-11-programmable-logic-devices)

</div>

<div class="feature-card" markdown>

### :material-cog-sync: System Integration

Datapath-Controller, Timing Analysis, Digital Lock

[:octicons-arrow-right-24: View MicroSims](sims/index.md#unit-13-system-integration-and-design-projects)

</div>

</div>

[Explore All MicroSims :material-arrow-right:](sims/index.md){ .md-button .md-button--primary }
[View Course Structure Tree :material-file-tree:](sims/course-structure-tree/index.md){ .md-button }

---

## Learning Resources

| Resource | Description |
|----------|-------------|
| :material-book-alphabet: [Glossary](glossary.md) | 225 terms with ISO 11179 compliant definitions |
| :material-frequently-asked-questions: [FAQ](faq.md) | 63 frequently asked questions |
| :material-graph: [Concept List](learning-graph/concept-list.md) | Complete learning graph with dependencies |
| :material-chart-bar: [Book Metrics](learning-graph/book-metrics.md) | Detailed textbook statistics |

---

## Features

!!! abstract "What Makes This Textbook Different"

    - :material-robot: **AI-Assisted Content** — Generated with Claude Code for clarity and consistency
    - :material-stairs: **Scaffolded Learning** — Concepts build on explicit prerequisites
    - :material-play-box: **Interactive Simulations** — 103 p5.js MicroSims you can run in your browser
    - :material-pencil: **Practice Problems** — 200 end-of-unit problems with detailed solutions
    - :material-checkbox-marked: **Self-Assessment** — 108 quiz questions with detailed explanations
    - :material-book-search: **Comprehensive Glossary** — ISO 11179 compliant terminology
    - :material-link-variant: **Curated References** — Wikipedia, textbooks, and online resources

---

## Target Audience

This textbook is designed for:

- Sophomore and junior-level **Electrical Engineering** students
- **Computer Engineering** students
- Students pursuing minors in electronics or embedded systems
- Anyone seeking foundational knowledge in **digital logic design**

!!! info "Prerequisites"
    Basic algebra and introduction to programming (any language)

---

## Built With

<div class="grid cards" markdown>

-   :simple-materialformkdocs: [**MkDocs Material**](https://squidfunk.github.io/mkdocs-material/)

    Documentation framework

-   :material-robot: [**Claude Code**](https://claude.ai/code)

    AI-assisted content generation

-   :simple-p5dotjs: [**p5.js**](https://p5js.org/)

    Interactive simulations

-   :material-math-integral: [**MathJax**](https://www.mathjax.org/)

    Mathematical notation

</div>

---

<div align="center" markdown>

**Senior Design Project**

University of Minnesota — Twin Cities

Department of Electrical & Computer Engineering

*An AI-assisted intelligent textbook demonstrating how AI can augment educational content creation while maintaining pedagogical quality.*

</div>
