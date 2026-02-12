# Unit 7 — Multi-Level Gate Circuits — Narration Script

**Duration:** ~2–3 minutes
**Voice:** Friendly, educational narrator
**Audience:** Undergraduate engineering students

---

## Script

Welcome to Unit 7, where we move from the idealized world of AND-OR and OR-AND circuits into the practical reality of how digital logic is actually built. In real integrated circuits, the gates of choice are NAND and NOR, not AND and OR. Understanding why — and learning how to convert your designs accordingly — is the focus of this unit.

NAND and NOR gates are called universal gates because each one, all by itself, can implement any Boolean function. You can build an AND gate from two NANDs, an OR gate from three NANDs, and a NOT gate from a single NAND with its inputs tied together. The same is true for NOR gates. This universality matters because NAND and NOR gates are cheaper, faster, and smaller at the transistor level than their AND and OR counterparts. In standard cell libraries, they are the fundamental building blocks.

So how do you take a minimal Sum of Products expression and turn it into a NAND-only circuit? The conversion is surprisingly clean. A two-level SOP circuit — AND gates feeding into an OR gate — transforms directly into a NAND-NAND circuit. The trick is that an AND followed by a NOT is a NAND, and by De Morgan's theorem, a NOT followed by an OR is also a NAND. Replace every gate with a NAND, and the inversions cancel at the internal connections. The same logic applies to POS expressions, which convert to NOR-NOR circuits.

For more complex, multi-level circuits, we use a technique called bubble pushing. The idea is to push inversion bubbles through the circuit, converting each gate's type as you go, until every gate is either a NAND or a NOR. You start at the output and work backward, applying De Morgan's theorem at each level. When a bubble appears on an input, you push it back to the output of the preceding gate, changing that gate's type. With practice, this becomes quick and intuitive.

Of course, converting to NAND and NOR is not the only concern. Multi-level circuits introduce additional propagation delay because signals pass through more gate stages. Each gate adds a small delay, and the longest path from input to output — the critical path — determines maximum operating speed. Designers constantly balance gate count, literal count, and delay. Sometimes a flatter two-level circuit is worth the extra gates for speed. Other times, a deeper multi-level structure saves area and power at an acceptable speed trade-off.

By the end of this unit, you will be able to take any Boolean expression, implement it in NAND or NOR gates, analyze its delay, and make informed decisions about the best circuit structure for your constraints.

---

## Key Takeaways

1. NAND and NOR are universal gates — each can implement any Boolean function — and they are the preferred building blocks in real integrated circuits due to their efficiency at the transistor level.
2. SOP expressions convert to NAND-NAND circuits and POS expressions convert to NOR-NOR circuits through systematic application of De Morgan's theorem and the bubble pushing technique.
3. Multi-level circuit design involves balancing gate count, literal count, and propagation delay along the critical path to meet area, power, and speed constraints.
