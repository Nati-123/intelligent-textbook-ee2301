---
title: Unit 4 Problems - Minterm & Maxterm Expansions
description: Practice problems for canonical forms, SOP, POS, and cofactors
---

<div class="problems-styled" markdown>

<h1 style="color: #5A3EED !important; border-bottom: 3px solid #5A3EED; padding-bottom: 0.4rem; font-weight: 800;">End-of-Unit Problems: Minterm & Maxterm Expansions</h1>

<p style="color: #555; line-height: 1.85; font-size: 1.05rem; margin-bottom: 2rem;">
Work through these problems to reinforce your understanding of canonical forms.
</p>

---

<h2 style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 1rem;">Section A: Minterms and Maxterms (5 problems)</h2>

<div style="background: #F8F6FF; border: 2px solid #D0C4FF; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,62,237,0.06);" markdown>

### Problem 1

For a 3-variable function F(A, B, C), list:

a) The minterm for row 5
b) The maxterm for row 3
c) The minterm notation for A'BC
d) The maxterm notation for (A + B' + C)

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;">
a) Row 5 = <span class="arithmatex">\(101_2\)</span>, so A=1, B=0, C=1 → <strong style="color: #2E7D32;"><span class="arithmatex">\(m_5 = A\overline{B}C\)</span></strong>
</p>
<p style="color: #333; line-height: 1.85;">
b) Row 3 = <span class="arithmatex">\(011_2\)</span>, so A=0, B=1, C=1 → Maxterm uses complements: <strong style="color: #2E7D32;"><span class="arithmatex">\(M_3 = (A + \overline{B} + \overline{C})\)</span></strong>
</p>
<p style="color: #333; line-height: 1.85;">
c) <span class="arithmatex">\(\overline{A}BC\)</span>: A=0, B=1, C=1 → row 011 = 3 → <strong style="color: #2E7D32;"><span class="arithmatex">\(m_3\)</span></strong>
</p>
<p style="color: #333; line-height: 1.85; margin-bottom: 0;">
d) <span class="arithmatex">\((A + \overline{B} + C)\)</span>: complement values: A'=0, B=1, C'=0 → 010 = 2 → <strong style="color: #2E7D32;"><span class="arithmatex">\(M_2\)</span></strong>
</p>
</div>
</details>

</div>

---

<div style="background: #F8F6FF; border: 2px solid #D0C4FF; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,62,237,0.06);" markdown>

### Problem 2

Convert between minterm and maxterm notation for 3 variables (A, B, C):

a) $F = \Sigma m(0, 2, 5, 7)$ to maxterm form
b) $F = \Pi M(1, 3, 4, 6)$ to minterm form

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;">
a) <span class="arithmatex">\(F = \Sigma m(0, 2, 5, 7)\)</span> → Missing minterms: 1, 3, 4, 6
</p>
<p style="color: #2E7D32; font-weight: 700;">
<span class="arithmatex">\(F = \Pi M(1, 3, 4, 6)\)</span>
</p>
<p style="color: #333; line-height: 1.85;">
b) <span class="arithmatex">\(F = \Pi M(1, 3, 4, 6)\)</span> → Missing maxterms: 0, 2, 5, 7
</p>
<p style="color: #2E7D32; font-weight: 700;">
<span class="arithmatex">\(F = \Sigma m(0, 2, 5, 7)\)</span>
</p>
<p style="color: #555; font-style: italic; margin-bottom: 0;">
Note: The minterm indices of <span class="arithmatex">\(F\)</span> equal the maxterm indices of <span class="arithmatex">\(\overline{F}\)</span>
</p>
</div>
</details>

</div>

---

<div style="background: #F8F6FF; border: 2px solid #D0C4FF; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,62,237,0.06);" markdown>

### Problem 3

Given the truth table, express F in both minterm and maxterm forms:

| A | B | C | F |
|---|---|---|---|
| 0 | 0 | 0 | 1 |
| 0 | 0 | 1 | 0 |
| 0 | 1 | 0 | 1 |
| 0 | 1 | 1 | 1 |
| 1 | 0 | 0 | 0 |
| 1 | 0 | 1 | 0 |
| 1 | 1 | 0 | 1 |
| 1 | 1 | 1 | 0 |

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;">
F = 1 at rows: 0, 2, 3, 6
</p>
<p style="color: #333; font-weight: 700;">Minterm form (SOP):</p>
<p style="color: #333; line-height: 1.85;">
<span class="arithmatex">\(F = \Sigma m(0, 2, 3, 6) = \overline{A}\overline{B}\overline{C} + \overline{A}B\overline{C} + \overline{A}BC + AB\overline{C}\)</span>
</p>
<p style="color: #333; line-height: 1.85;">
F = 0 at rows: 1, 4, 5, 7
</p>
<p style="color: #333; font-weight: 700;">Maxterm form (POS):</p>
<p style="color: #333; line-height: 1.85; margin-bottom: 0;">
<span class="arithmatex">\(F = \Pi M(1, 4, 5, 7) = (A + B + \overline{C})(\overline{A} + B + C)(\overline{A} + B + \overline{C})(\overline{A} + \overline{B} + \overline{C})\)</span>
</p>
</div>
</details>

