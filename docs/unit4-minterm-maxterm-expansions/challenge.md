---
title: Unit 4 Challenge - Minterm & Maxterm Expansions
description: Challenge problems for minterm and maxterm expansions — answers only, no solutions
---

<div class="problems-styled" markdown>

<h1 style="color: #5A3EED !important; border-bottom: 3px solid #5A3EED; padding-bottom: 0.4rem; font-weight: 800;">Challenge Problems: Minterm & Maxterm Expansions</h1>

<p style="color: #555; line-height: 1.85; font-size: 1.05rem; margin-bottom: 2rem;">
These challenge problems test deeper understanding. Only final answers are provided — work through each problem on your own.
</p>

---

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);" markdown>

<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Challenge 1: Convert Between Minterm and Maxterm List Forms</p>

A function of four variables ($A$, $B$, $C$, $D$) is defined as:

$$F(A, B, C, D) = \sum m(1, 3, 5, 7, 9, 11, 13, 15)$$

Express $F$ in maxterm list form $\prod M(\ldots)$ and identify the pattern in the function.

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.75; margin-top: 0;">

$F(A, B, C, D) = \prod M(0, 2, 4, 6, 8, 10, 12, 14)$

</p>
<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;">
Pattern: $F = D$ — the function equals 1 exactly when the least significant bit $D = 1$ (all odd minterms).
</p>
</div>
</details>

</div>

---

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);" markdown>

<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Challenge 2: Expand a Complex Expression to Canonical SOP</p>

Expand the following expression into canonical sum-of-minterms form for variables $A$, $B$, $C$, $D$:

$$F = A\overline{C} + \overline{B}\,D + \overline{A}\,B\,C$$

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

Expansion of each term:

- $A\overline{C}$: $A=1, C=0$, $B$ and $D$ free → $m(8, 9, 12, 13)$
- $\overline{B}\,D$: $B=0, D=1$, $A$ and $C$ free → $m(1, 3, 9, 11)$
- $\overline{A}\,BC$: $A=0, B=1, C=1$, $D$ free → $m(6, 7)$

Union: $F = \sum m(1, 3, 6, 7, 8, 9, 11, 12, 13)$

</div>
</details>

</div>

---

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);" markdown>

<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Challenge 3: Shannon Decomposition Application</p>

Given the function $F(A, B, C, D) = \sum m(0, 1, 4, 5, 6, 7, 14, 15)$, apply Shannon decomposition about variable $A$ to express $F$ in the form:

$$F = \overline{A} \cdot F_0 + A \cdot F_1$$

where $F_0 = F|_{A=0}$ and $F_1 = F|_{A=1}$. Give both cofactors as simplified expressions.

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

**Cofactor $F_0 = F|_{A=0}$:** Minterms with $A=0$: $m(0, 1, 4, 5, 6, 7)$ → as 3-variable function of $B, C, D$: $m_3(0, 1, 4, 5, 6, 7)$

Simplified: $F_0 = \overline{B} + C$

**Cofactor $F_1 = F|_{A=1}$:** Minterms with $A=1$: $m(14, 15)$ → as 3-variable function: indices $6, 7$ → $m_3(6, 7)$

Simplified: $F_1 = BC$

**Final decomposition:** $F = \overline{A}(\overline{B} + C) + A \cdot BC$

</div>
</details>

</div>

---

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);" markdown>

<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Challenge 4: POS-to-SOP Conversion via Complement</p>

A function is given in POS form:

$$F(A, B, C) = (A + B + C)(A + \overline{B} + C)(\overline{A} + B + \overline{C})$$

Find $\overline{F}$ in SOP form, then use it to derive $F$ in SOP form.

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

The maxterms present: $(A + B + C) = M_0$, $(A + \overline{B} + C) = M_2$, $(\overline{A} + B + \overline{C}) = M_5$

So $F = \prod M(0, 2, 5)$

$\overline{F} = \sum m(0, 2, 5) = \overline{A}\,\overline{B}\,\overline{C} + \overline{A}\,B\,\overline{C} + A\overline{B}\,C$

$F = \sum m(1, 3, 4, 6, 7)$

Simplified SOP: $F = \overline{A}\,C + A\overline{C} + AB$

</div>
</details>

</div>

---

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);" markdown>

<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Challenge 5: Find the Function from a Minterm/Maxterm List Pair</p>

A function of three variables satisfies both of these conditions simultaneously:

- $F(A, B, C) + G(A, B, C) = \sum m(0, 1, 2, 3, 5, 6, 7)$ (the OR of $F$ and $G$)
- $F(A, B, C) \cdot G(A, B, C) = \sum m(1, 5, 7)$ (the AND of $F$ and $G$)

If $F = \sum m(1, 3, 5, 7)$, find $G$ as a minterm list and simplified expression.

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

Since $F \cdot G = \sum m(1, 5, 7)$, $G$ must include minterms $\{1, 5, 7\}$.

Since $F + G = \sum m(0, 1, 2, 3, 5, 6, 7)$, every minterm in this set must be in $F$ or $G$ (or both).

$F = \{1, 3, 5, 7\}$. Minterms in $F + G$ but not in $F$: $\{0, 2, 6\}$ — these must be in $G$.

$G$ cannot include minterm 3 (it's in $F$, so $F \cdot G$ would include 3 — but $F \cdot G$ does NOT include 3).

Minterm 4 is not in $F + G$, so $G$ cannot include 4.

$$G = \sum m(0, 1, 2, 5, 6, 7)$$

Simplified: $G = \overline{B}\,\overline{C} + \overline{A}\,\overline{B} + AB + BC$

</div>
</details>

</div>

</div>
