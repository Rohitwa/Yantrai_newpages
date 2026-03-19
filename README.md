# Yantra AI Labs — Proposal Page System

A reusable static HTML proposal page builder for Yantra AI Labs.
Built from the canonical `construction/index.html`. Expandable to any AI product domain.

---

## What's in this folder

```
project-root/
│
├── CLAUDE.md                 ← Claude Code instructions (commands, brand rules, section map)
├── SKILL.md                  ← Full build spec: all 9 sections + CSS patterns
├── CONTEXT.md                ← Domain configs, company details, repo map, variable schema
├── COMMANDS.md               ← All slash command prompts (copy-paste ready)
├── HOOKS.md                  ← Session start/end/guard behaviour
├── README.md                 ← You are here
│
├── construction/
│   └── index.html            ← CANONICAL REFERENCE (2,175 lines)
│
├── security/
│   ├── index.html
│   ├── contact.html
│   └── assets/
│
├── retail/
│   ├── index.html
│   ├── contact.html
│   └── assets/
│
├── manufacturing/
│   ├── index.html
│   ├── contact.html
│   └── assets/
│
└── assets/                   ← Shared assets
    ├── Logo/                 ← Company logos (SVG preferred)
    ├── video/                ← Platform + workflow videos (MP4)
    ├── IAAS/                 ← Intelligence layer interactive HTML
    ├── use-case/             ← Workflow media (charts, images)
    ├── Scale/                ← Deployment steps content
    └── Team/                 ← Team card photos (portraits)
```

---

## Page Structure — 9 Sections

| # | Section | Key Design Pattern |
|---|---------|-------------------|
| 1 | Hero | Large heading, `.reactive` red strikethrough, insight stat modal, pill CTA |
| 2 | Platform Benefits | Video frame + 10 problem cards (2-column grid) |
| 3 | Intelligence Layer | Analogy box + interactive AI brain iframe |
| 4 | Deployment & Scale | **Horizontal 3-step timeline** with ghost numbers |
| 5 | Partner Logos | **5×2 seamless grid**, real logos, grayscale→colour on hover |
| 6 | Core Workflows | **3 alternating sections** with before/after panels + source links |
| 7 | Social Proof | **4 stat cards** in 2×2 grid with cited sources |
| 8 | Core Team | 3 team cards with credential chips |
| 9 | Footer + Contact Form | Brand/address (left) + embedded demo form (right) |

---

## The 3 Commands

```
╔═══════════════════════════════════════════════╗
║        YantrAI Page Builder — 3 Commands      ║
╠═══════════════════════════════════════════════╣
║  /sb [domain] "[tagline]"   Start & Build     ║
║  /verify                    Check the page    ║
║  /p&c "[message]"           Push & go live    ║
╚═══════════════════════════════════════════════╝
```

---

## Utility Commands

| Command | What it does |
|---------|-------------|
| `/section [N] [instructions]` | Rebuild only section N |
| `/fix [problem]` | Fix a specific issue |
| `/style [change]` | Apply a styling change |
| `/assets` | List all assets and their section mapping |
| `/scale-content` | Re-read Scale/ folder and update Section 4 |
| `/partner-logos [companies]` | Find and apply real logo images for Section 5 |
| `/preview` | Summarise what's currently built |
| `/init [domain]` | First-time setup check |

Full prompts for every command are in `COMMANDS.md`.

---

## Asset Requirements

| Folder | What to put here | Format | Section |
|--------|-----------------|--------|---------|
| `Logo/` | Company logo | SVG preferred, PNG ok | Nav, Footer |
| `video/` | Platform + workflow videos | MP4 preferred | Sec 2, 6 |
| `IAAS/` | Intelligence layer animation | HTML or GIF | Sec 3 |
| `use-case/` | Workflow media (charts, images) | Any image/HTML | Sec 6 |
| `Scale/` | Deployment phases text | TXT or MD | Sec 4 |
| `Team/` | Team card portrait photos | PNG or JPG | Sec 8 |

---

## Brand Rules (Quick Reference)

- **Fonts**: Sora (headings) + Inter (body) — always from Google Fonts
- **Palette**: White bg + Black text (main) · Black bg + White text (Workflows, Footer)
- **Accent**: Red `#e63030` — only on the `.reactive` word in the hero
- **Amber**: `#d97706` — eyebrow, workflow tags, team credential chips
- **No gradients. No purple. No rounded hero cards.**
- Hero + Nav CTA → `#contact` (embedded footer form)

---

## Current Domains

| Domain | Status | Live URL |
|--------|--------|----------|
| Construction | Built (canonical) | construction.yantrailabs.com |
| Security | Built | security.yantrailabs.com |
| Retail | Built | retail.yantrailabs.com |
| Manufacturing | Built | manufacturing.yantrailabs.com |
| Health | Planned | health.yantrailabs.com |
| Logistics | Planned | TBD |

**Company**: Yantra AI Labs
**Contact**: Rohit · +91 91231 02267 · rohit@yantrailabs.com
