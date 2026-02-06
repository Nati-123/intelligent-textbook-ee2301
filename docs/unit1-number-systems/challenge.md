---
title: Unit 1 Challenge - Number Systems
description: Challenge problems for number systems — answers only, no solutions
---

# Challenge Problems: Number Systems

These challenge problems test deeper understanding. Only final answers are provided — work through each problem on your own.

---

#### Challenge 1: Multi-Base Conversion Chain

A number is written as $2A3_{16}$. Convert it to base 10, then to base 5, then express the base-5 result in octal.

??? success "Answer"
    $2A3_{16} = 675_{10} = 10200_{5} = 1243_{8}$

---

#### Challenge 2: Two's Complement Arithmetic with Overflow Detection

Using 8-bit two's complement representation, compute $(-95) + (-48)$. Determine whether overflow occurs, and give the 8-bit binary result and its decimal interpretation.

??? success "Answer"
    $-95_{10} = 10100001_2$, $-48_{10} = 11010000_2$

    Sum: $10100001 + 11010000 = 01110001_2$

    Overflow **does occur** (two negative operands produce a positive result). The 8-bit result is $01110001_2 = +113_{10}$, which is incorrect due to overflow. The mathematically correct answer $-143$ is outside the 8-bit two's complement range $[-128, +127]$.

---

#### Challenge 3: Fixed-Point Representation

A fixed-point format uses 12 bits total: 1 sign bit, 6 integer bits, and 5 fractional bits (two's complement). What is the decimal value of the bit pattern $110100.11010_2$? Also state the range and resolution of this format.

??? success "Answer"
    Value: The sign bit is 1, so the number is negative. Taking the two's complement of $110100.11010$:

    $110100.11010 \rightarrow 001011.00110_2 = 11.1875_{10}$

    So the value is $-11.1875_{10}$.

    Range: $-32.00000$ to $+31.96875$ (i.e., $-2^5$ to $2^5 - 2^{-5}$)

    Resolution: $2^{-5} = 0.03125$

---

#### Challenge 4: Mixed-Radix Subtraction

Compute $4B2_{16} - 1101101_2$ directly by converting both to decimal, performing the subtraction, and expressing the result in both octal and hexadecimal.

??? success "Answer"
    $4B2_{16} = 1202_{10}$

    $1101101_2 = 109_{10}$

    $1202 - 109 = 1093_{10}$

    $1093_{10} = 2105_8 = 445_{16}$

---

#### Challenge 5: BCD Arithmetic

Perform the following addition using BCD (Binary-Coded Decimal) arithmetic: $879 + 586$. Show the final BCD result and verify it by converting back to decimal.

??? success "Answer"
    Digit-by-digit BCD addition:

    - Units: $1001 + 0110 = 1111_2 = 15 > 9$, add $0110$ correction: $1111 + 0110 = 10101$, write $0101$, carry 1
    - Tens: $0111 + 1000 + 0001_{carry} = 10000_2 = 16 > 9$, add $0110$ correction: $10000 + 0110 = 10110$, write $0110$, carry 1
    - Hundreds: $1000 + 0101 + 0001_{carry} = 1110_2 = 14 > 9$, add $0110$ correction: $1110 + 0110 = 10100$, write $0100$, carry 1

    BCD result: $0001\ 0100\ 0110\ 0101_{BCD} = 1465_{10}$

    Verification: $879 + 586 = 1465$ ✓
