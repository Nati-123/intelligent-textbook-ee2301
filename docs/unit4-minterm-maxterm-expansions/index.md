---
title: Unit 4 — Minterm and Maxterm Expansions
description: Canonical forms for Boolean functions including minterms, maxterms, standard notations, and systematic conversion techniques
generated_by: claude skill chapter-content-generator
date: 2026-02-04 17:45:00
version: 0.03
---

<div class="unit1-styled" markdown>

# Unit 4 — Minterm and Maxterm Expansions

<details class="video-overview">
<summary><strong>Unit Overview</strong> (click to expand)</summary>

Welcome to Unit 4, where we formalize something you have already been doing intuitively — writing Boolean functions in their most complete and unambiguous form. These canonical representations, built from minterms and maxterms, give you a precise language for describing any Boolean function.

A minterm is an AND term that includes every variable in the function, either in its true form or its complemented form. Each row of a truth table where the output is one corresponds to exactly one minterm. When you OR all of those minterms together, you get the canonical Sum of Products, written compactly using Sigma notation.

Maxterms work in the complementary direction. A maxterm is an OR term that includes every variable. Each row where the output is zero corresponds to one maxterm. When you AND all of those maxterms together, you get the canonical Product of Sums, written with Pi notation. Converting between the two canonical forms is simply a matter of swapping the indices.

We also revisit the Shannon expansion theorem, which shows that any Boolean function can be decomposed around a chosen variable into two smaller sub-functions. This decomposition underpins the structure of multiplexers, binary decision diagrams, and many synthesis algorithms used by modern design tools.

Finally, don't care conditions make a return appearance. In canonical form, don't care minterms are listed separately, preserving the freedom to assign them during later minimization.

**Key Takeaways**

1. Minterms and maxterms provide a canonical, unambiguous way to represent any Boolean function as a Sum of Products or Product of Sums.
2. Sigma and Pi notations offer a compact shorthand that maps directly to truth table rows, making conversion between forms quick and mechanical.
3. The Shannon expansion theorem decomposes functions around a variable, forming the basis for multiplexer design and modern synthesis algorithms.

</details>

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">Summary</h2>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 20px 24px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<p style="color: #333; line-height: 1.85; font-size: 1.02rem; margin: 0;">
This unit introduces the canonical forms for representing Boolean functions—the most complete and unambiguous way to express any logic function. Canonical forms use minterms (for Sum of Products) or maxterms (for Product of Sums) to create expressions where every variable appears exactly once in every term. Students will learn to derive canonical expressions directly from truth tables, convert between minterm and maxterm representations, and use compact notations (Σ and Π) for efficient specification. The unit also covers the Shannon expansion theorem, which provides a systematic method for decomposing functions, and explores how don't care conditions are represented in canonical form. These concepts establish the foundation for the systematic simplification techniques covered in Unit 5 (Karnaugh Maps).
</p>
</div>

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">Concepts Covered</h2>

<div style="background: #F8F6FF; border: 2px solid #D4C8FF; border-radius: 12px; padding: 20px 24px; margin: 1rem 0;" markdown>

1. Canonical Form
2. Standard Form
3. Minterm
4. Maxterm
5. Minterm Expansion
6. Maxterm Expansion
7. Minterm Designation
8. Maxterm Designation
9. Sum of Minterms
10. Product of Maxterms
11. Minterm to Maxterm
12. Maxterm to Minterm
13. Canonical SOP Form
14. Canonical POS Form
15. Minterm List Notation
16. Maxterm List Notation
17. Sigma Notation
18. Pi Notation
19. Complement of Function
20. Function from Truth Table
21. Minterm from Truth Table
22. Maxterm from Truth Table
23. Dont Care Condition
24. Incompletely Specified
25. Dont Care in SOP
26. Dont Care in POS
27. Converting SOP to POS
28. Converting POS to SOP
29. Expansion Theorem
30. Shannon Expansion
31. Cofactor
32. On-Set of Function
33. Off-Set of Function
34. DC-Set of Function
35. Literal Count

</div>

---

## Prerequisites

Before beginning this unit, students should have:

- Solid understanding of Boolean algebra operations (Unit 2)
- Ability to construct truth tables for any Boolean expression
- Familiarity with SOP and POS forms (Unit 2)
- Understanding of don't care conditions (Unit 3)

---

<h2 id="41-canonical-vs-standard-forms" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">4.1 Canonical vs Standard Forms</h2>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.5rem;">
Boolean expressions can be written in multiple equivalent ways. Two important classifications are <strong style="color: #333;">canonical forms</strong> and <strong style="color: #333;">standard forms</strong>.
</p>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Standard Form</h3>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1rem;">
A <strong style="color: #333;">standard form</strong> expression is written as either:
</p>

<ul style="list-style: none; padding-left: 0.8rem; margin: 0.8rem 0 1.2rem 0;">
<li style="margin-bottom: 0.9rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <strong>Standard SOP:</strong> Sum of product terms (not all variables need appear in each term)</li>
<li style="margin-bottom: 0.9rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <strong>Standard POS:</strong> Product of sum terms (not all variables need appear in each term)</li>
</ul>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 10px; padding: 24px; margin: 1.5rem 0;" markdown>
<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Example — Standard SOP</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 10px 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

$F = AB + \overline{A}C + BC$

</div>

<p style="color: #555; line-height: 1.75; margin-bottom: 0;">
The first term has only A and B, the second has A and C, and the third has B and C — <strong style="color: #333;">not all three variables appear in every term</strong>.
</p>
</div>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Canonical Form</h3>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1rem;">
A <strong style="color: #333;">canonical form</strong> is a standardized, unique representation where <strong style="color: #333;">every variable appears exactly once</strong> (either complemented or uncomplemented) in <strong style="color: #333;">every term</strong>.
</p>

<ul style="list-style: none; padding-left: 0.8rem; margin: 0.8rem 0 1.2rem 0;">
<li style="margin-bottom: 0.9rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <strong>Canonical SOP:</strong> Every product term contains all n variables → called <strong style="color: #5A3EED;">minterms</strong></li>
<li style="margin-bottom: 0.9rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <strong>Canonical POS:</strong> Every sum term contains all n variables → called <strong style="color: #5A3EED;">maxterms</strong></li>
</ul>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.5rem;">
The canonical form of a function is <strong style="color: #333;">unique</strong> — there is exactly one canonical SOP and one canonical POS for any given function.
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>
<p style="color: #5A3EED; font-weight: 700; font-size: 1.05rem; margin-top: 0; margin-bottom: 14px;">Comparison Table</p>

| Property | Standard Form | Canonical Form |
|:---------|:--------------|:---------------|
| **Variables per term** | May vary | All n variables |
| **Unique representation** | No | Yes |
| **Term names** | Product / Sum terms | Minterms / Maxterms |
| **Directly from truth table** | No | Yes |
| **Typically more terms** | No | Yes |

</div>

<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 20px 24px; margin: 1.5rem 0;">
<p style="color: #2E7D32; font-weight: 700; font-size: 1.05rem; margin-top: 0; margin-bottom: 10px;">Why Canonical Forms Matter</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">
Canonical forms provide a <strong>direct bridge between truth tables and algebraic expressions</strong>. They also serve as the starting point for systematic simplification methods like Karnaugh maps.
</p>
</div>

