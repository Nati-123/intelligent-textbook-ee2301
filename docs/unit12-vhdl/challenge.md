---
title: Unit 12 Challenge - Introduction to VHDL
description: Challenge problems for VHDL — answers only, no solutions
---

<div class="problems-styled" markdown>

# Challenge Problems: Introduction to VHDL

These challenge problems test deeper understanding. Only final answers are provided — work through each problem on your own.

---

#### Challenge 1: Complete Entity-Architecture for a 4-bit ALU

Design a complete VHDL entity and architecture for a 4-bit ALU that supports the following operations based on a 3-bit operation select input `op`:

| op | Operation | Description |
|----|-----------|-------------|
| "000" | ADD | $R = A + B$ |
| "001" | SUB | $R = A - B$ |
| "010" | AND | $R = A \text{ AND } B$ |
| "011" | OR | $R = A \text{ OR } B$ |
| "100" | XOR | $R = A \text{ XOR } B$ |
| "101" | NOT | $R = \text{NOT } A$ |
| "110" | SHL | $R = A$ shifted left by 1 (zero fill) |
| "111" | SHR | $R = A$ shifted right by 1 (zero fill) |

The ALU should also produce a `zero` flag (`'1'` when $R = 0$) and a `carry` flag for ADD/SUB operations.

**Answer:** ```vhdl
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.NUMERIC_STD.ALL;

entity alu_4bit is
    port (
        A, B   : in  std_logic_vector(3 downto 0);
        op     : in  std_logic_vector(2 downto 0);
        R      : out std_logic_vector(3 downto 0);
        zero   : out std_logic;
        carry  : out std_logic
    );
end entity alu_4bit;

architecture behavioral of alu_4bit is
    signal result  : std_logic_vector(3 downto 0);
    signal sum_ext : unsigned(4 downto 0);  -- 5 bits for carry
begin
    process(A, B, op)
    begin
        carry <= '0';  -- default
        case op is
            when "000" =>  -- ADD
                sum_ext <= ('0' & unsigned(A)) + ('0' & unsigned(B));
                result  <= std_logic_vector(sum_ext(3 downto 0));
                carry   <= sum_ext(4);
            when "001" =>  -- SUB
                sum_ext <= ('0' & unsigned(A)) - ('0' & unsigned(B));
                result  <= std_logic_vector(sum_ext(3 downto 0));
                carry   <= sum_ext(4);  -- borrow
            when "010" =>  -- AND
                result <= A and B;
            when "011" =>  -- OR
                result <= A or B;
            when "100" =>  -- XOR
                result <= A xor B;
            when "101" =>  -- NOT A
                result <= not A;
            when "110" =>  -- SHL
                result <= A(2 downto 0) & '0';
            when "111" =>  -- SHR
                result <= '0' & A(3 downto 1);
            when others =>
                result <= "0000";
        end case;
    end process;

    R    <= result;
    zero <= '1' when result = "0000" else '0';
end architecture behavioral;
```

**Key design points:**

- Uses `unsigned` from `IEEE.NUMERIC_STD` for arithmetic; bitwise operations work directly on `std_logic_vector`
- 5-bit `sum_ext` captures carry/borrow from ADD/SUB
- Shift left: `A(2 downto 0) & '0'` drops MSB, fills LSB with zero
- Shift right: `'0' & A(3 downto 1)` drops LSB, fills MSB with zero
- `zero` flag is a concurrent combinational assignment outside the process
- All paths assign `result`, so no latches are inferred
- Default `carry <= '0'` prevents latch on carry for non-arithmetic operations

---

#### Challenge 2: Identifying and Fixing Unintended Latch Inference

The following VHDL code is intended to implement a combinational address decoder for a memory-mapped I/O system. Identify every inferred latch, explain why each occurs, and provide the corrected code.

```vhdl
process(addr, data_in, wr_en)
begin
    case addr is
        when "00" =>
            if wr_en = '1' then
                reg0 <= data_in;
            end if;
        when "01" =>
            reg1 <= data_in;
            status <= '1';
        when "10" =>
            reg2 <= data_in;
        when others =>
            null;
    end case;
end process;
```

**Answer:** **Latches inferred (5 total):**

| Signal | Latch in branch | Reason |
|--------|----------------|--------|
| `reg0` | "01", "10", `others` | Not assigned when `addr /= "00"` |
| `reg0` | "00" when `wr_en = '0'` | No `else` clause in `if wr_en` |
| `reg1` | "00", "10", `others` | Not assigned when `addr /= "01"` |
| `reg2` | "00", "01", `others` | Not assigned when `addr /= "10"` |
| `status` | "00", "10", `others` | Not assigned when `addr /= "01"` |

