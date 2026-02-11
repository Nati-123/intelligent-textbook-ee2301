---
title: Unit 3 Quiz - Applications of Boolean Algebra
description: Test your understanding of combinational logic, arithmetic circuits, and code converters
---

# Quiz: Applications of Boolean Algebra

Test your understanding of combinational logic design, arithmetic circuits, comparators, parity circuits, and code converters with these questions.

---

#### 1. What fundamental property distinguishes combinational circuits from sequential circuits?

<div class="upper-alpha" markdown>
1. Combinational circuits use only NAND gates
2. Sequential circuits operate at higher clock frequencies
3. Sequential circuits cannot use Boolean algebra
4. Combinational circuit outputs depend only on current inputs, with no memory of past states
</div>

??? question "Show Answer"
    The correct answer is **D**. Combinational logic circuits produce outputs that are a pure function of the current input values—they have no memory elements and no concept of history. Sequential logic circuits incorporate feedback and storage elements (latches, flip-flops), so their outputs depend on both current inputs and the circuit's internal state. This distinction is the most fundamental classification in digital circuit design.

    **Concept Tested:** Combinational vs Sequential Logic

---

#### 2. In a half adder, what are the Boolean expressions for the Sum and Carry outputs?

<div class="upper-alpha" markdown>
1. $S = A \oplus B$, $C = A \cdot B$
2. $S = A \cdot B$, $C = A + B$
3. $S = A + B$, $C = A \oplus B$
4. $S = A \cdot B$, $C = A \oplus B$
</div>

??? question "Show Answer"
    The correct answer is **A**. The half adder computes the sum and carry of two single-bit inputs. The Sum output is the XOR: $S = A \oplus B$ (1 when exactly one input is 1). The Carry output is the AND: $C = A \cdot B$ (1 only when both inputs are 1, producing a carry to the next bit position). A half adder has no carry-in input, which limits it to the least-significant bit position in a multi-bit adder.

    **Concept Tested:** Half Adder

---

#### 3. What is the primary performance limitation of a ripple carry adder?

