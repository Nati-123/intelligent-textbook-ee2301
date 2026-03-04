---
title: Unit 3 Challenge - Applications of Boolean Algebra
description: Challenge problems for applications of Boolean algebra — answers only, no solutions
---

<div class="problems-styled" markdown>

<h1 style="color: #5A3EED !important; border-bottom: 3px solid #5A3EED; padding-bottom: 0.4rem; font-weight: 800;">Challenge Problems: Applications of Boolean Algebra</h1>

<p style="color: #555; line-height: 1.85; font-size: 1.05rem; margin-bottom: 2rem;">
These challenge problems test deeper understanding. Only final answers are provided — work through each problem on your own.
</p>

---

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);" markdown>

<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Challenge 1: Circuit Design from Word Problem</p>

<p style="color: #333; line-height: 1.75;">A security system has four sensors: Door (<span class="arithmatex">\(D\)</span>), Window (<span class="arithmatex">\(W\)</span>), Motion (<span class="arithmatex">\(M\)</span>), and Glass-break (<span class="arithmatex">\(G\)</span>). The alarm (<span class="arithmatex">\(A\)</span>) should activate when:</p>

- The door sensor AND at least one other sensor are triggered, OR
- Any three or more sensors are triggered simultaneously

<p style="color: #333; line-height: 1.75;">Write the minimum SOP expression for the alarm output <span class="arithmatex">\(A\)</span>.</p>

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;"><span class="arithmatex">\(A = DW + DM + DG + WMG\)</span></p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">The first three terms cover "door AND at least one other." The last term covers "any three without door" (only <span class="arithmatex">\(WMG\)</span> is possible for three or more without <span class="arithmatex">\(D\)</span>). The case of all four is covered by the first three terms already.</p>
</div>
</details>

</div>

---

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);" markdown>

<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Challenge 2: Full Adder/Subtractor Combined Circuit</p>

<p style="color: #333; line-height: 1.75;">Design a combinational circuit that acts as both a full adder and a full subtractor, controlled by a mode signal <span class="arithmatex">\(M\)</span>. When <span class="arithmatex">\(M = 0\)</span>, it performs <span class="arithmatex">\(A + B + C_{in}\)</span>; when <span class="arithmatex">\(M = 1\)</span>, it performs <span class="arithmatex">\(A - B - C_{in}\)</span> (using two's complement). Give the expressions for the output (<span class="arithmatex">\(Result\)</span>) and the carry/borrow (<span class="arithmatex">\(C_{out}/B_{out}\)</span>).</p>

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;"><span class="arithmatex">\(Result = A \oplus (B \oplus M) \oplus C_{in}\)</span></p>

$$C_{out}/B_{out} = (A \oplus M) \cdot (B \oplus M) + (B \oplus M) \cdot C_{in} + C_{in} \cdot (A \oplus M)$$

<p style="color: #333; line-height: 1.75;">Equivalently, XOR <span class="arithmatex">\(B\)</span> and <span class="arithmatex">\(C_{in}\)</span> with <span class="arithmatex">\(M\)</span> before feeding them to a standard full adder:</p>

$$Result = A \oplus B' \oplus C'_{in} \text{ where } B' = B \oplus M,\; C'_{in} = C_{in} \oplus M$$

$$C_{out} = A \cdot B' + B' \cdot C'_{in} + C'_{in} \cdot A$$

<p style="color: #333; line-height: 1.75; margin-bottom: 0;">When <span class="arithmatex">\(M = 1\)</span>, the initial carry-in should also be 1 to complete the two's complement.</p>
</div>
</details>

</div>

---

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);" markdown>

<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Challenge 3: BCD-to-Excess-3 Converter</p>

<p style="color: #333; line-height: 1.75;">Construct the truth table for a BCD-to-Excess-3 code converter (4-bit input <span class="arithmatex">\(B_3B_2B_1B_0\)</span>, 4-bit output <span class="arithmatex">\(E_3E_2E_1E_0\)</span>). Write the minimum SOP expression for each output bit, using don't-care conditions for invalid BCD inputs (10-15).</p>

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

