---
title: Unit 7 Quiz - Multi-Level Gate Circuits
description: Test your understanding of NAND/NOR implementations, gate conversions, and multi-level optimization
---

# Quiz: Multi-Level Gate Circuits

Test your understanding of universal gates, circuit conversions, bubble pushing, and multi-level optimization with these questions.

---

#### 1. Why are NAND and NOR gates called "universal" gates?

<div class="upper-alpha" markdown>
1. They are the most commonly used gates
2. Any Boolean function can be implemented using only that gate type
3. They have the fastest propagation delay
4. They can be combined to create any two-input gate
</div>

??? question "Show Answer"
    The correct answer is **B**. A universal gate can implement all three basic Boolean operations (AND, OR, NOT), which means any Boolean function can be built using only that single gate type. Both NAND and NOR possess this property.

    **Concept Tested:** Universal Gates (NAND and NOR)

---

#### 2. How do you implement a NOT gate using only NAND gates?

<div class="upper-alpha" markdown>
1. Connect two NAND gates in series
2. Connect both inputs of a NAND gate to the same signal
3. Use three NAND gates with appropriate connections
4. It cannot be done with NAND gates alone
</div>

??? question "Show Answer"
    The correct answer is **B**. When both inputs of a NAND gate receive the same signal A, the output is A NAND A = (A·A)' = A'. This implements the NOT function.

    **Concept Tested:** NAND Gate Universality Proof

---

#### 3. To convert an AND-OR (SOP) circuit to NAND-only implementation, what is the general rule?

<div class="upper-alpha" markdown>
1. Replace only the OR gate with a NAND gate
2. Add inverters at all inputs
3. Replace all AND gates and the OR gate with NAND gates
4. Replace only the AND gates with NAND gates
</div>

??? question "Show Answer"
    The correct answer is **C**. The AND-OR to NAND-NAND conversion replaces all gates with NAND gates. This works because the inversions at the AND outputs cancel with the implicit inversions at the NAND-as-OR inputs (by De Morgan's theorem).

    **Concept Tested:** AND-OR to NAND-NAND Conversion

---

#### 4. In the bubble pushing technique, what happens when you push a bubble through a gate?

<div class="upper-alpha" markdown>
1. The gate is removed from the circuit
2. The gate type changes (AND becomes OR, or vice versa)
3. An additional gate is added
4. The gate's truth table is inverted
</div>

??? question "Show Answer"
    The correct answer is **B**. When pushing bubbles through a gate, the gate type changes according to De Morgan's theorem: AND gates become OR gates and OR gates become AND gates. This is because (AB)' = A' + B' and (A + B)' = A'B'.

    **Concept Tested:** Bubble Pushing Technique

---

#### 5. What is the "critical path" in a multi-level circuit?

<div class="upper-alpha" markdown>
1. The path with the most gates
2. The path with the fewest gates
3. The longest path (in terms of gate delays) from any input to any output
4. The path through the largest gates
</div>

??? question "Show Answer"
    The correct answer is **C**. The critical path is the longest path in terms of propagation delay from any input to any output. It determines the maximum operating speed of the circuit since all signals must stabilize before the output can be considered valid.

    **Concept Tested:** Critical Path Analysis

---

#### 6. What is "fan-in" in digital circuit design?

<div class="upper-alpha" markdown>
1. The number of outputs from a gate
2. The number of inputs to a gate
3. The number of gates in a circuit
4. The speed of signal propagation
</div>

??? question "Show Answer"
    The correct answer is **B**. Fan-in refers to the number of inputs to a gate. High fan-in can increase gate delay and may not be available in standard cell libraries, requiring gate decomposition.

    **Concept Tested:** Fan-in and Fan-out Constraints

---

#### 7. What is the primary benefit of factoring a Boolean expression?

<div class="upper-alpha" markdown>
1. Always reduces propagation delay
2. Reduces gate count and fan-in requirements
3. Eliminates the need for NAND gates
4. Produces a two-level circuit
</div>

??? question "Show Answer"
    The correct answer is **B**. Factoring extracts common sub-expressions, typically reducing the total gate count and the fan-in requirements. However, it usually increases the number of logic levels, which increases propagation delay.

    **Concept Tested:** Factoring for Multi-Level Optimization

---

#### 8. What function does an AOI22 gate implement?

<div class="upper-alpha" markdown>
1. F = AB + CD
2. F = (AB + CD)'
3. F = (A + B)(C + D)
4. F = A'B' + C'D'
</div>

??? question "Show Answer"
    The correct answer is **B**. An AOI22 (AND-OR-Invert with two 2-input ANDs) implements F = (AB + CD)'. The "22" indicates two AND terms each with 2 inputs, and the "I" indicates the inverted (complemented) output.

    **Concept Tested:** AOI and OAI Complex Gates

---

#### 9. Which conversion requires additional logic levels beyond the original?

<div class="upper-alpha" markdown>
1. AND-OR to NAND-NAND
2. OR-AND to NOR-NOR
3. AND-OR to NOR-only
4. Both A and B
</div>

??? question "Show Answer"
    The correct answer is **C**. Converting AND-OR to NAND-NAND maintains the same number of levels (it's a direct transformation). Similarly, OR-AND to NOR-NOR is direct. However, implementing SOP using only NOR gates requires additional levels because NOR naturally suits POS forms.

    **Concept Tested:** Mixed Gate Conversions

---

#### 10. What is technology mapping in logic synthesis?

<div class="upper-alpha" markdown>
1. Drawing the physical layout of a circuit
2. Converting a Boolean network into a circuit using gates from a specific library
3. Measuring propagation delays in a circuit
4. Determining which technology (CMOS, TTL) to use
</div>

??? question "Show Answer"
    The correct answer is **B**. Technology mapping converts an abstract Boolean network into an implementation using specific gates available in a target library (e.g., a standard cell library for ASIC design). It involves decomposition, matching, and covering steps.

    **Concept Tested:** Technology Mapping

---

#### 11. If a two-level circuit has a maximum fan-in of 5, and we factor it to reduce fan-in to 2, what is the trade-off?

<div class="upper-alpha" markdown>
1. No trade-off; the factored circuit is better in all ways
2. The factored circuit will have more propagation delay
3. The factored circuit will use more power
4. The factored circuit requires different gate types
</div>

??? question "Show Answer"
    The correct answer is **B**. Reducing fan-in through factoring creates additional logic levels. More levels mean more gate delays along the critical path, increasing the total propagation delay. This is the classic area/delay trade-off in digital design.

    **Concept Tested:** Level Reduction Techniques

---

#### 12. Two bubbles on the same wire in a circuit will:

<div class="upper-alpha" markdown>
1. Double the inversion effect
2. Cancel each other out
3. Create a don't care condition
4. Cause a timing hazard
</div>

??? question "Show Answer"
    The correct answer is **B**. Two inversions on the same wire cancel each other: (A')' = A. This is the basis for the double inversion technique used in gate conversion and bubble pushing.

    **Concept Tested:** De Morgan's Theorem in Gate Conversion

---

## Answers Summary

| Question | Answer | Concept |
|----------|--------|---------|
| 1 | B | Universal Gates |
| 2 | B | NAND Gate Universality |
| 3 | C | AND-OR to NAND-NAND |
| 4 | B | Bubble Pushing |
| 5 | C | Critical Path Analysis |
| 6 | B | Fan-in and Fan-out |
| 7 | B | Factoring |
| 8 | B | AOI Gates |
| 9 | C | Mixed Gate Conversions |
| 10 | B | Technology Mapping |
| 11 | B | Level Reduction |
| 12 | B | De Morgan's Theorem |
