---
title: Unit 6 Problems - Quine-McCluskey Method
description: Practice problems for the Quine-McCluskey tabular minimization method
---

# End-of-Unit Problems: Quine-McCluskey Method

Work through these problems to reinforce your understanding of the QM algorithm and prime implicant selection.

---

## Section A: Implicant Table Construction (5 problems)

### Problem 1
For the function $F(A, B, C, D) = \sum m(0, 2, 5, 6, 7, 8, 10, 12, 13, 14, 15)$:

a) List all minterms with their binary representations
b) Group minterms by the number of 1s
c) Construct the initial implicant table

??? success "Solution"
    a) Binary representations:

    | Minterm | A | B | C | D |
    |---------|---|---|---|---|
    | m₀ | 0 | 0 | 0 | 0 |
    | m₂ | 0 | 0 | 1 | 0 |
    | m₅ | 0 | 1 | 0 | 1 |
    | m₆ | 0 | 1 | 1 | 0 |
    | m₇ | 0 | 1 | 1 | 1 |
    | m₈ | 1 | 0 | 0 | 0 |
    | m₁₀ | 1 | 0 | 1 | 0 |
    | m₁₂ | 1 | 1 | 0 | 0 |
    | m₁₃ | 1 | 1 | 0 | 1 |
    | m₁₄ | 1 | 1 | 1 | 0 |
    | m₁₅ | 1 | 1 | 1 | 1 |

    b) Grouped by number of 1s:

    - **Group 0** (0 ones): m₀ (0000)
    - **Group 1** (1 one): m₂ (0010), m₈ (1000)
    - **Group 2** (2 ones): m₅ (0101), m₆ (0110), m₁₀ (1010), m₁₂ (1100)
    - **Group 3** (3 ones): m₇ (0111), m₁₃ (1101), m₁₄ (1110)
    - **Group 4** (4 ones): m₁₅ (1111)

    c) Initial table constructed with minterms organized by groups for combining.

---

### Problem 2
Combine adjacent minterms from Problem 1 to generate the first set of combined terms (Column 2).

??? success "Solution"
    **Column 2 - Combining adjacent groups:**

    From Groups 0-1:

    - m₀ + m₂ = 00-0 (0,2)
    - m₀ + m₈ = -000 (0,8)

    From Groups 1-2:

    - m₂ + m₆ = 0-10 (2,6)
    - m₂ + m₁₀ = -010 (2,10)
    - m₈ + m₁₀ = 10-0 (8,10)
    - m₈ + m₁₂ = 1-00 (8,12)

    From Groups 2-3:

    - m₅ + m₇ = 01-1 (5,7)
    - m₅ + m₁₃ = -101 (5,13)
    - m₆ + m₇ = 011- (6,7)
    - m₆ + m₁₄ = -110 (6,14)
    - m₁₀ + m₁₄ = 1-10 (10,14)
    - m₁₂ + m₁₃ = 110- (12,13)
    - m₁₂ + m₁₄ = 11-0 (12,14)

    From Groups 3-4:

    - m₇ + m₁₅ = -111 (7,15)
    - m₁₃ + m₁₅ = 11-1 (13,15)
    - m₁₄ + m₁₅ = 111- (14,15)

---

### Problem 3
For the function $F(W, X, Y, Z) = \sum m(1, 3, 4, 5, 9, 11, 12, 13, 15)$:

Construct the complete implicant table through all combination stages.

