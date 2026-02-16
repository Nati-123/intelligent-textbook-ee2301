---
quality_score: 22
---

# Bubble Pushing Simulator

An interactive tool for learning the bubble pushing technique in logic circuit conversion.

## Overview

This MicroSim demonstrates the **bubble pushing** technique used to convert between different gate implementations. By moving inversion bubbles through gates, AND gates become OR gates (and vice versa) following De Morgan's theorems.

## Learning Objectives

- **Understand** how De Morgan's theorem enables gate conversion (Bloom Level: L2)
- **Apply** bubble pushing to convert AND-OR circuits to NAND-only (Bloom Level: L3)
- **Analyze** the equivalence of different circuit implementations (Bloom Level: L4)

## How to Use

1. **View** the original AND-OR circuit
2. **Click "Add Bubbles"** to insert inversion bubbles
3. **Click "Push Bubbles"** to move bubbles through gates
4. **Observe** how gate types change as bubbles pass through
5. **Verify** the final NAND-only or NOR-only implementation

## Key Concept

When pushing a bubble through a gate:
- The gate type changes (AND ↔ OR)
- The bubble moves to the other side
- Two bubbles on the same wire cancel out

## Running the MicroSim

[Run the Bubble Pushing Simulator](main.html){ .md-button .md-button--primary }
