---
title: Unit 9 Problems - Sequential Logic Fundamentals
description: Practice problems for latches, flip-flops, timing diagrams, and sequential circuits
---

<div class="problems-styled" markdown>

<h1 style="color: #5A3EED !important; border-bottom: 3px solid #5A3EED; padding-bottom: 0.4rem; font-weight: 800; margin-bottom: 1.5rem;">End-of-Unit Problems: Sequential Logic Fundamentals</h1>

<p style="color: #555; line-height: 1.85; font-size: 1.05rem; margin-bottom: 2rem;">
Work through these problems to reinforce your understanding of memory elements and sequential circuit timing.
</p>

---

<h2 style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">Section A: Latches (5 problems)</h2>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 1</h3>
Draw the circuit and complete the truth table for an SR latch using NOR gates.


<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

**NOR-based SR Latch circuit:**

```
              ┌─────┐
S ────────────┤1    │
              │ NOR ├──────┬──── Q'
    ┌─────────┤2    │      │
    │         └─────┘      │
    │                      │
    │              ┌───────┘
    │              │
    │              │  ┌─────┐
    │              └──┤1    │
    │                 │ NOR ├──┬── Q
R ────────────────────┤2    │  │
                      └─────┘  │
    │                          │
    └──────────────────────────┘
```

- Top NOR gate: inputs S and Q (feedback), output Q'
- Bottom NOR gate: inputs Q' (feedback) and R, output Q
- Cross-coupled: Q feeds back to top gate, Q' feeds back to bottom gate

**Truth Table:**

| S | R | Q(next) | Q'(next) | State |
|---|---|---------|----------|-------|
| 0 | 0 | Q | Q' | Hold (memory) |
| 0 | 1 | 0 | 1 | Reset |
| 1 | 0 | 1 | 0 | Set |
| 1 | 1 | 0 | 0 | Invalid (both low) |

**Characteristic equation:**

Q(next) = S + R'Q

**Invalid state:** S = R = 1 causes Q = Q' = 0, which violates the complement relationship and causes race condition when both inputs return to 0.


</div>
</details>

---

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 2</h3>
Design an SR latch using NAND gates and compare its operation to the NOR-based version.


<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

**NAND-based SR Latch:**

Note: Inputs are active-LOW (S̄ and R̄)

```
               ┌──────┐
S̄ ─────────────┤1     │
               │ NAND ├──────┬──── Q
    ┌──────────┤2     │      │
    │          └──────┘      │
    │                        │
    │               ┌────────┘
    │               │
    │               │  ┌──────┐
    │               └──┤1     │
    │                  │ NAND ├──┬── Q'
R̄ ─────────────────────┤2     │  │
                       └──────┘  │
    │                            │
    └────────────────────────────┘
```

- Top NAND gate: inputs S̄ and Q' (feedback), output Q
- Bottom NAND gate: inputs Q (feedback) and R̄, output Q'
- Cross-coupled: Q feeds back to bottom gate, Q' feeds back to top gate

**Truth Table (active-low inputs):**

| S̄ | R̄ | Q(next) | Q'(next) | State |
|---|---|---------|----------|-------|
| 0 | 0 | 1 | 1 | Invalid |
| 0 | 1 | 1 | 0 | Set |
| 1 | 0 | 0 | 1 | Reset |
| 1 | 1 | Q | Q' | Hold |

**Comparison:**

| Feature | NOR Latch | NAND Latch |
|---------|-----------|------------|
| Active input level | HIGH (1) | LOW (0) |
| Set condition | S=1, R=0 | S̄=0, R̄=1 |
| Reset condition | S=0, R=1 | S̄=1, R̄=0 |
| Hold condition | S=0, R=0 | S̄=1, R̄=1 |
| Invalid condition | S=1, R=1 | S̄=0, R̄=0 |


</div>
</details>

---

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 3</h3>
For the gated SR latch, draw the timing diagram for the following input sequence:

- Initially: Q = 0
- t=0 to t=2: EN=0, S=1, R=0
- t=2 to t=4: EN=1, S=1, R=0
- t=4 to t=6: EN=1, S=0, R=0
- t=6 to t=8: EN=1, S=0, R=1
- t=8 to t=10: EN=0, S=1, R=1


<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

**Gated SR Latch operation:**

Q changes only when EN = 1

**Analysis:**

| Time | EN | S | R | Q | Comment |
|------|----|----|---|---|---------|
| 0-2 | 0 | 1 | 0 | 0 | Hold (EN=0) |
| 2-4 | 1 | 1 | 0 | 1 | Set (Q→1) |
| 4-6 | 1 | 0 | 0 | 1 | Hold |
| 6-8 | 1 | 0 | 1 | 0 | Reset (Q→0) |
| 8-10 | 0 | 1 | 1 | 0 | Hold (EN=0) |

**Timing Diagram:**

```
EN    _____|‾‾‾‾‾‾‾‾‾‾‾‾|_____
          2            8

S     |‾‾‾‾‾‾‾‾|_________|‾‾‾‾
      0        4         8

R     _____________|‾‾‾‾‾‾‾‾‾‾
                  6

Q     _____|‾‾‾‾‾‾‾‾‾|________
          2          6
```


</div>
</details>

---

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 4</h3>
Design a D latch using an SR latch and additional gates. Explain why the D latch eliminates the invalid state problem.


<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

**D Latch from SR Latch:**

```
     ┌──────┐
D ───┤      ├──── S ───┐
     │ AND  │          │
EN ──┤      │          │
     └──────┘          │
                       ├── [SR Latch] ── Q, Q'
     ┌──────┐          │
D ──○┤      ├──── R ───┘
     │ AND  │
EN ──┤      │
     └──────┘
```

**Equations:**

- S = D · EN
- R = D' · EN

**Why invalid state is eliminated:**

When EN = 0:

- S = D · 0 = 0
- R = D' · 0 = 0
- Latch holds (valid)

When EN = 1:

- If D = 1: S = 1, R = 0 (Set - valid)
- If D = 0: S = 0, R = 1 (Reset - valid)

**Key insight:** S and R can never both be 1 simultaneously because:

- S = D · EN
- R = D' · EN
- S · R = D · EN · D' · EN = 0 (since D · D' = 0)

**Truth Table:**

| EN | D | S | R | Q(next) |
|----|---|---|---|---------|
| 0 | X | 0 | 0 | Q (hold) |
| 1 | 0 | 0 | 1 | 0 |
| 1 | 1 | 1 | 0 | 1 |

**Characteristic equation:** Q(next) = D when EN=1, else Q(hold)


</div>
</details>

---

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 5</h3>
What is the difference between a latch and a flip-flop? Give an example timing scenario where this difference matters.


<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

**Fundamental Difference:**

| Property | Latch | Flip-Flop |
|----------|-------|-----------|
| Trigger | Level-sensitive | Edge-triggered |
| Response | Changes while enable HIGH | Changes only at clock edge |
| Transparency | Transparent when enabled | Never transparent |

**Level-sensitive (Latch):**

- Output follows input continuously while enabled
- Called "transparent" latch

**Edge-triggered (Flip-Flop):**

- Output changes only at rising or falling clock edge
- Input sampled at edge moment, ignored otherwise

**Example where difference matters:**

**Circuit:** D-type element with feedback: Q connected to D through inverter

```
CLK ──┬──[Element]── Q ──[INV]──┐
      │                         │
      └─────────────────────────┘
           (D input)
```

**With D Latch (EN = CLK):**

- When CLK HIGH: Q changes, then D' (inverted) feeds back
- Q oscillates rapidly while CLK is HIGH
- Creates unpredictable, unstable behavior

**With D Flip-Flop:**

- Q changes only at clock edge
- New Q value doesn't affect input until next edge
- Output toggles cleanly once per clock cycle
- Creates a divide-by-2 frequency divider

**Conclusion:** Flip-flops are essential for synchronous sequential circuits where feedback exists, as they prevent transparency-caused oscillations.


