---
title: Unit 3 Problems - Applications of Boolean Algebra
description: Practice problems for adders, subtractors, comparators, and decoders
---

<div class="problems-styled" markdown>

# End-of-Unit Problems: Applications of Boolean Algebra

Work through these problems to reinforce your understanding of combinational circuit applications.

---

## Section A: Half Adder and Full Adder (5 problems)

### Problem 1
Design a half adder and verify it works for all input combinations.

a) Write the truth table
b) Derive the Boolean expressions for Sum and Carry
c) Verify with inputs A=1, B=1

**Solution:** a) Truth table:

| A | B | Sum | Carry |
|---|---|-----|-------|
| 0 | 0 |  0  |   0   |
| 0 | 1 |  1  |   0   |
| 1 | 0 |  1  |   0   |
| 1 | 1 |  0  |   1   |

b) Boolean expressions:
- **Sum = A ⊕ B = A'B + AB'**
- **Carry = A · B**

c) For A=1, B=1:
- Sum = 1 ⊕ 1 = 0 ✓
- Carry = 1 · 1 = 1 ✓
- Result: 10₂ = 2₁₀ ✓ (1+1=2)

---

### Problem 2
Design a full adder using half adders.

a) Draw the block diagram
b) Write the Boolean expressions for Sum and Cout
c) Calculate the output for A=1, B=1, Cin=1

**Solution:** a) Block diagram uses two half adders and an OR gate:
- HA1: inputs A, B → Sum1, Carry1
- HA2: inputs Sum1, Cin → Sum, Carry2
- OR: Carry1 + Carry2 → Cout

b) Boolean expressions:
- **Sum = A ⊕ B ⊕ Cin**
- **Cout = AB + (A ⊕ B)Cin = AB + ACin + BCin**

c) For A=1, B=1, Cin=1:
- Sum = 1 ⊕ 1 ⊕ 1 = 0 ⊕ 1 = 1
- Cout = (1·1) + (1·1) + (1·1) = 1 + 1 + 1 = 1
- Result: 11₂ = 3₁₀ ✓ (1+1+1=3)

---

### Problem 3
A 4-bit ripple carry adder adds A = 1011 and B = 0110.

a) Show the carry propagation through each full adder
b) What is the final sum?
c) Is there an overflow?

**Solution:** Adding A = 1011 (11) and B = 0110 (6):

```
Position:   3    2    1    0
A:          1    0    1    1
B:          0    1    1    0
Cin:        1    1    1    0  (carries)
Sum:        0    0    0    1
Cout:       1    1    1    0
```

a) Carry propagation:
- Bit 0: 1+0+0 = 01, Sum=1, Cout=0
- Bit 1: 1+1+0 = 10, Sum=0, Cout=1
- Bit 2: 0+1+1 = 10, Sum=0, Cout=1
- Bit 3: 1+0+1 = 10, Sum=0, Cout=1

b) Sum = **10001₂** (but only 4 bits shown as 0001 with carry out)
   Complete answer: **17₁₀**

c) For unsigned: Yes, there's a carry out, so **overflow** (result > 15)
   Actual result 17 doesn't fit in 4 bits.

---

### Problem 4
Design a circuit that adds three 1-bit numbers (A, B, C).

**Solution:** The output range is 0 to 3, requiring 2 output bits (S1, S0).

Truth table:
| A | B | C | S1 | S0 | Decimal |
|---|---|---|----|----|---------|
| 0 | 0 | 0 | 0  | 0  |    0    |
| 0 | 0 | 1 | 0  | 1  |    1    |
| 0 | 1 | 0 | 0  | 1  |    1    |
| 0 | 1 | 1 | 1  | 0  |    2    |
| 1 | 0 | 0 | 0  | 1  |    1    |
| 1 | 0 | 1 | 1  | 0  |    2    |
| 1 | 1 | 0 | 1  | 0  |    2    |
| 1 | 1 | 1 | 1  | 1  |    3    |

