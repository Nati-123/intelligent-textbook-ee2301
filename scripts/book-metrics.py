#!/usr/bin/env python3
"""
Book Metrics Generator — adapted for unit-based textbook structure.
Generates book-metrics.md and chapter-metrics.md for docs/unit*/ layout.
"""

import os
import re
import csv
from pathlib import Path
from typing import Dict, List, Tuple, Any


class BookMetricsGenerator:
    def __init__(self, docs_dir: str = "docs"):
        self.docs_dir = Path(docs_dir)
        self.learning_graph_dir = self.docs_dir / "learning-graph"
        self.sims_dir = self.docs_dir / "sims"
        self.glossary_file = self.docs_dir / "glossary.md"
        self.faq_file = self.docs_dir / "faq.md"

    def count_units(self) -> Tuple[int, List[Dict[str, Any]]]:
        units = []
        for item in sorted(self.docs_dir.iterdir(), key=lambda x: int(re.search(r'\d+', x.name).group()) if re.search(r'\d+', x.name) else 0):
            if item.is_dir() and item.name.startswith("unit") and (item / "index.md").exists():
                match = re.match(r'unit(\d+)', item.name)
                if match:
                    unit_num = int(match.group(1))
                    title = self._extract_title(item / "index.md")
                    units.append({
                        'number': unit_num,
                        'name': title,
                        'path': item,
                        'index_file': item / "index.md"
                    })
        return len(units), units

    def _extract_title(self, markdown_file: Path) -> str:
        try:
            with open(markdown_file, 'r', encoding='utf-8') as f:
                content = f.read()
                # Check YAML front matter title first
                fm = re.match(r'^---\s*\n(.*?)\n---', content, re.DOTALL)
                if fm:
                    tm = re.search(r'^title:\s*(.+)$', fm.group(1), re.MULTILINE)
                    if tm:
                        return tm.group(1).strip().strip('"').strip("'")
                # Fall back to first H1
                h1 = re.search(r'^#\s+(.+)$', content, re.MULTILINE)
                if h1:
                    return h1.group(1)
        except Exception:
            pass
        return markdown_file.parent.name

    def count_concepts(self) -> int:
        csv_file = self.learning_graph_dir / "learning-graph.csv"
        if not csv_file.exists():
            return 0
        try:
            with open(csv_file, 'r', encoding='utf-8') as f:
                return sum(1 for _ in csv.DictReader(f))
        except Exception:
            return 0

    def count_glossary_terms(self) -> int:
        if not self.glossary_file.exists():
            return 0
        try:
            with open(self.glossary_file, 'r', encoding='utf-8') as f:
                content = f.read()
                return len(re.findall(r'^####\s+', content, re.MULTILINE))
        except Exception:
            return 0

    def count_faqs(self) -> int:
        if not self.faq_file.exists():
            return 0
        try:
            with open(self.faq_file, 'r', encoding='utf-8') as f:
                content = f.read()
                return len(re.findall(r'^###\s+', content, re.MULTILINE))
        except Exception:
            return 0

    def count_quiz_questions(self) -> int:
        total = 0
        for item in self.docs_dir.iterdir():
            if item.is_dir() and item.name.startswith("unit"):
                quiz_file = item / "quiz.md"
                if quiz_file.exists():
                    total += self._count_quiz_in_file(quiz_file)
        return total

    def _count_quiz_in_file(self, quiz_file: Path) -> int:
        try:
            with open(quiz_file, 'r', encoding='utf-8') as f:
                content = f.read()
                # Count question patterns like "Question 1" or "#### 1."
                q1 = len(re.findall(r'^####\s+\d+\.', content, re.MULTILINE))
                # Count styled question divs
                q2 = len(re.findall(r'Question\s+\d+', content))
                return max(q1, q2)
        except Exception:
            return 0

    def count_diagrams_in_file(self, markdown_file: Path) -> int:
        try:
            with open(markdown_file, 'r', encoding='utf-8') as f:
                content = f.read()
                return len(re.findall(r'^####\s+Diagram:', content, re.MULTILINE))
        except Exception:
            return 0

    def count_all_diagrams(self) -> int:
        total = 0
        for md_file in self.docs_dir.rglob('*.md'):
            total += self.count_diagrams_in_file(md_file)
        return total

    def count_equations_in_file(self, markdown_file: Path) -> int:
        try:
            with open(markdown_file, 'r', encoding='utf-8') as f:
                content = f.read()
                # Count display math first, then remove to avoid double-counting
                display = len(re.findall(r'\$\$[^$]+\$\$', content))
                content_no_display = re.sub(r'\$\$[^$]+\$\$', '', content)
                # Count arithmatex spans
                arithmatex = len(re.findall(r'class="arithmatex"', content_no_display))
                # Count remaining inline math
                inline = len(re.findall(r'(?<!\$)\$(?!\$)[^$\n]+\$(?!\$)', content_no_display))
                return display + inline + arithmatex
        except Exception:
            return 0

    def count_all_equations(self) -> int:
        total = 0
        for md_file in self.docs_dir.rglob('*.md'):
            total += self.count_equations_in_file(md_file)
        return total

    def count_microsims(self) -> int:
        if not self.sims_dir.exists():
            return 0
        count = 0
        for item in self.sims_dir.iterdir():
            if item.is_dir() and item.name not in ('__pycache__',) and not item.name.endswith('.js'):
                count += 1
        return count

    def count_words_in_file(self, markdown_file: Path) -> int:
        try:
            with open(markdown_file, 'r', encoding='utf-8') as f:
                content = f.read()
                content = re.sub(r'```.*?```', '', content, flags=re.DOTALL)
                content = re.sub(r'`[^`]+`', '', content)
                content = re.sub(r'https?://\S+', '', content)
                content = re.sub(r'<[^>]+>', '', content)  # strip HTML tags
                return len(re.findall(r'\b\w+\b', content))
        except Exception:
            return 0

    def count_total_words(self) -> int:
        total = 0
        for md_file in self.docs_dir.rglob('*.md'):
            # Skip sims directory for word count
            if 'sims' in md_file.parts:
                continue
            total += self.count_words_in_file(md_file)
        return total

    def count_links_in_file(self, markdown_file: Path) -> int:
        try:
            with open(markdown_file, 'r', encoding='utf-8') as f:
                content = f.read()
                return len(re.findall(r'\[([^\]]+)\]\(([^)]+)\)', content))
        except Exception:
            return 0

    def count_all_links(self) -> int:
        total = 0
        for md_file in self.docs_dir.rglob('*.md'):
            total += self.count_links_in_file(md_file)
        return total

    def count_problems(self) -> int:
        total = 0
        for item in self.docs_dir.iterdir():
            if item.is_dir() and item.name.startswith("unit"):
                pf = item / "problems.md"
                if pf.exists():
                    try:
                        with open(pf, 'r', encoding='utf-8') as f:
                            content = f.read()
                            total += len(re.findall(r'Problem\s+\d+', content))
                    except Exception:
                        pass
        return total

    def count_challenges(self) -> int:
        total = 0
        for item in self.docs_dir.iterdir():
            if item.is_dir() and item.name.startswith("unit"):
                cf = item / "challenge.md"
                if cf.exists():
                    try:
                        with open(cf, 'r', encoding='utf-8') as f:
                            content = f.read()
                            total += len(re.findall(r'Challenge\s+\d+', content))
                    except Exception:
                        pass
        return total

    def calculate_equivalent_pages(self, total_words, diagrams, microsims):
        return int(total_words / 250 + diagrams * 0.25 + microsims * 0.5)

    def count_sections_in_file(self, markdown_file: Path) -> int:
        try:
            with open(markdown_file, 'r', encoding='utf-8') as f:
                content = f.read()
                md_h2 = len(re.findall(r'^##\s+', content, re.MULTILINE))
                md_h3 = len(re.findall(r'^###\s+', content, re.MULTILINE))
                html_h2 = len(re.findall(r'<h2[^>]*>', content, re.IGNORECASE))
                html_h3 = len(re.findall(r'<h3[^>]*>', content, re.IGNORECASE))
                return md_h2 + md_h3 + html_h2 + html_h3
        except Exception:
            return 0

    def get_unit_metrics(self, unit: Dict[str, Any]) -> Dict[str, Any]:
        unit_dir = unit['path']
        sections = self.count_sections_in_file(unit['index_file'])
        diagrams = 0
        words = 0
        equations = 0
        quiz_q = 0
        problems = 0
        challenges = 0

        for md_file in unit_dir.rglob('*.md'):
            diagrams += self.count_diagrams_in_file(md_file)
            words += self.count_words_in_file(md_file)
            equations += self.count_equations_in_file(md_file)

        quiz_file = unit_dir / "quiz.md"
        if quiz_file.exists():
            quiz_q = self._count_quiz_in_file(quiz_file)

        pf = unit_dir / "problems.md"
        if pf.exists():
            try:
                with open(pf, 'r', encoding='utf-8') as f:
                    content = f.read()
                    problems = len(re.findall(r'Problem\s+\d+', content))
            except Exception:
                pass

        cf = unit_dir / "challenge.md"
        if cf.exists():
            try:
                with open(cf, 'r', encoding='utf-8') as f:
                    content = f.read()
                    challenges = len(re.findall(r'Challenge\s+\d+', content))
            except Exception:
                pass

        has_glossary = (unit_dir / "glossary.md").exists()
        has_refs = (unit_dir / "references.md").exists()

        return {
            'number': unit['number'],
            'name': unit['name'],
            'sections': sections,
            'diagrams': diagrams,
            'words': words,
            'equations': equations,
            'quiz_questions': quiz_q,
            'problems': problems,
            'challenges': challenges,
            'has_glossary': has_glossary,
            'has_refs': has_refs,
        }

    def generate_book_metrics_md(self) -> str:
        unit_count, units = self.count_units()
        concepts = self.count_concepts()
        glossary_terms = self.count_glossary_terms()
        faqs = self.count_faqs()
        quiz_questions = self.count_quiz_questions()
        diagrams = self.count_all_diagrams()
        equations = self.count_all_equations()
        microsims = self.count_microsims()
        total_words = self.count_total_words()
        links = self.count_all_links()
        problems = self.count_problems()
        challenges = self.count_challenges()
        equivalent_pages = self.calculate_equivalent_pages(total_words, diagrams, microsims)

        md = "# Book Metrics\n\n"
        md += "Overall statistics for *Intelligent Textbook — Digital System Design (EE 2301)*.\n\n"
        md += "| Metric | Value | Notes |\n"
        md += "|--------|------:|-------|\n"
        md += f"| Units | {unit_count} | Content chapters |\n"
        md += f"| Concepts | {concepts} | From learning graph |\n"
        md += f"| Glossary Terms | {glossary_terms} | Defined in glossary.md |\n"
        md += f"| FAQs | {faqs} | In faq.md |\n"
        md += f"| Problems | {problems} | Practice problems across all units |\n"
        md += f"| Challenge Problems | {challenges} | Advanced challenges across all units |\n"
        md += f"| Quiz Questions | {quiz_questions} | Multiple-choice across all units |\n"
        md += f"| Diagrams | {diagrams} | H4 headers starting with 'Diagram:' |\n"
        md += f"| Equations | {equations:,} | LaTeX and arithmatex expressions |\n"
        md += f"| MicroSims | {microsims} | Interactive simulations |\n"
        md += f"| Total Words | {total_words:,} | Excluding code blocks, URLs, HTML |\n"
        md += f"| Links | {links:,} | Markdown hyperlinks |\n"
        md += f"| Equivalent Pages | {equivalent_pages} | Est. at 250 words/page + visuals |\n"

        return md

    def generate_chapter_metrics_md(self) -> str:
        unit_count, units = self.count_units()
        if unit_count == 0:
            return "# Chapter Metrics\n\nNo units found.\n"

        md = "# Unit Metrics\n\n"
        md += "Per-unit breakdown of content metrics.\n\n"
        md += "| Unit | Name | Sections | Words | Equations | Problems | Challenges | Quiz Q | Glossary | Refs |\n"
        md += "|-----:|------|----------|------:|----------:|---------:|-----------:|-------:|:--------:|:----:|\n"

        totals = {'sections': 0, 'words': 0, 'equations': 0, 'problems': 0,
                  'challenges': 0, 'quiz_questions': 0}

        for unit in units:
            m = self.get_unit_metrics(unit)
            unit_dir_name = unit['path'].name
            name_link = f"[{m['name']}](../{unit_dir_name}/index.md)"
            glossary_icon = "Y" if m['has_glossary'] else "-"
            refs_icon = "Y" if m['has_refs'] else "-"
            md += (f"| {m['number']} | {name_link} | {m['sections']} | {m['words']:,} | "
                   f"{m['equations']:,} | {m['problems']} | {m['challenges']} | "
                   f"{m['quiz_questions']} | {glossary_icon} | {refs_icon} |\n")
            for k in totals:
                totals[k] += m[k]

        md += (f"| | **Totals** | **{totals['sections']}** | **{totals['words']:,}** | "
               f"**{totals['equations']:,}** | **{totals['problems']}** | **{totals['challenges']}** | "
               f"**{totals['quiz_questions']}** | | |\n")

        return md

    def generate_metrics(self):
        output_dir = self.learning_graph_dir
        output_dir.mkdir(parents=True, exist_ok=True)

        book_content = self.generate_book_metrics_md()
        book_file = output_dir / "book-metrics.md"
        with open(book_file, 'w', encoding='utf-8') as f:
            f.write(book_content)
        print(f"Generated {book_file}")

        chapter_content = self.generate_chapter_metrics_md()
        chapter_file = output_dir / "chapter-metrics.md"
        with open(chapter_file, 'w', encoding='utf-8') as f:
            f.write(chapter_content)
        print(f"Generated {chapter_file}")


if __name__ == "__main__":
    import sys
    docs_dir = sys.argv[1] if len(sys.argv) > 1 else "docs"
    if not Path(docs_dir).exists():
        print(f"Error: '{docs_dir}' does not exist")
        sys.exit(1)
    generator = BookMetricsGenerator(docs_dir)
    generator.generate_metrics()
    print("\nDone!")
