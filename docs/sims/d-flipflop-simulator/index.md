---
title: D Flip-Flop Simulator
description: Interactive edge-triggered D flip-flop demonstrating data capture at the rising clock edge
image: /sims/d-flipflop-simulator/d-flipflop-simulator.png
quality_score: 85
---

# D Flip-Flop Simulator

<iframe src="main.html" height="520px" width="100%" scrolling="no"></iframe>

[Run the D Flip-Flop Simulator Fullscreen](./main.html){ .md-button .md-button--primary }

## Description

This MicroSim provides an interactive simulation of an edge-triggered D flip-flop, the most widely used storage element in synchronous digital design. Students can toggle the D input and apply clock pulses to observe how the output Q captures the value of D only at the rising clock edge. A timing diagram shows the history of D, CLK, and Q signals over time.

The D flip-flop eliminates the ambiguity of the SR latch by using a single data input. It samples D at the clock edge and holds the captured value until the next active edge, making it the foundation of registers, counters, and all synchronous sequential circuits.

Key features:

- **Edge-triggered behavior**: Q updates only at the rising clock edge, not during level-high periods
- **Interactive D input**: Toggle D between 0 and 1 at any time
- **Clock pulse control**: Manually trigger rising clock edges
- **Timing diagram**: Visual history of D, CLK, and Q waveforms showing cause-and-effect relationships
- **Clear state indication**: Current values of D, Q, and Q-bar displayed prominently

## Iframe Embedding

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://Nati-123.github.io/intelligent-textbook-ee2301/sims/d-flipflop-simulator/main.html" height="520px" scrolling="no" width="100%"></iframe>
```

## How to Use

1. **Set the D input** by clicking the D toggle button to switch between 0 and 1
2. **Click "Clock Pulse"** to generate a rising clock edge
3. **Observe** that Q captures the value of D at the moment of the clock edge
4. **Change D between clock pulses** and notice that Q does not change until the next rising edge
5. **Study the timing diagram** to see the relationship between D, CLK, and Q over multiple cycles
6. **Experiment** by setting D to 0, clocking, then setting D to 1, clocking again to confirm edge-triggered capture

## Learning Objectives

**Bloom Level**: Analyze (L4)

After using this MicroSim, students will be able to:

- Explain the difference between edge-triggered and level-sensitive storage elements
- Predict the output Q of a D flip-flop given a sequence of D values and clock edges
- Describe why changes to D between clock edges do not affect the output
- Read and interpret timing diagrams showing D, CLK, Q, and Q-bar signals
- Justify why the D flip-flop is preferred over the SR latch in synchronous designs

## Lesson Plan

### Before the Simulation (5 minutes)
- Review the SR latch and its limitations (invalid state when S=R=1)
- Introduce the concept of edge-triggered vs. level-sensitive operation
- Define setup time and hold time conceptually

### During the Simulation (15 minutes)
1. Set D = 1 and apply a clock pulse; observe Q becomes 1
2. Change D to 0 without clocking; confirm Q remains 1 (demonstrates edge-triggered behavior)
3. Apply another clock pulse; observe Q now captures D = 0
4. Rapidly toggle D and apply clock pulses to build up a timing diagram
5. Study the timing diagram to identify the cause-and-effect relationship between clock edges and output changes
6. Verify that Q-bar is always the complement of Q

### After the Simulation (5 minutes)
- Discuss how multiple D flip-flops form a register
- Introduce the concept of a pipeline stage using D flip-flops
- Connect to counter design where D flip-flop outputs feed back to inputs

## References

- [Flip-flop (electronics) - Wikipedia](https://en.wikipedia.org/wiki/Flip-flop_(electronics))
- [D flip-flop - Wikipedia](https://en.wikipedia.org/wiki/Flip-flop_(electronics)#D_flip-flop)
- Unit 9: Flip-Flops and Sequential Circuits in this textbook
