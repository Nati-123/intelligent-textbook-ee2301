---
title: Unit 1 Quiz - Number Systems
description: Test your understanding of number systems, conversions, and binary arithmetic
hide:
  - toc
---

<div class="problems-styled" markdown>

<h1 style="color: #5A3EED !important; border-bottom: 3px solid #5A3EED; padding-bottom: 0.4rem; font-weight: 800; margin-bottom: 1.5rem;">Quiz: Number Systems</h1>

<p style="color: #555; line-height: 1.85; font-size: 1.05rem; margin-bottom: 2rem;">
Test your understanding of digital number systems, base conversions, signed representations, and binary arithmetic with these questions.
</p>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 1</p>

<p style="color: #333; line-height: 1.75;">What is the decimal equivalent of the binary number 1101?</p>

<div class="upper-alpha" markdown>
1. 13
2. 11
3. 15
4. 12
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: A</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">Binary 1101 converts to decimal by summing the weighted positional values: <span class="arithmatex">\(1 \times 2^3 + 1 \times 2^2 + 0 \times 2^1 + 1 \times 2^0 = 8 + 4 + 0 + 1 = 13\)</span>. Option B (11) would be binary 1011. Option C (15) would be binary 1111. Option D (12) would be binary 1100.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Binary to Decimal Conversion</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 2</p>

<p style="color: #333; line-height: 1.75;">In a positional number system, what does the term "base" or "radix" refer to?</p>

<div class="upper-alpha" markdown>
1. The largest digit that can appear in the number
2. The position of the most significant bit
3. The total number of digits in any given number
4. The number of unique digits used in the system
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: D</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">The base (or radix) of a number system is the number of unique digits it uses. Binary uses 2 digits (0, 1), decimal uses 10 digits (0–9), and hexadecimal uses 16 digits (0–9, A–F). Option A is close but incorrect—the largest digit is base minus 1 (e.g., 9 in decimal, not 10). The base defines the weight progression: each position's weight is <span class="arithmatex">\(\text{base}^{\text{position}}\)</span>.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Base (Radix) of a Number System</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 3</p>

<p style="color: #333; line-height: 1.75;">How is the decimal number <span class="arithmatex">\(-5\)</span> represented in 8-bit two's complement?</p>

<div class="upper-alpha" markdown>
1. 10000101
2. 11111011
3. 11111010
4. 00000101
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: B</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">To find <span class="arithmatex">\(-5\)</span> in two's complement: start with <span class="arithmatex">\(+5\)</span> (00000101), invert all bits (11111010), then add 1 (11111011). Option A (10000101) is <span class="arithmatex">\(-5\)</span> in sign-magnitude representation. Option C (11111010) is <span class="arithmatex">\(-6\)</span> in two's complement (the inversion step before adding 1). Option D (00000101) is positive 5.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Two's Complement Representation</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 4</p>

<p style="color: #333; line-height: 1.75;">When adding two positive numbers in 4-bit two's complement, how is overflow detected?</p>

<div class="upper-alpha" markdown>
1. The carry out of the MSB is 1
2. Both operands have the same sign bit
3. The carry into the MSB differs from the carry out of the MSB
4. The result has more bits than the operands
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: C</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">The general overflow detection rule for two's complement addition is: overflow occurs when the carry into the MSB (<span class="arithmatex">\(C_{n-1}\)</span>) differs from the carry out of the MSB (<span class="arithmatex">\(C_n\)</span>), i.e., <span class="arithmatex">\(V = C_{n-1} \oplus C_n\)</span>. For example, in 4-bit: <span class="arithmatex">\(0111 + 0001 = 1000\)</span> produces <span class="arithmatex">\(C_3 = 1\)</span> (carry into MSB) and <span class="arithmatex">\(C_4 = 0\)</span> (carry out), so <span class="arithmatex">\(V = 1 \oplus 0 = 1\)</span> (overflow). This method works for both positive and negative operand combinations.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Overflow Detection</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 5</p>

<p style="color: #333; line-height: 1.75;">Convert hexadecimal <span class="arithmatex">\(\text{A3}_{16}\)</span> to binary.</p>

<div class="upper-alpha" markdown>
1. 10100011
2. 10100111
3. 10110011
4. 11000011
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: A</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">Each hexadecimal digit converts directly to 4 binary bits: <span class="arithmatex">\(\text{A} = 1010\)</span> and <span class="arithmatex">\(3 = 0011\)</span>, so <span class="arithmatex">\(\text{A3} = 10100011\)</span>. This shortcut works because <span class="arithmatex">\(16 = 2^4\)</span>, making each hex digit correspond to exactly one nibble. Option B (10100111) would be <span class="arithmatex">\(\text{A7}\)</span>. Option C (10110011) would be <span class="arithmatex">\(\text{B3}\)</span>. Option D (11000011) would be <span class="arithmatex">\(\text{C3}\)</span>.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Hexadecimal to Binary Conversion</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 6</p>

<p style="color: #333; line-height: 1.75;">How many bits are in a nibble, and what is its significance in hexadecimal representation?</p>

