---
title: QM Complete Walkthrough
description: Comprehensive Quine-McCluskey solver showing all algorithm steps from minterms to minimal Boolean expression
image: /sims/qm-complete-walkthrough/qm-complete-walkthrough.png
quality_score: 90
---

# QM Complete Walkthrough

<iframe src="main.html" height="652px" width="100%" scrolling="no"></iframe>

[Run the QM Complete Walkthrough Fullscreen](./main.html){ .md-button .md-button--primary }

## Description

This comprehensive MicroSim implements the complete Quine-McCluskey algorithm from start to finish. Enter any set of minterms and optional don't care conditions, and see all four steps of the algorithm displayed simultaneously:

1. **Step 1: Grouping** - Minterms organized by number of 1s
2. **Step 2: Combination** - Iterative combining with dash notation
3. **Step 3: Prime Implicants** - All PIs identified, essentials marked with *
4. **Step 4: Minimum Cover** - Final solution with Boolean expression

This tool can be used to verify hand-computed solutions or to quickly solve minimization problems.

## Iframe Embedding

```html
<iframe src="https://[your-site]/sims/qm-complete-walkthrough/main.html" height="652px" scrolling="no" width="100%"></iframe>
```

## Features

- **Full Algorithm Implementation**: All QM steps executed correctly
- **Don't Care Support**: Enter optional don't care conditions
- **3-5 Variable Support**: Works with 3, 4, or 5 input variables
- **Essential PI Identification**: Marked with green asterisk
- **Copy Result**: One-click copy of final expression
- **Metrics**: Shows term count and literal count

## How to Use

1. **Enter Minterms**: Comma-separated list (e.g., "0,2,5,6,7,8,10,12,13,14,15")
2. **Enter Don't Cares** (optional): Comma-separated list
3. **Select Variables**: 3, 4, or 5
4. **Click Generate**: See complete solution in four panels
5. **Copy Result**: Click to copy final expression

## Learning Objectives

**Bloom Level**: Create (L6)
**Bloom Verb**: Construct, develop

After using this MicroSim, students will be able to:

- Construct a complete QM solution from any minterm specification
- Develop systematic approaches to Boolean minimization
- Produce minimal SOP expressions using the QM method
- Verify hand-computed solutions against algorithmic results

## Lesson Plan

### Practice Session (20 minutes)
1. Solve a problem by hand first
2. Enter the same minterms into the MicroSim
3. Compare your result to the generated solution
4. Try problems with don't care conditions
5. Experiment with different minterm sets

### Verification Exercise
- Use the tool to check homework problems
- Identify where mistakes were made in manual solutions
- Understand why certain PIs are essential

## Example Problems

| Minterms | Don't Cares | Variables |
|----------|-------------|-----------|
| 0,1,2,5,6,7,8,9,10,14 | - | 4 |
| 0,2,5,6,7,8,10,12,13,14,15 | - | 4 |
| 1,3,5,7,9 | 6,12,13 | 4 |
| 0,1,2,5,6,7 | - | 3 |

## References

- [Quine-McCluskey Algorithm - Wikipedia](https://en.wikipedia.org/wiki/Quine%E2%80%93McCluskey_algorithm)
- Unit 6: Quine-McCluskey Method in this textbook
