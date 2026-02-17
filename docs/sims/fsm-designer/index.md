---
title: FSM Designer
description: Interactive finite state machine simulator demonstrating Moore machine state transitions and outputs
image: /sims/fsm-designer/fsm-designer.png
quality_score: 85
---

# FSM Designer

<iframe src="main.html" height="520px" width="100%" scrolling="no"></iframe>

[Run the FSM Designer Fullscreen](./main.html){ .md-button .md-button--primary }

## Description

This MicroSim provides an interactive simulation of a Moore finite state machine (FSM) with a visual state diagram and animated transitions. Students can apply binary inputs and watch the machine traverse its state diagram in real time. The current state is highlighted, and the output is displayed based on the current state alone, demonstrating the defining characteristic of Moore machines.

Finite state machines are the cornerstone of sequential circuit design. They model systems with a finite number of states, where transitions between states depend on the current state and input values. Understanding FSMs is essential for designing controllers, protocol handlers, pattern detectors, and virtually all sequential digital systems.

Key features:

- **Visual state diagram**: States displayed as circles with labeled transitions
- **Animated transitions**: Watch the machine move between states when inputs are applied
- **Moore machine outputs**: Outputs depend only on the current state, shown inside each state circle
- **Interactive input control**: Apply Input 0 or Input 1 to trigger transitions
- **Reset capability**: Return the FSM to its initial state at any time

## Iframe Embedding

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://Nati-123.github.io/intelligent-textbook-ee2301/sims/fsm-designer/main.html" height="520px" scrolling="no" width="100%"></iframe>
```

## How to Use

1. **View the state diagram** to understand the machine's structure, states, and transitions
2. **Click "Input 0"** to apply a 0 input and trigger the corresponding state transition
3. **Click "Input 1"** to apply a 1 input and trigger the corresponding state transition
4. **Watch the animation** as the machine moves from one state to another along the transition arc
5. **Observe the output** displayed for the current state (Moore: output depends only on state)
6. **Click "Reset"** to return the machine to its initial state and start over

## Learning Objectives

**Bloom Level**: Analyze (L4)

After using this MicroSim, students will be able to:

- Interpret a state diagram and identify states, transitions, and outputs
- Trace the sequence of states visited for a given input sequence
- Explain why Moore machine outputs depend only on the current state
- Distinguish between Moore and Mealy machine output behavior
- Design simple FSMs to recognize input patterns or control sequential operations

## Lesson Plan

### Before the Simulation (5 minutes)
- Define finite state machines and their components (states, inputs, outputs, transitions)
- Introduce the difference between Moore and Mealy machines
- Show an example state diagram on the board and trace through an input sequence

### During the Simulation (15 minutes)
1. Examine the state diagram and identify the initial state, all states, and transition labels
2. Apply a sequence of inputs (e.g., 0, 1, 1, 0) and record the state visited after each input
3. Note the output at each state and confirm it depends only on the state, not the input
4. Try to find an input sequence that visits every state
5. Try to find an input sequence that produces a specific output pattern
6. Reset and apply a different sequence to observe alternative paths through the state diagram

### After the Simulation (5 minutes)
- Discuss how to derive a state table from the state diagram
- Introduce state assignment and its role in hardware implementation
- Connect FSM design to VHDL process-based modeling of state machines

## References

- [Finite-state machine - Wikipedia](https://en.wikipedia.org/wiki/Finite-state_machine)
- [Moore machine - Wikipedia](https://en.wikipedia.org/wiki/Moore_machine)
- Unit 11: Finite State Machine Design in this textbook
