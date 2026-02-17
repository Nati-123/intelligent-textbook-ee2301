---
title: Magnitude Comparator
description: Interactive 4-bit magnitude comparator determining greater-than, equal-to, and less-than relationships
image: /sims/magnitude-comparator/magnitude-comparator.png
quality_score: 85
---

# Magnitude Comparator

<iframe src="main.html" height="530px" width="100%" scrolling="no"></iframe>

[Run the Magnitude Comparator Fullscreen](./main.html){ .md-button .md-button--primary }

## Description

This MicroSim provides an interactive simulation of a 4-bit magnitude comparator that determines the arithmetic relationship between two binary numbers A and B. Students can set each bit of both numbers independently and observe the three comparison outputs: A > B, A = B, and A < B. The simulator displays the binary and decimal representations of both numbers alongside the comparison result.

Magnitude comparators are essential combinational circuits used in sorting networks, priority encoders, address range detection, and arithmetic logic units. They compare two multi-bit binary numbers bit-by-bit from the most significant bit downward, producing three mutually exclusive outputs.

Key features:

- **4-bit input for each number**: Toggle individual bits of A (A3-A0) and B (B3-B0)
- **Three comparison outputs**: A > B, A = B, and A < B with clear visual indication
- **Decimal equivalents**: Both binary inputs displayed with their decimal values
- **Real-time comparison**: Outputs update instantly as any input bit changes
- **Bit-by-bit visualization**: See how the comparison propagates from MSB to LSB

## Iframe Embedding

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://Nati-123.github.io/intelligent-textbook-ee2301/sims/magnitude-comparator/main.html" height="530px" scrolling="no" width="100%"></iframe>
```

## How to Use

1. **Set number A** by clicking individual bit toggles for A3 (MSB) through A0 (LSB)
2. **Set number B** by clicking individual bit toggles for B3 (MSB) through B0 (LSB)
3. **Observe the three outputs**: exactly one of A > B, A = B, or A < B will be active
4. **Check the decimal values** to verify the comparison result makes sense
5. **Try equal values** to confirm the A = B output activates
6. **Experiment with edge cases**: try A = 0000, B = 1111 (minimum vs. maximum) and other boundary conditions

## Learning Objectives

**Bloom Level**: Apply (L3)

After using this MicroSim, students will be able to:

- Explain how a magnitude comparator determines the relationship between two binary numbers
- Describe the three mutually exclusive outputs and why exactly one must be active at all times
- Trace the bit-by-bit comparison starting from the most significant bit
- Design a 1-bit comparator cell and explain how cells cascade to form multi-bit comparators
- Apply magnitude comparators in practical circuits such as address decoders and priority systems

## Lesson Plan

### Before the Simulation (5 minutes)
- Review binary number representation and unsigned integer comparison
- Discuss the difference between equality comparison and magnitude comparison
- Pose the question: how would you compare two 4-bit numbers using logic gates?

### During the Simulation (15 minutes)
1. Set A = 0101 (5) and B = 0011 (3); observe A > B is active
2. Set A = 0011 (3) and B = 0101 (5); observe A < B is active
3. Set A = 0111 (7) and B = 0111 (7); observe A = B is active
4. Change one bit at a time and observe how the comparison result changes
5. Try cases where the MSBs differ vs. cases where only the LSB differs
6. Explore all zeros (A = 0000, B = 0000) and all ones (A = 1111, B = 1111)

### After the Simulation (5 minutes)
- Discuss how cascading inputs allow building 8-bit or 16-bit comparators from 4-bit modules
- Introduce the 7485 IC as a standard 4-bit magnitude comparator
- Connect to conditional branching in processor design

## References

- [Digital comparator - Wikipedia](https://en.wikipedia.org/wiki/Digital_comparator)
- [7485 Magnitude Comparator - Wikipedia](https://en.wikipedia.org/wiki/7400-series_integrated_circuits)
- Unit 7: Combinational Logic Modules in this textbook
