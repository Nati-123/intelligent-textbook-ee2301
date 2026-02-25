---
title: Unit 8 Quiz - Combinational Logic Modules
description: Test your understanding of multiplexers, decoders, encoders, code converters, and comparator circuits
hide:
  - toc
---

<div class="problems-styled" markdown>

<h1 style="color: #5A3EED !important; border-bottom: 3px solid #5A3EED; padding-bottom: 0.4rem; font-weight: 800; margin-bottom: 1.5rem;">Quiz: Combinational Logic Modules</h1>

<p style="color: #555; line-height: 1.85; font-size: 1.05rem; margin-bottom: 2rem;">
Test your understanding of multiplexers, decoders, encoders, priority encoders, code converters, and magnitude comparators with these questions.
</p>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 1</p>

<p style="color: #333; line-height: 1.75;">What does each active output of an <span class="arithmatex">\(n\)</span>-to-<span class="arithmatex">\(2^n\)</span> decoder represent?</p>

<div class="upper-alpha" markdown>
1. One minterm of the <span class="arithmatex">\(n\)</span> input variables
2. One maxterm of the <span class="arithmatex">\(n\)</span> input variables
3. The binary-weighted value of the input code
4. The complement of the corresponding input combination
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: A</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">An <span class="arithmatex">\(n\)</span>-to-<span class="arithmatex">\(2^n\)</span> decoder generates all <span class="arithmatex">\(2^n\)</span> minterms of its <span class="arithmatex">\(n\)</span> input variables. For a 3-to-8 decoder with inputs <span class="arithmatex">\(A_2, A_1, A_0\)</span>, output <span class="arithmatex">\(Y_i\)</span> equals the minterm <span class="arithmatex">\(m_i\)</span>. For example, <span class="arithmatex">\(Y_5 = A_2 \cdot \overline{A_1} \cdot A_0 = m_5\)</span>. This property is what makes decoders so useful for function implementation: any Boolean function expressed as a sum of minterms can be implemented by OR-ing the corresponding decoder outputs.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Decoder Fundamentals / Minterm Generation</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 2</p>

<p style="color: #333; line-height: 1.75;">In a priority encoder with 8 inputs (<span class="arithmatex">\(D_0\)</span> through <span class="arithmatex">\(D_7\)</span>), inputs <span class="arithmatex">\(D_3\)</span> and <span class="arithmatex">\(D_6\)</span> are both active. What does the encoder output?</p>

<div class="upper-alpha" markdown>
1. The binary code 011 (encoding <span class="arithmatex">\(D_3\)</span>)
2. An error signal indicating multiple active inputs
3. The binary code 000 with the valid flag deasserted
4. The binary code 110 (encoding <span class="arithmatex">\(D_6\)</span>), because higher-numbered inputs have higher priority
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: D</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">A priority encoder resolves conflicts when multiple inputs are active by encoding only the highest-priority input. By convention, higher-numbered inputs have higher priority. Since <span class="arithmatex">\(D_6 > D_3\)</span> in priority, the encoder outputs 110 (binary for 6), and <span class="arithmatex">\(D_3\)</span> is effectively masked. The valid flag is asserted (1) to indicate that at least one input is active. This behavior is essential for interrupt controllers, where multiple interrupt requests may arrive simultaneously and only the highest-priority request should be serviced first.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Priority Encoder Operation</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 3</p>

<p style="color: #333; line-height: 1.75;">A demultiplexer (DEMUX) and a decoder with an enable input are structurally identical. What determines whether the device functions as a DEMUX or a decoder?</p>

<div class="upper-alpha" markdown>
1. The DEMUX requires more select lines than the decoder for the same number of outputs
2. The decoder's enable input serves as the DEMUX data input; when the enable is held at logic 1, the device acts as a pure decoder
3. The DEMUX uses active-low outputs while the decoder uses active-high outputs
4. They are entirely different circuits that coincidentally share the same pinout
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: B</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">Comparing the DEMUX equation <span class="arithmatex">\(Y_i = D \cdot m_i\)</span> with the decoder-with-enable equation <span class="arithmatex">\(Y_i = E \cdot m_i\)</span>, the expressions are identical when <span class="arithmatex">\(D = E\)</span>. If the enable input carries a data signal, the device distributes that signal to one of <span class="arithmatex">\(2^n\)</span> outputs based on the select inputs (DEMUX behavior). If the enable is held at logic 1, all minterms pass through and the device simply decodes the address (decoder behavior). The 74138, for example, is sold as a "3-to-8 decoder/demultiplexer" because it serves both roles.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Demultiplexer Fundamentals / DEMUX-Decoder Relationship</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 4</p>

