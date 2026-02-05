---
title: Sequential Logic Fundamentals
description: Latches, flip-flops, timing diagrams, and clock signals for sequential circuit design
generated_by: claude skill chapter-content-generator
date: 2026-02-04 21:30:00
version: 0.03
---

# Unit 9: Sequential Logic Fundamentals

## Summary

This unit introduces sequential logic circuits, which differ fundamentally from combinational circuits by incorporating memory. Sequential circuits have outputs that depend not only on current inputs but also on the history of past inputs—they remember their state. Students will learn the operation of basic memory elements including latches and flip-flops, understand the critical role of clock signals in synchronous design, analyze timing requirements, and interpret timing diagrams. These concepts form the foundation for registers, counters, and finite state machines covered in the next unit.

## Concepts Covered

1. Combinational vs Sequential Logic
2. Memory in Digital Circuits
3. Feedback and Bistable Operation
4. SR Latch with NOR Gates
5. SR Latch with NAND Gates
6. Invalid States in SR Latches
7. Gated SR Latch
8. D Latch (Transparent Latch)
9. Level-Sensitive vs Edge-Triggered
10. Clock Signals and Timing
11. Rising Edge and Falling Edge
12. D Flip-Flop Operation
13. Edge-Triggered D Flip-Flop
14. Master-Slave Flip-Flop Construction
15. JK Flip-Flop Operation
16. T Flip-Flop Operation
17. Flip-Flop Timing Parameters
18. Setup Time Requirements
19. Hold Time Requirements
20. Clock-to-Q Delay
21. Metastability Concepts
22. Asynchronous Set and Reset
23. Flip-Flop Characteristic Tables
24. Flip-Flop Excitation Tables
25. Timing Diagram Analysis

## Prerequisites

Before studying this unit, students should be familiar with:

- Basic logic gates (AND, OR, NOT, NAND, NOR) (Unit 2)
- Boolean algebra (Unit 2)
- Propagation delay concepts (Unit 7)
- Signal transitions and timing (Unit 7)

---

## 9.1 Introduction to Sequential Logic

All circuits studied in previous units were **combinational**—their outputs depend solely on current input values. Sequential circuits introduce a fundamentally different concept: **memory**.

**Sequential circuits** have outputs that depend on both:
- Current input values
- Previous states (history)

| Circuit Type | Memory | Output Depends On |
|-------------|--------|-------------------|
| Combinational | No | Current inputs only |
| Sequential | Yes | Current inputs + past history |

This memory capability enables:
- Data storage (registers, memory)
- Counting and sequencing
- State machines for control logic
- Processors and computers

!!! info "Fundamental Insight"
    Sequential circuits are what make computers possible. Without memory, a circuit could only respond to its immediate inputs—it could never remember a calculation, count events, or follow a sequence of instructions.

## 9.2 Creating Memory with Feedback

Memory in digital circuits is achieved through **feedback**—connecting an output back to an input. This creates a **bistable** circuit that can maintain one of two stable states indefinitely.

### 9.2.1 The Basic Bistable Element

Consider two inverters connected in a loop:

```
    +------+     +------+
--->| INV  |---->| INV  |---+-->Q
    +------+     +------+   |
         ^                  |
         +------------------+
```

This circuit has two stable states:
- State 1: Q = 1 (both inverters sustain the high value)
- State 2: Q = 0 (both inverters sustain the low value)

However, this basic circuit lacks a way to change between states controllably—we need input signals to set and reset the memory.

## 9.3 SR Latch

The **SR (Set-Reset) latch** is the fundamental memory element, providing inputs to control the stored state.

### 9.3.1 SR Latch with NOR Gates

Two cross-coupled NOR gates form an SR latch:

**Inputs:** S (Set), R (Reset)
**Outputs:** Q, Q' (complementary)

**Truth Table:**

| S | R | Q(next) | Q'(next) | Operation |
|---|---|---------|----------|-----------|
| 0 | 0 | Q | Q' | Hold (no change) |
| 0 | 1 | 0 | 1 | Reset |
| 1 | 0 | 1 | 0 | Set |
| 1 | 1 | 0 | 0 | Invalid |

The **invalid state** (S=R=1) forces both outputs to 0, violating the complementary relationship. When both inputs return to 0, the resulting state depends on which input changed last—creating unpredictable behavior.

