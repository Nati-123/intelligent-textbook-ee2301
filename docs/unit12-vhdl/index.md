---
title: Introduction to VHDL
description: Hardware description language fundamentals for digital system design and simulation
generated_by: claude skill generate-chapter-content
date: 2026-02-10 14:00:00
version: 0.03
---

# Unit 12: Introduction to VHDL

<details class="video-overview">
<summary><strong>Unit Overview</strong> (click to expand)</summary>

Welcome to Unit 12, where you will learn VHDL — the hardware description language that bridges the gap between a design on paper and a working circuit on an FPGA. If you have programmed in software before, VHDL will feel both familiar and strange, because it describes hardware that operates in parallel, not software that runs step by step.

Every VHDL design begins with two essential pieces. The entity declaration defines the interface — the ports that connect your component to the outside world. The architecture body describes what the component actually does internally.

One of the most important concepts in VHDL is the distinction between concurrent and sequential statements. Concurrent statements all execute simultaneously, modeling the parallel nature of real hardware. Sequential statements appear inside process blocks and execute in order. A process is triggered whenever a signal in its sensitivity list changes.

VHDL supports three modeling styles: structural (connecting components like a schematic), dataflow (concurrent signal assignments), and behavioral (processes with if-then-else and case statements). Implementing finite state machines in VHDL is a particularly important skill — you define states using an enumerated type and use a case statement for transitions.

Finally, testbenches let you generate stimulus for your design and verify correct behavior in simulation before committing to hardware.

**Key Takeaways**

1. Every VHDL design consists of an entity declaration that defines the interface and an architecture body that describes the behavior, using the std_logic type to represent real-world signal conditions.
2. Concurrent statements model parallel hardware while sequential statements inside process blocks model step-by-step behavior — understanding this distinction is essential for writing correct VHDL.
3. Testbenches allow you to verify designs in simulation before synthesis, and modeling finite state machines in VHDL connects directly to the FSM design techniques from earlier units.

</details>

## Summary

This unit introduces VHDL (VHSIC Hardware Description Language) as a formal method for describing, simulating, and synthesizing digital circuits. Rather than drawing schematics, designers write VHDL code that precisely specifies circuit behavior and structure, enabling automated synthesis into real hardware. Students will learn the fundamental elements of VHDL—entities, architectures, signals, data types, and concurrent/sequential statements—and apply them to implement the combinational and sequential circuits studied in Units 1 through 10. The unit emphasizes the critical distinction between hardware description (where all statements execute concurrently) and software programming (where statements execute sequentially), helping students develop the mindset needed for effective hardware design.

## Concepts Covered

1. Why Hardware Description Languages
2. VHDL History and Standards
3. VHDL Design Units
4. Entity Declaration
5. Architecture Body
6. Ports and Port Modes
7. VHDL Data Types
8. std_logic and std_logic_vector
9. Signal Declaration and Assignment
10. Concurrent Signal Assignment
11. Conditional Signal Assignment (when-else)
12. Selected Signal Assignment (with-select)
13. Component Instantiation
14. Structural Modeling
15. Behavioral Modeling
16. Dataflow Modeling
17. Process Statement
18. Sensitivity List
19. Sequential Statements in Processes
20. if-then-else Statement
21. case Statement
22. Combinational Logic in VHDL
23. Sequential Logic in VHDL
24. D Flip-Flop in VHDL
25. Registers in VHDL
26. Counters in VHDL
27. Finite State Machines in VHDL
28. Testbench Fundamentals
29. Simulation and Waveform Analysis
30. Synthesis vs Simulation

## Prerequisites

Before studying this unit, students should be familiar with:

- Boolean algebra and logic gates (Unit 2)
- Combinational circuit design (Units 3-8)
- Sequential circuit design including flip-flops, registers, counters, FSMs (Units 9-10)
- Programmable logic device concepts, especially FPGAs (Unit 11)

---

## 12.1 Why Hardware Description Languages

Throughout Units 1-10, digital circuits were designed using truth tables, Boolean equations, K-maps, and hand-drawn logic diagrams. This approach works well for small circuits—a 4-bit adder, a simple state machine—but becomes impractical for modern digital systems containing millions of gates.

**Hardware Description Languages (HDLs)** solve this scalability problem by describing circuits in a textual format that can be:

- **Simulated** to verify correct behavior before building hardware
- **Synthesized** automatically into gate-level netlists by software tools
- **Documented** precisely in a machine-readable format
- **Reused** across projects through component libraries
- **Version-controlled** using standard software engineering tools

HDL-based design does not replace the understanding of Boolean algebra, minimization, and circuit architecture—it builds on it. The synthesis tools that convert HDL to hardware perform the same Boolean optimizations studied in Units 5-6, the same technology mapping discussed in Unit 11. A designer who understands what the tools do can write better HDL code and interpret synthesis results more effectively.

| Design Method | Scale | Verification | Modification | Team Collaboration |
|--------------|-------|--------------|--------------|-------------------|
| Hand-drawn schematics | Small (< 100 gates) | Manual inspection | Redraw | Difficult |
| Boolean equations | Small-medium | Manual proof | Rederive | Moderate |
| HDL (VHDL/Verilog) | Any scale | Automated simulation | Edit text | Standard tools |

!!! info "The Two Dominant HDLs"
    **VHDL** and **Verilog** are the two industry-standard HDLs. This course uses VHDL because its strong type system catches errors early—valuable for students learning hardware design. The concepts transfer directly to Verilog, which uses different syntax but the same underlying hardware modeling principles.

