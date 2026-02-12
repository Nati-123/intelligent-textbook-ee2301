# Unit 5 — Karnaugh Maps — Narration Script

**Duration:** ~2–3 minutes
**Voice:** Friendly, educational narrator
**Audience:** Undergraduate engineering students

---

## Script

Welcome to Unit 5, where we learn one of the most elegant tools in a digital designer's toolkit — the Karnaugh map, or K-map for short. If Boolean algebra gives you the rules for simplification and canonical forms give you the starting point, the K-map gives you a visual method to find the simplest possible expression quickly and reliably.

A Karnaugh map is a grid that rearranges the rows of a truth table so that physically adjacent cells differ by exactly one variable. This arrangement relies on Gray code ordering along the rows and columns — a sequence where only one bit changes at a time. The magic is that when two adjacent cells both contain a one, the variable that changes between them cancels out, eliminating it from the resulting product term. That is the core insight: adjacency on the map corresponds directly to algebraic simplification.

Building a K-map is straightforward. For two variables, you draw a two-by-two grid. Three variables give you a two-by-four grid, four variables produce a four-by-four grid, and five-variable maps use two stacked four-by-four grids. Once the map is drawn, you place ones in the cells that correspond to the minterms of your function, and the grouping begins.

Your goal is to circle rectangular groups of ones, where every group must contain a power-of-two number of cells — one, two, four, eight, and so on. Groups can wrap around the edges because the K-map is logically a torus. Each group corresponds to a simplified product term, and the variables that stay constant within the group are the literals that remain.

Not all groups are created equal. A prime implicant is a group that cannot be made any larger. An essential prime implicant covers at least one minterm not covered by any other prime implicant — you must include it in your final expression. The strategy is to identify all essential prime implicants first, then cover any remaining minterms with the fewest additional prime implicants. This yields a minimal Sum of Products expression. A similar procedure using groups of zeros gives you a minimal Product of Sums.

Don't care conditions once again prove invaluable here. Because don't cares can be treated as either one or zero, you can include them in your groups to make those groups larger, producing fewer literals and a simpler circuit. However, don't cares should never be the sole reason a group exists — they are helpers, not requirements.

By the end of this unit, you will be able to look at a K-map and see the minimal expression almost at a glance — a skill that combines visual pattern recognition with algebraic reasoning.

---

## Key Takeaways

1. Gray code ordering on the K-map ensures that adjacent cells differ by one variable, so grouping adjacent ones directly eliminates variables from the expression.
2. Prime implicants and essential prime implicants guide you toward the minimal expression — always identify essentials first, then cover the rest.
3. Don't care conditions can be included in groups to create larger groupings, leading to simpler, more efficient circuit implementations.
