"use client";

import React, { useState } from "react";
import { skillsCategories } from "../data/portfolioData";
import { Cpu, Layers, Server, Layout, CheckCircle, ExternalLink, Code } from "lucide-react";

export const SkillsMatrix: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState(skillsCategories[0].skills[0]);

  const categoryIcons = [
    <Cpu key="0" className="w-4 h-4 text-accent" />,
    <Layers key="1" className="w-4 h-4 text-accent" />,
    <Server key="2" className="w-4 h-4 text-accent" />,
    <Layout key="3" className="w-4 h-4 text-accent" />,
  ];

  return (
    <section id="skills" className="scroll-mt-24 py-16 relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Production Engineering Capabilities
          </h2>
          <p className="text-sm text-primary/80 max-w-[65ch] font-sans">
            Every tool and library listed below is backed by committed code, architectural
            benchmarks, and automated test suites.
          </p>
        </div>

        {/* Interactive Capability Inspection Console */}
        <div className="p-4 sm:p-5 rounded-xl bg-terminal-base hairline-border font-mono text-xs space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b hairline-divider">
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4 text-accent" />
              <span className="text-white font-bold text-sm">{selectedSkill.name}</span>
            </div>
            <span className="px-2.5 py-0.5 rounded bg-surface hairline-border text-accent text-[11px]">
              {selectedSkill.projectAssociation}
            </span>
          </div>

          <div className="text-primary text-xs sm:text-sm font-sans flex items-start gap-2 pt-1">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>{selectedSkill.productionProof}</span>
          </div>
        </div>

        {/* 4-Tier Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillsCategories.map((category, catIdx) => (
            <div
              key={catIdx}
              className="p-5 rounded-2xl bg-surface/30 hairline-border space-y-4"
            >
              <div className="flex items-center justify-between pb-2 border-b hairline-divider">
                <div className="flex items-center gap-2">
                  {categoryIcons[catIdx]}
                  <h3 className="font-sans font-semibold text-white text-sm">
                    {category.title}
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-muted uppercase">
                  {category.skills.length} Capabilities
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, sIdx) => {
                  const isSelected = selectedSkill.name === skill.name;
                  return (
                    <button
                      key={sIdx}
                      onClick={() => setSelectedSkill(skill)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all text-left ${
                        isSelected
                          ? "bg-accent text-canvas border-accent font-semibold shadow-sm"
                          : "bg-canvas/70 border-white/[0.08] text-primary hover:text-white hover:border-white/[0.2]"
                      }`}
                    >
                      {skill.name}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Edge & Microcontroller Highlight */}
        <div className="p-5 rounded-2xl bg-surface/20 hairline-border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-mono text-xs">
          <div className="space-y-1">
            <div className="text-accent font-semibold text-xs uppercase">
              Edge Computer Vision & Embedded Hardware
            </div>
            <div className="text-white font-sans text-sm font-semibold">
              Smart Attendance System (SAS)
            </div>
            <p className="text-muted font-sans text-xs max-w-[65ch]">
              Haar Cascade + LBPH face recognition via Android IP webcam stream with MySQL persistence and physical ESP32 feedback.
            </p>
          </div>

          <a
            href="https://github.com/pramit1506/SAS"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-surface hover:bg-surface-elevated hairline-border text-primary hover:text-white transition-all shrink-0"
          >
            <span>Hardware Repo</span>
            <ExternalLink className="w-3.5 h-3.5 text-accent" />
          </a>
        </div>
      </div>
    </section>
  );
};
