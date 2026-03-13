# COMMANDS.md — Yantra AI Labs Page Builder

## The 3 Commands

```
╔═══════════════════════════════════════════════════════════════╗
║              YantrAI Page Builder — 3 Commands                ║
╠═══════════════════════════════════════════════════════════════╣
║  /sb [domain] "[tagline]"   →  Start & Build the page         ║
║  /verify                    →  Check page across viewports    ║
║  /p&c "[commit message]"    →  Push & go live                 ║
╚═══════════════════════════════════════════════════════════════╝
```

**Print this table at the start of every `/sb` run.**
That's the only reminder the user needs.

---

---

## `/sb` — Start & Build

**Purpose**: Create a complete new domain page from scratch, or rebuild an existing one.
This is command 1 of 3.

### Trigger
```
/sb [domain] "[tagline]"

Examples:
  /sb health "AI for hospital operations"
  /sb retail "Make your retail decisions data-driven, not guesswork"
  /sb logistics "End-to-end fleet and warehouse intelligence"
```

### Execution Steps

```
1. PRINT the 3-command menu (always — so the user sees their workflow)

2. READ SKILL.md (full section specs)
   READ CONTEXT.md (domain configs, company details, repo map)

3. CHECK if a domain config exists in CONTEXT.md for [domain]
   - If YES: use it as the content source
   - If NO: ask the user for the 5 key inputs:
       a. Who is the audience? (1 sentence)
       b. What is the hero headline? (include the reactive word)
       c. 8 capability cards for Section 3 (icon + label + description)
       d. 3 deployment steps for Section 5
       e. 3 stats for Section 7

4. CREATE folder: ./[domain]/ if it doesn't exist

5. SCAN ASSETS
   Run ls on: ./[domain]/assets/Logo/
               ./[domain]/assets/video/
               ./[domain]/assets/IAAS/
               ./[domain]/assets/use-case/
               ./[domain]/assets/Scale/
               ./[domain]/assets/Team/
   Note which folders are populated. For empty folders: use asset-optional placeholders.
   Read any file in ./[domain]/assets/Scale/ for Section 5 content.

6. BUILD ./[domain]/index.html
   - All 11 sections per SKILL.md spec
   - Use canonical reference: construction/index.html for exact HTML/CSS patterns
   - Replace content variables with domain-specific data
   - Asset-optional: every section works without assets (see SKILL.md placeholders)
   - All paths relative to the [domain]/ folder root

7. BUILD ./[domain]/contact.html
   - Same visual language as main page
   - Contact details from CONTEXT.md
   - "← Back to [Domain] Solutions" links to ./index.html

8. RUN POST-BUILD VERIFICATION HOOK (see HOOKS.md)

9. PRINT BUILD SUMMARY:
   ✅ [domain]/index.html — 11 sections built
   ✅ [domain]/contact.html — form ready
   ⚠️  Missing assets: [list or "none — page works with placeholders"]
   📁 Output: ./[domain]/index.html

   Next: run /verify to check the page, then /p&c to push live.
```

---

## `/verify` — Verify

**Purpose**: Check the built page visually and structurally before going live.
This is command 2 of 3.

### Trigger
```
/verify

(No arguments — verifies the most recently built or edited page)
```

### Execution Steps

```
1. IDENTIFY the target page (most recently modified index.html in any domain folder)

2. START preview server (or use existing if running)

3. CHECK at 3 viewport sizes:
   a. Desktop  — 1280px wide
   b. Tablet   — 768px wide
   c. Mobile   — 375px wide
   Take a screenshot at each size.

4. VALIDATE BRAND RULES (fix automatically if any fail):
   ┌────────────────────────────────────────────────────────────┐
   │ Rule                          │ Pass / Fail                │
   ├────────────────────────────────────────────────────────────┤
   │ Sora + Inter fonts loaded     │                            │
   │ .reactive has red strikethrough│                           │
   │ Section 5 is horizontal row   │                            │
   │ Section 6 is 5-column grid    │                            │
   │ Section 8 bg = #0a0a0a        │                            │
   │ Section 9 is padded (not full-bleed) │                     │
   │ Hero CTA → contact.html       │                            │
   │ Footer → contact.html         │                            │
   │ No purple anywhere            │                            │
   │ No gradients in brand elements│                            │
   │ Mobile breakpoint present     │                            │
   │ No horizontal overflow        │                            │
   └────────────────────────────────────────────────────────────┘

5. CHECK ASSETS
   List every src= path and whether its file exists.
   Flag any missing files with the correct ADD instruction.

6. CHECK BROWSER CONSOLE for JS errors.

7. PRINT VERIFY SUMMARY:
   ✅ / ⚠️ / ❌ for each rule above
   📸 Screenshots taken at 375px, 768px, 1280px
   Missing assets: [list with ADD instructions or "none"]
   Brand violations fixed: [list or "none"]

   If all ✅: "Ready for /p&c"
   If any ❌: "Fix these before pushing"
```

