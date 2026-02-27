---
title: Unit 10 Challenge - Sequential Circuit Design
description: Challenge problems for sequential circuit design — answers only, no solutions
---

<div class="problems-styled" markdown>

<h1 style="color: #5A3EED !important; border-bottom: 3px solid #5A3EED; padding-bottom: 0.4rem; font-weight: 800;">Challenge Problems: Sequential Circuit Design</h1>

<p style="color: #555; line-height: 1.85; font-size: 1.05rem; margin-bottom: 2rem;">
These challenge problems test deeper understanding. Only final answers are provided — work through each problem on your own.
</p>

---

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);" markdown>

<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Challenge 1: Mod-6 Synchronous Counter with D Flip-Flops</p>

<p style="color: #333; line-height: 1.75;">Design a mod-6 synchronous up-counter (counts 0 → 1 → 2 → 3 → 4 → 5 → 0 → ...) using D flip-flops. Derive the excitation equations for <span class="arithmatex">\(D_2\)</span>, <span class="arithmatex">\(D_1\)</span>, <span class="arithmatex">\(D_0\)</span> and the output equations. States 6 and 7 are don't cares.</p>

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">State table:</p>

| <span class="arithmatex">\(Q_2 Q_1 Q_0\)</span> | Next State | <span class="arithmatex">\(D_2\)</span> | <span class="arithmatex">\(D_1\)</span> | <span class="arithmatex">\(D_0\)</span> |
|---|---|---|---|---|
| 000 | 001 | 0 | 0 | 1 |
| 001 | 010 | 0 | 1 | 0 |
| 010 | 011 | 0 | 1 | 1 |
| 011 | 100 | 1 | 0 | 0 |
| 100 | 101 | 1 | 0 | 1 |
| 101 | 000 | 0 | 0 | 0 |
| 110 | ddd | d | d | d |
| 111 | ddd | d | d | d |

**K-maps with don't cares (states 6, 7):**

<span class="arithmatex">\(D_0 = \overline{Q_0}\)</span>... check: 0→1, 1→0, 0→1, 1→0, 0→1, 1→0. Yes!

<span class="arithmatex">\(D_0 = \overline{Q_0}\)</span>

<span class="arithmatex">\(D_1\)</span>: 0→0, 0→1, 1→1, 0→0, 0→0, 0→0. From K-map: <span class="arithmatex">\(D_1 = Q_1 \oplus Q_0\)</span> with don't cares...

<span class="arithmatex">\(D_1 = \overline{Q_2}\,Q_1\,\overline{Q_0} + \overline{Q_2}\,\overline{Q_1}\,Q_0 = \overline{Q_2}(Q_1 \oplus Q_0)\)</span>

<span class="arithmatex">\(D_2\)</span>: 0→0, 0→0, 0→0, 0→1, 1→1, 1→0. From K-map:

<span class="arithmatex">\(D_2 = Q_2\,\overline{Q_0} + Q_1\,Q_0\,\overline{Q_2}\)</span>... with don't cares:

<span class="arithmatex">\(D_2 = Q_1\,Q_0 + Q_2\,\overline{Q_0}\)</span>

<p style="color: #2E7D32; font-weight: 700; margin-top: 1rem;">Excitation equations:</p>

- <span class="arithmatex">\(D_2 = Q_1 Q_0 + Q_2 \overline{Q_0}\)</span>
- <span class="arithmatex">\(D_1 = \overline{Q_2}(Q_1 \oplus Q_0)\)</span>
- <span class="arithmatex">\(D_0 = \overline{Q_0}\)</span>

</div>
</details>

</div>

---

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);" markdown>

<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Challenge 2: Sequence Detector FSM (Moore Machine)</p>

<p style="color: #333; line-height: 1.75;">Design a Moore FSM that detects the input sequence <strong>1011</strong> on a serial input <span class="arithmatex">\(X\)</span>. The output <span class="arithmatex">\(Z = 1\)</span> when the sequence is detected. Allow overlapping sequences (e.g., input 10110<strong>11</strong> should detect at position 4 and start looking for overlap).</p>

