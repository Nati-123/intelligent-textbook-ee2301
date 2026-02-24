---
title: Unit 4 Quiz - Minterm & Maxterm Expansions
description: Test your understanding of canonical forms, minterms, maxterms, and Shannon expansion
hide:
  - toc
---

<div class="problems-styled" markdown>

<h1 style="color: #5A3EED !important; border-bottom: 3px solid #5A3EED; padding-bottom: 0.4rem; font-weight: 800; margin-bottom: 1.5rem;">Quiz: Minterm & Maxterm Expansions</h1>

<p style="color: #555; line-height: 1.85; font-size: 1.05rem; margin-bottom: 2rem;">
Test your understanding of canonical forms, minterm and maxterm representations, notation, and Shannon expansion with these questions.
</p>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 1</p>

<p style="color: #333; line-height: 1.75;">What distinguishes a canonical form from a standard form in Boolean algebra?</p>

<div class="upper-alpha" markdown>
1. Canonical forms use only NAND gates
2. In canonical form, every variable appears exactly once (complemented or uncomplemented) in every term
3. Standard forms are always longer than canonical forms
4. Canonical forms cannot represent all Boolean functions
</div>

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: B</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">In a canonical form, every variable appears exactly once in every term — either complemented or uncomplemented. This makes canonical forms unique representations of Boolean functions: a given function has exactly one canonical SOP (sum of minterms) and one canonical POS (product of maxterms). Standard forms may have variables missing from some terms, so the same function can have multiple different standard SOP or POS expressions.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Canonical Form</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 2</p>

<p style="color: #333; line-height: 1.75;">For the 3-variable input combination <span class="arithmatex">\(ABC = 101\)</span>, what is the corresponding minterm expression and its index?</p>

<div class="upper-alpha" markdown>
1. $\overline{A}B\overline{C}$, designated $m_2$
2. $A + \overline{B} + C$, designated $M_5$
3. $A\overline{B}C$, designated $m_3$
4. $A\overline{B}C$, designated $m_5$
</div>

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: D</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">A minterm is an AND of all variables, each appearing uncomplemented if its value is 1 and complemented if its value is 0. For <span class="arithmatex">\(ABC = 101\)</span>: <span class="arithmatex">\(A = 1\)</span> (include <span class="arithmatex">\(A\)</span>), <span class="arithmatex">\(B = 0\)</span> (include <span class="arithmatex">\(\overline{B}\)</span>), <span class="arithmatex">\(C = 1\)</span> (include <span class="arithmatex">\(C\)</span>). The minterm is <span class="arithmatex">\(A\overline{B}C\)</span>. Its index is the decimal equivalent of the binary input: <span class="arithmatex">\(101_2 = 5_{10}\)</span>, so it is designated <span class="arithmatex">\(m_5\)</span>. Option C has the correct expression but wrong index.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Minterm Construction and Designation</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 3</p>

<p style="color: #333; line-height: 1.75;">What is the fundamental relationship between a minterm <span class="arithmatex">\(m_i\)</span> and the maxterm <span class="arithmatex">\(M_i\)</span> with the same index?</p>

<div class="upper-alpha" markdown>
1. They are complements of each other: $m_i = \overline{M_i}$
2. They are identical expressions
3. $M_i$ has twice as many literals as $m_i$
4. They cover the same set of input combinations
</div>

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: A</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">A minterm and maxterm with the same index are complements: <span class="arithmatex">\(m_i = \overline{M_i}\)</span> and <span class="arithmatex">\(M_i = \overline{m_i}\)</span>. For example, <span class="arithmatex">\(m_5 = A\overline{B}C\)</span> and <span class="arithmatex">\(M_5 = (\overline{A} + B + \overline{C})\)</span>. Applying DeMorgan's theorem to <span class="arithmatex">\(\overline{m_5}\)</span>: <span class="arithmatex">\(\overline{A\overline{B}C} = \overline{A} + B + \overline{C} = M_5\)</span>. Minterm <span class="arithmatex">\(m_i\)</span> equals 1 for exactly one input combination; maxterm <span class="arithmatex">\(M_i\)</span> equals 0 for that same combination.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Minterm-to-Maxterm Relationship</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 4</p>

<p style="color: #333; line-height: 1.75;">What does the notation <span class="arithmatex">\(F(A,B,C) = \Sigma m(1,3,5)\)</span> represent?</p>

