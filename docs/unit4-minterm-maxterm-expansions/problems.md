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
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

a) Row 5 = $101_2$, so A=1, B=0, C=1 → **$m_5 = A\overline{B}C$**

b) Row 3 = $011_2$, so A=0, B=1, C=1 → Maxterm uses complements: **$M_3 = (A + \overline{B} + \overline{C})$**

c) $\overline{A}BC$: A=0, B=1, C=1 → row 011 = 3 → **$m_3$**

d) $(A + \overline{B} + C)$: complement values: A'=0, B=1, C'=0 → 010 = 2 → **$M_2$**

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
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

a) $F = \Sigma m(0, 2, 5, 7)$ → Missing minterms: 1, 3, 4, 6

**$F = \Pi M(1, 3, 4, 6)$**

b) $F = \Pi M(1, 3, 4, 6)$ → Missing maxterms: 0, 2, 5, 7

**$F = \Sigma m(0, 2, 5, 7)$**

Note: The minterm indices of $F$ equal the maxterm indices of $\overline{F}$

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
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

F = 1 at rows: 0, 2, 3, 6

**Minterm form (SOP):**

$F = \Sigma m(0, 2, 3, 6) = \overline{A}\overline{B}\overline{C} + \overline{A}B\overline{C} + \overline{A}BC + AB\overline{C}$

F = 0 at rows: 1, 4, 5, 7

**Maxterm form (POS):**

$F = \Pi M(1, 4, 5, 7) = (A + B + \overline{C})(\overline{A} + B + C)(\overline{A} + B + \overline{C})(\overline{A} + \overline{B} + \overline{C})$

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
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

**Method:** Expand each term to include all variables.

Term 1: $A = A(B + \overline{B})(C + \overline{C}) = ABC + AB\overline{C} + A\overline{B}C + A\overline{B}\overline{C} = m_7 + m_6 + m_5 + m_4$

Term 2: $BC = BC(A + \overline{A}) = ABC + \overline{A}BC = m_7 + m_3$

Combine (remove duplicates):

$$F = \Sigma m(3, 4, 5, 6, 7) = \overline{A}BC + A\overline{B}\overline{C} + A\overline{B}C + AB\overline{C} + ABC$$

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
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

**Method:** Expand each term to include all variables.

Term 1: $(A + B) = (A + B + C\overline{C}) = (A + B + C)(A + B + \overline{C}) = M_0 \cdot M_1$

Term 2: $(B + C) = (B + C + A\overline{A}) = (A + B + C)(\overline{A} + B + C) = M_0 \cdot M_4$

Combine (remove duplicates):

$$F = \Pi M(0, 1, 4) = (A + B + C)(A + B + \overline{C})(\overline{A} + B + C)$$

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
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

**Step 1:** Find the minterms

- $AB$: $m_6, m_7$ (when A=1, B=1)
- $\overline{A}C$: $m_1, m_3$ (when A=0, C=1)
- $BC$: $m_3, m_7$ (when B=1, C=1)

Combined: $F = \Sigma m(1, 3, 6, 7)$

**Step 2:** $\overline{F} = \Sigma m(0, 2, 4, 5)$ (missing minterms)

**Step 3:** $F = \Pi M(0, 2, 4, 5)$

$$F = (A + B + C)(A + \overline{B} + C)(\overline{A} + B + C)(\overline{A} + B + \overline{C})$$

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
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

**Method:** Expand algebraically

$(A + B)(\overline{A} + C) = A\overline{A} + AC + \overline{A}B + BC = AC + \overline{A}B + BC$

Then: $(AC + \overline{A}B + BC)(B + \overline{C})$

$= ACB + AC\overline{C} + \overline{A}BB + \overline{A}B\overline{C} + BCB + BC\overline{C}$

$= ABC + 0 + \overline{A}B + \overline{A}B\overline{C} + BC + 0$

$= \overline{A}B + BC + ABC$

Simplified: **$F = \overline{A}B + BC$** (since $ABC$ is covered by $BC$ when B=1, C=1)

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
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

$F = \Sigma m(1, 3, 5, 7)$ for $F(A, B, C)$

**a) De Morgan's method:**

$\overline{F} = \overline{(m_1 + m_3 + m_5 + m_7)} = \overline{m_1} \cdot \overline{m_3} \cdot \overline{m_5} \cdot \overline{m_7} = M_1 \cdot M_3 \cdot M_5 \cdot M_7 = \Pi M(1, 3, 5, 7)$

In SOP: $\overline{F} = \Sigma m(0, 2, 4, 6)$

**b) Missing minterms method:**

All minterms: {0, 1, 2, 3, 4, 5, 6, 7}. $F$ has: {1, 3, 5, 7}. $\overline{F}$ has: **{0, 2, 4, 6}**

$$\overline{F} = \Sigma m(0, 2, 4, 6) = \overline{A}\overline{B}\overline{C} + \overline{A}B\overline{C} + A\overline{B}\overline{C} + AB\overline{C}$$

Note: $F = C$ and $\overline{F} = \overline{C}$

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
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

