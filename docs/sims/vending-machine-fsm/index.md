---
title: Vending Machine FSM (Saturation Model)
description: Controller-datapath vending machine with accumulator balance register, 5-state Moore FSM, RTL block diagram, animated data flow, and 8-signal timing diagram
quality_score: 95
---
# Vending Machine FSM (Saturation Model)

<iframe src="main.html" height="1150px" width="100%" style="min-height:1150px; overflow:visible; border:none;"></iframe>

[Run Fullscreen](./main.html){ .md-button .md-button--primary }

## Description

This interactive MicroSim demonstrates a vending machine controller using the **saturation model** — a controller-datapath architecture where a 5-state Moore FSM drives an accumulator-based datapath. Instead of using 7 discrete states (one per 5-cent increment as in the chapter text), the saturation model uses a **balance register** that accumulates coin values until it reaches or exceeds the 30-cent threshold, at which point the FSM triggers dispensing and change calculation. This approach demonstrates real-world controller-datapath separation, reducing FSM complexity while adding structural clarity.

## Learning Objectives

**Bloom Level**: Analyze (L4)

- Identify the **controller-datapath separation** in a vending machine: the FSM decides "when," the datapath computes "what"
- Trace data flow from coin input through the **Coin Decoder**, **Adder**, and into the **Balance Register** (accumulator pattern)
- Read a **Moore FSM state diagram** with 5 states (IDLE, ACCEPT, CHECK, DISPENSE, DONE) and identify the conditional branch at CHECK
- Map each FSM state to its **micro-operation** and active control signals
- Understand the **saturation concept**: the accumulator grows until it reaches the threshold, triggering a state transition
- Read an **8-signal timing diagram** showing clock, state, coin input, balance, comparator output, dispense, change, and load_bal signals
- Compare the saturation model (5-state FSM + datapath) with the discrete model (7-state FSM) and explain why the datapath approach scales better

## How to Use

1. Click a **coin button** (Nickel 5c, Dime 10c, or Quarter 25c) to queue a coin
2. Click **Step (Clock)** to advance one clock cycle — the FSM processes the coin through ACCEPT, CHECK, and possibly DISPENSE/DONE states
3. Insert more coins and keep stepping — watch the balance accumulate in the Balance Register
4. When balance reaches 30c or more, the FSM enters DISPENSE: the subtractor calculates change, and the dispense LED lights up
5. Click **Auto** to auto-run the FSM at visual speed (insert coins between auto steps)
6. Observe the **Control Bus** showing which signals are active and the current micro-operation
7. Watch the **Timing Diagram** at the bottom recording all 8 signals per clock edge
8. Click **Reset** to return to IDLE and clear all state

## FSM Controller Architecture

| State | Name | Control Signals | Micro-Operation | Next State |
|---|---|---|---|---|
| S0 | IDLE | all = 0 | (wait for coin) | S1 when coin inserted |
| S1 | ACCEPT | load_coin, add_en, load_bal = 1 | bal <- bal + coin | S2 |
| S2 | CHECK | cmp_en = 1 | bal >= 30? | S3 if yes, S0 if no |
| S3 | DISPENSE | disp_en, sub_en, load_chg = 1 | change <- bal - 30; dispense | S4 |
| S4 | DONE | (display) | display result, clear bal | S0 |

## Datapath Architecture

| Block | Type | Function |
|---|---|---|
| Coin Decoder | Combinational | Maps coin type to value: Nickel=5, Dime=10, Quarter=25 |
| Adder | Combinational | Computes balance + coin_value (6-bit addition) |
| Balance Register | Sequential | Stores running total (accumulator, 0-63 range, edge-triggered) |
| Comparator | Combinational | Outputs 1 when balance >= 30 (threshold detection) |
| Subtractor | Combinational | Computes balance - 30 (change calculation) |
| Output Register | Sequential | Holds change amount and dispense flag |

## Saturation Model vs. Discrete States

| Aspect | Discrete Model (Chapter 13.14) | Saturation Model (This Sim) |
|---|---|---|
| FSM States | 7 states (S0, S5, S10, S15, S20, S25, S30+) | 5 states (IDLE, ACCEPT, CHECK, DISPENSE, DONE) |
| State Encoding | One state per 5-cent increment | Generic controller with accumulator |
| Scalability | States grow with price granularity | Fixed FSM, datapath handles any price |
| Change Calculation | Implicit in state transitions | Explicit subtractor block |
| Design Pattern | Pure FSM | Controller-Datapath separation |
| Key Concept | State-per-value enumeration | Accumulator with threshold detection |

## References

- Unit 13: System Integration - Vending Machine Controller (Section 13.14)
