---
title: K-map with Don't Cares
description: Practice K-map simplification with don't cares
quality_score: 85
---

# K-map with Don't Cares

<iframe src="main.html" height="550px" width="100%" scrolling="no"></iframe>


## Description

Practice K-map simplification when don't care conditions are present. See how treating don't cares as 1s enables larger groupings and simpler expressions.

## Learning Objectives

**Bloom Level**: Apply (L3)

- Apply K-map simplification with don't cares
- Decide when to include don't cares in groups
- Compare expressions with and without optimization

## Don't Care Usage

Don't care cells (X) can be treated as either 0 or 1:
- Include in a group if it makes the group larger
- Omit from a group if it doesn't help simplification
- Goal: Choose values that minimize the final expression

## Example: BCD > 5

For BCD inputs (0-9), values 10-15 never occur:
- Minterms: 6, 7, 8, 9 (digits greater than 5)
- Don't cares: 10, 11, 12, 13, 14, 15

**Without don't cares**: Complex expression
**With don't cares**: F = A + BC (much simpler!)

## How to Use

1. Click cells to cycle through 0 → 1 → X
2. Use "BCD > 5" preset for the example
3. Click "Show Optimal" to see optimal groupings
4. Compare the simplified vs unsimplified expressions

## References

- Unit 5: Karnaugh Maps - Don't Care Conditions
