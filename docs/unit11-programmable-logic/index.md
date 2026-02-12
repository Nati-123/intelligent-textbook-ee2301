---
title: Programmable Logic Devices
description: PLDs, ROMs, PALs, PLAs, CPLDs, FPGAs, and configurable logic architectures
generated_by: claude skill generate-chapter-content
date: 2026-02-10 14:00:00
version: 0.03
---

# Unit 11: Programmable Logic Devices

<div class="video-overview" markdown>
**Video Overview:** *AI-narrated overview of this unit with animated slides — coming soon.*
</div>

## Summary

This unit bridges the gap between designing logic circuits on paper and implementing them in real hardware. Students will explore the family of programmable logic devices (PLDs) that allow designers to configure hardware functionality after manufacturing. Beginning with read-only memories (ROMs) used as combinational logic generators, the unit progresses through simple PLDs (SPLDs) such as PALs and PLAs, then advances to complex PLDs (CPLDs) and field-programmable gate arrays (FPGAs). Students will understand how each device architecture maps Boolean functions to programmable hardware, compare the trade-offs among device families, and appreciate how modern FPGAs implement the combinational and sequential circuits studied in prior units using lookup tables and configurable logic blocks.

## Concepts Covered

1. Introduction to Programmable Logic
2. Fixed Logic vs Programmable Logic
3. Programmable Connections
4. Fuse and Antifuse Technology
5. ROM as a Logic Device
6. ROM Truth Table Implementation
7. ROM Internal Architecture
8. PROM, EPROM, EEPROM, and Flash
9. Programmable Logic Array (PLA)
10. PLA Architecture and Programming
11. PLA AND Plane and OR Plane
12. Programmable Array Logic (PAL)
13. PAL Architecture and Constraints
14. PAL vs PLA Trade-offs
15. Simple PLD (SPLD) Summary
16. Complex PLD (CPLD) Architecture
17. CPLD Macrocells
18. CPLD Interconnect Matrix
19. Field-Programmable Gate Array (FPGA) Concepts
20. FPGA Architecture Overview
21. Lookup Tables (LUTs)
22. Configurable Logic Blocks (CLBs)
23. FPGA Routing Resources
24. FPGA I/O Blocks
25. SRAM-Based vs Flash-Based FPGAs
26. FPGA Design Flow
27. Hardware Description Languages for PLDs
28. Technology Mapping
29. PLD Selection Criteria
30. Applications of Programmable Logic

## Prerequisites

Before studying this unit, students should be familiar with:

- Sum of Products and Product of Sums forms (Unit 4)
- K-map and Quine-McCluskey simplification (Units 5-6)
- Multi-level gate implementations (Unit 7)
- Combinational modules: MUX, decoders, encoders (Unit 8)
- Flip-flops and sequential circuits (Units 9-10)

---

## 11.1 Introduction to Programmable Logic

Every circuit designed in Units 1 through 10 assumed that the designer selects individual logic gates—AND, OR, NOT, NAND, NOR—and connects them with dedicated wires to build a specific function. This approach, called **fixed logic** or **standard logic** design, works well for small circuits but becomes impractical as systems grow to thousands or millions of gates. Routing individual wires on a printed circuit board for a complex Boolean function is time-consuming, error-prone, and expensive to modify.

**Programmable logic devices** (PLDs) offer a fundamentally different approach: the manufacturer builds a chip containing a large array of uncommitted logic elements and configurable interconnections. The designer then **programs** (configures) the device to implement the desired function. If the design contains an error, many PLD types can be erased and reprogrammed rather than discarding the hardware.

| Design Approach | Manufacturing | Modification | Per-Unit Cost | NRE Cost |
|----------------|---------------|--------------|---------------|----------|
| Standard Logic (74xx) | Use off-the-shelf ICs | Redesign PCB | Low | Low |
| Custom ASIC | Full mask fabrication | New mask set | Very Low | Very High |
| Programmable Logic | Configure after manufacturing | Reprogram device | Medium | Low |

The key advantage of programmable logic is the trade-off between **non-recurring engineering (NRE) cost** and **per-unit cost**. ASICs minimize per-unit cost for high volumes but require expensive mask fabrication. PLDs eliminate mask costs entirely, making them ideal for prototyping, low-to-medium volume production, and designs that may need field updates.

!!! tip "Historical Context"
    The first programmable logic devices appeared in the 1970s. Today, FPGAs containing billions of transistors can implement entire systems-on-chip, including processors, memory controllers, and custom accelerators—all on a single configurable device.

---

## 11.2 Programmable Connections

At the heart of every PLD is a mechanism for making or breaking connections between logic elements. Understanding these connection technologies is essential before studying specific device architectures.

**Fuse-based connections** were the earliest technology. The device ships with all connections intact (fuses present). Programming the device means selectively **blowing** (destroying) specific fuses to remove unwanted connections. Once blown, a fuse cannot be restored—making these devices **one-time programmable (OTP)**.

**Antifuse-based connections** work in reverse: the device ships with all connections open. Programming creates connections by applying a high voltage that permanently forms a conductive path. Like fuses, antifuses are OTP.

**SRAM-based connections** use static RAM cells to control pass transistors or multiplexers. The configuration is stored in volatile memory, so it must be reloaded every time the device powers up (typically from an external flash memory). The advantage is unlimited reprogrammability.

**Flash-based connections** store the configuration in non-volatile flash memory cells. The device retains its programming when powered off and can be reprogrammed thousands of times.

| Technology | Reprogrammable | Non-Volatile | Speed | Density |
|-----------|---------------|-------------|-------|---------|
| Fuse | No (OTP) | Yes | Fast | Low |
| Antifuse | No (OTP) | Yes | Very Fast | Medium |
| SRAM | Yes (unlimited) | No | Fast | High |
| Flash | Yes (~10K cycles) | Yes | Medium | Medium |

