---
title: Unit 1 — Number Systems
description: Foundation of digital system design covering number representations, base conversions, binary arithmetic, and signed number systems
generated_by: claude skill chapter-content-generator
date: 2026-02-04 17:05:00
version: 0.03
---

<div class="unit1-styled" markdown>

# Unit 1 — Number Systems

<details class="video-overview">
<summary><strong>Unit Overview</strong> (click to expand)</summary>

Welcome to Unit 1 of Digital System Design, where we explore the number systems that form the mathematical backbone of every digital device you use. You already think in decimal every day — base ten, with digits zero through nine — but computers speak an entirely different language. Understanding how to move between that familiar world and the world of ones and zeros is where your journey into digital design truly begins.

Let's start with the big idea: positional notation. In any number system, the value of a digit depends on its position. In decimal, the number 365 means three hundreds, six tens, and five ones. The same principle applies in binary, octal, and hexadecimal — only the base changes. Binary uses base two with just the digits zero and one. Octal uses base eight with digits zero through seven. And hexadecimal uses base sixteen, borrowing the letters A through F to represent values ten through fifteen.

So how do you convert between them? The key techniques are repeated division for converting from decimal to another base, and weighted expansion for converting back to decimal. With a little practice, you will also learn shortcut groupings — every three binary digits map neatly to one octal digit, and every four binary digits map to one hexadecimal digit.

Once you are comfortable moving between bases, we turn to binary arithmetic — addition, subtraction, and the critical concept of signed versus unsigned representation. Two's complement lets us represent both positive and negative integers using a fixed number of bits, and the beauty is that the same addition circuitry works for both signed and unsigned values.

**Key Takeaways**

1. Positional notation is the unifying principle behind decimal, binary, octal, and hexadecimal — only the base differs.
2. Conversion techniques such as repeated division, weighted expansion, and binary-to-hex grouping are essential everyday skills in digital design.
3. Two's complement representation enables signed arithmetic with the same hardware used for unsigned addition, and overflow detection tells you when a result has exceeded the available bit width.

</details>

## Summary

Number systems form the mathematical foundation of digital system design, providing the essential framework for representing and manipulating information in electronic circuits. This unit introduces the four primary number systems used in computing—decimal, binary, octal, and hexadecimal—and establishes the concepts of positional notation that underpin all digital arithmetic operations. Students will master conversion techniques between bases, perform binary arithmetic, and understand the critical distinction between signed and unsigned number representations. The unit culminates with two's complement arithmetic, the dominant method used in modern processors for handling negative numbers, along with techniques for detecting arithmetic overflow conditions.

---

## Concepts Covered

1. Digital Systems
2. Analog vs Digital Signals
3. Binary Number System
4. Decimal Number System
5. Octal Number System
6. Hexadecimal Number System
7. Positional Notation
8. Base of Number System
9. Radix Point
10. Bit
11. Nibble
12. Byte
13. Word
14. Most Significant Bit
15. Least Significant Bit
16. Binary to Decimal Conversion
17. Decimal to Binary Conversion
18. Octal to Decimal Conversion
19. Decimal to Octal Conversion
20. Hexadecimal to Decimal
21. Decimal to Hexadecimal
22. Binary to Octal Conversion
23. Octal to Binary Conversion
24. Binary to Hexadecimal
25. Hexadecimal to Binary
26. Binary Addition
27. Binary Subtraction
28. Binary Multiplication
29. Binary Division
30. Signed Numbers
31. Unsigned Numbers
32. Sign Magnitude
33. Ones Complement
34. Twos Complement
35. Sign Extension
36. Twos Complement Addition
37. Twos Complement Subtraction
38. Overflow Detection
39. Underflow
40. Range of Signed Numbers

---

## Prerequisites

Before beginning this unit, students should have:

- Basic algebra and mathematical reasoning skills
- Familiarity with the decimal number system and place values
- Understanding of basic arithmetic operations (addition, subtraction, multiplication, division)

---

<h2 id="11-introduction-to-digital-systems" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">1.1 Introduction to Digital Systems</h2>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
Modern computing relies entirely on <strong style="color: #333;">digital systems</strong> — electronic circuits that process information using discrete signal levels rather than continuous values. Unlike <strong style="color: #333;">analog signals</strong>, which can take any value within a continuous range (like the smooth variation of audio from a microphone), <strong style="color: #333;">digital signals</strong> represent information using only two distinct states: typically high voltage (logic 1) and low voltage (logic 0).
</p>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.5rem;">
This binary representation offers significant advantages for electronic systems. Digital circuits exhibit superior <strong style="color: #333;">noise immunity</strong> because small variations in voltage do not change the logical interpretation of a signal. Additionally, digital information can be stored, copied, and transmitted without degradation, enabling the complex computations that power everything from smartphones to supercomputers.
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

| Signal Type | Values | Example | Noise Immunity |
|-------------|--------|---------|----------------|
| Analog | Continuous | Audio waveform | Low |
| Digital | Discrete (0, 1) | Binary data | High |

</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
The foundation of all digital systems is the <strong style="color: #333;">binary number system</strong>, which uses only two symbols (0 and 1) to represent numerical values. Understanding how numbers are encoded in binary — and how to convert between binary and other number systems — is essential for digital system design.
</p>

#### Diagram: Analog vs Digital Signal Comparison

<iframe src="../sims/analog-vs-digital-signals/main.html" width="100%" height="480px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>

<details markdown="1">
<summary>Analog vs Digital Signal Comparison</summary>
Type: diagram

Purpose: Visually demonstrate the fundamental difference between continuous analog signals and discrete digital signals

Bloom Level: Understand (L2)
Bloom Verb: Compare, contrast

Learning Objective: Students will be able to explain the difference between analog and digital signal representations and identify why digital signals are preferred in computing systems.

Visual Elements:
- Split canvas showing two signal displays side by side
- Left panel: Smooth sinusoidal analog waveform (continuous curve)
- Right panel: Stepped digital signal showing only HIGH (1) and LOW (0) levels
- Time axis (x-axis) labeled for both panels
- Amplitude/Voltage axis (y-axis) for both panels
- Noise band visualization showing how analog signals can be corrupted
- Threshold lines on digital side showing valid HIGH and LOW regions

