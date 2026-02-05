---
title: Unit 8 Problems - Combinational Logic Modules
description: Practice problems for multiplexers, decoders, encoders, and other combinational building blocks
---

# End-of-Unit Problems: Combinational Logic Modules

Work through these problems to reinforce your understanding of MSI combinational building blocks.

---

## Section A: Multiplexers (6 problems)

### Problem 1
Design the truth table and Boolean expression for a 4-to-1 multiplexer with inputs D₀, D₁, D₂, D₃, select lines S₁, S₀, and output Y.

??? success "Solution"
    **Truth Table:**

    | S₁ | S₀ | Y |
    |----|----|----|
    | 0 | 0 | D₀ |
    | 0 | 1 | D₁ |
    | 1 | 0 | D₂ |
    | 1 | 1 | D₃ |

    **Boolean Expression:**

    $Y = S_1'S_0'D_0 + S_1'S_0D_1 + S_1S_0'D_2 + S_1S_0D_3$

    **Gate-level implementation:**

    - 4 AND gates (3 inputs each): one for each minterm
    - 1 OR gate (4 inputs): combines all terms
    - 2 inverters: for S₁' and S₀'

    **Total: 7 gates**

---

### Problem 2
Implement the function $F(A, B, C) = \sum m(1, 2, 6, 7)$ using:

a) An 8-to-1 MUX with A, B, C as select inputs
b) A 4-to-1 MUX with B, C as select inputs

??? success "Solution"
    a) **8-to-1 MUX implementation:**

    Connect minterms directly to data inputs:

    | Minterm | ABC | D input |
    |---------|-----|---------|
    | 0 | 000 | D₀ = 0 |
    | 1 | 001 | D₁ = 1 |
    | 2 | 010 | D₂ = 1 |
    | 3 | 011 | D₃ = 0 |
    | 4 | 100 | D₄ = 0 |
    | 5 | 101 | D₅ = 0 |
    | 6 | 110 | D₆ = 1 |
    | 7 | 111 | D₇ = 1 |

    **Connections:** D₁ = D₂ = D₆ = D₇ = 1 (Vcc), others = 0 (GND)

    Select: S₂ = A, S₁ = B, S₀ = C

    b) **4-to-1 MUX implementation:**

    Use Shannon expansion with A as the residual variable:

    | BC | F(A=0) | F(A=1) | D input |
    |----|--------|--------|---------|
    | 00 | 0 | 0 | D₀ = 0 |
    | 01 | 1 | 0 | D₁ = A' |
    | 10 | 1 | 1 | D₂ = 1 |
    | 11 | 0 | 1 | D₃ = A |

    **Connections:**

    - D₀ = 0 (GND)
    - D₁ = A'
    - D₂ = 1 (Vcc)
    - D₃ = A
    - S₁ = B, S₀ = C

---

### Problem 3
Build a 16-to-1 MUX using 4-to-1 MUXes only. How many 4-to-1 MUXes are needed?

??? success "Solution"
    **Two-level tree structure:**

    **Level 1:** Four 4-to-1 MUXes

    - MUX₀: inputs D₀-D₃, select S₁S₀
    - MUX₁: inputs D₄-D₇, select S₁S₀
    - MUX₂: inputs D₈-D₁₁, select S₁S₀
    - MUX₃: inputs D₁₂-D₁₅, select S₁S₀

    **Level 2:** One 4-to-1 MUX

    - MUX₄: inputs are outputs of MUX₀-MUX₃, select S₃S₂

    **Total: 5 four-to-1 MUXes**

    **Connections:**

    ```
    D₀-D₃ ──[MUX₀]──┐
                    │
    D₄-D₇ ──[MUX₁]──┼──[MUX₄]── Y
                    │
    D₈-D₁₁──[MUX₂]──┤
                    │
    D₁₂-D₁₅─[MUX₃]──┘

    S₁S₀ to all Level 1 MUXes
    S₃S₂ to Level 2 MUX
    ```

---

### Problem 4
A 2-to-1 MUX has data inputs D₀ and D₁, select input S, and output Y. Using only 2-to-1 MUXes, implement:

a) NOT gate
b) AND gate
c) OR gate

