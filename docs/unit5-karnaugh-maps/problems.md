---
title: Unit 5 Problems - Karnaugh Maps
description: Practice problems for K-map simplification and prime implicants
---

# End-of-Unit Problems: Karnaugh Maps

Work through these problems to master K-map simplification techniques.

---

## Section A: 2 and 3-Variable K-Maps (5 problems)

### Problem 1
Simplify using a 2-variable K-map: F(A, B) = Σm(0, 1, 2)

!!! success "Solution"
    ```
        B=0  B=1
    A=0  1    1
    A=1  1    0
    ```

    Groups:
    - Top row (A=0): m0, m1 → A'
    - Left column (B=0): m0, m2 → B'

    **F = A' + B'**

---

### Problem 2
Simplify: F(A, B, C) = Σm(0, 2, 4, 6)

!!! success "Solution"
    ```
          BC
         00  01  11  10
    A=0   1   0   0   1
    A=1   1   0   0   1
    ```

    Group all 1s in columns BC=00 and BC=10 (both columns where C=0):

    **F = C'**

---

### Problem 3
Simplify: F(A, B, C) = Σm(1, 3, 4, 5, 6, 7)

!!! success "Solution"
    ```
          BC
         00  01  11  10
    A=0   0   1   1   0
    A=1   1   1   1   1
    ```

    Groups:
    - Entire A=1 row: m4, m5, m7, m6 → A
    - Column BC=01, BC=11 (C=1): m1, m3, m5, m7 → C

    **F = A + C**

---

### Problem 4
Simplify: F(A, B, C) = Σm(0, 1, 2, 5, 6, 7)

!!! success "Solution"
    ```
          BC
         00  01  11  10
    A=0   1   1   0   1
    A=1   0   1   1   1
    ```

    Groups:
    - m0, m1, m2: A'B' + A'C' ... let me regroup
    - m0, m2 (wrap): A'C'
    - m1, m5: B'C
    - m5, m7: AC
    - m6, m7: AB

    Better grouping:
    - m0, m1: A'B'
    - m0, m2: A'C'
    - m5, m7: AC
    - m6, m7: AB
    - m1, m5: B'C

    Minimal: **F = A'B' + AC + AB + B'C**

    Or: **F = A'B' + A'C' + AB + B'C**

---

### Problem 5
Find all prime implicants for: F(A, B, C) = Σm(0, 1, 3, 5, 7)

!!! success "Solution"
    ```
          BC
         00  01  11  10
    A=0   1   1   1   0
    A=1   0   1   1   0
    ```

    Prime implicants:
    - m0, m1 → A'B' (cannot expand)
    - m1, m3, m5, m7 → C (largest group)

    Essential PI: C covers m3, m5, m7 uniquely
    A'B' covers m0 uniquely

    **Prime Implicants: A'B', C**
    **Minimum cover: F = A'B' + C**

---

## Section B: 4-Variable K-Maps (6 problems)

### Problem 6
Simplify: F(A, B, C, D) = Σm(0, 1, 2, 3, 4, 5, 6, 7)

!!! success "Solution"
    ```
           CD
          00  01  11  10
    AB=00  1   1   1   1
    AB=01  1   1   1   1
    AB=11  0   0   0   0
    AB=10  0   0   0   0
    ```

    All 1s are in the top two rows where A=0.

    **F = A'**

---

### Problem 7
Simplify: F(A, B, C, D) = Σm(0, 2, 8, 10, 5, 7, 13, 15)

!!! success "Solution"
    ```
           CD
          00  01  11  10
    AB=00  1   0   0   1
    AB=01  0   1   1   0
    AB=11  0   1   1   0
    AB=10  1   0   0   1
    ```

    Groups:
    - Four corners (m0, m2, m8, m10): B'D'
    - m5, m7, m13, m15: BD

    **F = B'D' + BD**

    Simplified: **F = B ⊙ D** (XNOR)

---

### Problem 8
Simplify: F(A, B, C, D) = Σm(1, 3, 5, 7, 9, 11, 12, 14)

!!! success "Solution"
    ```
           CD
          00  01  11  10
    AB=00  0   1   1   0
    AB=01  0   1   1   0
    AB=11  1   0   0   1
    AB=10  0   1   1   0
    ```

    Groups:
    - m1, m3, m5, m7, m9, m11 → where D=1 and AB≠11
    - m12, m14 → ABC'

    Actually: Let me recheck:
    - m1, m3, m5, m7: A'D
    - m9, m11: AB'D
    - m12, m14: ABD'

    **F = A'D + AB'D + ABD' = A'D + AD ⊕ B**

    Simplified: **F = A'D + AB'D + ABD'**

