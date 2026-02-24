---
title: Unit 5 — Karnaugh Maps
description: Systematic graphical method for Boolean function simplification using K-maps, prime implicants, and minimal expressions
generated_by: claude skill chapter-content-generator
date: 2026-02-04 18:00:00
version: 0.03
---

<div class="unit1-styled" markdown>

# Unit 5 — Karnaugh Maps

<details class="video-overview">
<summary><strong>Unit Overview</strong> (click to expand)</summary>

Welcome to Unit 5, where we learn one of the most elegant tools in a digital designer's toolkit — the Karnaugh map, or K-map. If Boolean algebra gives you the rules and canonical forms give you the starting point, the K-map gives you a visual method to find the simplest possible expression quickly and reliably.

A Karnaugh map is a grid that rearranges truth table rows so that physically adjacent cells differ by exactly one variable. This arrangement relies on Gray code ordering. When two adjacent cells both contain a one, the variable that changes between them cancels out. That is the core insight: adjacency on the map corresponds directly to algebraic simplification.

Your goal is to circle rectangular groups of ones, where every group must contain a power-of-two number of cells. Groups can wrap around the edges because the K-map is logically a torus. Each group corresponds to a simplified product term.

A prime implicant is a group that cannot be made any larger. An essential prime implicant covers at least one minterm not covered by any other prime implicant — you must include it in your final expression. The strategy is to identify all essential prime implicants first, then cover any remaining minterms with the fewest additional prime implicants.

Don't care conditions once again prove invaluable. Because don't cares can be treated as either one or zero, you can include them in your groups to make those groups larger, producing fewer literals and a simpler circuit.

**Key Takeaways**

1. Gray code ordering on the K-map ensures that adjacent cells differ by one variable, so grouping adjacent ones directly eliminates variables from the expression.
2. Prime implicants and essential prime implicants guide you toward the minimal expression — always identify essentials first, then cover the rest.
3. Don't care conditions can be included in groups to create larger groupings, leading to simpler, more efficient circuit implementations.

</details>

## Summary

Karnaugh maps (K-maps) provide a powerful graphical method for simplifying Boolean functions, transforming the abstract process of algebraic manipulation into visual pattern recognition. Developed by Maurice Karnaugh in 1953, this technique exploits the adjacency properties of Gray code ordering to identify opportunities for variable elimination. This unit covers K-map construction for 2, 3, 4, and 5 variables, teaching students to recognize valid groupings that lead to simpler expressions. The concepts of implicants, prime implicants, and essential prime implicants formalize the simplification process, enabling systematic derivation of minimal Sum of Products (SOP) and Product of Sums (POS) expressions. Students will learn to handle don't care conditions, recognize when multiple minimal solutions exist, and understand the limitations of K-maps for larger functions.

---

## Concepts Covered

1. Karnaugh Map
2. K-Map Structure
3. K-Map Cell
4. K-Map Variables
5. Two Variable K-Map
6. Three Variable K-Map
7. Four Variable K-Map
8. Five Variable K-Map
9. K-Map Gray Code Order
10. K-Map Adjacency
11. Logical Adjacency
12. Physical Adjacency
13. K-Map Grouping
14. Group of Ones
15. Group of Zeros
16. Valid Group Sizes
17. Rectangular Groups
18. Wrapping in K-Maps
19. Corner Grouping
20. Implicant
21. Prime Implicant
22. Essential Prime Implicant
23. Redundant Prime Implicant
24. K-Map SOP Simplification
25. K-Map POS Simplification
26. Minimal SOP Expression
27. Minimal POS Expression
28. K-Map with Dont Cares
29. Using Dont Cares
30. Overlapping Groups
31. Covering All Ones
32. Covering All Zeros
33. Multiple Solutions
34. Cost of Expression
35. Gate Count Minimization
36. Literal Minimization
37. K-Map Limitations
38. Five Variable Technique
39. Entered Variable K-Map
40. K-Map vs Algebraic Method

---

## Prerequisites

Before beginning this unit, students should have:

- Thorough understanding of minterms and maxterms (Unit 4)
- Familiarity with canonical SOP and POS forms
- Knowledge of Gray code ordering (Unit 3)
- Understanding of don't care conditions

---

## 5.1 Introduction to Karnaugh Maps

A **Karnaugh map** (K-map) is a graphical tool for simplifying Boolean functions that arranges the truth table in a grid format where adjacent cells differ by exactly one variable. This arrangement makes it easy to identify groups of 1s (or 0s) that can be combined to eliminate variables.

### K-Map Structure

The **K-map structure** consists of:

- A rectangular grid of **K-map cells**, one for each minterm
- Row and column labels using **Gray code order** (adjacent labels differ by one bit)
- Each cell corresponds to one input combination

The power of K-maps lies in their **adjacency** property: cells that are physically adjacent on the map are also **logically adjacent**, meaning their minterms differ in exactly one variable. When two logically adjacent minterms are ORed together, the differing variable cancels out.

**Example:** Minterms $m_5 = A\overline{B}C$ and $m_7 = ABC$ differ only in B:

$$m_5 + m_7 = A\overline{B}C + ABC = AC(\overline{B} + B) = AC$$

### K-Map Variables

**K-map variables** determine the map dimensions:

| Variables | Cells | Typical Layout |
|-----------|-------|----------------|
| 2 | 4 | 2×2 grid |
| 3 | 8 | 2×4 grid |
| 4 | 16 | 4×4 grid |
| 5 | 32 | Two 4×4 grids |
| 6 | 64 | Four 4×4 grids |

K-maps become impractical beyond 5-6 variables due to the difficulty of visualizing adjacencies.

---

## 5.2 Two-Variable K-Map

The **two-variable K-map** is the simplest form, with 4 cells arranged in a 2×2 grid.

<table style="font-size: 0.92rem; margin: 1.2rem auto; border-collapse: collapse; min-width: 220px;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 6px 18px;"></th><th style="padding: 6px 18px;">B = 0</th><th style="padding: 6px 18px;">B = 1</th></tr></thead>
<tbody>
<tr><td style="padding: 6px 18px; font-weight: 700; background: #6A5BFF; color: #fff;">A = 0</td><td style="padding: 6px 18px; text-align: center;">m<sub>0</sub></td><td style="padding: 6px 18px; text-align: center;">m<sub>1</sub></td></tr>
<tr><td style="padding: 6px 18px; font-weight: 700; background: #6A5BFF; color: #fff;">A = 1</td><td style="padding: 6px 18px; text-align: center; background: #f4f4ff;">m<sub>2</sub></td><td style="padding: 6px 18px; text-align: center; background: #f4f4ff;">m<sub>3</sub></td></tr>
</tbody>
</table>

Each cell contains the function value (0, 1, or X) for that minterm.

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Example: Simplify <span class="arithmatex">\(F(A,B) = \Sigma m(0,1,3)\)</span></p>

<table style="font-size: 0.92rem; margin: 1rem auto; border-collapse: collapse; min-width: 220px;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 6px 18px;"></th><th style="padding: 6px 18px;">B = 0</th><th style="padding: 6px 18px;">B = 1</th></tr></thead>
<tbody>
<tr><td style="padding: 6px 18px; font-weight: 700; background: #6A5BFF; color: #fff;">A = 0</td><td style="padding: 6px 18px; text-align: center; color: #2E7D32; font-weight: 700; background: #d4edda;">1</td><td style="padding: 6px 18px; text-align: center; color: #2E7D32; font-weight: 700; background: #d4edda;">1</td></tr>
<tr><td style="padding: 6px 18px; font-weight: 700; background: #6A5BFF; color: #fff;">A = 1</td><td style="padding: 6px 18px; text-align: center; background: #f4f4ff;">0</td><td style="padding: 6px 18px; text-align: center; color: #2E7D32; font-weight: 700; background: #d4edda;">1</td></tr>
</tbody>
</table>

<p style="color: #333; font-weight: 700; margin-bottom: 6px;">Groups:</p>
<ul style="margin: 0.3rem 0 0.8rem 0; color: #333; line-height: 1.85;">
<li>Horizontal pair (m<sub>0</sub>, m<sub>1</sub>): A = 0 for both &rarr; <span class="arithmatex">\(\overline{A}\)</span></li>
<li>Vertical pair (m<sub>1</sub>, m<sub>3</sub>): B = 1 for both &rarr; <span class="arithmatex">\(B\)</span></li>
</ul>

<p style="color: #2E7D32; font-weight: 700; font-size: 1.05rem; margin-bottom: 0;">Result: <span class="arithmatex">\(F = \overline{A} + B\)</span></p>

</div>

---

## 5.3 Three-Variable K-Map

The **three-variable K-map** uses a 2×4 grid with one variable on rows and two on columns (or vice versa).

