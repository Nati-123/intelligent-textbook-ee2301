---
title: Unit 7 Challenge - Multi-Level Gate Circuits
description: Challenge problems for multi-level gate circuits — answers only, no solutions
---

<div class="problems-styled" markdown>

<h1 style="color: #5A3EED !important; border-bottom: 3px solid #5A3EED; padding-bottom: 0.4rem; font-weight: 800;">Challenge Problems: Multi-Level Gate Circuits</h1>

<p style="color: #555; line-height: 1.85; font-size: 1.05rem; margin-bottom: 2rem;">
These challenge problems test deeper understanding. Only final answers are provided — work through each problem on your own.
</p>

---

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);" markdown>

<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Challenge 1: Convert a 3-Level Circuit to All-NAND</p>

<p style="color: #333; line-height: 1.75;">Convert the following 3-level AND-OR-AND expression to an equivalent all-NAND implementation. State the total number of NAND gates required (including any inverters implemented as single-input NANDs).</p>

$$F = (AB + CD)(E + FG)$$

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Multi-level NAND implementation:</p>

- Level 1: $\overline{AB}$, $\overline{CD}$, $\overline{FG}$ — **3 NAND gates**
- Level 2: $AB + CD = \overline{\overline{AB} \cdot \overline{CD}}$ — **1 NAND gate**; for $E + FG$, need $E' = \overline{E}$ via inverter (**1 NAND gate**), then $\overline{E' \cdot \overline{FG}}$ — **1 NAND gate**
- Level 3: AND the two Level 2 results using NAND + NAND inverter — **2 NAND gates**

<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;">Total: 8 NAND gates (including inverters as single-input NANDs)</p>

</div>
</details>

</div>

---

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);" markdown>

<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Challenge 2: Gate Count Comparison — AND-OR vs NAND-NAND</p>

<p style="color: #333; line-height: 1.75;">For the function $F(A, B, C, D) = \sum m(1, 3, 5, 7, 8, 12, 13)$, find the minimum SOP expression, then implement it as:</p>

(a) AND-OR circuit &emsp; (b) NAND-NAND circuit

Compare the total gate counts for each implementation.

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Minimum SOP (via K-map):</p>

Minterms: 1(0001), 3(0011), 5(0101), 7(0111), 8(1000), 12(1100), 13(1101)

- $\overline{A}\,D$ covers {1, 3, 5, 7}
- $A\,B\,\overline{C}$ covers {12, 13}
- $A\,\overline{B}\,\overline{C}\,\overline{D}$ covers {8}

$$F = \overline{A}\,D + A\,B\,\overline{C} + A\,\overline{B}\,\overline{C}\,\overline{D}$$

**(a) AND-OR:** 3 AND gates + 1 OR gate + 3 NAND inverters (for $\overline{A}$, $\overline{B}$, $\overline{C}$, $\overline{D}$ — some shared) = **7 gates**

**(b) NAND-NAND:** 3 NAND gates + 1 NAND output + 3 NAND inverters = **7 gates**

<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;">Gate counts are identical — NAND-NAND requires the same number of gates as AND-OR for any two-level implementation.</p>

</div>
</details>

</div>

---

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);" markdown>

<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Challenge 3: Factor a Complex SOP into Multi-Level Form</p>

<p style="color: #333; line-height: 1.75;">Factor the following SOP expression into a multi-level form that reduces the total literal count:</p>

$$F = ABCD + ABCE + AB\overline{C}G + AB\overline{C}H + \overline{A}\,\overline{B}\,D\,E$$

State the original literal count and the reduced literal count.

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Original literal count: $4 + 4 + 4 + 4 + 4 = 20$ literals</p>

**Factored form:**

$$F = AB\bigl[C(D + E) + \overline{C}(G + H)\bigr] + \overline{A}\,\overline{B}\,D\,E$$

**Reduced literal count:** $A, B, C, D, E, \overline{C}, G, H, \overline{A}, \overline{B}, D, E = 12$ literals

<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;">Multi-level factorization saves 8 literals (from 20 to 12).</p>

</div>
</details>

</div>

---

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);" markdown>

<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Challenge 4: NOR-Only Implementation</p>

<p style="color: #333; line-height: 1.75;">Implement the following function using only NOR gates. State the number of NOR gates needed (including any used as inverters).</p>

$$F = (A + B)(\overline{C} + D)$$

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">NOR implementation using $X \cdot Y = \overline{\overline{X} + \overline{Y}}$:</p>

- Gate 1: $A \text{ NOR } B = \overline{A+B}$
- Gate 2: $C \text{ NOR } C = \overline{C}$ (inverter)
- Gate 3: $\overline{C} \text{ NOR } D = \overline{\overline{C}+D}$
- Gate 4: $\text{G1} \text{ NOR } \text{G3} = \overline{\overline{A+B} + \overline{\overline{C}+D}} = (A+B)(\overline{C}+D) = F$

Gate 4 uses the AND-from-NOR identity: the NOR of the complements equals the AND of the originals.

<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;">Total: 4 NOR gates</p>

</div>
</details>

</div>

---

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);" markdown>

<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Challenge 5: Bubble Pushing Through a 3-Level Circuit</p>

<p style="color: #333; line-height: 1.75;">A circuit implements the following using a mix of AND, OR, NAND, and NOR gates:</p>

$$F = \overline{\overline{AB} \cdot \overline{C + D}} + E$$

Use bubble pushing to simplify, then convert to an all-NAND implementation. State the final expression and gate count.

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Simplification:</p>

$$\overline{\overline{AB} \cdot \overline{C+D}} = \overline{\overline{AB}} + \overline{\overline{C+D}} = AB + (C + D)$$

$$F = AB + C + D + E$$

**All-NAND implementation** using $F = \overline{\overline{AB} \cdot \overline{C} \cdot \overline{D} \cdot \overline{E}}$:

- Gate 1: $A \text{ NAND } B = \overline{AB}$
- Gate 2: $C \text{ NAND } C = \overline{C}$ (inverter)
- Gate 3: $D \text{ NAND } D = \overline{D}$ (inverter)
- Gate 4: $E \text{ NAND } E = \overline{E}$ (inverter)
- Gate 5: 4-input NAND$(\text{G1}, \overline{C}, \overline{D}, \overline{E}) = F$

<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;">Total: 5 NAND gates (1 two-input + 3 inverters + 1 four-input)</p>

</div>
</details>

</div>

</div>
