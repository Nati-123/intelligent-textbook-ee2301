---
title: Unit 1 Quiz - Number Systems
description: Test your understanding of number systems, conversions, and binary arithmetic
---

# Quiz: Number Systems

Test your understanding of digital number systems, base conversions, signed representations, and binary arithmetic with these questions.

---

#### 1. What is the decimal equivalent of the binary number 1101?

<div class="upper-alpha" markdown>
1. 13
2. 11
3. 15
4. 12
</div>

!!! question "Show Answer"
    The correct answer is **A**. Binary 1101 converts to decimal by summing the weighted positional values: $1 \times 2^3 + 1 \times 2^2 + 0 \times 2^1 + 1 \times 2^0 = 8 + 4 + 0 + 1 = 13$. Option B (11) would be binary 1011. Option C (15) would be binary 1111. Option D (12) would be binary 1100.

    **Concept Tested:** Binary to Decimal Conversion

---

#### 2. In a positional number system, what does the term "base" or "radix" refer to?

<div class="upper-alpha" markdown>
1. The largest digit that can appear in the number
2. The position of the most significant bit
3. The total number of digits in any given number
4. The number of unique digits used in the system
</div>

!!! question "Show Answer"
    The correct answer is **D**. The base (or radix) of a number system is the number of unique digits it uses. Binary uses 2 digits (0, 1), decimal uses 10 digits (0–9), and hexadecimal uses 16 digits (0–9, A–F). Option A is close but incorrect—the largest digit is base minus 1 (e.g., 9 in decimal, not 10). The base defines the weight progression: each position's weight is $\text{base}^{\text{position}}$.

    **Concept Tested:** Base (Radix) of a Number System

---

#### 3. How is the decimal number $-5$ represented in 8-bit two's complement?

<div class="upper-alpha" markdown>
1. 10000101
2. 11111011
3. 11111010
4. 00000101
</div>

!!! question "Show Answer"
    The correct answer is **B**. To find $-5$ in two's complement: start with $+5$ (00000101), invert all bits (11111010), then add 1 (11111011). Option A (10000101) is $-5$ in sign-magnitude representation. Option C (11111010) is $-6$ in two's complement (the inversion step before adding 1). Option D (00000101) is positive 5.

    **Concept Tested:** Two's Complement Representation

---

#### 4. When adding two positive numbers in 4-bit two's complement, how is overflow detected?

<div class="upper-alpha" markdown>
1. The carry out of the MSB is 1
2. Both operands have the same sign bit
3. The carry into the MSB differs from the carry out of the MSB
4. The result has more bits than the operands
</div>

!!! question "Show Answer"
    The correct answer is **C**. The general overflow detection rule for two's complement addition is: overflow occurs when the carry into the MSB ($C_{n-1}$) differs from the carry out of the MSB ($C_n$), i.e., $V = C_{n-1} \oplus C_n$. For example, in 4-bit: $0111 + 0001 = 1000$ produces $C_3 = 1$ (carry into MSB) and $C_4 = 0$ (carry out), so $V = 1 \oplus 0 = 1$ (overflow). This method works for both positive and negative operand combinations.

    **Concept Tested:** Overflow Detection

---

#### 5. Convert hexadecimal $\text{A3}_{16}$ to binary.

<div class="upper-alpha" markdown>
1. 10100011
2. 10100111
3. 10110011
4. 11000011
</div>

!!! question "Show Answer"
    The correct answer is **A**. Each hexadecimal digit converts directly to 4 binary bits: $\text{A} = 1010$ and $3 = 0011$, so $\text{A3} = 10100011$. This shortcut works because $16 = 2^4$, making each hex digit correspond to exactly one nibble. Option B (10100111) would be $\text{A7}$. Option C (10110011) would be $\text{B3}$. Option D (11000011) would be $\text{C3}$.

    **Concept Tested:** Hexadecimal to Binary Conversion

---

#### 6. How many bits are in a nibble, and what is its significance in hexadecimal representation?

<div class="upper-alpha" markdown>
1. 8 bits; a nibble represents two hexadecimal digits
2. 2 bits; a nibble represents a single binary decision
3. 16 bits; a nibble is equivalent to a standard processor word
4. 4 bits; a nibble represents exactly one hexadecimal digit
</div>

