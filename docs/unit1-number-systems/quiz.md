---
title: Unit 1 Quiz - Number Systems
description: Test your understanding of number systems, conversions, and binary arithmetic
---

# Quiz: Number Systems

Test your understanding of digital number systems, base conversions, and binary arithmetic with these questions.

---

#### 1. What is the decimal equivalent of the binary number 1101?

<div class="upper-alpha" markdown>
1. 11
2. 13
3. 15
4. 12
</div>

??? question "Show Answer"
    The correct answer is **B**. Binary 1101 converts to decimal by summing the weighted positional values: 1×8 + 1×4 + 0×2 + 1×1 = 8 + 4 + 0 + 1 = 13. Option A (11) would be binary 1011. Option C (15) would be binary 1111. Option D (12) would be binary 1100.

    **Concept Tested:** Binary to Decimal Conversion

---

#### 2. In a positional number system, what does the term "base" or "radix" refer to?

<div class="upper-alpha" markdown>
1. The largest digit that can appear in the number
2. The number of unique digits used in the system
3. The position of the most significant bit
4. The total number of digits in any given number
</div>

??? question "Show Answer"
    The correct answer is **B**. The base (or radix) of a number system is the number of unique digits it uses. Binary uses 2 digits (0, 1), decimal uses 10 digits (0-9), and hexadecimal uses 16 digits (0-9, A-F). Option A is close but incorrect - the largest digit is base minus 1.

    **Concept Tested:** Base of Number System

---

#### 3. How is the decimal number -5 represented in 8-bit two's complement?

<div class="upper-alpha" markdown>
1. 10000101
2. 11111011
3. 11111010
4. 00000101
</div>

??? question "Show Answer"
    The correct answer is **B**. To find -5 in two's complement: start with +5 (00000101), invert all bits (11111010), then add 1 (11111011). Option A (10000101) is -5 in sign-magnitude representation. Option C (11111010) is -6 in two's complement. Option D (00000101) is positive 5.

    **Concept Tested:** Twos Complement

---

#### 4. When adding two positive numbers in 4-bit two's complement, overflow occurs when:

<div class="upper-alpha" markdown>
1. The carry out of the MSB is 1
2. The result is negative (MSB = 1)
3. The carry in equals the carry out of the MSB
4. Both operands have the same sign bit
</div>

??? question "Show Answer"
    The correct answer is **B**. When adding two positive numbers (both MSB = 0), overflow occurs if the result has MSB = 1, indicating an incorrect negative result. For example, in 4-bit: 0111 (7) + 0001 (1) = 1000 (-8), which is overflow. Option A alone doesn't indicate overflow. Options C and D describe conditions but not the definitive test.

    **Concept Tested:** Overflow Detection

---

#### 5. Convert hexadecimal A3 to binary.

<div class="upper-alpha" markdown>
1. 10100111
2. 10100011
3. 10110011
4. 11000011
</div>

??? question "Show Answer"
    The correct answer is **B**. Each hexadecimal digit converts to 4 binary bits: A = 1010 and 3 = 0011, so A3 = 10100011. Option A (10100111) would be A7. Option C (10110011) would be B3. Option D (11000011) would be C3.

    **Concept Tested:** Hexadecimal to Binary

---

#### 6. What is a nibble?

<div class="upper-alpha" markdown>
1. 8 bits
2. 16 bits
3. 4 bits
4. 2 bits
</div>

??? question "Show Answer"
    The correct answer is **C**. A nibble is a group of 4 bits, representing half of a byte. One nibble can represent a single hexadecimal digit (0-F) or decimal values 0-15. Option A (8 bits) is a byte. Option B (16 bits) is often called a word in older systems.

    **Concept Tested:** Nibble

---

#### 7. What is the range of values that can be represented using 8-bit two's complement?

<div class="upper-alpha" markdown>
1. 0 to 255
2. -127 to +127
3. -128 to +127
4. -128 to +128
</div>

??? question "Show Answer"
    The correct answer is **C**. In n-bit two's complement, the range is -2^(n-1) to +2^(n-1)-1. For 8 bits: -2^7 to +2^7-1 = -128 to +127. Option A (0 to 255) is the range for 8-bit unsigned numbers. Option B incorrectly limits the negative range. Option D has +128 which requires 8 bits plus sign.

    **Concept Tested:** Range of Signed Numbers

---

#### 8. When performing binary subtraction 1011 - 0110, what is the result?

<div class="upper-alpha" markdown>
1. 0100
2. 0101
3. 0110
4. 0011
</div>

??? question "Show Answer"
    The correct answer is **B**. Binary 1011 (decimal 11) minus 0110 (decimal 6) equals 0101 (decimal 5). Working right to left: 1-0=1, 1-1=0, 0-1 requires borrow making it 10-1=1, and 0-0=0 (after borrow).

    **Concept Tested:** Binary Subtraction

---

#### 9. What is sign extension used for?

<div class="upper-alpha" markdown>
1. Converting unsigned numbers to signed numbers
2. Increasing bit width while preserving the signed value
3. Detecting overflow in arithmetic operations
4. Converting between different number bases
</div>

??? question "Show Answer"
    The correct answer is **B**. Sign extension increases the bit width of a signed number while preserving its value by copying the sign bit (MSB) to fill the new positions. For example, extending 4-bit -3 (1101) to 8 bits gives 11111101. This is essential when performing arithmetic on operands of different sizes.

    **Concept Tested:** Sign Extension

---

#### 10. Convert octal 75 to decimal.

<div class="upper-alpha" markdown>
1. 61
2. 57
3. 75
4. 63
</div>

??? question "Show Answer"
    The correct answer is **A**. Octal 75 converts to decimal by summing weighted positional values: 7×8 + 5×1 = 56 + 5 = 61. Option B (57) would be octal 71. Option D (63) would be octal 77.

    **Concept Tested:** Octal to Decimal Conversion