<table style="font-size: 0.92rem; margin: 1.2rem auto; border-collapse: collapse;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 6px 16px;"></th><th style="padding: 6px 16px;">BC = 00</th><th style="padding: 6px 16px;">BC = 01</th><th style="padding: 6px 16px;">BC = 11</th><th style="padding: 6px 16px;">BC = 10</th></tr></thead>
<tbody>
<tr><td style="padding: 6px 16px; font-weight: 700; background: #6A5BFF; color: #fff;">A = 0</td><td style="padding: 6px 16px; text-align: center;">m<sub>0</sub></td><td style="padding: 6px 16px; text-align: center;">m<sub>1</sub></td><td style="padding: 6px 16px; text-align: center;">m<sub>3</sub></td><td style="padding: 6px 16px; text-align: center;">m<sub>2</sub></td></tr>
<tr><td style="padding: 6px 16px; font-weight: 700; background: #6A5BFF; color: #fff;">A = 1</td><td style="padding: 6px 16px; text-align: center; background: #f4f4ff;">m<sub>4</sub></td><td style="padding: 6px 16px; text-align: center; background: #f4f4ff;">m<sub>5</sub></td><td style="padding: 6px 16px; text-align: center; background: #f4f4ff;">m<sub>7</sub></td><td style="padding: 6px 16px; text-align: center; background: #f4f4ff;">m<sub>6</sub></td></tr>
</tbody>
</table>

Note the **Gray code order** for BC: 00, 01, 11, 10 (not binary order 00, 01, 10, 11). This ensures adjacent columns differ by exactly one bit.

### K-Map Adjacency in 3-Variable Maps

**Physical adjacency** on the map corresponds to **logical adjacency** (differing by one variable):

- Horizontally adjacent cells differ in one column variable
- Vertically adjacent cells differ in the row variable
- **The left and right edges wrap around** (column 00 is adjacent to column 10)

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Example: Simplify <span class="arithmatex">\(F(A,B,C) = \Sigma m(0,2,4,5,6)\)</span></p>

<table style="font-size: 0.92rem; margin: 1rem auto; border-collapse: collapse;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 6px 16px;"></th><th style="padding: 6px 16px;">BC = 00</th><th style="padding: 6px 16px;">BC = 01</th><th style="padding: 6px 16px;">BC = 11</th><th style="padding: 6px 16px;">BC = 10</th></tr></thead>
<tbody>
<tr><td style="padding: 6px 16px; font-weight: 700; background: #6A5BFF; color: #fff;">A = 0</td><td style="padding: 6px 16px; text-align: center; color: #2E7D32; font-weight: 700; background: #d4edda;">1</td><td style="padding: 6px 16px; text-align: center;">0</td><td style="padding: 6px 16px; text-align: center;">0</td><td style="padding: 6px 16px; text-align: center; color: #2E7D32; font-weight: 700; background: #d4edda;">1</td></tr>
<tr><td style="padding: 6px 16px; font-weight: 700; background: #6A5BFF; color: #fff;">A = 1</td><td style="padding: 6px 16px; text-align: center; color: #2E7D32; font-weight: 700; background: #d4edda;">1</td><td style="padding: 6px 16px; text-align: center; color: #2E7D32; font-weight: 700; background: #d4edda;">1</td><td style="padding: 6px 16px; text-align: center; background: #f4f4ff;">0</td><td style="padding: 6px 16px; text-align: center; color: #2E7D32; font-weight: 700; background: #d4edda;">1</td></tr>
</tbody>
</table>

<p style="color: #333; font-weight: 700; margin-bottom: 6px;">Groups:</p>
<ul style="margin: 0.3rem 0 0.8rem 0; color: #333; line-height: 1.85;">
<li>Wrap-around group (m<sub>0</sub>, m<sub>2</sub>, m<sub>4</sub>, m<sub>6</sub>) spans columns 00 and 10 &rarr; <span class="arithmatex">\(\overline{C}\)</span></li>
<li>Remaining 1: m<sub>5</sub>, covered by pair (m<sub>4</sub>, m<sub>5</sub>) &rarr; <span class="arithmatex">\(A\overline{B}\)</span></li>
</ul>

<p style="color: #2E7D32; font-weight: 700; font-size: 1.05rem; margin-bottom: 0;">Result: <span class="arithmatex">\(F = \overline{C} + A\overline{B}\)</span></p>

</div>

#### Diagram: 3-Variable K-Map Simulator

<iframe src="../sims/kmap-3var-simulator/main.html" width="100%" height="550px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>

<details markdown="1">
<summary>3-Variable K-Map Simulator</summary>
Type: microsim

Purpose: Interactive 3-variable K-map for practicing grouping and simplification

Bloom Level: Apply (L3)
Bloom Verb: Apply, solve, simplify

Learning Objective: Students will be able to identify valid groups on a 3-variable K-map and derive the minimal SOP expression.

Canvas Layout:
- Top: Function input (minterm list or truth table)
- Middle: Interactive K-map grid with Gray code labels
- Bottom: Derived expression and verification

Visual Elements:
- 2×4 K-map grid with clear cell boundaries
- Gray code labels for rows (A) and columns (BC)
- Cell values displayed (0, 1, X)
- Grouping visualization:
  - Click and drag to create rectangular groups
  - Color-coded groups (different colors for different groups)
  - Semi-transparent overlays for overlapping groups
- Wrap-around indication (visual connection between left and right edges)
- Expression builder showing contribution from each group

Interactive Controls:
- Click cells to toggle values (0 → 1 → X → 0)
- Enter minterm list to populate K-map
- Draw groups by clicking/dragging
- "Auto-Group" button for automatic optimal grouping
- "Clear Groups" button
- "Check Expression" to verify minimality
- "Show All Prime Implicants" toggle

Data Visibility Requirements:
- Highlight which variable is eliminated by each group
- Show the product term contributed by each group
- Display literal count for current solution
- Indicate if current grouping is minimal

Default Parameters:
- Function: Σm(1,3,5,7) = C (simple example)
- Groups: Auto-generated

Behavior:
- Validate group sizes (powers of 2)
- Validate rectangular shapes
- Check that all 1s are covered
- Allow overlapping groups
- Warn if non-minimal solution detected

Instructional Rationale: Hands-on grouping practice builds intuition for identifying optimal simplifications.

Implementation: p5.js with interactive canvas
</details>

---

## 5.4 Four-Variable K-Map

The **four-variable K-map** is the most commonly used size, with 16 cells in a 4×4 grid.

<table style="font-size: 0.92rem; margin: 1.2rem auto; border-collapse: collapse;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 6px 14px;"></th><th style="padding: 6px 14px;">CD = 00</th><th style="padding: 6px 14px;">CD = 01</th><th style="padding: 6px 14px;">CD = 11</th><th style="padding: 6px 14px;">CD = 10</th></tr></thead>
<tbody>
<tr><td style="padding: 6px 14px; font-weight: 700; background: #6A5BFF; color: #fff;">AB = 00</td><td style="padding: 6px 14px; text-align: center;">m<sub>0</sub></td><td style="padding: 6px 14px; text-align: center;">m<sub>1</sub></td><td style="padding: 6px 14px; text-align: center;">m<sub>3</sub></td><td style="padding: 6px 14px; text-align: center;">m<sub>2</sub></td></tr>
<tr><td style="padding: 6px 14px; font-weight: 700; background: #6A5BFF; color: #fff;">AB = 01</td><td style="padding: 6px 14px; text-align: center; background: #f4f4ff;">m<sub>4</sub></td><td style="padding: 6px 14px; text-align: center; background: #f4f4ff;">m<sub>5</sub></td><td style="padding: 6px 14px; text-align: center; background: #f4f4ff;">m<sub>7</sub></td><td style="padding: 6px 14px; text-align: center; background: #f4f4ff;">m<sub>6</sub></td></tr>
<tr><td style="padding: 6px 14px; font-weight: 700; background: #6A5BFF; color: #fff;">AB = 11</td><td style="padding: 6px 14px; text-align: center;">m<sub>12</sub></td><td style="padding: 6px 14px; text-align: center;">m<sub>13</sub></td><td style="padding: 6px 14px; text-align: center;">m<sub>15</sub></td><td style="padding: 6px 14px; text-align: center;">m<sub>14</sub></td></tr>
<tr><td style="padding: 6px 14px; font-weight: 700; background: #6A5BFF; color: #fff;">AB = 10</td><td style="padding: 6px 14px; text-align: center; background: #f4f4ff;">m<sub>8</sub></td><td style="padding: 6px 14px; text-align: center; background: #f4f4ff;">m<sub>9</sub></td><td style="padding: 6px 14px; text-align: center; background: #f4f4ff;">m<sub>11</sub></td><td style="padding: 6px 14px; text-align: center; background: #f4f4ff;">m<sub>10</sub></td></tr>
</tbody>
</table>

Both row labels (AB) and column labels (CD) use Gray code order: 00, 01, 11, 10.

### Adjacencies in 4-Variable K-Maps

In a 4-variable K-map:

- **Horizontal adjacency:** Left-right neighbors (including wrap from column 10 to 00)
- **Vertical adjacency:** Top-bottom neighbors (including wrap from row 10 to 00)
- **Corner grouping:** All four corners are mutually adjacent (wrap both ways)

The 4-variable K-map forms a **torus** topology—imagine wrapping the map into a donut shape where both top/bottom and left/right edges connect.

### Wrapping in K-Maps

**Wrapping** is a critical concept: the edges of the K-map connect to form adjacencies:

- **Horizontal wrap:** Column 00 is adjacent to column 10
- **Vertical wrap:** Row 00 is adjacent to row 10
- **Corner wrap:** Cells at the four corners (m₀, m₂, m₈, m₁₀) are all mutually adjacent

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Example: Four corner cells form a valid group of 4</p>

