---
title: Shift Register Simulator
description: Interactive 4-bit shift register demonstrating serial data input, shift operations, and data movement through flip-flops
image: /sims/shift-register-simulator/shift-register-simulator.png
quality_score: 85
---

# Shift Register Simulator

<iframe src="main.html" height="490px" width="100%" scrolling="no"></iframe>

[Run the Shift Register Simulator Fullscreen](./main.html){ .md-button .md-button--primary }

## Description

This MicroSim provides an interactive demonstration of a 4-bit shift register, a sequential circuit that moves data through a chain of flip-flops one position at a time on each clock pulse. Shift registers are fundamental building blocks in digital systems, used for serial-to-parallel conversion, data buffering, and many other applications.

The simulation displays four flip-flop stages connected in series, with a serial input on one end and outputs from each stage. Students can set the serial input value and trigger shift operations to watch data propagate through the register one stage per clock cycle. The visual display clearly shows the contents of each flip-flop at every step.

Key features include:

- Four flip-flop stages displayed with current stored values
- Serial input toggle button to set the incoming bit value
- Shift button to advance data one position through the register
- Visual data flow showing bits moving from left to right
- Clear button to reset all flip-flops to zero
- Serial output from the last flip-flop stage

## Iframe Embedding

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://Nati-123.github.io/intelligent-textbook-ee2301/sims/shift-register-simulator/main.html" height="490px" scrolling="no" width="100%"></iframe>
```

## How to Use

1. Observe the four flip-flop stages and their current contents (initially all zeros).
2. Click **Toggle Input** to set the serial input bit to 0 or 1.
3. Click **Shift** to clock the register -- the serial input enters the first flip-flop and all existing bits shift one position to the right.
4. Repeat steps 2-3 to load a 4-bit pattern into the register (e.g., enter 1, 0, 1, 1 with four shifts).
5. Continue shifting to observe bits exiting the register from the serial output.
6. Click **Clear** to reset all flip-flops to zero and start over.
7. Experiment with different input sequences to understand how data moves through the register.

## Learning Objectives

**Bloom Level**: Apply (L3)

After using this MicroSim, students will be able to:

- Describe how a shift register moves data through a chain of flip-flops on each clock edge
- Demonstrate serial-to-parallel conversion by loading a 4-bit value one bit at a time into the register
- Predict the contents of each flip-flop stage after a given sequence of shift operations and input values

## Lesson Plan

### Before the Simulation (5 minutes)
- Review D flip-flop operation: on a clock edge, Q takes the value of D
- Explain how connecting Q of one flip-flop to D of the next creates a shift register
- Ask students: "How many clock cycles does it take to fully load a 4-bit shift register with serial input?"

### During the Simulation (15 minutes)
1. Start with all flip-flops cleared to 0
2. Set the serial input to 1 and shift once -- observe the 1 enters the first flip-flop
3. Set input to 0 and shift again -- the 1 moves to the second flip-flop, and 0 enters the first
4. Continue entering the pattern 1-0-1-1 over four shifts and verify the register contents
5. Shift four more times with input 0 to observe the pattern exiting the register one bit at a time
6. Have students predict the register contents after a given input sequence before clicking Shift
7. Discuss: what is the serial output at each step?

### After the Simulation (5 minutes)
- Discuss different shift register types: SISO, SIPO, PISO, PIPO
- Explain real-world applications: UART serial communication, LED display drivers, pseudo-random number generators
- Preview how shift registers combine with feedback to create counters (ring counter, Johnson counter)

## References

- [Shift Register - Wikipedia](https://en.wikipedia.org/wiki/Shift_register)
- Unit 10: Registers and Counters
