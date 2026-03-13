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
2. **Show me.** (Video — proof before explanation)
3. **What exactly does it do?** (Platform + Intelligence Layer)
4. **How do I implement it?** (Deployment & Scale)
5. **Why should I trust you?** (Partners, Stats, Use Cases, Team)

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

### CSS Variables
```css
:root {
  --bg:       #ffffff;
  --bg-card:  #f5f6f8;
  --bg-alt:   #f9f9f9;
  --dark:     #0a0a0a;
  --blue:     #2563EB;
  --red:      #e63030;
  --gray:     #666666;
  --gray-dim: #999999;
  --border:   rgba(0,0,0,0.09);
  --amber:    #d97706;
}
```

### Shared Typography Classes
```css
.section-label {
  font-family: 'Inter', sans-serif;
  font-size: 11px; font-weight: 600;
  letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--blue); margin-bottom: 20px;
}
.section-heading {
  font-family: 'Sora', sans-serif;
  font-size: clamp(2.4rem, 4.5vw, 4.5rem);
  font-weight: 800; line-height: 1.08;
  letter-spacing: -0.02em; color: var(--dark);
  margin-bottom: 18px;
}
.section-subtext {
  font-family: 'Inter', sans-serif;
  font-size: 1.05rem; line-height: 1.75; color: var(--gray);
}
.section-sub {
  font-size: 1.05rem; line-height: 1.75; color: var(--gray);
}
```

---

## Section-by-Section Spec

---

### SECTION 1 — Hero

**WHY THIS SECTION EXISTS**
The hero must land in under 3 seconds. Decision-makers decide to keep reading or leave here.
The formula: name the old problem (strikethrough word) → claim the new reality → proof stat from a trusted source.
The strikethrough word makes the contrast physical — you can't un-see it. It's not a feature list, it's a worldview shift.

**INPUT VARIABLES**
- `hero_headline` — the full heading, e.g. "Make your decisions proactive, not [reactive]"
- `reactive_word` — the word that gets struck through in red (always the old, broken way of doing things)
- `hero_sub` — 2-sentence description of the transformation
- `insight_stat` — a sentence with a hard number from a trusted source
- `insight_source_name` — source label, e.g. "IBM Cost of a Data Breach Report"
- `insight_source_url` — direct link to the source

**OUTPUT PATTERN**
```html
<section id="hero">
  <!-- Optional eyebrow -->
  <div class="hero-eyebrow">For [Industry] Companies</div>

  <h1>Make your [domain noun] proactive, not <span class="reactive">[reactive_word].</span></h1>

  <p class="hero-sub">[hero_sub — 2–3 sentences, conversational, specific]</p>

  <p class="hero-insight">
    [insight_stat — bold the number] <a href="[url]" target="_blank" class="insight-link">[source_name] →</a>
  </p>

  <a href="contact.html" class="hero-cta">See How It Works →</a>
</section>
```

**CSS**
```css
.hero { padding: 140px 60px 120px; text-align: center; background: var(--bg); }
.hero-eyebrow {
  font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 600;
  letter-spacing: 0.18em; text-transform: uppercase; color: var(--blue);
  margin-bottom: 28px;
}
.hero h1 {
  font-family: 'Sora', sans-serif;
  font-size: clamp(3.5rem, 7.5vw, 7rem);
  font-weight: 800; line-height: 1.05; letter-spacing: -0.03em;
  color: var(--dark); margin: 0 auto 28px; max-width: 1000px;
}
.reactive { color: var(--red); text-decoration: line-through; text-decoration-thickness: 4px; }
.hero-sub {
  font-size: 1.15rem; line-height: 1.75; color: var(--gray);
  max-width: 580px; margin: 0 auto 48px;
}
.hero-insight {
  font-size: 0.82rem; line-height: 1.65; color: var(--gray-dim);
  max-width: 580px; margin: 28px auto 0;
}
.insight-link {
  color: var(--blue); text-decoration: none; font-weight: 500;
  border-bottom: 1px solid rgba(37,99,235,0.35); padding-bottom: 1px;
}
.hero-cta {
  display: inline-block; margin-top: 40px;
  font-family: 'Inter', sans-serif; font-size: 15px; font-weight: 600;
  color: #ffffff; background: var(--blue);
  padding: 16px 40px; border-radius: 50px;
  text-decoration: none; transition: opacity 0.2s, transform 0.2s;
}
.hero-cta:hover { opacity: 0.88; transform: translateY(-1px); }
```

