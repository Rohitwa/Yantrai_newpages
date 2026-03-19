# CONTEXT.md — Yantra AI Labs Page System

## What This System Is

A reusable static HTML proposal page builder for **Yantra AI Labs**.
Every domain page is built from the same 9-section architecture. Same CSS. New content.

**Canonical Reference**: `construction/index.html`
This is the most complete, production-grade page in the system.
All future domains use this as their structural and stylistic template.

---

## Company Details (Shared Across All Domains)

```yaml
company: "Yantra AI Labs"
tagline: "AI for the physical world."
address: "YantrAI Labs, SAS Towers, Sector 38, Gurgaon, Haryana — 122018, India"
website_url: "https://rohitwa.github.io/Yantrai_newpages/"
website_label: "yantrailabs.com"
contact:
  name: "Rohit"
  mobile: "+91 91231 02267"
  email: "rohit@yantrailabs.com"
  response_promise: "2 hours"
```

---

## Fixed Core Team (Same Across All Domains)

```yaml
team:
  - name: "Rakesh"
    tags: ["AI", "ML", "Engineering"]
    bio: "B.Tech, NIT Rourkela '13 · EY, AI Monk, Dvara E-diary · $2M raised"
    highlights:
      colleges: ["NIT Rourkela"]
      companies: ["EY", "AI Monk", "Dvara E-diary"]
      metrics: ["$2M raised"]
    creds: [{ label: "NIT Rourkela", style: "amber" }, { label: "Patented AI" }, { label: "EY · AI Monk" }]
    photo: "team_1.png"

  - name: "Rohit"
    tags: ["Business", "GTM", "Product"]
    bio: "B.Tech, NIT Rourkela '12 · Hero Group · EasyLokal ~$100K (Techstars) → WayCool · Zomato 1.5M txns/month"
    highlights:
      colleges: ["NIT Rourkela"]
      companies: ["Hero Group", "WayCool", "Zomato"]
      metrics: ["~$100K (Techstars)"]
    creds: [{ label: "NIT Rourkela", style: "amber" }, { label: "Techstars" }, { label: "Hero · Zomato" }]
    photo: "team_2.png"

  - name: "Mohit"
    tags: ["Strategy", "Business", "AI"]
    bio: "B.Tech, IIT Delhi '12 · Hero Group $200M+ · Jangid Motors $5M ARR · Oye! Rickshaw 100k+ txns/day, $12M raised (Matrix, Xiaomi)"
    highlights:
      colleges: ["IIT Delhi"]
      companies: ["Hero Group", "Jangid Motors", "Oye! Rickshaw"]
      metrics: ["$200M+", "$5M ARR", "$12M raised"]
    creds: [{ label: "IIT Delhi", style: "amber" }, { label: "Jangid Motors" }, { label: "Oye Rickshaw" }, { label: "Hero Group" }]
    photo: "team_3.png"
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

nav:
  domain_label: "Construction AI"
  cta_text: "Book a Demo"

hero:
  eyebrow: "For Construction Companies"
  headline: "Make your decisions proactive, not reactive."
  reactive_word: "reactive"
  sub: >
    A site officer who spots risks before they become incidents.
    A project head who reviews 12 live sites without leaving his desk.
    A CEO whose entire portfolio is visible in one dashboard — not next week's report.
    This is what AI integration delivers: a 10× leap in how construction organisations sense, decide, and act.
  insight_stat: "Over 60% of current jobs in Sales, Architecture & Engineering, Legal, and Office & Admin can be autonomously handled by AI models today"
  insight_source: "Anthropic Economic Index"
  insight_url: "https://www.anthropic.com/research/labor-market-impacts"
  insight_chart_image: "https://cdn.sanity.io/images/4zrzovbb/website/c1952c81bca02a7c8cc05ef7801e67ca60831c55-4096x4096.png"
  insight_chart_title: "Figure 2 — Theoretical capability vs. observed AI exposure by occupational category"
  insight_chart_caption: "Share of job tasks that LLMs could theoretically perform (blue) and observed AI usage coverage (red) — across 20 occupational categories. Source: Anthropic Economic Index, 2025."

section2_benefits:
  heading: "Multi-use cases, One platform"
  sub: "From the moment a worker steps on site to the boardroom reporting — every layer of your construction operation becomes measurable, manageable, and predictable."
  video_file: "Construction.mp4"
  video_caption: "How we leverage vision AI to monitor and maintain security & safety across your construction sites"
  problems:
    - { icon: "💰", tag: "Project Management", title: "Cost Overruns & Schedule Collapse" }
    - { icon: "🦺", tag: "Safety", title: "Worksite Fatalities & Hazard Blindness" }
    - { icon: "📐", tag: "Architecture & Design", title: "Design Errors & Rework Cascades" }
    - { icon: "👷", tag: "Workforce Management", title: "Labour Shortage & Skills Gap" }
    - { icon: "📋", tag: "Compliance & Legal", title: "Permitting Delays & Regulatory Risk" }
    - { icon: "🚛", tag: "Supply Chain & Ops", title: "Material Procurement & Supply Chain Failure" }
    - { icon: "⚖️", tag: "Legal & Contracts", title: "Dispute Management & Contract Risk" }
    - { icon: "🔒", tag: "Security & Site", title: "Site Security, Theft & Unauthorized Access" }
    - { icon: "🔍", tag: "Quality Control", title: "Quality Defects & Inspection Gaps" }
    - { icon: "🌱", tag: "Sustainability", title: "Carbon Waste & Sustainability Reporting" }

section3_intelligence:
  heading: "The Intelligence Layer Explained."
  sub: "Traditional software waits to be told what to do. AI agents watch, learn, and act — continuously. Think of it less like a dashboard and more like hiring a team of tireless, hyper-observant analysts who never sleep, never blink, and escalate the right thing to the right person in seconds."
  analogy: "<strong>A simple analogy:</strong> A spreadsheet is a tool — it needs a human to enter data, interpret it, and decide. An AI agent is more like a seasoned site manager who <em>watches everything at once</em>, flags anomalies the moment they appear, and hands you a decision — not a data dump. The difference isn't incremental. It's structural."
  iaas_file: "yantrai-brain-v2.html"

section4_deployment:
  heading: "How We Deploy and Scale."
  sub: "A structured rollout that integrates with your existing site infrastructure — from day one to full project coverage."
  steps:
    - { num: "1", title: "Connect Existing Systems", desc: "Plug into your cameras, IoT sensors, project management tools, and cloud storage. No rip-and-replace required." }
    - { num: "2", title: "Build a Unified Intelligence Layer", desc: "Yantrai Labs combines site video, sensor data, and project workflows into one decision-ready AI interface." }
    - { num: "3", title: "Scale Across All Projects", desc: "Standardize AI-powered intelligence across every site and project with a system built for enterprise-scale expansion." }

section5_partners:
  label: "Built to work with your current tools"
  sub: "Connect to the platforms your teams already use — from project management to cloud infrastructure and AI."
  partners:
    - { name: "OpenAI", category: "AI Platform", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg" }
    - { name: "AWS", category: "Cloud Storage", logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" }
    - { name: "Google Cloud", category: "Cloud Platform", logo: "https://upload.wikimedia.org/wikipedia/commons/0/01/Google-cloud-platform.svg" }
    - { name: "Microsoft Azure", category: "Cloud Infrastructure", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg" }
    - { name: "Slack", category: "Team Communication", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Slack_Technologies_Logo.svg" }
    - { name: "Autodesk", category: "BIM & Design", logo: "https://cdn.worldvectorlogo.com/logos/autodesk.svg" }
    - { name: "SAP", category: "ERP", logo: "https://upload.wikimedia.org/wikipedia/commons/5/59/SAP_2011_logo.svg" }
    - { name: "Anthropic", category: "AI / MCP", logo: "https://cdn.simpleicons.org/anthropic/000000.svg" }
    - { name: "n8n", category: "Workflow Automation", logo: "https://cdn.simpleicons.org/n8n/000000.svg" }
    - { name: "Procore", category: "Project Management", logo: "wordmark" }

section6_workflows:
  intro_heading: "Three Steps. One Intelligent System."
  intro_sub: "From raw site data to decisions — here's how Yantra AI turns your construction operations into a continuously learning, proactive system."
  workflows:
    - num: "01"
      tag: "Data Collection"
      title_line1: "Capture everything."
      title_line2: "Act instantly."
      desc: "Vision AI records every site event in real time. Agents process and deploy that data — no manual effort, no delay."
      before: ["Manual forms, once per shift", "Photos on personal phones", "Safety checks every 4–6 hrs", "Data siloed, never actioned"]
      after: ["Every event, captured live", "Auto-archived video clips", "24/7 continuous coverage", "Agents act — no human needed"]
      source: "McKinsey — The Economic Potential of Generative AI"
      source_url: "https://www.mckinsey.com/capabilities/tech-and-ai/our-insights/the-economic-potential-of-generative-ai-the-next-productivity-frontier"
      media: "Workflow_1.mp4"

    - num: "02"
      tag: "Decision Making"
      title_line1: "See it now."
      title_line2: "Decide faster."
      desc: "Decisions made on 3–7 day old data are already too late. AI closes that gap to seconds."
      before: ["Weekly reports, manually compiled", "3–7 day lag on ground truth", "Incomplete data, reactive calls", "Site visits to verify facts"]
      after: ["Live dashboards, 60s refresh", "Instant alerts on deviations", "AI recommends action, not just data", "Full visibility from any device"]
      source: "HBR — Companies Are Making Better Decisions Faster Thanks to AI"
      source_url: "https://hbr.org/2025/06/companies-are-using-ai-to-make-faster-decisions-in-sales-and-marketing"
      media: "Workflow_2.mp4"
      video_style: "object-fit: contain"

    - num: "03"
      tag: "Efficiency & Profitability"
      title_line1: "Less waste."
      title_line2: "More margin."
      desc: "Cost overruns are predictable. Safety delays, idle equipment, late rework — AI catches them before they compound."
      before: ["15–22% average cost overrun", "Rework found late in project", "Equipment idle 30–40% of shifts", "One incident = week-long stoppage"]
      after: ["28% less rework cost", "Equipment utilisation up 35–45%", "Incident response cut by 70%", "3.2× ROI in year one"]
      source: "McKinsey — Imagining Construction's Digital Future"
      source_url: "https://www.mckinsey.com/capabilities/operations/our-insights/imagining-constructions-digital-future"
      media: "chart"  # Uses interactive Chart.js panel instead of video

section7_results:
  heading: "What AI Adoption Actually Delivers."
  sub: "Across infrastructure, real estate, and heavy construction — organisations that have deployed AI agents are reporting consistent, measurable improvements within the first 6–12 months."
  results:
    - { value: "38", sup: "%", label: "Reduction in on-site safety incidents", desc: "Construction firms deploying Vision AI for PPE and restricted-zone monitoring report a 38–45% drop in recordable safety incidents within 6 months of go-live.", source: "McKinsey Global Infrastructure Report, 2023" }
    - { value: "42", sup: "%", label: "Improvement in on-time project delivery", desc: "AI-powered scheduling and progress monitoring — combined with real-time deviation alerts — reduced project delays by up to 42% in documented pilots across 3 continents.", source: "Dodge Data & Analytics, Smart Market Report 2023" }
    - { value: "28", sup: "%", label: "Lower rework costs per project", desc: "AI visual inspection catches structural defects and quality deviations before handover, dramatically reducing costly late-stage rework across commercial and infrastructure projects.", source: "Autodesk Construction IQ Study, 2023" }
    - { value: "4", sup: "×", label: "Faster daily reporting for site officers", desc: "Automated data capture replaces manual documentation. Site officers using AI dashboards complete end-of-day reporting in under 15 minutes, freeing 4+ hours for higher-value work.", source: "PwC AI in Construction Analysis, 2022" }

team_sub: "Engineers and operators from <strong>IIT Delhi</strong>, <strong>NIT Rourkela</strong> — Hero Group, Zomato, EY — who've lived the complexity of large-scale industrial ops and are now building multimodal AI that makes organisations truly intelligent."

footer:
  tagline: "AI that works on your site.<br>Not just in a demo."
  role_options: ["CEO / MD", "Project Head / Director", "Site Officer / Manager", "Safety Head / EHS", "IT / Digital Head", "Other"]
  form_placeholder_name: "Arjun Sharma"
  form_placeholder_company: "L&T Construction"
  form_placeholder_challenge: "Tell us about your site — number of locations, current pain points, what you'd like to automate..."
  bottom_links:
    - { label: "All Domains", href: "../" }
    - { label: "Security AI", href: "../security/" }
    - { label: "Back to Top ↑", href: "#hero" }
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

section2_benefits:
  cards: [8 Vision AI physical security capabilities]

section7_results:
  results:
    - { value: "95", sup: "%", label: "False Alarm Reduction" }
    - { value: "10", sup: "×", label: "Faster Threat Response" }
    - { value: "24/7", label: "Autonomous Monitoring" }

section6_workflows:
  workflows:
    - { num: "01", title: "24/7 Intelligent Security Monitoring.", source: "Genetec — State of Physical Security Report", url: "https://www.genetec.com/resources/guides/state-of-physical-security-report" }
    - { num: "02", title: "Operational Efficiency at Scale.", source: "CISA — Physical Security Guidance", url: "https://www.cisa.gov/topics/physical-security" }
    - { num: "03", title: "Proactive Threat Response.", source: "IBM Security — Cost of a Data Breach Report 2024", url: "https://www.ibm.com/reports/data-breach" }
    - { num: "04", title: "Data-Driven Security Decisions.", source: "ASIS International — Security Management", url: "https://www.asisonline.org/asis-publications/security-management/" }
```

