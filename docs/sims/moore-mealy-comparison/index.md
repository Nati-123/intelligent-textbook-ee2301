---
title: Moore vs Mealy Machine Comparison
description: Interactive side-by-side comparison of Moore and Mealy state machines implementing a 101 sequence detector
image: /sims/moore-mealy-comparison/moore-mealy-comparison.png
quality_score: 88
---

<h1 style="color: #5A3EED !important; border-bottom: 3px solid #5A3EED; padding-bottom: 0.4rem; font-weight: 800;">Moore vs Mealy Machine Comparison</h1>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1.2rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="main.html" height="632px" width="100%" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

[Run Moore vs Mealy Comparison Fullscreen](./main.html){ .md-button .md-button--primary }

<a href="../../unit10-sequential-design/" style="color: #5A3EED; font-weight: 600; font-size: 0.95rem;">&#8592; Back to Unit 10</a>

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">Description</h2>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
This MicroSim provides a side-by-side comparison of Moore and Mealy finite state machines, both implementing a "101" sequence detector. The simulation highlights the fundamental architectural difference between these two state machine types: in a Moore machine, outputs depend only on the current state, while in a Mealy machine, outputs depend on both the current state and the current input.
</p>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
Both machines process the same input sequence simultaneously, allowing students to directly observe how the Moore machine requires an extra state (4 states vs 3) to encode the output, and how the Mealy machine produces its output one clock cycle earlier than the Moore machine. The timing comparison at the bottom of the simulation makes this timing difference visually clear.
</p>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 20px 24px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(184,134,11,0.08);">
<p style="color: #B8860B; font-weight: 700; margin-top: 0; margin-bottom: 8px;">Key Differences Illustrated</p>
<ul style="list-style: none; padding-left: 0; margin: 0;">
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #B8860B; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> <strong>Moore:</strong> Outputs labeled inside state circles (State/Output notation)</li>
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #B8860B; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> <strong>Mealy:</strong> Outputs labeled on transition arrows (Input/Output notation)</li>
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #B8860B; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> <strong>State count:</strong> Moore needs 4 states, Mealy needs only 3 states</li>
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #B8860B; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> <strong>Timing:</strong> Mealy output responds immediately; Moore output is delayed by one clock</li>
<li style="margin-bottom: 0; line-height: 1.75; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #B8860B; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> <strong>Detection flash:</strong> Visual highlighting when "101" is detected in each machine</li>
</ul>
</div>

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">Learning Objectives</h2>

<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 12px; padding: 20px 24px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(56,142,60,0.08);">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0; margin-bottom: 6px;">Bloom Level: Analyze (L4)</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0.6rem;">After using this MicroSim, students will be able to:</p>
<ul style="list-style: none; padding-left: 0; margin: 0;">
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #2E7D32; font-weight: 700; margin-right: 0.4rem;">&#10003;</span> Compare and contrast Moore and Mealy machine architectures</li>
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #2E7D32; font-weight: 700; margin-right: 0.4rem;">&#10003;</span> Trace state transitions for a given input sequence in both machine types</li>
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #2E7D32; font-weight: 700; margin-right: 0.4rem;">&#10003;</span> Identify when outputs change relative to clock edges in each machine type</li>
<li style="margin-bottom: 0; line-height: 1.75; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #2E7D32; font-weight: 700; margin-right: 0.4rem;">&#10003;</span> Evaluate trade-offs between Moore and Mealy implementations</li>
</ul>
</div>

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">How to Use</h2>

