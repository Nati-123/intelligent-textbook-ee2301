---
title: Unit 1 — Number Systems
description: Foundation of digital system design covering number representations, base conversions, binary arithmetic, and signed number systems
generated_by: claude skill chapter-content-generator
date: 2026-02-04 17:05:00
version: 0.03
---

# Unit 1 — Number Systems

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

## 1.1 Introduction to Digital Systems

Modern computing relies entirely on **digital systems**—electronic circuits that process information using discrete signal levels rather than continuous values. Unlike **analog signals**, which can take any value within a continuous range (like the smooth variation of audio from a microphone), **digital signals** represent information using only two distinct states: typically high voltage (logic 1) and low voltage (logic 0).

This binary representation offers significant advantages for electronic systems. Digital circuits exhibit superior noise immunity because small variations in voltage do not change the logical interpretation of a signal. Additionally, digital information can be stored, copied, and transmitted without degradation, enabling the complex computations that power everything from smartphones to supercomputers.

| Signal Type | Values | Example | Noise Immunity |
|-------------|--------|---------|----------------|
| Analog | Continuous | Audio waveform | Low |
| Digital | Discrete (0, 1) | Binary data | High |

The foundation of all digital systems is the **binary number system**, which uses only two symbols (0 and 1) to represent numerical values. Understanding how numbers are encoded in binary—and how to convert between binary and other number systems—is essential for digital system design.

#### Diagram: Analog vs Digital Signal Comparison

<iframe src="../sims/analog-vs-digital-signals/main.html" width="100%" height="450px" scrolling="no"></iframe>

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

## 1.2 Positional Number Systems

All the number systems used in digital design—decimal, binary, octal, and hexadecimal—are **positional number systems**. In positional notation, the value of each digit depends on both the digit itself and its position within the number. The **base** (also called **radix**) determines how many unique symbols the system uses and the multiplier for each position.

The general formula for positional notation is:

$$N = \sum_{i=-m}^{n-1} d_i \times \text{base}^i$$

where $d_i$ represents the digit at position $i$, $n$ is the number of integer digits, and $m$ is the number of fractional digits. The **radix point** (decimal point in base 10, binary point in base 2) separates integer positions from fractional positions.

### The Decimal Number System

The **decimal number system** (base 10) uses ten symbols: 0, 1, 2, 3, 4, 5, 6, 7, 8, and 9. Each position represents a power of 10, with the rightmost integer position being $10^0 = 1$.

**Example:** The decimal number 472 expands as:

$$472_{10} = 4 \times 10^2 + 7 \times 10^1 + 2 \times 10^0 = 400 + 70 + 2$$

### The Binary Number System

The **binary number system** (base 2) uses only two symbols: 0 and 1. This maps directly to the two voltage states in digital circuits, making binary the native language of computers. Each position represents a power of 2.

**Example:** The binary number $1011_2$ converts to decimal as:

$$1011_2 = 1 \times 2^3 + 0 \times 2^2 + 1 \times 2^1 + 1 \times 2^0 = 8 + 0 + 2 + 1 = 11_{10}$$

### The Octal Number System

The **octal number system** (base 8) uses eight symbols: 0 through 7. Octal provides a convenient shorthand for binary because each octal digit corresponds exactly to three binary digits. While less common today than hexadecimal, octal appears in Unix file permissions and some assembly language contexts.

### The Hexadecimal Number System

The **hexadecimal number system** (base 16) uses sixteen symbols: 0-9 and A-F (where A=10, B=11, C=12, D=13, E=14, F=15). Each hexadecimal digit corresponds to exactly four binary digits, making it the preferred shorthand for binary data in modern computing. Memory addresses, color codes, and machine code are typically displayed in hexadecimal.

| Base | Name | Symbols | Binary Digits per Symbol |
|------|------|---------|-------------------------|
| 2 | Binary | 0, 1 | 1 |
| 8 | Octal | 0-7 | 3 |
| 10 | Decimal | 0-9 | — |
| 16 | Hexadecimal | 0-9, A-F | 4 |

