---
title: Unit 5 Quiz - Karnaugh Maps
description: Test your understanding of K-map simplification, prime implicants, and grouping rules
hide:
  - toc
---

# Quiz: Karnaugh Maps

Test your understanding of Karnaugh map construction, grouping rules, prime implicants, and simplification techniques with these questions.

---

#### 1. Why are K-map row and column labels arranged in Gray code order rather than standard binary order?

<div class="upper-alpha" markdown>
1. To reduce the physical size of the map
2. To make binary counting easier to follow
3. To ensure that physically adjacent cells differ by exactly one variable, enabling visual identification of combinable terms
4. To eliminate the need for don't care conditions
</div>

**Answer:** The correct answer is **C**. Gray code ordering (00, 01, 11, 10) ensures that cells that are physically next to each other on the K-map are also logically adjacent—they differ in exactly one variable. This is the foundational property that makes K-maps work: cells that differ by one variable can be grouped to eliminate that variable from the product term. Standard binary order (00, 01, 10, 11) would place logically non-adjacent cells next to each other, defeating the visual grouping method.

**Concept Tested:** K-Map Gray Code Order

---

#### 2. What sizes of groups are valid when grouping 1s on a K-map, and why?

<div class="upper-alpha" markdown>
1. Powers of 2 only: 1, 2, 4, 8, 16—because each doubling eliminates exactly one variable
2. Any even number: 2, 4, 6, 8—because only even groups maintain symmetry
3. Prime numbers only: 1, 2, 3, 5, 7—to ensure minimal coverage
4. Any size from 1 to $2^n$—all group sizes are valid in a K-map
</div>

**Answer:** The correct answer is **A**. Valid K-map groups must contain $2^k$ cells (where $k = 0, 1, 2, ..., n$): that is, 1, 2, 4, 8, or 16 cells. Each doubling of the group size eliminates one variable from the resulting product term: a group of 1 has $n$ literals, a group of 2 has $n-1$ literals, a group of 4 has $n-2$ literals, etc. Groups of 3, 5, 6, or other non-power-of-2 sizes cannot be expressed as a single AND product term.

**Concept Tested:** Valid Group Sizes in K-Maps

---

#### 3. In a 4-variable K-map, can the four corner cells be grouped together?

<div class="upper-alpha" markdown>
1. No—corner cells are never logically adjacent
2. Only when all four corners contain don't care values
3. Only in 5-variable K-maps where additional adjacencies exist
4. Yes—due to wrap-around in both horizontal and vertical directions, all four corners are mutually adjacent
</div>

**Answer:** The correct answer is **D**. The K-map wraps around in both directions, conceptually forming a torus (donut shape). The four corners correspond to minterms where the two middle variables are both 0 (e.g., $m_0$, $m_2$, $m_8$, $m_{10}$ in a standard 4-variable map). Each pair of corners differs by exactly one variable, making them all mutually adjacent. Grouping all four corners produces a 2-literal product term, eliminating 2 variables. This wrap-around adjacency is one of the most commonly missed groupings by students.

**Concept Tested:** Corner Grouping / Wrap-Around in K-Maps

---

#### 4. What is the definition of a prime implicant, and how does it differ from an ordinary implicant?

<div class="upper-alpha" markdown>
1. A prime implicant is the smallest possible group on the K-map
2. A prime implicant is any group of 1s on the K-map
3. A prime implicant is an implicant that cannot be combined with another implicant to form a larger valid group
4. A prime implicant is a group that contains only essential cells
</div>

**Answer:** The correct answer is **C**. An implicant is any valid group of 1s (power-of-2 size, rectangular, respecting adjacency). A prime implicant (PI) is an implicant that is as large as possible—it cannot be expanded further while remaining a valid group. Every minterm is covered by at least one PI. The minimum SOP expression is found by selecting a subset of prime implicants that covers all minterms. Not all PIs are necessarily included in the final solution—only enough to achieve complete coverage.

**Concept Tested:** Prime Implicant

---

#### 5. What makes a prime implicant "essential," and why must it appear in every minimum solution?

<div class="upper-alpha" markdown>
1. It is the only prime implicant covering at least one specific minterm, so no solution can omit it
2. It contains the most cells of any prime implicant
3. It has the fewest literals of any prime implicant
4. It wraps around the K-map edges
</div>

**Answer:** The correct answer is **A**. An essential prime implicant (EPI) covers at least one minterm that no other prime implicant covers. Since that minterm must be included in the function, and the EPI is the only PI that covers it, the EPI is mandatory in every minimum solution. On the prime implicant chart, EPIs are identified by columns (minterms) that contain only a single mark. After selecting all EPIs, the remaining uncovered minterms are handled by choosing additional PIs.

**Concept Tested:** Essential Prime Implicant

---

