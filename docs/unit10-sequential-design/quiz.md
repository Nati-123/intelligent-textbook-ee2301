---
title: Unit 10 Quiz - Sequential Circuit Design
description: Test your understanding of registers, counters, finite state machines, state assignment, and FSM design methodology
hide:
  - toc
---

<div class="problems-styled" markdown>

<h1 style="color: #5A3EED !important; border-bottom: 3px solid #5A3EED; padding-bottom: 0.4rem; font-weight: 800; margin-bottom: 1.5rem;">Quiz: Sequential Circuit Design</h1>

<p style="color: #555; line-height: 1.85; font-size: 1.05rem; margin-bottom: 2rem;">
Test your understanding of shift registers, counter architectures, Moore and Mealy machines, state assignment strategies, and the FSM design procedure with these questions.
</p>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 1</p>

<p style="color: #333; line-height: 1.75;">In a 4-bit universal shift register (such as the 74194), what operation does the mode setting <span class="arithmatex">\(S_1 S_0 = 01\)</span> perform?</p>

<div class="upper-alpha" markdown>
1. Hold (no change to register contents)
2. Shift right (data moves toward LSB, new bit enters at MSB)
3. Shift left (data moves toward MSB, new bit enters at LSB)
4. Parallel load (all four bits loaded simultaneously)
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: B</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">The universal shift register uses a 2-bit mode selector to control four operations: <span class="arithmatex">\(S_1 S_0 = 00\)</span> (hold), <span class="arithmatex">\(S_1 S_0 = 01\)</span> (shift right), <span class="arithmatex">\(S_1 S_0 = 10\)</span> (shift left), <span class="arithmatex">\(S_1 S_0 = 11\)</span> (parallel load). Each flip-flop's D input is driven by a 4-to-1 MUX controlled by <span class="arithmatex">\(S_1 S_0\)</span>, selecting among the current value (hold), the left-neighbor output (shift right), the right-neighbor output (shift left), or the external data input (parallel load).</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Universal Shift Register</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 2</p>

<p style="color: #333; line-height: 1.75;">A 4-bit Johnson counter (twisted ring counter) starts in state 0000. How many unique states does it cycle through, and what is the sequence?</p>

<div class="upper-alpha" markdown>
1. 16 states: a standard binary count from 0000 to 1111
2. 4 states: a one-hot sequence 0001 → 0010 → 0100 → 1000
3. 8 states: 0000 → 1000 → 1100 → 1110 → 1111 → 0111 → 0011 → 0001
4. 4 states: a Gray code sequence 0000 → 0001 → 0011 → 0010
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: C</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">A Johnson counter feeds the complement of the last flip-flop's output (<span class="arithmatex">\(\overline{Q_0}\)</span>) back to the first flip-flop's input, "twisting" the shift register. This doubles the number of unique states compared to a ring counter: <span class="arithmatex">\(n\)</span> flip-flops produce <span class="arithmatex">\(2n\)</span> states. For 4 flip-flops: 8 states. The sequence fills with 1s from the left (0000 → 1000 → 1100 → 1110 → 1111), then drains with 0s from the left (1111 → 0111 → 0011 → 0001). Each consecutive state differs by exactly one bit, and each state can be decoded with a single 2-input AND gate examining adjacent flip-flop pairs.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Johnson Counter (Twisted Ring Counter)</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 3</p>

<p style="color: #333; line-height: 1.75;">What is the key difference between the output functions of Moore and Mealy finite state machines?</p>

<div class="upper-alpha" markdown>
1. Moore outputs depend only on the current state; Mealy outputs depend on both the current state and the current inputs
2. Moore outputs change asynchronously between clock edges; Mealy outputs change only at clock edges
3. Moore machines cannot implement overlapping sequence detectors; Mealy machines can
4. Moore outputs are always active-low; Mealy outputs are always active-high
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: A</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">In a Moore machine, the output function is <span class="arithmatex">\(O = \lambda(S)\)</span>—outputs are associated with states and written inside state circles on the state diagram. In a Mealy machine, <span class="arithmatex">\(O = \lambda(S, I)\)</span>—outputs are associated with transitions and written on the arrows. This means Moore outputs change only at clock edges (when the state changes), while Mealy outputs can change asynchronously whenever inputs change. Moore machines often require more states but produce glitch-free synchronous outputs. Both models are equally powerful in terms of what behaviors they can implement.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Moore Machine Model / Mealy Machine Model</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 4</p>

<p style="color: #333; line-height: 1.75;">In a 4-bit synchronous binary up counter using T flip-flops, under what condition does bit <span class="arithmatex">\(Q_2\)</span> toggle?</p>