Expressions:
- **S0 = A ⊕ B ⊕ C** (odd parity)
- **S1 = AB + BC + AC** (majority function)

This is exactly a **full adder** circuit!

---

### Problem 5
Calculate the worst-case propagation delay for an 8-bit ripple carry adder if each full adder has:
- XOR gate delay: 10 ns
- AND gate delay: 5 ns
- OR gate delay: 5 ns

**Solution:** In a ripple carry adder, the critical path is the carry chain.

For each full adder:
- Carry out = AB + (A⊕B)Cin
- Time for carry: max(AND delay, XOR+AND) + OR delay
- Critical carry path per stage: 5 + 5 = 10 ns (or 10+5+5=20ns through XOR path)

Actually, the carry path through each FA:
- Cin to Cout through AND-OR: ~10 ns per stage

For 8 bits: **8 × 10 ns = 80 ns** worst case

(Note: The first bit also needs time to generate its carry from A, B inputs)

---

## Section B: Subtractor Circuits (4 problems)

### Problem 6
Design a half subtractor.

a) Write the truth table (A - B)
b) Derive expressions for Difference and Borrow

**Solution:** a) Truth table for A - B:

| A | B | Difference | Borrow |
|---|---|------------|--------|
| 0 | 0 |     0      |   0    |
| 0 | 1 |     1      |   1    |
| 1 | 0 |     1      |   0    |
| 1 | 1 |     0      |   0    |

b) Boolean expressions:
- **Difference = A ⊕ B** (same as half adder Sum)
- **Borrow = A'B** (need to borrow when A=0, B=1)

---

### Problem 7
Design an adder/subtractor circuit for 4-bit numbers using a control signal M (M=0 for add, M=1 for subtract).