---

## 12.2 VHDL History and Standards

VHDL originated from the U.S. Department of Defense's **Very High Speed Integrated Circuit (VHSIC)** program in the 1980s. The DoD needed a standardized language to document the behavior of complex integrated circuits supplied by different vendors.

Key milestones:

- **1983-1985:** Initial development by Intermetrics, IBM, and Texas Instruments
- **1987:** IEEE Standard 1076-1987 (VHDL-87)—first official standard
- **1993:** IEEE 1076-1993 (VHDL-93)—major revision adding file I/O, shared variables, and syntax improvements
- **2000:** IEEE 1076-2000—minor update
- **2008:** IEEE 1076-2008 (VHDL-2008)—significant additions including simplified sensitivity lists, conditional expressions, and enhanced generics

Most educational and industrial VHDL code targets the 1993 or 2008 standard. This textbook uses features common to both.

---

## 12.3 VHDL Design Units

A VHDL design is organized into **design units**—self-contained blocks that can be compiled independently. The two most important design units are:

1. **Entity:** Declares the **interface** of a circuit component—its name, input ports, and output ports. Think of it as the "outside view" or the symbol on a schematic.
2. **Architecture:** Defines the **implementation** of a circuit—what the component actually does. Think of it as the "inside view" or the circuit behind the symbol.

Every VHDL component requires exactly one entity and at least one architecture. A single entity can have multiple architectures (different implementations of the same interface), though synthesis typically uses only one.

Additional design units include:

- **Package:** A collection of reusable declarations (types, constants, functions) that can be shared across designs
- **Configuration:** Specifies which architecture to use for each entity in a hierarchy (primarily used in simulation)

---

## 12.4 Entity Declaration

The **entity declaration** defines the external interface of a circuit component. It specifies:

- The component name
- The input and output **ports** with their data types
- Optional **generic** parameters for configurable designs

**Syntax:**

```vhdl
entity entity_name is
    port (
        port_name : mode data_type;
        port_name : mode data_type;
        ...
        port_name : mode data_type  -- no semicolon on last port
    );
end entity entity_name;
```

**Example—2-input AND gate:**

```vhdl
entity and2 is
    port (
        a : in  std_logic;
        b : in  std_logic;
        y : out std_logic
    );
end entity and2;
```

**Example—4-bit adder:**

```vhdl
entity adder4 is
    port (
        a    : in  std_logic_vector(3 downto 0);
        b    : in  std_logic_vector(3 downto 0);
        cin  : in  std_logic;
        sum  : out std_logic_vector(3 downto 0);
        cout : out std_logic
    );
end entity adder4;
```

### Port Modes

Each port has a **mode** that specifies the direction of data flow:

| Mode | Direction | Description |
|------|-----------|-------------|
| `in` | Input only | Signal can be read inside the architecture but not written |
| `out` | Output only | Signal can be written inside the architecture but not read |
| `inout` | Bidirectional | Signal can be both read and written (used for tri-state buses) |
| `buffer` | Output with feedback | Like `out` but can also be read internally (rarely used; prefer internal signals) |

---

## 12.5 Architecture Body

The **architecture** defines what the circuit does—the actual logic. It is associated with a specific entity and contains:

1. **Declarative region** (between `is` and `begin`): Declares internal signals, constants, and component declarations
2. **Statement region** (between `begin` and `end`): Contains concurrent statements that describe the circuit behavior

**Syntax:**

```vhdl
architecture arch_name of entity_name is
    -- Signal declarations, constants, component declarations
    signal internal_sig : std_logic;
begin
    -- Concurrent statements
end architecture arch_name;
```

**Example—AND gate architecture:**

```vhdl
architecture dataflow of and2 is
begin
    y <= a and b;
end architecture dataflow;
```

The statement `y <= a and b;` is a **concurrent signal assignment**. The symbol `<=` is the signal assignment operator (read as "gets" or "is driven by"). This is **not** sequential assignment like in software—it describes a continuous hardware connection.

#### Diagram: Entity-Architecture Relationship

<iframe src="../sims/entity-architecture/main.html" width="100%" height="1040px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>

<details markdown="1">
<summary>Entity-Architecture Relationship</summary>
Type: infographic

Bloom Level: Understand (L2)
Bloom Verb: Explain, interpret

Learning Objective: Explain the relationship between VHDL entity declarations (external interface) and architecture bodies (internal implementation) by mapping them to the familiar concept of a circuit symbol (outside view) and its internal schematic (inside view).

Layout: Two-panel visualization

Left panel - "Entity (Outside View)":
- Show a black-box rectangle representing a component
- Input ports shown as arrows entering the left side with labels and types
- Output ports shown as arrows leaving the right side with labels and types
- Entity name displayed at the top of the box
- VHDL entity code displayed below the diagram

Right panel - "Architecture (Inside View)":
- Show the same rectangle but transparent, revealing internal logic gates
- Internal signals shown as wires connecting gates
- Signal declarations shown as labels on internal wires
- VHDL architecture code displayed below the diagram

Interactive elements:
- Click on a port in the entity view to highlight the corresponding signal in the architecture view
- Toggle between three example circuits: AND gate (simple), 4-bit adder (medium), counter (sequential)
- Hover over VHDL keywords for tooltip definitions

Color scheme: Entity border in blue, ports in green (input) and orange (output), internal logic in gray
Canvas size: 800x450px, responsive

Implementation: HTML/CSS/JavaScript
</details>

---

## 12.6 VHDL Data Types

