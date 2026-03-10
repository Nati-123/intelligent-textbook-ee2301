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

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">Prerequisites</h2>

<div markdown style="background: #F8F6FF; border: 2px solid #D4C8FF; border-radius: 12px; padding: 20px 24px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

Before beginning this unit, students should have:

- Solid understanding of Boolean algebra operations (Unit 2)
- Ability to construct truth tables for any Boolean expression
- Familiarity with SOP and POS forms (Unit 2)
- Understanding of don't care conditions (Unit 3)

</div>

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">4.1 Canonical vs Standard Forms</h2>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

Boolean expressions can be written in multiple equivalent ways. Two important classifications are **canonical forms** and **standard forms**.

A **standard form** expression is written as either:

- **Standard SOP:** Sum of product terms (not all variables need appear in each term)
- **Standard POS:** Product of sum terms (not all variables need appear in each term)

A **canonical form** is a standardized, unique representation where **every variable appears exactly once** (either complemented or uncomplemented) in **every term**.

- **Canonical SOP:** Every product term contains all n variables → called **minterms**
- **Canonical POS:** Every sum term contains all n variables → called **maxterms**

The canonical form of a function is **unique** — there is exactly one canonical SOP and one canonical POS for any given function.

| Property | Standard Form | Canonical Form |
|:---------|:--------------|:---------------|
| **Variables per term** | May vary | All n variables |
| **Unique representation** | No | Yes |
| **Term names** | Product / Sum terms | Minterms / Maxterms |
| **Directly from truth table** | No | Yes |
| **Typically more terms** | No | Yes |

</div>

<div markdown style="background: #FFF8E1; border: 2px solid #F0D87A; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);">

**Example — Standard SOP**

$$F = AB + \overline{A}C + BC$$

The first term has only A and B, the second has A and C, and the third has B and C — **not all three variables appear in every term**.

</div>

<div style="background: #FFF8E1; border-left: 4px solid #F0D87A; border-radius: 8px; padding: 16px 20px; margin: 1rem 0;">
<strong style="color: #B8860B;">Why Canonical Forms Matter:</strong> Canonical forms provide a <strong>direct bridge between truth tables and algebraic expressions</strong>. They also serve as the starting point for systematic simplification methods like Karnaugh maps.
</div>

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">4.2 Minterms</h2>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

A **minterm** is a product term containing all n variables of the function, where each variable appears exactly once in either complemented or uncomplemented form. For n variables, there are exactly <span class="arithmatex">\(2^n\)</span> possible minterms.

**Minterm Construction** — For each row of a truth table where the output is 1:

- Include the variable **uncomplemented** if its value is 1
- Include the variable **complemented** if its value is 0

</div>

<div markdown style="background: #FFF8E1; border: 2px solid #F0D87A; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);">

**Example:** For 3 variables (A, B, C), construct the minterm for input 101:

- A = 1 → include A
- B = 0 → include <span class="arithmatex">\(\overline{B}\)</span>
- C = 1 → include C
- Minterm: <span class="arithmatex">\(A\overline{B}C\)</span>

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">Minterm Designation</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

Each minterm has a unique **minterm designation** (index number) equal to the decimal value of the input combination.

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

Each minterm equals 1 for exactly one input combination and 0 for all others. This is why minterms are used to build SOP expressions — ORing together the minterms where F=1 creates a function that is 1 precisely for those inputs.

</div>

<h4 style="color: #5A3EED; font-weight: 700;">Diagram: Minterm Visualizer</h4>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../sims/minterm-visualizer/main.html" width="100%" height="820px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">4.3 Maxterms</h2>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

A **maxterm** is a sum term containing all n variables of the function, where each variable appears exactly once in either complemented or uncomplemented form. Maxterms are the dual of minterms.

**Maxterm Construction** — For each row of a truth table where the output is 0:

- Include the variable **complemented** if its value is 1
- Include the variable **uncomplemented** if its value is 0

</div>

<div style="background: #FFF0F0; border-left: 4px solid #E57373; border-radius: 8px; padding: 16px 20px; margin: 1rem 0;">
<strong style="color: #C62828;">Important:</strong> This is the <strong>opposite</strong> of minterm construction!
</div>

