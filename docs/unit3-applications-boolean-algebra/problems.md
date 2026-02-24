---
title: Unit 3 Problems - Applications of Boolean Algebra
description: Practice problems for adders, subtractors, comparators, and decoders
---

<div class="problems-styled" markdown>

<h1 style="color: #5A3EED !important; border-bottom: 3px solid #5A3EED; padding-bottom: 0.4rem; font-weight: 800; margin-bottom: 1.5rem;">End-of-Unit Problems: Applications of Boolean Algebra</h1>

<p style="color: #555; line-height: 1.85; font-size: 1.05rem; margin-bottom: 2rem;">
Work through these problems to reinforce your understanding of combinational circuit applications including adders, subtractors, comparators, and decoders.
</p>

---

<h2 style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">Section A: Half Adder and Full Adder (5 problems)</h2>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 1</h3>
Design a half adder and verify it works for all input combinations.

a) Write the truth table
b) Derive the Boolean expressions for Sum and Carry
c) Verify with inputs A=1, B=1

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;"><strong>a)</strong> Truth table:</p>

<table style="font-size: 0.82rem; margin: 0.5rem auto; border-collapse: collapse;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 4px 10px;">A</th><th style="padding: 4px 10px;">B</th><th style="padding: 4px 10px;">Sum</th><th style="padding: 4px 10px;">Carry</th></tr></thead>
<tbody>
<tr><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px;">0</td></tr>
<tr><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px;">0</td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td></tr>
</tbody>
</table>

<p style="color: #333; line-height: 1.85;"><strong>b)</strong> Boolean expressions:</p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;"><strong>Sum = A &oplus; B = A'B + AB'</strong></li>
<li style="color: #333; line-height: 1.85;"><strong>Carry = A &middot; B</strong></li>
</ul>

<p style="color: #333; line-height: 1.85;"><strong>c)</strong> For A=1, B=1:</p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">Sum = 1 &oplus; 1 = 0</li>
<li style="color: #333; line-height: 1.85;">Carry = 1 &middot; 1 = 1</li>
<li style="color: #333; line-height: 1.85; margin-bottom: 0;">Result: <span class="arithmatex">\(10_2 = 2_{10}\)</span> (1+1=2)</li>
</ul>
</div>
</details>

---

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 2</h3>
Design a full adder using half adders.

a) Draw the block diagram
b) Write the Boolean expressions for Sum and Cout
c) Calculate the output for A=1, B=1, Cin=1

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;"><strong>a)</strong> Block diagram uses two half adders and an OR gate:</p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">HA1: inputs A, B &rarr; Sum1, Carry1</li>
<li style="color: #333; line-height: 1.85;">HA2: inputs Sum1, Cin &rarr; Sum, Carry2</li>
<li style="color: #333; line-height: 1.85;">OR: Carry1 + Carry2 &rarr; Cout</li>
</ul>

<p style="color: #333; line-height: 1.85;"><strong>b)</strong> Boolean expressions:</p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;"><strong>Sum = A &oplus; B &oplus; Cin</strong></li>
<li style="color: #333; line-height: 1.85;"><strong>Cout = AB + (A &oplus; B)Cin = AB + ACin + BCin</strong></li>
</ul>

<p style="color: #333; line-height: 1.85;"><strong>c)</strong> For A=1, B=1, Cin=1:</p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">Sum = 1 &oplus; 1 &oplus; 1 = 0 &oplus; 1 = 1</li>
<li style="color: #333; line-height: 1.85;">Cout = (1&middot;1) + (1&middot;1) + (1&middot;1) = 1 + 1 + 1 = 1</li>
<li style="color: #333; line-height: 1.85; margin-bottom: 0;">Result: <span class="arithmatex">\(11_2 = 3_{10}\)</span> (1+1+1=3)</li>
</ul>
</div>
</details>

---

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 3</h3>
A 4-bit ripple carry adder adds A = 1011 and B = 0110.

a) Show the carry propagation through each full adder
b) What is the final sum?
c) Is there an overflow?

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;">Adding A = 1011 (11) and B = 0110 (6):</p>

