---
title: Unit 7 Challenge - Multi-Level Gate Circuits
description: Challenge problems for multi-level gate circuits — answers only, no solutions
---

<div class="problems-styled" markdown>

# Challenge Problems: Multi-Level Gate Circuits

These challenge problems test deeper understanding. Only final answers are provided — work through each problem on your own.

---

#### Challenge 1: Convert a 3-Level Circuit to All-NAND

Convert the following 3-level AND-OR-AND expression to an equivalent all-NAND implementation. State the total number of NAND gates required (including any inverters implemented as single-input NANDs).

$$F = (AB + CD)(E + FG)$$

**Answer:** Expand: $F = ABE + ABFG + CDE + CDFG$

For NAND-NAND two-level: 4 NAND gates (one for each product term) + 1 NAND gate (for the OR function) = **5 NAND gates**.

However, for a direct multi-level NAND conversion of the original 3-level structure:

$F = (AB + CD)(E + FG)$

Level 1: Compute $\overline{AB}$, $\overline{CD}$, $\overline{FG}$ — 3 NAND gates

Level 2: $AB + CD = \overline{\overline{AB} \cdot \overline{CD}}$ — 1 NAND gate; $E + FG$: need $\overline{\overline{E} \cdot \overline{FG}}$ — 1 NAND gate + 1 NAND (inverter for $E$)

Level 3: AND the two results — use NAND + NAND(inverter): 2 NAND gates

**Total: 8 NAND gates** for the multi-level implementation (including inverters as single-input NANDs).

---

#### Challenge 2: Gate Count Comparison — AND-OR vs NAND-NAND

For the function $F(A, B, C, D) = \sum m(1, 3, 5, 7, 8, 12, 13)$, find the minimum SOP expression, then implement it as:

(a) AND-OR circuit
(b) NAND-NAND circuit

Compare the total gate counts for each implementation.

**Answer:** **Minimum SOP:** $F = \overline{A}\,D + A\,\overline{B}\,\overline{C} + A\,B\,\overline{D}$

**Wait** — verify: $\overline{A}\,D$ covers {1,3,5,7} ✓. $A\,\overline{B}\,\overline{C}$ covers {8,9} — but 9 not in set. $A\,B\,\overline{D}$ covers {12,14} — 14 not in set.

Re-solve: minterms 1(0001), 3(0011), 5(0101), 7(0111), 8(1000), 12(1100), 13(1101).

K-map: $\overline{A}\,D$ covers {1,3,5,7}. $A\,\overline{C}\,\overline{D}$ covers {8,12}. $A\,B\,\overline{C}\,D$ covers {13}. Or $A\,B\,D$ covers {13,15} — 15 not in set. $A\,\overline{B}\,\overline{C}\,\overline{D}$ covers {8}. $A\,B\,\overline{C}$ covers {12,13}.

**Minimum SOP:** $F = \overline{A}\,D + A\,\overline{B}\,\overline{C}\,\overline{D} + A\,B\,\overline{C}$

**(a) AND-OR:** 3 AND gates (2-input, 4-input, 3-input) + 1 OR gate (3-input) + 3 inverters = **7 gates**

**(b) NAND-NAND:** 3 NAND gates (same fan-in as AND gates) + 1 NAND gate (3-input, replacing OR) + 3 NAND inverters = **7 gates**

**Gate counts are identical** — NAND-NAND requires the same number of gates as AND-OR for a two-level implementation, just with different gate types.

---

#### Challenge 3: Factor a Complex SOP into Multi-Level Form

Factor the following SOP expression into a multi-level form that reduces the total literal count:

$$F = ABCD + ABCE + AB\overline{C}F + AB\overline{C}G + \overline{A}\,\overline{B}\,D\,E$$

State the original literal count and the reduced literal count.

**Answer:** **Original literal count:** $4 + 4 + 4 + 4 + 4 = 20$ literals

**Factored form:**

$F = AB[C(D + E) + \overline{C}(F + G)] + \overline{A}\,\overline{B}\,D\,E$

**Reduced literal count:** $A, B, C, D, E, \overline{C}, F, G, \overline{A}, \overline{B}, D, E = 12$ literals

The multi-level factorization saves **8 literals** (from 20 to 12).

---

#### Challenge 4: NOR-Only Implementation

Implement the following function using only NOR gates:

$$F = (A + B)(\overline{C} + D)$$

Draw the logic diagram and state the number of NOR gates needed (including any used as inverters).

**Answer:** $F = (A + B)(\overline{C} + D)$

Step 1: $(A + B) = \overline{\overline{A + B}} = \overline{A \downarrow B}$ — needs NOR then NOR-inverter

Step 2: $(\overline{C} + D)$ — note $\overline{C} + D = \overline{C \cdot \overline{D}}$... using NOR:

NOR implementation:

- Gate 1: $\overline{A + B}$ (NOR of $A, B$)
- Gate 2: Invert Gate 1 → $A + B$ (NOR with single input, i.e., $\overline{\overline{A+B}} = A+B$)
- Gate 3: $\overline{C}$ (NOR inverter on $C$)
- Gate 4: $\overline{\overline{C} + D}$ = NOR($\overline{C}$, $D$) = $C\overline{D}$
- Gate 5: Invert Gate 4 → $\overline{C} + D$
- Gate 6: NOR(outputs of Gate 2 and Gate 5) = $\overline{(A+B) + (\overline{C}+D)}$... that gives OR, not AND.

For AND using NOR: $X \cdot Y = \overline{\overline{X} + \overline{Y}}$

- Gate 6: NOR(Gate 1, Gate 4) = $\overline{\overline{A+B} + C\overline{D}} = (A+B) \cdot \overline{C\overline{D}} = (A+B)(\overline{C}+D)$ ✓

**Total: 4 NOR gates** (Gate 1, Gate 3, Gate 4, Gate 6).

---

#### Challenge 5: Bubble Pushing Through a 3-Level Circuit

A circuit implements $F = \overline{\overline{(A \cdot B)} \cdot \overline{(C + D)}} + E$ using a mix of AND, OR, NAND, and NOR gates.

Use bubble pushing to convert this entire expression into an equivalent all-NAND implementation. State the final expression and gate count.

**Answer:** Simplify the expression first:

$\overline{(A \cdot B)} = \overline{AB}$ (NAND)

$\overline{(C + D)}$ (NOR)

$\overline{\overline{AB} \cdot \overline{C + D}}$ = NAND of (NAND, NOR) = $AB + (C + D) = AB + C + D$

$F = AB + C + D + E$

**All-NAND implementation of $F = AB + C + D + E$:**

- Gate 1: NAND($A$, $B$) = $\overline{AB}$
- Gate 2: NAND(Gate 1, $\overline{C}$, $\overline{D}$, $\overline{E}$)... For SOP → NAND-NAND:

$F = AB + C + D + E$. Treating $C$, $D$, $E$ as single-literal terms:

- Gate 1: NAND($A$, $B$) = $\overline{AB}$
- Gate 2: NAND($\overline{C}$) = $C$ (inverter, or just use $\overline{C}$ inverted)
- Actually: NAND-NAND form: $F = \overline{\overline{AB} \cdot \overline{C} \cdot \overline{D} \cdot \overline{E}}$

- Gate 1: NAND($A$, $B$)
- Gates 2–4: NAND inverters for $C$, $D$, $E$ (producing $\overline{C}$, $\overline{D}$, $\overline{E}$)
- Gate 5: NAND(Gate 1, $\overline{C}$, $\overline{D}$, $\overline{E}$)

**Total: 5 NAND gates** (1 two-input NAND + 3 inverters + 1 four-input NAND)

</div>

