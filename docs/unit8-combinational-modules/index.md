---
title: Combinational Logic Modules
description: Multiplexers, decoders, encoders, and demultiplexers for digital system design
generated_by: claude skill chapter-content-generator
date: 2026-02-05 15:30:00
version: 0.03
---

<div class="unit1-styled" markdown>

# Unit 8: Combinational Logic Modules

<details class="video-overview">
<summary><strong>Unit Overview</strong> (click to expand)</summary>

Welcome to Unit 8, where we move beyond individual gates and start working with combinational logic modules — the medium-scale building blocks that make complex digital systems practical to design.

We will begin with the multiplexer, or MUX, one of the most versatile modules in digital design. A multiplexer selects one of several input signals and routes it to a single output, controlled by selection lines. Interestingly, a MUX can also implement arbitrary Boolean functions — a single eight-to-one MUX can replace an entire network of gates for any three-variable function.

Working in the opposite direction, we have the demultiplexer, or DEMUX, which takes a single input and routes it to one of many outputs. Together, MUX and DEMUX form the foundation of data routing in everything from communication systems to memory buses.

Next, we explore encoders and decoders. An encoder converts one active input line into a compact binary code. Priority encoders report only the highest-priority active input. Decoders do the reverse, taking a binary code and activating exactly one output line — essential for address decoding in memory systems.

We will also cover magnitude comparators, which determine whether one binary number is greater than, less than, or equal to another, and code converters, particularly the conversion between standard binary and Gray code.

**Key Takeaways**

1. Multiplexers and demultiplexers are fundamental data-routing components, and a MUX can implement any Boolean function of its select variables.
2. Encoders compress information into binary codes while decoders expand binary codes to activate individual lines — both are essential for address decoding and priority arbitration.
3. Magnitude comparators and code converters such as Binary-to-Gray round out a practical toolkit of combinational modules used throughout real digital systems.

</details>

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

Digital systems are constructed from a hierarchy of modules, ranging from individual logic gates to complex subsystems. In previous units, we designed circuits directly from Boolean expressions using basic gates. While this approach works for small functions, larger designs demand a higher level of abstraction. **Combinational building blocks** are pre-designed functional units that perform common operations, allowing designers to think in terms of data selection, routing, and code conversion rather than individual gates.

These modules belong to the category of **medium-scale integration (MSI)** devices, historically containing tens to hundreds of gates within a single integrated circuit package. The key MSI combinational modules include:

| Module | Function | Inputs | Outputs | Typical Notation |
|--------|----------|--------|---------|------------------|
| Multiplexer | Select one of $2^n$ inputs | $2^n$ data + $n$ select | 1 | MUX |
| Demultiplexer | Route input to one of $2^n$ outputs | 1 data + $n$ select | $2^n$ | DEMUX |
| Decoder | Convert $n$-bit code to one-hot | $n$ | $2^n$ | DEC |
| Encoder | Convert one-hot to $n$-bit code | $2^n$ | $n$ | ENC |
| Priority Encoder | Encode highest-priority active input | $2^n$ | $n$ + valid | PENC |
| Comparator | Compare two $n$-bit numbers | $2n$ | 3 (>, =, <) | COMP |

These modules are available as discrete ICs in the 74-series TTL and 4000-series CMOS families, and as library cells in FPGA and ASIC design flows. Understanding their internal structure is essential for three reasons:

- **Design verification:** Knowing how a module works enables debugging and testing
- **Custom implementations:** Some designs require modified versions of standard modules
- **Function implementation:** MUX and decoder modules can implement arbitrary Boolean functions, often more efficiently than gate-level designs

!!! info "Design Philosophy"
    Modern digital design often instantiates these modules directly from HDL (Verilog/VHDL) rather than designing equivalent gate-level circuits. Synthesis tools recognize these patterns and map them to optimized library cells.

---

## 8.2 Multiplexer Fundamentals

A **multiplexer (MUX)** is a data selector that chooses one of several input signals and forwards it to a single output based on select (control) signals. It functions as a digitally controlled multi-position switch: the select inputs determine which data input is connected to the output.

A $2^n$-to-1 multiplexer has:

- $2^n$ data inputs ($D_0, D_1, ..., D_{2^n - 1}$)
- $n$ select inputs ($S_{n-1}, ..., S_1, S_0$)
- 1 output ($Y$)

The general Boolean expression for a $2^n$-to-1 MUX is:

$$Y = \sum_{i=0}^{2^n - 1} m_i \cdot D_i$$

where $m_i$ is the $i$-th minterm of the select inputs.

### 8.2.1 The 2-to-1 Multiplexer

The simplest multiplexer has two data inputs ($D_0$, $D_1$), one select input ($S$), and one output ($Y$).

**Boolean Expression:**

$$Y = \overline{S} \cdot D_0 + S \cdot D_1$$

When $S = 0$, the output equals $D_0$. When $S = 1$, the output equals $D_1$.

| $S$ | $Y$ |
|-----|-----|
| 0 | $D_0$ |
| 1 | $D_1$ |

The gate-level implementation requires one inverter, two AND gates, and one OR gate—a total of 4 gates. In CMOS, a 2:1 MUX can also be implemented efficiently using transmission gates (as discussed in Unit 7), requiring only 4 transistors plus an inverter.

### 8.2.2 The 4-to-1 Multiplexer

A 4-to-1 MUX has four data inputs ($D_0$ through $D_3$), two select inputs ($S_1$, $S_0$), and one output.

**Boolean Expression:**

$$Y = \overline{S_1}\,\overline{S_0}\,D_0 + \overline{S_1}\,S_0\,D_1 + S_1\,\overline{S_0}\,D_2 + S_1\,S_0\,D_3$$

Each term selects one data input: the select lines generate the corresponding minterm, which acts as an enable for that data input.

| $S_1$ | $S_0$ | $Y$ |
|-------|-------|-----|
| 0 | 0 | $D_0$ |
| 0 | 1 | $D_1$ |
| 1 | 0 | $D_2$ |
| 1 | 1 | $D_3$ |

The gate-level structure consists of:

- 2 inverters (for $\overline{S_1}$ and $\overline{S_0}$)
- 4 three-input AND gates (one per data input)
- 1 four-input OR gate

Total: 7 gates.

