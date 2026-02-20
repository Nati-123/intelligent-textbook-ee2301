---
title: Glossary of Terms
description: Comprehensive glossary for EE 2301 Introduction to Digital System Design
---

<div class="problems-styled" markdown>

# Glossary of Terms

This glossary contains 398 terms used in the Introduction to Digital System Design course (EE 2301). Definitions follow ISO 11179 metadata registry standards.

#### Absorption Law

A Boolean algebra theorem stating that a variable ORed with the AND of itself and another variable equals the original variable: A + AB = A.

**Example:** The expression X + XY simplifies to X using the absorption law.

#### Active-Low Output

A signal convention where the active or asserted state is represented by logic 0 (low voltage) rather than logic 1, often indicated by an overbar or bubble on a schematic symbol.

**Example:** The 74138 decoder has active-low outputs, so when input 011 is applied, output Y3 goes to 0 while all other outputs remain at 1.

#### Adder Subtractor Circuit

A combinational circuit that performs both addition and subtraction operations using a control signal to select the operation mode.

**Example:** A 4-bit adder-subtractor uses XOR gates controlled by a subtract signal to complement the second operand when subtracting.

#### Adjacency Criterion in QM

The requirement in the Quine-McCluskey method that two terms can combine only if they differ in exactly one bit position while having identical values elsewhere.

**Example:** Terms 0100 and 0101 satisfy the adjacency criterion because they differ only in the rightmost bit.

#### Algebraic Simplification

The process of reducing a Boolean expression to a simpler equivalent form using Boolean algebra laws and theorems.

**Example:** The expression AB + AB' simplifies to A using the complement law and factoring.

#### ALU

Arithmetic Logic Unit, a combinational digital circuit that performs arithmetic operations such as addition and subtraction, and bitwise logical operations such as AND, OR, and XOR, based on a function-select input.

**Example:** A 4-bit ALU receives operands A and B with a 3-bit opcode, outputting their sum when the opcode is "010" and their bitwise AND when the opcode is "000".

#### Analog vs Digital Signals

A comparison between continuous signals that vary smoothly over a range (analog) and discrete signals that have only distinct voltage levels (digital).

**Example:** A microphone produces analog signals, while a computer processes digital signals of 0s and 1s.

#### AND Gate

A logic gate that outputs 1 only when all inputs are 1; otherwise outputs 0.

**Example:** A 2-input AND gate with inputs A=1 and B=1 produces output 1; any other combination produces 0.

#### AND Operation

A Boolean operation that returns 1 only when both operands are 1.

**Example:** In the expression A · B, the result is 1 only when both A and B equal 1.

#### AND-OR-Invert (AOI) Gate

A complex CMOS gate that performs AND operations on groups of inputs, ORs the results, and inverts the final output, all within a single gate structure with reduced delay and area.

**Example:** An AOI22 gate computes F = (AB + CD)' using one complex gate instead of two AND gates, one OR gate, and one inverter.

#### Antifuse

A one-time programmable interconnect element that is initially an open circuit and becomes a permanent low-resistance connection when a high programming voltage is applied, the inverse of a conventional fuse.

**Example:** In an Actel FPGA, antifuses made from a thin amorphous silicon layer between two metal conductors are programmed by applying a voltage pulse that permanently creates a conductive link, routing signals between logic blocks.

#### Architecture Body

The section of a VHDL design unit that describes the internal behavior, structure, or dataflow implementation of an entity. It specifies how the entity's ports relate to one another through signals, processes, and component instantiations.

**Example:** `architecture behavioral of full_adder is begin sum <= a xor b xor cin; end behavioral;` defines how the full_adder entity computes its outputs.

#### Associative Law

A Boolean algebra property stating that the grouping of variables in AND or OR operations does not affect the result.

**Example:** (A · B) · C = A · (B · C) and (A + B) + C = A + (B + C).

#### Asynchronous Counter

A sequential counter circuit where each flip-flop is clocked by the output of the preceding flip-flop rather than a common clock signal, causing ripple propagation delays that accumulate through the chain.

**Example:** In a 4-bit asynchronous ripple counter, the Q output of the first flip-flop clocks the second, the second clocks the third, and so on, producing a binary count from 0000 to 1111 with increasing propagation delay at each stage.

#### Asynchronous Reset

A flip-flop control input that immediately forces the output to 0 regardless of the clock state, overriding normal clocked operation for initialization or emergency conditions.

**Example:** Asserting the active-low CLR input on a D flip-flop drives Q to 0 instantly, even in the middle of a clock high phase, ensuring a known power-on state.

#### Asynchronous Sequential Circuit

A sequential circuit in which state changes can occur at any time in response to input changes, without a synchronizing clock signal, making it faster but more susceptible to race conditions and hazards.

**Example:** An SR latch built from cross-coupled NOR gates is an asynchronous sequential circuit because its state changes immediately when S or R changes.

#### Base of Number System

The number of unique digits used in a positional number system, also called the radix.

**Example:** Binary has base 2 (digits 0, 1), decimal has base 10 (digits 0-9), and hexadecimal has base 16 (digits 0-9, A-F).

#### Baud Rate

The number of signal-level transitions or symbols transmitted per second over a serial communication channel. For binary signaling, the baud rate equals the bit rate in bits per second.

**Example:** A UART configured at 9600 baud transmits one bit every 104.17 microseconds, yielding a data transfer rate of 9600 bits per second with binary encoding.

#### BCD Code

Binary-Coded Decimal, a representation where each decimal digit is encoded as a separate 4-bit binary number.

**Example:** The decimal number 59 is represented in BCD as 0101 1001 (5 = 0101, 9 = 1001).

#### BCD Counter

A counter that cycles through the ten binary-coded decimal digits 0000 through 1001, resetting to 0000 after reaching the count of nine, thereby representing a single decimal digit in binary form.

**Example:** A 7490 TTL decade counter counts 0000, 0001, ..., 1001, then wraps back to 0000 on the next clock edge, making it suitable for driving a seven-segment display showing digits 0 through 9.

#### BCD to Binary Converter

A circuit that converts a number from Binary-Coded Decimal format to standard binary representation.

**Example:** BCD input 0010 0101 (representing decimal 25) converts to binary 11001.

#### Behavioral Modeling

A VHDL description style that specifies circuit function using sequential statements within processes, resembling software algorithms, without explicitly defining the underlying hardware structure or gate-level connections.

**Example:** A process using if-then-else statements to describe a multiplexer's output selection based on control inputs, rather than instantiating individual logic gates.

#### Bidirectional Shift Register

A shift register that can shift its stored data either left or right depending on a direction control input, enabling flexible serial data movement in both directions within the same hardware.

**Example:** With a direction control pin set high, the register shifts data from Q0 toward Q3 (left shift); when set low, it shifts from Q3 toward Q0 (right shift), useful for arithmetic multiply and divide operations.

#### Binary Addition

The arithmetic operation of adding two binary numbers using the rules: 0+0=0, 0+1=1, 1+0=1, 1+1=10 (with carry).

**Example:** Adding 1011 + 0110 produces 10001, where carries propagate from right to left.

#### Binary Counter

A sequential circuit composed of flip-flops that cycles through the full sequence of binary numbers from 0 to 2^n minus 1, where n is the number of bits, incrementing by one on each clock edge.

**Example:** A 3-bit binary counter sequences through 000, 001, 010, 011, 100, 101, 110, 111, and then wraps to 000, providing eight distinct states before repeating.

#### Binary Decision

A choice between exactly two alternatives, typically represented as true/false or 1/0.

**Example:** A thermostat makes a binary decision: turn heating ON or OFF based on temperature.

#### Binary Division

The arithmetic operation of dividing one binary number by another, following the same long division process as decimal but with base-2 rules.

**Example:** Dividing 1100 by 10 yields quotient 110 with remainder 0.

#### Binary Multiplication

The arithmetic operation of multiplying two binary numbers by summing shifted partial products.

**Example:** Multiplying 101 × 11 produces partial products 101 and 1010, which sum to 1111.

#### Binary Number System

A positional number system using base 2 with only two digits: 0 and 1.

**Example:** The binary number 1101 equals decimal 13 (8 + 4 + 0 + 1).

#### Binary Representation of Minterms

The encoding of each minterm as a binary number where each bit indicates whether a variable appears in complemented (0) or uncomplemented (1) form.

**Example:** For variables ABC, minterm m₅ has binary representation 101, meaning A·B'·C.

#### Binary Subtraction

The arithmetic operation of subtracting one binary number from another using borrow when necessary.

**Example:** Subtracting 0110 from 1011 produces 0101 (11 - 6 = 5 in decimal).

#### Binary to Decimal Conversion

The process of converting a binary number to its decimal equivalent by summing weighted positional values.

**Example:** Binary 1101 converts to decimal: 1×8 + 1×4 + 0×2 + 1×1 = 13.

#### Binary to Gray Converter

A circuit that converts standard binary code to Gray code, where adjacent values differ by only one bit.

**Example:** Binary 0110 converts to Gray code 0101 by XORing each bit with its left neighbor.

#### Binary to Hexadecimal

The process of converting binary numbers to hexadecimal by grouping bits into sets of four.

**Example:** Binary 10110011 groups as 1011 0011, converting to hexadecimal B3.

#### Binary to Octal Conversion

The process of converting binary numbers to octal by grouping bits into sets of three.

**Example:** Binary 110101 groups as 110 101, converting to octal 65.

#### Bistable Element

A circuit with exactly two stable operating states, formed by cross-coupled inverters or gates with feedback, providing the fundamental physical mechanism for storing one bit of information.

**Example:** Two inverters connected in a loop create a bistable element that holds either Q = 0 or Q = 1 indefinitely, forming the core of all latches and flip-flops.

#### Bit

The fundamental unit of digital information, representing a single binary digit with value 0 or 1.

**Example:** An 8-bit number consists of 8 bits and can represent values from 0 to 255.

#### Bitstream

A binary configuration file that is loaded into an FPGA to define the logic functions, interconnect routing, and I/O pin assignments, effectively programming the device to implement a specific digital design.

**Example:** After synthesizing and placing a design in Xilinx Vivado, the tool generates a .bit bitstream file that is downloaded into the FPGA's configuration memory through JTAG to implement the designed circuit.

#### Boolean Algebra

A mathematical system for analyzing and simplifying logic expressions using variables that have only two possible values (0 or 1).

**Example:** Boolean algebra is used to simplify the expression A + A·B to A using the absorption law.

#### Boolean Constant

A fixed value in Boolean algebra that is either 0 (false) or 1 (true).

**Example:** In the expression X + 1 = 1, the value 1 is a Boolean constant.

#### Boolean Expression

A combination of Boolean variables, constants, and operators that evaluates to either 0 or 1.

**Example:** The expression A·B + C' represents a function of three variables.

#### Boolean Variable

A symbol in Boolean algebra that can assume only the value 0 or 1.

**Example:** In F = A·B + C, the symbols A, B, and C are Boolean variables.

#### Borrow Bit

A bit generated during binary subtraction when a larger digit must be subtracted from a smaller digit.

**Example:** Subtracting 1 from 0 in binary requires borrowing from the next higher position.

#### Bubble Pushing

A visual technique for converting circuits between gate types by moving inversion bubbles through the circuit, changing gate types (AND to OR or vice versa) as bubbles cross gate boundaries.

**Example:** To convert an AND-OR circuit to NAND-only, add output bubbles to the AND gates and input bubbles to the OR gate, then observe that the OR with input bubbles becomes a NAND.

#### Buffer Gate

A logic gate that produces an output identical to its input, used for signal amplification or delay.

**Example:** A buffer with input 1 produces output 1; it does not invert the signal.

#### Built-In Self-Test

A design technique that embeds test-pattern generation and output-response analysis circuitry directly within the integrated circuit, enabling the chip to test itself without external test equipment.

**Example:** A BIST controller uses a linear feedback shift register to generate pseudo-random test patterns for an embedded memory and compresses outputs into a signature for pass/fail comparison.

#### Byte

A group of 8 bits, commonly used as the fundamental unit for measuring digital data.

**Example:** The ASCII character 'A' is stored as the byte 01000001.

#### Canonical Form

A standard representation of a Boolean function where each term contains all variables in the function, either in complemented or uncomplemented form.

**Example:** F = A'B'C + A'BC + ABC' is in canonical SOP form with all three variables in each term.

#### Canonical POS Form

A Boolean expression written as a product of maxterms, where each maxterm contains all variables.

**Example:** F = (A+B+C)·(A+B+C')·(A'+B+C) is in canonical POS form.

