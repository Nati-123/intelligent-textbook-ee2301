---
title: Unit 5 Challenge - Karnaugh Maps
description: Challenge problems for Karnaugh maps — answers only, no solutions
---

<div class="problems-styled" markdown>

<h1 style="color: #5A3EED !important; border-bottom: 3px solid #5A3EED; padding-bottom: 0.4rem; font-weight: 800;">Challenge Problems: Karnaugh Maps</h1>

<p style="color: #555; line-height: 1.85; font-size: 1.05rem; margin-bottom: 2rem;">
These challenge problems test deeper understanding. Only final answers are provided — work through each problem on your own.
</p>

---

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);" markdown>

<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Challenge 1: 4-Variable K-Map with Don't Cares</p>

<p style="color: #333; line-height: 1.75;">Simplify the following function using a Karnaugh map to obtain the minimum SOP expression:</p>

$$F(A, B, C, D) = \sum m(2, 3, 4, 5, 13, 15) + \sum d(8, 9, 10, 11)$$

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;"><span class="arithmatex">\(F = \overline{A}\,\overline{B}\,C + \overline{A}\,B\,\overline{C} + A\,\overline{B} + B\,C\,D\)</span></p>

<p style="color: #333; line-height: 1.75;">Using don't cares optimally:</p>

<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;"><span class="arithmatex">\(F = \overline{B}\,C + \overline{A}\,B\,\overline{C} + BD\)</span></p>
</div>
</details>

</div>

---

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);" markdown>

<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Challenge 2: K-Map Yielding POS Form</p>

<p style="color: #333; line-height: 1.75;">Find the minimum POS (product of sums) expression for:</p>

$$F(A, B, C, D) = \prod M(0, 1, 2, 8, 9, 10, 14)$$

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Group the 0s on the K-map:</p>

$$\overline{F} = \overline{B}\,\overline{C}\,\overline{D} + \overline{B}\,\overline{D}\,A + ...$$

<p style="color: #333; line-height: 1.75;">Minimum POS: <span class="arithmatex">\(F = (B + D)(A + C)(\overline{A} + B + \overline{C})\)</span></p>

<p style="color: #333; line-height: 1.75;">Equivalently, group the 0s to find <span class="arithmatex">\(\overline{F}\)</span>, then complement:</p>

$$\overline{F} = \overline{B}\,\overline{D} + \overline{A}\,\overline{C}\,\overline{D} + A\,B\,C\,\overline{D}...$$

<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;">Minimum POS: <span class="arithmatex">\(F = (B + D)(\overline{A} + C + D)(A + \overline{B} + \overline{C} + D)\)</span></p>
</div>
</details>

</div>

---

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);" markdown>

<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Challenge 3: Multiple Minimum Solutions</p>

<p style="color: #333; line-height: 1.75;">Find ALL minimum SOP expressions for:</p>

$$F(A, B, C, D) = \sum m(0, 2, 5, 7, 8, 10, 13, 15)$$

<p style="color: #333; line-height: 1.75;">Identify the essential prime implicants and show that the function has more than one minimum cover.</p>

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Essential prime implicants: <strong>None</strong> — this function has no essential prime implicants.</p>

<p style="color: #333; line-height: 1.75;">The prime implicants are: <span class="arithmatex">\(\overline{B}\,\overline{D}\)</span>, <span class="arithmatex">\(B\,D\)</span>, <span class="arithmatex">\(\overline{A}\,\overline{C}\,\overline{D}\)</span>, <span class="arithmatex">\(A\,\overline{C}\,\overline{D}\)</span>, <span class="arithmatex">\(\overline{A}\,C\,D\)</span>, <span class="arithmatex">\(A\,C\,D\)</span>, <span class="arithmatex">\(\overline{C}\,\overline{D}\)</span>, <span class="arithmatex">\(C\,D\)</span>.</p>

<p style="color: #333; line-height: 1.75;">Two minimum SOP expressions (each with 2 terms, 4 literals):</p>

<p style="color: #2E7D32; font-weight: 700;"><strong>Solution 1:</strong> <span class="arithmatex">\(F = \overline{B}\,\overline{D} + BD\)</span></p>

<p style="color: #2E7D32; font-weight: 700;"><strong>Solution 2:</strong> <span class="arithmatex">\(F = \overline{C}\,\overline{D} + CD\)</span></p>

<p style="color: #333; line-height: 1.75;">Both are equivalent to <span class="arithmatex">\(F = B \odot D\)</span> and <span class="arithmatex">\(F = C \odot D\)</span>...</p>

<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;">The two minimum covers are: <span class="arithmatex">\(F = \overline{B}\,\overline{D} + B\,D\)</span> and <span class="arithmatex">\(F = \overline{C}\,\overline{D} + C\,D\)</span></p>
</div>
</details>

</div>

---

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);" markdown>

<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Challenge 4: All Prime Implicants Identification</p>

<p style="color: #333; line-height: 1.75;">For the function <span class="arithmatex">\(F(W, X, Y, Z) = \sum m(0, 2, 4, 5, 6, 7, 8, 10, 13)\)</span>, use a K-map to:</p>

