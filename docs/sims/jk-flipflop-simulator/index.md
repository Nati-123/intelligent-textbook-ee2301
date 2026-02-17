---
title: JK Flip-Flop Simulator
description: Interactive JK flip-flop demonstrating set, reset, hold, and toggle operations at the clock edge
image: /sims/jk-flipflop-simulator/jk-flipflop-simulator.png
quality_score: 85
---

# JK Flip-Flop Simulator

<iframe src="main.html" height="500px" width="100%" scrolling="no"></iframe>

[Run the JK Flip-Flop Simulator Fullscreen](./main.html){ .md-button .md-button--primary }

## Description

This MicroSim provides an interactive simulation of a JK flip-flop, the most versatile of the basic flip-flop types. Students can toggle the J and K inputs independently and apply clock pulses to observe all four operating modes: Hold (J=0, K=0), Reset (J=0, K=1), Set (J=1, K=0), and Toggle (J=1, K=1). A timing diagram tracks the history of J, K, CLK, and Q signals.

The JK flip-flop extends the SR flip-flop by resolving the invalid state (S=R=1) into a useful toggle operation. When both J and K are high, the output complements on each clock edge. This toggle capability makes the JK flip-flop particularly valuable for building counters and frequency dividers.

Key features:

- **All four operating modes**: Hold, Reset, Set, and Toggle clearly demonstrated
- **Interactive J and K inputs**: Toggle each input independently before clocking
- **Clock pulse control**: Manually trigger rising clock edges to observe state changes
- **Timing diagram**: Visual waveform history showing J, K, CLK, Q, and Q-bar
- **Mode indication**: Current operating mode displayed based on J and K values

## Iframe Embedding

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://Nati-123.github.io/intelligent-textbook-ee2301/sims/jk-flipflop-simulator/main.html" height="500px" scrolling="no" width="100%"></iframe>
```

## How to Use

1. **Set the J input** by clicking to toggle it between 0 and 1
2. **Set the K input** by clicking to toggle it between 0 and 1
3. **Click "Clock Pulse"** to generate a rising clock edge and update the output
4. **Observe Q and Q-bar** change (or hold) based on the J and K combination
5. **Test all four modes**: J=0,K=0 (Hold), J=0,K=1 (Reset to 0), J=1,K=0 (Set to 1), J=1,K=1 (Toggle)
6. **Study the timing diagram** to trace the relationship between inputs, clock edges, and outputs over time

## Learning Objectives

**Bloom Level**: Apply (L3)

After using this MicroSim, students will be able to:

- Describe the four operating modes of the JK flip-flop and the J, K input combinations that produce each mode
- Predict the next-state output Q given current state Q, J input, and K input values
- Explain how the JK flip-flop resolves the SR flip-flop's invalid state into the toggle operation
- Apply the characteristic equation Q(next) = JQ' + K'Q to determine flip-flop behavior
- Use the toggle mode of the JK flip-flop to design ripple counters and frequency dividers

## Lesson Plan

### Before the Simulation (5 minutes)
- Review the SR flip-flop and identify the problem with S=R=1
- Introduce the JK flip-flop as a solution that defines the forbidden state as toggle
- Present the JK flip-flop characteristic table

### During the Simulation (15 minutes)
1. Start with J=0, K=0; clock several times to confirm Hold mode (Q does not change)
2. Set J=1, K=0; clock once to Set the flip-flop (Q becomes 1)
3. Set J=0, K=1; clock once to Reset the flip-flop (Q becomes 0)
4. Set J=1, K=1; clock repeatedly to observe Toggle mode (Q alternates 0, 1, 0, 1)
5. Review the timing diagram and trace each mode's effect on Q
6. Verify that Toggle mode produces a frequency-divided output (Q changes every clock cycle)

### After the Simulation (5 minutes)
- Compare the JK flip-flop with D and T flip-flops
- Discuss how J=K=1 toggle mode enables counter design
- Derive the characteristic equation Q(next) = JQ' + K'Q from observed behavior

## References

- [JK flip-flop - Wikipedia](https://en.wikipedia.org/wiki/Flip-flop_(electronics)#JK_flip-flop)
- [Flip-flop (electronics) - Wikipedia](https://en.wikipedia.org/wiki/Flip-flop_(electronics))
- Unit 9: Flip-Flops and Sequential Circuits in this textbook
