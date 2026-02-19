---
title: System Integration and Design Projects
description: Top-down design methodology, testbench verification, timing analysis, and capstone digital system projects
generated_by: claude skill generate-chapter-content
date: 2026-02-10 14:00:00
version: 0.03
---

# Unit 13: System Integration and Design Projects

<details class="video-overview">
<summary><strong>Unit Overview</strong> (click to expand)</summary>

Welcome to Unit 13, the capstone of this course. Everything you have learned — from Boolean algebra and logic gates through sequential design, programmable devices, and VHDL — comes together here as we tackle complete system integration and real design projects.

The starting point is top-down design methodology. Instead of jumping straight to gates and flip-flops, you begin with a high-level block diagram, then progressively refine each block until you reach the implementation level. A critical part is the separation of a design into a datapath and a control unit. The datapath contains registers, arithmetic units, and buses that process data. The control unit is a finite state machine that generates the signals telling the datapath what to do and when.

Once your design is described in VHDL, verification becomes paramount. You will write testbenches that systematically exercise your design. Static timing analysis helps you identify the critical path — the longest delay path — which determines the maximum operating frequency.

Real-world design always involves trade-offs. Making a circuit faster often requires more area or consumes more power. These trade-offs determine whether your product meets its battery life target, fits in its package, or stays within budget.

To make all of this concrete, we work through several real-world examples, including a digital combination lock, an arithmetic logic unit, a UART serial communication controller, and a vending machine controller.

**Key Takeaways**

1. Top-down design methodology and the separation of datapath from control unit are the standard approaches for managing complexity in real digital systems.
2. Verification through testbenches and static timing analysis of the critical path are essential steps that ensure a design is both functionally correct and fast enough.
3. Real-world digital design requires navigating trade-offs among speed, area, and power, and capstone projects bring all course concepts together into practical, complete systems.

</details>

## Summary

This capstone unit brings together every concept from the course—number systems, Boolean algebra, combinational logic, sequential circuits, programmable devices, and VHDL—into complete, integrated digital system designs. Students will learn the top-down design methodology for managing complexity, master systematic verification techniques including testbench design and timing analysis, and apply their skills to realistic design projects. The unit emphasizes the engineering judgment needed to make design trade-offs (speed vs area vs power), partition systems into manageable subsystems, and verify that all parts work together correctly. By completing this unit, students will have the skills to design, describe, simulate, and implement non-trivial digital systems on programmable logic devices.

## Concepts Covered

1. Top-Down Design Methodology
2. Design Hierarchy and Modularity
3. System Partitioning
4. Interface Specification
5. Datapath and Control Unit Separation
6. Datapath Design
7. Control Unit Design
8. Datapath-Controller Integration
9. Design Documentation
10. Verification Planning
11. Functional Verification
12. Testbench Architecture
13. Self-Checking Testbenches
14. Test Vector Generation
15. Code Coverage Concepts
16. Static Timing Analysis
17. Critical Path Identification
18. Setup and Hold Time Budgeting
19. Clock Frequency Determination
20. Pipelining for Performance
21. Design Trade-offs: Area vs Speed vs Power
22. Resource Sharing and Scheduling
23. Design for Testability
24. System-Level Example: Digital Lock
25. System-Level Example: ALU Design
26. System-Level Example: Serial Communication
27. System-Level Example: Vending Machine Controller
28. Design Review and Optimization
29. From Specification to Silicon
30. Career Paths in Digital Design

## Prerequisites

Before studying this unit, students should be familiar with:

- All combinational logic concepts (Units 2-8)
- Sequential circuit design: flip-flops, registers, counters, FSMs (Units 9-10)
- Programmable logic devices, especially FPGAs (Unit 11)
- VHDL fundamentals: entities, architectures, processes, testbenches (Unit 12)

---

## 13.1 The Need for System-Level Design

The circuits designed in prior units—adders, decoders, counters, state machines—are building blocks. Real digital systems combine dozens or hundreds of these blocks into coordinated, multi-component designs. A simple embedded controller might include:

- An arithmetic logic unit (ALU) for computation
- Registers for data storage
- A finite state machine for control sequencing
- Multiplexers for data routing
- I/O interfaces for communication

Designing such a system by immediately writing Boolean equations or drawing gate-level schematics would be overwhelming. Instead, engineers use a **top-down design methodology** that manages complexity by working from abstract specifications down to detailed implementations.

| Design Level | Description | Tools |
|-------------|-------------|-------|
| System specification | What the system must do (requirements) | Natural language, timing diagrams |
| Architectural design | How subsystems are organized | Block diagrams, dataflow diagrams |
| Register-Transfer Level (RTL) | How data moves between registers each clock cycle | VHDL/Verilog, state diagrams |
| Gate level | Which gates implement each function | Synthesis output, netlists |
| Physical level | Where gates are placed and routed | FPGA implementation tools |

---

## 13.2 Top-Down Design Methodology

The top-down approach decomposes a complex problem into progressively smaller, more manageable pieces:

**Step 1: Specification.** Define what the system must do—inputs, outputs, timing requirements, performance targets, constraints. A clear specification is the foundation; ambiguity here causes errors that propagate through the entire design.

**Step 2: Architecture.** Partition the system into major subsystems and define how they communicate. Identify the **datapath** (the components that process data) and the **control unit** (the FSM that sequences operations).

**Step 3: Detailed design.** Design each subsystem individually, using the techniques from prior units. Describe each in VHDL at the RTL level.

**Step 4: Integration.** Connect subsystems using structural VHDL (component instantiation). Verify interfaces match.

**Step 5: Verification.** Simulate the integrated design with comprehensive testbenches. Verify timing constraints.

**Step 6: Implementation.** Synthesize, place, route, and program onto the target FPGA. Verify in hardware.

#### Diagram: Top-Down Design Flow

<iframe src="../sims/top-down-design-flow/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Top-Down Design Flow</summary>
Type: workflow

Bloom Level: Understand (L2)
Bloom Verb: Describe, summarize

Learning Objective: Describe the six steps of the top-down design methodology and how each step feeds into the next, understanding that verification occurs at every level—not just at the end.

Process steps (vertical flow with verification feedback):
1. "System Specification" - icon: document
   Hover text: "Define inputs, outputs, timing, and performance requirements"
   Verification: "Requirements review"

2. "Architectural Design" - icon: block diagram
   Hover text: "Partition into datapath and control; define subsystem interfaces"
   Verification: "Architecture review"

3. "Detailed RTL Design" - icon: VHDL code
   Hover text: "Design each subsystem in VHDL; unit-level simulation"
   Verification: "Unit testbenches"

4. "System Integration" - icon: connected blocks
   Hover text: "Connect subsystems via structural VHDL; integration testing"
   Verification: "Integration testbench"

5. "Synthesis & Implementation" - icon: FPGA chip
   Hover text: "Synthesize, place, route; timing analysis"
   Verification: "Timing closure, hardware test"

6. "Hardware Verification" - icon: oscilloscope
   Hover text: "Test on actual FPGA with real signals"
   Verification: "System acceptance test"

Feedback arrows:
- From each verification step back to the corresponding design step labeled "Fix issues"
- Major feedback arrow from hardware verification back to specification labeled "Requirements change"

Visual style: Vertical flowchart with parallel verification track
Color scheme: Design steps in blue, verification steps in green, feedback arrows in red
Canvas size: 800x550px, responsive

Implementation: HTML/CSS/JavaScript with SVG
</details>

---

## 13.3 Design Hierarchy and Modularity

Hierarchy is the primary tool for managing complexity. A hierarchical design consists of modules at multiple levels, where each module:

- Has a **well-defined interface** (entity in VHDL)
- Performs a **single, clear function**
- Can be **designed and tested independently**
- Can be **reused** in other designs

### Example: Hierarchical ALU Design

<iframe src="../sims/hierarchical-alu-design/main.html" height="580px" width="100%" scrolling="no" style="border:1px solid #ddd; border-radius:8px;"></iframe>

*Click any module to select it, expand/collapse children, and view details in the side panel.*

Each leaf module is simple enough to design with the techniques from prior units. Integration assembles them structurally.

!!! tip "Module Size Rule of Thumb"
    Each module should be small enough to understand at a glance—typically 50-200 lines of VHDL. If a module grows larger, it probably should be split into sub-modules. Conversely, modules that are too small (a single gate) add unnecessary hierarchy.

---

## 13.4 Datapath and Control Unit Separation

Most digital systems can be decomposed into two complementary parts:

**Datapath:** The components that store, transport, and transform data. This includes registers, ALUs, multiplexers, shifters, and buses. The datapath performs the "work" of the system.

**Control Unit:** A finite state machine (or set of FSMs) that generates the control signals directing the datapath. The control unit determines **when** and **how** data moves through the datapath, based on the current state and input conditions.

This separation is powerful because:

- The datapath can be designed using combinational and sequential building blocks from Units 3-10
- The control unit is a standard FSM design problem from Unit 10
- Changes to the control sequence do not require redesigning the datapath hardware
- The same datapath can be reused with different control units for different operations

#### Diagram: Datapath-Controller Architecture

<iframe src="../sims/datapath-controller/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Datapath-Controller Architecture</summary>
Type: microsim

Bloom Level: Analyze (L4)
Bloom Verb: Examine, differentiate

Learning Objective: Examine the interaction between datapath and control unit in a digital system, differentiating the roles of each by tracing how control signals from the FSM direct data movement through registers, ALU, and multiplexers.

Visual elements:
- Top section: Control Unit FSM (state diagram with 4-5 states)
- Bottom section: Datapath showing registers, ALU, MUX, and buses
- Connecting lines: Control signals flowing from FSM to datapath components (MUX select, register load enable, ALU operation)
- Status signals flowing from datapath back to FSM (zero flag, carry flag)

Interactive controls:
- "Clock" button to advance one cycle
- Current state highlighted in FSM diagram
- Active control signals highlighted on connecting lines
- Data values visible in registers and on buses
- Operation selector to choose different instruction sequences

