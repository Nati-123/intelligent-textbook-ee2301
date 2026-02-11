---
title: Unit 10 Problems - Sequential Circuit Design
description: Practice problems for registers, counters, and finite state machines
---

# End-of-Unit Problems: Sequential Circuit Design

Work through these problems to reinforce your understanding of registers, counters, and FSM design.

---

## Section A: Registers (4 problems)

### Problem 1
Design a 4-bit parallel-load register with load enable. Show the circuit using D flip-flops and describe its operation.

**Solution:** **4-bit Parallel Load Register:**

**Components per bit:**

- 1 D flip-flop
- 1 multiplexer (2-to-1)

**For each bit i:**

```
D_in[i] ──┬──[2:1 MUX]── D ──[D FF]── Q[i]
          │      ↑
Q[i] ─────┘      │
               Load
```

**Logic equation:**

D_FF[i] = Load · D_in[i] + Load' · Q[i]

**Truth table:**

| Load | D_in | Q(next) |
|------|------|---------|
| 0 | X | Q (hold) |
| 1 | 0 | 0 (load) |
| 1 | 1 | 1 (load) |

**Operation:**

- Load = 0: Register holds current value (Q feeds back through MUX)
- Load = 1: Register loads new value from D_in on clock edge

**Complete 4-bit design:**

```
D_in[3:0] ──┬──┬──┬──┐
           │  │  │  │
Load ──────┼──┼──┼──┼── (to all MUX selects)
           │  │  │  │
CLK ───────┼──┼──┼──┼── (to all FF clock inputs)
           ↓  ↓  ↓  ↓
          [Bit3][Bit2][Bit1][Bit0]
           ↓  ↓  ↓  ↓
Q[3:0] ────┴──┴──┴──┘
```

**Total components:**

- 4 D flip-flops
- 4 two-to-1 MUXes (or 8 AND gates + 4 OR gates)

---

### Problem 2
Design a 4-bit shift register that supports:

- Serial input (SI)
- Serial output (SO)
- Shift right on each clock

Show the connections and trace through shifting the pattern 1011.

**Solution:** **4-bit SISO Shift Register:**

```
SI → [D FF₃] → [D FF₂] → [D FF₁] → [D FF₀] → SO
          Q₃ →      Q₂ →      Q₁ →      Q₀
```

**Connections:**

- D₃ = SI
- D₂ = Q₃
- D₁ = Q₂
- D₀ = Q₁
- SO = Q₀

**Shifting pattern 1011 (MSB first):**

Initial state: Q₃Q₂Q₁Q₀ = 0000

| Clock | SI | Q₃ | Q₂ | Q₁ | Q₀ | SO |
|-------|----|----|----|----|----|----|
| 0 | - | 0 | 0 | 0 | 0 | 0 |
| 1 | 1 | 1 | 0 | 0 | 0 | 0 |
| 2 | 0 | 0 | 1 | 0 | 0 | 0 |
| 3 | 1 | 1 | 0 | 1 | 0 | 0 |
| 4 | 1 | 1 | 1 | 0 | 1 | 0 |
| 5 | 0 | 0 | 1 | 1 | 0 | 1 |
| 6 | 0 | 0 | 0 | 1 | 1 | 0 |
| 7 | 0 | 0 | 0 | 0 | 1 | 1 |
| 8 | 0 | 0 | 0 | 0 | 0 | 1 |

**After 4 clocks:** Register contains 1101 (reversed: 1011)
**Clocks 5-8:** Pattern shifts out SO as 1, 0, 1, 1

---

### Problem 3
Design a universal shift register with the following modes:

- Mode 00: Hold
- Mode 01: Shift right
- Mode 10: Shift left
- Mode 11: Parallel load

**Solution:** **Universal Shift Register (4-bit):**

Each bit needs a 4-to-1 MUX to select the source:

**For bit i (0 < i < 3):**

| Mode | Source for D[i] |
|------|-----------------|
| 00 | Q[i] (hold) |
| 01 | Q[i+1] (shift right) |
| 10 | Q[i-1] (shift left) |
| 11 | D_in[i] (parallel load) |

**For bit 3 (MSB):**

| Mode | Source for D[3] |
|------|-----------------|
| 00 | Q[3] (hold) |
| 01 | SR_in (right shift input) |
| 10 | Q[2] (shift left) |
| 11 | D_in[3] (parallel load) |

**For bit 0 (LSB):**

| Mode | Source for D[0] |
|------|-----------------|
| 00 | Q[0] (hold) |
| 01 | Q[1] (shift right) |
| 10 | SL_in (left shift input) |
| 11 | D_in[0] (parallel load) |