| BCD ($B_3B_2B_1B_0$) | Excess-3 ($E_3E_2E_1E_0$) |
|---|---|
| 0000 | 0011 |
| 0001 | 0100 |
| 0010 | 0101 |
| 0011 | 0110 |
| 0100 | 0111 |
| 0101 | 1000 |
| 0110 | 1001 |
| 0111 | 1010 |
| 1000 | 1011 |
| 1001 | 1100 |

<p style="color: #2E7D32; font-weight: 700; margin-top: 1rem;">Minimum SOP (with don't cares for inputs 10-15):</p>

$$E_3 = B_3 + B_2 B_1 + B_2 B_0$$

$$E_2 = \overline{B_2}\,B_1 + \overline{B_2}\,B_0 + B_2\,\overline{B_1}\,\overline{B_0}$$

$$E_1 = \overline{B_1}\,\overline{B_0} + B_1 B_0$$

$$E_0 = \overline{B_0}$$

</div>
</details>

</div>

---

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);" markdown>

<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Challenge 4: Parity Generator/Checker Design</p>

<p style="color: #333; line-height: 1.75;">Design an even-parity generator for a 7-bit ASCII input (<span class="arithmatex">\(D_6 D_5 D_4 D_3 D_2 D_1 D_0\)</span>) that produces a parity bit <span class="arithmatex">\(P\)</span>. Then design a parity checker circuit that takes the 8-bit code (<span class="arithmatex">\(D_6 \ldots D_0, P\)</span>) and outputs an error signal <span class="arithmatex">\(E\)</span> that is 1 when a single-bit error is detected. Express both circuits using XOR gates and state the total gate count.</p>

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Parity generator:</p>

$$P = D_6 \oplus D_5 \oplus D_4 \oplus D_3 \oplus D_2 \oplus D_1 \oplus D_0$$

<p style="color: #333; line-height: 1.75;">Requires <strong>6 XOR gates</strong> (cascaded).</p>

<p style="color: #2E7D32; font-weight: 700;">Parity checker:</p>

$$E = D_6 \oplus D_5 \oplus D_4 \oplus D_3 \oplus D_2 \oplus D_1 \oplus D_0 \oplus P$$

<p style="color: #333; line-height: 1.75;"><span class="arithmatex">\(E = 1\)</span> indicates an error (odd number of 1s detected). Requires <strong>7 XOR gates</strong>.</p>

<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;">Total: 13 XOR gates (6 for generator + 7 for checker).</p>
</div>
</details>

</div>

---

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);" markdown>

<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Challenge 5: Multi-Output Combinational Circuit Optimization</p>

<p style="color: #333; line-height: 1.75;">A combinational circuit has three inputs (<span class="arithmatex">\(A\)</span>, <span class="arithmatex">\(B\)</span>, <span class="arithmatex">\(C\)</span>) and three outputs defined as:</p>

- $F_1 = \sum m(0, 2, 3, 5, 7)$
- $F_2 = \sum m(0, 1, 4, 5, 6)$
- $F_3 = \sum m(1, 2, 6, 7)$

<p style="color: #333; line-height: 1.75;">Find the minimum two-level AND-OR implementation for all three outputs using shared product terms where possible. State the total gate count (AND gates + OR gates + inverters).</p>

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Minimum expressions:</p>

$$F_1 = \overline{A}\,\overline{B} + \overline{A}\,C + BC$$

$$F_2 = \overline{B}\,\overline{C} + A\overline{C} + \overline{A}\,\overline{B}$$

$$F_3 = \overline{A}\,\overline{B}\,C + \overline{A}\,B\,\overline{C} + AB\overline{C} + ABC = AB + \overline{B}\,C + \overline{A}\,B\,\overline{C}$$

<p style="color: #333; line-height: 1.75;">Shared term <span class="arithmatex">\(\overline{A}\,\overline{B}\)</span> appears in both <span class="arithmatex">\(F_1\)</span> and <span class="arithmatex">\(F_2\)</span>.</p>

<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;">Total: 8 AND gates, 3 OR gates, 3 inverters = 14 gates</p>
</div>
</details>

