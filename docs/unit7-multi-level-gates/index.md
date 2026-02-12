---
title: Multi-Level Gate Circuits
description: NAND/NOR implementations, gate conversions, and multi-level circuit optimization
generated_by: claude skill chapter-content-generator
date: 2026-02-05 14:30:00
version: 0.03
---

# Unit 7: Multi-Level Gate Circuits

<details class="video-overview">
<summary><strong>Unit Overview</strong> (click to expand)</summary>

Welcome to Unit 7, where we move from the idealized world of AND-OR circuits into the practical reality of how digital logic is actually built. In real integrated circuits, the gates of choice are NAND and NOR. Understanding why — and learning how to convert your designs accordingly — is the focus of this unit.

NAND and NOR gates are called universal gates because each one can implement any Boolean function. You can build AND, OR, and NOT from NANDs alone, or from NORs alone. This universality matters because NAND and NOR gates are cheaper, faster, and smaller at the transistor level.

A two-level SOP circuit transforms directly into a NAND-NAND circuit. The trick is that by De Morgan's theorem, the inversions cancel at the internal connections. The same logic applies to POS expressions, which convert to NOR-NOR circuits.

For more complex, multi-level circuits, we use bubble pushing. The idea is to push inversion bubbles through the circuit, converting each gate's type as you go, until every gate is either a NAND or a NOR. You start at the output and work backward, applying De Morgan's theorem at each level.

Multi-level circuits introduce additional propagation delay because signals pass through more gate stages. The longest path from input to output — the critical path — determines maximum operating speed. Designers constantly balance gate count, literal count, and delay.

**Key Takeaways**

1. NAND and NOR are universal gates — each can implement any Boolean function — and they are the preferred building blocks in real integrated circuits due to their efficiency at the transistor level.
2. SOP expressions convert to NAND-NAND circuits and POS expressions convert to NOR-NOR circuits through systematic application of De Morgan's theorem and the bubble pushing technique.
3. Multi-level circuit design involves balancing gate count, literal count, and propagation delay along the critical path to meet area, power, and speed constraints.

</details>

## Summary

This unit explores the implementation of Boolean functions using multi-level gate circuits, with particular emphasis on NAND and NOR gate implementations. While two-level AND-OR or OR-AND circuits provide straightforward realizations of Boolean expressions, practical considerations often favor implementations using only NAND gates or only NOR gates due to their universal nature and manufacturing advantages. Students will learn systematic methods for converting SOP and POS expressions to NAND-only and NOR-only implementations, analyze propagation delays in multi-level circuits, and optimize circuits for gate count, literal count, and timing performance.

## Concepts Covered

1. Two-Level vs Multi-Level Circuits
2. Universal Gates (NAND and NOR)
3. NAND Gate Universality Proof
4. NOR Gate Universality Proof
5. AND-OR to NAND-NAND Conversion
6. OR-AND to NOR-NOR Conversion
7. Mixed Gate Conversions
8. De Morgan's Theorem in Gate Conversion
9. Bubble Pushing Technique
10. Multi-Level Circuit Analysis
11. Fan-in and Fan-out Constraints
12. Gate Loading Effects
13. Propagation Delay in Multi-Level Circuits
14. Critical Path Analysis
15. Level Reduction Techniques
16. Gate Count Optimization
17. Literal Count vs Gate Count Trade-offs
18. Factoring for Multi-Level Optimization
19. Decomposition Techniques
20. Technology Mapping
21. AOI and OAI Complex Gates
22. Wired Logic Implementations
23. Transmission Gate Circuits
24. Multi-Level Synthesis Tools

## Prerequisites

Before studying this unit, students should be familiar with:

- Boolean algebra fundamentals (Unit 2)
- Basic logic gates and their truth tables (Unit 2)
- SOP and POS forms (Unit 4)
- K-map and QM simplification methods (Units 5-6)
- De Morgan's theorems (Unit 2)

---

## 7.1 Introduction to Multi-Level Circuits

In previous units, we focused primarily on **two-level circuit implementations**—AND-OR circuits for Sum of Products (SOP) expressions and OR-AND circuits for Product of Sums (POS) expressions. These two-level circuits offer the minimum propagation delay since signals pass through only two gates from input to output. However, two-level implementations can demand gates with impractically many inputs and a large overall gate count, especially for complex functions with many product or sum terms.

**Multi-level circuits** use more than two levels of logic gates between inputs and outputs. Although they introduce additional gate delays, multi-level circuits provide significant practical advantages that make them the preferred choice in real integrated circuit design.

| Circuit Type | Levels | Delay | Gate Count | Fan-in Required |
|-------------|--------|-------|------------|-----------------|
| Two-level SOP | 2 | Minimum | Often high | Can be high |
| Two-level POS | 2 | Minimum | Often high | Can be high |
| Multi-level | 3+ | Higher | Often lower | Usually lower |

Consider the function $F = ABCDE + ABCDF + ABCDG$. A two-level SOP implementation requires three 5-input AND gates and one 3-input OR gate. After factoring, $F = ABCD(E + F + G)$ uses one 4-input AND gate, one 3-input OR gate, and one 2-input AND gate—three levels but smaller gates.

The key advantages of multi-level circuits include:

- **Reduced gate count** through sharing of common sub-expressions
- **Lower fan-in requirements**, staying within standard gate library constraints
- **Better utilization** of standard cell libraries (most cells have 2–4 inputs)
- **Reduced chip area** in VLSI implementations

!!! info "Practical Consideration"
    Standard logic families (TTL, CMOS) typically provide gates with a maximum of 2, 3, 4, or 8 inputs. Any function requiring higher fan-in must be decomposed into multi-level form, regardless of the delay penalty.

#### Diagram: Two-Level vs Multi-Level Comparison

<iframe src="../sims/multi-level-analyzer/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Two-Level vs Multi-Level Circuit Comparison</summary>
Type: microsim

Purpose: Compare two-level and multi-level implementations of the same Boolean function side by side

Bloom Level: Understand (L2)
Bloom Verb: Compare, contrast

Learning Objective: Students will be able to compare two-level and multi-level implementations of a Boolean function and explain the trade-offs between delay and gate count.

Canvas Layout:
- Top: Function selector dropdown with preset expressions
- Left panel: Two-level implementation showing AND-OR structure
- Right panel: Multi-level (factored) implementation
- Bottom: Comparison metrics table

Visual Elements:
- Gate symbols drawn in standard notation
- Wire connections with signal values shown
- Input toggle switches shared between both circuits
- Output indicators (LEDs) for both implementations
- Gate count, level count, and fan-in displayed below each circuit
- Signal propagation animation showing delay difference

Interactive Controls:
- Function selector dropdown with 4-5 preset functions
- Toggle input switches to verify both circuits produce identical outputs
- "Show Propagation" button to animate signal flow through both circuits
- Speed slider for animation

