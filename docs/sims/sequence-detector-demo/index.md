---
title: Sequence Detector Demo
description: Interactive Moore FSM that detects the bit pattern 101 in a serial input stream with overlapping detection
image: /sims/sequence-detector-demo/sequence-detector-demo.png
quality_score: 85
---

# Sequence Detector Demo

<iframe src="main.html" height="550px" width="100%" scrolling="no"></iframe>

[Run the Sequence Detector Demo Fullscreen](./main.html){ .md-button .md-button--primary }

## Description

This MicroSim demonstrates a Moore-type finite state machine (FSM) designed to detect the bit pattern "101" in a serial input stream. Sequence detection is one of the classic applications of FSM design, and this simulation provides a hands-on way to explore how a state machine processes input one bit at a time to recognize a target pattern.

The simulation displays the FSM state diagram with all states and transitions, the current state highlighted, the input bit history, and the output signal that goes HIGH when the pattern "101" has been detected. Importantly, the detector supports overlapping detection -- after finding "101", the final "1" can serve as the beginning of a new "101" pattern.

Key features include:

- Visual FSM state diagram with highlighted current state
- Input 0 and Input 1 buttons for entering serial bits
- Bit history display showing the stream of entered bits
- Output indication when the "101" pattern is detected
- Overlapping pattern detection support
- Clear/reset functionality to start fresh

## Iframe Embedding

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://Nati-123.github.io/intelligent-textbook-ee2301/sims/sequence-detector-demo/main.html" height="550px" scrolling="no" width="100%"></iframe>
```

## How to Use

1. Observe the FSM state diagram showing all states and transitions for the "101" detector.
2. Click **Input 0** to enter a 0 bit or **Input 1** to enter a 1 bit into the serial stream.
3. Watch the FSM transition between states as each bit is entered.
4. Monitor the **output signal**: it goes to 1 when the sequence "101" has been fully detected.
5. After detection, enter another 0 followed by 1 to observe **overlapping detection** (the last "1" of "101" begins a new potential match).
6. Review the bit history to trace back which inputs led to the current state.
7. Click **Clear** to reset the FSM to its initial state and start a new input sequence.

## Learning Objectives

**Bloom Level**: Analyze (L4)

After using this MicroSim, students will be able to:

- Trace the operation of a Moore FSM through a sequence of inputs and determine when the output is asserted
- Distinguish between overlapping and non-overlapping sequence detection and explain why overlapping detection requires specific state transitions
- Design a state diagram for a simple sequence detector given a target bit pattern

## Lesson Plan

### Before the Simulation (5 minutes)
- Review the difference between Moore and Mealy FSMs (output depends on state only vs. state and input)
- Introduce the sequence detection problem: "How can a circuit detect a specific pattern in a stream of bits?"
- Draw the state diagram for a "101" detector on the board and label all transitions

### During the Simulation (15 minutes)
1. Start in the initial state and enter the sequence 1-0-1 -- observe the output goes HIGH
2. Without clearing, enter 0-1 to demonstrate overlapping detection (the previous "1" is reused)
3. Enter a long random sequence and predict when the output will assert before clicking
4. Deliberately enter sequences that almost match (e.g., 1-0-0) and observe the FSM returns to an earlier state
5. Have students draw the state transition table from their observations
6. Discuss: how many states are needed, and what does each state "remember" about the input history?

### After the Simulation (5 minutes)
- Compare the Moore implementation with a Mealy version of the same detector
- Ask students to modify the design on paper for a different pattern (e.g., "110" or "1001")
- Discuss how sequence detectors are used in real communication systems (e.g., detecting start/stop bits in UART)

## References

- [Finite-State Machine - Wikipedia](https://en.wikipedia.org/wiki/Finite-state_machine)
- [Sequence Detector - Wikipedia](https://en.wikipedia.org/wiki/Sequence_detector)
- Unit 11: Finite State Machines
