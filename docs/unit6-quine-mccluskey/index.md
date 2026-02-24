---
title: Quine-McCluskey Method
description: Systematic tabular method for minimizing Boolean functions
generated_by: claude skill chapter-content-generator
date: 2026-02-04 19:45:00
version: 0.03
---

<div class="unit1-styled" markdown>

# Unit 6: Quine-McCluskey Method

<details class="video-overview">
<summary><strong>Unit Overview</strong> (click to expand)</summary>

Welcome to Unit 6, where we tackle Boolean minimization from a completely different angle. Karnaugh maps are wonderful for small problems, but the Quine-McCluskey method replaces visual pattern recognition with a systematic, tabular algorithm that works for any number of variables — and that a computer can execute.

The method proceeds in two phases. In the first phase, you list every minterm and group them by the number of ones in their binary representation. Then you compare minterms in adjacent groups, looking for pairs that differ in exactly one bit position. When you find such a pair, you combine them into a new implicant, replacing the differing bit with a dash. This combining process repeats until no further combinations are possible. Every implicant never checked off is a prime implicant.

The second phase determines which prime implicants to include in the final expression. You construct a prime implicant chart — a table with prime implicants as rows and original minterms as columns. If any column has only a single mark, the corresponding prime implicant is essential. You select all essentials first, then for remaining coverage, Petrick's method finds the minimum number of additional prime implicants needed.

The real power of Quine-McCluskey is its suitability for automation. Every step follows deterministic rules that translate directly into code. Modern logic synthesis tools use algorithms descended from this method to optimize circuits with thousands of variables.

**Key Takeaways**

1. The Quine-McCluskey method systematically finds all prime implicants through iterative pairwise combination of minterms, organized by the number of ones in their binary form.
2. A prime implicant chart identifies essential prime implicants, and Petrick's method resolves any remaining coverage when essentials alone are not sufficient.
3. The algorithm's deterministic, tabular nature makes it ideal for computer implementation, enabling minimization of functions with far more variables than K-maps can handle.

</details>

## Summary

This unit introduces the Quine-McCluskey (QM) method, a systematic tabular algorithm for minimizing Boolean functions. While Karnaugh maps provide an intuitive visual approach for functions with up to five variables, the QM method offers a rigorous, algorithmic procedure suitable for functions with any number of variables. The method can be easily programmed for computer implementation, making it the foundation for modern logic minimization tools. Students will learn to construct implicant tables, systematically combine minterms, generate prime implicant charts, and determine minimum covers using techniques including Petrick's method.

## Concepts Covered

1. Quine-McCluskey Algorithm
2. Tabular Minimization Method
3. Implicant Table Construction
4. Binary Representation of Minterms
5. Grouping by Number of Ones
6. Adjacency Criterion in QM
7. Combining Adjacent Minterms
8. Dash Notation for Combined Terms
9. Iterative Combination Process
10. Unchecked Terms as Prime Implicants
11. Prime Implicant Chart Construction
12. Essential Prime Implicants Selection
13. Row Dominance
14. Column Dominance
15. Cyclic Prime Implicant Charts
16. Petrick's Method
17. Minimal Cover Selection
18. QM Method with Don't Cares
19. Computational Complexity of QM
20. QM versus K-map Comparison
21. Multi-Output Function Minimization
22. Computer Implementation of QM
23. Literal Count Optimization
24. Gate Count Optimization
25. Systematic Approach Advantages

## Prerequisites

Before studying this unit, students should be familiar with:

- Minterms, maxterms, and canonical forms (Unit 4)
- Prime implicants and essential prime implicants (Unit 5)
- K-map simplification techniques (Unit 5)
- Binary number representation (Unit 1)
- Boolean algebra fundamentals (Unit 2)

---

## 6.1 Introduction to Algorithmic Minimization

The Karnaugh map provides an elegant visual method for simplifying Boolean functions, but it has practical limitations. As the number of variables increases beyond four or five, K-maps become difficult to construct, visualize, and manipulate accurately. Additionally, the pattern-recognition approach that makes K-maps intuitive for humans does not translate easily into computer algorithms.

The Quine-McCluskey method, developed independently by Willard V. Quine in 1952 and Edward J. McCluskey in 1956, addresses these limitations. This tabular minimization method provides a systematic, algorithmic procedure that:

- Works for any number of input variables
- Guarantees finding all prime implicants
- Can be readily programmed for computer implementation
- Produces results that can be verified step-by-step

The QM method forms the theoretical foundation for modern Electronic Design Automation (EDA) tools used in industry for logic synthesis and optimization.

<table style="font-size: 0.92rem; margin: 1.2rem auto; border-collapse: collapse; width: 95%;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 8px 14px;">Feature</th><th style="padding: 8px 14px;">K-map</th><th style="padding: 8px 14px;">Quine-McCluskey</th></tr></thead>
<tbody>
<tr><td style="padding: 8px 14px; border-bottom: 1px solid #ddd; font-weight: 600;">Maximum practical variables</td><td style="padding: 8px 14px; border-bottom: 1px solid #ddd;">5&ndash;6</td><td style="padding: 8px 14px; border-bottom: 1px solid #ddd; color: #2E7D32; font-weight: 600;">Unlimited</td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 8px 14px; border-bottom: 1px solid #ddd; font-weight: 600;">Approach</td><td style="padding: 8px 14px; border-bottom: 1px solid #ddd;">Visual pattern recognition</td><td style="padding: 8px 14px; border-bottom: 1px solid #ddd;">Algorithmic tabular</td></tr>
<tr><td style="padding: 8px 14px; border-bottom: 1px solid #ddd; font-weight: 600;">Computer implementation</td><td style="padding: 8px 14px; border-bottom: 1px solid #ddd;">Difficult</td><td style="padding: 8px 14px; border-bottom: 1px solid #ddd; color: #2E7D32; font-weight: 600;">Straightforward</td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 8px 14px; border-bottom: 1px solid #ddd; font-weight: 600;">Guaranteed optimal</td><td style="padding: 8px 14px; border-bottom: 1px solid #ddd;">Depends on user skill</td><td style="padding: 8px 14px; border-bottom: 1px solid #ddd; color: #2E7D32; font-weight: 600;">Yes (finds all PIs)</td></tr>
<tr><td style="padding: 8px 14px; border-bottom: 1px solid #ddd; font-weight: 600;">Speed for small functions</td><td style="padding: 8px 14px; border-bottom: 1px solid #ddd; color: #2E7D32; font-weight: 600;">Fast</td><td style="padding: 8px 14px; border-bottom: 1px solid #ddd;">Moderate</td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 8px 14px; font-weight: 600;">Speed for large functions</td><td style="padding: 8px 14px;">Impractical</td><td style="padding: 8px 14px;">Computationally intensive</td></tr>
</tbody>
</table>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 10px;">Historical Context</p>

<p style="color: #333; margin-bottom: 0;">The QM method represents one of the earliest examples of algorithmic approaches to digital design. It emerged during the same era that saw the development of the first commercial computers, reflecting the growing need for systematic design methods.</p>

</div>

## 6.2 Binary Representation and Grouping

The QM method begins by representing each minterm in binary form. For a function of $n$ variables, each minterm corresponds to an $n$-bit binary number where the bit positions represent the complement or true form of each variable.

Consider a function $F(A, B, C, D) = \sum m(0, 1, 2, 5, 6, 7, 8, 9, 10, 14)$.

The first step is to list all minterms in their binary representations:

<table style="font-size: 0.92rem; margin: 1.2rem auto; border-collapse: collapse;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 6px 12px;">Minterm</th><th style="padding: 6px 12px;">A</th><th style="padding: 6px 12px;">B</th><th style="padding: 6px 12px;">C</th><th style="padding: 6px 12px;">D</th><th style="padding: 6px 12px;">Number of 1s</th></tr></thead>
<tbody>
<tr style="background: #e3f2fd;"><td style="padding: 6px 12px; font-weight: 600; border-bottom: 1px solid #ddd;">m<sub>0</sub></td><td style="padding: 6px 12px; text-align: center; border-bottom: 1px solid #ddd;">0</td><td style="padding: 6px 12px; text-align: center; border-bottom: 1px solid #ddd;">0</td><td style="padding: 6px 12px; text-align: center; border-bottom: 1px solid #ddd;">0</td><td style="padding: 6px 12px; text-align: center; border-bottom: 1px solid #ddd;">0</td><td style="padding: 6px 12px; text-align: center; font-weight: 700; color: #5A3EED; border-bottom: 1px solid #ddd;">0</td></tr>
<tr><td style="padding: 6px 12px; font-weight: 600; border-bottom: 1px solid #ddd;">m<sub>1</sub></td><td style="padding: 6px 12px; text-align: center; border-bottom: 1px solid #ddd;">0</td><td style="padding: 6px 12px; text-align: center; border-bottom: 1px solid #ddd;">0</td><td style="padding: 6px 12px; text-align: center; border-bottom: 1px solid #ddd;">0</td><td style="padding: 6px 12px; text-align: center; border-bottom: 1px solid #ddd;">1</td><td style="padding: 6px 12px; text-align: center; font-weight: 700; color: #5A3EED; border-bottom: 1px solid #ddd;">1</td></tr>
<tr><td style="padding: 6px 12px; font-weight: 600; border-bottom: 1px solid #ddd;">m<sub>2</sub></td><td style="padding: 6px 12px; text-align: center; border-bottom: 1px solid #ddd;">0</td><td style="padding: 6px 12px; text-align: center; border-bottom: 1px solid #ddd;">0</td><td style="padding: 6px 12px; text-align: center; border-bottom: 1px solid #ddd;">1</td><td style="padding: 6px 12px; text-align: center; border-bottom: 1px solid #ddd;">0</td><td style="padding: 6px 12px; text-align: center; font-weight: 700; color: #5A3EED; border-bottom: 1px solid #ddd;">1</td></tr>
<tr><td style="padding: 6px 12px; font-weight: 600; border-bottom: 1px solid #ddd;">m<sub>8</sub></td><td style="padding: 6px 12px; text-align: center; border-bottom: 1px solid #ddd;">1</td><td style="padding: 6px 12px; text-align: center; border-bottom: 1px solid #ddd;">0</td><td style="padding: 6px 12px; text-align: center; border-bottom: 1px solid #ddd;">0</td><td style="padding: 6px 12px; text-align: center; border-bottom: 1px solid #ddd;">0</td><td style="padding: 6px 12px; text-align: center; font-weight: 700; color: #5A3EED; border-bottom: 1px solid #ddd;">1</td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 6px 12px; font-weight: 600; border-bottom: 1px solid #ddd;">m<sub>5</sub></td><td style="padding: 6px 12px; text-align: center; border-bottom: 1px solid #ddd;">0</td><td style="padding: 6px 12px; text-align: center; border-bottom: 1px solid #ddd;">1</td><td style="padding: 6px 12px; text-align: center; border-bottom: 1px solid #ddd;">0</td><td style="padding: 6px 12px; text-align: center; border-bottom: 1px solid #ddd;">1</td><td style="padding: 6px 12px; text-align: center; font-weight: 700; color: #5A3EED; border-bottom: 1px solid #ddd;">2</td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 6px 12px; font-weight: 600; border-bottom: 1px solid #ddd;">m<sub>6</sub></td><td style="padding: 6px 12px; text-align: center; border-bottom: 1px solid #ddd;">0</td><td style="padding: 6px 12px; text-align: center; border-bottom: 1px solid #ddd;">1</td><td style="padding: 6px 12px; text-align: center; border-bottom: 1px solid #ddd;">1</td><td style="padding: 6px 12px; text-align: center; border-bottom: 1px solid #ddd;">0</td><td style="padding: 6px 12px; text-align: center; font-weight: 700; color: #5A3EED; border-bottom: 1px solid #ddd;">2</td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 6px 12px; font-weight: 600; border-bottom: 1px solid #ddd;">m<sub>9</sub></td><td style="padding: 6px 12px; text-align: center; border-bottom: 1px solid #ddd;">1</td><td style="padding: 6px 12px; text-align: center; border-bottom: 1px solid #ddd;">0</td><td style="padding: 6px 12px; text-align: center; border-bottom: 1px solid #ddd;">0</td><td style="padding: 6px 12px; text-align: center; border-bottom: 1px solid #ddd;">1</td><td style="padding: 6px 12px; text-align: center; font-weight: 700; color: #5A3EED; border-bottom: 1px solid #ddd;">2</td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 6px 12px; font-weight: 600; border-bottom: 1px solid #ddd;">m<sub>10</sub></td><td style="padding: 6px 12px; text-align: center; border-bottom: 1px solid #ddd;">1</td><td style="padding: 6px 12px; text-align: center; border-bottom: 1px solid #ddd;">0</td><td style="padding: 6px 12px; text-align: center; border-bottom: 1px solid #ddd;">1</td><td style="padding: 6px 12px; text-align: center; border-bottom: 1px solid #ddd;">0</td><td style="padding: 6px 12px; text-align: center; font-weight: 700; color: #5A3EED; border-bottom: 1px solid #ddd;">2</td></tr>
<tr style="background: #fff3e0;"><td style="padding: 6px 12px; font-weight: 600; border-bottom: 1px solid #ddd;">m<sub>7</sub></td><td style="padding: 6px 12px; text-align: center; border-bottom: 1px solid #ddd;">0</td><td style="padding: 6px 12px; text-align: center; border-bottom: 1px solid #ddd;">1</td><td style="padding: 6px 12px; text-align: center; border-bottom: 1px solid #ddd;">1</td><td style="padding: 6px 12px; text-align: center; border-bottom: 1px solid #ddd;">1</td><td style="padding: 6px 12px; text-align: center; font-weight: 700; color: #5A3EED; border-bottom: 1px solid #ddd;">3</td></tr>
<tr style="background: #fff3e0;"><td style="padding: 6px 12px; font-weight: 600;">m<sub>14</sub></td><td style="padding: 6px 12px; text-align: center;">1</td><td style="padding: 6px 12px; text-align: center;">1</td><td style="padding: 6px 12px; text-align: center;">1</td><td style="padding: 6px 12px; text-align: center;">0</td><td style="padding: 6px 12px; text-align: center; font-weight: 700; color: #5A3EED;">3</td></tr>
</tbody>
</table>