### 8.2.3 The 8-to-1 and Larger Multiplexers

An 8-to-1 MUX extends the pattern to eight data inputs ($D_0$ through $D_7$) with three select inputs ($S_2$, $S_1$, $S_0$):

$$Y = \sum_{i=0}^{7} m_i(S_2, S_1, S_0) \cdot D_i$$

This requires 3 inverters, 8 four-input AND gates, and 1 eight-input OR gate. The 74151 is a classic 8-to-1 MUX IC.

For even larger multiplexers (16-to-1 and beyond), gate-level implementation becomes impractical due to fan-in limitations. Instead, **multiplexer tree expansion** builds larger MUXes from smaller ones.

| MUX Size | Select Inputs | Data Inputs | AND Gate Size | IC Example |
|----------|--------------|-------------|---------------|------------|
| 2:1 | 1 | 2 | 2-input | 74157 (quad) |
| 4:1 | 2 | 4 | 3-input | 74153 |
| 8:1 | 3 | 8 | 4-input | 74151 |
| 16:1 | 4 | 16 | 5-input | 74150 |

#### Diagram: Multiplexer Interactive Simulator

<iframe src="../sims/mux-simulator/main.html" width="100%" height="530px" scrolling="no"></iframe>

<details markdown="1">
<summary>Multiplexer Interactive Simulator</summary>
Type: microsim

Purpose: Interactive exploration of multiplexer operation for 2:1, 4:1, and 8:1 configurations

Bloom Level: Understand (L2)
Bloom Verb: Explain, demonstrate, predict

Learning Objective: Students will be able to explain how multiplexers select data inputs based on select signal values and predict the output for any input combination.

Canvas Layout:
- Top: MUX size selector (2:1, 4:1, 8:1)
- Left: Data input toggles (D0, D1, ... Dn)
- Center: MUX block diagram with internal gate structure
- Right: Select input toggles and output display
- Bottom: Truth table with current row highlighted

Visual Elements:
- MUX symbol (trapezoidal block) with labeled inputs and output
- Toggle switches for all data inputs and select inputs
- Active data path highlighted in blue
- Inactive paths grayed out
- Output LED indicator
- Internal gate structure shown in expandable panel
- Boolean expression display showing current evaluation

Interactive Controls:
- MUX size selector (2:1, 4:1, 8:1)
- Click/tap to toggle any data input (0/1)
- Click/tap to toggle any select input (0/1)
- "Show Internal Gates" toggle
- "Cycle All Select Combinations" button

Data Visibility Requirements:
- Current select combination displayed as binary and decimal
- Active data input clearly identified (highlighted, labeled)
- Signal values shown on all wires
- Truth table with current row highlighted
- Boolean expression with current values substituted

Default Parameters:
- MUX size: 4:1
- All data inputs: alternating 1,0,1,0
- Select: S1=0, S0=0

Behavior:
- Output updates instantly when any input changes
- Active path animates briefly when select changes
- Truth table scrolls to highlight current row
- Expression updates with concrete values

Instructional Rationale: Interactive toggling with visible signal paths lets students build intuition about data selection by experimenting with different select combinations and observing which data input reaches the output.

Implementation: p5.js with responsive canvas
</details>

---

## 8.3 Multiplexer Tree Expansion

When the required MUX size exceeds available components, smaller multiplexers can be cascaded to build larger ones. This technique, called **multiplexer tree expansion**, uses a hierarchical structure where the output of lower-level MUXes feeds the data inputs of higher-level MUXes.

### Building a 16-to-1 MUX from 4-to-1 MUXes

A 16-to-1 MUX requires 4 select lines ($S_3, S_2, S_1, S_0$). Using 4-to-1 MUXes:

**First level:** Four 4-to-1 MUXes, each selecting from 4 of the 16 data inputs using $S_1, S_0$:

- MUX A: selects among $D_0, D_1, D_2, D_3$
- MUX B: selects among $D_4, D_5, D_6, D_7$
- MUX C: selects among $D_8, D_9, D_{10}, D_{11}$
- MUX D: selects among $D_{12}, D_{13}, D_{14}, D_{15}$

**Second level:** One 4-to-1 MUX selects among the four first-level outputs using $S_3, S_2$.

Total: 5 four-to-1 MUXes implement a 16-to-1 MUX.

### General Tree Construction

To build a $2^n$-to-1 MUX from $2^k$-to-1 MUXes:

- **First level:** $2^{n-k}$ MUXes, each handling $2^k$ data inputs with select lines $S_{k-1}, ..., S_0$
- **Second level:** A $2^{n-k}$-to-1 MUX selecting among first-level outputs with $S_{n-1}, ..., S_k$

If the second level itself requires expansion, the process recurses.

| Target MUX | Building Block | First Level | Second Level | Total MUXes |
|-----------|---------------|-------------|--------------|-------------|
| 8:1 | 2:1 | 4 | 2 + 1 | 7 |
| 8:1 | 4:1 | 2 | 1 (2:1) | 3 |
| 16:1 | 4:1 | 4 | 1 | 5 |
| 32:1 | 8:1 | 4 | 1 (4:1) | 5 |

---

## 8.4 Implementing Boolean Functions with Multiplexers

One of the most powerful applications of multiplexers is implementing arbitrary Boolean functions. A $2^n$-to-1 MUX can implement any $n$-variable function by connecting the input variables to the select lines and the truth table output values to the data inputs.

### Direct Implementation (Full-Size MUX)

For an $n$-variable function, use a $2^n$-to-1 MUX:

1. Connect the $n$ input variables to the select lines
2. Connect each data input to 0 or 1 based on the truth table output

**Example:** Implement $F(A, B, C) = \sum m(1, 2, 6, 7)$ using an 8-to-1 MUX.

Connect $A, B, C$ to $S_2, S_1, S_0$. From the truth table:

| $A$ | $B$ | $C$ | $F$ | Data Input |
|-----|-----|-----|-----|------------|
| 0 | 0 | 0 | 0 | $D_0 = 0$ |
| 0 | 0 | 1 | 1 | $D_1 = 1$ |
| 0 | 1 | 0 | 1 | $D_2 = 1$ |
| 0 | 1 | 1 | 0 | $D_3 = 0$ |
| 1 | 0 | 0 | 0 | $D_4 = 0$ |
| 1 | 0 | 1 | 0 | $D_5 = 0$ |
| 1 | 1 | 0 | 1 | $D_6 = 1$ |
| 1 | 1 | 1 | 1 | $D_7 = 1$ |