**Solution:** The key insight: A - B = A + (-B) = A + (B' + 1) in two's complement

Design:
1. XOR each bit of B with control M
   - When M=0: B ⊕ 0 = B (addition)
   - When M=1: B ⊕ 1 = B' (complement for subtraction)
2. Connect M to Cin of the first full adder
   - When M=0: Cin=0 (normal add)
   - When M=1: Cin=1 (adds the +1 for two's complement)

Circuit: **4-bit adder with B inputs XORed with M, and Cin = M**

Expression for each B input: B_i ⊕ M

---

### Problem 8
Perform 4-bit subtraction using two's complement: 1001 - 0101

**Solution:** A = 1001 (9), B = 0101 (5)
A - B = A + (-B)

Step 1: Find two's complement of B
- B = 0101
- B' = 1010
- -B = B' + 1 = 1011

Step 2: Add A + (-B)
```
    1001
  + 1011
  ------
   10100
```

Step 3: Discard carry (5th bit), result = **0100₂ = 4₁₀**

Check: 9 - 5 = 4 ✓

---

### Problem 9
What happens when you subtract a larger number from a smaller one using 4-bit two's complement?
Calculate: 0011 - 0111 (3 - 7)

**Solution:** A = 0011 (3), B = 0111 (7)

Step 1: Two's complement of B
- B' = 1000
- -B = 1001

Step 2: Add A + (-B)
```
    0011
  + 1001
  ------
    1100
```

Step 3: No carry out. Result = 1100₂

Step 4: Interpret as two's complement:
- MSB = 1, so negative
- Take two's complement of 1100: 0011 + 1 = 0100 = 4
- Result = **-4**

Check: 3 - 7 = -4 ✓

---

## Section C: Comparators (4 problems)

### Problem 10
Design a 1-bit comparator that outputs three signals:
- G (A > B)
- E (A = B)
- L (A < B)

**Solution:** Truth table:

| A | B | G | E | L |
|---|---|---|---|---|
| 0 | 0 | 0 | 1 | 0 |
| 0 | 1 | 0 | 0 | 1 |
| 1 | 0 | 1 | 0 | 0 |
| 1 | 1 | 0 | 1 | 0 |

Boolean expressions:
- **G = AB'** (A greater when A=1, B=0)
- **E = A ⊙ B = (A ⊕ B)'** (Equal when same)
- **L = A'B** (A less when A=0, B=1)

---

### Problem 11
Design a 2-bit magnitude comparator.

**Solution:** Inputs: A1A0 and B1B0

Compare MSB first, then LSB:
- If A1 > B1: A > B
- If A1 < B1: A < B
- If A1 = B1: compare A0 and B0

Boolean expressions:
- **G = A1B1' + (A1 ⊙ B1)·A0B0'**
- **L = A1'B1 + (A1 ⊙ B1)·A0'B0**
- **E = (A1 ⊙ B1)·(A0 ⊙ B0)**

Simplified:
- G = A1B1' + A1'A0B1'B0' + A1A0B1B0' = A1B1' + A0B0'(A1⊙B1)
- L = A1'B1 + A0'B0(A1⊙B1)
- E = (A1⊕B1)'(A0⊕B0)'

---

### Problem 12
Compare the numbers A = 1011 and B = 1010 using a 4-bit comparator.

**Solution:** A = 1011₂ = 11₁₀
B = 1010₂ = 10₁₀

Bit-by-bit comparison (MSB to LSB):
- Bit 3: A3=1, B3=1 → Equal, continue
- Bit 2: A2=0, B2=0 → Equal, continue
- Bit 1: A1=1, B1=1 → Equal, continue
- Bit 0: A0=1, B0=0 → A0 > B0

Result: **A > B** (G=1, E=0, L=0)

---

### Problem 13
Design a circuit that determines if a 4-bit number is within the range 5 to 10 (inclusive).

**Solution:** Need: 5 ≤ N ≤ 10, where N = N3N2N1N0

Using comparators:
- Compare N ≥ 5 (0101)
- Compare N ≤ 10 (1010)
- AND the results

Alternative - list valid values:
5 = 0101, 6 = 0110, 7 = 0111, 8 = 1000, 9 = 1001, 10 = 1010

**InRange = (N≥5) · (N≤10)**

Or direct implementation:
InRange = N3'N2N0 + N3'N2N1 + N3N2'N1' = Σm(5,6,7,8,9,10)

---

## Section D: Decoders and Encoders (4 problems)

### Problem 14
Design a 2-to-4 decoder with an enable input E.

**Solution:** Inputs: E (enable), A1, A0
Outputs: Y0, Y1, Y2, Y3

When E=0, all outputs = 0
When E=1, one output is active based on A1A0

Truth table (E=1):
| A1 | A0 | Y0 | Y1 | Y2 | Y3 |
|----|----|----|----|----|-----|
| 0  | 0  | 1  | 0  | 0  | 0  |
| 0  | 1  | 0  | 1  | 0  | 0  |
| 1  | 0  | 0  | 0  | 1  | 0  |
| 1  | 1  | 0  | 0  | 0  | 1  |

Boolean expressions:
- **Y0 = E · A1' · A0'**
- **Y1 = E · A1' · A0**
- **Y2 = E · A1 · A0'**
- **Y3 = E · A1 · A0**

---

### Problem 15
Implement the function F(A, B, C) = Σm(1, 2, 6, 7) using a 3-to-8 decoder.

**Solution:** A 3-to-8 decoder generates all 8 minterms m0 through m7.

For F = Σm(1, 2, 6, 7):

**F = m1 + m2 + m6 + m7**

Connect decoder outputs:
- Y1 (m1), Y2 (m2), Y6 (m6), Y7 (m7) to a 4-input OR gate

Circuit: 3-to-8 decoder + 4-input OR gate

---

### Problem 16
Design a priority encoder for 4 inputs (D3, D2, D1, D0) where D3 has highest priority.

**Solution:** Outputs: Y1, Y0 (binary code), V (valid - at least one input active)

Priority: If D3=1, output 11 regardless of other inputs

| D3 | D2 | D1 | D0 | Y1 | Y0 | V |
|----|----|----|----|----|----|----|
| 0  | 0  | 0  | 0  | X  | X  | 0 |
| 0  | 0  | 0  | 1  | 0  | 0  | 1 |
| 0  | 0  | 1  | X  | 0  | 1  | 1 |
| 0  | 1  | X  | X  | 1  | 0  | 1 |
| 1  | X  | X  | X  | 1  | 1  | 1 |

Boolean expressions:
- **Y1 = D3 + D2**
- **Y0 = D3 + D2'D1**
- **V = D3 + D2 + D1 + D0**

---

### Problem 17
Design a BCD to 7-segment decoder for displaying digit 5.

a) What segments should be ON for digit 5?
b) Write the segment pattern

