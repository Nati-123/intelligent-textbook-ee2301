---
title: K-Map Solver
description: Interactive Karnaugh map solver for Boolean function simplification
image: /sims/kmap-solver/kmap-solver.png
quality_score: 85
---

# K-Map Solver

<iframe src="main.html" height="550px" width="100%" scrolling="no"></iframe>

[Run the K-Map Solver Fullscreen](./main.html){ .md-button .md-button--primary }

## Description

This MicroSim provides an interactive Karnaugh map for simplifying Boolean functions. Students can click cells to set values (0, 1, or don't care), then solve to find the minimal Sum of Products expression. The tool visualizes prime implicants with colored groupings and displays the resulting simplified expression.

Key features:

- **Interactive K-map**: Click cells to toggle between 0, 1, and X (don't care)
- **Variable support**: Works with 2, 3, or 4 variables
- **Auto-grouping**: Automatically identifies optimal prime implicant groups
- **Visual highlighting**: Color-coded groups show which minterms combine
- **Minimal expression**: Displays the simplified SOP expression

## Iframe Embedding

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://[your-site]/sims/kmap-solver/main.html" height="550px" scrolling="no" width="100%"></iframe>
```

## How to Use

1. **Select the number of variables** (2, 3, or 4)
2. **Click cells** to toggle values:
   - First click: 0 → 1 (function output is 1)
   - Second click: 1 → X (don't care)
   - Third click: X → 0 (function output is 0)
3. **Click "Solve"** to find the minimal expression
4. **Observe the colored groups** showing prime implicants
5. **Click "Clear"** to reset and try a new function

## Learning Objectives

**Bloom Level**: Analyze (L4)
**Bloom Verb**: Identify, classify, simplify

After using this MicroSim, students will be able to:

- Create K-maps for 2-4 variable Boolean functions
- Identify valid groupings (powers of 2, rectangular shapes)
- Recognize Gray code ordering and adjacency in K-maps
- Use don't care conditions to create larger groups
- Derive minimal SOP expressions from K-map groupings

## Lesson Plan

### Before the Simulation (5 minutes)
- Review minterm representation and SOP form
- Explain Gray code ordering and logical adjacency

### During the Simulation (15 minutes)
1. Start with a 2-variable function: click to set F(0,0)=1, F(1,1)=1
2. Solve and observe the grouping
3. Move to 3 variables: try F = Σm(1,3,5,7)
4. Notice how the column of 1s forms one group
5. Try a 4-variable function with don't cares
6. Compare expressions with and without using don't cares

### After the Simulation (5 minutes)
- Practice finding groups manually before clicking Solve
- Discuss cases with multiple minimal solutions

## References

- [Karnaugh Map - Wikipedia](https://en.wikipedia.org/wiki/Karnaugh_map)
- [Prime Implicant - Wikipedia](https://en.wikipedia.org/wiki/Implicant#Prime_implicant)
- Unit 5: Karnaugh Maps in this textbook
