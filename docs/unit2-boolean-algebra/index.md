---
title: Unit 2 — Boolean Algebra
description: Mathematical foundation for digital logic design covering Boolean operations, logic gates, theorems, and algebraic simplification techniques
generated_by: claude skill chapter-content-generator
date: 2026-02-04 17:15:00
version: 0.03
---

<div class="unit1-styled" markdown>

# Unit 2 — Boolean Algebra

<details class="video-overview">
<summary><strong>Unit Overview</strong> (click to expand)</summary>

Welcome to Unit 2, where we meet the mathematical language that makes digital logic possible — Boolean algebra. If number systems gave us the data, Boolean algebra gives us the rules for processing that data. Every gate on a chip, every decision a processor makes, traces back to the principles you will learn here.

Boolean algebra operates on just two values: zero and one. Three fundamental operations define everything else. The AND operation outputs a one only when all of its inputs are one. The OR operation outputs a one when at least one input is one. And the NOT operation simply flips a zero to a one or a one to a zero. In circuit terms, each operation corresponds to a physical logic gate.

From these three primitives, we derive several important compound operations. NAND is AND followed by NOT, and NOR is OR followed by NOT. You will discover later that NAND and NOR are each individually capable of implementing any Boolean function. We also have XOR, which outputs a one when its inputs differ, and XNOR, which outputs a one when its inputs match.

Boolean algebra has its own set of theorems and identities — commutative, associative, and distributive laws, along with De Morgan's theorems, which let you convert between AND and OR forms by complementing and swapping operators. Mastering these theorems allows you to simplify complex expressions, which directly translates into circuits that use fewer gates and run faster.

Finally, we introduce Sum of Products (SOP) and Product of Sums (POS) — two standard forms that give you a systematic starting point for both analysis and simplification.

**Key Takeaways**

1. AND, OR, and NOT are the three fundamental operations, and every digital circuit can be built from combinations of these gates.
2. Boolean theorems — especially De Morgan's theorems — let you simplify expressions, leading directly to more efficient circuit implementations.
3. Sum of Products and Product of Sums are standard forms that provide a systematic way to express and manipulate any Boolean function.

</details>

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">Summary</h2>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 20px 24px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<p style="color: #333; line-height: 1.85; font-size: 1.02rem; margin: 0;">
Boolean Algebra provides the mathematical foundation for digital logic design, enabling engineers to describe, analyze, and simplify digital circuits using algebraic methods. Developed by mathematician George Boole in the mid-19th century, this algebraic system operates on binary values and forms the theoretical basis for all modern computing. This unit introduces the fundamental Boolean operations (AND, OR, NOT), their physical implementation as logic gates, and the derived operations (NAND, NOR, XOR, XNOR) that expand design possibilities. Students will master the essential Boolean theorems and identities that enable systematic simplification of logic expressions, reducing circuit complexity and cost. The unit establishes Sum of Products (SOP) and Product of Sums (POS) as standard forms for representing Boolean functions.
</p>
</div>

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">Concepts Covered</h2>

<div style="background: #F8F6FF; border: 2px solid #D4C8FF; border-radius: 12px; padding: 20px 24px; margin: 1rem 0;" markdown>

1. Boolean Algebra
2. Boolean Variable
3. Boolean Constant
4. Logic Levels
5. High and Low States
6. Truth Value
7. AND Operation
8. OR Operation
9. NOT Operation
10. Complement
11. Logic Gates
12. AND Gate
13. OR Gate
14. NOT Gate
15. Inverter
16. NAND Gate
17. NOR Gate
18. XOR Gate
19. XNOR Gate
20. Buffer Gate
21. Universal Gates
22. Gate Symbols
23. IEEE Gate Symbols
24. Truth Table
25. Boolean Expression
26. Logic Function
27. Identity Law
28. Null Law
29. Idempotent Law
30. Involution Law
31. Complement Law
32. Commutative Law
33. Associative Law
34. Distributive Law
35. Absorption Law
36. Consensus Theorem
37. DeMorgans First Theorem
38. DeMorgans Second Theorem
39. Duality Principle
40. Algebraic Simplification
41. Literal
42. Product Term
43. Sum Term
44. Sum of Products
45. Product of Sums
46. Precedence of Operators
47. Parentheses in Boolean
48. Multiple Input Gates
49. Cascading Gates
50. Fan-In and Fan-Out

</div>

---

<h2 style="color: #5A3EED !important; border-bottom: 2px solid #5A3EED; padding-bottom: 0.3rem; font-weight: 700; margin-top: 2rem;">Prerequisites</h2>

Before beginning this unit, students should have:

- Understanding of binary number systems (Unit 1)
- Familiarity with basic algebraic operations and properties
- Knowledge of truth values (true/false, 1/0)

---

<h2 id="21-introduction-to-boolean-algebra" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">2.1 Introduction to Boolean Algebra</h2>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
<strong>Boolean Algebra</strong> is a mathematical system for manipulating logical values, developed by George Boole in 1854. Unlike conventional algebra that operates on real numbers, Boolean algebra operates exclusively on binary values: 0 and 1. This restriction makes Boolean algebra perfectly suited for digital electronics, where circuits naturally represent two distinct voltage states.
</p>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
In Boolean algebra, variables and expressions can only take one of two values. A <strong>Boolean variable</strong> represents an unknown that can be either 0 or 1, typically denoted by uppercase letters (A, B, C, X, Y, Z). A <strong>Boolean constant</strong> is a fixed value, either 0 or 1. These values correspond to <strong>logic levels</strong> in digital circuits.
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>
<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Boolean Values and Logic Levels</p>

| Term | Boolean Value | Logic Level | Voltage (TTL) | Meaning |
|------|---------------|-------------|---------------|---------|
| False | 0 | LOW | 0–0.8V | Off, No, Inactive |
| True | 1 | HIGH | 2.0–5.0V | On, Yes, Active |

