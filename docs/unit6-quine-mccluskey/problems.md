---
title: Unit 6 Problems - Quine-McCluskey Method
description: Practice problems for the Quine-McCluskey tabular minimization method
---

<div class="problems-styled" markdown>

<h1 style="color: #5A3EED !important; border-bottom: 3px solid #5A3EED; padding-bottom: 0.4rem; font-weight: 800; margin-bottom: 1.5rem;">End-of-Unit Problems: Quine-McCluskey Method</h1>

<p style="color: #555; line-height: 1.85; font-size: 1.05rem; margin-bottom: 2rem;">
Work through these problems to reinforce your understanding of the QM algorithm and prime implicant selection.
</p>

---

<h2 style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">Section A: Implicant Table Construction (5 problems)</h2>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 1</h3>

For the function $F(A, B, C, D) = \sum m(0, 2, 5, 6, 7, 8, 10, 12, 13, 14, 15)$:

a) List all minterms with their binary representations
b) Group minterms by the number of 1s
c) Construct the initial implicant table

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;"><strong>a)</strong> Binary representations:</p>

<table style="font-size: 0.82rem; margin: 0.5rem auto; border-collapse: collapse;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 4px 10px;">Minterm</th><th style="padding: 4px 10px;">A</th><th style="padding: 4px 10px;">B</th><th style="padding: 4px 10px;">C</th><th style="padding: 4px 10px;">D</th></tr></thead>
<tbody>
<tr><td style="padding: 3px 10px; font-weight: 700;">m<sub>0</sub></td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px; font-weight: 700;">m<sub>2</sub></td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px;">0</td></tr>
<tr><td style="padding: 3px 10px; font-weight: 700;">m<sub>5</sub></td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">1</td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px; font-weight: 700;">m<sub>6</sub></td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px;">0</td></tr>
<tr><td style="padding: 3px 10px; font-weight: 700;">m<sub>7</sub></td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px;">1</td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px; font-weight: 700;">m<sub>8</sub></td><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td></tr>
<tr><td style="padding: 3px 10px; font-weight: 700;">m<sub>10</sub></td><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px;">0</td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px; font-weight: 700;">m<sub>12</sub></td><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">0</td></tr>
<tr><td style="padding: 3px 10px; font-weight: 700;">m<sub>13</sub></td><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px;">0</td><td style="padding: 3px 10px;">1</td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px; font-weight: 700;">m<sub>14</sub></td><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px;">0</td></tr>
<tr><td style="padding: 3px 10px; font-weight: 700;">m<sub>15</sub></td><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px;">1</td><td style="padding: 3px 10px;">1</td></tr>
</tbody>
</table>

<p style="color: #333; line-height: 1.85;"><strong>b)</strong> Grouped by number of 1s:</p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;"><strong>Group 0</strong> (0 ones): m<sub>0</sub> (0000)</li>
<li style="color: #333; line-height: 1.85;"><strong>Group 1</strong> (1 one): m<sub>2</sub> (0010), m<sub>8</sub> (1000)</li>
<li style="color: #333; line-height: 1.85;"><strong>Group 2</strong> (2 ones): m<sub>5</sub> (0101), m<sub>6</sub> (0110), m<sub>10</sub> (1010), m<sub>12</sub> (1100)</li>
<li style="color: #333; line-height: 1.85;"><strong>Group 3</strong> (3 ones): m<sub>7</sub> (0111), m<sub>13</sub> (1101), m<sub>14</sub> (1110)</li>
<li style="color: #333; line-height: 1.85;"><strong>Group 4</strong> (4 ones): m<sub>15</sub> (1111)</li>
</ul>

<p style="color: #333; line-height: 1.85; margin-bottom: 0;"><strong>c)</strong> Initial table constructed with minterms organized by groups for combining.</p>
</div>
</details>

---

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 2</h3>

Combine adjacent minterms from Problem 1 to generate the first set of combined terms (Column 2).

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;"><strong>Column 2 &mdash; Combining adjacent groups:</strong></p>

<p style="color: #333; line-height: 1.85;">From Groups 0&ndash;1:</p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">m<sub>0</sub> + m<sub>2</sub> = 00-0 (0,2)</li>
<li style="color: #333; line-height: 1.85;">m<sub>0</sub> + m<sub>8</sub> = -000 (0,8)</li>
</ul>

<p style="color: #333; line-height: 1.85;">From Groups 1&ndash;2:</p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">m<sub>2</sub> + m<sub>6</sub> = 0-10 (2,6)</li>
<li style="color: #333; line-height: 1.85;">m<sub>2</sub> + m<sub>10</sub> = -010 (2,10)</li>
<li style="color: #333; line-height: 1.85;">m<sub>8</sub> + m<sub>10</sub> = 10-0 (8,10)</li>
<li style="color: #333; line-height: 1.85;">m<sub>8</sub> + m<sub>12</sub> = 1-00 (8,12)</li>
</ul>

<p style="color: #333; line-height: 1.85;">From Groups 2&ndash;3:</p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">m<sub>5</sub> + m<sub>7</sub> = 01-1 (5,7)</li>
<li style="color: #333; line-height: 1.85;">m<sub>5</sub> + m<sub>13</sub> = -101 (5,13)</li>
<li style="color: #333; line-height: 1.85;">m<sub>6</sub> + m<sub>7</sub> = 011- (6,7)</li>
<li style="color: #333; line-height: 1.85;">m<sub>6</sub> + m<sub>14</sub> = -110 (6,14)</li>
<li style="color: #333; line-height: 1.85;">m<sub>10</sub> + m<sub>14</sub> = 1-10 (10,14)</li>
<li style="color: #333; line-height: 1.85;">m<sub>12</sub> + m<sub>13</sub> = 110- (12,13)</li>
<li style="color: #333; line-height: 1.85;">m<sub>12</sub> + m<sub>14</sub> = 11-0 (12,14)</li>
</ul>

<p style="color: #333; line-height: 1.85; margin-bottom: 0;">From Groups 3&ndash;4:</p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0 0;">
<li style="color: #333; line-height: 1.85;">m<sub>7</sub> + m<sub>15</sub> = -111 (7,15)</li>
<li style="color: #333; line-height: 1.85;">m<sub>13</sub> + m<sub>15</sub> = 11-1 (13,15)</li>
<li style="color: #333; line-height: 1.85; margin-bottom: 0;">m<sub>14</sub> + m<sub>15</sub> = 111- (14,15)</li>
</ul>
</div>
</details>

---

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 3</h3>

For the function $F(W, X, Y, Z) = \sum m(1, 3, 4, 5, 9, 11, 12, 13, 15)$:

Construct the complete implicant table through all combination stages.

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;"><strong>Column 1 &mdash; Minterms by groups:</strong></p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">Group 1: m<sub>1</sub> (0001), m<sub>4</sub> (0100)</li>
<li style="color: #333; line-height: 1.85;">Group 2: m<sub>3</sub> (0011), m<sub>5</sub> (0101), m<sub>9</sub> (1001), m<sub>12</sub> (1100)</li>
<li style="color: #333; line-height: 1.85;">Group 3: m<sub>11</sub> (1011), m<sub>13</sub> (1101)</li>
<li style="color: #333; line-height: 1.85;">Group 4: m<sub>15</sub> (1111)</li>
</ul>

