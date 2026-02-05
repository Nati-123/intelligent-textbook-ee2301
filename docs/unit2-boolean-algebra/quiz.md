---
title: Unit 2 Quiz - Boolean Algebra
description: Test your understanding of Boolean operations, logic gates, and Boolean theorems
---

# Quiz: Boolean Algebra

Test your understanding of Boolean algebra operations, logic gates, theorems, and simplification techniques with these questions.

---

#### 1. Which Boolean operation produces a 1 output only when ALL inputs are 1?

<div class="upper-alpha" markdown>
1. OR
2. AND
3. XOR
4. NOR
</div>

??? question "Show Answer"
    The correct answer is **B**. The AND operation (logical conjunction) produces a 1 output only when all inputs are 1. OR produces 1 when any input is 1. XOR produces 1 when inputs differ. NOR produces 1 only when all inputs are 0.

    **Concept Tested:** AND Operation

---

#### 2. What is the result of applying DeMorgan's first theorem to $\overline{A \cdot B}$?

<div class="upper-alpha" markdown>
1. $\overline{A} \cdot \overline{B}$
2. $\overline{A} + \overline{B}$
3. $A + B$
4. $A \cdot B$
</div>

??? question "Show Answer"
    The correct answer is **B**. DeMorgan's first theorem states that the complement of a product equals the sum of the complements: $\overline{A \cdot B} = \overline{A} + \overline{B}$. This is essential for converting between AND-OR and NAND-NOR implementations.

    **Concept Tested:** DeMorgans First Theorem

---

#### 3. Which gates are considered "universal gates"?

<div class="upper-alpha" markdown>
1. AND and OR
2. NAND and NOR
3. XOR and XNOR
4. NOT and Buffer
</div>

??? question "Show Answer"
    The correct answer is **B**. NAND and NOR are universal gates because any Boolean function can be implemented using only NAND gates or only NOR gates. This property simplifies IC manufacturing by allowing a single gate type to build any circuit.

    **Concept Tested:** Universal Gates

---

#### 4. What is the simplified form of $A + AB$?

<div class="upper-alpha" markdown>
1. $AB$
2. $A + B$
3. $A$
4. $B$
</div>

??? question "Show Answer"
    The correct answer is **C**. By the Absorption Law, $A + AB = A$. This can be proven by factoring: $A + AB = A(1 + B) = A \cdot 1 = A$. The term $AB$ is absorbed by the term $A$.

    **Concept Tested:** Absorption Law

---

#### 5. In Boolean algebra, what is the correct order of operator precedence (highest to lowest)?

<div class="upper-alpha" markdown>
1. OR, AND, NOT
2. AND, OR, NOT
3. NOT, AND, OR
4. NOT, OR, AND
</div>

??? question "Show Answer"
    The correct answer is **C**. The precedence order from highest to lowest is: NOT (complement), AND, OR. This is similar to how in ordinary algebra, multiplication has higher precedence than addition. Parentheses override default precedence.

    **Concept Tested:** Precedence of Operators

---

#### 6. What does the XOR gate output when both inputs are 1?

<div class="upper-alpha" markdown>
1. 1
2. 0
3. Undefined
4. Depends on the implementation
</div>

??? question "Show Answer"
    The correct answer is **B**. The XOR (exclusive OR) gate outputs 1 when inputs differ and 0 when inputs are the same. When both inputs are 1, the output is 0. This is in contrast to OR, which outputs 1 when both inputs are 1.

    **Concept Tested:** XOR Gate

---

#### 7. Which law states that $A + 1 = 1$?

<div class="upper-alpha" markdown>
1. Identity Law
2. Null Law
3. Complement Law
4. Idempotent Law
</div>

??? question "Show Answer"
    The correct answer is **B**. The Null Law (also called Dominance Law) states that $A + 1 = 1$ and $A \cdot 0 = 0$. The dominant element (1 for OR, 0 for AND) always determines the result regardless of the other operand.

    **Concept Tested:** Null Law

---

#### 8. In a Sum of Products (SOP) expression, what is a "product term"?

<div class="upper-alpha" markdown>
1. An OR of literals
2. An AND of literals
3. A single variable
4. The final output
</div>

??? question "Show Answer"
    The correct answer is **B**. A product term is a single literal or an AND of literals, such as $A$, $AB$, or $\overline{A}BC$. In SOP form, these product terms are ORed together. The dual concept is a sum term (OR of literals) used in POS form.

    **Concept Tested:** Product Term

---

#### 9. What is the maximum number of inputs a standard logic gate can typically handle due to fan-in limitations?

<div class="upper-alpha" markdown>
1. 2-4
2. 8-12
3. 20-30
4. Unlimited
</div>

??? question "Show Answer"
    The correct answer is **B**. Fan-in typically limits standard logic gates to 8-12 inputs. Physical limitations including speed, power consumption, and signal degradation restrict the maximum fan-in. When more inputs are needed, gates must be cascaded.

    **Concept Tested:** Fan-In and Fan-Out

---

#### 10. What does the Consensus Theorem allow you to eliminate?

<div class="upper-alpha" markdown>
1. Complemented variables
2. Redundant terms covered by other terms
3. All AND operations
4. Don't care conditions
</div>

??? question "Show Answer"
    The correct answer is **B**. The Consensus Theorem states that $AB + \overline{A}C + BC = AB + \overline{A}C$. The term $BC$ is redundant because any minterm covered by $BC$ is already covered by either $AB$ or $\overline{A}C$. This allows elimination of the consensus term.

    **Concept Tested:** Consensus Theorem

