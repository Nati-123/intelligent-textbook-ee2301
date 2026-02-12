# Unit 10 — Sequential Circuit Design — Narration Script

**Duration:** ~2–3 minutes
**Voice:** Friendly, educational narrator
**Audience:** Undergraduate engineering students

---

## Script

Welcome to Unit 10, where we take the flip-flops and latches from the previous unit and put them to work in complete sequential circuits. This is where you learn to design circuits that count, shift data, and make decisions over time.

We will begin with registers, which are groups of flip-flops working together to store multi-bit data. A parallel-load register can capture an entire word of data in a single clock cycle. Shift registers, on the other hand, move data one bit at a time through a chain of flip-flops. They come in several configurations — serial-in serial-out, serial-in parallel-out, parallel-in serial-out — and the universal shift register combines all of these capabilities in one flexible device. Shift registers are everywhere, from serial communication links to digital signal processing pipelines.

Next, we will tackle counters, which are among the most commonly used sequential circuits. Ripple counters are simple — each flip-flop triggers the next — but they suffer from cumulative propagation delays that limit their speed. Synchronous counters solve this by clocking every flip-flop simultaneously, making them faster and more predictable. You will learn to design up-counters, down-counters, modulo-N counters that wrap around at a specific count, and BCD counters that count in decimal-friendly patterns. We will also explore ring counters and Johnson counters, which use shift-register feedback to generate unique state sequences useful for timing and control applications.

The highlight of this unit is the finite state machine, or FSM. An FSM is a sequential circuit whose behavior is defined by a set of states, transitions between those states, and outputs. There are two main models: Moore machines, where outputs depend only on the current state, and Mealy machines, where outputs depend on both the current state and the current inputs. Mealy machines can respond faster because they do not have to wait for a state transition to change their output, but Moore machines are often simpler to design and debug.

You will learn to express FSM behavior using state diagrams and state tables, choose a state encoding, and follow a systematic design procedure from specification all the way to a working circuit. As a practical application, we will design sequence detectors — circuits that monitor a stream of bits and signal when a particular pattern appears. This exercise ties together everything you have learned about sequential design in a satisfying way.

---

## Key Takeaways

1. Registers and shift registers store and move multi-bit data, providing the essential storage and data-transfer building blocks used in processors, communication interfaces, and signal processing systems.
2. Synchronous counters overcome the speed limitations of ripple counters, and specialized counter types such as modulo-N, BCD, ring, and Johnson counters serve a wide range of timing and control applications.
3. Finite state machines — in both Moore and Mealy forms — provide a systematic methodology for designing sequential circuits that follow a defined sequence of states, with sequence detectors being a classic and practical example.
