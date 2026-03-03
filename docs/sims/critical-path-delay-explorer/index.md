---
title: Critical Path Delay Explorer
description: Interactive visualization of propagation delay through multi-level gate circuits with adjustable gate delays and critical path highlighting
quality_score: 85
---

<h1 style="color: #5A3EED !important; border-bottom: 3px solid #5A3EED; padding-bottom: 0.4rem; font-weight: 800;">Critical Path Delay Explorer</h1>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="main.html" height="582px" width="100%" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

<a href="main.html" target="_blank" style="display:inline-block; margin:0.5rem 0 1rem 0; padding:8px 18px; background:#5A3EED; color:#fff !important; border-radius:8px; font-weight:700; font-size:0.97rem; text-decoration:none; letter-spacing:0.3px; box-shadow:0 2px 8px rgba(90,62,237,0.10);">Open Fullscreen</a>

<a href="../../unit7-multi-level-gates/" style="color: #5A3EED; font-weight: 600; font-size: 0.95rem;">&#8592; Back to Unit 7: Multi-Level Gate Circuits</a>

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">Description</h2>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
Explore how signal propagation delay accumulates through a multi-level combinational circuit. This MicroSim visualizes a 3-level gate network with NOT, AND, and OR gates. Each gate has a configurable delay, and the simulator computes all input-to-output paths, highlights the critical path (longest total delay) in red, and displays a detailed breakdown of every path's delay. Adjust individual gate delays to see how the critical path shifts in real time.
</p>

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">Learning Objectives</h2>

<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 12px; padding: 20px 24px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(56,142,60,0.08);">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0; margin-bottom: 6px;">Bloom Level: Analyze (L4)</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0.6rem;">After using this MicroSim, students will be able to:</p>
<ul style="list-style: none; padding-left: 0; margin: 0;">
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #2E7D32; font-weight: 700; margin-right: 0.4rem;">&#10003;</span> Identify the critical path in a multi-level gate circuit</li>
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #2E7D32; font-weight: 700; margin-right: 0.4rem;">&#10003;</span> Calculate total propagation delay along each input-to-output path</li>
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #2E7D32; font-weight: 700; margin-right: 0.4rem;">&#10003;</span> Understand how gate delays combine in series through multiple logic levels</li>
<li style="margin-bottom: 0; line-height: 1.75; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #2E7D32; font-weight: 700; margin-right: 0.4rem;">&#10003;</span> Predict how changing a single gate delay affects which path becomes critical</li>
</ul>
</div>

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">How to Use</h2>

<ol style="padding-left: 1.2rem; margin: 0.8rem 0 1.2rem 0;">
<li style="margin-bottom: 0.6rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Observe</strong> the 3-level gate circuit diagram with inputs A, B, C, D flowing through gates to output F</li>
<li style="margin-bottom: 0.6rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Identify</strong> the critical path highlighted in red &mdash; this is the longest delay path from any input to the output</li>
<li style="margin-bottom: 0.6rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Read</strong> the path delay analysis table to see the delay breakdown for all five input-to-output paths</li>
<li style="margin-bottom: 0.6rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Adjust</strong> individual gate delays using the +/&minus; buttons in the control area at the bottom</li>
<li style="margin-bottom: 0; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Experiment</strong> to find delay settings that shift the critical path from one route to another</li>
</ol>

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">Circuit Topology</h2>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
The circuit implements <strong>F = (A' + B&middot;C) &middot; (C&middot;D)</strong> using five gates across three levels:
</p>

<ul style="padding-left: 1.2rem; margin: 0.8rem 0 1.2rem 0;">
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333;"><strong>Level 1:</strong> G1 = NOT(A), G2 = AND(B, C)</li>
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333;"><strong>Level 2:</strong> G3 = OR(G1, G2), G4 = AND(C, D)</li>
<li style="margin-bottom: 0; line-height: 1.75; color: #333;"><strong>Level 3:</strong> G5 = AND(G3, G4) &rarr; Output F</li>
</ul>

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">References</h2>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 20px 24px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<ul style="list-style: none; padding-left: 0; margin: 0;">
<li style="margin-bottom: 0; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> <a href="../../unit7-multi-level-gates/" style="color: #5A3EED; font-weight: 600;">Unit 7: Multi-Level Gate Circuits</a> &mdash; Propagation Delay and Critical Path Analysis</li>
</ul>
</div>