Data Visibility Requirements:
Stage 1: Show FSM in initial state, all control signals inactive
Stage 2: After clock pulse, show FSM transition and new control signals
Stage 3: Show data flowing through the enabled path in the datapath
Stage 4: Show result stored in destination register, status flags updated
Stage 5: Show status flags feeding back to FSM for conditional transitions

Instructional Rationale: Stepping through clock cycles and watching control signals activate specific datapath paths builds concrete understanding of the abstract datapath-controller separation. Students see that the FSM orchestrates the same hardware to perform different operations on different cycles.

Color scheme: Control signals in red, data paths in blue, active components in gold, inactive in gray
Canvas size: 800x550px, responsive

Implementation: p5.js
</details>

---

## 13.5 Interface Specification

When multiple engineers (or multiple modules) must connect, **interface specifications** prevent integration errors. An interface specification for each module boundary includes:

- **Port names and types** (the VHDL entity)
- **Timing relationships** (when signals are valid relative to the clock)
- **Protocol** (handshake signals, ready/valid, request/acknowledge)
- **Data encoding** (unsigned, signed, BCD, one-hot)
- **Reset behavior** (what state does the module enter on reset?)

A simple but effective interface pattern is the **ready/valid handshake:**

```
Producer asserts 'valid' when data is available
Consumer asserts 'ready' when it can accept data
Data transfers only when BOTH valid AND ready are HIGH
```

This pattern decouples the timing of producer and consumer, preventing data loss or duplication.

---

## 13.6 Verification Planning

Professional digital design devotes **more effort to verification than to design itself**—typically a 60/40 or even 70/30 split. A verification plan defines:

- **What to test:** Every input combination? Every state transition? Every boundary condition?
- **How to test:** Manual stimulus? Random stimulus? Formal verification?
- **Pass/fail criteria:** How does the testbench determine correctness automatically?
- **Coverage goals:** What percentage of code, states, and transitions must be exercised?

For the designs in this course, verification focuses on:

1. **Functional correctness:** Does the design produce correct outputs for all relevant inputs?
2. **Timing correctness:** Does the design meet setup and hold time requirements at the target clock frequency?
3. **Reset behavior:** Does the design initialize correctly?
4. **Edge cases:** Does the design handle boundary conditions (overflow, maximum count, all-zeros, all-ones)?

---

## 13.7 Testbench Architecture

Unit 12 introduced basic testbenches. For system-level verification, testbenches become more sophisticated:

### Self-Checking Testbench

A **self-checking testbench** automatically compares the DUT's outputs against expected values, reporting errors without requiring manual waveform inspection:

```vhdl
-- Self-checking testbench for 4-bit adder
verify: process
begin
    -- Test case 1: 3 + 5 = 8
    a_tb <= "0011"; b_tb <= "0101"; cin_tb <= '0';
    wait for 10 ns;
    assert (sum_tb = "1000" and cout_tb = '0')
        report "FAIL: 3 + 5 should equal 8"
        severity error;

    -- Test case 2: 15 + 1 = 0 with carry
    a_tb <= "1111"; b_tb <= "0001"; cin_tb <= '0';
    wait for 10 ns;
    assert (sum_tb = "0000" and cout_tb = '1')
        report "FAIL: 15 + 1 should produce carry"
        severity error;

    -- More test cases...
    report "All tests passed!" severity note;
    wait;
end process verify;
```

The `assert` statement checks a condition. When the condition is FALSE, it prints the message and raises the specified severity level. This automates the tedious process of manually checking waveforms.

### Testbench with File I/O

For designs with many test vectors, reading stimulus from a file is more practical than hardcoding values:

```vhdl
-- Read test vectors from file
file_reader: process
    file test_file : text open read_mode is "test_vectors.txt";
    variable line_v : line;
    variable a_v, b_v, expected_v : std_logic_vector(3 downto 0);
begin
    while not endfile(test_file) loop
        readline(test_file, line_v);
        read(line_v, a_v); read(line_v, b_v); read(line_v, expected_v);
        a_tb <= a_v; b_tb <= b_v;
        wait for 10 ns;
        assert (result_tb = expected_v)
            report "FAIL at inputs: " & to_string(a_v) & ", " & to_string(b_v)
            severity error;
    end loop;
    wait;
end process file_reader;
```

---

## 13.8 Static Timing Analysis

After synthesis and place-and-route, the FPGA tools perform **static timing analysis (STA)** to verify that the design operates correctly at the target clock frequency.

### The Timing Model

Every signal path from a flip-flop output through combinational logic to the next flip-flop input must satisfy:

$$T_{clk} \geq T_{cq} + T_{comb} + T_{setup}$$

Where:

- $T_{clk}$ = clock period
- $T_{cq}$ = clock-to-Q delay of the source flip-flop (from Unit 9)
- $T_{comb}$ = worst-case propagation delay through combinational logic
- $T_{setup}$ = setup time of the destination flip-flop

The **critical path** is the path with the largest $T_{cq} + T_{comb} + T_{setup}$. It determines the **maximum clock frequency** the design can achieve:

$$f_{max} = \frac{1}{T_{cq} + T_{comb,max} + T_{setup}}$$

### Hold Time Check

Additionally, every path must satisfy the hold time requirement:

$$T_{cq} + T_{comb,min} \geq T_{hold}$$

This ensures that data doesn't change too quickly after the clock edge. Hold time violations are independent of clock frequency and must be fixed by adding delay to the path.

#### Diagram: Timing Analysis Visualizer

<iframe src="../sims/timing-analysis-visualizer/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Timing Analysis Visualizer</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: Calculate, demonstrate

Learning Objective: Calculate the maximum clock frequency of a synchronous circuit by identifying the critical path and applying the timing constraint equation, then demonstrate how adding pipeline stages improves achievable frequency.

Visual elements:
- Circuit diagram showing 2-3 flip-flops with combinational logic blocks between them
- Each combinational block labeled with its propagation delay
- Timing waveforms showing clock, data at FF inputs, and setup/hold windows
- Critical path highlighted in red

Interactive controls:
- Sliders for: T_cq (2-10 ns), T_setup (1-5 ns), T_hold (0.5-3 ns)
- Sliders for combinational delay of each path segment
- Display: calculated f_max, setup slack, hold slack
- Toggle: "Add pipeline register" to split the critical path
- Timing diagram updates in real-time as parameters change

Data Visibility Requirements:
- Show the timing equation with current values substituted
- Show setup slack = T_clk - (T_cq + T_comb + T_setup)
- Show hold slack = T_cq + T_comb_min - T_hold
- Highlight violation (red) or pass (green)

Instructional Rationale: Interactive parameter exploration with real-time timing calculations helps students build intuition about the relationship between path delay, clock frequency, and timing margins—critical skills for FPGA implementation.

Color scheme: Critical path in red, slack-positive paths in green, timing windows in blue shading
Canvas size: 800x500px, responsive

Implementation: p5.js
</details>

---

## 13.9 Pipelining for Performance

When the critical path limits clock frequency to an unacceptable level, **pipelining** breaks the critical path by inserting registers at intermediate points. This trades **latency** (more clock cycles to complete one operation) for **throughput** (higher clock frequency, more operations per second).

**Without pipelining:**

- Critical path delay: $T_{comb} = 20$ ns
- With $T_{cq} = 2$ ns, $T_{setup} = 1$ ns
- $f_{max} = 1/(2 + 20 + 1) = 43.5$ MHz
- Throughput: 43.5 million operations/second

**With one pipeline stage (splitting the combinational logic in half):**

- Each stage: $T_{comb} = 10$ ns
- $f_{max} = 1/(2 + 10 + 1) = 76.9$ MHz
- Latency: 2 clock cycles per result
- Throughput: 76.9 million operations/second (1.77x improvement)

The pipeline stage adds one clock cycle of delay but nearly doubles the throughput. This is the same principle used in modern processors, which may have 10-20+ pipeline stages.

!!! note "Pipeline Design Considerations"
    Pipelining is not free. It adds flip-flops (area and power), increases latency, and requires all parallel data paths to be pipelined to the same depth to maintain synchronization. The designer must weigh these costs against the frequency improvement.

---

## 13.10 Design Trade-offs

Every design decision involves trade-offs among three fundamental metrics:

- **Area** (resource usage): How many LUTs, flip-flops, and routing resources does the design consume?
- **Speed** (clock frequency): How fast can the design operate?
- **Power** (energy consumption): How much power does the design dissipate?

These metrics are interrelated:

| Optimization | Effect on Area | Effect on Speed | Effect on Power |
|-------------|---------------|----------------|----------------|
| Pipelining | Increases (more FFs) | Increases (shorter critical path) | Increases (more switching) |
| Resource sharing | Decreases (fewer units) | Decreases (MUX overhead) | Mixed |
| Parallel execution | Increases (duplicated units) | Increases (more work per cycle) | Increases |
| Logic minimization | Decreases (fewer gates) | Increases (shorter paths) | Decreases |
| Clock gating | No change | No change | Decreases |

### Resource Sharing

**Resource sharing** reuses a single hardware unit for multiple operations by time-multiplexing it with a control FSM and multiplexers:

Instead of using two separate adders for $R = A + B$ and $S = C + D$, use one adder with a MUX:

```
Cycle 1: MUX selects A,B → Adder → Store in R
Cycle 2: MUX selects C,D → Adder → Store in S
```

This halves the adder count but doubles the execution time and adds MUX area. Resource sharing is valuable when area is constrained and the operations don't need to happen simultaneously.

---

## 13.11 System-Level Example: Digital Combination Lock

This example integrates concepts from across the course into a complete system.

**Specification:**

- 4-digit combination lock (each digit 0-9)
- Input: 4-bit BCD digit, "Enter" button, "Reset" button
- Output: "Unlock" signal, 2-digit display showing entry progress
- The correct combination is hardcoded (e.g., 3-7-1-9)
- Lock allows 3 attempts before a 30-second lockout

