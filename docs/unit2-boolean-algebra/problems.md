---
title: Unit 2 Problems - Boolean Algebra
description: Practice problems for Boolean algebra, logic gates, and theorems
---

# End-of-Unit Problems: Boolean Algebra

Work through these problems to reinforce your understanding of Boolean algebra and logic gates.

---

## Section A: Basic Logic Gates (6 problems)

### Problem 1
Complete the truth tables for the following gates:

a) 3-input AND gate
b) 3-input OR gate
c) 3-input NAND gate

**Solution:** a) **3-input AND** (output = 1 only when ALL inputs = 1)

| A | B | C | Y |
|---|---|---|---|
| 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 0 |
| 0 | 1 | 0 | 0 |
| 0 | 1 | 1 | 0 |
| 1 | 0 | 0 | 0 |
| 1 | 0 | 1 | 0 |
| 1 | 1 | 0 | 0 |
| 1 | 1 | 1 | 1 |

b) **3-input OR** (output = 1 when ANY input = 1)

| A | B | C | Y |
|---|---|---|---|
| 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 1 |
| 0 | 1 | 0 | 1 |
| 0 | 1 | 1 | 1 |
| 1 | 0 | 0 | 1 |
| 1 | 0 | 1 | 1 |
| 1 | 1 | 0 | 1 |
| 1 | 1 | 1 | 1 |

c) **3-input NAND** (inverse of 3-input AND)

| A | B | C | Y |
|---|---|---|---|
| 0 | 0 | 0 | 1 |
| 0 | 0 | 1 | 1 |
| 0 | 1 | 0 | 1 |
| 0 | 1 | 1 | 1 |
| 1 | 0 | 0 | 1 |
| 1 | 0 | 1 | 1 |
| 1 | 1 | 0 | 1 |
| 1 | 1 | 1 | 0 |

---

### Problem 2
Determine the output of each gate for the given inputs:

a) AND gate: A=1, B=0
b) OR gate: A=0, B=0
c) XOR gate: A=1, B=1
d) NAND gate: A=1, B=1
e) NOR gate: A=0, B=1
f) XNOR gate: A=1, B=0

**Solution:** a) AND(1, 0) = 1 · 0 = **0**

b) OR(0, 0) = 0 + 0 = **0**

c) XOR(1, 1) = 1 ⊕ 1 = **0**

d) NAND(1, 1) = (1 · 1)' = 1' = **0**

e) NOR(0, 1) = (0 + 1)' = 1' = **0**

f) XNOR(1, 0) = (1 ⊕ 0)' = 1' = **0**

---

### Problem 3
For the circuit: Y = ((A · B) + C)'

a) Create the truth table
b) Identify the output for A=1, B=1, C=0

**Solution:** a) Truth table:

| A | B | C | A·B | (A·B)+C | Y=((A·B)+C)' |
|---|---|---|-----|---------|--------------|
| 0 | 0 | 0 |  0  |    0    |      1       |
| 0 | 0 | 1 |  0  |    1    |      0       |
| 0 | 1 | 0 |  0  |    0    |      1       |
| 0 | 1 | 1 |  0  |    1    |      0       |
| 1 | 0 | 0 |  0  |    0    |      1       |
| 1 | 0 | 1 |  0  |    1    |      0       |
| 1 | 1 | 0 |  1  |    1    |      0       |
| 1 | 1 | 1 |  1  |    1    |      0       |

b) A=1, B=1, C=0: (1·1)+0 = 1, Y = 1' = **0**

---

## Section B: Boolean Algebra Laws (8 problems)

### Problem 4
Identify which Boolean law is illustrated in each equation:

a) A + 0 = A
b) A · A' = 0
c) A + (B · C) = (A + B) · (A + C)
d) (A · B)' = A' + B'
e) A + A = A
f) A · (A + B) = A

**Solution:** a) **Identity Law** (OR with 0)

b) **Complement Law** (AND with complement)

c) **Distributive Law** (OR over AND)

d) **De Morgan's Theorem** (NAND form)

e) **Idempotent Law** (OR form)

f) **Absorption Law**

---

### Problem 5
Prove the following using Boolean algebra laws:

A + A'B = A + B

**Solution:** Starting with: A + A'B

Step 1: A + A'B = A·1 + A'B (Identity law)

Step 2: = A·(1) + A'B (Rewrite)

Step 3: = A·(1 + B) + A'B (Identity: 1 + B = 1)

Step 4: = A + AB + A'B (Distributive)

Step 5: = A + B(A + A') (Factor out B)

Step 6: = A + B·1 (Complement: A + A' = 1)

Step 7: = **A + B** ✓

---

### Problem 6
Simplify using Boolean algebra:

a) AB + AB' + A'B
b) (A + B)(A + B')
c) A'B'C + A'BC + AB'C + ABC

