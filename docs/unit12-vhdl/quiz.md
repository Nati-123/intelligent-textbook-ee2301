---
title: Unit 12 Quiz - Introduction to VHDL
description: Test your understanding of VHDL entities, architectures, data types, concurrent and sequential statements, and synthesis inference
---

# Quiz: Introduction to VHDL

Test your understanding of VHDL fundamentals including design units, data types, modeling styles, process statements, and synthesis patterns with these questions.

---

#### 1. In VHDL, which design unit declares the external interface (inputs and outputs) of a circuit component?

<div class="upper-alpha" markdown>
1. Architecture
2. Entity
3. Package
4. Process
</div>

**Answer:** The correct answer is **B**. The entity declaration defines the external interface of a VHDL component, specifying its name, input ports, output ports, and their data types. It represents the "outside view" of the circuit—equivalent to the symbol on a schematic. The architecture body, which is a separate design unit, defines the internal implementation.

**Concept Tested:** Entity Declaration

---

#### 2. Which `std_logic` value indicates that a signal has never been assigned a value during simulation?

<div class="upper-alpha" markdown>
1. 'X' (Unknown/conflict)
2. 'Z' (High impedance)
3. '-' (Don't care)
4. 'U' (Uninitialized)
</div>

**Answer:** The correct answer is **D**. The value 'U' (Uninitialized) in the IEEE 1164 `std_logic` type indicates that a signal has never been driven or assigned. Seeing 'U' in a simulation waveform is a diagnostic clue that a signal was not connected to a driver. In contrast, 'X' means two or more drivers are conflicting, 'Z' is an intentional high-impedance (tri-state) output, and '-' represents a don't-care condition used in synthesis.

**Concept Tested:** std_logic and std_logic_vector

---

#### 3. What is the fundamental difference between concurrent signal assignments (outside a process) and sequential statements (inside a process) in VHDL?

<div class="upper-alpha" markdown>
1. Concurrent assignments all execute simultaneously like physical wires; sequential statements execute top-to-bottom like software code
2. Concurrent assignments are synthesizable but sequential statements are only for simulation
3. Sequential statements produce faster hardware because they execute in order
4. Concurrent assignments can only describe combinational logic while sequential statements describe only sequential logic
</div>

**Answer:** The correct answer is **A**. Concurrent signal assignments in VHDL model hardware wires that are always active and continuously driven—their order in the source code does not matter. Inside a process, statements execute sequentially from top to bottom when the process is activated, similar to software. However, the process itself is a concurrent statement that runs in parallel with other concurrent statements. Both concurrent and sequential statements are synthesizable and can describe either combinational or sequential logic.

**Concept Tested:** Concurrent Signal Assignment

---

#### 4. Why does an incomplete `if` statement (missing `else` clause) inside a combinational process cause synthesis to infer a latch?

<div class="upper-alpha" markdown>
1. The synthesis tool interprets missing branches as a timing constraint violation
2. VHDL requires all `if` statements to have `else` clauses by language specification
3. Without an `else` clause, the signal must retain its previous value when the condition is false, requiring a memory element
4. Latches are always inferred from `if` statements regardless of whether an `else` clause is present
</div>

**Answer:** The correct answer is **C**. In a combinational process, every output signal must be assigned a value for every possible input combination. When an `if` statement lacks an `else` clause, the signal has no new assignment when the condition is false, so it must "remember" its previous value. This memory behavior requires a latch—an unintended storage element. The solution is to either provide an `else` clause or use a default assignment at the beginning of the process.

**Concept Tested:** Combinational Logic in VHDL

---

#### 5. Given the VHDL concurrent statement `y <= d0 when sel = "00" else d1 when sel = "01" else d2 when sel = "10" else d3;`, what hardware structure does this synthesize to?

<div class="upper-alpha" markdown>
1. A priority encoder
2. A 4:1 multiplexer
3. A 2-to-4 decoder
4. A 4-bit register
</div>

**Answer:** The correct answer is **B**. The `when-else` conditional signal assignment implements a priority-encoded selection, which synthesizes to a 4:1 multiplexer. The 2-bit `sel` signal selects among four data inputs (`d0` through `d3`), routing the selected input to the output `y`. This directly implements the MUX concept from Unit 8 in VHDL syntax.

**Concept Tested:** Conditional Signal Assignment (when-else)

---

#### 6. Which VHDL code pattern correctly describes a D flip-flop with asynchronous reset?

<div class="upper-alpha" markdown>
1. Process with `clk` and `rst` in the sensitivity list; `if rst='1' then` checked before `elsif rising_edge(clk)`
2. Process with only `clk` in the sensitivity list; `if rst='1' then` checked inside `if rising_edge(clk)`
3. Concurrent assignment: `q <= d when rising_edge(clk) else '0' when rst='1'`
4. Process with only `rst` in the sensitivity list; `if rising_edge(clk)` nested inside `if rst='0'`
</div>

**Answer:** The correct answer is **A**. An asynchronous reset takes effect immediately, regardless of the clock. The correct pattern includes both `clk` and `rst` in the sensitivity list (so the process responds to changes in either signal), with the reset condition checked first (`if rst='1' then q <= '0';`) and the clock edge checked second (`elsif rising_edge(clk) then q <= d;`). Option B describes a synchronous reset (checked only at clock edges). Options C and D are syntactically incorrect.

**Concept Tested:** D Flip-Flop in VHDL

---

#### 7. A VHDL counter uses an internal `unsigned` signal `cnt` and an output port `count` of type `std_logic_vector`. Which statement correctly drives the output port?

<div class="upper-alpha" markdown>
1. `count <= cnt;`
2. `count <= integer(cnt);`
3. `count <= to_unsigned(cnt);`
4. `count <= std_logic_vector(cnt);`
</div>

**Answer:** The correct answer is **D**. VHDL is strongly typed—you cannot directly assign an `unsigned` value to a `std_logic_vector` port without explicit type conversion. The `std_logic_vector()` function from the `ieee.numeric_std` library converts the `unsigned` signal to `std_logic_vector` for the output port. Option A fails with a type mismatch error. Option B converts to `integer`, which is incompatible with `std_logic_vector`. Option C has the wrong conversion direction.

**Concept Tested:** VHDL Data Types / Counters in VHDL

---

#### 8. In a two-process FSM, the combinational process begins with `next_state <= current_state;` as a default assignment before the `case` statement. What is the purpose of this default?

<div class="upper-alpha" markdown>
1. It initializes the FSM to a known power-on state
2. It prevents the FSM from ever entering an illegal state encoding
3. It ensures the state holds by default, preventing latch inference for transitions not explicitly listed in the case branches
4. It forces the synthesis tool to use flip-flops instead of latches for the state register
</div>

**Answer:** The correct answer is **C**. The default assignment `next_state <= current_state;` ensures that `next_state` always has a defined value, even for state/input combinations not explicitly covered in the case branches. Without this default, any missing branch would leave `next_state` unassigned for that condition, causing the synthesis tool to infer a latch to hold the previous value. The default says "stay in the current state unless a case branch explicitly changes it," which is both the desired behavior and the correct way to prevent unintended latches.

**Concept Tested:** Finite State Machines in VHDL

---

#### 9. Consider these two VHDL output assignments in an FSM: (1) `output <= '1' when current_state = S1 else '0';` and (2) `output <= '1' when (current_state = S1 and input_sig = '1') else '0';`. What is the key behavioral difference?

<div class="upper-alpha" markdown>
1. Statement (1) produces a registered output; statement (2) produces a combinational output
2. Statement (1) implements a Moore output (depends only on state); statement (2) implements a Mealy output (depends on state and input)
3. Statement (1) is synthesizable; statement (2) is valid only in simulation
4. Statement (1) has higher propagation delay because it evaluates all states
</div>

**Answer:** The correct answer is **B**. Statement (1) is a Moore output because it depends only on `current_state`—the output is '1' whenever the FSM is in state S1, regardless of input values. Statement (2) is a Mealy output because it depends on both `current_state` and `input_sig`—the output is '1' only when the FSM is in S1 AND the input is '1'. This directly corresponds to the Moore vs Mealy machine distinction from Unit 10: Moore outputs are associated with states, Mealy outputs are associated with state-input combinations.

**Concept Tested:** Finite State Machines in VHDL / Moore vs Mealy

---

#### 10. A student's VHDL testbench uses `wait for 10 ns;` delays and `assert` statements to verify a design. Simulation passes all tests, but the design fails when programmed onto an FPGA. Which evaluation best explains why?

<div class="upper-alpha" markdown>
1. The `assert` statements suppressed error messages during simulation
2. The `wait for` delays are too short to detect timing-related bugs
3. VHDL testbenches inherently cannot verify combinational logic correctness
4. Simulation uses ideal zero-delay logic models; the real hardware has propagation delays and timing constraints that the testbench did not exercise
</div>

**Answer:** The correct answer is **D**. Functional simulation in VHDL uses ideal models where gates have zero propagation delay (unless explicitly specified with `after` clauses, which are ignored by synthesis). This means simulation verifies logical correctness but not timing correctness. In real hardware, signals have finite propagation delays, and setup/hold time violations can cause incorrect behavior that simulation would not reveal. This is why the FPGA design flow includes static timing analysis after place-and-route—to catch timing violations that functional simulation misses.

**Concept Tested:** Synthesis vs Simulation

---

## Answers Summary

| Question | Answer | Concept |
|----------|--------|---------|
| 1 | B | Entity Declaration |
| 2 | D | std_logic and std_logic_vector |
| 3 | A | Concurrent Signal Assignment |
| 4 | C | Combinational Logic in VHDL |
| 5 | B | Conditional Signal Assignment |
| 6 | A | D Flip-Flop in VHDL |
| 7 | D | VHDL Data Types / Counters |
| 8 | C | Finite State Machines in VHDL |
| 9 | B | Moore vs Mealy in VHDL |
| 10 | D | Synthesis vs Simulation |