<p style="color: #333; line-height: 1.75;">The Shannon expansion theorem allows an <span class="arithmatex">\(n\)</span>-variable Boolean function to be implemented with a <span class="arithmatex">\(2^{n-1}\)</span>-to-1 MUX instead of a <span class="arithmatex">\(2^n\)</span>-to-1 MUX. How is this size reduction achieved?</p>

<div class="upper-alpha" markdown>
1. One variable is absorbed into the data inputs, which are connected to 0, 1, the variable, or its complement based on cofactor analysis
2. The function is first minimized using K-maps to reduce the number of variables by one
3. Two MUXes are cascaded, with the eliminated variable controlling the second stage
4. The least significant select bit is removed by treating it as a don't care condition
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: A</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">Shannon expansion expresses <span class="arithmatex">\(F(X_1, ..., X_n) = \overline{X_n} \cdot F(..., 0) + X_n \cdot F(..., 1)\)</span>. Using <span class="arithmatex">\(n-1\)</span> variables as select lines and reserving one variable for the data inputs, each data input is determined by examining the function's value for both values of the reserved variable. If <span class="arithmatex">\(F = 0\)</span> for both values, connect to 0. If <span class="arithmatex">\(F = 1\)</span> for both, connect to 1. If <span class="arithmatex">\(F\)</span> follows the variable, connect to it; if <span class="arithmatex">\(F\)</span> follows the complement, connect to <span class="arithmatex">\(\overline{X_n}\)</span>. This technique implements a 3-variable function with a 4:1 MUX instead of an 8:1 MUX.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Shannon Expansion and MUX / Implementing Functions with MUX</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 5</p>

<p style="color: #333; line-height: 1.75;">To implement <span class="arithmatex">\(F(A, B, C) = \sum m(1, 2, 6, 7)\)</span> using a 4-to-1 MUX with <span class="arithmatex">\(A\)</span> and <span class="arithmatex">\(B\)</span> as select lines (<span class="arithmatex">\(S_1 = A\)</span>, <span class="arithmatex">\(S_0 = B\)</span>) and <span class="arithmatex">\(C\)</span> as the data variable, what are the data input connections?</p>

<div class="upper-alpha" markdown>
1. <span class="arithmatex">\(D_0 = 0\)</span>, <span class="arithmatex">\(D_1 = 1\)</span>, <span class="arithmatex">\(D_2 = C\)</span>, <span class="arithmatex">\(D_3 = \overline{C}\)</span>
2. <span class="arithmatex">\(D_0 = 1\)</span>, <span class="arithmatex">\(D_1 = 0\)</span>, <span class="arithmatex">\(D_2 = \overline{C}\)</span>, <span class="arithmatex">\(D_3 = C\)</span>
3. <span class="arithmatex">\(D_0 = C\)</span>, <span class="arithmatex">\(D_1 = \overline{C}\)</span>, <span class="arithmatex">\(D_2 = 0\)</span>, <span class="arithmatex">\(D_3 = 1\)</span>
4. <span class="arithmatex">\(D_0 = \overline{C}\)</span>, <span class="arithmatex">\(D_1 = C\)</span>, <span class="arithmatex">\(D_2 = 1\)</span>, <span class="arithmatex">\(D_3 = 0\)</span>
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: C</p>
<p style="color: #333; line-height: 1.75;">Evaluate <span class="arithmatex">\(F\)</span> for each select combination with <span class="arithmatex">\(C = 0\)</span> and <span class="arithmatex">\(C = 1\)</span>:</p>
<p style="color: #333; line-height: 1.75;"><span class="arithmatex">\(AB = 00\)</span>: <span class="arithmatex">\(F(0,0,0) = 0\)</span>, <span class="arithmatex">\(F(0,0,1) = 1\)</span> &rarr; <span class="arithmatex">\(D_0 = C\)</span><br>
<span class="arithmatex">\(AB = 01\)</span>: <span class="arithmatex">\(F(0,1,0) = 1\)</span>, <span class="arithmatex">\(F(0,1,1) = 0\)</span> &rarr; <span class="arithmatex">\(D_1 = \overline{C}\)</span><br>
<span class="arithmatex">\(AB = 10\)</span>: <span class="arithmatex">\(F(1,0,0) = 0\)</span>, <span class="arithmatex">\(F(1,0,1) = 0\)</span> &rarr; <span class="arithmatex">\(D_2 = 0\)</span><br>
<span class="arithmatex">\(AB = 11\)</span>: <span class="arithmatex">\(F(1,1,0) = 1\)</span>, <span class="arithmatex">\(F(1,1,1) = 1\)</span> &rarr; <span class="arithmatex">\(D_3 = 1\)</span></p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">The pattern: when <span class="arithmatex">\(F\)</span> matches <span class="arithmatex">\(C\)</span>, connect <span class="arithmatex">\(C\)</span>; when <span class="arithmatex">\(F\)</span> is the complement of <span class="arithmatex">\(C\)</span>, connect <span class="arithmatex">\(\overline{C}\)</span>; when <span class="arithmatex">\(F\)</span> is constant, connect 0 or 1.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Implementing Functions with Multiplexers (Shannon Expansion)</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 6</p>

