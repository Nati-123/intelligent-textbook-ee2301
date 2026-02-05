---
title: Sequential Circuit Design
description: Registers, counters, state machines, and FSM design methodology
generated_by: claude skill chapter-content-generator
date: 2026-02-04 21:30:00
version: 0.03
---

# Unit 10: Sequential Circuit Design

## Summary

This unit brings together the concepts from previous units to design complete sequential circuits. Students will learn to design registers for parallel data storage and shifting, construct counters for various counting sequences, and master the systematic design of finite state machines (FSMs). The FSM design methodology—from state diagrams through state tables to optimized circuit implementations—forms the capstone of introductory digital design, enabling students to create controllers and sequencers that respond to inputs and produce timed output sequences.

## Concepts Covered

1. Register Fundamentals
2. Parallel Load Registers
3. Shift Register Operation
4. Serial-In-Serial-Out (SISO) Register
5. Serial-In-Parallel-Out (SIPO) Register
6. Parallel-In-Serial-Out (PISO) Register
7. Bidirectional Shift Registers
8. Universal Shift Register
9. Counter Fundamentals
10. Asynchronous (Ripple) Counters
11. Synchronous Counters
12. Binary Up Counter Design
13. Binary Down Counter Design
14. Up/Down Counter
15. Modulo-N Counters
16. BCD Counter (Decade Counter)
17. Ring Counter
18. Johnson Counter
19. Finite State Machine Concepts
20. Moore Machine Model
21. Mealy Machine Model
22. State Diagram Representation
23. State Table Construction
24. State Assignment Strategies
25. FSM Design Procedure
26. Next State Logic Design
27. Output Logic Design
28. One-Hot State Encoding
29. State Minimization
30. Sequence Detector Design

## Prerequisites

Before studying this unit, students should be familiar with:

- Flip-flops: D, JK, and T types (Unit 9)
- Timing diagrams and timing parameters (Unit 9)
- Characteristic and excitation tables (Unit 9)
- K-map simplification (Unit 5)
- Combinational building blocks (Unit 8)

---

## 10.1 Introduction to Sequential Circuit Design

Sequential circuit design combines memory elements (flip-flops) with combinational logic to create systems that maintain state and respond to sequences of inputs over time.

**Major categories of sequential circuits:**

| Type | Function | Examples |
|------|----------|----------|
| Registers | Store and manipulate parallel data | Data registers, shift registers |
| Counters | Generate counting sequences | Binary counters, BCD counters |
| State machines | Implement control sequences | Controllers, sequencers |

All three build upon the same fundamental structure: flip-flops storing state, combinational logic computing the next state and outputs.

## 10.2 Registers

A **register** is a group of flip-flops that stores a multi-bit binary value. Each flip-flop stores one bit.

### 10.2.1 Parallel Load Register

A **parallel load register** can load all bits simultaneously from parallel inputs.

**4-bit parallel load register:**
- 4 D flip-flops with common clock
- 4 data inputs ($D_3, D_2, D_1, D_0$)
- 4 data outputs ($Q_3, Q_2, Q_1, Q_0$)
- Load enable signal

**Operation:**
- When Load = 1: On clock edge, all $Q_i$ receive corresponding $D_i$
- When Load = 0: Register holds current value (using feedback or clock gating)

#### Diagram: 4-Bit Parallel Load Register

<details markdown="1">
<summary>Parallel Load Register Structure</summary>
Type: diagram

Create a block diagram of a 4-bit parallel load register:

Components:
- 4 D flip-flops arranged horizontally
- Common clock line
- Load enable input
- 4 data inputs (D3-D0)
- 4 outputs (Q3-Q0)
- 2-to-1 MUX at each flip-flop input for Load control

Connections:
- Each MUX selects between new data (D) and feedback (Q)
- Load signal controls all MUX select inputs
- Common clock to all flip-flops

Visual specifications:
- Canvas: 600×350px responsive
- Standard flip-flop symbols
- Clear signal labeling

Implementation: p5.js or SVG
</details>

### 10.2.2 Shift Registers

**Shift registers** move data bit-by-bit through a chain of flip-flops. On each clock pulse, data shifts one position.

**Types based on data movement:**

| Type | Serial In | Parallel In | Serial Out | Parallel Out |
|------|-----------|-------------|------------|--------------|
| SISO | ✓ | | ✓ | |
| SIPO | ✓ | | | ✓ |
| PISO | | ✓ | ✓ | |
| PIPO | | ✓ | | ✓ |

