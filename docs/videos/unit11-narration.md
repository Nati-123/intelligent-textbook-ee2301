# Unit 11 — Programmable Logic Devices — Narration Script

**Duration:** ~2–3 minutes
**Voice:** Friendly, educational narrator
**Audience:** Undergraduate engineering students

---

## Script

Welcome to Unit 11. So far, you have been designing digital circuits on paper and in simulation. Now, we are going to explore the devices that let you bring those designs into the physical world — programmable logic devices, or PLDs.

The simplest idea is actually one you have already encountered: read-only memory, or ROM. A ROM can implement any combinational function by treating the address lines as inputs and the stored data as outputs. Every possible input combination has a pre-programmed result, which makes ROM a brute-force but perfectly general logic implementation tool.

From this foundation, the industry developed more efficient alternatives. Programmable Array Logic, or PAL, devices contain a programmable AND array feeding a fixed OR array. They are efficient for implementing sum-of-products expressions directly. Programmable Logic Arrays, or PLAs, take this one step further with both programmable AND and programmable OR arrays, offering more flexibility at the cost of more complex programming. In both cases, the connections are defined by fuse or antifuse technology — you literally burn or form connections to configure the logic.

As designs grew more complex, simple PLDs were not enough, and Complex PLDs, or CPLDs, emerged. A CPLD contains multiple PLD-like blocks connected through a programmable interconnect, with each block featuring a macrocell that includes flip-flops and output control. CPLDs offer predictable timing because the interconnect structure is uniform, making them well-suited for timing-critical glue logic.

The real revolution, however, came with Field-Programmable Gate Arrays, or FPGAs. Instead of AND-OR arrays, FPGAs use lookup tables — small memories that can implement any function of their input variables. These lookup tables sit inside configurable logic blocks, or CLBs, which also contain flip-flops and carry logic. Thousands or even millions of these blocks are connected by a rich programmable routing network. FPGAs can implement virtually any digital system, from simple controllers to entire processors.

The FPGA design flow will become central to your practice. You describe your circuit in a hardware description language, synthesize it into the FPGA's resources, place and route the design, and then download the configuration to the chip. Understanding device selection criteria — such as logic capacity, speed, power consumption, and cost — helps you choose the right device for each project.

---

## Key Takeaways

1. ROM, PAL, and PLA devices implement combinational logic using programmable arrays of connections, evolving from brute-force lookup to efficient sum-of-products architectures.
2. CPLDs group multiple PLD blocks with a predictable interconnect, offering deterministic timing, while FPGAs use lookup tables within configurable logic blocks to achieve massive flexibility and capacity.
3. The FPGA design flow — from HDL description through synthesis, place-and-route, and device programming — is the modern pathway for turning digital designs into working hardware.
