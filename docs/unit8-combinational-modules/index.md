---
title: Combinational Logic Modules
description: Multiplexers, decoders, encoders, and demultiplexers for digital system design
generated_by: claude skill chapter-content-generator
date: 2026-02-04 21:30:00
version: 0.03
---

# Unit 8: Combinational Logic Modules

## Summary

This unit introduces medium-scale integration (MSI) combinational logic modules that serve as fundamental building blocks in digital system design. Multiplexers, demultiplexers, encoders, and decoders perform essential data routing and code conversion functions. Students will learn the internal structure and operation of these modules, understand their role in implementing arbitrary Boolean functions, and apply them to practical design problems including memory addressing, data bus management, and code translation.

## Concepts Covered

1. Combinational Building Blocks
2. Multiplexer (MUX) Fundamentals
3. 2-to-1 Multiplexer Structure
4. 4-to-1 Multiplexer Structure
5. 8-to-1 and Larger Multiplexers
6. Multiplexer Tree Expansion
7. Implementing Functions with MUX
8. Shannon Expansion and MUX
9. Demultiplexer (DEMUX) Fundamentals
10. Decoder Fundamentals
11. 2-to-4 Decoder Structure
12. 3-to-8 Decoder Structure
13. Decoder Enable Inputs
14. Decoder Tree Expansion
15. Implementing Functions with Decoders
16. Minterm Generation with Decoders
17. Encoder Fundamentals
18. Priority Encoder Operation
19. 8-to-3 Priority Encoder
20. Binary-to-Gray Code Converter
21. Gray-to-Binary Code Converter
22. BCD-to-Seven-Segment Decoder
23. Comparator Circuits
24. Magnitude Comparator Design
25. Cascading Combinational Modules

## Prerequisites

Before studying this unit, students should be familiar with:

- Boolean algebra and logic gates (Unit 2)
- Minterms and canonical forms (Unit 4)
- K-map simplification (Unit 5)
- Shannon expansion theorem (Unit 4)
- Binary number systems (Unit 1)

---

## 8.1 Introduction to Combinational Building Blocks

Digital systems are built from a hierarchy of modules, from basic gates to complex subsystems. **Medium-scale integration (MSI) modules** occupy an important middle ground—they are complex enough to perform useful functions but simple enough to understand completely and use as building blocks.

The key MSI combinational modules include:

| Module | Function | Typical Notation |
|--------|----------|------------------|
| Multiplexer | Select one of many inputs | MUX, M |
| Demultiplexer | Route one input to many outputs | DEMUX |
| Decoder | Convert binary code to one-hot | DEC |
| Encoder | Convert one-hot to binary code | ENC |
| Priority Encoder | Encode highest-priority active input | PENC |

These modules are available as discrete ICs (like the 74-series TTL family) and as library cells in FPGA and ASIC design flows.

!!! info "Design Philosophy"
    Modern digital design often uses these modules directly rather than designing equivalent gate-level circuits. This improves design productivity, readability, and often synthesis tool optimization.

## 8.2 Multiplexers

A **multiplexer (MUX)** is a data selector that chooses one of several input signals and forwards it to a single output based on select signals. Think of it as a digitally-controlled multi-way switch.

### 8.2.1 2-to-1 Multiplexer

The simplest multiplexer has two data inputs ($D_0$, $D_1$), one select input ($S$), and one output ($Y$).

**Truth Table:**

| S | Y |
|---|---|
| 0 | $D_0$ |
| 1 | $D_1$ |

**Boolean Expression:**
$$Y = S'D_0 + SD_1$$

The select signal $S$ determines which data input passes through to the output.

### 8.2.2 4-to-1 Multiplexer

A 4-to-1 MUX has four data inputs ($D_0$ through $D_3$), two select inputs ($S_1$, $S_0$), and one output.

**Boolean Expression:**
$$Y = S_1'S_0'D_0 + S_1'S_0D_1 + S_1S_0'D_2 + S_1S_0D_3$$

| $S_1$ | $S_0$ | Y |
|-------|-------|---|
| 0 | 0 | $D_0$ |
| 0 | 1 | $D_1$ |
| 1 | 0 | $D_2$ |
| 1 | 1 | $D_3$ |

#### Diagram: 4-to-1 Multiplexer Structure

<details markdown="1">
<summary>Internal Gate Structure of 4-to-1 MUX</summary>
Type: diagram

