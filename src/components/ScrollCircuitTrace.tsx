"use client";

import React, { useEffect, useRef, useState } from "react";

const sections = [
  { id: "hero", num: "00", title: "Init", desc: "Telemetry & Overview" },
  { id: "metrics", num: "01", title: "Benchmarks", desc: "Empirical Accuracy & Tests" },
  { id: "systems", num: "02", title: "Systems", desc: "LangGraph & Clinical ML" },
  { id: "skills", num: "03", title: "Capabilities", desc: "Production Stack & Proof" },
  { id: "contact", num: "04", title: "Connect", desc: "Inquiries & Credentials" },
];

interface ScrollCircuitTraceProps {
  activeSection?: string;
  onSectionChange?: (id: string) => void;
  onSelectSection?: (id: string) => void;
}

export const ScrollCircuitTrace: React.FC<ScrollCircuitTraceProps> = ({
  activeSection: activeSectionProp,
  onSectionChange,
  onSelectSection,
}) => {
  const [localActiveSection, setLocalActiveSection] = useState("hero");
  const lastSectionRef = useRef<string>("hero");
  const progressFillRef = useRef<HTMLDivElement>(null);
  const runnerRef = useRef<HTMLDivElement>(null);
  const percentTextRef = useRef<HTMLSpanElement>(null);

  const activeSection = activeSectionProp ?? localActiveSection;

  const handleItemClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    if (onSelectSection) {
      onSelectSection(id);
    } else {
      setLocalActiveSection(id);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const viewportHeight = window.innerHeight;
      const docHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      );
      const totalHeight = docHeight - viewportHeight;

      // 0. Update linear gauge directly in DOM without React re-renders
      if (totalHeight > 0) {
        const currentProgress = Math.min(100, Math.max(0, (scrollY / totalHeight) * 100));
        if (progressFillRef.current) {
          progressFillRef.current.style.height = `${currentProgress}%`;
        }
        if (runnerRef.current) {
          runnerRef.current.style.top = `calc(${currentProgress}% - 5px)`;
        }
        if (percentTextRef.current) {
          percentTextRef.current.textContent = `${Math.round(currentProgress)}%`;
        }
      }

      const updateSection = (id: string) => {
        if (id === lastSectionRef.current) return;
        lastSectionRef.current = id;
        if (onSectionChange) {
          onSectionChange(id);
        } else {
          setLocalActiveSection(id);
        }
      };

      // 1. Top of page check
      if (scrollY < 120) {
        updateSection("hero");
        return;
      }

      // 2. Check for contact section / document bottom
      const contactEl = document.getElementById("contact");
      const isNearBottom = scrollY + viewportHeight >= docHeight - 250;
      if (isNearBottom) {
        updateSection("contact");
        return;
      }

      if (contactEl) {
        const contactRect = contactEl.getBoundingClientRect();
        if (contactRect.top <= viewportHeight * 0.65) {
          updateSection("contact");
          return;
        }
      }

      // 3. Probing for intermediate sections (skills, systems, metrics)
      const probeY = viewportHeight * 0.38;
      let detectedSection = "hero";

      for (const section of sections) {
        if (section.id === "contact") continue;
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= probeY) {
            detectedSection = section.id;
          }
        }
      }

      updateSection(detectedSection);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [onSectionChange]);

  return (
    <>
      {/* LEFT: Pointer-Wise Milestone Navigator with Viewing Description */}
      <nav
        aria-label="Section milestone navigator"
        className="hidden 2xl:flex fixed left-8 top-1/2 -translate-y-1/2 z-30 flex-col gap-5 select-none"
      >
        <div className="flex flex-col gap-4 p-3.5 rounded-2xl bg-canvas/95 backdrop-blur-md hairline-border shadow-2xl">
          <div className="text-[10px] font-mono text-muted uppercase tracking-wider px-1 pb-1 border-b hairline-divider">
            Navigation
          </div>

          <div className="space-y-3">
            {sections.map((sec) => {
              const isActive = activeSection === sec.id;
              return (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  onClick={(e) => handleItemClick(e, sec.id)}
                  className="group flex items-center gap-3 cursor-pointer transition-all"
                  title={sec.desc}
                >
                  {/* Point Indicator Dot */}
                  <div
                    className={`flex items-center justify-center rounded-full transition-all duration-200 shrink-0 ${
                      isActive
                        ? "w-4 h-4 bg-canvas border-2 border-accent shadow-glow"
                        : "w-3.5 h-3.5 bg-canvas border border-white/20 group-hover:border-accent"
                    }`}
                  >
                    <span
                      className={`rounded-full transition-all ${
                        isActive
                          ? "w-1.5 h-1.5 bg-accent"
                          : "w-1 h-1 bg-white/25 group-hover:bg-accent"
                      }`}
                    />
                  </div>

                  {/* Text Description with Viewing Label */}
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-[11px] text-muted">{sec.num}</span>
                      <span
                        className={`text-xs font-mono font-medium transition-colors ${
                          isActive
                            ? "text-white font-semibold"
                            : "text-primary/70 group-hover:text-white"
                        }`}
                      >
                        {sec.title}
                      </span>
                    </div>

                    <span
                      className={`text-[10px] font-sans transition-all max-w-[170px] leading-tight ${
                        isActive
                          ? "text-white/90 font-medium opacity-100"
                          : "text-muted/50 group-hover:text-muted opacity-80"
                      }`}
                    >
                      {sec.desc}
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </nav>

      {/* RIGHT: Pure Linear Continuous Scroll Progress Gauge */}
      <aside
        aria-label="Linear scroll progress gauge"
        className="hidden xl:flex fixed right-6 top-1/3 bottom-1/3 z-30 flex-col items-center pointer-events-none select-none"
      >
        <div className="relative w-[2px] h-full bg-white/[0.08] rounded-full">
          {/* Dynamic Linear Progress Fill (Zero lag, direct transform/height) */}
          <div
            ref={progressFillRef}
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-accent to-accent-secondary rounded-full shadow-glow-sm"
            style={{ height: "0%" }}
          />

          {/* Moving Glowing Runner Packet */}
          <div
            ref={runnerRef}
            className="absolute -left-[4px] w-2.5 h-2.5 rounded-full bg-accent shadow-glow"
            style={{ top: "-5px" }}
          />
        </div>

        {/* Live Linear Percentage Indicator */}
        <span ref={percentTextRef} className="mt-3 font-mono tabular-nums text-[10px] text-muted/80">
          0%
        </span>
      </aside>
    </>
  );
};