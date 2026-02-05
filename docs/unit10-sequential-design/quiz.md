---
title: Unit 10 Quiz - Sequential Circuit Design
description: Test your understanding of registers, counters, and finite state machine design
---

# Quiz: Sequential Circuit Design

Test your understanding of registers, counters, state machines, and FSM design methodology with these questions.

---

#### 1. What is the primary function of a parallel load register?

<div class="upper-alpha" markdown>
1. To shift data one bit at a time
2. To load all bits simultaneously from parallel inputs
3. To count binary numbers
4. To generate random numbers
</div>

??? question "Show Answer"
    The correct answer is **B**. A parallel load register can load all bits at once from parallel input lines on a single clock edge when the Load signal is active, as opposed to shift registers that move data one bit at a time.

    **Concept Tested:** Parallel Load Registers

---

#### 2. What type of shift register accepts serial input and provides parallel output?

<div class="upper-alpha" markdown>
1. SISO
2. SIPO
3. PISO
4. PIPO
</div>

??? question "Show Answer"
    The correct answer is **B**. SIPO stands for Serial-In-Parallel-Out. Data enters serially (one bit at a time) and after all bits are shifted in, the entire word can be read from parallel outputs. This is used for serial-to-parallel conversion.

    **Concept Tested:** Serial-In-Parallel-Out (SIPO) Register

---

#### 3. What is the main disadvantage of asynchronous (ripple) counters?

<div class="upper-alpha" markdown>
1. They use too many flip-flops
2. They cannot count past 15
3. Accumulated propagation delay causes outputs to not change simultaneously
4. They require external clock signals
</div>

??? question "Show Answer"
    The correct answer is **C**. In ripple counters, each flip-flop is triggered by the previous one, causing propagation delay to accumulate. The MSB changes much later than the LSB, creating invalid intermediate states and limiting maximum counting speed.

    **Concept Tested:** Asynchronous (Ripple) Counters

---

#### 4. In a 4-bit synchronous up counter using T flip-flops, what is the toggle condition for bit Q2?

<div class="upper-alpha" markdown>
1. T2 = 1 (always toggle)
2. T2 = Q0
3. T2 = Q0 · Q1
4. T2 = Q0 · Q1 · Q2
</div>

??? question "Show Answer"
    The correct answer is **C**. In a synchronous binary up counter, each bit toggles when all less significant bits are 1. So Q2 toggles when Q1=1 AND Q0=1, giving T2 = Q0·Q1.

    **Concept Tested:** Binary Up Counter Design

---

#### 5. How many states does a 4-bit Johnson counter have?

<div class="upper-alpha" markdown>
1. 4
2. 8
3. 16
4. 32
</div>

??? question "Show Answer"
    The correct answer is **B**. A Johnson counter (twisted ring counter) with N flip-flops has 2N states. With 4 flip-flops, it cycles through 8 unique states: 0000→1000→1100→1110→1111→0111→0011→0001→0000.

    **Concept Tested:** Johnson Counter

---

#### 6. What is the key difference between Moore and Mealy state machines?

<div class="upper-alpha" markdown>
1. Moore machines are faster
2. Moore outputs depend only on state; Mealy outputs depend on state and inputs
3. Mealy machines use more flip-flops
4. Moore machines cannot detect sequences
</div>

??? question "Show Answer"
    The correct answer is **B**. In a Moore machine, outputs are functions of the current state only. In a Mealy machine, outputs depend on both the current state and current inputs, allowing outputs to change asynchronously when inputs change.

    **Concept Tested:** Moore Machine Model / Mealy Machine Model

---

#### 7. In an FSM state diagram, where is the output information shown for a Moore machine?

<div class="upper-alpha" markdown>
1. On the transition arrows
2. Inside or beside the state circles
3. In a separate output table
4. Moore machines don't have outputs
</div>

??? question "Show Answer"
    The correct answer is **B**. In Moore machine state diagrams, outputs are associated with states and shown inside or beside each state circle. In Mealy diagrams, outputs appear on the transition arrows as "input/output" pairs.

    **Concept Tested:** State Diagram Representation

---

#### 8. What is the first step in the FSM design procedure?

<div class="upper-alpha" markdown>
1. State assignment
2. K-map simplification
3. Problem specification and state diagram creation
4. Flip-flop selection
</div>

??? question "Show Answer"
    The correct answer is **C**. The FSM design procedure begins with understanding the problem specification and creating a state diagram. This must come before state assignment, transition tables, or logic simplification can be performed.

    **Concept Tested:** FSM Design Procedure

---

#### 9. What is the advantage of one-hot state encoding?

<div class="upper-alpha" markdown>
1. It uses the minimum number of flip-flops
2. It results in simple, fast next-state logic
3. It prevents all illegal states
4. It requires no combinational logic
</div>

??? question "Show Answer"
    The correct answer is **B**. One-hot encoding uses one flip-flop per state, resulting in simple next-state logic that often requires only basic AND/OR operations. This leads to faster circuits, especially in FPGAs, though it uses more flip-flops than binary encoding.

    **Concept Tested:** One-Hot State Encoding

---

#### 10. How many flip-flops are needed for a binary-encoded FSM with 5 states?

<div class="upper-alpha" markdown>
1. 2
2. 3
3. 4
4. 5
</div>

??? question "Show Answer"
    The correct answer is **B**. Binary encoding requires ⌈log₂(N)⌉ flip-flops for N states. For 5 states: ⌈log₂(5)⌉ = ⌈2.32⌉ = 3 flip-flops (which can encode up to 8 states).

    **Concept Tested:** State Assignment Strategies

---

#### 11. What is the purpose of state minimization in FSM design?

<div class="upper-alpha" markdown>
1. To increase the number of states
2. To reduce the number of states while preserving input-output behavior
3. To convert Moore to Mealy machines
4. To eliminate the need for flip-flops
</div>

??? question "Show Answer"
    The correct answer is **B**. State minimization identifies and merges equivalent states—states that have the same outputs and transition to equivalent states for all inputs. This reduces flip-flop count and often simplifies next-state logic.

    **Concept Tested:** State Minimization

---

#### 12. In designing a "101" sequence detector, why might the final '1' be reused as the start of a new pattern?

<div class="upper-alpha" markdown>
1. To save power
2. To detect overlapping sequences
3. To reduce the number of states
4. To make the circuit faster
</div>

??? question "Show Answer"
    The correct answer is **B**. When detecting overlapping sequences, the final bit of one pattern can be the first bit of the next. For "101" detection in "10101", the middle '1' serves as both the end of the first "101" and the beginning of the second.

    **Concept Tested:** Sequence Detector Design

---

## Answers Summary

| Question | Answer | Concept |
|----------|--------|---------|
| 1 | B | Parallel Load Registers |
| 2 | B | SIPO Register |
| 3 | C | Ripple Counters |
| 4 | C | Synchronous Counter Design |
| 5 | B | Johnson Counter |
| 6 | B | Moore vs Mealy Machines |
| 7 | B | State Diagram Representation |
| 8 | C | FSM Design Procedure |
| 9 | B | One-Hot Encoding |
| 10 | B | State Assignment |
| 11 | B | State Minimization |
| 12 | B | Sequence Detector Design |