<p style="color: #333; line-height: 1.85;"><strong>Column 2 &mdash; First combinations:</strong></p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">(1,3) = 00-1, (1,5) = 0-01, (1,9) = -001</li>
<li style="color: #333; line-height: 1.85;">(4,5) = 010-, (4,12) = -100</li>
<li style="color: #333; line-height: 1.85;">(3,11) = -011, (5,13) = -101, (9,11) = 10-1, (9,13) = 1-01, (12,13) = 110-</li>
<li style="color: #333; line-height: 1.85;">(11,15) = 1-11, (13,15) = 11-1</li>
</ul>

<p style="color: #333; line-height: 1.85;"><strong>Column 3 &mdash; Second combinations:</strong></p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">(1,3,9,11) = -0-1</li>
<li style="color: #333; line-height: 1.85;">(1,5,9,13) = --01</li>
<li style="color: #333; line-height: 1.85;">(5,13,9,13) can't combine further with same terms</li>
</ul>

<p style="color: #333; line-height: 1.85;"><strong>Prime Implicants identified</strong> (unchecked terms):</p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0 0;">
<li style="color: #333; line-height: 1.85;">010- (4,5)</li>
<li style="color: #333; line-height: 1.85;">-100 (4,12)</li>
<li style="color: #333; line-height: 1.85;">110- (12,13)</li>
<li style="color: #333; line-height: 1.85;">-0-1 (1,3,9,11)</li>
<li style="color: #333; line-height: 1.85;">--01 (1,5,9,13)</li>
<li style="color: #333; line-height: 1.85;">1-11 (11,15)</li>
<li style="color: #333; line-height: 1.85; margin-bottom: 0;">11-1 (13,15)</li>
</ul>
</div>
</details>

---

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 4</h3>

For $F(A, B, C) = \sum m(1, 2, 3, 5, 7)$:

a) Complete the QM method to find all prime implicants
b) Write the Boolean expression for each prime implicant

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;"><strong>Column 1 &mdash; Minterms by groups:</strong></p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">Group 1: m<sub>1</sub> (001), m<sub>2</sub> (010)</li>
<li style="color: #333; line-height: 1.85;">Group 2: m<sub>3</sub> (011), m<sub>5</sub> (101)</li>
<li style="color: #333; line-height: 1.85;">Group 3: m<sub>7</sub> (111)</li>
</ul>

<p style="color: #333; line-height: 1.85;"><strong>Column 2 &mdash; First combinations:</strong></p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">(1,3) = 0-1</li>
<li style="color: #333; line-height: 1.85;">(1,5) = -01</li>
<li style="color: #333; line-height: 1.85;">(2,3) = 01-</li>
<li style="color: #333; line-height: 1.85;">(3,7) = -11</li>
<li style="color: #333; line-height: 1.85;">(5,7) = 1-1</li>
</ul>

<p style="color: #333; line-height: 1.85;"><strong>Column 3 &mdash; Second combinations:</strong></p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">(1,3,5,7) = --1</li>
</ul>

<p style="color: #333; line-height: 1.85;"><strong>Prime Implicants:</strong></p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">01- = A'B (covers 2,3)</li>
<li style="color: #333; line-height: 1.85;">--1 = C (covers 1,3,5,7)</li>
</ul>

<p style="color: #333; line-height: 1.85;"><strong>b)</strong> Boolean expressions:</p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;"><strong>01-</strong> &rarr; A'B</li>
<li style="color: #333; line-height: 1.85;"><strong>--1</strong> &rarr; C</li>
</ul>

<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;">Minimum expression: F = A'B + C</p>
</div>
</details>

---

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 5</h3>

For $F(A, B, C, D) = \sum m(0, 1, 2, 8, 9, 10, 11, 14, 15)$:

Find all prime implicants using the QM method.

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;"><strong>Grouping:</strong></p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">Group 0: m<sub>0</sub> (0000)</li>
<li style="color: #333; line-height: 1.85;">Group 1: m<sub>1</sub> (0001), m<sub>2</sub> (0010), m<sub>8</sub> (1000)</li>
<li style="color: #333; line-height: 1.85;">Group 2: m<sub>9</sub> (1001), m<sub>10</sub> (1010)</li>
<li style="color: #333; line-height: 1.85;">Group 3: m<sub>11</sub> (1011), m<sub>14</sub> (1110)</li>
<li style="color: #333; line-height: 1.85;">Group 4: m<sub>15</sub> (1111)</li>
</ul>

<p style="color: #333; line-height: 1.85;"><strong>After all combinations, Prime Implicants:</strong></p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;"><strong>00-0</strong> (0,2): A'B'D'</li>
<li style="color: #333; line-height: 1.85;"><strong>000-</strong> (0,1): A'B'C'</li>
<li style="color: #333; line-height: 1.85;"><strong>10--</strong> (8,9,10,11): AB'</li>
<li style="color: #333; line-height: 1.85;"><strong>111-</strong> (14,15): ABC</li>
<li style="color: #333; line-height: 1.85; margin-bottom: 0;"><strong>1-11</strong> (11,15): ACD</li>
</ul>
</div>
</details>

---

<h2 style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">Section B: Prime Implicant Charts (5 problems)</h2>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 6</h3>

Given prime implicants for $F = \sum m(0, 1, 2, 5, 6, 7)$:

- P1: 00- (0,1)
- P2: 0-0 (0,2)
- P3: -01 (1,5)
- P4: 01- (2,6)
- P5: -11 (5,7)
- P6: 011 (6,7)

Construct the prime implicant chart and identify essential prime implicants.

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;"><strong>Prime Implicant Chart:</strong></p>

<table style="font-size: 0.82rem; margin: 0.5rem auto; border-collapse: collapse;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 4px 10px;"></th><th style="padding: 4px 10px;">0</th><th style="padding: 4px 10px;">1</th><th style="padding: 4px 10px;">2</th><th style="padding: 4px 10px;">5</th><th style="padding: 4px 10px;">6</th><th style="padding: 4px 10px;">7</th></tr></thead>
<tbody>
<tr><td style="padding: 3px 10px; font-weight: 700;">P1</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">&times;</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">&times;</td><td style="padding: 3px 10px;"></td><td style="padding: 3px 10px;"></td><td style="padding: 3px 10px;"></td><td style="padding: 3px 10px;"></td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px; font-weight: 700;">P2</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">&times;</td><td style="padding: 3px 10px;"></td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">&times;</td><td style="padding: 3px 10px;"></td><td style="padding: 3px 10px;"></td><td style="padding: 3px 10px;"></td></tr>
<tr><td style="padding: 3px 10px; font-weight: 700;">P3</td><td style="padding: 3px 10px;"></td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">&times;</td><td style="padding: 3px 10px;"></td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">&times;</td><td style="padding: 3px 10px;"></td><td style="padding: 3px 10px;"></td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px; font-weight: 700;">P4</td><td style="padding: 3px 10px;"></td><td style="padding: 3px 10px;"></td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">&times;</td><td style="padding: 3px 10px;"></td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">&times;</td><td style="padding: 3px 10px;"></td></tr>
<tr><td style="padding: 3px 10px; font-weight: 700;">P5</td><td style="padding: 3px 10px;"></td><td style="padding: 3px 10px;"></td><td style="padding: 3px 10px;"></td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">&times;</td><td style="padding: 3px 10px;"></td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">&times;</td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px; font-weight: 700;">P6</td><td style="padding: 3px 10px;"></td><td style="padding: 3px 10px;"></td><td style="padding: 3px 10px;"></td><td style="padding: 3px 10px;"></td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">&times;</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">&times;</td></tr>
</tbody>
</table>

