---
title: Unit 4 Problems - Minterm & Maxterm Expansions
description: Practice problems for canonical forms, SOP, POS, and cofactors
---

<div class="problems-styled" markdown>

# End-of-Unit Problems: Minterm & Maxterm Expansions

Work through these problems to reinforce your understanding of canonical forms.

---

## Section A: Minterms and Maxterms (5 problems)

### Problem 1
For a 3-variable function F(A, B, C), list:

a) The minterm for row 5
b) The maxterm for row 3
c) The minterm notation for A'BC
d) The maxterm notation for (A + B' + C)

**Solution:** a) Row 5 = 101₂, so A=1, B=0, C=1
   **m5 = AB'C**

b) Row 3 = 011₂, so A=0, B=1, C=1
   Maxterm uses complements: **M3 = (A + B' + C')**

c) A'BC: A=0, B=1, C=1 → row 011 = 3
   **m3**

d) (A + B' + C): complement values: A'=0, B=1, C'=0 → 010 = 2
   **M2**

---

### Problem 2
Convert between minterm and maxterm notation:

a) F = Σm(0, 2, 5, 7) to maxterm form
b) F = ΠM(1, 3, 4, 6) to minterm form

For 3 variables (A, B, C).

**Solution:** a) F = Σm(0, 2, 5, 7)
   Missing minterms: 1, 3, 4, 6
   **F = ΠM(1, 3, 4, 6)**

b) F = ΠM(1, 3, 4, 6)
   Missing maxterms: 0, 2, 5, 7
   **F = Σm(0, 2, 5, 7)**

Note: The minterm indices of F equal the maxterm indices of F'

---

### Problem 3
Given the truth table, express F in both minterm and maxterm forms:

| A | B | C | F |
|---|---|---|---|
| 0 | 0 | 0 | 1 |
| 0 | 0 | 1 | 0 |
| 0 | 1 | 0 | 1 |
| 0 | 1 | 1 | 1 |
| 1 | 0 | 0 | 0 |
| 1 | 0 | 1 | 0 |
| 1 | 1 | 0 | 1 |
| 1 | 1 | 1 | 0 |

**Solution:** F = 1 at rows: 0, 2, 3, 6

**Minterm form (SOP):**
F = Σm(0, 2, 3, 6)
F = A'B'C' + A'BC' + A'BC + ABC'

F = 0 at rows: 1, 4, 5, 7

**Maxterm form (POS):**
F = ΠM(1, 4, 5, 7)
F = (A + B + C')(A' + B + C)(A' + B + C')(A' + B' + C')

---

### Problem 4
Expand the following to canonical SOP form:

F(A, B, C) = A + BC

**Solution:** Method: Expand each term to include all variables.

Term 1: A = A(B + B')(C + C')
= ABC + ABC' + AB'C + AB'C'
= m7 + m6 + m5 + m4

Term 2: BC = BC(A + A')
= ABC + A'BC
= m7 + m3

Combine (remove duplicates):
F = m3 + m4 + m5 + m6 + m7

**F = Σm(3, 4, 5, 6, 7)**
**F = A'BC + AB'C' + AB'C + ABC' + ABC**

---

### Problem 5
Expand to canonical POS form:

F(A, B, C) = (A + B)(B + C)

**Solution:** Method: Expand each term to include all variables.

Term 1: (A + B) = (A + B + CC') = (A + B + C)(A + B + C')
= M0 · M1

Term 2: (B + C) = (B + C + AA') = (A + B + C)(A' + B + C)
= M0 · M4

Combine (remove duplicates):
F = M0 · M1 · M4

**F = ΠM(0, 1, 4)**
**F = (A + B + C)(A + B + C')(A' + B + C)**

---

## Section B: SOP and POS Forms (5 problems)

### Problem 6
Convert the following SOP expression to POS:

F = AB + A'C + BC

**Solution:** Step 1: Find the truth table or minterms

AB = m6, m7 (when A=1, B=1)
A'C = m1, m3 (when A=0, C=1)
BC = m3, m7 (when B=1, C=1)

Combined: F = Σm(1, 3, 6, 7)

Step 2: F' = Σm(0, 2, 4, 5) (missing minterms)

Step 3: F = ΠM(0, 2, 4, 5)

**F = (A + B + C)(A + B' + C)(A' + B + C)(A' + B + C')**

---

### Problem 7
Convert the following POS expression to SOP:

F = (A + B)(A' + C)(B + C')

**Solution:** Method 1: Expand algebraically
F = (A + B)(A' + C)(B + C')

First, (A + B)(A' + C) = AA' + AC + A'B + BC = AC + A'B + BC

Then, (AC + A'B + BC)(B + C')
= ACB + ACC' + A'BB + A'BC' + BCB + BCC'
= ABC + 0 + A'B + A'BC' + BC + 0
= ABC + A'B + A'BC' + BC
= A'B(1 + C') + BC + ABC
= A'B + BC + ABC

**F = A'B + BC + ABC**

Simplified: F = A'B + BC (since ABC is covered by BC when B=1, C=1)

---

### Problem 8
Find the complement of F = Σm(1, 3, 5, 7) using:

a) De Morgan's theorem
b) Missing minterms