#### Canonical SOP Form

A Boolean expression written as a sum of minterms, where each minterm contains all variables.

**Example:** F = A'B'C + A'BC' + ABC is in canonical SOP form.

#### Carry Bit

A bit generated during binary addition when the sum of two bits exceeds 1.

**Example:** Adding 1 + 1 in binary produces sum 0 with carry 1.

#### Cascading Gates

The connection of multiple logic gates in series, where the output of one gate serves as input to the next.

**Example:** A 4-input AND function can be built by cascading two 2-input AND gates.

#### Case Statement

A sequential VHDL statement inside a process that selects one of several execution paths based on the value of a single expression, analogous to a truth table or selection mechanism in hardware.

**Example:** `case sel is when "00" => y <= a; when "01" => y <= b; when others => y <= '0'; end case;` implements a multiplexer.

#### Characteristic Table

A table that defines the next state of a flip-flop based on its current inputs and, for some types, the current state, describing the device's behavior from the perspective of "given inputs, find next state."

**Example:** The JK flip-flop characteristic table shows that when J = 1 and K = 1 with current state Q = 0, the next state is Q_next = 1 (toggle).

#### Circuit Analysis

The process of determining the output function of an existing logic circuit by tracing signals through its gates.

**Example:** Analyzing a circuit with AND and OR gates to derive its Boolean expression F = AB + C.

#### Circuit Synthesis

The process of designing a logic circuit that implements a specified Boolean function.

**Example:** Synthesizing the function F = A + B·C as an OR gate with inputs A and (B AND C).

#### Clock Domain Crossing

The interface boundary where a signal generated in one clock domain is sampled by logic operating in a different clock domain, requiring synchronization to prevent metastability and data corruption.

**Example:** A two-flip-flop synchronizer is inserted when a control signal from a 50 MHz domain must be reliably captured by logic running at 100 MHz.

#### Clock Signal

A periodic square wave that alternates between logic 0 and logic 1, serving as the timing reference that synchronizes all state changes in a synchronous sequential circuit.

**Example:** A 100 MHz clock signal has a period of 10 ns, providing rising edges every 10 ns at which all flip-flops in the system simultaneously sample their inputs.

#### Clock-to-Q Delay

The time elapsed from the active clock edge until the flip-flop output Q settles to its new valid logic level, representing the flip-flop's output propagation delay.

**Example:** A D flip-flop with a clock-to-Q delay of 1.5 ns produces a valid output 1.5 ns after each rising clock edge, and this delay contributes to the minimum clock period calculation.

#### Code Converter

A combinational circuit that transforms data from one binary code format to another.

**Example:** A BCD-to-seven-segment decoder converts BCD digits to patterns for display.

#### Code Coverage

A verification metric that measures which portions of the HDL source code have been exercised during simulation, including statement, branch, condition, and expression coverage, to assess testbench thoroughness.

**Example:** A coverage report showing 95% branch coverage for a state machine indicates that 5% of conditional branches were never taken during simulation, requiring additional test vectors.

#### Cofactor

The resulting function when a variable in a Boolean function is set to a constant value (0 or 1).

**Example:** For F = AB + C, the cofactor F_A (setting A=1) gives B + C.

#### Column Dominance

A technique in prime implicant chart reduction where a minterm column covered by the same or more prime implicants as another can be removed.

**Example:** If column m₃ is covered by PI₁ and PI₂, and m₅ is covered only by PI₁, then m₃ dominates m₅.

#### Combinational Logic

Digital circuits whose outputs depend only on current input values, not on previous states or history.

**Example:** An adder is a combinational circuit because its sum depends only on the current inputs.

#### Combining Adjacent Minterms

The process in the Quine-McCluskey method of merging two minterms that differ in exactly one variable to form a larger implicant.

