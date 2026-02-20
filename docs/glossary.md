---
title: Glossary of Terms
description: Comprehensive glossary for EE 2301 Introduction to Digital System Design
---

<div class="problems-styled" markdown>

# Glossary of Terms

This glossary contains 225 terms used in the Introduction to Digital System Design course (EE 2301). Definitions follow ISO 11179 metadata registry standards.

#### Absorption Law

A Boolean algebra theorem stating that a variable ORed with the AND of itself and another variable equals the original variable: A + AB = A.

**Example:** The expression X + XY simplifies to X using the absorption law.

#### Adder Subtractor Circuit

A combinational circuit that performs both addition and subtraction operations using a control signal to select the operation mode.

**Example:** A 4-bit adder-subtractor uses XOR gates controlled by a subtract signal to complement the second operand when subtracting.

#### Adjacency Criterion in QM

The requirement in the Quine-McCluskey method that two terms can combine only if they differ in exactly one bit position while having identical values elsewhere.

**Example:** Terms 0100 and 0101 satisfy the adjacency criterion because they differ only in the rightmost bit.

#### Algebraic Simplification

The process of reducing a Boolean expression to a simpler equivalent form using Boolean algebra laws and theorems.

**Example:** The expression AB + AB' simplifies to A using the complement law and factoring.

#### Analog vs Digital Signals

A comparison between continuous signals that vary smoothly over a range (analog) and discrete signals that have only distinct voltage levels (digital).

**Example:** A microphone produces analog signals, while a computer processes digital signals of 0s and 1s.

#### AND Gate

A logic gate that outputs 1 only when all inputs are 1; otherwise outputs 0.

**Example:** A 2-input AND gate with inputs A=1 and B=1 produces output 1; any other combination produces 0.

#### AND Operation

A Boolean operation that returns 1 only when both operands are 1.

**Example:** In the expression A · B, the result is 1 only when both A and B equal 1.

#### Associative Law

A Boolean algebra property stating that the grouping of variables in AND or OR operations does not affect the result.

**Example:** (A · B) · C = A · (B · C) and (A + B) + C = A + (B + C).

#### Base of Number System

The number of unique digits used in a positional number system, also called the radix.

**Example:** Binary has base 2 (digits 0, 1), decimal has base 10 (digits 0-9), and hexadecimal has base 16 (digits 0-9, A-F).

#### BCD Code

Binary-Coded Decimal, a representation where each decimal digit is encoded as a separate 4-bit binary number.

**Example:** The decimal number 59 is represented in BCD as 0101 1001 (5 = 0101, 9 = 1001).

#### BCD to Binary Converter

A circuit that converts a number from Binary-Coded Decimal format to standard binary representation.

**Example:** BCD input 0010 0101 (representing decimal 25) converts to binary 11001.

#### Binary Addition

The arithmetic operation of adding two binary numbers using the rules: 0+0=0, 0+1=1, 1+0=1, 1+1=10 (with carry).

**Example:** Adding 1011 + 0110 produces 10001, where carries propagate from right to left.

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

#### Bit

The fundamental unit of digital information, representing a single binary digit with value 0 or 1.

**Example:** An 8-bit number consists of 8 bits and can represent values from 0 to 255.

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

#### Buffer Gate

A logic gate that produces an output identical to its input, used for signal amplification or delay.

**Example:** A buffer with input 1 produces output 1; it does not invert the signal.

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

#### Circuit Analysis

The process of determining the output function of an existing logic circuit by tracing signals through its gates.

**Example:** Analyzing a circuit with AND and OR gates to derive its Boolean expression F = AB + C.

#### Circuit Synthesis

The process of designing a logic circuit that implements a specified Boolean function.

**Example:** Synthesizing the function F = A + B·C as an OR gate with inputs A and (B AND C).

#### Code Converter

A combinational circuit that transforms data from one binary code format to another.

**Example:** A BCD-to-seven-segment decoder converts BCD digits to patterns for display.

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

#### Computational Complexity of QM

The measure of time and space resources required by the Quine-McCluskey algorithm, which grows exponentially with the number of variables.

**Example:** For n variables, the maximum number of prime implicants is approximately 3^n/n.

#### Computer Implementation of QM

The encoding of the Quine-McCluskey algorithm as software that systematically finds minimum Boolean expressions.

**Example:** A QM program takes minterms as input and outputs the minimal sum-of-products expression.

#### Consensus Theorem

A Boolean algebra theorem stating that AB + A'C + BC = AB + A'C, where the term BC is redundant.

**Example:** XY + X'Z + YZ simplifies to XY + X'Z because YZ is the consensus term.

