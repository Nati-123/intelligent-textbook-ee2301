---
title: Bubble Pushing Simulator
description: Interactive visualization of De Morgan's theorem through bubble pushing gate conversion
image: /sims/bubble-pushing-simulator/bubble-pushing-simulator.png
quality_score: 85
---

<h1 style="color: #5A3EED !important; border-bottom: 3px solid #5A3EED; padding-bottom: 0.4rem; font-weight: 800;">Bubble Pushing Simulator</h1>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="main.html" height="580px" width="100%" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

<a href="../../unit7-multi-level-gates/" style="color: #5A3EED; font-weight: 600; font-size: 0.95rem;">&#8592; Back to Unit 7</a>

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">Description</h2>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
This MicroSim demonstrates the bubble pushing technique used to convert between different gate implementations in digital logic circuits. Bubble pushing is a visual method for applying De Morgan's theorems, where inversion bubbles are moved through gates, changing AND gates to OR gates and vice versa. The simulation walks through a step-by-step conversion of an AND-OR circuit (F = AB + CD) into a NAND-only implementation.
</p>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 20px 24px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(184,134,11,0.08);">
<p style="color: #B8860B; font-weight: 700; margin-top: 0; margin-bottom: 8px;">Key Features</p>
<ul style="list-style: none; padding-left: 0; margin: 0;">
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #B8860B; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> Step-by-step animated circuit transformation</li>
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #B8860B; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> Visual representation of inversion bubbles on gate inputs and outputs</li>
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #B8860B; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> Gate type changes displayed as bubbles pass through</li>
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #B8860B; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> Clear labeling of each transformation step with Boolean expressions</li>
<li style="margin-bottom: 0; line-height: 1.75; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #B8860B; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> Step and Reset buttons for controlled progression</li>
</ul>
</div>

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">Learning Objectives</h2>

<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 12px; padding: 20px 24px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(56,142,60,0.08);">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0; margin-bottom: 6px;">Bloom Level: Analyze (L4)</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0.6rem;">After using this MicroSim, students will be able to:</p>
<ul style="list-style: none; padding-left: 0; margin: 0;">
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #2E7D32; font-weight: 700; margin-right: 0.4rem;">&#10003;</span> Apply De Morgan's theorem to convert between gate types using bubble pushing</li>
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #2E7D32; font-weight: 700; margin-right: 0.4rem;">&#10003;</span> Transform an AND-OR (SOP) circuit into a NAND-only implementation</li>
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #2E7D32; font-weight: 700; margin-right: 0.4rem;">&#10003;</span> Explain why two bubbles on the same wire cancel each other out</li>
<li style="margin-bottom: 0; line-height: 1.75; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #2E7D32; font-weight: 700; margin-right: 0.4rem;">&#10003;</span> Analyze the equivalence of different circuit implementations for the same Boolean function</li>
</ul>
</div>

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">How to Use</h2>

<ol style="padding-left: 1.2rem; margin: 0.8rem 0 1.2rem 0;">
<li style="margin-bottom: 0.6rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">View</strong> the original AND-OR circuit displayed in Step 1</li>
<li style="margin-bottom: 0.6rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Click</strong> the Step button to advance to the next transformation</li>
<li style="margin-bottom: 0.6rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Observe</strong> how inversion bubbles are inserted at AND outputs and OR inputs</li>
<li style="margin-bottom: 0.6rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Watch</strong> bubbles push through gates, changing AND to NAND and OR to NAND</li>
<li style="margin-bottom: 0.6rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Verify</strong> the final NAND-only implementation is functionally equivalent</li>
<li style="margin-bottom: 0; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Click</strong> Reset to return to the original circuit and repeat</li>
</ol>

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">Lesson Plan</h2>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">Before the Simulation (5 minutes)</h3>

<ul style="padding-left: 1.2rem; margin: 0.4rem 0 0.8rem 0;">
<li style="margin-bottom: 0.4rem; line-height: 1.75; color: #333;">Review De Morgan's theorems: NOT(A AND B) = NOT A OR NOT B, and NOT(A OR B) = NOT A AND NOT B</li>
<li style="margin-bottom: 0.4rem; line-height: 1.75; color: #333;">Explain why NAND-only and NOR-only implementations are desirable in CMOS design</li>
<li style="margin-bottom: 0; line-height: 1.75; color: #333;">Introduce bubble pushing as a visual shortcut for applying De Morgan's theorem</li>
</ul>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">During the Simulation (15 minutes)</h3>

<ol style="padding-left: 1.2rem; margin: 0.4rem 0 0.8rem 0;">
<li style="margin-bottom: 0.4rem; line-height: 1.75; color: #333;">Start with the original AND-OR circuit and identify F = AB + CD</li>
<li style="margin-bottom: 0.4rem; line-height: 1.75; color: #333;">Step forward to see bubble pairs inserted at the AND-to-OR boundary</li>
<li style="margin-bottom: 0.4rem; line-height: 1.75; color: #333;">Observe that paired bubbles cancel, preserving logical equivalence</li>
<li style="margin-bottom: 0.4rem; line-height: 1.75; color: #333;">Watch the AND gates become NAND gates and the OR gate become a NAND gate</li>
<li style="margin-bottom: 0.4rem; line-height: 1.75; color: #333;">Verify the final NAND-only circuit still implements F = AB + CD</li>
<li style="margin-bottom: 0; line-height: 1.75; color: #333;">Reset and step through again, explaining each transformation out loud</li>
</ol>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">After the Simulation (5 minutes)</h3>

<ul style="padding-left: 1.2rem; margin: 0.4rem 0 0.8rem 0;">
<li style="margin-bottom: 0.4rem; line-height: 1.75; color: #333;">Practice bubble pushing on a different SOP expression (e.g., F = AB + C)</li>
<li style="margin-bottom: 0.4rem; line-height: 1.75; color: #333;">Discuss how to convert to NOR-only implementation using the same technique</li>
<li style="margin-bottom: 0; line-height: 1.75; color: #333;">Connect to physical CMOS gate implementation where NAND and NOR are natural</li>
</ul>

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">References</h2>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 20px 24px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<ul style="list-style: none; padding-left: 0; margin: 0;">
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> <a href="https://en.wikipedia.org/wiki/De_Morgan%27s_laws" style="color: #5A3EED; font-weight: 600;">De Morgan's Laws - Wikipedia</a></li>
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> <a href="https://en.wikipedia.org/wiki/NAND_logic" style="color: #5A3EED; font-weight: 600;">NAND Logic - Wikipedia</a></li>
<li style="margin-bottom: 0; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> <a href="../../unit7-multi-level-gates/" style="color: #5A3EED; font-weight: 600;">Unit 7: Multi-Level Gate Circuits</a></li>
</ul>
</div>