**Circuit structure:**

```
For each bit i:

Q[i-1] (or SL_in) ───┐
Q[i] ────────────────┼───[4:1 MUX]──D──[D FF]──Q[i]
Q[i+1] (or SR_in) ───┤        ↑
D_in[i] ─────────────┘        │
                          Mode[1:0]
```

**Total components:**

- 4 D flip-flops
- 4 four-to-1 MUXes

---

### Problem 4
A PISO (Parallel-In Serial-Out) shift register is used for serial communication. Design a 4-bit PISO register with Load and Shift controls.

**Solution:** **PISO Register Operation:**

- Load = 1: Parallel data loaded
- Load = 0: Shift right, output LSB

**Design:**

Same as Problem 1 but output is Q₀ (serial out).

```
D_in[3] ──[MUX]── D₃ ──[FF₃]── Q₃
                         ↓
D_in[2] ──[MUX]── D₂ ──[FF₂]── Q₂
                         ↓
D_in[1] ──[MUX]── D₁ ──[FF₁]── Q₁
                         ↓
D_in[0] ──[MUX]── D₀ ──[FF₀]── Q₀ ── Serial Out
```

**MUX control:**

- Load = 1: Select D_in[i]
- Load = 0: Select Q[i+1] (shift right), with Q₃ getting 0

**Example: Transmitting 1101**

| Clock | Load | Q₃Q₂Q₁Q₀ | Serial Out |
|-------|------|----------|------------|
| 0 | 1 | 1101 | 1 |
| 1 | 0 | 0110 | 0 |
| 2 | 0 | 0011 | 1 |
| 3 | 0 | 0001 | 1 |
| 4 | 0 | 0000 | 0 |

**Serial output sequence: 1, 0, 1, 1** (LSB first)

---

## Section B: Counters (5 problems)

### Problem 5
Design a 3-bit synchronous binary up counter using T flip-flops. Show the state table and circuit.

**Solution:** **3-bit Up Counter States:**

| Count | Q₂ | Q₁ | Q₀ |
|-------|----|----|-----|
| 0 | 0 | 0 | 0 |
| 1 | 0 | 0 | 1 |
| 2 | 0 | 1 | 0 |
| 3 | 0 | 1 | 1 |
| 4 | 1 | 0 | 0 |
| 5 | 1 | 0 | 1 |
| 6 | 1 | 1 | 0 |
| 7 | 1 | 1 | 1 |
| (8) | 0 | 0 | 0 | (wrap)

**When does each bit toggle?**

- Q₀: Every clock (T₀ = 1)
- Q₁: When Q₀ = 1 (T₁ = Q₀)
- Q₂: When Q₁Q₀ = 11 (T₂ = Q₁·Q₀)

**Circuit:**

```
   1 ─────────[T FF₀]── Q₀ ────┬──────────────→
                 ↑            │
   CLK ──────────┴────────────┼──────────────→
                              │
   Q₀ ─────────[T FF₁]── Q₁ ──┼──┬───────────→
                 ↑            │  │
   CLK ──────────┴────────────│──┼───────────→
                              │  │
   Q₀·Q₁ ─────[AND]──[T FF₂]──┴──┴── Q₂ ────→
                        ↑
   CLK ─────────────────┘
```

**T input equations:**

- T₀ = 1
- T₁ = Q₀
- T₂ = Q₀ · Q₁

---

### Problem 6
Design a mod-6 counter (counts 0 to 5, then resets to 0) using D flip-flops.

**Solution:** **State sequence:** 0 → 1 → 2 → 3 → 4 → 5 → 0 (repeat)

**State table:**