<p style="color: #333; line-height: 1.85;"><strong>Essential Prime Implicants:</strong></p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">Column 0: P1, P2 &mdash; not unique</li>
<li style="color: #333; line-height: 1.85;">Column 1: P1, P3 &mdash; not unique</li>
<li style="color: #333; line-height: 1.85;">Column 5: P3, P5 &mdash; not unique</li>
<li style="color: #333; line-height: 1.85;">Column 7: P5, P6 &mdash; not unique</li>
</ul>

<p style="color: #333; line-height: 1.85;">No single essential prime implicants. Need to select a cover.</p>

<p style="color: #333; line-height: 1.85;"><strong>Minimum cover:</strong> P1 + P4 + P5 or P2 + P3 + P6</p>

<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;">F = A'B' + A'C + BC (using P1, P4, P5)</p>
</div>
</details>

---

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 7</h3>

For the following prime implicant chart, find all essential prime implicants:

| &nbsp; | 2 | 3 | 7 | 9 | 11 | 13 |
|--------|---|---|---|---|----|----|
| P1 | &times; | &times; | | | | |
| P2 | | &times; | &times; | | | |
| P3 | | | &times; | | | |
| P4 | | | | &times; | &times; | |
| P5 | | | | | &times; | &times; |
| P6 | | | | &times; | | &times; |

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;"><strong>Checking for essential prime implicants:</strong></p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">Column 2: Only P1 covers it &rarr; <strong>P1 is essential</strong></li>
<li style="color: #333; line-height: 1.85;">Column 3: P1, P2 cover it</li>
<li style="color: #333; line-height: 1.85;">Column 7: P2, P3 cover it</li>
<li style="color: #333; line-height: 1.85;">Column 9: P4, P6 cover it</li>
<li style="color: #333; line-height: 1.85;">Column 11: P4, P5 cover it</li>
<li style="color: #333; line-height: 1.85;">Column 13: P5, P6 cover it</li>
</ul>

<p style="color: #333; line-height: 1.85;"><strong>Essential Prime Implicants: P1</strong></p>

<p style="color: #333; line-height: 1.85;">After selecting P1, columns 2 and 3 are covered.</p>

<p style="color: #333; line-height: 1.85;"><strong>Remaining:</strong> columns 7, 9, 11, 13</p>

<p style="color: #333; line-height: 1.85;">For remaining coverage, we need P2 or P3 for 7, and {P4, P5} or {P4, P6} or {P5, P6} for rest.</p>

<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;">Minimum cover: P1 + P2 + P4 + P5 (or other equivalent solutions)</p>
</div>
</details>

---

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 8</h3>

Apply row dominance and column dominance to simplify this chart:

| &nbsp; | 1 | 4 | 5 | 6 | 9 | 14 |
|--------|---|---|---|---|---|----|
| P1 | &times; | | &times; | | | |
| P2 | &times; | | &times; | | &times; | |
| P3 | | &times; | | &times; | | |
| P4 | | &times; | | &times; | | &times; |
| P5 | | | | | &times; | &times; |

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;"><strong>Row Dominance:</strong> (A row dominates another if it covers all minterms of the other plus more)</p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">P2 dominates P1 (P2 covers 1, 5, 9 while P1 covers only 1, 5)</li>
<li style="color: #333; line-height: 1.85;">P4 dominates P3 (P4 covers 4, 6, 14 while P3 covers only 4, 6)</li>
</ul>

<p style="color: #333; line-height: 1.85;"><strong>Remove dominated rows:</strong> P1, P3</p>

<p style="color: #333; line-height: 1.85;"><strong>Simplified chart:</strong></p>

<table style="font-size: 0.82rem; margin: 0.5rem auto; border-collapse: collapse;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 4px 10px;"></th><th style="padding: 4px 10px;">1</th><th style="padding: 4px 10px;">4</th><th style="padding: 4px 10px;">5</th><th style="padding: 4px 10px;">6</th><th style="padding: 4px 10px;">9</th><th style="padding: 4px 10px;">14</th></tr></thead>
<tbody>
<tr><td style="padding: 3px 10px; font-weight: 700;">P2</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">&times;</td><td style="padding: 3px 10px;"></td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">&times;</td><td style="padding: 3px 10px;"></td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">&times;</td><td style="padding: 3px 10px;"></td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px; font-weight: 700;">P4</td><td style="padding: 3px 10px;"></td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">&times;</td><td style="padding: 3px 10px;"></td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">&times;</td><td style="padding: 3px 10px;"></td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">&times;</td></tr>
<tr><td style="padding: 3px 10px; font-weight: 700;">P5</td><td style="padding: 3px 10px;"></td><td style="padding: 3px 10px;"></td><td style="padding: 3px 10px;"></td><td style="padding: 3px 10px;"></td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">&times;</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">&times;</td></tr>
</tbody>
</table>

<p style="color: #333; line-height: 1.85;"><strong>Column Dominance:</strong> (A column dominates another if all PIs covering one also cover the other)</p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">Column 9 is covered by P2, P5</li>
<li style="color: #333; line-height: 1.85;">Column 14 is covered by P4, P5</li>
</ul>

<p style="color: #333; line-height: 1.85;">No obvious column dominance for elimination.</p>

<p style="color: #333; line-height: 1.85;"><strong>Essential PIs after simplification:</strong></p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">Column 1: Only P2 &rarr; P2 essential</li>
<li style="color: #333; line-height: 1.85;">Column 4: Only P4 &rarr; P4 essential</li>
</ul>

<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;">Minimum cover: P2 + P4 (covers all minterms)</p>
</div>
</details>

---

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 9</h3>

Identify the cyclic nature of this prime implicant chart:

| &nbsp; | 0 | 1 | 2 | 3 |
|--------|---|---|---|---|
| P1 | &times; | &times; | | |
| P2 | | &times; | &times; | |
| P3 | | | &times; | &times; |
| P4 | &times; | | | &times; |

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;"><strong>Analysis:</strong></p>

