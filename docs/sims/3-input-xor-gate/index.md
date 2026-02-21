---
title: 3-Input XOR Gate
description: Interactive 3-input XOR gate demonstrating odd-parity behavior with 8-row truth table
image: /sims/3-input-xor-gate/3-input-xor-gate.png
quality_score: 85
---

# 3-Input XOR Gate

<iframe src="main.html" height="480px" width="100%" scrolling="no"></iframe>

## Description

This MicroSim provides an interactive demonstration of a 3-input XOR gate. The simulation displays the standard XOR gate symbol extended for three inputs, clickable input toggles, and a complete eight-row truth table.

The 3-input XOR gate outputs 1 when an odd number of inputs are 1. This is the fundamental odd-parity behavior of cascaded XOR gates. As you toggle inputs, the truth table highlights the current row in real time, making the parity pattern clearly visible.

Key features include:

- XOR gate symbol with three input wires and one output wire
- Three clickable toggle buttons for inputs A, B, and C
- Eight-row truth table with real-time row highlighting
- Live output display showing the current Boolean evaluation
- Visual demonstration of the odd-parity detection property

## How to Use

1. Click the toggle button next to input **A** to switch it between 0 and 1
2. Click the toggle button next to input **B** to switch it between 0 and 1
3. Click the toggle button next to input **C** to switch it between 0 and 1
4. Observe the gate output update in real time
5. Watch the truth table highlight the row matching the current input combination
6. Count the number of 1s in the inputs and verify the output matches odd parity

## Learning Objectives

**Bloom Level**: Understand (L2)

After using this MicroSim, students will be able to:

- Extend the 2-input XOR gate concept to three or more inputs
- Predict the output of a 3-input XOR gate using the odd-parity rule
- Explain why XOR with more than two inputs detects odd parity rather than "exactly one high"
- Connect multi-input XOR behavior to parity generator and checker circuits

## Lesson Plan

### Before the Simulation (5 minutes)
- Review the 2-input XOR gate and its "difference detector" behavior
- Ask students: "If we add a third input, does XOR still mean exactly one input is 1?"
- Introduce the concept of odd parity

### During the Simulation (15 minutes)
1. Start with all inputs at 0 (zero 1s, even count) and verify the output is 0
2. Toggle A to 1 (one 1, odd count) and observe output is 1
3. Toggle B to 1 (two 1s, even count) and observe output is 0
4. Toggle C to 1 (three 1s, odd count) and observe output is 1
5. Identify the pattern: output is 1 when 1 or 3 inputs are high (odd count)
6. Discuss why this is called odd parity rather than "exclusive" behavior

### After the Simulation (5 minutes)
- Explain how parity bits work in error detection
- Discuss how multi-input XOR is implemented as a cascade of 2-input XOR gates
- Connect to applications in checksums, CRC, and communication protocols

## References

- [XOR Gate - Wikipedia](https://en.wikipedia.org/wiki/XOR_gate)
- [Parity Bit - Wikipedia](https://en.wikipedia.org/wiki/Parity_bit)
- Unit 3: Logic Gates and Boolean Algebra
