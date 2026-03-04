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
<span class="arithmatex">\(F(A, B, C, D) = \prod M(0, 2, 4, 6, 8, 10, 12, 14)\)</span>
</p>
<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;">
Pattern: <span class="arithmatex">\(F = D\)</span> — the function equals 1 exactly when the least significant bit <span class="arithmatex">\(D = 1\)</span> (all odd minterms).
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
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;">
Expansion of each term:
</p>
<p style="color: #333; line-height: 1.85;">
<span class="arithmatex">\(A\overline{C}\)</span>: A=1, C=0, B and D free → <span class="arithmatex">\(m(8, 9, 12, 13)\)</span><br>
<span class="arithmatex">\(\overline{B}\,D\)</span>: B=0, D=1, A and C free → <span class="arithmatex">\(m(1, 3, 9, 11)\)</span><br>
<span class="arithmatex">\(\overline{A}\,BC\)</span>: A=0, B=1, C=1, D free → <span class="arithmatex">\(m(6, 7)\)</span>
</p>
<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;">
Union: <span class="arithmatex">\(F = \sum m(1, 3, 6, 7, 8, 9, 11, 12, 13)\)</span>
</p>
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
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; font-weight: 700; margin-top: 0;">
Cofactor <span class="arithmatex">\(F_0 = F|_{A=0}\)</span>:
</p>
<p style="color: #333; line-height: 1.85;">
Minterms with A=0: <span class="arithmatex">\(m(0, 1, 4, 5, 6, 7)\)</span> → as 3-variable function of B, C, D: <span class="arithmatex">\(m_3(0, 1, 4, 5, 6, 7)\)</span>
</p>
<p style="color: #2E7D32; font-weight: 700;">
Simplified: <span class="arithmatex">\(F_0 = \overline{B} + C\)</span>
</p>
<p style="color: #333; font-weight: 700;">
Cofactor <span class="arithmatex">\(F_1 = F|_{A=1}\)</span>:
</p>
<p style="color: #333; line-height: 1.85;">
Minterms with A=1: <span class="arithmatex">\(m(14, 15)\)</span> → as 3-variable function: indices 6, 7 → <span class="arithmatex">\(m_3(6, 7)\)</span>
</p>
<p style="color: #2E7D32; font-weight: 700;">
Simplified: <span class="arithmatex">\(F_1 = BC\)</span>
</p>
<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;">
Final decomposition: <span class="arithmatex">\(F = \overline{A}(\overline{B} + C) + A \cdot BC\)</span>
</p>
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
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;">
The maxterms present: <span class="arithmatex">\((A + B + C) = M_0\)</span>, <span class="arithmatex">\((A + \overline{B} + C) = M_2\)</span>, <span class="arithmatex">\((\overline{A} + B + \overline{C}) = M_5\)</span>
</p>
<p style="color: #333; line-height: 1.85;">
So <span class="arithmatex">\(F = \prod M(0, 2, 5)\)</span>
</p>
<p style="color: #333; line-height: 1.85;">
<span class="arithmatex">\(\overline{F} = \sum m(0, 2, 5) = \overline{A}\,\overline{B}\,\overline{C} + \overline{A}\,B\,\overline{C} + A\overline{B}\,C\)</span>
</p>
<p style="color: #333; line-height: 1.85;">
<span class="arithmatex">\(F = \sum m(1, 3, 4, 6, 7)\)</span>
</p>
<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;">
Simplified SOP: <span class="arithmatex">\(F = \overline{A}\,C + A\overline{C} + AB\)</span>
</p>
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
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;">
Since <span class="arithmatex">\(F \cdot G = \sum m(1, 5, 7)\)</span>, <span class="arithmatex">\(G\)</span> must include minterms {1, 5, 7}.
</p>
<p style="color: #333; line-height: 1.85;">
Since <span class="arithmatex">\(F + G = \sum m(0, 1, 2, 3, 5, 6, 7)\)</span>, every minterm in this set must be in <span class="arithmatex">\(F\)</span> or <span class="arithmatex">\(G\)</span> (or both).
</p>
<p style="color: #333; line-height: 1.85;">
<span class="arithmatex">\(F = \{1, 3, 5, 7\}\)</span>. Minterms in <span class="arithmatex">\(F + G\)</span> but not in <span class="arithmatex">\(F\)</span>: {0, 2, 6} — these must be in <span class="arithmatex">\(G\)</span>.
</p>
<p style="color: #333; line-height: 1.85;">
<span class="arithmatex">\(G\)</span> cannot include minterm 3 (it's in <span class="arithmatex">\(F\)</span>, so <span class="arithmatex">\(F \cdot G\)</span> would include 3 — but <span class="arithmatex">\(F \cdot G\)</span> does NOT include 3). Minterm 4 is not in <span class="arithmatex">\(F + G\)</span>, so <span class="arithmatex">\(G\)</span> cannot include 4.
</p>
<p style="color: #2E7D32; font-weight: 700;">
<span class="arithmatex">\(G = \sum m(0, 1, 2, 5, 6, 7)\)</span>
</p>
<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;">
Simplified: <span class="arithmatex">\(G = \overline{B}\,\overline{C} + \overline{A}\,\overline{B} + AB + BC\)</span>
</p>
</div>
</details>

</div>

---

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);" markdown>