**4-bit SISO Shift Register Operation:**
```
Clock  Serial_In  Q3  Q2  Q1  Q0 (Serial_Out)
  0       1        0   0   0   0
  1       0        1   0   0   0
  2       1        0   1   0   0
  3       1        1   0   1   0
  4       0        1   1   0   1
```

### 10.2.3 Universal Shift Register

A **universal shift register** combines all shift register modes with parallel load capability:

**Modes:**

| S1 | S0 | Operation |
|----|----|-----------|
| 0 | 0 | Hold (no change) |
| 0 | 1 | Shift right |
| 1 | 0 | Shift left |
| 1 | 1 | Parallel load |

The 74194 is a classic 4-bit universal shift register IC.

## 10.3 Counters

**Counters** are sequential circuits that cycle through a predetermined sequence of states. The most common are binary counters.

### 10.3.1 Asynchronous (Ripple) Counters

In **asynchronous** or **ripple** counters, each flip-flop is clocked by the output of the previous stage, not a common clock.

**4-bit ripple up counter:**
- T flip-flops with T=1 (always toggle)
- $Q_0$ clocked by external clock
- $Q_1$ clocked by $Q_0$, $Q_2$ clocked by $Q_1$, etc.
- Counts: 0000 → 0001 → 0010 → ... → 1111 → 0000

**Advantages:** Simple, minimal hardware
**Disadvantages:** Accumulated propagation delay ("ripple"), not all bits change simultaneously

#### Diagram: Ripple Counter Animation

<details markdown="1">
<summary>4-Bit Ripple Counter Simulator</summary>
Type: MicroSim

Learning objective: Analyze the ripple effect in asynchronous counter operation (Bloom Level: Analyze)

Create an animated ripple counter demonstration:

Components:
- 4 T flip-flops in cascade
- External clock input
- Binary count display
- Timing diagram panel

Features:
- Adjustable clock speed
- Show propagation delay through each stage (ripple animation)
- Highlight which flip-flops are toggling
- Display binary and decimal count values
- Timing diagram showing clock and all Q outputs

Controls:
- Run/Stop button
- Single-step button
- Speed slider
- Reset button

Visual elements:
- Flip-flop symbols with internal state visible
- Clock signal arrows
- Propagation delay visualization
- Running binary/decimal display

Canvas: 700×500px responsive

Implementation: p5.js
</details>

### 10.3.2 Synchronous Counters

In **synchronous counters**, all flip-flops share a common clock, eliminating the ripple delay problem.

**Design approach:**
- Use T flip-flops (or JK with J=K)
- Determine when each bit should toggle
- A bit toggles when all lower bits are 1

**Toggle conditions for 4-bit up counter:**
$$T_0 = 1 \text{ (always toggle)}$$
$$T_1 = Q_0$$
$$T_2 = Q_0 Q_1$$
$$T_3 = Q_0 Q_1 Q_2$$

Each bit toggles when all less significant bits are 1.

### 10.3.3 Modulo-N Counters

A **modulo-N counter** counts from 0 to N-1, then resets to 0 (counts N states).

**Design methods:**

1. **Reset method:** Use normal binary counter, detect state N, reset all flip-flops
2. **Preset method:** Skip unwanted states by loading a specific value

**Example: Mod-6 counter (counts 0-5)**
- Detect state 110 (6 in binary)
- Reset all flip-flops to 000
- Or: Preset to appropriate state to skip 6-9

### 10.3.4 Special Counters

**Ring Counter:**
- Shift register with single 1 circulating
- N flip-flops → N states
- States: 1000 → 0100 → 0010 → 0001 → 1000
- One-hot encoding, simple decoding

**Johnson Counter (Twisted Ring):**
- Shift register with complement fed back
- N flip-flops → 2N states
- States (4-bit): 0000 → 1000 → 1100 → 1110 → 1111 → 0111 → 0011 → 0001 → 0000
- Glitch-free decoding possible

| Counter Type | Flip-Flops | States | Decoding |
|-------------|------------|--------|----------|
| Binary | n | 2^n | Complex |
| Ring | n | n | Simple (1-hot) |
| Johnson | n | 2n | Moderate |

## 10.4 Finite State Machines

