---
title: Datapath-Controller RTL Teaching Simulator
description: RTL block diagram simulator with 5-state Moore FSM controller driving an ALU datapath, control bus visualization, animated data flow, and 7-signal timing diagram
quality_score: 95
---
# Datapath-Controller RTL Teaching Simulator

<iframe src="main.html" height="1020px" width="100%" style="min-height:1020px; overflow:visible; border:none;"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

## Description

This RTL block diagram simulator shows the complete hardware architecture of a simple ALU system using the **controller-datapath** design pattern taught in EE2301. A 5-state Moore FSM controller sequences the datapath through Load A, Load B, Execute (ALU operation), and Display. The control bus zone shows all five control signals in real time, with micro-operation annotations. Animated data-flow pulses trace values through MUX, registers, ALU, and output buffer. A 7-signal timing diagram records clock edges, FSM state, and all control pulses.

## Learning Objectives

**Bloom Level**: Analyze (L4)

- Identify the **controller-datapath separation** in an ALU system: the FSM decides "when," the datapath performs "what"
- Trace data flow from parallel input through MUX, into registers A and B, through the ALU, into result register R, and out through the tri-state buffer
- Read a **Moore FSM state diagram** with 5 states (IDLE, LOAD_A, LOAD_B, EXECUTE, DISPLAY) and identify outputs per state
- Map each FSM state to its **micro-operation**: load_A=1, load_B=1, alu_op+load_R=1, out_en=1
- Read a **7-signal timing diagram** showing clock, state, and control signal cause-and-effect relationships
- Predict how changing inputs (A, B) or ALU operation (ADD, SUB, AND, OR) affects the datapath result

## How to Use

1. Set **input values** A and B using the +/- buttons in the Input Interface zone (0–255)
2. Select the **ALU operation**: ADD, SUB, AND, or OR
3. Click **Start** to load the FSM into S1 (LOAD_A) — the first clock edge
4. Click **Step (Clock)** to advance one clock cycle at a time — watch the FSM state, control signals, register values, and data flow animation update
5. Click **Auto** to run the full 4-cycle sequence automatically at visual speed
6. Observe the **Control Bus** zone showing which signals are active and the current micro-operation
7. Watch the **Timing Diagram** at the bottom recording all 7 signals per clock edge
8. Click **Reset** to return to IDLE and clear the waveform

## FSM Controller Architecture

| State | Name | Control Signals | Micro-Operation |
|---|---|---|---|
| S0 | IDLE | all = 0 | (wait for start) |
| S1 | LOAD_A | load_A = 1 | A ← input |
| S2 | LOAD_B | load_B = 1 | B ← input |
| S3 | EXECUTE | alu_op, load_R = 1 | R ← A op B |
| S4 | DISPLAY | out_en = 1 | output ← R |

## Datapath Architecture

| Block | Type | Function |
|---|---|---|
| MUX | Combinational | Routes input data to selected register |
| Register A | Sequential | Stores first operand (8-bit, edge-triggered) |
| Register B | Sequential | Stores second operand (8-bit, edge-triggered) |
| ALU | Combinational | Performs ADD, SUB, AND, or OR on A and B |
| Register R | Sequential | Stores ALU result (edge-triggered) |
| Tri-State Buffer | Combinational | Gates result to output bus when out_en = 1 |

## References

- Unit 13: System Integration - Datapath-Controller Design
