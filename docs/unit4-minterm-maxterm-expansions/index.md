---
title: Unit 4 — Minterm and Maxterm Expansions
description: Canonical forms for Boolean functions including minterms, maxterms, standard notations, and systematic conversion techniques
generated_by: claude skill chapter-content-generator
date: 2026-02-04 17:45:00
version: 0.03
---

# Unit 4 — Minterm and Maxterm Expansions

## Summary

This unit introduces the canonical forms for representing Boolean functions—the most complete and unambiguous way to express any logic function. Canonical forms use minterms (for Sum of Products) or maxterms (for Product of Sums) to create expressions where every variable appears exactly once in every term. Students will learn to derive canonical expressions directly from truth tables, convert between minterm and maxterm representations, and use compact notations (Σ and Π) for efficient specification. The unit also covers the Shannon expansion theorem, which provides a systematic method for decomposing functions, and explores how don't care conditions are represented in canonical form. These concepts establish the foundation for the systematic simplification techniques covered in Unit 5 (Karnaugh Maps).

---

## Concepts Covered

1. Canonical Form
2. Standard Form
3. Minterm
4. Maxterm
5. Minterm Expansion
6. Maxterm Expansion
7. Minterm Designation
8. Maxterm Designation
9. Sum of Minterms
10. Product of Maxterms
11. Minterm to Maxterm
12. Maxterm to Minterm
13. Canonical SOP Form
14. Canonical POS Form
15. Minterm List Notation
16. Maxterm List Notation
17. Sigma Notation
18. Pi Notation
19. Complement of Function
20. Function from Truth Table
21. Minterm from Truth Table
22. Maxterm from Truth Table
23. Dont Care Condition
24. Incompletely Specified
25. Dont Care in SOP
26. Dont Care in POS
27. Converting SOP to POS
28. Converting POS to SOP
29. Expansion Theorem
30. Shannon Expansion
31. Cofactor
32. On-Set of Function
33. Off-Set of Function
34. DC-Set of Function
35. Literal Count

---

## Prerequisites

Before beginning this unit, students should have:

- Solid understanding of Boolean algebra operations (Unit 2)
- Ability to construct truth tables for any Boolean expression
- Familiarity with SOP and POS forms (Unit 2)
- Understanding of don't care conditions (Unit 3)

---

## 1. Canonical vs Standard Forms

Boolean expressions can be written in multiple equivalent ways. Two important classifications are **canonical forms** and **standard forms**.

### Standard Form

A **standard form** expression is written as either:

- **Standard SOP:** Sum of product terms (not all variables need appear in each term)
- **Standard POS:** Product of sum terms (not all variables need appear in each term)

Example of standard SOP: $F = AB + \overline{A}C + BC$

Note that the first term has only A and B, the second has A and C, and the third has B and C—not all three variables appear in every term.

### Canonical Form

A **canonical form** is a standardized, unique representation where **every variable appears exactly once** (either complemented or uncomplemented) in **every term**.

- **Canonical SOP:** Every product term contains all n variables → called **minterms**
- **Canonical POS:** Every sum term contains all n variables → called **maxterms**

The canonical form of a function is unique—there is exactly one canonical SOP and one canonical POS for any given function.

| Property | Standard Form | Canonical Form |
|----------|---------------|----------------|
| Variables per term | May vary | All n variables |
| Unique representation | No | Yes |
| Term names | Product/Sum terms | Minterms/Maxterms |
| Directly from truth table | No | Yes |
| Typically more terms | No | Yes |

!!! note "Why Canonical Forms Matter"
    Canonical forms provide a direct bridge between truth tables and algebraic expressions. They also serve as the starting point for systematic simplification methods like Karnaugh maps.

---

## 2. Minterms

A **minterm** is a product term containing all n variables of the function, where each variable appears exactly once in either complemented or uncomplemented form. For n variables, there are exactly $2^n$ possible minterms.

### Minterm Construction

For each row of a truth table where the output is 1:

- Include the variable **uncomplemented** if its value is 1
- Include the variable **complemented** if its value is 0

**Example:** For 3 variables (A, B, C), construct the minterm for input 101:

- A = 1 → include A
- B = 0 → include $\overline{B}$
- C = 1 → include C
- Minterm: $A\overline{B}C$

