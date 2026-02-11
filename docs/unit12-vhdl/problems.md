---
title: Unit 12 Problems - Introduction to VHDL
description: Practice problems for VHDL entities, architectures, modeling styles, and synthesis
---

# End-of-Unit Problems: Introduction to VHDL

Work through these problems to reinforce your understanding of VHDL entities, architectures, concurrent and sequential statements, and synthesis inference.

---

## Section A: Entity and Architecture (4 problems)

### Problem 1
Write a complete VHDL entity declaration for a 4-bit magnitude comparator with two 4-bit inputs $A$ and $B$, and three single-bit outputs: `gt` (greater than), `eq` (equal), and `lt` (less than). Use `std_logic` and `std_logic_vector` types.

!!! success "Solution"
    **Entity declaration:**

    ```vhdl
    library IEEE;
    use IEEE.STD_LOGIC_1164.ALL;

    entity mag_compare4 is
        port (
            A  : in  std_logic_vector(3 downto 0);
            B  : in  std_logic_vector(3 downto 0);
            gt : out std_logic;
            eq : out std_logic;
            lt : out std_logic
        );
    end entity mag_compare4;
    ```

    **Key points:**

    - The `library` and `use` statements import the `std_logic` types
    - `std_logic_vector(3 downto 0)` declares a 4-bit bus with bit 3 as MSB
    - Port modes are `in` for inputs and `out` for outputs
    - The entity name (`mag_compare4`) must match the file name in most tools
    - The semicolon after the last port and after `end entity` are required

    **A matching architecture (dataflow style):**

    ```vhdl
    architecture dataflow of mag_compare4 is
    begin
        gt <= '1' when (A > B) else '0';
        eq <= '1' when (A = B) else '0';
        lt <= '1' when (A < B) else '0';
    end architecture dataflow;
    ```

    The `>`, `=`, and `<` operators work on `std_logic_vector` when using the `IEEE.STD_LOGIC_1164` library, performing unsigned comparison based on bit position.

---

### Problem 2
Explain the nine values of the `std_logic` type. For each value, state what real-world condition it models and whether it is synthesizable.

!!! success "Solution"
    **The nine values of `std_logic`:**

    | Value | Meaning | Real-World Condition | Synthesizable? |
    |-------|---------|---------------------|----------------|
    | `'U'` | Uninitialized | Signal has not been assigned | No (simulation only) |
    | `'X'` | Forcing unknown | Conflict between drivers | No (simulation only) |
    | `'0'` | Forcing low | Strong logic 0 (driven low) | Yes |
    | `'1'` | Forcing high | Strong logic 1 (driven high) | Yes |
    | `'Z'` | High impedance | Tri-state / disconnected | Yes (tri-state buffers) |
    | `'W'` | Weak unknown | Conflict between weak drivers | No (simulation only) |
    | `'L'` | Weak low | Pull-down resistor | Sometimes |
    | `'H'` | Weak high | Pull-up resistor | Sometimes |
    | `'-'` | Don't care | Value is irrelevant | Yes (optimization hint) |

    **Resolution function:**

    When multiple drivers assign different values to the same `std_logic` signal, the resolution function determines the result. Stronger drivers override weaker ones:

    - `'0'` or `'1'` (forcing) overrides `'L'`, `'H'`, or `'Z'` (weak/high-Z)
    - Two forcing drivers with different values produce `'X'`
    - `'Z'` against any driven value yields the driven value

    **In practice:**

    - Most synthesized designs use only `'0'`, `'1'`, `'Z'`, and `'-'`
    - `'U'` and `'X'` are invaluable for catching simulation errors (an `'X'` in simulation means a design bug)
    - `std_logic` is preferred over the simpler `bit` type (which only has `'0'` and `'1'`) because it models real hardware behavior

---

### Problem 3
Given the following VHDL code, identify and correct all syntax errors:

```vhdl
library IEEE;
use IEEE.STD_LOGIC_1164.ALL

entity half_adder is
    port (
        A, B : in  std_logic
        sum  : out std_logic;
        cout : out std_logic;
    )
end half_adder;

architecture behave of half_addr is
begin
    sum <= A xor B;
    cout <= A and B;
end behave;
```

!!! success "Solution"
    **Errors identified and corrected:**

    | Line | Error | Correction |
    |------|-------|------------|
    | 2 | Missing semicolon after `ALL` | `use IEEE.STD_LOGIC_1164.ALL;` |
    | 5 | Missing semicolon after `std_logic` (port A, B) | `A, B : in  std_logic;` |
    | 8 | Trailing semicolon after last port before `)` | Remove `;` after `std_logic` on cout line |
    | 9 | Missing semicolon after `)` | `);` is actually fine but the `)` should not have a semicolon before it on the previous line |
    | 11 | Architecture entity name mismatch: `half_addr` instead of `half_adder` | `architecture behave of half_adder is` |

    **Corrected code:**

    ```vhdl
    library IEEE;
    use IEEE.STD_LOGIC_1164.ALL;

    entity half_adder is
        port (
            A, B : in  std_logic;
            sum  : out std_logic;
            cout : out std_logic
        );
    end entity half_adder;

    architecture behave of half_adder is
    begin
        sum  <= A xor B;
        cout <= A and B;
    end architecture behave;
    ```

    **Rules to remember:**

    - Every `use` statement ends with a semicolon
    - Port list entries are separated by semicolons, but the **last** port has **no** trailing semicolon before the closing `)`
    - The architecture name must reference the correct entity name
    - Adding `entity` and `architecture` keywords after `end` is optional but good practice

---

### Problem 4
Write an entity and architecture for a generic N-bit register with parallel load enable and asynchronous reset. Use the `generic` clause to make the width parameterizable.

