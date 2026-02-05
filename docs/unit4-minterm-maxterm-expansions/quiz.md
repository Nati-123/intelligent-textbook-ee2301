---
title: Unit 4 Quiz - Minterm & Maxterm Expansions
description: Test your understanding of canonical forms, minterms, maxterms, and Shannon expansion
---

# Quiz: Minterm & Maxterm Expansions

Test your understanding of canonical forms, minterm and maxterm representations, notation, and Shannon expansion with these questions.

---

#### 1. What distinguishes a canonical form from a standard form in Boolean algebra?

<div class="upper-alpha" markdown>
1. Canonical forms use only NAND gates
2. Every variable appears exactly once in every term in canonical form
3. Standard forms are always longer
4. Canonical forms cannot represent all functions
</div>

??? question "Show Answer"
    The correct answer is **B**. In a canonical form, every variable appears exactly once (either complemented or uncomplemented) in every term. This makes canonical forms unique representations of Boolean functions, unlike standard forms where variables may be missing from some terms.

    **Concept Tested:** Canonical Form

---

#### 2. For the input combination ABC = 101, what is the minterm?

<div class="upper-alpha" markdown>
1. $\overline{A}B\overline{C}$
2. $A\overline{B}C$
3. $A + \overline{B} + C$
4. $\overline{A} + B + \overline{C}$
</div>

??? question "Show Answer"
    The correct answer is **B**. A minterm includes each variable uncomplemented if its value is 1 and complemented if its value is 0. For ABC = 101: A=1 (include A), B=0 (include $\overline{B}$), C=1 (include C). The minterm is $A\overline{B}C$ (also designated as $m_5$).

    **Concept Tested:** Minterm

---

#### 3. What is the relationship between minterm $m_i$ and maxterm $M_i$?

<div class="upper-alpha" markdown>
1. They are identical
2. They are complements: $m_i = \overline{M_i}$
3. $M_i$ has twice as many literals as $m_i$
4. They cover the same input combinations
</div>

??? question "Show Answer"
    The correct answer is **B**. A minterm and maxterm with the same index are complements of each other: $m_i = \overline{M_i}$ and $M_i = \overline{m_i}$. For example, $m_5 = A\overline{B}C$ and $M_5 = (\overline{A} + B + \overline{C})$. This can be verified using DeMorgan's theorem.

    **Concept Tested:** Minterm to Maxterm

---

#### 4. What does the notation $F(A,B,C) = \Sigma m(1,3,5)$ represent?

<div class="upper-alpha" markdown>
1. F equals the product of minterms 1, 3, and 5
2. F equals the sum of minterms 1, 3, and 5
3. F equals the product of maxterms 1, 3, and 5
4. F is undefined for inputs 1, 3, and 5
</div>

??? question "Show Answer"
    The correct answer is **B**. The sigma notation $\Sigma m$ represents the sum (OR) of minterms. $F = \Sigma m(1,3,5)$ means F equals $m_1 + m_3 + m_5$, the OR of minterms 1, 3, and 5. This is the canonical SOP (Sum of Products) form.

    **Concept Tested:** Sigma Notation

---

#### 5. How do you convert $F = \Sigma m(1,3,5)$ to $\Pi M$ notation for 3 variables?

<div class="upper-alpha" markdown>
1. Use the same indices: $\Pi M(1,3,5)$
2. Use all indices: $\Pi M(0,1,2,3,4,5,6,7)$
3. Use the complementary indices: $\Pi M(0,2,4,6,7)$
4. Multiply each index by 2
</div>

??? question "Show Answer"
    The correct answer is **C**. The maxterm indices are all indices NOT in the minterm list. For 3 variables, indices 0-7 exist. If minterms are {1,3,5}, then maxterms are {0,2,4,6,7}. Therefore $F = \Sigma m(1,3,5) = \Pi M(0,2,4,6,7)$.

    **Concept Tested:** Converting SOP to POS

---

#### 6. What is the complement of $F = \Sigma m(2,4,7)$ in $\Sigma m$ notation for 3 variables?

<div class="upper-alpha" markdown>
1. $\overline{F} = \Sigma m(2,4,7)$
2. $\overline{F} = \Sigma m(0,1,3,5,6)$
3. $\overline{F} = \Pi M(2,4,7)$
4. Both B and C are correct
</div>

??? question "Show Answer"
    The correct answer is **D**. The complement $\overline{F}$ can be expressed as $\Sigma m(0,1,3,5,6)$ (the complementary minterm set) OR as $\Pi M(2,4,7)$ (same indices as original, but maxterm form). Both representations are equivalent and correct.

    **Concept Tested:** Complement of Function

---

#### 7. In the Shannon expansion $F = X \cdot F_X + \overline{X} \cdot F_{\overline{X}}$, what is $F_X$ called?

<div class="upper-alpha" markdown>
1. The residue
2. The positive cofactor
3. The Shannon remainder
4. The X-factor
</div>

??? question "Show Answer"
    The correct answer is **B**. $F_X$ is called the positive cofactor—it is F evaluated with X set to 1. Similarly, $F_{\overline{X}}$ is the negative cofactor—F evaluated with X set to 0. Shannon expansion decomposes any function using these cofactors.

    **Concept Tested:** Cofactor

---

#### 8. What are the three sets that partition all minterms for an incompletely specified function?

<div class="upper-alpha" markdown>
1. On-set, Off-set, Error-set
2. True-set, False-set, Maybe-set
3. On-set, Off-set, DC-set
4. Input-set, Output-set, Control-set
</div>

??? question "Show Answer"
    The correct answer is **C**. An incompletely specified function partitions all minterms into: On-set (where F=1), Off-set (where F=0), and DC-set (don't care conditions, where F=X). These three sets cover all $2^n$ possible input combinations.

    **Concept Tested:** On-Set of Function, Off-Set of Function, DC-Set of Function

---

#### 9. Why is literal count important when comparing Boolean expressions?

<div class="upper-alpha" markdown>
1. It determines the truth table size
2. It correlates with gate complexity and implementation cost
3. It indicates the number of input variables
4. It shows how many minterms the function covers
</div>

??? question "Show Answer"
    The correct answer is **B**. Literal count measures expression complexity—each literal requires a gate input (or inverter). More literals generally means more gate inputs, more wiring, and higher implementation cost. Simplification aims to reduce literal count while preserving the function.

    **Concept Tested:** Literal Count

---

#### 10. For maxterm construction, when input A=1, how is variable A included in the maxterm?

<div class="upper-alpha" markdown>
1. Uncomplemented (A)
2. Complemented ($\overline{A}$)
3. Omitted from the term
4. Doubled (AA)
</div>

??? question "Show Answer"
    The correct answer is **B**. Maxterm construction is the opposite of minterm construction: include the variable complemented if its value is 1, and uncomplemented if its value is 0. For A=1, include $\overline{A}$. This ensures the maxterm equals 0 for that specific input combination.

    **Concept Tested:** Maxterm

