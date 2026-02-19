---
title: Entity-Architecture RTL Teaching Module
description: Interactive VHDL entity-architecture explorer with toggle switches, 3-phase signal flow animation, delta-cycle visualization, behavioral/structural code comparison, LUT hardware realization, truth table with Test All Cases, and signal waveform
quality_score: 95
---
# Entity-Architecture RTL Teaching Module

<iframe src="main.html" height="1580px" width="100%" style="min-height:1580px; overflow:visible; border:none;border-radius:8px;"></iframe>

## Description

This interactive teaching module demonstrates the VHDL **entity-architecture** relationship through a live, hands-on simulation. Toggle input switches A and B to see immediate effects across all synchronized panels: the block diagram animates a **3-phase signal flow** (input wire glow, gate evaluation, output update), VHDL code highlights active signals, the truth table marks the current row, and the waveform records every toggle. A **delta-cycle visualization** shows how VHDL simulators process signal changes at zero time. Compare **Behavioral** and **Structural** architecture styles side-by-side with difference highlighting, and see how gates map to **FPGA Look-Up Tables** in the hardware realization panel. Use **Test All Cases** to auto-run all 4 input combinations and verify the truth table.

## Learning Objectives

**Bloom Level**: Analyze (L4)

- Distinguish between **entity** (interface declaration) and **architecture** (implementation body)
- Identify port declarations with direction (`in`/`out`) and type (`STD_LOGIC`)
- Compare **behavioral** architecture (concurrent signal assignment: `Y <= A and B`) with **structural** architecture (component instantiation with `port map`) using the side-by-side comparison panel
- Trace **3-phase signal propagation**: input wire activation, logic evaluation inside the entity, output update
- Understand **delta-cycle simulation**: how VHDL evaluates signal changes, propagates through logic, and updates outputs at zero time (t to t+delta)
- Interpret a real-time **signal waveform** with time axis showing input/output transitions
- Understand how VHDL operators map to **physical gate symbols** and **FPGA Look-Up Tables (LUTs)** during synthesis
- Recognize that one entity can have multiple architectures (behavioral vs structural)
- Use **Test All Cases** to verify all input combinations match the expected truth table

## How to Use

1. Select a **gate type** (AND, OR, NAND, XOR) from the control bar
2. Click the **A** and **B** toggle switches in the Block Diagram panel to change input values
3. Watch the **3-phase signal flow animation**: input wire glows, gate evaluates, output updates
4. Observe all panels update simultaneously:
    - **Block Diagram**: wire colors change, pulse dots animate signal flow, output LED updates
    - **Entity Code**: port signal names highlight green (active input) or pink (active output)
    - **Code Comparison**: behavioral vs structural side-by-side with difference highlighting
    - **Delta-Cycle**: animated visualization showing Signal Change, Logic Evaluation, Output Update stages
    - **Hardware Realization**: gate symbol and LUT truth table with current row highlighted
    - **Truth Table**: current input combination row is highlighted with orange indicator
    - **Signal Waveform**: records each toggle as a new time step with time axis markers
5. Click **Test All Cases** to auto-run all 4 input combinations and watch the truth table fill with checkmarks
6. Click **Reset** to clear the waveform history

## Panel Architecture

| Panel | Content | Updates On |
|---|---|---|
| Block Diagram | Entity black box with toggle switches, 3-phase signal flow animation, output LED | Toggle A/B |
| Entity Code | `library`, `entity`, `port` declarations with syntax highlighting | Gate selection, Toggle |
| Code Comparison | Side-by-side Behavioral vs Structural code with difference highlighting | Gate, Toggle |
| Delta-Cycle | 3-stage animation: Signal Change → Logic Evaluation → Output Update with progress bar | Toggle |
| Hardware Realization | IEEE gate symbol + FPGA LUT truth table with "maps to" arrow | Gate, Toggle |
| Truth Table | Auto-generated 4-row truth table with active-row highlight and Test All Cases support | Gate, Toggle |
| Key Concepts | Entity vs Architecture, Declaration vs Implementation | Static |
| Signal Waveform | 3-signal timing diagram (A, B, Y) with time axis recording toggle history | Toggle |

## References

- Unit 12: VHDL - Entity and Architecture Declarations