!!! success "Solution"
    **Generic N-bit register:**

    ```vhdl
    library IEEE;
    use IEEE.STD_LOGIC_1164.ALL;

    entity reg_n is
        generic (
            N : positive := 8    -- default width is 8 bits
        );
        port (
            clk   : in  std_logic;
            rst   : in  std_logic;                        -- async reset
            load  : in  std_logic;                        -- load enable
            d_in  : in  std_logic_vector(N-1 downto 0);   -- parallel data in
            q_out : out std_logic_vector(N-1 downto 0)    -- parallel data out
        );
    end entity reg_n;

    architecture behavioral of reg_n is
    begin
        process(clk, rst)
        begin
            if rst = '1' then
                q_out <= (others => '0');    -- clear all bits
            elsif rising_edge(clk) then
                if load = '1' then
                    q_out <= d_in;           -- load new data
                end if;
                -- if load='0', q_out retains value (register holds)
            end if;
        end process;
    end architecture behavioral;
    ```

    **Key concepts:**

    - `generic` declares parameterizable constants; `N : positive := 8` sets a default of 8
    - `(others => '0')` is an aggregate that fills all bits with `'0'`, regardless of width
    - The `rising_edge(clk)` function detects the clock edge
    - Asynchronous reset (`rst`) appears in the sensitivity list and is checked **before** the clock edge
    - When `load = '0'` and no assignment occurs inside `elsif rising_edge(clk)`, the synthesizer infers a register that holds its value

    **Instantiating with a specific width:**

    ```vhdl
    reg16: entity work.reg_n
        generic map (N => 16)
        port map (
            clk   => sys_clk,
            rst   => sys_rst,
            load  => ld_enable,
            d_in  => data_bus,
            q_out => reg_output
        );
    ```

---

## Section B: Concurrent Statements and Dataflow (4 problems)

### Problem 5
Write a VHDL dataflow architecture for a 2-to-4 decoder with an enable input. The decoder has a 2-bit input `sel`, 1-bit `en`, and 4-bit output `y`. When `en = '0'`, all outputs are `'0'`.

!!! success "Solution"
    **Dataflow architecture using conditional signal assignment:**

    ```vhdl
    library IEEE;
    use IEEE.STD_LOGIC_1164.ALL;

    entity decoder2to4 is
        port (
            sel : in  std_logic_vector(1 downto 0);
            en  : in  std_logic;
            y   : out std_logic_vector(3 downto 0)
        );
    end entity decoder2to4;

    architecture dataflow of decoder2to4 is
    begin
        y <= "0001" when (en = '1' and sel = "00") else
             "0010" when (en = '1' and sel = "01") else
             "0100" when (en = '1' and sel = "10") else
             "1000" when (en = '1' and sel = "11") else
             "0000";
    end architecture dataflow;
    ```

    **Alternative using selected signal assignment:**

    ```vhdl
    architecture dataflow_v2 of decoder2to4 is
        signal sel_full : std_logic_vector(2 downto 0);
    begin
        sel_full <= en & sel;   -- concatenate enable with select

        with sel_full select
            y <= "0001" when "100",
                 "0010" when "101",
                 "0100" when "110",
                 "1000" when "111",
                 "0000" when others;
    end architecture dataflow_v2;
    ```

    **Truth table:**

    | en | sel(1) | sel(0) | y(3) | y(2) | y(1) | y(0) |
    |----|--------|--------|------|------|------|------|
    | 0  | X      | X      | 0    | 0    | 0    | 0    |
    | 1  | 0      | 0      | 0    | 0    | 0    | 1    |
    | 1  | 0      | 1      | 0    | 0    | 1    | 0    |
    | 1  | 1      | 0      | 0    | 1    | 0    | 0    |
    | 1  | 1      | 1      | 1    | 0    | 0    | 0    |

    **Key points:**

    - Both versions are purely concurrent (no `process`)
    - `when...else` is a conditional signal assignment (priority encoded)
    - `with...select` is a selected signal assignment (like a MUX)
    - Both synthesize to identical combinational logic

---

### Problem 6
Explain why the following VHDL code contains a potential error and show how to fix it:

```vhdl
architecture bad of example is
    signal a, b, c, y : std_logic;
begin
    y <= a and b;
    y <= b or c;
end architecture bad;
```

!!! success "Solution"
    **The error: multiple drivers on signal `y`.**

    In VHDL, concurrent signal assignments act as independent hardware drivers. Having two concurrent assignments to the same signal `y` creates two separate drivers, which is illegal for `std_logic` resolution in synthesis and produces a multiply-driven net error.

    **What happens in simulation:**

    The `std_logic` resolution function resolves the two drivers:

    - If both drive `'1'`, result is `'1'`
    - If both drive `'0'`, result is `'0'`
    - If one drives `'0'` and the other `'1'`, result is `'X'` (conflict)

    This is almost never the intended behavior.

    **Fix 1: Combine into one assignment:**

    ```vhdl
    architecture fix1 of example is
        signal a, b, c, y : std_logic;
    begin
        y <= (a and b) or (b or c);
    end architecture fix1;
    ```

    **Fix 2: Use a conditional assignment (if intent is selection):**

    ```vhdl
    architecture fix2 of example is
        signal a, b, c, y, sel : std_logic;
    begin
        y <= (a and b) when sel = '0' else
             (b or c);
    end architecture fix2;
    ```

    **Fix 3: Use intermediate signals:**

    ```vhdl
    architecture fix3 of example is
        signal a, b, c : std_logic;
        signal y1, y2, y : std_logic;
    begin
        y1 <= a and b;
        y2 <= b or c;
        y  <= y1 or y2;    -- combine as needed
    end architecture fix3;
    ```

    **Rule:** Each signal should have exactly one driver in synthesizable VHDL (except for tri-state buses using `'Z'`).

