---
title: Counter Simulator
description: Interactive 4-bit binary counter demonstrating synchronous up/down counting through all 16 states
image: /sims/counter-simulator/counter-simulator.png
quality_score: 85
---

# Counter Simulator

<iframe src="main.html" height="520px" width="100%" scrolling="no"></iframe>

[Run the Counter Simulator Fullscreen](./main.html){ .md-button .md-button--primary }

## Description

This MicroSim provides an interactive simulation of a 4-bit synchronous binary counter that can count up or down through all 16 states (0000 to 1111). Students can manually step through each count, enable automatic counting, and observe how the binary state evolves with each clock cycle. The visual display shows both the binary representation and the decimal equivalent at each step.

Counters are fundamental building blocks in digital systems, used for timing, sequencing, address generation, and frequency division. This simulator helps students build intuition about how flip-flops work together to form a counting circuit.

Key features:

- **Up and down counting**: Step through states in ascending or descending order
- **Auto count mode**: Continuous counting at a configurable speed
- **Binary state display**: Visual representation of all 4 bits with decimal equivalent
- **State sequence visualization**: Track the counter's path through its state space
- **Reset control**: Return the counter to its initial state at any time

## Iframe Embedding

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://Nati-123.github.io/intelligent-textbook-ee2301/sims/counter-simulator/main.html" height="520px" scrolling="no" width="100%"></iframe>
```

## How to Use

1. **Click "Count Up"** to increment the counter by one state
2. **Click "Count Down"** to decrement the counter by one state
3. **Click "Auto Count"** to enable continuous counting and observe the full state sequence
4. **Click "Reset"** to return the counter to state 0000
5. **Observe** the binary output bits and the decimal equivalent updating with each transition
6. **Watch** how the least significant bit toggles every cycle while higher bits toggle less frequently

## Learning Objectives

**Bloom Level**: Apply (L3)

After using this MicroSim, students will be able to:

- Describe the operation of a synchronous binary counter and its state sequence
- Predict the next state of a 4-bit counter given the current state and count direction
- Explain why each bit position toggles at a different frequency (bit 0 every cycle, bit 1 every 2 cycles, etc.)
- Identify the modulus of a counter and relate it to the number of flip-flops
- Apply counters to solve timing and sequencing problems in digital design

## Lesson Plan

### Before the Simulation (5 minutes)
- Review binary number representation and the concept of state in sequential circuits
- Discuss where counters appear in everyday digital devices (timers, clocks, memory addresses)

### During the Simulation (15 minutes)
1. Start by clicking "Count Up" repeatedly and observe the binary pattern
2. Note how bit 0 toggles every step, bit 1 every 2 steps, and so on
3. Count all the way from 0 to 15 and observe the rollover back to 0
4. Switch to "Count Down" and observe the reverse sequence
5. Enable "Auto Count" and watch the continuous state transitions
6. Use "Reset" and verify the counter returns to 0000

### After the Simulation (5 minutes)
- Discuss the relationship between the number of flip-flops and the number of unique states
- Introduce the concept of modulo-N counters and how truncated sequences work
- Connect counter behavior to the T flip-flop toggle principle

## References

- [Counter (digital) - Wikipedia](https://en.wikipedia.org/wiki/Counter_(digital))
- [Synchronous circuit - Wikipedia](https://en.wikipedia.org/wiki/Synchronous_circuit)
- Unit 10: Counters and Shift Registers in this textbook
