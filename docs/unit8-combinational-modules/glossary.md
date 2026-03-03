---
title: Unit 8 Glossary - Combinational Logic Modules
description: Key terms and definitions for multiplexers, decoders, encoders, demultiplexers, priority encoders, magnitude comparators, code converters, adders, and ALUs
---

<div class="problems-styled" markdown>

<h1 style="color: #5A3EED !important; border-bottom: 3px solid #5A3EED; padding-bottom: 0.4rem; font-weight: 800; margin-bottom: 1.5rem;">Glossary: Combinational Logic Modules</h1>

<p style="color: #555; line-height: 1.85; font-size: 1.05rem; margin-bottom: 2rem;">
Key terms and definitions for Unit 8. Definitions follow ISO 11179 metadata registry standards.
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">A</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Active-Low Output</strong> — A signal convention where the active or asserted state is represented by logic 0 (low voltage) rather than logic 1, often indicated by an overbar or bubble on a schematic symbol.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Adder Subtractor Circuit</strong> — A combinational circuit that performs both addition and subtraction operations using a control signal to select the operation mode.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">ALU</strong> — Arithmetic Logic Unit, a combinational digital circuit that performs arithmetic operations such as addition and subtraction, and bitwise logical operations such as AND, OR, and XOR, based on a function-select input.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">B</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">BCD Code</strong> — Binary-Coded Decimal, a representation where each decimal digit is encoded as a separate 4-bit binary number.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Binary to Gray Converter</strong> — A circuit that converts standard binary code to Gray code, where adjacent values differ by only one bit.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">C</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Code Converter</strong> — A combinational circuit that transforms data from one binary code format to another.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Combinational Logic</strong> — Digital circuits whose outputs depend only on current input values, not on previous states or history.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Comparator Circuit</strong> — A combinational circuit that compares two binary numbers and indicates their relative magnitude.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Control Signal</strong> — A digital signal that directs or modifies the operation of a circuit or system.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Critical Path</strong> — The longest signal propagation path from any input to the output in a logic circuit, which determines the circuit's maximum operating speed.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">D</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Decoder</strong> — A combinational circuit that converts an n-bit binary input code into 2^n output lines, activating exactly one output corresponding to the input value while all other outputs remain inactive.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Decoder Enable Input</strong> — A control signal on a decoder that, when inactive, forces all outputs to their inactive state regardless of the address inputs, enabling power reduction and cascaded expansion.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Decoder Tree Expansion</strong> — A hierarchical technique for building larger decoders from smaller ones by using the most significant address bits to generate enable signals that select which smaller decoder is active.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Demultiplexer</strong> — A combinational circuit that routes a single data input to one of 2^n outputs based on n select signals, with all non-selected outputs remaining at their inactive level.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">E</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Enable Signal</strong> — A control input that allows or prevents a circuit from operating or passing signals.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Encoder</strong> — A combinational circuit that converts a set of input lines, typically in one-hot format, into a compact binary code representing which input is active.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">F</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Full Adder</strong> — A combinational circuit that adds three input bits (two operands plus carry-in) producing a sum and carry-out.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Full Subtractor</strong> — A combinational circuit that subtracts one bit from another while accounting for a borrow input.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">G</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Gray Code</strong> — A binary code where successive values differ by exactly one bit, minimizing switching errors.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">H</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Half Adder</strong> — A combinational circuit that adds two single bits, producing a sum and carry output.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Half Subtractor</strong> — A combinational circuit that subtracts one bit from another, producing difference and borrow outputs.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">M</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Magnitude Comparator</strong> — A circuit that compares two multi-bit binary numbers and outputs their relative magnitude relationship.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Medium-Scale Integration</strong> — A classification of integrated circuits containing tens to hundreds of logic gates that implement functional building blocks such as multiplexers, decoders, encoders, and comparators.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Minterm Generation</strong> — The property of a decoder that produces all 2^n minterms of its n input variables on separate output lines, enabling implementation of any Boolean function by OR-ing selected outputs.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Multiplexer</strong> — A combinational circuit that selects one of 2^n data inputs and routes it to a single output, controlled by n select signals that determine which input is connected to the output.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Multiplexer Tree Expansion</strong> — A hierarchical construction technique that builds larger multiplexers from smaller ones by cascading levels, where lower-level MUXes handle the least significant select bits and upper-level MUXes handle the most significant bits.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">O</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">One-Hot Encoding</strong> — A binary encoding scheme in which exactly one bit is high (1) at any time, with each bit position representing a unique state or input, commonly produced by decoders.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">P</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Priority Encoder</strong> — An encoder that accepts multiple simultaneously active inputs and produces the binary code of only the highest-priority active input, resolving ambiguity that a basic encoder cannot handle.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Propagation Delay</strong> — The time required for a signal change at a gate's input to produce a corresponding change at its output, measured from the input transition to the output reaching a valid logic level.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">R</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Ripple Carry Adder</strong> — An n-bit adder constructed by cascading full adders, where carry propagates through all stages.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">S</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Seven Segment Decoder</strong> — A combinational circuit that converts a binary or BCD input to the signals needed to display digits on a seven-segment display.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Seven Segment Display</strong> — An output device using seven LED or LCD segments arranged to display decimal digits 0-9.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Shannon Expansion</strong> — A theorem expressing a Boolean function as a sum of products involving a variable and its cofactors.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Sum Bit</strong> — The output bit in addition circuits that represents the sum of the input bits, excluding the carry.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">T</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Truth Table</strong> — A table listing all possible input combinations and corresponding output values for a logic function.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Two-Level Circuit</strong> — A logic circuit in which signals pass through at most two levels of gates from input to output, corresponding directly to sum-of-products (AND-OR) or product-of-sums (OR-AND) expressions.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">V</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Valid Flag</strong> — A single-bit output on a priority encoder that indicates whether any input is currently active, distinguishing between no active inputs and input zero being active.</p>

</div>

</div>