</div>

---

<div style="background: #F8F6FF; border: 2px solid #D0C4FF; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,62,237,0.06);" markdown>

### Problem 4

Expand the following to canonical SOP form:

$$F(A, B, C) = A + BC$$

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; font-weight: 700; margin-top: 0;">Method: Expand each term to include all variables.</p>
<p style="color: #333; line-height: 1.85;">
Term 1: <span class="arithmatex">\(A = A(B + \overline{B})(C + \overline{C}) = ABC + AB\overline{C} + A\overline{B}C + A\overline{B}\overline{C} = m_7 + m_6 + m_5 + m_4\)</span>
</p>
<p style="color: #333; line-height: 1.85;">
Term 2: <span class="arithmatex">\(BC = BC(A + \overline{A}) = ABC + \overline{A}BC = m_7 + m_3\)</span>
</p>
<p style="color: #333; line-height: 1.85;">
Combine (remove duplicates):
</p>
<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;">
<span class="arithmatex">\(F = \Sigma m(3, 4, 5, 6, 7) = \overline{A}BC + A\overline{B}\overline{C} + A\overline{B}C + AB\overline{C} + ABC\)</span>
</p>
</div>
</details>

</div>

---

<div style="background: #F8F6FF; border: 2px solid #D0C4FF; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,62,237,0.06);" markdown>

### Problem 5

Expand to canonical POS form:

$$F(A, B, C) = (A + B)(B + C)$$

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; font-weight: 700; margin-top: 0;">Method: Expand each term to include all variables.</p>
<p style="color: #333; line-height: 1.85;">
Term 1: <span class="arithmatex">\((A + B) = (A + B + C\overline{C}) = (A + B + C)(A + B + \overline{C}) = M_0 \cdot M_1\)</span>
</p>
<p style="color: #333; line-height: 1.85;">
Term 2: <span class="arithmatex">\((B + C) = (B + C + A\overline{A}) = (A + B + C)(\overline{A} + B + C) = M_0 \cdot M_4\)</span>
</p>
<p style="color: #333; line-height: 1.85;">
Combine (remove duplicates):
</p>
<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;">
<span class="arithmatex">\(F = \Pi M(0, 1, 4) = (A + B + C)(A + B + \overline{C})(\overline{A} + B + C)\)</span>
</p>
</div>
</details>

</div>

---

<h2 style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 1rem;">Section B: SOP and POS Forms (5 problems)</h2>

<div style="background: #F8F6FF; border: 2px solid #D0C4FF; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,62,237,0.06);" markdown>

### Problem 6

Convert the following SOP expression to POS:

$$F = AB + \overline{A}C + BC$$

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; font-weight: 700; margin-top: 0;">Step 1: Find the minterms</p>
<p style="color: #333; line-height: 1.85;">
<span class="arithmatex">\(AB\)</span>: <span class="arithmatex">\(m_6, m_7\)</span> (when A=1, B=1)<br>
<span class="arithmatex">\(\overline{A}C\)</span>: <span class="arithmatex">\(m_1, m_3\)</span> (when A=0, C=1)<br>
<span class="arithmatex">\(BC\)</span>: <span class="arithmatex">\(m_3, m_7\)</span> (when B=1, C=1)
</p>
<p style="color: #333; line-height: 1.85;">
Combined: <span class="arithmatex">\(F = \Sigma m(1, 3, 6, 7)\)</span>
</p>
<p style="color: #333; font-weight: 700;">Step 2: <span class="arithmatex">\(\overline{F} = \Sigma m(0, 2, 4, 5)\)</span> (missing minterms)</p>
<p style="color: #333; font-weight: 700;">Step 3: <span class="arithmatex">\(F = \Pi M(0, 2, 4, 5)\)</span></p>
<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;">
<span class="arithmatex">\(F = (A + B + C)(A + \overline{B} + C)(\overline{A} + B + C)(\overline{A} + B + \overline{C})\)</span>
</p>
</div>
</details>

