---
title: Timing Analysis Visualizer
description: Explore critical path delays and maximum clock frequency calculation
quality_score: 85
---
# Timing Analysis Visualizer

<iframe src="main.html" height="500px" width="100%" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

## Description

This simulation lets you adjust propagation delays for logic gates and interconnect to visualize the critical path through a circuit. It calculates the maximum clock frequency based on the longest delay path and shows setup/hold timing requirements.

## Learning Objectives

**Bloom Level**: Apply (L3)

- Calculate critical path delay through a combinational circuit
- Determine maximum clock frequency from path delays
- Understand setup time, hold time, and clock-to-Q delay
- Identify how gate and routing delays contribute to timing

## How to Use

1. Adjust **delay sliders** for each gate type (AND, OR, NOT)
2. Adjust the **routing delay** slider
3. Observe the **critical path** highlighted in red
4. Read the calculated **maximum frequency** (f_max)
5. See **timing diagram** showing setup/hold requirements

## References

- Unit 13: System Integration - Static Timing Analysis
