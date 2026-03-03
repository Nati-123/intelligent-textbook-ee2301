---
title: Unit 10 Glossary - Sequential Circuit Design
description: Key terms and definitions for registers, counters, finite state machines, and FSM design methodology
---

<div class="problems-styled" markdown>

<h1 style="color: #5A3EED !important; border-bottom: 3px solid #5A3EED; padding-bottom: 0.4rem; font-weight: 800; margin-bottom: 1.5rem;">Glossary: Sequential Circuit Design</h1>

<p style="color: #555; line-height: 1.85; font-size: 1.05rem; margin-bottom: 2rem;">
Key terms and definitions for Unit 10. Definitions follow ISO 11179 metadata registry standards.
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">A</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Asynchronous Counter</strong> — A sequential counter circuit where each flip-flop is clocked by the output of the preceding flip-flop rather than a common clock signal, causing ripple propagation delays that accumulate through the chain.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">B</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">BCD Counter</strong> — A counter that cycles through the ten binary-coded decimal digits 0000 through 1001, resetting to 0000 after reaching the count of nine, thereby representing a single decimal digit in binary form.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Bidirectional Shift Register</strong> — A shift register that can shift its stored data either left or right depending on a direction control input, enabling flexible serial data movement in both directions within the same hardware.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Binary Counter</strong> — A sequential circuit composed of flip-flops that cycles through the full sequence of binary numbers from 0 to 2<sup>n</sup> minus 1, where n is the number of bits, incrementing by one on each clock edge.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">C</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Characteristic Table</strong> — A table that defines the next state of a flip-flop based on its current inputs and, for some types, the current state, describing the device's behavior from the perspective of "given inputs, find next state."</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Clock Signal</strong> — A periodic square wave that alternates between logic 0 and logic 1, serving as the timing reference that synchronizes all state changes in a synchronous sequential circuit.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Control Unit</strong> — A sequential circuit, typically a finite-state machine, that generates timing and control signals to coordinate the operations of the datapath, memory, and I/O subsystems according to a defined instruction sequence.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Counter</strong> — A sequential circuit that progresses through a defined sequence of states in response to clock pulses, used for counting events, generating timing signals, or producing specific binary output patterns.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">E</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Equivalent States</strong> — Two states in a finite state machine that produce identical output sequences for every possible input sequence and transition to equivalent next states, meaning they are functionally indistinguishable.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Excitation Table</strong> — The inverse of a characteristic table, showing the required flip-flop input values to produce a desired state transition from a known current state, essential for sequential circuit design.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">F</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Finite State Machine</strong> — A mathematical model of sequential computation consisting of a finite set of states, input and output alphabets, a next-state function, and an output function, used to design synchronous sequential circuits.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">I</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Implication Table</strong> — A triangular table used in state minimization that systematically identifies equivalent state pairs by recording the conditions under which two states can be merged, iteratively eliminating incompatible pairs.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">J</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">JK Flip-Flop</strong> — An edge-triggered memory element with two inputs J and K that provides four operations: hold (J=K=0), reset (J=0, K=1), set (J=1, K=0), and toggle (J=K=1), with the characteristic equation Q_next = JQ' + K'Q.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Johnson Counter</strong> — A shift register counter with the complemented output of the last flip-flop fed back to the input of the first, producing a sequence of 2n unique states for an n-bit register in a twisted-ring pattern.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">M</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Mealy Machine</strong> — A finite state machine whose output depends on both the current state and the current input, allowing outputs to change asynchronously within a clock period in response to input changes.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Modulo-N Counter</strong> — A counter that cycles through exactly N distinct states before returning to its initial state, achieved either by using an N-state natural binary sequence or by adding reset logic to a larger counter.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Moore Machine</strong> — A finite state machine whose output depends solely on the current state and is independent of the current input, producing outputs that change only on clock edges when the state transitions.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">N</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Next-State Function</strong> — The mapping that determines the next state of a finite state machine given its current state and current input, formally expressed as a function from the Cartesian product of states and inputs to states.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Next-State Logic</strong> — The combinational circuitry that implements the next-state function by computing the flip-flop excitation inputs from the present state variables and external inputs of a sequential circuit.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">O</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Output Function</strong> — The mapping that determines the output of a finite state machine from its current state alone (Moore) or from its current state and current input together (Mealy), defining the circuit's external behavior.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">P</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Parallel Load Register</strong> — A register that can accept all of its data bits simultaneously on a single clock edge when a load enable signal is asserted, allowing an entire n-bit word to be captured in one clock cycle.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Parallel-In Serial-Out Register</strong> — A shift register that loads all data bits simultaneously through parallel inputs and then shifts them out one bit at a time through a serial output, converting parallel data to serial format.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">R</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Register</strong> — A group of flip-flops that stores a multi-bit binary word, with each flip-flop holding one bit, commonly used for temporary data storage, data transfer, and as building blocks in datapaths.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Ring Counter</strong> — A circular shift register where the output of the last flip-flop feeds directly back to the input of the first, with a single 1 circulating through n flip-flops to produce n unique one-hot encoded states.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">S</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Sequence Detector</strong> — A finite state machine designed to recognize a specific pattern of input bits arriving serially, asserting an output signal when the target sequence has been completely received.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Sequential Circuit</strong> — A digital circuit whose outputs depend on both current input values and the circuit's stored internal state, incorporating memory elements such as latches or flip-flops to retain information across time.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Serial-In Parallel-Out Register</strong> — A shift register that accepts data one bit at a time through a serial input and makes all stored bits available simultaneously at the parallel outputs after the complete word has been shifted in.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Serial-In Serial-Out Register</strong> — A shift register that accepts data one bit at a time at its input and delivers data one bit at a time at its output, introducing a delay of n clock cycles for an n-bit register.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Shift Register</strong> — A sequential circuit consisting of a chain of flip-flops where each flip-flop transfers its stored value to the next on each clock edge, used for serial data transfer, conversion, and delay operations.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">State</strong> — The stored internal information of a sequential circuit at a given time, represented by the values held in its memory elements, which together with current inputs determines the circuit's outputs.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">State Assignment</strong> — The process of assigning unique binary codes to each state in a finite state machine, directly affecting the complexity of the next-state and output combinational logic in the resulting circuit.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">State Diagram</strong> — A directed graph representation of a finite state machine where nodes represent states and labeled arcs represent transitions, showing the input conditions and output values associated with each transition or state.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">State Minimization</strong> — The process of reducing the number of states in a finite state machine by identifying and merging equivalent states, producing a minimal-state machine that exhibits identical input-output behavior.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">State Table</strong> — A tabular representation of a finite state machine that lists, for every combination of current state and input, the corresponding next state and output, serving as the primary specification for sequential circuit design.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Synchronous Counter</strong> — A counter circuit in which all flip-flops are driven by a common clock signal, causing all state transitions to occur simultaneously and eliminating the cumulative propagation delay found in asynchronous counters.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Synchronous Sequential Circuit</strong> — A sequential circuit in which all state changes are coordinated by a common clock signal, with memory elements updating only at defined clock edges, ensuring predictable and analyzable behavior.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">T</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">T Flip-Flop</strong> — An edge-triggered memory element with a single toggle input T that either holds the current state (T = 0) or complements it (T = 1) at each active clock edge, with the characteristic equation Q_next = T XOR Q.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Timing Diagram</strong> — A graphical representation showing the values of multiple digital signals plotted against a common time axis, used to analyze and verify the temporal behavior of sequential circuits.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">U</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Universal Shift Register</strong> — A versatile register that can perform parallel load, shift left, shift right, and hold operations, selected by mode control inputs, combining all shift register functions into a single integrated component.</p>

</div>

</div>