<p style="color: #333; line-height: 1.85;">Each minterm is covered by exactly 2 prime implicants:</p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">Minterm 0: P1, P4</li>
<li style="color: #333; line-height: 1.85;">Minterm 1: P1, P2</li>
<li style="color: #333; line-height: 1.85;">Minterm 2: P2, P3</li>
<li style="color: #333; line-height: 1.85;">Minterm 3: P3, P4</li>
</ul>

<p style="color: #333; line-height: 1.85;"><strong>This is a cyclic chart</strong> because:</p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;"><strong>1.</strong> No essential prime implicants exist (no column has only one &times;)</li>
<li style="color: #333; line-height: 1.85;"><strong>2.</strong> No row dominance exists (each PI covers different 2 minterms)</li>
<li style="color: #333; line-height: 1.85;"><strong>3.</strong> No column dominance exists</li>
</ul>

<p style="color: #333; line-height: 1.85;"><strong>Solution requires Petrick's method or inspection:</strong></p>

<p style="color: #333; line-height: 1.85;">Two minimum covers exist:</p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0 0;">
<li style="color: #333; line-height: 1.85;"><strong>P1 + P3</strong> (covers 0,1,2,3)</li>
<li style="color: #333; line-height: 1.85; margin-bottom: 0;"><strong>P2 + P4</strong> (covers 0,1,2,3)</li>
</ul>
</div>
</details>

---

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 10</h3>

Use Petrick's method to find all minimum covers for the chart in Problem 9.

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;"><strong>Petrick's Method:</strong></p>

<p style="color: #333; line-height: 1.85;">For each minterm, write a sum (OR) of the PIs that cover it:</p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">Minterm 0: (P1 + P4)</li>
<li style="color: #333; line-height: 1.85;">Minterm 1: (P1 + P2)</li>
<li style="color: #333; line-height: 1.85;">Minterm 2: (P2 + P3)</li>
<li style="color: #333; line-height: 1.85;">Minterm 3: (P3 + P4)</li>
</ul>

<p style="color: #333; line-height: 1.85;"><strong>Product of sums:</strong></p>
<p style="color: #333; line-height: 1.85;">(P1 + P4)(P1 + P2)(P2 + P3)(P3 + P4)</p>

<p style="color: #333; line-height: 1.85;"><strong>Expand step by step:</strong></p>
<p style="color: #333; line-height: 1.85;">(P1 + P4)(P1 + P2) = P1 + P1P2 + P1P4 + P2P4 = P1 + P2P4</p>
<p style="color: #333; line-height: 1.85;">(P2 + P3)(P3 + P4) = P2P3 + P2P4 + P3 + P3P4 = P3 + P2P4</p>

<p style="color: #333; line-height: 1.85;"><strong>Combine:</strong></p>
<p style="color: #333; line-height: 1.85;">(P1 + P2P4)(P3 + P2P4)</p>
<p style="color: #333; line-height: 1.85;">= P1P3 + P1P2P4 + P2P3P4 + P2P4</p>
<p style="color: #333; line-height: 1.85;">= P1P3 + P2P4 (absorbing larger terms)</p>

<p style="color: #333; line-height: 1.85;"><strong>Minimum covers:</strong></p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;"><strong>P1P3</strong> &rarr; F = P1 + P3</li>
<li style="color: #333; line-height: 1.85;"><strong>P2P4</strong> &rarr; F = P2 + P4</li>
</ul>

<p style="color: #333; line-height: 1.85; margin-bottom: 0;">Both solutions require exactly 2 prime implicants.</p>
</div>
</details>

---

<h2 style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">Section C: Complete QM Solutions (5 problems)</h2>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 11</h3>

Minimize $F(A, B, C, D) = \sum m(4, 5, 6, 7, 12, 14, 15)$ using the complete QM method.

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;"><strong>Step 1: Group minterms</strong></p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">Group 1: m<sub>4</sub> (0100)</li>
<li style="color: #333; line-height: 1.85;">Group 2: m<sub>5</sub> (0101), m<sub>6</sub> (0110), m<sub>12</sub> (1100)</li>
<li style="color: #333; line-height: 1.85;">Group 3: m<sub>7</sub> (0111), m<sub>14</sub> (1110)</li>
<li style="color: #333; line-height: 1.85;">Group 4: m<sub>15</sub> (1111)</li>
</ul>

<p style="color: #333; line-height: 1.85;"><strong>Step 2: First combinations</strong></p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">(4,5) = 010-</li>
<li style="color: #333; line-height: 1.85;">(4,6) = 01-0</li>
<li style="color: #333; line-height: 1.85;">(4,12) = -100</li>
<li style="color: #333; line-height: 1.85;">(5,7) = 01-1</li>
<li style="color: #333; line-height: 1.85;">(6,7) = 011-</li>
<li style="color: #333; line-height: 1.85;">(6,14) = -110</li>
<li style="color: #333; line-height: 1.85;">(12,14) = 11-0</li>
<li style="color: #333; line-height: 1.85;">(7,15) = -111</li>
<li style="color: #333; line-height: 1.85;">(14,15) = 111-</li>
</ul>

<p style="color: #333; line-height: 1.85;"><strong>Step 3: Second combinations</strong></p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">(4,5,6,7) = 01--</li>
<li style="color: #333; line-height: 1.85;">(4,6,12,14) = -1-0</li>
<li style="color: #333; line-height: 1.85;">(6,7,14,15) = -11-</li>
</ul>

<p style="color: #333; line-height: 1.85;"><strong>Prime Implicants:</strong></p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;"><strong>01--</strong> (4,5,6,7): A'B</li>
<li style="color: #333; line-height: 1.85;"><strong>-1-0</strong> (4,6,12,14): BD'</li>
<li style="color: #333; line-height: 1.85;"><strong>-11-</strong> (6,7,14,15): BC</li>
</ul>

<p style="color: #333; line-height: 1.85;"><strong>Step 4: PI Chart</strong></p>

<table style="font-size: 0.82rem; margin: 0.5rem auto; border-collapse: collapse;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 4px 10px;"></th><th style="padding: 4px 10px;">4</th><th style="padding: 4px 10px;">5</th><th style="padding: 4px 10px;">6</th><th style="padding: 4px 10px;">7</th><th style="padding: 4px 10px;">12</th><th style="padding: 4px 10px;">14</th><th style="padding: 4px 10px;">15</th></tr></thead>
<tbody>
<tr><td style="padding: 3px 10px; font-weight: 700;">01--</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">&times;</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">&times;</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">&times;</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">&times;</td><td style="padding: 3px 10px;"></td><td style="padding: 3px 10px;"></td><td style="padding: 3px 10px;"></td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px; font-weight: 700;">-1-0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">&times;</td><td style="padding: 3px 10px;"></td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">&times;</td><td style="padding: 3px 10px;"></td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">&times;</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">&times;</td><td style="padding: 3px 10px;"></td></tr>
<tr><td style="padding: 3px 10px; font-weight: 700;">-11-</td><td style="padding: 3px 10px;"></td><td style="padding: 3px 10px;"></td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">&times;</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">&times;</td><td style="padding: 3px 10px;"></td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">&times;</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">&times;</td></tr>
</tbody>
</table>

