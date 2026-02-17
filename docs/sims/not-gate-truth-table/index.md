---
title: NOT Gate with Truth Table
description: Interactive NOT gate (inverter) simulation with clickable input, gate symbol, and highlighted truth table for digital logic education
image: /sims/not-gate-truth-table/not-gate-truth-table.png
quality_score: 85
---

# NOT Gate with Truth Table

<iframe src="main.html" height="480px" width="100%" scrolling="no"></iframe>

[Run the NOT Gate with Truth Table Fullscreen](./main.html){ .md-button .md-button--primary }

## Description

This MicroSim provides an interactive demonstration of the NOT gate (also called an inverter), the simplest logic gate with only one input. The simulation displays the standard NOT gate symbol (a triangle with an inversion bubble at the output) with one input (A) and one output (Y), along with a two-row truth table.

Students can toggle the input between 0 and 1 using a clickable button. The simulation updates in real time, highlighting the current row in the truth table and displaying the live Boolean expression evaluation (A' = Y). A key insight box reinforces the inversion concept and the significance of the bubble notation used in gate symbols.

Key features include:

- NOT gate symbol (triangle with inversion bubble) with input and output wires
- Single clickable toggle button for input A
- Two-row truth table with the current input highlighted
- Live Boolean expression evaluation
- Key insight box reinforcing inversion and bubble notation

## Iframe Embedding

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://Nati-123.github.io/intelligent-textbook-ee2301/sims/not-gate-truth-table/main.html" height="480px" scrolling="no" width="100%"></iframe>
```

## How to Use

1. Observe the NOT gate symbol (note the inversion bubble at the output) and the truth table displayed on screen.
2. Click the toggle button next to input **A** to switch it between 0 and 1.
3. Watch the gate output update in real time -- the output is always the opposite of the input.
4. Notice the highlighted row in the truth table corresponding to the current input.
5. Read the Boolean expression display to see the evaluated result (A' = Y).
6. Toggle back and forth several times to reinforce the concept that NOT always flips the value.

## Learning Objectives

**Bloom Level**: Understand (L2)

After using this MicroSim, students will be able to:

- Explain the behavior of a NOT gate and state its truth table from memory
- Predict the NOT gate output for any single binary input
- Identify the inversion bubble notation used in NOT, NAND, NOR, and XNOR gate symbols

## Lesson Plan

### Before the Simulation (5 minutes)
- Introduce the NOT gate as the simplest logic gate with only one input
- Show the gate symbol and explain the bubble notation for inversion
- Discuss multiple notations for NOT: A', ~A, and the overbar

### During the Simulation (15 minutes)
1. Start with input at 0 and observe that the output is 1 (inverted)
2. Toggle A to 1 -- output becomes 0 (inverted)
3. Toggle back and forth to reinforce: NOT always flips the value
4. Point out the bubble symbol at the output indicating inversion
5. Have students write the truth table on paper from memory
6. Discuss: NOT is the simplest gate with only one input and one output

### After the Simulation (5 minutes)
- Show how the bubble notation appears on other gates (NAND, NOR, XNOR)
- Discuss De Morgan's theorem and the role of inversion in Boolean algebra
- Ask students: "How many NOT gates would you need to get back to the original value?" (Answer: two -- double inversion)

## References

- [Inverter (logic gate) - Wikipedia](https://en.wikipedia.org/wiki/Inverter_(logic_gate))
- Unit 3: Logic Gates and Boolean Algebra
