---
title: Unit 2 Problems - Boolean Algebra
description: Practice problems for Boolean algebra, logic gates, and theorems
---

<div class="problems-styled" markdown>

# End-of-Unit Problems: Boolean Algebra

Work through these problems to reinforce your understanding of Boolean algebra and logic gates.

---

## Section A: Basic Logic Gates (6 problems)

### Problem 1
Complete the truth tables for the following gates:

a) 3-input AND gate
b) 3-input OR gate
c) 3-input NAND gate

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>
<p style="color: #333; line-height: 1.85; margin-top: 0;"><strong>a) 3-input AND</strong> (output = 1 only when ALL inputs = 1)</p>

| A | B | C | Y |
|---|---|---|---|
| 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 0 |
| 0 | 1 | 0 | 0 |
| 0 | 1 | 1 | 0 |
| 1 | 0 | 0 | 0 |
| 1 | 0 | 1 | 0 |
| 1 | 1 | 0 | 0 |
| 1 | 1 | 1 | 1 |

<p style="color: #333; line-height: 1.85;"><strong>b) 3-input OR</strong> (output = 1 when ANY input = 1)</p>

| A | B | C | Y |
|---|---|---|---|
| 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 1 |
| 0 | 1 | 0 | 1 |
| 0 | 1 | 1 | 1 |
| 1 | 0 | 0 | 1 |
| 1 | 0 | 1 | 1 |
| 1 | 1 | 0 | 1 |
| 1 | 1 | 1 | 1 |

<p style="color: #333; line-height: 1.85;"><strong>c) 3-input NAND</strong> (inverse of 3-input AND)</p>

| A | B | C | Y |
|---|---|---|---|
| 0 | 0 | 0 | 1 |
| 0 | 0 | 1 | 1 |
| 0 | 1 | 0 | 1 |
| 0 | 1 | 1 | 1 |
| 1 | 0 | 0 | 1 |
| 1 | 0 | 1 | 1 |
| 1 | 1 | 0 | 1 |
| 1 | 1 | 1 | 0 |

</div>
</details>

---

### Problem 2
Determine the output of each gate for the given inputs:

a) AND gate: A=1, B=0
b) OR gate: A=0, B=0
c) XOR gate: A=1, B=1
d) NAND gate: A=1, B=1
e) NOR gate: A=0, B=1
f) XNOR gate: A=1, B=0

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;"><strong>a)</strong> AND(1, 0) = 1 &middot; 0 = <strong>0</strong></p>
<p style="color: #333; line-height: 1.85;"><strong>b)</strong> OR(0, 0) = 0 + 0 = <strong>0</strong></p>
<p style="color: #333; line-height: 1.85;"><strong>c)</strong> XOR(1, 1) = 1 &oplus; 1 = <strong>0</strong></p>
<p style="color: #333; line-height: 1.85;"><strong>d)</strong> NAND(1, 1) = (1 &middot; 1)' = 1' = <strong>0</strong></p>
<p style="color: #333; line-height: 1.85;"><strong>e)</strong> NOR(0, 1) = (0 + 1)' = 1' = <strong>0</strong></p>
<p style="color: #333; line-height: 1.85; margin-bottom: 0;"><strong>f)</strong> XNOR(1, 0) = (1 &oplus; 0)' = 1' = <strong>0</strong></p>
</div>
</details>

---

### Problem 3
For the circuit: Y = ((A · B) + C)'

a) Create the truth table
b) Identify the output for A=1, B=1, C=0

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>
<p style="color: #333; line-height: 1.85; margin-top: 0;"><strong>a)</strong> Truth table:</p>

| A | B | C | A&middot;B | (A&middot;B)+C | Y=((A&middot;B)+C)' |
|---|---|---|-----|---------|--------------|
| 0 | 0 | 0 |  0  |    0    |      1       |
| 0 | 0 | 1 |  0  |    1    |      0       |
| 0 | 1 | 0 |  0  |    0    |      1       |
| 0 | 1 | 1 |  0  |    1    |      0       |
| 1 | 0 | 0 |  0  |    0    |      1       |
| 1 | 0 | 1 |  0  |    1    |      0       |
| 1 | 1 | 0 |  1  |    1    |      0       |
| 1 | 1 | 1 |  1  |    1    |      0       |