<p style="color: #333; line-height: 1.75;">Using a 3-to-8 decoder with inputs <span class="arithmatex">\(A\)</span>, <span class="arithmatex">\(B\)</span>, <span class="arithmatex">\(C\)</span>, implement <span class="arithmatex">\(F(A, B, C) = \sum m(0, 3, 5, 7)\)</span>. Which decoder outputs connect to the OR gate?</p>

<div class="upper-alpha" markdown>
1. <span class="arithmatex">\(Y_0\)</span>, <span class="arithmatex">\(Y_3\)</span>, <span class="arithmatex">\(Y_5\)</span>, <span class="arithmatex">\(Y_7\)</span>
2. <span class="arithmatex">\(Y_1\)</span>, <span class="arithmatex">\(Y_2\)</span>, <span class="arithmatex">\(Y_4\)</span>, <span class="arithmatex">\(Y_6\)</span>
3. <span class="arithmatex">\(Y_0\)</span>, <span class="arithmatex">\(Y_2\)</span>, <span class="arithmatex">\(Y_5\)</span>, <span class="arithmatex">\(Y_6\)</span>
4. <span class="arithmatex">\(Y_1\)</span>, <span class="arithmatex">\(Y_3\)</span>, <span class="arithmatex">\(Y_6\)</span>, <span class="arithmatex">\(Y_7\)</span>
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: A</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">Since each decoder output <span class="arithmatex">\(Y_i\)</span> equals the minterm <span class="arithmatex">\(m_i\)</span>, implementing <span class="arithmatex">\(F = \sum m(0, 3, 5, 7)\)</span> requires connecting outputs <span class="arithmatex">\(Y_0\)</span>, <span class="arithmatex">\(Y_3\)</span>, <span class="arithmatex">\(Y_5\)</span>, and <span class="arithmatex">\(Y_7\)</span> to a 4-input OR gate. The function is: <span class="arithmatex">\(F = Y_0 + Y_3 + Y_5 + Y_7 = m_0 + m_3 + m_5 + m_7\)</span>. Option B lists the complement minterms (those NOT in the function), which would implement <span class="arithmatex">\(\overline{F}\)</span>.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Implementing Functions with Decoders / Minterm Generation</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 7</p>

<p style="color: #333; line-height: 1.75;">In a 4-bit binary-to-Gray code converter, the conversion formula is <span class="arithmatex">\(G_i = B_{i+1} \oplus B_i\)</span> (for bits below the MSB) and <span class="arithmatex">\(G_3 = B_3\)</span>. What is the Gray code equivalent of binary 0110?</p>

<div class="upper-alpha" markdown>
1. 0100
2. 0111
3. 0011
4. 0101
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: D</p>
<p style="color: #333; line-height: 1.75;">Applying the conversion formulas to binary <span class="arithmatex">\(B_3B_2B_1B_0 = 0110\)</span>:</p>
<p style="color: #333; line-height: 1.75;"><span class="arithmatex">\(G_3 = B_3 = 0\)</span><br>
<span class="arithmatex">\(G_2 = B_3 \oplus B_2 = 0 \oplus 1 = 1\)</span><br>
<span class="arithmatex">\(G_1 = B_2 \oplus B_1 = 1 \oplus 1 = 0\)</span><br>
<span class="arithmatex">\(G_0 = B_1 \oplus B_0 = 1 \oplus 0 = 1\)</span></p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">Gray code result: 0101. The key property of Gray code is that adjacent values differ by exactly one bit, preventing ambiguous readings in rotary encoders and reducing errors in analog-to-digital converters.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Binary-to-Gray Code Converter</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 8</p>

