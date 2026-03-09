# Contributing to Intelligent Textbook — EE 2301

Thank you for your interest in contributing to this digital systems design textbook!

## How to Contribute

### Reporting Issues

Found a typo, incorrect solution, or broken MicroSim? Please [open an issue](https://github.com/Nati-123/intelligent-textbook-ee2301/issues) with:

- **Location**: Unit number, section, and problem/challenge number
- **Description**: What's wrong and what the correct content should be
- **Screenshots**: If the issue is visual (rendering, layout)

### Suggesting Improvements

Ideas for new content, MicroSims, or better explanations are welcome. Open an issue tagged `enhancement` describing:

- Which unit or topic the improvement targets
- What the current gap is
- Your proposed solution

### Submitting Changes

1. **Fork** the repository
2. **Create a branch** from `main`:
   ```bash
   git checkout -b fix/unit5-kmap-typo
   ```
3. **Make your changes** — follow the existing formatting conventions:
   - HTML-styled cards with purple headers (`#5A3EED`)
   - Green solution boxes (`#E7F7E7` background, `#81C784` border)
   - Yellow challenge boxes (`#FFF7DD` background, `#F0D87A` border)
   - MathJax via `<span class="arithmatex">\(...\)</span>` or `$$...$$`
4. **Test locally**:
   ```bash
   pip install mkdocs mkdocs-material pymdown-extensions
   mkdocs serve
   ```
5. **Submit a Pull Request** with a clear description of changes

### Content Guidelines

- **Accuracy**: All solutions must be mathematically verified
- **Clarity**: Write for sophomore-level EE students
- **Consistency**: Match the formatting of existing units
- **No work-in-progress notes**: Remove "recalculate", "verify", "wait" comments
- **Complete solutions**: Every problem needs a finished, clean answer

### MicroSim Contributions

MicroSims use p5.js and live in `docs/sims/<sim-name>/`:

- `index.md` — MkDocs documentation page with embedded iframe
- `main.html` — Standalone HTML file with the simulation
- Responsive design (works on desktop and mobile)
- Clear parameter labels and controls

## Code of Conduct

Be respectful, constructive, and focused on improving educational content. This is an academic project — accuracy and clarity matter most.

## Questions?

Open a [GitHub issue](https://github.com/Nati-123/intelligent-textbook-ee2301/issues) or reach out via the repository.
