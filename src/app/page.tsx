"use client";

import React, { useState, useRef, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { ScrollCircuitTrace } from "../components/ScrollCircuitTrace";
import { LetsScrollBackground } from "../components/LetsScrollBackground";
import { HeroSection } from "../components/HeroSection";
import { MetricsBar } from "../components/MetricsBar";
import { CaseStudyUILS } from "../components/CaseStudyUILS";
import { CaseStudyMDRP } from "../components/CaseStudyMDRP";
import { SkillsMatrix } from "../components/SkillsMatrix";
import { ContactSection } from "../components/ContactSection";
import { AiChatBubble } from "../components/AiChatBubble";
import { ResumeModal } from "../components/ResumeModal";

export default function Home() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const navLockRef = useRef<number>(0);

  const handleSelectSection = (id: string) => {
    setActiveSection(id);
    navLockRef.current = Date.now() + 1000;
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      if (typeof window !== "undefined" && window.history.pushState) {
        window.history.pushState(null, "", `#${id}`);
      }
    }
  };

  const handleSectionChange = (id: string) => {
    if (Date.now() >= navLockRef.current) {
      setActiveSection(id);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "");
      if (hash && ["hero", "metrics", "systems", "skills", "contact"].includes(hash)) {
        setActiveSection(hash);
      }
    }
  }, []);

  return (
    <main className="min-h-screen bg-transparent text-primary relative selection:bg-accent selection:text-black">
      {/* Ambient 4-Leg 3D Scroll-Scrubbed Background Stage (lets-scroll engine) */}
      <LetsScrollBackground />

      {/* Header Navigation */}
      <Navbar
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
        activeSection={activeSection}
        onSelectSection={handleSelectSection}
      />

      {/* Vertical Interactive Scroll Circuit Trace */}
      <ScrollCircuitTrace
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        onSelectSection={handleSelectSection}
      />

      {/* Step 1: Hero Section */}
      <HeroSection
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
        onSelectSection={handleSelectSection}
      />

      {/* Step 2: Integrated Engineering Benchmark Strip */}
      <MetricsBar />

      {/* Step 3: Flagship Production Systems */}
      <section id="systems" className="scroll-mt-24 py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Flagship Production Architectures
            </h2>
            <p className="text-sm text-primary/80 max-w-[65ch] font-sans">
              Stateful agent workflows, failover state machines, and explainable clinical ML
              ensembles running with complete test automation.
            </p>
          </div>

          {/* System 1: AI-UILS */}
          <CaseStudyUILS />

          {/* System 2: MDRP */}
          <CaseStudyMDRP />
        </div>
      </section>

      {/* Step 4: Capabilities Matrix */}
      <SkillsMatrix />

      {/* Step 5: Direct Contact Hub & Academic Profile */}
      <ContactSection />

      {/* Floating AI Recruiter Assistant with ⌘K support */}
      <AiChatBubble
        isOpen={isChatOpen}
        onOpen={() => setIsChatOpen(true)}
        onClose={() => setIsChatOpen(false)}
      />

      {/* Embedded On-Site Resume Modal */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </main>
  );
}