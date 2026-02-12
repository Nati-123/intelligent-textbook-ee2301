---
title: Sequential Circuit Design
description: Registers, counters, state machines, and FSM design methodology
generated_by: claude skill generate-chapter-content
date: 2026-02-05 18:00:00
version: 0.03
---

# Unit 10: Sequential Circuit Design

<div class="video-overview" markdown>
**Video Overview:** *AI-narrated overview of this unit with animated slides — coming soon.*
</div>

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

The preceding unit established how individual flip-flops store single bits of information and respond to clock edges. This unit takes the next step: combining multiple flip-flops with combinational logic to build **functional sequential systems** — registers that store and manipulate multi-bit data, counters that generate ordered sequences, and finite state machines that implement complex control behavior.

Sequential circuit design is the capstone of introductory digital logic. Every processor, communication controller, and embedded system relies on the design methodologies presented here. The three major categories of sequential circuits form a natural progression of complexity:

| Category | Purpose | Key Characteristic | Design Complexity |
|----------|---------|-------------------|-------------------|
| Registers | Store and transfer multi-bit data | Parallel or serial data movement | Low |
| Counters | Generate counting sequences | Predetermined state sequence | Medium |
| Finite State Machines | Implement arbitrary control logic | Input-dependent state transitions | High |

All three categories share a common architecture: **flip-flops** hold the current state, **combinational logic** computes the next state and outputs, and a **clock signal** synchronizes state transitions. The difference lies in how the next-state logic is structured and how complex the state-transition rules are.

!!! info "Design Hierarchy"
    Registers and counters are actually special cases of finite state machines with highly regular next-state logic. Understanding them as separate categories simplifies learning, but recognizing their common FSM foundation deepens architectural understanding.

---

## 10.2 Register Fundamentals

A **register** is a group of flip-flops that collectively store a multi-bit binary word. An $n$-bit register consists of $n$ flip-flops sharing a common clock signal, with each flip-flop storing one bit of the word.

Registers are the most fundamental storage elements in digital systems. They appear everywhere:

- **Data registers** in processors hold operands and results
- **Address registers** point to memory locations
- **Instruction registers** hold the currently executing instruction
- **Status registers** store condition flags
- **I/O registers** buffer data to and from peripherals

The two fundamental operations on registers are **parallel load** (writing all bits simultaneously) and **shift** (moving bits one position per clock cycle).

---

## 10.3 Parallel Load Registers

A **parallel load register** accepts all $n$ data bits simultaneously on a single clock edge, making it ideal for capturing the output of a combinational circuit or receiving data from a bus.

### 10.3.1 Structure

A 4-bit parallel load register consists of:

- Four D flip-flops with a common clock
- Four data inputs: $D_3, D_2, D_1, D_0$
- Four outputs: $Q_3, Q_2, Q_1, Q_0$
- A **Load** enable signal

### 10.3.2 Operation

The Load signal determines whether the register accepts new data or retains its current value:

| Load | Clock Edge | Operation |
|------|-----------|-----------|
| 0 | $\uparrow$ | **Hold** — all $Q_i$ retain current values |
| 1 | $\uparrow$ | **Load** — each $Q_i$ receives corresponding $D_i$ |

The Load function is implemented by placing a 2-to-1 multiplexer at each flip-flop's D input. When Load = 1, the MUX selects the external data input. When Load = 0, the MUX feeds back the flip-flop's current output, creating a hold condition.

#### Input Equation for Each Flip-Flop

$D_i^{FF} = Load \cdot D_i + Load' \cdot Q_i$

where:

- $D_i^{FF}$ is the actual D input to the $i$-th flip-flop
- $D_i$ is the external data input
- $Q_i$ is the current output of the $i$-th flip-flop
- $Load$ is the load enable signal

#### Diagram: 4-Bit Parallel Load Register

<details markdown="1">
<summary>4-Bit Parallel Load Register Structure</summary>
Type: diagram

Bloom Level: Understand (L2)
Bloom Verb: explain, describe

Learning objective: Explain how a parallel load register uses multiplexers at each flip-flop input to select between loading new data and holding the current value.

Components to show:
- 4 D flip-flops arranged horizontally, labeled FF3 through FF0
- 4 two-to-one multiplexers, one before each flip-flop
- Common clock line connected to all flip-flops
- Load signal connected to all MUX select inputs
- Data inputs D3-D0 connected to MUX "1" inputs
- Feedback paths from each Q output back to its MUX "0" input
- Outputs Q3-Q0

Labels:
- "Load = 0: Hold (Q feeds back)" on MUX "0" path
- "Load = 1: Load (D passes through)" on MUX "1" path
- Clock symbol on common clock line

Visual specifications:
- Canvas: 650×350px responsive
- Standard flip-flop rectangle symbols with CLK triangle
- MUX shown as trapezoid shapes
- Color coding: data path (blue), feedback path (orange), control (green)

Implementation: p5.js or SVG
</details>

---

## 10.4 Shift Register Operation

A **shift register** moves data bit by bit through a chain of flip-flops. On each clock pulse, the content of each flip-flop transfers to the next flip-flop in the chain, while new data enters from one end.

### 10.4.1 Basic Shift Right Operation

In a 4-bit shift-right register, each flip-flop's D input is connected to the Q output of the flip-flop to its left:

$D_i = Q_{i+1}$ for $i = 0, 1, 2$

$D_3 = Serial\_In$

On each rising clock edge, all bits shift one position to the right, and a new bit enters at the leftmost position (MSB).

### 10.4.2 Shift Register Types

Shift registers are classified by their input and output configurations:

#### Serial-In-Serial-Out (SISO)