<div class="upper-alpha" markdown>
1. On every clock edge regardless of other bit values
2. Only when <span class="arithmatex">\(Q_0 = 1\)</span>
3. Only when both <span class="arithmatex">\(Q_0 = 1\)</span> AND <span class="arithmatex">\(Q_1 = 1\)</span> simultaneously
4. Only when <span class="arithmatex">\(Q_1\)</span> transitions from 1 to 0
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: C</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">In a synchronous up counter, bit <span class="arithmatex">\(i\)</span> toggles when all lower-order bits are simultaneously 1. The toggle equations are: <span class="arithmatex">\(T_0 = 1\)</span>, <span class="arithmatex">\(T_1 = Q_0\)</span>, <span class="arithmatex">\(T_2 = Q_0 \cdot Q_1\)</span>, <span class="arithmatex">\(T_3 = Q_0 \cdot Q_1 \cdot Q_2\)</span>. Observing the binary sequence: <span class="arithmatex">\(Q_2\)</span> changes between counts 011→100 (all lower bits are 1) and 111→000 (all lower bits are 1). When <span class="arithmatex">\(Q_0 = Q_1 = 1\)</span>, the AND gate produces <span class="arithmatex">\(T_2 = 1\)</span>, causing <span class="arithmatex">\(Q_2\)</span> to toggle at the next clock edge. Option D describes ripple counter behavior (asynchronous), not synchronous counter behavior.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Synchronous Counter Design / Binary Up Counter</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 5</p>

<p style="color: #333; line-height: 1.75;">A mod-10 (BCD decade) counter uses 4 flip-flops and counts from 0000 to 1001. Using the synchronous reset method, what state must the combinational detection logic identify to reset the counter to 0000?</p>

<div class="upper-alpha" markdown>
1. State 1010 (decimal 10)—the first invalid state after 1001
2. State 1001 (decimal 9)—the last valid state
3. State 1111 (decimal 15)—the maximum 4-bit value
4. State 0000 (decimal 0)—the initial state
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: A</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">The synchronous reset method lets the counter increment normally through states 0000–1001 (0–9). On the clock edge following state 1001, the counter would naturally advance to 1010 (decimal 10). The detection logic recognizes this state (<span class="arithmatex">\(Q_3 \cdot \overline{Q_2} \cdot Q_1 \cdot \overline{Q_0}\)</span>, or simply <span class="arithmatex">\(Q_3 \cdot Q_1\)</span> if we exploit that states 1011–1111 never occur) and forces all flip-flops back to 0000. The counter momentarily enters state 1010 for less than one clock period before resetting—in synchronous designs, this transient is resolved within the same clock cycle.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Modulo-N Counters / BCD Counter (Decade Counter)</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 6</p>

<p style="color: #333; line-height: 1.75;">In the FSM design procedure using D flip-flops, the transition table shows that the next-state variable <span class="arithmatex">\(Q_0^+\)</span> equals the input <span class="arithmatex">\(X\)</span> for every current state. What is the D input equation for flip-flop 0?</p>

<div class="upper-alpha" markdown>
1. <span class="arithmatex">\(D_0 = Q_0 \cdot X\)</span>
2. <span class="arithmatex">\(D_0 = Q_1 + X\)</span>
3. <span class="arithmatex">\(D_0 = Q_0 \oplus X\)</span>
4. <span class="arithmatex">\(D_0 = X\)</span>
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: D</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">With D flip-flops, the design relationship is direct: <span class="arithmatex">\(D_i = Q_i^+\)</span> (the D input equals the desired next-state value for that bit). If the transition table shows that <span class="arithmatex">\(Q_0^+ = X\)</span> for all current-state and input combinations, then <span class="arithmatex">\(D_0 = X\)</span>. This is one of the key advantages of D flip-flops in FSM design—the next-state expressions from the transition table become the flip-flop input equations directly, without the additional conversion step required by JK or T flip-flops (which use excitation tables).</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Next-State Logic Design / FSM Design Procedure</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 7</p>

<p style="color: #333; line-height: 1.75;">A designer needs to convert an 8-bit parallel data word into a serial bit stream for transmission over a single-wire link. Which shift register configuration is appropriate?</p>

<div class="upper-alpha" markdown>
1. Serial-In-Serial-Out (SISO)
2. Serial-In-Parallel-Out (SIPO)
3. Parallel-In-Serial-Out (PISO)
4. Parallel-In-Parallel-Out (PIPO)
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: C</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">Parallel-to-serial conversion requires a PISO shift register. In one clock cycle, all 8 bits are loaded simultaneously via the parallel inputs (parallel load operation). Then, over the next 8 clock cycles, the bits are shifted out one at a time through the serial output. SISO is for delay lines (serial in, serial out). SIPO performs the inverse operation: serial-to-parallel conversion. PIPO is equivalent to a parallel load register with no shifting capability.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Shift Register Types / PISO Register</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 8</p>

<p style="color: #333; line-height: 1.75;">In the "101" overlapping sequence detector (Moore model), after detecting the pattern in state <span class="arithmatex">\(S_3\)</span> (output <span class="arithmatex">\(Z = 1\)</span>) and receiving input 0, the FSM transitions to <span class="arithmatex">\(S_2\)</span> instead of returning to <span class="arithmatex">\(S_0\)</span>. What design principle does this transition implement?</p>