??? success "Solution"
    **Column 1 - Minterms by groups:**

    - Group 1: m₁ (0001), m₄ (0100)
    - Group 2: m₃ (0011), m₅ (0101), m₉ (1001), m₁₂ (1100)
    - Group 3: m₁₁ (1011), m₁₃ (1101)
    - Group 4: m₁₅ (1111)

    **Column 2 - First combinations:**

    - (1,3) = 00-1, (1,5) = 0-01, (1,9) = -001
    - (4,5) = 010-, (4,12) = -100
    - (3,11) = -011, (5,13) = -101, (9,11) = 10-1, (9,13) = 1-01, (12,13) = 110-
    - (11,15) = 1-11, (13,15) = 11-1

    **Column 3 - Second combinations:**

    - (1,3,9,11) = -0-1
    - (1,5,9,13) = --01
    - (5,13,9,13) can't combine further with same terms

    **Prime Implicants identified** (unchecked terms):

    - 010- (4,5)
    - -100 (4,12)
    - 110- (12,13)
    - -0-1 (1,3,9,11)
    - --01 (1,5,9,13)
    - 1-11 (11,15)
    - 11-1 (13,15)

---

### Problem 4
For $F(A, B, C) = \sum m(1, 2, 3, 5, 7)$:

a) Complete the QM method to find all prime implicants
b) Write the Boolean expression for each prime implicant

??? success "Solution"
    **Column 1 - Minterms by groups:**

    - Group 1: m₁ (001), m₂ (010)
    - Group 2: m₃ (011), m₅ (101)
    - Group 3: m₇ (111)

    **Column 2 - First combinations:**

    - (1,3) = 0-1
    - (1,5) = -01
    - (2,3) = 01-
    - (3,7) = -11
    - (5,7) = 1-1

    **Column 3 - Second combinations:**

    - (1,3,5,7) = --1

    **Prime Implicants:**

    - 01- = A'B (covers 2,3)
    - --1 = C (covers 1,3,5,7)

    b) Boolean expressions:

    - **01-** → $A'B$
    - **--1** → $C$

    **Minimum expression: F = A'B + C**

---

### Problem 5
For $F(A, B, C, D) = \sum m(0, 1, 2, 8, 9, 10, 11, 14, 15)$:

Find all prime implicants using the QM method.

??? success "Solution"
    **Grouping:**

    - Group 0: m₀ (0000)
    - Group 1: m₁ (0001), m₂ (0010), m₈ (1000)
    - Group 2: m₉ (1001), m₁₀ (1010)
    - Group 3: m₁₁ (1011), m₁₄ (1110)
    - Group 4: m₁₅ (1111)

    **After all combinations, Prime Implicants:**

    - **00-0** (0,2): A'B'D'
    - **000-** (0,1): A'B'C'
    - **10--** (8,9,10,11): AB'
    - **111-** (14,15): ABC
    - **1-11** (11,15): ACD

---

## Section B: Prime Implicant Charts (5 problems)

### Problem 6
Given prime implicants for $F = \sum m(0, 1, 2, 5, 6, 7)$:

- P1: 00- (0,1)
- P2: 0-0 (0,2)
- P3: -01 (1,5)
- P4: 01- (2,6)
- P5: -11 (5,7)
- P6: 011 (6,7)

Construct the prime implicant chart and identify essential prime implicants.

??? success "Solution"
    **Prime Implicant Chart:**

    |     | 0 | 1 | 2 | 5 | 6 | 7 |
    |-----|---|---|---|---|---|---|
    | P1  | × | × |   |   |   |   |
    | P2  | × |   | × |   |   |   |
    | P3  |   | × |   | × |   |   |
    | P4  |   |   | × |   | × |   |
    | P5  |   |   |   | × |   | × |
    | P6  |   |   |   |   | × | × |

    **Essential Prime Implicants:**

    - **P1 (00-)** is essential for minterm 0 (only P1 or P2 covers it, but P1 also covers 1)
    - Check each column for single ×:
      - Column 0: P1, P2 - not unique
      - Column 1: P1, P3 - not unique
      - Column 5: P3, P5 - not unique
      - Column 7: P5, P6 - not unique

    No single essential prime implicants. Need to select a cover.

    **Minimum cover:** P1 + P4 + P5 or P2 + P3 + P6

    **F = A'B' + A'C + BC** (using P1, P4, P5)