??? success "Solution"
    **2-to-1 MUX equation:** Y = S'D₀ + SD₁

    a) **NOT gate (Y = A'):**

    Set D₀ = 1, D₁ = 0, S = A

    Y = A'(1) + A(0) = A' ✓

    b) **AND gate (Y = AB):**

    Set D₀ = 0, D₁ = B, S = A

    Y = A'(0) + A(B) = AB ✓

    **Alternative:** D₀ = 0, D₁ = A, S = B gives Y = BA

    c) **OR gate (Y = A + B):**

    Set D₀ = B, D₁ = 1, S = A

    Y = A'(B) + A(1) = A'B + A = A + B ✓

    **Alternative:** D₀ = A, D₁ = 1, S = B gives Y = B'A + B = A + B

---

### Problem 5
Implement the function $F(W, X, Y, Z) = \sum m(0, 1, 3, 4, 8, 9, 15)$ using a single 8-to-1 MUX with W, X, Y as select inputs.

??? success "Solution"
    **Shannon expansion with Z as residual:**

    For each WXY combination, determine F in terms of Z:

    | WXY | Minterms | F(Z=0) | F(Z=1) | D input |
    |-----|----------|--------|--------|---------|
    | 000 | 0,1 | 1 | 1 | D₀ = 1 |
    | 001 | 2,3 | 0 | 1 | D₁ = Z |
    | 010 | 4,5 | 1 | 0 | D₂ = Z' |
    | 011 | 6,7 | 0 | 0 | D₃ = 0 |
    | 100 | 8,9 | 1 | 1 | D₄ = 1 |
    | 101 | 10,11 | 0 | 0 | D₅ = 0 |
    | 110 | 12,13 | 0 | 0 | D₆ = 0 |
    | 111 | 14,15 | 0 | 1 | D₇ = Z |

    **Connections:**

    - D₀ = 1 (Vcc)
    - D₁ = Z
    - D₂ = Z'
    - D₃ = 0 (GND)
    - D₄ = 1 (Vcc)
    - D₅ = 0 (GND)
    - D₆ = 0 (GND)
    - D₇ = Z
    - S₂ = W, S₁ = X, S₀ = Y

---

### Problem 6
Design a 4-bit barrel shifter using multiplexers. The shifter should shift input data D[3:0] by S[1:0] positions to the right.

??? success "Solution"
    **Barrel Shifter operation:**

    | S[1:0] | Output |
    |--------|--------|
    | 00 | D[3:0] (no shift) |
    | 01 | 0,D[3:1] (shift 1) |
    | 10 | 0,0,D[3:2] (shift 2) |
    | 11 | 0,0,0,D[3] (shift 3) |

    **Using 4-to-1 MUXes (one per output bit):**

    **Output Y[3]:**

    | S | Source |
    |---|--------|
    | 00 | D[3] |
    | 01 | 0 |
    | 10 | 0 |
    | 11 | 0 |

    Y[3] = S₁'S₀'D[3] → MUX: D₀=D[3], D₁=D₂=D₃=0

    **Output Y[2]:**

    | S | Source |
    |---|--------|
    | 00 | D[2] |
    | 01 | D[3] |
    | 10 | 0 |
    | 11 | 0 |

    MUX: D₀=D[2], D₁=D[3], D₂=D₃=0

    **Output Y[1]:**

    | S | Source |
    |---|--------|
    | 00 | D[1] |
    | 01 | D[2] |
    | 10 | D[3] |
    | 11 | 0 |

    MUX: D₀=D[1], D₁=D[2], D₂=D[3], D₃=0

    **Output Y[0]:**

    | S | Source |
    |---|--------|
    | 00 | D[0] |
    | 01 | D[1] |
    | 10 | D[2] |
    | 11 | D[3] |

    MUX: D₀=D[0], D₁=D[1], D₂=D[2], D₃=D[3]

    **Total: 4 four-to-1 MUXes**

---

## Section B: Decoders (5 problems)

### Problem 7
Design a 3-to-8 decoder with an enable input. Show the truth table and logic equations for all 8 outputs.

