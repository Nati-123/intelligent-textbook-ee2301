---
title: Unit 12 Quiz - Introduction to VHDL
description: Test your understanding of VHDL entities, architectures, data types, concurrent and sequential statements, and synthesis inference
hide:
  - toc
---

<div class="problems-styled" markdown>

<h1 style="color: #5A3EED !important; border-bottom: 3px solid #5A3EED; padding-bottom: 0.4rem; font-weight: 800; margin-bottom: 1.5rem;">Quiz: Introduction to VHDL</h1>

<p style="color: #555; line-height: 1.85; font-size: 1.05rem; margin-bottom: 2rem;">
Test your understanding of VHDL fundamentals including design units, data types, modeling styles, process statements, and synthesis patterns with these questions.
</p>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 1</p>

<p style="color: #333; line-height: 1.75;">In VHDL, which design unit declares the external interface (inputs and outputs) of a circuit component?</p>

<div class="upper-alpha" markdown>
1. Architecture
2. Entity
3. Package
4. Process
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: B</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">The entity declaration defines the external interface of a VHDL component, specifying its name, input ports, output ports, and their data types. It represents the "outside view" of the circuit—equivalent to the symbol on a schematic. The architecture body, which is a separate design unit, defines the internal implementation.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Entity Declaration</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 2</p>

<p style="color: #333; line-height: 1.75;">Which <code>std_logic</code> value indicates that a signal has never been assigned a value during simulation?</p>