</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
The terms <strong>high and low states</strong> refer to voltage levels in physical circuits, while <strong>truth value</strong> refers to the logical interpretation (true or false). The mapping between voltage and logic value can be either positive logic (high = 1) or negative logic (high = 0), though positive logic is standard.
</p>

<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(56,142,60,0.08);">
<p style="color: #2E7D32; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Historical Context</p>
<p style="color: #333; line-height: 1.85; margin: 0;">
George Boole's work predated electronic computers by nearly a century. Claude Shannon's 1937 master's thesis demonstrated that Boolean algebra could describe switching circuits, establishing the theoretical foundation for digital computing.
</p>
</div>

---

<h2 id="22-basic-boolean-operations" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">2.2 Basic Boolean Operations</h2>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
Boolean algebra defines three fundamental operations from which all other operations can be derived: AND, OR, and NOT.
</p>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">The AND Operation</h3>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
The <strong>AND operation</strong> (logical conjunction) produces a 1 output only when ALL inputs are 1. It is analogous to multiplication in ordinary algebra and is denoted by a dot (·), adjacency, or the ∧ symbol.
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>
<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">AND Operation</p>

$$F = A \cdot B = AB = A \land B$$

| A | B | A · B |
|---|---|-------|
| 0 | 0 | 0 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
The AND operation models series connections in circuits—current flows only when both switches are closed.
</p>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">The OR Operation</h3>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
The <strong>OR operation</strong> (logical disjunction) produces a 1 output when ANY input is 1. It is analogous to addition in ordinary algebra and is denoted by a plus sign (+) or the ∨ symbol.
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>
<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">OR Operation</p>

$$F = A + B = A \lor B$$

| A | B | A + B |
|---|---|-------|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 1 |

</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
The OR operation models parallel connections—current flows when either switch is closed.
</p>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">The NOT Operation</h3>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
The <strong>NOT operation</strong> (logical negation or <strong>complement</strong>) inverts the input value. It is denoted by an overbar, prime, or the ¬ symbol.
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>
<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">NOT Operation</p>

$$F = \overline{A} = A' = \lnot A$$

| A | $\overline{A}$ |
|---|----------------|
| 0 | 1 |
| 1 | 0 |

</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
The complement of 0 is 1, and the complement of 1 is 0. This operation is fundamental to implementing negative logic and creating other derived operations.
</p>

<h4 style="color: #5A3EED; font-weight: 700; margin-top: 2rem; margin-bottom: 0.8rem;">Diagram: Boolean Operations Visualizer</h4>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../sims/boolean-operations-visualizer/main.html" width="100%" height="500px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

---

<h2 id="23-logic-gates" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">2.3 Logic Gates</h2>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
<strong>Logic gates</strong> are the physical electronic devices that implement Boolean operations. Each gate has one or more inputs and produces an output based on a specific Boolean function. Gates are the building blocks of all digital circuits, from simple calculators to complex microprocessors.
</p>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Basic Gates</h3>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
The <strong>AND gate</strong> implements the AND operation, producing a HIGH output only when all inputs are HIGH. Its distinctive shape features a flat left edge and a curved right edge.
</p>

<h4 style="color: #5A3EED; font-weight: 700; margin-top: 2rem; margin-bottom: 0.8rem;">Diagram: AND Gate with Truth Table</h4>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../sims/and-gate-truth-table/main.html" width="100%" height="420px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
The <strong>OR gate</strong> implements the OR operation, producing a HIGH output when any input is HIGH. Its shape features a curved left edge (concave) and a pointed right edge.
</p>

<h4 style="color: #5A3EED; font-weight: 700; margin-top: 2rem; margin-bottom: 0.8rem;">Diagram: OR Gate with Truth Table</h4>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../sims/or-gate-truth-table/main.html" width="100%" height="420px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
The <strong>NOT gate</strong> (also called an <strong>inverter</strong>) implements the NOT operation, inverting its single input. It is drawn as a triangle with a small circle (bubble) at the output indicating inversion.
</p>

<h4 style="color: #5A3EED; font-weight: 700; margin-top: 2rem; margin-bottom: 0.8rem;">Diagram: NOT Gate with Truth Table</h4>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../sims/not-gate-truth-table/main.html" width="100%" height="390px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
The <strong>buffer gate</strong> passes its input unchanged to the output (<span class="arithmatex">\(F = A\)</span>). While seemingly useless logically, buffers provide signal amplification, isolation, and timing delays in physical circuits.
</p>

<h4 style="color: #5A3EED; font-weight: 700; margin-top: 2rem; margin-bottom: 0.8rem;">Diagram: Buffer Gate with Truth Table</h4>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../sims/buffer-gate-truth-table/main.html" width="100%" height="390px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
The <strong>tri-state buffer</strong> adds an <strong>enable (EN)</strong> control input to the standard buffer. When enabled (EN = 1), the output follows the input. When disabled (EN = 0), the output enters a <strong>high-impedance (Z)</strong> state—effectively disconnecting from the circuit. Tri-state buffers are essential for allowing multiple devices to share a common data bus without signal conflicts.
</p>

<h4 style="color: #5A3EED; font-weight: 700; margin-top: 2rem; margin-bottom: 0.8rem;">Diagram: Tri-State Buffer with Truth Table</h4>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../sims/tri-state-buffer-truth-table/main.html" width="100%" height="420px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Derived Gates</h3>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
<strong>Derived gates</strong> combine basic operations into single devices, often providing more efficient implementations.
</p>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
The <strong>NAND gate</strong> (NOT-AND) produces the complement of AND: output is LOW only when all inputs are HIGH.
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

$$F = \overline{A \cdot B}$$

</div>

