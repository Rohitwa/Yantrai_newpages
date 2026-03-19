---
name: yantra-page-builder
description: >
  Builds AI product proposal pages for Yantra AI Labs. Handles /sb, /verify, /p&c and all
  utility commands. Canonical reference: construction/index.html.
  Read this file before executing any build or edit command.
---

# Yantra AI Labs — Page Builder Skill

## Overview

You are building B2B sales proposal pages for Yantra AI Labs.
Each page targets enterprise decision-makers (C-suite, operations heads, department directors).
The page must answer 5 questions in order:
1. **What do you change?** (Hero — the transformation claim)
2. **Show me.** (Platform Benefits — video proof + problem breadth)
3. **How does it work?** (Intelligence Layer — analogy + AI brain visual)
4. **How do I implement it?** (Deployment & Scale + Partner Logos)
5. **Why should I trust you?** (Workflows, Social Proof, Team, Contact Form)

**Canonical Reference**: `construction/index.html` — read this file for the exact HTML/CSS pattern.
Every new domain copies this structure and replaces only the content variables.

---

## Design System

### Fonts (load in `<head>`, never deviate)
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```

### External Libraries (load in `<head>`)
```html
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-annotation@3.0.1/dist/chartjs-plugin-annotation.min.js"></script>
```
Chart.js is used for interactive data visualizations in workflow panels (e.g., WF3 project tracker chart).

### CSS Variables
```css
:root {
  --bg:       #ffffff;
  --bg-alt:   #f5f5f5;
  --dark:     #0a0a0a;
  --red:      #e63030;
  --gray:     #666;
  --gray-dim: #999;
  --border:   #e5e5e5;
  --amber:    #d97706;
}
```

### Shared Typography Classes
```css
.section-label {
  font-family: 'Inter', sans-serif;
  font-size: 11px; font-weight: 600;
  letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--gray-dim); margin-bottom: 20px;
}
.section-heading {
  font-family: 'Sora', sans-serif;
  font-size: clamp(2.4rem, 4.5vw, 4.2rem);
  font-weight: 800; line-height: 1.08;
  letter-spacing: -0.025em; color: var(--dark);
  margin-bottom: 20px;
}
.section-sub {
  font-family: 'Inter', sans-serif;
  font-size: 1.05rem; line-height: 1.75; color: var(--gray);
}
.section-subtext {
  font-family: 'Inter', sans-serif;
  font-size: 1rem; line-height: 1.75; color: var(--gray);
  max-width: 560px; margin-bottom: 0;
}
.reactive {
  color: var(--red);
  text-decoration: line-through;
  text-decoration-thickness: 4px;
}
```

---

## Nav (Always Present)

**WHY**
Sticky nav ensures the logo and CTA are always visible. Three elements: logo, domain label, CTA button.

**OUTPUT PATTERN**
```html
<nav>
  <a class="nav-logo" href="../">
    <img src="./assets/Logo/[logo-file]" alt="Yantra AI Labs">
  </a>
  <span class="nav-domain">[Domain] AI</span>
  <a href="#contact" class="nav-cta">Book a Demo</a>
</nav>
```

**CSS**
```css
nav {
  position: sticky; top: 0; z-index: 100;
  display: flex; align-items: center; justify-content: space-between;
  padding: 20px 60px;
  background: rgba(255,255,255,0.92); backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
}
.nav-logo img { height: 32px; display: block; }
.nav-domain {
  font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 600;
  letter-spacing: 0.16em; text-transform: uppercase; color: var(--gray-dim);
}
.nav-cta {
  display: inline-block; padding: 10px 24px;
  background: var(--dark); color: white;
  font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 600;
  letter-spacing: 0.04em; text-decoration: none; border-radius: 50px;
  transition: opacity 0.2s;
}
.nav-cta:hover { opacity: 0.8; }
@media (max-width: 768px) { nav { padding: 16px 24px; } .nav-domain { display: none; } }
```

---

## Section-by-Section Spec

---

### SECTION 1 — Hero

**WHY THIS SECTION EXISTS**
The hero must land in under 3 seconds. Decision-makers decide to keep reading or leave here.
The formula: name the old problem (strikethrough word) → claim the new reality → proof stat from a trusted source.
The strikethrough word makes the contrast physical — you can't un-see it. It's not a feature list, it's a worldview shift.
The insight stat opens a **modal popup** with a chart/image from the source — not just a link.

**INPUT VARIABLES**
- `hero_eyebrow` — e.g. "For Construction Companies"
- `hero_headline` — e.g. "Make your decisions proactive, not [reactive]."
- `reactive_word` — the word that gets struck through in red
- `hero_sub` — 2–3 sentence transformation description
- `insight_stat` — sentence with hard number from trusted source
- `insight_source_name` — source label
- `insight_source_url` — direct link to the source
- `insight_chart_image_url` — image URL for the modal popup chart
- `insight_chart_caption` — description for the chart

**OUTPUT PATTERN**
```html
<section id="hero">
  <div class="hero-eyebrow">For [Industry] Companies</div>
  <h1>Make your [noun]<br>proactive, not <span class="reactive">[reactive_word].</span></h1>
  <p class="hero-sub">[hero_sub]</p>
  <p class="hero-insight">
    [insight_stat] — <button class="insight-link" onclick="openModal()">see the [source] research →</button>
  </p>
  <a href="#contact" class="hero-cta">See How It Works →</a>

  <!-- Modal -->
  <div class="modal-overlay" id="chartModal" onclick="closeModalOnOverlay(event)">
    <div class="modal-box">
      <div class="modal-header">
        <div class="modal-title">[Chart title]</div>
        <button class="modal-close" onclick="closeModal()">✕</button>
      </div>
      <img src="[insight_chart_image_url]" alt="[chart alt text]" class="modal-img">
      <div class="modal-footer">
        <p class="modal-caption">[insight_chart_caption]</p>
        <a href="[insight_source_url]" target="_blank" rel="noopener" class="modal-source">Read full report ↗</a>
      </div>
    </div>
  </div>
