---
title: Unit 13 Challenge - System Integration
description: Challenge problems for system integration — answers only, no solutions
---

<div class="problems-styled" markdown>

# Challenge Problems: System Integration

These challenge problems test deeper understanding. Only final answers are provided — work through each problem on your own.

---

#### Challenge 1: GCD Calculator — Datapath-Controller Design

Design a datapath and controller for a circuit that computes the Greatest Common Divisor (GCD) of two 8-bit unsigned numbers $A$ and $B$ using the subtraction-based Euclidean algorithm:

```
while A != B:
    if A > B:  A = A - B
    else:      B = B - A
GCD = A
```

Provide the complete datapath (registers, comparator, subtractor, MUX), controller FSM states, and control signal table. How many clock cycles does it take to compute GCD(12, 8)?

**Answer:** **Datapath:**

```
A_IN[7:0]──→[MUX_A]──→[Reg_A]──┬──→[Comparator]──→ A_EQ_B, A_GT_B
               ↑        │       │        ↑
             SEL_A      │       │    [Reg_B]←──[MUX_B]←── B_IN[7:0]
                        │       │       │        ↑
                        ↓       └───────┤      SEL_B
                   [Subtractor]         │
                   A - B    B - A ←─────┘
                     │        │
                     ↓        ↓
                (to MUX_A) (to MUX_B)
```

**MUX_A selects:** (0) A_IN, (1) A - B, (2) Reg_A (hold)

**MUX_B selects:** (0) B_IN, (1) B - A, (2) Reg_B (hold)

**Controller FSM:**

| State | Condition | Actions | Next State |
|-------|-----------|---------|------------|
| S0: IDLE | START=1 | SEL_A=0, SEL_B=0, LD_A=1, LD_B=1 | S1 |
| S0: IDLE | START=0 | — | S0 |
| S1: COMPARE | A_EQ_B=1 | Assert DONE, GCD = A | S0 |
| S1: COMPARE | A_GT_B=1 | SEL_A=1, LD_A=1 (A = A-B) | S1 |
| S1: COMPARE | A_GT_B=0, A_EQ_B=0 | SEL_B=1, LD_B=1 (B = B-A) | S1 |

**Control signal table:**

| State | SEL_A | SEL_B | LD_A | LD_B | DONE |
|-------|-------|-------|------|------|------|
| IDLE (loading) | 0 | 0 | 1 | 1 | 0 |
| COMPARE (A>B) | 1 | 2 | 1 | 0 | 0 |
| COMPARE (B>A) | 2 | 1 | 0 | 1 | 0 |
| COMPARE (A=B) | 2 | 2 | 0 | 0 | 1 |

**GCD(12, 8) trace:**

| Cycle | A | B | Action |
|-------|---|---|--------|
| 0 | 12 | 8 | Load |
| 1 | 4 | 8 | A>B: A = 12-8 = 4 |
| 2 | 4 | 4 | B>A: B = 8-4 = 4 |
| 3 | — | — | A=B: DONE, GCD = 4 |

**Total: 3 clock cycles** (after loading). GCD(12, 8) = **4**.

**Worst case for 8-bit inputs:** GCD(255, 1) takes 254 iterations. For faster computation, use the modulo-based algorithm ($A = A \mod B$) with a divider, reducing worst case to $O(\log(\min(A,B)))$ iterations.

---

#### Challenge 2: Multi-Stage Pipeline Timing with Clock Skew

A 5-stage pipeline has the following stage delays (combinational logic only):

| Stage | Delay |
|-------|-------|
| 1 | 3.2 ns |
| 2 | 4.8 ns |
| 3 | 5.1 ns |
| 4 | 3.9 ns |
| 5 | 2.5 ns |

Flip-flop parameters: $T_{cq}$ = 0.4 ns, $T_{setup}$ = 0.3 ns, $T_{hold}$ = 0.15 ns.

Clock distribution introduces the following skews at each pipeline register (positive means clock arrives late relative to the source register):

| Register boundary | Skew $\delta$ |
|-------------------|------|
| Reg 1→2 | +0.2 ns |
| Reg 2→3 | -0.3 ns |
| Reg 3→4 | +0.4 ns |
| Reg 4→5 | -0.1 ns |

(a) Find the true $f_{max}$ considering clock skew.
(b) Identify any hold time violations.
(c) What is the pipeline throughput and latency?

**Answer:** **(a) Setup analysis per stage** (constraint: $T_{cq} + T_{comb} + T_{setup} \leq T_{clk} + \delta$):

