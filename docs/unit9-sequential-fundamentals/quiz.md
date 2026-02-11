---
title: Unit 9 Quiz - Sequential Logic Fundamentals
description: Test your understanding of latches, flip-flops, timing parameters, metastability, and synchronous design principles
---

# Quiz: Sequential Logic Fundamentals

Test your understanding of sequential circuits, SR latches, D latches, flip-flop types, timing parameters, metastability, and synchronous design with these questions.

---

#### 1. What fundamental property distinguishes sequential circuits from combinational circuits?

<div class="upper-alpha" markdown>
1. Sequential circuits use only NAND and NOR gates
2. Sequential circuits incorporate memory through feedback, making outputs depend on both current inputs and stored state
3. Sequential circuits operate at higher clock frequencies than combinational circuits
4. Sequential circuits require fewer gates to implement equivalent functions
</div>

**Answer:** The correct answer is **B**. Combinational circuits have outputs that depend solely on the current input values—they have no memory and no concept of past events. Sequential circuits use feedback paths to create bistable elements that store binary information, making their outputs depend on both the current inputs and the circuit's internal state (which records the history of past inputs). This memory capability is what enables counters, registers, finite state machines, and ultimately all digital computers.

**Concept Tested:** Combinational vs Sequential Logic

---

#### 2. What is the characteristic equation of the D flip-flop?

<div class="upper-alpha" markdown>
1. $Q_{next} = D \oplus Q$
2. $Q_{next} = DQ' + D'Q$
3. $Q_{next} = D'Q + DQ'$
4. $Q_{next} = D$
</div>

**Answer:** The correct answer is **D**. The D flip-flop has the simplest characteristic equation of all flip-flop types: $Q_{next} = D$. The next state always equals the D input value sampled at the active clock edge, regardless of the current state. This simplicity is why D flip-flops dominate modern VLSI design—the straightforward relationship between input and next state makes timing analysis and synthesis tool optimization much easier than with JK or T flip-flops, which require feedback from the current state.

**Concept Tested:** D Flip-Flop Operation / Flip-Flop Characteristic Tables

---

#### 3. In an SR latch built from NOR gates, what happens when both S and R are simultaneously driven to 1?

<div class="upper-alpha" markdown>
1. The latch enters a hold state and retains its previous value
2. Both outputs $Q$ and $Q'$ are forced to 0, violating the complementary output requirement—this is the invalid state
3. The latch toggles its current state, similar to a T flip-flop
4. $Q$ is forced to 1 and $Q'$ is forced to 0
</div>

**Answer:** The correct answer is **B**. When $S = R = 1$ in a NOR-based SR latch, both NOR gates have at least one input at 1, forcing both outputs to 0: $Q = Q' = 0$. This violates the fundamental requirement that $Q$ and $Q'$ be complementary. Worse, when both inputs return to 0 simultaneously, the final state is unpredictable—it depends on which input changes last, or the circuit may oscillate or enter a metastable state. The design constraint $S \cdot R = 0$ must be enforced when using SR latches.

**Concept Tested:** SR Latch with NOR Gates / Invalid States in SR Latches

---

#### 4. What problem does the D latch's "transparency" create in synchronous circuits that include feedback paths?

<div class="upper-alpha" markdown>
1. The latch consumes excessive dynamic power during the transparent phase
2. The latch cannot track fast input changes when enabled
3. The latch introduces excessive propagation delay compared to flip-flops
4. While enabled, changes on D propagate immediately to Q, which can feed back through combinational logic and change D again within the same clock phase, creating a race condition
</div>

**Answer:** The correct answer is **D**. When a D latch is transparent (enable = 1), the output $Q$ tracks the input $D$ continuously. If $Q$ feeds back through combinational logic to influence $D$, then any change at $Q$ can cause $D$ to change, which causes $Q$ to change again—all within the same clock phase. This race condition means the output may change multiple times and settle at an unpredictable value. Edge-triggered D flip-flops solve this by sampling $D$ only at the clock edge instant, breaking the feedback loop for all other times.

**Concept Tested:** D Latch / Level-Sensitive vs Edge-Triggered

---

#### 5. A positive-edge-triggered D flip-flop has $D = 1$ during a rising clock edge. Then $D$ changes to 0 midway through the clock HIGH phase. What value does $Q$ hold during the HIGH phase?

<div class="upper-alpha" markdown>
1. $Q = 1$, because the flip-flop captured $D = 1$ at the rising edge and ignores all subsequent $D$ changes until the next rising edge
2. $Q = 0$, because the flip-flop follows the most recent $D$ value
3. $Q$ is undefined because $D$ changed during the HIGH phase
4. $Q$ toggles between 0 and 1 as $D$ changes
</div>

**Answer:** The correct answer is **A**. An edge-triggered flip-flop samples the $D$ input only at the instant of the active clock edge (rising edge for positive-edge-triggered). At that moment, $D = 1$, so $Q$ becomes 1 after the clock-to-Q delay ($t_{cq}$). All subsequent changes on $D$ during the rest of the clock cycle are completely ignored. $Q$ remains at 1 until the next rising edge, where $D$ will be sampled again. This single-sample-per-cycle behavior is what eliminates the race conditions present in level-sensitive latches.

**Concept Tested:** Edge-Triggered D Flip-Flop / Level-Sensitive vs Edge-Triggered

---

#### 6. A synchronous circuit path has $t_{cq} = 2$ ns (source flip-flop), combinational logic delay $t_{logic} = 10$ ns, and $t_{setup} = 3$ ns (destination flip-flop). What is the maximum clock frequency for this path?

