---
title: OR Gate with Truth Table
description: Interactive OR gate simulation with clickable inputs, gate symbol, and highlighted truth table for digital logic education
image: /sims/or-gate-truth-table/or-gate-truth-table.png
quality_score: 85
---

# OR Gate with Truth Table

<iframe src="main.html" height="480px" width="100%" scrolling="no"></iframe>

## Description

This MicroSim provides an interactive demonstration of the OR logic gate, one of the fundamental building blocks of digital circuits. The simulation displays the standard OR gate symbol (curved-left, pointed-right shape) with two inputs (A and B) and one output (Y), along with a complete truth table.

Students can toggle each input between 0 and 1 using clickable buttons. The simulation updates in real time, highlighting the current input combination in the truth table and displaying the live Boolean expression evaluation (A + B = Y). A key insight box reinforces the core OR gate rule: the output is HIGH (1) when ANY input is HIGH.

Key features include:

- OR gate symbol with input and output wires
- Two clickable toggle buttons for inputs A and B
- Truth table with the current input combination highlighted
- Live Boolean expression evaluation
- Key insight box reinforcing the OR gate behavior

## How to Use

1. Observe the OR gate symbol and the truth table displayed on screen.
2. Click the toggle button next to input **A** to switch it between 0 and 1.
3. Click the toggle button next to input **B** to switch it between 0 and 1.
4. Watch the gate output update in real time based on the current inputs.
5. Notice the highlighted row in the truth table corresponding to the current input combination.
6. Read the Boolean expression display to see the evaluated result (A + B = Y).
7. Experiment with all four input combinations to verify the OR gate rule.

## Learning Objectives

**Bloom Level**: Understand (L2)

After using this MicroSim, students will be able to:

- Explain the behavior of an OR gate and state its truth table from memory
- Predict the OR gate output for any combination of two binary inputs
- Identify the OR gate symbol and its Boolean expression (Y = A + B)

## Lesson Plan

### Before the Simulation (5 minutes)
- Review the AND gate and contrast it with OR: AND requires ALL inputs HIGH, OR requires ANY input HIGH
- Show the OR gate schematic symbol on the board
- Ask students to predict: "How does the OR gate differ from AND in its truth table?"

### During the Simulation (15 minutes)
1. Start with both inputs at 0 and observe that the output is 0
2. Toggle A to 1 -- output becomes 1 (any input HIGH means output HIGH)
3. Toggle B to 1 -- output remains 1 (both inputs HIGH still gives HIGH)
4. Toggle A back to 0 -- output stays 1 (B is still 1)
5. Have students step through all four combinations and record the truth table on paper
6. Discuss: OR requires only ONE input HIGH for a HIGH output

### After the Simulation (5 minutes)
- Compare the AND and OR truth tables side by side: how many 1s in each output column?
- Discuss real-world analogy: a parallel circuit where either switch can complete the circuit
- Introduce the concept of inclusive OR vs. exclusive OR (XOR)

## References

- [OR gate - Wikipedia](https://en.wikipedia.org/wiki/OR_gate)
- Unit 3: Logic Gates and Boolean Algebra