<div markdown style="background: #FFF8E1; border: 2px solid #F0D87A; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);">

**Example:** For 3 variables (A, B, C), construct the maxterm for input 101:

- A = 1 → include <span class="arithmatex">\(\overline{A}\)</span>
- B = 0 → include B
- C = 1 → include <span class="arithmatex">\(\overline{C}\)</span>
- Maxterm: <span class="arithmatex">\((\overline{A} + B + \overline{C})\)</span>

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">Maxterm Designation</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

Each maxterm has a unique **maxterm designation** equal to the decimal value of the input combination. Maxterms are denoted with capital M.

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

Each maxterm equals 0 for exactly one input combination and 1 for all others. This is the dual property to minterms. ANDing together maxterms where F=0 creates a function that is 0 precisely for those inputs.

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">Relationship Between Minterms and Maxterms</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

A minterm and maxterm with the same index are complements:

$$m_i = \overline{M_i} \qquad M_i = \overline{m_i}$$

</div>

<div markdown style="background: #FFF8E1; border: 2px solid #F0D87A; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);">

**Example:** $m_5 = A\overline{B}C$ and $M_5 = (\overline{A} + B + \overline{C})$

By DeMorgan's theorem:

$$\overline{m_5} = \overline{A\overline{B}C} = \overline{A} + B + \overline{C} = M_5 \quad \checkmark$$

</div>

---

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">Why Canonical Forms Are Not Minimal</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

Canonical forms are unique and easy to derive from truth tables, but they carry a high **literal count** — the total number of variable appearances in the expression. Every term contains every variable, so an *n*-variable function with *k* minterms has *n × k* literals in its canonical SOP.

The **gate count** — the number of logic gates required — is closely related to literal count but not identical. Reducing literal count almost always reduces gate count.

| Metric | Canonical SOP | Simplified SOP | Savings |
|--------|:------------:|:--------------:|:-------:|
| Literals | $n \times k$ | Minimized | 40–70% typical |
| AND gates | $k$ (each $n$-input) | Fewer, narrower | Fewer transistors |
| OR gate | 1 ($k$-input) | 1 (fewer inputs) | Reduced fan-in |
| Propagation delay | Higher (wider gates) | Lower | Faster circuit |

This cost difference motivates the entire subject of Boolean minimization covered in Units 5 and 6. Canonical forms are the **starting point** — they guarantee correctness and uniqueness — while minimized forms are the **implementation goal**.

</div>

<div markdown style="background: #FFF8E1; border: 2px solid #F0D87A; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);">

**Example: Cost of Canonical Form**

Consider the 3-variable function $F(A,B,C) = \Sigma m(3,5,6,7)$.

**Canonical SOP** (12 literals, 4 AND gates, 1 OR gate):

$$F = \overline{A}BC + A\overline{B}C + AB\overline{C} + ABC$$

**Simplified SOP** (5 literals, 3 AND gates, 1 OR gate):

$$F = BC + AC + AB$$

The simplified form uses fewer than half the literals and one fewer gate.

</div>

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">4.4 Canonical SOP and POS Forms</h2>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">Sum of Minterms (Canonical SOP)</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

The **canonical SOP form** expresses a function as the OR (sum) of all minterms for which the function equals 1. This is also called the **minterm expansion** or **sum of minterms**.

**Procedure: Function from Truth Table (SOP)**

1. Identify all rows where F = 1
2. Write the minterm for each such row
3. OR all minterms together

</div>

<div markdown style="background: #FFF8E1; border: 2px solid #F0D87A; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);">

**Example:** Given the truth table:

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

$$F = m_1 + m_3 + m_5 = \overline{A}\overline{B}C + \overline{A}BC + A\overline{B}C$$

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">Product of Maxterms (Canonical POS)</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

The **canonical POS form** expresses a function as the AND (product) of all maxterms for which the function equals 0. This is also called the **maxterm expansion** or **product of maxterms**. Maxterms correspond to the F = 0 rows because each maxterm evaluates to 0 for exactly one input combination.

