---
title: Unit 11 Challenge - Programmable Logic Devices
description: Challenge problems for programmable logic devices — answers only, no solutions
---

<div class="problems-styled" markdown>

<h1 style="color: #5A3EED !important; border-bottom: 3px solid #5A3EED; padding-bottom: 0.4rem; font-weight: 800;">Challenge Problems: Programmable Logic Devices</h1>

<p style="color: #555; line-height: 1.85; font-size: 1.05rem; margin-bottom: 2rem;">
These challenge problems test deeper understanding. Only final answers are provided — work through each problem on your own.
</p>

---

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);" markdown>

<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Challenge 1: ROM-Based Multi-Output Function Implementation</p>

<p style="color: #333; line-height: 1.75;">Implement the following 4-input, 4-output combinational circuit using a <span class="arithmatex">\(16 \times 4\)</span> ROM. Provide the complete ROM contents (all 16 addresses) in both binary and hexadecimal.</p>

- <span class="arithmatex">\(F_0(A,B,C,D) = \sum m(0, 2, 5, 7, 8, 10, 13, 15)\)</span>
- <span class="arithmatex">\(F_1(A,B,C,D) = \sum m(1, 3, 4, 6, 9, 11, 12, 14)\)</span>
- <span class="arithmatex">\(F_2(A,B,C,D) = \sum m(0, 1, 2, 3, 8, 9, 10, 11)\)</span>
- <span class="arithmatex">\(F_3(A,B,C,D) = \sum m(0, 1, 4, 5, 8, 9, 12, 13)\)</span>

<p style="color: #333; line-height: 1.75;">After filling in the ROM table, identify any pattern or simplification relating these outputs to the inputs.</p>

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">ROM contents:</p>

| Address | <span class="arithmatex">\(A\)</span> | <span class="arithmatex">\(B\)</span> | <span class="arithmatex">\(C\)</span> | <span class="arithmatex">\(D\)</span> | <span class="arithmatex">\(F_3\)</span> | <span class="arithmatex">\(F_2\)</span> | <span class="arithmatex">\(F_1\)</span> | <span class="arithmatex">\(F_0\)</span> | Hex |
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

<p style="color: #2E7D32; font-weight: 700; margin-top: 1rem;">Pattern identified:</p>

- <span class="arithmatex">\(F_0 = C \oplus D\)</span> (XOR of two LSBs)
- <span class="arithmatex">\(F_1 = \overline{C \oplus D} = C \odot D\)</span> (XNOR of two LSBs)
- <span class="arithmatex">\(F_2 = \overline{B}\)</span> (complement of second input)
- <span class="arithmatex">\(F_3 = \overline{C}\)</span> (complement of third input)
- Note that <span class="arithmatex">\(F_1 = \overline{F_0}\)</span>, and neither <span class="arithmatex">\(F_2\)</span> nor <span class="arithmatex">\(F_3\)</span> depends on <span class="arithmatex">\(A\)</span> or <span class="arithmatex">\(D\)</span>.
- The output at address <span class="arithmatex">\(n\)</span> equals the output at address <span class="arithmatex">\(n+8\)</span> for all <span class="arithmatex">\(n\)</span>, confirming <span class="arithmatex">\(A\)</span> is a don't-care for all outputs.

<p style="color: #333; line-height: 1.75; margin-bottom: 0;">The ROM stores <span class="arithmatex">\(16 \times 4 = 64\)</span> bits total, but only 3 input variables actually matter. A ROM with only 3 address lines (<span class="arithmatex">\(8 \times 4 = 32\)</span> bits) could implement the same functions by ignoring input <span class="arithmatex">\(A\)</span>.</p>

</div>
</details>

</div>

---

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);" markdown>

<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Challenge 2: PLA Programming with Shared Product Terms</p>

<p style="color: #333; line-height: 1.75;">Design a PLA for the following three functions of four variables. Minimize each function, identify all shared product terms, and provide the final PLA programming table showing the AND-plane and OR-plane connections. State the total number of unique product terms required.</p>

- <span class="arithmatex">\(F_1(A,B,C,D) = \sum m(0, 1, 2, 3, 8, 9, 10, 11)\)</span>
- <span class="arithmatex">\(F_2(A,B,C,D) = \sum m(0, 1, 4, 5, 8, 9, 12, 13)\)</span>
- <span class="arithmatex">\(F_3(A,B,C,D) = \sum m(0, 2, 8, 10) + d(4, 6, 12, 14)\)</span>

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Minimized functions:</p>