<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #2E7D32; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Why Group by Number of 1s?</p>

<ul style="margin: 0; line-height: 2.2; color: #333; padding-left: 1.5rem;">
<li>Two minterms can only be combined if they differ in exactly <strong>one bit position</strong></li>
<li>Minterms that differ by one bit must have a difference of exactly one in their count of 1s</li>
<li>Therefore, we only need to compare minterms in <strong>adjacent groups</strong></li>
</ul>

<p style="color: #666; font-style: italic; margin-bottom: 0;">This insight dramatically reduces comparisons from <span class="arithmatex">\(\binom{n}{2}\)</span> (every pair) to only adjacent-group comparisons.</p>

</div>

#### Diagram: QM Grouping Visualization

<iframe src="../sims/qm-grouping-visualization/main.html" width="100%" height="532px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>

<details markdown="1">
<summary>QM Grouping Visualization Specification</summary>
Type: microsim

Bloom Level: Understand (L2)
Bloom Verb: Classify, organize

Learning Objective: Students will be able to classify minterms into groups based on the number of 1s in their binary representation and explain why this grouping facilitates the combination process.

Visual Elements:
- Left panel: Input area where students enter minterms (comma-separated list)
- Center panel: Binary representation table showing each minterm, its binary form, and 1-count
- Right panel: Grouped display showing minterms organized by number of 1s in stacked boxes
- Color coding: Each group has a distinct color (Group 0: light blue, Group 1: light green, Group 2: yellow, Group 3: orange, Group 4: red)

Interactive Controls:
- Text input: Enter minterm numbers (e.g., "0,1,2,5,6,7,8,9,10,14")
- Dropdown: Select number of variables (3, 4, 5, or 6)
- Button: "Generate Groups"
- Button: "Reset"
- Checkbox: "Show binary representation"

Behavior:
- When minterms are entered and "Generate Groups" is clicked, display the binary representation table
- Animate minterms moving from the table into their respective group boxes
- Highlight adjacent groups with connecting arrows to show which groups will be compared
- Display count of minterms in each group

Data Visibility Requirements:
- Stage 1: Show raw minterm list
- Stage 2: Show conversion to binary with bit counting
- Stage 3: Show final grouped arrangement

Instructional Rationale: Grouping is a classification task that helps students understand the efficiency of the QM method. The animation showing minterms moving into groups reinforces the organizational principle.

Canvas Size: 900x500 pixels, responsive to window width
Implementation: p5.js
</details>

## 6.3 The Combination Process

Once minterms are grouped, the combination process begins. Two terms can be combined if and only if they:

1. Differ in exactly one bit position
2. Have identical values in all other bit positions

When two terms are combined, the differing bit position is replaced with a dash (-), indicating that the variable is eliminated from the product term. This dash notation represents a "don't care" for that particular variable position.

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Example: Combining Group 0 with Group 1</p>

<table style="font-size: 0.92rem; margin: 0.8rem auto; border-collapse: collapse; width: 95%;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 6px 12px;">Pair</th><th style="padding: 6px 12px;">Binary</th><th style="padding: 6px 12px;">Differing Bit</th><th style="padding: 6px 12px;">Result</th></tr></thead>
<tbody>
<tr><td style="padding: 6px 12px; border-bottom: 1px solid #ddd;">m<sub>0</sub> &amp; m<sub>1</sub></td><td style="padding: 6px 12px; border-bottom: 1px solid #ddd; font-family: monospace;">0000 &amp; 0001</td><td style="padding: 6px 12px; border-bottom: 1px solid #ddd; text-align: center;">D</td><td style="padding: 6px 12px; border-bottom: 1px solid #ddd; font-family: monospace; color: #2E7D32; font-weight: 600;">000-</td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 6px 12px; border-bottom: 1px solid #ddd;">m<sub>0</sub> &amp; m<sub>2</sub></td><td style="padding: 6px 12px; border-bottom: 1px solid #ddd; font-family: monospace;">0000 &amp; 0010</td><td style="padding: 6px 12px; border-bottom: 1px solid #ddd; text-align: center;">C</td><td style="padding: 6px 12px; border-bottom: 1px solid #ddd; font-family: monospace; color: #2E7D32; font-weight: 600;">00-0</td></tr>
<tr><td style="padding: 6px 12px;">m<sub>0</sub> &amp; m<sub>8</sub></td><td style="padding: 6px 12px; font-family: monospace;">0000 &amp; 1000</td><td style="padding: 6px 12px; text-align: center;">A</td><td style="padding: 6px 12px; font-family: monospace; color: #2E7D32; font-weight: 600;">-000</td></tr>
</tbody>
</table>

<p style="color: #333; margin-bottom: 0;">Each combined minterm gets a check mark (&check;) &mdash; it is <em>not</em> a prime implicant by itself. Unchecked terms become prime implicants.</p>

</div>

The combination process continues iteratively:

<div style="display: flex; gap: 18px; flex-wrap: wrap; margin: 1.2rem 0;">
<div style="flex: 1; min-width: 200px; background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 18px 20px;">
<p style="color: #1565C0; font-weight: 700; margin-top: 0; margin-bottom: 8px;">1st Iteration</p>
<p style="color: #333; margin: 0; font-size: 0.95rem;">Combine minterms &rarr; 2-cell implicants (one dash)</p>
</div>
<div style="flex: 1; min-width: 200px; background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 10px; padding: 18px 20px;">
<p style="color: #8D6E00; font-weight: 700; margin-top: 0; margin-bottom: 8px;">2nd Iteration</p>
<p style="color: #333; margin: 0; font-size: 0.95rem;">Combine 2-cell implicants &rarr; 4-cell (two dashes)</p>
</div>
<div style="flex: 1; min-width: 200px; background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 20px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0; margin-bottom: 8px;">Continue&hellip;</p>
<p style="color: #333; margin: 0; font-size: 0.95rem;">Until no more combinations are possible</p>
</div>
</div>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #8D6E00; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 10px;">Combination Rule</p>

<p style="color: #333; margin-bottom: 8px;">Two terms with dashes can only be combined if:</p>
<ul style="margin: 0 0 10px 0; line-height: 2; color: #333; padding-left: 1.5rem;">
<li>The dashes appear in the <strong>same positions</strong></li>
<li>The non-dash positions differ in <strong>exactly one bit</strong></li>
</ul>

<p style="color: #333; margin-bottom: 0;"><strong>Example:</strong> <code>0-01</code> and <code>0-11</code> can combine to form <code>0--1</code>, but <code>0-01</code> and <code>-001</code> <strong>cannot</strong> combine because the dashes are in different positions.</p>

</div>

## 6.4 Constructing the Implicant Table

The implicant table organizes the systematic combination process. Let us work through the complete example.

<p style="color: #5A3EED; font-weight: 700; font-size: 1.05rem; margin-bottom: 10px;">Initial Grouping (Column 1):</p>

<table style="font-size: 0.9rem; margin: 0.8rem auto 1.5rem auto; border-collapse: collapse;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 6px 14px;">Group</th><th style="padding: 6px 14px;">Minterm</th><th style="padding: 6px 14px;">Binary</th><th style="padding: 6px 14px;">&check;</th></tr></thead>
<tbody>
<tr style="background: #e3f2fd;"><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; font-weight: 600;">0</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd;">0</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; font-family: monospace;">0000</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; text-align: center; color: #2E7D32;">&check;</td></tr>
<tr><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; font-weight: 600;" rowspan="3">1</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd;">1</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; font-family: monospace;">0001</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; text-align: center; color: #2E7D32;">&check;</td></tr>
<tr><td style="padding: 6px 14px; border-bottom: 1px solid #ddd;">2</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; font-family: monospace;">0010</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; text-align: center; color: #2E7D32;">&check;</td></tr>
<tr><td style="padding: 6px 14px; border-bottom: 1px solid #ddd;">8</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; font-family: monospace;">1000</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; text-align: center; color: #2E7D32;">&check;</td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; font-weight: 600;" rowspan="4">2</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd;">5</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; font-family: monospace;">0101</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; text-align: center; color: #2E7D32;">&check;</td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 6px 14px; border-bottom: 1px solid #ddd;">6</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; font-family: monospace;">0110</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; text-align: center; color: #2E7D32;">&check;</td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 6px 14px; border-bottom: 1px solid #ddd;">9</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; font-family: monospace;">1001</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; text-align: center; color: #2E7D32;">&check;</td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 6px 14px; border-bottom: 1px solid #ddd;">10</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; font-family: monospace;">1010</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; text-align: center; color: #2E7D32;">&check;</td></tr>
<tr style="background: #fff3e0;"><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; font-weight: 600;" rowspan="2">3</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd;">7</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; font-family: monospace;">0111</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; text-align: center; color: #2E7D32;">&check;</td></tr>
<tr style="background: #fff3e0;"><td style="padding: 6px 14px;">14</td><td style="padding: 6px 14px; font-family: monospace;">1110</td><td style="padding: 6px 14px; text-align: center; color: #2E7D32;">&check;</td></tr>
</tbody>
</table>