---

<h2 id="42-minterms" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">4.2 Minterms</h2>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.5rem;">
A <strong style="color: #333;">minterm</strong> is a product term containing all n variables of the function, where each variable appears exactly once in either complemented or uncomplemented form. For n variables, there are exactly <span class="arithmatex">\(2^n\)</span> possible minterms.
</p>

### Minterm Construction

<p style="color: #555; line-height: 1.85; margin-bottom: 1rem;">
For each row of a truth table where the output is 1:
</p>

<ul style="list-style: none; padding-left: 0.8rem; margin: 0.8rem 0 1rem 0;">
<li style="margin-bottom: 0.9rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> Include the variable <strong>uncomplemented</strong> if its value is 1</li>
<li style="margin-bottom: 0.9rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> Include the variable <strong>complemented</strong> if its value is 0</li>
</ul>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 10px; padding: 24px; margin: 1.5rem 0;" markdown>
<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Example</p>

For 3 variables (A, B, C), construct the minterm for input 101:

<ul style="list-style: none; padding-left: 0.8rem; margin: 0.8rem 0 1rem 0;">
<li style="margin-bottom: 0.6rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> A = 1 &rarr; include A</li>
<li style="margin-bottom: 0.6rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> B = 0 &rarr; include <span class="arithmatex">\(\overline{B}\)</span></li>
<li style="margin-bottom: 0.6rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> C = 1 &rarr; include C</li>
<li style="margin-bottom: 0; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> Minterm: <span class="arithmatex">\(A\overline{B}C\)</span></li>
</ul>

</div>

### Minterm Designation

<p style="color: #555; line-height: 1.85; margin-bottom: 1rem;">
Each minterm has a unique <strong style="color: #333;">minterm designation</strong> (index number) equal to the decimal value of the input combination.
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 20px 24px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

| Row | A | B | C | Decimal | Minterm | Designation |
|-----|---|---|---|---------|---------|-------------|
| 0 | 0 | 0 | 0 | 0 | $\overline{A}\overline{B}\overline{C}$ | $m_0$ |
| 1 | 0 | 0 | 1 | 1 | $\overline{A}\overline{B}C$ | $m_1$ |
| 2 | 0 | 1 | 0 | 2 | $\overline{A}B\overline{C}$ | $m_2$ |
| 3 | 0 | 1 | 1 | 3 | $\overline{A}BC$ | $m_3$ |
| 4 | 1 | 0 | 0 | 4 | $A\overline{B}\overline{C}$ | $m_4$ |
| 5 | 1 | 0 | 1 | 5 | $A\overline{B}C$ | $m_5$ |
| 6 | 1 | 1 | 0 | 6 | $AB\overline{C}$ | $m_6$ |
| 7 | 1 | 1 | 1 | 7 | $ABC$ | $m_7$ |

</div>

### Key Property of Minterms

<p style="color: #555; line-height: 1.85; margin-bottom: 1.5rem;">
Each minterm equals 1 for exactly one input combination and 0 for all others. This is why minterms are used to build SOP expressions — ORing together the minterms where F=1 creates a function that is 1 precisely for those inputs.
</p>

#### Diagram: Minterm Visualizer

<iframe src="../sims/minterm-visualizer/main.html" width="100%" height="800px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>

<details markdown="1">
<summary>Minterm Visualizer</summary>
Type: microsim

Purpose: Interactive visualization of minterm construction showing the relationship between input values and minterm structure

Bloom Level: Understand (L2)
Bloom Verb: Explain, construct, identify

Learning Objective: Students will be able to construct any minterm from its index number and explain why each minterm equals 1 for exactly one input combination.

Canvas Layout:
- Top: Variable count selector (2, 3, or 4 variables)
- Middle: Visual minterm construction area
- Bottom: Complete minterm table with highlighting

Visual Elements:
- Binary input display with variable labels (A, B, C, ...)
- Step-by-step minterm construction:
  - For each variable, show: value → complemented or not
  - Build the product term progressively
- Highlight showing the single "1" in the minterm's truth table column
- Complete minterm reference table

Interactive Controls:
- Variable count selector (2, 3, 4)
- Click on any minterm index (0 to 2^n - 1) to see its construction
- Binary input toggles to build minterm interactively
- "Show All Minterms" table view
- Animation to cycle through all minterms

Data Visibility Requirements:
- Show the decimal index prominently
- Show the binary equivalent
- Show each variable's contribution (1→uncomplemented, 0→complemented)
- Display the final minterm expression
- Highlight the single "1" in a mini truth table

Default Parameters:
- Variables: 3 (A, B, C)
- Selected minterm: m5

Behavior:
- Real-time minterm update as index or bits change
- Highlight the relationship between binary value and complement usage
- Show that the minterm evaluates to 1 only for its index input

Instructional Rationale: Seeing the systematic construction process helps students internalize the minterm pattern without memorization.

Implementation: p5.js with responsive canvas
</details>

---

<h2 id="43-maxterms" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">4.3 Maxterms</h2>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.5rem;">
A <strong style="color: #333;">maxterm</strong> is a sum term containing all n variables of the function, where each variable appears exactly once in either complemented or uncomplemented form. Maxterms are the dual of minterms.
</p>

### Maxterm Construction

<p style="color: #555; line-height: 1.85; margin-bottom: 1rem;">
For each row of a truth table where the output is 0:
</p>

<ul style="list-style: none; padding-left: 0.8rem; margin: 0.8rem 0 1rem 0;">
<li style="margin-bottom: 0.9rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> Include the variable <strong>complemented</strong> if its value is 1</li>
<li style="margin-bottom: 0.9rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> Include the variable <strong>uncomplemented</strong> if its value is 0</li>
</ul>

<p style="color: #D32F2F; font-weight: 600; line-height: 1.85; margin-bottom: 1rem;">
This is the <strong>opposite</strong> of minterm construction!
</p>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 10px; padding: 24px; margin: 1.5rem 0;" markdown>
<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Example</p>

For 3 variables (A, B, C), construct the maxterm for input 101:

<ul style="list-style: none; padding-left: 0.8rem; margin: 0.8rem 0 1rem 0;">
<li style="margin-bottom: 0.6rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> A = 1 &rarr; include <span class="arithmatex">\(\overline{A}\)</span></li>
<li style="margin-bottom: 0.6rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> B = 0 &rarr; include B</li>
<li style="margin-bottom: 0.6rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> C = 1 &rarr; include <span class="arithmatex">\(\overline{C}\)</span></li>
<li style="margin-bottom: 0; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> Maxterm: <span class="arithmatex">\((\overline{A} + B + \overline{C})\)</span></li>
</ul>

</div>

### Maxterm Designation

<p style="color: #555; line-height: 1.85; margin-bottom: 1rem;">
Each maxterm has a unique <strong style="color: #333;">maxterm designation</strong> equal to the decimal value of the input combination. Maxterms are denoted with capital M.
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 20px 24px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