- <span class="arithmatex">\(F_1 = \overline{B}\)</span> (minterms where <span class="arithmatex">\(B=0\)</span>: 0,1,2,3,8,9,10,11)
- <span class="arithmatex">\(F_2 = \overline{C}\)</span> (minterms where <span class="arithmatex">\(C=0\)</span>: 0,1,4,5,8,9,12,13)
- <span class="arithmatex">\(F_3 = \overline{B}\,\overline{C}\)</span> (minterms 0,2,8,10 with don't cares 4,6,12,14 allowing <span class="arithmatex">\(F_3 = \overline{C}\)</span> or <span class="arithmatex">\(\overline{B}\,\overline{C}\)</span>; using don't cares optimally: <span class="arithmatex">\(F_3 = \overline{B}\,\overline{C}\)</span>, or with all don't cares: <span class="arithmatex">\(F_3 = \overline{C}\)</span> shares with <span class="arithmatex">\(F_2\)</span>)

Taking <span class="arithmatex">\(F_3 = \overline{B}\,\overline{C}\)</span> for maximum product term sharing:

**Unique product terms:**

| Term | Expression |
|------|-----------|
| <span class="arithmatex">\(P_1\)</span> | <span class="arithmatex">\(\overline{B}\)</span> |
| <span class="arithmatex">\(P_2\)</span> | <span class="arithmatex">\(\overline{C}\)</span> |
| <span class="arithmatex">\(P_3\)</span> | <span class="arithmatex">\(\overline{B}\,\overline{C}\)</span> |

But since <span class="arithmatex">\(P_3 = P_1 \cdot P_2\)</span>, the PLA AND plane must generate it as a separate product term (PLAs generate SOP, not multi-level).

**PLA AND-plane programming:**

| Term | <span class="arithmatex">\(A\)</span> | <span class="arithmatex">\(\overline{A}\)</span> | <span class="arithmatex">\(B\)</span> | <span class="arithmatex">\(\overline{B}\)</span> | <span class="arithmatex">\(C\)</span> | <span class="arithmatex">\(\overline{C}\)</span> | <span class="arithmatex">\(D\)</span> | <span class="arithmatex">\(\overline{D}\)</span> |
|------|-----|------|-----|------|-----|------|-----|------|
| <span class="arithmatex">\(P_1\)</span> | -- | -- | -- | 1 | -- | -- | -- | -- |
| <span class="arithmatex">\(P_2\)</span> | -- | -- | -- | -- | -- | 1 | -- | -- |
| <span class="arithmatex">\(P_3\)</span> | -- | -- | -- | 1 | -- | 1 | -- | -- |

**PLA OR-plane programming:**

| Term | <span class="arithmatex">\(F_1\)</span> | <span class="arithmatex">\(F_2\)</span> | <span class="arithmatex">\(F_3\)</span> |
|------|-------|-------|-------|
| <span class="arithmatex">\(P_1\)</span> | 1 | -- | -- |
| <span class="arithmatex">\(P_2\)</span> | -- | 1 | -- |
| <span class="arithmatex">\(P_3\)</span> | -- | -- | 1 |

**Total unique product terms: 3**

Alternative (if <span class="arithmatex">\(F_3\)</span> uses don't cares to simplify to <span class="arithmatex">\(\overline{C}\)</span>): only **2 product terms** (<span class="arithmatex">\(\overline{B}\)</span> and <span class="arithmatex">\(\overline{C}\)</span>), with <span class="arithmatex">\(F_3\)</span> sharing <span class="arithmatex">\(P_2\)</span> with <span class="arithmatex">\(F_2\)</span>. This is the better PLA solution since it minimizes product term count.

With <span class="arithmatex">\(F_3 = \overline{C}\)</span>:

| Term | <span class="arithmatex">\(F_1\)</span> | <span class="arithmatex">\(F_2\)</span> | <span class="arithmatex">\(F_3\)</span> |
|------|-------|-------|-------|
| <span class="arithmatex">\(P_1 = \overline{B}\)</span> | 1 | -- | -- |
| <span class="arithmatex">\(P_2 = \overline{C}\)</span> | -- | 1 | 1 |

<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;">Optimal answer: 2 product terms, with <span class="arithmatex">\(P_2\)</span> shared between <span class="arithmatex">\(F_2\)</span> and <span class="arithmatex">\(F_3\)</span>.</p>

</div>
</details>

</div>

---

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);" markdown>

<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Challenge 3: PAL Timing and Fan-In Limitations</p>

<p style="color: #333; line-height: 1.75;">A PAL16L8 device has the following specifications:</p>

- 16 inputs (active low outputs, active high inputs)
- 8 outputs, each with a maximum of 7 product terms
- Maximum propagation delay: <span class="arithmatex">\(t_{pd} = 25\)</span> ns (input pin to output pin)
- Each AND gate has a fan-in of 32 (16 inputs <span class="arithmatex">\(\times\)</span> 2 for true/complement)

<p style="color: #333; line-height: 1.75;">A designer needs to implement the function:</p>

<span class="arithmatex">\[G(A,B,C,D,E,F,H,I,J,K,L,M,N,P,Q,R) = \sum m(0, 1, 2, 3, 65534, 65535)\]</span>

<p style="color: #333; line-height: 1.75;">This is a 16-variable function. Determine:</p>

(a) Whether this function fits in a single PAL16L8 output.
(b) The minimized SOP expression and number of product terms.
(c) The maximum frequency at which this PAL can toggle the output.

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">(a)</p>

The PAL16L8 has 16 inputs with fan-in of 32 per AND gate (16 true + 16 complement), so a product term can reference all 16 inputs. The question is whether <span class="arithmatex">\(G\)</span> requires <span class="arithmatex">\(\leq 7\)</span> product terms.

<p style="color: #2E7D32; font-weight: 700;">(b) Minimized SOP:</p>

<span class="arithmatex">\(G = 1\)</span> for minterms 0, 1, 2, 3, 65534, 65535.

- Minterms 0-3: <span class="arithmatex">\(A=B=C=D=E=F=H=I=J=K=L=M=N=P=0\)</span>, <span class="arithmatex">\(QR \in \{00,01,10,11\}\)</span>

    These combine to: <span class="arithmatex">\(\overline{A}\,\overline{B}\,\overline{C}\,\overline{D}\,\overline{E}\,\overline{F}\,\overline{H}\,\overline{I}\,\overline{J}\,\overline{K}\,\overline{L}\,\overline{M}\,\overline{N}\,\overline{P}\)</span> (14-literal term, <span class="arithmatex">\(Q\)</span> and <span class="arithmatex">\(R\)</span> drop out)

- Minterm 65534 (<span class="arithmatex">\(= 2^{16} - 2\)</span>): all 1s except LSB = <span class="arithmatex">\(ABCDEFHIJKLMNPQ\overline{R}\)</span>
- Minterm 65535 (<span class="arithmatex">\(= 2^{16} - 1\)</span>): all 1s = <span class="arithmatex">\(ABCDEFHIJKLMNPQR\)</span>

    These combine to: <span class="arithmatex">\(ABCDEFHIJKLMNPQ\)</span> (15-literal term, <span class="arithmatex">\(R\)</span> drops out)

**Minimized:** <span class="arithmatex">\(G = \overline{A}\,\overline{B}\,\overline{C}\,\overline{D}\,\overline{E}\,\overline{F}\,\overline{H}\,\overline{I}\,\overline{J}\,\overline{K}\,\overline{L}\,\overline{M}\,\overline{N}\,\overline{P} + ABCDEFHIJKLMNPQ\)</span>

**Number of product terms: 2.** This fits within the 7-term limit. **Yes, it fits in one PAL16L8 output.**

Note: The PAL16L8 has active-low outputs (output is inverted). The designer must account for the output inversion, implementing <span class="arithmatex">\(\overline{G}\)</span> in the AND-OR array so the inverted output produces <span class="arithmatex">\(G\)</span>. Since <span class="arithmatex">\(\overline{G}\)</span> has <span class="arithmatex">\(2^{16} - 2 - 4 = 65530\)</span> minterms, direct implementation of <span class="arithmatex">\(\overline{G}\)</span> is impractical. Instead, the designer should implement <span class="arithmatex">\(G\)</span> and accept the inverted output, or use a PAL with programmable output polarity.

<p style="color: #2E7D32; font-weight: 700;">(c) Maximum toggle frequency:</p>

<span class="arithmatex">\[f_{toggle} = \frac{1}{2 \times t_{pd}} = \frac{1}{2 \times 25 \text{ ns}} = \frac{1}{50 \text{ ns}} = \mathbf{20 \text{ MHz}}\]</span>

<p style="color: #333; line-height: 1.75; margin-bottom: 0;">The factor of 2 accounts for the output needing one propagation delay to go high and one to go low for a complete toggle cycle.</p>

</div>
</details>

</div>

---

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);" markdown>

