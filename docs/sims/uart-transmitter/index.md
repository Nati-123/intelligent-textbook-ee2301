---
title: UART Transmitter
description: Visualize UART serial transmission with shift register and waveform
quality_score: 85
---
# UART Transmitter

<iframe src="main.html" height="550px" width="100%" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

## Description

This simulation shows how a UART transmitter converts parallel data to a serial bit stream. Enter an 8-bit value, watch it load into the shift register, and observe the serial output waveform with start bit, data bits, and stop bit.

## Learning Objectives

**Bloom Level**: Apply (L3)

- Understand UART frame format (start, data, stop bits)
- Trace data through the parallel-to-serial shift register
- Read serial output waveforms
- Calculate transmission timing at different baud rates

## How to Use

1. Enter an **8-bit binary value** or select a preset character
2. Click **Transmit** to start the serial transmission
3. Watch the **shift register** shift out bits one at a time
4. Observe the **serial waveform** showing start, data, and stop bits
5. Click **Step** to advance one bit at a time

## References

- Unit 13: System Integration - UART Communication
