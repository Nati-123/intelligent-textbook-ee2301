---
title: Unit 1 Challenge - Number Systems
description: Challenge problems for number systems — answers only, no solutions
---

<div class="problems-styled" markdown>

<h1 style="color: #5A3EED !important; border-bottom: 3px solid #5A3EED; padding-bottom: 0.4rem; font-weight: 800;">Challenge Problems: Number Systems</h1>

<p style="color: #555; line-height: 1.85; font-size: 1.05rem; margin-bottom: 2rem;">
These challenge problems test deeper understanding. Only final answers are provided — work through each problem on your own.
</p>

---

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);" markdown>

<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Challenge 1: Multi-Base Conversion Chain</p>

A number is written as $2A3_{16}$. Convert it to base 10, then to base 5, then express the base-5 result in octal.

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin: 0;">
<span class="arithmatex">\(2A3_{16} = 675_{10} = 10200_{5} = 1243_{8}\)</span>
</p>
</div>
</details>

</div>

---

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);" markdown>

<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Challenge 2: Two's Complement Arithmetic with Overflow Detection</p>

Using 8-bit two's complement representation, compute $(-95) + (-48)$. Determine whether overflow occurs, and give the 8-bit binary result and its decimal interpretation.

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.75; margin-top: 0;">
<span class="arithmatex">\(-95_{10} = 10100001_2\)</span>, <span class="arithmatex">\(-48_{10} = 11010000_2\)</span>
</p>
<p style="color: #333; line-height: 1.75;">
Sum: <span class="arithmatex">\(10100001 + 11010000 = 01110001_2\)</span>
</p>
<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;">
Overflow <strong>does occur</strong> (two negative operands produce a positive result). The 8-bit result is <span class="arithmatex">\(01110001_2 = +113_{10}\)</span>, which is incorrect due to overflow. The mathematically correct answer <span class="arithmatex">\(-143\)</span> is outside the 8-bit two's complement range <span class="arithmatex">\([-128, +127]\)</span>.
</p>
</div>
</details>

</div>

---

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);" markdown>

<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Challenge 3: Fixed-Point Representation</p>

A fixed-point format uses 12 bits total: 1 sign bit, 6 integer bits, and 5 fractional bits (two's complement). What is the decimal value of the bit pattern $110100.11010_2$? Also state the range and resolution of this format.

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.75; margin-top: 0;">
<strong>Value:</strong> The sign bit is 1, so the number is negative. Taking the two's complement of <span class="arithmatex">\(110100.11010\)</span>:
</p>
<p style="color: #333; line-height: 1.75;">
<span class="arithmatex">\(110100.11010 \rightarrow 001011.00110_2 = 11.1875_{10}\)</span>
</p>
<p style="color: #333; line-height: 1.75;">
So the value is <span class="arithmatex">\(-11.1875_{10}\)</span>.
</p>
<p style="color: #333; line-height: 1.75;">
<strong>Range:</strong> <span class="arithmatex">\(-32.00000\)</span> to <span class="arithmatex">\(+31.96875\)</span> (i.e., <span class="arithmatex">\(-2^5\)</span> to <span class="arithmatex">\(2^5 - 2^{-5}\)</span>)
</p>
<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;">
<strong>Resolution:</strong> <span class="arithmatex">\(2^{-5} = 0.03125\)</span>
</p>
</div>
</details>

</div>

---

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);" markdown>

<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Challenge 4: Mixed-Radix Subtraction</p>

Compute $4B2_{16} - 1101101_2$ directly by converting both to decimal, performing the subtraction, and expressing the result in both octal and hexadecimal.

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.75; margin-top: 0;">
<span class="arithmatex">\(4B2_{16} = 1202_{10}\)</span>
</p>
<p style="color: #333; line-height: 1.75;">
<span class="arithmatex">\(1101101_2 = 109_{10}\)</span>
</p>
<p style="color: #333; line-height: 1.75;">
<span class="arithmatex">\(1202 - 109 = 1093_{10}\)</span>
</p>
<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;">
<span class="arithmatex">\(1093_{10} = 2105_8 = 445_{16}\)</span>
</p>
</div>
</details>

</div>

---

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);" markdown>

<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Challenge 5: BCD Arithmetic</p>

Perform the following addition using BCD (Binary-Coded Decimal) arithmetic: $879 + 586$. Show the final BCD result and verify it by converting back to decimal.

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.75; margin-top: 0;">
Digit-by-digit BCD addition:
</p>
<ul style="list-style: none; padding-left: 0; margin: 0.5rem 0;">
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> <strong>Units:</strong> <span class="arithmatex">\(1001 + 0110 = 1111_2 = 15 > 9\)</span>, add <span class="arithmatex">\(0110\)</span> correction: <span class="arithmatex">\(1111 + 0110 = 10101\)</span>, write <span class="arithmatex">\(0101\)</span>, carry 1</li>
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> <strong>Tens:</strong> <span class="arithmatex">\(0111 + 1000 + 0001_{carry} = 10000_2 = 16 > 9\)</span>, add <span class="arithmatex">\(0110\)</span> correction: <span class="arithmatex">\(10000 + 0110 = 10110\)</span>, write <span class="arithmatex">\(0110\)</span>, carry 1</li>
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> <strong>Hundreds:</strong> <span class="arithmatex">\(1000 + 0101 + 0001_{carry} = 1110_2 = 14 > 9\)</span>, add <span class="arithmatex">\(0110\)</span> correction: <span class="arithmatex">\(1110 + 0110 = 10100\)</span>, write <span class="arithmatex">\(0100\)</span>, carry 1</li>
</ul>
<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;">
BCD result: <span class="arithmatex">\(0001\ 0100\ 0110\ 0101_{BCD} = 1465_{10}\)</span><br>
Verification: <span class="arithmatex">\(879 + 586 = 1465\)</span> &#10003;
</p>
</div>
</details>