</div>

---

<div style="background: #F8F6FF; border: 2px solid #D0C4FF; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,62,237,0.06);" markdown>

### Problem 7

Convert the following POS expression to SOP:

$$F = (A + B)(\overline{A} + C)(B + \overline{C})$$

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; font-weight: 700; margin-top: 0;">Method: Expand algebraically</p>
<p style="color: #333; line-height: 1.85;">
<span class="arithmatex">\((A + B)(\overline{A} + C) = A\overline{A} + AC + \overline{A}B + BC = AC + \overline{A}B + BC\)</span>
</p>
<p style="color: #333; line-height: 1.85;">
Then: <span class="arithmatex">\((AC + \overline{A}B + BC)(B + \overline{C})\)</span>
</p>
<p style="color: #333; line-height: 1.85;">
<span class="arithmatex">\(= ACB + AC\overline{C} + \overline{A}BB + \overline{A}B\overline{C} + BCB + BC\overline{C}\)</span><br>
<span class="arithmatex">\(= ABC + 0 + \overline{A}B + \overline{A}B\overline{C} + BC + 0\)</span><br>
<span class="arithmatex">\(= \overline{A}B + BC + ABC\)</span>
</p>
<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;">
Simplified: <span class="arithmatex">\(F = \overline{A}B + BC\)</span> (since <span class="arithmatex">\(ABC\)</span> is covered by <span class="arithmatex">\(BC\)</span>)
</p>
</div>
</details>

</div>

---

<div style="background: #F8F6FF; border: 2px solid #D0C4FF; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,62,237,0.06);" markdown>

### Problem 8

Find the complement of $F = \Sigma m(1, 3, 5, 7)$ using:

a) De Morgan's theorem
b) Missing minterms

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;">
<span class="arithmatex">\(F = \Sigma m(1, 3, 5, 7)\)</span> for <span class="arithmatex">\(F(A, B, C)\)</span>
</p>
<p style="color: #333; font-weight: 700;">a) De Morgan's method:</p>
<p style="color: #333; line-height: 1.85;">
<span class="arithmatex">\(\overline{F} = \overline{(m_1 + m_3 + m_5 + m_7)} = \overline{m_1} \cdot \overline{m_3} \cdot \overline{m_5} \cdot \overline{m_7} = M_1 \cdot M_3 \cdot M_5 \cdot M_7 = \Pi M(1, 3, 5, 7)\)</span>
</p>
<p style="color: #333; line-height: 1.85;">
In SOP: <span class="arithmatex">\(\overline{F} = \Sigma m(0, 2, 4, 6)\)</span>
</p>
<p style="color: #333; font-weight: 700;">b) Missing minterms method:</p>
<p style="color: #333; line-height: 1.85;">
All minterms: {0, 1, 2, 3, 4, 5, 6, 7}. <span class="arithmatex">\(F\)</span> has: {1, 3, 5, 7}. <span class="arithmatex">\(\overline{F}\)</span> has: {0, 2, 4, 6}
</p>
<p style="color: #2E7D32; font-weight: 700;">
<span class="arithmatex">\(\overline{F} = \Sigma m(0, 2, 4, 6) = \overline{A}\overline{B}\overline{C} + \overline{A}B\overline{C} + A\overline{B}\overline{C} + AB\overline{C}\)</span>
</p>
<p style="color: #555; font-style: italic; margin-bottom: 0;">
Note: <span class="arithmatex">\(F = C\)</span> and <span class="arithmatex">\(\overline{F} = \overline{C}\)</span>
</p>
</div>
</details>

</div>

---

<div style="background: #F8F6FF; border: 2px solid #D0C4FF; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,62,237,0.06);" markdown>

### Problem 9

Express $F$ and $\overline{F}$ in both SOP and POS forms:

$$F(A, B, C) = \Sigma m(0, 1, 4, 5)$$

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; font-weight: 700; margin-top: 0;">F in SOP:</p>
<p style="color: #333; line-height: 1.85;">
<span class="arithmatex">\(F = \Sigma m(0, 1, 4, 5) = \overline{A}\overline{B}\overline{C} + \overline{A}\overline{B}C + A\overline{B}\overline{C} + A\overline{B}C = \overline{B}\)</span>
</p>
<p style="color: #333; font-weight: 700;">F in POS:</p>
<p style="color: #333; line-height: 1.85;">
Missing: {2, 3, 6, 7} → <span class="arithmatex">\(F = \Pi M(2, 3, 6, 7)\)</span>
</p>
<p style="color: #333; line-height: 1.85;">
<span class="arithmatex">\(F = (A + \overline{B} + C)(A + \overline{B} + \overline{C})(\overline{A} + \overline{B} + C)(\overline{A} + \overline{B} + \overline{C})\)</span>
</p>
<p style="color: #333; font-weight: 700;"><span class="arithmatex">\(\overline{F}\)</span> in SOP:</p>
<p style="color: #333; line-height: 1.85;">
<span class="arithmatex">\(\overline{F} = \Sigma m(2, 3, 6, 7) = B\)</span>
</p>
<p style="color: #333; font-weight: 700;"><span class="arithmatex">\(\overline{F}\)</span> in POS:</p>
<p style="color: #333; line-height: 1.85; margin-bottom: 0;">
<span class="arithmatex">\(\overline{F} = \Pi M(0, 1, 4, 5)\)</span>
</p>
</div>
</details>

</div>

---

<div style="background: #F8F6FF; border: 2px solid #D0C4FF; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,62,237,0.06);" markdown>

### Problem 10

Given $F_1 = \Sigma m(0, 2, 4, 6)$ and $F_2 = \Sigma m(1, 3, 5, 6)$, find:

a) $F_1 + F_2$ (OR)
b) $F_1 \cdot F_2$ (AND)
c) $F_1 \oplus F_2$ (XOR)

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; font-weight: 700; margin-top: 0;">a) <span class="arithmatex">\(F_1 + F_2\)</span>: Union of minterms</p>
<p style="color: #333; line-height: 1.85;">
{0, 2, 4, 6} ∪ {1, 3, 5, 6} = {0, 1, 2, 3, 4, 5, 6}
</p>
<p style="color: #2E7D32; font-weight: 700;">
<span class="arithmatex">\(F_1 + F_2 = \Sigma m(0, 1, 2, 3, 4, 5, 6) = \overline{A} + \overline{B} + \overline{C}\)</span>
</p>
<p style="color: #333; font-weight: 700;">b) <span class="arithmatex">\(F_1 \cdot F_2\)</span>: Intersection of minterms</p>
<p style="color: #333; line-height: 1.85;">
{0, 2, 4, 6} ∩ {1, 3, 5, 6} = {6}
</p>
<p style="color: #2E7D32; font-weight: 700;">
<span class="arithmatex">\(F_1 \cdot F_2 = \Sigma m(6) = AB\overline{C}\)</span>
</p>
<p style="color: #333; font-weight: 700;">c) <span class="arithmatex">\(F_1 \oplus F_2\)</span>: Symmetric difference</p>
<p style="color: #333; line-height: 1.85;">
{0, 2, 4} ∪ {1, 3, 5} = {0, 1, 2, 3, 4, 5}
</p>
<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;">
<span class="arithmatex">\(F_1 \oplus F_2 = \Sigma m(0, 1, 2, 3, 4, 5)\)</span>
</p>
</div>
</details>

</div>

---

<h2 style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 1rem;">Section C: Shannon's Expansion (5 problems)</h2>

<div style="background: #F8F6FF; border: 2px solid #D0C4FF; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,62,237,0.06);" markdown>

### Problem 11

Apply Shannon's expansion to $F(A, B, C) = AB + BC + \overline{A}C$ with respect to variable A.

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;">
Shannon's expansion: <span class="arithmatex">\(F = A \cdot F(1,B,C) + \overline{A} \cdot F(0,B,C)\)</span>
</p>
<p style="color: #333; font-weight: 700;"><span class="arithmatex">\(F(1, B, C)\)</span>: Substitute A=1</p>
<p style="color: #333; line-height: 1.85;">
<span class="arithmatex">\(F = 1 \cdot B + BC + 0 \cdot C = B + BC = B\)</span>
</p>
<p style="color: #333; font-weight: 700;"><span class="arithmatex">\(F(0, B, C)\)</span>: Substitute A=0</p>
<p style="color: #333; line-height: 1.85;">
<span class="arithmatex">\(F = 0 \cdot B + BC + 1 \cdot C = BC + C = C\)</span>
</p>
<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;">
<span class="arithmatex">\(F = A \cdot B + \overline{A} \cdot C\)</span> (this is also the simplified form)
</p>
</div>
</details>

</div>

---

<div style="background: #F8F6FF; border: 2px solid #D0C4FF; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,62,237,0.06);" markdown>

### Problem 12

Use Shannon's expansion with respect to B for:

$$F(A, B, C) = \overline{A}\overline{B}C + AB\overline{C} + A\overline{B}C$$

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;">
<span class="arithmatex">\(F = B \cdot F(A,1,C) + \overline{B} \cdot F(A,0,C)\)</span>
</p>
<p style="color: #333; font-weight: 700;"><span class="arithmatex">\(F(A, 1, C)\)</span>: Substitute B=1</p>
<p style="color: #333; line-height: 1.85;">
<span class="arithmatex">\(F = \overline{A} \cdot 0 \cdot C + A \cdot 1 \cdot \overline{C} + A \cdot 0 \cdot C = A\overline{C}\)</span>
</p>
<p style="color: #333; font-weight: 700;"><span class="arithmatex">\(F(A, 0, C)\)</span>: Substitute B=0</p>
<p style="color: #333; line-height: 1.85;">
<span class="arithmatex">\(F = \overline{A} \cdot 1 \cdot C + A \cdot 0 \cdot \overline{C} + A \cdot 1 \cdot C = \overline{A}C + AC = C\)</span>
</p>
<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;">
<span class="arithmatex">\(F = B \cdot A\overline{C} + \overline{B} \cdot C = AB\overline{C} + \overline{B}C\)</span>
</p>
</div>
</details>

</div>

---

<div style="background: #F8F6FF; border: 2px solid #D0C4FF; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,62,237,0.06);" markdown>

### Problem 13

Find the positive and negative cofactors of F with respect to A:

$$F(A, B, C, D) = AB + CD + \overline{A}BD$$

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; font-weight: 700; margin-top: 0;">Positive cofactor <span class="arithmatex">\(F_A\)</span> (A=1):</p>
<p style="color: #333; line-height: 1.85;">
<span class="arithmatex">\(F(1, B, C, D) = 1 \cdot B + CD + 0 \cdot BD = B + CD\)</span>
</p>
<p style="color: #2E7D32; font-weight: 700;">
<span class="arithmatex">\(F_A = B + CD\)</span>
</p>
<p style="color: #333; font-weight: 700;">Negative cofactor <span class="arithmatex">\(F_{\overline{A}}\)</span> (A=0):</p>
<p style="color: #333; line-height: 1.85;">
<span class="arithmatex">\(F(0, B, C, D) = 0 \cdot B + CD + 1 \cdot BD = CD + BD = D(B + C)\)</span>
</p>
<p style="color: #2E7D32; font-weight: 700;">
<span class="arithmatex">\(F_{\overline{A}} = BD + CD = D(B + C)\)</span>
</p>
<p style="color: #555; font-style: italic; margin-bottom: 0;">
Verification: <span class="arithmatex">\(F = A(B + CD) + \overline{A}(BD + CD) = AB + ACD + \overline{A}BD + \overline{A}CD = AB + CD + \overline{A}BD\)</span> ✓
</p>
</div>
</details>

</div>

---

<div style="background: #F8F6FF; border: 2px solid #D0C4FF; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,62,237,0.06);" markdown>

### Problem 14

Recursively expand $F(A, B, C) = A \oplus B \oplus C$ using Shannon's expansion.

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; font-weight: 700; margin-top: 0;">Level 1 — Expand with respect to A:</p>
<p style="color: #333; line-height: 1.85;">
<span class="arithmatex">\(F = A \cdot F_A + \overline{A} \cdot F_{\overline{A}}\)</span><br>
<span class="arithmatex">\(F_A = 1 \oplus B \oplus C = \overline{(B \oplus C)}\)</span><br>
<span class="arithmatex">\(F_{\overline{A}} = 0 \oplus B \oplus C = B \oplus C\)</span>
</p>
<p style="color: #333; line-height: 1.85;">
<span class="arithmatex">\(F = A \cdot \overline{(B \oplus C)} + \overline{A} \cdot (B \oplus C)\)</span>
</p>
<p style="color: #333; font-weight: 700;">Level 2 — Expand <span class="arithmatex">\((B \oplus C)\)</span> with respect to B:</p>
<p style="color: #333; line-height: 1.85;">
<span class="arithmatex">\(B \oplus C = B \cdot \overline{C} + \overline{B} \cdot C\)</span>
</p>
<p style="color: #333; font-weight: 700;">Complete expansion:</p>
<p style="color: #333; line-height: 1.85;">
<span class="arithmatex">\(F = A(BC + \overline{B}\overline{C}) + \overline{A}(\overline{B}C + B\overline{C})\)</span><br>
<span class="arithmatex">\(= ABC + A\overline{B}\overline{C} + \overline{A}\overline{B}C + \overline{A}B\overline{C}\)</span>
</p>
<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;">
<span class="arithmatex">\(F = \Sigma m(1, 2, 4, 7)\)</span> (odd parity function)
</p>
</div>
</details>

