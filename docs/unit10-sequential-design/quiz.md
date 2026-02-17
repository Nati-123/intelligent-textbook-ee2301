---
title: Unit 10 Quiz - Sequential Circuit Design
description: Test your understanding of registers, counters, finite state machines, state assignment, and FSM design methodology
hide:
  - toc
---

# Quiz: Sequential Circuit Design

Test your understanding of shift registers, counter architectures, Moore and Mealy machines, state assignment strategies, and the FSM design procedure with these questions.

---

#### 1. In a 4-bit universal shift register (such as the 74194), what operation does the mode setting $S_1 S_0 = 01$ perform?

<div class="upper-alpha" markdown>
1. Hold (no change to register contents)
2. Shift right (data moves toward LSB, new bit enters at MSB)
3. Shift left (data moves toward MSB, new bit enters at LSB)
4. Parallel load (all four bits loaded simultaneously)
</div>

**Answer:** The correct answer is **B**. The universal shift register uses a 2-bit mode selector to control four operations: $S_1 S_0 = 00$ (hold), $S_1 S_0 = 01$ (shift right), $S_1 S_0 = 10$ (shift left), $S_1 S_0 = 11$ (parallel load). Each flip-flop's D input is driven by a 4-to-1 MUX controlled by $S_1 S_0$, selecting among the current value (hold), the left-neighbor output (shift right), the right-neighbor output (shift left), or the external data input (parallel load).

**Concept Tested:** Universal Shift Register

---

#### 2. A 4-bit Johnson counter (twisted ring counter) starts in state 0000. How many unique states does it cycle through, and what is the sequence?

<div class="upper-alpha" markdown>
1. 16 states: a standard binary count from 0000 to 1111
2. 4 states: a one-hot sequence 0001 → 0010 → 0100 → 1000
3. 8 states: 0000 → 1000 → 1100 → 1110 → 1111 → 0111 → 0011 → 0001
4. 4 states: a Gray code sequence 0000 → 0001 → 0011 → 0010
</div>

**Answer:** The correct answer is **C**. A Johnson counter feeds the complement of the last flip-flop's output ($\overline{Q_0}$) back to the first flip-flop's input, "twisting" the shift register. This doubles the number of unique states compared to a ring counter: $n$ flip-flops produce $2n$ states. For 4 flip-flops: 8 states. The sequence fills with 1s from the left (0000 → 1000 → 1100 → 1110 → 1111), then drains with 0s from the left (1111 → 0111 → 0011 → 0001). Each consecutive state differs by exactly one bit, and each state can be decoded with a single 2-input AND gate examining adjacent flip-flop pairs.

**Concept Tested:** Johnson Counter (Twisted Ring Counter)

---

#### 3. What is the key difference between the output functions of Moore and Mealy finite state machines?

<div class="upper-alpha" markdown>
1. Moore outputs depend only on the current state; Mealy outputs depend on both the current state and the current inputs
2. Moore outputs change asynchronously between clock edges; Mealy outputs change only at clock edges
3. Moore machines cannot implement overlapping sequence detectors; Mealy machines can
4. Moore outputs are always active-low; Mealy outputs are always active-high
</div>

**Answer:** The correct answer is **A**. In a Moore machine, the output function is $O = \lambda(S)$—outputs are associated with states and written inside state circles on the state diagram. In a Mealy machine, $O = \lambda(S, I)$—outputs are associated with transitions and written on the arrows. This means Moore outputs change only at clock edges (when the state changes), while Mealy outputs can change asynchronously whenever inputs change. Moore machines often require more states but produce glitch-free synchronous outputs. Both models are equally powerful in terms of what behaviors they can implement.

**Concept Tested:** Moore Machine Model / Mealy Machine Model

---

#### 4. In a 4-bit synchronous binary up counter using T flip-flops, under what condition does bit $Q_2$ toggle?

<div class="upper-alpha" markdown>
1. On every clock edge regardless of other bit values
2. Only when $Q_0 = 1$
3. Only when both $Q_0 = 1$ AND $Q_1 = 1$ simultaneously
4. Only when $Q_1$ transitions from 1 to 0
</div>

