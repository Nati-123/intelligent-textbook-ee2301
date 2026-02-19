---
title: K-map 3-Variable Simulator
description: Interactive 3-variable Karnaugh map
quality_score: 85
---

# K-map 3-Variable Simulator

<iframe src="main.html" height="550px" width="100%" scrolling="no"></iframe>


## Description

Practice K-map simplification with an interactive 3-variable Karnaugh map. Click cells to set minterms and see groupings for simplification.

## Learning Objectives

**Bloom Level**: Apply (L3)

- Apply K-map simplification to 3-variable functions
- Identify valid groupings (pairs, quads)
- Derive simplified Boolean expressions

## K-map Layout

```
        BC
      00 01 11 10
A  0 | m0 m1 m3 m2
   1 | m4 m5 m7 m6
```

Gray code ordering ensures adjacent cells differ by one bit.

## Grouping Rules

- Groups must be powers of 2 (1, 2, 4, 8)
- Groups must be rectangular
- Larger groups = simpler terms
- Groups can wrap around edges

## How to Use

1. Click cells to toggle between 0 and 1
2. Click "Show Groups" to see valid groupings
3. Observe the simplified expression
4. Use "Clear All" or "Fill All" to reset

## References

- Unit 5: Karnaugh Maps - 3-Variable Maps