---

### Problem 7
Write a dataflow VHDL description of a 4-bit ripple carry adder using the `generate` statement. Assume a `full_adder` component is available.

!!! success "Solution"
    **Full adder component (assumed available):**

    ```vhdl
    entity full_adder is
        port (
            a, b, cin : in  std_logic;
            sum, cout : out std_logic
        );
    end entity full_adder;

    architecture dataflow of full_adder is
    begin
        sum  <= a xor b xor cin;
        cout <= (a and b) or (a and cin) or (b and cin);
    end architecture dataflow;
    ```

    **4-bit ripple carry adder using `generate`:**

    ```vhdl
    library IEEE;
    use IEEE.STD_LOGIC_1164.ALL;

    entity ripple_adder4 is
        port (
            A, B  : in  std_logic_vector(3 downto 0);
            cin   : in  std_logic;
            sum   : out std_logic_vector(3 downto 0);
            cout  : out std_logic
        );
    end entity ripple_adder4;

    architecture structural of ripple_adder4 is
        component full_adder is
            port (
                a, b, cin : in  std_logic;
                sum, cout : out std_logic
            );
        end component;

        signal carry : std_logic_vector(4 downto 0);
    begin
        carry(0) <= cin;

        gen_adder: for i in 0 to 3 generate
            FA: full_adder port map (
                a    => A(i),
                b    => B(i),
                cin  => carry(i),
                sum  => sum(i),
                cout => carry(i+1)
            );
        end generate gen_adder;

        cout <= carry(4);
    end architecture structural;
    ```

    **Key concepts:**

    - `for...generate` replicates hardware — it creates 4 full adder instances
    - The `carry` signal vector connects each stage's carry-out to the next stage's carry-in
    - `carry(0)` is the external carry-in; `carry(4)` is the final carry-out
    - The generate label (`gen_adder`) is required
    - Each instance `FA` is automatically named `gen_adder(0).FA`, `gen_adder(1).FA`, etc.

    **Equivalent circuit:**

    ```
    A(0) B(0)    A(1) B(1)    A(2) B(2)    A(3) B(3)
      |    |       |    |       |    |       |    |
    [FA0]------>[FA1]------>[FA2]------>[FA3]----> cout
      |    ^       |    ^       |    ^       |
    sum(0) cin   sum(1)       sum(2)       sum(3)
    ```

---

### Problem 8
Write VHDL concurrent signal assignments to implement the following Boolean equations. Use only basic logic operators (`and`, `or`, `not`, `xor`).

- $F_1 = A \cdot B + \overline{C} \cdot D$
- $F_2 = (A \oplus B) \cdot (C \oplus D)$
- $F_3 = \overline{A \cdot B + C \cdot D}$

!!! success "Solution"
    **VHDL implementation:**

    ```vhdl
    library IEEE;
    use IEEE.STD_LOGIC_1164.ALL;

    entity bool_equations is
        port (
            A, B, C, D : in  std_logic;
            F1, F2, F3 : out std_logic
        );
    end entity bool_equations;

    architecture dataflow of bool_equations is
    begin
        F1 <= (A and B) or (not C and D);
        F2 <= (A xor B) and (C xor D);
        F3 <= not ((A and B) or (C and D));
    end architecture dataflow;
    ```

    **Important operator precedence rules in VHDL:**

    VHDL does **not** define precedence among `and`, `or`, `xor`, `nand`, `nor`, `xnor`. They are all at the same level. Parentheses are **required** to specify grouping.

    **This would be a compile error:**

    ```vhdl
    F1 <= A and B or not C and D;   -- ERROR: ambiguous
    ```

    **Correct with parentheses:**

    ```vhdl
    F1 <= (A and B) or ((not C) and D);
    ```

    **Note:** `not` has higher precedence than all other logical operators, so `not C and D` means `(not C) and D`. But mixing `and` with `or` without parentheses is illegal.

    **Verification truth table for $F_1$:**

    | A | B | C | D | $A \cdot B$ | $\overline{C} \cdot D$ | $F_1$ |
    |---|---|---|---|-------------|------------------------|-------|
    | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
    | 0 | 0 | 0 | 1 | 0 | 1 | 1 |
    | 1 | 1 | 0 | 0 | 1 | 0 | 1 |
    | 1 | 1 | 0 | 1 | 1 | 1 | 1 |
    | 1 | 1 | 1 | 0 | 1 | 0 | 1 |
    | 0 | 1 | 1 | 1 | 0 | 0 | 0 |

---

## Section C: Process Statements and Behavioral Modeling (4 problems)

### Problem 9
Write a VHDL process that implements a 4-to-1 multiplexer using an `if-then-else` statement. The inputs are `d0`, `d1`, `d2`, `d3` (all `std_logic`), `sel` is `std_logic_vector(1 downto 0)`, and the output is `y`.