<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Challenge 4: FPGA LUT Cascade for Functions Exceeding Single LUT Capacity</p>

<p style="color: #333; line-height: 1.75;">An FPGA has 4-input LUTs (LUT-4). A design requires implementing the following 7-input function:</p>

<span class="arithmatex">\[H(A,B,C,D,E,F,G) = ABCD + EFGA + \overline{A}\,\overline{B}\,\overline{C}\,\overline{D}\,\overline{E}\,\overline{F}\,\overline{G}\]</span>

<p style="color: #333; line-height: 1.75;">Decompose this function using Shannon expansion to map it onto LUT-4 resources. Determine:</p>

(a) The minimum number of LUT-4s required.
(b) The number of logic levels (LUT depth).
(c) The LUT contents for each LUT in the decomposition.

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

**(a) & (b) Decomposition strategy:**

The function has 7 inputs but each LUT handles at most 4. Key observation: each product term shares variable $A$, so we can absorb $A$ into the first-level LUTs to minimize depth.

**Optimal decomposition (5 LUTs, 2 levels):**

| LUT | Function | Inputs | Level |
|-----|----------|--------|-------|
| LUT 1 | $P = ABCD$ | A, B, C, D | 1 |
| LUT 2 | $Q = AEFG$ | A, E, F, G | 1 |
| LUT 3 | $R = \overline{A}\,\overline{B}\,\overline{C}\,\overline{D}$ | A, B, C, D | 1 |
| LUT 4 | $S = \overline{E}\,\overline{F}\,\overline{G}$ | E, F, G, — | 1 |
| LUT 5 | $H = P + Q + R \cdot S$ | P, Q, R, S | 2 |

