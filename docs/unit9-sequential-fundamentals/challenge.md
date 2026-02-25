---
title: Unit 9 Challenge - Sequential Logic Fundamentals
description: Challenge problems for sequential logic fundamentals — answers only, no solutions
---

<div class="problems-styled" markdown>

<h1 style="color: #5A3EED !important; border-bottom: 3px solid #5A3EED; padding-bottom: 0.4rem; font-weight: 800;">Challenge Problems: Sequential Logic Fundamentals</h1>

<p style="color: #555; line-height: 1.85; font-size: 1.05rem; margin-bottom: 2rem;">
These challenge problems test deeper understanding. Only final answers are provided — work through each problem on your own.
</p>

---

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);" markdown>

<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Challenge 1: JK Flip-Flop Timing Diagram with Preset/Clear</p>

<p style="color: #333; line-height: 1.75;">A negative-edge-triggered JK flip-flop has asynchronous active-low Preset (<span class="arithmatex">\(\overline{PR}\)</span>) and Clear (<span class="arithmatex">\(\overline{CLR}\)</span>) inputs. Given the following input sequence over 8 clock cycles (initially <span class="arithmatex">\(Q = 0\)</span>):</p>

| Cycle | <span class="arithmatex">\(J\)</span> | <span class="arithmatex">\(K\)</span> | <span class="arithmatex">\(\overline{PR}\)</span> | <span class="arithmatex">\(\overline{CLR}\)</span> |
|---|---|---|---|---|
| 1 | 1 | 0 | 1 | 1 |
| 2 | 1 | 1 | 1 | 1 |
| 3 | 0 | 1 | 1 | 1 |
| 4 | 1 | 0 | 1 | 1 |
| 5 | — | — | 0 | 1 |
| 6 | 1 | 1 | 1 | 1 |
| 7 | — | — | 1 | 0 |
| 8 | 0 | 1 | 1 | 1 |

<p style="color: #333; line-height: 1.75;">Determine <span class="arithmatex">\(Q\)</span> after each cycle.</p>

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

| Cycle | Action | <span class="arithmatex">\(Q\)</span> after |
|---|---|---|
| Start | — | 0 |
| 1 | <span class="arithmatex">\(J=1, K=0\)</span> &rarr; Set | **1** |
| 2 | <span class="arithmatex">\(J=1, K=1\)</span> &rarr; Toggle | **0** |
| 3 | <span class="arithmatex">\(J=0, K=1\)</span> &rarr; Reset | **0** |
| 4 | <span class="arithmatex">\(J=1, K=0\)</span> &rarr; Set | **1** |
| 5 | <span class="arithmatex">\(\overline{PR}=0\)</span> &rarr; Async Preset | **1** |
| 6 | <span class="arithmatex">\(J=1, K=1\)</span> &rarr; Toggle | **0** |
| 7 | <span class="arithmatex">\(\overline{CLR}=0\)</span> &rarr; Async Clear | **0** |
| 8 | <span class="arithmatex">\(J=0, K=1\)</span> &rarr; Reset | **0** |

<p style="color: #2E7D32; font-weight: 700; margin-top: 1rem; margin-bottom: 0;">Final output sequence: <span class="arithmatex">\(Q = 0, 1, 0, 0, 1, 1, 0, 0, 0\)</span></p>

</div>
</details>

</div>

---

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);" markdown>

<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Challenge 2: Design a Circuit Using D Flip-Flops from a State Table</p>

<p style="color: #333; line-height: 1.75;">Design a synchronous sequential circuit with two D flip-flops (<span class="arithmatex">\(Q_1, Q_0\)</span>) and one input <span class="arithmatex">\(X\)</span>. The state table is:</p>

| Present State (<span class="arithmatex">\(Q_1 Q_0\)</span>) | <span class="arithmatex">\(X=0\)</span> Next State | <span class="arithmatex">\(X=1\)</span> Next State |
|---|---|---|
| 00 | 01 | 10 |
| 01 | 10 | 11 |
| 10 | 11 | 00 |
| 11 | 00 | 01 |

<p style="color: #333; line-height: 1.75;">Derive the excitation equations for <span class="arithmatex">\(D_1\)</span> and <span class="arithmatex">\(D_0\)</span>.</p>

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>