VHDL is a **strongly typed** language—every signal, variable, and port must have a declared type, and operations between incompatible types produce compile-time errors. This strictness catches wiring errors that would only appear during simulation (or worse, in hardware) with a less rigorous language.

### Built-in Types

| Type | Values | Use |
|------|--------|-----|
| `bit` | '0', '1' | Simple binary signals (rarely used in practice) |
| `boolean` | TRUE, FALSE | Conditions and control flow |
| `integer` | $-2^{31}$ to $2^{31}-1$ | Counters, indices, arithmetic (not directly synthesizable without range) |
| `natural` | 0 to $2^{31}-1$ | Non-negative integers |
| `positive` | 1 to $2^{31}-1$ | Positive integers |

### IEEE std_logic Type

The most important data type for digital design is **`std_logic`** from the IEEE 1164 standard library. Unlike the simple `bit` type (only '0' and '1'), `std_logic` supports nine values that model real-world signal conditions:

| Value | Meaning |
|-------|---------|
| '0' | Forced logic 0 (strong driver) |
| '1' | Forced logic 1 (strong driver) |
| 'Z' | High impedance (tri-state) |
| 'X' | Unknown (conflict—two drivers fighting) |
| 'U' | Uninitialized (signal has never been assigned) |
| 'W' | Weak unknown |
| 'L' | Weak logic 0 (pull-down) |
| 'H' | Weak logic 1 (pull-up) |
| '-' | Don't care (used in synthesis) |

For synthesis, only '0', '1', 'Z', and '-' are meaningful. The other values appear during simulation to help diagnose design problems—seeing 'U' in a waveform indicates a signal that was never driven, while 'X' indicates a bus conflict.

### std_logic_vector

The **`std_logic_vector`** type represents a bus (group of related signals) as an array of `std_logic` values:

```vhdl
signal data_bus : std_logic_vector(7 downto 0);  -- 8-bit bus, MSB = bit 7
signal address  : std_logic_vector(3 downto 0);  -- 4-bit address
```

The `downto` convention places the most significant bit at the highest index, matching standard digital design notation. The `to` convention (e.g., `0 to 7`) places the MSB at index 0 and is less common.

!!! warning "std_logic_vector Is Not a Number"
    A `std_logic_vector` is just an array of bits—VHDL does not inherently treat it as an unsigned or signed integer. To perform arithmetic operations, use `unsigned` or `signed` types from the `ieee.numeric_std` library, or convert explicitly.

---

## 12.7 Signal Declaration and Assignment

**Signals** in VHDL model physical wires in hardware. They are declared in the architecture's declarative region and assigned values in the statement region.

**Declaration:**

```vhdl
architecture rtl of example is
    signal temp   : std_logic;
    signal count  : std_logic_vector(3 downto 0);
    signal enable : std_logic := '0';  -- initial value (simulation only)
begin
    ...
end architecture rtl;
```

**Concurrent signal assignment:**

```vhdl
temp <= a and b;
count <= "1010";      -- binary literal
enable <= '1';        -- single bit
```

### Key Rules for Signals

- A signal can be **driven** (assigned) by only **one** concurrent statement. Multiple drivers cause an 'X' (conflict) in simulation.
- Signal assignments take effect after a **delta delay**—not immediately. This models the propagation delay in real hardware.
- All concurrent statements execute **simultaneously** (in parallel), not sequentially like software.

This concurrency is the most important conceptual difference between HDL and software programming. The statement order in an architecture does not matter—all concurrent statements are continuously active, just like physical wires that are always connected.

---

## 12.8 Concurrent Signal Assignments

Concurrent statements exist in the architecture body (outside of any process) and model combinational logic through continuous assignments.

### Simple Concurrent Assignment

```vhdl
-- These three statements execute simultaneously, not sequentially
y <= a and b;
z <= c or d;
w <= not e;
```

### Conditional Signal Assignment (when-else)

The `when-else` construct implements priority-encoded multiplexing, similar to a chain of if-then-else logic:

```vhdl
-- 4:1 multiplexer using when-else
y <= d0 when sel = "00" else
     d1 when sel = "01" else
     d2 when sel = "10" else
     d3;
```

This synthesizes to a multiplexer where the first matching condition has priority. It directly implements the MUX concepts from Unit 8.

### Selected Signal Assignment (with-select)

The `with-select` construct implements a parallel selection, similar to a case/switch:

```vhdl
-- 4:1 multiplexer using with-select
with sel select
    y <= d0 when "00",
         d1 when "01",
         d2 when "10",
         d3 when others;
```

The `when others` clause is required to cover all possible values of `sel` (since `std_logic_vector` has 9 possible values per bit, not just 0 and 1).

| Construct | Equivalent Hardware | Priority | Use When |
|-----------|-------------------|----------|----------|
| Simple assignment | Wire/gate | N/A | Direct Boolean equations |
| `when-else` | Priority MUX chain | Yes (first match wins) | Priority-encoded selections |
| `with-select` | Parallel MUX | No (mutually exclusive) | Equal-priority selections |

---

## 12.9 Modeling Styles

VHDL supports three modeling styles for describing circuit behavior. Understanding when to use each style is essential for writing clear, synthesizable code.

### Dataflow Modeling

Dataflow modeling uses concurrent signal assignments to describe how data flows through combinational logic. It maps directly to Boolean equations:

```vhdl
-- Full adder: dataflow style
architecture dataflow of full_adder is
begin
    sum  <= a xor b xor cin;
    cout <= (a and b) or (a and cin) or (b and cin);
end architecture dataflow;
```