**ASSET-OPTIONAL**: No assets needed. Hero is 100% text + CSS.

---

### SECTION 2 — Hero Video

**WHY THIS SECTION EXISTS**
Decision-makers don't read decks before seeing proof. Video earns 60 seconds of attention that no paragraph can.
No controls, no heading, no caption — just the product doing its job.
If no video exists: a dark placeholder holds the space and makes it obvious what to drop in.

**INPUT VARIABLES**
- Video file from `assets/video/` (.mp4 preferred)

**OUTPUT PATTERN**
```html
<section class="video-section">
  <video autoplay muted loop playsinline>
    <source src="./assets/video/[filename].mp4" type="video/mp4">
  </video>
</section>
```

**ASSET-OPTIONAL (no video)**
```html
<section class="video-section">
  <div class="video-placeholder">
    <p>ADD VIDEO → assets/video/[domain].mp4</p>
  </div>
</section>
```
```css
.video-placeholder {
  background: #111; min-height: 60vh;
  display: flex; align-items: center; justify-content: center;
}
.video-placeholder p {
  font-family: 'Inter', sans-serif; font-size: 13px;
  color: rgba(255,255,255,0.2); letter-spacing: 0.15em; text-transform: uppercase;
}
```

---

### SECTION 3 — Platform Overview

**WHY THIS SECTION EXISTS**
After the video, the question is "OK, but what does it actually do?"
8 cards = breadth without overwhelm. 8 is the right number: comprehensive, not exhausting.
The heading always follows the pattern "One Platform. All [Domain] Solutions."
Each card = one capability. Icon (Unicode) + short label + 1-sentence description.

**INPUT VARIABLES**
- `section3_heading` — e.g. "One Platform. All Construction Solutions."
- `section3_subtext` — 1–2 sentences describing the platform
- `cards[8]` — each: `{ icon, label, description }`

**OUTPUT PATTERN**
```html
<section class="platform" id="platform">
  <div class="section-label">Platform Overview</div>
  <h2 class="section-heading">[section3_heading]</h2>
  <p class="section-subtext">[section3_subtext]</p>
  <div class="platform-grid">
    <!-- 8 cards -->
    <div class="platform-card">
      <div class="card-icon">[emoji]</div>
      <div class="card-label">[label]</div>
      <p class="card-desc">[description]</p>
    </div>
  </div>
</section>
```

**CSS**
```css
.platform { padding: 100px 60px; background: var(--bg); text-align: center; }
.platform-grid {
  display: grid; grid-template-columns: repeat(4, 1fr);
  gap: 1px; background: var(--border); margin-top: 64px;
  border: 1px solid var(--border);
}
.platform-card {
  background: var(--bg); padding: 40px 32px; text-align: left;
  transition: box-shadow 0.2s;
}
.platform-card:hover { box-shadow: inset 0 0 0 1.5px var(--dark); }
.card-icon { font-size: 28px; margin-bottom: 20px; }
.card-label {
  font-family: 'Sora', sans-serif; font-size: 1rem; font-weight: 700;
  color: var(--dark); margin-bottom: 10px;
}
.card-desc {
  font-family: 'Inter', sans-serif; font-size: 0.875rem;
  line-height: 1.7; color: var(--gray);
}
@media (max-width: 768px) { .platform-grid { grid-template-columns: repeat(2, 1fr); } }
```

**ASSET-OPTIONAL**: No assets needed. All content is inline.

---

### SECTION 4 — Intelligence Layer