!!! success "Solution"
    **Behavioral 4-to-1 MUX using `if-then-else`:**

    ```vhdl
    library IEEE;
    use IEEE.STD_LOGIC_1164.ALL;

    entity mux4to1 is
        port (
            d0, d1, d2, d3 : in  std_logic;
            sel             : in  std_logic_vector(1 downto 0);
            y               : out std_logic
        );
    end entity mux4to1;

    architecture behavioral of mux4to1 is
    begin
        mux_proc: process(d0, d1, d2, d3, sel)
        begin
            if sel = "00" then
                y <= d0;
            elsif sel = "01" then
                y <= d1;
            elsif sel = "10" then
                y <= d2;
            else
                y <= d3;
            end if;
        end process mux_proc;
    end architecture behavioral;
    ```

    **Alternative using `case` statement (preferred for MUX):**

    ```vhdl
    architecture behavioral_v2 of mux4to1 is
    begin
        mux_proc: process(d0, d1, d2, d3, sel)
        begin
            case sel is
                when "00"   => y <= d0;
                when "01"   => y <= d1;
                when "10"   => y <= d2;
                when "11"   => y <= d3;
                when others => y <= 'X';
            end case;
        end process mux_proc;
    end architecture behavioral_v2;
    ```

    **Key points:**

    - **Sensitivity list** includes all inputs: `d0, d1, d2, d3, sel` — if any input is omitted, simulation will not match synthesis
    - The `if-then-else` creates priority logic; `case` creates balanced MUX logic
    - `when others` is required in `case` because `std_logic_vector` has more than 4 possible values (each bit has 9 values)
    - This process describes **combinational** logic because every path assigns a value to `y`

---

### Problem 10
What is wrong with the following VHDL process? Explain what hardware it infers and how to fix it.

```vhdl
process(a, b, sel)
begin
    if sel = '1' then
        y <= a;
    end if;
end process;
```

!!! success "Solution"
    **Problem: Unintended latch inference.**

    The `if` statement assigns `y` when `sel = '1'` but has no `else` clause. When `sel = '0'`, `y` is not assigned, so VHDL infers that `y` must **retain its previous value**. This requires memory, so the synthesizer creates a **latch**.

    **Inferred hardware:**

    ```
    a ───[D-latch]── y
          |
    sel ──┘ (enable)
    ```

    When `sel = '1'`: latch is transparent, `y` follows `a`.
    When `sel = '0'`: latch holds, `y` retains its last value.

    **Why this is bad:**

    - Latches are sensitive to input glitches during the entire enable period
    - Timing analysis is more difficult with latches
    - Most FPGA architectures are optimized for flip-flops, not latches
    - Synthesis tools often generate warnings about inferred latches

    **Fix 1: Add an `else` clause (combinational logic):**

    ```vhdl
    process(a, b, sel)
    begin
        if sel = '1' then
            y <= a;
        else
            y <= b;    -- now y is always assigned
        end if;
    end process;
    ```

    This synthesizes to a 2-to-1 MUX (no latch).

    **Fix 2: Assign a default value before the `if`:**

    ```vhdl
    process(a, b, sel)
    begin
        y <= b;            -- default assignment
        if sel = '1' then
            y <= a;        -- overrides default when sel='1'
        end if;
    end process;
    ```

    This also synthesizes to a 2-to-1 MUX. The default value acts as the implicit `else`.

    **Rule:** For combinational logic, ensure every signal is assigned a value on **every possible execution path** through the process.

---

### Problem 11
Write a VHDL process for a priority encoder with 4 inputs. Input `req(3)` has highest priority and `req(0)` has lowest. Output `code` is a 2-bit encoding of the highest active request, and `valid` indicates at least one request is active.

!!! success "Solution"
    **Priority encoder:**

    ```vhdl
    library IEEE;
    use IEEE.STD_LOGIC_1164.ALL;

    entity priority_enc is
        port (
            req   : in  std_logic_vector(3 downto 0);
            code  : out std_logic_vector(1 downto 0);
            valid : out std_logic
        );
    end entity priority_enc;

    architecture behavioral of priority_enc is
    begin
        process(req)
        begin
            if req(3) = '1' then
                code  <= "11";
                valid <= '1';
            elsif req(2) = '1' then
                code  <= "10";
                valid <= '1';
            elsif req(1) = '1' then
                code  <= "01";
                valid <= '1';
            elsif req(0) = '1' then
                code  <= "00";
                valid <= '1';
            else
                code  <= "00";
                valid <= '0';
            end if;
        end process;
    end architecture behavioral;
    ```

    **Truth table (showing priority):**

    | req(3) | req(2) | req(1) | req(0) | code | valid |
    |--------|--------|--------|--------|------|-------|
    | 0 | 0 | 0 | 0 | 00 | 0 |
    | 0 | 0 | 0 | 1 | 00 | 1 |
    | 0 | 0 | 1 | X | 01 | 1 |
    | 0 | 1 | X | X | 10 | 1 |
    | 1 | X | X | X | 11 | 1 |

    **Key points:**

    - The `if-elsif` chain naturally implements priority: the first matching condition wins
    - The `else` clause at the end prevents latch inference
    - Both `code` and `valid` are assigned on every path
    - Only `req` is in the sensitivity list since it is the only input
    - This is a combinational process (no clock) that synthesizes to priority logic gates

---

### Problem 12
Explain the role of the sensitivity list in a VHDL process. Show what happens when a signal is accidentally omitted from the sensitivity list.

