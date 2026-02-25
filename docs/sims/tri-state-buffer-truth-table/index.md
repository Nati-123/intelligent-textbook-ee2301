---
title: Tri-State Buffer with Truth Table
description: Interactive tri-state buffer simulation with clickable inputs, enable control, and high-impedance state demonstration for digital logic education
image: /sims/tri-state-buffer-truth-table/tri-state-buffer-truth-table.png
quality_score: 85
---

<h1 style="color: #5A3EED !important; border-bottom: 3px solid #5A3EED; padding-bottom: 0.4rem; font-weight: 800;">Tri-State Buffer with Truth Table</h1>

<a href="../../unit2-boolean-algebra/" style="color: #5A3EED; font-weight: 600; font-size: 0.95rem;">&#8592; Back to Unit 2</a>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="main.html" height="480px" width="100%" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">Description</h2>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">This MicroSim provides an interactive demonstration of the tri-state buffer, a critical component in digital systems that enables shared bus architectures. Unlike standard logic gates that output only 0 or 1, the tri-state buffer has a third output state: high-impedance (Z), which electrically disconnects the output from the bus. The simulation displays the tri-state buffer symbol (triangle with an enable control input from the top) with a data input (A), an enable input (EN), and one output (Y).</p>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">Students can toggle both the data input and the enable signal using clickable buttons. The simulation updates in real time, showing a four-row truth table that includes the high-impedance (Z) state displayed in amber to distinguish it from logic 0 and logic 1. When EN is LOW, the output is Z regardless of input A. When EN is HIGH, the output follows input A.</p>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 10px; padding: 20px 24px; margin: 1.2rem 0;">
<p style="color: #B8860B; font-weight: 700; font-size: 1.05rem; margin-top: 0; margin-bottom: 12px;">Key Features</p>
<ul style="list-style: none; padding-left: 0; margin: 0;">
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> Tri-state buffer symbol (triangle with enable input from top) with input and output wires</li>
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> Two clickable toggle buttons for data input A and enable EN</li>
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> Four-row truth table showing Z output when EN = 0</li>
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> High-impedance state displayed in amber color to distinguish from logic levels</li>
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> Key insight box explaining bus sharing and electrical disconnection</li>
</ul>
</div>

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">How to Use</h2>

<ol style="padding-left: 1.2rem; margin: 0.8rem 0 1.2rem 0;">
<li style="margin-bottom: 0.6rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Observe</strong> the tri-state buffer symbol (note the enable input from the top) and the truth table displayed on screen.</li>
<li style="margin-bottom: 0.6rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Click</strong> the toggle button next to <strong>EN</strong> (enable) to switch it between 0 and 1.</li>
<li style="margin-bottom: 0.6rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Click</strong> the toggle button next to input <strong>A</strong> to switch it between 0 and 1.</li>
<li style="margin-bottom: 0.6rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Verify</strong> that when EN = 0, the output shows <strong>Z</strong> (high-impedance) regardless of input A.</li>
<li style="margin-bottom: 0.6rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Verify</strong> that when EN = 1, the output follows input A.</li>
<li style="margin-bottom: 0.6rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Notice</strong> the amber color used for the Z state to distinguish it from logic 0 and 1.</li>
<li style="margin-bottom: 0.6rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Examine</strong> the truth table highlighting to see which row corresponds to the current inputs.</li>
</ol>

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">Learning Objectives</h2>

<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 12px; padding: 20px 24px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(56,142,60,0.08);">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0; margin-bottom: 6px;">Bloom Level: Understand (L2)</p>
<p style="color: #333; margin-top: 0.5rem; margin-bottom: 0.8rem;">After using this MicroSim, students will be able to:</p>
<ul style="list-style: none; padding-left: 0; margin: 0;">
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #2E7D32; font-weight: 700; margin-right: 0.4rem;">&#10003;</span> Explain the three output states of a tri-state buffer (0, 1, and high-impedance Z)</li>
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #2E7D32; font-weight: 700; margin-right: 0.4rem;">&#10003;</span> Distinguish high-impedance (Z) from logic 0, understanding that Z means electrically disconnected</li>
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #2E7D32; font-weight: 700; margin-right: 0.4rem;">&#10003;</span> Describe why tri-state buffers are essential for shared bus architectures in digital systems</li>
</ul>
</div>

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">Lesson Plan</h2>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.5rem; margin-bottom: 0.6rem;">Before the Simulation (5 minutes)</h3>

<ul style="padding-left: 1.2rem; margin: 0.5rem 0 1rem 0;">
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333;">Review the standard buffer gate (output follows input)</li>
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333;">Ask students: "What happens if two gates try to drive the same wire with different values?"</li>
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333;">Introduce the concept of high-impedance (Z) as electrical disconnection</li>
</ul>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.5rem; margin-bottom: 0.6rem;">During the Simulation (15 minutes)</h3>

<ol style="padding-left: 1.2rem; margin: 0.5rem 0 1rem 0;">
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333;">Start with EN = 0, A = 0 and observe that the output is Z (disconnected)</li>
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333;">Toggle A to 1 -- output remains Z (enable is off, input does not matter)</li>
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333;">Toggle EN to 1 -- output becomes 1 (now follows input A)</li>
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333;">Toggle A to 0 -- output becomes 0 (follows input)</li>
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333;">Toggle EN back to 0 -- output returns to Z</li>
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333;">Discuss: Z is not 0 -- it means the output is electrically disconnected, allowing other devices to drive the bus</li>
</ol>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.5rem; margin-bottom: 0.6rem;">After the Simulation (5 minutes)</h3>

<ul style="padding-left: 1.2rem; margin: 0.5rem 0 1rem 0;">
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333;">Draw a simple bus architecture with multiple tri-state buffers sharing one wire</li>
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333;">Explain that only one buffer should be enabled at a time to avoid bus contention</li>
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333;">Connect tri-state buffers to real-world applications: memory buses, I/O interfaces, and CPU data buses</li>
</ul>

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">References</h2>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 20px 24px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<ul style="list-style: none; padding-left: 0; margin: 0;">
<li style="margin-bottom: 0.5rem; line-height: 1.75;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> <a href="https://en.wikipedia.org/wiki/Three-state_logic" style="color: #5A3EED; font-weight: 600;">Three-state logic - Wikipedia</a></li>
<li style="margin-bottom: 0.5rem; line-height: 1.75;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> <a href="https://en.wikipedia.org/wiki/Bus_(computing)" style="color: #5A3EED; font-weight: 600;">Bus (computing) - Wikipedia</a></li>
<li style="margin-bottom: 0.5rem; line-height: 1.75;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> <a href="../../unit2-boolean-algebra/" style="color: #5A3EED; font-weight: 600;">Unit 3: Logic Gates and Boolean Algebra</a></li>
</ul>
</div>
