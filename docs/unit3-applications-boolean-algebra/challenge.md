---
title: Unit 3 Challenge - Applications of Boolean Algebra
description: Challenge problems for applications of Boolean algebra — answers only, no solutions
---

# Challenge Problems: Applications of Boolean Algebra

These challenge problems test deeper understanding. Only final answers are provided — work through each problem on your own.

---

#### Challenge 1: Circuit Design from Word Problem

A security system has four sensors: Door ($D$), Window ($W$), Motion ($M$), and Glass-break ($G$). The alarm ($A$) should activate when:

- The door sensor AND at least one other sensor are triggered, OR
- Any three or more sensors are triggered simultaneously

Write the minimum SOP expression for the alarm output $A$.

??? success "Answer"
    $A = DW + DM + DG + WMG$

    The first three terms cover "door AND at least one other." The last term covers "any three without door" (only $WMG$ is possible for three or more without $D$). The case of all four is covered by the first three terms already.

---

#### Challenge 2: Full Adder/Subtractor Combined Circuit

Design a combinational circuit that acts as both a full adder and a full subtractor, controlled by a mode signal $M$. When $M = 0$, it performs $A + B + C_{in}$; when $M = 1$, it performs $A - B - C_{in}$ (using two's complement). Give the expressions for the output ($Result$) and the carry/borrow ($C_{out}/B_{out}$).

??? success "Answer"
    $Result = A \oplus (B \oplus M) \oplus C_{in}$

    $C_{out}/B_{out} = (A \oplus M) \cdot (B \oplus M) + (B \oplus M) \cdot C_{in} + C_{in} \cdot (A \oplus M)$

    Equivalently, XOR $B$ and $C_{in}$ with $M$ before feeding them to a standard full adder:

    $Result = A \oplus B' \oplus C'_{in}$ where $B' = B \oplus M$, $C'_{in} = C_{in} \oplus M$

    $C_{out} = A \cdot B' + B' \cdot C'_{in} + C'_{in} \cdot A$

    When $M = 1$, the initial carry-in should also be 1 to complete the two's complement.

---

#### Challenge 3: BCD-to-Excess-3 Converter

Construct the truth table for a BCD-to-Excess-3 code converter (4-bit input $B_3B_2B_1B_0$, 4-bit output $E_3E_2E_1E_0$). Write the minimum SOP expression for each output bit, using don't-care conditions for invalid BCD inputs (10–15).

??? success "Answer"
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

    Minimum SOP (with don't cares for inputs 10–15):

    $E_3 = B_3 + B_2 B_1 + B_2 B_0$

    $E_2 = \overline{B_2}\,B_1 + \overline{B_2}\,B_0 + B_2\,\overline{B_1}\,\overline{B_0}$

    $E_1 = \overline{B_1}\,\overline{B_0} + B_1 B_0$

    $E_0 = \overline{B_0}$

---

#### Challenge 4: Parity Generator/Checker Design

Design an even-parity generator for a 7-bit ASCII input ($D_6 D_5 D_4 D_3 D_2 D_1 D_0$) that produces a parity bit $P$. Then design a parity checker circuit that takes the 8-bit code ($D_6 \ldots D_0, P$) and outputs an error signal $E$ that is 1 when a single-bit error is detected. Express both circuits using XOR gates and state the total gate count.

??? success "Answer"
    **Parity generator:**

    $P = D_6 \oplus D_5 \oplus D_4 \oplus D_3 \oplus D_2 \oplus D_1 \oplus D_0$

    Requires **6 XOR gates** (cascaded).

    **Parity checker:**

    $E = D_6 \oplus D_5 \oplus D_4 \oplus D_3 \oplus D_2 \oplus D_1 \oplus D_0 \oplus P$

    Requires **7 XOR gates**. $E = 1$ indicates an error (odd number of 1s detected).

    **Total: 13 XOR gates** (6 for generator + 7 for checker).

---

#### Challenge 5: Multi-Output Combinational Circuit Optimization

A combinational circuit has three inputs ($A$, $B$, $C$) and three outputs defined as:

- $F_1 = \sum m(0, 2, 3, 5, 7)$
- $F_2 = \sum m(0, 1, 4, 5, 6)$
- $F_3 = \sum m(1, 2, 6, 7)$

Find the minimum two-level AND-OR implementation for all three outputs using shared product terms where possible. State the total gate count (AND gates + OR gates + inverters).

??? success "Answer"
    Minimum expressions:

    $F_1 = \overline{A}\,\overline{B} + \overline{A}\,C + BC = \overline{A}\,\overline{B} + C(\overline{A} + B)$

    Simplified: $F_1 = \overline{A}\,\overline{B} + \overline{A}\,C + BC$

    $F_2 = \overline{B}\,\overline{C} + A\overline{C} + \overline{A}\,\overline{B}$

    Simplified: $F_2 = \overline{B}\,\overline{C} + A\overline{C} + \overline{A}\,\overline{B}$

    $F_3 = \overline{A}\,B\,\overline{C} + A\overline{B}\,C + AB + \overline{A}\,\overline{B}\,C$

    Simplified: $F_3 = B \oplus C$ (verify: $BC' + B'C$ doesn't match — actually $F_3 = A\overline{B}\,C + \overline{A}\,B\,\overline{C} + AB + \overline{A}\,\overline{B}\,C$)

    $F_3 = \overline{A}\,\overline{B}\,C + \overline{A}\,B\,\overline{C} + AB\overline{C} + ABC = \overline{A}(B \oplus C) + AB = B \oplus (\overline{A} \cdot C)$

    Simplest forms: $F_3 = A B + \overline{B}\,C + \overline{A}\,B\,\overline{C}$

    Shared term $\overline{A}\,\overline{B}$ appears in both $F_1$ and $F_2$.

    **Total: 8 AND gates, 3 OR gates, 3 inverters = 14 gates**
