---
title: Unit 3 — Applications of Boolean Algebra
description: Practical applications of Boolean algebra including combinational logic design, arithmetic circuits, code converters, and display decoders
generated_by: claude skill chapter-content-generator
date: 2026-02-04 17:30:00
version: 0.03
---

# Unit 3 — Applications of Boolean Algebra

## Summary

This unit bridges Boolean algebra theory with practical digital circuit design, demonstrating how to translate real-world problems into working logic circuits. Students will learn systematic methods for converting English specifications into Boolean equations and truth tables, then implementing these as combinational logic circuits. The unit covers essential arithmetic circuits—half adders, full adders, and subtractors—that form the foundation of computer arithmetic units. Additional applications include magnitude comparators for decision-making circuits, parity generators/checkers for error detection, code converters for translating between number representations, and seven-segment display decoders for human-readable output. The concept of incompletely specified functions introduces don't care conditions that enable more efficient circuit implementations.

---

## Concepts Covered

1. Combinational Logic
2. Sequential Logic
3. Logic Circuit
4. Circuit Analysis
5. Circuit Synthesis
6. Specification to Circuit
7. Word Problems to Boolean
8. Switching Functions
9. Binary Decision
10. Enable Signal
11. Control Signal
12. Half Adder
13. Full Adder
14. Carry Bit
15. Sum Bit
16. Ripple Carry Adder
17. Half Subtractor
18. Full Subtractor
19. Borrow Bit
20. Difference Bit
21. Adder Subtractor Circuit
22. Comparator Circuit
23. Magnitude Comparator
24. Parity Generator
25. Parity Checker
26. Even Parity
27. Odd Parity
28. Code Converter
29. BCD Code
30. Gray Code
31. BCD to Binary Converter
32. Binary to Gray Converter
33. Seven Segment Display
34. Seven Segment Decoder
35. Incompletely Specified Function

---

## Prerequisites

Before beginning this unit, students should have:

- Mastery of Boolean algebra operations and theorems (Unit 2)
- Ability to construct and interpret truth tables
- Understanding of logic gates and their symbols
- Familiarity with binary number representations (Unit 1)

---

## 1. Combinational vs Sequential Logic

Digital circuits are classified into two fundamental categories based on how they process information.

**Combinational logic** circuits produce outputs that depend solely on the current input values. There is no memory—the same inputs always produce the same outputs, regardless of what happened before. Examples include adders, decoders, and multiplexers.

**Sequential logic** circuits produce outputs that depend on both current inputs AND the circuit's previous state (history). These circuits contain memory elements like flip-flops. Examples include counters, registers, and state machines.

| Characteristic | Combinational | Sequential |
|----------------|---------------|------------|
| Memory | None | Has memory elements |
| Output depends on | Current inputs only | Current inputs + past state |
| Timing | Instantaneous (after propagation) | Clock-synchronized |
| Examples | Adders, decoders | Counters, registers |

This unit focuses exclusively on **combinational logic**. A **logic circuit** is any arrangement of logic gates that implements a Boolean function, and our goal is to design circuits that correctly realize specified behavior.

---

## 2. The Design Process: Specification to Circuit

The process of creating a digital circuit follows a systematic methodology, moving from informal requirements to a working implementation.

### Circuit Analysis vs Synthesis

**Circuit analysis** starts with an existing circuit and determines its behavior—deriving the Boolean expression and truth table from the gate connections. This is useful for understanding, verifying, or documenting circuits.

**Circuit synthesis** starts with a specification (what the circuit should do) and creates a circuit that implements it. This is the primary design activity.

### The Synthesis Process

**Specification to circuit** follows these steps:

1. **Understand the problem** — Identify inputs, outputs, and requirements
2. **Create truth table** — List all input combinations and desired outputs
3. **Derive Boolean expression** — Extract SOP or POS from truth table
4. **Simplify expression** — Apply Boolean algebra or K-maps (Unit 5)
5. **Draw circuit diagram** — Implement the simplified expression with gates
6. **Verify correctness** — Test all input combinations

A **switching function** is the formal name for a Boolean function that describes circuit behavior, mapping binary inputs to binary outputs.

#### Diagram: Design Flow Visualization

#### Diagram: Boolean Operations Visualizer

<iframe src="../sims/boolean-operations-visualizer/main.html"
        width="100%"
        height="500"
        scrolling="no"></iframe>


<details markdown="1">
<summary>Design Flow Visualization</summary>
Type: workflow

Purpose: Illustrate the systematic process from problem specification to working circuit

Bloom Level: Understand (L2)
Bloom Verb: Describe, explain, summarize

