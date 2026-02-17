---
title: AND Gate with Truth Table
description: Interactive AND gate simulation with clickable inputs, gate symbol, and highlighted truth table for digital logic education
image: /sims/and-gate-truth-table/and-gate-truth-table.png
quality_score: 85
---

# AND Gate with Truth Table

<iframe src="main.html" height="480px" width="100%" scrolling="no"></iframe>

[Run the AND Gate with Truth Table Fullscreen](./main.html){ .md-button .md-button--primary }

## Description

This MicroSim provides an interactive demonstration of the AND logic gate, one of the fundamental building blocks of digital circuits. The simulation displays the standard AND gate symbol with two inputs (A and B) and one output (Y), along with a complete truth table.

Students can toggle each input between 0 and 1 using clickable buttons. The simulation updates in real time, highlighting the current input combination in the truth table and displaying the live Boolean expression evaluation (A &middot; B = Y). A key insight box reinforces the core AND gate rule: the output is HIGH (1) only when ALL inputs are HIGH.

Key features include:

- AND gate symbol with input and output wires
- Two clickable toggle buttons for inputs A and B
- Truth table with the current input combination highlighted
- Live Boolean expression evaluation
- Key insight box reinforcing the AND gate behavior

## Iframe Embedding

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://Nati-123.github.io/intelligent-textbook-ee2301/sims/and-gate-truth-table/main.html" height="480px" scrolling="no" width="100%"></iframe>
```

## How to Use

1. Observe the AND gate symbol and the truth table displayed on screen.
2. Click the toggle button next to input **A** to switch it between 0 and 1.
3. Click the toggle button next to input **B** to switch it between 0 and 1.
4. Watch the gate output update in real time based on the current inputs.
5. Notice the highlighted row in the truth table corresponding to the current input combination.
6. Read the Boolean expression display to see the evaluated result (A &middot; B = Y).
7. Experiment with all four input combinations to verify the AND gate rule.

## Learning Objectives

**Bloom Level**: Understand (L2)

After using this MicroSim, students will be able to:

- Explain the behavior of an AND gate and state its truth table from memory
- Predict the AND gate output for any combination of two binary inputs
- Identify the AND gate symbol and its Boolean expression (Y = A &middot; B)

## Lesson Plan

### Before the Simulation (5 minutes)
- Introduce the concept of logic gates as fundamental building blocks of digital circuits
- Show the AND gate schematic symbol on the board
- Ask students to predict: "What does AND mean in everyday language? How might that translate to a logic gate?"

### During the Simulation (15 minutes)
1. Start with both inputs at 0 and observe that the output is 0
2. Toggle A to 1 while B remains 0 -- output stays 0 (both inputs must be 1)
3. Toggle B to 1 -- output becomes 1 (both inputs are now HIGH)
4. Toggle A back to 0 -- output returns to 0
5. Have students step through all four combinations and record the truth table on paper
6. Discuss: AND requires ALL inputs HIGH for a HIGH output

### After the Simulation (5 minutes)
- Ask students to write the Boolean expression for a 3-input AND gate
- Discuss real-world analogy: a series circuit where both switches must be closed for current to flow
- Preview the OR gate and compare how it differs from AND

## References

- [AND gate - Wikipedia](https://en.wikipedia.org/wiki/AND_gate)
- Unit 3: Logic Gates and Boolean Algebra
