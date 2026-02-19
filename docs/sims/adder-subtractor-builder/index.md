---
title: Adder-Subtractor Builder
description: Build and understand adder-subtractor circuits
quality_score: 85
---

# Adder-Subtractor Builder

<iframe src="main.html" height="550px" width="100%" scrolling="no"></iframe>


## Description

Explore how a single circuit can perform both addition and subtraction by using XOR gates to conditionally complement the B input and using the mode bit as carry-in.

## Learning Objectives

**Bloom Level**: Create (L6)

- Design an adder-subtractor circuit
- Explain how two's complement enables subtraction
- Apply the principle of controlled inversion

## Key Concepts

### Addition Mode (M=0)
- B passes through XOR unchanged
- Carry-in = 0
- Result = A + B

### Subtraction Mode (M=1)
- B is inverted by XOR (one's complement)
- Carry-in = 1 (completes two's complement)
- Result = A + B' + 1 = A - B

## How to Use

1. Select Addition or Subtraction mode
2. Adjust A and B values with sliders
3. Observe how the circuit adapts
4. Note the XOR gate behavior changes

## References

- Unit 3: Applications of Boolean Algebra - Arithmetic Circuits
