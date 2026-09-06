"use client";

import React, { useState, useEffect } from "react";
import { personalInfo } from "../data/portfolioData";
import { ArrowDown, Terminal, FileText, ArrowRight, GitBranch, Code2, Play } from "lucide-react";

interface HeroSectionProps {
  onOpenResume: () => void;
  onOpenChat: () => void;
  onSelectSection?: (id: string) => void;
}

const liveTelemetry = [
  { time: "0.02s", tag: "INTAKE", text: "Multi-channel PDF payload received -> thread_id: tx_9842" },
  { time: "0.14s", tag: "ROUTER", text: "intent_node: EXTRACT_LAB_METRICS (Confidence: 0.98)" },
  { time: "0.31s", tag: "AGENT", text: "entity_extraction_node running with dynamic Pydantic contract" },
  { time: "0.45s", tag: "FAILOVER", text: "Groq 429 caught -> auto-rerouted to Gemini 2.0 Flash [0ms data loss]" },
  { time: "0.62s", tag: "STORAGE", text: "14 validated fields persisted to PostgreSQL JSONB (GIN indexed)" },
  { time: "0.78s", tag: "VERIFY", text: "77/77 test suites passing. Uptime: 99.9%." },
];

const schemaContract = `{
  "document_id": "doc_2026_09",
  "domain": "clinical_diagnostic",
  "extracted_entities": {
    "patient_biomarkers": {
      "fasting_glucose": { "value": 142, "confidence": 0.96 },
      "systolic_bp": { "value": 138, "confidence": 0.94 },
      "serum_creatinine": { "value": 1.45, "confidence": 0.91 }
    }
  },
  "review_status": "AUTO_VALIDATED",
  "assigned_tier": "TIER_1_PRODUCTION"
}`;