#### Diagram: Programmable Connection Technologies

<iframe src="../sims/programmable-connections/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Programmable Connection Technologies</summary>
Type: diagram

Bloom Level: Understand (L2)
Bloom Verb: Compare, contrast

Learning Objective: Compare the four programmable connection technologies (fuse, antifuse, SRAM, flash) by visualizing their physical structure and electrical behavior before and after programming.

Components to show:
- Four side-by-side panels, one for each technology
- Each panel shows a "Before Programming" and "After Programming" state
- Fuse: conductor that gets broken
- Antifuse: insulator that becomes conductor
- SRAM: transistor controlled by a memory cell
- Flash: floating-gate transistor storing charge

Visual style: Side-by-side comparison panels with before/after states
Color scheme: Green for connected paths, red for open paths, blue for control elements
Canvas size: 800x400px, responsive to window resize

Interactive elements:
- Click each technology to toggle between "before" and "after" states
- Hover over components for tooltip explanation of the mechanism

Implementation: p5.js or HTML/CSS/JavaScript
</details>

---

## 11.3 ROM as a Logic Device

A **read-only memory** (ROM) is the simplest programmable logic device, though it may not be immediately obvious why a "memory" qualifies as a logic implementation device. The connection becomes clear when you consider the structure.

A ROM with $n$ address inputs and $m$ data outputs implements **any** combinational function of $n$ variables with $m$ outputs. The address inputs serve as the Boolean input variables, and each address location stores the output values for that particular input combination. In effect, a ROM is a complete **truth table stored in hardware**.

Consider a ROM with 3 address lines ($A_2, A_1, A_0$) and 2 data outputs ($D_1, D_0$):

| Address ($A_2 A_1 A_0$) | Location | $D_1$ | $D_0$ |
|--------------------------|----------|-------|-------|
| 000 | 0 | 0 | 1 |
| 001 | 1 | 0 | 1 |
| 010 | 2 | 1 | 0 |
| 011 | 3 | 1 | 1 |
| 100 | 4 | 0 | 0 |
| 101 | 5 | 1 | 0 |
| 110 | 6 | 1 | 1 |
| 111 | 7 | 0 | 0 |

This ROM simultaneously implements two functions:

- $D_1 = \Sigma m(2, 3, 5, 6)$
- $D_0 = \Sigma m(0, 1, 3, 6)$

### ROM Internal Architecture

Internally, a ROM consists of two sections:

- **Decoder (AND plane):** An $n$-to-$2^n$ decoder that generates all $2^n$ minterms of the input variables. This is a **fixed** AND array—every possible minterm is always generated.
- **OR array:** A programmable OR plane where each output is connected to the minterms that should make it HIGH. Programming the ROM means configuring which minterms connect to which outputs.

Because the decoder generates **all** minterms, no minimization is needed. The trade-off is that ROM size grows exponentially with the number of inputs: an $n$-input ROM requires $2^n$ rows, regardless of how simple the function actually is.

#### Diagram: ROM Internal Architecture

<iframe src="../sims/rom-architecture/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>ROM Internal Architecture</summary>
Type: microsim

Bloom Level: Understand (L2)
Bloom Verb: Explain

Learning Objective: Explain how a ROM implements combinational logic by mapping address inputs through a decoder (fixed AND array) to a programmable OR array that stores the truth table.

Data Visibility Requirements:
Stage 1: Show a 3-input ROM with address lines A2, A1, A0 entering a decoder
Stage 2: Highlight one minterm line (e.g., address 011 = minterm 3) showing it active
Stage 3: Show the OR array with programmable connections (dots for connected, empty for disconnected)
Stage 4: Show the output values D1, D0 resulting from the selected address

Instructional Rationale: Step-through with concrete addresses allows students to trace how a specific input combination propagates through the decoder to the OR plane and produces specific outputs, reinforcing the ROM-as-truth-table concept.

Visual elements:
- Left side: 3 input lines labeled A2, A1, A0
- Center: 3-to-8 decoder block with 8 output lines (minterms m0 through m7)
- Right: OR array grid showing programmable connections
- Far right: 2 output lines D1, D0

Interactive controls:
- Three toggle switches for A2, A1, A0
- Step-through button to trace signal propagation
- Reset button
- Display showing: current address, active minterm, output values

Color scheme: Active paths in gold, inactive in gray, connection dots in blue
Canvas size: 800x550px, responsive

Implementation: p5.js
</details>

### ROM Variants

Several ROM technologies exist, distinguished by how and when they are programmed:

- **Mask ROM:** Programmed during manufacturing via the photolithographic mask. Cannot be changed. Lowest per-unit cost at high volume.
- **PROM (Programmable ROM):** Programmed by the user once using a device programmer that blows fuses. One-time programmable.
- **EPROM (Erasable PROM):** Can be erased by exposing the chip to ultraviolet light through a quartz window, then reprogrammed electrically. Erase is slow (15-20 minutes) and erases the entire chip.
- **EEPROM (Electrically Erasable PROM):** Can be erased and reprogrammed electrically, one byte at a time. Limited write cycles (~100K-1M).
- **Flash Memory:** Similar to EEPROM but erases in blocks rather than individual bytes. The dominant non-volatile memory technology today.

---

## 11.4 Programmable Logic Array (PLA)

The ROM approach is wasteful when a function uses only a few minterms out of the possible $2^n$. A **Programmable Logic Array (PLA)** addresses this inefficiency by making **both** the AND plane and the OR plane programmable.

