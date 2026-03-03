---
title: Setup & Hold Time / Metastability Explorer
description: Interactive visualization of setup time, hold time, and metastability in edge-triggered flip-flops
quality_score: 88
---

<h1 style="color: #5A3EED !important; border-bottom: 3px solid #5A3EED; padding-bottom: 0.4rem; font-weight: 800;">Setup &amp; Hold Time / Metastability Explorer</h1>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="main.html" height="582px" width="100%" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

<a href="../../unit9-sequential-fundamentals/" style="color: #5A3EED; font-weight: 600; font-size: 0.95rem;">&#8592; Back to Unit 9</a>

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">Description</h2>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
This MicroSim helps students understand three critical concepts in synchronous digital design: <strong>setup time</strong>, <strong>hold time</strong>, and <strong>metastability</strong>. A positive-edge-triggered D flip-flop is shown alongside a timing diagram with CLK, D, and Q waveforms. Students drag a data-transition marker to move the D signal transition left and right relative to the rising clock edge, watching in real time how the flip-flop output changes from a valid capture (green), through a marginal zone (yellow), to a timing violation that produces metastability (red).
</p>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
The setup time (<em>t<sub>su</sub></em>) is the minimum time the data input must be stable <strong>before</strong> the clock edge, and the hold time (<em>t<sub>h</sub></em>) is the minimum time data must remain stable <strong>after</strong> the clock edge. When either constraint is violated, the flip-flop may enter a <strong>metastable state</strong>&mdash;an indeterminate condition where the output oscillates unpredictably before eventually settling to 0 or 1. Metastability is a fundamental hazard in digital systems and is a key reason why careful timing analysis is essential.
</p>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 20px 24px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(184,134,11,0.08);">
<p style="color: #B8860B; font-weight: 700; margin-top: 0; margin-bottom: 8px;">Key Features</p>
<ul style="list-style: none; padding-left: 0; margin: 0;">
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #B8860B; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> Draggable data-transition marker to explore timing interactively</li>
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #B8860B; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> Color-coded zones: green (valid), yellow (marginal), red (violation/metastable)</li>
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #B8860B; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> Shaded setup and hold time windows on the timing diagram</li>
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #B8860B; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> Animated metastable oscillation on Q when timing is violated</li>
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #B8860B; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> Adjustable setup and hold time requirements via sliders</li>
<li style="margin-bottom: 0; line-height: 1.75; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #B8860B; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> Flip-flop symbol that changes color to indicate current state</li>
</ul>
</div>

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">Learning Objectives</h2>

<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 12px; padding: 20px 24px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(56,142,60,0.08);">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0; margin-bottom: 6px;">Bloom Level: Understand (L2)</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0.6rem;">After using this MicroSim, students will be able to:</p>
<ul style="list-style: none; padding-left: 0; margin: 0;">
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #2E7D32; font-weight: 700; margin-right: 0.4rem;">&#10003;</span> Explain the meaning of setup time and hold time constraints for edge-triggered flip-flops</li>
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #2E7D32; font-weight: 700; margin-right: 0.4rem;">&#10003;</span> Identify when a data signal violates setup or hold timing constraints</li>
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #2E7D32; font-weight: 700; margin-right: 0.4rem;">&#10003;</span> Describe the consequences of setup/hold violations, including metastability</li>
<li style="margin-bottom: 0; line-height: 1.75; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #2E7D32; font-weight: 700; margin-right: 0.4rem;">&#10003;</span> Relate timing margins to reliable flip-flop operation in synchronous designs</li>
</ul>
</div>

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">How to Use</h2>

<ol style="padding-left: 1.2rem; margin: 0.8rem 0 1.2rem 0;">
<li style="margin-bottom: 0.6rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Observe</strong> the timing diagram showing CLK, D, and Q waveforms with the setup and hold windows shaded around the rising clock edge</li>
<li style="margin-bottom: 0.6rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Drag</strong> the orange data-transition marker left or right to move where D changes relative to the clock edge</li>
<li style="margin-bottom: 0.6rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Watch</strong> the status panel change from green (valid capture) to yellow (marginal) to red (metastable) as the data transition enters the forbidden zone</li>
<li style="margin-bottom: 0.6rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Notice</strong> the Q output: it shows a clean 0 or 1 when timing is met, but displays an oscillating "?" when a violation occurs</li>
<li style="margin-bottom: 0.6rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Adjust</strong> the setup time (tsu) and hold time (th) sliders to see how different flip-flop specifications change the size of the forbidden window</li>
<li style="margin-bottom: 0; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Experiment</strong> with extreme slider values to understand how tighter timing constraints make violations more likely</li>
</ol>

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">References</h2>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 20px 24px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<ul style="list-style: none; padding-left: 0; margin: 0;">
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> <a href="https://en.wikipedia.org/wiki/Flip-flop_(electronics)#Timing_considerations" style="color: #5A3EED; font-weight: 600;">Flip-Flop Timing Considerations - Wikipedia</a></li>
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> <a href="https://en.wikipedia.org/wiki/Metastability_(electronics)" style="color: #5A3EED; font-weight: 600;">Metastability (Electronics) - Wikipedia</a></li>
<li style="margin-bottom: 0; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> <a href="../../unit9-sequential-fundamentals/" style="color: #5A3EED; font-weight: 600;">Unit 9: Sequential Logic Fundamentals</a></li>
</ul>
</div>