---

### Problem 7
For the following prime implicant chart, find all essential prime implicants:

|     | 2 | 3 | 7 | 9 | 11 | 13 |
|-----|---|---|---|---|----|----|
| P1  | × | × |   |   |    |    |
| P2  |   | × | × |   |    |    |
| P3  |   |   | × |   |    |    |
| P4  |   |   |   | × | ×  |    |
| P5  |   |   |   |   | ×  | ×  |
| P6  |   |   |   | × |    | ×  |

??? success "Solution"
    **Checking for essential prime implicants:**

    - Column 2: Only P1 covers it → **P1 is essential**
    - Column 3: P1, P2 cover it
    - Column 7: P2, P3 cover it
    - Column 9: P4, P6 cover it
    - Column 11: P4, P5 cover it
    - Column 13: P5, P6 cover it

    **Essential Prime Implicants: P1**

    After selecting P1, columns 2 and 3 are covered.

    **Remaining:** columns 7, 9, 11, 13

    For remaining coverage, we need P2 or P3 for 7, and {P4, P5} or {P4, P6} or {P5, P6} for rest.

    **Minimum cover: P1 + P2 + P4 + P5** (or other equivalent solutions)

---

### Problem 8
Apply row dominance and column dominance to simplify this chart:

|     | 1 | 4 | 5 | 6 | 9 | 14 |
|-----|---|---|---|---|---|----|
| P1  | × |   | × |   |   |    |
| P2  | × |   | × |   | × |    |
| P3  |   | × |   | × |   |    |
| P4  |   | × |   | × |   | ×  |
| P5  |   |   |   |   | × | ×  |

??? success "Solution"
    **Row Dominance:** (A row dominates another if it covers all minterms of the other plus more)

    - P2 dominates P1 (P2 covers 1, 5, 9 while P1 covers only 1, 5)
    - P4 dominates P3 (P4 covers 4, 6, 14 while P3 covers only 4, 6)

    **Remove dominated rows:** P1, P3

    **Simplified chart:**

    |     | 1 | 4 | 5 | 6 | 9 | 14 |
    |-----|---|---|---|---|---|----|
    | P2  | × |   | × |   | × |    |
    | P4  |   | × |   | × |   | ×  |
    | P5  |   |   |   |   | × | ×  |

    **Column Dominance:** (A column dominates another if all PIs covering one also cover the other)

    - Column 9 is covered by P2, P5
    - Column 14 is covered by P4, P5

    No obvious column dominance for elimination.

    **Essential PIs after simplification:**

    - Column 1: Only P2 → P2 essential
    - Column 4: Only P4 → P4 essential

    **Minimum cover: P2 + P4** (covers all minterms)

---

### Problem 9
Identify the cyclic nature of this prime implicant chart:

|     | 0 | 1 | 2 | 3 |
|-----|---|---|---|---|
| P1  | × | × |   |   |
| P2  |   | × | × |   |
| P3  |   |   | × | × |
| P4  | × |   |   | × |

??? success "Solution"
    **Analysis:**

    Each minterm is covered by exactly 2 prime implicants:

    - Minterm 0: P1, P4
    - Minterm 1: P1, P2
    - Minterm 2: P2, P3
    - Minterm 3: P3, P4

    **This is a cyclic chart** because:

    1. No essential prime implicants exist (no column has only one ×)
    2. No row dominance exists (each PI covers different 2 minterms)
    3. No column dominance exists

    **Solution requires Petrick's method or inspection:**

    Two minimum covers exist:

    - **P1 + P3** (covers 0,1,2,3)
    - **P2 + P4** (covers 0,1,2,3)

    Both are valid minimum solutions with 2 prime implicants.

---

### Problem 10
Use Petrick's method to find all minimum covers for the chart in Problem 9.