Instead of generating all $2^n$ minterms, the PLA's AND plane generates only the **product terms** actually needed by the function. The OR plane then combines these product terms into the desired outputs. Because both planes are programmable, the designer must first minimize the Boolean expressions (using K-maps or Quine-McCluskey) to determine which product terms are needed.

A PLA with:

- $n$ inputs
- $k$ product terms (AND gates)
- $m$ outputs

can implement any $m$ functions of $n$ variables, provided the total number of distinct product terms does not exceed $k$.

### PLA Architecture

The PLA consists of:

1. **Input buffers:** Generate both the true and complement of each input ($x_i$ and $\bar{x_i}$), providing $2n$ lines to the AND plane.
2. **Programmable AND plane:** Each AND gate (product term) can be connected to any combination of the $2n$ input lines. Programming selects which literals appear in each product term.
3. **Programmable OR plane:** Each output can be connected to any combination of the $k$ product terms. Programming selects which product terms contribute to each output.
4. **Optional output inversions:** Some PLAs include programmable XOR gates at the outputs, allowing the designer to choose between the function and its complement (useful for POS implementations).

#### Diagram: PLA Architecture and Programming

<iframe src="../sims/pla-architecture/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>PLA Architecture and Programming</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: Implement

Learning Objective: Implement a set of Boolean functions on a PLA by configuring the AND plane (product terms) and OR plane (output connections) based on minimized SOP expressions.

Visual elements:
- Input buffer section showing n=3 inputs with true and complement lines (6 vertical lines)
- AND plane grid (6 columns x k=4 rows) with programmable connection dots
- OR plane grid (4 columns x m=2 rows) with programmable connection dots
- Output lines with optional inversion

Interactive controls:
- Click on intersection points in AND plane to toggle connections (dot = connected)
- Click on intersection points in OR plane to toggle connections (dot = connected)
- Toggle switches for inputs A, B, C to test the programmed function
- "Evaluate" button to trace signal flow and show outputs
- "Load Example" dropdown with pre-configured functions
- Reset button

Default example:
F1 = AB + AC (product terms: AB, AC)
F2 = AB + BC (product terms: AB, BC, shared term AB)

Data Visibility:
- Show the SOP expression corresponding to current programming
- Highlight active product terms for current input combination
- Show output values

Color scheme: AND plane in blue tones, OR plane in orange tones, active paths in gold
Canvas size: 800x550px, responsive

Instructional Rationale: Interactive PLA programming lets students directly connect the abstract concept of SOP expressions to physical device configuration, reinforcing the relationship between Boolean algebra and hardware implementation.

Implementation: p5.js
</details>

### PLA Example

Implement the following functions using a PLA with 3 inputs and 4 product terms:

- $F_1(A,B,C) = A\bar{B} + \bar{A}BC$
- $F_2(A,B,C) = A\bar{B} + AB$

**Step 1:** Identify all distinct product terms: $A\bar{B}$, $\bar{A}BC$, $AB$. Three product terms are needed (within the 4-term limit).

**Step 2:** Program the AND plane:

| Product Term | A | $\bar{A}$ | B | $\bar{B}$ | C | $\bar{C}$ |
|-------------|---|---|---|---|---|---|
| $A\bar{B}$ | x | - | - | x | - | - |
| $\bar{A}BC$ | - | x | x | - | x | - |
| $AB$ | x | - | x | - | - | - |

**Step 3:** Program the OR plane:

| Output | $A\bar{B}$ | $\bar{A}BC$ | $AB$ |
|--------|-----------|------------|------|
| $F_1$ | x | x | - |
| $F_2$ | x | - | x |

The product term $A\bar{B}$ is **shared** between both outputs—a key advantage of PLAs over separate circuit implementations.

---

## 11.5 Programmable Array Logic (PAL)

A **Programmable Array Logic (PAL)** device simplifies the PLA by keeping the AND plane programmable but making the OR plane **fixed**. Each output is permanently connected to a predetermined set of AND gates (product terms).

This simplification has important consequences:

- **Advantage:** Faster propagation delay because the fixed OR connections are hardwired (no programmable delay).
- **Advantage:** Simpler programming—only the AND plane needs configuration.
- **Disadvantage:** Product terms **cannot be shared** between outputs. Each output has its own dedicated set of AND gates.
- **Disadvantage:** If a function requires more product terms than the fixed OR gate provides, it cannot be implemented in a single PAL output.

### PAL Architecture

A typical PAL (such as the classic PAL16L8) provides:

- 16 input pins
- 8 outputs, each with a fixed number of product terms (typically 7-8)
- A programmable AND array connecting inputs and their complements to dedicated AND gates
- Fixed OR gates summing the product terms for each output

Some PAL outputs are registered (include a flip-flop), enabling sequential logic implementation. The output may also feed back into the AND array as an additional input, supporting state machine designs.

### PAL vs PLA Comparison

| Feature | PLA | PAL |
|---------|-----|-----|
| AND Plane | Programmable | Programmable |
| OR Plane | Programmable | Fixed |
| Product Term Sharing | Yes | No |
| Speed | Slower (two programmable planes) | Faster (one programmable plane) |
| Flexibility | Higher | Lower |
| Cost | Higher | Lower |
| Typical Products | PLA series | PAL16L8, PAL22V10, GAL |

#### Diagram: PLA vs PAL Architecture Comparison

<iframe src="../sims/pla-vs-pal/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>PLA vs PAL Architecture Comparison</summary>
Type: infographic

Bloom Level: Analyze (L4)
Bloom Verb: Compare, distinguish

Learning Objective: Compare and contrast PLA and PAL architectures by examining their AND and OR plane configurations, identifying when product term sharing matters, and understanding the speed-flexibility trade-off.

Layout: Two side-by-side architectural diagrams