#### Diagram: Positional Notation Interactive Explorer

<iframe src="../sims/positional-notation-explorer/main.html" width="100%" height="500px" scrolling="no"></iframe>

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

## 1.3 Binary Data Units

Digital systems organize binary digits into standard groupings that facilitate data storage and manipulation. Understanding these units is essential for working with computer memory and data transfer.

A **bit** (binary digit) is the fundamental unit of digital information, representing a single 0 or 1. The term combines "binary" and "digit." While a single bit can only represent two states, combining multiple bits exponentially increases representational capacity.

A **nibble** consists of 4 bits and can represent $2^4 = 16$ distinct values (0-15 in decimal, or 0-F in hexadecimal). Each hexadecimal digit corresponds to exactly one nibble, which is why hex is so useful for representing binary data.

A **byte** comprises 8 bits (2 nibbles) and represents $2^8 = 256$ distinct values (0-255 unsigned). The byte is the standard addressable unit of memory in most computer architectures and commonly represents a single character in ASCII encoding.

A **word** is a processor-specific unit representing the natural data size for a particular architecture. Modern 64-bit processors use 64-bit (8-byte) words, while older 32-bit systems use 32-bit (4-byte) words. Word size affects memory addressing, register width, and arithmetic precision.

| Unit | Bits | Values | Common Use |
|------|------|--------|------------|
| Bit | 1 | 2 | Single logic state |
| Nibble | 4 | 16 | One hex digit |
| Byte | 8 | 256 | Character, memory address unit |
| Word | 32/64 | 4B/16E | Processor native unit |

Within any binary number, we identify positions by significance. The **Most Significant Bit (MSB)** is the leftmost bit, contributing the largest value to the number. The **Least Significant Bit (LSB)** is the rightmost bit, contributing the smallest value (either 0 or 1). In signed number representations, the MSB often indicates the sign.

!!! tip "Memory Size Prefixes"
    In computing, size prefixes have two conventions: decimal (SI) where 1 KB = 1,000 bytes, and binary (IEC) where 1 KiB = 1,024 bytes. Hardware specifications typically use binary prefixes, while storage manufacturers often use decimal prefixes.

---

## 1.4 Base Conversion Methods

Converting between number systems is a fundamental skill in digital design. Different methods are optimal for different conversion types.

### Decimal to Binary Conversion

The **repeated division method** converts decimal integers to binary by repeatedly dividing by 2 and recording the remainders. The binary result is formed by reading the remainders from last to first.

**Example: Convert $19_{10}$ to binary**

| Step | Quotient | ÷ 2 | Remainder |
|------|----------|-----|-----------|
| 1 | 19 | 9 | 1 (LSB) |
| 2 | 9 | 4 | 1 |
| 3 | 4 | 2 | 0 |
| 4 | 2 | 1 | 0 |
| 5 | 1 | 0 | 1 (MSB) |

Reading remainders bottom-to-top: $19_{10} = 10011_2$

### Binary to Decimal Conversion

To convert binary to decimal, multiply each bit by its positional power of 2 and sum the results.

**Example: Convert $10011_2$ to decimal**

$$10011_2 = 1 \times 2^4 + 0 \times 2^3 + 0 \times 2^2 + 1 \times 2^1 + 1 \times 2^0$$
$$= 16 + 0 + 0 + 2 + 1 = 19_{10}$$

### Hexadecimal Conversions

**Decimal to hexadecimal** uses repeated division by 16. **Hexadecimal to decimal** uses positional notation with powers of 16.

**Example: Convert $255_{10}$ to hexadecimal**

- $255 \div 16 = 15$ remainder $15$ (F)
- $15 \div 16 = 0$ remainder $15$ (F)
- Result: $255_{10} = \text{FF}_{16}$

### Octal Conversions

**Decimal to octal** uses repeated division by 8. **Octal to decimal** uses positional notation with powers of 8.