Every signal that is not assigned in every possible execution path infers a latch.

**Additional design issue:** This is written as a combinational process, but a memory-mapped register write should be **clocked** (sequential). Combinational assignment to `reg0`/`reg1`/`reg2` creates transparent latches, not proper registers.

**Corrected code (clocked register writes):**

```vhdl
process(clk, rst)
begin
    if rst = '1' then
        reg0   <= (others => '0');
        reg1   <= (others => '0');
        reg2   <= (others => '0');
        status <= '0';
    elsif rising_edge(clk) then
        status <= '0';  -- default: clear status each cycle
        if wr_en = '1' then
            case addr is
                when "00" =>
                    reg0 <= data_in;
                when "01" =>
                    reg1 <= data_in;
                    status <= '1';
                when "10" =>
                    reg2 <= data_in;
                when others =>
                    null;
            end case;
        end if;
    end if;
end process;
```

In this corrected version, `reg0`, `reg1`, `reg2`, and `status` are proper flip-flops (inferred from `rising_edge(clk)`). Signals not assigned on a given clock edge simply retain their value, which is correct behavior for a register -- not a latch.

---

#### Challenge 3: Moore FSM in VHDL with State Encoding

Design a Moore FSM in VHDL for a vending machine controller with these specifications:

- Accepts nickels ($N$) and dimes ($D$) on separate single-bit inputs
- Item costs 15 cents
- Output `dispense = '1'` when 15 cents or more has been deposited
- Output `change = '1'` when overpayment occurs (20 cents deposited)
- Returns to idle after dispensing

Use explicit state encoding with `constant` declarations (not the default enumerated type encoding). Use 3-bit one-hot-like encoding.

**Answer:** **States and encoding:**

| State | Meaning | Encoding (2 downto 0) |
|-------|---------|----------------------|
| S0 | 0 cents | "000" |
| S5 | 5 cents | "001" |
| S10 | 10 cents | "010" |
| S15 | 15 cents (dispense) | "011" |
| S20 | 20 cents (dispense + change) | "100" |

```vhdl
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity vending_fsm is
    port (
        clk      : in  std_logic;
        rst      : in  std_logic;
        N        : in  std_logic;   -- nickel inserted
        D        : in  std_logic;   -- dime inserted
        dispense : out std_logic;
        change   : out std_logic
    );
end entity vending_fsm;

architecture behavioral of vending_fsm is
    -- Explicit state encoding
    constant S0  : std_logic_vector(2 downto 0) := "000";
    constant S5  : std_logic_vector(2 downto 0) := "001";
    constant S10 : std_logic_vector(2 downto 0) := "010";
    constant S15 : std_logic_vector(2 downto 0) := "011";
    constant S20 : std_logic_vector(2 downto 0) := "100";

    signal state, next_state : std_logic_vector(2 downto 0);
begin

    -- State register
    process(clk, rst)
    begin
        if rst = '1' then
            state <= S0;
        elsif rising_edge(clk) then
            state <= next_state;
        end if;
    end process;

    -- Next-state logic
    process(state, N, D)
    begin
        next_state <= state;  -- default: hold
        case state is
            when S0 =>
                if N = '1' then    next_state <= S5;
                elsif D = '1' then next_state <= S10;
                end if;
            when S5 =>
                if N = '1' then    next_state <= S10;
                elsif D = '1' then next_state <= S15;
                end if;
            when S10 =>
                if N = '1' then    next_state <= S15;
                elsif D = '1' then next_state <= S20;
                end if;
            when S15 =>
                next_state <= S0;  -- dispense and return to idle
            when S20 =>
                next_state <= S0;  -- dispense, give change, return
            when others =>
                next_state <= S0;
        end case;
    end process;

    -- Moore outputs (depend only on state)
    dispense <= '1' when (state = S15 or state = S20) else '0';
    change   <= '1' when (state = S20) else '0';

end architecture behavioral;
```

**State transition table:**

| Current | N=0, D=0 | N=1 | D=1 | dispense | change |
|---------|----------|-----|-----|----------|--------|
| S0 (0c) | S0 | S5 | S10 | 0 | 0 |
| S5 (5c) | S5 | S10 | S15 | 0 | 0 |
| S10 (10c) | S10 | S15 | S20 | 0 | 0 |
| S15 (15c) | S0 | S0 | S0 | 1 | 0 |
| S20 (20c) | S0 | S0 | S0 | 1 | 1 |

