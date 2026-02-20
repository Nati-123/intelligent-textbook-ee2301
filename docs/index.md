---
title: Cover
hide:
  - navigation
  - toc
  - footer
---

<style>
/* Cover-page-only refinements — scoped to .cover-page selectors */

/* 1. Reduce hero vertical height/padding ~10-15% */
.md-typeset .cover-page { min-height: 80vh; }
.md-typeset .cover-content { padding: 2rem 2rem 1rem 2rem; }
.md-typeset .cover-stats { margin: 2rem 0 1.2rem 0; }
.md-typeset .cover-buttons { margin-top: 2rem; }

/* 2. Stronger subtitle — weight 500, slightly brighter */
.md-typeset .cover-page h2 {
  font-weight: 500;
  color: #90d8f4 !important;
}

/* 3. Bottom circuit artwork slightly more visible */
.md-typeset .cover-circuit-bottom .circuit-svg-alt { opacity: 0.73; }

/* 4. Subtle breathing glow on circuit artwork */
@keyframes circuit-glow {
  0%, 100% { filter: drop-shadow(0 0 2px rgba(0,191,255,.08)) brightness(1.06); }
  50%      { filter: drop-shadow(0 0 8px rgba(0,191,255,.22)) brightness(1.12); }
}
@keyframes circuit-glow-bottom {
  0%, 100% { filter: drop-shadow(0 0 2px rgba(0,191,255,.06)); }
  50%      { filter: drop-shadow(0 0 6px rgba(0,191,255,.18)); }
}
.md-typeset .cover-circuit .circuit-svg {
  animation: circuit-glow 5s ease-in-out infinite;
}
.md-typeset .cover-circuit-bottom .circuit-svg-alt {
  animation: circuit-glow-bottom 5s ease-in-out infinite;
}
@media (prefers-reduced-motion: reduce) {
  .md-typeset .cover-circuit .circuit-svg {
    animation: none; filter: brightness(1.06);
  }
  .md-typeset .cover-circuit-bottom .circuit-svg-alt {
    animation: none;
  }
}

/* 5. Professional button hover — lift + soft glow */
.md-typeset .cover-buttons .md-button {
  transition: transform .25s ease, box-shadow .25s ease,
              background .25s ease, color .25s ease, border-color .25s ease;
}
.md-typeset .cover-buttons .md-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 18px rgba(0,191,255,.18);
}
.md-typeset .cover-buttons .md-button--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(0,191,255,.4);
}

/* Responsive: tighter padding on mobile */
@media (max-width: 768px) {
  .md-typeset .cover-content { padding: 1.2rem 1rem .8rem 1rem; }
}
</style>

<div class="cover-page" markdown>

<div class="cover-circuit">
  <img src="images/circuit-hero.svg" alt="Digital circuit schematic with logic gates, flip-flop, and multiplexer" class="circuit-svg">
</div>

<div class="cover-content" markdown>

# Digital System Design

## An Intelligent Interactive Textbook

**EE 2301 — Introduction to Digital System Design**

---

<p class="cover-institution">University of Minnesota — Twin Cities<br>Department of Electrical & Computer Engineering</p>

<p class="cover-description">An AI-assisted interactive textbook with 13 units, 106 MicroSims,<br>and 200+ practice problems covering the complete fundamentals of digital logic.</p>

<div class="cover-stats" markdown>

<div class="stat-item">
<div class="stat-number">13</div>
<div class="stat-label">Units</div>
</div>

<div class="stat-item">
<div class="stat-number">106</div>
<div class="stat-label">MicroSims</div>
</div>

<div class="stat-item">
<div class="stat-number">224K</div>
<div class="stat-label">Words</div>
</div>

<div class="stat-item">
<div class="stat-number">971</div>
<div class="stat-label">Pages</div>
</div>

</div>

<div class="cover-buttons" markdown>

[Enter Textbook :material-arrow-right:](home.md){ .md-button .md-button--primary }
[View MicroSims :material-play-box:](sims/index.md){ .md-button }
[Course Description :material-book-open-variant:](course-description.md){ .md-button }

</div>

</div>

<div class="cover-circuit cover-circuit-bottom">
  <img src="images/circuit-bottom.svg" alt="State machine, multiplexer, truth table, and decoder" class="circuit-svg-alt">
</div>

</div>
