---
title: Unit 13 Problems - System Integration
description: Practice problems for top-down design, datapath-controller, timing analysis, and pipelining
---

# End-of-Unit Problems: System Integration

Work through these problems to reinforce your understanding of top-down design, datapath-controller partitioning, timing analysis, pipelining, and system-level design trade-offs.

---

## Section A: Top-Down Design and Modularity (4 problems)

### Problem 1
A digital combination lock accepts a 4-digit code (each digit 0-9) entered sequentially. Decompose the system using top-down design into hierarchical modules. Identify each module, its inputs, outputs, and its role in the system.

**Solution:** **Level 0 — Top-level system:**

```
┌─────────────────────────────────────────────┐
│            Combination Lock System           │
│                                              │
│  Keypad ──→ [Controller] ──→ Lock Actuator   │
│              ↕                                │
│         [Code Memory]                        │
└─────────────────────────────────────────────┘
```

**Level 1 — Subsystem decomposition:**

| Module | Inputs | Outputs | Function |
|--------|--------|---------|----------|
| Keypad Encoder | 10 key lines | 4-bit BCD digit, KEY_VALID | Encodes pressed key to binary |
| Digit Comparator | entered digit, stored digit | MATCH | Compares one digit against stored code |
| Sequence Counter | KEY_VALID, RESET | digit_index[1:0] | Tracks which digit (0-3) is being entered |
| Code Memory | digit_index | stored_digit[3:0] | Stores the 4-digit secret code |
| Main Controller (FSM) | MATCH, digit_index, KEY_VALID | UNLOCK, RESET, ERROR | Orchestrates the verification sequence |
| Lock Actuator | UNLOCK | physical lock signal | Drives the solenoid/motor |
| Timeout Timer | CLK, RESET | TIMEOUT | Resets system after inactivity |

**Level 2 — Detailed module breakdown:**

- **Keypad Encoder:** 4x3 matrix scanner + priority encoder + debounce circuit
- **Main Controller FSM states:** IDLE, CHECK_D0, CHECK_D1, CHECK_D2, CHECK_D3, UNLOCK, ERROR_LOCKOUT
- **Code Memory:** 4 x 4-bit register file (can be ROM for fixed code or RAM for programmable code)

**Design hierarchy:**

```
Combination Lock System
├── Keypad Encoder
│   ├── Matrix Scanner
│   ├── Priority Encoder
│   └── Debounce Circuit
├── Main Controller FSM
├── Sequence Counter (2-bit)
├── Code Memory (4 x 4-bit)
├── Digit Comparator (4-bit equality)
├── Timeout Timer (counter)
└── Lock Actuator Driver
```

**Key design principle:** Each module has a well-defined interface. The controller FSM coordinates all modules without knowing their internal implementation.

---

### Problem 2
Explain the difference between structural and behavioral decomposition in top-down design. For a 4-bit ALU that supports ADD, SUB, AND, OR, give both decompositions.

**Solution:** **Structural decomposition** breaks the system into physical components and their interconnections. **Behavioral decomposition** breaks the system into functional operations without specifying implementation.

**Behavioral decomposition of 4-bit ALU:**

```
4-bit ALU
├── Addition operation (A + B)
├── Subtraction operation (A - B)
├── Bitwise AND operation (A & B)
└── Bitwise OR operation (A | B)
```

Each operation is described by what it does, not how it is built.

**Structural decomposition of 4-bit ALU:**

```
4-bit ALU
├── 4-bit Adder/Subtractor
│   ├── XOR array (4 gates, for B complement)
│   ├── 4-bit Ripple Carry Adder
│   │   ├── Full Adder bit 0
│   │   ├── Full Adder bit 1
│   │   ├── Full Adder bit 2
│   │   └── Full Adder bit 3
│   └── Carry-in = SUB control
├── AND array (4 AND gates)
├── OR array (4 OR gates)
└── Output MUX (4-bit, 4-to-1)
    └── Select = Op[1:0]
```

**Block diagram (structural):**

```
A[3:0] ──┬──────────────────────┬──────┬──────┐
         │                      │      │      │
B[3:0] ──┼──[XOR w/ SUB]──[Adder]  [AND]  [OR]│
         │        │           │      │      │  │
         │        └───────────┼──────┼──────┼──┘
         │                    ↓      ↓      ↓
         │              ┌─────────────────────┐
Op[1:0]──┴─────────────→│    4-to-1 MUX       │
                        └─────────┬───────────┘
                                  ↓
                              Result[3:0]
```

| Op[1:0] | Operation | MUX selects |
|---------|-----------|-------------|
| 00 | ADD | Adder output |
| 01 | SUB | Adder output (B complemented, Cin=1) |
| 10 | AND | AND array output |
| 11 | OR | OR array output |

**Key difference:** Behavioral decomposition is technology-independent and focuses on specification. Structural decomposition commits to a specific implementation architecture.

---

### Problem 3
A digital system must be designed with the following specifications. Identify all modules needed and draw the top-level block diagram showing interconnections.

- Read temperature from an 8-bit ADC every 100 ms
- Compare temperature against a programmable threshold
- Activate a cooling fan if temperature exceeds the threshold
- Display current temperature on a 2-digit 7-segment display

**Solution:** **Module identification:**

| Module | Type | Function |
|--------|------|----------|
| Clock Divider | Counter | Generates 10 Hz sample signal from system clock |
| ADC Interface | Controller | Manages ADC read timing and handshake |
| Threshold Register | Register | Stores programmable 8-bit threshold |
| Comparator | Combinational | Compares ADC value > threshold |
| Fan Controller | FSM | Manages fan on/off with hysteresis |
| Binary-to-BCD | Combinational | Converts 8-bit binary to 2-digit BCD |
| 7-Segment Decoder | Combinational | Converts BCD to segment patterns |
| Display MUX | Counter + MUX | Time-multiplexes two digit displays |
| Main Controller | FSM | Coordinates sampling and data flow |

**Top-level block diagram:**

```
System CLK ──→ [Clock Divider] ──→ SAMPLE_TICK
                                       │
                    ┌──────────────────┘
                    ↓
ADC_DATA[7:0] ←── [ADC Interface] ←── ADC_BUSY
ADC_START     ──→       │
                        ↓
                 TEMP[7:0] ──┬──→ [Comparator] ──→ OVER_TEMP
                             │         ↑
                             │    [Threshold Reg] ←── THRESH_IN[7:0]
                             │                    ←── LOAD_THRESH
                             │
                             │    [Fan Controller] ←── OVER_TEMP
                             │         │
                             │         └──→ FAN_ON
                             │
                             └──→ [Bin-to-BCD] ──→ BCD_TENS[3:0]
                                       │           BCD_ONES[3:0]
                                       ↓
                                 [7-Seg Decode] ──→ SEGMENTS[6:0]
                                       │
                                 [Display MUX] ──→ DIGIT_SEL
```

**Main controller FSM states:**

- IDLE: Wait for SAMPLE_TICK
- START_ADC: Assert ADC_START
- WAIT_ADC: Wait for ADC_BUSY to deassert
- READ_DATA: Latch ADC_DATA into TEMP register
- UPDATE: Trigger comparison and display update
- Return to IDLE

**Interface signals between modules are clearly defined,** allowing each module to be designed and tested independently.

