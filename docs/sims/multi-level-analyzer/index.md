---
title: Multi-Level Circuit Analyzer
description: Interactive propagation delay and critical path analyzer for multi-level logic circuits
image: /sims/multi-level-analyzer/multi-level-analyzer.png
quality_score: 85
---

# Multi-Level Circuit Analyzer

<iframe src="main.html" height="560px" width="100%" scrolling="no"></iframe>

[Run the Multi-Level Circuit Analyzer Fullscreen](./main.html){ .md-button .md-button--primary }

## Description

This MicroSim provides an interactive visualization of signal propagation through multi-level logic circuits. Students can select different circuit configurations, adjust individual gate delays, and watch an animation showing how signals travel through successive gate levels. The critical path -- the longest delay path from any input to the output -- is highlighted in red, revealing the bottleneck that limits the maximum operating frequency of the circuit.

Understanding propagation delay and critical paths is fundamental to digital circuit timing analysis. In multi-level implementations, the total delay from input to output depends on the number of gate levels a signal must traverse. This simulator makes the abstract concept of timing concrete by showing delay accumulation in real time.

Key features:

- **Multiple circuit configurations**: Choose from different multi-level circuit topologies
- **Adjustable gate delays**: Set individual gate delays to explore how different technologies affect timing
- **Signal propagation animation**: Watch signals travel through the circuit level by level
- **Critical path highlighting**: The longest delay path is automatically identified and shown in red
- **Total delay readout**: See the cumulative propagation delay from input to output

## Iframe Embedding

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://Nati-123.github.io/intelligent-textbook-ee2301/sims/multi-level-analyzer/main.html" height="560px" scrolling="no" width="100%"></iframe>
```

## How to Use

1. **Select a circuit configuration** from the available options to load a multi-level circuit
2. **Adjust gate delays** using the controls to set propagation delay values for individual gates
3. **Click "Animate"** to start the signal propagation animation through the circuit
4. **Watch the animation** as signals travel from inputs through each gate level to the output
5. **Identify the critical path** highlighted in red -- this is the path with the longest total delay
6. **Read the total propagation delay** displayed for the critical path
7. **Click "Reset"** to clear the animation and try different delay configurations

## Learning Objectives

**Bloom Level**: Evaluate (L5)

After using this MicroSim, students will be able to:

- Define propagation delay and explain how it accumulates through multiple gate levels
- Identify the critical path in a multi-level circuit as the longest input-to-output delay path
- Calculate the total propagation delay of a circuit by summing gate delays along the critical path
- Evaluate the tradeoff between circuit depth (number of levels) and propagation delay
- Explain why two-level implementations (SOP/POS) have shorter delay but may require more gates than multi-level implementations

## Lesson Plan

### Before the Simulation (5 minutes)
- Define propagation delay for a single logic gate
- Explain that total circuit delay depends on the path through the most gate levels
- Introduce the concept of critical path as the timing bottleneck

### During the Simulation (15 minutes)
1. Load the default circuit configuration and observe its structure
2. Run the animation with default gate delays and note the critical path
3. Record the total propagation delay
4. Change one gate's delay and re-run to see if the critical path shifts
5. Try a different circuit configuration and identify its critical path
6. Compare circuits with different depths (2-level vs. 3-level vs. 4-level)

### After the Simulation (5 minutes)
- Discuss the speed vs. area tradeoff: two-level circuits are faster but may use more gates
- Introduce the concept of maximum clock frequency as 1 / (critical path delay)
- Connect to the motivation for multi-level optimization in synthesis tools

## References

- [Propagation delay - Wikipedia](https://en.wikipedia.org/wiki/Propagation_delay)
- [Critical path method - Wikipedia](https://en.wikipedia.org/wiki/Critical_path_method)
- [Logic optimization - Wikipedia](https://en.wikipedia.org/wiki/Logic_optimization)
- Unit 4: Multi-Level Gate Circuits and NAND/NOR Implementations in this textbook
