# Unit 1 — Number Systems — Narration Script

**Duration:** ~2–3 minutes
**Voice:** Friendly, educational narrator
**Audience:** Undergraduate engineering students

---

## Script

Welcome to Unit 1 of Digital System Design, where we explore the number systems that form the mathematical backbone of every digital device you use. You already think in decimal every day — base ten, with digits zero through nine — but computers speak an entirely different language. Understanding how to move between that familiar world and the world of ones and zeros is where your journey into digital design truly begins.

Let's start with the big idea: positional notation. In any number system, the value of a digit depends on its position. In decimal, the number 365 means three hundreds, six tens, and five ones. The same principle applies in binary, octal, and hexadecimal — only the base changes. Binary uses base two with just the digits zero and one. Octal uses base eight with digits zero through seven. And hexadecimal uses base sixteen, borrowing the letters A through F to represent values ten through fifteen. Each of these systems appears constantly in hardware description, memory addressing, and low-level programming.

So how do you convert between them? The key techniques are repeated division for converting from decimal to another base, and weighted expansion for converting back to decimal. With a little practice, you will also learn shortcut groupings — every three binary digits map neatly to one octal digit, and every four binary digits map to one hexadecimal digit. These shortcuts save enormous amounts of time when you are reading data sheets or debugging hardware.

Once you are comfortable moving between bases, we turn to binary arithmetic — addition, subtraction, and the critical concept of signed versus unsigned representation. Unsigned binary treats every bit as a magnitude bit, which works perfectly for values that are never negative. But most real-world computation needs negative numbers too. That is where two's complement comes in. Two's complement lets us represent both positive and negative integers using a fixed number of bits, and the beauty is that the same addition circuitry works for both signed and unsigned values. We will walk through how to negate a number by inverting its bits and adding one, and how to detect overflow — the moment a result exceeds the range that your bit width can hold.

Mastering these concepts now pays off in every unit that follows, because gates, adders, and entire processors all operate on the binary representations you will learn here. Take your time with the conversions and the arithmetic. They are the foundation for everything ahead.

---

## Key Takeaways

1. Positional notation is the unifying principle behind decimal, binary, octal, and hexadecimal — only the base differs.
2. Conversion techniques such as repeated division, weighted expansion, and binary-to-hex grouping are essential everyday skills in digital design.
3. Two's complement representation enables signed arithmetic with the same hardware used for unsigned addition, and overflow detection tells you when a result has exceeded the available bit width.