<table style="font-size: 0.82rem; margin: 0.5rem auto; border-collapse: collapse;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 4px 10px;">Position</th><th style="padding: 4px 10px;">3</th><th style="padding: 4px 10px;">2</th><th style="padding: 4px 10px;">1</th><th style="padding: 4px 10px;">0</th></tr></thead>
<tbody>
<tr><td style="padding: 3px 10px; font-weight: 700;">A</td><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px;">1</td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px; font-weight: 700;">B</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px;">0</td></tr>
<tr><td style="padding: 3px 10px; font-weight: 700;">Cin</td><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px;">0</td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px; font-weight: 700;">Sum</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td></tr>
<tr><td style="padding: 3px 10px; font-weight: 700;">Cout</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px;">0</td></tr>
</tbody>
</table>

<p style="color: #333; line-height: 1.85;"><strong>a)</strong> Carry propagation:</p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">Bit 0: 1+0+0 = 01, Sum=1, Cout=0</li>
<li style="color: #333; line-height: 1.85;">Bit 1: 1+1+0 = 10, Sum=0, Cout=1</li>
<li style="color: #333; line-height: 1.85;">Bit 2: 0+1+1 = 10, Sum=0, Cout=1</li>
<li style="color: #333; line-height: 1.85;">Bit 3: 1+0+1 = 10, Sum=0, Cout=1</li>
</ul>

<p style="color: #333; line-height: 1.85;"><strong>b)</strong> Sum = <strong>10001<sub>2</sub></strong> (but only 4 bits shown as 0001 with carry out). Complete answer: <strong>17<sub>10</sub></strong></p>

<p style="color: #333; line-height: 1.85; margin-bottom: 0;"><strong>c)</strong> For unsigned: Yes, there is a carry out, so <strong>overflow</strong> (result &gt; 15). Actual result 17 does not fit in 4 bits.</p>
</div>
</details>

---

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 4</h3>
Design a circuit that adds three 1-bit numbers (A, B, C).

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;">The output range is 0 to 3, requiring 2 output bits (S1, S0).</p>

<p style="color: #333; line-height: 1.85;">Truth table:</p>

<table style="font-size: 0.82rem; margin: 0.5rem auto; border-collapse: collapse;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 4px 10px;">A</th><th style="padding: 4px 10px;">B</th><th style="padding: 4px 10px;">C</th><th style="padding: 4px 10px;">S1</th><th style="padding: 4px 10px;">S0</th><th style="padding: 4px 10px;">Decimal</th></tr></thead>
<tbody>
<tr><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px;">1</td></tr>
<tr><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px;">1</td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">2</td></tr>
<tr><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px;">1</td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">2</td></tr>
<tr><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">2</td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px;">3</td></tr>
</tbody>
</table>

<p style="color: #333; line-height: 1.85;">Expressions:</p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;"><strong>S0 = A &oplus; B &oplus; C</strong> (odd parity)</li>
<li style="color: #333; line-height: 1.85;"><strong>S1 = AB + BC + AC</strong> (majority function)</li>
</ul>

<p style="color: #333; line-height: 1.85; margin-bottom: 0;">This is exactly a <strong>full adder</strong> circuit!</p>
</div>
</details>

---

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 5</h3>
Calculate the worst-case propagation delay for an 8-bit ripple carry adder if each full adder has:

- XOR gate delay: 10 ns
- AND gate delay: 5 ns
- OR gate delay: 5 ns

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;">In a ripple carry adder, the critical path is the carry chain.</p>

<p style="color: #333; line-height: 1.85;">For each full adder:</p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">Carry out = AB + (A &oplus; B)Cin</li>
<li style="color: #333; line-height: 1.85;">Time for carry: max(AND delay, XOR+AND) + OR delay</li>
<li style="color: #333; line-height: 1.85;">Critical carry path per stage: 5 + 5 = 10 ns (or 10+5+5=20ns through XOR path)</li>
</ul>

