---
title: Unit 1 Problems - Number Systems
description: Practice problems for number systems, base conversions, and binary arithmetic
---

# End-of-Unit Problems: Number Systems

Work through these problems to reinforce your understanding of number systems and conversions.

---

## Section A: Base Conversions (10 problems)

### Problem 1
Convert the following decimal numbers to binary, octal, and hexadecimal:

a) 156
b) 243
c) 512
d) 1000

??? success "Solution"
    a) 156₁₀ = 10011100₂ = 234₈ = 9C₁₆

    b) 243₁₀ = 11110011₂ = 363₈ = F3₁₆

    c) 512₁₀ = 1000000000₂ = 1000₈ = 200₁₆

    d) 1000₁₀ = 1111101000₂ = 1750₈ = 3E8₁₆

---

### Problem 2
Convert the following binary numbers to decimal:

a) 11010110₂
b) 10101010₂
c) 11111111₂
d) 10000001₂

??? success "Solution"
    a) 11010110₂ = 128 + 64 + 16 + 4 + 2 = **214₁₀**

    b) 10101010₂ = 128 + 32 + 8 + 2 = **170₁₀**

    c) 11111111₂ = 255₁₀ (all bits set)

    d) 10000001₂ = 128 + 1 = **129₁₀**

---

### Problem 3
Convert between hexadecimal and binary:

a) 3F7₁₆ to binary
b) 1010111001₂ to hexadecimal
c) BEEF₁₆ to binary
d) 110011110000₂ to hexadecimal

??? success "Solution"
    a) 3F7₁₆ = 0011 1111 0111₂ = **001111110111₂**

    b) 1010111001₂ = 0010 1011 1001₂ = **2B9₁₆**

    c) BEEF₁₆ = 1011 1110 1110 1111₂ = **1011111011101111₂**

    d) 110011110000₂ = 1100 1111 0000₂ = **CF0₁₆**

---

### Problem 4
Convert the following octal numbers to decimal and binary:

a) 752₈
b) 377₈
c) 1234₈
d) 4000₈

??? success "Solution"
    a) 752₈ = 7×64 + 5×8 + 2×1 = 448 + 40 + 2 = **490₁₀** = 111101010₂

    b) 377₈ = 3×64 + 7×8 + 7×1 = 192 + 56 + 7 = **255₁₀** = 11111111₂

    c) 1234₈ = 1×512 + 2×64 + 3×8 + 4×1 = 512 + 128 + 24 + 4 = **668₁₀**

    d) 4000₈ = 4×512 = **2048₁₀** = 100000000000₂

---

### Problem 5
A computer memory address is given as 7FFF₁₆.

a) Convert this to decimal
b) Convert this to binary
c) How many bytes can be addressed from 0000₁₆ to 7FFF₁₆?

??? success "Solution"
    a) 7FFF₁₆ = 7×4096 + 15×256 + 15×16 + 15 = 28672 + 3840 + 240 + 15 = **32767₁₀**

    b) 7FFF₁₆ = 0111 1111 1111 1111₂ = **111111111111111₂** (15 ones)

    c) From 0000 to 7FFF = 7FFF + 1 = 8000₁₆ = **32768 bytes** = 32 KB

---

## Section B: Signed Number Representations (8 problems)

### Problem 6
Represent -45 in the following 8-bit formats:

a) Sign-magnitude
b) One's complement
c) Two's complement

??? success "Solution"
    First, 45₁₀ = 00101101₂

    a) Sign-magnitude: **10101101** (MSB = 1 for negative)

    b) One's complement: Invert all bits of 00101101 → **11010010**

    c) Two's complement: One's complement + 1 = 11010010 + 1 = **11010011**

---

### Problem 7
What decimal values do the following 8-bit two's complement numbers represent?

a) 10000000
b) 11111111
c) 10000001
d) 01111111

??? success "Solution"
    a) 10000000₂ = **-128** (most negative 8-bit value)

    b) 11111111₂ = **-1** (invert → 00000000, add 1 → 00000001, negate → -1)

    c) 10000001₂ = **-127** (invert → 01111110 = 126, add 1 → 127, negate → -127)

    d) 01111111₂ = **+127** (MSB = 0, so positive, value = 127)

---

### Problem 8
What is the range of values that can be represented in:

a) 8-bit unsigned
b) 8-bit two's complement
c) 16-bit unsigned
d) 16-bit two's complement

