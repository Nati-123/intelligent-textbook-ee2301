---
title: Unit 9 Quiz - Sequential Logic Fundamentals
description: Test your understanding of latches, flip-flops, timing parameters, metastability, and synchronous design principles
hide:
  - toc
---

<div class="problems-styled" markdown>

<h1 style="color: #5A3EED !important; border-bottom: 3px solid #5A3EED; padding-bottom: 0.4rem; font-weight: 800; margin-bottom: 1.5rem;">Quiz: Sequential Logic Fundamentals</h1>

<p style="color: #555; line-height: 1.85; font-size: 1.05rem; margin-bottom: 2rem;">
Test your understanding of sequential circuits, SR latches, D latches, flip-flop types, timing parameters, metastability, and synchronous design with these questions.
</p>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 1</p>

<p style="color: #333; line-height: 1.75;">What fundamental property distinguishes sequential circuits from combinational circuits?</p>

<div class="upper-alpha" markdown>
1. Sequential circuits use only NAND and NOR gates
2. Sequential circuits incorporate memory through feedback, making outputs depend on both current inputs and stored state
3. Sequential circuits operate at higher clock frequencies than combinational circuits
4. Sequential circuits require fewer gates to implement equivalent functions
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: B</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">Combinational circuits have outputs that depend solely on the current input values—they have no memory and no concept of past events. Sequential circuits use feedback paths to create bistable elements that store binary information, making their outputs depend on both the current inputs and the circuit's internal state (which records the history of past inputs). This memory capability is what enables counters, registers, finite state machines, and ultimately all digital computers.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Combinational vs Sequential Logic</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 2</p>

<p style="color: #333; line-height: 1.75;">What is the characteristic equation of the D flip-flop?</p>

<div class="upper-alpha" markdown>
1. <span class="arithmatex">\(Q_{next} = D \oplus Q\)</span>
2. <span class="arithmatex">\(Q_{next} = DQ' + D'Q\)</span>
3. <span class="arithmatex">\(Q_{next} = D'Q + DQ'\)</span>
4. <span class="arithmatex">\(Q_{next} = D\)</span>
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: D</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">The D flip-flop has the simplest characteristic equation of all flip-flop types: <span class="arithmatex">\(Q_{next} = D\)</span>. The next state always equals the D input value sampled at the active clock edge, regardless of the current state. This simplicity is why D flip-flops dominate modern VLSI design—the straightforward relationship between input and next state makes timing analysis and synthesis tool optimization much easier than with JK or T flip-flops, which require feedback from the current state.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> D Flip-Flop Operation / Flip-Flop Characteristic Tables</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 3</p>

<p style="color: #333; line-height: 1.75;">In an SR latch built from NOR gates, what happens when both S and R are simultaneously driven to 1?</p>