<p style="color: #333; line-height: 1.75;">Provide the state diagram, state table, state assignment, and excitation equations using D flip-flops.</p>

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">States:</p>

<span class="arithmatex">\(S_0\)</span> (reset), <span class="arithmatex">\(S_1\)</span> (seen "1"), <span class="arithmatex">\(S_2\)</span> (seen "10"), <span class="arithmatex">\(S_3\)</span> (seen "101"), <span class="arithmatex">\(S_4\)</span> (seen "1011", output <span class="arithmatex">\(Z=1\)</span>)

**State table (Moore — output depends only on state):**

| State | <span class="arithmatex">\(X=0\)</span> | <span class="arithmatex">\(X=1\)</span> | Output <span class="arithmatex">\(Z\)</span> |
|---|---|---|---|
| <span class="arithmatex">\(S_0\)</span> | <span class="arithmatex">\(S_0\)</span> | <span class="arithmatex">\(S_1\)</span> | 0 |
| <span class="arithmatex">\(S_1\)</span> | <span class="arithmatex">\(S_2\)</span> | <span class="arithmatex">\(S_1\)</span> | 0 |
| <span class="arithmatex">\(S_2\)</span> | <span class="arithmatex">\(S_0\)</span> | <span class="arithmatex">\(S_3\)</span> | 0 |
| <span class="arithmatex">\(S_3\)</span> | <span class="arithmatex">\(S_2\)</span> | <span class="arithmatex">\(S_4\)</span> | 0 |
| <span class="arithmatex">\(S_4\)</span> | <span class="arithmatex">\(S_2\)</span> | <span class="arithmatex">\(S_1\)</span> | 1 |

**State assignment:** <span class="arithmatex">\(S_0 = 000\)</span>, <span class="arithmatex">\(S_1 = 001\)</span>, <span class="arithmatex">\(S_2 = 010\)</span>, <span class="arithmatex">\(S_3 = 011\)</span>, <span class="arithmatex">\(S_4 = 100\)</span>

<p style="color: #2E7D32; font-weight: 700;">Excitation equations (3 D flip-flops):</p>

<span class="arithmatex">\(D_2 = Q_1 Q_0 X\)</span> (go to <span class="arithmatex">\(S_4\)</span> only from <span class="arithmatex">\(S_3\)</span> with <span class="arithmatex">\(X=1\)</span>)

<span class="arithmatex">\(D_1 = \overline{Q_2}\,\overline{Q_1}\,Q_0\,\overline{X} + \overline{Q_2}\,Q_1\,\overline{Q_0}\,X + Q_2\,\overline{X} + \overline{Q_2}\,Q_1\,Q_0\,\overline{X}\)</span>

Simplified: <span class="arithmatex">\(D_1 = Q_0\overline{X} + Q_1\overline{Q_0}X + Q_2\overline{X}\)</span>

<span class="arithmatex">\(D_0 = \overline{Q_1}\,\overline{Q_2}\,X + Q_1\,\overline{Q_0}\,X\)</span>

Simplified: <span class="arithmatex">\(D_0 = X(\overline{Q_1}\,\overline{Q_2} + Q_1\,\overline{Q_0})\)</span>

**Output:** <span class="arithmatex">\(Z = Q_2\)</span>

</div>
</details>

</div>

---

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);" markdown>

<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Challenge 3: Universal Shift Register Application</p>

<p style="color: #333; line-height: 1.75;">A 4-bit universal shift register supports: parallel load, shift left, shift right, and hold. The mode control is <span class="arithmatex">\(S_1 S_0\)</span>: 00 = hold, 01 = shift right, 10 = shift left, 11 = parallel load.</p>

<p style="color: #333; line-height: 1.75;">Starting with register contents <span class="arithmatex">\(Q_3 Q_2 Q_1 Q_0 = 1010\)</span>, serial input right (<span class="arithmatex">\(SI_R\)</span>) = 1, serial input left (<span class="arithmatex">\(SI_L\)</span>) = 0, determine the register contents after each of the following operations performed in sequence:</p>

