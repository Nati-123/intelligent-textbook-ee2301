---
title: QM Combination Simulator
description: Step-by-step visualization of the Quine-McCluskey combination process showing how minterms combine with dash notation
image: /sims/qm-combination-simulator/qm-combination-simulator.png
quality_score: 85
---

# QM Combination Simulator

<iframe src="main.html" height="582px" width="100%" scrolling="no"></iframe>

[Run the QM Combination Simulator Fullscreen](./main.html){ .md-button .md-button--primary }

## Description

This MicroSim demonstrates the iterative combination process in the Quine-McCluskey algorithm. It shows how minterms are compared and combined when they differ in exactly one bit position, with the differing bit replaced by a dash (-).

Key concepts demonstrated:

- **Combination rule**: Two terms combine only if they differ in exactly one bit and dashes align
- **Dash notation**: The differing bit becomes a dash, indicating the variable is eliminated
- **Check marks**: Combined terms are marked with ✓ and won't be prime implicants
- **Prime implicants**: Unchecked terms that cannot be further combined (shown in gold)

## Iframe Embedding

```html
<iframe src="https://[your-site]/sims/qm-combination-simulator/main.html" height="582px" scrolling="no" width="100%"></iframe>
```

## How to Use

1. **Select Variables**: Choose 3, 4, or 5 variables
2. **Step Through**: Click "Next Step" to see each comparison
3. **Run All**: Click "Run All" to complete all combinations instantly
4. **Reset**: Start over with a fresh example

## Learning Objectives

**Bloom Level**: Apply (L3)
**Bloom Verb**: Execute, implement

After using this MicroSim, students will be able to:

- Determine when two terms can be combined
- Apply the dash notation correctly
- Identify which terms are combined (checked) vs. prime implicants (unchecked)
- Execute the iterative combination process step-by-step

## Lesson Plan

### Before the Simulation (5 minutes)
- Review the grouping step (Group 0, Group 1, etc.)
- Explain the one-bit difference rule

### During the Simulation (15 minutes)
1. Step through the first few comparisons
2. Notice which pairs can combine (green) vs. cannot (red)
3. Observe how dashes propagate through iterations
4. Identify the final prime implicants

### After the Simulation (5 minutes)
- Practice identifying prime implicants manually
- Discuss why some terms cannot combine

## References

- [Quine-McCluskey Algorithm - Wikipedia](https://en.wikipedia.org/wiki/Quine%E2%80%93McCluskey_algorithm)
- Unit 6: Quine-McCluskey Method in this textbook