<div class="upper-alpha" markdown>
1. The latch enters a hold state and retains its previous value
2. Both outputs <span class="arithmatex">\(Q\)</span> and <span class="arithmatex">\(Q'\)</span> are forced to 0, violating the complementary output requirement—this is the invalid state
3. The latch toggles its current state, similar to a T flip-flop
4. <span class="arithmatex">\(Q\)</span> is forced to 1 and <span class="arithmatex">\(Q'\)</span> is forced to 0
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: B</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">When <span class="arithmatex">\(S = R = 1\)</span> in a NOR-based SR latch, both NOR gates have at least one input at 1, forcing both outputs to 0: <span class="arithmatex">\(Q = Q' = 0\)</span>. This violates the fundamental requirement that <span class="arithmatex">\(Q\)</span> and <span class="arithmatex">\(Q'\)</span> be complementary. Worse, when both inputs return to 0 simultaneously, the final state is unpredictable—it depends on which input changes last, or the circuit may oscillate or enter a metastable state. The design constraint <span class="arithmatex">\(S \cdot R = 0\)</span> must be enforced when using SR latches.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> SR Latch with NOR Gates / Invalid States in SR Latches</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 4</p>

<p style="color: #333; line-height: 1.75;">What problem does the D latch's "transparency" create in synchronous circuits that include feedback paths?</p>

<div class="upper-alpha" markdown>
1. The latch consumes excessive dynamic power during the transparent phase
2. The latch cannot track fast input changes when enabled
3. The latch introduces excessive propagation delay compared to flip-flops
4. While enabled, changes on D propagate immediately to Q, which can feed back through combinational logic and change D again within the same clock phase, creating a race condition
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: D</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">When a D latch is transparent (enable = 1), the output <span class="arithmatex">\(Q\)</span> tracks the input <span class="arithmatex">\(D\)</span> continuously. If <span class="arithmatex">\(Q\)</span> feeds back through combinational logic to influence <span class="arithmatex">\(D\)</span>, then any change at <span class="arithmatex">\(Q\)</span> can cause <span class="arithmatex">\(D\)</span> to change, which causes <span class="arithmatex">\(Q\)</span> to change again—all within the same clock phase. This race condition means the output may change multiple times and settle at an unpredictable value. Edge-triggered D flip-flops solve this by sampling <span class="arithmatex">\(D\)</span> only at the clock edge instant, breaking the feedback loop for all other times.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> D Latch / Level-Sensitive vs Edge-Triggered</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 5</p>

<p style="color: #333; line-height: 1.75;">A positive-edge-triggered D flip-flop has <span class="arithmatex">\(D = 1\)</span> during a rising clock edge. Then <span class="arithmatex">\(D\)</span> changes to 0 midway through the clock HIGH phase. What value does <span class="arithmatex">\(Q\)</span> hold during the HIGH phase?</p>

<div class="upper-alpha" markdown>
1. <span class="arithmatex">\(Q = 1\)</span>, because the flip-flop captured <span class="arithmatex">\(D = 1\)</span> at the rising edge and ignores all subsequent <span class="arithmatex">\(D\)</span> changes until the next rising edge
2. <span class="arithmatex">\(Q = 0\)</span>, because the flip-flop follows the most recent <span class="arithmatex">\(D\)</span> value
3. <span class="arithmatex">\(Q\)</span> is undefined because <span class="arithmatex">\(D\)</span> changed during the HIGH phase
4. <span class="arithmatex">\(Q\)</span> toggles between 0 and 1 as <span class="arithmatex">\(D\)</span> changes
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: A</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">An edge-triggered flip-flop samples the <span class="arithmatex">\(D\)</span> input only at the instant of the active clock edge (rising edge for positive-edge-triggered). At that moment, <span class="arithmatex">\(D = 1\)</span>, so <span class="arithmatex">\(Q\)</span> becomes 1 after the clock-to-Q delay (<span class="arithmatex">\(t_{cq}\)</span>). All subsequent changes on <span class="arithmatex">\(D\)</span> during the rest of the clock cycle are completely ignored. <span class="arithmatex">\(Q\)</span> remains at 1 until the next rising edge, where <span class="arithmatex">\(D\)</span> will be sampled again. This single-sample-per-cycle behavior is what eliminates the race conditions present in level-sensitive latches.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Edge-Triggered D Flip-Flop / Level-Sensitive vs Edge-Triggered</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 6</p>

<p style="color: #333; line-height: 1.75;">A synchronous circuit path has <span class="arithmatex">\(t_{cq} = 2\)</span> ns (source flip-flop), combinational logic delay <span class="arithmatex">\(t_{logic} = 10\)</span> ns, and <span class="arithmatex">\(t_{setup} = 3\)</span> ns (destination flip-flop). What is the maximum clock frequency for this path?</p>

<div class="upper-alpha" markdown>
1. 100 MHz
2. 66.7 MHz
3. 50 MHz
4. 83.3 MHz
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: B</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">The minimum clock period must accommodate the complete signal path: <span class="arithmatex">\(T_{min} = t_{cq} + t_{logic} + t_{setup} = 2 + 10 + 3 = 15\)</span> ns. The maximum frequency is <span class="arithmatex">\(f_{max} = 1/T_{min} = 1/15 \text{ ns} \approx 66.7\)</span> MHz. If the clock period is shorter than 15 ns, the data from the source flip-flop will not have enough time to propagate through the combinational logic and stabilize at the destination flip-flop's <span class="arithmatex">\(D\)</span> input before the setup time requirement.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Flip-Flop Timing Parameters / Maximum Clock Frequency</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 7</p>

<p style="color: #333; line-height: 1.75;">A T flip-flop has its T input permanently connected to 1 and is clocked by a 10 MHz signal. What is the frequency of the <span class="arithmatex">\(Q\)</span> output signal?</p>

<div class="upper-alpha" markdown>
1. 5 MHz
2. 10 MHz
3. 20 MHz
4. 2.5 MHz
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: A</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">When <span class="arithmatex">\(T = 1\)</span>, the T flip-flop toggles its output on every active clock edge. Each toggle changes <span class="arithmatex">\(Q\)</span> from 0 to 1 or from 1 to 0. Since it takes two toggles (one rising edge and one falling edge of <span class="arithmatex">\(Q\)</span>) to complete one full cycle of the output waveform, the output frequency is exactly half the clock frequency: <span class="arithmatex">\(f_{out} = f_{clk}/2 = 10/2 = 5\)</span> MHz. This frequency-halving property is the basis of ripple counters, where each T flip-flop stage divides the frequency by 2.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> T Flip-Flop Operation / Frequency Division</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 8</p>

<p style="color: #333; line-height: 1.75;">In a positive-edge-triggered master-slave D flip-flop, the master latch is transparent when the clock is LOW and the slave latch is transparent when the clock is HIGH. What prevents data from changing the output <span class="arithmatex">\(Q\)</span> during the clock LOW phase?</p>

<div class="upper-alpha" markdown>
1. The master latch blocks all data when the clock is LOW
2. Both latches are closed during the LOW phase for power savings
3. The slave latch is closed (not transparent) during the clock LOW phase, holding its previous value at <span class="arithmatex">\(Q\)</span> regardless of changes propagating through the master
4. The clock signal disables the feedback paths in both latches simultaneously
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: C</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">During the clock LOW phase, the master latch is transparent and tracks changes on <span class="arithmatex">\(D\)</span>, but the slave latch is closed—it holds whatever value was captured at the previous rising edge. Since <span class="arithmatex">\(Q\)</span> is the slave's output, it remains stable even though the master's internal state may be changing. At the rising edge, the master closes (capturing the final <span class="arithmatex">\(D\)</span> value) and the slave opens (passing the master's captured value to <span class="arithmatex">\(Q\)</span>). This complementary enable scheme ensures <span class="arithmatex">\(Q\)</span> changes only once per clock cycle, precisely at the rising edge.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Master-Slave Flip-Flop Construction</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 9</p>

<p style="color: #333; line-height: 1.75;">Under what condition does a flip-flop enter a metastable state?</p>

<div class="upper-alpha" markdown>
1. When the clock frequency exceeds the flip-flop's maximum rated frequency
2. When the power supply voltage drops below the minimum threshold
3. When the D input changes during the setup or hold time window around the active clock edge, violating the required data stability
4. When multiple flip-flops in a circuit share the same clock signal
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: C</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">Metastability occurs when a timing violation causes the flip-flop's internal node voltages to land near the unstable equilibrium point between the two stable states. This happens when <span class="arithmatex">\(D\)</span> transitions during the setup/hold aperture around the clock edge—the flip-flop "sees" a value that is neither clearly 0 nor clearly 1. The output may hover at an intermediate voltage for an unpredictable duration before eventually resolving to one valid logic level. The probability of remaining metastable decreases exponentially with resolution time, which is why two-stage synchronizer chains are used to sample asynchronous signals.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Metastability Concepts</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 10</p>

<p style="color: #333; line-height: 1.75;">An FPGA design must sample an asynchronous pushbutton signal using the system clock. A junior engineer proposes connecting the button signal directly to the D input of a single flip-flop. What is the correct assessment of this approach?</p>

<div class="upper-alpha" markdown>
1. The approach is sufficient—one flip-flop cleanly samples the signal at each clock edge
2. The approach only fails at clock frequencies above 100 MHz
3. The approach is correct as long as the button signal is hardware-debounced first
4. The approach risks metastability because the asynchronous button signal can violate the flip-flop's setup/hold times at any clock edge; a two-stage synchronizer chain is required to provide adequate resolution time
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: D</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">An asynchronous signal like a pushbutton can change at any time, with no relationship to the system clock. This means it will inevitably violate the setup or hold time of the sampling flip-flop at some point, causing metastability. A single flip-flop provides no resolution time—its potentially metastable output drives downstream logic immediately. A two-stage synchronizer (two flip-flops in series, both clocked by the system clock) gives the first flip-flop an entire clock period to resolve before the second flip-flop samples it, reducing the MTBF to acceptable levels. Debouncing (option C) addresses mechanical bounce but not the metastability problem.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Synchronizer Circuits / Metastability</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Answers Summary</p>

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

</div>

</div>