<div class="upper-alpha" markdown>
1. 'X' (Unknown/conflict)
2. 'Z' (High impedance)
3. '-' (Don't care)
4. 'U' (Uninitialized)
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: D</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">The value 'U' (Uninitialized) in the IEEE 1164 <code>std_logic</code> type indicates that a signal has never been driven or assigned. Seeing 'U' in a simulation waveform is a diagnostic clue that a signal was not connected to a driver. In contrast, 'X' means two or more drivers are conflicting, 'Z' is an intentional high-impedance (tri-state) output, and '-' represents a don't-care condition used in synthesis.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> std_logic and std_logic_vector</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 3</p>

<p style="color: #333; line-height: 1.75;">What is the fundamental difference between concurrent signal assignments (outside a process) and sequential statements (inside a process) in VHDL?</p>

<div class="upper-alpha" markdown>
1. Concurrent assignments all execute simultaneously like physical wires; sequential statements execute top-to-bottom like software code
2. Concurrent assignments are synthesizable but sequential statements are only for simulation
3. Sequential statements produce faster hardware because they execute in order
4. Concurrent assignments can only describe combinational logic while sequential statements describe only sequential logic
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: A</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">Concurrent signal assignments in VHDL model hardware wires that are always active and continuously driven—their order in the source code does not matter. Inside a process, statements execute sequentially from top to bottom when the process is activated, similar to software. However, the process itself is a concurrent statement that runs in parallel with other concurrent statements. Both concurrent and sequential statements are synthesizable and can describe either combinational or sequential logic.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Concurrent Signal Assignment</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 4</p>

<p style="color: #333; line-height: 1.75;">Why does an incomplete <code>if</code> statement (missing <code>else</code> clause) inside a combinational process cause synthesis to infer a latch?</p>

<div class="upper-alpha" markdown>
1. The synthesis tool interprets missing branches as a timing constraint violation
2. VHDL requires all `if` statements to have `else` clauses by language specification
3. Without an `else` clause, the signal must retain its previous value when the condition is false, requiring a memory element
4. Latches are always inferred from `if` statements regardless of whether an `else` clause is present
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: C</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">In a combinational process, every output signal must be assigned a value for every possible input combination. When an <code>if</code> statement lacks an <code>else</code> clause, the signal has no new assignment when the condition is false, so it must "remember" its previous value. This memory behavior requires a latch—an unintended storage element. The solution is to either provide an <code>else</code> clause or use a default assignment at the beginning of the process.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Combinational Logic in VHDL</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 5</p>

<p style="color: #333; line-height: 1.75;">Given the VHDL concurrent statement <code>y <= d0 when sel = "00" else d1 when sel = "01" else d2 when sel = "10" else d3;</code>, what hardware structure does this synthesize to?</p>

<div class="upper-alpha" markdown>
1. A priority encoder
2. A 4:1 multiplexer
3. A 2-to-4 decoder
4. A 4-bit register
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: B</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">The <code>when-else</code> conditional signal assignment implements a priority-encoded selection, which synthesizes to a 4:1 multiplexer. The 2-bit <code>sel</code> signal selects among four data inputs (<code>d0</code> through <code>d3</code>), routing the selected input to the output <code>y</code>. This directly implements the MUX concept from Unit 8 in VHDL syntax.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Conditional Signal Assignment (when-else)</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 6</p>

<p style="color: #333; line-height: 1.75;">Which VHDL code pattern correctly describes a D flip-flop with asynchronous reset?</p>

<div class="upper-alpha" markdown>
1. Process with `clk` and `rst` in the sensitivity list; `if rst='1' then` checked before `elsif rising_edge(clk)`
2. Process with only `clk` in the sensitivity list; `if rst='1' then` checked inside `if rising_edge(clk)`
3. Concurrent assignment: `q <= d when rising_edge(clk) else '0' when rst='1'`
4. Process with only `rst` in the sensitivity list; `if rising_edge(clk)` nested inside `if rst='0'`
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: A</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">An asynchronous reset takes effect immediately, regardless of the clock. The correct pattern includes both <code>clk</code> and <code>rst</code> in the sensitivity list (so the process responds to changes in either signal), with the reset condition checked first (<code>if rst='1' then q <= '0';</code>) and the clock edge checked second (<code>elsif rising_edge(clk) then q <= d;</code>). Option B describes a synchronous reset (checked only at clock edges). Options C and D are syntactically incorrect.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> D Flip-Flop in VHDL</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 7</p>

<p style="color: #333; line-height: 1.75;">A VHDL counter uses an internal <code>unsigned</code> signal <code>cnt</code> and an output port <code>count</code> of type <code>std_logic_vector</code>. Which statement correctly drives the output port?</p>

<div class="upper-alpha" markdown>
1. `count <= cnt;`
2. `count <= integer(cnt);`
3. `count <= to_unsigned(cnt);`
4. `count <= std_logic_vector(cnt);`
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: D</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">VHDL is strongly typed—you cannot directly assign an <code>unsigned</code> value to a <code>std_logic_vector</code> port without explicit type conversion. The <code>std_logic_vector()</code> function from the <code>ieee.numeric_std</code> library converts the <code>unsigned</code> signal to <code>std_logic_vector</code> for the output port. Option A fails with a type mismatch error. Option B converts to <code>integer</code>, which is incompatible with <code>std_logic_vector</code>. Option C has the wrong conversion direction.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> VHDL Data Types / Counters in VHDL</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 8</p>

<p style="color: #333; line-height: 1.75;">In a two-process FSM, the combinational process begins with <code>next_state <= current_state;</code> as a default assignment before the <code>case</code> statement. What is the purpose of this default?</p>

<div class="upper-alpha" markdown>
1. It initializes the FSM to a known power-on state
2. It prevents the FSM from ever entering an illegal state encoding
3. It ensures the state holds by default, preventing latch inference for transitions not explicitly listed in the case branches
4. It forces the synthesis tool to use flip-flops instead of latches for the state register
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: C</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">The default assignment <code>next_state <= current_state;</code> ensures that <code>next_state</code> always has a defined value, even for state/input combinations not explicitly covered in the case branches. Without this default, any missing branch would leave <code>next_state</code> unassigned for that condition, causing the synthesis tool to infer a latch to hold the previous value. The default says "stay in the current state unless a case branch explicitly changes it," which is both the desired behavior and the correct way to prevent unintended latches.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Finite State Machines in VHDL</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 9</p>

<p style="color: #333; line-height: 1.75;">Consider these two VHDL output assignments in an FSM: (1) <code>output <= '1' when current_state = S1 else '0';</code> and (2) <code>output <= '1' when (current_state = S1 and input_sig = '1') else '0';</code>. What is the key behavioral difference?</p>

<div class="upper-alpha" markdown>
1. Statement (1) produces a registered output; statement (2) produces a combinational output
2. Statement (1) implements a Moore output (depends only on state); statement (2) implements a Mealy output (depends on state and input)
3. Statement (1) is synthesizable; statement (2) is valid only in simulation
4. Statement (1) has higher propagation delay because it evaluates all states
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: B</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">Statement (1) is a Moore output because it depends only on <code>current_state</code>—the output is '1' whenever the FSM is in state S1, regardless of input values. Statement (2) is a Mealy output because it depends on both <code>current_state</code> and <code>input_sig</code>—the output is '1' only when the FSM is in S1 AND the input is '1'. This directly corresponds to the Moore vs Mealy machine distinction from Unit 10: Moore outputs are associated with states, Mealy outputs are associated with state-input combinations.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Finite State Machines in VHDL / Moore vs Mealy</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 10</p>

<p style="color: #333; line-height: 1.75;">A student's VHDL testbench uses <code>wait for 10 ns;</code> delays and <code>assert</code> statements to verify a design. Simulation passes all tests, but the design fails when programmed onto an FPGA. Which evaluation best explains why?</p>

<div class="upper-alpha" markdown>
1. The `assert` statements suppressed error messages during simulation
2. The `wait for` delays are too short to detect timing-related bugs
3. VHDL testbenches inherently cannot verify combinational logic correctness
4. Simulation uses ideal zero-delay logic models; the real hardware has propagation delays and timing constraints that the testbench did not exercise
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: D</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">Functional simulation in VHDL uses ideal models where gates have zero propagation delay (unless explicitly specified with <code>after</code> clauses, which are ignored by synthesis). This means simulation verifies logical correctness but not timing correctness. In real hardware, signals have finite propagation delays, and setup/hold time violations can cause incorrect behavior that simulation would not reveal. This is why the FPGA design flow includes static timing analysis after place-and-route—to catch timing violations that functional simulation misses.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Synthesis vs Simulation</p>
</div>
</details>

</div>

---

<h2 style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">Answers Summary</h2>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

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

</div>

</div>
