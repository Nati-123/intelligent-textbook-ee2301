---
title: Unit 7 Quiz - Multi-Level Gate Circuits
description: Test your understanding of universal gates, NAND/NOR conversions, bubble pushing, multi-level optimization, and technology mapping
---

# Quiz: Multi-Level Gate Circuits

Test your understanding of universal gates, circuit conversions, multi-level analysis, propagation delay, factoring techniques, and technology mapping with these questions.

---

#### 1. Which property makes NAND and NOR gates classified as "universal" gates?

<div class="upper-alpha" markdown>
1. They have the lowest propagation delay among all logic gate types
2. Any Boolean function can be implemented using only that single gate type
3. They require the fewest transistors to manufacture in CMOS technology
4. They can drive an unlimited number of gate inputs without signal degradation
</div>

??? question "Show Answer"
    The correct answer is **B**. A gate is universal (functionally complete) if it can implement NOT, AND, and OR—the three operations from which any Boolean function can be constructed. NAND implements NOT by tying both inputs together, AND by cascading two NANDs, and OR by inverting each input before a NAND. NOR achieves universality through the dual construction. This property has profound practical significance: an entire IC can be fabricated using only one type of transistor configuration.

    **Concept Tested:** Universal Gates (NAND and NOR)

---

#### 2. An AOI22 complex gate implements which Boolean function?

<div class="upper-alpha" markdown>
1. $(A+B)(C+D)$
2. $\overline{(A+B)(C+D)}$
3. $\overline{AB + CD}$
4. $AB + CD$
</div>

??? question "Show Answer"
    The correct answer is **C**. An AOI (AND-OR-Invert) gate performs AND operations on groups of inputs, ORs the results together, then inverts the output. The naming convention "AOI22" indicates two groups of two inputs each. So AOI22 computes: AND group 1 ($AB$), AND group 2 ($CD$), OR them ($AB + CD$), then invert: $\overline{AB + CD}$. The dual OAI22 would compute $\overline{(A+B)(C+D)}$. AOI/OAI complex gates implement two levels of logic in a single CMOS structure with approximately one gate delay.

    **Concept Tested:** AOI and OAI Complex Gates

---

#### 3. To convert a two-level SOP (AND-OR) circuit to NAND-only form using the double-inversion method, what is the conversion rule?

<div class="upper-alpha" markdown>
1. Replace all AND gates and the OR gate with NAND gates
2. Replace AND gates with NOR gates and the OR gate with a NAND gate
3. Add an inverter to every gate output in the original circuit
4. Replace only the OR gate with a NAND gate and keep the AND gates unchanged
</div>

??? question "Show Answer"
    The correct answer is **A**. The AND-OR to NAND-NAND conversion works by applying double inversion: $F = AB + CD = \overline{\overline{AB + CD}} = \overline{\overline{AB} \cdot \overline{CD}}$. The first-level NAND gates produce $\overline{AB}$ and $\overline{CD}$, and the second-level NAND gate computes $\overline{\overline{AB} \cdot \overline{CD}} = AB + CD$. The inversions from the first-level NAND outputs and the second-level NAND inputs cancel in pairs, so simply replacing all gates with NAND gates produces the correct result for standard two-level SOP forms.

    **Concept Tested:** AND-OR to NAND-NAND Conversion

---

#### 4. What is the primary practical advantage of multi-level circuits compared to two-level (SOP/POS) implementations?

<div class="upper-alpha" markdown>
1. Lower propagation delay from input to output
2. Simpler Boolean expressions with fewer literals
3. Reduced gate count and lower fan-in requirements, enabling implementation with standard gate sizes
4. Complete elimination of all glitches and timing hazards
</div>

??? question "Show Answer"
    The correct answer is **C**. While two-level circuits (AND-OR or OR-AND) provide minimum propagation delay, they often require gates with many inputs (high fan-in) and a large total gate count—especially for complex functions. Multi-level circuits introduce additional gate delays but significantly reduce both gate count (through sharing common sub-expressions) and fan-in requirements (by breaking large gates into smaller ones). Since standard cell libraries typically offer gates with 2–4 inputs, multi-level circuits are essential for practical implementation.

    **Concept Tested:** Two-Level vs Multi-Level Circuits

---

#### 5. When converting $F = A + BC$ to NAND-only form, the single literal $A$ requires what additional element at the input of the final NAND gate?

<div class="upper-alpha" markdown>
1. Two cascaded NAND gates to double-invert $A$
2. A NOR gate to complement $A$ before the final NAND gate
3. No additional element—$A$ connects directly to the final NAND gate
4. A NAND gate configured as an inverter to complement $A$, since the final NAND gate expects complemented inputs from the first level
</div>

??? question "Show Answer"
    The correct answer is **D**. Applying double inversion: $F = A + BC = \overline{\overline{A} \cdot \overline{BC}}$. The NAND gate for $BC$ produces $\overline{BC}$, which feeds the final NAND gate. But the single literal $A$ must also be complemented to $\overline{A}$ before entering the final NAND gate. This complementation requires a NAND gate configured as an inverter (both inputs tied to $A$). In bubble-pushing terms, the bubble on $A$'s input to the final NAND is unpaired and must be implemented as an explicit inverter.

    **Concept Tested:** Bubble Pushing Technique / NAND Conversion

---

#### 6. A three-level NAND circuit has a propagation delay of 4 ns per gate. What is the worst-case propagation delay from any primary input to the output?

<div class="upper-alpha" markdown>
1. 4 ns
2. 8 ns
3. 12 ns
4. 16 ns
</div>