<h4 style="color: #5A3EED; font-weight: 700; margin-top: 2rem; margin-bottom: 0.8rem;">Diagram: NAND Gate with Truth Table</h4>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../sims/nand-gate-truth-table/main.html" width="100%" height="420px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
The <strong>NOR gate</strong> (NOT-OR) produces the complement of OR: output is HIGH only when all inputs are LOW.
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

$$F = \overline{A + B}$$

</div>

<h4 style="color: #5A3EED; font-weight: 700; margin-top: 2rem; margin-bottom: 0.8rem;">Diagram: NOR Gate with Truth Table</h4>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../sims/nor-gate-truth-table/main.html" width="100%" height="420px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
The <strong>XOR gate</strong> (exclusive OR) produces a HIGH output when inputs differ (odd number of 1s).
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

$$F = A \oplus B = A\overline{B} + \overline{A}B$$

</div>

<h4 style="color: #5A3EED; font-weight: 700; margin-top: 2rem; margin-bottom: 0.8rem;">Diagram: XOR Gate with Truth Table</h4>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../sims/xor-gate-truth-table/main.html" width="100%" height="420px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
The <strong>XNOR gate</strong> (exclusive NOR) produces a HIGH output when inputs are the same (equality detector).
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

$$F = \overline{A \oplus B} = AB + \overline{A}\overline{B}$$

</div>

<h4 style="color: #5A3EED; font-weight: 700; margin-top: 2rem; margin-bottom: 0.8rem;">Diagram: XNOR Gate with Truth Table</h4>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../sims/xnor-gate-truth-table/main.html" width="100%" height="420px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>
<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Derived Gates Summary</p>

| A | B | NAND | NOR | XOR | XNOR |
|---|---|------|-----|-----|------|
| 0 | 0 | 1 | 1 | 0 | 1 |
| 0 | 1 | 1 | 0 | 1 | 0 |
| 1 | 0 | 1 | 0 | 1 | 0 |
| 1 | 1 | 0 | 0 | 0 | 1 |

</div>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Universal Gates</h3>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
<strong>Universal gates</strong> are gates that can implement any Boolean function using only that gate type. Both NAND and NOR are universal gates. This property is crucial for integrated circuit manufacturing, where using a single gate type simplifies fabrication.
</p>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
To implement basic operations using only NAND gates:
</p>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);" markdown>
<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">NAND as Universal Gate</p>
<ul style="list-style: none; padding-left: 0; margin: 0;">
<li style="margin-bottom: 0.6rem; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> <strong>NOT:</strong> <span class="arithmatex">\(\overline{A} = \overline{A \cdot A}\)</span> (connect both NAND inputs to A)</li>
<li style="margin-bottom: 0.6rem; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> <strong>AND:</strong> <span class="arithmatex">\(A \cdot B = \overline{\overline{A \cdot B}}\)</span> (NAND followed by NAND inverter)</li>
<li style="margin-bottom: 0; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> <strong>OR:</strong> <span class="arithmatex">\(A + B = \overline{\overline{A} \cdot \overline{B}}\)</span> (invert both inputs, then NAND)</li>
</ul>
</div>

<h4 style="color: #5A3EED; font-weight: 700; margin-top: 2rem; margin-bottom: 0.8rem;">Diagram: Logic Gate Simulator</h4>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../sims/logic-gate-simulator/main.html" width="100%" height="500px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

---

<h2 id="24-truth-tables-and-boolean-expressions" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">2.4 Truth Tables and Boolean Expressions</h2>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
A <strong>truth table</strong> is a systematic listing of all possible input combinations and their corresponding outputs for a Boolean function. For <span class="arithmatex">\(n\)</span> input variables, the truth table has <span class="arithmatex">\(2^n\)</span> rows.
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>
<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Truth Table Size</p>

| Variables | Rows |
|-----------|------|
| 1 | 2 |
| 2 | 4 |
| 3 | 8 |
| 4 | 16 |
| 5 | 32 |

</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
A <strong>Boolean expression</strong> is an algebraic formula using Boolean variables, constants, and operations. Every Boolean expression can be represented by a truth table, and every truth table can be expressed algebraically.
</p>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
A <strong>logic function</strong> is a mapping from input combinations to output values. The function <span class="arithmatex">\(F(A, B, C)\)</span> takes three Boolean inputs and produces one Boolean output. Multiple expressions can represent the same logic function—a key insight for circuit simplification.
</p>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);" markdown>
<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Example: Express the Truth Table as a Boolean Function</p>

| A | B | F |
|---|---|---|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

This is the XOR function: $F = A \oplus B = \overline{A}B + A\overline{B}$

</div>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Boolean Expression Terminology</h3>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
A <strong>literal</strong> is a variable or its complement. In the expression <span class="arithmatex">\(AB + \overline{A}C\)</span>, the literals are <span class="arithmatex">\(A\)</span>, <span class="arithmatex">\(B\)</span>, <span class="arithmatex">\(\overline{A}\)</span>, and <span class="arithmatex">\(C\)</span>.
</p>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
A <strong>product term</strong> is a single literal or AND of literals: <span class="arithmatex">\(A\)</span>, <span class="arithmatex">\(AB\)</span>, <span class="arithmatex">\(\overline{A}BC\)</span>.
</p>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
A <strong>sum term</strong> is a single literal or OR of literals: <span class="arithmatex">\(A\)</span>, <span class="arithmatex">\(A+B\)</span>, <span class="arithmatex">\(\overline{A}+B+C\)</span>.
</p>

<h4 style="color: #5A3EED; font-weight: 700; margin-top: 2rem; margin-bottom: 0.8rem;">Diagram: Truth Table Generator</h4>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../sims/truth-table-generator/main.html" width="100%" height="550px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

---