### Architecture

The digital combination lock employs a **datapath-controller** architecture. The controller — a five-state finite state machine (FSM) — orchestrates all sequencing decisions, while the datapath performs digit storage, comparison, and counting under the controller's direction. Four subsystems are organized in a pipeline from input conditioning through output indication.

#### Input Subsystem

The input subsystem conditions raw external signals into clean, synchronous events for the datapath and controller.

| Block | Type | Function |
|---|---|---|
| Debouncer | Sequential | Filters mechanical switch bounce using a shift-register majority detector |
| Edge Detector | Sequential | Converts the debounced Enter signal into a single-clock-cycle pulse (`enter_pulse`) |
| BCD Input Register | Sequential | 4-bit register; latches the current BCD digit when the controller asserts `load_digit` |

#### Datapath

The datapath contains both combinational comparison logic and sequential counters. The controller drives all counter enables and clears.

| Block | Type | Function |
|---|---|---|
| Combination ROM | Combinational | 4 &times; 4-bit look-up table storing the correct code; addressed by `digit_count` |
| BCD Comparator | Combinational | Produces `match = 1` when the input register equals the ROM output at the current address |
| Digit Counter | Sequential | 2-bit up-counter (0&ndash;3); incremented by `inc_digit_ctr`, cleared by `clr_digit_ctr` |
| Attempt Counter | Sequential | 2-bit up-counter (0&ndash;3); incremented by `inc_attempt`, cleared by `clr_attempt` |

#### Control Unit (FSM)

The controller is a Mealy/Moore hybrid FSM with five states. It reads status signals from the datapath and issues control signals in return.

**States:** &ensp; IDLE &rarr; WAIT_DIGIT &rarr; CHECK &rarr; UNLOCK &ensp;or&ensp; LOCKOUT

| Signal Direction | Signals |
|---|---|
| **Inputs** (from datapath/input) | `enter_pulse`, `match`, `digit_done` (digit counter = 3), `max_attempts` (attempt counter = 3), `timeout` |
| **Outputs** (to datapath/output) | `load_digit`, `inc_digit_ctr`, `clr_digit_ctr`, `inc_attempt`, `clr_attempt`, `start_timer`, `unlock_en`, `lockout_en` |

The FSM also contains a **Lockout Timer** — a sequential down-counter that generates `timeout` after 30 seconds, returning the system from LOCKOUT to IDLE.

#### Output Subsystem

| Block | Type | Function |
|---|---|---|
| Unlock Register | Sequential | SR latch; set by `unlock_en`, cleared on reset |
| Progress Display | Combinational | Decodes `digit_count` to show entered positions (e.g., "3 7 _ _") |
| Status LEDs | Combinational | Green = unlocked, Red = locked, Flashing Red = lockout active |

#### System Operation

On power-up the FSM enters IDLE and clears all counters. When the user presses a BCD digit and hits Enter, the edge detector produces `enter_pulse`, advancing the FSM to CHECK. The controller asserts `load_digit`, latching the digit into the input register. The comparator evaluates the latched digit against the ROM value at the address selected by the digit counter and drives `match` accordingly. On a match the FSM asserts `inc_digit_ctr` and returns to WAIT_DIGIT; once the digit counter reaches 3 (`digit_done`), the FSM transitions to UNLOCK and asserts `unlock_en`. On a mismatch the FSM asserts `inc_attempt` and `clr_digit_ctr`, restarting the sequence. If the attempt counter saturates (`max_attempts`), the FSM enters LOCKOUT, asserts `start_timer`, and waits for `timeout` before returning to IDLE.

#### Diagram: Digital Lock System Architecture

<iframe src="../sims/digital-lock-system/main.html" width="100%" height="600px" scrolling="no"></iframe>

<details markdown="1">
<summary>Digital Lock System Architecture</summary>
Type: microsim

Bloom Level: Create (L6)
Bloom Verb: Design, construct

Learning Objective: Design a complete digital combination lock system by integrating input debouncing, BCD comparison, FSM control, and output display—applying concepts from Units 1 (BCD), 8 (comparators, MUX), 10 (FSM, counters), and 12 (VHDL) in a unified design.

Visual elements:
- Block diagram showing all subsystems from the architecture above
- FSM state diagram for the control unit (5 states with transitions)
- Timing diagram showing a successful unlock sequence
- Active data path highlighted during simulation

Interactive controls:
- BCD digit input (buttons 0-9)
- "Enter" button to submit a digit
- "Reset" button to restart
- Clock speed control (slow for visualization, fast for real-time)
- Display showing: entered digits, current state, attempt count, lock status

Data Visibility Requirements:
Step 1: User presses digit → BCD value captured in input register
Step 2: Enter pressed → edge detector triggers control FSM
Step 3: FSM moves to CHECK state → comparator compares entered vs stored digit
Step 4: Match → digit counter increments, FSM returns to WAIT_DIGIT
Step 5: All 4 digits matched → FSM enters UNLOCK state
Step 6: Wrong digit → attempt counter increments, FSM resets to IDLE
Step 7: 3 failed attempts → FSM enters LOCKOUT, timer counts down

