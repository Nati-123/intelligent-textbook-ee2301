# Unit 1 — Number Systems

Number systems form the foundation of digital system design.
This unit introduces different numerical representations used in computing and digital electronics.

---

## 🔵 Topics Covered

- Decimal, Binary, Octal, and Hexadecimal number systems  
- Base conversions (manual + shortcut methods)  
- Positional notation  
- Binary arithmetic  
- Signed number systems  
  - Signed magnitude  
  - 1’s complement  
  - 2’s complement  
- Overflow detection  
- Applications in digital hardware  

---

## 🔢 1. Positional Number Systems

A positional system expresses a number as:

$$
N = \sum_{i=0}^{k} d_i \cdot \text{base}^i
$$

### Example (decimal):

$$
472 = 4 \cdot 10^2 + 7 \cdot 10^1 + 2 \cdot 10^0
$$

### Example (binary):

$$
1011_2 = 1\cdot2^3 + 0\cdot2^2 + 1\cdot2^1 + 1\cdot2^0 = 11_{10}
$$

---

## 🔢 2. Base Conversions

### A. Decimal → Binary

Repeated division by 2.

**Example: Convert 19₁₀**

| Step | Number | ÷2 | Remainder |
|------|--------|----|-----------|
| 1 | 19 | 9 | 1 |
| 2 | 9 | 4 | 1 |
| 3 | 4 | 2 | 0 |
| 4 | 2 | 1 | 0 |
| 5 | 1 | 0 | 1 |

Reading remainders bottom → top:

$$
19_{10} = 10011_2
$$

