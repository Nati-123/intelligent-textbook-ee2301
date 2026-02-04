<h1 align="center">Intelligent Textbook for EE Students — Digital System Design</h1>

<p align="center">
  <img src="https://img.shields.io/github/repo-size/Nati-123/intelligent-textbook-ee2301?color=blue" alt="Repo Size">
  <img src="https://img.shields.io/badge/last%20commit-today-brightgreen" alt="Last Commit">
  <img src="https://img.shields.io/badge/Project-EE%20Student%20Project-purple" alt="Project Type">
  <img src="https://img.shields.io/badge/Made%20With-MkDocs-blue" alt="Made With">
</p>

---

Senior Design Project • University of Minnesota – Twin Cities
Department of Electrical & Computer Engineering

---

## Project Overview

This project aims to create an AI-assisted intelligent interactive textbook for the course:

**Introduction to Digital System Design**

The goal is to build a modern, accessible textbook that uses AI tools (Claude Code) to provide:

- Original, student-friendly explanations
- Step-by-step derivations of key concepts
- Worked examples with solutions
- Visual learning aids (logic diagrams, truth tables, K-maps, etc.)
- Auto-generated practice problems
- Instant interactive solutions
- Adaptive learning features powered by Claude Code

---

## Quick Start

```bash
# Install MkDocs and dependencies
pip install mkdocs mkdocs-material pymdown-extensions

# Serve locally
mkdocs serve

# Build static site
mkdocs build
```

---

## Project Structure

```
intelligent-textbook-ee2301/
├── docs/
│   ├── index.md
│   ├── javascripts/
│   │   └── mathjax.js
│   ├── unit1-number-systems/
│   │   └── index.md
│   ├── unit2-boolean-algebra/
│   │   └── index.md
│   ├── unit3-applications-boolean-algebra/
│   │   └── index.md
│   ├── unit4-minterm-maxterm-expansions/
│   │   └── index.md
│   └── unit5-karnaugh-maps/
│       └── index.md
├── mkdocs.yml
└── README.md
```

---

## Units Covered

- **Unit 1 — Number Systems**
- **Unit 2 — Boolean Algebra**
- **Unit 3 — Applications of Boolean Algebra**
- **Unit 4 — Minterm & Maxterm Expansions (SOP/POS)**
- **Unit 5 — Karnaugh Maps**

---

## Planned Additions

- Unit 6: Quine–McCluskey Method
- Unit 7: Multi-Level Gate Circuits (NAND/NOR)
- Auto-generated quizzes
- Interactive circuit visualizations
- Practice exam generator
- Step-by-step logic minimization animations (Claude Code)

---

## License

This project is for educational purposes.