Create a detailed gate-level diagram of a 4-to-1 multiplexer showing:

Inputs (left side):
- D0, D1, D2, D3 (data inputs)
- S1, S0 (select inputs)

Internal structure:
- Two NOT gates generating S1' and S0'
- Four 3-input AND gates
- One 4-input OR gate

Output (right side):
- Y (output)

Additional elements:
- Wire labels showing intermediate signals
- Select signal routing highlighted
- Standard logic gate symbols

Visual specifications:
- Canvas: 600×450px responsive
- Color coding: data path (blue), select path (green), output (red)
- Interactive: hover to highlight selected data path based on S1S0 value

Implementation: p5.js with interactive select input toggles
</details>

### 8.2.3 Implementing Functions with Multiplexers

A powerful application of multiplexers is implementing arbitrary Boolean functions. An $n$-variable function can be implemented using a $2^{n-1}$-to-1 MUX with one variable connected to the data inputs.

**Method (using Shannon Expansion):**

For function $F(A, B, C)$:

1. Use $A$ and $B$ as select inputs for a 4-to-1 MUX
2. For each combination of $A$ and $B$, determine if $F = 0$, $F = 1$, $F = C$, or $F = C'$
3. Connect the appropriate signal to each data input

**Example:** Implement $F(A, B, C) = \sum m(1, 2, 6, 7)$

| A | B | F (when C=0) | F (when C=1) | Data Input |
|---|---|--------------|--------------|------------|
| 0 | 0 | 0 | 1 | C |
| 0 | 1 | 1 | 0 | C' |
| 1 | 0 | 0 | 0 | 0 |
| 1 | 1 | 1 | 1 | 1 |

Connect: $D_0 = C$, $D_1 = C'$, $D_2 = 0$, $D_3 = 1$

#### Diagram: MUX Function Implementation

<details markdown="1">
<summary>Interactive MUX Function Implementation Tool</summary>
Type: MicroSim

Learning objective: Apply multiplexers to implement Boolean functions using Shannon expansion (Bloom Level: Apply)

Create an interactive tool where users:
1. Enter a 3-variable Boolean function (minterms or expression)
2. See the truth table generated automatically
3. Watch the Shannon expansion analysis
4. See the resulting MUX implementation with proper data input connections

Controls:
- Minterm input field (comma-separated indices)
- "Generate" button
- Variable assignment selector (which variable goes to data inputs)
- Test inputs (toggle A, B, C values)

Visual elements:
- Truth table display
- Shannon expansion table
- 4-to-1 MUX diagram with data input labels
- Output value display
- Signal flow highlighting

Canvas: 700×550px responsive

Implementation: p5.js
</details>

## 8.3 Demultiplexers

A **demultiplexer (DEMUX)** performs the inverse function of a multiplexer—it routes a single input to one of several outputs based on select signals.

### 8.3.1 1-to-4 Demultiplexer

A 1-to-4 DEMUX has one data input ($D$), two select inputs ($S_1$, $S_0$), and four outputs ($Y_0$ through $Y_3$).

**Boolean Expressions:**
$$Y_0 = S_1'S_0'D$$
$$Y_1 = S_1'S_0D$$
$$Y_2 = S_1S_0'D$$
$$Y_3 = S_1S_0D$$

| $S_1$ | $S_0$ | Active Output |
|-------|-------|---------------|
| 0 | 0 | $Y_0 = D$ |
| 0 | 1 | $Y_1 = D$ |
| 1 | 0 | $Y_2 = D$ |
| 1 | 1 | $Y_3 = D$ |

All other outputs remain at 0 when not selected.

!!! note "DEMUX-Decoder Relationship"
    A demultiplexer with its data input held at 1 functions as a decoder. Similarly, a decoder with an enable input can function as a demultiplexer when the enable serves as the data input.

## 8.4 Decoders

A **decoder** converts an $n$-bit binary input code into $2^n$ output lines, with exactly one output active for each input combination. This creates a "one-hot" encoding.

### 8.4.1 2-to-4 Decoder

A 2-to-4 decoder has two inputs ($A_1$, $A_0$) and four outputs ($Y_0$ through $Y_3$).

**Boolean Expressions:**
$$Y_0 = A_1'A_0'$$
$$Y_1 = A_1'A_0$$
$$Y_2 = A_1A_0'$$
$$Y_3 = A_1A_0$$

