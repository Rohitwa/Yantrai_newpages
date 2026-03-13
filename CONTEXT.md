# CONTEXT.md — Yantra AI Labs Page System

## What This System Is

A reusable static HTML proposal page builder for **Yantra AI Labs**.
Every domain page is built from the same 11-section architecture. Same CSS. New content.

**Canonical Reference**: `construction/index.html`
This is the most complete, production-grade page in the system.
All future domains use this as their structural and stylistic template.

---

## Company Details (Shared Across All Domains)

```yaml
company: "Yantra AI Labs"
tagline: "AI for the physical world."
contact:
  name: "Rohit"
  mobile: "+91 91231 02267"
  email: "rohit@yantrailabs.com"
  response_promise: "2 hours"
```

---

## Canonical Domain: Construction

> **This is the reference implementation. Read `construction/index.html` to understand every pattern.**

```yaml
domain: construction
folder: construction/
github_repo: YantrAILabs/construction-solutions
live_url: https://construction.yantrailabs.com
output_file: construction/index.html
audience: "Project Directors, Site Managers, CEOs at mid-to-large construction firms"

hero:
  eyebrow: "For Construction Companies"
  headline: "Make your decisions proactive, not reactive."
  reactive_word: "reactive"
  sub: |
    A site officer who spots risks before they become incidents.
    A project head who reviews 12 live sites without leaving his desk.
    A CEO whose entire portfolio is visible in one dashboard — not next week's report.
  insight_stat: "Over 60% of current jobs in Sales, Architecture & Engineering, Legal, and Office & Admin can be autonomously handled by AI models today"
  insight_source: "Anthropic Economic Index"
  insight_url: "https://www.anthropic.com/research/labor-market-impacts"

section3:
  heading: "One Platform. All Construction Solutions."
  subtext: "From site safety to project delivery — every layer of your operations, made intelligent."
  cards:
    - { icon: "🏗️", label: "Site Safety Monitoring", desc: "Real-time hazard detection across active construction zones" }
    - { icon: "📊", label: "Project Progress Tracking", desc: "AI-driven milestone visibility across every site" }
    - { icon: "🔧", label: "Equipment Intelligence", desc: "Predictive maintenance and utilisation analytics" }
    - { icon: "👷", label: "Workforce Management", desc: "Attendance, certification, and productivity insights" }
    - { icon: "📋", label: "Compliance & Permits", desc: "Automated documentation and regulatory tracking" }
    - { icon: "💰", label: "Cost & Budget Control", desc: "Real-time variance alerts before overruns happen" }
    - { icon: "🌦️", label: "Weather & Risk Planning", desc: "AI scheduling adjusted for site conditions" }
    - { icon: "📡", label: "Subcontractor Coordination", desc: "Unified communication and delivery tracking" }

section5:
  heading: "From Day 1 to Full Scale."
  steps:
    - { num: "01", title: "Connect Your Sites", desc: "Integrate with existing sensors, cameras, ERP, and project management tools — no rip-and-replace." }
    - { num: "02", title: "AI Learns Your Operations", desc: "Models trained on your historical data, site layouts, and workflows. Live within 4 weeks." }
    - { num: "03", title: "Deploy Across Your Portfolio", desc: "Roll out to every site. Dashboards for every level — from site officer to CEO." }

section6:
  heading: "Built to Work With What You Already Use."
  partners:
    - { name: "Autodesk", category: "BIM & Design", logo: "https://cdn.worldvectorlogo.com/logos/autodesk.svg" }
    - { name: "SAP", category: "ERP", logo: "https://upload.wikimedia.org/wikipedia/commons/5/59/SAP_2011_logo.svg" }
    - { name: "Microsoft Azure", category: "Cloud", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg" }
    - { name: "AWS", category: "Cloud", logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" }
    - { name: "OpenAI", category: "AI Models", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg" }
    - { name: "Anthropic", category: "AI Safety", logo: "https://cdn.simpleicons.org/anthropic/000000.svg" }
    - { name: "Slack", category: "Communication", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Slack_Technologies_Logo.svg" }
    - { name: "Google Cloud", category: "Cloud", logo: "https://upload.wikimedia.org/wikipedia/commons/0/01/Google-cloud-platform.svg" }
    - { name: "n8n", category: "Automation", logo: "https://cdn.simpleicons.org/n8n/000000.svg" }
    - { name: "Procore", category: "Project Mgmt", logo: "wordmark" }

section7:
  statement: "The numbers speak for themselves."
  stats:
    - { value: "40%", label: "Reduction in project delays" }
    - { value: "3×", label: "Faster incident response" }
    - { value: "60%", label: "Drop in safety violations" }

section8:
  usecases:
    - { num: "01", title: "Real-Time Site Safety.", desc: "AI detects hazards — missing PPE, unsafe proximity, unplanned access — the moment they happen.", source: "OSHA — Construction Safety Statistics", url: "https://www.osha.gov/data/commonstats", media: "wf1" }
    - { num: "02", title: "Project Intelligence Dashboard.", desc: "One view of every site, every milestone, every delay risk. AI surfaces what needs your attention today.", source: "McKinsey — The Next Normal in Construction", url: "https://www.mckinsey.com/industries/capital-projects-and-infrastructure/our-insights/reinventing-construction-through-a-productivity-revolution", media: "wf2" }
    - { num: "03", title: "Predictive Delay Prevention.", desc: "AI models flag delay indicators 3–5 weeks before they materialise. Act before the schedule slips.", source: "KPMG — Global Construction Survey", url: "https://kpmg.com/xx/en/home/industries/infrastructure/global-construction-survey.html", media: "wf3" }
    - { num: "04", title: "Workforce & Compliance Automation.", desc: "Attendance, certifications, permit-to-work — automated, auditable, always current.", source: "ILO — Construction Sector Safety Report", url: "https://www.ilo.org/global/industries-and-sectors/construction/lang--en/index.htm", media: "wf4" }
```

