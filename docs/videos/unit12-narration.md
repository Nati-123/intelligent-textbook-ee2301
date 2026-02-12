# Unit 12 — Introduction to VHDL — Narration Script

**Duration:** ~2–3 minutes
**Voice:** Friendly, educational narrator
**Audience:** Undergraduate engineering students

---

## Script

Welcome to Unit 12, where you will learn VHDL — the hardware description language that bridges the gap between a design on paper and a working circuit in silicon or on an FPGA. If you have programmed in software before, VHDL will feel both familiar and strange, because it describes hardware that operates in parallel, not software that runs step by step.

Every VHDL design begins with two essential pieces. The entity declaration defines the interface — the ports that connect your component to the outside world, along with their directions and data types. The architecture body then describes what the component actually does internally. Think of the entity as the outside of a box, showing the connectors, and the architecture as everything inside.

For data types, you will work primarily with std_logic, which goes beyond simple ones and zeros to include useful values like unknown, high-impedance, and don't-care. This richer type system reflects the real electrical conditions found in actual hardware.

One of the most important concepts in VHDL is the distinction between concurrent and sequential statements. Concurrent statements all execute simultaneously, modeling the parallel nature of real hardware — signals driving gates that operate at the same time. Sequential statements, on the other hand, appear inside process blocks and execute in order, much like software. A process is triggered whenever a signal in its sensitivity list changes, which is how you model both combinational and sequential behavior.

VHDL supports three modeling styles. Structural modeling connects components together like a schematic. Dataflow modeling uses concurrent signal assignments to describe how data flows through logic. Behavioral modeling uses processes with if-then-else and case statements to describe what a circuit does at a higher level of abstraction. In practice, you will use all three styles, sometimes within the same design.

Implementing finite state machines in VHDL is a particularly important skill. You define the states using an enumerated type, then use a process with a case statement to describe the transitions and outputs for each state. This maps directly to the state diagrams you learned in Unit 10.

Finally, you will learn the fundamentals of testbenches — VHDL files that generate stimulus for your design and let you verify correct behavior in simulation before committing to hardware. This distinction between synthesis, which produces real circuits, and simulation, which verifies them, is one that will guide your entire design practice going forward.

---

## Key Takeaways

1. Every VHDL design consists of an entity declaration that defines the interface and an architecture body that describes the behavior, using the std_logic type to represent real-world signal conditions.
2. Concurrent statements model parallel hardware while sequential statements inside process blocks model step-by-step behavior, and understanding this distinction is essential for writing correct VHDL.
3. Testbenches allow you to verify designs in simulation before synthesis, and modeling finite state machines in VHDL connects directly to the FSM design techniques from earlier units.
