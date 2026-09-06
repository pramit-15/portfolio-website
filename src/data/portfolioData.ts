import { ProjectData, SkillCategory, MetricItem } from "../types";

export const personalInfo = {
  name: "Pramit Shrivastav",
  role: "AI/ML & Generative AI Systems Engineer",
  location: "Bhilai / Durg, India",
  email: "pramitshrivastav15@gmail.com",
  phone: "+91-7489042967",
  github: "https://github.com/pramit1506",
  linkedin: "https://www.linkedin.com/in/pramit1506",
  status: "Available for AI/ML & Engineering Roles",
  education: {
    degree: "B.Tech. in Information Technology",
    institution: "Bhilai Institute of Technology, Durg",
    gpa: "7.5",
    year: "Expected Graduation 2027",
    location: "Durg, India",
  },
  certifications: [
    {
      title: "AI MAXA TECH — AI & ML Training",
      type: "Vocational Training",
      description: "Applied machine learning pipelines, deep learning foundations, and data modeling.",
    },
    {
      title: "CSVTU — AI & ML Project Learning",
      type: "Grade A",
      description: "End-to-end model development, hyperparameter tuning, and production pipeline deployment.",
    },
    {
      title: "Spoken Tutorial — IIT Bombay",
      type: "Technical Certification",
      description: "Advanced Python programming, algorithms, and computational problem solving.",
    },
  ],
};

export const highImpactMetrics: MetricItem[] = [
  {
    value: "99.93%",
    label: "ROC-AUC Accuracy",
    sublabel: "Held-out test benchmark on 400 patient records (Chronic Kidney Disease)",
    iconName: "Activity",
  },
  {
    value: "144+",
    label: "Automated Test Suites",
    sublabel: "Pytest backend assertions, Vitest component units, and Playwright E2E browser tests",
    iconName: "ShieldCheck",
  },
  {
    value: "5",
    label: "LLM Providers (Failover)",
    sublabel: "Dynamic tiering across Groq, Cerebras, Gemini, OpenRouter, and local Ollama",
    iconName: "Cpu",
  },
  {
    value: "27,193",
    label: "Clinical Records",
    sublabel: "Multi-cohort validation (UCI/Kaggle Cleveland, Pima Diabetes, and CKD data)",
    iconName: "Database",
  },
];

