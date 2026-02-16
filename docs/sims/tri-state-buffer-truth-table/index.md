---
quality_score: 47
---

# Tri-State Buffer with Truth Table

<iframe src="main.html" height="480px" width="100%" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

Interactive tri-state buffer demonstration showing the buffer gate symbol with an enable control input, clickable inputs, and a truth table that includes the high-impedance (Z) output state.

## Learning Objective

Students will be able to explain the three output states of a tri-state buffer (0, 1, and high-impedance Z) and understand why tri-state buffers are needed for shared bus architectures.

## Bloom Level

Understand (L2) - Explain, demonstrate

## Features

- Tri-state buffer symbol (triangle with enable input from top) and input/output wires
- Two clickable toggle buttons: data input (A) and enable (EN)
- Four-row truth table showing Z output when EN = 0
- High-impedance state shown in amber color to distinguish from logic 0/1
- Key insight box explaining bus sharing and electrical disconnection

## Usage

Click the toggle boxes to change input A and enable EN between 0 and 1. When EN = 0, the output shows Z (high-impedance) regardless of input A. When EN = 1, the output follows input A.

## Lesson Plan

1. Start with EN = 0, A = 0 - observe output is Z (disconnected)
2. Toggle A to 1 - output remains Z (enable is off, input doesn't matter)
3. Toggle EN to 1 - output becomes 1 (now follows input A)
4. Toggle A to 0 - output becomes 0 (follows input)
5. Discuss: Z is not 0 - it means the output is electrically disconnected, allowing other devices to drive the bus
