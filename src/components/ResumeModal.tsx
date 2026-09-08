"use client";

import React, { useEffect, useState } from "react";
import { personalInfo, flagshipProjects } from "../data/portfolioData";
import { X, Download, ExternalLink, Mail, Phone, MapPin, CheckCircle2, FileText } from "lucide-react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-modal-title"
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl bg-canvas hairline-border shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-surface border-b hairline-divider">
          <div className="flex items-center gap-2 font-mono text-xs text-white">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="font-semibold">Engineering Resume Specification</span>
            <span className="text-muted hidden sm:inline">— Pramit Shrivastav</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/Pramit-Shrivastav-Resume.pdf"
              download="Pramit-Shrivastav-Resume.pdf"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent text-canvas font-mono font-semibold text-xs hover:bg-accent/90 transition-all shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-muted hover:text-white hover:bg-canvas transition-colors"
              title="Close modal (Esc)"
              aria-label="Close resume"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Sheet */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 text-primary font-sans text-sm leading-relaxed">
          {/* Header Block */}
          <div className="border-b hairline-divider pb-6 text-center sm:text-left sm:flex sm:justify-between sm:items-end gap-6">
            <div>
              <h1 id="resume-modal-title" className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {personalInfo.name}
              </h1>
              <p className="text-accent font-mono text-sm mt-1 font-semibold">
                {personalInfo.role}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted font-mono mt-3">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-accent" />
                  {personalInfo.email}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-accent" />
                  {personalInfo.phone}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-accent" />
                  {personalInfo.location}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-end gap-3 mt-4 sm:mt-0 font-mono text-xs">
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline flex items-center gap-1"
              >
                LinkedIn <ExternalLink className="w-3 h-3" />
              </a>
              <span className="text-muted/40">•</span>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline flex items-center gap-1"
              >
                GitHub <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono text-accent uppercase tracking-wider font-semibold">
              Professional Summary
            </h2>
            <p className="text-primary/95 text-xs sm:text-sm leading-relaxed max-w-[72ch]">
              Information Technology undergraduate graduating in 2027 focused on Machine Learning, Generative AI, and AI/ML engineering. Built end-to-end ML and LLM systems spanning predictive modeling, explainable AI, agentic workflows, document intelligence, REST APIs, and computer vision.
            </p>
          </div>

          {/* Flagship Projects */}
          <div className="space-y-6">
            <h2 className="text-xs font-mono text-accent uppercase tracking-wider font-semibold">
              Engineered Production Systems
            </h2>

            <div className="space-y-6">
              {/* AI-UILS */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-between">
                  <h3 className="font-bold text-white text-base">
                    Universal Information Logging System (AI-UILS)
                  </h3>
                  <span className="text-xs font-mono text-muted">FastAPI • LangGraph • PostgreSQL JSONB</span>
                </div>
                <ul className="list-disc list-outside ml-4 space-y-1 text-xs sm:text-sm text-primary/90">
                  <li>Built a domain-agnostic agentic AI platform converting text/documents across 5 input channels into structured records using dynamic schema inference, entity extraction, confidence scoring, and human-in-the-loop validation.</li>
                  <li>Engineered an 8-node LangGraph workflow with 5 tools and integrated 5 LLM providers with automated failover, rate-limit recovery, and two-tier routing across finance, healthcare, HR, support, and legal domains.</li>
                  <li>Designed a PostgreSQL/JSONB architecture to scale from 100K+ to millions of records and exposed 18 REST APIs; built React/TypeScript UI and validated the full stack with 77 automated tests.</li>
                </ul>
              </div>

              {/* MDRP */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-between">
                  <h3 className="font-bold text-white text-base">
                    Multi-Disease Risk Prediction System (MDRP)
                  </h3>
                  <span className="text-xs font-mono text-muted">XGBoost • Random Forest • SHAP • Gemini 2.0</span>
                </div>
                <ul className="list-disc list-outside ml-4 space-y-1 text-xs sm:text-sm text-primary/90">
                  <li>Engineered a multi-disease ML risk prediction platform across 27,193 records using stacked XGBoost + Random Forest + Logistic Regression ensembles for Heart Disease, Diabetes, CKD, and health-marker risk.</li>
                  <li>Implemented feature engineering, RandomizedSearchCV + Stratified 5-Fold CV, and held-out evaluation; achieved 99.93% ROC-AUC on held-out CKD data and 99.81% mean CV ROC-AUC for heart disease.</li>
                  <li>Built a 60% clinical scoring + 40% ML hybrid risk engine with SHAP explanations; integrated Gemini PDF biomarker extraction, Flask REST APIs, Clerk JWT, PostgreSQL, Docker, 67 backend tests, and Playwright E2E testing.</li>
                </ul>
              </div>

              {/* SAS */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-between">
                  <h3 className="font-bold text-white text-base">
                    Smart Attendance System
                  </h3>
                  <span className="text-xs font-mono text-muted">OpenCV • Haar Cascade • LBPH • ESP32</span>
                </div>
                <ul className="list-disc list-outside ml-4 space-y-1 text-xs sm:text-sm text-primary/90">
                  <li>Developed a real-time Haar Cascade + LBPH face-recognition attendance system with Android IP Webcam, MySQL persistence, PHP dashboard, and ESP32 hardware feedback.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Technical Skills */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono text-accent uppercase tracking-wider font-semibold">
              Technical Capabilities
            </h2>
            <div className="space-y-1.5 text-xs sm:text-sm">
              <div><strong className="text-white font-mono text-xs">Languages:</strong> Python, SQL, JavaScript, TypeScript</div>
              <div><strong className="text-white font-mono text-xs">AI/ML:</strong> Machine Learning, NumPy, Pandas, Scikit-learn, XGBoost, Random Forest, Feature Engineering, Model Evaluation, Hyperparameter Tuning, Cross-Validation, SHAP, NLP, Generative AI, LLMs, LangGraph</div>
              <div><strong className="text-white font-mono text-xs">Backend & Systems:</strong> FastAPI, Flask, REST APIs, React, Next.js, SQLAlchemy, JWT Authentication, HTML/CSS</div>
              <div><strong className="text-white font-mono text-xs">Databases & DevOps:</strong> PostgreSQL, MySQL, Git, GitHub, Docker, Docker Compose</div>
              <div><strong className="text-white font-mono text-xs">Computer Vision:</strong> OpenCV, Haar Cascade, LBPH</div>
            </div>
          </div>

          {/* Education & Certifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t hairline-divider">
            <div className="space-y-1">
              <h2 className="text-xs font-mono text-accent uppercase tracking-wider font-semibold">
                Education
              </h2>
              <div className="text-xs sm:text-sm">
                <div className="font-bold text-white">B.Tech. in Information Technology</div>
                <div className="text-primary">Bhilai Institute of Technology, Durg</div>
                <div className="text-accent font-mono text-xs mt-0.5">GPA: 7.43 | Class of 2027</div>
              </div>
            </div>

            <div className="space-y-1">
              <h2 className="text-xs font-mono text-accent uppercase tracking-wider font-semibold">
                Certifications
              </h2>
              <div className="space-y-1 text-xs sm:text-sm">
                <div><span className="text-white font-medium">AI MAXA TECH:</span> AI & ML Training</div>
                <div><span className="text-white font-medium">CSVTU:</span> AI & ML Project Learning (Grade A)</div>
                <div><span className="text-white font-medium">Spoken Tutorial — IIT Bombay:</span> Technical Certifications</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
