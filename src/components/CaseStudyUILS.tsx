"use client";

import React, { useState } from "react";
import { flagshipProjects } from "../data/portfolioData";
import { CheckCircle2, GitBranch, ArrowRight, Code, ShieldCheck, Database, Terminal } from "lucide-react";
import { GithubIcon } from "./Icons";

const nodeSnippets: Record<string, { code: string; signature: string; detail: string }> = {
  intake: {
    signature: "input_node(state: AgentState) -> AgentState",
    code: `async def input_node(state: AgentState):\n    # Normalizes intake across PDF, OCR, email, and raw text\n    doc_stream = await parse_document(state["raw_payload"])\n    state["thread_id"] = str(uuid.uuid4())\n    state["normalized_text"] = doc_stream.text\n    return state`,
    detail: "Normalizes incoming unstructured documents (PDF, raw text, tickets) and prepares transactional state.",
  },
  schema: {
    signature: "entity_extraction_node(state: AgentState) -> AgentState",
    code: `async def entity_extraction_node(state: AgentState):\n    contract = await infer_dynamic_schema(state["normalized_text"])\n    for field, val in contract.items():\n        if val.confidence < 0.70:\n            state["review_queue"].append(field)\n    state["draft_record"] = contract\n    return state`,
    detail: "Extracts key-value fields with confidence scoring. Low-confidence extractions (<0.70) are flagged for human-in-the-loop validation.",
  },
  failover: {
    signature: "tool_execution_node(state: AgentState) -> AgentState",
    code: `async def execute_with_failover(payload, providers=["groq", "cerebras", "gemini", "ollama"]):\n    for provider in providers:\n        try:\n            return await call_llm(provider, payload)\n        except (RateLimitError, ServiceUnavailableError):\n            logger.warning(f"Failover triggered: {provider} -> next")\n            continue\n    raise AllProvidersFailedException()`,
    detail: "Dynamic failover across 5 providers. When Groq returns HTTP 429, execution reroutes to Cerebras or Gemini 2.0 without dropped state.",
  },
  storage: {
    signature: "persistence_node(state: AgentState) -> LogRecord",
    code: `async def commit_record(session: AsyncSession, state: AgentState):\n    record = LogRecord(\n        thread_id=state["thread_id"],\n        data=state["draft_record"], # JSONB column\n        status="COMMITTED"\n    )\n    session.add(record)\n    await session.commit()`,
    detail: "Commits schema-agnostic records to PostgreSQL 15+ JSONB tables indexed with GIN for sub-millisecond search across 100k+ rows.",
  },
};

export const CaseStudyUILS: React.FC = () => {
  const project = flagshipProjects[0]; // AI-UILS
  const [activeStageId, setActiveStageId] = useState<string>("intake");

  const activeSnippet = nodeSnippets[activeStageId] || nodeSnippets["intake"];

  return (
    <article className="p-6 sm:p-8 rounded-2xl bg-surface/30 hairline-border space-y-6">
      {/* Header & Meta */}
      <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b hairline-divider">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 font-mono text-xs text-accent font-medium">
            <span>Agentic Systems Architecture</span>
            <span className="text-muted/50">•</span>
            <span className="text-muted">LangGraph • FastAPI • PostgreSQL JSONB</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {project.title}
          </h3>

          <p className="text-sm sm:text-base text-primary/90 max-w-[65ch] leading-relaxed">
            {project.tagline}
          </p>
        </div>

        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-surface/60 hover:bg-surface hairline-border font-mono text-xs text-primary hover:text-white transition-all"
        >
          <GithubIcon className="w-3.5 h-3.5 text-accent" />
          <span>Repository</span>
        </a>
      </div>

      {/* Engineering Trade-Offs (Problem vs Solution) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-canvas/60 hairline-border space-y-1.5">
          <div className="text-xs font-mono font-semibold text-rose-300 uppercase tracking-wider">
            Failure Mode of Naive Implementations
          </div>
          <p className="text-xs sm:text-sm text-primary/90 leading-relaxed font-sans">
            {project.problem}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-canvas/60 hairline-border space-y-1.5">
          <div className="text-xs font-mono font-semibold text-accent uppercase tracking-wider">
            Engineered State Graph Solution
          </div>
          <p className="text-xs sm:text-sm text-primary/90 leading-relaxed font-sans">
            {project.solution}
          </p>
        </div>
      </div>

      {/* Interactive Architectural Workbench */}
      <div className="rounded-xl bg-terminal-base hairline-border overflow-hidden font-mono text-xs">
        <div className="px-4 py-3 bg-[#171717] border-b hairline-divider flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-white text-xs font-semibold">
            <GitBranch className="w-4 h-4 text-accent" />
            <span>8-Node LangGraph State Machine Inspector</span>
          </div>

          {/* Stage selector buttons */}
          <div className="flex items-center gap-1 overflow-x-auto text-[11px]">
            {project.stages?.map((stage) => {
              const isSelected = stage.id === activeStageId;
              return (
                <button
                  key={stage.id}
                  onClick={() => setActiveStageId(stage.id)}
                  className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
                    isSelected
                      ? "bg-surface text-accent font-semibold hairline-border"
                      : "text-muted hover:text-white"
                  }`}
                >
                  {stage.name.split(". ")[1]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Node signature and code snippet */}
        <div className="p-4 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b hairline-divider">
            <div className="text-accent font-semibold text-xs">
              {activeSnippet.signature}
            </div>
            <span className="text-[10px] text-muted">
              {project.stages?.find((s) => s.id === activeStageId)?.badge}
            </span>
          </div>

          <p className="text-primary font-sans text-xs sm:text-sm leading-relaxed">
            {activeSnippet.detail}
          </p>

          <pre className="p-3.5 rounded-lg bg-[#111111] hairline-border text-[11px] text-primary/95 overflow-x-auto leading-relaxed">
            <code>{activeSnippet.code}</code>
          </pre>
        </div>

        {/* Workbench status bar */}
        <div className="px-4 py-2 bg-[#121212] border-t hairline-divider flex flex-wrap items-center justify-between gap-3 text-[10px] text-muted">
          <div className="flex items-center gap-3">
            <span>Failover Tier: Groq → Cerebras → Gemini → OpenRouter → Ollama</span>
          </div>
          <span className="text-emerald-400 font-semibold">77 Automated Tests Passing</span>
        </div>
      </div>

      {/* Tech Stack Pills */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 font-mono text-xs">
        <div className="flex flex-wrap items-center gap-2">
          {project.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded bg-canvas hairline-border text-muted text-[11px]"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3 text-[11px] text-muted">
          <span>18 REST API Endpoints</span>
          <span>•</span>
          <span>Docker Multi-Container</span>
        </div>
      </div>
    </article>
  );
};