Interactive Elements:
- Slider to add noise to both signals
- Toggle to show/hide threshold regions
- Button to animate signal progression over time

Color Scheme:
- Analog signal: Blue gradient
- Digital signal: Green for HIGH, gray for LOW
- Noise: Red overlay
- Background: Light gray grid

Data Visibility Requirements:
- Show actual voltage values at cursor position
- Display whether digital interpretation is valid despite noise

Implementation: p5.js with responsive canvas
</details>

---

<h2 id="12-positional-number-systems" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">1.2 Positional Number Systems</h2>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
All the number systems used in digital design — decimal, binary, octal, and hexadecimal — are <strong style="color: #333;">positional number systems</strong>. In positional notation, the value of each digit depends on both the digit itself and its position within the number. The <strong style="color: #333;">base</strong> (also called <strong style="color: #333;">radix</strong>) determines how many unique symbols the system uses and the multiplier for each position.
</p>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 0.8rem;">
The general formula for positional notation is:
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

$$N = \sum_{i=-m}^{n-1} d_i \times \text{base}^i$$

</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.5rem;">
where <span class="arithmatex">\(d_i\)</span> represents the digit at position <span class="arithmatex">\(i\)</span>, <span class="arithmatex">\(n\)</span> is the number of integer digits, and <span class="arithmatex">\(m\)</span> is the number of fractional digits. The <strong style="color: #333;">radix point</strong> (decimal point in base 10, binary point in base 2) separates integer positions from fractional positions.
</p>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">The Decimal Number System</h3>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1rem;">
The <strong style="color: #333;">decimal number system</strong> (base 10) uses ten symbols: 0, 1, 2, 3, 4, 5, 6, 7, 8, and 9. Each position represents a power of 10, with the rightmost integer position being <span class="arithmatex">\(10^0 = 1\)</span>.
</p>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 10px; padding: 24px; margin: 1.5rem 0;" markdown>
<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Example — Decimal Positional Expansion</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 10px 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

$$472_{10} = 4 \times 10^2 + 7 \times 10^1 + 2 \times 10^0 = 400 + 70 + 2$$

</div>
</div>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">The Binary Number System</h3>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1rem;">
The <strong style="color: #333;">binary number system</strong> (base 2) uses only two symbols: 0 and 1. This maps directly to the two voltage states in digital circuits, making binary the native language of computers. Each position represents a power of 2.
</p>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 10px; padding: 24px; margin: 1.5rem 0;" markdown>
<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Example — Binary to Decimal Conversion</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 10px 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

$$1011_2 = 1 \times 2^3 + 0 \times 2^2 + 1 \times 2^1 + 1 \times 2^0 = 8 + 0 + 2 + 1 = 11_{10}$$

</div>
</div>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">The Octal Number System</h3>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
The <strong style="color: #333;">octal number system</strong> (base 8) uses eight symbols: 0 through 7. Octal provides a convenient shorthand for binary because each octal digit corresponds exactly to three binary digits. While less common today than hexadecimal, octal appears in Unix file permissions and some assembly language contexts.
</p>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">The Hexadecimal Number System</h3>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
The <strong style="color: #333;">hexadecimal number system</strong> (base 16) uses sixteen symbols: 0-9 and A-F (where A=10, B=11, C=12, D=13, E=14, F=15). Each hexadecimal digit corresponds to exactly four binary digits, making it the preferred shorthand for binary data in modern computing. Memory addresses, color codes, and machine code are typically displayed in hexadecimal.
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

| Base | Name | Symbols | Binary Digits per Symbol |
|------|------|---------|-------------------------|
| 2 | Binary | 0, 1 | 1 |
| 8 | Octal | 0-7 | 3 |
| 10 | Decimal | 0-9 | — |
| 16 | Hexadecimal | 0-9, A-F | 4 |

</div>

#### Diagram: Positional Notation Interactive Explorer

<iframe src="../sims/positional-notation-explorer/main.html" width="100%" height="500px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>

<details markdown="1">
<summary>Positional Notation Interactive Explorer</summary>
Type: microsim

Purpose: Help students understand how positional notation works by showing the expanded form and place values for any number in any base

Bloom Level: Understand (L2)
Bloom Verb: Explain, interpret

Learning Objective: Students will be able to explain how positional notation represents numerical values and calculate the decimal equivalent of a number in any base.

Canvas Layout:
- Top section: Input area for number and base selection
- Middle section: Visual breakdown showing each digit with its position, power, and contribution
- Bottom section: Running calculation and final decimal result

Visual Elements:
- Input field for entering a number (up to 8 digits)
- Dropdown or radio buttons for base selection (2, 8, 10, 16)
- Grid showing each digit in a separate cell
- Below each digit: position index (0, 1, 2, ...)
- Below position: base raised to that power (e.g., 2³)
- Below power: actual value of that power (e.g., 8)
- Below value: digit × power contribution (e.g., 1 × 8 = 8)
- Sum line showing all contributions being added

Interactive Controls:
- Text input for the number
- Base selector (2, 8, 10, 16)
- "Step Through" button to reveal calculation one digit at a time
- "Show All" button to display complete expansion
- Reset button

Data Visibility Requirements:
Stage 1: Show the input number with positions labeled
Stage 2: Show the power of the base for each position
Stage 3: Show the numerical value of each power
Stage 4: Show digit × power for each position
Stage 5: Show sum of all contributions = final decimal value

Default Parameters:
- Initial number: 1011
- Initial base: 2

Behavior:
- Validate input (only allow valid digits for selected base)
- Hex input accepts both uppercase and lowercase A-F
- Animate transitions when stepping through calculation
- Highlight current position being calculated

Instructional Rationale: Step-through with worked examples is appropriate because the Understand/explain objective requires learners to trace the positional notation expansion with concrete values.

Implementation: p5.js with responsive canvas, DOM elements for input
</details>

---

<h2 id="13-binary-data-units" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">1.3 Binary Data Units</h2>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
Digital systems organize binary digits into standard groupings that facilitate data storage and manipulation. Understanding these units is essential for working with computer memory and data transfer.
</p>

