---
title: Unit 10 Challenge - Sequential Circuit Design
description: Challenge problems for sequential circuit design — answers only, no solutions
---

# Challenge Problems: Sequential Circuit Design

These challenge problems test deeper understanding. Only final answers are provided — work through each problem on your own.

---

#### Challenge 1: Mod-6 Synchronous Counter with D Flip-Flops

Design a mod-6 synchronous up-counter (counts 0 → 1 → 2 → 3 → 4 → 5 → 0 → ...) using D flip-flops. Derive the excitation equations for $D_2$, $D_1$, $D_0$ and the output equations. States 6 and 7 are don't cares.

**Answer:** **State table:**

| $Q_2 Q_1 Q_0$ | Next State | $D_2$ | $D_1$ | $D_0$ |
|---|---|---|---|---|
| 000 | 001 | 0 | 0 | 1 |
| 001 | 010 | 0 | 1 | 0 |
| 010 | 011 | 0 | 1 | 1 |
| 011 | 100 | 1 | 0 | 0 |
| 100 | 101 | 1 | 0 | 1 |
| 101 | 000 | 0 | 0 | 0 |
| 110 | ddd | d | d | d |
| 111 | ddd | d | d | d |

**K-maps with don't cares (states 6, 7):**

$D_0 = \overline{Q_0}$... wait, check: 0→1, 1→0, 0→1, 1→0, 0→1, 1→0. Yes!

$D_0 = \overline{Q_0}$

$D_1$: 0→0, 0→1, 1→1, 0→0, 0→0, 0→0. From K-map: $D_1 = Q_1 \oplus Q_0$ with don't cares...

$D_1 = \overline{Q_2}\,Q_1\,\overline{Q_0} + \overline{Q_2}\,\overline{Q_1}\,Q_0 = \overline{Q_2}(Q_1 \oplus Q_0)$

$D_2$: 0→0, 0→0, 0→0, 0→1, 1→1, 1→0. From K-map:

$D_2 = Q_2\,\overline{Q_0} + Q_1\,Q_0\,\overline{Q_2}$... with don't cares:

$D_2 = Q_1\,Q_0 + Q_2\,\overline{Q_0}$

**Excitation equations:**

- $D_2 = Q_1 Q_0 + Q_2 \overline{Q_0}$
- $D_1 = \overline{Q_2}(Q_1 \oplus Q_0)$
- $D_0 = \overline{Q_0}$

---

#### Challenge 2: Sequence Detector FSM (Moore Machine)

Design a Moore FSM that detects the input sequence **1011** on a serial input $X$. The output $Z = 1$ when the sequence is detected. Allow overlapping sequences (e.g., input 10110**11** should detect at position 4 and start looking for overlap).

Provide the state diagram, state table, state assignment, and excitation equations using D flip-flops.

**Answer:** **States:** $S_0$ (reset), $S_1$ (seen "1"), $S_2$ (seen "10"), $S_3$ (seen "101"), $S_4$ (seen "1011", output $Z=1$)

**State table (Moore — output depends only on state):**

| State | $X=0$ | $X=1$ | Output $Z$ |
|---|---|---|---|
| $S_0$ | $S_0$ | $S_1$ | 0 |
| $S_1$ | $S_2$ | $S_1$ | 0 |
| $S_2$ | $S_0$ | $S_3$ | 0 |
| $S_3$ | $S_2$ | $S_4$ | 0 |
| $S_4$ | $S_2$ | $S_1$ | 1 |

**State assignment:** $S_0 = 000$, $S_1 = 001$, $S_2 = 010$, $S_3 = 011$, $S_4 = 100$

**Excitation equations (3 D flip-flops):**

$D_2 = Q_1 Q_0 X$ (go to $S_4$ only from $S_3$ with $X=1$)

$D_1 = \overline{Q_2}\,\overline{Q_1}\,Q_0\,\overline{X} + \overline{Q_2}\,Q_1\,\overline{Q_0}\,X + Q_2\,\overline{X} + \overline{Q_2}\,Q_1\,Q_0\,\overline{X}$

Simplified: $D_1 = Q_0\overline{X} + Q_1\overline{Q_0}X + Q_2\overline{X}$

$D_0 = \overline{Q_1}\,\overline{Q_2}\,X + Q_1\,\overline{Q_0}\,X$

Simplified: $D_0 = X(\overline{Q_1}\,\overline{Q_2} + Q_1\,\overline{Q_0})$

**Output:** $Z = Q_2$

---

#### Challenge 3: Universal Shift Register Application

A 4-bit universal shift register supports: parallel load, shift left, shift right, and hold. The mode control is $S_1 S_0$: 00 = hold, 01 = shift right, 10 = shift left, 11 = parallel load.

