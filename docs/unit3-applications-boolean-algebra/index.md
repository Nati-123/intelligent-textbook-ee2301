---
title: Unit 3 — Applications of Boolean Algebra
description: Practical applications of Boolean algebra including combinational logic design, arithmetic circuits, code converters, and display decoders
generated_by: claude skill chapter-content-generator
date: 2026-02-04 17:30:00
version: 0.03
---

<div class="unit1-styled" markdown>

# Unit 3 — Applications of Boolean Algebra

<details class="video-overview">
<summary><strong>Unit Overview</strong> (click to expand)</summary>

Welcome to Unit 3, where Boolean algebra leaves the chalkboard and enters the real world. Now it is time to use the rules and identities to design actual digital circuits, starting from plain English descriptions and ending with hardware that performs useful work.

The first skill you will develop is translating a word problem into a Boolean equation and a truth table. Real specifications map to identifying inputs, defining outputs, filling in the truth table row by row, and writing the Boolean expression. This translation step is where engineering judgment meets mathematical precision.

With that process in hand, we move on to essential building blocks. The half adder takes two single-bit inputs and produces a sum and a carry. The full adder extends that idea by accepting a carry-in from a previous stage, making it possible to chain adders together for multi-bit arithmetic. Magnitude comparators tell you whether one binary number is greater than, less than, or equal to another.

We then explore parity generators and checkers for error detection, code converters that translate between different binary codes, and seven-segment display decoders that convert a four-bit binary value into the signals that light up a numeric display.

Throughout these designs, you will encounter don't care conditions — input combinations that can never occur or whose output does not matter. Don't cares give you freedom during simplification, and that flexibility often makes the difference between a good design and a great one.

**Key Takeaways**

1. Translating English specifications into truth tables and Boolean equations is the essential first step in any digital design workflow.
2. Building blocks like adders, comparators, parity checkers, and display decoders are reusable components that appear throughout digital systems.
3. Don't care conditions provide valuable flexibility during simplification, often enabling significantly smaller and faster circuits.

</details>

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">Summary</h2>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 20px 24px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<p style="color: #333; line-height: 1.85; font-size: 1.02rem; margin: 0;">
This unit bridges Boolean algebra theory with practical digital circuit design, demonstrating how to translate real-world problems into working logic circuits. Students will learn systematic methods for converting English specifications into Boolean equations and truth tables, then implementing these as combinational logic circuits. The unit covers essential arithmetic circuits—half adders, full adders, and subtractors—that form the foundation of computer arithmetic units. Additional applications include magnitude comparators for decision-making circuits, parity generators/checkers for error detection, code converters for translating between number representations, and seven-segment display decoders for human-readable output. The concept of incompletely specified functions introduces don't care conditions that enable more efficient circuit implementations.
</p>
</div>

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">Concepts Covered</h2>

<div style="background: #F8F6FF; border: 2px solid #D4C8FF; border-radius: 12px; padding: 20px 24px; margin: 1rem 0;" markdown>

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

</div>

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">Prerequisites</h2>

Before beginning this unit, students should have:

- Mastery of Boolean algebra operations and theorems (Unit 2)
- Ability to construct and interpret truth tables
- Understanding of logic gates and their symbols
- Familiarity with binary number representations (Unit 1)

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">3.1 Combinational vs Sequential Logic</h2>

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

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">3.2 The Design Process: Specification to Circuit</h2>

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

<iframe src="../sims/design-flow-visualization/main.html" width="100%" height="550px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">3.3 Word Problems to Boolean Expressions</h2>

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

### Example: Voting System

**Problem:** A three-person committee approves proposals by majority vote. Design a circuit that outputs 1 when at least two of three members vote yes.

**Step 1: Identify variables**

- $A$ = Member A votes yes
- $B$ = Member B votes yes
- $C$ = Member C votes yes
- $F$ = Proposal approved (output)

**Step 2: Create truth table**

| A | B | C | F | Reason |
|:-:|:-:|:-:|:-:|--------|
| 0 | 0 | 0 | 0 | No votes |
| 0 | 0 | 1 | 0 | Only 1 vote |
| 0 | 1 | 0 | 0 | Only 1 vote |
| 0 | 1 | 1 | 1 | 2 votes (majority) |
| 1 | 0 | 0 | 0 | Only 1 vote |
| 1 | 0 | 1 | 1 | 2 votes (majority) |
| 1 | 1 | 0 | 1 | 2 votes (majority) |
| 1 | 1 | 1 | 1 | 3 votes (unanimous) |

