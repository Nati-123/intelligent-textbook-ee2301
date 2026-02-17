---
title: Multiplexer Simulator
description: Interactive 4-to-1 multiplexer demonstrating data selection and routing using select signals
image: /sims/mux-simulator/mux-simulator.png
quality_score: 85
---

# Multiplexer Simulator

<iframe src="main.html" height="540px" width="100%" scrolling="no"></iframe>

[Run the Multiplexer Simulator Fullscreen](./main.html){ .md-button .md-button--primary }

## Description

This MicroSim provides an interactive simulation of a 4-to-1 multiplexer (MUX), a fundamental data selection circuit that routes one of four data inputs to a single output based on two select signals. Students can toggle each data input and the select lines independently, observing in real time which input is passed through to the output. The simulator displays the circuit schematic and a truth table highlighting the current selection.

Multiplexers are among the most versatile combinational building blocks. They serve as data selectors in bus systems, can implement arbitrary Boolean functions, and form the basis of lookup tables (LUTs) in FPGAs. Understanding MUX operation is critical for both combinational logic design and modern programmable device architectures.

Key features:

- **Four data inputs**: Toggle D0, D1, D2, and D3 independently between 0 and 1
- **Two select signals**: Set S1 and S0 to choose which input reaches the output
- **Output display**: See the selected input value routed to output Y
- **Truth table**: Complete selection table with the current state highlighted
- **Circuit visualization**: Schematic showing the data path from selected input to output

## Iframe Embedding

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://Nati-123.github.io/intelligent-textbook-ee2301/sims/mux-simulator/main.html" height="540px" scrolling="no" width="100%"></iframe>
```

## How to Use

1. **Toggle data inputs** D0, D1, D2, and D3 by clicking each one to set their values
2. **Set select signal S1** by clicking to toggle between 0 and 1
3. **Set select signal S0** by clicking to toggle between 0 and 1
4. **Observe the output Y** which reflects the value of the selected data input
5. **Check the truth table** to see which input is currently selected (highlighted row)
6. **Experiment**: set all inputs to different values, then cycle through select combinations to verify each input is correctly routed

## Learning Objectives

**Bloom Level**: Apply (L3)

After using this MicroSim, students will be able to:

- Explain how a multiplexer selects one of N data inputs using log2(N) select lines
- Determine the output of a 4-to-1 MUX for any combination of data inputs and select signals
- Describe how a multiplexer can implement any Boolean function of its select variables
- Relate multiplexer operation to the sum-of-minterms canonical form
- Identify practical applications of multiplexers in data buses, time-division multiplexing, and FPGA LUTs

## Lesson Plan

### Before the Simulation (5 minutes)
- Introduce the concept of data selection and routing in digital systems
- Draw the analogy of a MUX to a rotary switch that connects one of several sources to an output
- Present the relationship: a 2^n-to-1 MUX uses n select lines

### During the Simulation (15 minutes)
1. Set D0=1, D1=0, D2=0, D3=0; set S1=0, S0=0; verify Y=1 (D0 selected)
2. Change to S1=0, S0=1; verify Y=0 (D1 selected)
3. Change to S1=1, S0=0; verify Y=0 (D2 selected)
4. Change to S1=1, S0=1; verify Y=0 (D3 selected)
5. Now set all inputs to 1 and cycle through selects to confirm Y is always 1
6. Try implementing a specific Boolean function: set D0=0, D1=1, D2=1, D3=0 and observe that Y = S1 XOR S0

### After the Simulation (5 minutes)
- Discuss how to build larger MUXes (8-to-1, 16-to-1) from smaller ones using cascading
- Explain Shannon's expansion theorem and its connection to MUX-based function implementation
- Connect to FPGA architecture where lookup tables are essentially small multiplexers

## References

- [Multiplexer - Wikipedia](https://en.wikipedia.org/wiki/Multiplexer)
- [Shannon's expansion theorem - Wikipedia](https://en.wikipedia.org/wiki/Boole%27s_expansion_theorem)
- Unit 7: Combinational Logic Modules in this textbook
