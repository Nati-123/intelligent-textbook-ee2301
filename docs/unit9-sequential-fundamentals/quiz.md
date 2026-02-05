---
title: Unit 9 Quiz - Sequential Logic Fundamentals
description: Test your understanding of latches, flip-flops, timing, and clock signals
---

# Quiz: Sequential Logic Fundamentals

Test your understanding of latches, flip-flops, timing parameters, and sequential circuit concepts with these questions.

---

#### 1. What is the fundamental difference between combinational and sequential logic circuits?

<div class="upper-alpha" markdown>
1. Sequential circuits are faster
2. Sequential circuits have memory; their outputs depend on past inputs
3. Combinational circuits use more gates
4. Combinational circuits require clock signals
</div>

??? question "Show Answer"
    The correct answer is **B**. Sequential circuits incorporate memory elements that allow outputs to depend on both current inputs and past history (stored state). Combinational circuits have outputs determined solely by current input values.

    **Concept Tested:** Combinational vs Sequential Logic

---

#### 2. What causes the "invalid state" in an SR latch?

<div class="upper-alpha" markdown>
1. S=0 and R=0
2. S=0 and R=1
3. S=1 and R=0
4. S=1 and R=1
</div>

??? question "Show Answer"
    The correct answer is **D**. When both S=1 and R=1 in a NOR-based SR latch, both outputs are forced to 0, violating the complementary relationship (Q should equal Q'). When both inputs return to 0, the resulting state is unpredictable.

    **Concept Tested:** Invalid States in SR Latches

---

#### 3. How does a D latch eliminate the invalid state problem of an SR latch?

<div class="upper-alpha" markdown>
1. By adding more gates
2. By using only NAND gates
3. By connecting S=D and R=D', making S=R=1 impossible
4. By operating at higher speed
</div>

??? question "Show Answer"
    The correct answer is **C**. In a D latch, the Set input equals D and the Reset input equals D' (the complement of D). Since D and D' can never both be 1 simultaneously, the invalid condition S=R=1 is structurally impossible.

    **Concept Tested:** D Latch (Transparent Latch)

---

#### 4. What does "transparent" mean for a D latch when enabled?

<div class="upper-alpha" markdown>
1. The latch becomes invisible in the circuit
2. The output directly follows the input
3. The latch resets to zero
4. The latch ignores the clock signal
</div>

??? question "Show Answer"
    The correct answer is **B**. When a D latch is enabled (Enable=1), it is "transparent"—the output Q directly follows the input D. Any change in D immediately appears at Q. This transparency can cause timing problems in synchronous systems.

    **Concept Tested:** Level-Sensitive vs Edge-Triggered

---

#### 5. What is the purpose of using edge-triggered flip-flops instead of level-sensitive latches?

<div class="upper-alpha" markdown>
1. They use less power
2. They prevent multiple state changes during a single clock period
3. They are smaller in size
4. They can store more bits
</div>

??? question "Show Answer"
    The correct answer is **B**. Edge-triggered flip-flops sample their input only at the active clock edge (rising or falling), then ignore input changes until the next active edge. This prevents race conditions and ensures predictable, single-sample-per-clock behavior.

    **Concept Tested:** Edge-Triggered D Flip-Flop

---

#### 6. In a master-slave flip-flop, when does the slave latch capture the master's output?

<div class="upper-alpha" markdown>
1. When the clock is low
2. When the clock is high
3. At the rising edge of the clock
4. When the D input changes
</div>

??? question "Show Answer"
    The correct answer is **C**. In a master-slave configuration, the master captures D when clock is LOW. At the rising edge, the master closes (holding its value) and the slave opens (transferring the master's value to Q). The effective sampling point is the rising edge.

    **Concept Tested:** Master-Slave Flip-Flop Construction

---

#### 7. What operation does a JK flip-flop perform when J=1 and K=1?

<div class="upper-alpha" markdown>
1. Set (Q=1)
2. Reset (Q=0)
3. Hold (no change)
4. Toggle (Q becomes Q')
</div>

??? question "Show Answer"
    The correct answer is **D**. The JK flip-flop defines J=K=1 as the toggle operation, where the output complements its current value (Q becomes Q'). This is the key difference from an SR flip-flop, where S=R=1 is invalid.

    **Concept Tested:** JK Flip-Flop Operation

---

#### 8. What is "setup time" in flip-flop timing?

<div class="upper-alpha" markdown>
1. The time required to power on the flip-flop
2. The minimum time the input must be stable before the clock edge
3. The time for the output to become valid
4. The time between clock pulses
</div>

??? question "Show Answer"
    The correct answer is **B**. Setup time ($t_{setup}$) is the minimum time the data input must be stable before the active clock edge. Violating setup time can cause metastability or incorrect data capture.

    **Concept Tested:** Setup Time Requirements

---

#### 9. What happens if setup or hold time requirements are violated?

<div class="upper-alpha" markdown>
1. The flip-flop operates in reverse
2. The flip-flop may enter a metastable state
3. The clock frequency automatically reduces
4. The output becomes a constant 1
</div>

??? question "Show Answer"
    The correct answer is **B**. Timing violations can cause the flip-flop to enter metastability—an unstable intermediate state between 0 and 1. The flip-flop eventually resolves to a valid state, but the resolution time and final value are unpredictable.

    **Concept Tested:** Metastability Concepts

---

#### 10. What is clock-to-Q delay ($t_{cq}$)?

<div class="upper-alpha" markdown>
1. The time between two clock edges
2. The time from the clock edge until the output becomes valid
3. The time before the clock edge when data must be stable
4. The time between Q and Q' transitions
</div>

??? question "Show Answer"
    The correct answer is **B**. Clock-to-Q delay ($t_{cq}$) is the propagation delay from the active clock edge to when the output Q reaches its new valid value. This parameter affects the maximum operating frequency of sequential circuits.

    **Concept Tested:** Clock-to-Q Delay

---

#### 11. What is the characteristic equation for a T flip-flop?

<div class="upper-alpha" markdown>
1. $Q_{next} = T$
2. $Q_{next} = T \oplus Q$
3. $Q_{next} = T \cdot Q$
4. $Q_{next} = T + Q$
</div>

??? question "Show Answer"
    The correct answer is **B**. The T flip-flop's characteristic equation is $Q_{next} = T \oplus Q$ (T XOR Q). When T=0, Q holds its value. When T=1, Q toggles (complements). This XOR relationship captures both behaviors.

    **Concept Tested:** T Flip-Flop Operation

---

#### 12. In the JK flip-flop excitation table, why are there "don't care" (X) values?

<div class="upper-alpha" markdown>
1. The flip-flop is defective
2. Multiple input combinations produce the same state transition
3. The clock signal is not connected
4. The output is always undefined
</div>

??? question "Show Answer"
    The correct answer is **B**. The JK flip-flop can achieve some state transitions with different input combinations. For example, to maintain Q=0, you can use J=0,K=0 (hold) or J=0,K=1 (reset to 0). This flexibility appears as X values in the excitation table.

    **Concept Tested:** Flip-Flop Excitation Tables

---

## Answers Summary

| Question | Answer | Concept |
|----------|--------|---------|
| 1 | B | Combinational vs Sequential |
| 2 | D | Invalid States in SR Latch |
| 3 | C | D Latch Design |
| 4 | B | Transparent Latch |
| 5 | B | Edge-Triggered vs Level-Sensitive |
| 6 | C | Master-Slave Operation |
| 7 | D | JK Flip-Flop Toggle |
| 8 | B | Setup Time |
| 9 | B | Metastability |
| 10 | B | Clock-to-Q Delay |
| 11 | B | T Flip-Flop Equation |
| 12 | B | Excitation Tables |
