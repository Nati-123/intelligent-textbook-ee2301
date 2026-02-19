---
title: Digital Lock System
description: Complete digital lock with keypad, FSM controller, and lockout security
quality_score: 85
---
# Digital Lock System

<iframe src="main.html" height="800px" width="100%" scrolling="no" style="border:none;border-radius:8px;"></iframe>

## Description

This simulation implements a complete digital combination lock system. Enter the correct 4-digit code using the keypad. The FSM controller tracks input sequence, validates the code, counts failed attempts, and implements a lockout after 3 consecutive failures.

## Learning Objectives

**Bloom Level**: Create (L6)

- Synthesize a complete digital system from subsystems
- Implement FSM-based sequence detection with security features
- Design input validation with attempt counting
- Integrate keypad, controller, and display subsystems

## How to Use

1. Enter the **4-digit code** by clicking keypad buttons (default code: 1234)
2. Press **Enter** (E) to submit the code
3. If correct, the lock shows **UNLOCKED** (green)
4. After 3 wrong attempts, the system enters **LOCKOUT** for 10 seconds
5. Press **Clear** (C) to reset current input
6. Press **Reset** to restart the entire system

## References

- Unit 13: System Integration - Digital Lock Case Study