**F in SOP:** $F = \Sigma m(0, 1, 4, 5) = \overline{A}\overline{B}\overline{C} + \overline{A}\overline{B}C + A\overline{B}\overline{C} + A\overline{B}C = \overline{B}$

**F in POS:** Missing: {2, 3, 6, 7} → $F = \Pi M(2, 3, 6, 7)$

$F = (A + \overline{B} + C)(A + \overline{B} + \overline{C})(\overline{A} + \overline{B} + C)(\overline{A} + \overline{B} + \overline{C})$

**$\overline{F}$ in SOP:** $\overline{F} = \Sigma m(2, 3, 6, 7) = B$

**$\overline{F}$ in POS:** $\overline{F} = \Pi M(0, 1, 4, 5)$

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
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

**a) $F_1 + F_2$:** Union of minterms

$\{0, 2, 4, 6\} \cup \{1, 3, 5, 6\} = \{0, 1, 2, 3, 4, 5, 6\}$

$F_1 + F_2 = \Sigma m(0, 1, 2, 3, 4, 5, 6) = \overline{m_7} = \overline{A} + \overline{B} + \overline{C}$

**b) $F_1 \cdot F_2$:** Intersection of minterms

$\{0, 2, 4, 6\} \cap \{1, 3, 5, 6\} = \{6\}$

$F_1 \cdot F_2 = \Sigma m(6) = AB\overline{C}$

**c) $F_1 \oplus F_2$:** Symmetric difference (in one but not both)

$\{0, 2, 4\} \cup \{1, 3, 5\} = \{0, 1, 2, 3, 4, 5\}$

$F_1 \oplus F_2 = \Sigma m(0, 1, 2, 3, 4, 5)$

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
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

Shannon's expansion: $F = A \cdot F(1,B,C) + \overline{A} \cdot F(0,B,C)$

**$F(1, B, C)$:** Substitute A=1

$F = 1 \cdot B + BC + 0 \cdot C = B + BC = B$

**$F(0, B, C)$:** Substitute A=0

$F = 0 \cdot B + BC + 1 \cdot C = BC + C = C$

$$F = A \cdot B + \overline{A} \cdot C$$

(This is also the simplified form)

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
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

$F = B \cdot F(A,1,C) + \overline{B} \cdot F(A,0,C)$

**$F(A, 1, C)$:** Substitute B=1

$F = \overline{A} \cdot 0 \cdot C + A \cdot 1 \cdot \overline{C} + A \cdot 0 \cdot C = A\overline{C}$

**$F(A, 0, C)$:** Substitute B=0

$F = \overline{A} \cdot 1 \cdot C + A \cdot 0 \cdot \overline{C} + A \cdot 1 \cdot C = \overline{A}C + AC = C$

$$F = B \cdot A\overline{C} + \overline{B} \cdot C = AB\overline{C} + \overline{B}C$$

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
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

**Positive cofactor $F_A$ (A=1):**

$F(1, B, C, D) = 1 \cdot B + CD + 0 \cdot BD = B + CD$

$$F_A = B + CD$$

**Negative cofactor $F_{\overline{A}}$ (A=0):**

$F(0, B, C, D) = 0 \cdot B + CD + 1 \cdot BD = CD + BD = D(B + C)$

$$F_{\overline{A}} = BD + CD = D(B + C)$$

**Verification:** $F = A \cdot F_A + \overline{A} \cdot F_{\overline{A}} = A(B + CD) + \overline{A}(BD + CD) = AB + ACD + \overline{A}BD + \overline{A}CD = AB + CD + \overline{A}BD$ ✓

</div>
</details>

</div>

---

<div style="background: #F8F6FF; border: 2px solid #D0C4FF; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,62,237,0.06);" markdown>

### Problem 14

Recursively expand $F(A, B, C) = A \oplus B \oplus C$ using Shannon's expansion.

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

**Level 1 — Expand with respect to A:**

$F = A \cdot F_A + \overline{A} \cdot F_{\overline{A}}$

$F_A = 1 \oplus B \oplus C = (B \oplus C)' = \overline{B \oplus C}$

$F_{\overline{A}} = 0 \oplus B \oplus C = B \oplus C$

$F = A \cdot \overline{(B \oplus C)} + \overline{A} \cdot (B \oplus C)$

**Level 2 — Expand $(B \oplus C)$ with respect to B:**

$B \oplus C = B \cdot \overline{C} + \overline{B} \cdot C$

**Complete expansion:**

$F = A(BC + \overline{B}\overline{C}) + \overline{A}(\overline{B}C + B\overline{C})$

$= ABC + A\overline{B}\overline{C} + \overline{A}\overline{B}C + \overline{A}B\overline{C}$

$$F = \Sigma m(1, 2, 4, 7) \quad \text{(odd parity function)}$$

</div>
</details>

</div>

---

<div style="background: #F8F6FF; border: 2px solid #D0C4FF; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,62,237,0.06);" markdown>

### Problem 15

Use cofactors to implement $F(A, B, C) = \Sigma m(1, 2, 4, 7)$ using a 2-to-1 MUX with A as the select input.

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