### Health

```yaml
domain: health
folder: health/
github_repo: YantrAILabs/health-solutions
live_url: https://health.yantrailabs.com
output_file: health/index.html
audience: "Hospital CEOs, CMOs, Operations Directors, Chief Nursing Officers at large healthcare networks"

nav:
  domain_label: "Hospital AI"
  cta_text: "Book a Demo"

hero:
  eyebrow: "For Healthcare Organizations"
  headline: "Make your patient care proactive, not reactive."
  reactive_word: "reactive"
  sub: >
    An ICU nurse who gets early warnings before vitals crash.
    A hospital director with real-time bed occupancy across every floor.
    A CMO whose quality metrics update live — not in next month's board report.
    This is what AI integration delivers: a fundamental shift in how hospitals sense, decide, and act.
  insight_stat: "71% of US hospitals now use predictive AI for at least one clinical or operational function"
  insight_source: "JAMIA — Journal of the American Medical Informatics Association"
  insight_url: "https://academic.oup.com/jamia"
  insight_chart_image: "https://cdn.sanity.io/images/4zrzovbb/website/c1952c81bca02a7c8cc05ef7801e67ca60831c55-4096x4096.png"
  insight_chart_title: "Hospital AI Adoption — Clinical & Operational Functions"
  insight_chart_caption: "Share of US hospitals deploying predictive AI across clinical decision support, patient flow, and operational functions. Source: JAMIA, 2025."

section2_benefits:
  heading: "Multi-use cases, One platform"
  sub: "From the moment a patient enters triage to discharge planning and beyond — every layer of your hospital operation becomes measurable, manageable, and predictable."
  video_file: "Health.mp4"
  video_caption: "How we leverage AI to monitor and optimize hospital operations in real time"
  problems:
    - { icon: "🏥", tag: "Patient Flow", title: "ER Overcrowding & Bed Shortages" }
    - { icon: "🩺", tag: "Clinical Decision", title: "Diagnostic Delays & Missed Findings" }
    - { icon: "💊", tag: "Pharmacy & Medication", title: "Drug Errors & Adverse Events" }
    - { icon: "👩‍⚕️", tag: "Workforce", title: "Staff Burnout & Scheduling Gaps" }
    - { icon: "📋", tag: "Compliance", title: "Accreditation Lapses & Audit Failures" }
    - { icon: "🔬", tag: "Lab & Diagnostics", title: "Test Backlogs & Reporting Delays" }
    - { icon: "💰", tag: "Revenue Cycle", title: "Billing Errors & Claim Denials" }
    - { icon: "🛡️", tag: "Patient Safety", title: "HAIs & Fall Prevention" }
    - { icon: "📊", tag: "Quality Metrics", title: "Outcome Tracking & Benchmarking" }
    - { icon: "🌐", tag: "Interoperability", title: "Data Silos & EHR Integration" }

section3_intelligence:
  heading: "The Intelligence Layer Explained."
  sub: "Traditional hospital software waits to be told what to do. AI agents watch, learn, and act — continuously. Think of it less like a dashboard and more like hiring a team of tireless, hyper-observant clinical analysts who never sleep, never miss a pattern, and escalate the right thing to the right person in seconds."
  analogy: "<strong>A simple analogy:</strong> An EHR is a tool — it needs a human to enter data, interpret it, and decide. An AI agent is more like an experienced charge nurse who <em>monitors every floor simultaneously</em>, flags anomalies the moment they appear, and hands you a decision — not a data dump. The difference isn't incremental. It's structural."
  iaas_file: "yantrai-brain-v2.html"

section4_deployment:
  heading: "How We Deploy and Scale."
  sub: "A structured rollout that integrates with your existing hospital infrastructure — from day one to full departmental coverage."
  steps:
    - { num: "1", title: "Connect Hospital Systems", desc: "Integrate with your existing EHR, nurse call systems, lab information systems, pharmacy platforms, and patient monitoring devices. No rip-and-replace required." }
    - { num: "2", title: "Build a Clinical Intelligence Layer", desc: "AI models trained on hospital workflows, patient flow patterns, and clinical data — creating one decision-ready intelligence interface for your entire operation." }
    - { num: "3", title: "Scale Across Departments", desc: "Standardize AI-powered intelligence across ER, ICU, wards, OPD, and administrative functions with a system built for hospital-scale expansion." }

section5_partners:
  label: "Built to work with your current systems"
  sub: "Connect to the platforms your clinical and operations teams already use — from EHR systems to cloud infrastructure and AI."
  partners:
    - { name: "Epic", category: "EHR Platform", logo: "wordmark" }
    - { name: "Oracle Health", category: "EHR / Cerner", logo: "wordmark" }
    - { name: "Philips", category: "Medical Devices", logo: "https://upload.wikimedia.org/wikipedia/commons/4/47/New_Philips_logo.svg" }
    - { name: "GE HealthCare", category: "Medical Imaging", logo: "https://upload.wikimedia.org/wikipedia/commons/4/40/GE_HealthCare_logo.svg" }
    - { name: "AWS", category: "Cloud Infrastructure", logo: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" }
    - { name: "Google Cloud", category: "Cloud Platform", logo: "https://upload.wikimedia.org/wikipedia/commons/0/01/Google-cloud-platform.svg" }
    - { name: "Microsoft Azure", category: "Cloud Infrastructure", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg" }
    - { name: "Anthropic", category: "AI / MCP", logo: "https://cdn.simpleicons.org/anthropic/000000.svg" }
    - { name: "Slack", category: "Team Communication", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Slack_Technologies_Logo.svg" }
    - { name: "n8n", category: "Workflow Automation", logo: "https://cdn.simpleicons.org/n8n/000000.svg" }

section6_workflows:
  intro_heading: "Three Steps. One Intelligent System."
  intro_sub: "From raw clinical data to actionable decisions — here's how Yantra AI turns your hospital operations into a continuously learning, proactive system."
  workflows:
    - num: "01"
      tag: "Patient Flow"
      title_line1: "Predict demand."
      title_line2: "Eliminate bottlenecks."
      desc: "AI monitors bed occupancy, ER wait times, and discharge readiness in real time — predicting surges before they happen."
      before: ["Manual bed counts, once per shift", "4-hour average discharge lag", "ER diversion during peak hours", "No visibility into downstream capacity"]
      after: ["Real-time occupancy across all units", "Predictive discharge planning", "Zero ER diversion events", "Capacity forecasting 24–48 hrs ahead"]
      source: "McKinsey — Transforming Healthcare Operations with AI"
      source_url: "https://www.mckinsey.com/industries/healthcare/our-insights"
      media: "Workflow_1.mp4"

    - num: "02"
      tag: "Clinical Decision Support"
      title_line1: "Catch it early."
      title_line2: "Act in time."
      desc: "Clinical AI flags anomalies, detects early sepsis markers, and surfaces missed patterns — before physician fatigue takes over."
      before: ["Delayed lab result reviews", "Missed subtle pattern changes", "Physician fatigue errors in night shifts", "Reactive escalation after deterioration"]
      after: ["AI-flagged anomalies in real time", "Early sepsis detection (6-hr advance)", "Automated clinical alerts 24/7", "Proactive care team notification"]
      source: "WHO — Patient Safety and AI in Healthcare"
      source_url: "https://www.who.int/news-room/fact-sheets/detail/patient-safety"
      media: "Workflow_2.mp4"

    - num: "03"
      tag: "Operational Efficiency"
      title_line1: "Less burnout."
      title_line2: "More care time."
      desc: "30% of nursing time goes to documentation. AI automates charting, optimizes scheduling, and predicts supply needs — giving clinicians back their time."
      before: ["30% staff time on documentation", "Overtime costs from poor scheduling", "Supply stockouts and waste", "Manual compliance reporting"]
      after: ["Automated clinical charting", "AI-optimized staff scheduling", "Predictive supply chain management", "Real-time compliance dashboards"]
      source: "Accenture — Artificial Intelligence in Healthcare"
      source_url: "https://www.accenture.com/us-en/insights/health/artificial-intelligence-healthcare"
      media: "chart"

section7_results:
  heading: "What AI Adoption Actually Delivers."
  sub: "Across hospitals, health systems, and clinical networks — organizations that have deployed AI agents are reporting consistent, measurable improvements within the first 6–12 months."
  results:
    - { value: "35", sup: "%", label: "Reduction in patient wait times", desc: "Hospitals deploying AI-powered patient flow management report 35% reduction in ER wait times and 28% faster bed turnover within 6 months of go-live.", source: "JAMIA — AI in Hospital Operations, 2024" }
    - { value: "47", sup: "%", label: "Improvement in diagnostic accuracy", desc: "AI-assisted clinical decision support systems improve diagnostic accuracy by up to 47% for complex cases, with significant impact in radiology and pathology.", source: "Nature Medicine — AI Diagnostic Performance Meta-Analysis, 2024" }
    - { value: "21", sup: "%", label: "Reduction in 30-day readmissions", desc: "Predictive AI models identifying high-risk patients at discharge and triggering targeted interventions reduce 30-day readmission rates by 21% across participating health systems.", source: "Accenture Health AI Impact Report, 2024" }
    - { value: "3", sup: "×", label: "Staff productivity improvement", desc: "Automated documentation, AI-optimized scheduling, and predictive supply management give clinical staff back 3× more time for direct patient care.", source: "McKinsey Digital Health Report, 2024" }

team_sub: "Engineers and operators from <strong>IIT Delhi</strong>, <strong>NIT Rourkela</strong> — Hero Group, Zomato, EY — who've built large-scale operational systems and are now bringing multimodal AI to hospital environments where every minute matters."

footer:
  tagline: "AI that works in your hospital.<br>Not just in a demo."
  role_options: ["CEO / CMO", "Hospital Director", "Chief Nursing Officer", "Quality & Safety Head", "IT / Digital Health Head", "Other"]
  form_placeholder_name: "Dr. Priya Sharma"
  form_placeholder_company: "Apollo Hospitals"
  form_placeholder_challenge: "Tell us about your hospital — number of beds, current pain points, what you'd like to automate..."
  bottom_links:
    - { label: "All Domains", href: "../" }
    - { label: "Construction AI", href: "../construction/" }
    - { label: "Security AI", href: "../security/" }
    - { label: "Back to Top ↑", href: "#hero" }
```