??? success "Solution"
    **Petrick's Method:**

    For each minterm, write a sum (OR) of the PIs that cover it:

    - Minterm 0: (P1 + P4)
    - Minterm 1: (P1 + P2)
    - Minterm 2: (P2 + P3)
    - Minterm 3: (P3 + P4)

    **Product of sums:**

    $(P1 + P4)(P1 + P2)(P2 + P3)(P3 + P4)$

    **Expand step by step:**

    $(P1 + P4)(P1 + P2) = P1 + P1P2 + P1P4 + P2P4 = P1 + P2P4$

    $(P2 + P3)(P3 + P4) = P2P3 + P2P4 + P3 + P3P4 = P3 + P2P4$

    **Combine:**

    $(P1 + P2P4)(P3 + P2P4)$

    $= P1P3 + P1P2P4 + P2P3P4 + P2P4$

    $= P1P3 + P2P4$ (absorbing larger terms)

    **Minimum covers:**

    - **P1P3** → F = P1 + P3
    - **P2P4** → F = P2 + P4

    Both solutions require exactly 2 prime implicants.

---

## Section C: Complete QM Solutions (5 problems)

### Problem 11
Minimize $F(A, B, C, D) = \sum m(4, 5, 6, 7, 12, 14, 15)$ using the complete QM method.

??? success "Solution"
    **Step 1: Group minterms**

    - Group 1: m₄ (0100)
    - Group 2: m₅ (0101), m₆ (0110), m₁₂ (1100)
    - Group 3: m₇ (0111), m₁₄ (1110)
    - Group 4: m₁₅ (1111)

    **Step 2: First combinations**

    - (4,5) = 010-
    - (4,6) = 01-0
    - (4,12) = -100
    - (5,7) = 01-1
    - (6,7) = 011-
    - (6,14) = -110
    - (12,14) = 11-0
    - (7,15) = -111
    - (14,15) = 111-

    **Step 3: Second combinations**

    - (4,5,6,7) = 01-- ✓
    - (4,6,12,14) = -1-0 ✓
    - (6,7,14,15) = -11- ✓

    **Prime Implicants:**

    - **01--** (4,5,6,7): A'B
    - **-1-0** (4,6,12,14): BD'
    - **-11-** (6,7,14,15): BC

    **Step 4: PI Chart**

    |       | 4 | 5 | 6 | 7 | 12 | 14 | 15 |
    |-------|---|---|---|---|----|----|-----|
    | 01--  | × | × | × | × |    |    |     |
    | -1-0  | × |   | × |   | ×  | ×  |     |
    | -11-  |   |   | × | × |    | ×  | ×   |

    **Essential PIs:**

    - Column 5: Only 01-- → **Essential**
    - Column 12: Only -1-0 → **Essential**
    - Column 15: Only -11- → **Essential**

    **Minimum expression: F = A'B + BD' + BC**

---

### Problem 12
Minimize $F(W, X, Y, Z) = \sum m(0, 2, 3, 4, 5, 13, 15)$ using QM.

??? success "Solution"
    **Step 1: Group minterms**

    - Group 0: m₀ (0000)
    - Group 1: m₂ (0010), m₄ (0100)
    - Group 2: m₃ (0011), m₅ (0101)
    - Group 3: m₁₃ (1101)
    - Group 4: m₁₅ (1111)

    **Step 2: First combinations**

    - (0,2) = 00-0
    - (0,4) = 0-00
    - (2,3) = 001-
    - (4,5) = 010-
    - (5,13) = -101
    - (13,15) = 11-1

    **Step 3: Second combinations**

    - (0,2,4,?) - No valid quad

    **Prime Implicants:**

    - **00-0** (0,2): W'X'Z'
    - **0-00** (0,4): W'Y'Z'
    - **001-** (2,3): W'X'Y
    - **010-** (4,5): W'XY'
    - **-101** (5,13): XY'Z
    - **11-1** (13,15): WXZ

    **PI Chart and Selection:**

    |       | 0 | 2 | 3 | 4 | 5 | 13 | 15 |
    |-------|---|---|---|---|---|----|----|
    | 00-0  | × | × |   |   |   |    |    |
    | 0-00  | × |   |   | × |   |    |    |
    | 001-  |   | × | × |   |   |    |    |
    | 010-  |   |   |   | × | × |    |    |
    | -101  |   |   |   |   | × | ×  |    |
    | 11-1  |   |   |   |   |   | ×  | ×  |

    **Essential PIs:**

    - Column 3: Only 001- → Essential
    - Column 15: Only 11-1 → Essential

    After selecting essentials: Need to cover 0, 4, 5, 13

    **Minimum: F = W'X'Y + WXZ + W'X'Z' + W'XY'**

    (or equivalent with 0-00 instead of 00-0)