Learning Objective: Students will be able to describe the complete design flow for combinational logic circuits and identify the purpose of each step.

Visual Elements:
- Flowchart showing 6 sequential steps
- Each step as a rounded rectangle with icon
- Arrows connecting steps showing flow direction
- Sample artifacts shown at each stage:
  1. Problem Statement (text box)
  2. Truth Table (small table icon)
  3. Boolean Expression (equation)
  4. Simplified Expression (smaller equation)
  5. Circuit Diagram (gate symbols)
  6. Verification (checkmark)

Interactive Elements:
- Click on any step to see a detailed example
- Hover for step description tooltip
- Animation option to see a complete example flow through
- "Try It" mode with a simple problem to trace through

Color Scheme:
- Blue: Specification steps (1-2)
- Orange: Expression steps (3-4)
- Green: Implementation steps (5-6)

Layout:
- Horizontal flow on desktop
- Vertical flow on mobile
- Responsive sizing

Implementation: HTML/CSS/JavaScript with SVG elements
</details>

---

## 3. Word Problems to Boolean Expressions

Real design problems often begin as English descriptions. **Word problems to Boolean** conversion requires careful translation of natural language into precise logical statements.

### Translation Guidelines

| English Phrase | Boolean Equivalent |
|----------------|-------------------|
| "A and B" | $A \cdot B$ |
| "A or B" | $A + B$ |
| "not A", "A is false" | $\overline{A}$ |
| "if A then B" | $\overline{A} + B$ |
| "A only if B" | $\overline{A} + B$ |
| "A if and only if B" | $A \odot B$ (XNOR) |
| "exactly one of A, B" | $A \oplus B$ (XOR) |
| "neither A nor B" | $\overline{A} \cdot \overline{B}$ |

### Example: Security System

**Problem:** An alarm should sound if the door is open while the system is armed, OR if motion is detected while the system is armed at night.

**Step 1: Identify variables**

- $D$ = Door is open
- $A$ = System is armed
- $M$ = Motion detected
- $N$ = Night time
- $F$ = Alarm sounds (output)

**Step 2: Translate to Boolean**

"door is open while system is armed" → $D \cdot A$
"motion detected while system is armed at night" → $M \cdot A \cdot N$
"OR" combines these conditions

$$F = DA + MAN$$

### Binary Decisions and Control Signals

A **binary decision** is a circuit output that represents a yes/no choice based on input conditions. Many applications involve **enable signals** and **control signals** that activate or configure circuit behavior.

An **enable signal** allows a circuit to operate when active (1) and disables output when inactive (0):

$$\text{Output} = \text{Enable} \cdot \text{Function}$$

A **control signal** selects between different operating modes, such as choosing between addition and subtraction in an ALU.

#### Diagram: Word Problem Translator

<iframe src="../../sims/word-problem-translator/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Word Problem Translator</summary>
Type: microsim

Purpose: Practice translating English specifications into Boolean expressions with guided feedback

Bloom Level: Apply (L3)
Bloom Verb: Convert, translate, apply

Learning Objective: Students will be able to translate English problem descriptions into correct Boolean expressions by identifying variables and logical relationships.

Canvas Layout:
- Top: Problem statement display
- Middle: Variable definition workspace
- Bottom: Expression builder with validation

Visual Elements:
- Problem statement with key phrases highlighted
- Variable assignment table (letter → meaning)
- Expression input field with syntax highlighting
- Real-time validation indicator
- Truth table preview of the expression

Interactive Controls:
- "New Problem" button to generate random scenarios
- Difficulty selector (basic, intermediate, advanced)
- Hint button revealing key phrase translations
- "Check" button to verify expression
- Variable name input fields

Problem Categories:
- Security systems (alarms, access control)
- Voting systems (majority, unanimous)
- Safety interlocks (machine guards, sensors)
- Selection logic (if-then-else scenarios)

Data Visibility Requirements:
- Highlight matching phrases in problem and expression
- Show common translation patterns as reference
- Display truth table to verify behavior

Default Parameters:
- Difficulty: Basic
- Problem: Simple 2-variable AND/OR scenario

Behavior:
- Accept multiple equivalent correct answers
- Provide specific feedback on errors
- Track which translation patterns cause difficulty
- Progressively harder problems as student succeeds

Instructional Rationale: Guided translation practice builds the critical skill of converting informal specifications to formal Boolean representations.

Implementation: p5.js with DOM elements
</details>

---

## 4. Arithmetic Circuits: Adders

Binary addition is fundamental to computer arithmetic. Digital systems implement addition using specialized circuits built from basic logic gates.

### Half Adder

