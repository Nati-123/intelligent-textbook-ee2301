---
title: Sequential Circuit Design
description: Registers, counters, state machines, and FSM design methodology
generated_by: claude skill generate-chapter-content
date: 2026-02-05 18:00:00
version: 0.03
---

<div class="unit1-styled" markdown>

# Unit 10: Sequential Circuit Design

<details class="video-overview">
<summary><strong>Unit Overview</strong> (click to expand)</summary>

Welcome to Unit 10, where we take the flip-flops from the previous unit and put them to work in complete sequential circuits — circuits that count, shift data, and make decisions over time.

We begin with registers — groups of flip-flops working together to store multi-bit data. Shift registers move data one bit at a time in several configurations: serial-in serial-out, serial-in parallel-out, parallel-in serial-out, and the universal shift register that combines all capabilities.

Next, we tackle counters. Ripple counters are simple but suffer from cumulative delays. Synchronous counters solve this by clocking every flip-flop simultaneously. You will design up-counters, down-counters, modulo-N counters, BCD counters, ring counters, and Johnson counters.

The highlight of this unit is the finite state machine, or FSM. There are two models: Moore machines, where outputs depend only on the current state, and Mealy machines, where outputs depend on both the current state and inputs. Mealy machines can respond faster, but Moore machines are often simpler to design.

You will express FSM behavior using state diagrams and state tables, choose a state encoding, and follow a systematic design procedure. As a practical application, we design sequence detectors — circuits that monitor a stream of bits and signal when a particular pattern appears.

**Key Takeaways**

1. Registers and shift registers store and move multi-bit data, providing the essential storage and data-transfer building blocks used in processors and communication interfaces.
2. Synchronous counters overcome the speed limitations of ripple counters, and specialized types such as modulo-N, BCD, ring, and Johnson counters serve a wide range of applications.
3. Finite state machines — in both Moore and Mealy forms — provide a systematic methodology for designing sequential circuits that follow a defined sequence of states.

</details>

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">Summary</h2>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 20px 24px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<p style="color: #333; line-height: 1.85; font-size: 1.02rem; margin: 0;">
This unit brings together the concepts from previous units to design complete sequential circuits. Students will learn to design registers for parallel data storage and shifting, construct counters for various counting sequences, and master the systematic design of finite state machines (FSMs). The FSM design methodology—from state diagrams through state tables to optimized circuit implementations—forms the capstone of introductory digital design, enabling students to create controllers and sequencers that respond to inputs and produce timed output sequences.
</p>
</div>

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">Concepts Covered</h2>

<div style="background: #F8F6FF; border: 2px solid #D4C8FF; border-radius: 12px; padding: 20px 24px; margin: 1rem 0;" markdown>

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

</div>

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">Prerequisites</h2>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 20px 24px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

Before studying this unit, students should be familiar with:

- Flip-flops: D, JK, and T types (Unit 9)
- Timing diagrams and timing parameters (Unit 9)
- Characteristic and excitation tables (Unit 9)
- K-map simplification (Unit 5)
- Combinational building blocks (Unit 8)

</div>

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">10.1 Introduction to Sequential Circuit Design</h2>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

The preceding unit established how individual flip-flops store single bits of information and respond to clock edges. This unit takes the next step: combining multiple flip-flops with combinational logic to build **functional sequential systems** — registers that store and manipulate multi-bit data, counters that generate ordered sequences, and finite state machines that implement complex control behavior.

Sequential circuit design is the capstone of introductory digital logic. Every processor, communication controller, and embedded system relies on the design methodologies presented here. The three major categories of sequential circuits form a natural progression of complexity:

| Category | Purpose | Key Characteristic | Design Complexity |
|----------|---------|-------------------|-------------------|
| Registers | Store and transfer multi-bit data | Parallel or serial data movement | Low |
| Counters | Generate counting sequences | Predetermined state sequence | Medium |
| Finite State Machines | Implement arbitrary control logic | Input-dependent state transitions | High |

All three categories share a common architecture: **flip-flops** hold the current state, **combinational logic** computes the next state and outputs, and a **clock signal** synchronizes state transitions. The difference lies in how the next-state logic is structured and how complex the state-transition rules are.

</div>

!!! info "Design Hierarchy"
    Registers and counters are actually special cases of finite state machines with highly regular next-state logic. Understanding them as separate categories simplifies learning, but recognizing their common FSM foundation deepens architectural understanding.

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">10.2 Register Fundamentals</h2>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

A **register** is a group of flip-flops that collectively store a multi-bit binary word. An $n$-bit register consists of $n$ flip-flops sharing a common clock signal, with each flip-flop storing one bit of the word.

Registers are the most fundamental storage elements in digital systems. They appear everywhere:

- **Data registers** in processors hold operands and results
- **Address registers** point to memory locations
- **Instruction registers** hold the currently executing instruction
- **Status registers** store condition flags
- **I/O registers** buffer data to and from peripherals

The two fundamental operations on registers are **parallel load** (writing all bits simultaneously) and **shift** (moving bits one position per clock cycle).

</div>

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">10.3 Parallel Load Registers</h2>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

A **parallel load register** accepts all $n$ data bits simultaneously on a single clock edge, making it ideal for capturing the output of a combinational circuit or receiving data from a bus.

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">10.3.1 Structure</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

A 4-bit parallel load register consists of:

- Four D flip-flops with a common clock
- Four data inputs: $D_3, D_2, D_1, D_0$
- Four outputs: $Q_3, Q_2, Q_1, Q_0$
- A **Load** enable signal

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">10.3.2 Operation</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

The Load signal determines whether the register accepts new data or retains its current value:

| Load | Clock Edge | Operation |
|------|-----------|-----------|
| 0 | $\uparrow$ | **Hold** — all $Q_i$ retain current values |
| 1 | $\uparrow$ | **Load** — each $Q_i$ receives corresponding $D_i$ |

The Load function is implemented by placing a 2-to-1 multiplexer at each flip-flop's D input. When Load = 1, the MUX selects the external data input. When Load = 0, the MUX feeds back the flip-flop's current output, creating a hold condition.

<h4 style="color: #5A3EED; font-weight: 600;">Input Equation for Each Flip-Flop</h4>

$D_i^{FF} = Load \cdot D_i + Load' \cdot Q_i$

where:

- $D_i^{FF}$ is the actual D input to the $i$-th flip-flop
- $D_i$ is the external data input
- $Q_i$ is the current output of the $i$-th flip-flop
- $Load$ is the load enable signal

<h4 style="color: #5A3EED; font-weight: 600;">Diagram: 4-Bit Parallel Load Register</h4>

</div>

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">10.4 Shift Register Operation</h2>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

A **shift register** moves data bit by bit through a chain of flip-flops. On each clock pulse, the content of each flip-flop transfers to the next flip-flop in the chain, while new data enters from one end.

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">10.4.1 Basic Shift Right Operation</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

In a 4-bit shift-right register, each flip-flop's D input is connected to the Q output of the flip-flop to its left:

$D_i = Q_{i+1}$ for $i = 0, 1, 2$

$D_3 = Serial\_In$

On each rising clock edge, all bits shift one position to the right, and a new bit enters at the leftmost position (MSB).

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">10.4.2 Shift Register Types</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

Shift registers are classified by their input and output configurations:

<h4 style="color: #5A3EED; font-weight: 600;">Serial-In-Serial-Out (SISO)</h4>

