---
title: Unit 7 Quiz - Multi-Level Gate Circuits
description: Test your understanding of universal gates, NAND/NOR conversions, bubble pushing, multi-level optimization, and technology mapping
hide:
  - toc
---

<div class="problems-styled" markdown>

<h1 style="color: #5A3EED !important; border-bottom: 3px solid #5A3EED; padding-bottom: 0.4rem; font-weight: 800; margin-bottom: 1.5rem;">Quiz: Multi-Level Gate Circuits</h1>

<p style="color: #555; line-height: 1.85; font-size: 1.05rem; margin-bottom: 2rem;">
Test your understanding of universal gates, circuit conversions, multi-level analysis, propagation delay, factoring techniques, and technology mapping with these questions.
</p>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 1</p>

<p style="color: #333; line-height: 1.75;">Which property makes NAND and NOR gates classified as "universal" gates?</p>

<div class="upper-alpha" markdown>
1. They have the lowest propagation delay among all logic gate types
2. Any Boolean function can be implemented using only that single gate type
3. They require the fewest transistors to manufacture in CMOS technology
4. They can drive an unlimited number of gate inputs without signal degradation
</div>

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: B</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">A gate is universal (functionally complete) if it can implement NOT, AND, and OR—the three operations from which any Boolean function can be constructed. NAND implements NOT by tying both inputs together, AND by cascading two NANDs, and OR by inverting each input before a NAND. NOR achieves universality through the dual construction. This property has profound practical significance: an entire IC can be fabricated using only one type of transistor configuration.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Universal Gates (NAND and NOR)</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 2</p>

<p style="color: #333; line-height: 1.75;">An AOI22 complex gate implements which Boolean function?</p>

<div class="upper-alpha" markdown>
1. $(A+B)(C+D)$
2. $\overline{(A+B)(C+D)}$
3. $\overline{AB + CD}$
4. $AB + CD$
</div>

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: C</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">An AOI (AND-OR-Invert) gate performs AND operations on groups of inputs, ORs the results together, then inverts the output. The naming convention "AOI22" indicates two groups of two inputs each. So AOI22 computes: AND group 1 ($AB$), AND group 2 ($CD$), OR them ($AB + CD$), then invert: $\overline{AB + CD}$. The dual OAI22 would compute $\overline{(A+B)(C+D)}$. AOI/OAI complex gates implement two levels of logic in a single CMOS structure with approximately one gate delay.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> AOI and OAI Complex Gates</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 3</p>

<p style="color: #333; line-height: 1.75;">To convert a two-level SOP (AND-OR) circuit to NAND-only form using the double-inversion method, what is the conversion rule?</p>

<div class="upper-alpha" markdown>
1. Replace all AND gates and the OR gate with NAND gates
2. Replace AND gates with NOR gates and the OR gate with a NAND gate
3. Add an inverter to every gate output in the original circuit
4. Replace only the OR gate with a NAND gate and keep the AND gates unchanged
</div>

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: A</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">The AND-OR to NAND-NAND conversion works by applying double inversion: $F = AB + CD = \overline{\overline{AB + CD}} = \overline{\overline{AB} \cdot \overline{CD}}$. The first-level NAND gates produce $\overline{AB}$ and $\overline{CD}$, and the second-level NAND gate computes $\overline{\overline{AB} \cdot \overline{CD}} = AB + CD$. The inversions from the first-level NAND outputs and the second-level NAND inputs cancel in pairs, so simply replacing all gates with NAND gates produces the correct result for standard two-level SOP forms.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> AND-OR to NAND-NAND Conversion</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 4</p>

<p style="color: #333; line-height: 1.75;">What is the primary practical advantage of multi-level circuits compared to two-level (SOP/POS) implementations?</p>