<p style="color: #333; line-height: 1.75;">A designer needs to implement three Boolean functions <span class="arithmatex">\(F_1\)</span>, <span class="arithmatex">\(F_2\)</span>, and <span class="arithmatex">\(F_3\)</span>, all of the same three variables <span class="arithmatex">\(A\)</span>, <span class="arithmatex">\(B\)</span>, <span class="arithmatex">\(C\)</span>. Why is a single 3-to-8 decoder with three OR gates more hardware-efficient than using three separate 4-to-1 MUXes?</p>

<div class="upper-alpha" markdown>
1. Decoders have lower propagation delay than multiplexers in all technologies
2. A single decoder generates all 8 minterms simultaneously and is shared among all three functions; the MUX approach requires a separate MUX for each function
3. Three 4-to-1 MUXes require more select inputs than one decoder
4. The MUX approach cannot implement arbitrary Boolean functions of three variables
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: B</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">A 3-to-8 decoder generates all 8 minterms of <span class="arithmatex">\(A\)</span>, <span class="arithmatex">\(B\)</span>, <span class="arithmatex">\(C\)</span> simultaneously. Each function simply connects its required minterms to a separate OR gate—sharing the single decoder. With the MUX approach, each function requires its own 4-to-1 MUX (using Shannon expansion), totaling three MUXes. The decoder approach uses 1 decoder + 3 OR gates, while the MUX approach uses 3 MUXes + up to 3 inverters. For multiple functions of the same variables, the shared decoder becomes increasingly efficient.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Decoder vs MUX for Function Implementation</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 9</p>

<p style="color: #333; line-height: 1.75;">When cascading two 4-bit magnitude comparators to form an 8-bit comparator, the upper comparator (bits 7–4) receives cascade inputs from the lower comparator (bits 3–0). How does the upper comparator use these cascade inputs?</p>

<div class="upper-alpha" markdown>
1. The cascade inputs override the upper comparator's own bit-by-bit comparison entirely
2. The cascade inputs are OR-ed with the upper comparator's results to produce the final output
3. The upper comparator checks its own bits first; only when <span class="arithmatex">\(A_{7..4} = B_{7..4}\)</span> does it pass through the lower comparator's result as the final answer
4. The lower comparator's greater/less/equal outputs are AND-ed with the upper comparator's corresponding outputs
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: C</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">In a cascaded magnitude comparator, the more significant stage has priority. The upper comparator first evaluates its own 4-bit comparison of <span class="arithmatex">\(A_{7..4}\)</span> vs <span class="arithmatex">\(B_{7..4}\)</span>. If the upper bits differ (one number is clearly greater), the upper comparator's result is the final answer—the cascade inputs from the lower comparator are irrelevant. Only when all upper bits are equal (<span class="arithmatex">\(A_{7..4} = B_{7..4}\)</span>) does the overall result depend on the less significant bits, so the cascade inputs (from the lower comparator) are passed through as the final output. This mirrors the MSB-to-LSB comparison algorithm.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Cascading Combinational Modules / Magnitude Comparator Design</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 10</p>

<p style="color: #333; line-height: 1.75;">A BCD-to-seven-segment decoder must handle 4-bit inputs, but only values 0000–1001 (decimal 0–9) are valid BCD. How should the decoder's logic be designed for the invalid input combinations 1010–1111?</p>

<div class="upper-alpha" markdown>
1. Display a blank (all segments off) for any invalid input to signal an error
2. Display the hexadecimal digits A–F for inputs 1010–1111
3. Add input validation logic to block invalid codes before they reach the decoder
4. Treat invalid inputs as don't care conditions in the K-maps for each segment function, allowing the simplification algorithm to choose output values that minimize the logic
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: D</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">In a properly functioning BCD system, inputs 1010–1111 never occur. Treating these six input combinations as don't cares in the K-map simplification for each of the seven segment functions (<span class="arithmatex">\(a\)</span> through <span class="arithmatex">\(g\)</span>) gives the minimization algorithm maximum freedom to form larger groups, often resulting in significantly simpler Boolean expressions. For example, the segment <span class="arithmatex">\(a\)</span> function with don't cares simplifies to <span class="arithmatex">\(a = A_3 + A_1 + A_2 A_0 + \overline{A_2}\,\overline{A_0}\)</span>—simpler than any expression constrained to produce specific outputs for invalid inputs.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> BCD-to-Seven-Segment Decoder / Don't Care Conditions</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Answers Summary</p>

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

</div>

</div>
