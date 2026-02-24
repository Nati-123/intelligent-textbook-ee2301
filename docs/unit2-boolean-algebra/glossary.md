---
title: Unit 2 Glossary - Boolean Algebra
description: Key terms and definitions for Boolean algebra, logic gates, and Boolean theorems
---

<div class="problems-styled" markdown>

<h1 style="color: #5A3EED !important; border-bottom: 3px solid #5A3EED; padding-bottom: 0.4rem; font-weight: 800; margin-bottom: 1.5rem;">Glossary: Boolean Algebra</h1>

<p style="color: #555; line-height: 1.85; font-size: 1.05rem; margin-bottom: 2rem;">
Key terms and definitions for Unit 2. Definitions follow ISO 11179 metadata registry standards.
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">A</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Absorption Law</strong> — A Boolean theorem that eliminates redundant terms from an expression, stated as <span class="arithmatex">\(A + AB = A\)</span> and <span class="arithmatex">\(A(A + B) = A\)</span>.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Algebraic Simplification</strong> — The process of reducing a Boolean expression to a simpler equivalent form by systematically applying Boolean theorems and identities to minimize the number of literals, terms, and gates needed for implementation.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">AND Gate</strong> — A logic gate that implements the AND operation, producing a HIGH output only when all of its inputs are HIGH. Its standard symbol features a flat left edge and a curved right edge (D-shape).</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">AND Operation</strong> — The fundamental Boolean operation (logical conjunction) that produces a 1 output only when all inputs are 1, denoted by a dot (<span class="arithmatex">\(\cdot\)</span>), adjacency, or the wedge symbol, and analogous to multiplication in ordinary algebra.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Associative Law</strong> — A Boolean algebraic law stating that the grouping of operands does not affect the result: <span class="arithmatex">\((A + B) + C = A + (B + C)\)</span> and <span class="arithmatex">\((A \cdot B) \cdot C = A \cdot (B \cdot C)\)</span>.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">B</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Boolean Algebra</strong> — A mathematical system developed by George Boole in 1854 for manipulating logical values, operating exclusively on binary values (0 and 1) and forming the theoretical foundation for digital logic design.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Boolean Constant</strong> — A fixed Boolean value that is either 0 or 1, as opposed to a variable whose value can change.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Boolean Expression</strong> — An algebraic formula composed of Boolean variables, constants, and operations (AND, OR, NOT) that can be represented by a truth table and evaluated to produce a binary output.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Boolean Variable</strong> — An unknown quantity in Boolean algebra that can take on only one of two values (0 or 1), typically denoted by uppercase letters such as A, B, C.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Buffer Gate</strong> — A logic gate that passes its input unchanged to the output (<span class="arithmatex">\(F = A\)</span>), providing signal amplification, isolation, and timing delay in physical circuits despite performing no logical transformation.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">C</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Canonical Form</strong> — A Boolean expression in which every product term (for SOP) or every sum term (for POS) contains all variables of the function, providing a unique representation derived directly from minterms or maxterms.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Cascading Gates</strong> — A technique of connecting multiple gates in series to handle more inputs than a single gate can accommodate, such as using three 2-input AND gates to implement a 4-input AND function.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Circuit Analysis</strong> — The process of deriving the Boolean expression from an existing logic circuit diagram by labeling intermediate gate outputs and substituting expressions to obtain the final output function.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Circuit Synthesis</strong> — The process of constructing a logic circuit from a Boolean expression by identifying the required gates from the operations and connecting them according to the expression's structure.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Commutative Law</strong> — A Boolean algebraic law stating that the order of operands does not affect the result: <span class="arithmatex">\(A + B = B + A\)</span> and <span class="arithmatex">\(A \cdot B = B \cdot A\)</span>.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Complement</strong> — The result of inverting a Boolean value or variable, where the complement of 0 is 1 and the complement of 1 is 0, denoted by an overbar, prime, or the NOT symbol.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Complement Law</strong> — A Boolean identity stating that a variable operated with its own complement produces a constant: <span class="arithmatex">\(A + \overline{A} = 1\)</span> and <span class="arithmatex">\(A \cdot \overline{A} = 0\)</span>.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Consensus Theorem</strong> — A Boolean theorem that identifies and eliminates a redundant consensus term, stated as <span class="arithmatex">\(AB + \overline{A}C + BC = AB + \overline{A}C\)</span>, where the <span class="arithmatex">\(BC\)</span> term is already covered by the other two terms.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">D</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">DeMorgan's First Theorem</strong> — The Boolean theorem stating that the complement of a product equals the sum of the complements: <span class="arithmatex">\(\overline{A \cdot B} = \overline{A} + \overline{B}\)</span>, meaning a NAND gate is equivalent to an OR gate with inverted inputs.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">DeMorgan's Second Theorem</strong> — The Boolean theorem stating that the complement of a sum equals the product of the complements: <span class="arithmatex">\(\overline{A + B} = \overline{A} \cdot \overline{B}\)</span>, meaning a NOR gate is equivalent to an AND gate with inverted inputs.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Distributive Law</strong> — A Boolean algebraic law that allows distribution of one operation over another: <span class="arithmatex">\(A(B + C) = AB + AC\)</span> and, uniquely in Boolean algebra, <span class="arithmatex">\(A + BC = (A + B)(A + C)\)</span>.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Duality Principle</strong> — The principle stating that any valid Boolean theorem remains valid if AND and OR operators are interchanged and the constants 0 and 1 are interchanged throughout the expression.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">F</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Fan-In</strong> — The maximum number of inputs that a logic gate can accept, typically limited to 8–12 inputs for standard logic families due to speed and power constraints.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Fan-Out</strong> — The maximum number of gate inputs that a single gate output can drive without signal degradation, typically limited to 10 for standard TTL gates.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">G – H</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Gate Symbols</strong> — Standardized graphical representations of logic gates, including both distinctive-shape symbols (e.g., D-shape for AND, pointed shape for OR) and IEEE rectangular symbols with function labels (e.g., "&amp;" for AND, ">=1" for OR).</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">High and Low States</strong> — The two voltage levels in physical digital circuits (HIGH and LOW) that correspond to the binary logic values 1 and 0 respectively in positive logic convention.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">High-Impedance State (Z)</strong> — A third output state (beyond 0 and 1) in which a tri-state buffer effectively disconnects from the circuit, enabling multiple devices to share a common data bus without signal conflicts.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">I</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Idempotent Law</strong> — A Boolean identity stating that a repeated operation of a variable with itself returns the variable unchanged: <span class="arithmatex">\(A + A = A\)</span> and <span class="arithmatex">\(A \cdot A = A\)</span>.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Identity Law</strong> — A Boolean identity stating that a variable operated with an identity element returns the variable: <span class="arithmatex">\(A + 0 = A\)</span> and <span class="arithmatex">\(A \cdot 1 = A\)</span>.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Inverter</strong> — Another name for the NOT gate, a logic gate that inverts its single input, drawn as a triangle with a small circle (bubble) at the output to indicate inversion.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Involution Law</strong> — A Boolean identity stating that complementing a variable twice returns the original value: <span class="arithmatex">\(\overline{\overline{A}} = A\)</span>, also known as the double complement law.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">L</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Literal</strong> — A Boolean variable or its complement appearing in a Boolean expression; for example, the expression <span class="arithmatex">\(AB + \overline{A}C\)</span> contains four literals: <span class="arithmatex">\(A\)</span>, <span class="arithmatex">\(B\)</span>, <span class="arithmatex">\(\overline{A}\)</span>, and <span class="arithmatex">\(C\)</span>.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Logic Function</strong> — A mapping from all possible input combinations to output values, where multiple different Boolean expressions can represent the same logic function.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Logic Gates</strong> — Physical electronic devices that implement Boolean operations, each having one or more inputs and producing an output based on a specific Boolean function, serving as the building blocks of all digital circuits.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Logic Levels</strong> — The designation of voltage ranges in digital circuits as either HIGH or LOW, corresponding to the Boolean values 1 and 0, with specific voltage thresholds defined by the logic family (e.g., TTL: LOW = 0–0.8V, HIGH = 2.0–5.0V).</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">M</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Maxterm</strong> — A sum term (OR of literals) in a POS expression in which every variable of the function appears exactly once, either in complemented or uncomplemented form, corresponding to an input combination for which the function output is 0.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Minterm</strong> — A product term (AND of literals) in an SOP expression in which every variable of the function appears exactly once, either in complemented or uncomplemented form, corresponding to an input combination for which the function output is 1.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Multiple Input Gates</strong> — Logic gates extended beyond two inputs to accept <span class="arithmatex">\(n\)</span> inputs, where an <span class="arithmatex">\(n\)</span>-input AND outputs 1 only if all <span class="arithmatex">\(n\)</span> inputs are 1, and an <span class="arithmatex">\(n\)</span>-input XOR outputs 1 if an odd number of inputs are 1.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">N</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">NAND Gate</strong> — A derived logic gate (NOT-AND) that produces the complement of the AND operation, outputting LOW only when all inputs are HIGH, and recognized as a universal gate.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Noise Margin</strong> — The amount of voltage deviation from the ideal logic level that a circuit can tolerate without producing incorrect logic outputs, determined by the difference between guaranteed output levels and required input levels.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">NOR Gate</strong> — A derived logic gate (NOT-OR) that produces the complement of the OR operation, outputting HIGH only when all inputs are LOW, and recognized as a universal gate.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">NOT Gate</strong> — A basic logic gate (also called an inverter) that implements the NOT operation by inverting its single input, drawn as a triangle with a bubble at the output.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">NOT Operation</strong> — The fundamental Boolean operation (logical negation) that inverts the input value, changing 0 to 1 and 1 to 0, denoted by an overbar, prime symbol, or the logical negation symbol.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Null Law (Dominance Law)</strong> — A Boolean identity stating that a variable operated with a dominant element returns the dominant element: <span class="arithmatex">\(A + 1 = 1\)</span> and <span class="arithmatex">\(A \cdot 0 = 0\)</span>.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">O</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Operator Precedence</strong> — The defined order in which Boolean operations are evaluated: parentheses first, then NOT (highest), then AND, then OR (lowest), analogous to how multiplication precedes addition in ordinary algebra.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">OR Gate</strong> — A basic logic gate that implements the OR operation, producing a HIGH output when any of its inputs is HIGH. Its standard symbol features a curved left edge and a pointed right edge.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">OR Operation</strong> — The fundamental Boolean operation (logical disjunction) that produces a 1 output when at least one input is 1, denoted by a plus sign or the "vee" symbol, and analogous to addition in ordinary algebra.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">P</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Product of Sums (POS)</strong> — A standard Boolean expression form structured as an AND of OR terms (sum terms), mapping directly to an OR-AND two-level circuit implementation, preferred when the function has few 0-output rows.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Product Term</strong> — A single literal or an AND (product) of multiple literals in a Boolean expression, such as <span class="arithmatex">\(A\)</span>, <span class="arithmatex">\(AB\)</span>, or <span class="arithmatex">\(\overline{A}BC\)</span>.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Propagation Delay</strong> — The time required for a signal change at a gate's input to produce the corresponding change at its output, which accumulates through cascaded gate levels and determines the maximum operating speed of a circuit.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">S</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Standard Form</strong> — A Boolean expression written in one of two consistent representations — Sum of Products (SOP) or Product of Sums (POS) — that provide systematic starting points for circuit implementation and enable direct mapping to two-level gate structures.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Sum of Products (SOP)</strong> — A standard Boolean expression form structured as an OR of AND terms (product terms), mapping directly to an AND-OR two-level circuit implementation, preferred when the function has few 1-output rows.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Sum Term</strong> — A single literal or an OR (sum) of multiple literals in a Boolean expression, such as <span class="arithmatex">\(A\)</span>, <span class="arithmatex">\(A + B\)</span>, or <span class="arithmatex">\(\overline{A} + B + C\)</span>.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">T</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Tri-State Buffer</strong> — A buffer gate with an added enable (EN) control input that, when disabled, places the output in a high-impedance (Z) state, effectively disconnecting from the circuit to allow bus sharing.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Truth Table</strong> — A systematic tabular listing of all possible input combinations and their corresponding outputs for a Boolean function, containing <span class="arithmatex">\(2^n\)</span> rows for <span class="arithmatex">\(n\)</span> input variables.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">U</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">Universal Gate</strong> — A single gate type (NAND or NOR) that is functionally complete, meaning any Boolean function can be implemented using only that gate type, which simplifies integrated circuit fabrication.</p>

</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 28px 28px 12px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 18px;">X</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">XNOR Gate</strong> — A derived logic gate (exclusive NOR) that produces a HIGH output when all inputs are the same (equality detector), expressed as <span class="arithmatex">\(F = \overline{A \oplus B} = AB + \overline{A}\,\overline{B}\)</span>.</p>

<p style="margin-bottom: 1rem; line-height: 1.75; color: #333;"><strong style="color: #5A3EED;">XOR Gate</strong> — A derived logic gate (exclusive OR) that produces a HIGH output when inputs differ (odd number of 1s among inputs), expressed as <span class="arithmatex">\(F = A \oplus B = \overline{A}B + A\overline{B}\)</span>.</p>

</div>

</div>