Each output represents a minterm of the input variables!

| $A_1$ | $A_0$ | $Y_0$ | $Y_1$ | $Y_2$ | $Y_3$ |
|-------|-------|-------|-------|-------|-------|
| 0 | 0 | 1 | 0 | 0 | 0 |
| 0 | 1 | 0 | 1 | 0 | 0 |
| 1 | 0 | 0 | 0 | 1 | 0 |
| 1 | 1 | 0 | 0 | 0 | 1 |

### 8.4.2 3-to-8 Decoder

A 3-to-8 decoder has three inputs and eight outputs. Each output corresponds to one of the eight possible 3-bit input combinations (minterms $m_0$ through $m_7$).

**Applications:**
- Memory address decoding
- Instruction decoding in processors
- Minterm generation for function implementation

### 8.4.3 Decoder Enable Inputs

Many decoders include an **enable** input ($E$ or $\overline{E}$). When disabled, all outputs are inactive regardless of the select inputs.

**With active-high enable:**
$$Y_i = E \cdot m_i$$

**With active-low enable:**
$$Y_i = \overline{E}' \cdot m_i$$

Enable inputs allow:
- Power saving (disable unused sections)
- Cascade multiple decoders for expansion
- Demultiplexer functionality

#### Diagram: Decoder with Enable for Cascade

<details markdown="1">
<summary>Cascading 3-to-8 Decoders to Create 4-to-16 Decoder</summary>
Type: diagram

Show how two 3-to-8 decoders with enable inputs combine to form a 4-to-16 decoder:

Components:
- Two 3-to-8 decoder blocks
- One inverter for the enable logic

Connections:
- A2, A1, A0 connected to both decoders (shared)
- A3 connected to enable of upper decoder (direct) and lower decoder (inverted)

Labeling:
- Outputs Y0-Y7 from lower decoder (when A3=0)
- Outputs Y8-Y15 from upper decoder (when A3=1)

Visual specifications:
- Block diagram style
- Clear enable signal routing
- Truth table showing which decoder is active
- Canvas: 550×400px responsive

Implementation: p5.js or SVG
</details>

### 8.4.4 Implementing Functions with Decoders

Since a decoder generates all minterms, any Boolean function can be implemented by OR-ing the appropriate minterm outputs.

**Example:** Implement $F(A, B, C) = \sum m(1, 2, 6, 7)$

Use a 3-to-8 decoder:
$$F = Y_1 + Y_2 + Y_6 + Y_7$$

This is a direct implementation of the minterm expansion—connect the decoder outputs for minterms 1, 2, 6, and 7 to an OR gate.

## 8.5 Encoders

An **encoder** performs the inverse function of a decoder—it converts a one-hot input (one of $2^n$ lines active) into an $n$-bit binary code.

### 8.5.1 Basic 4-to-2 Encoder

A 4-to-2 encoder has four inputs ($D_0$ through $D_3$) and two outputs ($Y_1$, $Y_0$).

**Assumption:** Exactly one input is active at a time.

**Boolean Expressions:**
$$Y_1 = D_2 + D_3$$
$$Y_0 = D_1 + D_3$$

| Active Input | $Y_1$ | $Y_0$ |
|--------------|-------|-------|
| $D_0$ | 0 | 0 |
| $D_1$ | 0 | 1 |
| $D_2$ | 1 | 0 |
| $D_3$ | 1 | 1 |

### 8.5.2 Priority Encoder

A **priority encoder** handles the case where multiple inputs may be active simultaneously by encoding the highest-priority input (typically the highest-numbered active input).

**8-to-3 Priority Encoder:**

| Inputs (D7-D0) | $Y_2$ | $Y_1$ | $Y_0$ | Valid |
|----------------|-------|-------|-------|-------|
| 0000 0000 | X | X | X | 0 |
| 0000 0001 | 0 | 0 | 0 | 1 |
| 0000 001X | 0 | 0 | 1 | 1 |
| 0000 01XX | 0 | 1 | 0 | 1 |
| ... | ... | ... | ... | ... |
| 1XXX XXXX | 1 | 1 | 1 | 1 |

The **Valid** output indicates whether any input is active.

!!! tip "Application"
    Priority encoders are essential in interrupt handling systems where multiple interrupt requests may arrive simultaneously, and the processor must service the highest-priority request first.

## 8.6 Code Converters

Code converters translate between different binary coding schemes.