The **SISO** register accepts data one bit at a time through a serial input and produces output one bit at a time from the serial output (the last flip-flop's Q). Data must be shifted through all $n$ stages before it appears at the output.

- **Use case:** Serial communication, data delay lines
- **Latency:** $n$ clock cycles to pass a bit from input to output

<h4 style="color: #5A3EED; font-weight: 600;">Serial-In-Parallel-Out (SIPO)</h4>

The **SIPO** register accepts serial input but makes all flip-flop outputs available simultaneously. After $n$ clock cycles of shifting, the complete $n$-bit word is available at the parallel outputs.

- **Use case:** Serial-to-parallel conversion (e.g., receiving serial data for parallel processing)
- **Latency:** $n$ clock cycles to fill the register

<h4 style="color: #5A3EED; font-weight: 600;">Parallel-In-Serial-Out (PISO)</h4>

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

</div>

<h4 style="color: #5A3EED; font-weight: 600;">MicroSim: Shift Register Simulator</h4>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../sims/shift-register-simulator/main.html" width="100%" height="590px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">10.5 Bidirectional and Universal Shift Registers</h2>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">10.5.1 Bidirectional Shift Register</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

A **bidirectional shift register** can shift data in either direction—left or right—controlled by a direction signal:

- **Direction = 0:** Shift right ($D_i = Q_{i+1}$, serial input at MSB)
- **Direction = 1:** Shift left ($D_i = Q_{i-1}$, serial input at LSB)

A 2-to-1 multiplexer at each flip-flop's D input selects between the left-neighbor output (for shift right) and the right-neighbor output (for shift left).

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">10.5.2 Universal Shift Register</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

The **universal shift register** is the most versatile shift register design, combining all capabilities into a single module controlled by a 2-bit mode selector.

<h4 style="color: #5A3EED; font-weight: 600;">Universal Shift Register Mode Table</h4>

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

<h4 style="color: #5A3EED; font-weight: 600;">Input Equation for Bit $i$</h4>

$D_i^{FF} = S_1'S_0'Q_i + S_1'S_0 Q_{i+1} + S_1 S_0'Q_{i-1} + S_1 S_0 D_i$

where:

- $D_i^{FF}$ is the actual input to flip-flop $i$
- $S_1, S_0$ are the mode select signals
- $Q_{i+1}$ is the left-neighbor output (shift right source)
- $Q_{i-1}$ is the right-neighbor output (shift left source)
- $D_i$ is the parallel data input

</div>

!!! tip "Design Pattern"
    The universal shift register illustrates a key design pattern: multiplexers at flip-flop inputs create multi-function registers. By increasing the MUX size, additional operations can be supported without changing the flip-flop structure.

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">10.6 Counter Fundamentals</h2>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

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

</div>

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">10.7 Asynchronous (Ripple) Counters</h2>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

In an **asynchronous** or **ripple** counter, only the first flip-flop receives the external clock signal. Each subsequent flip-flop is clocked by the output of the preceding stage, creating a cascading "ripple" of state changes.

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">10.7.1 4-Bit Ripple Up Counter</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

**Structure:**

- 4 T flip-flops, each with $T = 1$ (always toggle)
- $FF_0$ clocked by the external clock
- $FF_1$ clocked by $Q_0$'s falling edge
- $FF_2$ clocked by $Q_1$'s falling edge
- $FF_3$ clocked by $Q_2$'s falling edge

**Counting sequence:** $0000 \rightarrow 0001 \rightarrow 0010 \rightarrow \cdots \rightarrow 1111 \rightarrow 0000$

Each bit position toggles at half the frequency of the previous bit, naturally producing the binary counting sequence.

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">10.7.2 Ripple Effect and Timing</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

The fundamental limitation of ripple counters is the accumulated propagation delay. In a 4-bit ripple counter, the worst-case delay for all bits to settle is:

<h4 style="color: #5A3EED; font-weight: 600;">Ripple Counter Settling Time</h4>

$t_{settle} = n \cdot t_{cq}$

where:

- $t_{settle}$ is the total time for all outputs to reach valid values
- $n$ is the number of flip-flop stages
- $t_{cq}$ is the clock-to-Q delay of each flip-flop

During this settling period, the counter outputs pass through intermediate invalid states. For a 4-bit counter transitioning from 0111 to 1000, the outputs might momentarily show 0110, 0100, and 0000 before settling to 1000—creating **glitches** on any combinational logic driven by the counter outputs.

</div>

<h4 style="color: #5A3EED; font-weight: 600;">MicroSim: Counter Simulator</h4>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../sims/counter-simulator/main.html" width="100%" height="600px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">10.8 Synchronous Counters</h2>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

**Synchronous counters** eliminate the ripple problem by connecting all flip-flops to the same clock signal. Every flip-flop transitions simultaneously at each clock edge, and combinational logic determines which flip-flops should toggle.

</div>

<h4 style="color: #5A3EED; font-weight: 700;">Diagram: Synchronous Counter Design Flow</h4>

<div style="background: #F8F6FF; border: 2px solid #D4C8FF; border-radius: 12px; padding: 20px 24px; margin: 1rem 0;" markdown>

Designing a synchronous counter follows a systematic procedure. Starting from the desired counting sequence, the designer constructs a state table, determines the required flip-flop inputs using excitation tables, simplifies those inputs with K-maps, and finally implements and verifies the circuit.

```mermaid
flowchart TD
    A["<b>1. Define Counting Sequence</b>\nSpecify the desired states\nand their order (e.g. 0→1→…→15→0)"] --> B["<b>2. Construct State Table</b>\nList each present state and\nits corresponding next state"]
    B --> C["<b>3. Determine Flip-Flop Inputs</b>\nUse excitation tables to find\nrequired D, T, J, K inputs\nfor each state transition"]
    C --> D["<b>4. K-map Simplification</b>\nCreate a K-map for each\nflip-flop input and simplify"]
    D --> E["<b>5. Derive Logic Equations</b>\nExtract minimized Boolean\nexpressions from K-maps"]
    E --> F["<b>6. Implement Counter Circuit</b>\nConnect flip-flops with the\nderived combinational logic"]
    F --> G["<b>7. Verify with Timing Diagram</b>\nSimulate to confirm correct\ncounting sequence and timing"]

    style A fill:#E8DAEF,stroke:#7D3C98,color:#333
    style B fill:#D6EAF8,stroke:#2980B9,color:#333
    style C fill:#D5F5E3,stroke:#27AE60,color:#333
    style D fill:#FDEBD0,stroke:#E67E22,color:#333
    style E fill:#FADBD8,stroke:#E74C3C,color:#333
    style F fill:#FCF3CF,stroke:#F1C40F,color:#333
    style G fill:#D4E6F1,stroke:#2E86C1,color:#333
```

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">10.8.1 Binary Up Counter Design</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

The key design insight is determining *when* each bit should toggle. Look carefully at the first several values of the 4-bit binary counting sequence and notice how each column behaves:

| Decimal | $Q_3$ | $Q_2$ | $Q_1$ | $Q_0$ | What toggles on the **next** clock edge |
|---------|-------|-------|-------|-------|-----------------------------------------|
| 0 | 0 | 0 | 0 | 0 | $Q_0$ (always toggles) |
| 1 | 0 | 0 | 0 | 1 | $Q_1$ and $Q_0$ (because $Q_0 = 1$) |
| 2 | 0 | 0 | 1 | 0 | $Q_0$ |
| 3 | 0 | 0 | 1 | 1 | $Q_2$, $Q_1$, $Q_0$ (because $Q_1 Q_0 = 11$) |
| 4 | 0 | 1 | 0 | 0 | $Q_0$ |
| ... | | | | | |

The **pattern**: a bit at position $i$ toggles when **all** of the lower-order bits ($Q_0$ through $Q_{i-1}$) are simultaneously **1** — that is, when the lower portion of the counter is about to overflow and carry into bit $i$.

<h4 style="color: #5A3EED; font-weight: 600;">Synchronous Up Counter Toggle Equations</h4>

$T_0 = 1$

$T_1 = Q_0$

$T_2 = Q_0 \cdot Q_1$

$T_3 = Q_0 \cdot Q_1 \cdot Q_2$

In general, the toggle input for bit $i$ is the AND (logical product) of every lower-order output:

$T_i = \prod_{j=0}^{i-1} Q_j$

where:

- $T_i$ is the toggle input for flip-flop $i$
- $Q_j$ is the current output of flip-flop $j$
- The $\prod$ symbol denotes a logical AND (product) of all terms from $j = 0$ to $j = i - 1$

Reading the equations in plain language:

- $Q_0$ toggles on **every** clock edge ($T_0 = 1$, always true).
- $Q_1$ toggles only when $Q_0 = 1$ (the ones place is about to carry).
- $Q_2$ toggles only when $Q_0 = Q_1 = 1$ (the two lowest bits are both 1).
- $Q_3$ toggles only when $Q_0 = Q_1 = Q_2 = 1$ (the three lowest bits are all 1).

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">10.8.2 Binary Down Counter Design</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

A **down counter** counts in reverse: $1111 \rightarrow 1110 \rightarrow 1101 \rightarrow \cdots \rightarrow 0000 \rightarrow 1111$.

The logic mirrors the up counter, but with **complemented** outputs. A bit at position $i$ toggles when all lower-order bits are simultaneously **0** — meaning the lower portion is about to underflow and borrow from bit $i$:

$T_0 = 1$

$T_1 = Q_0'$

$T_2 = Q_0' \cdot Q_1'$

$T_3 = Q_0' \cdot Q_1' \cdot Q_2'$

In plain language: $Q_1$ toggles when $Q_0 = 0$, $Q_2$ toggles when $Q_0 = Q_1 = 0$, and so on. Compare this directly with the up counter — the only change is replacing each $Q_j$ with its complement $Q_j'$.

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">10.8.3 Up/Down Counter</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

An **up/down counter** combines both counting directions into a single circuit using a direction control signal $Dir$:

- When $Dir = 1$: Count **up** — use $Q_j$ in the toggle terms (carry logic)
- When $Dir = 0$: Count **down** — use $Q_j'$ in the toggle terms (borrow logic)

The idea is to place a multiplexer-like expression at each stage that selects between $Q_j$ (for up) and $Q_j'$ (for down), controlled by $Dir$.

<h4 style="color: #5A3EED; font-weight: 600;">Up/Down Counter Toggle Equation</h4>

$T_i = \prod_{j=0}^{i-1} (Dir \cdot Q_j + Dir' \cdot Q_j')$

where:

- $Dir$ is the direction control signal (1 = count up, 0 = count down)
- The expression $(Dir \cdot Q_j + Dir' \cdot Q_j')$ acts like a 2-to-1 MUX: it passes $Q_j$ when $Dir = 1$ and $Q_j'$ when $Dir = 0$
- The $\prod$ (logical AND) chains these MUX terms together, just as in the individual up and down counters

| Dir | Counting Direction | Toggle Condition for Bit $i$ | Logic Used |
|-----|-------------------|------------------------------|------------|
| 1 | Up | All lower bits are 1 (carry) | $Q_j$ terms |
| 0 | Down | All lower bits are 0 (borrow) | $Q_j'$ terms |

</div>

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">10.9 Modulo-N Counters</h2>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

A **modulo-N counter** (or mod-N counter) counts through exactly $N$ states before repeating. A standard 4-bit binary counter is modulo-16. Designing counters with non-power-of-two modulus requires additional logic to truncate the counting sequence.

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">10.9.1 Design Methods</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

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

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">10.9.2 Example: Mod-6 Counter</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

A mod-6 counter counts: $000 \rightarrow 001 \rightarrow 010 \rightarrow 011 \rightarrow 100 \rightarrow 101 \rightarrow 000$

**Using the reset method:**

- Normal 3-bit counter counts 000 through 111
- Detect state 110 (decimal 6): $Q_2 \cdot Q_1 \cdot Q_0'$
- Use this signal to reset all flip-flops to 000

</div>

!!! warning "Glitch Consideration"
    The reset method causes a brief glitch: the counter momentarily enters the "overflow" state before resetting. In synchronous designs, this glitch is resolved within the same clock cycle and causes no problems. In asynchronous designs, external circuits may see the transient state.

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">10.9.3 BCD Counter (Decade Counter)</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

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

</div>

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">10.10 Ring Counter and Johnson Counter</h2>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

Two special counter types use shift register feedback to generate non-binary counting sequences with advantageous properties.

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">10.10.1 Ring Counter</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

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

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">10.10.2 Johnson Counter (Twisted Ring Counter)</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

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

<h4 style="color: #5A3EED; font-weight: 600;">Comparison of Counter Types</h4>

| Counter Type | Flip-Flops for $n$ States | Decoding Logic | Self-Correcting | Glitch-Free |
|-------------|---------------------------|----------------|-----------------|-------------|
| Binary | $\lceil\log_2 n\rceil$ | Complex ($n$-input) | Yes | No |
| Ring | $n$ | None (1-hot) | No | Yes |
| Johnson | $n/2$ | Simple (2-input AND) | No | Yes |

</div>

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">10.11 Finite State Machine Concepts</h2>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

A **finite state machine (FSM)** is the most general form of sequential circuit. Unlike registers and counters, which have fixed or simple state sequences, an FSM's next state depends on both the current state and the current inputs. FSMs can implement arbitrary sequential behavior, from simple pattern detectors to complex protocol controllers.

An FSM is formally defined by five elements:

- **States ($S$):** A finite set of states $\{S_0, S_1, \ldots, S_{k-1}\}$
- **Inputs ($I$):** A finite set of input symbols
- **Outputs ($O$):** A finite set of output symbols
- **Next-state function ($\delta$):** $S_{next} = \delta(S_{current}, I)$
- **Output function ($\lambda$):** Depends on the machine model (Moore or Mealy)

The two FSM models differ only in how outputs are generated.

</div>

<h4 style="color: #5A3EED; font-weight: 700;">Diagram: General FSM Structure</h4>

<div style="background: #F8F6FF; border: 2px solid #D4C8FF; border-radius: 12px; padding: 20px 24px; margin: 1rem 0;" markdown>

Every FSM shares the same fundamental architecture: combinational logic computes the next state and outputs, while flip-flops store the current state. The feedback path from the flip-flop outputs back to the combinational logic input is what makes the circuit sequential.

```mermaid
flowchart LR
    INPUT["<b>Inputs</b>"] --> CL["<b>Next-State Logic</b>"]
    CL -->|"Next State"| FF["<b>State Register</b>\n(Flip-Flops)"]
    FF -->|"Current State"| CL
    FF -->|"State"| OL["<b>Output Logic</b>"]
    INPUT -.->|"Direct Input Path\n(Mealy Machines Only)"| OL
    OL --> OUTPUT["<b>Outputs</b>"]
    CLK["<b>Clock</b>\n(State Update)"] --> FF

    style INPUT fill:#D5F5E3,stroke:#27AE60,color:#333
    style CL fill:#D6EAF8,stroke:#2980B9,color:#333
    style FF fill:#E8DAEF,stroke:#7D3C98,color:#333
    style OL fill:#FDEBD0,stroke:#E67E22,color:#333
    style OUTPUT fill:#FADBD8,stroke:#E74C3C,color:#333
    style CLK fill:#FCF3CF,stroke:#F1C40F,color:#333
```

</div>

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">10.12 Moore Machine Model</h2>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

In a **Moore machine**, the outputs depend **only on the current state** — the current input values have no direct influence on the outputs. Once the FSM enters a given state, its outputs are fully determined and remain constant until the machine transitions to a different state on the next active clock edge. By contrast, a Mealy machine allows outputs to depend on both the current state *and* the current inputs, which can produce faster responses but also introduces the possibility of output glitches between clock edges.

<h4 style="color: #5A3EED; font-weight: 600;">Moore Output Function</h4>

$O = \lambda(S)$

where:

- $O$ is the output vector
- $S$ is the current state
- $\lambda$ is the output function (maps each state to a fixed output value)

**Key characteristics:**

- Outputs are tied to **states**, not to transitions — every time the machine is in a given state, the output is the same regardless of input values
- Outputs change **synchronously** — they update only at a clock edge when the state itself changes
- Output values remain **stable** for the entire clock period, making Moore machines inherently resistant to output glitches
- Moore machines often require **more states** than an equivalent Mealy machine, because each unique output value must map to a distinct state
- Preferred when **clean, glitch-free outputs** are critical (e.g., outputs driving other synchronous logic or external devices)

In a Moore state diagram, outputs are written **inside the state circles** (or listed below the state name), because the output belongs to the state itself:

```
   ┌────────────┐                ┌────────────┐
   │    S0      │   input = 1    │    S1      │
   │   Z = 0    │───────────────▶│   Z = 1    │
   └────────────┘                └────────────┘
     ▲  input = 0                  │  input = 0
     └─────────────────────────────┘
```

Notice that the output value ($Z$) appears **inside** each state box, not on the transition arrows. The arrows carry only the input condition that triggers the transition. This is the hallmark of a Moore diagram — if you need to know the output, look at the state, not the arrow.

</div>

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">10.13 Mealy Machine Model</h2>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

In a **Mealy machine**, the outputs depend on **both the current state and the current inputs**. Unlike a Moore machine — where knowing the state alone determines the output — a Mealy machine's output can change immediately whenever an input changes, even in the middle of a clock period. This direct input-to-output path gives Mealy machines faster response but also makes their outputs more sensitive to input noise.

<h4 style="color: #5A3EED; font-weight: 600;">Mealy Output Function</h4>

$O = \lambda(S, I)$

where:

- $O$ is the output vector
- $S$ is the current state
- $I$ is the current input vector
- $\lambda$ is the output function (maps each state-and-input combination to an output value)

**Key characteristics:**

- Outputs are tied to **transitions**, not to states — the same state can produce different outputs depending on the current input values
- Outputs can change **asynchronously** whenever inputs change, even between clock edges
- Mealy machines often require **fewer states** than an equivalent Moore machine, because a single state can produce multiple output values via different transitions
- Outputs may respond **one clock cycle earlier** than a Moore equivalent, since they react to inputs immediately rather than waiting for a state change
- More susceptible to **output glitches** if inputs change asynchronously or arrive with different propagation delays

In a Mealy state diagram, outputs are written **on the transition arrows** using the notation **input/output**. Each arrow is labeled with the input condition that triggers the transition and the output produced during that transition:

```
   ┌────────────┐              ┌────────────┐
   │            │   0 / 0      │            │
   │     S0     │─────────────▶│     S1     │
   │            │              │            │
   └────────────┘              └────────────┘
     ▲  1 / 0                    │  1 / 1
     └───────────────────────────┘
```

Notice that each arrow carries **both** the input and the output (separated by a slash), while the state boxes contain only the state name. This is the hallmark of a Mealy diagram — if you need to know the output, look at the arrow, not the state.

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">10.13.1 Moore vs Mealy Comparison</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

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

</div>

<h4 style="color: #5A3EED; font-weight: 700;">Diagram: Moore vs Mealy Sequence Detector Comparison</h4>

<div style="background: #F8F6FF; border: 2px solid #D4C8FF; border-radius: 12px; padding: 20px 24px; margin: 1rem 0;" markdown>

Both diagrams below implement a **"01" sequence detector** — the output $Z = 1$ whenever the two most recent input bits form the pattern "01". Compare how the Moore machine places the output **inside each state**, while the Mealy machine places it **on each transition arrow**. Notice the Moore version requires an extra state (S2) solely to produce the detection output.

**Moore Machine** — output depends on state only (Z is labeled inside each state):

```mermaid
stateDiagram-v2
    direction LR
    state "S0 — Idle\nZ = 0" as S0
    state "S1 — Got '0'\nZ = 0" as S1
    state "S2 — Got '01'\nZ = 1" as S2

    [*] --> S0
    S0 --> S0 : 1
    S0 --> S1 : 0
    S1 --> S1 : 0
    S1 --> S2 : 1
    S2 --> S1 : 0
    S2 --> S0 : 1
```

- **S0 (Idle):** No part of "01" received. Input 0 moves to S1; input 1 stays in S0.
- **S1 (Got '0'):** First bit matches. Input 1 completes the pattern → S2; input 0 stays in S1.
- **S2 (Got '01'):** Pattern detected, $Z = 1$. Input 0 starts a new attempt → S1; input 1 resets → S0.

**Mealy Machine** — output depends on state AND input (each transition is labeled **input / output**):

```mermaid
stateDiagram-v2
    direction LR
    state "S0 — Idle" as M0
    state "S1 — Got '0'" as M1

    [*] --> M0
    M0 --> M0 : 1 / 0
    M0 --> M1 : 0 / 0
    M1 --> M0 : 1 / 1
    M1 --> M1 : 0 / 0
```

- **S0 (Idle):** Input 0 moves to S1 with output 0; input 1 stays in S0 with output 0.
- **S1 (Got '0'):** Input 1 completes the pattern and produces $Z = 1$ immediately on the transition back to S0; input 0 stays in S1 with output 0.

The Mealy machine achieves the same detection with only **2 states** (vs 3 for Moore) because it produces the output immediately on the detecting transition, eliminating the need for a separate "detection" state.

</div>

<h4 style="color: #5A3EED; font-weight: 600;">Diagram: Moore vs Mealy State Diagrams</h4>

#### Diagram: Moore vs Mealy Interactive Comparison

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../sims/moore-mealy-comparison/main.html" width="100%" height="690px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">10.14 State Diagram Representation</h2>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

A **state diagram** (also called a state graph) is a directed graph that visually represents an FSM's behavior. It is the starting point for FSM design and the primary tool for communicating sequential behavior.

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">10.14.1 State Diagram Elements</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

| Element | Symbol | Purpose |
|---------|--------|---------|
| State | Circle | Represents a unique internal condition |
| Transition | Directed arrow | Shows state change for given input |
| Initial state | Arrow from nowhere (or double circle) | Identifies the starting state |
| Input label | Text on arrow | Condition that triggers the transition |
| Output label | Text inside circle (Moore) or on arrow (Mealy) | Output value(s) |

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">10.14.2 State Diagram Construction Rules</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

When constructing a state diagram:

1. **Completeness:** Every state must have an outgoing transition for every possible input combination
2. **Determinism:** For each state and input combination, there must be exactly one next state
3. **Reachability:** Every state should be reachable from the initial state
4. **Output specification:** Outputs must be defined for every state (Moore) or every transition (Mealy)

</div>

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">10.15 State Table Construction</h2>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

A **state table** (or transition table) is the tabular equivalent of a state diagram, listing every state-input combination with its corresponding next state and output. State tables are easier to work with mathematically and are the bridge between the state diagram and the circuit implementation.

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">10.15.1 Moore Machine State Table Format</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

| Current State | Input $X$ | Next State | Output $Z$ |
|--------------|-----------|------------|------------|
| $S_0$ | 0 | $S_0$ | 0 |
| $S_0$ | 1 | $S_1$ | 0 |
| $S_1$ | 0 | $S_2$ | 0 |
| $S_1$ | 1 | $S_1$ | 0 |
| ... | ... | ... | ... |

Note: In a Moore table, the output column depends only on the current state (same output value for all input rows of a given state).

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">10.15.2 Mealy Machine State Table Format</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

| Current State | Input $X$ | Next State | Output $Z$ |
|--------------|-----------|------------|------------|
| $S_0$ | 0 | $S_0$ | 0 |
| $S_0$ | 1 | $S_1$ | 0 |
| $S_1$ | 0 | $S_2$ | 1 |
| $S_1$ | 1 | $S_1$ | 0 |
| ... | ... | ... | ... |

In a Mealy table, the output column depends on both the current state and the input (output can differ for different inputs in the same state).

</div>

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">10.16 State Assignment Strategies</h2>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

**State assignment** is the process of mapping abstract state names ($S_0, S_1, \ldots$) to binary codes stored in the flip-flops. The choice of state assignment significantly affects the complexity of the next-state and output logic.

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">10.16.1 Common Strategies</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

| Strategy | Assignment for 4 States | Flip-Flops | Next-State Logic |
|----------|------------------------|-----------|-----------------|
| Binary (sequential) | 00, 01, 10, 11 | $\lceil\log_2 N\rceil$ | Moderate |
| Gray code | 00, 01, 11, 10 | $\lceil\log_2 N\rceil$ | Often simpler |
| One-hot | 0001, 0010, 0100, 1000 | $N$ | Very simple |
| Output-based | Codes chosen to match output values | $\lceil\log_2 N\rceil$ + | May eliminate output logic |

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">10.16.2 Binary Encoding</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

The simplest approach: assign consecutive binary numbers to states. Uses the minimum number of flip-flops ($\lceil\log_2 N\rceil$ for $N$ states) but may produce complex next-state logic.

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">10.16.3 One-Hot Encoding</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

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

</div>

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">10.17 FSM Design Procedure</h2>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

The systematic FSM design procedure transforms a behavioral specification into an optimized circuit implementation. This seven-step methodology applies to both Moore and Mealy machines.

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">Step 1: Problem Specification</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

Define the FSM behavior precisely:

- Identify all inputs and outputs
- Describe the desired behavior in words or by example
- Specify whether Moore or Mealy is preferred
- Identify the reset/initial state

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">Step 2: State Diagram</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

Draw the state diagram:

- Create states for each unique condition the machine must distinguish
- Add transitions for every input combination from every state
- Verify completeness and determinism
- Label outputs appropriately

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">Step 3: State Table</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

Convert the state diagram to tabular form:

- List all state-input combinations
- Fill in next state and output columns
- Verify consistency with the state diagram

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">Step 4: State Minimization</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

Reduce the number of states (if possible):

- Identify equivalent states (same outputs and equivalent next states)
- Merge equivalent states
- Update the state table

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">Step 5: State Assignment</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

Choose binary codes for each state:

- Select encoding strategy (binary, Gray, one-hot)
- Assign codes considering logic optimization
- Create the binary transition table

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">Step 6: Next-State and Output Logic Design</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

Derive the combinational logic equations:

1. Write the transition table with binary state variables
2. For each flip-flop input, create a K-map or use algebraic methods
3. If using D flip-flops: the next-state variable equals the flip-flop D input ($D_i = Q_i^+$)
4. If using JK flip-flops: use the excitation table to determine J and K inputs
5. Derive output equations from the output columns

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">Step 7: Circuit Implementation</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

After deriving the state transitions and logic equations, the final step is to implement the hardware circuit. The implementation includes five key components:

- **Flip-flops** to store the current state — one flip-flop per state bit (e.g., two D flip-flops for a 4-state FSM with binary encoding)
- **Next-state combinational logic** to compute the next state from the current state and inputs, using the minimized equations from Step 6
- **Output logic** to generate the FSM outputs — derived from state variables only (Moore) or from state variables and inputs (Mealy)
- **Reset circuitry** to initialize the machine to a known starting state on power-up or when a reset signal is asserted
- **Timing simulation** to verify that the circuit produces the correct state sequence and outputs for all input scenarios before committing to hardware

</div>

<h4 style="color: #5A3EED; font-weight: 600;">MicroSim: FSM Designer</h4>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../sims/fsm-designer/main.html" width="100%" height="550px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">10.18 Next-State Logic Design</h2>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

The **next-state logic** is the combinational circuit that computes the next state ($Q^+$) from the current state ($Q$) and inputs ($X$). The design approach depends on the flip-flop type used.

</div>

<h4 style="color: #5A3EED; font-weight: 700;">Diagram: Next-State Logic Block Diagram</h4>

<div style="background: #F8F6FF; border: 2px solid #D4C8FF; border-radius: 12px; padding: 20px 24px; margin: 1rem 0;" markdown>

The following block diagram shows the general architecture of an FSM implemented with D flip-flops. The input $X$ and the current state outputs ($Q_1, Q_0$) feed into the **next-state combinational logic**, which computes the D inputs ($D_1, D_0$). On each rising clock edge, the flip-flops capture these values as the new state. The **output logic** derives $Z$ from the state variables (Moore) or from both state and input (Mealy).

<div style="text-align: center; margin: 1.5rem 0;">
<svg viewBox="0 0 680 310" style="max-width: 660px; width: 100%;" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .fsm-block { rx: 8; ry: 8; stroke-width: 2; }
      .fsm-label { font-family: 'Segoe UI', Arial, sans-serif; font-weight: 700; }
      .fsm-small { font-family: 'Segoe UI', Arial, sans-serif; font-size: 12px; fill: #555; }
      .fsm-sig   { font-family: 'Courier New', monospace; font-size: 13px; font-weight: 700; }
      .fsm-wire  { stroke: #455A64; stroke-width: 2; fill: none; }
      .fsm-fb    { stroke: #E53935; stroke-width: 2.2; fill: none; stroke-dasharray: 7,4; }
    </style>
  </defs>
  <rect x="0" y="0" width="680" height="310" rx="12" fill="#FAFBFF" stroke="#E0E0E0" stroke-width="1"/>

  <!-- Input -->
  <text x="28" y="120" class="fsm-sig" fill="#1565C0">X</text>
  <line x1="42" y1="116" x2="120" y2="116" class="fsm-wire"/>
  <polygon points="116,112 124,116 116,120" fill="#455A64"/>

  <!-- Next-State Logic block -->
  <rect x="125" y="70" width="170" height="120" class="fsm-block" fill="#D6EAF8" stroke="#2980B9"/>
  <text x="210" y="120" text-anchor="middle" class="fsm-label" font-size="14" fill="#2980B9">Next-State</text>
  <text x="210" y="138" text-anchor="middle" class="fsm-label" font-size="14" fill="#2980B9">Combinational Logic</text>
  <text x="135" y="92" class="fsm-small">Inputs: X, Q₁, Q₀</text>
  <text x="135" y="170" class="fsm-small">Outputs: D₁, D₀</text>

  <!-- Wires from Next-State to Flip-Flops -->
  <line x1="295" y1="110" x2="370" y2="110" class="fsm-wire"/>
  <polygon points="366,106 374,110 366,114" fill="#455A64"/>
  <text x="325" y="104" class="fsm-sig" fill="#333">D₁</text>

  <line x1="295" y1="150" x2="370" y2="150" class="fsm-wire"/>
  <polygon points="366,146 374,150 366,154" fill="#455A64"/>
  <text x="325" y="144" class="fsm-sig" fill="#333">D₀</text>

  <!-- State Register (Flip-Flops) -->
  <rect x="375" y="70" width="130" height="120" class="fsm-block" fill="#E8DAEF" stroke="#7D3C98"/>
  <text x="440" y="115" text-anchor="middle" class="fsm-label" font-size="14" fill="#7D3C98">State Register</text>
  <text x="440" y="135" text-anchor="middle" class="fsm-label" font-size="13" fill="#7D3C98">(D Flip-Flops)</text>

  <!-- Clock input -->
  <text x="410" y="210" class="fsm-sig" fill="#F1C40F">CLK</text>
  <line x1="440" y1="198" x2="440" y2="190" class="fsm-wire" stroke="#F1C40F"/>
  <polygon points="436,193 440,185 444,193" fill="#F1C40F"/>

  <!-- Wires from FFs to Output Logic -->
  <line x1="505" y1="110" x2="560" y2="110" class="fsm-wire"/>
  <polygon points="556,106 564,110 556,114" fill="#455A64"/>
  <text x="523" y="104" class="fsm-sig" fill="#333">Q₁</text>

  <line x1="505" y1="150" x2="560" y2="150" class="fsm-wire"/>
  <polygon points="556,146 564,150 556,154" fill="#455A64"/>
  <text x="523" y="144" class="fsm-sig" fill="#333">Q₀</text>

  <!-- Output Logic block -->
  <rect x="565" y="85" width="95" height="80" class="fsm-block" fill="#FDEBD0" stroke="#E67E22"/>
  <text x="612" y="120" text-anchor="middle" class="fsm-label" font-size="13" fill="#E67E22">Output</text>
  <text x="612" y="137" text-anchor="middle" class="fsm-label" font-size="13" fill="#E67E22">Logic</text>

  <!-- Output Z -->
  <line x1="640" y1="125" x2="670" y2="125" class="fsm-wire" stroke="#E67E22" stroke-width="2.5"/>
  <text x="668" y="120" class="fsm-sig" fill="#E67E22">Z</text>

  <!-- Feedback path (Q back to next-state logic) -->
  <line x1="530" y1="130" x2="530" y2="270" class="fsm-fb"/>
  <line x1="530" y1="270" x2="90" y2="270" class="fsm-fb"/>
  <line x1="90" y1="270" x2="90" y2="145" class="fsm-fb"/>
  <line x1="90" y1="145" x2="125" y2="145" class="fsm-fb"/>
  <polygon points="121,141 129,145 121,149" fill="#E53935"/>
  <text x="300" y="288" text-anchor="middle" class="fsm-small" style="fill:#E53935; font-weight:600;">Current State Feedback (Q₁, Q₀)</text>

  <!-- Q+ label on next-state output side -->
  <text x="210" y="56" text-anchor="middle" class="fsm-small" style="fill:#2980B9; font-weight:600;">Computes Q⁺ = next state</text>
</svg>
</div>

The red dashed feedback path is what makes the circuit sequential — the current state outputs feed back into the next-state logic, creating a loop that is broken only by the clock edge.

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">10.18.1 Using D Flip-Flops</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

With D flip-flops, the design is straightforward because:

$D_i = Q_i^+$

The D input of each flip-flop equals the desired next-state value for that bit. Simply derive the next-state expressions from K-maps and connect them directly to the D inputs.

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">10.18.2 Using JK Flip-Flops</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

With JK flip-flops, use the **excitation table** (from Unit 9) to determine $J$ and $K$ inputs:

| $Q$ | $Q^+$ | J | K |
|-----|--------|---|---|
| 0 | 0 | 0 | X |
| 0 | 1 | 1 | X |
| 1 | 0 | X | 1 |
| 1 | 1 | X | 0 |

The don't-care entries often allow simpler logic expressions than the D flip-flop approach. After determining $J$ and $K$ for each state variable and input combination, use K-maps to minimize the expressions.

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">10.18.3 Design Example: D Flip-Flop Approach</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

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

**K-map simplification:**

<h4 style="color: #5A3EED; font-weight: 600;">K-map for $D_1$ ($Q_1^+$)</h4>

<div style="text-align: center; margin: 1.2rem 0;">
<svg viewBox="0 0 420 230" style="max-width: 400px; width: 100%;" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .km-cell { stroke: #455A64; stroke-width: 1.5; rx: 2; }
      .km-text { font-family: 'Courier New', monospace; font-size: 16px; font-weight: 700; text-anchor: middle; }
      .km-var  { font-family: 'Segoe UI', Arial, sans-serif; font-size: 13px; font-weight: 700; }
      .km-head { font-family: 'Courier New', monospace; font-size: 12px; font-weight: 600; fill: #555; text-anchor: middle; }
      .km-group { fill: none; stroke-width: 2.5; rx: 8; ry: 8; }
    </style>
  </defs>
  <rect x="0" y="0" width="420" height="230" rx="10" fill="#FAFBFF" stroke="#E0E0E0" stroke-width="1"/>

  <!-- Title -->
  <text x="210" y="22" text-anchor="middle" font-family="Segoe UI, Arial" font-size="14" font-weight="700" fill="#5A3EED">K-map for D₁ (Q₁⁺)</text>

  <!-- Column headers: Q₁Q₀ -->
  <text x="100" y="52" class="km-var" fill="#2980B9">Q₁Q₀ \ X</text>
  <text x="210" y="52" class="km-head">X=0</text>
  <text x="310" y="52" class="km-head">X=1</text>

  <!-- Row headers -->
  <text x="140" y="83" class="km-head">00</text>
  <text x="140" y="123" class="km-head">01</text>
  <text x="140" y="163" class="km-head">11</text>
  <text x="140" y="203" class="km-head">10</text>

  <!-- Grid cells -->
  <!-- Row 00 -->
  <rect x="170" y="60" width="80" height="30" class="km-cell" fill="#FFF"/>
  <text x="210" y="81" class="km-text" fill="#999">0</text>
  <rect x="270" y="60" width="80" height="30" class="km-cell" fill="#FFF"/>
  <text x="310" y="81" class="km-text" fill="#999">0</text>

  <!-- Row 01 -->
  <rect x="170" y="100" width="80" height="30" class="km-cell" fill="#E8F5E9"/>
  <text x="210" y="121" class="km-text" fill="#2E7D32">1</text>
  <rect x="270" y="100" width="80" height="30" class="km-cell" fill="#FFF"/>
  <text x="310" y="121" class="km-text" fill="#999">0</text>

  <!-- Row 11 (don't care - unused state) -->
  <rect x="170" y="140" width="80" height="30" class="km-cell" fill="#FFF8E1"/>
  <text x="210" y="161" class="km-text" fill="#F57F17">X</text>
  <rect x="270" y="140" width="80" height="30" class="km-cell" fill="#FFF8E1"/>
  <text x="310" y="161" class="km-text" fill="#F57F17">X</text>

  <!-- Row 10 -->
  <rect x="170" y="180" width="80" height="30" class="km-cell" fill="#FFF"/>
  <text x="210" y="201" class="km-text" fill="#999">0</text>
  <rect x="270" y="180" width="80" height="30" class="km-cell" fill="#FFF"/>
  <text x="310" y="201" class="km-text" fill="#999">0</text>

  <!-- Group 1: Q₀·X' (cells 01/X=0 and 11/X=0) -->
  <rect x="167" y="97" width="86" height="76" class="km-group" stroke="#4CAF50" stroke-dasharray="0"/>

  <!-- Group label -->
  <text x="390" y="135" font-family="Segoe UI, Arial" font-size="12" font-weight="700" fill="#4CAF50">Q₀·X'</text>
  <line x1="256" y1="130" x2="382" y2="130" stroke="#4CAF50" stroke-width="1" stroke-dasharray="4,3"/>
</svg>
</div>

From the K-map, the 1-cell at $Q_1Q_0 = 01, X = 0$ groups with the don't-care at $Q_1Q_0 = 11, X = 0$, yielding the term $Q_0 \cdot X'$. For the 3-state example, this is the only group:

$D_1 = Q_0 \cdot X'$

$D_0 = X$

$Z = Q_1$

</div>

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">10.19 Output Logic Design</h2>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

The **output logic** produces the FSM's output signals from the state variables (Moore) or from the state variables and inputs (Mealy).

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">10.19.1 Moore Output Logic</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

Moore outputs are purely a function of the current state:

$Z = f(Q_1, Q_0, \ldots)$

Derive output expressions using K-maps with only state variables. In the example above, $Z = Q_1$ — the output equals the MSB of the state encoding.

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">10.19.2 Mealy Output Logic</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

Mealy outputs depend on both state and inputs:

$Z = f(Q_1, Q_0, \ldots, X_1, X_0, \ldots)$

Derive output expressions using K-maps with both state variables and input variables. Mealy output equations are typically more complex but the FSM may require fewer states.

</div>

!!! tip "Output-Based State Assignment"
    Sometimes choosing state codes so that the output value matches one or more state bits can eliminate the output logic entirely. For example, if a Moore machine has $Z = 1$ in states $S_2$ and $S_3$ and $Z = 0$ in $S_0$ and $S_1$, assigning $S_0 = 00$, $S_1 = 01$, $S_2 = 10$, $S_3 = 11$ makes $Z = Q_1$ — a free output with no additional gates.

<h4 style="color: #5A3EED; font-weight: 700;">Diagram: Complete FSM Hardware Circuit (3-State Example)</h4>

<div style="background: #F8F6FF; border: 2px solid #D4C8FF; border-radius: 12px; padding: 20px 24px; margin: 1rem 0;" markdown>

This circuit implements the 3-state Moore FSM from Section 10.18.3 using the derived equations: $D_1 = Q_0 \cdot X'$, $D_0 = X$, and $Z = Q_1$. Notice how simple the output logic is — $Z$ is just the $Q_1$ wire, requiring no additional gates.

<div style="text-align: center; margin: 1.5rem 0;">
<svg viewBox="0 0 660 340" style="max-width: 640px; width: 100%;" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .hw-block { rx: 6; ry: 6; stroke-width: 2; }
      .hw-label { font-family: 'Segoe UI', Arial, sans-serif; font-weight: 700; }
      .hw-sig   { font-family: 'Courier New', monospace; font-size: 12px; font-weight: 700; }
      .hw-wire  { stroke: #455A64; stroke-width: 2; fill: none; }
      .hw-eq    { font-family: 'Courier New', monospace; font-size: 11px; fill: #333; }
    </style>
  </defs>
  <rect x="0" y="0" width="660" height="340" rx="12" fill="#FAFBFF" stroke="#E0E0E0" stroke-width="1"/>

  <!-- Title -->
  <text x="330" y="22" text-anchor="middle" font-family="Segoe UI, Arial" font-size="14" font-weight="700" fill="#5A3EED">3-State Moore FSM — Hardware Implementation</text>

  <!-- Input X -->
  <text x="15" y="105" class="hw-sig" fill="#1565C0">X</text>
  <line x1="30" y1="100" x2="85" y2="100" class="hw-wire"/>

  <!-- NOT gate for X' -->
  <rect x="88" y="55" width="55" height="30" class="hw-block" fill="#FFF3E0" stroke="#E67E22"/>
  <text x="115" y="74" text-anchor="middle" class="hw-label" font-size="11" fill="#E67E22">NOT</text>
  <line x1="55" y1="100" x2="55" y2="70" class="hw-wire"/>
  <line x1="55" y1="70" x2="88" y2="70" class="hw-wire"/>
  <polygon points="84,66 92,70 84,74" fill="#455A64"/>
  <!-- X' output -->
  <line x1="143" y1="70" x2="165" y2="70" class="hw-wire"/>
  <text x="150" y="62" class="hw-sig" fill="#333">X'</text>

  <!-- AND gate: Q₀ · X' -->
  <rect x="168" y="50" width="65" height="40" class="hw-block" fill="#E8F5E9" stroke="#4CAF50"/>
  <text x="200" y="74" text-anchor="middle" class="hw-label" font-size="11" fill="#388E3C">AND</text>

  <!-- Q₀ feedback into AND -->
  <line x1="168" y1="80" x2="148" y2="80" class="hw-wire"/>
  <text x="150" y="92" class="hw-sig" fill="#E53935">Q₀</text>

  <!-- AND output = D₁ -->
  <line x1="233" y1="70" x2="300" y2="70" class="hw-wire"/>
  <polygon points="296,66 304,70 296,74" fill="#455A64"/>
  <text x="260" y="62" class="hw-sig" fill="#333">D₁</text>

  <!-- D Flip-Flop 1 -->
  <rect x="305" y="45" width="90" height="70" class="hw-block" fill="#E8DAEF" stroke="#7D3C98"/>
  <text x="350" y="72" text-anchor="middle" class="hw-label" font-size="12" fill="#7D3C98">D FF₁</text>
  <text x="315" y="62" font-family="Courier New" font-size="10" fill="#7D3C98">D</text>
  <text x="380" y="62" font-family="Courier New" font-size="10" fill="#7D3C98">Q</text>
  <!-- Clock triangle -->
  <polygon points="305,100 315,95 305,90" fill="#F1C40F" stroke="#F1C40F" stroke-width="1"/>

  <!-- Q₁ output -->
  <line x1="395" y1="70" x2="470" y2="70" class="hw-wire"/>
  <text x="420" y="62" class="hw-sig" fill="#333">Q₁</text>

  <!-- D₀ = X wire to FF₀ -->
  <line x1="85" y1="100" x2="85" y2="200" class="hw-wire"/>
  <line x1="85" y1="200" x2="300" y2="200" class="hw-wire"/>
  <polygon points="296,196 304,200 296,204" fill="#455A64"/>
  <text x="260" y="192" class="hw-sig" fill="#333">D₀ = X</text>

  <!-- Junction dot at X split -->
  <circle cx="55" cy="100" r="3.5" fill="#455A64"/>
  <circle cx="85" cy="100" r="3.5" fill="#455A64"/>

  <!-- D Flip-Flop 0 -->
  <rect x="305" y="175" width="90" height="70" class="hw-block" fill="#E8DAEF" stroke="#7D3C98"/>
  <text x="350" y="202" text-anchor="middle" class="hw-label" font-size="12" fill="#7D3C98">D FF₀</text>
  <text x="315" y="192" font-family="Courier New" font-size="10" fill="#7D3C98">D</text>
  <text x="380" y="192" font-family="Courier New" font-size="10" fill="#7D3C98">Q</text>
  <!-- Clock triangle -->
  <polygon points="305,230 315,225 305,220" fill="#F1C40F" stroke="#F1C40F" stroke-width="1"/>

  <!-- Q₀ output -->
  <line x1="395" y1="200" x2="470" y2="200" class="hw-wire"/>
  <text x="420" y="192" class="hw-sig" fill="#333">Q₀</text>

  <!-- Clock line -->
  <text x="260" y="280" class="hw-sig" fill="#F1C40F">CLK</text>
  <line x1="285" y1="276" x2="350" y2="276" class="hw-wire" stroke="#F1C40F"/>
  <line x1="350" y1="276" x2="350" y2="245" class="hw-wire" stroke="#F1C40F"/>
  <line x1="350" y1="276" x2="350" y2="276" class="hw-wire" stroke="#F1C40F"/>
  <!-- CLK to FF1 -->
  <line x1="350" y1="276" x2="350" y2="246" class="hw-wire" stroke="#F1C40F"/>
  <line x1="350" y1="115" x2="350" y2="135" class="hw-wire" stroke="#F1C40F"/>
  <circle cx="350" cy="276" r="3" fill="#F1C40F"/>
  <!-- CLK vertical to FF0 -->
  <line x1="350" y1="135" x2="290" y2="135" class="hw-wire" stroke="#F1C40F" stroke-dasharray="4,3"/>
  <text x="278" y="140" font-family="Segoe UI" font-size="9" fill="#F1C40F" font-weight="600">CLK</text>

  <!-- Q₁ feedback for Q₀ into AND gate -->
  <line x1="440" y1="200" x2="440" y2="290" stroke="#E53935" stroke-width="2" stroke-dasharray="6,3" fill="none"/>
  <line x1="440" y1="290" x2="130" y2="290" stroke="#E53935" stroke-width="2" stroke-dasharray="6,3" fill="none"/>
  <line x1="130" y1="290" x2="130" y2="80" stroke="#E53935" stroke-width="2" stroke-dasharray="6,3" fill="none"/>
  <line x1="130" y1="80" x2="148" y2="80" stroke="#E53935" stroke-width="2" stroke-dasharray="6,3" fill="none"/>
  <circle cx="440" cy="200" r="3" fill="#E53935"/>

  <!-- Output: Z = Q₁ -->
  <rect x="500" y="50" width="80" height="40" class="hw-block" fill="#FDEBD0" stroke="#E67E22"/>
  <text x="540" y="74" text-anchor="middle" class="hw-label" font-size="11" fill="#E67E22">Z = Q₁</text>
  <line x1="470" y1="70" x2="500" y2="70" class="hw-wire"/>
  <line x1="580" y1="70" x2="630" y2="70" class="hw-wire" stroke="#E67E22" stroke-width="2.5"/>
  <text x="635" y="74" class="hw-sig" fill="#E67E22">Z</text>
  <circle cx="470" cy="70" r="3" fill="#455A64"/>

  <!-- Equation summary -->
  <text x="500" y="160" class="hw-eq">D₁ = Q₀ · X'</text>
  <text x="500" y="178" class="hw-eq">D₀ = X</text>
  <text x="500" y="196" class="hw-eq">Z  = Q₁</text>
  <rect x="493" y="145" width="120" height="60" rx="6" fill="none" stroke="#5A3EED" stroke-width="1" stroke-dasharray="4,3"/>
  <text x="553" y="140" text-anchor="middle" font-family="Segoe UI" font-size="9" font-weight="600" fill="#5A3EED">Design Equations</text>
</svg>
</div>

The circuit has only three logic elements beyond the flip-flops: one NOT gate (to produce $X'$), one AND gate (to compute $D_1 = Q_0 \cdot X'$), and a direct wire for $D_0 = X$. The output $Z = Q_1$ requires no gate at all — the state encoding was chosen so that $Q_1$ directly represents the output.

</div>

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">10.20 Sequence Detector Design — Complete Example</h2>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

The **sequence detector** is the classic FSM design exercise, tying together all concepts in this unit. We design a Moore machine to detect the input sequence "101" in a serial bit stream, with overlapping detection allowed.

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">Step 1: Specification</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

- **Input:** $X$ (1-bit serial input)
- **Output:** $Z = 1$ when the three most recent inputs form "101"
- **Overlap:** After detecting "101", the final "1" can start a new detection
- **Model:** Moore machine
- **Initial state:** No bits of pattern received

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">Step 2: State Diagram</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

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

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">Step 3: State Table</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

| Current State | $X = 0$ | $X = 1$ | Output $Z$ |
|--------------|---------|---------|------------|
| $S_0$ | $S_0$ | $S_1$ | 0 |
| $S_1$ | $S_2$ | $S_1$ | 0 |
| $S_2$ | $S_0$ | $S_3$ | 0 |
| $S_3$ | $S_2$ | $S_1$ | 1 |

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">Step 4: State Assignment (Binary)</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

$S_0 = 00$, $S_1 = 01$, $S_2 = 10$, $S_3 = 11$

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">Step 5: Binary Transition Table</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

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

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">Step 6: K-Map Simplification</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

**For $D_1 = Q_1^+$:**

<div style="text-align: center; margin: 1.2rem 0;">
<svg viewBox="0 0 460 240" style="max-width: 440px; width: 100%;" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .km2-cell { stroke: #455A64; stroke-width: 1.5; rx: 2; }
      .km2-text { font-family: 'Courier New', monospace; font-size: 15px; font-weight: 700; text-anchor: middle; }
      .km2-head { font-family: 'Courier New', monospace; font-size: 11px; font-weight: 600; fill: #555; text-anchor: middle; }
      .km2-var  { font-family: 'Segoe UI', Arial, sans-serif; font-size: 12px; font-weight: 700; }
    </style>
  </defs>
  <rect x="0" y="0" width="460" height="240" rx="10" fill="#FAFBFF" stroke="#E0E0E0" stroke-width="1"/>
  <text x="230" y="20" text-anchor="middle" font-family="Segoe UI, Arial" font-size="13" font-weight="700" fill="#5A3EED">K-map for D₁ (101 Sequence Detector)</text>

  <!-- Headers -->
  <text x="95" y="48" class="km2-var" fill="#2980B9">Q₁Q₀ \ X</text>
  <text x="205" y="48" class="km2-head">X=0</text>
  <text x="295" y="48" class="km2-head">X=1</text>

  <!-- Row headers (Gray code order) -->
  <text x="140" y="78" class="km2-head">00</text>
  <text x="140" y="118" class="km2-head">01</text>
  <text x="140" y="158" class="km2-head">11</text>
  <text x="140" y="198" class="km2-head">10</text>

  <!-- Row 00: Q₁⁺ = 0, 0 -->
  <rect x="165" y="58" width="80" height="30" class="km2-cell" fill="#FFF"/>
  <text x="205" y="78" class="km2-text" fill="#999">0</text>
  <rect x="255" y="58" width="80" height="30" class="km2-cell" fill="#FFF"/>
  <text x="295" y="78" class="km2-text" fill="#999">0</text>

  <!-- Row 01: Q₁⁺ = 1, 0 -->
  <rect x="165" y="98" width="80" height="30" class="km2-cell" fill="#E8F5E9"/>
  <text x="205" y="118" class="km2-text" fill="#2E7D32">1</text>
  <rect x="255" y="98" width="80" height="30" class="km2-cell" fill="#FFF"/>
  <text x="295" y="118" class="km2-text" fill="#999">0</text>

  <!-- Row 11: Q₁⁺ = 1, 0 -->
  <rect x="165" y="138" width="80" height="30" class="km2-cell" fill="#E3F2FD"/>
  <text x="205" y="158" class="km2-text" fill="#1565C0">1</text>
  <rect x="255" y="138" width="80" height="30" class="km2-cell" fill="#FFF"/>
  <text x="295" y="158" class="km2-text" fill="#999">0</text>

  <!-- Row 10: Q₁⁺ = 0, 1 -->
  <rect x="165" y="178" width="80" height="30" class="km2-cell" fill="#FFF"/>
  <text x="205" y="198" class="km2-text" fill="#999">0</text>
  <rect x="255" y="178" width="80" height="30" class="km2-cell" fill="#E3F2FD"/>
  <text x="295" y="198" class="km2-text" fill="#1565C0">1</text>

  <!-- Group 1: Q₀·X' (rows 01,11 col X=0) — green -->
  <rect x="162" y="95" width="86" height="76" rx="8" fill="none" stroke="#4CAF50" stroke-width="2.5"/>
  <text x="400" y="125" font-family="Segoe UI" font-size="11" font-weight="700" fill="#4CAF50">Q₀ · X'</text>
  <line x1="251" y1="130" x2="392" y2="125" stroke="#4CAF50" stroke-width="1" stroke-dasharray="4,3"/>

  <!-- Group 2: Q₁·Q₀'·X (row 10, col X=1) — blue -->
  <rect x="252" y="175" width="86" height="36" rx="8" fill="none" stroke="#1565C0" stroke-width="2.5"/>
  <text x="400" y="198" font-family="Segoe UI" font-size="11" font-weight="700" fill="#1565C0">Q₁ · Q₀' · X</text>
  <line x1="341" y1="193" x2="392" y2="196" stroke="#1565C0" stroke-width="1" stroke-dasharray="4,3"/>
</svg>
</div>

Two groups emerge from the K-map:

- **Green group** (rows 01 and 11, column $X = 0$): The common variables are $Q_0 = 1$ and $X = 0$, giving the term $Q_0 \cdot X'$
- **Blue group** (row 10, column $X = 1$): This isolated cell gives $Q_1 \cdot Q_0' \cdot X$

Combining both groups with OR:

$D_1 = Q_0 X' + Q_1 Q_0' X$

**For $D_0 = Q_0^+$:**

Constructing the K-map for $D_0$ reveals that $Q_0^+ = 1$ whenever $X = 1$, regardless of the current state. Therefore:

$D_0 = X$

**For output $Z$:**

Since this is a Moore machine, $Z$ depends only on the state. From the transition table, $Z = 1$ only when $Q_1 = 1$ and $Q_0 = 1$ (state $S_3$):

$Z = Q_1 Q_0$

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">Step 7: Verification</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

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

</div>

<h4 style="color: #5A3EED; font-weight: 700;">Diagram: "101" Sequence Detector — State Diagram</h4>

<div style="background: #F8F6FF; border: 2px solid #D4C8FF; border-radius: 12px; padding: 20px 24px; margin: 1rem 0;" markdown>

The Moore state diagram for the "101" sequence detector with overlapping detection. Each state shows its output value, and transitions are labeled with the input bit.

```mermaid
stateDiagram-v2
    direction LR
    state "S0 — Idle\nZ = 0" as S0
    state "S1 — Got '1'\nZ = 0" as S1
    state "S2 — Got '10'\nZ = 0" as S2
    state "S3 — Got '101'\nZ = 1" as S3

    [*] --> S0
    S0 --> S0 : 0
    S0 --> S1 : 1
    S1 --> S1 : 1
    S1 --> S2 : 0
    S2 --> S0 : 0
    S2 --> S3 : 1
    S3 --> S2 : 0
    S3 --> S1 : 1
```

</div>

<h4 style="color: #5A3EED; font-weight: 700;">Diagram: "101" Sequence Detector — Hardware Circuit</h4>

<div style="background: #F8F6FF; border: 2px solid #D4C8FF; border-radius: 12px; padding: 20px 24px; margin: 1rem 0;" markdown>

The complete hardware implementation using D flip-flops with the derived equations: $D_1 = Q_0 X' + Q_1 Q_0' X$, $D_0 = X$, and $Z = Q_1 Q_0$.

<div style="text-align: center; margin: 1.5rem 0;">
<svg viewBox="0 0 700 370" style="max-width: 680px; width: 100%;" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      .sd-block { rx: 6; ry: 6; stroke-width: 2; }
      .sd-label { font-family: 'Segoe UI', Arial, sans-serif; font-weight: 700; }
      .sd-sig   { font-family: 'Courier New', monospace; font-size: 12px; font-weight: 700; }
      .sd-wire  { stroke: #455A64; stroke-width: 2; fill: none; }
      .sd-eq    { font-family: 'Courier New', monospace; font-size: 11px; fill: #333; }
    </style>
  </defs>
  <rect x="0" y="0" width="700" height="370" rx="12" fill="#FAFBFF" stroke="#E0E0E0" stroke-width="1"/>

  <!-- Title -->
  <text x="350" y="22" text-anchor="middle" font-family="Segoe UI, Arial" font-size="14" font-weight="700" fill="#5A3EED">"101" Sequence Detector — Moore FSM Circuit</text>

  <!-- Input X -->
  <text x="12" y="140" class="sd-sig" fill="#1565C0">X</text>
  <line x1="28" y1="136" x2="80" y2="136" class="sd-wire"/>
  <circle cx="60" cy="136" r="3" fill="#455A64"/>

  <!-- Next-State Logic Block -->
  <rect x="85" y="55" width="180" height="170" class="sd-block" fill="#D6EAF8" stroke="#2980B9"/>
  <text x="175" y="78" text-anchor="middle" class="sd-label" font-size="13" fill="#2980B9">Next-State Logic</text>

  <!-- Equations inside the block -->
  <text x="100" y="105" class="sd-eq" fill="#2980B9">D₁ = Q₀·X' + Q₁·Q₀'·X</text>
  <text x="100" y="130" class="sd-eq" fill="#2980B9">D₀ = X</text>

  <!-- Gate symbols (simplified) -->
  <rect x="100" y="145" width="50" height="22" rx="4" fill="#E8F5E9" stroke="#4CAF50" stroke-width="1.5"/>
  <text x="125" y="160" text-anchor="middle" font-family="Segoe UI" font-size="9" font-weight="600" fill="#388E3C">AND/OR</text>

  <rect x="165" y="145" width="40" height="22" rx="4" fill="#FFF3E0" stroke="#E67E22" stroke-width="1.5"/>
  <text x="185" y="160" text-anchor="middle" font-family="Segoe UI" font-size="9" font-weight="600" fill="#E67E22">NOT</text>

  <!-- Inputs to NSL -->
  <line x1="60" y1="136" x2="60" y2="110" class="sd-wire"/>
  <line x1="60" y1="110" x2="85" y2="110" class="sd-wire"/>
  <polygon points="81,106 89,110 81,114" fill="#455A64"/>

  <!-- D₁ output -->
  <line x1="265" y1="100" x2="340" y2="100" class="sd-wire"/>
  <polygon points="336,96 344,100 336,104" fill="#455A64"/>
  <text x="295" y="93" class="sd-sig" fill="#333">D₁</text>

  <!-- D₀ output -->
  <line x1="265" y1="195" x2="340" y2="195" class="sd-wire"/>
  <polygon points="336,191 344,195 336,199" fill="#455A64"/>
  <text x="295" y="188" class="sd-sig" fill="#333">D₀</text>

  <!-- D Flip-Flop 1 -->
  <rect x="345" y="70" width="95" height="65" class="sd-block" fill="#E8DAEF" stroke="#7D3C98"/>
  <text x="392" y="97" text-anchor="middle" class="sd-label" font-size="12" fill="#7D3C98">D FF₁</text>
  <text x="355" y="88" font-family="Courier New" font-size="10" fill="#7D3C98">D</text>
  <text x="425" y="88" font-family="Courier New" font-size="10" fill="#7D3C98">Q</text>
  <polygon points="345,122 355,117 345,112" fill="#F1C40F" stroke="#F1C40F" stroke-width="1"/>

  <!-- D Flip-Flop 0 -->
  <rect x="345" y="168" width="95" height="65" class="sd-block" fill="#E8DAEF" stroke="#7D3C98"/>
  <text x="392" y="195" text-anchor="middle" class="sd-label" font-size="12" fill="#7D3C98">D FF₀</text>
  <text x="355" y="186" font-family="Courier New" font-size="10" fill="#7D3C98">D</text>
  <text x="425" y="186" font-family="Courier New" font-size="10" fill="#7D3C98">Q</text>
  <polygon points="345,220 355,215 345,210" fill="#F1C40F" stroke="#F1C40F" stroke-width="1"/>

  <!-- Clock -->
  <text x="300" y="295" class="sd-sig" fill="#F1C40F">CLK ↑</text>
  <line x1="392" y1="283" x2="392" y2="233" class="sd-wire" stroke="#F1C40F"/>
  <line x1="392" y1="168" x2="392" y2="135" class="sd-wire" stroke="#F1C40F"/>
  <circle cx="392" cy="283" r="3" fill="#F1C40F"/>

  <!-- Q₁ output -->
  <line x1="440" y1="100" x2="510" y2="100" class="sd-wire"/>
  <text x="463" y="93" class="sd-sig" fill="#333">Q₁</text>
  <circle cx="490" cy="100" r="3" fill="#455A64"/>

  <!-- Q₀ output -->
  <line x1="440" y1="195" x2="510" y2="195" class="sd-wire"/>
  <text x="463" y="188" class="sd-sig" fill="#333">Q₀</text>
  <circle cx="490" cy="195" r="3" fill="#455A64"/>

  <!-- Output Logic: AND gate for Z = Q₁·Q₀ -->
  <rect x="530" y="120" width="70" height="50" class="sd-block" fill="#FDEBD0" stroke="#E67E22"/>
  <text x="565" y="142" text-anchor="middle" class="sd-label" font-size="11" fill="#E67E22">AND</text>
  <text x="565" y="158" text-anchor="middle" font-family="Segoe UI" font-size="9" fill="#E67E22">Z = Q₁·Q₀</text>

  <!-- Q₁ to AND -->
  <line x1="510" y1="100" x2="510" y2="135" class="sd-wire"/>
  <line x1="510" y1="135" x2="530" y2="135" class="sd-wire"/>
  <polygon points="526,131 534,135 526,139" fill="#455A64"/>

  <!-- Q₀ to AND -->
  <line x1="510" y1="195" x2="510" y2="155" class="sd-wire"/>
  <line x1="510" y1="155" x2="530" y2="155" class="sd-wire"/>
  <polygon points="526,151 534,155 526,159" fill="#455A64"/>

  <!-- Z output -->
  <line x1="600" y1="145" x2="665" y2="145" class="sd-wire" stroke="#E67E22" stroke-width="2.5"/>
  <text x="670" y="149" class="sd-sig" fill="#E67E22">Z</text>

  <!-- Feedback paths -->
  <line x1="490" y1="100" x2="490" y2="330" stroke="#E53935" stroke-width="2" stroke-dasharray="6,3" fill="none"/>
  <line x1="490" y1="330" x2="50" y2="330" stroke="#E53935" stroke-width="2" stroke-dasharray="6,3" fill="none"/>
  <line x1="50" y1="330" x2="50" y2="180" stroke="#E53935" stroke-width="2" stroke-dasharray="6,3" fill="none"/>
  <line x1="50" y1="180" x2="85" y2="180" stroke="#E53935" stroke-width="2" stroke-dasharray="6,3" fill="none"/>
  <polygon points="81,176 89,180 81,184" fill="#E53935"/>

  <line x1="490" y1="195" x2="490" y2="345" stroke="#E53935" stroke-width="2" stroke-dasharray="6,3" fill="none"/>
  <line x1="490" y1="345" x2="40" y2="345" stroke="#E53935" stroke-width="2" stroke-dasharray="6,3" fill="none"/>
  <line x1="40" y1="345" x2="40" y2="200" stroke="#E53935" stroke-width="2" stroke-dasharray="6,3" fill="none"/>
  <line x1="40" y1="200" x2="85" y2="200" stroke="#E53935" stroke-width="2" stroke-dasharray="6,3" fill="none"/>
  <polygon points="81,196 89,200 81,204" fill="#E53935"/>

  <text x="260" y="348" text-anchor="middle" font-family="Segoe UI" font-size="10" font-weight="600" fill="#E53935">State Feedback (Q₁, Q₀ → Next-State Logic)</text>
</svg>
</div>

The circuit uses two D flip-flops for the two state bits, combinational logic (AND, OR, NOT gates) to implement $D_1 = Q_0 X' + Q_1 Q_0' X$, a direct connection for $D_0 = X$, and a single AND gate for the output $Z = Q_1 Q_0$. The red dashed feedback paths carry the current state back to the next-state logic, completing the sequential loop.

</div>

<h4 style="color: #5A3EED; font-weight: 600;">MicroSim: Sequence Detector Demo</h4>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../sims/sequence-detector-demo/main.html" width="100%" height="550px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

<h4 style="color: #5A3EED; font-weight: 600;">Diagram: Sequence Detector Interactive State Machine</h4>

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">10.21 State Minimization</h2>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

**State minimization** reduces the number of states in an FSM while preserving identical input-output behavior. Fewer states means fewer flip-flops and potentially simpler next-state logic.

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">10.21.1 Equivalent States</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

Two states $S_i$ and $S_j$ are **equivalent** if and only if:

1. They produce the same output (for Moore machines: same output value; for Mealy machines: same output for every input)
2. For every possible input, their next states are also equivalent

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">10.21.2 Implication Table Method</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

The implication table is a systematic technique for identifying equivalent states:

1. Create a triangular table with all state pairs
2. Mark pairs with different outputs as **non-equivalent** (X)
3. For remaining pairs, list the implied state pairs that must also be equivalent
4. Iteratively mark pairs as non-equivalent if any of their implied pairs are non-equivalent
5. Repeat until no more changes occur
6. Unmarked pairs are equivalent and can be merged

</div>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">10.21.3 Example</h3>

<div markdown style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

Consider an FSM with 4 states where analysis reveals that $S_1$ and $S_3$ are equivalent (same outputs and their next states are also equivalent for all inputs). Merging them reduces the FSM from 4 states to 3 states, potentially reducing from 2 flip-flops to 2 flip-flops (same for binary encoding of 3 or 4 states) but simplifying the next-state logic.

</div>

!!! note "When Minimization Matters"
    State minimization is most impactful when the initial FSM has many states derived from an informal specification. For small FSMs designed carefully from the start, minimization often finds no equivalent states. However, it remains an important verification step to confirm that the design is already minimal.

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">10.22 Summary and Key Takeaways</h2>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 20px 24px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

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

</div>

??? question "Self-Check: Why do synchronous counters have a higher maximum clock frequency than ripple (asynchronous) counters?"
    In a ripple counter, each flip-flop is clocked by the output of the previous flip-flop, so delays **accumulate** through the chain. For an $n$-bit ripple counter, the total propagation delay is $n \times t_{cq}$. In a synchronous counter, all flip-flops share the same clock signal, so they all toggle simultaneously. The maximum delay is just one flip-flop's $t_{cq}$ plus the combinational logic delay for the toggle conditions, regardless of the counter width.

??? question "Self-Check: What is the key difference between a Moore machine and a Mealy machine, and when might you prefer one over the other?"
    In a **Moore machine**, outputs depend only on the current state, so they change synchronously with state transitions and are always stable between clock edges. In a **Mealy machine**, outputs depend on both the current state and inputs, allowing faster response (outputs can change as soon as inputs change, without waiting for a clock edge). Prefer Moore when output glitch-free stability matters (e.g., driving other synchronous logic). Prefer Mealy when you need fewer states or faster reaction to input changes.

??? question "Self-Check: A Johnson counter with 4 flip-flops produces how many valid states, and why is this different from a ring counter with the same number of flip-flops?"
    A Johnson counter with $n$ flip-flops produces $2n = 8$ valid states, while a ring counter produces only $n = 4$ states. The Johnson counter feeds back the **complement** of the last flip-flop to the first, creating a sequence where 1s gradually fill the register and then 0s gradually fill it back. This doubles the count length compared to a ring counter, which simply circulates a single 1-bit through the register. The trade-off is that Johnson counter state decoding requires 2-input AND gates, while ring counter states are inherently one-hot (no decoding needed).

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">Interactive Walkthrough</h2>

Step through a 4-bit shift register loading serial data one bit at a time:

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../sims/shift-register-walkthrough/main.html" width="100%" height="580px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

---

[Take the Unit Quiz](./quiz.md) | [See Annotated References](./references.md)

</div>