**Step 3: Derive Boolean expression** (SOP from rows where F = 1)

$$F = \overline{A}BC + A\overline{B}C + AB\overline{C} + ABC$$

**Step 4: Simplify** — factor and apply Boolean algebra:

$$F = BC(\overline{A} + A) + AC(\overline{B} + B) + AB\overline{C} = BC + AC + AB\overline{C}$$

Since $AB\overline{C} + ABC = AB$:

$$F = AB + AC + BC$$

This is the **majority function** — the output is 1 when any two (or more) inputs are 1. It requires three AND gates and one OR gate.

!!! tip "The Majority Function"
    The majority function $F = AB + AC + BC$ appears frequently in digital design. It is equivalent to the carry output of a full adder, which produces a carry when at least two of its three inputs are 1.

### Binary Decisions and Control Signals

A **binary decision** is a circuit output that represents a yes/no choice based on input conditions. Many applications involve **enable signals** and **control signals** that activate or configure circuit behavior.

An **enable signal** allows a circuit to operate when active (1) and disables output when inactive (0):

$$\text{Output} = \text{Enable} \cdot \text{Function}$$

A **control signal** selects between different operating modes, such as choosing between addition and subtraction in an ALU.

#### Diagram: Word Problem Translator

<iframe src="../sims/word-problem-translator/main.html" width="100%" height="550px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">3.4 Arithmetic Circuits: Adders</h2>

Binary addition is fundamental to computer arithmetic. Digital systems implement addition using specialized circuits built from basic logic gates.

### Half Adder

A **half adder** adds two single-bit inputs (A and B) and produces two outputs: the **sum bit** (S) and the **carry bit** (C). It is called "half" because it cannot accept a carry-in from a previous stage.

| A | B | Sum (S) | Carry (C) |
|:-:|:-:|:-------:|:---------:|
| 0 | 0 | 0       | 0         |
| 0 | 1 | 1       | 0         |
| 1 | 0 | 1       | 0         |
| 1 | 1 | 0       | 1         |

From the truth table:

- **Sum** = 1 when inputs differ → $S = A \oplus B$ (XOR)
- **Carry** = 1 when both inputs are 1 → $C = A \cdot B$ (AND)

The half adder requires one XOR gate and one AND gate.

### Full Adder

A **full adder** adds three single-bit inputs: A, B, and a carry-in ($C_{in}$) from a previous stage. It produces a sum bit (S) and a carry-out ($C_{out}$).

| A | B | $C_{in}$ | Sum (S) | $C_{out}$ |
|:-:|:-:|:--------:|:-------:|:---------:|
| 0 | 0 | 0        | 0       | 0         |
| 0 | 0 | 1        | 1       | 0         |
| 0 | 1 | 0        | 1       | 0         |
| 0 | 1 | 1        | 0       | 1         |
| 1 | 0 | 0        | 1       | 0         |
| 1 | 0 | 1        | 0       | 1         |
| 1 | 1 | 0        | 0       | 1         |
| 1 | 1 | 1        | 1       | 1         |

The Boolean equations are:

$$
\begin{aligned}
S      &= A \oplus B \oplus C_{in} \\[6pt]
C_{out} &= AB + A\,C_{in} + B\,C_{in}
\end{aligned}
$$

A full adder can be built from two half adders and an OR gate, or directly from the Boolean expressions.

### Ripple Carry Adder

A **ripple carry adder** connects multiple full adders to add multi-bit numbers. The carry-out of each stage connects to the carry-in of the next stage, with carries "rippling" through the chain.

For an n-bit ripple carry adder:

- Use n full adders connected in series
- First stage $C_{in} = 0$ (or a carry-in for subtraction)
- Final $C_{out}$ indicates overflow (for unsigned) or is discarded (for signed with overflow detection)

**Limitation:** The ripple carry adder is slow for wide operands because each stage must wait for the previous carry to propagate. An 8-bit addition requires 8 sequential carry propagations.

### Carry-Lookahead Adder (Preview)

The ripple carry adder's delay grows linearly with bit width because each carry depends on the previous stage. The **carry-lookahead adder (CLA)** eliminates this bottleneck by computing all carries simultaneously using two auxiliary signals for each bit position:

- **Generate:** $G_i = A_i \cdot B_i$ — stage $i$ produces a carry regardless of carry-in
- **Propagate:** $P_i = A_i \oplus B_i$ — stage $i$ passes an incoming carry through

Using these signals, each carry can be expressed directly in terms of the original inputs:

$$
\begin{aligned}
C_0 &= G_0 + P_0 C_{in} \\[4pt]
C_1 &= G_1 + P_1 G_0 + P_1 P_0 C_{in} \\[4pt]
C_2 &= G_2 + P_2 G_1 + P_2 P_1 G_0 + P_2 P_1 P_0 C_{in}
\end{aligned}
$$

Each equation depends only on the original inputs $A_i$, $B_i$, and $C_{in}$ — not on the output of a previous stage. This means all carries are available after just two gate delays (one for G/P, one for the carry equation), regardless of the adder width.

**Example (2-bit CLA):** For $A = 11$, $B = 01$, $C_{in} = 0$:

- $G_0 = 1 \cdot 1 = 1$, $P_0 = 1 \oplus 1 = 0$ → $C_0 = 1 + 0 \cdot 0 = 1$
- $G_1 = 1 \cdot 0 = 0$, $P_1 = 1 \oplus 0 = 1$ → $C_1 = 0 + 1 \cdot 1 = 1$

Result: $S = 00$ with $C_{out} = 1$, confirming $3 + 1 = 4$. Both carries were computed in parallel, not sequentially.

!!! note "CLA in Practice"
    Commercial CLA ICs like the 74LS283 use this technique internally. For very wide adders (32+ bits), CLA blocks are cascaded using group-generate and group-propagate signals, keeping the delay logarithmic rather than linear. Detailed CLA design is covered in advanced digital design courses.

#### Diagram: Binary Adder Visualizer

<iframe src="../sims/binary-adder-visualizer/main.html" width="100%" height="550px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">3.5 Arithmetic Circuits: Subtractors</h2>

Binary subtraction can be implemented directly with subtractor circuits or by using adders with two's complement representation.

### Half Subtractor

A **half subtractor** subtracts one bit (B) from another (A), producing a **difference bit** (D) and a **borrow bit** ($B_{out}$).

| A | B | Difference (D) | Borrow ($B_{out}$) |
|:-:|:-:|:--------------:|:------------------:|
| 0 | 0 | 0              | 0                  |
| 0 | 1 | 1              | 1                  |
| 1 | 0 | 1              | 0                  |
| 1 | 1 | 0              | 0                  |

The Boolean equations are:

$$
\begin{aligned}
D      &= A \oplus B \\[6pt]
B_{out} &= \overline{A} \cdot B
\end{aligned}
$$

Note: The difference is identical to the sum in a half adder (XOR), but the borrow differs from carry.

### Full Subtractor

A **full subtractor** subtracts B from A while also accounting for a borrow-in ($B_{in}$) from a previous stage.

| A | B | $B_{in}$ | Difference (D) | $B_{out}$ |
|:-:|:-:|:--------:|:--------------:|:---------:|
| 0 | 0 | 0        | 0              | 0         |
| 0 | 0 | 1        | 1              | 1         |
| 0 | 1 | 0        | 1              | 1         |
| 0 | 1 | 1        | 0              | 1         |
| 1 | 0 | 0        | 1              | 0         |
| 1 | 0 | 1        | 0              | 0         |
| 1 | 1 | 0        | 0              | 0         |
| 1 | 1 | 1        | 1              | 1         |

The Boolean equations are:

$$
\begin{aligned}
D      &= A \oplus B \oplus B_{in} \\[6pt]
B_{out} &= \overline{A}\,B + B_{in}\!\left(\overline{A \oplus B}\right) = \overline{A}\,B + \overline{A}\,B_{in} + B\,B_{in}
\end{aligned}
$$

### Adder-Subtractor Circuit

An **adder-subtractor circuit** uses a single set of full adders to perform both addition and subtraction, controlled by a mode signal M:

- When $M = 0$: Perform $A + B$ (addition)
- When $M = 1$: Perform $A - B$ (subtraction via two's complement)

The design XORs each bit of B with M:

- If $M = 0$: $B \oplus 0 = B$ (unchanged)
- If $M = 1$: $B \oplus 1 = \overline{B}$ (complemented)

Setting $C_{in} = M$ adds 1 when subtracting, completing the two's complement operation:

$$A - B = A + \overline{B} + 1$$

### Overflow Detection

When adding two signed (two's complement) numbers, the result can exceed the representable range. **Overflow** occurs when two positive numbers produce a negative result, or two negative numbers produce a positive result.

The overflow flag $V$ can be computed by comparing the carry into the sign bit with the carry out of the sign bit:

$$V = C_{n-1} \oplus C_n$$

Where $C_{n-1}$ is the carry into the MSB (sign position) and $C_n$ is the carry out. When these two carries differ, the sign bit has been corrupted.

**Example (4-bit signed):** Compute $7 + 1$:

| | $C_3$ | $A_3$ | $B_3$ | $A_2$ | $B_2$ | $A_1$ | $B_1$ | $A_0$ | $B_0$ |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| Values | | 0 | 0 | 1 | 0 | 1 | 0 | 1 | 1 |
| Carries | $C_4=0$ | | | $C_3=1$ | | $C_2=1$ | | $C_1=1$ | |
| Sum | | 1 | | 0 | | 0 | | 0 | |

Result: $0111 + 0001 = 1000$ = $-8$ in two's complement. Since $V = C_3 \oplus C_4 = 1 \oplus 0 = 1$, overflow is detected. The result should be $+8$, which cannot be represented in 4-bit signed format ($-8$ to $+7$).

In the adder-subtractor circuit, the overflow flag is generated by XORing the last two carries, providing automatic signed overflow detection for both addition and subtraction.

#### Diagram: Adder-Subtractor Circuit Builder

<iframe src="../sims/adder-subtractor-builder/main.html" width="100%" height="700px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">3.6 Comparator Circuits</h2>

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

### Design Walkthrough: 2-Bit Magnitude Comparator

Let us design a 2-bit comparator from scratch. Inputs are $A = A_1A_0$ and $B = B_1B_0$; outputs are $G$ (A > B), $L$ (A < B), and $E$ (A = B).

**Step 1: Truth table** (16 rows for two 2-bit inputs)

| $A_1$ | $A_0$ | $B_1$ | $B_0$ | A (dec) | B (dec) | G | E | L |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 0 |
| 0 | 0 | 0 | 1 | 0 | 1 | 0 | 0 | 1 |
| 0 | 0 | 1 | 0 | 0 | 2 | 0 | 0 | 1 |
| 0 | 0 | 1 | 1 | 0 | 3 | 0 | 0 | 1 |
| 0 | 1 | 0 | 0 | 1 | 0 | 1 | 0 | 0 |
| 0 | 1 | 0 | 1 | 1 | 1 | 0 | 1 | 0 |
| 0 | 1 | 1 | 0 | 1 | 2 | 0 | 0 | 1 |
| 0 | 1 | 1 | 1 | 1 | 3 | 0 | 0 | 1 |
| 1 | 0 | 0 | 0 | 2 | 0 | 1 | 0 | 0 |
| 1 | 0 | 0 | 1 | 2 | 1 | 1 | 0 | 0 |
| 1 | 0 | 1 | 0 | 2 | 2 | 0 | 1 | 0 |
| 1 | 0 | 1 | 1 | 2 | 3 | 0 | 0 | 1 |
| 1 | 1 | 0 | 0 | 3 | 0 | 1 | 0 | 0 |
| 1 | 1 | 0 | 1 | 3 | 1 | 1 | 0 | 0 |
| 1 | 1 | 1 | 0 | 3 | 2 | 1 | 0 | 0 |
| 1 | 1 | 1 | 1 | 3 | 3 | 0 | 1 | 0 |

**Step 2: Derive expressions** using the MSB-first comparison approach:

$$E = (A_1 \odot B_1)(A_0 \odot B_0)$$

$$G = A_1\overline{B_1} + (A_1 \odot B_1) A_0 \overline{B_0}$$

$$L = \overline{A_1} B_1 + (A_1 \odot B_1) \overline{A_0} B_0$$

**Step 3: Count gates** — $G$ requires 2 AND gates (one 2-input, one 3-input), 1 OR gate, 1 XNOR gate, and 1 inverter. The cascading approach used in the 74LS85 generalizes this pattern to 4 bits and adds cascade inputs for wider comparisons, which is more practical than expanding the truth table to 256 rows for an 8-bit comparator.

Try the interactive magnitude comparator below — set the A and B inputs and observe the G, E, L outputs:

<iframe src="../sims/magnitude-comparator/main.html" width="100%" height="640px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">3.7 Parity Circuits</h2>

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

### Beyond Parity: Hamming Codes

The limitation of parity — detecting but not correcting errors — motivated Richard Hamming to develop **Hamming codes** in 1950. A Hamming code adds multiple parity bits, each covering a different subset of data bits. By checking which parity bits fail, the receiver can identify and correct the exact bit that flipped.

For a 7-bit Hamming code (4 data bits + 3 parity bits), each parity bit covers specific positions:

| Parity Bit | Covers Positions | Check |
|------------|-----------------|-------|
| $P_1$ (pos 1) | 1, 3, 5, 7 | Odd positions |
| $P_2$ (pos 2) | 2, 3, 6, 7 | Positions with bit 1 set in index |
| $P_4$ (pos 4) | 4, 5, 6, 7 | Positions with bit 2 set in index |

The **syndrome** — the binary number formed by the failing parity checks — directly gives the position of the error. For example, if $P_1$ and $P_4$ fail but $P_2$ passes, the syndrome is $101_2 = 5$, meaning position 5 is corrupt.

### Practical Applications of Parity

Parity checking appears in many real systems:

- **UART serial communication** (Unit 13) optionally includes a parity bit after each 8-bit data byte, allowing the receiver to detect single-bit transmission errors
- **Computer memory (ECC RAM)** uses extended Hamming codes to detect and correct single-bit errors in real time, which is critical for servers where memory errors could crash operating systems
- **Hard drives and SSDs** use more powerful error-correcting codes (Reed-Solomon, LDPC) based on the same algebraic principles, enabling reliable storage despite physical media imperfections

The progression from simple parity → Hamming codes → advanced ECC illustrates a common engineering theme: trading redundancy (extra bits) for reliability (error tolerance).

#### Diagram: Parity Generator/Checker Simulator

<iframe src="../sims/parity-circuit-simulator/main.html" width="100%" height="500px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">3.8 Code Converters</h2>

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

$$G_n = B_n \qquad \text{(MSB is unchanged)}$$

$$G_i = B_{i+1} \oplus B_i \qquad \text{(for all other bits)}$$

For 4 bits:

$$
\begin{aligned}
G_3 &= B_3 \\[4pt]
G_2 &= B_3 \oplus B_2 \\[4pt]
G_1 &= B_2 \oplus B_1 \\[4pt]
G_0 &= B_1 \oplus B_0
\end{aligned}
$$

### Gray to Binary Conversion

The reverse conversion:

$$B_n = G_n$$

$$B_i = B_{i+1} \oplus G_i$$

### BCD to Binary Conversion

A **BCD to binary converter** is more complex, requiring arithmetic operations to combine the weighted digit values. For 2-digit BCD (00-99):

$$\text{Binary} = 10 \times \text{tens digit} + \text{units digit}$$

This requires multipliers and adders, making the circuit significantly more complex than Gray code converters.

#### Diagram: Code Converter Demonstrator

<iframe src="../sims/code-converter-demo/main.html" width="100%" height="700px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">3.9 Seven-Segment Display Decoder</h2>

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

### Active-Low Decoder Design

Many real seven-segment displays are **common-anode**, meaning segments illuminate when their control signal is LOW (0). Designing for active-low output simply inverts the truth table — each segment output becomes 0 when the segment should be ON and 1 when OFF.

For the active-high truth table above, the active-low version is obtained by complementing every output. Alternatively, design the active-high decoder first and add inverters at each output. Commercial ICs offer both: the 7448 drives common-cathode (active-high), while the 7447 drives common-anode (active-low).

### BCD Input Validation

Since BCD uses only codes 0000–1001, inputs 1010 through 1111 are invalid. A **BCD validation circuit** detects these invalid codes and can blank the display or signal an error:

$$\text{Invalid} = B_3(B_2 + B_1)$$

**Derivation:** An input is invalid when the decimal value exceeds 9. The six invalid codes (10–15) all have $B_3 = 1$ AND either $B_2 = 1$ or $B_1 = 1$:

| Invalid BCD | $B_3$ | $B_2$ | $B_1$ | $B_2 + B_1$ |
|:-----------:|:-----:|:-----:|:-----:|:----------:|
| 1010 | 1 | 0 | 1 | 1 |
| 1011 | 1 | 0 | 1 | 1 |
| 1100 | 1 | 1 | 0 | 1 |
| 1101 | 1 | 1 | 0 | 1 |
| 1110 | 1 | 1 | 1 | 1 |
| 1111 | 1 | 1 | 1 | 1 |

This simple 3-gate circuit (one OR, one AND, one AND for the enable) protects the display from showing garbage when invalid data appears on the BCD bus — a practical necessity in any real decoder design.

#### Diagram: Seven-Segment Decoder Simulator

<iframe src="../sims/seven-segment-decoder/main.html?v=6" width="100%" height="700px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">3.10 Incompletely Specified Functions</h2>

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

Without don't cares (treating X as 0): $F = \overline{A}\overline{B}\overline{C} + \overline{A}B\overline{C} + AB\overline{C} + ABC = \overline{A}\overline{C} + AB$ (4 literals)

Using don't cares strategically (treating row 011 as 1):

$$F = \overline{A}\overline{C} + \overline{A}B + AB = \overline{A}\overline{C} + B(\overline{A} + A) = \overline{A}\overline{C} + B$$

**Result:** $F = \overline{A}\overline{C} + B$ (3 literals — simpler than without don't cares!)

K-maps (Unit 5) provide a systematic visual method for exploiting don't cares optimally.

#### Diagram: Don't Care Optimizer

<iframe src="../sims/dont-care-optimizer/main.html" width="100%" height="550px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">Summary and Key Takeaways</h2>

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
    $C_{out} = AB + AC_{in} + BC_{in}$. The carry is produced when at least two of the three inputs are 1.

??? question "Self-Check: Why is Gray code useful for position encoders?"
    In Gray code, adjacent positions differ by only one bit. This prevents ambiguous readings when a sensor is between positions—only one bit can be changing at a time, eliminating glitches.

??? question "Self-Check: How do don't cares help circuit simplification?"
    Don't cares can be assigned either 0 or 1 during optimization. By strategically choosing these values, larger groups can be formed in K-maps, resulting in simpler Boolean expressions with fewer gates.

??? question "Self-Check: Design a voting circuit for a 4-person panel that approves when at least 3 members vote yes."
    With inputs $A$, $B$, $C$, $D$, the output is 1 when 3 or 4 inputs are 1. The SOP expression is: $F = BCD + ACD + ABD + ABC$. This can also be written as $F = AB(C+D) + CD(A+B)$, requiring fewer gates. Notice that this is a generalization of the 3-input majority function.

??? question "Self-Check: What is the borrow output equation for a full subtractor?"
    $B_{out} = \overline{A}B + \overline{A}B_{in} + BB_{in}$. A borrow is produced when the subtrahend bits ($B$ and $B_{in}$) "overpower" the minuend bit $A$. Compare this with the carry-out of a full adder: $C_{out} = AB + AC_{in} + BC_{in}$ — the borrow equation has the same structure but with $A$ complemented.

??? question "Self-Check: Verify that Gray codes 0110 and 0111 differ by exactly one bit."
    Gray code 0110 (decimal 4) and 0111 (decimal 5) differ only in bit position 0 — the rightmost bit changes from 0 to 1. This single-bit-change property holds for all adjacent Gray code values, which is why Gray codes prevent glitch errors in position encoders and are used for labeling K-map cells.

??? question "Self-Check: For the seven-segment display, which segments are active to display the digit '7'?"
    Segments a, b, and c are active (1) while segments d, e, f, and g are inactive (0). This matches the top horizontal bar, upper-right vertical, and lower-right vertical segments forming the numeral 7.

??? question "Self-Check: How does the carry-lookahead adder avoid the ripple carry delay?"
    Instead of waiting for each carry to propagate sequentially through every stage, the CLA computes generate ($G_i = A_i B_i$) and propagate ($P_i = A_i \oplus B_i$) signals for each bit. These allow every carry to be expressed as a function of the original inputs and $C_{in}$ only, so all carries are computed in parallel after just two gate delays regardless of adder width.

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">Interactive Walkthrough</h2>

Step through the complete design of a full adder from truth table to gate circuit:

<iframe src="../sims/full-adder-walkthrough/main.html" width="100%" height="640px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>

---

[Take the Unit Quiz](./quiz.md) | [See Annotated References](./references.md)

</div>