<table style="font-size: 0.92rem; margin: 1rem auto; border-collapse: collapse;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 6px 14px;"></th><th style="padding: 6px 14px;">CD = 00</th><th style="padding: 6px 14px;">CD = 01</th><th style="padding: 6px 14px;">CD = 11</th><th style="padding: 6px 14px;">CD = 10</th></tr></thead>
<tbody>
<tr><td style="padding: 6px 14px; font-weight: 700; background: #6A5BFF; color: #fff;">AB = 00</td><td style="padding: 6px 14px; text-align: center; color: #2E7D32; font-weight: 700; background: #d4edda;">1</td><td style="padding: 6px 14px; text-align: center;">0</td><td style="padding: 6px 14px; text-align: center;">0</td><td style="padding: 6px 14px; text-align: center; color: #2E7D32; font-weight: 700; background: #d4edda;">1</td></tr>
<tr><td style="padding: 6px 14px; font-weight: 700; background: #6A5BFF; color: #fff;">AB = 01</td><td style="padding: 6px 14px; text-align: center; background: #f4f4ff;">0</td><td style="padding: 6px 14px; text-align: center; background: #f4f4ff;">0</td><td style="padding: 6px 14px; text-align: center; background: #f4f4ff;">0</td><td style="padding: 6px 14px; text-align: center; background: #f4f4ff;">0</td></tr>
<tr><td style="padding: 6px 14px; font-weight: 700; background: #6A5BFF; color: #fff;">AB = 11</td><td style="padding: 6px 14px; text-align: center;">0</td><td style="padding: 6px 14px; text-align: center;">0</td><td style="padding: 6px 14px; text-align: center;">0</td><td style="padding: 6px 14px; text-align: center;">0</td></tr>
<tr><td style="padding: 6px 14px; font-weight: 700; background: #6A5BFF; color: #fff;">AB = 10</td><td style="padding: 6px 14px; text-align: center; color: #2E7D32; font-weight: 700; background: #d4edda;">1</td><td style="padding: 6px 14px; text-align: center; background: #f4f4ff;">0</td><td style="padding: 6px 14px; text-align: center; background: #f4f4ff;">0</td><td style="padding: 6px 14px; text-align: center; color: #2E7D32; font-weight: 700; background: #d4edda;">1</td></tr>
</tbody>
</table>

<p style="color: #333; line-height: 1.75; margin-bottom: 0;">The green-highlighted corner cells form one group: <span class="arithmatex">\(\overline{B}\,\overline{D}\)</span> (B = 0 and D = 0 for all four).</p>

</div>

#### Diagram: K-Map Solver

<iframe src="../sims/kmap-solver/main.html" width="100%" height="550px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>

<details markdown="1">
<summary>4-Variable K-Map Simulator</summary>
Type: microsim

Purpose: Interactive 4-variable K-map with comprehensive grouping and simplification tools

Bloom Level: Apply (L3)
Bloom Verb: Apply, simplify, construct

Learning Objective: Students will be able to identify all valid groups on a 4-variable K-map, including wrap-around and corner groups, and derive minimal SOP and POS expressions.

Canvas Layout:
- Top: Function input (minterm list, maxterm list, or expression)
- Middle: Interactive 4×4 K-map grid
- Right: Group list and expression builder
- Bottom: Final expression with metrics

Visual Elements:
- 4×4 K-map grid with Gray code labels (AB rows, CD columns)
- Minterm numbers displayed in cells (toggleable)
- Grouping with colored overlays
- Wrap-around visualization:
  - Ghost cells showing wrapped adjacencies
  - Connecting lines for wrap groups
- Group contribution panel showing each group's term
- Expression display (SOP and POS options)

Interactive Controls:
- Enter function as Σm(), ΠM(), or Boolean expression
- Click cells to toggle 0/1/X
- Click-drag to create groups (auto-validates shape and size)
- "Find All Prime Implicants" button
- "Highlight Essential PIs" button
- "Auto-Solve" for optimal solution
- Toggle SOP vs POS mode
- "Compare Solutions" for cases with multiple minimals

Data Visibility Requirements:
- Show variable values along edges
- Display minterm index in each cell (toggleable)
- Color-code prime implicants vs non-prime groups
- Highlight essential prime implicants distinctly
- Show literal count and gate count for expression

Default Parameters:
- Function: Σm(0,2,5,7,8,10,13,15)
- Mode: SOP
- Show minterm numbers: Yes

Behavior:
- Validate groups (power of 2, rectangular)
- Detect and highlight wrap-around groups
- Identify prime implicants automatically
- Flag essential prime implicants
- Detect multiple minimal solutions
- Compare SOP vs POS complexity

Instructional Rationale: The 4-variable K-map is the workhorse of digital design; mastery enables practical circuit optimization.

Implementation: p5.js with interactive canvas
</details>

---

## 5.5 Valid Groups and Grouping Rules

### Valid Group Sizes

Groups in a K-map must contain a **power of 2** cells: 1, 2, 4, 8, 16, etc. Each doubling of group size eliminates one variable from the product term.

<table style="font-size: 0.92rem; margin: 1.2rem auto; border-collapse: collapse;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 6px 18px;">Group Size</th><th style="padding: 6px 18px;">Variables Eliminated</th><th style="padding: 6px 18px;">Literals in Term</th></tr></thead>
<tbody>
<tr><td style="padding: 6px 18px; text-align: center; font-weight: 700;">1</td><td style="padding: 6px 18px; text-align: center;">0</td><td style="padding: 6px 18px; text-align: center;">n (all variables)</td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 6px 18px; text-align: center; font-weight: 700;">2</td><td style="padding: 6px 18px; text-align: center;">1</td><td style="padding: 6px 18px; text-align: center;">n &minus; 1</td></tr>
<tr><td style="padding: 6px 18px; text-align: center; font-weight: 700;">4</td><td style="padding: 6px 18px; text-align: center;">2</td><td style="padding: 6px 18px; text-align: center;">n &minus; 2</td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 6px 18px; text-align: center; font-weight: 700;">8</td><td style="padding: 6px 18px; text-align: center;">3</td><td style="padding: 6px 18px; text-align: center;">n &minus; 3</td></tr>
<tr><td style="padding: 6px 18px; text-align: center; font-weight: 700;">16</td><td style="padding: 6px 18px; text-align: center;">4</td><td style="padding: 6px 18px; text-align: center;">0 (constant 1)</td></tr>
</tbody>
</table>

### Rectangular Groups

Groups must form **rectangles** (including squares) on the K-map. The rectangle can wrap around edges but must maintain its rectangular shape conceptually.

<div style="display: flex; gap: 1.5rem; flex-wrap: wrap; margin: 1rem 0;">

<div style="flex: 1; min-width: 200px; background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 16px 20px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0; margin-bottom: 8px;">Valid groups:</p>
<ul style="margin: 0; color: #333; line-height: 1.85; padding-left: 1.2rem;">
<li>1&times;1 (single cell)</li>
<li>1&times;2 or 2&times;1 (pair)</li>
<li>1&times;4, 4&times;1, or 2&times;2 (quad)</li>
<li>1&times;8, 8&times;1, 2&times;4, or 4&times;2 (octet)</li>
<li>4&times;4 (16 cells)</li>
</ul>
</div>

<div style="flex: 1; min-width: 200px; background: #FFEBEE; border: 2px solid #E57373; border-radius: 10px; padding: 16px 20px;">
<p style="color: #C62828; font-weight: 700; margin-top: 0; margin-bottom: 8px;">Invalid groups:</p>
<ul style="margin: 0; color: #333; line-height: 1.85; padding-left: 1.2rem;">
<li>L-shaped</li>
<li>T-shaped</li>
<li>Diagonal</li>
<li>Non-power-of-2 sizes (3, 5, 6, etc.)</li>
</ul>
</div>

</div>

### Grouping for SOP vs POS

<div style="display: flex; gap: 1.5rem; flex-wrap: wrap; margin: 1rem 0;">

<div style="flex: 1; min-width: 200px; background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 16px 20px;">
<p style="color: #1565C0; font-weight: 700; margin-top: 0; margin-bottom: 8px;">SOP &mdash; Group the 1s</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">Each group of 1s becomes a <strong>product term</strong> in the sum.</p>
</div>

<div style="flex: 1; min-width: 200px; background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 10px; padding: 16px 20px;">
<p style="color: #B8860B; font-weight: 700; margin-top: 0; margin-bottom: 8px;">POS &mdash; Group the 0s</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">Each group of 0s becomes a <strong>sum term</strong> in the product.</p>
</div>

</div>

### Overlapping Groups

**Overlapping groups** are allowed and often necessary for minimal expressions. A cell can belong to multiple groups—this doesn't duplicate it in the final expression; it just means that cell's minterm is covered by multiple product terms.

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Example: Overlapping groups are beneficial</p>

