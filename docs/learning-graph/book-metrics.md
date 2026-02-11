# Book Metrics

This file contains overall metrics for the intelligent textbook.

| Metric Name | Value | Link | Notes |
|-------------|-------|------|-------|
| Units | 13 | - | Number of unit directories |
| Concepts | 200 | [Concept List](./concept-list.md) | Concepts from learning graph |
| Glossary Terms | 225 | [Glossary](../glossary.md) | Defined terms |
| FAQs | 63 | [FAQ](../faq.md) | Frequently asked questions |
| Quiz Questions | 130 | - | Questions across all units |
| Diagrams | 96 | - | Level 4 headers starting with '#### Diagram:' |
| Equations | 3,554 | - | LaTeX expressions (inline and display) |
| MicroSims | 79 | [Simulations](../sims/index.md) | Interactive MicroSims |
| Total Words | 169,140 | - | Words in all markdown files |
| Links | 306 | - | Hyperlinks in markdown format |
| Equivalent Pages | 740 | - | Estimated pages (250 words/page + visuals) |

## Metrics Explanation

- **Units**: Count of unit directories containing index.md files
- **Concepts**: Number of rows in learning-graph.csv
- **Glossary Terms**: H4 headers in glossary.md
- **FAQs**: H3 headers in faq.md
- **Quiz Questions**: Numbered question headers in quiz.md files across all units
- **Diagrams**: H4 headers starting with '#### Diagram:'
- **Equations**: LaTeX expressions using $ and $$ delimiters
- **MicroSims**: Directories in docs/sims/ with index.md files
- **Total Words**: All words in markdown files (excluding code blocks and URLs)
- **Links**: Markdown-formatted links `[text](url)`
- **Equivalent Pages**: Based on 250 words/page + 0.25 page/diagram + 0.5 page/MicroSim