| Row | A | B | C | Decimal | Maxterm | Designation |
|-----|---|---|---|---------|---------|-------------|
| 0 | 0 | 0 | 0 | 0 | $(A + B + C)$ | $M_0$ |
| 1 | 0 | 0 | 1 | 1 | $(A + B + \overline{C})$ | $M_1$ |
| 2 | 0 | 1 | 0 | 2 | $(A + \overline{B} + C)$ | $M_2$ |
| 3 | 0 | 1 | 1 | 3 | $(A + \overline{B} + \overline{C})$ | $M_3$ |
| 4 | 1 | 0 | 0 | 4 | $(\overline{A} + B + C)$ | $M_4$ |
| 5 | 1 | 0 | 1 | 5 | $(\overline{A} + B + \overline{C})$ | $M_5$ |
| 6 | 1 | 1 | 0 | 6 | $(\overline{A} + \overline{B} + C)$ | $M_6$ |
| 7 | 1 | 1 | 1 | 7 | $(\overline{A} + \overline{B} + \overline{C})$ | $M_7$ |

</div>

### Key Property of Maxterms

<p style="color: #555; line-height: 1.85; margin-bottom: 1.5rem;">
Each maxterm equals 0 for exactly one input combination and 1 for all others. This is the dual property to minterms. ANDing together maxterms where F=0 creates a function that is 0 precisely for those inputs.
</p>

### Relationship Between Minterms and Maxterms

<p style="color: #555; line-height: 1.85; margin-bottom: 1rem;">
A minterm and maxterm with the same index are complements:
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 32px; margin: 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

$$m_i = \overline{M_i} \qquad M_i = \overline{m_i}$$

</div>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 10px; padding: 24px; margin: 1.5rem 0;" markdown>
<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Example</p>

$m_5 = A\overline{B}C$ and $M_5 = (\overline{A} + B + \overline{C})$

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 20px 24px; margin: 14px 0 4px 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

By DeMorgan's theorem:

$$\overline{m_5} = \overline{A\overline{B}C} = \overline{A} + B + \overline{C} = M_5 \quad \checkmark$$

</div>

</div>

---

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Why Canonical Forms Are Not Minimal</h3>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
Canonical forms are unique and easy to derive from truth tables, but they carry a high <strong style="color: #333;">literal count</strong> — the total number of variable appearances in the expression. Every term contains every variable, so an <em>n</em>-variable function with <em>k</em> minterms has <em>n × k</em> literals in its canonical SOP.
</p>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 10px; padding: 24px; margin: 1.5rem 0;" markdown>
<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Example: Cost of Canonical Form</p>

Consider the 3-variable function $F(A,B,C) = \Sigma m(3,5,6,7)$.

**Canonical SOP** (12 literals, 4 AND gates, 1 OR gate):

$$F = \overline{A}BC + A\overline{B}C + AB\overline{C} + ABC$$

**Simplified SOP** (5 literals, 3 AND gates, 1 OR gate):

$$F = BC + AC + AB$$

The simplified form uses fewer than half the literals and one fewer gate. The saving comes from combining minterms that differ in exactly one variable — precisely the operation that Karnaugh maps (Unit 5) and Quine-McCluskey (Unit 6) automate.
</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
The <strong style="color: #333;">gate count</strong> — the number of logic gates required — is closely related to literal count but not identical. Each AND term requires one AND gate with fan-in equal to the number of literals in that term. Reducing literal count almost always reduces gate count, but the relationship depends on whether the target technology uses 2-input gates or wider fan-in gates.
</p>

| Metric | Canonical SOP | Simplified SOP | Savings |
|--------|:------------:|:--------------:|:-------:|
| Literals | $n \times k$ | Minimized | 40–70% typical |
| AND gates | $k$ (each $n$-input) | Fewer, narrower | Fewer transistors |
| OR gate | 1 ($k$-input) | 1 (fewer inputs) | Reduced fan-in |
| Propagation delay | Higher (wider gates) | Lower | Faster circuit |

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
This cost difference motivates the entire subject of Boolean minimization covered in Units 5 and 6. Canonical forms are the <strong>starting point</strong> — they guarantee correctness and uniqueness — while minimized forms are the <strong>implementation goal</strong>.
</p>

---

<h2 id="44-canonical-sop-and-pos-forms" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">4.4 Canonical SOP and POS Forms</h2>

### Sum of Minterms (Canonical SOP)

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.5rem;">
The <strong style="color: #333;">canonical SOP form</strong> expresses a function as the OR (sum) of all minterms for which the function equals 1. This is also called the <strong style="color: #333;">minterm expansion</strong> or <strong style="color: #333;">sum of minterms</strong>.
</p>

<p style="color: #555; line-height: 1.85; margin-bottom: 1rem; font-weight: 600;">Procedure: Function from Truth Table (SOP)</p>

<ol style="margin: 0.8rem 0 1.5rem 1.5rem; line-height: 2.0; color: #333;">
<li style="margin-bottom: 0.5rem;">Identify all rows where F = 1</li>
<li style="margin-bottom: 0.5rem;">Write the minterm for each such row</li>
<li style="margin-bottom: 0.5rem;">OR all minterms together</li>
</ol>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 10px; padding: 24px; margin: 1.5rem 0;" markdown>
<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Example</p>

Given the truth table:

| A | B | C | F |
|---|---|---|---|
| 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | **1** |
| 0 | 1 | 0 | 0 |
| 0 | 1 | 1 | **1** |
| 1 | 0 | 0 | 0 |
| 1 | 0 | 1 | **1** |
| 1 | 1 | 0 | 0 |
| 1 | 1 | 1 | 0 |

F = 1 for rows 1, 3, 5 (decimal indices where output is 1)

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 14px 0 4px 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

$$F = m_1 + m_3 + m_5 = \overline{A}\overline{B}C + \overline{A}BC + A\overline{B}C$$

</div>

</div>

### Product of Maxterms (Canonical POS)

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.5rem;">
The <strong style="color: #333;">canonical POS form</strong> expresses a function as the AND (product) of all maxterms for which the function equals 0. This is also called the <strong style="color: #333;">maxterm expansion</strong> or <strong style="color: #333;">product of maxterms</strong>. Maxterms correspond to the F = 0 rows because each maxterm evaluates to 0 for exactly one input combination — ANDing them together forces F to 0 at precisely those rows while remaining 1 everywhere else.
</p>

<p style="color: #555; line-height: 1.85; margin-bottom: 1rem; font-weight: 600;">Procedure: Maxterm from Truth Table (POS)</p>

<ol style="margin: 0.8rem 0 1.5rem 1.5rem; line-height: 2.0; color: #333;">
<li style="margin-bottom: 0.5rem;">Identify all rows where F = 0</li>
<li style="margin-bottom: 0.5rem;">Write the maxterm for each such row</li>
<li style="margin-bottom: 0.5rem;">AND all maxterms together</li>
</ol>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 10px; padding: 24px; margin: 1.5rem 0;" markdown>
<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Example</p>

Using the same truth table above, F = 0 for rows 0, 2, 4, 6, 7.

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 14px 0 4px 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

$$\begin{aligned}
F &= M_0 \cdot M_2 \cdot M_4 \cdot M_6 \cdot M_7 \\[6pt]
  &= (A + B + C)\,(A + \overline{B} + C)\,(\overline{A} + B + C) \\[4pt]
  &\quad\; \cdot\,(\overline{A} + \overline{B} + C)\,(\overline{A} + \overline{B} + \overline{C})