<p style="color: #333; line-height: 1.85;"><strong>Essential PIs:</strong></p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">Column 5: Only 01-- &rarr; <strong>Essential</strong></li>
<li style="color: #333; line-height: 1.85;">Column 12: Only -1-0 &rarr; <strong>Essential</strong></li>
<li style="color: #333; line-height: 1.85;">Column 15: Only -11- &rarr; <strong>Essential</strong></li>
</ul>

<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;">Minimum expression: F = A'B + BD' + BC</p>
</div>
</details>

---

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 12</h3>

Minimize $F(W, X, Y, Z) = \sum m(0, 2, 3, 4, 5, 13, 15)$ using QM.

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;"><strong>Step 1: Group minterms</strong></p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">Group 0: m<sub>0</sub> (0000)</li>
<li style="color: #333; line-height: 1.85;">Group 1: m<sub>2</sub> (0010), m<sub>4</sub> (0100)</li>
<li style="color: #333; line-height: 1.85;">Group 2: m<sub>3</sub> (0011), m<sub>5</sub> (0101)</li>
<li style="color: #333; line-height: 1.85;">Group 3: m<sub>13</sub> (1101)</li>
<li style="color: #333; line-height: 1.85;">Group 4: m<sub>15</sub> (1111)</li>
</ul>

<p style="color: #333; line-height: 1.85;"><strong>Step 2: First combinations</strong></p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">(0,2) = 00-0</li>
<li style="color: #333; line-height: 1.85;">(0,4) = 0-00</li>
<li style="color: #333; line-height: 1.85;">(2,3) = 001-</li>
<li style="color: #333; line-height: 1.85;">(4,5) = 010-</li>
<li style="color: #333; line-height: 1.85;">(5,13) = -101</li>
<li style="color: #333; line-height: 1.85;">(13,15) = 11-1</li>
</ul>

<p style="color: #333; line-height: 1.85;"><strong>Step 3: Second combinations</strong></p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">(0,2,4,?) &mdash; No valid quad</li>
</ul>

<p style="color: #333; line-height: 1.85;"><strong>Prime Implicants:</strong></p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;"><strong>00-0</strong> (0,2): W'X'Z'</li>
<li style="color: #333; line-height: 1.85;"><strong>0-00</strong> (0,4): W'Y'Z'</li>
<li style="color: #333; line-height: 1.85;"><strong>001-</strong> (2,3): W'X'Y</li>
<li style="color: #333; line-height: 1.85;"><strong>010-</strong> (4,5): W'XY'</li>
<li style="color: #333; line-height: 1.85;"><strong>-101</strong> (5,13): XY'Z</li>
<li style="color: #333; line-height: 1.85;"><strong>11-1</strong> (13,15): WXZ</li>
</ul>

<p style="color: #333; line-height: 1.85;"><strong>PI Chart and Selection:</strong></p>

<table style="font-size: 0.82rem; margin: 0.5rem auto; border-collapse: collapse;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 4px 10px;"></th><th style="padding: 4px 10px;">0</th><th style="padding: 4px 10px;">2</th><th style="padding: 4px 10px;">3</th><th style="padding: 4px 10px;">4</th><th style="padding: 4px 10px;">5</th><th style="padding: 4px 10px;">13</th><th style="padding: 4px 10px;">15</th></tr></thead>
<tbody>
<tr><td style="padding: 3px 10px; font-weight: 700;">00-0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">&times;</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">&times;</td><td style="padding: 3px 10px;"></td><td style="padding: 3px 10px;"></td><td style="padding: 3px 10px;"></td><td style="padding: 3px 10px;"></td><td style="padding: 3px 10px;"></td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px; font-weight: 700;">0-00</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">&times;</td><td style="padding: 3px 10px;"></td><td style="padding: 3px 10px;"></td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">&times;</td><td style="padding: 3px 10px;"></td><td style="padding: 3px 10px;"></td><td style="padding: 3px 10px;"></td></tr>
<tr><td style="padding: 3px 10px; font-weight: 700;">001-</td><td style="padding: 3px 10px;"></td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">&times;</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">&times;</td><td style="padding: 3px 10px;"></td><td style="padding: 3px 10px;"></td><td style="padding: 3px 10px;"></td><td style="padding: 3px 10px;"></td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px; font-weight: 700;">010-</td><td style="padding: 3px 10px;"></td><td style="padding: 3px 10px;"></td><td style="padding: 3px 10px;"></td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">&times;</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">&times;</td><td style="padding: 3px 10px;"></td><td style="padding: 3px 10px;"></td></tr>
<tr><td style="padding: 3px 10px; font-weight: 700;">-101</td><td style="padding: 3px 10px;"></td><td style="padding: 3px 10px;"></td><td style="padding: 3px 10px;"></td><td style="padding: 3px 10px;"></td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">&times;</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">&times;</td><td style="padding: 3px 10px;"></td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px; font-weight: 700;">11-1</td><td style="padding: 3px 10px;"></td><td style="padding: 3px 10px;"></td><td style="padding: 3px 10px;"></td><td style="padding: 3px 10px;"></td><td style="padding: 3px 10px;"></td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">&times;</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">&times;</td></tr>
</tbody>
</table>

<p style="color: #333; line-height: 1.85;"><strong>Essential PIs:</strong></p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">Column 3: Only 001- &rarr; Essential</li>
<li style="color: #333; line-height: 1.85;">Column 15: Only 11-1 &rarr; Essential</li>
</ul>

<p style="color: #333; line-height: 1.85;">After selecting essentials: Need to cover 0, 4, 5, 13</p>

<p style="color: #2E7D32; font-weight: 700;">Minimum: F = W'X'Y + WXZ + W'X'Z' + W'XY'</p>

<p style="color: #333; line-height: 1.85; margin-bottom: 0;">(or equivalent with 0-00 instead of 00-0)</p>
</div>
</details>

---

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 13</h3>

Minimize $F(A, B, C, D) = \sum m(0, 2, 8, 10)$ using QM.

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;"><strong>Step 1: Group minterms</strong></p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">Group 0: m<sub>0</sub> (0000)</li>
<li style="color: #333; line-height: 1.85;">Group 1: m<sub>2</sub> (0010), m<sub>8</sub> (1000)</li>
<li style="color: #333; line-height: 1.85;">Group 2: m<sub>10</sub> (1010)</li>
</ul>

<p style="color: #333; line-height: 1.85;"><strong>Step 2: First combinations</strong></p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">(0,2) = 00-0</li>
<li style="color: #333; line-height: 1.85;">(0,8) = -000</li>
<li style="color: #333; line-height: 1.85;">(2,10) = -010</li>
<li style="color: #333; line-height: 1.85;">(8,10) = 10-0</li>
</ul>

<p style="color: #333; line-height: 1.85;"><strong>Step 3: Second combinations</strong></p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">(0,2,8,10) = -0-0</li>
</ul>

<p style="color: #333; line-height: 1.85;"><strong>Prime Implicants:</strong></p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;"><strong>-0-0</strong> (0,2,8,10): B'D'</li>
</ul>

