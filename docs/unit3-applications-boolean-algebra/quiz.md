---
title: Unit 3 Quiz - Applications of Boolean Algebra
description: Test your understanding of combinational logic, arithmetic circuits, and code converters
hide:
  - toc
---

<div class="problems-styled" markdown>

<h1 style="color: #5A3EED !important; border-bottom: 3px solid #5A3EED; padding-bottom: 0.4rem; font-weight: 800; margin-bottom: 1.5rem;">Quiz: Applications of Boolean Algebra</h1>

<p style="color: #555; line-height: 1.85; font-size: 1.05rem; margin-bottom: 2rem;">
Test your understanding of combinational logic design, arithmetic circuits, comparators, parity circuits, and code converters with these questions.
</p>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 1</p>

<p style="color: #333; line-height: 1.75;">What fundamental property distinguishes combinational circuits from sequential circuits?</p>

<div class="upper-alpha" markdown>
1. Combinational circuits use only NAND gates
2. Sequential circuits operate at higher clock frequencies
3. Sequential circuits cannot use Boolean algebra
4. Combinational circuit outputs depend only on current inputs, with no memory of past states
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: D</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">Combinational logic circuits produce outputs that are a pure function of the current input values—they have no memory elements and no concept of history. Sequential logic circuits incorporate feedback and storage elements (latches, flip-flops), so their outputs depend on both current inputs and the circuit's internal state. This distinction is the most fundamental classification in digital circuit design.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Combinational vs Sequential Logic</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 2</p>

<p style="color: #333; line-height: 1.75;">In a half adder, what are the Boolean expressions for the Sum and Carry outputs?</p>

<div class="upper-alpha" markdown>
1. <span class="arithmatex">\(S = A \oplus B\)</span>, <span class="arithmatex">\(C = A \cdot B\)</span>
2. <span class="arithmatex">\(S = A \cdot B\)</span>, <span class="arithmatex">\(C = A + B\)</span>
3. <span class="arithmatex">\(S = A + B\)</span>, <span class="arithmatex">\(C = A \oplus B\)</span>
4. <span class="arithmatex">\(S = A \cdot B\)</span>, <span class="arithmatex">\(C = A \oplus B\)</span>
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: A</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">The half adder computes the sum and carry of two single-bit inputs. The Sum output is the XOR: <span class="arithmatex">\(S = A \oplus B\)</span> (1 when exactly one input is 1). The Carry output is the AND: <span class="arithmatex">\(C = A \cdot B\)</span> (1 only when both inputs are 1, producing a carry to the next bit position). A half adder has no carry-in input, which limits it to the least-significant bit position in a multi-bit adder.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Half Adder</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 3</p>

<p style="color: #333; line-height: 1.75;">What is the primary performance limitation of a ripple carry adder?</p>