<p style="color: #5A3EED; font-weight: 700; font-size: 1.05rem; margin-bottom: 10px;">First Combination (Column 2):</p>

<table style="font-size: 0.9rem; margin: 0.8rem auto 1.5rem auto; border-collapse: collapse;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 6px 14px;">Group</th><th style="padding: 6px 14px;">Minterms</th><th style="padding: 6px 14px;">Pattern</th><th style="padding: 6px 14px;">&check;</th></tr></thead>
<tbody>
<tr><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; font-weight: 600;" rowspan="3">0&ndash;1</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd;">0, 1</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; font-family: monospace;">000-</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; text-align: center; color: #2E7D32;">&check;</td></tr>
<tr><td style="padding: 6px 14px; border-bottom: 1px solid #ddd;">0, 2</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; font-family: monospace;">00-0</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; text-align: center; color: #2E7D32;">&check;</td></tr>
<tr><td style="padding: 6px 14px; border-bottom: 1px solid #ddd;">0, 8</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; font-family: monospace;">-000</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; text-align: center; color: #2E7D32;">&check;</td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; font-weight: 600;" rowspan="6">1&ndash;2</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd;">1, 5</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; font-family: monospace; color: #C62828; font-weight: 600;">0-01</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; text-align: center;"></td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 6px 14px; border-bottom: 1px solid #ddd;">1, 9</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; font-family: monospace; color: #C62828; font-weight: 600;">-001</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; text-align: center;"></td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 6px 14px; border-bottom: 1px solid #ddd;">2, 6</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; font-family: monospace;">0-10</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; text-align: center; color: #2E7D32;">&check;</td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 6px 14px; border-bottom: 1px solid #ddd;">2, 10</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; font-family: monospace;">-010</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; text-align: center; color: #2E7D32;">&check;</td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 6px 14px; border-bottom: 1px solid #ddd;">8, 9</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; font-family: monospace;">100-</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; text-align: center; color: #2E7D32;">&check;</td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 6px 14px; border-bottom: 1px solid #ddd;">8, 10</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; font-family: monospace;">10-0</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; text-align: center; color: #2E7D32;">&check;</td></tr>
<tr><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; font-weight: 600;" rowspan="4">2&ndash;3</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd;">5, 7</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; font-family: monospace; color: #C62828; font-weight: 600;">01-1</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; text-align: center;"></td></tr>
<tr><td style="padding: 6px 14px; border-bottom: 1px solid #ddd;">6, 7</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; font-family: monospace; color: #C62828; font-weight: 600;">011-</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; text-align: center;"></td></tr>
<tr><td style="padding: 6px 14px; border-bottom: 1px solid #ddd;">6, 14</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; font-family: monospace;">-110</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; text-align: center; color: #2E7D32;">&check;</td></tr>
<tr><td style="padding: 6px 14px;">10, 14</td><td style="padding: 6px 14px; font-family: monospace;">1-10</td><td style="padding: 6px 14px; text-align: center; color: #2E7D32;">&check;</td></tr>
</tbody>
</table>

<p style="color: #5A3EED; font-weight: 700; font-size: 1.05rem; margin-bottom: 10px;">Second Combination (Column 3):</p>

<table style="font-size: 0.9rem; margin: 0.8rem auto 1.5rem auto; border-collapse: collapse;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 6px 14px;">Group</th><th style="padding: 6px 14px;">Minterms</th><th style="padding: 6px 14px;">Pattern</th><th style="padding: 6px 14px;">&check;</th></tr></thead>
<tbody>
<tr><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; font-weight: 600;" rowspan="2">0&ndash;1&ndash;2</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd;">0, 1, 8, 9</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; font-family: monospace; color: #C62828; font-weight: 600;">-00-</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; text-align: center;"></td></tr>
<tr><td style="padding: 6px 14px; border-bottom: 1px solid #ddd;">0, 2, 8, 10</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; font-family: monospace; color: #C62828; font-weight: 600;">-0-0</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; text-align: center;"></td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 6px 14px; font-weight: 600;">1&ndash;2&ndash;3</td><td style="padding: 6px 14px;">2, 6, 10, 14</td><td style="padding: 6px 14px; font-family: monospace; color: #C62828; font-weight: 600;">--10</td><td style="padding: 6px 14px; text-align: center;"></td></tr>
</tbody>
</table>

#### Diagram: QM Combination Process Simulator

<iframe src="../sims/qm-combination-simulator/main.html" width="100%" height="582px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>

<details markdown="1">
<summary>QM Combination Process Simulator Specification</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: Execute, implement

Learning Objective: Students will be able to execute the QM combination process step-by-step, identifying which terms can be combined and correctly applying dash notation.

Visual Elements:
- Three-column layout showing progressive combination stages
- Column 1: Original minterms grouped by number of 1s
- Column 2: First-level combinations (1 dash)
- Column 3: Second-level combinations (2 dashes)
- Each term displays: minterm coverage, binary/dash pattern, check mark if combined
- Connecting lines between columns showing which terms combined
- Prime implicant highlight (unchecked terms in gold)

Interactive Controls:
- Input: Minterm list entry
- Dropdown: Number of variables (3, 4, 5)
- Button: "Step" - advance one combination at a time
- Button: "Run All" - complete all combinations
- Button: "Reset"
- Toggle: "Show combination details" - displays which bit differs when combining

Step-by-Step Behavior:
- Step 1: Display grouped minterms in Column 1
- Step 2-N: Each step attempts one combination, showing:
  - The two terms being compared
  - Whether they can combine (highlighting the differing bit)
  - The resulting term with dash notation
  - Check marks added to combined source terms
- Final: Highlight all unchecked terms as prime implicants

Data Visibility Requirements:
- Before combination: Show both source terms with binary patterns
- During combination: Highlight the differing bit position
- After combination: Show result with dash, update check marks

Instructional Rationale: Step-through execution allows students to practice the mechanical process of QM combination. Seeing each comparison explicitly builds procedural fluency before attempting problems independently.

Canvas Size: 950x600 pixels, responsive
Implementation: p5.js
</details>

## 6.5 Identifying Prime Implicants

After all possible combinations have been made, the **unchecked terms** from all columns are the prime implicants. These are the largest possible groupings of minterms that cannot be further combined.

From our example, the prime implicants are:

<table style="font-size: 0.9rem; margin: 1rem auto; border-collapse: collapse;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 6px 14px;">Prime Implicant</th><th style="padding: 6px 14px;">Pattern</th><th style="padding: 6px 14px;">Minterms Covered</th><th style="padding: 6px 14px;">Boolean Expression</th></tr></thead>
<tbody>
<tr><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; font-weight: 600;">PI<sub>1</sub></td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; font-family: monospace;">0-01</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd;">1, 5</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd;"><span class="arithmatex">\(\bar{A}\bar{C}D\)</span></td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; font-weight: 600;">PI<sub>2</sub></td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; font-family: monospace;">-001</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd;">1, 9</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd;"><span class="arithmatex">\(\bar{B}\bar{C}D\)</span></td></tr>
<tr><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; font-weight: 600;">PI<sub>3</sub></td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; font-family: monospace;">01-1</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd;">5, 7</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd;"><span class="arithmatex">\(\bar{A}BD\)</span></td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; font-weight: 600;">PI<sub>4</sub></td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; font-family: monospace;">011-</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd;">6, 7</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd;"><span class="arithmatex">\(\bar{A}BC\)</span></td></tr>
<tr><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; font-weight: 600;">PI<sub>5</sub></td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; font-family: monospace;">-00-</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd;">0, 1, 8, 9</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd;"><span class="arithmatex">\(\bar{B}\bar{C}\)</span></td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; font-weight: 600;">PI<sub>6</sub></td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; font-family: monospace;">-0-0</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd;">0, 2, 8, 10</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd;"><span class="arithmatex">\(\bar{B}\bar{D}\)</span></td></tr>
<tr><td style="padding: 6px 14px; font-weight: 600;">PI<sub>7</sub></td><td style="padding: 6px 14px; font-family: monospace;">--10</td><td style="padding: 6px 14px;">2, 6, 10, 14</td><td style="padding: 6px 14px;"><span class="arithmatex">\(C\bar{D}\)</span></td></tr>
</tbody>
</table>

<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #2E7D32; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Converting Pattern to Boolean Expression</p>

<table style="font-size: 0.92rem; margin: 0.8rem auto; border-collapse: collapse; width: 90%;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 8px 16px;">Pattern Value</th><th style="padding: 8px 16px;">Meaning</th></tr></thead>
<tbody>
<tr><td style="padding: 8px 16px; border-bottom: 1px solid #ddd; font-family: monospace; font-weight: 700;">0</td><td style="padding: 8px 16px; border-bottom: 1px solid #ddd;">Variable appears <strong>complemented</strong></td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 8px 16px; border-bottom: 1px solid #ddd; font-family: monospace; font-weight: 700;">1</td><td style="padding: 8px 16px; border-bottom: 1px solid #ddd;">Variable appears <strong>uncomplemented</strong></td></tr>
<tr><td style="padding: 8px 16px; font-family: monospace; font-weight: 700;">-</td><td style="padding: 8px 16px;">Variable is <strong>absent</strong> from the term</td></tr>
</tbody>
</table>

</div>

<div style="background: #FFEBEE; border: 2px solid #E57373; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #C62828; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 10px;">Common Mistake</p>

<p style="color: #333; margin-bottom: 0;">Students sometimes confuse which terms are prime implicants. Remember: only <strong>unchecked</strong> terms are prime implicants. A term with a check mark has been absorbed into a larger grouping and is not a prime implicant.</p>

</div>

## 6.6 The Prime Implicant Chart

The prime implicant chart (also called the selection table or covering table) determines which prime implicants to include in the final minimal expression. The chart has:

- **Rows:** One for each prime implicant
- **Columns:** One for each minterm in the original function
- **Marks (×):** Placed where a prime implicant covers a minterm

