---
title: Hierarchical ALU Design
description: Interactive tree explorer showing hierarchical decomposition of an 8-bit calculator with details panel
quality_score: 90
---

# Hierarchical ALU Design

<iframe src="main.html" height="580px" width="100%" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

## Description

An interactive hierarchical tree showing how an 8-bit calculator system decomposes into modules — from the top-level system down to gate-level primitives. Click any module to select it, expand/collapse its children, and view detailed information in the side panel including key points, inputs/outputs, and examples.

## Learning Objectives

**Bloom Level**: Understand (L2)

- Identify the hierarchical levels in a digital system design
- Explain how datapath and control unit separation simplifies design
- Describe how complex systems are built from simple, reusable modules

## How to Use

1. **Click** any module to select it and see details in the right panel
2. **Click** parent nodes to expand or collapse their children
3. The **blue path** highlights the ancestor chain from selected node to root
4. On mobile, tap a node to see its tooltip; details appear below the tree

## Key Concepts

- **Hierarchy** manages complexity by decomposing systems into modules
- Each module has a well-defined interface and single responsibility
- Leaf modules (Half Adder, gates) are simple enough to design directly
- Integration assembles tested modules structurally

## References

- Unit 13: System Integration and Hierarchical Design
