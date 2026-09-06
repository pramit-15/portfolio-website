"use client";

import React, { useState } from "react";
import { personalInfo } from "../data/portfolioData";
import { Mail, Copy, Check, ExternalLink, GraduationCap, Award, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <footer id="contact" className="scroll-mt-24 py-20 pb-28 min-h-[50vh] relative z-10 border-t hairline-divider bg-surface/15">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Call to Action */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
              Let&apos;s build reliable AI systems together.
            </h2>

            <p className="text-base text-primary leading-relaxed font-sans max-w-[60ch]">
              I am actively interviewing for{" "}
              <strong className="text-white font-medium">AI/ML Engineering</strong>,{" "}
              <strong className="text-white font-medium">Generative AI Systems</strong>, and{" "}
              <strong className="text-white font-medium">Backend Architecture</strong> roles. Let&apos;s
              discuss how stateful agent graphs and clinical ensembles can solve high-stakes problems.
            </p>

            {/* Email Box */}
            <div className="p-4 rounded-xl bg-canvas hairline-border flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-surface text-accent hairline-border">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-muted uppercase">Direct Inquiries</div>
                  <div className="font-mono text-sm sm:text-base font-semibold text-white">
                    {personalInfo.email}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface hover:bg-surface-elevated hairline-border text-primary hover:text-white font-mono text-xs transition-all"
                  title="Copy email to clipboard"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-accent" />
                      <span>Copy</span>
                    </>
                  )}
                </button>

                {/* Direct Web Gmail compose (works 100% on any browser without needing desktop Outlook/Mail app) */}
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(personalInfo.email)}&su=${encodeURIComponent("AI/ML Engineering Opportunity - Pramit Shrivastav")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-accent text-canvas font-mono font-semibold text-xs hover:bg-accent/90 transition-all shadow-sm"
                  title="Compose directly in Gmail"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send Mail (Gmail)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                {/* Default OS Mail App fallback */}
                <a
                  href={`mailto:${personalInfo.email}?subject=${encodeURIComponent("AI/ML Engineering Opportunity - Pramit Shrivastav")}`}
                  className="p-1.5 rounded-lg bg-surface hover:bg-surface-elevated hairline-border text-muted hover:text-white font-mono text-xs transition-all"
                  title="Open in default desktop mail client"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Verified Links */}
            <div className="flex flex-wrap items-center gap-3 pt-1 font-mono text-xs">
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-surface/60 hover:bg-surface hairline-border text-primary hover:text-white transition-all"
              >
                <LinkedinIcon className="w-3.5 h-3.5 text-accent" />
                <span>linkedin.com/in/pramit1506</span>
              </a>

              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-surface/60 hover:bg-surface hairline-border text-primary hover:text-white transition-all"
              >
                <GithubIcon className="w-3.5 h-3.5 text-accent" />
                <span>github.com/pramit1506</span>
              </a>
            </div>
          </div>

          {/* Right Column: Institutional Profile */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-canvas hairline-border space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b hairline-divider text-white font-semibold text-sm">
                <GraduationCap className="w-4 h-4 text-accent" />
                <span>Academic & Institutional Profile</span>
              </div>

              <div className="space-y-1 text-xs">
                <div className="font-bold text-white text-sm">
                  {personalInfo.education.degree}
                </div>
                <div className="text-primary">{personalInfo.education.institution}</div>
                <div className="text-accent font-mono">
                  GPA: {personalInfo.education.gpa} | {personalInfo.education.year}
                </div>
                <div className="text-muted flex items-center gap-1 pt-1 font-mono">
                  <MapPin className="w-3 h-3 text-muted" />
                  {personalInfo.location}
                </div>
              </div>

              {/* Certifications list */}
              <div className="pt-3 border-t hairline-divider space-y-2">
                <div className="text-[10px] font-mono text-muted uppercase flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-accent" />
                  <span>Technical Certifications</span>
                </div>
                {personalInfo.certifications.map((cert, idx) => (
                  <div key={idx} className="text-xs flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                    <div>
                      <span className="text-white font-medium">{cert.title}</span>
                      <span className="text-muted text-[11px] block font-mono">
                        {cert.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Colophon */}
        <div className="pt-8 border-t hairline-divider flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-muted">
          <div>
            © {new Date().getFullYear()} Pramit Shrivastav • Stealth AI Terminal Design System
          </div>
          <div className="flex items-center gap-3">
            <span>Next.js 14 • Gemini 2.0 Flash • Tailwind CSS</span>
            <span className="text-accent">•</span>
            <span>WCAG AAA Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
