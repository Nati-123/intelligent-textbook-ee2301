---
title: XOR Gate with Truth Table
description: Interactive XOR gate demonstration with clickable inputs, gate symbol, and highlighted truth table
image: /sims/xor-gate-truth-table/xor-gate-truth-table.png
quality_score: 85
---

# XOR Gate with Truth Table

<iframe src="main.html" height="480px" width="100%" scrolling="no"></iframe>

[Run the XOR Gate with Truth Table Fullscreen](./main.html){ .md-button .md-button--primary }

## Description

This MicroSim provides an interactive demonstration of the XOR (exclusive OR) gate. The simulation displays the standard XOR gate symbol with its distinctive double-curved left edge, two clickable input toggles, and a complete four-row truth table.

As you toggle each input between 0 and 1, the gate output updates in real time and the corresponding row of the truth table is highlighted. A live Boolean expression display shows the current evaluation of A XOR B = Y.

Key features include:

- Standard XOR gate symbol with input and output wires
- Two clickable toggle buttons for inputs A and B
- Four-row truth table with real-time row highlighting
- Live Boolean expression evaluation (A XOR B = Y)
- Insight box explaining XOR applications in parity checking, adders, and comparators

## Iframe Embedding

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://Nati-123.github.io/intelligent-textbook-ee2301/sims/xor-gate-truth-table/main.html" height="480px" scrolling="no" width="100%"></iframe>
```

## How to Use

1. Click the toggle button next to input **A** to switch it between 0 and 1
2. Click the toggle button next to input **B** to switch it between 0 and 1
3. Observe the gate output update in real time on the gate symbol
4. Watch the truth table highlight the row matching the current input combination
5. Read the Boolean expression at the bottom to see the current evaluation

## Learning Objectives

**Bloom Level**: Understand (L2)

After using this MicroSim, students will be able to:

- Explain the behavior of an XOR gate and state that it outputs 1 when inputs differ
- Predict the XOR gate output for any combination of two binary inputs
- Describe how XOR differs from OR (exclusive vs. inclusive)
- Identify practical applications of XOR in parity checking and binary addition

## Lesson Plan

### Before the Simulation (5 minutes)
- Review the OR gate and its truth table
- Ask students: "What if we want a gate that outputs 1 only when exactly one input is 1?"
- Introduce the XOR gate symbol and its Boolean notation (A XOR B)

### During the Simulation (15 minutes)
1. Start with both inputs at 0 and observe that the output is 0 (inputs are the same)
2. Toggle A to 1 and observe the output becomes 1 (inputs differ)
3. Toggle B to 1 and observe the output returns to 0 (inputs are the same again)
4. Toggle A to 0 and observe the output becomes 1 (inputs differ again)
5. Walk through all four truth table rows systematically
6. Discuss the pattern: XOR detects when inputs are different

### After the Simulation (5 minutes)
- Discuss real-world applications: parity generators, half adders, comparators
- Ask students to predict the output of a chain of XOR gates
- Connect to upcoming topics on binary arithmetic circuits

## References

- [XOR Gate - Wikipedia](https://en.wikipedia.org/wiki/XOR_gate)
- [Exclusive Or - Wikipedia](https://en.wikipedia.org/wiki/Exclusive_or)
- Unit 3: Logic Gates and Boolean Algebra