<p style="color: #333; line-height: 1.85;">This single PI covers all minterms!</p>

<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;">Minimum expression: F = B'D'</p>
</div>
</details>

---

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 14</h3>

Minimize $F(A, B, C, D) = \sum m(1, 5, 7, 8, 9, 10, 11, 14, 15)$ using QM.

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;"><strong>Step 1: Group by ones</strong></p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">Group 1: m<sub>1</sub> (0001), m<sub>8</sub> (1000)</li>
<li style="color: #333; line-height: 1.85;">Group 2: m<sub>5</sub> (0101), m<sub>9</sub> (1001), m<sub>10</sub> (1010)</li>
<li style="color: #333; line-height: 1.85;">Group 3: m<sub>7</sub> (0111), m<sub>11</sub> (1011), m<sub>14</sub> (1110)</li>
<li style="color: #333; line-height: 1.85;">Group 4: m<sub>15</sub> (1111)</li>
</ul>

<p style="color: #333; line-height: 1.85;"><strong>Steps 2&ndash;3: Combinations</strong></p>
<p style="color: #333; line-height: 1.85;">After all combinations:</p>

<p style="color: #333; line-height: 1.85;"><strong>Prime Implicants:</strong></p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;"><strong>0-01</strong> (1,5): A'C'D</li>
<li style="color: #333; line-height: 1.85;"><strong>-001</strong> (1,9): B'C'D</li>
<li style="color: #333; line-height: 1.85;"><strong>10--</strong> (8,9,10,11): AB'</li>
<li style="color: #333; line-height: 1.85;"><strong>01-1</strong> (5,7): A'BD</li>
<li style="color: #333; line-height: 1.85;"><strong>-111</strong> (7,15): BCD</li>
<li style="color: #333; line-height: 1.85;"><strong>1-11</strong> (11,15): ACD</li>
<li style="color: #333; line-height: 1.85;"><strong>111-</strong> (14,15): ABC</li>
</ul>