!!! success "Solution"
    **The sensitivity list** determines when a process "wakes up" and re-evaluates. A process suspends after executing its last statement and resumes only when a signal in the sensitivity list changes.

    **Rules for sensitivity lists:**

    | Process Type | Sensitivity List Should Contain |
    |--------------|-------------------------------|
    | Combinational | All signals read inside the process |
    | Clocked (sync reset) | Clock signal only |
    | Clocked (async reset) | Clock and asynchronous reset |

    **Example of correct combinational process:**

    ```vhdl
    process(a, b, sel)       -- all inputs listed
    begin
        if sel = '1' then
            y <= a;
        else
            y <= b;
        end if;
    end process;
    ```

    **Example with missing signal:**

    ```vhdl
    process(sel)             -- OOPS: a and b missing!
    begin
        if sel = '1' then
            y <= a;
        else
            y <= b;
        end if;
    end process;
    ```

    **Simulation vs. synthesis mismatch:**

    - **In simulation:** The process only re-evaluates when `sel` changes. If `a` or `b` change while `sel` is constant, `y` does **not** update. This is incorrect MUX behavior.
    - **In synthesis:** The synthesizer ignores the sensitivity list and creates a combinational MUX that responds to `a`, `b`, and `sel`. The output `y` updates whenever any input changes.

    **Result:** Simulation and synthesis behave differently, which is a serious verification problem.

    **Timing example showing the bug:**

    ```
    Time:    0   10   20   30   40   50
    sel:     1    1    1    0    0    0
    a:       0    1    0    1    0    1
    b:       1    0    1    0    1    0

    y (correct):   0    1    0    0    1    0
    y (buggy sim): 0    0    0    0    0    0
                        ^-- missed! a changed but process didn't wake up
    ```

    **VHDL-2008 solution:** Use `process(all)` to automatically include all read signals:

    ```vhdl
    process(all)             -- includes a, b, sel automatically
    begin
        if sel = '1' then
            y <= a;
        else
            y <= b;
        end if;
    end process;
    ```

---

## Section D: Sequential Logic in VHDL (4 problems)

### Problem 13
Write a VHDL description of a D flip-flop with synchronous reset and clock enable. Explain how the synthesizer maps this to hardware.

!!! success "Solution"
    **D flip-flop with synchronous reset and clock enable:**

    ```vhdl
    library IEEE;
    use IEEE.STD_LOGIC_1164.ALL;

    entity dff_sr_ce is
        port (
            clk    : in  std_logic;
            rst    : in  std_logic;   -- synchronous reset
            ce     : in  std_logic;   -- clock enable
            d      : in  std_logic;
            q      : out std_logic
        );
    end entity dff_sr_ce;

    architecture behavioral of dff_sr_ce is
    begin
        process(clk)
        begin
            if rising_edge(clk) then
                if rst = '1' then
                    q <= '0';          -- synchronous reset
                elsif ce = '1' then
                    q <= d;            -- load when enabled
                end if;
                -- when rst='0' and ce='0', q holds (register inferred)
            end if;
        end process;
    end architecture behavioral;
    ```

    **Synthesis inference:**

    The synthesizer recognizes the `rising_edge(clk)` pattern and maps it to a D flip-flop:

    ```
              ┌──────────────────────────┐
              │        Priority MUX      │
    rst ──────┤ rst=1 → '0'             │
    ce ───────┤ ce=1  → d        ───[D FF]── q
    d ────────┤ else  → q (hold)        │
              └──────────────────────────┘
                                    ↑
    clk ────────────────────────────┘
    ```

    **Key synthesis patterns:**

    | VHDL Pattern | Inferred Hardware |
    |-------------|-------------------|
    | `if rising_edge(clk)` | Positive-edge flip-flop |
    | `if falling_edge(clk)` | Negative-edge flip-flop |
    | Synchronous reset inside `rising_edge` | MUX before D input |
    | Async reset outside `rising_edge` | Flip-flop with asynchronous clear |
    | No assignment on some path inside clock | Register hold (enable logic) |

    **Contrast with asynchronous reset:**

    ```vhdl
    process(clk, rst)            -- rst in sensitivity list
    begin
        if rst = '1' then        -- checked BEFORE clock edge
            q <= '0';
        elsif rising_edge(clk) then
            if ce = '1' then
                q <= d;
            end if;
        end if;
    end process;
    ```

    Asynchronous reset is independent of the clock and uses the flip-flop's built-in clear pin.

---

### Problem 14
Write VHDL for a 4-bit binary up counter with synchronous reset and terminal count output. The terminal count `tc` should be `'1'` when the counter reaches its maximum value (15).

!!! success "Solution"
    **4-bit binary up counter:**

    ```vhdl
    library IEEE;
    use IEEE.STD_LOGIC_1164.ALL;
    use IEEE.NUMERIC_STD.ALL;

    entity counter4 is
        port (
            clk  : in  std_logic;
            rst  : in  std_logic;     -- synchronous reset
            en   : in  std_logic;     -- count enable
            q    : out std_logic_vector(3 downto 0);
            tc   : out std_logic      -- terminal count
        );
    end entity counter4;

    architecture behavioral of counter4 is
        signal count : unsigned(3 downto 0);
    begin
        process(clk)
        begin
            if rising_edge(clk) then
                if rst = '1' then
                    count <= (others => '0');
                elsif en = '1' then
                    count <= count + 1;
                end if;
            end if;
        end process;

        q  <= std_logic_vector(count);
        tc <= '1' when count = 15 else '0';
    end architecture behavioral;
    ```

    **Key points:**

    - `IEEE.NUMERIC_STD.ALL` provides the `unsigned` type and arithmetic operators
    - The internal signal `count` is `unsigned` for arithmetic; the output `q` is `std_logic_vector` for compatibility
    - `std_logic_vector(count)` converts from `unsigned` to `std_logic_vector`
    - `count + 1` automatically wraps from 1111 to 0000 (4-bit unsigned overflow)
    - `tc` is a concurrent assignment outside the process (combinational output)

    **Timing diagram:**

    ```
    clk:  _|^|_|^|_|^|_|^|_|^|_|^|_
    rst:  1  0  0  0  0  0  0  0  0
    en:   0  1  1  1  1  1  1  1  1
    q:    0  0  1  2  3  4 ... 14  15  0
    tc:   0  0  0  0  0  0      0   1  0
    ```

    **Synthesis result:** The synthesizer creates 4 flip-flops with incrementer logic (chain of XOR gates and AND gates for carry propagation), plus a 4-input AND gate for terminal count detection ($tc = Q_3 \cdot Q_2 \cdot Q_1 \cdot Q_0$).

