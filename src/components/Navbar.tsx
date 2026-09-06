"use client";

import React, { useState } from "react";
import { personalInfo } from "../data/portfolioData";
import { FileText, Menu, X, Terminal, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";

interface NavbarProps {
  onOpenResume: () => void;
  onOpenChat: () => void;
  activeSection?: string;
  onSelectSection?: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenResume,
  onOpenChat,
  activeSection,
  onSelectSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    if (onSelectSection) {
      onSelectSection(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-canvas/85 backdrop-blur-md hairline-border-b border-b border-white/[0.08] transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Identity & Status */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              onClick={(e) => handleNavClick(e, "hero")}
              className="flex items-center gap-2.5 text-white font-mono text-xs font-semibold tracking-tight hover:text-accent transition-colors"
            >
              <span className="w-7 h-7 rounded-md bg-surface hairline-border flex items-center justify-center text-accent font-bold">
                PS
              </span>
              <span className="hidden sm:inline font-sans text-sm font-semibold tracking-normal">
                Pramit Shrivastav
              </span>
            </a>

            <div className="hidden lg:flex items-center gap-2 pl-3 border-l hairline-divider text-[11px] font-mono text-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Available for AI/ML roles</span>
            </div>
          </div>

          {/* Center Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-mono">
            <a
              href="#metrics"
              onClick={(e) => handleNavClick(e, "metrics")}
              className={`transition-colors ${
                activeSection === "metrics"
                  ? "text-accent font-semibold"
                  : "text-muted hover:text-white"
              }`}
            >
              Benchmarks
            </a>
            <a
              href="#systems"
              onClick={(e) => handleNavClick(e, "systems")}
              className={`transition-colors ${
                activeSection === "systems"
                  ? "text-accent font-semibold"
                  : "text-muted hover:text-white"
              }`}
            >
              Systems
            </a>
            <a
              href="#skills"
              onClick={(e) => handleNavClick(e, "skills")}
              className={`transition-colors ${
                activeSection === "skills"
                  ? "text-accent font-semibold"
                  : "text-muted hover:text-white"
              }`}
            >
              Capabilities
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "contact")}
              className={`transition-colors ${
                activeSection === "contact"
                  ? "text-accent font-semibold"
                  : "text-muted hover:text-white"
              }`}
            >
              Contact
            </a>
          </nav>

          {/* Right Action Group */}
          <div className="flex items-center gap-2.5">
            {/* AI Assistant Quick Trigger */}
            <button
              onClick={onOpenChat}
              className="hidden sm:flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-surface/80 hover:bg-surface hairline-border text-xs font-mono text-muted hover:text-white transition-all"
              title="Open AI Engineering Assistant (or press ⌘K)"
            >
              <Terminal className="w-3.5 h-3.5 text-accent" />
              <span>AI Chat</span>
              <kbd className="px-1.5 py-0.5 rounded bg-canvas text-[10px] text-muted border border-white/[0.1]">
                ⌘K
              </kbd>
            </button>

            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-surface/60 hover:bg-surface hairline-border text-muted hover:text-white transition-all"
              title="GitHub Profile"
            >
              <GithubIcon className="w-3.5 h-3.5" />
            </a>

            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-surface/60 hover:bg-surface hairline-border text-muted hover:text-white transition-all"
              title="LinkedIn Profile"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
            </a>

            {/* Resume Trigger CTA */}
            <button
              onClick={onOpenResume}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent text-canvas font-mono font-semibold text-xs hover:bg-accent/90 transition-all shadow-sm"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-lg text-muted hover:text-white"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="md:hidden bg-canvas border-b hairline-divider px-4 py-4 space-y-3 font-mono text-xs"
        >
          <a
            href="#metrics"
            onClick={(e) => {
              setMobileMenuOpen(false);
              handleNavClick(e, "metrics");
            }}
            className={`block py-1 transition-colors ${
              activeSection === "metrics"
                ? "text-accent font-semibold"
                : "text-muted hover:text-white"
            }`}
          >
            Benchmarks
          </a>
          <a
            href="#systems"
            onClick={(e) => {
              setMobileMenuOpen(false);
              handleNavClick(e, "systems");
            }}
            className={`block py-1 transition-colors ${
              activeSection === "systems"
                ? "text-accent font-semibold"
                : "text-muted hover:text-white"
            }`}
          >
            Systems
          </a>
          <a
            href="#skills"
            onClick={(e) => {
              setMobileMenuOpen(false);
              handleNavClick(e, "skills");
            }}
            className={`block py-1 transition-colors ${
              activeSection === "skills"
                ? "text-accent font-semibold"
                : "text-muted hover:text-white"
            }`}
          >
            Capabilities
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              setMobileMenuOpen(false);
              handleNavClick(e, "contact");
            }}
            className={`block py-1 transition-colors ${
              activeSection === "contact"
                ? "text-accent font-semibold"
                : "text-muted hover:text-white"
            }`}
          >
            Contact
          </a>
          <div className="pt-3 border-t hairline-divider flex items-center justify-between">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenChat();
              }}
              className="flex items-center gap-1.5 text-accent"
            >
              <Terminal className="w-3.5 h-3.5" /> Launch AI Assistant
            </button>
            <div className="flex items-center gap-2">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-muted hover:text-white"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-muted hover:text-white"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