<p style="color: #333; line-height: 1.85;"><strong>PI Chart and Selection:</strong></p>
<p style="color: #333; line-height: 1.85;">Essential PIs:</p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">AB' (only cover for 8, 10)</li>
<li style="color: #333; line-height: 1.85;">A'C'D (only cover for 1 with A'BD not covering it alone)</li>
</ul>

<p style="color: #2E7D32; font-weight: 700;">Minimum: F = AB' + A'BD + ABC</p>

<p style="color: #333; line-height: 1.85; margin-bottom: 0;">Or: <strong>F = AB' + BCD + A'C'D</strong></p>
</div>
</details>

---

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 15</h3>

Apply QM to $F(A, B, C, D) = \sum m(0, 1, 3, 5, 7, 9, 11, 13, 15)$.

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;"><strong>Observation:</strong> The minterms are 0, 1, 3, 5, 7, 9, 11, 13, 15. All odd numbers (D=1) plus 0.</p>

<p style="color: #333; line-height: 1.85;"><strong>Step 1: Group minterms</strong></p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">Group 0: m<sub>0</sub> (0000)</li>
<li style="color: #333; line-height: 1.85;">Group 1: m<sub>1</sub> (0001)</li>
<li style="color: #333; line-height: 1.85;">Group 2: m<sub>3</sub> (0011), m<sub>5</sub> (0101), m<sub>9</sub> (1001)</li>
<li style="color: #333; line-height: 1.85;">Group 3: m<sub>7</sub> (0111), m<sub>11</sub> (1011), m<sub>13</sub> (1101)</li>
<li style="color: #333; line-height: 1.85;">Group 4: m<sub>15</sub> (1111)</li>
</ul>

<p style="color: #333; line-height: 1.85;"><strong>Steps 2&ndash;3: Combinations</strong></p>
<p style="color: #333; line-height: 1.85;">Eventually forms:</p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;"><strong>---1</strong> (1,3,5,7,9,11,13,15): D</li>
<li style="color: #333; line-height: 1.85;"><strong>000-</strong> (0,1): A'B'C'</li>
</ul>

<p style="color: #333; line-height: 1.85;"><strong>PI Chart:</strong></p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">D covers all odd minterms</li>
<li style="color: #333; line-height: 1.85;">A'B'C' covers 0, 1</li>
</ul>

<p style="color: #333; line-height: 1.85;">Minterm 0 only covered by A'B'C' &rarr; Essential</p>

<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;">Minimum: F = D + A'B'C'</p>
</div>
</details>

---

<h2 style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">Section D: QM with Don't Cares (3 problems)</h2>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 16</h3>

Minimize $F(A, B, C, D) = \sum m(0, 1, 2, 5, 7) + d(8, 9, 10)$ using QM.

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;"><strong>Include don't cares in combination phase:</strong></p>
<p style="color: #333; line-height: 1.85;">Minterms + Don't cares: 0, 1, 2, 5, 7, 8, 9, 10</p>

<p style="color: #333; line-height: 1.85;"><strong>Group by ones:</strong></p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">Group 0: m<sub>0</sub> (0000)</li>
<li style="color: #333; line-height: 1.85;">Group 1: m<sub>1</sub> (0001), m<sub>2</sub> (0010), d<sub>8</sub> (1000)</li>
<li style="color: #333; line-height: 1.85;">Group 2: m<sub>5</sub> (0101), d<sub>9</sub> (1001), d<sub>10</sub> (1010)</li>
<li style="color: #333; line-height: 1.85;">Group 3: m<sub>7</sub> (0111)</li>
</ul>

<p style="color: #333; line-height: 1.85;"><strong>Combinations:</strong></p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">(0,1) = 000-</li>
<li style="color: #333; line-height: 1.85;">(0,2) = 00-0</li>
<li style="color: #333; line-height: 1.85;">(0,8) = -000</li>
<li style="color: #333; line-height: 1.85;">(1,5) = 0-01</li>
<li style="color: #333; line-height: 1.85;">(1,9) = -001</li>
<li style="color: #333; line-height: 1.85;">(2,10) = -010</li>
<li style="color: #333; line-height: 1.85;">(8,9) = 100-</li>
<li style="color: #333; line-height: 1.85;">(8,10) = 10-0</li>
<li style="color: #333; line-height: 1.85;">(5,7) = 01-1</li>
</ul>

<p style="color: #333; line-height: 1.85;"><strong>Second combinations:</strong></p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">(0,1,8,9) = -00-</li>
<li style="color: #333; line-height: 1.85;">(0,2,8,10) = -0-0</li>
</ul>

<p style="color: #333; line-height: 1.85;"><strong>Prime Implicants:</strong></p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;"><strong>-00-</strong>: B'C'</li>
<li style="color: #333; line-height: 1.85;"><strong>-0-0</strong>: B'D'</li>
<li style="color: #333; line-height: 1.85;"><strong>01-1</strong>: A'BD</li>
</ul>

<p style="color: #333; line-height: 1.85;"><strong>PI Chart (only required minterms):</strong></p>

<table style="font-size: 0.82rem; margin: 0.5rem auto; border-collapse: collapse;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 4px 10px;"></th><th style="padding: 4px 10px;">0</th><th style="padding: 4px 10px;">1</th><th style="padding: 4px 10px;">2</th><th style="padding: 4px 10px;">5</th><th style="padding: 4px 10px;">7</th></tr></thead>
<tbody>
<tr><td style="padding: 3px 10px; font-weight: 700;">-00-</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">&times;</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">&times;</td><td style="padding: 3px 10px;"></td><td style="padding: 3px 10px;"></td><td style="padding: 3px 10px;"></td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px; font-weight: 700;">-0-0</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">&times;</td><td style="padding: 3px 10px;"></td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">&times;</td><td style="padding: 3px 10px;"></td><td style="padding: 3px 10px;"></td></tr>
<tr><td style="padding: 3px 10px; font-weight: 700;">01-1</td><td style="padding: 3px 10px;"></td><td style="padding: 3px 10px;"></td><td style="padding: 3px 10px;"></td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">&times;</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">&times;</td></tr>
</tbody>
</table>

<p style="color: #333; line-height: 1.85;"><strong>Essential:</strong></p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">01-1 essential for 5, 7</li>
<li style="color: #333; line-height: 1.85;">Need one of first two for 0, 1, 2</li>
</ul>

<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;">Best: F = B'C' + A'BD</p>
</div>
</details>

---

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 17</h3>

Minimize $F(A, B, C, D) = \sum m(2, 4, 5, 6, 10) + d(12, 13, 14, 15)$ using QM.

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;"><strong>All terms:</strong> 2, 4, 5, 6, 10, 12, 13, 14, 15</p>

<p style="color: #333; line-height: 1.85;"><strong>After QM combinations:</strong></p>
<p style="color: #333; line-height: 1.85;">Prime Implicants (using don't cares):</p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;"><strong>01--</strong> (4,5,6,7 if 7 were included, but we have 4,5,6): A'B</li>
<li style="color: #333; line-height: 1.85;"><strong>-1-0</strong> (4,6,12,14): BD'</li>
<li style="color: #333; line-height: 1.85;"><strong>11--</strong> (12,13,14,15): AB</li>
<li style="color: #333; line-height: 1.85;"><strong>-010</strong> (2,10): B'CD'</li>
</ul>

<p style="color: #333; line-height: 1.85;">Including d(12,13,14,15):</p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">(4,5,6,7) won't form since 7 not in function</li>
<li style="color: #333; line-height: 1.85;">(4,5,12,13) = -10- : BC'</li>
<li style="color: #333; line-height: 1.85;">(4,6,12,14) = -1-0 : BD'</li>
<li style="color: #333; line-height: 1.85;">(12,13,14,15) = 11-- : AB</li>
</ul>

<p style="color: #2E7D32; font-weight: 700;">Minimum: F = B'CD' + BC' + BD'</p>

<p style="color: #333; line-height: 1.85; margin-bottom: 0;">Or with AB: <strong>F = A'BD' + AB + B'CD'</strong></p>
</div>
</details>

---

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 18</h3>

For $F(A, B, C) = \sum m(1, 2) + d(3, 5, 7)$, find the minimum expression using QM.

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;"><strong>All terms:</strong> 1, 2, 3, 5, 7</p>

<p style="color: #333; line-height: 1.85;"><strong>Group by ones:</strong></p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">Group 1: m<sub>1</sub> (001), m<sub>2</sub> (010)</li>
<li style="color: #333; line-height: 1.85;">Group 2: d<sub>3</sub> (011), d<sub>5</sub> (101)</li>
<li style="color: #333; line-height: 1.85;">Group 3: d<sub>7</sub> (111)</li>
</ul>

<p style="color: #333; line-height: 1.85;"><strong>Combinations:</strong></p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">(1,3) = 0-1</li>
<li style="color: #333; line-height: 1.85;">(1,5) = -01</li>
<li style="color: #333; line-height: 1.85;">(2,3) = 01-</li>
<li style="color: #333; line-height: 1.85;">(3,7) = -11</li>
<li style="color: #333; line-height: 1.85;">(5,7) = 1-1</li>
</ul>

<p style="color: #333; line-height: 1.85;"><strong>Second combinations:</strong></p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">(1,3,5,7) = --1: C</li>
</ul>

<p style="color: #333; line-height: 1.85;"><strong>Prime Implicants:</strong></p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;"><strong>--1</strong>: C</li>
<li style="color: #333; line-height: 1.85;"><strong>01-</strong>: A'B</li>
</ul>

<p style="color: #333; line-height: 1.85;"><strong>PI Chart (required minterms only):</strong></p>

<table style="font-size: 0.82rem; margin: 0.5rem auto; border-collapse: collapse;">
<thead><tr style="background: #6A5BFF; color: #fff;"><th style="padding: 4px 10px;"></th><th style="padding: 4px 10px;">1</th><th style="padding: 4px 10px;">2</th></tr></thead>
<tbody>
<tr><td style="padding: 3px 10px; font-weight: 700;">C</td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">&times;</td><td style="padding: 3px 10px;"></td></tr>
<tr style="background: #f4fff4;"><td style="padding: 3px 10px; font-weight: 700;">A'B</td><td style="padding: 3px 10px;"></td><td style="padding: 3px 10px; color: #2E7D32; font-weight: 700;">&times;</td></tr>
</tbody>
</table>

<p style="color: #333; line-height: 1.85;">Both essential. C covers 1 and A'B covers 2.</p>

<p style="color: #2E7D32; font-weight: 700; margin-bottom: 0;">F = C + A'B (2 terms, 3 literals)</p>
</div>
</details>

---

<h2 style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">Section E: Applications (2 problems)</h2>

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 19</h3>

Compare the QM method with K-map for $F(A, B, C, D) = \sum m(0, 4, 8, 12, 3, 7, 11, 15)$.

a) Solve using QM
b) Verify using K-map
c) Discuss which method is more efficient for this function

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;"><strong>a) QM Solution:</strong></p>
<p style="color: #333; line-height: 1.85;">Minterms: 0, 3, 4, 7, 8, 11, 12, 15</p>

<p style="color: #333; line-height: 1.85;"><strong>Grouping:</strong></p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">Group 0: m<sub>0</sub> (0000)</li>
<li style="color: #333; line-height: 1.85;">Group 1: m<sub>4</sub> (0100), m<sub>8</sub> (1000)</li>
<li style="color: #333; line-height: 1.85;">Group 2: m<sub>3</sub> (0011), m<sub>12</sub> (1100)</li>
<li style="color: #333; line-height: 1.85;">Group 3: m<sub>7</sub> (0111), m<sub>11</sub> (1011)</li>
<li style="color: #333; line-height: 1.85;">Group 4: m<sub>15</sub> (1111)</li>
</ul>

