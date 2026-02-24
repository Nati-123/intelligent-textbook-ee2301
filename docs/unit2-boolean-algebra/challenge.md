---
title: Unit 2 Challenge - Boolean Algebra
description: Challenge problems for Boolean algebra — answers only, no solutions
---

<div class="problems-styled" markdown>

<h1 style="color: #5A3EED !important; border-bottom: 3px solid #5A3EED; padding-bottom: 0.4rem; font-weight: 800;">Challenge Problems: Boolean Algebra</h1>

<p style="color: #555; line-height: 1.85; font-size: 1.05rem; margin-bottom: 2rem;">
These challenge problems test deeper understanding. Only final answers are provided — work through each problem on your own.
</p>

---

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);" markdown>

<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Challenge 1: Multi-Step Boolean Simplification</p>

<p style="color: #333; line-height: 1.75;">Simplify the following expression using Boolean algebra laws (show only the final result):</p>

$$F = \overline{A}B\overline{C} + A\overline{B}\overline{C} + AB\overline{C} + \overline{A}BC + ABC$$

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.75; margin-top: 0;">
<span class="arithmatex">\(F = \overline{C} \cdot (A + B) + BC = A\overline{C} + B\)</span>
</p>
<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;">
Simplified: <span class="arithmatex">\(F = A\overline{C} + B\)</span>
</p>
</div>
</details>

</div>

---

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);" markdown>

<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Challenge 2: Prove a Boolean Identity</p>

<p style="color: #333; line-height: 1.75;">Prove algebraically that:</p>

$$AB + \overline{A}C + BC = AB + \overline{A}C$$

<p style="color: #333; line-height: 1.75;">This is the <strong>Consensus Theorem</strong>. Your proof should use only the basic Boolean algebra axioms and theorems.</p>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.75; margin-top: 0;">
<span class="arithmatex">\(AB + \overline{A}C + BC\)</span>
</p>
<p style="color: #333; line-height: 1.75;">
<span class="arithmatex">\(= AB + \overline{A}C + BC(A + \overline{A})\)</span>
</p>
<p style="color: #333; line-height: 1.75;">
<span class="arithmatex">\(= AB + \overline{A}C + ABC + \overline{A}BC\)</span>
</p>
<p style="color: #333; line-height: 1.75;">
<span class="arithmatex">\(= AB(1 + C) + \overline{A}C(1 + B)\)</span>
</p>
<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;">
<span class="arithmatex">\(= AB + \overline{A}C\)</span> &#8718;
</p>
</div>
</details>

</div>

---

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);" markdown>

<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Challenge 3: Complement and De Morgan's Simplification</p>

<p style="color: #333; line-height: 1.75;">Find the complement of the expression below, then simplify the result to a minimum SOP form:</p>

$$F = (A + B)(\overline{B} + C)(A + \overline{C})$$

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin: 0;">
<span class="arithmatex">\(\overline{F} = \overline{A}\,\overline{B} + B\overline{C} + \overline{A}\,C\)</span>
</p>
</div>
</details>

</div>

---

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);" markdown>

<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Challenge 4: Expression Equivalence</p>

<p style="color: #333; line-height: 1.75;">Determine whether the following two expressions are equivalent. If not, find an input combination where they differ.</p>

$$F_1 = A\overline{B} + \overline{A}B + AB$$
$$F_2 = A + B$$

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">They are equivalent.</p>
<p style="color: #333; line-height: 1.75;">
<span class="arithmatex">\(F_1 = A\overline{B} + \overline{A}B + AB = A\overline{B} + B(\overline{A} + A) = A\overline{B} + B = A + B = F_2\)</span>
</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">
Both functions equal 0 only when <span class="arithmatex">\(A = 0, B = 0\)</span>, and equal 1 for all other inputs.
</p>
</div>
</details>

</div>

---

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);" markdown>

<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Challenge 5: Simplify a 5-Term SOP Expression</p>

<p style="color: #333; line-height: 1.75;">Simplify the following 5-term SOP expression to a minimum form:</p>

$$F = \overline{A}\,\overline{B}\,\overline{C}\,D + \overline{A}\,\overline{B}\,C\,D + A\overline{B}\,\overline{C}\,D + A\overline{B}\,C\,D + AB\overline{C}\,D$$

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.75; margin-top: 0;">
<span class="arithmatex">\(F = \overline{B}\,D + A\overline{C}\,D\)</span>
</p>
<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;">
This can also be written as: <span class="arithmatex">\(F = D(\overline{B} + A\overline{C})\)</span>
</p>
</div>
</details>

</div>

</div>
