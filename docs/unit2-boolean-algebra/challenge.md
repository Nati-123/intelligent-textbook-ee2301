---
title: Unit 2 Challenge - Boolean Algebra
description: Challenge problems for Boolean algebra — answers only, no solutions
---

# Challenge Problems: Boolean Algebra

These challenge problems test deeper understanding. Only final answers are provided — work through each problem on your own.

---

#### Challenge 1: Multi-Step Boolean Simplification

Simplify the following expression using Boolean algebra laws (show only the final result):

$$F = \overline{A}B\overline{C} + A\overline{B}\overline{C} + AB\overline{C} + \overline{A}BC + ABC$$

**Answer:** $F = \overline{C} \cdot (A + B) + BC = A\overline{C} + B$

Simplified: $F = A\overline{C} + B$

---

#### Challenge 2: Prove a Boolean Identity

Prove algebraically that:

$$AB + \overline{A}C + BC = AB + \overline{A}C$$

This is the **Consensus Theorem**. Your proof should use only the basic Boolean algebra axioms and theorems.

**Answer:** $AB + \overline{A}C + BC$

$= AB + \overline{A}C + BC(A + \overline{A})$

$= AB + \overline{A}C + ABC + \overline{A}BC$

$= AB(1 + C) + \overline{A}C(1 + B)$

$= AB + \overline{A}C$ ∎

---

#### Challenge 3: Complement and De Morgan's Simplification

Find the complement of the expression below, then simplify the result to a minimum SOP form:

$$F = (A + B)(\overline{B} + C)(A + \overline{C})$$

**Answer:** $\overline{F} = \overline{A}\,\overline{B} + B\overline{C} + \overline{A}\,C$

---

#### Challenge 4: Expression Equivalence

Determine whether the following two expressions are equivalent. If not, find an input combination where they differ.

$$F_1 = A\overline{B} + \overline{A}B + AB$$
$$F_2 = A + B$$

**Answer:** **They are equivalent.**

$F_1 = A\overline{B} + \overline{A}B + AB = A\overline{B} + B(\overline{A} + A) = A\overline{B} + B = A + B = F_2$

Both functions equal 0 only when $A = 0, B = 0$, and equal 1 for all other inputs.

---

#### Challenge 5: Simplify a 5-Term SOP Expression

Simplify the following 5-term SOP expression to a minimum form:

$$F = \overline{A}\,\overline{B}\,\overline{C}\,D + \overline{A}\,\overline{B}\,C\,D + A\overline{B}\,\overline{C}\,D + A\overline{B}\,C\,D + AB\overline{C}\,D$$

**Answer:** $F = \overline{B}\,D + A\overline{C}\,D$

This can also be written as: $F = D(\overline{B} + A\overline{C})$