#### Control Signal

A digital signal that directs or modifies the operation of a circuit or system.

**Example:** A read/write control signal determines whether memory performs a read or write operation.

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

#### Covering All Ones

The process in K-map SOP simplification of ensuring every cell containing a 1 belongs to at least one group.

**Example:** After grouping, verify that no cell with value 1 remains ungrouped.

#### Covering All Zeros

The process in K-map POS simplification of ensuring every cell containing a 0 belongs to at least one group.

**Example:** For POS simplification, group all 0-cells to derive maxterms.

#### Cyclic Prime Implicant Charts

Prime implicant charts with no essential prime implicants, where every minterm is covered by multiple prime implicants equally.

**Example:** A cyclic chart requires Petrick's method because no single PI uniquely covers any minterm.

#### Dash Notation for Combined Terms

The convention in the Quine-McCluskey method of using a dash (-) to represent a variable that has been eliminated through combination.

**Example:** Combining 0110 and 0111 produces 011-, where the dash indicates the eliminated D variable.

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

#### DeMorgans First Theorem

A Boolean algebra theorem stating that the complement of an AND operation equals the OR of the complements: (A·B)' = A' + B'.

**Example:** (XY)' = X' + Y', meaning NOT(X AND Y) equals (NOT X) OR (NOT Y).

#### DeMorgans Second Theorem

A Boolean algebra theorem stating that the complement of an OR operation equals the AND of the complements: (A+B)' = A'·B'.

**Example:** (X+Y)' = X'·Y', meaning NOT(X OR Y) equals (NOT X) AND (NOT Y).

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

#### Enable Signal

A control input that allows or prevents a circuit from operating or passing signals.

**Example:** A tri-state buffer passes its input to output only when the enable signal is active.

#### Entered Variable K-Map

A K-map technique where cells contain variables or expressions instead of just 0s and 1s, reducing the map size.

**Example:** A 5-variable function can be represented on a 4-variable map with variable E entered in cells.

#### Essential Prime Implicant

A prime implicant that is the only one covering at least one minterm of the function.

**Example:** If PI₁ is the only prime implicant covering minterm m₇, then PI₁ is essential.

#### Essential Prime Implicants Selection

The process in the Quine-McCluskey method of identifying and selecting prime implicants that must appear in any minimum solution.

**Example:** Examining the PI chart columns to find minterms covered by only one prime implicant.

#### Even Parity

An error detection scheme where the total number of 1-bits including the parity bit is always even.

**Example:** For data 1011, even parity adds bit 1, making 10111 with four 1s (even).

#### Expansion Theorem

A theorem allowing a Boolean function to be expressed in terms of its cofactors with respect to a variable.

**Example:** F = A·F_A + A'·F_A' expands F using cofactors with respect to variable A.

#### Fan-In and Fan-Out

Fan-in is the number of inputs a gate can accept; fan-out is the number of gates a single output can drive.

**Example:** A gate with fan-in of 4 accepts 4 inputs; fan-out of 10 means it can drive 10 gate inputs.

#### Five Variable K-Map

A Karnaugh map for functions of five variables, typically drawn as two adjacent 4-variable maps.

**Example:** A 5-variable K-map has 32 cells arranged as two 16-cell maps for variable E=0 and E=1.

#### Five Variable Technique

The method of handling 5-variable K-maps by comparing corresponding cells in two 4-variable submaps.

**Example:** Cells at the same position in E=0 and E=1 submaps are adjacent and can be grouped.

#### Four Variable K-Map

A Karnaugh map with 16 cells arranged in a 4×4 grid for functions of four variables.

**Example:** A 4-variable K-map for F(A,B,C,D) has rows labeled with AB combinations and columns with CD.

#### Full Adder

A combinational circuit that adds three input bits (two operands plus carry-in) producing a sum and carry-out.

**Example:** A full adder with inputs A=1, B=1, C_in=1 produces Sum=1 and C_out=1.

#### Full Subtractor

A combinational circuit that subtracts one bit from another while accounting for a borrow input.

**Example:** A full subtractor computes A - B - B_in, producing difference and borrow-out.

#### Function from Truth Table

The process of deriving a Boolean expression from a truth table by identifying rows where the output is 1.

**Example:** From a truth table, write minterms for each row with output 1, then OR them together.

#### Gate Count Minimization

The optimization goal of implementing a Boolean function with the fewest possible logic gates.

**Example:** Simplifying AB + AC to A(B+C) reduces gate count from 3 to 2.

#### Gate Count Optimization

The process of reducing the total number of gates required to implement a Boolean function.