</div>

---

<div style="background: #F8F6FF; border: 2px solid #D0C4FF; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,62,237,0.06);" markdown>

### Problem 15

Use cofactors to implement $F(A, B, C) = \Sigma m(1, 2, 4, 7)$ using a 2-to-1 MUX with A as the select input.

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;">
For a 2-to-1 MUX with select A: when A=0, output = <span class="arithmatex">\(I_0\)</span>; when A=1, output = <span class="arithmatex">\(I_1\)</span>
</p>
<p style="color: #333; line-height: 1.85;">
Find cofactors from minterm indices:<br>
<span class="arithmatex">\(m_1 = \overline{A}\overline{B}C\)</span> (A=0), <span class="arithmatex">\(m_2 = \overline{A}B\overline{C}\)</span> (A=0)<br>
<span class="arithmatex">\(m_4 = A\overline{B}\overline{C}\)</span> (A=1), <span class="arithmatex">\(m_7 = ABC\)</span> (A=1)
</p>
<p style="color: #333; line-height: 1.85;">
<strong><span class="arithmatex">\(F_{\overline{A}}\)</span> (A=0):</strong> <span class="arithmatex">\(m_1, m_2\)</span> → <span class="arithmatex">\(F_{\overline{A}} = \overline{B}C + B\overline{C} = B \oplus C\)</span>
</p>
<p style="color: #333; line-height: 1.85;">
<strong><span class="arithmatex">\(F_A\)</span> (A=1):</strong> <span class="arithmatex">\(m_4, m_7\)</span> → <span class="arithmatex">\(F_A = \overline{B}\overline{C} + BC = \overline{(B \oplus C)}\)</span>
</p>
<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;">
MUX connections: <span class="arithmatex">\(I_0 = B \oplus C\)</span> (when A=0), <span class="arithmatex">\(I_1 = \overline{(B \oplus C)}\)</span> (when A=1), <span class="arithmatex">\(S = A\)</span>
</p>
</div>
</details>

</div>

---

<h2 style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 1rem;">Section D: Function Implementation (5 problems)</h2>

<div style="background: #F8F6FF; border: 2px solid #D0C4FF; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,62,237,0.06);" markdown>

### Problem 16

Implement $F = \Sigma m(0, 1, 4, 5, 6)$ using:

a) Only AND and OR gates (from SOP)
b) Only NAND gates

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; font-weight: 700; margin-top: 0;">a) SOP implementation:</p>
<p style="color: #333; line-height: 1.85;">
<span class="arithmatex">\(F = m_0 + m_1 + m_4 + m_5 + m_6\)</span><br>
<span class="arithmatex">\(= \overline{A}\overline{B}\overline{C} + \overline{A}\overline{B}C + A\overline{B}\overline{C} + A\overline{B}C + AB\overline{C}\)</span><br>
<span class="arithmatex">\(= \overline{A}\overline{B} + A\overline{B} + AB\overline{C} = \overline{B} + AB\overline{C}\)</span>
</p>
<p style="color: #2E7D32; font-weight: 700;">
<span class="arithmatex">\(F = \overline{B} + AB\overline{C}\)</span>
</p>
<p style="color: #333; line-height: 1.85;">
Gates needed: 1 AND (<span class="arithmatex">\(AB\overline{C}\)</span>), 1 NOT (<span class="arithmatex">\(\overline{B}\)</span>), 1 OR
</p>
<p style="color: #333; font-weight: 700;">b) NAND implementation:</p>
<p style="color: #333; line-height: 1.85; margin-bottom: 0;">
<span class="arithmatex">\(F = \overline{B} + AB\overline{C}\)</span> → use NAND-NAND structure: NAND(<span class="arithmatex">\(B\)</span>, NAND(<span class="arithmatex">\(A, B, \overline{C}\)</span>))
</p>
</div>
</details>

</div>

---

<div style="background: #F8F6FF; border: 2px solid #D0C4FF; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,62,237,0.06);" markdown>

### Problem 17

Implement $F = \Pi M(0, 3, 5, 6)$ using:

a) Only AND and OR gates (from POS)
b) Only NOR gates

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; font-weight: 700; margin-top: 0;">a) POS implementation:</p>
<p style="color: #333; line-height: 1.85;">
<span class="arithmatex">\(F = M_0 \cdot M_3 \cdot M_5 \cdot M_6\)</span><br>
<span class="arithmatex">\(= (A+B+C)(A+\overline{B}+\overline{C})(\overline{A}+B+\overline{C})(\overline{A}+\overline{B}+C)\)</span>
</p>
<p style="color: #333; line-height: 1.85;">
Requires 4 three-input OR gates and 1 four-input AND gate.
</p>
<p style="color: #333; font-weight: 700;">b) NOR implementation:</p>
<p style="color: #333; line-height: 1.85; margin-bottom: 0;">
POS naturally maps to NOR-NOR: each maxterm (OR) becomes NOR-NOR, and the AND of maxterms becomes NOR of NORed terms.
</p>
</div>
</details>

</div>

---

<div style="background: #F8F6FF; border: 2px solid #D0C4FF; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,62,237,0.06);" markdown>

### Problem 18

Design a circuit for $F(A, B, C, D) = \Sigma m(0, 1, 2, 3, 8, 9, 10, 11)$ using a decoder.

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;">
First, identify the pattern: minterms 0–3 have A=0, B=0; minterms 8–11 have A=1, B=0.
</p>
<p style="color: #2E7D32; font-weight: 700;">
Simplified: <span class="arithmatex">\(F = \overline{B}\)</span> (F=1 whenever B=0)
</p>
<p style="color: #333; line-height: 1.85;">
Using decoder approach: use a 4-to-16 decoder (or cascade two 3-to-8 decoders) and OR outputs 0, 1, 2, 3, 8, 9, 10, 11.
</p>
<p style="color: #333; line-height: 1.85; margin-bottom: 0;">
Simplest implementation: just use <span class="arithmatex">\(F = \overline{B}\)</span> (one inverter)
</p>
</div>
</details>

</div>

---

<div style="background: #F8F6FF; border: 2px solid #D0C4FF; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,62,237,0.06);" markdown>

### Problem 19

Implement $F(A, B, C) = \Sigma m(1, 2, 4, 7)$ using an 8-to-1 multiplexer.

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;">
For 8-to-1 MUX with 3 select lines (A, B, C), connect inputs based on minterm values:
</p>
<table style="width: 100%; border-collapse: collapse; margin: 12px 0;">
<tr style="background: #c8e6c9;"><th style="padding: 8px; border: 1px solid #81C784; text-align: left;">Input</th><th style="padding: 8px; border: 1px solid #81C784; text-align: left;">Binary</th><th style="padding: 8px; border: 1px solid #81C784; text-align: left;">F</th><th style="padding: 8px; border: 1px solid #81C784; text-align: left;">Connect to</th></tr>
<tr><td style="padding: 8px; border: 1px solid #81C784;"><span class="arithmatex">\(I_0\)</span></td><td style="padding: 8px; border: 1px solid #81C784;">000</td><td style="padding: 8px; border: 1px solid #81C784;">0</td><td style="padding: 8px; border: 1px solid #81C784;"><strong>0</strong></td></tr>
<tr><td style="padding: 8px; border: 1px solid #81C784;"><span class="arithmatex">\(I_1\)</span></td><td style="padding: 8px; border: 1px solid #81C784;">001</td><td style="padding: 8px; border: 1px solid #81C784;">1</td><td style="padding: 8px; border: 1px solid #81C784;"><strong>1</strong></td></tr>
<tr><td style="padding: 8px; border: 1px solid #81C784;"><span class="arithmatex">\(I_2\)</span></td><td style="padding: 8px; border: 1px solid #81C784;">010</td><td style="padding: 8px; border: 1px solid #81C784;">1</td><td style="padding: 8px; border: 1px solid #81C784;"><strong>1</strong></td></tr>
<tr><td style="padding: 8px; border: 1px solid #81C784;"><span class="arithmatex">\(I_3\)</span></td><td style="padding: 8px; border: 1px solid #81C784;">011</td><td style="padding: 8px; border: 1px solid #81C784;">0</td><td style="padding: 8px; border: 1px solid #81C784;"><strong>0</strong></td></tr>
<tr><td style="padding: 8px; border: 1px solid #81C784;"><span class="arithmatex">\(I_4\)</span></td><td style="padding: 8px; border: 1px solid #81C784;">100</td><td style="padding: 8px; border: 1px solid #81C784;">1</td><td style="padding: 8px; border: 1px solid #81C784;"><strong>1</strong></td></tr>
<tr><td style="padding: 8px; border: 1px solid #81C784;"><span class="arithmatex">\(I_5\)</span></td><td style="padding: 8px; border: 1px solid #81C784;">101</td><td style="padding: 8px; border: 1px solid #81C784;">0</td><td style="padding: 8px; border: 1px solid #81C784;"><strong>0</strong></td></tr>
<tr><td style="padding: 8px; border: 1px solid #81C784;"><span class="arithmatex">\(I_6\)</span></td><td style="padding: 8px; border: 1px solid #81C784;">110</td><td style="padding: 8px; border: 1px solid #81C784;">0</td><td style="padding: 8px; border: 1px solid #81C784;"><strong>0</strong></td></tr>
<tr><td style="padding: 8px; border: 1px solid #81C784;"><span class="arithmatex">\(I_7\)</span></td><td style="padding: 8px; border: 1px solid #81C784;">111</td><td style="padding: 8px; border: 1px solid #81C784;">1</td><td style="padding: 8px; border: 1px solid #81C784;"><strong>1</strong></td></tr>
</table>
<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;">
Select lines: <span class="arithmatex">\(S_2 = A\)</span>, <span class="arithmatex">\(S_1 = B\)</span>, <span class="arithmatex">\(S_0 = C\)</span>
</p>
</div>
</details>

