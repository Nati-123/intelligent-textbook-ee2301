---
title: Quine-McCluskey Method
description: Systematic tabular method for minimizing Boolean functions
generated_by: claude skill chapter-content-generator
date: 2026-02-04 19:45:00
version: 0.03
---

# Unit 6: Quine-McCluskey Method

## Summary

This unit introduces the Quine-McCluskey (QM) method, a systematic tabular algorithm for minimizing Boolean functions. While Karnaugh maps provide an intuitive visual approach for functions with up to five variables, the QM method offers a rigorous, algorithmic procedure suitable for functions with any number of variables. The method can be easily programmed for computer implementation, making it the foundation for modern logic minimization tools. Students will learn to construct implicant tables, systematically combine minterms, generate prime implicant charts, and determine minimum covers using techniques including Petrick's method.

## Concepts Covered

1. Quine-McCluskey Algorithm
2. Tabular Minimization Method
3. Implicant Table Construction
4. Binary Representation of Minterms
5. Grouping by Number of Ones
6. Adjacency Criterion in QM
7. Combining Adjacent Minterms
8. Dash Notation for Combined Terms
9. Iterative Combination Process
10. Unchecked Terms as Prime Implicants
11. Prime Implicant Chart Construction
12. Essential Prime Implicants Selection
13. Row Dominance
14. Column Dominance
15. Cyclic Prime Implicant Charts
16. Petrick's Method
17. Minimal Cover Selection
18. QM Method with Don't Cares
19. Computational Complexity of QM
20. QM versus K-map Comparison
21. Multi-Output Function Minimization
22. Computer Implementation of QM
23. Literal Count Optimization
24. Gate Count Optimization
25. Systematic Approach Advantages

## Prerequisites

Before studying this unit, students should be familiar with:

- Minterms, maxterms, and canonical forms (Unit 4)
- Prime implicants and essential prime implicants (Unit 5)
- K-map simplification techniques (Unit 5)
- Binary number representation (Unit 1)
- Boolean algebra fundamentals (Unit 2)

---

## 6.1 Introduction to Algorithmic Minimization

The Karnaugh map provides an elegant visual method for simplifying Boolean functions, but it has practical limitations. As the number of variables increases beyond four or five, K-maps become difficult to construct, visualize, and manipulate accurately. Additionally, the pattern-recognition approach that makes K-maps intuitive for humans does not translate easily into computer algorithms.

The Quine-McCluskey method, developed independently by Willard V. Quine in 1952 and Edward J. McCluskey in 1956, addresses these limitations. This tabular minimization method provides a systematic, algorithmic procedure that:

- Works for any number of input variables
- Guarantees finding all prime implicants
- Can be readily programmed for computer implementation
- Produces results that can be verified step-by-step

The QM method forms the theoretical foundation for modern Electronic Design Automation (EDA) tools used in industry for logic synthesis and optimization.

| Feature | K-map | Quine-McCluskey |
|---------|-------|-----------------|
| Maximum practical variables | 5-6 | Unlimited |
| Approach | Visual pattern recognition | Algorithmic tabular |
| Computer implementation | Difficult | Straightforward |
| Guaranteed optimal | Depends on user skill | Yes (finds all PIs) |
| Speed for small functions | Fast | Moderate |
| Speed for large functions | Impractical | Computationally intensive |

!!! note "Historical Context"
    The QM method represents one of the earliest examples of algorithmic approaches to digital design. It emerged during the same era that saw the development of the first commercial computers, reflecting the growing need for systematic design methods.

## 6.2 Binary Representation and Grouping

The QM method begins by representing each minterm in binary form. For a function of $n$ variables, each minterm corresponds to an $n$-bit binary number where the bit positions represent the complement or true form of each variable.

Consider a function $F(A, B, C, D) = \sum m(0, 1, 2, 5, 6, 7, 8, 9, 10, 14)$.

The first step is to list all minterms in their binary representations:

| Minterm | A | B | C | D | Number of 1s |
|---------|---|---|---|---|--------------|
| m₀ | 0 | 0 | 0 | 0 | 0 |
| m₁ | 0 | 0 | 0 | 1 | 1 |
| m₂ | 0 | 0 | 1 | 0 | 1 |
| m₈ | 1 | 0 | 0 | 0 | 1 |
| m₅ | 0 | 1 | 0 | 1 | 2 |
| m₆ | 0 | 1 | 1 | 0 | 2 |
| m₉ | 1 | 0 | 0 | 1 | 2 |
| m₁₀ | 1 | 0 | 1 | 0 | 2 |
| m₇ | 0 | 1 | 1 | 1 | 3 |
| m₁₄ | 1 | 1 | 1 | 0 | 3 |

The minterms are then organized into groups based on the number of 1s in their binary representation. This grouping is fundamental to the QM algorithm because:

- Two minterms can only be combined if they differ in exactly one bit position
- Minterms that differ by one bit must have a difference of exactly one in their count of 1s
- Therefore, we only need to compare minterms in adjacent groups

