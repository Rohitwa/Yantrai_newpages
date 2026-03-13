# HOOKS.md — Yantra AI Labs Page Builder

Hooks are automatic behaviors that fire at specific moments.
They enforce consistency without requiring manual checks.

---

## SESSION START HOOK

**Fires**: At the beginning of every session, before any command.

```
1. READ SKILL.md and CONTEXT.md silently
2. IDENTIFY the domain being worked on (from recent file edits or ask)
3. SCAN asset folders for that domain:
     ls ./[domain]/assets/Logo/
     ls ./[domain]/assets/video/
     ls ./[domain]/assets/IAAS/
     ls ./[domain]/assets/use-case/
     ls ./[domain]/assets/Scale/
     ls ./[domain]/assets/Team/
4. REPORT one-line status:
   - Asset folders: populated / empty
   - index.html: exists / missing
   - contact.html: exists / missing
5. PRINT the 3-command reminder:
   ╔══════════════════════════════════════════════╗
   ║  /sb [domain]  →  Build                     ║
   ║  /verify       →  Check                     ║
   ║  /p&c "msg"    →  Push live                 ║
   ╚══════════════════════════════════════════════╝
6. AWAIT command — do not auto-build.
```

---

## POST-BUILD HOOK

**Fires**: After every `/sb` command, before printing the build summary.

```
1. COUNT sections in the built index.html — must be exactly 11
2. VERIFY layout patterns:
   - Section 5 .timeline → flex-direction: row (horizontal)
   - Section 6 .logo-grid → grid-template-columns: repeat(5, 1fr) (5 columns)
   - Section 9 .team-inner → padding: 100px 72px (padded container, not full-bleed)
3. VERIFY brand rules (all must pass):
   - Sora + Inter fonts in <head>
   - .reactive has color:#e63030 and text-decoration:line-through
   - Section 8 has background:#0a0a0a or black
   - No purple, violet, or #8b5cf6 anywhere
   - No linear-gradient or radial-gradient on brand elements
   - Hero CTA and footer both link to contact.html
   - @media (max-width: 768px) block is present
4. VERIFY asset paths:
   - Every src= path either: (a) matches a file in assets/, or (b) is a valid external URL
   - Placeholder divs have <!-- ADD: ... --> comment
5. PRINT summary:
   ✅ [domain]/index.html — 11 sections built
   ✅ [domain]/contact.html — form ready
   ⚠️  Missing assets: [list or "none"]
   Next: /verify → /p&c
```

---

## POST-SECTION HOOK

**Fires**: After every `/section [N]` command.

```
1. CONFIRM which section was modified (print section number and heading)
2. CONFIRM no other sections changed (diff check)
3. VALIDATE section-specific rules:
   - If Section 5: timeline is horizontal row
   - If Section 6: logo-grid is 5 columns
   - If Section 8: background is #0a0a0a, text is white
   - If Section 9: team-inner has padding, not full-bleed
4. PRINT: ✅ Section [N] updated — no other sections modified
```

---

## STYLE GUARD HOOK

**Fires**: Before saving any HTML file.
**Action**: Fix violations automatically, then save. Never save a failing file.

| Rule | Check | Auto-Fix |
|------|-------|----------|
| Fonts | `<link>` for Sora + Inter in `<head>` | Add the Google Fonts link |
| Reactive span | `.reactive` has `color:#e63030` + `text-decoration:line-through` | Add/correct the CSS |
| Section 5 layout | `.timeline` has `flex-direction: row` | Fix to row |
| Section 6 layout | `.logo-grid` has `repeat(5, 1fr)` | Fix column count |
| Section 8 bg | `#0a0a0a` or `black` | Fix background |
| Section 8 text | `white` or `rgba(255,255,255,x)` | Fix text color |
| Section 9 padding | `.team-inner` not full-bleed | Add padding |
| CTA links | Hero + footer → `contact.html` | Fix href values |
| No purple | No purple/violet/`#8b5cf6` | Remove/replace |
| No brand gradients | No gradient on non-media elements | Remove |
| Mobile breakpoint | `@media (max-width: 768px)` present | Add if missing |

