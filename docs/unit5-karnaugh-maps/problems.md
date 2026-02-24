---
title: Unit 5 Problems - Karnaugh Maps
description: Practice problems for K-map simplification and prime implicants
---

<div class="problems-styled" markdown>

<h1 style="color: #5A3EED !important; border-bottom: 3px solid #5A3EED; padding-bottom: 0.4rem; font-weight: 800; margin-bottom: 1.5rem;">End-of-Unit Problems: Karnaugh Maps</h1>

<p style="color: #555; line-height: 1.85; font-size: 1.05rem; margin-bottom: 2rem;">
Work through these problems to master K-map simplification techniques.
</p>

---

<h2 style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">Section A: 2 and 3-Variable K-Maps (5 problems)</h2>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 1</h3>

Simplify using a 2-variable K-map: $F(A, B) = \Sigma m(0, 1, 2)$

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;">K-map:</p>

<table style="font-size: 0.82rem; margin: 0.5rem auto; border-collapse: collapse;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 4px 10px;"></th><th style="padding: 4px 10px;">B=0</th><th style="padding: 4px 10px;">B=1</th></tr></thead>
<tbody>
<tr><td style="padding: 3px 10px; font-weight: 700;">A=0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px; font-weight: 700;">A=1</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px;">0</td></tr>
</tbody>
</table>

<p style="color: #333; line-height: 1.85;">Groups:</p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">Top row (A=0): m0, m1 &rarr; A'</li>
<li style="color: #333; line-height: 1.85;">Left column (B=0): m0, m2 &rarr; B'</li>
</ul>

<p style="color: #2E7D32; font-weight: 700;">F = A' + B'</p>
</div>
</details>

---

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 2</h3>

Simplify: $F(A, B, C) = \Sigma m(0, 2, 4, 6)$

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;">K-map:</p>

<table style="font-size: 0.82rem; margin: 0.5rem auto; border-collapse: collapse;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 4px 10px;"></th><th style="padding: 4px 10px;">BC=00</th><th style="padding: 4px 10px;">BC=01</th><th style="padding: 4px 10px;">BC=11</th><th style="padding: 4px 10px;">BC=10</th></tr></thead>
<tbody>
<tr><td style="padding: 3px 10px; font-weight: 700;">A=0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px; font-weight: 700;">A=1</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td></tr>
</tbody>
</table>

<p style="color: #333; line-height: 1.85;">Group all 1s in columns BC=00 and BC=10 (both columns where C=0):</p>

<p style="color: #2E7D32; font-weight: 700;">F = C'</p>
</div>
</details>

---

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 3</h3>

Simplify: $F(A, B, C) = \Sigma m(1, 3, 4, 5, 6, 7)$

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;">K-map:</p>

<table style="font-size: 0.82rem; margin: 0.5rem auto; border-collapse: collapse;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 4px 10px;"></th><th style="padding: 4px 10px;">BC=00</th><th style="padding: 4px 10px;">BC=01</th><th style="padding: 4px 10px;">BC=11</th><th style="padding: 4px 10px;">BC=10</th></tr></thead>
<tbody>
<tr><td style="padding: 3px 10px; font-weight: 700;">A=0</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px;">0</td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px; font-weight: 700;">A=1</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td></tr>
</tbody>
</table>

<p style="color: #333; line-height: 1.85;">Groups:</p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">Entire A=1 row: m4, m5, m7, m6 &rarr; A</li>
<li style="color: #333; line-height: 1.85;">Column BC=01, BC=11 (C=1): m1, m3, m5, m7 &rarr; C</li>
</ul>

<p style="color: #2E7D32; font-weight: 700;">F = A + C</p>
</div>
</details>

---

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 4</h3>

Simplify: $F(A, B, C) = \Sigma m(0, 1, 2, 5, 6, 7)$

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;">K-map:</p>

<table style="font-size: 0.82rem; margin: 0.5rem auto; border-collapse: collapse;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 4px 10px;"></th><th style="padding: 4px 10px;">BC=00</th><th style="padding: 4px 10px;">BC=01</th><th style="padding: 4px 10px;">BC=11</th><th style="padding: 4px 10px;">BC=10</th></tr></thead>
<tbody>
<tr><td style="padding: 3px 10px; font-weight: 700;">A=0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px; font-weight: 700;">A=1</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td></tr>
</tbody>
</table>