**Solution:** F = Σm(1, 3, 5, 7) for F(A, B, C)

a) **De Morgan's method:**
F = m1 + m3 + m5 + m7
F' = (m1 + m3 + m5 + m7)'
F' = m1' · m3' · m5' · m7' = M1 · M3 · M5 · M7 = ΠM(1, 3, 5, 7)

In SOP: F' = Σm(0, 2, 4, 6)

b) **Missing minterms method:**
All minterms: 0, 1, 2, 3, 4, 5, 6, 7
F has: 1, 3, 5, 7
F' has: **0, 2, 4, 6**

**F' = Σm(0, 2, 4, 6) = A'B'C' + A'BC' + AB'C' + ABC'**

Note: F = C and F' = C'

---

### Problem 9
Express F and F' in both SOP and POS forms:

F(A, B, C) = Σm(0, 1, 4, 5)

**Solution:** **F in SOP:** F = Σm(0, 1, 4, 5)
F = A'B'C' + A'B'C + AB'C' + AB'C = **B'**

**F in POS:**
Missing: 2, 3, 6, 7
F = ΠM(2, 3, 6, 7)
F = (A + B' + C)(A + B' + C')(A' + B' + C)(A' + B' + C')

**F' in SOP:** F' = Σm(2, 3, 6, 7) = **B**

**F' in POS:** F' = ΠM(0, 1, 4, 5)

---

### Problem 10
Given F1 = Σm(0, 2, 4, 6) and F2 = Σm(1, 3, 5, 6), find:

a) F1 + F2 (OR)
b) F1 · F2 (AND)
c) F1 ⊕ F2 (XOR)

**Solution:** a) **F1 + F2:** Union of minterms
{0, 2, 4, 6} ∪ {1, 3, 5, 6} = {0, 1, 2, 3, 4, 5, 6}
**F1 + F2 = Σm(0, 1, 2, 3, 4, 5, 6)** = (m7)' = A' + B' + C'

b) **F1 · F2:** Intersection of minterms
{0, 2, 4, 6} ∩ {1, 3, 5, 6} = {6}
**F1 · F2 = Σm(6)** = ABC'

c) **F1 ⊕ F2:** Symmetric difference (in one but not both)
{0, 2, 4} ∪ {1, 3, 5} = {0, 1, 2, 3, 4, 5}
**F1 ⊕ F2 = Σm(0, 1, 2, 3, 4, 5)**

---

## Section C: Shannon's Expansion (5 problems)

### Problem 11
Apply Shannon's expansion to F(A, B, C) = AB + BC + A'C with respect to variable A.

**Solution:** Shannon's expansion: F = A·F(1,B,C) + A'·F(0,B,C)