Data Visibility Requirements:
- Gate count for each implementation
- Maximum fan-in for each implementation
- Number of levels for each implementation
- Total propagation delay (in gate delays) for each implementation
- Side-by-side truth table verification

Default Parameters:
- Function: F = ABCD + ABCE + ABCF
- All inputs initially 0

Behavior:
- Both circuits update simultaneously when inputs toggle
- Propagation animation highlights the critical path
- Metrics table updates when function changes
- Output indicators show matching results

Instructional Rationale: Side-by-side comparison with identical inputs and outputs demonstrates that multi-level circuits implement the same function while using fewer and smaller gates, reinforcing the concept of functional equivalence with different implementations.

Implementation: p5.js with responsive canvas
</details>

---

## 7.2 Universal Gates

A gate is called **universal** (or functionally complete) if any Boolean function can be implemented using only that gate type. Both the NAND gate and the NOR gate are universal. This property has profound practical significance: an entire integrated circuit can be fabricated using only one type of transistor configuration, simplifying manufacturing and reducing cost.

### 7.2.1 NAND Gate Universality Proof

To prove that the NAND gate is universal, we must show it can implement the three basic operations—NOT, AND, and OR—since any Boolean function can be expressed using these operations.

**NOT from NAND:** Connect both inputs of a NAND gate to the same signal $A$:

$$\overline{A \cdot A} = \overline{A}$$

**AND from NAND:** Cascade two NAND gates. The first computes $\overline{AB}$; the second inverts it:

$$\overline{\overline{A \cdot B}} = A \cdot B$$

**OR from NAND:** First invert each input using NAND-as-inverter, then NAND the results. By De Morgan's theorem:

$$\overline{\overline{A} \cdot \overline{B}} = A + B$$

| Operation | NAND Implementation | Gates Required |
|-----------|---------------------|----------------|
| NOT $A$ | $A \text{ NAND } A$ | 1 |
| $A \cdot B$ | $(A \text{ NAND } B) \text{ NAND } (A \text{ NAND } B)$ | 2 |
| $A + B$ | $(A \text{ NAND } A) \text{ NAND } (B \text{ NAND } B)$ | 3 |

### 7.2.2 NOR Gate Universality Proof

The NOR gate universality proof follows a dual structure. We demonstrate that NOT, OR, and AND can all be built from NOR gates alone.

**NOT from NOR:** Connect both inputs of a NOR gate to the same signal $A$:

$$\overline{A + A} = \overline{A}$$

**OR from NOR:** Cascade two NOR gates. The first computes $\overline{A+B}$; the second inverts it:

$$\overline{\overline{A + B}} = A + B$$

**AND from NOR:** First invert each input using NOR-as-inverter, then NOR the results. By De Morgan's theorem:

$$\overline{\overline{A} + \overline{B}} = A \cdot B$$

| Operation | NOR Implementation | Gates Required |
|-----------|-------------------|----------------|
| NOT $A$ | $A \text{ NOR } A$ | 1 |
| $A + B$ | $(A \text{ NOR } B) \text{ NOR } (A \text{ NOR } B)$ | 2 |
| $A \cdot B$ | $(A \text{ NOR } A) \text{ NOR } (B \text{ NOR } B)$ | 3 |

Notice the duality: NAND implements AND directly (2 gates) and OR with more effort (3 gates), while NOR implements OR directly (2 gates) and AND with more effort (3 gates). This duality guides the choice of universal gate based on the dominant operation in a given function.

#### Diagram: Universal Gate Implementations

<iframe src="../sims/universal-gate-simulator/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Universal Gate Circuit Diagrams</summary>
Type: microsim

Purpose: Demonstrate how NAND and NOR gates implement all basic Boolean operations

Bloom Level: Understand (L2)
Bloom Verb: Explain, demonstrate

Learning Objective: Students will be able to explain how NAND and NOR gates achieve universality by implementing NOT, AND, and OR operations.

Canvas Layout:
- Top: Gate type selector (NAND or NOR)
- Left column: Operation selector (NOT, AND, OR)
- Center: Circuit diagram showing the implementation
- Right: Truth table verification

Visual Elements:
- Gate symbols using standard notation
- Input toggles for A and B
- Wire connections with signal values displayed at each node
- Color coding: NAND gates in blue, NOR gates in green
- Output LED indicator
- Equivalent Boolean expression displayed

Interactive Controls:
- Toggle between NAND and NOR universal gate
- Select operation to implement (NOT, AND, OR)
- Toggle input A and input B
- "Verify All" button to cycle through all input combinations

Data Visibility Requirements:
- Signal values at every wire junction
- Gate count used for each implementation
- Boolean expression being implemented
- Complete truth table with current row highlighted

Default Parameters:
- Gate type: NAND
- Operation: AND
- Inputs: A=0, B=0

Behavior:
- Instant visual feedback when inputs toggle
- Signal values propagate through gates with brief animation
- Truth table row highlights to match current inputs
- Switching gate type redraws the circuit

Instructional Rationale: Interactive exploration with visible signal values at every node lets students trace the logic and understand how inversions combine through De Morgan's theorem to produce each basic operation.

Implementation: p5.js with responsive canvas
</details>

---

## 7.3 AND-OR to NAND-NAND Conversion

The most common conversion in digital design transforms a two-level AND-OR (SOP) circuit into an equivalent NAND-only implementation. This conversion is direct and elegant, relying on the double inversion principle and De Morgan's theorem.

### Conversion Procedure

Starting with an SOP expression, apply these steps:

1. **Write the SOP expression:** $F = AB + CD$
2. **Apply double inversion** (which does not change the function): $F = \overline{\overline{AB + CD}}$
3. **Apply De Morgan's theorem** to the inner complement: $F = \overline{\overline{AB} \cdot \overline{CD}}$
4. **Recognize NAND operations:** Each $\overline{XY}$ is a NAND, and the outer $\overline{X \cdot Y}$ is also a NAND

The result: $F = (A \text{ NAND } B) \text{ NAND } (C \text{ NAND } D)$

The general rule is remarkably simple: **replace every AND gate and the OR gate with NAND gates.** No additional inverters are needed for a standard two-level SOP form.

This works because the first-level NAND gates each produce the complement of what AND gates would produce, and by De Morgan's theorem, a NAND gate receiving complemented inputs performs the equivalent of OR on the original (uncomplemented) values.

**Worked Example:** Convert $F = XY + X'Z + YZ$ to NAND-only form.

