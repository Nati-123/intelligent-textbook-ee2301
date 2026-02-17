---
title: Unit 13 Quiz - System Integration and Design Projects
description: Test your understanding of top-down design, verification, timing analysis, pipelining, and system-level digital design
hide:
  - toc
---

# Quiz: System Integration and Design Projects

Test your understanding of top-down design methodology, datapath-controller architecture, verification strategies, timing analysis, and system-level trade-offs with these questions.

---

#### 1. What is the correct sequence of steps in the top-down design methodology?

<div class="upper-alpha" markdown>
1. Implementation → Architecture → Specification → Verification
2. Architecture → Detailed Design → Specification → Verification
3. Verification → Specification → Architecture → Implementation
4. Specification → Architecture → Detailed Design → Integration → Verification → Implementation
</div>

**Answer:** The correct answer is **D**. The top-down methodology begins with a clear specification of system requirements, followed by architectural partitioning into subsystems, detailed RTL design of each subsystem, integration of subsystems using structural VHDL, verification through comprehensive testbenches and timing analysis, and finally implementation on the target FPGA. Working from abstract to detailed prevents the designer from getting lost in low-level details before the overall structure is defined.

**Concept Tested:** Top-Down Design Methodology

---

#### 2. In a digital system with datapath-controller separation, which component generates the control signals that direct data movement through registers, ALUs, and multiplexers?

<div class="upper-alpha" markdown>
1. A finite state machine (control unit)
2. The arithmetic logic unit (ALU)
3. The register file
4. The clock distribution network
</div>

**Answer:** The correct answer is **A**. The control unit is a finite state machine that generates control signals (MUX selects, register load enables, ALU operation codes) to direct data flow through the datapath on each clock cycle. The datapath performs the actual data processing, while the control unit orchestrates the sequence of operations. This separation allows the same datapath hardware to perform different operations on different clock cycles.

**Concept Tested:** Datapath and Control Unit Separation

---

#### 3. Why does professional digital design typically devote 60-70% of engineering effort to verification rather than design?

<div class="upper-alpha" markdown>
1. Verification tools are more expensive and require specialized expertise to operate
2. Synthesis tools always produce suboptimal designs that need extensive correction
3. Bugs found after manufacturing are extremely costly, so thorough pre-silicon verification is essential for catching errors early
4. Verification can be fully automated while design requires manual intervention
</div>

**Answer:** The correct answer is **C**. In digital ASIC and FPGA design, errors discovered late in the development cycle or after manufacturing are vastly more expensive to fix than those caught early. A bug found in simulation costs minutes to fix; a bug found after ASIC fabrication requires a new mask set costing millions of dollars. Even for FPGAs, hardware debugging is much more time-consuming than simulation. Comprehensive verification—including functional simulation, timing analysis, and edge-case testing—is the primary defense against costly post-implementation errors.

**Concept Tested:** Verification Planning

---

#### 4. In the setup time constraint equation $T_{clk} \geq T_{cq} + T_{comb} + T_{setup}$, what does $T_{comb}$ represent?

<div class="upper-alpha" markdown>
1. The clock-to-Q delay of the destination flip-flop
2. The worst-case propagation delay through the combinational logic between two flip-flops
3. The minimum setup time required at the destination register
4. The clock skew between source and destination flip-flops
</div>

**Answer:** The correct answer is **B**. In the timing model for synchronous circuits, $T_{comb}$ represents the worst-case propagation delay through all combinational logic gates on the path between a source flip-flop's Q output and the destination flip-flop's D input. The critical path—the path with the largest total $T_{cq} + T_{comb} + T_{setup}$—determines the maximum achievable clock frequency. $T_{cq}$ is the source flip-flop's clock-to-Q delay, and $T_{setup}$ is the destination flip-flop's setup time requirement.

**Concept Tested:** Static Timing Analysis

---

#### 5. A synchronous circuit has $T_{cq} = 2$ ns, a critical path combinational delay $T_{comb} = 15$ ns, and $T_{setup} = 3$ ns. What is the maximum clock frequency?

<div class="upper-alpha" markdown>
1. 50 MHz
2. 66.7 MHz
3. 33.3 MHz
4. 100 MHz
</div>

**Answer:** The correct answer is **A**. The maximum clock frequency is determined by $f_{max} = 1/(T_{cq} + T_{comb} + T_{setup})$. Substituting the values: $f_{max} = 1/(2 + 15 + 3) \text{ ns} = 1/20 \text{ ns} = 50$ MHz. The clock period must be at least 20 ns to ensure data propagates from the source flip-flop through the combinational logic and arrives at the destination flip-flop before the next clock edge, satisfying the setup time requirement.

**Concept Tested:** Critical Path Identification / Clock Frequency Determination

---

#### 6. A designer adds one pipeline register to split a 20 ns combinational path into two equal 10 ns stages. Given $T_{cq} = 2$ ns and $T_{setup} = 1$ ns, what is the new maximum clock frequency?

<div class="upper-alpha" markdown>
1. 50 MHz
2. 66.7 MHz
3. 76.9 MHz
4. 100 MHz
</div>