A **half adder** adds two single-bit inputs (A and B) and produces two outputs: the **sum bit** (S) and the **carry bit** (C). It is called "half" because it cannot accept a carry-in from a previous stage.

| A | B | Sum (S) | Carry (C) |
|---|---|---------|-----------|
| 0 | 0 | 0 | 0 |
| 0 | 1 | 1 | 0 |
| 1 | 0 | 1 | 0 |
| 1 | 1 | 0 | 1 |

From the truth table:

- **Sum** = 1 when inputs differ → $S = A \oplus B$ (XOR)
- **Carry** = 1 when both inputs are 1 → $C = A \cdot B$ (AND)

The half adder requires one XOR gate and one AND gate.

### Full Adder

A **full adder** adds three single-bit inputs: A, B, and a carry-in ($C_{in}$) from a previous stage. It produces a sum bit (S) and a carry-out ($C_{out}$).

| A | B | $C_{in}$ | Sum (S) | $C_{out}$ |
|---|---|----------|---------|-----------|
| 0 | 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 1 | 0 |
| 0 | 1 | 0 | 1 | 0 |
| 0 | 1 | 1 | 0 | 1 |
| 1 | 0 | 0 | 1 | 0 |
| 1 | 0 | 1 | 0 | 1 |
| 1 | 1 | 0 | 0 | 1 |
| 1 | 1 | 1 | 1 | 1 |

The Boolean equations are:

$$S = A \oplus B \oplus C_{in}$$
$$C_{out} = AB + C_{in}(A \oplus B) = AB + AC_{in} + BC_{in}$$

A full adder can be built from two half adders and an OR gate, or directly from the Boolean expressions.

### Ripple Carry Adder

A **ripple carry adder** connects multiple full adders to add multi-bit numbers. The carry-out of each stage connects to the carry-in of the next stage, with carries "rippling" through the chain.

For an n-bit ripple carry adder:

- Use n full adders connected in series
- First stage $C_{in} = 0$ (or a carry-in for subtraction)
- Final $C_{out}$ indicates overflow (for unsigned) or is discarded (for signed with overflow detection)

**Limitation:** The ripple carry adder is slow for wide operands because each stage must wait for the previous carry to propagate. An 8-bit addition requires 8 sequential carry propagations.

#### Diagram: Binary Adder Visualizer

<iframe src="../sims/binary-adder-visualizer/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Binary Adder Simulator</summary>
Type: microsim

Purpose: Interactive visualization of half adder, full adder, and ripple carry adder operation

Bloom Level: Understand (L2)
Bloom Verb: Explain, demonstrate, trace

Learning Objective: Students will be able to trace signal flow through adder circuits and explain how carry propagation works in multi-bit addition.

Canvas Layout:
- Top: Adder type selector and bit-width control
- Middle: Circuit diagram with live signal values
- Bottom: Binary/decimal input and result display

Visual Elements:
- Selectable views: Half Adder, Full Adder, 4-bit Ripple Adder
- Gate-level circuit diagram with signal values on each wire
- Color-coded signals (green=1, gray=0)
- Carry propagation path highlighted
- Timing diagram showing propagation delay (optional)

For Half Adder:
- Two input bits with toggle switches
- XOR gate producing Sum
- AND gate producing Carry
- Output displays for S and C

For Full Adder:
- Three input bits (A, B, Cin)
- Internal structure showing two half adders + OR gate
- Output displays for S and Cout

For Ripple Carry Adder:
- Two 4-bit input numbers (8 toggle switches)
- Four connected full adders
- Carry chain visible between stages
- Animation showing carry ripple from LSB to MSB
- 5-bit result display (including final carry)

Interactive Controls:
- Toggle individual input bits
- "Random Inputs" button
- Bit-width selector (4, 6, 8 bits for ripple adder)
- "Animate Carry Propagation" toggle
- Speed control for animation
- View selector (logic diagram vs block diagram)

Data Visibility Requirements:
- Show binary and decimal values for inputs
- Show intermediate carry values at each stage
- Show final sum in binary and decimal
- Display propagation delay count (gate levels)

Default Parameters:
- View: Full Adder
- Inputs: A=1, B=1, Cin=0

Behavior:
- Real-time signal updates when inputs change
- Carry propagation animation highlights the critical path
- Incorrect results if overflow occurs (for fixed-width display)

Instructional Rationale: Visualizing signal flow through adder circuits builds understanding of how binary arithmetic is implemented in hardware.

Implementation: p5.js with responsive canvas
</details>

---

## 5. Arithmetic Circuits: Subtractors

Binary subtraction can be implemented directly with subtractor circuits or by using adders with two's complement representation.

### Half Subtractor

