---
title: Unit 6 Quiz - Quine-McCluskey Method
description: Test your understanding of the QM algorithm, prime implicant charts, and systematic minimization
hide:
  - toc
---

<div class="problems-styled" markdown>

# Quiz: Quine-McCluskey Method

Test your understanding of the Quine-McCluskey algorithm, implicant tables, prime implicant charts, and minimum cover selection with these questions.

---

#### 1. What is the primary advantage of the Quine-McCluskey method over Karnaugh maps for Boolean minimization?

<div class="upper-alpha" markdown>
1. It always produces smaller expressions than K-maps
2. It is faster to execute than K-map simplification for all functions
3. It is a systematic algorithm that works for any number of variables and can be computer-automated
4. It eliminates the need to identify prime implicants
</div>

**Answer:** The correct answer is **C**. The QM method's primary advantage is its algorithmic nature—it follows a deterministic procedure that works for functions with any number of input variables and is easily programmed for computer implementation. K-maps become impractical beyond 5–6 variables because visual pattern recognition breaks down. Both methods find the same set of prime implicants and produce equally minimal results; QM simply scales to larger problems where K-maps cannot.

**Concept Tested:** QM vs K-Map Comparison

---

#### 2. In the QM method, why are minterms first grouped by the number of 1s in their binary representation?

<div class="upper-alpha" markdown>
1. To sort them in ascending numerical order
2. Because minterms differing by exactly one bit must have 1-counts that differ by exactly one, so only adjacent groups need comparison
3. To minimize the total number of prime implicants
4. To identify essential prime implicants before the combination phase
</div>

**Answer:** The correct answer is **B**. Two minterms can combine (differ in exactly one bit position) only if one has exactly one more 1-bit than the other. Grouping by 1-count exploits this: the algorithm only compares minterms in adjacent groups (group $k$ vs. group $k+1$), dramatically reducing the number of comparisons from $O(n^2)$ to $O(n \cdot g)$ where $g$ is the average group size. Minterms within the same group can never combine since they differ in at least two bit positions.

**Concept Tested:** Grouping by Number of Ones

---

#### 3. What does a dash (–) represent when two terms are combined in the QM algorithm?

<div class="upper-alpha" markdown>
1. A variable that has been eliminated because it appeared in both complemented and uncomplemented form
2. An error indicating the combination was invalid
3. A mandatory 1 bit in the resulting term
4. A don't care input condition
</div>

**Answer:** The correct answer is **A**. When two terms that differ in exactly one bit position are combined, the differing bit is replaced with a dash. The dash indicates that the corresponding variable has been eliminated—it can be either 0 or 1 without affecting the function for the minterms covered by that term. For example, combining $0\mathbf{1}01$ and $0\mathbf{0}01$ yields $0{-}01$, eliminating the second variable. The remaining non-dash positions define the product term.

**Concept Tested:** Dash Notation for Combined Terms

---

#### 4. After all combination iterations are complete, how are prime implicants identified in the QM method?

<div class="upper-alpha" markdown>
1. They are the terms appearing in the first column only
2. They are the terms with the most dashes
3. They are the terms that cover the most minterms
4. They are the unchecked (unmarked) terms from all columns—terms that could not be combined further
</div>

**Answer:** The correct answer is **D**. During the combination phase, each time two terms combine to form a larger term, both original terms are checked (marked). After all possible combinations across all columns are exhausted, the unchecked terms are the prime implicants—they represent the largest possible groupings and cannot be absorbed into any larger term. Prime implicants may appear in any column (first, second, third, etc.), not just the first.

**Concept Tested:** Identifying Prime Implicants (Unchecked Terms)

---

#### 5. In the prime implicant chart, how is an essential prime implicant identified?

<div class="upper-alpha" markdown>
1. It appears in the first row of the chart
2. It covers more minterms than any other prime implicant
3. It is the only prime implicant covering at least one minterm—identified by a column with exactly one mark
4. It has the fewest literals of all prime implicants
</div>

**Answer:** The correct answer is **C**. In the prime implicant chart (rows = PIs, columns = required minterms), an essential PI is identified by finding a column with only one × mark. That single PI is the only one covering that particular minterm, so it must be included in any minimum cover. After selecting all essential PIs and removing the minterms they cover, the remaining uncovered minterms are addressed by additional PI selection using dominance or Petrick's method.

**Concept Tested:** Essential Prime Implicant Selection

---

#### 6. After selecting essential prime implicants, the reduced PI chart still has uncovered minterms and cannot be simplified by row or column dominance. What technique resolves this situation?