#### Diagram: SR Latch NOR Implementation

<details markdown="1">
<summary>NOR Gate SR Latch Circuit</summary>
Type: MicroSim

Learning objective: Understand SR latch operation by observing feedback behavior (Bloom Level: Understand)

Create an interactive SR latch simulation:

Components:
- Two NOR gates drawn with standard symbols
- Cross-coupled feedback paths clearly visible
- S and R inputs as clickable toggle buttons
- Q and Q' outputs with state indicators (LEDs)

Features:
- Click S or R inputs to toggle 0/1
- Watch signal propagation through feedback
- Highlight invalid state condition (S=R=1)
- Show propagation delay effect with animation
- Display current state and operation mode

Visual elements:
- NOR gate symbols
- Color-coded signals (1=green, 0=red, undefined=yellow)
- State transition animation
- Operation label (Set/Reset/Hold/Invalid)

Canvas: 600×400px responsive

Implementation: p5.js
</details>

### 9.3.2 SR Latch with NAND Gates

An SR latch can also be built from NAND gates, but with **active-low** inputs (often labeled $\overline{S}$ and $\overline{R}$).

**Truth Table (active-low inputs):**

| $\overline{S}$ | $\overline{R}$ | Q(next) | Operation |
|----------------|----------------|---------|-----------|
| 1 | 1 | Q | Hold |
| 1 | 0 | 0 | Reset |
| 0 | 1 | 1 | Set |
| 0 | 0 | 1 | Invalid |

Note: The input meanings are inverted—0 activates the function.

## 9.4 Gated SR Latch

The **gated SR latch** (or SR latch with enable) adds an enable signal that controls when the latch responds to inputs.

**Operation:**
- When Enable = 0: Latch holds its state regardless of S and R
- When Enable = 1: Latch responds to S and R normally

**Boolean Equations:**
$$S_{internal} = S \cdot Enable$$
$$R_{internal} = R \cdot Enable$$

This prevents unintended state changes when input signals are transitioning.

## 9.5 D Latch (Transparent Latch)

The **D latch** eliminates the invalid state problem of the SR latch by using a single data input.

**Structure:** A gated SR latch where $S = D$ and $R = D'$

**Truth Table:**

| Enable | D | Q(next) |
|--------|---|---------|
| 0 | X | Q (hold) |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

When enabled, the D latch is **transparent**—the output follows the input directly. When disabled, the last value of D is "latched" and held.

**Key insight:** A D latch has only two operations: hold (Enable=0) or load (Enable=1, Q follows D).

!!! warning "Transparency Problem"
    The D latch's transparency can cause timing problems. While enabled, any change on D immediately affects Q, potentially causing race conditions in synchronous systems. This motivates the edge-triggered flip-flop.

## 9.6 Clock Signals

In synchronous sequential circuits, a **clock signal** coordinates all state changes to occur at specific, predictable times.

**Clock characteristics:**

- **Period (T):** Time for one complete cycle
- **Frequency (f):** Cycles per second, $f = 1/T$
- **Duty cycle:** Percentage of time the clock is high

| Term | Definition |
|------|------------|
| Rising edge | Transition from 0 to 1 |
| Falling edge | Transition from 1 to 0 |
| Positive edge | Same as rising edge |
| Negative edge | Same as falling edge |

#### Diagram: Clock Signal Terminology

<details markdown="1">
<summary>Clock Signal Waveform with Labeled Features</summary>
Type: diagram

Create an annotated clock waveform diagram showing:

Waveform:
- Ideal square wave clock signal
- Multiple complete cycles

Labels:
- Rising edge (positive edge) with arrow
- Falling edge (negative edge) with arrow
- Period (T) bracket
- Duty cycle indication
- High time and Low time
- Frequency formula

Additional annotations:
- Timing reference marks
- Edge transition detail (zoomed inset showing finite rise time)

Visual specifications:
- Canvas: 650×300px responsive
- Clean waveform with clear labels
- Color: clock signal in blue, annotations in black

Implementation: p5.js or SVG
</details>

## 9.7 Edge-Triggered D Flip-Flop

The **D flip-flop** samples its D input only at the active clock edge, eliminating the transparency problem of latches.

### 9.7.1 Operation

**Positive-edge-triggered D flip-flop:**
- Samples D at the rising clock edge
- Holds the sampled value until the next rising edge
- Ignores D changes at all other times

