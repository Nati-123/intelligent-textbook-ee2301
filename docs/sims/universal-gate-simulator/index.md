---
quality_score: 27
---

# Universal Gate Simulator

An interactive demonstration of how NAND and NOR gates can implement any Boolean function.

## Overview

This MicroSim demonstrates the **universality** of NAND and NOR gates by showing how they can implement all basic logic operations (NOT, AND, OR) and any other gate type.

## Learning Objectives

- **Understand** why NAND and NOR are called universal gates (Bloom Level: L2)
- **Apply** NAND/NOR gate combinations to create other gate functions (Bloom Level: L3)

## How to Use

1. **Select target gate** from the dropdown (NOT, AND, OR, XOR, XNOR)
2. **Choose implementation** using NAND-only or NOR-only
3. **Toggle inputs** A and B to see signal propagation
4. **Observe** the circuit structure and output

## Key Concepts

| Target Gate | NAND Implementation | NOR Implementation |
|-------------|--------------------|--------------------|
| NOT | 1 NAND gate | 1 NOR gate |
| AND | 2 NAND gates | 3 NOR gates |
| OR | 3 NAND gates | 2 NOR gates |
| XOR | 4 NAND gates | 5 NOR gates |

## Running the MicroSim

[Run the Universal Gate Simulator](main.html){ .md-button .md-button--primary }
