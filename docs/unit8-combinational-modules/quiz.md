---
title: Unit 8 Quiz - Combinational Logic Modules
description: Test your understanding of multiplexers, decoders, encoders, code converters, and comparator circuits
---

# Quiz: Combinational Logic Modules

Test your understanding of multiplexers, decoders, encoders, priority encoders, code converters, and magnitude comparators with these questions.

---

#### 1. What does each active output of an $n$-to-$2^n$ decoder represent?

<div class="upper-alpha" markdown>
1. One minterm of the $n$ input variables
2. One maxterm of the $n$ input variables
3. The binary-weighted value of the input code
4. The complement of the corresponding input combination
</div>

!!! question "Show Answer"
    The correct answer is **A**. An $n$-to-$2^n$ decoder generates all $2^n$ minterms of its $n$ input variables. For a 3-to-8 decoder with inputs $A_2, A_1, A_0$, output $Y_i$ equals the minterm $m_i$. For example, $Y_5 = A_2 \cdot \overline{A_1} \cdot A_0 = m_5$. This property is what makes decoders so useful for function implementation: any Boolean function expressed as a sum of minterms can be implemented by OR-ing the corresponding decoder outputs.

    **Concept Tested:** Decoder Fundamentals / Minterm Generation

---

#### 2. In a priority encoder with 8 inputs ($D_0$ through $D_7$), inputs $D_3$ and $D_6$ are both active. What does the encoder output?

<div class="upper-alpha" markdown>
1. The binary code 011 (encoding $D_3$)
2. An error signal indicating multiple active inputs
3. The binary code 000 with the valid flag deasserted
4. The binary code 110 (encoding $D_6$), because higher-numbered inputs have higher priority
</div>

!!! question "Show Answer"
    The correct answer is **D**. A priority encoder resolves conflicts when multiple inputs are active by encoding only the highest-priority input. By convention, higher-numbered inputs have higher priority. Since $D_6 > D_3$ in priority, the encoder outputs 110 (binary for 6), and $D_3$ is effectively masked. The valid flag is asserted (1) to indicate that at least one input is active. This behavior is essential for interrupt controllers, where multiple interrupt requests may arrive simultaneously and only the highest-priority request should be serviced first.

    **Concept Tested:** Priority Encoder Operation

---

#### 3. A demultiplexer (DEMUX) and a decoder with an enable input are structurally identical. What determines whether the device functions as a DEMUX or a decoder?

<div class="upper-alpha" markdown>
1. The DEMUX requires more select lines than the decoder for the same number of outputs
2. The decoder's enable input serves as the DEMUX data input; when the enable is held at logic 1, the device acts as a pure decoder
3. The DEMUX uses active-low outputs while the decoder uses active-high outputs
4. They are entirely different circuits that coincidentally share the same pinout
</div>

!!! question "Show Answer"
    The correct answer is **B**. Comparing the DEMUX equation $Y_i = D \cdot m_i$ with the decoder-with-enable equation $Y_i = E \cdot m_i$, the expressions are identical when $D = E$. If the enable input carries a data signal, the device distributes that signal to one of $2^n$ outputs based on the select inputs (DEMUX behavior). If the enable is held at logic 1, all minterms pass through and the device simply decodes the address (decoder behavior). The 74138, for example, is sold as a "3-to-8 decoder/demultiplexer" because it serves both roles.

    **Concept Tested:** Demultiplexer Fundamentals / DEMUX-Decoder Relationship

---

#### 4. The Shannon expansion theorem allows an $n$-variable Boolean function to be implemented with a $2^{n-1}$-to-1 MUX instead of a $2^n$-to-1 MUX. How is this size reduction achieved?

<div class="upper-alpha" markdown>
1. One variable is absorbed into the data inputs, which are connected to 0, 1, the variable, or its complement based on cofactor analysis
2. The function is first minimized using K-maps to reduce the number of variables by one
3. Two MUXes are cascaded, with the eliminated variable controlling the second stage
4. The least significant select bit is removed by treating it as a don't care condition
</div>