This is the most natural style for simple combinational circuits and directly mirrors the Boolean equations from Unit 3.

### Structural Modeling

Structural modeling describes a circuit as an interconnection of components—essentially a textual netlist:

```vhdl
-- Full adder: structural style using two half adders and an OR gate
architecture structural of full_adder is
    component half_adder is
        port (a, b : in std_logic; sum, carry : out std_logic);
    end component;
    component or2 is
        port (a, b : in std_logic; y : out std_logic);
    end component;
    signal s1, c1, c2 : std_logic;
begin
    HA1: half_adder port map (a => a, b => b, sum => s1, carry => c1);
    HA2: half_adder port map (a => s1, b => cin, sum => sum, carry => c2);
    OR1: or2 port map (a => c1, b => c2, y => cout);
end architecture structural;
```

Structural modeling creates a hierarchy—a top-level design instantiates sub-components, which may instantiate their own sub-components. This is how large systems are organized.

### Behavioral Modeling

Behavioral modeling uses **process** statements with sequential logic (if-then-else, case, loops) to describe circuit behavior algorithmically:

```vhdl
-- 4:1 MUX: behavioral style
architecture behavioral of mux4 is
begin
    process(sel, d0, d1, d2, d3)
    begin
        case sel is
            when "00"   => y <= d0;
            when "01"   => y <= d1;
            when "10"   => y <= d2;
            when "11"   => y <= d3;
            when others => y <= 'X';
        end case;
    end process;
end architecture behavioral;
```

#### Diagram: VHDL Modeling Styles Comparison

<iframe src="../sims/vhdl-modeling-styles/main.html" width="100%" height="910px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>

<details markdown="1">
<summary>VHDL Modeling Styles Comparison</summary>
Type: infographic

Bloom Level: Analyze (L4)
Bloom Verb: Compare, classify

Learning Objective: Compare the three VHDL modeling styles (dataflow, structural, behavioral) by examining the same circuit (full adder) described in each style, and classify when each style is most appropriate.

Layout: Three-column comparison with a shared circuit diagram at top

Top section:
- Circuit diagram of a full adder (from Unit 3) with inputs a, b, cin and outputs sum, cout

Three columns:
Column 1 - "Dataflow":
- VHDL code showing concurrent signal assignments
- Callout boxes linking each assignment to the corresponding gate in the circuit
- Label: "Best for: Simple combinational logic, Boolean equations"

Column 2 - "Structural":
- VHDL code showing component instantiation
- Callout boxes linking each component to a block in the circuit
- Label: "Best for: Hierarchical designs, reusing components"

Column 3 - "Behavioral":
- VHDL code showing process with case statement
- Callout boxes linking to the overall input-output behavior
- Label: "Best for: Complex logic, sequential circuits, state machines"

Interactive elements:
- Click on any VHDL keyword to see tooltip definition
- Hover over code lines to highlight corresponding hardware in the circuit diagram
- Toggle between full adder example and 4:1 MUX example

Color scheme: Dataflow in blue, structural in green, behavioral in purple
Canvas size: 800x500px, responsive

Implementation: HTML/CSS/JavaScript
</details>

---

## 12.10 The Process Statement

The **process** statement is the bridge between VHDL's concurrent world and sequential programming logic. A process is a concurrent statement (it runs in parallel with other concurrent statements), but **inside** a process, statements execute **sequentially**—just like a software function.

**Syntax:**

```vhdl
process_label: process(sensitivity_list)
    -- Variable declarations (optional)
begin
    -- Sequential statements
end process process_label;
```

### The Sensitivity List

The **sensitivity list** specifies which signals cause the process to **re-evaluate** (wake up). When any signal in the sensitivity list changes, the process executes all its sequential statements from top to bottom, then suspends until the next change.

**Rules for combinational logic:**

- The sensitivity list must include **all** signals that are read inside the process
- Omitting a signal creates a **latch** (unintended memory)—a common and dangerous mistake

**Rules for sequential (clocked) logic:**

- The sensitivity list typically contains only the **clock** signal (and optionally an asynchronous reset)
- The process responds only to clock edges, not to data changes

```vhdl
-- Combinational process: sensitivity list includes ALL inputs
comb_proc: process(a, b, sel)
begin
    if sel = '0' then
        y <= a;
    else
        y <= b;
    end if;
end process comb_proc;

-- Sequential process: sensitivity list includes only clock (and optional reset)
seq_proc: process(clk)
begin
    if rising_edge(clk) then
        q <= d;
    end if;
end process seq_proc;
```

!!! warning "Incomplete Sensitivity Lists"
    If you read signal `a` inside a process but omit `a` from the sensitivity list, simulation will not re-evaluate when `a` changes—creating a mismatch between simulation and synthesized hardware. Modern synthesis tools issue warnings about this, and VHDL-2008 offers `process(all)` to automatically include all read signals.

---

## 12.11 Sequential Statements in Processes

Inside a process, statements execute sequentially (top to bottom), enabling familiar programming constructs:

### if-then-else

```vhdl
-- Priority encoder
process(request)
begin
    if request(3) = '1' then
        grant <= "11";
    elsif request(2) = '1' then
        grant <= "10";
    elsif request(1) = '1' then
        grant <= "01";
    elsif request(0) = '1' then
        grant <= "00";
    else
        grant <= "00";
    end if;
end process;
```

The `if-then-else` chain creates **priority logic**—the first condition that is true wins. This directly implements the priority encoder from Unit 8.

### case Statement