From the state table, next state = present state + 1 when <span class="arithmatex">\(X=0\)</span>, and present state + 2 when <span class="arithmatex">\(X=1\)</span> (modulo 4).

**Truth table for <span class="arithmatex">\(D_1\)</span> and <span class="arithmatex">\(D_0\)</span>:**

| <span class="arithmatex">\(Q_1\)</span> | <span class="arithmatex">\(Q_0\)</span> | <span class="arithmatex">\(X\)</span> | <span class="arithmatex">\(D_1\)</span> | <span class="arithmatex">\(D_0\)</span> |
|---|---|---|---|---|
| 0 | 0 | 0 | 0 | 1 |
| 0 | 0 | 1 | 1 | 0 |
| 0 | 1 | 0 | 1 | 0 |
| 0 | 1 | 1 | 1 | 1 |
| 1 | 0 | 0 | 1 | 1 |
| 1 | 0 | 1 | 0 | 0 |
| 1 | 1 | 0 | 0 | 0 |
| 1 | 1 | 1 | 0 | 1 |

<p style="color: #2E7D32; font-weight: 700; margin-top: 1rem;">Excitation equations:</p>

<span class="arithmatex">\(D_1 = \overline{Q_1}(Q_0 + X) + Q_1\overline{Q_0}\,\overline{X}\)</span>

<span class="arithmatex">\(D_0 = Q_0 \odot X = \overline{Q_0}\,\overline{X} + Q_0\,X\)</span>

</div>
</details>

</div>

---

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);" markdown>

<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Challenge 3: Convert SR Latch to D Flip-Flop</p>

<p style="color: #333; line-height: 1.75;">Starting with a gated SR latch, show how to add logic to create a D flip-flop. Give the complete Boolean equations for the <span class="arithmatex">\(S\)</span> and <span class="arithmatex">\(R\)</span> inputs in terms of the <span class="arithmatex">\(D\)</span> input and the clock <span class="arithmatex">\(CLK\)</span>.</p>

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Connection:</p>

<span class="arithmatex">\(S = D \cdot CLK\)</span>

<span class="arithmatex">\(R = \overline{D} \cdot CLK\)</span>

<p style="color: #333; line-height: 1.75;">When <span class="arithmatex">\(CLK = 1\)</span>: if <span class="arithmatex">\(D = 1\)</span>, then <span class="arithmatex">\(S = 1, R = 0\)</span> (sets the latch); if <span class="arithmatex">\(D = 0\)</span>, then <span class="arithmatex">\(S = 0, R = 1\)</span> (resets the latch). When <span class="arithmatex">\(CLK = 0\)</span>: <span class="arithmatex">\(S = R = 0\)</span> (latch holds).</p>

<p style="color: #333; line-height: 1.75; margin-bottom: 0;">This requires only <strong>1 inverter</strong> (for <span class="arithmatex">\(\overline{D}\)</span>) beyond the gated SR latch, since the AND gates for <span class="arithmatex">\(S\)</span> and <span class="arithmatex">\(R\)</span> are already part of the gated SR latch structure.</p>

</div>
</details>

</div>

---

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);" markdown>

<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Challenge 4: Setup/Hold Time Violations</p>

<p style="color: #333; line-height: 1.75;">A D flip-flop has <span class="arithmatex">\(t_{setup} = 3\text{ ns}\)</span>, <span class="arithmatex">\(t_{hold} = 1\text{ ns}\)</span>, and <span class="arithmatex">\(t_{clk\text{-}to\text{-}Q} = 5\text{ ns}\)</span>. The clock period is 20 ns. Data arrives at the D input through a combinational logic block with propagation delay <span class="arithmatex">\(t_{pd}\)</span>.</p>

<p style="color: #333; line-height: 1.75;">(a) What is the maximum <span class="arithmatex">\(t_{pd}\)</span> for reliable operation?<br>
(b) If the data path has a minimum delay of <span class="arithmatex">\(t_{pd,min}\)</span>, what is the constraint on <span class="arithmatex">\(t_{pd,min}\)</span> to avoid hold time violations?<br>
(c) If <span class="arithmatex">\(t_{pd} = 14\text{ ns}\)</span> and <span class="arithmatex">\(t_{pd,min} = 0.5\text{ ns}\)</span>, are there any violations?</p>

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">(a) Setup time constraint:</p>