$$F = XY + X'Z + YZ$$
$$= \overline{\overline{XY + X'Z + YZ}}$$
$$= \overline{\overline{XY} \cdot \overline{X'Z} \cdot \overline{YZ}}$$

This requires three first-level NAND gates (for $XY$, $X'Z$, and $YZ$) feeding one second-level NAND gate. Note that $X'$ is still needed—the complement of $X$ must be provided by an additional NAND inverter.

### Handling Complemented Inputs and Single Literals

Two special cases require attention:

- **Complemented variables** (e.g., $\overline{A}$): Use a NAND gate configured as an inverter (both inputs tied to $A$)
- **Single literal terms** in the SOP: A product term with only one literal (e.g., $F = A + BC$) has the term $A$ passed through a NAND inverter before the final NAND gate, since the final NAND expects complemented inputs

For $F = A + BC$:

$$F = \overline{\overline{A} \cdot \overline{BC}}$$

This requires: one NAND inverter for $A$, one 2-input NAND for $BC$, and one 2-input NAND for the output.

#### Diagram: AND-OR to NAND-NAND Conversion

<iframe src="../sims/nand-nor-converter/main.html" width="100%" height="530px" scrolling="no"></iframe>

<details markdown="1">
<summary>Step-by-step AND-OR to NAND Conversion</summary>
Type: microsim

Purpose: Animated step-by-step conversion of AND-OR circuits to NAND-only implementations

Bloom Level: Apply (L3)
Bloom Verb: Apply, execute, implement

Learning Objective: Students will be able to convert any SOP expression to a NAND-only implementation by applying the double inversion method systematically.

Canvas Layout:
- Top: Expression input field and preset selector
- Center: Circuit diagram area showing conversion stages
- Bottom: Step controls and Boolean expression display

Visual Elements:
- Gate symbols transforming through stages
- Inversion bubbles appearing and canceling
- Wire connections with signal propagation
- Step indicator (1 of 4, 2 of 4, etc.)
- Boolean expression shown at each stage

Interactive Controls:
- Preset expression dropdown (5 common SOP expressions)
- Custom expression input field
- "Next Step" and "Previous Step" buttons
- "Auto Play" button with speed control
- "Reset" button
- Input toggles to verify equivalence at each stage

Data Visibility Requirements:
- Stage 1: Original AND-OR circuit with expression
- Stage 2: Double inversion applied (bubbles shown at all gate outputs and inputs)
- Stage 3: Bubble cancellation highlighted
- Stage 4: Final NAND-only circuit with verified expression

Default Parameters:
- Expression: F = AB + CD
- Stage: 1

Behavior:
- Smooth animation between stages
- Bubbles appear/disappear with visual emphasis
- Gate shapes morph when type changes
- Expression updates at each stage
- Input toggles verify output matches at every stage

Instructional Rationale: Step-by-step visualization with concrete expressions demystifies the conversion process, allowing students to see exactly where each inversion appears and cancels.

Implementation: p5.js with animation timeline
</details>

---

## 7.4 OR-AND to NOR-NOR Conversion

Converting a two-level OR-AND (POS) circuit to an equivalent NOR-only implementation is the dual of the NAND-NAND conversion. The procedure mirrors the AND-OR conversion but operates on sum terms instead of product terms.

### Conversion Procedure

1. **Write the POS expression:** $F = (A+B)(C+D)$
2. **Apply double inversion:** $F = \overline{\overline{(A+B)(C+D)}}$
3. **Apply De Morgan's theorem:** $F = \overline{\overline{A+B} + \overline{C+D}}$
4. **Recognize NOR operations:** Each $\overline{X+Y}$ is a NOR, and the outer $\overline{X + Y}$ is also a NOR

The result: $F = (A \text{ NOR } B) \text{ NOR } (C \text{ NOR } D)$

The general rule: **replace every OR gate and the AND gate with NOR gates.**

**Worked Example:** Convert $F = (A+B)(A'+C)(B+C')$ to NOR-only form.

$$F = (A+B)(A'+C)(B+C')$$
$$= \overline{\overline{(A+B)(A'+C)(B+C')}}$$
$$= \overline{\overline{A+B} + \overline{A'+C} + \overline{B+C'}}$$

Three first-level NOR gates feed one second-level NOR gate. The complemented variables $A'$ and $C'$ are generated using NOR-as-inverter gates.

### Conversion Summary Table

| Original Form | Target Form | Conversion Rule | Added Inverters |
|--------------|-------------|-----------------|-----------------|
| SOP (AND-OR) | NAND-NAND | Replace all gates with NAND | For single-literal terms |
| POS (OR-AND) | NOR-NOR | Replace all gates with NOR | For single-literal terms |
| SOP (AND-OR) | NOR-NOR | More complex, requires added levels | Multiple |
| POS (OR-AND) | NAND-NAND | More complex, requires added levels | Multiple |

The first two conversions (natural conversions) are straightforward. The latter two (cross conversions) are more involved because the circuit structure does not align naturally with the target gate type.

---

## 7.5 Mixed Gate Conversions

Not all circuits fit neatly into two-level AND-OR or OR-AND structures. **Mixed gate conversions** handle circuits that contain a combination of AND, OR, NAND, NOR, and NOT gates, converting them to use a single gate type.

### Cross Conversion: SOP to NOR-Only

Converting an SOP expression to NOR-only form requires additional levels because the AND-OR structure does not map directly to NOR-NOR. The approach uses De Morgan's theorem to restructure the expression.

For $F = AB + CD$:

1. Apply De Morgan's to each product term: $AB = \overline{\overline{A} + \overline{B}}$
2. Substitute: $F = \overline{\overline{A} + \overline{B}} + \overline{\overline{C} + \overline{D}}$
3. To implement the final OR, apply double inversion: $F = \overline{\overline{\overline{\overline{A} + \overline{B}} + \overline{\overline{C} + \overline{D}}}}$

This requires three levels of NOR gates plus input inverters—significantly more complex than the natural NAND-NAND conversion.

### Cross Conversion: POS to NAND-Only

Similarly, converting a POS expression to NAND-only requires restructuring each sum term using De Morgan's theorem.

For $F = (A+B)(C+D)$:

1. Apply De Morgan's to each sum term: $A+B = \overline{\overline{A} \cdot \overline{B}}$
2. Substitute: $F = \overline{\overline{A} \cdot \overline{B}} \cdot \overline{\overline{C} \cdot \overline{D}}$
3. Apply double inversion for the final AND: $F = \overline{\overline{\overline{\overline{A} \cdot \overline{B}} \cdot \overline{\overline{C} \cdot \overline{D}}}}$

!!! warning "Design Guideline"
    Cross conversions (SOP→NOR or POS→NAND) add extra gate levels and inverters. In practice, it is more efficient to first convert the expression to the form that naturally maps to the target gate type—convert SOP to POS before implementing with NOR gates, or POS to SOP before implementing with NAND gates.

---

## 7.6 De Morgan's Theorem in Gate Conversion

De Morgan's theorems are the mathematical engine behind every gate conversion technique. Understanding how they transform gate types is essential for systematic circuit conversion.

### The Two Forms

**First theorem:** $\overline{A \cdot B} = \overline{A} + \overline{B}$

This means: a NAND gate is equivalent to an OR gate with inverted inputs.

**Second theorem:** $\overline{A + B} = \overline{A} \cdot \overline{B}$

This means: a NOR gate is equivalent to an AND gate with inverted inputs.

### Graphical Interpretation

Each theorem provides two equivalent gate symbols:

| Original Gate | De Morgan Equivalent |
|--------------|---------------------|
| NAND (AND with output bubble) | OR with input bubbles |
| NOR (OR with output bubble) | AND with input bubbles |
| AND (no bubbles) | NOR with input and output bubbles |
| OR (no bubbles) | NAND with input and output bubbles |

These equivalences are the foundation of the bubble pushing technique covered in the next section. When you see a gate with a bubble on its output, you can "push" that bubble to the inputs by changing the gate type (AND ↔ OR), and vice versa.

**Example:** Show that a 3-input NAND is equivalent to a 3-input OR with inverted inputs.

$$\overline{ABC} = \overline{A} + \overline{B} + \overline{C}$$

This follows directly from the generalized form of De Morgan's first theorem. In circuit terms, a 3-input NAND gate with inputs $A$, $B$, $C$ produces the same output as a 3-input OR gate receiving $\overline{A}$, $\overline{B}$, $\overline{C}$.

---

## 7.7 The Bubble Pushing Technique

**Bubble pushing** is a visual method for converting circuits between gate types by systematically moving inversion "bubbles" through a circuit. It provides an intuitive alternative to algebraic manipulation for gate conversion.

### Rules for Bubble Pushing

1. **Move a bubble from output to all inputs** (or vice versa) while changing the gate type (AND ↔ OR)
2. **Paired bubbles cancel:** A bubble on a wire's output meeting a bubble on the connected input results in no inversion
3. **Unpaired bubbles become inverters:** Any bubble that cannot be canceled must be implemented as an explicit inverter at the circuit input

### Step-by-Step Example

Convert the AND-OR circuit for $F = AB + CD$ to NAND-only:

**Step 1:** Start with the AND-OR circuit.

- Gate 1 (AND): inputs $A$, $B$ → output $P_1 = AB$
- Gate 2 (AND): inputs $C$, $D$ → output $P_2 = CD$
- Gate 3 (OR): inputs $P_1$, $P_2$ → output $F = P_1 + P_2$

**Step 2:** Push the OR gate's identity through De Morgan's. Add a bubble to the output of the OR gate and to both of its inputs. The OR with input bubbles becomes a NAND gate. The output bubble becomes an inverter.

But we also add bubbles to the outputs of the AND gates. The AND gates with output bubbles become NAND gates. These output bubbles cancel with the input bubbles of the final gate.

**Step 3:** All bubbles are paired and cancel. The result is three NAND gates with no remaining inversions.

### Extended Example with Single Literal

For $F = A + BC$:

**Step 1:** The OR gate receives single literal $A$ and product $BC$.

**Step 2:** Adding bubbles: the AND gate for $BC$ gets an output bubble (becoming NAND). The OR gate gets input bubbles (becoming NAND). The bubble on input $A$ of the final NAND is unpaired.

**Step 3:** The unpaired bubble on input $A$ requires a NAND inverter: $\overline{A}$ enters the final NAND gate.

Result: NAND($\overline{A}$, NAND($B$, $C$)) = $\overline{\overline{A} \cdot \overline{BC}} = A + BC$

!!! tip "Bubble Pushing Shortcut"
    For two-level conversions, bubble pushing always yields the same result as the algebraic method: simply replace all gates with the target universal gate type, then add inverters for any remaining unpaired bubbles.

#### Diagram: Bubble Pushing Interactive Demo

<iframe src="../sims/bubble-pushing-simulator/main.html" width="100%" height="530px" scrolling="no"></iframe>

<details markdown="1">
<summary>Interactive Bubble Pushing Simulator</summary>
Type: microsim

Purpose: Provide hands-on practice with the bubble pushing technique for gate conversion

Bloom Level: Apply (L3)
Bloom Verb: Apply, implement, solve

Learning Objective: Students will be able to apply bubble pushing rules to convert circuits between different gate types and identify where additional inverters are needed.

Canvas Layout:
- Top: Circuit selector and tool palette
- Center: Interactive circuit diagram workspace
- Bottom: Expression display and verification panel

Visual Elements:
- Standard gate symbols (AND, OR, NAND, NOR)
- Inversion bubbles as small circles on gate terminals
- Wire connections between gates
- Color feedback: green for valid configurations, red for errors
- Paired bubbles highlighted in yellow before cancellation
- Step counter and instruction text

Interactive Controls:
- Circuit preset selector (5 circuits of increasing complexity)
- "Add Bubble" tool: click a gate terminal to add/remove a bubble
- "Push Bubble" tool: click a gate to push output bubble to inputs (or vice versa)
- "Cancel Bubbles" tool: click paired bubbles to cancel them
- "Check Solution" button to verify the conversion
- "Hint" button for guided assistance
- "Reset" button

Data Visibility Requirements:
- Current Boolean expression updates in real time
- Target gate type displayed (NAND-only or NOR-only)
- Number of remaining unpaired bubbles shown
- Gate count comparison (original vs. converted)

Default Parameters:
- Circuit: AND-OR for F = AB + CD
- Target: NAND-only conversion
- Tool: Add Bubble

Behavior:
- Adding a bubble to a gate output and all inputs simultaneously preserves function
- Gate symbols morph when pushed (AND ↔ OR)
- Paired bubbles flash before canceling
- Invalid bubble placements show error feedback
- Solution check compares truth tables

Instructional Rationale: Hands-on bubble manipulation builds intuition for De Morgan's theorem by making the abstract algebraic concept tangible and visual. Students learn through discovery rather than memorization.

Implementation: p5.js with interactive canvas
</details>

---

## 7.8 Multi-Level Circuit Analysis

Analyzing multi-level circuits requires systematically tracing signals through multiple gate layers to derive the output expression and understand timing behavior. This section covers the analytical techniques for evaluating multi-level designs.

### 7.8.1 Deriving the Boolean Expression

To analyze a multi-level circuit:

1. **Label all gate outputs** with intermediate variables ($G_1$, $G_2$, etc.)
2. **Write the expression** for each gate output in terms of its inputs
3. **Substitute** intermediate expressions to obtain the final output in terms of primary inputs
4. **Simplify** the result if desired

**Example:** Analyze a three-level circuit:

- Gate 1 (AND): inputs $A$, $B$ → $G_1 = AB$
- Gate 2 (OR): inputs $C$, $D$ → $G_2 = C + D$
- Gate 3 (AND): inputs $G_1$, $G_2$ → $G_3 = G_1 \cdot G_2 = AB(C+D)$
- Gate 4 (OR): inputs $G_3$, $E$ → $F = G_3 + E = AB(C+D) + E$

Expanding: $F = ABC + ABD + E$

This three-level implementation of $F = ABC + ABD + E$ uses gates with a maximum fan-in of 2, whereas the two-level SOP form requires two 3-input AND gates and one 3-input OR gate.

### 7.8.2 Critical Path and Propagation Delay

The **propagation delay** of a multi-level circuit is determined by the longest path from any input to the output, measured in gate delays. This path is called the **critical path**.

For a circuit with $n$ levels, the worst-case propagation delay is:

$$t_{pd(total)} = \sum_{i=1}^{n} t_{pd(gate_i)}$$

where $t_{pd(gate_i)}$ is the propagation delay of gate $i$ along the critical path.

**Example:** In the circuit above with gates 1→3→4 and gate 2→3→4:

- Path from $A$ or $B$: Gate 1 → Gate 3 → Gate 4 = 3 gate delays
- Path from $C$ or $D$: Gate 2 → Gate 3 → Gate 4 = 3 gate delays
- Path from $E$: Gate 4 = 1 gate delay

The critical path has 3 gate delays. Input $E$ arrives at the output fastest (1 delay), while inputs $A$–$D$ experience the full 3 delays.

| Input | Path | Gate Delays |
|-------|------|-------------|
| $A$ | Gate 1 → Gate 3 → Gate 4 | 3 |
| $B$ | Gate 1 → Gate 3 → Gate 4 | 3 |
| $C$ | Gate 2 → Gate 3 → Gate 4 | 3 |
| $D$ | Gate 2 → Gate 3 → Gate 4 | 3 |
| $E$ | Gate 4 | 1 |

### 7.8.3 Fan-in and Fan-out Constraints

**Fan-in** is the number of inputs to a gate. Exceeding practical fan-in limits leads to:

- Increased gate propagation delay (more transistors in series)
- Reduced noise margins
- Unavailability in standard cell libraries

**Fan-out** is the number of gate inputs driven by a single output. Excessive fan-out causes:

- Increased output transition time due to higher capacitive load
- Potential signal integrity issues
- Need for buffer insertion

| Parameter | Typical CMOS Limit | Effect of Exceeding |
|-----------|-------------------|---------------------|
| Fan-in | 4–8 inputs | Increased delay, decomposition needed |
| Fan-out | 4–10 loads | Increased delay, buffer insertion needed |

### 7.8.4 Gate Loading Effects

**Gate loading** refers to the electrical impact of connecting gate outputs to gate inputs. Each input presents a capacitive load to the driving output. As the number of loads (fan-out) increases, the driving gate must charge and discharge more capacitance, slowing its transition time.

The output delay of a gate increases approximately linearly with fan-out:

$$t_{pd} = t_{pd0} + k \cdot C_{load}$$

where $t_{pd0}$ is the intrinsic delay, $k$ is a technology-dependent constant, and $C_{load}$ is the total load capacitance.

When a signal must drive many inputs, **buffer insertion** restores signal strength. A buffer (two cascaded inverters) adds one gate delay but restores the output drive capability.

#### Diagram: Propagation Delay and Critical Path Analyzer

<details markdown="1">
<summary>Critical Path Analysis Tool</summary>
Type: microsim

Purpose: Visualize propagation delay through multi-level circuits and identify the critical path

Bloom Level: Analyze (L4)
Bloom Verb: Examine, differentiate, distinguish

Learning Objective: Students will be able to identify the critical path in a multi-level circuit and calculate the total propagation delay.

Canvas Layout:
- Top: Circuit selector with 4 preset multi-level circuits
- Center: Circuit diagram with annotated gate delays
- Right: Path analysis panel showing all input-to-output paths
- Bottom: Timing diagram showing signal arrival times

Visual Elements:
- Gate symbols with delay values labeled (e.g., "2ns" per gate)
- Critical path highlighted in red
- Non-critical paths in gray
- Signal arrival time shown at each node
- Timing diagram at bottom showing waveforms for each signal
- Fan-out indicators at each node

Interactive Controls:
- Circuit preset selector
- Click any input to trace all paths from that input to the output
- Toggle "Show All Paths" vs. "Show Critical Path Only"
- Slider to adjust gate delay values
- "Animate Signal Propagation" button

Data Visibility Requirements:
- Gate delay for each gate
- Cumulative delay at each node
- All input-to-output paths listed with total delay
- Critical path clearly identified with total delay value
- Fan-out count at each internal node

Default Parameters:
- Circuit: 4-level NAND implementation
- Gate delay: 2ns per gate
- View: Critical path highlighted

Behavior:
- Clicking an input highlights all paths from that input
- Critical path automatically identified and highlighted in red
- Delay values update when gate delay slider changes
- Animation shows signal propagation with timing

Instructional Rationale: Tracing signal paths with visible delay values develops the analytical skill of identifying critical paths, essential for timing-aware circuit design.

Implementation: p5.js with responsive canvas
</details>

---

## 7.9 Level Reduction Techniques

When a multi-level circuit has too many levels (and therefore too much delay), **level reduction** techniques restructure the circuit to decrease the number of gate levels while potentially increasing gate count or fan-in.

### Flattening

The most direct approach is **flattening**—expanding the multi-level expression back to a two-level SOP or POS form using the distributive law.

**Example:** Reduce $F = A(B(C+D) + E)$ from 4 levels to 2 levels:

$$F = A(BC + BD + E) = ABC + ABD + AE$$

The two-level form requires gates with higher fan-in (3-input AND gates, 3-input OR gate) but achieves minimum delay (2 gate delays).

### Partial Flattening

When full flattening creates impractical fan-in, **partial flattening** expands only select portions of the expression to reduce levels without exceeding fan-in constraints.

**Example:** For a 5-level circuit, reduce to 3 levels by expanding the innermost nesting while keeping outer factoring.

| Technique | Levels After | Gate Count | Fan-in | Delay |
|-----------|-------------|------------|--------|-------|
| Original multi-level | 4 | Low | Low | High |
| Partial flattening | 3 | Medium | Medium | Medium |
| Full flattening | 2 | High | High | Low |

### Algebraic Restructuring

Sometimes an expression can be rewritten in an alternative factored form that uses fewer levels:

$$F = AC + AD + BC + BD + E = (A+B)(C+D) + E$$

The first form requires 3 levels as AND-OR (five 2-input ANDs → one 5-input OR). The second form also requires 3 levels (two 2-input ORs → one 2-input AND → one 2-input OR) but uses smaller gates.

---

## 7.10 Gate Count Optimization

**Gate count optimization** minimizes the total number of gates in a circuit, directly reducing chip area and manufacturing cost. While two-level minimization (K-maps, Quine-McCluskey) minimizes literals within a fixed two-level structure, multi-level optimization explores a broader design space.

### Sharing Common Sub-expressions

The primary mechanism for reducing gate count in multi-level circuits is identifying and sharing common sub-expressions.

**Example:** Consider two output functions:

$$F_1 = AC + AD + BC + BD$$
$$F_2 = AC + AD + E$$

Both share the sub-expression $AC + AD = A(C+D)$. Computing $A(C+D)$ once and sharing it between $F_1$ and $F_2$ saves gates.

$$F_1 = A(C+D) + B(C+D) = (A+B)(C+D)$$
$$F_2 = A(C+D) + E$$

The shared term $C+D$ appears once in the circuit, driving both $F_1$ and $F_2$ computations.

### Literal Count vs Gate Count Trade-offs

Minimizing literal count (the goal of K-maps and QM) does not always minimize gate count, and vice versa. Consider:

$$F = AB + AC + BC \quad \text{(6 literals, 3 AND + 1 OR = 4 gates)}$$
$$F = A(B+C) + BC \quad \text{(5 literals, 1 OR + 2 AND + 1 OR = 4 gates, but 3 levels)}$$
$$F = (A+B)(A+C) \quad \text{(4 literals, 2 OR + 1 AND = 3 gates, 2 levels)}$$

The POS form has the fewest gates (3) and fewest literals (4) but requires knowledge that the consensus term $BC$ is redundant in this context. The optimal choice depends on whether the design priority is delay, area, or power.

| Form | Literals | Gates | Levels | Priority |
|------|----------|-------|--------|----------|
| SOP | 6 | 4 | 2 | Delay |
| Factored | 5 | 4 | 3 | Balance |
| POS | 4 | 3 | 2 | Area |

---

## 7.11 Factoring for Multi-Level Optimization

**Factoring** transforms a two-level expression into a multi-level form by extracting common factors. This technique is the primary tool for reducing gate count and fan-in in practical circuit design.

### Common Factor Extraction

Identify variables or sub-expressions that appear in multiple terms and factor them out:

**Example 1:**

$$F = ABC + ABD + ABE$$
$$= AB(C + D + E)$$

The original requires three 3-input AND gates and one 3-input OR gate (4 gates). The factored form requires one 2-input AND gate ($AB$), one 3-input OR gate ($C+D+E$), and one 2-input AND gate (product of the two) = 3 gates.

**Example 2 (Multi-step factoring):**

$$F = ACD + ADE + BCD + BDE$$
$$= AD(C + E) + BD(C + E) \quad \text{(factor each pair)}$$
$$= (A + B)D(C + E) \quad \text{(factor common } D(C+E) \text{)}$$

| Form | Gates | Max Fan-in | Levels |
|------|-------|-----------|--------|
| Original SOP | 5 (4 AND + 1 OR) | 3 | 2 |
| Single factor | 5 (2 AND + 2 OR + 1 AND) | 2 | 3 |
| Fully factored | 4 (2 OR + 2 AND) | 2 | 4 |

### Decomposition Techniques

**Decomposition** breaks a complex function into simpler subfunctions, each implemented separately. This is particularly useful when:

- The function has too many variables for a single implementation
- Standard cell libraries have limited gate sizes
- Power or area constraints require simpler gates

**Functional decomposition** expresses $F(X_1, ..., X_n)$ as a composition of simpler functions:

$$F(A, B, C, D) = g(A, B, h(C, D))$$

where $h(C, D)$ and $g(A, B, h)$ are each simpler than $F$.

**Example:** $F = AB\overline{C}\overline{D} + \overline{A}BCD + ABCD$

Observing that $CD$ appears as a sub-expression:

Let $h = CD$. Then:

$$F = AB\overline{h} + \overline{A}Bh + ABh = AB\overline{h} + Bh(\overline{A} + A) = AB\overline{h} + Bh = B(A\overline{h} + h)$$

The decomposed form separates the function into a first stage computing $h = CD$ and a second stage computing $F = B(A\overline{h} + h)$.

#### Diagram: Factoring and Decomposition Explorer

<details markdown="1">
<summary>Factoring and Decomposition Explorer</summary>
Type: microsim

Purpose: Interactive tool for exploring how factoring transforms two-level expressions into optimized multi-level forms

Bloom Level: Apply (L3)
Bloom Verb: Apply, solve, demonstrate

Learning Objective: Students will be able to apply factoring techniques to reduce gate count and fan-in in Boolean circuits, and evaluate the resulting trade-offs in delay vs. area.

Canvas Layout:
- Top: Expression input with preset selector
- Left panel: Step-by-step factoring workspace
- Right panel: Circuit visualization showing current form
- Bottom: Metrics comparison table

Visual Elements:
- Expression display with factoring steps highlighted
- Circuit diagram updating as factoring progresses
- Metrics bar chart comparing original vs. factored forms (gate count, fan-in, levels)
- Common sub-expressions highlighted in matching colors
- Undo/redo stack for factoring steps

Interactive Controls:
- Enter custom expression or select from presets
- Click terms to select them for factoring
- "Factor Selected" button to extract common factor
- "Expand" button to reverse a factoring step
- "Compare" button to show original vs. current metrics side by side
- Difficulty presets (simple 3-variable to complex 6-variable)

Data Visibility Requirements:
- Gate count for current form
- Maximum fan-in for current form
- Number of levels for current form
- Literal count for current form
- Comparison metrics: original vs. factored

Default Parameters:
- Expression: F = ACD + ADE + BCD + BDE
- Display: original two-level form

Behavior:
- Circuit diagram redraws after each factoring step
- Metrics update in real time
- Multiple valid factoring paths accepted
- Color-coded terms highlight common factors
- Undo allows exploring different factoring strategies

Instructional Rationale: Allowing students to choose which terms to factor and immediately see the circuit impact builds understanding of the trade-offs involved in multi-level optimization.

Implementation: p5.js with DOM elements for expression input
</details>

---

## 7.12 AOI and OAI Complex Gates

CMOS technology enables the efficient implementation of **AND-OR-Invert (AOI)** and **OR-AND-Invert (OAI)** complex gates. These gates implement multi-level functions within a single gate structure, achieving the logic of two gate levels with the delay of approximately one gate.

### AOI Gates

An AOI gate performs AND operations on groups of inputs, ORs the results together, then inverts the output. The naming convention indicates the group sizes.

**AOI21:** Two inputs ANDed, one separate input, then OR-Invert:

$$F = \overline{AB + C}$$

**AOI22:** Two groups of two inputs each, then OR-Invert:

$$F = \overline{AB + CD}$$

**AOI221:** Two groups of two and one single input, then OR-Invert:

$$F = \overline{AB + CD + E}$$

### OAI Gates

An OAI gate performs OR operations on groups, ANDs the results, then inverts.

**OAI21:** Two inputs ORed, one separate input, then AND-Invert:

$$F = \overline{(A+B) \cdot C}$$

**OAI22:** Two groups of two inputs, then AND-Invert:

$$F = \overline{(A+B)(C+D)}$$

### Advantages of Complex Gates

| Feature | Discrete Gates | AOI/OAI Complex Gate |
|---------|---------------|---------------------|
| Transistor count | Higher | Lower (shared structures) |
| Propagation delay | 2 gate delays | ~1 gate delay |
| Power consumption | Higher (more transitions) | Lower |
| Chip area | Larger | Smaller |

Complex gates are fundamental building blocks in standard cell libraries. Logic synthesis tools automatically identify opportunities to use AOI and OAI cells during technology mapping.

**Example:** Implement $F = \overline{AB + CD}$ using:

- Discrete gates: 2 AND gates + 1 OR gate + 1 NOT gate = 4 gates, 3 levels
- AOI22: 1 complex gate, 1 level

#### Diagram: AOI and OAI Gate Structures

<details markdown="1">
<summary>AOI/OAI Gate Symbol and Function Reference</summary>
Type: infographic

Purpose: Visual reference showing AOI and OAI gate symbols, their Boolean expressions, and transistor-level structure

Bloom Level: Remember (L1)
Bloom Verb: Identify, recognize, name

Learning Objective: Students will be able to identify AOI and OAI gate types from their symbols and recall their corresponding Boolean expressions.

Layout:
- 2×4 grid showing common complex gates
- Top row: AOI21, AOI22, AOI211, AOI221
- Bottom row: OAI21, OAI22, OAI211, OAI221

For each gate cell:
- Gate symbol (block diagram with internal AND/OR structure)
- Boolean expression
- Input labels (A, B, C, D as applicable)
- Output label F
- Transistor count

Color coding:
- AND sections: blue
- OR sections: green
- Inversion bubble: red

Interactive Elements:
- Hover over any gate to see enlarged view with expression
- Click to see truth table for that gate
- Toggle between logic symbol and transistor schematic views

Responsive: Adapts from 4-column to 2-column on narrow screens

Implementation: HTML/CSS/JavaScript with SVG gate symbols
</details>

---

## 7.13 Wired Logic Implementations

**Wired logic** exploits the electrical properties of certain gate output types to implement logic functions without additional gates. When multiple gate outputs are connected together, the resulting logic depends on the output driver technology.

### Open-Collector/Open-Drain Outputs

In open-collector (TTL) or open-drain (CMOS) configurations, outputs can be connected together with a shared pull-up resistor. The combined output performs a **wired-AND** function:

$$F = G_1 \cdot G_2 \cdot G_3$$

where $G_1$, $G_2$, $G_3$ are the individual gate outputs. The output is LOW (0) if any gate pulls it low; it is HIGH (1) only if all gates are in the high-impedance state.

### Wired-AND with NAND Gates

Connecting the open-collector outputs of NAND gates creates powerful composite functions. If Gate 1 outputs $\overline{AB}$ and Gate 2 outputs $\overline{CD}$, the wired-AND produces:

$$F = \overline{AB} \cdot \overline{CD} = \overline{AB + CD}$$

This implements an AND-OR-Invert function without a separate OR gate—effectively a "free" AOI gate using only the wiring and a pull-up resistor.

### Limitations of Wired Logic

- **Speed:** Pull-up resistor creates an RC time constant that slows transitions from LOW to HIGH
- **Power:** Static power dissipation when outputs pull against the resistor
- **Fan-out:** Limited by resistor value and electrical characteristics
- **Noise margin:** Reduced compared to active gate outputs
- **Testing:** Wired connections are harder to test and debug

| Wired Configuration | Function | Output Technology Required |
|--------------------|----------|---------------------------|
| Wired-AND | Product of outputs | Open-collector/open-drain |
| Wired-OR | Sum of outputs | Emitter-coupled logic (ECL) |

!!! note "Modern Usage"
    Wired logic is less common in modern ASIC design due to its speed and power disadvantages. However, it remains relevant in bus architectures and I/O interfaces where multiple devices share a common signal line.

---

## 7.14 Transmission Gate Circuits

A **transmission gate** (also called a pass gate) is a CMOS switch that can pass both logic 0 and logic 1 with full voltage swing. It consists of an NMOS and PMOS transistor connected in parallel, controlled by complementary signals.

### Structure and Operation

The transmission gate has four terminals:

- **Input:** The signal to be passed
- **Output:** Connected to input when gate is ON
- **Control ($C$):** Connects to NMOS gate and PMOS gate (complemented)
- **Control complement ($\overline{C}$):** Connects to PMOS gate

When $C = 1$: Both transistors are ON, creating a low-resistance path from input to output.

When $C = 0$: Both transistors are OFF, creating a high-impedance (disconnected) path.

### Multiplexer Using Transmission Gates

A 2:1 multiplexer can be efficiently implemented with two transmission gates:

$$F = \begin{cases} A & \text{if } S = 0 \\ B & \text{if } S = 1 \end{cases}$$

- Transmission gate 1: passes $A$ when $S = 0$ ($\overline{S} = 1$)
- Transmission gate 2: passes $B$ when $S = 1$
- Outputs connected together (only one is active at a time)

This implementation uses only 4 transistors (2 per transmission gate) plus the inverter for $\overline{S}$, compared to approximately 16 transistors for a gate-level MUX implementation.

### XOR Using Transmission Gates

The XOR function can also be implemented efficiently:

$$F = A \oplus B$$

Using a transmission gate controlled by $B$: when $B=0$, pass $A$; when $B=1$, pass $\overline{A}$. This requires only one transmission gate, one inverter, and complementary control—far fewer transistors than a gate-level XOR.

| Implementation | Transistor Count | Gate Delays |
|---------------|-----------------|-------------|
| NAND-only XOR | 16 | 3-4 |
| AOI-based XOR | 10-12 | 2 |
| Transmission gate XOR | 6 | 1-2 |

!!! info "Design Trade-off"
    Transmission gates offer excellent area and power efficiency but can suffer from signal degradation when cascaded through many stages, since they lack the regenerative property of logic gates. In practice, buffers are inserted periodically to restore signal quality.

---

## 7.15 Technology Mapping

**Technology mapping** is the process of converting a technology-independent Boolean network into a circuit that uses gates from a specific library (cell library). This step bridges the gap between abstract logic optimization and physical implementation in ASIC and FPGA design.

### The Technology Mapping Flow

The overall flow consists of four phases:

1. **Decomposition:** Convert the optimized Boolean network into a base representation using only primitive gates (typically NAND2 and INV, or NOR2 and INV)
2. **Matching:** Identify portions of the decomposed network that correspond to cells available in the target library
3. **Covering:** Select a minimum-cost set of library cells that implements the entire function
4. **Optimization:** Iterate to improve area, delay, or power metrics

### Decomposition

Any Boolean network can be decomposed into a network of 2-input NAND gates and inverters. This uniform representation enables systematic pattern matching against library cells.

**Example:** Decompose a 3-input AND gate:

$$ABC = \overline{\overline{\overline{\overline{AB}} \cdot C}} \rightarrow \text{NAND}(\text{NAND}(\text{INV}(\text{NAND}(A,B)), C))$$

More practically: $ABC = \overline{\overline{\overline{\overline{AB}} \cdot C}}$, which is INV(NAND(INV(NAND(A,B)), C)) = NAND2 + INV + NAND2 + INV.

### Library Cells and Cost

A typical standard cell library contains cells ranging from simple inverters to complex gates:

| Cell | Function | Area (units) | Delay (ps) |
|------|----------|-------------|------------|
| INV | $\overline{A}$ | 1 | 30 |
| NAND2 | $\overline{AB}$ | 2 | 50 |
| NAND3 | $\overline{ABC}$ | 3 | 70 |
| NOR2 | $\overline{A+B}$ | 2 | 60 |
| AOI21 | $\overline{AB+C}$ | 3 | 65 |
| AOI22 | $\overline{AB+CD}$ | 4 | 75 |
| OAI21 | $\overline{(A+B)C}$ | 3 | 65 |
| MUX2 | $S?B:A$ | 4 | 80 |

### Covering Algorithm

The covering problem selects library cells to minimize total cost (area, delay, or weighted combination). For tree-structured networks, dynamic programming finds the optimal covering in polynomial time. For DAG (Directed Acyclic Graph) networks with shared nodes, the problem is NP-hard, and heuristic approaches are used.

!!! info "Industry Practice"
    Commercial synthesis tools like Synopsys Design Compiler, Cadence Genus, and open-source tools like Yosys and ABC automate technology mapping. Understanding the underlying principles helps designers write better HDL code and interpret synthesis reports.

---

## 7.16 Multi-Level Synthesis Tools

Modern digital design relies on **automated synthesis tools** that perform multi-level optimization and technology mapping far beyond what is practical by hand. Understanding the capabilities and workflow of these tools is essential for effective digital design.

### Logic Synthesis Flow

The complete synthesis flow proceeds through several stages:

1. **HDL Input:** Design described in Verilog or VHDL
2. **Elaboration:** HDL parsed into generic Boolean network
3. **Technology-Independent Optimization:** Algebraic and Boolean optimization
4. **Technology Mapping:** Map to target library cells
5. **Gate-Level Netlist Output:** Optimized circuit in target technology

### Common Optimization Commands

Synthesis tools provide optimization commands that apply combinations of the techniques covered in this unit:

- **Flatten:** Convert multi-level to two-level (full flattening)
- **Factor:** Extract common sub-expressions
- **Simplify:** Apply Boolean minimization
- **Restructure:** Change the circuit structure to improve a target metric
- **Map:** Perform technology mapping to a cell library
- **Retime:** Move flip-flops to balance pipeline stages (sequential optimization)

### Open-Source Tools

Several open-source synthesis tools allow students to experiment with multi-level optimization:

- **ABC (Berkeley):** Academic logic synthesis and verification tool
- **Yosys:** Open-source synthesis suite for Verilog
- **OpenSTA:** Static timing analysis

These tools implement the same fundamental algorithms (factoring, decomposition, technology mapping) covered in this unit, providing practical experience with the concepts.

---

## 7.17 Summary and Key Takeaways

This unit covered the transformation of Boolean expressions into practical multi-level circuits:

- **Two-level vs. multi-level circuits** present a fundamental trade-off between propagation delay and gate count/fan-in. Multi-level circuits sacrifice speed for smaller, more practical implementations.

- **Universal gates** (NAND and NOR) can implement any Boolean function. NAND is preferred for SOP forms; NOR is preferred for POS forms.

- **AND-OR to NAND-NAND conversion** follows from double inversion and De Morgan's theorem: simply replace all AND and OR gates with NAND gates.

- **OR-AND to NOR-NOR conversion** is the dual transformation: replace all OR and AND gates with NOR gates.

- **Mixed gate conversions** (cross conversions) require extra gate levels and are generally less efficient than natural conversions.

- **Bubble pushing** provides a visual method for gate conversion based on De Morgan's theorem. Bubbles on outputs can be pushed to inputs (changing gate type), and paired bubbles cancel.

- **Multi-level circuit analysis** involves tracing signals through multiple gate layers to determine expressions, propagation delays, and critical paths.

- **Fan-in and fan-out constraints** limit practical gate sizes and drive capabilities, necessitating multi-level decomposition and buffer insertion.

- **Level reduction techniques** (flattening, partial flattening, restructuring) decrease delay at the cost of increased gate count or fan-in.

- **Gate count optimization** through common sub-expression sharing reduces circuit area.

- **Factoring and decomposition** extract common factors and break complex functions into simpler subfunctions.

- **AOI and OAI complex gates** implement multi-level functions in single CMOS structures with reduced delay and area.

- **Wired logic** exploits open-collector/open-drain outputs to implement AND or OR functions without additional gates.

- **Transmission gates** provide efficient CMOS switches for multiplexers and XOR functions with minimal transistor count.

- **Technology mapping** converts optimized Boolean networks to circuits using specific library cells, balancing area, delay, and power.

- **Synthesis tools** automate multi-level optimization, making hand optimization primarily a learning exercise but understanding the principles essential for effective tool usage.

??? question "Self-Check: Why can't you simply replace all gates with NANDs in any circuit?"
    The direct replacement only works for two-level AND-OR (SOP) circuits because the double inversion principle creates matching pairs of inversions that cancel. For arbitrary multi-level circuits or for cross conversions (SOP→NOR), additional inverters or gate levels are required to handle unpaired inversions.

??? question "Self-Check: What is the critical path delay of a 4-level circuit where each gate has a 3ns propagation delay?"
    The critical path delay is $4 \times 3\text{ns} = 12\text{ns}$. This assumes all gates on the critical path have equal delay. In practice, different gate types have different delays, and the critical path delay is the sum of individual gate delays along the longest path.

??? question "Self-Check: How does an AOI22 gate achieve less delay than its discrete equivalent?"
    The discrete implementation of $F = \overline{AB + CD}$ requires 2 AND gates + 1 OR gate + 1 inverter = 3 gate levels. The AOI22 implements the same function in a single CMOS structure where the transistors are arranged to compute the entire function in one stage, achieving approximately 1 gate delay instead of 3.

---

## Interactive Walkthrough

Step through converting an AND-OR circuit to all-NAND using bubble pushing:

<iframe src="../sims/nand-conversion-walkthrough/main.html" width="100%" height="580px" scrolling="no"></iframe>

---

[See Annotated References](./references.md)
