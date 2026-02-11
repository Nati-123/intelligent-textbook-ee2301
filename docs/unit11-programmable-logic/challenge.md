---
title: Unit 11 Challenge - Programmable Logic Devices
description: Challenge problems for programmable logic devices — answers only, no solutions
---

# Challenge Problems: Programmable Logic Devices

These challenge problems test deeper understanding. Only final answers are provided — work through each problem on your own.

---

#### Challenge 1: ROM-Based Multi-Output Function Implementation

Implement the following 4-input, 4-output combinational circuit using a $16 \times 4$ ROM. Provide the complete ROM contents (all 16 addresses) in both binary and hexadecimal.

- $F_0(A,B,C,D) = \sum m(0, 2, 5, 7, 8, 10, 13, 15)$
- $F_1(A,B,C,D) = \sum m(1, 3, 4, 6, 9, 11, 12, 14)$
- $F_2(A,B,C,D) = \sum m(0, 1, 2, 3, 8, 9, 10, 11)$
- $F_3(A,B,C,D) = \sum m(0, 1, 4, 5, 8, 9, 12, 13)$

After filling in the ROM table, identify any pattern or simplification relating these outputs to the inputs.

!!! success "Answer"
    **ROM contents:**

    | Address | $A$ | $B$ | $C$ | $D$ | $F_3$ | $F_2$ | $F_1$ | $F_0$ | Hex |
    |---------|-----|-----|-----|-----|-------|-------|-------|-------|-----|
    | 0  | 0 | 0 | 0 | 0 | 1 | 1 | 0 | 1 | D |
    | 1  | 0 | 0 | 0 | 1 | 1 | 1 | 1 | 0 | E |
    | 2  | 0 | 0 | 1 | 0 | 0 | 1 | 0 | 1 | 5 |
    | 3  | 0 | 0 | 1 | 1 | 0 | 1 | 1 | 0 | 6 |
    | 4  | 0 | 1 | 0 | 0 | 1 | 0 | 1 | 0 | A |
    | 5  | 0 | 1 | 0 | 1 | 1 | 0 | 0 | 1 | 9 |
    | 6  | 0 | 1 | 1 | 0 | 0 | 0 | 1 | 0 | 2 |
    | 7  | 0 | 1 | 1 | 1 | 0 | 0 | 0 | 1 | 1 |
    | 8  | 1 | 0 | 0 | 0 | 1 | 1 | 0 | 1 | D |
    | 9  | 1 | 0 | 0 | 1 | 1 | 1 | 1 | 0 | E |
    | 10 | 1 | 0 | 1 | 0 | 0 | 1 | 0 | 1 | 5 |
    | 11 | 1 | 0 | 1 | 1 | 0 | 1 | 1 | 0 | 6 |
    | 12 | 1 | 1 | 0 | 0 | 1 | 0 | 1 | 0 | A |
    | 13 | 1 | 1 | 0 | 1 | 1 | 0 | 0 | 1 | 9 |
    | 14 | 1 | 1 | 1 | 0 | 0 | 0 | 1 | 0 | 2 |
    | 15 | 1 | 1 | 1 | 1 | 0 | 0 | 0 | 1 | 1 |

    **Pattern identified:**

    - $F_0 = C \oplus D$ (XOR of two LSBs)
    - $F_1 = \overline{C \oplus D} = C \odot D$ (XNOR of two LSBs)
    - $F_2 = \overline{B}$ (complement of second input)
    - $F_3 = \overline{C}$ (complement of third input)
    - Note that $F_1 = \overline{F_0}$, and neither $F_2$ nor $F_3$ depends on $A$ or $D$.
    - The output at address $n$ equals the output at address $n+8$ for all $n$, confirming $A$ is a don't-care for all outputs.

    The ROM stores $16 \times 4 = 64$ bits total, but only 3 input variables actually matter. A ROM with only 3 address lines ($8 \times 4 = 32$ bits) could implement the same functions by ignoring input $A$.

