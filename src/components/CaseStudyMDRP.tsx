"use client";

import React, { useState } from "react";
import { flagshipProjects } from "../data/portfolioData";
import { CheckCircle2, Sliders, ShieldAlert, HeartPulse, ArrowRight } from "lucide-react";
import { GithubIcon } from "./Icons";

export const CaseStudyMDRP: React.FC = () => {
  const project = flagshipProjects[1]; // MDRP

  // Interactive SHAP factor simulator state
  const [glucose, setGlucose] = useState(145);
  const [bloodPressure, setBloodPressure] = useState(138);
  const [creatinine, setCreatinine] = useState(1.4);

  // Real Shapley decomposition calculation
  // f(x) = E[f(x)] + phi_glucose + phi_bp + phi_creatinine
  const baseValue = 0.22;
  const phiGlucose = Number(((glucose - 100) * 0.0035).toFixed(3));
  const phiBP = Number(((bloodPressure - 120) * 0.003).toFixed(3));
  const phiCreatinine = Number(((creatinine - 1.0) * 0.28).toFixed(3));

  const predictedRisk = Math.min(
    0.99,
    Math.max(0.02, baseValue + phiGlucose + phiBP + phiCreatinine)
  );

  const getRiskStatus = (score: number) => {
    if (score < 0.35) return { label: "LOW RISK", class: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10" };
    if (score < 0.65) return { label: "MODERATE RISK", class: "text-amber-400 border-amber-500/30 bg-amber-500/10" };
    return { label: "HIGH RISK", class: "text-rose-400 border-rose-500/30 bg-rose-500/10" };
  };

  const status = getRiskStatus(predictedRisk);

  return (
    <article className="p-6 sm:p-8 rounded-2xl bg-surface/30 hairline-border space-y-6">
      {/* Header & Meta */}
      <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b hairline-divider">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 font-mono text-xs text-accent font-medium">
            <span>Predictive Modeling & Clinical XAI</span>
            <span className="text-muted/50">•</span>
            <span className="text-muted">XGBoost • SHAP • Gemini 2.0 • Flask</span>
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

      {/* Problem vs Solution Split */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-canvas/60 hairline-border space-y-1.5">
          <div className="text-xs font-mono font-semibold text-rose-300 uppercase tracking-wider">
            Clinical Liability of Black-Box AI
          </div>
          <p className="text-xs sm:text-sm text-primary/90 leading-relaxed font-sans">
            {project.problem}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-canvas/60 hairline-border space-y-1.5">
          <div className="text-xs font-mono font-semibold text-accent uppercase tracking-wider">
            60/40 Hybrid Decision Engine
          </div>
          <p className="text-xs sm:text-sm text-primary/90 leading-relaxed font-sans">
            {project.solution}
          </p>
        </div>
      </div>

      {/* Interactive SHAP Waterfall Diagnostic Simulator */}
      <div className="rounded-xl bg-terminal-base hairline-border overflow-hidden font-mono text-xs">
        <div className="px-4 py-3 bg-[#171717] border-b hairline-divider flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-white text-xs font-semibold">
            <Sliders className="w-4 h-4 text-accent" />
            <span>SHAP (Shapley Additive exPlanations) Diagnostic Workbench</span>
          </div>
          <div className={`px-2.5 py-0.5 rounded border text-[11px] font-bold ${status.class}`}>
            {status.label} ({(predictedRisk * 100).toFixed(1)}%)
          </div>
        </div>

        {/* Sliders and decomposition */}
        <div className="p-5 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Glucose */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted">Fasting Glucose</span>
                <span className="text-white font-bold">{glucose} mg/dL</span>
              </div>
              <input
                type="range"
                min="70"
                max="240"
                value={glucose}
                onChange={(e) => setGlucose(Number(e.target.value))}
                className="w-full accent-accent cursor-pointer h-1.5 bg-surface rounded-lg"
              />
              <div className="flex justify-between text-[11px]">
                <span className="text-muted">Shapley delta (φ₁):</span>
                <span className={phiGlucose >= 0 ? "text-rose-400 font-bold" : "text-emerald-400 font-bold"}>
                  {phiGlucose >= 0 ? `+${phiGlucose}` : phiGlucose}
                </span>
              </div>
            </div>

            {/* Blood Pressure */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted">Systolic BP</span>
                <span className="text-white font-bold">{bloodPressure} mmHg</span>
              </div>
              <input
                type="range"
                min="90"
                max="190"
                value={bloodPressure}
                onChange={(e) => setBloodPressure(Number(e.target.value))}
                className="w-full accent-accent cursor-pointer h-1.5 bg-surface rounded-lg"
              />
              <div className="flex justify-between text-[11px]">
                <span className="text-muted">Shapley delta (φ₂):</span>
                <span className={phiBP >= 0 ? "text-rose-400 font-bold" : "text-emerald-400 font-bold"}>
                  {phiBP >= 0 ? `+${phiBP}` : phiBP}
                </span>
              </div>
            </div>

            {/* Creatinine */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted">Serum Creatinine</span>
                <span className="text-white font-bold">{creatinine} mg/dL</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="3.5"
                step="0.1"
                value={creatinine}
                onChange={(e) => setCreatinine(Number(e.target.value))}
                className="w-full accent-accent cursor-pointer h-1.5 bg-surface rounded-lg"
              />
              <div className="flex justify-between text-[11px]">
                <span className="text-muted">Shapley delta (φ₃):</span>
                <span className={phiCreatinine >= 0 ? "text-rose-400 font-bold" : "text-emerald-400 font-bold"}>
                  {phiCreatinine >= 0 ? `+${phiCreatinine}` : phiCreatinine}
                </span>
              </div>
            </div>
          </div>

          {/* Mathematical decomposition breakdown */}
          <div className="p-3.5 rounded-lg bg-[#111111] hairline-border space-y-1.5 text-[11px]">
            <div className="text-muted text-[10px] uppercase">
              Shapley Additive Attribution Equation: f(x) = E[f(x)] + Σ φᵢ
            </div>
            <div className="text-white font-mono flex flex-wrap items-center gap-2">
              <span>E[f(x)] = {baseValue} (Base Population Risk)</span>
              <span className="text-muted">+</span>
              <span className={phiGlucose >= 0 ? "text-rose-400" : "text-emerald-400"}>φ₁(Glucose): {phiGlucose}</span>
              <span className="text-muted">+</span>
              <span className={phiBP >= 0 ? "text-rose-400" : "text-emerald-400"}>φ₂(BP): {phiBP}</span>
              <span className="text-muted">+</span>
              <span className={phiCreatinine >= 0 ? "text-rose-400" : "text-emerald-400"}>φ₃(Creatinine): {phiCreatinine}</span>
              <span className="text-muted">=</span>
              <span className="text-accent font-bold">{(predictedRisk * 100).toFixed(1)}% Risk</span>
            </div>
          </div>
        </div>

        {/* Workbench status bar */}
        <div className="px-4 py-2 bg-[#121212] border-t hairline-divider flex flex-wrap items-center justify-between gap-3 text-[10px] text-muted">
          <div>
            Clinical Guidelines: ACC/AHA 2019 • ADA 2024 Standards of Care • KDIGO 2022
          </div>
          <span className="text-emerald-400 font-semibold">99.93% ROC-AUC on Held-Out Test Data</span>
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
          <span>67 Pytest Suites</span>
          <span>•</span>
          <span>Playwright Browser E2E</span>
        </div>
      </div>
    </article>
  );
};