### Binary-Octal-Hexadecimal Shortcuts

Because 8 = 2³ and 16 = 2⁴, direct conversions between binary and octal/hexadecimal are straightforward:

- **Binary ↔ Octal:** Group binary digits in sets of 3 (from the radix point outward), converting each group to its octal equivalent
- **Binary ↔ Hexadecimal:** Group binary digits in sets of 4, converting each group to its hex equivalent

**Example: Convert $10111010_2$ to hexadecimal**

Group in fours: $1011 \ 1010$
Convert each group: $\text{B} \ \text{A}$
Result: $10111010_2 = \text{BA}_{16}$

#### Diagram: Base Conversion Calculator

<iframe src="../sims/base-converter/main.html" width="100%" height="450px" scrolling="no"></iframe>

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

## 1.5 Binary Arithmetic Operations

Digital computers perform all arithmetic in binary. Understanding binary arithmetic operations is essential for comprehending how processors execute calculations.

### Binary Addition

**Binary addition** follows the same principles as decimal addition but with only two digits. The addition rules are:

- $0 + 0 = 0$
- $0 + 1 = 1$
- $1 + 0 = 1$
- $1 + 1 = 10$ (0 with carry 1)
- $1 + 1 + 1 = 11$ (1 with carry 1)

**Example: Add $1011_2 + 1101_2$**

```
    1 1 1 1    (carries)
      1 0 1 1
    + 1 1 0 1
    ---------
    1 1 0 0 0
```

Result: $1011_2 + 1101_2 = 11000_2$ (11 + 13 = 24 in decimal)

### Binary Subtraction

**Binary subtraction** can be performed directly using the rules:

- $0 - 0 = 0$
- $1 - 0 = 1$
- $1 - 1 = 0$
- $0 - 1 = 1$ with borrow

**Example: Subtract $1101_2 - 1001_2$**

```
      1 1 0 1
    - 1 0 0 1
    ---------
      0 1 0 0
```

Result: $1101_2 - 1001_2 = 0100_2$ (13 - 9 = 4 in decimal)

In practice, digital systems typically perform subtraction using two's complement addition, eliminating the need for separate subtraction hardware.

### Binary Multiplication

**Binary multiplication** is simpler than decimal multiplication because each partial product is either 0 (multiplied by 0) or the multiplicand itself (multiplied by 1), shifted appropriately.

**Example: Multiply $101_2 \times 11_2$**

```
        1 0 1
      ×   1 1
      -------
        1 0 1    (101 × 1)
      1 0 1      (101 × 1, shifted left)
      -------
      1 1 1 1
```

Result: $101_2 \times 11_2 = 1111_2$ (5 × 3 = 15 in decimal)

### Binary Division

**Binary division** uses the same long division algorithm as decimal division, but comparisons and subtractions are simpler with only 0 and 1 as possible quotient digits.

#### Diagram: Binary Arithmetic Practice

<iframe src="../sims/binary-arithmetic-practice/main.html" width="100%" height="500px" scrolling="no"></iframe>

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

## 1.6 Signed Number Representations

Digital systems must represent both positive and negative numbers. Several encoding schemes exist, each with distinct characteristics. The three primary methods are **sign-magnitude**, **one's complement**, and **two's complement**.

### Unsigned Numbers

**Unsigned numbers** represent only non-negative values. For an n-bit unsigned number, the range is $0$ to $2^n - 1$. All bits contribute to the magnitude.

| Bits | Unsigned Range | Values |
|------|----------------|--------|
| 4 | 0 to 15 | 16 |
| 8 | 0 to 255 | 256 |
| 16 | 0 to 65,535 | 65,536 |
| 32 | 0 to 4,294,967,295 | 4.29B |

### Sign-Magnitude Representation

In **sign-magnitude** representation, the MSB indicates the sign (0 = positive, 1 = negative), and the remaining bits represent the magnitude. This mirrors how humans write signed numbers.

