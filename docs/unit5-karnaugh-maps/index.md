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

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">Summary</h2>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 20px 24px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<p style="color: #333; line-height: 1.85; font-size: 1.02rem; margin: 0;">
Karnaugh maps (K-maps) provide a powerful graphical method for simplifying Boolean functions, transforming the abstract process of algebraic manipulation into visual pattern recognition. Developed by Maurice Karnaugh in 1953, this technique exploits the adjacency properties of Gray code ordering to identify opportunities for variable elimination. This unit covers K-map construction for 2, 3, 4, and 5 variables, teaching students to recognize valid groupings that lead to simpler expressions. The concepts of implicants, prime implicants, and essential prime implicants formalize the simplification process, enabling systematic derivation of minimal Sum of Products (SOP) and Product of Sums (POS) expressions. Students will learn to handle don't care conditions, recognize when multiple minimal solutions exist, and understand the limitations of K-maps for larger functions.
</p>
</div>

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">Concepts Covered</h2>

<div style="background: #F8F6FF; border: 2px solid #D4C8FF; border-radius: 12px; padding: 20px 24px; margin: 1rem 0;" markdown>

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

</div>

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">Prerequisites</h2>

Before beginning this unit, students should have:

- Thorough understanding of minterms and maxterms (Unit 4)
- Familiarity with canonical SOP and POS forms
- Knowledge of Gray code ordering (Unit 3)
- Understanding of don't care conditions

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">5.1 Introduction to Karnaugh Maps</h2>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

A **Karnaugh map** (K-map) is a graphical tool for simplifying Boolean functions that arranges the truth table in a grid format where adjacent cells differ by exactly one variable. This arrangement makes it easy to identify groups of 1s (or 0s) that can be combined to eliminate variables.

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">K-Map Structure</h3>

The **K-map structure** consists of:

- A rectangular grid of **K-map cells**, one for each minterm
- Row and column labels using **Gray code order** (adjacent labels differ by one bit)
- Each cell corresponds to one input combination

The power of K-maps lies in their **adjacency** property: cells that are physically adjacent on the map are also **logically adjacent**, meaning their minterms differ in exactly one variable. When two logically adjacent minterms are ORed together, the differing variable cancels out.

</div>

<div markdown style="background: #FFF8E1; border: 2px solid #F0D87A; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);">

**Example:** Minterms $m_5 = A\overline{B}C$ and $m_7 = ABC$ differ only in B:

$$m_5 + m_7 = A\overline{B}C + ABC = AC(\overline{B} + B) = AC$$

</div>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">K-Map Variables</h3>

**K-map variables** determine the map dimensions:

| Variables | Cells | Typical Layout |
|-----------|-------|----------------|
| 2 | 4 | 2×2 grid |
| 3 | 8 | 2×4 grid |
| 4 | 16 | 4×4 grid |
| 5 | 32 | Two 4×4 grids |
| 6 | 64 | Four 4×4 grids |

K-maps become impractical beyond 5-6 variables due to the difficulty of visualizing adjacencies.

</div>

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">5.2 Two-Variable K-Map</h2>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

The **two-variable K-map** is the simplest form, with 4 cells arranged in a 2×2 grid.

<table style="font-size: 0.92rem; margin: 1.2rem auto; border-collapse: collapse; min-width: 220px;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 6px 18px;"></th><th style="padding: 6px 18px;">B = 0</th><th style="padding: 6px 18px;">B = 1</th></tr></thead>
<tbody>
<tr><td style="padding: 6px 18px; font-weight: 700; background: #6A5BFF; color: #fff;">A = 0</td><td style="padding: 6px 18px; text-align: center;">m<sub>0</sub></td><td style="padding: 6px 18px; text-align: center;">m<sub>1</sub></td></tr>
<tr><td style="padding: 6px 18px; font-weight: 700; background: #6A5BFF; color: #fff;">A = 1</td><td style="padding: 6px 18px; text-align: center; background: #f4f4ff;">m<sub>2</sub></td><td style="padding: 6px 18px; text-align: center; background: #f4f4ff;">m<sub>3</sub></td></tr>
</tbody>
</table>