**Solution:** a) AB + AB' + A'B
   = A(B + B') + A'B (Factor A)
   = A·1 + A'B (Complement law)
   = A + A'B
   = **A + B** (Absorption)

b) (A + B)(A + B')
   = AA + AB' + BA + BB' (FOIL)
   = A + AB' + AB + 0 (Idempotent, Complement)
   = A + A(B' + B) (Factor)
   = A + A·1 = **A** (Absorption)

c) A'B'C + A'BC + AB'C + ABC
   = A'C(B' + B) + AC(B' + B) (Factor)
   = A'C·1 + AC·1 (Complement)
   = A'C + AC
   = C(A' + A) = **C** (Complement)

---

### Problem 7
Apply De Morgan's theorem to find the complement:

a) (AB + CD)'
b) (A + B)(C + D)'
c) ((A + B)'C)'

**Solution:** a) (AB + CD)' = (AB)' · (CD)' (De Morgan: break OR)
   = (A' + B')(C' + D') (De Morgan on each term)

b) First, let X = (A + B)(C + D)
   X' = ((A + B)(C + D))'
   = (A + B)' + (C + D)' (De Morgan: break AND)
   = **A'B' + C'D'** (De Morgan on each term)

c) ((A + B)'C)'
   = (A + B)'' + C' (De Morgan: break AND)
   = (A + B) + C' (Double negation)
   = **A + B + C'**

---

### Problem 8
Prove De Morgan's theorem for two variables using truth tables.

**Solution:** Proving: (A · B)' = A' + B'

| A | B | A·B | (A·B)' | A' | B' | A'+B' |
|---|---|-----|--------|----|----|-------|
| 0 | 0 |  0  |   1    | 1  | 1  |   1   |
| 0 | 1 |  0  |   1    | 1  | 0  |   1   |
| 1 | 0 |  0  |   1    | 0  | 1  |   1   |
| 1 | 1 |  1  |   0    | 0  | 0  |   0   |

Columns (A·B)' and A'+B' are **identical**, proving De Morgan's theorem. ✓

---

## Section C: Expression Simplification (6 problems)

### Problem 9
Simplify the following expressions:

a) A'B + AB' + AB
b) (A + B)(A' + B)(A + B')
c) ABC + ABC' + AB'C + AB'C'

**Solution:** a) A'B + AB' + AB
   = A'B + A(B' + B) (Factor)
   = A'B + A (Complement)
   = **A + B** (Absorption: X'Y + X = X + Y)

b) (A + B)(A' + B)(A + B')
   = ((A + B)(A + B'))(A' + B) (Rearrange)
   = (A + BB')(A' + B) (Distributive)
   = A(A' + B) (B·B' = 0)
   = AA' + AB
   = 0 + AB = **AB**

c) ABC + ABC' + AB'C + AB'C'
   = AB(C + C') + AB'(C + C')
   = AB·1 + AB'·1
   = AB + AB' = A(B + B') = **A**

---

### Problem 10
Given F = Σm(1, 3, 5, 7), write:

a) The SOP expression
b) Simplify the expression

**Solution:** a) For 3 variables (A, B, C):
   - m1 = A'B'C
   - m3 = A'BC
   - m5 = AB'C
   - m7 = ABC

   F = A'B'C + A'BC + AB'C + ABC

