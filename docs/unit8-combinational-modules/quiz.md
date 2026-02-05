---
title: Unit 8 Quiz - Combinational Logic Modules
description: Test your understanding of multiplexers, decoders, encoders, and other MSI modules
---

# Quiz: Combinational Logic Modules

Test your understanding of multiplexers, demultiplexers, decoders, encoders, and code converters with these questions.

---

#### 1. What is the function of a multiplexer (MUX)?

<div class="upper-alpha" markdown>
1. It combines multiple signals into one signal
2. It selects one of several inputs and forwards it to a single output
3. It splits one input into multiple outputs
4. It encodes binary data into decimal
</div>

??? question "Show Answer"
    The correct answer is **B**. A multiplexer is a data selector that uses select signals to choose one of multiple input signals and route it to a single output. It acts like a digitally-controlled multi-way switch.

    **Concept Tested:** Multiplexer (MUX) Fundamentals

---

#### 2. How many select lines does an 8-to-1 multiplexer require?

<div class="upper-alpha" markdown>
1. 2
2. 3
3. 4
4. 8
</div>

??? question "Show Answer"
    The correct answer is **B**. An 8-to-1 MUX has 8 data inputs, requiring $\log_2(8) = 3$ select lines to uniquely address each input. In general, a $2^n$-to-1 MUX requires $n$ select lines.

    **Concept Tested:** 8-to-1 and Larger Multiplexers

---

#### 3. To implement a 3-variable Boolean function using the MUX method with Shannon expansion, what size MUX is typically used?

<div class="upper-alpha" markdown>
1. 2-to-1 MUX
2. 4-to-1 MUX
3. 8-to-1 MUX
4. 16-to-1 MUX
</div>

??? question "Show Answer"
    The correct answer is **B**. Using Shannon expansion, an $n$-variable function can be implemented with a $2^{n-1}$-to-1 MUX by connecting one variable to the data inputs. For a 3-variable function, this means a $2^2 = 4$-to-1 MUX.

    **Concept Tested:** Implementing Functions with MUX

---

#### 4. What is the relationship between a demultiplexer and a decoder?

<div class="upper-alpha" markdown>
1. They are completely unrelated circuits
2. A demultiplexer with data input at 1 functions as a decoder
3. A decoder is faster than a demultiplexer
4. A demultiplexer has more outputs than a decoder
</div>

??? question "Show Answer"
    The correct answer is **B**. A demultiplexer with its data input held at logic 1 produces a one-hot output pattern based on select inputs, which is exactly what a decoder does. Similarly, a decoder with an enable input can function as a demultiplexer.

    **Concept Tested:** Demultiplexer (DEMUX) Fundamentals

---

#### 5. What type of encoding does a decoder produce?

<div class="upper-alpha" markdown>
1. Binary encoding
2. Gray code encoding
3. One-hot encoding
4. BCD encoding
</div>

??? question "Show Answer"
    The correct answer is **C**. A decoder converts an $n$-bit binary input into $2^n$ outputs where exactly one output is active (high) at any time. This is called one-hot encoding because only one bit is "hot" (active) at a time.

    **Concept Tested:** Decoder Fundamentals

---

#### 6. How can you implement F(A,B,C) = Σm(0,2,5,7) using a 3-to-8 decoder?

<div class="upper-alpha" markdown>
1. Connect outputs Y0, Y2, Y5, Y7 to an AND gate
2. Connect outputs Y0, Y2, Y5, Y7 to an OR gate
3. Connect outputs Y1, Y3, Y4, Y6 to an OR gate
4. Use the enable input to select minterms
</div>

??? question "Show Answer"
    The correct answer is **B**. Since a decoder generates all minterms, implementing a function is simply OR-ing the minterm outputs that appear in the function's minterm expansion. For F = Σm(0,2,5,7), connect Y0, Y2, Y5, and Y7 to an OR gate.

    **Concept Tested:** Implementing Functions with Decoders

---