<table style="font-size: 0.92rem; margin: 1rem auto; border-collapse: collapse;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 6px 14px;"></th><th style="padding: 6px 14px;">CD = 00</th><th style="padding: 6px 14px;">CD = 01</th><th style="padding: 6px 14px;">CD = 11</th><th style="padding: 6px 14px;">CD = 10</th></tr></thead>
<tbody>
<tr><td style="padding: 6px 14px; font-weight: 700; background: #6A5BFF; color: #fff;">AB = 00</td><td style="padding: 6px 14px; text-align: center; color: #2E7D32; font-weight: 700; background: #d4edda;">1</td><td style="padding: 6px 14px; text-align: center; color: #2E7D32; font-weight: 700; background: #d4edda;">1</td><td style="padding: 6px 14px; text-align: center;">0</td><td style="padding: 6px 14px; text-align: center;">0</td></tr>
<tr><td style="padding: 6px 14px; font-weight: 700; background: #6A5BFF; color: #fff;">AB = 01</td><td style="padding: 6px 14px; text-align: center; color: #2E7D32; font-weight: 700; background: #d4edda;">1</td><td style="padding: 6px 14px; text-align: center; color: #2E7D32; font-weight: 700; background: #ffe0b2;">1</td><td style="padding: 6px 14px; text-align: center; color: #2E7D32; font-weight: 700; background: #ffe0b2;">1</td><td style="padding: 6px 14px; text-align: center; background: #f4f4ff;">0</td></tr>
</tbody>
</table>

<p style="color: #333; line-height: 1.75; margin-bottom: 6px;"><strong>Group 1</strong> <span style="display: inline-block; width: 12px; height: 12px; background: #d4edda; border: 1px solid #81C784; border-radius: 2px; vertical-align: middle;"></span> (m<sub>0</sub>, m<sub>1</sub>, m<sub>4</sub>, m<sub>5</sub>): <span class="arithmatex">\(\overline{A}\,\overline{C}\)</span> &mdash; A = 0, C = 0 for all four cells</p>

<p style="color: #333; line-height: 1.75; margin-bottom: 6px;"><strong>Group 2</strong> <span style="display: inline-block; width: 12px; height: 12px; background: #ffe0b2; border: 1px solid #F0D87A; border-radius: 2px; vertical-align: middle;"></span> (m<sub>5</sub>, m<sub>7</sub>): <span class="arithmatex">\(\overline{A}\,B\,D\)</span> &mdash; A = 0, B = 1, D = 1 for both cells</p>

<p style="color: #333; line-height: 1.75;">Cell m<sub>5</sub> belongs to <em>both</em> groups (shown in orange). The overlap does not cause duplication.</p>

<p style="color: #2E7D32; font-weight: 700; font-size: 1.05rem; margin-bottom: 0;">Result: <span class="arithmatex">\(F = \overline{A}\,\overline{C} + \overline{A}\,B\,D\)</span></p>

</div>

---

## 5.6 Implicants and Prime Implicants

### Implicants

An **implicant** is any product term that covers one or more minterms of the function. Every minterm is an implicant, and any valid K-map group represents an implicant.

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Example: Implicants for <span class="arithmatex">\(F = \Sigma m(1,3,5,7)\)</span></p>

<ul style="margin: 0; color: #333; line-height: 2;">
<li><span class="arithmatex">\(m_1 = \overline{A}\,\overline{B}\,C\)</span> is an implicant (covers m<sub>1</sub>)</li>
<li><span class="arithmatex">\(\overline{A}\,C\)</span> is an implicant (covers m<sub>1</sub> and m<sub>3</sub>)</li>
<li><span class="arithmatex">\(C\)</span> is an implicant (covers m<sub>1</sub>, m<sub>3</sub>, m<sub>5</sub>, m<sub>7</sub>)</li>
</ul>

</div>

### Prime Implicants

A **prime implicant** is an implicant that cannot be combined with another implicant to form a larger group. It represents the largest possible grouping containing a particular set of minterms.

**Finding prime implicants:** A group is prime if it cannot be expanded (doubled in size) while remaining a valid group of 1s.

In the example above, $C$ is the only prime implicant—it covers all 1s and cannot be made larger.

### Essential Prime Implicants

An **essential prime implicant** is a prime implicant that covers at least one minterm not covered by any other prime implicant. Essential prime implicants **must** be included in any minimal solution.

<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin: 1rem 0;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0; margin-bottom: 8px;">Finding Essential PIs:</p>
<ol style="margin: 0; color: #333; line-height: 2; padding-left: 1.5rem;">
<li>Identify all prime implicants</li>
<li>For each minterm, list which PIs cover it</li>
<li>If a minterm is covered by only one PI, that PI is essential</li>
</ol>
</div>

### Redundant Prime Implicants

A **redundant prime implicant** is a prime implicant that is not needed because all its minterms are already covered by essential prime implicants or other selected PIs.

### Systematic Minimization Procedure

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 22px 26px; margin: 1rem 0;">
<ol style="margin: 0; color: #333; line-height: 2.2; padding-left: 1.5rem;">
<li><strong>Find all prime implicants</strong> (largest possible groups)</li>
<li><strong>Identify essential prime implicants</strong> (must include)</li>
<li><strong>Select additional PIs</strong> to cover remaining minterms (minimize overlap)</li>
<li><strong>The selected PIs</strong> form the minimal expression</li>
</ol>
</div>

#### Diagram: Prime Implicant Finder

<iframe src="../sims/prime-implicant-finder/main.html" width="100%" height="600px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>

<details markdown="1">
<summary>Prime Implicant Finder</summary>
Type: microsim

Purpose: Systematically identify prime implicants and essential prime implicants on a K-map

Bloom Level: Analyze (L4)
Bloom Verb: Identify, classify, distinguish

Learning Objective: Students will be able to identify all prime implicants, determine which are essential, and construct a minimal cover.

Canvas Layout:
- Left: K-map with prime implicant visualization
- Right: Prime implicant table and coverage chart
- Bottom: Minimal expression construction

Visual Elements:
- K-map with numbered cells
- Each prime implicant shown as colored overlay
- Prime implicant table listing:
  - PI designation (A, B, C, ...)
  - Product term
  - Covered minterms
  - Essential? (star marker)
- Coverage chart (PI vs minterm matrix)
- Checkmarks showing which minterms each PI covers
- Highlight for essential PIs

Interactive Controls:
- Enter function (minterm list)
- "Find All PIs" button
- Click on K-map to highlight individual PIs
- "Mark Essentials" to identify essential PIs
- "Build Minimal Cover" step-by-step
- Toggle between showing all PIs vs selected cover
- "Compare Solutions" when multiple minimals exist

Data Visibility Requirements:
- List all prime implicants with their terms
- Show minterm coverage for each PI
- Highlight minterms covered by only one PI (identifying essentials)
- Display the selection process for non-essential PIs
- Show final minimal expression

Default Parameters:
- Function: Σm(0,1,2,5,6,7,8,9,14)
- Variables: 4

Behavior:
- Automatically find all prime implicants
- Automatically identify essential PIs
- Show multiple valid solutions when they exist
- Animate the coverage selection process
- Verify completeness of cover

Instructional Rationale: Understanding the PI/EPI distinction is crucial for systematic minimization and explains why certain groupings are mandatory.

Implementation: p5.js with data visualization
</details>

---

## 5.7 K-Map SOP Simplification

**K-Map SOP simplification** produces a minimal Sum of Products expression.

### Procedure for Minimal SOP

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 22px 26px; margin: 1rem 0;">
<ol style="margin: 0; color: #333; line-height: 2.2; padding-left: 1.5rem;">
<li><strong>Plot the function:</strong> Place 1s in cells corresponding to minterms where F = 1</li>
<li><strong>Identify all prime implicants:</strong> Find all maximal groups of 1s</li>
<li><strong>Select essential prime implicants:</strong> Include all PIs that cover unique minterms</li>
<li><strong>Cover remaining minterms:</strong> Add minimum additional PIs</li>
<li><strong>Write the expression:</strong> OR together the product terms from selected groups</li>
</ol>
</div>

### Reading Product Terms from Groups

For each group, identify the variables that have **constant value** across the group:

<table style="font-size: 0.92rem; margin: 1rem auto; border-collapse: collapse;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 6px 18px;">Variable Behavior</th><th style="padding: 6px 18px;">Action</th></tr></thead>
<tbody>
<tr><td style="padding: 6px 18px;">= 1 in all cells</td><td style="padding: 6px 18px;">Include <strong>uncomplemented</strong></td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 6px 18px;">= 0 in all cells</td><td style="padding: 6px 18px;">Include <strong>complemented</strong></td></tr>
<tr><td style="padding: 6px 18px;">Changes across cells</td><td style="padding: 6px 18px;"><strong>Omit</strong> from term</td></tr>
</tbody>
</table>

**Example:** A group covering cells where A=1, B varies, C=0, D varies:
The term is $A\overline{C}$ (only A and C are constant).

### Covering All Ones

The goal is **covering all ones** with the minimum number of prime implicants. Every cell containing 1 must be included in at least one selected group.

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Example: Simplify <span class="arithmatex">\(F(A,B,C,D) = \Sigma m(0,1,2,4,5,6,8,9,12,13,14)\)</span></p>