Required $T_{clk}$ per stage = $T_{cq} + T_{comb} + T_{setup} - \delta$:

| Stage | Calculation | Required $T_{clk}$ |
|-------|------------|-------------------|
| 1 (skew +0.2) | $0.4 + 3.2 + 0.3 - 0.2$ | 3.7 ns |
| 2 (skew -0.3) | $0.4 + 4.8 + 0.3 - (-0.3)$ | 5.8 ns |
| 3 (skew +0.4) | $0.4 + 5.1 + 0.3 - 0.4$ | 5.4 ns |
| 4 (skew -0.1) | $0.4 + 3.9 + 0.3 - (-0.1)$ | 4.7 ns |
| 5 (output reg, $\delta$=0) | $0.4 + 2.5 + 0.3 - 0$ | 3.2 ns |

**Bottleneck: Stage 2 at 5.8 ns** (negative skew makes it worse).

$$f_{max} = \frac{1}{5.8 \text{ ns}} = 172.4 \text{ MHz}$$

Without skew, the bottleneck would be Stage 3: $T_{clk} = 0.4 + 5.1 + 0.3 = 5.8$ ns, so $f_{max}$ = 172.4 MHz (coincidentally the same in this case, but for a different stage).

**(b) Hold time analysis** (constraint: $T_{cq} + T_{comb,min} \geq T_{hold} + \delta$):

Assuming $T_{comb,min} = 0$ for direct register-to-register paths:

| Boundary | $T_{cq} + 0 \geq T_{hold} + \delta$? | Margin |
|----------|--------------------------------------|--------|
| Reg 1→2 ($\delta$=+0.2) | $0.4 \geq 0.15 + 0.2 = 0.35$ | +0.05 ns (OK) |
| Reg 2→3 ($\delta$=-0.3) | $0.4 \geq 0.15 + (-0.3) = -0.15$ | +0.55 ns (OK) |
| Reg 3→4 ($\delta$=+0.4) | $0.4 \geq 0.15 + 0.4 = 0.55$ | **-0.15 ns (VIOLATION!)** |
| Reg 4→5 ($\delta$=-0.1) | $0.4 \geq 0.15 + (-0.1) = 0.05$ | +0.35 ns (OK) |

**Hold time violation at Reg 3→4 boundary.** The +0.4 ns positive skew means the destination register samples too late, and data from the next cycle may overwrite the current value. Fix: add a buffer with $\geq$ 0.15 ns delay on the shortest path between Reg 3 and Reg 4, or reduce clock skew.

**(c) Pipeline metrics:**

- $T_{clk}$ = 5.8 ns
- **Throughput** = $1 / 5.8 \text{ ns}$ = **172.4 M results/s**
- **Latency** = $5 \times 5.8$ = **29.0 ns** (5 pipeline stages)

---

#### Challenge 3: UART Receiver FSM with Error Detection

Design a UART receiver FSM that receives 8-bit data at 9600 baud from a 50 MHz system clock. The receiver must:

- Detect the start bit (falling edge on RX line)
- Sample data bits at the center of each bit period
- Detect framing errors (invalid stop bit)
- Detect a break condition (RX held low for entire frame)

Provide the FSM states, transitions, and outputs. Include the baud-rate counter values for center-of-bit sampling.

**Answer:** **Baud-rate counter:** $50{,}000{,}000 / 9600 = 5208$ clocks per bit.

**Center sampling:** Sample at count $5208 / 2 = 2604$ after bit start.

**Oversampling alternative:** 16x oversampling: $50{,}000{,}000 / (9600 \times 16) = 326$ clocks per sample. Sample at count 8 of 16 (center).

**FSM States (using 16x oversampling):**

| State | Description |
|-------|-------------|
| IDLE | Wait for RX = 0 (start bit falling edge) |
| START | Verify start bit at center (sample 8); if RX=1, false start → IDLE |
| DATA | Sample 8 data bits at center of each bit period |
| STOP | Check stop bit at center; RX must be 1 |
| ERROR | Framing error detected (invalid stop bit) |
| BREAK | Break condition (all zeros including stop bit) |

**FSM transitions:**