---

## Future Domains (To Be Built)

```yaml
domains_planned:
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
├── health/
│   ├── index.html
│   └── assets/
├── security/
│   ├── index.html
│   ├── contact.html
│   └── assets/
├── retail/
│   ├── index.html
│   ├── contact.html
│   └── assets/
├── manufacturing/
│   ├── index.html
│   ├── contact.html
│   └── assets/
├── assets/                                  ← shared assets
│   ├── Logo/
│   ├── video/
│   ├── IAAS/
│   ├── use-case/
│   ├── Scale/
│   └── Team/
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
domain: "[name]"
folder: "[name]/"
github_repo: "YantrAILabs/[name]-solutions"
live_url: "https://[name].yantrailabs.com"
audience: "[who buys this — 1 sentence]"

nav:
  domain_label: "[Domain] AI"
  cta_text: "Book a Demo"

hero:
  eyebrow: "For [Industry] Companies"
  headline: "Make your [noun] [positive], not [reactive_word]."
  reactive_word: "[old way of doing things]"
  sub: "[2–3 sentences: paint the before/after transformation in vivid, specific terms]"
  insight_stat: "[1 sentence with a hard number from a trusted published source]"
  insight_source: "[Source name]"
  insight_url: "[Direct URL to source]"
  insight_chart_image: "[URL to chart/image for the modal popup]"
  insight_chart_title: "[Chart title for modal header]"
  insight_chart_caption: "[Chart description for modal footer]"

section2_benefits:
  heading: "[Concise multi-capability heading]"
  sub: "[1–2 sentences about coverage]"
  video_file: "[domain].mp4"
  video_caption: "[overlay text]"
  problems: 10 × { icon, tag, title }

section3_intelligence:
  heading: "[How It Works heading]"
  sub: "[2–3 sentences explaining AI approach]"
  analogy: "[Analogy text with <strong>/<em> formatting]"

section4_deployment:
  heading: "[Action phrase]. [Outcome phrase]."
  sub: "[1 sentence]"
  steps: 3 × { num, title, desc }

section5_partners:
  label: "[integration label]"
  sub: "[1 sentence]"
  partners: 10 × { name, category, logo_url }

section6_workflows:
  intro_heading: "[Workflow intro heading]"
  intro_sub: "[1 sentence]"
  workflows: 3 × { num, tag, title_line1, title_line2, desc, before[4], after[4], source, source_url, media }

section7_results:
  heading: "[Results heading]"
  sub: "[1–2 sentences]"
  results: 4 × { value, sup, label, desc, source }

team_sub: "[1–2 sentences about the team's relevant background for this domain]"

footer:
  tagline: "[Domain-specific tagline with <br>]"
  role_options: ["Role 1", "Role 2", "Role 3", "Role 4", "Role 5", "Other"]
  form_placeholder_name: "[Example buyer name]"
  form_placeholder_company: "[Example company in this domain]"
  form_placeholder_challenge: "[Domain-specific prompt]"
  bottom_links: [{ label, href }]
```
