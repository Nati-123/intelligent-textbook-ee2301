---
title: 3-Input NOR Gate
description: Interactive 3-input NOR gate with clickable inputs and 8-row truth table highlighting
image: /sims/3-input-nor-gate/3-input-nor-gate.png
quality_score: 85
---

# 3-Input NOR Gate

<iframe src="main.html" height="480px" width="100%" scrolling="no"></iframe>

[Run the 3-Input NOR Gate Fullscreen](./main.html){ .md-button .md-button--primary }

## Description

This MicroSim provides an interactive demonstration of a 3-input NOR gate. The simulation displays the standard NOR gate symbol (OR shape with an inversion bubble at the output), three clickable input toggles, and a complete eight-row truth table.

The 3-input NOR gate outputs 1 only when all three inputs are 0. For every other input combination, the output is 0. This is the complement of the 3-input OR gate. As you toggle inputs, the truth table highlights the current row in real time.

Key features include:

- Standard NOR gate symbol with inversion bubble and three input wires
- Three clickable toggle buttons for inputs A, B, and C
- Eight-row truth table with real-time row highlighting
- Live output display showing the Boolean expression NOT(A OR B OR C) = Y

## Iframe Embedding

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://Nati-123.github.io/intelligent-textbook-ee2301/sims/3-input-nor-gate/main.html" height="480px" scrolling="no" width="100%"></iframe>
```

## How to Use

1. Click the toggle button next to input **A** to switch it between 0 and 1
2. Click the toggle button next to input **B** to switch it between 0 and 1
3. Click the toggle button next to input **C** to switch it between 0 and 1
4. Observe the gate output update in real time
5. Watch the truth table highlight the row matching the current input combination
6. Verify that the output is 1 only when all three inputs are 0

## Learning Objectives

**Bloom Level**: Understand (L2)

After using this MicroSim, students will be able to:

- Extend the 2-input NOR gate concept to three or more inputs
- Predict the output of a 3-input NOR gate for any input combination
- Explain the relationship between NOR and OR gates (NOR = NOT OR)
- Recognize that NOR is a universal gate capable of implementing any Boolean function

## Lesson Plan

### Before the Simulation (5 minutes)
- Review the 2-input NOR gate and its truth table
- Remind students that NOR is the complement of OR
- Introduce NOR as a universal gate alongside NAND

### During the Simulation (15 minutes)
1. Start with all inputs at 0 and verify the output is 1
2. Toggle input A to 1 and observe the output drops to 0
3. Return A to 0 and toggle B to 1 to see the same effect
4. Explore all eight combinations systematically
5. Find the single combination that produces output 1 (A=0, B=0, C=0)
6. Compare with the OR truth table to confirm NOR is the complement of OR

### After the Simulation (5 minutes)
- Discuss why NOR gates are universal (can implement any Boolean function)
- Show that NOR-only logic is common in certain IC families
- Connect to De Morgan's theorem: NOT(A OR B OR C) = NOT A AND NOT B AND NOT C

## References

- [NOR Gate - Wikipedia](https://en.wikipedia.org/wiki/NOR_gate)
- [NOR Logic (Universal Gate) - Wikipedia](https://en.wikipedia.org/wiki/NOR_logic)
- Unit 3: Logic Gates and Boolean Algebra
