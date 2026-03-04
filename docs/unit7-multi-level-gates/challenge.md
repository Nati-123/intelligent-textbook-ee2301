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

<p style="color: #333; line-height: 1.75;" markdown>For the function $F(A, B, C, D) = \sum m(1, 3, 5, 7, 8, 12, 13)$, find the minimum SOP expression, then implement it as:</p>

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

<p style="color: #2E7D32; font-weight: 700; margin-top: 0;" markdown>Original literal count: $4 + 4 + 4 + 4 + 4 = 20$ literals</p>

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

<p style="color: #2E7D32; font-weight: 700; margin-top: 0;" markdown>NOR implementation using $X \cdot Y = \overline{\overline{X} + \overline{Y}}$:</p>

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

---

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);" markdown>

<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Challenge 6: Critical Path Delay Calculation</p>

<p style="color: #333; line-height: 1.75;">A circuit implements $F = (AB + CD)(E + F)$ using 2-input gates only. Each gate has a propagation delay of 2 ns. Calculate the critical path delay for the multi-level implementation. Then find a 2-level SOP form and compare the delay.</p>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.75; margin-top: 0;">
<strong>Multi-level:</strong> Level 1: AND(A,B), AND(C,D), OR(E,F). Level 2: OR(AB,CD). Level 3: AND(result, E+F). → <strong>3 levels × 2 ns = 6 ns</strong>.
</p>
<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;">
<strong>Two-level SOP:</strong> <span class="arithmatex">\(F = ABE + ABF + CDE + CDF\)</span> → <strong>2 levels = 4 ns</strong>, but uses 4 AND gates + 1 OR gate (5 gates vs 5 gates). Faster circuit, same gate count.
</p>
</div>
</details>

</div>

---

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);" markdown>

<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Challenge 7: Fan-In Limitation with 2-Input NAND</p>

<p style="color: #333; line-height: 1.75;">A technology library has only 2-input NAND gates. Implement the 4-input AND function $F = ABCD$ using only 2-input NAND gates. What is the minimum number of gates, and how many levels does the circuit have?</p>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.75; margin-top: 0;">
Level 1: <span class="arithmatex">\(G_1 = \overline{AB}\)</span>, <span class="arithmatex">\(G_2 = \overline{CD}\)</span> (2 gates)
</p>
<p style="color: #333; line-height: 1.75;">
Level 2: <span class="arithmatex">\(G_3 = \overline{G_1 \cdot G_2} = \overline{\overline{AB} \cdot \overline{CD}} = AB + CD\)</span> (1 gate — but this gives OR, not AND!)
</p>
<p style="color: #333; line-height: 1.75;">
Correct approach: <span class="arithmatex">\(G_1 = \overline{AB}\)</span>, invert: <span class="arithmatex">\(G_2 = \overline{G_1 \cdot G_1} = AB\)</span>, similarly <span class="arithmatex">\(G_4 = CD\)</span>, then <span class="arithmatex">\(G_5 = \overline{G_2 \cdot G_4}\)</span>, <span class="arithmatex">\(F = \overline{G_5 \cdot G_5}\)</span>.
</p>
<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;">
Total: <strong>5 NAND gates, 4 levels</strong>. The NAND-NAND cascade naturally produces AND at even-numbered output levels.
</p>
</div>
</details>

</div>

---

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);" markdown>

<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Challenge 8: Factoring for Shared Subexpressions</p>

<p style="color: #333; line-height: 1.75;">Two functions share inputs: $F_1 = AC + BC + \overline{A}\overline{B}D$ and $F_2 = AC + BC + ABD$. Factor these to maximize sharing of common subexpressions. What is the total gate count for implementing both functions with sharing vs without?</p>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.75; margin-top: 0;">
Both share <span class="arithmatex">\(AC + BC = C(A+B)\)</span>. Let <span class="arithmatex">\(S = C(A+B)\)</span>.
</p>
<p style="color: #333; line-height: 1.75;">
<span class="arithmatex">\(F_1 = S + \overline{A}\,\overline{B}D\)</span>, <span class="arithmatex">\(F_2 = S + ABD\)</span>
</p>
<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;">
<strong>With sharing:</strong> 2 gates for S + 2 inverters + 2 AND + 2 OR = <strong>8 gates</strong>. <strong>Without sharing:</strong> Each function independently needs 5-6 gates = <strong>~12 gates</strong>. Sharing saves ~33%.
</p>
</div>
</details>

</div>

</div>