<p style="color: #333; line-height: 1.85;">The carry path through each FA: Cin to Cout through AND-OR: ~10 ns per stage</p>

<p style="color: #333; line-height: 1.85;">For 8 bits: <strong>8 &times; 10 ns = 80 ns</strong> worst case</p>

<p style="color: #333; line-height: 1.85; margin-bottom: 0;">(Note: The first bit also needs time to generate its carry from A, B inputs)</p>
</div>
</details>

---

<h2 style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">Section B: Subtractor Circuits (4 problems)</h2>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 6</h3>
Design a half subtractor.

a) Write the truth table (A - B)
b) Derive expressions for Difference and Borrow

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;"><strong>a)</strong> Truth table for A - B:</p>

<table style="font-size: 0.82rem; margin: 0.5rem auto; border-collapse: collapse;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 4px 10px;">A</th><th style="padding: 4px 10px;">B</th><th style="padding: 4px 10px;">Difference</th><th style="padding: 4px 10px;">Borrow</th></tr></thead>
<tbody>
<tr><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td></tr>
<tr><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px;">0</td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td></tr>
</tbody>
</table>

<p style="color: #333; line-height: 1.85;"><strong>b)</strong> Boolean expressions:</p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0 0;">
<li style="color: #333; line-height: 1.85;"><strong>Difference = A &oplus; B</strong> (same as half adder Sum)</li>
<li style="color: #333; line-height: 1.85; margin-bottom: 0;"><strong>Borrow = A'B</strong> (need to borrow when A=0, B=1)</li>
</ul>
</div>
</details>

---

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 7</h3>
Design an adder/subtractor circuit for 4-bit numbers using a control signal M (M=0 for add, M=1 for subtract).

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;">The key insight: A - B = A + (-B) = A + (B' + 1) in two's complement</p>

