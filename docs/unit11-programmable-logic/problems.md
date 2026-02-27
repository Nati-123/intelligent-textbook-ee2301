---
title: Unit 11 Problems - Programmable Logic Devices
description: Practice problems for ROMs, PLAs, PALs, CPLDs, FPGAs, and design flow
---

<div class="problems-styled" markdown>

<h1 style="color: #5A3EED !important; border-bottom: 3px solid #5A3EED; padding-bottom: 0.4rem; font-weight: 800; margin-bottom: 1.5rem;">End-of-Unit Problems: Programmable Logic Devices</h1>

<p style="color: #555; line-height: 1.85; font-size: 1.05rem; margin-bottom: 2rem;">
Work through these problems to reinforce your understanding of ROMs, PLAs, PALs, CPLDs, FPGAs, and the programmable logic design flow.
</p>

<h2 style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">Section A: ROM and PLA Programming (4 problems)</h2>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 1</h3>
A combinational circuit has 3 inputs (<span class="arithmatex">\(A\)</span>, <span class="arithmatex">\(B\)</span>, <span class="arithmatex">\(C\)</span>) and 2 outputs (<span class="arithmatex">\(F_1\)</span>, <span class="arithmatex">\(F_2\)</span>) defined by:

- <span class="arithmatex">\(F_1(A, B, C) = \sum m(1, 2, 4, 7)\)</span>
- <span class="arithmatex">\(F_2(A, B, C) = \sum m(0, 3, 5, 6)\)</span>

Implement this circuit using an <span class="arithmatex">\(8 \times 2\)</span> ROM. Show the complete truth table and the contents of every ROM address.

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

**Truth table (ROM contents):**

| Address | <span class="arithmatex">\(A\)</span> | <span class="arithmatex">\(B\)</span> | <span class="arithmatex">\(C\)</span> | <span class="arithmatex">\(F_1\)</span> | <span class="arithmatex">\(F_2\)</span> |
|---------|-----|-----|-----|-------|-------|
| 0 | 0 | 0 | 0 | 0 | 1 |
| 1 | 0 | 0 | 1 | 1 | 0 |
| 2 | 0 | 1 | 0 | 1 | 0 |
| 3 | 0 | 1 | 1 | 0 | 1 |
| 4 | 1 | 0 | 0 | 1 | 0 |
| 5 | 1 | 0 | 1 | 0 | 1 |
| 6 | 1 | 1 | 0 | 0 | 1 |
| 7 | 1 | 1 | 1 | 1 | 0 |

**ROM structure:**

```
A ──┐
B ──┼── [3-to-8 Decoder] ── m0 ── ·─────── F2
C ──┘       (fixed AND        m1 ── ·───── F1
             plane)           m2 ── ·───── F1
                              m3 ── ·─────── F2
                              m4 ── ·───── F1
                              m5 ── ·─────── F2
                              m6 ── ·─────── F2
                              m7 ── ·───── F1
                                    OR plane
```

**ROM programming:**

- The decoder (AND plane) is fixed and generates all <span class="arithmatex">\(2^3 = 8\)</span> minterms.
- The OR plane is programmable. Connections (fuse intact) are marked with a dot.
- <span class="arithmatex">\(F_1\)</span> OR line connects to minterms 1, 2, 4, 7.
- <span class="arithmatex">\(F_2\)</span> OR line connects to minterms 0, 3, 5, 6.

**ROM size:** <span class="arithmatex">\(2^3 \times 2 = 8 \times 2 = 16\)</span> bits total.

**Key observation:** The ROM stores the complete truth table. Every minterm is generated whether needed or not. Note that <span class="arithmatex">\(F_2 = \overline{F_1}\)</span> in this example, but the ROM does not exploit this — each output is independently programmed.

</div>
</details>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 2</h3>
Compare the ROM implementation from Problem 1 to a PLA implementation of the same functions. Determine the minimum number of product terms needed in the PLA and show the AND-plane and OR-plane programming.

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

**Step 1: Minimize each function.**

**K-map for <span class="arithmatex">\(F_1 = \sum m(1, 2, 4, 7)\)</span>:**

| <span class="arithmatex">\(A\)</span>\<span class="arithmatex">\(BC\)</span> | 00 | 01 | 11 | 10 |
|---------|----|----|----|----|
| 0 | 0 | 1 | 0 | 1 |
| 1 | 1 | 0 | 1 | 0 |

<span class="arithmatex">\(F_1 = \overline{A}\,\overline{B}\,C + \overline{A}\,B\,\overline{C} + A\,\overline{B}\,\overline{C} + A\,B\,C\)</span>

This simplifies to: <span class="arithmatex">\(F_1 = A \oplus B \oplus C\)</span> (odd-parity function, no further SOP reduction below 4 product terms).

**K-map for <span class="arithmatex">\(F_2 = \sum m(0, 3, 5, 6)\)</span>:**

| <span class="arithmatex">\(A\)</span>\<span class="arithmatex">\(BC\)</span> | 00 | 01 | 11 | 10 |
|---------|----|----|----|----|
| 0 | 1 | 0 | 1 | 0 |
| 1 | 0 | 1 | 0 | 1 |

<span class="arithmatex">\(F_2 = \overline{A}\,\overline{B}\,\overline{C} + \overline{A}\,B\,C + A\,\overline{B}\,C + A\,B\,\overline{C}\)</span>

<span class="arithmatex">\(F_2 = \overline{F_1}\)</span> (even parity). However, in standard PLA the complement is not free, so we still need product terms.

**Step 2: Find shared product terms.**

Since <span class="arithmatex">\(F_2 = \overline{F_1}\)</span>, these functions share no common product terms (they are complements). We need:

- 4 product terms for <span class="arithmatex">\(F_1\)</span>
- 4 product terms for <span class="arithmatex">\(F_2\)</span>

But wait — a PLA with complemented outputs can implement <span class="arithmatex">\(F_2\)</span> by inverting <span class="arithmatex">\(F_1\)</span>. If the PLA supports XOR at the output, only 4 product terms are needed total.

Without output inversion: **8 product terms**.

With output inversion on <span class="arithmatex">\(F_2\)</span>: **4 product terms**.

**Step 3: PLA programming table (with output inversion):**

| Product Term | <span class="arithmatex">\(A\)</span> | <span class="arithmatex">\(B\)</span> | <span class="arithmatex">\(C\)</span> | <span class="arithmatex">\(F_1\)</span> | <span class="arithmatex">\(\overline{F_2}\)</span> |
|-------------|-----|-----|-----|-------|----------|
| <span class="arithmatex">\(P_1 = \overline{A}\,\overline{B}\,C\)</span> | 0 | 0 | 1 | 1 | 1 |
| <span class="arithmatex">\(P_2 = \overline{A}\,B\,\overline{C}\)</span> | 0 | 1 | 0 | 1 | 1 |
| <span class="arithmatex">\(P_3 = A\,\overline{B}\,\overline{C}\)</span> | 1 | 0 | 0 | 1 | 1 |
| <span class="arithmatex">\(P_4 = A\,B\,C\)</span> | 1 | 1 | 1 | 1 | 1 |

<span class="arithmatex">\(F_2\)</span> output gets an XOR bubble (complement).

**Comparison:**

| Feature | ROM | PLA |
|---------|-----|-----|
| AND plane | Fixed (all <span class="arithmatex">\(2^n\)</span> minterms) | Programmable (only needed terms) |
| OR plane | Programmable | Programmable |
| Product terms | 8 (all minterms) | 4 (with output inversion) |
| Total fuses | 16 | Much fewer |
| Flexibility | Any function of 3 variables | Only functions fitting allocated terms |

</div>
</details>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 3</h3>
A system requires a code converter that maps 4-bit BCD (0-9) to 7-segment display outputs (<span class="arithmatex">\(a\)</span>-<span class="arithmatex">\(g\)</span>). Show how to implement this using a ROM. Determine the ROM size and show the contents for digits 0, 1, 2, and 3.

Segment mapping (active-high, common cathode):

```
 ─a─
|   |
f   b
|   |
 ─g─
|   |
e   c
|   |
 ─d─
```

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

**ROM configuration:**

- Inputs: 4-bit BCD (<span class="arithmatex">\(D_3 D_2 D_1 D_0\)</span>) = 4 address lines
- Outputs: 7 segments (<span class="arithmatex">\(a, b, c, d, e, f, g\)</span>) = 7 data bits
- ROM size: <span class="arithmatex">\(2^4 \times 7 = 16 \times 7 = 112\)</span> bits