<ol style="padding-left: 1.2rem; margin: 0.8rem 0 1.2rem 0;">
<li style="margin-bottom: 0.6rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Observe</strong> the two state diagrams side by side: Moore (left) with outputs on states, Mealy (right) with outputs on transitions</li>
<li style="margin-bottom: 0.6rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Click "Input 0"</strong> to feed a 0 bit into both machines simultaneously</li>
<li style="margin-bottom: 0.6rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Click "Input 1"</strong> to feed a 1 bit into both machines simultaneously</li>
<li style="margin-bottom: 0.6rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Watch</strong> the active state highlight move through each state diagram as transitions occur</li>
<li style="margin-bottom: 0.6rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Enter "1, 0, 1"</strong> to trigger detection and observe the "DETECTED!" flash on each machine</li>
<li style="margin-bottom: 0.6rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Compare</strong> the input/output histories and timing diagram at the bottom to see when each machine asserts its output</li>
<li style="margin-bottom: 0; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Click "Reset"</strong> to return both machines to their initial states and start a new sequence</li>
</ol>

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">Lesson Plan</h2>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">Before the Simulation (5 minutes)</h3>

<ul style="padding-left: 1.2rem; margin: 0.4rem 0 0.8rem 0;">
<li style="margin-bottom: 0.4rem; line-height: 1.75; color: #333;">Review the definitions of Moore and Mealy machines and their output dependencies</li>
<li style="margin-bottom: 0.4rem; line-height: 1.75; color: #333;">Introduce the "101" sequence detection problem as a motivating example</li>
<li style="margin-bottom: 0; line-height: 1.75; color: #333;">Ask students to predict how many states each machine type will need</li>
</ul>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">During the Simulation (15 minutes)</h3>

<ol style="padding-left: 1.2rem; margin: 0.4rem 0 0.8rem 0;">
<li style="margin-bottom: 0.4rem; line-height: 1.75; color: #333;">Enter the sequence 1-0-1 and observe detection in both machines</li>
<li style="margin-bottom: 0.4rem; line-height: 1.75; color: #333;">Compare the output histories: note that the Mealy machine outputs 1 on the same step as the input, while Moore outputs 1 after transitioning to the detection state</li>
<li style="margin-bottom: 0.4rem; line-height: 1.75; color: #333;">Continue entering bits (0-1) to see overlapping detection behavior</li>
<li style="margin-bottom: 0.4rem; line-height: 1.75; color: #333;">Study the timing comparison diagram to understand the one-clock-cycle difference</li>
<li style="margin-bottom: 0.4rem; line-height: 1.75; color: #333;">Count states in each machine and discuss why Moore needs an extra state</li>
<li style="margin-bottom: 0; line-height: 1.75; color: #333;">Have students draw state transition tables for both machines based on their observations</li>
</ol>

<h3 style="color: #5A3EED; font-weight: 600; margin-top: 1.2rem;">After the Simulation (5 minutes)</h3>

<ul style="padding-left: 1.2rem; margin: 0.4rem 0 0.8rem 0;">
<li style="margin-bottom: 0.4rem; line-height: 1.75; color: #333;">Discuss when you would choose Moore over Mealy (glitch-free outputs, simpler output logic) and vice versa (fewer states, faster response)</li>
<li style="margin-bottom: 0.4rem; line-height: 1.75; color: #333;">Ask students to design both machine types on paper for a different pattern (e.g., "110")</li>
<li style="margin-bottom: 0; line-height: 1.75; color: #333;">Connect to VHDL implementation: Moore uses a single process for outputs, Mealy needs combinational output logic that depends on inputs</li>
</ul>

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">References</h2>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 20px 24px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<ul style="list-style: none; padding-left: 0; margin: 0;">
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> <a href="https://en.wikipedia.org/wiki/Moore_machine" style="color: #5A3EED; font-weight: 600;">Moore Machine - Wikipedia</a></li>
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> <a href="https://en.wikipedia.org/wiki/Mealy_machine" style="color: #5A3EED; font-weight: 600;">Mealy Machine - Wikipedia</a></li>
<li style="margin-bottom: 0.5rem; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> <a href="https://en.wikipedia.org/wiki/Finite-state_machine" style="color: #5A3EED; font-weight: 600;">Finite-State Machine - Wikipedia</a></li>
<li style="margin-bottom: 0; line-height: 1.75; color: #333;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> <a href="../../unit10-sequential-design/" style="color: #5A3EED; font-weight: 600;">Unit 10: Sequential Circuit Design</a></li>
</ul>
</div>