```vhdl
-- Decoder (no priority)
process(sel)
begin
    case sel is
        when "00" => y <= "0001";
        when "01" => y <= "0010";
        when "10" => y <= "0100";
        when "11" => y <= "1000";
        when others => y <= "0000";
    end case;
end process;
```

The `case` statement creates **parallel selection** logic—all cases are evaluated simultaneously. The `when others` clause is required to cover the non-binary `std_logic` values.

**Choosing between if and case:**

| Construct | Hardware | Use When |
|-----------|----------|----------|
| `if-then-elsif` | Priority MUX chain | Conditions have natural priority |
| `case` | Parallel MUX | All conditions are mutually exclusive |

---

## 12.12 Combinational Logic in VHDL

Any combinational circuit from Units 2-8 can be described in VHDL. The key rule: **every output must be assigned a value for every possible input combination**. Failing to do so creates an unintended **latch**.

### Example: 2-to-4 Decoder

```vhdl
library ieee;
use ieee.std_logic_1164.all;

entity decoder2to4 is
    port (
        a   : in  std_logic_vector(1 downto 0);
        en  : in  std_logic;
        y   : out std_logic_vector(3 downto 0)
    );
end entity decoder2to4;

architecture rtl of decoder2to4 is
begin
    process(a, en)
    begin
        y <= "0000";  -- Default assignment prevents latches
        if en = '1' then
            case a is
                when "00"   => y <= "0001";
                when "01"   => y <= "0010";
                when "10"   => y <= "0100";
                when "11"   => y <= "1000";
                when others => y <= "0000";
            end case;
        end if;
    end process;
end architecture rtl;
```

The **default assignment** (`y <= "0000"`) at the beginning of the process ensures that `y` has a value even when `en = '0'`. Without it, the synthesis tool would infer a latch to "remember" the last value of `y`—almost always a bug.

### Example: 4-bit Magnitude Comparator

```vhdl
library ieee;
use ieee.std_logic_1164.all;
use ieee.numeric_std.all;

entity comparator4 is
    port (
        a      : in  std_logic_vector(3 downto 0);
        b      : in  std_logic_vector(3 downto 0);
        a_gt_b : out std_logic;
        a_eq_b : out std_logic;
        a_lt_b : out std_logic
    );
end entity comparator4;

architecture rtl of comparator4 is
begin
    process(a, b)
    begin
        if unsigned(a) > unsigned(b) then
            a_gt_b <= '1'; a_eq_b <= '0'; a_lt_b <= '0';
        elsif unsigned(a) = unsigned(b) then
            a_gt_b <= '0'; a_eq_b <= '1'; a_lt_b <= '0';
        else
            a_gt_b <= '0'; a_eq_b <= '0'; a_lt_b <= '1';
        end if;
    end process;
end architecture rtl;
```

Note the use of `unsigned()` from the `ieee.numeric_std` library to treat the `std_logic_vector` as an unsigned number for comparison.

---

## 12.13 Sequential Logic in VHDL

Sequential circuits use the clock edge to determine when state changes occur. The fundamental pattern for all synchronous sequential logic in VHDL is:

```vhdl
process(clk)
begin
    if rising_edge(clk) then
        -- State updates happen here
    end if;
end process;
```

The `rising_edge(clk)` function returns TRUE only at the moment the clock transitions from '0' to '1'. This models the **positive-edge-triggered flip-flop** behavior from Unit 9.

### D Flip-Flop

```vhdl
-- Simple D flip-flop
architecture rtl of dff is
begin
    process(clk)
    begin
        if rising_edge(clk) then
            q <= d;
        end if;
    end process;
end architecture rtl;
```

### D Flip-Flop with Asynchronous Reset

```vhdl
-- D flip-flop with async reset
process(clk, rst)
begin
    if rst = '1' then
        q <= '0';              -- Async reset: immediate, regardless of clock
    elsif rising_edge(clk) then
        q <= d;                -- Normal operation: capture on clock edge
    end if;
end process;
```

The asynchronous reset (`rst`) is included in the sensitivity list because it takes effect immediately, without waiting for a clock edge.

### D Flip-Flop with Synchronous Reset

```vhdl
-- D flip-flop with sync reset
process(clk)
begin
    if rising_edge(clk) then
        if rst = '1' then
            q <= '0';          -- Sync reset: only at clock edge
        else
            q <= d;
        end if;
    end if;
end process;
```

The synchronous reset is **not** in the sensitivity list—it is evaluated only at the clock edge.

#### Diagram: VHDL Flip-Flop Patterns

<iframe src="../sims/vhdl-flipflop-patterns/main.html" width="100%" height="570px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>

<details markdown="1">
<summary>VHDL Flip-Flop Patterns</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: Implement, demonstrate

Learning Objective: Implement D flip-flop variants in VHDL by writing process statements with appropriate sensitivity lists and clock/reset patterns, then verify correct behavior through simulated waveforms.

Visual elements:
- Top section: VHDL code editor showing flip-flop process code (editable dropdown to select variant)
- Middle section: Circuit diagram showing the synthesized flip-flop with inputs/outputs
- Bottom section: Timing diagram showing clk, rst, d, and q waveforms

Interactive controls:
- Dropdown: Select variant (Basic DFF, DFF with Async Reset, DFF with Sync Reset, DFF with Enable)
- "Simulate" button: Runs 16 clock cycles with predefined input pattern
- Toggle switches for d, rst, en to manually set values
- "Clock Pulse" button to manually advance one clock cycle
- Waveform display showing signal history