**Answer:** The correct answer is **C**. After pipelining, each stage has $T_{comb} = 10$ ns. The new constraint is $f_{max} = 1/(T_{cq} + T_{comb} + T_{setup}) = 1/(2 + 10 + 1) \text{ ns} = 1/13 \text{ ns} \approx 76.9$ MHz. Compared to the unpipelined frequency of $1/23 \text{ ns} \approx 43.5$ MHz, pipelining achieves a 1.77× throughput improvement. The trade-off is one additional clock cycle of latency and the area cost of the pipeline register.

**Concept Tested:** Pipelining for Performance

---

#### 7. In a UART transmitter design, which component is responsible for converting the system clock frequency down to the baud rate timing?

<div class="upper-alpha" markdown>
1. The parallel-to-serial shift register
2. The bit counter that tracks data bit position
3. The transmission control FSM
4. The baud rate generator (clock divider counter)
</div>

**Answer:** The correct answer is **D**. The baud rate generator is a counter that divides the system clock frequency down to the desired baud rate (e.g., 9600, 115200 baud). It generates a timing tick at the correct intervals to shift out each bit. For example, with a 50 MHz system clock and 9600 baud: the counter counts to $50{,}000{,}000 / 9{,}600 \approx 5208$ before generating a tick. The shift register, bit counter, and FSM all depend on this timing signal to operate at the correct rate.

**Concept Tested:** System-Level Example: Serial Communication

---

#### 8. A designer must choose between two implementations: (1) two dedicated 8-bit adders operating in parallel, or (2) one shared 8-bit adder with input multiplexers and a control FSM performing two additions sequentially. Under what condition is the resource-sharing approach preferred?

<div class="upper-alpha" markdown>
1. When maximum computation throughput is the highest priority
2. When FPGA area is constrained and the two additions do not need to execute simultaneously
3. When the clock frequency must be maximized to meet real-time deadlines
4. When the design requires the lowest possible latency per operation
</div>

**Answer:** The correct answer is **B**. Resource sharing trades execution time for hardware area: using one adder instead of two halves the adder count but doubles the time required (two clock cycles instead of one). This approach is preferred when FPGA area (LUTs, flip-flops) is constrained and the two additions can tolerate sequential execution. If both additions must complete in the same clock cycle (for throughput or latency reasons), dedicated parallel adders are necessary despite the higher area cost.

**Concept Tested:** Resource Sharing and Scheduling

---

#### 9. In the digital combination lock example, the control FSM transitions from WAIT_DIGIT to CHECK when the Enter button is pressed. Why is an edge detector needed for the Enter button rather than using the raw button level directly?

<div class="upper-alpha" markdown>
1. Without edge detection, a single button press spanning multiple clock cycles would register as multiple digit entries
2. Edge detectors reduce the propagation delay of the button signal path
3. Level-sensitive inputs cannot be connected to FSM transition conditions in VHDL
4. Edge detection is needed to prevent metastability in the flip-flops
</div>

**Answer:** The correct answer is **A**. A mechanical button press typically lasts hundreds of milliseconds, while the FSM clock runs at megahertz frequencies—meaning the button appears HIGH for thousands of clock cycles. Without edge detection, the FSM would see the sustained HIGH level and interpret it as multiple presses, advancing through multiple states incorrectly. An edge detector produces a single-cycle pulse on the rising edge of the button signal, ensuring exactly one FSM transition per button press regardless of how long the button is held.

**Concept Tested:** System-Level Example: Digital Lock

---

#### 10. A team has implemented an 8-bit ALU, a register file, and a control FSM—all individually verified with unit testbenches that pass. During integration testing, the system produces incorrect results. What is the most likely class of error and the best debugging approach?

<div class="upper-alpha" markdown>
1. The unit testbenches contained incorrect expected values, so all modules need complete redesign
2. The synthesis tool introduced optimization errors; the solution is to disable all synthesis optimizations
3. The ALU has a subtle arithmetic overflow bug that only manifests with specific operand combinations
4. Interface mismatches between modules (signal encoding, timing assumptions, or protocol violations); trace control signals and data across module boundaries in an integration testbench
</div>

**Answer:** The correct answer is **D**. When individually-verified modules fail during integration, the most common cause is interface mismatches—disagreements between modules about signal encoding (e.g., unsigned vs signed), timing conventions (e.g., data valid one cycle after request vs same cycle), bus widths, or handshake protocols. The best debugging approach is to create an integration testbench that traces control signals and data across module boundaries, verifying that each module's outputs match the next module's expected inputs. This is why interface specification (port names, types, timing, encoding, and protocol) is a critical step in the top-down design methodology.

**Concept Tested:** Interface Specification / Design Review and Optimization

---

## Answers Summary

| Question | Answer | Concept |
|----------|--------|---------|
| 1 | D | Top-Down Design Methodology |
| 2 | A | Datapath and Control Unit Separation |
| 3 | C | Verification Planning |
| 4 | B | Static Timing Analysis |
| 5 | A | Critical Path / Clock Frequency |
| 6 | C | Pipelining for Performance |
| 7 | D | Serial Communication (UART) |
| 8 | B | Resource Sharing and Scheduling |
| 9 | A | Digital Lock System Design |
| 10 | D | Interface Specification |