**F(1, B, C):** Substitute A=1
F = 1·B + BC + 0·C = B + BC = B

**F(0, B, C):** Substitute A=0
F = 0·B + BC + 1·C = BC + C = C

**F = A·B + A'·C**

(This is also the simplified form)

---

### Problem 12
Use Shannon's expansion with respect to B for:

F(A, B, C) = A'B'C + ABC' + AB'C

**Solution:** F = B·F(A,1,C) + B'·F(A,0,C)

**F(A, 1, C):** Substitute B=1
F = A'·0·C + A·1·C' + A·0·C = AC'

**F(A, 0, C):** Substitute B=0
F = A'·1·C + A·1·C' + A·1·C = A'C + AC' + AC = A'C + A = A + C

Wait, let me recalculate:
F(A, 0, C) = A'·1·C + A·0·C' + A·1·C = A'C + 0 + AC = A'C + AC = C

**F = B·(AC') + B'·C**
**F = ABC' + B'C**

---

### Problem 13
Find the positive and negative cofactors of F with respect to A:

F(A, B, C, D) = AB + CD + A'BD

**Solution:** **Positive cofactor F_A (A=1):**
F(1, B, C, D) = 1·B + CD + 0·BD = B + CD
**F_A = B + CD**

**Negative cofactor F_A' (A=0):**
F(0, B, C, D) = 0·B + CD + 1·BD = CD + BD = D(B + C)
**F_A' = BD + CD = D(B + C)**

Verification: F = A·F_A + A'·F_A' = A(B + CD) + A'(BD + CD)
= AB + ACD + A'BD + A'CD = AB + CD(A + A') + A'BD
= AB + CD + A'BD ✓

---

### Problem 14
Recursively expand F(A, B, C) = A ⊕ B ⊕ C using Shannon's expansion.

**Solution:** **Level 1 - Expand with respect to A:**
F = A·F_A + A'·F_A'
F_A = 1 ⊕ B ⊕ C = (B ⊕ C)'
F_A' = 0 ⊕ B ⊕ C = B ⊕ C

F = A·(B ⊕ C)' + A'·(B ⊕ C)

**Level 2 - Expand (B ⊕ C) with respect to B:**
B ⊕ C = B·C' + B'·C

**Complete expansion:**
F = A·(BC + B'C') + A'·(B'C + BC')
= ABC + AB'C' + A'B'C + A'BC'

**F = Σm(1, 2, 4, 7)** (odd parity function)

---

### Problem 15
Use cofactors to implement F(A, B, C) = Σm(1, 2, 4, 7) using a 2-to-1 MUX with A as the select input.

**Solution:** For a 2-to-1 MUX with select A:
- When A=0: output = I0
- When A=1: output = I1

Find cofactors:
**F_A (A=1):** minterms with A=1: m4→BC', m7→BC
Wait, let me recalculate using indices:
- m1 = A'B'C (A=0)
- m2 = A'BC' (A=0)
- m4 = AB'C' (A=1)
- m7 = ABC (A=1)

**F_A' (A=0):** m1, m2 → F_A' = B'C + BC' = B ⊕ C

**F_A (A=1):** m4, m7 → F_A = B'C' + BC = (B ⊕ C)'

MUX connections:
- **I0 = B ⊕ C** (when A=0)
- **I1 = (B ⊕ C)'** (when A=1)
- **S = A**

---

## Section D: Function Implementation (5 problems)

### Problem 16
Implement F = Σm(0, 1, 4, 5, 6) using:

a) Only AND and OR gates (from SOP)
b) Only NAND gates