Left panel (PLA):
- Show 3 inputs with true/complement buffers (6 lines)
- Programmable AND plane (show X marks at programmable intersections)
- Programmable OR plane (show X marks at programmable intersections)
- 2 outputs
- Label: "Both planes programmable"

Right panel (PAL):
- Show 3 inputs with true/complement buffers (6 lines)
- Programmable AND plane (show X marks at programmable intersections)
- Fixed OR plane (show hardwired connections)
- 2 outputs, each with dedicated AND gates
- Label: "Only AND plane programmable"

Interactive elements:
- Hover over each plane to see tooltip: "Programmable: configured by user" or "Fixed: hardwired at manufacturing"
- Toggle between "Shared term" example and "Dedicated term" example to see the difference
- Speed comparison indicator showing propagation delay difference

Color scheme: Programmable elements in blue, fixed elements in orange, shared terms highlighted in green
Canvas size: 800x500px, responsive

Implementation: HTML/CSS/JavaScript with SVG
</details>

---

## 11.6 Simple PLD (SPLD) Summary

ROMs, PLAs, and PALs collectively form the **Simple PLD** (SPLD) family. Each represents a different point in the trade-off space between flexibility, speed, and cost.

Choosing among SPLDs depends on the application:

- **Use a ROM** when the function has many inputs that contribute many product terms (the ROM generates all minterms automatically, so no minimization is needed).
- **Use a PLA** when the function has shared product terms across multiple outputs and the total number of distinct terms is small relative to the number of minterms.
- **Use a PAL** when speed is critical, functions have moderate complexity, and product term sharing is not essential.

| Criterion | ROM | PLA | PAL |
|-----------|-----|-----|-----|
| AND plane | Fixed (decoder) | Programmable | Programmable |
| OR plane | Programmable | Programmable | Fixed |
| Minimization needed? | No | Yes | Yes |
| Product term sharing | N/A (all minterms) | Yes | No |
| Size growth | $2^n$ (exponential) | Linear in terms | Linear per output |
| Best for | Dense functions | Shared-term functions | Speed-critical designs |

!!! note "The GAL Device"
    The **Generic Array Logic (GAL)** device, introduced by Lattice Semiconductor, is an electrically erasable PAL. The GAL16V8 and GAL22V10 became industry standards because they could emulate most PAL devices while being reprogrammable, dramatically reducing development costs.

---

## 11.7 Complex PLD (CPLD) Architecture

As designs grew beyond the capacity of a single PAL, designers needed more logic capacity without the wiring complexity of multiple discrete PLDs on a board. **Complex PLDs (CPLDs)** address this by integrating multiple PAL-like blocks onto a single chip and connecting them through a programmable interconnect matrix.

### CPLD Structure

A CPLD consists of:

1. **Function Blocks (FBs):** Each function block resembles a complete PAL device with a programmable AND array, fixed OR gates, and macrocells. A typical CPLD contains 2 to 64 function blocks.
2. **Macrocells:** Each function block contains multiple macrocells (typically 16-36). A macrocell includes an OR gate (combining product terms), an optional flip-flop for registered outputs, and output configuration logic (polarity, tri-state, feedback path).
3. **Programmable Interconnect Matrix:** A global routing structure that connects the outputs of any function block to the inputs of any other function block. This matrix enables inter-block communication without external wiring.
4. **I/O Blocks:** Interface between internal logic and external pins, with configurable direction (input, output, bidirectional) and drive strength.

#### Diagram: CPLD Architecture Block Diagram

<iframe src="../sims/cpld-architecture/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>CPLD Architecture Block Diagram</summary>
Type: diagram

Bloom Level: Understand (L2)
Bloom Verb: Explain, describe

Learning Objective: Explain how a CPLD integrates multiple PAL-like function blocks with a global interconnect matrix to implement larger digital designs on a single chip.

Components to show:
- 4 Function Blocks arranged in a 2x2 grid, each labeled "FB1" through "FB4"
- Inside each function block: programmable AND array, OR gates, macrocells with flip-flops
- Central Programmable Interconnect Matrix connecting all function blocks
- I/O Blocks around the perimeter connected to external pins
- Feedback paths from function block outputs back to the interconnect

Connections:
- Bidirectional arrows between each function block and the interconnect matrix
- Arrows from I/O blocks to the interconnect matrix
- Internal arrows within each function block (AND array → OR → macrocell → output)

Style: Hierarchical block diagram with clear layering
Labels: "Function Block", "Macrocell", "AND Array", "Interconnect Matrix", "I/O Block"
Color scheme: Function blocks in blue, interconnect in orange, I/O in green, macrocells in purple

Interactive elements:
- Click on a function block to zoom in and see internal structure
- Hover over interconnect to see routing explanation
- Highlight signal path from input pin through function blocks to output pin

Canvas size: 800x550px, responsive

Implementation: p5.js or vis-network
</details>

### CPLD Characteristics

- **Predictable timing:** Because the interconnect matrix provides fixed routing paths, propagation delays through a CPLD are predictable and consistent—critical for timing-sensitive designs.
- **Non-volatile:** Most CPLDs use EEPROM or flash-based programming, retaining their configuration without external memory.
- **Instant-on:** CPLDs are functional immediately at power-up (no configuration loading time).
- **Moderate capacity:** Typically range from hundreds to tens of thousands of logic gates equivalent.

---

## 11.8 Field-Programmable Gate Array (FPGA) Concepts

The **Field-Programmable Gate Array (FPGA)** represents the most flexible and highest-capacity family of programmable logic devices. Unlike CPLDs, which build logic from AND-OR arrays, FPGAs use a fundamentally different approach: **lookup tables (LUTs)** that can implement any Boolean function of a small number of variables.