const graphTopology = [
  { node: "input_node", type: "entry", desc: "Ingests raw text/PDF across 5 channels" },
  { node: "intent_node", type: "router", desc: "Two-tier classification across 5 domains" },
  { node: "entity_extraction_node", type: "agent", desc: "Zero-shot dynamic schema inference" },
  { node: "decision_node", type: "conditional", desc: "Confidence check: <0.70 to review queue" },
  { node: "tool_selection_node", type: "tool", desc: "Selects DB write, search, or summarize" },
  { node: "tool_execution_node", type: "runtime", desc: "Executes failover-safe provider call" },
  { node: "response_node", type: "exit", desc: "Formats final state & UI sync event" },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenResume,
  onOpenChat,
  onSelectSection,
}) => {
  const [activeTab, setActiveTab] = useState<"telemetry" | "topology" | "schema">("telemetry");
  const [logIndex, setLogIndex] = useState(liveTelemetry.length);

  useEffect(() => {
    if (activeTab === "telemetry") {
      const timer = setInterval(() => {
        setLogIndex((prev) => (prev < liveTelemetry.length ? prev + 1 : 1));
      }, 2600);
      return () => clearInterval(timer);
    }
  }, [activeTab]);

  return (
    <section id="hero" className="relative pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Authoritative Editorial Statement */}
          <div className="lg:col-span-6 space-y-6">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.08]">
              Resilient AI agents. Clinical ML pipelines. Production systems.
            </h1>

            <p className="text-base sm:text-lg text-primary leading-relaxed font-sans max-w-[65ch]">
              I am an AI Systems Engineer and IT undergraduate at{" "}
              <span className="text-white font-medium">Bhilai Institute of Technology, Durg</span>{" "}
              (GPA: 7.5, class of 2027). I build end-to-end machine learning and LLM architectures:
              stateful <strong className="text-white font-mono font-medium">LangGraph</strong>{" "}
              workflows with multi-provider failover, stacked clinical risk ensembles (
              <strong className="text-white font-mono font-medium">99.93% ROC-AUC</strong>), and
              high-throughput PostgreSQL microservices backed by 144+ automated tests.
            </p>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs">
              <a
                href="#systems"
                onClick={(e) => {
                  e.preventDefault();
                  if (onSelectSection) {
                    onSelectSection("systems");
                  } else {
                    document.getElementById("systems")?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-accent text-canvas font-semibold hover:bg-accent/90 transition-all shadow-sm"
              >
                <span>View Flagship Systems</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={onOpenChat}
                className="flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-surface/70 hover:bg-surface hairline-border text-primary hover:text-white transition-all"
              >
                <Terminal className="w-3.5 h-3.5 text-accent" />
                <span>Test Recruiter AI</span>
              </button>

              <button
                onClick={onOpenResume}
                className="flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-surface/40 hover:bg-surface hairline-border text-muted hover:text-primary transition-all"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Resume (PDF)</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive System Heartbeat Workbench */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl bg-terminal-base hairline-border overflow-hidden shadow-2xl font-mono text-xs">
              {/* Terminal Window Chrome */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#171717] border-b hairline-divider">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-white/20 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/20 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-white/20 inline-block" />
                  </div>
                  <span className="text-[11px] text-muted ml-2 font-mono">
                    AI-UILS Core Runtime
                  </span>
                </div>

                {/* View Tabs */}
                <div className="flex items-center gap-1 text-[10px]">
                  <button
                    onClick={() => setActiveTab("telemetry")}
                    className={`px-2 py-1 rounded transition-colors ${
                      activeTab === "telemetry"
                        ? "bg-surface text-accent font-semibold"
                        : "text-muted hover:text-white"
                    }`}
                  >
                    Telemetry
                  </button>
                  <button
                    onClick={() => setActiveTab("topology")}
                    className={`px-2 py-1 rounded transition-colors ${
                      activeTab === "topology"
                        ? "bg-surface text-accent font-semibold"
                        : "text-muted hover:text-white"
                    }`}
                  >
                    Graph (8 Nodes)
                  </button>
                  <button
                    onClick={() => setActiveTab("schema")}
                    className={`px-2 py-1 rounded transition-colors ${
                      activeTab === "schema"
                        ? "bg-surface text-accent font-semibold"
                        : "text-muted hover:text-white"
                    }`}
                  >
                    Schema
                  </button>
                </div>
              </div>

              {/* Tab 1: Live Telemetry Stream */}
              {activeTab === "telemetry" && (
                <div className="p-4 space-y-2 min-h-[260px] bg-terminal-base">
                  <div className="flex items-center justify-between text-[10px] text-muted border-b hairline-divider pb-2 mb-2">
                    <span>LIVE EVENT BUS</span>
                    <span className="text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      LISTENING
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    {liveTelemetry.slice(0, logIndex).map((log, idx) => (
                      <div key={idx} className="flex items-start gap-2 leading-relaxed text-[11px]">
                        <span className="text-muted/50 shrink-0">{log.time}</span>
                        <span className="text-accent font-semibold shrink-0">[{log.tag}]</span>
                        <span className="text-primary font-sans">{log.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 2: LangGraph Topology View */}
              {activeTab === "topology" && (
                <div className="p-4 space-y-2 min-h-[260px] bg-terminal-base overflow-y-auto max-h-[300px]">
                  <div className="text-[10px] text-muted border-b hairline-divider pb-2 mb-2">
                    STATEFUL WORKFLOW NODES (CYCLIC STATE GRAPH)
                  </div>
                  <div className="space-y-1.5">
                    {graphTopology.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-2 rounded-lg bg-surface/40 hairline-border flex items-center justify-between text-[11px]"
                      >
                        <div className="flex items-center gap-2">
                          <GitBranch className="w-3.5 h-3.5 text-accent shrink-0" />
                          <span className="text-white font-semibold font-mono">{item.node}</span>
                        </div>
                        <span className="text-muted text-[10px] font-sans truncate max-w-[200px]">
                          {item.desc}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 3: Dynamic Schema Contract */}
              {activeTab === "schema" && (
                <div className="p-4 min-h-[260px] bg-terminal-base overflow-x-auto">
                  <div className="text-[10px] text-muted border-b hairline-divider pb-2 mb-2">
                    PYDANTIC V2 DYNAMIC INGESTION CONTRACT
                  </div>
                  <pre className="text-[11px] text-accent font-mono leading-relaxed">
                    {schemaContract}
                  </pre>
                </div>
              )}

              {/* Footer status bar */}
              <div className="px-4 py-2 bg-[#121212] border-t hairline-divider flex items-center justify-between text-[10px] text-muted font-mono">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  FastAPI 0.110 • LangGraph 0.1 • PostgreSQL 15 (JSONB)
                </span>
                <span>77 tests passed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