---

### Problem 13
Minimize $F(A, B, C, D) = \sum m(0, 2, 8, 10)$ using QM.

??? success "Solution"
    **Step 1: Group minterms**

    - Group 0: m₀ (0000)
    - Group 1: m₂ (0010), m₈ (1000)
    - Group 2: m₁₀ (1010)

    **Step 2: First combinations**

    - (0,2) = 00-0
    - (0,8) = -000
    - (2,10) = -010
    - (8,10) = 10-0

    **Step 3: Second combinations**

    - (0,2,8,10) = -0-0 ✓

    **Prime Implicants:**

    - **-0-0** (0,2,8,10): B'D'

    This single PI covers all minterms!

    **Minimum expression: F = B'D'**

---

### Problem 14
Minimize $F(A, B, C, D) = \sum m(1, 5, 7, 8, 9, 10, 11, 14, 15)$ using QM.

??? success "Solution"
    **Step 1: Group by ones**

    - Group 1: m₁ (0001), m₈ (1000)
    - Group 2: m₅ (0101), m₉ (1001), m₁₀ (1010)
    - Group 3: m₇ (0111), m₁₁ (1011), m₁₄ (1110)
    - Group 4: m₁₅ (1111)

    **Step 2-3: Combinations**

    After all combinations:

    **Prime Implicants:**

    - **0-01** (1,5): A'C'D
    - **-001** (1,9): B'C'D
    - **10--** (8,9,10,11): AB'
    - **01-1** (5,7): A'BD
    - **-111** (7,15): BCD
    - **1-11** (11,15): ACD
    - **111-** (14,15): ABC

    **PI Chart and Selection:**

    Essential PIs:

    - AB' (only cover for 8, 10)
    - A'C'D (only cover for 1 with A'BD not covering it alone)

    **Minimum: F = AB' + A'BD + ABC**

    Or: **F = AB' + BCD + A'C'D**

---

### Problem 15
Apply QM to $F(A, B, C, D) = \sum m(0, 1, 3, 5, 7, 9, 11, 13, 15)$.

??? success "Solution"
    **Observation:** The minterms are 0, 1, 3, 5, 7, 9, 11, 13, 15

    Notice: All odd numbers (D=1) plus 0.

    **Step 1: Group minterms**

    - Group 0: m₀ (0000)
    - Group 1: m₁ (0001)
    - Group 2: m₃ (0011), m₅ (0101), m₉ (1001)
    - Group 3: m₇ (0111), m₁₁ (1011), m₁₃ (1101)
    - Group 4: m₁₅ (1111)

    **Step 2-3: Combinations**

    Eventually forms:

    - **---1** (1,3,5,7,9,11,13,15): D
    - **000-** (0,1): A'B'C'

    **PI Chart:**

    - D covers all odd minterms
    - A'B'C' covers 0, 1

    Minterm 0 only covered by A'B'C' → Essential

    **Minimum: F = D + A'B'C'**

---

## Section D: QM with Don't Cares (3 problems)

### Problem 16
Minimize $F(A, B, C, D) = \sum m(0, 1, 2, 5, 7) + d(8, 9, 10)$ using QM.

??? success "Solution"
    **Include don't cares in combination phase:**

    Minterms + Don't cares: 0, 1, 2, 5, 7, 8, 9, 10

    **Group by ones:**

    - Group 0: m₀ (0000)
    - Group 1: m₁ (0001), m₂ (0010), d₈ (1000)
    - Group 2: m₅ (0101), d₉ (1001), d₁₀ (1010)
    - Group 3: m₇ (0111)

    **Combinations:**

    - (0,1) = 000-
    - (0,2) = 00-0
    - (0,8) = -000
    - (1,5) = 0-01
    - (1,9) = -001
    - (2,10) = -010
    - (8,9) = 100-
    - (8,10) = 10-0
    - (5,7) = 01-1

    **Second combinations:**

    - (0,1,8,9) = -00-
    - (0,2,8,10) = -0-0

    **Prime Implicants:**

    - **-00-**: B'C'
    - **-0-0**: B'D'
    - **01-1**: A'BD

    **PI Chart (only required minterms):**

    |       | 0 | 1 | 2 | 5 | 7 |
    |-------|---|---|---|---|---|
    | -00-  | × | × |   |   |   |
    | -0-0  | × |   | × |   |   |
    | 01-1  |   |   |   | × | × |

    **Essential:**

    - 01-1 essential for 5, 7
    - Need one of first two for 0, 1, 2

    **Minimum: F = B'C' + A'BD** or **F = B'D' + A'BD + 000-**

    Best: **F = B'C' + A'BD**

---

### Problem 17
Minimize $F(A, B, C, D) = \sum m(2, 4, 5, 6, 10) + d(12, 13, 14, 15)$ using QM.

??? success "Solution"
    **All terms:** 2, 4, 5, 6, 10, 12, 13, 14, 15

    **After QM combinations:**

    Prime Implicants (using don't cares):

    - **01--** (4,5,6,7 if 7 were included, but we have 4,5,6): A'B
    - **-1-0** (4,6,12,14): BD'
    - **11--** (12,13,14,15): AB
    - **-010** (2,10): C'YD' → B'CD'

    Wait, let me recalculate...

    Including d(12,13,14,15):

    - (4,5,6,7) won't form since 7 not in function
    - (4,5,12,13) = -10- : BC'
    - (4,6,12,14) = -1-0 : BD'
    - (12,13,14,15) = 11-- : AB

    **Minimum: F = B'CD' + BC' + BD'**

    Or with AB: **F = A'BD' + AB + B'CD'**

---

### Problem 18
For $F(A, B, C) = \sum m(1, 2) + d(3, 5, 7)$, find the minimum expression using QM.

??? success "Solution"
    **All terms:** 1, 2, 3, 5, 7

    **Group by ones:**

    - Group 1: m₁ (001), m₂ (010)
    - Group 2: d₃ (011), d₅ (101)
    - Group 3: d₇ (111)

    **Combinations:**

    - (1,3) = 0-1
    - (1,5) = -01
    - (2,3) = 01-
    - (3,7) = -11
    - (5,7) = 1-1

    **Second combinations:**

    - (1,3,5,7) = --1: C

    **Prime Implicants:**

    - **--1**: C
    - **01-**: A'B

    **PI Chart (required minterms only):**

    |      | 1 | 2 |
    |------|---|---|
    | C    | × |   |
    | A'B  |   | × |

    Both essential.

    **Minimum: F = C + A'B**

    Actually, C covers 1 and A'B covers 2.

    But wait - can we do better using don't cares?

    If we choose (2,3) = 01-, this covers 2.
    If we choose (1,3,5,7) = --1, this covers 1.

    **F = C + A'B** (2 terms, 3 literals)

---

## Section E: Applications (2 problems)

### Problem 19
Compare the QM method with K-map for $F(A, B, C, D) = \sum m(0, 4, 8, 12, 3, 7, 11, 15)$.

a) Solve using QM
b) Verify using K-map
c) Discuss which method is more efficient for this function