This insight dramatically reduces the number of comparisons needed, from $\binom{n}{2}$ comparisons (every pair) to comparisons only between adjacent groups.

#### Diagram: QM Grouping Visualization

<iframe src="../sims/qm-grouping-visualization/main.html" width="100%" height="532px" scrolling="no"></iframe>

<details markdown="1">
<summary>QM Grouping Visualization Specification</summary>
Type: microsim

Bloom Level: Understand (L2)
Bloom Verb: Classify, organize

Learning Objective: Students will be able to classify minterms into groups based on the number of 1s in their binary representation and explain why this grouping facilitates the combination process.

Visual Elements:
- Left panel: Input area where students enter minterms (comma-separated list)
- Center panel: Binary representation table showing each minterm, its binary form, and 1-count
- Right panel: Grouped display showing minterms organized by number of 1s in stacked boxes
- Color coding: Each group has a distinct color (Group 0: light blue, Group 1: light green, Group 2: yellow, Group 3: orange, Group 4: red)

Interactive Controls:
- Text input: Enter minterm numbers (e.g., "0,1,2,5,6,7,8,9,10,14")
- Dropdown: Select number of variables (3, 4, 5, or 6)
- Button: "Generate Groups"
- Button: "Reset"
- Checkbox: "Show binary representation"

Behavior:
- When minterms are entered and "Generate Groups" is clicked, display the binary representation table
- Animate minterms moving from the table into their respective group boxes
- Highlight adjacent groups with connecting arrows to show which groups will be compared
- Display count of minterms in each group

Data Visibility Requirements:
- Stage 1: Show raw minterm list
- Stage 2: Show conversion to binary with bit counting
- Stage 3: Show final grouped arrangement

Instructional Rationale: Grouping is a classification task that helps students understand the efficiency of the QM method. The animation showing minterms moving into groups reinforces the organizational principle.

Canvas Size: 900x500 pixels, responsive to window width
Implementation: p5.js
</details>

## 6.3 The Combination Process

Once minterms are grouped, the combination process begins. Two terms can be combined if and only if they:

1. Differ in exactly one bit position
2. Have identical values in all other bit positions

When two terms are combined, the differing bit position is replaced with a dash (-), indicating that the variable is eliminated from the product term. This dash notation represents a "don't care" for that particular variable position.

**Example:** Combining minterms from the function above:

Comparing Group 0 with Group 1:
- m₀ (0000) and m₁ (0001): Differ only in position D → Combined: 000- (covers m₀, m₁)
- m₀ (0000) and m₂ (0010): Differ only in position C → Combined: 00-0 (covers m₀, m₂)
- m₀ (0000) and m₈ (1000): Differ only in position A → Combined: -000 (covers m₀, m₈)

Each original minterm that participates in a combination is marked with a check (✓), indicating it is not a prime implicant by itself. Terms that cannot be combined with any other term remain unchecked and are identified as prime implicants.

The combination process continues iteratively:

1. **First iteration:** Combine minterms to form 2-cell implicants (one dash)
2. **Second iteration:** Combine 2-cell implicants to form 4-cell implicants (two dashes)
3. **Continue** until no more combinations are possible

!!! tip "Combination Rule"
    Two terms with dashes can only be combined if:

    - The dashes appear in the same positions
    - The non-dash positions differ in exactly one bit

    For example: 0-01 and 0-11 can combine to form 0--1, but 0-01 and -001 cannot combine because the dashes are in different positions.

## 6.4 Constructing the Implicant Table

The implicant table organizes the systematic combination process. Let us work through the complete example.

**Initial Grouping (Column 1):**

| Group | Minterm | Binary | ✓ |
|-------|---------|--------|---|
| 0 | 0 | 0000 | ✓ |
| 1 | 1 | 0001 | ✓ |
| 1 | 2 | 0010 | ✓ |
| 1 | 8 | 1000 | ✓ |
| 2 | 5 | 0101 | ✓ |
| 2 | 6 | 0110 | ✓ |
| 2 | 9 | 1001 | ✓ |
| 2 | 10 | 1010 | ✓ |
| 3 | 7 | 0111 | ✓ |
| 3 | 14 | 1110 | ✓ |

**First Combination (Column 2):**

| Group | Minterms | Pattern | ✓ |
|-------|----------|---------|---|
| 0-1 | 0,1 | 000- | ✓ |
| 0-1 | 0,2 | 00-0 | ✓ |
| 0-1 | 0,8 | -000 | ✓ |
| 1-2 | 1,5 | 0-01 | |
| 1-2 | 1,9 | -001 | |
| 1-2 | 2,6 | 0-10 | ✓ |
| 1-2 | 2,10 | -010 | ✓ |
| 1-2 | 8,9 | 100- | ✓ |
| 1-2 | 8,10 | 10-0 | ✓ |
| 2-3 | 5,7 | 01-1 | |
| 2-3 | 6,7 | 011- | |
| 2-3 | 6,14 | -110 | ✓ |
| 2-3 | 10,14 | 1-10 | ✓ |

**Second Combination (Column 3):**