<p style="color: #333; line-height: 1.85;">Design:</p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;"><strong>1.</strong> XOR each bit of B with control M</li>
<li style="color: #333; line-height: 1.85; padding-left: 1.2rem;">When M=0: B &oplus; 0 = B (addition)</li>
<li style="color: #333; line-height: 1.85; padding-left: 1.2rem;">When M=1: B &oplus; 1 = B' (complement for subtraction)</li>
<li style="color: #333; line-height: 1.85;"><strong>2.</strong> Connect M to Cin of the first full adder</li>
<li style="color: #333; line-height: 1.85; padding-left: 1.2rem;">When M=0: Cin=0 (normal add)</li>
<li style="color: #333; line-height: 1.85; padding-left: 1.2rem;">When M=1: Cin=1 (adds the +1 for two's complement)</li>
</ul>

<p style="color: #333; line-height: 1.85;">Circuit: <strong>4-bit adder with B inputs XORed with M, and Cin = M</strong></p>

<p style="color: #333; line-height: 1.85; margin-bottom: 0;">Expression for each B input: <span class="arithmatex">\(B_i \oplus M\)</span></p>
</div>
</details>

---

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 8</h3>
Perform 4-bit subtraction using two's complement: 1001 - 0101

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;">A = 1001 (9), B = 0101 (5)<br>
A - B = A + (-B)</p>

<p style="color: #333; line-height: 1.85;"><strong>Step 1:</strong> Find two's complement of B</p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">B = 0101</li>
<li style="color: #333; line-height: 1.85;">B' = 1010</li>
<li style="color: #333; line-height: 1.85;">-B = B' + 1 = 1011</li>
</ul>

<p style="color: #333; line-height: 1.85;"><strong>Step 2:</strong> Add A + (-B)</p>
<pre style="background: #f5f5f5; border-radius: 6px; padding: 10px 16px; font-size: 0.9rem; margin: 0.5rem 0;">    1001
  + 1011
  ------
   10100</pre>

<p style="color: #333; line-height: 1.85;"><strong>Step 3:</strong> Discard carry (5th bit), result = <strong>0100<sub>2</sub> = 4<sub>10</sub></strong></p>

<p style="color: #333; line-height: 1.85; margin-bottom: 0;">Check: 9 - 5 = 4</p>
</div>
</details>

---

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 9</h3>
What happens when you subtract a larger number from a smaller one using 4-bit two's complement?
Calculate: 0011 - 0111 (3 - 7)

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;">A = 0011 (3), B = 0111 (7)</p>

<p style="color: #333; line-height: 1.85;"><strong>Step 1:</strong> Two's complement of B</p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">B' = 1000</li>
<li style="color: #333; line-height: 1.85;">-B = 1001</li>
</ul>

<p style="color: #333; line-height: 1.85;"><strong>Step 2:</strong> Add A + (-B)</p>
<pre style="background: #f5f5f5; border-radius: 6px; padding: 10px 16px; font-size: 0.9rem; margin: 0.5rem 0;">    0011
  + 1001
  ------
    1100</pre>

<p style="color: #333; line-height: 1.85;"><strong>Step 3:</strong> No carry out. Result = 1100<sub>2</sub></p>

<p style="color: #333; line-height: 1.85;"><strong>Step 4:</strong> Interpret as two's complement:</p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">MSB = 1, so negative</li>
<li style="color: #333; line-height: 1.85;">Take two's complement of 1100: 0011 + 1 = 0100 = 4</li>
<li style="color: #333; line-height: 1.85;">Result = <strong>-4</strong></li>
</ul>

<p style="color: #333; line-height: 1.85; margin-bottom: 0;">Check: 3 - 7 = -4</p>
</div>
</details>

---

<h2 style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">Section C: Comparators (4 problems)</h2>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 10</h3>
Design a 1-bit comparator that outputs three signals:

- G (A > B)
- E (A = B)
- L (A < B)

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;">Truth table:</p>

<table style="font-size: 0.82rem; margin: 0.5rem auto; border-collapse: collapse;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 4px 10px;">A</th><th style="padding: 4px 10px;">B</th><th style="padding: 4px 10px;">G</th><th style="padding: 4px 10px;">E</th><th style="padding: 4px 10px;">L</th></tr></thead>
<tbody>
<tr><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px;">0</td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td></tr>
<tr><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px;">0</td></tr>
</tbody>
</table>

<p style="color: #333; line-height: 1.85;">Boolean expressions:</p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0 0;">
<li style="color: #333; line-height: 1.85;"><strong>G = AB'</strong> (A greater when A=1, B=0)</li>
<li style="color: #333; line-height: 1.85;"><strong>E = A &odot; B = (A &oplus; B)'</strong> (Equal when same)</li>
<li style="color: #333; line-height: 1.85; margin-bottom: 0;"><strong>L = A'B</strong> (A less when A=0, B=1)</li>
</ul>
</div>
</details>

---

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 11</h3>
Design a 2-bit magnitude comparator.

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;">Inputs: A1A0 and B1B0</p>

<p style="color: #333; line-height: 1.85;">Compare MSB first, then LSB:</p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">If A1 &gt; B1: A &gt; B</li>
<li style="color: #333; line-height: 1.85;">If A1 &lt; B1: A &lt; B</li>
<li style="color: #333; line-height: 1.85;">If A1 = B1: compare A0 and B0</li>
</ul>

<p style="color: #333; line-height: 1.85;">Boolean expressions:</p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;"><strong>G = A1B1' + (A1 &odot; B1) &middot; A0B0'</strong></li>
<li style="color: #333; line-height: 1.85;"><strong>L = A1'B1 + (A1 &odot; B1) &middot; A0'B0</strong></li>
<li style="color: #333; line-height: 1.85;"><strong>E = (A1 &odot; B1) &middot; (A0 &odot; B0)</strong></li>
</ul>

<p style="color: #333; line-height: 1.85; margin-bottom: 0;">Simplified:<br>
G = A1B1' + A0B0'(A1 &odot; B1)<br>
L = A1'B1 + A0'B0(A1 &odot; B1)<br>
E = (A1 &oplus; B1)'(A0 &oplus; B0)'</p>
</div>
</details>

---

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 12</h3>
Compare the numbers A = 1011 and B = 1010 using a 4-bit comparator.

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;">A = <span class="arithmatex">\(1011_2 = 11_{10}\)</span><br>
B = <span class="arithmatex">\(1010_2 = 10_{10}\)</span></p>

<p style="color: #333; line-height: 1.85;">Bit-by-bit comparison (MSB to LSB):</p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">Bit 3: A3=1, B3=1 &rarr; Equal, continue</li>
<li style="color: #333; line-height: 1.85;">Bit 2: A2=0, B2=0 &rarr; Equal, continue</li>
<li style="color: #333; line-height: 1.85;">Bit 1: A1=1, B1=1 &rarr; Equal, continue</li>
<li style="color: #333; line-height: 1.85;">Bit 0: A0=1, B0=0 &rarr; A0 &gt; B0</li>
</ul>

<p style="color: #333; line-height: 1.85; margin-bottom: 0;">Result: <strong>A &gt; B</strong> (G=1, E=0, L=0)</p>
</div>
</details>

---

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 13</h3>
Design a circuit that determines if a 4-bit number is within the range 5 to 10 (inclusive).

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;">Need: <span class="arithmatex">\(5 \leq N \leq 10\)</span>, where N = N3N2N1N0</p>

<p style="color: #333; line-height: 1.85;">Using comparators:</p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">Compare N &ge; 5 (0101)</li>
<li style="color: #333; line-height: 1.85;">Compare N &le; 10 (1010)</li>
<li style="color: #333; line-height: 1.85;">AND the results</li>
</ul>

<p style="color: #333; line-height: 1.85;">Alternative &mdash; list valid values:<br>
5 = 0101, 6 = 0110, 7 = 0111, 8 = 1000, 9 = 1001, 10 = 1010</p>

<p style="color: #333; line-height: 1.85;"><strong>InRange = (N &ge; 5) &middot; (N &le; 10)</strong></p>

<p style="color: #333; line-height: 1.85; margin-bottom: 0;">Or direct implementation:<br>
InRange = N3'N2N0 + N3'N2N1 + N3N2'N1' = <span class="arithmatex">\(\Sigma m(5,6,7,8,9,10)\)</span></p>
</div>
</details>

---

<h2 style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">Section D: Decoders and Encoders (4 problems)</h2>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 14</h3>
Design a 2-to-4 decoder with an enable input E.

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;">Inputs: E (enable), A1, A0<br>
Outputs: Y0, Y1, Y2, Y3</p>

<p style="color: #333; line-height: 1.85;">When E=0, all outputs = 0<br>
When E=1, one output is active based on A1A0</p>

<p style="color: #333; line-height: 1.85;">Truth table (E=1):</p>

<table style="font-size: 0.82rem; margin: 0.5rem auto; border-collapse: collapse;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 4px 10px;">A1</th><th style="padding: 4px 10px;">A0</th><th style="padding: 4px 10px;">Y0</th><th style="padding: 4px 10px;">Y1</th><th style="padding: 4px 10px;">Y2</th><th style="padding: 4px 10px;">Y3</th></tr></thead>
<tbody>
<tr><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td></tr>
<tr><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px;">0</td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td></tr>
</tbody>
</table>

<p style="color: #333; line-height: 1.85;">Boolean expressions:</p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0 0;">
<li style="color: #333; line-height: 1.85;"><strong>Y0 = E &middot; A1' &middot; A0'</strong></li>
<li style="color: #333; line-height: 1.85;"><strong>Y1 = E &middot; A1' &middot; A0</strong></li>
<li style="color: #333; line-height: 1.85;"><strong>Y2 = E &middot; A1 &middot; A0'</strong></li>
<li style="color: #333; line-height: 1.85; margin-bottom: 0;"><strong>Y3 = E &middot; A1 &middot; A0</strong></li>
</ul>
</div>
</details>

---

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 15</h3>
Implement the function F(A, B, C) = <span class="arithmatex">\(\Sigma m(1, 2, 6, 7)\)</span> using a 3-to-8 decoder.

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;">A 3-to-8 decoder generates all 8 minterms m0 through m7.</p>

<p style="color: #333; line-height: 1.85;">For F = <span class="arithmatex">\(\Sigma m(1, 2, 6, 7)\)</span>:</p>

<p style="color: #333; line-height: 1.85;"><strong>F = m1 + m2 + m6 + m7</strong></p>

<p style="color: #333; line-height: 1.85;">Connect decoder outputs:</p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">Y1 (m1), Y2 (m2), Y6 (m6), Y7 (m7) to a 4-input OR gate</li>
</ul>

<p style="color: #333; line-height: 1.85; margin-bottom: 0;">Circuit: 3-to-8 decoder + 4-input OR gate</p>
</div>
</details>

---

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 16</h3>
Design a priority encoder for 4 inputs (D3, D2, D1, D0) where D3 has highest priority.

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;">Outputs: Y1, Y0 (binary code), V (valid &mdash; at least one input active)</p>

<p style="color: #333; line-height: 1.85;">Priority: If D3=1, output 11 regardless of other inputs</p>

<table style="font-size: 0.82rem; margin: 0.5rem auto; border-collapse: collapse;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 4px 10px;">D3</th><th style="padding: 4px 10px;">D2</th><th style="padding: 4px 10px;">D1</th><th style="padding: 4px 10px;">D0</th><th style="padding: 4px 10px;">Y1</th><th style="padding: 4px 10px;">Y0</th><th style="padding: 4px 10px;">V</th></tr></thead>
<tbody>
<tr><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">X</td><td style="padding: 3px 10px;">X</td><td style="padding: 3px 10px;">0</td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td></tr>
<tr><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px;">X</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px;">X</td><td style="padding: 3px 10px;">X</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td></tr>
<tr><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px;">X</td><td style="padding: 3px 10px;">X</td><td style="padding: 3px 10px;">X</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td></tr>
</tbody>
</table>

<p style="color: #333; line-height: 1.85;">Boolean expressions:</p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0 0;">
<li style="color: #333; line-height: 1.85;"><strong>Y1 = D3 + D2</strong></li>
<li style="color: #333; line-height: 1.85;"><strong>Y0 = D3 + D2'D1</strong></li>
<li style="color: #333; line-height: 1.85; margin-bottom: 0;"><strong>V = D3 + D2 + D1 + D0</strong></li>
</ul>
</div>
</details>

---

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 17</h3>
Design a BCD to 7-segment decoder for displaying digit 5.

a) What segments should be ON for digit 5?
b) Write the segment pattern

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;">7-segment display layout:</p>