---

### Problem 4
What are the three key principles of modular design? For each principle, give a digital design example showing how violating it leads to problems.

**Solution:** **The three key principles:**

**1. Well-defined interfaces**

Each module communicates only through declared input/output ports with specified data types and timing.

- **Good:** ALU has inputs A[7:0], B[7:0], Op[1:0] and output Result[7:0], Carry_out
- **Violation:** Module A directly reads internal flip-flop values of Module B rather than using output ports
- **Problem:** Changing Module B's internal implementation breaks Module A. No isolation between modules.

**2. Encapsulation (information hiding)**

Internal implementation details are hidden; only the interface is visible to other modules.

- **Good:** A counter module exports COUNT[3:0] and TC (terminal count); its internal carry chain is hidden
- **Violation:** The top-level design routes carry signals directly between internal full adders of separate counter modules
- **Problem:** Cannot replace the ripple counter with a faster carry-lookahead counter without redesigning the entire system.

**3. Single responsibility**

Each module performs one clearly defined function.

- **Good:** Separate modules for keyboard decoding, FSM control, and display driving
- **Violation:** One monolithic FSM handles keyboard scanning, sequence checking, display multiplexing, and timeout simultaneously
- **Problem:** The FSM state space explodes combinatorially. A 4-state keyboard scanner x 5-state lock controller x 3-state display driver = 60 states in a single FSM instead of three small FSMs (4 + 5 + 3 = 12 states total).

**Quantitative example of the state explosion:**

| Design approach | FSM states | Flip-flops needed |
|----------------|-----------|-------------------|
| Single monolithic FSM | $4 \times 5 \times 3 = 60$ | $\lceil\log_2 60\rceil = 6$ |
| Three separate FSMs | $4 + 5 + 3 = 12$ | $2 + 3 + 2 = 7$ flip-flops, but far simpler logic |

Although the monolithic FSM uses one fewer flip-flop, its next-state logic is vastly more complex and nearly impossible to debug.

---

## Section B: Datapath and Controller Design (4 problems)

### Problem 5
Explain the datapath-controller partitioning approach. For a circuit that computes $Y = A \times B + C$ where A, B, C are 8-bit inputs, design the datapath and controller separately.

**Solution:** **Datapath-controller partitioning:**

- **Datapath:** Contains the components that store, transform, and route data (registers, ALUs, multiplexers, buses)
- **Controller:** An FSM that generates control signals to orchestrate datapath operations each clock cycle
- **Separation:** The controller does not process data; the datapath does not make sequencing decisions

**Datapath design for $Y = A \times B + C$:**

```
A[7:0] ──→ [Reg_A] ──→ ┐
                        ├──→ [8x8 Multiplier] ──→ [Reg_P] ──→ ┐
B[7:0] ──→ [Reg_B] ──→ ┘                                      ├──→ [16-bit Adder] ──→ [Reg_Y]
                                                               │                        │
C[7:0] ──→ [Reg_C] ──────────────→ (zero-extended to 16 bits) ┘                        ↓
                                                                                    Y[15:0]
```

**Datapath control signals:**

| Signal | Function |
|--------|----------|
| LD_A | Load register A |
| LD_B | Load register B |
| LD_C | Load register C |
| LD_P | Load product register |
| LD_Y | Load result register |

**Controller FSM:**

```
┌──────────────────────────────────────────┐
│  S0: IDLE          (wait for START)      │
│  ──→ if START: go to S1                  │
├──────────────────────────────────────────┤
│  S1: LOAD          assert LD_A,LD_B,LD_C │
│  ──→ go to S2                            │
├──────────────────────────────────────────┤
│  S2: MULTIPLY      (wait for mult done)  │
│  ──→ if MULT_DONE: assert LD_P, go to S3│
├──────────────────────────────────────────┤
│  S3: ADD           assert LD_Y           │
│  ──→ go to S4                            │
├──────────────────────────────────────────┤
│  S4: DONE          assert RESULT_VALID   │
│  ──→ go to S0                            │
└──────────────────────────────────────────┘
```

**Control signal table:**

| State | LD_A | LD_B | LD_C | LD_P | LD_Y | RESULT_VALID |
|-------|------|------|------|------|------|-------------|
| S0 | 0 | 0 | 0 | 0 | 0 | 0 |
| S1 | 1 | 1 | 1 | 0 | 0 | 0 |
| S2 | 0 | 0 | 0 | 1* | 0 | 0 |
| S3 | 0 | 0 | 0 | 0 | 1 | 0 |
| S4 | 0 | 0 | 0 | 0 | 0 | 1 |

*LD_P asserted only when MULT_DONE = 1

**Latency:** 4 clock cycles (load + multiply + add + done)

---

### Problem 6
Design the datapath and controller for a circuit that finds the maximum of three 8-bit unsigned numbers A, B, and C. Show the ASM (Algorithmic State Machine) chart.

**Solution:** **Algorithm:**

1. Load A, B, C
2. Compare A and B; keep the larger as TEMP
3. Compare TEMP and C; keep the larger as MAX

**Datapath:**

```
A[7:0]──→[Reg_A]──→┐                      ┌──→[Reg_MAX]──→ MAX[7:0]
                    ├──→[8-bit Comparator]──┤
B[7:0]──→[Reg_B]──→┤   + 2-to-1 MUX       │
                    │        ↑              │
C[7:0]──→[Reg_C]───┘    SEL_AB, SEL_MC     │
                                            │
                [2:1 MUX] ←─────────────────┘
                   ↑
                SEL_MC
```

**Refined datapath with two comparisons:**

```
A ──→ [Reg_A] ──→ ┐
                  ├──→ [CMP1: A>B?] ──→ A_GT_B (status to controller)
B ──→ [Reg_B] ──→ ┘
                  ┌──→ [MUX1] ──→ TEMP
Reg_A output ─────┤      ↑
Reg_B output ─────┘   SEL_AB (from controller)

TEMP ─────────────┐
                  ├──→ [CMP2: TEMP>C?] ──→ T_GT_C (status to controller)
C ──→ [Reg_C] ──→ ┘
                  ┌──→ [MUX2] ──→ [Reg_MAX]
TEMP ─────────────┤      ↑
Reg_C output ─────┘   SEL_MC (from controller)
```

**ASM Chart:**

```
┌──────────┐
│ S0: IDLE │ ──── START=0? ──→ (stay)
└────┬─────┘
     │ START=1
     ↓
┌──────────┐
│ S1: LOAD │  LD_A=1, LD_B=1, LD_C=1
└────┬─────┘
     ↓
┌──────────┐
│ S2: CMP1 │  Compare A, B
└────┬─────┘
     │
    ◇ A_GT_B?
   / \
  Y   N
  │   │
  ↓   ↓
SEL_AB=0  SEL_AB=1
(pick A)  (pick B)
  │   │
  └─┬─┘
    ↓
┌──────────┐
│ S3: CMP2 │  Compare TEMP, C
└────┬─────┘
     │
    ◇ T_GT_C?
   / \
  Y   N
  │   │
  ↓   ↓
SEL_MC=0  SEL_MC=1
(pick T)  (pick C)
  │   │
  └─┬─┘
    ↓
┌──────────┐
│ S4: DONE │  LD_MAX=1, VALID=1
└────┬─────┘
     ↓
   (go to S0)
```