**(a) Minimum number of LUT-4s: 5**

**(b) Logic levels (LUT depth): 2**

**(c) LUT contents:**

**LUT 1** — $P = ABCD$ (4 inputs: A, B, C, D):

| ABCD | P |
|------|---|
| 0000–1110 | 0 |
| 1111 | 1 |

Output = 1 only when all inputs are 1. (1 of 16 entries is 1)

**LUT 2** — $Q = AEFG$ (4 inputs: A, E, F, G):

| AEFG | Q |
|------|---|
| 0000–1110 | 0 |
| 1111 | 1 |

Output = 1 only when $A = E = F = G = 1$. (1 of 16 entries is 1)

**LUT 3** — $R = \overline{A}\,\overline{B}\,\overline{C}\,\overline{D}$ (4 inputs: A, B, C, D):

| ABCD | R |
|------|---|
| 0000 | 1 |
| 0001–1111 | 0 |

Output = 1 only when all inputs are 0. (1 of 16 entries is 1)

**LUT 4** — $S = \overline{E}\,\overline{F}\,\overline{G}$ (3 inputs: E, F, G, unused):

| EFG | S |
|-----|---|
| 000 | 1 |
| 001–111 | 0 |

Output = 1 only when $E = F = G = 0$. (1 of 8 entries is 1; 4th input unused/tied low)

**LUT 5** — $H = P + Q + R \cdot S$ (4 inputs: P, Q, R, S):

| P | Q | R | S | H |
|---|---|---|---|---|
| 0 | 0 | 0 | 0 | 0 |
| 0 | 0 | 0 | 1 | 0 |
| 0 | 0 | 1 | 0 | 0 |
| 0 | 0 | 1 | 1 | 1 |
| 0 | 1 | X | X | 1 |
| 1 | X | X | X | 1 |

$H = 1$ when $P = 1$ (i.e., $ABCD$), or $Q = 1$ (i.e., $AEFG$), or both $R = 1$ and $S = 1$ (i.e., $\overline{A}\,\overline{B}\,\overline{C}\,\overline{D}\,\overline{E}\,\overline{F}\,\overline{G}$). Of 16 truth table rows, 11 produce output 1.

**Circuit diagram:**

```
A ──┬──→ [LUT 1: ABCD] ──→ P ──→ ┐
B ──┼──→             │             │
C ──┼──→             │             │
D ──┘                              │
                                   ├──→ [LUT 5: P+Q+RS] ──→ H
A ──┬──→ [LUT 2: AEFG] ──→ Q ──→ ┤
E ──┼──→             │             │
F ──┼──→             │             │
G ──┘                              │
                                   │
A ──┬──→ [LUT 3: A̅B̅C̅D̅] ──→ R ──→ ┤
B ──┼──→             │             │
C ──┼──→             │             │
D ──┘                              │
                                   │
E ──┬──→ [LUT 4: E̅F̅G̅] ──→ S ──→ ┘
F ──┼──→           │
G ──┘              │
```