<div class="upper-alpha" markdown>
1. Overlap detection: the "1" from the detected "101" can begin a new match, and the new "0" extends it to "10"—matching the first two characters of a potential new "101"
2. Error recovery: transitioning to <span class="arithmatex">\(S_2\)</span> provides a retry mechanism if the previous detection was incorrect
3. State minimization: skipping <span class="arithmatex">\(S_0\)</span> reduces the total number of required transitions
4. Power optimization: fewer state transitions between non-adjacent states reduces switching activity
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: A</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">Overlapping detection allows the suffix of one detected pattern to serve as the prefix of the next. When the FSM detects "101" (in <span class="arithmatex">\(S_3\)</span>) and receives input 0, the recent history is "...1010". The last two characters "10" match the beginning of a new "101" pattern, so the machine should be in the "received 10" state (<span class="arithmatex">\(S_2\)</span>), not back at the start (<span class="arithmatex">\(S_0\)</span>). If the next input is 1, the machine will detect "101" again immediately. Without this overlap transition (going to <span class="arithmatex">\(S_0\)</span> instead), the detector would miss overlapping patterns in sequences like "10101" which should produce two detections.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Sequence Detector Design / State Diagram Construction</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 9</p>

<p style="color: #333; line-height: 1.75;">One-hot state encoding uses <span class="arithmatex">\(N\)</span> flip-flops for <span class="arithmatex">\(N\)</span> states instead of the minimum <span class="arithmatex">\(\lceil\log_2 N\rceil\)</span>. Despite using more flip-flops, why is one-hot encoding often preferred in FPGA implementations?</p>

<div class="upper-alpha" markdown>
1. FPGAs have limited routing resources that specifically favor one-hot encoded designs
2. One-hot encoding produces simpler next-state logic with fewer combinational gate levels, advantageous because FPGAs have abundant flip-flops but each lookup table has limited input capacity
3. Binary encoding cannot represent all state values correctly in FPGA fabric
4. One-hot encoding eliminates the need for a system clock signal
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: B</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">In one-hot encoding, each state is identified by a single flip-flop being 1. The next-state logic for each flip-flop is typically a simple OR of AND terms involving one state bit and one input—often fitting within a single LUT. Binary encoding uses fewer flip-flops (<span class="arithmatex">\(\lceil\log_2 N\rceil\)</span>) but the next-state logic involves decoding the full binary state, requiring more LUT inputs and potentially multiple logic levels. Since FPGAs provide flip-flops abundantly (one per LUT), the one-hot trade-off—more flip-flops for simpler, faster logic—is often favorable. For an 8-state FSM: binary uses 3 flip-flops with complex logic, one-hot uses 8 flip-flops with simple 1–2 level logic.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> One-Hot State Encoding / State Assignment Strategies</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 10</p>

<p style="color: #333; line-height: 1.75;">A 4-bit asynchronous (ripple) counter's outputs occasionally produce incorrect values when sampled by other synchronous logic in the system. A colleague proposes replacing it with a synchronous counter. Is this the correct solution, and why?</p>

<div class="upper-alpha" markdown>
1. No—the problem is caused by clock skew between the counter and the sampling logic, not the counter architecture
2. No—the ripple counter always produces correct final values; the sampling logic needs to be redesigned with additional hold time margin
3. Yes—but only if the counter operates below 1 MHz where propagation delays are negligible
4. Yes—the ripple counter's accumulated propagation delay causes outputs to pass through invalid intermediate states during transitions; a synchronous counter updates all flip-flops simultaneously, eliminating these transient glitches
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: D</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">In a ripple counter, each flip-flop is clocked by the previous flip-flop's output, creating a cascade of delays. During the transition from 0111 to 1000, the outputs may momentarily show 0110, 0100, or 0000 as the toggle ripples through the stages (total settling time: <span class="arithmatex">\(n \times t_{cq}\)</span>). If synchronous logic samples the counter during this settling period, it reads an incorrect intermediate value. A synchronous counter clocks all flip-flops from the same clock signal, so all bits transition simultaneously (within one <span class="arithmatex">\(t_{cq}\)</span>) and the outputs are valid after a single flip-flop delay. This eliminates the glitch problem entirely.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Asynchronous (Ripple) Counters / Synchronous Counters</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Answers Summary</p>

| Question | Answer | Concept |
|----------|--------|---------|
| 1 | B | Universal Shift Register |
| 2 | C | Johnson Counter |
| 3 | A | Moore vs Mealy FSM Models |
| 4 | C | Synchronous Counter Toggle Logic |
| 5 | A | Modulo-N / BCD Counter |
| 6 | D | Next-State Logic / D Flip-Flop Design |
| 7 | C | PISO Shift Register |
| 8 | A | Sequence Detector / Overlap Detection |
| 9 | B | One-Hot State Encoding |
| 10 | D | Ripple vs Synchronous Counter |

</div>

</div>