| Present | Next |
| Q₂Q₁Q₀ | Q₂Q₁Q₀ |
|---------|--------|
| 000 | 001 |
| 001 | 010 |
| 010 | 011 |
| 011 | 100 |
| 100 | 101 |
| 101 | 000 |
| 110 | XXX (don't care) |
| 111 | XXX (don't care) |

**K-maps for D inputs:**

**D₂:**

| Q₂\Q₁Q₀ | 00 | 01 | 11 | 10 |
|---------|----|----|----|----|
| 0 | 0 | 0 | 1 | 0 |
| 1 | 0 | 0 | X | X |

D₂ = Q₂'Q₁Q₀

**D₁:**

| Q₂\Q₁Q₀ | 00 | 01 | 11 | 10 |
|---------|----|----|----|----|
| 0 | 0 | 1 | 0 | 1 |
| 1 | 0 | 0 | X | X |

D₁ = Q₂'Q₁Q₀' + Q₂'Q₁'Q₀ = Q₂'(Q₁⊕Q₀)

**D₀:**

| Q₂\Q₁Q₀ | 00 | 01 | 11 | 10 |
|---------|----|----|----|----|
| 0 | 1 | 0 | 0 | 1 |
| 1 | 1 | 0 | X | X |

D₀ = Q₀'Q₂' + Q₁'Q₀' = Q₀'(Q₂' + Q₁') = Q₀'(Q₂·Q₁)'

Actually simpler: D₀ = Q₁'Q₀' + Q₂'Q₁Q₀'

Let me recalculate: D₀ = Q₀' (only when not in state 5)

For state 5 (101): D₀ = 0 (to go to 000)
For others: D₀ = Q₀'

D₀ = Q₀' · (Q₂Q₀)' = Q₀'·Q₂' + Q₀'·Q₀ = Q₀'Q₂'

Wait, that's not right either. Let me be more careful:

D₀ = 1 for states 0,2,4 going to 1,3,5
D₀ = 0 for states 1,3,5 going to 2,4,0

So D₀ = Q₀'

**Final equations:**

- D₂ = Q₂'Q₁Q₀
- D₁ = Q₂'Q₁'Q₀ + Q₂'Q₁Q₀' = Q₂'(Q₁ ⊕ Q₀)
- D₀ = Q₂'Q₀' + Q₂Q₁'Q₀' = Q₀'(Q₂' + Q₂Q₁') = Q₀'(Q₂' + Q₁')...

Simplest: D₀ = Q₀' · (Q₂'+ (state≠5))

Let me use: D₀ = Q₀' when not resetting, 0 when at state 5

**Simpler approach:** Use synchronous reset

- D₀ = Q₀' · RESET' where RESET = Q₂Q₀
- D₁ = (Q₁ ⊕ Q₀) · RESET'
- D₂ = (Q₂ ⊕ Q₁Q₀) · RESET'

---

### Problem 7
Design a ring counter with 4 bits. Show how it differs from a Johnson counter.

**Solution:** **Ring Counter (4-bit):**

**Structure:** Shift register with Q₀ fed back to D₃

```
Q₀ ──→ D₃ ──[FF₃]── Q₃ ──→ D₂ ──[FF₂]── Q₂ ──→ D₁ ──[FF₁]── Q₁ ──→ D₀ ──[FF₀]── Q₀
```

**Initialization:** One flip-flop set to 1, others to 0

**State sequence:**

| Clock | Q₃ | Q₂ | Q₁ | Q₀ |
|-------|----|----|----|----|
| 0 | 1 | 0 | 0 | 0 |
| 1 | 0 | 1 | 0 | 0 |
| 2 | 0 | 0 | 1 | 0 |
| 3 | 0 | 0 | 0 | 1 |
| 4 | 1 | 0 | 0 | 0 |

**States: 4** (equal to number of flip-flops)

---

**Johnson Counter (4-bit):**

**Structure:** Shift register with Q₀' fed back to D₃

```
Q₀'──→ D₃ ──[FF₃]── Q₃ ──→ D₂ ──[FF₂]── Q₂ ──→ D₁ ──[FF₁]── Q₁ ──→ D₀ ──[FF₀]── Q₀
```

**Initialization:** All flip-flops to 0

**State sequence:**

| Clock | Q₃ | Q₂ | Q₁ | Q₀ |
|-------|----|----|----|----|
| 0 | 0 | 0 | 0 | 0 |
| 1 | 1 | 0 | 0 | 0 |
| 2 | 1 | 1 | 0 | 0 |
| 3 | 1 | 1 | 1 | 0 |
| 4 | 1 | 1 | 1 | 1 |
| 5 | 0 | 1 | 1 | 1 |
| 6 | 0 | 0 | 1 | 1 |
| 7 | 0 | 0 | 0 | 1 |
| 8 | 0 | 0 | 0 | 0 |

**States: 8** (2 × number of flip-flops)

**Comparison:**

| Feature | Ring Counter | Johnson Counter |
|---------|-------------|-----------------|
| States | n | 2n |
| Feedback | Q₀ → D₃ | Q₀' → D₃ |
| Decoding | 1-bit (one-hot) | 2-bit (adjacent) |
| Self-starting | No | No |

---

### Problem 8
Design a BCD counter (0-9) with synchronous reset.

**Solution:** **BCD Counter:** Counts 0-9, then resets to 0

**State sequence:** 0→1→2→3→4→5→6→7→8→9→0

**Using 4-bit binary counter with detection:**

Detect state 9 (1001) and reset on next clock.

**Method 1: Synchronous clear**

Normal 4-bit up counter with:

CLEAR = Q₃·Q₀ (when Q = 1001)

On next clock after 9, counter resets to 0.

**Problem:** This actually clears AT 10 (1010), not after 9.

**Method 2: Next-state logic**

Design next-state equations to go from 9 → 0:

**D₀ = Q₀'** (always toggles)

**D₁:**

- Normally: Q₁ ⊕ Q₀
- At 9 (1001): D₁ = 0

D₁ = (Q₁ ⊕ Q₀) · (Q₃·Q₀)'

**D₂:**

- Normally: Q₂ ⊕ (Q₁·Q₀)
- At 9: D₂ = 0

D₂ = (Q₂ ⊕ Q₁Q₀) · (Q₃Q₀)'

**D₃:**

- Normally: Q₃ ⊕ (Q₂·Q₁·Q₀)
- At 7 (0111): D₃ = 1
- At 9 (1001): D₃ = 0

D₃ = Q₃Q₀' + Q₃'Q₂Q₁Q₀

**Simplified using don't cares (states 10-15):**

- D₃ = Q₃Q₀' + Q₂Q₁Q₀
- D₂ = Q₂Q₀' + Q₂Q₁' + Q₂'Q₁Q₀
- D₁ = Q₃'Q₁'Q₀ + Q₁Q₀'
- D₀ = Q₀'

---

### Problem 9
Calculate the maximum clock frequency for a 4-bit ripple counter if each flip-flop has:

- Propagation delay (tpd): 10 ns
- Setup time: 5 ns

**Solution:** **Ripple Counter Propagation:**

In a ripple (asynchronous) counter, each flip-flop is clocked by the previous flip-flop's output.

**Delay chain:**

```
CLK → FF₀ → FF₁ → FF₂ → FF₃
      10ns   10ns   10ns   10ns
```

**Worst-case delay:**

When counter goes from 0111 to 1000, all bits change in sequence:

- FF₀ toggles first (after 10ns from CLK)
- FF₁ toggles (after 10ns from FF₀) = 20ns from CLK
- FF₂ toggles (after 10ns from FF₁) = 30ns from CLK
- FF₃ toggles (after 10ns from FF₂) = 40ns from CLK

**Total propagation delay: 4 × 10ns = 40ns**

**Maximum clock frequency:**

The clock period must be longer than the worst-case propagation:

Tclk > 4 × tpd = 40ns

**fmax < 1/40ns = 25 MHz**

**Note:** Setup time doesn't directly apply to ripple counters since each FF is clocked by the previous output. However, if external logic reads the counter output, setup time becomes relevant.

**For a synchronous counter:**

Tclk > tpd + tlogic + tsu

With tlogic = propagation through AND gates (for carry), typically faster than ripple.

---

## Section C: Finite State Machines (6 problems)

### Problem 10
Design a sequence detector that outputs 1 when it detects the sequence "101" (overlapping allowed). Draw the state diagram, create the state table, and implement using D flip-flops.

**Solution:** **State Diagram:**

States represent what portion of "101" has been seen:

- S0: Initial (nothing matched)
- S1: Seen "1"
- S2: Seen "10"
- S3: Seen "101" (output 1)

With overlapping, after detecting "101", the last "1" starts a new sequence.

```
    0       1       0       1
S0 ──→ S0   S0 ──→ S1   S1 ──→ S2   S2 ──→ S3
                   1       0
            S1 ──→ S1   S2 ──→ S0

From S3 (Output=1):
    0       1
S3 ──→ S2   S3 ──→ S1
```

**State Table (Moore Machine):**

| Present State | Input | Next State | Output |
|---------------|-------|------------|--------|
| S0 | 0 | S0 | 0 |
| S0 | 1 | S1 | 0 |
| S1 | 0 | S2 | 0 |
| S1 | 1 | S1 | 0 |
| S2 | 0 | S0 | 0 |
| S2 | 1 | S3 | 0 |
| S3 | 0 | S2 | 1 |
| S3 | 1 | S1 | 1 |

**State Assignment:**

- S0 = 00
- S1 = 01
- S2 = 10
- S3 = 11

**Next State Table:**

| Q₁Q₀ | X | Q₁⁺Q₀⁺ | Z |
|------|---|--------|---|
| 00 | 0 | 00 | 0 |
| 00 | 1 | 01 | 0 |
| 01 | 0 | 10 | 0 |
| 01 | 1 | 01 | 0 |
| 10 | 0 | 00 | 0 |
| 10 | 1 | 11 | 0 |
| 11 | 0 | 10 | 1 |
| 11 | 1 | 01 | 1 |

**D input equations:**

D₁ = Q₁'Q₀X' + Q₁Q₀'X + Q₁Q₀X'
D₁ = Q₀X' + Q₁Q₀' X

D₀ = Q₁'Q₀'X + Q₁'Q₀X + Q₁Q₀'X + Q₁Q₀X
D₀ = X

**Output:** Z = Q₁Q₀

---

### Problem 11
Explain the difference between Moore and Mealy machines. Convert the sequence detector from Problem 10 to a Mealy machine.

**Solution:** **Moore vs Mealy:**

| Feature | Moore | Mealy |
|---------|-------|-------|
| Output depends on | State only | State AND input |
| Output changes | With state transition | With input change |
| States typically | More states | Fewer states |
| Output timing | Synchronized to clock | Can be asynchronous |
| Output glitches | Less likely | More likely |

**Mealy Machine for "101" Detector:**

States (can often use fewer):

- S0: Nothing matched
- S1: Seen "1"
- S2: Seen "10"

**State Diagram with outputs on transitions:**

```
From S0:
    0/0 → S0
    1/0 → S1

From S1:
    0/0 → S2
    1/0 → S1

From S2:
    0/0 → S0
    1/1 → S1  (Output 1 when completing "101")
```

**State Table:**

| Present | Input | Next | Output |
|---------|-------|------|--------|
| S0 | 0 | S0 | 0 |
| S0 | 1 | S1 | 0 |
| S1 | 0 | S2 | 0 |
| S1 | 1 | S1 | 0 |
| S2 | 0 | S0 | 0 |
| S2 | 1 | S1 | **1** |

**Comparison:**

- Moore: 4 states, output = Q₁Q₀
- Mealy: 3 states, output = Q₁Q₀'X

**Mealy advantages here:**

- One fewer flip-flop (2-bit vs 2-bit, but could use 3 states vs 4)
- Output is combinational function of state and input

**Output equation (Mealy):**

Z = Q₁Q₀'X (output 1 when in S2 and input is 1)

---

### Problem 12
Design an FSM for a traffic light controller with the following requirements:

- Two states: Green (G) and Red (R)
- Timer input T: 1 when time expired
- Sensor input S: 1 when car waiting
- Transitions: G→R when T=1, R→G when T=1 AND S=1

**Solution:** **State Diagram:**

```
G ←─────────────────────────┐
│                           │
│ T=1                       │ T=1 AND S=1
↓                           │
R ──────────────────────────┘
│
│ T=0 OR S=0
└──(stay in R)
```

**State Table (Moore):**

| State | T | S | Next State | Output (Light) |
|-------|---|---|------------|----------------|
| G | 0 | X | G | Green |
| G | 1 | X | R | Green |
| R | 0 | X | R | Red |
| R | 1 | 0 | R | Red |
| R | 1 | 1 | G | Red |

**State Assignment:**

- G = 0
- R = 1

Let Q represent state (0=G, 1=R)

**Next State equation:**

Q⁺ = Q'T + QT'+ QTS'
Q⁺ = Q'T + Q(T' + TS')
Q⁺ = Q'T + Q(T' + S')
Q⁺ = Q'T + QT' + QS'

Simplify: Q⁺ = T ⊕ Q ... no, let me redo

Q⁺ = 1 when:

- In G (Q=0) and T=1: goes to R
- In R (Q=1) and T=0: stays in R
- In R (Q=1) and T=1, S=0: stays in R

Q⁺ = Q'T + QT' + QS'
Q⁺ = Q'T + Q(T' + S')
Q⁺ = Q'T + Q(TS)' (De Morgan)
Q⁺ = Q ⊕ T when S doesn't matter...

Let's just directly implement:

**D = Q'T + QT' + QTS' = Q'T + Q(T' + TS') = Q'T + Q(TS)'**

**Using D flip-flop:**

D = Q'T + Q(T' + S') = Q'T + QT' + QS'

**Output:**

Green = Q'
Red = Q

---

### Problem 13
Design a 2-bit up/down counter controlled by signal U:

- U = 1: Count up
- U = 0: Count down

**Solution:** **State Sequence:**

Up (U=1): 00 → 01 → 10 → 11 → 00
Down (U=0): 00 → 11 → 10 → 01 → 00

**State Table:**

| Q₁Q₀ | U | Q₁⁺Q₀⁺ |
|------|---|--------|
| 00 | 0 | 11 |
| 00 | 1 | 01 |
| 01 | 0 | 00 |
| 01 | 1 | 10 |
| 10 | 0 | 01 |
| 10 | 1 | 11 |
| 11 | 0 | 10 |
| 11 | 1 | 00 |

**K-maps:**

**D₁:**

| Q₁Q₀\U | 0 | 1 |
|--------|---|---|
| 00 | 1 | 0 |
| 01 | 0 | 1 |
| 11 | 1 | 0 |
| 10 | 0 | 1 |

D₁ = Q₁'Q₀'U' + Q₁'Q₀U + Q₁Q₀U' + Q₁Q₀'U
D₁ = Q₁'(Q₀'U' + Q₀U) + Q₁(Q₀U' + Q₀'U)
D₁ = Q₁'(Q₀⊕U)' + Q₁(Q₀⊕U)
D₁ = Q₁ ⊕ (Q₀⊕U)'
D₁ = Q₁ ⊕ Q₀ ⊕ U'

**D₀:**

| Q₁Q₀\U | 0 | 1 |
|--------|---|---|
| 00 | 1 | 1 |
| 01 | 0 | 0 |
| 11 | 0 | 0 |
| 10 | 1 | 1 |

D₀ = Q₀'

**Summary:**

- D₀ = Q₀' (always toggle)
- D₁ = Q₁ ⊕ Q₀ ⊕ U' = Q₁ ⊕ (Q₀ XNOR U)

**Circuit:**

```
Q₀' ─────────────[D FF₀]── Q₀
                    ↑
CLK ────────────────┘

Q₁ ──┬──[XOR]──[XOR]──[D FF₁]── Q₁
Q₀ ──┘         ↑        ↑
U' ────────────┘        │
CLK ────────────────────┘
```

---

### Problem 14
What is one-hot encoding for state machines? Give advantages and disadvantages.

**Solution:** **One-Hot Encoding:**

Each state uses one flip-flop; only one flip-flop is '1' at a time.

**Example (4 states):**

| State | Binary | One-Hot |
|-------|--------|---------|
| S0 | 00 | 0001 |
| S1 | 01 | 0010 |
| S2 | 10 | 0100 |
| S3 | 11 | 1000 |

**Advantages:**

1. **Simple next-state logic:** Each transition is a simple AND of conditions
   - To go to S2: just set bit 2, clear others
   - D₂ = (conditions to enter S2)

2. **Fast decoding:** State is directly indicated by which bit is high
   - No decoder needed for outputs

3. **Easy to modify:** Adding states just adds flip-flops

4. **Fewer logic levels:** Typically 2-level logic

5. **Glitch-free outputs:** One-hot transitions have only one bit changing

**Disadvantages:**

1. **More flip-flops:** n states need n flip-flops
   - Binary needs only ⌈log₂n⌉ flip-flops

2. **Illegal states:** Many more invalid states (2ⁿ - n)
   - Need detection/recovery logic

3. **Power consumption:** More flip-flops = more switching power

4. **Initialization:** Must ensure exactly one bit is set at startup

**When to use:**

| Criteria | Prefer One-Hot | Prefer Binary |
|----------|----------------|---------------|
| Speed | ✓ | |
| Flip-flop count | | ✓ |
| FPGAs | ✓ | |
| ASICs | Depends | Depends |
| Few states (<8) | ✓ | |
| Many states (>32) | | ✓ |

---

### Problem 15
Design a vending machine controller with the following specifications:

- Accepts nickels (5¢) and dimes (10¢)
- Dispenses item when 15¢ or more is deposited
- Returns to idle after dispensing

**Solution:** **States (based on amount deposited):**

- S0: 0¢ (idle)
- S5: 5¢
- S10: 10¢
- S15: 15¢ (dispense)

**Inputs:**

- N: Nickel inserted
- D: Dime inserted

**Outputs:**

- DISP: Dispense item

**State Diagram:**

```
S0 (0¢) ─N→ S5 (5¢) ─N→ S10 (10¢) ─N→ S15 (dispense)
   │         │           │              │
   └──D──→   └──D──→     └──D──→        │
   ↓         ↓           ↓              ↓
S10 (10¢)  S15 (disp)  S15 (disp)     S0 (auto)
```

**State Table:**

| State | N | D | Next | DISP |
|-------|---|---|------|------|
| S0 | 0 | 0 | S0 | 0 |
| S0 | 1 | 0 | S5 | 0 |
| S0 | 0 | 1 | S10 | 0 |
| S5 | 0 | 0 | S5 | 0 |
| S5 | 1 | 0 | S10 | 0 |
| S5 | 0 | 1 | S15 | 0 |
| S10 | 0 | 0 | S10 | 0 |
| S10 | 1 | 0 | S15 | 0 |
| S10 | 0 | 1 | S15 | 0 |
| S15 | X | X | S0 | 1 |

**State Assignment:**

- S0 = 00
- S5 = 01
- S10 = 10
- S15 = 11

**Next State Equations:**

D₁ = Q₁'Q₀D + Q₁'D + Q₁Q₀'(N+D) + ...

(Full derivation from K-maps)

**Output:** DISP = Q₁Q₀

---

## Section D: Design Problems (2 problems)

### Problem 16
Design a serial adder that adds two n-bit numbers bit by bit, starting from LSB. The circuit has inputs A, B (serial bits), outputs S (sum bit), and must handle carry.

**Solution:** **Serial Adder Operation:**

Add one bit position per clock cycle, propagating carry to next cycle.

**Inputs:**

- A: Current bit of first number
- B: Current bit of second number
- (Internal) C: Carry from previous position

**Outputs:**

- S: Sum bit for current position
- (Internal) C_next: Carry for next position

**Full Adder Logic:**

- S = A ⊕ B ⊕ C
- C_next = AB + BC + AC

**Circuit:**

```
A ───┬───────────────┐
     │               │
B ───┼───[Full]───S──┴── Sum output
     │   Adder
C ───┼───────────C_next──[D FF]──┬── C (feedback)
     │                    ↑       │
     └────────────────────│───────┘
CLK ──────────────────────┘
```

**State Machine View:**

- 2 states: C=0, C=1
- Input: AB
- Output: S
- Next state: C_next

**State Table:**

| C | A | B | S | C_next |
|---|---|---|---|--------|
| 0 | 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 1 | 0 |
| 0 | 1 | 0 | 1 | 0 |
| 0 | 1 | 1 | 0 | 1 |
| 1 | 0 | 0 | 1 | 0 |
| 1 | 0 | 1 | 0 | 1 |
| 1 | 1 | 0 | 0 | 1 |
| 1 | 1 | 1 | 1 | 1 |

**Equations:**

- S = A ⊕ B ⊕ C
- D = AB + C(A ⊕ B) = AB + AC + BC (majority function)

---

### Problem 17
Design a sequence generator that outputs the repeating sequence: 1, 1, 0, 1, 0, 0

**Solution:** **Sequence:** 1, 1, 0, 1, 0, 0 (period = 6)

**Approach:** Use mod-6 counter with output decoder

**States:**

| State | Counter | Output |
|-------|---------|--------|
| 0 | 000 | 1 |
| 1 | 001 | 1 |
| 2 | 010 | 0 |
| 3 | 011 | 1 |
| 4 | 100 | 0 |
| 5 | 101 | 0 |

**Counter Design:** (See Problem 6)

**Output Equation:**

Z = 1 for states 0, 1, 3

Z = Q₂'Q₁'Q₀' + Q₂'Q₁'Q₀ + Q₂'Q₁Q₀
Z = Q₂'Q₁' + Q₂'Q₁Q₀
Z = Q₂'(Q₁' + Q₁Q₀)
Z = Q₂'(Q₁' + Q₀)
Z = Q₂'Q₁' + Q₂'Q₀