<table style="font-size: 0.85rem; margin: 1rem auto; border-collapse: collapse;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 5px 10px;">PI</th><th style="padding: 5px 10px;">Pattern</th><th style="padding: 5px 10px;">0</th><th style="padding: 5px 10px;">1</th><th style="padding: 5px 10px;">2</th><th style="padding: 5px 10px;">5</th><th style="padding: 5px 10px;">6</th><th style="padding: 5px 10px;">7</th><th style="padding: 5px 10px;">8</th><th style="padding: 5px 10px;">9</th><th style="padding: 5px 10px;">10</th><th style="padding: 5px 10px; background: #FFD600; color: #333;">14</th></tr></thead>
<tbody>
<tr><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; font-weight: 600;">PI<sub>1</sub></td><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; font-family: monospace;">0-01</td><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; text-align: center;">&times;</td><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; text-align: center;">&times;</td><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; text-align: center;"></td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; font-weight: 600;">PI<sub>2</sub></td><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; font-family: monospace;">-001</td><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; text-align: center;">&times;</td><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; text-align: center;">&times;</td><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; text-align: center;"></td></tr>
<tr><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; font-weight: 600;">PI<sub>3</sub></td><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; font-family: monospace;">01-1</td><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; text-align: center;">&times;</td><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; text-align: center;">&times;</td><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; text-align: center;"></td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; font-weight: 600;">PI<sub>4</sub></td><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; font-family: monospace;">011-</td><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; text-align: center;">&times;</td><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; text-align: center;">&times;</td><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; text-align: center;"></td></tr>
<tr><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; font-weight: 600;">PI<sub>5</sub></td><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; font-family: monospace;">-00-</td><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; text-align: center;">&times;</td><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; text-align: center;">&times;</td><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; text-align: center;">&times;</td><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; text-align: center;">&times;</td><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; text-align: center;"></td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; font-weight: 600;">PI<sub>6</sub></td><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; font-family: monospace;">-0-0</td><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; text-align: center;">&times;</td><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; text-align: center;">&times;</td><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; text-align: center;">&times;</td><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; text-align: center;">&times;</td><td style="padding: 5px 10px; border-bottom: 1px solid #ddd; text-align: center;"></td></tr>
<tr style="background: #d4edda;"><td style="padding: 5px 10px; font-weight: 700; color: #2E7D32;">PI<sub>7</sub></td><td style="padding: 5px 10px; font-family: monospace; font-weight: 700;">--10</td><td style="padding: 5px 10px; text-align: center;"></td><td style="padding: 5px 10px; text-align: center;"></td><td style="padding: 5px 10px; text-align: center;">&times;</td><td style="padding: 5px 10px; text-align: center;"></td><td style="padding: 5px 10px; text-align: center;">&times;</td><td style="padding: 5px 10px; text-align: center;"></td><td style="padding: 5px 10px; text-align: center;"></td><td style="padding: 5px 10px; text-align: center;"></td><td style="padding: 5px 10px; text-align: center;">&times;</td><td style="padding: 5px 10px; text-align: center; font-weight: 700; color: #2E7D32;">&times;</td></tr>
</tbody>
</table>

<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #2E7D32; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Finding Essential Prime Implicants</p>

<p style="color: #333; margin-bottom: 10px;">Look for columns with only <strong>one &times; mark</strong> &mdash; the PI in that row is essential.</p>

<p style="color: #333; margin-bottom: 6px;">Examining each column:</p>
<ul style="margin: 0.3rem 0 0.8rem 0; color: #333; line-height: 1.9; font-size: 0.95rem;">
<li>Minterm 0: PI<sub>5</sub>, PI<sub>6</sub></li>
<li>Minterm 1: PI<sub>1</sub>, PI<sub>2</sub>, PI<sub>5</sub></li>
<li>Minterm 2: PI<sub>6</sub>, PI<sub>7</sub></li>
<li>Minterm 5: PI<sub>1</sub>, PI<sub>3</sub></li>
<li>Minterm 6: PI<sub>4</sub>, PI<sub>7</sub></li>
<li>Minterm 7: PI<sub>3</sub>, PI<sub>4</sub></li>
<li>Minterm 8: PI<sub>5</sub>, PI<sub>6</sub></li>
<li>Minterm 9: PI<sub>2</sub>, PI<sub>5</sub></li>
<li>Minterm 10: PI<sub>6</sub>, PI<sub>7</sub></li>
<li><strong style="color: #2E7D32;">Minterm 14: PI<sub>7</sub> only &rarr; PI<sub>7</sub> is essential!</strong></li>
</ul>

<p style="color: #2E7D32; font-weight: 600; margin-bottom: 0;">Select PI<sub>7</sub> &mdash; covers minterms {2, 6, 10, 14}.</p>

</div>

## 6.7 Row and Column Dominance

After selecting essential prime implicants, we may need additional techniques to reduce the prime implicant chart before finding a minimum cover.

<div style="display: flex; gap: 18px; flex-wrap: wrap; margin: 1.2rem 0;">
<div style="flex: 1; min-width: 250px; background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 10px; padding: 18px 20px;">
<p style="color: #1565C0; font-weight: 700; margin-top: 0; margin-bottom: 8px;">Column Dominance</p>
<p style="color: #333; margin: 0; font-size: 0.95rem;">Column <em>j</em> dominates column <em>k</em> if every PI that covers <em>k</em> also covers <em>j</em>. Remove the dominated column <em>j</em>.</p>
</div>
<div style="flex: 1; min-width: 250px; background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 10px; padding: 18px 20px;">
<p style="color: #8D6E00; font-weight: 700; margin-top: 0; margin-bottom: 8px;">Row Dominance</p>
<p style="color: #333; margin: 0; font-size: 0.95rem;">Row <span class="arithmatex">\(P_i\)</span> dominates <span class="arithmatex">\(P_j\)</span> if <span class="arithmatex">\(P_i\)</span> covers every minterm that <span class="arithmatex">\(P_j\)</span> covers. Eliminate the dominated row.</p>
</div>
</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 8px;">Reduced Chart after selecting PI<sub>7</sub></p>
<p style="color: #666; margin-bottom: 14px;">Minterms still to cover: {0, 1, 5, 7, 8, 9}</p>

<table style="font-size: 0.88rem; margin: 0.8rem auto; border-collapse: collapse;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 5px 12px;">PI</th><th style="padding: 5px 12px;">0</th><th style="padding: 5px 12px;">1</th><th style="padding: 5px 12px;">5</th><th style="padding: 5px 12px;">7</th><th style="padding: 5px 12px;">8</th><th style="padding: 5px 12px;">9</th></tr></thead>
<tbody>
<tr><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; font-weight: 600;">PI<sub>1</sub></td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center;">&times;</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center;">&times;</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center;"></td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; font-weight: 600;">PI<sub>2</sub></td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center;">&times;</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center;">&times;</td></tr>
<tr><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; font-weight: 600;">PI<sub>3</sub></td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center;">&times;</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center;">&times;</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center;"></td></tr>
<tr style="background: #FFEBEE;"><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; font-weight: 600; text-decoration: line-through; color: #999;">PI<sub>4</sub></td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center;">&times;</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center;"></td></tr>
<tr><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; font-weight: 600;">PI<sub>5</sub></td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center;">&times;</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center;">&times;</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center;">&times;</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center;">&times;</td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 5px 12px; font-weight: 600;">PI<sub>6</sub></td><td style="padding: 5px 12px; text-align: center;">&times;</td><td style="padding: 5px 12px; text-align: center;"></td><td style="padding: 5px 12px; text-align: center;"></td><td style="padding: 5px 12px; text-align: center;"></td><td style="padding: 5px 12px; text-align: center;">&times;</td><td style="padding: 5px 12px; text-align: center;"></td></tr>
</tbody>
</table>

<p style="color: #333; margin-bottom: 6px;"><strong>Row dominance:</strong> PI<sub>4</sub> only covers minterm 7, but PI<sub>3</sub> covers {5, 7} &mdash; PI<sub>3</sub> dominates PI<sub>4</sub> &rarr; <span style="color: #C62828; font-weight: 600;">Remove PI<sub>4</sub></span></p>

<p style="color: #333; margin-bottom: 0;">PI<sub>5</sub> covers {0, 1, 8, 9} which is a superset of PI<sub>2</sub>&rsquo;s {1, 9} and PI<sub>6</sub>&rsquo;s {0, 8}.</p>

</div>

## 6.8 Petrick's Method

When the prime implicant chart cannot be fully reduced by row/column dominance and essential prime implicant selection, **Petrick's method** provides an algebraic approach to finding all minimum covers.

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #8D6E00; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Petrick's Method Procedure</p>

<ol style="margin: 0; line-height: 2.2; color: #333; padding-left: 1.5rem;">
<li>Assign a Boolean variable (<span class="arithmatex">\(P_1, P_2, \ldots\)</span>) to each prime implicant</li>
<li>For each minterm column, form a <strong>sum (OR)</strong> of the PIs that cover it</li>
<li><strong>Multiply (AND)</strong> all these sums together</li>
<li>Expand and simplify to find minimum covers</li>
</ol>

</div>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Example: Remaining minterms {0, 1, 5, 7}</p>

<table style="font-size: 0.92rem; margin: 0.8rem auto; border-collapse: collapse; width: 90%;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 6px 14px;">Minterm</th><th style="padding: 6px 14px;">Covered By</th><th style="padding: 6px 14px;">Sum Term</th></tr></thead>
<tbody>
<tr><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; text-align: center;">0</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd;">PI<sub>5</sub>, PI<sub>6</sub></td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd;"><span class="arithmatex">\((P_5 + P_6)\)</span></td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; text-align: center;">1</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd;">PI<sub>1</sub>, PI<sub>2</sub>, PI<sub>5</sub></td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd;"><span class="arithmatex">\((P_1 + P_2 + P_5)\)</span></td></tr>
<tr><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; text-align: center;">5</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd;">PI<sub>1</sub>, PI<sub>3</sub></td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd;"><span class="arithmatex">\((P_1 + P_3)\)</span></td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 6px 14px; text-align: center;">7</td><td style="padding: 6px 14px;">PI<sub>3</sub></td><td style="padding: 6px 14px;"><span class="arithmatex">\((P_3)\)</span></td></tr>
</tbody>
</table>

**Petrick's function:**

$$P = (P_5 + P_6)(P_1 + P_2 + P_5)(P_1 + P_3)(P_3)$$

Since $P_3$ must be true (minterm 7): $(P_1 + P_3) = 1$

$$P = (P_5 + P_6)(P_1 + P_2 + P_5)$$

Expanding and applying absorption ($P_5$ absorbs $P_1P_5$, $P_2P_5$, $P_5P_6$):

$$P = P_5 + P_1P_6 + P_2P_6$$

**Minimum covers:**

- <strong style="color: #2E7D32;">{PI<sub>3</sub>, PI<sub>5</sub>, PI<sub>7</sub>}</strong> — 3 prime implicants (minimum cover)
- {PI<sub>1</sub>, PI<sub>3</sub>, PI<sub>6</sub>, PI<sub>7</sub>} — 4 prime implicants
- {PI<sub>2</sub>, PI<sub>3</sub>, PI<sub>6</sub>, PI<sub>7</sub>} — 4 prime implicants

</div>

#### Diagram: Prime Implicant Chart Interactive

<iframe src="../sims/pi-chart-interactive/main.html" width="100%" height="582px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>

<details markdown="1">
<summary>Prime Implicant Chart Interactive Specification</summary>
Type: microsim

Bloom Level: Analyze (L4)
Bloom Verb: Examine, differentiate

Learning Objective: Students will be able to analyze a prime implicant chart to identify essential prime implicants, apply row and column dominance, and determine a minimum cover.

Visual Elements:
- Main display: Interactive prime implicant chart as a grid
- Columns: Minterms (numbered)
- Rows: Prime implicants (labeled with pattern and Boolean expression)
- Marks: × symbols showing coverage
- Color coding:
  - Essential PI rows: Green background
  - Selected PIs: Blue background
  - Eliminated PIs: Red strikethrough
  - Covered minterms: Gray columns
  - Single-cover columns (indicates EPI): Gold highlight