<span class="arithmatex">\(t_{clk\text{-}to\text{-}Q} + t_{pd} + t_{setup} \leq T_{clk}\)</span>

<span class="arithmatex">\(5 + t_{pd} + 3 \leq 20\)</span> &rarr; **Maximum <span class="arithmatex">\(t_{pd} = 12\)</span> ns**

<p style="color: #2E7D32; font-weight: 700;">(b) Hold time constraint:</p>

<span class="arithmatex">\(t_{clk\text{-}to\text{-}Q} + t_{pd,min} \geq t_{hold}\)</span>

<span class="arithmatex">\(5 + t_{pd,min} \geq 1\)</span> &rarr; <span class="arithmatex">\(t_{pd,min} \geq -4\text{ ns}\)</span>

Since delays are non-negative, the hold time constraint is **always satisfied**.

<p style="color: #2E7D32; font-weight: 700;">(c) With <span class="arithmatex">\(t_{pd} = 14\)</span> ns and <span class="arithmatex">\(t_{pd,min} = 0.5\)</span> ns:</p>

- Setup: <span class="arithmatex">\(5 + 14 + 3 = 22 > 20\)</span> &rarr; **Setup time violation!**
- Hold: <span class="arithmatex">\(5 + 0.5 = 5.5 > 1\)</span> &rarr; Hold time satisfied

<p style="color: #333; line-height: 1.75; margin-bottom: 0;"><strong>There is a setup time violation.</strong> The combinational logic is too slow for the clock frequency.</p>

</div>
</details>

</div>

---

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);" markdown>

<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Challenge 5: Master-Slave JK Flip-Flop Race Condition Analysis</p>

<p style="color: #333; line-height: 1.75;">Explain the "ones catching" problem in a master-slave JK flip-flop. Given the following scenario:</p>

- <span class="arithmatex">\(J = 1\)</span>, <span class="arithmatex">\(K = 0\)</span> at the rising edge of CLK
- During the high phase of CLK, noise causes <span class="arithmatex">\(J\)</span> to briefly go to 0 and <span class="arithmatex">\(K\)</span> to briefly go to 1
- <span class="arithmatex">\(J\)</span> returns to 1, <span class="arithmatex">\(K\)</span> returns to 0 before the falling edge

<p style="color: #333; line-height: 1.75;">What is the final state of <span class="arithmatex">\(Q\)</span> if the master latch is level-sensitive? What would happen with an edge-triggered design instead?</p>

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Master-slave (level-sensitive master):</p>

1. At rising edge: <span class="arithmatex">\(J=1, K=0\)</span> &rarr; master sets to 1
2. During high phase, noise makes <span class="arithmatex">\(J=0, K=1\)</span> &rarr; master resets to 0 (ones catching!)
3. <span class="arithmatex">\(J\)</span> returns to 1, <span class="arithmatex">\(K\)</span> returns to 0 &rarr; master sets back to 1
4. At falling edge: slave captures master = 1 &rarr; <span class="arithmatex">\(Q = 1\)</span>

In this specific case, the final answer is **<span class="arithmatex">\(Q = 1\)</span>**, which happens to be correct. But if the noise sequence were different (e.g., <span class="arithmatex">\(K\)</span> glitches to 1 just before the falling edge and the master captures it), the result could be incorrect.

<p style="color: #2E7D32; font-weight: 700;">The "ones catching" problem:</p>

The master latch is transparent while CLK is high, so any glitch during this time can corrupt the stored value.

<p style="color: #2E7D32; font-weight: 700;">Edge-triggered design:</p>

<p style="color: #333; line-height: 1.75; margin-bottom: 0;">Only samples <span class="arithmatex">\(J\)</span> and <span class="arithmatex">\(K\)</span> at the clock edge instant. Noise during the high phase of CLK has <strong>no effect</strong> on the output. The edge-triggered flip-flop would reliably output <span class="arithmatex">\(Q = 1\)</span> based on the values at the triggering edge.</p>

</div>
</details>

</div>

</div>
