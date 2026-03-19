# CLAUDE.md — Yantra AI Labs Page Builder

## What This System Is

A reusable static HTML proposal page system for **Yantra AI Labs**.
Each domain gets its own standalone page: pure HTML + CSS + JS. No build tools, no backend.

**Canonical Reference Page**: `construction/index.html`
Every new domain is built from this reference — same layout, same CSS, new content.

---

## The 3 Commands

Every page build is exactly 3 commands. Nothing more.

```
╔═══════════════════════════════════════════════╗
║        YantrAI Page Builder — 3 Commands      ║
╠═══════════════════════════════════════════════╣
║  /sb [domain] "[tagline]"   Start & Build     ║
║  /verify                    Check the page    ║
║  /p&c "[message]"           Push & go live    ║
╚═══════════════════════════════════════════════╝
```

| Command | What It Does |
|---------|-------------|
| `/sb [domain] "[tagline]"` | Reads SKILL.md + CONTEXT.md, scans assets, builds index.html + contact.html from scratch |
| `/verify` | Opens preview at 375px / 768px / 1280px, validates all brand rules, lists missing assets |
| `/p&c "[message]"` | Syncs to the correct YantrAILabs GitHub repo, fixes paths, commits, pushes, confirms live URL |

These 3 commands are printed at the start of every `/sb` run so you always have them on screen.

---

## Pre-Session Checklist

At the start of every session, before executing any command:
1. Read `SKILL.md` (section specs) and `CONTEXT.md` (domain config + repos)
2. Run `ls` on each asset subfolder — never hardcode filenames
3. Report asset status + whether index.html exists
4. Await an explicit command — do not auto-build

---

## The 9 Sections (Fixed Architecture)

> Derived from the canonical `construction/index.html`. Every new domain copies this exact structure.

| # | ID / Class | Name | Background | Core Purpose |
|---|-----------|------|-----------|--------------|
| — | `nav` | Sticky Nav | White (frosted blur) | Logo + domain label + CTA. Always visible. |
| 1 | `#hero` | Hero | White | Stakes the transformation claim. Reactive word + insight stat modal + CTA to `#contact`. |
| 2 | `#benefits` | Platform Benefits | Light gray `#f5f5f5` | Video proof + problem areas grid (10 cards, 2-column). Shows breadth of capability. |
| 3 | `#intelligence` | Intelligence Layer | White | "How It Works" — analogy box + interactive AI brain iframe. The wow moment. |
| 4 | `.implementation-wrap` | Deployment & Scale | Light gray `#f5f5f5` | 3-step horizontal timeline. Removes implementation risk. |
| 5 | `.hardware-wrap` | Partner Logos | Light gray `#f5f5f5` | "Works with what I already use." 5×2 seamless grid, grayscale→colour. |
| 6 | `.workflow-intro-wrap` + `.workflow-section`×3 | Core Workflows | Black `#0a0a0a` | 3 workflows with before/after panels + trusted source links. Alternating layout. |
| 7 | `#results` | Social Proof | White | 4 stat cards with sources in 2×2 grid. Give them numbers for the internal slide. |
| 8 | `#team` | Core Team | White | Trust. Who built this? 3-card design with credential chips. |
| 9 | `#contact` (footer) | Footer + Contact Form | Black `#0a0a0a` | Brand/address (left) + embedded demo request form (right) + bottom bar. |

---

## Brand Rules (Non-Negotiable)

- **Fonts**: `Sora` (headings, 700/800) + `Inter` (body, 400/500) via Google Fonts
- **Palette**: White bg + Black text (main) · Black `#0a0a0a` bg + White text (Sections 6, 9)
- **Accent**: Red `#e63030` — only on `.reactive` strikethrough word in hero heading
- **Amber `#d97706`** — hero eyebrow, workflow tags, team credential chips, chart accents
- **No gradients. No purple. No rounded hero cards.**
- Hero CTA links to `#contact` (embedded footer form). Nav CTA links to `#contact`.
- Logo: dark version in header, inverted (brightness(0) invert(1)) in footer
- Hero insight stat opens a **modal popup** with source chart image

