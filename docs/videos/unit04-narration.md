# Unit 4 — Minterm and Maxterm Expansions — Narration Script

**Duration:** ~2–3 minutes
**Voice:** Friendly, educational narrator
**Audience:** Undergraduate engineering students

---

## Script

Welcome to Unit 4, where we formalize something you have already been doing intuitively — writing Boolean functions in their most complete and unambiguous form. These canonical representations, built from minterms and maxterms, give you a precise language for describing any Boolean function and a solid foundation for the simplification techniques that follow.

Let's start with minterms. A minterm is an AND term — also called a product term — that includes every variable in the function, either in its true form or its complemented form. For a function of three variables A, B, and C, the minterm A-AND-B-AND-NOT-C represents the single input combination where A is one, B is one, and C is zero. Each row of a truth table where the output is one corresponds to exactly one minterm. When you OR all of those minterms together, you get the canonical Sum of Products, which we write compactly using Sigma notation followed by the list of minterm indices. This form completely and uniquely specifies the function.

Maxterms work in the complementary direction. A maxterm is an OR term — a sum term — that includes every variable. Each row where the output is zero corresponds to one maxterm. When you AND all of those maxterms together, you get the canonical Product of Sums, written with Pi notation. The beauty of the relationship is that any minterm index absent from the Sigma list appears in the Pi list, and vice versa. So converting between the two canonical forms is simply a matter of swapping the indices.

Deriving these expressions from a truth table is straightforward. For the canonical SOP, identify every row with a one output, write the corresponding minterm, and OR them together. For the canonical POS, identify every row with a zero output, write the corresponding maxterm, and AND them together. This mechanical process means you can always go from a truth table to an algebraic expression without any guesswork.

We also revisit the Shannon expansion theorem, which shows that any Boolean function can be decomposed around a chosen variable into two smaller sub-functions. This decomposition is not just a theoretical curiosity — it underpins the structure of multiplexers, binary decision diagrams, and many synthesis algorithms used by modern design tools.

Finally, don't care conditions make a return appearance. In canonical form, don't care minterms are listed separately using a d-notation alongside the Sigma or Pi list. Keeping them explicit at this stage preserves the freedom to assign them during later minimization, which is exactly what Karnaugh maps and the Quine-McCluskey method will do in the upcoming units.

---

## Key Takeaways

1. Minterms and maxterms provide a canonical, unambiguous way to represent any Boolean function as a Sum of Products or Product of Sums.
2. Sigma and Pi notations offer a compact shorthand that maps directly to truth table rows, making conversion between forms quick and mechanical.
3. The Shannon expansion theorem decomposes functions around a variable, forming the basis for multiplexer design and modern synthesis algorithms.