**WHY THIS SECTION EXISTS**
This is the "wow" moment. After knowing what the platform does, decision-makers need to feel the depth.
A full-screen interactive HTML visualization (or animated GIF) makes the AI tangible, not abstract.
It is always full-bleed, no heading, no text — pure visual immersion.

**INPUT VARIABLES**
- File from `assets/IAAS/` — prefer `.html` (interactive), fallback `.gif`

**OUTPUT PATTERN (HTML file)**
```html
<section class="iaas-section" id="intelligence">
  <div class="iaas-frame-wrap">
    <iframe src="./assets/IAAS/[filename].html" title="AI Intelligence Layer"></iframe>
  </div>
</section>
```

**CSS**
```css
.iaas-section { background: var(--dark); padding: 80px 60px; }
.iaas-frame-wrap {
  width: 70%; margin: 0 auto; border-radius: 16px; overflow: hidden;
  box-shadow: 0 40px 120px rgba(0,0,0,0.5);
}
.iaas-section iframe { width: 100%; min-height: 600px; border: none; display: block; }
```

**ASSET-OPTIONAL (no IAAS file)**
```html
<section class="iaas-section" id="intelligence">
  <div class="iaas-placeholder">
    <p>ADD INTELLIGENCE LAYER → assets/IAAS/[name].html</p>
  </div>
</section>
```

---

### SECTION 5 — Deployment & Scale

**WHY THIS SECTION EXISTS**
#1 objection from enterprise buyers: "This sounds great, but how do we actually implement it?"
3 steps = clear, sequential, manageable. Not a roadmap, not a spec — just 3 milestones.
The ghost number (huge, near-transparent) behind each step signals momentum without verbosity.
Content is read from `assets/Scale/` — this is the most domain-specific section and changes most often.

**INPUT VARIABLES**
- Read from `assets/Scale/[filename]` — any of .txt / .md / .rtf / .docx
- `section5_heading` — e.g. "From Day 1 to Full Scale."
- `steps[3]` — each: `{ number, title, description }`

**OUTPUT PATTERN**
```html
<section class="implementation" id="implementation">
  <div class="section-label">Deployment & Scale</div>
  <h2 class="section-heading">[section5_heading]</h2>
  <div class="timeline">
    <div class="timeline-item">
      <div class="timeline-num">01</div>
      <div class="timeline-content">
        <h3>[Step 1 Title]</h3>
        <p>[Step 1 Description]</p>
      </div>
    </div>
    <!-- repeat for 02, 03 -->
  </div>
</section>
```

**CSS (HORIZONTAL — do not change to vertical on desktop)**
```css
.implementation { padding: 100px 60px; background: var(--bg-alt); }
.timeline { display: flex; flex-direction: row; align-items: stretch; margin-top: 64px; }
.timeline-item {
  flex: 1; display: flex; flex-direction: column;
  padding: 48px 40px; border-right: 1px solid var(--border);
}
.timeline-item:first-child { padding-left: 0; }
.timeline-item:last-child { border-right: none; }
.timeline-num {
  font-family: 'Sora', sans-serif; font-size: 88px; font-weight: 800;
  color: rgba(0,0,0,0.06); line-height: 1; margin-bottom: 24px;
}
.timeline-content h3 {
  font-family: 'Sora', sans-serif; font-size: 1.25rem; font-weight: 700; margin-bottom: 14px;
}
.timeline-content p {
  font-family: 'Inter', sans-serif; font-size: 0.95rem; line-height: 1.8; color: var(--gray);
}
@media (max-width: 768px) {
  .timeline { flex-direction: column; }
  .timeline-item { padding: 40px 0; border-right: none; border-bottom: 1px solid var(--border); }
  .timeline-item:last-child { border-bottom: none; }
}
```

**ASSET-OPTIONAL**: If `assets/Scale/` is empty, use these 3 default steps:
1. Connect Your Infrastructure — API integration with existing tools and data sources
2. Unified Intelligence Layer — AI models trained on your domain-specific workflows
3. Deploy & Scale Fast — Go live in weeks, not months. Scale across teams seamlessly.