<p style="color: #333; line-height: 1.85;">Groups:</p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">m0, m1: A'B'</li>
<li style="color: #333; line-height: 1.85;">m0, m2 (wrap): A'C'</li>
<li style="color: #333; line-height: 1.85;">m5, m7: AC</li>
<li style="color: #333; line-height: 1.85;">m6, m7: AB</li>
<li style="color: #333; line-height: 1.85;">m1, m5: B'C</li>
</ul>

<p style="color: #333; line-height: 1.85;">Minimal:</p>
<p style="color: #2E7D32; font-weight: 700;">F = A'B' + AC + AB + B'C</p>
<p style="color: #333; line-height: 1.85; margin-bottom: 0;">Or: <strong>F = A'B' + A'C' + AB + B'C</strong></p>
</div>
</details>

---

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 5</h3>

Find all prime implicants for: $F(A, B, C) = \Sigma m(0, 1, 3, 5, 7)$

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;">K-map:</p>

<table style="font-size: 0.82rem; margin: 0.5rem auto; border-collapse: collapse;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 4px 10px;"></th><th style="padding: 4px 10px;">BC=00</th><th style="padding: 4px 10px;">BC=01</th><th style="padding: 4px 10px;">BC=11</th><th style="padding: 4px 10px;">BC=10</th></tr></thead>
<tbody>
<tr><td style="padding: 3px 10px; font-weight: 700;">A=0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px;">0</td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px; font-weight: 700;">A=1</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px;">0</td></tr>
</tbody>
</table>

<p style="color: #333; line-height: 1.85;">Prime implicants:</p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">m0, m1 &rarr; A'B' (cannot expand)</li>
<li style="color: #333; line-height: 1.85;">m1, m3, m5, m7 &rarr; C (largest group)</li>
</ul>

<p style="color: #333; line-height: 1.85;">Essential PI: C covers m3, m5, m7 uniquely. A'B' covers m0 uniquely.</p>

<p style="color: #333; line-height: 1.85;"><strong>Prime Implicants: A'B', C</strong></p>
<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;">Minimum cover: F = A'B' + C</p>
</div>
</details>

---

<h2 style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">Section B: 4-Variable K-Maps (6 problems)</h2>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 6</h3>

Simplify: $F(A, B, C, D) = \Sigma m(0, 1, 2, 3, 4, 5, 6, 7)$

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;">K-map:</p>

<table style="font-size: 0.82rem; margin: 0.5rem auto; border-collapse: collapse;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 4px 10px;"></th><th style="padding: 4px 10px;">CD=00</th><th style="padding: 4px 10px;">CD=01</th><th style="padding: 4px 10px;">CD=11</th><th style="padding: 4px 10px;">CD=10</th></tr></thead>
<tbody>
<tr><td style="padding: 3px 10px; font-weight: 700;">AB=00</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px; font-weight: 700;">AB=01</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td></tr>
<tr><td style="padding: 3px 10px; font-weight: 700;">AB=11</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px; font-weight: 700;">AB=10</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td></tr>
</tbody>
</table>

<p style="color: #333; line-height: 1.85;">All 1s are in the top two rows where A=0.</p>

<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;">F = A'</p>
</div>
</details>

---

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 7</h3>

Simplify: $F(A, B, C, D) = \Sigma m(0, 2, 8, 10, 5, 7, 13, 15)$

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;">K-map:</p>

<table style="font-size: 0.82rem; margin: 0.5rem auto; border-collapse: collapse;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 4px 10px;"></th><th style="padding: 4px 10px;">CD=00</th><th style="padding: 4px 10px;">CD=01</th><th style="padding: 4px 10px;">CD=11</th><th style="padding: 4px 10px;">CD=10</th></tr></thead>
<tbody>
<tr><td style="padding: 3px 10px; font-weight: 700;">AB=00</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px; font-weight: 700;">AB=01</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px;">0</td></tr>
<tr><td style="padding: 3px 10px; font-weight: 700;">AB=11</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px;">0</td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px; font-weight: 700;">AB=10</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td></tr>
</tbody>
</table>

<p style="color: #333; line-height: 1.85;">Groups:</p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">Four corners (m0, m2, m8, m10): B'D'</li>
<li style="color: #333; line-height: 1.85;">m5, m7, m13, m15: BD</li>
</ul>