A **half subtractor** subtracts one bit (B) from another (A), producing a **difference bit** (D) and a **borrow bit** ($B_{out}$).

| A | B | Difference (D) | Borrow ($B_{out}$) |
|---|---|----------------|-------------------|
| 0 | 0 | 0 | 0 |
| 0 | 1 | 1 | 1 |
| 1 | 0 | 1 | 0 |
| 1 | 1 | 0 | 0 |

The Boolean equations:

$$D = A \oplus B$$
$$B_{out} = \overline{A} \cdot B$$

Note: The difference is identical to the sum in a half adder (XOR), but the borrow differs from carry.

### Full Subtractor

A **full subtractor** subtracts B from A while also accounting for a borrow-in ($B_{in}$) from a previous stage.

| A | B | $B_{in}$ | Difference (D) | $B_{out}$ |
|---|---|----------|----------------|-----------|
| 0 | 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 1 | 1 |
| 0 | 1 | 0 | 1 | 1 |
| 0 | 1 | 1 | 0 | 1 |
| 1 | 0 | 0 | 1 | 0 |
| 1 | 0 | 1 | 0 | 0 |
| 1 | 1 | 0 | 0 | 0 |
| 1 | 1 | 1 | 1 | 1 |

The Boolean equations:

$$D = A \oplus B \oplus B_{in}$$
$$B_{out} = \overline{A}B + B_{in}(\overline{A \oplus B}) = \overline{A}B + \overline{A}B_{in} + BB_{in}$$

### Adder-Subtractor Circuit

An **adder-subtractor circuit** uses a single set of full adders to perform both addition and subtraction, controlled by a mode signal M:

- When $M = 0$: Perform $A + B$ (addition)
- When $M = 1$: Perform $A - B$ (subtraction via two's complement)

The design XORs each bit of B with M:

- If $M = 0$: $B \oplus 0 = B$ (unchanged)
- If $M = 1$: $B \oplus 1 = \overline{B}$ (complemented)

Setting $C_{in} = M$ adds 1 when subtracting, completing the two's complement operation:

$$A - B = A + \overline{B} + 1$$

#### Diagram: Adder-Subtractor Circuit Builder

<iframe src="../../sims/adder-subtractor-builder/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Adder-Subtractor Circuit Builder</summary>
Type: microsim

Purpose: Demonstrate how a single circuit performs both addition and subtraction using the control signal

Bloom Level: Apply (L3)
Bloom Verb: Use, demonstrate, calculate

Learning Objective: Students will be able to explain how the adder-subtractor circuit uses XOR gates and the control signal to switch between addition and subtraction modes.

Canvas Layout:
- Top: 4-bit input registers for A and B with toggle switches
- Middle: Circuit diagram showing XOR gates and full adders
- Bottom: Result display with mode indicator

Visual Elements:
- Mode switch (M) prominently displayed (Add/Subtract toggle)
- 4-bit input A (4 toggle switches)
- 4-bit input B (4 toggle switches)
- XOR gates between B inputs and M signal
- 4 full adders in ripple configuration
- M connected to first carry-in
- Signal values shown on all wires
- Result in binary and decimal (signed interpretation)

Interactive Controls:
- Mode toggle (Add/Subtract)
- Individual bit toggles for A and B
- "Random Values" button
- Toggle between signed/unsigned interpretation
- Show/hide internal XOR gates

Data Visibility Requirements:
- Show original B value
- Show modified B value (after XOR with M)
- Show that Cin = M
- Show result with correct signed/unsigned interpretation
- Indicate overflow when applicable

Default Parameters:
- A = 0101 (5)
- B = 0011 (3)
- Mode = Add

Behavior:
- Real-time calculation as inputs change
- Highlight the XOR modification of B when in subtract mode
- Show two's complement interpretation for subtraction
- Display overflow warning for signed operations

Instructional Rationale: Understanding the elegant XOR trick for mode switching reveals how hardware efficiently shares resources for related operations.

Implementation: p5.js with responsive canvas
</details>

---

## 6. Comparator Circuits

**Comparator circuits** determine the relationship between two binary numbers, producing outputs that indicate whether one number is greater than, less than, or equal to another.

### Single-Bit Comparator

For two single bits A and B, three relationships are possible:

| Relationship | Output | Boolean Expression |
|--------------|--------|-------------------|
| A > B | G | $A \cdot \overline{B}$ |
| A < B | L | $\overline{A} \cdot B$ |
| A = B | E | $\overline{A \oplus B} = A \odot B$ |

### Magnitude Comparator

A **magnitude comparator** compares multi-bit numbers. For n-bit inputs, it produces three outputs: $G$ (A > B), $L$ (A < B), and $E$ (A = B).

**Design approach for 4-bit comparator:**

The comparison proceeds from the most significant bit to least significant:

1. If $A_3 > B_3$, then $A > B$ regardless of other bits
2. If $A_3 < B_3$, then $A < B$ regardless of other bits
3. If $A_3 = B_3$, compare $A_2$ with $B_2$, and so on

The equality output is:

$$E = (A_3 \odot B_3)(A_2 \odot B_2)(A_1 \odot B_1)(A_0 \odot B_0)$$

The greater-than output is:

$$G = A_3\overline{B_3} + (A_3 \odot B_3)A_2\overline{B_2} + (A_3 \odot B_3)(A_2 \odot B_2)A_1\overline{B_1} + (A_3 \odot B_3)(A_2 \odot B_2)(A_1 \odot B_1)A_0\overline{B_0}$$

The less-than output is: $L = \overline{G} \cdot \overline{E}$ (or derive symmetrically).

!!! tip "Cascading Comparators"
    Commercial comparator ICs (like 74LS85) include cascade inputs that allow connecting multiple 4-bit comparators to compare larger numbers.

---

## 7. Parity Circuits

**Parity** is a simple error detection technique that adds a check bit to data, allowing detection of single-bit transmission errors.

### Even and Odd Parity

**Even parity** sets the parity bit so the total number of 1s (including the parity bit) is even.

**Odd parity** sets the parity bit so the total number of 1s is odd.

| Data Bits | Count of 1s | Even Parity Bit | Odd Parity Bit |
|-----------|-------------|-----------------|----------------|
| 000 | 0 | 0 | 1 |
| 001 | 1 | 1 | 0 |
| 010 | 1 | 1 | 0 |
| 011 | 2 | 0 | 1 |
| 100 | 1 | 1 | 0 |
| 101 | 2 | 0 | 1 |
| 110 | 2 | 0 | 1 |
| 111 | 3 | 1 | 0 |

### Parity Generator

A **parity generator** creates the parity bit for a given data word. For even parity with n data bits:

$$P = D_{n-1} \oplus D_{n-2} \oplus \ldots \oplus D_1 \oplus D_0$$

The parity bit is simply the XOR of all data bits. This produces a 1 when the count of 1s in the data is odd, making the total count even when P is included.

For odd parity, invert the result: $P = \overline{D_{n-1} \oplus D_{n-2} \oplus \ldots \oplus D_0}$

### Parity Checker

A **parity checker** verifies that received data (including the parity bit) has correct parity. For even parity:

$$\text{Error} = D_{n-1} \oplus D_{n-2} \oplus \ldots \oplus D_0 \oplus P$$

If the result is 0, parity is correct (even number of 1s). If the result is 1, an error is detected.

!!! warning "Parity Limitations"
    Parity can only detect an odd number of bit errors. If two bits flip, the parity remains unchanged and the error goes undetected. More sophisticated codes (Hamming, CRC) provide stronger error detection and correction.

#### Diagram: Parity Generator/Checker Simulator

<iframe src="../../sims/parity-circuit-simulator/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Parity Generator/Checker Simulator</summary>
Type: microsim

Purpose: Demonstrate parity generation and checking with interactive error injection

Bloom Level: Apply (L3)
Bloom Verb: Use, demonstrate, detect

Learning Objective: Students will be able to generate parity bits and use parity checking to detect single-bit errors in transmitted data.

Canvas Layout:
- Top: Mode selector (Generator/Checker) and parity type (Even/Odd)
- Middle: Data bits with XOR gate cascade visualization
- Bottom: Result display and error injection controls

Visual Elements:
- 8 data bit toggle switches
- XOR gate cascade showing parity computation
- Parity bit display (generated or input)
- For checker mode: error indicator (green check / red X)
- Transmission channel visualization with optional error injection
- Count of 1s display

Interactive Controls:
- Toggle individual data bits
- Select even or odd parity
- Switch between generator and checker mode
- In checker mode: inject errors by clicking bits
- "Transmit" button to simulate sending data
- Error position selector for controlled injection

Data Visibility Requirements:
- Show step-by-step XOR computation
- Display running count of 1s at each stage
- For checker: highlight which bit(s) might be corrupted
- Show that double errors are undetected

Default Parameters:
- Mode: Generator
- Parity type: Even
- Data: 10110001

Behavior:
- Real-time parity computation as bits toggle
- Animation option for XOR cascade
- Error detection alert in checker mode
- Demonstrate undetected double-bit errors

Instructional Rationale: Hands-on error injection demonstrates both the power and limitations of parity-based error detection.

Implementation: p5.js with responsive canvas
</details>

---

## 8. Code Converters

**Code converters** translate data from one binary representation to another. Different codes offer advantages for specific applications.

### BCD Code

**BCD (Binary Coded Decimal)** represents each decimal digit with its 4-bit binary equivalent. Unlike pure binary, BCD maintains the decimal place value structure.

| Decimal | BCD | Binary |
|---------|-----|--------|
| 0 | 0000 | 0000 |
| 5 | 0101 | 0101 |
| 9 | 1001 | 1001 |
| 10 | 0001 0000 | 1010 |
| 25 | 0010 0101 | 11001 |
| 99 | 1001 1001 | 1100011 |

BCD simplifies decimal I/O but is less efficient than pure binary (wastes 6 codes per digit).

### Gray Code

**Gray code** is an ordering of binary numbers where adjacent values differ in exactly one bit. This property is valuable for position encoders and Karnaugh maps.

| Decimal | Binary | Gray Code |
|---------|--------|-----------|
| 0 | 0000 | 0000 |
| 1 | 0001 | 0001 |
| 2 | 0010 | 0011 |
| 3 | 0011 | 0010 |
| 4 | 0100 | 0110 |
| 5 | 0101 | 0111 |
| 6 | 0110 | 0101 |
| 7 | 0111 | 0100 |

### Binary to Gray Conversion

The **binary to Gray converter** uses XOR gates:

$$G_n = B_n$$ (MSB is unchanged)
$$G_i = B_{i+1} \oplus B_i$$ (for all other bits)

For 4 bits:

- $G_3 = B_3$
- $G_2 = B_3 \oplus B_2$
- $G_1 = B_2 \oplus B_1$
- $G_0 = B_1 \oplus B_0$

### Gray to Binary Conversion

The reverse conversion:

$$B_n = G_n$$
$$B_i = B_{i+1} \oplus G_i$$

### BCD to Binary Conversion

A **BCD to binary converter** is more complex, requiring arithmetic operations to combine the weighted digit values. For 2-digit BCD (00-99):

$$\text{Binary} = 10 \times \text{tens digit} + \text{units digit}$$

This requires multipliers and adders, making the circuit significantly more complex than Gray code converters.

#### Diagram: Code Converter Demonstrator

<iframe src="../../sims/code-converter-demo/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Code Converter Demonstrator</summary>
Type: microsim

Purpose: Interactive demonstration of code conversions between Binary, Gray, and BCD

Bloom Level: Apply (L3)
Bloom Verb: Convert, use, calculate

Learning Objective: Students will be able to perform conversions between binary, Gray code, and BCD representations and explain why different codes are useful.

Canvas Layout:
- Top: Conversion type selector
- Middle: Input/output displays with conversion circuit
- Bottom: Step-by-step conversion explanation

Visual Elements:
- Three display panels (Binary, Gray, BCD/Decimal)
- Conversion circuit showing XOR gates for Gray conversion
- Arrows indicating conversion direction
- Bit-by-bit conversion animation option
- Comparison table showing current value in all formats

Conversion Types:
1. Binary ↔ Gray Code
2. Binary ↔ BCD
3. Gray Code ↔ BCD (via binary)

Interactive Controls:
- Toggle individual bits in source format
- Conversion direction selector
- "Step Through" to see bit-by-bit conversion
- "Random Value" button
- Bit width selector (4, 8 bits)

Data Visibility Requirements:
- Show XOR operations for Gray conversion
- Show the formula being applied at each step
- Highlight the single-bit-change property of Gray code
- For BCD: show invalid codes (10-15) handling

Default Parameters:
- Conversion: Binary to Gray
- Input: 0110 (6)
- Bit width: 4

Behavior:
- Real-time conversion as input changes
- Animate the conversion process step by step
- Highlight the critical property of Gray code (adjacent codes differ by 1 bit)
- Show practical applications of each code

Instructional Rationale: Seeing the conversion process step-by-step builds understanding of why XOR operations create the Gray code properties.

Implementation: p5.js with responsive canvas
</details>

---

## 9. Seven-Segment Display Decoder

A **seven-segment display** uses seven LED segments (plus optional decimal point) arranged to display decimal digits and some letters.

```
   a
  ───
 │   │
f│   │b
 │ g │
  ───
 │   │
e│   │c
 │   │
  ───
   d
```

### Seven-Segment Decoder Design

A **seven-segment decoder** converts a 4-bit BCD input to the seven segment control signals. Each segment requires its own Boolean function.

| BCD | Digit | a | b | c | d | e | f | g |
|-----|-------|---|---|---|---|---|---|---|
| 0000 | 0 | 1 | 1 | 1 | 1 | 1 | 1 | 0 |
| 0001 | 1 | 0 | 1 | 1 | 0 | 0 | 0 | 0 |
| 0010 | 2 | 1 | 1 | 0 | 1 | 1 | 0 | 1 |
| 0011 | 3 | 1 | 1 | 1 | 1 | 0 | 0 | 1 |
| 0100 | 4 | 0 | 1 | 1 | 0 | 0 | 1 | 1 |
| 0101 | 5 | 1 | 0 | 1 | 1 | 0 | 1 | 1 |
| 0110 | 6 | 1 | 0 | 1 | 1 | 1 | 1 | 1 |
| 0111 | 7 | 1 | 1 | 1 | 0 | 0 | 0 | 0 |
| 1000 | 8 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |
| 1001 | 9 | 1 | 1 | 1 | 1 | 0 | 1 | 1 |

For BCD inputs 1010-1111 (invalid BCD), the outputs can be defined as don't cares, enabling simplification.

### Deriving Segment Equations

Each segment output is a function of the 4 BCD input bits ($B_3 B_2 B_1 B_0$):

$$a = \sum m(0,2,3,5,6,7,8,9)$$

This can be simplified using Boolean algebra or K-maps (covered in Unit 5).

!!! note "Active-Low vs Active-High"
    Some displays use active-low signals (segment lights when signal is 0). The decoder logic must be designed accordingly, or inverters added at outputs.

#### Diagram: Seven-Segment Decoder Simulator

<iframe src="../../sims/seven-segment-decoder/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Seven-Segment Decoder Simulator</summary>
Type: microsim

Purpose: Interactive seven-segment display decoder showing BCD input to segment output mapping

Bloom Level: Apply (L3)
Bloom Verb: Use, implement, decode

Learning Objective: Students will be able to trace the decoder logic from BCD inputs to segment outputs and understand how the display forms each digit.

Canvas Layout:
- Left: BCD input switches and binary display
- Center: Large seven-segment display showing the digit
- Right: Segment output values and Boolean expressions

Visual Elements:
- Four input toggle switches for BCD (B3, B2, B1, B0)
- Large seven-segment display (segments light up based on outputs)
- Segment output indicators (a-g) showing 1 or 0
- Active segment highlighting on the display
- Optional: circuit diagram for one segment's logic

Interactive Controls:
- Toggle BCD input bits directly
- +/- buttons to increment/decrement the BCD value
- "Show Invalid" to see behavior for BCD 10-15
- Select a segment to view its Boolean equation
- Toggle active-high/active-low output mode

Data Visibility Requirements:
- Show current BCD value in binary and decimal
- Highlight which segments are active
- For each segment, show whether it's on (1) or off (0)
- Display the SOP expression for the selected segment

Default Parameters:
- BCD input: 0101 (5)
- Active-high outputs
- Display segment 'a' equation

Behavior:
- Real-time display update as BCD changes
- Invalid BCD (10-15) shows "X" or blank
- Animate segment turn-on/off transitions
- Show truth table row corresponding to current input

Instructional Rationale: Connecting the abstract truth table to a physical display representation makes the decoder function tangible.

Implementation: p5.js with SVG seven-segment rendering
</details>

---

## 10. Incompletely Specified Functions

An **incompletely specified function** has some input combinations where the output doesn't matter—either because those inputs can never occur or because the output value for those inputs is irrelevant to the application.

### Don't Care Conditions

**Don't care** conditions (marked as X or d in truth tables) indicate outputs that can be assigned either 0 or 1 during optimization, whichever leads to a simpler circuit.

**Example: BCD to Seven-Segment Decoder**

BCD only uses input combinations 0000-1001 (0-9). The combinations 1010-1111 (10-15) are invalid BCD and will never occur in a properly designed system. These six input combinations are don't cares.

| BCD Input | Digit | Segment a | Notes |
|-----------|-------|-----------|-------|
| 0000-1001 | 0-9 | specified | Normal operation |
| 1010 | — | X | Invalid BCD |
| 1011 | — | X | Invalid BCD |
| 1100 | — | X | Invalid BCD |
| 1101 | — | X | Invalid BCD |
| 1110 | — | X | Invalid BCD |
| 1111 | — | X | Invalid BCD |

### Using Don't Cares for Simplification

When deriving Boolean expressions:

- **SOP form:** Treat don't cares as 1s if it helps form larger groups
- **POS form:** Treat don't cares as 0s if it helps form larger groups

The optimizer chooses the assignment (0 or 1) that minimizes the final expression.

**Example:** Function with don't cares

| A | B | C | F |
|---|---|---|---|
| 0 | 0 | 0 | 1 |
| 0 | 0 | 1 | 0 |
| 0 | 1 | 0 | 1 |
| 0 | 1 | 1 | X |
| 1 | 0 | 0 | 0 |
| 1 | 0 | 1 | X |
| 1 | 1 | 0 | 1 |
| 1 | 1 | 1 | 1 |

Without don't cares: $F = \overline{A}\overline{B}\overline{C} + \overline{A}B\overline{C} + AB\overline{C} + ABC$

Using don't cares strategically (treating row 011 as 1):
$F = \overline{A}\overline{C} + \overline{A}B + AB = \overline{C}(\overline{A} + B) + AB = ...$

K-maps (Unit 5) provide a systematic method for exploiting don't cares.

#### Diagram: Don't Care Optimizer

<iframe src="../../sims/dont-care-optimizer/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Don't Care Optimizer</summary>
Type: microsim

Purpose: Demonstrate how don't care conditions enable circuit simplification

Bloom Level: Analyze (L4)
Bloom Verb: Compare, optimize, analyze

Learning Objective: Students will be able to identify don't care conditions and explain how treating them as 0 or 1 can simplify Boolean expressions.

Canvas Layout:
- Left: Truth table with editable output column (0, 1, X)
- Middle: Expression comparison (with and without don't care optimization)
- Right: Circuit diagrams showing gate count difference

Visual Elements:
- Interactive truth table (3 or 4 variables)
- Three-state output selector for each row (0, 1, X)
- Side-by-side Boolean expressions:
  - "Without don't cares" (treat X as 0)
  - "With don't care optimization" (treat X optimally)
- Gate count comparison
- Percentage reduction indicator

Interactive Controls:
- Click truth table outputs to cycle through 0, 1, X
- "Optimize" button to compute best assignment
- "Show Details" to reveal which X's became 0 or 1
- Preset examples (BCD decoder, specific functions)
- Reset to clear all don't cares

Data Visibility Requirements:
- Highlight which don't cares were treated as 1
- Show the groupings used (preview of K-map concept)
- Display literal count before and after
- Show equivalent circuit gate counts

Default Parameters:
- Variables: 3 (A, B, C)
- Initial function: BCD-like with 2 don't cares

Behavior:
- Real-time expression update as outputs change
- Animate the "choice" of 0 or 1 for each X
- Compare gate implementations visually
- Provide statistics on simplification achieved

Instructional Rationale: Seeing the direct impact of don't care assignments on circuit complexity motivates the K-map techniques in Unit 5.

Implementation: p5.js with DOM elements for truth table
</details>

---

## Summary and Key Takeaways

This unit applied Boolean algebra to practical digital circuit design:

- **Combinational logic** circuits have outputs determined solely by current inputs, with no memory of past states.

- **Circuit synthesis** follows a systematic process: specification → truth table → Boolean expression → simplification → circuit implementation.

- **Word problem translation** requires careful mapping of English statements to Boolean operators using a consistent variable assignment.

- **Half adders** add two bits producing sum and carry; **full adders** include a carry-in for multi-bit addition.

- **Ripple carry adders** chain full adders for multi-bit addition, with carry propagating through stages.

- **Adder-subtractor circuits** use XOR gates with a control signal to perform either addition or two's complement subtraction using shared hardware.

- **Magnitude comparators** determine greater-than, less-than, or equal relationships between binary numbers by comparing from MSB to LSB.

- **Parity generators** create check bits by XORing all data bits; **parity checkers** detect single-bit errors using the same XOR operation.

- **Code converters** translate between representations: BCD for decimal I/O, Gray code for position encoding with minimal bit changes.

- **Seven-segment decoders** convert BCD inputs to segment drive signals, with invalid BCD codes as don't cares.

- **Incompletely specified functions** have don't care conditions that enable simpler implementations by choosing optimal output values.

??? question "Self-Check: What is the Boolean expression for the carry output of a full adder?"
    $C_{out} = AB + C_{in}(A \oplus B) = AB + AC_{in} + BC_{in}$. The carry is produced when at least two of the three inputs are 1.

??? question "Self-Check: Why is Gray code useful for position encoders?"
    In Gray code, adjacent positions differ by only one bit. This prevents ambiguous readings when a sensor is between positions—only one bit can be changing at a time, eliminating glitches.

??? question "Self-Check: How do don't cares help circuit simplification?"
    Don't cares can be assigned either 0 or 1 during optimization. By strategically choosing these values, larger groups can be formed in K-maps, resulting in simpler Boolean expressions with fewer gates.

---

[See Annotated References](./references.md)