If any rule fails → fix automatically before saving.

---

## Asset Rules

Assets are **optional at build time**. Every section has a working placeholder without them.
When assets exist they replace placeholders — no rebuild needed.

```
assets/
├── Logo/       Favicon + header logo + footer logo (inverted for dark bg)
├── video/      Section 2 platform video + Section 6 workflow videos (.mp4 preferred)
├── IAAS/       Section 3 intelligence visualization (.html preferred, .gif fallback)
├── use-case/   Section 6 workflow media (3 files, matched by keyword)
├── Scale/      Section 4 deployment step copy (.txt/.md/.rtf)
└── Team/       Section 8 team card photos (portraits only)
```

**Priority rules:**
- `Logo/`: `.svg` > `.png` > `.jpg`
- `video/`: `.mp4` > `.webm`
- `IAAS/`: first `.html` → fallback `.gif`
- `use-case/`: match by workflow keyword → alphabetical fallback
- `Team/`: portrait photos for team cards (no separate full-width photo section)

Always `ls ./assets/[folder]/` before writing any `src=` attribute.

---

## Key CSS Patterns (Do Not Break)

### Section 4 — Horizontal Timeline
```css
.timeline { display: flex; flex-direction: row; align-items: stretch; }
.timeline-item { flex: 1; padding: 48px 40px; border-right: 1px solid var(--border); }
.timeline-item:last-child { border-right: none; }
@media (max-width: 768px) { .timeline { flex-direction: column; } }
```

### Section 5 — 5×2 Logo Grid
```css
.logo-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 0; border: 1px solid #e0e0e0; }
.logo-card:nth-child(5n) { border-right: none; }
.logo-card:nth-child(n+6) { border-bottom: none; }
.logo-card img { filter: grayscale(100%); opacity: 0.5; transition: filter 0.3s, opacity 0.3s; }
.logo-card:hover img { filter: grayscale(0%); opacity: 1; }
```

### Section 6 — Workflow Sections (Alternating 2-column)
```css
.workflow-section { display: grid; grid-template-columns: 1fr 1fr; min-height: 75vh; background: #0a0a0a; }
.workflow-section.flip { direction: rtl; }
.workflow-section.flip > * { direction: ltr; }
/* Before/After comparison panels inside each workflow */
.wf-before-after { display: flex; gap: 0; }
.wf-col { flex: 1; padding: 20px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); }
```

### Section 7 — Social Proof (2×2 Results Grid)
```css
.results-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1px; background: var(--border); border: 1px solid var(--border); }
.result-card { background: var(--bg); padding: 48px 44px; }
```

### Section 8 — Team Cards (3-column)
```css
.team-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.team-inner { max-width: 1100px; margin: 0 auto; padding: 100px 60px; }
```

### Section 9 — Footer with Embedded Contact Form
```css
.footer-top { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; } /* brand left, form right */
```

---

## Repo Mapping (GitHub Pages)

| Domain | Local Folder | GitHub Repo | Live URL |
|--------|-------------|-------------|----------|
| construction | `construction/` | `YantrAILabs/construction-solutions` | construction.yantrailabs.com |
| security | `security/` | `YantrAILabs/security-solutions` | security.yantrailabs.com |
| health | `health/` | `YantrAILabs/health-solutions` | health.yantrailabs.com |
| retail | `retail/` | `YantrAILabs/retail-solutions` | retail.yantrailabs.com |

`/p&c` reads this table to determine the correct push target automatically.

---

## Post-Build Verification Checklist

After every `/sb` or `/p&c`:
1. Every `src=` path has a matching file in assets (or is a valid external URL)
2. Section 4 timeline is horizontal row on desktop
3. Section 5 logo grid is 5 columns on desktop
4. Section 6 workflows alternate layout (normal → flip → normal)
5. Section 7 results grid is 2×2 on desktop
6. Section 8 team uses padded container (not full-bleed)
7. Section 9 footer has embedded contact form (not just links)
8. No brand rule violations
9. Missing assets listed with clear `<!-- ADD: filename -->` comments
10. Chart.js loaded for interactive workflow charts (if applicable)