??? success "Solution"
    **Truth Table:**

    | EN | A₂ | A₁ | A₀ | Y₀ | Y₁ | Y₂ | Y₃ | Y₄ | Y₅ | Y₆ | Y₇ |
    |----|----|----|-----|----|----|----|----|----|----|----|----|
    | 0 | X | X | X | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
    | 1 | 0 | 0 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
    | 1 | 0 | 0 | 1 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | 0 |
    | 1 | 0 | 1 | 0 | 0 | 0 | 1 | 0 | 0 | 0 | 0 | 0 |
    | 1 | 0 | 1 | 1 | 0 | 0 | 0 | 1 | 0 | 0 | 0 | 0 |
    | 1 | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 0 | 0 | 0 |
    | 1 | 1 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | 1 | 0 | 0 |
    | 1 | 1 | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 0 |
    | 1 | 1 | 1 | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 |

    **Logic Equations:**

    - Y₀ = EN · A₂' · A₁' · A₀'
    - Y₁ = EN · A₂' · A₁' · A₀
    - Y₂ = EN · A₂' · A₁ · A₀'
    - Y₃ = EN · A₂' · A₁ · A₀
    - Y₄ = EN · A₂ · A₁' · A₀'
    - Y₅ = EN · A₂ · A₁' · A₀
    - Y₆ = EN · A₂ · A₁ · A₀'
    - Y₇ = EN · A₂ · A₁ · A₀

    **Each output is a 4-input AND gate (minterm generator)**

---

### Problem 8
Implement $F(A, B, C) = \sum m(1, 2, 4, 7)$ using a 3-to-8 decoder and an OR gate.

??? success "Solution"
    **Decoder outputs correspond to minterms:**

    - Y₀ = m₀ = A'B'C'
    - Y₁ = m₁ = A'B'C
    - Y₂ = m₂ = A'BC'
    - Y₃ = m₃ = A'BC
    - Y₄ = m₄ = AB'C'
    - Y₅ = m₅ = AB'C
    - Y₆ = m₆ = ABC'
    - Y₇ = m₇ = ABC

    **For F = Σm(1, 2, 4, 7):**

    F = Y₁ + Y₂ + Y₄ + Y₇

    **Implementation:**

    ```
    A ──┬
    B ──┼──[3-to-8]──Y₁──┐
    C ──┘   Decoder  Y₂──┼──[OR]── F
                     Y₄──┤
                     Y₇──┘
    ```

    **Connect:** Y₁, Y₂, Y₄, Y₇ to a 4-input OR gate

---

### Problem 9
Build a 4-to-16 decoder using 2-to-4 decoders with enable inputs. Show the interconnections.

??? success "Solution"
    **Architecture:**

    Use 5 decoders: 1 for high-order bits (enable selector), 4 for low-order bits (output generators)

    **Level 1 decoder:** 2-to-4 decoder for A₃A₂

    - Inputs: A₃, A₂
    - Outputs: Enable signals E₀, E₁, E₂, E₃

    **Level 2 decoders:** Four 2-to-4 decoders for A₁A₀

    - All share inputs A₁, A₀
    - Each enabled by one output from Level 1

    **Connections:**

    ```
    A₃,A₂ ──[DEC₀]── E₀ → EN of DEC₁ → Y₀-Y₃
                     E₁ → EN of DEC₂ → Y₄-Y₇
                     E₂ → EN of DEC₃ → Y₈-Y₁₁
                     E₃ → EN of DEC₄ → Y₁₂-Y₁₅

    A₁,A₀ connected to inputs of DEC₁, DEC₂, DEC₃, DEC₄
    ```

    **Total: 5 decoders (1 + 4)**

    When A₃A₂ = 00: E₀ active, DEC₁ outputs Y₀-Y₃
    When A₃A₂ = 01: E₁ active, DEC₂ outputs Y₄-Y₇
    And so on...

---

### Problem 10
Design a BCD-to-Seven-Segment decoder. Show outputs for digits 0-9.