### Minterm Designation

Each minterm has a unique **minterm designation** (index number) equal to the decimal value of the input combination.

| Row | A | B | C | Decimal | Minterm | Designation |
|-----|---|---|---|---------|---------|-------------|
| 0 | 0 | 0 | 0 | 0 | $\overline{A}\overline{B}\overline{C}$ | $m_0$ |
| 1 | 0 | 0 | 1 | 1 | $\overline{A}\overline{B}C$ | $m_1$ |
| 2 | 0 | 1 | 0 | 2 | $\overline{A}B\overline{C}$ | $m_2$ |
| 3 | 0 | 1 | 1 | 3 | $\overline{A}BC$ | $m_3$ |
| 4 | 1 | 0 | 0 | 4 | $A\overline{B}\overline{C}$ | $m_4$ |
| 5 | 1 | 0 | 1 | 5 | $A\overline{B}C$ | $m_5$ |
| 6 | 1 | 1 | 0 | 6 | $AB\overline{C}$ | $m_6$ |
| 7 | 1 | 1 | 1 | 7 | $ABC$ | $m_7$ |

### Key Property of Minterms

Each minterm equals 1 for exactly one input combination and 0 for all others. This is why minterms are used to build SOP expressions—ORing together the minterms where F=1 creates a function that is 1 precisely for those inputs.

#### Diagram: Minterm Visualizer

<iframe src="../../sims/minterm-visualizer/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Minterm Visualizer</summary>
Type: microsim

Purpose: Interactive visualization of minterm construction showing the relationship between input values and minterm structure

Bloom Level: Understand (L2)
Bloom Verb: Explain, construct, identify

Learning Objective: Students will be able to construct any minterm from its index number and explain why each minterm equals 1 for exactly one input combination.

Canvas Layout:
- Top: Variable count selector (2, 3, or 4 variables)
- Middle: Visual minterm construction area
- Bottom: Complete minterm table with highlighting

Visual Elements:
- Binary input display with variable labels (A, B, C, ...)
- Step-by-step minterm construction:
  - For each variable, show: value → complemented or not
  - Build the product term progressively
- Highlight showing the single "1" in the minterm's truth table column
- Complete minterm reference table

Interactive Controls:
- Variable count selector (2, 3, 4)
- Click on any minterm index (0 to 2^n - 1) to see its construction
- Binary input toggles to build minterm interactively
- "Show All Minterms" table view
- Animation to cycle through all minterms

Data Visibility Requirements:
- Show the decimal index prominently
- Show the binary equivalent
- Show each variable's contribution (1→uncomplemented, 0→complemented)
- Display the final minterm expression
- Highlight the single "1" in a mini truth table

Default Parameters:
- Variables: 3 (A, B, C)
- Selected minterm: m5

Behavior:
- Real-time minterm update as index or bits change
- Highlight the relationship between binary value and complement usage
- Show that the minterm evaluates to 1 only for its index input

Instructional Rationale: Seeing the systematic construction process helps students internalize the minterm pattern without memorization.

Implementation: p5.js with responsive canvas
</details>

---

## 3. Maxterms

A **maxterm** is a sum term containing all n variables of the function, where each variable appears exactly once in either complemented or uncomplemented form. Maxterms are the dual of minterms.

### Maxterm Construction

For each row of a truth table where the output is 0:

- Include the variable **complemented** if its value is 1
- Include the variable **uncomplemented** if its value is 0

This is the **opposite** of minterm construction!

**Example:** For 3 variables (A, B, C), construct the maxterm for input 101:

- A = 1 → include $\overline{A}$
- B = 0 → include B
- C = 1 → include $\overline{C}$
- Maxterm: $(\overline{A} + B + \overline{C})$

### Maxterm Designation

Each maxterm has a unique **maxterm designation** equal to the decimal value of the input combination. Maxterms are denoted with capital M.

