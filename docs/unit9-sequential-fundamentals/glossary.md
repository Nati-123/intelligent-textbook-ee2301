---
title: Unit 9 Glossary - Sequential Logic Fundamentals
description: Key terms and definitions for latches, flip-flops, clocking, timing parameters, and sequential circuit foundations
---

<div class="problems-styled" markdown>

<h1 style="color: #5A3EED !important; border-bottom: 3px solid #5A3EED; padding-bottom: 0.4rem; font-weight: 800; margin-bottom: 1.5rem;">Glossary: Sequential Logic Fundamentals</h1>

<p style="color: #555; line-height: 1.85; font-size: 1.05rem; margin-bottom: 2rem;">
Key terms and definitions for Unit 9. Definitions follow ISO 11179 metadata registry standards.
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">A</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Asynchronous Reset</strong> — A flip-flop control input that immediately forces the output to 0 regardless of the clock state, overriding normal clocked operation for initialization or emergency conditions.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Asynchronous Sequential Circuit</strong> — A sequential circuit in which state changes can occur at any time in response to input changes, without a synchronizing clock signal, making it faster but more susceptible to race conditions and hazards.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">B</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Bistable Element</strong> — A circuit with exactly two stable operating states, formed by cross-coupled inverters or gates with feedback, providing the fundamental physical mechanism for storing one bit of information.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">C</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Characteristic Table</strong> — A table that defines the next state of a flip-flop based on its current inputs and, for some types, the current state, describing the device's behavior from the perspective of "given inputs, find next state."</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Clock Signal</strong> — A periodic square wave that alternates between logic 0 and logic 1, serving as the timing reference that synchronizes all state changes in a synchronous sequential circuit.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Clock-to-Q Delay</strong> — The time elapsed from the active clock edge until the flip-flop output Q settles to its new valid logic level, representing the flip-flop's output propagation delay.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">D</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">D Flip-Flop</strong> — An edge-triggered memory element with a single data input D whose value is captured at the active clock edge and held at output Q until the next active edge, with the characteristic equation Q_next = D.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">D Latch</strong> — A level-sensitive memory element that passes its data input D directly to output Q while the enable signal is active (transparent mode) and holds the last captured value when the enable goes inactive.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Duty Cycle</strong> — The percentage of a clock signal's period during which the signal is at logic high, expressed as the ratio of high time to total period.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">E</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Edge Detector</strong> — A small sequential circuit that produces a single-clock-cycle pulse when it detects a rising edge, falling edge, or both on an input signal, typically implemented using a flip-flop and combinational logic.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Edge-Triggered Device</strong> — A sequential circuit element that samples its inputs and updates its outputs only at the instant of a clock signal transition (rising or falling edge), ignoring input changes at all other times.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Excitation Table</strong> — The inverse of a characteristic table, showing the required flip-flop input values to produce a desired state transition from a known current state, essential for sequential circuit design.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">F</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Falling Edge</strong> — The transition of a digital signal from logic 1 (high) to logic 0 (low), used as the active clock edge in negative-edge-triggered sequential devices.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Feedback Loop</strong> — A signal path in which a circuit's output is routed back to one of its inputs, creating the ability to sustain a state and providing the fundamental mechanism for memory in sequential circuits.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">G</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Gated SR Latch</strong> — An SR latch augmented with an enable input that must be active for the set and reset inputs to affect the stored state, providing basic control over when state changes can occur.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">H</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Hold Time</strong> — The minimum duration that a flip-flop's data input must remain stable after the active clock edge to ensure the input value is correctly captured by the internal circuitry.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Hold Time Budgeting</strong> — The timing analysis practice of ensuring that data at a flip-flop's input remains stable for a sufficient duration after the active clock edge, accounting for minimum clock-to-output delays and routing variations.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">J</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">JK Flip-Flop</strong> — An edge-triggered memory element with two inputs J and K that provides four operations: hold (J=K=0), reset (J=0, K=1), set (J=1, K=0), and toggle (J=K=1), with the characteristic equation Q_next = JQ' + K'Q.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">L</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Latch Inference</strong> — An unintended synthesis outcome where a level-sensitive latch is generated because a signal is not assigned a value on every possible execution path through a combinational process, creating implicit memory.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Level-Sensitive Device</strong> — A sequential circuit element whose output continuously tracks its data input whenever the enable or clock signal is at the active level, as opposed to sampling only at a clock edge.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">M</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Master-Slave Flip-Flop</strong> — A flip-flop constructed from two latches with complementary enables, where the master latch captures input data during one clock phase and the slave latch transfers it to the output during the opposite phase.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Metastability</strong> — An unstable condition in which a flip-flop's output voltage hovers between valid logic 0 and logic 1 levels for an unpredictable duration, caused by violating setup or hold time requirements.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">P</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Preset</strong> — An asynchronous flip-flop control input that immediately forces the output Q to logic 1, overriding normal clocked operation, typically active-low and used for initialization.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">R</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Race Condition</strong> — A circuit malfunction that occurs when the output of a latch or flip-flop feeds back through combinational logic to its own input and changes multiple times within a single clock period due to transparency.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Rising Edge</strong> — The transition of a digital signal from logic 0 (low) to logic 1 (high), used as the active clock edge in positive-edge-triggered sequential devices, which are the most common in modern designs.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">S</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Sequential Circuit</strong> — A digital circuit whose outputs depend on both current input values and the circuit's stored internal state, incorporating memory elements such as latches or flip-flops to retain information across time.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Sequential Logic</strong> — Digital circuits whose outputs depend on both current inputs and the history of past inputs.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Setup Time</strong> — The minimum duration that a flip-flop's data input must be stable before the active clock edge arrives to ensure the value is correctly captured and stored.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Setup Time Budgeting</strong> — The timing analysis practice of ensuring that data arrives and stabilizes at a flip-flop's input sufficiently before the active clock edge, accounting for clock period, combinational path delay, clock skew, and the flip-flop's setup requirement.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">SR Latch</strong> — The most fundamental memory element, built from two cross-coupled NOR or NAND gates, with Set and Reset inputs that control the stored bit, and an invalid state when both inputs are simultaneously active.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">State</strong> — The stored internal information of a sequential circuit at a given time, represented by the values held in its memory elements, which together with current inputs determines the circuit's outputs.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Synchronous Sequential Circuit</strong> — A sequential circuit in which all state changes are coordinated by a common clock signal, with memory elements updating only at defined clock edges, ensuring predictable and analyzable behavior.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">T</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">T Flip-Flop</strong> — An edge-triggered memory element with a single toggle input T that either holds the current state (T = 0) or complements it (T = 1) at each active clock edge, with the characteristic equation Q_next = T XOR Q.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Timing Diagram</strong> — A graphical representation showing the values of multiple digital signals plotted against a common time axis, used to analyze and verify the temporal behavior of sequential circuits.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Transparency</strong> — The property of a level-sensitive latch in which the output continuously follows the input while the enable signal is active, allowing multiple input changes to propagate to the output within a single enable period.</p>

</div>

</div>
