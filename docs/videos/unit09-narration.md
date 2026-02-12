# Unit 9 — Sequential Logic Fundamentals — Narration Script

**Duration:** ~2–3 minutes
**Voice:** Friendly, educational narrator
**Audience:** Undergraduate engineering students

---

## Script

Welcome to Unit 9. Up to this point, every circuit we have studied has been combinational — the output depends only on the current inputs. Now, we are about to cross a fundamental threshold into sequential logic, where circuits can remember. This is the unit where digital design truly comes alive.

The key difference is simple but profound. A sequential circuit's output depends not only on its current inputs but also on its history — its stored state. This is what makes computers possible. Without memory, there are no counters, no registers, no processors, and no stored programs.

We will start with the most basic memory element, the SR latch, built from just two cross-coupled NOR or NAND gates. The SR latch can hold a single bit of information, but it has a significant limitation — the forbidden input condition where both Set and Reset are active can cause unpredictable behavior.

The D latch solves this by ensuring only one control input determines the stored value. However, the D latch introduces its own challenge called transparency. When the enable signal is high, the output follows the input continuously, which can cause problems in multi-stage systems where one stage feeds another.

This brings us to the clock signal and the principle of synchronous design. A clock provides a shared heartbeat for the entire system, and the edge-triggered D flip-flop responds only at the precise moment of a clock edge, not during the entire time the clock is high. This eliminates the transparency problem and makes large-scale synchronous systems practical. Most flip-flops use a master-slave construction internally to achieve this clean edge-triggered behavior.

Beyond the D flip-flop, we will also meet the JK flip-flop, which adds the ability to toggle, and the T flip-flop, which is dedicated to toggling. Each has its own characteristic table that defines its behavior and an excitation table that helps you design circuits around it.

We will close by examining critical timing parameters: setup time, hold time, and clock-to-Q delay. These define the window during which input data must be stable for reliable capture. When these requirements are violated, the flip-flop can enter a state called metastability, where the output is neither a solid zero nor a solid one — a condition every digital designer must learn to respect and avoid.

---

## Key Takeaways

1. Sequential circuits differ from combinational circuits because they have memory — their outputs depend on both current inputs and stored state, which is the foundation of all computing.
2. Edge-triggered D flip-flops, built using master-slave construction, solve the transparency problem of latches and enable reliable synchronous design driven by a clock signal.
3. Timing parameters such as setup time, hold time, and clock-to-Q delay must be respected to avoid metastability, which is a critical concern in all real-world sequential designs.
