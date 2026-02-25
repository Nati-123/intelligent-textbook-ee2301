---
title: Unit 8 Challenge - Combinational Logic Modules
description: Challenge problems for combinational logic modules — answers only, no solutions
---

<div class="problems-styled" markdown>

<h1 style="color: #5A3EED !important; border-bottom: 3px solid #5A3EED; padding-bottom: 0.4rem; font-weight: 800;">Challenge Problems: Combinational Logic Modules</h1>

<p style="color: #555; line-height: 1.85; font-size: 1.05rem; margin-bottom: 2rem;">
These challenge problems test deeper understanding. Only final answers are provided — work through each problem on your own.
</p>

---

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);" markdown>

<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Challenge 1: Implement a 4-Variable Function Using an 8:1 MUX</p>

<p style="color: #333; line-height: 1.75;">Implement the function $F(A, B, C, D) = \sum m(0, 2, 4, 5, 6, 9, 11, 13, 15)$ using a single 8:1 multiplexer with $A$, $B$, $C$ as select inputs. Determine the data input ($I_0$ through $I_7$) for each MUX channel as a function of $D$.</p>

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

With $A$, $B$, $C$ as select lines ($S_2 = A$, $S_1 = B$, $S_0 = C$):

| Select ($ABC$) | Minterms | $D=0$ | $D=1$ | Data Input |
|---|---|---|---|---|
| 000 | $m_0, m_1$ | 1 | 0 | $\overline{D}$ |
| 001 | $m_2, m_3$ | 1 | 0 | $\overline{D}$ |
| 010 | $m_4, m_5$ | 1 | 1 | $1$ |
| 011 | $m_6, m_7$ | 1 | 0 | $\overline{D}$ |
| 100 | $m_8, m_9$ | 0 | 1 | $D$ |
| 101 | $m_{10}, m_{11}$ | 0 | 1 | $D$ |
| 110 | $m_{12}, m_{13}$ | 0 | 1 | $D$ |
| 111 | $m_{14}, m_{15}$ | 0 | 1 | $D$ |

<p style="color: #2E7D32; font-weight: 700; margin-top: 1rem; margin-bottom: 0;">MUX inputs: $I_0 = \overline{D}$, $I_1 = \overline{D}$, $I_2 = 1$, $I_3 = \overline{D}$, $I_4 = D$, $I_5 = D$, $I_6 = D$, $I_7 = D$</p>

</div>
</details>

</div>

---

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);" markdown>

<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Challenge 2: Design a Priority Encoder</p>

<p style="color: #333; line-height: 1.75;">Design an 8-to-3 priority encoder with active-high inputs ($I_0$ through $I_7$, where $I_7$ has the highest priority). The outputs are a 3-bit binary code ($Y_2 Y_1 Y_0$) representing the highest-priority active input, plus a valid output $V$ that is 1 when any input is active. Write the Boolean expressions for all outputs.</p>

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Valid output:</p>

$V = I_0 + I_1 + I_2 + I_3 + I_4 + I_5 + I_6 + I_7$

<p style="color: #2E7D32; font-weight: 700;">Encoded outputs (highest priority wins):</p>

$Y_2 = I_4 + I_5 + I_6 + I_7$

$Y_1 = I_2\,\overline{I_4}\,\overline{I_5}\,\overline{I_6}\,\overline{I_7} + I_3\,\overline{I_4}\,\overline{I_5}\,\overline{I_6}\,\overline{I_7} + I_6 + I_7$

Simplified: $Y_1 = I_6 + I_7 + \overline{I_4}\,\overline{I_5}\,(I_2 + I_3)$

$Y_0 = I_7 + \overline{I_6}\,I_5 + \overline{I_4}\,\overline{I_5}\,\overline{I_6}\,I_3 + \overline{I_2}\,\overline{I_3}\,\overline{I_4}\,\overline{I_5}\,\overline{I_6}\,I_1$

<p style="color: #333; line-height: 1.75; margin-bottom: 0;">Simplified: $Y_0 = I_7 + \overline{I_6}\,I_5 + \overline{I_4}\,\overline{I_5}\,\overline{I_6}\,I_3 + \overline{I_2}\,\overline{I_3}\,\overline{I_4}\,\overline{I_5}\,\overline{I_6}\,I_1$</p>