<div class="upper-alpha" markdown>
1. It can only add numbers up to 4 bits wide
2. Carry propagation delay increases linearly with operand width, limiting speed
3. It requires more gates than any other adder architecture
4. It cannot handle signed (two's complement) numbers
</div>

??? question "Show Answer"
    The correct answer is **B**. In a ripple carry adder, each full adder stage must wait for the carry output of the previous stage before computing its result. For an $n$-bit adder, the worst-case delay is $n$ sequential carry propagations (e.g., adding $0111...1 + 0000...1$). This makes the total delay $O(n)$, which is unacceptable for wide datapaths. Carry-lookahead adders reduce this to $O(\log n)$ by computing carries in parallel.

    **Concept Tested:** Ripple Carry Adder

---

#### 4. How does an adder-subtractor circuit compute $A - B$ using an adder?

<div class="upper-alpha" markdown>
1. It computes $A + \overline{B} + 1$ by XORing each bit of $B$ with the mode signal and setting carry-in to 1
2. It swaps the $A$ and $B$ inputs to the adder
3. It uses a separate subtractor unit alongside the adder
4. It negates the adder's final output
</div>

??? question "Show Answer"
    The correct answer is **A**. The adder-subtractor circuit uses a mode signal $M$ that controls XOR gates on each bit of $B$. When $M = 1$ (subtract mode), each $B_i$ is XORed with 1, complementing it to $\overline{B_i}$. The mode signal also feeds the carry-in, adding 1. This computes $A + \overline{B} + 1 = A + (-B) = A - B$ using two's complement arithmetic. When $M = 0$, $B$ passes through unchanged and carry-in is 0, performing normal addition.

    **Concept Tested:** Adder-Subtractor Circuit

---

#### 5. What is the primary purpose of a parity generator in a digital communication system?

<div class="upper-alpha" markdown>
1. To multiply binary numbers before transmission
2. To convert between number bases during data transfer
3. To compare two binary numbers for equality
4. To create a check bit that enables detection of single-bit transmission errors
</div>

??? question "Show Answer"
    The correct answer is **D**. A parity generator creates a parity bit such that the total number of 1s in the data word plus the parity bit is always even (even parity) or always odd (odd parity). The receiver uses a parity checker—an XOR tree—to verify that the received word has correct parity. If a single bit flips during transmission, the parity check fails, flagging the error. The parity generator itself is implemented as a cascade of XOR gates.

    **Concept Tested:** Parity Generator / Error Detection

---

#### 6. What is the defining property of Gray code that makes it valuable in position encoders?

<div class="upper-alpha" markdown>
1. Each digit represents a power of 10
2. All code words have an equal number of 1s and 0s
3. Adjacent code words differ in exactly one bit position
4. The code uses hexadecimal digits
</div>

??? question "Show Answer"
    The correct answer is **C**. In Gray code, consecutive values differ in exactly one bit position. This single-bit-change property prevents ambiguous readings in rotary and linear position encoders: during a transition, only one sensor changes state, so the encoder never produces an incorrect intermediate value. In contrast, standard binary code can have multiple bits changing simultaneously (e.g., $011 \rightarrow 100$ changes all three bits), creating transient erroneous readings.

    **Concept Tested:** Gray Code

---

#### 7. In a BCD-to-seven-segment decoder, the 4-bit input combinations 1010 through 1111 never occur in normal operation. How should these be handled in the design?

<div class="upper-alpha" markdown>
1. Display a blank (all segments off) for all invalid inputs
2. Treat them as don't care conditions to simplify the segment logic
3. Display hexadecimal digits A through F
4. Add input validation logic to reject invalid codes
</div>

??? question "Show Answer"
    The correct answer is **B**. In a properly functioning BCD system, inputs 1010–1111 never occur, so these six combinations can be treated as don't care conditions in the K-maps for each segment function. This gives the minimization algorithm maximum freedom to form larger groups, often producing significantly simpler Boolean expressions. For example, the segment $a$ function with don't cares may simplify from a 4-term expression to a 3-term expression, reducing gate count.

    **Concept Tested:** Seven-Segment Decoder / Don't Care Conditions

---

#### 8. What is the Boolean expression for the Borrow output of a half subtractor?

<div class="upper-alpha" markdown>
1. $B_{out} = \overline{A} \cdot B$
2. $B_{out} = A \cdot B$
3. $B_{out} = A \oplus B$
4. $B_{out} = A + B$
</div>

??? question "Show Answer"
    The correct answer is **A**. The half subtractor computes $A - B$, producing a Difference output $D = A \oplus B$ and a Borrow output $B_{out} = \overline{A} \cdot B$. A borrow is needed when subtracting a 1 ($B = 1$) from a 0 ($A = 0$)—the only case where $\overline{A} \cdot B = 1$. This differs from the half adder's Carry output ($C = A \cdot B$), where $A$ is not complemented.

    **Concept Tested:** Half Subtractor

---

#### 9. To convert from binary to Gray code, the formula $G_i = B_{i+1} \oplus B_i$ is applied to each pair of adjacent binary bits, while the MSB is copied directly. What is the Gray code equivalent of binary $1010$?

<div class="upper-alpha" markdown>
1. 1100
2. 1001
3. 0110
4. 1111
</div>

??? question "Show Answer"
    The correct answer is **D**. Applying the conversion formulas to binary $B_3B_2B_1B_0 = 1010$:

    - $G_3 = B_3 = 1$
    - $G_2 = B_3 \oplus B_2 = 1 \oplus 0 = 1$
    - $G_1 = B_2 \oplus B_1 = 0 \oplus 1 = 1$
    - $G_0 = B_1 \oplus B_0 = 1 \oplus 0 = 1$

    Gray code result: 1111. This can be verified: adjacent binary values 1001 and 1010 should produce Gray codes differing in exactly one bit.

    **Concept Tested:** Binary to Gray Code Converter

---

#### 10. In a magnitude comparator that compares two $n$-bit numbers $A$ and $B$, the comparison proceeds from MSB to LSB. Why does the first bit position where $A$ and $B$ differ determine the entire result?

<div class="upper-alpha" markdown>
1. Because lower-order bits are always zero in properly formatted numbers
2. Because the comparator only examines the MSB
3. Because each higher-order bit has a positional weight greater than the sum of all lower-order bits combined
4. Because the XOR operation is applied from MSB to LSB
</div>

??? question "Show Answer"
    The correct answer is **C**. In a positional number system, bit $i$ has weight $2^i$, and the sum of all lower-order bits is $\sum_{j=0}^{i-1} 2^j = 2^i - 1 < 2^i$. Therefore, if $A_i = 1$ and $B_i = 0$ at the first differing position, then $A > B$ regardless of all lower-order bits—even if all remaining bits of $B$ are 1 and all remaining bits of $A$ are 0. This mathematical property enables the MSB-to-LSB cascading architecture used in magnitude comparators like the 7485.

    **Concept Tested:** Magnitude Comparator

---

## Answers Summary

| Question | Answer | Concept |
|----------|--------|---------|
| 1 | D | Combinational vs Sequential Logic |
| 2 | A | Half Adder |
| 3 | B | Ripple Carry Adder |
| 4 | A | Adder-Subtractor Circuit |
| 5 | D | Parity Generator / Error Detection |
| 6 | C | Gray Code |
| 7 | B | Seven-Segment Decoder / Don't Cares |
| 8 | A | Half Subtractor |
| 9 | D | Binary to Gray Code Converter |
| 10 | C | Magnitude Comparator |