Data Visibility Requirements:
Stage 1: Show VHDL code for selected variant
Stage 2: Show the circuit diagram it synthesizes to
Stage 3: Show clock edge detection moment in waveform
Stage 4: Show output change (or not) based on inputs at that edge

Instructional Rationale: Connecting VHDL code to both the synthesized circuit and the resulting waveforms helps students see how textual descriptions become physical hardware with specific timing behavior.

Color scheme: Clock in blue, reset in red, data in green, output in orange
Canvas size: 800x500px, responsive

Implementation: p5.js
</details>

---

## 12.14 Registers in VHDL

A **register** is a group of flip-flops sharing a common clock. In VHDL, registers are described using `std_logic_vector` signals within a clocked process:

### Parallel Load Register

```vhdl
-- 8-bit register with enable and async reset
library ieee;
use ieee.std_logic_1164.all;

entity register8 is
    port (
        clk  : in  std_logic;
        rst  : in  std_logic;
        en   : in  std_logic;
        d    : in  std_logic_vector(7 downto 0);
        q    : out std_logic_vector(7 downto 0)
    );
end entity register8;

architecture rtl of register8 is
begin
    process(clk, rst)
    begin
        if rst = '1' then
            q <= (others => '0');    -- Reset all bits to 0
        elsif rising_edge(clk) then
            if en = '1' then
                q <= d;              -- Load new data only when enabled
            end if;
        end if;
    end process;
end architecture rtl;
```

The expression `(others => '0')` is a VHDL **aggregate** that sets all bits of the vector to '0', regardless of vector length—a convenient idiom.

### Shift Register

```vhdl
-- 4-bit shift register with serial input
architecture rtl of shift_reg4 is
    signal reg : std_logic_vector(3 downto 0);
begin
    process(clk, rst)
    begin
        if rst = '1' then
            reg <= "0000";
        elsif rising_edge(clk) then
            reg <= reg(2 downto 0) & sin;  -- Shift left, insert serial input
        end if;
    end process;
    q <= reg;
end architecture rtl;
```

The `&` operator is **concatenation**—it joins `reg(2 downto 0)` (the lower 3 bits) with `sin` (the new serial input) to create the shifted result.

---

## 12.15 Counters in VHDL

Counters combine registers with incrementing logic. Using the `ieee.numeric_std` library, counter descriptions are clean and readable:

### 4-Bit Up Counter

```vhdl
library ieee;
use ieee.std_logic_1164.all;
use ieee.numeric_std.all;

entity counter4 is
    port (
        clk  : in  std_logic;
        rst  : in  std_logic;
        en   : in  std_logic;
        count: out std_logic_vector(3 downto 0)
    );
end entity counter4;

architecture rtl of counter4 is
    signal cnt : unsigned(3 downto 0);
begin
    process(clk, rst)
    begin
        if rst = '1' then
            cnt <= (others => '0');
        elsif rising_edge(clk) then
            if en = '1' then
                cnt <= cnt + 1;      -- Increment
            end if;
        end if;
    end process;
    count <= std_logic_vector(cnt);  -- Convert unsigned to std_logic_vector
end architecture rtl;
```

The internal signal uses `unsigned` for arithmetic, and the output converts back to `std_logic_vector` for the port interface.

### BCD Counter (Modulo-10)

```vhdl
process(clk, rst)
begin
    if rst = '1' then
        cnt <= (others => '0');
    elsif rising_edge(clk) then
        if en = '1' then
            if cnt = 9 then
                cnt <= (others => '0');  -- Wrap around at 9
            else
                cnt <= cnt + 1;
            end if;
        end if;
    end if;
end process;
```

This directly implements the BCD counter from Unit 10, with the wrap-around condition replacing the more complex gate-level reset logic.

---

## 12.16 Finite State Machines in VHDL

Finite state machines (from Unit 10) have a well-established VHDL coding pattern using **enumerated types** for states and a **two-process** or **three-process** architecture.

### FSM Template (Two-Process Style)

```vhdl
library ieee;
use ieee.std_logic_1164.all;

entity fsm_example is
    port (
        clk   : in  std_logic;
        rst   : in  std_logic;
        input : in  std_logic;
        output: out std_logic
    );
end entity fsm_example;

architecture rtl of fsm_example is
    type state_type is (S0, S1, S2, S3);  -- Enumerated state type
    signal current_state, next_state : state_type;
begin
    -- Process 1: State register (sequential)
    state_reg: process(clk, rst)
    begin
        if rst = '1' then
            current_state <= S0;
        elsif rising_edge(clk) then
            current_state <= next_state;
        end if;
    end process state_reg;

    -- Process 2: Next state and output logic (combinational)
    comb_logic: process(current_state, input)
    begin
        -- Default assignments
        next_state <= current_state;
        output <= '0';

        case current_state is
            when S0 =>
                if input = '1' then
                    next_state <= S1;
                end if;
            when S1 =>
                output <= '1';
                if input = '0' then
                    next_state <= S2;
                end if;
            when S2 =>
                if input = '1' then
                    next_state <= S3;
                else
                    next_state <= S0;
                end if;
            when S3 =>
                output <= '1';
                next_state <= S0;
        end case;
    end process comb_logic;
end architecture rtl;
```

#### Diagram: FSM VHDL Code-to-State Diagram Mapper

<iframe src="../sims/vhdl-fsm-mapper/main.html" width="100%" height="640px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>

<details markdown="1">
<summary>FSM VHDL Code-to-State Diagram Mapper</summary>
Type: microsim

Bloom Level: Analyze (L4)
Bloom Verb: Examine, deconstruct