**Controller outputs per state:**

| State | LD_A | LD_B | LD_C | SEL_AB | SEL_MC | LD_MAX | VALID |
|-------|------|------|------|--------|--------|--------|-------|
| S0 | 0 | 0 | 0 | - | - | 0 | 0 |
| S1 | 1 | 1 | 1 | - | - | 0 | 0 |
| S2 | 0 | 0 | 0 | A_GT_B' | - | 0 | 0 |
| S3 | 0 | 0 | 0 | - | T_GT_C' | 0 | 0 |
| S4 | 0 | 0 | 0 | - | - | 1 | 1 |

**Total latency:** 4 clock cycles from START to VALID.

---

### Problem 7
A datapath for a simple accumulator processor includes: an 8-bit register (ACC), an 8-bit adder, and a 2-to-1 MUX. The processor supports three operations: LOAD (ACC = input), ADD (ACC = ACC + input), CLEAR (ACC = 0). Design the datapath and the controller.

**Solution:** **Datapath:**

```
DATA_IN[7:0] ──→ ┐
                 ├──→ [2:1 MUX] ──→ [8-bit Adder] ──→ [ACC Register]──┬──→ ACC_OUT[7:0]
0x00 ────────────┘        ↑              ↑                │             │
                       MUX_SEL        B input             │             │
                                         │                └─────────────┘
                                         └────────────────(feedback from ACC)
```

**Refined datapath with all three operations:**

```
                    MUX_A_SEL
                       ↓
DATA_IN ──→ [MUX_A] ──→ A ──→ [8-bit Adder] ──→ SUM ──→ [MUX_R] ──→ [ACC]──→ ACC_OUT
0x00 ──────→           B ←──────────────────────── ACC     ↑
                                                        MUX_R_SEL
                                                        LD_ACC
```

**Control signal encoding:**

| Operation | MUX_A_SEL | MUX_R_SEL | LD_ACC | Effect |
|-----------|-----------|-----------|--------|--------|
| NOP | X | X | 0 | ACC unchanged |
| LOAD | - | 0 | 1 | ACC = DATA_IN (MUX_R selects DATA_IN directly) |
| ADD | 0 | 1 | 1 | ACC = ACC + DATA_IN (MUX_R selects adder output) |
| CLEAR | 1 | 1 | 1 | ACC = ACC + 0 ... |

**Simpler approach — single MUX at ACC input:**

```
DATA_IN[7:0]──────────────────→ ┐
(ACC + DATA_IN) from adder ───→ ├──→ [4:1 MUX] ──→ D ──→ [ACC Reg] ──→ ACC_OUT
0x00 (constant zero) ─────────→ ┤        ↑                    │
ACC_OUT (hold) ───────────────→ ┘     SEL[1:0]                │
                                                               │
ACC_OUT ──→ [Adder] ←── DATA_IN                               │
              │                                                │
              └────────(ACC + DATA_IN)                         │
                                                               │
              └────────────────────────────────────────────────┘
```

| SEL[1:0] | MUX Output | Operation |
|----------|------------|-----------|
| 00 | DATA_IN | LOAD |
| 01 | ACC + DATA_IN | ADD |
| 10 | 0x00 | CLEAR |
| 11 | ACC_OUT | NOP (hold) |

**Controller FSM:**

```
┌────────┐    OP = LOAD     ┌──────────┐
│  IDLE  │ ──────────────→  │  EXECUTE  │
│        │    OP = ADD      │           │
│        │ ──────────────→  │  SEL =    │
│        │    OP = CLR      │  f(OP)    │
│        │ ──────────────→  │  LD_ACC=1 │
└────────┘                  └─────┬─────┘
     ↑                            │
     └────────────────────────────┘
```

For a single-cycle implementation, the controller is purely combinational:

- SEL[1:0] = OP[1:0]
- LD_ACC = (OP != NOP)

---

### Problem 8
Design the datapath and controller for a binary search circuit that finds whether a value KEY exists in a sorted 8-element array stored in a register file. Each element is 8 bits. Show the datapath components, control signals, and FSM state diagram.

**Solution:** **Algorithm (binary search):**

1. Set LOW = 0, HIGH = 7
2. Compute MID = (LOW + HIGH) / 2
3. Read ARRAY[MID]
4. If ARRAY[MID] = KEY: FOUND
5. If ARRAY[MID] < KEY: LOW = MID + 1
6. If ARRAY[MID] > KEY: HIGH = MID - 1
7. If LOW > HIGH: NOT_FOUND
8. Repeat from step 2

**Datapath components:**

```
KEY[7:0] ──→ [Reg_KEY]
                               ┌──→ [Comparator] ──→ EQ, LT, GT
[Reg File: 8 x 8-bit] ──→ DATA_OUT ──┘        ↑
     ↑ ADDR[2:0]                           Reg_KEY output
     │
[MID Register] ──→ ADDR
     ↑
[Adder/Shifter] ──→ (LOW + HIGH) >> 1
     ↑         ↑
[Reg_LOW]   [Reg_HIGH]
     ↑         ↑
MID+1 ──┘   MID-1 ──┘  (via adder with +1/-1)
```

**Datapath block diagram:**

```
┌───────────────────────────────────────────────────┐
│                   DATAPATH                        │
│                                                   │
│  [Reg_LOW] ──┬──→ [Adder] ──→ [>>1] ──→ [Reg_MID]│
│  [Reg_HIGH]──┘      ↑                      │     │
│       ↑  ↑        LOW+HIGH               ADDR    │
│     LD_L LD_H                              ↓     │
│       ↑  ↑                          [Reg File]   │
│    MID+1 MID-1                          │        │
│                                    DATA_OUT      │
│                                         ↓        │
│  [Reg_KEY] ──→ [Comparator] ←── DATA_OUT         │
│                  │  │  │                          │
│                 EQ  LT GT  (status to controller) │
│                                                   │
│  [Comparator2: LOW > HIGH?] ──→ DONE_NF          │
└───────────────────────────────────────────────────┘
```

**Controller FSM:**

| State | Actions | Next State |
|-------|---------|------------|
| S0: INIT | LD_L (LOW=0), LD_H (HIGH=7), LD_KEY | S1 |
| S1: CALC_MID | MID = (LOW+HIGH)>>1, LD_MID | S2 |
| S2: READ | Read Reg_File[MID] | S3 |
| S3: COMPARE | Check comparator outputs | S4 or S5 or S6 or S7 |
| S4: FOUND | Assert FOUND=1 | S0 |
| S5: GO_HIGH | LOW = MID+1, LD_L | S7 |
| S6: GO_LOW | HIGH = MID-1, LD_H | S7 |
| S7: CHECK_DONE | If LOW > HIGH: NOT_FOUND, else go to S1 | S1 or S8 |
| S8: NOT_FOUND | Assert NOT_FOUND=1 | S0 |

**State diagram:**

```
S0 ──→ S1 ──→ S2 ──→ S3 ──→ EQ? ──→ S4 (FOUND)
                           │
                    LT? ──→ S5 ──→ S7 ──→ LOW>HIGH? ──→ S8 (NOT_FOUND)
                           │              │
                    GT? ──→ S6 ──→ S7     └──→ S1 (repeat)
```

