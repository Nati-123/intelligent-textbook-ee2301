---
title: Bubble Pushing Simulator
description: Interactive visualization of De Morgan's theorem through bubble pushing gate conversion
image: /sims/bubble-pushing-simulator/bubble-pushing-simulator.png
quality_score: 85
---

# Bubble Pushing Simulator

<iframe src="main.html" height="580px" width="100%" scrolling="no"></iframe>

[Run the Bubble Pushing Simulator Fullscreen](./main.html){ .md-button .md-button--primary }

## Description

This MicroSim demonstrates the bubble pushing technique used to convert between different gate implementations in digital logic circuits. Bubble pushing is a visual method for applying De Morgan's theorems, where inversion bubbles are moved through gates, changing AND gates to OR gates and vice versa.

The simulation walks through a step-by-step conversion of an AND-OR circuit (sum-of-products form, F = AB + CD) into a NAND-only implementation. At each step, the circuit diagram updates to show how bubbles are added, pushed through gates, and how gate types transform as a result.

Key features include:

- Step-by-step animated circuit transformation
- Visual representation of inversion bubbles on gate inputs and outputs
- Gate type changes displayed as bubbles pass through (AND becomes OR, OR becomes AND)
- Clear labeling of each transformation step with Boolean expressions
- Step and Reset buttons for controlled progression through the conversion

## Iframe Embedding

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://Nati-123.github.io/intelligent-textbook-ee2301/sims/bubble-pushing-simulator/main.html" height="580px" scrolling="no" width="100%"></iframe>
```

## How to Use

1. View the **original AND-OR circuit** displayed in Step 1
2. Click the **Step** button to advance to the next transformation
3. Observe how **inversion bubbles** are inserted at AND outputs and OR inputs
4. Watch bubbles **push through gates**, changing AND to NAND and OR to NAND
5. Verify the final **NAND-only implementation** is functionally equivalent
6. Click **Reset** to return to the original circuit and repeat the process

## Learning Objectives

**Bloom Level**: Analyze (L4)

After using this MicroSim, students will be able to:

- Apply De Morgan's theorem to convert between gate types using bubble pushing
- Transform an AND-OR (SOP) circuit into a NAND-only implementation
- Explain why two bubbles on the same wire cancel each other out
- Analyze the equivalence of different circuit implementations for the same Boolean function

## Lesson Plan

### Before the Simulation (5 minutes)
- Review De Morgan's theorems: NOT(A AND B) = NOT A OR NOT B, and NOT(A OR B) = NOT A AND NOT B
- Explain why NAND-only and NOR-only implementations are desirable in CMOS design
- Introduce bubble pushing as a visual shortcut for applying De Morgan's theorem

### During the Simulation (15 minutes)
1. Start with the original AND-OR circuit and identify the Boolean expression F = AB + CD
2. Step forward to see bubble pairs inserted at the AND-to-OR boundary
3. Observe that paired bubbles cancel, preserving logical equivalence
4. Watch the AND gates become NAND gates and the OR gate become a NAND gate
5. Verify the final NAND-only circuit still implements F = AB + CD
6. Reset and step through again, explaining each transformation out loud

### After the Simulation (5 minutes)
- Practice bubble pushing on a different SOP expression (e.g., F = AB + C)
- Discuss how to convert to NOR-only implementation using the same technique
- Connect to physical CMOS gate implementation where NAND and NOR are natural

## References

- [De Morgan's Laws - Wikipedia](https://en.wikipedia.org/wiki/De_Morgan%27s_laws)
- [NAND Logic - Wikipedia](https://en.wikipedia.org/wiki/NAND_logic)
- [Logic Gate - Wikipedia](https://en.wikipedia.org/wiki/Logic_gate)
- Unit 3: Logic Gates and Boolean Algebra