Learning Objective: Analyze the correspondence between VHDL FSM code (state type declaration, state register process, and combinational next-state/output process) and the equivalent state diagram, tracing how each case branch maps to a state transition arc.

Visual elements:
- Left panel: VHDL code with syntax highlighting, showing the two-process FSM template
- Right panel: State diagram (circles for states, arrows for transitions, labels for conditions/outputs)
- Highlighting: when a code section is selected, the corresponding state diagram element highlights

Interactive controls:
- Click on a state in the diagram to highlight the corresponding case branch in the code
- Click on a transition arrow to highlight the corresponding if-then branch
- "Simulate" mode: step through clock cycles with input toggles, showing current state highlighted in both code and diagram
- Toggle between Moore and Mealy output display

Data Visibility Requirements:
- Show current state, next state, and output at each simulation step
- Show the active code branch being executed
- Show the state transition happening in the diagram

Instructional Rationale: Dual-view mapping between code and diagram helps students translate between the abstract state diagram design (Unit 10) and the concrete VHDL implementation, reinforcing that VHDL is describing hardware behavior, not writing software.

Color scheme: Current state in gold, next state in light blue, active transition in green, output in orange
Canvas size: 800x550px, responsive

Implementation: p5.js or vis-network
</details>

### Moore vs Mealy in VHDL

The difference between Moore and Mealy machines in VHDL is straightforward:

- **Moore machine:** Outputs depend only on `current_state` in the combinational process
- **Mealy machine:** Outputs depend on both `current_state` and inputs

```vhdl
-- Moore output (depends only on state)
output <= '1' when current_state = S1 else '0';

-- Mealy output (depends on state AND input)
output <= '1' when (current_state = S1 and input = '1') else '0';
```

---

## 12.17 Testbench Fundamentals

A **testbench** is a VHDL entity with no ports that instantiates the **Design Under Test (DUT)** and applies stimulus signals to verify its behavior. Testbenches are used for simulation only—they are not synthesized into hardware.

### Testbench Structure

```vhdl
library ieee;
use ieee.std_logic_1164.all;

entity tb_and2 is
    -- No ports: testbench is self-contained
end entity tb_and2;

architecture sim of tb_and2 is
    -- Declare component
    component and2 is
        port (a, b : in std_logic; y : out std_logic);
    end component;

    -- Declare test signals
    signal a_tb, b_tb, y_tb : std_logic;
begin
    -- Instantiate DUT
    DUT: and2 port map (a => a_tb, b => b_tb, y => y_tb);

    -- Stimulus process
    stim: process
    begin
        a_tb <= '0'; b_tb <= '0'; wait for 10 ns;
        a_tb <= '0'; b_tb <= '1'; wait for 10 ns;
        a_tb <= '1'; b_tb <= '0'; wait for 10 ns;
        a_tb <= '1'; b_tb <= '1'; wait for 10 ns;
        wait;  -- Stop simulation
    end process stim;
end architecture sim;
```

The `wait for 10 ns;` statement is a simulation-only construct that advances simulation time. The `wait;` at the end halts the process permanently.

### Clock Generation in Testbenches

```vhdl
-- Clock generation process (no sensitivity list)
clk_gen: process
begin
    clk <= '0'; wait for 5 ns;
    clk <= '1'; wait for 5 ns;
end process clk_gen;
-- Creates a 100 MHz clock (10 ns period)
```

This process has no sensitivity list and no final `wait;`—it loops forever, generating a continuous clock signal.

!!! tip "Testbench Best Practices"
    Always write a testbench for every VHDL component. A design that simulates correctly is much more likely to work in hardware. Apply all critical input combinations, including edge cases and invalid inputs, to thoroughly verify the design.

---

## 12.18 Synthesis vs Simulation

A critical distinction in VHDL is that not all valid VHDL code can be synthesized into hardware:

| Feature | Simulation | Synthesis |
|---------|-----------|-----------|
| `wait for 10 ns;` | Advances simulation time | NOT synthesizable |
| `after 5 ns` | Models propagation delay | Ignored by synthesis |
| File I/O | Read/write test data | NOT synthesizable |
| `assert` / `report` | Print messages | NOT synthesizable |
| Division by non-power-of-2 | Computed | Expensive or unsupported |
| Initial values on signals | Set at time 0 | May not be supported |

**Synthesizable subset:** The code that describes actual hardware—concurrent assignments, processes with clock edges, if/case statements, arithmetic operators, component instantiation. This is what appears inside the DUT.

**Simulation-only features:** Time delays, file access, assertions, and reporting. These appear only in testbenches and are used for verification, not implementation.

The synthesis tool reads the VHDL code and infers hardware structures:

- `if rising_edge(clk)` → flip-flop
- `if-then-else` → multiplexer
- `case` → decoder/multiplexer
- `+`, `-` → adder/subtractor
- `*` → multiplier (maps to DSP slices in FPGAs)
- Incomplete if/case → latch (usually a bug!)

#### Diagram: VHDL Code to Hardware Inference

<iframe src="../sims/vhdl-synthesis-inference/main.html" width="100%" height="500px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>

<details markdown="1">
<summary>VHDL Code to Hardware Inference</summary>
Type: infographic

Bloom Level: Understand (L2)
Bloom Verb: Interpret, explain

Learning Objective: Interpret common VHDL coding patterns and explain what hardware structures the synthesis tool infers from each pattern—connecting textual code to the physical gates, multiplexers, and flip-flops studied in prior units.

Layout: Two-column matching display