**Answer:** The correct answer is **C**. In a synchronous up counter, bit $i$ toggles when all lower-order bits are simultaneously 1. The toggle equations are: $T_0 = 1$, $T_1 = Q_0$, $T_2 = Q_0 \cdot Q_1$, $T_3 = Q_0 \cdot Q_1 \cdot Q_2$. Observing the binary sequence: $Q_2$ changes between counts 011→100 (all lower bits are 1) and 111→000 (all lower bits are 1). When $Q_0 = Q_1 = 1$, the AND gate produces $T_2 = 1$, causing $Q_2$ to toggle at the next clock edge. Option D describes ripple counter behavior (asynchronous), not synchronous counter behavior.

**Concept Tested:** Synchronous Counter Design / Binary Up Counter

---

#### 5. A mod-10 (BCD decade) counter uses 4 flip-flops and counts from 0000 to 1001. Using the synchronous reset method, what state must the combinational detection logic identify to reset the counter to 0000?

<div class="upper-alpha" markdown>
1. State 1010 (decimal 10)—the first invalid state after 1001
2. State 1001 (decimal 9)—the last valid state
3. State 1111 (decimal 15)—the maximum 4-bit value
4. State 0000 (decimal 0)—the initial state
</div>

**Answer:** The correct answer is **A**. The synchronous reset method lets the counter increment normally through states 0000–1001 (0–9). On the clock edge following state 1001, the counter would naturally advance to 1010 (decimal 10). The detection logic recognizes this state ($Q_3 \cdot \overline{Q_2} \cdot Q_1 \cdot \overline{Q_0}$, or simply $Q_3 \cdot Q_1$ if we exploit that states 1011–1111 never occur) and forces all flip-flops back to 0000. The counter momentarily enters state 1010 for less than one clock period before resetting—in synchronous designs, this transient is resolved within the same clock cycle.

**Concept Tested:** Modulo-N Counters / BCD Counter (Decade Counter)

---

#### 6. In the FSM design procedure using D flip-flops, the transition table shows that the next-state variable $Q_0^+$ equals the input $X$ for every current state. What is the D input equation for flip-flop 0?

<div class="upper-alpha" markdown>
1. $D_0 = Q_0 \cdot X$
2. $D_0 = Q_1 + X$
3. $D_0 = Q_0 \oplus X$
4. $D_0 = X$
</div>

**Answer:** The correct answer is **D**. With D flip-flops, the design relationship is direct: $D_i = Q_i^+$ (the D input equals the desired next-state value for that bit). If the transition table shows that $Q_0^+ = X$ for all current-state and input combinations, then $D_0 = X$. This is one of the key advantages of D flip-flops in FSM design—the next-state expressions from the transition table become the flip-flop input equations directly, without the additional conversion step required by JK or T flip-flops (which use excitation tables).

**Concept Tested:** Next-State Logic Design / FSM Design Procedure

---

#### 7. A designer needs to convert an 8-bit parallel data word into a serial bit stream for transmission over a single-wire link. Which shift register configuration is appropriate?

<div class="upper-alpha" markdown>
1. Serial-In-Serial-Out (SISO)
2. Serial-In-Parallel-Out (SIPO)
3. Parallel-In-Serial-Out (PISO)
4. Parallel-In-Parallel-Out (PIPO)
</div>

**Answer:** The correct answer is **C**. Parallel-to-serial conversion requires a PISO shift register. In one clock cycle, all 8 bits are loaded simultaneously via the parallel inputs (parallel load operation). Then, over the next 8 clock cycles, the bits are shifted out one at a time through the serial output. SISO is for delay lines (serial in, serial out). SIPO performs the inverse operation: serial-to-parallel conversion. PIPO is equivalent to a parallel load register with no shifting capability.

**Concept Tested:** Shift Register Types / PISO Register

---

#### 8. In the "101" overlapping sequence detector (Moore model), after detecting the pattern in state $S_3$ (output $Z = 1$) and receiving input 0, the FSM transitions to $S_2$ instead of returning to $S_0$. What design principle does this transition implement?

