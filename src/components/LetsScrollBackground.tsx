"use client";

import React, { useEffect, useRef } from "react";

interface SceneAsset {
  id: string;
  still: string;
  clip: string;
  label: string;
  duration: number;
}

const ASSETS: SceneAsset[] = [
  { id: "intake", still: "/cinematic/vid/still_0.png", clip: "/cinematic/vid/leg_0-optimized.mp4", label: "Ingestion Bay", duration: 10.005 },
  { id: "langgraph", still: "/cinematic/vid/still_1.png", clip: "/cinematic/vid/leg_1-optimized.mp4", label: "LangGraph Chamber", duration: 20.01 },
  { id: "clinical_ml", still: "/cinematic/vid/still_2.png", clip: "/cinematic/vid/leg_2-optimized.mp4", label: "Clinical ML Lab", duration: 30.016 },
  { id: "terminal", still: "/cinematic/vid/still_3.png", clip: "/cinematic/vid/leg_3-optimized.mp4", label: "Executive Console", duration: 30.016 },
];

interface SegmentRuntime {
  target: number;
  cur: number;
  opacity: number;
  visible: boolean;
  ready: boolean;
  loading: boolean;
  video: HTMLVideoElement | null;
  still: HTMLImageElement | null;
  container: HTMLDivElement | null;
}