---

## Active Domains

### Security

```yaml
domain: security
folder: security/
github_repo: YantrAILabs/security-solutions
live_url: https://security.yantrailabs.com
output_file: security/index.html
audience: "CISOs, Security Directors, Facility Managers at campuses, manufacturing plants, institutions"

hero:
  headline: "Make your security preventive, not reactive."
  reactive_word: "reactive"
  insight_stat: "AI and automation detect and contain incidents 108 days faster — saving $2.22M per breach on average"
  insight_source: "IBM Cost of a Data Breach Report"
  insight_url: "https://www.ibm.com/reports/data-breach"

section3:
  heading: "One Platform. All Security Solutions."
  cards: [8 Vision AI physical security capabilities]

section7:
  stats:
    - { value: "95%", label: "False Alarm Reduction" }
    - { value: "10×", label: "Faster Threat Response" }
    - { value: "24/7", label: "Autonomous Monitoring" }

section8:
  usecases:
    - { num: "01", title: "24/7 Intelligent Security Monitoring.", source: "Genetec — State of Physical Security Report", url: "https://www.genetec.com/resources/guides/state-of-physical-security-report" }
    - { num: "02", title: "Operational Efficiency at Scale.", source: "CISA — Physical Security Guidance", url: "https://www.cisa.gov/topics/physical-security" }
    - { num: "03", title: "Proactive Threat Response.", source: "IBM Security — Cost of a Data Breach Report 2024", url: "https://www.ibm.com/reports/data-breach" }
    - { num: "04", title: "Data-Driven Security Decisions.", source: "ASIS International — Security Management", url: "https://www.asisonline.org/asis-publications/security-management/" }
```

---

## Future Domains (To Be Built)

```yaml
domains_planned:
  - name: health
    folder: health/
    github_repo: YantrAILabs/health-solutions
    live_url: https://health.yantrailabs.com
    audience: "Hospital CEOs, CMOs, Operations Directors at large healthcare networks"
    reactive_word: "reactive"   # "Make your diagnostics proactive, not reactive"
    hero_noun: "diagnostics"

  - name: retail
    folder: retail/
    github_repo: YantrAILabs/retail-solutions
    live_url: https://retail.yantrailabs.com
    audience: "Retail Chain Directors, Operations VPs, Store Network Managers"
    reactive_word: "guesswork"  # "Make your retail decisions data-driven, not guesswork"
    hero_noun: "decisions"

  - name: logistics
    folder: logistics/
    github_repo: YantrAILabs/logistics-solutions
    live_url: TBD
    audience: "Fleet Operations Directors, Warehouse Managers, Supply Chain VPs"
    reactive_word: "reactive"

  - name: manufacturing
    folder: manufacturing/
    github_repo: YantrAILabs/manufacturing-solutions
    live_url: TBD
    audience: "Plant Directors, Quality Managers, VP Operations at industrial manufacturers"
    reactive_word: "reactive"
```

---

## Repo Structure

```
/Users/rohitsingh/Desktop/Claude_security/   ← Project Root
├── construction/
│   └── index.html                           ← CANONICAL REFERENCE
├── security/
│   ├── index.html
│   ├── contact.html
│   └── assets/
├── health/                                  ← to be created
├── retail/                                  ← to be created
├── assets/                                  ← shared assets (Team, Logo)
├── CLAUDE.md
├── SKILL.md
├── CONTEXT.md
├── COMMANDS.md
└── HOOKS.md
```

**Sync target** (for `/p&c`):
```
/tmp/yantra-sync/[domain]-solutions/   ← cloned YantrAILabs repo
```

---

## Domain Variable Config Schema

When building a new domain, fill in this schema then run `/sb`:

```yaml
domain: "[name]"                            # used in folder name and file paths
folder: "[name]/"
github_repo: "YantrAILabs/[name]-solutions"
live_url: "https://[name].yantrailabs.com"
audience: "[who buys this — 1 sentence]"

hero:
  eyebrow: "For [Industry] Companies"
  headline: "Make your [noun] [positive], not [reactive_word]."
  reactive_word: "[old way of doing things]"
  sub: "[2–3 sentences: paint the before/after transformation in vivid, specific terms]"
  insight_stat: "[1 sentence with a hard number from a trusted published source]"
  insight_source: "[Source name]"
  insight_url: "[Direct URL to source]"

section3:
  heading: "One Platform. All [Industry] Solutions."
  subtext: "[1–2 sentences]"
  cards: 8 × { icon, label, desc }

section5:
  heading: "[Action phrase]. [Outcome phrase]."
  steps: 3 × { num, title, desc }

section6:
  heading: "Built to Work With What You Already Use."
  partners: 10 × { name, category, logo_url }

section7:
  statement: "[Bold claim — not a feature, a result]"
  stats: 3 × { value, label }

section8:
  usecases: 4 × { num, title, desc, source_name, source_url, media_keyword }

team_sub: "[1–2 sentences about the team's relevant background for this domain]"
```