An FPGA is not programmed with product terms—it is configured by loading a **bitstream** that sets the contents of thousands of small lookup tables, configures multiplexers for routing, and sets flip-flop initial states. This architecture enables FPGAs to implement not just combinational logic but also complex sequential systems, processors, memory interfaces, and entire systems-on-chip.

### FPGA vs CPLD

| Feature | CPLD | FPGA |
|---------|------|------|
| Logic Implementation | AND-OR arrays (product terms) | Lookup Tables (LUTs) |
| Architecture | PAL-like function blocks | Array of configurable logic blocks |
| Routing | Global interconnect matrix (predictable) | Segmented routing (variable delay) |
| Configuration Storage | Non-volatile (flash/EEPROM) | Usually SRAM (volatile) |
| Power-up | Instant-on | Requires configuration loading |
| Capacity | Hundreds to thousands of gates | Thousands to billions of gates |
| Best for | Glue logic, simple state machines | Complex systems, DSP, processors |

---

## 11.9 Lookup Tables (LUTs)

A **Lookup Table (LUT)** is a small memory (essentially a tiny ROM) that stores the truth table of a Boolean function. A $k$-input LUT contains $2^k$ memory cells and can implement **any** Boolean function of $k$ or fewer variables.

The most common sizes are:

- **4-input LUT (LUT-4):** Contains $2^4 = 16$ memory cells. Can implement any function of up to 4 variables.
- **6-input LUT (LUT-6):** Contains $2^6 = 64$ memory cells. Can implement any function of up to 6 variables. Used in modern Xilinx and Intel FPGAs.

A LUT-4 works exactly like the ROM described in Section 11.3, but with only 4 address inputs:

1. The 4 input signals select one of the 16 stored values via a 16:1 multiplexer.
2. The selected value appears at the output.
3. The stored values are loaded from the FPGA bitstream during configuration.

#### Diagram: 4-Input LUT Structure and Operation

<iframe src="../sims/lut-explorer/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>4-Input LUT Structure and Operation</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: Implement, demonstrate

Learning Objective: Demonstrate how a 4-input lookup table implements any Boolean function by configuring its 16 memory cells to match a truth table, and verify operation by testing all input combinations.

Visual elements:
- Left side: 4 input toggle switches labeled A, B, C, D
- Center: 16-cell memory array (4x4 grid) showing stored 0/1 values, with the currently addressed cell highlighted
- A 16:1 MUX symbol showing the input selection lines
- Right side: Output value display

Interactive controls:
- 4 input toggle switches (A, B, C, D) to select an address
- Click any memory cell to toggle its stored value (0 or 1)
- "Load Function" dropdown: select from preset functions (AND, OR, XOR, Majority, custom SOP)
- "Test All" button: automatically cycles through all 16 combinations and shows the truth table
- Display: current Boolean expression inferred from LUT contents

Data Visibility Requirements:
- Show the 4-bit address formed by current inputs
- Highlight the addressed memory cell
- Show the path from address to output through the MUX
- Display the equivalent SOP expression

Instructional Rationale: Allowing students to manually configure LUT contents and observe the resulting Boolean function reinforces that a LUT is simply a truth table in hardware. The "Load Function" dropdown connects familiar Boolean expressions to LUT programming.

Color scheme: Memory cells in light blue (0) and gold (1), active cell highlighted with border, MUX in gray
Canvas size: 800x500px, responsive

Implementation: p5.js
</details>

### Why LUTs Are Powerful

The LUT approach has a remarkable property: **any** Boolean function of $k$ inputs requires exactly one $k$-input LUT, regardless of the function's complexity. Whether the function is a simple AND gate or a complex expression with many product terms, the LUT implements it in constant time with identical propagation delay.

For functions with more than $k$ inputs, the FPGA tools automatically decompose the function across multiple LUTs and route signals between them. This decomposition is handled by the **technology mapping** step of the FPGA design flow.

---

## 11.10 Configurable Logic Blocks (CLBs)

LUTs are grouped into larger units called **Configurable Logic Blocks (CLBs)**, which form the basic building blocks of the FPGA fabric. The exact composition varies by manufacturer, but a typical CLB contains:

- **Multiple LUTs** (2 to 8 per CLB) for implementing combinational logic
- **Flip-flops** (one per LUT output) for implementing sequential logic—each LUT output can optionally be registered
- **Carry chain logic** for efficient arithmetic (adders, counters)
- **Multiplexers** for combining LUT outputs and selecting between combinational and registered outputs
- **Local routing** connecting elements within the CLB

A modern FPGA may contain thousands to millions of CLBs arranged in a regular two-dimensional array.

### CLB Architecture (Simplified)

A simplified CLB with 2 LUT-4s and 2 flip-flops provides:

- Two independent 4-input combinational functions, **or**
- One 5-input function (by using both LUTs with a combining MUX), **or**
- Two 4-input registered functions (outputs captured by flip-flops), **or**
- Various combinations of combinational and sequential logic

The versatility of CLBs means that the same physical hardware can implement combinational circuits (Units 2-8) or sequential circuits (Units 9-10) simply by loading different configuration bits.

#### Diagram: CLB Internal Architecture

<iframe src="../sims/clb-architecture/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>CLB Internal Architecture</summary>
Type: diagram

Bloom Level: Analyze (L4)
Bloom Verb: Examine, deconstruct

Learning Objective: Examine the internal architecture of a Configurable Logic Block by deconstructing it into its constituent LUTs, flip-flops, multiplexers, and carry chain, understanding how each component contributes to the CLB's versatility.

Components to show:
- 2 LUT-4 blocks with 4 inputs each (labeled LUT-A and LUT-B)
- 2 D flip-flops (one after each LUT output)
- 2 output multiplexers choosing between LUT output (combinational) and flip-flop output (registered)
- 1 function-combining MUX for creating 5-input functions
- Carry chain input and output for arithmetic
- Clock input to both flip-flops
- CLB output pins

