---
title: Unit 5 Challenge - Karnaugh Maps
description: Challenge problems for Karnaugh maps — answers only, no solutions
---

# Challenge Problems: Karnaugh Maps

These challenge problems test deeper understanding. Only final answers are provided — work through each problem on your own.

---

#### Challenge 1: 4-Variable K-Map with Don't Cares

Simplify the following function using a Karnaugh map to obtain the minimum SOP expression:

$$F(A, B, C, D) = \sum m(2, 3, 4, 5, 13, 15) + \sum d(8, 9, 10, 11)$$

??? success "Answer"
    $F = \overline{A}\,\overline{B}\,C + \overline{A}\,B\,\overline{C} + A\,\overline{B} + B\,C\,D$

    Using don't cares optimally:

    $F = \overline{B}\,C + \overline{A}\,B\,\overline{C} + BD$

---

#### Challenge 2: K-Map Yielding POS Form

Find the minimum POS (product of sums) expression for:

$$F(A, B, C, D) = \prod M(0, 1, 2, 8, 9, 10, 14)$$

??? success "Answer"
    Group the 0s on the K-map:

    $\overline{F} = \overline{B}\,\overline{C}\,\overline{D} + \overline{B}\,\overline{D}\,A + ...$

    Minimum POS: $F = (B + D)(A + C)(\overline{A} + B + \overline{C})$

    Equivalently, group the 0s to find $\overline{F}$, then complement:

    $\overline{F} = \overline{B}\,\overline{D} + \overline{A}\,\overline{C}\,\overline{D} + A\,B\,C\,\overline{D}$...

    Minimum POS: $F = (B + D)(\overline{A} + C + D)(A + \overline{B} + \overline{C} + D)$

---

#### Challenge 3: Multiple Minimum Solutions

Find ALL minimum SOP expressions for:

$$F(A, B, C, D) = \sum m(0, 2, 5, 7, 8, 10, 13, 15)$$

Identify the essential prime implicants and show that the function has more than one minimum cover.

??? success "Answer"
    Essential prime implicants: **None** — this function has no essential prime implicants.

    The prime implicants are: $\overline{B}\,\overline{D}$, $B\,D$, $\overline{A}\,\overline{C}\,\overline{D}$, $A\,\overline{C}\,\overline{D}$, $\overline{A}\,C\,D$, $A\,C\,D$, $\overline{C}\,\overline{D}$, $C\,D$.

    Two minimum SOP expressions (each with 2 terms, 4 literals):

    **Solution 1:** $F = \overline{B}\,\overline{D} + BD$

    **Solution 2:** $F = \overline{C}\,\overline{D} + CD$

    Both are equivalent to $F = B \odot D$ and $F = C \odot D$...

    The two minimum covers are: $F = \overline{B}\,\overline{D} + B\,D$ and $F = \overline{C}\,\overline{D} + C\,D$

---

#### Challenge 4: All Prime Implicants Identification

For the function $F(W, X, Y, Z) = \sum m(0, 2, 4, 5, 6, 7, 8, 10, 13)$, use a K-map to:

1. Find all prime implicants
2. Identify the essential prime implicants
3. Find the minimum SOP expression

??? success "Answer"
    **All prime implicants:**

    - $\overline{X}\,\overline{Z}$ (covers 0, 2, 8, 10)
    - $\overline{W}\,X$ (covers 4, 5, 6, 7)
    - $\overline{W}\,\overline{Z}$ (covers 0, 2, 4, 6)
    - $W\,X\,\overline{Y}\,Z$ (covers 13)
    - $\overline{W}\,Y\,\overline{Z}$ (covers 2, 6)
    - $\overline{W}\,X\,\overline{Y}$ (covers 4, 5)

    **Essential prime implicants:**

    - $\overline{X}\,\overline{Z}$ (only PI covering minterms 8 and 10)
    - $\overline{W}\,X$ (only PI covering minterm 7)
    - $W\,X\,\overline{Y}\,Z$ (only PI covering minterm 13)

    **Minimum SOP:** $F = \overline{X}\,\overline{Z} + \overline{W}\,X + W\,X\,\overline{Y}\,Z$

---

#### Challenge 5: 5-Variable K-Map Simplification

Simplify the following 5-variable function using a K-map (two 4-variable maps for $A = 0$ and $A = 1$):

$$F(A, B, C, D, E) = \sum m(0, 1, 2, 4, 5, 6, 16, 17, 18, 20, 21, 22, 25, 29)$$

??? success "Answer"
    Split into two maps:

    **$A = 0$ map:** minterms $0, 1, 2, 4, 5, 6$ → These are $\overline{C}\,\overline{D}\,\overline{E}$, $\overline{C}\,\overline{D}\,E$, $\overline{C}\,D\,\overline{E}$, $C\,\overline{D}\,\overline{E}$, $C\,\overline{D}\,E$, $C\,D\,\overline{E}$ → $\overline{B}\,\overline{E} + \overline{B}\,\overline{D}$

    Wait — reindex: for $A=0$, minterms 0–15 map to $BCDE$:

    - $m(0) = 0000$, $m(1) = 0001$, $m(2) = 0010$, $m(4) = 0100$, $m(5) = 0101$, $m(6) = 0110$

    Group: $\overline{B}\,\overline{D} + \overline{B}\,\overline{E} + ...$

    Simplified: $\overline{B}\,\overline{E} + \overline{B}\,\overline{D} = \overline{B}(\overline{D} + \overline{E})$... actually $= \overline{B}\,\overline{E} + \overline{D}\,\overline{E}$

    From the K-map: $\overline{B}\,\overline{E} + \overline{B}\,D\,\overline{E}$... these minterms form $\overline{B}\,\overline{E} + \overline{B}\,\overline{D}$...

    Minimum SOP: $F = \overline{B}\,\overline{E} + \overline{B}\,\overline{D} + \overline{A}\,\overline{B}\,D\,\overline{E}$...

    **Final answer:**

    $F = \overline{B}\,\overline{E} + \overline{B}\,D\,\overline{E} + A\,\overline{B}\,D\,E$

    More carefully: $F = \overline{B}\,\overline{E} + \overline{D}\,\overline{E} + A\,\overline{B}\,\overline{C}\,D\,E$