Instructional Rationale: A simulation of a complete system with interactive input allows students to see how individual components (registers, comparators, FSMs, counters) coordinate through control signals to accomplish a system-level task. This reinforces the datapath-controller architecture and demonstrates that real designs are compositions of the building blocks from prior units.

Color scheme: Input interface in green, datapath in blue, control unit in orange, output in purple
Canvas size: 800x600px, responsive

Implementation: p5.js
</details>

### VHDL Implementation (Simplified Control Unit)

```vhdl
type lock_state is (IDLE, WAIT_DIGIT, CHECK, UNLOCK, LOCKOUT);
signal state : lock_state;
signal digit_pos : unsigned(1 downto 0);    -- 0 to 3
signal attempts  : unsigned(1 downto 0);    -- 0 to 3
signal lockout_timer : unsigned(14 downto 0); -- counts to 30 sec

-- Control FSM
process(clk, rst)
begin
    if rst = '1' then
        state <= IDLE;
        digit_pos <= "00";
        attempts <= "00";
    elsif rising_edge(clk) then
        case state is
            when IDLE =>
                digit_pos <= "00";
                state <= WAIT_DIGIT;

            when WAIT_DIGIT =>
                if enter_edge = '1' then
                    state <= CHECK;
                end if;

            when CHECK =>
                if digit_match = '1' then
                    if digit_pos = 3 then
                        state <= UNLOCK;
                    else
                        digit_pos <= digit_pos + 1;
                        state <= WAIT_DIGIT;
                    end if;
                else
                    attempts <= attempts + 1;
                    if attempts = 2 then
                        state <= LOCKOUT;
                    else
                        state <= IDLE;
                    end if;
                end if;

            when UNLOCK =>
                unlock <= '1';
                if rst = '1' then
                    state <= IDLE;
                end if;

            when LOCKOUT =>
                if lockout_timer = 0 then
                    state <= IDLE;
                    attempts <= "00";
                end if;
        end case;
    end if;
end process;
```

---

## 13.12 System-Level Example: 8-Bit ALU

An **Arithmetic Logic Unit (ALU)** is the computational heart of any processor. This example designs an 8-bit ALU that performs the operations enabled by the circuits studied throughout the course.

### ALU Operations

| Operation Code | Operation | Unit Reference |
|---------------|-----------|---------------|
| 000 | Addition ($A + B$) | Unit 3 (Full Adder) |
| 001 | Subtraction ($A - B$) | Unit 3 (Adder-Subtractor) |
| 010 | Bitwise AND ($A \cdot B$) | Unit 2 (AND Gate) |
| 011 | Bitwise OR ($A + B$) | Unit 2 (OR Gate) |
| 100 | Bitwise XOR ($A \oplus B$) | Unit 2 (XOR Gate) |
| 101 | Bitwise NOT ($\bar{A}$) | Unit 2 (NOT Gate) |
| 110 | Shift Left ($A \ll 1$) | Unit 10 (Shift Register) |
| 111 | Shift Right ($A \gg 1$) | Unit 10 (Shift Register) |

### VHDL Implementation

```vhdl
library ieee;
use ieee.std_logic_1164.all;
use ieee.numeric_std.all;

entity alu8 is
    port (
        a, b   : in  std_logic_vector(7 downto 0);
        op     : in  std_logic_vector(2 downto 0);
        result : out std_logic_vector(7 downto 0);
        zero   : out std_logic;
        carry  : out std_logic;
        neg    : out std_logic
    );
end entity alu8;

architecture rtl of alu8 is
    signal temp : unsigned(8 downto 0);  -- 9 bits for carry
begin
    process(a, b, op)
    begin
        temp <= (others => '0');
        case op is
            when "000" =>  -- ADD
                temp <= ('0' & unsigned(a)) + ('0' & unsigned(b));
            when "001" =>  -- SUB
                temp <= ('0' & unsigned(a)) - ('0' & unsigned(b));
            when "010" =>  -- AND
                temp(7 downto 0) <= unsigned(a and b);
            when "011" =>  -- OR
                temp(7 downto 0) <= unsigned(a or b);
            when "100" =>  -- XOR
                temp(7 downto 0) <= unsigned(a xor b);
            when "101" =>  -- NOT
                temp(7 downto 0) <= unsigned(not a);
            when "110" =>  -- Shift Left
                temp(7 downto 0) <= unsigned(a(6 downto 0) & '0');
            when "111" =>  -- Shift Right
                temp(7 downto 0) <= unsigned('0' & a(7 downto 1));
            when others =>
                temp <= (others => '0');
        end case;
    end process;

    result <= std_logic_vector(temp(7 downto 0));
    carry  <= std_logic(temp(8));
    zero   <= '1' when temp(7 downto 0) = 0 else '0';
    neg    <= std_logic(temp(7));
end architecture rtl;
```

This ALU directly applies:

- Binary addition and subtraction (Unit 1, Unit 3)
- Boolean operations (Unit 2)
- Shift operations (Unit 10)
- Multiplexer-like selection via case statement (Unit 8)
- Status flag generation (Units 1, 3)

---

## 13.13 System-Level Example: UART Transmitter

A **Universal Asynchronous Receiver/Transmitter (UART)** is one of the most common serial communication interfaces. The transmitter converts parallel data into a serial bitstream:

**Protocol:**

- Idle state: line held HIGH
- Start bit: line goes LOW for one bit period
- Data bits: 8 bits transmitted LSB first
- Stop bit: line returns HIGH for one bit period

### Architecture

```
UART Transmitter
├── Baud Rate Generator (counter that divides clock to baud rate)
├── Shift Register (parallel-to-serial conversion)
├── Bit Counter (tracks which bit is being transmitted)
└── Control FSM (sequences: idle → start → data × 8 → stop → idle)
```

This design combines:

- Counter design (Unit 10) for baud rate generation
- Shift register (Unit 10) for parallel-to-serial conversion
- FSM (Unit 10) for transmission control
- All implemented in VHDL (Unit 12)

#### Diagram: UART Transmission Protocol and Architecture

<iframe src="../sims/uart-transmitter/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>UART Transmission Protocol and Architecture</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: Implement, practice

Learning Objective: Implement a UART transmitter by tracing the shift register, baud rate counter, and control FSM operation as they convert a parallel byte into a serial bitstream with start and stop bits.

Visual elements:
- Top: 8-bit parallel data register showing the byte to transmit
- Middle: Shift register showing serial output bit by bit
- Bottom: Serial waveform showing the transmitted signal over time
- Side: FSM state diagram (IDLE, START, DATA, STOP) with current state highlighted
- Baud rate counter display

Interactive controls:
- 8-bit input (switches or hex entry) for the data byte
- "Transmit" button to start transmission
- Baud rate selector (9600, 19200, 115200)
- Speed control: slow (see each bit), medium, fast
- Display: current state, bit counter, transmitted bits, serial line level

Data Visibility Requirements:
Step 1: Show parallel data loaded into shift register
Step 2: FSM enters START state → serial line goes LOW
Step 3: FSM enters DATA state → LSB shifted out, bit counter = 0
Step 4: Each baud period: next bit shifted out, counter increments
Step 5: After 8 data bits, FSM enters STOP → serial line goes HIGH
Step 6: FSM returns to IDLE

Instructional Rationale: Step-through visualization of UART transmission connects the abstract concepts of shift registers, counters, and FSMs to a widely-used real-world protocol, demonstrating how prior units' building blocks combine into a functional communication system.

Color scheme: Start bit in red, data bits in blue, stop bit in green, idle in gray
Canvas size: 800x550px, responsive

Implementation: p5.js
</details>

---

## 13.14 System-Level Example: Vending Machine Controller

A vending machine controller is a classic FSM design problem that exercises many concepts:

**Specification:**

- Accepts nickels (5¢), dimes (10¢), and quarters (25¢)
- Item costs 30¢
- Must make change if overpaid
- Two inputs: coin_type (2 bits), coin_inserted (pulse)
- Two outputs: dispense (pulse), change_amount (4 bits)

### State Diagram — Interactive Simulation

The FSM tracks the accumulated amount. Insert coins using the buttons below, then press **Step (Clock)** to advance the FSM one cycle at a time. Watch the state transitions, control signals, and datapath operations update in real time. When the total reaches or exceeds 30¢, the machine dispenses the item, outputs change, and returns to IDLE.

<iframe src="../sims/vending-machine-fsm/main.html" width="100%" height="1100px" scrolling="no" style="border:none;border-radius:8px;"></iframe>

This design applies:

- FSM design methodology (Unit 10)
- Binary arithmetic for change calculation (Unit 1)
- BCD representation for display (Unit 3)
- State encoding options: binary, one-hot (Unit 10)

---

## 13.15 Design for Testability

**Design for Testability (DFT)** adds features that make verification easier, both in simulation and in the final hardware:

- **Scan chains:** Convert flip-flops into a shift register chain for loading and observing internal state
- **Built-In Self-Test (BIST):** Include test pattern generators and response checkers on-chip
- **Observation points:** Bring internal signals to test pins or debug registers
- **Controllability:** Ensure every internal state can be forced to both 0 and 1 during testing

For FPGA designs, DFT includes:

- **ChipScope/SignalTap:** Vendor tools that embed logic analyzers inside the FPGA to observe internal signals in real-time
- **Debug ports:** Dedicated I/O pins that output key internal signals
- **Readable registers:** Allow a host processor to read FSM state, counter values, and status flags

!!! tip "Design for Debug"
    Add a status register that captures the FSM state, error flags, and counter values. This register can be read through a simple interface (SPI, JTAG, or dedicated pins) and dramatically speeds up debugging when the design doesn't work in hardware.

---

## 13.16 From Specification to Silicon

The complete journey from idea to working hardware follows a well-defined path. This table connects each phase to the units where the relevant skills were developed:

| Phase | Activity | Course Unit |
|-------|----------|-------------|
| Specification | Define inputs, outputs, behavior | All units (truth tables, state diagrams) |
| Number system selection | Choose binary, BCD, signed representation | Unit 1 |
| Boolean logic design | Derive equations, simplify | Units 2, 4, 5, 6 |
| Combinational module selection | Choose adders, MUX, decoders | Units 3, 7, 8 |
| Sequential design | Design registers, counters, FSMs | Units 9, 10 |
| Device selection | Choose CPLD or FPGA | Unit 11 |
| HDL coding | Write VHDL | Unit 12 |
| Verification | Write testbenches, simulate | Units 12, 13 |
| Implementation | Synthesize, place, route | Units 11, 13 |
| Hardware test | Program FPGA, test with real signals | Unit 13 |

#### Diagram: Course Concept Integration Map

<iframe src="../sims/course-integration-map/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Course Concept Integration Map</summary>
Type: graph-model

Bloom Level: Evaluate (L5)
Bloom Verb: Assess, justify

Learning Objective: Assess how concepts from all 13 units interconnect and contribute to a complete digital system design, justifying why each foundational topic is necessary for the system integration capstone.

Node types:
1. Unit nodes (13 circles, one per unit)
   - Properties: unit number, title, key concepts
   - Size proportional to number of concepts covered

2. Design phase nodes (10 rectangles, one per design phase)
   - Properties: phase name, description

Edge types:
1. "prerequisite" (solid arrows between unit nodes)
   - Shows which units depend on which
2. "applies to" (dashed arrows from units to design phases)
   - Shows which unit knowledge is used in which design phase
3. "feeds into" (bold arrows between design phases)
   - Shows the sequential design flow

Layout: Force-directed with units on left, design phases on right

Interactive elements:
- Click a unit node to highlight all design phases it contributes to
- Click a design phase to highlight all units that provide relevant skills
- Hover over edges for relationship descriptions
- Filter toggle: show/hide prerequisite edges, application edges

Color scheme: Units colored by domain (blue=combinational, purple=sequential, green=implementation), design phases in orange gradient
Canvas size: 800x550px, responsive

Implementation: vis-network
</details>

---

## 13.17 Career Paths in Digital Design

The skills developed in this course open doors to diverse engineering career paths:

- **Digital Design Engineer:** Designs ASICs and FPGAs for consumer electronics, telecommunications, and computing
- **Verification Engineer:** Develops testbenches, writes assertions, and performs formal verification—the most in-demand role in the semiconductor industry
- **FPGA Engineer:** Implements designs on FPGAs for defense, telecommunications, data centers, and embedded systems
- **Embedded Systems Engineer:** Combines digital hardware with software for IoT devices, automotive systems, and industrial control
- **Computer Architect:** Designs processors, memory systems, and interconnects—building on the ALU and FSM concepts from this course
- **Test Engineer:** Develops production test programs for manufactured chips, applying DFT concepts
- **Hardware Security Engineer:** Analyzes and protects digital designs against side-channel attacks and hardware trojans

Each path builds directly on the foundation established in this course: Boolean algebra for logic optimization, sequential design for state machines, VHDL for implementation, and verification for quality assurance.

---

## 13.18 Key Takeaways

- **Top-down design** manages complexity by decomposing systems into hierarchical, modular subsystems with well-defined interfaces.
- **Datapath-controller separation** divides a system into components that process data (registers, ALU, MUX) and a control FSM that sequences operations.
- **Verification** consumes more effort than design—self-checking testbenches, comprehensive test vectors, and timing analysis are essential for correct implementations.
- **Static timing analysis** determines maximum clock frequency by finding the critical path: $f_{max} = 1/(T_{cq} + T_{comb,max} + T_{setup})$.
- **Pipelining** increases throughput by inserting registers to break long combinational paths, trading latency for clock speed.
- **Design trade-offs** among area, speed, and power are fundamental to every design decision—there is no single "best" design, only the best design for given constraints.
- **Real digital systems**—locks, ALUs, UART transmitters, vending machines—are composed from the building blocks of prior units: gates, adders, MUXes, flip-flops, registers, counters, and FSMs.
- **Design for testability** and design for debug are not afterthoughts—they should be planned from the beginning.
- The journey **from specification to working silicon** follows a systematic flow of design, verification, and implementation that applies everything learned in this course.

??? question "Self-Check: Why does pipelining increase throughput even though it adds latency?"
    Pipelining divides a long combinational path into shorter stages separated by registers. Each stage has less delay, allowing a higher clock frequency. Although a single result takes more clock cycles to complete (increased latency), a new result is produced every clock cycle once the pipeline is full. The higher clock frequency means more results per second (higher throughput), even though each individual result takes longer. It is analogous to an assembly line: each car takes longer to pass through all stations, but the factory produces more cars per hour.

## Interactive Walkthrough

Design a datapath-controller system step-by-step, connecting registers, ALU, and MUX with an FSM controller:

<iframe src="../sims/datapath-controller-walkthrough/main.html" width="100%" height="580px" scrolling="no"></iframe>