<p style="color: #333; line-height: 1.85;"><strong>Combinations:</strong></p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">(0,4) = 0-00</li>
<li style="color: #333; line-height: 1.85;">(0,8) = -000</li>
<li style="color: #333; line-height: 1.85;">(4,12) = -100</li>
<li style="color: #333; line-height: 1.85;">(8,12) = 1-00</li>
<li style="color: #333; line-height: 1.85;">(3,7) = 0-11</li>
<li style="color: #333; line-height: 1.85;">(3,11) = -011</li>
<li style="color: #333; line-height: 1.85;">(7,15) = -111</li>
<li style="color: #333; line-height: 1.85;">(11,15) = 1-11</li>
</ul>

<p style="color: #333; line-height: 1.85;"><strong>Second combinations:</strong></p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">(0,4,8,12) = --00: C'D'</li>
<li style="color: #333; line-height: 1.85;">(3,7,11,15) = --11: CD</li>
</ul>

<p style="color: #2E7D32; font-weight: 700;">Minimum: F = C'D' + CD</p>

<p style="color: #333; line-height: 1.85;"><strong>b) K-map verification:</strong></p>
<pre style="background: #f5f5f5; border-radius: 6px; padding: 10px 16px; font-size: 0.9rem; margin: 0.5rem 0;">      CD
   00  01  11  10
AB +---+---+---+---+
00 | 1 | 0 | 1 | 0 |
   +---+---+---+---+
01 | 1 | 0 | 1 | 0 |
   +---+---+---+---+
11 | 1 | 0 | 1 | 0 |
   +---+---+---+---+
10 | 1 | 0 | 1 | 0 |
   +---+---+---+---+</pre>

<p style="color: #333; line-height: 1.85;">Groups: Column 00 (C'D'), Column 11 (CD)</p>
<p style="color: #333; line-height: 1.85;"><strong>F = C'D' + CD</strong> &mdash; Confirmed!</p>

<p style="color: #333; line-height: 1.85;"><strong>c) Comparison:</strong></p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0 0;">
<li style="color: #333; line-height: 1.85;">K-map: Faster for this problem &mdash; pattern (vertical columns) is immediately visible</li>
<li style="color: #333; line-height: 1.85;">QM: More systematic but requires more steps</li>
<li style="color: #333; line-height: 1.85;">For 4 variables, K-map is generally faster when patterns are clear</li>
<li style="color: #333; line-height: 1.85; margin-bottom: 0;">QM advantage: Works identically for any number of variables</li>
</ul>
</div>
</details>

---

<h3 style="color: #5A3EED; font-weight: 700; margin-top: 1.8rem; margin-bottom: 0.6rem;">Problem 20</h3>

A digital system has 6 inputs (A, B, C, D, E, F). Explain why the Quine-McCluskey method would be preferred over K-maps for this problem, and describe the computational challenges involved.

<details style="margin-top: 1rem;">
<summary style="color: #5A3EED; font-weight: 700; cursor: pointer;">Show Solution</summary>
<div style="background: #E7F7E7; border: 2px solid #81C784; border-radius: 10px; padding: 18px 22px; margin-top: 10px;">
<p style="color: #333; line-height: 1.85; margin-top: 0;"><strong>Why QM is preferred for 6 variables:</strong></p>

<p style="color: #333; line-height: 1.85;"><strong>1. K-map limitations:</strong></p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">6-variable K-map has 64 cells (2<sup>6</sup>)</li>
<li style="color: #333; line-height: 1.85;">Requires 3D visualization or two 4-variable maps</li>
<li style="color: #333; line-height: 1.85;">Adjacent cell identification becomes error-prone</li>
<li style="color: #333; line-height: 1.85;">Grouping across map boundaries is difficult to visualize</li>
</ul>

<p style="color: #333; line-height: 1.85;"><strong>2. QM advantages:</strong></p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">Purely algorithmic &mdash; no visualization needed</li>
<li style="color: #333; line-height: 1.85;">Systematic comparison of adjacent terms</li>
<li style="color: #333; line-height: 1.85;">Guaranteed to find all prime implicants</li>
<li style="color: #333; line-height: 1.85;">Can be easily programmed</li>
</ul>

<p style="color: #333; line-height: 1.85;"><strong>Computational challenges with 6 variables:</strong></p>

<p style="color: #333; line-height: 1.85;"><strong>1. Number of possible minterms:</strong> 64</p>

<p style="color: #333; line-height: 1.85;"><strong>2. Maximum prime implicants:</strong></p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">In worst case, could have many prime implicants</li>
<li style="color: #333; line-height: 1.85;">For <span class="arithmatex">\(n\)</span> variables: up to <span class="arithmatex">\(3^n/n\)</span> prime implicants possible</li>
<li style="color: #333; line-height: 1.85;">For 6 variables: potentially hundreds of PIs</li>
</ul>

<p style="color: #333; line-height: 1.85;"><strong>3. Combination explosion:</strong></p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">Column 1: Up to 64 minterms</li>
<li style="color: #333; line-height: 1.85;">Column 2: Up to <span class="arithmatex">\(\binom{64}{2}\)</span> = 2016 potential pairs</li>
<li style="color: #333; line-height: 1.85;">Actual combinations much fewer due to adjacency requirement</li>
</ul>

<p style="color: #333; line-height: 1.85;"><strong>4. PI chart complexity:</strong></p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">May have large cyclic charts</li>
<li style="color: #333; line-height: 1.85;">Petrick's method can produce exponentially large expressions</li>
</ul>

<p style="color: #333; line-height: 1.85;"><strong>5. NP-complete nature:</strong></p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0.8rem 0;">
<li style="color: #333; line-height: 1.85;">Finding minimum cover is NP-complete</li>
<li style="color: #333; line-height: 1.85;">Exact solution may require exponential time</li>
<li style="color: #333; line-height: 1.85;">Heuristic methods often used for large problems</li>
</ul>

<p style="color: #333; line-height: 1.85;"><strong>Practical solutions:</strong></p>
<ul style="list-style: none; padding-left: 0; margin: 0.3rem 0 0 0;">
<li style="color: #333; line-height: 1.85;">Use computer implementations (ESPRESSO algorithm)</li>
<li style="color: #333; line-height: 1.85;">Apply heuristic minimization for very large functions</li>
<li style="color: #333; line-height: 1.85; margin-bottom: 0;">Accept near-optimal rather than globally optimal solutions</li>
</ul>
</div>
</details>

---

<h2 style="color: #5A3EED !important; border-left: none !important; border-bottom: 2px solid #5A3EED; padding-left: 0 !important; padding-bottom: 0.4rem; font-weight: 800; margin-top: 2.2rem; margin-bottom: 0.8rem;">Summary</h2>

<div style="background: #EEF4FF; border: 2px solid #A8C8FF; border-radius: 12px; padding: 24px 28px; margin: 1.5rem 0; box-shadow: 0 2px 8px rgba(90,61,237,0.07);" markdown>

| Section | Topics Covered | Problem Count |
|---------|---------------|---------------|
| A | Implicant Table Construction | 5 |
| B | Prime Implicant Charts | 5 |
| C | Complete QM Solutions | 5 |
| D | QM with Don't Cares | 3 |
| E | Applications | 2 |
| **Total** | | **20** |

</div>

</div>