</div>
</details>

---

<h2 style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">Section B: Flip-Flops (6 problems)</h2>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 6</h3>
Complete the characteristic table and excitation table for a D flip-flop.


<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

**D Flip-Flop Characteristic Table:**

(What Q becomes for each D input)

| D | Q(next) |
|---|---------|
| 0 | 0 |
| 1 | 1 |

**Characteristic equation:** Q(next) = D

**D Flip-Flop Excitation Table:**

(What D must be to achieve desired transition)

| Q | Q(next) | D required |
|---|---------|------------|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

**Pattern:** D = Q(next) always

**Simplification:** D equals whatever you want Q to become.

This makes D flip-flops the easiest to use in design!


</div>
</details>

---

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 7</h3>
Complete the characteristic table and excitation table for a JK flip-flop.


<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

**JK Flip-Flop Characteristic Table:**

| J | K | Q(next) | Operation |
|---|---|---------|-----------|
| 0 | 0 | Q | Hold |
| 0 | 1 | 0 | Reset |
| 1 | 0 | 1 | Set |
| 1 | 1 | Q' | Toggle |

**Characteristic equation:** Q(next) = JQ' + K'Q

**JK Flip-Flop Excitation Table:**

| Q | Q(next) | J | K |
|---|---------|---|---|
| 0 | 0 | 0 | X |
| 0 | 1 | 1 | X |
| 1 | 0 | X | 1 |
| 1 | 1 | X | 0 |

**How to read:**