??? question "Show Answer"
    The correct answer is **C**. The worst-case propagation delay of a multi-level circuit equals the number of gate levels multiplied by the per-gate delay (assuming uniform gate delays): $t_{pd} = 3 \times 4 \text{ ns} = 12$ ns. This represents the critical path—the longest signal path from any input through three gates to the output. In practice, different gate types have different delays, and the critical path delay is the sum of individual gate delays along the longest path.

    **Concept Tested:** Propagation Delay in Multi-Level Circuits / Critical Path Analysis

---

#### 7. The SOP expression $F = ACD + ADE + BCD + BDE$ can be reduced through multi-step factoring. What is the fully factored form?

<div class="upper-alpha" markdown>
1. $(A + B)D(C + E)$
2. $D(AC + AE + BC + BE)$
3. $(A + B)(CD + DE)$
4. $AD(C + E) + BD(C + E)$
</div>

??? question "Show Answer"
    The correct answer is **A**. Factoring proceeds in steps: first, pair terms sharing common factors: $F = AD(C + E) + BD(C + E)$. This is option D—a partially factored form. Recognizing that $D(C + E)$ is common to both groups: $F = (A + B)D(C + E)$. The fully factored form uses 2 OR gates and 2 AND gates with a maximum fan-in of 2, compared to the original SOP requiring four 3-input AND gates and one 4-input OR gate. The trade-off is 4 levels of logic instead of 2, but with smaller, more practical gates.

    **Concept Tested:** Factoring for Multi-Level Optimization

---

#### 8. Converting an SOP expression to NOR-only form (cross conversion) is significantly less efficient than converting the same SOP to NAND-only form. What is the fundamental reason?

<div class="upper-alpha" markdown>
1. NOR gates have inherently higher propagation delay than NAND gates in all technologies
2. The AND-OR structure does not naturally align with NOR-NOR; each product term must be restructured using De Morgan's theorem, requiring extra gate levels and inverters
3. NOR gates cannot implement the NOT function needed for complemented variables
4. SOP expressions always contain more terms than equivalent POS expressions
</div>

??? question "Show Answer"
    The correct answer is **B**. The NAND-NAND conversion is "natural" for SOP because the AND-OR structure maps directly to NAND-NAND through double inversion—the paired inversions cancel perfectly. For NOR-NOR (cross conversion), each AND product term $AB$ must be restructured as $\overline{\overline{A} + \overline{B}}$ using De Morgan's theorem, adding an extra NOR level plus input inverters. The practical design guideline is: convert SOP to NAND-NAND, or first convert to POS form before implementing with NOR gates.

    **Concept Tested:** Mixed Gate Conversions / De Morgan's Theorem in Gate Conversion

---

#### 9. During ASIC technology mapping, the optimized Boolean network is first decomposed into a network of 2-input NAND gates and inverters before matching against library cells. Why is this decomposition step performed?

<div class="upper-alpha" markdown>
1. NAND2 and INV are the only cells available in standard cell libraries
2. A uniform primitive representation enables systematic pattern matching against all library cells, from simple inverters to complex AOI/OAI gates
3. The decomposed network always uses fewer transistors than any other representation
4. It eliminates all redundant logic before the covering algorithm runs
</div>

??? question "Show Answer"
    The correct answer is **B**. Technology mapping works by finding portions of the circuit that match available library cells. Decomposing the entire network into the smallest primitives (NAND2 + INV) creates a uniform "canvas" where every possible library cell—including complex gates like AOI22, OAI21, and MUX2—can be identified as a pattern of adjacent NAND2/INV nodes. Without this common decomposition, the matching algorithm would need to handle arbitrary gate types directly, making systematic pattern matching impractical. The covering algorithm then selects the minimum-cost set of library cells.

    **Concept Tested:** Technology Mapping

---

#### 10. A designer's minimized two-level SOP expression requires 5-input AND gates, but the target standard cell library only offers gates with a maximum of 4 inputs. Which approach best addresses this constraint?

<div class="upper-alpha" markdown>
1. Expand the library to include 5-input gates, since the two-level form is always the most efficient
2. Implement the function using a ROM lookup table to avoid gate-level fan-in constraints entirely
3. Convert to POS form, which is guaranteed to require smaller gates than the SOP form
4. Factor the expression into a multi-level form with gates no larger than 4 inputs, accepting the added propagation delay as a necessary trade-off for practical realizability
</div>

??? question "Show Answer"
    The correct answer is **D**. When fan-in constraints prevent a two-level implementation, multi-level factoring decomposes the large gates into smaller ones that fit the available library. For example, a 5-input AND $ABCDE$ becomes a cascade: $G = ABC$, $F = G \cdot DE$—two 3-input and 2-input AND gates at three levels instead of one 5-input gate at two levels. The trade-off is increased propagation delay (more levels) for practical realizability. Options A and B avoid the core design problem, and option C provides no guarantee of smaller gates.

    **Concept Tested:** Fan-in Constraints / Level Reduction Techniques

---

## Answers Summary

| Question | Answer | Concept |
|----------|--------|---------|
| 1 | B | Universal Gates (NAND and NOR) |
| 2 | C | AOI and OAI Complex Gates |
| 3 | A | AND-OR to NAND-NAND Conversion |
| 4 | C | Two-Level vs Multi-Level Circuits |
| 5 | D | Bubble Pushing / NAND Conversion |
| 6 | C | Critical Path / Propagation Delay |
| 7 | A | Factoring for Multi-Level Optimization |
| 8 | B | Mixed Gate Conversions |
| 9 | B | Technology Mapping |
| 10 | D | Fan-in Constraints / Level Reduction |
