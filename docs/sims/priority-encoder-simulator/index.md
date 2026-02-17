---
title: Priority Encoder Simulator
description: Interactive 4-to-2 priority encoder demonstrating how the highest-priority active input is encoded into binary output
image: /sims/priority-encoder-simulator/priority-encoder-simulator.png
quality_score: 85
---

# Priority Encoder Simulator

<iframe src="main.html" height="510px" width="100%" scrolling="no"></iframe>

[Run the Priority Encoder Simulator Fullscreen](./main.html){ .md-button .md-button--primary }

## Description

This MicroSim provides an interactive demonstration of a 4-to-2 priority encoder, a combinational circuit that encodes the highest-priority active input into a binary output code. Unlike a standard encoder that requires exactly one active input, a priority encoder handles the case where multiple inputs may be active simultaneously by selecting the one with the highest priority.

The simulation displays four data inputs (D0 through D3, with D3 being the highest priority), a 2-bit binary output representing the encoded value of the highest active input, and a Valid output flag that indicates whether at least one input is active. Students can toggle any combination of inputs and observe how the encoder always reports the highest-priority active input.

Key features include:

- Four clickable input toggles (D0 through D3)
- 2-bit encoded binary output display
- Valid output indicator showing when at least one input is active
- Visual highlighting of the highest-priority active input
- Real-time priority resolution when multiple inputs are active

## Iframe Embedding

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://Nati-123.github.io/intelligent-textbook-ee2301/sims/priority-encoder-simulator/main.html" height="510px" scrolling="no" width="100%"></iframe>
```

## How to Use

1. Observe the four input lines D0 through D3 and the output display.
2. Click on individual inputs **D0** through **D3** to toggle them between active (1) and inactive (0).
3. When only one input is active, verify that the binary output matches the input number (e.g., D2 active produces output "10").
4. Activate **multiple inputs** simultaneously and observe that the encoder always selects the highest-numbered active input.
5. Notice the **Valid** output: it is 1 when at least one input is active and 0 when no inputs are active.
6. Deactivate all inputs and observe that the Valid output goes to 0, indicating an invalid encoding.
7. Experiment with various combinations to build intuition about priority resolution.

## Learning Objectives

**Bloom Level**: Apply (L3)

After using this MicroSim, students will be able to:

- Explain the difference between a standard encoder and a priority encoder
- Predict the binary output and Valid signal for any combination of active inputs on a 4-to-2 priority encoder
- Apply priority encoder concepts to real-world scenarios such as interrupt handling in processors

## Lesson Plan

### Before the Simulation (5 minutes)
- Review the basic encoder concept (one-hot input to binary output)
- Ask students: "What happens if more than one input is active in a standard encoder?"
- Introduce the need for priority encoding in systems where multiple requests can occur simultaneously

### During the Simulation (15 minutes)
1. Start with all inputs off -- observe the Valid output is 0
2. Activate D0 alone -- output should be "00" with Valid = 1
3. Activate D1 alone -- output should be "01"
4. Activate D3 alone -- output should be "11"
5. Now activate both D1 and D3 -- observe output is "11" because D3 has higher priority
6. Add D0 and D2 as well (all four active) -- output remains "11"
7. Deactivate D3 while keeping D0, D1, D2 active -- output changes to "10" (D2 is now highest)
8. Have students fill in a priority encoder truth table from their observations

### After the Simulation (5 minutes)
- Discuss the priority encoder's role in interrupt controllers (e.g., servicing the highest-priority interrupt first)
- Compare the priority encoder with a multiplexer and decoder
- Preview how priority encoders can be cascaded for systems with more than four inputs

## References

- [Priority Encoder - Wikipedia](https://en.wikipedia.org/wiki/Priority_encoder)
- [Encoder (digital) - Wikipedia](https://en.wikipedia.org/wiki/Encoder_(digital))
- Unit 7: MSI Combinational Components
