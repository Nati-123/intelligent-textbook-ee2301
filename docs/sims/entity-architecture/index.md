---
title: Entity-Architecture RTL Teaching Module
description: Interactive VHDL entity-architecture explorer with toggle switches, synchronized code panels, auto-generated truth table, signal waveform, structural/behavioral toggle, and synthesis mapping
quality_score: 95
---
# Entity-Architecture RTL Teaching Module

<iframe src="main.html" height="1350px" width="100%" style="min-height:1350px; overflow:visible; border:none;"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

## Description

This interactive teaching module demonstrates the VHDL **entity-architecture** relationship through a live, hands-on simulation. Toggle input switches A and B to see immediate effects across all synchronized panels: the block diagram animates logic evaluation, VHDL code highlights active signals, the truth table marks the current row, the gate symbol shows wire states, and the waveform records every toggle. Switch between **Behavioral** and **Structural** architecture styles, and select from four gate types (AND, OR, NAND, XOR) to see how entity declarations and architecture bodies adapt.

## Learning Objectives

**Bloom Level**: Analyze (L4)

- Distinguish between **entity** (interface declaration) and **architecture** (implementation body)
- Identify port declarations with direction (`in`/`out`) and type (`STD_LOGIC`)
- Compare **behavioral** architecture (concurrent signal assignment: `Y <= A and B`) with **structural** architecture (component instantiation with `port map`)
- Read syntax-highlighted VHDL code with line numbers and identify keywords, identifiers, and punctuation
- Trace signal propagation from input toggles through the entity to the output LED
- Interpret a real-time **signal waveform** showing input/output transitions
- Understand how VHDL operators map to **physical gate symbols** during synthesis
- Recognize that one entity can have multiple architectures (behavioral vs structural)

## How to Use

1. Select a **gate type** (AND, OR, NAND, XOR) from the control bar
2. Toggle the **Behavioral/Structural** button to switch architecture style
3. Click the **A** and **B** toggle switches in the Block Diagram panel to change input values
4. Watch all panels update simultaneously:
    - **Block Diagram**: wire colors change, output LED updates, evaluation pulse animates
    - **Entity Code**: port signal names highlight green (active input) or pink (active output)
    - **Architecture Code**: assignment line highlights during evaluation; comment shows current result
    - **Truth Table**: current input combination row is highlighted with orange indicator
    - **Synthesis Mapping**: physical gate symbol shows wire states
    - **Signal Waveform**: records each toggle as a new time step
5. Click **Reset** to clear the waveform history

## Panel Architecture

| Panel | Content | Updates On |
|---|---|---|
| Block Diagram | Entity black box with toggle switches, wires, output LED | Toggle A/B |
| Entity Code | `library`, `entity`, `port` declarations with syntax highlighting | Gate selection, Toggle |
| Architecture Code | Behavioral (`Y <= A op B`) or Structural (`port map`) | Gate, Mode, Toggle |
| Truth Table | Auto-generated 4-row truth table with active-row highlight | Gate, Toggle |
| Synthesis Mapping | IEEE gate symbol with labeled wires and LUT mapping note | Gate, Toggle |
| Key Concepts | Entity vs Architecture, Declaration vs Implementation | Static |
| Signal Waveform | 3-signal timing diagram (A, B, Y) recording toggle history | Toggle |

## References

- Unit 12: VHDL - Entity and Architecture Declarations