---

#### Challenge 2: PLA Programming with Shared Product Terms

Design a PLA for the following three functions of four variables. Minimize each function, identify all shared product terms, and provide the final PLA programming table showing the AND-plane and OR-plane connections. State the total number of unique product terms required.

- $F_1(A,B,C,D) = \sum m(0, 1, 2, 3, 8, 9, 10, 11)$
- $F_2(A,B,C,D) = \sum m(0, 1, 4, 5, 8, 9, 12, 13)$
- $F_3(A,B,C,D) = \sum m(0, 2, 8, 10) + d(4, 6, 12, 14)$

!!! success "Answer"
    **Minimized functions:**

    - $F_1 = \overline{B}$ (minterms where $B=0$: 0,1,2,3,8,9,10,11)
    - $F_2 = \overline{C}$ (minterms where $C=0$: 0,1,4,5,8,9,12,13)
    - $F_3 = \overline{B}\,\overline{C}$ (minterms 0,2,8,10 with don't cares 4,6,12,14 allowing $F_3 = \overline{C}$ or $\overline{B}\,\overline{C}$; using don't cares optimally: $F_3 = \overline{B}\,\overline{C}$, or with all don't cares: $F_3 = \overline{C}$ shares with $F_2$)

    Taking $F_3 = \overline{B}\,\overline{C}$ for maximum product term sharing:

    **Unique product terms:**

    | Term | Expression |
    |------|-----------|
    | $P_1$ | $\overline{B}$ |
    | $P_2$ | $\overline{C}$ |
    | $P_3$ | $\overline{B}\,\overline{C}$ |

    But since $P_3 = P_1 \cdot P_2$, the PLA AND plane must generate it as a separate product term (PLAs generate SOP, not multi-level).

    **PLA AND-plane programming:**

    | Term | $A$ | $\overline{A}$ | $B$ | $\overline{B}$ | $C$ | $\overline{C}$ | $D$ | $\overline{D}$ |
    |------|-----|------|-----|------|-----|------|-----|------|
    | $P_1$ | -- | -- | -- | 1 | -- | -- | -- | -- |
    | $P_2$ | -- | -- | -- | -- | -- | 1 | -- | -- |
    | $P_3$ | -- | -- | -- | 1 | -- | 1 | -- | -- |

    **PLA OR-plane programming:**

    | Term | $F_1$ | $F_2$ | $F_3$ |
    |------|-------|-------|-------|
    | $P_1$ | 1 | -- | -- |
    | $P_2$ | -- | 1 | -- |
    | $P_3$ | -- | -- | 1 |

    **Total unique product terms: 3**

    Alternative (if $F_3$ uses don't cares to simplify to $\overline{C}$): only **2 product terms** ($\overline{B}$ and $\overline{C}$), with $F_3$ sharing $P_2$ with $F_2$. This is the better PLA solution since it minimizes product term count.

    With $F_3 = \overline{C}$:

    | Term | $F_1$ | $F_2$ | $F_3$ |
    |------|-------|-------|-------|
    | $P_1 = \overline{B}$ | 1 | -- | -- |
    | $P_2 = \overline{C}$ | -- | 1 | 1 |

    **Optimal answer: 2 product terms**, with $P_2$ shared between $F_2$ and $F_3$.

---

#### Challenge 3: PAL Timing and Fan-In Limitations

A PAL16L8 device has the following specifications:

- 16 inputs (active low outputs, active high inputs)
- 8 outputs, each with a maximum of 7 product terms
- Maximum propagation delay: $t_{pd} = 25$ ns (input pin to output pin)
- Each AND gate has a fan-in of 32 (16 inputs $\times$ 2 for true/complement)

A designer needs to implement the function:

$$G(A,B,C,D,E,F,H,I,J,K,L,M,N,P,Q,R) = \sum m(0, 1, 2, 3, 65534, 65535)$$

This is a 16-variable function. Determine:

(a) Whether this function fits in a single PAL16L8 output.
(b) The minimized SOP expression and number of product terms.
(c) The maximum frequency at which this PAL can toggle the output.

!!! success "Answer"
    **(a)** The PAL16L8 has 16 inputs with fan-in of 32 per AND gate (16 true + 16 complement), so a product term can reference all 16 inputs. The question is whether $G$ requires $\leq 7$ product terms.

    **(b)** Minimized SOP:

    $G = 1$ for minterms 0, 1, 2, 3, 65534, 65535.

    - Minterms 0-3: $A=B=C=D=E=F=H=I=J=K=L=M=N=P=0$, $QR \in \{00,01,10,11\}$

        These combine to: $\overline{A}\,\overline{B}\,\overline{C}\,\overline{D}\,\overline{E}\,\overline{F}\,\overline{H}\,\overline{I}\,\overline{J}\,\overline{K}\,\overline{L}\,\overline{M}\,\overline{N}\,\overline{P}$ (14-literal term, $Q$ and $R$ drop out)

    - Minterm 65534 ($= 2^{16} - 2$): all 1s except LSB = $ABCDEFHIJKLMNPQ\overline{R}$
    - Minterm 65535 ($= 2^{16} - 1$): all 1s = $ABCDEFHIJKLMNPQR$

        These combine to: $ABCDEFHIJKLMNPQ$ (15-literal term, $R$ drops out)

    **Minimized:** $G = \overline{A}\,\overline{B}\,\overline{C}\,\overline{D}\,\overline{E}\,\overline{F}\,\overline{H}\,\overline{I}\,\overline{J}\,\overline{K}\,\overline{L}\,\overline{M}\,\overline{N}\,\overline{P} + ABCDEFHIJKLMNPQ$

    **Number of product terms: 2.** This fits within the 7-term limit. **Yes, it fits in one PAL16L8 output.**

    Note: The PAL16L8 has active-low outputs (output is inverted). The designer must account for the output inversion, implementing $\overline{G}$ in the AND-OR array so the inverted output produces $G$. Since $\overline{G}$ has $2^{16} - 2 - 4 = 65530$ minterms, direct implementation of $\overline{G}$ is impractical. Instead, the designer should implement $G$ and accept the inverted output, or use a PAL with programmable output polarity.

    **(c)** Maximum toggle frequency:

    $$f_{toggle} = \frac{1}{2 \times t_{pd}} = \frac{1}{2 \times 25 \text{ ns}} = \frac{1}{50 \text{ ns}} = \mathbf{20 \text{ MHz}}$$

    The factor of 2 accounts for the output needing one propagation delay to go high and one to go low for a complete toggle cycle.

---

#### Challenge 4: FPGA LUT Cascade for Functions Exceeding Single LUT Capacity

An FPGA has 4-input LUTs (LUT-4). A design requires implementing the following 7-input function:

$$H(A,B,C,D,E,F,G) = ABCD + EFGA + \overline{A}\,\overline{B}\,\overline{C}\,\overline{D}\,\overline{E}\,\overline{F}\,\overline{G}$$

Decompose this function using Shannon expansion to map it onto LUT-4 resources. Determine:

(a) The minimum number of LUT-4s required.
(b) The number of logic levels (LUT depth).
(c) The LUT contents for each LUT in the decomposition.

!!! success "Answer"
    **(a) and (b):**

    Apply Shannon expansion on variables $A$, $B$, $C$ to split the 7-variable function into sub-functions of at most 4 variables.

    **First expansion on $A$:**

    - $H_1 = H|_{A=1} = BCD + EFG + 0 = BCD + EFG$ (6 variables $\to$ still too wide)
    - $H_0 = H|_{A=0} = 0 + 0 + \overline{B}\,\overline{C}\,\overline{D}\,\overline{E}\,\overline{F}\,\overline{G}$ (6 variables $\to$ still too wide)

    **Second expansion of $H_1$ on $B$:**

    - $H_{11} = H_1|_{B=1} = CD + EFG$ (5 variables $\to$ still too wide)
    - $H_{10} = H_1|_{B=0} = EFG$ (3 variables $\to$ **fits LUT-4**)

    **Third expansion of $H_{11}$ on $C$:**

    - $H_{111} = H_{11}|_{C=1} = D + EFG$ (4 variables $\to$ **fits LUT-4**)
    - $H_{110} = H_{11}|_{C=0} = EFG$ (3 variables $\to$ **fits LUT-4**, same as $H_{10}$)

    **Second expansion of $H_0$ on $B$:**

    - $H_{01} = H_0|_{B=1} = 0$ (constant $\to$ tie to 0, no LUT needed)
    - $H_{00} = H_0|_{B=0} = \overline{C}\,\overline{D}\,\overline{E}\,\overline{F}\,\overline{G}$ (5 variables)

    **Third expansion of $H_{00}$ on $C$:**

    - $H_{001} = H_{00}|_{C=1} = 0$ (constant)
    - $H_{000} = H_{00}|_{C=0} = \overline{D}\,\overline{E}\,\overline{F}\,\overline{G}$ (4 variables $\to$ **fits LUT-4**)

    **Recombination LUTs (MUX trees):**

    - LUT for $H_{1}$: MUX($C$, $H_{110}$, $H_{111}$) then MUX($B$, $H_{10}$, result) $\to$ 2 LUTs
    - LUT for $H_{0}$: MUX($C$, 0, $H_{000}$) then MUX($B$, 0, result) $\to$ can merge into 1 LUT since $H_{01}=0$ and $H_{001}=0$
    - Final LUT: MUX($A$, $H_0$, $H_1$)

    **Minimum LUT-4 count: 7**

    | LUT | Inputs | Function |
    |-----|--------|----------|
    | L1 | $E,F,G$ (+ 1 unused) | $EFG$ (shared for $H_{10}$ and $H_{110}$) |
    | L2 | $D,E,F,G$ | $D + EFG = H_{111}$ |
    | L3 | $D,E,F,G$ | $\overline{D}\,\overline{E}\,\overline{F}\,\overline{G} = H_{000}$ |
    | L4 | $C, L1, L2$ (+ 1 unused) | MUX: $C \cdot L2 + \overline{C} \cdot L1 = H_{11}$ |
    | L5 | $B, L1, L4$ (+ 1 unused) | MUX: $B \cdot L4 + \overline{B} \cdot L1 = H_1$ |
    | L6 | $B, C, L3$ (+ 1 unused) | $\overline{B}\,\overline{C} \cdot L3 = H_0$ |
    | L7 | $A, L5, L6$ (+ 1 unused) | MUX: $A \cdot L5 + \overline{A} \cdot L6 = H$ |

    With sharing of L1, this can be done in **7 LUT-4s**.

    **(b) Number of logic levels (LUT depth): 4**

    Critical path: L1 (or L2 or L3) $\to$ L4 $\to$ L5 $\to$ L7, which is 4 LUT levels deep.

    **(c) LUT contents** (selected LUTs):

    **L2** ($D + EFG$, inputs $D,E,F,G$):

    | $DEFG$ | Output |
    |--------|--------|
    | 0000 | 0 |
    | 0001 | 0 |
    | 0010 | 0 |
    | 0011 | 0 |
    | 0100 | 0 |
    | 0101 | 0 |
    | 0110 | 0 |
    | 0111 | 1 |
    | 1000 | 1 |
    | 1001 | 1 |
    | 1010 | 1 |
    | 1011 | 1 |
    | 1100 | 1 |
    | 1101 | 1 |
    | 1110 | 1 |
    | 1111 | 1 |

    SRAM = `0000_0001_1111_1111` = $01\text{FF}_{16}$

    **L3** ($\overline{D}\,\overline{E}\,\overline{F}\,\overline{G}$, inputs $D,E,F,G$): Only address 0000 = 1, all others = 0. SRAM = $0001_{16}$.

---

#### Challenge 5: PLD Device Selection Comparison

A digital system has the following requirements:

- 20 input signals, 12 output signals
- 8 outputs are combinational functions averaging 6 product terms each
- 4 outputs are registered (sequential, requiring flip-flops)
- The design must power up instantly (no configuration delay)
- Operating frequency: 50 MHz
- Production volume: 500 units
- Budget: $5 per unit for the programmable device

Evaluate each PLD technology (ROM, PLA, PAL, CPLD, FPGA) against these requirements. State which device is selected and justify the decision by completing a comparison matrix.

!!! success "Answer"
    **Requirements summary:**

    - 20 inputs, 12 outputs (8 combinational + 4 registered)
    - Average 6 product terms per combinational output
    - Instant power-on (non-volatile configuration)
    - 50 MHz operation
    - 500 units at $5/unit budget

    **Evaluation matrix:**

    | Criterion | ROM | PLA | PAL | CPLD | FPGA (SRAM) |
    |-----------|-----|-----|-----|------|-------------|
    | 20 inputs supported? | No ($2^{20} = 1$M words, impractical) | Possible but limited density | Yes (PAL22V10) | Yes | Yes |
    | 12 outputs? | Yes (if ROM exists) | Limited (typ. 8-10) | PAL22V10 has 10 | Yes (64+ I/O) | Yes |
    | 6 product terms/output? | N/A (ROM stores all minterms) | Yes (shared terms) | Marginal (PAL22V10 has 8-16/output) | Yes | N/A (uses LUTs) |
    | Registered outputs? | No (ROM is combinational only) | No (basic PLA) | Yes (PAL22V10 has registered macrocells) | Yes | Yes |
    | Instant power-on? | Yes (mask ROM) | Yes (fuse-based) | Yes (fuse-based) | Yes (Flash/EEPROM) | **No** (needs bitstream load) |
    | 50 MHz? | $\sim$25-50 MHz | $\sim$15-30 MHz (slow, two programmable planes) | $\sim$50-100 MHz | $\sim$100+ MHz | $\sim$200+ MHz |
    | $5/unit at 500 qty? | No (custom mask cost) | $\sim$\$3-8 | $\sim$\$2-5 | $\sim$\$3-10 | $\sim$\$5-50 |

    **Elimination:**

    - **ROM:** Eliminated. 20 inputs means $2^{20} \times 12 = 12$ Mbit ROM. Commercially impractical and lacks registered outputs.
    - **PLA:** Eliminated. Too slow for 50 MHz. Limited output count. No registered outputs in basic PLAs.
    - **FPGA (SRAM):** Eliminated. Fails instant power-on requirement. Also likely exceeds $5 budget for this design size at 500 units.
    - **PAL:** PAL22V10 has 22 inputs (OK), 10 outputs (not enough for 12). Could use two PAL22V10s but complicates design. Registered outputs available. Speed is borderline at 50 MHz depending on grade.

    **Selected device: CPLD**

    Justification:

    - **Capacity:** A small CPLD (e.g., Xilinx CoolRunner-II XC2C64 or Lattice MachXO2-256) provides 64+ macro-cells, easily handling 20 inputs and 12 outputs.
    - **Product terms:** CPLD function blocks provide sufficient product terms per output, with borrowing for outputs needing more than the base allocation.
    - **Registered outputs:** Every CPLD macro-cell contains a configurable flip-flop.
    - **Instant power-on:** CPLDs use non-volatile configuration (Flash or EEPROM). The device is operational within microseconds of power application.
    - **Speed:** CPLDs with deterministic timing easily achieve 50 MHz with margin.
    - **Cost:** Small CPLDs are available for $2-5 at moderate volumes, within budget.
    - **Development:** Standard HDL design flow with free vendor tools.

    **Final answer: A small Flash-based CPLD** is the optimal choice, meeting all requirements with margin on speed, capacity, and cost.