<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Challenge 6: Canonical Form of XOR</p>

<p style="color: #333; line-height: 1.75;">Express the 3-variable XOR function $F = A \oplus B \oplus C$ in both canonical SOP and canonical POS forms. What pattern do you notice about the minterm indices?</p>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.75; margin-top: 0;">
<span class="arithmatex">\(A \oplus B \oplus C = 1\)</span> when an odd number of variables are 1.
</p>
<p style="color: #333; line-height: 1.75;">
Minterms with odd number of 1s: 001(1), 010(2), 100(4), 111(7)
</p>
<p style="color: #2E7D32; font-weight: 700;">
SOP: <span class="arithmatex">\(F = \Sigma m(1,2,4,7)\)</span>
</p>
<p style="color: #2E7D32; font-weight: 700;">
POS: <span class="arithmatex">\(F = \Pi M(0,3,5,6)\)</span>
</p>
<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;">
Pattern: The minterm indices are exactly those with an <strong>odd number of 1-bits</strong> in their binary representation (odd parity). The maxterm indices have an even number of 1-bits. This is the parity function.
</p>
</div>
</details>

</div>

---

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);" markdown>

<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Challenge 7: Don't Cares and Dual Implementations</p>

<p style="color: #333; line-height: 1.75;">A BCD digit detector outputs 1 for valid BCD digits (0–9). Express this function as $F(A,B,C,D) = \Sigma m(?) + d(?)$, where the don't cares correspond to invalid BCD codes. Find both the minimum SOP and minimum POS using don't cares.</p>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.75; margin-top: 0;">
Valid BCD: 0000–1001 (0–9). Invalid: 1010–1111 (10–15).
</p>
<p style="color: #333; line-height: 1.75;">
<span class="arithmatex">\(F = \Sigma m(0,1,2,3,4,5,6,7,8,9) + d(10,11,12,13,14,15)\)</span>
</p>
<p style="color: #333; line-height: 1.75;">
With don't cares set to 1: all 16 minterms are covered → <span class="arithmatex">\(F = 1\)</span>. But that's trivial.
</p>
<p style="color: #333; line-height: 1.75;">
Actually, the function that detects <strong>invalid</strong> BCD is more interesting: <span class="arithmatex">\(G = \Sigma m(10,11,12,13,14,15)\)</span> (no don't cares).
</p>
<p style="color: #2E7D32; font-weight: 700;">
Minimum SOP for valid BCD detector: <span class="arithmatex">\(F = \overline{A} + \overline{B}\,\overline{C} + \overline{B}\,\overline{D}\)</span>
</p>
<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;">
Minimum POS: <span class="arithmatex">\(F = (\overline{A} + \overline{B})(\overline{A} + \overline{C} + \overline{D})\)</span>
</p>
</div>
</details>

</div>

---

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);" markdown>

<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Challenge 8: Shannon Expansion Application</p>

<p style="color: #333; line-height: 1.75;">Given $F(A,B,C,D) = \Sigma m(0,1,4,5,6,11,14,15)$, use Shannon expansion around variable $A$ to decompose $F$ into cofactors $F_A$ and $F_{\overline{A}}$. Express each cofactor as a minterm list over $\{B,C,D\}$.</p>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.75; margin-top: 0;">
Split minterms by A's value (A is the MSB in ABCD):
</p>
<p style="color: #333; line-height: 1.75;">
<strong>A=0</strong> (minterms 0–7): {0,1,4,5,6} → <span class="arithmatex">\(F_{\overline{A}}(B,C,D) = \Sigma m(0,1,4,5,6)\)</span>
</p>
<p style="color: #333; line-height: 1.75;">
<strong>A=1</strong> (minterms 8–15, subtract 8): {11−8,14−8,15−8} = {3,6,7} → <span class="arithmatex">\(F_A(B,C,D) = \Sigma m(3,6,7)\)</span>
</p>
<p style="color: #2E7D32; font-weight: 700;">
<span class="arithmatex">\(F_{\overline{A}} = \overline{B}\,\overline{D} + \overline{B}\,\overline{C} + B\,C\,\overline{D}\)</span> (simplified)
</p>
<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;">
<span class="arithmatex">\(F_A = B\,C + \overline{B}\,C\,D = C(B + \overline{B}D) = C(B+D)\)</span> (simplified)
</p>
</div>
</details>

</div>

</div>