<div class="upper-alpha" markdown>
1. Lower propagation delay from input to output
2. Simpler Boolean expressions with fewer literals
3. Reduced gate count and lower fan-in requirements, enabling implementation with standard gate sizes
4. Complete elimination of all glitches and timing hazards
</div>

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: C</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">While two-level circuits (AND-OR or OR-AND) provide minimum propagation delay, they often require gates with many inputs (high fan-in) and a large total gate count—especially for complex functions. Multi-level circuits introduce additional gate delays but significantly reduce both gate count (through sharing common sub-expressions) and fan-in requirements (by breaking large gates into smaller ones). Since standard cell libraries typically offer gates with 2–4 inputs, multi-level circuits are essential for practical implementation.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Two-Level vs Multi-Level Circuits</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 5</p>

<p style="color: #333; line-height: 1.75;">When converting $F = A + BC$ to NAND-only form, the single literal $A$ requires what additional element at the input of the final NAND gate?</p>

<div class="upper-alpha" markdown>
1. Two cascaded NAND gates to double-invert $A$
2. A NOR gate to complement $A$ before the final NAND gate
3. No additional element—$A$ connects directly to the final NAND gate
4. A NAND gate configured as an inverter to complement $A$, since the final NAND gate expects complemented inputs from the first level
</div>

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: D</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">Applying double inversion: $F = A + BC = \overline{\overline{A} \cdot \overline{BC}}$. The NAND gate for $BC$ produces $\overline{BC}$, which feeds the final NAND gate. But the single literal $A$ must also be complemented to $\overline{A}$ before entering the final NAND gate. This complementation requires a NAND gate configured as an inverter (both inputs tied to $A$). In bubble-pushing terms, the bubble on $A$'s input to the final NAND is unpaired and must be implemented as an explicit inverter.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Bubble Pushing Technique / NAND Conversion</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 6</p>

<p style="color: #333; line-height: 1.75;">A three-level NAND circuit has a propagation delay of 4 ns per gate. What is the worst-case propagation delay from any primary input to the output?</p>

<div class="upper-alpha" markdown>
1. 4 ns
2. 8 ns
3. 12 ns
4. 16 ns
</div>

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: C</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">The worst-case propagation delay of a multi-level circuit equals the number of gate levels multiplied by the per-gate delay (assuming uniform gate delays): $t_{pd} = 3 \times 4 \text{ ns} = 12$ ns. This represents the critical path—the longest signal path from any input through three gates to the output. In practice, different gate types have different delays, and the critical path delay is the sum of individual gate delays along the longest path.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Propagation Delay in Multi-Level Circuits / Critical Path Analysis</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 7</p>

<p style="color: #333; line-height: 1.75;">The SOP expression $F = ACD + ADE + BCD + BDE$ can be reduced through multi-step factoring. What is the fully factored form?</p>

<div class="upper-alpha" markdown>
1. $(A + B)D(C + E)$
2. $D(AC + AE + BC + BE)$
3. $(A + B)(CD + DE)$
4. $AD(C + E) + BD(C + E)$
</div>

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: A</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">Factoring proceeds in steps: first, pair terms sharing common factors: $F = AD(C + E) + BD(C + E)$. This is option D—a partially factored form. Recognizing that $D(C + E)$ is common to both groups: $F = (A + B)D(C + E)$. The fully factored form uses 2 OR gates and 2 AND gates with a maximum fan-in of 2, compared to the original SOP requiring four 3-input AND gates and one 4-input OR gate. The trade-off is 4 levels of logic instead of 2, but with smaller, more practical gates.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Factoring for Multi-Level Optimization</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 8</p>

<p style="color: #333; line-height: 1.75;">Converting an SOP expression to NOR-only form (cross conversion) is significantly less efficient than converting the same SOP to NAND-only form. What is the fundamental reason?</p>