<ul style="list-style: none; padding-left: 0.8rem; margin: 0.8rem 0 1.2rem 0;">
<li style="margin-bottom: 0.9rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <strong>Bit</strong> (binary digit) — the fundamental unit of digital information, representing a single 0 or 1. The term combines "binary" and "digit." While a single bit can only represent two states, combining multiple bits exponentially increases representational capacity.</li>
<li style="margin-bottom: 0.9rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <strong>Nibble</strong> — consists of 4 bits and can represent <span class="arithmatex">\(2^4 = 16\)</span> distinct values (0–15 in decimal, or 0–F in hexadecimal). Each hexadecimal digit corresponds to exactly one nibble, which is why hex is so useful for representing binary data.</li>
<li style="margin-bottom: 0.9rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <strong>Byte</strong> — comprises 8 bits (2 nibbles) and represents <span class="arithmatex">\(2^8 = 256\)</span> distinct values (0–255 unsigned). The byte is the standard addressable unit of memory in most computer architectures and commonly represents a single character in ASCII encoding.</li>
<li style="margin-bottom: 0.9rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <strong>Word</strong> — a processor-specific unit representing the natural data size for a particular architecture. Modern 64-bit processors use 64-bit (8-byte) words, while older 32-bit systems use 32-bit (4-byte) words. Word size affects memory addressing, register width, and arithmetic precision.</li>
</ul>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

| Unit | Bits | Values | Common Use |
|------|------|--------|------------|
| Bit | 1 | 2 | Single logic state |
| Nibble | 4 | 16 | One hex digit |
| Byte | 8 | 256 | Character, memory address unit |
| Word | 32/64 | 4B/16E | Processor native unit |

</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
Within any binary number, we identify positions by significance. The <strong style="color: #333;">Most Significant Bit (MSB)</strong> is the leftmost bit, contributing the largest value to the number. The <strong style="color: #333;">Least Significant Bit (LSB)</strong> is the rightmost bit, contributing the smallest value (either 0 or 1). In signed number representations, the MSB often indicates the sign.
</p>

<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(56,142,60,0.08);">
<p style="color: #2E7D32; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 10px;">Memory Size Prefixes</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">
In computing, size prefixes have two conventions: decimal (SI) where 1 KB = 1,000 bytes, and binary (IEC) where 1 KiB = 1,024 bytes. Hardware specifications typically use binary prefixes, while storage manufacturers often use decimal prefixes.
</p>
</div>

---

<h2 id="14-base-conversion-methods" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">1.4 Base Conversion Methods</h2>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.5rem;">
Converting between number systems is a fundamental skill in digital design. Different methods are optimal for different conversion types.
</p>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Decimal to Binary Conversion</h3>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1rem;">
The <strong style="color: #333;">repeated division method</strong> converts decimal integers to binary by repeatedly dividing by 2 and recording the remainders. The binary result is formed by reading the remainders from last to first.
</p>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 10px; padding: 24px; margin: 1.5rem 0;" markdown>
<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Example — Convert <span class="arithmatex">\(19_{10}\)</span> to Binary</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 10px 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

| Step | Quotient | ÷ 2 | Remainder |
|------|----------|-----|-----------|
| 1 | 19 | 9 | 1 (LSB) |
| 2 | 9 | 4 | 1 |
| 3 | 4 | 2 | 0 |
| 4 | 2 | 1 | 0 |
| 5 | 1 | 0 | 1 (MSB) |

</div>

<p style="color: #555; line-height: 1.75; margin-bottom: 0;">
Reading remainders bottom-to-top: <span class="arithmatex">\(19_{10} = 10011_2\)</span>
</p>
</div>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Binary to Decimal Conversion</h3>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1rem;">
To convert binary to decimal, multiply each bit by its positional power of 2 and sum the results.
</p>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 10px; padding: 24px; margin: 1.5rem 0;" markdown>
<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Example — Convert <span class="arithmatex">\(10011_2\)</span> to Decimal</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 10px 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

$$\begin{aligned}
10011_2 &= 1 \times 2^4 + 0 \times 2^3 + 0 \times 2^2 + 1 \times 2^1 + 1 \times 2^0 \\
&= 16 + 0 + 0 + 2 + 1 = 19_{10}
\end{aligned}$$

</div>
</div>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Hexadecimal Conversions</h3>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1rem;">
<strong style="color: #333;">Decimal to hexadecimal</strong> uses repeated division by 16. <strong style="color: #333;">Hexadecimal to decimal</strong> uses positional notation with powers of 16.
</p>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 10px; padding: 24px; margin: 1.5rem 0;" markdown>
<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Example — Convert <span class="arithmatex">\(255_{10}\)</span> to Hexadecimal</p>

<ul style="list-style: none; padding-left: 0.8rem; margin: 0.5rem 0;">
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <span class="arithmatex">\(255 \div 16 = 15\)</span> remainder <span class="arithmatex">\(15\)</span> (F)</li>
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <span class="arithmatex">\(15 \div 16 = 0\)</span> remainder <span class="arithmatex">\(15\)</span> (F)</li>
</ul>

<p style="color: #555; line-height: 1.75; margin-bottom: 0;">
Result: <span class="arithmatex">\(255_{10} = \text{FF}_{16}\)</span>
</p>
</div>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Octal Conversions</h3>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
<strong style="color: #333;">Decimal to octal</strong> uses repeated division by 8. <strong style="color: #333;">Octal to decimal</strong> uses positional notation with powers of 8.
</p>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Binary-Octal-Hexadecimal Shortcuts</h3>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1rem;">
Because 8 = 2³ and 16 = 2⁴, direct conversions between binary and octal/hexadecimal are straightforward:
</p>

<ul style="list-style: none; padding-left: 0.8rem; margin: 0.8rem 0 1.2rem 0;">
<li style="margin-bottom: 0.9rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <strong>Binary ↔ Octal:</strong> Group binary digits in sets of 3 (from the radix point outward), converting each group to its octal equivalent</li>
<li style="margin-bottom: 0.9rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <strong>Binary ↔ Hexadecimal:</strong> Group binary digits in sets of 4, converting each group to its hex equivalent</li>
</ul>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 10px; padding: 24px; margin: 1.5rem 0;" markdown>
<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Example — Convert <span class="arithmatex">\(10111010_2\)</span> to Hexadecimal</p>