A **finite state machine (FSM)** is a sequential circuit with a finite number of states, defined inputs, outputs, and rules for transitioning between states.

### 10.4.1 FSM Models

**Moore Machine:**
- Outputs depend **only on current state**
- Output changes synchronously with state changes
- Output logic: $O = f(S)$

**Mealy Machine:**
- Outputs depend on **current state AND current inputs**
- Output can change asynchronously with inputs
- Output logic: $O = f(S, I)$

| Feature | Moore | Mealy |
|---------|-------|-------|
| Output depends on | State only | State + inputs |
| Output timing | Synchronous | Can be asynchronous |
| Typical state count | Often more states | Often fewer states |
| Output glitches | Less likely | More likely |

### 10.4.2 State Diagram Representation

**Moore machine state diagram:**
- Circles represent states
- Output is written inside each state circle (or below state name)
- Arrows show transitions, labeled with input conditions

**Mealy machine state diagram:**
- Circles represent states
- Arrows labeled with input/output pairs (e.g., "0/1")

#### Diagram: Moore vs Mealy State Diagrams

<details markdown="1">
<summary>Comparison of Moore and Mealy State Diagrams</summary>
Type: diagram

Create side-by-side state diagrams for a simple sequence detector (detecting "01"):

Left: Moore machine
- States: S0 (output 0), S1 (output 0), S2 (output 1)
- Transitions labeled with input only
- Output shown inside state circles

Right: Mealy machine
- States: S0, S1
- Transitions labeled with input/output
- Output shown on transitions

Additional annotations:
- Highlight where outputs are specified
- Show equivalent behavior for same input sequence

Visual specifications:
- Canvas: 650×400px responsive
- State circles with labels
- Directed arrows with labels
- Color coding: states (blue), transitions (gray), outputs (green)

Implementation: p5.js or SVG
</details>

## 10.5 FSM Design Procedure

The systematic FSM design procedure follows these steps:

### Step 1: Problem Specification
- Understand the required behavior
- Identify inputs and outputs
- Determine the states needed

### Step 2: State Diagram
- Draw states as circles
- Add transitions based on input conditions
- Specify outputs (in states for Moore, on transitions for Mealy)

### Step 3: State Table
Convert the state diagram to a tabular form:

| Current State | Input | Next State | Output |
|--------------|-------|------------|--------|
| S0 | 0 | S0 | 0 |
| S0 | 1 | S1 | 0 |
| S1 | 0 | S2 | 0 |
| ... | ... | ... | ... |

### Step 4: State Assignment
Assign binary codes to states. Common strategies:

| Strategy | Description | Best For |
|----------|-------------|----------|
| Binary | Sequential: 00, 01, 10, 11 | Minimum flip-flops |
| Gray code | Adjacent states differ by 1 bit | Reduced transitions |
| One-hot | One flip-flop per state | Fast, simple logic (FPGAs) |

### Step 5: Transition Table
Create transition table with binary state codes:

| Q1 | Q0 | Input | Q1+ | Q0+ | Output |
|----|----|-------|-----|-----|--------|
| 0 | 0 | 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 0 | 1 | 0 |
| ... | ... | ... | ... | ... | ... |

### Step 6: Next State and Output Logic
- Use K-maps or Boolean algebra to derive minimal expressions
- Use flip-flop excitation tables if using JK flip-flops

### Step 7: Circuit Implementation
- Draw the circuit with flip-flops and combinational logic
- Verify operation with timing simulation

#### Diagram: FSM Design Procedure Flowchart

<details markdown="1">
<summary>Complete FSM Design Workflow</summary>
Type: diagram

Create a flowchart showing the FSM design procedure:

Steps (top to bottom):
1. Problem Specification → State Diagram
2. State Diagram → State Table
3. State Table → State Assignment
4. State Assignment → Transition Table with Binary Codes
5. Transition Table → K-map Simplification
6. K-maps → Boolean Equations
7. Boolean Equations → Circuit Implementation

Side elements:
- Example snippets at each step
- Decision points for choosing flip-flop type
- Verification loop back to specification

Visual specifications:
- Canvas: 500×600px responsive
- Flowchart boxes with rounded corners
- Arrows showing process flow
- Icons representing each step type

Implementation: p5.js or SVG
</details>

## 10.6 Example: Sequence Detector Design

Design a Moore machine to detect the input sequence "101" (overlapping allowed).