Interactive Controls:
- Input: Enter minterms and prime implicants, or use example
- Button: "Find Essential PIs" - highlights columns with single ×
- Button: "Apply Row Dominance" - identifies and optionally removes dominated rows
- Button: "Apply Column Dominance" - identifies and optionally removes dominated columns
- Clickable rows: Select/deselect prime implicants manually
- Display: Running count of selected PIs, literals, and remaining uncovered minterms
- Button: "Check Solution" - verifies if all minterms are covered
- Button: "Reset"

Behavior:
- When "Find Essential PIs" clicked, scan columns and highlight those with single ×
- Auto-select essential PIs and gray out covered minterm columns
- Row/column dominance shows relationships with dotted lines before removal
- Manual selection updates the "uncovered minterms" display in real-time
- "Check Solution" validates coverage and displays result

Data Visibility Requirements:
- Initial: Full chart with all PIs and minterms
- After EPI selection: Show which minterms are now covered
- After dominance: Show reduced chart
- Solution: Show final selected PIs and Boolean expression

Instructional Rationale: The chart analysis process requires students to examine relationships between prime implicants and minterms. Interactive exploration allows trying different selection strategies to find minimum solutions.

Canvas Size: 900x550 pixels, responsive
Implementation: p5.js with HTML table overlay
</details>

## 6.9 Cyclic Prime Implicant Charts

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #8D6E00; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">When Does a Cyclic Chart Occur?</p>

<ul style="margin: 0; line-height: 2.2; color: #333; padding-left: 1.5rem;">
<li>There are <strong>no essential prime implicants</strong></li>
<li>Row and column dominance <strong>cannot reduce</strong> the chart</li>
<li>Multiple equivalent minimum solutions exist</li>
</ul>

<p style="color: #666; font-style: italic; margin-bottom: 0;">In such cases, Petrick's method must be applied to the full chart.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Example: Cyclic Chart for <span class="arithmatex">\(F(A,B,C) = \sum m(0, 1, 2, 5, 6, 7)\)</span></p>

<table style="font-size: 0.88rem; margin: 0.8rem auto; border-collapse: collapse;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 5px 12px;">PI</th><th style="padding: 5px 12px;">Expression</th><th style="padding: 5px 12px;">0</th><th style="padding: 5px 12px;">1</th><th style="padding: 5px 12px;">2</th><th style="padding: 5px 12px;">5</th><th style="padding: 5px 12px;">6</th><th style="padding: 5px 12px;">7</th></tr></thead>
<tbody>
<tr><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; font-weight: 600;">PI<sub>1</sub></td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd;"><span class="arithmatex">\(\bar{A}\bar{B}\)</span></td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center;">&times;</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center;">&times;</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center;"></td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; font-weight: 600;">PI<sub>2</sub></td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd;"><span class="arithmatex">\(\bar{A}\bar{C}\)</span></td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center;">&times;</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center;">&times;</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center;"></td></tr>
<tr><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; font-weight: 600;">PI<sub>3</sub></td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd;"><span class="arithmatex">\(\bar{B}C\)</span></td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center;">&times;</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center;">&times;</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center;"></td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; font-weight: 600;">PI<sub>4</sub></td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd;"><span class="arithmatex">\(B\bar{C}\)</span></td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center;">&times;</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center;">&times;</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center;"></td></tr>
<tr><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; font-weight: 600;">PI<sub>5</sub></td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd;"><span class="arithmatex">\(\bar{A}B\)</span></td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center;">&times;</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center;">&times;</td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 5px 12px; font-weight: 600;">PI<sub>6</sub></td><td style="padding: 5px 12px;"><span class="arithmatex">\(AC\)</span></td><td style="padding: 5px 12px; text-align: center;"></td><td style="padding: 5px 12px; text-align: center;"></td><td style="padding: 5px 12px; text-align: center;"></td><td style="padding: 5px 12px; text-align: center;">&times;</td><td style="padding: 5px 12px; text-align: center;"></td><td style="padding: 5px 12px; text-align: center;">&times;</td></tr>
</tbody>
</table>

<p style="color: #C62828; font-weight: 600; margin-bottom: 12px;">Every column has exactly two &times;'s &mdash; no essential prime implicants exist!</p>

<p style="color: #333; font-weight: 700; margin-bottom: 6px;">Two minimum solutions (3 PIs, 6 literals each):</p>
<div style="display: flex; gap: 18px; flex-wrap: wrap;">
<div style="flex: 1; min-width: 200px; background: #d4edda; border-radius: 8px; padding: 12px 16px;">
<p style="color: #2E7D32; font-weight: 700; margin: 0;"><span class="arithmatex">\(F = \bar{A}\bar{B} + B\bar{C} + AC\)</span></p>
<p style="color: #666; margin: 4px 0 0 0; font-size: 0.9rem;">PI<sub>1</sub> + PI<sub>4</sub> + PI<sub>6</sub></p>
</div>
<div style="flex: 1; min-width: 200px; background: #d4edda; border-radius: 8px; padding: 12px 16px;">
<p style="color: #2E7D32; font-weight: 700; margin: 0;"><span class="arithmatex">\(F = \bar{A}\bar{C} + \bar{B}C + \bar{A}B\)</span></p>
<p style="color: #666; margin: 4px 0 0 0; font-size: 0.9rem;">PI<sub>2</sub> + PI<sub>3</sub> + PI<sub>5</sub></p>
</div>
</div>

</div>

## 6.10 Handling Don't Care Conditions

Don't care conditions are handled naturally in the QM method. During the combination phase, don't care minterms are included along with the required minterms. They participate in combinations, potentially creating larger prime implicants.

<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #2E7D32; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Key Rules for Don't Cares in QM</p>

<table style="font-size: 0.92rem; margin: 0.8rem auto; border-collapse: collapse; width: 95%;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 8px 16px;">Phase</th><th style="padding: 8px 16px;">Don't Care Treatment</th></tr></thead>
<tbody>
<tr><td style="padding: 8px 16px; border-bottom: 1px solid #ddd; font-weight: 600;">Combination phase</td><td style="padding: 8px 16px; border-bottom: 1px solid #ddd;"><strong>Include</strong> don't cares &mdash; they participate in combinations</td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 8px 16px; font-weight: 600;">PI chart phase</td><td style="padding: 8px 16px;">Don't cares do <strong>NOT</strong> appear as columns &mdash; only required minterms must be covered</td></tr>
</tbody>
</table>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Example: <span class="arithmatex">\(F(A,B,C,D) = \sum m(1, 3, 5, 7, 9) + d(6, 12, 13)\)</span></p>

<ol style="margin: 0; line-height: 2.2; color: #333; padding-left: 1.5rem;">
<li>In the combination table, include minterms {1, 3, 5, 6, 7, 9, 12, 13}</li>
<li>Combine as usual to find all prime implicants</li>
<li>In the PI chart, only include columns for <strong>{1, 3, 5, 7, 9}</strong></li>
<li>Prime implicants created via don't care combinations are valid</li>
</ol>

<p style="color: #666; font-style: italic; margin-top: 12px; margin-bottom: 0;"><strong>Don't care benefit:</strong> Minterm 6 (0110) can combine with minterm 7 (0111) to form <code>011-</code> (<span class="arithmatex">\(\bar{A}BC\)</span>). If this PI helps cover required minterms more efficiently, the optimization wouldn't exist without the don't care.</p>

</div>

## 6.11 Computational Complexity

The QM method, while systematic, has exponential worst-case complexity:

<div style="display: flex; gap: 18px; flex-wrap: wrap; margin: 1.2rem 0;">
<div style="flex: 1; min-width: 200px; background: #FFEBEE; border: 2px solid #E57373; border-radius: 10px; padding: 18px 20px;">
<p style="color: #C62828; font-weight: 700; margin-top: 0; margin-bottom: 8px;">Prime Implicants</p>
<p style="color: #333; margin: 0; font-size: 0.95rem;">Can be as large as <span class="arithmatex">\(3^n / n\)</span> for <span class="arithmatex">\(n\)</span> variables</p>
</div>
<div style="flex: 1; min-width: 200px; background: #FFEBEE; border: 2px solid #E57373; border-radius: 10px; padding: 18px 20px;">
<p style="color: #C62828; font-weight: 700; margin-top: 0; margin-bottom: 8px;">PI Chart</p>
<p style="color: #333; margin: 0; font-size: 0.95rem;">Can have exponentially many rows and columns</p>
</div>
<div style="flex: 1; min-width: 200px; background: #FFEBEE; border: 2px solid #E57373; border-radius: 10px; padding: 18px 20px;">
<p style="color: #C62828; font-weight: 700; margin-top: 0; margin-bottom: 8px;">Minimum Cover</p>
<p style="color: #333; margin: 0; font-size: 0.95rem;">NP-complete in general</p>
</div>
</div>

<table style="font-size: 0.92rem; margin: 1.2rem auto; border-collapse: collapse; width: 80%;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 8px 14px;">Variables</th><th style="padding: 8px 14px;">Approx. Max PIs</th><th style="padding: 8px 14px;">Practical?</th></tr></thead>
<tbody>
<tr><td style="padding: 8px 14px; border-bottom: 1px solid #ddd; text-align: center;">4</td><td style="padding: 8px 14px; border-bottom: 1px solid #ddd; text-align: center;">~20</td><td style="padding: 8px 14px; border-bottom: 1px solid #ddd; text-align: center; color: #2E7D32; font-weight: 600;">Yes</td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 8px 14px; border-bottom: 1px solid #ddd; text-align: center;">6</td><td style="padding: 8px 14px; border-bottom: 1px solid #ddd; text-align: center;">~100</td><td style="padding: 8px 14px; border-bottom: 1px solid #ddd; text-align: center; color: #2E7D32; font-weight: 600;">Yes</td></tr>
<tr><td style="padding: 8px 14px; border-bottom: 1px solid #ddd; text-align: center;">10</td><td style="padding: 8px 14px; border-bottom: 1px solid #ddd; text-align: center;">~5,900</td><td style="padding: 8px 14px; border-bottom: 1px solid #ddd; text-align: center; color: #F57C00; font-weight: 600;">Challenging</td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 8px 14px; border-bottom: 1px solid #ddd; text-align: center;">15</td><td style="padding: 8px 14px; border-bottom: 1px solid #ddd; text-align: center;">~950,000</td><td style="padding: 8px 14px; border-bottom: 1px solid #ddd; text-align: center; color: #C62828; font-weight: 600;">Requires heuristics</td></tr>
<tr><td style="padding: 8px 14px; text-align: center;">20</td><td style="padding: 8px 14px; text-align: center;">~58,000,000</td><td style="padding: 8px 14px; text-align: center; color: #C62828; font-weight: 600;">Impractical (exact)</td></tr>
</tbody>
</table>

<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #2E7D32; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 10px;">Why QM Still Matters</p>

<ul style="margin: 0; line-height: 2.2; color: #333; padding-left: 1.5rem;">
<li>Provides the <strong>theoretical foundation</strong> for understanding minimization</li>
<li>Guarantees <strong>optimal solutions</strong> for functions where K-maps are impractical but exact solutions are needed</li>
<li>Illustrates fundamental concepts used in <strong>more advanced algorithms</strong></li>
</ul>

</div>

#### Diagram: QM Complexity Visualization

<iframe src="../sims/qm-complexity-chart/main.html" width="100%" height="550px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>

<details markdown="1">
<summary>QM Complexity Visualization Specification</summary>
Type: chart