export const LetsScrollBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const segmentsRef = useRef<SegmentRuntime[]>([]);

  // Initialize segment runtime records
  if (segmentsRef.current.length === 0) {
    segmentsRef.current = ASSETS.map(() => ({
      target: 0,
      cur: 0,
      opacity: 0,
      visible: false,
      ready: false,
      loading: false,
      video: null,
      still: null,
      container: null,
    }));
  }

  useEffect(() => {
    let isCancelled = false;
    const blobUrls: string[] = [];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 1. Blob-backed, demand-loaded clips. A Blob is always seekable even when the
    // production host does not support byte ranges. Only the current scene and its
    // immediate neighbours are fetched, preventing four simultaneous decoders from
    // competing for CPU/GPU work at page load.
    const loadSegmentBlob = async (idx: number) => {
      if (idx < 0 || idx >= ASSETS.length || isCancelled) return;
      const s = segmentsRef.current[idx];
      if (!s || s.loading || s.ready) return;

      s.loading = true;
      const asset = ASSETS[idx];
      try {
        const res = await fetch(asset.clip);
        if (!res.ok) throw new Error("Fetch failed");
        const blob = await res.blob();
        if (isCancelled) return;
        const url = URL.createObjectURL(blob);
        blobUrls.push(url);

        if (s && s.video) {
          s.video.src = url;
          s.video.load();
        }
      } catch (e) {
        // Fallback to direct asset URL if blob fetch fails
        if (s && s.video && !isCancelled) {
          s.video.src = asset.clip;
          s.video.load();
        }
      } finally {
        if (isCancelled) return;
        // Keep the guard in place until the video has metadata. A failed source may
        // be retried later by the browser without triggering a fetch loop here.
        if (!s.video?.src) s.loading = false;
      }
    };

    if (!reduce) {
      loadSegmentBlob(0);
      loadSegmentBlob(1);
    }

    // 2. High-Performance Scroll Calculation (Direct DOM Style Updates — ZERO React Re-renders)
    // Keep perceived camera speed consistent even when rendered legs have
    // different durations. The supplied walkthrough has 10s, 20s, 30s, and
    // 30s legs, so assigning every leg an equal scroll span made the opening
    // fly-through much faster than the finale.
    const seamCrossfadeSeconds = 0.35;

    const updateTargetsAndOpacity = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const docHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      );
      const viewportHeight = window.innerHeight;
      const maxScroll = docHeight - viewportHeight;
      if (maxScroll <= 0) return;

      const progress = Math.max(0, Math.min(1, scrollY / maxScroll));

      const durations = segmentsRef.current.map((segment, idx) => {
        const duration = segment.video?.duration;
        return Number.isFinite(duration) && duration && duration > 0
          ? duration
          : ASSETS[idx].duration;
      });
      const totalDuration = durations.reduce((sum, duration) => sum + duration, 0);
      const fadeHalf = Math.min(0.02, seamCrossfadeSeconds / totalDuration);
      let elapsedDuration = 0;
      let activeIndex = 0;

      for (let idx = 0; idx < ASSETS.length; idx++) {
        const s = segmentsRef.current[idx];
        if (!s) continue;

        const sIn = elapsedDuration / totalDuration;
        elapsedDuration += durations[idx];
        const sOut = elapsedDuration / totalDuration;
        const segmentSize = sOut - sIn;
        if (progress >= sIn) activeIndex = idx;

        // Local progress within this segment
        const local = Math.max(0, Math.min(1, (progress - sIn) / segmentSize));
        s.target = local;

        // Constant-luminance linear crossfade centered at boundaries
        let op = 0;
        if (idx === 0) {
          if (progress <= sOut - fadeHalf) {
            op = 1;
          } else if (progress < sOut + fadeHalf) {
            op = 0.5 - (progress - sOut) / (2 * fadeHalf);
          } else {
            op = 0;
          }
        } else if (idx === ASSETS.length - 1) {
          if (progress <= sIn - fadeHalf) {
            op = 0;
          } else if (progress < sIn + fadeHalf) {
            op = 0.5 + (progress - sIn) / (2 * fadeHalf);
          } else {
            op = 1;
          }
        } else {
          if (progress <= sIn - fadeHalf) {
            op = 0;
          } else if (progress < sIn + fadeHalf) {
            op = 0.5 + (progress - sIn) / (2 * fadeHalf);
          } else if (progress <= sOut - fadeHalf) {
            op = 1;
          } else if (progress < sOut + fadeHalf) {
            op = 0.5 - (progress - sOut) / (2 * fadeHalf);
          } else {
            op = 0;
          }
        }

        const clampedOp = Math.max(0, Math.min(1, op));
        s.opacity = clampedOp;
        s.visible = clampedOp > 0.005;

        // Direct DOM update: runs at native compositor speed
        if (s.container) {
          s.container.style.opacity = clampedOp.toFixed(3);
          s.container.style.visibility = s.visible ? "visible" : "hidden";
        }
      }

      // Preload the neighbouring clips before their crossfade begins. This keeps
      // scrolling immediate without paying the cost of decoding the whole film.
      if (!reduce) {
        loadSegmentBlob(activeIndex - 1);
        loadSegmentBlob(activeIndex);
        loadSegmentBlob(activeIndex + 1);
      }
    };

    let scrollTicking = false;
    const onScroll = () => {
      if (!scrollTicking) {
        scrollTicking = true;
        requestAnimationFrame(() => {
          updateTargetsAndOpacity();
          scrollTicking = false;
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateTargetsAndOpacity();

    // 3. Continuous rAF Smoothing (Lerp) Loop
    let rafId: number;
    const isMobile = window.innerWidth <= 860 || window.matchMedia("(pointer: coarse)").matches;
    const eps = isMobile ? 0.035 : 0.01;
    const damping = reduce ? 1 : isMobile ? 0.34 : 0.46;

    const rafLoop = () => {
      for (let i = 0; i < ASSETS.length; i++) {
        const s = segmentsRef.current[i];
        if (!s || !s.video || !s.ready) continue;

        // Skip if hardware decoder is currently busy
        if (s.video.seeking) continue;

        // Hidden scenes keep their poster. Seeking them is wasted decoder work and
        // was the main source of the stutter during a fast scroll.
        if (!s.visible) continue;

        // Smooth spring interpolation
        s.cur += (s.target - s.cur) * damping;

        const dur = s.video.duration;
        if (!dur || isNaN(dur) || dur <= 0) continue;

        const targetTime = Math.max(0, Math.min(dur - 0.05, s.cur * dur));
        if (Math.abs(s.video.currentTime - targetTime) > eps) {
          try {
            s.video.currentTime = targetTime;
          } catch (e) {
            // Ignore seek collisions
          }
        }
      }

      rafId = requestAnimationFrame(rafLoop);
    };

    rafId = requestAnimationFrame(rafLoop);

    return () => {
      isCancelled = true;
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
      blobUrls.forEach((u) => URL.revokeObjectURL(u));
      segmentsRef.current.forEach((segment) => {
        segment.loading = false;
        segment.ready = false;
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none"
      style={{ willChange: "transform", transform: "translateZ(0)" }}
    >
      {/* 4-Scene Background Layer */}
      {ASSETS.map((asset, idx) => (
        <div
          key={asset.id}
          ref={(el) => {
            if (segmentsRef.current[idx]) {
              segmentsRef.current[idx].container = el;
            }
          }}
          className="absolute inset-0 w-full h-full will-change-transform"
          style={{
            opacity: idx === 0 ? 1 : 0,
            visibility: idx === 0 ? "visible" : "hidden",
            transform: "translateZ(0)",
          }}
        >
          {/* Instant Paint High-Res Still Poster */}
          <img
            ref={(el) => {
              if (segmentsRef.current[idx]) {
                segmentsRef.current[idx].still = el;
              }
            }}
            src={asset.still}
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500 pointer-events-none"
          />

          {/* Continuous Scrubbed Video Leg */}
          <video
            ref={(el) => {
              if (segmentsRef.current[idx]) {
                segmentsRef.current[idx].video = el;
              }
            }}
            muted
            playsInline
            preload="auto"
            onLoadedData={() => {
              const s = segmentsRef.current[idx];
              if (s) {
                s.ready = true;
                s.loading = false;
              }
            }}
            onError={() => {
              const s = segmentsRef.current[idx];
              if (s) s.loading = false;
            }}
            onSeeked={() => {
              const s = segmentsRef.current[idx];
              if (s) {
                if (s.video) s.video.style.opacity = "1";
                if (s.still) s.still.style.opacity = "0";
              }
            }}
            className="absolute inset-0 w-full h-full object-cover object-center opacity-0 transition-opacity duration-500 pointer-events-none"
            style={{ transform: "translateZ(0)" }}
          />
        </div>
      ))}

      {/* Atmospheric Contrast & Vignette Overlays (Hardware-friendly zero-backdrop-blur) */}
      <div className="absolute inset-0 bg-[#28282B]/60" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#28282B]/90 via-[#28282B]/20 to-[#28282B]/95" />
      <div className="absolute inset-0 bg-radial-vignette" />
    </div>
  );
};