export const flagshipProjects: ProjectData[] = [
  {
    id: "ai-uils",
    title: "Universal Information Logging System",
    tagline: "Domain-agnostic agentic AI platform converting unstructured documents into structured records via LangGraph.",
    repoUrl: "https://github.com/pramit1506/AI-UILS",
    tags: ["LangGraph", "FastAPI", "PostgreSQL JSONB", "React 18", "TypeScript", "Docker", "Pytest", "Vitest"],
    metrics: [
      { label: "State Graph", value: "8 Nodes" },
      { label: "LLM Resiliency", value: "5 Providers" },
      { label: "API Endpoints", value: "18 Routes" },
      { label: "Automated Tests", value: "77 Tests" },
    ],
    problem:
      "Traditional intake forms reject semi-structured or unstructured documents. Conversely, naive single-prompt LLM wrappers hallucinate, crash on API rate-limits, and cannot support transactional state rollbacks or human-in-the-loop review.",
    solution:
      "Engineered an 8-node stateful LangGraph agent that dynamically infers schemas, scores extraction confidence per field, automatically reroutes failed calls across 5 LLM providers, and commits validated payloads to PostgreSQL JSONB with GIN indexing.",
    stages: [
      {
        id: "intake",
        name: "01. Intake & Routing",
        shortDesc: "Multi-channel intake & state initialization",
        details: "Ingests raw text, PDF files, support requests, and clinical notes. The intent_node validates incoming payloads and initializes the stateful thread context.",
        badge: "FastAPI + Pydantic v2",
        metrics: "app/graph/nodes/input_node.py",
      },
      {
        id: "schema",
        name: "02. Dynamic Schema Inference",
        shortDesc: "Zero-shot extraction with confidence calibration",
        details: "Extracts key-value fields on the fly without rigid schemas. Each field is assigned an extraction confidence score. Low-confidence extractions (<0.70) are quarantined to an interactive human-in-the-loop review queue.",
        badge: "Confidence Scoring",
        metrics: "app/services/draft_service.py",
      },
      {
        id: "failover",
        name: "03. 5-Provider Failover Matrix",
        shortDesc: "Automated rate-limit & quota recovery",
        details: "Primary inference routes through Groq Cloud with Cerebras standby. If HTTP 429 occurs, the LangGraph state machine transparently transitions to Gemini 2.0 Flash or OpenRouter, falling back to local Ollama if offline.",
        badge: "LangGraph State Machine",
        metrics: "app/llm/provider_router.py",
      },
      {
        id: "storage",
        name: "04. JSONB & GIN Persistence",
        shortDesc: "Scalable document storage & retrieval",
        details: "PostgreSQL 15+ persistence using JSONB columns with GIN index optimization. Exposes 18 REST endpoints with full-text search and transactional rollback support.",
        badge: "SQLAlchemy 2.0 Async",
        metrics: "app/repositories/log_repository.py",
      },
    ],
    highlights: [
      "8-node stateful graph execution with state checkpointing and cyclic rollback.",
      "5 LLM providers integrated: Groq (ultra-fast), Cerebras, Gemini, OpenRouter, and Ollama (local offline privacy).",
      "Conversational refinement: users can refine records naturally ('Change total to $500').",
      "77 automated unit and integration tests across backend (pytest) and frontend (vitest).",
    ],
    techStack: [
      "Python 3.11",
      "LangGraph",
      "FastAPI",
      "PostgreSQL 15+",
      "SQLAlchemy 2.0 (asyncpg)",
      "React 18",
      "TypeScript",
      "Redux Toolkit",
      "Docker Compose",
    ],
    testSuite: {
      unitTests: 45,
      integrationTests: 32,
      coverageOrFramework: "Pytest + Vitest + React Testing Library",
    },
  },
  {
    id: "mdrp",
    title: "Multi-Disease Risk Prediction Platform",
    tagline: "Hybrid clinical ML risk engine combining stacked tree ensembles, guideline scoring, and SHAP explainability.",
    repoUrl: "https://github.com/pramit1506/MDRP",
    tags: ["XGBoost", "Random Forest", "SHAP", "Scikit-learn", "Flask", "Next.js", "Gemini 2.0 Flash", "Docker"],
    metrics: [
      { label: "CKD Held-Out", value: "99.93% ROC" },
      { label: "Heart Disease", value: "99.81% ROC" },
      { label: "Evaluated Cohort", value: "27,193 Records" },
      { label: "Automated Tests", value: "67 Tests" },
    ],
    problem:
      "Pure black-box neural networks lack clinical transparency and face clinician rejection. Conversely, manual guideline point calculators miss non-linear, multi-variable interactions in high-risk patients.",
    solution:
      "Engineered a 60/40 hybrid diagnostic platform: 60% evidence-based clinical guidelines (ACC/AHA 2019, ADA 2024, KDIGO 2022) + 40% stacked machine learning ensembles with individualized SHAP feature importance attribution and automated lab PDF biomarker extraction.",
    stages: [
      {
        id: "biomarker",
        name: "01. Gemini Lab PDF Parsing",
        shortDesc: "Automated biomarker vector extraction",
        details: "Extracts clinical lab values directly from unstructured PDF blood reports using Google Gemini 2.0 Flash with an automated regex fallback pipeline.",
        badge: "Gemini 2.0 Flash",
        metrics: "app/services/pdf_parser.py",
      },
      {
        id: "ml-ensemble",
        name: "02. Stacked ML Ensemble",
        shortDesc: "XGBoost + Random Forest + Logistic Regression",
        details: "Trained across 27,193 patient records using RandomizedSearchCV and Stratified 5-Fold Cross-Validation to strictly prevent data leakage.",
        badge: "Scikit-learn & XGBoost",
        metrics: "ml_pipeline/training/train_models.py",
      },
      {
        id: "guidelines",
        name: "03. 60% Clinical Guidelines Engine",
        shortDesc: "ACC/AHA 2019, ADA 2024, KDIGO 2022",
        details: "Embeds cardiometabolic and nephrology guidelines to ground statistical probabilities within verified medical safety envelopes.",
        badge: "Hybrid Risk Scoring",
        metrics: "app/services/guidelines_engine.py",
      },
      {
        id: "shap",
        name: "04. SHAP Feature Attribution",
        shortDesc: "Human-interpretable risk breakdown",
        details: "Computes exact Shapley Additive exPlanations for each prediction, displaying positive and negative risk contributors directly to the clinician.",
        badge: "Explainable AI (XAI)",
        metrics: "app/services/shap_service.py",
      },
    ],
    highlights: [
      "Achieved 99.93% ROC-AUC on held-out CKD benchmark data and 99.81% mean CV ROC-AUC on heart disease.",
      "Hybrid decision engine: 60% clinical guideline adherence + 40% statistical ML ensemble.",
      "SHAP waterfall and summary explanations for every output.",
      "Protected endpoints with Clerk JWT authentication, PostgreSQL, and multi-stage Docker containerization.",
      "Validated with 67 backend tests (pytest) and Playwright browser automated E2E tests.",
    ],
    techStack: [
      "Python",
      "Scikit-learn",
      "XGBoost",
      "Random Forest",
      "SHAP",
      "Flask REST API",
      "Next.js",
      "PostgreSQL",
      "Docker",
      "Playwright",
    ],
    testSuite: {
      unitTests: 48,
      integrationTests: 19,
      coverageOrFramework: "Pytest + Playwright E2E",
    },
  },
  {
    id: "sas",
    title: "Smart Attendance System with Edge CV",
    tagline: "Real-time face recognition attendance system featuring ESP32 hardware feedback and PHP dashboard.",
    repoUrl: "https://github.com/pramit1506/SAS",
    tags: ["OpenCV", "Haar Cascade", "LBPH", "Python", "ESP32", "MySQL", "PHP"],
    metrics: [
      { label: "Inference", value: "Edge Real-Time" },
      { label: "Verification", value: "ESP32 Hardware" },
      { label: "Storage", value: "MySQL Relational" },
    ],
    problem:
      "Manual biometrics suffer from line bottlenecks and physical touch concerns, while pure software attendance portals lack physical verification feedback.",
    solution:
      "Created an edge face-recognition attendance pipeline using Haar Cascades + LBPH classifiers via Android IP Webcam streaming, persisting timestamps in MySQL with physical confirmation on ESP32 microcontrollers.",
    highlights: [
      "OpenCV Haar Cascade + LBPH edge facial feature extraction.",
      "Microcontroller integration: ESP32 visual and hardware feedback on verification.",
      "PHP/MySQL management dashboard for attendance reporting and logs.",
    ],
    techStack: ["Python", "OpenCV", "Haar Cascade", "LBPH", "ESP32", "MySQL", "PHP"],
    testSuite: {
      unitTests: 10,
      integrationTests: 5,
      coverageOrFramework: "Edge hardware integration verification",
    },
  },
];