??? success "Solution"
    a) **QM Solution:**

    Minterms: 0, 3, 4, 7, 8, 11, 12, 15

    **Grouping:**

    - Group 0: m₀ (0000)
    - Group 1: m₄ (0100), m₈ (1000)
    - Group 2: m₃ (0011), m₁₂ (1100)
    - Group 3: m₇ (0111), m₁₁ (1011)
    - Group 4: m₁₅ (1111)

    **Combinations:**

    - (0,4) = 0-00
    - (0,8) = -000
    - (4,12) = -100
    - (8,12) = 1-00
    - (3,7) = 0-11
    - (3,11) = -011
    - (7,15) = -111
    - (11,15) = 1-11

    **Second combinations:**

    - (0,4,8,12) = --00: C'D'
    - (3,7,11,15) = --11: CD

    **Minimum: F = C'D' + CD**

    b) **K-map verification:**

    ```
          CD
       00  01  11  10
    AB ┌───┬───┬───┬───┐
    00 │ 1 │ 0 │ 1 │ 0 │
       ├───┼───┼───┼───┤
    01 │ 1 │ 0 │ 1 │ 0 │
       ├───┼───┼───┼───┤
    11 │ 1 │ 0 │ 1 │ 0 │
       ├───┼───┼───┼───┤
    10 │ 1 │ 0 │ 1 │ 0 │
       └───┴───┴───┴───┘
    ```

    Groups: Column 00 (C'D'), Column 11 (CD)

    **F = C'D' + CD** ✓

    c) **Comparison:**

    - K-map: Faster for this problem - pattern (vertical columns) is immediately visible
    - QM: More systematic but requires more steps
    - For 4 variables, K-map is generally faster when patterns are clear
    - QM advantage: Works identically for any number of variables