<pre style="background: #f5f5f5; border-radius: 6px; padding: 10px 16px; font-size: 0.9rem; margin: 0.5rem 0;">   a
  ---
f|   |b
  -g-
e|   |c
  ---
   d</pre>

<p style="color: #333; line-height: 1.85;"><strong>a)</strong> For digit 5: <strong>segments a, c, d, f, g should be ON</strong><br>
(5 looks like: top bar, top-left, middle, bottom-right, bottom)</p>

<p style="color: #333; line-height: 1.85;"><strong>b)</strong> Segment pattern (1=ON):</p>

<table style="font-size: 0.82rem; margin: 0.5rem auto; border-collapse: collapse;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 4px 10px;">Segment</th><th style="padding: 4px 10px;">a</th><th style="padding: 4px 10px;">b</th><th style="padding: 4px 10px;">c</th><th style="padding: 4px 10px;">d</th><th style="padding: 4px 10px;">e</th><th style="padding: 4px 10px;">f</th><th style="padding: 4px 10px;">g</th></tr></thead>
<tbody>
<tr><td style="padding: 3px 10px; font-weight: 700;">Digit 5</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td></tr>
</tbody>
</table>

<p style="color: #333; line-height: 1.85; margin-bottom: 0;">Pattern: <strong>1011011</strong> (or in hex for active-high: 6D)</p>
</div>
</details>

