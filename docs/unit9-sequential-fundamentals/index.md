---
title: Sequential Logic Fundamentals
description: Latches, flip-flops, timing diagrams, and clock signals for sequential circuit design
generated_by: claude skill generate-chapter-content
date: 2026-02-05 17:00:00
version: 0.03
---

# Unit 9: Sequential Logic Fundamentals

<div class="video-overview" markdown>
**Video Overview:** *AI-narrated overview of this unit with animated slides — coming soon.*
</div>

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

## 9.1 Combinational vs Sequential Logic

Every circuit studied in Units 1 through 8 was **combinational**—the outputs at any instant depend exclusively on the values of the inputs at that same instant. Change the inputs, wait for propagation delay, and the outputs settle to a unique value determined solely by the current input combination. Combinational circuits have no concept of "before" or "after"; they simply evaluate a Boolean function.

**Sequential logic** introduces something fundamentally new: **memory**. A sequential circuit's outputs depend on both the current input values and on the circuit's internal **state**, which is itself a record of past inputs. This distinction is the conceptual dividing line between simple logic functions and computational machines.

| Property | Combinational Circuits | Sequential Circuits |
|----------|----------------------|---------------------|
| Memory | None | Stores state information |
| Output depends on | Current inputs only | Current inputs + stored state |
| Feedback paths | None (acyclic) | Required (cyclic) |
| Time dependence | Instantaneous (after delay) | History-dependent |
| Examples | Adders, MUX, decoders | Registers, counters, FSMs |
| Mathematical model | Boolean functions | Finite state machines |

The significance of sequential logic cannot be overstated. Without memory, a circuit cannot count events, remember a password, store a computation result, or follow a sequence of instructions. Every digital computer, from microcontrollers to supercomputers, relies on sequential circuits to maintain state between clock cycles.

Sequential circuits are classified into two broad categories:

- **Synchronous sequential circuits:** State changes occur only at discrete time instants defined by a clock signal. All memory elements update simultaneously at clock edges, making behavior predictable and analyzable.
- **Asynchronous sequential circuits:** State changes can occur at any time in response to input changes. These circuits are faster but more difficult to design and analyze due to race conditions and hazards.

This unit focuses primarily on synchronous sequential circuits, which dominate modern digital design practice.

!!! info "Fundamental Insight"
    Sequential circuits are what make computers possible. Without memory, a circuit could only respond to its immediate inputs—it could never remember a calculation, count events, or follow a sequence of instructions. The introduction of state transforms logic circuits into computational machines.

---

## 9.2 Memory in Digital Circuits

The concept of memory in digital circuits reduces to a deceptively simple question: how can a circuit "remember" a binary value after the input that produced it has been removed? The answer lies in **feedback**.

### 9.2.1 Feedback and Bistable Operation

When the output of a logic gate is connected back to one of its inputs, the circuit can sustain a value without any external input—it feeds its own output back to maintain its state. The simplest example is two inverters connected in a loop:

```
    +------+     +------+
--->| INV  |---->| INV  |---+--> Q
    +------+     +------+   |
         ^                  |
         +------------------+
```

This cross-coupled inverter pair is a **bistable** element, meaning it has exactly two stable operating points:

- **Stable State 1:** The first inverter outputs 0, the second outputs 1 ($Q = 1$)
- **Stable State 2:** The first inverter outputs 1, the second outputs 0 ($Q = 0$)

Once the circuit settles into either state, the feedback loop sustains it indefinitely (as long as power is maintained). There is also a theoretical third point where both nodes sit at a voltage midway between logic levels, but this equilibrium is **unstable**—any infinitesimal noise will push the circuit toward one of the two stable states. This unstable equilibrium becomes important when we discuss metastability later in the unit.

The bistable element demonstrates that feedback creates memory, but it lacks any mechanism to control which state the circuit holds. We need additional inputs to **set** and **reset** the stored value—this leads to the SR latch.

---

## 9.3 SR Latch with NOR Gates

The **SR (Set-Reset) latch** is the most fundamental controllable memory element. It extends the bistable concept by adding input signals that force the circuit into a desired state.

### 9.3.1 NOR Gate Implementation

Two cross-coupled NOR gates form the classic SR latch. Each gate's output feeds back to an input of the other gate, creating the bistable feedback loop, while the remaining inputs serve as Set and Reset controls.

**Inputs:**

- $S$ (Set): Forces $Q = 1$
- $R$ (Reset): Forces $Q = 0$

**Outputs:**

- $Q$: The stored state
- $Q'$: The complement of the stored state

The operation is governed by the NOR function. When $S = 1$, the NOR gate producing $Q'$ is forced to output 0 (since any 1 input to a NOR makes the output 0), and the feedback drives $Q$ to 1. When $R = 1$, the opposite occurs.

#### SR Latch Truth Table (NOR Implementation)

| S | R | $Q_{next}$ | $Q'_{next}$ | Operation |
|---|---|-----------|-------------|-----------|
| 0 | 0 | $Q$ | $Q'$ | **Hold** (no change) |
| 0 | 1 | 0 | 1 | **Reset** ($Q \leftarrow 0$) |
| 1 | 0 | 1 | 0 | **Set** ($Q \leftarrow 1$) |
| 1 | 1 | 0 | 0 | **Invalid** |

### 9.3.2 The Invalid State Problem

When $S = R = 1$, both NOR gate outputs are forced to 0, so $Q = Q' = 0$. This violates the fundamental requirement that $Q$ and $Q'$ be complementary. Worse, when both inputs simultaneously return to 0, the final state depends on which input drops last—or if they change at exactly the same time, the circuit may oscillate or enter a metastable state.

The constraint $S \cdot R = 0$ (S and R should never be simultaneously 1) is a design rule that must be enforced when using SR latches.

