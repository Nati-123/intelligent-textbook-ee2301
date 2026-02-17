---
title: SR Latch Simulator
description: Interactive SR latch built from cross-coupled NOR gates demonstrating set, reset, hold, and invalid states
image: /sims/sr-latch-simulator/sr-latch-simulator.png
quality_score: 85
---

# SR Latch Simulator

<iframe src="main.html" height="510px" width="100%" scrolling="no"></iframe>

[Run the SR Latch Simulator Fullscreen](./main.html){ .md-button .md-button--primary }

## Description

This MicroSim provides an interactive demonstration of the SR (Set-Reset) latch, the most fundamental memory element in digital electronics. The simulation displays a cross-coupled NOR gate implementation with two inputs (S and R) and two complementary outputs (Q and Q'), allowing students to explore all four input combinations and observe the resulting latch behavior in real time.

Students can toggle the S (Set) and R (Reset) inputs to observe how the latch stores a single bit of information. The simulation clearly illustrates the four operating states: Set (S=1, R=0), Reset (S=0, R=1), Hold (S=0, R=0), and the Invalid/Forbidden state (S=1, R=1) where both outputs are forced to the same value.

Key features include:

- Cross-coupled NOR gate circuit diagram with signal propagation
- Clickable S and R input toggles
- Real-time Q and Q' output display
- State identification showing the current operating mode
- Visual warning when the invalid state (S=1, R=1) is entered

## Iframe Embedding

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://Nati-123.github.io/intelligent-textbook-ee2301/sims/sr-latch-simulator/main.html" height="510px" scrolling="no" width="100%"></iframe>
```

## How to Use

1. Observe the SR latch circuit built from two cross-coupled NOR gates.
2. Click the **S (Set)** input to toggle it between 0 and 1.
3. Click the **R (Reset)** input to toggle it between 0 and 1.
4. Watch the Q and Q' outputs update based on the current and previous inputs.
5. Set S=1, R=0 to set the latch (Q=1, Q'=0).
6. Return to S=0, R=0 and observe that the output holds its previous value.
7. Set S=0, R=1 to reset the latch (Q=0, Q'=1).
8. Set S=1, R=1 to observe the invalid/forbidden state where Q and Q' are no longer complementary.

## Learning Objectives

**Bloom Level**: Analyze (L4)

After using this MicroSim, students will be able to:

- Explain the operation of an SR latch and describe how cross-coupled NOR gates create memory
- Predict the Q and Q' outputs for each combination of S and R inputs, including the hold state
- Analyze why the S=1, R=1 condition produces an invalid state and explain the resulting race condition

## Lesson Plan

### Before the Simulation (5 minutes)
- Review the NOR gate truth table and its behavior
- Introduce the concept of feedback in digital circuits -- how the output of one gate feeds into the input of another
- Ask students: "How can we build a circuit that remembers a previous input?"

### During the Simulation (15 minutes)
1. Start with S=0, R=0 and note the current output state
2. Toggle S to 1 (Set) -- observe Q goes to 1 and Q' goes to 0
3. Return S to 0 -- observe the latch holds the set state (Q=1)
4. Toggle R to 1 (Reset) -- observe Q goes to 0 and Q' goes to 1
5. Return R to 0 -- observe the latch holds the reset state (Q=0)
6. Set both S=1 and R=1 -- observe the invalid state and discuss why this is forbidden
7. Have students fill out a state table documenting all four input combinations

### After the Simulation (5 minutes)
- Discuss how the SR latch forms the basis for more advanced flip-flops (D, JK, T)
- Ask students to explain why the invalid state is problematic in real circuits
- Preview the gated SR latch and how adding an enable input provides additional control

## References

- [SR Latch - Wikipedia](https://en.wikipedia.org/wiki/Flip-flop_(electronics)#SR_NOR_latch)
- Unit 9: Latches and Flip-Flops
