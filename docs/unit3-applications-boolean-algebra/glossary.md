---
title: Unit 3 Glossary - Applications of Boolean Algebra
description: Key terms and definitions for combinational logic design, adders, subtractors, and code converters
---

<div class="problems-styled" markdown>

<h1 style="color: #5A3EED !important; border-bottom: 3px solid #5A3EED; padding-bottom: 0.4rem; font-weight: 800; margin-bottom: 1.5rem;">Glossary: Applications of Boolean Algebra</h1>

<p style="color: #555; line-height: 1.85; font-size: 1.05rem; margin-bottom: 2rem;">
Key terms and definitions for Unit 3. Definitions follow ISO 11179 metadata registry standards.
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">A</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Active-High / Active-Low</strong> — A convention describing whether a signal is asserted when it is logic 1 (active-high) or logic 0 (active-low), commonly relevant in seven-segment display decoder design.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Adder-Subtractor Circuit</strong> — A combinational circuit that uses a shared set of full adders with XOR gates and a mode control signal M to perform either binary addition (M=0) or two's complement subtraction (M=1) on multi-bit operands.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">B</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">BCD (Binary Coded Decimal)</strong> — A binary encoding scheme in which each decimal digit (0–9) is represented by its own 4-bit binary equivalent, preserving decimal place-value structure at the cost of six unused codes per digit.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">BCD Adder</strong> — A circuit that adds two BCD digits and applies a correction factor of 6 (0110) whenever the binary sum exceeds 9 or produces a carry out, ensuring the result remains valid BCD.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">BCD to Binary Converter</strong> — A code conversion circuit that translates a BCD representation into pure binary by multiplying the tens digit by ten and adding the units digit, requiring multiplier and adder sub-circuits.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Binary to Gray Converter</strong> — A circuit that converts a standard binary number to Gray code by keeping the MSB unchanged and XORing each pair of adjacent binary bits to produce the remaining Gray code bits.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Borrow Bit</strong> — The output of a subtractor circuit that indicates when the minuend bit is smaller than the subtrahend bit (plus any incoming borrow), requiring a borrow from the next higher bit position.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">C</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Carry Bit</strong> — The output of an adder circuit that represents the overflow from adding bits in a single column, to be propagated to the next more significant bit position.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Carry-Lookahead Adder (CLA)</strong> — An adder architecture that computes all carry bits simultaneously using generate and propagate signals, eliminating the sequential carry propagation delay of ripple carry adders and achieving logarithmic rather than linear delay growth with operand width.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Circuit Analysis</strong> — The process of starting with an existing logic circuit and determining its behavior by deriving its Boolean expression and truth table from the gate-level connections.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Circuit Synthesis</strong> — The process of starting with a behavioral specification and creating a logic circuit that implements it, following the systematic design flow of truth table, Boolean expression, simplification, and gate implementation.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Code Converter</strong> — A combinational circuit that translates data from one binary representation (such as BCD, Gray code, or Excess-3) to another, enabling interoperability between subsystems that use different encoding schemes.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Combinational Logic</strong> — A category of digital circuits whose outputs depend solely on the current values of the inputs, with no memory of past states, so the same input combination always produces the same output.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Comparator Circuit</strong> — A combinational circuit that determines the relative magnitude relationship (greater than, less than, or equal) between two binary numbers by comparing corresponding bits from the most significant to the least significant.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Control Signal</strong> — A binary input that selects between different operating modes of a circuit, such as choosing between addition and subtraction in an adder-subtractor.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">D</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Difference Bit</strong> — The output of a subtractor circuit that represents the result of subtracting one bit from another, computed as the XOR of the inputs and any incoming borrow.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Don't Care Condition</strong> — An input combination in a truth table (marked X or d) for which the output can be freely assigned either 0 or 1 during optimization, because the combination either cannot occur or its output is irrelevant to the application.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">E</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Enable Signal</strong> — A control input that, when active (typically 1), permits a circuit to operate normally and, when inactive (0), forces all outputs to a disabled state regardless of other inputs.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Even Parity</strong> — An error-detection scheme in which the parity bit is chosen so that the total number of 1-bits in the data word (including the parity bit itself) is even.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Excess-3 Code</strong> — A BCD-related code in which each decimal digit is represented by its binary value plus three, useful because it is self-complementing (the nines' complement of a digit is obtained by inverting all bits).</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">F</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Full Adder</strong> — A combinational circuit that adds three single-bit inputs (two operand bits A and B plus a carry-in from a previous stage) and produces a sum bit and a carry-out bit, enabling multi-bit cascaded addition.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Full Subtractor</strong> — A combinational circuit that subtracts one bit from another while accounting for a borrow-in from a previous stage, producing a difference bit and a borrow-out bit for cascaded multi-bit subtraction.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">G</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Generate Signal</strong> — In a carry-lookahead adder, the signal G_i = A_i · B_i indicating that bit position i produces a carry output regardless of the incoming carry, because both inputs are 1.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Gray Code</strong> — A binary encoding in which consecutive values differ in exactly one bit position, eliminating ambiguous intermediate readings in applications such as rotary position encoders and providing the ordering used in Karnaugh maps.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Gray to Binary Converter</strong> — A circuit that converts a Gray code number back to standard binary by keeping the MSB unchanged and XORing each Gray code bit with the previously recovered binary bit.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">H</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Hamming Code</strong> — An error-correcting code that uses multiple parity bits, each covering a specific subset of data bits, enabling the receiver to detect and correct single-bit errors by analyzing which parity checks fail to form a syndrome pointing to the error position.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Half Adder</strong> — A combinational circuit that adds two single-bit inputs and produces a sum bit (via XOR) and a carry bit (via AND), called "half" because it has no carry-in and cannot be directly cascaded for multi-bit addition.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Half Subtractor</strong> — A combinational circuit that subtracts one single-bit input B from another A, producing a difference bit (<span class="arithmatex">\(A \oplus B\)</span>) and a borrow bit (<span class="arithmatex">\(\overline{A} \cdot B\)</span>), without accounting for an incoming borrow from a prior stage.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">I</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Incompletely Specified Function</strong> — A Boolean function for which some input combinations have undefined or irrelevant outputs (don't cares), allowing the designer to choose output values that yield the simplest possible circuit implementation.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">M</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Magnitude Comparator</strong> — A multi-bit comparator circuit that compares two <span class="arithmatex">\(n\)</span>-bit binary numbers and produces three outputs indicating whether the first number is greater than, less than, or equal to the second.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">O</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Odd Parity</strong> — An error-detection scheme in which the parity bit is chosen so that the total number of 1-bits in the data word (including the parity bit itself) is odd.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Overflow Detection</strong> — A technique for detecting signed arithmetic overflow by comparing the carry into the most significant bit (C_{n-1}) with the carry out (C_n); overflow is indicated when these two carries differ, computed as V = C_{n-1} XOR C_n.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">P</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Propagate Signal</strong> — In a carry-lookahead adder, the signal P_i = A_i XOR B_i indicating that bit position i will pass an incoming carry through to the output, enabling parallel carry computation across all bit positions.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Parity</strong> — A simple error-detection property based on counting the number of 1-bits in a data word; it can detect any single-bit error but cannot detect an even number of simultaneous bit errors.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Parity Checker</strong> — A circuit that receives a data word together with its parity bit and XORs all bits together, outputting a 1 (error detected) if the total parity does not match the expected convention.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Parity Generator</strong> — A circuit that computes a parity bit for a given data word by XORing all data bits together, producing the bit needed to establish even or odd parity for error detection during transmission.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Priority Encoder</strong> — A combinational circuit that accepts multiple input lines and outputs the binary code corresponding to the highest-priority active input, ignoring all lower-priority inputs that are simultaneously asserted.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Propagation Delay</strong> — The time required for a signal change at a gate's input to produce the corresponding change at its output, which accumulates through cascaded stages and determines the worst-case speed of circuits like ripple carry adders.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">R</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Ripple Carry Adder</strong> — A multi-bit adder constructed by chaining <span class="arithmatex">\(n\)</span> full adders in series, where the carry-out of each stage connects to the carry-in of the next, causing carries to "ripple" sequentially from LSB to MSB.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">S</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Sequential Logic</strong> — A category of digital circuits whose outputs depend on both the current inputs and the circuit's stored internal state (history), requiring memory elements such as flip-flops and typically operating under clock synchronization.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Seven-Segment Decoder</strong> — A combinational circuit that converts a 4-bit BCD input into seven output signals (a through g), each controlling one segment of a seven-segment display to form a visible decimal digit.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Seven-Segment Display</strong> — An output device consisting of seven independently controlled LED segments (labeled a through g) arranged in a figure-eight pattern, capable of displaying decimal digits 0–9 and selected letters.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Sum Bit</strong> — The lower-order output of an adder circuit, representing the single-bit arithmetic sum of the input bits at a given position (computed as the XOR of the inputs and any carry-in).</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Switching Function</strong> — The formal name for a Boolean function that describes the input-output behavior of a digital circuit, mapping combinations of binary input values to binary output values.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">T</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Two's Complement</strong> — A method for representing signed binary numbers in which the negative of a number is obtained by complementing all bits and adding one, enabling subtraction to be performed using addition hardware.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">W</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Word Problem to Boolean Conversion</strong> — The engineering skill of translating a natural-language specification into a precise Boolean expression by identifying input/output variables and mapping English logical phrases to their corresponding Boolean operators.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">X</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">XNOR (Exclusive NOR)</strong> — A Boolean operation that outputs 1 when its two inputs are the same and 0 when they differ, used as the equality detector in comparator circuits (also called the coincidence or equivalence operator).</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">XOR (Exclusive OR)</strong> — A Boolean operation that outputs 1 when its two inputs differ and 0 when they are the same, serving as the fundamental building block for sum/difference computation in adders and subtractors, parity generation, and Gray code conversion.</p>

</div>

</div>