export const skillsCategories: SkillCategory[] = [
  {
    title: "Agentic AI & Generative Orchestration",
    role: "Stateful agent graphs, multi-LLM routing, and structured parsing",
    skills: [
      {
        name: "LangGraph",
        productionProof: "8-node cyclic state machine with checkpoints and human-in-the-loop pause/resume",
        projectAssociation: "AI-UILS (app/graph/workflow.py)",
      },
      {
        name: "Multi-LLM Failover",
        productionProof: "Dynamic tiering across 5 providers (Groq, Cerebras, Gemini, OpenRouter, Ollama) with zero request drop",
        projectAssociation: "AI-UILS (app/llm/provider_router.py)",
      },
      {
        name: "Dynamic Schema Inference",
        productionProof: "Zero-shot JSON contract extraction with sub-field confidence scoring and review queue",
        projectAssociation: "AI-UILS (app/services/draft_service.py)",
      },
      {
        name: "Gemini 2.0 Flash",
        productionProof: "Biomarker vector extraction from unstructured medical PDF lab reports",
        projectAssociation: "MDRP (app/services/pdf_parser.py)",
      },
      {
        name: "Prompt Engineering & RAG",
        productionProof: "Deterministic JSON schema enforcement, few-shot prompting, and structured extraction",
        projectAssociation: "AI-UILS & Portfolio Chat",
      },
    ],
  },
  {
    title: "Machine Learning & Explainable AI",
    role: "Predictive modeling, cross-validation, and clinical scoring",
    skills: [
      {
        name: "XGBoost & Random Forest",
        productionProof: "Stacked tree ensembles trained over 27,193 records with hyperparameter tuning",
        projectAssociation: "MDRP (ml_pipeline/training/train_models.py)",
      },
      {
        name: "SHAP (Explainable AI)",
        productionProof: "Calculated feature attribution scores to explain non-linear clinical risk drivers",
        projectAssociation: "MDRP (app/services/shap_service.py)",
      },
      {
        name: "Stratified 5-Fold CV",
        productionProof: "Guaranteed zero patient data leakage; achieved 99.93% ROC-AUC on held-out CKD test set",
        projectAssociation: "MDRP (ml_pipeline/evaluation/evaluate.py)",
      },
      {
        name: "Scikit-learn & Pandas",
        productionProof: "End-to-end preprocessing, feature scaling, and RandomizedSearchCV hyperparameter optimization",
        projectAssociation: "MDRP (ml_pipeline/preprocessing/preprocess.py)",
      },
      {
        name: "Hybrid Clinical Scoring",
        productionProof: "Blended 60% clinical guidelines (ACC/AHA, ADA, KDIGO) + 40% ML ensemble probabilities",
        projectAssociation: "MDRP (app/services/hybrid_engine.py)",
      },
    ],
  },
  {
    title: "Backend & Systems Engineering",
    role: "Resilient APIs, asynchronous database drivers, and authentication",
    skills: [
      {
        name: "FastAPI & Pydantic v2",
        productionProof: "18 asynchronous REST endpoints with schema validation and OpenAPI contracts",
        projectAssociation: "AI-UILS (backend/app/api/v1/)",
      },
      {
        name: "Flask & Gunicorn",
        productionProof: "Application factory pattern with thread optimization (--workers 1 --threads 4)",
        projectAssociation: "MDRP (api.py & Dockerfile)",
      },
      {
        name: "PostgreSQL & JSONB",
        productionProof: "GIN-indexed flexible document store designed to scale from 100k to millions of records",
        projectAssociation: "AI-UILS (backend/app/models/log_record.py)",
      },
      {
        name: "SQLAlchemy 2.0 (asyncpg)",
        productionProof: "Asynchronous ORM repository patterns with Alembic schema migrations",
        projectAssociation: "AI-UILS (backend/app/database/)",
      },
      {
        name: "Clerk JWT Authentication",
        productionProof: "Cryptographic Bearer token verification securing patient prediction endpoints",
        projectAssociation: "MDRP (app/services/auth_service.py)",
      },
    ],
  },
  {
    title: "Frontend Architecture & Testing",
    role: "Type-safe interfaces, state management, and automated test suites",
    skills: [
      {
        name: "TypeScript & React 18",
        productionProof: "Built responsive interactive dashboards and live-synced editable drafts",
        projectAssociation: "AI-UILS (frontend/src/)",
      },
      {
        name: "Next.js (App Router)",
        productionProof: "Serverless edge API routes, hybrid rendering, and zero-server deployment",
        projectAssociation: "Portfolio & MDRP",
      },
      {
        name: "Redux Toolkit",
        productionProof: "Centralized multi-slice state for agent nodes, chat, and draft records",
        projectAssociation: "AI-UILS (frontend/src/redux/)",
      },
      {
        name: "Pytest & Vitest",
        productionProof: "144+ automated unit and integration tests across backends and frontends",
        projectAssociation: "AI-UILS & MDRP",
      },
      {
        name: "Playwright E2E",
        productionProof: "Browser automation testing end-to-end report generation and user interactions",
        projectAssociation: "MDRP (frontend/tests/e2e/)",
      },
      {
        name: "Docker & Compose",
        productionProof: "Multi-stage production container builds and multi-container orchestration",
        projectAssociation: "AI-UILS & MDRP",
      },
    ],
  },
];