Each cell contains the function value (0, 1, or X) for that minterm.

</div>

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

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">5.3 Three-Variable K-Map</h2>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

The **three-variable K-map** uses a 2×4 grid with one variable on rows and two on columns (or vice versa).

<table style="font-size: 0.92rem; margin: 1.2rem auto; border-collapse: collapse;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 6px 16px;"></th><th style="padding: 6px 16px;">BC = 00</th><th style="padding: 6px 16px;">BC = 01</th><th style="padding: 6px 16px;">BC = 11</th><th style="padding: 6px 16px;">BC = 10</th></tr></thead>
<tbody>
<tr><td style="padding: 6px 16px; font-weight: 700; background: #6A5BFF; color: #fff;">A = 0</td><td style="padding: 6px 16px; text-align: center;">m<sub>0</sub></td><td style="padding: 6px 16px; text-align: center;">m<sub>1</sub></td><td style="padding: 6px 16px; text-align: center;">m<sub>3</sub></td><td style="padding: 6px 16px; text-align: center;">m<sub>2</sub></td></tr>
<tr><td style="padding: 6px 16px; font-weight: 700; background: #6A5BFF; color: #fff;">A = 1</td><td style="padding: 6px 16px; text-align: center; background: #f4f4ff;">m<sub>4</sub></td><td style="padding: 6px 16px; text-align: center; background: #f4f4ff;">m<sub>5</sub></td><td style="padding: 6px 16px; text-align: center; background: #f4f4ff;">m<sub>7</sub></td><td style="padding: 6px 16px; text-align: center; background: #f4f4ff;">m<sub>6</sub></td></tr>
</tbody>
</table>

Note the **Gray code order** for BC: 00, 01, 11, 10 (not binary order 00, 01, 10, 11). This ensures adjacent columns differ by exactly one bit.

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">K-Map Adjacency in 3-Variable Maps</h3>

**Physical adjacency** on the map corresponds to **logical adjacency** (differing by one variable):

- Horizontally adjacent cells differ in one column variable
- Vertically adjacent cells differ in the row variable
- **The left and right edges wrap around** (column 00 is adjacent to column 10)

</div>

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

<h4 style="color: #5A3EED; font-weight: 700;">Diagram: 3-Variable K-Map Simulator</h4>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../sims/kmap-3var-simulator/main.html" width="100%" height="550px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">5.4 Four-Variable K-Map</h2>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

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

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">Adjacencies in 4-Variable K-Maps</h3>

In a 4-variable K-map:

- **Horizontal adjacency:** Left-right neighbors (including wrap from column 10 to 00)
- **Vertical adjacency:** Top-bottom neighbors (including wrap from row 10 to 00)
- **Corner grouping:** All four corners are mutually adjacent (wrap both ways)

The 4-variable K-map forms a **torus** topology—imagine wrapping the map into a donut shape where both top/bottom and left/right edges connect.

</div>

<div style="background: #FFF8E1; border-left: 4px solid #F0D87A; border-radius: 8px; padding: 16px 20px; margin: 1rem 0;">
<strong style="color: #B8860B;">Key Insight — Wrapping:</strong> The edges of the K-map connect to form adjacencies. Column 00 is adjacent to column 10 (horizontal wrap), row 00 is adjacent to row 10 (vertical wrap), and all four corner cells (m₀, m₂, m₈, m₁₀) are mutually adjacent (corner wrap).
</div>

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

<h4 style="color: #5A3EED; font-weight: 700;">Diagram: K-Map Solver</h4>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../sims/kmap-solver/main.html" width="100%" height="550px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">5.5 Valid Groups and Grouping Rules</h2>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">Valid Group Sizes</h3>

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

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">Rectangular Groups</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

Groups must form **rectangles** (including squares) on the K-map. The rectangle can wrap around edges but must maintain its rectangular shape conceptually.