</div>

---

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);" markdown>

<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Challenge 6: Carry-Lookahead Adder Design</p>

<p style="color: #333; line-height: 1.75;">For a 4-bit carry-lookahead adder, derive the expression for carry $C_3$ (the carry into bit position 3) directly in terms of the generate ($G$) and propagate ($P$) signals and the initial carry $C_0$. How many gate levels does your expression require?</p>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.75; margin-top: 0;">
Recursive carry equations: <span class="arithmatex">\(C_{i+1} = G_i + P_i C_i\)</span>
</p>
<p style="color: #333; line-height: 1.75;">
<span class="arithmatex">\(C_1 = G_0 + P_0 C_0\)</span>
</p>
<p style="color: #333; line-height: 1.75;">
<span class="arithmatex">\(C_2 = G_1 + P_1 G_0 + P_1 P_0 C_0\)</span>
</p>
<p style="color: #2E7D32; font-weight: 700;">
<span class="arithmatex">\(C_3 = G_2 + P_2 G_1 + P_2 P_1 G_0 + P_2 P_1 P_0 C_0\)</span>
</p>
<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;">
This requires only <strong>2 gate levels</strong> (one AND level, one OR level) after the P and G signals are computed — compared to 6 levels for a ripple-carry adder.
</p>
</div>
</details>

</div>

---

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);" markdown>

<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Challenge 7: Seven-Segment Decoder with Don't Cares</p>

<p style="color: #333; line-height: 1.75;">Design the logic for segment $g$ of a BCD-to-seven-segment decoder. Segment $g$ is the middle horizontal bar, which lights for digits 2, 3, 4, 5, 6, 8, 9. Write the function with don't cares for invalid BCD inputs (10–15) and find the minimum SOP expression.</p>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.75; margin-top: 0;">
<span class="arithmatex">\(g(A,B,C,D) = \Sigma m(2,3,4,5,6,8,9) + d(10,11,12,13,14,15)\)</span>
</p>
<p style="color: #333; line-height: 1.75;">
Using don't cares optimally on a K-map:
</p>
<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;">
Minimum SOP: <span class="arithmatex">\(g = A + B\overline{C} + \overline{B}C + C\overline{D}\)</span>
<br>Simplified further: <span class="arithmatex">\(g = A + B \oplus C + C\overline{D}\)</span>
</p>
</div>
</details>

</div>

---

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);" markdown>

<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Challenge 8: Overflow Detection Circuit</p>

<p style="color: #333; line-height: 1.75;">Design an overflow detection circuit for an 8-bit two's complement adder. The circuit receives the carry into the MSB position ($C_7$) and the carry out of the MSB position ($C_8$). Write the Boolean expression for the overflow flag $V$, draw the gate implementation, and explain why $V = C_7 \oplus C_8$ correctly detects overflow for both addition and subtraction.</p>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">
<span class="arithmatex">\(V = C_7 \oplus C_8\)</span> (single XOR gate)
</p>
<p style="color: #333; line-height: 1.75;">
<strong>Why it works:</strong> Overflow occurs when the sign of the result is wrong. This happens only when:
</p>
<p style="color: #333; line-height: 1.75;">
- Two positive numbers produce a negative result: <span class="arithmatex">\(C_7 = 1\)</span> (carry into sign bit flips it), <span class="arithmatex">\(C_8 = 0\)</span> → <span class="arithmatex">\(V = 1\)</span>
</p>
<p style="color: #333; line-height: 1.75;">
- Two negative numbers produce a positive result: <span class="arithmatex">\(C_7 = 0\)</span>, <span class="arithmatex">\(C_8 = 1\)</span> → <span class="arithmatex">\(V = 1\)</span>
</p>
<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;">
When <span class="arithmatex">\(C_7 = C_8\)</span>, the carries are consistent and the sign bit is correct, so <span class="arithmatex">\(V = 0\)</span>. This works for subtraction because subtraction is implemented as addition with the two's complement of the subtrahend.
</p>
</div>
</details>

</div>

</div>