---

<h2 style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">Section E: Application Problems (3 problems)</h2>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 18</h3>
Design a binary coded decimal (BCD) adder that adds two BCD digits and produces a BCD sum.

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;">BCD digits range from 0&ndash;9. When adding two BCD digits + carry:</p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">If sum &le; 9: result is valid BCD</li>
<li style="color: #333; line-height: 1.85;">If sum &gt; 9: add 6 (0110) to correct</li>
</ul>

<p style="color: #333; line-height: 1.85;">Correction needed when:</p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">Sum &gt; 9 (binary sum 1010 to 1111), OR</li>
<li style="color: #333; line-height: 1.85;">Carry out from 4-bit addition</li>
</ul>

<p style="color: #333; line-height: 1.85;">Circuit design:</p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;"><strong>1.</strong> Add the two 4-bit BCD digits using a 4-bit adder</li>
<li style="color: #333; line-height: 1.85;"><strong>2.</strong> Check if sum &gt; 9 OR carry out</li>
<li style="color: #333; line-height: 1.85;"><strong>3.</strong> If yes, add 6 using another 4-bit adder</li>
<li style="color: #333; line-height: 1.85;"><strong>4.</strong> Output the carry</li>
</ul>

<p style="color: #333; line-height: 1.85; margin-bottom: 0;"><strong>Correction condition: C4 + S3S2 + S3S1 = 1</strong></p>
</div>
</details>