**Worst-case latency:** $\lceil\log_2 8\rceil = 3$ iterations, each 4-5 clock cycles, so approximately **12-15 clock cycles**.

---

## Section C: Timing Analysis (4 problems)

### Problem 9
A synchronous circuit uses D flip-flops with the following parameters:

- Clock-to-Q delay: $T_{cq}$ = 0.5 ns
- Setup time: $T_{setup}$ = 0.3 ns
- Hold time: $T_{hold}$ = 0.1 ns
- Combinational logic delay: $T_{comb}$ = 2.8 ns

Calculate the maximum clock frequency $f_{max}$ and verify the hold time constraint.

**Solution:** **Setup time constraint (determines $f_{max}$):**

The data must arrive at the next flip-flop's D input at least $T_{setup}$ before the next clock edge.

$$T_{clk} \geq T_{cq} + T_{comb} + T_{setup}$$

$$T_{clk} \geq 0.5 + 2.8 + 0.3 = 3.6 \text{ ns}$$

$$f_{max} = \frac{1}{T_{clk,min}} = \frac{1}{3.6 \text{ ns}} = 277.8 \text{ MHz}$$

**Hold time constraint:**

The data at the D input must remain stable for at least $T_{hold}$ after the clock edge.

$$T_{cq} + T_{comb,min} \geq T_{hold}$$

The minimum combinational delay path (shortest path between flip-flops):

$$T_{comb,min} \geq T_{hold} - T_{cq} = 0.1 - 0.5 = -0.4 \text{ ns}$$

Since $T_{comb,min}$ is always $\geq 0$, the hold constraint is **automatically satisfied** (any non-negative combinational delay meets the requirement).

**Timing diagram:**

```
CLK  ──┐     ┌──────┐     ┌──────┐
       │     │      │     │      │
       └─────┘      └─────┘      └─────
       |←──── Tclk = 3.6 ns ────→|

FF1 Q  ──────┤←Tcq→├──────────────────
             0.5ns  │←── Tcomb ──→│
                    │   2.8 ns    │
FF2 D  ─────────────┤            ├────
                                 │←Tsu→│
                                  0.3ns
```

**Summary:**

- $f_{max} = 277.8$ MHz
- Hold time: satisfied (margin = 0.5 + 0 - 0.1 = 0.4 ns minimum)

---

### Problem 10
A digital system has three pipeline stages with the following delays:

- Stage 1: $T_{cq}$ + 4.0 ns combinational
- Stage 2: $T_{cq}$ + 6.5 ns combinational
- Stage 3: $T_{cq}$ + 3.0 ns combinational

Flip-flop parameters: $T_{cq}$ = 0.4 ns, $T_{setup}$ = 0.3 ns.

(a) What is $f_{max}$ for the pipelined design?
(b) What would $f_{max}$ be without pipelining (all logic in one stage)?
(c) Calculate the throughput improvement from pipelining.

**Solution:** **(a) Pipelined $f_{max}$:**

The clock frequency is limited by the **slowest stage**:

$$T_{clk} \geq T_{cq} + T_{comb,max} + T_{setup}$$

Stage delays (including $T_{cq}$ and $T_{setup}$):

- Stage 1: $0.4 + 4.0 + 0.3 = 4.7$ ns
- Stage 2: $0.4 + 6.5 + 0.3 = 7.2$ ns (bottleneck)
- Stage 3: $0.4 + 3.0 + 0.3 = 3.7$ ns

$$T_{clk,min} = 7.2 \text{ ns}$$

$$f_{max,pipelined} = \frac{1}{7.2 \text{ ns}} = 138.9 \text{ MHz}$$

**(b) Non-pipelined $f_{max}$:**

Total combinational delay = $4.0 + 6.5 + 3.0 = 13.5$ ns

$$T_{clk} \geq T_{cq} + 13.5 + T_{setup} = 0.4 + 13.5 + 0.3 = 14.2 \text{ ns}$$

$$f_{max,unpipelined} = \frac{1}{14.2 \text{ ns}} = 70.4 \text{ MHz}$$

**(c) Throughput improvement:**

Throughput is proportional to clock frequency (one result per clock at steady state):

$$\text{Throughput ratio} = \frac{f_{max,pipelined}}{f_{max,unpipelined}} = \frac{138.9}{70.4} = 1.97\times$$

**Pipelining nearly doubles the throughput.**

However, latency increases:

- Non-pipelined latency: 14.2 ns (1 cycle)
- Pipelined latency: $3 \times 7.2 = 21.6$ ns (3 cycles)

**Latency increased by a factor of** $21.6 / 14.2 = 1.52\times$.

| Metric | Unpipelined | Pipelined |
|--------|-------------|-----------|
| $f_{max}$ | 70.4 MHz | 138.9 MHz |
| Latency | 14.2 ns | 21.6 ns |
| Throughput | 70.4 M results/s | 138.9 M results/s |

---

### Problem 11
A system has the following timing parameters:

- Clock period: 10 ns
- $T_{cq}$ = 0.6 ns
- $T_{setup}$ = 0.4 ns
- $T_{hold}$ = 0.2 ns
- Clock skew between source and destination flip-flop: $\delta$ = 0.5 ns (destination clock arrives late)

(a) What is the maximum allowable combinational delay?
(b) Is hold time violated? What is the hold margin?

**Solution:** **(a) Maximum combinational delay with clock skew:**

When the destination clock arrives late by $\delta$, the data has more time to propagate (positive skew helps setup):

Wait — we must be careful about sign convention. If the destination clock arrives **late**, the data has $\delta$ extra time, which **helps** setup but **hurts** hold.

**Setup constraint with skew:**

$$T_{cq} + T_{comb} + T_{setup} \leq T_{clk} + \delta$$

(The destination flip-flop samples $\delta$ later, giving more time.)

$$T_{comb,max} = T_{clk} + \delta - T_{cq} - T_{setup}$$

$$T_{comb,max} = 10 + 0.5 - 0.6 - 0.4 = 9.5 \text{ ns}$$

**Without skew:** $T_{comb,max} = 10 - 0.6 - 0.4 = 9.0$ ns

The positive skew at the destination gives 0.5 ns more margin for combinational logic.

**(b) Hold time analysis with skew:**

**Hold constraint with skew:**

$$T_{cq} + T_{comb,min} \geq T_{hold} + \delta$$

(The destination clock arriving late means the new data from the current clock edge could arrive before the destination has finished sampling the old value.)

$$T_{comb,min} \geq T_{hold} + \delta - T_{cq} = 0.2 + 0.5 - 0.6 = 0.1 \text{ ns}$$

**Hold margin** = $T_{cq} + T_{comb,min} - T_{hold} - \delta$

If the minimum combinational path delay is 0 ns:

$$\text{Hold margin} = 0.6 + 0 - 0.2 - 0.5 = -0.1 \text{ ns}$$

**Hold time IS violated** if there is any direct path with $T_{comb,min} < 0.1$ ns.

**Fix:** Insert a buffer (delay element) in the shortest path to add at least 0.1 ns of delay, or reduce clock skew.