The explicit encoding using `constant` declarations forces the synthesizer to use the specified bit patterns instead of choosing its own encoding. The `next_state <= state` default at the top of the combinational process prevents latches.

---

#### Challenge 4: Structural Modeling with Component Instantiation

Write a structural VHDL architecture for a 4-bit carry-lookahead adder (CLA). Use component instantiation for the partial full adder (PFA) cells and the carry-lookahead logic (CLL) block. Show all generate ($G_i$) and propagate ($P_i$) signals and the carry equations.

The carry-lookahead equations are:

- $G_i = A_i \cdot B_i$
- $P_i = A_i \oplus B_i$
- $C_1 = G_0 + P_0 \cdot C_0$
- $C_2 = G_1 + P_1 \cdot G_0 + P_1 \cdot P_0 \cdot C_0$
- $C_3 = G_2 + P_2 \cdot G_1 + P_2 \cdot P_1 \cdot G_0 + P_2 \cdot P_1 \cdot P_0 \cdot C_0$
- $C_4 = G_3 + P_3 \cdot G_2 + P_3 \cdot P_2 \cdot G_1 + P_3 \cdot P_2 \cdot P_1 \cdot G_0 + P_3 \cdot P_2 \cdot P_1 \cdot P_0 \cdot C_0$

**Answer:** ```vhdl
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

-- Partial Full Adder: generates P, G, and Sum (needs external carry)
entity pfa is
    port (
        a, b, cin : in  std_logic;
        p, g, s   : out std_logic
    );
end entity pfa;

architecture dataflow of pfa is
begin
    p <= a xor b;
    g <= a and b;
    s <= a xor b xor cin;
end architecture dataflow;

-- Carry Lookahead Logic
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity cll is
    port (
        p    : in  std_logic_vector(3 downto 0);
        g    : in  std_logic_vector(3 downto 0);
        c0   : in  std_logic;
        c    : out std_logic_vector(4 downto 1)
    );
end entity cll;

architecture dataflow of cll is
begin
    c(1) <= g(0) or (p(0) and c0);
    c(2) <= g(1) or (p(1) and g(0))
                 or (p(1) and p(0) and c0);
    c(3) <= g(2) or (p(2) and g(1))
                 or (p(2) and p(1) and g(0))
                 or (p(2) and p(1) and p(0) and c0);
    c(4) <= g(3) or (p(3) and g(2))
                 or (p(3) and p(2) and g(1))
                 or (p(3) and p(2) and p(1) and g(0))
                 or (p(3) and p(2) and p(1) and p(0) and c0);
end architecture dataflow;

-- 4-bit CLA (structural top level)
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;

entity cla_adder4 is
    port (
        A, B  : in  std_logic_vector(3 downto 0);
        cin   : in  std_logic;
        S     : out std_logic_vector(3 downto 0);
        cout  : out std_logic
    );
end entity cla_adder4;

architecture structural of cla_adder4 is
    component pfa is
        port (a, b, cin : in std_logic; p, g, s : out std_logic);
    end component;

    component cll is
        port (
            p  : in  std_logic_vector(3 downto 0);
            g  : in  std_logic_vector(3 downto 0);
            c0 : in  std_logic;
            c  : out std_logic_vector(4 downto 1)
        );
    end component;

    signal P, G    : std_logic_vector(3 downto 0);
    signal C       : std_logic_vector(4 downto 0);
begin
    C(0) <= cin;

    -- Generate 4 PFA cells
    gen_pfa: for i in 0 to 3 generate
        PFA_i: pfa port map (
            a   => A(i),
            b   => B(i),
            cin => C(i),
            p   => P(i),
            g   => G(i),
            s   => S(i)
        );
    end generate gen_pfa;

    -- Carry lookahead logic block
    CLL_inst: cll port map (
        p  => P,
        g  => G,
        c0 => cin,
        c  => C(4 downto 1)
    );

    cout <= C(4);
end architecture structural;
```

**Architecture diagram:**

```
A(3..0) ──┬──┬──┬──┐
B(3..0) ──┼──┼──┼──┼──┐
          │  │  │  │  │
        [PFA3][PFA2][PFA1][PFA0]
          │ │  │ │  │ │  │ │
         G3 P3 G2 P2 G1 P1 G0 P0
          │ │  │ │  │ │  │ │
          └─┴──┴─┴──┴─┴──┴─┴──> [CLL] <── cin
                                   │
          C4  C3  C2  C1 <─────────┘
          │   │   │   │
        [PFA3][PFA2][PFA1][PFA0]  (carry inputs)
          │    │    │    │
         S3   S2   S1   S0
```