| Row | A | B | C | Decimal | Maxterm | Designation |
|-----|---|---|---|---------|---------|-------------|
| 0 | 0 | 0 | 0 | 0 | $(A + B + C)$ | $M_0$ |
| 1 | 0 | 0 | 1 | 1 | $(A + B + \overline{C})$ | $M_1$ |
| 2 | 0 | 1 | 0 | 2 | $(A + \overline{B} + C)$ | $M_2$ |
| 3 | 0 | 1 | 1 | 3 | $(A + \overline{B} + \overline{C})$ | $M_3$ |
| 4 | 1 | 0 | 0 | 4 | $(\overline{A} + B + C)$ | $M_4$ |
| 5 | 1 | 0 | 1 | 5 | $(\overline{A} + B + \overline{C})$ | $M_5$ |
| 6 | 1 | 1 | 0 | 6 | $(\overline{A} + \overline{B} + C)$ | $M_6$ |
| 7 | 1 | 1 | 1 | 7 | $(\overline{A} + \overline{B} + \overline{C})$ | $M_7$ |

### Key Property of Maxterms

Each maxterm equals 0 for exactly one input combination and 1 for all others. This is the dual property to minterms. ANDing together maxterms where F=0 creates a function that is 0 precisely for those inputs.

### Relationship Between Minterms and Maxterms

A minterm and maxterm with the same index are complements:

$$m_i = \overline{M_i} \qquad M_i = \overline{m_i}$$

**Example:** $m_5 = A\overline{B}C$ and $M_5 = (\overline{A} + B + \overline{C})$

By DeMorgan's theorem: $\overline{m_5} = \overline{A\overline{B}C} = \overline{A} + B + \overline{C} = M_5$ ✓

---

## 4. Canonical SOP and POS Forms

### Sum of Minterms (Canonical SOP)

The **canonical SOP form** expresses a function as the OR (sum) of all minterms for which the function equals 1. This is also called the **minterm expansion** or **sum of minterms**.

**Procedure: Function from Truth Table (SOP)**

1. Identify all rows where F = 1
2. Write the minterm for each such row
3. OR all minterms together

**Example:** Given the truth table:

| A | B | C | F |
|---|---|---|---|
| 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 1 |
| 0 | 1 | 0 | 0 |
| 0 | 1 | 1 | 1 |
| 1 | 0 | 0 | 0 |
| 1 | 0 | 1 | 1 |
| 1 | 1 | 0 | 0 |
| 1 | 1 | 1 | 0 |

F = 1 for rows 1, 3, 5 (decimal indices where output is 1)

$$F = m_1 + m_3 + m_5 = \overline{A}\overline{B}C + \overline{A}BC + A\overline{B}C$$

### Product of Maxterms (Canonical POS)

The **canonical POS form** expresses a function as the AND (product) of all maxterms for which the function equals 0. This is also called the **maxterm expansion** or **product of maxterms**.

**Procedure: Maxterm from Truth Table (POS)**

1. Identify all rows where F = 0
2. Write the maxterm for each such row
3. AND all maxterms together

Using the same truth table, F = 0 for rows 0, 2, 4, 6, 7

$$F = M_0 \cdot M_2 \cdot M_4 \cdot M_6 \cdot M_7$$
$$= (A+B+C)(A+\overline{B}+C)(\overline{A}+B+C)(\overline{A}+\overline{B}+C)(\overline{A}+\overline{B}+\overline{C})$$

Both expressions represent the same function F!

#### Diagram: Canonical Form Generator

<iframe src="../../sims/canonical-form-generator/main.html" width="100%" height="600px" scrolling="no"></iframe>

<details markdown="1">
<summary>Canonical Form Generator</summary>
Type: microsim

Purpose: Generate canonical SOP and POS forms from truth table inputs with step-by-step explanation

Bloom Level: Apply (L3)
Bloom Verb: Derive, construct, generate

Learning Objective: Students will be able to derive both canonical SOP (sum of minterms) and canonical POS (product of maxterms) expressions from any truth table.

Canvas Layout:
- Left: Interactive truth table with editable outputs
- Right: Generated canonical expressions (SOP and POS)
- Bottom: Step-by-step derivation panel

Visual Elements:
- Truth table with toggle outputs (0, 1, X)
- Rows highlighted by output value:
  - Green highlight for F=1 rows (contribute to SOP)
  - Red highlight for F=0 rows (contribute to POS)
  - Gray for don't cares