<div class="upper-alpha" markdown>
1. Restart the QM algorithm with different initial groupings
2. Petrick's method—an algebraic approach that finds all minimum covers by expressing the covering requirement as a Boolean product of sums
3. Add the remaining minterms as don't cares and re-minimize
4. Select the prime implicant with the most literals
</div>

**Answer:** The correct answer is **B**. Petrick's method constructs a Boolean expression where each column (uncovered minterm) generates a sum term of the PIs that cover it, and these sum terms are ANDed together. Multiplying out this product-of-sums expression and applying Boolean absorption yields all possible minimum covers. The cover with the fewest PIs (and among those, the fewest total literals) is selected as the optimal solution.

**Concept Tested:** Petrick's Method

---

#### 7. In the QM method, how are don't care conditions handled differently from required minterms?

<div class="upper-alpha" markdown>
1. Don't cares participate in the combination phase (potentially forming larger PIs) but are excluded from the PI chart columns, since they do not require coverage
2. Don't cares are ignored completely in both phases
3. Don't cares are treated identically to required minterms throughout the entire algorithm
4. Don't cares are converted to 0s before the algorithm begins
</div>

**Answer:** The correct answer is **A**. Don't cares serve a dual role in QM: during the combination phase, they are included alongside required minterms, enabling the formation of larger prime implicants (with fewer literals). However, in the PI chart phase, only required minterms appear as columns—don't cares do not need to be covered. This allows the algorithm to benefit from don't cares during optimization without imposing unnecessary coverage constraints.

**Concept Tested:** QM Method with Don't Care Conditions

---

#### 8. What defines a "cyclic" prime implicant chart, and why is it particularly challenging to solve?

<div class="upper-alpha" markdown>
1. A chart that repeats every $n$ rows
2. A chart used exclusively for sequential circuit design
3. A chart with no essential prime implicants and no row or column dominance—requiring Petrick's method to resolve
4. A chart where all prime implicants have the same number of literals
</div>

**Answer:** The correct answer is **C**. A cyclic PI chart has no essential prime implicants (every column has multiple ×'s) and cannot be reduced by row dominance (no PI is strictly dominated by another) or column dominance (no minterm's coverage is a subset of another's). Multiple equivalent minimum solutions exist, and the only systematic resolution is Petrick's method. Cyclic charts arise in specific functions where the prime implicants have symmetric coverage patterns.

**Concept Tested:** Cyclic Prime Implicant Charts

---

#### 9. Two terms with dashes can be combined only under specific conditions. What are those conditions?

<div class="upper-alpha" markdown>
1. They must cover overlapping minterms
2. They must appear in the same column of the combination table
3. They must be in adjacent groups (differ by one in 1-count)
4. Dashes must be in identical positions, and the non-dash bits must differ in exactly one position
</div>

**Answer:** The correct answer is **D**. When combining terms that already contain dashes from earlier iterations, two requirements must hold: (1) the dash positions must be identical in both terms (they must have eliminated the same variables previously), and (2) the remaining non-dash bit positions must differ in exactly one position. For example, $0{-}01$ and $0{-}11$ can combine to $0{-}{-}1$ (dashes in same position, one non-dash bit differs). But $0{-}01$ and ${-}001$ cannot combine (dashes in different positions).

**Concept Tested:** Adjacency Criterion for Terms with Dashes

---

#### 10. The QM method guarantees an optimal (minimum) result, yet it is rarely used for functions with more than 15–20 variables. What is the fundamental reason?

<div class="upper-alpha" markdown>
1. It can only handle up to 15 variables due to memory constraints
2. The number of prime implicants can grow exponentially (up to $3^n/n$), making the algorithm computationally intractable for large functions
3. It requires specialized hardware to execute
4. Heuristic algorithms always produce better results for large functions
</div>

**Answer:** The correct answer is **B**. The QM method has exponential worst-case complexity: the number of prime implicants for an $n$-variable function can be as large as $3^n/n$. For 20 variables, this could mean billions of prime implicants. The PI chart (and Petrick's method) also become intractable at this scale. This is why heuristic algorithms like ESPRESSO are used in practice—they find near-optimal solutions in polynomial time without exhaustively enumerating all prime implicants.

**Concept Tested:** Computational Complexity of the QM Method

---

## Answers Summary

| Question | Answer | Concept |
|----------|--------|---------|
| 1 | C | QM vs K-Map Comparison |
| 2 | B | Grouping by Number of Ones |
| 3 | A | Dash Notation for Combined Terms |
| 4 | D | Identifying Prime Implicants |
| 5 | C | Essential Prime Implicant Selection |
| 6 | B | Petrick's Method |
| 7 | A | QM Method with Don't Cares |
| 8 | C | Cyclic Prime Implicant Charts |
| 9 | D | Adjacency Criterion |
| 10 | B | Computational Complexity |

</div>