??? success "Solution"
    **Seven-segment display segments:**

    ```
        ─a─
       │   │
       f   b
       │   │
        ─g─
       │   │
       e   c
       │   │
        ─d─
    ```

    **Truth Table (1 = segment ON):**

    | BCD | Digit | a | b | c | d | e | f | g |
    |-----|-------|---|---|---|---|---|---|---|
    | 0000 | 0 | 1 | 1 | 1 | 1 | 1 | 1 | 0 |
    | 0001 | 1 | 0 | 1 | 1 | 0 | 0 | 0 | 0 |
    | 0010 | 2 | 1 | 1 | 0 | 1 | 1 | 0 | 1 |
    | 0011 | 3 | 1 | 1 | 1 | 1 | 0 | 0 | 1 |
    | 0100 | 4 | 0 | 1 | 1 | 0 | 0 | 1 | 1 |
    | 0101 | 5 | 1 | 0 | 1 | 1 | 0 | 1 | 1 |
    | 0110 | 6 | 1 | 0 | 1 | 1 | 1 | 1 | 1 |
    | 0111 | 7 | 1 | 1 | 1 | 0 | 0 | 0 | 0 |
    | 1000 | 8 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |
    | 1001 | 9 | 1 | 1 | 1 | 1 | 0 | 1 | 1 |

    **Boolean expressions (SOP for each segment):**

    Let inputs be D, C, B, A (D is MSB)

    - a = Σm(0,2,3,5,6,7,8,9) = A'C' + B + DA' + D'AC
    - b = Σm(0,1,2,3,4,7,8,9) = A' + C'B' + CB
    - c = Σm(0,1,3,4,5,6,7,8,9) = A + B' + C
    - d = Σm(0,2,3,5,6,8,9) = A'C' + CB'A + C'B + D
    - e = Σm(0,2,6,8) = A'C' + C'B'D'
    - f = Σm(0,4,5,6,8,9) = D + CB' + A'B' + CA'
    - g = Σm(2,3,4,5,6,8,9) = D + C'B + CB' + A'C

    (Simplified expressions may vary)

---

### Problem 11
A memory chip has 1024 addresses. How many decoder output lines are needed, and what is the minimum number of address bits?

??? success "Solution"
    **Analysis:**

    - 1024 addresses = 2¹⁰ addresses
    - **Minimum address bits: 10** (since 2¹⁰ = 1024)

    **Decoder requirements:**

    A full decoder would have:

    - 10 input lines (A₉...A₀)
    - **1024 output lines** (one per address)

    **Practical implementation:**

    Full 10-to-1024 decoders are impractical. Instead, use hierarchical decoding:

    **Option 1: Row/Column decoding**

    - 5-to-32 decoder for rows (32 outputs)
    - 5-to-32 decoder for columns (32 outputs)
    - 32 × 32 = 1024 intersections
    - **Total: 64 decoder output lines**

    **Option 2: Multiple levels**

    - 2-to-4 decoder (A₉A₈)
    - Four 8-to-256 decoders (one enabled at a time)
    - Total outputs: 4 + 4×256 = impractical

    **Most practical:**

    Row-column addressing with 64 total decoder outputs (32 + 32)

---

## Section C: Encoders and Priority Encoders (4 problems)

### Problem 12
Design an 8-to-3 priority encoder. Show the truth table with priority (7 highest, 0 lowest).