For a 2-to-1 MUX with select A: when A=0, output = $I_0$; when A=1, output = $I_1$

Find cofactors from minterm indices:

- $m_1 = \overline{A}\overline{B}C$ (A=0), $m_2 = \overline{A}B\overline{C}$ (A=0)
- $m_4 = A\overline{B}\overline{C}$ (A=1), $m_7 = ABC$ (A=1)

**$F_{\overline{A}}$ (A=0):** $m_1, m_2$ → $F_{\overline{A}} = \overline{B}C + B\overline{C} = B \oplus C$

**$F_A$ (A=1):** $m_4, m_7$ → $F_A = \overline{B}\overline{C} + BC = \overline{(B \oplus C)}$

MUX connections:

- **$I_0 = B \oplus C$** (when A=0)
- **$I_1 = \overline{(B \oplus C)}$** (when A=1)
- **$S = A$**

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
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

**a) SOP implementation:**

$F = m_0 + m_1 + m_4 + m_5 + m_6$

$= \overline{A}\overline{B}\overline{C} + \overline{A}\overline{B}C + A\overline{B}\overline{C} + A\overline{B}C + AB\overline{C}$

$= \overline{A}\overline{B} + A\overline{B} + AB\overline{C} = \overline{B} + AB\overline{C}$

$$F = \overline{B} + AB\overline{C}$$

Gates needed: 1 AND ($AB\overline{C}$), 1 NOT ($\overline{B}$), 1 OR

**b) NAND implementation:**

$F = \overline{B} + AB\overline{C}$ → use NAND-NAND structure

$F = \overline{\overline{(\overline{B} + AB\overline{C})}} = \overline{B \cdot \overline{AB\overline{C}}} = \overline{B \cdot (AB\overline{C})'}$

Using NAND gates: NAND($B$, NAND($A, B, \overline{C}$))

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
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

**a) POS implementation:**

$F = M_0 \cdot M_3 \cdot M_5 \cdot M_6$

$= (A+B+C)(A+\overline{B}+\overline{C})(\overline{A}+B+\overline{C})(\overline{A}+\overline{B}+C)$

This requires 4 three-input OR gates and 1 four-input AND gate.

**b) NOR implementation:**

POS naturally maps to NOR-NOR: each maxterm (OR) becomes NOR-NOR, and the AND of maxterms becomes NOR of NORed terms.

</div>
</details>

</div>

---

<div style="background: #F8F6FF; border: 2px solid #D0C4FF; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,62,237,0.06);" markdown>

### Problem 18

Design a circuit for $F(A, B, C, D) = \Sigma m(0, 1, 2, 3, 8, 9, 10, 11)$ using a decoder.

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

First, identify the pattern: minterms 0–3 have A=0, B=0; minterms 8–11 have A=1, B=0.

Simplified: **$F = \overline{B}$** (F=1 whenever B=0)

Using decoder approach: use a 4-to-16 decoder (or cascade two 3-to-8 decoders) and OR outputs 0, 1, 2, 3, 8, 9, 10, 11.

Simplest implementation: just use **$F = \overline{B}$** (one inverter)

</div>
</details>

</div>

---

<div style="background: #F8F6FF; border: 2px solid #D0C4FF; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,62,237,0.06);" markdown>

### Problem 19

Implement $F(A, B, C) = \Sigma m(1, 2, 4, 7)$ using an 8-to-1 multiplexer.

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

For 8-to-1 MUX with 3 select lines (A, B, C), connect inputs based on minterm values:

| Input | Minterm | Binary | F | Connect to |
|:------|:--------|:-------|:--|:-----------|
| $I_0$ | $m_0 = 000$ | 000 | 0 | **0** |
| $I_1$ | $m_1 = 001$ | 001 | 1 | **1** |
| $I_2$ | $m_2 = 010$ | 010 | 1 | **1** |
| $I_3$ | $m_3 = 011$ | 011 | 0 | **0** |
| $I_4$ | $m_4 = 100$ | 100 | 1 | **1** |
| $I_5$ | $m_5 = 101$ | 101 | 0 | **0** |
| $I_6$ | $m_6 = 110$ | 110 | 0 | **0** |
| $I_7$ | $m_7 = 111$ | 111 | 1 | **1** |

MUX inputs: $I_7 I_6 I_5 I_4 I_3 I_2 I_1 I_0 = 10010110$

Select lines: $S_2 = A$, $S_1 = B$, $S_0 = C$

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
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

Group minterms by A, B values:

| A | B | C values where F=1 | MUX input |
|:--|:--|:-------------------|:----------|
| 0 | 0 | C=0 ($m_0$) | $\overline{C}$ |
| 0 | 1 | C=0, C=1 ($m_2, m_3$) | **1** |
| 1 | 0 | C=1 ($m_5$) | $C$ |
| 1 | 1 | C=1 ($m_7$) | $C$ |

MUX connections:

- **$I_0 = \overline{C}$** (AB=00)
- **$I_1 = 1$** (AB=01)
- **$I_2 = C$** (AB=10)
- **$I_3 = C$** (AB=11)
- **$S_1 = A$, $S_0 = B$**

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