Left column: VHDL code snippets (6 patterns)
1. `y <= a and b;` → AND gate
2. `if sel = '0' then y <= a; else y <= b;` → 2:1 MUX
3. `if rising_edge(clk) then q <= d;` → D flip-flop
4. `cnt <= cnt + 1;` → Adder + register
5. `if en = '1' then q <= d;` (inside clocked process) → FF with enable
6. `if sel = '1' then y <= a;` (no else clause) → Latch (warning!)

Right column: Circuit diagrams showing inferred hardware for each pattern

Interactive elements:
- Hover over a code pattern to highlight the corresponding circuit
- Click a pattern to see a detailed explanation of the inference
- Warning icon on the latch pattern with tooltip: "Missing else clause creates unintended latch"

Color scheme: Combinational patterns in blue, sequential patterns in purple, warning pattern in red
Canvas size: 800x500px, responsive

Implementation: HTML/CSS/JavaScript
</details>

---

## 12.19 Complete Design Example: Traffic Light Controller

To bring together all the VHDL concepts, consider a simple traffic light controller as a finite state machine:

**Specifications:**

- Two traffic lights: Main road (North-South) and Side road (East-West)
- Sensor on side road detects waiting vehicles
- Four states: Green-Red, Yellow-Red, Red-Green, Red-Yellow
- Timer-based transitions (simplified with a counter)

```vhdl
library ieee;
use ieee.std_logic_1164.all;
use ieee.numeric_std.all;

entity traffic_light is
    port (
        clk    : in  std_logic;
        rst    : in  std_logic;
        sensor : in  std_logic;
        main_light : out std_logic_vector(2 downto 0);  -- R,Y,G
        side_light : out std_logic_vector(2 downto 0)   -- R,Y,G
    );
end entity traffic_light;

architecture rtl of traffic_light is
    type state_type is (GREEN_RED, YELLOW_RED, RED_GREEN, RED_YELLOW);
    signal state : state_type;
    signal timer : unsigned(3 downto 0);
begin
    process(clk, rst)
    begin
        if rst = '1' then
            state <= GREEN_RED;
            timer <= (others => '0');
        elsif rising_edge(clk) then
            case state is
                when GREEN_RED =>
                    if sensor = '1' and timer >= 10 then
                        state <= YELLOW_RED;
                        timer <= (others => '0');
                    else
                        timer <= timer + 1;
                    end if;
                when YELLOW_RED =>
                    if timer >= 3 then
                        state <= RED_GREEN;
                        timer <= (others => '0');
                    else
                        timer <= timer + 1;
                    end if;
                when RED_GREEN =>
                    if timer >= 7 then
                        state <= RED_YELLOW;
                        timer <= (others => '0');
                    else
                        timer <= timer + 1;
                    end if;
                when RED_YELLOW =>
                    if timer >= 3 then
                        state <= GREEN_RED;
                        timer <= (others => '0');
                    else
                        timer <= timer + 1;
                    end if;
            end case;
        end if;
    end process;

    -- Moore outputs: depend only on state
    with state select
        main_light <= "001" when GREEN_RED,   -- Green
                      "010" when YELLOW_RED,  -- Yellow
                      "100" when RED_GREEN,   -- Red
                      "100" when RED_YELLOW;  -- Red

    with state select
        side_light <= "100" when GREEN_RED,   -- Red
                      "100" when YELLOW_RED,  -- Red
                      "001" when RED_GREEN,   -- Green
                      "010" when RED_YELLOW;  -- Yellow
end architecture rtl;
```

This example integrates:

- Entity/architecture structure (Section 12.4-12.5)
- `std_logic_vector` and `unsigned` types (Section 12.6)
- Clocked process with asynchronous reset (Section 12.13)
- Enumerated state type for FSM (Section 12.16)
- Counter logic (Section 12.15)
- Concurrent `with-select` for output logic (Section 12.8)

---

## 12.20 Key Takeaways

- **VHDL** describes hardware textually, enabling simulation, synthesis, and reuse of digital circuits at any scale.
- The **entity** declares the interface (ports and types); the **architecture** defines the implementation.
- **`std_logic`** is the standard signal type, supporting nine values that model real-world conditions beyond simple 0 and 1.
- **Concurrent statements** (outside processes) describe combinational logic where all assignments execute simultaneously.
- **Process statements** contain sequential code (if-then-else, case) but are themselves concurrent with other statements.
- The **sensitivity list** determines when a process re-evaluates—include all read signals for combinational logic; include only clock (and async reset) for sequential logic.
- **Dataflow, structural, and behavioral** modeling styles offer different levels of abstraction for describing the same hardware.
- **Clocked processes** with `rising_edge(clk)` infer flip-flops—the foundation of all sequential circuits in VHDL.
- **Testbenches** verify designs through simulation before hardware implementation, using non-synthesizable features like `wait for` and assertions.
- **Synthesis inference** maps VHDL patterns to specific hardware structures—understanding this mapping helps avoid common pitfalls like unintended latches.

??? question "Self-Check: What happens if you write an if-then statement inside a combinational process without an else clause?"
    The synthesis tool infers a **latch**—an unintended memory element. Without the `else` clause, the signal retains its previous value when the condition is false, which requires a latch to implement. Always provide default assignments or complete if-else coverage in combinational processes to avoid this common bug.

## Interactive Walkthrough

Design a VHDL finite state machine step-by-step, from state diagram to complete VHDL code:

<iframe src="../sims/vhdl-fsm-walkthrough/main.html" width="100%" height="580px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