#### 7. What problem does a priority encoder solve that a basic encoder cannot handle?

<div class="upper-alpha" markdown>
1. Converting binary to decimal
2. Handling cases when multiple inputs are active simultaneously
3. Generating parity bits
4. Increasing the number of outputs
</div>

??? question "Show Answer"
    The correct answer is **B**. A basic encoder assumes only one input is active at a time. A priority encoder handles multiple active inputs by encoding only the highest-priority (typically highest-numbered) active input, producing a valid output even when multiple requests arrive simultaneously.

    **Concept Tested:** Priority Encoder Operation

---

#### 8. In Gray code, what is special about adjacent code words?

<div class="upper-alpha" markdown>
1. They are always even numbers
2. They differ by exactly one bit
3. They differ by exactly two bits
4. They are complements of each other
</div>

??? question "Show Answer"
    The correct answer is **B**. Gray code is designed so that consecutive values differ by exactly one bit. This property reduces errors during transitions in applications like rotary encoders and analog-to-digital converters.

    **Concept Tested:** Binary-to-Gray Code Converter

---

#### 9. What Boolean operation is used to convert binary to Gray code?

<div class="upper-alpha" markdown>
1. AND between adjacent bits
2. OR between adjacent bits
3. XOR between adjacent bits
4. NAND between adjacent bits
</div>

??? question "Show Answer"
    The correct answer is **C**. Binary-to-Gray conversion uses XOR: $G_i = B_{i+1} \oplus B_i$ (with the MSB staying the same: $G_{n-1} = B_{n-1}$). XOR detects when adjacent bits differ, which is exactly what's needed for Gray code.

    **Concept Tested:** Binary-to-Gray Code Converter

---

#### 10. How many segments are controlled by a seven-segment decoder?

<div class="upper-alpha" markdown>
1. 4
2. 7
3. 8
4. 10
</div>

??? question "Show Answer"
    The correct answer is **B**. A seven-segment decoder has 7 outputs (labeled a through g) that control the 7 segments of a seven-segment display. Some decoders also include a decimal point output, but the standard display has 7 segments.

    **Concept Tested:** BCD-to-Seven-Segment Decoder

---

#### 11. For a 4-bit magnitude comparator, how many primary outputs are there?

<div class="upper-alpha" markdown>
1. 1 (equal or not equal)
2. 2 (greater than, less than)
3. 3 (greater than, equal, less than)
4. 4 (one for each bit)
</div>

??? question "Show Answer"
    The correct answer is **C**. A magnitude comparator produces three outputs indicating the three possible relationships between the two input numbers: A > B, A = B, and A < B. Note that only one of these can be true at any time.

    **Concept Tested:** Magnitude Comparator Design

---

#### 12. What is the purpose of enable inputs on decoders?

<div class="upper-alpha" markdown>
1. To increase speed
2. To reduce power consumption only
3. To allow cascading for larger decoders and demultiplexer operation
4. To generate Gray code outputs
</div>

??? question "Show Answer"
    The correct answer is **C**. Enable inputs serve multiple purposes: they allow cascading multiple decoders to create larger decoders (e.g., two 3-to-8 decoders forming a 4-to-16 decoder), they enable demultiplexer operation when used as a data input, and they can reduce power by disabling unused sections.

    **Concept Tested:** Decoder Enable Inputs

---

## Answers Summary

| Question | Answer | Concept |
|----------|--------|---------|
| 1 | B | Multiplexer Fundamentals |
| 2 | B | Larger Multiplexers |
| 3 | B | Functions with MUX |
| 4 | B | DEMUX-Decoder Relationship |
| 5 | C | Decoder Fundamentals |
| 6 | B | Functions with Decoders |
| 7 | B | Priority Encoder |
| 8 | B | Gray Code |
| 9 | C | Binary-to-Gray Conversion |
| 10 | B | Seven-Segment Decoder |
| 11 | C | Magnitude Comparator |
| 12 | C | Decoder Enable Inputs |