#### 6. When simplifying a K-map that contains don't care cells (X), how should these cells be treated?

<div class="upper-alpha" markdown>
1. Always treat don't cares as 1s to maximize group sizes
2. Include don't cares in groups when they help form larger groups, but do not require them to be covered
3. Always treat don't cares as 0s to minimize the number of groups
4. Don't cares must always be covered by at least one group
</div>

**Answer:** The correct answer is **B**. Don't care cells can be treated as either 1 or 0, whichever produces a simpler expression. Include an X in a group if it enlarges the group (eliminating a variable), but don't cares are NOT required to be covered—they represent input combinations that never occur or whose output doesn't matter. Different groups in the same K-map may treat the same don't care cell differently. This flexibility is what makes don't cares so powerful for minimization.

**Concept Tested:** Using Don't Care Conditions in K-Maps

---

#### 7. For Product of Sums (POS) simplification using a K-map, what procedure is followed?

<div class="upper-alpha" markdown>
1. Group the cells containing 1, then complement the entire expression
2. Apply DeMorgan's theorem to the SOP result
3. Group the cells containing 0—each group of 0s produces one sum term in the final product
4. Group both 1s and 0s, then select the smaller expression
</div>

**Answer:** The correct answer is **C**. For POS simplification, the 0-cells are grouped (using the same power-of-2, rectangular, adjacency rules as SOP). Each group of 0s yields a sum term where constant-0 variables appear uncomplemented and constant-1 variables appear complemented—the complement of the SOP grouping convention. The final POS expression is the AND (product) of all sum terms. This is the dual procedure of SOP simplification, which groups 1s.

**Concept Tested:** K-Map POS Simplification

---

#### 8. In a 4-variable K-map, a group covers cells where $A$ varies, $B = 1$, $C = 0$, and $D$ varies. What is the resulting product term?

<div class="upper-alpha" markdown>
1. $ABCD$
2. $\overline{B}C$
3. $A\overline{D}$
4. $B\overline{C}$
</div>

**Answer:** The correct answer is **D**. When a variable is constant throughout a group, it appears in the product term: uncomplemented if constant 1, complemented if constant 0. Variables that change value across the group are eliminated. Here: $A$ varies (eliminated), $B = 1$ (include $B$), $C = 0$ (include $\overline{C}$), $D$ varies (eliminated). The product term is $B\overline{C}$. This group covers 4 cells ($2^2$, since 2 variables are eliminated), so it has 2 literals.

**Concept Tested:** K-Map SOP Simplification / Reading Product Terms

---

#### 9. What is the primary limitation of Karnaugh maps that necessitates algorithmic methods like Quine-McCluskey?

<div class="upper-alpha" markdown>
1. K-maps become visually impractical beyond 5–6 variables because human pattern recognition cannot reliably identify adjacencies
2. K-maps cannot handle don't care conditions
3. K-maps cannot produce Product of Sums (POS) expressions
4. K-maps require computer software to solve
</div>

**Answer:** The correct answer is **A**. K-maps rely on the human ability to visually spot rectangular groups of adjacent 1s. For 5 variables, two overlaid 4×4 maps are needed, and adjacency between the two halves must be tracked mentally. For 6+ variables, the visual complexity becomes overwhelming and error-prone. The Quine-McCluskey algorithm performs the same minimization systematically and can be computer-automated for any number of variables, though at the cost of exponential worst-case complexity.

**Concept Tested:** K-Map Limitations

---

#### 10. Can two different groups in a K-map share (overlap) the same cells? If so, why is this not a problem?

<div class="upper-alpha" markdown>
1. No—each cell must belong to exactly one group to avoid duplicate logic
2. Yes—overlapping is permitted and often necessary for finding the minimum expression
3. Only if the shared cells are don't cares
4. Only in K-maps with 4 or more variables
</div>

**Answer:** The correct answer is **B**. Overlapping groups are allowed and frequently necessary to achieve the minimum expression. In Boolean algebra, $A + A = A$ (idempotent law), so covering a minterm multiple times does not change the function—it simply means that minterm appears in more than one product term. The goal is to select the largest possible groups (prime implicants) to minimize literals, even if some minterms end up covered by multiple groups.

**Concept Tested:** Overlapping Groups in K-Maps

---

## Answers Summary

| Question | Answer | Concept |
|----------|--------|---------|
| 1 | C | K-Map Gray Code Order |
| 2 | A | Valid Group Sizes |
| 3 | D | Corner Grouping / Wrap-Around |
| 4 | C | Prime Implicant |
| 5 | A | Essential Prime Implicant |
| 6 | B | Using Don't Care Conditions |
| 7 | C | K-Map POS Simplification |
| 8 | D | K-Map SOP Simplification |
| 9 | A | K-Map Limitations |
| 10 | B | Overlapping Groups |