- Canonical SOP expression built term by term
- Canonical POS expression built term by term
- Minterm/Maxterm index list
- Expandable view showing full minterm/maxterm expressions

Interactive Controls:
- Variable count selector (2, 3, 4)
- Click truth table outputs to toggle 0/1/X
- "Random Function" button
- Toggle between showing indices only vs full expressions
- "Step Through SOP" / "Step Through POS" buttons
- Copy expression button

Data Visibility Requirements:
- For SOP: highlight each F=1 row as its minterm is added
- For POS: highlight each F=0 row as its maxterm is added
- Show running expression as terms are added
- Display both compact notation and expanded form

Default Parameters:
- Variables: 3
- Function: F = Σm(1,3,5)

Behavior:
- Real-time expression update as truth table changes
- Animation option for step-by-step derivation
- Verify equivalence of SOP and POS (same truth table)
- Count and display number of terms in each form

Instructional Rationale: Side-by-side construction of both canonical forms from the same truth table reinforces the duality between minterms and maxterms.

Implementation: p5.js with DOM elements for truth table
</details>

---

## 5. Compact Notation: Σ and Π

Writing out full canonical expressions is tedious. Compact notations provide efficient representations.

### Sigma Notation (Σ) for SOP

The **minterm list notation** uses the Greek letter sigma (Σ) followed by the list of minterm indices:

$$F(A,B,C) = \Sigma m(1,3,5)$$

This reads: "F equals the sum of minterms 1, 3, and 5."

The variable list indicates the order of significance (A is MSB, C is LSB in this case).

### Pi Notation (Π) for POS

The **maxterm list notation** uses the Greek letter pi (Π) followed by the list of maxterm indices:

$$F(A,B,C) = \Pi M(0,2,4,6,7)$$

This reads: "F equals the product of maxterms 0, 2, 4, 6, and 7."

### Converting Between Notations

Since a function is 1 for minterm indices and 0 for maxterm indices, conversion is straightforward:

**Minterm to Maxterm conversion:** The maxterm indices are all indices NOT in the minterm list.

$$F = \Sigma m(1,3,5) = \Pi M(0,2,4,6,7)$$

For 3 variables, indices 0-7 exist. If minterms are {1,3,5}, maxterms are {0,2,4,6,7}.

**Maxterm to Minterm conversion:** The minterm indices are all indices NOT in the maxterm list.

| Given | To Find | Method |
|-------|---------|--------|
| Σm(list) | ΠM(list) | Use indices NOT in minterm list |
| ΠM(list) | Σm(list) | Use indices NOT in maxterm list |

!!! tip "Quick Conversion Check"
    The minterm indices plus maxterm indices must equal all possible indices (0 to 2ⁿ-1). If they don't add up correctly, there's an error.

---

## 6. Complement of a Function

The **complement of a function** $\overline{F}$ has the opposite output for every input combination. This leads to elegant relationships in canonical form.

### Complement in Canonical Form

If $F = \Sigma m(a, b, c, ...)$, then $\overline{F} = \Sigma m(\text{all other indices})$

Equivalently: $\overline{F} = \Pi M(a, b, c, ...)$

**Example:**
$$F = \Sigma m(1,3,5) \quad \text{(for 3 variables)}$$
$$\overline{F} = \Sigma m(0,2,4,6,7) = \Pi M(1,3,5)$$

This reveals a beautiful symmetry:

- The minterm indices of F become the maxterm indices of $\overline{F}$
- The maxterm indices of F become the minterm indices of $\overline{F}$

### Practical Use

To find $\overline{F}$ in canonical form:

1. **From SOP:** Swap Σm to ΠM, keep same indices
2. **From POS:** Swap ΠM to Σm, keep same indices

$$F = \Sigma m(1,3,5) \implies \overline{F} = \Pi M(1,3,5)$$
$$F = \Pi M(0,2,4,6,7) \implies \overline{F} = \Sigma m(0,2,4,6,7)$$

---

## 7. Converting Between SOP and POS

Beyond canonical forms, we often need to convert between standard SOP and POS expressions.

### Converting SOP to POS

**Method 1: Via Truth Table**

1. Expand SOP to canonical form (all minterms)
2. Identify maxterm indices (where F=0)
3. Write POS from maxterms