| Current | Condition | Next | Actions |
|---------|-----------|------|---------|
| IDLE | RX=0 | START | Reset baud counter, reset bit counter |
| START | sample_tick AND RX=1 | IDLE | False start (noise) |
| START | sample_tick AND RX=0 | DATA | Start bit confirmed |
| DATA | sample_tick | DATA | Shift RX into data register; bit_cnt++ |
| DATA | sample_tick AND bit_cnt=8 | STOP | All 8 bits received |
| STOP | sample_tick AND RX=1 | IDLE | Valid frame: assert DATA_VALID |
| STOP | sample_tick AND RX=0 AND data=0x00 | BREAK | Break condition |
| STOP | sample_tick AND RX=0 AND data!=0x00 | ERROR | Framing error |
| ERROR | — | IDLE | Assert FRAME_ERR for one cycle |
| BREAK | RX=1 | IDLE | Assert BREAK_DET when RX returns high |

**Outputs:**

| Signal | Meaning |
|--------|---------|
| DATA_OUT[7:0] | Received byte |
| DATA_VALID | Pulse: valid byte received |
| FRAME_ERR | Pulse: stop bit was 0 |
| BREAK_DET | Pulse: break condition ended |
| BUSY | High during reception |

**Counter values (16x oversampling, 326 clocks per sample):**

- Start bit detection: Begin counting when RX falls
- Center of start bit: After 8 sample ticks (count = $8 \times 326 = 2608$)
- Center of data bit $n$ ($n = 0..7$): After $8 + 16(n+1) - 8 = 16n + 16$ sample ticks from start = count $(16 + 16n) \times 326$
- Center of stop bit: After $8 + 16 \times 9 = 152$ sample ticks

**Timing diagram for receiving 0x55 (01010101):**

```
RX: ‾‾‾\_____/‾‾‾‾‾\____/‾‾‾‾‾\____/‾‾‾‾‾\____/‾‾‾‾‾\_____/‾‾‾
     idle |start| D0=1| D1=0| D2=1| D3=0| D4=1| D5=0| D6=1| D7=0|stop|
          ↑     ↑     ↑     ↑     ↑     ↑     ↑     ↑     ↑     ↑
        detect  sample points at center of each bit
```

**Error detection coverage:**

| Error Type | Detection Method |
|-----------|-----------------|
| Framing error | Stop bit sampled as 0 |
| Break condition | All data = 0 and stop = 0 |
| False start | Start bit center sampled as 1 |
| Noise | 16x oversampling + majority voting (optional enhancement) |

---

#### Challenge 4: FPGA LUT Cascade for Functions Exceeding Single LUT Capacity

An FPGA has 4-input LUTs (LUT-4). A design requires implementing the following 7-input function:

$$H(A,B,C,D,E,F,G) = ABCD + EFGA + \overline{A}\,\overline{B}\,\overline{C}\,\overline{D}\,\overline{E}\,\overline{F}\,\overline{G}$$

Decompose this function using Shannon expansion to map it onto LUT-4 resources. Determine:

(a) The minimum number of LUT-4s required.
(b) The number of logic levels (LUT depth).
(c) The LUT contents for each LUT in the decomposition.

**Answer:** **(a) & (b) Shannon expansion decomposition:**

Expand $H$ about variables $A$, $B$, $C$ (splitting 7 variables into groups that fit LUT-4 inputs):

$$H = A \cdot H_A + \overline{A} \cdot H_{\overline{A}}$$

**Cofactor $H_A$ (set $A = 1$):**

$$H_A = BCD + EFG + 0 = BCD + EFG$$

**Cofactor $H_{\overline{A}}$ (set $A = 0$):**

$$H_{\overline{A}} = 0 + 0 + \overline{B}\,\overline{C}\,\overline{D}\,\overline{E}\,\overline{F}\,\overline{G}$$

Now decompose each cofactor further to fit LUT-4.

**$H_A = BCD + EFG$** — has 6 variables, still exceeds LUT-4. Split into two sub-functions:

- $H_{A1}(B,C,D) = BCD$ — 3 variables, fits one LUT-4
- $H_{A2}(E,F,G) = EFG$ — 3 variables, fits one LUT-4
- $H_A = H_{A1} + H_{A2}$ — 2 inputs, combined in the final LUT

**$H_{\overline{A}} = \overline{B}\,\overline{C}\,\overline{D}\,\overline{E}\,\overline{F}\,\overline{G}$** — has 6 variables, exceeds LUT-4. Split:

- $H_{\overline{A}1}(B,C,D) = \overline{B}\,\overline{C}\,\overline{D}$ — 3 variables, fits one LUT-4
- $H_{\overline{A}2}(E,F,G) = \overline{E}\,\overline{F}\,\overline{G}$ — 3 variables, fits one LUT-4
- $H_{\overline{A}} = H_{\overline{A}1} \cdot H_{\overline{A}2}$ — 2 inputs, combined in the final LUT

**Final combination:**

$$H = A \cdot (H_{A1} + H_{A2}) + \overline{A} \cdot (H_{\overline{A}1} \cdot H_{\overline{A}2})$$

This requires a final LUT with inputs: $A$, $H_{A1}$, $H_{A2}$, $H_{\overline{A}1}$... but that is 4 inputs only if we pre-combine. Restructure:

- **LUT 1:** $P = BCD$ (inputs: B, C, D, unused)
- **LUT 2:** $Q = EFG$ (inputs: E, F, G, unused)
- **LUT 3:** $R = \overline{B}\,\overline{C}\,\overline{D}$ (inputs: B, C, D, unused)
- **LUT 4:** $S = \overline{E}\,\overline{F}\,\overline{G}$ (inputs: E, F, G, unused)
- **LUT 5:** $H = A(P + Q) + \overline{A}(R \cdot S)$ (inputs: A, $P{+}Q$, $R{\cdot}S$, unused)

But $P + Q$ and $R \cdot S$ each need their own LUT:

- **LUT 5:** $T_1 = P + Q$ (inputs: P, Q, unused, unused)
- **LUT 6:** $T_2 = R \cdot S$ (inputs: R, S, unused, unused)
- **LUT 7:** $H = A \cdot T_1 + \overline{A} \cdot T_2$ (inputs: A, $T_1$, $T_2$, unused)

However, we can optimize by merging stages. Notice LUT 5 can compute $A \cdot P$ if we route $A$ to it:

**Optimized decomposition (5 LUTs):**

- **LUT 1:** $P = BCD$ (inputs: B, C, D, —)
- **LUT 2:** $Q = EFG$ (inputs: E, F, G, —)
- **LUT 3:** $T_1 = P + Q$ (inputs: P, Q, —, —)
- **LUT 4:** $T_2 = \overline{B}\,\overline{C}\,\overline{D}\,\overline{E}$ (inputs: B, C, D, E) — partial term
- **LUT 5:** $H = A \cdot T_1 + \overline{A} \cdot T_2 \cdot \overline{F} \cdot \overline{G}$ (inputs: A, $T_1$, $T_2$, —) — but this has $\overline{F}$, $\overline{G}$ unaccounted

This exceeds 4 inputs. The clean minimum is:

**Minimum solution (5 LUTs, 3 levels):**

| LUT | Function | Inputs | Level |
|-----|----------|--------|-------|
| LUT 1 | $P = BCD$ | B, C, D, — | 1 |
| LUT 2 | $Q = EFGA = EFG \cdot A$ | A, E, F, G | 1 |
| LUT 3 | $R = \overline{A}\,\overline{B}\,\overline{C}\,\overline{D}$ | A, B, C, D | 1 |
| LUT 4 | $S = \overline{E}\,\overline{F}\,\overline{G}$ | E, F, G, — | 1 |
| LUT 5 | $H = P + Q + R \cdot S$ | P, Q, R, S | 2 |

**Verification:**

- $P = BCD$: covers the $ABCD$ term when $A = 1$ (but $P$ alone is $BCD$ regardless of $A$)
- Actually $ABCD = A \cdot P$, so we need $A$ in the final combination

**Correct minimum (5 LUTs, 2 levels):**

| LUT | Function | Inputs | Level |
|-----|----------|--------|-------|
| LUT 1 | $P = ABCD$ | A, B, C, D | 1 |
| LUT 2 | $Q = EFGA$ | A, E, F, G | 1 |
| LUT 3 | $R = \overline{A}\,\overline{B}\,\overline{C}\,\overline{D}$ | A, B, C, D | 1 |
| LUT 4 | $S = \overline{E}\,\overline{F}\,\overline{G}$ | E, F, G, — | 1 |
| LUT 5 | $H = P + Q + R \cdot S$ | P, Q, R, S | 2 |

**(a) Minimum number of LUT-4s: 5**

**(b) Logic levels (LUT depth): 2**

**(c) LUT contents:**

**LUT 1** — $P = ABCD$ (4 inputs: A, B, C, D):

| ABCD | P |
|------|---|
| 0000–1110 | 0 |
| 1111 | 1 |

Output = 1 only when all inputs are 1. (1 of 16 entries is 1)

