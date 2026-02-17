---
title: XNOR Gate with Truth Table
description: Interactive XNOR gate simulation with clickable inputs, gate symbol, and highlighted truth table for digital logic education
image: /sims/xnor-gate-truth-table/xnor-gate-truth-table.png
quality_score: 85
---

# XNOR Gate with Truth Table

<iframe src="main.html" height="480px" width="100%" scrolling="no"></iframe>

[Run the XNOR Gate with Truth Table Fullscreen](./main.html){ .md-button .md-button--primary }

## Description

This MicroSim provides an interactive demonstration of the XNOR (exclusive NOR) logic gate, which produces the complement of the XOR function. The XNOR gate outputs HIGH when both inputs are the same (both 0 or both 1), making it function as an equality detector. The simulation displays the standard XNOR gate symbol (XOR shape with an inversion bubble) with two inputs (A and B) and one output (Y), along with a complete truth table.

Students can toggle each input between 0 and 1 using clickable buttons. The simulation updates in real time, highlighting the current input combination in the truth table and displaying the live Boolean expression evaluation ((A XOR B)' = Y). A key insight box reinforces the XNOR gate's role as an equality detector in digital circuits.

Key features include:

- XNOR gate symbol (XOR shape with inversion bubble) with input and output wires
- Two clickable toggle buttons for inputs A and B
- Truth table with the current input combination highlighted
- Live Boolean expression evaluation
- Key insight box explaining XNOR as an equality detector

## Iframe Embedding

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://Nati-123.github.io/intelligent-textbook-ee2301/sims/xnor-gate-truth-table/main.html" height="480px" scrolling="no" width="100%"></iframe>
```

## How to Use

1. Observe the XNOR gate symbol (note the inversion bubble and the double curved input lines) and the truth table displayed on screen.
2. Click the toggle button next to input **A** to switch it between 0 and 1.
3. Click the toggle button next to input **B** to switch it between 0 and 1.
4. Watch the gate output update in real time based on the current inputs.
5. Notice the highlighted row in the truth table corresponding to the current input combination.
6. Read the Boolean expression display to see the evaluated result.
7. Verify the equality detection property: output is 1 when A equals B, and 0 when they differ.

## Learning Objectives

**Bloom Level**: Understand (L2)

After using this MicroSim, students will be able to:

- Explain the behavior of an XNOR gate and state its truth table from memory
- Predict the XNOR gate output for any combination of two binary inputs
- Recognize the XNOR gate as an equality detector and describe its use in comparator circuits

## Lesson Plan

### Before the Simulation (5 minutes)
- Review the XOR gate truth table and its "difference detector" property
- Introduce the concept of complementing the XOR output to get XNOR
- Ask students to predict: "If XOR detects when inputs are different, what does XNOR detect?"

### During the Simulation (15 minutes)
1. Start with both inputs at 0 and observe that the output is 1 (inputs are the same)
2. Toggle A to 1 -- output becomes 0 (inputs differ)
3. Toggle B to 1 -- output returns to 1 (inputs are the same again)
4. Toggle A to 0 -- output becomes 0 (inputs differ again)
5. Compare with XOR: XNOR output is always the opposite of XOR
6. Discuss: XNOR outputs 1 when inputs are equal -- it is an equality detector

### After the Simulation (5 minutes)
- Show how multi-bit comparators are built by combining XNOR gates with AND gates
- Discuss the relationship: XNOR = NOT(XOR) = (A AND B) OR (NOT A AND NOT B)
- Ask students: "How would you build a 4-bit equality comparator using XNOR gates?"

## References

- [XNOR gate - Wikipedia](https://en.wikipedia.org/wiki/XNOR_gate)
- [Digital comparator - Wikipedia](https://en.wikipedia.org/wiki/Digital_comparator)
- Unit 3: Logic Gates and Boolean Algebra