<p style="color: #2E7D32; font-weight: 700;">F = B'D' + BD</p>
<p style="color: #333; line-height: 1.85; margin-bottom: 0;">Simplified: <strong>F = B &odot; D</strong> (XNOR)</p>
</div>
</details>

---

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 8</h3>

Simplify: $F(A, B, C, D) = \Sigma m(1, 3, 5, 7, 9, 11, 12, 14)$

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;">K-map:</p>

<table style="font-size: 0.82rem; margin: 0.5rem auto; border-collapse: collapse;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 4px 10px;"></th><th style="padding: 4px 10px;">CD=00</th><th style="padding: 4px 10px;">CD=01</th><th style="padding: 4px 10px;">CD=11</th><th style="padding: 4px 10px;">CD=10</th></tr></thead>
<tbody>
<tr><td style="padding: 3px 10px; font-weight: 700;">AB=00</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px;">0</td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px; font-weight: 700;">AB=01</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px;">0</td></tr>
<tr><td style="padding: 3px 10px; font-weight: 700;">AB=11</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px; font-weight: 700;">AB=10</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px;">0</td></tr>
</tbody>
</table>

<p style="color: #333; line-height: 1.85;">Groups:</p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">m1, m3, m5, m7: A'D</li>
<li style="color: #333; line-height: 1.85;">m9, m11: AB'D</li>
<li style="color: #333; line-height: 1.85;">m12, m14: ABD'</li>
</ul>

<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;">F = A'D + AB'D + ABD'</p>
</div>
</details>

---

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 9</h3>

Simplify using K-map: $F(A, B, C, D) = \Sigma m(0, 4, 5, 7, 8, 9, 13, 15)$

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;">K-map:</p>

<table style="font-size: 0.82rem; margin: 0.5rem auto; border-collapse: collapse;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 4px 10px;"></th><th style="padding: 4px 10px;">CD=00</th><th style="padding: 4px 10px;">CD=01</th><th style="padding: 4px 10px;">CD=11</th><th style="padding: 4px 10px;">CD=10</th></tr></thead>
<tbody>
<tr><td style="padding: 3px 10px; font-weight: 700;">AB=00</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px; font-weight: 700;">AB=01</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px;">0</td></tr>
<tr><td style="padding: 3px 10px; font-weight: 700;">AB=11</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px;">0</td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px; font-weight: 700;">AB=10</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td></tr>
</tbody>
</table>

<p style="color: #333; line-height: 1.85;">Groups:</p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">m5, m7, m13, m15 &rarr; BD (4 cells)</li>
<li style="color: #333; line-height: 1.85;">m0, m4 &rarr; A'C'D'</li>
<li style="color: #333; line-height: 1.85;">m8, m9 &rarr; AB'C'</li>
</ul>

<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;">F = BD + A'C'D' + AB'C'</p>
</div>
</details>

---

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 10</h3>

Find minimum SOP and POS for: $F = \Sigma m(0, 1, 4, 5, 11, 14, 15)$

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;">K-map:</p>

<table style="font-size: 0.82rem; margin: 0.5rem auto; border-collapse: collapse;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 4px 10px;"></th><th style="padding: 4px 10px;">CD=00</th><th style="padding: 4px 10px;">CD=01</th><th style="padding: 4px 10px;">CD=11</th><th style="padding: 4px 10px;">CD=10</th></tr></thead>
<tbody>
<tr><td style="padding: 3px 10px; font-weight: 700;">AB=00</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px; font-weight: 700;">AB=01</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td></tr>
<tr><td style="padding: 3px 10px; font-weight: 700;">AB=11</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px; font-weight: 700;">AB=10</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px;">0</td></tr>
</tbody>
</table>

<p style="color: #333; line-height: 1.85;"><strong>SOP:</strong></p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">m0, m1, m4, m5 &rarr; A'C'</li>
<li style="color: #333; line-height: 1.85;">m14, m15 &rarr; ABC</li>
<li style="color: #333; line-height: 1.85;">m11, m15 &rarr; ACD</li>
</ul>

<p style="color: #2E7D32; font-weight: 700;">Minimal SOP: F = A'C' + ABC + ACD</p>

<p style="color: #333; line-height: 1.85;"><strong>POS:</strong> F' = &Sigma;m(2, 3, 6, 7, 8, 9, 10, 12, 13). Then F = (F')'</p>

