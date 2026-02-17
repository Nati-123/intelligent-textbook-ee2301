---
title: NAND-NOR Converter
description: Interactive Boolean expression converter showing equivalent AND-OR, NAND-only, and NOR-only circuit implementations
image: /sims/nand-nor-converter/nand-nor-converter.png
quality_score: 85
---

# NAND-NOR Converter

<iframe src="main.html" height="590px" width="100%" scrolling="no"></iframe>

[Run the NAND-NOR Converter Fullscreen](./main.html){ .md-button .md-button--primary }

## Description

This MicroSim converts Boolean expressions between three different gate-level implementations: AND-OR (standard two-level), NAND-only, and NOR-only. Converting between these representations is a fundamental skill in digital design, as real-world circuits are often implemented using only NAND gates (in CMOS technology) for manufacturing efficiency.

The simulation allows students to select from a set of Boolean expressions and view the equivalent circuit implementations side by side. For each expression, the tool shows the standard AND-OR form, the NAND-only equivalent (obtained by applying double inversion), and the NOR-only equivalent. This visual comparison helps students understand the conversion rules and appreciate the trade-offs between different implementations.

Key features include:

- Selectable Boolean expressions of varying complexity
- Side-by-side AND-OR, NAND-only, and NOR-only circuit displays
- Visual representation of gate-level implementations
- Gate count comparison across all three implementations
- Clear demonstration of the double-inversion conversion technique

## Iframe Embedding

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://Nati-123.github.io/intelligent-textbook-ee2301/sims/nand-nor-converter/main.html" height="590px" scrolling="no" width="100%"></iframe>
```

## How to Use

1. Select a **Boolean expression** from the dropdown menu (e.g., AB + CD, A'B + AB').
2. View the **AND-OR implementation** showing the standard two-level circuit.
3. Observe the **NAND-only implementation** that produces the same function using only NAND gates.
4. Observe the **NOR-only implementation** using only NOR gates.
5. Compare the **gate counts** between the three implementations.
6. Try different expressions to see how circuit complexity varies with the function.
7. Trace through each circuit mentally to verify all three implementations produce the same output.

## Learning Objectives

**Bloom Level**: Apply (L3)

After using this MicroSim, students will be able to:

- Convert a two-level AND-OR Boolean expression into an equivalent NAND-only implementation using the double-inversion technique
- Convert a two-level OR-AND Boolean expression into an equivalent NOR-only implementation
- Compare gate counts across AND-OR, NAND-only, and NOR-only implementations and explain why NAND is preferred in CMOS design

## Lesson Plan

### Before the Simulation (5 minutes)
- Review DeMorgan's theorem: (AB)' = A' + B' and (A+B)' = A'B'
- Introduce the double-inversion technique: inserting two inversions (which cancel out) at strategic points to convert AND-OR to NAND-NAND
- Ask students: "Why would we want to build a circuit using only one type of gate?"

### During the Simulation (15 minutes)
1. Start with a simple expression like AB + CD in AND-OR form
2. View the NAND-only equivalent and count the gates -- identify where the double inversions were inserted
3. View the NOR-only equivalent and compare the gate count
4. Move to a more complex expression and repeat the analysis
5. For each expression, have students attempt the conversion on paper first, then verify with the simulation
6. Create a comparison table showing gate counts for each implementation style

### After the Simulation (5 minutes)
- Discuss why CMOS NAND gates are faster and use fewer transistors than CMOS NOR gates
- Explain how Electronic Design Automation (EDA) tools perform these conversions automatically during synthesis
- Preview multi-level optimization and how it differs from two-level NAND/NOR conversion

## References

- [NAND Logic - Wikipedia](https://en.wikipedia.org/wiki/NAND_logic)
- [NOR Logic - Wikipedia](https://en.wikipedia.org/wiki/NOR_logic)
- [De Morgan's Laws - Wikipedia](https://en.wikipedia.org/wiki/De_Morgan%27s_laws)
- Unit 3: Logic Gates and Boolean Algebra