**Example (4-bit sign-magnitude):**
- $+5 = 0101$
- $-5 = 1101$

Sign-magnitude has two representations of zero ($+0 = 0000$, $-0 = 1000$), which complicates hardware design. Addition and subtraction require separate logic, making this representation inefficient for arithmetic circuits.

### One's Complement Representation

**One's complement** represents negative numbers by inverting all bits of the positive equivalent. The MSB still indicates sign.

**Example (4-bit one's complement):**
- $+5 = 0101$
- $-5 = 1010$ (invert all bits of 0101)

One's complement also has two zeros ($+0 = 0000$, $-0 = 1111$) and requires end-around carry for correct addition results.

### Two's Complement Representation

**Two's complement** is the dominant representation in modern digital systems. To find the two's complement of a number, invert all bits and add 1. Alternatively, find the one's complement and add 1.

**Example (4-bit two's complement):**
- $+5 = 0101$
- $-5$: Invert $0101 \rightarrow 1010$, add 1 $\rightarrow 1011$

Two's complement has a single representation of zero and allows addition and subtraction to use the same hardware. The range for n-bit two's complement is $-2^{n-1}$ to $2^{n-1} - 1$.

| Bits | Two's Complement Range |
|------|----------------------|
| 4 | -8 to +7 |
| 8 | -128 to +127 |
| 16 | -32,768 to +32,767 |
| 32 | -2,147,483,648 to +2,147,483,647 |

#### Diagram: Signed Number Representation Comparison

<iframe src="../sims/signed-number-comparison/main.html" width="100%" height="550px" scrolling="no"></iframe>

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

## 1.7 Two's Complement Arithmetic

Two's complement enables addition and subtraction using identical hardware, which is why it dominates in processor design.

### Two's Complement Addition

**Two's complement addition** works identically to unsigned binary addition. The key insight is that the representation automatically handles signed arithmetic—simply add the bit patterns and discard any carry out of the MSB.

**Example: Add $5 + (-3)$ in 4-bit two's complement**

- $+5 = 0101$
- $-3 = 1101$ (two's complement of 3)

```
    1 1 1      (carries)
      0 1 0 1
    + 1 1 0 1
    ---------
    1 0 0 1 0
```

Discard the carry: Result = $0010 = +2$ ✓

### Two's Complement Subtraction

**Two's complement subtraction** is performed by adding the two's complement of the subtrahend:

$$A - B = A + (-B) = A + \overline{B} + 1$$

**Example: Calculate $3 - 5$ in 4-bit two's complement**

- $+3 = 0011$
- $+5 = 0101$, so $-5 = 1011$
- $3 + (-5) = 0011 + 1011 = 1110 = -2$ ✓

### Sign Extension

When operations require operands of different bit widths, **sign extension** preserves the numerical value by replicating the sign bit. For positive numbers (MSB = 0), extend with 0s; for negative numbers (MSB = 1), extend with 1s.

**Example: Extend 4-bit $1101$ (-3) to 8 bits**

$$1101 \rightarrow 11111101$$

Both represent $-3$ in two's complement.

---

## 1.8 Overflow and Underflow Detection

Arithmetic operations can produce results that exceed the representable range. **Overflow** occurs when the result is too large (positive) for the bit width; **underflow** occurs when the result is too small (negative).

### Detecting Overflow in Two's Complement

Overflow occurs when:

- Adding two positive numbers yields a negative result
- Adding two negative numbers yields a positive result

Mathematically, overflow is detected when the carry into the MSB differs from the carry out of the MSB:

$$\text{Overflow} = C_{in,MSB} \oplus C_{out,MSB}$$

**Example: Add $+7 + (+3)$ in 4-bit two's complement**

- $+7 = 0111$
- $+3 = 0011$

```
    0 1 1 1    (carries: Cin to MSB = 1)
      0 1 1 1
    + 0 0 1 1
    ---------
      1 0 1 0  (Cout from MSB = 0)
```

Result: $1010 = -6$ (incorrect!)
Overflow detected: $C_{in} = 1$, $C_{out} = 0$, so $1 \oplus 0 = 1$ (overflow)

The correct result (+10) cannot be represented in 4 bits, which can only hold -8 to +7.

### Range of Signed Numbers

For an n-bit two's complement number:

- **Minimum value:** $-2^{n-1}$ (e.g., $-8$ for 4 bits: $1000$)
- **Maximum value:** $2^{n-1} - 1$ (e.g., $+7$ for 4 bits: $0111$)
- **Total values:** $2^n$

!!! warning "Overflow Detection is Critical"
    Undetected overflow can cause catastrophic failures in safety-critical systems. The 1996 Ariane 5 rocket explosion was caused by a 64-bit to 16-bit conversion overflow in the guidance system.

#### Diagram: Overflow Detection Simulator

<iframe src="../sims/overflow-detection-simulator/main.html" width="100%" height="500px" scrolling="no"></iframe>

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

## 1.9 Practical Applications

Number systems and binary arithmetic form the foundation for all digital hardware. Understanding these concepts is essential for:

- **Memory addressing:** Addresses are binary numbers, typically displayed in hexadecimal
- **Processor arithmetic:** ALUs implement binary addition with overflow detection
- **Color encoding:** RGB colors use 8-bit unsigned values (0-255) per channel
- **Network protocols:** IP addresses, MAC addresses, and packet headers use binary/hex
- **Embedded systems:** Sensor data, actuator control, and register manipulation require binary operations

### Common Pitfalls

- Forgetting to include carry bits in multi-byte arithmetic
- Mixing signed and unsigned interpretations of the same bit pattern
- Sign extension errors when widening values
- Overflow in intermediate calculations even when final result would fit
- Off-by-one errors in range calculations

#### Diagram: Number Systems Concept Map

<iframe src="../sims/number-systems-concept-map/main.html" width="100%" height="600px" scrolling="no"></iframe>

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

## Summary and Key Takeaways

This unit established the mathematical foundation for digital system design through the following key concepts:

- **Digital systems** use discrete binary signals (0 and 1) rather than continuous analog values, providing noise immunity and reliable computation.

- **Positional notation** is the basis for all number systems used in computing. The value of each digit depends on its position and the base of the system.

- **Four number systems** are commonly used: decimal (base 10) for human readability, binary (base 2) for hardware implementation, octal (base 8) and hexadecimal (base 16) as compact binary representations.

- **Binary data units** include bits (1), nibbles (4), bytes (8), and words (32/64), with MSB and LSB identifying the most and least significant positions.

- **Base conversions** use repeated division (decimal to other bases), positional expansion (other bases to decimal), or direct grouping (binary ↔ octal/hex).

- **Binary arithmetic** follows the same algorithms as decimal but with only two digits. Carries and borrows propagate similarly to decimal.

- **Signed number representations** include sign-magnitude, one's complement, and two's complement. Two's complement dominates because it has a unique zero and allows addition/subtraction with the same hardware.

- **Overflow detection** is critical for correct arithmetic. In two's complement, overflow occurs when the carry into the MSB differs from the carry out of the MSB.

??? question "Self-Check: What is the range of an 8-bit two's complement number?"
    The range is $-128$ to $+127$ (i.e., $-2^7$ to $2^7 - 1$).

??? question "Self-Check: Why is two's complement preferred over sign-magnitude?"
    Two's complement has a single representation of zero and allows addition and subtraction to use identical hardware, simplifying processor design.

??? question "Self-Check: Convert $\text{A3}_{16}$ to binary."
    $\text{A} = 1010$, $3 = 0011$, so $\text{A3}_{16} = 10100011_2$.

---

## Interactive Walkthrough

Step through a complete base conversion problem with animated visuals:

<iframe src="../sims/base-conversion-walkthrough/main.html" width="100%" height="600px" scrolling="no"></iframe>

---

[See Annotated References](./references.md)