<p style="color: #555; line-height: 1.75;">
Group in fours: <span class="arithmatex">\(1011 \ 1010\)</span><br>
Convert each group: <span class="arithmatex">\(\text{B} \ \text{A}\)</span><br>
Result: <span class="arithmatex">\(10111010_2 = \text{BA}_{16}\)</span>
</p>
</div>

#### Diagram: Base Conversion Calculator

<iframe src="../sims/base-converter/main.html" width="100%" height="450px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>

<details markdown="1">
<summary>Base Conversion Calculator</summary>
Type: microsim

Purpose: Interactive tool for practicing and verifying base conversions between decimal, binary, octal, and hexadecimal

Bloom Level: Apply (L3)
Bloom Verb: Calculate, use, execute

Learning Objective: Students will be able to convert numbers between decimal, binary, octal, and hexadecimal systems using appropriate methods.

Canvas Layout:
- Top: Four input/output fields arranged horizontally (Decimal, Binary, Octal, Hex)
- Middle: Visual representation of the conversion process
- Bottom: Step-by-step explanation panel

Visual Elements:
- Four labeled input fields with base indicators
- Bidirectional arrows between fields showing conversion relationships
- Conversion method display showing intermediate steps
- Binary grouping visualization (nibbles highlighted for hex, triplets for octal)
- Color-coded digit groups matching between representations

Interactive Controls:
- Enter a number in any field to see conversions in all other fields
- Toggle "Show Steps" to reveal detailed conversion method
- Toggle "Show Groupings" to highlight binary digit groupings
- Dropdown to select which conversion method to display in detail
- Clear/Reset button

Data Visibility Requirements:
- Show the entered value in the source base
- Display conversion steps appropriate to the method (division remainders, positional expansion, or grouping)
- Show the final result in all four bases simultaneously
- Highlight digit correspondences between bases

Default Parameters:
- Initial value: empty (awaiting user input)
- Show Steps: enabled
- Show Groupings: enabled for binary field

Behavior:
- Real-time conversion as user types
- Input validation (reject invalid digits for selected base)
- Highlight active input field
- Animate step-by-step calculation when requested
- Support fractional numbers (with radix point)
- Handle numbers up to 32 bits

Instructional Rationale: This Apply-level MicroSim provides immediate feedback on conversion attempts, allowing students to practice the procedural skill and verify their manual calculations.

Implementation: p5.js with responsive canvas, DOM input elements
</details>

---

<h2 id="15-binary-arithmetic-operations" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">1.5 Binary Arithmetic Operations</h2>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.5rem;">
Digital computers perform all arithmetic in binary. Understanding binary arithmetic operations is essential for comprehending how processors execute calculations.
</p>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Binary Addition</h3>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1rem;">
<strong style="color: #333;">Binary addition</strong> follows the same principles as decimal addition but with only two digits. The addition rules are:
</p>

<ul style="list-style: none; padding-left: 0.8rem; margin: 0.8rem 0 1.2rem 0;">
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <span class="arithmatex">\(0 + 0 = 0\)</span></li>
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <span class="arithmatex">\(0 + 1 = 1\)</span></li>
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <span class="arithmatex">\(1 + 0 = 1\)</span></li>
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <span class="arithmatex">\(1 + 1 = 10\)</span> (0 with carry 1)</li>
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <span class="arithmatex">\(1 + 1 + 1 = 11\)</span> (1 with carry 1)</li>
</ul>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 10px; padding: 24px; margin: 1.5rem 0;" markdown>
<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Example — Add <span class="arithmatex">\(1011_2 + 1101_2\)</span></p>

```
    1 1 1 1    (carries)
      1 0 1 1
    + 1 1 0 1
    ---------
    1 1 0 0 0
```

<p style="color: #555; line-height: 1.75; margin-bottom: 0;">
Result: <span class="arithmatex">\(1011_2 + 1101_2 = 11000_2\)</span> (11 + 13 = 24 in decimal)
</p>
</div>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Binary Subtraction</h3>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1rem;">
<strong style="color: #333;">Binary subtraction</strong> can be performed directly using the rules:
</p>

<ul style="list-style: none; padding-left: 0.8rem; margin: 0.8rem 0 1.2rem 0;">
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <span class="arithmatex">\(0 - 0 = 0\)</span></li>
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <span class="arithmatex">\(1 - 0 = 1\)</span></li>
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <span class="arithmatex">\(1 - 1 = 0\)</span></li>
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <span class="arithmatex">\(0 - 1 = 1\)</span> with borrow</li>
</ul>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 10px; padding: 24px; margin: 1.5rem 0;" markdown>
<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Example — Subtract <span class="arithmatex">\(1101_2 - 1001_2\)</span></p>

```
      1 1 0 1
    - 1 0 0 1
    ---------
      0 1 0 0
```

<p style="color: #555; line-height: 1.75; margin-bottom: 0;">
Result: <span class="arithmatex">\(1101_2 - 1001_2 = 0100_2\)</span> (13 - 9 = 4 in decimal)
</p>
</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.5rem;">
In practice, digital systems typically perform subtraction using two's complement addition, eliminating the need for separate subtraction hardware.
</p>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Binary Multiplication</h3>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1rem;">
<strong style="color: #333;">Binary multiplication</strong> is simpler than decimal multiplication because each partial product is either 0 (multiplied by 0) or the multiplicand itself (multiplied by 1), shifted appropriately.
</p>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 10px; padding: 24px; margin: 1.5rem 0;" markdown>
<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Example — Multiply <span class="arithmatex">\(101_2 \times 11_2\)</span></p>

```
        1 0 1
      ×   1 1
      -------
        1 0 1    (101 × 1)
      1 0 1      (101 × 1, shifted left)
      -------
      1 1 1 1
```

<p style="color: #555; line-height: 1.75; margin-bottom: 0;">
Result: <span class="arithmatex">\(101_2 \times 11_2 = 1111_2\)</span> (5 × 3 = 15 in decimal)
</p>
</div>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Binary Division</h3>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1rem;">
<strong style="color: #333;">Binary division</strong> uses the same long division algorithm as decimal division, but comparisons and subtractions are simpler with only 0 and 1 as possible quotient digits.
</p>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 10px; padding: 24px; margin: 1.5rem 0;" markdown>
<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Example — Binary Division</p>