| Constraint | Without Skew | With Skew ($\delta$ = 0.5 ns) |
|-----------|-------------|-------------------------------|
| $T_{comb,max}$ | 9.0 ns | 9.5 ns (more margin) |
| $T_{comb,min}$ | $\geq$ 0 ns (no issue) | $\geq$ 0.1 ns (potential issue!) |
| Setup margin | Helped | Helped |
| Hold margin | Fine | Reduced (may violate) |

---

### Problem 12
Calculate the maximum clock frequency for a 16-bit ripple carry adder used in a registered pipeline stage. Each full adder has a gate delay of 2 ns (two gates on the carry path). The flip-flop has $T_{cq}$ = 0.5 ns and $T_{setup}$ = 0.3 ns.

Then calculate $f_{max}$ if the design is changed to a 4-bit carry lookahead adder with four 4-bit CLA blocks and a second-level carry lookahead unit (2 gate levels for CLA + 2 gate levels for second-level group carry).

**Solution:** **Ripple Carry Adder:**

Each full adder's carry path delay = 2 ns (two gate levels per bit).

For 16 bits, the carry must ripple through all 16 full adders:

$$T_{comb,ripple} = 16 \times 2 = 32 \text{ ns}$$

$$T_{clk,min} = T_{cq} + T_{comb} + T_{setup} = 0.5 + 32 + 0.3 = 32.8 \text{ ns}$$

$$f_{max,ripple} = \frac{1}{32.8 \text{ ns}} = 30.5 \text{ MHz}$$

**Carry Lookahead Adder (2-level):**

Structure: Four 4-bit CLA blocks + one second-level lookahead unit.

Delay breakdown:

- Generate G and P from inputs: 1 gate level = 1 ns
- First-level CLA (4-bit group G, P): 2 gate levels = 2 ns
- Second-level CLA (group carry): 2 gate levels = 2 ns
- Carries back to first level for sum: 1 gate level = 1 ns
- Final XOR for sum bits: 1 gate level = 1 ns

Wait — let me be more precise with the given parameters (2 ns per two gates = 1 ns per gate level):

| Stage | Gate levels | Delay |
|-------|------------|-------|
| Generate $g_i$, $p_i$ from $a_i$, $b_i$ | 1 | 1 ns |
| First-level CLA: group G, P | 2 | 2 ns |
| Second-level CLA: group carries $C_4, C_8, C_{12}$ | 2 | 2 ns |
| Carries distributed back into CLA blocks | 2 | 2 ns |
| Final sum XOR | 1 | 1 ns |

$$T_{comb,CLA} = 1 + 2 + 2 + 2 + 1 = 8 \text{ ns}$$

$$T_{clk,min} = 0.5 + 8 + 0.3 = 8.8 \text{ ns}$$

$$f_{max,CLA} = \frac{1}{8.8 \text{ ns}} = 113.6 \text{ MHz}$$

**Comparison:**

| Adder Type | $T_{comb}$ | $f_{max}$ | Speedup |
|-----------|-----------|----------|---------|
| 16-bit Ripple | 32.0 ns | 30.5 MHz | 1.0x |
| 16-bit 2-level CLA | 8.0 ns | 113.6 MHz | 3.7x |

**The CLA is 3.7x faster at the cost of significantly more hardware (carry lookahead logic).**

---

## Section D: Pipelining and Optimization (4 problems)

### Problem 13
A non-pipelined combinational circuit has four logic blocks in series with delays: 3 ns, 5 ns, 4 ns, 2 ns. Flip-flop overhead is $T_{cq}$ = 0.3 ns and $T_{setup}$ = 0.2 ns.

(a) Calculate throughput without pipelining.
(b) Pipeline the design into 4 stages (one block per stage). Calculate the new throughput and latency.
(c) Pipeline into 2 stages by grouping blocks optimally. Calculate throughput and latency.

**Solution:** **Original delays:** Block A = 3 ns, Block B = 5 ns, Block C = 4 ns, Block D = 2 ns

**Register overhead per stage:** $T_{cq} + T_{setup} = 0.3 + 0.2 = 0.5$ ns

**(a) No pipelining:**

$$T_{clk} = T_{cq} + (3 + 5 + 4 + 2) + T_{setup} = 0.3 + 14 + 0.2 = 14.5 \text{ ns}$$

$$\text{Throughput} = \frac{1}{14.5 \text{ ns}} = 69.0 \text{ M results/s}$$

$$\text{Latency} = 14.5 \text{ ns (1 cycle)}$$

**(b) 4-stage pipeline:**

Stage delays (each includes register overhead):

- Stage 1: $0.3 + 3 + 0.2 = 3.5$ ns
- Stage 2: $0.3 + 5 + 0.2 = 5.5$ ns (bottleneck)
- Stage 3: $0.3 + 4 + 0.2 = 4.5$ ns
- Stage 4: $0.3 + 2 + 0.2 = 2.5$ ns

$$T_{clk} = 5.5 \text{ ns (limited by slowest stage)}$$

$$\text{Throughput} = \frac{1}{5.5 \text{ ns}} = 181.8 \text{ M results/s}$$

$$\text{Latency} = 4 \times 5.5 = 22.0 \text{ ns}$$

**Speedup:** $181.8 / 69.0 = 2.63\times$ (not $4\times$ due to unbalanced stages)

**(c) 2-stage pipeline (optimal grouping):**

We want to split the four blocks into two groups with roughly equal total delay.

Total logic delay = 14 ns, ideal split = 7 ns each.

| Grouping | Stage 1 | Stage 2 | Bottleneck |
|----------|---------|---------|------------|
| {A,B} + {C,D} | 3+5 = 8 | 4+2 = 6 | 8.5 ns |
| {A} + {B,C,D} | 3 | 5+4+2 = 11 | 11.5 ns |
| {A,B,C} + {D} | 3+5+4 = 12 | 2 | 12.5 ns |

**Optimal: {A, B} | {C, D}**

- Stage 1: $0.3 + 8 + 0.2 = 8.5$ ns
- Stage 2: $0.3 + 6 + 0.2 = 6.5$ ns

$$T_{clk} = 8.5 \text{ ns}$$

$$\text{Throughput} = \frac{1}{8.5 \text{ ns}} = 117.6 \text{ M results/s}$$

$$\text{Latency} = 2 \times 8.5 = 17.0 \text{ ns}$$

**Summary:**

| Configuration | $T_{clk}$ | Throughput | Latency | Speedup |
|---------------|----------|------------|---------|---------|
| No pipeline | 14.5 ns | 69.0 M/s | 14.5 ns | 1.0x |
| 2-stage | 8.5 ns | 117.6 M/s | 17.0 ns | 1.7x |
| 4-stage | 5.5 ns | 181.8 M/s | 22.0 ns | 2.6x |

**Key insight:** Pipelining improves throughput but increases latency. Unbalanced stages reduce the theoretical speedup (4-stage gives only 2.6x, not 4x).

---

### Problem 14
A 32-bit multiplier has a combinational delay of 20 ns. Registers have $T_{cq}$ = 0.4 ns and $T_{setup}$ = 0.3 ns.

(a) What is $f_{max}$ without pipelining?
(b) If the multiplier is split into 4 equal pipeline stages, what is $f_{max}$?
(c) What is the pipeline latency?
(d) If a feedback path exists (output feeds back to input), how does this affect pipeline throughput?

**Solution:** **(a) Without pipelining:**

