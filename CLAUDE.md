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

## The 11 Sections (Fixed Architecture)

| # | Name | Background | Core Purpose |
|---|------|-----------|--------------|
| 1 | Hero | White | Stakes the transformation claim. Reactive word + insight stat. |
| 2 | Video | White | Silent proof. Show, don't tell. |
| 3 | Platform Overview | White | 8-card breadth. Answers: "what exactly does this do?" |
| 4 | Intelligence Layer | Black | The wow moment. AI brain visualization. |
| 5 | Deployment & Scale | Light gray | Removes implementation risk. 3-step timeline. |
| 6 | Partner Logos | Light gray | "Works with what I already use." 5×2 grid. |
| 7 | Core Benefits | White | Give them the numbers. 3 stat blocks. |
| 8 | Use Cases | Black `#0a0a0a` | "This is exactly our problem." 4 alternating sections. |
| 9 | Core Team | White | Trust. Who built this? 3-card design. |
| 10 | Full-width Photo | — | Humanise the company. Edge-to-edge. |
| 11 | Footer | Black | Always-present contact anchor. |

---

## Brand Rules (Non-Negotiable)

- **Fonts**: `Sora` (headings, 700/800) + `Inter` (body, 400/500) via Google Fonts
- **Palette**: White bg + Black text (main) · Black `#0a0a0a` bg + White text (Sections 8, 11)
- **Accent**: Red `#e63030` — only on `.reactive` strikethrough word in hero heading
- **Blue `#2563EB`** — CTA buttons, section labels, links only
- **Amber `#d97706`** — team credential chips only
- **No gradients. No purple. No rounded hero cards.**
- Hero CTA + Footer always link to `contact.html`
- Logo: dark version in header, light/white version in footer

If any rule fails → fix automatically before saving.

---

## Asset Rules

Assets are **optional at build time**. Every section has a working placeholder without them.
When assets exist they replace placeholders — no rebuild needed.

```
assets/
├── Logo/       Favicon + header logo + footer logo
├── video/      Section 2 hero video (.mp4 preferred)
├── IAAS/       Section 4 intelligence visualization (.html preferred, .gif fallback)
├── use-case/   Section 8 media (4 files, matched by keyword)
├── Scale/      Section 5 deployment step copy (.txt/.md/.rtf)
└── Team/       Section 9 team card photos + Section 10 landscape photo
```

**Priority rules:**
- `Logo/`: `.svg` > `.png` > `.jpg`
- `video/`: `.mp4` > `.webm`
- `IAAS/`: first `.html` → fallback `.gif`
- `use-case/`: match keyword (monitor / efficiency / threat / data) → fallback alphabetical
- `Team/`: portrait photos for Section 9 cards · landscape photo for Section 10

Always `ls ./assets/[folder]/` before writing any `src=` attribute.

---

## Key CSS Patterns (Do Not Break)

### Section 5 — Horizontal Timeline
```css
.timeline { display: flex; flex-direction: row; align-items: stretch; }
.timeline-item { flex: 1; padding: 48px 40px; border-right: 1px solid var(--border); }
.timeline-item:last-child { border-right: none; }
@media (max-width: 768px) { .timeline { flex-direction: column; } }
```

### Section 6 — 5×2 Logo Grid
```css
.logo-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 0; border: 1px solid #e0e0e0; }
.logo-card:nth-child(5n) { border-right: none; }
.logo-card:nth-child(n+6) { border-bottom: none; }
.logo-card img { filter: grayscale(100%); opacity: 0.5; transition: filter 0.3s, opacity 0.3s; }
.logo-card:hover img { filter: grayscale(0%); opacity: 1; }
```

### Section 9 — Team Cards (3-column)
```css
.team-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.team-inner { max-width: 1200px; margin: 0 auto; padding: 100px 72px; }
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
2. Section 5 is horizontal row on desktop
3. Section 6 is 5-column grid
4. Section 9 uses padded container (not full-bleed)
5. No brand rule violations
6. Missing assets listed with clear `<!-- ADD: filename -->` comments
