---
title: NOR Gate with Truth Table
description: Interactive NOR gate simulation with clickable inputs, gate symbol, and highlighted truth table for digital logic education
image: /sims/nor-gate-truth-table/nor-gate-truth-table.png
quality_score: 85
---

# NOR Gate with Truth Table

<iframe src="main.html" height="480px" width="100%" scrolling="no"></iframe>

## Description

This MicroSim provides an interactive demonstration of the NOR logic gate, which produces the complement of the OR function. Like NAND, the NOR gate is also a universal gate -- any Boolean function can be implemented using only NOR gates. The simulation displays the standard NOR gate symbol (OR shape with an inversion bubble) with two inputs (A and B) and one output (Y), along with a complete truth table.

Students can toggle each input between 0 and 1 using clickable buttons. The simulation updates in real time, highlighting the current input combination in the truth table and displaying the live Boolean expression evaluation ((A + B)' = Y). A key insight box reinforces that NOR is a universal gate.

Key features include:

- NOR gate symbol (OR shape with inversion bubble) with input and output wires
- Two clickable toggle buttons for inputs A and B
- Truth table with the current input combination highlighted
- Live Boolean expression evaluation
- Key insight box explaining NOR as a universal gate

## How to Use

1. Observe the NOR gate symbol (note the inversion bubble) and the truth table displayed on screen.
2. Click the toggle button next to input **A** to switch it between 0 and 1.
3. Click the toggle button next to input **B** to switch it between 0 and 1.
4. Watch the gate output update in real time based on the current inputs.
5. Notice the highlighted row in the truth table corresponding to the current input combination.
6. Read the Boolean expression display to see the evaluated result.
7. Compare with the OR gate: the NOR output is always the opposite of what OR would produce.

## Learning Objectives

**Bloom Level**: Understand (L2)

After using this MicroSim, students will be able to:

- Explain the behavior of a NOR gate and state its truth table from memory
- Predict the NOR gate output for any combination of two binary inputs
- Recognize NOR as a universal gate and explain why any logic function can be built using only NOR gates

## Lesson Plan

### Before the Simulation (5 minutes)
- Review the OR gate truth table and Boolean expression
- Introduce the concept of complementing (inverting) a gate output
- Show the NOR gate symbol and point out the inversion bubble

### During the Simulation (15 minutes)
1. Start with both inputs at 0 and observe that the output is 1 (the only case producing 1)
2. Toggle A to 1 -- output becomes 0 (any input HIGH inverts to LOW)
3. Toggle B to 1 -- output remains 0
4. Compare with the OR gate: NOR output is always the opposite of OR
5. Have students verify all four input combinations against the truth table
6. Discuss: NOR is universal -- any logic function can be built from NORs alone

### After the Simulation (5 minutes)
- Show how a NOT gate can be built from a single NOR gate (tie both inputs together)
- Compare NOR universality with NAND universality
- Discuss early computing: the Apollo Guidance Computer was built entirely from NOR gates

## References

- [NOR gate - Wikipedia](https://en.wikipedia.org/wiki/NOR_gate)
- [NOR logic (universal gate) - Wikipedia](https://en.wikipedia.org/wiki/NOR_logic)
- Unit 3: Logic Gates and Boolean Algebra