<table style="font-size: 0.92rem; margin: 1rem auto; border-collapse: collapse;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 6px 14px;"></th><th style="padding: 6px 14px;">CD = 00</th><th style="padding: 6px 14px;">CD = 01</th><th style="padding: 6px 14px;">CD = 11</th><th style="padding: 6px 14px;">CD = 10</th></tr></thead>
<tbody>
<tr><td style="padding: 6px 14px; font-weight: 700; background: #6A5BFF; color: #fff;">AB = 00</td><td style="padding: 6px 14px; text-align: center; color: #2E7D32; font-weight: 700; background: #d4edda;">1</td><td style="padding: 6px 14px; text-align: center; color: #2E7D32; font-weight: 700; background: #d4edda;">1</td><td style="padding: 6px 14px; text-align: center;">0</td><td style="padding: 6px 14px; text-align: center; color: #2E7D32; font-weight: 700; background: #d4edda;">1</td></tr>
<tr><td style="padding: 6px 14px; font-weight: 700; background: #6A5BFF; color: #fff;">AB = 01</td><td style="padding: 6px 14px; text-align: center; color: #2E7D32; font-weight: 700; background: #d4edda;">1</td><td style="padding: 6px 14px; text-align: center; color: #2E7D32; font-weight: 700; background: #d4edda;">1</td><td style="padding: 6px 14px; text-align: center; background: #f4f4ff;">0</td><td style="padding: 6px 14px; text-align: center; color: #2E7D32; font-weight: 700; background: #d4edda;">1</td></tr>
<tr><td style="padding: 6px 14px; font-weight: 700; background: #6A5BFF; color: #fff;">AB = 11</td><td style="padding: 6px 14px; text-align: center; color: #2E7D32; font-weight: 700; background: #d4edda;">1</td><td style="padding: 6px 14px; text-align: center; color: #2E7D32; font-weight: 700; background: #d4edda;">1</td><td style="padding: 6px 14px; text-align: center;">0</td><td style="padding: 6px 14px; text-align: center; color: #2E7D32; font-weight: 700; background: #d4edda;">1</td></tr>
<tr><td style="padding: 6px 14px; font-weight: 700; background: #6A5BFF; color: #fff;">AB = 10</td><td style="padding: 6px 14px; text-align: center; color: #2E7D32; font-weight: 700; background: #d4edda;">1</td><td style="padding: 6px 14px; text-align: center; color: #2E7D32; font-weight: 700; background: #d4edda;">1</td><td style="padding: 6px 14px; text-align: center; background: #f4f4ff;">0</td><td style="padding: 6px 14px; text-align: center; background: #f4f4ff;">0</td></tr>
</tbody>
</table>

<p style="color: #333; font-weight: 700; margin-bottom: 6px;">Prime implicants (all essential):</p>
<ul style="margin: 0.3rem 0 0.8rem 0; color: #333; line-height: 2;">
<li><span class="arithmatex">\(\overline{C}\)</span> &mdash; columns 00 and 01, all rows (covers m<sub>0</sub>, m<sub>1</sub>, m<sub>4</sub>, m<sub>5</sub>, m<sub>8</sub>, m<sub>9</sub>, m<sub>12</sub>, m<sub>13</sub>)</li>
<li><span class="arithmatex">\(\overline{A}\,\overline{D}\)</span> &mdash; rows 00, 01, columns 00 and 10 wrapping (only PI covering m<sub>2</sub>)</li>
<li><span class="arithmatex">\(B\,\overline{D}\)</span> &mdash; rows 01, 11, columns 00 and 10 wrapping (only PI covering m<sub>14</sub>)</li>
</ul>

<p style="color: #2E7D32; font-weight: 700; font-size: 1.05rem; margin-bottom: 0;">Result: <span class="arithmatex">\(F = \overline{C} + \overline{A}\,\overline{D} + B\,\overline{D}\)</span></p>

</div>

---

## 5.8 K-Map POS Simplification

**K-Map POS simplification** produces a minimal Product of Sums expression by grouping 0s instead of 1s.

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #8D6E00; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Procedure for Minimal POS</p>

<ol style="margin: 0; line-height: 2.2; color: #333; padding-left: 1.5rem;">
<li><strong>Plot the function:</strong> Place 0s in cells where F = 0</li>
<li><strong>Group the 0s:</strong> Find all prime implicants of <span class="arithmatex">\(\overline{F}\)</span></li>
<li><strong>Write each group as a sum term:</strong>
<ul style="margin: 0.3rem 0; line-height: 2;">
<li>Variable = 0 in all cells &rarr; include <em>uncomplemented</em></li>
<li>Variable = 1 in all cells &rarr; include <em>complemented</em></li>
<li>(Opposite of SOP rule!)</li>
</ul></li>
<li><strong>AND all sum terms together</strong></li>
</ol>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Reading Sum Terms from Groups of Zeros</p>

<p style="color: #333; margin-bottom: 12px;">For a group of 0s, the sum term includes:</p>

<table style="font-size: 0.92rem; margin: 0.8rem auto; border-collapse: collapse; width: 90%;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 8px 16px; text-align: left;">Condition</th><th style="padding: 8px 16px; text-align: left;">Action</th></tr></thead>
<tbody>
<tr><td style="padding: 8px 16px; border-bottom: 1px solid #ddd;">Variable is <strong>0</strong> throughout the group</td><td style="padding: 8px 16px; border-bottom: 1px solid #ddd;">Include <strong>uncomplemented</strong></td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 8px 16px; border-bottom: 1px solid #ddd;">Variable is <strong>1</strong> throughout the group</td><td style="padding: 8px 16px; border-bottom: 1px solid #ddd;">Include <strong>complemented</strong></td></tr>
<tr><td style="padding: 8px 16px;">Variable <strong>changes</strong></td><td style="padding: 8px 16px;"><strong>Omit</strong> from sum term</td></tr>
</tbody>
</table>

<p style="color: #666; font-style: italic; margin-bottom: 0;">This is the dual of the SOP rule &mdash; the goal is <strong>covering all zeros</strong> with the minimum number of groups.</p>

</div>

### Choosing SOP vs POS

Compare the literal counts of minimal SOP and minimal POS — choose the simpler form.

<div style="display: flex; gap: 18px; flex-wrap: wrap; margin: 1.2rem 0;">
<div style="flex: 1; min-width: 180px; background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 18px 20px;">
<p style="color: #1565C0; font-weight: 700; margin-top: 0; margin-bottom: 8px;">SOP likely simpler</p>
<p style="color: #333; margin: 0; font-size: 0.95rem;">Few 1s, many 0s &mdash; fewer product terms to cover</p>
</div>
<div style="flex: 1; min-width: 180px; background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 10px; padding: 18px 20px;">
<p style="color: #8D6E00; font-weight: 700; margin-top: 0; margin-bottom: 8px;">POS likely simpler</p>
<p style="color: #333; margin: 0; font-size: 0.95rem;">Few 0s, many 1s &mdash; fewer sum terms to cover</p>
</div>
<div style="flex: 1; min-width: 180px; background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 20px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0; margin-bottom: 8px;">Balanced</p>
<p style="color: #333; margin: 0; font-size: 0.95rem;">Always check <strong>both</strong> SOP and POS forms</p>
</div>
</div>

<table style="font-size: 0.92rem; margin: 1rem auto; border-collapse: collapse; width: 80%;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 8px 16px;">Function Characteristic</th><th style="padding: 8px 16px;">Likely Simpler Form</th></tr></thead>
<tbody>
<tr><td style="padding: 8px 16px; border-bottom: 1px solid #ddd;">Few 1s, many 0s</td><td style="padding: 8px 16px; border-bottom: 1px solid #ddd; text-align: center; font-weight: 600;">SOP</td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 8px 16px; border-bottom: 1px solid #ddd;">Few 0s, many 1s</td><td style="padding: 8px 16px; border-bottom: 1px solid #ddd; text-align: center; font-weight: 600;">POS</td></tr>
<tr><td style="padding: 8px 16px;">Balanced</td><td style="padding: 8px 16px; text-align: center; font-weight: 600;">Check both</td></tr>
</tbody>
</table>

---

## 5.9 K-Maps with Don't Cares

**K-maps with don't cares** include cells marked with X (or d) representing input combinations where the output doesn't matter.

<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #2E7D32; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Using Don't Cares</p>

<div style="display: flex; gap: 18px; flex-wrap: wrap; margin-bottom: 14px;">
<div style="flex: 1; min-width: 200px; background: #fff; border-radius: 8px; padding: 14px 16px;">
<p style="color: #1565C0; font-weight: 700; margin-top: 0; margin-bottom: 6px;">For SOP</p>
<p style="color: #333; margin: 0; font-size: 0.95rem;">Treat don't cares as <strong>1s</strong> if they help form larger groups</p>
</div>
<div style="flex: 1; min-width: 200px; background: #fff; border-radius: 8px; padding: 14px 16px;">
<p style="color: #8D6E00; font-weight: 700; margin-top: 0; margin-bottom: 6px;">For POS</p>
<p style="color: #333; margin: 0; font-size: 0.95rem;">Treat don't cares as <strong>0s</strong> if they help form larger groups</p>
</div>
</div>

<p style="color: #333; margin-bottom: 6px;">The optimizer chooses the most beneficial assignment for each don't care <strong>independently</strong>.</p>
<p style="color: #C62828; font-weight: 600; margin-bottom: 0;">Don't cares are NOT required to be covered. They only help if they extend a group.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Example: <span class="arithmatex">\(F(A,B,C,D) = \Sigma m(1,3,7,11,15) + d(0,2,5)\)</span></p>