</div>

---

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);" markdown>

<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Challenge 6: Sign Extension and Arithmetic</p>

<p style="color: #333; line-height: 1.75;">A 6-bit two's complement number $101101_2$ needs to be sign-extended to 12 bits. Write the 12-bit result, then add it to the 12-bit two's complement representation of $+45_{10}$. Does overflow occur?</p>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.75; margin-top: 0;">
6-bit <span class="arithmatex">\(101101_2\)</span>: sign bit is 1 (negative). Value: <span class="arithmatex">\(-19_{10}\)</span>.
</p>
<p style="color: #333; line-height: 1.75;">
Sign-extended to 12 bits: <span class="arithmatex">\(111111101101_2\)</span>
</p>
<p style="color: #333; line-height: 1.75;">
<span class="arithmatex">\(+45_{10} = 000000101101_2\)</span>
</p>
<p style="color: #333; line-height: 1.75;">
Sum: <span class="arithmatex">\(111111101101 + 000000101101 = 000000011010_2 = +26_{10}\)</span>
</p>
<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;">
<strong>No overflow</strong>. Both carry into and carry out of the sign bit position are 1, so they match. Result <span class="arithmatex">\(-19 + 45 = +26\)</span> is correct.
</p>
</div>
</details>

</div>

---

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);" markdown>

<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Challenge 7: Fractional Base Conversion</p>

<p style="color: #333; line-height: 1.75;">Convert the decimal number $27.6875_{10}$ to binary, then to hexadecimal. Verify your answer by converting the hexadecimal result back to decimal.</p>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.75; margin-top: 0;">
Integer part: <span class="arithmatex">\(27_{10} = 11011_2\)</span>
</p>
<p style="color: #333; line-height: 1.75;">
Fractional part: <span class="arithmatex">\(0.6875 \times 2 = 1.375 \to 1\)</span>; <span class="arithmatex">\(0.375 \times 2 = 0.75 \to 0\)</span>; <span class="arithmatex">\(0.75 \times 2 = 1.5 \to 1\)</span>; <span class="arithmatex">\(0.5 \times 2 = 1.0 \to 1\)</span>
</p>
<p style="color: #333; line-height: 1.75;">
Binary: <span class="arithmatex">\(11011.1011_2\)</span>
</p>
<p style="color: #333; line-height: 1.75;">
Group into nibbles: <span class="arithmatex">\(0001\ 1011.1011_2 = 1B.B_{16}\)</span>
</p>
<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;">
Verify: <span class="arithmatex">\(1B.B_{16} = 1 \times 16 + 11 + 11/16 = 16 + 11 + 0.6875 = 27.6875_{10}\)</span> &#10003;
</p>
</div>
</details>

</div>

---

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);" markdown>

<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Challenge 8: Excess-3 Code</p>

<p style="color: #333; line-height: 1.75;">The <strong>Excess-3</strong> code represents each decimal digit by adding 3 to its value before converting to 4-bit binary. Encode the decimal number $496$ in Excess-3, then show that the 9's complement of each digit is obtained by simply inverting all bits.</p>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.75; margin-top: 0;">
Excess-3 encoding: <span class="arithmatex">\(4+3=7 \to 0111\)</span>, <span class="arithmatex">\(9+3=12 \to 1100\)</span>, <span class="arithmatex">\(6+3=9 \to 1001\)</span>
</p>
<p style="color: #333; line-height: 1.75;">
Excess-3 of 496: <span class="arithmatex">\(0111\ 1100\ 1001\)</span>
</p>
<p style="color: #333; line-height: 1.75;">
Bit-invert: <span class="arithmatex">\(1000\ 0011\ 0110\)</span>
</p>
<p style="color: #333; line-height: 1.75;">
Decode: <span class="arithmatex">\(8-3=5\)</span>, <span class="arithmatex">\(3-3=0\)</span>, <span class="arithmatex">\(6-3=3\)</span> → <span class="arithmatex">\(503\)</span>
</p>
<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;">
9's complement of 496 = <span class="arithmatex">\(999 - 496 = 503\)</span> &#10003;. The self-complementing property works because <span class="arithmatex">\((d+3) + (9-d+3) = 15 = 1111_2\)</span>.
</p>
</div>
</details>

</div>

</div>
