# Intelligent Textbook: Digital System Design (EE 2301)

[![MkDocs](https://img.shields.io/badge/Made%20with-MkDocs-526CFE?logo=materialformkdocs)](https://www.mkdocs.org/)
[![Material for MkDocs](https://img.shields.io/badge/Material%20for%20MkDocs-526CFE?logo=materialformkdocs)](https://squidfunk.github.io/mkdocs-material/)
[![Claude Code](https://img.shields.io/badge/Built%20with-Claude%20Code-DA7857?logo=anthropic)](https://claude.ai/code)
[![GitHub](https://img.shields.io/badge/GitHub-Nati--123%2Fintelligent--textbook--ee2301-blue?logo=github)](https://github.com/Nati-123/intelligent-textbook-ee2301)
[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

---

**Senior Design Project | University of Minnesota - Twin Cities | Department of Electrical & Computer Engineering**

---

## Overview

This is an AI-assisted intelligent interactive textbook for **EE 2301: Introduction to Digital System Design**. Built using MkDocs with the Material theme, this textbook provides modern, accessible learning materials for sophomore and junior-level Electrical and Computer Engineering students.

The textbook leverages Claude Code to generate structured, consistent, and copyright-safe educational content including:

- Original, student-friendly explanations of digital logic concepts
- Step-by-step derivations and worked examples
- Visual learning aids (logic diagrams, truth tables, K-maps)
- MathJax-powered mathematical notation
- Structured content aligned with Bloom's Taxonomy learning outcomes

Whether you're a student seeking clearer explanations than traditional textbooks or an educator looking for supplementary course materials, this intelligent textbook provides comprehensive coverage of digital system design fundamentals.

## Site Status and Metrics

| Metric | Count |
|--------|-------|
| Units | 5 |
| Markdown Files | 7 |
| Total Words | ~1,844 |
| Topics Covered | 25+ |
| Learning Outcomes | 18 |

**Completion Status:** Content development phase - Units 1-5 complete, Units 6-7 planned

## Units Covered

| Unit | Topic | Description |
|------|-------|-------------|
| 1 | Number Systems | Decimal, binary, octal, hexadecimal, signed representations |
| 2 | Boolean Algebra | Logic operators, identities, DeMorgan's theorems |
| 3 | Applications of Boolean Algebra | Truth tables, adders, subtractors |
| 4 | Minterm & Maxterm Expansions | SOP/POS canonical forms, don't care conditions |
| 5 | Karnaugh Maps | K-map simplification, prime implicants |

### Planned Additions

- Unit 6: Quine-McCluskey Method
- Unit 7: Multi-Level Gate Circuits (NAND/NOR)
- Interactive circuit visualizations (MicroSims)
- Auto-generated quizzes with instant feedback
- Practice exam generator

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/Nati-123/intelligent-textbook-ee2301.git
cd intelligent-textbook-ee2301
```

### Install Dependencies

This project uses MkDocs with the Material theme:

```bash
pip install mkdocs mkdocs-material pymdown-extensions
```

### Build and Serve Locally

Serve locally for development (with live reload):

```bash
mkdocs serve
```

Open your browser to `http://localhost:8000`

Build the static site:

```bash
mkdocs build
```

### Deploy to GitHub Pages

```bash
mkdocs gh-deploy
```

This will build the site and push it to the `gh-pages` branch.

## Repository Structure

```
intelligent-textbook-ee2301/
├── docs/                              # MkDocs documentation source
│   ├── index.md                       # Homepage
│   ├── course-description.md          # Course info and learning outcomes
│   ├── javascripts/
│   │   └── mathjax.js                 # MathJax configuration
│   ├── unit1-number-systems/
│   │   └── index.md                   # Number systems content
│   ├── unit2-boolean-algebra/
│   │   └── index.md                   # Boolean algebra content
│   ├── unit3-applications-boolean-algebra/
│   │   └── index.md                   # Boolean applications content
│   ├── unit4-minterm-maxterm-expansions/
│   │   └── index.md                   # SOP/POS forms content
│   └── unit5-karnaugh-maps/
│       └── index.md                   # K-map content
├── mkdocs.yml                         # MkDocs configuration
└── README.md                          # This file
```

## Target Audience

This textbook is designed for:

- Sophomore and junior-level Electrical Engineering students
- Computer Engineering students
- Students pursuing minors in electronics or embedded systems
- Anyone seeking foundational knowledge in digital logic design

### Prerequisites

- Basic algebra and mathematical reasoning
- Introduction to programming (any language)
- Familiarity with basic circuit concepts (recommended but not required)

## Reporting Issues

Found a bug, typo, or have a suggestion for improvement? Please report it:

[GitHub Issues](https://github.com/Nati-123/intelligent-textbook-ee2301/issues)

When reporting issues, please include:

- Description of the problem or suggestion
- Location in the textbook (unit, section)
- Expected vs actual content (for errors)
- Screenshots (if applicable)

## License

This work is licensed under the [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-nc-sa/4.0/).

**You are free to:**

- Share — copy and redistribute the material
- Adapt — remix, transform, and build upon the material

**Under the following terms:**

- **Attribution** — Give appropriate credit with a link to the original
- **NonCommercial** — No commercial use without permission
- **ShareAlike** — Distribute contributions under the same license

## Acknowledgements

This project is built on the shoulders of giants in the open source community:

- **[MkDocs](https://www.mkdocs.org/)** - Static site generator optimized for project documentation
- **[Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)** - Beautiful, responsive theme
- **[MathJax](https://www.mathjax.org/)** - Beautiful math rendering in any browser
- **[Claude AI](https://claude.ai)** by Anthropic - AI-assisted content generation
- **[GitHub Pages](https://pages.github.com/)** - Free hosting for open source projects

Special thanks to the University of Minnesota Department of Electrical & Computer Engineering and the educators who contribute to making educational resources accessible and interactive.

## Contact

**Project Repository:** [github.com/Nati-123/intelligent-textbook-ee2301](https://github.com/Nati-123/intelligent-textbook-ee2301)

Questions, suggestions, or collaboration opportunities? Feel free to open an issue on GitHub.