1. Find all prime implicants
2. Identify the essential prime implicants
3. Find the minimum SOP expression

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">All prime implicants:</p>

- <span class="arithmatex">\(\overline{X}\,\overline{Z}\)</span> (covers 0, 2, 8, 10)
- <span class="arithmatex">\(\overline{W}\,X\)</span> (covers 4, 5, 6, 7)
- <span class="arithmatex">\(\overline{W}\,\overline{Z}\)</span> (covers 0, 2, 4, 6)
- <span class="arithmatex">\(W\,X\,\overline{Y}\,Z\)</span> (covers 13)
- <span class="arithmatex">\(\overline{W}\,Y\,\overline{Z}\)</span> (covers 2, 6)
- <span class="arithmatex">\(\overline{W}\,X\,\overline{Y}\)</span> (covers 4, 5)

<p style="color: #2E7D32; font-weight: 700;">Essential prime implicants:</p>

- <span class="arithmatex">\(\overline{X}\,\overline{Z}\)</span> (only PI covering minterms 8 and 10)
- <span class="arithmatex">\(\overline{W}\,X\)</span> (only PI covering minterm 7)
- <span class="arithmatex">\(W\,X\,\overline{Y}\,Z\)</span> (only PI covering minterm 13)

<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;">Minimum SOP: <span class="arithmatex">\(F = \overline{X}\,\overline{Z} + \overline{W}\,X + W\,X\,\overline{Y}\,Z\)</span></p>
</div>
</details>

</div>

---

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);" markdown>

<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Challenge 5: 5-Variable K-Map Simplification</p>

<p style="color: #333; line-height: 1.75;">Simplify the following 5-variable function using a K-map (two 4-variable maps for <span class="arithmatex">\(A = 0\)</span> and <span class="arithmatex">\(A = 1\)</span>):</p>

$$F(A, B, C, D, E) = \sum m(0, 1, 2, 4, 5, 6, 16, 17, 18, 20, 21, 22, 25, 29)$$

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Split into two maps:</p>

<p style="color: #333; line-height: 1.75;"><strong><span class="arithmatex">\(A = 0\)</span> map:</strong> minterms <span class="arithmatex">\(0, 1, 2, 4, 5, 6\)</span> &rarr; These are <span class="arithmatex">\(\overline{C}\,\overline{D}\,\overline{E}\)</span>, <span class="arithmatex">\(\overline{C}\,\overline{D}\,E\)</span>, <span class="arithmatex">\(\overline{C}\,D\,\overline{E}\)</span>, <span class="arithmatex">\(C\,\overline{D}\,\overline{E}\)</span>, <span class="arithmatex">\(C\,\overline{D}\,E\)</span>, <span class="arithmatex">\(C\,D\,\overline{E}\)</span> &rarr; <span class="arithmatex">\(\overline{B}\,\overline{E} + \overline{B}\,\overline{D}\)</span></p>

<p style="color: #333; line-height: 1.75;">Wait — reindex: for <span class="arithmatex">\(A=0\)</span>, minterms 0–15 map to <span class="arithmatex">\(BCDE\)</span>:</p>

- <span class="arithmatex">\(m(0) = 0000\)</span>, <span class="arithmatex">\(m(1) = 0001\)</span>, <span class="arithmatex">\(m(2) = 0010\)</span>, <span class="arithmatex">\(m(4) = 0100\)</span>, <span class="arithmatex">\(m(5) = 0101\)</span>, <span class="arithmatex">\(m(6) = 0110\)</span>

<p style="color: #333; line-height: 1.75;">Group: <span class="arithmatex">\(\overline{B}\,\overline{D} + \overline{B}\,\overline{E} + ...\)</span></p>

<p style="color: #333; line-height: 1.75;">Simplified: <span class="arithmatex">\(\overline{B}\,\overline{E} + \overline{B}\,\overline{D} = \overline{B}(\overline{D} + \overline{E})\)</span>... actually <span class="arithmatex">\(= \overline{B}\,\overline{E} + \overline{D}\,\overline{E}\)</span></p>

<p style="color: #333; line-height: 1.75;">From the K-map: <span class="arithmatex">\(\overline{B}\,\overline{E} + \overline{B}\,D\,\overline{E}\)</span>... these minterms form <span class="arithmatex">\(\overline{B}\,\overline{E} + \overline{B}\,\overline{D}\)</span>...</p>

<p style="color: #333; line-height: 1.75;">Minimum SOP: <span class="arithmatex">\(F = \overline{B}\,\overline{E} + \overline{B}\,\overline{D} + \overline{A}\,\overline{B}\,D\,\overline{E}\)</span>...</p>

<p style="color: #2E7D32; font-weight: 700;">Final answer:</p>

<p style="color: #2E7D32; font-weight: 700;"><span class="arithmatex">\(F = \overline{B}\,\overline{E} + \overline{B}\,D\,\overline{E} + A\,\overline{B}\,D\,E\)</span></p>

<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;">More carefully: <span class="arithmatex">\(F = \overline{B}\,\overline{E} + \overline{D}\,\overline{E} + A\,\overline{B}\,\overline{C}\,D\,E\)</span></p>
</div>
</details>

</div>

</div>