```
          1 1 1 1 1 0
        -------------
  1 0 ) 1 1 1 1 1 0 0
        1 0
        ---
          1
            ↓
          1 1
          1 0
          ---
            1
              ↓
            1 1
            1 0
            ---
              1
                ↓
              1 1
              1 0
              ---
                1
                  ↓
                1 0
                1 0
                ---
                  0
                    ↓
                  0 0
                    0     ← remainder
```

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 10px 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

| | Binary | Decimal |
|---|---|---|
| **Dividend** | $1111100_2$ | 124 |
| **Divisor** | $10_2$ | 2 |
| **Quotient** | $111110_2$ | 62 |
| **Remainder** | 0 | 0 |

</div>
</div>

#### Diagram: Binary Arithmetic Practice

<iframe src="../sims/binary-arithmetic-practice/main.html" width="100%" height="500px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>

<details markdown="1">
<summary>Binary Arithmetic Practice</summary>
Type: microsim

Purpose: Interactive practice environment for binary arithmetic operations with step-by-step visualization

Bloom Level: Apply (L3)
Bloom Verb: Execute, calculate, practice

Learning Objective: Students will be able to perform binary addition, subtraction, multiplication, and division correctly, including tracking carries and borrows.

Canvas Layout:
- Top: Operation selector and operand inputs
- Middle: Working area showing the calculation in progress
- Right: Step-by-step explanation panel
- Bottom: Result display and verification

Visual Elements:
- Two binary number input fields (8 bits each)
- Operation selector (Add, Subtract, Multiply, Divide)
- Traditional vertical arrangement of operands
- Carry/borrow row displayed above addition/subtraction
- Partial products displayed for multiplication
- Color coding: carries in red, borrows in blue, result in green
- Decimal equivalents shown alongside binary for verification

Interactive Controls:
- Input operands manually or use "Random" button
- "Next Step" button to advance calculation one step at a time
- "Complete" button to show final result
- "Check Answer" for practice mode where student enters the result
- Difficulty selector (4-bit, 6-bit, 8-bit operands)

Data Visibility Requirements:
Stage 1: Show both operands aligned vertically
Stage 2: For each column (right to left), show the calculation and any carry/borrow
Stage 3: Show cumulative result building up
Stage 4: Show final result with decimal verification

Default Parameters:
- Operand A: 1011 (11)
- Operand B: 0101 (5)
- Operation: Addition
- Bit width: 8

Behavior:
- Validate binary input (only 0 and 1 allowed)
- Highlight current column being processed
- Animate carry/borrow propagation
- Show overflow indication when result exceeds bit width
- Practice mode generates random problems

Instructional Rationale: Step-by-step execution with concrete binary values helps students internalize the algorithmic process of binary arithmetic operations.

Implementation: p5.js with responsive canvas
</details>

---

<h2 id="16-signed-number-representations" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">1.6 Signed Number Representations</h2>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
Digital systems must represent both positive and negative numbers. Several encoding schemes exist, each with distinct characteristics. The three primary methods are <strong style="color: #333;">sign-magnitude</strong>, <strong style="color: #333;">one's complement</strong>, and <strong style="color: #333;">two's complement</strong>.
</p>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Unsigned Numbers</h3>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1rem;">
<strong style="color: #333;">Unsigned numbers</strong> represent only non-negative values. For an n-bit unsigned number, the range is <span class="arithmatex">\(0\)</span> to <span class="arithmatex">\(2^n - 1\)</span>. All bits contribute to the magnitude.
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

| Bits | Unsigned Range | Values |
|------|----------------|--------|
| 4 | 0 to 15 | 16 |
| 8 | 0 to 255 | 256 |
| 16 | 0 to 65,535 | 65,536 |
| 32 | 0 to 4,294,967,295 | 4.29B |

</div>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Sign-Magnitude Representation</h3>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1rem;">
In <strong style="color: #333;">sign-magnitude</strong> representation, the MSB indicates the sign (0 = positive, 1 = negative), and the remaining bits represent the magnitude. This mirrors how humans write signed numbers.
</p>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 10px; padding: 24px; margin: 1.5rem 0;" markdown>
<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Example — 4-bit Sign-Magnitude</p>

<ul style="list-style: none; padding-left: 0.8rem; margin: 0.5rem 0;">
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <span class="arithmatex">\(+5 = 0101\)</span></li>
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <span class="arithmatex">\(-5 = 1101\)</span></li>
</ul>
</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.5rem;">
Sign-magnitude has two representations of zero (<span class="arithmatex">\(+0 = 0000\)</span>, <span class="arithmatex">\(-0 = 1000\)</span>), which complicates hardware design. Addition and subtraction require separate logic, making this representation inefficient for arithmetic circuits.
</p>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">One's Complement Representation</h3>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1rem;">
<strong style="color: #333;">One's complement</strong> represents negative numbers by inverting all bits of the positive equivalent. The MSB still indicates sign.
</p>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 10px; padding: 24px; margin: 1.5rem 0;" markdown>
<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Example — 4-bit One's Complement</p>

<ul style="list-style: none; padding-left: 0.8rem; margin: 0.5rem 0;">
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <span class="arithmatex">\(+5 = 0101\)</span></li>
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <span class="arithmatex">\(-5 = 1010\)</span> (invert all bits of 0101)</li>
</ul>
</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.5rem;">
One's complement also has two zeros (<span class="arithmatex">\(+0 = 0000\)</span>, <span class="arithmatex">\(-0 = 1111\)</span>) and requires end-around carry for correct addition results.
</p>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Two's Complement Representation</h3>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1rem;">
<strong style="color: #333;">Two's complement</strong> is the dominant representation in modern digital systems. To find the two's complement of a number, invert all bits and add 1. Alternatively, find the one's complement and add 1.
</p>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 10px; padding: 24px; margin: 1.5rem 0;" markdown>
<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Example — 4-bit Two's Complement</p>

