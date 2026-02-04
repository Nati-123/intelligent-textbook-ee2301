# Unit 2 — Boolean Algebra

Boolean Algebra provides the mathematical foundation for digital logic design.  
It is used to describe, simplify, and analyze digital circuits.

---

##  Topics Covered

- Boolean variables and constants  
- Basic logic operators (AND, OR, NOT)  
- Derived operators (NAND, NOR, XOR, XNOR)  
- Boolean identities  
- DeMorgan’s Theorems  
- Algebraic simplification  
- Standard forms (SOP and POS)  
- Logic gate implementations  

---

##  1. Boolean Variables and Constants

A Boolean variable can take only two values:

$$
0 \quad \text{(False)}, \quad 1 \quad \text{(True)}
$$

Basic operators:

- **AND** → multiplication → \( A \cdot B \)
- **OR** → addition → \( A + B \)
- **NOT** → inversion → \( \bar{A} \)

---

##  2. Basic Operators and Truth Tables

### AND Operator

| A | B | A·B |
|---|---|-----|
| 0 | 0 |  0  |
| 0 | 1 |  0  |
| 1 | 0 |  0  |
| 1 | 1 |  1  |

### OR Operator

| A | B | A + B |
|---|---|--------|
| 0 | 0 |   0    |
| 0 | 1 |   1    |
| 1 | 0 |   1    |
| 1 | 1 |   1    |

### NOT Operator

| A | NOT(A) |
|---|--------|
| 0 |   1    |
| 1 |   0    |

---

##  3. Boolean Identities

Some core identities:

- **Idempotent:**  
  \( A + A = A,\quad A \cdot A = A \)

- **Null Laws:**  
  \( A + 1 = 1,\quad A \cdot 0 = 0 \)

- **Identity Laws:**  
  \( A + 0 = A,\quad A \cdot 1 = A \)

- **Complement Laws:**  
  \( A + \bar{A} = 1,\quad A \cdot \bar{A} = 0 \)

---

##  4. DeMorgan’s Theorems

Very important for digital design:

$$
\overline{A \cdot B} = \bar{A} + \bar{B}
$$

$$
\overline{A + B} = \bar{A} \cdot \bar{B}
$$

These allow converting between **AND–OR** and **NAND–NOR** logic.

---

##  5. Algebraic Simplification Example

Simplify:

$$
F = A\cdot B + A \cdot \bar{B}
$$

Factor out \( A \):

$$
F = A (B + \bar{B})
$$

Using complement identity \( B + \bar{B} = 1 \):

$$
F = A\cdot 1 = A
$$

---

##  6. Standard Forms

### Sum of Products (SOP)

Example:

$$
F = A\bar{B} + AB\bar{C}
$$

### Product of Sums (POS)

Example:

$$
F = (A + B)(\bar{A} + C)
$$

SOP is used for AND–OR circuits  
POS is used for OR–AND circuits.

---

## 🔧 7. Logic Gate Implementations

Boolean expressions can be directly implemented using logic gates:

- AND → **AND gate**  
- OR → **OR gate**  
- NOT → **Inverter**  
- NAND / NOR → universal gates  
- XOR → sum of modulo-2  
- XNOR → equality detector  