<div class="upper-alpha" markdown>
1. 100 MHz
2. 66.7 MHz
3. 50 MHz
4. 83.3 MHz
</div>

**Answer:** The correct answer is **B**. The minimum clock period must accommodate the complete signal path: $T_{min} = t_{cq} + t_{logic} + t_{setup} = 2 + 10 + 3 = 15$ ns. The maximum frequency is $f_{max} = 1/T_{min} = 1/15 \text{ ns} \approx 66.7$ MHz. If the clock period is shorter than 15 ns, the data from the source flip-flop will not have enough time to propagate through the combinational logic and stabilize at the destination flip-flop's $D$ input before the setup time requirement.

**Concept Tested:** Flip-Flop Timing Parameters / Maximum Clock Frequency

---

#### 7. A T flip-flop has its T input permanently connected to 1 and is clocked by a 10 MHz signal. What is the frequency of the $Q$ output signal?

<div class="upper-alpha" markdown>
1. 5 MHz
2. 10 MHz
3. 20 MHz
4. 2.5 MHz
</div>

**Answer:** The correct answer is **A**. When $T = 1$, the T flip-flop toggles its output on every active clock edge. Each toggle changes $Q$ from 0 to 1 or from 1 to 0. Since it takes two toggles (one rising edge and one falling edge of $Q$) to complete one full cycle of the output waveform, the output frequency is exactly half the clock frequency: $f_{out} = f_{clk}/2 = 10/2 = 5$ MHz. This frequency-halving property is the basis of ripple counters, where each T flip-flop stage divides the frequency by 2.

**Concept Tested:** T Flip-Flop Operation / Frequency Division

---

#### 8. In a positive-edge-triggered master-slave D flip-flop, the master latch is transparent when the clock is LOW and the slave latch is transparent when the clock is HIGH. What prevents data from changing the output $Q$ during the clock LOW phase?

<div class="upper-alpha" markdown>
1. The master latch blocks all data when the clock is LOW
2. Both latches are closed during the LOW phase for power savings
3. The slave latch is closed (not transparent) during the clock LOW phase, holding its previous value at $Q$ regardless of changes propagating through the master
4. The clock signal disables the feedback paths in both latches simultaneously
</div>

**Answer:** The correct answer is **C**. During the clock LOW phase, the master latch is transparent and tracks changes on $D$, but the slave latch is closed—it holds whatever value was captured at the previous rising edge. Since $Q$ is the slave's output, it remains stable even though the master's internal state may be changing. At the rising edge, the master closes (capturing the final $D$ value) and the slave opens (passing the master's captured value to $Q$). This complementary enable scheme ensures $Q$ changes only once per clock cycle, precisely at the rising edge.

**Concept Tested:** Master-Slave Flip-Flop Construction

---

#### 9. Under what condition does a flip-flop enter a metastable state?

<div class="upper-alpha" markdown>
1. When the clock frequency exceeds the flip-flop's maximum rated frequency
2. When the power supply voltage drops below the minimum threshold
3. When the D input changes during the setup or hold time window around the active clock edge, violating the required data stability
4. When multiple flip-flops in a circuit share the same clock signal
</div>

**Answer:** The correct answer is **C**. Metastability occurs when a timing violation causes the flip-flop's internal node voltages to land near the unstable equilibrium point between the two stable states. This happens when $D$ transitions during the setup/hold aperture around the clock edge—the flip-flop "sees" a value that is neither clearly 0 nor clearly 1. The output may hover at an intermediate voltage for an unpredictable duration before eventually resolving to one valid logic level. The probability of remaining metastable decreases exponentially with resolution time, which is why two-stage synchronizer chains are used to sample asynchronous signals.

**Concept Tested:** Metastability Concepts

---

#### 10. An FPGA design must sample an asynchronous pushbutton signal using the system clock. A junior engineer proposes connecting the button signal directly to the D input of a single flip-flop. What is the correct assessment of this approach?

<div class="upper-alpha" markdown>
1. The approach is sufficient—one flip-flop cleanly samples the signal at each clock edge
2. The approach only fails at clock frequencies above 100 MHz
3. The approach is correct as long as the button signal is hardware-debounced first
4. The approach risks metastability because the asynchronous button signal can violate the flip-flop's setup/hold times at any clock edge; a two-stage synchronizer chain is required to provide adequate resolution time
</div>

**Answer:** The correct answer is **D**. An asynchronous signal like a pushbutton can change at any time, with no relationship to the system clock. This means it will inevitably violate the setup or hold time of the sampling flip-flop at some point, causing metastability. A single flip-flop provides no resolution time—its potentially metastable output drives downstream logic immediately. A two-stage synchronizer (two flip-flops in series, both clocked by the system clock) gives the first flip-flop an entire clock period to resolve before the second flip-flop samples it, reducing the MTBF to acceptable levels. Debouncing (option C) addresses mechanical bounce but not the metastability problem.

**Concept Tested:** Synchronizer Circuits / Metastability

---

## Answers Summary

| Question | Answer | Concept |
|----------|--------|---------|
| 1 | B | Combinational vs Sequential Logic |
| 2 | D | D Flip-Flop Characteristic Equation |
| 3 | B | SR Latch Invalid State |
| 4 | D | D Latch Transparency Problem |
| 5 | A | Edge-Triggered D Flip-Flop |
| 6 | B | Timing Parameters / Max Clock Frequency |
| 7 | A | T Flip-Flop / Frequency Division |
| 8 | C | Master-Slave Flip-Flop Construction |
| 9 | C | Metastability Concepts |
| 10 | D | Synchronizer Circuits |
