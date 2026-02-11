---
title: LUT Explorer
description: Explore how a 4-input lookup table implements any Boolean function
quality_score: 85
---
# LUT Explorer

<iframe src="main.html" height="500px" width="100%" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

## Description

This simulation demonstrates how a 4-input Look-Up Table (LUT) can implement any Boolean function by storing the truth table outputs in 16 SRAM cells. Select a preset function or manually toggle cells to create custom functions.

## Learning Objectives

**Bloom Level**: Apply (L3)

- Understand how LUTs implement Boolean functions
- Configure a 4-input LUT by setting truth table outputs
- Select from common Boolean functions to see their LUT programming
- Verify LUT output matches expected function behavior

## How to Use

1. Toggle inputs **A, B, C, D** to set the current address
2. Click cells in the **truth table** to set outputs (1 or 0)
3. Use the **function dropdown** to load preset functions (AND, OR, XOR, etc.)
4. Observe how the current input address selects the corresponding SRAM cell
5. The output value is read from the addressed cell

## References

- Unit 11: Programmable Logic Devices - FPGA Look-Up Tables
