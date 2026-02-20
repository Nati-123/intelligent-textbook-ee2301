---
title: Unit 2 Quiz - Boolean Algebra
description: Test your understanding of Boolean operations, logic gates, and Boolean theorems
hide:
  - toc
---

<div class="problems-styled" markdown>

# Quiz: Boolean Algebra

Test your understanding of Boolean algebra operations, logic gates, theorems, and simplification techniques with these questions.

---

#### 1. Which Boolean operation produces a 1 output only when ALL inputs are 1?

<div class="upper-alpha" markdown>
1. OR
2. XOR
3. AND
4. NOR
</div>

**Answer:** The correct answer is **C**. The AND operation (logical conjunction) produces a 1 output only when all inputs are 1. For two inputs: $F = A \cdot B = 1$ only when $A = 1$ and $B = 1$. OR produces 1 when any input is 1. XOR produces 1 when an odd number of inputs are 1. NOR produces 1 only when all inputs are 0.

**Concept Tested:** AND Operation

---

#### 2. What is the result of applying DeMorgan's first theorem to $\overline{A \cdot B}$?

<div class="upper-alpha" markdown>
1. $\overline{A} \cdot \overline{B}$
2. $\overline{A} + \overline{B}$
3. $A + B$
4. $A \cdot B$
</div>

**Answer:** The correct answer is **B**. DeMorgan's first theorem states that the complement of a product equals the sum of the complements: $\overline{A \cdot B} = \overline{A} + \overline{B}$. In circuit terms, this means a NAND gate is equivalent to an OR gate with inverted inputs. Option A incorrectly ANDs the complements. This theorem is essential for converting between AND-OR and NAND-NOR implementations and for pushing bubbles through logic circuits.

**Concept Tested:** DeMorgan's Theorem

---

#### 3. Which gates are classified as "universal" gates, and why?

<div class="upper-alpha" markdown>
1. NAND and NOR—any Boolean function can be implemented using only one of these gate types
2. AND and OR—they are the fundamental operations of Boolean algebra
3. XOR and XNOR—they can detect equality and inequality
4. NOT and Buffer—they control signal polarity
</div>

**Answer:** The correct answer is **A**. NAND and NOR are universal (functionally complete) because each can implement NOT, AND, and OR—the three operations sufficient to construct any Boolean function. For example, using only NAND: NOT is a NAND with tied inputs ($\overline{A} = \overline{A \cdot A}$), AND is a double NAND ($A \cdot B = \overline{\overline{A \cdot B}}$), and OR uses DeMorgan's theorem ($A + B = \overline{\overline{A} \cdot \overline{B}}$). AND and OR alone (option B) cannot implement NOT, so they are not universal.

**Concept Tested:** Universal Gates (NAND and NOR)

---

#### 4. What is the simplified form of $A + AB$ using the Absorption Law?

<div class="upper-alpha" markdown>
1. $AB$
2. $A + B$
3. $B$
4. $A$
</div>

**Answer:** The correct answer is **D**. By the Absorption Law, $A + AB = A$. This can be proven by factoring: $A + AB = A(1 + B) = A \cdot 1 = A$. The term $AB$ is "absorbed" by $A$ because whenever $AB = 1$, it is guaranteed that $A = 1$, so the $AB$ term adds no additional coverage. The dual form of absorption is $A \cdot (A + B) = A$.

**Concept Tested:** Absorption Law

---

#### 5. In Boolean algebra, what is the correct order of operator precedence from highest to lowest?

<div class="upper-alpha" markdown>
1. OR, AND, NOT
2. AND, OR, NOT
3. NOT, AND, OR
4. NOT, OR, AND
</div>

**Answer:** The correct answer is **C**. The precedence order from highest to lowest is: NOT (complement), AND (product), OR (sum). This parallels ordinary algebra where exponentiation precedes multiplication, which precedes addition. So $A + B \cdot \overline{C}$ is evaluated as $A + (B \cdot (\overline{C}))$. Parentheses override default precedence when a different evaluation order is needed.

**Concept Tested:** Operator Precedence

---

#### 6. What does the XOR gate output when both inputs are the same value?

<div class="upper-alpha" markdown>
1. 1
2. 0
3. Undefined
4. Depends on the specific input value
</div>

