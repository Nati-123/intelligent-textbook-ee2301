---
title: Unit 11 Quiz - Programmable Logic Devices
description: Test your understanding of PLDs, ROMs, PALs, PLAs, CPLDs, FPGAs, and configurable logic architectures
hide:
  - toc
---

<div class="problems-styled" markdown>

<h1 style="color: #5A3EED !important; border-bottom: 3px solid #5A3EED; padding-bottom: 0.4rem; font-weight: 800; margin-bottom: 1.5rem;">Quiz: Programmable Logic Devices</h1>

<p style="color: #555; line-height: 1.85; font-size: 1.05rem; margin-bottom: 2rem;">
Test your understanding of programmable logic device architectures, configuration technologies, and FPGA design concepts with these questions.
</p>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 1</p>

<p style="color: #333; line-height: 1.75;">What does a ROM used as a combinational logic device store at each address location?</p>

<div class="upper-alpha" markdown>
1. The minimized SOP expression for each output function
2. The gate-level netlist describing the circuit implementation
3. The truth table output values for that input combination
4. The programmable connection map for product terms
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: C</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">A ROM implements combinational logic by storing the complete truth table in hardware. Each address corresponds to one input combination, and the data stored at that address provides the corresponding output values. The ROM's fixed decoder (AND plane) generates all <span class="arithmatex">\(2^n\)</span> minterms, and the programmable OR plane stores which minterms contribute to each output.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> ROM as a Logic Device</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 2</p>

<p style="color: #333; line-height: 1.75;">Which simple PLD has a programmable AND plane but a fixed OR plane?</p>

<div class="upper-alpha" markdown>
1. ROM
2. PLA
3. PAL
4. EPROM
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: C</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">A PAL (Programmable Array Logic) features a programmable AND plane where the designer configures product terms, but a fixed OR plane where each output is permanently connected to a predetermined set of AND gates. This simplification makes PALs faster than PLAs (which have both planes programmable) but prevents product term sharing between outputs.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Programmable Array Logic (PAL)</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 3</p>

<p style="color: #333; line-height: 1.75;">Why must Boolean functions be minimized before implementing them on a PLA, while a ROM requires no minimization?</p>

<div class="upper-alpha" markdown>
1. A PLA has a limited number of programmable product terms, while a ROM's fixed decoder generates all minterms automatically
2. PLAs are physically smaller than ROMs and cannot store complete truth tables
3. ROMs perform internal minimization during the programming process
4. Minimization is equally important for both devices but is optional for ROMs
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: A</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">A ROM contains a fixed <span class="arithmatex">\(n\)</span>-to-<span class="arithmatex">\(2^n\)</span> decoder that generates all possible minterms, so every function is implemented as a complete truth table regardless of complexity—no minimization is needed. A PLA has a finite number of programmable AND gates (product terms), so the designer must minimize functions using K-maps or Quine-McCluskey to ensure the total number of distinct product terms fits within the PLA's capacity.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> PLA Architecture and Programming</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 4</p>

<p style="color: #333; line-height: 1.75;">What is the main advantage of CPLDs over FPGAs for timing-critical applications?</p>

<div class="upper-alpha" markdown>
1. CPLDs have significantly higher logic capacity than FPGAs
2. CPLDs offer predictable, consistent propagation delays due to their global interconnect matrix
3. CPLDs support partial reconfiguration while the device is operating
4. CPLDs use lookup tables that evaluate faster than FPGA routing
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: B</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">CPLDs use a global programmable interconnect matrix that provides fixed routing paths between function blocks, resulting in predictable and consistent propagation delays regardless of which blocks are connected. FPGAs use segmented routing where signal delays vary depending on the physical path taken through multiple switch matrices, making timing analysis more complex and delays less predictable.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Complex PLD (CPLD) Architecture</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 5</p>

<p style="color: #333; line-height: 1.75;">How many SRAM configuration cells are required to store the truth table of a single 6-input lookup table (LUT-6)?</p>

<div class="upper-alpha" markdown>
1. 6
2. 32
3. 64
4. 128
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: C</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">A <span class="arithmatex">\(k\)</span>-input LUT stores <span class="arithmatex">\(2^k\)</span> output values—one for each possible input combination. For a 6-input LUT: <span class="arithmatex">\(2^6 = 64\)</span> SRAM cells are needed. Each cell stores either a '0' or '1', and the 6 input signals select which cell's value appears at the output via a 64:1 multiplexer.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Lookup Tables (LUTs)</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 6</p>

<p style="color: #333; line-height: 1.75;">Two functions <span class="arithmatex">\(F_1\)</span> and <span class="arithmatex">\(F_2\)</span> share the product term <span class="arithmatex">\(A\bar{B}C\)</span>. Which SPLD device type allows this shared product term to be connected to both outputs, reducing total product term count?</p>

