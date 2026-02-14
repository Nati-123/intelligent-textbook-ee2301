---
title: Hierarchical ALU Design
description: Animated visualization of hierarchical system decomposition for an 8-bit calculator
quality_score: 85
---

# Hierarchical ALU Design

<iframe src="main.html" height="700px" width="100%" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

## Description

An animated step-by-step visualization showing how an 8-bit calculator system is decomposed into a hierarchy of modules — from the top-level system down to individual gate-level primitives. Each level reveals new sub-components, demonstrating how complexity is managed through hierarchical design.

## Learning Objectives

**Bloom Level**: Understand (L2)

- Identify the hierarchical levels in a digital system design
- Explain how datapath and control unit separation simplifies design
- Describe how complex systems are built from simple, reusable modules

## How to Use

1. Press **Play** (or spacebar) to animate the hierarchy building step by step
2. Use **arrow keys** or buttons to step forward/backward
3. **Hover** over any module to see its description
4. Click the **progress bar** to jump to any step

## Key Concepts

- **Hierarchy** manages complexity by decomposing systems into modules
- Each module has a well-defined interface and single responsibility
- Leaf modules (Half Adder, gates) are simple enough to design directly
- Integration assembles tested modules structurally

## References

- Unit 13: System Integration and Hierarchical Design