**Note:** LUTs 1 and 3 share inputs A, B, C, D — an FPGA router can exploit this locality. Variable $A$ appears in three first-level LUTs, requiring fan-out of 3 in the routing fabric.

</div>
</details>

</div>

---

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);" markdown>

<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Challenge 5: PLD Device Selection Comparison</p>

<p style="color: #333; line-height: 1.75;">A digital system has the following requirements:</p>

- 20 input signals, 12 output signals
- 8 outputs are combinational functions averaging 6 product terms each
- 4 outputs are registered (sequential, requiring flip-flops)
- The design must power up instantly (no configuration delay)
- Operating frequency: 50 MHz
- Production volume: 500 units
- Budget: $5 per unit for the programmable device

<p style="color: #333; line-height: 1.75;">Evaluate each PLD technology (ROM, PLA, PAL, CPLD, FPGA) against these requirements. State which device is selected and justify the decision by completing a comparison matrix.</p>

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Requirements summary:</p>

- 20 inputs, 12 outputs (8 combinational + 4 registered)
- Average 6 product terms per combinational output
- Instant power-on (non-volatile configuration)
- 50 MHz operation
- 500 units at $5/unit budget

**Evaluation matrix:**

| Criterion | ROM | PLA | PAL | CPLD | FPGA (SRAM) |
|-----------|-----|-----|-----|------|-------------|
| 20 inputs supported? | No (<span class="arithmatex">\(2^{20} = 1\)</span>M words, impractical) | Possible but limited density | Yes (PAL22V10) | Yes | Yes |
| 12 outputs? | Yes (if ROM exists) | Limited (typ. 8-10) | PAL22V10 has 10 | Yes (64+ I/O) | Yes |
| 6 product terms/output? | N/A (ROM stores all minterms) | Yes (shared terms) | Marginal (PAL22V10 has 8-16/output) | Yes | N/A (uses LUTs) |
| Registered outputs? | No (ROM is combinational only) | No (basic PLA) | Yes (PAL22V10 has registered macrocells) | Yes | Yes |
| Instant power-on? | Yes (mask ROM) | Yes (fuse-based) | Yes (fuse-based) | Yes (Flash/EEPROM) | **No** (needs bitstream load) |
| 50 MHz? | ~25-50 MHz | ~15-30 MHz (slow, two programmable planes) | ~50-100 MHz | ~100+ MHz | ~200+ MHz |
| $5/unit at 500 qty? | No (custom mask cost) | ~$3-8 | ~$2-5 | ~$3-10 | ~$5-50 |

<p style="color: #2E7D32; font-weight: 700;">Elimination:</p>

- **ROM:** Eliminated. 20 inputs means <span class="arithmatex">\(2^{20} \times 12 = 12\)</span> Mbit ROM. Commercially impractical and lacks registered outputs.
- **PLA:** Eliminated. Too slow for 50 MHz. Limited output count. No registered outputs in basic PLAs.
- **FPGA (SRAM):** Eliminated. Fails instant power-on requirement. Also likely exceeds $5 budget for this design size at 500 units.
- **PAL:** PAL22V10 has 22 inputs (OK), 10 outputs (not enough for 12). Could use two PAL22V10s but complicates design. Registered outputs available. Speed is borderline at 50 MHz depending on grade.

<p style="color: #2E7D32; font-weight: 700;">Selected device: CPLD</p>

Justification:

- **Capacity:** A small CPLD (e.g., Xilinx CoolRunner-II XC2C64 or Lattice MachXO2-256) provides 64+ macro-cells, easily handling 20 inputs and 12 outputs.
- **Product terms:** CPLD function blocks provide sufficient product terms per output, with borrowing for outputs needing more than the base allocation.
- **Registered outputs:** Every CPLD macro-cell contains a configurable flip-flop.
- **Instant power-on:** CPLDs use non-volatile configuration (Flash or EEPROM). The device is operational within microseconds of power application.
- **Speed:** CPLDs with deterministic timing easily achieve 50 MHz with margin.
- **Cost:** Small CPLDs are available for $2-5 at moderate volumes, within budget.
- **Development:** Standard HDL design flow with free vendor tools.

<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;">Final answer: A small Flash-based CPLD is the optimal choice, meeting all requirements with margin on speed, capacity, and cost.</p>

</div>
</details>

</div>

</div>