1. Shift right
2. Shift right
3. Shift left
4. Parallel load <span class="arithmatex">\(D_3 D_2 D_1 D_0 = 0110\)</span>
5. Shift left

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

| Step | Operation | <span class="arithmatex">\(SI\)</span> | <span class="arithmatex">\(Q_3 Q_2 Q_1 Q_0\)</span> |
|---|---|---|---|
| Initial | — | — | 1010 |
| 1 | Shift right | <span class="arithmatex">\(SI_R = 1\)</span> | **1101** |
| 2 | Shift right | <span class="arithmatex">\(SI_R = 1\)</span> | **1110** |
| 3 | Shift left | <span class="arithmatex">\(SI_L = 0\)</span> | **1100** |
| 4 | Parallel load | — | **0110** |
| 5 | Shift left | <span class="arithmatex">\(SI_L = 0\)</span> | **1100** |

<p style="color: #333; line-height: 1.75; margin-bottom: 0;">Shift right: bits move right, <span class="arithmatex">\(SI_R\)</span> enters at MSB.
Shift left: bits move left, <span class="arithmatex">\(SI_L\)</span> enters at LSB.</p>

</div>
</details>

</div>

---

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);" markdown>

<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Challenge 4: Johnson Counter Analysis with Decoding</p>

<p style="color: #333; line-height: 1.75;">A 4-bit Johnson (twisted ring) counter starts at state <span class="arithmatex">\(0000\)</span>.</p>

<p style="color: #333; line-height: 1.75;">(a) List all states in the counting sequence.<br>
(b) Design a decoding circuit that produces 8 unique outputs (<span class="arithmatex">\(Y_0\)</span> through <span class="arithmatex">\(Y_7\)</span>), one for each valid state, using only 2-input AND gates.<br>
(c) What happens if the counter enters an invalid state (e.g., <span class="arithmatex">\(0101\)</span>)? Does it self-correct?</p>

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">(a) State sequence:</p>

| Step | <span class="arithmatex">\(Q_3 Q_2 Q_1 Q_0\)</span> |
|---|---|
| 0 | 0000 |
| 1 | 1000 |
| 2 | 1100 |
| 3 | 1110 |
| 4 | 1111 |
| 5 | 0111 |
| 6 | 0011 |
| 7 | 0001 |
| 8 | 0000 (repeats) |

8 valid states for a 4-bit Johnson counter.

<p style="color: #2E7D32; font-weight: 700;">(b) Decoding with 2-input AND gates:</p>

| State | Output | Decode |
|---|---|---|
| 0000 | <span class="arithmatex">\(Y_0\)</span> | <span class="arithmatex">\(\overline{Q_3} \cdot \overline{Q_0}\)</span> |
| 1000 | <span class="arithmatex">\(Y_1\)</span> | <span class="arithmatex">\(Q_3 \cdot \overline{Q_2}\)</span> |
| 1100 | <span class="arithmatex">\(Y_2\)</span> | <span class="arithmatex">\(Q_2 \cdot \overline{Q_1}\)</span> |
| 1110 | <span class="arithmatex">\(Y_3\)</span> | <span class="arithmatex">\(Q_1 \cdot \overline{Q_0}\)</span> |
| 1111 | <span class="arithmatex">\(Y_4\)</span> | <span class="arithmatex">\(Q_3 \cdot Q_0\)</span> |
| 0111 | <span class="arithmatex">\(Y_5\)</span> | <span class="arithmatex">\(\overline{Q_3} \cdot Q_2\)</span> |
| 0011 | <span class="arithmatex">\(Y_6\)</span> | <span class="arithmatex">\(\overline{Q_2} \cdot Q_1\)</span> |
| 0001 | <span class="arithmatex">\(Y_7\)</span> | <span class="arithmatex">\(\overline{Q_1} \cdot Q_0\)</span> |