<div class="upper-alpha" markdown>
1. Overlap detection: the "1" from the detected "101" can begin a new match, and the new "0" extends it to "10"—matching the first two characters of a potential new "101"
2. Error recovery: transitioning to $S_2$ provides a retry mechanism if the previous detection was incorrect
3. State minimization: skipping $S_0$ reduces the total number of required transitions
4. Power optimization: fewer state transitions between non-adjacent states reduces switching activity
</div>

**Answer:** The correct answer is **A**. Overlapping detection allows the suffix of one detected pattern to serve as the prefix of the next. When the FSM detects "101" (in $S_3$) and receives input 0, the recent history is "...1010". The last two characters "10" match the beginning of a new "101" pattern, so the machine should be in the "received 10" state ($S_2$), not back at the start ($S_0$). If the next input is 1, the machine will detect "101" again immediately. Without this overlap transition (going to $S_0$ instead), the detector would miss overlapping patterns in sequences like "10101" which should produce two detections.

**Concept Tested:** Sequence Detector Design / State Diagram Construction

---

#### 9. One-hot state encoding uses $N$ flip-flops for $N$ states instead of the minimum $\lceil\log_2 N\rceil$. Despite using more flip-flops, why is one-hot encoding often preferred in FPGA implementations?

<div class="upper-alpha" markdown>
1. FPGAs have limited routing resources that specifically favor one-hot encoded designs
2. One-hot encoding produces simpler next-state logic with fewer combinational gate levels, advantageous because FPGAs have abundant flip-flops but each lookup table has limited input capacity
3. Binary encoding cannot represent all state values correctly in FPGA fabric
4. One-hot encoding eliminates the need for a system clock signal
</div>

**Answer:** The correct answer is **B**. In one-hot encoding, each state is identified by a single flip-flop being 1. The next-state logic for each flip-flop is typically a simple OR of AND terms involving one state bit and one input—often fitting within a single LUT. Binary encoding uses fewer flip-flops ($\lceil\log_2 N\rceil$) but the next-state logic involves decoding the full binary state, requiring more LUT inputs and potentially multiple logic levels. Since FPGAs provide flip-flops abundantly (one per LUT), the one-hot trade-off—more flip-flops for simpler, faster logic—is often favorable. For an 8-state FSM: binary uses 3 flip-flops with complex logic, one-hot uses 8 flip-flops with simple 1–2 level logic.

**Concept Tested:** One-Hot State Encoding / State Assignment Strategies

---

#### 10. A 4-bit asynchronous (ripple) counter's outputs occasionally produce incorrect values when sampled by other synchronous logic in the system. A colleague proposes replacing it with a synchronous counter. Is this the correct solution, and why?

<div class="upper-alpha" markdown>
1. No—the problem is caused by clock skew between the counter and the sampling logic, not the counter architecture
2. No—the ripple counter always produces correct final values; the sampling logic needs to be redesigned with additional hold time margin
3. Yes—but only if the counter operates below 1 MHz where propagation delays are negligible
4. Yes—the ripple counter's accumulated propagation delay causes outputs to pass through invalid intermediate states during transitions; a synchronous counter updates all flip-flops simultaneously, eliminating these transient glitches
</div>

**Answer:** The correct answer is **D**. In a ripple counter, each flip-flop is clocked by the previous flip-flop's output, creating a cascade of delays. During the transition from 0111 to 1000, the outputs may momentarily show 0110, 0100, or 0000 as the toggle ripples through the stages (total settling time: $n \times t_{cq}$). If synchronous logic samples the counter during this settling period, it reads an incorrect intermediate value. A synchronous counter clocks all flip-flops from the same clock signal, so all bits transition simultaneously (within one $t_{cq}$) and the outputs are valid after a single flip-flop delay. This eliminates the glitch problem entirely.

**Concept Tested:** Asynchronous (Ripple) Counters / Synchronous Counters

---

## Answers Summary

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
