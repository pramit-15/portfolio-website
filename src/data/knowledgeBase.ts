export interface KnowledgeItem {
  keywords: string[];
  topic: string;
  response: string;
}

export const offlineKnowledgeBase: KnowledgeItem[] = [
  {
    topic: "langgraph",
    keywords: ["langgraph", "agent", "why langgraph", "state machine", "workflow", "graph"],
    response:
      "Pramit chose LangGraph for AI-UILS because traditional linear LLM chains (like basic LangChain LCEL) lack cyclic loops, state persistence, and human-in-the-loop checkpoints.\n\nIn AI-UILS, the 8-node LangGraph architecture allows:\n1. State Checkpointing: Preserving document draft state across turns.\n2. Cyclic Refinement: Looping between entity extraction and conversational user edits.\n3. Failover Routing: Automatically switching providers if an inference node hits an error or rate limit.",
  },
  {
    topic: "failover",
    keywords: ["failover", "rate limit", "5 providers", "groq", "cerebras", "gemini", "openrouter", "ollama"],
    response:
      "In AI-UILS, the system integrates 5 LLM providers with automated tiering:\n• Primary Tier: Groq Cloud (ultra-fast inference) with Cerebras as instant hot-standby.\n• Secondary Tier: Google Gemini 2.0 & OpenRouter for complex schema reasoning.\n• Offline Privacy Tier: Local Ollama inference.\n\nIf any cloud API returns HTTP 429 (Rate Limit) or 503, the LangGraph state machine catches the exception and dynamically redirects the state payload to the next healthy provider without losing user draft data.",
  },
  {
    topic: "metrics",
    keywords: ["roc-auc", "accuracy", "metrics", "ckd", "heart disease", "99.93%", "validation", "cv"],
    response:
      "In the Multi-Disease Risk Prediction (MDRP) platform, Pramit achieved:\n• 99.93% ROC-AUC on held-out Chronic Kidney Disease (CKD) data.\n• 99.81% mean CV ROC-AUC on heart disease benchmarks.\n\nMethodology: Used Stratified 5-Fold Cross-Validation and RandomizedSearchCV over 27,193 records to strictly eliminate patient data leakage, coupled with a 60% clinical guideline + 40% ML hybrid ensemble.",
  },
  {
    topic: "shap",
    keywords: ["shap", "explainable", "interpretability", "black box", "xai"],
    response:
      "In MDRP, Explainable AI (SHAP - SHapley Additive exPlanations) is utilized to eliminate the medical 'black box' problem.\n\nFor every diagnostic assessment, the system computes individual feature attribution scores (e.g. impact of fasting blood glucose, systolic BP, or serum creatinine on the total risk score). This allows clinicians to see exactly which biomarkers drove the risk score up or down.",
  },
  {
    topic: "testing",
    keywords: ["test", "testing", "pytest", "vitest", "playwright", "coverage", "144"],
    response:
      "Pramit prioritizes high-rigor software engineering across all AI systems with 144+ automated tests:\n• AI-UILS: 77 tests (pytest for FastAPI routes, Alembic migrations, and LangGraph nodes; vitest + RTL for React components).\n• MDRP: 67 tests (pytest for clinical hybrid scoring equations and API auth; Playwright browser automation for end-to-end patient report flows).",
  },
  {
    topic: "education",
    keywords: ["education", "college", "degree", "bit durg", "gpa", "btech", "university"],
    response:
      "Pramit Shrivastav is pursuing his Bachelor of Technology (B.Tech.) in Information Technology at Bhilai Institute of Technology, Durg (BIT Durg), graduating in 2027 with a GPA of 7.43.\n\nHe has also completed certifications from AI MAXA TECH, CSVTU (Grade A in Project Learning), and IIT Bombay Spoken Tutorial.",
  },
  {
    topic: "contact",
    keywords: ["contact", "email", "hire", "reach", "linkedin", "phone", "location"],
    response:
      "You can connect with Pramit directly:\n• Email: pramitshrivastav15@gmail.com\n• Phone: +91-7489042967\n• LinkedIn: linkedin.com/in/pramit1506\n• GitHub: github.com/pramit1506\n• Location: Bhilai / Durg, Chhattisgarh, India\n\nHe is actively available for AI/ML Engineering, Generative AI, and Backend roles.",
  },
  {
    topic: "projects",
    keywords: ["projects", "work", "ai-uils", "mdrp", "sas", "attendance", "portfolio"],
    response:
      "Pramit's 3 featured production projects:\n1. AI-UILS: Domain-agnostic agentic data extraction using 8-node LangGraph workflow, 5-LLM failover, and PostgreSQL JSONB.\n2. MDRP: Multi-disease risk platform using stacked ML ensembles, SHAP explanations, Gemini 2.0 PDF biomarker extraction, and 60% clinical guideline scoring.\n3. SAS: Edge computer vision attendance system with OpenCV Haar Cascade + LBPH and ESP32 microcontroller feedback.",
  },
];

export function findLocalKnowledgeAnswer(query: string): string {
  const normalized = query.toLowerCase();

  // Score matches based on keywords
  let bestMatch: KnowledgeItem | null = null;
  let maxMatches = 0;

  for (const item of offlineKnowledgeBase) {
    let matches = 0;
    for (const kw of item.keywords) {
      if (normalized.includes(kw)) {
        matches++;
      }
    }
    if (matches > maxMatches) {
      maxMatches = matches;
      bestMatch = item;
    }
  }

  if (bestMatch && maxMatches > 0) {
    return bestMatch.response;
  }

  return (
    "I can answer questions regarding Pramit's engineering projects, architectural choices, and technical depth!\n\n" +
    "Try asking about:\n" +
    "• Why he chose LangGraph for AI-UILS\n" +
    "• How the 5-provider LLM failover works\n" +
    "• The 99.93% ROC-AUC validation methodology\n" +
    "• How SHAP explainability is integrated\n" +
    "• His automated testing strategy (144+ tests)\n" +
    "• His education (BIT Durg, GPA 7.5) and contact details"
  );
}
