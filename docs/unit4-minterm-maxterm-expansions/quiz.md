---
title: Unit 4 Quiz - Minterm & Maxterm Expansions
description: Test your understanding of canonical forms, minterms, maxterms, and Shannon expansion
hide:
  - toc
---

# Quiz: Minterm & Maxterm Expansions

Test your understanding of canonical forms, minterm and maxterm representations, notation, and Shannon expansion with these questions.

---

#### 1. What distinguishes a canonical form from a standard form in Boolean algebra?

<div class="upper-alpha" markdown>
1. Canonical forms use only NAND gates
2. In canonical form, every variable appears exactly once (complemented or uncomplemented) in every term
3. Standard forms are always longer than canonical forms
4. Canonical forms cannot represent all Boolean functions
</div>

**Answer:** The correct answer is **B**. In a canonical form, every variable appears exactly once in every term—either complemented or uncomplemented. This makes canonical forms unique representations of Boolean functions: a given function has exactly one canonical SOP (sum of minterms) and one canonical POS (product of maxterms). Standard forms may have variables missing from some terms, so the same function can have multiple different standard SOP or POS expressions.

**Concept Tested:** Canonical Form

---

#### 2. For the 3-variable input combination $ABC = 101$, what is the corresponding minterm expression and its index?

<div class="upper-alpha" markdown>
1. $\overline{A}B\overline{C}$, designated $m_2$
2. $A + \overline{B} + C$, designated $M_5$
3. $A\overline{B}C$, designated $m_3$
4. $A\overline{B}C$, designated $m_5$
</div>

**Answer:** The correct answer is **D**. A minterm is an AND of all variables, each appearing uncomplemented if its value is 1 and complemented if its value is 0. For $ABC = 101$: $A = 1$ (include $A$), $B = 0$ (include $\overline{B}$), $C = 1$ (include $C$). The minterm is $A\overline{B}C$. Its index is the decimal equivalent of the binary input: $101_2 = 5_{10}$, so it is designated $m_5$. Option C has the correct expression but wrong index.

**Concept Tested:** Minterm Construction and Designation

---

#### 3. What is the fundamental relationship between a minterm $m_i$ and the maxterm $M_i$ with the same index?

<div class="upper-alpha" markdown>
1. They are complements of each other: $m_i = \overline{M_i}$
2. They are identical expressions
3. $M_i$ has twice as many literals as $m_i$
4. They cover the same set of input combinations
</div>

**Answer:** The correct answer is **A**. A minterm and maxterm with the same index are complements: $m_i = \overline{M_i}$ and $M_i = \overline{m_i}$. For example, $m_5 = A\overline{B}C$ and $M_5 = (\overline{A} + B + \overline{C})$. Applying DeMorgan's theorem to $\overline{m_5}$: $\overline{A\overline{B}C} = \overline{A} + B + \overline{C} = M_5$. Minterm $m_i$ equals 1 for exactly one input combination; maxterm $M_i$ equals 0 for that same combination.

**Concept Tested:** Minterm-to-Maxterm Relationship

---

#### 4. What does the notation $F(A,B,C) = \Sigma m(1,3,5)$ represent?

<div class="upper-alpha" markdown>
1. $F$ equals the product of minterms 1, 3, and 5
2. $F$ equals the product of maxterms 1, 3, and 5
3. $F$ equals the sum (OR) of minterms $m_1$, $m_3$, and $m_5$
4. $F$ is undefined for inputs 1, 3, and 5
</div>

**Answer:** The correct answer is **C**. The sigma notation $\Sigma m$ represents the sum (OR) of minterms. $F = \Sigma m(1,3,5) = m_1 + m_3 + m_5 = \overline{A}\overline{B}C + \overline{A}BC + A\overline{B}C$. This is the canonical Sum of Products (SOP) form. The function $F = 1$ for exactly the input combinations whose decimal indices are listed: inputs 001, 011, and 101. The dual notation $\Pi M$ uses products (AND) of maxterms for canonical POS form.

**Concept Tested:** Sigma (Sum of Minterms) Notation

---

#### 5. How do you convert $F = \Sigma m(1,3,5)$ to $\Pi M$ notation for 3 variables?

<div class="upper-alpha" markdown>
1. Use the same indices: $\Pi M(1,3,5)$
2. Use the complementary indices: $\Pi M(0,2,4,6,7)$
3. Use all indices: $\Pi M(0,1,2,3,4,5,6,7)$
4. Multiply each index by 2
</div>

**Answer:** The correct answer is **B**. To convert from $\Sigma m$ to $\Pi M$, use all indices NOT in the minterm list. For 3 variables, indices range from 0 to $2^3 - 1 = 7$. If the ON-set (minterms) is $\{1,3,5\}$, the OFF-set (maxterms) is $\{0,2,4,6,7\}$. Therefore $F = \Sigma m(1,3,5) = \Pi M(0,2,4,6,7)$. This works because every input is either in the ON-set (minterm) or the OFF-set (maxterm), and the two representations describe the same function.

**Concept Tested:** Converting SOP to POS / Complementary Index Sets

---

