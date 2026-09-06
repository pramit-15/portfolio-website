# Portfolio Website Requirements & System Specification

## 1. Candidate Profile & Positioning

- **Name**: Pramit Shrivastav
- **Professional Title**: AI/ML & Generative AI Systems Engineer
- **Academic Background**: B.Tech. in Information Technology (Expected Graduation: 2027), Bhilai Institute of Technology, Durg | GPA: 7.5
- **Location**: Bhilai / Durg, Chhattisgarh, India
- **Contact**:
  - Email: `pramitshrivastav15@gmail.com`
  - Phone: `+91-7489042967`
  - LinkedIn: [linkedin.com/in/pramit1506](https://www.linkedin.com/in/pramit1506)
  - GitHub: [github.com/pramit1506](https://www.github.com/pramit1506)
- **Core Positioning**:
  - Bridges the gap between **Stateful Agentic Workflows / Generative AI**, **Benchmarked Machine Learning Ensembles**, and **Production Backend Engineering**.
  - Focuses on real-world reliability: multi-LLM automated failover, rate-limit recovery, high test coverage (144+ automated tests), and containerized production microservices.

---

## 2. Design System: "Stealth AI Terminal" (Set 1)

Follows the **60-30-10 UI rule** and strictly complies with **WCAG AAA** contrast standards.

### Color Tokens & Semantic Mappings

| Role | Color Name | Hex Code | RGB | HSL | Semantic UI Usage |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Main Canvas (60%)** | **Matte Black** | `#28282B` | `40, 40, 43` | `240, 4, 16` | Main page background; eliminates OLED halation and reduces eye fatigue |
| **Cards & Surfaces (30%)** | **Charcoal** | `#36454F` | `54, 69, 79` | `204, 19, 26` | Elevated cards, project containers, navigation bar, modal dialogs |
| **Card Borders & Dividers**| **Gunmetal Gray** | `#818589` | `129, 133, 137`| `210, 3, 52` | Crisp 1px structural container borders and section dividers |
| **Primary Text** | **Ash Gray** | `#B2BEB5` | `178, 190, 181`| `135, 8, 72` | Soft high-contrast text (>8.2:1 contrast ratio) replacing harsh `#FFFFFF` |
| **Muted Text & Labels** | **Dark Gray** | `#A9A9A9` | `169, 169, 169`| `0, 0, 66` | Timestamps, secondary subtitles, metadata, tech tag labels |
| **Interactive Accent (10%)**| **Baby Blue** | `#89CFF0` | `137, 207, 240`| `199, 77, 74` | Primary CTAs, active status dots, metric numbers (`99.93%`), glows |
| **Secondary Accent** | **Glaucous** | `#6082B6` | `96, 130, 182` | `216, 37, 55` | Hover states, pill badges (`LangGraph`, `FastAPI`), secondary links |
| **Deep Terminal Base** | **Black** | `#000000` | `0, 0, 0` | `0, 0, 0` | Interactive terminal console background and deep drop shadows |

---

## 3. The Narrative Pacing & Anti-"Skill Dump" Architecture

Recruiters spend only 6–10 seconds scanning a page. Static grids of 30 logo icons are universally ignored because they lack context and proof. 

This website replaces the "skill dump" with a **narrative pipeline** that physically guides the user's eye and compels them to scroll through interactive visual hooks and progressive disclosure.

```
┌────────────────────────────────────────────────────────────────────────┐
│ SECTION 1: HERO & LIVE PIPELINE TEASER                                 │
│ High-conviction headline + Live execution heartbeat                    │
│ [Hook]: "See how an 8-node LangGraph agent processes live data ↓"     │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │ (Glowing Vertical Circuit Trace)
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│ SECTION 2: PROOF-FIRST METRICS BAR                                     │
│ 4 high-contrast metrics that spark curiosity:                          │
│ [99.93% ROC-AUC]  [144+ Tests]  [5 LLM Providers]  [27,193 Records]   │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │ (Continuous Scroll Line)
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│ SECTION 3: FLAGSHIP SYSTEM 1 (AI-UILS)                                 │
│ Interactive 8-Node LangGraph architecture scrubber                     │
│ Skills showcased in context: LangGraph, FastAPI, PostgreSQL JSONB, Groq│
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │ (Continuous Scroll Line)
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│ SECTION 4: FLAGSHIP SYSTEM 2 (MDRP)                                    │
│ Clinical Hybrid Engine (60% Guidelines + 40% ML) + SHAP waterfall      │
│ Skills showcased in context: XGBoost, SHAP, Gemini 2.0 Flash, Docker  │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │ (Continuous Scroll Line)
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│ SECTION 5: "SKILLS IN ACTION" CONTEXTUAL MATRIX                        │
│ Instead of raw badges: Hovering any skill highlights the exact node,  │
│ test suite, or database schema where it was implemented in production. │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │ (Continuous Scroll Line)
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│ SECTION 6: INTERACTIVE TERMINAL / AGENT PLAYGROUND                     │
│ In-browser AI console: Recruiters test queries live against your bio. │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│ SECTION 7: EDUCATION, CERTIFICATIONS & CONTACT DRAWER                  │
│ Direct resume download, calendar / email links, GitHub / LinkedIn      │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Section-by-Section Content & Scroll-Trigger Mechanics

### Section 1: Hero ("The Systems Engineer Hook")
- **Headline**: *"Building Resilient Agentic Workflows & Explainable ML Systems."*
- **Sub-headline**: *"B.Tech IT (2027). Architecting failover-safe multi-LLM orchestrations, clinical prediction ensembles, and high-throughput PostgreSQL microservices."*
- **Interactive Visual**: A sleek floating terminal window showing a simulated real-time stream:
  ```
  [0.04s] INTAKE: Medical invoice uploaded -> mime: application/pdf
  [0.12s] ROUTER: Intent classified: EXTRACT_LAB_METRICS (Confidence: 0.96)
  [0.31s] AGENT: LangGraph -> Node 3 [entity_extraction_node] running...
  ```
- **The Scroll Trigger**:
  - At the bottom of the hero, an animated badge: *"How does the agent handle rate limits across 5 LLM providers without dropping state? Watch the trace ↓"*.
  - A glowing vertical connecting line (**Baby Blue `#89CFF0`**) begins here and physically runs down the center/left margin through the rest of the page.

---

### Section 2: Proof-First Metrics Bar
- Positioned immediately as the user scrolls, confirming high engineering capability before diving into projects:
  - **99.93% ROC-AUC**: Held-out test evaluation on Chronic Kidney Disease benchmark.
  - **144+ Automated Tests**: Comprehensive Pytest, Vitest, and Playwright E2E coverage.
  - **5 LLM Providers**: Stateful failover & rate-limit recovery across Groq, Cerebras, Gemini, OpenRouter, and Ollama.
  - **27,193 Records**: Processed across multi-disease clinical prediction pipelines.

---

### Section 3: Flagship System 1 — `AI-UILS` (Agentic Architecture Deep Dive)
- **Title**: Universal Information Logging System (`AI-UILS`)
- **Category Badge**: `Stateful Multi-Agent Orchestration` • `LangGraph` • `FastAPI`
- **The Story Arc**:
  - *The Problem*: Unstructured documents (invoices, EHRs, support tickets) break traditional rigid forms; single-prompt LLMs fail on rate limits and hallucinate without guardrails.
  - *The Architectural Solution*: An 8-node LangGraph state machine with automatic failover, two-tier routing, confidence scoring, and human-in-the-loop review queues.
- **Interactive Scrubber / Visual Node Flow**:
  - Visitors can click or hover through the 4 core stages:
    1. **Intake & Intent**: Multi-channel parser $\rightarrow$ Intent classification.
    2. **Dynamic Schema Inference**: Pydantic v2 dynamic contract generation.
    3. **Failover LLM Matrix**: Groq $\rightarrow$ Cerebras $\rightarrow$ Gemini $\rightarrow$ OpenRouter $\rightarrow$ local Ollama.
    4. **Persistence Layer**: PostgreSQL with JSONB & GIN indexing for million-record scale.
- **Metrics & Proof**:
  - `77 automated tests (Vitest + Pytest)` • `18 REST API endpoints` • `Docker Compose multi-container`.
- **Scroll Hook to Next Section**: *"From GenAI agents to clinical predictive modeling: See how stacked ML ensembles predict cardiovascular and kidney risk ↓"*.

---

### Section 4: Flagship System 2 — `MDRP` (Clinical Machine Learning & XAI)
- **Title**: Multi-Disease Risk Prediction System (`MDRP`)
- **Category Badge**: `Stacked ML Ensembles` • `Explainable AI (SHAP)` • `Flask & Next.js`
- **The Story Arc**:
  - *The Problem*: Medical professionals reject black-box neural networks; manual clinical risk calculators miss non-linear feature interactions.
  - *The Architectural Solution*: A hybrid risk engine combining 60% clinical evidence guidelines (ACC/AHA 2019, ADA 2024, KDIGO 2022) with 40% stacked ML ensembles (XGBoost + Random Forest + Logistic Regression) and SHAP explainability.
- **Interactive SHAP Visualizer**:
  - An interactive preview of SHAP feature contributions (e.g., Blood Glucose, SBP, Serum Creatinine showing $+/-$ impact on risk score).
  - Ingestion pipeline: Gemini 2.0 Flash PDF parsing with regex fallback.
- **Metrics & Proof**:
  - `99.93% ROC-AUC (CKD)` • `99.81% ROC-AUC (Heart Disease)` • `67 Pytest tests + Playwright E2E`.

---

### Section 5: The "Skills in Action" Matrix (Anti-Skill Dump)
Instead of an uncontextualized list of badges, skills are organized by **Production Capability** with **reverse-lookup interactions**:

When the visitor clicks or hovers a skill tag, the UI dynamically displays:
1. **Where it was used in production** (e.g. clicking `XGBoost` links to `MDRP` ensemble).
2. **The specific architectural pattern** (e.g. `LangGraph` $\rightarrow$ *"Used for 8-node cyclic state graph with human-in-the-loop pause/resume"*).
3. **The test & validation strategy** (e.g. `PostgreSQL JSONB` $\rightarrow$ *"GIN indexing verified with full-text search across 100k+ records"*).

#### Structured Capability Categories:

| Capability Group | Core Technologies | Real-World Production Proof |
| :--- | :--- | :--- |
| **Agentic AI & Orchestration** | LangGraph, LLM Provider Routing, Prompt Chains, Schema Inference | 8-node state machine, failover across 5 providers in `AI-UILS` |
| **Applied ML & Explainability** | Scikit-learn, XGBoost, Random Forest, SHAP, Stratified CV | 27k+ records, 99.93% ROC-AUC, SHAP attribution in `MDRP` |
| **Backend & Microservices** | FastAPI, Flask, SQLAlchemy 2.0 (asyncpg), Pydantic v2, REST | 18 endpoints, Alembic migrations, Clerk JWT authentication |
| **Data & Persistence** | PostgreSQL (JSONB + GIN Indexing), MySQL, Vector Storage | Schema-agnostic storage scaled to million+ records |
| **Frontend & UI Systems** | React 18, Next.js, TypeScript, Redux Toolkit, Tailwind CSS | Real-time editable drafts, Redux centralized state |
| **DevOps & Testing** | Docker, Docker Compose, Pytest, Vitest, Playwright E2E | 144+ total automated tests, multi-stage Docker builds |
| **Edge & Computer Vision** | OpenCV, Haar Cascade, LBPH, ESP32 Microcontrollers | Real-time face recognition + physical hardware feedback (`SAS`) |

---

### Section 6: Interactive Terminal / AI Recruiter Assistant
- A prominent terminal card docked into the layout:
  - Visitors can type prompt queries or click quick chips:
    - `[Why LangGraph?]` $\rightarrow$ Explains stateful looping, checkpointing, and why linear chains fail.
    - `[Model Validation]` $\rightarrow$ Explains Stratified 5-Fold CV and data leakage prevention.
    - `[System Failover]` $\rightarrow$ Demonstrates how Groq errors trigger automated failover to Gemini/OpenRouter.
- Keeps technical recruiters engaged directly on the page for 2–3x longer.

---

### Section 7: Education, Credentials & High-Conversion Footer
- **Education**: B.Tech. in Information Technology, Bhilai Institute of Technology, Durg (2027) | GPA: 7.5.
- **Certifications**: AI MAXA TECH (AI & ML), CSVTU (Grade A), IIT Bombay Spoken Tutorial.
- **Action Buttons**:
  - `Download Full Engineering Resume (PDF)`
  - `View GitHub Repositories`
  - `Connect on LinkedIn`
  - `Copy Direct Email: pramitshrivastav15@gmail.com`

---

## 5. Visual Scroll-Driving UI Mechanisms

1. **The Continuous Neon Circuit Line**:
   - A subtle 2px vertical neon guide line (`#89CFF0` with low opacity) runs down the page margin. As the user scrolls, a glowing "packet" travels down the line, lighting up each section header as it enters view.
2. **The "Peek" Viewport Layout**:
   - Each section is styled so that the top 10%–15% of the next card or diagram peeks into the bottom of the screen, creating visual anticipation.
3. **Sticky Section Indicator / Progress Rail**:
   - A minimal side dock showing: `01 Hero` $\rightarrow$ `02 Metrics` $\rightarrow$ `03 AI-UILS` $\rightarrow$ `04 MDRP` $\rightarrow$ `05 Skills Matrix` $\rightarrow$ `06 Terminal` $\rightarrow$ `07 Contact`.