**Alternative approach: Shift register with feedback**

6-bit shift register with pattern loaded: 110100

```
Load: 1 1 0 1 0 0
      ↓ ↓ ↓ ↓ ↓ ↓
[FF₅][FF₄][FF₃][FF₂][FF₁][FF₀]── Output
  ↑                          │
  └──────────────────────────┘ (feedback)
```

On each clock, shift right, Q₀ feeds back to Q₅.

**Output:** Q₀

---

## Section E: Analysis Problems (3 problems)

### Problem 18
Analyze the following circuit and determine its function:

```
    ┌─────────────────────────────┐
    │                             │
D ──┼──[D FF₀]── Q₀ ──[D FF₁]── Q₁
    │      ↑            ↑
CLK ┴──────┴────────────┘
```

(D is input, CLK is shared, Q₀ output of FF₀ feeds D input of FF₁)

**Solution:** **Circuit Analysis:**

- FF₀: D input = external D, outputs Q₀
- FF₁: D input = Q₀, outputs Q₁

Both flip-flops share the same clock.

**Behavior:**

At each clock edge:

- Q₀(next) = D (current input)
- Q₁(next) = Q₀ (previous Q₀ value)

**This is a 2-bit shift register!**

**Timing example:**

| Clock | D | Q₀ | Q₁ |
|-------|---|----|----|
| 0 | 0 | 0 | 0 |
| 1 | 1 | 1 | 0 |
| 2 | 0 | 0 | 1 |
| 3 | 1 | 1 | 0 |
| 4 | 1 | 1 | 1 |