### Shannon Expansion Method (Reduced MUX)

A more efficient approach uses an $n$-variable function with a $2^{n-1}$-to-1 MUX. The **Shannon expansion theorem** states:

$$F(X_1, ..., X_n) = \overline{X_n} \cdot F(X_1, ..., X_{n-1}, 0) + X_n \cdot F(X_1, ..., X_{n-1}, 1)$$

This means one variable can be "absorbed" into the data inputs rather than using a select line.

**Procedure for using a $2^{n-1}$-to-1 MUX:**

1. Choose one variable (typically the one that simplifies the most) for the data inputs
2. Use the remaining $n-1$ variables as select inputs
3. For each select combination, determine if $F$ equals 0, 1, the chosen variable, or its complement
4. Connect the appropriate value to each data input

**Example:** Implement $F(A, B, C) = \sum m(1, 2, 6, 7)$ using a 4-to-1 MUX.

Choose $C$ for the data inputs; use $A, B$ as select lines ($S_1 = A$, $S_0 = B$).

| $A$ | $B$ | $F$ when $C=0$ | $F$ when $C=1$ | Data Input |
|-----|-----|----------------|----------------|------------|
| 0 | 0 | $F(0,0,0) = 0$ | $F(0,0,1) = 1$ | $D_0 = C$ |
| 0 | 1 | $F(0,1,0) = 1$ | $F(0,1,1) = 0$ | $D_1 = \overline{C}$ |
| 1 | 0 | $F(1,0,0) = 0$ | $F(1,0,1) = 0$ | $D_2 = 0$ |
| 1 | 1 | $F(1,1,0) = 1$ | $F(1,1,1) = 1$ | $D_3 = 1$ |

The data input values follow this logic:

- If $F = 0$ for both $C=0$ and $C=1$: connect to 0
- If $F = 1$ for both $C=0$ and $C=1$: connect to 1
- If $F = 0$ when $C=0$ and $F = 1$ when $C=1$: connect to $C$
- If $F = 1$ when $C=0$ and $F = 0$ when $C=1$: connect to $\overline{C}$

#### Diagram: MUX Function Implementation Tool

<iframe src="../sims/mux-simulator/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Interactive MUX Function Implementation Tool</summary>
Type: microsim

Purpose: Step-by-step demonstration of implementing Boolean functions using multiplexers with Shannon expansion

Bloom Level: Apply (L3)
Bloom Verb: Apply, implement, solve

Learning Objective: Students will be able to implement any Boolean function using a multiplexer by applying Shannon expansion to determine data input connections.

Canvas Layout:
- Top: Function input (minterm list or Boolean expression)
- Left: Truth table generated from function
- Center: Shannon expansion analysis table
- Right: MUX diagram with computed data input connections
- Bottom: Verification panel with test input toggles