| Group | Minterms | Pattern | ✓ |
|-------|----------|---------|---|
| 0-1-2 | 0,1,8,9 | -00- | |
| 0-1-2 | 0,2,8,10 | -0-0 | |
| 1-2-3 | 2,6,10,14 | --10 | |

#### Diagram: QM Combination Process Simulator

<iframe src="../sims/qm-combination-simulator/main.html" width="100%" height="582px" scrolling="no"></iframe>

<details markdown="1">
<summary>QM Combination Process Simulator Specification</summary>
Type: microsim

Bloom Level: Apply (L3)
Bloom Verb: Execute, implement

Learning Objective: Students will be able to execute the QM combination process step-by-step, identifying which terms can be combined and correctly applying dash notation.

Visual Elements:
- Three-column layout showing progressive combination stages
- Column 1: Original minterms grouped by number of 1s
- Column 2: First-level combinations (1 dash)
- Column 3: Second-level combinations (2 dashes)
- Each term displays: minterm coverage, binary/dash pattern, check mark if combined
- Connecting lines between columns showing which terms combined
- Prime implicant highlight (unchecked terms in gold)

Interactive Controls:
- Input: Minterm list entry
- Dropdown: Number of variables (3, 4, 5)
- Button: "Step" - advance one combination at a time
- Button: "Run All" - complete all combinations
- Button: "Reset"
- Toggle: "Show combination details" - displays which bit differs when combining

Step-by-Step Behavior:
- Step 1: Display grouped minterms in Column 1
- Step 2-N: Each step attempts one combination, showing:
  - The two terms being compared
  - Whether they can combine (highlighting the differing bit)
  - The resulting term with dash notation
  - Check marks added to combined source terms
- Final: Highlight all unchecked terms as prime implicants

Data Visibility Requirements:
- Before combination: Show both source terms with binary patterns
- During combination: Highlight the differing bit position
- After combination: Show result with dash, update check marks

Instructional Rationale: Step-through execution allows students to practice the mechanical process of QM combination. Seeing each comparison explicitly builds procedural fluency before attempting problems independently.

Canvas Size: 950x600 pixels, responsive
Implementation: p5.js
</details>

## 6.5 Identifying Prime Implicants

After all possible combinations have been made, the **unchecked terms** from all columns are the prime implicants. These are the largest possible groupings of minterms that cannot be further combined.

From our example, the prime implicants are:

| Prime Implicant | Pattern | Minterms Covered | Boolean Expression |
|-----------------|---------|------------------|-------------------|
| PI₁ | 0-01 | 1, 5 | $\bar{A}\bar{C}D$ |
| PI₂ | -001 | 1, 9 | $\bar{B}\bar{C}D$ |
| PI₃ | 01-1 | 5, 7 | $\bar{A}BD$ |
| PI₄ | 011- | 6, 7 | $\bar{A}BC$ |
| PI₅ | -00- | 0, 1, 8, 9 | $\bar{B}\bar{C}$ |
| PI₆ | -0-0 | 0, 2, 8, 10 | $\bar{B}\bar{D}$ |
| PI₇ | --10 | 2, 6, 10, 14 | $C\bar{D}$ |

To convert a pattern to a Boolean expression:
- A 0 in position $i$ means the variable appears complemented
- A 1 in position $i$ means the variable appears uncomplemented
- A dash in position $i$ means the variable is absent from the term

!!! warning "Common Mistake"
    Students sometimes confuse which terms are prime implicants. Remember: only **unchecked** terms are prime implicants. A term with a check mark has been absorbed into a larger grouping and is not a prime implicant.

## 6.6 The Prime Implicant Chart

The prime implicant chart (also called the selection table or covering table) determines which prime implicants to include in the final minimal expression. The chart has:

- **Rows:** One for each prime implicant
- **Columns:** One for each minterm in the original function
- **Marks (×):** Placed where a prime implicant covers a minterm

| PI | Pattern | 0 | 1 | 2 | 5 | 6 | 7 | 8 | 9 | 10 | 14 |
|----|---------|---|---|---|---|---|---|---|---|----|-----|
| PI₁ | 0-01 | | × | | × | | | | | | |
| PI₂ | -001 | | × | | | | | | × | | |
| PI₃ | 01-1 | | | | × | | × | | | | |
| PI₄ | 011- | | | | | × | × | | | | |
| PI₅ | -00- | × | × | | | | | × | × | | |
| PI₆ | -0-0 | × | | × | | | | × | | × | |
| PI₇ | --10 | | | × | | × | | | | × | × |

**Finding Essential Prime Implicants:**

An essential prime implicant (EPI) is a prime implicant that is the only one covering some minterm. In the chart, look for columns with only one × mark.

- Column 7: Only PI₃ and PI₄ cover minterm 7 → Not unique
- Column 14: Only PI₇ covers minterm 14 → **PI₇ is essential**