**Method 2: Algebraic (DeMorgan's)**

1. Find $\overline{F}$ by complementing the SOP
2. Simplify $\overline{F}$ to SOP form
3. Complement again: $F = \overline{\overline{F}}$
4. Apply DeMorgan's to get POS

**Example:** Convert $F = AB + \overline{A}C$ to POS

Step 1: $\overline{F} = \overline{AB + \overline{A}C} = \overline{AB} \cdot \overline{\overline{A}C} = (\overline{A}+\overline{B})(A+\overline{C})$

This is already POS form for $\overline{F}$.

Step 2: $F = \overline{(\overline{A}+\overline{B})(A+\overline{C})}$

Apply DeMorgan's: $F = \overline{(\overline{A}+\overline{B})} + \overline{(A+\overline{C})} = (A \cdot B) + (\overline{A} \cdot C)$

This returns us to SOP! For actual POS of F, we need:

$$F = \overline{\overline{F}} = \overline{(\overline{A}+\overline{B})(A+\overline{C})}$$

By DeMorgan's on the complement of each factor and then combining... this gets complex.

**Easier Method: Use truth table**

Build the truth table, read off maxterms where F=0.

### Converting POS to SOP

**Method 1: Via Truth Table**

1. Expand POS to canonical form (all maxterms)
2. Identify minterm indices (where F=1)
3. Write SOP from minterms

**Method 2: Algebraic Expansion**

1. Multiply out the POS expression using distribution
2. Simplify using Boolean algebra

**Example:** Convert $F = (A+B)(A+C)$ to SOP

$$F = (A+B)(A+C)$$
$$= A \cdot A + A \cdot C + B \cdot A + B \cdot C$$
$$= A + AC + AB + BC$$
$$= A(1 + C + B) + BC$$
$$= A + BC$$

#### Diagram: SOP-POS Converter

<iframe src="../../sims/sop-pos-converter/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>SOP-POS Converter</summary>
Type: microsim

Purpose: Convert between SOP and POS forms showing both truth table and algebraic methods

Bloom Level: Apply (L3)
Bloom Verb: Convert, transform, apply

Learning Objective: Students will be able to convert Boolean expressions between SOP and POS forms using either truth table or algebraic methods.

Canvas Layout:
- Top: Expression input with form selector (SOP/POS)
- Middle: Conversion workspace showing method steps
- Bottom: Result display with verification

Visual Elements:
- Input expression field
- Method selector (Truth Table / Algebraic)
- Step-by-step conversion display:
  - For truth table: show table with highlighted rows
  - For algebraic: show DeMorgan's applications
- Output expression in target form
- Verification panel (both expressions produce same truth table)

Interactive Controls:
- Enter expression in either SOP or POS form
- Select target form (convert TO SOP or TO POS)
- Method toggle (truth table vs algebraic)
- "Step Through" for detailed walkthrough
- "Verify Equivalence" button
- Example expression buttons

Data Visibility Requirements:
- Show intermediate steps clearly
- For truth table method: highlight F=1 rows (SOP) or F=0 rows (POS)
- For algebraic: show each transformation with rule applied
- Display both expressions and their common truth table

Default Parameters:
- Input: AB + A'C (SOP)
- Target: POS
- Method: Truth Table

Behavior:
- Parse and validate input expression
- Generate conversion steps based on method
- Verify that input and output have same truth table
- Handle both standard and canonical forms

Instructional Rationale: Seeing both conversion methods helps students choose the appropriate approach based on expression complexity.

Implementation: p5.js with DOM elements
</details>

---

## 8. Don't Cares in Canonical Form

**Don't care conditions** (introduced in Unit 3) have specific representations in canonical notation.

### Function Sets

A Boolean function can be described by three sets of minterm indices:

- **On-set:** Minterms where F = 1
- **Off-set:** Minterms where F = 0
- **DC-set:** Minterms where F = don't care (X)

These three sets partition all $2^n$ indices: On-set ∪ Off-set ∪ DC-set = {0, 1, ..., 2ⁿ-1}

### Notation with Don't Cares

The canonical notation extends to include don't cares:

$$F(A,B,C) = \Sigma m(1,3,5) + d(2,6)$$

This reads: "F equals 1 for minterms 1, 3, 5, with don't cares at 2 and 6."

For POS form:

$$F(A,B,C) = \Pi M(0,4,7) \cdot d(2,6)$$

### Don't Care in SOP vs POS

When simplifying:

- **Don't care in SOP:** Treat as 1 if it helps create larger groups
- **Don't care in POS:** Treat as 0 if it helps create larger groups

The optimizer chooses the assignment that minimizes the expression.

**Example:**
$$F = \Sigma m(1,3,5) + d(2,6)$$

On-set: {1, 3, 5}
DC-set: {2, 6}
Off-set: {0, 4, 7}

During simplification (K-maps, Unit 5), we may include minterms 2 and/or 6 if it reduces the expression.

### Incompletely Specified Functions

An **incompletely specified function** has at least one don't care condition. The function is not fully defined—it specifies required behavior for some inputs but allows flexibility for others.

**Example: BCD Decoder**

BCD uses only inputs 0000-1001 (0-9). Inputs 1010-1111 (10-15) never occur, so their outputs are don't cares:

$$F = \Sigma m(\text{specified 1s}) + d(10,11,12,13,14,15)$$

---

## 9. Shannon Expansion Theorem

The **Shannon expansion theorem** (also called the **expansion theorem**) provides a systematic method for decomposing a Boolean function with respect to any variable.

### Expansion with Respect to a Variable

Any Boolean function F can be expanded around a variable X:

$$F = X \cdot F_X + \overline{X} \cdot F_{\overline{X}}$$

where:

- $F_X$ is the **positive cofactor**: F evaluated with X = 1
- $F_{\overline{X}}$ is the **negative cofactor**: F evaluated with X = 0

### Cofactors

A **cofactor** of function F with respect to variable X is F with X set to a constant:

- **Positive cofactor** $F_X$: Set X = 1, simplify
- **Negative cofactor** $F_{\overline{X}}$: Set X = 0, simplify

**Example:** Given $F = AB + \overline{A}C + BC$, find cofactors with respect to A.

$F_A$ (set A = 1): $F_A = 1 \cdot B + \overline{1} \cdot C + BC = B + 0 + BC = B + BC = B$

$F_{\overline{A}}$ (set A = 0): $F_{\overline{A}} = 0 \cdot B + \overline{0} \cdot C + BC = 0 + C + BC = C + BC = C$

Verify: $F = A \cdot F_A + \overline{A} \cdot F_{\overline{A}} = A \cdot B + \overline{A} \cdot C = AB + \overline{A}C$

Wait—this doesn't match the original! Let's check: Original was $F = AB + \overline{A}C + BC$

The term BC is covered by either AB (when B=C=1, A=1) or $\overline{A}C$ (when B=C=1, A=0), so $AB + \overline{A}C + BC = AB + \overline{A}C$ by consensus theorem. ✓

### Applications of Shannon Expansion

1. **Multiplexer implementation:** The expansion directly maps to a 2:1 MUX with X as select
2. **Recursive decomposition:** Break complex functions into simpler cofactors
3. **BDD construction:** Binary Decision Diagrams use repeated Shannon expansion
4. **Verification:** Check function equivalence by comparing cofactors

#### Diagram: Shannon Expansion Explorer

<iframe src="../../sims/shannon-expansion-explorer/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Shannon Expansion Explorer</summary>
Type: microsim

Purpose: Demonstrate Shannon expansion and cofactor computation for any Boolean function

Bloom Level: Analyze (L4)
Bloom Verb: Decompose, analyze, derive

Learning Objective: Students will be able to apply Shannon expansion to decompose a Boolean function into cofactors and verify the expansion by reconstruction.

Canvas Layout:
- Top: Function input field
- Middle: Expansion variable selector and cofactor display
- Bottom: Verification and MUX implementation view

Visual Elements:
- Input function display
- Variable selector (which variable to expand around)
- Cofactor computation showing substitution:
  - F_X with X=1 substitution highlighted
  - F_X̄ with X=0 substitution highlighted
- Reconstructed expression: X·F_X + X̄·F_X̄
- Equivalence verification (truth tables match)
- 2:1 MUX diagram showing implementation

Interactive Controls:
- Enter any Boolean expression
- Select expansion variable from dropdown
- "Compute Cofactors" button
- "Verify Expansion" to check equivalence
- "Show MUX" to see hardware implementation
- "Expand Further" to recursively expand cofactors

Data Visibility Requirements:
- Show original function
- Show step-by-step substitution for each cofactor
- Show simplified cofactor expressions
- Display reconstructed expansion
- Verify via truth table comparison

Default Parameters:
- Function: AB + A'C + BC
- Expansion variable: A

Behavior:
- Parse and validate input expression
- Compute cofactors with simplification
- Show that X·F_X + X̄·F_X̄ = F
- Optionally show recursive expansion tree

Instructional Rationale: Understanding Shannon expansion prepares students for advanced topics like BDDs and provides insight into multiplexer-based implementations.

Implementation: p5.js with expression parser
</details>

---

## 10. Literal Count and Expression Complexity

The **literal count** is a common metric for expression complexity, counting the total number of variable appearances (complemented or uncomplemented) in an expression.

### Counting Literals

**Example:** $F = AB + \overline{A}C + BC$

- Term 1 (AB): 2 literals (A, B)
- Term 2 ($\overline{A}C$): 2 literals ($\overline{A}$, C)
- Term 3 (BC): 2 literals (B, C)
- Total: 6 literals

### Canonical Form Literal Count

Canonical forms typically have high literal counts because every term includes all variables:

For n variables and k minterms: Literal count = k × n

**Example:** $F = \Sigma m(1,3,5)$ in 3 variables

- 3 minterms, each with 3 literals
- Literal count = 3 × 3 = 9

The simplified form $F = \overline{B}C + BC = C$ has only 1 literal!

### Why Literal Count Matters

- **Gate inputs:** Each literal requires a gate input (or inverter)
- **Wiring complexity:** More literals = more connections
- **Cost:** Integrated circuit area and power roughly correlate with literal count
- **Speed:** More literals can mean longer propagation paths

| Metric | Canonical Form | Simplified Form |
|--------|----------------|-----------------|
| Unique | Yes | May not be unique |
| From truth table | Direct | Requires simplification |
| Literal count | High | Minimized |
| Implementation cost | High | Lower |

The goal of simplification (Unit 5) is to reduce literal count while preserving the function.

---

## Summary and Key Takeaways

This unit established canonical forms as the foundation for systematic Boolean function representation:

- **Canonical forms** are unique representations where every variable appears in every term. They bridge truth tables and algebraic expressions.

- **Minterms** are product terms with all variables (used for canonical SOP). Each minterm equals 1 for exactly one input combination.

- **Maxterms** are sum terms with all variables (used for canonical POS). Each maxterm equals 0 for exactly one input combination.

- **Minterm/maxterm designations** use indices matching the decimal value of the input combination. $m_i$ and $M_i$ are complements of each other.

- **Compact notation** uses Σm(indices) for sum of minterms and ΠM(indices) for product of maxterms.

- **Converting between SOP and POS:** Use the complementary index set, or build via truth table.

- **Function complement:** $\overline{F}$ swaps minterm indices to maxterm indices (and vice versa).

- **Don't cares** are represented as d(indices) and define the DC-set alongside On-set and Off-set.

- **Shannon expansion** decomposes F = X·F_X + X̄·F_X̄ using positive and negative cofactors.

- **Literal count** measures expression complexity; canonical forms have high literal counts that simplification reduces.

??? question "Self-Check: Convert F = Σm(0,2,5,7) to ΠM notation for 3 variables."
    For 3 variables, indices are 0-7. If On-set = {0,2,5,7}, then Off-set = {1,3,4,6}. Therefore: F = ΠM(1,3,4,6)

??? question "Self-Check: What is the complement of F = Σm(1,4,6) in Σ notation?"
    $\overline{F}$ has the complementary minterm set. For 3 variables: $\overline{F} = Σm(0,2,3,5,7)$

??? question "Self-Check: Find the positive cofactor of F = ABC + ĀB + BC with respect to B."
    Set B = 1: $F_B = A(1)C + \overline{A}(1) + (1)C = AC + \overline{A} + C = \overline{A} + C$ (by absorption: AC + C = C, and $\overline{A} + C$ remains)