Visual Elements:
- Truth table with color-coded output column
- Shannon expansion table showing F(C=0) and F(C=1) for each select combination
- 4-to-1 MUX symbol with data inputs labeled (0, 1, C, C')
- Signal path highlighting when testing
- Output LED matching truth table

Interactive Controls:
- Minterm input field (comma-separated: "1,2,6,7")
- "Generate" button to build truth table and MUX implementation
- Variable selector: choose which variable goes to data inputs (A, B, or C)
- Test input toggles for A, B, C
- "Step Through" mode to see derivation step by step
- "Try Another Function" button with random generation

Data Visibility Requirements:
- Complete truth table for the function
- Shannon expansion analysis for chosen variable
- Data input determination logic (0, 1, variable, complement)
- Final MUX configuration diagram
- Verification: toggling test inputs shows matching truth table output

Default Parameters:
- Function: F(A,B,C) = Σm(1,2,6,7)
- Data variable: C
- Mode: Complete view

Behavior:
- Truth table auto-generates from minterm input
- Shannon expansion table updates when variable selection changes
- MUX diagram updates data input labels
- Test mode highlights active path and verifies output
- Different variable choices produce different (but equivalent) implementations

Instructional Rationale: Seeing the complete derivation from truth table through Shannon expansion to MUX configuration builds procedural understanding. The ability to choose different variables for data inputs reinforces that multiple valid implementations exist.

Implementation: p5.js with DOM elements for input
</details>

---

## 8.5 Demultiplexer Fundamentals

A **demultiplexer (DEMUX)** performs the inverse function of a multiplexer—it routes a single data input to one of several outputs based on select signals. While a MUX is a "many-to-one" selector, a DEMUX is a "one-to-many" distributor.

A 1-to-$2^n$ demultiplexer has:

- 1 data input ($D$)
- $n$ select inputs ($S_{n-1}, ..., S_1, S_0$)
- $2^n$ outputs ($Y_0, Y_1, ..., Y_{2^n-1}$)

### 1-to-4 Demultiplexer

**Boolean Expressions:**

$$Y_0 = \overline{S_1}\,\overline{S_0} \cdot D$$
$$Y_1 = \overline{S_1}\,S_0 \cdot D$$
$$Y_2 = S_1\,\overline{S_0} \cdot D$$
$$Y_3 = S_1\,S_0 \cdot D$$

| $S_1$ | $S_0$ | Active Output |
|-------|-------|---------------|
| 0 | 0 | $Y_0 = D$ |
| 0 | 1 | $Y_1 = D$ |
| 1 | 0 | $Y_2 = D$ |
| 1 | 1 | $Y_3 = D$ |

All non-selected outputs remain at 0. Only the selected output carries the data signal.

### The DEMUX-Decoder Relationship

Comparing the DEMUX equations above with a 2-to-4 decoder with enable $E$:

$$Y_i(\text{decoder with enable}) = E \cdot m_i(S_1, S_0)$$

These are identical if we substitute $D = E$. This reveals an important equivalence:

- A **DEMUX** with data input $D$ = a **decoder** with enable input $E = D$
- A **decoder** with enable held at 1 = a **DEMUX** with data always 1 (which is just a decoder)

!!! tip "Practical Consequence"
    IC manufacturers often sell a single chip that can serve as either a decoder or a demultiplexer depending on how the enable/data input is used. The 74138 (3-to-8 decoder) is a common example.

### Applications of Demultiplexers

- **Data distribution:** Sending serial data to one of several destinations
- **Time-division demultiplexing:** Routing time-multiplexed channels to separate outputs
- **Address decoding:** Selecting one of several memory chips or peripheral devices
- **LED display multiplexing:** Routing data to individual display digits

---

## 8.6 Decoder Fundamentals

A **decoder** converts an $n$-bit binary input code into $2^n$ output lines, activating exactly one output for each input combination. This produces a **one-hot encoding** where only the output corresponding to the binary input value is active.

### 8.6.1 The 2-to-4 Decoder

The simplest useful decoder has two inputs ($A_1$, $A_0$) and four outputs ($Y_0$ through $Y_3$).

**Boolean Expressions:**

$$Y_0 = \overline{A_1}\,\overline{A_0} = m_0$$
$$Y_1 = \overline{A_1}\,A_0 = m_1$$
$$Y_2 = A_1\,\overline{A_0} = m_2$$
$$Y_3 = A_1\,A_0 = m_3$$

Each output is a **minterm** of the input variables. This is the key insight that makes decoders so useful for function implementation.

| $A_1$ | $A_0$ | $Y_0$ | $Y_1$ | $Y_2$ | $Y_3$ |
|-------|-------|-------|-------|-------|-------|
| 0 | 0 | 1 | 0 | 0 | 0 |
| 0 | 1 | 0 | 1 | 0 | 0 |
| 1 | 0 | 0 | 0 | 1 | 0 |
| 1 | 1 | 0 | 0 | 0 | 1 |

The gate-level implementation requires 2 inverters and 4 two-input AND gates.

### 8.6.2 The 3-to-8 Decoder

A 3-to-8 decoder has three inputs ($A_2$, $A_1$, $A_0$) and eight outputs ($Y_0$ through $Y_7$), generating all eight 3-variable minterms.

$$Y_i = m_i(A_2, A_1, A_0) \quad \text{for } i = 0, 1, ..., 7$$

The gate-level implementation requires 3 inverters and 8 three-input AND gates.

**Common IC:** The 74138 is a 3-to-8 decoder with three enable inputs ($G_1$, $\overline{G_{2A}}$, $\overline{G_{2B}}$) and active-low outputs.

### 8.6.3 Decoder Enable Inputs

Many decoders include **enable** inputs that control whether the decoder is active. When disabled, all outputs go to their inactive state (0 for active-high, 1 for active-low outputs).

**With active-high enable:**

$$Y_i = E \cdot m_i$$

**With active-low enable:**

$$Y_i = \overline{\overline{E}} \cdot m_i = \overline{E}' \cdot m_i$$

Enable inputs serve multiple purposes:

- **Power reduction:** Disable unused decoders to save power
- **Cascading:** Use the enable to expand decoder size (see next section)
- **DEMUX operation:** Use the enable as a data input for demultiplexer functionality
- **Glitch prevention:** Disable outputs during input transitions

#### Diagram: Decoder Interactive Simulator

<iframe src="../sims/decoder-simulator/main.html" width="100%" height="530px" scrolling="no"></iframe>

<details markdown="1">
<summary>Decoder Interactive Simulator</summary>
Type: microsim

Purpose: Interactive demonstration of decoder operation for 2-to-4 and 3-to-8 configurations with enable control

Bloom Level: Understand (L2)
Bloom Verb: Explain, predict, demonstrate

Learning Objective: Students will be able to predict which decoder output is active for any given input combination and explain the role of enable inputs.

Canvas Layout:
- Top: Decoder size selector (2-to-4, 3-to-8)
- Left: Input toggles (A2, A1, A0) and enable toggle
- Center: Decoder block diagram with internal AND gate structure
- Right: Output indicator LEDs (Y0 through Y7)
- Bottom: Truth table with current row highlighted

Visual Elements:
- Decoder block symbol with labeled inputs and outputs
- Input toggle switches
- Output LED indicators (green = active, gray = inactive)
- Internal gate structure (expandable)
- Enable input with status indicator
- Active output highlighted with bold label
- Minterm expression shown for active output

Interactive Controls:
- Decoder size selector (2-to-4, 3-to-8)
- Toggle input bits A2, A1, A0
- Toggle enable input
- "Show Internal Gates" toggle
- "Cycle All Inputs" animation button
- Binary/decimal display toggle for input value

Data Visibility Requirements:
- Binary input value and decimal equivalent
- Active output number and corresponding minterm
- All output values (0 or 1)
- Enable state and its effect
- Current truth table row highlighted

Default Parameters:
- Decoder: 3-to-8
- Inputs: A2=0, A1=0, A0=0
- Enable: 1 (active)

Behavior:
- Exactly one output active when enabled
- All outputs inactive when disabled
- Output indicator animates briefly when input changes
- Truth table row highlights follow input changes
- Internal gate view shows which AND gate is producing output

Instructional Rationale: Toggling inputs and observing which single output activates builds intuition about the one-hot decoding relationship between binary codes and individual output lines.

Implementation: p5.js with responsive canvas
</details>

---

## 8.7 Decoder Tree Expansion

Just as multiplexers can be cascaded into trees, decoders can be expanded using enable inputs to build larger decoders from smaller ones.

### Building a 4-to-16 Decoder from 3-to-8 Decoders

A 4-to-16 decoder requires 4 input bits ($A_3, A_2, A_1, A_0$) and produces 16 outputs ($Y_0$ through $Y_{15}$).

Using two 3-to-8 decoders with enable:

1. Both decoders receive $A_2, A_1, A_0$ as their select inputs
2. The **lower decoder** (outputs $Y_0$–$Y_7$) has its enable connected to $\overline{A_3}$
3. The **upper decoder** (outputs $Y_8$–$Y_{15}$) has its enable connected to $A_3$

When $A_3 = 0$: the lower decoder is active, producing minterms $m_0$ through $m_7$. The upper decoder is disabled (all outputs = 0).

When $A_3 = 1$: the upper decoder is active, producing minterms $m_8$ through $m_{15}$. The lower decoder is disabled.

### General Decoder Expansion

To build a $(n+k)$-to-$2^{n+k}$ decoder from $n$-to-$2^n$ decoders:

- Use $2^k$ copies of the $n$-to-$2^n$ decoder
- The lower $n$ bits of the address connect to all decoder select inputs (shared)
- A $k$-to-$2^k$ decoder generates the enable signals from the upper $k$ address bits

| Target | Building Block | Copies Needed | Enable Decoder |
|--------|---------------|---------------|----------------|
| 4-to-16 | 3-to-8 | 2 | 1-to-2 (inverter) |
| 5-to-32 | 3-to-8 | 4 | 2-to-4 |
| 6-to-64 | 3-to-8 | 8 | 3-to-8 |

---

## 8.8 Implementing Functions with Decoders

Since an $n$-to-$2^n$ decoder generates all $2^n$ minterms of its $n$ input variables, any Boolean function of those variables can be implemented by combining (OR-ing) the appropriate minterm outputs. This is called **minterm generation** and provides a direct, systematic method for function implementation.

### Procedure

1. Express the function in canonical SOP form: $F = \sum m(...)$
2. Use an $n$-to-$2^n$ decoder with the function variables as inputs
3. Connect the decoder outputs corresponding to the function's minterms to an OR gate

**Example:** Implement $F(A, B, C) = \sum m(1, 2, 6, 7)$ using a 3-to-8 decoder.

$$F = m_1 + m_2 + m_6 + m_7 = Y_1 + Y_2 + Y_6 + Y_7$$

Connect outputs $Y_1$, $Y_2$, $Y_6$, and $Y_7$ to a 4-input OR gate. All other outputs are unused.

### Multiple Function Implementation

A single decoder can implement **multiple functions** of the same variables simultaneously, since all minterms are available. Each function simply uses a different OR gate connected to its respective minterms.

**Example:** Implement both $F_1 = \sum m(0, 1, 3)$ and $F_2 = \sum m(2, 3, 5, 7)$ with one 3-to-8 decoder:

$$F_1 = Y_0 + Y_1 + Y_3$$
$$F_2 = Y_2 + Y_3 + Y_5 + Y_7$$

Note that minterm $m_3$ ($Y_3$) is shared between both functions—its output wire connects to both OR gates.

### Decoder vs. MUX for Function Implementation

| Feature | Decoder + OR | MUX |
|---------|-------------|-----|
| Module size for $n$ variables | $n$-to-$2^n$ decoder + OR | $2^{n-1}$-to-1 MUX (Shannon) |
| Additional gates needed | OR gate(s) | Inverter (for complement) |
| Multiple outputs | Yes (share decoder) | No (one MUX per output) |
| Best for | Multiple functions of same variables | Single functions |

---

## 8.9 Encoder Fundamentals

An **encoder** performs the inverse function of a decoder—it converts a set of input lines (typically one-hot) into a compact binary code. If $2^n$ input lines are provided, the encoder produces an $n$-bit binary output representing which input is active.

### Basic 4-to-2 Encoder

A 4-to-2 encoder has four inputs ($D_0$ through $D_3$) and two outputs ($Y_1$, $Y_0$).

**Assumption:** Exactly one input is active (HIGH) at any time.

**Boolean Expressions:**

$$Y_1 = D_2 + D_3$$
$$Y_0 = D_1 + D_3$$

| Active Input | $Y_1$ | $Y_0$ | Binary Code |
|-------------|-------|-------|-------------|
| $D_0$ | 0 | 0 | 00 |
| $D_1$ | 0 | 1 | 01 |
| $D_2$ | 1 | 0 | 10 |
| $D_3$ | 1 | 1 | 11 |

The encoder simply generates the binary index of the active input. It is implemented with OR gates—one for each output bit.

### Limitations of Basic Encoders

Basic encoders have two significant limitations:

1. **No input active:** When no input is HIGH, the output is 00—which is indistinguishable from $D_0$ being active
2. **Multiple inputs active:** If more than one input is HIGH simultaneously, the output is incorrect (the OR gates produce unpredictable results)

These limitations motivate the priority encoder.

---

## 8.10 Priority Encoder

A **priority encoder** resolves the multiple-active-input problem by assigning priorities to the inputs and encoding only the highest-priority active input. By convention, higher-numbered inputs have higher priority.

### Priority Encoder Operation

For a 4-to-2 priority encoder:

| $D_3$ | $D_2$ | $D_1$ | $D_0$ | $Y_1$ | $Y_0$ | $V$ (Valid) |
|-------|-------|-------|-------|-------|-------|-------------|
| 0 | 0 | 0 | 0 | X | X | 0 |
| 0 | 0 | 0 | 1 | 0 | 0 | 1 |
| 0 | 0 | 1 | X | 0 | 1 | 1 |
| 0 | 1 | X | X | 1 | 0 | 1 |
| 1 | X | X | X | 1 | 1 | 1 |

The **Valid** output ($V$) indicates whether any input is active, solving the "no input" ambiguity problem.

The X entries in the truth table indicate "don't care"—once a higher-priority input is found active, lower-priority inputs are ignored.

### 8-to-3 Priority Encoder

An 8-to-3 priority encoder accepts 8 inputs ($D_0$ through $D_7$) and produces a 3-bit binary code plus a valid flag.

The Boolean expressions for the outputs use don't care conditions extensively, making K-map simplification essential for an efficient implementation. The 74148 is a standard 8-to-3 priority encoder IC with active-low inputs and outputs.

**Applications of priority encoders:**

- **Interrupt controllers:** Identify the highest-priority interrupt request
- **Resource arbitration:** Select the highest-priority bus request
- **Leading-one detection:** Find the position of the most significant 1 bit (used in floating-point normalization)
- **Keyboard encoding:** Convert key press matrix position to scan code

#### Diagram: Priority Encoder Simulator

<iframe src="../sims/priority-encoder-simulator/main.html" width="100%" height="530px" scrolling="no"></iframe>

<details markdown="1">
<summary>Priority Encoder Simulator</summary>
Type: microsim

Purpose: Demonstrate priority encoder operation with emphasis on priority resolution when multiple inputs are active

Bloom Level: Understand (L2)
Bloom Verb: Explain, predict, compare

Learning Objective: Students will be able to predict the output of a priority encoder when multiple inputs are simultaneously active and explain how priority resolution works.

Canvas Layout:
- Left: 8 input toggle switches (D7 at top, D0 at bottom) with priority labels
- Center: Priority encoder block diagram with internal logic
- Right: Output display (Y2, Y1, Y0 binary code, decimal value, Valid flag)
- Bottom: Comparison with basic encoder behavior

Visual Elements:
- Input switches with priority indicators (arrows showing hierarchy)
- Active inputs highlighted in green
- Highest-priority active input highlighted in bright green with "WINNER" label
- Lower-priority active inputs shown in dim green with "MASKED" label
- Output binary code and decimal value
- Valid LED indicator
- Internal priority logic chain visualization

Interactive Controls:
- Toggle any of 8 inputs independently
- "Clear All" button
- "Random" button to set random input pattern
- "Show Masking" toggle to visualize which inputs are being masked
- Speed control for "Cycle Demo" animation

Data Visibility Requirements:
- All input states visible
- Which input "wins" priority clearly labeled
- Output code with decimal equivalent
- Valid flag state
- When multiple inputs active: show which are masked and why

Default Parameters:
- All inputs: 0
- Valid: 0

Behavior:
- Output updates instantly when inputs change
- When multiple inputs active, only highest-priority one determines output
- Masked inputs visually dimmed
- Valid goes HIGH when any input is active
- "Show Masking" mode highlights the priority chain

Instructional Rationale: Seeing which input "wins" when multiple inputs are simultaneously active, with lower-priority inputs visually masked, makes the priority concept concrete and memorable.

Implementation: p5.js with responsive canvas
</details>

---

## 8.11 Code Converters

**Code converters** translate data from one binary coding scheme to another. These are combinational circuits designed for specific code-to-code translations, implemented using logic derived from the conversion rules.

### 8.11.1 Binary-to-Gray Code Converter

**Gray code** (also called reflected binary code) has the property that successive code words differ in exactly one bit position. This property is valuable in:

- Rotary encoders (prevents ambiguous readings during transitions)
- Karnaugh maps (Gray code ordering of rows and columns)
- Analog-to-digital converters (reduces errors)

**Conversion formulas (binary $B$ to Gray $G$):**

$$G_{n-1} = B_{n-1}$$
$$G_i = B_{i+1} \oplus B_i \quad \text{for } i = n-2, n-3, ..., 0$$

The most significant bit is copied directly; each subsequent Gray bit is the XOR of two adjacent binary bits.

**4-bit example:**

| Decimal | Binary ($B_3B_2B_1B_0$) | Gray ($G_3G_2G_1G_0$) |
|---------|-------------------------|------------------------|
| 0 | 0000 | 0000 |
| 1 | 0001 | 0001 |
| 2 | 0010 | 0011 |
| 3 | 0011 | 0010 |
| 4 | 0100 | 0110 |
| 5 | 0101 | 0111 |
| 6 | 0110 | 0101 |
| 7 | 0111 | 0100 |
| 8 | 1000 | 1100 |
| 9 | 1001 | 1101 |
| 10 | 1010 | 1111 |
| 11 | 1011 | 1110 |
| 12 | 1100 | 1010 |
| 13 | 1101 | 1011 |
| 14 | 1110 | 1001 |
| 15 | 1111 | 1000 |

Notice that each consecutive Gray code pair differs by exactly one bit—verify this by scanning down the Gray column.

The circuit implementation requires only $n-1$ XOR gates, making it extremely efficient.

### 8.11.2 Gray-to-Binary Code Converter

The inverse conversion reconstructs binary from Gray code:

$$B_{n-1} = G_{n-1}$$
$$B_i = B_{i+1} \oplus G_i \quad \text{for } i = n-2, n-3, ..., 0$$

Note the key difference: each binary bit depends on the **previously computed binary bit** (not the input Gray bit), creating a cascaded dependency. This means the Gray-to-binary converter has a ripple structure where the MSB must be computed before the next bit can be determined.

#### Diagram: Binary-Gray Code Converter

<iframe src="../sims/binary-gray-converter/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Binary-Gray Code Converter Interactive</summary>
Type: microsim

Purpose: Interactive conversion between binary and Gray codes with visual circuit representation

Bloom Level: Apply (L3)
Bloom Verb: Execute, calculate, demonstrate

Learning Objective: Students will be able to convert between binary and Gray codes using XOR operations and verify the single-bit-change property of Gray code.

Canvas Layout:
- Top: Direction selector (Binary→Gray or Gray→Binary)
- Left: Input bit toggles (4 bits)
- Center: XOR gate circuit diagram showing conversion
- Right: Output display with converted value
- Bottom: Full conversion table with current row highlighted

Visual Elements:
- 4 input toggle switches with bit labels
- XOR gate circuit showing signal flow
- Signal values at each wire (0 or 1)
- Active XOR gates highlighted
- Conversion direction arrow
- Full 16-row conversion table (scrollable, current row highlighted)
- Adjacent-code comparison showing single-bit difference

Interactive Controls:
- Direction toggle (Binary→Gray / Gray→Binary)
- 4 input bit toggles
- "Increment" and "Decrement" buttons to step through codes
- "Show Single-Bit Property" toggle (highlights which bit changes between consecutive codes)
- "Auto Cycle" button

Data Visibility Requirements:
- Input value (binary and decimal)
- Output value (converted code and decimal)
- XOR gate intermediate values
- Full conversion table with current position
- When cycling: highlight which single bit changes

Default Parameters:
- Direction: Binary→Gray
- Input: 0000
- Show property: enabled

Behavior:
- Output updates instantly when input changes
- Circuit signal values animate when input changes
- Table scrolls to show current conversion
- Single-bit property visualization highlights the changing bit between consecutive codes

Instructional Rationale: Seeing the XOR operations with actual bit values reinforces the conversion algorithm, while the single-bit property visualization demonstrates why Gray code is useful.

Implementation: p5.js with responsive canvas
</details>

---

## 8.12 BCD-to-Seven-Segment Decoder

A **BCD-to-seven-segment decoder** converts a 4-bit Binary Coded Decimal input (representing digits 0–9) into seven outputs that drive the individual segments of a seven-segment LED or LCD display.

### Seven-Segment Display Convention

The seven segments are labeled $a$ through $g$:

```
   aaa
  f   b
  f   b
   ggg
  e   c
  e   c
   ddd
```

Each digit (0–9) requires a specific combination of active segments:

| Digit | $a$ | $b$ | $c$ | $d$ | $e$ | $f$ | $g$ | Display |
|-------|-----|-----|-----|-----|-----|-----|-----|---------|
| 0 | 1 | 1 | 1 | 1 | 1 | 1 | 0 | 0 |
| 1 | 0 | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| 2 | 1 | 1 | 0 | 1 | 1 | 0 | 1 | 2 |
| 3 | 1 | 1 | 1 | 1 | 0 | 0 | 1 | 3 |
| 4 | 0 | 1 | 1 | 0 | 0 | 1 | 1 | 4 |
| 5 | 1 | 0 | 1 | 1 | 0 | 1 | 1 | 5 |
| 6 | 1 | 0 | 1 | 1 | 1 | 1 | 1 | 6 |
| 7 | 1 | 1 | 1 | 0 | 0 | 0 | 0 | 7 |
| 8 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 8 |
| 9 | 1 | 1 | 1 | 1 | 0 | 1 | 1 | 9 |

### Design Using Don't Cares

BCD inputs 10–15 (1010 through 1111) are invalid and never occur in a properly functioning BCD system. These can be treated as **don't care** conditions for K-map simplification, potentially yielding simpler Boolean expressions for each segment.

**Example: Segment $a$**

Using inputs $A_3A_2A_1A_0$, segment $a$ is active for digits 0, 2, 3, 5, 6, 7, 8, 9 and don't care for 10–15.

From a K-map with don't cares:

$$a = A_3 + A_1 + A_2A_0 + \overline{A_2}\,\overline{A_0}$$

Each segment function is simplified independently. The 7447 is a classic BCD-to-seven-segment decoder IC with open-collector outputs for driving common-anode displays.

!!! note "Active-High vs. Active-Low"
    Seven-segment decoders come in two varieties: active-high outputs (for common-cathode displays, like the 7448) and active-low outputs (for common-anode displays, like the 7447). The logic design is the same; only the output polarity differs.

---

## 8.13 Comparator Circuits

**Comparators** determine the magnitude relationship between two binary numbers. They produce outputs indicating whether the first number is greater than, equal to, or less than the second number.

### 1-Bit Comparator

For two 1-bit inputs $A$ and $B$, the three comparison outputs are:

$$\text{Equal: } E = A \odot B = AB + \overline{A}\,\overline{B}$$
$$\text{Greater: } G = A\overline{B}$$
$$\text{Less: } L = \overline{A}B$$

| $A$ | $B$ | $G$ $(A>B)$ | $E$ $(A=B)$ | $L$ $(A<B)$ |
|-----|-----|-------------|-------------|-------------|
| 0 | 0 | 0 | 1 | 0 |
| 0 | 1 | 0 | 0 | 1 |
| 1 | 0 | 1 | 0 | 0 |
| 1 | 1 | 0 | 1 | 0 |

Note that $G + E + L = 1$ always—exactly one relationship holds for any input pair.

### Magnitude Comparator Design

A **magnitude comparator** extends the comparison to multi-bit numbers. For two $n$-bit numbers $A = A_{n-1}...A_1A_0$ and $B = B_{n-1}...B_1B_0$, comparison proceeds from the most significant bit downward.

**Algorithm:**

1. Compare $A_{n-1}$ with $B_{n-1}$
2. If $A_{n-1} > B_{n-1}$: result is $A > B$ (done)
3. If $A_{n-1} < B_{n-1}$: result is $A < B$ (done)
4. If $A_{n-1} = B_{n-1}$: compare next lower bit pair
5. If all bits are equal: result is $A = B$

**4-Bit Magnitude Comparator Equations:**

Define the per-bit equality: $x_i = A_i \odot B_i = A_iB_i + \overline{A_i}\,\overline{B_i}$

$$(A > B) = A_3\overline{B_3} + x_3 A_2\overline{B_2} + x_3 x_2 A_1\overline{B_1} + x_3 x_2 x_1 A_0\overline{B_0}$$
$$(A = B) = x_3 x_2 x_1 x_0$$
$$(A < B) = \overline{A_3}B_3 + x_3 \overline{A_2}B_2 + x_3 x_2 \overline{A_1}B_1 + x_3 x_2 x_1 \overline{A_0}B_0$$

The 7485 is a standard 4-bit magnitude comparator IC with cascade inputs for building larger comparators.

#### Diagram: Magnitude Comparator Simulator

<iframe src="../sims/magnitude-comparator/main.html" width="100%" height="530px" scrolling="no"></iframe>

<details markdown="1">
<summary>Magnitude Comparator Interactive Simulator</summary>
Type: microsim

Purpose: Interactive demonstration of magnitude comparison between two multi-bit binary numbers

Bloom Level: Analyze (L4)
Bloom Verb: Compare, examine, differentiate

Learning Objective: Students will be able to trace the bit-by-bit comparison algorithm and predict comparator outputs for any pair of binary numbers.

Canvas Layout:
- Top: Bit width selector (2-bit, 4-bit, 8-bit)
- Left: Number A input (individual bit toggles + decimal display)
- Right: Number B input (individual bit toggles + decimal display)
- Center: Comparison visualization showing bit-by-bit analysis
- Bottom: Output indicators (A>B, A=B, A<B) and cascade inputs

Visual Elements:
- Bit toggle switches for both numbers A and B
- Decimal equivalents displayed
- Bit-by-bit comparison column showing per-bit results
- Highlighted bit where comparison is decided (first inequality)
- Equal bits shown in green, deciding bit shown in red/blue
- Three output LEDs (A>B, A=B, A<B)
- Cascade input controls for multi-stage operation

Interactive Controls:
- Bit width selector
- Toggle individual bits of A and B
- "Random A" and "Random B" buttons
- "Swap A and B" button
- Toggle cascade inputs (for cascaded operation demonstration)
- "Step Through Comparison" mode

Data Visibility Requirements:
- Binary and decimal values of both numbers
- Per-bit equality status (= or ≠)
- Which bit position decides the comparison
- Cascade input and output states
- Final comparison result with clear indicator

Default Parameters:
- Bit width: 4
- A = 0101 (5)
- B = 0011 (3)

Behavior:
- Outputs update instantly when any bit changes
- Deciding bit highlighted prominently
- Step-through mode shows comparison proceeding MSB to LSB
- Equal bits marked green, inequality marked in red
- Cascade inputs affect result when enabled

Instructional Rationale: Visualizing the MSB-to-LSB comparison process with the deciding bit highlighted makes the algorithm tangible and helps students understand why only the most significant differing bit matters.

Implementation: p5.js with responsive canvas
</details>

---

## 8.14 Cascading Combinational Modules

Real-world designs frequently require functionality beyond what a single MSI module provides. **Cascading** connects multiple modules to handle wider data paths, more inputs, or combined functions.

### Cascading Multiplexers

As covered in Section 8.3, multiplexer trees expand MUX size. The key principle: lower-level MUXes handle the least significant select bits, and upper-level MUXes handle the most significant bits.

### Cascading Decoders

Decoder expansion uses enable inputs to create larger address spaces:

- Two 3-to-8 decoders → one 4-to-16 decoder (using MSB as enable selector)
- Four 3-to-8 decoders + one 2-to-4 decoder → one 5-to-32 decoder

### Cascading Magnitude Comparators

For comparing numbers wider than a single comparator can handle, cascade inputs propagate the comparison result from less significant stages to more significant stages.

**Example:** Two 4-bit comparators cascading to form an 8-bit comparator:

- **Lower comparator:** Compares $A_3A_2A_1A_0$ with $B_3B_2B_1B_0$
- **Upper comparator:** Compares $A_7A_6A_5A_4$ with $B_7B_6B_5B_4$
- **Cascade connection:** The three outputs of the lower comparator connect to the cascade inputs of the upper comparator

The upper comparator first checks its own bits. If they are equal ($A_{7..4} = B_{7..4}$), it passes through the cascade inputs (the lower comparator's result). If the upper bits differ, the cascade inputs are ignored.

### Cascading Priority Encoders

Multiple priority encoders cascade for wider input ranges. The 74148 includes cascade outputs (GS and EO) that facilitate expansion:

- **GS (Group Select):** Goes active when any input is active
- **EO (Enable Output):** Goes active when enabled but no input is active

Using these signals, a higher-level encoder determines which group contains the highest-priority active input.

| Cascade Application | Method | Key Signal |
|--------------------|--------|-----------|
| MUX expansion | Tree structure | Select line partitioning |
| Decoder expansion | Enable chaining | Enable from address MSBs |
| Comparator expansion | Cascade inputs | G, E, L from lower stage |
| Priority encoder expansion | GS/EO chaining | Group select signals |

!!! tip "Design Hierarchy"
    Cascading is an example of the broader digital design principle of hierarchy—building complex systems from simpler, well-understood components. This same principle extends from MSI modules to entire processor architectures.

---

## 8.15 Summary and Key Takeaways

This unit covered the essential MSI combinational building blocks that form the foundation for practical digital system design:

- **Combinational building blocks** (MUX, DEMUX, decoder, encoder, comparator) provide higher-level abstractions than individual gates, improving design productivity.

- **Multiplexers** select one of $2^n$ data inputs based on $n$ select signals. The general expression is $Y = \sum m_i \cdot D_i$.

- **MUX sizes** range from 2:1 to 16:1 and beyond, with larger MUXes built through **tree expansion** using smaller MUXes.

- **Function implementation with MUX** uses Shannon expansion to implement an $n$-variable function with a $2^{n-1}$-to-1 MUX, connecting one variable (or its complement, 0, or 1) to the data inputs.

- **Demultiplexers** route a single input to one of $2^n$ outputs. A DEMUX is structurally identical to a decoder with an enable input.

- **Decoders** generate all $2^n$ minterms of $n$ input variables. Each output corresponds to exactly one minterm, enabling **minterm generation** for function implementation.

- **Decoder tree expansion** uses enable inputs to cascade decoders into larger address spaces.

- **Implementing functions with decoders** requires only an OR gate combining the minterm outputs—useful when multiple functions share the same variables.

- **Encoders** perform the inverse of decoding, converting one-hot inputs to binary codes.

- **Priority encoders** handle multiple simultaneously active inputs by encoding only the highest-priority input, with a valid flag indicating activity.

- **Binary-to-Gray converters** use XOR gates: $G_i = B_{i+1} \oplus B_i$, producing codes where adjacent values differ by one bit.

- **Gray-to-binary converters** reverse the process with cascaded XOR: $B_i = B_{i+1} \oplus G_i$.

- **BCD-to-seven-segment decoders** convert BCD digits to segment drive signals, using don't cares for invalid BCD inputs (10–15).

- **Comparators** determine magnitude relationships ($>$, $=$, $<$) between binary numbers, using bit-by-bit comparison from MSB to LSB.

- **Magnitude comparator design** uses per-bit XNOR equality checks cascaded with priority from the most significant bit.

- **Cascading** connects multiple modules for wider data paths, using tree structures, enable chaining, or cascade inputs depending on the module type.

??? question "Self-Check: Why can a 4-to-1 MUX implement a 3-variable function, not just a 2-variable function?"
    Shannon expansion allows one variable to be "absorbed" into the data inputs rather than requiring a select line. The 4-to-1 MUX uses 2 variables as select lines, and the third variable appears at the data inputs as 0, 1, the variable itself, or its complement. This effectively evaluates the function for both values of the third variable and selects the correct result.

??? question "Self-Check: How many OR gates are needed to implement three different functions using a single 3-to-8 decoder?"
    Three OR gates—one for each function. Each OR gate connects to the decoder outputs corresponding to that function's minterms. The decoder is shared among all three functions since it generates all minterms simultaneously.

??? question "Self-Check: What advantage does a priority encoder have over a basic encoder when used in an interrupt controller?"
    In an interrupt controller, multiple interrupt requests may arrive simultaneously. A basic encoder would produce an incorrect (meaningless) output when multiple inputs are active. A priority encoder correctly identifies the highest-priority interrupt, ensuring the most critical request is serviced first. The valid flag also distinguishes between "no interrupt" and "interrupt 0."

---

## Interactive Walkthrough

Step through implementing a Boolean function using a 4:1 multiplexer:

<iframe src="../sims/mux-function-walkthrough/main.html" width="100%" height="600px" scrolling="no"></iframe>

---

[See Annotated References](./references.md)

</div>