<div style="display: flex; gap: 1.5rem; flex-wrap: wrap; margin: 1rem 0;">

<div style="flex: 1; min-width: 200px; background: #FFF8E1; border: 2px solid #F0D87A; border-radius: 10px; padding: 16px 20px;">
<p style="color: #B8860B; font-weight: 700; margin-top: 0; margin-bottom: 8px;">Valid groups:</p>
<ul style="margin: 0; color: #333; line-height: 1.85; padding-left: 1.2rem;">
<li>1&times;1 (single cell)</li>
<li>1&times;2 or 2&times;1 (pair)</li>
<li>1&times;4, 4&times;1, or 2&times;2 (quad)</li>
<li>1&times;8, 8&times;1, 2&times;4, or 4&times;2 (octet)</li>
<li>4&times;4 (16 cells)</li>
</ul>
</div>

<div style="flex: 1; min-width: 200px; background: #FFF0F0; border: 2px solid #E57373; border-radius: 10px; padding: 16px 20px;">
<p style="color: #C62828; font-weight: 700; margin-top: 0; margin-bottom: 8px;">Invalid groups:</p>
<ul style="margin: 0; color: #333; line-height: 1.85; padding-left: 1.2rem;">
<li>L-shaped</li>
<li>T-shaped</li>
<li>Diagonal</li>
<li>Non-power-of-2 sizes (3, 5, 6, etc.)</li>
</ul>
</div>

</div>

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">Grouping for SOP vs POS</h3>

<div style="display: flex; gap: 1.5rem; flex-wrap: wrap; margin: 1rem 0;">

<div style="flex: 1; min-width: 200px; background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 16px 20px;">
<p style="color: #1565C0; font-weight: 700; margin-top: 0; margin-bottom: 8px;">SOP &mdash; Group the 1s</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">Each group of 1s becomes a <strong>product term</strong> in the sum.</p>
</div>

<div style="flex: 1; min-width: 200px; background: #FFF8E1; border: 2px solid #F0D87A; border-radius: 10px; padding: 16px 20px;">
<p style="color: #B8860B; font-weight: 700; margin-top: 0; margin-bottom: 8px;">POS &mdash; Group the 0s</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">Each group of 0s becomes a <strong>sum term</strong> in the product.</p>
</div>

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">Overlapping Groups</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

**Overlapping groups** are allowed and often necessary for minimal expressions. A cell can belong to multiple groups—this doesn't duplicate it in the final expression; it just means that cell's minterm is covered by multiple product terms.

</div>

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

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">5.6 Implicants and Prime Implicants</h2>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">Implicants</h3>

An **implicant** is any product term that covers one or more minterms of the function. Every minterm is an implicant, and any valid K-map group represents an implicant.

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Example: Implicants for <span class="arithmatex">\(F = \Sigma m(1,3,5,7)\)</span></p>

<ul style="margin: 0; color: #333; line-height: 2;">
<li><span class="arithmatex">\(m_1 = \overline{A}\,\overline{B}\,C\)</span> is an implicant (covers m<sub>1</sub>)</li>
<li><span class="arithmatex">\(\overline{A}\,C\)</span> is an implicant (covers m<sub>1</sub> and m<sub>3</sub>)</li>
<li><span class="arithmatex">\(C\)</span> is an implicant (covers m<sub>1</sub>, m<sub>3</sub>, m<sub>5</sub>, m<sub>7</sub>)</li>
</ul>

</div>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">Prime Implicants</h3>

A **prime implicant** is an implicant that cannot be combined with another implicant to form a larger group. It represents the largest possible grouping containing a particular set of minterms.

**Finding prime implicants:** A group is prime if it cannot be expanded (doubled in size) while remaining a valid group of 1s.

In the example above, $C$ is the only prime implicant—it covers all 1s and cannot be made larger.

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">Essential Prime Implicants</h3>