Bloom Level: Evaluate (L5)
Bloom Verb: Assess, compare

Learning Objective: Students will be able to assess when the QM method is practical versus when heuristic methods are preferred based on problem size.

Chart Type: Dual-axis line chart

Purpose: Visualize the exponential growth of QM computational requirements as variable count increases, compared to heuristic methods.

X-axis: Number of variables (2 to 20)
Y-axis 1 (left, logarithmic): Computation time (relative units)
Y-axis 2 (right, logarithmic): Maximum number of prime implicants

Data Series:
1. QM Method Time (red line, exponential growth)
   - 2 vars: 1
   - 4 vars: 10
   - 6 vars: 100
   - 8 vars: 2,000
   - 10 vars: 50,000
   - 15 vars: 10,000,000
   - 20 vars: 10,000,000,000

2. ESPRESSO Heuristic Time (green line, polynomial growth)
   - 2 vars: 1
   - 4 vars: 5
   - 6 vars: 20
   - 8 vars: 80
   - 10 vars: 300
   - 15 vars: 2,000
   - 20 vars: 10,000

3. Max Prime Implicants (blue dashed line)
   - Following 3^n / n formula

Annotations:
- Vertical line at n=6: "K-map practical limit"
- Vertical line at n=15: "QM practical limit"
- Shaded region for "Exact methods practical"
- Shaded region for "Heuristics recommended"

Title: "Computational Complexity: Exact vs. Heuristic Minimization"
Legend: Position bottom

Interactive features (if implemented as MicroSim):
- Hover to see exact values
- Toggle series visibility
- Slider to adjust scale

Implementation: Chart.js or p5.js
Canvas Size: 800x450 pixels, responsive
</details>

## 6.12 Multi-Output Minimization

Many digital systems have multiple output functions sharing the same input variables. Multi-output minimization seeks to share product terms across multiple functions to minimize the total gate count.

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Example: Two functions sharing inputs A, B, C</p>

<div style="display: flex; gap: 18px; flex-wrap: wrap; margin-bottom: 14px;">
<div style="flex: 1; min-width: 180px; background: #fff; border-radius: 8px; padding: 12px 16px;">
<p style="color: #5A3EED; font-weight: 700; margin: 0 0 4px 0;"><span class="arithmatex">\(F_1 = \sum m(1, 3, 5, 7)\)</span></p>
<p style="color: #333; margin: 0; font-size: 0.95rem;">Minimized: <span class="arithmatex">\(F_1 = C\)</span></p>
</div>
<div style="flex: 1; min-width: 180px; background: #fff; border-radius: 8px; padding: 12px 16px;">
<p style="color: #5A3EED; font-weight: 700; margin: 0 0 4px 0;"><span class="arithmatex">\(F_2 = \sum m(3, 4, 5, 6, 7)\)</span></p>
<p style="color: #333; margin: 0; font-size: 0.95rem;">Minimized: <span class="arithmatex">\(F_2 = B + AC\)</span></p>
</div>
</div>

<p style="color: #333; margin-bottom: 0;">Total: 3 product terms separately. Multi-output optimization seeks to <strong>share product terms</strong> across functions to reduce total gate count.</p>

</div>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #8D6E00; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">QM Extension for Multi-Output</p>

<ol style="margin: 0; line-height: 2.2; color: #333; padding-left: 1.5rem;">
<li>Compute prime implicants for each function <strong>individually</strong></li>
<li>Compute <strong>"shared" prime implicants</strong> that cover minterms in multiple functions</li>
<li>Build a modified PI chart that accounts for sharing</li>
<li>Select a minimum cover that minimizes <strong>total gates</strong></li>
</ol>

<p style="color: #666; font-style: italic; margin-top: 10px; margin-bottom: 0;">Modern tools like ESPRESSO-MV (multi-valued) handle multi-output minimization efficiently.</p>

</div>

## 6.13 QM Method Summary and Complete Example

Let us work through a complete example systematically.

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.1rem; margin-top: 0; margin-bottom: 14px;">Problem: Minimize <span class="arithmatex">\(F(A, B, C, D) = \sum m(0, 2, 5, 6, 7, 8, 10, 12, 13, 14, 15)\)</span></p>

<p style="color: #5A3EED; font-weight: 700; margin-bottom: 8px;">Step 1: Group minterms by number of 1s</p>

<table style="font-size: 0.88rem; margin: 0.8rem auto 1.2rem auto; border-collapse: collapse;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 5px 12px;">Group</th><th style="padding: 5px 12px;">Minterm</th><th style="padding: 5px 12px;">Binary</th></tr></thead>
<tbody>
<tr style="background: #e3f2fd;"><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; font-weight: 600;">0</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd;">0</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; font-family: monospace;">0000</td></tr>
<tr><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; font-weight: 600;" rowspan="2">1</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd;">2</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; font-family: monospace;">0010</td></tr>
<tr><td style="padding: 5px 12px; border-bottom: 1px solid #ddd;">8</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; font-family: monospace;">1000</td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; font-weight: 600;" rowspan="4">2</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd;">5</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; font-family: monospace;">0101</td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 5px 12px; border-bottom: 1px solid #ddd;">6</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; font-family: monospace;">0110</td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 5px 12px; border-bottom: 1px solid #ddd;">10</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; font-family: monospace;">1010</td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 5px 12px; border-bottom: 1px solid #ddd;">12</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; font-family: monospace;">1100</td></tr>
<tr><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; font-weight: 600;" rowspan="3">3</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd;">7</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; font-family: monospace;">0111</td></tr>
<tr><td style="padding: 5px 12px; border-bottom: 1px solid #ddd;">13</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; font-family: monospace;">1101</td></tr>
<tr><td style="padding: 5px 12px; border-bottom: 1px solid #ddd;">14</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; font-family: monospace;">1110</td></tr>
<tr style="background: #fff3e0;"><td style="padding: 5px 12px; font-weight: 600;">4</td><td style="padding: 5px 12px;">15</td><td style="padding: 5px 12px; font-family: monospace;">1111</td></tr>
</tbody>
</table>

<p style="color: #5A3EED; font-weight: 700; margin-bottom: 8px;">Step 2: First combination</p>

<table style="font-size: 0.88rem; margin: 0.8rem auto 1.2rem auto; border-collapse: collapse;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 5px 12px;">Minterms</th><th style="padding: 5px 12px;">Pattern</th><th style="padding: 5px 12px;">&check;</th></tr></thead>
<tbody>
<tr><td style="padding: 5px 12px; border-bottom: 1px solid #ddd;">0, 2</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; font-family: monospace;">00-0</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center; color: #2E7D32;">&check;</td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 5px 12px; border-bottom: 1px solid #ddd;">0, 8</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; font-family: monospace;">-000</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center; color: #2E7D32;">&check;</td></tr>
<tr><td style="padding: 5px 12px; border-bottom: 1px solid #ddd;">2, 6</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; font-family: monospace;">0-10</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center; color: #2E7D32;">&check;</td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 5px 12px; border-bottom: 1px solid #ddd;">2, 10</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; font-family: monospace;">-010</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center; color: #2E7D32;">&check;</td></tr>
<tr><td style="padding: 5px 12px; border-bottom: 1px solid #ddd;">8, 10</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; font-family: monospace;">10-0</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center; color: #2E7D32;">&check;</td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 5px 12px; border-bottom: 1px solid #ddd;">8, 12</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; font-family: monospace;">1-00</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center; color: #2E7D32;">&check;</td></tr>
<tr><td style="padding: 5px 12px; border-bottom: 1px solid #ddd;">5, 7</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; font-family: monospace;">01-1</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center; color: #2E7D32;">&check;</td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 5px 12px; border-bottom: 1px solid #ddd;">5, 13</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; font-family: monospace;">-101</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center; color: #2E7D32;">&check;</td></tr>
<tr><td style="padding: 5px 12px; border-bottom: 1px solid #ddd;">6, 7</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; font-family: monospace;">011-</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center; color: #2E7D32;">&check;</td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 5px 12px; border-bottom: 1px solid #ddd;">6, 14</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; font-family: monospace;">-110</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center; color: #2E7D32;">&check;</td></tr>
<tr><td style="padding: 5px 12px; border-bottom: 1px solid #ddd;">10, 14</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; font-family: monospace;">1-10</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center; color: #2E7D32;">&check;</td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 5px 12px; border-bottom: 1px solid #ddd;">12, 13</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; font-family: monospace;">110-</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center; color: #2E7D32;">&check;</td></tr>
<tr><td style="padding: 5px 12px; border-bottom: 1px solid #ddd;">12, 14</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; font-family: monospace;">11-0</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center; color: #2E7D32;">&check;</td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 5px 12px; border-bottom: 1px solid #ddd;">7, 15</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; font-family: monospace;">-111</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center; color: #2E7D32;">&check;</td></tr>
<tr><td style="padding: 5px 12px; border-bottom: 1px solid #ddd;">13, 15</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; font-family: monospace;">11-1</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; text-align: center; color: #2E7D32;">&check;</td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 5px 12px;">14, 15</td><td style="padding: 5px 12px; font-family: monospace;">111-</td><td style="padding: 5px 12px; text-align: center; color: #2E7D32;">&check;</td></tr>
</tbody>
</table>

<p style="color: #5A3EED; font-weight: 700; margin-bottom: 8px;">Step 3: Second combination</p>

<table style="font-size: 0.88rem; margin: 0.8rem auto 1.2rem auto; border-collapse: collapse;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 5px 12px;">Minterms</th><th style="padding: 5px 12px;">Pattern</th></tr></thead>
<tbody>
<tr><td style="padding: 5px 12px; border-bottom: 1px solid #ddd;">0, 2, 8, 10</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; font-family: monospace; color: #C62828; font-weight: 600;">-0-0</td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 5px 12px; border-bottom: 1px solid #ddd;">2, 6, 10, 14</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; font-family: monospace; color: #C62828; font-weight: 600;">--10</td></tr>
<tr><td style="padding: 5px 12px; border-bottom: 1px solid #ddd;">8, 10, 12, 14</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; font-family: monospace; color: #C62828; font-weight: 600;">1--0</td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 5px 12px; border-bottom: 1px solid #ddd;">5, 7, 13, 15</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; font-family: monospace; color: #C62828; font-weight: 600;">-1-1</td></tr>
<tr><td style="padding: 5px 12px; border-bottom: 1px solid #ddd;">6, 7, 14, 15</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; font-family: monospace; color: #C62828; font-weight: 600;">-11-</td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 5px 12px;">12, 13, 14, 15</td><td style="padding: 5px 12px; font-family: monospace; color: #C62828; font-weight: 600;">11--</td></tr>
</tbody>
</table>

<p style="color: #5A3EED; font-weight: 700; margin-bottom: 8px;">Step 4: Prime Implicants (no further combinations possible)</p>