<table style="font-size: 0.92rem; margin: 1rem auto; border-collapse: collapse;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 6px 14px;"></th><th style="padding: 6px 14px;">CD = 00</th><th style="padding: 6px 14px;">CD = 01</th><th style="padding: 6px 14px;">CD = 11</th><th style="padding: 6px 14px;">CD = 10</th></tr></thead>
<tbody>
<tr><td style="padding: 6px 14px; font-weight: 700; background: #6A5BFF; color: #fff;">AB = 00</td><td style="padding: 6px 14px; text-align: center; color: #F57C00; font-weight: 700; background: #fff3e0;">X</td><td style="padding: 6px 14px; text-align: center; color: #2E7D32; font-weight: 700; background: #d4edda;">1</td><td style="padding: 6px 14px; text-align: center; color: #2E7D32; font-weight: 700; background: #d4edda;">1</td><td style="padding: 6px 14px; text-align: center; color: #F57C00; font-weight: 700; background: #fff3e0;">X</td></tr>
<tr><td style="padding: 6px 14px; font-weight: 700; background: #6A5BFF; color: #fff;">AB = 01</td><td style="padding: 6px 14px; text-align: center;">0</td><td style="padding: 6px 14px; text-align: center; color: #F57C00; font-weight: 700; background: #fff3e0;">X</td><td style="padding: 6px 14px; text-align: center; color: #2E7D32; font-weight: 700; background: #d4edda;">1</td><td style="padding: 6px 14px; text-align: center; background: #f4f4ff;">0</td></tr>
<tr><td style="padding: 6px 14px; font-weight: 700; background: #6A5BFF; color: #fff;">AB = 11</td><td style="padding: 6px 14px; text-align: center;">0</td><td style="padding: 6px 14px; text-align: center; background: #f4f4ff;">0</td><td style="padding: 6px 14px; text-align: center; color: #2E7D32; font-weight: 700; background: #d4edda;">1</td><td style="padding: 6px 14px; text-align: center;">0</td></tr>
<tr><td style="padding: 6px 14px; font-weight: 700; background: #6A5BFF; color: #fff;">AB = 10</td><td style="padding: 6px 14px; text-align: center; background: #f4f4ff;">0</td><td style="padding: 6px 14px; text-align: center;">0</td><td style="padding: 6px 14px; text-align: center; color: #2E7D32; font-weight: 700; background: #d4edda;">1</td><td style="padding: 6px 14px; text-align: center; background: #f4f4ff;">0</td></tr>
</tbody>
</table>

<p style="color: #333; margin-bottom: 8px;"><strong>Without don't cares:</strong> Would need to cover m<sub>1</sub>, m<sub>3</sub>, m<sub>7</sub>, m<sub>11</sub>, m<sub>15</sub></p>

<p style="color: #333; margin-bottom: 6px;"><strong>With don't cares:</strong></p>
<ul style="margin: 0.3rem 0 0.8rem 0; color: #333; line-height: 2;">
<li>Treat m<sub>0</sub> and m<sub>2</sub> as 1s to form group (m<sub>0</sub>, m<sub>1</sub>, m<sub>2</sub>, m<sub>3</sub>): <span class="arithmatex">\(\overline{A}\,\overline{B}\)</span></li>
<li>Column CD = 11 (m<sub>3</sub>, m<sub>7</sub>, m<sub>11</sub>, m<sub>15</sub>): <span class="arithmatex">\(CD\)</span></li>
</ul>

<p style="color: #2E7D32; font-weight: 700; font-size: 1.05rem; margin-bottom: 0;">Result: <span class="arithmatex">\(F = \overline{A}\,\overline{B} + CD\)</span> &mdash; much simpler than without don't cares!</p>

</div>

#### Diagram: K-Map with Don't Cares

<iframe src="../sims/kmap-dont-cares/main.html" width="100%" height="600px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>

<details markdown="1">
<summary>K-Map with Don't Cares</summary>
Type: microsim

Purpose: Demonstrate how don't care conditions enable simpler expressions through flexible grouping

Bloom Level: Apply (L3)
Bloom Verb: Apply, optimize, simplify

Learning Objective: Students will be able to strategically use don't care conditions to form larger groups and derive simpler expressions.

Canvas Layout:
- Left: K-map with 0, 1, and X cells
- Right: Expression comparison panel
- Bottom: Don't care assignment tracker

Visual Elements:
- K-map with three cell states (0, 1, X)
- X cells shown in distinct color (gray or yellow)
- Grouping overlays showing included don't cares
- Side-by-side comparison:
  - Expression without using don't cares
  - Expression with optimal don't care usage
- Don't care decision list (which Xs treated as 1, which as 0)
- Literal count comparison

Interactive Controls:
- Enter function with don't cares: Σm() + d()
- Click cells to cycle 0 → 1 → X
- "Solve Without Don't Cares" button
- "Solve With Don't Cares" button
- Manual don't care assignment mode
- Show which don't cares are "used" vs "unused"

Data Visibility Requirements:
- Show which don't cares are included in groups
- Display the effective assignment of each X
- Compare literal counts before/after
- Show percentage improvement

Default Parameters:
- Function: Σm(1,3,7,11,15) + d(0,2,5)
- Variables: 4

Behavior:
- Automatically determine optimal don't care assignments
- Show that different assignments yield different expressions
- Verify that required 1s are still covered
- Calculate and display complexity reduction

Instructional Rationale: Understanding strategic don't care usage is essential for practical circuit optimization, especially in BCD applications.

Implementation: p5.js with interactive canvas
</details>

---

## 5.10 Five-Variable K-Maps

The **five-variable K-map** extends the technique to 32 cells, typically displayed as two adjacent 4×4 maps.

### Five-Variable Technique

The **five-variable technique** uses two 4×4 K-maps — one for the fifth variable = 0 and one for = 1:

<div style="display: flex; gap: 24px; flex-wrap: wrap; justify-content: center; margin: 1.5rem 0;">

<div style="flex: 0 1 auto;">
<p style="text-align: center; font-weight: 700; color: #5A3EED; margin-bottom: 8px; font-size: 1.05rem;">E = 0</p>
<table style="font-size: 0.85rem; border-collapse: collapse;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 5px 10px;"></th><th style="padding: 5px 10px;">CD=00</th><th style="padding: 5px 10px;">CD=01</th><th style="padding: 5px 10px;">CD=11</th><th style="padding: 5px 10px;">CD=10</th></tr></thead>
<tbody>
<tr><td style="padding: 5px 10px; font-weight: 700; background: #6A5BFF; color: #fff;">AB=00</td><td style="padding: 5px 10px; text-align: center;">m<sub>0</sub></td><td style="padding: 5px 10px; text-align: center;">m<sub>1</sub></td><td style="padding: 5px 10px; text-align: center;">m<sub>3</sub></td><td style="padding: 5px 10px; text-align: center;">m<sub>2</sub></td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 5px 10px; font-weight: 700; background: #6A5BFF; color: #fff;">AB=01</td><td style="padding: 5px 10px; text-align: center;">m<sub>4</sub></td><td style="padding: 5px 10px; text-align: center;">m<sub>5</sub></td><td style="padding: 5px 10px; text-align: center;">m<sub>7</sub></td><td style="padding: 5px 10px; text-align: center;">m<sub>6</sub></td></tr>
<tr><td style="padding: 5px 10px; font-weight: 700; background: #6A5BFF; color: #fff;">AB=11</td><td style="padding: 5px 10px; text-align: center;">m<sub>12</sub></td><td style="padding: 5px 10px; text-align: center;">m<sub>13</sub></td><td style="padding: 5px 10px; text-align: center;">m<sub>15</sub></td><td style="padding: 5px 10px; text-align: center;">m<sub>14</sub></td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 5px 10px; font-weight: 700; background: #6A5BFF; color: #fff;">AB=10</td><td style="padding: 5px 10px; text-align: center;">m<sub>8</sub></td><td style="padding: 5px 10px; text-align: center;">m<sub>9</sub></td><td style="padding: 5px 10px; text-align: center;">m<sub>11</sub></td><td style="padding: 5px 10px; text-align: center;">m<sub>10</sub></td></tr>
</tbody>
</table>
</div>

<div style="flex: 0 1 auto;">
<p style="text-align: center; font-weight: 700; color: #5A3EED; margin-bottom: 8px; font-size: 1.05rem;">E = 1</p>
<table style="font-size: 0.85rem; border-collapse: collapse;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 5px 10px;"></th><th style="padding: 5px 10px;">CD=00</th><th style="padding: 5px 10px;">CD=01</th><th style="padding: 5px 10px;">CD=11</th><th style="padding: 5px 10px;">CD=10</th></tr></thead>
<tbody>
<tr><td style="padding: 5px 10px; font-weight: 700; background: #6A5BFF; color: #fff;">AB=00</td><td style="padding: 5px 10px; text-align: center;">m<sub>16</sub></td><td style="padding: 5px 10px; text-align: center;">m<sub>17</sub></td><td style="padding: 5px 10px; text-align: center;">m<sub>19</sub></td><td style="padding: 5px 10px; text-align: center;">m<sub>18</sub></td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 5px 10px; font-weight: 700; background: #6A5BFF; color: #fff;">AB=01</td><td style="padding: 5px 10px; text-align: center;">m<sub>20</sub></td><td style="padding: 5px 10px; text-align: center;">m<sub>21</sub></td><td style="padding: 5px 10px; text-align: center;">m<sub>23</sub></td><td style="padding: 5px 10px; text-align: center;">m<sub>22</sub></td></tr>
<tr><td style="padding: 5px 10px; font-weight: 700; background: #6A5BFF; color: #fff;">AB=11</td><td style="padding: 5px 10px; text-align: center;">m<sub>28</sub></td><td style="padding: 5px 10px; text-align: center;">m<sub>29</sub></td><td style="padding: 5px 10px; text-align: center;">m<sub>31</sub></td><td style="padding: 5px 10px; text-align: center;">m<sub>30</sub></td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 5px 10px; font-weight: 700; background: #6A5BFF; color: #fff;">AB=10</td><td style="padding: 5px 10px; text-align: center;">m<sub>24</sub></td><td style="padding: 5px 10px; text-align: center;">m<sub>25</sub></td><td style="padding: 5px 10px; text-align: center;">m<sub>27</sub></td><td style="padding: 5px 10px; text-align: center;">m<sub>26</sub></td></tr>
</tbody>
</table>
</div>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Adjacencies in 5-Variable K-Maps</p>