**Procedure: Maxterm from Truth Table (POS)**

1. Identify all rows where F = 0
2. Write the maxterm for each such row
3. AND all maxterms together

</div>

<div markdown style="background: #FFF8E1; border: 2px solid #F0D87A; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);">

**Example:** Using the same truth table above, F = 0 for rows 0, 2, 4, 6, 7.

$$\begin{aligned}
F &= M_0 \cdot M_2 \cdot M_4 \cdot M_6 \cdot M_7 \\[6pt]
  &= (A + B + C)\,(A + \overline{B} + C)\,(\overline{A} + B + C) \\[4pt]
  &\quad\; \cdot\,(\overline{A} + \overline{B} + C)\,(\overline{A} + \overline{B} + \overline{C})
\end{aligned}$$

Both canonical forms — the **sum of minterms** (SOP) and the **product of maxterms** (POS) — represent the same function F.

</div>

<h4 style="color: #5A3EED; font-weight: 700;">Diagram: Minterm/Maxterm Converter</h4>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../sims/minterm-maxterm-converter/main.html" width="100%" height="1400px" scrolling="auto" style="border:none; border-radius:8px;"></iframe>
</div>

<h4 style="color: #5A3EED; font-weight: 700;">Diagram: Truth Table to Canonical Form Converter</h4>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../sims/truth-table-canonical-form/main.html" width="100%" height="720px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">4.5 Compact Notation: Σ and Π</h2>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

Writing out full canonical expressions is tedious. Compact notations provide efficient representations.

**Sigma Notation (Σ) for SOP** — The **minterm list notation** uses the Greek letter sigma (Σ) followed by the list of minterm indices:

$$F(A,B,C) = \Sigma m(1,3,5)$$

This reads: "F equals the **sum** of minterms 1, 3, and 5." The variable list indicates the order of significance (A is MSB, C is LSB).

**Pi Notation (Π) for POS** — The **maxterm list notation** uses the Greek letter pi (Π) followed by the list of maxterm indices:

$$F(A,B,C) = \Pi M(0,2,4,6,7)$$

This reads: "F equals the **product** of maxterms 0, 2, 4, 6, and 7."

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">Converting Between Notations</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

Since a function is 1 for minterm indices and 0 for maxterm indices, conversion is straightforward — the maxterm indices are all indices NOT in the minterm list, and vice versa.

$$F = \Sigma m(1,3,5) = \Pi M(0,2,4,6,7)$$

For 3 variables, indices 0–7 exist. If minterms are {1, 3, 5}, maxterms are {0, 2, 4, 6, 7}.

| Given | To Find | Method |
|-------|---------|--------|
| Σm(list) | ΠM(list) | Use indices NOT in minterm list |
| ΠM(list) | Σm(list) | Use indices NOT in maxterm list |

</div>

<div style="background: #FFF8E1; border-left: 4px solid #F0D87A; border-radius: 8px; padding: 16px 20px; margin: 1rem 0;">
<strong style="color: #B8860B;">Quick Conversion Check:</strong> The minterm indices plus maxterm indices must equal all possible indices (0 to 2<sup>n</sup>-1). If they don't add up correctly, there's an error.
</div>

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">4.6 Complement of a Function</h2>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

The **complement of a function** <span class="arithmatex">\(\overline{F}\)</span> has the opposite output for every input combination. This leads to elegant relationships in canonical form:

$$\text{If} \quad F = \Sigma m(a,\, b,\, c,\, \ldots) \quad \text{then} \quad \overline{F} = \Sigma m(\text{all other indices})$$

$$\text{Equivalently:} \quad \overline{F} = \Pi M(a,\, b,\, c,\, \ldots)$$

This reveals a beautiful symmetry:

- The minterm indices of <span class="arithmatex">\(F\)</span> become the maxterm indices of <span class="arithmatex">\(\overline{F}\)</span>
- The maxterm indices of <span class="arithmatex">\(F\)</span> become the minterm indices of <span class="arithmatex">\(\overline{F}\)</span>

