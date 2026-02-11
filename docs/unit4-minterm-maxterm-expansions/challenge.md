---
title: Unit 4 Challenge - Minterm & Maxterm Expansions
description: Challenge problems for minterm and maxterm expansions — answers only, no solutions
---

# Challenge Problems: Minterm & Maxterm Expansions

These challenge problems test deeper understanding. Only final answers are provided — work through each problem on your own.

---

#### Challenge 1: Convert Between Minterm and Maxterm List Forms

A function of four variables ($A$, $B$, $C$, $D$) is defined as:

$$F(A, B, C, D) = \sum m(1, 3, 5, 7, 9, 11, 13, 15)$$

Express $F$ in maxterm list form $\prod M(\ldots)$ and identify the pattern in the function.

!!! success "Answer"
    $F(A, B, C, D) = \prod M(0, 2, 4, 6, 8, 10, 12, 14)$

    **Pattern:** $F = D$ — the function equals 1 exactly when the least significant bit $D = 1$ (all odd minterms).

---

#### Challenge 2: Expand a Complex Expression to Canonical SOP

Expand the following expression into canonical sum-of-minterms form for variables $A$, $B$, $C$, $D$:

$$F = A\overline{C} + \overline{B}\,D + \overline{A}\,B\,C$$

!!! success "Answer"
    $F(A, B, C, D) = \sum m(1, 3, 5, 8, 9, 10, 11, 12, 14, 15)$

    Expansion:

    - $A\overline{C} \rightarrow m(8, 9, 12, 13)$... wait, $A\overline{C}$: $A=1, C=0$, $B$ and $D$ free → $m(8, 9, 12, 13)$
    - $\overline{B}\,D$: $B=0, D=1$, $A$ and $C$ free → $m(1, 3, 9, 11)$
    - $\overline{A}\,BC$: $A=0, B=1, C=1$, $D$ free → $m(6, 7)$

    Union: $\sum m(1, 3, 6, 7, 8, 9, 11, 12, 13)$

---

#### Challenge 3: Shannon Decomposition Application

Given the function $F(A, B, C, D) = \sum m(0, 1, 4, 5, 6, 7, 14, 15)$, apply Shannon decomposition about variable $A$ to express $F$ in the form:

$$F = \overline{A} \cdot F_0 + A \cdot F_1$$

where $F_0 = F|_{A=0}$ and $F_1 = F|_{A=1}$. Give both cofactors as simplified expressions.

!!! success "Answer"
    **Cofactor $F_0 = F|_{A=0}$:** Minterms with $A=0$: $m(0, 1, 4, 5, 6, 7)$ → as 3-variable function of $B, C, D$: $m_3(0, 1, 4, 5, 6, 7) = \overline{B} + C$

    Simplified: $F_0 = \overline{B} + C$

    **Cofactor $F_1 = F|_{A=1}$:** Minterms with $A=1$: $m(14, 15)$ → as 3-variable function: indices $6, 7$ → $m_3(6, 7) = BC$

    Simplified: $F_1 = BC$

    **Final decomposition:** $F = \overline{A}(\overline{B} + C) + A \cdot BC$

---

#### Challenge 4: POS-to-SOP Conversion via Complement

A function is given in POS form:

$$F(A, B, C) = (A + B + C)(A + \overline{B} + C)(\overline{A} + B + \overline{C})$$

Find $\overline{F}$ in SOP form, then use it to derive $F$ in SOP form.

!!! success "Answer"
    The maxterms present in $F$: $(A + B + C) = M_0$, $(A + \overline{B} + C) = M_2$, $(\overline{A} + B + \overline{C}) = M_5$

    So $F = \prod M(0, 2, 5)$.

    $\overline{F} = \sum m(0, 2, 5) = \overline{A}\,\overline{B}\,\overline{C} + \overline{A}\,B\,\overline{C} + A\overline{B}\,C$

    $F = \sum m(1, 3, 4, 6, 7) = \overline{A}\,\overline{B}\,C + \overline{A}\,B\,C + A\overline{B}\,\overline{C} + AB\overline{C} + ABC$

    Simplified SOP: $F = \overline{A}\,C + A\overline{C} + AB = A + C(\overline{B}+B) ...$

    $F = \overline{A}\,C + A\overline{C} + AB$

---

#### Challenge 5: Find the Function from a Minterm/Maxterm List Pair

A function of three variables satisfies both of these conditions simultaneously:

- $F(A, B, C) + G(A, B, C) = \sum m(0, 1, 2, 3, 5, 6, 7)$ (the OR of $F$ and $G$)
- $F(A, B, C) \cdot G(A, B, C) = \sum m(1, 5, 7)$ (the AND of $F$ and $G$)

If $F = \sum m(1, 3, 5, 7)$, find $G$ as a minterm list and simplified expression.

!!! success "Answer"
    Since $F \cdot G = \sum m(1, 5, 7)$, $G$ must include minterms $1, 5, 7$.

    Since $F + G = \sum m(0, 1, 2, 3, 5, 6, 7)$, every minterm in this set must be in $F$ or $G$ (or both).

    $F = \{1, 3, 5, 7\}$. Minterms in $F + G$ but not in $F$: $\{0, 2, 6\}$ — these must be in $G$.

    $G$ may also include minterm $3$ (it's in $F$, so $F \cdot G$ would include $3$ — but $F \cdot G$ does NOT include $3$). So $G$ does NOT include $3$.

    Minterm $4$ is not in $F + G$, so $G$ cannot include $4$.

    $G = \sum m(0, 1, 2, 5, 6, 7) = \overline{A}\,\overline{B} + B + \overline{C}$

    Simplified: $G = \overline{A}\,\overline{B} + \overline{B}\,\overline{C} + A\,B + B\,C$

    Further simplified: $G = \overline{B}\,\overline{C} + \overline{A}\,\overline{B} + AB + BC$