**Solution:** a) **SOP implementation:**
F = m0 + m1 + m4 + m5 + m6
= A'B'C' + A'B'C + AB'C' + AB'C + ABC'
= A'B'(C' + C) + AB'(C' + C) + ABC'
= A'B' + AB' + ABC'
= B'(A' + A) + ABC'
= **B' + ABC'**

Gates needed: 1 AND (ABC'), 1 NOT (B), 1 OR

b) **NAND implementation:**
F = B' + ABC' = ((B' + ABC')')'
= ((B')'·(ABC')')'
= (B · (ABC')')'

Using NAND:
- NOT B = NAND(B, B)
- ABC' = NAND(NAND(A, B, C'), 1) - need to construct

Simpler: F = B' + ABC' → use NAND-NAND structure

---

### Problem 17
Implement F = ΠM(0, 3, 5, 6) using:

a) Only AND and OR gates (from POS)
b) Only NOR gates

**Solution:** a) **POS implementation:**
F = M0 · M3 · M5 · M6
= (A+B+C)(A+B'+C')(A'+B+C')(A'+B'+C)

This requires 4 three-input OR gates and 1 four-input AND gate.

Let's simplify first:
F' = Σm(0, 3, 5, 6) = A'B'C' + A'BC + AB'C + ABC'

F = (F')' - but let's use POS directly or simplify.

From POS, F can be simplified using K-map to find minimal POS.

b) **NOR implementation:**
POS naturally maps to NOR-NOR:
Each maxterm (OR) becomes NOR-NOR
The AND of maxterms becomes NOR of NORed terms

---

### Problem 18
Design a circuit for F(A, B, C, D) = Σm(0, 1, 2, 3, 8, 9, 10, 11) using a 3-to-8 decoder.

**Solution:** First, identify the pattern:
Minterms: 0-3 have A=0, B=0
Minterms: 8-11 have A=1, B=0

Simplified: **F = B'** (F=1 whenever B=0)

But using decoder approach:
- Use a 4-to-16 decoder (or cascade 3-to-8 decoders)
- OR outputs 0, 1, 2, 3, 8, 9, 10, 11

Alternative with 3-to-8 decoder:
Use B, C, D as inputs, and:
- Enable decoder 1 when A=0
- Enable decoder 2 when A=1
- OR all outputs from both for rows 0-3 from each

Simplest: Just use **F = B'** (one inverter)

---

### Problem 19
Implement F(A, B, C) = Σm(1, 2, 4, 7) using an 8-to-1 multiplexer.

**Solution:** For 8-to-1 MUX with 3 select lines (A, B, C):

Connect inputs based on minterm values:
- I0 (m0 = 000): F=0, connect to **0**
- I1 (m1 = 001): F=1, connect to **1**
- I2 (m2 = 010): F=1, connect to **1**
- I3 (m3 = 011): F=0, connect to **0**
- I4 (m4 = 100): F=1, connect to **1**
- I5 (m5 = 101): F=0, connect to **0**
- I6 (m6 = 110): F=0, connect to **0**
- I7 (m7 = 111): F=1, connect to **1**

MUX inputs: **I7I6I5I4I3I2I1I0 = 10010110**

Select lines: S2=A, S1=B, S0=C

---

### Problem 20
Using a 4-to-1 MUX and external logic, implement:

F(A, B, C) = Σm(0, 2, 3, 5, 7)

Use A and B as select lines.

**Solution:** Group minterms by A, B values:

| A | B | C values where F=1 | MUX input |
|---|---|-------------------|-----------|
| 0 | 0 | C=0 (m0) | C' |
| 0 | 1 | C=0,1 (m2,m3) | 1 |
| 1 | 0 | C=1 (m5) | C |
| 1 | 1 | C=1 (m7) | C |

MUX connections:
- **I0 = C'** (AB=00)
- **I1 = 1** (AB=01)
- **I2 = C** (AB=10)
- **I3 = C** (AB=11)
- **S1 = A, S0 = B**

---

## Summary

| Section | Topics Covered | Problem Count |
|---------|---------------|---------------|
| A | Minterms/Maxterms | 5 |
| B | SOP and POS Forms | 5 |
| C | Shannon's Expansion | 5 |
| D | Function Implementation | 5 |
| **Total** | | **20** |

</div>
