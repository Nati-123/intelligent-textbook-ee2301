---
title: Unit 2 Quiz - Boolean Algebra
description: Test your understanding of Boolean operations, logic gates, and Boolean theorems
hide:
  - toc
---

<div class="problems-styled" markdown>

<h1 style="color: #5A3EED !important; border-bottom: 3px solid #5A3EED; padding-bottom: 0.4rem; font-weight: 800; margin-bottom: 1.5rem;">Quiz: Boolean Algebra</h1>

<p style="color: #555; line-height: 1.85; font-size: 1.05rem; margin-bottom: 2rem;">
Test your understanding of Boolean algebra operations, logic gates, theorems, and simplification techniques with these questions.
</p>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 1</p>

<p style="color: #333; line-height: 1.75;">Which Boolean operation produces a 1 output only when ALL inputs are 1?</p>

<div class="upper-alpha" markdown>
1. OR
2. XOR
3. AND
4. NOR
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: C</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">The AND operation (logical conjunction) produces a 1 output only when all inputs are 1. For two inputs: <span class="arithmatex">\(F = A \cdot B = 1\)</span> only when <span class="arithmatex">\(A = 1\)</span> and <span class="arithmatex">\(B = 1\)</span>. OR produces 1 when any input is 1. XOR produces 1 when an odd number of inputs are 1. NOR produces 1 only when all inputs are 0.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> AND Operation</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 2</p>

<p style="color: #333; line-height: 1.75;">What is the result of applying DeMorgan's first theorem to <span class="arithmatex">\(\overline{A \cdot B}\)</span>?</p>

<div class="upper-alpha" markdown>
1. $\overline{A} \cdot \overline{B}$
2. $\overline{A} + \overline{B}$
3. $A + B$
4. $A \cdot B$
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: B</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">DeMorgan's first theorem states that the complement of a product equals the sum of the complements: <span class="arithmatex">\(\overline{A \cdot B} = \overline{A} + \overline{B}\)</span>. In circuit terms, this means a NAND gate is equivalent to an OR gate with inverted inputs. Option A incorrectly ANDs the complements. This theorem is essential for converting between AND-OR and NAND-NOR implementations and for pushing bubbles through logic circuits.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> DeMorgan's Theorem</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 3</p>

<p style="color: #333; line-height: 1.75;">Which gates are classified as "universal" gates, and why?</p>

<div class="upper-alpha" markdown>
1. NAND and NOR—any Boolean function can be implemented using only one of these gate types
2. AND and OR—they are the fundamental operations of Boolean algebra
3. XOR and XNOR—they can detect equality and inequality
4. NOT and Buffer—they control signal polarity
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: A</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">NAND and NOR are universal (functionally complete) because each can implement NOT, AND, and OR—the three operations sufficient to construct any Boolean function. For example, using only NAND: NOT is a NAND with tied inputs (<span class="arithmatex">\(\overline{A} = \overline{A \cdot A}\)</span>), AND is a double NAND (<span class="arithmatex">\(A \cdot B = \overline{\overline{A \cdot B}}\)</span>), and OR uses DeMorgan's theorem (<span class="arithmatex">\(A + B = \overline{\overline{A} \cdot \overline{B}}\)</span>). AND and OR alone (option B) cannot implement NOT, so they are not universal.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Universal Gates (NAND and NOR)</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 4</p>

<p style="color: #333; line-height: 1.75;">What is the simplified form of <span class="arithmatex">\(A + AB\)</span> using the Absorption Law?</p>

<div class="upper-alpha" markdown>
1. $AB$
2. $A + B$
3. $B$
4. $A$
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: D</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">By the Absorption Law, <span class="arithmatex">\(A + AB = A\)</span>. This can be proven by factoring: <span class="arithmatex">\(A + AB = A(1 + B) = A \cdot 1 = A\)</span>. The term <span class="arithmatex">\(AB\)</span> is "absorbed" by <span class="arithmatex">\(A\)</span> because whenever <span class="arithmatex">\(AB = 1\)</span>, it is guaranteed that <span class="arithmatex">\(A = 1\)</span>, so the <span class="arithmatex">\(AB\)</span> term adds no additional coverage. The dual form of absorption is <span class="arithmatex">\(A \cdot (A + B) = A\)</span>.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Absorption Law</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 5</p>

<p style="color: #333; line-height: 1.75;">In Boolean algebra, what is the correct order of operator precedence from highest to lowest?</p>

<div class="upper-alpha" markdown>
1. OR, AND, NOT
2. AND, OR, NOT
3. NOT, AND, OR
4. NOT, OR, AND
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: C</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">The precedence order from highest to lowest is: NOT (complement), AND (product), OR (sum). This parallels ordinary algebra where exponentiation precedes multiplication, which precedes addition. So <span class="arithmatex">\(A + B \cdot \overline{C}\)</span> is evaluated as <span class="arithmatex">\(A + (B \cdot (\overline{C}))\)</span>. Parentheses override default precedence when a different evaluation order is needed.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Operator Precedence</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 6</p>

<p style="color: #333; line-height: 1.75;">What does the XOR gate output when both inputs are the same value?</p>

