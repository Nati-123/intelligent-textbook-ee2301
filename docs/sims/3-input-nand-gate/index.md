---
title: 3-Input NAND Gate
description: Interactive 3-input NAND gate with clickable inputs and 8-row truth table highlighting
image: /sims/3-input-nand-gate/3-input-nand-gate.png
quality_score: 85
---

# 3-Input NAND Gate

<iframe src="main.html" height="480px" width="100%" scrolling="no"></iframe>

[Run the 3-Input NAND Gate Fullscreen](./main.html){ .md-button .md-button--primary }

## Description

This MicroSim provides an interactive demonstration of a 3-input NAND gate. The simulation displays the standard NAND gate symbol (AND shape with an inversion bubble at the output), three clickable input toggles, and a complete eight-row truth table.

The 3-input NAND gate outputs 0 only when all three inputs are 1. For every other input combination, the output is 1. This is the complement of the 3-input AND gate. As you toggle inputs, the truth table highlights the current row in real time.

Key features include:

- Standard NAND gate symbol with inversion bubble and three input wires
- Three clickable toggle buttons for inputs A, B, and C
- Eight-row truth table with real-time row highlighting
- Live output display showing the Boolean expression NOT(A AND B AND C) = Y

## Iframe Embedding

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://Nati-123.github.io/intelligent-textbook-ee2301/sims/3-input-nand-gate/main.html" height="480px" scrolling="no" width="100%"></iframe>
```

## How to Use

1. Click the toggle button next to input **A** to switch it between 0 and 1
2. Click the toggle button next to input **B** to switch it between 0 and 1
3. Click the toggle button next to input **C** to switch it between 0 and 1
4. Observe the gate output update in real time
5. Watch the truth table highlight the row matching the current input combination
6. Verify that the output is 0 only when all three inputs are 1

## Learning Objectives

**Bloom Level**: Understand (L2)

After using this MicroSim, students will be able to:

- Extend the 2-input NAND gate concept to three or more inputs
- Predict the output of a 3-input NAND gate for any input combination
- Explain the relationship between NAND and AND gates (NAND = NOT AND)
- Recognize that NAND is a universal gate capable of implementing any Boolean function

## Lesson Plan

### Before the Simulation (5 minutes)
- Review the 2-input NAND gate and its truth table
- Remind students that NAND is the complement of AND
- Introduce NAND as a universal gate and discuss its importance in CMOS design

### During the Simulation (15 minutes)
1. Start with all inputs at 0 and verify the output is 1
2. Toggle inputs systematically to explore all eight combinations
3. Find the single combination that produces output 0 (A=1, B=1, C=1)
4. Compare the NAND truth table with the AND truth table row by row
5. Count how many rows produce 1 versus 0 (seven vs. one)
6. Discuss why NAND outputs are the exact complement of AND outputs

### After the Simulation (5 minutes)
- Discuss why NAND gates are preferred in CMOS technology
- Show how any gate can be built from NAND gates alone
- Connect to De Morgan's theorem: NOT(A AND B AND C) = NOT A OR NOT B OR NOT C

## References

- [NAND Gate - Wikipedia](https://en.wikipedia.org/wiki/NAND_gate)
- [NAND Logic (Universal Gate) - Wikipedia](https://en.wikipedia.org/wiki/NAND_logic)
- Unit 3: Logic Gates and Boolean Algebra