**Answer:** The correct answer is **B**. The XOR (exclusive OR) gate outputs 1 when inputs differ and 0 when inputs are the same: $A \oplus B = A\overline{B} + \overline{A}B$. When $A = B = 0$: output is 0. When $A = B = 1$: output is 0. This makes XOR useful as a bit-level inequality detector—it outputs 1 only when bits differ, which is the basis for parity checking and binary addition (sum bit).

**Concept Tested:** XOR Gate

---

#### 7. Which Boolean law states that $A + 1 = 1$ and $A \cdot 0 = 0$?

<div class="upper-alpha" markdown>
1. Null Law (Dominance Law)
2. Identity Law
3. Complement Law
4. Idempotent Law
</div>

**Answer:** The correct answer is **A**. The Null Law (also called Dominance Law) states that ORing with 1 always gives 1 ($A + 1 = 1$) and ANDing with 0 always gives 0 ($A \cdot 0 = 0$). The dominant element (1 for OR, 0 for AND) forces the result regardless of the other operand. The Identity Law (option B) is different: $A + 0 = A$ and $A \cdot 1 = A$. The Complement Law (option C) is: $A + \overline{A} = 1$ and $A \cdot \overline{A} = 0$.

**Concept Tested:** Null Law (Dominance Law)

---

#### 8. In a Sum of Products (SOP) expression, what is a "product term"?

<div class="upper-alpha" markdown>
1. An OR of literals
2. The final output value
3. A single literal or an AND of literals
4. A complement of the entire expression
</div>

**Answer:** The correct answer is **C**. A product term is a single literal or an AND of two or more literals, such as $A$, $AB$, or $\overline{A}BC$. In SOP form, these product terms are ORed together: $F = AB + \overline{A}C + BC$. The dual concept is a sum term (OR of literals), used in Product of Sums (POS) form. Each product term represents a set of input combinations where that term evaluates to 1.

**Concept Tested:** Product Term / SOP Form

---

#### 9. A CMOS gate's output drives 12 other gate inputs. If the gate's specified fan-out is 10, what is the likely consequence?

<div class="upper-alpha" markdown>
1. The circuit functions normally with no issues
2. The output signal transitions are slowed, potentially violating timing constraints
3. The gate's Boolean function changes
4. Only the first 10 connected gates receive the signal
</div>

**Answer:** The correct answer is **B**. Exceeding the fan-out limit means the gate must drive more capacitive load than designed for, slowing the output transitions (increased rise and fall times). This degrades signal quality and increases propagation delay, potentially causing timing violations in synchronous circuits. The logical function doesn't change (option C), but the electrical performance degrades. The solution is to insert a buffer to boost drive strength.

**Concept Tested:** Fan-In and Fan-Out

---

#### 10. The Consensus Theorem states $AB + \overline{A}C + BC = AB + \overline{A}C$. Why can the term $BC$ be eliminated?

<div class="upper-alpha" markdown>
1. $BC$ always evaluates to 0
2. $BC$ is the complement of $AB + \overline{A}C$
3. $BC$ contains fewer literals than the other terms
4. Every minterm covered by $BC$ is already covered by either $AB$ or $\overline{A}C$
</div>

**Answer:** The correct answer is **D**. The consensus term $BC$ is redundant because any input combination making $BC = 1$ must have either $A = 1$ (making $AB = 1$ since $B = 1$) or $A = 0$ (making $\overline{A}C = 1$ since $C = 1$). Since every case is already covered, $BC$ adds no new minterms and can be safely removed, simplifying the expression without changing the function.

**Concept Tested:** Consensus Theorem

---

## Answers Summary

| Question | Answer | Concept |
|----------|--------|---------|
| 1 | C | AND Operation |
| 2 | B | DeMorgan's Theorem |
| 3 | A | Universal Gates (NAND and NOR) |
| 4 | D | Absorption Law |
| 5 | C | Operator Precedence |
| 6 | B | XOR Gate |
| 7 | A | Null Law (Dominance Law) |
| 8 | C | Product Term / SOP Form |
| 9 | B | Fan-In and Fan-Out |
| 10 | D | Consensus Theorem |

</div>