$$T_{clk} = T_{cq} + 20 + T_{setup} = 0.4 + 20 + 0.3 = 20.7 \text{ ns}$$

$$f_{max} = \frac{1}{20.7 \text{ ns}} = 48.3 \text{ MHz}$$

**(b) With 4 pipeline stages:**

Each stage combinational delay: $20 / 4 = 5$ ns

$$T_{clk} = T_{cq} + 5 + T_{setup} = 0.4 + 5 + 0.3 = 5.7 \text{ ns}$$

$$f_{max} = \frac{1}{5.7 \text{ ns}} = 175.4 \text{ MHz}$$

**Speedup:** $175.4 / 48.3 = 3.63\times$

**(c) Pipeline latency:**

$$\text{Latency} = 4 \times T_{clk} = 4 \times 5.7 = 22.8 \text{ ns}$$

Compare with non-pipelined latency of 20.7 ns. Pipelining adds $22.8 - 20.7 = 2.1$ ns of latency overhead from the 3 extra pipeline registers ($3 \times 0.7 = 2.1$ ns, where 0.7 = $T_{cq} + T_{setup}$ for each added register).

**(d) Feedback path impact:**

```
Input ──→ [Stage1] ──→ [Stage2] ──→ [Stage3] ──→ [Stage4] ──→ Output
                                                                 │
             ┌───────────────────────────────────────────────────┘
             ↓ (feedback)
          [MUX] ←── New Input
             │
             ↓
Input ──→ [Stage1] ...
```

With feedback, the next computation that depends on the current result must wait for the full pipeline latency (4 cycles) before it can start. This creates a **data hazard**.

**Effective throughput with feedback:**

- Without feedback: 1 result per cycle = 175.4 M results/s
- With feedback (every result depends on previous): 1 result per 4 cycles = $175.4 / 4 = 43.9$ M results/s

**The feedback loop completely negates the pipelining benefit for dependent computations.** The throughput with feedback ($43.9$ MHz) is actually slightly worse than the non-pipelined design ($48.3$ MHz) due to pipeline register overhead.

**Solution approaches:** Loop unrolling, bypassing/forwarding (if partial results suffice), or accepting the latency penalty.

---

### Problem 15
Compare the area, speed, and power trade-offs for three implementations of an 8-bit adder:

1. Ripple carry adder (RCA)
2. Carry lookahead adder (CLA)
3. Carry select adder (CSLA)

Assume a unit gate delay of 1 ns and each gate costs 1 area unit and consumes 1 power unit per switching event.

**Solution:** **1. Ripple Carry Adder (RCA):**

- **Structure:** 8 cascaded full adders
- **Delay:** Carry propagates through 8 stages, 2 gate delays each = $8 \times 2 = 16$ gate delays = **16 ns**
- **Area:** 8 full adders, each ~5 gates = **40 area units**
- **Power:** Only gates on the active carry path switch = low dynamic power. Approximately **40 power units** worst case (all gates switch once)

**2. Carry Lookahead Adder (CLA):**

- **Structure:** Generate/propagate logic + lookahead carry unit
- **Delay:** G,P generation (1) + CLA carry (2) + sum XOR (1) = **4 gate delays = 4 ns**
- **Area:** 8 G/P generators (16 gates) + CLA unit (~30 gates for 8-bit) + 8 XOR sum gates = **~54 area units**
- **Power:** All carry bits computed simultaneously, more gates switch = **~54 power units** worst case

**3. Carry Select Adder (CSLA):**

- **Structure:** Two 4-bit RCAs (for carry-in = 0 and 1) + MUX
- **Delay:** 4-bit RCA ($4 \times 2 = 8$ delays) + MUX (1 delay) = **9 gate delays = 9 ns**
- **Area:** 3 x 4-bit RCA = 60 gates + 4-bit MUX = 12 gates = **~72 area units**
- **Power:** Two RCAs compute redundantly = **~72 power units** worst case

**Comparison table:**

| Metric | RCA | CLA | CSLA |
|--------|-----|-----|------|
| Delay | 16 ns | 4 ns | 9 ns |
| Area | 40 units | 54 units | 72 units |
| Power | 40 units | 54 units | 72 units |
| Speed rank | 3rd | 1st | 2nd |
| Area rank | 1st | 2nd | 3rd |
| Power rank | 1st | 2nd | 3rd |

**Area-Delay Product (ADP):** A combined metric for efficiency:

| Design | ADP |
|--------|-----|
| RCA | $40 \times 16 = 640$ |
| CLA | $54 \times 4 = 216$ |
| CSLA | $72 \times 9 = 648$ |

**CLA has the best area-delay product,** making it the most efficient trade-off. RCA is smallest but slowest. CSLA is largest but offers a middle-ground speed.

**When to use each:**

- **RCA:** Area-critical, low-speed designs
- **CLA:** Speed-critical designs where area overhead is acceptable
- **CSLA:** Moderate speed improvement needed with simpler design than full CLA

---

### Problem 16
A design must process 200 million samples per second. The combinational logic takes 12 ns. Registers have $T_{cq}$ = 0.3 ns and $T_{setup}$ = 0.2 ns. Determine the minimum number of pipeline stages required and show how to partition the logic.

**Solution:** **Required throughput:** 200 M samples/s

$$T_{clk,required} = \frac{1}{200 \times 10^6} = 5.0 \text{ ns}$$

**Register overhead per stage:** $T_{cq} + T_{setup} = 0.3 + 0.2 = 0.5$ ns

**Single stage (no pipelining):**

$$T_{clk} = 0.3 + 12 + 0.2 = 12.5 \text{ ns} \Rightarrow 80 \text{ MHz (too slow)}$$

**Minimum pipeline stages calculation:**

For $N$ stages, assuming perfectly balanced logic:

$$T_{clk} = T_{cq} + \frac{12}{N} + T_{setup} = 0.5 + \frac{12}{N}$$

Set $T_{clk} \leq 5.0$ ns:

$$0.5 + \frac{12}{N} \leq 5.0$$

$$\frac{12}{N} \leq 4.5$$

$$N \geq \frac{12}{4.5} = 2.67$$

**Minimum stages: $N = 3$**

**Verification with 3 stages:**

Each stage logic delay: $12 / 3 = 4.0$ ns

$$T_{clk} = 0.3 + 4.0 + 0.2 = 4.5 \text{ ns}$$

$$f_{max} = \frac{1}{4.5 \text{ ns}} = 222.2 \text{ MHz} > 200 \text{ MHz} \checkmark$$

**Check $N = 2$:**

$$T_{clk} = 0.5 + 6.0 = 6.5 \text{ ns} \Rightarrow 153.8 \text{ MHz} < 200 \text{ MHz} \times$$

Two stages is insufficient.

**Partitioning the logic:**

If the 12 ns logic consists of sub-blocks, we partition into 3 groups each totaling 4 ns:

```
Input ──→ [Reg] ──→ [Logic: 4ns] ──→ [Reg] ──→ [Logic: 4ns] ──→ [Reg] ──→ [Logic: 4ns] ──→ [Reg] ──→ Output
          Stage 1                    Stage 2                    Stage 3
```

**Pipeline metrics:**