<h2 id="25-boolean-theorems-and-identities" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">2.5 Boolean Theorems and Identities</h2>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
Boolean algebra follows a set of fundamental theorems and identities that enable expression manipulation and simplification. These laws are presented in dual pairs—swapping AND with OR and 0 with 1 produces the dual form.
</p>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Basic Identities</h3>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

| Law Name | Description | Equations |
|:---------|:------------|:---------:|
| **Identity Law** | A variable operated with an identity element returns the variable | $A + 0 = A \qquad A \cdot 1 = A$ |
| **Null Law (Dominance)** | A variable operated with a dominant element returns the dominant element | $A + 1 = 1 \qquad A \cdot 0 = 0$ |
| **Idempotent Law** | Repeated operation of a variable with itself returns the variable | $A + A = A \qquad A \cdot A = A$ |
| **Involution Law** | Complementing twice returns the original value | $\overline{\overline{A}} = A$ |
| **Complement Law** | A variable operated with its complement produces a constant | $A + \overline{A} = 1 \qquad A \cdot \overline{A} = 0$ |

</div>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Algebraic Laws</h3>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

| Law Name | Description | Equations |
|:---------|:------------|:---------:|
| **Commutative Law** | Order of operands does not affect the result | $A + B = B + A \qquad A \cdot B = B \cdot A$ |
| **Associative Law** | Grouping of operands does not affect the result | $(A + B) + C = A + (B + C) \qquad (A \cdot B) \cdot C = A \cdot (B \cdot C)$ |
| **Distributive Law** | Distribution of one operation over another | $A \cdot (B + C) = A \cdot B + A \cdot C \qquad A + (B \cdot C) = (A + B) \cdot (A + C)$ |

</div>

<div style="background: #FFF3E0; border: 2px solid #FFB74D; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(230,126,34,0.08);">
<p style="color: #E65100; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Watch Out</p>
<p style="color: #333; line-height: 1.85; margin: 0;">
The second distributive law (<span class="arithmatex">\(A + BC = (A+B)(A+C)\)</span>) differs from ordinary algebra!
</p>
</div>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Advanced Theorems</h3>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

| Theorem Name | Description | Equations |
|:-------------|:------------|:---------:|
| **Absorption Law** | Eliminates redundant terms | $A + A \cdot B = A \qquad A \cdot (A + B) = A$ |
| **Consensus Theorem** | Eliminates redundant consensus terms | $AB + \overline{A}C + BC = AB + \overline{A}C$ <br> $(A + B)(\overline{A} + C)(B + C) = (A + B)(\overline{A} + C)$ |

</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
The consensus term (<span class="arithmatex">\(BC\)</span> or <span class="arithmatex">\(B+C\)</span>) is redundant because it's covered by the other terms.
</p>

<h4 style="color: #5A3EED; font-weight: 700; margin-top: 2rem; margin-bottom: 0.8rem;">Diagram: Boolean Laws Interactive Proof</h4>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../sims/boolean-laws-explorer/main.html" width="100%" height="650px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

---

<h2 id="26-demorgans-theorems" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">2.6 DeMorgan's Theorems</h2>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
<strong>DeMorgan's theorems</strong> are among the most important results in Boolean algebra, providing the relationship between AND and OR through complementation. They are essential for converting between logic forms and implementing circuits using universal gates.
</p>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">DeMorgan's First Theorem</h3>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

$$\overline{A \cdot B} = \overline{A} + \overline{B}$$

</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
The complement of a product equals the sum of the complements. In circuit terms: a NAND gate is equivalent to an OR gate with inverted inputs.
</p>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">DeMorgan's Second Theorem</h3>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

$$\overline{A + B} = \overline{A} \cdot \overline{B}$$

</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
The complement of a sum equals the product of the complements. In circuit terms: a NOR gate is equivalent to an AND gate with inverted inputs.
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>
<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Generalized Form</p>

DeMorgan's theorems extend to any number of variables:

$$\begin{aligned}
\overline{A \cdot B \cdot C \cdot \ldots} &= \overline{A} + \overline{B} + \overline{C} + \ldots \\[6pt]
\overline{A + B + C + \ldots} &= \overline{A} \cdot \overline{B} \cdot \overline{C} \cdot \ldots
\end{aligned}$$

</div>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);" markdown>
<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Application Example: Simplify <span class="arithmatex">\(\overline{\overline{A}\,B + C}\)</span></p>

