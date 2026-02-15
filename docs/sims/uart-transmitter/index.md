---
title: UART Transmitter
description: RTL block diagram of a UART transmitter showing controller-datapath separation, shift register operation, and multi-signal waveform
quality_score: 95
---
# UART Transmitter

<iframe src="main.html" height="820px" width="100%" scrolling="no"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

## Description

This RTL block diagram simulation shows the complete hardware architecture of a UART transmitter. The design follows the **controller-datapath** pattern taught in EE2301, with a Moore FSM generating control signals that drive a datapath containing a baud rate generator, 10-bit shift register, and bit counter. A multi-signal timing diagram shows all key signals in real time as the frame transmits.

## Learning Objectives

**Bloom Level**: Analyze (L4)

- Identify the **controller-datapath separation** in a real serial communication module
- Trace data flow from parallel input through the shift register to serial output
- Read a **multi-signal timing diagram** showing cause-and-effect relationships between tx_start, tx_out, tx_busy, tx_done, and bit_cnt
- Understand **UART frame format**: start bit (0), 8 data bits (LSB first), stop bit (1)
- Recognize **sequential vs combinational** blocks and their roles in the architecture
- Explain how the **baud rate generator** derives bit timing from the system clock

## How to Use

1. Set an **8-bit data value** by clicking individual bits or selecting a preset ('A', 'Z', '0', 0xFF)
2. Click **Transmit** to load the shift register and begin the start bit
3. Click **Step (Baud Tick)** to advance one bit period at a time — watch the FSM state highlight, shift register contents update, and waveform grow
4. Click **Auto** to run the full frame automatically at visual speed
5. Observe the **multi-signal waveform** at the bottom — it shows all 5 key signals synchronized to baud periods
6. Click **Reset** to return to idle state

## Architecture Details

| Block | Type | Function |
|---|---|---|
| FSM Controller | Sequential (Moore) | 5-state machine: IDLE → START → DATA → STOP → DONE |
| Baud Rate Generator | Sequential | Divides system clock to produce baud_tick enable |
| 10-bit Shift Register | Sequential | Parallel load of frame; serial output via reg[0] |
| Bit Counter | Sequential | Counts 0–10 to track position in frame |
| Input Interface | Combinational | Parallel data bus + tx_start trigger |
| Output Interface | Combinational | Serial line driver + status signals |

## References

- Unit 13: System Integration - UART Communication