b) Simplification:
   F = A'C(B' + B) + AC(B' + B)
   = A'C·1 + AC·1
   = A'C + AC
   = C(A' + A) = **C**

---

### Problem 11
Simplify: F = A'B'C' + A'B'C + A'BC' + AB'C'

**Solution:** F = A'B'C' + A'B'C + A'BC' + AB'C'

Group terms:
= A'B'(C' + C) + C'(A'B + AB')
= A'B'·1 + C'(A ⊕ B)
= A'B' + C'(A'B + AB')

Alternative approach - factor C':
= A'B'C' + AB'C' + A'B'C + A'BC'
= B'C'(A' + A) + A'(B'C + BC')
= B'C' + A'(B ⊕ C)

Most simplified: **A'B' + A'C' + B'C'**

---

## Section D: Circuit Analysis (5 problems)

### Problem 12
Write the Boolean expression for a circuit with:
- First level: AND gates for AB and CD
- Second level: OR gate combining the AND outputs
- Third level: NOT gate on the OR output

**Solution:** Step by step:
1. First level: X = AB, Y = CD
2. Second level: Z = X + Y = AB + CD
3. Third level: F = Z' = **(AB + CD)'**

Using De Morgan's: F = (A' + B')(C' + D')

---

### Problem 13
Analyze the circuit: F = A ⊕ B ⊕ C

Create the complete truth table and describe what this circuit detects.

**Solution:** | A | B | C | A⊕B | F=A⊕B⊕C |
|---|---|---|-----|---------|
| 0 | 0 | 0 |  0  |    0    |
| 0 | 0 | 1 |  0  |    1    |
| 0 | 1 | 0 |  1  |    1    |
| 0 | 1 | 1 |  1  |    0    |
| 1 | 0 | 0 |  1  |    1    |
| 1 | 0 | 1 |  1  |    0    |
| 1 | 1 | 0 |  0  |    0    |
| 1 | 1 | 1 |  0  |    1    |

**Function:** This circuit outputs 1 when there is an **odd number of 1s** in the inputs.
It's an **odd parity generator/checker**.

---

### Problem 14
Design a circuit that outputs 1 only when exactly two of three inputs (A, B, C) are 1.

**Solution:** Identify the minterms where exactly two inputs are 1:
- A=0, B=1, C=1: m3 = A'BC
- A=1, B=0, C=1: m5 = AB'C
- A=1, B=1, C=0: m6 = ABC'

F = A'BC + AB'C + ABC'

Simplified: **F = AB'C + A'BC + ABC'**
(This is the 2-of-3 majority without the all-1s case)

Alternative form: F = (A ⊕ B)C + AB(C')
Or: F = AB ⊕ BC ⊕ AC (careful - this includes m7)

Correct: **F = A'BC + AB'C + ABC'**

---

### Problem 15
A 2-input multiplexer has inputs A, B, select line S, and output Y.
When S=0, Y=A; when S=1, Y=B.

Write the Boolean expression for Y.

**Solution:** Create truth table:

| S | A | B | Y |
|---|---|---|---|
| 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 0 |
| 0 | 1 | 0 | 1 |
| 0 | 1 | 1 | 1 |
| 1 | 0 | 0 | 0 |
| 1 | 0 | 1 | 1 |
| 1 | 1 | 0 | 0 |
| 1 | 1 | 1 | 1 |

From the table, when S=0, Y follows A; when S=1, Y follows B.

**Y = S'A + SB**

This is the fundamental multiplexer equation.

---

## Section E: Word Problems (5 problems)

### Problem 16
A car's dome light should turn on when:
- Any door is open, OR
- The headlight switch is in the "dome" position

Let D1, D2, D3, D4 represent the four door switches (1 = open) and H represent the headlight switch (1 = dome position).

Write the Boolean expression for the dome light L.

**Solution:** The light turns on if ANY door is open OR if the headlight switch is in dome position:

**L = D1 + D2 + D3 + D4 + H**

This is simply a 5-input OR function.

---

### Problem 17
A safety interlock system requires that a machine can only start (S=1) when:
- The guard is in place (G=1), AND
- The emergency stop is NOT pressed (E=0), AND
- Either the start button is pressed (B=1) OR the machine is already running (R=1)

Write and simplify the Boolean expression for S.

**Solution:** Translating the requirements:
- Guard in place: G
- Emergency stop NOT pressed: E'
- Start button OR already running: B + R

**S = G · E' · (B + R)**

Or expanded: S = GE'B + GE'R

---

### Problem 18
Design an alarm system where the alarm (A) sounds when:
- Motion is detected (M=1) AND the system is armed (S=1), OR
- A door/window sensor is triggered (D=1) AND the system is armed (S=1), OR
- The panic button is pressed (P=1) regardless of arm status

**Solution:** **A = SM + SD + P**

Simplified by factoring:
**A = S(M + D) + P**

The alarm sounds if:
- System is armed AND (motion OR door triggered), OR
- Panic button pressed (always)

---

### Problem 19
A voting circuit has 4 inputs (A, B, C, D) representing votes from 4 committee members. The output Y should be 1 if at least 3 members vote yes (majority of 4).

**Solution:** Y = 1 when 3 or 4 inputs are 1.

Minterms with 3 ones: m7, m11, m13, m14
Minterm with 4 ones: m15

Y = A'BCD + AB'CD + ABC'D + ABCD' + ABCD

Simplified:
Y = BCD(A' + A) + ACD(B' + B) + ABD(C' + C) + ABC(D' + D) - overcounting

Better approach:
**Y = ABC + ABD + ACD + BCD**

This means: at least 3 of 4 must be true.

---

### Problem 20
A digital combination lock opens when the correct 3-bit code (101) is entered.
Inputs are C2, C1, C0 (MSB to LSB). Output O=1 when code matches.

Write the expression and implement with basic gates.

**Solution:** The code 101 means: C2=1, C1=0, C0=1

**O = C2 · C1' · C0**

Implementation:
1. NOT gate on C1 to get C1'
2. 3-input AND gate: C2, C1', C0

Gate count: 1 NOT + 1 AND (3-input) = **2 gates**

---

## Summary

| Section | Topics Covered | Problem Count |
|---------|---------------|---------------|
| A | Basic Logic Gates | 3 |
| B | Boolean Algebra Laws | 5 |
| C | Expression Simplification | 3 |
| D | Circuit Analysis | 4 |
| E | Word Problems | 5 |
| **Total** | | **20** |
