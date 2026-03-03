---
title: Unit 13 Glossary - System Integration and Design
description: Key terms and definitions for system integration, top-down design methodology, datapath and control unit, verification, and timing analysis
---

<div class="problems-styled" markdown>

<h1 style="color: #5A3EED !important; border-bottom: 3px solid #5A3EED; padding-bottom: 0.4rem; font-weight: 800; margin-bottom: 1.5rem;">Glossary: System Integration and Design</h1>

<p style="color: #555; line-height: 1.85; font-size: 1.05rem; margin-bottom: 2rem;">
Key terms and definitions for Unit 13. Definitions follow ISO 11179 metadata registry standards.
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">A</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">ALU</strong> — Arithmetic Logic Unit, a combinational digital circuit that performs arithmetic operations such as addition and subtraction, and bitwise logical operations such as AND, OR, and XOR, based on a function-select input.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">C</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Clock Domain Crossing</strong> — The interface boundary where a signal generated in one clock domain is sampled by logic operating in a different clock domain, requiring synchronization to prevent metastability and data corruption.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Clock-to-Q Delay</strong> — The time elapsed from the active clock edge until the flip-flop output Q settles to its new valid logic level, representing the flip-flop's output propagation delay.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Code Coverage</strong> — A verification metric that measures which portions of the HDL source code have been exercised during simulation, including statement, branch, condition, and expression coverage, to assess testbench thoroughness.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Control Signal</strong> — A digital signal that directs or modifies the operation of a circuit or system.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Control Unit</strong> — A sequential circuit, typically a finite-state machine, that generates timing and control signals to coordinate the operations of the datapath, memory, and I/O subsystems according to a defined instruction sequence.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Critical Path</strong> — The longest signal propagation path from any input to the output in a logic circuit, which determines the circuit's maximum operating speed.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">D</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Datapath</strong> — The portion of a digital system containing functional units such as registers, multiplexers, ALUs, and buses that perform data storage, transfer, and transformation operations under the direction of the control unit.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Design for Testability</strong> — A collection of design techniques and added circuitry that make a manufactured integrated circuit easier to test by improving controllability and observability of internal nodes after fabrication.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Design Hierarchy</strong> — The multi-level organizational structure of a digital system where a top-level module instantiates sub-modules, which in turn instantiate lower-level components, forming a tree of progressively simpler design units.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Design Modularity</strong> — A design principle that partitions a system into self-contained, well-defined functional blocks with clear interfaces, enabling independent development, testing, reuse, and substitution of individual modules.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Design Under Test</strong> — The specific VHDL entity and architecture being verified by a testbench. It is the target module instantiated within the testbench environment that receives stimulus and whose outputs are observed for correctness.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">F</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Finite State Machine</strong> — A mathematical model of sequential computation consisting of a finite set of states, input and output alphabets, a next-state function, and an output function, used to design synchronous sequential circuits.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Functional Verification</strong> — The process of confirming through simulation, formal methods, or emulation that a digital design behaves according to its specification under all relevant input conditions before fabrication or FPGA implementation.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">H</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Hold Time</strong> — The minimum duration that a flip-flop's data input must remain stable after the active clock edge to ensure the input value is correctly captured by the internal circuitry.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Hold Time Budgeting</strong> — The timing analysis practice of ensuring that data at a flip-flop's input remains stable for a sufficient duration after the active clock edge, accounting for minimum clock-to-output delays and routing variations.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">I</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Interface Specification</strong> — A formal document or definition that describes the signals, timing, protocols, and data formats required for two modules or subsystems to communicate correctly, establishing a contract between design teams.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">M</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Mealy Machine</strong> — A finite state machine whose output depends on both the current state and the current input, allowing outputs to change asynchronously within a clock period in response to input changes.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Metastability</strong> — An unstable condition in which a flip-flop's output voltage hovers between valid logic 0 and logic 1 levels for an unpredictable duration, caused by violating setup or hold time requirements.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Moore Machine</strong> — A finite state machine whose output depends solely on the current state and is independent of the current input, producing outputs that change only on clock edges when the state transitions.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">N</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Non-Recurring Engineering Cost</strong> — The one-time design, development, and tooling expenses incurred before production begins, including mask generation, verification, and testing setup, which must be amortized across all manufactured units of the final product.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">P</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Pipelining</strong> — A design technique that divides a combinational logic path into multiple stages separated by registers, allowing each stage to process different data simultaneously, thereby increasing clock frequency and throughput at the cost of latency.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Place and Route</strong> — The physical implementation stage where synthesized logic elements are assigned to specific locations on an FPGA or ASIC die (placement) and interconnected through routing resources to meet timing and area constraints.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Propagation Delay</strong> — The time required for a signal change at a gate's input to produce a corresponding change at its output, measured from the input transition to the output reaching a valid logic level.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">R</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Ready-Valid Handshake</strong> — A flow-control protocol where a sender asserts a valid signal to indicate data availability and a receiver asserts a ready signal to indicate acceptance capability. Data transfers only when both signals are asserted simultaneously.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Register</strong> — A group of flip-flops that stores a multi-bit binary word, with each flip-flop holding one bit, commonly used for temporary data storage, data transfer, and as building blocks in datapaths.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Register-Transfer Level</strong> — A level of hardware abstraction that describes a digital circuit in terms of data transfers between registers and the combinational logic transformations applied during those transfers on each clock cycle.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Resource Sharing</strong> — A synthesis optimization technique where a single hardware functional unit, such as an adder or multiplier, is time-multiplexed to perform operations for different data paths, reducing total area at the cost of additional control logic.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">S</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Scan Chain</strong> — A design-for-testability structure where all flip-flops in a circuit are connected into one or more serial shift registers during test mode, allowing external loading and unloading of internal state for manufacturing test.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Self-Checking Testbench</strong> — A testbench that automatically compares the design under test's outputs against expected values or a reference model within the simulation, reporting pass or fail without requiring manual waveform inspection.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Setup Time</strong> — The minimum duration that a flip-flop's data input must be stable before the active clock edge arrives to ensure the value is correctly captured and stored.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Setup Time Budgeting</strong> — The timing analysis practice of ensuring that data arrives and stabilizes at a flip-flop's input sufficiently before the active clock edge, accounting for clock period, combinational path delay, clock skew, and the flip-flop's setup requirement.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Static Timing Analysis</strong> — A method of verifying circuit timing by computing worst-case signal propagation delays through all combinational paths without requiring simulation vectors, checking that setup and hold constraints are met at every flip-flop.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Synchronizer Chain</strong> — A series of two or more flip-flops clocked by the same clock signal, used to safely sample an asynchronous input by allowing one full clock period for metastability resolution between stages.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">System Partitioning</strong> — The process of dividing a complex digital system into distinct functional blocks or subsystems with well-defined interfaces, guided by considerations of functionality, timing, technology, and design team organization.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">T</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Test Vector</strong> — A specific set of input values applied to a circuit during testing or simulation, paired with the corresponding expected output values, used to verify that the circuit produces correct results for that input combination.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Testbench</strong> — A non-synthesizable VHDL entity with no ports that instantiates the design under test, generates stimulus signals, and optionally checks output correctness to verify the design through simulation.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Throughput</strong> — The rate at which a digital system produces valid output results, typically measured in operations per second or data units per clock cycle, reflecting the system's sustained processing capacity.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Top-Down Design</strong> — A systematic design methodology that begins with the highest-level system specification and progressively decomposes it into smaller, more detailed sub-modules until each block is simple enough to implement directly.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">U</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">UART</strong> — Universal Asynchronous Receiver-Transmitter, a serial communication peripheral that converts parallel data to a serial bit stream for transmission and serial data back to parallel form on reception, without requiring a shared clock.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">V</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Verification Planning</strong> — The systematic process of defining verification goals, strategies, coverage metrics, testbench architecture, and required test scenarios before beginning simulation, ensuring comprehensive and organized design validation.</p>

</div>

</div>