<div class="upper-alpha" markdown>
1. NOR gates have inherently higher propagation delay than NAND gates in all technologies
2. The AND-OR structure does not naturally align with NOR-NOR; each product term must be restructured using De Morgan's theorem, requiring extra gate levels and inverters
3. NOR gates cannot implement the NOT function needed for complemented variables
4. SOP expressions always contain more terms than equivalent POS expressions
</div>

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: B</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">The NAND-NAND conversion is "natural" for SOP because the AND-OR structure maps directly to NAND-NAND through double inversion—the paired inversions cancel perfectly. For NOR-NOR (cross conversion), each AND product term $AB$ must be restructured as $\overline{\overline{A} + \overline{B}}$ using De Morgan's theorem, adding an extra NOR level plus input inverters. The practical design guideline is: convert SOP to NAND-NAND, or first convert to POS form before implementing with NOR gates.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Mixed Gate Conversions / De Morgan's Theorem in Gate Conversion</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 9</p>

<p style="color: #333; line-height: 1.75;">During ASIC technology mapping, the optimized Boolean network is first decomposed into a network of 2-input NAND gates and inverters before matching against library cells. Why is this decomposition step performed?</p>

<div class="upper-alpha" markdown>
1. NAND2 and INV are the only cells available in standard cell libraries
2. A uniform primitive representation enables systematic pattern matching against all library cells, from simple inverters to complex AOI/OAI gates
3. The decomposed network always uses fewer transistors than any other representation
4. It eliminates all redundant logic before the covering algorithm runs
</div>

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: B</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">Technology mapping works by finding portions of the circuit that match available library cells. Decomposing the entire network into the smallest primitives (NAND2 + INV) creates a uniform "canvas" where every possible library cell—including complex gates like AOI22, OAI21, and MUX2—can be identified as a pattern of adjacent NAND2/INV nodes. Without this common decomposition, the matching algorithm would need to handle arbitrary gate types directly, making systematic pattern matching impractical. The covering algorithm then selects the minimum-cost set of library cells.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Technology Mapping</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 10</p>

<p style="color: #333; line-height: 1.75;">A designer's minimized two-level SOP expression requires 5-input AND gates, but the target standard cell library only offers gates with a maximum of 4 inputs. Which approach best addresses this constraint?</p>

<div class="upper-alpha" markdown>
1. Expand the library to include 5-input gates, since the two-level form is always the most efficient
2. Implement the function using a ROM lookup table to avoid gate-level fan-in constraints entirely
3. Convert to POS form, which is guaranteed to require smaller gates than the SOP form
4. Factor the expression into a multi-level form with gates no larger than 4 inputs, accepting the added propagation delay as a necessary trade-off for practical realizability
</div>

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: D</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">When fan-in constraints prevent a two-level implementation, multi-level factoring decomposes the large gates into smaller ones that fit the available library. For example, a 5-input AND $ABCDE$ becomes a cascade: $G = ABC$, $F = G \cdot DE$—two 3-input and 2-input AND gates at three levels instead of one 5-input gate at two levels. The trade-off is increased propagation delay (more levels) for practical realizability. Options A and B avoid the core design problem, and option C provides no guarantee of smaller gates.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Fan-in Constraints / Level Reduction Techniques</p>
</div>
</details>

</div>

---

<div style="background: #f5f0ff; border: 2px solid #d1c4e9; border-radius: 12px; padding: 20px 24px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #5A3EED; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 12px;">Answers Summary</p>

| Question | Answer | Concept |
|:--------:|:------:|:--------|
| 1 | **B** | Universal Gates (NAND and NOR) |
| 2 | **C** | AOI and OAI Complex Gates |
| 3 | **A** | AND-OR to NAND-NAND Conversion |
| 4 | **C** | Two-Level vs Multi-Level Circuits |
| 5 | **D** | Bubble Pushing / NAND Conversion |
| 6 | **C** | Critical Path / Propagation Delay |
| 7 | **A** | Factoring for Multi-Level Optimization |
| 8 | **B** | Mixed Gate Conversions |
| 9 | **B** | Technology Mapping |
| 10 | **D** | Fan-in Constraints / Level Reduction |

</div>

</div>