Connections:
- LUT inputs from routing fabric
- LUT outputs to flip-flop D inputs and to output MUX
- Flip-flop Q outputs to output MUX
- Carry chain passing through
- Output MUX outputs to routing fabric

Style: Detailed block diagram with signal flow arrows
Color scheme: LUTs in blue, flip-flops in purple, MUXes in orange, carry chain in green
Labels: All signals labeled with bit widths

Interactive elements:
- Toggle "Combinational / Registered" mode to see MUX configuration change
- Toggle "Independent / Combined" LUT mode

Canvas size: 800x550px, responsive

Implementation: p5.js
</details>

---

## 11.11 FPGA Routing Resources

The routing fabric is what transforms an array of isolated CLBs into a connected system. FPGA routing resources typically include:

- **Local interconnects:** Short wires connecting adjacent CLBs for fast, direct communication between neighbors.
- **General-purpose routing:** Longer segmented wire channels running horizontally and vertically through the FPGA. Programmable switch matrices at intersections connect wire segments.
- **Long lines:** Dedicated wires spanning the full width or height of the chip for global signals (clocks, resets) that must reach all CLBs with minimal skew.
- **Clock distribution networks:** Specialized low-skew routing trees that deliver clock signals simultaneously to all flip-flops across the device.

The routing architecture is a critical factor in FPGA performance. Unlike CPLDs where the global interconnect matrix provides predictable delays, FPGA signal delays vary depending on the route taken—a signal passing through many switch matrices experiences more delay than one using a direct connection. This makes **timing analysis** essential in FPGA design.

!!! warning "Routing Congestion"
    An FPGA design can fail to implement even when sufficient CLBs are available if the routing resources are exhausted. Modern FPGA tools report routing utilization alongside logic utilization to help designers avoid this problem.

---

## 11.12 FPGA I/O Blocks

The **Input/Output (I/O) blocks** surround the FPGA's CLB array and interface between internal logic and external pins. Modern FPGA I/O blocks are highly configurable:

- **Direction:** Configurable as input, output, or bidirectional
- **Voltage levels:** Support multiple I/O standards (LVCMOS, LVTTL, LVDS, SSTL)
- **Drive strength:** Programmable output current
- **Slew rate:** Fast or slow edge rates to control signal integrity
- **Pull-up/pull-down:** Internal resistors for default states
- **Input registers:** Flip-flops within the I/O block to capture incoming data with minimal setup time
- **Output registers:** Flip-flops to drive outputs synchronously with the clock
- **DDR support:** Double-data-rate registers for high-speed interfaces

---

## 11.13 SRAM-Based vs Flash-Based FPGAs

The two dominant FPGA configuration technologies present a fundamental trade-off:

**SRAM-based FPGAs** (Xilinx/AMD, Intel/Altera):

- Configuration stored in volatile SRAM cells
- Must be loaded from external flash memory at every power-up
- Unlimited reconfiguration
- Highest density (smallest transistor sizes)
- Supports **partial reconfiguration**—changing part of the design while the rest continues operating
- Configuration time: milliseconds to seconds depending on size
- Dominant in high-performance applications

**Flash-based FPGAs** (Microchip/Microsemi):

- Configuration stored in non-volatile flash cells
- Instant-on operation (no boot time)
- Retains configuration without external memory
- Lower density than SRAM-based devices
- Lower static power consumption
- Preferred for safety-critical and space applications
- Limited reprogramming cycles (~10K)

#### Diagram: FPGA Configuration and Operation Flow

<iframe src="../sims/fpga-config-flow/main.html" width="100%" height="450px" scrolling="no"></iframe>

<details markdown="1">
<summary>FPGA Configuration and Operation Flow</summary>
Type: workflow

Bloom Level: Understand (L2)
Bloom Verb: Describe, summarize

Learning Objective: Describe the complete FPGA configuration process from power-up through bitstream loading to functional operation, contrasting SRAM-based and flash-based approaches.

Process steps:
1. Start: "Power Applied"
   Hover text: "FPGA receives power supply voltage"

2. Decision: "SRAM or Flash?"
   Hover text: "Device type determines configuration method"

3a. Process (SRAM path): "Load Bitstream from External Flash"
   Hover text: "Configuration data transferred from flash ROM to SRAM cells; takes ms to seconds"

3b. Process (Flash path): "Configuration Already Present"
   Hover text: "Flash-based FPGA retains configuration; operational within microseconds"

4. Process: "Initialize CLBs, Routing, I/O"
   Hover text: "LUT contents loaded, MUX settings applied, routing switches configured"

5. Process: "Release Global Reset"
   Hover text: "All flip-flops released from reset; designed logic begins operating"

6. End: "FPGA Operational"
   Hover text: "Device is now functioning as the configured digital circuit"

Visual style: Flowchart with decision diamond and parallel paths
Color scheme: SRAM path in blue, Flash path in green, common steps in gray
Canvas size: 800x450px, responsive

Implementation: HTML/CSS/JavaScript
</details>

---

## 11.14 FPGA Design Flow

Implementing a digital design on an FPGA involves a well-defined sequence of steps, quite different from the "draw a schematic and build it" approach of discrete logic:

1. **Design Entry:** Describe the circuit using a Hardware Description Language (HDL) such as VHDL or Verilog, or using schematic capture tools. HDL is the industry standard for any non-trivial design.

2. **Functional Simulation:** Verify that the HDL code behaves correctly by simulating it with test inputs (a **testbench**). This step catches logical errors before any hardware is involved.