In this example, examining each column:
- Minterm 0: Covered by PI₅, PI₆
- Minterm 1: Covered by PI₁, PI₂, PI₅
- Minterm 2: Covered by PI₆, PI₇
- Minterm 5: Covered by PI₁, PI₃
- Minterm 6: Covered by PI₄, PI₇
- Minterm 7: Covered by PI₃, PI₄
- Minterm 8: Covered by PI₅, PI₆
- Minterm 9: Covered by PI₂, PI₅
- Minterm 10: Covered by PI₆, PI₇
- Minterm 14: Covered by PI₇ only → **PI₇ is essential**

Since PI₇ is essential, we must include it. PI₇ covers minterms {2, 6, 10, 14}.

## 6.7 Row and Column Dominance

After selecting essential prime implicants, we may need additional techniques to reduce the prime implicant chart before finding a minimum cover.

**Column Dominance:**
A column $j$ dominates column $k$ if every prime implicant that covers minterm $k$ also covers minterm $j$. The dominated column $j$ can be removed from the chart because covering $k$ automatically covers $j$.

**Row Dominance:**
A row (prime implicant) $P_i$ dominates row $P_j$ if $P_i$ covers every minterm that $P_j$ covers. If they have equal cost, the dominated row $P_j$ can be eliminated since $P_i$ is at least as good.

Applying these rules iteratively can significantly reduce the complexity of the remaining selection problem.

**Reduced Chart after selecting PI₇:**

Minterms still to cover: {0, 1, 5, 7, 8, 9}

| PI | 0 | 1 | 5 | 7 | 8 | 9 |
|----|---|---|---|---|---|---|
| PI₁ | | × | × | | | |
| PI₂ | | × | | | | × |
| PI₃ | | | × | × | | |
| PI₄ | | | | × | | |
| PI₅ | × | × | | | × | × |
| PI₆ | × | | | | × | |

Now we can observe:
- PI₄ only covers minterm 7, which PI₃ also covers (plus minterm 5)
- PI₄ is dominated by PI₃ → Remove PI₄

After removing PI₄ and checking further, PI₅ covers {0, 1, 8, 9} which is a superset of what PI₂ covers {1, 9} plus PI₆'s coverage of {0, 8}.

## 6.8 Petrick's Method

When the prime implicant chart cannot be fully reduced by row/column dominance and essential prime implicant selection, **Petrick's method** provides an algebraic approach to finding all minimum covers.

The method constructs a Boolean expression where:
- Each prime implicant has a Boolean variable ($P_1, P_2, \ldots$)
- For each minterm column, form a sum (OR) of the PIs that cover it
- Multiply (AND) all these sums together
- Expand and simplify to find minimum covers

**Example:** For remaining minterms {0, 1, 5, 7} with PIs:
- Minterm 0: Covered by PI₅ or PI₆ → $(P_5 + P_6)$
- Minterm 1: Covered by PI₁, PI₂, or PI₅ → $(P_1 + P_2 + P_5)$
- Minterm 5: Covered by PI₁ or PI₃ → $(P_1 + P_3)$
- Minterm 7: Covered by PI₃ → $(P_3)$

Petrick's function:
$$P = (P_5 + P_6)(P_1 + P_2 + P_5)(P_1 + P_3)(P_3)$$

Since $P_3$ must be true (minterm 7), we get:
$$P = (P_5 + P_6)(P_1 + P_2 + P_5)(P_1 + P_3)$$

With $P_3 = 1$: $(P_1 + P_3) = 1$

$$P = (P_5 + P_6)(P_1 + P_2 + P_5)$$

Expanding:
$$P = P_1P_5 + P_2P_5 + P_5 + P_1P_6 + P_2P_6 + P_5P_6$$

By absorption ($P_5$ absorbs $P_1P_5$, $P_2P_5$, $P_5P_6$):
$$P = P_5 + P_1P_6 + P_2P_6$$

Minimum covers include:
- {PI₃, PI₅, PI₇} → $P_3P_5P_7$
- {PI₃, PI₆, PI₇, PI₁} → $P_1P_3P_6P_7$
- {PI₃, PI₆, PI₇, PI₂} → $P_2P_3P_6P_7$

The first solution has 3 prime implicants, making it the minimum cover.

#### Diagram: Prime Implicant Chart Interactive

<iframe src="../sims/pi-chart-interactive/main.html" width="100%" height="582px" scrolling="no"></iframe>

<details markdown="1">
<summary>Prime Implicant Chart Interactive Specification</summary>
Type: microsim

Bloom Level: Analyze (L4)
Bloom Verb: Examine, differentiate

Learning Objective: Students will be able to analyze a prime implicant chart to identify essential prime implicants, apply row and column dominance, and determine a minimum cover.

Visual Elements:
- Main display: Interactive prime implicant chart as a grid
- Columns: Minterms (numbered)
- Rows: Prime implicants (labeled with pattern and Boolean expression)
- Marks: × symbols showing coverage
- Color coding:
  - Essential PI rows: Green background
  - Selected PIs: Blue background
  - Eliminated PIs: Red strikethrough
  - Covered minterms: Gray columns
  - Single-cover columns (indicates EPI): Gold highlight