---

### SECTION 6 — Partner Logos

**WHY THIS SECTION EXISTS**
"Does this work with what we already use?" is the second-biggest objection after implementation.
10 logos from known vendors = immediate recognition and reduced risk.
Grayscale by default (not competing with the page), full colour on hover (showing they're real, live integrations).
The 5×2 grid is seamless (no outer padding) — logos feel like a system, not a badge wall.

**INPUT VARIABLES**
- `partners[10]` — each: `{ name, logo_url, category_label }`
- Logo URLs: prefer Wikimedia SVG → company press CDN → inline SVG wordmark fallback

**OUTPUT PATTERN**
```html
<section class="hardware" id="partners">
  <div class="section-label">Trusted Integrations</div>
  <h2 class="section-heading">Built to Work With<br>What You Already Use.</h2>
  <div class="logo-grid">
    <div class="logo-card">
      <img src="[logo_url]" alt="[Company]">
      <span class="brand-name">[Category]</span>
    </div>
    <!-- × 10 -->
  </div>
</section>
```

**CSS (5×2 SEAMLESS GRID — do not change column count on desktop)**
```css
.hardware { padding: 100px 60px; background: var(--bg-alt); }
.logo-grid {
  display: grid; grid-template-columns: repeat(5, 1fr);
  gap: 0; margin-top: 56px; border: 1px solid #e0e0e0;
}
.logo-card {
  background: #fff; border-right: 1px solid #e0e0e0; border-bottom: 1px solid #e0e0e0;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  padding: 40px 28px; gap: 16px; min-height: 140px;
  transition: background 0.25s, box-shadow 0.25s;
}
.logo-card:nth-child(5n) { border-right: none; }
.logo-card:nth-child(n+6) { border-bottom: none; }
.logo-card:hover { background: #fafafa; box-shadow: inset 0 0 0 1.5px #111; }
.logo-card img {
  max-width: 120px; max-height: 42px; object-fit: contain;
  filter: grayscale(100%); opacity: 0.5; transition: filter 0.3s, opacity 0.3s;
}
.logo-card:hover img { filter: grayscale(0%); opacity: 1; }
.brand-name {
  font-family: 'Inter', sans-serif; font-size: 10px; font-weight: 500;
  letter-spacing: 0.12em; text-transform: uppercase; color: #ccc; transition: color 0.25s;
}
.logo-card:hover .brand-name { color: #888; }
@media (max-width: 768px) { .logo-grid { grid-template-columns: repeat(2, 1fr); } }
```

**LOGO SOURCE PRIORITY**
1. `https://upload.wikimedia.org/wikipedia/commons/[path]` — SVG preferred
2. Company's official press/media CDN
3. Inline branded wordmark `<div>` using Sora font + company colour (last resort only)

---

### SECTION 7 — Core Benefits

**WHY THIS SECTION EXISTS**
Decision-makers need to justify the purchase internally. Give them 3 numbers they can put in a slide.
The "benefits statement" heading is a bold claim — not a feature, a result.
3 stats only — more than 3 dilutes impact. Each stat: one number + one label. No decorative text.

**INPUT VARIABLES**
- `section7_statement` — e.g. "The numbers speak for themselves."
- `stats[3]` — each: `{ value, label }` — e.g. `{ "95%", "False Alarm Reduction" }`

**OUTPUT PATTERN**
```html
<section class="benefits" id="benefits">
  <p class="benefits-statement">[section7_statement]</p>
  <div class="stats-row">
    <div class="stat-block">
      <div class="stat-num">[value]</div>
      <div class="stat-label">[label]</div>
    </div>
    <!-- × 3 -->
  </div>
</section>
```

**CSS**
```css
.benefits { padding: 100px 60px; background: var(--bg); }
.benefits-statement {
  font-family: 'Sora', sans-serif; font-size: clamp(2.4rem, 4vw, 4rem);
  font-weight: 800; line-height: 1.1; color: var(--dark);
  max-width: 700px; letter-spacing: -0.02em;
}
.stats-row { display: flex; border: 1px solid var(--border); margin-top: 64px; }
.stat-block { flex: 1; padding: 56px 40px; border-right: 1px solid var(--border); text-align: center; }
.stat-block:last-child { border-right: none; }
.stat-num {
  font-family: 'Sora', sans-serif; font-size: clamp(3.5rem, 6vw, 5.5rem); font-weight: 800; color: var(--dark);
}
.stat-label { font-family: 'Inter', sans-serif; font-size: 0.9rem; color: var(--gray); margin-top: 8px; }
```

**ASSET-OPTIONAL**: No assets needed.

---

### SECTION 8 — Use Cases

**WHY THIS SECTION EXISTS**
Dark background = contrast = urgency = high stakes.
This is where generic AI becomes specific to their exact problems.
Each use case follows the pattern: "You have this problem → here is exactly how we solve it."
The trusted source link at the bottom of each use case text block validates the problem's scale.

4 use cases is the right number: enough to show depth, not so many it becomes a list.
Alternating layout (image left/text right, text left/image right) creates rhythm and keeps the eye moving.

**INPUT VARIABLES**
- `usecases[4]` — each: `{ number, title, description, source_name, source_url, media_keyword }`
- Media from `assets/use-case/` — match by keyword. If absent: inline CSS animation or dark placeholder.

**OUTPUT PATTERN**
```html
<section class="use-case-section [reverse?]">
  <div class="use-case-media">
    <!-- asset, animation, or placeholder -->
  </div>
  <div class="use-case-text">
    <div class="uc-num">Use Case 0[N]</div>
    <h2>[title]</h2>
    <p>[description]</p>
    <a href="[source_url]" target="_blank" rel="noopener" class="uc-source-link">↗ [source_name]</a>
  </div>
</section>
```

**CSS**
```css
.use-case-section {
  display: grid; grid-template-columns: 1fr 1fr;
  min-height: 70vh; background: var(--bg);
  border-bottom: 1px solid var(--border);
}
.use-case-section.reverse { direction: rtl; }
.use-case-section.reverse > * { direction: ltr; }
.use-case-media { overflow: hidden; background: var(--bg-card); }
.use-case-media img, .use-case-media video { width:100%; height:100%; object-fit:cover; }
.use-case-text { padding: 80px 60px; display:flex; flex-direction:column; justify-content:center; background: var(--bg); }
.uc-num { font-size:11px; letter-spacing:0.2em; text-transform:uppercase; color: var(--blue); margin-bottom:24px; }
.use-case-text h2 {
  font-family:'Sora',sans-serif; font-size:clamp(1.8rem,2.8vw,2.8rem);
  font-weight:800; color:var(--dark); margin-bottom:24px; line-height:1.12; letter-spacing:-0.02em;
}
.use-case-text p {
  font-family:'Inter',sans-serif; font-size:1rem; line-height:1.8; color:var(--gray); max-width:460px;
}
.uc-source-link {
  display: inline-block; margin-top: 22px; font-size: 10.5px; font-weight: 600;
  letter-spacing: 0.1em; text-transform: uppercase; color: var(--blue);
  text-decoration: none; opacity: 0.75; transition: opacity 0.2s;
}
.uc-source-link:hover { opacity: 1; }
@media (max-width: 768px) {
  .use-case-section { grid-template-columns: 1fr; }
  .use-case-section.reverse { direction: ltr; }
  .use-case-text { padding: 56px 24px; }
}
```

**MEDIA STRATEGY (per use case)**
- If keyword-matched file exists in `assets/use-case/` → `<video>` or `<img>`
- If no file → build an **inline CSS/HTML animation** relevant to the use case topic
- Never leave a blank white box — always animated or illustrated

---

### SECTION 9 — Core Team

**WHY THIS SECTION EXISTS**
B2B purchasing is trust. The team section answers: "Who am I buying from? Are they credible?"
3 cards = intimate, not a corporate org chart. Each card shows: face → credentials → bio → proof points.
The credential chips (IIT / NIT / company names) are the fastest trust signals for Indian enterprise buyers.
Hover effect (colour reveal on photo) makes it feel alive.

**FIXED TEAM (same across all domains)**
- **Rakesh** — Co-founder, ML/AI/Engineering. B.Tech NIT Rourkela. EY, AI Monk, Dvara E-diary. $2M raised.
- **Rohit** — Co-founder, Product/GTM/Strategy. MBA IIM Indore. Hero Group, Zomato, Rapido.
- **Mohit** — Co-founder, Design/Systems. B.Tech IIT Delhi. EY, Deloitte.

**OUTPUT PATTERN**
```html
<section id="team">
  <div class="team-inner">
    <div class="team-header-block">
      <div class="section-label">Our Core Team</div>
      <h2 class="section-heading">The Minds Behind<br>the Platform.</h2>
      <p class="section-sub">[domain-appropriate 1–2 sentence description of team background]</p>
    </div>
    <div class="team-cards">
      <!-- 3 .tc cards — see construction/index.html for exact HTML -->
    </div>
  </div>
</section>
```

**CSS**
```css
#team { background: var(--bg); border-top: 1px solid var(--border); }
.team-inner { max-width: 1200px; margin: 0 auto; padding: 100px 72px; }
.team-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 64px; }
.tc { border: 1px solid var(--border); border-radius: 8px; overflow: hidden; transition: box-shadow 0.25s; }
.tc:hover { box-shadow: 0 8px 40px rgba(0,0,0,0.1); }
.tc-photo { aspect-ratio: 4/3; overflow: hidden; background: var(--bg-card); }
.tc-photo img { width:100%; height:100%; object-fit:cover; filter:grayscale(100%); transition:filter 0.4s; }
.tc:hover .tc-photo img { filter:grayscale(50%); }
.tc-body { padding: 24px 24px 28px; }
.tc-name { font-family:'Sora',sans-serif; font-size:1.4rem; font-weight:800; color:var(--dark); margin-bottom:10px; }
.tc-tags { display:flex; flex-wrap:wrap; gap:6px; margin-bottom:16px; }
.tc-tag {
  font-size:9px; font-weight:600; letter-spacing:0.12em; text-transform:uppercase;
  color:var(--gray); background:var(--bg-card); padding:4px 10px; border-radius:20px;
}
.tc-bio { font-size:0.875rem; line-height:1.7; color:var(--gray); margin-bottom:20px; }
.hl-college { border-bottom: 1.5px solid var(--amber); font-weight:600; }
.hl-company { border-bottom: 1.5px solid var(--blue); font-weight:600; }
.metric { color:var(--blue); font-weight:600; }
.tc-creds { display:flex; flex-wrap:wrap; gap:6px; padding-top:16px; border-top:1px solid var(--border); }
.tc-cred {
  font-size:9px; font-weight:600; letter-spacing:0.1em; text-transform:uppercase;
  padding:5px 10px; border-radius:4px; background:var(--bg-card); color:var(--gray);
}
.tc-cred.amber { background:rgba(217,119,6,0.08); color:var(--amber); }
@media (max-width: 768px) { .team-cards { grid-template-columns: 1fr; } }
```

**ASSET PATH**
Team photos: `./assets/Team/team_1.png`, `team_2.png`, `team_3.png`
If images are absent: use `<div class="tc-photo" style="background:var(--bg-card)"><!-- ADD: assets/Team/team_N.png --></div>`

---

### SECTION 10 — Full-Width Team Photo

**WHY THIS SECTION EXISTS**
After the team card credentials, the decision-maker wants to see the actual people.
Edge-to-edge = cinematic. No heading, no caption — just the image doing the work.
Optional section: omit entirely if no landscape photo exists.

**OUTPUT PATTERN**
```html
<section class="team-photo-full">
  <img src="./assets/Team/[landscape-photo]" alt="Yantra AI Labs Team">
</section>
```

**CSS**
```css
.team-photo-full { line-height: 0; }
.team-photo-full img { width: 100%; display: block; }
```

**ASSET-OPTIONAL**: If no landscape photo in `assets/Team/`, omit this section entirely. No placeholder needed.

---

### SECTION 11 — Footer

**WHY THIS SECTION EXISTS**
Every section on the page builds to a contact moment. The footer is the final anchor.
It's always present in scroll — a constant reminder that contact is available.
3 columns: identity (logo) · navigation · action (contact details + CTA).

**INPUT VARIABLES** (from domain config)
- Company name, contact name, mobile, email
- Logo (white/light version from `assets/Logo/`)

**OUTPUT PATTERN**
```html
<footer>
  <div class="footer-top">
    <div class="footer-brand">
      <div class="footer-logo"><!-- white logo or wordmark --></div>
      <p class="footer-tagline">AI for the physical world.</p>
    </div>
    <div class="footer-nav">
      <a href="#platform">Platform</a>
      <a href="#benefits">Results</a>
      <a href="contact.html">Get in Touch</a>
    </div>
    <div class="footer-contact">
      <p class="footer-contact-name">[Contact Name]</p>
      <a href="tel:[mobile]">[mobile]</a>
      <a href="mailto:[email]">[email]</a>
    </div>
  </div>
  <div class="footer-bottom">
    <span>© [year] Yantra AI Labs. All rights reserved.</span>
    <a href="contact.html" class="footer-cta">Request a Demo →</a>
  </div>
</footer>
```

**CSS**
```css
footer { background: var(--dark); color: rgba(255,255,255,0.6); padding: 80px 60px 40px; }
.footer-top { display: grid; grid-template-columns: 1.5fr 1fr 1.5fr; gap: 60px; margin-bottom: 60px; }
.footer-bottom { display:flex; justify-content:space-between; align-items:center; padding-top:28px; border-top:1px solid rgba(255,255,255,0.08); }
.footer-cta {
  font-family:'Inter',sans-serif; font-size:13px; font-weight:600;
  color:#fff; text-decoration:none; border:1px solid rgba(255,255,255,0.25);
  padding:10px 22px; border-radius:4px; transition:background 0.2s;
}
.footer-cta:hover { background:rgba(255,255,255,0.1); }
@media (max-width: 768px) { .footer-top { grid-template-columns: 1fr; } }
```

---

## contact.html Spec

Standalone page. Same visual language. No nav menu — just logo + back link.

- **Left (40%)**: Sales contact block — name, mobile, email + "2-hour response" promise
- **Right (60%)**: Form — Full Name*, Company*, Email*, Phone, Message, "Request a Demo" button
- On submit: JS success message `"Thank you! [Name] will reach out within 2 hours."`
- No backend. Form submit preventDefault + show success state.
- Link: `← Back to [Domain] Solutions` (links to `./index.html`)

---

## Asset-Optional Design Principle

**Rule**: Every section builds and displays correctly with zero assets.
**Rule**: When an asset is added to the correct folder, it replaces the placeholder — no code change needed.
**Rule**: Placeholder divs always contain a clear `<!-- ADD: assets/[folder]/[filename] -->` comment.

| Section | Asset | Placeholder Behaviour |
|---------|-------|----------------------|
| 2 — Video | `assets/video/*.mp4` | Dark div with text "ADD VIDEO → assets/video/" |
| 4 — Intelligence | `assets/IAAS/*.html` | Dark div with text "ADD INTELLIGENCE LAYER → assets/IAAS/" |
| 8 — Use Cases | `assets/use-case/*` | Inline CSS animation (never a blank box) |
| 9 — Team | `assets/Team/team_N.png` | Light gray div per card, no image tag |
| 10 — Team Photo | `assets/Team/[landscape]` | Section omitted entirely |
| 5 — Scale Steps | `assets/Scale/*` | 3 default steps hardcoded |