### 8.6.1 Binary-to-Gray Code Converter

Gray code has the property that adjacent codes differ by only one bit, useful in rotary encoders and reducing errors during transitions.

**Conversion formulas:**
$$G_{n-1} = B_{n-1}$$
$$G_i = B_{i+1} \oplus B_i \text{ for } i = n-2, ..., 0$$

| Binary | Gray |
|--------|------|
| 000 | 000 |
| 001 | 001 |
| 010 | 011 |
| 011 | 010 |
| 100 | 110 |
| 101 | 111 |
| 110 | 101 |
| 111 | 100 |

### 8.6.2 Gray-to-Binary Code Converter

**Conversion formulas:**
$$B_{n-1} = G_{n-1}$$
$$B_i = B_{i+1} \oplus G_i \text{ for } i = n-2, ..., 0$$

#### Diagram: Code Converter Circuit

<details markdown="1">
<summary>Binary-Gray Code Converter Circuits</summary>
Type: diagram

Create side-by-side diagrams showing:

Left: Binary-to-Gray Converter (4-bit)
- Four input lines B3, B2, B1, B0
- Three XOR gates
- Four output lines G3, G2, G1, G0
- Show: G3=B3, G2=B3⊕B2, G1=B2⊕B1, G0=B1⊕B0

Right: Gray-to-Binary Converter (4-bit)
- Four input lines G3, G2, G1, G0
- Three XOR gates
- Four output lines B3, B2, B1, B0
- Show cascade: B3=G3, B2=B3⊕G2, B1=B2⊕G1, B0=B1⊕G0

Visual specifications:
- Standard XOR gate symbols
- Clear signal flow arrows
- Wire labels
- Canvas: 650×350px responsive

Implementation: p5.js or SVG
</details>

## 8.7 BCD-to-Seven-Segment Decoder

A **BCD-to-seven-segment decoder** converts a 4-bit BCD input (0-9) to seven outputs that drive a seven-segment display.

**Segment naming convention:**
```
   a
  ---
f|   |b
  -g-
e|   |c
  ---
   d
```

Each segment has its own Boolean function based on the BCD input. For example:
$$a = A'B'C'D' + A'B'CD' + A'BC'D + A'BCD + AB'C'D + ...$$

**Truth Table (partial):**

| BCD | a | b | c | d | e | f | g | Display |
|-----|---|---|---|---|---|---|---|---------|
| 0000 | 1 | 1 | 1 | 1 | 1 | 1 | 0 | 0 |
| 0001 | 0 | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| 0010 | 1 | 1 | 0 | 1 | 1 | 0 | 1 | 2 |
| ... | ... | ... | ... | ... | ... | ... | ... | ... |

Inputs 10-15 (invalid BCD) are typically don't cares for optimization.

## 8.8 Comparator Circuits

**Comparators** determine the relationship between two binary numbers.

### 8.8.1 1-Bit Comparator

For two 1-bit inputs $A$ and $B$:
$$A = B: \quad E = A \odot B = (AB + A'B')$$
$$A > B: \quad G = AB'$$
$$A < B: \quad L = A'B$$

### 8.8.2 4-Bit Magnitude Comparator

A 4-bit magnitude comparator compares two 4-bit numbers and produces three outputs: $A > B$, $A = B$, $A < B$.

**Cascading:** For comparing larger numbers, magnitude comparators include cascade inputs to connect multiple stages. The comparison proceeds from the most significant bits downward.

| Comparison at bit $i$ | Result |
|----------------------|--------|
| $A_i > B_i$ | A > B (done) |
| $A_i < B_i$ | A < B (done) |
| $A_i = B_i$ | Compare next lower bit |

## 8.9 Summary

This unit covered the essential MSI combinational building blocks:

- **Multiplexers** select one of many inputs based on select signals
- **MUX function implementation** uses Shannon expansion to implement any Boolean function
- **Demultiplexers** route a single input to one of many outputs
- **Decoders** generate minterms for function implementation and address decoding
- **Encoders** convert one-hot inputs to binary codes
- **Priority encoders** handle multiple active inputs by selecting the highest priority
- **Code converters** translate between different coding schemes (Binary, Gray, BCD)
- **Seven-segment decoders** drive display devices
- **Comparators** determine magnitude relationships between numbers

These modules form the foundation for larger digital systems including memory systems, data paths, and control units.
