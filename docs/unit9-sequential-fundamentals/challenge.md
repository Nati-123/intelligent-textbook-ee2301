---
title: Unit 9 Challenge - Sequential Logic Fundamentals
description: Challenge problems for sequential logic fundamentals — answers only, no solutions
---

# Challenge Problems: Sequential Logic Fundamentals

These challenge problems test deeper understanding. Only final answers are provided — work through each problem on your own.

---

#### Challenge 1: JK Flip-Flop Timing Diagram with Preset/Clear

A negative-edge-triggered JK flip-flop has asynchronous active-low Preset ($\overline{PR}$) and Clear ($\overline{CLR}$) inputs. Given the following input sequence over 8 clock cycles (initially $Q = 0$):

| Cycle | $J$ | $K$ | $\overline{PR}$ | $\overline{CLR}$ |
|---|---|---|---|---|
| 1 | 1 | 0 | 1 | 1 |
| 2 | 1 | 1 | 1 | 1 |
| 3 | 0 | 1 | 1 | 1 |
| 4 | 1 | 0 | 1 | 1 |
| 5 | — | — | 0 | 1 |
| 6 | 1 | 1 | 1 | 1 |
| 7 | — | — | 1 | 0 |
| 8 | 0 | 1 | 1 | 1 |

Determine $Q$ after each cycle.

!!! success "Answer"
    | Cycle | Action | $Q$ after |
    |---|---|---|
    | Start | — | 0 |
    | 1 | $J=1, K=0$ → Set | **1** |
    | 2 | $J=1, K=1$ → Toggle | **0** |
    | 3 | $J=0, K=1$ → Reset | **0** |
    | 4 | $J=1, K=0$ → Set | **1** |
    | 5 | $\overline{PR}=0$ → Async Preset | **1** |
    | 6 | $J=1, K=1$ → Toggle | **0** |
    | 7 | $\overline{CLR}=0$ → Async Clear | **0** |
    | 8 | $J=0, K=1$ → Reset | **0** |

    Final output sequence: $Q = 0, 1, 0, 0, 1, 1, 0, 0, 0$

---

#### Challenge 2: Design a Circuit Using D Flip-Flops from a State Table

Design a synchronous sequential circuit with two D flip-flops ($Q_1, Q_0$) and one input $X$. The state table is:

| Present State ($Q_1 Q_0$) | $X=0$ Next State | $X=1$ Next State |
|---|---|---|
| 00 | 01 | 10 |
| 01 | 10 | 11 |
| 10 | 11 | 00 |
| 11 | 00 | 01 |

Derive the excitation equations for $D_1$ and $D_0$.

!!! success "Answer"
    From the state table, next state = present state + 1 when $X=0$, and present state + 2 when $X=1$ (modulo 4).

    **Truth table for $D_1$ and $D_0$:**

    | $Q_1$ | $Q_0$ | $X$ | $D_1$ | $D_0$ |
    |---|---|---|---|---|
    | 0 | 0 | 0 | 0 | 1 |
    | 0 | 0 | 1 | 1 | 0 |
    | 0 | 1 | 0 | 1 | 0 |
    | 0 | 1 | 1 | 1 | 1 |
    | 1 | 0 | 0 | 1 | 1 |
    | 1 | 0 | 1 | 0 | 0 |
    | 1 | 1 | 0 | 0 | 0 |
    | 1 | 1 | 1 | 0 | 1 |

    **Excitation equations:**

    $D_1 = Q_1 \oplus Q_0 \oplus X$

    Wait — verify from K-maps:

    $D_1 = \overline{Q_1}\,X + \overline{Q_1}\,Q_0\,\overline{X} + Q_1\,\overline{Q_0}\,\overline{X}$... simplify:

    $D_1 = \overline{Q_1}\,Q_0\,\overline{X} + \overline{Q_1}\,\overline{Q_0}\,X + Q_1\,\overline{Q_0}\,\overline{X} + \overline{Q_1}\,Q_0\,X$

    Checking: $D_1 = Q_0 \oplus X \oplus (Q_1 \cdot ...)$

    From the table directly: $D_1 = Q_1 \oplus (Q_0 + X)$... no.

    **$D_1 = \overline{Q_1}\,Q_0 + \overline{Q_1}\,X + Q_1\,\overline{Q_0}\,\overline{X}$**

    Verify: 00,0→0✓; 00,1→1✓; 01,0→1✓; 01,1→1✓; 10,0→1✓; 10,1→0✓; 11,0→0✓; 11,1→0✓ ✓

    **$D_0 = \overline{Q_0}\,\overline{X} + Q_0\,X = \overline{Q_0 \oplus X} = Q_0 \odot X$**

    Verify: 00,0→1✓; 00,1→0✓; 01,0→0✓; 01,1→1✓; 10,0→1✓; 10,1→0✓; 11,0→0✓; 11,1→1✓ ✓

    **Final:** $D_1 = \overline{Q_1}(Q_0 + X) + Q_1\overline{Q_0}\,\overline{X}$, $D_0 = Q_0 \odot X$