</section>
```

**CSS**
```css
#hero { background: var(--bg); padding: 120px 60px 100px; max-width: 1200px; margin: 0 auto; text-align: center; }
.hero-eyebrow {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 11px; font-weight: 600; letter-spacing: 0.16em;
  text-transform: uppercase; color: var(--amber); margin-bottom: 32px;
}
.hero-eyebrow::before { content: ''; width: 24px; height: 2px; background: var(--amber); flex-shrink: 0; }
#hero h1 {
  font-family: 'Sora', sans-serif;
  font-size: clamp(3rem, 6.5vw, 6.5rem); font-weight: 800;
  line-height: 1.04; letter-spacing: -0.035em;
  color: var(--dark); max-width: 960px; margin: 0 auto 36px;
}
.hero-sub { font-size: 1.1rem; line-height: 1.8; color: var(--gray); max-width: 620px; margin: 0 auto 56px; }
.hero-insight { font-size: 0.95rem; line-height: 1.75; color: var(--gray); max-width: 620px; margin: 0 auto 48px; }
.insight-link {
  color: var(--dark); font-weight: 600; text-decoration: underline;
  text-underline-offset: 3px; text-decoration-thickness: 1px;
  cursor: pointer; background: none; border: none; padding: 0;
  font-family: inherit; font-size: inherit; transition: color 0.15s;
}
.insight-link:hover { color: var(--amber); }
.hero-cta {
  display: inline-block; padding: 16px 40px;
  background: var(--dark); color: white;
  font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 600;
  letter-spacing: 0.06em; text-decoration: none; border-radius: 50px;
  transition: opacity 0.2s;
}
.hero-cta:hover { opacity: 0.8; }
```

**Modal CSS**
```css
.modal-overlay {
  display: none; position: fixed; inset: 0;
  background: rgba(0,0,0,0.72); z-index: 1000;
  align-items: center; justify-content: center;
  padding: 24px; backdrop-filter: blur(4px);
}
.modal-overlay.open { display: flex; }
.modal-box { background: #fff; max-width: 780px; width: 100%; max-height: 90vh; overflow-y: auto; }
.modal-header { display: flex; align-items: flex-start; justify-content: space-between; padding: 28px 32px 0; gap: 16px; }
.modal-title { font-family: 'Sora', sans-serif; font-size: 1rem; font-weight: 700; color: var(--dark); line-height: 1.4; }
.modal-close { background: none; border: 1px solid var(--border); width: 32px; height: 32px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 1rem; color: var(--gray); }
.modal-img { width: 100%; display: block; padding: 20px 32px; }
.modal-footer { padding: 16px 32px 28px; display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--border); gap: 16px; }
.modal-caption { font-size: 11px; color: var(--gray-dim); line-height: 1.5; }
.modal-source { font-size: 12px; font-weight: 600; color: var(--dark); text-decoration: none; white-space: nowrap; border-bottom: 1px solid var(--border); padding-bottom: 2px; }
```

**JS**
```js
function openModal() { document.getElementById('chartModal').classList.add('open'); document.body.style.overflow = 'hidden'; }
function closeModal() { document.getElementById('chartModal').classList.remove('open'); document.body.style.overflow = ''; }
function closeModalOnOverlay(e) { if (e.target === document.getElementById('chartModal')) closeModal(); }
```

**ASSET-OPTIONAL**: No assets needed. Hero is 100% text + CSS + modal.

---

### SECTION 2 — Platform Benefits

**WHY THIS SECTION EXISTS**
After the hero claim, decision-makers need proof and breadth. This section delivers both:
a video showing the product in action, and a grid of problem areas showing the full scope.
The video auto-plays silently with a caption overlay. The problem grid uses emoji icons + domain-specific tags.
10 cards in a 2-column grid = comprehensive but scannable.

**INPUT VARIABLES**
- `section2_heading` — e.g. "Multi-use cases, One platform"
- `section2_sub` — 1–2 sentences about coverage
- Video file from `assets/video/` (.mp4 preferred)
- `video_caption` — overlay text for the video
- `problems[10]` — each: `{ icon, tag, title }`

**OUTPUT PATTERN**
```html
<section id="benefits">
  <div class="benefits-inner">
    <div class="section-label">Platform Benefits</div>
    <h2 class="section-heading">[section2_heading]</h2>
    <p class="section-sub">[section2_sub]</p>

    <div class="video-frame">
      <video autoplay muted loop playsinline>
        <source src="./assets/video/[filename].mp4" type="video/mp4">
      </video>
      <div class="video-caption">[video_caption]</div>
    </div>

    <div class="uc-grid-label">Problems [Company] solves for your business</div>
    <div class="problems-list">
      <div class="problem-item">
        <div class="problem-icon">[emoji]</div>
        <div class="problem-tag">[Category Tag]</div>
        <div class="problem-title">[Problem Title]</div>
      </div>
      <!-- × 10 -->
    </div>
  </div>