<table style="font-size: 0.88rem; margin: 0.8rem auto 1.2rem auto; border-collapse: collapse;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 5px 12px;">PI</th><th style="padding: 5px 12px;">Pattern</th><th style="padding: 5px 12px;">Minterms</th><th style="padding: 5px 12px;">Expression</th></tr></thead>
<tbody>
<tr><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; font-weight: 600;">PI<sub>1</sub></td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; font-family: monospace;">-0-0</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd;">0, 2, 8, 10</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd;"><span class="arithmatex">\(\bar{B}\bar{D}\)</span></td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; font-weight: 600;">PI<sub>2</sub></td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; font-family: monospace;">--10</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd;">2, 6, 10, 14</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd;"><span class="arithmatex">\(C\bar{D}\)</span></td></tr>
<tr><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; font-weight: 600;">PI<sub>3</sub></td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; font-family: monospace;">1--0</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd;">8, 10, 12, 14</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd;"><span class="arithmatex">\(A\bar{D}\)</span></td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; font-weight: 600;">PI<sub>4</sub></td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; font-family: monospace;">-1-1</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd;">5, 7, 13, 15</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd;"><span class="arithmatex">\(BD\)</span></td></tr>
<tr><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; font-weight: 600;">PI<sub>5</sub></td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd; font-family: monospace;">-11-</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd;">6, 7, 14, 15</td><td style="padding: 5px 12px; border-bottom: 1px solid #ddd;"><span class="arithmatex">\(BC\)</span></td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 5px 12px; font-weight: 600;">PI<sub>6</sub></td><td style="padding: 5px 12px; font-family: monospace;">11--</td><td style="padding: 5px 12px;">12, 13, 14, 15</td><td style="padding: 5px 12px;"><span class="arithmatex">\(AB\)</span></td></tr>
</tbody>
</table>

<p style="color: #5A3EED; font-weight: 700; margin-bottom: 8px;">Step 5: Prime Implicant Chart</p>

<table style="font-size: 0.82rem; margin: 0.8rem auto 1.2rem auto; border-collapse: collapse;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 4px 8px;">PI</th><th style="padding: 4px 8px; background: #FFD600; color: #333;">0</th><th style="padding: 4px 8px;">2</th><th style="padding: 4px 8px; background: #FFD600; color: #333;">5</th><th style="padding: 4px 8px;">6</th><th style="padding: 4px 8px;">7</th><th style="padding: 4px 8px;">8</th><th style="padding: 4px 8px;">10</th><th style="padding: 4px 8px;">12</th><th style="padding: 4px 8px;">13</th><th style="padding: 4px 8px;">14</th><th style="padding: 4px 8px;">15</th></tr></thead>
<tbody>
<tr style="background: #d4edda;"><td style="padding: 4px 8px; border-bottom: 1px solid #ddd; font-weight: 700; color: #2E7D32;">PI<sub>1</sub></td><td style="padding: 4px 8px; border-bottom: 1px solid #ddd; text-align: center; font-weight: 700; color: #2E7D32;">&times;</td><td style="padding: 4px 8px; border-bottom: 1px solid #ddd; text-align: center;">&times;</td><td style="padding: 4px 8px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 4px 8px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 4px 8px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 4px 8px; border-bottom: 1px solid #ddd; text-align: center;">&times;</td><td style="padding: 4px 8px; border-bottom: 1px solid #ddd; text-align: center;">&times;</td><td style="padding: 4px 8px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 4px 8px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 4px 8px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 4px 8px; border-bottom: 1px solid #ddd; text-align: center;"></td></tr>
<tr><td style="padding: 4px 8px; border-bottom: 1px solid #ddd; font-weight: 600;">PI<sub>2</sub></td><td style="padding: 4px 8px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 4px 8px; border-bottom: 1px solid #ddd; text-align: center;">&times;</td><td style="padding: 4px 8px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 4px 8px; border-bottom: 1px solid #ddd; text-align: center;">&times;</td><td style="padding: 4px 8px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 4px 8px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 4px 8px; border-bottom: 1px solid #ddd; text-align: center;">&times;</td><td style="padding: 4px 8px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 4px 8px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 4px 8px; border-bottom: 1px solid #ddd; text-align: center;">&times;</td><td style="padding: 4px 8px; border-bottom: 1px solid #ddd; text-align: center;"></td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 4px 8px; border-bottom: 1px solid #ddd; font-weight: 600;">PI<sub>3</sub></td><td style="padding: 4px 8px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 4px 8px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 4px 8px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 4px 8px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 4px 8px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 4px 8px; border-bottom: 1px solid #ddd; text-align: center;">&times;</td><td style="padding: 4px 8px; border-bottom: 1px solid #ddd; text-align: center;">&times;</td><td style="padding: 4px 8px; border-bottom: 1px solid #ddd; text-align: center;">&times;</td><td style="padding: 4px 8px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 4px 8px; border-bottom: 1px solid #ddd; text-align: center;">&times;</td><td style="padding: 4px 8px; border-bottom: 1px solid #ddd; text-align: center;"></td></tr>
<tr style="background: #d4edda;"><td style="padding: 4px 8px; border-bottom: 1px solid #ddd; font-weight: 700; color: #2E7D32;">PI<sub>4</sub></td><td style="padding: 4px 8px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 4px 8px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 4px 8px; border-bottom: 1px solid #ddd; text-align: center; font-weight: 700; color: #2E7D32;">&times;</td><td style="padding: 4px 8px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 4px 8px; border-bottom: 1px solid #ddd; text-align: center;">&times;</td><td style="padding: 4px 8px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 4px 8px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 4px 8px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 4px 8px; border-bottom: 1px solid #ddd; text-align: center;">&times;</td><td style="padding: 4px 8px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 4px 8px; border-bottom: 1px solid #ddd; text-align: center;">&times;</td></tr>
<tr><td style="padding: 4px 8px; border-bottom: 1px solid #ddd; font-weight: 600;">PI<sub>5</sub></td><td style="padding: 4px 8px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 4px 8px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 4px 8px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 4px 8px; border-bottom: 1px solid #ddd; text-align: center;">&times;</td><td style="padding: 4px 8px; border-bottom: 1px solid #ddd; text-align: center;">&times;</td><td style="padding: 4px 8px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 4px 8px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 4px 8px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 4px 8px; border-bottom: 1px solid #ddd; text-align: center;"></td><td style="padding: 4px 8px; border-bottom: 1px solid #ddd; text-align: center;">&times;</td><td style="padding: 4px 8px; border-bottom: 1px solid #ddd; text-align: center;">&times;</td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 4px 8px; font-weight: 600;">PI<sub>6</sub></td><td style="padding: 4px 8px; text-align: center;"></td><td style="padding: 4px 8px; text-align: center;"></td><td style="padding: 4px 8px; text-align: center;"></td><td style="padding: 4px 8px; text-align: center;"></td><td style="padding: 4px 8px; text-align: center;"></td><td style="padding: 4px 8px; text-align: center;"></td><td style="padding: 4px 8px; text-align: center;"></td><td style="padding: 4px 8px; text-align: center;">&times;</td><td style="padding: 4px 8px; text-align: center;">&times;</td><td style="padding: 4px 8px; text-align: center;">&times;</td><td style="padding: 4px 8px; text-align: center;">&times;</td></tr>
</tbody>
</table>

<p style="color: #5A3EED; font-weight: 700; margin-bottom: 8px;">Step 6: Essential Prime Implicants</p>

<ul style="margin: 0.3rem 0 0.8rem 0; color: #333; line-height: 2;">
<li><strong style="color: #2E7D32;">Column 0:</strong> Only PI<sub>1</sub> &rarr; <strong>PI<sub>1</sub> is essential</strong></li>
<li><strong style="color: #2E7D32;">Column 5:</strong> Only PI<sub>4</sub> &rarr; <strong>PI<sub>4</sub> is essential</strong></li>
</ul>

<p style="color: #333; margin-bottom: 10px;">Select PI<sub>1</sub> and PI<sub>4</sub>. Covered: {0, 2, 5, 7, 8, 10, 13, 15}. <strong>Remaining: {6, 12, 14}</strong></p>

<p style="color: #5A3EED; font-weight: 700; margin-bottom: 8px;">Step 7: Reduced chart and minimum solutions</p>

<p style="color: #333; margin-bottom: 6px;">We need one from {PI<sub>2</sub>, PI<sub>5</sub>} for minterm 6 and one from {PI<sub>3</sub>, PI<sub>6</sub>} for minterm 12:</p>

<table style="font-size: 0.9rem; margin: 0.8rem auto; border-collapse: collapse; width: 90%;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 6px 14px;">Solution</th><th style="padding: 6px 14px;">Expression</th><th style="padding: 6px 14px;">Terms</th><th style="padding: 6px 14px;">Literals</th></tr></thead>
<tbody>
<tr style="background: #d4edda;"><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; font-weight: 600;">PI<sub>1</sub>+PI<sub>4</sub>+PI<sub>2</sub>+PI<sub>3</sub></td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd;"><span class="arithmatex">\(\bar{B}\bar{D} + BD + C\bar{D} + A\bar{D}\)</span></td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; text-align: center;">4</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; text-align: center;">8</td></tr>
<tr><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; font-weight: 600;">PI<sub>1</sub>+PI<sub>4</sub>+PI<sub>2</sub>+PI<sub>6</sub></td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd;"><span class="arithmatex">\(\bar{B}\bar{D} + BD + C\bar{D} + AB\)</span></td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; text-align: center;">4</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; text-align: center;">8</td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; font-weight: 600;">PI<sub>1</sub>+PI<sub>4</sub>+PI<sub>5</sub>+PI<sub>3</sub></td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd;"><span class="arithmatex">\(\bar{B}\bar{D} + BD + BC + A\bar{D}\)</span></td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; text-align: center;">4</td><td style="padding: 6px 14px; border-bottom: 1px solid #ddd; text-align: center;">8</td></tr>
<tr><td style="padding: 6px 14px; font-weight: 600;">PI<sub>1</sub>+PI<sub>4</sub>+PI<sub>5</sub>+PI<sub>6</sub></td><td style="padding: 6px 14px;"><span class="arithmatex">\(\bar{B}\bar{D} + BD + BC + AB\)</span></td><td style="padding: 6px 14px; text-align: center;">4</td><td style="padding: 6px 14px; text-align: center;">8</td></tr>
</tbody>
</table>

<p style="color: #2E7D32; font-weight: 700; font-size: 1.05rem; margin-bottom: 0;">Final Answer: <span class="arithmatex">\(F = \bar{B}\bar{D} + BD + C\bar{D} + A\bar{D}\)</span> (or any equivalent minimum solution)</p>

</div>

#### Diagram: Complete QM Method Walkthrough

<iframe src="../sims/qm-complete-walkthrough/main.html" width="100%" height="652px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>

<details markdown="1">
<summary>Complete QM Method Walkthrough Specification</summary>
Type: microsim

Bloom Level: Create (L6)
Bloom Verb: Construct, develop

Learning Objective: Students will be able to construct a complete QM minimization solution from start to finish, including grouping, combination, prime implicant identification, chart construction, and minimum cover selection.

Visual Elements:
- Four-panel layout:
  1. Top-left: Minterm input and grouping table
  2. Top-right: Combination table with iterative columns
  3. Bottom-left: Prime implicant chart
  4. Bottom-right: Solution summary with Boolean expression

Interactive Controls:
- Input field: Enter minterm list
- Input field: Enter don't care list (optional)
- Dropdown: Number of variables (3, 4, 5, 6)
- Mode selector: "Step-by-step" or "Automatic"
- Step-by-step controls:
  - "Next Step" button
  - "Previous Step" button
  - Current step indicator
- "Generate Full Solution" button
- "Export Solution" button (copy to clipboard)
- "New Problem" button