**Example:** Using NAND gates exclusively may reduce total gate count due to their universal nature.

#### Gate Symbols

Standardized graphical representations used to draw logic gates in circuit diagrams.

**Example:** AND gates are drawn as a flat-backed D shape; OR gates have a curved back.

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

#### Identity Law

A Boolean algebra theorem stating that ORing with 0 or ANDing with 1 leaves a variable unchanged.

**Example:** A + 0 = A and A · 1 = A.

#### Idempotent Law

A Boolean algebra theorem stating that ORing or ANDing a variable with itself yields the same variable.

**Example:** A + A = A and A · A = A.

#### IEEE Gate Symbols

Standardized logic gate symbols defined by the Institute of Electrical and Electronics Engineers.

**Example:** IEEE rectangular symbols use distinctive shapes and qualifying symbols inside rectangles.

#### Implicant

A product term that evaluates to 1 only for input combinations where the function also equals 1.

**Example:** AB is an implicant of F = AB + BC because whenever AB=1, F=1.

#### Implicant Table Construction

The first phase of the Quine-McCluskey method where minterms are listed and grouped by the number of 1-bits.

**Example:** Creating columns for original minterms, their binary representation, and group classification.

#### Incompletely Specified

A Boolean function for which some input combinations have undefined (don't care) outputs.

**Example:** A BCD decoder is incompletely specified because inputs 10-15 are invalid BCD values.

#### Incompletely Specified Func

A logic function where certain input combinations produce outputs that are not defined or constrained.

**Example:** Functions with don't care conditions are incompletely specified.

#### Inverter

A logic gate that outputs the complement of its input; also called a NOT gate.

**Example:** An inverter with input 1 produces output 0.

#### Involution Law

A Boolean algebra theorem stating that complementing a variable twice returns the original value.

**Example:** (A')' = A, meaning double negation cancels out.

#### Iterative Combination Process

The repeated application of the combination step in the Quine-McCluskey method until no more combinations are possible.

**Example:** First iteration combines minterms, second combines those results, continuing until no valid pairs remain.

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

#### Least Significant Bit

The bit position in a binary number with the smallest weight (rightmost position, weight 2⁰).

**Example:** In binary 1101, the LSB is 1 (rightmost), representing the value 1.

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

#### Magnitude Comparator

A circuit that compares two multi-bit binary numbers and outputs their relative magnitude relationship.

**Example:** A 4-bit magnitude comparator outputs A>B, A=B, or A<B for two 4-bit inputs.

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

#### Minterm List Notation

A compact representation listing the indices of minterms that form a function's SOP expression.

**Example:** F = Σm(2, 4, 6) indicates the function is the sum of m₂, m₄, and m₆.

#### Minterm to Maxterm

The conversion between minterm and maxterm indices for a function and its complement.

**Example:** If F = Σm(1,3,5,7) then F = ∏M(0,2,4,6) because F' uses the complement set of indices.

#### Most Significant Bit

The bit position in a binary number with the largest weight (leftmost position).

**Example:** In binary 1101, the MSB is 1 (leftmost), representing the value 8.

#### Multi-Output Function Minimization

The optimization of multiple Boolean functions simultaneously to share common product terms.

**Example:** If F₁ and F₂ both require term AB, implementing it once and sharing reduces total gates.

#### Multiple Input Gates

Logic gates designed to accept more than two inputs.

**Example:** A 4-input AND gate outputs 1 only when all four inputs are 1.

#### Multiple Solutions

The existence of more than one minimal Boolean expression with the same cost.

**Example:** Two different groupings on a K-map may yield equally minimal but different expressions.

#### NAND Gate

A logic gate that produces the complement of AND; outputs 0 only when all inputs are 1.

**Example:** A 2-input NAND with A=1, B=1 outputs 0; any other combination outputs 1.

#### Nibble

A group of 4 bits, representing half of a byte.

**Example:** The hexadecimal digit F represents the nibble 1111.

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

#### Ones Complement

A signed number representation where negative numbers are formed by inverting all bits of the positive value.

**Example:** In 8-bit 1's complement, -5 is represented as 11111010 (complement of 00000101).

#### OR Gate

A logic gate that outputs 1 if at least one input is 1; outputs 0 only when all inputs are 0.

**Example:** A 2-input OR gate with A=0, B=1 produces output 1.

#### OR Operation

A Boolean operation that returns 1 when at least one operand is 1.

**Example:** In the expression A + B, the result is 1 if A=1 or B=1 or both.

#### Overflow Detection

The process of identifying when an arithmetic operation produces a result too large to represent in the available bits.

**Example:** In 4-bit 2's complement, 0111 + 0001 = 1000 (-8), which is overflow (7+1 ≠ -8).

#### Overlapping Groups

The practice in K-map simplification of allowing groups to share cells, which is valid and often necessary.

**Example:** One group covers cells {0,1} and another covers {1,3}; cell 1 is in both groups.

#### Parentheses in Boolean

The use of parentheses in Boolean expressions to specify the order of operations.

**Example:** A(B+C) means evaluate B+C first, then AND with A.

#### Parity Checker

A circuit that verifies whether received data has the correct parity bit value.

**Example:** An even parity checker outputs 0 (no error) if the total number of 1-bits is even.

#### Parity Generator

A circuit that computes the parity bit value needed to achieve even or odd parity.

**Example:** For data bits 101, an even parity generator outputs 0 (making total 1s = 2, even).

#### Petrick's Method

An algebraic technique for finding all minimum covers in cyclic prime implicant charts.

**Example:** Petrick's method creates a Boolean expression whose solutions are the valid minimum covers.

#### Physical Adjacency

The spatial nearness of cells on a K-map grid, not always matching logical adjacency due to wraparound.

**Example:** Cells on opposite edges of a K-map may be logically adjacent though physically distant.

#### Pi Notation

The product notation using the Greek letter Π to represent a Boolean function as a product of maxterms.

**Example:** F = ∏(1, 3, 5) means F = M₁ · M₃ · M₅.

#### Positional Notation

A number representation system where digit value depends on both the digit and its position.

**Example:** In decimal 123, the digit 1 represents 100 because of its position.

#### Precedence of Operators

The order in which Boolean operations are evaluated: NOT first, then AND, then OR.

**Example:** In A + B·C, the AND (B·C) is evaluated before the OR with A.

#### Prime Implicant

An implicant that cannot be combined with another to form a larger implicant.

**Example:** In a K-map, a group that cannot be made larger without including 0-cells is a prime implicant.

#### Prime Implicant Chart Construction

The creation of a table showing which minterms each prime implicant covers, used to find minimum covers.

**Example:** Rows represent prime implicants, columns represent minterms, with marks showing coverage.

#### Product of Maxterms

A Boolean expression formed by ANDing multiple maxterms together.

**Example:** F = (A+B+C')(A'+B+C) is a product of two maxterms.

#### Product of Sums

A Boolean expression structured as an AND of OR terms.

**Example:** F = (A+B)(C+D) is in product-of-sums form.

#### Product Term

A Boolean expression formed by ANDing one or more literals.

**Example:** ABC' is a product term with three literals.

#### QM Method with Don't Cares

The application of the Quine-McCluskey algorithm when don't care conditions are present.

**Example:** Include don't cares in combination but exclude their columns from the covering requirement.

#### QM versus K-map Comparison

An analysis of the relative advantages of the Quine-McCluskey method and Karnaugh maps.

**Example:** K-maps are faster for small problems; QM handles more variables and can be automated.

#### Quine-McCluskey Algorithm

A systematic tabular method for finding the minimal sum-of-products form of a Boolean function.

**Example:** The QM algorithm guarantees finding all prime implicants through exhaustive combination.

#### Radix Point

The symbol separating integer and fractional parts in a positional number representation.

**Example:** In binary 101.11, the radix point separates 101 (integer) from 11 (fraction).

#### Range of Signed Numbers

The interval of values representable in a signed number format with a given number of bits.

**Example:** 8-bit 2's complement represents values from -128 to +127.

#### Rectangular Groups

Valid K-map groupings that form rectangles (including squares) with sides of power-of-2 length.

**Example:** Valid rectangular groups have 1, 2, 4, 8, or 16 cells in configurations like 1×2, 2×2, 1×4.

#### Redundant Prime Implicant

A prime implicant that is not essential and whose minterms are all covered by other prime implicants.

**Example:** If PI₃ covers only minterms already covered by essential PIs, then PI₃ is redundant.

#### Ripple Carry Adder

An n-bit adder constructed by cascading full adders, where carry propagates through all stages.

**Example:** A 4-bit ripple carry adder chains four full adders with each carry-out feeding the next carry-in.

#### Row Dominance

A technique in prime implicant chart reduction where a PI covering a superset of another's minterms can replace it.

**Example:** If PI₁ covers {1,3,5,7} and PI₂ covers {1,3}, then PI₁ dominates PI₂.

#### Sequential Logic

Digital circuits whose outputs depend on both current inputs and the history of past inputs.

**Example:** Flip-flops and counters are sequential logic circuits with memory.

#### Seven Segment Decoder

A combinational circuit that converts a binary or BCD input to the signals needed to display digits on a seven-segment display.

**Example:** BCD input 0011 (decimal 3) activates segments a, b, c, d, and g.

#### Seven Segment Display

An output device using seven LED or LCD segments arranged to display decimal digits 0-9.

**Example:** The digit 8 illuminates all seven segments; digit 1 illuminates only segments b and c.

#### Shannon Expansion

A theorem expressing a Boolean function as a sum of products involving a variable and its cofactors.

**Example:** F = x·F_x + x'·F_x', where F_x and F_x' are cofactors.

#### Sign Extension

The process of increasing bit width of a signed number while preserving its value.

**Example:** Extending 4-bit -3 (1101) to 8 bits gives 11111101 by copying the sign bit.

#### Sign Magnitude

A signed number representation using one bit for sign and remaining bits for magnitude.

**Example:** In 8-bit sign-magnitude, +5 is 00000101 and -5 is 10000101.

#### Signed Numbers

Binary numbers that can represent both positive and negative values using a specified encoding.

**Example:** 2's complement is a common signed number representation in computers.

#### Sigma Notation

The summation notation using the Greek letter Σ to represent a Boolean function as a sum of minterms.

**Example:** F = Σ(1, 2, 5) means F = m₁ + m₂ + m₅.

#### Specification to Circuit

The design process of converting a word problem or functional description into a logic circuit.

**Example:** "Output is 1 when at least two of three inputs are 1" becomes a majority function circuit.

#### Standard Form

A Boolean expression written as either sum-of-products or product-of-sums but not necessarily in canonical form.

**Example:** F = AB + C is in standard SOP form (not canonical because C lacks variables A and B).

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

#### Systematic Approach Advantages

The benefits of using algorithmic methods like Quine-McCluskey that guarantee finding optimal solutions.

**Example:** Unlike manual K-map reading, QM's systematic process cannot miss groupings.

#### Tabular Minimization Method

A systematic algorithm for Boolean function simplification using organized tables of minterms.

**Example:** The Quine-McCluskey method is a tabular minimization method.

#### Three Variable K-Map

A Karnaugh map with 8 cells for functions of three variables.

**Example:** A 3-variable K-map for F(A,B,C) has rows for A values and columns for BC combinations.

#### Truth Table

A table listing all possible input combinations and corresponding output values for a logic function.

**Example:** A 2-input AND gate's truth table has 4 rows showing outputs 0,0,0,1 for inputs 00,01,10,11.

#### Truth Value

The logical state (true or false) assigned to a Boolean variable or expression.

**Example:** If A=1, the truth value of A is true; if A=0, it is false.

#### Two Variable K-Map

A Karnaugh map with 4 cells for functions of two variables.

**Example:** A 2-variable K-map for F(A,B) is a 2×2 grid with cells for AB = 00, 01, 10, 11.

#### Twos Complement

A signed number representation where negative values are formed by inverting bits and adding 1.

**Example:** In 8-bit 2's complement, -5 is 11111011 (invert 00000101 to get 11111010, add 1).

#### Twos Complement Addition

The process of adding two 2's complement numbers using standard binary addition.

**Example:** Adding -3 (1101) and +5 (0101) in 4-bit 2's complement: 1101 + 0101 = 0010 (+2).

#### Twos Complement Subtraction

Performing subtraction by adding the 2's complement of the subtrahend to the minuend.

**Example:** Computing A - B by calculating A + (-B) where -B is B's 2's complement.

#### Unchecked Terms as Prime Implicants

Terms in the Quine-McCluskey combination table that cannot combine further, identified as prime implicants.

**Example:** A term without a check mark after all combination iterations is a prime implicant.

#### Underflow

The condition when an arithmetic result is too small (too negative) to represent in the available format.

**Example:** In 4-bit 2's complement, -8 - 1 causes underflow (cannot represent -9).

#### Universal Gates

Logic gates (NAND or NOR) that can implement any Boolean function when combined appropriately.

**Example:** NAND is universal; any circuit can be built using only NAND gates.

#### Unsigned Numbers

Binary numbers representing only non-negative values (zero and positive integers).

**Example:** An 8-bit unsigned number can represent values from 0 to 255.

#### Using Dont Cares

The technique of treating don't care conditions as 1s or 0s to create larger K-map groups.

**Example:** Including a don't care cell in a group of 1s can double the group size, eliminating a variable.

#### Valid Group Sizes

The allowable number of cells in a K-map group, which must be powers of 2 (1, 2, 4, 8, 16, ...).

**Example:** Groups of 3, 5, or 6 cells are invalid; they must be resized to valid power-of-2 counts.

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