??? success "Solution"
    **Truth Table:**

    | D₇ | D₆ | D₅ | D₄ | D₃ | D₂ | D₁ | D₀ | Y₂ | Y₁ | Y₀ | Valid |
    |----|----|----|----|----|----|----|----|----|----|----|-------|
    | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | X | X | X | 0 |
    | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 0 | 0 | 0 | 1 |
    | 0 | 0 | 0 | 0 | 0 | 0 | 1 | X | 0 | 0 | 1 | 1 |
    | 0 | 0 | 0 | 0 | 0 | 1 | X | X | 0 | 1 | 0 | 1 |
    | 0 | 0 | 0 | 0 | 1 | X | X | X | 0 | 1 | 1 | 1 |
    | 0 | 0 | 0 | 1 | X | X | X | X | 1 | 0 | 0 | 1 |
    | 0 | 0 | 1 | X | X | X | X | X | 1 | 0 | 1 | 1 |
    | 0 | 1 | X | X | X | X | X | X | 1 | 1 | 0 | 1 |
    | 1 | X | X | X | X | X | X | X | 1 | 1 | 1 | 1 |

    (X = don't care)

    **Boolean Expressions:**

    - Y₂ = D₇ + D₆ + D₅ + D₄
    - Y₁ = D₇ + D₆ + D₇'D₆'D₅'D₄'D₃ + D₇'D₆'D₅'D₄'D₂
    - Y₀ = D₇ + D₇'D₆ + D₇'D₆'D₅ + D₇'D₆'D₅'D₄'D₃ + D₇'D₆'D₅'D₄'D₃'D₂'D₁
    - Valid = D₇ + D₆ + D₅ + D₄ + D₃ + D₂ + D₁ + D₀

    **Simplified:**

    - Y₂ = D₄ + D₅ + D₆ + D₇
    - Y₁ = D₂ + D₃ + D₆ + D₇
    - Y₀ = D₁ + D₃ + D₅ + D₇

---

### Problem 13
An interrupt controller receives requests from 8 devices. Design a circuit that outputs the binary code of the highest-priority active request.

??? success "Solution"
    **Use an 8-to-3 priority encoder:**

    **Connections:**

    - IRQ₀ (lowest) → D₀
    - IRQ₁ → D₁
    - ...
    - IRQ₇ (highest) → D₇

    **Outputs:**

    - Y[2:0]: Binary code of highest-priority interrupt
    - Valid: At least one interrupt pending

    **Example priority table:**

    | Active Requests | Output Code | Device |
    |-----------------|-------------|--------|
    | Only IRQ₃ | 011 | Device 3 |
    | IRQ₃ and IRQ₅ | 101 | Device 5 (higher) |
    | IRQ₂, IRQ₄, IRQ₆ | 110 | Device 6 (highest) |

    **Additional logic needed:**

    - Interrupt acknowledge (INTA) signal
    - Mask register to disable certain interrupts
    - Daisy-chain for equal-priority handling

---

### Problem 14
Convert between encoder types:

a) How can a standard encoder be converted to a priority encoder?
b) Why can't a priority encoder easily become a standard encoder?

??? success "Solution"
    a) **Standard to Priority Encoder:**

    Add priority resolution logic before the encoder:

    ```
    D₇ ────────────────────→ P₇
    D₆ ──[AND]── D₆·D₇' ───→ P₆
    D₅ ──[AND]── D₅·D₆'D₇' → P₅
    ...
    D₀ ──[AND]── D₀·D₁'...D₇' → P₀

    P₇...P₀ → [Standard Encoder] → Y[2:0]
    ```

    Each input is ANDed with the complement of all higher-priority inputs.

    **Gate cost:** Additional AND gates with increasing inputs (up to 7 inputs for D₀)

    b) **Priority to Standard Encoder conversion issues:**

    - A **standard encoder** assumes exactly ONE input is active
    - It produces undefined/incorrect output if multiple inputs are active
    - A **priority encoder** handles multiple active inputs by design

    **Problem:** The priority encoder loses information about lower-priority inputs.

    If inputs 3 and 5 are both active:

    - Priority encoder outputs: 5 (correct for priority)
    - Standard encoder would output: undefined (violation of assumption)

    **Cannot recover:** Once priority encoder outputs "5", we don't know if "3" was also active.

    **Conclusion:** Priority → Standard requires storing/buffering all input states before encoding, which defeats the purpose.

---

### Problem 15
Design a decimal-to-BCD encoder (10-to-4 encoder) for a calculator keypad.

