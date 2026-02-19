---
title: Shannon Expansion Explorer
description: Explore Shannon's expansion theorem
quality_score: 85
---

# Shannon Expansion Explorer

<iframe src="main.html" height="570px" width="100%" scrolling="no"></iframe>


## Description

Explore Shannon's Expansion Theorem, which allows any Boolean function to be decomposed into cofactors. This is the foundation for multiplexer implementation and Binary Decision Diagrams.

## Learning Objectives

**Bloom Level**: Analyze (L4)

- Analyze function decomposition using Shannon expansion
- Calculate positive and negative cofactors
- Apply expansion to multiplexer implementation

## Shannon's Theorem

**F = x' · F|x=0 + x · F|x=1**

Where:
- **F|x=0** is the cofactor when x=0 (substitute x=0 in F)
- **F|x=1** is the cofactor when x=1 (substitute x=1 in F)

## Applications

1. **Multiplexer Implementation**: Cofactors become MUX data inputs
2. **BDD Construction**: Recursive decomposition builds decision diagrams
3. **FPGA Mapping**: Function decomposition for lookup tables

## How to Use

1. Select a Boolean function
2. Choose which variable to expand on
3. Observe the cofactors F|x=0 and F|x=1
4. See the resulting expanded form

## References

- Unit 4: Minterm and Maxterm Expansions - Shannon Decomposition