**Example:** Combining m₂ (010) and m₃ (011) produces the implicant 01- (representing A'B).

#### Commutative Law

A Boolean algebra property stating that the order of variables in AND or OR operations does not affect the result.

**Example:** A · B = B · A and A + B = B + A.

#### Comparator Circuit

A combinational circuit that compares two binary numbers and indicates their relative magnitude.

**Example:** A 2-bit comparator outputs signals indicating whether A > B, A < B, or A = B.

#### Complement

The inverse of a Boolean variable or expression; if a value is 0, its complement is 1, and vice versa.

**Example:** The complement of A (written A') is 1 when A is 0, and 0 when A is 1.

#### Complement Law

A Boolean algebra theorem stating that a variable ORed with its complement equals 1, and ANDed with its complement equals 0.

**Example:** A + A' = 1 and A · A' = 0.

#### Complement of Function

A Boolean function that outputs the opposite value of the original function for all input combinations.

**Example:** If F = AB, then F' = A' + B' (by DeMorgan's theorem).

#### Complex PLD

A programmable logic device that combines multiple SPLD-equivalent function blocks with a programmable interconnect matrix on a single chip, providing higher logic capacity than a simple PLD while remaining non-volatile.

**Example:** The Altera MAX 7000 series CPLD contains multiple logic array blocks connected by a programmable interconnect array, enabling implementation of designs with hundreds of equivalent gates and predictable timing.

#### Computational Complexity of QM

The measure of time and space resources required by the Quine-McCluskey algorithm, which grows exponentially with the number of variables.

**Example:** For n variables, the maximum number of prime implicants is approximately 3^n/n.

#### Computer Implementation of QM

The encoding of the Quine-McCluskey algorithm as software that systematically finds minimum Boolean expressions.

**Example:** A QM program takes minterms as input and outputs the minimal sum-of-products expression.

#### Concurrent Signal Assignment

A VHDL statement that exists outside a process and continuously drives a signal based on an expression. All concurrent assignments execute simultaneously, modeling the parallel nature of hardware.

**Example:** `sum <= a xor b xor cin;` written in the architecture body outside any process executes whenever a, b, or cin changes.

#### Conditional Signal Assignment

A concurrent VHDL statement that assigns a signal value based on a prioritized chain of Boolean conditions, implementing priority-encoded logic similar to an if-then-else chain.

**Example:** `y <= a when sel = "00" else b when sel = "01" else c;` assigns y based on the first matching condition of sel.

#### Configurable Logic Block

The fundamental programmable logic element within an FPGA, typically containing lookup tables, flip-flops, and multiplexers, that can be configured to implement arbitrary combinational and sequential logic functions.

**Example:** A Xilinx CLB contains multiple slices, each with a 6-input lookup table and two flip-flops; by programming the LUT contents and interconnections, each slice can implement functions like a 6-input AND gate or a small counter.

#### Consensus Theorem

A Boolean algebra theorem stating that AB + A'C + BC = AB + A'C, where the term BC is redundant.

**Example:** XY + X'Z + YZ simplifies to XY + X'Z because YZ is the consensus term.

#### Control Signal

A digital signal that directs or modifies the operation of a circuit or system.

**Example:** A read/write control signal determines whether memory performs a read or write operation.

#### Control Unit

A sequential circuit, typically a finite-state machine, that generates timing and control signals to coordinate the operations of the datapath, memory, and I/O subsystems according to a defined instruction sequence.

**Example:** A washing machine controller FSM sequences through FILL, WASH, RINSE, and SPIN states, asserting valve-open and motor-enable signals at the appropriate times.

#### Converting POS to SOP

The process of transforming a product-of-sums expression into an equivalent sum-of-products form.

**Example:** (A+B)·(A+C) expands and simplifies to A + BC.

#### Converting SOP to POS

The process of transforming a sum-of-products expression into an equivalent product-of-sums form.

**Example:** AB + AC can be written as A(B+C) and further converted to POS form.

#### Corner Grouping

The technique in K-maps of grouping cells at opposite corners that are logically adjacent due to wraparound.

**Example:** In a 4-variable K-map, the four corners (cells 0, 2, 8, 10) can form a valid group.

#### Cost of Expression

A metric measuring the complexity of a Boolean expression, typically counting the number of gates or literals required.

**Example:** The expression AB + C has a cost of 2 gates (one AND, one OR) and 3 literals.

#### Counter

A sequential circuit that progresses through a defined sequence of states in response to clock pulses, used for counting events, generating timing signals, or producing specific binary output patterns.

**Example:** A traffic light controller uses a counter to cycle through timed phases for green, yellow, and red signals, advancing to the next phase after a prescribed number of clock cycles.

#### Covering All Ones

The process in K-map SOP simplification of ensuring every cell containing a 1 belongs to at least one group.

**Example:** After grouping, verify that no cell with value 1 remains ungrouped.

#### Covering All Zeros

The process in K-map POS simplification of ensuring every cell containing a 0 belongs to at least one group.

**Example:** For POS simplification, group all 0-cells to derive maxterms.

#### Critical Path

The longest signal propagation path from any input to the output in a logic circuit, which determines the circuit's maximum operating speed.

**Example:** In a three-level circuit where path A traverses gates 1, 3, and 4, the critical path delay is the sum of those three gate delays.

#### Cyclic Prime Implicant Charts

Prime implicant charts with no essential prime implicants, where every minterm is covered by multiple prime implicants equally.

**Example:** A cyclic chart requires Petrick's method because no single PI uniquely covers any minterm.

#### D Flip-Flop

An edge-triggered memory element with a single data input D whose value is captured at the active clock edge and held at output Q until the next active edge, with the characteristic equation Q_next = D.

**Example:** If D = 1 at the rising clock edge, Q becomes 1 after the clock-to-Q delay and remains 1 regardless of subsequent changes to D until the next rising edge.

#### D Latch

A level-sensitive memory element that passes its data input D directly to output Q while the enable signal is active (transparent mode) and holds the last captured value when the enable goes inactive.

**Example:** While Enable = 1, a D latch with D = 0 outputs Q = 0; if D changes to 1 while Enable is still 1, Q immediately follows to 1.

#### Dash Notation for Combined Terms

The convention in the Quine-McCluskey method of using a dash (-) to represent a variable that has been eliminated through combination.

**Example:** Combining 0110 and 0111 produces 011-, where the dash indicates the eliminated D variable.

#### Dataflow Modeling

A VHDL description style that uses concurrent signal assignment statements to describe how data flows through combinational logic, specifying Boolean equations and transformations without explicit structural or sequential constructs.

**Example:** Describing a 4-bit ripple carry adder as `sum <= a xor b xor cin; cout <= (a and b) or (cin and (a xor b));` using concurrent assignments.

#### Datapath

The portion of a digital system containing functional units such as registers, multiplexers, ALUs, and buses that perform data storage, transfer, and transformation operations under the direction of the control unit.

**Example:** A simple processor datapath includes a register file, an ALU, and a shifter connected by multiplexed buses, with the control unit selecting operations each clock cycle.

#### DC-Set of Function

The set of input combinations for which the function output is unspecified (don't care conditions).

**Example:** For a BCD-to-seven-segment decoder, inputs 1010-1111 form the DC-set (invalid BCD).

#### Decimal Number System

A positional number system using base 10 with digits 0 through 9.

**Example:** The decimal number 247 represents 2×100 + 4×10 + 7×1.

#### Decimal to Binary Conversion

The process of converting a decimal number to binary using repeated division by 2.

**Example:** Decimal 13 divides as 13→6→3→1→0 with remainders 1,0,1,1, giving binary 1101.

#### Decimal to Hexadecimal

The process of converting a decimal number to hexadecimal using repeated division by 16.

**Example:** Decimal 255 divides as 255/16 = 15 remainder 15, giving hexadecimal FF.

#### Decimal to Octal Conversion

The process of converting a decimal number to octal using repeated division by 8.

**Example:** Decimal 100 divides as 100→12→1→0 with remainders 4,4,1, giving octal 144.

#### Decoder

A combinational circuit that converts an n-bit binary input code into 2^n output lines, activating exactly one output corresponding to the input value while all other outputs remain inactive.

**Example:** A 3-to-8 decoder with input 101 activates only output Y5, generating the minterm A * B' * C.

#### Decoder Enable Input

A control signal on a decoder that, when inactive, forces all outputs to their inactive state regardless of the address inputs, enabling power reduction and cascaded expansion.

**Example:** A 3-to-8 decoder with its enable input held low produces all outputs at 0, even if the address inputs change.

#### Decoder Tree Expansion

A hierarchical technique for building larger decoders from smaller ones by using the most significant address bits to generate enable signals that select which smaller decoder is active.

**Example:** Two 3-to-8 decoders with enables controlled by address bit A3 form a 4-to-16 decoder: one decoder handles outputs Y0-Y7 and the other handles Y8-Y15.

#### Decomposition

A design technique that breaks a complex Boolean function into simpler subfunctions, each implemented as a separate subcircuit, to reduce gate sizes and improve modularity.

**Example:** The function F = AB'C'D' + A'BCD + ABCD can be decomposed by letting h = CD, then expressing F in terms of A, B, and h.

#### Default Assignment

A signal assignment placed before conditional or case logic within a process to ensure the signal receives a defined value on every execution path, preventing unintended latch inference during synthesis.

**Example:** Writing `y <= '0';` at the beginning of a process before an if statement ensures y is driven even when no if-branch condition is met.

#### Delta Delay

An infinitesimally small simulation time step in VHDL used to order signal updates and process evaluations within the same simulation time, ensuring correct cause-and-effect sequencing without advancing wall-clock time.

**Example:** If `b <= a;` and `c <= b;` are concurrent, b updates one delta after a changes, and c updates one delta after b, all at the same simulation time.

#### DeMorgans First Theorem

A Boolean algebra theorem stating that the complement of an AND operation equals the OR of the complements: (A·B)' = A' + B'.

**Example:** (XY)' = X' + Y', meaning NOT(X AND Y) equals (NOT X) OR (NOT Y).

#### DeMorgans Second Theorem

A Boolean algebra theorem stating that the complement of an OR operation equals the AND of the complements: (A+B)' = A'·B'.

**Example:** (X+Y)' = X'·Y', meaning NOT(X OR Y) equals (NOT X) AND (NOT Y).

#### Demultiplexer

A combinational circuit that routes a single data input to one of 2^n outputs based on n select signals, with all non-selected outputs remaining at their inactive level.

**Example:** A 1-to-4 demultiplexer with select inputs S1=1, S0=0 routes the data input to output Y2 while Y0, Y1, and Y3 remain at 0.

#### Design for Testability

A collection of design techniques and added circuitry that make a manufactured integrated circuit easier to test by improving controllability and observability of internal nodes after fabrication.

**Example:** Adding a scan chain to a design allows an external tester to shift test patterns into all flip-flops and shift out their responses, detecting stuck-at faults in internal logic.

#### Design Hierarchy

The multi-level organizational structure of a digital system where a top-level module instantiates sub-modules, which in turn instantiate lower-level components, forming a tree of progressively simpler design units.

**Example:** A processor top module contains a control unit and a datapath; the datapath contains an ALU, register file, and multiplexers, each described as separate VHDL entities.

#### Design Modularity

A design principle that partitions a system into self-contained, well-defined functional blocks with clear interfaces, enabling independent development, testing, reuse, and substitution of individual modules.

**Example:** A UART transmitter, UART receiver, and baud rate generator are designed as separate VHDL entities with defined port interfaces, allowing each to be tested and reused independently.

#### Design Under Test

The specific VHDL entity and architecture being verified by a testbench. It is the target module instantiated within the testbench environment that receives stimulus and whose outputs are observed for correctness.

**Example:** In a testbench for a 4-bit counter, the counter entity is the design under test, instantiated as a component and driven by clock and reset stimuli.

#### Difference Bit

The output bit in subtraction circuits that represents the difference of the input bits.

**Example:** In a half subtractor, the difference output D = A XOR B.

#### Digital Systems

Electronic systems that process information using discrete voltage levels representing binary values.

**Example:** Computers, smartphones, and digital watches are digital systems.

#### Distributive Law

A Boolean algebra property allowing factoring and expansion: A·(B+C) = A·B + A·C and A+(B·C) = (A+B)·(A+C).

**Example:** X(Y+Z) can be expanded to XY + XZ using the distributive law.

#### Dont Care Condition

An input combination for which the output value is unspecified, allowing flexibility in optimization.

**Example:** In a BCD decoder, input combinations 1010-1111 are don't cares because they never occur.

#### Dont Care in POS

The use of unspecified output conditions as 1s when simplifying using product-of-sums form.

**Example:** When deriving POS, treat don't cares as 1s to create larger groups of 0s.

#### Dont Care in SOP

The use of unspecified output conditions as 1s when simplifying using sum-of-products form.

**Example:** A don't care can be grouped with 1s on a K-map to form larger, simpler groups.

#### Duality Principle

The property that any Boolean theorem remains valid when AND and OR are interchanged and 0 and 1 are interchanged.

**Example:** The dual of A + 0 = A is A · 1 = A.

#### Duty Cycle

The percentage of a clock signal's period during which the signal is at logic high, expressed as the ratio of high time to total period.

**Example:** A clock with a 10 ns period that is high for 6 ns and low for 4 ns has a 60% duty cycle.

#### Edge Detector

A small sequential circuit that produces a single-clock-cycle pulse when it detects a rising edge, falling edge, or both on an input signal, typically implemented using a flip-flop and combinational logic.

**Example:** A rising-edge detector compares the current input with its one-clock-delayed version: `pulse <= input_signal and not input_delayed;` produces a one-cycle high pulse on each rising transition.

#### Edge-Triggered Device

A sequential circuit element that samples its inputs and updates its outputs only at the instant of a clock signal transition (rising or falling edge), ignoring input changes at all other times.

**Example:** A positive-edge-triggered D flip-flop captures the value of D only at the moment the clock transitions from 0 to 1; changes to D during the clock high or low phase have no effect.

#### EEPROM

Electrically Erasable Programmable Read-Only Memory, a non-volatile memory technology that can be electrically erased and reprogrammed at the byte level, commonly used in PLDs to allow in-system reconfiguration.

**Example:** A GAL22V10 uses EEPROM cells to store its programmable logic configuration, allowing the device to be erased and reprogrammed electrically without removal from the circuit board.

#### Enable Signal

A control input that allows or prevents a circuit from operating or passing signals.

**Example:** A tri-state buffer passes its input to output only when the enable signal is active.

#### Encoder

A combinational circuit that converts a set of input lines, typically in one-hot format, into a compact binary code representing which input is active.

**Example:** A 4-to-2 encoder with input D2 active (and all others inactive) produces the binary output 10, encoding the index of the active input.

#### Entered Variable K-Map

A K-map technique where cells contain variables or expressions instead of just 0s and 1s, reducing the map size.

**Example:** A 5-variable function can be represented on a 4-variable map with variable E entered in cells.

#### Entity Declaration

A VHDL construct that defines the external interface of a design unit, specifying its name and ports with their directions and data types, without revealing any internal implementation details.

**Example:** `entity and_gate is port(a, b : in std_logic; y : out std_logic); end and_gate;` declares a two-input AND gate interface.

#### Enumerated Type

A user-defined VHDL data type consisting of an explicitly listed set of named values, commonly used to represent finite-state machine states in a readable and self-documenting manner.

**Example:** `type state_type is (IDLE, FETCH, DECODE, EXECUTE);` defines four named states for a processor control unit's state machine.

#### EPROM

Erasable Programmable Read-Only Memory, a non-volatile memory technology that is programmed electrically and erased by exposure to ultraviolet light through a quartz window on the chip package, requiring physical removal for erasure.

**Example:** The Altera EP900 PLD uses EPROM technology; to reprogram it, the chip must be removed from the board and placed under a UV lamp for 15 to 20 minutes to erase its contents before a new configuration can be programmed.

#### Equivalent States

Two states in a finite state machine that produce identical output sequences for every possible input sequence and transition to equivalent next states, meaning they are functionally indistinguishable.

**Example:** If states S1 and S3 both output 0 for input A and 1 for input B, and both transition to S2 on A and S4 on B, then S1 and S3 are equivalent and one can be eliminated during state minimization.

#### Essential Prime Implicant

A prime implicant that is the only one covering at least one minterm of the function.

**Example:** If PI₁ is the only prime implicant covering minterm m₇, then PI₁ is essential.

#### Essential Prime Implicants Selection

The process in the Quine-McCluskey method of identifying and selecting prime implicants that must appear in any minimum solution.

**Example:** Examining the PI chart columns to find minterms covered by only one prime implicant.

#### Even Parity

An error detection scheme where the total number of 1-bits including the parity bit is always even.

**Example:** For data 1011, even parity adds bit 1, making 10111 with four 1s (even).

#### Excitation Table

The inverse of a characteristic table, showing the required flip-flop input values to produce a desired state transition from a known current state, essential for sequential circuit design.

**Example:** The JK flip-flop excitation table shows that to transition from Q = 1 to Q_next = 0, the required inputs are J = 0 and K = 1 (or J = don't care, K = 1).

#### Expansion Theorem

A theorem allowing a Boolean function to be expressed in terms of its cofactors with respect to a variable.

**Example:** F = A·F_A + A'·F_A' expands F using cofactors with respect to variable A.

#### Factoring

A multi-level optimization technique that extracts common variables or sub-expressions from a two-level Boolean expression, reducing gate count and fan-in at the cost of additional logic levels.

**Example:** The expression F = ABC + ABD + ABE factors to F = AB(C + D + E), reducing the implementation from four gates to three.

#### Falling Edge

The transition of a digital signal from logic 1 (high) to logic 0 (low), used as the active clock edge in negative-edge-triggered sequential devices.

**Example:** A negative-edge-triggered flip-flop samples its D input at the falling edge of the clock, indicated by a bubble on the clock input in the schematic symbol.

#### Fan-In and Fan-Out

Fan-in is the number of inputs a gate can accept; fan-out is the number of gates a single output can drive.

**Example:** A gate with fan-in of 4 accepts 4 inputs; fan-out of 10 means it can drive 10 gate inputs.

#### Feedback Loop

A signal path in which a circuit's output is routed back to one of its inputs, creating the ability to sustain a state and providing the fundamental mechanism for memory in sequential circuits.

**Example:** In an SR latch, the output of each NOR gate feeds back to an input of the other NOR gate, forming a feedback loop that maintains the stored bit value.

#### Field-Programmable Gate Array

An integrated circuit containing an array of configurable logic blocks, programmable interconnects, and I/O blocks that can be configured by the end user to implement virtually any digital circuit after manufacturing.

**Example:** A Xilinx Artix-7 FPGA with 215,000 logic cells can be programmed to implement a complete RISC-V processor core, UART peripherals, and custom DSP pipelines, all defined by a bitstream loaded at power-up.

#### Finite State Machine

A mathematical model of sequential computation consisting of a finite set of states, input and output alphabets, a next-state function, and an output function, used to design synchronous sequential circuits.

**Example:** A vending machine controller is modeled as an FSM with states representing the amount of money inserted, inputs for each coin type, and outputs that dispense the product and return change.

#### Five Variable K-Map

A Karnaugh map for functions of five variables, typically drawn as two adjacent 4-variable maps.

**Example:** A 5-variable K-map has 32 cells arranged as two 16-cell maps for variable E=0 and E=1.

#### Five Variable Technique

The method of handling 5-variable K-maps by comparing corresponding cells in two 4-variable submaps.

**Example:** Cells at the same position in E=0 and E=1 submaps are adjacent and can be grouped.

#### Flash Memory

A non-volatile memory technology based on floating-gate transistors that can be electrically erased in blocks and reprogrammed, used in some FPGAs and CPLDs to store configuration data that persists without external power.

**Example:** A Microsemi SmartFusion2 FPGA uses flash-based configuration memory, allowing the device to begin operating immediately at power-up without needing an external configuration memory or boot sequence.

#### Flattening

The process of expanding a multi-level Boolean expression back to a two-level sum-of-products or product-of-sums form using the distributive law, achieving minimum propagation delay.

**Example:** The multi-level expression F = A(B + CD) flattens to the two-level form F = AB + ACD.

#### Four Variable K-Map

A Karnaugh map with 16 cells arranged in a 4×4 grid for functions of four variables.

**Example:** A 4-variable K-map for F(A,B,C,D) has rows labeled with AB combinations and columns with CD.

#### Full Adder

A combinational circuit that adds three input bits (two operands plus carry-in) producing a sum and carry-out.

**Example:** A full adder with inputs A=1, B=1, C_in=1 produces Sum=1 and C_out=1.

#### Full Subtractor

A combinational circuit that subtracts one bit from another while accounting for a borrow input.

**Example:** A full subtractor computes A - B - B_in, producing difference and borrow-out.

#### Function Block

A major logic subdivision within a CPLD, typically equivalent to one SPLD, containing a programmable AND array, product-term allocators, and macrocells that collectively implement a portion of the overall design.

**Example:** Each function block in an Altera MAX 7000 CPLD provides 16 macrocells sharing a common set of 36 input signals from the programmable interconnect array, functioning like an independent PAL within the larger device.

#### Function from Truth Table

The process of deriving a Boolean expression from a truth table by identifying rows where the output is 1.

**Example:** From a truth table, write minterms for each row with output 1, then OR them together.

#### Functional Verification

The process of confirming through simulation, formal methods, or emulation that a digital design behaves according to its specification under all relevant input conditions before fabrication or FPGA implementation.

**Example:** Running a testbench that applies thousands of input vectors to a FIFO design and compares each output against a reference model to confirm correct read/write behavior.

#### Fuse

A one-time programmable interconnect element that is initially a closed connection and becomes a permanent open circuit when a high programming current melts the conductive link, used in early PLDs such as PROMs and PALs.

**Example:** In a bipolar PROM, each bit is stored by a small metal fuse; programming a 0 at a specific address drives a high current through the corresponding fuse, permanently blowing it open to disconnect that connection.

#### GAL

Generic Array Logic, a reprogrammable PLD with a programmable AND array and fixed OR array that uses EEPROM technology, allowing it to be electrically erased and reprogrammed multiple times as a replacement for various PAL devices.

**Example:** A GAL16V8 can be reprogrammed to emulate different PAL devices such as the PAL16L8, PAL16R4, or PAL16R8, reducing inventory requirements by serving as a universal replacement for multiple fixed PAL types.

#### Gate Count Minimization

The optimization goal of implementing a Boolean function with the fewest possible logic gates.

**Example:** Simplifying AB + AC to A(B+C) reduces gate count from 3 to 2.

#### Gate Count Optimization

The process of reducing the total number of gates required to implement a Boolean function.

**Example:** Using NAND gates exclusively may reduce total gate count due to their universal nature.

#### Gate Loading

The electrical effect of connecting a gate output to multiple gate inputs, where each driven input presents a capacitive load that increases the driving gate's propagation delay.

**Example:** A NAND gate driving ten inputs has a longer output transition time than one driving two inputs, because the total load capacitance is five times greater.

#### Gate Symbols

Standardized graphical representations used to draw logic gates in circuit diagrams.

**Example:** AND gates are drawn as a flat-backed D shape; OR gates have a curved back.

#### Gated SR Latch

An SR latch augmented with an enable input that must be active for the set and reset inputs to affect the stored state, providing basic control over when state changes can occur.

**Example:** With Enable = 0, a gated SR latch ignores all changes on S and R, holding its current state; with Enable = 1, it responds normally to set and reset commands.

#### Gray Code

A binary code where successive values differ by exactly one bit, minimizing switching errors.

**Example:** Gray code sequence: 00, 01, 11, 10 (each adjacent pair differs by one bit).

#### Group of Ones

A rectangular grouping of cells containing 1s on a K-map, used for SOP simplification.

**Example:** Four adjacent 1s in a 2×2 block form a group that eliminates two variables.

#### Group of Zeros

A rectangular grouping of cells containing 0s on a K-map, used for POS simplification.

**Example:** Grouping 0-cells yields maxterms for the product-of-sums expression.

#### Grouping by Number of Ones

The initial step in the Quine-McCluskey method where minterms are organized by the count of 1-bits in their binary representation.

**Example:** Minterms 0, 1, 2, 4 group as: Group 0 (0000), Group 1 (0001, 0010, 0100).

#### Half Adder

A combinational circuit that adds two single bits, producing a sum and carry output.

**Example:** A half adder with inputs A=1 and B=1 produces Sum=0 and Carry=1.

#### Half Subtractor

A combinational circuit that subtracts one bit from another, producing difference and borrow outputs.

**Example:** A half subtractor computes A - B, producing Difference = A XOR B and Borrow = A'B.

#### Hardware Description Language

A specialized programming language used to describe the structure and behavior of digital circuits at various levels of abstraction, enabling simulation, synthesis, and implementation of digital designs in FPGAs and ASICs.

**Example:** A designer writes Verilog code defining a 4-bit counter using an always block triggered on the rising clock edge, then synthesizes it to gate-level netlist for implementation on an FPGA.

#### Hardware Inference

The process by which a synthesis tool interprets VHDL behavioral descriptions and determines the corresponding hardware structures, such as multiplexers, registers, or adders, to implement in the target technology.

**Example:** A process with `if rising_edge(clk) then q <= d; end if;` causes the synthesizer to infer a D flip-flop.

#### Hexadecimal Number System

A positional number system using base 16 with digits 0-9 and letters A-F (representing 10-15).

**Example:** Hexadecimal 2F equals decimal 47 (2×16 + 15×1).

#### Hexadecimal to Binary

The process of converting hexadecimal numbers to binary by expanding each hex digit to 4 bits.

**Example:** Hexadecimal A3 converts to binary 1010 0011.

#### Hexadecimal to Decimal

The process of converting a hexadecimal number to decimal by summing weighted positional values.

**Example:** Hex FF converts to decimal: 15×16 + 15×1 = 255.

#### High and Low States

The two voltage levels in digital circuits representing binary 1 (high) and 0 (low).

**Example:** In TTL logic, high is approximately 5V and low is approximately 0V.

#### Hold Time

The minimum duration that a flip-flop's data input must remain stable after the active clock edge to ensure the input value is correctly captured by the internal circuitry.

**Example:** A flip-flop with a hold time of 0.3 ns requires its D input to remain unchanged for at least 0.3 ns after the rising clock edge to guarantee correct operation.

#### Hold Time Budgeting

The timing analysis practice of ensuring that data at a flip-flop's input remains stable for a sufficient duration after the active clock edge, accounting for minimum clock-to-output delays and routing variations.

**Example:** If a flip-flop requires 0.2 ns hold time and the shortest combinational path delay is 0.3 ns, the hold slack is 0.1 ns, indicating the constraint is satisfied.

#### Idempotent Law

A Boolean algebra theorem stating that ORing or ANDing a variable with itself yields the same variable.

**Example:** A + A = A and A · A = A.

#### Identity Law

A Boolean algebra theorem stating that ORing with 0 or ANDing with 1 leaves a variable unchanged.

**Example:** A + 0 = A and A · 1 = A.

#### IEEE Gate Symbols

Standardized logic gate symbols defined by the Institute of Electrical and Electronics Engineers.

**Example:** IEEE rectangular symbols use distinctive shapes and qualifying symbols inside rectangles.

#### If-Then-Else Statement

A sequential VHDL statement used within a process that evaluates conditions in priority order and executes the corresponding statements for the first true condition, synthesizing into priority-encoded logic.

**Example:** `if sel = '1' then y <= a; else y <= b; end if;` implements a 2-to-1 multiplexer with sel controlling the output.

#### Implicant

A product term that evaluates to 1 only for input combinations where the function also equals 1.

**Example:** AB is an implicant of F = AB + BC because whenever AB=1, F=1.

#### Implicant Table Construction

The first phase of the Quine-McCluskey method where minterms are listed and grouped by the number of 1-bits.

**Example:** Creating columns for original minterms, their binary representation, and group classification.

#### Implication Table

A triangular table used in state minimization that systematically identifies equivalent state pairs by recording the conditions under which two states can be merged, iteratively eliminating incompatible pairs.

**Example:** Given states S0 through S3, the implication table initially marks pairs with conflicting outputs as incompatible, then iteratively checks whether implied next-state pairs are also compatible, until no further eliminations occur.

#### Incompletely Specified

A Boolean function for which some input combinations have undefined (don't care) outputs.

**Example:** A BCD decoder is incompletely specified because inputs 10-15 are invalid BCD values.

#### Incompletely Specified Func

A logic function where certain input combinations produce outputs that are not defined or constrained.

**Example:** Functions with don't care conditions are incompletely specified.

#### Interface Specification

A formal document or definition that describes the signals, timing, protocols, and data formats required for two modules or subsystems to communicate correctly, establishing a contract between design teams.

**Example:** An interface specification for an SPI peripheral defines MOSI, MISO, SCLK, and CS signal names, their active levels, clock polarity, data bit ordering, and maximum operating frequency.

#### Inverter

A logic gate that outputs the complement of its input; also called a NOT gate.

**Example:** An inverter with input 1 produces output 0.

#### Involution Law

A Boolean algebra theorem stating that complementing a variable twice returns the original value.

**Example:** (A')' = A, meaning double negation cancels out.

#### Iterative Combination Process

The repeated application of the combination step in the Quine-McCluskey method until no more combinations are possible.

**Example:** First iteration combines minterms, second combines those results, continuing until no valid pairs remain.

#### JK Flip-Flop

An edge-triggered memory element with two inputs J and K that provides four operations: hold (J=K=0), reset (J=0, K=1), set (J=1, K=0), and toggle (J=K=1), with the characteristic equation Q_next = JQ' + K'Q.

**Example:** A JK flip-flop with J = 1, K = 1, and current state Q = 0 toggles to Q = 1 at the next active clock edge, making it useful for building binary counters.

#### Johnson Counter

A shift register counter with the complemented output of the last flip-flop fed back to the input of the first, producing a sequence of 2n unique states for an n-bit register in a twisted-ring pattern.

**Example:** A 3-bit Johnson counter cycles through 000, 100, 110, 111, 011, 001, and back to 000, providing six glitch-free decoded outputs since only one bit changes per transition.

#### K-Map Adjacency

The property where cells in a Karnaugh map differ by exactly one variable, allowing them to be grouped.

**Example:** In a K-map, cells 0100 and 0101 are adjacent because they differ only in the last bit.

#### K-Map Cell

A single square in a Karnaugh map representing one minterm or maxterm of the function.

**Example:** In a 3-variable K-map, each of the 8 cells corresponds to one possible input combination.

#### K-Map Gray Code Order

The arrangement of K-map rows and columns using Gray code sequence so adjacent cells differ by one bit.

**Example:** Column headers 00, 01, 11, 10 ensure horizontal neighbors differ by one variable.

#### K-Map Grouping

The process of combining adjacent cells in a K-map to simplify Boolean expressions.

**Example:** Grouping four adjacent 1-cells eliminates two variables from the corresponding term.

#### K-Map Limitations

The practical constraints of Karnaugh maps, including difficulty with more than 5-6 variables and potential for human error.

**Example:** K-maps become impractical beyond 5 variables; use Quine-McCluskey for larger functions.

#### K-Map POS Simplification

The process of using a K-map to derive a minimal product-of-sums expression by grouping 0-cells.

**Example:** Circling groups of 0s and writing the maxterm for each group yields the POS form.

#### K-Map SOP Simplification

The process of using a K-map to derive a minimal sum-of-products expression by grouping 1-cells.

**Example:** Circling groups of 1s and writing the product term for each group yields the SOP form.

#### K-Map Structure

The two-dimensional grid layout of a Karnaugh map with Gray-coded row and column headers.

**Example:** A 4-variable K-map has a 4×4 structure with AB on rows and CD on columns.

#### K-Map Variables

The Boolean variables represented by the rows and columns of a Karnaugh map.

**Example:** In a K-map for F(A,B,C), variables A and B might label rows while C labels columns.

#### K-Map vs Algebraic Method

A comparison of the graphical K-map approach versus algebraic simplification using Boolean laws.

**Example:** K-maps provide visual pattern recognition while algebra requires methodical application of theorems.

#### K-Map with Dont Cares

A Karnaugh map containing cells marked with 'X' or 'd' representing don't care conditions.

**Example:** Don't care cells can be included in groups to create larger, simpler groupings.

#### Karnaugh Map

A graphical method for simplifying Boolean expressions using a grid where adjacent cells differ by one variable.

**Example:** A 4-variable K-map allows visual identification of groupings that simplify F(A,B,C,D).

#### Latch Inference

An unintended synthesis outcome where a level-sensitive latch is generated because a signal is not assigned a value on every possible execution path through a combinational process, creating implicit memory.

**Example:** A process with `if en = '1' then q <= d; end if;` and no else clause infers a latch because q must hold its value when en is '0'.

#### Least Significant Bit

The bit position in a binary number with the smallest weight (rightmost position, weight 2⁰).

**Example:** In binary 1101, the LSB is 1 (rightmost), representing the value 1.

#### Level Reduction

A circuit restructuring technique that decreases the number of gate stages between input and output, reducing propagation delay while potentially increasing gate count or fan-in.

**Example:** Partially flattening a 5-level circuit to 3 levels by expanding only the innermost nested sub-expressions reduces delay without requiring impractically large gates.

#### Level-Sensitive Device

A sequential circuit element whose output continuously tracks its data input whenever the enable or clock signal is at the active level, as opposed to sampling only at a clock edge.

**Example:** A D latch is level-sensitive: while its enable is high, any change on D immediately propagates to Q, making the latch transparent during the entire active phase.

#### Literal

A Boolean variable or its complement appearing in a Boolean expression.

**Example:** The expression A'BC contains three literals: A', B, and C.

#### Literal Count

The total number of variable appearances in a Boolean expression.

**Example:** The expression AB + A'C + BC has a literal count of 6.

#### Literal Count Optimization

The process of minimizing the total number of literals in a Boolean expression.

**Example:** Simplifying XY + XZ to X(Y+Z) reduces literal count from 4 to 3.

#### Literal Minimization

The optimization goal of reducing the number of variable occurrences in a Boolean expression.

**Example:** Fewer literals generally means fewer gate inputs and reduced circuit complexity.

#### Logic Circuit

An interconnection of logic gates that implements a Boolean function.

**Example:** A circuit with two AND gates feeding an OR gate implements F = AB + CD.

#### Logic Function

A relationship mapping Boolean input values to Boolean output values.

**Example:** F(A,B) = A·B defines a logic function that is 1 only when both A and B are 1.

#### Logic Gates

Electronic circuits that perform basic Boolean operations on one or more inputs to produce an output.

**Example:** AND, OR, and NOT are the three fundamental logic gates.

#### Logic Levels

The voltage ranges that represent logical 0 and logical 1 in a digital circuit.

**Example:** In CMOS logic, 0-0.8V represents logic 0 and 2-5V represents logic 1.

#### Logical Adjacency

The property of two K-map cells differing in exactly one variable, allowing them to be grouped.

**Example:** Cells representing minterms 5 (101) and 7 (111) are logically adjacent (differ in variable B).

#### Lookup Table

A small programmable memory within an FPGA configurable logic block that stores the truth table of a Boolean function, enabling implementation of any logic function of its input variables by reading the stored output value.

**Example:** A 4-input LUT contains 16 SRAM bits storing the complete truth table of a function; to implement a 4-input XOR, the LUT is programmed with a 1 at each address having an odd number of 1-bits in the input combination.

#### Macrocell

The output structure within a PLD or CPLD function block that typically includes a configurable flip-flop, output enable control, and polarity selection, providing either registered or combinational output for each function block output.

**Example:** A macrocell in a GAL22V10 allows the designer to select either the combinational sum-of-products result or its registered version through a D flip-flop, with programmable polarity to produce active-high or active-low outputs.

#### Magnitude Comparator

A circuit that compares two multi-bit binary numbers and outputs their relative magnitude relationship.

**Example:** A 4-bit magnitude comparator outputs A>B, A=B, or A<B for two 4-bit inputs.

#### Mask ROM

A read-only memory whose data content is permanently defined during the semiconductor fabrication process through a custom photolithographic mask, making it the lowest cost per unit at high volumes but inflexible after manufacture.

**Example:** A video game cartridge uses a mask ROM to store the game program; the bit pattern is defined by the metal interconnect mask during chip fabrication, making each chip identical and unalterable but very inexpensive in quantities above 100,000.

#### Master-Slave Flip-Flop

A flip-flop constructed from two latches with complementary enables, where the master latch captures input data during one clock phase and the slave latch transfers it to the output during the opposite phase.

**Example:** In a positive-edge-triggered master-slave D flip-flop, the master latch is transparent during clock low (tracking D), and the slave latch transfers the captured value to Q when the clock goes high.

#### Maxterm

A sum term containing all variables of a function, each appearing either complemented or uncomplemented.

**Example:** For F(A,B,C), maxterm M₃ = A + B + C' corresponds to the input combination 011.

#### Maxterm Designation

The notation identifying a maxterm by its decimal index, equal to the input combination that makes it 0.

**Example:** M₅ denotes the maxterm for input combination 101, which is A' + B + C'.

#### Maxterm Expansion

The expression of a Boolean function as a product of all maxterms for which the function equals 0.

**Example:** F = ∏M(1, 3, 5) means F is the product of maxterms M₁, M₃, and M₅.

#### Maxterm from Truth Table

The process of writing a maxterm for each row where the function output is 0.

**Example:** If F=0 when ABC=011, write maxterm A+B'+C' (each variable complemented from its row value).

#### Maxterm List Notation

A compact representation listing the indices of maxterms that form a function's POS expression.

**Example:** F = ∏M(0, 2, 5) indicates the function is the product of M₀, M₂, and M₅.

#### Maxterm to Minterm

The conversion between maxterm and minterm indices using the complement relationship.

**Example:** For n variables, minterms in f are maxterms in f', so Σm(1,3,5) = ∏M(0,2,4,6,7).

#### Mealy Machine

A finite state machine whose output depends on both the current state and the current input, allowing outputs to change asynchronously within a clock period in response to input changes.

**Example:** A sequence detector implemented as a Mealy machine asserts its output immediately when the final bit of the target pattern "101" arrives, one clock cycle earlier than an equivalent Moore implementation.

#### Medium-Scale Integration

A classification of integrated circuits containing tens to hundreds of logic gates that implement functional building blocks such as multiplexers, decoders, encoders, and comparators.

**Example:** The 74151 eight-to-one multiplexer is a medium-scale integration device containing the equivalent of approximately 40 gates on a single chip.

#### Metastability

An unstable condition in which a flip-flop's output voltage hovers between valid logic 0 and logic 1 levels for an unpredictable duration, caused by violating setup or hold time requirements.

**Example:** If D changes exactly at the rising clock edge, the flip-flop may enter metastability, producing an indeterminate output that could take nanoseconds or longer to resolve to a valid level.

#### Minimal Cover Selection

The process of choosing the smallest set of prime implicants that covers all required minterms.

**Example:** If PI₁ and PI₂ together cover all minterms and no single PI does, {PI₁, PI₂} is a minimal cover.

#### Minimal POS Expression

A product-of-sums expression with the minimum number of maxterms and literals.

**Example:** F = (A+B)(A'+C) is minimal if no further simplification is possible.

#### Minimal SOP Expression

A sum-of-products expression with the minimum number of product terms and literals.

**Example:** F = AB + C is a minimal SOP if it cannot be further simplified.

#### Minterm

A product term containing all variables of a function, each appearing either complemented or uncomplemented.

**Example:** For F(A,B,C), minterm m₅ = A·B'·C corresponds to the input combination 101.

#### Minterm Designation

The notation identifying a minterm by its decimal index, equal to the input combination that makes it 1.

**Example:** m₆ denotes the minterm for input combination 110, which is A·B·C'.

#### Minterm Expansion

The expression of a Boolean function as a sum of all minterms for which the function equals 1.

**Example:** F = Σm(1, 4, 5, 7) means F is the sum of minterms m₁, m₄, m₅, and m₇.

#### Minterm from Truth Table

The process of writing a minterm for each row where the function output is 1.

**Example:** If F=1 when ABC=101, write minterm A·B'·C (variables uncomplemented if 1, complemented if 0).

#### Minterm Generation

The property of a decoder that produces all 2^n minterms of its n input variables on separate output lines, enabling implementation of any Boolean function by OR-ing selected outputs.

**Example:** A 3-to-8 decoder generates all eight minterms of three variables, so F = Sigma m(1,2,6,7) is implemented by OR-ing outputs Y1, Y2, Y6, and Y7.

#### Minterm List Notation

A compact representation listing the indices of minterms that form a function's SOP expression.

**Example:** F = Σm(2, 4, 6) indicates the function is the sum of m₂, m₄, and m₆.

#### Minterm to Maxterm

The conversion between minterm and maxterm indices for a function and its complement.

**Example:** If F = Σm(1,3,5,7) then F = ∏M(0,2,4,6) because F' uses the complement set of indices.

#### Modulo-N Counter

A counter that cycles through exactly N distinct states before returning to its initial state, achieved either by using an N-state natural binary sequence or by adding reset logic to a larger counter.

**Example:** A modulo-6 counter built from a 3-bit binary counter with a combinational reset that forces the count back to 000 when the state 110 is detected, producing states 000 through 101.

#### Moore Machine

A finite state machine whose output depends solely on the current state and is independent of the current input, producing outputs that change only on clock edges when the state transitions.

**Example:** A Moore-based traffic light controller assigns the output signal (green, yellow, or red) to each state directly, so the light changes only when the FSM transitions to a new state at a clock edge.

#### Most Significant Bit

The bit position in a binary number with the largest weight (leftmost position).

**Example:** In binary 1101, the MSB is 1 (leftmost), representing the value 8.

#### Multi-Level Circuit

A logic circuit with more than two levels of gates between primary inputs and outputs, offering reduced gate count and fan-in compared to two-level implementations at the cost of increased propagation delay.

**Example:** The circuit for F = AB(C + D) + E has three levels: an OR gate, an AND gate, and a final OR gate.

#### Multi-Output Function Minimization

The optimization of multiple Boolean functions simultaneously to share common product terms.

**Example:** If F₁ and F₂ both require term AB, implementing it once and sharing reduces total gates.

#### Multiple Input Gates

Logic gates designed to accept more than two inputs.

**Example:** A 4-input AND gate outputs 1 only when all four inputs are 1.

#### Multiple Solutions

The existence of more than one minimal Boolean expression with the same cost.

**Example:** Two different groupings on a K-map may yield equally minimal but different expressions.

#### Multiplexer

A combinational circuit that selects one of 2^n data inputs and routes it to a single output, controlled by n select signals that determine which input is connected to the output.

**Example:** A 4-to-1 multiplexer with select inputs S1=1, S0=0 passes data input D2 to the output Y, ignoring D0, D1, and D3.

#### Multiplexer Tree Expansion

A hierarchical construction technique that builds larger multiplexers from smaller ones by cascading levels, where lower-level MUXes handle the least significant select bits and upper-level MUXes handle the most significant bits.

**Example:** Five 4-to-1 multiplexers arranged in two levels (four in the first level, one in the second) form a 16-to-1 multiplexer.

#### NAND Gate

A logic gate that produces the complement of AND; outputs 0 only when all inputs are 1.

**Example:** A 2-input NAND with A=1, B=1 outputs 0; any other combination outputs 1.

#### Next-State Function

The mapping that determines the next state of a finite state machine given its current state and current input, formally expressed as a function from the Cartesian product of states and inputs to states.

**Example:** For a 2-bit counter FSM, the next-state function maps state 01 with enable input 1 to state 10, defining the transition that occurs on the next active clock edge.

#### Next-State Logic

The combinational circuitry that implements the next-state function by computing the flip-flop excitation inputs from the present state variables and external inputs of a sequential circuit.

**Example:** In a synchronous counter using D flip-flops, the next-state logic consists of AND, OR, and NOT gates whose outputs connect to the D inputs, determining what value each flip-flop stores on the next clock edge.

#### Nibble

A group of 4 bits, representing half of a byte.

**Example:** The hexadecimal digit F represents the nibble 1111.

#### Non-Recurring Engineering Cost

The one-time design, development, and tooling expenses incurred before production begins, including mask generation, verification, and testing setup, which must be amortized across all manufactured units of the final product.

**Example:** An ASIC design has an NRE cost of $500,000 for mask fabrication and design verification; if 100,000 units are produced, the NRE adds $5 per unit, making ASICs cost-effective only at high volumes compared to FPGAs with no NRE.

#### NOR Gate

A logic gate that produces the complement of OR; outputs 1 only when all inputs are 0.

**Example:** A 2-input NOR with A=0, B=0 outputs 1; any other combination outputs 0.

#### NOT Gate

A logic gate that outputs the complement of its single input.

**Example:** A NOT gate with input 1 produces output 0.

#### NOT Operation

A Boolean operation that inverts its operand; 0 becomes 1 and 1 becomes 0.

**Example:** NOT(1) = 0 and NOT(0) = 1.

#### Null Law

A Boolean algebra theorem stating that ANDing with 0 yields 0 and ORing with 1 yields 1.

**Example:** A · 0 = 0 and A + 1 = 1.

#### Octal Number System

A positional number system using base 8 with digits 0 through 7.

**Example:** Octal 17 equals decimal 15 (1×8 + 7×1).

#### Octal to Binary Conversion

The process of converting octal numbers to binary by expanding each octal digit to 3 bits.

**Example:** Octal 75 converts to binary 111 101.

#### Octal to Decimal Conversion

The process of converting an octal number to decimal by summing weighted positional values.

**Example:** Octal 52 converts to decimal: 5×8 + 2×1 = 42.

#### Odd Parity

An error detection scheme where the total number of 1-bits including the parity bit is always odd.

**Example:** For data 1011 (three 1s), odd parity adds bit 0, keeping the total at three (odd).

#### Off-Set of Function

The set of input combinations for which a Boolean function evaluates to 0.

**Example:** For F = AB, the off-set includes {00, 01, 10} where F = 0.

#### On-Set of Function

The set of input combinations for which a Boolean function evaluates to 1.

**Example:** For F = A + B, the on-set includes {01, 10, 11} where F = 1.

#### One-Hot Encoding

A binary encoding scheme in which exactly one bit is high (1) at any time, with each bit position representing a unique state or input, commonly produced by decoders.

**Example:** In a 4-bit one-hot encoding, the value "third item" is represented as 0100, with only the third bit set to 1.

#### One-Time Programmable

A category of programmable devices that can be configured only once because their programming mechanism permanently alters the physical structure, such as blowing fuses or forming antifuses, making reprogramming impossible.

**Example:** A fuse-based PAL is an OTP device; once the design is programmed by selectively blowing fuses, the configuration is permanent and the device cannot be erased or reused if the design contains an error.

#### Ones Complement

A signed number representation where negative numbers are formed by inverting all bits of the positive value.

**Example:** In 8-bit 1's complement, -5 is represented as 11111010 (complement of 00000101).

#### OR Gate

A logic gate that outputs 1 if at least one input is 1; outputs 0 only when all inputs are 0.

**Example:** A 2-input OR gate with A=0, B=1 produces output 1.

#### OR Operation

A Boolean operation that returns 1 when at least one operand is 1.

**Example:** In the expression A + B, the result is 1 if A=1 or B=1 or both.

#### OR-AND-Invert (OAI) Gate

A complex CMOS gate that performs OR operations on groups of inputs, ANDs the results, and inverts the final output within a single transistor structure.

**Example:** An OAI21 gate computes F = ((A + B) * C)' in approximately one gate delay, replacing an OR gate, an AND gate, and an inverter.

#### Output Function

The mapping that determines the output of a finite state machine from its current state alone (Moore) or from its current state and current input together (Mealy), defining the circuit's external behavior.

**Example:** In a Moore-type sequence detector, the output function maps state S4 to output 1 and all other states to output 0, indicating that the target pattern has been fully recognized.

#### Overflow Detection

The process of identifying when an arithmetic operation produces a result too large to represent in the available bits.

**Example:** In 4-bit 2's complement, 0111 + 0001 = 1000 (-8), which is overflow (7+1 ≠ -8).

#### Overlapping Groups

The practice in K-map simplification of allowing groups to share cells, which is valid and often necessary.

**Example:** One group covers cells {0,1} and another covers {1,3}; cell 1 is in both groups.

#### PAL

Programmable Array Logic, a simple PLD architecture featuring a programmable AND array followed by a fixed OR array, where each output is a sum of a fixed number of programmable product terms, simpler than a PLA.

**Example:** A PAL16L8 has 16 inputs, a programmable AND array generating product terms, and a fixed OR array that combines exactly seven product terms per output, enabling implementation of combinational logic functions with up to seven minterms each.

#### Parallel Load Register

A register that can accept all of its data bits simultaneously on a single clock edge when a load enable signal is asserted, allowing an entire n-bit word to be captured in one clock cycle.

**Example:** A 74175 quad D flip-flop register loads four data bits D0 through D3 into its flip-flops in parallel on the rising clock edge when the load enable is high, storing an entire nibble at once.

#### Parallel-In Serial-Out Register

A shift register that loads all data bits simultaneously through parallel inputs and then shifts them out one bit at a time through a serial output, converting parallel data to serial format.

**Example:** A PISO register in a keyboard controller loads an 8-bit key scancode in parallel, then shifts it out serially over eight clock cycles to a single-wire serial bus connecting to the host processor.

#### Parentheses in Boolean

The use of parentheses in Boolean expressions to specify the order of operations.

**Example:** A(B+C) means evaluate B+C first, then AND with A.

#### Parity Checker

A circuit that verifies whether received data has the correct parity bit value.

**Example:** An even parity checker outputs 0 (no error) if the total number of 1-bits is even.

#### Parity Generator

A circuit that computes the parity bit value needed to achieve even or odd parity.

**Example:** For data bits 101, an even parity generator outputs 0 (making total 1s = 2, even).

#### Partial Reconfiguration

The capability to modify a portion of an FPGA's configuration while the remaining logic continues to operate without interruption, enabling dynamic hardware adaptation and time-multiplexing of FPGA resources.

**Example:** In a software-defined radio application, partial reconfiguration allows the FPGA to swap a 5G NR demodulator module for a Wi-Fi demodulator in one region of the chip while the baseband processor in another region continues running uninterrupted.

#### Petrick's Method

An algebraic technique for finding all minimum covers in cyclic prime implicant charts.

**Example:** Petrick's method creates a Boolean expression whose solutions are the valid minimum covers.

#### Physical Adjacency

The spatial nearness of cells on a K-map grid, not always matching logical adjacency due to wraparound.

**Example:** Cells on opposite edges of a K-map may be logically adjacent though physically distant.

#### Pi Notation

The product notation using the Greek letter Π to represent a Boolean function as a product of maxterms.

**Example:** F = ∏(1, 3, 5) means F = M₁ · M₃ · M₅.

#### Pipelining

A design technique that divides a combinational logic path into multiple stages separated by registers, allowing each stage to process different data simultaneously, thereby increasing clock frequency and throughput at the cost of latency.

**Example:** A 4-stage pipelined multiplier inserts registers after each partial-product accumulation stage, allowing a new multiplication to start every clock cycle while each result takes four cycles to complete.

#### PLA

Programmable Logic Array, a PLD architecture with both a programmable AND array and a programmable OR array, providing maximum flexibility in implementing sum-of-products expressions since any product term can be shared among any output.

**Example:** A PLA implementing two functions f1 = AB + BC and f2 = AB + CD generates three unique product terms (AB, BC, CD) in the AND array and shares the AB term between both outputs through the programmable OR array.

#### PLA AND Plane

The programmable AND array in a PLA that generates product terms by forming programmable connections between input variables and their complements to AND gates, defining which literals appear in each product term.

**Example:** In the AND plane, to create the product term A'BC, fuses connecting A-complement, B-true, and C-true to a specific AND gate are left intact while all other input connections to that gate are blown open.

#### PLA OR Plane

The programmable OR array in a PLA that combines selected product terms from the AND plane by forming programmable connections to OR gates, determining which product terms contribute to each output function.

**Example:** In the OR plane, if output F1 requires product terms P0 and P2, the fuses connecting P0 and P2 to the F1 OR gate remain intact while the fuse for P1 is blown, producing F1 = P0 + P2.

#### Place and Route

The physical implementation stage where synthesized logic elements are assigned to specific locations on an FPGA or ASIC die (placement) and interconnected through routing resources to meet timing and area constraints.

**Example:** After synthesis maps a design to 2,400 look-up tables, the place and route tool positions them on the FPGA and configures switch matrices to connect them, then reports timing closure.

#### Port

A named interface element in a VHDL entity declaration that defines a connection point for signals entering or leaving the design unit, characterized by a name, data type, and directional mode.

**Example:** In `port(clk : in std_logic; data_out : out std_logic_vector(7 downto 0));`, clk and data_out are ports connecting the entity to external circuitry.

#### Port Mode

A VHDL keyword specifying the direction of data flow through a port: `in` for input-only, `out` for output-only, `inout` for bidirectional, or `buffer` for an output that can be internally read.

**Example:** A tri-state bus pin is declared as `data_bus : inout std_logic_vector(7 downto 0)` because the device both drives and reads the bus.

#### Positional Notation

A number representation system where digit value depends on both the digit and its position.

**Example:** In decimal 123, the digit 1 represents 100 because of its position.

#### Precedence of Operators

The order in which Boolean operations are evaluated: NOT first, then AND, then OR.

**Example:** In A + B·C, the AND (B·C) is evaluated before the OR with A.

#### Preset

An asynchronous flip-flop control input that immediately forces the output Q to logic 1, overriding normal clocked operation, typically active-low and used for initialization.

**Example:** Asserting the active-low PRE input on a D flip-flop drives Q to 1 regardless of the clock or D input, allowing the system to initialize to a known state at power-on.

#### Prime Implicant

An implicant that cannot be combined with another to form a larger implicant.

**Example:** In a K-map, a group that cannot be made larger without including 0-cells is a prime implicant.

#### Prime Implicant Chart Construction

The creation of a table showing which minterms each prime implicant covers, used to find minimum covers.

**Example:** Rows represent prime implicants, columns represent minterms, with marks showing coverage.

#### Priority Encoder

An encoder that accepts multiple simultaneously active inputs and produces the binary code of only the highest-priority active input, resolving ambiguity that a basic encoder cannot handle.

**Example:** If inputs D5 and D2 are both active on an 8-to-3 priority encoder, the output is 101 (binary for 5), because D5 has higher priority than D2.

#### Process Statement

A VHDL concurrent construct containing sequential statements that execute in the order listed. A process activates when any signal in its sensitivity list changes, modeling both combinational and sequential logic.

**Example:** `process(clk) begin if rising_edge(clk) then q <= d; end if; end process;` describes a D flip-flop using sequential statements inside a process.

#### Product of Maxterms

A Boolean expression formed by ANDing multiple maxterms together.

**Example:** F = (A+B+C')(A'+B+C) is a product of two maxterms.

#### Product of Sums

A Boolean expression structured as an AND of OR terms.

**Example:** F = (A+B)(C+D) is in product-of-sums form.

#### Product Term

A Boolean expression formed by ANDing one or more literals.

**Example:** ABC' is a product term with three literals.

#### Programmable Interconnect

A configurable routing network within a CPLD or FPGA that provides signal paths between logic blocks, I/O pins, and other resources, whose connections are established through programmable switch elements.

**Example:** The programmable interconnect array in a MAX 7000 CPLD routes signals from the outputs of one function block to the inputs of another, with connections determined by EEPROM configuration bits that control pass transistors at each crosspoint.

#### Programmable Logic Device

A general term for any integrated circuit that contains uncommitted logic which can be configured by the user after manufacturing to implement custom digital functions, encompassing SPLDs, CPLDs, and FPGAs.

**Example:** Rather than wiring together multiple 7400-series ICs on a breadboard, a designer programs a single PLD to implement the same combinational and sequential logic in one chip, reducing board area and improving reliability.

#### PROM

Programmable Read-Only Memory, a memory device that is manufactured with all fuses intact and programmed once by the user by selectively blowing fuses to store a permanent bit pattern, functioning as a complete decoder for logic implementation.

**Example:** A 256-by-8 PROM with 8 address lines can implement any eight combinational functions of eight variables by programming each address location with the desired output byte, effectively storing eight complete truth tables.

#### Propagation Delay

The time required for a signal change at a gate's input to produce a corresponding change at its output, measured from the input transition to the output reaching a valid logic level.

**Example:** If each gate has a 2 ns propagation delay and the critical path passes through four gates, the total propagation delay is 8 ns.

#### QM Method with Don't Cares

The application of the Quine-McCluskey algorithm when don't care conditions are present.

**Example:** Include don't cares in combination but exclude their columns from the covering requirement.

#### QM versus K-map Comparison

An analysis of the relative advantages of the Quine-McCluskey method and Karnaugh maps.

**Example:** K-maps are faster for small problems; QM handles more variables and can be automated.

#### Quine-McCluskey Algorithm

A systematic tabular method for finding the minimal sum-of-products form of a Boolean function.

**Example:** The QM algorithm guarantees finding all prime implicants through exhaustive combination.

#### Race Condition

A circuit malfunction that occurs when the output of a latch or flip-flop feeds back through combinational logic to its own input and changes multiple times within a single clock period due to transparency.

**Example:** In a circuit where a D latch output feeds back to its own D input through an inverter, while the latch is enabled the output oscillates because each change immediately causes another change.

#### Radix Point

The symbol separating integer and fractional parts in a positional number representation.

**Example:** In binary 101.11, the radix point separates 101 (integer) from 11 (fraction).

#### Range of Signed Numbers

The interval of values representable in a signed number format with a given number of bits.

**Example:** 8-bit 2's complement represents values from -128 to +127.

#### Read-Only Memory

A non-volatile memory device that permanently or semi-permanently stores data, addressed by input lines that select a word location whose pre-stored contents appear at the data outputs, usable for logic function implementation.

**Example:** A 32-by-8 ROM with 5 address inputs can implement any eight Boolean functions of five variables by storing the truth table values at each of the 32 address locations, replacing two levels of combinational logic.

#### Ready-Valid Handshake

A flow-control protocol where a sender asserts a valid signal to indicate data availability and a receiver asserts a ready signal to indicate acceptance capability. Data transfers only when both signals are asserted simultaneously.

**Example:** A FIFO output uses ready-valid handshaking: the FIFO asserts `data_valid`, the consumer asserts `data_ready`, and one word is dequeued on the clock edge where both are high.

#### Rectangular Groups

Valid K-map groupings that form rectangles (including squares) with sides of power-of-2 length.

**Example:** Valid rectangular groups have 1, 2, 4, 8, or 16 cells in configurations like 1×2, 2×2, 1×4.

#### Redundant Prime Implicant

A prime implicant that is not essential and whose minterms are all covered by other prime implicants.

**Example:** If PI₃ covers only minterms already covered by essential PIs, then PI₃ is redundant.

#### Register

A group of flip-flops that stores a multi-bit binary word, with each flip-flop holding one bit, commonly used for temporary data storage, data transfer, and as building blocks in datapaths.

**Example:** An 8-bit register built from eight D flip-flops stores one byte of data, with all flip-flops sharing a common clock signal so the entire byte is updated simultaneously.

#### Register-Transfer Level

A level of hardware abstraction that describes a digital circuit in terms of data transfers between registers and the combinational logic transformations applied during those transfers on each clock cycle.

**Example:** The RTL statement "on each rising clock edge, load register R1 with the ALU output of R2 plus R3" describes both the storage elements and the operation between them.

#### Resource Sharing

A synthesis optimization technique where a single hardware functional unit, such as an adder or multiplier, is time-multiplexed to perform operations for different data paths, reducing total area at the cost of additional control logic.

**Example:** Instead of instantiating two separate 16-bit multipliers for two mutually exclusive operations, a multiplexer selects the operands and a single multiplier serves both computations.

#### Ring Counter

A circular shift register where the output of the last flip-flop feeds directly back to the input of the first, with a single 1 circulating through n flip-flops to produce n unique one-hot encoded states.

**Example:** A 4-bit ring counter initialized to 1000 cycles through 1000, 0100, 0010, 0001, and back to 1000, providing four decoded states without requiring additional decoding logic.

#### Ripple Carry Adder

An n-bit adder constructed by cascading full adders, where carry propagates through all stages.

**Example:** A 4-bit ripple carry adder chains four full adders with each carry-out feeding the next carry-in.

#### Rising Edge

The transition of a digital signal from logic 0 (low) to logic 1 (high), used as the active clock edge in positive-edge-triggered sequential devices, which are the most common in modern designs.

**Example:** A positive-edge-triggered D flip-flop captures D = 1 at the instant the clock transitions from 0 to 1, indicated by a triangle on the clock input in the schematic symbol.

#### Row Dominance

A technique in prime implicant chart reduction where a PI covering a superset of another's minterms can replace it.

**Example:** If PI₁ covers {1,3,5,7} and PI₂ covers {1,3}, then PI₁ dominates PI₂.

#### Scan Chain

A design-for-testability structure where all flip-flops in a circuit are connected into one or more serial shift registers during test mode, allowing external loading and unloading of internal state for manufacturing test.

**Example:** In test mode, a 500-flip-flop scan chain shifts in a test pattern over 500 clock cycles, applies one capture cycle through combinational logic, then shifts out results for comparison.

#### Selected Signal Assignment

A concurrent VHDL statement that assigns a signal value based on matching a selector expression to specific choices, functioning like a parallel case statement outside a process.

**Example:** `with sel select y <= a when "00", b when "01", c when "10", d when others;` implements a 4-to-1 multiplexer.

#### Self-Checking Testbench

A testbench that automatically compares the design under test's outputs against expected values or a reference model within the simulation, reporting pass or fail without requiring manual waveform inspection.

**Example:** A self-checking testbench for an adder uses assert statements: `assert (sum_out = expected_sum) report "Mismatch at test 5" severity error;` to flag incorrect outputs during simulation.

#### Sensitivity List

A list of signals in a process declaration header that specifies which signal changes trigger re-evaluation of the process. An incomplete sensitivity list can cause simulation and synthesis mismatches.

**Example:** `process(a, b, sel)` ensures the process re-executes whenever inputs a, b, or sel change, correctly modeling a combinational multiplexer.

#### Sequence Detector

A finite state machine designed to recognize a specific pattern of input bits arriving serially, asserting an output signal when the target sequence has been completely received.

**Example:** A "1011" sequence detector transitions through states as it receives serial input bits, and asserts output 1 only after receiving the consecutive bit pattern 1, 0, 1, 1, then returns to monitoring for overlapping occurrences.

#### Sequential Circuit

A digital circuit whose outputs depend on both current input values and the circuit's stored internal state, incorporating memory elements such as latches or flip-flops to retain information across time.

**Example:** A 4-bit binary counter is a sequential circuit because its output depends on how many clock pulses it has received, not just the current input values.

#### Sequential Logic

Digital circuits whose outputs depend on both current inputs and the history of past inputs.

**Example:** Flip-flops and counters are sequential logic circuits with memory.

#### Serial-In Parallel-Out Register

A shift register that accepts data one bit at a time through a serial input and makes all stored bits available simultaneously at the parallel outputs after the complete word has been shifted in.

**Example:** An 8-bit SIPO register receives a byte of serial data from a UART over eight clock cycles, then presents all eight bits on its parallel outputs for the receiving system to read at once.

#### Serial-In Serial-Out Register

A shift register that accepts data one bit at a time at its input and delivers data one bit at a time at its output, introducing a delay of n clock cycles for an n-bit register.

**Example:** A 4-bit SISO register used as a delay line in a communication system delays an incoming bit stream by exactly four clock periods before the data appears at the serial output.

#### Setup Time

The minimum duration that a flip-flop's data input must be stable before the active clock edge arrives to ensure the value is correctly captured and stored.

**Example:** A flip-flop with a setup time of 1 ns requires its D input to stop changing at least 1 ns before the rising clock edge; violating this may cause metastability.

#### Setup Time Budgeting

The timing analysis practice of ensuring that data arrives and stabilizes at a flip-flop's input sufficiently before the active clock edge, accounting for clock period, combinational path delay, clock skew, and the flip-flop's setup requirement.

**Example:** With a 10 ns clock period, 1 ns clock-to-output delay, 0.5 ns setup requirement, and 0.3 ns clock skew, the maximum combinational delay budget is 8.2 ns.

#### Seven Segment Decoder

A combinational circuit that converts a binary or BCD input to the signals needed to display digits on a seven-segment display.

**Example:** BCD input 0011 (decimal 3) activates segments a, b, c, d, and g.

#### Seven Segment Display

An output device using seven LED or LCD segments arranged to display decimal digits 0-9.

**Example:** The digit 8 illuminates all seven segments; digit 1 illuminates only segments b and c.

#### Shannon Expansion

A theorem expressing a Boolean function as a sum of products involving a variable and its cofactors.

**Example:** F = x·F_x + x'·F_x', where F_x and F_x' are cofactors.

#### Shift Register

A sequential circuit consisting of a chain of flip-flops where each flip-flop transfers its stored value to the next on each clock edge, used for serial data transfer, conversion, and delay operations.

**Example:** A 4-bit shift register built from four D flip-flops in series shifts a binary pattern one position to the right each clock cycle, performing the equivalent of a divide-by-two operation on unsigned integers.

#### Sigma Notation

The summation notation using the Greek letter Σ to represent a Boolean function as a sum of minterms.

**Example:** F = Σ(1, 2, 5) means F = m₁ + m₂ + m₅.

#### Sign Extension

The process of increasing bit width of a signed number while preserving its value.

**Example:** Extending 4-bit -3 (1101) to 8 bits gives 11111101 by copying the sign bit.

#### Sign Magnitude

A signed number representation using one bit for sign and remaining bits for magnitude.

**Example:** In 8-bit sign-magnitude, +5 is 00000101 and -5 is 10000101.

#### Signal

A VHDL object that represents a physical wire or connection carrying a value over time. Signals have associated scheduling semantics where assignments take effect after a delta delay, not immediately.

**Example:** `signal count : std_logic_vector(3 downto 0);` declares an internal 4-bit wire used to connect components within an architecture.

#### Signed Numbers

Binary numbers that can represent both positive and negative values using a specified encoding.

**Example:** 2's complement is a common signed number representation in computers.

#### Simple PLD

A single-chip programmable logic device consisting of a single AND-OR array structure, such as a PAL, PLA, or GAL, capable of implementing moderately complex combinational and simple sequential logic functions.

**Example:** A PAL22V10, classified as a simple PLD, provides 22 inputs and 10 output macrocells in a single AND-OR structure, suitable for implementing address decoders or simple state machines with up to ten state variables.

#### Specification to Circuit

The design process of converting a word problem or functional description into a logic circuit.

**Example:** "Output is 1 when at least two of three inputs are 1" becomes a majority function circuit.

#### SR Latch

The most fundamental memory element, built from two cross-coupled NOR or NAND gates, with Set and Reset inputs that control the stored bit, and an invalid state when both inputs are simultaneously active.

**Example:** In a NOR-based SR latch, applying S = 1 and R = 0 forces Q = 1 (set); returning to S = 0, R = 0 causes the latch to hold Q = 1.

#### SRAM-Based Configuration

An FPGA programming technology where static RAM cells control the configuration of logic blocks and interconnect switches, offering unlimited reprogrammability but requiring the configuration to be reloaded from external memory at each power-up.

**Example:** Xilinx 7-series FPGAs use SRAM-based configuration; at power-up, a bitstream is loaded from an external SPI flash memory into millions of SRAM cells that control LUT contents, routing multiplexers, and I/O standards.

#### Standard Cell Library

A collection of pre-designed and pre-characterized logic cells such as gates, flip-flops, and multiplexers that are placed and interconnected during ASIC design, offering a balance between full custom design effort and gate array constraints.

**Example:** A standard cell library for a 28 nm ASIC process includes cells like NAND2X1, DFFX2, and MUX4X1, each with predefined layout, timing models, and power data; the place-and-route tool arranges these cells into rows to build the complete chip.

#### Standard Form

A Boolean expression written as either sum-of-products or product-of-sums but not necessarily in canonical form.

**Example:** F = AB + C is in standard SOP form (not canonical because C lacks variables A and B).

#### State

The stored internal information of a sequential circuit at a given time, represented by the values held in its memory elements, which together with current inputs determines the circuit's outputs.

**Example:** A 3-bit counter has eight possible states (000 through 111); the current state determines both the counter output and what the next count value will be after a clock edge.

#### State Assignment

The process of assigning unique binary codes to each state in a finite state machine, directly affecting the complexity of the next-state and output combinational logic in the resulting circuit.

**Example:** For an FSM with four states, a binary encoding uses 00, 01, 10, 11, while a one-hot encoding uses 0001, 0010, 0100, 1000; the one-hot approach typically produces simpler next-state logic in FPGA implementations.

#### State Diagram

A directed graph representation of a finite state machine where nodes represent states and labeled arcs represent transitions, showing the input conditions and output values associated with each transition or state.

**Example:** A state diagram for a "01" sequence detector has three nodes (S0, S1, S2) with arcs labeled by input/output values, such as an arc from S0 to S1 labeled "0/0" indicating a transition on input 0 with output 0.

#### State Minimization

The process of reducing the number of states in a finite state machine by identifying and merging equivalent states, producing a minimal-state machine that exhibits identical input-output behavior.

**Example:** An FSM with six states is analyzed using an implication table, revealing that states S2 and S5 are equivalent; merging them produces a five-state machine that uses fewer flip-flops and simpler combinational logic.

#### State Table

A tabular representation of a finite state machine that lists, for every combination of current state and input, the corresponding next state and output, serving as the primary specification for sequential circuit design.

**Example:** A state table for a 2-bit sequence detector has rows for states S0, S1, S2 and columns for inputs 0 and 1, with each cell containing the next state and output, such as S0 with input 1 yielding next state S1 and output 0.

#### Static Timing Analysis

A method of verifying circuit timing by computing worst-case signal propagation delays through all combinational paths without requiring simulation vectors, checking that setup and hold constraints are met at every flip-flop.

**Example:** An STA tool reports that the longest path from register A through an adder and multiplexer to register B has a delay of 9.2 ns, meeting the 10 ns clock period constraint.

#### std_logic

A nine-valued enumerated type from the IEEE 1164 standard representing a single digital wire. Values include '0', '1', 'Z' for high-impedance, 'X' for unknown, and 'U' for uninitialized, among others.

**Example:** `signal enable : std_logic := '0';` declares a single-bit signal initialized to logic low, capable of representing real-world signal states including unknown and tri-state.

#### std_logic_vector

An array type of std_logic elements from the IEEE 1164 standard, used to represent multi-bit buses and data words. It supports both ascending (to) and descending (downto) index ranges.

**Example:** `signal data : std_logic_vector(7 downto 0);` declares an 8-bit bus where bit 7 is the most significant and bit 0 is the least significant.

#### Structural Modeling

A VHDL description style that builds a design by instantiating and interconnecting lower-level components, explicitly defining the hardware hierarchy and wiring topology analogous to a schematic netlist.

**Example:** Instantiating four full-adder components and connecting carry-out to carry-in signals between them to construct a 4-bit ripple carry adder.

#### Sum Bit

The output bit in addition circuits that represents the sum of the input bits, excluding the carry.

**Example:** In a full adder, the sum bit S = A XOR B XOR C_in.

#### Sum of Minterms

A Boolean expression formed by ORing multiple minterms together.

**Example:** F = A'B'C + A'BC' + ABC is a sum of three minterms.

#### Sum of Products

A Boolean expression structured as an OR of AND terms.

**Example:** F = AB + CD + EF is in sum-of-products form.

#### Sum Term

A Boolean expression formed by ORing one or more literals.

**Example:** A+B'+C is a sum term with three literals.

#### Switching Functions

Boolean functions that model the behavior of digital switching circuits.

**Example:** A multiplexer's select function is a switching function determining which input passes to output.

#### Synchronizer Chain

A series of two or more flip-flops clocked by the same clock signal, used to safely sample an asynchronous input by allowing one full clock period for metastability resolution between stages.

**Example:** An external button press signal passes through a two-flip-flop synchronizer chain before entering the synchronous logic, reducing the probability of metastability-induced failure to negligible levels.

#### Synchronous Counter

A counter circuit in which all flip-flops are driven by a common clock signal, causing all state transitions to occur simultaneously and eliminating the cumulative propagation delay found in asynchronous counters.

**Example:** A 4-bit synchronous binary counter uses combinational carry-lookahead logic at each flip-flop input so all four outputs change at the same moment after the clock edge, enabling reliable operation at higher frequencies.

#### Synchronous Sequential Circuit

A sequential circuit in which all state changes are coordinated by a common clock signal, with memory elements updating only at defined clock edges, ensuring predictable and analyzable behavior.

**Example:** A register file in a processor is a synchronous sequential circuit because all flip-flops capture new data simultaneously at the rising edge of the system clock.

#### Synthesizable Subset

The restricted portion of the VHDL language that synthesis tools can translate into actual hardware. Constructs like file I/O, wait for specific times, and after-delay clauses are excluded from this subset.

**Example:** `y <= a after 10 ns;` is valid in simulation but not synthesizable; the synthesizable equivalent is `y <= a;`, with timing determined by the physical implementation.

#### System Partitioning

The process of dividing a complex digital system into distinct functional blocks or subsystems with well-defined interfaces, guided by considerations of functionality, timing, technology, and design team organization.

**Example:** A digital audio system is partitioned into an I2S receiver block, a sample-rate converter, a DSP processing block, and a DAC interface, each assigned to a different designer.

#### Systematic Approach Advantages

The benefits of using algorithmic methods like Quine-McCluskey that guarantee finding optimal solutions.

**Example:** Unlike manual K-map reading, QM's systematic process cannot miss groupings.

#### T Flip-Flop

An edge-triggered memory element with a single toggle input T that either holds the current state (T = 0) or complements it (T = 1) at each active clock edge, with the characteristic equation Q_next = T XOR Q.

**Example:** A T flip-flop with T permanently tied to 1 toggles its output at every rising clock edge, dividing the clock frequency by two and producing a square wave at half the input frequency.

#### Tabular Minimization Method

A systematic algorithm for Boolean function simplification using organized tables of minterms.

**Example:** The Quine-McCluskey method is a tabular minimization method.

#### Technology Mapping

The process of converting a technology-independent optimized Boolean network into a circuit that uses gates from a specific standard cell library, balancing area, delay, and power.

**Example:** A logic synthesis tool maps a network of generic AND and OR operations to a combination of AOI22, NAND2, and INV cells from a CMOS cell library.

#### Test Vector

A specific set of input values applied to a circuit during testing or simulation, paired with the corresponding expected output values, used to verify that the circuit produces correct results for that input combination.

**Example:** For a 2-bit adder, the test vector (A="01", B="10", Cin='0') with expected outputs (Sum="11", Cout='0') verifies one specific addition case.

#### Testbench

A non-synthesizable VHDL entity with no ports that instantiates the design under test, generates stimulus signals, and optionally checks output correctness to verify the design through simulation.

**Example:** A testbench for an ALU instantiates the ALU component, applies operand and opcode values using a process with wait statements, and compares outputs against expected results.

#### Three Variable K-Map

A Karnaugh map with 8 cells for functions of three variables.

**Example:** A 3-variable K-map for F(A,B,C) has rows for A values and columns for BC combinations.

#### Throughput

The rate at which a digital system produces valid output results, typically measured in operations per second or data units per clock cycle, reflecting the system's sustained processing capacity.

**Example:** A pipelined processor that completes one instruction per clock cycle at 200 MHz has a throughput of 200 million instructions per second, regardless of individual instruction latency.

#### Timing Diagram

A graphical representation showing the values of multiple digital signals plotted against a common time axis, used to analyze and verify the temporal behavior of sequential circuits.

**Example:** A timing diagram for a D flip-flop shows the clock, D input, and Q output waveforms aligned vertically, with Q transitions occurring at clock-to-Q delay after each rising edge where D is sampled.

#### Top-Down Design

A systematic design methodology that begins with the highest-level system specification and progressively decomposes it into smaller, more detailed sub-modules until each block is simple enough to implement directly.

**Example:** A digital thermometer design starts with a system block diagram, then decomposes into sensor interface, ADC, data processing, and display driver modules, each further refined into VHDL entities.

#### Transmission Gate

A CMOS switch composed of an NMOS and PMOS transistor in parallel that passes both logic 0 and logic 1 with full voltage swing when enabled by complementary control signals.

**Example:** A 2:1 multiplexer built from two transmission gates uses only four transistors plus an inverter, compared to roughly sixteen transistors in a gate-level implementation.

#### Transparency

The property of a level-sensitive latch in which the output continuously follows the input while the enable signal is active, allowing multiple input changes to propagate to the output within a single enable period.

**Example:** While a D latch's enable is high, toggling D from 0 to 1 to 0 causes Q to follow each change immediately, which is why latches require careful timing design to avoid race conditions.

#### Truth Table

A table listing all possible input combinations and corresponding output values for a logic function.

**Example:** A 2-input AND gate's truth table has 4 rows showing outputs 0,0,0,1 for inputs 00,01,10,11.

#### Truth Value

The logical state (true or false) assigned to a Boolean variable or expression.

**Example:** If A=1, the truth value of A is true; if A=0, it is false.

#### Two Variable K-Map

A Karnaugh map with 4 cells for functions of two variables.

**Example:** A 2-variable K-map for F(A,B) is a 2×2 grid with cells for AB = 00, 01, 10, 11.

#### Two-Level Circuit

A logic circuit in which signals pass through at most two levels of gates from input to output, corresponding directly to sum-of-products (AND-OR) or product-of-sums (OR-AND) expressions.

**Example:** The SOP expression F = AB + CD is implemented as a two-level circuit with two AND gates feeding one OR gate, achieving minimum propagation delay of two gate delays.

#### Twos Complement

A signed number representation where negative values are formed by inverting bits and adding 1.

**Example:** In 8-bit 2's complement, -5 is 11111011 (invert 00000101 to get 11111010, add 1).

#### Twos Complement Addition

The process of adding two 2's complement numbers using standard binary addition.

**Example:** Adding -3 (1101) and +5 (0101) in 4-bit 2's complement: 1101 + 0101 = 0010 (+2).

#### Twos Complement Subtraction

Performing subtraction by adding the 2's complement of the subtrahend to the minuend.

**Example:** Computing A - B by calculating A + (-B) where -B is B's 2's complement.

#### UART

Universal Asynchronous Receiver-Transmitter, a serial communication peripheral that converts parallel data to a serial bit stream for transmission and serial data back to parallel form on reception, without requiring a shared clock.

**Example:** A UART transmitter sends an 8-bit character by outputting a start bit, eight data bits (LSB first), and a stop bit at 115200 baud over a single wire.

#### Unchecked Terms as Prime Implicants

Terms in the Quine-McCluskey combination table that cannot combine further, identified as prime implicants.

**Example:** A term without a check mark after all combination iterations is a prime implicant.

#### Underflow

The condition when an arithmetic result is too small (too negative) to represent in the available format.

**Example:** In 4-bit 2's complement, -8 - 1 causes underflow (cannot represent -9).

#### Universal Gates

Logic gates (NAND or NOR) that can implement any Boolean function when combined appropriately.

**Example:** NAND is universal; any circuit can be built using only NAND gates.

#### Universal Shift Register

A versatile register that can perform parallel load, shift left, shift right, and hold operations, selected by mode control inputs, combining all shift register functions into a single integrated component.

**Example:** The 74194 is a 4-bit universal shift register with two mode-select inputs: 00 holds the current value, 01 shifts right, 10 shifts left, and 11 performs a parallel load, all synchronized to the clock.

#### Unsigned Numbers

Binary numbers representing only non-negative values (zero and positive integers).

**Example:** An 8-bit unsigned number can represent values from 0 to 255.

#### Using Dont Cares

The technique of treating don't care conditions as 1s or 0s to create larger K-map groups.

**Example:** Including a don't care cell in a group of 1s can double the group size, eliminating a variable.

#### Valid Flag

A single-bit output on a priority encoder that indicates whether any input is currently active, distinguishing between no active inputs and input zero being active.

**Example:** When no inputs are active on a priority encoder, the valid flag V = 0 and the binary outputs are meaningless; when D0 alone is active, V = 1 and the output is 000.

#### Valid Group Sizes

The allowable number of cells in a K-map group, which must be powers of 2 (1, 2, 4, 8, 16, ...).

**Example:** Groups of 3, 5, or 6 cells are invalid; they must be resized to valid power-of-2 counts.

#### Verification Planning

The systematic process of defining verification goals, strategies, coverage metrics, testbench architecture, and required test scenarios before beginning simulation, ensuring comprehensive and organized design validation.

**Example:** A verification plan for a FIFO specifies testing empty/full conditions, simultaneous read/write, overflow/underflow handling, reset behavior, and requires 100% FSM state coverage before sign-off.

#### VHDL

VHSIC Hardware Description Language, a standardized IEEE language (IEEE 1076) used to describe, simulate, and synthesize digital electronic systems at multiple levels of abstraction from behavioral to structural.

**Example:** A designer writes VHDL code describing a finite-state machine controller, simulates it to verify correctness, then synthesizes it onto an FPGA for hardware implementation.

#### VHDL Design Unit

A self-contained, independently compilable section of VHDL source code. The five types are entity declarations, architecture bodies, package declarations, package bodies, and configuration declarations.

**Example:** An entity declaration for a UART receiver and its corresponding architecture body are two separate design units that are compiled into a working library.

#### Wired Logic

A technique that exploits open-collector or open-drain gate outputs connected together with a shared pull-up resistor to implement AND or OR logic functions without additional gates.

**Example:** Connecting two open-collector NAND gate outputs together produces a wired-AND: F = (AB)' * (CD)' = (AB + CD)', effectively creating a free AOI function.

#### Word

A fixed-size group of bits processed as a single unit by a computer, typically 16, 32, or 64 bits.

**Example:** A 32-bit processor has a word size of 32 bits.

#### Word Problems to Boolean

The process of translating English language descriptions into Boolean expressions.

**Example:** "The alarm sounds if the door is open AND the system is armed" becomes F = D·A.

#### Wrapping in K-Maps

The property that K-map edges are logically adjacent, allowing groups to wrap around the map.

**Example:** In a 4-variable K-map, the leftmost and rightmost columns are adjacent and can form a group.

#### XNOR Gate

A logic gate that outputs 1 when inputs are equal (both 0 or both 1); the complement of XOR.

**Example:** A 2-input XNOR with A=1, B=1 outputs 1; A=0, B=1 outputs 0.

#### XOR Gate

A logic gate that outputs 1 when inputs differ (one is 0 and one is 1); exclusive OR.

**Example:** A 2-input XOR with A=1, B=0 outputs 1; A=1, B=1 outputs 0.

</div>