---

### Problem 20
A digital system has 6 inputs (A, B, C, D, E, F). Explain why the Quine-McCluskey method would be preferred over K-maps for this problem, and describe the computational challenges involved.

??? success "Solution"
    **Why QM is preferred for 6 variables:**

    1. **K-map limitations:**
       - 6-variable K-map has 64 cells (2⁶)
       - Requires 3D visualization or two 4-variable maps
       - Adjacent cell identification becomes error-prone
       - Grouping across map boundaries is difficult to visualize

    2. **QM advantages:**
       - Purely algorithmic - no visualization needed
       - Systematic comparison of adjacent terms
       - Guaranteed to find all prime implicants
       - Can be easily programmed

    **Computational challenges with 6 variables:**

    1. **Number of possible minterms:** 64

    2. **Maximum prime implicants:**
       - In worst case, could have many prime implicants
       - For $n$ variables: up to $3^n/n$ prime implicants possible
       - For 6 variables: potentially hundreds of PIs

    3. **Combination explosion:**
       - Column 1: Up to 64 minterms
       - Column 2: Up to $\binom{64}{2}$ = 2016 potential pairs
       - Actual combinations much fewer due to adjacency requirement

    4. **PI chart complexity:**
       - May have large cyclic charts
       - Petrick's method can produce exponentially large expressions

    5. **NP-complete nature:**
       - Finding minimum cover is NP-complete
       - Exact solution may require exponential time
       - Heuristic methods often used for large problems

    **Practical solutions:**

    - Use computer implementations (ESPRESSO algorithm)
    - Apply heuristic minimization for very large functions
    - Accept near-optimal rather than globally optimal solutions

---

## Summary

| Section | Topics Covered | Problem Count |
|---------|---------------|---------------|
| A | Implicant Table Construction | 5 |
| B | Prime Implicant Charts | 5 |
| C | Complete QM Solutions | 5 |
| D | QM with Don't Cares | 3 |
| E | Applications | 2 |
| **Total** | | **20** |