Interactive Controls:
- Input: Enter minterms and prime implicants, or use example
- Button: "Find Essential PIs" - highlights columns with single ×
- Button: "Apply Row Dominance" - identifies and optionally removes dominated rows
- Button: "Apply Column Dominance" - identifies and optionally removes dominated columns
- Clickable rows: Select/deselect prime implicants manually
- Display: Running count of selected PIs, literals, and remaining uncovered minterms
- Button: "Check Solution" - verifies if all minterms are covered
- Button: "Reset"

Behavior:
- When "Find Essential PIs" clicked, scan columns and highlight those with single ×
- Auto-select essential PIs and gray out covered minterm columns
- Row/column dominance shows relationships with dotted lines before removal
- Manual selection updates the "uncovered minterms" display in real-time
- "Check Solution" validates coverage and displays result

Data Visibility Requirements:
- Initial: Full chart with all PIs and minterms
- After EPI selection: Show which minterms are now covered
- After dominance: Show reduced chart
- Solution: Show final selected PIs and Boolean expression

Instructional Rationale: The chart analysis process requires students to examine relationships between prime implicants and minterms. Interactive exploration allows trying different selection strategies to find minimum solutions.

Canvas Size: 900x550 pixels, responsive
Implementation: p5.js with HTML table overlay
</details>

## 6.9 Cyclic Prime Implicant Charts

A **cyclic prime implicant chart** occurs when:
- There are no essential prime implicants
- Row and column dominance cannot reduce the chart
- Multiple equivalent minimum solutions exist

In such cases, Petrick's method must be applied to the full chart. The resulting minimum cover may not be unique—multiple selections of prime implicants may yield expressions with the same minimal cost.

**Example of a cyclic chart:**

Consider $F(A,B,C) = \sum m(0, 1, 2, 5, 6, 7)$

The prime implicants are:
- PI₁: $\bar{A}\bar{B}$ (covers 0, 1)
- PI₂: $\bar{A}\bar{C}$ (covers 0, 2)
- PI₃: $\bar{B}C$ (covers 1, 5)
- PI₄: $B\bar{C}$ (covers 2, 6)
- PI₅: $\bar{A}B$ (covers 6, 7)
- PI₆: $AC$ (covers 5, 7)

| PI | 0 | 1 | 2 | 5 | 6 | 7 |
|----|---|---|---|---|---|---|
| PI₁ | × | × | | | | |
| PI₂ | × | | × | | | |
| PI₃ | | × | | × | | |
| PI₄ | | | × | | × | |
| PI₅ | | | | | × | × |
| PI₆ | | | | × | | × |

Every column has exactly two ×'s—no essential prime implicants exist. This is a cyclic chart requiring Petrick's method.

Two minimum solutions exist:
- $F = \bar{A}\bar{B} + B\bar{C} + AC$ (PI₁ + PI₄ + PI₆)
- $F = \bar{A}\bar{C} + \bar{B}C + \bar{A}B$ (PI₂ + PI₃ + PI₅)

Both solutions use 3 prime implicants with 6 literals each.

## 6.10 Handling Don't Care Conditions

Don't care conditions are handled naturally in the QM method. During the combination phase, don't care minterms are included along with the required minterms. They participate in combinations, potentially creating larger prime implicants.

However, in the prime implicant chart:
- Don't care minterms do **not** appear as columns
- Only the required minterms (ON-set) must be covered
- Don't cares may help create prime implicants that cover required minterms more efficiently

**Example:** $F(A,B,C,D) = \sum m(1, 3, 5, 7, 9) + d(6, 12, 13)$

1. In the combination table, include minterms {1, 3, 5, 6, 7, 9, 12, 13}
2. Combine as usual to find all prime implicants
3. In the PI chart, only include columns for {1, 3, 5, 7, 9}
4. Prime implicants that exist because of don't care combinations are valid

!!! example "Don't Care Benefit"
    Minterm 6 (0110) might combine with minterm 7 (0111) to form 011- ($\bar{A}BC$). If this prime implicant helps cover required minterms more efficiently, it provides optimization that wouldn't exist without the don't care.

## 6.11 Computational Complexity

The QM method, while systematic, has exponential worst-case complexity:

- **Number of prime implicants:** Can be as large as $3^n / n$ for $n$ variables
- **Prime implicant chart:** Can have exponentially many rows and columns
- **Minimum cover problem:** NP-complete in general

For functions with many variables (>15-20), the basic QM method becomes computationally impractical. Modern EDA tools use heuristic algorithms like ESPRESSO that:

- Use different representations (cubes, covers)
- Apply heuristic reduction techniques
- Trade guaranteed optimality for practical computation time
- Often find near-optimal or optimal solutions quickly

| Variables | Approx. Max Prime Implicants | Practical? |
|-----------|------------------------------|------------|
| 4 | ~20 | Yes |
| 6 | ~100 | Yes |
| 10 | ~5,900 | Challenging |
| 15 | ~950,000 | Requires heuristics |
| 20 | ~58,000,000 | Impractical (exact) |