!!! question "Show Answer"
    The correct answer is **A**. Shannon expansion expresses $F(X_1, ..., X_n) = \overline{X_n} \cdot F(..., 0) + X_n \cdot F(..., 1)$. Using $n-1$ variables as select lines and reserving one variable for the data inputs, each data input is determined by examining the function's value for both values of the reserved variable. If $F = 0$ for both values, connect to 0. If $F = 1$ for both, connect to 1. If $F$ follows the variable, connect to it; if $F$ follows the complement, connect to $\overline{X_n}$. This technique implements a 3-variable function with a 4:1 MUX instead of an 8:1 MUX.

    **Concept Tested:** Shannon Expansion and MUX / Implementing Functions with MUX

---

#### 5. To implement $F(A, B, C) = \sum m(1, 2, 6, 7)$ using a 4-to-1 MUX with $A$ and $B$ as select lines ($S_1 = A$, $S_0 = B$) and $C$ as the data variable, what are the data input connections?

<div class="upper-alpha" markdown>
1. $D_0 = 0$, $D_1 = 1$, $D_2 = C$, $D_3 = \overline{C}$
2. $D_0 = 1$, $D_1 = 0$, $D_2 = \overline{C}$, $D_3 = C$
3. $D_0 = C$, $D_1 = \overline{C}$, $D_2 = 0$, $D_3 = 1$
4. $D_0 = \overline{C}$, $D_1 = C$, $D_2 = 1$, $D_3 = 0$
</div>

!!! question "Show Answer"
    The correct answer is **C**. Evaluate $F$ for each select combination with $C = 0$ and $C = 1$:

    - $AB = 00$: $F(0,0,0) = 0$, $F(0,0,1) = 1$ → $D_0 = C$
    - $AB = 01$: $F(0,1,0) = 1$, $F(0,1,1) = 0$ → $D_1 = \overline{C}$
    - $AB = 10$: $F(1,0,0) = 0$, $F(1,0,1) = 0$ → $D_2 = 0$
    - $AB = 11$: $F(1,1,0) = 1$, $F(1,1,1) = 1$ → $D_3 = 1$

    The pattern: when $F$ matches $C$, connect $C$; when $F$ is the complement of $C$, connect $\overline{C}$; when $F$ is constant, connect 0 or 1.

    **Concept Tested:** Implementing Functions with Multiplexers (Shannon Expansion)

---

#### 6. Using a 3-to-8 decoder with inputs $A$, $B$, $C$, implement $F(A, B, C) = \sum m(0, 3, 5, 7)$. Which decoder outputs connect to the OR gate?

<div class="upper-alpha" markdown>
1. $Y_0$, $Y_3$, $Y_5$, $Y_7$
2. $Y_1$, $Y_2$, $Y_4$, $Y_6$
3. $Y_0$, $Y_2$, $Y_5$, $Y_6$
4. $Y_1$, $Y_3$, $Y_6$, $Y_7$
</div>

!!! question "Show Answer"
    The correct answer is **A**. Since each decoder output $Y_i$ equals the minterm $m_i$, implementing $F = \sum m(0, 3, 5, 7)$ requires connecting outputs $Y_0$, $Y_3$, $Y_5$, and $Y_7$ to a 4-input OR gate. The function is: $F = Y_0 + Y_3 + Y_5 + Y_7 = m_0 + m_3 + m_5 + m_7$. Option B lists the complement minterms (those NOT in the function), which would implement $\overline{F}$.

    **Concept Tested:** Implementing Functions with Decoders / Minterm Generation

---

#### 7. In a 4-bit binary-to-Gray code converter, the conversion formula is $G_i = B_{i+1} \oplus B_i$ (for bits below the MSB) and $G_3 = B_3$. What is the Gray code equivalent of binary 0110?

<div class="upper-alpha" markdown>
1. 0100
2. 0111
3. 0011
4. 0101
</div>

!!! question "Show Answer"
    The correct answer is **D**. Applying the conversion formulas to binary $B_3B_2B_1B_0 = 0110$:

    - $G_3 = B_3 = 0$
    - $G_2 = B_3 \oplus B_2 = 0 \oplus 1 = 1$
    - $G_1 = B_2 \oplus B_1 = 1 \oplus 1 = 0$
    - $G_0 = B_1 \oplus B_0 = 1 \oplus 0 = 1$

    Gray code result: 0101. The key property of Gray code is that adjacent values differ by exactly one bit, preventing ambiguous readings in rotary encoders and reducing errors in analog-to-digital converters.

    **Concept Tested:** Binary-to-Gray Code Converter

---

#### 8. A designer needs to implement three Boolean functions $F_1$, $F_2$, and $F_3$, all of the same three variables $A$, $B$, $C$. Why is a single 3-to-8 decoder with three OR gates more hardware-efficient than using three separate 4-to-1 MUXes?