??? success "Solution"
    a) 8-bit unsigned: **0 to 255** (0 to 2⁸ - 1)

    b) 8-bit two's complement: **-128 to +127** (-2⁷ to 2⁷ - 1)

    c) 16-bit unsigned: **0 to 65,535** (0 to 2¹⁶ - 1)

    d) 16-bit two's complement: **-32,768 to +32,767** (-2¹⁵ to 2¹⁵ - 1)

---

### Problem 9
Perform the following two's complement arithmetic (8-bit):

a) 35 + 47
b) 35 + (-47)
c) (-35) + (-47)
d) 100 + 50 (check for overflow)

??? success "Solution"
    a) 35 = 00100011, 47 = 00101111
       00100011 + 00101111 = 01010010 = **82** ✓

    b) 35 = 00100011, -47 = 11010001
       00100011 + 11010001 = 11110100 = **-12** ✓

    c) -35 = 11011101, -47 = 11010001
       11011101 + 11010001 = 110101110 (carry out)
       Result = 10101110 = **-82** ✓

    d) 100 = 01100100, 50 = 00110010
       01100100 + 00110010 = 10010110 = -106
       **Overflow!** (positive + positive = negative)
       Actual answer should be 150, but it exceeds +127

---

### Problem 10
Explain why overflow occurred in Problem 9d and how you can detect it.

??? success "Solution"
    **Why overflow occurred:**
    - Both operands (100 and 50) are positive
    - The true sum (150) exceeds the maximum positive value (+127) for 8-bit two's complement
    - The result wrapped around to a negative number (-106)

    **Overflow detection rules:**
    - Overflow occurs when adding two positive numbers yields a negative result
    - Overflow occurs when adding two negative numbers yields a positive result
    - Overflow CANNOT occur when adding numbers of opposite signs

    **Hardware detection:**
    - Overflow = Carry into MSB XOR Carry out of MSB
    - In this case: Carry in = 1, Carry out = 0, so 1 XOR 0 = 1 (overflow)

---

## Section C: Binary Arithmetic (7 problems)

### Problem 11
Perform binary addition:

a) 10110 + 11011
b) 111111 + 000001
c) 10101010 + 01010101

??? success "Solution"
    a)
    ```
        10110
      + 11011
      -------
       110001
    ```
    22 + 27 = **49** ✓

    b)
    ```
        111111
      + 000001
      --------
       1000000
    ```
    63 + 1 = **64** ✓

    c)
    ```
        10101010
      + 01010101
      ----------
        11111111
    ```
    170 + 85 = **255** ✓

---

### Problem 12
Perform binary subtraction using two's complement:

a) 11010 - 10011
b) 10000 - 00001
c) 01100100 - 00110010

??? success "Solution"
    a) 11010 - 10011 = 11010 + (two's complement of 10011)
       Two's complement of 10011 = 01101
       11010 + 01101 = 100111 → discard carry → **00111** = 7
       Check: 26 - 19 = 7 ✓

    b) 10000 - 00001 = 10000 + 11111 = 101111 → **01111** = 15
       Check: 16 - 1 = 15 ✓

    c) 01100100 - 00110010 = 01100100 + 11001110 = 100110010
       Discard carry → **00110010** = 50
       Check: 100 - 50 = 50 ✓

---

### Problem 13
Multiply the following binary numbers:

a) 1101 × 101
b) 1011 × 110

??? success "Solution"
    a) 1101 × 101:
    ```
            1101
          ×  101
          ------
            1101  (1101 × 1)
           0000   (1101 × 0, shifted)
          1101    (1101 × 1, shifted)
          ------
         1000001
    ```
    13 × 5 = **65** = 1000001₂ ✓

    b) 1011 × 110:
    ```
            1011
          ×  110
          ------
           0000   (1011 × 0)
          1011    (1011 × 1, shifted)
         1011     (1011 × 1, shifted)
         -------
         1000010
    ```
    11 × 6 = **66** = 1000010₂ ✓

---

## Section D: Fractional Numbers (5 problems)

### Problem 14
Convert the following decimal fractions to binary (4 fractional bits):

a) 0.625
b) 0.3125
c) 6.75