Step-by-Step Sequence:
1. Enter minterms → Display grouped table
2. First combination → Show all possible pairs, highlight valid combinations
3. Second combination → Continue combining
4. Mark prime implicants → Highlight unchecked terms
5. Build PI chart → Display coverage matrix
6. Find essential PIs → Highlight single-cover columns
7. Apply dominance (if applicable)
8. Select remaining PIs → Show minimum cover options
9. Display final expression

Data Visibility Requirements:
- Each step shows intermediate results clearly
- Transitions highlight what changed
- Final summary shows all prime implicants used and Boolean expression
- Cost metrics: number of terms, number of literals

Instructional Rationale: The Create level requires students to synthesize all QM steps into a complete solution. This comprehensive simulator serves as both a learning tool and a verification system for hand-computed solutions.

Canvas Size: 1000x700 pixels, responsive with collapsible panels
Implementation: p5.js
</details>

## 6.14 Computer Implementation

The QM method's systematic nature makes it well-suited for computer implementation. A basic implementation involves:

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Data Structures</p>

<table style="font-size: 0.92rem; margin: 0.8rem auto; border-collapse: collapse; width: 95%;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 8px 16px;">Structure</th><th style="padding: 8px 16px;">Representation</th></tr></thead>
<tbody>
<tr><td style="padding: 8px 16px; border-bottom: 1px solid #ddd; font-weight: 600;">Minterms</td><td style="padding: 8px 16px; border-bottom: 1px solid #ddd;">Integers or bit vectors</td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 8px 16px; border-bottom: 1px solid #ddd; font-weight: 600;">Implicants</td><td style="padding: 8px 16px; border-bottom: 1px solid #ddd;">Pattern (binary + dash positions) and coverage set</td></tr>
<tr><td style="padding: 8px 16px; font-weight: 600;">Chart</td><td style="padding: 8px 16px;">Sparse matrix or adjacency list</td></tr>
</tbody>
</table>

</div>

<div style="background: #1E1E2E; border: 2px solid #6A5BFF; border-radius: 12px; padding: 0; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.12); overflow: hidden;">

<div style="background: #6A5BFF; padding: 10px 20px;">
<p style="color: #fff; font-weight: 700; font-size: 1.05rem; margin: 0; font-family: monospace;">Algorithm Pseudocode: QuineMcCluskey</p>
</div>

<div style="margin: 0; padding: 20px 24px; color: #CDD6F4 !important; font-size: 0.88rem; line-height: 1.7; overflow-x: auto; white-space: pre; font-family: 'Consolas', 'Monaco', monospace;"><span style="color: #CBA6F7 !important; font-weight: 600;">function</span> <span style="color: #89B4FA !important;">QuineMcCluskey</span>(minterms, dontcares, num_vars):
    <span style="color: #6C7086 !important; font-style: italic;"># Step 1: Initialize with minterms and don't cares</span>
    terms = minterms ∪ dontcares
    all_prime_implicants = []

    <span style="color: #6C7086 !important; font-style: italic;"># Step 2: Group by number of 1s</span>
    groups = <span style="color: #89B4FA !important;">group_by_ones_count</span>(terms, num_vars)

    <span style="color: #6C7086 !important; font-style: italic;"># Step 3: Iterative combination</span>
    <span style="color: #CBA6F7 !important; font-weight: 600;">while</span> groups <span style="color: #CBA6F7 !important;">is not</span> empty:
        new_groups = {}
        combined = <span style="color: #89B4FA !important;">set</span>()

        <span style="color: #CBA6F7 !important; font-weight: 600;">for each</span> adjacent pair (group_i, group_j):
            <span style="color: #CBA6F7 !important; font-weight: 600;">for</span> term_a <span style="color: #CBA6F7 !important;">in</span> group_i:
                <span style="color: #CBA6F7 !important; font-weight: 600;">for</span> term_b <span style="color: #CBA6F7 !important;">in</span> group_j:
                    <span style="color: #CBA6F7 !important; font-weight: 600;">if</span> <span style="color: #89B4FA !important;">can_combine</span>(term_a, term_b):
                        new_term = <span style="color: #89B4FA !important;">combine</span>(term_a, term_b)
                        add new_term to new_groups
                        mark term_a, term_b as combined

        <span style="color: #6C7086 !important; font-style: italic;"># Uncombined terms are prime implicants</span>
        <span style="color: #CBA6F7 !important; font-weight: 600;">for</span> term <span style="color: #CBA6F7 !important;">in</span> all terms <span style="color: #CBA6F7 !important;">not in</span> combined:
            add term to all_prime_implicants

        groups = new_groups

    <span style="color: #6C7086 !important; font-style: italic;"># Step 4: Build prime implicant chart (exclude don't cares)</span>
    chart = <span style="color: #89B4FA !important;">build_chart</span>(all_prime_implicants, minterms)

    <span style="color: #6C7086 !important; font-style: italic;"># Step 5: Find minimum cover</span>
    solution = <span style="color: #89B4FA !important;">find_minimum_cover</span>(chart)

    <span style="color: #CBA6F7 !important; font-weight: 600;">return</span> solution</div>

</div>

<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #2E7D32; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Key Functions</p>

<ul style="margin: 0; line-height: 2.2; color: #333; padding-left: 1.5rem;">
<li><code>can_combine(a, b)</code>: Check if two terms differ in exactly one bit (dashes must align)</li>
<li><code>combine(a, b)</code>: Create new term with dash in differing position</li>
<li><code>find_minimum_cover(chart)</code>: Apply EPI selection, dominance, and Petrick's method</li>
</ul>

<p style="color: #666; font-style: italic; margin-top: 12px; margin-bottom: 0;">Modern optimizations: signature-based hashing, incremental dominance, branch-and-bound for minimum cover.</p>

</div>

## 6.15 Summary and Key Takeaways

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.1rem; margin-top: 0; margin-bottom: 16px;">The Quine-McCluskey method provides a rigorous, algorithmic approach to Boolean function minimization:</p>

<ul style="margin: 0 0 16px 0; line-height: 2.2; color: #333; padding-left: 1.5rem;">
<li><strong>Binary grouping:</strong> Organize minterms by 1-count to reduce comparisons</li>
<li><strong>Systematic combination:</strong> Combine adjacent groups, mark combined terms</li>
<li><strong>Dash notation:</strong> Represents eliminated variables in combined terms</li>
<li><strong>Prime implicants:</strong> Unchecked terms that cannot be further combined</li>
<li><strong>PI chart:</strong> Maps prime implicants to minterms they cover</li>
<li><strong>Essential PIs:</strong> Must be included (unique coverage)</li>
<li><strong>Row/column dominance:</strong> Simplifies the selection problem</li>
<li><strong>Petrick's method:</strong> Algebraically finds all minimum covers</li>
<li><strong>Cyclic charts:</strong> No EPIs exist; require Petrick's method</li>
</ul>

</div>

<div style="display: flex; gap: 18px; flex-wrap: wrap; margin: 1.2rem 0;">
<div style="flex: 1; min-width: 250px; background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 20px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0; margin-bottom: 8px;">Advantages</p>
<ul style="margin: 0; padding-left: 1.2rem; color: #333; line-height: 1.9; font-size: 0.95rem;">
<li>Works for any number of variables</li>
<li>Guarantees finding all prime implicants</li>
<li>Produces verifiable, step-by-step solutions</li>
<li>Foundation for CAD tools</li>
</ul>
</div>
<div style="flex: 1; min-width: 250px; background: #FFEBEE; border: 2px solid #E57373; border-radius: 10px; padding: 18px 20px;">
<p style="color: #C62828; font-weight: 700; margin-top: 0; margin-bottom: 8px;">Limitations</p>
<ul style="margin: 0; padding-left: 1.2rem; color: #333; line-height: 1.9; font-size: 0.95rem;">
<li>Exponential worst-case complexity</li>
<li>Impractical for &gt;15&ndash;20 variables</li>
<li>Manual application is tedious for larger functions</li>
</ul>
</div>
</div>

### When to Use

<table style="font-size: 0.92rem; margin: 1.2rem auto; border-collapse: collapse; width: 95%;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 8px 14px;">Method</th><th style="padding: 8px 14px;">Best For</th></tr></thead>
<tbody>
<tr><td style="padding: 8px 14px; border-bottom: 1px solid #ddd; font-weight: 600;">Boolean algebra</td><td style="padding: 8px 14px; border-bottom: 1px solid #ddd;">Simple expressions, quick simplifications</td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 8px 14px; border-bottom: 1px solid #ddd; font-weight: 600;">K-maps</td><td style="padding: 8px 14px; border-bottom: 1px solid #ddd;">2&ndash;5 variable functions, visual learners</td></tr>
<tr><td style="padding: 8px 14px; border-bottom: 1px solid #ddd; font-weight: 600; color: #5A3EED;">QM method</td><td style="padding: 8px 14px; border-bottom: 1px solid #ddd;">5&ndash;15 variable functions, exact solutions needed</td></tr>
<tr style="background: #f4f4ff;"><td style="padding: 8px 14px; font-weight: 600;">Heuristics (ESPRESSO)</td><td style="padding: 8px 14px;">Large functions, near-optimal solutions acceptable</td></tr>
</tbody>
</table>

---

## Self-Check Questions

??? question "What determines which minterms can be combined in the QM method?"
    Two minterms (or implicants) can be combined if and only if:

    1. They differ in exactly one bit position
    2. Any dash positions must be in the same location

    The grouping by number of 1s ensures we only compare minterms that could potentially differ by one bit, since such minterms must have 1-counts differing by exactly one.

??? question "How do you identify a prime implicant in the QM method?"
    A prime implicant is any term that:

    - Remains **unchecked** after all combination iterations
    - Cannot be combined with any other term to form a larger grouping

    Terms that get combined with others receive a check mark (✓) and are not prime implicants.

??? question "What makes a prime implicant 'essential'?"
    A prime implicant is **essential** if it is the **only** prime implicant that covers some minterm. In the PI chart, this appears as a column with exactly one × mark.

    Essential prime implicants must be included in any minimum solution.

??? question "When is Petrick's method needed?"
    Petrick's method is needed when:

    - All essential prime implicants have been selected
    - Row and column dominance cannot further reduce the chart
    - Multiple prime implicants remain that could cover the remaining minterms

    This often occurs with **cyclic** prime implicant charts where no single PI has unique coverage.

??? question "How does the QM method handle don't care conditions?"
    Don't cares are handled in two stages:

    1. **Combination phase:** Include don't care minterms with regular minterms. They participate in combinations, potentially creating larger prime implicants.

    2. **Chart phase:** Don't care minterms are **excluded** from the PI chart columns. Only the required (ON-set) minterms appear as columns that must be covered.

    This allows don't cares to contribute to optimization without requiring coverage.

??? question "What is the primary advantage of QM over K-maps? What is its main disadvantage?"
    **Primary advantage:** The QM method works for functions with any number of variables and can be easily programmed for computer implementation. It provides a systematic, verifiable procedure that doesn't rely on visual pattern recognition.

    **Main disadvantage:** The QM method has exponential worst-case complexity. The number of prime implicants and the size of the covering problem can grow exponentially with the number of variables, making it impractical for very large functions.

---

## Interactive Walkthrough

Step through the Quine-McCluskey algorithm with grouping, combining, and PI chart:

<iframe src="../sims/qm-method-walkthrough/main.html" width="100%" height="600px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>

---

[See Annotated References](./references.md)

</div>