Despite its complexity, the QM method remains important because:
- It provides the theoretical foundation for understanding minimization
- It guarantees optimal solutions for functions where K-maps are impractical but exact solutions are needed
- It illustrates fundamental concepts used in more advanced algorithms

#### Diagram: QM Complexity Visualization

<iframe src="../sims/qm-complexity-chart/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>QM Complexity Visualization Specification</summary>
Type: chart

Bloom Level: Evaluate (L5)
Bloom Verb: Assess, compare

Learning Objective: Students will be able to assess when the QM method is practical versus when heuristic methods are preferred based on problem size.

Chart Type: Dual-axis line chart

Purpose: Visualize the exponential growth of QM computational requirements as variable count increases, compared to heuristic methods.

X-axis: Number of variables (2 to 20)
Y-axis 1 (left, logarithmic): Computation time (relative units)
Y-axis 2 (right, logarithmic): Maximum number of prime implicants

Data Series:
1. QM Method Time (red line, exponential growth)
   - 2 vars: 1
   - 4 vars: 10
   - 6 vars: 100
   - 8 vars: 2,000
   - 10 vars: 50,000
   - 15 vars: 10,000,000
   - 20 vars: 10,000,000,000

2. ESPRESSO Heuristic Time (green line, polynomial growth)
   - 2 vars: 1
   - 4 vars: 5
   - 6 vars: 20
   - 8 vars: 80
   - 10 vars: 300
   - 15 vars: 2,000
   - 20 vars: 10,000

3. Max Prime Implicants (blue dashed line)
   - Following 3^n / n formula

Annotations:
- Vertical line at n=6: "K-map practical limit"
- Vertical line at n=15: "QM practical limit"
- Shaded region for "Exact methods practical"
- Shaded region for "Heuristics recommended"

Title: "Computational Complexity: Exact vs. Heuristic Minimization"
Legend: Position bottom

Interactive features (if implemented as MicroSim):
- Hover to see exact values
- Toggle series visibility
- Slider to adjust scale

Implementation: Chart.js or p5.js
Canvas Size: 800x450 pixels, responsive
</details>

## 6.12 Multi-Output Minimization

Many digital systems have multiple output functions sharing the same input variables. Multi-output minimization seeks to share product terms across multiple functions to minimize the total gate count.

**Example:** Two functions sharing inputs A, B, C:
- $F_1 = \sum m(1, 3, 5, 7)$
- $F_2 = \sum m(3, 4, 5, 6, 7)$

Minimizing separately:
- $F_1 = C$ (one product term)
- $F_2 = B + AC$ (two product terms)
- Total: 3 product terms

But notice that $AC$ could be shared if we express $F_1 = \bar{B}C + BC = C$. If a shared term $BC$ is used:
- $F_1 = \bar{B}C + BC$
- $F_2 = B + AC$
- Shared term: None obvious in this case

The QM method can be extended for multi-output minimization by:
1. Computing prime implicants for each function individually
2. Computing "shared" prime implicants that cover minterms in multiple functions
3. Building a modified prime implicant chart that accounts for sharing
4. Selecting a minimum cover that minimizes total gates

Modern tools like ESPRESSO-MV (multi-valued) handle multi-output minimization efficiently.

## 6.13 QM Method Summary and Complete Example

Let us work through a complete example systematically.

**Problem:** Minimize $F(A, B, C, D) = \sum m(0, 2, 5, 6, 7, 8, 10, 12, 13, 14, 15)$

**Step 1: Group minterms by number of 1s**

| Group | Minterm | Binary |
|-------|---------|--------|
| 0 | 0 | 0000 |
| 1 | 2 | 0010 |
| 1 | 8 | 1000 |
| 2 | 5 | 0101 |
| 2 | 6 | 0110 |
| 2 | 10 | 1010 |
| 2 | 12 | 1100 |
| 3 | 7 | 0111 |
| 3 | 13 | 1101 |
| 3 | 14 | 1110 |
| 4 | 15 | 1111 |

**Step 2: First combination**

| Minterms | Pattern | ✓ |
|----------|---------|---|
| 0,2 | 00-0 | ✓ |
| 0,8 | -000 | ✓ |
| 2,6 | 0-10 | ✓ |
| 2,10 | -010 | ✓ |
| 8,10 | 10-0 | ✓ |
| 8,12 | 1-00 | ✓ |
| 5,7 | 01-1 | ✓ |
| 5,13 | -101 | ✓ |
| 6,7 | 011- | ✓ |
| 6,14 | -110 | ✓ |
| 10,14 | 1-10 | ✓ |
| 12,13 | 110- | ✓ |
| 12,14 | 11-0 | ✓ |
| 7,15 | -111 | ✓ |
| 13,15 | 11-1 | ✓ |
| 14,15 | 111- | ✓ |

**Step 3: Second combination**

| Minterms | Pattern | ✓ |
|----------|---------|---|
| 0,2,8,10 | -0-0 | |
| 2,6,10,14 | --10 | |
| 8,10,12,14 | 1--0 | |
| 5,7,13,15 | -1-1 | |
| 6,7,14,15 | -11- | |
| 12,13,14,15 | 11-- | |