---

## ASSET PATH HOOK

**Fires**: Before writing any `src=` or `href=` attribute pointing to `./assets/`.

```
1. RUN ls ./[domain]/assets/[folder-name]/
2. USE exact filenames from the output — never guess
3. IF folder is empty:
   - Do NOT write a broken src= path
   - Write an asset-optional placeholder (see SKILL.md)
   - Add: <!-- ADD: assets/[folder]/[expected-filename] -->
4. APPLY priority rules:
   Logo/      → .svg > .png > .jpg
   video/     → .mp4 > .webm
   IAAS/      → first .html → fallback first .gif
   use-case/  → match keyword (monitor/efficiency/threat/data) → alphabetical fallback
   Team/      → portraits for Section 9 · landscape for Section 10
```

---

## VERIFICATION HOOK

**Fires**: After any file edit while a preview server is running.

```
1. RELOAD the preview page
2. SCROLL to the modified section
3. TAKE a screenshot
4. CHECK browser console for JS errors
5. CONFIRM layout with DOM inspection (dimensions, computed styles)
6. REPORT: ✅ Section [N] looks correct / ⚠️ [issue found]
```

---

## ASSET-OPTIONAL HOOK

**Fires**: When any asset folder is empty during build.

```
For each empty folder, use the correct placeholder per SKILL.md:

assets/video/    → dark placeholder div, text: "ADD VIDEO → assets/video/"
assets/IAAS/     → dark placeholder div, text: "ADD INTELLIGENCE LAYER → assets/IAAS/"
assets/use-case/ → inline CSS animation (domain-appropriate, never blank)
assets/Team/     → light gray div per card, no image tag
assets/Scale/    → use 3 default deployment steps from SKILL.md
assets/Logo/     → Sora font wordmark "Yantra AI Labs" as text fallback

Section 10 (full-width photo) → OMIT ENTIRELY if assets/Team/ has no landscape photo
```

---

## PATH FIX HOOK

**Fires**: During every `/p&c` command, before committing to the target repo.

```
The domain page lives in ./[domain]/index.html locally.
When pushed to the standalone YantrAILabs repo, it becomes the root index.html.
Paths must be corrected before pushing.

REPLACE:
  ../assets/      → ./assets/
  ../[domain]/assets/Logo/ → ./assets/Logo/
  ../[other]/     → ./assets/ (case by case)

DO NOT TOUCH:
  ./assets/       (already correct for standalone repo)
  https://        (external URLs — never modify)
  CNAME           (preserve exactly)

VERIFY after replacement: no ../ remains in src= or href= attributes.
```

---

## ERROR HOOK

| Error | Action |
|-------|--------|
| Asset folder missing | Create it + `.gitkeep`. Print: `⚠️ Created empty: assets/[name]/ — add your file here` |
| Scale content unreadable | Use 3 default steps from SKILL.md. Note it in output. |
| Video not found | Dark placeholder div with ADD instruction |
| IAAS file not found | Dark placeholder div with ADD instruction |
| Use-case media not found | Inline CSS animation (domain-relevant). Never blank white box. |
| Logo URL fails (img.naturalWidth = 0) | Replace with branded Sora wordmark div |
| Team image not found | Light gray placeholder div with ADD comment |
| Git push 403 forbidden | Print: "🔒 Access denied to YantrAILabs/[repo]. Ask the repo owner to add your GitHub account." |
| Path fix missed ../ | Halt /p&c, fix paths, retry push |

---

## DOMAIN EXPANSION HOOK

**Fires**: When `/sb` is run for a domain not yet in CONTEXT.md.

```
1. OPEN construction/index.html as the structural template (canonical reference)
2. COPY all CSS verbatim — do not redesign, do not add new patterns
3. IDENTIFY all domain-variable content zones (see CONTEXT.md Domain Variable Config Schema)
4. FILL those zones with domain-appropriate content
5. KEEP all section IDs, class names, and layout patterns identical to construction
6. VERIFY the new page passes the full Style Guard before saving
7. ADD the new domain config to CONTEXT.md after building
```
