---
title: Minterm/Maxterm Converter
description: Interactive tool for converting between canonical SOP and POS forms of Boolean functions
image: /sims/minterm-maxterm-converter/minterm-maxterm-converter.png
quality_score: 85
---

# Minterm/Maxterm Converter

<iframe src="main.html" height="500px" width="100%" scrolling="no"></iframe>

[Run the Minterm/Maxterm Converter Fullscreen](./main.html){ .md-button .md-button--primary }

## Description

This MicroSim demonstrates the relationship between minterms (for Sum of Products) and maxterms (for Product of Sums) in canonical Boolean function representation. Students can enter minterm indices and instantly see the corresponding maxterm indices, along with both the compact notation (Σ/Π) and expanded algebraic forms.

Key features:

- **Minterm to maxterm conversion**: Enter minterms, see maxterms automatically
- **Compact notation**: Displays both Σm() and ΠM() forms
- **Expanded expressions**: Shows the full algebraic SOP and POS forms
- **Truth table display**: Visual representation with minterm/maxterm indicators
- **Variable support**: Works with 2, 3, or 4 variables

## Iframe Embedding

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://[your-site]/sims/minterm-maxterm-converter/main.html" height="500px" scrolling="no" width="100%"></iframe>
```

## How to Use

1. **Enter minterm indices** as comma-separated values (e.g., "1,3,5,7")
2. **Select the number of variables** (2, 3, or 4)
3. **Click "Generate"** to see the conversion
4. **Study the results**: Compare SOP and POS forms
5. **Examine the truth table**: See which rows are minterms vs maxterms

## Learning Objectives

**Bloom Level**: Apply (L3)
**Bloom Verb**: Convert, derive, construct

After using this MicroSim, students will be able to:

- Convert between minterm (Σm) and maxterm (ΠM) notation
- Construct canonical SOP expressions from minterm indices
- Construct canonical POS expressions from maxterm indices
- Explain the complementary relationship between minterms and maxterms

## Lesson Plan

### Before the Simulation (5 minutes)
- Review minterm and maxterm definitions
- Discuss why canonical forms are useful

### During the Simulation (10 minutes)
1. Enter minterms for a simple function like XOR: 1,2 (for 2 variables)
2. Observe the automatic maxterm calculation
3. Compare the SOP and POS expanded forms
4. Try different functions and variable counts
5. Verify conversions using the truth table

### After the Simulation (5 minutes)
- Practice converting between notations without the tool
- Discuss when SOP vs POS is preferred

## References

- [Canonical Normal Form - Wikipedia](https://en.wikipedia.org/wiki/Canonical_normal_form)
- [Minterm - Wikipedia](https://en.wikipedia.org/wiki/Canonical_normal_form#Minterm)
- Unit 4: Minterm and Maxterm Expansions in this textbook
