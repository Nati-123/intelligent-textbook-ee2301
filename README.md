# Intelligent Textbook: Digital System Design (EE 2301)

[![GitHub Pages](https://img.shields.io/badge/Live%20Site-GitHub%20Pages-brightgreen?logo=github)](https://Nati-123.github.io/intelligent-textbook-ee2301/)
[![MkDocs](https://img.shields.io/badge/Made%20with-MkDocs-526CFE?logo=materialformkdocs)](https://www.mkdocs.org/)
[![Material for MkDocs](https://img.shields.io/badge/Material%20for%20MkDocs-526CFE?logo=materialformkdocs)](https://squidfunk.github.io/mkdocs-material/)
[![p5.js](https://img.shields.io/badge/MicroSims-p5.js-ED225D?logo=p5dotjs)](https://p5js.org/)
[![Claude Code](https://img.shields.io/badge/Built%20with-Claude%20Code-DA7857?logo=anthropic)](https://claude.ai/code)
[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

---

**Senior Design Project | University of Minnesota - Twin Cities | Department of Electrical & Computer Engineering**

**Live Site:** [https://Nati-123.github.io/intelligent-textbook-ee2301/](https://Nati-123.github.io/intelligent-textbook-ee2301/)

---

## Overview

This is an AI-assisted intelligent interactive textbook for **EE 2301: Introduction to Digital System Design**. Built using MkDocs with the Material theme, this textbook provides modern, accessible learning materials for sophomore and junior-level Electrical and Computer Engineering students.

The textbook leverages Claude Code to generate structured, consistent, and copyright-safe educational content including:

- Original, student-friendly explanations of digital logic concepts
- Step-by-step derivations and worked examples
- Visual learning aids (logic diagrams, truth tables, K-maps)
- Interactive MicroSims for hands-on learning
- MathJax-powered mathematical notation
- Structured content aligned with Bloom's Taxonomy learning outcomes
- Comprehensive quizzes with detailed explanations

## Site Metrics

| Metric | Value | Description |
|--------|-------|-------------|
| Units | 6 | Complete course chapters |
| Concepts | 225 | Concepts in learning graph |
| Glossary Terms | 225 | ISO 11179 compliant definitions |
| Quiz Questions | 60 | 10 questions per unit |
| Diagrams | 37 | Visual learning aids |
| Equations | 821 | LaTeX mathematical expressions |
| MicroSims | 5 | Interactive p5.js simulations |
| Total Words | 51,775 | Comprehensive content |
| Equivalent Pages | 218 | Based on 250 words/page |

## Units Covered

| Unit | Topic | Key Concepts |
|------|-------|--------------|
| 1 | Number Systems | Binary, octal, hexadecimal, two's complement, sign extension |
| 2 | Boolean Algebra | Logic operators, DeMorgan's theorems, universal gates |
| 3 | Applications of Boolean Algebra | Adders, subtractors, comparators, decoders |
| 4 | Minterm & Maxterm Expansions | Canonical forms, SOP/POS, cofactors |
| 5 | Karnaugh Maps | K-map simplification, prime implicants, don't cares |
| 6 | Quine-McCluskey Method | Algorithmic minimization, PI charts, Petrick's method |

## Interactive MicroSims

The textbook includes 5 interactive MicroSims built with p5.js and Chart.js:

| MicroSim | Description |
|----------|-------------|
| QM Grouping Visualization | Visualize grouping minterms by number of 1s |
| QM Combination Simulator | Step through the combination process |
| PI Chart Interactive | Build and solve prime implicant charts |
| QM Complexity Chart | Compare algorithmic complexity vs K-maps |
| QM Complete Walkthrough | Full Quine-McCluskey algorithm demonstration |

## Learning Resources

- **Learning Graph:** 225 interconnected concepts with dependencies
- **Glossary:** Comprehensive definitions following ISO 11179 standards
- **Quizzes:** Multiple-choice assessments with Bloom's Taxonomy distribution
- **Book Metrics:** Detailed analytics and quality reports

## Getting Started

### View Online

Visit the live site: [https://Nati-123.github.io/intelligent-textbook-ee2301/](https://Nati-123.github.io/intelligent-textbook-ee2301/)

### Clone and Run Locally

```bash
# Clone the repository
git clone https://github.com/Nati-123/intelligent-textbook-ee2301.git
cd intelligent-textbook-ee2301

# Create virtual environment
python3 -m venv .venv
source .venv/bin/activate

# Install dependencies
pip install mkdocs mkdocs-material pymdown-extensions

# Serve locally (with live reload)
mkdocs serve
```

Open your browser to `http://localhost:8000`

### Deploy to GitHub Pages

```bash
mkdocs gh-deploy --force
```

## Repository Structure

```
intelligent-textbook-ee2301/
├── docs/                              # MkDocs documentation source
│   ├── index.md                       # Homepage
│   ├── course-description.md          # Course info and learning outcomes
│   ├── glossary.md                    # 225 term glossary
│   ├── javascripts/
│   │   └── mathjax.js                 # MathJax configuration
│   ├── unit1-number-systems/
│   │   ├── index.md                   # Number systems content
│   │   └── quiz.md                    # Unit 1 quiz
│   ├── unit2-boolean-algebra/
│   │   ├── index.md                   # Boolean algebra content
│   │   └── quiz.md                    # Unit 2 quiz
│   ├── unit3-applications-boolean-algebra/
│   │   ├── index.md                   # Boolean applications content
│   │   └── quiz.md                    # Unit 3 quiz
│   ├── unit4-minterm-maxterm-expansions/
│   │   ├── index.md                   # SOP/POS forms content
│   │   └── quiz.md                    # Unit 4 quiz
│   ├── unit5-karnaugh-maps/
│   │   ├── index.md                   # K-map content
│   │   └── quiz.md                    # Unit 5 quiz
│   ├── unit6-quine-mccluskey/
│   │   ├── index.md                   # Quine-McCluskey content
│   │   └── quiz.md                    # Unit 6 quiz
│   ├── learning-graph/
│   │   ├── concept-list.md            # 225 concepts
│   │   ├── book-metrics.md            # Overall metrics
│   │   └── quiz-generation-report.md  # Quiz quality report
│   └── sims/                          # Interactive MicroSims
│       ├── index.md                   # MicroSims overview
│       ├── qm-grouping-visualization/
│       ├── qm-combination-simulator/
│       ├── pi-chart-interactive/
│       ├── qm-complexity-chart/
│       └── qm-complete-walkthrough/
├── logs/                              # Generation session logs
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

## Quality Standards

- **Content:** AI-generated with human oversight, aligned with university curriculum
- **Glossary:** ISO 11179 metadata registry standards (precise, concise, distinct)
- **Quizzes:** Bloom's Taxonomy distribution (Remember, Understand, Apply, Analyze)
- **MicroSims:** Interactive p5.js simulations with responsive design

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

- Share - copy and redistribute the material
- Adapt - remix, transform, and build upon the material

**Under the following terms:**

- **Attribution** - Give appropriate credit with a link to the original
- **NonCommercial** - No commercial use without permission
- **ShareAlike** - Distribute contributions under the same license

## Acknowledgements

This project is built on the shoulders of giants in the open source community:

- **[MkDocs](https://www.mkdocs.org/)** - Static site generator optimized for project documentation
- **[Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)** - Beautiful, responsive theme
- **[MathJax](https://www.mathjax.org/)** - Beautiful math rendering in any browser
- **[p5.js](https://p5js.org/)** - JavaScript library for creative coding and MicroSims
- **[Chart.js](https://www.chartjs.org/)** - Simple yet flexible JavaScript charting
- **[Claude AI](https://claude.ai)** by Anthropic - AI-assisted content generation
- **[GitHub Pages](https://pages.github.com/)** - Free hosting for open source projects

Special thanks to the University of Minnesota Department of Electrical & Computer Engineering and the educators who contribute to making educational resources accessible and interactive.

## Contact

**Project Repository:** [github.com/Nati-123/intelligent-textbook-ee2301](https://github.com/Nati-123/intelligent-textbook-ee2301)

**Live Site:** [Nati-123.github.io/intelligent-textbook-ee2301](https://Nati-123.github.io/intelligent-textbook-ee2301/)

Questions, suggestions, or collaboration opportunities? Feel free to open an issue on GitHub.