<div class="upper-alpha" markdown>
1. PAL—because its dedicated AND gates can be shared across outputs
2. ROM—because its fixed decoder inherently generates all product terms
3. GAL—because its electrically erasable memory enables flexible sharing
4. PLA—because its programmable OR plane can connect any product term to any output
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: D</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">A PLA has both a programmable AND plane and a programmable OR plane. The programmable OR plane allows any product term generated in the AND plane to be connected to multiple outputs. In a PAL, the OR plane is fixed, so each output has its own dedicated AND gates and product terms cannot be shared between outputs. Product term sharing is a key advantage of PLAs for multi-output functions.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> PAL vs PLA Trade-offs</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 7</p>

<p style="color: #333; line-height: 1.75;">In the FPGA design flow, what step immediately follows synthesis?</p>

<div class="upper-alpha" markdown>
1. Technology mapping
2. Bitstream generation
3. Placement and routing
4. Functional simulation
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: A</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">The FPGA design flow proceeds: Design Entry → Functional Simulation → Synthesis → <strong>Technology Mapping</strong> → Placement → Routing → Timing Analysis → Bitstream Generation → Programming. Technology mapping converts the generic gate-level netlist produced by synthesis into the specific primitives available on the target FPGA (LUTs, flip-flops, carry chains, block RAMs, DSP slices).</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> FPGA Design Flow</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 8</p>

<p style="color: #333; line-height: 1.75;">A design requires 100,000 equivalent gates, instant-on capability at power-up, and will operate in a satellite where radiation tolerance is essential. Which programmable device is most appropriate?</p>

<div class="upper-alpha" markdown>
1. SRAM-based FPGA with external boot flash
2. High-density CPLD
3. PAL with registered outputs
4. Flash-based FPGA
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: D</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">The requirements point to a flash-based FPGA: 100,000 gates exceeds CPLD and PAL capacity; instant-on requires non-volatile configuration storage, which rules out SRAM-based FPGAs that need time to load a bitstream at power-up; and satellite applications demand radiation tolerance—flash-based FPGAs (such as Microchip/Microsemi devices) are preferred for aerospace because their non-volatile configuration is inherently more resistant to radiation-induced bit flips than SRAM cells.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> PLD Selection Criteria</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 9</p>

<p style="color: #333; line-height: 1.75;">A 4-input, 3-output combinational function requires only 5 distinct product terms, with 3 terms shared across multiple outputs. Compared to a ROM implementation, how does a PLA implementation differ in resource usage?</p>

<div class="upper-alpha" markdown>
1. The PLA uses more resources because it requires additional circuitry for the programmable OR plane
2. The PLA is more efficient because it generates only 5 product terms instead of the ROM's 16 minterms
3. Both devices use identical resources since they implement the same truth table
4. The ROM is more efficient because its fixed decoder eliminates the need for minimization
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: B</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">A 4-input ROM generates all <span class="arithmatex">\(2^4 = 16\)</span> minterms through its fixed decoder, regardless of how many the function actually uses. The PLA generates only the 5 product terms needed, and its programmable OR plane allows the 3 shared terms to connect to multiple outputs without duplication. For sparse functions (few product terms relative to total minterms), the PLA is significantly more resource-efficient than a ROM.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> ROM as a Logic Device / PLA Architecture</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 10</p>

<p style="color: #333; line-height: 1.75;">A company plans to produce 500 units of a product requiring 10,000 equivalent gates with the possibility of field firmware updates. An engineer recommends using a custom ASIC. What is the best assessment of this recommendation?</p>

<div class="upper-alpha" markdown>
1. The recommendation is poor—at 500 units, the ASIC's high NRE cost far outweighs per-unit savings, and an FPGA better supports field updates
2. The recommendation is sound because ASICs always achieve the lowest total cost of ownership
3. The recommendation depends entirely on the required clock frequency
4. The recommendation is partially correct for cost but ignores the field update requirement
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: A</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">Custom ASIC fabrication requires very high non-recurring engineering (NRE) costs for mask design and fabrication. At only 500 units, the per-unit cost savings of an ASIC cannot offset this NRE investment, making the total cost much higher than using an FPGA or CPLD. Furthermore, ASICs cannot be reprogrammed after manufacturing, so the field update requirement eliminates them entirely. An FPGA or CPLD with 10,000-gate capacity would provide low NRE cost, sufficient logic capacity, and reprogrammability for field updates.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Applications of Programmable Logic / PLD Selection Criteria</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Answers Summary</p>

| Question | Answer | Concept |
|----------|--------|---------|
| 1 | C | ROM as a Logic Device |
| 2 | C | Programmable Array Logic (PAL) |
| 3 | A | PLA Architecture and Programming |
| 4 | B | Complex PLD (CPLD) Architecture |
| 5 | C | Lookup Tables (LUTs) |
| 6 | D | PAL vs PLA Trade-offs |
| 7 | A | FPGA Design Flow |
| 8 | D | PLD Selection Criteria |
| 9 | B | ROM / PLA Architecture |
| 10 | A | Applications of Programmable Logic |

</div>

</div>