Each valid state is uniquely decoded by checking adjacent bits. **8 AND gates + 4 inverters** needed.

<p style="color: #2E7D32; font-weight: 700;">(c) Invalid state behavior:</p>

<p style="color: #333; line-height: 1.75; margin-bottom: 0;">A standard Johnson counter does <strong>not</strong> self-correct. If it enters <span class="arithmatex">\(0101\)</span>, it will cycle through invalid states: <span class="arithmatex">\(0101 → 0010 → 1001 → 0100 → 0010 → ...\)</span> (a separate invalid cycle). Self-correcting designs require additional feedback logic.</p>

</div>
</details>

</div>

---

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);" markdown>

<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Challenge 5: Mealy vs Moore Implementation Comparison</p>

<p style="color: #333; line-height: 1.75;">Design both a Mealy and Moore FSM that outputs <span class="arithmatex">\(Z = 1\)</span> whenever the input sequence <span class="arithmatex">\(X = 110\)</span> is detected (with overlap allowed). Compare the two designs in terms of number of states, flip-flops, and output timing.</p>

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Mealy Machine:</p>

| State | Meaning | <span class="arithmatex">\(X=0\)</span> (Next/<span class="arithmatex">\(Z\)</span>) | <span class="arithmatex">\(X=1\)</span> (Next/<span class="arithmatex">\(Z\)</span>) |
|---|---|---|---|
| <span class="arithmatex">\(A\)</span> | Reset | <span class="arithmatex">\(A\)</span>/0 | <span class="arithmatex">\(B\)</span>/0 |
| <span class="arithmatex">\(B\)</span> | Seen "1" | <span class="arithmatex">\(A\)</span>/0 | <span class="arithmatex">\(C\)</span>/0 |
| <span class="arithmatex">\(C\)</span> | Seen "11" | <span class="arithmatex">\(A\)</span>/1 | <span class="arithmatex">\(C\)</span>/0 |

**3 states**, 2 flip-flops. Output <span class="arithmatex">\(Z=1\)</span> appears on the transition from <span class="arithmatex">\(C\)</span> with <span class="arithmatex">\(X=0\)</span>.

<p style="color: #2E7D32; font-weight: 700;">Moore Machine:</p>

| State | Meaning | <span class="arithmatex">\(X=0\)</span> Next | <span class="arithmatex">\(X=1\)</span> Next | Output <span class="arithmatex">\(Z\)</span> |
|---|---|---|---|---|
| <span class="arithmatex">\(A\)</span> | Reset | <span class="arithmatex">\(A\)</span> | <span class="arithmatex">\(B\)</span> | 0 |
| <span class="arithmatex">\(B\)</span> | Seen "1" | <span class="arithmatex">\(A\)</span> | <span class="arithmatex">\(C\)</span> | 0 |
| <span class="arithmatex">\(C\)</span> | Seen "11" | <span class="arithmatex">\(D\)</span> | <span class="arithmatex">\(C\)</span> | 0 |
| <span class="arithmatex">\(D\)</span> | Seen "110" | <span class="arithmatex">\(A\)</span> | <span class="arithmatex">\(B\)</span> | 1 |

**4 states**, 2 flip-flops. Output <span class="arithmatex">\(Z=1\)</span> in state <span class="arithmatex">\(D\)</span>.

<p style="color: #2E7D32; font-weight: 700;">Comparison:</p>

| Property | Mealy | Moore |
|---|---|---|
| Number of states | 3 | 4 |
| Number of flip-flops | 2 | 2 |
| Output timing | Immediate (combinational, may glitch) | Delayed by 1 clock (registered, glitch-free) |
| Output depends on | Current state + input | Current state only |

<p style="color: #333; line-height: 1.75; margin-bottom: 0;">The Mealy machine detects the sequence one clock cycle earlier than the Moore machine, but its output may have glitches since it depends on the input combinationally.</p>

</div>
</details>

</div>

</div>