**Truth Table:**

| Clock | D | Q(next) |
|-------|---|---------|
| Rising edge | 0 | 0 |
| Rising edge | 1 | 1 |
| Not rising | X | Q (hold) |

### 9.7.2 Master-Slave Construction

A common way to build an edge-triggered flip-flop uses two latches in a **master-slave** configuration:

1. **Master latch:** Enabled when clock is LOW
2. **Slave latch:** Enabled when clock is HIGH

When clock rises:
1. Master latch closes, capturing the current D value
2. Slave latch opens, transferring master's value to Q

This creates a one-sample-per-clock-edge behavior.

#### Diagram: Master-Slave D Flip-Flop

<details markdown="1">
<summary>Master-Slave D Flip-Flop Internal Structure</summary>
Type: MicroSim

Learning objective: Analyze edge-triggered behavior through master-slave operation (Bloom Level: Analyze)

Create an interactive master-slave flip-flop demonstration:

Components:
- Master D latch (left)
- Slave D latch (right)
- Clock input with running clock animation
- D input toggle
- Q output display
- Intermediate signal display (master output)

Features:
- Adjustable clock speed (slow for visualization)
- Highlight which latch is transparent at each phase
- Show sample point at rising edge
- Display timing diagram alongside circuit

Visual elements:
- Two latch boxes with internal state visible
- Clock waveform display
- Enable signal routing (clock and inverted clock)
- Step-through mode option

Canvas: 700×500px responsive

Implementation: p5.js
</details>

## 9.8 JK Flip-Flop

The **JK flip-flop** extends the SR flip-flop functionality by defining behavior for the previously invalid state.

**Truth Table:**

| J | K | Q(next) | Operation |
|---|---|---------|-----------|
| 0 | 0 | Q | Hold |
| 0 | 1 | 0 | Reset |
| 1 | 0 | 1 | Set |
| 1 | 1 | Q' | Toggle |

The **toggle** operation (J=K=1) complements the current state, making the JK flip-flop useful for building counters.

**Characteristic Equation:**
$$Q_{next} = JQ' + K'Q$$

## 9.9 T Flip-Flop

The **T (Toggle) flip-flop** is a simplified version with a single input T.

**Truth Table:**

| T | Q(next) | Operation |
|---|---------|-----------|
| 0 | Q | Hold |
| 1 | Q' | Toggle |

**Characteristic Equation:**
$$Q_{next} = T \oplus Q = TQ' + T'Q$$

The T flip-flop is created from:
- A JK flip-flop with J and K tied together (T = J = K)
- A D flip-flop with $D = T \oplus Q$

!!! tip "Application"
    T flip-flops are ideal for building binary counters. Each flip-flop in a ripple counter toggles when its predecessor produces a falling edge.

## 9.10 Timing Parameters

Proper operation of flip-flops requires meeting specific timing constraints.

### 9.10.1 Setup Time ($t_{setup}$)

The **setup time** is the minimum time the D input must be stable **before** the active clock edge.

### 9.10.2 Hold Time ($t_{hold}$)

The **hold time** is the minimum time the D input must remain stable **after** the active clock edge.

### 9.10.3 Clock-to-Q Delay ($t_{cq}$)

The **clock-to-Q delay** is the time from the active clock edge until the output becomes valid.

| Parameter | Description | Typical Range |
|-----------|-------------|---------------|
| $t_{setup}$ | Input stable before edge | 0.5-2 ns |
| $t_{hold}$ | Input stable after edge | 0-0.5 ns |
| $t_{cq}$ | Edge to valid output | 1-5 ns |

#### Diagram: Timing Parameter Visualization

<details markdown="1">
<summary>Flip-Flop Timing Parameters Diagram</summary>
Type: diagram

Create an annotated timing diagram showing:

Signals (top to bottom):
1. Clock signal with rising edge highlighted
2. D input signal with transition
3. Q output signal with transition

Annotations:
- Setup time bracket (before clock edge)
- Hold time bracket (after clock edge)
- Clock-to-Q delay measurement
- Valid data window indication
- Invalid/unstable regions shaded

Additional elements:
- Magnified view of critical timing region
- Minimum values labeled
- Violation scenarios (optional toggle to show)

Visual specifications:
- Canvas: 650×400px responsive
- Time axis with scale markers
- Color coding: clock (blue), data (green), setup/hold regions (yellow/orange)