#### MicroSim: SR Latch Simulator

<iframe src="../sims/sr-latch-simulator/main.html" width="100%" height="530px" scrolling="no"></iframe>

#### Diagram: SR Latch NOR Gate Implementation

<details markdown="1">
<summary>SR Latch NOR Gate Implementation</summary>
Type: MicroSim

Bloom Level: Understand (L2)
Bloom Verb: explain, observe

Learning objective: Understand SR latch operation by observing how feedback between cross-coupled NOR gates creates memory behavior and how Set, Reset, Hold, and Invalid states manifest.

Data Visibility Requirements:
Stage 1: Show initial state with S=0, R=0, Q holding previous value
Stage 2: Apply S=1, show NOR gate outputs propagating — Q' forced to 0, then Q driven to 1 through feedback
Stage 3: Return to S=0, R=0, show Q holding at 1 (memory demonstrated)
Stage 4: Apply R=1, show Q forced to 0 through NOR propagation
Stage 5: Apply S=1 and R=1 simultaneously, show both outputs at 0 (invalid)
Stage 6: Release S and R simultaneously, show unpredictable resolution

Interaction: Step-through with Next/Previous buttons. At each stage, display the voltage at every node (S, R, Q, Q') and highlight which NOR gate is being evaluated. Show the Boolean equation being computed at each gate.

Controls:
- S and R toggle buttons
- Step-through mode with Next/Previous
- Animation speed slider
- Reset button

Visual elements:
- Two NOR gate symbols with standard IEEE shapes
- Cross-coupled feedback paths drawn as colored wires
- Signal color coding: 1 = green, 0 = red, transitioning = yellow
- State label showing current operation mode (Hold/Set/Reset/Invalid)
- Warning indicator when S=R=1

Instructional Rationale: Step-through with explicit signal values is appropriate because understanding SR latch operation requires tracing the feedback propagation path with concrete logic levels. Animation would obscure the cause-and-effect chain through the cross-coupled gates.

Canvas: 600×400px responsive
Implementation: p5.js
</details>

---

## 9.4 SR Latch with NAND Gates

The SR latch can also be constructed using NAND gates instead of NOR gates. The key difference is that NAND-based SR latches use **active-low** inputs, conventionally written as $\overline{S}$ and $\overline{R}$ (or $S'$ and $R'$).

In the NAND implementation, the inputs are inverted in meaning: a 0 on $\overline{S}$ sets the latch, and a 0 on $\overline{R}$ resets it. The quiescent (hold) state requires both inputs to be 1.

#### SR Latch Truth Table (NAND Implementation, Active-Low Inputs)

| $\overline{S}$ | $\overline{R}$ | $Q_{next}$ | Operation |
|----------------|----------------|-----------|-----------|
| 1 | 1 | $Q$ | **Hold** (no change) |
| 1 | 0 | 0 | **Reset** |
| 0 | 1 | 1 | **Set** |
| 0 | 0 | 1 | **Invalid** |

The invalid condition now occurs when $\overline{S} = \overline{R} = 0$ (both active), which forces both outputs to 1. The design constraint becomes $\overline{S} + \overline{R} = 1$ (at least one input must be inactive/high).

Comparing the two implementations:

| Property | NOR SR Latch | NAND SR Latch |
|----------|-------------|---------------|
| Active input level | High (1) | Low (0) |
| Hold condition | S=0, R=0 | $\overline{S}$=1, $\overline{R}$=1 |
| Invalid condition | S=1, R=1 | $\overline{S}$=0, $\overline{R}$=0 |
| Invalid output | Q=Q'=0 | Q=Q'=1 |
| Gate count | 2 NOR gates | 2 NAND gates |

The NAND implementation is widely used in practice because NAND gates are the most common gate type in CMOS technology (recall from Unit 7 that NAND is a universal gate).

---

## 9.5 Gated SR Latch

The basic SR latch responds to its inputs at all times, which means any glitch or transient on S or R can inadvertently change the stored state. The **gated SR latch** (also called the SR latch with enable or clocked SR latch) solves this problem by adding an **enable** (EN) control signal.

#### Circuit Structure

The enable signal is ANDed with each input before reaching the core SR latch:

$S_{internal} = S \cdot EN$

$R_{internal} = R \cdot EN$

where:

- $S_{internal}$ is the effective set signal reaching the latch
- $R_{internal}$ is the effective reset signal reaching the latch
- $EN$ is the enable control signal

**Operation:**

- When $EN = 0$: Both internal inputs are forced to 0, so the latch holds its current state regardless of S and R values
- When $EN = 1$: The latch responds normally to S and R

| EN | S | R | $Q_{next}$ | Operation |
|----|---|---|-----------|-----------|
| 0 | X | X | $Q$ | Hold (latch disabled) |
| 1 | 0 | 0 | $Q$ | Hold |
| 1 | 0 | 1 | 0 | Reset |
| 1 | 1 | 0 | 1 | Set |
| 1 | 1 | 1 | — | Invalid |

The gated SR latch represents an important step toward synchronous design: the enable input controls *when* state changes can occur. However, the latch still has the invalid state problem (S=R=1 while enabled) and is **level-sensitive**—while enabled, the output responds continuously to input changes. The D latch addresses both of these limitations.

---

## 9.6 D Latch (Transparent Latch)

The **D latch** (data latch) is a clever modification of the gated SR latch that completely eliminates the invalid state problem. The key insight is to derive the S and R signals from a single data input D:

$S = D$

$R = D' = \overline{D}$

Since $S$ and $R$ are always complementary, the condition $S = R = 1$ can never occur. The D latch has only two modes of operation:

#### D Latch Truth Table

| Enable | D | $Q_{next}$ | Operation |
|--------|---|-----------|-----------|
| 0 | X | $Q$ | **Hold** (latch stores previous value) |
| 1 | 0 | 0 | **Load** ($Q$ follows $D$) |
| 1 | 1 | 1 | **Load** ($Q$ follows $D$) |

When $EN = 1$, the latch is **transparent**: the output $Q$ tracks the input $D$ in real time, like a buffer with a switch. When $EN$ transitions from 1 to 0, the last value of $D$ is "captured" and held at $Q$ until the latch is enabled again.

#### Characteristic Equation

$Q_{next} = EN \cdot D + EN' \cdot Q$

where:

- $Q_{next}$ is the next state of the output
- $EN$ is the enable signal
- $D$ is the data input
- $Q$ is the current stored state

!!! warning "The Transparency Problem"
    While the D latch is enabled, any change on $D$ immediately propagates to $Q$. In a synchronous system where the enable is driven by a clock, this means the output can change multiple times during the high phase of the clock. If the latch output feeds back through combinational logic to its own input, a **race condition** occurs: the output changes, causing the input to change, causing the output to change again—all within the same clock period. This problem motivates the development of **edge-triggered flip-flops**.

### 9.6.1 Level-Sensitive vs Edge-Triggered Behavior

The distinction between **level-sensitive** and **edge-triggered** devices is fundamental to understanding sequential circuit design:

- **Level-sensitive (latches):** The device is transparent (output follows input) whenever the enable/clock is at the active level (high or low). Changes propagate continuously during the active phase.
- **Edge-triggered (flip-flops):** The device samples its input only at the instant of a clock transition (rising or falling edge). At all other times, inputs are ignored and the output holds its value.

| Behavior | Active During | Sampling | Transparency |
|----------|--------------|----------|-------------|
| Level-sensitive | Entire high (or low) phase | Continuous | Yes, while enabled |
| Edge-triggered | Clock transition instant | Single sample | No |

Edge-triggered devices are strongly preferred in synchronous design because they provide a single, well-defined sampling instant per clock cycle, eliminating race conditions.

---

## 9.7 Clock Signals and Timing

In synchronous sequential circuits, a periodic **clock signal** orchestrates all state changes, ensuring that every flip-flop in the system updates at the same well-defined instants. The clock is the heartbeat of a digital system.

### 9.7.1 Clock Signal Characteristics

A clock signal is an idealized square wave that alternates between logic 0 and logic 1. Its key parameters are:

- **Period ($T$):** The time for one complete cycle (high phase + low phase)
- **Frequency ($f$):** The number of cycles per second

#### Clock Frequency

$f = \frac{1}{T}$

where:

- $f$ is the clock frequency in hertz (Hz)
- $T$ is the clock period in seconds

- **Duty cycle:** The fraction of the period during which the clock is high, expressed as a percentage. A 50% duty cycle means equal high and low times.

| Parameter | Symbol | Typical Values |
|-----------|--------|---------------|
| Period | $T$ | 1 ns – 1 ms |
| Frequency | $f$ | 1 kHz – 5 GHz |
| Rise time | $t_r$ | 0.1 – 1 ns |
| Fall time | $t_f$ | 0.1 – 1 ns |
| Duty cycle | — | 40% – 60% |

### 9.7.2 Rising Edge and Falling Edge

The critical moments in a synchronous system are the **clock edges**—the transitions between logic levels:

- **Rising edge** (positive edge): The transition from logic 0 to logic 1
- **Falling edge** (negative edge): The transition from logic 1 to logic 0

Most modern sequential circuits are **positive-edge-triggered**, meaning state changes occur at rising clock edges. Some designs use falling edges, and a few specialized circuits use both edges (dual-edge triggering).

#### Diagram: Clock Signal Terminology

<details markdown="1">
<summary>Clock Signal Waveform with Labeled Features</summary>
Type: diagram

Bloom Level: Remember (L1)
Bloom Verb: identify, label

Learning objective: Identify and label the key features of a clock waveform including rising edge, falling edge, period, frequency, duty cycle, and high/low times.

Visual elements:
- Ideal square wave clock signal showing 3-4 complete cycles
- Rising edges marked with upward arrows and label "Rising Edge (Positive Edge)"
- Falling edges marked with downward arrows and label "Falling Edge (Negative Edge)"
- Period bracket spanning one full cycle, labeled "$T$"
- High time and low time brackets
- Duty cycle annotation
- Frequency formula displayed: $f = 1/T$
- Zoomed inset showing finite rise time on a real clock edge

Visual specifications:
- Canvas: 650×300px responsive
- Clock signal in blue
- Annotations in black with red arrows for edges
- Shaded regions for high time (light blue) and low time (light gray)

Implementation: p5.js or SVG
</details>

---

## 9.8 Edge-Triggered D Flip-Flop

The **D flip-flop** is the workhorse of synchronous digital design. It solves the transparency problem of the D latch by sampling the D input only at the active clock edge, ignoring all input changes at other times.

### 9.8.1 D Flip-Flop Operation

A **positive-edge-triggered D flip-flop** operates as follows:

1. At the instant of a rising clock edge, the value on input $D$ is sampled
2. The sampled value appears at output $Q$ after a short propagation delay ($t_{cq}$)
3. $Q$ holds this value regardless of any subsequent changes on $D$
4. The process repeats at the next rising clock edge

#### D Flip-Flop Truth Table

| Clock | D | $Q_{next}$ | Operation |
|-------|---|-----------|-----------|
| Rising edge ($\uparrow$) | 0 | 0 | **Load 0** |
| Rising edge ($\uparrow$) | 1 | 1 | **Load 1** |
| Not rising edge | X | $Q$ | **Hold** (no change) |

#### D Flip-Flop Characteristic Equation

$Q_{next} = D$

where:

- $Q_{next}$ is the state after the active clock edge
- $D$ is the data input value at the moment of the clock edge

This equation is evaluated only at the active clock edge. At all other times, $Q$ retains its previous value.

#### MicroSim: D Flip-Flop Simulator

<iframe src="../sims/d-flipflop-simulator/main.html" width="100%" height="530px" scrolling="no"></iframe>

### 9.8.2 Master-Slave Flip-Flop Construction

The most common method for constructing an edge-triggered flip-flop uses two D latches in a **master-slave** configuration. The master latch and the slave latch have opposite enable polarities, ensuring that only one latch is transparent at any given time.

**Structure:**

- **Master latch:** Enabled when $CLK = 0$ (negative level)
- **Slave latch:** Enabled when $CLK = 1$ (positive level)
- The master's output connects to the slave's D input

**Operation during a clock cycle:**

1. **Clock LOW phase:** The master latch is transparent, tracking changes on D. The slave latch is closed, holding its previous value at Q.
2. **Rising edge:** The clock transitions from 0 to 1. The master latch closes, capturing the current D value. Simultaneously, the slave latch opens, transferring the master's captured value to Q.
3. **Clock HIGH phase:** The master latch is closed (holding captured D). The slave latch is transparent, but since the master's output is fixed, Q remains stable.

The net effect is that $D$ is sampled once per clock cycle, precisely at the rising edge—even though internally the circuit uses level-sensitive latches.

| Clock Phase | Master Latch | Slave Latch | Effect |
|-------------|-------------|-------------|--------|
| LOW | Transparent (tracks D) | Closed (holds Q) | D value propagates to master output |
| Rising edge | Closes (captures D) | Opens (passes master to Q) | Q updates to captured D value |
| HIGH | Closed (holds value) | Transparent (but stable input) | Q remains stable |

#### Diagram: Master-Slave D Flip-Flop Internal Architecture

<details markdown="1">
<summary>Master-Slave D Flip-Flop Internal Architecture</summary>
Type: MicroSim

Bloom Level: Analyze (L4)
Bloom Verb: examine, differentiate

Learning objective: Analyze how two level-sensitive D latches with complementary enables create edge-triggered behavior, differentiating the roles of master and slave during each clock phase.

Data Visibility Requirements:
Stage 1: Clock LOW — Show master latch transparent (highlighted), slave closed. D input value shown propagating through master. Slave output Q unchanged.
Stage 2: Clock rising edge — Show master closing (capturing D value), slave opening. Arrow showing data transfer from master output to slave output.
Stage 3: Clock HIGH — Show master closed (grayed out), slave transparent but with stable input from master. Q now shows new value.
Stage 4: Next clock LOW — Master reopens, begins tracking new D value. Slave closes, holds Q.

Interaction: Step-through with Next/Previous buttons. Each stage shows which latch is transparent (green border) and which is closed (red border). Display D, master output, and Q values at each stage.

Components:
- Master D latch (left) with internal state visible
- Slave D latch (right) with internal state visible
- Clock input with waveform display
- Inverter between clock and master enable
- D input toggle button
- Q output LED indicator
- Intermediate signal display (master output)

Controls:
- Step-through mode with Next/Previous buttons
- Free-running mode with adjustable clock speed
- D input toggle
- Reset button

Instructional Rationale: Step-through mode with explicit latch states is appropriate because the Analyze objective requires students to trace data through two sequential stages and understand why the complementary enables prevent transparency problems. Continuous animation would blur the critical distinction between clock phases.

Canvas: 700×500px responsive
Implementation: p5.js
</details>

---

## 9.9 JK Flip-Flop

The **JK flip-flop** is a versatile memory element that extends the SR flip-flop by defining useful behavior for the previously invalid input combination. Where the SR flip-flop prohibits $S = R = 1$, the JK flip-flop interprets $J = K = 1$ as a **toggle** command.

### 9.9.1 JK Flip-Flop Operation

The JK flip-flop has two data inputs, $J$ (analogous to Set) and $K$ (analogous to Reset), plus a clock input. It is edge-triggered.

#### JK Flip-Flop Truth Table

| J | K | $Q_{next}$ | Operation |
|---|---|-----------|-----------|
| 0 | 0 | $Q$ | **Hold** (no change) |
| 0 | 1 | 0 | **Reset** ($Q \leftarrow 0$) |
| 1 | 0 | 1 | **Set** ($Q \leftarrow 1$) |
| 1 | 1 | $Q'$ | **Toggle** (complement) |

The toggle mode ($J = K = 1$) inverts the current state at each active clock edge, making the JK flip-flop particularly useful for building counters and frequency dividers.

#### JK Flip-Flop Characteristic Equation

$Q_{next} = JQ' + K'Q$

where:

- $Q_{next}$ is the next state after the clock edge
- $J$ is the "set" input
- $K$ is the "reset" input
- $Q$ is the current state
- $Q'$ is the complement of the current state

This equation can be derived from the truth table using a Karnaugh map with $J$, $K$, and $Q$ as variables.

#### MicroSim: JK Flip-Flop Simulator

<iframe src="../sims/jk-flipflop-simulator/main.html" width="100%" height="530px" scrolling="no"></iframe>

### 9.9.2 JK Flip-Flop from D Flip-Flop

A JK flip-flop can be constructed from a D flip-flop by adding combinational logic at its input:

$D = JQ' + K'Q$

This means the D input is computed from J, K, and the current state Q using the characteristic equation. A small amount of feedback logic converts the simpler D flip-flop into the more versatile JK type.

---

## 9.10 T Flip-Flop

The **T (Toggle) flip-flop** is the simplest flip-flop type, with a single input $T$ that controls whether the state changes at each clock edge.

### 9.10.1 T Flip-Flop Operation

#### T Flip-Flop Truth Table

| T | $Q_{next}$ | Operation |
|---|-----------|-----------|
| 0 | $Q$ | **Hold** (no change) |
| 1 | $Q'$ | **Toggle** (complement) |

#### T Flip-Flop Characteristic Equation

$Q_{next} = T \oplus Q = TQ' + T'Q$

where:

- $T$ is the toggle input
- $Q$ is the current state
- $\oplus$ denotes the XOR operation

### 9.10.2 Building a T Flip-Flop

The T flip-flop is not typically manufactured as a standalone device. Instead, it is derived from other flip-flop types:

- **From a JK flip-flop:** Connect $J = K = T$. When $T = 0$, $J = K = 0$ (hold). When $T = 1$, $J = K = 1$ (toggle).
- **From a D flip-flop:** Set $D = T \oplus Q$. When $T = 0$, $D = Q$ (hold). When $T = 1$, $D = Q'$ (toggle).

!!! tip "Application: Binary Counters"
    T flip-flops are the natural building block for binary counters. In a ripple counter, each flip-flop's $T$ input is tied to 1 (always toggle), and the clock of each subsequent flip-flop is driven by the $Q$ output of the previous one. Each stage divides the clock frequency by 2, producing the binary counting sequence.

---

## 9.11 Comparison of Flip-Flop Types

Understanding the relationships between flip-flop types is essential for selecting the right element for a given application.

| Flip-Flop | Inputs | Operations | Characteristic Equation | Primary Use |
|-----------|--------|------------|------------------------|-------------|
| SR | S, R | Set, Reset, Hold | $Q_{next} = S + R'Q$ (with $SR = 0$) | Basic memory |
| D | D | Load, Hold | $Q_{next} = D$ | Data storage, registers |
| JK | J, K | Set, Reset, Hold, Toggle | $Q_{next} = JQ' + K'Q$ | Counters, versatile design |
| T | T | Hold, Toggle | $Q_{next} = T \oplus Q$ | Counters, frequency dividers |

Each flip-flop type can be constructed from any other type by adding appropriate input logic. The D flip-flop is the most commonly used in modern VLSI design because its simple characteristic equation ($Q_{next} = D$) makes timing analysis straightforward and synthesis tools efficient.

#### Diagram: Flip-Flop Family Relationships

<details markdown="1">
<summary>Flip-Flop Family Relationships</summary>
Type: infographic

Bloom Level: Understand (L2)
Bloom Verb: compare, classify

Learning objective: Compare and classify the four flip-flop types by understanding how each can be derived from the others through input logic modifications.

Layout: Central hub-and-spoke diagram with four flip-flop types as nodes connected by directed edges showing conversion logic.

Nodes:
- SR Flip-Flop (top) — blue circle
- D Flip-Flop (right) — green circle
- JK Flip-Flop (bottom) — orange circle
- T Flip-Flop (left) — purple circle

Edges (conversion logic shown on hover):
- D → SR: S=D, R=D'
- D → JK: D=JQ'+K'Q
- D → T: D=T⊕Q
- JK → T: J=K=T
- JK → SR: J=S, K=R (with SR=0 constraint)
- JK → D: J=D, K=D'

Interactive features:
- Hover over any node to highlight all conversion paths from that type
- Hover over any edge to see the conversion equation in a tooltip
- Click a node to show its characteristic table, truth table, and excitation table side by side

Visual specifications:
- Canvas: 600×500px responsive
- Clean lines with arrow endpoints
- Color-coded nodes matching the table above
- Equations rendered in clear monospace font

Implementation: HTML/CSS/JavaScript with SVG or p5.js
</details>

---

## 9.12 Flip-Flop Timing Parameters

Correct operation of edge-triggered flip-flops requires that input signals satisfy strict timing constraints relative to the clock edge. Violating these constraints can produce incorrect or indeterminate outputs.

### 9.12.1 Setup Time ($t_{setup}$)

The **setup time** is the minimum duration that the D input must be stable **before** the active clock edge arrives. If D changes too close to the clock edge, the flip-flop may not correctly capture the intended value.

### 9.12.2 Hold Time ($t_{hold}$)

The **hold time** is the minimum duration that the D input must remain stable **after** the active clock edge. Even though the sampling occurs at the edge, the internal circuitry needs a brief period to complete the capture process.

### 9.12.3 Clock-to-Q Delay ($t_{cq}$)

The **clock-to-Q delay** (also called propagation delay) is the time elapsed from the active clock edge until the output $Q$ settles to its new valid value.

| Parameter | Symbol | Description | Typical Range (CMOS) |
|-----------|--------|-------------|---------------------|
| Setup time | $t_{setup}$ | D stable before clock edge | 0.2 – 2 ns |
| Hold time | $t_{hold}$ | D stable after clock edge | 0 – 0.5 ns |
| Clock-to-Q delay | $t_{cq}$ | Clock edge to valid Q | 0.5 – 5 ns |
| Minimum clock period | $T_{min}$ | Shortest allowable clock period | $t_{cq} + t_{logic} + t_{setup}$ |

These three parameters define the **timing window** around each clock edge during which input data must be stable. The setup and hold times together form the **aperture** of the flip-flop—the window during which the input is being sampled.

#### Maximum Clock Frequency

The maximum clock frequency of a synchronous circuit is determined by the slowest path between any two flip-flops:

$T_{min} = t_{cq} + t_{logic,max} + t_{setup}$

$f_{max} = \frac{1}{T_{min}}$

where:

- $T_{min}$ is the minimum clock period
- $t_{cq}$ is the clock-to-Q delay of the source flip-flop
- $t_{logic,max}$ is the maximum combinational logic delay between flip-flops
- $t_{setup}$ is the setup time of the destination flip-flop
- $f_{max}$ is the maximum operating frequency

#### Diagram: Timing Parameter Visualization

<details markdown="1">
<summary>Flip-Flop Timing Parameters Diagram</summary>
Type: diagram

Bloom Level: Analyze (L4)
Bloom Verb: examine, differentiate

Learning objective: Examine the temporal relationships between clock edges, data transitions, and output changes to understand why setup and hold time violations cause failures.

Visual elements:
- Three horizontally-aligned signal traces (top to bottom):
  1. CLK: Square wave with rising edge highlighted by vertical dashed line
  2. D: Data signal with a transition, showing stable region before and after clock edge
  3. Q: Output signal showing transition after clock-to-Q delay
- Setup time bracket (shaded yellow region before clock edge)
- Hold time bracket (shaded orange region after clock edge)
- Clock-to-Q delay arrow from clock edge to Q transition
- "Valid data window" label spanning setup + hold region
- Magnified inset of the clock edge region

Annotations:
- $t_{setup}$ label with bracket
- $t_{hold}$ label with bracket
- $t_{cq}$ label with arrow
- "Data must be stable in this window" callout
- Optional toggle to show violation scenario (D changing during setup window)

Visual specifications:
- Canvas: 700×450px responsive
- Time axis with gridlines and scale markers
- Color coding: clock (blue), data (green), output (red), timing regions (yellow/orange shading)

Implementation: p5.js with interactive time scale zoom
</details>

---

## 9.13 Metastability

When the setup or hold time requirements are violated, the flip-flop may enter a **metastable** state—an unstable condition where the output voltage sits between valid logic 0 and logic 1 levels for an unpredictable duration before eventually resolving to one or the other.

### 9.13.1 Understanding Metastability

Recall the bistable element from Section 9.2: two stable states and one unstable equilibrium point. Metastability occurs when a timing violation causes the flip-flop's internal node voltages to land near this unstable equilibrium. Like a ball balanced on top of a hill, the circuit will eventually fall to one side—but the time it takes to resolve is theoretically unbounded, following an exponential probability distribution.

**Characteristics of metastability:**

- The output voltage hovers between $V_{OL}$ and $V_{OH}$ (neither a valid 0 nor a valid 1)
- Resolution time is random—it can be very short or very long
- Downstream circuits receiving a metastable signal may interpret it as 0 or 1 unpredictably, or may themselves become metastable
- The probability of remaining metastable decreases exponentially with time

### 9.13.2 Mean Time Between Failures

#### MTBF Due to Metastability

$MTBF = \frac{e^{t_r / \tau}}{T_0 \cdot f_{clk} \cdot f_{data}}$

where:

- $MTBF$ is the mean time between metastability-induced failures
- $t_r$ is the resolution time allowed (extra slack beyond setup time)
- $\tau$ is the metastability time constant of the flip-flop (technology-dependent)
- $T_0$ is a device-dependent constant
- $f_{clk}$ is the clock frequency
- $f_{data}$ is the rate of asynchronous data transitions

### 9.13.3 Synchronizer Circuits

In practice, metastability is most likely to occur at the boundary between **clock domains** or when sampling **asynchronous** external signals. The standard mitigation technique is a **synchronizer chain**—two or more flip-flops in series, all clocked by the destination domain clock. The first flip-flop may go metastable, but it has an entire clock period to resolve before the second flip-flop samples it.

```
Async Input → [FF1] → [FF2] → Synchronized Output
                ↑        ↑
               CLK      CLK
```

Adding more flip-flop stages increases the resolution time exponentially, reducing the MTBF to acceptable levels (typically years or decades for a well-designed synchronizer).

!!! warning "Design Rule"
    Never sample an asynchronous signal with a single flip-flop in a production design. Always use at least a two-stage synchronizer to reduce metastability risk to acceptable levels.

---

## 9.14 Asynchronous Set and Reset

Most practical flip-flops include **asynchronous** control inputs that override normal clocked operation. These inputs act immediately, regardless of the clock state.

### 9.14.1 Preset and Clear

| Input | Common Names | Effect | Priority |
|-------|-------------|--------|----------|
| Asynchronous Set | Preset (PRE), Async Set | Forces $Q = 1$ immediately | Higher than clock |
| Asynchronous Reset | Clear (CLR), Async Reset | Forces $Q = 0$ immediately | Higher than clock |

These inputs are typically **active-low**, indicated by an overbar or bubble on the schematic symbol:

- $\overline{PRE}$: When driven to 0, forces $Q = 1$
- $\overline{CLR}$: When driven to 0, forces $Q = 0$

### 9.14.2 Applications

Asynchronous inputs serve critical functions in digital systems:

- **Power-on reset:** When a system powers up, flip-flop states are random. An asynchronous reset signal initializes all flip-flops to known states (typically $Q = 0$).
- **System reset:** A hardware reset button or watchdog timer can force the system to a known state at any time.
- **Emergency stop:** Safety-critical systems may need to immediately force certain outputs regardless of normal operation.
- **Initialization sequences:** Setting flip-flops to specific initial states before normal clocked operation begins.

!!! note "Naming Convention"
    Active-low asynchronous inputs are standard in most IC families. A flip-flop with both preset and clear will typically show: $\overline{PRE}$ and $\overline{CLR}$ (or $\overline{SET}$ and $\overline{RST}$). Both should not be asserted simultaneously.

### 9.14.3 D Flip-Flop with Asynchronous Controls

A complete D flip-flop with asynchronous preset and clear has the following priority:

1. **Highest priority:** $\overline{CLR} = 0$ → $Q = 0$ (regardless of clock and D)
2. **Second priority:** $\overline{PRE} = 0$ → $Q = 1$ (regardless of clock and D)
3. **Normal operation:** Both $\overline{CLR} = 1$ and $\overline{PRE} = 1$ → D flip-flop operates normally on clock edges

| $\overline{PRE}$ | $\overline{CLR}$ | CLK | D | $Q_{next}$ |
|-------------------|-------------------|-----|---|-----------|
| 1 | 0 | X | X | 0 (async reset) |
| 0 | 1 | X | X | 1 (async set) |
| 0 | 0 | X | X | Undefined (invalid) |
| 1 | 1 | $\uparrow$ | 0 | 0 (normal) |
| 1 | 1 | $\uparrow$ | 1 | 1 (normal) |
| 1 | 1 | Not $\uparrow$ | X | $Q$ (hold) |

---

## 9.15 Flip-Flop Characteristic Tables

**Characteristic tables** (also called function tables or truth tables) define the next state of a flip-flop based on its current inputs and, for some types, the current state. These tables describe the flip-flop's behavior from the perspective of "given these inputs, what will the output be?"

### 9.15.1 D Flip-Flop Characteristic Table

| D | $Q_{next}$ |
|---|-----------|
| 0 | 0 |
| 1 | 1 |

The D flip-flop is the simplest: the next state always equals the D input.

### 9.15.2 JK Flip-Flop Characteristic Table

| J | K | $Q_{next}$ |
|---|---|-----------|
| 0 | 0 | $Q$ (hold) |
| 0 | 1 | 0 (reset) |
| 1 | 0 | 1 (set) |
| 1 | 1 | $Q'$ (toggle) |

### 9.15.3 T Flip-Flop Characteristic Table

| T | $Q_{next}$ |
|---|-----------|
| 0 | $Q$ (hold) |
| 1 | $Q'$ (toggle) |

### 9.15.4 SR Flip-Flop Characteristic Table

| S | R | $Q_{next}$ |
|---|---|-----------|
| 0 | 0 | $Q$ (hold) |
| 0 | 1 | 0 (reset) |
| 1 | 0 | 1 (set) |
| 1 | 1 | — (invalid) |

---

## 9.16 Flip-Flop Excitation Tables

**Excitation tables** are the inverse of characteristic tables. Rather than asking "given these inputs, what is the next state?", they ask "given the current state and desired next state, what inputs are required?" Excitation tables are indispensable for sequential circuit design (covered in Unit 10), where the designer knows the desired state transitions and must determine the flip-flop input equations.

### 9.16.1 D Flip-Flop Excitation Table

| $Q$ | $Q_{next}$ | D |
|-----|-----------|---|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

For the D flip-flop, the excitation table is trivial: $D = Q_{next}$. Whatever state you want next, just set D to that value.

### 9.16.2 JK Flip-Flop Excitation Table

| $Q$ | $Q_{next}$ | J | K |
|-----|-----------|---|---|
| 0 | 0 | 0 | X |
| 0 | 1 | 1 | X |
| 1 | 0 | X | 1 |
| 1 | 1 | X | 0 |

The **don't care** (X) entries in the JK excitation table are powerful. For example, to transition from $Q = 0$ to $Q_{next} = 0$, $J$ must be 0 (to avoid setting), but $K$ can be either 0 (hold) or 1 (reset—but Q is already 0, so reset has no additional effect). These don't cares provide additional freedom in minimizing the input equations during state machine design.

### 9.16.3 T Flip-Flop Excitation Table

| $Q$ | $Q_{next}$ | T |
|-----|-----------|---|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

The pattern is clear: $T = Q \oplus Q_{next}$. Toggle (T=1) when the state needs to change, hold (T=0) when it stays the same.

### 9.16.4 SR Flip-Flop Excitation Table

| $Q$ | $Q_{next}$ | S | R |
|-----|-----------|---|---|
| 0 | 0 | 0 | X |
| 0 | 1 | 1 | 0 |
| 1 | 0 | 0 | 1 |
| 1 | 1 | X | 0 |

#### Diagram: Characteristic vs Excitation Table Interactive Explorer

<details markdown="1">
<summary>Characteristic vs Excitation Table Interactive Explorer</summary>
Type: infographic

Bloom Level: Understand (L2)
Bloom Verb: compare, explain

Learning objective: Explain the difference between characteristic and excitation tables and understand how excitation tables serve as the "inverse" lookup for sequential circuit design.

Layout: Split-screen interactive display

Left panel - Characteristic Table Mode:
- Dropdown to select flip-flop type (D, JK, T, SR)
- User selects input values (e.g., J=1, K=0) and current state Q
- System highlights the matching row and shows Q_next
- Arrow labeled "Given inputs → Find next state"

Right panel - Excitation Table Mode:
- Same flip-flop type selector (linked to left panel)
- User selects current state Q and desired Q_next
- System highlights the matching row and shows required inputs
- Arrow labeled "Given transition → Find required inputs"
- Don't care values highlighted in yellow with tooltip: "Either 0 or 1 works"

Interactive features:
- Click any cell in either table to highlight the corresponding row
- Toggle between flip-flop types updates both panels simultaneously
- Highlight don't cares with explanation tooltip
- "Quiz mode" button: system randomly selects a transition, student must identify required inputs

Visual specifications:
- Canvas: 700×450px responsive
- Clean table styling with alternating row colors
- Active row highlighted in blue
- Don't care cells in yellow
- Matching entries connected by a visual bridge between panels

Implementation: HTML/CSS/JavaScript
</details>

---

## 9.17 Timing Diagram Analysis

**Timing diagrams** are graphical representations of signal values over time and are the primary tool for understanding, verifying, and debugging sequential circuit behavior. Reading and constructing timing diagrams is an essential skill for digital designers.

### 9.17.1 Reading Timing Diagrams

A timing diagram displays multiple signals on a common time axis, with each signal shown as a waveform alternating between logic 0 and logic 1. The procedure for analyzing a timing diagram with D flip-flops:

1. **Identify the clock signal** and locate each active (rising) edge
2. **At each rising edge**, read the value of D at that instant
3. **Apply the characteristic equation** ($Q_{next} = D$) to determine the new Q value
4. **Draw the Q transition** occurring after a $t_{cq}$ delay from the clock edge
5. Repeat for each clock edge

### 9.17.2 Timing Diagram Analysis for Different Flip-Flop Types

For JK flip-flops, the process requires knowing both the current state and inputs:

1. At each rising edge, read J and K values
2. Determine $Q_{next}$ using the characteristic table:
   - J=0, K=0 → $Q_{next} = Q$ (hold)
   - J=0, K=1 → $Q_{next} = 0$ (reset)
   - J=1, K=0 → $Q_{next} = 1$ (set)
   - J=1, K=1 → $Q_{next} = Q'$ (toggle)
3. Draw Q transition after $t_{cq}$

For T flip-flops:

1. At each rising edge, read T value
2. If $T = 0$, Q holds. If $T = 1$, Q toggles.
3. Draw Q transition after $t_{cq}$

### 9.17.3 Common Timing Diagram Patterns

| Pattern | Description | Flip-Flop Type |
|---------|-------------|---------------|
| Divide-by-2 | Q toggles every clock edge | T with T=1 |
| Data register | Q copies D at each edge | D |
| Shift register | Data shifts one position per clock | Chain of D flip-flops |
| Up counter | Binary count increments each clock | Chain of T flip-flops |

#### MicroSim: Timing Diagram Analyzer

<iframe src="../sims/timing-diagram-analyzer/main.html" width="100%" height="530px" scrolling="no"></iframe>

#### Diagram: Interactive Timing Diagram Practice Tool

<details markdown="1">
<summary>Interactive Timing Diagram Practice Tool</summary>
Type: MicroSim

Bloom Level: Apply (L3)
Bloom Verb: solve, practice

Learning objective: Apply flip-flop characteristic equations to predict output waveforms given input waveforms and clock signals, practicing the timing diagram analysis procedure.

Features:
- Pre-drawn clock waveform (8-10 cycles)
- Pre-drawn input waveforms (D, or J and K, or T) with random but pedagogically chosen values
- User draws predicted Q output by clicking on waveform grid
- "Check Answer" button compares user's Q waveform against correct solution
- Correct edges highlighted green, incorrect edges highlighted red
- "Show Solution" button reveals correct Q waveform with step-by-step annotations

Controls:
- Flip-flop type selector: D, JK, T
- "New Problem" button generates random input waveforms
- "Show Clock Edges" toggle: draws vertical dashed lines at rising edges
- "Show Sampling Points" toggle: highlights D values at each clock edge
- Difficulty selector: Easy (D only), Medium (JK), Hard (T with initial state unknown)
- Speed control for animated solution playback

Visual elements:
- Four signal traces: CLK, Inputs (D or J,K or T), Q (user-drawn), Q (solution)
- Grid background for precise waveform drawing
- Vertical dashed lines at clock edges (toggleable)
- Sampling point indicators (dots on input waveform at clock edges)
- Score display: "X of Y edges correct"

Instructional Rationale: Active problem-solving with immediate feedback is appropriate for an Apply-level objective. Students must execute the timing analysis procedure themselves rather than passively watching. The step-through solution provides scaffolding for incorrect attempts.

Canvas: 700×500px responsive
Implementation: p5.js
</details>

---

## 9.18 Summary and Key Takeaways

This unit established the fundamental principles of sequential logic, which form the basis for all digital systems with memory:

- **Sequential circuits** differ from combinational circuits by incorporating memory through feedback, enabling outputs to depend on both current inputs and past history

- **Feedback** in logic circuits creates **bistable elements** with two stable states, providing the physical mechanism for storing binary information

- **SR latches** (NOR and NAND implementations) provide basic set/reset memory but suffer from an **invalid state** when both inputs are simultaneously active

- **Gated SR latches** add enable control, restricting when state changes can occur—a step toward synchronous design

- **D latches** eliminate the invalid state by deriving S and R from a single data input, but their **transparency** while enabled creates race condition risks

- The distinction between **level-sensitive** (latches) and **edge-triggered** (flip-flops) devices is critical: flip-flops sample only at clock edges, providing predictable single-sample-per-cycle behavior

- **Clock signals** define the timing reference for synchronous systems, with **rising** and **falling edges** serving as the discrete sampling instants

- **D flip-flops** are the most widely used memory element, with the simple characteristic $Q_{next} = D$ evaluated at each active clock edge

- The **master-slave construction** achieves edge-triggered behavior from two level-sensitive latches with complementary enables

- **JK flip-flops** offer four operations (hold, set, reset, toggle) and are useful for counters. **T flip-flops** provide hold and toggle operations

- **Timing parameters** ($t_{setup}$, $t_{hold}$, $t_{cq}$) define the data stability window around each clock edge and determine the maximum operating frequency

- **Metastability** occurs when timing constraints are violated, producing an indeterminate output that takes unpredictable time to resolve. **Synchronizer chains** mitigate this risk

- **Asynchronous preset and clear** inputs override normal clocked operation for initialization and emergency conditions

- **Characteristic tables** predict next state from inputs; **excitation tables** determine required inputs for desired state transitions—essential for state machine design in Unit 10

- **Timing diagram analysis** is the key skill for verifying sequential circuit behavior by tracing signal values through clock edges

These memory elements are the building blocks for registers, counters, and finite state machines explored in the next unit.

---

## Interactive Walkthrough

Step through a D flip-flop timing diagram trace with clock edge analysis:

<iframe src="../sims/flipflop-timing-walkthrough/main.html" width="100%" height="580px" scrolling="no"></iframe>