---

## `/p&c` — Push & Commit

**Purpose**: Sync the built page to the correct YantrAILabs GitHub repo and confirm it's live.
This is command 3 of 3.

### Trigger
```
/p&c "[commit message]"

Examples:
  /p&c "Initial build — health domain page"
  /p&c "Add team section, fix mobile breakpoints"
  /p&c "Update Section 5 deployment steps"
```

### Execution Steps

```
1. DETERMINE domain from the most recently modified index.html folder

2. LOOK UP repo and live_url from CONTEXT.md repo map:
   construction → YantrAILabs/construction-solutions → construction.yantrailabs.com
   security     → YantrAILabs/security-solutions     → security.yantrailabs.com
   health       → YantrAILabs/health-solutions        → health.yantrailabs.com
   retail       → YantrAILabs/retail-solutions        → retail.yantrailabs.com

3. PREPARE sync directory:
   Clone target repo to /tmp/yantra-sync/[domain]-solutions/ (if not already cloned)
   OR: pull latest if already cloned

4. COPY files (preserve CNAME):
   - Copy [domain]/index.html → /tmp/yantra-sync/[domain]-solutions/index.html
   - Copy [domain]/contact.html → /tmp/yantra-sync/[domain]-solutions/contact.html (if exists)
   - Rsync [domain]/assets/ → /tmp/yantra-sync/[domain]-solutions/assets/
   - Copy shared assets/Team/ photos → /tmp/yantra-sync/[domain]-solutions/assets/Team/
   - Do NOT overwrite CNAME

5. FIX PATHS (standalone repo — no ../ references):
   - Replace ../assets/ → ./assets/
   - Replace ../[other-domain]/assets/Logo/ → ./assets/Logo/
   - Verify all src= and href= paths are relative to the repo root

6. COMMIT AND PUSH:
   git add -A
   git commit -m "[commit message]\n\nCo-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
   git push origin main

7. VERIFY LIVE (HTTP check):
   curl -s -o /dev/null -w "%{http_code}" "https://[live_url]"
   Expected: 200

8. PRINT PUSH SUMMARY:
   ✅ Pushed to: github.com/YantrAILabs/[domain]-solutions
   ✅ Live at: https://[live_url]
   📝 Commit: "[message]"
```

---
---

## Utility Commands

These are secondary commands for targeted edits. Use them between `/sb` and `/p&c`.

---

### `/section [N] [optional instructions]`
Rebuild or edit a single section without touching anything else.
```
/section 5 "update deployment steps from assets/Scale/"
/section 6 "add Procore and Oracle Construction logos"
/section 7 "change stats to 40%, 3×, 60%"
/section 8 "update use case 3 title and description"
```
Steps: read SKILL.md → open index.html → replace only Section N → verify section-specific rules → save.

---

### `/fix [description]`
Fix a specific bug or visual issue.
```
/fix reactive word not showing red
/fix section 8 background is white instead of black
/fix timeline showing vertically on desktop
/fix logo grid showing 2 columns on desktop
/fix team cards stacking to 1 column on tablet
/fix mobile overflow on hero section
```

---

### `/style [description]`
Apply a style change while maintaining all brand rules.
```
/style add scroll-triggered fade-in on section headings
/style increase hero font size on desktop
/style add a sticky progress bar at top
/style make team card photos taller
```

---

### `/assets`
Scan and report all available assets for the current domain.
```
/assets
```
Lists every file in assets/ subfolders, which section each maps to, and flags empty folders.

---

### `/scale-content`
Re-read `assets/Scale/` and update Section 5 with the latest deployment step content.
```
/scale-content
```

---

### `/partner-logos [optional: company list]`
Find real logo URLs and update Section 6.
```
/partner-logos
/partner-logos "Oracle, Procore, Bentley, Trimble, Hexagon"
```
For each company: search Wikimedia Commons for SVG first → company press CDN → branded wordmark fallback.

---

### `/preview`
Summarise the current page state without modifying files.
```
/preview
```
Prints a section-by-section summary: content, assets used, placeholders, brand violations.

---

### `/init`
First-time check for a domain folder. Confirms asset folder structure and prints readiness.
```
/init health
```
Creates missing asset subfolders, prints ✅/⚠️/❌ readiness table, recommends next command.