---

#### Challenge 3: Convert SR Latch to D Flip-Flop

Starting with a gated SR latch, show how to add logic to create a D flip-flop. Give the complete Boolean equations for the $S$ and $R$ inputs in terms of the $D$ input and the clock $CLK$.

!!! success "Answer"
    **Connection:**

    $S = D \cdot CLK$

    $R = \overline{D} \cdot CLK$

    **Explanation:** When $CLK = 1$: if $D = 1$, then $S = 1, R = 0$ (sets the latch); if $D = 0$, then $S = 0, R = 1$ (resets the latch). When $CLK = 0$: $S = R = 0$ (latch holds).

    This requires only **1 inverter** (for $\overline{D}$) beyond the gated SR latch, since the AND gates for $S$ and $R$ are already part of the gated SR latch structure.

    The gated SR latch equations become:

    $S' = D \cdot CLK$, $R' = \overline{D} \cdot CLK$

    $Q = \overline{\overline{S' + Q} \cdot R'}$... (standard NOR latch with gating)

---

#### Challenge 4: Setup/Hold Time Violations

A D flip-flop has $t_{setup} = 3\text{ ns}$, $t_{hold} = 1\text{ ns}$, and $t_{clk\text{-}to\text{-}Q} = 5\text{ ns}$. The clock period is 20 ns. Data arrives at the D input through a combinational logic block with propagation delay $t_{pd}$.

(a) What is the maximum $t_{pd}$ for reliable operation?
(b) If the data path has a minimum delay of $t_{pd,min}$, what is the constraint on $t_{pd,min}$ to avoid hold time violations?
(c) If $t_{pd} = 14\text{ ns}$ and $t_{pd,min} = 0.5\text{ ns}$, are there any violations?

!!! success "Answer"
    **(a) Setup time constraint:**

    $t_{clk\text{-}to\text{-}Q} + t_{pd} + t_{setup} \leq T_{clk}$

    $5 + t_{pd} + 3 \leq 20$

    $t_{pd} \leq 12\text{ ns}$

    **Maximum $t_{pd} = 12$ ns**

    **(b) Hold time constraint:**

    $t_{clk\text{-}to\text{-}Q} + t_{pd,min} \geq t_{hold}$

    $5 + t_{pd,min} \geq 1$

    $t_{pd,min} \geq -4\text{ ns}$

    Since delays are non-negative, the hold time constraint is **always satisfied** — any $t_{pd,min} \geq 0$ works.

    **(c) With $t_{pd} = 14$ ns and $t_{pd,min} = 0.5$ ns:**

    - Setup: $5 + 14 + 3 = 22 > 20$ → **Setup time violation!**
    - Hold: $5 + 0.5 = 5.5 > 1$ → Hold time satisfied ✓

    **There is a setup time violation.** The combinational logic is too slow for the clock frequency.

---

#### Challenge 5: Master-Slave JK Flip-Flop Race Condition Analysis

Explain the "ones catching" problem in a master-slave JK flip-flop. Given the following scenario:

- $J = 1$, $K = 0$ at the rising edge of CLK
- During the high phase of CLK, noise causes $J$ to briefly go to 0 and $K$ to briefly go to 1
- $J$ returns to 1, $K$ returns to 0 before the falling edge

What is the final state of $Q$ if the master latch is level-sensitive? What would happen with an edge-triggered design instead?

!!! success "Answer"
    **Master-slave (level-sensitive master):**

    1. At rising edge: $J=1, K=0$ → master sets to 1
    2. During high phase, noise makes $J=0, K=1$ → master resets to 0 (ones catching!)
    3. $J$ returns to 1, $K$ returns to 0 → master sets back to 1
    4. At falling edge: slave captures master = 1 → $Q = 1$

    In this specific case, the final answer is **$Q = 1$**, which happens to be correct. But if the noise sequence were different (e.g., $K$ glitches to 1 just before the falling edge and the master captures it), the result could be incorrect.

    **The "ones catching" problem:** The master latch is transparent while CLK is high, so any glitch during this time can corrupt the stored value. The master may "catch" a 1 that shouldn't be there (or lose one that should).

    **Edge-triggered design:** Only samples $J$ and $K$ at the clock edge instant. Noise during the high phase of CLK has **no effect** on the output. The edge-triggered flip-flop would reliably output $Q = 1$ based on the values at the triggering edge.