The CLA computes all carries in parallel (2 gate delays for carry) versus the ripple adder's $2n$ gate delays. The structural style explicitly shows the component hierarchy and interconnections.

---

#### Challenge 5: Testbench with Self-Checking Assertions

Write a self-checking VHDL testbench for a 4-bit binary counter (counts 0 to 15 and wraps). The testbench should:

- Generate a clock and reset
- Verify the counter counts through all 16 states
- Use `assert` statements to automatically check every output value
- Report pass/fail status
- Stop simulation after the test completes

**Answer:** ```vhdl
library IEEE;
use IEEE.STD_LOGIC_1164.ALL;
use IEEE.NUMERIC_STD.ALL;

entity counter4_tb is
end entity counter4_tb;

architecture sim of counter4_tb is
    component counter4 is
        port (
            clk : in  std_logic;
            rst : in  std_logic;
            en  : in  std_logic;
            q   : out std_logic_vector(3 downto 0);
            tc  : out std_logic
        );
    end component;

    signal clk_tb  : std_logic := '0';
    signal rst_tb  : std_logic := '1';
    signal en_tb   : std_logic := '0';
    signal q_tb    : std_logic_vector(3 downto 0);
    signal tc_tb   : std_logic;

    constant CLK_PERIOD : time := 10 ns;
    signal sim_done     : boolean := false;
    signal error_count  : integer := 0;
begin

    UUT: counter4 port map (
        clk => clk_tb, rst => rst_tb, en => en_tb,
        q => q_tb, tc => tc_tb
    );

    -- Clock: stops when sim_done
    clk_proc: process
    begin
        if sim_done then wait; end if;
        clk_tb <= '0'; wait for CLK_PERIOD / 2;
        clk_tb <= '1'; wait for CLK_PERIOD / 2;
    end process;

    -- Stimulus and checking
    stim_proc: process
        variable expected : unsigned(3 downto 0);
        variable errors   : integer := 0;
    begin
        -- Reset
        rst_tb <= '1'; en_tb <= '0';
        wait for 2 * CLK_PERIOD;
        wait until rising_edge(clk_tb);
        wait for 1 ns;  -- check after clock edge settles

        assert q_tb = "0000"
            report "FAIL: counter not zero after reset"
            severity error;

        -- Release reset, enable counting
        rst_tb <= '0'; en_tb <= '1';

        -- Verify count 0 through 15
        for i in 0 to 15 loop
            expected := to_unsigned(i, 4);
            wait until rising_edge(clk_tb);
            wait for 1 ns;

            assert q_tb = std_logic_vector(expected)
                report "FAIL at count " & integer'image(i) &
                       ": expected " & integer'image(i) &
                       " got " & integer'image(to_integer(unsigned(q_tb)))
                severity error;

            if i = 15 then
                assert tc_tb = '1'
                    report "FAIL: tc should be 1 at count 15"
                    severity error;
            else
                assert tc_tb = '0'
                    report "FAIL: tc should be 0 at count " &
                           integer'image(i)
                    severity error;
            end if;
        end loop;

        -- Verify wrap-around to 0
        wait until rising_edge(clk_tb);
        wait for 1 ns;
        assert q_tb = "0000"
            report "FAIL: counter did not wrap to 0"
            severity error;

        -- Test enable: disable and verify hold
        en_tb <= '0';
        wait until rising_edge(clk_tb);
        wait for 1 ns;
        assert q_tb = "0000"
            report "FAIL: counter should hold when en=0"
            severity error;

        report "Testbench complete." severity note;
        sim_done <= true;
        wait;
    end process;

end architecture sim;
```

**Testbench features:**

- **Self-checking:** `assert` statements verify every count value automatically with no manual waveform inspection required
- **Error reporting:** Descriptive failure messages include the expected and actual values using `integer'image()` for string conversion
- **Wrap-around verification:** Confirms counter goes from 15 back to 0
- **Terminal count check:** Verifies `tc = '1'` only at count 15 and `tc = '0'` at all other counts
- **Enable test:** Verifies counter holds when `en = '0'`
- **Clean termination:** `sim_done` flag stops the clock process; `wait;` stops the stimulus process
- **Setup/hold margin:** `wait for 1 ns` after clock edge allows outputs to settle before checking
- **Non-synthesizable constructs used:** `wait for`, `wait until`, `assert...report`, `severity`, `integer'image()` -- all are valid for testbenches

</div>

