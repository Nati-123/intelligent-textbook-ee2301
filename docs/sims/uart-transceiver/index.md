---
title: UART Transceiver
description: RTL block diagram of a UART transceiver showing TX and RX with controller-datapath separation, 16x oversampling, parity support, baud mismatch visualization, and 7-signal waveform
quality_score: 95
---
# UART Transceiver

<iframe src="main.html" height="1520px" width="100%" style="min-height:1520px; overflow:visible; border:none;"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

## Description

This RTL block diagram simulation shows the complete hardware architecture of a UART transceiver — both transmitter and receiver on a single canvas. The design follows the **controller-datapath** pattern taught in EE2301, with separate Moore FSMs for TX (5 states) and RX (6 states). A serial wire zone connects TX output to RX input, demonstrating how UART communication works end-to-end. The RX uses **16x oversampling** with mid-bit sampling, supports optional parity checking, and includes a baud rate mismatch slider to visualize clock drift effects. A 7-signal timing diagram shows all key signals in real time.

## Learning Objectives

**Bloom Level**: Analyze (L4)

- Identify the **controller-datapath separation** in both TX and RX modules of a serial transceiver
- Trace data flow from parallel input through TX shift register, across the serial wire, into the RX shift register, and back to parallel output
- Understand **16x oversampling** and **mid-bit sampling** for reliable start bit detection and data recovery
- Read a **7-signal timing diagram** showing cause-and-effect relationships between TX and RX signals
- Understand **UART frame format**: start bit (0), 8 data bits (LSB first), optional parity bit, stop bit (1)
- Explain how **framing errors** are detected by checking the stop bit value
- Explain how **parity checking** (even/odd) detects single-bit errors using XOR accumulation
- Predict the effect of **baud rate mismatch** on sampling accuracy and error generation

## How to Use

1. Set an **8-bit data value** by clicking individual bits or selecting a preset ('A', 'Z', '0', 0xFF)
2. Select **Parity** mode: None, Even, or Odd (affects both TX frame format and RX checking)
3. Adjust the **Baud Mismatch** slider to offset the RX clock (-5% to +5%)
4. Click **Transmit** to load the TX shift register and begin the start bit — the RX automatically starts receiving
5. Click **Step (Baud)** to advance one full baud period for both TX and RX
6. Click **Fine Step (16x)** to advance one oversample tick (1/16 baud period) — observe the RX oversample counter
7. Click **Auto** to run the full frame automatically at visual speed
8. Observe the **7-signal waveform** at the bottom showing TX and RX signals synchronized to baud periods
9. Click **Reset** to return both TX and RX to idle state

## TX Architecture

| Block | Type | Function |
|---|---|---|
| TX FSM Controller | Sequential (Moore) | 5-state machine: IDLE → START → DATA → STOP → DONE |
| Baud Rate Generator | Sequential | Divides system clock to produce baud_tick enable |
| 10/11-bit Shift Register | Sequential | Parallel load of frame; serial output via reg[0] |
| Bit Counter | Sequential | Counts bit position within the frame |
| Input Interface | Combinational | Parallel data bus + tx_start trigger |
| Output Interface | Combinational | Serial line driver + status signals (tx_busy, tx_done) |

## RX Architecture

| Block | Type | Function |
|---|---|---|
| RX FSM Controller | Sequential (Moore) | 6-state machine: IDLE → START → DATA → PARITY → STOP → DONE |
| Edge Detector | Combinational | Detects falling edge on rx_in for start bit detection |
| Oversample Counter | Sequential | 4-bit counter (0–15) for 16x oversampling |
| Bit Sampler | Combinational | Samples rx_in at mid-bit (count == 8) for optimal noise margin |
| 8-bit Shift Register | Sequential | Assembles received data bits LSB first |
| Parity Checker | Combinational | XOR accumulator to verify even/odd parity |

## References

- Unit 13: System Integration - UART Communication