<div class="upper-alpha" markdown>
1. It can only add numbers up to 4 bits wide
2. Carry propagation delay increases linearly with operand width, limiting speed
3. It requires more gates than any other adder architecture
4. It cannot handle signed (two's complement) numbers
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: B</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">In a ripple carry adder, each full adder stage must wait for the carry output of the previous stage before computing its result. For an <span class="arithmatex">\(n\)</span>-bit adder, the worst-case delay is <span class="arithmatex">\(n\)</span> sequential carry propagations (e.g., adding <span class="arithmatex">\(0111...1 + 0000...1\)</span>). This makes the total delay <span class="arithmatex">\(O(n)\)</span>, which is unacceptable for wide datapaths. Carry-lookahead adders reduce this to <span class="arithmatex">\(O(\log n)\)</span> by computing carries in parallel.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Ripple Carry Adder</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 4</p>

<p style="color: #333; line-height: 1.75;">How does an adder-subtractor circuit compute <span class="arithmatex">\(A - B\)</span> using an adder?</p>

<div class="upper-alpha" markdown>
1. It computes <span class="arithmatex">\(A + \overline{B} + 1\)</span> by XORing each bit of <span class="arithmatex">\(B\)</span> with the mode signal and setting carry-in to 1
2. It swaps the <span class="arithmatex">\(A\)</span> and <span class="arithmatex">\(B\)</span> inputs to the adder
3. It uses a separate subtractor unit alongside the adder
4. It negates the adder's final output
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: A</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">The adder-subtractor circuit uses a mode signal <span class="arithmatex">\(M\)</span> that controls XOR gates on each bit of <span class="arithmatex">\(B\)</span>. When <span class="arithmatex">\(M = 1\)</span> (subtract mode), each <span class="arithmatex">\(B_i\)</span> is XORed with 1, complementing it to <span class="arithmatex">\(\overline{B_i}\)</span>. The mode signal also feeds the carry-in, adding 1. This computes <span class="arithmatex">\(A + \overline{B} + 1 = A + (-B) = A - B\)</span> using two's complement arithmetic. When <span class="arithmatex">\(M = 0\)</span>, <span class="arithmatex">\(B\)</span> passes through unchanged and carry-in is 0, performing normal addition.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Adder-Subtractor Circuit</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 5</p>

<p style="color: #333; line-height: 1.75;">What is the primary purpose of a parity generator in a digital communication system?</p>

<div class="upper-alpha" markdown>
1. To multiply binary numbers before transmission
2. To convert between number bases during data transfer
3. To compare two binary numbers for equality
4. To create a check bit that enables detection of single-bit transmission errors
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: D</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">A parity generator creates a parity bit such that the total number of 1s in the data word plus the parity bit is always even (even parity) or always odd (odd parity). The receiver uses a parity checker—an XOR tree—to verify that the received word has correct parity. If a single bit flips during transmission, the parity check fails, flagging the error. The parity generator itself is implemented as a cascade of XOR gates.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Parity Generator / Error Detection</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 6</p>

<p style="color: #333; line-height: 1.75;">What is the defining property of Gray code that makes it valuable in position encoders?</p>

<div class="upper-alpha" markdown>
1. Each digit represents a power of 10
2. All code words have an equal number of 1s and 0s
3. Adjacent code words differ in exactly one bit position
4. The code uses hexadecimal digits
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: C</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">In Gray code, consecutive values differ in exactly one bit position. This single-bit-change property prevents ambiguous readings in rotary and linear position encoders: during a transition, only one sensor changes state, so the encoder never produces an incorrect intermediate value. In contrast, standard binary code can have multiple bits changing simultaneously (e.g., <span class="arithmatex">\(011 \rightarrow 100\)</span> changes all three bits), creating transient erroneous readings.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Gray Code</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 7</p>

<p style="color: #333; line-height: 1.75;">In a BCD-to-seven-segment decoder, the 4-bit input combinations 1010 through 1111 never occur in normal operation. How should these be handled in the design?</p>

<div class="upper-alpha" markdown>
1. Display a blank (all segments off) for all invalid inputs
2. Treat them as don't care conditions to simplify the segment logic
3. Display hexadecimal digits A through F
4. Add input validation logic to reject invalid codes
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: B</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">In a properly functioning BCD system, inputs 1010-1111 never occur, so these six combinations can be treated as don't care conditions in the K-maps for each segment function. This gives the minimization algorithm maximum freedom to form larger groups, often producing significantly simpler Boolean expressions. For example, the segment <span class="arithmatex">\(a\)</span> function with don't cares may simplify from a 4-term expression to a 3-term expression, reducing gate count.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Seven-Segment Decoder / Don't Care Conditions</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 8</p>

<p style="color: #333; line-height: 1.75;">What is the Boolean expression for the Borrow output of a half subtractor?</p>

<div class="upper-alpha" markdown>
1. <span class="arithmatex">\(B_{out} = \overline{A} \cdot B\)</span>
2. <span class="arithmatex">\(B_{out} = A \cdot B\)</span>
3. <span class="arithmatex">\(B_{out} = A \oplus B\)</span>
4. <span class="arithmatex">\(B_{out} = A + B\)</span>
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: A</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">The half subtractor computes <span class="arithmatex">\(A - B\)</span>, producing a Difference output <span class="arithmatex">\(D = A \oplus B\)</span> and a Borrow output <span class="arithmatex">\(B_{out} = \overline{A} \cdot B\)</span>. A borrow is needed when subtracting a 1 (<span class="arithmatex">\(B = 1\)</span>) from a 0 (<span class="arithmatex">\(A = 0\)</span>)—the only case where <span class="arithmatex">\(\overline{A} \cdot B = 1\)</span>. This differs from the half adder's Carry output (<span class="arithmatex">\(C = A \cdot B\)</span>), where <span class="arithmatex">\(A\)</span> is not complemented.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Half Subtractor</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 9</p>

<p style="color: #333; line-height: 1.75;">To convert from binary to Gray code, the formula <span class="arithmatex">\(G_i = B_{i+1} \oplus B_i\)</span> is applied to each pair of adjacent binary bits, while the MSB is copied directly. What is the Gray code equivalent of binary <span class="arithmatex">\(1010\)</span>?</p>

<div class="upper-alpha" markdown>
1. 1100
2. 1001
3. 0110
4. 1111
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: D</p>
<p style="color: #333; line-height: 1.75;">Applying the conversion formulas to binary <span class="arithmatex">\(B_3B_2B_1B_0 = 1010\)</span>:</p>
<p style="color: #333; line-height: 1.75;"><span class="arithmatex">\(G_3 = B_3 = 1\)</span><br>
<span class="arithmatex">\(G_2 = B_3 \oplus B_2 = 1 \oplus 0 = 1\)</span><br>
<span class="arithmatex">\(G_1 = B_2 \oplus B_1 = 0 \oplus 1 = 1\)</span><br>
<span class="arithmatex">\(G_0 = B_1 \oplus B_0 = 1 \oplus 0 = 1\)</span></p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">Gray code result: 1111. This can be verified: adjacent binary values 1001 and 1010 should produce Gray codes differing in exactly one bit.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Binary to Gray Code Converter</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 10</p>

<p style="color: #333; line-height: 1.75;">In a magnitude comparator that compares two <span class="arithmatex">\(n\)</span>-bit numbers <span class="arithmatex">\(A\)</span> and <span class="arithmatex">\(B\)</span>, the comparison proceeds from MSB to LSB. Why does the first bit position where <span class="arithmatex">\(A\)</span> and <span class="arithmatex">\(B\)</span> differ determine the entire result?</p>

<div class="upper-alpha" markdown>
1. Because lower-order bits are always zero in properly formatted numbers
2. Because the comparator only examines the MSB
3. Because each higher-order bit has a positional weight greater than the sum of all lower-order bits combined
4. Because the XOR operation is applied from MSB to LSB
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: C</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">In a positional number system, bit <span class="arithmatex">\(i\)</span> has weight <span class="arithmatex">\(2^i\)</span>, and the sum of all lower-order bits is <span class="arithmatex">\(\sum_{j=0}^{i-1} 2^j = 2^i - 1 < 2^i\)</span>. Therefore, if <span class="arithmatex">\(A_i = 1\)</span> and <span class="arithmatex">\(B_i = 0\)</span> at the first differing position, then <span class="arithmatex">\(A > B\)</span> regardless of all lower-order bits—even if all remaining bits of <span class="arithmatex">\(B\)</span> are 1 and all remaining bits of <span class="arithmatex">\(A\)</span> are 0. This mathematical property enables the MSB-to-LSB cascading architecture used in magnitude comparators like the 7485.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Magnitude Comparator</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Answers Summary</p>

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

</div>

</div>