3. **Synthesis:** A synthesis tool translates the HDL into a **netlist**—a description of the design in terms of generic logic elements (gates, flip-flops, MUXes). The tool performs Boolean optimization and technology-independent simplification.

4. **Technology Mapping:** The generic netlist is mapped to the specific resources of the target FPGA (LUTs, flip-flops, carry chains, block RAMs). This step determines how many CLBs are needed.

5. **Placement:** The mapped elements are assigned to specific physical CLB locations on the FPGA chip. Good placement minimizes routing distances and improves timing.

6. **Routing:** The placement tool's output is fed to a router that connects CLB inputs and outputs using the FPGA's routing fabric. The router must satisfy all connections while meeting timing constraints.

7. **Timing Analysis:** A static timing analyzer verifies that all signal paths meet setup and hold time requirements. Critical paths that violate timing may require the designer to restructure the HDL or add pipeline stages.

8. **Bitstream Generation:** The final placement and routing are converted into a binary bitstream file that configures the FPGA.

9. **Programming:** The bitstream is loaded into the FPGA (and optionally into an external flash for persistent storage).

10. **Hardware Verification:** The configured FPGA is tested with real signals to verify correct operation in the target system.

#### Diagram: FPGA Design Flow

<iframe src="../sims/fpga-design-flow/main.html" width="100%" height="600px" scrolling="no"></iframe>

<details markdown="1">
<summary>FPGA Design Flow</summary>
Type: workflow

Bloom Level: Remember (L1)
Bloom Verb: List, identify

Learning Objective: Identify the sequential steps in the FPGA design flow from HDL entry through synthesis, mapping, placement, routing, timing analysis, and bitstream generation to hardware programming.

Process steps (vertical flowchart):
1. "Design Entry (HDL)" - icon: code file
2. "Functional Simulation" - icon: waveform, with feedback arrow back to step 1 labeled "Fix bugs"
3. "Synthesis" - icon: logic gate
4. "Technology Mapping" - icon: LUT symbol
5. "Placement" - icon: grid with placed blocks
6. "Routing" - icon: connected paths
7. "Timing Analysis" - icon: clock, with feedback arrow back to step 1 labeled "Timing violation"
8. "Bitstream Generation" - icon: binary file
9. "FPGA Programming" - icon: chip
10. "Hardware Verification" - icon: oscilloscope

Visual style: Vertical flowchart with icons at each step and feedback loops
Color scheme: Design steps in blue gradient (darker as process advances), feedback arrows in red
Labels: Each step labeled with its tool name (e.g., "Vivado Synthesis", "Place & Route")

Interactive elements:
- Hover over each step to see a 2-3 sentence description of what happens
- Click to see input/output file types for each step

Canvas size: 700x600px, responsive

Implementation: HTML/CSS/JavaScript with SVG
</details>

---

## 11.15 Technology Mapping

**Technology mapping** is the process of transforming a generic netlist (from synthesis) into the specific primitives available on the target FPGA or PLD. This step is critical because it determines how efficiently the design uses the available hardware.

For FPGA targets, technology mapping involves:

- **Decomposing functions into LUTs:** A Boolean function with more than $k$ inputs (where $k$ is the LUT size) must be broken into a network of smaller functions, each fitting in a single LUT. The mapper minimizes the total number of LUTs while keeping the critical path delay short.
- **Packing into CLBs:** The mapper groups related LUTs and flip-flops into CLBs, maximizing the use of internal CLB resources (carry chains, local routing).
- **Inferring dedicated resources:** Modern FPGAs include specialized blocks for common functions—block RAM for memory, DSP slices for multiplication, and clock managers for frequency synthesis. The mapper recognizes patterns in the netlist and maps them to these dedicated resources instead of using general-purpose CLBs.

For CPLD/PAL targets, technology mapping involves:

- **Fitting functions into product terms:** The mapper determines whether each function can fit within the available product terms per macrocell.
- **Pin assignment:** Mapping logical I/O to physical device pins.

---

## 11.16 Hardware Description Languages for PLDs

All modern PLD design uses **Hardware Description Languages (HDLs)** rather than manual schematic entry. The two dominant HDLs are:

- **VHDL (VHSIC Hardware Description Language):** A strongly-typed, verbose language originating from a U.S. Department of Defense initiative. VHDL emphasizes design safety through strict type checking. Widely used in aerospace, defense, and European industry.
- **Verilog:** A more concise language with syntax resembling C. Popular in the U.S. semiconductor industry and for ASIC design. Its successor, **SystemVerilog**, adds verification features.

Both languages can describe:

- **Combinational logic:** Boolean equations, truth tables, conditional assignments
- **Sequential logic:** Flip-flops, registers, state machines
- **Structural designs:** Hierarchical interconnection of components
- **Behavioral designs:** High-level algorithmic descriptions that synthesis tools convert to hardware

Unit 12 provides a detailed introduction to VHDL for implementing the circuits studied throughout this course.

---

## 11.17 PLD Selection Criteria

Choosing the right programmable logic device for a project involves evaluating several factors:

- **Logic capacity:** How many equivalent gates or LUTs does the design require? SPLDs handle hundreds of gates; CPLDs handle thousands; FPGAs handle millions.
- **Speed requirements:** CPLDs offer predictable timing; FPGAs offer higher clock frequencies but variable routing delays.
- **Power consumption:** Flash-based devices offer lower standby power; SRAM-based FPGAs consume more due to configuration storage.
- **Configuration volatility:** Does the application require instant-on (non-volatile) or can it tolerate boot-up time?
- **I/O requirements:** How many pins are needed? What I/O standards must be supported?
- **Cost sensitivity:** SPLDs cost pennies; high-end FPGAs cost thousands of dollars.
- **Development tools:** Are vendor tools and IP libraries available?
- **Production volume:** PLDs are cost-effective for low-to-medium volumes; ASICs become economical at high volumes.