---

### Problem 15
Write VHDL for a Moore finite state machine that detects the sequence "110" on a serial input. Use enumerated types for states and include asynchronous reset.

!!! success "Solution"
    **Moore FSM for "110" detector:**

    ```vhdl
    library IEEE;
    use IEEE.STD_LOGIC_1164.ALL;

    entity seq_detect_110 is
        port (
            clk   : in  std_logic;
            rst   : in  std_logic;     -- asynchronous reset
            din   : in  std_logic;     -- serial input
            det   : out std_logic      -- detection output
        );
    end entity seq_detect_110;

    architecture behavioral of seq_detect_110 is
        type state_type is (S0, S1, S11, S110);
        signal current_state, next_state : state_type;
    begin

        -- State register (sequential process)
        state_reg: process(clk, rst)
        begin
            if rst = '1' then
                current_state <= S0;
            elsif rising_edge(clk) then
                current_state <= next_state;
            end if;
        end process state_reg;

        -- Next-state logic (combinational process)
        next_logic: process(current_state, din)
        begin
            case current_state is
                when S0 =>
                    if din = '1' then
                        next_state <= S1;
                    else
                        next_state <= S0;
                    end if;

                when S1 =>
                    if din = '1' then
                        next_state <= S11;
                    else
                        next_state <= S0;
                    end if;

                when S11 =>
                    if din = '0' then
                        next_state <= S110;
                    else
                        next_state <= S11;   -- stay (still have "1")
                    end if;

                when S110 =>
                    if din = '1' then
                        next_state <= S1;    -- overlap: "0" then "1"
                    else
                        next_state <= S0;
                    end if;
            end case;
        end process next_logic;

        -- Output logic (Moore: depends only on state)
        det <= '1' when current_state = S110 else '0';

    end architecture behavioral;
    ```

    **State diagram:**

    ```
    [S0] --1--> [S1] --1--> [S11] --0--> [S110]
     ^   <--0--  |    <--0--  |  |   --1-->  |
     |           |            |  ^           |
     |           v            | (1)          |
     +------0----+            +--+     0/1---+
     |                                  |
     +<---------0---------<-------------+
                          1 --> S1
    ```

    **State table:**

    | Current State | din=0 | din=1 | Output (det) |
    |---------------|-------|-------|--------------|
    | S0 | S0 | S1 | 0 |
    | S1 | S0 | S11 | 0 |
    | S11 | S110 | S11 | 0 |
    | S110 | S0 | S1 | 1 |

    **Key design patterns:**

    - **Two-process style:** Separates sequential (state register) from combinational (next-state logic)
    - **Enumerated type** (`state_type`): Lets the synthesizer choose optimal state encoding (binary, one-hot, etc.)
    - **Moore output:** `det` depends only on `current_state`, so it is glitch-free and synchronized to the clock
    - **Overlapping detection:** From S110, input `'1'` goes to S1 (the last "0" cannot start "110", but the new "1" can)

---

### Problem 16
Write VHDL for an 8-bit shift register with parallel load, serial input, and bidirectional shift capability. Include a mode select input.

!!! success "Solution"
    **8-bit universal shift register:**

    ```vhdl
    library IEEE;
    use IEEE.STD_LOGIC_1164.ALL;

    entity shift_reg8 is
        port (
            clk     : in  std_logic;
            rst     : in  std_logic;
            mode    : in  std_logic_vector(1 downto 0);
            si_left : in  std_logic;       -- serial input for shift left
            si_right: in  std_logic;       -- serial input for shift right
            d_in    : in  std_logic_vector(7 downto 0);  -- parallel load data
            q       : out std_logic_vector(7 downto 0)
        );
    end entity shift_reg8;

    architecture behavioral of shift_reg8 is
        signal reg : std_logic_vector(7 downto 0);
    begin
        process(clk, rst)
        begin
            if rst = '1' then
                reg <= (others => '0');
            elsif rising_edge(clk) then
                case mode is
                    when "00" =>
                        null;                          -- hold
                    when "01" =>
                        reg <= si_right & reg(7 downto 1);  -- shift right
                    when "10" =>
                        reg <= reg(6 downto 0) & si_left;   -- shift left
                    when "11" =>
                        reg <= d_in;                   -- parallel load
                    when others =>
                        null;
                end case;
            end if;
        end process;

        q <= reg;
    end architecture behavioral;
    ```

    **Mode table:**

    | mode | Operation | Description |
    |------|-----------|-------------|
    | "00" | Hold | Register retains value |
    | "01" | Shift right | MSB gets `si_right`, bits shift toward LSB |
    | "10" | Shift left | LSB gets `si_left`, bits shift toward MSB |
    | "11" | Parallel load | All bits loaded from `d_in` |

    **Shift operations explained:**

    For shift right (`mode = "01"`), with `reg = "ABCDEFGH"` and `si_right = 'S'`:

    ```
    Before: A B C D E F G H
    After:  S A B C D E F G     (H is shifted out)
    ```

    VHDL: `si_right & reg(7 downto 1)` concatenates the serial input with the upper 7 bits.

    For shift left (`mode = "10"`), with `reg = "ABCDEFGH"` and `si_left = 'S'`:

    ```
    Before: A B C D E F G H
    After:  B C D E F G H S     (A is shifted out)
    ```

    VHDL: `reg(6 downto 0) & si_left` concatenates the lower 7 bits with the serial input.

    **Key VHDL features used:**

    - `&` is the concatenation operator
    - `null` is a no-operation statement (used for "hold" mode)
    - `when others` covers the remaining `std_logic_vector` values beyond "00" through "11"