---

### Problem 9
Simplify using K-map: F(A, B, C, D) = Σm(0, 4, 5, 7, 8, 9, 13, 15)

!!! success "Solution"
    ```
           CD
          00  01  11  10
    AB=00  1   0   0   0
    AB=01  1   1   1   0
    AB=11  0   1   1   0
    AB=10  1   1   0   0
    ```

    Groups:
    - m0, m4, m8: ... wait, not adjacent
    - m0, m4: A'C'D'
    - m4, m5: A'BC'
    - m5, m7, m13, m15: BD
    - m8, m9: AB'C'

    Let me regroup:
    - m5, m7, m13, m15 → BD (4 cells)
    - m0, m4 → A'C'D'
    - m8, m9 → AB'C'

    **F = BD + A'C'D' + AB'C'**

---

### Problem 10
Find minimum SOP and POS for: F = Σm(0, 1, 4, 5, 11, 14, 15)

!!! success "Solution"
    ```
           CD
          00  01  11  10
    AB=00  1   1   0   0
    AB=01  1   1   0   0
    AB=11  0   0   1   1
    AB=10  0   0   1   0
    ```

    **SOP:**
    - m0, m1, m4, m5 → A'C'
    - m11, m15 → ACD
    - m14, m15 → ABD'... wait m14=1110, m15=1111

    Groups:
    - m0, m1, m4, m5 → A'C'
    - m14, m15 → ABC
    - m11, m15 → ACD

    Minimal: **F = A'C' + ABC + ACD**

    **POS:** F' = Σm(2, 3, 6, 7, 8, 9, 10, 12, 13)
    Then F = (F')'

    **F = A'C' + AB(C + D) = A'C' + ABC + ABD**

---

### Problem 11
Identify all prime implicants for: F = Σm(0, 2, 3, 4, 7, 8, 10, 11, 15)

!!! success "Solution"
    ```
           CD
          00  01  11  10
    AB=00  1   0   1   1
    AB=01  1   0   1   0
    AB=11  0   0   1   0
    AB=10  1   0   1   1
    ```

    Prime implicants:
    - m0, m2, m8, m10 → B'D' (4 cells)
    - m2, m3 → A'B'C
    - m4, m0: C'D' ... only m0, m4 → A'C'D'
    - m3, m7 → A'CD
    - m7, m15 → BCD
    - m10, m11 → AB'C
    - m11, m15 → ACD

    **Prime Implicants:**
    - B'D' (essential, covers m0, m8)
    - A'B'C (covers m2, m3)
    - A'CD (covers m3, m7)
    - BCD (covers m7, m15)
    - AB'C (essential, covers m10, m11)
    - ACD (covers m11, m15)

    **Essential PIs: B'D', AB'C**
    Need to cover m3, m4, m7, m15

    Minimum: **F = B'D' + AB'C + A'CD + BCD**

---

## Section C: Don't Care Conditions (4 problems)

### Problem 12
Simplify: F = Σm(1, 3, 5, 7, 9) + Σd(6, 12, 13)

!!! success "Solution"
    ```
           CD
          00  01  11  10
    AB=00  0   1   1   0
    AB=01  0   1   1   X
    AB=11  X   X   0   0
    AB=10  0   1   0   0
    ```

    Use don't cares to enlarge groups:
    - m1, m3, m5, m7 → A'D
    - m9 alone or... m9, m13(d) → AB'D
    - Or use d6 with m7: doesn't help much

    Using d13: m9, m13 → B'CD... wait that's not right

    Best: m1, m3, m5, m7 (group of 4) → A'D
    m9 with d13 → B'C'D (if we include them)

    Actually: m1, m3, m5, m7, m9 and using d13:
    - m1, m3, m5, m7 → A'D
    - m9 → AB'C'D

    **F = A'D + AB'C'D = D(A' + AB'C') = D(A' + B'C')**

    Simplified: **F = A'D + B'C'D**

---

### Problem 13
Design a BCD-to-Excess-3 code converter. Use don't cares for invalid BCD inputs (10-15).

!!! success "Solution"
    BCD input: ABCD (0-9 valid)
    Excess-3 output: WXYZ = BCD + 3

    | BCD | WXYZ |
    |-----|------|
    | 0000 | 0011 |
    | 0001 | 0100 |
    | 0010 | 0101 |
    | 0011 | 0110 |
    | 0100 | 0111 |
    | 0101 | 1000 |
    | 0110 | 1001 |
    | 0111 | 1010 |
    | 1000 | 1011 |
    | 1001 | 1100 |
    | 1010-1111 | don't care |

    K-maps for each output (with don't cares at 10-15):

    **W = A + BC + BD** (using don't cares)
    **X = B'C + B'D + BC'D'**
    **Y = CD + C'D'**
    **Z = D'**

---

### Problem 14
F(A,B,C,D) = Σm(2, 4, 6, 8, 10, 12) + Σd(0, 7, 15)

Find minimum SOP expression.

!!! success "Solution"
    ```
           CD
          00  01  11  10
    AB=00  X   0   0   1
    AB=01  1   0   X   1
    AB=11  1   0   X   0
    AB=10  1   0   0   1
    ```

    Using don't cares:
    - m2, m6, m10, (d0 if needed) → D'... not quite
    - m2, m6 and m10, with corners

    Groups:
    - m0(d), m2, m4, m6 → A'D'
    - m4, m6, m12, (need m14 but it's 0)
    - m8, m10, m12... not all adjacent
    - m2, m6, m10 → B'CD'... wait

    Let me reconsider:
    - Column CD=10: m2, m6, m10 + can use d0 → C'D' covering (0,2,8,10)

    Using d0: m0, m2, m8, m10 → B'D'
    m4, m6, m12: m4, m12 → BC'D', m6 alone? m4,m6 → A'BD'

    **F = B'D' + BC'D' + A'BD'** (using don't cares optimally)

    Or simpler: **F = D'(B' + A'B + BC') = D'** if we can cover all with D'
    Check: D'=1 means D=0, positions: 0,2,4,6,8,10,12,14
    Our function: 2,4,6,8,10,12 + d(0) - all have D=0

    **F = D'** (with don't care at m0 treated as 1)

---

### Problem 15
In a BCD system, design a circuit that outputs 1 for prime numbers (2, 3, 5, 7).

!!! success "Solution"
    Input: ABCD (BCD digit 0-9)
    Output: P = 1 for primes 2, 3, 5, 7

    | Decimal | ABCD | P |
    |---------|------|---|
    | 0 | 0000 | 0 |
    | 1 | 0001 | 0 |
    | 2 | 0010 | 1 |
    | 3 | 0011 | 1 |
    | 4 | 0100 | 0 |
    | 5 | 0101 | 1 |
    | 6 | 0110 | 0 |
    | 7 | 0111 | 1 |
    | 8 | 1000 | 0 |
    | 9 | 1001 | 0 |
    | 10-15 | X | d |

    P = Σm(2, 3, 5, 7) + Σd(10-15)

    K-map with don't cares at 10-15:
    ```
           CD
          00  01  11  10
    AB=00  0   0   1   1
    AB=01  0   1   1   0
    AB=11  d   d   d   d
    AB=10  0   0   d   d
    ```

    Groups:
    - m2, m3 → A'B'C
    - m3, m7 → A'CD
    - m5, m7 → A'BD

    Using don't cares:
    - m2, m3, d10, d11 → B'C
    - m5, m7, d13, d15 → BD

    **P = B'C + BD**

---

## Section D: Multiple Output Functions (3 problems)

### Problem 16
Design minimum circuits for:
F1 = Σm(0, 2, 3, 4, 5)
F2 = Σm(0, 2, 3, 5, 6, 7)

Share common terms where possible.

!!! success "Solution"
    For 3 variables A, B, C:

    F1 K-map:
    ```
          BC
         00  01  11  10
    A=0   1   0   1   1
    A=1   1   1   0   0
    ```
    F1 = A'B' + A'C + AB'C' = A'B' + AC' + A'C... let me redo

    F1 = m0, m2, m3, m4, m5
    - m0, m2: A'C'
    - m2, m3: A'B
    - m4, m5: AB'

    F1 = A'C' + A'B + AB'... simplify: A'C' + AB' + A'B

    F2 K-map:
    ```
          BC
         00  01  11  10
    A=0   1   0   1   1
    A=1   0   1   1   1
    ```
    F2 = m0, m2, m3, m5, m6, m7
    - m0, m2: A'C'
    - m2, m3, m6, m7: B
    - m5, m7: AC

    F2 = A'C' + B

    **Shared term: A'C'**

    **F1 = A'C' + AB' + A'B**
    **F2 = A'C' + B**

---

### Problem 17
Given F1 = Σm(0, 1, 3, 7) and F2 = Σm(1, 3, 6, 7), find F1 · F2 and F1 + F2 using K-maps.

!!! success "Solution"
    **F1 · F2 (AND):** Intersection of 1s
    F1 has 1s at: 0, 1, 3, 7
    F2 has 1s at: 1, 3, 6, 7
    Common: **1, 3, 7**

    F1·F2 = Σm(1, 3, 7) = A'B'C + A'BC + ABC = A'C + ABC = **C(A' + AB) = C(A' + B)**

    **F1 + F2 (OR):** Union of 1s
    Combined: **0, 1, 3, 6, 7**

    F1+F2 = Σm(0, 1, 3, 6, 7)
    K-map:
    ```
          BC
         00  01  11  10
    A=0   1   1   1   0
    A=1   0   0   1   1
    ```

    F1+F2 = A'B' + BC + AC = **A'B' + BC + AC**

---

### Problem 18
Design a circuit with two outputs:
- SUM = A ⊕ B ⊕ C
- CARRY = AB + BC + AC

Identify any common sub-expressions.

!!! success "Solution"
    This is a full adder!

    **SUM K-map:**
    ```
          BC
         00  01  11  10
    A=0   0   1   0   1
    A=1   1   0   1   0
    ```
    SUM = A'B'C + A'BC' + AB'C' + ABC (no simplification)
    **SUM = A ⊕ B ⊕ C**

    **CARRY K-map:**
    ```
          BC
         00  01  11  10
    A=0   0   0   1   0
    A=1   0   1   1   1
    ```
    CARRY = BC + AC + AB (majority function)
    **CARRY = AB + BC + AC**

    **Common sub-expression:** A ⊕ B can be used:
    - SUM = (A ⊕ B) ⊕ C
    - CARRY = AB + C(A ⊕ B)

    This is the standard half-adder cascade implementation.

---

## Section E: Application Problems (2 problems)

### Problem 19
A security system has 4 sensors (A, B, C, D). The alarm should sound when:
- At least 2 sensors are triggered, OR
- Sensor A is triggered (critical area)

Design using K-map.

!!! success "Solution"
    Alarm = A + (at least 2 of B, C, D triggered)

    "At least 2" means majority or more:
    - BC, BD, CD, BCD

    F = A + BC + BD + CD

    Let's verify with K-map (considering A separately):
    When A=1: F=1 always (8 minterms)
    When A=0: F=1 when BC + BD + CD
    - BC: m3, m7 → with A=0: just m3, m7... wait, indices:

    Actually for 4 variables ABCD:
    F = A + BC + BD + CD

    Minterms: all with A=1 (8-15), plus those with 2+ of BCD:
    - m3 (0011): BC
    - m5 (0101): BD
    - m6 (0110): CD
    - m7 (0111): BCD

    F = Σm(3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15)

    Simplified: **F = A + BC + BD + CD**

---

### Problem 20
Design a combinational lock that opens when the 4-bit input equals either 1001 or 1100.

!!! success "Solution"
    F = 1 when ABCD = 1001 OR ABCD = 1100

    Minterms: m9 (1001) and m12 (1100)

    K-map:
    ```
           CD
          00  01  11  10
    AB=00  0   0   0   0
    AB=01  0   0   0   0
    AB=11  1   0   0   0
    AB=10  0   1   0   0
    ```

    No simplification possible (cells not adjacent).

    **F = ABC'D' + AB'C'D = AB'C'D + ABC'D'**

    Factored: **F = AC'(B'D + BD') = AC'(B ⊕ D)**

---

## Summary

| Section | Topics Covered | Problem Count |
|---------|---------------|---------------|
| A | 2 and 3-Variable K-Maps | 5 |
| B | 4-Variable K-Maps | 6 |
| C | Don't Care Conditions | 4 |
| D | Multiple Output Functions | 3 |
| E | Applications | 2 |
| **Total** | | **20** |