<div class="upper-alpha" markdown>
1. 1
2. 0
3. Undefined
4. Depends on the specific input value
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: B</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">The XOR (exclusive OR) gate outputs 1 when inputs differ and 0 when inputs are the same: <span class="arithmatex">\(A \oplus B = A\overline{B} + \overline{A}B\)</span>. When <span class="arithmatex">\(A = B = 0\)</span>: output is 0. When <span class="arithmatex">\(A = B = 1\)</span>: output is 0. This makes XOR useful as a bit-level inequality detector—it outputs 1 only when bits differ, which is the basis for parity checking and binary addition (sum bit).</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> XOR Gate</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 7</p>

<p style="color: #333; line-height: 1.75;">Which Boolean law states that <span class="arithmatex">\(A + 1 = 1\)</span> and <span class="arithmatex">\(A \cdot 0 = 0\)</span>?</p>

<div class="upper-alpha" markdown>
1. Null Law (Dominance Law)
2. Identity Law
3. Complement Law
4. Idempotent Law
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: A</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">The Null Law (also called Dominance Law) states that ORing with 1 always gives 1 (<span class="arithmatex">\(A + 1 = 1\)</span>) and ANDing with 0 always gives 0 (<span class="arithmatex">\(A \cdot 0 = 0\)</span>). The dominant element (1 for OR, 0 for AND) forces the result regardless of the other operand. The Identity Law (option B) is different: <span class="arithmatex">\(A + 0 = A\)</span> and <span class="arithmatex">\(A \cdot 1 = A\)</span>. The Complement Law (option C) is: <span class="arithmatex">\(A + \overline{A} = 1\)</span> and <span class="arithmatex">\(A \cdot \overline{A} = 0\)</span>.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Null Law (Dominance Law)</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 8</p>

<p style="color: #333; line-height: 1.75;">In a Sum of Products (SOP) expression, what is a "product term"?</p>

<div class="upper-alpha" markdown>
1. An OR of literals
2. The final output value
3. A single literal or an AND of literals
4. A complement of the entire expression
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: C</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">A product term is a single literal or an AND of two or more literals, such as <span class="arithmatex">\(A\)</span>, <span class="arithmatex">\(AB\)</span>, or <span class="arithmatex">\(\overline{A}BC\)</span>. In SOP form, these product terms are ORed together: <span class="arithmatex">\(F = AB + \overline{A}C + BC\)</span>. The dual concept is a sum term (OR of literals), used in Product of Sums (POS) form. Each product term represents a set of input combinations where that term evaluates to 1.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Product Term / SOP Form</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 9</p>

<p style="color: #333; line-height: 1.75;">A CMOS gate's output drives 12 other gate inputs. If the gate's specified fan-out is 10, what is the likely consequence?</p>

<div class="upper-alpha" markdown>
1. The circuit functions normally with no issues
2. The output signal transitions are slowed, potentially violating timing constraints
3. The gate's Boolean function changes
4. Only the first 10 connected gates receive the signal
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: B</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">Exceeding the fan-out limit means the gate must drive more capacitive load than designed for, slowing the output transitions (increased rise and fall times). This degrades signal quality and increases propagation delay, potentially causing timing violations in synchronous circuits. The logical function doesn't change (option C), but the electrical performance degrades. The solution is to insert a buffer to boost drive strength.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Fan-In and Fan-Out</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 10</p>

<p style="color: #333; line-height: 1.75;">The Consensus Theorem states <span class="arithmatex">\(AB + \overline{A}C + BC = AB + \overline{A}C\)</span>. Why can the term <span class="arithmatex">\(BC\)</span> be eliminated?</p>

<div class="upper-alpha" markdown>
1. $BC$ always evaluates to 0
2. $BC$ is the complement of $AB + \overline{A}C$
3. $BC$ contains fewer literals than the other terms
4. Every minterm covered by $BC$ is already covered by either $AB$ or $\overline{A}C$
</div>

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: D</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">The consensus term <span class="arithmatex">\(BC\)</span> is redundant because any input combination making <span class="arithmatex">\(BC = 1\)</span> must have either <span class="arithmatex">\(A = 1\)</span> (making <span class="arithmatex">\(AB = 1\)</span> since <span class="arithmatex">\(B = 1\)</span>) or <span class="arithmatex">\(A = 0\)</span> (making <span class="arithmatex">\(\overline{A}C = 1\)</span> since <span class="arithmatex">\(C = 1\)</span>). Since every case is already covered, <span class="arithmatex">\(BC\)</span> adds no new minterms and can be safely removed, simplifying the expression without changing the function.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Consensus Theorem</p>
</div>
</details>

</div>

---

<h2 style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">Answers Summary</h2>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

| Question | Answer | Concept |
|----------|--------|---------|
| 1 | C | AND Operation |
| 2 | B | DeMorgan's Theorem |
| 3 | A | Universal Gates (NAND and NOR) |
| 4 | D | Absorption Law |
| 5 | C | Operator Precedence |
| 6 | B | XOR Gate |
| 7 | A | Null Law (Dominance Law) |
| 8 | C | Product Term / SOP Form |
| 9 | B | Fan-In and Fan-Out |
| 10 | D | Consensus Theorem |

</div>

</div>