---

## Section E: Testbenches and Synthesis (4 problems)

### Problem 17
Write a VHDL testbench for the D flip-flop from Problem 13. Include clock generation, reset stimulus, and verification of synchronous reset behavior.

!!! success "Solution"
    **Testbench for D flip-flop:**

    ```vhdl
    library IEEE;
    use IEEE.STD_LOGIC_1164.ALL;

    entity dff_sr_ce_tb is
        -- testbench has no ports
    end entity dff_sr_ce_tb;

    architecture sim of dff_sr_ce_tb is
        -- Component declaration
        component dff_sr_ce is
            port (
                clk : in  std_logic;
                rst : in  std_logic;
                ce  : in  std_logic;
                d   : in  std_logic;
                q   : out std_logic
            );
        end component;

        -- Testbench signals
        signal clk_tb : std_logic := '0';
        signal rst_tb : std_logic := '0';
        signal ce_tb  : std_logic := '0';
        signal d_tb   : std_logic := '0';
        signal q_tb   : std_logic;

        constant CLK_PERIOD : time := 10 ns;
    begin

        -- Instantiate the Unit Under Test (UUT)
        UUT: dff_sr_ce port map (
            clk => clk_tb,
            rst => rst_tb,
            ce  => ce_tb,
            d   => d_tb,
            q   => q_tb
        );

        -- Clock generation (non-synthesizable)
        clk_proc: process
        begin
            clk_tb <= '0';
            wait for CLK_PERIOD / 2;
            clk_tb <= '1';
            wait for CLK_PERIOD / 2;
        end process clk_proc;

        -- Stimulus process
        stim_proc: process
        begin
            -- Initialize
            rst_tb <= '1'; ce_tb <= '0'; d_tb <= '0';
            wait for 2 * CLK_PERIOD;

            -- Release reset
            rst_tb <= '0';
            wait for CLK_PERIOD;

            -- Test 1: CE=0, data should not load
            ce_tb <= '0'; d_tb <= '1';
            wait for CLK_PERIOD;
            assert q_tb = '0'
                report "FAIL: Q should remain 0 when CE=0"
                severity error;

            -- Test 2: CE=1, data should load
            ce_tb <= '1'; d_tb <= '1';
            wait for CLK_PERIOD;
            assert q_tb = '1'
                report "FAIL: Q should be 1 after loading d=1"
                severity error;

            -- Test 3: CE=1, load 0
            d_tb <= '0';
            wait for CLK_PERIOD;
            assert q_tb = '0'
                report "FAIL: Q should be 0 after loading d=0"
                severity error;

            -- Test 4: Synchronous reset while CE=1
            d_tb <= '1';
            wait for CLK_PERIOD;      -- q should become 1
            rst_tb <= '1';
            wait for CLK_PERIOD;      -- sync reset clears q
            assert q_tb = '0'
                report "FAIL: Q should be 0 after synchronous reset"
                severity error;

            -- Test complete
            rst_tb <= '0'; ce_tb <= '0';
            report "All tests passed!" severity note;
            wait;   -- stop simulation
        end process stim_proc;

    end architecture sim;
    ```

    **Testbench structure:**

    ```
    ┌─────────────────────────────┐
    │        Testbench            │
    │                             │
    │  clk_proc ──> clk_tb ──┐   │
    │                         │   │
    │  stim_proc ─> rst_tb ──┼──[UUT]──> q_tb
    │              > ce_tb  ──┤   │
    │              > d_tb   ──┘   │
    │                             │
    │  assert statements          │
    └─────────────────────────────┘
    ```

    **Key testbench features:**

    - **No ports** on the testbench entity (it is a self-contained simulation)
    - **Clock generation** uses `wait for` (non-synthesizable) in a process with no sensitivity list
    - **`assert` statements** check expected output values and report errors
    - **`wait;`** at the end stops the stimulus process (clock keeps running but no more changes)
    - **Signal initialization** (`'0'`) in declarations prevents `'U'` at time 0

---

### Problem 18
Identify whether each of the following VHDL constructs is synthesizable or non-synthesizable, and explain why.

1. `wait for 10 ns;`
2. `rising_edge(clk)`
3. `assert (count < 10) report "overflow" severity error;`
4. `for i in 0 to 7 loop`
5. `while count > 0 loop`
6. `after 5 ns`

!!! success "Solution"
    | # | Construct | Synthesizable? | Explanation |
    |---|-----------|---------------|-------------|
    | 1 | `wait for 10 ns;` | **No** | Absolute time delays have no hardware equivalent. Time is a simulation concept; real hardware does not have a "wait 10 ns" element. Used only in testbenches. |
    | 2 | `rising_edge(clk)` | **Yes** | Recognized synthesis pattern for clock edge detection. Maps to the clock input of a flip-flop. |
    | 3 | `assert ... report ... severity` | **No** | Assertion checking is a simulation/verification construct. Hardware does not print messages. Synthesis tools ignore `assert` statements. |
    | 4 | `for i in 0 to 7 loop` | **Yes** | A `for` loop with static (compile-time known) bounds is synthesizable. It is unrolled into replicated hardware. `for i in 0 to 7` creates 8 copies of the loop body. |
    | 5 | `while count > 0 loop` | **No** | A `while` loop with a data-dependent termination condition is not synthesizable because the number of hardware copies cannot be determined at compile time. (Note: `while` with static bounds may be accepted by some tools.) |
    | 6 | `after 5 ns` | **No** | The `after` clause specifies signal delay for simulation. Example: `y <= a after 5 ns;` assigns `a` to `y` with a 5 ns delay. Synthesis tools ignore the delay and treat it as `y <= a;`. |

    **General rule:** Constructs that require knowledge of physical time or runtime conditions are non-synthesizable. Constructs that describe static structure or have compile-time deterministic behavior are synthesizable.

    **Additional non-synthesizable constructs:**

    - File I/O (`file_open`, `read`, `write`)
    - `now` function (returns simulation time)
    - Initial values on signals (ignored by most FPGA synthesis tools, though some support them)
    - `wait until` with time expressions