**Segment encoding (1 = ON):**

| Digit | <span class="arithmatex">\(D_3 D_2 D_1 D_0\)</span> | <span class="arithmatex">\(a\)</span> | <span class="arithmatex">\(b\)</span> | <span class="arithmatex">\(c\)</span> | <span class="arithmatex">\(d\)</span> | <span class="arithmatex">\(e\)</span> | <span class="arithmatex">\(f\)</span> | <span class="arithmatex">\(g\)</span> | Hex |
|-------|-------------------|-----|-----|-----|-----|-----|-----|-----|-----|
| 0 | 0000 | 1 | 1 | 1 | 1 | 1 | 1 | 0 | 7E |
| 1 | 0001 | 0 | 1 | 1 | 0 | 0 | 0 | 0 | 30 |
| 2 | 0010 | 1 | 1 | 0 | 1 | 1 | 0 | 1 | 6D |
| 3 | 0011 | 1 | 1 | 1 | 1 | 0 | 0 | 1 | 79 |
| 4 | 0100 | 0 | 1 | 1 | 0 | 0 | 1 | 1 | 33 |
| 5 | 0101 | 1 | 0 | 1 | 1 | 0 | 1 | 1 | 5B |
| 6 | 0110 | 1 | 0 | 1 | 1 | 1 | 1 | 1 | 5F |
| 7 | 0111 | 1 | 1 | 1 | 0 | 0 | 0 | 0 | 70 |
| 8 | 1000 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 7F |
| 9 | 1001 | 1 | 1 | 1 | 1 | 0 | 1 | 1 | 7B |
| 10-15 | 1010-1111 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 00 |

**ROM structure:**

```
D3 ──┐
D2 ──┤  [4-to-16      m0 ──── a b c d e f (digit 0)
D1 ──┤   Decoder]      m1 ──── b c         (digit 1)
D0 ──┘   (fixed AND    m2 ──── a b d e g   (digit 2)
          plane)        m3 ──── a b c d g   (digit 3)
                        ...
                        m9 ──── a b c d f g (digit 9)
                       m10-m15 ── (no connections, all outputs 0)
```

**Addresses 10-15** (invalid BCD) store all zeros, blanking the display.

**Total storage used:** 10 valid digits <span class="arithmatex">\(\times\)</span> 7 bits = 70 bits active; 6 unused addresses <span class="arithmatex">\(\times\)</span> 7 bits = 42 bits wasted.

**ROM advantage:** No minimization needed. Just store the truth table directly. Any display pattern change requires only reprogramming the ROM contents.

</div>
</details>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 4</h3>
Design a PLA with 3 inputs (<span class="arithmatex">\(X\)</span>, <span class="arithmatex">\(Y\)</span>, <span class="arithmatex">\(Z\)</span>) and 3 outputs (<span class="arithmatex">\(F_1\)</span>, <span class="arithmatex">\(F_2\)</span>, <span class="arithmatex">\(F_3\)</span>) for the following functions. Identify shared product terms to minimize the total number of product terms.

- <span class="arithmatex">\(F_1 = X\overline{Y} + XZ\)</span>
- <span class="arithmatex">\(F_2 = X\overline{Y} + \overline{X}Z\)</span>
- <span class="arithmatex">\(F_3 = XZ + \overline{X}Z\)</span>

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

**Step 1: List all unique product terms.**

| Product Term | Expression |
|-------------|------------|
| <span class="arithmatex">\(P_1\)</span> | <span class="arithmatex">\(X\overline{Y}\)</span> |
| <span class="arithmatex">\(P_2\)</span> | <span class="arithmatex">\(XZ\)</span> |
| <span class="arithmatex">\(P_3\)</span> | <span class="arithmatex">\(\overline{X}Z\)</span> |

**Step 2: Check for sharing.**

- <span class="arithmatex">\(F_1 = P_1 + P_2\)</span> (uses <span class="arithmatex">\(X\overline{Y}\)</span> and <span class="arithmatex">\(XZ\)</span>)
- <span class="arithmatex">\(F_2 = P_1 + P_3\)</span> (uses <span class="arithmatex">\(X\overline{Y}\)</span> and <span class="arithmatex">\(\overline{X}Z\)</span>)
- <span class="arithmatex">\(F_3 = P_2 + P_3\)</span> (uses <span class="arithmatex">\(XZ\)</span> and <span class="arithmatex">\(\overline{X}Z\)</span>)

Note: <span class="arithmatex">\(F_3 = XZ + \overline{X}Z = Z(X + \overline{X}) = Z\)</span>, but in PLA SOP form we keep the product terms as they enable sharing.

**Total unique product terms: 3** (all shared across outputs).

**Step 3: PLA programming table.**

