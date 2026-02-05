---
title: Binary Adder Visualizer
description: Interactive visualization of half adder, full adder, and ripple carry adder circuits
image: /sims/binary-adder-visualizer/binary-adder-visualizer.png
quality_score: 85
---

# Binary Adder Visualizer

<iframe src="main.html" height="550px" width="100%" scrolling="no"></iframe>

[Run the Binary Adder Visualizer Fullscreen](./main.html){ .md-button .md-button--primary }

## Description

This MicroSim demonstrates how binary addition is performed in digital circuits, progressing from simple half adders to full adders and multi-bit ripple carry adders. Students can toggle input bits and step through the addition process to see how carry propagates through the circuit.

Key features:

- **Half Adder**: Two inputs (A, B), outputs Sum and Carry
- **Full Adder**: Three inputs (A, B, Carry-in), outputs Sum and Carry-out
- **4-bit Ripple Carry Adder**: Step through multi-bit addition with carry propagation
- **Interactive inputs**: Click to toggle bit values
- **Step-by-step mode**: Watch carry ripple through the adder chain

## Iframe Embedding

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://[your-site]/sims/binary-adder-visualizer/main.html" height="550px" scrolling="no" width="100%"></iframe>
```

## How to Use

1. **Select adder type** from the dropdown (Half Adder, Full Adder, or 4-bit Ripple Adder)
2. **Click input bits** to toggle between 0 and 1
3. **For ripple adder**: Click "Step" to advance through each bit position
4. **Observe** how Sum and Carry outputs change based on inputs
5. **Click "Reset"** to start over

## Learning Objectives

**Bloom Level**: Understand (L2)
**Bloom Verb**: Explain, demonstrate, trace

After using this MicroSim, students will be able to:

- Explain how a half adder computes Sum (XOR) and Carry (AND)
- Describe the role of carry-in in a full adder
- Trace carry propagation through a ripple carry adder
- Understand why ripple carry adders have delay proportional to bit width

## Lesson Plan

### Before the Simulation (5 minutes)
- Review binary addition rules (0+0=0, 0+1=1, 1+1=10)
- Discuss the need for Sum and Carry outputs

### During the Simulation (15 minutes)
1. Start with Half Adder: try all four input combinations
2. Move to Full Adder: add carry-in and observe the difference
3. Use 4-bit Ripple Adder: step through an addition like 5 + 7
4. Observe how carry "ripples" from LSB to MSB

### After the Simulation (5 minutes)
- Discuss why ripple carry is slow for large numbers
- Introduce the concept of carry-lookahead (advanced topic)

## References

- [Adder (electronics) - Wikipedia](https://en.wikipedia.org/wiki/Adder_(electronics))
- [Ripple-carry Adder - Wikipedia](https://en.wikipedia.org/wiki/Adder_(electronics)#Ripple-carry_adder)
- Unit 3: Applications of Boolean Algebra in this textbook