??? success "Solution"
    **Input:** 10 keys (K₀ through K₉), one active at a time
    **Output:** 4-bit BCD code (D₃D₂D₁D₀)

    **Truth Table:**

    | Active Key | D₃ | D₂ | D₁ | D₀ |
    |------------|----|----|----|----|
    | K₀ | 0 | 0 | 0 | 0 |
    | K₁ | 0 | 0 | 0 | 1 |
    | K₂ | 0 | 0 | 1 | 0 |
    | K₃ | 0 | 0 | 1 | 1 |
    | K₄ | 0 | 1 | 0 | 0 |
    | K₅ | 0 | 1 | 0 | 1 |
    | K₆ | 0 | 1 | 1 | 0 |
    | K₇ | 0 | 1 | 1 | 1 |
    | K₈ | 1 | 0 | 0 | 0 |
    | K₉ | 1 | 0 | 0 | 1 |

    **Boolean Expressions:**

    - D₃ = K₈ + K₉
    - D₂ = K₄ + K₅ + K₆ + K₇
    - D₁ = K₂ + K₃ + K₆ + K₇
    - D₀ = K₁ + K₃ + K₅ + K₇ + K₉

    **Implementation:**

    - 4 OR gates
    - D₃: 2-input OR
    - D₂: 4-input OR
    - D₁: 4-input OR
    - D₀: 5-input OR

    **Total: 4 OR gates**

    **Additional feature:** Key-pressed indicator

    - KeyValid = K₀ + K₁ + ... + K₉ (10-input OR)

---

## Section D: Code Converters (3 problems)

### Problem 16
Design a 4-bit binary-to-Gray code converter.

??? success "Solution"
    **Gray code property:** Adjacent values differ by exactly one bit.

    **Conversion formula:**

    - G₃ = B₃
    - G₂ = B₃ ⊕ B₂
    - G₁ = B₂ ⊕ B₁
    - G₀ = B₁ ⊕ B₀

    **Truth Table:**

    | Binary | Gray |
    |--------|------|
    | 0000 | 0000 |
    | 0001 | 0001 |
    | 0010 | 0011 |
    | 0011 | 0010 |
    | 0100 | 0110 |
    | 0101 | 0111 |
    | 0110 | 0101 |
    | 0111 | 0100 |
    | 1000 | 1100 |
    | 1001 | 1101 |
    | 1010 | 1111 |
    | 1011 | 1110 |
    | 1100 | 1010 |
    | 1101 | 1011 |
    | 1110 | 1001 |
    | 1111 | 1000 |

    **Implementation:**

    ```
    B₃ ─────────────────→ G₃
    B₃ ─┬─[XOR]────────→ G₂
    B₂ ─┴─────┬─[XOR]──→ G₁
    B₁ ───────┴────┬─[XOR]→ G₀
    B₀ ────────────┘
    ```

    **Total: 3 XOR gates**

---

### Problem 17
Design a 4-bit Gray-to-binary converter.

??? success "Solution"
    **Conversion formula (derived from Gray-to-binary relationship):**

    - B₃ = G₃
    - B₂ = G₃ ⊕ G₂ = B₃ ⊕ G₂
    - B₁ = G₃ ⊕ G₂ ⊕ G₁ = B₂ ⊕ G₁
    - B₀ = G₃ ⊕ G₂ ⊕ G₁ ⊕ G₀ = B₁ ⊕ G₀

    **Implementation:**

    ```
    G₃ ────────────────────→ B₃
    G₃ ─┬─[XOR]────────────→ B₂
    G₂ ─┘     │
              └─┬─[XOR]────→ B₁
    G₁ ────────┘    │
                    └─[XOR]→ B₀
    G₀ ───────────────┘
    ```

    **Total: 3 XOR gates** (but cascaded, causing delay)

    **Propagation delay:** 3 XOR gate delays (cascaded)

    **Parallel implementation (faster):**

    - B₃ = G₃
    - B₂ = G₃ ⊕ G₂
    - B₁ = G₃ ⊕ G₂ ⊕ G₁
    - B₀ = G₃ ⊕ G₂ ⊕ G₁ ⊕ G₀

    Using tree structure: 2 XOR gate delays

---

### Problem 18
Design a BCD-to-Excess-3 code converter.