\end{aligned}$$

</div>

</div>

<p style="color: #555; line-height: 1.85; margin-top: 1.2rem;">
Both canonical forms — the <strong style="color: #333;">sum of minterms</strong> (SOP) and the <strong style="color: #333;">product of maxterms</strong> (POS) — represent the same function F.
</p>

#### Diagram: Minterm/Maxterm Converter

<iframe src="../sims/minterm-maxterm-converter/main.html" width="100%" height="900px" style="border:none; border-radius:8px;"></iframe>

<details markdown="1">
<summary>Canonical Form Generator</summary>
Type: microsim

Purpose: Generate canonical SOP and POS forms from truth table inputs with step-by-step explanation

Bloom Level: Apply (L3)
Bloom Verb: Derive, construct, generate

Learning Objective: Students will be able to derive both canonical SOP (sum of minterms) and canonical POS (product of maxterms) expressions from any truth table.

Canvas Layout:
- Left: Interactive truth table with editable outputs
- Right: Generated canonical expressions (SOP and POS)
- Bottom: Step-by-step derivation panel

Visual Elements:
- Truth table with toggle outputs (0, 1, X)
- Rows highlighted by output value:
  - Green highlight for F=1 rows (contribute to SOP)
  - Red highlight for F=0 rows (contribute to POS)
  - Gray for don't cares
- Canonical SOP expression built term by term
- Canonical POS expression built term by term
- Minterm/Maxterm index list
- Expandable view showing full minterm/maxterm expressions

Interactive Controls:
- Variable count selector (2, 3, 4)
- Click truth table outputs to toggle 0/1/X
- "Random Function" button
- Toggle between showing indices only vs full expressions
- "Step Through SOP" / "Step Through POS" buttons
- Copy expression button

Data Visibility Requirements:
- For SOP: highlight each F=1 row as its minterm is added
- For POS: highlight each F=0 row as its maxterm is added
- Show running expression as terms are added
- Display both compact notation and expanded form

Default Parameters:
- Variables: 3
- Function: F = Σm(1,3,5)

Behavior:
- Real-time expression update as truth table changes
- Animation option for step-by-step derivation
- Verify equivalence of SOP and POS (same truth table)
- Count and display number of terms in each form

Instructional Rationale: Side-by-side construction of both canonical forms from the same truth table reinforces the duality between minterms and maxterms.

Implementation: p5.js with DOM elements for truth table
</details>

#### Diagram: Truth Table to Canonical Form Converter

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../sims/truth-table-canonical-form/main.html" width="100%" height="530px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

---

<h2 id="45-compact-notation-and" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">4.5 Compact Notation: Σ and Π</h2>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.5rem;">
Writing out full canonical expressions is tedious. Compact notations provide efficient representations.
</p>

### Sigma Notation (Σ) for SOP

<p style="color: #555; line-height: 1.85; margin-bottom: 1rem;">
The <strong style="color: #333;">minterm list notation</strong> uses the Greek letter sigma (Σ) followed by the list of minterm indices:
</p>

<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

$$F(A,B,C) = \Sigma m(1,3,5)$$

This reads: "F equals the **sum** of minterms 1, 3, and 5."

</div>

<p style="color: #555; line-height: 1.85; margin-top: 1rem;">
The variable list indicates the order of significance (A is MSB, C is LSB in this case).
</p>

### Pi Notation (Π) for POS

<p style="color: #555; line-height: 1.85; margin-bottom: 1rem;">
The <strong style="color: #333;">maxterm list notation</strong> uses the Greek letter pi (Π) followed by the list of maxterm indices:
</p>

<div style="background: #FFE7E7; border: 2px solid #E57373; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

$$F(A,B,C) = \Pi M(0,2,4,6,7)$$

This reads: "F equals the **product** of maxterms 0, 2, 4, 6, and 7."

</div>

### Converting Between Notations

<p style="color: #555; line-height: 1.85; margin-bottom: 1rem;">
Since a function is 1 for minterm indices and 0 for maxterm indices, conversion is straightforward:
</p>

<p style="color: #555; line-height: 1.85; margin-bottom: 0.5rem;"><strong style="color: #333;">Minterm to Maxterm conversion:</strong> The maxterm indices are all indices NOT in the minterm list.</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

$$F = \Sigma m(1,3,5) = \Pi M(0,2,4,6,7)$$

For 3 variables, indices 0–7 exist. If minterms are {1, 3, 5}, maxterms are {0, 2, 4, 6, 7}.

</div>

<p style="color: #555; line-height: 1.85; margin-bottom: 0.5rem;"><strong style="color: #333;">Maxterm to Minterm conversion:</strong> The minterm indices are all indices NOT in the maxterm list.</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 20px 24px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

| Given | To Find | Method |
|-------|---------|--------|
| Σm(list) | ΠM(list) | Use indices NOT in minterm list |
| ΠM(list) | Σm(list) | Use indices NOT in maxterm list |

</div>

!!! tip "Quick Conversion Check"
    The minterm indices plus maxterm indices must equal all possible indices (0 to 2ⁿ-1). If they don't add up correctly, there's an error.

---

<h2 id="46-complement-of-a-function" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">4.6 Complement of a Function</h2>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.5rem;">
The <strong style="color: #333;">complement of a function</strong> <span class="arithmatex">\(\overline{F}\)</span> has the opposite output for every input combination. This leads to elegant relationships in canonical form.
</p>

### Complement in Canonical Form

<div style="background: #EEF4FF; border-left: 4px solid #5A8DEE; border-radius: 8px; padding: 20px 24px; margin: 1.2rem 0;" markdown>

$$\text{If} \quad F = \Sigma m(a,\, b,\, c,\, \ldots) \quad \text{then} \quad \overline{F} = \Sigma m(\text{all other indices})$$

$$\text{Equivalently:} \quad \overline{F} = \Pi M(a,\, b,\, c,\, \ldots)$$

</div>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 10px; padding: 24px; margin: 1.5rem 0;" markdown>
<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Example</p>

$$F = \Sigma m(1,3,5) \qquad \text{(3 variables, indices 0–7)}$$

For 3 variables, the complement takes all remaining indices:

$$\overline{F} = \Sigma m(0,2,4,6,7) \;=\; \Pi M(1,3,5)$$

</div>

<p style="color: #555; line-height: 1.85; margin-bottom: 0.5rem;">This reveals a beautiful symmetry:</p>

<ul style="list-style: none; padding-left: 0.8rem; margin: 0.8rem 0 1.5rem 0;">
<li style="margin-bottom: 0.9rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> The minterm indices of <span class="arithmatex">\(F\)</span> become the maxterm indices of <span class="arithmatex">\(\overline{F}\)</span></li>
<li style="margin-bottom: 0.9rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> The maxterm indices of <span class="arithmatex">\(F\)</span> become the minterm indices of <span class="arithmatex">\(\overline{F}\)</span></li>
</ul>

<h3 id="practical-use" style="color: #5A3EED !important; font-weight: 600; margin-top: 1.6rem; margin-bottom: 26px;">Practical Use</h3>