**Step 4: No further combinations possible. Prime Implicants:**

| PI | Pattern | Minterms | Expression |
|----|---------|----------|------------|
| PI₁ | -0-0 | 0,2,8,10 | $\bar{B}\bar{D}$ |
| PI₂ | --10 | 2,6,10,14 | $C\bar{D}$ |
| PI₃ | 1--0 | 8,10,12,14 | $A\bar{D}$ |
| PI₄ | -1-1 | 5,7,13,15 | $BD$ |
| PI₅ | -11- | 6,7,14,15 | $BC$ |
| PI₆ | 11-- | 12,13,14,15 | $AB$ |

**Step 5: Prime Implicant Chart**

| PI | 0 | 2 | 5 | 6 | 7 | 8 | 10 | 12 | 13 | 14 | 15 |
|----|---|---|---|---|---|---|----|----|----|----|-----|
| PI₁ | × | × | | | | × | × | | | | |
| PI₂ | | × | | × | | | × | | | × | |
| PI₃ | | | | | | × | × | × | | × | |
| PI₄ | | | × | | × | | | | × | | × |
| PI₅ | | | | × | × | | | | | × | × |
| PI₆ | | | | | | | | × | × | × | × |

**Step 6: Find Essential Prime Implicants**

- Column 0: Only PI₁ → **PI₁ is essential**
- Column 5: Only PI₄ → **PI₄ is essential**

Select PI₁ and PI₄. Covered minterms: {0, 2, 5, 7, 8, 10, 13, 15}

Remaining minterms: {6, 12, 14}

**Step 7: Reduced chart**

| PI | 6 | 12 | 14 |
|----|---|----|----|
| PI₂ | × | | × |
| PI₃ | | × | × |
| PI₅ | × | | × |
| PI₆ | | × | × |

Minterm 6: PI₂ or PI₅
Minterm 12: PI₃ or PI₆
Minterm 14: All four PIs

We need at least one from {PI₂, PI₅} for minterm 6 and one from {PI₃, PI₆} for minterm 12.

Minimum solutions:
- PI₁ + PI₄ + PI₂ + PI₃ = $\bar{B}\bar{D} + BD + C\bar{D} + A\bar{D}$
- PI₁ + PI₄ + PI₂ + PI₆ = $\bar{B}\bar{D} + BD + C\bar{D} + AB$
- PI₁ + PI₄ + PI₅ + PI₃ = $\bar{B}\bar{D} + BD + BC + A\bar{D}$
- PI₁ + PI₄ + PI₅ + PI₆ = $\bar{B}\bar{D} + BD + BC + AB$

All solutions have 4 product terms and 8 literals.

**Final Answer:** $F = \bar{B}\bar{D} + BD + C\bar{D} + A\bar{D}$ (or any equivalent minimum solution)

#### Diagram: Complete QM Method Walkthrough

<iframe src="../sims/qm-complete-walkthrough/main.html" width="100%" height="652px" scrolling="no"></iframe>

<details markdown="1">
<summary>Complete QM Method Walkthrough Specification</summary>
Type: microsim

Bloom Level: Create (L6)
Bloom Verb: Construct, develop

Learning Objective: Students will be able to construct a complete QM minimization solution from start to finish, including grouping, combination, prime implicant identification, chart construction, and minimum cover selection.

Visual Elements:
- Four-panel layout:
  1. Top-left: Minterm input and grouping table
  2. Top-right: Combination table with iterative columns
  3. Bottom-left: Prime implicant chart
  4. Bottom-right: Solution summary with Boolean expression

Interactive Controls:
- Input field: Enter minterm list
- Input field: Enter don't care list (optional)
- Dropdown: Number of variables (3, 4, 5, 6)
- Mode selector: "Step-by-step" or "Automatic"
- Step-by-step controls:
  - "Next Step" button
  - "Previous Step" button
  - Current step indicator
- "Generate Full Solution" button
- "Export Solution" button (copy to clipboard)
- "New Problem" button

Step-by-Step Sequence:
1. Enter minterms → Display grouped table
2. First combination → Show all possible pairs, highlight valid combinations
3. Second combination → Continue combining
4. Mark prime implicants → Highlight unchecked terms
5. Build PI chart → Display coverage matrix
6. Find essential PIs → Highlight single-cover columns
7. Apply dominance (if applicable)
8. Select remaining PIs → Show minimum cover options
9. Display final expression

Data Visibility Requirements:
- Each step shows intermediate results clearly
- Transitions highlight what changed
- Final summary shows all prime implicants used and Boolean expression
- Cost metrics: number of terms, number of literals

Instructional Rationale: The Create level requires students to synthesize all QM steps into a complete solution. This comprehensive simulator serves as both a learning tool and a verification system for hand-computed solutions.

Canvas Size: 1000x700 pixels, responsive with collapsible panels
Implementation: p5.js
</details>

## 6.14 Computer Implementation

The QM method's systematic nature makes it well-suited for computer implementation. A basic implementation involves:

**Data Structures:**
- Minterms stored as integers or bit vectors
- Implicants stored with pattern (binary + dash positions) and coverage set
- Chart represented as a sparse matrix or adjacency list

**Algorithm Pseudocode:**

```
function QuineMcCluskey(minterms, dontcares, num_vars):
    # Step 1: Initialize with minterms and don't cares
    terms = minterms ∪ dontcares
    all_prime_implicants = []

    # Step 2: Group by number of 1s
    groups = group_by_ones_count(terms, num_vars)

    # Step 3: Iterative combination
    while groups is not empty:
        new_groups = {}
        combined = set()

        for each adjacent pair (group_i, group_j):
            for term_a in group_i:
                for term_b in group_j:
                    if can_combine(term_a, term_b):
                        new_term = combine(term_a, term_b)
                        add new_term to new_groups
                        mark term_a, term_b as combined

        # Uncombined terms are prime implicants
        for term in all terms not in combined:
            add term to all_prime_implicants

        groups = new_groups

    # Step 4: Build prime implicant chart (exclude don't cares)
    chart = build_chart(all_prime_implicants, minterms)

    # Step 5: Find minimum cover
    solution = find_minimum_cover(chart)

    return solution
```

**Key Functions:**

- `can_combine(a, b)`: Check if two terms differ in exactly one bit (dashes must align)
- `combine(a, b)`: Create new term with dash in differing position
- `find_minimum_cover(chart)`: Apply EPI selection, dominance, and Petrick's method

Modern implementations use additional optimizations:
- Signature-based hashing for faster combination checking
- Column/row dominance applied incrementally
- Branch-and-bound for minimum cover selection

## 6.15 Summary and Key Takeaways

The Quine-McCluskey method provides a rigorous, algorithmic approach to Boolean function minimization:

**Key Concepts:**

- **Binary grouping:** Organize minterms by 1-count to reduce comparisons
- **Systematic combination:** Combine adjacent groups, mark combined terms
- **Dash notation:** Represents eliminated variables in combined terms
- **Prime implicants:** Unchecked terms that cannot be further combined
- **PI chart:** Maps prime implicants to minterms they cover
- **Essential PIs:** Must be included (unique coverage)
- **Row/column dominance:** Simplifies the selection problem
- **Petrick's method:** Algebraically finds all minimum covers
- **Cyclic charts:** No EPIs exist; require Petrick's method

**Advantages:**

- Works for any number of variables
- Guarantees finding all prime implicants
- Produces verifiable, step-by-step solutions
- Foundation for computer-aided design tools

**Limitations:**

- Exponential worst-case complexity
- Impractical for functions with many variables (>15-20)
- Manual application is tedious for larger functions

**When to Use:**

| Method | Best For |
|--------|----------|
| Boolean algebra | Simple expressions, quick simplifications |
| K-maps | 2-5 variable functions, visual learners |
| QM method | 5-15 variable functions, exact solutions needed |
| Heuristics (ESPRESSO) | Large functions, near-optimal solutions acceptable |

---

## Self-Check Questions

??? question "What determines which minterms can be combined in the QM method?"
    Two minterms (or implicants) can be combined if and only if:

    1. They differ in exactly one bit position
    2. Any dash positions must be in the same location

    The grouping by number of 1s ensures we only compare minterms that could potentially differ by one bit, since such minterms must have 1-counts differing by exactly one.

??? question "How do you identify a prime implicant in the QM method?"
    A prime implicant is any term that:

    - Remains **unchecked** after all combination iterations
    - Cannot be combined with any other term to form a larger grouping

    Terms that get combined with others receive a check mark (✓) and are not prime implicants.

??? question "What makes a prime implicant 'essential'?"
    A prime implicant is **essential** if it is the **only** prime implicant that covers some minterm. In the PI chart, this appears as a column with exactly one × mark.

    Essential prime implicants must be included in any minimum solution.

??? question "When is Petrick's method needed?"
    Petrick's method is needed when:

    - All essential prime implicants have been selected
    - Row and column dominance cannot further reduce the chart
    - Multiple prime implicants remain that could cover the remaining minterms

    This often occurs with **cyclic** prime implicant charts where no single PI has unique coverage.

??? question "How does the QM method handle don't care conditions?"
    Don't cares are handled in two stages:

    1. **Combination phase:** Include don't care minterms with regular minterms. They participate in combinations, potentially creating larger prime implicants.

    2. **Chart phase:** Don't care minterms are **excluded** from the PI chart columns. Only the required (ON-set) minterms appear as columns that must be covered.

    This allows don't cares to contribute to optimization without requiring coverage.

??? question "What is the primary advantage of QM over K-maps? What is its main disadvantage?"
    **Primary advantage:** The QM method works for functions with any number of variables and can be easily programmed for computer implementation. It provides a systematic, verifiable procedure that doesn't rely on visual pattern recognition.

    **Main disadvantage:** The QM method has exponential worst-case complexity. The number of prime implicants and the size of the covering problem can grow exponentially with the number of variables, making it impractical for very large functions.

---

[See Annotated References](./references.md)