<div class="upper-alpha" markdown>
1. Decoders have lower propagation delay than multiplexers in all technologies
2. A single decoder generates all 8 minterms simultaneously and is shared among all three functions; the MUX approach requires a separate MUX for each function
3. Three 4-to-1 MUXes require more select inputs than one decoder
4. The MUX approach cannot implement arbitrary Boolean functions of three variables
</div>

!!! question "Show Answer"
    The correct answer is **B**. A 3-to-8 decoder generates all 8 minterms of $A$, $B$, $C$ simultaneously. Each function simply connects its required minterms to a separate OR gate—sharing the single decoder. With the MUX approach, each function requires its own 4-to-1 MUX (using Shannon expansion), totaling three MUXes. The decoder approach uses 1 decoder + 3 OR gates, while the MUX approach uses 3 MUXes + up to 3 inverters. For multiple functions of the same variables, the shared decoder becomes increasingly efficient.

    **Concept Tested:** Decoder vs MUX for Function Implementation

---

#### 9. When cascading two 4-bit magnitude comparators to form an 8-bit comparator, the upper comparator (bits 7–4) receives cascade inputs from the lower comparator (bits 3–0). How does the upper comparator use these cascade inputs?

<div class="upper-alpha" markdown>
1. The cascade inputs override the upper comparator's own bit-by-bit comparison entirely
2. The cascade inputs are OR-ed with the upper comparator's results to produce the final output
3. The upper comparator checks its own bits first; only when $A_{7..4} = B_{7..4}$ does it pass through the lower comparator's result as the final answer
4. The lower comparator's greater/less/equal outputs are AND-ed with the upper comparator's corresponding outputs
</div>

!!! question "Show Answer"
    The correct answer is **C**. In a cascaded magnitude comparator, the more significant stage has priority. The upper comparator first evaluates its own 4-bit comparison of $A_{7..4}$ vs $B_{7..4}$. If the upper bits differ (one number is clearly greater), the upper comparator's result is the final answer—the cascade inputs from the lower comparator are irrelevant. Only when all upper bits are equal ($A_{7..4} = B_{7..4}$) does the overall result depend on the less significant bits, so the cascade inputs (from the lower comparator) are passed through as the final output. This mirrors the MSB-to-LSB comparison algorithm.

    **Concept Tested:** Cascading Combinational Modules / Magnitude Comparator Design

---

#### 10. A BCD-to-seven-segment decoder must handle 4-bit inputs, but only values 0000–1001 (decimal 0–9) are valid BCD. How should the decoder's logic be designed for the invalid input combinations 1010–1111?

<div class="upper-alpha" markdown>
1. Display a blank (all segments off) for any invalid input to signal an error
2. Display the hexadecimal digits A–F for inputs 1010–1111
3. Add input validation logic to block invalid codes before they reach the decoder
4. Treat invalid inputs as don't care conditions in the K-maps for each segment function, allowing the simplification algorithm to choose output values that minimize the logic
</div>

!!! question "Show Answer"
    The correct answer is **D**. In a properly functioning BCD system, inputs 1010–1111 never occur. Treating these six input combinations as don't cares in the K-map simplification for each of the seven segment functions ($a$ through $g$) gives the minimization algorithm maximum freedom to form larger groups, often resulting in significantly simpler Boolean expressions. For example, the segment $a$ function with don't cares simplifies to $a = A_3 + A_1 + A_2 A_0 + \overline{A_2}\,\overline{A_0}$—simpler than any expression constrained to produce specific outputs for invalid inputs.

    **Concept Tested:** BCD-to-Seven-Segment Decoder / Don't Care Conditions

---

## Answers Summary

| Question | Answer | Concept |
|----------|--------|---------|
| 1 | A | Decoder Fundamentals / Minterm Generation |
| 2 | D | Priority Encoder Operation |
| 3 | B | DEMUX-Decoder Relationship |
| 4 | A | Shannon Expansion and MUX |
| 5 | C | Implementing Functions with MUX |
| 6 | A | Implementing Functions with Decoders |
| 7 | D | Binary-to-Gray Code Converter |
| 8 | B | Decoder vs MUX Comparison |
| 9 | C | Cascading Magnitude Comparators |
| 10 | D | BCD-to-Seven-Segment Decoder |
