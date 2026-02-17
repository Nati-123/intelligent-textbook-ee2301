---
title: Binary-Gray Code Converter
description: Interactive converter between binary and Gray code with XOR operation visualization
image: /sims/binary-gray-converter/binary-gray-converter.png
quality_score: 85
---

# Binary-Gray Code Converter

<iframe src="main.html" height="550px" width="100%" scrolling="no"></iframe>

[Run the Binary-Gray Code Converter Fullscreen](./main.html){ .md-button .md-button--primary }

## Description

This MicroSim demonstrates the conversion between standard binary code and Gray code. Gray code is a binary numeral system where two successive values differ in only one bit, a property known as the unit distance code. This makes Gray code essential in applications where bit transitions must be minimized to avoid glitches.

The simulation provides a 4-bit interactive converter that shows the XOR operations used in the conversion process. You can toggle individual bits and switch between Binary-to-Gray and Gray-to-Binary conversion modes. The XOR gates connecting each bit pair are displayed visually so students can trace the conversion algorithm step by step.

Key features include:

- 4-bit interactive input with clickable toggle buttons
- Bidirectional conversion: Binary-to-Gray and Gray-to-Binary modes
- Visual display of XOR operations connecting adjacent bits
- Color-coded high/low bit states for clarity
- Mode switch button to toggle conversion direction

## Iframe Embedding

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://Nati-123.github.io/intelligent-textbook-ee2301/sims/binary-gray-converter/main.html" height="550px" scrolling="no" width="100%"></iframe>
```

## How to Use

1. Use the **toggle buttons** to set each of the 4 input bits (MSB to LSB)
2. View the equivalent converted code displayed below the input
3. Observe the **XOR operations** shown between adjacent bit positions
4. Click the **Switch to Gray-to-Binary** button to reverse the conversion direction
5. Experiment with different bit patterns to understand the conversion algorithm

## Learning Objectives

**Bloom Level**: Apply (L3)

After using this MicroSim, students will be able to:

- Explain the single-bit-change property of Gray code and why it matters
- Perform binary-to-Gray code conversion using XOR operations
- Perform Gray-to-binary code conversion using cascaded XOR operations
- Identify applications of Gray code in rotary encoders, Karnaugh maps, and error reduction

## Lesson Plan

### Before the Simulation (5 minutes)
- Introduce the problem of multiple simultaneous bit transitions in standard binary counting
- Show an example where binary 011 to 100 changes all three bits at once
- Explain how Gray code guarantees only one bit changes between adjacent values

### During the Simulation (15 minutes)
1. Set the input to binary 0000 and observe the Gray code equivalent (0000)
2. Increment through binary values (0001, 0010, 0011, ...) and observe Gray code outputs
3. Verify that consecutive Gray codes differ by exactly one bit
4. Trace the XOR operations visually for each conversion
5. Switch to Gray-to-Binary mode and verify the reverse conversion
6. Try converting the same value in both directions to confirm round-trip correctness

### After the Simulation (5 minutes)
- Discuss where Gray code is used: rotary encoders, Karnaugh map ordering, analog-to-digital converters
- Show the connection between Gray code ordering and Karnaugh map adjacency
- Connect the XOR-based conversion to the gate-level circuit implementation

## References

- [Gray Code - Wikipedia](https://en.wikipedia.org/wiki/Gray_code)
- [XOR Gate - Wikipedia](https://en.wikipedia.org/wiki/XOR_gate)
- Unit 4: Number Systems and Codes
