---
title: SOP-POS Converter
description: Convert between Sum of Products and Product of Sums forms
quality_score: 85
---

# SOP-POS Converter

<iframe src="main.html" height="560px" width="100%" scrolling="no"></iframe>


## Description

Convert Boolean functions between Sum of Products (SOP) and Product of Sums (POS) canonical forms. Understand how minterms and maxterms are complementary.

## Learning Objectives

**Bloom Level**: Apply (L3)

- Apply conversion between SOP and POS forms
- Identify minterms and maxterms from function specification
- Understand the duality of canonical forms

## Canonical Forms

### Sum of Products (SOP)
- F = Σm(minterm indices)
- OR of AND terms (minterms)
- Uses minterms where F = 1

### Product of Sums (POS)
- F = ΠM(maxterm indices)
- AND of OR terms (maxterms)
- Uses maxterms where F = 0

## Conversion Rule

**Maxterm indices = All indices - Minterm indices**

If F = Σm(1,2,5,6) for 3 variables:
- All terms: {0,1,2,3,4,5,6,7}
- Maxterms: {0,3,4,7}
- F = ΠM(0,3,4,7)

## How to Use

1. Select a function example
2. Study the minterm (SOP) representation
3. See how maxterms are derived
4. Compare the POS equivalent

## References

- Unit 4: Minterm and Maxterm Expansions