An **essential prime implicant** is a prime implicant that covers at least one minterm not covered by any other prime implicant. Essential prime implicants **must** be included in any minimal solution.

</div>

<div style="background: #FFF8E1; border-left: 4px solid #F0D87A; border-radius: 8px; padding: 16px 20px; margin: 1rem 0;">
<strong style="color: #B8860B;">Finding Essential PIs:</strong>
<ol style="margin: 0.5rem 0 0; color: #333; line-height: 2; padding-left: 1.5rem;">
<li>Identify all prime implicants</li>
<li>For each minterm, list which PIs cover it</li>
<li>If a minterm is covered by only one PI, that PI is essential</li>
</ol>
</div>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">Redundant Prime Implicants</h3>

A **redundant prime implicant** is a prime implicant that is not needed because all its minterms are already covered by essential prime implicants or other selected PIs.

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">Systematic Minimization Procedure</h3>

<div style="background: #FFF8E1; border: 2px solid #F0D87A; border-radius: 12px; padding: 22px 26px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);">
<ol style="margin: 0; color: #333; line-height: 2.2; padding-left: 1.5rem;">
<li><strong>Find all prime implicants</strong> (largest possible groups)</li>
<li><strong>Identify essential prime implicants</strong> (must include)</li>
<li><strong>Select additional PIs</strong> to cover remaining minterms (minimize overlap)</li>
<li><strong>The selected PIs</strong> form the minimal expression</li>
</ol>
</div>

<h4 style="color: #5A3EED; font-weight: 700;">Diagram: Prime Implicant Finder</h4>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../sims/prime-implicant-finder/main.html" width="100%" height="600px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">5.7 K-Map SOP Simplification</h2>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

**K-Map SOP simplification** produces a minimal Sum of Products expression.

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">Procedure for Minimal SOP</h3>

<ol style="margin: 0; color: #333; line-height: 2.2; padding-left: 1.5rem;">
<li><strong>Plot the function:</strong> Place 1s in cells corresponding to minterms where F = 1</li>
<li><strong>Identify all prime implicants:</strong> Find all maximal groups of 1s</li>
<li><strong>Select essential prime implicants:</strong> Include all PIs that cover unique minterms</li>
<li><strong>Cover remaining minterms:</strong> Add minimum additional PIs</li>
<li><strong>Write the expression:</strong> OR together the product terms from selected groups</li>
</ol>

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">Reading Product Terms from Groups</h3>

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

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">Covering All Ones</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

The goal is **covering all ones** with the minimum number of prime implicants. Every cell containing 1 must be included in at least one selected group.

</div>

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

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">5.8 K-Map POS Simplification</h2>

**K-Map POS simplification** produces a minimal Product of Sums expression by grouping 0s instead of 1s.

<div style="background: #FFF8E1; border: 2px solid #F0D87A; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

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

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">Choosing SOP vs POS</h3>

Compare the literal counts of minimal SOP and minimal POS — choose the simpler form.

<div style="display: flex; gap: 18px; flex-wrap: wrap; margin: 1.2rem 0;">
<div style="flex: 1; min-width: 180px; background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 18px 20px;">
<p style="color: #1565C0; font-weight: 700; margin-top: 0; margin-bottom: 8px;">SOP likely simpler</p>
<p style="color: #333; margin: 0; font-size: 0.95rem;">Few 1s, many 0s &mdash; fewer product terms to cover</p>
</div>
<div style="flex: 1; min-width: 180px; background: #FFF8E1; border: 2px solid #F0D87A; border-radius: 10px; padding: 18px 20px;">
<p style="color: #8D6E00; font-weight: 700; margin-top: 0; margin-bottom: 8px;">POS likely simpler</p>
<p style="color: #333; margin: 0; font-size: 0.95rem;">Few 0s, many 1s &mdash; fewer sum terms to cover</p>
</div>
<div style="flex: 1; min-width: 180px; background: #F8F6FF; border: 2px solid #D4C8FF; border-radius: 10px; padding: 18px 20px;">
<p style="color: #5A3EED; font-weight: 700; margin-top: 0; margin-bottom: 8px;">Balanced</p>
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

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">5.9 K-Maps with Don't Cares</h2>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