- Q: 0→0: J must be 0 (don't set), K can be anything
- Q: 0→1: J must be 1 (set), K can be anything
- Q: 1→0: J can be anything, K must be 1 (reset)
- Q: 1→1: J can be anything, K must be 0 (don't reset)


</div>
</details>

---

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 8</h3>
Complete the characteristic table and excitation table for a T flip-flop.


<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

**T Flip-Flop Characteristic Table:**

| T | Q(next) | Operation |
|---|---------|-----------|
| 0 | Q | Hold |
| 1 | Q' | Toggle |

**Characteristic equation:** Q(next) = T ⊕ Q = TQ' + T'Q

**T Flip-Flop Excitation Table:**

| Q | Q(next) | T required |
|---|---------|------------|
| 0 | 0 | 0 (hold) |
| 0 | 1 | 1 (toggle) |
| 1 | 0 | 1 (toggle) |
| 1 | 1 | 0 (hold) |

**Pattern:** T = Q ⊕ Q(next)

T = 1 when Q needs to change, T = 0 when Q stays same.

**T from JK:** A JK flip-flop with J = K = T becomes a T flip-flop.


</div>
</details>

---

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 9</h3>
Draw the timing diagram for a positive-edge-triggered D flip-flop with the following inputs:

Clock: Square wave with period 4 time units
D: 0 from t=0-3, 1 from t=3-7, 0 from t=7-10

Initial Q = 0


<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

**Clock edges at:** t = 2, 4, 6, 8, 10, ... (rising edges)

**Analysis at each rising edge:**

| Time | D at edge | Q after edge |
|------|-----------|--------------|
| t=2 | D=0 | Q=0 |
| t=4 | D=1 | Q=1 |
| t=6 | D=1 | Q=1 |
| t=8 | D=0 | Q=0 |

**Timing Diagram:**

```
CLK   _|‾|_|‾|_|‾|_|‾|_|‾|_
      0 1 2 3 4 5 6 7 8 9 10

D     __|‾‾‾‾‾‾‾‾|_______
      0  3       7

Q     ________|‾‾‾‾‾‾|______
             4      8
```

**Key observations:**

- Q changes only at rising clock edges (t=2,4,6,8,...)
- D value is sampled at edge moment
- At t=2: D=0, so Q stays 0
- At t=4: D=1 (changed at t=3), so Q→1
- At t=8: D=0 (changed at t=7), so Q→0


</div>
</details>

---

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 10</h3>
Convert a D flip-flop to a T flip-flop using external logic.


<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

**T flip-flop behavior:**

- T=0: Q holds
- T=1: Q toggles

**D flip-flop behavior:**

- D=0: Q→0
- D=1: Q→1

**Required relationship:**

- When T=0: D should equal Q (hold)
- When T=1: D should equal Q' (toggle)

**Logic equation:**

D = T'Q + TQ' = T ⊕ Q

**Circuit:**

```
     ┌─────────┐
T ───┤         │
     │   XOR   ├──── D ──[D FF]── Q
Q ───┤         │           │
     └─────────┘           │
          ↑                │
          └────────────────┘
```

**Components needed:**

- 1 D flip-flop
- 1 XOR gate

**Verification:**

| T | Q | D=T⊕Q | Q(next) |
|---|---|-------|---------|
| 0 | 0 | 0 | 0 (hold) |
| 0 | 1 | 1 | 1 (hold) |
| 1 | 0 | 1 | 1 (toggle) |
| 1 | 1 | 0 | 0 (toggle) |

✓ Matches T flip-flop behavior


</div>
</details>

---

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 11</h3>
A JK flip-flop has the following input sequence. Determine Q after each clock pulse.

Initial Q = 0
- Pulse 1: J=1, K=0
- Pulse 2: J=1, K=1
- Pulse 3: J=0, K=1
- Pulse 4: J=1, K=1
- Pulse 5: J=0, K=0


<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

**JK Flip-Flop operation:**

- J=0, K=0: Hold
- J=0, K=1: Reset (Q→0)
- J=1, K=0: Set (Q→1)
- J=1, K=1: Toggle (Q→Q')

**Step-by-step analysis:**

| Pulse | J | K | Q(before) | Operation | Q(after) |
|-------|---|---|-----------|-----------|----------|
| Initial | - | - | - | - | 0 |
| 1 | 1 | 0 | 0 | Set | **1** |
| 2 | 1 | 1 | 1 | Toggle | **0** |
| 3 | 0 | 1 | 0 | Reset | **0** |
| 4 | 1 | 1 | 0 | Toggle | **1** |
| 5 | 0 | 0 | 1 | Hold | **1** |

**Final Q = 1**


</div>
</details>

---

<h2 style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">Section C: Timing Parameters (4 problems)</h2>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 12</h3>
A D flip-flop has the following timing parameters:

- Setup time (tsu): 2 ns
- Hold time (th): 1 ns
- Clock-to-Q delay (tCQ): 3 ns

If the clock period is 10 ns, what is the maximum combinational logic delay allowed between two flip-flops?


<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

**Timing constraint equation:**

tCQ + tlogic + tsu ≤ Tclk

Where:

- tCQ = Clock-to-Q delay of source FF
- tlogic = Combinational logic delay
- tsu = Setup time of destination FF
- Tclk = Clock period

**Solving for maximum tlogic:**

tlogic ≤ Tclk - tCQ - tsu
tlogic ≤ 10 - 3 - 2
**tlogic ≤ 5 ns**

**Diagram:**

```
Clock edge → [tCQ: 3ns] → Q changes → [tlogic: ≤5ns] →
D arrives → [tsu: 2ns] → Next clock edge

Total: 3 + 5 + 2 = 10 ns = Tclk ✓
```

**Hold time check:**

The new D input must not change too quickly after clock edge.
This is usually satisfied by tCQ > th (3 ns > 1 ns ✓)


</div>
</details>

---

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 13</h3>
Explain what happens when setup time is violated. What is metastability?


<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

**Setup Time Violation:**

Setup time violation occurs when the D input changes too close to (within tsu of) the clock edge.

**Consequences:**

1. The flip-flop may capture the old value
2. The flip-flop may capture the new value
3. **The flip-flop may enter a metastable state**

**Metastability:**

Metastability is an unstable intermediate state between logic 0 and logic 1.

**Characteristics of metastable state:**

| Property | Normal Operation | Metastable |
|----------|------------------|------------|
| Output voltage | VOL or VOH | Between VOL and VOH |
| Duration | tCQ (predictable) | Unpredictable |
| Final state | Deterministic | Random |

**Why it happens:**

- The flip-flop's internal feedback loop needs time to resolve
- When input changes at the sampling moment, the loop has insufficient energy to reach a stable state quickly
- Eventually resolves to 0 or 1, but timing is unpredictable

**Problems caused:**

1. Output may be in "forbidden zone" for downstream logic
2. Different fanout gates may interpret it differently (some as 0, some as 1)
3. Timing becomes unpredictable
4. Can cause system crashes or data corruption

**Mitigation:**

- Use synchronizer chains (two flip-flops in series)
- Design with sufficient timing margin
- Use faster flip-flops with better metastability characteristics


</div>
</details>

---

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 14</h3>
Two flip-flops are connected with combinational logic between them. Calculate the minimum clock period if:

- FF1: tCQ = 2 ns
- FF2: tsu = 3 ns, th = 1 ns
- Logic delay: 4 ns (typical), 6 ns (maximum)
- Clock skew: 0.5 ns


<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

**Setup time constraint (using maximum logic delay):**

Tclk ≥ tCQ + tlogic(max) + tsu + tskew

Tclk ≥ 2 + 6 + 3 + 0.5
**Tclk ≥ 11.5 ns**

**Maximum clock frequency:**

fmax = 1 / Tclk = 1 / 11.5 ns ≈ **87 MHz**

**Hold time constraint:**

tCQ + tlogic(min) ≥ th + tskew

Assuming tlogic(min) ≈ 0 (worst case for hold):

2 + 0 ≥ 1 + 0.5
2 ≥ 1.5 ✓

Hold time is satisfied.

**Timing diagram:**

```
FF1 CLK edge → [tCQ=2ns] → Q1 valid →
[tlogic=6ns max] → D2 valid →
[tsu=3ns before FF2 CLK] → FF2 CLK edge

With skew: FF2 CLK can be up to 0.5ns early
```


</div>
</details>

---

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 15</h3>
A master-slave flip-flop has an inherent timing issue called "ones catching" or "zeros catching." Explain this problem and how edge-triggered flip-flops solve it.


<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

**Master-Slave Flip-Flop Structure:**

```
D → [Master Latch] → [Slave Latch] → Q
     (CLK=1 active)   (CLK=0 active)
```

**Operation:**

- CLK = 1: Master transparent, slave holds
- CLK = 0: Master holds, slave transparent

**"Ones Catching" Problem:**

During CLK = 1 phase, the master latch is transparent.

If D has a momentary glitch to 1 (noise, switching transient):

```
D _____|‾|_____  (brief spike)

CLK __|‾‾‾‾‾‾|__  (master active during spike)
```

The master captures the glitch (stores 1), even though D returns to 0 before the clock edge. When CLK falls, this erroneous 1 transfers to the slave.

**"Zeros Catching":**

Similarly, if master stores 1 and D momentarily glitches to 0 while CLK=1, the master captures the unwanted 0.

**Edge-Triggered Solution:**

True edge-triggered flip-flops sample D only at the precise clock edge moment:

```
           ↓ (only this instant matters)
CLK ____|‾‾‾‾|____
```

**Implementation differences:**

| Type | Sampling Window | Susceptibility |
|------|-----------------|----------------|
| Master-Slave | Entire CLK=1 period | High (glitch-sensitive) |
| Edge-triggered | ~0 ns at edge | Low (edge only) |

**Modern practice:** Use true edge-triggered flip-flops (typically implemented with transmission gates and feedback) to avoid this issue.


</div>
</details>

---

<h2 style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">Section D: Timing Diagram Analysis (3 problems)</h2>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 16</h3>
Given the following timing diagram, determine what type of flip-flop is being used and explain your reasoning.

```
CLK  _|‾|_|‾|_|‾|_|‾|_|‾|_
     0   2   4   6   8   10

D    __|‾‾‾‾|___|‾‾‾|____
       1    4   6   9

Q    ____|‾‾‾|_____|‾‾|__
         2    6    8
```


<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

**Analysis of transitions:**

| Clock Edge | D Value | Q Transition |
|------------|---------|--------------|
| t=2 (↑) | 1 | 0→1 |
| t=4 (↑) | 0 | 1→1 (no change until...) |
| t=6 (↑) | 0 | 1→0 |
| t=8 (↑) | 1 | 0→1 |

Wait, let me re-examine...

At t=2: D is 1, Q goes to 1 ✓
At t=4: D is 0, but Q stays 1? Let me re-read the diagram.

Actually looking at Q: changes at t=2, t=6, t=8

At t=2: D=1, Q: 0→1 (follows D) ✓
At t=4: D=0, Q stays 1 (doesn't follow immediately)
At t=6: D=0 (since t=4), Q: 1→0 (follows D)
At t=8: D=1 (since t=6), Q: 0→1 (follows D)

**Conclusion:**

Q changes only at rising clock edges, and Q follows whatever D is at that edge.

**This is a positive-edge-triggered D flip-flop**

**Verification:**

- At t=2: D=1 → Q=1 ✓
- At t=4: D=0 → Q should be 0...but diagram shows Q=1

Let me re-check the diagram. Q goes high at t=2, stays high until t=6.

This means at t=4 edge, D was actually still 1 (D went low at exactly t=4, after the edge).

**Confirmed: Positive-edge-triggered D flip-flop**


</div>
</details>

---

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 17</h3>
Draw the timing diagram for a JK flip-flop (positive-edge-triggered) with:

- Initial Q = 0
- J: 1 from t=0-6, 0 from t=6-12
- K: 0 from t=0-4, 1 from t=4-12
- Clock period: 2 (edges at t=1, 3, 5, 7, 9, 11)


<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

**Clock rising edges at:** t = 1, 3, 5, 7, 9, 11

**Analysis at each edge:**

| Edge | J | K | Q(before) | Q(after) | Operation |
|------|---|---|-----------|----------|-----------|
| t=1 | 1 | 0 | 0 | 1 | Set |
| t=3 | 1 | 0 | 1 | 1 | Set (hold) |
| t=5 | 1 | 1 | 1 | 0 | Toggle |
| t=7 | 0 | 1 | 0 | 0 | Reset (hold) |
| t=9 | 0 | 1 | 0 | 0 | Reset (hold) |
| t=11 | 0 | 1 | 0 | 0 | Reset (hold) |

**Timing Diagram:**

```
CLK  _|‾|_|‾|_|‾|_|‾|_|‾|_|‾|_
     0 1 2 3 4 5 6 7 8 9 10 11 12

J    |‾‾‾‾‾‾‾‾‾‾‾‾|____________
     0           6

K    ________|‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
            4

Q    ____|‾‾‾‾‾‾‾|______________
        1       5
```


</div>
</details>

---

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 18</h3>
Given a T flip-flop with asynchronous PRESET and CLEAR inputs (both active-low), draw the timing diagram for:

- Initial Q = 0
- T: Always 1
- PRESET: Low from t=0-1 only
- CLEAR: Low from t=5-6 only
- Clock edges at t=2, 3, 4, 7, 8


<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

**Asynchronous inputs override clock:**

- PRESET low → Q = 1 immediately
- CLEAR low → Q = 0 immediately

**T=1 means toggle at each clock edge**

**Analysis:**

| Time | Event | Q |
|------|-------|---|
| t=0 | Initial | 0 |
| t=0-1 | PRESET low | 1 (async set) |
| t=2 | CLK edge, T=1 | 0 (toggle) |
| t=3 | CLK edge, T=1 | 1 (toggle) |
| t=4 | CLK edge, T=1 | 0 (toggle) |
| t=5-6 | CLEAR low | 0 (async clear) |
| t=7 | CLK edge, T=1 | 1 (toggle) |
| t=8 | CLK edge, T=1 | 0 (toggle) |

**Timing Diagram:**

```
CLK    ____|‾|_|‾|_|‾|____|‾|_|‾|___
           2   3   4     7   8

T      |‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾

PRESET |___|‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
       0  1

CLEAR  ‾‾‾‾‾‾‾‾‾‾‾|___|‾‾‾‾‾‾‾‾‾‾‾
                 5   6

Q      __|‾‾‾|__|‾‾|__________|‾‾|__
       0  1  2  3  4  5      7  8
```


</div>
</details>

---

<h2 style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">Section E: Sequential Circuit Analysis (2 problems)</h2>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 19</h3>
Analyze the following circuit. Determine its function.

```
         ┌────────────────────────┐
         │     ┌──────────┐       │
         └───> D        Q ├───────┴──── Output
               │  D FF    │
    CLK ─────> │          │
               │       Q' ├───┐
               └──────────┘   │
         ┌────────────────────┘
         └──── (Q' feeds back to D)
```


<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

**Circuit Analysis:**

D input is connected to Q' (complement of output)

**At each clock edge:**

D = Q' (previous Q inverted)
Q(next) = D = Q'(previous)

**This is a T flip-flop with T=1 (toggle mode)**

**Behavior:**

| Clock | Q(before) | D = Q' | Q(after) |
|-------|-----------|--------|----------|
| 1 | 0 | 1 | 1 |
| 2 | 1 | 0 | 0 |
| 3 | 0 | 1 | 1 |
| 4 | 1 | 0 | 0 |

**Function: Divide-by-2 (Frequency Divider)**

Output frequency = Input clock frequency / 2

**Timing:**

```
CLK   _|‾|_|‾|_|‾|_|‾|_|‾|_|‾|_|‾|_|‾|_

Q     ___|‾‾‾‾‾|_____|‾‾‾‾‾|_____|‾‾‾‾‾|_
```

Q completes one cycle for every two clock cycles.


</div>
</details>

---

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 20</h3>
Determine the state sequence for the following circuit:

```
Two D flip-flops: FF0 (Q₀) and FF1 (Q₁)
- Both share the same clock
- D₀ = Q₁
- D₁ = Q₀ ⊕ Q₁

Initial state: Q₁Q₀ = 00
```


<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

**State Transition Analysis:**

Next state equations:

- Q₀(next) = D₀ = Q₁
- Q₁(next) = D₁ = Q₀ ⊕ Q₁

**State sequence:**

| Clock | Q₁ | Q₀ | D₁=Q₀⊕Q₁ | D₀=Q₁ | Next Q₁Q₀ |
|-------|----|----|----------|-------|-----------|
| 0 | 0 | 0 | 0 | 0 | 00 |
| 1 | 0 | 0 | 0 | 0 | 00 |

Wait, this shows it stays at 00. Let me check if initial state should be different.

Let's try starting from 01:

| Clock | Q₁ | Q₀ | D₁=Q₀⊕Q₁ | D₀=Q₁ | Next Q₁Q₀ |
|-------|----|----|----------|-------|-----------|
| - | 0 | 1 | 1 | 0 | 10 |
| 1 | 1 | 0 | 1 | 1 | 11 |
| 2 | 1 | 1 | 0 | 1 | 01 |
| 3 | 0 | 1 | 1 | 0 | 10 |
| ... | (cycle repeats) |

**State diagram:**

```
01 → 10 → 11 → 01 (cycle of 3 states)

00 → 00 (stuck state)
```

**This is a mod-3 counter (excluding 00 state)**

If starting from 00, circuit stays at 00.
If starting from any other state, cycles through: 01 → 10 → 11 → 01...

**Sequence from 00:** 00 → 00 → 00 (stuck)
**Sequence from 01:** 01 → 10 → 11 → 01 → 10 → 11 → ...


</div>
</details>

---

<h2 style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">Summary</h2>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>


| Section | Topics Covered | Problem Count |
|---------|---------------|---------------|
| A | Latches | 5 |
| B | Flip-Flops | 6 |
| C | Timing Parameters | 4 |
| D | Timing Diagrams | 3 |
| E | Circuit Analysis | 2 |
| **Total** | | **20** |


</div>

</div>