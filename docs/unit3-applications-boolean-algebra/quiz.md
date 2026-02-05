---
title: Unit 3 Quiz - Applications of Boolean Algebra
description: Test your understanding of combinational logic, arithmetic circuits, and code converters
---

# Quiz: Applications of Boolean Algebra

Test your understanding of combinational logic design, arithmetic circuits, comparators, parity circuits, and code converters with these questions.

---

#### 1. What is the key difference between combinational and sequential logic?

<div class="upper-alpha" markdown>
1. Combinational logic uses only NAND gates
2. Sequential logic has no outputs
3. Combinational logic outputs depend only on current inputs
4. Sequential logic cannot use Boolean algebra
</div>

??? question "Show Answer"
    The correct answer is **C**. Combinational logic circuits produce outputs that depend solely on current input values with no memory of past states. Sequential logic circuits have memory elements and outputs depend on both current inputs and the circuit's previous state (history).

    **Concept Tested:** Combinational Logic

---

#### 2. In a half adder, what Boolean expression represents the Sum output?

<div class="upper-alpha" markdown>
1. $A \cdot B$
2. $A + B$
3. $A \oplus B$
4. $\overline{A} \cdot B$
</div>

??? question "Show Answer"
    The correct answer is **C**. The Sum output of a half adder is the XOR of the two inputs: $S = A \oplus B$. The Carry output is $C = A \cdot B$. The sum is 1 when exactly one input is 1, which matches XOR behavior.

    **Concept Tested:** Half Adder

---

#### 3. What is the primary limitation of a ripple carry adder?

<div class="upper-alpha" markdown>
1. It can only add 4-bit numbers
2. It requires too many gates
3. Carry propagation causes delays for wide operands
4. It cannot handle negative numbers
</div>

??? question "Show Answer"
    The correct answer is **C**. In a ripple carry adder, each stage must wait for the previous carry to propagate before computing its result. For an n-bit addition, n sequential carry propagations are required, making it slow for wide operands. This is why faster adder designs like carry-lookahead exist.

    **Concept Tested:** Ripple Carry Adder

---

#### 4. How does an adder-subtractor circuit perform $A - B$ using an adder?

<div class="upper-alpha" markdown>
1. By swapping A and B inputs
2. By computing $A + \overline{B} + 1$ (two's complement)
3. By using a separate subtractor unit
4. By negating the final result
</div>

??? question "Show Answer"
    The correct answer is **B**. The adder-subtractor circuit XORs each bit of B with the mode signal M. When M=1 (subtract), B is complemented, and M is also fed to the carry-in, effectively adding 1. This computes $A - B = A + \overline{B} + 1$, which is two's complement subtraction.

    **Concept Tested:** Adder Subtractor Circuit

---

#### 5. What is the function of a parity generator?

<div class="upper-alpha" markdown>
1. To multiply binary numbers
2. To create a check bit for error detection
3. To convert between number bases
4. To compare two binary numbers
</div>

??? question "Show Answer"
    The correct answer is **B**. A parity generator creates a parity bit that, when included with the data, makes the total count of 1s either even (even parity) or odd (odd parity). This check bit enables detection of single-bit transmission errors during data communication.

    **Concept Tested:** Parity Generator

---

#### 6. What is the characteristic property of Gray code?

<div class="upper-alpha" markdown>
1. Each digit represents a power of 10
2. Adjacent values differ in exactly one bit
3. It uses hexadecimal digits
4. All values have equal numbers of 1s
</div>

??? question "Show Answer"
    The correct answer is **B**. In Gray code, adjacent values differ in exactly one bit position. This property is valuable for position encoders (preventing ambiguous readings between positions) and Karnaugh maps (ensuring logical adjacency matches physical adjacency).

    **Concept Tested:** Gray Code

---

#### 7. In a seven-segment display decoder, what are BCD inputs 1010-1111 typically treated as?

<div class="upper-alpha" markdown>
1. Error codes that shut down the display
2. Hexadecimal digits A-F
3. Don't care conditions
4. Negative numbers
</div>

??? question "Show Answer"
    The correct answer is **C**. BCD (Binary Coded Decimal) only uses input combinations 0000-1001 (decimal 0-9). Inputs 1010-1111 (10-15) are invalid BCD and never occur in a properly designed system, so they are treated as don't care conditions, enabling simpler decoder implementations.

    **Concept Tested:** Seven Segment Decoder, Incompletely Specified Function

---

#### 8. What is the Boolean expression for the Borrow output of a half subtractor?

<div class="upper-alpha" markdown>
1. $A \cdot B$
2. $\overline{A} \cdot B$
3. $A \oplus B$
4. $A + B$
</div>

??? question "Show Answer"
    The correct answer is **B**. The Borrow output of a half subtractor is $B_{out} = \overline{A} \cdot B$. A borrow is needed when subtracting a larger bit (B=1) from a smaller bit (A=0). This differs from the Carry output of a half adder, which is $C = A \cdot B$.

    **Concept Tested:** Half Subtractor, Borrow Bit

---

#### 9. For converting binary to Gray code, what operation is performed between adjacent binary bits?

<div class="upper-alpha" markdown>
1. AND
2. OR
3. XOR
4. NAND
</div>

??? question "Show Answer"
    The correct answer is **C**. Binary to Gray conversion uses XOR: $G_i = B_{i+1} \oplus B_i$ for all bits except the MSB (which is unchanged: $G_n = B_n$). Each Gray code bit is the XOR of adjacent binary bits.

    **Concept Tested:** Binary to Gray Converter

---

#### 10. In a magnitude comparator, what determines if A > B when comparing multi-bit numbers?

<div class="upper-alpha" markdown>
1. The sum of all bits in A exceeds the sum in B
2. Comparison proceeds from MSB to LSB, with the first difference determining the result
3. The parity of A is greater than the parity of B
4. A has more 1s in odd positions than B
</div>

??? question "Show Answer"
    The correct answer is **B**. A magnitude comparator compares from the most significant bit to the least significant bit. The first bit position where A and B differ determines the result: if $A_i > B_i$ at the first differing position, then $A > B$ regardless of lower-order bits.

    **Concept Tested:** Magnitude Comparator

