# Unit 8 — Combinational Logic Modules — Narration Script

**Duration:** ~2–3 minutes
**Voice:** Friendly, educational narrator
**Audience:** Undergraduate engineering students

---

## Script

Welcome to Unit 8, where we move beyond individual gates and start working with combinational logic modules — the medium-scale building blocks that make complex digital systems practical to design.

Think of it this way. In earlier units, you learned how to work with individual bricks. Now, you are going to learn how to use prefabricated walls and windows. These modules are standardized, well-tested components that save you enormous amounts of time and effort.

We will begin with the multiplexer, or MUX, one of the most versatile modules in digital design. A multiplexer selects one of several input signals and routes it to a single output, controlled by a set of selection lines. You can think of it as a digitally controlled switch. Interestingly, a MUX can also implement arbitrary Boolean functions — a single eight-to-one MUX can replace an entire network of gates for any three-variable function, which is a remarkably powerful trick.

Working in the opposite direction, we have the demultiplexer, or DEMUX, which takes a single input and routes it to one of many outputs. Together, MUX and DEMUX form the foundation of data routing in everything from communication systems to memory buses.

Next, we will explore encoders and decoders. An encoder compresses information by converting one active input line into a compact binary code. Priority encoders add an important refinement — when multiple inputs are active simultaneously, they report only the highest-priority one. Decoders do the reverse, taking a binary code and activating exactly one output line. Decoders are essential for address decoding in memory systems, where they determine which chip or register responds to a given address.

We will also cover magnitude comparators, which tell you whether one binary number is greater than, less than, or equal to another. These are building blocks for sorting networks and conditional logic. Finally, we will look at code converters, particularly the conversion between standard binary and Gray code. Gray code is designed so that only one bit changes between consecutive values, which is crucial for eliminating errors in sensors and mechanical encoders.

By the end of this unit, you will have a toolkit of ready-made modules that snap together to build sophisticated combinational systems, and you will understand how each one works internally so you can adapt them when needed.

---

## Key Takeaways

1. Multiplexers and demultiplexers are fundamental data-routing components, and a MUX can implement any Boolean function of its select variables.
2. Encoders compress information into binary codes while decoders expand binary codes to activate individual lines — both are essential for address decoding and priority arbitration.
3. Magnitude comparators and code converters such as Binary-to-Gray round out a practical toolkit of combinational modules used throughout real digital systems.