$$\begin{aligned}
\overline{\overline{A}\,B + C} &= \overline{\overline{A}\,B} \cdot \overline{C}
  && \text{(DeMorgan's second theorem)} \\[6pt]
&= \bigl(\overline{\overline{A}} + \overline{B}\bigr) \cdot \overline{C}
  && \text{(DeMorgan's first theorem)} \\[6pt]
&= \bigl(A + \overline{B}\bigr) \cdot \overline{C}
  && \text{(Involution)} \\[6pt]
&= A\,\overline{C} + \overline{B}\,\overline{C}
  && \text{(Distributive law)}
\end{aligned}$$

</div>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">The Duality Principle</h3>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
The <strong>duality principle</strong> states that any Boolean theorem remains valid if we:
</p>

<ul style="list-style: none; padding-left: 0; margin: 0.8rem 0 1.2rem 0;">
<li style="margin-bottom: 0.6rem; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">1.</span> Interchange AND and OR operators</li>
<li style="margin-bottom: 0; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">2.</span> Interchange 0 and 1 constants</li>
</ul>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
For example, the dual of <span class="arithmatex">\(A + 0 = A\)</span> is <span class="arithmatex">\(A \cdot 1 = A\)</span>, and both are valid. The dual of <span class="arithmatex">\(A + \overline{A} = 1\)</span> is <span class="arithmatex">\(A \cdot \overline{A} = 0\)</span>.
</p>

<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(56,142,60,0.08);">
<p style="color: #2E7D32; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">DeMorgan's Bubble Trick</p>
<p style="color: #333; line-height: 1.85; margin: 0;">
To find the equivalent of a gate using DeMorgan's theorem, push the bubble through the gate while changing its type (AND ↔ OR). A bubble on the output becomes bubbles on all inputs (and vice versa).
</p>
</div>

<h4 style="color: #5A3EED; font-weight: 700; margin-top: 2rem; margin-bottom: 0.8rem;">Diagram: DeMorgan's Theorem Visualizer</h4>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../sims/demorgans-theorem-visualizer/main.html" width="100%" height="500px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

---

<h2 id="27-algebraic-simplification" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">2.7 Algebraic Simplification</h2>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
<strong>Algebraic simplification</strong> reduces Boolean expressions to simpler equivalent forms, minimizing the number of gates and connections required for implementation. A simplified expression uses fewer literals and terms while implementing the same logic function.
</p>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Simplification Strategies</h3>

<ul style="list-style: none; padding-left: 0; margin: 0.8rem 0 1.2rem 0;">
<li style="margin-bottom: 0.6rem; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">1.</span> <strong>Apply basic identities</strong> to eliminate constants and redundant terms</li>
<li style="margin-bottom: 0.6rem; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">2.</span> <strong>Factor common terms</strong> using distributive law</li>
<li style="margin-bottom: 0.6rem; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">3.</span> <strong>Combine terms</strong> using complement law: <span class="arithmatex">\(AB + A\overline{B} = A\)</span></li>
<li style="margin-bottom: 0.6rem; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">4.</span> <strong>Apply absorption</strong> to eliminate redundant terms</li>
<li style="margin-bottom: 0.6rem; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">5.</span> <strong>Use consensus theorem</strong> to remove covered terms</li>
<li style="margin-bottom: 0; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">6.</span> <strong>Apply DeMorgan's</strong> to convert between forms</li>
</ul>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Worked Examples</h3>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);">
<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Example 1: Simplify <span class="arithmatex">\(F = AB + A\overline{B}\)</span></p>
<span class="arithmatex">\[\begin{aligned}
F &= AB + A\overline{B} \\[6pt]
&= A(B + \overline{B}) && \text{(factor out } A\text{)} \\[6pt]
&= A \cdot 1 && \text{(complement law)} \\[6pt]
&= A && \text{(identity law)}
\end{aligned}\]</span>
</div>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);">
<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Example 2: Simplify <span class="arithmatex">\(F = A + AB\)</span></p>
<span class="arithmatex">\[\begin{aligned}
F &= A + AB \\[6pt]
&= A \cdot 1 + AB && \text{(identity law)} \\[6pt]
&= A(1 + B) && \text{(factor out } A\text{)} \\[6pt]
&= A \cdot 1 && \text{(null law: } 1 + B = 1\text{)} \\[6pt]
&= A && \text{(identity law)}
\end{aligned}\]</span>
<p style="color: #333; line-height: 1.85; margin: 10px 0 0 0;">This is the absorption law.</p>
</div>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);">
<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Example 3: Simplify <span class="arithmatex">\(F = (A + B)(A + \overline{B})\)</span></p>
<span class="arithmatex">\[\begin{aligned}
F &= (A + B)(A + \overline{B}) \\[6pt]
&= A \cdot A + A\overline{B} + AB + B\overline{B} && \text{(expand)} \\[6pt]
&= A + A\overline{B} + AB + 0 && \text{(idempotent, complement)} \\[6pt]
&= A + A(\overline{B} + B) && \text{(factor)} \\[6pt]
&= A + A \cdot 1 && \text{(complement)} \\[6pt]
&= A + A = A && \text{(idempotent)}
\end{aligned}\]</span>
</div>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);">
<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Example 4: Simplify <span class="arithmatex">\(F = \overline{A}B + \overline{A}C + \overline{B}\overline{C}\)</span></p>
<span class="arithmatex">\[\begin{aligned}
F &= \overline{A}B + \overline{A}C + \overline{B}\overline{C} \\[6pt]
&= \overline{A}(B + C) + \overline{B}\overline{C} && \text{(factor out } \overline{A}\text{)}
\end{aligned}\]</span>
<p style="color: #333; line-height: 1.85; margin: 10px 0 6px 0;">The term <span class="arithmatex">\(\overline{B}\overline{C}\)</span> is not a consensus term here (consensus would require complementary variables across the first two terms). This expression cannot be reduced further, so the simplified form is:</p>
<span class="arithmatex">\[F = \overline{A}(B + C) + \overline{B}\overline{C}\]</span>
</div>

<h4 style="color: #5A3EED; font-weight: 700; margin-top: 2rem; margin-bottom: 0.8rem;">Diagram: Boolean Simplification Tutor</h4>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../sims/boolean-simplification-tutor/main.html" width="100%" height="600px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

---

<h2 id="28-standard-forms-sop-and-pos" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">2.8 Standard Forms: SOP and POS</h2>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
Boolean expressions can be written in two <strong>standard forms</strong> that provide consistent representations and enable systematic circuit implementation.
</p>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Sum of Products (SOP)</h3>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
A <strong>Sum of Products</strong> expression is an OR of AND terms (product terms). Each product term is an AND of literals.
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

$$F = \overline{A}B + AB\overline{C} + BC$$

</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
SOP forms map directly to AND-OR circuit implementations:
</p>

<ul style="list-style: none; padding-left: 0; margin: 0.8rem 0 1.2rem 0;">
<li style="margin-bottom: 0.6rem; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> Each product term → one AND gate</li>
<li style="margin-bottom: 0.6rem; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> Products are ORed together → one OR gate</li>
<li style="margin-bottom: 0; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> This creates a two-level circuit</li>
</ul>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Product of Sums (POS)</h3>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
A <strong>Product of Sums</strong> expression is an AND of OR terms (sum terms). Each sum term is an OR of literals.
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