**Solution:** 7-segment display layout:
```
   a
  ---
f|   |b
  -g-
e|   |c
  ---
   d
```

a) For digit 5: **segments a, c, d, f, g should be ON**
   (5 looks like: top bar, top-left, middle, bottom-right, bottom)

b) Segment pattern (1=ON):
| Segment | a | b | c | d | e | f | g |
|---------|---|---|---|---|---|---|---|
| Digit 5 | 1 | 0 | 1 | 1 | 0 | 1 | 1 |

Pattern: **1011011** (or in hex for active-high: 6D)

---

## Section E: Application Problems (3 problems)

### Problem 18
Design a binary coded decimal (BCD) adder that adds two BCD digits and produces a BCD sum.

**Solution:** BCD digits range from 0-9. When adding two BCD digits + carry:
- If sum ≤ 9: result is valid BCD
- If sum > 9: add 6 (0110) to correct

Correction needed when:
- Sum > 9 (binary sum 1010 to 1111), OR
- Carry out from 4-bit addition

Circuit design:
1. Add the two 4-bit BCD digits using a 4-bit adder
2. Check if sum > 9 OR carry out
3. If yes, add 6 using another 4-bit adder
4. Output the carry

**Correction condition: C4 + S3S2 + S3S1 = 1**

---

### Problem 19
A vending machine accepts quarters (25¢) only. Design a circuit that indicates when 75¢ or more has been deposited.

Let Q2, Q1, Q0 represent the count of quarters (0-7).

**Solution:** 75¢ = 3 quarters, so we need Q ≥ 3

Q (count) in binary: Q2Q1Q0

| Quarters | Q2 | Q1 | Q0 | Output |
|----------|----|----|----| ------|
|    0     | 0  | 0  | 0  |   0   |
|    1     | 0  | 0  | 1  |   0   |
|    2     | 0  | 1  | 0  |   0   |
|    3     | 0  | 1  | 1  |   1   |
|    4     | 1  | 0  | 0  |   1   |
|    5     | 1  | 0  | 1  |   1   |
|    6     | 1  | 1  | 0  |   1   |
|    7     | 1  | 1  | 1  |   1   |

**F = Q2 + Q1Q0**

---

### Problem 20
Design a 4-bit parity generator that outputs 1 if the input has an odd number of 1s.

**Solution:** For inputs A, B, C, D:

**Parity = A ⊕ B ⊕ C ⊕ D**

The XOR of all bits equals 1 when there's an odd number of 1s.

Implementation:
- Use three 2-input XOR gates:
  1. XOR1: A ⊕ B
  2. XOR2: C ⊕ D
  3. XOR3: XOR1 ⊕ XOR2

This creates **odd parity** (total 1s including parity bit is odd).

---

## Summary

| Section | Topics Covered | Problem Count |
|---------|---------------|---------------|
| A | Half/Full Adders | 5 |
| B | Subtractors | 4 |
| C | Comparators | 4 |
| D | Decoders/Encoders | 4 |
| E | Applications | 3 |
| **Total** | | **20** |

</div>