<p style="color: #333; line-height: 1.85; margin-bottom: 0;"><strong>b)</strong> A=1, B=1, C=0: (1&middot;1)+0 = 1, Y = 1' = <strong>0</strong></p>
</div>
</details>

---

## Section B: Boolean Algebra Laws (8 problems)

### Problem 4
Identify which Boolean law is illustrated in each equation:

a) A + 0 = A
b) A · A' = 0
c) A + (B · C) = (A + B) · (A + C)
d) (A · B)' = A' + B'
e) A + A = A
f) A · (A + B) = A

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;"><strong>a)</strong> <strong>Identity Law</strong> (OR with 0)</p>
<p style="color: #333; line-height: 1.85;"><strong>b)</strong> <strong>Complement Law</strong> (AND with complement)</p>
<p style="color: #333; line-height: 1.85;"><strong>c)</strong> <strong>Distributive Law</strong> (OR over AND)</p>
<p style="color: #333; line-height: 1.85;"><strong>d)</strong> <strong>De Morgan's Theorem</strong> (NAND form)</p>
<p style="color: #333; line-height: 1.85;"><strong>e)</strong> <strong>Idempotent Law</strong> (OR form)</p>
<p style="color: #333; line-height: 1.85; margin-bottom: 0;"><strong>f)</strong> <strong>Absorption Law</strong></p>
</div>
</details>

---

### Problem 5
Prove the following using Boolean algebra laws:

A + A'B = A + B

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;">Starting with: A + A'B</p>
<p style="color: #333; line-height: 1.85;">Step 1: A + A'B = A&middot;1 + A'B (Identity law)</p>
<p style="color: #333; line-height: 1.85;">Step 2: = A&middot;(1) + A'B (Rewrite)</p>
<p style="color: #333; line-height: 1.85;">Step 3: = A&middot;(1 + B) + A'B (Identity: 1 + B = 1)</p>
<p style="color: #333; line-height: 1.85;">Step 4: = A + AB + A'B (Distributive)</p>
<p style="color: #333; line-height: 1.85;">Step 5: = A + B(A + A') (Factor out B)</p>
<p style="color: #333; line-height: 1.85;">Step 6: = A + B&middot;1 (Complement: A + A' = 1)</p>
<p style="color: #333; line-height: 1.85; margin-bottom: 0;">Step 7: = <strong>A + B</strong> &#10003;</p>
</div>
</details>

---

### Problem 6
Simplify using Boolean algebra:

a) AB + AB' + A'B
b) (A + B)(A + B')
c) A'B'C + A'BC + AB'C + ABC

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;"><strong>a)</strong> AB + AB' + A'B<br>
= A(B + B') + A'B (Factor A)<br>
= A&middot;1 + A'B (Complement law)<br>
= A + A'B<br>
= <strong>A + B</strong> (Absorption)</p>
<p style="color: #333; line-height: 1.85;"><strong>b)</strong> (A + B)(A + B')<br>
= AA + AB' + BA + BB' (FOIL)<br>
= A + AB' + AB + 0 (Idempotent, Complement)<br>
= A + A(B' + B) (Factor)<br>
= A + A&middot;1 = <strong>A</strong> (Absorption)</p>
<p style="color: #333; line-height: 1.85; margin-bottom: 0;"><strong>c)</strong> A'B'C + A'BC + AB'C + ABC<br>
= A'C(B' + B) + AC(B' + B) (Factor)<br>
= A'C&middot;1 + AC&middot;1 (Complement)<br>
= A'C + AC<br>
= C(A' + A) = <strong>C</strong> (Complement)</p>
</div>
</details>

---

### Problem 7
Apply De Morgan's theorem to find the complement:

a) (AB + CD)'
b) (A + B)(C + D)'
c) ((A + B)'C)'

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;"><strong>a)</strong> (AB + CD)' = (AB)' &middot; (CD)' (De Morgan: break OR)<br>
= (A' + B')(C' + D') (De Morgan on each term)</p>
<p style="color: #333; line-height: 1.85;"><strong>b)</strong> First, let X = (A + B)(C + D)<br>
X' = ((A + B)(C + D))'<br>
= (A + B)' + (C + D)' (De Morgan: break AND)<br>
= <strong>A'B' + C'D'</strong> (De Morgan on each term)</p>
<p style="color: #333; line-height: 1.85; margin-bottom: 0;"><strong>c)</strong> ((A + B)'C)'<br>
= (A + B)'' + C' (De Morgan: break AND)<br>
= (A + B) + C' (Double negation)<br>
= <strong>A + B + C'</strong></p>
</div>
</details>

---

### Problem 8
Prove De Morgan's theorem for two variables using truth tables.

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>
<p style="color: #333; line-height: 1.85; margin-top: 0;">Proving: (A &middot; B)' = A' + B'</p>

| A | B | A&middot;B | (A&middot;B)' | A' | B' | A'+B' |
|---|---|-----|--------|----|----|-------|
| 0 | 0 |  0  |   1    | 1  | 1  |   1   |
| 0 | 1 |  0  |   1    | 1  | 0  |   1   |
| 1 | 0 |  0  |   1    | 0  | 1  |   1   |
| 1 | 1 |  1  |   0    | 0  | 0  |   0   |

<p style="color: #333; line-height: 1.85; margin-bottom: 0;">Columns (A&middot;B)' and A'+B' are <strong>identical</strong>, proving De Morgan's theorem. &#10003;</p>
</div>
</details>

---

## Section C: Expression Simplification (6 problems)

### Problem 9
Simplify the following expressions:

a) A'B + AB' + AB
b) (A + B)(A' + B)(A + B')
c) ABC + ABC' + AB'C + AB'C'

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;"><strong>a)</strong> A'B + AB' + AB<br>
= A'B + A(B' + B) (Factor)<br>
= A'B + A (Complement)<br>
= <strong>A + B</strong> (Absorption: X'Y + X = X + Y)</p>
<p style="color: #333; line-height: 1.85;"><strong>b)</strong> (A + B)(A' + B)(A + B')<br>
= ((A + B)(A + B'))(A' + B) (Rearrange)<br>
= (A + BB')(A' + B) (Distributive)<br>
= A(A' + B) (B&middot;B' = 0)<br>
= AA' + AB<br>
= 0 + AB = <strong>AB</strong></p>
<p style="color: #333; line-height: 1.85; margin-bottom: 0;"><strong>c)</strong> ABC + ABC' + AB'C + AB'C'<br>
= AB(C + C') + AB'(C + C')<br>
= AB&middot;1 + AB'&middot;1<br>
= AB + AB' = A(B + B') = <strong>A</strong></p>
</div>
</details>

---

### Problem 10
Given F = Σm(1, 3, 5, 7), write:

a) The SOP expression
b) Simplify the expression

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;"><strong>a)</strong> For 3 variables (A, B, C):</p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="margin-bottom: 0.3rem; line-height: 1.75; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> m1 = A'B'C</li>
<li style="margin-bottom: 0.3rem; line-height: 1.75; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> m3 = A'BC</li>
<li style="margin-bottom: 0.3rem; line-height: 1.75; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> m5 = AB'C</li>
<li style="margin-bottom: 0.3rem; line-height: 1.75; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> m7 = ABC</li>
</ul>
<p style="color: #333; line-height: 1.85;">F = A'B'C + A'BC + AB'C + ABC</p>
<p style="color: #333; line-height: 1.85; margin-bottom: 0;"><strong>b)</strong> Simplification:<br>
F = A'C(B' + B) + AC(B' + B)<br>
= A'C&middot;1 + AC&middot;1<br>
= A'C + AC<br>
= C(A' + A) = <strong>C</strong></p>
</div>
</details>

---

### Problem 11
Simplify: F = A'B'C' + A'B'C + A'BC' + AB'C'

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;">F = A'B'C' + A'B'C + A'BC' + AB'C'</p>
<p style="color: #333; line-height: 1.85;">Group terms:<br>
= A'B'(C' + C) + C'(A'B + AB')<br>
= A'B'&middot;1 + C'(A &oplus; B)<br>
= A'B' + C'(A'B + AB')</p>
<p style="color: #333; line-height: 1.85;">Alternative approach - factor C':<br>
= A'B'C' + AB'C' + A'B'C + A'BC'<br>
= B'C'(A' + A) + A'(B'C + BC')<br>
= B'C' + A'(B &oplus; C)</p>
<p style="color: #333; line-height: 1.85; margin-bottom: 0;">Most simplified: <strong>A'B' + A'C' + B'C'</strong></p>
</div>
</details>

---

## Section D: Circuit Analysis (5 problems)

### Problem 12
Write the Boolean expression for a circuit with:
- First level: AND gates for AB and CD
- Second level: OR gate combining the AND outputs
- Third level: NOT gate on the OR output

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;">Step by step:</p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="margin-bottom: 0.3rem; line-height: 1.75; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">1.</span> First level: X = AB, Y = CD</li>
<li style="margin-bottom: 0.3rem; line-height: 1.75; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">2.</span> Second level: Z = X + Y = AB + CD</li>
<li style="margin-bottom: 0.3rem; line-height: 1.75; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">3.</span> Third level: F = Z' = <strong>(AB + CD)'</strong></li>
</ul>
<p style="color: #333; line-height: 1.85; margin-bottom: 0;">Using De Morgan's: F = (A' + B')(C' + D')</p>
</div>
</details>

---

### Problem 13
Analyze the circuit: F = A ⊕ B ⊕ C

Create the complete truth table and describe what this circuit detects.

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

| A | B | C | A&oplus;B | F=A&oplus;B&oplus;C |
|---|---|---|-----|---------|
| 0 | 0 | 0 |  0  |    0    |
| 0 | 0 | 1 |  0  |    1    |
| 0 | 1 | 0 |  1  |    1    |
| 0 | 1 | 1 |  1  |    0    |
| 1 | 0 | 0 |  1  |    1    |
| 1 | 0 | 1 |  1  |    0    |
| 1 | 1 | 0 |  0  |    0    |
| 1 | 1 | 1 |  0  |    1    |

<p style="color: #333; line-height: 1.85; margin-bottom: 0;"><strong>Function:</strong> This circuit outputs 1 when there is an <strong>odd number of 1s</strong> in the inputs. It's an <strong>odd parity generator/checker</strong>.</p>
</div>
</details>

---

### Problem 14
Design a circuit that outputs 1 only when exactly two of three inputs (A, B, C) are 1.

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;">Identify the minterms where exactly two inputs are 1:</p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="margin-bottom: 0.3rem; line-height: 1.75; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> A=0, B=1, C=1: m3 = A'BC</li>
<li style="margin-bottom: 0.3rem; line-height: 1.75; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> A=1, B=0, C=1: m5 = AB'C</li>
<li style="margin-bottom: 0.3rem; line-height: 1.75; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> A=1, B=1, C=0: m6 = ABC'</li>
</ul>
<p style="color: #333; line-height: 1.85;">F = A'BC + AB'C + ABC'</p>
<p style="color: #333; line-height: 1.85;">Simplified: <strong>F = AB'C + A'BC + ABC'</strong><br>
(This is the 2-of-3 majority without the all-1s case)</p>
<p style="color: #333; line-height: 1.85;">Alternative form: F = (A &oplus; B)C + AB(C')<br>
Or: F = AB &oplus; BC &oplus; AC (careful - this includes m7)</p>
<p style="color: #333; line-height: 1.85; margin-bottom: 0;">Correct: <strong>F = A'BC + AB'C + ABC'</strong></p>
</div>
</details>

---

### Problem 15
A 2-input multiplexer has inputs A, B, select line S, and output Y.
When S=0, Y=A; when S=1, Y=B.

Write the Boolean expression for Y.

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>
<p style="color: #333; line-height: 1.85; margin-top: 0;">Create truth table:</p>

| S | A | B | Y |
|---|---|---|---|
| 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 0 |
| 0 | 1 | 0 | 1 |
| 0 | 1 | 1 | 1 |
| 1 | 0 | 0 | 0 |
| 1 | 0 | 1 | 1 |
| 1 | 1 | 0 | 0 |
| 1 | 1 | 1 | 1 |

<p style="color: #333; line-height: 1.85;">From the table, when S=0, Y follows A; when S=1, Y follows B.</p>
<p style="color: #333; line-height: 1.85;"><strong>Y = S'A + SB</strong></p>
<p style="color: #333; line-height: 1.85; margin-bottom: 0;">This is the fundamental multiplexer equation.</p>
</div>
</details>

---

## Section E: Word Problems (5 problems)

### Problem 16
A car's dome light should turn on when:
- Any door is open, OR
- The headlight switch is in the "dome" position

Let D1, D2, D3, D4 represent the four door switches (1 = open) and H represent the headlight switch (1 = dome position).

Write the Boolean expression for the dome light L.

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;">The light turns on if ANY door is open OR if the headlight switch is in dome position:</p>
<p style="color: #333; line-height: 1.85;"><strong>L = D1 + D2 + D3 + D4 + H</strong></p>
<p style="color: #333; line-height: 1.85; margin-bottom: 0;">This is simply a 5-input OR function.</p>
</div>
</details>

---

### Problem 17
A safety interlock system requires that a machine can only start (S=1) when:
- The guard is in place (G=1), AND
- The emergency stop is NOT pressed (E=0), AND
- Either the start button is pressed (B=1) OR the machine is already running (R=1)

Write and simplify the Boolean expression for S.

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;">Translating the requirements:</p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="margin-bottom: 0.3rem; line-height: 1.75; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> Guard in place: G</li>
<li style="margin-bottom: 0.3rem; line-height: 1.75; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> Emergency stop NOT pressed: E'</li>
<li style="margin-bottom: 0.3rem; line-height: 1.75; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> Start button OR already running: B + R</li>
</ul>
<p style="color: #333; line-height: 1.85;"><strong>S = G &middot; E' &middot; (B + R)</strong></p>
<p style="color: #333; line-height: 1.85; margin-bottom: 0;">Or expanded: S = GE'B + GE'R</p>
</div>
</details>

---

### Problem 18
Design an alarm system where the alarm (A) sounds when:
- Motion is detected (M=1) AND the system is armed (S=1), OR
- A door/window sensor is triggered (D=1) AND the system is armed (S=1), OR
- The panic button is pressed (P=1) regardless of arm status

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;"><strong>A = SM + SD + P</strong></p>
<p style="color: #333; line-height: 1.85;">Simplified by factoring:<br>
<strong>A = S(M + D) + P</strong></p>
<p style="color: #333; line-height: 1.85; margin-bottom: 0;">The alarm sounds if:<br>
&bull; System is armed AND (motion OR door triggered), OR<br>
&bull; Panic button pressed (always)</p>
</div>
</details>

---

### Problem 19
A voting circuit has 4 inputs (A, B, C, D) representing votes from 4 committee members. The output Y should be 1 if at least 3 members vote yes (majority of 4).

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;">Y = 1 when 3 or 4 inputs are 1.</p>
<p style="color: #333; line-height: 1.85;">Minterms with 3 ones: m7, m11, m13, m14<br>
Minterm with 4 ones: m15</p>
<p style="color: #333; line-height: 1.85;">Y = A'BCD + AB'CD + ABC'D + ABCD' + ABCD</p>
<p style="color: #333; line-height: 1.85;">Simplified:<br>
Y = BCD(A' + A) + ACD(B' + B) + ABD(C' + C) + ABC(D' + D) - overcounting</p>
<p style="color: #333; line-height: 1.85;">Better approach:<br>
<strong>Y = ABC + ABD + ACD + BCD</strong></p>
<p style="color: #333; line-height: 1.85; margin-bottom: 0;">This means: at least 3 of 4 must be true.</p>
</div>
</details>

---

### Problem 20
A digital combination lock opens when the correct 3-bit code (101) is entered.
Inputs are C2, C1, C0 (MSB to LSB). Output O=1 when code matches.

Write the expression and implement with basic gates.

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;">The code 101 means: C2=1, C1=0, C0=1</p>
<p style="color: #333; line-height: 1.85;"><strong>O = C2 &middot; C1' &middot; C0</strong></p>
<p style="color: #333; line-height: 1.85;">Implementation:</p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="margin-bottom: 0.3rem; line-height: 1.75; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">1.</span> NOT gate on C1 to get C1'</li>
<li style="margin-bottom: 0.3rem; line-height: 1.75; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">2.</span> 3-input AND gate: C2, C1', C0</li>
</ul>
<p style="color: #333; line-height: 1.85; margin-bottom: 0;">Gate count: 1 NOT + 1 AND (3-input) = <strong>2 gates</strong></p>
</div>
</details>

---

## Summary

| Section | Topics Covered | Problem Count |
|---------|---------------|---------------|
| A | Basic Logic Gates | 3 |
| B | Boolean Algebra Laws | 5 |
| C | Expression Simplification | 3 |
| D | Circuit Analysis | 4 |
| E | Word Problems | 5 |
| **Total** | | **20** |

</div>