</div>

<div markdown style="background: #FFF8E1; border: 2px solid #F0D87A; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);">

**Example:**

$$F = \Sigma m(1,3,5) \qquad \text{(3 variables, indices 0–7)}$$

For 3 variables, the complement takes all remaining indices:

$$\overline{F} = \Sigma m(0,2,4,6,7) \;=\; \Pi M(1,3,5)$$

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">Practical Use</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

To find <span class="arithmatex">\(\overline{F}\)</span> in canonical form:

1. **From SOP:** Swap <span class="arithmatex">\(\Sigma m \to \Pi M\)</span>, keep same indices
2. **From POS:** Swap <span class="arithmatex">\(\Pi M \to \Sigma m\)</span>, keep same indices

$$F = \Sigma m(1,3,5) \;\Rightarrow\; \overline{F} = \Pi M(1,3,5) \;\Rightarrow\; \overline{F} = \Sigma m(0,2,4,6,7)$$

</div>

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">4.7 Converting Between SOP and POS</h2>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

Beyond canonical forms, we often need to convert between standard SOP and POS expressions.

**Converting SOP to POS — Method 1: Via Truth Table**

1. Expand SOP to canonical form (all minterms)
2. Identify maxterm indices (where F=0)
3. Write POS from maxterms

**Converting SOP to POS — Method 2: Algebraic (DeMorgan's)**

1. Find <span class="arithmatex">\(\overline{F}\)</span> by complementing the SOP
2. Simplify <span class="arithmatex">\(\overline{F}\)</span> to SOP form
3. Complement again: <span class="arithmatex">\(F = \overline{\overline{F}}\)</span>
4. Apply DeMorgan's to get POS

</div>

<div markdown style="background: #FFF8E1; border: 2px solid #F0D87A; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);">

**Example:** Convert $F = AB + \overline{A}C$ to POS

**Step 1:** Find $\overline{F}$ using DeMorgan's:

$$\overline{F} = \overline{AB + \overline{A}C} = \overline{AB} \cdot \overline{\overline{A}C} = (\overline{A}+\overline{B})(A+\overline{C})$$

**Step 2:** Expand $\overline{F}$ to SOP by distributing:

$$\overline{F} = \overline{A}A + \overline{A}\overline{C} + \overline{B}A + \overline{B}\overline{C} = \overline{A}\overline{C} + A\overline{B} + \overline{B}\overline{C}$$

The term $\overline{B}\overline{C}$ is redundant by the consensus theorem, so $\overline{F} = \overline{A}\overline{C} + A\overline{B}$.

**Step 3:** Complement $\overline{F}$ using DeMorgan's to get F in POS:

$$F = \overline{\overline{A}\overline{C} + A\overline{B}} = \overline{\overline{A}\overline{C}} \cdot \overline{A\overline{B}} = (A+C)(\overline{A}+B)$$

**Result:** $F = (A+C)(\overline{A}+B)$

</div>

<div style="background: #FFF8E1; border-left: 4px solid #F0D87A; border-radius: 8px; padding: 16px 20px; margin: 1rem 0;">
<strong style="color: #B8860B;">Algebraic vs Truth Table Conversion:</strong> The algebraic method works but requires careful application of DeMorgan's theorem and distribution. For complex expressions, building a truth table and reading off maxterms directly is often faster and less error-prone.
</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">Converting POS to SOP</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

**Method 1: Via Truth Table** — Expand POS to canonical form, identify minterm indices (where F=1), write SOP from minterms.

**Method 2: Algebraic Expansion** — Multiply out the POS expression using distribution, then simplify using Boolean algebra.

</div>

<div markdown style="background: #FFF8E1; border: 2px solid #F0D87A; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);">

**Example:** Convert $F = (A+B)(A+C)$ to SOP

$$\begin{aligned}
F &= (A+B)(A+C) \\[8pt]
  &= A \cdot A + A \cdot C + B \cdot A + B \cdot C \\[8pt]
  &= A + AC + AB + BC \\[8pt]
  &= A(1 + C + B) + BC \\[8pt]
  &= A + BC
\end{aligned}$$

</div>

<h4 style="color: #5A3EED; font-weight: 700;">Diagram: SOP-POS Converter</h4>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../sims/sop-pos-converter/main.html" width="100%" height="920px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">Verifying Canonical Form Correctness</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

After converting between SOP and POS or simplifying a canonical expression, you need to verify the result is correct. Two systematic methods guarantee correctness.

**Method 1: Truth Table Cross-Check** — Evaluate both expressions for all $2^n$ input combinations. If every row matches, they are equivalent.

**Method 2: Algebraic Proof** — Use Boolean algebra laws to transform one expression into the other.

</div>

<div markdown style="background: #FFF8E1; border: 2px solid #F0D87A; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);">

**Example: Verify SOP-POS Equivalence**

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

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

**Algebraic Proof:** $\overline{A}BC + A\overline{B}C + AB\overline{C} + ABC = AB + AC + BC$

Starting from the left side, pair minterms that differ in one variable:

- $\overline{A}BC + ABC = BC(A + \overline{A}) = BC$
- $A\overline{B}C + ABC = AC(B + \overline{B}) = AC$
- $AB\overline{C} + ABC = AB(C + \overline{C}) = AB$

Therefore: $F = AB + AC + BC$ &#8718;

Notice that the minterm $ABC$ was used three times in different pairings — this is valid because the OR operation is idempotent ($X + X = X$). This "sharing" of minterms is exactly what K-maps exploit visually.

</div>

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">4.8 Don't Cares in Canonical Form</h2>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

**Don't care conditions** (introduced in Unit 3) have specific representations in canonical notation. A Boolean function can be described by three sets of minterm indices:

| Set | Symbol | Description |
|-----|--------|-------------|
| **On-set** | F = 1 | Minterms where output is 1 |
| **Off-set** | F = 0 | Minterms where output is 0 |
| **DC-set** | F = X | Minterms where output is don't care |

These three sets partition all <span class="arithmatex">\(2^n\)</span> indices: On-set &cup; Off-set &cup; DC-set = {0, 1, ..., 2<sup>n</sup>-1}

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">Notation with Don't Cares</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

The canonical notation extends to include don't cares:

**SOP form:** $F(A,B,C) = \Sigma m(1,3,5) + d(2,6)$ — "F equals 1 for minterms 1, 3, 5, with don't cares at 2 and 6."

**POS form:** $F(A,B,C) = \Pi M(0,4,7) \cdot d(2,6)$

When simplifying:

- **Don't care in SOP:** Treat as 1 if it helps create larger groups
- **Don't care in POS:** Treat as 0 if it helps create larger groups

The optimizer chooses the assignment that minimizes the expression.

</div>

<div markdown style="background: #FFF8E1; border: 2px solid #F0D87A; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);">

**Example:** $F = \Sigma m(1,3,5) + d(2,6)$

| Set | Indices |
|-----|---------|
| **On-set** | {1, 3, 5} |
| **DC-set** | {2, 6} |
| **Off-set** | {0, 4, 7} |

During simplification (K-maps, Unit 5), we may include minterms 2 and/or 6 if it reduces the expression.

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">Incompletely Specified Functions</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

An **incompletely specified function** has at least one don't care condition. The function is not fully defined — it specifies required behavior for some inputs but allows flexibility for others.

**Example: BCD Decoder** — BCD uses only inputs 0000–1001 (0–9). Inputs 1010–1111 (10–15) never occur, so their outputs are don't cares:

$$F = \Sigma m(\text{specified 1s}) + d(10,11,12,13,14,15)$$

</div>

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">4.9 Shannon Expansion Theorem</h2>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

The **Shannon expansion theorem** (also called the **expansion theorem**) provides a systematic method for decomposing a Boolean function with respect to any variable.

Any Boolean function F can be expanded around a variable X:

$$F = X \cdot F_X + \overline{X} \cdot F_{\overline{X}}$$

where:

- <span class="arithmatex">\(F_X\)</span> is the **positive cofactor**: F evaluated with X = 1
- <span class="arithmatex">\(F_{\overline{X}}\)</span> is the **negative cofactor**: F evaluated with X = 0

A **cofactor** of function F with respect to variable X is F with X set to a constant.

</div>

<div markdown style="background: #FFF8E1; border: 2px solid #F0D87A; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);">

**Example:** Given $F = AB + \overline{A}C + BC$, find cofactors with respect to A.

**Positive cofactor** (set A = 1):

$$F_A = 1 \cdot B + \overline{1} \cdot C + BC = B + 0 + BC = B + BC = B$$

**Negative cofactor** (set A = 0):

$$F_{\overline{A}} = 0 \cdot B + \overline{0} \cdot C + BC = 0 + C + BC = C + BC = C$$

**Verify reconstruction:**

$$F = A \cdot F_A + \overline{A} \cdot F_{\overline{A}} = A \cdot B + \overline{A} \cdot C = AB + \overline{A}C \quad \checkmark$$

The reconstructed expression $AB + \overline{A}C$ appears different from the original $AB + \overline{A}C + BC$, but by the **consensus theorem**, the term $BC$ is redundant.

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">Applications of Shannon Expansion</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

1. **Multiplexer implementation:** The expansion directly maps to a 2:1 MUX with X as select
2. **Recursive decomposition:** Break complex functions into simpler cofactors
3. **BDD construction:** Binary Decision Diagrams use repeated Shannon expansion
4. **Verification:** Check function equivalence by comparing cofactors

</div>

<h4 style="color: #5A3EED; font-weight: 700;">Diagram: Shannon Expansion Explorer</h4>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../sims/shannon-expansion-explorer/main.html" width="100%" height="860px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">Multi-Variable Shannon Expansion</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

Shannon expansion around a single variable produces two cofactors, each depending on $n-1$ variables. Applying the expansion recursively produces four sub-functions:

$$F = A \cdot B \cdot F_{AB} + A \cdot \overline{B} \cdot F_{A\overline{B}} + \overline{A} \cdot B \cdot F_{\overline{A}B} + \overline{A} \cdot \overline{B} \cdot F_{\overline{A}\,\overline{B}}$$

Each successive expansion doubles the number of branches. Expanding around all $n$ variables produces exactly $2^n$ branches — one per minterm — recovering the canonical form. This reveals that the **canonical SOP is simply the complete Shannon expansion tree**.

</div>

<div markdown style="background: #FFF8E1; border: 2px solid #F0D87A; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);">

**Example: Two-Level Expansion** for $F(A,B,C) = AB + \overline{A}C$:

**Level 1** — expand around $A$: $F_A = B$, $F_{\overline{A}} = C$

**Level 2** — expand each cofactor around $B$:

- $F_{AB} = 1$, $F_{A\overline{B}} = 0$ (from $F_A = B$)
- $F_{\overline{A}B} = C$, $F_{\overline{A}\overline{B}} = C$ (from $F_{\overline{A}} = C$)

$$F = AB \cdot 1 + A\overline{B} \cdot 0 + \overline{A}B \cdot C + \overline{A}\overline{B} \cdot C = AB + \overline{A}C \quad \checkmark$$

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">Connections to MUX Trees and BDDs</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

Each level of Shannon expansion maps to one level of 2:1 multiplexers. A two-variable expansion uses a tree of three MUXes, directly implementing any Boolean function using only multiplexers.

A **Binary Decision Diagram (BDD)** is a directed acyclic graph that represents Shannon expansion in compact form. Each internal node tests one variable, with two outgoing edges for the 0 and 1 cofactors.

An **Ordered BDD (OBDD)** fixes a single variable ordering. A **Reduced Ordered BDD (ROBDD)** applies two rules:

1. **Merge rule:** Combine identical sub-graphs
2. **Elimination rule:** Remove a node whose 0-child and 1-child are identical

ROBDDs are canonical for a given variable ordering — two functions are equivalent if and only if their ROBDDs are identical. This property makes BDDs the foundation of many modern verification and synthesis algorithms.

</div>

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">4.10 Literal Count and Expression Complexity</h2>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

The **literal count** is a common metric for expression complexity, counting the total number of variable appearances (complemented or uncomplemented) in an expression.

Canonical forms typically have high literal counts because every term includes all variables:

$$\text{Literal count} = k \times n \qquad \text{(k minterms, n variables)}$$

**Why literal count matters:**

- **Gate inputs:** Each literal requires a gate input (or inverter)
- **Wiring complexity:** More literals = more connections
- **Cost:** Integrated circuit area and power roughly correlate with literal count
- **Speed:** More literals can mean longer propagation paths

| Metric | Canonical Form | Simplified Form |
|--------|----------------|-----------------|
| Unique | Yes | May not be unique |
| From truth table | Direct | Requires simplification |
| Literal count | High | Minimized |
| Implementation cost | High | Lower |

The goal of simplification (Unit 5) is to reduce literal count while preserving the function.

</div>

<div markdown style="background: #FFF8E1; border: 2px solid #F0D87A; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);">

**Example:** $F = AB + \overline{A}C + BC$

| Term | Expression | Literals | Count |
|------|-----------|----------|-------|
| Term 1 | $AB$ | A, B | 2 |
| Term 2 | $\overline{A}C$ | $\overline{A}$, C | 2 |
| Term 3 | $BC$ | B, C | 2 |
| **Total** | | | **6** |

**Example:** $F = \Sigma m(1,3,5)$ in 3 variables — 3 minterms × 3 literals = **9 literals**. The simplified form: $F = C$ has only **1 literal** — a 9× reduction!

</div>

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">Summary and Key Takeaways</h2>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

This unit established canonical forms as the foundation for systematic Boolean function representation:

- **Canonical forms** are unique representations where every variable appears in every term. They bridge truth tables and algebraic expressions.
- **Minterms** are product terms with all variables (used for canonical SOP). Each minterm equals 1 for exactly one input combination.
- **Maxterms** are sum terms with all variables (used for canonical POS). Each maxterm equals 0 for exactly one input combination.
- **Minterm/maxterm designations** use indices matching the decimal value of the input combination. <span class="arithmatex">\(m_i\)</span> and <span class="arithmatex">\(M_i\)</span> are complements of each other.
- **Compact notation** uses <span class="arithmatex">\(\Sigma m\)</span>(indices) for sum of minterms and <span class="arithmatex">\(\Pi M\)</span>(indices) for product of maxterms.
- **Converting between SOP and POS:** Use the complementary index set, or build via truth table.
- **Function complement:** <span class="arithmatex">\(\overline{F}\)</span> swaps minterm indices to maxterm indices (and vice versa).
- **Don't cares** are represented as d(indices) and define the DC-set alongside On-set and Off-set.
- **Shannon expansion** decomposes <span class="arithmatex">\(F = X \cdot F_X + \overline{X} \cdot F_{\overline{X}}\)</span> using positive and negative cofactors.
- **Literal count** measures expression complexity; canonical forms have high literal counts that simplification reduces.

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">Self-Check Questions</h3>

??? question "Convert F = Σm(0,2,5,7) to ΠM notation for 3 variables."
    For 3 variables, indices are 0-7. If On-set = {0,2,5,7}, then Off-set = {1,3,4,6}. Therefore: F = ΠM(1,3,4,6)

??? question "What is the complement of F = Σm(1,4,6) in Σ notation?"
    $\overline{F}$ has the complementary minterm set. For 3 variables: $\overline{F} = \Sigma m(0,2,3,5,7)$

??? question "Find the positive cofactor of F = ABC + ĀB + BC with respect to B."
    Set B = 1: $F_B = A(1)C + \overline{A}(1) + (1)C = AC + \overline{A} + C = \overline{A} + C$ (by absorption: AC + C = C, and $\overline{A} + C$ remains)

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">Interactive Walkthrough</h2>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

Step through expanding a Boolean expression into canonical minterm form:

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../sims/minterm-expansion-walkthrough/main.html" width="100%" height="630px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

---

[Take the Unit Quiz](./quiz.md) | [See Annotated References](./references.md)

</div>