### Step 1: Specification
- Input: X (serial bit stream)
- Output: Z = 1 when "101" detected
- Overlapping: After detecting "101", the final "1" can be the start of a new "101"

### Step 2: State Diagram

States:
- S0: No bits of pattern received
- S1: Received "1"
- S2: Received "10"
- S3: Received "101" (output = 1)

### Step 3: State Table

| Current State | X=0 | X=1 | Output |
|--------------|-----|-----|--------|
| S0 | S0 | S1 | 0 |
| S1 | S2 | S1 | 0 |
| S2 | S0 | S3 | 0 |
| S3 | S2 | S1 | 1 |

### Step 4: State Assignment

Binary: S0=00, S1=01, S2=10, S3=11

### Step 5: Transition Table

| Q1 | Q0 | X | Q1+ | Q0+ | Z |
|----|----|---|-----|-----|---|
| 0 | 0 | 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 0 | 1 | 0 |
| 0 | 1 | 0 | 1 | 0 | 0 |
| 0 | 1 | 1 | 0 | 1 | 0 |
| 1 | 0 | 0 | 0 | 0 | 0 |
| 1 | 0 | 1 | 1 | 1 | 0 |
| 1 | 1 | 0 | 1 | 0 | 1 |
| 1 | 1 | 1 | 0 | 1 | 1 |

### Step 6: K-map Simplification

**For Q1+ (D1):**
$$D_1 = Q_0'X + Q_1Q_0'$$

**For Q0+ (D0):**
$$D_0 = X$$

**For Z:**
$$Z = Q_1Q_0$$

### Step 7: Implementation

The circuit uses 2 D flip-flops plus combinational logic for D1, D0, and Z.

#### Diagram: Sequence Detector Interactive Demo

<details markdown="1">
<summary>101 Sequence Detector Simulator</summary>
Type: MicroSim

Learning objective: Apply FSM design principles to trace sequence detection (Bloom Level: Apply)

Create an interactive sequence detector:

Features:
- State diagram display with current state highlighted
- Bit input buttons (0 and 1)
- Input history display
- Output indicator (LED lights when "101" detected)
- State transition animation

Controls:
- "Input 0" and "Input 1" buttons
- "Reset" button
- "Auto-run random" toggle

Visual elements:
- State diagram with 4 states
- Current state highlighting
- Transition animation
- Input sequence history
- Output status display
- Timing diagram showing input, state, output over time

Canvas: 700×550px responsive

Implementation: p5.js
</details>

## 10.7 One-Hot State Encoding

**One-hot encoding** uses one flip-flop per state, with exactly one flip-flop set to 1 at any time.

**Advantages:**
- Simple next-state logic (often just AND/OR gates)
- Fast (minimal logic levels)
- Easy to add states
- Well-suited for FPGAs

**Disadvantages:**
- Uses more flip-flops than binary encoding
- More susceptible to errors (illegal states possible)

**For N states:**
- Binary encoding: $\lceil\log_2 N\rceil$ flip-flops
- One-hot encoding: N flip-flops

| States | Binary FFs | One-Hot FFs |
|--------|-----------|-------------|
| 4 | 2 | 4 |
| 8 | 3 | 8 |
| 16 | 4 | 16 |

## 10.8 State Minimization

**State minimization** reduces the number of states in an FSM while preserving input-output behavior. Two states can be merged if they:

1. Have the same outputs (for Moore machines)
2. Have equivalent next states for all inputs

**Techniques:**
- Implication table method
- Row matching method
- Algorithmic state minimization

Minimization reduces flip-flop count and often simplifies next-state logic.

## 10.9 Summary

This unit covered the design of sequential circuits:

- **Registers** store multi-bit values with parallel load and shift capabilities
- **Shift registers** move data serially with various I/O configurations
- **Counters** cycle through sequences: ripple (asynchronous) or synchronous
- **Modulo-N counters** count custom ranges using reset or skip techniques
- **Ring and Johnson counters** provide special sequences with easy decoding
- **Finite state machines** (Moore and Mealy) implement control logic
- **FSM design procedure** systematically converts specifications to circuits
- **State assignment** strategies affect circuit complexity
- **One-hot encoding** trades flip-flops for simpler logic
- **State minimization** reduces unnecessary states

These techniques enable designers to create controllers, protocol handlers, and any sequential logic system required in digital design.