**LUT 2** — $Q = AEFG$ (4 inputs: A, E, F, G):

| AEFG | Q |
|------|---|
| 0000–1110 | 0 |
| 1111 | 1 |

Output = 1 only when $A = E = F = G = 1$. (1 of 16 entries is 1)

**LUT 3** — $R = \overline{A}\,\overline{B}\,\overline{C}\,\overline{D}$ (4 inputs: A, B, C, D):

| ABCD | R |
|------|---|
| 0000 | 1 |
| 0001–1111 | 0 |

Output = 1 only when all inputs are 0. (1 of 16 entries is 1)

**LUT 4** — $S = \overline{E}\,\overline{F}\,\overline{G}$ (3 inputs: E, F, G, unused):

| EFG | S |
|-----|---|
| 000 | 1 |
| 001–111 | 0 |

Output = 1 only when $E = F = G = 0$. (1 of 8 entries is 1; 4th input unused/tied low)

**LUT 5** — $H = P + Q + R \cdot S$ (4 inputs: P, Q, R, S):

| P | Q | R | S | H |
|---|---|---|---|---|
| 0 | 0 | 0 | 0 | 0 |
| 0 | 0 | 0 | 1 | 0 |
| 0 | 0 | 1 | 0 | 0 |
| 0 | 0 | 1 | 1 | 1 |
| 0 | 1 | X | X | 1 |
| 1 | X | X | X | 1 |

$H = 1$ when $P = 1$ (i.e., $ABCD$), or $Q = 1$ (i.e., $AEFG$), or both $R = 1$ and $S = 1$ (i.e., $\overline{A}\,\overline{B}\,\overline{C}\,\overline{D}\,\overline{E}\,\overline{F}\,\overline{G}$). Of 16 truth table rows, 11 produce output 1.

**Circuit diagram:**

```
A ──┬──→ [LUT 1: ABCD] ──→ P ──→ ┐
B ──┼──→             │             │
C ──┼──→             │             │
D ──┘                              │
                                   ├──→ [LUT 5: P+Q+RS] ──→ H
A ──┬──→ [LUT 2: AEFG] ──→ Q ──→ ┤
E ──┼──→             │             │
F ──┼──→             │             │
G ──┘                              │
                                   │
A ──┬──→ [LUT 3: A̅B̅C̅D̅] ──→ R ──→ ┤
B ──┼──→             │             │
C ──┼──→             │             │
D ──┘                              │
                                   │
E ──┬──→ [LUT 4: E̅F̅G̅] ──→ S ──→ ┘
F ──┼──→           │
G ──┘              │
```

**Note:** LUTs 1 and 3 share inputs A, B, C, D — an FPGA router can exploit this locality. Variable $A$ appears in three first-level LUTs, requiring fan-out of 3 in the routing fabric.

---

#### Challenge 5: Complete System Integration — Vending Machine with Display and Coin Handling

Design a complete vending machine system with:

- Coin acceptor: nickels (5c), dimes (10c), quarters (25c)
- 4 product selections (A, B, C, D) costing 50c, 75c, 100c, 125c
- Coin return button
- 2-digit 7-segment display showing amount deposited
- Change return mechanism (returns smallest number of coins)

Provide: (1) the complete system block diagram with all modules and interconnections, (2) the controller FSM states and transitions, (3) the datapath for coin accumulation and change calculation, and (4) the display subsystem design.

**Answer:** **(1) System block diagram:**

```
┌──────────────────────────────────────────────────────────────┐
│                    VENDING MACHINE SYSTEM                    │
│                                                              │
│  [Coin Sensor]──→ COIN[1:0] ──→ ┐                          │
│  (N=01,D=10,Q=11)               │                          │
│                            ┌─────┴──────┐                   │
│  [Button Inputs]           │   MAIN     │                   │
│  SEL[1:0] ──────────────→  │ CONTROLLER │                   │
│  COIN_RETURN ───────────→  │   (FSM)    │                   │
│                            └──┬──┬──┬───┘                   │
│                 ┌─────────────┘  │  └────────────┐          │
│                 ↓                ↓                ↓          │
│  ┌──────────────────┐  ┌──────────────┐  ┌────────────┐    │
│  │  COIN DATAPATH   │  │   PRODUCT    │  │  CHANGE    │    │
│  │                  │  │   PRICE      │  │  CALCULATOR│    │
│  │ [Accumulator Reg]│  │   ROM        │  │            │    │
│  │ [8-bit Adder]    │  │ A=50,B=75   │  │ [Subtractor]│   │
│  │ [Comparator]     │  │ C=100,D=125 │  │ [Dividers]  │   │
│  └────────┬─────────┘  └──────┬───────┘  └──────┬─────┘    │
│           │                    │                  │          │
│           ↓                    ↓                  ↓          │
│  ┌──────────────┐    ┌──────────────┐   ┌──────────────┐   │
│  │   DISPLAY    │    │   DISPENSER  │   │ COIN RETURN  │   │
│  │  SUBSYSTEM   │    │   CONTROL    │   │  MECHANISM   │   │
│  │ [Bin→BCD]    │    │              │   │              │   │
│  │ [7-Seg Dec]  │    │  DISP_A..D   │   │ RET_Q,D,N   │   │
│  │ [Digit MUX]  │    └──────────────┘   └──────────────┘   │
│  └──────────────┘                                           │
└──────────────────────────────────────────────────────────────┘
```

