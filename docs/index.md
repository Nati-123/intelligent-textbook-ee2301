---
title: Home
description: AI-assisted interactive textbook for EE 2301 - Introduction to Digital System Design
hide:
  - navigation
  - toc
---

<div class="cover-page" markdown>

<svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" class="cover-circuit">
  <!-- Background grid -->
  <defs>
    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="0.5"/>
    </pattern>
    <filter id="glow">
      <feGaussianBlur stdDeviation="2" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <rect width="800" height="500" fill="#0d1b2a" rx="12"/>
  <rect width="800" height="500" fill="url(#grid)" rx="12"/>

  <!-- Wires - input lines -->
  <g stroke-width="2.5" fill="none" stroke-linecap="round">
    <!-- Input A lines -->
    <line x1="40" y1="100" x2="130" y2="100" stroke="#00e5ff" filter="url(#glow)"/>
    <line x1="40" y1="140" x2="130" y2="140" stroke="#00e5ff" filter="url(#glow)"/>
    <!-- Input B lines -->
    <line x1="40" y1="230" x2="130" y2="230" stroke="#76ff03" filter="url(#glow)"/>
    <line x1="40" y1="270" x2="130" y2="270" stroke="#76ff03" filter="url(#glow)"/>
    <!-- Input C lines -->
    <line x1="40" y1="360" x2="130" y2="360" stroke="#ff9100" filter="url(#glow)"/>
    <line x1="40" y1="400" x2="130" y2="400" stroke="#ff9100" filter="url(#glow)"/>
  </g>

  <!-- Input labels -->
  <text x="25" y="105" fill="#00e5ff" font-family="monospace" font-size="14" text-anchor="end">A</text>
  <text x="25" y="145" fill="#00e5ff" font-family="monospace" font-size="14" text-anchor="end">B</text>
  <text x="25" y="235" fill="#76ff03" font-family="monospace" font-size="14" text-anchor="end">C</text>
  <text x="25" y="275" fill="#76ff03" font-family="monospace" font-size="14" text-anchor="end">D</text>
  <text x="25" y="365" fill="#ff9100" font-family="monospace" font-size="14" text-anchor="end">E</text>
  <text x="25" y="405" fill="#ff9100" font-family="monospace" font-size="14" text-anchor="end">F</text>

  <!-- AND Gate (top) -->
  <g transform="translate(130, 80)">
    <path d="M 0,0 L 40,0 C 80,0 80,60 40,60 L 0,60 Z" fill="#1a237e" stroke="#42a5f5" stroke-width="2.5"/>
    <text x="28" y="36" fill="#90caf9" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle">AND</text>
  </g>

  <!-- OR Gate (middle) -->
  <g transform="translate(130, 210)">
    <path d="M 0,0 C 15,0 15,60 0,60 C 40,60 70,50 80,30 C 70,10 40,0 0,0 Z" fill="#1b5e20" stroke="#66bb6a" stroke-width="2.5"/>
    <text x="32" y="36" fill="#a5d6a7" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle">OR</text>
  </g>

  <!-- NAND Gate (bottom) -->
  <g transform="translate(130, 340)">
    <path d="M 0,0 L 40,0 C 80,0 80,60 40,60 L 0,60 Z" fill="#bf360c" stroke="#ff7043" stroke-width="2.5"/>
    <circle cx="82" cy="30" r="6" fill="#0d1b2a" stroke="#ff7043" stroke-width="2"/>
    <text x="28" y="36" fill="#ffab91" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle">NAND</text>
  </g>

  <!-- Mid-stage wires -->
  <g stroke-width="2.5" fill="none" stroke-linecap="round">
    <!-- AND output -->
    <line x1="210" y1="110" x2="320" y2="160" stroke="#42a5f5" filter="url(#glow)"/>
    <!-- OR output -->
    <line x1="210" y1="240" x2="320" y2="190" stroke="#66bb6a" filter="url(#glow)"/>
    <!-- NAND output -->
    <line x1="220" y1="370" x2="320" y2="330" stroke="#ff7043" filter="url(#glow)"/>
    <!-- Extra wire to XOR -->
    <line x1="210" y1="110" x2="320" y2="310" stroke="rgba(66,165,245,0.3)" stroke-dasharray="4,4"/>
  </g>

  <!-- XOR Gate (mid-right lower) -->
  <g transform="translate(320, 290)">
    <path d="M 5,0 C 20,0 20,60 5,60 C 45,60 75,50 85,30 C 75,10 45,0 5,0 Z" fill="#4a148c" stroke="#ce93d8" stroke-width="2.5"/>
    <path d="M 0,0 C 15,0 15,60 0,60" fill="none" stroke="#ce93d8" stroke-width="2.5"/>
    <text x="38" y="36" fill="#e1bee7" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle">XOR</text>
  </g>

  <!-- NOR Gate (mid-right upper) -->
  <g transform="translate(320, 140)">
    <path d="M 0,0 C 15,0 15,60 0,60 C 40,60 70,50 80,30 C 70,10 40,0 0,0 Z" fill="#006064" stroke="#4dd0e1" stroke-width="2.5"/>
    <circle cx="82" cy="30" r="6" fill="#0d1b2a" stroke="#4dd0e1" stroke-width="2"/>
    <text x="32" y="36" fill="#80deea" font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle">NOR</text>
  </g>

  <!-- Final stage wires -->
  <g stroke-width="2.5" fill="none" stroke-linecap="round">
    <line x1="410" y1="170" x2="510" y2="210" stroke="#4dd0e1" filter="url(#glow)"/>
    <line x1="410" y1="320" x2="510" y2="260" stroke="#ce93d8" filter="url(#glow)"/>
  </g>

  <!-- Final AND Gate (output) -->
  <g transform="translate(510, 210)">
    <path d="M 0,0 L 50,0 C 100,0 100,70 50,70 L 0,70 Z" fill="#e65100" stroke="#ffb74d" stroke-width="3"/>
    <text x="35" y="42" fill="#ffe0b2" font-family="sans-serif" font-size="15" font-weight="bold" text-anchor="middle">AND</text>
  </g>

  <!-- Output wire -->
  <line x1="610" y1="245" x2="720" y2="245" stroke="#ffd740" stroke-width="3" filter="url(#glow)"/>
  <text x="735" y="250" fill="#ffd740" font-family="monospace" font-size="16" font-weight="bold">F</text>

  <!-- Signal dots (animated feel) -->
  <circle cx="80" cy="100" r="3" fill="#00e5ff" opacity="0.8"/>
  <circle cx="80" cy="230" r="3" fill="#76ff03" opacity="0.8"/>
  <circle cx="80" cy="360" r="3" fill="#ff9100" opacity="0.8"/>
  <circle cx="265" cy="135" r="3" fill="#42a5f5" opacity="0.8"/>
  <circle cx="265" cy="215" r="3" fill="#66bb6a" opacity="0.8"/>
  <circle cx="265" cy="350" r="3" fill="#ff7043" opacity="0.8"/>
  <circle cx="460" cy="190" r="3" fill="#4dd0e1" opacity="0.8"/>
  <circle cx="460" cy="290" r="3" fill="#ce93d8" opacity="0.8"/>
  <circle cx="670" cy="245" r="4" fill="#ffd740" opacity="0.9"/>

  <!-- NOT Gate (small, decorative) -->
  <g transform="translate(580, 90)">
    <polygon points="0,0 40,18 0,36" fill="#880e4f" stroke="#f48fb1" stroke-width="2"/>
    <circle cx="44" cy="18" r="5" fill="#0d1b2a" stroke="#f48fb1" stroke-width="1.5"/>
    <text x="15" y="23" fill="#f8bbd0" font-family="sans-serif" font-size="10" font-weight="bold">NOT</text>
  </g>
  <line x1="545" y1="108" x2="580" y2="108" stroke="#f48fb1" stroke-width="1.5" stroke-dasharray="3,3"/>
  <line x1="630" y1="108" x2="665" y2="108" stroke="#f48fb1" stroke-width="1.5" stroke-dasharray="3,3"/>

  <!-- Buffer (small, decorative) -->
  <g transform="translate(580, 400)">
    <polygon points="0,0 40,18 0,36" fill="#33691e" stroke="#aed581" stroke-width="2"/>
    <text x="13" y="23" fill="#c5e1a5" font-family="sans-serif" font-size="9" font-weight="bold">BUF</text>
  </g>
  <line x1="545" y1="418" x2="580" y2="418" stroke="#aed581" stroke-width="1.5" stroke-dasharray="3,3"/>
  <line x1="620" y1="418" x2="665" y2="418" stroke="#aed581" stroke-width="1.5" stroke-dasharray="3,3"/>

  <!-- Title overlay -->
  <text x="400" y="478" fill="rgba(255,255,255,0.4)" font-family="sans-serif" font-size="11" text-anchor="middle" letter-spacing="3">MULTI-LEVEL DIGITAL LOGIC CIRCUIT</text>
</svg>

<h1 class="cover-title">Digital System Design</h1>
<p class="cover-subtitle">EE 2301 &mdash; Introduction to Digital System Design</p>
<p class="cover-institution">University of Minnesota &mdash; Twin Cities</p>
<p class="cover-dept">Department of Electrical &amp; Computer Engineering</p>

<div class="cover-buttons">
  <a href="unit1-number-systems/" class="md-button md-button--primary">Get Started</a>
  <a href="sims/" class="md-button">Explore MicroSims</a>
  <a href="glossary/" class="md-button">Glossary</a>
</div>

</div>