| Metric | Value |
|--------|-------|
| Clock period | 4.5 ns |
| $f_{max}$ | 222.2 MHz |
| Throughput | 222.2 M samples/s |
| Latency | $3 \times 4.5 = 13.5$ ns |
| Pipeline registers added | 2 (between stages) |

**Note:** If the logic cannot be split into exactly equal groups, the bottleneck stage determines $T_{clk}$. In that case, more stages may be needed to meet the 200 MHz target with unbalanced partitioning.

---

## Section E: System Design Problems (4 problems)

### Problem 17
Design a UART transmitter that sends 8-bit data with 1 start bit, 8 data bits (LSB first), and 1 stop bit. The baud rate is 9600. The system clock is 50 MHz. Show the controller FSM and datapath.

**Solution:** **UART frame format:**

```
IDLE(1) | START(0) | D0 | D1 | D2 | D3 | D4 | D5 | D6 | D7 | STOP(1) | IDLE(1)...
```

**Baud rate clock generation:**

Clock divider count: $\frac{50 \times 10^6}{9600} = 5208.33 \approx 5208$

A counter counts from 0 to 5207 and generates a BAUD_TICK pulse.

**Datapath:**

```
DATA_IN[7:0] ──→ [Shift Register (8-bit, PISO)] ──→ TX_BIT
                      ↑         ↑                       ↑
                    LOAD      SHIFT                   [MUX]
                                                      ↑   ↑
                                                 TX_SEL[1:0]
                                                    │
Sources: 0 (start), shift_out (data), 1 (stop/idle)
```

**Datapath components:**

| Component | Size | Function |
|-----------|------|----------|
| Baud counter | 13-bit | Divides 50 MHz to 9600 Hz |
| Bit counter | 4-bit | Counts 0-9 (start + 8 data + stop) |
| Shift register | 8-bit PISO | Holds data, shifts out LSB first |
| Output MUX | 3-to-1 | Selects start/data/stop bit |

**Controller FSM:**

```
┌──────────┐
│   IDLE   │ ←─────────────────────────────────┐
│  TX = 1  │                                    │
└────┬─────┘                                    │
     │ SEND = 1                                 │
     ↓                                          │
┌──────────┐                                    │
│  START   │  TX = 0, LOAD shift reg            │
│          │  Wait for BAUD_TICK                 │
└────┬─────┘                                    │
     │ BAUD_TICK                                │
     ↓                                          │
┌──────────┐                                    │
│   DATA   │  TX = shift_out                    │
│          │  On BAUD_TICK: shift, bit_cnt++    │
│          │  When bit_cnt = 8: go to STOP      │
└────┬─────┘                                    │
     │ bit_cnt = 8 AND BAUD_TICK                │
     ↓                                          │
┌──────────┐                                    │
│   STOP   │  TX = 1                            │
│          │  Wait for BAUD_TICK                 │
└────┬─────┘                                    │
     │ BAUD_TICK                                │
     └──────────────────────────────────────────┘
```

**State encoding and control signals:**

| State | TX_SEL | LOAD | SHIFT | COUNT_EN | BUSY |
|-------|--------|------|-------|----------|------|
| IDLE | 10 (high) | 0 | 0 | 0 | 0 |
| START | 00 (low) | 1 | 0 | 0 | 1 |
| DATA | 01 (shift_out) | 0 | BAUD_TICK | BAUD_TICK | 1 |
| STOP | 10 (high) | 0 | 0 | 0 | 1 |

**Timing for one byte at 9600 baud:**

$$T_{byte} = 10 \text{ bits} \times \frac{1}{9600} = 1.042 \text{ ms}$$

Maximum data rate: $9600 / 10 = 960$ bytes/s.

---

### Problem 18
Design a simple vending machine controller that:

- Accepts nickels (5 cents) and dimes (10 cents)
- Item costs 25 cents
- Dispenses when exact amount or overpayment is reached
- Returns to idle after dispensing (no change given)

Provide the complete state diagram, state table, state encoding, and next-state equations.

**Solution:** **States (based on amount collected):**

| State | Amount | Encoding |
|-------|--------|----------|
| S0 | 0 cents | 000 |
| S5 | 5 cents | 001 |
| S10 | 10 cents | 010 |
| S15 | 15 cents | 011 |
| S20 | 20 cents | 100 |
| S25 | 25+ cents (dispense) | 101 |

**Inputs:** N (nickel inserted), D (dime inserted). Assume N and D are mutually exclusive pulses.

**Output:** DISP (dispense item)

**State diagram:**

```
S0 ──N──→ S5 ──N──→ S10 ──N──→ S15 ──N──→ S20 ──N──→ S25
│         │          │          │          │
└──D──→ S10   └──D──→ S15  └──D──→ S20  └──D──→ S25  └──D──→ S25
                                                        │
S25: DISP=1, then return to S0 ←────────────────────────┘
```

**Complete state table:**

| Present | N | D | Next | DISP |
|---------|---|---|------|------|
| S0 (000) | 0 | 0 | S0 | 0 |
| S0 | 1 | 0 | S5 | 0 |
| S0 | 0 | 1 | S10 | 0 |
| S5 (001) | 0 | 0 | S5 | 0 |
| S5 | 1 | 0 | S10 | 0 |
| S5 | 0 | 1 | S15 | 0 |
| S10 (010) | 0 | 0 | S10 | 0 |
| S10 | 1 | 0 | S15 | 0 |
| S10 | 0 | 1 | S20 | 0 |
| S15 (011) | 0 | 0 | S15 | 0 |
| S15 | 1 | 0 | S20 | 0 |
| S15 | 0 | 1 | S25 | 0 |
| S20 (100) | 0 | 0 | S20 | 0 |
| S20 | 1 | 0 | S25 | 0 |
| S20 | 0 | 1 | S25 | 0 |
| S25 (101) | X | X | S0 | 1 |

**Next-state equations (from K-maps):**

Let the state bits be $Q_2 Q_1 Q_0$ and don't-care states are 110, 111.

$D_2 = Q_1 Q_0 N + Q_1 Q_0 D + Q_2 \overline{Q_0} \overline{N} \overline{D} + Q_2 \overline{Q_0} N$