</div>
</details>

</div>

---

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);" markdown>

<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Challenge 3: Cascaded Decoder Design</p>

<p style="color: #333; line-height: 1.75;">Using two 3-to-8 decoders with enable inputs and basic logic gates, design a 4-to-16 decoder. Specify how the enable inputs are connected, and write the expression for output line $Y_{13}$.</p>

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Design:</p>

- Input $A_3$ (MSB) controls the enable lines
- **Decoder 1** (lower): Enable = $\overline{A_3}$, inputs $A_2 A_1 A_0$ &rarr; outputs $Y_0$ through $Y_7$
- **Decoder 2** (upper): Enable = $A_3$, inputs $A_2 A_1 A_0$ &rarr; outputs $Y_8$ through $Y_{15}$

<p style="color: #2E7D32; font-weight: 700;">Expression for $Y_{13}$:</p>

$Y_{13}$ is output 5 of Decoder 2 (since $13 - 8 = 5$, and $5 = 101_2$):

$Y_{13} = A_3 \cdot A_2 \cdot \overline{A_1} \cdot A_0$

<p style="color: #333; line-height: 1.75; margin-bottom: 0;">This output is active only when $A_3 A_2 A_1 A_0 = 1101_2 = 13_{10}$.</p>

</div>
</details>

</div>

---

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);" markdown>

<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Challenge 4: Arithmetic Using MUX and Decoder</p>

<p style="color: #333; line-height: 1.75;">Using a 4-to-1 MUX and a 2-to-4 decoder, implement a circuit that computes $F = A \oplus B$ (XOR) and $G = A \cdot B$ (AND) simultaneously. Show the connections for both outputs.</p>

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Using a 4:1 MUX for $F = A \oplus B$:</p>

Select lines: $S_1 = A$, $S_0 = B$

| $AB$ | $A \oplus B$ | MUX Input |
|---|---|---|
| 00 | 0 | $I_0 = 0$ |
| 01 | 1 | $I_1 = 1$ |
| 10 | 1 | $I_2 = 1$ |
| 11 | 0 | $I_3 = 0$ |

$F = \text{MUX}(I_0=0, I_1=1, I_2=1, I_3=0; S_1=A, S_0=B)$

<p style="color: #2E7D32; font-weight: 700;">Using a 2:4 decoder for $G = A \cdot B$:</p>

Inputs: $A$, $B$ &rarr; Decoder outputs $D_0, D_1, D_2, D_3$

$D_3$ is active when $AB = 11$, so: $G = D_3$

<p style="color: #333; line-height: 1.75; margin-bottom: 0;"><strong>Complete design:</strong> MUX gives XOR output; decoder output $D_3$ gives AND output. Both share inputs $A$ and $B$.</p>

</div>
</details>

</div>

---

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);" markdown>

<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Challenge 5: Gray-to-Binary Converter Using XOR Gates</p>

<p style="color: #333; line-height: 1.75;">Design a 4-bit Gray-to-binary converter. Given Gray code input $G_3 G_2 G_1 G_0$, derive the Boolean expressions for each binary output bit $B_3 B_2 B_1 B_0$ and determine the total number of XOR gates needed.</p>

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Conversion formulas:</p>

$B_3 = G_3$

$B_2 = G_3 \oplus G_2 = B_3 \oplus G_2$

$B_1 = G_3 \oplus G_2 \oplus G_1 = B_2 \oplus G_1$

$B_0 = G_3 \oplus G_2 \oplus G_1 \oplus G_0 = B_1 \oplus G_0$

<p style="color: #2E7D32; font-weight: 700;">Total: 3 XOR gates</p>

<p style="color: #333; line-height: 1.75; margin-bottom: 0;">(Cascaded: each binary bit is XOR of the previous binary bit and the current Gray bit). Note: The cascaded implementation is simpler (3 gates) but has longer propagation delay. A parallel implementation using the full XOR chains would need $3 + 2 + 1 = 6$ XOR gates but has less delay.</p>

</div>
</details>

</div>

</div>
