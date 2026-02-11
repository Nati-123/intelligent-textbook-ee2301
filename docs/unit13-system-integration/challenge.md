---
title: Unit 13 Challenge - System Integration
description: Challenge problems for system integration — answers only, no solutions
---

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

!!! success "Answer"
    **Datapath:**

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

!!! success "Answer"
    **(a) Setup analysis per stage** (constraint: $T_{cq} + T_{comb} + T_{setup} \leq T_{clk} + \delta$):

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

!!! success "Answer"
    **Baud-rate counter:** $50{,}000{,}000 / 9600 = 5208$ clocks per bit.

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

#### Challenge 4: Design Trade-Off Analysis — Area vs Speed vs Power

A design team must implement a 32-bit multiplier for a battery-powered IoT sensor node. Three architectures are proposed:

| Architecture | Area (gates) | Delay | Power (mW) | Throughput |
|-------------|-------------|-------|-----------|------------|
| A: Array multiplier | 3,000 | 40 ns | 5 mW | 1 result / 40 ns |
| B: Booth multiplier (sequential, 16 cycles) | 800 | 16 x 8 ns = 128 ns | 2 mW | 1 result / 128 ns |
| C: Pipelined Wallace tree | 6,000 | 5 ns (4 stages) | 20 mW | 1 result / 5 ns |

The system requirements are: (1) process at most 10 million multiplications per second, (2) total power budget is 10 mW, (3) chip area budget is 5,000 gates for the multiplier.

Determine which architecture(s) meet all constraints. For those that do not meet constraints, identify which constraint is violated. What is the optimal choice and why?

!!! success "Answer"
    **Constraint analysis:**

    | Constraint | Requirement | Arch A | Arch B | Arch C |
    |-----------|-------------|--------|--------|--------|
    | Throughput $\geq$ 10 M/s | $T_{clk} \leq 100$ ns | 40 ns: **PASS** | 128 ns: **FAIL** | 5 ns: **PASS** |
    | Power $\leq$ 10 mW | — | 5 mW: **PASS** | 2 mW: **PASS** | 20 mW: **FAIL** |
    | Area $\leq$ 5,000 gates | — | 3,000: **PASS** | 800: **PASS** | 6,000: **FAIL** |

    **Summary:**

    | Architecture | Throughput | Power | Area | All met? |
    |-------------|-----------|-------|------|----------|
    | A: Array | PASS | PASS | PASS | **YES** |
    | B: Booth | FAIL | PASS | PASS | NO |
    | C: Wallace | PASS | FAIL | FAIL | NO |

    **Only Architecture A (array multiplier) meets all three constraints.**

    **Why the others fail:**

    - **Booth (B):** Throughput is $1/128\text{ ns} = 7.8$ M results/s < 10 M/s required. To fix: reduce cycle count or increase clock speed, but this increases power.
    - **Wallace tree (C):** Violates both power (20 mW > 10 mW) and area (6,000 > 5,000). Massively over-designed for this application.

    **Optimal choice: Architecture A (array multiplier)**

    - Meets all constraints with comfortable margins
    - Throughput margin: $25$ M/s vs 10 M/s required (2.5x headroom)
    - Power margin: 5 mW vs 10 mW budget (50% headroom)
    - Area margin: 3,000 vs 5,000 gate budget (40% headroom)

    **Additional optimization:** Architecture A can be voltage-scaled or clock-gated to further reduce power since it has 2.5x throughput headroom. Running at lower voltage to just meet 10 M/s could reduce power to ~2-3 mW.

    **Energy per operation:**

    | Architecture | Energy/multiply |
    |-------------|----------------|
    | A | $5 \text{ mW} \times 40 \text{ ns} = 200$ pJ |
    | B | $2 \text{ mW} \times 128 \text{ ns} = 256$ pJ |
    | C | $20 \text{ mW} \times 5 \text{ ns} = 100$ pJ |

    Architecture C has the best energy efficiency per operation but violates area and power constraints. Architecture A is second-best in energy and meets all constraints.

---

#### Challenge 5: Complete System Integration — Vending Machine with Display and Coin Handling

Design a complete vending machine system with:

- Coin acceptor: nickels (5c), dimes (10c), quarters (25c)
- 4 product selections (A, B, C, D) costing 50c, 75c, 100c, 125c
- Coin return button
- 2-digit 7-segment display showing amount deposited
- Change return mechanism (returns smallest number of coins)

Provide: (1) the complete system block diagram with all modules and interconnections, (2) the controller FSM states and transitions, (3) the datapath for coin accumulation and change calculation, and (4) the display subsystem design.

!!! success "Answer"
    **(1) System block diagram:**

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