<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;">F = A'C' + ABC + ABD</p>
</div>
</details>

---

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 11</h3>

Identify all prime implicants for: $F = \Sigma m(0, 2, 3, 4, 7, 8, 10, 11, 15)$

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;">K-map:</p>

<table style="font-size: 0.82rem; margin: 0.5rem auto; border-collapse: collapse;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 4px 10px;"></th><th style="padding: 4px 10px;">CD=00</th><th style="padding: 4px 10px;">CD=01</th><th style="padding: 4px 10px;">CD=11</th><th style="padding: 4px 10px;">CD=10</th></tr></thead>
<tbody>
<tr><td style="padding: 3px 10px; font-weight: 700;">AB=00</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px; font-weight: 700;">AB=01</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px;">0</td></tr>
<tr><td style="padding: 3px 10px; font-weight: 700;">AB=11</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px;">0</td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px; font-weight: 700;">AB=10</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td></tr>
</tbody>
</table>

<p style="color: #333; line-height: 1.85;"><strong>Prime Implicants:</strong></p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">m0, m2, m8, m10 &rarr; <strong>B'D'</strong> (4 cells)</li>
<li style="color: #333; line-height: 1.85;">m2, m3 &rarr; <strong>A'B'C</strong></li>
<li style="color: #333; line-height: 1.85;">m3, m7 &rarr; <strong>A'CD</strong></li>
<li style="color: #333; line-height: 1.85;">m7, m15 &rarr; <strong>BCD</strong></li>
<li style="color: #333; line-height: 1.85;">m10, m11 &rarr; <strong>AB'C</strong></li>
<li style="color: #333; line-height: 1.85;">m11, m15 &rarr; <strong>ACD</strong></li>
</ul>

<p style="color: #333; line-height: 1.85;"><strong>Essential PIs:</strong> B'D' (essential, covers m0, m8) and AB'C (essential, covers m10, m11)</p>
<p style="color: #333; line-height: 1.85;">Need to cover m3, m4, m7, m15</p>

<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;">Minimum: F = B'D' + AB'C + A'CD + BCD</p>
</div>
</details>

---

<h2 style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">Section C: Don't Care Conditions (4 problems)</h2>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 12</h3>

Simplify: $F = \Sigma m(1, 3, 5, 7, 9) + \Sigma d(6, 12, 13)$

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;">K-map:</p>

<table style="font-size: 0.82rem; margin: 0.5rem auto; border-collapse: collapse;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 4px 10px;"></th><th style="padding: 4px 10px;">CD=00</th><th style="padding: 4px 10px;">CD=01</th><th style="padding: 4px 10px;">CD=11</th><th style="padding: 4px 10px;">CD=10</th></tr></thead>
<tbody>
<tr><td style="padding: 3px 10px; font-weight: 700;">AB=00</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px;">0</td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px; font-weight: 700;">AB=01</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px; color: #B8860B; font-weight: 700;">X</td></tr>
<tr><td style="padding: 3px 10px; font-weight: 700;">AB=11</td><td style="padding: 3px 10px; color: #B8860B; font-weight: 700;">X</td><td style="padding: 3px 10px; color: #B8860B; font-weight: 700;">X</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px; font-weight: 700;">AB=10</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td></tr>
</tbody>
</table>

<p style="color: #333; line-height: 1.85;">Use don't cares to enlarge groups:</p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">m1, m3, m5, m7 (group of 4) &rarr; A'D</li>
<li style="color: #333; line-height: 1.85;">m9 &rarr; AB'C'D</li>
</ul>