$$F = (A + B)(\overline{A} + C)(B + \overline{C})$$

</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
POS forms map directly to OR-AND circuit implementations:
</p>

<ul style="list-style: none; padding-left: 0; margin: 0.8rem 0 1.2rem 0;">
<li style="margin-bottom: 0.6rem; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> Each sum term → one OR gate</li>
<li style="margin-bottom: 0.6rem; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> Sums are ANDed together → one AND gate</li>
<li style="margin-bottom: 0; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> This also creates a two-level circuit</li>
</ul>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Converting Between Forms</h3>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
To convert SOP to POS (or vice versa):
</p>

<ul style="list-style: none; padding-left: 0; margin: 0.8rem 0 1.2rem 0;">
<li style="margin-bottom: 0.6rem; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">1.</span> Create the truth table for the expression</li>
<li style="margin-bottom: 0.6rem; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">2.</span> Read off the new form from the truth table:</li>
<li style="margin-bottom: 0.4rem; line-height: 1.8; color: #333; padding-left: 2.8rem; text-indent: 0;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#8226;</span> SOP: OR together minterms where <span class="arithmatex">\(F=1\)</span></li>
<li style="margin-bottom: 0; line-height: 1.8; color: #333; padding-left: 2.8rem; text-indent: 0;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#8226;</span> POS: AND together maxterms where <span class="arithmatex">\(F=0\)</span></li>
</ul>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
Alternatively, apply DeMorgan's theorem and Boolean algebra:
</p>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);" markdown>
<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Example: SOP to POS Conversion</p>

$$F = AB + \overline{A}C$$

**Step 1** — Find $\overline{F}$ in POS: $\overline{F} = \overline{AB + \overline{A}C} = (\overline{A}+\overline{B})(A+\overline{C})$

**Step 2** — Expand $\overline{F}$ to SOP: $\overline{F} = \overline{A}A + \overline{A}\overline{C} + \overline{B}A + \overline{B}\overline{C} = \overline{A}\overline{C} + A\overline{B}$

**Step 3** — Complement to get F in POS: $F = \overline{\overline{A}\overline{C} + A\overline{B}} = (A+C)(\overline{A}+B)$

</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
The truth table method is often more straightforward for complex expressions.
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>
<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">SOP vs POS Comparison</p>

| Form | Structure | Implementation | Typical Use |
|------|-----------|----------------|-------------|
| SOP | OR of ANDs | AND-OR circuit | When function has few 1s |
| POS | AND of ORs | OR-AND circuit | When function has few 0s |

</div>

---

<h2 id="29-operator-precedence-and-notation" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">2.9 Operator Precedence and Notation</h2>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
<strong>Precedence of operators</strong> in Boolean algebra follows this order (highest to lowest):
</p>

<ul style="list-style: none; padding-left: 0; margin: 0.8rem 0 1.2rem 0;">
<li style="margin-bottom: 0.6rem; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">1.</span> <strong>Parentheses</strong> — evaluated first</li>
<li style="margin-bottom: 0.6rem; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">2.</span> <strong>NOT</strong> (complement) — highest operator precedence</li>
<li style="margin-bottom: 0.6rem; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">3.</span> <strong>AND</strong> — evaluated before OR</li>
<li style="margin-bottom: 0; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">4.</span> <strong>OR</strong> — lowest precedence</li>
</ul>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);">
<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Example: Evaluate <span class="arithmatex">\(A + B \cdot \overline{C}\)</span> when <span class="arithmatex">\(A=1\)</span>, <span class="arithmatex">\(B=1\)</span>, <span class="arithmatex">\(C=0\)</span></p>
<ul style="list-style: none; padding-left: 0; margin: 0;">
<li style="margin-bottom: 0.6rem; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">1.</span> First, NOT: <span class="arithmatex">\(\overline{C} = \overline{0} = 1\)</span></li>
<li style="margin-bottom: 0.6rem; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">2.</span> Then, AND: <span class="arithmatex">\(B \cdot \overline{C} = 1 \cdot 1 = 1\)</span></li>
<li style="margin-bottom: 0; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">3.</span> Finally, OR: <span class="arithmatex">\(A + 1 = 1 + 1 = 1\)</span></li>
</ul>
</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
<strong>Parentheses in Boolean</strong> expressions are used to override default precedence:
</p>

<ul style="list-style: none; padding-left: 0; margin: 0.8rem 0 1.2rem 0;">
<li style="margin-bottom: 0.6rem; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> <span class="arithmatex">\((A + B) \cdot C\)</span> means OR first, then AND</li>
<li style="margin-bottom: 0; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> <span class="arithmatex">\(A + B \cdot C\)</span> means AND first, then OR (no parentheses needed)</li>
</ul>

<div style="background: #FFF3E0; border: 2px solid #FFB74D; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(230,126,34,0.08);">
<p style="color: #E65100; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Common Mistake</p>
<p style="color: #333; line-height: 1.85; margin: 0;">
Students often incorrectly evaluate <span class="arithmatex">\(A + BC\)</span> as <span class="arithmatex">\((A + B) \cdot C\)</span>. Remember: AND binds tighter than OR, just like multiplication binds tighter than addition in ordinary algebra.
</p>
</div>

---

<h2 id="210-multiple-input-gates-and-practical-considerations" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">2.10 Multiple Input Gates and Practical Considerations</h2>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Multiple Input Gates</h3>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
Logic gates can accept more than two inputs. <strong>Multiple input gates</strong> extend naturally from the two-input definitions:
</p>