<div class="upper-alpha" markdown>
1. 8 bits; a nibble represents two hexadecimal digits
2. 2 bits; a nibble represents a single binary decision
3. 16 bits; a nibble is equivalent to a standard processor word
4. 4 bits; a nibble represents exactly one hexadecimal digit
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: D</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">A nibble is a group of 4 bits, representing half of a byte. Since <span class="arithmatex">\(2^4 = 16\)</span>, one nibble maps directly to a single hexadecimal digit (0–F), which is why hex is widely used as a compact notation for binary data. For example, the byte 10110101 splits into nibbles 1011 (B) and 0101 (5), giving <span class="arithmatex">\(\text{B5}_{16}\)</span>.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Nibble / Binary Data Units</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 7</p>

<p style="color: #333; line-height: 1.75;">What is the range of values representable in 8-bit two's complement?</p>

<div class="upper-alpha" markdown>
1. $-128$ to $+127$
2. $0$ to $255$
3. $-127$ to $+127$
4. $-128$ to $+128$
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: A</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">In <span class="arithmatex">\(n\)</span>-bit two's complement, the range is <span class="arithmatex">\(-2^{n-1}\)</span> to <span class="arithmatex">\(+2^{n-1} - 1\)</span>. For 8 bits: <span class="arithmatex">\(-2^7\)</span> to <span class="arithmatex">\(+2^7 - 1 = -128\)</span> to <span class="arithmatex">\(+127\)</span>. The asymmetry (one more negative value) arises because <span class="arithmatex">\(-128\)</span> (10000000) has no positive counterpart in 8 bits. Option B (<span class="arithmatex">\(0\)</span> to <span class="arithmatex">\(255\)</span>) is the range for 8-bit unsigned numbers. Option C (<span class="arithmatex">\(-127\)</span> to <span class="arithmatex">\(+127\)</span>) is the range for one's complement. Option D is impossible since <span class="arithmatex">\(+128\)</span> requires 8 data bits plus a sign bit.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Range of Signed Numbers</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 8</p>

<p style="color: #333; line-height: 1.75;">What is the result of the binary subtraction <span class="arithmatex">\(1011_2 - 0110_2\)</span>?</p>

<div class="upper-alpha" markdown>
1. 0100
2. 0101
3. 0110
4. 0011
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: B</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">Binary <span class="arithmatex">\(1011\)</span> (decimal 11) minus <span class="arithmatex">\(0110\)</span> (decimal 6) equals <span class="arithmatex">\(0101\)</span> (decimal 5). Working right to left: <span class="arithmatex">\(1 - 0 = 1\)</span>, <span class="arithmatex">\(1 - 1 = 0\)</span>, <span class="arithmatex">\(0 - 1\)</span> requires a borrow making it <span class="arithmatex">\(10 - 1 = 1\)</span> (and reducing the next column), <span class="arithmatex">\(0 - 0 = 0\)</span> (after the borrow adjusts to <span class="arithmatex">\(1 - 1 = 0\)</span>). Alternatively, using two's complement: <span class="arithmatex">\(1011 + 1010 = 10101\)</span>; discarding the carry-out gives <span class="arithmatex">\(0101\)</span>.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Binary Subtraction</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 9</p>

<p style="color: #333; line-height: 1.75;">A designer needs to add a 4-bit signed value to an 8-bit signed value. What operation must be performed on the 4-bit number before the addition?</p>

<div class="upper-alpha" markdown>
1. Zero-extend it by padding four 0s to the left
2. Truncate the 8-bit number to 4 bits instead
3. Sign-extend it by copying the MSB (sign bit) into the four new upper positions
4. Complement all bits before extending
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: C</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">Sign extension increases the bit width of a signed number while preserving its value by copying the sign bit (MSB) into all new upper positions. For example, extending 4-bit <span class="arithmatex">\(-3\)</span> (<span class="arithmatex">\(1101\)</span>) to 8 bits gives <span class="arithmatex">\(11111101\)</span>, which still represents <span class="arithmatex">\(-3\)</span>. Zero extension (option A) would incorrectly change negative numbers to large positive values: <span class="arithmatex">\(1101 \rightarrow 00001101 = +13\)</span>, not <span class="arithmatex">\(-3\)</span>.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Sign Extension</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 10</p>

<p style="color: #333; line-height: 1.75;">Convert octal <span class="arithmatex">\(75_8\)</span> to decimal.</p>

<div class="upper-alpha" markdown>
1. 57
2. 75
3. 63
4. 61
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: D</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">Octal <span class="arithmatex">\(75\)</span> converts to decimal by summing weighted positional values: <span class="arithmatex">\(7 \times 8^1 + 5 \times 8^0 = 56 + 5 = 61\)</span>. Option A (57) would be octal <span class="arithmatex">\(71_8\)</span>. Option B (75) incorrectly treats the octal number as decimal. Option C (63) would be octal <span class="arithmatex">\(77_8\)</span>. Octal was historically important in computing because <span class="arithmatex">\(8 = 2^3\)</span>, so each octal digit maps to exactly 3 binary bits.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Octal to Decimal Conversion</p>
</div>
</details>

</div>

---

<h2 style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">Answers Summary</h2>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

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

</div>

</div>