Starting with register contents $Q_3 Q_2 Q_1 Q_0 = 1010$, serial input right ($SI_R$) = 1, serial input left ($SI_L$) = 0, determine the register contents after each of the following operations performed in sequence:

1. Shift right
2. Shift right
3. Shift left
4. Parallel load $D_3 D_2 D_1 D_0 = 0110$
5. Shift left

**Answer:** | Step | Operation | $SI$ | $Q_3 Q_2 Q_1 Q_0$ |
|---|---|---|---|
| Initial | — | — | 1010 |
| 1 | Shift right | $SI_R = 1$ | **1101** |
| 2 | Shift right | $SI_R = 1$ | **1110** |
| 3 | Shift left | $SI_L = 0$ | **1100** |
| 4 | Parallel load | — | **0110** |
| 5 | Shift left | $SI_L = 0$ | **1100** |

Shift right: bits move right, $SI_R$ enters at MSB.
Shift left: bits move left, $SI_L$ enters at LSB.

---

#### Challenge 4: Johnson Counter Analysis with Decoding

A 4-bit Johnson (twisted ring) counter starts at state $0000$.

(a) List all states in the counting sequence.
(b) Design a decoding circuit that produces 8 unique outputs ($Y_0$ through $Y_7$), one for each valid state, using only 2-input AND gates.
(c) What happens if the counter enters an invalid state (e.g., $0101$)? Does it self-correct?

**Answer:** **(a) State sequence:**

| Step | $Q_3 Q_2 Q_1 Q_0$ |
|---|---|
| 0 | 0000 |
| 1 | 1000 |
| 2 | 1100 |
| 3 | 1110 |
| 4 | 1111 |
| 5 | 0111 |
| 6 | 0011 |
| 7 | 0001 |
| 8 | 0000 (repeats) |

8 valid states for a 4-bit Johnson counter.

**(b) Decoding with 2-input AND gates:**

| State | Output | Decode |
|---|---|---|
| 0000 | $Y_0$ | $\overline{Q_3} \cdot \overline{Q_0}$ |
| 1000 | $Y_1$ | $Q_3 \cdot \overline{Q_2}$ |
| 1100 | $Y_2$ | $Q_2 \cdot \overline{Q_1}$ |
| 1110 | $Y_3$ | $Q_1 \cdot \overline{Q_0}$ |
| 1111 | $Y_4$ | $Q_3 \cdot Q_0$ |
| 0111 | $Y_5$ | $\overline{Q_3} \cdot Q_2$ |
| 0011 | $Y_6$ | $\overline{Q_2} \cdot Q_1$ |
| 0001 | $Y_7$ | $\overline{Q_1} \cdot Q_0$ |

Each valid state is uniquely decoded by checking adjacent bits. **8 AND gates + 4 inverters** needed.

**(c) Invalid state behavior:** A standard Johnson counter does **not** self-correct. If it enters $0101$, it will cycle through invalid states: $0101 → 0010 → 1001 → 0100 → 0010 → ...$ (a separate invalid cycle). Self-correcting designs require additional feedback logic.

---

#### Challenge 5: Mealy vs Moore Implementation Comparison

Design both a Mealy and Moore FSM that outputs $Z = 1$ whenever the input sequence $X = 110$ is detected (with overlap allowed). Compare the two designs in terms of number of states, flip-flops, and output timing.

**Answer:** **Mealy Machine:**

| State | Meaning | $X=0$ (Next/$Z$) | $X=1$ (Next/$Z$) |
|---|---|---|---|
| $A$ | Reset | $A$/0 | $B$/0 |
| $B$ | Seen "1" | $A$/0 | $C$/0 |
| $C$ | Seen "11" | $A$/1 | $C$/0 |

**3 states**, 2 flip-flops. Output $Z=1$ appears on the transition from $C$ with $X=0$.

**Moore Machine:**

| State | Meaning | $X=0$ Next | $X=1$ Next | Output $Z$ |
|---|---|---|---|---|
| $A$ | Reset | $A$ | $B$ | 0 |
| $B$ | Seen "1" | $A$ | $C$ | 0 |
| $C$ | Seen "11" | $D$ | $C$ | 0 |
| $D$ | Seen "110" | $A$ | $B$ | 1 |

**4 states**, 2 flip-flops. Output $Z=1$ in state $D$.

**Comparison:**

| Property | Mealy | Moore |
|---|---|---|
| Number of states | 3 | 4 |
| Number of flip-flops | 2 | 2 |
| Output timing | Immediate (combinational, may glitch) | Delayed by 1 clock (registered, glitch-free) |
| Output depends on | Current state + input | Current state only |

The Mealy machine detects the sequence one clock cycle earlier than the Moore machine, but its output may have glitches since it depends on the input combinationally.

