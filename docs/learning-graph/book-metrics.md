# Book Metrics

This file contains overall metrics for the intelligent textbook.

| Metric Name | Value | Link | Notes |
|-------------|-------|------|-------|
| Units | 6 | [Home](../index.md) | Number of unit chapters |
| Concepts | 225 | [Concept List](./concept-list.md) | Concepts from learning graph |
| Glossary Terms | 225 | [Glossary](../glossary.md) | Defined terms |
| FAQs | - | - | Not yet created |
| Quiz Questions | 60 | - | Questions across all units (10 per unit) |
| Diagrams | 37 | - | Level 4 headers starting with '#### Diagram:' |
| Equations | 821 | - | LaTeX expressions (inline and display) |
| MicroSims | 5 | [Simulations](../sims/index.md) | Interactive MicroSims |
| Total Words | 51,775 | - | Words in all markdown files |
| Links | 29 | - | Hyperlinks in markdown format |
| Equivalent Pages | 218 | - | Estimated pages (250 words/page + visuals) |

## Metrics Explanation

- **Units**: Count of unit directories containing index.md files
- **Concepts**: Number of rows in learning-graph.csv
- **Glossary Terms**: H4 headers in glossary.md
- **FAQs**: H3 headers in faq.md
- **Quiz Questions**: H4 headers with numbered questions (e.g., '#### 1.') or H2 headers in quiz.md files
- **Diagrams**: H4 headers starting with '#### Diagram:'
- **Equations**: LaTeX expressions using $ and $$ delimiters
- **MicroSims**: Directories in docs/sims/ with index.md files
- **Total Words**: All words in markdown files (excluding code blocks and URLs)
- **Links**: Markdown-formatted links `[text](url)`
- **Equivalent Pages**: Based on 250 words/page + 0.25 page/diagram + 0.5 page/MicroSim