<div class="upper-alpha" markdown>
1. $F$ equals the product of minterms 1, 3, and 5
2. $F$ equals the product of maxterms 1, 3, and 5
3. $F$ equals the sum (OR) of minterms $m_1$, $m_3$, and $m_5$
4. $F$ is undefined for inputs 1, 3, and 5
</div>

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: C</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">The sigma notation <span class="arithmatex">\(\Sigma m\)</span> represents the sum (OR) of minterms. <span class="arithmatex">\(F = \Sigma m(1,3,5) = m_1 + m_3 + m_5 = \overline{A}\overline{B}C + \overline{A}BC + A\overline{B}C\)</span>. This is the canonical Sum of Products (SOP) form. The function <span class="arithmatex">\(F = 1\)</span> for exactly the input combinations whose decimal indices are listed: inputs 001, 011, and 101.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Sigma (Sum of Minterms) Notation</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 5</p>

<p style="color: #333; line-height: 1.75;">How do you convert <span class="arithmatex">\(F = \Sigma m(1,3,5)\)</span> to <span class="arithmatex">\(\Pi M\)</span> notation for 3 variables?</p>

<div class="upper-alpha" markdown>
1. Use the same indices: $\Pi M(1,3,5)$
2. Use the complementary indices: $\Pi M(0,2,4,6,7)$
3. Use all indices: $\Pi M(0,1,2,3,4,5,6,7)$
4. Multiply each index by 2
</div>

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: B</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">To convert from <span class="arithmatex">\(\Sigma m\)</span> to <span class="arithmatex">\(\Pi M\)</span>, use all indices NOT in the minterm list. For 3 variables, indices range from 0 to <span class="arithmatex">\(2^3 - 1 = 7\)</span>. If the ON-set (minterms) is <span class="arithmatex">\(\{1,3,5\}\)</span>, the OFF-set (maxterms) is <span class="arithmatex">\(\{0,2,4,6,7\}\)</span>. Therefore <span class="arithmatex">\(F = \Sigma m(1,3,5) = \Pi M(0,2,4,6,7)\)</span>.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Converting SOP to POS / Complementary Index Sets</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 6</p>

<p style="color: #333; line-height: 1.75;">For a 3-variable function <span class="arithmatex">\(F = \Sigma m(2,4,7)\)</span>, what is the complement <span class="arithmatex">\(\overline{F}\)</span> expressed in both <span class="arithmatex">\(\Sigma m\)</span> and <span class="arithmatex">\(\Pi M\)</span> notation?</p>

<div class="upper-alpha" markdown>
1. $\overline{F} = \Sigma m(2,4,7)$ only
2. $\overline{F} = \Pi M(2,4,7)$ only
3. $\overline{F} = \Sigma m(0,1,3,5,6)$ only
4. $\overline{F} = \Sigma m(0,1,3,5,6) = \Pi M(2,4,7)$ — both are valid
</div>

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: D</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">The complement <span class="arithmatex">\(\overline{F}\)</span> has its ON-set where <span class="arithmatex">\(F\)</span> has its OFF-set and vice versa. So <span class="arithmatex">\(\overline{F} = \Sigma m(0,1,3,5,6)\)</span> (the complementary minterm indices). Equivalently, <span class="arithmatex">\(\overline{F} = \Pi M(2,4,7)\)</span> (same indices as the original <span class="arithmatex">\(F\)</span>'s minterms, but using maxterms). Both representations are valid and equivalent.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Complement of a Boolean Function</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 7</p>

<p style="color: #333; line-height: 1.75;">In the Shannon expansion <span class="arithmatex">\(F = X \cdot F_X + \overline{X} \cdot F_{\overline{X}}\)</span>, what is <span class="arithmatex">\(F_X\)</span> called and how is it computed?</p>

<div class="upper-alpha" markdown>
1. The positive cofactor — $F$ evaluated with $X$ set to 1
2. The Shannon remainder — the portion of $F$ independent of $X$
3. The X-factor — the derivative of $F$ with respect to $X$
4. The residue — the terms containing $X$
</div>

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: A</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;"><span class="arithmatex">\(F_X\)</span> is called the positive cofactor of <span class="arithmatex">\(F\)</span> with respect to <span class="arithmatex">\(X\)</span>. It is obtained by setting <span class="arithmatex">\(X = 1\)</span> in the expression for <span class="arithmatex">\(F\)</span> and simplifying. Similarly, <span class="arithmatex">\(F_{\overline{X}}\)</span> is the negative cofactor, obtained by setting <span class="arithmatex">\(X = 0\)</span>. Shannon expansion decomposes any Boolean function into two subfunctions using these cofactors.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Cofactor / Shannon Expansion Theorem</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 8</p>