<ul style="list-style: none; padding-left: 0; margin: 0.8rem 0 1.2rem 0;">
<li style="margin-bottom: 0.6rem; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> <strong>n-input AND:</strong> Output is 1 only if ALL n inputs are 1</li>
<li style="margin-bottom: 0.6rem; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> <strong>n-input OR:</strong> Output is 1 if ANY input is 1</li>
<li style="margin-bottom: 0.6rem; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> <strong>n-input NAND:</strong> Output is 0 only if ALL n inputs are 1</li>
<li style="margin-bottom: 0.6rem; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> <strong>n-input NOR:</strong> Output is 0 if ANY input is 1</li>
<li style="margin-bottom: 0; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> <strong>n-input XOR:</strong> Output is 1 if an ODD number of inputs are 1</li>
</ul>

<h4 style="color: #5A3EED; font-weight: 700; margin-top: 2rem; margin-bottom: 0.8rem;">Diagram: 3-Input AND Gate</h4>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../sims/3-input-and-gate/main.html" width="100%" height="500px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

<h4 style="color: #5A3EED; font-weight: 700; margin-top: 2rem; margin-bottom: 0.8rem;">Diagram: 3-Input OR Gate</h4>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../sims/3-input-or-gate/main.html" width="100%" height="650px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

<h4 style="color: #5A3EED; font-weight: 700; margin-top: 2rem; margin-bottom: 0.8rem;">Diagram: 3-Input NAND Gate</h4>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../sims/3-input-nand-gate/main.html" width="100%" height="650px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

<h4 style="color: #5A3EED; font-weight: 700; margin-top: 2rem; margin-bottom: 0.8rem;">Diagram: 3-Input NOR Gate</h4>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../sims/3-input-nor-gate/main.html" width="100%" height="650px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

<h4 style="color: #5A3EED; font-weight: 700; margin-top: 2rem; margin-bottom: 0.8rem;">Diagram: 3-Input XOR Gate</h4>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../sims/3-input-xor-gate/main.html" width="100%" height="650px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
The associative property guarantees that <span class="arithmatex">\((A \cdot B) \cdot C = A \cdot (B \cdot C)\)</span>, allowing gates to be extended to any number of inputs.
</p>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Cascading Gates</h3>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
When a single gate cannot handle all required inputs, <strong>cascading gates</strong> connects multiple gates in series. For example, a 4-input AND using 2-input gates:
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

$$F = ((A \cdot B) \cdot C) \cdot D$$

</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
This requires three 2-input AND gates connected in cascade.
</p>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Fan-In and Fan-Out</h3>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
<strong>Fan-in</strong> refers to the number of inputs a gate can accept. Physical limitations (speed, power) restrict maximum fan-in, typically 8–12 inputs for standard logic families.
</p>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
<strong>Fan-out</strong> refers to the number of gate inputs that a single output can drive. Exceeding fan-out specifications causes signal degradation. Standard TTL gates typically support fan-out of 10.
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>
<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Fan-In and Fan-Out Limits</p>

| Parameter | Definition | Typical Limit |
|-----------|------------|---------------|
| Fan-In | Maximum inputs per gate | 8–12 |
| Fan-Out | Maximum loads per output | 10 |

</div>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
When designs exceed these limits, buffer gates provide signal restoration and current amplification.
</p>

<h4 style="color: #5A3EED; font-weight: 700; margin-top: 2rem; margin-bottom: 0.8rem;">Diagram: Gate Cascading and Fan-Out Simulator</h4>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../sims/gate-cascade-simulator/main.html" width="100%" height="500px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

---

<h2 id="211-circuit-analysis-and-synthesis" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">2.11 Circuit Analysis and Synthesis</h2>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
Boolean algebra bridges the gap between circuit diagrams and mathematical expressions, enabling both <strong>circuit analysis</strong> (deriving the expression from a circuit) and <strong>circuit synthesis</strong> (building a circuit from an expression).
</p>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Circuit Analysis Procedure</h3>

<ul style="list-style: none; padding-left: 0; margin: 0.8rem 0 1.2rem 0;">
<li style="margin-bottom: 0.6rem; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">1.</span> Label all gate outputs with intermediate variables</li>
<li style="margin-bottom: 0.6rem; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">2.</span> Write the Boolean expression for each gate's output</li>
<li style="margin-bottom: 0.6rem; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">3.</span> Substitute intermediate expressions to get the final output</li>
<li style="margin-bottom: 0; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">4.</span> Simplify if desired</li>
</ul>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);">
<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Example: Analyze this circuit</p>
<ul style="list-style: none; padding-left: 0; margin: 0;">
<li style="margin-bottom: 0.6rem; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> Gate 1 (AND): receives inputs A and B, output = AB</li>
<li style="margin-bottom: 0.6rem; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> Gate 2 (NOT): receives input C, output = <span class="arithmatex">\(\overline{C}\)</span></li>
<li style="margin-bottom: 0.6rem; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> Gate 3 (OR): receives Gate 1 and Gate 2 outputs</li>
<li style="margin-bottom: 0; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> Final output: <span class="arithmatex">\(F = AB + \overline{C}\)</span></li>
</ul>
</div>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Circuit Synthesis Procedure</h3>

<ul style="list-style: none; padding-left: 0; margin: 0.8rem 0 1.2rem 0;">
<li style="margin-bottom: 0.6rem; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">1.</span> Start with the Boolean expression</li>
<li style="margin-bottom: 0.6rem; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">2.</span> Identify the required gates from the operations</li>
<li style="margin-bottom: 0.6rem; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">3.</span> Connect inputs to appropriate gates</li>
<li style="margin-bottom: 0; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">4.</span> Connect gate outputs according to expression structure</li>
</ul>

<div style="background: #FFF7DD; border: 2px solid #F0D87A; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(212,160,23,0.10);">
<p style="color: #B8860B; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Example: Synthesize <span class="arithmatex">\(F = A\overline{B} + BC\)</span></p>
<p style="color: #333; line-height: 1.85; margin: 0 0 10px 0;">Required gates:</p>
<ul style="list-style: none; padding-left: 0; margin: 0;">
<li style="margin-bottom: 0.6rem; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> NOT gate for <span class="arithmatex">\(\overline{B}\)</span></li>
<li style="margin-bottom: 0.6rem; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> AND gate for <span class="arithmatex">\(A\overline{B}\)</span></li>
<li style="margin-bottom: 0.6rem; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> AND gate for <span class="arithmatex">\(BC\)</span></li>
<li style="margin-bottom: 0; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> OR gate for final sum</li>
</ul>
</div>