<p style="color: #333; margin-bottom: 10px;">Cells in <strong>corresponding positions</strong> of the two maps are adjacent (they differ only in E).</p>

<p style="color: #333; margin-bottom: 6px;"><strong>Example:</strong> m<sub>5</sub> (in E=0 map) is adjacent to m<sub>21</sub> (in E=1 map) because:</p>
<p style="color: #5A3EED; font-weight: 600; margin-bottom: 0; font-family: monospace; font-size: 1rem;">&nbsp;&nbsp;m<sub>5</sub> = 0&#x200B;0101 &nbsp;and&nbsp; m<sub>21</sub> = 1&#x200B;0101 &nbsp;&mdash;&nbsp; differ only in E bit</p>

</div>

### Grouping Across Maps

<div style="display: flex; gap: 18px; flex-wrap: wrap; margin: 1.2rem 0;">
<div style="flex: 1; min-width: 200px; background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 18px 20px;">
<p style="color: #1565C0; font-weight: 700; margin-top: 0; margin-bottom: 8px;">E = 0 map only</p>
<p style="color: #333; margin: 0; font-size: 0.95rem;"><span class="arithmatex">\(\overline{E}\)</span> appears in the product term</p>
</div>
<div style="flex: 1; min-width: 200px; background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 10px; padding: 18px 20px;">
<p style="color: #8D6E00; font-weight: 700; margin-top: 0; margin-bottom: 8px;">E = 1 map only</p>
<p style="color: #333; margin: 0; font-size: 0.95rem;"><span class="arithmatex">\(E\)</span> appears in the product term</p>
</div>
<div style="flex: 1; min-width: 200px; background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 20px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0; margin-bottom: 8px;">Both maps (corresponding)</p>
<p style="color: #333; margin: 0; font-size: 0.95rem;"><span class="arithmatex">\(E\)</span> is <strong>eliminated</strong> from the term</p>
</div>
</div>

**Example:** If cells m₃, m₇ (E=0) and m₁₉, m₂₃ (E=1) are all 1s, they form a group of 4 with term $BD$ (E is eliminated).

---

## 5.11 Multiple Solutions and Cost Metrics

### Multiple Solutions

Some functions have **multiple solutions** — different groupings that produce expressions with the same minimal cost. Both are equally valid minimal forms.

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Example: Multiple Minimal Solutions</p>

<p style="color: #333; margin-bottom: 10px;">Consider <span class="arithmatex">\(F(A,B,C,D) = \Sigma m(0,1,2,5,6,7,8,9,10,14)\)</span>. After identifying essential prime implicants, suppose minterms m<sub>5</sub> and m<sub>6</sub> remain uncovered. If two different non-essential prime implicants each cover one of these remaining minterms with equal cost, choosing one over the other yields a different but equally minimal expression.</p>

<p style="color: #666; font-style: italic; margin-bottom: 0;">When multiple prime implicants can cover the same remaining minterms after essential PIs, different valid choices lead to different but equally minimal expressions.</p>

</div>

### Cost of Expression

<div style="display: flex; gap: 18px; flex-wrap: wrap; margin: 1.2rem 0;">
<div style="flex: 1; min-width: 180px; background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 18px 20px;">
<p style="color: #1565C0; font-weight: 700; margin-top: 0; margin-bottom: 8px;">Literal Count</p>
<p style="color: #333; margin: 0; font-size: 0.95rem;">Total number of variable appearances</p>
</div>
<div style="flex: 1; min-width: 180px; background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 10px; padding: 18px 20px;">
<p style="color: #8D6E00; font-weight: 700; margin-top: 0; margin-bottom: 8px;">Term Count</p>
<p style="color: #333; margin: 0; font-size: 0.95rem;">Number of product terms (SOP) or sum terms (POS)</p>
</div>
<div style="flex: 1; min-width: 180px; background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 20px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0; margin-bottom: 8px;">Gate Count</p>
<p style="color: #333; margin: 0; font-size: 0.95rem;">Number of logic gates needed for implementation</p>
</div>
</div>

### Gate Count Minimization

**Gate count minimization** considers implementation details:

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Example: Gate Count for <span class="arithmatex">\(F = AB + \overline{A}C\)</span></p>

<table style="font-size: 0.92rem; margin: 0.8rem auto; border-collapse: collapse; width: 80%;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 8px 16px; text-align: left;">Component</th><th style="padding: 8px 16px; text-align: center;">Count</th><th style="padding: 8px 16px; text-align: left;">Details</th></tr></thead>
<tbody>
<tr><td style="padding: 8px 16px; border-bottom: 1px solid #ddd;">AND gates</td><td style="padding: 8px 16px; border-bottom: 1px solid #ddd; text-align: center; font-weight: 700;">2</td><td style="padding: 8px 16px; border-bottom: 1px solid #ddd;">2 inputs each</td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 8px 16px; border-bottom: 1px solid #ddd;">OR gates</td><td style="padding: 8px 16px; border-bottom: 1px solid #ddd; text-align: center; font-weight: 700;">1</td><td style="padding: 8px 16px; border-bottom: 1px solid #ddd;">2 inputs</td></tr>
<tr><td style="padding: 8px 16px; border-bottom: 1px solid #ddd;">Inverters</td><td style="padding: 8px 16px; border-bottom: 1px solid #ddd; text-align: center; font-weight: 700;">1</td><td style="padding: 8px 16px; border-bottom: 1px solid #ddd;">for <span class="arithmatex">\(\overline{A}\)</span></td></tr>
<tr style="background: #d4edda;"><td style="padding: 8px 16px; font-weight: 700;">Total</td><td style="padding: 8px 16px; text-align: center; font-weight: 700; color: #2E7D32; font-size: 1.1rem;">4</td><td style="padding: 8px 16px; font-weight: 700;">gates</td></tr>
</tbody>
</table>

</div>

### Literal Minimization

**Literal minimization** is often the primary goal because it directly reduces gate input counts, correlates with wiring complexity, and is simple to count and compare.

<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #2E7D32; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 10px;">K-maps guarantee minimal two-level SOP/POS</p>

<p style="color: #333; margin-bottom: 0;">K-map minimization produces expressions optimal for two-level AND-OR (SOP) or OR-AND (POS) implementations. Multi-level implementations may be more efficient but require different techniques.</p>

</div>

---

## 5.12 K-Map Limitations and Alternatives

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #8D6E00; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">K-Map Limitations</p>

<table style="font-size: 0.92rem; margin: 0.8rem auto; border-collapse: collapse; width: 95%;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 8px 16px; text-align: left;">Limitation</th><th style="padding: 8px 16px; text-align: left;">Details</th></tr></thead>
<tbody>
<tr><td style="padding: 8px 16px; border-bottom: 1px solid #ddd; font-weight: 600;">Scalability</td><td style="padding: 8px 16px; border-bottom: 1px solid #ddd;">Impractical beyond 5&ndash;6 variables</td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 8px 16px; border-bottom: 1px solid #ddd; font-weight: 600;">Human error</td><td style="padding: 8px 16px; border-bottom: 1px solid #ddd;">Easy to miss groups or make mistakes</td></tr>
<tr><td style="padding: 8px 16px; border-bottom: 1px solid #ddd; font-weight: 600;">Automation</td><td style="padding: 8px 16px; border-bottom: 1px solid #ddd;">Difficult to automate (pattern recognition is visual)</td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 8px 16px; font-weight: 600;">Multiple outputs</td><td style="padding: 8px 16px;">No direct support for multi-output optimization</td></tr>
</tbody>
</table>

</div>

### Alternatives for Large Functions

<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #2E7D32; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">For functions with many variables:</p>

<ul style="margin: 0; line-height: 2.2; color: #333; padding-left: 1.5rem;">
<li><strong style="color: #5A3EED;">Quine-McCluskey algorithm:</strong> Systematic tabular method (works for any number of variables)</li>
<li><strong style="color: #5A3EED;">ESPRESSO:</strong> Heuristic minimization for practical large functions</li>
<li><strong style="color: #5A3EED;">Computer-aided design (CAD) tools:</strong> Automated optimization</li>
</ul>

</div>

### Entered Variable K-Maps

An **entered variable K-map** reduces the map size by placing variables (not just 0/1) in cells. This allows an n-variable function to be represented on an (n&minus;1)-variable map.

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Example: 4-Variable Function on a 2&times;2 Map</p>