**(2) Controller FSM:**

| State | Description | Transitions |
|-------|-------------|-------------|
| S_IDLE | Display "00", wait for coins | Coin inserted → S_ACCUM |
| S_ACCUM | Add coin value to total, display amount | Coin: stay; SEL pressed: → S_CHECK; COIN_RETURN: → S_RETURN |
| S_CHECK | Compare total vs selected product price | Total $\geq$ Price → S_DISPENSE; Total < Price → S_INSUFFIC |
| S_INSUFFIC | Flash display "XX", return to accumulate | After 1s → S_ACCUM |
| S_DISPENSE | Activate product dispenser | Dispense done → S_CHANGE |
| S_CHANGE | Calculate and return change | Change = 0 → S_IDLE; Change > 0 → S_RETURN |
| S_RETURN | Return coins (quarter by quarter, then dimes, then nickels) | Change = 0 → S_IDLE |

**(3) Coin datapath:**

Accumulator register (8-bit, max value 255 cents — sufficient for up to $2.55):

| Coin input | Value added |
|-----------|-------------|
| Nickel (01) | +5 |
| Dime (10) | +10 |
| Quarter (11) | +25 |

```
COIN[1:0] ──→ [Coin Value LUT] ──→ COIN_VAL[4:0]
                  │
                  ↓
TOTAL[7:0] ←── [Adder] ←── TOTAL (feedback)
                  ↑
               ADD_EN (from controller)
```

**Change calculation (greedy algorithm):**

```
CHANGE = TOTAL - PRICE
NUM_QUARTERS = CHANGE / 25     (integer division)
REMAINDER1   = CHANGE mod 25
NUM_DIMES    = REMAINDER1 / 10
REMAINDER2   = REMAINDER1 mod 10
NUM_NICKELS  = REMAINDER2 / 5
```

For hardware implementation, use sequential subtraction:

- While CHANGE $\geq$ 25: return quarter, CHANGE -= 25
- While CHANGE $\geq$ 10: return dime, CHANGE -= 10
- While CHANGE $\geq$ 5: return nickel, CHANGE -= 5

**(4) Display subsystem:**

```
TOTAL[7:0] ──→ [Binary-to-BCD] ──→ TENS[3:0], ONES[3:0]
                                        │          │
                                   [7-Seg Dec] [7-Seg Dec]
                                        │          │
                                   SEG_T[6:0]  SEG_O[6:0]
                                        │          │
                                   ┌────┴────┐ ┌───┴────┐
               MUX_CLK ──→ [MUX]   │ Digit 1 │ │ Digit 0│
                            ↓      └─────────┘ └────────┘
                       DIGIT_SEL ──→ (anode drivers)
```

Multiplexing rate: ~1 kHz (50 MHz / 50,000) for flicker-free display.

Binary-to-BCD conversion for values 0-255: Double-dabble algorithm or lookup ROM (256 x 12 bits for 3 BCD digits, though only 2 digits displayed since max deposit is typically capped).

**Product price ROM:**

| SEL[1:0] | Product | Price (binary) |
|----------|---------|---------------|
| 00 | A | 00110010 (50) |
| 01 | B | 01001011 (75) |
| 10 | C | 01100100 (100) |
| 11 | D | 01111101 (125) |

**Total module count:** 10 modules. The main controller FSM has 7 states requiring 3 flip-flops. The coin accumulator is 8 bits. The entire system uses approximately 200-300 gates plus the ROM/register file storage.

</div>