#### Diagram: PLD Selection Decision Tree

<iframe src="../sims/pld-selection-tree/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>PLD Selection Decision Tree</summary>
Type: infographic

Bloom Level: Evaluate (L5)
Bloom Verb: Assess, recommend

Learning Objective: Assess project requirements and recommend the most appropriate programmable logic device by navigating a decision tree that considers logic capacity, speed, power, volatility, and cost constraints.

Layout: Interactive decision tree with branching paths

Decision nodes:
1. "How many equivalent gates?" → <500: SPLD path, 500-50K: CPLD path, >50K: FPGA path
2. SPLD path: "Product term sharing needed?" → Yes: PLA, No: PAL/GAL
3. CPLD path: "Predictable timing critical?" → Yes: CPLD, Consider: FPGA with timing constraints
4. FPGA path: "Instant-on required?" → Yes: Flash FPGA, No: SRAM FPGA
5. FPGA path: "Volume >100K units?" → Yes: Consider ASIC, No: Stay with FPGA

Interactive elements:
- Click through decision points to navigate the tree
- Each endpoint shows a recommended device family with key characteristics
- "Start Over" button to reset
- Hover over each decision for explanation of the criterion

Visual style: Tree diagram with colored nodes for each device family
Color scheme: ROM in red, PLA in orange, PAL in yellow, CPLD in green, FPGA in blue, ASIC in purple

Canvas size: 800x500px, responsive

Implementation: HTML/CSS/JavaScript with SVG
</details>

---

## 11.18 Applications of Programmable Logic

Programmable logic devices permeate modern electronic systems:

- **Prototyping and development:** FPGAs allow designers to test digital designs in real hardware before committing to expensive ASIC fabrication.
- **Telecommunications:** FPGAs implement signal processing algorithms in 5G base stations, network switches, and fiber-optic transceivers.
- **Automotive:** CPLDs and FPGAs implement sensor fusion, ADAS (Advanced Driver-Assistance Systems), and in-vehicle networking.
- **Aerospace and defense:** Flash-based FPGAs are used in satellites and avionics where radiation tolerance and non-volatility are essential.
- **Data centers:** FPGAs serve as hardware accelerators for machine learning inference, database queries, and network packet processing.
- **Consumer electronics:** CPLDs handle glue logic in displays, peripheral interfaces, and power management controllers.
- **Medical devices:** FPGAs implement real-time image processing in ultrasound machines and MRI systems.
- **Industrial control:** PLDs implement custom motor controllers, PLC logic, and safety interlocks.

!!! info "FPGA vs GPU vs CPU"
    FPGAs excel at tasks requiring massive parallelism with low latency, such as real-time signal processing. Unlike CPUs (serial execution) or GPUs (parallel but with fixed architecture), FPGAs can be configured with custom data paths optimized for specific algorithms, achieving both high throughput and low power consumption.

---

## 11.19 Connecting PLDs to Prior Units

Every concept from Units 1 through 10 finds direct application in programmable logic:

| Prior Unit Topic | Application in PLDs |
|-----------------|-------------------|
| Boolean algebra (Unit 2) | Synthesis tools optimize Boolean expressions for LUT mapping |
| SOP/POS forms (Unit 4) | PLAs implement SOP directly; PALs use SOP with fixed OR |
| K-map/QM minimization (Units 5-6) | Minimization reduces product terms for PLA/PAL fitting |
| Multi-level logic (Unit 7) | FPGA synthesis creates multi-level networks of LUTs |
| MUX/Decoders (Unit 8) | LUTs are essentially MUXes; decoders form ROM addressing |
| Flip-flops (Unit 9) | CLB flip-flops implement registers and state machines |
| Counters/FSMs (Unit 10) | PAL registered outputs and FPGA CLBs implement sequential designs |

This connection illustrates why the foundational units matter: understanding Boolean algebra, minimization, and circuit design is essential for effective PLD programming, even when synthesis tools automate much of the process.

---

## 11.20 Key Takeaways

- **Programmable logic devices** allow hardware functionality to be configured after manufacturing, offering a balance between the flexibility of standard logic and the efficiency of custom ASICs.
- **ROMs** implement combinational logic by storing complete truth tables but grow exponentially with input count.
- **PLAs** offer maximum flexibility with both programmable AND and OR planes, supporting product term sharing across outputs.
- **PALs** trade flexibility for speed by fixing the OR plane, with each output having dedicated product terms.
- **CPLDs** integrate multiple PAL-like function blocks with a global interconnect matrix for predictable-timing designs of moderate complexity.
- **FPGAs** use lookup tables and configurable logic blocks to achieve the highest capacity and flexibility, capable of implementing entire systems-on-chip.
- **LUTs** are the fundamental building blocks of FPGAs—small memories that implement any Boolean function of $k$ inputs in constant time.
- The **FPGA design flow** transforms HDL code through synthesis, mapping, placement, routing, and timing analysis to produce a configuration bitstream.
- **Device selection** requires balancing capacity, speed, power, cost, and volatility requirements against the strengths of each PLD family.

??? question "Self-Check: Why can't a PAL share product terms between outputs like a PLA can?"
    In a PAL, the OR plane is **fixed**—each output is permanently connected to its own dedicated set of AND gates. Because these connections cannot be changed, a product term generated by one output's AND gates cannot be routed to another output's OR gate. In a PLA, the OR plane is programmable, so any product term from the AND plane can be connected to any output.

## Interactive Walkthrough

Program a PLA step-by-step by selecting product terms and connecting them to outputs:

<iframe src="../sims/pla-programming-walkthrough/main.html" width="100%" height="580px" scrolling="no"></iframe>
