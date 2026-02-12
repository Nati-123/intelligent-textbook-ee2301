# Unit 2 — Boolean Algebra — Narration Script

**Duration:** ~2–3 minutes
**Voice:** Friendly, educational narrator
**Audience:** Undergraduate engineering students

---

## Script

Welcome to Unit 2, where we meet the mathematical language that makes digital logic possible — Boolean algebra. If number systems gave us the data, Boolean algebra gives us the rules for processing that data. Every gate on a chip, every decision a processor makes, traces back to the principles you will learn here.

Boolean algebra operates on just two values: zero and one, which you can also think of as false and true. From that simple starting point, three fundamental operations define everything else. The AND operation outputs a one only when all of its inputs are one. The OR operation outputs a one when at least one input is one. And the NOT operation, sometimes called inversion, simply flips a zero to a one or a one to a zero. In circuit terms, each operation corresponds to a physical logic gate, and we draw them with distinctive shapes that you will quickly learn to recognize on a schematic.

From these three primitives, we derive several important compound operations. NAND is AND followed by NOT, and NOR is OR followed by NOT. You will discover later in the course that NAND and NOR are each individually capable of implementing any Boolean function — a remarkable property that makes them the workhorses of real integrated circuits. We also have XOR, which outputs a one when its inputs differ, and XNOR, which outputs a one when its inputs match. XOR shows up everywhere, from parity checking to arithmetic carry logic.

Now, just as regular algebra has rules for simplifying expressions, Boolean algebra has its own set of theorems and identities. You will work with the commutative, associative, and distributive laws, along with special identities like the identity law, complement law, and idempotent law. Two especially powerful results are De Morgan's theorems, which let you convert between AND and OR forms by complementing and swapping operators. Mastering these theorems allows you to simplify complex expressions, which directly translates into circuits that use fewer gates, consume less power, and run faster.

Finally, we introduce two standard forms for writing Boolean expressions: Sum of Products and Product of Sums. Sum of Products, or SOP, writes a function as an OR of AND terms. Product of Sums, or POS, writes it as an AND of OR terms. These standard forms give you a systematic starting point for both analysis and simplification, and they connect directly to the canonical representations you will explore in Unit 4.

Think of this unit as learning the grammar of digital design. Once you speak Boolean algebra fluently, every unit that follows will feel like a natural conversation.

---

## Key Takeaways

1. AND, OR, and NOT are the three fundamental operations, and every digital circuit can be built from combinations of these gates.
2. Boolean theorems — especially De Morgan's theorems — let you simplify expressions, leading directly to more efficient circuit implementations.
3. Sum of Products and Product of Sums are standard forms that provide a systematic way to express and manipulate any Boolean function.
