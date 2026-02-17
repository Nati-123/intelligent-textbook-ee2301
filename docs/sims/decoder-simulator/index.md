---
title: Decoder Simulator
description: Interactive 2-to-4 line decoder demonstrating binary-to-one-hot conversion with truth table
image: /sims/decoder-simulator/decoder-simulator.png
quality_score: 85
---

# Decoder Simulator

<iframe src="main.html" height="510px" width="100%" scrolling="no"></iframe>

[Run the Decoder Simulator Fullscreen](./main.html){ .md-button .md-button--primary }

## Description

This MicroSim provides an interactive simulation of a 2-to-4 line decoder, a fundamental combinational circuit that converts a binary input code into a one-hot output. Students can toggle the two input bits and observe which single output line becomes active. The simulator displays both the circuit schematic and the complete truth table with the current state highlighted.

Decoders are essential building blocks used in memory address decoding, instruction decoding in processors, data demultiplexing, and seven-segment display drivers. Understanding decoders is critical for grasping how binary information is interpreted and routed within digital systems.

Key features:

- **Interactive binary inputs**: Toggle A1 and A0 to select different output lines
- **One-hot output display**: Exactly one of four outputs (Y0-Y3) is active at any time
- **Truth table visualization**: Complete truth table with the current input/output combination highlighted
- **Circuit schematic**: Visual representation of the decoder with input and output connections
- **Real-time feedback**: Outputs update instantly as inputs change

## Iframe Embedding

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="https://Nati-123.github.io/intelligent-textbook-ee2301/sims/decoder-simulator/main.html" height="510px" scrolling="no" width="100%"></iframe>
```

## How to Use

1. **Toggle input A1** by clicking on it to switch between 0 and 1
2. **Toggle input A0** by clicking on it to switch between 0 and 1
3. **Observe** which output (Y0, Y1, Y2, or Y3) becomes active based on the binary input combination
4. **Study the truth table** to see all four input/output combinations and note the current one highlighted
5. **Verify** the relationship: input value N (in decimal) activates output YN
6. **Cycle through all four input combinations** (00, 01, 10, 11) to confirm one-hot behavior

## Learning Objectives

**Bloom Level**: Apply (L3)

After using this MicroSim, students will be able to:

- Explain the function of a decoder as a binary-to-one-hot converter
- Determine which output line is active for any given binary input combination
- Describe the relationship between the number of input lines and the number of output lines (n inputs produce 2^n outputs)
- Apply decoders to implement arbitrary Boolean functions using external OR gates
- Identify practical applications of decoders in memory address selection and instruction decoding

## Lesson Plan

### Before the Simulation (5 minutes)
- Review binary number representation and the concept of one-hot encoding
- Discuss where decoders are used in real digital systems (memory chips, CPU instruction decode)

### During the Simulation (15 minutes)
1. Start with inputs A1=0, A0=0 and observe that Y0 is the active output
2. Toggle A0 to 1; observe Y1 becomes active (binary 01 selects output 1)
3. Set A1=1, A0=0; observe Y2 is active (binary 10 selects output 2)
4. Set A1=1, A0=1; observe Y3 is active (binary 11 selects output 3)
5. Verify that exactly one output is active at all times (one-hot property)
6. Relate each output to its minterm: Y0 = A1'A0', Y1 = A1'A0, Y2 = A1A0', Y3 = A1A0

### After the Simulation (5 minutes)
- Discuss how to extend the concept to 3-to-8 and 4-to-16 decoders
- Explain how decoders can implement any Boolean function when combined with OR gates
- Introduce the enable input and its role in building larger decoders from smaller ones

## References

- [Binary decoder - Wikipedia](https://en.wikipedia.org/wiki/Binary_decoder)
- [One-hot encoding - Wikipedia](https://en.wikipedia.org/wiki/One-hot)
- Unit 7: Combinational Logic Modules in this textbook