??? success "Solution"
    a) 0.625 × 2 = 1.25 → 1
       0.25 × 2 = 0.5 → 0
       0.5 × 2 = 1.0 → 1
       **0.625₁₀ = 0.101₂**

    b) 0.3125 × 2 = 0.625 → 0
       0.625 × 2 = 1.25 → 1
       0.25 × 2 = 0.5 → 0
       0.5 × 2 = 1.0 → 1
       **0.3125₁₀ = 0.0101₂**

    c) Integer part: 6 = 110₂
       Fractional: 0.75 × 2 = 1.5 → 1, 0.5 × 2 = 1.0 → 1
       **6.75₁₀ = 110.11₂**

---

### Problem 15
Convert the following binary fractions to decimal:

a) 101.011₂
b) 11.1101₂
c) 0.0001₂

??? success "Solution"
    a) 101.011₂ = 4 + 0 + 1 + 0.25 + 0.125 = **5.375₁₀**

    b) 11.1101₂ = 2 + 1 + 0.5 + 0.25 + 0 + 0.0625 = **3.8125₁₀**

    c) 0.0001₂ = 0.0625₁₀ = **1/16**

---

## Section E: Application Problems (5 problems)

### Problem 16
An 8-bit grayscale image uses values 0-255 to represent pixel brightness.

a) What binary value represents 50% gray?
b) What is the hex value for white?
c) How many distinct shades can be represented?

??? success "Solution"
    a) 50% gray = 255 × 0.5 ≈ 127 or 128
       127 = **01111111₂** or 128 = **10000000₂**

    b) White = maximum brightness = 255 = **FF₁₆**

    c) 8 bits = 2⁸ = **256 distinct shades** (0 to 255)

---

### Problem 17
A 24-bit RGB color uses 8 bits each for Red, Green, and Blue.

a) What is the hex representation of pure red?
b) What color is #00FF00?
c) What color is #808080?
d) How many colors can be represented?

??? success "Solution"
    a) Pure red: R=255, G=0, B=0 → **#FF0000**

    b) R=0, G=255, B=0 → **Pure green**

    c) R=128, G=128, B=128 → **Medium gray** (50% gray)

    d) 24 bits = 2²⁴ = **16,777,216 colors**

---

### Problem 18
A 4-bit binary counter counts from 0000 to 1111 repeatedly.

a) How many states does it have?
b) If it increments every 1 ms, how long until it returns to 0000?
c) What is the state after 0111?
d) What is the state after 1111?

??? success "Solution"
    a) 4 bits = 2⁴ = **16 states** (0 to 15)

    b) 16 states × 1 ms = **16 ms** for one complete cycle

    c) 0111 + 1 = **1000** (7 → 8)

    d) 1111 + 1 = 10000, but only 4 bits, so **0000** (wrap around)

---

### Problem 19
A computer uses 32-bit addresses.

a) How many bytes of memory can be addressed?
b) Express this in KB, MB, and GB
c) If upgrading to 64-bit addressing, how much more memory can be addressed?

??? success "Solution"
    a) 2³² = **4,294,967,296 bytes**

    b) 4,294,967,296 bytes = 4,194,304 KB = 4,096 MB = **4 GB**

    c) 64-bit: 2⁶⁴ = 18,446,744,073,709,551,616 bytes = **16 exabytes**
       Increase factor: 2⁶⁴ / 2³² = 2³² = **4 billion times more**

---

### Problem 20
Design a number format for a simple embedded system that needs to represent:
- Temperatures from -40°C to +85°C
- Resolution of 0.5°C

a) How many bits are needed?
b) What encoding scheme would you use?
c) Show the encoding for -10°C, 0°C, and 25.5°C

??? success "Solution"
    a) Range: -40 to +85 = 126 degrees
       With 0.5°C resolution: 126 / 0.5 = 252 values needed
       2⁸ = 256, so **8 bits** are sufficient

    b) **Offset binary** encoding:
       - Offset = 40 (to make -40°C map to 0)
       - Value = (Temperature + 40) / 0.5
       - Or use two's complement with implicit scaling

    c) Using offset binary (offset = 40, scale = 0.5):
       - -10°C: (-10 + 40) / 0.5 = 60 = **00111100₂**
       - 0°C: (0 + 40) / 0.5 = 80 = **01010000₂**
       - 25.5°C: (25.5 + 40) / 0.5 = 131 = **10000011₂**

---

## Summary

| Section | Topics Covered | Problem Count |
|---------|---------------|---------------|
| A | Base Conversions | 5 |
| B | Signed Numbers | 5 |
| C | Binary Arithmetic | 3 |
| D | Fractional Numbers | 2 |
| E | Applications | 5 |
| **Total** | | **20** |