**K-maps with don't cares** include cells marked with X (or d) representing input combinations where the output doesn't matter.

</div>

<div style="background: #FFF8E1; border: 2px solid #F0D87A; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Using Don't Cares</p>

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

<h4 style="color: #5A3EED; font-weight: 700;">Diagram: K-Map with Don't Cares</h4>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../sims/kmap-dont-cares/main.html" width="100%" height="600px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">5.10 Five-Variable K-Maps</h2>

The **five-variable K-map** extends the technique to 32 cells, typically displayed as two adjacent 4×4 maps.

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">Five-Variable Technique</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

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

</div>

<div style="background: #FFF8E1; border-left: 4px solid #F0D87A; border-radius: 8px; padding: 16px 20px; margin: 1rem 0;">
<strong style="color: #B8860B;">Key Insight — 5-Variable Adjacency:</strong> Cells in <strong>corresponding positions</strong> of the two maps are adjacent (they differ only in E). For example, m<sub>5</sub> (in E=0 map) is adjacent to m<sub>21</sub> (in E=1 map) because m<sub>5</sub> = 0&#x200B;0101 and m<sub>21</sub> = 1&#x200B;0101 — they differ only in the E bit.
</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">Grouping Across Maps</h3>

<div style="display: flex; gap: 18px; flex-wrap: wrap; margin: 1.2rem 0;">
<div style="flex: 1; min-width: 200px; background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 18px 20px;">
<p style="color: #1565C0; font-weight: 700; margin-top: 0; margin-bottom: 8px;">E = 0 map only</p>
<p style="color: #333; margin: 0; font-size: 0.95rem;"><span class="arithmatex">\(\overline{E}\)</span> appears in the product term</p>
</div>
<div style="flex: 1; min-width: 200px; background: #FFF8E1; border: 2px solid #F0D87A; border-radius: 10px; padding: 18px 20px;">
<p style="color: #8D6E00; font-weight: 700; margin-top: 0; margin-bottom: 8px;">E = 1 map only</p>
<p style="color: #333; margin: 0; font-size: 0.95rem;"><span class="arithmatex">\(E\)</span> appears in the product term</p>
</div>
<div style="flex: 1; min-width: 200px; background: #F8F6FF; border: 2px solid #D4C8FF; border-radius: 10px; padding: 18px 20px;">
<p style="color: #5A3EED; font-weight: 700; margin-top: 0; margin-bottom: 8px;">Both maps (corresponding)</p>
<p style="color: #333; margin: 0; font-size: 0.95rem;"><span class="arithmatex">\(E\)</span> is <strong>eliminated</strong> from the term</p>
</div>
</div>

**Example:** If cells m₃, m₇ (E=0) and m₁₉, m₂₃ (E=1) are all 1s, they form a group of 4 with term $BD$ (E is eliminated).

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">5.11 Multiple Solutions and Cost Metrics</h2>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">Multiple Solutions</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

Some functions have **multiple solutions** — different groupings that produce expressions with the same minimal cost. Both are equally valid minimal forms.

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Example: Multiple Minimal Solutions</p>

<p style="color: #333; margin-bottom: 10px;">Consider <span class="arithmatex">\(F(A,B,C,D) = \Sigma m(0,1,2,5,6,7,8,9,10,14)\)</span>. After identifying essential prime implicants, suppose minterms m<sub>5</sub> and m<sub>6</sub> remain uncovered. If two different non-essential prime implicants each cover one of these remaining minterms with equal cost, choosing one over the other yields a different but equally minimal expression.</p>

<p style="color: #666; font-style: italic; margin-bottom: 0;">When multiple prime implicants can cover the same remaining minterms after essential PIs, different valid choices lead to different but equally minimal expressions.</p>

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">Cost of Expression</h3>