**Function:** 2-stage pipeline / delay line

- Q₀ = D delayed by 1 clock
- Q₁ = D delayed by 2 clocks

**Applications:**

- Serial data shift register
- Synchronizer (metastability prevention)
- Pipeline stage

---

### Problem 19
What is the state sequence of this circuit? (Assume initial state 00)

```
D₀ = Q₁
D₁ = Q₀'

[D FF₀]── Q₀
[D FF₁]── Q₁

Both share CLK
```

**Solution:** **State Transition Analysis:**

| Present Q₁Q₀ | D₁=Q₀' | D₀=Q₁ | Next Q₁Q₀ |
|--------------|--------|-------|-----------|
| 00 | 1 | 0 | 10 |
| 01 | 0 | 0 | 00 |
| 10 | 1 | 1 | 11 |
| 11 | 0 | 1 | 01 |

**State Sequence from 00:**

00 → 10 → 11 → 01 → 00 → (repeats)

**Period:** 4 states

**This is a 2-bit Johnson counter!**

**State Diagram:**

```
00 → 10 → 11 → 01
 ↑              │
 └──────────────┘
```

**Characteristic:** Gray code sequence (only one bit changes per transition)

00 → 10 (Q₁ changes)
10 → 11 (Q₀ changes)
11 → 01 (Q₁ changes)
01 → 00 (Q₀ changes)

