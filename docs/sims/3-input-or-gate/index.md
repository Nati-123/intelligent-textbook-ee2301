---
title: 3-Input OR Gate
description: Interactive 3-input OR gate with clickable inputs and 8-row truth table highlighting
image: /sims/3-input-or-gate/3-input-or-gate.png
quality_score: 85
---

# 3-Input OR Gate

<iframe src="main.html" height="480px" width="100%" scrolling="no"></iframe>

[Run the 3-Input OR Gate Fullscreen](./main.html){ .md-button .md-button--primary }

## Description

This MicroSim provides an interactive demonstration of a 3-input OR gate. The simulation displays the standard OR gate symbol with its curved body, three clickable input toggles, and a complete eight-row truth table.

The 3-input OR gate outputs 1 when any one or more of the three inputs is 1. The output is 0 only when all three inputs are 0. As you toggle inputs, the truth table highlights the current row in real time.

Key features include:

- Standard OR gate symbol with three input wires and one output wire
- Three clickable toggle buttons for inputs A, B, and C
- Eight-row truth table with real-time row highlighting
- Live output display showing the Boolean expression A OR B OR C = Y

## Iframe Embedding

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://Nati-123.github.io/intelligent-textbook-ee2301/sims/3-input-or-gate/main.html" height="480px" scrolling="no" width="100%"></iframe>
```

## How to Use

1. Click the toggle button next to input **A** to switch it between 0 and 1
2. Click the toggle button next to input **B** to switch it between 0 and 1
3. Click the toggle button next to input **C** to switch it between 0 and 1
4. Observe the gate output update in real time
5. Watch the truth table highlight the row matching the current input combination
6. Verify that the output is 0 only when all three inputs are 0

## Learning Objectives

**Bloom Level**: Understand (L2)

After using this MicroSim, students will be able to:

- Extend the 2-input OR gate concept to three or more inputs
- Predict the output of a 3-input OR gate for any input combination
- Explain why the OR gate outputs 0 for only one of the eight possible input combinations
- Relate the 3-input OR gate to its Boolean expression Y = A + B + C

## Lesson Plan

### Before the Simulation (5 minutes)
- Review the 2-input OR gate and its truth table
- Ask students how many rows produce output 1 for a 3-input OR gate
- Introduce the idea that OR generalizes to any number of inputs

### During the Simulation (15 minutes)
1. Start with all inputs at 0 and verify the output is 0
2. Toggle input A to 1 and observe the output becomes 1
3. Toggle additional inputs and observe the output remains 1
4. Find the single combination that produces output 0 (A=0, B=0, C=0)
5. Count how many of the 8 rows produce output 1 versus output 0 (seven vs. one)
6. Compare this pattern with the AND gate (which has the opposite ratio)

### After the Simulation (5 minutes)
- Discuss how OR gates are used in interrupt priority logic
- Ask students to predict the truth table for a 4-input OR gate
- Connect to the NOR gate as the complement of OR

## References

- [OR Gate - Wikipedia](https://en.wikipedia.org/wiki/OR_gate)
- Unit 3: Logic Gates and Boolean Algebra