</section>
```

**CSS**
```css
#benefits { background: var(--bg-alt); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
.benefits-inner { max-width: 1200px; margin: 0 auto; padding: 100px 60px; }
.video-frame { margin: 56px 10% 0; border: 1px solid var(--border); background: #000; overflow: hidden; position: relative; }
.video-frame video { width: 100%; display: block; max-height: 58vh; object-fit: contain; }
.video-caption {
  position: absolute; bottom: 0; left: 0; right: 0; padding: 20px 28px;
  background: linear-gradient(transparent, rgba(0,0,0,0.7));
  color: white; font-size: 13px; font-weight: 500; letter-spacing: 0.02em;
}
.uc-grid-label { font-size: 11px; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gray-dim); margin: 72px 0 0; }
.problems-list { margin-top: 32px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 1px; background: var(--border); border: 1px solid var(--border); }
.problem-item { background: var(--bg); padding: 36px 32px; display: flex; flex-direction: column; gap: 14px; transition: background 0.2s; }
.problem-item:hover { background: #fafafa; }
.problem-icon { font-size: 2rem; line-height: 1; }
.problem-tag { display: inline-block; font-size: 10px; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; color: #999; }
.problem-title { font-family: 'Sora', sans-serif; font-size: 1.15rem; font-weight: 700; color: var(--dark); line-height: 1.3; letter-spacing: -0.01em; }
@media (max-width: 768px) { .problems-list { grid-template-columns: 1fr; } .video-frame { margin: 32px 0 0; } }
```

**ASSET-OPTIONAL (no video)**
```html
<div class="video-frame" style="background: #111; min-height: 40vh; display: flex; align-items: center; justify-content: center;">
  <p style="color: rgba(255,255,255,0.2); font-size: 13px; letter-spacing: 0.15em; text-transform: uppercase;">ADD VIDEO → assets/video/[domain].mp4</p>
</div>
```

---

### SECTION 3 — Intelligence Layer

**WHY THIS SECTION EXISTS**
After knowing the breadth, decision-makers need to understand HOW it works.
Not a technical spec — an analogy that makes the AI tangible.
The analogy box (bordered callout) bridges the mental gap between "dashboard software" and "AI agent."
The iframe below shows the interactive AI brain visualization — the wow moment.

**INPUT VARIABLES**
- `section3_heading` — e.g. "The Intelligence Layer Explained."
- `section3_sub` — 2–3 sentences explaining the AI approach
- `analogy_text` — the analogy callout (with bold/italic formatting)
- File from `assets/IAAS/` — prefer `.html` (interactive), fallback `.gif`

**OUTPUT PATTERN**
```html
<section id="intelligence">
  <div class="intel-intro">
    <div class="section-label">How It Works</div>
    <h2 class="section-heading">[section3_heading]</h2>
    <p class="section-sub">[section3_sub]</p>
    <div class="analogy-box">
      <div class="bar"></div>
      <div class="analogy-text">[analogy_text with <strong> and <em> tags]</div>
    </div>
  </div>
  <div class="intel-frame-wrap">
    <iframe src="./assets/IAAS/[filename].html" title="Yantra AI — Intelligence Layer" loading="lazy"></iframe>
  </div>
</section>
```

**CSS**
```css
#intelligence { background: var(--bg); padding-bottom: 100px; }
.intel-intro { max-width: 1200px; margin: 0 auto; padding: 100px 60px 64px; }
.intel-intro .section-sub { max-width: 680px; margin-bottom: 32px; }
.analogy-box { display: flex; gap: 0; max-width: 780px; background: var(--bg-alt); border: 1px solid var(--border); margin-top: 36px; }
.analogy-box .bar { width: 4px; background: var(--dark); flex-shrink: 0; }
.analogy-box .analogy-text { padding: 24px 28px; font-size: 0.95rem; line-height: 1.75; color: var(--dark); }
.analogy-box .analogy-text strong { font-weight: 600; }
.intel-frame-wrap { width: 60%; margin: 0 auto; overflow: hidden; border-radius: 12px; border: 1px solid var(--border); }
.intel-frame-wrap iframe { width: 100%; height: 430px; border: none; display: block; }
@media (max-width: 768px) { .intel-frame-wrap { width: 100%; border-radius: 8px; } .intel-frame-wrap iframe { height: 420px; } }
```

**ASSET-OPTIONAL (no IAAS file)**
```html
<div class="intel-frame-wrap" style="background: #0a0a0a; min-height: 400px; display: flex; align-items: center; justify-content: center;">
  <p style="color: rgba(255,255,255,0.2); font-size: 13px; letter-spacing: 0.15em; text-transform: uppercase;">ADD INTELLIGENCE LAYER → assets/IAAS/[name].html</p>
</div>
```

---

### SECTION 4 — Deployment & Scale

**WHY THIS SECTION EXISTS**
#1 objection from enterprise buyers: "This sounds great, but how do we actually implement it?"
3 steps = clear, sequential, manageable. Not a roadmap, not a spec — just 3 milestones.
The ghost number (huge, near-transparent) behind each step signals momentum without verbosity.
Content is read from `assets/Scale/` — this is the most domain-specific section.

**INPUT VARIABLES**
- Read from `assets/Scale/[filename]` — any of .txt / .md / .rtf / .docx
- `section4_heading` — e.g. "How We Deploy and Scale."
- `section4_sub` — 1 sentence description
- `steps[3]` — each: `{ number, title, description }`

**OUTPUT PATTERN**
```html
<div class="implementation-wrap">
  <div class="implementation">
    <div class="section-label">Deployment &amp; Scale</div>
    <h2 class="section-heading">[section4_heading]</h2>
    <p class="section-subtext">[section4_sub]</p>
    <div class="timeline">
      <div class="timeline-item">
        <div class="timeline-num">1</div>
        <div class="timeline-content">
          <h3>[Step 1 Title]</h3>
          <p>[Step 1 Description]</p>
        </div>
      </div>
      <!-- repeat for 2, 3 -->
    </div>
  </div>
</div>
```

**CSS (HORIZONTAL — do not change to vertical on desktop)**
```css
.implementation-wrap { background: var(--bg-alt); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
.implementation { padding: 110px 60px; max-width: 1100px; margin: 0 auto; }
.timeline { margin-top: 64px; display: flex; flex-direction: row; align-items: stretch; gap: 0; }
.timeline-item { flex: 1; display: flex; flex-direction: column; padding: 48px 40px; border-right: 1px solid var(--border); }
.timeline-item:first-child { padding-left: 0; }
.timeline-item:last-child { border-right: none; }
.timeline-num { font-family: 'Sora', sans-serif; font-size: 88px; font-weight: 800; color: rgba(0,0,0,0.06); line-height: 1; margin-bottom: 24px; }
.timeline-content h3 { font-family: 'Sora', sans-serif; font-size: 1.25rem; font-weight: 700; color: var(--dark); margin-bottom: 14px; }
.timeline-content p { font-size: 0.95rem; line-height: 1.8; color: var(--gray); }
@media (max-width: 768px) {
  .timeline { flex-direction: column; }
  .timeline-item { padding: 40px 0; border-right: none; border-bottom: 1px solid var(--border); }
  .timeline-item:last-child { border-bottom: none; }
  .timeline-num { font-size: 52px; }
}
```

**ASSET-OPTIONAL**: If `assets/Scale/` is empty, use these 3 default steps:
1. Connect Existing Systems — Plug into your cameras, IoT sensors, project management tools. No rip-and-replace.
2. Build a Unified Intelligence Layer — Combine site data and workflows into one AI-powered interface.
3. Scale Across All Projects — Standardize AI-powered intelligence across every site and project.

---

### SECTION 5 — Partner Logos

**WHY THIS SECTION EXISTS**
"Does this work with what we already use?" is the second-biggest objection after implementation.
10 logos from known vendors = immediate recognition and reduced risk.
Grayscale by default (not competing with the page), full colour on hover (showing they're real, live integrations).
The 5×2 grid is seamless (no outer padding) — logos feel like a system, not a badge wall.

**INPUT VARIABLES**
- `partners[10]` — each: `{ name, logo_url, category_label }`
- Logo URLs: prefer Wikimedia SVG → company press CDN → inline Sora wordmark fallback

**OUTPUT PATTERN**
```html
<div class="hardware-wrap">
  <div class="hardware">
    <div class="hw-label">Built to work with your current tools</div>
    <p class="hw-sub">[subtitle]</p>
    <div class="logo-grid">
      <div class="logo-card">
        <img src="[logo_url]" alt="[Company]">
        <span class="brand-name">[Category]</span>
      </div>
      <!-- × 10 -->
      <!-- For wordmark fallback (no logo URL): -->
      <div class="logo-card">
        <div class="logo-wordmark">[Company Name]</div>
        <span class="brand-name">[Category]</span>
      </div>
    </div>
  </div>
</div>
```

**CSS (5×2 SEAMLESS GRID — do not change column count on desktop)**
```css
.hardware-wrap { background: #f5f5f5; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
.hardware { padding: 100px 60px; text-align: center; max-width: 1100px; margin: 0 auto; }
.hardware .hw-label { font-size: 11px; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gray-dim); margin-bottom: 14px; }
.hardware .hw-sub { font-size: 1rem; color: var(--gray); margin-bottom: 0; }
.logo-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 0; margin-top: 56px; border: 1px solid #e0e0e0; }
.logo-card {
  background: #ffffff; border-right: 1px solid #e0e0e0; border-bottom: 1px solid #e0e0e0;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  padding: 40px 28px; gap: 16px; transition: background 0.25s, box-shadow 0.25s; cursor: default; min-height: 140px;
}
.logo-card:nth-child(5n) { border-right: none; }
.logo-card:nth-child(n+6) { border-bottom: none; }
.logo-card:hover { background: #fafafa; box-shadow: inset 0 0 0 1.5px #111; }
.logo-card img { max-width: 120px; max-height: 42px; width: 100%; height: auto; object-fit: contain; filter: grayscale(100%); opacity: 0.5; transition: filter 0.3s, opacity 0.3s; }
.logo-card:hover img { filter: grayscale(0%); opacity: 1; }
.logo-card .brand-name { font-size: 10px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: #ccc; transition: color 0.25s; }
.logo-card:hover .brand-name { color: #888; }
.logo-wordmark { font-family: 'Sora', sans-serif; font-size: 1.05rem; font-weight: 800; letter-spacing: -0.02em; color: #555; filter: grayscale(1); opacity: 0.5; transition: opacity 0.3s, color 0.3s; }
.logo-card:hover .logo-wordmark { opacity: 1; color: #111; }
@media (max-width: 768px) {
  .hardware { padding: 60px 24px; }
  .logo-grid { grid-template-columns: repeat(2, 1fr); }
  .logo-card:nth-child(5n) { border-right: 1px solid #e0e0e0; }
  .logo-card:nth-child(2n) { border-right: none; }
  .logo-card:nth-child(n+6) { border-bottom: 1px solid #e0e0e0; }
  .logo-card:last-child { border-bottom: none; }
  .logo-card img { max-width: 90px; max-height: 32px; }
}
```

**LOGO SOURCE PRIORITY**
1. `https://upload.wikimedia.org/wikipedia/commons/[path]` — SVG preferred
2. Company's official press/media CDN (e.g. `cdn.worldvectorlogo.com`, `cdn.simpleicons.org`)
3. Inline branded wordmark `<div class="logo-wordmark">` using Sora font (last resort only)

---

### SECTION 6 — Core Workflows (3 Sections)

**WHY THIS SECTION EXISTS**
This is where generic AI becomes specific to their exact problems.
Each workflow follows the pattern: here's what happens Before AI → here's what happens With Yantra AI.
The before/after panel is the persuasion engine — it makes the contrast visceral.

3 workflows is the right number. They follow a logical arc:
1. **Data Collection** — how data enters the system
2. **Decision Making** — how AI turns data into action
3. **Efficiency & Profitability** — the business outcome

Each has: video/visual (left) + text with before/after panels (right). Alternating layout creates rhythm.
Dark background (#0a0a0a) = contrast = urgency = high stakes.

A **Workflow Intro** section precedes the 3 workflows with a section label, heading, and subtext.

**INPUT VARIABLES**
- `workflow_intro_heading` — e.g. "Three Steps. One Intelligent System."
- `workflow_intro_sub` — 1 sentence
- `workflows[3]` — each: `{ number, tag, title, description, before_list[4], after_list[4], source_name, source_url }`
- Media from `assets/video/` or `assets/use-case/` per workflow

**OUTPUT PATTERN — Workflow Intro**
```html
<div class="workflow-intro-wrap">
  <div class="workflow-intro">
    <div class="section-label">Core Workflow</div>
    <h2 class="section-heading">[workflow_intro_heading]</h2>
    <p class="section-subtext">[workflow_intro_sub]</p>
  </div>
</div>
```

**OUTPUT PATTERN — Each Workflow**
```html
<div class="workflow-section [flip on even workflows]">
  <div class="workflow-media">
    <!-- video, chart panel, or placeholder -->
  </div>
  <div class="workflow-text">
    <div class="wf-num">Workflow 0[N] of 03</div>
    <div class="wf-tag">[Tag Name]</div>
    <h2>[Title Line 1].<br>[Title Line 2].</h2>
    <p>[Description]</p>
    <div class="wf-before-after">
      <div class="wf-col before">
        <div class="wf-col-label">Before AI</div>
        <ul>
          <li>[before item 1]</li>
          <li>[before item 2]</li>
          <li>[before item 3]</li>
          <li>[before item 4]</li>
        </ul>
      </div>
      <div class="wf-col after">
        <div class="wf-col-label">With Yantra AI</div>
        <ul>
          <li>[after item 1]</li>
          <li>[after item 2]</li>
          <li>[after item 3]</li>
          <li>[after item 4]</li>
        </ul>
      </div>
    </div>
    <a href="[source_url]" target="_blank" rel="noopener" class="wf-source-link">
      <span class="wf-source-icon">↗</span>
      [source_name]
    </a>
  </div>
</div>
```

**Alternation Rule**: WF1 = normal (media left, text right), WF2 = `.flip` (text left, media right), WF3 = normal.

**CSS**
```css
.workflow-intro-wrap { background: var(--bg); border-top: 1px solid var(--border); }
.workflow-intro { padding: 100px 60px 80px; max-width: 1100px; margin: 0 auto; }

.workflow-section { display: grid; grid-template-columns: 1fr 1fr; min-height: 75vh; background: #0a0a0a; border-bottom: 1px solid rgba(255,255,255,0.06); }
.workflow-section.flip { direction: rtl; }
.workflow-section.flip > * { direction: ltr; }
.workflow-media { overflow: hidden; position: relative; background: #111; }
.workflow-media video { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; display: block; }
.workflow-text { padding: 80px 64px; display: flex; flex-direction: column; justify-content: center; }
.wf-num { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.25); margin-bottom: 16px; }
.wf-tag { display: inline-block; font-size: 10px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: var(--amber); border: 1px solid rgba(217,119,6,0.35); padding: 5px 12px; margin-bottom: 24px; width: fit-content; }
.workflow-text h2 { font-family: 'Sora', sans-serif; font-size: clamp(1.8rem, 3vw, 2.8rem); font-weight: 800; color: white; line-height: 1.1; letter-spacing: -0.02em; margin-bottom: 20px; }
.workflow-text p { font-family: 'Inter', sans-serif; font-size: 1rem; line-height: 1.8; color: rgba(255,255,255,0.6); max-width: 460px; margin-bottom: 32px; }

/* Before/After panels */
.wf-before-after { display: flex; gap: 0; margin-top: 8px; }
.wf-col { flex: 1; padding: 20px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); }
.wf-col + .wf-col { border-left: none; }
.wf-col-label { font-size: 9px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; margin-bottom: 10px; }
.wf-col.before .wf-col-label { color: rgba(255,255,255,0.25); }
.wf-col.after .wf-col-label { color: var(--amber); }
.wf-col ul { list-style: none; display: flex; flex-direction: column; gap: 6px; }
.wf-col ul li { font-size: 0.8rem; color: rgba(255,255,255,0.5); line-height: 1.5; padding-left: 14px; position: relative; }
.wf-col ul li::before { content: '–'; position: absolute; left: 0; color: rgba(255,255,255,0.2); }
.wf-col.after ul li { color: rgba(255,255,255,0.75); }
.wf-col.after ul li::before { content: '✓'; color: var(--amber); }

/* Source link */
.wf-source-link { display: flex; align-items: center; gap: 8px; margin-top: 28px; padding-top: 20px; border-top: 1px dashed rgba(255,255,255,0.12); font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 500; color: rgba(255,255,255,0.35); text-decoration: none; letter-spacing: 0.01em; transition: color 0.2s; }
.wf-source-link:hover { color: var(--amber); }
.wf-source-icon { font-size: 13px; opacity: 0.6; flex-shrink: 0; }

@media (max-width: 768px) {
  .workflow-section { grid-template-columns: 1fr; min-height: auto; }
  .workflow-section.flip { direction: ltr; }
  .workflow-media { min-height: 240px; }
  .workflow-text { padding: 48px 24px; }
  .wf-before-after { flex-direction: column; }
  .wf-col + .wf-col { border-left: 1px solid rgba(255,255,255,0.08); border-top: none; }
  .workflow-text p { max-width: 100%; }
  .workflow-intro { padding: 64px 24px 56px; }
}
```

**WF3 — Interactive Chart Panel (Chart.js)**
The third workflow uses an interactive Chart.js chart instead of a video.
It shows a project tracker visualization with risk detection, pace adjustment, and delay avoidance.
The chart panel has: header with badges → canvas chart → legend → insight strip → caption.
Full CSS for WF3 panel classes (`.wf3-outer`, `.wf3-header`, `.wf3-chart-canvas-wrap`, `.wf3-legend`, `.wf3-insight`, `.wf3-caption`) is in the canonical `construction/index.html` — copy verbatim for each domain, adapting only the data values.

**MEDIA STRATEGY (per workflow)**
- WF1: prefer `assets/video/Workflow_1.mp4` → placeholder
- WF2: prefer `assets/video/Workflow_2.mp4` with `object-fit: contain` for wide videos
- WF3: prefer interactive Chart.js panel → fallback to `assets/use-case/` image → placeholder
- Never leave a blank white box — always a video, chart, or styled placeholder

**ASSET-OPTIONAL PLACEHOLDER**
```html
<div class="workflow-placeholder">
  <div class="ph-icon">[relevant emoji]</div>
  <div class="ph-label">ADD MEDIA → assets/video/Workflow_[N].mp4</div>
</div>
```

---

### SECTION 7 — Social Proof / Results

**WHY THIS SECTION EXISTS**
Decision-makers need to justify the purchase internally. Give them numbers they can put in a slide.
4 stat cards in a 2×2 grid — each with a big number, label, description, and cited source.
The source attribution builds trust: these aren't made-up numbers.

**INPUT VARIABLES**
- `section7_heading` — e.g. "What AI Adoption Actually Delivers."
- `section7_sub` — 1–2 sentences context
- `results[4]` — each: `{ value, sup_text, label, description, source }`

**OUTPUT PATTERN**
```html
<section id="results">
  <div class="results-inner">
    <div class="section-label">Industry Results</div>
    <h2 class="section-heading">[section7_heading]</h2>
    <p class="section-sub">[section7_sub]</p>
    <div class="results-grid">
      <div class="result-card">
        <div class="result-num">[value]<sup>[sup_text]</sup></div>
        <div class="result-label">[label]</div>
        <div class="result-desc">[description]</div>
        <div class="result-source">Source — [source]</div>
      </div>
      <!-- × 4 -->
    </div>
  </div>
</section>
```

**CSS**
```css
#results { background: var(--bg); border-top: 1px solid var(--border); }
.results-inner { max-width: 1200px; margin: 0 auto; padding: 100px 60px; }
.results-inner .section-sub { max-width: 560px; margin-bottom: 72px; }
.results-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1px; background: var(--border); border: 1px solid var(--border); }
.result-card { background: var(--bg); padding: 48px 44px; display: flex; flex-direction: column; gap: 12px; transition: background 0.2s; }
.result-card:hover { background: #fafafa; }
.result-num { font-family: 'Sora', sans-serif; font-size: clamp(3.5rem, 6vw, 5.5rem); font-weight: 800; color: var(--dark); letter-spacing: -0.04em; line-height: 1; }
.result-num sup { font-size: 0.4em; vertical-align: super; letter-spacing: 0; }
.result-label { font-family: 'Sora', sans-serif; font-size: 1.1rem; font-weight: 700; color: var(--dark); line-height: 1.3; }
.result-desc { font-size: 0.88rem; line-height: 1.65; color: var(--gray); max-width: 380px; }
.result-source { margin-top: auto; padding-top: 20px; font-size: 10px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--gray-dim); border-top: 1px solid var(--border); }
@media (max-width: 768px) { .results-grid { grid-template-columns: 1fr; } .result-card { padding: 32px 20px; } }
```

**ASSET-OPTIONAL**: No assets needed.

---

### SECTION 8 — Core Team

**WHY THIS SECTION EXISTS**
B2B purchasing is trust. The team section answers: "Who am I buying from? Are they credible?"
3 cards = intimate, not a corporate org chart. Each card shows: face → tags → bio → credential chips.
The credential chips (IIT / NIT / company names) are the fastest trust signals for Indian enterprise buyers.
Hover effect: card lifts + shadow, photo partially desaturates.

**FIXED TEAM (same across all domains)**
- **Rakesh** — AI/ML/Engineering. B.Tech NIT Rourkela '13. EY, AI Monk, Dvara E-diary. $2M raised.
- **Rohit** — Business/GTM/Product. B.Tech NIT Rourkela '12. Hero Group, EasyLokal (Techstars ~$100K), WayCool, Zomato 1.5M txns/month.
- **Mohit** — Strategy/Business/AI. B.Tech IIT Delhi '12. Hero Group $200M+, Jangid Motors $5M ARR, Oye! Rickshaw 100k+ txns/day ($12M raised, Matrix/Xiaomi).

**OUTPUT PATTERN**
```html
<section id="team">
  <div class="team-inner">
    <div class="team-header-block">
      <div class="section-label">Our Core Team</div>
      <h2 class="section-heading">The Minds Behind<br>the Platform.</h2>
      <p class="section-sub">[domain-appropriate team description]</p>
    </div>
    <div class="team-cards">
      <div class="tc">
        <div class="tc-photo"><img src="./assets/Team/team_1.png" alt="[Name]"></div>
        <div class="tc-body">
          <div class="tc-name">[Name]</div>
          <div class="tc-tags">
            <span class="tc-tag">[Tag 1]</span>
            <span class="tc-tag">[Tag 2]</span>
            <span class="tc-tag">[Tag 3]</span>
          </div>
          <p class="tc-bio">
            B.Tech, <span class="hl-college">[College]</span> '[year] · <span class="hl-company">[Company]</span> · <span class="metric">[achievement]</span>
          </p>
          <div class="tc-creds">
            <span class="tc-cred amber">[College]</span>
            <span class="tc-cred">[Credential]</span>
            <span class="tc-cred">[Companies]</span>
          </div>
        </div>
      </div>
      <!-- × 3 -->
    </div>
  </div>
</section>
```

**CSS**
```css
#team { background: #ffffff; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
.team-inner { max-width: 1100px; margin: 0 auto; padding: 100px 60px; }
.team-header-block { text-align: center; margin-bottom: 64px; }
.team-header-block .section-sub { max-width: 580px; margin: 0 auto; font-size: 1rem; line-height: 1.75; color: var(--gray); }
.team-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.tc { background: #fafaf9; border: 1px solid var(--border); border-radius: 12px; overflow: hidden; transition: box-shadow 0.25s, transform 0.25s; }
.tc:hover { transform: translateY(-4px); box-shadow: 0 16px 48px rgba(0,0,0,0.09); }
.tc-photo { width: 100%; aspect-ratio: 4/3; overflow: hidden; background: #d0cfca; }
.tc-photo img { width: 100%; height: 100%; object-fit: cover; object-position: top center; filter: grayscale(100%); display: block; transition: filter 0.4s; }
.tc:hover .tc-photo img { filter: grayscale(50%); }
.tc-body { padding: 20px 20px 24px; }
.tc-name { font-family: 'Sora', sans-serif; font-size: 26px; font-weight: 800; color: var(--dark); letter-spacing: -0.01em; margin-bottom: 8px; line-height: 1; }
.tc-tags { display: flex; flex-wrap: wrap; gap: 4px; margin-bottom: 14px; }
.tc-tag { font-size: 9px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: #3b30e8; background: #ebebfd; border-radius: 3px; padding: 3px 8px; }
.tc-bio { font-size: 13px; line-height: 1.75; color: #4a4a47; font-weight: 400; }
.tc-bio .hl-college { font-weight: 600; color: var(--dark); border-bottom: 2px solid var(--amber); padding-bottom: 1px; }
.tc-bio .hl-company { font-weight: 600; color: var(--dark); background: #f5f5f2; padding: 0 4px; border-radius: 3px; }
.tc-bio .metric { font-size: 11.5px; font-weight: 600; color: var(--red); background: #fdf1f0; border-radius: 4px; padding: 1px 5px; }
.tc-creds { margin-top: 14px; padding-top: 14px; border-top: 1px solid var(--border); display: flex; flex-wrap: wrap; gap: 6px; }
.tc-cred { font-size: 10px; font-weight: 600; letter-spacing: 0.06em; color: var(--dark); background: #fff; border: 1px solid var(--border); border-radius: 20px; padding: 4px 10px; }
.tc-cred.amber { border-color: #e8b98a; color: var(--amber); background: #fdf6ef; }
@media (max-width: 768px) { .team-cards { grid-template-columns: 1fr; gap: 16px; } .tc-name { font-size: 22px; } }
```

**ASSET PATH**
Team photos: `./assets/Team/team_1.png`, `team_2.png`, `team_3.png`
If images are absent: `<div class="tc-photo" style="background: #d0cfca;"><!-- ADD: assets/Team/team_N.png --></div>`

---

### SECTION 9 — Footer + Contact Form

**WHY THIS SECTION EXISTS**
Every section on the page builds to a contact moment. The footer IS the contact form.
Two-column layout: brand/address (left) + demo request form (right).
The form is client-side only (preventDefault + success state). No backend needed.

**INPUT VARIABLES** (from domain config)
- Company name, contact name, mobile, email, address
- Domain-specific role options for the select dropdown
- Footer tagline (domain-specific)

**OUTPUT PATTERN**
```html
<footer id="contact">
  <div class="footer-top">
    <!-- Brand & Address -->
    <div class="footer-brand">
      <img src="./assets/Logo/[logo-file]" alt="Yantra AI Labs" class="footer-logo">
      <div class="footer-tagline">[Domain-specific tagline]</div>
      <div class="footer-details" style="margin-top: 32px;">
        <div class="footer-detail"><span class="di">📍</span><span>[Address]</span></div>
        <div class="footer-detail"><span class="di">📱</span><a href="tel:[mobile]">[mobile]</a></div>
        <div class="footer-detail"><span class="di">✉️</span><a href="mailto:[email]">[email]</a></div>
        <div class="footer-detail"><span class="di">🌐</span><a href="[website_url]" target="_blank">[website]</a></div>
      </div>
    </div>

    <!-- Contact Form -->
    <div class="footer-form">
      <span class="footer-form-label">Book a Demo — Response within 2 hours</span>
      <form id="demoForm" onsubmit="submitForm(event)">
        <div class="form-row">
          <div class="form-field"><label>Full Name *</label><input type="text" placeholder="[example name]" required></div>
          <div class="form-field"><label>Company *</label><input type="text" placeholder="[example company]" required></div>
        </div>
        <div class="form-row">
          <div class="form-field">
            <label>Your Role *</label>
            <select required>
              <option value="" disabled selected>Select role</option>
              <!-- domain-specific role options -->
            </select>
          </div>
          <div class="form-field"><label>Mobile *</label><input type="tel" placeholder="+91 98765 43210" required></div>
        </div>
        <div class="form-field"><label>Email</label><input type="email" placeholder="[example]@company.com"></div>
        <div class="form-field"><label>What challenge can we solve?</label><textarea placeholder="[domain-specific prompt]"></textarea></div>
        <button type="submit" class="form-submit">Request a Demo →</button>
      </form>
      <div class="form-success" id="formSuccess">
        <strong style="color:white; font-size:1rem;">Thank you!</strong><br>
        [Contact name] will reach out within 2 hours.<br>
        <span style="font-size:0.82rem; color:rgba(255,255,255,0.4);">[mobile] · [email]</span>
      </div>
    </div>
  </div>

  <div class="footer-bottom">
    <p>© [year] Yantra AI Labs. All rights reserved.</p>
    <div style="display:flex; gap:24px;">
      <a href="../">All Domains</a>
      <a href="../[other-domain]/">[Other Domain] AI</a>
      <a href="#hero">Back to Top ↑</a>
    </div>
  </div>
</footer>
```

**JS**
```js
function submitForm(e) {
  e.preventDefault();
  document.getElementById('demoForm').style.display = 'none';
  document.getElementById('formSuccess').style.display = 'block';
}
```

**CSS**
```css
#contact { background: var(--dark); color: white; }
.footer-top { max-width: 1200px; margin: 0 auto; padding: 80px 60px; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; border-bottom: 1px solid rgba(255,255,255,0.08); }
.footer-logo { height: 28px; margin-bottom: 24px; filter: brightness(0) invert(1); display: block; }
.footer-tagline { font-family: 'Sora', sans-serif; font-size: 1.05rem; font-weight: 700; color: white; margin-bottom: 20px; line-height: 1.4; }
.footer-details { display: flex; flex-direction: column; gap: 10px; }
.footer-detail { display: flex; align-items: flex-start; gap: 10px; font-size: 0.88rem; color: rgba(255,255,255,0.5); line-height: 1.5; }
.footer-detail .di { font-size: 0.95rem; flex-shrink: 0; margin-top: 1px; }
.footer-detail a { color: rgba(255,255,255,0.5); text-decoration: none; transition: color 0.2s; }
.footer-detail a:hover { color: white; }
.footer-form-label { font-size: 11px; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,255,255,0.3); margin-bottom: 28px; display: block; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px; }
.form-field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 12px; }
.form-field label { font-size: 11px; font-weight: 500; letter-spacing: 0.06em; color: rgba(255,255,255,0.35); text-transform: uppercase; }
.form-field input, .form-field select, .form-field textarea {
  background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.12);
  color: white; font-family: 'Inter', sans-serif; font-size: 14px;
  padding: 12px 16px; outline: none; transition: border-color 0.2s;
  border-radius: 0; -webkit-appearance: none;
}
.form-field input::placeholder, .form-field textarea::placeholder { color: rgba(255,255,255,0.2); }
.form-field input:focus, .form-field select:focus, .form-field textarea:focus { border-color: rgba(255,255,255,0.4); }
.form-field textarea { resize: none; min-height: 90px; }
.form-field select option { background: #1a1a1a; color: white; }
.form-submit { width: 100%; padding: 14px 24px; background: white; color: var(--dark); font-family: 'Inter', sans-serif; font-size: 14px; font-weight: 700; letter-spacing: 0.04em; border: none; cursor: pointer; transition: opacity 0.2s; margin-top: 8px; }
.form-submit:hover { opacity: 0.88; }
.form-success { display: none; padding: 20px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); text-align: center; color: rgba(255,255,255,0.7); font-size: 0.9rem; line-height: 1.6; }
.footer-bottom { max-width: 1200px; margin: 0 auto; padding: 24px 60px; display: flex; align-items: center; justify-content: space-between; }
.footer-bottom p { font-size: 12px; color: rgba(255,255,255,0.2); }
.footer-bottom a { font-size: 12px; color: rgba(255,255,255,0.25); text-decoration: none; transition: color 0.2s; }
.footer-bottom a:hover { color: rgba(255,255,255,0.6); }
@media (max-width: 768px) {
  .footer-top { grid-template-columns: 1fr; gap: 56px; padding: 56px 24px; }
  .form-row { grid-template-columns: 1fr; }
  .footer-bottom { flex-direction: column; gap: 12px; text-align: center; padding: 20px 24px; }
}
```

---

## Responsive Breakpoints

Three breakpoints, always present:

```css
/* Tablet */
@media (max-width: 1024px) { /* reduce padding, shrink iframe, adjust team cards */ }
/* Mobile */
@media (max-width: 768px) { /* stack grids to 1 col, hide nav-domain, reduce hero font */ }
/* Small phone */
@media (max-width: 480px) { /* further reduce padding and font sizes */ }
```

See `construction/index.html` for the complete responsive CSS.

---

## Asset-Optional Design Principle

**Rule**: Every section builds and displays correctly with zero assets.
**Rule**: When an asset is added to the correct folder, it replaces the placeholder — no code change needed.
**Rule**: Placeholder divs always contain a clear `<!-- ADD: assets/[folder]/[filename] -->` comment.

| Section | Asset | Placeholder Behaviour |
|---------|-------|----------------------|
| 2 — Platform Benefits | `assets/video/*.mp4` | Dark div with text "ADD VIDEO → assets/video/" |
| 3 — Intelligence Layer | `assets/IAAS/*.html` | Dark div with text "ADD INTELLIGENCE LAYER → assets/IAAS/" |
| 6 — Core Workflows | `assets/video/Workflow_*.mp4` | Placeholder div with emoji + text |
| 8 — Team | `assets/Team/team_N.png` | Light gray div per card, no image tag |
| 4 — Scale Steps | `assets/Scale/*` | 3 default steps hardcoded |