<h4 style="color: #5A3EED; font-weight: 700; margin-top: 2rem; margin-bottom: 0.8rem;">Diagram: Circuit Analysis and Synthesis Tool</h4>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../sims/circuit-analysis-synthesis/main.html" width="100%" height="600px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

---

<h2 id="summary-and-key-takeaways" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">Summary and Key Takeaways</h2>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
This unit established the axiomatic framework of Boolean algebra as the mathematical basis for combinational logic design.
</p>

<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(56,142,60,0.08);">
<p style="color: #2E7D32; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Key Takeaways</p>
<ul style="list-style: none; padding-left: 0; margin: 0;">
<li style="margin-bottom: 0.9rem; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> <strong>Boolean algebra</strong> is defined over the binary set <span class="arithmatex">\(\{0, 1\}\)</span> with three primitive operations: conjunction (AND, <span class="arithmatex">\(\cdot\)</span>), disjunction (OR, <span class="arithmatex">\(+\)</span>), and complementation (NOT, <span class="arithmatex">\(\overline{\phantom{A}}\)</span>).</li>
<li style="margin-bottom: 0.9rem; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> <strong>Logic gates</strong> provide the physical realization of Boolean operations. The primary gates (AND, OR, NOT, Buffer) and compound gates (NAND, NOR, XOR, XNOR) constitute the fundamental building blocks of all digital circuits.</li>
<li style="margin-bottom: 0.9rem; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> <strong>Universal gates</strong> (NAND and NOR) are functionally complete—any Boolean function can be implemented using a single gate type, which reduces fabrication complexity in integrated circuit design.</li>
<li style="margin-bottom: 0.9rem; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> <strong>Truth tables</strong> exhaustively specify the input–output behavior of a logic function. An <span class="arithmatex">\(n\)</span>-variable function requires <span class="arithmatex">\(2^n\)</span> rows for complete enumeration.</li>
<li style="margin-bottom: 0.9rem; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> <strong>Boolean identities</strong> (Identity, Null, Idempotent, Complement, Involution) establish the foundational relationships used in algebraic manipulation of logic expressions.</li>
<li style="margin-bottom: 0.9rem; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> <strong>Algebraic laws</strong> (Commutative, Associative, Distributive, Absorption, Consensus) provide the formal basis for systematic expression simplification and circuit optimization.</li>
<li style="margin-bottom: 0.9rem; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> <strong>DeMorgan's theorems</strong> define the duality between conjunction and disjunction under complementation, and are indispensable for gate-level transformations and NAND/NOR conversion.</li>
<li style="margin-bottom: 0.9rem; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> <strong>The duality principle</strong> guarantees that any valid Boolean theorem yields a corresponding dual theorem when AND <span class="arithmatex">\(\leftrightarrow\)</span> OR and <span class="arithmatex">\(0 \leftrightarrow 1\)</span> are interchanged throughout.</li>
<li style="margin-bottom: 0.9rem; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> <strong>Standard forms</strong> (Sum of Products and Product of Sums) provide canonical expression representations that map directly to two-level gate implementations.</li>
<li style="margin-bottom: 0.9rem; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> <strong>Operator precedence</strong> is defined as NOT <span class="arithmatex">\(>\)</span> AND <span class="arithmatex">\(>\)</span> OR, with parentheses used to override the default evaluation order.</li>
<li style="margin-bottom: 0; line-height: 1.8; color: #333; padding-left: 1.4rem; text-indent: -1.4rem;"><span style="color: #5A3EED; font-weight: 700; margin-right: 0.4rem;">&#9679;</span> <strong>Physical design constraints</strong>, including fan-in limitations and fan-out loading, must be accounted for when translating Boolean expressions into realizable gate-level circuits.</li>
</ul>
</div>

<details style="margin-top: 1.5rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Self-Check: What is the complement of <span class="arithmatex">\(F = AB + C\)</span> using DeMorgan's theorem?</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<span class="arithmatex">\(\overline{F} = \overline{AB + C} = \overline{AB} \cdot \overline{C} = (\overline{A} + \overline{B}) \cdot \overline{C} = \overline{A}\overline{C} + \overline{B}\overline{C}\)</span>
</div>
</details>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Self-Check: Why are NAND and NOR called universal gates?</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin: 0;">They can implement any Boolean function using only that gate type. All other gates (AND, OR, NOT) can be constructed from NAND gates alone or NOR gates alone.</p>
</div>
</details>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Self-Check: Simplify <span class="arithmatex">\(F = AB + A\overline{B} + \overline{A}B\)</span></summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<span class="arithmatex">\(F = A(B + \overline{B}) + \overline{A}B = A + \overline{A}B = A + B\)</span> (by absorption: <span class="arithmatex">\(A + \overline{A}B = A + B\)</span>)
</div>
</details>

---

<h2 id="interactive-walkthrough" style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">Interactive Walkthrough</h2>

<p style="color: #555; line-height: 1.85; font-size: 1.02rem; margin-bottom: 1.2rem;">
Step through a complete Boolean algebra proof with each law identified:
</p>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 18px; margin: 1rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);">
<iframe src="../sims/boolean-proof-walkthrough/main.html?v=2" width="100%" height="600px" scrolling="no" style="border:none; border-radius:8px; overflow:hidden;"></iframe>
</div>

---

[Take the Unit Quiz](./quiz.md) | [See Annotated References](./references.md)

</div>