<ul style="list-style: none; padding-left: 0.8rem; margin: 0.5rem 0;">
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <span class="arithmatex">\(+5 = 0101\)</span></li>
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <span class="arithmatex">\(-5\)</span>: Invert <span class="arithmatex">\(0101 \rightarrow 1010\)</span>, add 1 <span class="arithmatex">\(\rightarrow 1011\)</span></li>
</ul>
</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1rem;">
Two's complement has a single representation of zero and allows addition and subtraction to use the same hardware. The range for n-bit two's complement is <span class="arithmatex">\(-2^{n-1}\)</span> to <span class="arithmatex">\(2^{n-1} - 1\)</span>.
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

| Bits | Two's Complement Range |
|------|----------------------|
| 4 | -8 to +7 |
| 8 | -128 to +127 |
| 16 | -32,768 to +32,767 |
| 32 | -2,147,483,648 to +2,147,483,647 |

</div>

#### Diagram: Signed Number Representation Comparison

<iframe src="../sims/signed-number-comparison/main.html" width="100%" height="550px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>

<details markdown="1">
<summary>Signed Number Representation Comparison</summary>
Type: microsim

Purpose: Visualize and compare how the same decimal value is represented in sign-magnitude, one's complement, and two's complement formats

Bloom Level: Analyze (L4)
Bloom Verb: Compare, differentiate, contrast

Learning Objective: Students will be able to differentiate between sign-magnitude, one's complement, and two's complement representations and explain why two's complement is preferred for arithmetic operations.

Canvas Layout:
- Top: Decimal input slider (-8 to +7 for 4-bit, expandable)
- Middle: Three parallel representations showing the binary encoding
- Bottom: Number line visualization showing all values and their encodings

Visual Elements:
- Decimal value display with +/- indicator
- Three rows showing the same value in each representation:
  - Sign-Magnitude: sign bit colored differently, magnitude bits highlighted
  - One's Complement: show inversion from positive form
  - Two's Complement: show inversion + 1 process
- Bit width selector (4, 8 bits)
- Number line at bottom showing all possible values
- Highlight the "two zeros" issue in sign-magnitude and one's complement
- Show the asymmetric range of two's complement

Interactive Controls:
- Slider or input for decimal value
- Bit width selector (4 or 8 bits)
- "Animate Conversion" to show step-by-step two's complement derivation
- Toggle to highlight which values have multiple representations

Data Visibility Requirements:
Stage 1: Display the positive binary representation
Stage 2: For negative numbers, show the inversion step
Stage 3: For two's complement, show the +1 step
Stage 4: Display final representation in all three formats

Default Parameters:
- Decimal value: 5
- Bit width: 4