---

### Problem 19
The following VHDL code is intended to describe a combinational circuit, but it infers latches. Identify all the latches and rewrite the code to be purely combinational.

```vhdl
process(a, b, c, sel)
begin
    case sel is
        when "00" =>
            x <= a;
            y <= b;
        when "01" =>
            x <= b;
        when "10" =>
            y <= c;
        when others =>
            x <= '0';
            y <= '0';
    end case;
end process;
```

!!! success "Solution"
    **Latch analysis:**

    Checking which signals are assigned in each branch:

    | Branch | `x` assigned? | `y` assigned? |
    |--------|--------------|--------------|
    | "00" | Yes | Yes |
    | "01" | Yes | **No** -- latch for `y` |
    | "10" | **No** -- latch for `x` | Yes |
    | others | Yes | Yes |

    **Latches inferred:**

    - **`y`** has a latch because it is not assigned when `sel = "01"`. The synthesizer must remember the previous value of `y`.
    - **`x`** has a latch because it is not assigned when `sel = "10"`. The synthesizer must remember the previous value of `x`.

    **Fix 1: Assign defaults before the `case` statement:**

    ```vhdl
    process(a, b, c, sel)
    begin
        -- Default assignments prevent latches
        x <= '0';
        y <= '0';

        case sel is
            when "00" =>
                x <= a;
                y <= b;
            when "01" =>
                x <= b;
                -- y keeps default '0'
            when "10" =>
                y <= c;
                -- x keeps default '0'
            when others =>
                x <= '0';
                y <= '0';
        end case;
    end process;
    ```

    **Fix 2: Complete every branch:**

    ```vhdl
    process(a, b, c, sel)
    begin
        case sel is
            when "00" =>
                x <= a;
                y <= b;
            when "01" =>
                x <= b;
                y <= '0';      -- added
            when "10" =>
                x <= '0';      -- added
                y <= c;
            when others =>
                x <= '0';
                y <= '0';
        end case;
    end process;
    ```

    **Best practice:** Always assign default values to all outputs at the top of a combinational process. This guarantees no latches regardless of how complex the logic becomes:

    ```vhdl
    process(all)   -- VHDL-2008: all signals in sensitivity list
    begin
        -- Defaults
        x <= '0';
        y <= '0';
        z <= '0';

        -- Only override what changes
        case sel is
            when "00" => x <= a;
            when "01" => y <= b;
            when others => null;
        end case;
    end process;
    ```

---

### Problem 20
A designer writes the following VHDL for what they intend to be a flip-flop with enable. Explain what actually gets synthesized and write the corrected version.

```vhdl
process(clk, en, d)
begin
    if en = '1' then
        if rising_edge(clk) then
            q <= d;
        end if;
    end if;
end process;
```

!!! success "Solution"
    **What the designer intended:** A D flip-flop that only loads when `en = '1'`.

    **What actually gets synthesized:** This code is problematic because the `rising_edge(clk)` check is nested inside the `en` check. Most synthesis tools will either:

    1. **Generate a warning** and treat `en` as a clock gate (gated clock), creating:

    ```
    en ──[AND]──> gated_clk ──> [D FF] ──> q
    clk ─┘                  d ──┘
    ```

    2. **Infer a latch** for some synthesis tools, because when `en = '0'`, no assignment occurs and `q` must retain its value.

    **Problems with gated clocks:**

    - Clock skew between gated and ungated flip-flops
    - Glitches on the `en` signal can create false clock edges
    - Timing analysis becomes more complex
    - May not work reliably on FPGAs

    **Corrected version (enable inside clock edge):**

    ```vhdl
    process(clk)
    begin
        if rising_edge(clk) then
            if en = '1' then
                q <= d;
            end if;
        end if;
    end process;
    ```

    **This synthesizes correctly to:**

    ```
              ┌──────────┐
    en ───────┤ 2:1 MUX  ├──D──[D FF]── q
    d ────────┤           │       ↑
    q(feedback)┤          │       │
              └──────────┘   clk─┘
    ```

    When `en = '1'`: D input gets `d` (new data loaded on clock edge).
    When `en = '0'`: D input gets `q` feedback (value held).

    **The critical rule:** The `rising_edge(clk)` or `falling_edge(clk)` check must be the **outermost** condition in the process (after an optional asynchronous reset check). All synchronous logic (including enables, resets, and data paths) goes **inside** the clock edge check.

    **Correct template for clocked process:**

    ```vhdl
    process(clk, async_rst)        -- only clk (and async_rst if used)
    begin
        if async_rst = '1' then    -- optional async reset (outermost)
            q <= '0';
        elsif rising_edge(clk) then  -- clock edge
            if sync_rst = '1' then   -- sync reset inside clock
                q <= '0';
            elsif en = '1' then      -- enable inside clock
                q <= d;
            end if;
        end if;
    end process;
    ```

---

## Summary

| Section | Topics Covered | Problem Count |
|---------|---------------|---------------|
| A | Entity and Architecture | 4 |
| B | Concurrent Statements and Dataflow | 4 |
| C | Process Statements and Behavioral Modeling | 4 |
| D | Sequential Logic in VHDL | 4 |
| E | Testbenches and Synthesis | 4 |
| **Total** | | **20** |