<p style="color: #555; line-height: 1.9; margin-bottom: 1.2rem; margin-left: 0.4rem;">
To find <span class="arithmatex">\(\overline{F}\)</span> in canonical form:
</p>

<ol style="margin: 0.8rem 0 1.5rem 2rem; line-height: 1.8; color: #333;">
<li style="margin-bottom: 20px;"><strong>From SOP:</strong> Swap <span class="arithmatex">\(\Sigma m \to \Pi M\)</span>, keep same indices</li>
<li style="margin-bottom: 20px;"><strong>From POS:</strong> Swap <span class="arithmatex">\(\Pi M \to \Sigma m\)</span>, keep same indices</li>
</ol>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 30px 32px; margin: 22px 0 24px 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07); display: flex; flex-direction: column; align-items: center; justify-content: center;" markdown>

$$F = \Sigma m(1,3,5)$$

$$\Rightarrow \quad \overline{F} = \Pi M(1,3,5)$$

$$\Rightarrow \quad \overline{F} = \Sigma m(0,2,4,6,7)$$

</div>

---

<h2 id="47-converting-between-sop-and-pos" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">4.7 Converting Between SOP and POS</h2>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.5rem;">
Beyond canonical forms, we often need to convert between standard SOP and POS expressions.
</p>

### Converting SOP to POS

<p style="color: #555; line-height: 1.85; margin-bottom: 1rem; font-weight: 600;">Method 1: Via Truth Table</p>

<ol style="margin: 0.8rem 0 1.5rem 1.5rem; line-height: 2.0; color: #333;">
<li style="margin-bottom: 0.5rem;">Expand SOP to canonical form (all minterms)</li>
<li style="margin-bottom: 0.5rem;">Identify maxterm indices (where F=0)</li>
<li style="margin-bottom: 0.5rem;">Write POS from maxterms</li>
</ol>