Implementation: p5.js with interactive time scale zoom
</details>

### 9.10.4 Timing Violations and Metastability

If setup or hold time is violated, the flip-flop may enter a **metastable** state—an unstable condition between 0 and 1 that can persist for an unpredictable time before resolving to either state.

**Metastability consequences:**
- Unpredictable output value
- Extended resolution time
- Potential logic errors in downstream circuits

## 9.11 Asynchronous Set and Reset

Most flip-flops include **asynchronous** (or **preset** and **clear**) inputs that override normal operation.

| Input | Effect |
|-------|--------|
| Preset (PRE) / Async Set | Forces Q = 1 immediately |
| Clear (CLR) / Async Reset | Forces Q = 0 immediately |

These inputs:
- Act independently of the clock
- Have higher priority than synchronous inputs
- Are used for initialization and emergency conditions

!!! note "Naming Convention"
    Active-low asynchronous inputs are common and often shown with an overbar: $\overline{PRE}$, $\overline{CLR}$

## 9.12 Characteristic and Excitation Tables

### 9.12.1 Characteristic Tables

**Characteristic tables** show the next state based on current inputs:

**D Flip-Flop:**

| D | Q(next) |
|---|---------|
| 0 | 0 |
| 1 | 1 |

**JK Flip-Flop:**

| J | K | Q(next) |
|---|---|---------|
| 0 | 0 | Q |
| 0 | 1 | 0 |
| 1 | 0 | 1 |
| 1 | 1 | Q' |

### 9.12.2 Excitation Tables

**Excitation tables** show what inputs are needed to achieve a desired state transition:

**D Flip-Flop:**

| Q | Q(next) | D |
|---|---------|---|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

**JK Flip-Flop:**

| Q | Q(next) | J | K |
|---|---------|---|---|
| 0 | 0 | 0 | X |
| 0 | 1 | 1 | X |
| 1 | 0 | X | 1 |
| 1 | 1 | X | 0 |

The **X** (don't care) values in the JK excitation table provide flexibility in circuit design.

## 9.13 Timing Diagram Analysis

**Timing diagrams** show how signals change over time and are essential for understanding and debugging sequential circuits.

**Reading timing diagrams:**
1. Identify the clock signal and its active edges
2. At each active edge, determine input values
3. Apply the flip-flop characteristic to find the next state
4. Draw output transitions after appropriate delay

**Example analysis steps:**
1. Find rising edge of clock
2. Sample D value at that instant
3. Q changes to sampled D value after $t_{cq}$

#### Diagram: Timing Diagram Interactive Analyzer

<details markdown="1">
<summary>Interactive Timing Diagram Simulator</summary>
Type: MicroSim

Learning objective: Apply timing analysis to predict flip-flop behavior from waveforms (Bloom Level: Apply)

Create an interactive timing diagram tool:

Features:
- Pre-drawn clock and D input waveforms
- User can trace rising edges
- Click on clock edge to highlight sampling point
- Automatically show Q output based on D flip-flop behavior
- Step-by-step mode

Controls:
- Play/pause animation
- Speed control
- Toggle between D, JK, T flip-flop types
- Show/hide timing parameters
- Clear and redraw waveforms

Visual elements:
- Four signal traces: CLK, D (or J,K,T), Q, Q'
- Vertical dashed lines at clock edges
- Sampling indicators
- Time ruler with grid

Canvas: 700×450px responsive

Implementation: p5.js
</details>

## 9.14 Summary

This unit established the fundamentals of sequential logic:

- **Sequential circuits** have memory, enabling outputs to depend on history
- **Feedback** creates bistable circuits that maintain state
- **SR latches** provide basic set/reset memory with an invalid state condition
- **D latches** are transparent while enabled, capturing data when disabled
- **Clock signals** synchronize state changes in sequential systems
- **Edge-triggered flip-flops** sample inputs only at clock edges, preventing transparency issues
- **D, JK, and T flip-flops** offer different input configurations for various applications
- **Timing parameters** (setup time, hold time, clock-to-Q) must be satisfied for correct operation
- **Metastability** occurs when timing is violated
- **Characteristic tables** predict next state; **excitation tables** determine required inputs
- **Timing diagrams** visualize signal behavior over time

These memory elements are the building blocks for registers, counters, and state machines in the next unit.
