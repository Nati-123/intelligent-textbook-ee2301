---
title: Tri-State Buffer with Truth Table
description: Interactive tri-state buffer simulation with clickable inputs, enable control, and high-impedance state demonstration for digital logic education
image: /sims/tri-state-buffer-truth-table/tri-state-buffer-truth-table.png
quality_score: 85
---

# Tri-State Buffer with Truth Table

<iframe src="main.html" height="480px" width="100%" scrolling="no"></iframe>

[Run the Tri-State Buffer with Truth Table Fullscreen](./main.html){ .md-button .md-button--primary }

## Description

This MicroSim provides an interactive demonstration of the tri-state buffer, a critical component in digital systems that enables shared bus architectures. Unlike standard logic gates that output only 0 or 1, the tri-state buffer has a third output state: high-impedance (Z), which electrically disconnects the output from the bus. The simulation displays the tri-state buffer symbol (triangle with an enable control input from the top) with a data input (A), an enable input (EN), and one output (Y).

Students can toggle both the data input and the enable signal using clickable buttons. The simulation updates in real time, showing a four-row truth table that includes the high-impedance (Z) state displayed in amber to distinguish it from logic 0 and logic 1. When EN is LOW, the output is Z regardless of input A. When EN is HIGH, the output follows input A.

Key features include:

- Tri-state buffer symbol (triangle with enable input from top) with input and output wires
- Two clickable toggle buttons for data input A and enable EN
- Four-row truth table showing Z output when EN = 0
- High-impedance state displayed in amber color to distinguish from logic levels
- Key insight box explaining bus sharing and electrical disconnection

## Iframe Embedding

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://Nati-123.github.io/intelligent-textbook-ee2301/sims/tri-state-buffer-truth-table/main.html" height="480px" scrolling="no" width="100%"></iframe>
```

## How to Use

1. Observe the tri-state buffer symbol (note the enable input from the top) and the truth table displayed on screen.
2. Click the toggle button next to **EN** (enable) to switch it between 0 and 1.
3. Click the toggle button next to input **A** to switch it between 0 and 1.
4. When EN = 0, observe that the output shows **Z** (high-impedance) regardless of input A.
5. When EN = 1, observe that the output follows input A.
6. Notice the amber color used for the Z state to distinguish it from logic 0 and 1.
7. Examine the truth table highlighting to see which row corresponds to the current inputs.

## Learning Objectives

**Bloom Level**: Understand (L2)

After using this MicroSim, students will be able to:

- Explain the three output states of a tri-state buffer (0, 1, and high-impedance Z)
- Distinguish high-impedance (Z) from logic 0, understanding that Z means electrically disconnected
- Describe why tri-state buffers are essential for shared bus architectures in digital systems

## Lesson Plan

### Before the Simulation (5 minutes)
- Review the standard buffer gate (output follows input)
- Ask students: "What happens if two gates try to drive the same wire with different values?"
- Introduce the concept of high-impedance (Z) as electrical disconnection

### During the Simulation (15 minutes)
1. Start with EN = 0, A = 0 and observe that the output is Z (disconnected)
2. Toggle A to 1 -- output remains Z (enable is off, input does not matter)
3. Toggle EN to 1 -- output becomes 1 (now follows input A)
4. Toggle A to 0 -- output becomes 0 (follows input)
5. Toggle EN back to 0 -- output returns to Z
6. Discuss: Z is not 0 -- it means the output is electrically disconnected, allowing other devices to drive the bus

### After the Simulation (5 minutes)
- Draw a simple bus architecture with multiple tri-state buffers sharing one wire
- Explain that only one buffer should be enabled at a time to avoid bus contention
- Connect tri-state buffers to real-world applications: memory buses, I/O interfaces, and CPU data buses

## References

- [Three-state logic - Wikipedia](https://en.wikipedia.org/wiki/Three-state_logic)
- [Bus (computing) - Wikipedia](https://en.wikipedia.org/wiki/Bus_(computing))
- Unit 3: Logic Gates and Boolean Algebra