The **SISO** register accepts data one bit at a time through a serial input and produces output one bit at a time from the serial output (the last flip-flop's Q). Data must be shifted through all $n$ stages before it appears at the output.

- **Use case:** Serial communication, data delay lines
- **Latency:** $n$ clock cycles to pass a bit from input to output

#### Serial-In-Parallel-Out (SIPO)

The **SIPO** register accepts serial input but makes all flip-flop outputs available simultaneously. After $n$ clock cycles of shifting, the complete $n$-bit word is available at the parallel outputs.

- **Use case:** Serial-to-parallel conversion (e.g., receiving serial data for parallel processing)
- **Latency:** $n$ clock cycles to fill the register

#### Parallel-In-Serial-Out (PISO)

The **PISO** register loads all bits simultaneously via parallel inputs, then shifts them out one at a time through the serial output.

- **Use case:** Parallel-to-serial conversion (e.g., transmitting parallel data over a serial link)
- **Operation:** Load parallel data (1 cycle), then shift out (n cycles)

| Type | Serial In | Parallel In | Serial Out | Parallel Out | Primary Application |
|------|-----------|-------------|------------|--------------|-------------------|
| SISO | Yes | No | Yes | No | Delay lines, data buffering |
| SIPO | Yes | No | No | Yes | Serial-to-parallel conversion |
| PISO | No | Yes | Yes | No | Parallel-to-serial conversion |
| PIPO | No | Yes | No | Yes | Parallel storage (same as load register) |

**4-Bit SISO Shift Register Trace:**

| Clock Cycle | Serial In | $Q_3$ | $Q_2$ | $Q_1$ | $Q_0$ (Serial Out) |
|-------------|-----------|-------|-------|-------|---------------------|
| 0 (initial) | — | 0 | 0 | 0 | 0 |
| 1 | 1 | 1 | 0 | 0 | 0 |
| 2 | 0 | 0 | 1 | 0 | 0 |
| 3 | 1 | 1 | 0 | 1 | 0 |
| 4 | 1 | 1 | 1 | 0 | 1 |

After 4 clock cycles, the first bit entered (1) appears at the serial output.

#### MicroSim: Shift Register Simulator

<iframe src="../sims/shift-register-simulator/main.html" width="100%" height="530px" scrolling="no"></iframe>

---

## 10.5 Bidirectional and Universal Shift Registers

### 10.5.1 Bidirectional Shift Register

A **bidirectional shift register** can shift data in either direction—left or right—controlled by a direction signal:

- **Direction = 0:** Shift right ($D_i = Q_{i+1}$, serial input at MSB)
- **Direction = 1:** Shift left ($D_i = Q_{i-1}$, serial input at LSB)

A 2-to-1 multiplexer at each flip-flop's D input selects between the left-neighbor output (for shift right) and the right-neighbor output (for shift left).

### 10.5.2 Universal Shift Register

The **universal shift register** is the most versatile shift register design, combining all capabilities into a single module controlled by a 2-bit mode selector.

#### Universal Shift Register Mode Table

| $S_1$ | $S_0$ | Operation |
|-------|-------|-----------|
| 0 | 0 | **Hold** — no change |
| 0 | 1 | **Shift right** — data moves toward LSB |
| 1 | 0 | **Shift left** — data moves toward MSB |
| 1 | 1 | **Parallel load** — all bits loaded simultaneously |

The **74194** is the classic TTL implementation of a 4-bit universal shift register. Each flip-flop's D input is driven by a 4-to-1 multiplexer controlled by $S_1S_0$, selecting among:

- $Q_i$ (current value, for hold)
- $Q_{i+1}$ (left neighbor, for shift right)
- $Q_{i-1}$ (right neighbor, for shift left)
- $D_i$ (parallel input, for load)

#### Input Equation for Bit $i$

$D_i^{FF} = S_1'S_0'Q_i + S_1'S_0 Q_{i+1} + S_1 S_0'Q_{i-1} + S_1 S_0 D_i$

where:

- $D_i^{FF}$ is the actual input to flip-flop $i$
- $S_1, S_0$ are the mode select signals
- $Q_{i+1}$ is the left-neighbor output (shift right source)
- $Q_{i-1}$ is the right-neighbor output (shift left source)
- $D_i$ is the parallel data input

!!! tip "Design Pattern"
    The universal shift register illustrates a key design pattern: multiplexers at flip-flop inputs create multi-function registers. By increasing the MUX size, additional operations can be supported without changing the flip-flop structure.

---

## 10.6 Counter Fundamentals

A **counter** is a sequential circuit that cycles through a predetermined sequence of states, typically representing a binary counting pattern. Counters are among the most widely used sequential circuits, appearing in:

- **Timers and clocks:** Counting clock cycles to measure elapsed time
- **Address generators:** Sequentially addressing memory locations
- **Event counters:** Counting occurrences of external events
- **Frequency dividers:** Producing lower-frequency signals from a reference clock
- **Control sequencers:** Stepping through phases of a multi-cycle operation

The two fundamental counter architectures differ in their clocking strategy:

| Architecture | Clock Distribution | Speed | Complexity |
|-------------|-------------------|-------|------------|
| Asynchronous (ripple) | Each FF clocked by previous FF output | Slow (cumulative delay) | Simple |
| Synchronous | All FFs share common clock | Fast (single delay) | More complex logic |

---

## 10.7 Asynchronous (Ripple) Counters

In an **asynchronous** or **ripple** counter, only the first flip-flop receives the external clock signal. Each subsequent flip-flop is clocked by the output of the preceding stage, creating a cascading "ripple" of state changes.

### 10.7.1 4-Bit Ripple Up Counter

**Structure:**

- 4 T flip-flops, each with $T = 1$ (always toggle)
- $FF_0$ clocked by the external clock
- $FF_1$ clocked by $Q_0$'s falling edge
- $FF_2$ clocked by $Q_1$'s falling edge
- $FF_3$ clocked by $Q_2$'s falling edge

**Counting sequence:** $0000 \rightarrow 0001 \rightarrow 0010 \rightarrow \cdots \rightarrow 1111 \rightarrow 0000$

Each bit position toggles at half the frequency of the previous bit, naturally producing the binary counting sequence.

### 10.7.2 Ripple Effect and Timing

The fundamental limitation of ripple counters is the accumulated propagation delay. In a 4-bit ripple counter, the worst-case delay for all bits to settle is:

#### Ripple Counter Settling Time

$t_{settle} = n \cdot t_{cq}$

where:

- $t_{settle}$ is the total time for all outputs to reach valid values
- $n$ is the number of flip-flop stages
- $t_{cq}$ is the clock-to-Q delay of each flip-flop

During this settling period, the counter outputs pass through intermediate invalid states. For a 4-bit counter transitioning from 0111 to 1000, the outputs might momentarily show 0110, 0100, and 0000 before settling to 1000—creating **glitches** on any combinational logic driven by the counter outputs.

#### MicroSim: Counter Simulator

<iframe src="../sims/counter-simulator/main.html" width="100%" height="530px" scrolling="no"></iframe>

---

## 10.8 Synchronous Counters

**Synchronous counters** eliminate the ripple problem by connecting all flip-flops to the same clock signal. Every flip-flop transitions simultaneously at each clock edge, and combinational logic determines which flip-flops should toggle.

### 10.8.1 Binary Up Counter Design

The key design insight is determining *when* each bit should toggle. Observing the binary counting sequence:

```
0000
0001
0010
0011
0100
...
```

A bit at position $i$ toggles when all lower-order bits ($Q_0$ through $Q_{i-1}$) are simultaneously 1. This observation yields the toggle equations:

#### Synchronous Up Counter Toggle Equations

$T_0 = 1$

$T_1 = Q_0$

$T_2 = Q_0 \cdot Q_1$

$T_3 = Q_0 \cdot Q_1 \cdot Q_2$

In general:

$T_i = \prod_{j=0}^{i-1} Q_j$

where:

- $T_i$ is the toggle input for flip-flop $i$
- $Q_j$ is the output of flip-flop $j$
- The product represents a logical AND of all lower-order outputs

The least significant bit ($Q_0$) toggles on every clock edge. $Q_1$ toggles only when $Q_0 = 1$. $Q_2$ toggles only when $Q_0 = Q_1 = 1$, and so on.

### 10.8.2 Binary Down Counter Design

A **down counter** counts in reverse: $1111 \rightarrow 1110 \rightarrow 1101 \rightarrow \cdots \rightarrow 0000 \rightarrow 1111$.

The toggle conditions for a down counter use the complements of the lower-order bits:

$T_0 = 1$

$T_1 = Q_0'$

$T_2 = Q_0' \cdot Q_1'$

$T_3 = Q_0' \cdot Q_1' \cdot Q_2'$

A bit at position $i$ toggles when all lower-order bits are simultaneously 0 (about to borrow).

### 10.8.3 Up/Down Counter

An **up/down counter** combines both counting directions with a direction control signal $Dir$:

- When $Dir = 1$: Count up (use $Q_j$ in toggle terms)
- When $Dir = 0$: Count down (use $Q_j'$ in toggle terms)

#### Up/Down Counter Toggle Equation

$T_i = \prod_{j=0}^{i-1} (Dir \cdot Q_j + Dir' \cdot Q_j')$

where:

- $Dir$ is the direction control (1 = up, 0 = down)
- The MUX-like expression selects between $Q_j$ and $Q_j'$

Each AND chain includes a multiplexer-like term that selects $Q_j$ (for up counting) or $Q_j'$ (for down counting) based on the direction signal.

| Dir | Counting Direction | Toggle Condition for Bit $i$ |
|-----|-------------------|------------------------------|
| 1 | Up | All lower bits are 1 |
| 0 | Down | All lower bits are 0 |

---

## 10.9 Modulo-N Counters

A **modulo-N counter** (or mod-N counter) counts through exactly $N$ states before repeating. A standard 4-bit binary counter is modulo-16. Designing counters with non-power-of-two modulus requires additional logic to truncate the counting sequence.

### 10.9.1 Design Methods

**Method 1: Synchronous Reset**

Detect the terminal count value and reset all flip-flops:

1. Build a standard binary counter
2. Add a combinational circuit that detects state $N$
3. Use the detection output to force all flip-flops to 0 on the next clock edge

**Method 2: Synchronous Preset**

Load a specific starting value to skip unwanted states:

1. Build a standard binary counter
2. Detect the terminal state
3. Load a preset value (e.g., for mod-N, load $16 - N$ in a 4-bit counter)

### 10.9.2 Example: Mod-6 Counter

A mod-6 counter counts: $000 \rightarrow 001 \rightarrow 010 \rightarrow 011 \rightarrow 100 \rightarrow 101 \rightarrow 000$

**Using the reset method:**

- Normal 3-bit counter counts 000 through 111
- Detect state 110 (decimal 6): $Q_2 \cdot Q_1 \cdot Q_0'$
- Use this signal to reset all flip-flops to 000

!!! warning "Glitch Consideration"
    The reset method causes a brief glitch: the counter momentarily enters the "overflow" state before resetting. In synchronous designs, this glitch is resolved within the same clock cycle and causes no problems. In asynchronous designs, external circuits may see the transient state.

### 10.9.3 BCD Counter (Decade Counter)

The **BCD counter** (also called a **decade counter**) is a mod-10 counter that counts from 0000 to 1001 (0 to 9 in decimal), then resets to 0000. It is the fundamental building block for decimal counting systems.

**Design approach:**

- Standard 4-bit counter with reset detection for state 1010 (decimal 10)
- Or: modify the toggle equations to skip states 1010 through 1111

The 7490 is the classic TTL decade counter IC. BCD counters can be cascaded to count in multiple decimal digits: units, tens, hundreds, etc.

| Counter | Modulus | States | Flip-Flops Needed | Application |
|---------|---------|--------|-------------------|-------------|
| Binary (4-bit) | 16 | 0–15 | 4 | General counting |
| Mod-6 | 6 | 0–5 | 3 | Seconds/minutes (tens digit) |
| Mod-10 (BCD) | 10 | 0–9 | 4 | Decimal counting |
| Mod-12 | 12 | 0–11 | 4 | Hours (12-hour clock) |
| Mod-60 | 60 | 0–59 | 6 | Minutes/seconds |

---

## 10.10 Ring Counter and Johnson Counter

Two special counter types use shift register feedback to generate non-binary counting sequences with advantageous properties.

### 10.10.1 Ring Counter

A **ring counter** is a circular shift register with a single 1 bit that circulates through the stages. In an $n$-bit ring counter, exactly one flip-flop is 1 at any time, producing a **one-hot** sequence.

**4-Bit Ring Counter Sequence:**

| Clock | $Q_3$ | $Q_2$ | $Q_1$ | $Q_0$ | Active State |
|-------|-------|-------|-------|-------|-------------|
| 0 | 1 | 0 | 0 | 0 | State 0 |
| 1 | 0 | 1 | 0 | 0 | State 1 |
| 2 | 0 | 0 | 1 | 0 | State 2 |
| 3 | 0 | 0 | 0 | 1 | State 3 |
| 4 | 1 | 0 | 0 | 0 | State 0 (repeat) |

**Properties:**

- $n$ flip-flops produce $n$ states (inefficient use of flip-flops)
- Each state is decoded by a single flip-flop output (no decoding logic needed)
- One-hot encoding is inherently glitch-free
- Must be initialized to a valid state (exactly one 1)

### 10.10.2 Johnson Counter (Twisted Ring Counter)

A **Johnson counter** feeds the complement of the last flip-flop's output back to the first flip-flop's input. This "twist" doubles the number of unique states compared to a ring counter.

**4-Bit Johnson Counter Sequence:**

| Clock | $Q_3$ | $Q_2$ | $Q_1$ | $Q_0$ | Decoded State |
|-------|-------|-------|-------|-------|--------------|
| 0 | 0 | 0 | 0 | 0 | State 0 |
| 1 | 1 | 0 | 0 | 0 | State 1 |
| 2 | 1 | 1 | 0 | 0 | State 2 |
| 3 | 1 | 1 | 1 | 0 | State 3 |
| 4 | 1 | 1 | 1 | 1 | State 4 |
| 5 | 0 | 1 | 1 | 1 | State 5 |
| 6 | 0 | 0 | 1 | 1 | State 6 |
| 7 | 0 | 0 | 0 | 1 | State 7 |
| 8 | 0 | 0 | 0 | 0 | State 0 (repeat) |

**Properties:**

- $n$ flip-flops produce $2n$ states (better efficiency than ring counter)
- Each state can be decoded with a single 2-input AND gate (examining adjacent flip-flop pairs)
- Glitch-free outputs due to adjacent-bit-change property (similar to Gray code)
- Must be initialized to all-zeros state

#### Comparison of Counter Types

| Counter Type | Flip-Flops for $n$ States | Decoding Logic | Self-Correcting | Glitch-Free |
|-------------|---------------------------|----------------|-----------------|-------------|
| Binary | $\lceil\log_2 n\rceil$ | Complex ($n$-input) | Yes | No |
| Ring | $n$ | None (1-hot) | No | Yes |
| Johnson | $n/2$ | Simple (2-input AND) | No | Yes |

---

## 10.11 Finite State Machine Concepts

A **finite state machine (FSM)** is the most general form of sequential circuit. Unlike registers and counters, which have fixed or simple state sequences, an FSM's next state depends on both the current state and the current inputs. FSMs can implement arbitrary sequential behavior, from simple pattern detectors to complex protocol controllers.

An FSM is formally defined by five elements:

- **States ($S$):** A finite set of states $\{S_0, S_1, \ldots, S_{k-1}\}$
- **Inputs ($I$):** A finite set of input symbols
- **Outputs ($O$):** A finite set of output symbols
- **Next-state function ($\delta$):** $S_{next} = \delta(S_{current}, I)$
- **Output function ($\lambda$):** Depends on the machine model (Moore or Mealy)

The two FSM models differ only in how outputs are generated.

---

## 10.12 Moore Machine Model

In a **Moore machine**, outputs depend **only on the current state**, not on the current inputs.

#### Moore Output Function

$O = \lambda(S)$

where:

- $O$ is the output vector
- $S$ is the current state
- $\lambda$ is the output function

**Key characteristics:**

- Outputs are associated with states, not transitions
- Outputs change synchronously—only when the state changes at a clock edge
- Output values are stable for the entire duration of each state
- Moore machines tend to require more states than equivalent Mealy machines (because different outputs require different states)
- Less prone to output glitches due to synchronous output changes

In a Moore state diagram, outputs are written **inside the state circles** or listed below the state name:

```
   +--------+
   | S0     |
   | Z = 0  |---input=1--->
   +--------+
```

---

## 10.13 Mealy Machine Model

In a **Mealy machine**, outputs depend on **both the current state and the current inputs**.

#### Mealy Output Function

$O = \lambda(S, I)$

where:

- $O$ is the output vector
- $S$ is the current state
- $I$ is the current input vector
- $\lambda$ is the output function

**Key characteristics:**

- Outputs are associated with transitions, not states
- Outputs can change asynchronously whenever inputs change (even within a clock period)
- Mealy machines often require fewer states than equivalent Moore machines
- Outputs may respond one clock cycle earlier than a Moore equivalent
- More susceptible to output glitches if inputs change asynchronously

In a Mealy state diagram, outputs are written **on the transition arrows** in the format input/output:

```
   +--------+            +--------+
   |   S0   |---0/0----->|   S1   |
   +--------+            +--------+
```

### 10.13.1 Moore vs Mealy Comparison

| Feature | Moore Machine | Mealy Machine |
|---------|-------------|---------------|
| Output depends on | State only | State + inputs |
| Output location in diagram | Inside state circles | On transition arrows |
| Output timing | Changes at clock edges only | Can change between clock edges |
| Output stability | Glitch-free | May glitch with input changes |
| Number of states | Often more | Often fewer |
| Response latency | One clock cycle slower | Immediate response |
| Preferred for | Clean, synchronous outputs | Faster response, fewer states |

Both models are equally powerful—any Moore machine can be converted to an equivalent Mealy machine and vice versa. The choice depends on design requirements.

#### Diagram: Moore vs Mealy State Diagrams

<details markdown="1">
<summary>Moore vs Mealy State Diagram Comparison</summary>
Type: diagram

Bloom Level: Understand (L2)
Bloom Verb: compare, contrast

Learning objective: Compare and contrast Moore and Mealy state diagram representations for the same sequential behavior, understanding where outputs are specified in each model.

Layout: Side-by-side diagrams for a simple "01" sequence detector

Left panel — Moore Machine:
- State S0 (output Z=0): Initial state, no pattern detected
- State S1 (output Z=0): Received "0"
- State S2 (output Z=1): Received "01" — detection!
- Transitions labeled with input values only
- Outputs written inside state circles

Right panel — Mealy Machine:
- State S0: Initial state
- State S1: Received "0"
- Transitions labeled with input/output format (e.g., "1/1")
- Outputs written on transition arrows
- Note: fewer states (2 vs 3)

Annotations:
- Callout highlighting "Outputs are IN states" (Moore)
- Callout highlighting "Outputs are ON transitions" (Mealy)
- Both diagrams process the same example input sequence "1001" and show matching output behavior

Visual specifications:
- Canvas: 700×400px responsive
- State circles with distinct colors (Moore: blue, Mealy: green)
- Clear arrow labels with input/output notation
- Example trace shown below each diagram

Implementation: p5.js or SVG
</details>

---

## 10.14 State Diagram Representation

A **state diagram** (also called a state graph) is a directed graph that visually represents an FSM's behavior. It is the starting point for FSM design and the primary tool for communicating sequential behavior.

### 10.14.1 State Diagram Elements

| Element | Symbol | Purpose |
|---------|--------|---------|
| State | Circle | Represents a unique internal condition |
| Transition | Directed arrow | Shows state change for given input |
| Initial state | Arrow from nowhere (or double circle) | Identifies the starting state |
| Input label | Text on arrow | Condition that triggers the transition |
| Output label | Text inside circle (Moore) or on arrow (Mealy) | Output value(s) |

### 10.14.2 State Diagram Construction Rules

When constructing a state diagram:

1. **Completeness:** Every state must have an outgoing transition for every possible input combination
2. **Determinism:** For each state and input combination, there must be exactly one next state
3. **Reachability:** Every state should be reachable from the initial state
4. **Output specification:** Outputs must be defined for every state (Moore) or every transition (Mealy)

---

## 10.15 State Table Construction

A **state table** (or transition table) is the tabular equivalent of a state diagram, listing every state-input combination with its corresponding next state and output. State tables are easier to work with mathematically and are the bridge between the state diagram and the circuit implementation.

### 10.15.1 Moore Machine State Table Format

| Current State | Input $X$ | Next State | Output $Z$ |
|--------------|-----------|------------|------------|
| $S_0$ | 0 | $S_0$ | 0 |
| $S_0$ | 1 | $S_1$ | 0 |
| $S_1$ | 0 | $S_2$ | 0 |
| $S_1$ | 1 | $S_1$ | 0 |
| ... | ... | ... | ... |

Note: In a Moore table, the output column depends only on the current state (same output value for all input rows of a given state).

### 10.15.2 Mealy Machine State Table Format

| Current State | Input $X$ | Next State | Output $Z$ |
|--------------|-----------|------------|------------|
| $S_0$ | 0 | $S_0$ | 0 |
| $S_0$ | 1 | $S_1$ | 0 |
| $S_1$ | 0 | $S_2$ | 1 |
| $S_1$ | 1 | $S_1$ | 0 |
| ... | ... | ... | ... |

In a Mealy table, the output column depends on both the current state and the input (output can differ for different inputs in the same state).

---

## 10.16 State Assignment Strategies

**State assignment** is the process of mapping abstract state names ($S_0, S_1, \ldots$) to binary codes stored in the flip-flops. The choice of state assignment significantly affects the complexity of the next-state and output logic.

### 10.16.1 Common Strategies

| Strategy | Assignment for 4 States | Flip-Flops | Next-State Logic |
|----------|------------------------|-----------|-----------------|
| Binary (sequential) | 00, 01, 10, 11 | $\lceil\log_2 N\rceil$ | Moderate |
| Gray code | 00, 01, 11, 10 | $\lceil\log_2 N\rceil$ | Often simpler |
| One-hot | 0001, 0010, 0100, 1000 | $N$ | Very simple |
| Output-based | Codes chosen to match output values | $\lceil\log_2 N\rceil$ + | May eliminate output logic |

### 10.16.2 Binary Encoding

The simplest approach: assign consecutive binary numbers to states. Uses the minimum number of flip-flops ($\lceil\log_2 N\rceil$ for $N$ states) but may produce complex next-state logic.

### 10.16.3 One-Hot Encoding

**One-hot encoding** assigns one flip-flop per state. Exactly one flip-flop is 1 in each state. For $N$ states, this requires $N$ flip-flops.

**Advantages:**

- Next-state logic is typically simple OR/AND of state bits and inputs
- Easy to add or remove states
- Well suited for FPGAs (where flip-flops are abundant)
- Timing is often better due to fewer logic levels

**Disadvantages:**

- Uses more flip-flops ($N$ instead of $\lceil\log_2 N\rceil$)
- Illegal states possible (must handle recovery)

| Number of States | Binary Flip-Flops | One-Hot Flip-Flops | Logic Levels (typical) |
|-----------------|-------------------|--------------------|-----------------------|
| 4 | 2 | 4 | Binary: 2–3, One-hot: 1–2 |
| 8 | 3 | 8 | Binary: 3–4, One-hot: 1–2 |
| 16 | 4 | 16 | Binary: 4–5, One-hot: 1–2 |
| 32 | 5 | 32 | Binary: 5–6, One-hot: 1–2 |

---

## 10.17 FSM Design Procedure

The systematic FSM design procedure transforms a behavioral specification into an optimized circuit implementation. This seven-step methodology applies to both Moore and Mealy machines.

### Step 1: Problem Specification

Define the FSM behavior precisely:

- Identify all inputs and outputs
- Describe the desired behavior in words or by example
- Specify whether Moore or Mealy is preferred
- Identify the reset/initial state

### Step 2: State Diagram

Draw the state diagram:

- Create states for each unique condition the machine must distinguish
- Add transitions for every input combination from every state
- Verify completeness and determinism
- Label outputs appropriately

### Step 3: State Table

Convert the state diagram to tabular form:

- List all state-input combinations
- Fill in next state and output columns
- Verify consistency with the state diagram

### Step 4: State Minimization

Reduce the number of states (if possible):

- Identify equivalent states (same outputs and equivalent next states)
- Merge equivalent states
- Update the state table

### Step 5: State Assignment

Choose binary codes for each state:

- Select encoding strategy (binary, Gray, one-hot)
- Assign codes considering logic optimization
- Create the binary transition table

### Step 6: Next-State and Output Logic Design

Derive the combinational logic equations:

1. Write the transition table with binary state variables
2. For each flip-flop input, create a K-map or use algebraic methods
3. If using D flip-flops: the next-state variable equals the flip-flop D input ($D_i = Q_i^+$)
4. If using JK flip-flops: use the excitation table to determine J and K inputs
5. Derive output equations from the output columns

### Step 7: Circuit Implementation

Build the circuit:

- Place flip-flops for state storage
- Implement next-state combinational logic
- Implement output combinational logic
- Add reset/initialization circuitry
- Verify with timing simulation

#### Diagram: FSM Design Procedure Flowchart

<details markdown="1">
<summary>Complete FSM Design Workflow</summary>
Type: workflow

Bloom Level: Apply (L3)
Bloom Verb: execute, implement

Learning objective: Apply the systematic FSM design procedure by following the seven-step workflow from behavioral specification through circuit implementation.

Layout: Vertical flowchart with seven main steps connected by downward arrows

Steps:
1. Rectangle: "Problem Specification"
Hover text: "Identify inputs, outputs, and desired behavior. Choose Moore or Mealy model."

2. Rectangle: "State Diagram"
Hover text: "Draw states as circles, transitions as arrows. Verify completeness: every state has a transition for every input."

3. Rectangle: "State Table"
Hover text: "Convert diagram to table: rows = state×input combinations, columns = next state and output."

4. Diamond: "State Minimization"
Hover text: "Can any states be merged? Two states are equivalent if they have same outputs and equivalent next states for all inputs."

5. Rectangle: "State Assignment"
Hover text: "Map abstract states to binary codes. Choose binary, Gray code, or one-hot encoding."

6. Rectangle: "Next-State & Output Logic"
Hover text: "Use K-maps or Boolean algebra to derive flip-flop input equations and output equations."

7. Rectangle: "Circuit Implementation"
Hover text: "Place flip-flops, build combinational logic, add reset. Verify with timing simulation."

Side annotations:
- Arrow from Step 7 back to Step 1 labeled "Verify against specification"
- Note at Step 5: "Use excitation tables for JK flip-flops"
- Note at Step 6: "D flip-flop: D_i = Q_i^+"

Color coding:
- Specification steps (1-2): light blue
- Table/assignment steps (3-5): light green
- Logic/circuit steps (6-7): light orange
- Verification loop: red dashed arrow

Visual specifications:
- Canvas: 550×650px responsive
- Rounded rectangles for process steps
- Diamond for decision point
- Clear directional arrows

Implementation: p5.js or SVG
</details>

#### MicroSim: FSM Designer

<iframe src="../sims/fsm-designer/main.html" width="100%" height="550px" scrolling="no"></iframe>

---

## 10.18 Next-State Logic Design

The **next-state logic** is the combinational circuit that computes the next state ($Q^+$) from the current state ($Q$) and inputs ($X$). The design approach depends on the flip-flop type used.

### 10.18.1 Using D Flip-Flops

With D flip-flops, the design is straightforward because:

$D_i = Q_i^+$

The D input of each flip-flop equals the desired next-state value for that bit. Simply derive the next-state expressions from K-maps and connect them directly to the D inputs.

### 10.18.2 Using JK Flip-Flops

With JK flip-flops, use the **excitation table** (from Unit 9) to determine $J$ and $K$ inputs:

| $Q$ | $Q^+$ | J | K |
|-----|--------|---|---|
| 0 | 0 | 0 | X |
| 0 | 1 | 1 | X |
| 1 | 0 | X | 1 |
| 1 | 1 | X | 0 |

The don't-care entries often allow simpler logic expressions than the D flip-flop approach. After determining $J$ and $K$ for each state variable and input combination, use K-maps to minimize the expressions.

### 10.18.3 Design Example: D Flip-Flop Approach

Consider a 3-state Moore FSM with binary assignment $S_0 = 00$, $S_1 = 01$, $S_2 = 10$, one input $X$, and one output $Z$.

**Transition table:**

| $Q_1$ | $Q_0$ | $X$ | $Q_1^+$ | $Q_0^+$ | $Z$ |
|-------|-------|-----|---------|---------|-----|
| 0 | 0 | 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 0 | 1 | 0 |
| 0 | 1 | 0 | 1 | 0 | 0 |
| 0 | 1 | 1 | 0 | 1 | 0 |
| 1 | 0 | 0 | 0 | 0 | 1 |
| 1 | 0 | 1 | 0 | 1 | 1 |
| 1 | 1 | X | X | X | X |

(State 11 is unused — marked as don't care)

**K-map simplification yields:**

$D_1 = Q_0 \cdot X'$

$D_0 = X$

$Z = Q_1$

---

## 10.19 Output Logic Design

The **output logic** produces the FSM's output signals from the state variables (Moore) or from the state variables and inputs (Mealy).

### 10.19.1 Moore Output Logic

Moore outputs are purely a function of the current state:

$Z = f(Q_1, Q_0, \ldots)$

Derive output expressions using K-maps with only state variables. In the example above, $Z = Q_1$ — the output equals the MSB of the state encoding.

### 10.19.2 Mealy Output Logic

Mealy outputs depend on both state and inputs:

$Z = f(Q_1, Q_0, \ldots, X_1, X_0, \ldots)$

Derive output expressions using K-maps with both state variables and input variables. Mealy output equations are typically more complex but the FSM may require fewer states.

!!! tip "Output-Based State Assignment"
    Sometimes choosing state codes so that the output value matches one or more state bits can eliminate the output logic entirely. For example, if a Moore machine has $Z = 1$ in states $S_2$ and $S_3$ and $Z = 0$ in $S_0$ and $S_1$, assigning $S_0 = 00$, $S_1 = 01$, $S_2 = 10$, $S_3 = 11$ makes $Z = Q_1$ — a free output with no additional gates.

---

## 10.20 Sequence Detector Design — Complete Example

The **sequence detector** is the classic FSM design exercise, tying together all concepts in this unit. We design a Moore machine to detect the input sequence "101" in a serial bit stream, with overlapping detection allowed.

### Step 1: Specification

- **Input:** $X$ (1-bit serial input)
- **Output:** $Z = 1$ when the three most recent inputs form "101"
- **Overlap:** After detecting "101", the final "1" can start a new detection
- **Model:** Moore machine
- **Initial state:** No bits of pattern received

### Step 2: State Diagram

The machine must track how much of the target pattern "101" has been received:

- **$S_0$** (output $Z = 0$): No progress toward pattern. Initial state.
- **$S_1$** (output $Z = 0$): Received "1" — first bit of pattern matches.
- **$S_2$** (output $Z = 0$): Received "10" — first two bits match.
- **$S_3$** (output $Z = 1$): Received "101" — pattern detected!

**Transitions:**

| From | Input | To | Reasoning |
|------|-------|-----|-----------|
| $S_0$ | 0 | $S_0$ | "0" doesn't start "1..." |
| $S_0$ | 1 | $S_1$ | "1" starts the pattern |
| $S_1$ | 0 | $S_2$ | "10" — two bits match |
| $S_1$ | 1 | $S_1$ | "11" — the latest "1" could still start a new "1..." |
| $S_2$ | 0 | $S_0$ | "100" — no suffix matches any prefix of "101" |
| $S_2$ | 1 | $S_3$ | "101" — pattern complete! |
| $S_3$ | 0 | $S_2$ | Overlap: "1" from "101" + "0" = "10" |
| $S_3$ | 1 | $S_1$ | Overlap: "1" from "101" starts new detection |

### Step 3: State Table

| Current State | $X = 0$ | $X = 1$ | Output $Z$ |
|--------------|---------|---------|------------|
| $S_0$ | $S_0$ | $S_1$ | 0 |
| $S_1$ | $S_2$ | $S_1$ | 0 |
| $S_2$ | $S_0$ | $S_3$ | 0 |
| $S_3$ | $S_2$ | $S_1$ | 1 |

### Step 4: State Assignment (Binary)

$S_0 = 00$, $S_1 = 01$, $S_2 = 10$, $S_3 = 11$

### Step 5: Binary Transition Table

| $Q_1$ | $Q_0$ | $X$ | $Q_1^+$ | $Q_0^+$ | $Z$ |
|-------|-------|-----|---------|---------|-----|
| 0 | 0 | 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 0 | 1 | 0 |
| 0 | 1 | 0 | 1 | 0 | 0 |
| 0 | 1 | 1 | 0 | 1 | 0 |
| 1 | 0 | 0 | 0 | 0 | 0 |
| 1 | 0 | 1 | 1 | 1 | 0 |
| 1 | 1 | 0 | 1 | 0 | 1 |
| 1 | 1 | 1 | 0 | 1 | 1 |

### Step 6: K-Map Simplification

**For $D_1 = Q_1^+$:**

Using a 3-variable K-map with variables $Q_1$, $Q_0$, $X$:

$D_1 = Q_0' \cdot Q_1' \cdot X' \cdot 0 + \ldots$

Simplifying:

$D_1 = Q_0 X' + Q_1 Q_0' X$

**For $D_0 = Q_0^+$:**

$D_0 = X$

**For output $Z$:**

$Z = Q_1 Q_0$

### Step 7: Verification

Let's trace the input sequence $X = 1, 0, 1, 0, 1$ starting from $S_0$:

| Clock | $X$ | State | $Q_1Q_0$ | $Z$ | Comment |
|-------|-----|-------|----------|-----|---------|
| 0 | — | $S_0$ | 00 | 0 | Initial |
| 1 | 1 | $S_1$ | 01 | 0 | Received "1" |
| 2 | 0 | $S_2$ | 10 | 0 | Received "10" |
| 3 | 1 | $S_3$ | 11 | **1** | Received "101" — detected! |
| 4 | 0 | $S_2$ | 10 | 0 | Overlap: "10" |
| 5 | 1 | $S_3$ | 11 | **1** | "101" detected again! |

The output correctly goes high whenever the pattern "101" has been received, and overlapping detection works as specified.

#### MicroSim: Sequence Detector Demo

<iframe src="../sims/sequence-detector-demo/main.html" width="100%" height="550px" scrolling="no"></iframe>

#### Diagram: Sequence Detector Interactive State Machine

<details markdown="1">
<summary>101 Sequence Detector Interactive State Machine</summary>
Type: MicroSim

Bloom Level: Apply (L3)
Bloom Verb: solve, demonstrate

Learning objective: Apply FSM design principles by tracing input sequences through the "101" sequence detector, predicting state transitions and output values before observing the simulation results.

Features:
- State diagram with four states (S0-S3) visually displayed
- Current state highlighted with animation
- Input buttons: "0" and "1" to feed serial bits
- Input history displayed as a scrolling bit string
- Output LED indicator: lights up green when Z=1 (pattern "101" detected)
- State transition animation showing the arrow being traversed
- Transition table displayed alongside, with current row highlighted

Controls:
- "Input 0" button: feeds a 0 bit
- "Input 1" button: feeds a 1 bit
- "Auto-run Random" toggle: automatically feeds random bits at adjustable speed
- "Reset" button: returns to S0
- Speed slider for auto-run mode
- "Predict Mode" toggle: asks student to predict next state before revealing

Visual elements:
- Four state circles arranged in a diamond pattern
- Directed arrows with input labels
- Output value shown inside each state (Moore convention)
- Current state: bright green fill
- Previous state: fading yellow
- Input history: scrolling ticker tape at bottom
- Detection counter: "Patterns found: X"

Instructional Rationale: Active input-by-input interaction with prediction mode is appropriate for an Apply-level objective. Students execute the FSM transition rules manually, building procedural fluency. The predict-then-reveal cycle reinforces the state table lookup process.

Canvas: 700×550px responsive
Implementation: p5.js
</details>

---

## 10.21 State Minimization

**State minimization** reduces the number of states in an FSM while preserving identical input-output behavior. Fewer states means fewer flip-flops and potentially simpler next-state logic.

### 10.21.1 Equivalent States

Two states $S_i$ and $S_j$ are **equivalent** if and only if:

1. They produce the same output (for Moore machines: same output value; for Mealy machines: same output for every input)
2. For every possible input, their next states are also equivalent

### 10.21.2 Implication Table Method

The implication table is a systematic technique for identifying equivalent states:

1. Create a triangular table with all state pairs
2. Mark pairs with different outputs as **non-equivalent** (X)
3. For remaining pairs, list the implied state pairs that must also be equivalent
4. Iteratively mark pairs as non-equivalent if any of their implied pairs are non-equivalent
5. Repeat until no more changes occur
6. Unmarked pairs are equivalent and can be merged

### 10.21.3 Example

Consider an FSM with 4 states where analysis reveals that $S_1$ and $S_3$ are equivalent (same outputs and their next states are also equivalent for all inputs). Merging them reduces the FSM from 4 states to 3 states, potentially reducing from 2 flip-flops to 2 flip-flops (same for binary encoding of 3 or 4 states) but simplifying the next-state logic.

!!! note "When Minimization Matters"
    State minimization is most impactful when the initial FSM has many states derived from an informal specification. For small FSMs designed carefully from the start, minimization often finds no equivalent states. However, it remains an important verification step to confirm that the design is already minimal.

---

## 10.22 Summary and Key Takeaways

This unit completed the study of digital logic design by covering the three major categories of sequential circuits:

**Registers:**

- A **register** is a group of flip-flops storing a multi-bit word, with parallel load or shift capabilities
- **Shift registers** move data serially in SISO, SIPO, PISO, and PIPO configurations
- **Bidirectional shift registers** can shift left or right under direction control
- The **universal shift register** (e.g., 74194) supports hold, shift right, shift left, and parallel load via a 2-bit mode selector

**Counters:**

- **Asynchronous (ripple) counters** are simple but suffer from accumulated propagation delay
- **Synchronous counters** use a common clock with toggle logic: bit $i$ toggles when all lower bits are 1 (up counter) or 0 (down counter)
- **Up/down counters** select count direction with a control signal
- **Modulo-N counters** truncate the counting sequence using reset or preset techniques; the **BCD (decade) counter** is the most common mod-10 variant
- **Ring counters** circulate a single 1-bit ($n$ flip-flops, $n$ states, one-hot decoding)
- **Johnson counters** feed back the complement ($n$ flip-flops, $2n$ states, simple 2-input decoding)

**Finite State Machines:**

- **Moore machines** produce outputs based on state only; **Mealy machines** produce outputs based on state and inputs
- **State diagrams** visually represent FSM behavior with states, transitions, and outputs
- **State tables** provide the tabular basis for logic design
- **State assignment** maps abstract states to binary codes; **one-hot encoding** trades flip-flops for simpler logic
- The **FSM design procedure** systematically transforms a specification into an optimized circuit through seven steps: specification, state diagram, state table, minimization, state assignment, logic design, and implementation
- **Next-state logic** is derived using K-maps with D flip-flop inputs ($D_i = Q_i^+$) or JK excitation tables
- **Output logic** is a function of state only (Moore) or state and inputs (Mealy)
- **State minimization** identifies and merges equivalent states to reduce circuit complexity
- **Sequence detectors** are the classic FSM application, combining all design steps into a complete example

These techniques, combined with the combinational design methods from earlier units, provide the complete foundation for designing digital systems at the gate and register-transfer levels.

---

## Interactive Walkthrough

Step through a 4-bit shift register loading serial data one bit at a time:

<iframe src="../sims/shift-register-walkthrough/main.html" width="100%" height="580px" scrolling="no"></iframe>
