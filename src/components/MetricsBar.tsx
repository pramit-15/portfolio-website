"use client";

import React from "react";
import { highImpactMetrics } from "../data/portfolioData";
import { Activity, ShieldCheck, Cpu, Database } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Activity: <Activity className="w-4 h-4 text-accent" />,
  ShieldCheck: <ShieldCheck className="w-4 h-4 text-accent" />,
  Cpu: <Cpu className="w-4 h-4 text-accent" />,
  Database: <Database className="w-4 h-4 text-accent" />,
};

export const MetricsBar: React.FC = () => {
  return (
    <section
      id="metrics"
      className="scroll-mt-24 pt-10 pb-16 relative z-10 border-b hairline-divider bg-surface/10"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Section Header */}
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Empirical Benchmarks & Test Proof
          </h2>
          <p className="text-sm text-primary/80 max-w-[65ch] font-sans">
            Held-out clinical test evaluations, multi-provider failover resiliency, and
            comprehensive test suites across deployed pipelines.
          </p>
        </div>

        {/* Aligned 4-Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {highImpactMetrics.map((metric, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 rounded-2xl bg-surface/30 hairline-border hover:border-accent/40 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="p-2 rounded-lg bg-canvas hairline-border">
                  {iconMap[metric.iconName] || <Activity className="w-4 h-4 text-accent" />}
                </span>
                <span className="text-[10px] font-mono text-muted/80 tracking-wide uppercase">
                  Verified
                </span>
              </div>

              <div className="space-y-1">
                <div className="font-mono tabular-nums text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                  {metric.value}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-white font-sans">
                  {metric.label}
                </div>
                <p className="text-[11px] text-muted leading-relaxed font-sans pt-1">
                  {metric.sublabel}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