Behavior:
- Update all representations instantly as slider moves
- Highlight sign bit in red for negative numbers
- Show animation of bit inversion for negative conversions
- Display range limits and indicate when value is out of range
- Highlight zero representations (showing two zeros for sign-mag and one's comp)

Instructional Rationale: Side-by-side comparison enables students to analyze the structural differences between representations and understand the advantages of two's complement.

Implementation: p5.js with responsive canvas
</details>

---

<h2 id="17-twos-complement-arithmetic" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">1.7 Two's Complement Arithmetic</h2>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.5rem;">
Two's complement enables addition and subtraction using identical hardware, which is why it dominates in processor design.
</p>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Two's Complement Addition</h3>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1rem;">
<strong style="color: #333;">Two's complement addition</strong> works identically to unsigned binary addition. The key insight is that the representation automatically handles signed arithmetic — simply add the bit patterns and discard any carry out of the MSB.
</p>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 10px; padding: 24px; margin: 1.5rem 0;" markdown>
<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Example — Add <span class="arithmatex">\(5 + (-3)\)</span> in 4-bit Two's Complement</p>

<ul style="list-style: none; padding-left: 0.8rem; margin: 0.5rem 0 0.8rem 0;">
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <span class="arithmatex">\(+5 = 0101\)</span></li>
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <span class="arithmatex">\(-3 = 1101\)</span> (two's complement of 3)</li>
</ul>

```
    1 1 1      (carries)
      0 1 0 1
    + 1 1 0 1
    ---------
    1 0 0 1 0
```

<p style="color: #555; line-height: 1.75; margin-bottom: 0;">
Discard the carry: Result = <span class="arithmatex">\(0010 = +2\)</span> ✓
</p>
</div>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Two's Complement Subtraction</h3>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 0.8rem;">
<strong style="color: #333;">Two's complement subtraction</strong> is performed by adding the two's complement of the subtrahend:
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.2rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

$$A - B = A + (-B) = A + \overline{B} + 1$$

</div>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 10px; padding: 24px; margin: 1.5rem 0;" markdown>
<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Example — Calculate <span class="arithmatex">\(3 - 5\)</span> in 4-bit Two's Complement</p>

<ul style="list-style: none; padding-left: 0.8rem; margin: 0.5rem 0;">
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <span class="arithmatex">\(+3 = 0011\)</span></li>
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <span class="arithmatex">\(+5 = 0101\)</span>, so <span class="arithmatex">\(-5 = 1011\)</span></li>
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <span class="arithmatex">\(3 + (-5) = 0011 + 1011 = 1110 = -2\)</span> ✓</li>
</ul>
</div>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Sign Extension</h3>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1rem;">
When operations require operands of different bit widths, <strong style="color: #333;">sign extension</strong> preserves the numerical value by replicating the sign bit. For positive numbers (MSB = 0), extend with 0s; for negative numbers (MSB = 1), extend with 1s.
</p>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 10px; padding: 24px; margin: 1.5rem 0;" markdown>
<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Example — Extend 4-bit <span class="arithmatex">\(1101\)</span> (-3) to 8 bits</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 10px 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

$$1101 \rightarrow 11111101$$

</div>

<p style="color: #555; line-height: 1.75; margin-bottom: 0;">
Both represent <span class="arithmatex">\(-3\)</span> in two's complement.
</p>
</div>

---

<h2 id="18-overflow-and-underflow-detection" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">1.8 Overflow and Underflow Detection</h2>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
Arithmetic operations can produce results that exceed the representable range. <strong style="color: #333;">Overflow</strong> occurs when the result is too large (positive) for the bit width; <strong style="color: #333;">underflow</strong> occurs when the result is too small (negative).
</p>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Detecting Overflow in Two's Complement</h3>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1rem;">
Overflow occurs when:
</p>

<ul style="list-style: none; padding-left: 0.8rem; margin: 0.8rem 0 1.2rem 0;">
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> Adding two positive numbers yields a negative result</li>
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> Adding two negative numbers yields a positive result</li>
</ul>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 0.8rem;">
Mathematically, overflow is detected when the carry into the MSB differs from the carry out of the MSB:
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px 28px; margin: 1rem 0 1.5rem 0; text-align: center; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

$$\text{Overflow} = C_{in,MSB} \oplus C_{out,MSB}$$

</div>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 10px; padding: 24px; margin: 1.5rem 0;" markdown>
<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Example — Add <span class="arithmatex">\(+7 + (+3)\)</span> in 4-bit Two's Complement</p>

<ul style="list-style: none; padding-left: 0.8rem; margin: 0.5rem 0 0.8rem 0;">
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <span class="arithmatex">\(+7 = 0111\)</span></li>
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <span class="arithmatex">\(+3 = 0011\)</span></li>
</ul>

```
    0 1 1 1    (carries: Cin to MSB = 1)
      0 1 1 1
    + 0 0 1 1
    ---------
      1 0 1 0  (Cout from MSB = 0)
```

<p style="color: #555; line-height: 1.75;">
Result: <span class="arithmatex">\(1010 = -6\)</span> (incorrect!)<br>
Overflow detected: <span class="arithmatex">\(C_{in} = 1\)</span>, <span class="arithmatex">\(C_{out} = 0\)</span>, so <span class="arithmatex">\(1 \oplus 0 = 1\)</span> (overflow)
</p>
<p style="color: #555; line-height: 1.75; margin-bottom: 0;">
The correct result (+10) cannot be represented in 4 bits, which can only hold -8 to +7.
</p>
</div>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Range of Signed Numbers</h3>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1rem;">
For an n-bit two's complement number:
</p>

<ul style="list-style: none; padding-left: 0.8rem; margin: 0.8rem 0 1.2rem 0;">
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <strong>Minimum value:</strong> <span class="arithmatex">\(-2^{n-1}\)</span> (e.g., <span class="arithmatex">\(-8\)</span> for 4 bits: <span class="arithmatex">\(1000\)</span>)</li>
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <strong>Maximum value:</strong> <span class="arithmatex">\(2^{n-1} - 1\)</span> (e.g., <span class="arithmatex">\(+7\)</span> for 4 bits: <span class="arithmatex">\(0111\)</span>)</li>
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <strong>Total values:</strong> <span class="arithmatex">\(2^n\)</span></li>
</ul>

<div style="background: #FFF3E0; border: 2px solid #FFB74D; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(230,126,34,0.08);">
<p style="color: #E65100; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 10px;">Overflow Detection is Critical</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">
Undetected overflow can cause catastrophic failures in safety-critical systems. The 1996 Ariane 5 rocket explosion was caused by a 64-bit to 16-bit conversion overflow in the guidance system.
</p>
</div>

#### Diagram: Overflow Detection Simulator

<iframe src="../sims/overflow-detection-simulator/main.html" width="100%" height="660px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>

<details markdown="1">
<summary>Overflow Detection Simulator</summary>
Type: microsim

Purpose: Demonstrate overflow and underflow conditions in two's complement arithmetic with visual carry tracking

Bloom Level: Analyze (L4)
Bloom Verb: Examine, distinguish, detect

Learning Objective: Students will be able to detect overflow conditions in two's complement addition by examining the carry bits and explain why overflow occurs.

Canvas Layout:
- Top: Two operand inputs with decimal values
- Middle: Binary addition visualization with carry chain
- Bottom: Result analysis showing overflow detection logic

Visual Elements:
- Two operand displays (decimal and binary)
- Vertical addition layout with carry row clearly visible
- Carry-in to MSB highlighted in yellow
- Carry-out from MSB highlighted in orange
- XOR gate symbol showing overflow detection
- Result display with overflow/underflow indicator
- Number line showing the "wrapping" when overflow occurs
- Valid range indicator for the bit width

Interactive Controls:
- Two decimal input fields (or sliders) for operands
- Bit width selector (4, 8 bits)
- "Add" button to perform calculation
- "Find Overflow Example" button to automatically set operands that cause overflow
- Step-through mode to trace the addition column by column

Data Visibility Requirements:
Stage 1: Show both operands in binary with sign indicated
Stage 2: Show column-by-column addition with carries
Stage 3: Highlight the carry into MSB (Cin) and carry out of MSB (Cout)
Stage 4: Show XOR comparison: if Cin ≠ Cout, overflow occurred
Stage 5: Display correct mathematical result vs. the (incorrect) computed result

Default Parameters:
- Operand A: 7
- Operand B: 3
- Bit width: 4 (demonstrating overflow)

Behavior:
- Real-time update as operands change
- Visual alarm (red border, warning icon) when overflow detected
- Show the "wrapped" result and the expected result
- Animate the carry propagation
- Provide explanation text based on the specific overflow case

Instructional Rationale: Visualizing the carry chain and XOR detection helps students understand the mechanism behind overflow detection, not just the rule.

Implementation: p5.js with responsive canvas
</details>

---

<h2 id="19-practical-applications" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">1.9 Practical Applications</h2>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1rem;">
Number systems and binary arithmetic form the foundation for all digital hardware. Understanding these concepts is essential for:
</p>

<ul style="list-style: none; padding-left: 0.8rem; margin: 0.8rem 0 1.5rem 0;">
<li style="margin-bottom: 0.9rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <strong>Memory addressing:</strong> Addresses are binary numbers, typically displayed in hexadecimal</li>
<li style="margin-bottom: 0.9rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <strong>Processor arithmetic:</strong> ALUs implement binary addition with overflow detection</li>
<li style="margin-bottom: 0.9rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <strong>Color encoding:</strong> RGB colors use 8-bit unsigned values (0-255) per channel</li>
<li style="margin-bottom: 0.9rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <strong>Network protocols:</strong> IP addresses, MAC addresses, and packet headers use binary/hex</li>
<li style="margin-bottom: 0.9rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> <strong>Embedded systems:</strong> Sensor data, actuator control, and register manipulation require binary operations</li>
</ul>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Common Pitfalls</h3>

<ul style="list-style: none; padding-left: 0.8rem; margin: 0.8rem 0 1.2rem 0;">
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> Forgetting to include carry bits in multi-byte arithmetic</li>
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> Mixing signed and unsigned interpretations of the same bit pattern</li>
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> Sign extension errors when widening values</li>
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> Overflow in intermediate calculations even when final result would fit</li>
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.5rem;">&#9679;</span> Off-by-one errors in range calculations</li>
</ul>

#### Diagram: Number Systems Concept Map

<iframe src="../sims/number-systems-concept-map/main.html" width="100%" height="670px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>

<details markdown="1">
<summary>Number Systems Concept Map</summary>
Type: infographic

Purpose: Provide a visual overview of all concepts in Unit 1 and their relationships

Bloom Level: Understand (L2)
Bloom Verb: Summarize, organize, classify

Learning Objective: Students will be able to explain the relationships between number system concepts and identify the foundational dependencies between topics.

Visual Elements:
- Central node: "Number Systems"
- Four main branches:
  1. Number Bases (Decimal, Binary, Octal, Hex)
  2. Data Units (Bit, Nibble, Byte, Word, MSB/LSB)
  3. Conversions (with sub-nodes for each conversion type)
  4. Signed Representations (Sign-Mag, 1's Comp, 2's Comp)
  5. Arithmetic (Addition, Subtraction, Multiplication, Division, Overflow)
- Connection lines showing prerequisites/dependencies
- Color coding by topic area
- Icons representing each major concept

Interactive Elements:
- Hover over any node to highlight its connections
- Click a node to expand its definition (tooltip from glossary)
- Zoom and pan for exploring the full map
- Filter by topic area
- Progress indicators showing which concepts have been mastered

Layout:
- Force-directed graph with hierarchical tendencies
- More fundamental concepts positioned left/top
- More advanced concepts positioned right/bottom
- Related concepts clustered together

Color Scheme:
- Blue: Number bases and positional notation
- Green: Data units and binary organization
- Orange: Conversion methods
- Purple: Signed number representations
- Red: Arithmetic operations and overflow

Implementation: vis-network JavaScript library with responsive container
</details>

---

<h2 id="summary-and-key-takeaways" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">Summary and Key Takeaways</h2>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
This unit established the mathematical foundation for digital system design through the following key concepts:
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<ul style="list-style: none; padding-left: 0; margin: 0;">
<li style="margin-bottom: 1.1rem; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> <strong>Digital systems</strong> use discrete binary signals (0 and 1) rather than continuous analog values, providing noise immunity and reliable computation.</li>
<li style="margin-bottom: 1.1rem; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> <strong>Positional notation</strong> is the basis for all number systems used in computing. The value of each digit depends on its position and the base of the system.</li>
<li style="margin-bottom: 1.1rem; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> <strong>Four number systems</strong> are commonly used: decimal (base 10) for human readability, binary (base 2) for hardware implementation, octal (base 8) and hexadecimal (base 16) as compact binary representations.</li>
<li style="margin-bottom: 1.1rem; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> <strong>Binary data units</strong> include bits (1), nibbles (4), bytes (8), and words (32/64), with MSB and LSB identifying the most and least significant positions.</li>
<li style="margin-bottom: 1.1rem; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> <strong>Base conversions</strong> use repeated division (decimal to other bases), positional expansion (other bases to decimal), or direct grouping (binary ↔ octal/hex).</li>
<li style="margin-bottom: 1.1rem; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> <strong>Binary arithmetic</strong> follows the same algorithms as decimal but with only two digits. Carries and borrows propagate similarly to decimal.</li>
<li style="margin-bottom: 1.1rem; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> <strong>Signed number representations</strong> include sign-magnitude, one's complement, and two's complement. Two's complement dominates because it has a unique zero and allows addition/subtraction with the same hardware.</li>
<li style="margin-bottom: 0; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> <strong>Overflow detection</strong> is critical for correct arithmetic. In two's complement, overflow occurs when the carry into the MSB differs from the carry out of the MSB.</li>
</ul>

</div>

<h3 style="color: #5A3EED !important; font-weight: 600; margin-top: 1.8rem; margin-bottom: 20px;">Self-Check Questions</h3>

<div style="background: #F8F6FF; border: 2px solid #D0C4FF; border-radius: 12px; padding: 24px 28px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<details style="margin-bottom: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer; font-size: 1.02rem;">What is the range of an 8-bit two's complement number?</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 14px 18px; margin-top: 10px;">
<p style="color: #333; line-height: 1.75; margin: 0;">
The range is <span class="arithmatex">\(-128\)</span> to <span class="arithmatex">\(+127\)</span> (i.e., <span class="arithmatex">\(-2^7\)</span> to <span class="arithmatex">\(2^7 - 1\)</span>).
</p>
</div>
</details>

<details style="margin-bottom: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer; font-size: 1.02rem;">Why is two's complement preferred over sign-magnitude?</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 14px 18px; margin-top: 10px;">
<p style="color: #333; line-height: 1.75; margin: 0;">
Two's complement has a single representation of zero and allows addition and subtraction to use identical hardware, simplifying processor design.
</p>
</div>
</details>

<details style="margin-bottom: 0;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer; font-size: 1.02rem;">Convert <span class="arithmatex">\(\text{A3}_{16}\)</span> to binary.</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 14px 18px; margin-top: 10px;">
<p style="color: #333; line-height: 1.75; margin: 0;">
<span class="arithmatex">\(\text{A} = 1010\)</span>, <span class="arithmatex">\(3 = 0011\)</span>, so <span class="arithmatex">\(\text{A3}_{16} = 10100011_2\)</span>.
</p>
</div>
</details>

</div>

---

## Interactive Walkthrough

Step through a complete base conversion problem with animated visuals:

<iframe src="../sims/base-conversion-walkthrough/main.html" width="100%" height="680px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>

---

[See Annotated References](./references.md)

</div>
