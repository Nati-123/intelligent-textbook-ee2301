---
title: Unit 5 Quiz - Karnaugh Maps
description: Test your understanding of K-map simplification, prime implicants, and grouping rules
---

# Quiz: Karnaugh Maps

Test your understanding of Karnaugh map construction, grouping rules, prime implicants, and simplification techniques with these questions.

---

#### 1. Why are K-map row and column labels arranged in Gray code order?

<div class="upper-alpha" markdown>
1. To reduce the physical size of the map
2. To ensure adjacent cells differ by exactly one variable
3. To make binary counting easier
4. To eliminate the need for don't cares
</div>

??? question "Show Answer"
    The correct answer is **B**. Gray code ordering (00, 01, 11, 10) ensures that physically adjacent cells on the K-map are also logically adjacent—they differ in exactly one variable. This property enables visual identification of terms that can be combined to eliminate variables.

    **Concept Tested:** K-Map Gray Code Order

---

#### 2. What sizes of groups are valid in a K-map?

<div class="upper-alpha" markdown>
1. Any size from 1 to 16
2. Only even numbers: 2, 4, 6, 8...
3. Powers of 2: 1, 2, 4, 8, 16
4. Prime numbers only: 1, 2, 3, 5, 7...
</div>

??? question "Show Answer"
    The correct answer is **C**. Valid K-map groups must contain a power of 2 cells: 1, 2, 4, 8, or 16. Each doubling of group size eliminates one variable from the resulting product term. Groups of 3, 5, 6, etc. are invalid because they cannot represent a single product term.

    **Concept Tested:** Valid Group Sizes

---

#### 3. In a 4-variable K-map, are the four corner cells adjacent to each other?

<div class="upper-alpha" markdown>
1. No, corners are never adjacent
2. Yes, due to horizontal and vertical wrap-around
3. Only in 5-variable K-maps
4. Only when they all contain 1s
</div>

??? question "Show Answer"
    The correct answer is **B**. Due to wrap-around in both horizontal and vertical directions, all four corners (cells at positions corresponding to minterms 0, 2, 8, 10) are mutually adjacent and can form a single group of 4. The K-map conceptually forms a torus (donut shape).

    **Concept Tested:** Corner Grouping, Wrapping in K-Maps

---

#### 4. What is a prime implicant?

<div class="upper-alpha" markdown>
1. Any group of 1s on the K-map
2. A group that cannot be expanded while remaining valid
3. The smallest possible group
4. A group containing only essential cells
</div>

??? question "Show Answer"
    The correct answer is **B**. A prime implicant is a group (implicant) that cannot be combined with another implicant to form a larger group. It represents the largest possible grouping containing a particular set of minterms. Not all prime implicants are needed in the final solution.

    **Concept Tested:** Prime Implicant

---

#### 5. What makes a prime implicant "essential"?

<div class="upper-alpha" markdown>
1. It contains the most cells
2. It has the fewest literals
3. It is the only PI covering some minterm
4. It wraps around the K-map edges
</div>

??? question "Show Answer"
    The correct answer is **C**. An essential prime implicant covers at least one minterm that no other prime implicant covers. Essential PIs must be included in any minimal solution. They are identified in the PI chart by columns with only one mark.

    **Concept Tested:** Essential Prime Implicant

---

#### 6. When simplifying using K-maps with don't cares, how should X cells be treated?

<div class="upper-alpha" markdown>
1. Always as 1s
2. Always as 0s
3. As 1 or 0, whichever enables larger groups
4. They must always be covered
</div>

??? question "Show Answer"
    The correct answer is **C**. Don't care cells (X) can be treated as 1 or 0 depending on which choice helps form larger groups and simpler expressions. They are NOT required to be covered—include them only if they extend a group. Different X assignments may be optimal for different groups.

    **Concept Tested:** Using Dont Cares

---

#### 7. For POS simplification using a K-map, which cells are grouped?

<div class="upper-alpha" markdown>
1. Cells containing 1
2. Cells containing 0
3. Cells containing X
4. All cells must be grouped
</div>

??? question "Show Answer"
    The correct answer is **B**. For Product of Sums (POS) simplification, cells containing 0 are grouped. Each group of 0s becomes a sum term in the product. This is the dual of SOP simplification where cells containing 1 are grouped to form product terms.

    **Concept Tested:** K-Map POS Simplification, Group of Zeros

---

#### 8. If a K-map group covers cells where A varies, B=1, C=0, and D varies, what is the product term?

<div class="upper-alpha" markdown>
1. $ABCD$
2. $B\overline{C}$
3. $\overline{B}C$
4. $A\overline{D}$
</div>

??? question "Show Answer"
    The correct answer is **B**. Variables that are constant throughout a group appear in the product term (uncomplemented if 1, complemented if 0). Variables that change are eliminated. Here B=1 (include B) and C=0 (include $\overline{C}$), while A and D vary (omitted). Result: $B\overline{C}$.

    **Concept Tested:** K-Map SOP Simplification

---

#### 9. What is the primary limitation of Karnaugh maps?

<div class="upper-alpha" markdown>
1. They cannot handle don't cares
2. They become impractical beyond 5-6 variables
3. They cannot produce POS expressions
4. They require computer implementation
</div>

??? question "Show Answer"
    The correct answer is **B**. K-maps become impractical beyond 5-6 variables because visualizing adjacencies becomes increasingly difficult as the map size grows. The visual pattern-recognition approach that makes K-maps intuitive breaks down with more variables. The Quine-McCluskey method is used for larger functions.

    **Concept Tested:** K-Map Limitations

---

#### 10. Can two different groups in a K-map overlap (share cells)?

<div class="upper-alpha" markdown>
1. No, each cell can only belong to one group
2. Yes, overlapping is allowed and often necessary
3. Only if the cells are don't cares
4. Only in 5-variable K-maps
</div>

??? question "Show Answer"
    The correct answer is **B**. Overlapping groups are allowed and often necessary for finding minimal expressions. A cell can belong to multiple groups without causing duplication in the final expression. The cell's minterm is simply covered by multiple product terms, which is redundant but valid.

    **Concept Tested:** Overlapping Groups

