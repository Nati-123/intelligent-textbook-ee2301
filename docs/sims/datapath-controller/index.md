---
title: Datapath-Controller Interaction
description: Interactive datapath with FSM controller and clock stepping
quality_score: 85
---
# Datapath-Controller Interaction

<iframe src="main.html" height="580px" width="100%" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

## Description

This simulation demonstrates how a controller (FSM) manages a datapath to perform a simple computation. The datapath contains registers, an ALU, and multiplexers, while the controller generates the control signals for each step. Click the clock to advance the operation.

## Learning Objectives

**Bloom Level**: Analyze (L4)

- Analyze the interaction between datapath and controller
- Trace control signals from FSM states to datapath operations
- Understand how multi-cycle operations are sequenced
- Identify datapath components and their roles

## How to Use

1. Click **Clock** to advance one cycle
2. Watch the **FSM** transition between states (shown on the left)
3. Observe **control signals** activating datapath components (shown on the right)
4. Trace data flow through registers, MUX, and ALU
5. Click **Reset** to restart the computation

## References

- Unit 13: System Integration - Datapath-Controller Architecture