AND plane (1 = true, 0 = complement, — = don't connect):

| Product Term | <span class="arithmatex">\(X\)</span> | <span class="arithmatex">\(\overline{X}\)</span> | <span class="arithmatex">\(Y\)</span> | <span class="arithmatex">\(\overline{Y}\)</span> | <span class="arithmatex">\(Z\)</span> | <span class="arithmatex">\(\overline{Z}\)</span> |
|-------------|-----|------|-----|------|-----|------|
| <span class="arithmatex">\(P_1\)</span>: <span class="arithmatex">\(X\overline{Y}\)</span> | 1 | — | — | 1 | — | — |
| <span class="arithmatex">\(P_2\)</span>: <span class="arithmatex">\(XZ\)</span> | 1 | — | — | — | 1 | — |
| <span class="arithmatex">\(P_3\)</span>: <span class="arithmatex">\(\overline{X}Z\)</span> | — | 1 | — | — | 1 | — |

OR plane (1 = connected):

| Product Term | <span class="arithmatex">\(F_1\)</span> | <span class="arithmatex">\(F_2\)</span> | <span class="arithmatex">\(F_3\)</span> |
|-------------|-------|-------|-------|
| <span class="arithmatex">\(P_1\)</span> | 1 | 1 | — |
| <span class="arithmatex">\(P_2\)</span> | 1 | — | 1 |
| <span class="arithmatex">\(P_3\)</span> | — | 1 | 1 |

**PLA diagram:**

```
X ──┬──/──┐
    │     │
Y ──┼──/──┼──┐
    │     │  │
Z ──┼──/──┼──┼──┐
    │  │  │  │  │  (true and complement available)
    ▼  ▼  ▼  ▼  ▼
┌──────────────────┐
│   AND Plane       │
│                   │
│ P1 = X·Y'         │──┬────┬────·
│ P2 = X·Z           │──┤────·────┤
│ P3 = X'·Z           │──·────┤────┤
│                   │  │    │    │
└──────────────────┘  ▼    ▼    ▼
┌──────────────────┐
│   OR Plane        │
│                   │
│       F1   F2   F3│
└──────────────────┘
```

**Comparison to ROM:** A ROM would need all <span class="arithmatex">\(2^3 = 8\)</span> minterms. The PLA needs only **3 product terms** — a significant reduction. The key benefit is product term sharing: <span class="arithmatex">\(P_1\)</span> serves both <span class="arithmatex">\(F_1\)</span> and <span class="arithmatex">\(F_2\)</span>; <span class="arithmatex">\(P_2\)</span> serves both <span class="arithmatex">\(F_1\)</span> and <span class="arithmatex">\(F_3\)</span>; <span class="arithmatex">\(P_3\)</span> serves both <span class="arithmatex">\(F_2\)</span> and <span class="arithmatex">\(F_3\)</span>.

</div>
</details>

<h2 style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">Section B: PAL Design (4 problems)</h2>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 5</h3>
Implement the following functions using a PAL with 3 inputs and a maximum of 4 product terms per output:

- <span class="arithmatex">\(F_1 = \overline{A}\,\overline{B}\,C + A\overline{B}\,\overline{C} + AB\overline{C} + ABC\)</span>
- <span class="arithmatex">\(F_2 = \overline{A}BC + AB\overline{C} + ABC\)</span>

Show the PAL programming table and verify that the functions fit within the PAL constraints.

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

**Step 1: Count product terms per output.**

- <span class="arithmatex">\(F_1\)</span> has 4 product terms. PAL allows 4 per output. Fits exactly.
- <span class="arithmatex">\(F_2\)</span> has 3 product terms. PAL allows 4. Fits with one spare.

**Step 2: Attempt to minimize (optional for PAL, but good practice).**

**<span class="arithmatex">\(F_1 = \overline{A}\,\overline{B}\,C + A\overline{B}\,\overline{C} + AB\overline{C} + ABC\)</span>**

K-map for <span class="arithmatex">\(F_1\)</span>:

| <span class="arithmatex">\(A\)</span>\<span class="arithmatex">\(BC\)</span> | 00 | 01 | 11 | 10 |
|---------|----|----|----|----|
| 0 | 0 | 1 | 0 | 0 |
| 1 | 1 | 0 | 1 | 1 |

Grouping: <span class="arithmatex">\(A\overline{B} + AB = A(\overline{B} + B) = A\)</span>... wait:

- <span class="arithmatex">\(A\overline{B}\,\overline{C} + AB\overline{C} = A\overline{C}\)</span>
- <span class="arithmatex">\(ABC\)</span> remains
- <span class="arithmatex">\(\overline{A}\,\overline{B}\,C\)</span> remains

<span class="arithmatex">\(F_1 = A\overline{C} + ABC + \overline{A}\,\overline{B}\,C = A\overline{C} + \overline{A}\,\overline{B}\,C + ABC\)</span>

Further: <span class="arithmatex">\(A\overline{C} + ABC = A(\overline{C} + BC) = A(\overline{C} + B)\)</span>... not SOP.

Minimized SOP: <span class="arithmatex">\(F_1 = A\overline{C} + ABC + \overline{A}\,\overline{B}\,C\)</span> — **3 product terms**.

**<span class="arithmatex">\(F_2 = \overline{A}BC + AB\overline{C} + ABC\)</span>**

K-map for <span class="arithmatex">\(F_2\)</span>:

| <span class="arithmatex">\(A\)</span>\<span class="arithmatex">\(BC\)</span> | 00 | 01 | 11 | 10 |
|---------|----|----|----|----|
| 0 | 0 | 0 | 1 | 0 |
| 1 | 0 | 0 | 1 | 1 |

- <span class="arithmatex">\(\overline{A}BC + ABC = BC\)</span>
- <span class="arithmatex">\(AB\overline{C}\)</span> remains

<span class="arithmatex">\(F_2 = BC + AB\overline{C}\)</span> — **2 product terms**.

**Step 3: PAL programming table.**

| Row | <span class="arithmatex">\(A\)</span> | <span class="arithmatex">\(\overline{A}\)</span> | <span class="arithmatex">\(B\)</span> | <span class="arithmatex">\(\overline{B}\)</span> | <span class="arithmatex">\(C\)</span> | <span class="arithmatex">\(\overline{C}\)</span> | Output |
|-----|-----|------|-----|------|-----|------|--------|
| 1 | 1 | — | — | — | — | 1 | <span class="arithmatex">\(F_1\)</span> |
| 2 | 1 | — | 1 | — | 1 | — | <span class="arithmatex">\(F_1\)</span> |
| 3 | — | 1 | — | 1 | 1 | — | <span class="arithmatex">\(F_1\)</span> |
| 4 | — | — | — | — | — | — | <span class="arithmatex">\(F_1\)</span> (unused, all fuses intact = 0) |
| 5 | — | — | 1 | — | 1 | — | <span class="arithmatex">\(F_2\)</span> |
| 6 | 1 | — | 1 | — | — | 1 | <span class="arithmatex">\(F_2\)</span> |
| 7 | — | — | — | — | — | — | <span class="arithmatex">\(F_2\)</span> (unused) |
| 8 | — | — | — | — | — | — | <span class="arithmatex">\(F_2\)</span> (unused) |

**Key PAL characteristic:** Each product term is dedicated to exactly one output. Product term <span class="arithmatex">\(P_1\)</span> (row 1) can only feed <span class="arithmatex">\(F_1\)</span>, never <span class="arithmatex">\(F_2\)</span>. This is the fundamental difference from a PLA, where any product term can feed any output.

</div>
</details>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 6</h3>
A PAL device has 4 inputs (<span class="arithmatex">\(A\)</span>, <span class="arithmatex">\(B\)</span>, <span class="arithmatex">\(C\)</span>, <span class="arithmatex">\(D\)</span>) and 2 outputs, with a maximum of 3 product terms per output. Determine whether the following functions can be implemented directly. If not, explain what must be done.

- <span class="arithmatex">\(F_1 = \overline{A}BCD + A\overline{B}CD + AB\overline{C}D + ABC\overline{D} + ABCD\)</span>
- <span class="arithmatex">\(F_2 = \overline{A}\,\overline{B} + CD\)</span>

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

**Step 1: Count product terms.**

- <span class="arithmatex">\(F_1\)</span> has 5 product terms in the given form. PAL limit is 3 per output. **Does not fit.**
- <span class="arithmatex">\(F_2\)</span> has 2 product terms. PAL limit is 3. **Fits.**

**Step 2: Attempt to minimize <span class="arithmatex">\(F_1\)</span>.**

<span class="arithmatex">\(F_1 = \overline{A}BCD + A\overline{B}CD + AB\overline{C}D + ABC\overline{D} + ABCD\)</span>

Factor where possible:

- <span class="arithmatex">\(AB\overline{C}D + ABC\overline{D} + ABCD = AB(\overline{C}D + C\overline{D} + CD) = AB(\overline{C}D + C) = AB(C + D)\)</span>

Wait: <span class="arithmatex">\(\overline{C}D + C\overline{D} + CD = \overline{C}D + C(\overline{D} + D) = \overline{C}D + C = C + D\)</span>

So: <span class="arithmatex">\(AB\overline{C}D + ABC\overline{D} + ABCD = AB(C + D)\)</span>

But <span class="arithmatex">\(AB(C+D) = ABC + ABD\)</span> — still 2 product terms.

Now: <span class="arithmatex">\(F_1 = \overline{A}BCD + A\overline{B}CD + ABC + ABD\)</span>

That is 4 product terms. Still exceeds 3.

Try further: <span class="arithmatex">\(A\overline{B}CD + ABC = AC(\overline{B}D + B) = AC(B + D)\)</span> = <span class="arithmatex">\(ABC + ACD\)</span>. No improvement.

Try: <span class="arithmatex">\(\overline{A}BCD + A\overline{B}CD = CD(\overline{A}B + A\overline{B}) = CD(A \oplus B)\)</span>. Not SOP.

In SOP form, <span class="arithmatex">\(F_1\)</span> requires **minimum 4 product terms** (verified by K-map). This exceeds the PAL limit of 3.

**Step 3: Solutions when function exceeds product term limit.**

1. **Use a larger PAL** with more product terms per output (e.g., 4 or 8 terms per output).

2. **Output cascading:** Use the output of another PAL macro-cell as a feedback input.

    - <span class="arithmatex">\(G = \overline{A}BCD + A\overline{B}CD\)</span> (2 terms — fits in one output)
    - <span class="arithmatex">\(F_1 = G + ABC + ABD\)</span> (3 terms — fits, using <span class="arithmatex">\(G\)</span> as input)

    This requires two output macro-cells and one feedback path.

3. **Use XOR output:** Some PALs have XOR gates at outputs. <span class="arithmatex">\(F_1\)</span> might factor into two expressions XORed together, each with fewer terms.

**Conclusion:** <span class="arithmatex">\(F_2\)</span> fits directly. <span class="arithmatex">\(F_1\)</span> requires either a larger PAL or output cascading to implement.

</div>
</details>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 7</h3>
Explain the difference between a PLA and a PAL in terms of architecture, speed, and cost. A function requires 6 product terms shared among 4 outputs. Compare the PLA and PAL implementations.

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

**Architectural Comparison:**

```
PLA Architecture:              PAL Architecture:
┌─────────────────┐           ┌─────────────────┐
│  Programmable    │           │  Programmable    │
│  AND Plane       │           │  AND Plane       │
│  (any product    │           │  (product terms  │
│   term from      │           │   from any       │
│   any inputs)    │           │   inputs)        │
└────────┬────────┘           └────────┬────────┘
         │                              │
┌────────▼────────┐           ┌────────▼────────┐
│  Programmable    │           │  Fixed           │
│  OR Plane        │           │  OR Plane        │
│  (any product    │           │  (dedicated      │
│   term to any    │           │   terms per      │
│   output)        │           │   output)        │
└─────────────────┘           └─────────────────┘
```

**Detailed Comparison:**

| Feature | PLA | PAL |
|---------|-----|-----|
| AND plane | Programmable | Programmable |
| OR plane | Programmable | Fixed |
| Product term sharing | Yes (any term to any output) | No (terms dedicated per output) |
| Speed | Slower (two programmable planes) | Faster (one programmable plane) |
| Programming complexity | Higher | Lower |
| Cost | Higher | Lower |
| Flexibility | More flexible | Less flexible |

**Example: 6 product terms, 4 outputs.**

Suppose the functions are:

- <span class="arithmatex">\(F_1 = P_1 + P_2 + P_3\)</span>
- <span class="arithmatex">\(F_2 = P_1 + P_4\)</span>
- <span class="arithmatex">\(F_3 = P_2 + P_5 + P_6\)</span>
- <span class="arithmatex">\(F_4 = P_3 + P_4 + P_5 + P_6\)</span>

**PLA implementation:**

- AND plane: 6 product terms (each generated once)
- OR plane: Each output connects to its required terms
- Total AND gates: **6**
- Product terms shared across outputs freely

**PAL implementation:**

- Each output has its own dedicated product terms
- <span class="arithmatex">\(F_1\)</span> needs 3 terms (own copies of <span class="arithmatex">\(P_1\)</span>, <span class="arithmatex">\(P_2\)</span>, <span class="arithmatex">\(P_3\)</span>)
- <span class="arithmatex">\(F_2\)</span> needs 2 terms (own copies of <span class="arithmatex">\(P_1\)</span>, <span class="arithmatex">\(P_4\)</span>)
- <span class="arithmatex">\(F_3\)</span> needs 3 terms (own copies of <span class="arithmatex">\(P_2\)</span>, <span class="arithmatex">\(P_5\)</span>, <span class="arithmatex">\(P_6\)</span>)
- <span class="arithmatex">\(F_4\)</span> needs 4 terms (own copies of <span class="arithmatex">\(P_3\)</span>, <span class="arithmatex">\(P_4\)</span>, <span class="arithmatex">\(P_5\)</span>, <span class="arithmatex">\(P_6\)</span>)
- Total AND gates: **12** (product terms duplicated)

**Summary:** The PLA uses 6 AND gates (shared terms). The PAL uses 12 AND gates (dedicated terms) but runs faster because the OR plane has fixed (hardwired) connections with lower propagation delay.

**Speed comparison:** PAL is typically 5-10 ns faster per level because one programmable interconnect plane introduces less capacitive loading and delay than two.

</div>
</details>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 8</h3>
A PAL22V10 has 22 inputs and 10 outputs. Each output macro-cell contains a D flip-flop and can be configured as combinational or registered. If a specific output has 8 product terms available, implement the following registered output:

<span class="arithmatex">\(D = A\overline{B}C + \overline{A}BC + ABD_{feedback} + \overline{A}\,\overline{B}\,\overline{C}\)</span>

Explain how the output feedback works and draw the macro-cell structure.

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

**PAL22V10 Macro-Cell Structure:**

```
From AND array (up to 8 product terms):
┌─────────────────────────────────┐
│  P1 ──┐                         │
│  P2 ──┤                         │
│  P3 ──┼── [OR gate] ──┐         │
│  P4 ──┤               │         │
│  ...  │               ▼         │
│  P8 ──┘        ┌─[MUX]──┐       │
│                │  ↑     │       │
│                │  S1    │       │
│                ▼        ▼       │
│           [D FF]    [bypass]    │
│              │        │        │
│              └──[MUX]─┘        │
│                  ↑             │
│                  S0            │
│                  │             │
│            ┌─[XOR/BUF]─┐       │
│            │    ↑       │       │
│            │  polarity  │       │
│            ▼            │       │
│        Output Pin ──────┘       │
│            │                    │
│            └─── Feedback to ──→ │
│                 AND array       │
└─────────────────────────────────┘
```

**Configuration bits:**

- **S1:** Selects registered (D FF) or combinational (bypass) output
- **S0:** Selects active-high or active-low polarity

**For this problem, set S1 = registered.**

**Product term assignment (4 of 8 used):**

| Term | Expression | Purpose |
|------|-----------|---------|
| <span class="arithmatex">\(P_1\)</span> | <span class="arithmatex">\(A\overline{B}C\)</span> | Product term 1 |
| <span class="arithmatex">\(P_2\)</span> | <span class="arithmatex">\(\overline{A}BC\)</span> | Product term 2 |
| <span class="arithmatex">\(P_3\)</span> | <span class="arithmatex">\(ABD_{fb}\)</span> | Uses feedback from registered output |
| <span class="arithmatex">\(P_4\)</span> | <span class="arithmatex">\(\overline{A}\,\overline{B}\,\overline{C}\)</span> | Product term 4 |
| <span class="arithmatex">\(P_5\)</span>-<span class="arithmatex">\(P_8\)</span> | unused | Available for future expansion |

**Feedback operation:**

1. The D flip-flop output (<span class="arithmatex">\(Q\)</span>) is fed back into the AND array as an additional input.
2. <span class="arithmatex">\(D_{feedback}\)</span> in the expression refers to the current value of the flip-flop output.
3. On each clock edge: <span class="arithmatex">\(Q^+ = A\overline{B}C + \overline{A}BC + ABQ + \overline{A}\,\overline{B}\,\overline{C}\)</span>
4. This creates a **registered (sequential) output** — the PAL can implement state machines.

**Timing:**

- Inputs arrive at AND plane
- Product terms propagate through OR gate: <span class="arithmatex">\(t_{pd-AND} + t_{pd-OR}\)</span>
- D flip-flop captures result on clock edge: must meet setup time <span class="arithmatex">\(t_{su}\)</span>
- Output available after clock-to-Q delay: <span class="arithmatex">\(t_{co}\)</span>
- Feedback available for next cycle after <span class="arithmatex">\(t_{co}\)</span>

**Maximum clock frequency:** <span class="arithmatex">\(f_{max} = \frac{1}{t_{co} + t_{pd-AND} + t_{pd-OR} + t_{su}}\)</span>

</div>
</details>

<h2 style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">Section C: CPLD and FPGA Architecture (4 problems)</h2>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 9</h3>
A CPLD contains 8 function blocks, each equivalent to a PAL with 16 inputs and 8 outputs (4 product terms per output). The function blocks are connected through a global interconnect matrix. Draw a block diagram and calculate:

(a) Maximum number of inputs and outputs for the entire CPLD
(b) Total number of product terms available
(c) Total number of macro-cells

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

**CPLD Block Diagram:**

```
┌──────────────────────────────────────────────┐
│                    CPLD                       │
│                                               │
│  I/O ──┐    ┌─────────────────────┐    ┌── I/O│
│  Pins  │    │  Global Interconnect │    │  Pins│
│        ▼    │       Matrix (GIM)   │    ▼      │
│  ┌──────┐   │                     │  ┌──────┐ │
│  │ FB 1 │◄──┼─────────────────────┼──► FB 5 │ │
│  │16→8  │──►│                     │◄──│16→8  │ │
│  └──────┘   │                     │   └──────┘ │
│  ┌──────┐   │                     │  ┌──────┐ │
│  │ FB 2 │◄──┼─────────────────────┼──► FB 6 │ │
│  │16→8  │──►│                     │◄──│16→8  │ │
│  └──────┘   │                     │   └──────┘ │
│  ┌──────┐   │                     │  ┌──────┐ │
│  │ FB 3 │◄──┼─────────────────────┼──► FB 7 │ │
│  │16→8  │──►│                     │◄──│16→8  │ │
│  └──────┘   │                     │   └──────┘ │
│  ┌──────┐   │                     │  ┌──────┐ │
│  │ FB 4 │◄──┼─────────────────────┼──► FB 8 │ │
│  │16→8  │──►│                     │◄──│16→8  │ │
│  └──────┘   │                     │   └──────┘ │
│              └─────────────────────┘            │
└──────────────────────────────────────────────┘
```

**(a) Maximum I/O:**

- Each function block has 8 outputs, each can connect to an I/O pin
- Maximum outputs: <span class="arithmatex">\(8 \times 8 = 64\)</span> I/O pins
- Each function block accepts 16 inputs from the GIM
- External inputs: depends on package pin count (separate from output pins or shared)
- Typical: **64 I/O pins** (bidirectional — each can be input or output)

**(b) Total product terms:**

- Per output: 4 product terms
- Per function block: <span class="arithmatex">\(8 \times 4 = 32\)</span> product terms
- Total: <span class="arithmatex">\(8 \times 32 = \mathbf{256}\)</span> **product terms**

**(c) Total macro-cells:**

- Per function block: 8 macro-cells (one per output)
- Total: <span class="arithmatex">\(8 \times 8 = \mathbf{64}\)</span> **macro-cells**

**Global Interconnect Matrix:**

- The GIM is a programmable switch matrix
- Routes signals from any function block output or I/O pin to any function block input
- Provides **predictable timing** — any signal routed through the GIM experiences the same delay regardless of source and destination
- This is a key CPLD advantage: **timing is deterministic**

</div>
</details>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 10</h3>
Compare the CPLD architecture from Problem 9 to a basic FPGA structure. Explain the fundamental architectural differences in terms of logic elements, routing, and configuration.

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

**FPGA Architecture (simplified):**

```
┌──────────────────────────────────────────────┐
│                   FPGA                        │
│  IOB   IOB   IOB   IOB   IOB   IOB   IOB     │
│   │     │     │     │     │     │     │       │
│  ─┼─────┼─────┼─────┼─────┼─────┼─────┼──    │
│   │ CLB │ CLB │ CLB │ CLB │ CLB │ CLB │       │
│  ─┼─────┼─────┼─────┼─────┼─────┼─────┼──    │
│   │ CLB │ CLB │ CLB │ CLB │ CLB │ CLB │       │
│  ─┼─────┼─────┼─────┼─────┼─────┼─────┼──    │
│   │ CLB │ CLB │ CLB │ CLB │ CLB │ CLB │       │
│  ─┼─────┼─────┼─────┼─────┼─────┼─────┼──    │
│   │ CLB │ CLB │ CLB │ CLB │ CLB │ CLB │       │
│  ─┼─────┼─────┼─────┼─────┼─────┼─────┼──    │
│  IOB   IOB   IOB   IOB   IOB   IOB   IOB     │
│                                               │
│  ── = Routing channels (programmable)         │
│  CLB = Configurable Logic Block               │
│  IOB = I/O Block                              │
└──────────────────────────────────────────────┘
```

**Detailed Comparison:**

| Feature | CPLD | FPGA |
|---------|------|------|
| **Basic logic element** | PAL-like function block (AND-OR) | Lookup table (LUT) |
| **Logic style** | Sum-of-products (wide AND gates) | Any truth table (via SRAM LUT) |
| **Routing** | Global interconnect matrix (centralized) | Distributed routing channels (segmented) |
| **Timing predictability** | Highly predictable (fixed GIM delay) | Less predictable (depends on routing path) |
| **Configuration storage** | Non-volatile (EEPROM/Flash) | Typically volatile (SRAM, needs reload at power-up) |
| **Power-on** | Instant-on (retains config) | Requires loading bitstream from external memory |
| **Density** | Low-to-medium (tens to hundreds of macro-cells) | Medium-to-very-high (thousands to millions of LUTs) |
| **Best suited for** | Glue logic, address decoding, simple state machines | Complex digital systems, DSP, processors |
| **Granularity** | Coarse (wide AND-OR blocks) | Fine (small LUTs, flexible interconnect) |
| **Cost per gate** | Lower for small designs | Lower for large designs |

**Key architectural difference:**

- **CPLD** implements logic as sum-of-products using AND-OR arrays — best for wide combinational functions with many inputs.
- **FPGA** implements logic as arbitrary truth tables stored in LUT memories — best for complex, deeply nested logic with many levels.

**Routing difference:**

- CPLD: Any-to-any connectivity through GIM with uniform delay.
- FPGA: Segmented routing with switch boxes; delay depends on physical distance and routing path chosen by the place-and-route tool.

</div>
</details>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 11</h3>
A CPLD has a global interconnect matrix delay of 5 ns, a function block AND-OR delay of 8 ns, and a macro-cell register setup time of 3 ns and clock-to-output delay of 4 ns. Calculate:

(a) Maximum combinational propagation delay (input pin to output pin)
(b) Maximum registered clock frequency
(c) The delay if a signal must pass through two function blocks in series

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

**CPLD Timing Model:**

```
Input Pin → [I/O Buffer] → [GIM] → [AND-OR] → [Macro-cell] → [I/O Buffer] → Output Pin
               t_io          t_gim    t_ao        t_mc           t_io
```

Typical values given:

- <span class="arithmatex">\(t_{GIM} = 5\)</span> ns (global interconnect matrix)
- <span class="arithmatex">\(t_{AO} = 8\)</span> ns (AND-OR array within function block)
- <span class="arithmatex">\(t_{su} = 3\)</span> ns (register setup time)
- <span class="arithmatex">\(t_{co} = 4\)</span> ns (clock-to-output of register)
- Assume <span class="arithmatex">\(t_{IO} \approx 2\)</span> ns each (input and output buffer delays)

**(a) Combinational propagation delay (pin-to-pin):**

<span class="arithmatex">\[t_{pd} = t_{IO,in} + t_{GIM} + t_{AO} + t_{IO,out}\]</span>
<span class="arithmatex">\[t_{pd} = 2 + 5 + 8 + 2 = \mathbf{17 \text{ ns}}\]</span>

**(b) Maximum registered clock frequency:**

For registered operation, the critical path is clock-to-output plus routing back through GIM and AND-OR to the next register:

<span class="arithmatex">\[t_{cycle} = t_{co} + t_{GIM} + t_{AO} + t_{su}\]</span>
<span class="arithmatex">\[t_{cycle} = 4 + 5 + 8 + 3 = 20 \text{ ns}\]</span>

<span class="arithmatex">\[f_{max} = \frac{1}{t_{cycle}} = \frac{1}{20 \text{ ns}} = \mathbf{50 \text{ MHz}}\]</span>

**(c) Two function blocks in series:**

When a signal passes through two function blocks, it traverses the GIM and AND-OR array twice:

<span class="arithmatex">\[t_{pd,2FB} = t_{IO,in} + t_{GIM} + t_{AO} + t_{GIM} + t_{AO} + t_{IO,out}\]</span>
<span class="arithmatex">\[t_{pd,2FB} = 2 + 5 + 8 + 5 + 8 + 2 = \mathbf{30 \text{ ns}}\]</span>

**Key observation:** The CPLD timing is deterministic — the GIM delay is the same regardless of which function blocks are connected. This makes timing analysis straightforward compared to FPGAs where routing delays vary.

</div>
</details>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 12</h3>
Explain what happens when a CPLD runs out of product terms in a single function block. Describe two techniques that CPLD fitters use to handle this situation.

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

**Problem: Product Term Exhaustion**

When a function requires more product terms than a single macro-cell provides (e.g., a function needing 6 product terms when the macro-cell has only 4):

```
Function: F = P1 + P2 + P3 + P4 + P5 + P6
Macro-cell limit: 4 product terms
Result: DOES NOT FIT in one macro-cell
```

**Technique 1: Product Term Borrowing (Stealing)**

Some CPLDs allow a macro-cell to "borrow" unused product terms from adjacent macro-cells within the same function block.

```
Macro-cell N-1:  [PT1][PT2][PT3][PT4] → only uses PT1, PT2
                               ↓   ↓
                          borrowed by N
Macro-cell N:    [PT1][PT2][PT3][PT4][PT5][PT6] → 4 own + 2 borrowed = 6 terms
Macro-cell N+1:  [PT1][PT2][PT3][PT4] → all available
```

- **Advantage:** No additional delay — stays within one function block.
- **Disadvantage:** Reduces available terms for the neighboring macro-cell. Only works if neighbors have spare terms.

**Technique 2: Product Term Expansion (Cascading via Feedback)**

Route a partial sum through the GIM back to another function block for further ORing.

```
Function Block A:
  G = P1 + P2 + P3 + P4  (uses all 4 product terms)
  G routed to GIM as feedback

Function Block B:
  F = G + P5 + P6         (3 product terms: G, P5, P6)
  Final result at output of FB B
```

- **Advantage:** Can handle any number of product terms by cascading multiple blocks.
- **Disadvantage:** Adds one GIM delay + one AND-OR delay per expansion level. The signal now crosses two function blocks, increasing propagation delay.

**Trade-off summary:**

| Technique | Extra Delay | Constraint |
|-----------|-------------|------------|
| Product term borrowing | None | Limited by neighbors' unused terms |
| Expansion via feedback | <span class="arithmatex">\(t_{GIM} + t_{AO}\)</span> per level | Uses extra macro-cells and function block resources |

**CPLD fitter tools** automatically choose between these techniques during compilation, optimizing for either speed or resource usage depending on user constraints.

</div>
</details>

<h2 style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">Section D: LUT and CLB Design (4 problems)</h2>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 13</h3>
A 3-input LUT (LUT-3) can implement any Boolean function of 3 variables. Show the internal structure of a LUT-3 and program it to implement <span class="arithmatex">\(F = A \oplus B \oplus C\)</span> (3-input XOR).

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

**LUT-3 Internal Structure:**

A LUT-3 is an 8-bit SRAM with a 3-input multiplexer tree:

```
SRAM Contents:         MUX Tree:
┌─────────┐
│ Addr 0: 0│──────────┐
│ Addr 1: 1│──────┐   │
│          │      ▼   ▼
│ Addr 2: 1│──┐ [2:1 MUX]──┐
│ Addr 3: 0│──┘    ↑       │
│          │       C       │
│ Addr 4: 1│──┐            ▼
│ Addr 5: 0│──┘ [2:1 MUX] [2:1 MUX]──── F (output)
│ Addr 6: 0│──┐    ↑          ↑
│ Addr 7: 1│──┘    C          B
│          │   [2:1 MUX]──┘
└─────────┘       ↑
                  C
Inputs: A (MSB), B, C (LSB)
```

Equivalently, the LUT is just:

```
A ──┐
B ──┼── [8:1 MUX] ── F
C ──┘       ↑
        SRAM[0:7]
```

**Programming for <span class="arithmatex">\(F = A \oplus B \oplus C\)</span>:**

The truth table directly fills the SRAM:

| Address | <span class="arithmatex">\(A\)</span> | <span class="arithmatex">\(B\)</span> | <span class="arithmatex">\(C\)</span> | <span class="arithmatex">\(F = A \oplus B \oplus C\)</span> | SRAM |
|---------|-----|-----|-----|---------------------------|------|
| 0 | 0 | 0 | 0 | 0 | 0 |
| 1 | 0 | 0 | 1 | 1 | 1 |
| 2 | 0 | 1 | 0 | 1 | 1 |
| 3 | 0 | 1 | 1 | 0 | 0 |
| 4 | 1 | 0 | 0 | 1 | 1 |
| 5 | 1 | 0 | 1 | 0 | 0 |
| 6 | 1 | 1 | 0 | 0 | 0 |
| 7 | 1 | 1 | 1 | 1 | 1 |

**SRAM contents:** `0110_1001` (reading top to bottom) = <span class="arithmatex">\(69_{16}\)</span>

**Key insight:** The LUT does not care about Boolean minimization. Whether the function is <span class="arithmatex">\(A \oplus B \oplus C\)</span> (which requires many gates in SOP form) or a simple AND gate, the LUT uses exactly the same hardware — an 8-bit memory. Every function of 3 variables costs the same: one LUT-3.

**LUT size formula:** A <span class="arithmatex">\(k\)</span>-input LUT requires <span class="arithmatex">\(2^k\)</span> SRAM bits.

- LUT-3: <span class="arithmatex">\(2^3 = 8\)</span> bits
- LUT-4: <span class="arithmatex">\(2^4 = 16\)</span> bits
- LUT-6: <span class="arithmatex">\(2^6 = 64\)</span> bits

</div>
</details>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 14</h3>
A function <span class="arithmatex">\(F(A, B, C, D, E) = ABCDE + \overline{A}\,\overline{B}\,\overline{C}\,\overline{D}\,\overline{E}\)</span> has 5 inputs but the FPGA only has 4-input LUTs (LUT-4). Show how to decompose this function across multiple LUTs using the Shannon expansion.

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

**Problem:** 5 inputs but only LUT-4 (4 inputs each).

**Shannon expansion** on variable <span class="arithmatex">\(A\)</span>:

<span class="arithmatex">\[F = A \cdot F_A + \overline{A} \cdot F_{\overline{A}}\]</span>

where:

- <span class="arithmatex">\(F_A = F|_{A=1} = BCDE + 0 = BCDE\)</span> (4 inputs — fits in one LUT-4)
- <span class="arithmatex">\(F_{\overline{A}} = F|_{A=0} = 0 + \overline{B}\,\overline{C}\,\overline{D}\,\overline{E} = \overline{B}\,\overline{C}\,\overline{D}\,\overline{E}\)</span> (4 inputs — fits in one LUT-4)

**Combining:** <span class="arithmatex">\(F = A \cdot F_A + \overline{A} \cdot F_{\overline{A}}\)</span>

This combination is a 2:1 MUX controlled by <span class="arithmatex">\(A\)</span> — needs one more LUT.

**Implementation with 3 LUT-4s:**

```
B ──┐
C ──┤ LUT-4 #1
D ──┤ F_A = BCDE
E ──┘    │
         │
         ▼
A ──┐ LUT-4 #3
    ├─ F = A·F_A + A'·F_A'
F_A'┘    │
         │
         ▼
         F (output)
         ▲
         │
B ──┐    │
C ──┤ LUT-4 #2
D ──┤ F_A' = B'C'D'E'
E ──┘
```

Wait — LUT #3 has 3 inputs (<span class="arithmatex">\(A\)</span>, <span class="arithmatex">\(F_A\)</span>, <span class="arithmatex">\(F_{A'}\)</span>), which fits in a LUT-4.

**Final mapping:**

| LUT | Inputs | Function | SRAM contents |
|-----|--------|----------|---------------|
| LUT #1 | <span class="arithmatex">\(B, C, D, E\)</span> | <span class="arithmatex">\(F_A = BCDE\)</span> | Only address 1111 = 1, rest = 0 |
| LUT #2 | <span class="arithmatex">\(B, C, D, E\)</span> | <span class="arithmatex">\(F_{\overline{A}} = \overline{B}\,\overline{C}\,\overline{D}\,\overline{E}\)</span> | Only address 0000 = 1, rest = 0 |
| LUT #3 | <span class="arithmatex">\(A, F_A, F_{\overline{A}}\)</span> | <span class="arithmatex">\(A \cdot F_A + \overline{A} \cdot F_{\overline{A}}\)</span> | 2:1 MUX function |

**Total: 3 LUT-4s** in 2 levels of logic.

**Delay:** <span class="arithmatex">\(2 \times t_{LUT}\)</span> (two levels of LUT propagation).

**General rule:** A function of <span class="arithmatex">\(n\)</span> inputs can be implemented in LUT-<span class="arithmatex">\(k\)</span> devices using Shannon expansion, requiring roughly <span class="arithmatex">\(\lceil n/k \rceil\)</span> levels and up to <span class="arithmatex">\(2^{n-k}\)</span> LUTs in the first level.

</div>
</details>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 15</h3>
Draw the structure of a typical FPGA Configurable Logic Block (CLB) that contains two 4-input LUTs, two flip-flops, and local routing. Explain the role of each component.

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

**CLB Internal Structure:**

```
┌────────────────────────────────────────────────────────┐
│                  Configurable Logic Block (CLB)         │
│                                                        │
│  A1 ──┐                                                │
│  B1 ──┤ [LUT-4]─── F1 ───┬──[MUX]──┬── [D FF]── Q1 ──┼──→ Out1
│  C1 ──┤   #1             │    ↑     │     ↑            │
│  D1 ──┘                  │   cfg    │    CLK           │
│                          │          │                  │
│                          └──────────┴──────────────────┼──→ (comb.)
│                                                        │
│  A2 ──┐                                                │
│  B2 ──┤ [LUT-4]─── F2 ───┬──[MUX]──┬── [D FF]── Q2 ──┼──→ Out2
│  C2 ──┤   #2             │    ↑     │     ↑            │
│  D2 ──┘                  │   cfg    │    CLK           │
│                          │          │                  │
│                          └──────────┴──────────────────┼──→ (comb.)
│                                                        │
│  ┌──────── Local Routing ────────┐                     │
│  │  Carry chain: LUT#1 ←→ LUT#2 │                     │
│  │  Feedback: Q1 → LUT#2 input   │                     │
│  │  Feedback: Q2 → LUT#1 input   │                     │
│  └──────────────────────────────┘                     │
└────────────────────────────────────────────────────────┘
```

**Component Roles:**

| Component | Role |
|-----------|------|
| **LUT-4 #1, #2** | Implement any Boolean function of 4 variables. Stores the truth table in <span class="arithmatex">\(2^4 = 16\)</span> SRAM bits. |
| **D Flip-Flop #1, #2** | Provide registered outputs for sequential logic (state machines, pipelines). Clocked by the global or regional clock. |
| **Output MUX** | Selects between combinational output (directly from LUT) or registered output (from D FF). Configured by a configuration bit. |
| **Local routing** | Fast interconnect within the CLB for carry chains (arithmetic) and feedback (sequential logic). Much faster than global routing. |
| **Carry chain** | Dedicated fast path for arithmetic carry propagation between LUTs, enabling efficient adders and counters. |

**CLB can implement:**

- Two independent combinational functions of 4 inputs each
- Two independent registered functions (FSMs, counters)
- One combinational function of 5 inputs (using both LUTs with Shannon expansion)
- A 1-bit full adder with carry chain
- Small multiplexers and decoders

**Modern CLBs** (e.g., Xilinx Series 7) contain multiple "slices," each with four 6-input LUTs and eight flip-flops, plus carry logic, wide MUX resources, and distributed RAM capability.

</div>
</details>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 16</h3>
An FPGA design requires implementing a 4-bit synchronous binary counter. Map the counter onto 4-input LUTs (LUT-4) and flip-flops. Determine how many LUTs and flip-flops are needed.

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

**4-bit synchronous counter equations:**

Using T flip-flop behavior with D flip-flops:

- <span class="arithmatex">\(D_0 = \overline{Q_0}\)</span> (always toggles)
- <span class="arithmatex">\(D_1 = Q_1 \oplus Q_0\)</span>
- <span class="arithmatex">\(D_2 = Q_2 \oplus (Q_1 \cdot Q_0)\)</span>
- <span class="arithmatex">\(D_3 = Q_3 \oplus (Q_2 \cdot Q_1 \cdot Q_0)\)</span>

**LUT mapping:**

| D input | Function | # Inputs | LUT needed? |
|---------|----------|----------|-------------|
| <span class="arithmatex">\(D_0 = \overline{Q_0}\)</span> | Inverter | 1 | 1 LUT-4 (uses 1 of 4 inputs) |
| <span class="arithmatex">\(D_1 = Q_1 \oplus Q_0\)</span> | XOR | 2 | 1 LUT-4 (uses 2 of 4 inputs) |
| <span class="arithmatex">\(D_2 = Q_2 \oplus (Q_1 Q_0)\)</span> | XOR-AND | 3 | 1 LUT-4 (uses 3 of 4 inputs) |
| <span class="arithmatex">\(D_3 = Q_3 \oplus (Q_2 Q_1 Q_0)\)</span> | XOR-AND3 | 4 | 1 LUT-4 (uses all 4 inputs) |

**Resource count:**

- **LUTs: 4** (one per counter bit)
- **Flip-flops: 4** (one D FF per counter bit)
- **CLBs: 2** (if each CLB has 2 LUT+FF pairs)

**CLB assignment:**

```
CLB #1:
  LUT-4a → D0 = Q0'       → FF → Q0
  LUT-4b → D1 = Q1 ⊕ Q0   → FF → Q1

CLB #2:
  LUT-4a → D2 = Q2 ⊕ Q1Q0     → FF → Q2
  LUT-4b → D3 = Q3 ⊕ Q2Q1Q0   → FF → Q3
```

**With carry chain optimization:**

Modern FPGAs use dedicated carry chains for counters, which are faster than LUT-based XOR-AND trees:

```
CLB with carry chain:
Q0 ──[LUT]──[FF]── Q0
       │
      Carry
       ↓
Q1 ──[LUT]──[FF]── Q1
       │
      Carry
       ↓
Q2 ──[LUT]──[FF]── Q2
       │
      Carry
       ↓
Q3 ──[LUT]──[FF]── Q3
```

**Timing comparison:**

- Without carry chain: <span class="arithmatex">\(t_{LUT} + t_{routing} + t_{LUT} + \ldots\)</span> (grows with bit width)
- With carry chain: <span class="arithmatex">\(t_{LUT} + n \times t_{carry}\)</span> where <span class="arithmatex">\(t_{carry} \ll t_{routing}\)</span>

For a 4-bit counter, the carry chain reduces the critical path delay significantly, enabling higher clock frequencies.

</div>
</details>

<h2 style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">Section E: Design Flow and Device Selection (4 problems)</h2>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 17</h3>
Describe each step of the FPGA design flow from HDL entry to final bitstream. For each step, explain what happens and what files are produced.

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

**FPGA Design Flow:**

```
┌───────────────┐
│ 1. Design     │  Input: Specifications
│    Entry      │  Output: HDL source files (.v, .vhd)
└──────┬────────┘
       ▼
┌───────────────┐
│ 2. Synthesis   │  Input: HDL source
│                │  Output: Gate-level netlist (.edf, .ngc)
└──────┬────────┘
       ▼
┌───────────────┐
│ 3. Technology  │  Input: Gate-level netlist
│    Mapping     │  Output: Mapped netlist (LUTs, FFs, IOs)
└──────┬────────┘
       ▼
┌───────────────┐
│ 4. Placement   │  Input: Mapped netlist
│                │  Output: Placed design (assigned CLB locations)
└──────┬────────┘
       ▼
┌───────────────┐
│ 5. Routing     │  Input: Placed design
│                │  Output: Routed design (switch box config)
└──────┬────────┘
       ▼
┌───────────────┐
│ 6. Timing      │  Input: Routed design
│    Analysis    │  Output: Timing report (.twr)
└──────┬────────┘
       ▼
┌───────────────┐
│ 7. Bitstream   │  Input: Routed design
│    Generation  │  Output: Configuration file (.bit)
└──────┬────────┘
       ▼
┌───────────────┐
│ 8. Device      │  Input: Bitstream file
│    Programming │  Output: Configured FPGA
└───────────────┘
```

**Detailed descriptions:**

| Step | Process | Details |
|------|---------|---------|
| **1. Design Entry** | Write RTL (Register Transfer Level) description in VHDL or Verilog. Simulate for functional correctness. | Produces `.v` or `.vhd` files, testbench, simulation waveforms. |
| **2. Synthesis** | Converts HDL into a gate-level netlist. Infers flip-flops, adders, multiplexers from behavioral descriptions. Performs logic optimization. | Produces generic gate netlist (AND, OR, NOT, FF). Equivalent to converting SOP/Boolean to gates. |
| **3. Technology Mapping** | Maps generic gates to device-specific primitives (LUTs, carry chains, block RAM, DSP slices). | Produces a netlist of FPGA-specific elements. A 5-input AND might map to one LUT-6 or two LUT-4s. |
| **4. Placement** | Assigns each mapped element to a specific physical CLB location on the FPGA die. Optimizes for minimum wire length and timing. | Produces a placed design file. Uses algorithms like simulated annealing. |
| **5. Routing** | Configures programmable switch boxes to connect placed elements. Determines which wire segments and switches to use. | Produces a fully routed design. This step often dominates total compile time. |
| **6. Timing Analysis** | Calculates actual signal delays through placed-and-routed paths. Reports setup/hold violations, maximum clock frequency. | Produces timing report. If timing fails, the designer must modify HDL, add constraints, or iterate on placement. |
| **7. Bitstream Generation** | Converts the placed-and-routed design into a binary configuration file that programs the FPGA's SRAM cells. | Produces `.bit` file. Size depends on FPGA: can be from hundreds of KB to tens of MB. |
| **8. Device Programming** | Downloads bitstream to FPGA via JTAG, SPI, or other interface. SRAM-based FPGAs must be reprogrammed after every power cycle. | FPGA is now configured and operational. |

</div>
</details>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 18</h3>
An engineer must choose between a ROM, PLA, PAL, CPLD, and FPGA for each of the following applications. Justify each choice.

(a) A simple 4-input, 2-output combinational function used in 100,000 units
(b) A BCD-to-seven-segment decoder prototype
(c) A 32-bit floating-point unit with pipelining
(d) A glue-logic replacement connecting a microprocessor to memory chips
(e) A function generator that must be field-reprogrammable

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

**(a) Simple 4-input, 2-output function in 100,000 units:**

**Best choice: PAL (or mask-programmed ROM)**

- Simple combinational function fits easily in a small PAL
- High volume (100K units) justifies using the cheapest possible device
- PAL is inexpensive, fast, and deterministic
- One-time programming is acceptable for production
- ROM could also work but is overkill for only 2 outputs
- At 100K volume, a custom ASIC standard cell may also be cost-effective

**(b) BCD-to-seven-segment decoder prototype:**

**Best choice: ROM (EPROM or EEPROM)**

- 4 inputs, 7 outputs: fits a <span class="arithmatex">\(16 \times 8\)</span> ROM perfectly
- No minimization needed — just store the truth table
- For prototyping, an EEPROM or EPROM allows easy reprogramming
- Very fast design cycle: write truth table, program ROM, done
- Changes require only reprogramming, not redesign

**(c) 32-bit floating-point unit with pipelining:**

**Best choice: FPGA**

- Complex design requiring thousands of logic elements
- Pipelining requires many flip-flops and pipeline registers
- Modern FPGAs have dedicated DSP slices optimized for multiply-accumulate
- Block RAM for intermediate storage
- No other PLD has sufficient capacity
- HDL-based design flow enables efficient implementation of complex datapath

**(d) Glue logic for microprocessor-to-memory interface:**

**Best choice: CPLD**

- Address decoding and chip-select generation are wide AND-OR functions (CPLD strength)
- Predictable timing is critical for bus interfaces (CPLD has deterministic delays)
- Non-volatile: instant-on at power-up (no bitstream loading delay)
- Moderate complexity fits well in CPLD macro-cells
- Low power consumption compared to FPGA

**(e) Field-reprogrammable function generator:**

**Best choice: FPGA (SRAM-based)**

- SRAM-based FPGAs can be reprogrammed unlimited times
- Can store multiple configurations and switch between them
- Field updates via downloading new bitstream
- In-system reconfiguration (ISR) supported
- Some FPGAs support partial reconfiguration — changing part of the design while the rest continues running

**Summary Table:**

| Application | Best Device | Key Reason |
|-------------|------------|------------|
| Simple function, high volume | PAL | Low cost, simple |
| Decoder prototype | ROM | Direct truth table storage |
| 32-bit FPU | FPGA | High capacity, DSP resources |
| Glue logic | CPLD | Deterministic timing, instant-on |
| Field-reprogrammable | FPGA (SRAM) | Unlimited reprogramming |

</div>
</details>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 19</h3>
Compare volatile (SRAM-based) and non-volatile (Flash-based) FPGA technologies. For each of the following criteria, state which technology is preferred and why:

(a) Power-on behavior
(b) Reprogramming speed
(c) Logic density
(d) Security
(e) Power consumption
(f) Design iteration speed

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

**Comparison Table:**

| Criterion | SRAM-based FPGA | Flash-based FPGA | Preferred |
|-----------|----------------|-----------------|-----------|
| **(a) Power-on** | Requires external config memory; takes ms to load bitstream | Instant-on; retains configuration without power | **Flash** |
| **(b) Reprogram speed** | Very fast (ms); unlimited cycles | Slower (seconds); limited write cycles (~10K-100K) | **SRAM** |
| **(c) Logic density** | Highest density available (millions of LUTs) | Lower density; Flash transistors are larger | **SRAM** |
| **(d) Security** | Vulnerable: bitstream can be intercepted during loading | More secure: config stored on-chip, no external loading | **Flash** |
| **(e) Power** | Higher static power (SRAM leakage) | Lower static power; Flash cells don't leak | **Flash** |
| **(f) Design iteration** | Fastest iteration: reprogram instantly during development | Slightly slower due to Flash erase/write cycle | **SRAM** |

**Detailed explanations:**

**(a) Power-on behavior:**

- SRAM FPGA: Configuration SRAM is volatile. At power-up, the device loads its bitstream from an external Flash memory or microcontroller via SPI, JTAG, or parallel interface. This takes milliseconds, during which the FPGA outputs are undefined.
- Flash FPGA: Configuration is stored in on-chip Flash. The device is operational within microseconds of power-up with no external components needed.

**(b) Reprogramming speed:**

- SRAM: Simply write new data to SRAM — essentially instantaneous. No wear-out.
- Flash: Must erase then write Flash cells. Limited endurance (typically 10K-100K cycles). Not suitable for configurations that change frequently.

**(c) Logic density:**

- SRAM: SRAM cells are small in advanced process nodes (6 transistors per bit). Leading FPGAs have millions of LUTs.
- Flash: Flash transistors are physically larger and don't scale as well. Flash FPGAs top out at tens of thousands of LUTs.

**(d) Security:**

- SRAM: Bitstream must be loaded externally at every power-up, creating an opportunity for interception or cloning. Encryption and authentication help but add complexity.
- Flash: Configuration never leaves the chip during normal operation. Harder to reverse-engineer.

**(e) Power consumption:**

- SRAM: Six transistors per configuration bit contribute to static leakage current, which grows with density and shrinking process nodes.
- Flash: Flash cells have near-zero leakage. Ideal for battery-powered and always-on applications.

</div>
</details>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 20</h3>
An FPGA design fails timing analysis with the following report:

```
Critical Path: RegA → LUT1 → LUT2 → LUT3 → LUT4 → RegB
Path Delay:    2.1 ns + 0.8 ns + 1.2 ns + 0.9 ns + 0.7 ns + 1.5 ns = 7.2 ns
Setup Time:    0.3 ns
Required Period: 6.0 ns (target: 166.7 MHz)
Slack:         6.0 - 7.2 - 0.3 = -1.5 ns (VIOLATION)
```

Identify three techniques to fix this timing violation. For each technique, explain how it reduces the critical path delay.

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

**Current critical path breakdown:**

```
RegA ──2.1ns──→ LUT1 ──0.8ns──→ LUT2 ──1.2ns──→ LUT3 ──0.9ns──→ LUT4 ──0.7ns──→ RegB
 t_co           t_LUT+route     t_LUT+route     t_LUT+route     t_LUT+route      t_su
                                                                                 (0.3ns)
Total: 7.2 + 0.3 = 7.5 ns > 6.0 ns required → slack = -1.5 ns
```

**Technique 1: Pipelining (Insert Pipeline Register)**

Split the combinational path by inserting a flip-flop between LUT2 and LUT3:

```
BEFORE: RegA → LUT1 → LUT2 → LUT3 → LUT4 → RegB  (7.5 ns total)

AFTER:  RegA → LUT1 → LUT2 → RegMid  (path 1: 2.1 + 0.8 + 1.2 + 0.3 = 4.4 ns)
        RegMid → LUT3 → LUT4 → RegB   (path 2: 2.1 + 0.9 + 0.7 + 0.3 = 4.0 ns)
```

- Path 1: 4.4 ns < 6.0 ns (passes)
- Path 2: 4.0 ns < 6.0 ns (passes)
- **Trade-off:** Adds 1 clock cycle of latency. Throughput remains the same.

**Technique 2: Logic Restructuring (Reduce LUT Levels)**

Rewrite the HDL or optimize the synthesis to reduce the number of LUT levels from 4 to 3 or fewer:

```
BEFORE: 4 LUT levels in series

AFTER:  Flatten logic, use wider LUTs or parallel computation:
        RegA → LUT_A → LUT_C → RegB
        RegA → LUT_B ─┘
```

Methods:

- Use resource sharing to merge logic
- Rewrite HDL to avoid deep conditional chains (`if-else-if` cascades create long LUT chains)
- Replace priority encoder structure with parallel one-hot MUX
- Estimated savings: 1-2 LUT levels (<span class="arithmatex">\(\approx\)</span> 1.5-3.0 ns)

**Technique 3: Placement Constraints and Floorplanning**

The routing delays (embedded in the LUT+route times) depend on physical distance. Constrain critical-path elements to be placed close together:

```
BEFORE: LUT1 placed far from LUT2 → long routing wire → 1.2 ns route delay
AFTER:  LUT1 and LUT2 in same CLB or adjacent CLBs → 0.3 ns route delay
```

Methods:

- Add placement constraints (`LOC`, `PBLOCK`) in the constraints file
- Use `set_max_delay` timing constraints to guide the placer
- Enable physical synthesis optimizations (register replication, logic duplication near destination)
- Estimated savings: 0.5-2.0 ns from reduced routing delay

**Additional techniques:**

| Technique | Delay Reduction | Side Effect |
|-----------|----------------|-------------|
| **Retiming** | Move logic across register boundaries | Changes pipeline stage assignments |
| **Register replication** | Reduces fan-out, shortening route delay | Uses more flip-flops |
| **Use dedicated resources** | Carry chains, DSP blocks are faster than LUTs | Consumes special resources |
| **Increase target device** | Faster speed grade has lower intrinsic delays | Higher cost |

</div>
</details>

<h2 style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">Summary</h2>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

| Section | Topics Covered | Problem Count |
|---------|---------------|---------------|
| A | ROM and PLA Programming | 4 |
| B | PAL Design | 4 |
| C | CPLD and FPGA Architecture | 4 |
| D | LUT and CLB Design | 4 |
| E | Design Flow and Device Selection | 4 |
| **Total** | | **20** |

</div>

</div>