<p style="color: #555; line-height: 1.85; margin-bottom: 1rem; font-weight: 600;">Method 2: Algebraic (DeMorgan's)</p>

<ol style="margin: 0.8rem 0 1.5rem 1.5rem; line-height: 2.0; color: #333;">
<li style="margin-bottom: 0.5rem;">Find <span class="arithmatex">\(\overline{F}\)</span> by complementing the SOP</li>
<li style="margin-bottom: 0.5rem;">Simplify <span class="arithmatex">\(\overline{F}\)</span> to SOP form</li>
<li style="margin-bottom: 0.5rem;">Complement again: <span class="arithmatex">\(F = \overline{\overline{F}}\)</span></li>
<li style="margin-bottom: 0.5rem;">Apply DeMorgan's to get POS</li>
</ol>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 10px; padding: 24px; margin: 1.5rem 0;" markdown>
<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Example</p>

Convert $F = AB + \overline{A}C$ to POS

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 14px 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

**Step 1:** Find $\overline{F}$ using DeMorgan's:

$$\overline{F} = \overline{AB + \overline{A}C} = \overline{AB} \cdot \overline{\overline{A}C} = (\overline{A}+\overline{B})(A+\overline{C})$$

**Step 2:** Expand $\overline{F}$ to SOP by distributing:

$$\overline{F} = \overline{A}A + \overline{A}\overline{C} + \overline{B}A + \overline{B}\overline{C} = \overline{A}\overline{C} + A\overline{B} + \overline{B}\overline{C}$$

The term $\overline{B}\overline{C}$ is redundant by the consensus theorem, so $\overline{F} = \overline{A}\overline{C} + A\overline{B}$.

**Step 3:** Complement $\overline{F}$ using DeMorgan's to get F in POS:

$$F = \overline{\overline{A}\overline{C} + A\overline{B}} = \overline{\overline{A}\overline{C}} \cdot \overline{A\overline{B}} = (A+C)(\overline{A}+B)$$

</div>

<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 16px 20px; margin: 14px 0 4px 0; text-align: center;" markdown>

**Result:** $F = (A+C)(\overline{A}+B)$

</div>

</div>

!!! tip "Algebraic vs Truth Table Conversion"
    The algebraic method works but requires careful application of DeMorgan's theorem and distribution. For complex expressions, building a truth table and reading off maxterms directly is often faster and less error-prone.

### Converting POS to SOP

<p style="color: #555; line-height: 1.85; margin-bottom: 1rem; font-weight: 600;">Method 1: Via Truth Table</p>

<ol style="margin: 0.8rem 0 1.5rem 1.5rem; line-height: 2.0; color: #333;">
<li style="margin-bottom: 0.5rem;">Expand POS to canonical form (all maxterms)</li>
<li style="margin-bottom: 0.5rem;">Identify minterm indices (where F=1)</li>
<li style="margin-bottom: 0.5rem;">Write SOP from minterms</li>
</ol>

<p style="color: #555; line-height: 1.85; margin-bottom: 1rem; font-weight: 600;">Method 2: Algebraic Expansion</p>

<ol style="margin: 0.8rem 0 1.5rem 1.5rem; line-height: 2.0; color: #333;">
<li style="margin-bottom: 0.5rem;">Multiply out the POS expression using distribution</li>
<li style="margin-bottom: 0.5rem;">Simplify using Boolean algebra</li>
</ol>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 10px; padding: 24px; margin: 1.5rem 0;" markdown>
<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Example</p>

Convert $F = (A+B)(A+C)$ to SOP

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 30px 32px; margin: 18px 0 8px 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

$$\begin{aligned}
F &= (A+B)(A+C) \\[8pt]
  &= A \cdot A + A \cdot C + B \cdot A + B \cdot C \\[8pt]
  &= A + AC + AB + BC \\[8pt]
  &= A(1 + C + B) + BC \\[8pt]
  &= A + BC
\end{aligned}$$

</div>

</div>

#### Diagram: SOP-POS Converter

<iframe src="../sims/sop-pos-converter/main.html" width="100%" height="900px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>

<details markdown="1">
<summary>SOP-POS Converter</summary>
Type: microsim

Purpose: Convert between SOP and POS forms showing both truth table and algebraic methods

Bloom Level: Apply (L3)
Bloom Verb: Convert, transform, apply

Learning Objective: Students will be able to convert Boolean expressions between SOP and POS forms using either truth table or algebraic methods.

Canvas Layout:
- Top: Expression input with form selector (SOP/POS)
- Middle: Conversion workspace showing method steps
- Bottom: Result display with verification

Visual Elements:
- Input expression field
- Method selector (Truth Table / Algebraic)
- Step-by-step conversion display:
  - For truth table: show table with highlighted rows
  - For algebraic: show DeMorgan's applications
- Output expression in target form
- Verification panel (both expressions produce same truth table)

Interactive Controls:
- Enter expression in either SOP or POS form
- Select target form (convert TO SOP or TO POS)
- Method toggle (truth table vs algebraic)
- "Step Through" for detailed walkthrough
- "Verify Equivalence" button
- Example expression buttons

Data Visibility Requirements:
- Show intermediate steps clearly
- For truth table method: highlight F=1 rows (SOP) or F=0 rows (POS)
- For algebraic: show each transformation with rule applied
- Display both expressions and their common truth table

Default Parameters:
- Input: AB + A'C (SOP)
- Target: POS
- Method: Truth Table

Behavior:
- Parse and validate input expression
- Generate conversion steps based on method
- Verify that input and output have same truth table
- Handle both standard and canonical forms

Instructional Rationale: Seeing both conversion methods helps students choose the appropriate approach based on expression complexity.

Implementation: p5.js with DOM elements
</details>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Verifying Canonical Form Correctness</h3>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
After converting between SOP and POS or simplifying a canonical expression, you need to verify the result is correct. Two systematic methods guarantee correctness.
</p>

**Method 1: Truth Table Cross-Check**

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
Evaluate both the original and converted expressions for all $2^n$ input combinations. If every row matches, the expressions are equivalent.
</p>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 10px; padding: 24px; margin: 1.5rem 0;" markdown>
<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Example: Verify SOP-POS Equivalence</p>

Given: $F = \Sigma m(1,3,5,7) = \Pi M(0,2,4,6)$

| A | B | C | $\Sigma m(1,3,5,7)$ | $\Pi M(0,2,4,6)$ | Match? |
|:-:|:-:|:-:|:---:|:---:|:------:|
| 0 | 0 | 0 | 0 | 0 | Yes |
| 0 | 0 | 1 | 1 | 1 | Yes |
| 0 | 1 | 0 | 0 | 0 | Yes |
| 0 | 1 | 1 | 1 | 1 | Yes |
| 1 | 0 | 0 | 0 | 0 | Yes |
| 1 | 0 | 1 | 1 | 1 | Yes |
| 1 | 1 | 0 | 0 | 0 | Yes |
| 1 | 1 | 1 | 1 | 1 | Yes |

All rows match, confirming $F = C$ (the function equals the variable $C$ alone).

</div>

**Method 2: Algebraic Proof**

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
Use Boolean algebra laws to transform one expression into the other. This is faster for simple functions and provides deeper insight into the structure.
</p>

<div style="background: #EEF4FF; border-left: 4px solid #5A8DEE; border-radius: 8px; padding: 20px 24px; margin: 1.2rem 0;" markdown>

**Prove:** $\overline{A}BC + A\overline{B}C + AB\overline{C} + ABC = AB + AC + BC$

Starting from the left side, pair minterms that differ in one variable:

- $\overline{A}BC + ABC = BC(A + \overline{A}) = BC$
- $A\overline{B}C + ABC = AC(B + \overline{B}) = AC$
- $AB\overline{C} + ABC = AB(C + \overline{C}) = AB$

Therefore: $F = AB + AC + BC$ &#8718;

</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
Notice that the minterm $ABC$ was used three times in different pairings — this is valid because the OR operation is idempotent ($X + X = X$). This "sharing" of minterms between groups is exactly what K-maps exploit visually.
</p>

---

<h2 id="48-dont-cares-in-canonical-form" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">4.8 Don't Cares in Canonical Form</h2>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.5rem;">
<strong style="color: #333;">Don't care conditions</strong> (introduced in Unit 3) have specific representations in canonical notation.
</p>

### Function Sets

<p style="color: #555; line-height: 1.85; margin-bottom: 1rem;">
A Boolean function can be described by three sets of minterm indices:
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 22px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

| Set | Symbol | Description |
|-----|--------|-------------|
| **On-set** | F = 1 | Minterms where output is 1 |
| **Off-set** | F = 0 | Minterms where output is 0 |
| **DC-set** | F = X | Minterms where output is don't care |

</div>

<p style="color: #555; line-height: 1.85; margin-top: 1rem;">
These three sets partition all <span class="arithmatex">\(2^n\)</span> indices: On-set &cup; Off-set &cup; DC-set = {0, 1, &hellip;, 2<sup>n</sup>&minus;1}
</p>

### Notation with Don't Cares

<p style="color: #555; line-height: 1.85; margin-bottom: 1rem;">
The canonical notation extends to include don't cares:
</p>

<div style="background: #EEF4FF; border-left: 4px solid #5A8DEE; border-radius: 8px; padding: 20px 24px; margin: 1.2rem 0;" markdown>

**SOP form:**

$$F(A,B,C) = \Sigma m(1,3,5) + d(2,6)$$

This reads: "F equals 1 for minterms 1, 3, 5, with don't cares at 2 and 6."

**POS form:**

$$F(A,B,C) = \Pi M(0,4,7) \cdot d(2,6)$$

</div>

### Don't Care in SOP vs POS

<p style="color: #555; line-height: 1.85; margin-bottom: 1rem;">
When simplifying:
</p>

<ul style="list-style: none; padding-left: 0.8rem; margin: 0.8rem 0 1.5rem 0;">
<li style="margin-bottom: 0.9rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <strong>Don't care in SOP:</strong> Treat as 1 if it helps create larger groups</li>
<li style="margin-bottom: 0.9rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <strong>Don't care in POS:</strong> Treat as 0 if it helps create larger groups</li>
</ul>

<p style="color: #555; line-height: 1.85; margin-bottom: 1rem;">
The optimizer chooses the assignment that minimizes the expression.
</p>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 10px; padding: 24px; margin: 1.5rem 0;" markdown>
<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Example</p>

$$F = \Sigma m(1,3,5) + d(2,6)$$

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 24px; margin: 14px 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

| Set | Indices |
|-----|---------|
| **On-set** | {1, 3, 5} |
| **DC-set** | {2, 6} |
| **Off-set** | {0, 4, 7} |

</div>

During simplification (K-maps, Unit 5), we may include minterms 2 and/or 6 if it reduces the expression.

</div>

### Incompletely Specified Functions

<p style="color: #555; line-height: 1.85; margin-bottom: 1rem;">
An <strong style="color: #333;">incompletely specified function</strong> has at least one don't care condition. The function is not fully defined — it specifies required behavior for some inputs but allows flexibility for others.
</p>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 10px; padding: 24px; margin: 1.5rem 0;" markdown>
<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Example: BCD Decoder</p>

BCD uses only inputs 0000–1001 (0–9). Inputs 1010–1111 (10–15) never occur, so their outputs are don't cares:

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 20px 24px; margin: 14px 0 4px 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

$$F = \Sigma m(\text{specified 1s}) + d(10,11,12,13,14,15)$$

</div>

</div>

---

<h2 id="49-shannon-expansion-theorem" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">4.9 Shannon Expansion Theorem</h2>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.5rem;">
The <strong style="color: #333;">Shannon expansion theorem</strong> (also called the <strong style="color: #333;">expansion theorem</strong>) provides a systematic method for decomposing a Boolean function with respect to any variable.
</p>

### Expansion with Respect to a Variable

<p style="color: #555; line-height: 1.85; margin-bottom: 1rem;">
Any Boolean function F can be expanded around a variable X:
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 32px; margin: 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

$$F = X \cdot F_X + \overline{X} \cdot F_{\overline{X}}$$

</div>

<p style="color: #555; line-height: 1.85; margin-bottom: 0.5rem;">where:</p>

<ul style="list-style: none; padding-left: 0.8rem; margin: 0.8rem 0 1.5rem 0;">
<li style="margin-bottom: 0.9rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <span class="arithmatex">\(F_X\)</span> is the <strong>positive cofactor</strong>: F evaluated with X = 1</li>
<li style="margin-bottom: 0.9rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <span class="arithmatex">\(F_{\overline{X}}\)</span> is the <strong>negative cofactor</strong>: F evaluated with X = 0</li>
</ul>

### Cofactors

<p style="color: #555; line-height: 1.85; margin-bottom: 1rem;">
A <strong style="color: #333;">cofactor</strong> of function F with respect to variable X is F with X set to a constant:
</p>

<ul style="list-style: none; padding-left: 0.8rem; margin: 0.8rem 0 1.5rem 0;">
<li style="margin-bottom: 0.9rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <strong>Positive cofactor</strong> <span class="arithmatex">\(F_X\)</span>: Set X = 1, simplify</li>
<li style="margin-bottom: 0.9rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <strong>Negative cofactor</strong> <span class="arithmatex">\(F_{\overline{X}}\)</span>: Set X = 0, simplify</li>
</ul>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 10px; padding: 24px; margin: 1.5rem 0;" markdown>
<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Example</p>

Given $F = AB + \overline{A}C + BC$, find cofactors with respect to A.

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 14px 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

**Positive cofactor** (set A = 1):

$$F_A = 1 \cdot B + \overline{1} \cdot C + BC = B + 0 + BC = B + BC = B$$

**Negative cofactor** (set A = 0):

$$F_{\overline{A}} = 0 \cdot B + \overline{0} \cdot C + BC = 0 + C + BC = C + BC = C$$

**Verify reconstruction:**

$$F = A \cdot F_A + \overline{A} \cdot F_{\overline{A}} = A \cdot B + \overline{A} \cdot C = AB + \overline{A}C \quad \checkmark$$

</div>

The reconstructed expression $AB + \overline{A}C$ appears different from the original $AB + \overline{A}C + BC$, but by the **consensus theorem**, the term $BC$ is redundant — it is covered by $AB$ (when A=1) and $\overline{A}C$ (when A=0). Therefore $AB + \overline{A}C + BC = AB + \overline{A}C$, confirming the expansion is correct.

</div>

### Applications of Shannon Expansion

<ol style="margin: 0.8rem 0 1.5rem 1.5rem; line-height: 2.0; color: #333;">
<li style="margin-bottom: 0.5rem;"><strong>Multiplexer implementation:</strong> The expansion directly maps to a 2:1 MUX with X as select</li>
<li style="margin-bottom: 0.5rem;"><strong>Recursive decomposition:</strong> Break complex functions into simpler cofactors</li>
<li style="margin-bottom: 0.5rem;"><strong>BDD construction:</strong> Binary Decision Diagrams use repeated Shannon expansion</li>
<li style="margin-bottom: 0.5rem;"><strong>Verification:</strong> Check function equivalence by comparing cofactors</li>
</ol>

#### Diagram: Shannon Expansion Explorer

<iframe src="../sims/shannon-expansion-explorer/main.html" width="100%" height="840px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>

<details markdown="1">
<summary>Shannon Expansion Explorer</summary>
Type: microsim

Purpose: Demonstrate Shannon expansion and cofactor computation for any Boolean function

Bloom Level: Analyze (L4)
Bloom Verb: Decompose, analyze, derive

Learning Objective: Students will be able to apply Shannon expansion to decompose a Boolean function into cofactors and verify the expansion by reconstruction.

Canvas Layout:
- Top: Function input field
- Middle: Expansion variable selector and cofactor display
- Bottom: Verification and MUX implementation view

Visual Elements:
- Input function display
- Variable selector (which variable to expand around)
- Cofactor computation showing substitution:
  - F_X with X=1 substitution highlighted
  - F_X̄ with X=0 substitution highlighted
- Reconstructed expression: X·F_X + X̄·F_X̄
- Equivalence verification (truth tables match)
- 2:1 MUX diagram showing implementation

Interactive Controls:
- Enter any Boolean expression
- Select expansion variable from dropdown
- "Compute Cofactors" button
- "Verify Expansion" to check equivalence
- "Show MUX" to see hardware implementation
- "Expand Further" to recursively expand cofactors

Data Visibility Requirements:
- Show original function
- Show step-by-step substitution for each cofactor
- Show simplified cofactor expressions
- Display reconstructed expansion
- Verify via truth table comparison

Default Parameters:
- Function: AB + A'C + BC
- Expansion variable: A

Behavior:
- Parse and validate input expression
- Compute cofactors with simplification
- Show that X·F_X + X̄·F_X̄ = F
- Optionally show recursive expansion tree

Instructional Rationale: Understanding Shannon expansion prepares students for advanced topics like BDDs and provides insight into multiplexer-based implementations.

Implementation: p5.js with expression parser
</details>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Multi-Variable Shannon Expansion</h3>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
Shannon expansion around a single variable produces two cofactors, each depending on $n-1$ variables. Applying the expansion recursively to each cofactor around a second variable produces four sub-functions of $n-2$ variables:
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 32px; margin: 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

$$F = A \cdot B \cdot F_{AB} + A \cdot \overline{B} \cdot F_{A\overline{B}} + \overline{A} \cdot B \cdot F_{\overline{A}B} + \overline{A} \cdot \overline{B} \cdot F_{\overline{A}\,\overline{B}}$$

</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
Each successive expansion doubles the number of branches. Expanding around all $n$ variables produces exactly $2^n$ branches — one per minterm — recovering the canonical form. This reveals that the <strong>canonical SOP is simply the complete Shannon expansion tree</strong>.
</p>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 10px; padding: 24px; margin: 1.5rem 0;" markdown>
<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Example: Two-Level Expansion</p>

For $F(A,B,C) = AB + \overline{A}C$:

**Level 1** — expand around $A$:

- $F_A = B$ (set $A=1$)
- $F_{\overline{A}} = C$ (set $A=0$)

**Level 2** — expand each cofactor around $B$:

- $F_{AB} = 1$, $F_{A\overline{B}} = 0$ (from $F_A = B$)
- $F_{\overline{A}B} = C$, $F_{\overline{A}\overline{B}} = C$ (from $F_{\overline{A}} = C$)

$$F = AB \cdot 1 + A\overline{B} \cdot 0 + \overline{A}B \cdot C + \overline{A}\overline{B} \cdot C = AB + \overline{A}C \quad \checkmark$$

</div>

**Connection to Multiplexer Trees**

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
Each level of Shannon expansion maps to one level of 2:1 multiplexers. A two-variable expansion uses a tree of three MUXes: two at the leaf level (selecting between the four sub-function values based on the second variable) and one root MUX (selecting between the two intermediate results based on the first variable). This structure directly implements any Boolean function using only multiplexers.
</p>

**Connection to Binary Decision Diagrams (BDDs)**

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
A <strong style="color: #333;">Binary Decision Diagram</strong> is a directed acyclic graph that represents Shannon expansion in a compact form. Each internal node tests one variable, with two outgoing edges for the 0 and 1 cofactors. The terminal nodes are the constants 0 and 1.
</p>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
An <strong>Ordered BDD (OBDD)</strong> fixes a single variable ordering across all paths. A <strong>Reduced Ordered BDD (ROBDD)</strong> applies two simplification rules:
</p>

<ol style="margin: 0.8rem 0 1.5rem 1.5rem; line-height: 2.0; color: #333;">
<li style="margin-bottom: 0.5rem;"><strong>Merge rule:</strong> Combine identical sub-graphs (nodes with the same variable, same 0-child, and same 1-child)</li>
<li style="margin-bottom: 0.5rem;"><strong>Elimination rule:</strong> Remove a node whose 0-child and 1-child are identical (the variable has no effect)</li>
</ol>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
ROBDDs are canonical for a given variable ordering — two functions are equivalent if and only if their ROBDDs are identical. This property makes BDDs the foundation of many modern verification and synthesis algorithms used by EDA tools. The variable ordering dramatically affects BDD size; finding the optimal ordering is NP-hard, but good heuristics exist.
</p>

---

<h2 id="410-literal-count-and-expression-complexity" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">4.10 Literal Count and Expression Complexity</h2>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.5rem;">
The <strong style="color: #333;">literal count</strong> is a common metric for expression complexity, counting the total number of variable appearances (complemented or uncomplemented) in an expression.
</p>

### Counting Literals

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 10px; padding: 24px; margin: 1.5rem 0;" markdown>
<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Example</p>

$F = AB + \overline{A}C + BC$

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 20px 24px; margin: 14px 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

| Term | Expression | Literals | Count |
|------|-----------|----------|-------|
| Term 1 | $AB$ | A, B | 2 |
| Term 2 | $\overline{A}C$ | $\overline{A}$, C | 2 |
| Term 3 | $BC$ | B, C | 2 |
| **Total** | | | **6** |

</div>

</div>

### Canonical Form Literal Count

<p style="color: #555; line-height: 1.85; margin-bottom: 1rem;">
Canonical forms typically have high literal counts because every term includes all variables:
</p>

<div style="background: #EEF4FF; border-left: 4px solid #5A8DEE; border-radius: 8px; padding: 20px 24px; margin: 1.2rem 0;" markdown>

$$\text{Literal count} = k \times n \qquad \text{(k minterms, n variables)}$$

</div>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 10px; padding: 24px; margin: 1.5rem 0;" markdown>
<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Example</p>

$F = \Sigma m(1,3,5)$ in 3 variables

<ul style="list-style: none; padding-left: 0.8rem; margin: 0.8rem 0 1rem 0;">
<li style="margin-bottom: 0.6rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> 3 minterms, each with 3 literals</li>
<li style="margin-bottom: 0.6rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> Literal count = 3 &times; 3 = <strong>9 literals</strong></li>
</ul>

<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 16px 20px; margin: 10px 0 4px 0; text-align: center;" markdown>

The simplified form: $F = \overline{B}C + BC = C$ has only **1 literal** — a 9&times; reduction!

</div>

</div>

### Why Literal Count Matters

<ul style="list-style: none; padding-left: 0.8rem; margin: 0.8rem 0 1.5rem 0;">
<li style="margin-bottom: 0.9rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <strong>Gate inputs:</strong> Each literal requires a gate input (or inverter)</li>
<li style="margin-bottom: 0.9rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <strong>Wiring complexity:</strong> More literals = more connections</li>
<li style="margin-bottom: 0.9rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <strong>Cost:</strong> Integrated circuit area and power roughly correlate with literal count</li>
<li style="margin-bottom: 0.9rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <strong>Speed:</strong> More literals can mean longer propagation paths</li>
</ul>

| Metric | Canonical Form | Simplified Form |
|--------|----------------|-----------------|
| Unique | Yes | May not be unique |
| From truth table | Direct | Requires simplification |
| Literal count | High | Minimized |
| Implementation cost | High | Lower |

<p style="color: #555; line-height: 1.85; margin-top: 1.2rem;">
The goal of simplification (Unit 5) is to reduce literal count while preserving the function.
</p>

---

<h2 id="summary-and-key-takeaways" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">Summary and Key Takeaways</h2>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
This unit established canonical forms as the foundation for systematic Boolean function representation:
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<ul style="list-style: none; padding-left: 0; margin: 0;">
<li style="margin-bottom: 1.1rem; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> <strong>Canonical forms</strong> are unique representations where every variable appears in every term. They bridge truth tables and algebraic expressions.</li>
<li style="margin-bottom: 1.1rem; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> <strong>Minterms</strong> are product terms with all variables (used for canonical SOP). Each minterm equals 1 for exactly one input combination.</li>
<li style="margin-bottom: 1.1rem; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> <strong>Maxterms</strong> are sum terms with all variables (used for canonical POS). Each maxterm equals 0 for exactly one input combination.</li>
<li style="margin-bottom: 1.1rem; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> <strong>Minterm/maxterm designations</strong> use indices matching the decimal value of the input combination. <span class="arithmatex">\(m_i\)</span> and <span class="arithmatex">\(M_i\)</span> are complements of each other.</li>
<li style="margin-bottom: 1.1rem; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> <strong>Compact notation</strong> uses <span class="arithmatex">\(\Sigma m\)</span>(indices) for sum of minterms and <span class="arithmatex">\(\Pi M\)</span>(indices) for product of maxterms.</li>
<li style="margin-bottom: 1.1rem; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> <strong>Converting between SOP and POS:</strong> Use the complementary index set, or build via truth table.</li>
<li style="margin-bottom: 1.1rem; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> <strong>Function complement:</strong> <span class="arithmatex">\(\overline{F}\)</span> swaps minterm indices to maxterm indices (and vice versa).</li>
<li style="margin-bottom: 1.1rem; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> <strong>Don't cares</strong> are represented as d(indices) and define the DC-set alongside On-set and Off-set.</li>
<li style="margin-bottom: 1.1rem; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> <strong>Shannon expansion</strong> decomposes <span class="arithmatex">\(F = X \cdot F_X + \overline{X} \cdot F_{\overline{X}}\)</span> using positive and negative cofactors.</li>
<li style="margin-bottom: 0; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> <strong>Literal count</strong> measures expression complexity; canonical forms have high literal counts that simplification reduces.</li>
</ul>

</div>

<h3 style="color: #5A3EED !important; font-weight: 600; margin-top: 1.8rem; margin-bottom: 20px;">Self-Check Questions</h3>

??? question "Convert F = Σm(0,2,5,7) to ΠM notation for 3 variables."
    For 3 variables, indices are 0-7. If On-set = {0,2,5,7}, then Off-set = {1,3,4,6}. Therefore: F = ΠM(1,3,4,6)

??? question "What is the complement of F = Σm(1,4,6) in Σ notation?"
    $\overline{F}$ has the complementary minterm set. For 3 variables: $\overline{F} = \Sigma m(0,2,3,5,7)$

??? question "Find the positive cofactor of F = ABC + ĀB + BC with respect to B."
    Set B = 1: $F_B = A(1)C + \overline{A}(1) + (1)C = AC + \overline{A} + C = \overline{A} + C$ (by absorption: AC + C = C, and $\overline{A} + C$ remains)

---

## Interactive Walkthrough

Step through expanding a Boolean expression into canonical minterm form:

<iframe src="../sims/minterm-expansion-walkthrough/main.html" width="100%" height="580px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>

---

[See Annotated References](./references.md)

</div>