<p style="color: #333; line-height: 1.85;">F = A'D + AB'C'D = D(A' + AB'C') = D(A' + B'C')</p>

<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;">Simplified: F = A'D + B'C'D</p>
</div>
</details>

---

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 13</h3>

Design a BCD-to-Excess-3 code converter. Use don't cares for invalid BCD inputs (10-15).

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;">BCD input: ABCD (0&ndash;9 valid). Excess-3 output: WXYZ = BCD + 3</p>

<table style="font-size: 0.82rem; margin: 0.5rem auto; border-collapse: collapse;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 4px 10px;">BCD</th><th style="padding: 4px 10px;">WXYZ</th></tr></thead>
<tbody>
<tr><td style="padding: 3px 10px;">0000</td><td style="padding: 3px 10px;">0011</td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px;">0001</td><td style="padding: 3px 10px;">0100</td></tr>
<tr><td style="padding: 3px 10px;">0010</td><td style="padding: 3px 10px;">0101</td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px;">0011</td><td style="padding: 3px 10px;">0110</td></tr>
<tr><td style="padding: 3px 10px;">0100</td><td style="padding: 3px 10px;">0111</td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px;">0101</td><td style="padding: 3px 10px;">1000</td></tr>
<tr><td style="padding: 3px 10px;">0110</td><td style="padding: 3px 10px;">1001</td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px;">0111</td><td style="padding: 3px 10px;">1010</td></tr>
<tr><td style="padding: 3px 10px;">1000</td><td style="padding: 3px 10px;">1011</td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px;">1001</td><td style="padding: 3px 10px;">1100</td></tr>
<tr><td style="padding: 3px 10px;">1010&ndash;1111</td><td style="padding: 3px 10px; color: #B8860B; font-weight: 700;">don't care</td></tr>
</tbody>
</table>

<p style="color: #333; line-height: 1.85;">K-maps for each output (with don't cares at 10&ndash;15):</p>

<p style="color: #2E7D32; font-weight: 700;">W = A + BC + BD</p>
<p style="color: #2E7D32; font-weight: 700;">X = B'C + B'D + BC'D'</p>
<p style="color: #2E7D32; font-weight: 700;">Y = CD + C'D'</p>
<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;">Z = D'</p>
</div>
</details>

---

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 14</h3>

$F(A,B,C,D) = \Sigma m(2, 4, 6, 8, 10, 12) + \Sigma d(0, 7, 15)$

Find minimum SOP expression.

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;">K-map:</p>

<table style="font-size: 0.82rem; margin: 0.5rem auto; border-collapse: collapse;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 4px 10px;"></th><th style="padding: 4px 10px;">CD=00</th><th style="padding: 4px 10px;">CD=01</th><th style="padding: 4px 10px;">CD=11</th><th style="padding: 4px 10px;">CD=10</th></tr></thead>
<tbody>
<tr><td style="padding: 3px 10px; font-weight: 700;">AB=00</td><td style="padding: 3px 10px; color: #B8860B; font-weight: 700;">X</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px; font-weight: 700;">AB=01</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px; color: #B8860B; font-weight: 700;">X</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td></tr>
<tr><td style="padding: 3px 10px; font-weight: 700;">AB=11</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px; color: #B8860B; font-weight: 700;">X</td><td style="padding: 3px 10px;">0</td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px; font-weight: 700;">AB=10</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td></tr>
</tbody>
</table>

<p style="color: #333; line-height: 1.85;">Using don't cares:</p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">Using d0: m0, m2, m8, m10 &rarr; B'D'</li>
<li style="color: #333; line-height: 1.85;">m4, m6, m12: m4, m12 &rarr; BC'D', m4, m6 &rarr; A'BD'</li>
</ul>

<p style="color: #333; line-height: 1.85;">F = B'D' + BC'D' + A'BD' (using don't cares optimally)</p>

<p style="color: #333; line-height: 1.85;">Or simpler: check if D' covers all. D'=1 means D=0, positions: 0, 2, 4, 6, 8, 10, 12, 14. Our function: 2, 4, 6, 8, 10, 12 + d(0) &mdash; all have D=0.</p>

<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;">F = D' (with don't care at m0 treated as 1)</p>
</div>
</details>

---

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 15</h3>

In a BCD system, design a circuit that outputs 1 for prime numbers (2, 3, 5, 7).

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;">Input: ABCD (BCD digit 0&ndash;9). Output: P = 1 for primes 2, 3, 5, 7</p>

<table style="font-size: 0.82rem; margin: 0.5rem auto; border-collapse: collapse;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 4px 10px;">Decimal</th><th style="padding: 4px 10px;">ABCD</th><th style="padding: 4px 10px;">P</th></tr></thead>
<tbody>
<tr><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0000</td><td style="padding: 3px 10px;">0</td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px;">0001</td><td style="padding: 3px 10px;">0</td></tr>
<tr><td style="padding: 3px 10px;">2</td><td style="padding: 3px 10px;">0010</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px;">3</td><td style="padding: 3px 10px;">0011</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td></tr>
<tr><td style="padding: 3px 10px;">4</td><td style="padding: 3px 10px;">0100</td><td style="padding: 3px 10px;">0</td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px;">5</td><td style="padding: 3px 10px;">0101</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td></tr>
<tr><td style="padding: 3px 10px;">6</td><td style="padding: 3px 10px;">0110</td><td style="padding: 3px 10px;">0</td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px;">7</td><td style="padding: 3px 10px;">0111</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td></tr>
<tr><td style="padding: 3px 10px;">8</td><td style="padding: 3px 10px;">1000</td><td style="padding: 3px 10px;">0</td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px;">9</td><td style="padding: 3px 10px;">1001</td><td style="padding: 3px 10px;">0</td></tr>
<tr><td style="padding: 3px 10px;">10&ndash;15</td><td style="padding: 3px 10px; color: #B8860B; font-weight: 700;">X</td><td style="padding: 3px 10px; color: #B8860B; font-weight: 700;">d</td></tr>
</tbody>
</table>

<p style="color: #333; line-height: 1.85;">P = &Sigma;m(2, 3, 5, 7) + &Sigma;d(10&ndash;15)</p>

<p style="color: #333; line-height: 1.85;">K-map with don't cares at 10&ndash;15:</p>

<table style="font-size: 0.82rem; margin: 0.5rem auto; border-collapse: collapse;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 4px 10px;"></th><th style="padding: 4px 10px;">CD=00</th><th style="padding: 4px 10px;">CD=01</th><th style="padding: 4px 10px;">CD=11</th><th style="padding: 4px 10px;">CD=10</th></tr></thead>
<tbody>
<tr><td style="padding: 3px 10px; font-weight: 700;">AB=00</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px; font-weight: 700;">AB=01</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px;">0</td></tr>
<tr><td style="padding: 3px 10px; font-weight: 700;">AB=11</td><td style="padding: 3px 10px; color: #B8860B; font-weight: 700;">d</td><td style="padding: 3px 10px; color: #B8860B; font-weight: 700;">d</td><td style="padding: 3px 10px; color: #B8860B; font-weight: 700;">d</td><td style="padding: 3px 10px; color: #B8860B; font-weight: 700;">d</td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px; font-weight: 700;">AB=10</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px; color: #B8860B; font-weight: 700;">d</td><td style="padding: 3px 10px; color: #B8860B; font-weight: 700;">d</td></tr>
</tbody>
</table>

<p style="color: #333; line-height: 1.85;">Groups (using don't cares):</p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">m2, m3, d10, d11 &rarr; B'C</li>
<li style="color: #333; line-height: 1.85;">m5, m7, d13, d15 &rarr; BD</li>
</ul>

<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;">P = B'C + BD</p>
</div>
</details>

---

<h2 style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">Section D: Multiple Output Functions (3 problems)</h2>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 16</h3>

Design minimum circuits for:

- $F_1 = \Sigma m(0, 2, 3, 4, 5)$
- $F_2 = \Sigma m(0, 2, 3, 5, 6, 7)$

Share common terms where possible.

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;">For 3 variables A, B, C:</p>

<p style="color: #333; line-height: 1.85;"><strong>F1 K-map:</strong></p>

<table style="font-size: 0.82rem; margin: 0.5rem auto; border-collapse: collapse;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 4px 10px;"></th><th style="padding: 4px 10px;">BC=00</th><th style="padding: 4px 10px;">BC=01</th><th style="padding: 4px 10px;">BC=11</th><th style="padding: 4px 10px;">BC=10</th></tr></thead>
<tbody>
<tr><td style="padding: 3px 10px; font-weight: 700;">A=0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px; font-weight: 700;">A=1</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td></tr>
</tbody>
</table>

<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">F1 = m0, m2, m3, m4, m5</li>
<li style="color: #333; line-height: 1.85;">m0, m2: A'C'</li>
<li style="color: #333; line-height: 1.85;">m2, m3: A'B</li>
<li style="color: #333; line-height: 1.85;">m4, m5: AB'</li>
</ul>

<p style="color: #2E7D32; font-weight: 700;">F1 = A'C' + A'B + AB'</p>

<p style="color: #333; line-height: 1.85;"><strong>F2 K-map:</strong></p>

<table style="font-size: 0.82rem; margin: 0.5rem auto; border-collapse: collapse;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 4px 10px;"></th><th style="padding: 4px 10px;">BC=00</th><th style="padding: 4px 10px;">BC=01</th><th style="padding: 4px 10px;">BC=11</th><th style="padding: 4px 10px;">BC=10</th></tr></thead>
<tbody>
<tr><td style="padding: 3px 10px; font-weight: 700;">A=0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px; font-weight: 700;">A=1</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td></tr>
</tbody>
</table>

<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">F2 = m0, m2, m3, m5, m6, m7</li>
<li style="color: #333; line-height: 1.85;">m0, m2: A'C'</li>
<li style="color: #333; line-height: 1.85;">m2, m3, m6, m7: B</li>
<li style="color: #333; line-height: 1.85;">m5, m7: AC</li>
</ul>

<p style="color: #2E7D32; font-weight: 700;">F2 = A'C' + B</p>

<p style="color: #333; line-height: 1.85; margin-bottom: 0;"><strong>Shared term: A'C'</strong></p>
</div>
</details>

---

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 17</h3>

Given $F_1 = \Sigma m(0, 1, 3, 7)$ and $F_2 = \Sigma m(1, 3, 6, 7)$, find $F_1 \cdot F_2$ and $F_1 + F_2$ using K-maps.

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;"><strong>F1 &middot; F2 (AND):</strong> Intersection of 1s</p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">F1 has 1s at: 0, 1, 3, 7</li>
<li style="color: #333; line-height: 1.85;">F2 has 1s at: 1, 3, 6, 7</li>
<li style="color: #333; line-height: 1.85;">Common: <strong>1, 3, 7</strong></li>
</ul>

<p style="color: #333; line-height: 1.85;">F1&middot;F2 = &Sigma;m(1, 3, 7) = A'B'C + A'BC + ABC</p>
<p style="color: #2E7D32; font-weight: 700;">F1 &middot; F2 = C(A' + AB) = C(A' + B)</p>

<p style="color: #333; line-height: 1.85;"><strong>F1 + F2 (OR):</strong> Union of 1s</p>
<p style="color: #333; line-height: 1.85;">Combined: <strong>0, 1, 3, 6, 7</strong></p>

<p style="color: #333; line-height: 1.85;">F1+F2 = &Sigma;m(0, 1, 3, 6, 7) K-map:</p>

<table style="font-size: 0.82rem; margin: 0.5rem auto; border-collapse: collapse;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 4px 10px;"></th><th style="padding: 4px 10px;">BC=00</th><th style="padding: 4px 10px;">BC=01</th><th style="padding: 4px 10px;">BC=11</th><th style="padding: 4px 10px;">BC=10</th></tr></thead>
<tbody>
<tr><td style="padding: 3px 10px; font-weight: 700;">A=0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px;">0</td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px; font-weight: 700;">A=1</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td></tr>
</tbody>
</table>

<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;">F1 + F2 = A'B' + BC + AC</p>
</div>
</details>

---

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 18</h3>

Design a circuit with two outputs:

- SUM = A &oplus; B &oplus; C
- CARRY = AB + BC + AC

Identify any common sub-expressions.

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;">This is a <strong>full adder</strong>!</p>

<p style="color: #333; line-height: 1.85;"><strong>SUM K-map:</strong></p>

<table style="font-size: 0.82rem; margin: 0.5rem auto; border-collapse: collapse;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 4px 10px;"></th><th style="padding: 4px 10px;">BC=00</th><th style="padding: 4px 10px;">BC=01</th><th style="padding: 4px 10px;">BC=11</th><th style="padding: 4px 10px;">BC=10</th></tr></thead>
<tbody>
<tr><td style="padding: 3px 10px; font-weight: 700;">A=0</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px; font-weight: 700;">A=1</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px;">0</td></tr>
</tbody>
</table>

<p style="color: #333; line-height: 1.85;">SUM = A'B'C + A'BC' + AB'C' + ABC (no simplification)</p>
<p style="color: #2E7D32; font-weight: 700;">SUM = A &oplus; B &oplus; C</p>

<p style="color: #333; line-height: 1.85;"><strong>CARRY K-map:</strong></p>

<table style="font-size: 0.82rem; margin: 0.5rem auto; border-collapse: collapse;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 4px 10px;"></th><th style="padding: 4px 10px;">BC=00</th><th style="padding: 4px 10px;">BC=01</th><th style="padding: 4px 10px;">BC=11</th><th style="padding: 4px 10px;">BC=10</th></tr></thead>
<tbody>
<tr><td style="padding: 3px 10px; font-weight: 700;">A=0</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px;">0</td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px; font-weight: 700;">A=1</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td></tr>
</tbody>
</table>

<p style="color: #333; line-height: 1.85;">CARRY = BC + AC + AB (majority function)</p>
<p style="color: #2E7D32; font-weight: 700;">CARRY = AB + BC + AC</p>

<p style="color: #333; line-height: 1.85;"><strong>Common sub-expression:</strong> A &oplus; B can be used:</p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">SUM = (A &oplus; B) &oplus; C</li>
<li style="color: #333; line-height: 1.85;">CARRY = AB + C(A &oplus; B)</li>
</ul>

<p style="color: #333; line-height: 1.85; margin-bottom: 0;">This is the standard half-adder cascade implementation.</p>
</div>
</details>

---

<h2 style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">Section E: Application Problems (2 problems)</h2>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 19</h3>

A security system has 4 sensors (A, B, C, D). The alarm should sound when:

- At least 2 sensors are triggered, OR
- Sensor A is triggered (critical area)

Design using K-map.

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;">Alarm = A + (at least 2 of B, C, D triggered)</p>

<p style="color: #333; line-height: 1.85;">"At least 2" means majority or more: BC, BD, CD, BCD</p>

<p style="color: #333; line-height: 1.85;">F = A + BC + BD + CD</p>

<p style="color: #333; line-height: 1.85;">Verification with K-map (considering A separately):</p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">When A=1: F=1 always (8 minterms)</li>
<li style="color: #333; line-height: 1.85;">When A=0: F=1 when BC + BD + CD</li>
</ul>

<p style="color: #333; line-height: 1.85;">For 4 variables ABCD:</p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">Minterms: all with A=1 (8&ndash;15), plus those with 2+ of BCD:</li>
<li style="color: #333; line-height: 1.85; padding-left: 1.2rem;">m3 (0011): BC</li>
<li style="color: #333; line-height: 1.85; padding-left: 1.2rem;">m5 (0101): BD</li>
<li style="color: #333; line-height: 1.85; padding-left: 1.2rem;">m6 (0110): CD</li>
<li style="color: #333; line-height: 1.85; padding-left: 1.2rem;">m7 (0111): BCD</li>
</ul>

<p style="color: #333; line-height: 1.85;">F = &Sigma;m(3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15)</p>

<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;">Simplified: F = A + BC + BD + CD</p>
</div>
</details>

---

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 20</h3>

Design a combinational lock that opens when the 4-bit input equals either 1001 or 1100.

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;">F = 1 when ABCD = 1001 OR ABCD = 1100</p>

<p style="color: #333; line-height: 1.85;">Minterms: m9 (1001) and m12 (1100)</p>

<p style="color: #333; line-height: 1.85;">K-map:</p>

<table style="font-size: 0.82rem; margin: 0.5rem auto; border-collapse: collapse;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 4px 10px;"></th><th style="padding: 4px 10px;">CD=00</th><th style="padding: 4px 10px;">CD=01</th><th style="padding: 4px 10px;">CD=11</th><th style="padding: 4px 10px;">CD=10</th></tr></thead>
<tbody>
<tr><td style="padding: 3px 10px; font-weight: 700;">AB=00</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px; font-weight: 700;">AB=01</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td></tr>
<tr><td style="padding: 3px 10px; font-weight: 700;">AB=11</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px; font-weight: 700;">AB=10</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td></tr>
</tbody>
</table>

<p style="color: #333; line-height: 1.85;">No simplification possible (cells not adjacent).</p>

<p style="color: #2E7D32; font-weight: 700;">F = ABC'D' + AB'C'D</p>

<p style="color: #333; line-height: 1.85; margin-bottom: 0;">Factored: <strong>F = AC'(B'D + BD') = AC'(B &oplus; D)</strong></p>
</div>
</details>

---

<h2 style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">Summary</h2>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 2rem 0;" markdown>

| Section | Topics Covered | Problem Count |
|---------|---------------|---------------|
| A | 2 and 3-Variable K-Maps | 5 |
| B | 4-Variable K-Maps | 6 |
| C | Don't Care Conditions | 4 |
| D | Multiple Output Functions | 3 |
| E | Applications | 2 |
| **Total** | | **20** |

</div>

</div>