Simplified (using don't cares for 110, 111):

$$D_2 = Q_1 Q_0 (N + D) + Q_2 \overline{Q_0}$$

$$D_1 = \overline{Q_2} \overline{Q_1} Q_0 N + \overline{Q_2} Q_1 \overline{Q_0} \overline{N}\overline{D} + \overline{Q_2} \overline{Q_1} D + \overline{Q_2} Q_1 \overline{Q_0} N + \overline{Q_2} Q_1 Q_0 \overline{N}\overline{D}$$

Simplified:

$$D_1 = \overline{Q_2}(\overline{Q_1}Q_0 N + \overline{Q_1}D + Q_1\overline{N}\overline{D} + Q_1\overline{Q_0}N)$$

$$D_0 = \overline{Q_2}\overline{Q_0}N + \overline{Q_2}Q_0\overline{N}\overline{D} + \overline{Q_2}\overline{Q_1}Q_0 D$$

Simplified:

$$D_0 = \overline{Q_2}(N \oplus Q_0) \cdot \text{(with correction for dime cases)}$$

**Output:** $\text{DISP} = Q_2 Q_0$

(DISP = 1 only in state S25 = 101)

---

### Problem 19
A self-checking testbench must verify a 4-bit counter. Describe the testbench architecture, the test vectors needed, and how to implement automatic checking in a hardware description approach.

**Solution:** **Testbench architecture:**

```
┌──────────────────────────────────────────────────┐
│                  TESTBENCH                        │
│                                                  │
│  [Stimulus       [Device        [Response         │
│   Generator] ──→  Under    ──→  Checker]          │
│       │          Test (DUT)]       │              │
│       │           4-bit           │              │
│       │          counter          │              │
│  CLK, RST,                   Expected vs         │
│  EN signals                  Actual comparison    │
│                                   │              │
│                              PASS/FAIL           │
└──────────────────────────────────────────────────┘
```

**Test categories and vectors:**

**1. Reset test:**

| Test | CLK | RST | EN | Expected Q |
|------|-----|-----|----|-----------|
| Assert reset | rising | 1 | X | 0000 |
| Hold reset | rising | 1 | 1 | 0000 |
| Release reset | rising | 0 | 0 | 0000 |

**2. Normal counting (16 cycles):**

| Cycle | RST | EN | Expected Q |
|-------|-----|----|-----------|
| 1 | 0 | 1 | 0001 |
| 2 | 0 | 1 | 0010 |
| ... | ... | ... | ... |
| 15 | 0 | 1 | 1111 |
| 16 | 0 | 1 | 0000 (rollover) |

**3. Enable control:**

| Test | RST | EN | Expected |
|------|-----|----|----------|
| Count to 5 | 0 | 1 | 0101 |
| Disable | 0 | 0 | 0101 (hold) |
| Disable again | 0 | 0 | 0101 (hold) |
| Re-enable | 0 | 1 | 0110 (resume) |

**4. Reset during count:**

| Test | RST | EN | Expected |
|------|-----|----|----------|
| Count to 7 | 0 | 1 | 0111 |
| Assert reset | 1 | 1 | 0000 |
| Release, count | 0 | 1 | 0001 |

**Self-checking mechanism (pseudocode):**

```
expected_count = 0

for each test_cycle:
    apply(CLK, RST, EN)
    wait(clock_edge)

    // Compute expected value
    if (RST == 1):
        expected_count = 0
    else if (EN == 1):
        expected_count = (expected_count + 1) mod 16

    // Automatic check
    if (DUT.Q != expected_count):
        report ERROR at cycle number
        error_count++

// Final report
if (error_count == 0):
    report "ALL TESTS PASSED"
else:
    report "FAILED: {error_count} errors"
```

**Comprehensive test vector count:**

| Category | Vectors | Purpose |
|----------|---------|---------|
| Reset | 3 | Verify reset behavior |
| Full count | 17 | All states + rollover |
| Enable toggle | 6 | Hold and resume |
| Mid-count reset | 4 | Reset from non-zero |
| Corner cases | 4 | Rollover with EN toggle |
| **Total** | **~34** | **Complete coverage** |

**Design for testability tips:**

- Include a counter output observation point (no buried states)
- Add a synchronous reset (easier to test than async)
- Include a terminal count (TC) output and verify it at state 1111
- Test at least two full counting sequences to verify rollover

---

### Problem 20
A complete digital system design flows from specification to implementation. List and describe each step in the design flow. For a 4-bit ALU with ADD, SUB, AND, OR, XOR operations, give a concrete example of what happens at each step.

**Solution:** **Digital design flow — 8 steps:**

**Step 1: Specification**

Define what the system does, its inputs, outputs, and constraints.

*4-bit ALU example:*

- Inputs: A[3:0], B[3:0], Op[2:0]
- Outputs: Result[3:0], Carry_out, Zero_flag
- Operations: ADD (000), SUB (001), AND (010), OR (011), XOR (100)
- Constraint: Combinational, max delay < 15 ns

**Step 2: Architecture / Top-down decomposition**

Break the system into modules and define their interfaces.

*4-bit ALU example:*

```
ALU
├── Adder/Subtractor unit (handles ADD, SUB)
│   ├── XOR array (B complement for SUB)
│   └── 4-bit adder (with carry-in for SUB)
├── Logic unit (handles AND, OR, XOR)
│   ├── AND array
│   ├── OR array
│   └── XOR array
├── Output MUX (selects result based on Op)
└── Flag generator (Zero, Carry)
```

**Step 3: Detailed design / RTL coding**

Implement each module at the register-transfer level.

*Example — Output MUX logic:*

| Op[2:0] | Result |
|---------|--------|
| 000 | A + B |
| 001 | A - B |
| 010 | A AND B |
| 011 | A OR B |
| 100 | A XOR B |

Zero_flag = (Result == 0000)

**Step 4: Functional simulation**

Verify the design produces correct outputs for all operations.

*Example test vectors:*

| A | B | Op | Expected Result | Expected Carry |
|---|---|----|-----------------|----------------|
| 0011 | 0001 | ADD | 0100 | 0 |
| 0011 | 0001 | SUB | 0010 | 0 |
| 1111 | 0001 | ADD | 0000 | 1 |
| 1010 | 1100 | AND | 1000 | - |
| 1010 | 1100 | OR | 1110 | - |
| 1010 | 1100 | XOR | 0110 | - |
| 0000 | 0000 | ADD | 0000 (Z=1) | 0 |

**Step 5: Synthesis**

Convert RTL to gate-level netlist targeting specific technology.

*Example output:* The adder synthesizes to a ripple carry adder using AND, OR, XOR gates from the target library. Total: ~35 gates.

**Step 6: Static timing analysis**

Verify all paths meet timing constraints.

*Example:*

- Critical path: A input through carry chain to Result[3]
- Path delay: 4 XOR + 4 AND + 3 OR = 11 gate delays
- At 1 ns/gate: 11 ns < 15 ns requirement. **PASS.**

**Step 7: Place and route (for FPGA/ASIC)**

Map gates to physical locations and create interconnect wiring.

*Example:* The ALU uses 22 LUTs and 0 flip-flops on an FPGA. Routing adds 2 ns interconnect delay. Total delay: 13 ns < 15 ns. **PASS.**

**Step 8: Post-layout verification and testing**

Final simulation with actual delays, then physical testing.

*Example:* Post-layout simulation confirms all 112 test vectors ($7 \text{ ops} \times 16 \text{ input combos}$) pass with worst-case delay of 13.4 ns. Design is programmed onto FPGA and verified with logic analyzer.

**Summary of flow:**

| Step | Activity | Output |
|------|----------|--------|
| 1 | Specification | Requirements document |
| 2 | Architecture | Block diagram, interfaces |
| 3 | RTL Design | HDL code or schematic |
| 4 | Functional Simulation | Test results (pass/fail) |
| 5 | Synthesis | Gate-level netlist |
| 6 | Timing Analysis | Timing report |
| 7 | Place and Route | Layout / bitstream |
| 8 | Verification and Test | Working hardware |

---

## Summary

| Section | Topics Covered | Problem Count |
|---------|---------------|---------------|
| A | Top-Down Design and Modularity | 4 |
| B | Datapath and Controller Design | 4 |
| C | Timing Analysis | 4 |
| D | Pipelining and Optimization | 4 |
| E | System Design Problems | 4 |
| **Total** | | **20** |