#### 6. For a 3-variable function $F = \Sigma m(2,4,7)$, what is the complement $\overline{F}$ expressed in both $\Sigma m$ and $\Pi M$ notation?

<div class="upper-alpha" markdown>
1. $\overline{F} = \Sigma m(2,4,7)$ only
2. $\overline{F} = \Pi M(2,4,7)$ only
3. $\overline{F} = \Sigma m(0,1,3,5,6)$ only
4. $\overline{F} = \Sigma m(0,1,3,5,6) = \Pi M(2,4,7)$—both are valid
</div>

**Answer:** The correct answer is **D**. The complement $\overline{F}$ has its ON-set where $F$ has its OFF-set and vice versa. So $\overline{F} = \Sigma m(0,1,3,5,6)$ (the complementary minterm indices). Equivalently, $\overline{F} = \Pi M(2,4,7)$ (same indices as the original $F$'s minterms, but using maxterms). Both representations are valid and equivalent—they describe the same complement function using different canonical forms.

**Concept Tested:** Complement of a Boolean Function

---

#### 7. In the Shannon expansion $F = X \cdot F_X + \overline{X} \cdot F_{\overline{X}}$, what is $F_X$ called and how is it computed?

<div class="upper-alpha" markdown>
1. The positive cofactor—$F$ evaluated with $X$ set to 1
2. The Shannon remainder—the portion of $F$ independent of $X$
3. The X-factor—the derivative of $F$ with respect to $X$
4. The residue—the terms containing $X$
</div>

**Answer:** The correct answer is **A**. $F_X$ is called the positive cofactor of $F$ with respect to $X$. It is obtained by setting $X = 1$ in the expression for $F$ and simplifying. Similarly, $F_{\overline{X}}$ is the negative cofactor, obtained by setting $X = 0$. Shannon expansion decomposes any Boolean function into two subfunctions using these cofactors. This theorem is the theoretical foundation for binary decision diagrams (BDDs) and MUX-based function implementation.

**Concept Tested:** Cofactor / Shannon Expansion Theorem

---

#### 8. What are the three sets that partition all $2^n$ minterms for an incompletely specified function?

<div class="upper-alpha" markdown>
1. Input-set, Output-set, Control-set
2. On-set, Off-set, DC-set (don't care set)
3. True-set, False-set, Maybe-set
4. On-set, Off-set, Error-set
</div>

**Answer:** The correct answer is **B**. An incompletely specified function partitions all $2^n$ possible input combinations into three mutually exclusive sets: the On-set (where $F = 1$), the Off-set (where $F = 0$), and the DC-set (don't care conditions, where $F$ can be assigned either 0 or 1 during optimization). Together, these three sets cover every minterm exactly once. During minimization, DC-set minterms can be included in or excluded from prime implicant groups to achieve simpler expressions.

**Concept Tested:** On-Set, Off-Set, DC-Set (Incompletely Specified Functions)

---

#### 9. Why is literal count an important metric when comparing different Boolean expressions for the same function?

<div class="upper-alpha" markdown>
1. It determines the number of rows in the truth table
2. It indicates how many input variables the function has
3. It correlates directly with gate input count and implementation cost
4. It shows the number of minterms in the function's ON-set
</div>

**Answer:** The correct answer is **C**. Literal count measures expression complexity—each literal (a variable or its complement) corresponds to one gate input in the hardware implementation. More literals generally means more gate inputs, more wiring, and higher area and power cost. For example, $F = AB + \overline{A}C$ has 4 literals while $F = AB + \overline{A}C + BC$ has 6 literals for the same function, making the first expression cheaper to implement. Minimization algorithms aim to reduce literal count.

**Concept Tested:** Literal Count / Expression Cost

---

#### 10. In maxterm construction, when an input variable has value 1, how does it appear in the maxterm?

<div class="upper-alpha" markdown>
1. Uncomplemented (e.g., $A$)
2. Omitted from the maxterm entirely
3. Doubled for emphasis (e.g., $A \cdot A$)
4. Complemented (e.g., $\overline{A}$)
</div>

**Answer:** The correct answer is **D**. Maxterm construction is the dual of minterm construction: variables appear complemented when their value is 1, and uncomplemented when their value is 0. This ensures the maxterm evaluates to 0 for its designated input combination. For $ABC = 110$: $M_6 = (\overline{A} + \overline{B} + C)$. Checking: $\overline{1} + \overline{1} + 0 = 0 + 0 + 0 = 0$, confirming $M_6 = 0$ for input 110.

**Concept Tested:** Maxterm Construction

---

## Answers Summary

| Question | Answer | Concept |
|----------|--------|---------|
| 1 | B | Canonical Form |
| 2 | D | Minterm Construction and Designation |
| 3 | A | Minterm-to-Maxterm Relationship |
| 4 | C | Sigma Notation (Sum of Minterms) |
| 5 | B | Converting SOP to POS |
| 6 | D | Complement of a Boolean Function |
| 7 | A | Cofactor / Shannon Expansion |
| 8 | B | On-Set, Off-Set, DC-Set |
| 9 | C | Literal Count / Expression Cost |
| 10 | D | Maxterm Construction |