<div style="display: flex; gap: 18px; flex-wrap: wrap; margin: 1.2rem 0;">
<div style="flex: 1; min-width: 180px; background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 18px 20px;">
<p style="color: #1565C0; font-weight: 700; margin-top: 0; margin-bottom: 8px;">Literal Count</p>
<p style="color: #333; margin: 0; font-size: 0.95rem;">Total number of variable appearances</p>
</div>
<div style="flex: 1; min-width: 180px; background: #FFF8E1; border: 2px solid #F0D87A; border-radius: 10px; padding: 18px 20px;">
<p style="color: #8D6E00; font-weight: 700; margin-top: 0; margin-bottom: 8px;">Term Count</p>
<p style="color: #333; margin: 0; font-size: 0.95rem;">Number of product terms (SOP) or sum terms (POS)</p>
</div>
<div style="flex: 1; min-width: 180px; background: #FFF8E1; border: 2px solid #F0D87A; border-radius: 10px; padding: 18px 20px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0; margin-bottom: 8px;">Gate Count</p>
<p style="color: #333; margin: 0; font-size: 0.95rem;">Number of logic gates needed for implementation</p>
</div>
</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">Gate Count Minimization</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

**Gate count minimization** considers implementation details:

</div>

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

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">Literal Minimization</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

**Literal minimization** is often the primary goal because it directly reduces gate input counts, correlates with wiring complexity, and is simple to count and compare.

</div>

<div style="background: #FFF8E1; border: 2px solid #F0D87A; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 10px;">K-maps guarantee minimal two-level SOP/POS</p>

<p style="color: #333; margin-bottom: 0;">K-map minimization produces expressions optimal for two-level AND-OR (SOP) or OR-AND (POS) implementations. Multi-level implementations may be more efficient but require different techniques.</p>

</div>

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">5.12 K-Map Limitations and Alternatives</h2>

<div style="background: #FFF8E1; border: 2px solid #F0D87A; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

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

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">Alternatives for Large Functions</h3>

<div style="background: #FFF8E1; border: 2px solid #F0D87A; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">For functions with many variables:</p>

<ul style="margin: 0; line-height: 2.2; color: #333; padding-left: 1.5rem;">
<li><strong style="color: #5A3EED;">Quine-McCluskey algorithm:</strong> Systematic tabular method (works for any number of variables)</li>
<li><strong style="color: #5A3EED;">ESPRESSO:</strong> Heuristic minimization for practical large functions</li>
<li><strong style="color: #5A3EED;">Computer-aided design (CAD) tools:</strong> Automated optimization</li>
</ul>

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">Entered Variable K-Maps</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

An **entered variable K-map** reduces the map size by placing variables (not just 0/1) in cells. This allows an n-variable function to be represented on an (n&minus;1)-variable map.

</div>

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

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">K-Map vs Algebraic Method</h3>

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
<div style="flex: 1; min-width: 220px; background: #FFF8E1; border: 2px solid #F0D87A; border-radius: 10px; padding: 18px 20px;">
<p style="color: #8D6E00; font-weight: 700; margin-top: 0; margin-bottom: 8px;">When to use algebraic methods</p>
<ul style="margin: 0; padding-left: 1.2rem; color: #333; line-height: 1.9; font-size: 0.95rem;">
<li>Many variables</li>
<li>Computer implementation</li>
<li>Multi-level optimization</li>
</ul>
</div>
</div>

<h4 style="color: #5A3EED; font-weight: 700;">Diagram: K-Map Practice Challenge</h4>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../sims/kmap-practice-challenge/main.html" width="100%" height="650px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">Summary and Key Takeaways</h2>

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

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">Interactive Walkthrough</h2>

Step through K-map simplification of a 4-variable function with grouping and term extraction:

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../sims/kmap-simplification-walkthrough/main.html" width="100%" height="600px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

---

[Take the Unit Quiz](./quiz.md) | [See Annotated References](./references.md)

</div>