??? success "Solution"
    **Excess-3 = BCD + 3**

    | Decimal | BCD (DCBA) | Excess-3 (E₃E₂E₁E₀) |
    |---------|------------|----------------------|
    | 0 | 0000 | 0011 |
    | 1 | 0001 | 0100 |
    | 2 | 0010 | 0101 |
    | 3 | 0011 | 0110 |
    | 4 | 0100 | 0111 |
    | 5 | 0101 | 1000 |
    | 6 | 0110 | 1001 |
    | 7 | 0111 | 1010 |
    | 8 | 1000 | 1011 |
    | 9 | 1001 | 1100 |

    **K-maps and simplified expressions:**

    **E₃:**

    K-map for E₃ (1s at BCD 5-9):

    E₃ = D + CB + CA (from K-map)

    **E₂:**

    K-map analysis:

    E₂ = C'B + C'A + CB'A' (from K-map)

    **E₁:**

    E₁ = B'A' + BA = B ⊙ A (XNOR)

    **E₀:**

    E₀ = A'

    **Summary:**

    - E₃ = D + CB + CA
    - E₂ = C'B + C'A + CB'A'
    - E₁ = B ⊙ A = (B ⊕ A)'
    - E₀ = A'

---

## Section E: Comparators (2 problems)

### Problem 19
Design a 2-bit magnitude comparator that compares A₁A₀ with B₁B₀ and produces three outputs: A>B, A=B, A<B.

??? success "Solution"
    **Bit comparisons:**

    Let x₁ = A₁ ⊙ B₁ (equals 1 if A₁ = B₁)
    Let x₀ = A₀ ⊙ B₀ (equals 1 if A₀ = B₀)

    **Output equations:**

    **A = B:**

    A = B when all bits match

    (A=B) = x₁ · x₀ = (A₁ ⊙ B₁)(A₀ ⊙ B₀)

    **A > B:**

    A > B when:

    - A₁ > B₁, OR
    - A₁ = B₁ AND A₀ > B₀

    (A>B) = A₁B₁' + x₁A₀B₀'

    **A < B:**

    (A<B) = A₁'B₁ + x₁A₀'B₀

    **Alternative:** (A<B) = (A>B)' · (A=B)'

    **Implementation:**

    - 2 XNOR gates for x₁, x₀
    - 1 AND gate for (A=B)
    - 2 AND gates for (A>B) terms
    - 1 OR gate for (A>B)
    - Similar for (A<B)

    **Total: ~10 gates**

---

### Problem 20
Cascade two 4-bit comparators to create an 8-bit comparator. Show the connections.

??? success "Solution"
    **4-bit comparator inputs/outputs:**

    - Inputs: A[3:0], B[3:0]
    - Cascade inputs: (A>B)ᵢₙ, (A=B)ᵢₙ, (A<B)ᵢₙ
    - Outputs: (A>B)ₒᵤₜ, (A=B)ₒᵤₜ, (A<B)ₒᵤₜ

    **8-bit comparator design:**

    **Comparator 1 (Low nibble):** A[3:0] vs B[3:0]

    - Cascade inputs: (A>B)ᵢₙ = 0, (A=B)ᵢₙ = 1, (A<B)ᵢₙ = 0
    - This sets "equal" as initial condition

    **Comparator 2 (High nibble):** A[7:4] vs B[7:4]

    - Cascade inputs connected from Comparator 1 outputs
    - Final outputs from Comparator 2

    **Connections:**

    ```
    A[3:0], B[3:0] → [COMP1] → (A>B)₁, (A=B)₁, (A<B)₁
                                   ↓         ↓        ↓
                               (A>B)ᵢₙ   (A=B)ᵢₙ  (A<B)ᵢₙ
                                   ↓         ↓        ↓
    A[7:4], B[7:4] → [COMP2] → (A>B)final, (A=B)final, (A<B)final
    ```

    **Logic of cascade:**

    - If high nibbles unequal: Result from Comparator 2
    - If high nibbles equal: Result from Comparator 1 (propagated through cascade)

    **Internal cascade logic of Comparator 2:**

    - (A>B)ₒᵤₜ = (A>B)internal + (A=B)internal · (A>B)ᵢₙ
    - (A=B)ₒᵤₜ = (A=B)internal · (A=B)ᵢₙ
    - (A<B)ₒᵤₜ = (A<B)internal + (A=B)internal · (A<B)ᵢₙ

---

## Summary

| Section | Topics Covered | Problem Count |
|---------|---------------|---------------|
| A | Multiplexers | 6 |
| B | Decoders | 5 |
| C | Encoders | 4 |
| D | Code Converters | 3 |
| E | Comparators | 2 |
| **Total** | | **20** |
