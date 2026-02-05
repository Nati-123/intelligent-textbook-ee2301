---
title: Unit 6 Quiz - Quine-McCluskey Method
description: Test your understanding of the QM algorithm, prime implicant charts, and systematic minimization
---

# Quiz: Quine-McCluskey Method

Test your understanding of the Quine-McCluskey algorithm, implicant tables, prime implicant charts, and minimum cover selection with these questions.

---

#### 1. What is the primary advantage of the Quine-McCluskey method over Karnaugh maps?

<div class="upper-alpha" markdown>
1. It produces smaller expressions
2. It works for any number of variables
3. It is faster for all functions
4. It eliminates the need for prime implicants
</div>

??? question "Show Answer"
    The correct answer is **B**. The QM method's primary advantage is that it works for functions with any number of input variables and can be easily programmed for computer implementation. K-maps become impractical beyond 5-6 variables due to visual complexity, while QM scales algorithmically.

    **Concept Tested:** QM versus K-map Comparison

---

#### 2. Why are minterms grouped by the number of 1s in their binary representation?

<div class="upper-alpha" markdown>
1. To sort them alphabetically
2. Because only adjacent groups can potentially combine (differ by one bit)
3. To minimize the number of prime implicants
4. To identify essential prime implicants
</div>

??? question "Show Answer"
    The correct answer is **B**. Minterms that differ by exactly one bit must have a count of 1s differing by exactly one. By grouping minterms by 1-count, the algorithm only needs to compare minterms in adjacent groups, dramatically reducing the number of comparisons needed.

    **Concept Tested:** Grouping by Number of Ones

---

#### 3. What does a dash (-) represent in the QM combination notation?

<div class="upper-alpha" markdown>
1. An error in the combination
2. A variable that has been eliminated
3. A mandatory 1 bit
4. A don't care input
</div>

??? question "Show Answer"
    The correct answer is **B**. When two terms combine, the differing bit position is replaced with a dash, indicating that variable is eliminated from the resulting product term. The dash represents that the variable can be either 0 or 1—it doesn't affect the function value for the minterms covered.

    **Concept Tested:** Dash Notation for Combined Terms

---

#### 4. How are prime implicants identified in the QM method?

<div class="upper-alpha" markdown>
1. They are the terms in the first column only
2. They are the terms with the most dashes
3. They are the unchecked terms from all columns
4. They are the terms covering the most minterms
</div>

??? question "Show Answer"
    The correct answer is **C**. Prime implicants are terms that remain unchecked after all combination iterations—they cannot be combined with any other term to form a larger grouping. Checked terms have been absorbed into larger groupings and are not prime implicants.

    **Concept Tested:** Unchecked Terms as Prime Implicants

---

#### 5. In the prime implicant chart, how is an essential prime implicant identified?

<div class="upper-alpha" markdown>
1. It appears in the first row
2. It covers more minterms than any other PI
3. It is the only PI covering some minterm (column with one ×)
4. It has the fewest literals
</div>

??? question "Show Answer"
    The correct answer is **C**. An essential prime implicant is identified by finding a column (minterm) with only one × mark. That single PI is the only one covering that minterm, so it must be included in any solution. Essential PIs are mandatory for the minimum cover.

    **Concept Tested:** Essential Prime Implicants Selection

---

#### 6. When can Petrick's method be used?

<div class="upper-alpha" markdown>
1. Only for functions with more than 10 variables
2. When the PI chart cannot be reduced by essentials and dominance
3. To find prime implicants more quickly
4. Only for cyclic functions
</div>

??? question "Show Answer"
    The correct answer is **B**. Petrick's method is used when essential PI selection and row/column dominance cannot fully reduce the PI chart. It provides an algebraic approach to finding all minimum covers by constructing a Boolean expression representing the covering requirements.

    **Concept Tested:** Petrick's Method

---

#### 7. In the QM method, how are don't care conditions handled?

<div class="upper-alpha" markdown>
1. They are ignored completely
2. Included in combination but excluded from PI chart columns
3. Treated as mandatory 1s throughout
4. Converted to 0s before processing
</div>

??? question "Show Answer"
    The correct answer is **B**. Don't cares participate in the combination phase (potentially creating larger prime implicants), but they do NOT appear as columns in the PI chart. Only required minterms (ON-set) must be covered; don't cares help optimization but don't require coverage.

    **Concept Tested:** QM Method with Don't Cares

---

#### 8. What is a cyclic prime implicant chart?

<div class="upper-alpha" markdown>
1. A chart that repeats every n rows
2. A chart with no essential PIs and no dominance reductions
3. A chart where all PIs have the same size
4. A chart used only for sequential circuits
</div>

??? question "Show Answer"
    The correct answer is **B**. A cyclic PI chart has no essential prime implicants and cannot be reduced by row or column dominance. Multiple equivalent minimum solutions exist, requiring Petrick's method to enumerate all possibilities. Every column has multiple ×'s with no unique coverage.

    **Concept Tested:** Cyclic Prime Implicant Charts

---

#### 9. What determines if two terms with dashes can be combined?

<div class="upper-alpha" markdown>
1. They must have the same number of dashes
2. Dashes must be in the same positions AND non-dash bits differ in exactly one position
3. They must cover overlapping minterms
4. They must be in adjacent groups
</div>

??? question "Show Answer"
    The correct answer is **B**. Two terms with dashes can only combine if: (1) the dashes appear in exactly the same positions, and (2) the non-dash positions differ in exactly one bit. For example, 0-01 and 0-11 can combine to 0--1, but 0-01 and -001 cannot combine (dashes in different positions).

    **Concept Tested:** Adjacency Criterion in QM

---

#### 10. What is the computational complexity limitation of the QM method?

<div class="upper-alpha" markdown>
1. It can only handle up to 6 variables
2. The number of prime implicants can grow exponentially
3. It requires specialized hardware
4. It cannot find optimal solutions
</div>

??? question "Show Answer"
    The correct answer is **B**. The QM method has exponential worst-case complexity—the number of prime implicants can be as large as $3^n/n$ for $n$ variables. For functions with many variables (>15-20), the method becomes impractical, which is why heuristic algorithms like ESPRESSO are used for large functions.

    **Concept Tested:** Computational Complexity of QM