<table style="font-size: 0.95rem; margin: 1rem auto; border-collapse: collapse;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 8px 20px;"></th><th style="padding: 8px 20px;">B = 0</th><th style="padding: 8px 20px;">B = 1</th></tr></thead>
<tbody>
<tr><td style="padding: 8px 20px; font-weight: 700; background: #6A5BFF; color: #fff;">A = 0</td><td style="padding: 8px 20px; text-align: center; font-family: monospace; font-size: 1rem; background: #f4f4ff;"><span class="arithmatex">\(\overline{C}D\)</span></td><td style="padding: 8px 20px; text-align: center; font-family: monospace; font-size: 1rem;"><span class="arithmatex">\(D\)</span></td></tr>
<tr><td style="padding: 8px 20px; font-weight: 700; background: #6A5BFF; color: #fff;">A = 1</td><td style="padding: 8px 20px; text-align: center; font-weight: 700; color: #2E7D32; background: #d4edda;">1</td><td style="padding: 8px 20px; text-align: center; font-family: monospace; font-size: 1rem; background: #f4f4ff;"><span class="arithmatex">\(C + D\)</span></td></tr>
</tbody>
</table>

<p style="color: #666; font-style: italic; margin-bottom: 0;">Each cell contains an expression in the remaining variables (C, D). Useful for documentation and quick analysis but less common in coursework.</p>

</div>

### K-Map vs Algebraic Method

<table style="font-size: 0.92rem; margin: 1.2rem auto; border-collapse: collapse; width: 95%;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 8px 14px;">Criterion</th><th style="padding: 8px 14px;">K-Map</th><th style="padding: 8px 14px;">Algebraic</th></tr></thead>
<tbody>
<tr><td style="padding: 8px 14px; border-bottom: 1px solid #ddd; font-weight: 600;">Variables</td><td style="padding: 8px 14px; border-bottom: 1px solid #ddd;">2&ndash;5 practical</td><td style="padding: 8px 14px; border-bottom: 1px solid #ddd;">Any number</td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 8px 14px; border-bottom: 1px solid #ddd; font-weight: 600;">Speed (small functions)</td><td style="padding: 8px 14px; border-bottom: 1px solid #ddd; color: #2E7D32; font-weight: 600;">Fast</td><td style="padding: 8px 14px; border-bottom: 1px solid #ddd;">Slow</td></tr>
<tr><td style="padding: 8px 14px; border-bottom: 1px solid #ddd; font-weight: 600;">Guaranteed minimum</td><td style="padding: 8px 14px; border-bottom: 1px solid #ddd; color: #2E7D32; font-weight: 600;">Yes (2-level)</td><td style="padding: 8px 14px; border-bottom: 1px solid #ddd;">Depends on skill</td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 8px 14px; border-bottom: 1px solid #ddd; font-weight: 600;">Error prone</td><td style="padding: 8px 14px; border-bottom: 1px solid #ddd;">Visual errors</td><td style="padding: 8px 14px; border-bottom: 1px solid #ddd;">Algebra errors</td></tr>
<tr><td style="padding: 8px 14px; border-bottom: 1px solid #ddd; font-weight: 600;">Automation</td><td style="padding: 8px 14px; border-bottom: 1px solid #ddd;">Difficult</td><td style="padding: 8px 14px; border-bottom: 1px solid #ddd; color: #2E7D32; font-weight: 600;">Straightforward</td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 8px 14px; font-weight: 600;">Learning curve</td><td style="padding: 8px 14px; color: #2E7D32; font-weight: 600;">Visual, intuitive</td><td style="padding: 8px 14px;">Abstract</td></tr>
</tbody>
</table>

<div style="display: flex; gap: 18px; flex-wrap: wrap; margin: 1.2rem 0;">
<div style="flex: 1; min-width: 220px; background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 18px 20px;">
<p style="color: #1565C0; font-weight: 700; margin-top: 0; margin-bottom: 8px;">When to use K-maps</p>
<ul style="margin: 0; padding-left: 1.2rem; color: #333; line-height: 1.9; font-size: 0.95rem;">
<li>4 variables or fewer</li>
<li>Quick simplification needed</li>
<li>Visual verification desired</li>
</ul>
</div>
<div style="flex: 1; min-width: 220px; background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 10px; padding: 18px 20px;">
<p style="color: #8D6E00; font-weight: 700; margin-top: 0; margin-bottom: 8px;">When to use algebraic methods</p>
<ul style="margin: 0; padding-left: 1.2rem; color: #333; line-height: 1.9; font-size: 0.95rem;">
<li>Many variables</li>
<li>Computer implementation</li>
<li>Multi-level optimization</li>
</ul>
</div>
</div>

#### Diagram: K-Map Practice Challenge

<iframe src="../sims/kmap-practice-challenge/main.html" width="100%" height="650px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>

<details markdown="1">
<summary>K-Map Practice Challenge</summary>
Type: microsim

Purpose: Comprehensive K-map practice with progressive difficulty and feedback

Bloom Level: Apply (L3)
Bloom Verb: Solve, simplify, minimize

Learning Objective: Students will be able to apply K-map techniques to simplify Boolean functions of 2-5 variables, including handling don't cares and identifying multiple solutions.

Canvas Layout:
- Top: Problem statement and difficulty selector
- Middle: K-map workspace
- Right: Solution entry and verification
- Bottom: Feedback and hints

Visual Elements:
- Configurable K-map (2, 3, 4, or 5 variables)
- Problem display (minterm list or truth table)
- Grouping canvas with validation
- Expression entry field
- Step-by-step solution reveal (on request)
- Performance tracker (problems completed, accuracy)

Interactive Controls:
- Difficulty selector (Basic, Intermediate, Advanced, Expert)
- Variable count selector (2-5)
- "New Problem" button
- Grouping tools (draw rectangles)
- "Check Groups" to validate grouping
- "Check Expression" to verify answer
- "Hint" button (limited uses)
- "Show Solution" button
- Toggle: Include don't cares

Problem Types by Difficulty:
- Basic: 2-3 variables, no don't cares
- Intermediate: 4 variables, simple groupings
- Advanced: 4 variables with don't cares, multiple PIs
- Expert: 5 variables, multiple solutions, POS required

Data Visibility Requirements:
- Validate group shapes and sizes in real-time
- Check coverage completeness
- Verify expression correctness via truth table
- Provide specific error feedback
- Show optimal solution on request

Default Parameters:
- Difficulty: Intermediate
- Variables: 4
- Include don't cares: No

Behavior:
- Generate random valid problems
- Validate all user groupings
- Accept equivalent correct answers
- Track common errors for targeted feedback
- Adaptive difficulty based on performance

Instructional Rationale: Varied practice with immediate feedback builds fluency in K-map simplification across different scenarios.

Implementation: p5.js with problem generation and verification
</details>

---

## Summary and Key Takeaways

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.1rem; margin-top: 0; margin-bottom: 16px;">This unit provided mastery of Karnaugh maps for Boolean function simplification:</p>

<ul style="margin: 0; line-height: 2.2; color: #333; padding-left: 1.5rem;">
<li><strong>Karnaugh maps</strong> arrange truth table values in a grid where adjacent cells differ by one variable, enabling visual simplification.</li>
<li><strong>Gray code ordering</strong> ensures physical adjacency corresponds to logical adjacency (one-bit difference).</li>
<li><strong>K-map sizes</strong> range from 2&times;2 (2 variables) to paired 4&times;4 grids (5 variables). Beyond 5&ndash;6 variables, K-maps become impractical.</li>
<li><strong>Valid groups</strong> must contain a power of 2 cells (1, 2, 4, 8, 16) in rectangular shapes. Groups can wrap around edges.</li>
<li><strong>Grouping rules:</strong> For SOP &mdash; group 1s, each group becomes a product term. For POS &mdash; group 0s, each group becomes a sum term.</li>
<li><strong>Prime implicants</strong> are maximal groups that cannot be expanded. <strong>Essential prime implicants</strong> must appear in every minimal solution.</li>
<li><strong>Don't cares</strong> (X) can be treated as 1 or 0 as convenient, enabling larger groups and simpler expressions.</li>
<li><strong>Overlapping groups</strong> are allowed &mdash; cells can belong to multiple groups without duplication in the expression.</li>
<li><strong>Minimal expressions</strong> are achieved by covering all required cells with the fewest prime implicants.</li>
<li><strong>Multiple solutions</strong> may exist when non-essential PIs can be chosen differently while maintaining minimum cost.</li>
<li><strong>Literal count</strong> and <strong>gate count</strong> measure expression complexity. K-maps guarantee minimal two-level implementations.</li>
</ul>

</div>

??? question "Self-Check: What makes a prime implicant 'essential'?"
    A prime implicant is essential if it covers at least one minterm that no other prime implicant covers. Essential PIs must be included in every minimal solution.

??? question "Self-Check: In a 4-variable K-map, are the four corner cells adjacent to each other?"
    Yes! Due to wrap-around in both horizontal and vertical directions, all four corners (m₀, m₂, m₈, m₁₀) are mutually adjacent and can form a single group of 4.

??? question "Self-Check: When simplifying with don't cares, must all X cells be covered?"
    No. Don't cares are optional—include them in groups only if they help form larger groups. Uncovered don't cares simply remain undefined in the implementation.

---

## Interactive Walkthrough

Step through K-map simplification of a 4-variable function with grouping and term extraction:

<iframe src="../sims/kmap-simplification-walkthrough/main.html" width="100%" height="600px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>

---

[See Annotated References](./references.md)

</div>