</div>

---

<div style="background: #F8F6FF; border: 2px solid #D0C4FF; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,62,237,0.06);" markdown>

### Problem 20

Using a 4-to-1 MUX and external logic, implement:

$$F(A, B, C) = \Sigma m(0, 2, 3, 5, 7)$$

Use A and B as select lines.

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;">Group minterms by A, B values:</p>
<table style="width: 100%; border-collapse: collapse; margin: 12px 0;">
<tr style="background: #c8e6c9;"><th style="padding: 8px; border: 1px solid #81C784;">A</th><th style="padding: 8px; border: 1px solid #81C784;">B</th><th style="padding: 8px; border: 1px solid #81C784;">C values where F=1</th><th style="padding: 8px; border: 1px solid #81C784;">MUX input</th></tr>
<tr><td style="padding: 8px; border: 1px solid #81C784;">0</td><td style="padding: 8px; border: 1px solid #81C784;">0</td><td style="padding: 8px; border: 1px solid #81C784;">C=0 (<span class="arithmatex">\(m_0\)</span>)</td><td style="padding: 8px; border: 1px solid #81C784;"><span class="arithmatex">\(\overline{C}\)</span></td></tr>
<tr><td style="padding: 8px; border: 1px solid #81C784;">0</td><td style="padding: 8px; border: 1px solid #81C784;">1</td><td style="padding: 8px; border: 1px solid #81C784;">C=0,1 (<span class="arithmatex">\(m_2, m_3\)</span>)</td><td style="padding: 8px; border: 1px solid #81C784;"><strong>1</strong></td></tr>
<tr><td style="padding: 8px; border: 1px solid #81C784;">1</td><td style="padding: 8px; border: 1px solid #81C784;">0</td><td style="padding: 8px; border: 1px solid #81C784;">C=1 (<span class="arithmatex">\(m_5\)</span>)</td><td style="padding: 8px; border: 1px solid #81C784;"><span class="arithmatex">\(C\)</span></td></tr>
<tr><td style="padding: 8px; border: 1px solid #81C784;">1</td><td style="padding: 8px; border: 1px solid #81C784;">1</td><td style="padding: 8px; border: 1px solid #81C784;">C=1 (<span class="arithmatex">\(m_7\)</span>)</td><td style="padding: 8px; border: 1px solid #81C784;"><span class="arithmatex">\(C\)</span></td></tr>
</table>
<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;">
MUX connections: <span class="arithmatex">\(I_0 = \overline{C}\)</span>, <span class="arithmatex">\(I_1 = 1\)</span>, <span class="arithmatex">\(I_2 = C\)</span>, <span class="arithmatex">\(I_3 = C\)</span>, <span class="arithmatex">\(S_1 = A\)</span>, <span class="arithmatex">\(S_0 = B\)</span>
</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #5A3EED; font-weight: 700; font-size: 1.1rem; margin-top: 0; margin-bottom: 14px;">Problems Summary</p>

| Section | Topics Covered | Problem Count |
|:--------|:---------------|:--------------|
| A | Minterms / Maxterms | 5 |
| B | SOP and POS Forms | 5 |
| C | Shannon's Expansion | 5 |
| D | Function Implementation | 5 |
| **Total** | | **20** |

</div>

</div>