---

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 19</h3>
A vending machine accepts quarters (25&cent;) only. Design a circuit that indicates when 75&cent; or more has been deposited.

Let Q2, Q1, Q0 represent the count of quarters (0&ndash;7).

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;">75&cent; = 3 quarters, so we need Q &ge; 3</p>

<p style="color: #333; line-height: 1.85;">Q (count) in binary: Q2Q1Q0</p>

<table style="font-size: 0.82rem; margin: 0.5rem auto; border-collapse: collapse;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 4px 10px;">Quarters</th><th style="padding: 4px 10px;">Q2</th><th style="padding: 4px 10px;">Q1</th><th style="padding: 4px 10px;">Q0</th><th style="padding: 4px 10px;">Output</th></tr></thead>
<tbody>
<tr><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px;">0</td></tr>
<tr><td style="padding: 3px 10px;">2</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px;">3</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td></tr>
<tr><td style="padding: 3px 10px;">4</td><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px;">5</td><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td></tr>
<tr><td style="padding: 3px 10px;">6</td><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px;">7</td><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">1</td></tr>
</tbody>
</table>

<p style="color: #333; line-height: 1.85; margin-bottom: 0;"><strong>F = Q2 + Q1Q0</strong></p>
</div>
</details>

---

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 20</h3>
Design a 4-bit parity generator that outputs 1 if the input has an odd number of 1s.

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;">For inputs A, B, C, D:</p>

<p style="color: #333; line-height: 1.85;"><strong>Parity = A &oplus; B &oplus; C &oplus; D</strong></p>

<p style="color: #333; line-height: 1.85;">The XOR of all bits equals 1 when there is an odd number of 1s.</p>

<p style="color: #333; line-height: 1.85;">Implementation:</p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">Use three 2-input XOR gates:</li>
<li style="color: #333; line-height: 1.85; padding-left: 1.2rem;"><strong>1.</strong> XOR1: A &oplus; B</li>
<li style="color: #333; line-height: 1.85; padding-left: 1.2rem;"><strong>2.</strong> XOR2: C &oplus; D</li>
<li style="color: #333; line-height: 1.85; padding-left: 1.2rem;"><strong>3.</strong> XOR3: XOR1 &oplus; XOR2</li>
</ul>

<p style="color: #333; line-height: 1.85; margin-bottom: 0;">This creates <strong>odd parity</strong> (total 1s including parity bit is odd).</p>
</div>
</details>

---

<h2 style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">Summary</h2>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

| Section | Topics Covered | Problem Count |
|---------|---------------|---------------|
| A | Half/Full Adders | 5 |
| B | Subtractors | 4 |
| C | Comparators | 4 |
| D | Decoders/Encoders | 4 |
| E | Applications | 3 |
| **Total** | | **20** |

</div>

</div>