<p style="color: #333; line-height: 1.75;">What are the three sets that partition all <span class="arithmatex">\(2^n\)</span> minterms for an incompletely specified function?</p>

<div class="upper-alpha" markdown>
1. Input-set, Output-set, Control-set
2. On-set, Off-set, DC-set (don't care set)
3. True-set, False-set, Maybe-set
4. On-set, Off-set, Error-set
</div>

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: B</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">An incompletely specified function partitions all <span class="arithmatex">\(2^n\)</span> possible input combinations into three mutually exclusive sets: the On-set (where <span class="arithmatex">\(F = 1\)</span>), the Off-set (where <span class="arithmatex">\(F = 0\)</span>), and the DC-set (don't care conditions, where <span class="arithmatex">\(F\)</span> can be assigned either 0 or 1 during optimization). During minimization, DC-set minterms can be included in or excluded from prime implicant groups to achieve simpler expressions.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> On-Set, Off-Set, DC-Set (Incompletely Specified Functions)</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 9</p>

<p style="color: #333; line-height: 1.75;">Why is literal count an important metric when comparing different Boolean expressions for the same function?</p>

<div class="upper-alpha" markdown>
1. It determines the number of rows in the truth table
2. It indicates how many input variables the function has
3. It correlates directly with gate input count and implementation cost
4. It shows the number of minterms in the function's ON-set
</div>

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: C</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">Literal count measures expression complexity — each literal (a variable or its complement) corresponds to one gate input in the hardware implementation. More literals generally means more gate inputs, more wiring, and higher area and power cost. For example, <span class="arithmatex">\(F = AB + \overline{A}C\)</span> has 4 literals while <span class="arithmatex">\(F = AB + \overline{A}C + BC\)</span> has 6 literals for the same function, making the first expression cheaper to implement.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Literal Count / Expression Cost</p>
</div>
</details>

</div>

---

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

<p style="color: #1565C0; font-weight: 700; font-size: 1.08rem; margin-top: 0; margin-bottom: 14px;">Question 10</p>

<p style="color: #333; line-height: 1.75;">In maxterm construction, when an input variable has value 1, how does it appear in the maxterm?</p>

<div class="upper-alpha" markdown>
1. Uncomplemented (e.g., $A$)
2. Omitted from the maxterm entirely
3. Doubled for emphasis (e.g., $A \cdot A$)
4. Complemented (e.g., $\overline{A}$)
</div>

<details style="margin-top: 1rem;" markdown>
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Answer</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;" markdown>
<p style="color: #2E7D32; font-weight: 700; margin-top: 0;">Correct Answer: D</p>
<p style="color: #333; line-height: 1.75; margin-bottom: 0;">Maxterm construction is the dual of minterm construction: variables appear complemented when their value is 1, and uncomplemented when their value is 0. This ensures the maxterm evaluates to 0 for its designated input combination. For <span class="arithmatex">\(ABC = 110\)</span>: <span class="arithmatex">\(M_6 = (\overline{A} + \overline{B} + C)\)</span>. Checking: <span class="arithmatex">\(\overline{1} + \overline{1} + 0 = 0 + 0 + 0 = 0\)</span>, confirming <span class="arithmatex">\(M_6 = 0\)</span> for input 110.</p>
<p style="color: #555; font-style: italic; margin-bottom: 0; margin-top: 8px;"><strong>Concept Tested:</strong> Maxterm Construction</p>
</div>
</details>

</div>

---

<h2 style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">Answers Summary</h2>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

| Question | Answer | Concept |
|----------|--------|---------|
| 1 | B | Canonical Form |
| 2 | D | Minterm Construction and Designation |
| 3 | A | Minterm-to-Maxterm Relationship |
| 4 | C | Sigma Notation (Sum of Minterms) |
| 5 | B | Converting SOP to POS |
| 6 | D | Complement of a Boolean Function |
| 7 | A | Cofactor / Shannon Expansion |
| 8 | B | On-Set, Off-Set, DC-Set |
| 9 | C | Literal Count / Expression Cost |
| 10 | D | Maxterm Construction |

</div>

</div>