---

### Problem 20
Given a Moore FSM with the following state diagram, derive the state table and implement with D flip-flops:

```
States: A, B, C (outputs 0, 0, 1 respectively)
Transitions:
- A: input 0 → A, input 1 → B
- B: input 0 → A, input 1 → C
- C: input 0 → A, input 1 → C
```

**Solution:** **State Table:**

| State | Input X | Next State | Output Z |
|-------|---------|------------|----------|
| A | 0 | A | 0 |
| A | 1 | B | 0 |
| B | 0 | A | 0 |
| B | 1 | C | 0 |
| C | 0 | A | 1 |
| C | 1 | C | 1 |

**State Assignment:**

- A = 00
- B = 01
- C = 10 (or 11, but 10 keeps it simple)

**Encoded State Table:**

| Q₁Q₀ | X | Q₁⁺Q₀⁺ | Z |
|------|---|--------|---|
| 00 | 0 | 00 | 0 |
| 00 | 1 | 01 | 0 |
| 01 | 0 | 00 | 0 |
| 01 | 1 | 10 | 0 |
| 10 | 0 | 00 | 1 |
| 10 | 1 | 10 | 1 |
| 11 | 0 | XX | X |
| 11 | 1 | XX | X |

**K-maps:**

**D₁:**

| Q₁Q₀\X | 0 | 1 |
|--------|---|---|
| 00 | 0 | 0 |
| 01 | 0 | 1 |
| 11 | X | X |
| 10 | 0 | 1 |

D₁ = Q₀X + Q₁X = X(Q₀ + Q₁)

**D₀:**

| Q₁Q₀\X | 0 | 1 |
|--------|---|---|
| 00 | 0 | 1 |
| 01 | 0 | 0 |
| 11 | X | X |
| 10 | 0 | 0 |

D₀ = Q₁'Q₀'X

**Output Z:**

Z = Q₁ (output is 1 only in state C where Q₁=1)

**Circuit:**

```
X ──┬───[AND]───────[D FF₁]── Q₁ ─── Z
    │     ↑            ↑
Q₁ ─┼──[OR]┘           │
Q₀ ─┤                  │
    │                  │
Q₁'─┬──[AND]──[D FF₀]──Q₀
Q₀'─┤     ↑
X ──┘     │
          │
CLK ──────┴───────────────
```

---

## Summary

| Section | Topics Covered | Problem Count |
|---------|---------------|---------------|
| A | Registers | 4 |
| B | Counters | 5 |
| C | Finite State Machines | 6 |
| D | Design Problems | 2 |
| E | Analysis Problems | 3 |
| **Total** | | **20** |