!!! question "Show Answer"
    The correct answer is **D**. A nibble is a group of 4 bits, representing half of a byte. Since $2^4 = 16$, one nibble maps directly to a single hexadecimal digit (0–F), which is why hex is widely used as a compact notation for binary data. For example, the byte 10110101 splits into nibbles 1011 (B) and 0101 (5), giving $\text{B5}_{16}$.

    **Concept Tested:** Nibble / Binary Data Units

---

#### 7. What is the range of values representable in 8-bit two's complement?

<div class="upper-alpha" markdown>
1. $-128$ to $+127$
2. $0$ to $255$
3. $-127$ to $+127$
4. $-128$ to $+128$
</div>

!!! question "Show Answer"
    The correct answer is **A**. In $n$-bit two's complement, the range is $-2^{n-1}$ to $+2^{n-1} - 1$. For 8 bits: $-2^7$ to $+2^7 - 1 = -128$ to $+127$. The asymmetry (one more negative value) arises because $-128$ (10000000) has no positive counterpart in 8 bits. Option B ($0$ to $255$) is the range for 8-bit unsigned numbers. Option C ($-127$ to $+127$) is the range for one's complement. Option D is impossible since $+128$ requires 8 data bits plus a sign bit.

    **Concept Tested:** Range of Signed Numbers

---

#### 8. What is the result of the binary subtraction $1011_2 - 0110_2$?

<div class="upper-alpha" markdown>
1. 0100
2. 0101
3. 0110
4. 0011
</div>

!!! question "Show Answer"
    The correct answer is **B**. Binary $1011$ (decimal 11) minus $0110$ (decimal 6) equals $0101$ (decimal 5). Working right to left: $1 - 0 = 1$, $1 - 1 = 0$, $0 - 1$ requires a borrow making it $10 - 1 = 1$ (and reducing the next column), $0 - 0 = 0$ (after the borrow from the previous column adjusts to $1 - 1 = 0$). Alternatively, using two's complement: $1011 + 1010 = 10101$; discarding the carry-out gives $0101$.

    **Concept Tested:** Binary Subtraction

---

#### 9. A designer needs to add a 4-bit signed value to an 8-bit signed value. What operation must be performed on the 4-bit number before the addition?

<div class="upper-alpha" markdown>
1. Zero-extend it by padding four 0s to the left
2. Truncate the 8-bit number to 4 bits instead
3. Sign-extend it by copying the MSB (sign bit) into the four new upper positions
4. Complement all bits before extending
</div>

!!! question "Show Answer"
    The correct answer is **C**. Sign extension increases the bit width of a signed number while preserving its value by copying the sign bit (MSB) into all new upper positions. For example, extending 4-bit $-3$ ($1101$) to 8 bits gives $11111101$, which still represents $-3$. Zero extension (option A) would incorrectly change negative numbers to large positive values: $1101 \rightarrow 00001101 = +13$, not $-3$.

    **Concept Tested:** Sign Extension

---

#### 10. Convert octal $75_8$ to decimal.

<div class="upper-alpha" markdown>
1. 57
2. 75
3. 63
4. 61
</div>

!!! question "Show Answer"
    The correct answer is **D**. Octal $75$ converts to decimal by summing weighted positional values: $7 \times 8^1 + 5 \times 8^0 = 56 + 5 = 61$. Option A (57) would be octal $71_8$. Option B (75) incorrectly treats the octal number as decimal. Option C (63) would be octal $77_8$. Octal was historically important in computing because $8 = 2^3$, so each octal digit maps to exactly 3 binary bits.

    **Concept Tested:** Octal to Decimal Conversion

---

## Answers Summary

| Question | Answer | Concept |
|----------|--------|---------|
| 1 | A | Binary to Decimal Conversion |
| 2 | D | Base (Radix) of a Number System |
| 3 | B | Two's Complement Representation |
| 4 | C | Overflow Detection |
| 5 | A | Hexadecimal to Binary Conversion |
| 6 | D | Nibble / Binary Data Units |
| 7 | A | Range of Signed Numbers |
| 8 | B | Binary Subtraction |
| 9 | C | Sign Extension |
| 10 | D | Octal to Decimal Conversion |
