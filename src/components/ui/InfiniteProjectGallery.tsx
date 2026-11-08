import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Layers, CheckCircle2, Shield, Activity, Database, Cpu, X } from 'lucide-react';
import { PROJECTS, Project } from '../../data/portfolioData';
import { soundEngine } from '../../utils/audioSynthesizer';

interface InfiniteProjectGalleryProps {
  isReducedMotion?: boolean;
}

export const InfiniteProjectGallery: React.FC<InfiniteProjectGalleryProps> = ({
  isReducedMotion = false,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<Project | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartXRef = useRef<number | null>(null);

  const total = PROJECTS.length;

  const nextProject = useCallback(() => {
    soundEngine.playTick();
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevProject = useCallback(() => {
    soundEngine.playTick();
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedCaseStudy) {
        if (e.key === 'Escape') setSelectedCaseStudy(null);
        return;
      }
      if (e.key === 'ArrowRight') nextProject();
      if (e.key === 'ArrowLeft') prevProject();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextProject, prevProject, selectedCaseStudy]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartXRef.current;
    if (diff > 50) prevProject();
    if (diff < -50) nextProject();
    touchStartXRef.current = null;
  };

  // Visual thumbnail mockups generator based on project theme
  const renderProjectVisual = (proj: Project) => {
    switch (proj.id) {
      case 'nagriksetu':
        return (
          <div className="w-full h-44 sm:h-56 rounded-xl bg-gradient-to-br from-carbon-900 to-carbon-950 border border-white/10 p-5 flex flex-col justify-between relative overflow-hidden group">
            <div className="flex items-center justify-between z-10">
              <span className="font-mono text-[10px] text-accent-cyan tracking-widest uppercase">
                CIVIC_PIPELINE // SECURE
              </span>
              <Activity className="w-4 h-4 text-emerald-400" />
            </div>
            {/* Visual civic schema mockup */}
            <div className="space-y-2 z-10">
              <div className="h-2 w-3/4 rounded bg-white/20 animate-pulse" />
              <div className="h-2 w-1/2 rounded bg-accent-cyan/30" />
              <div className="grid grid-cols-3 gap-2 pt-2">
                <div className="h-8 rounded bg-carbon-850/80 border border-white/10 p-1 flex items-center justify-center font-mono text-[9px] text-slate-400">
                  RTI ENGINE
                </div>
                <div className="h-8 rounded bg-carbon-850/80 border border-white/10 p-1 flex items-center justify-center font-mono text-[9px] text-accent-cyan">
                  GRIEVANCE
                </div>
                <div className="h-8 rounded bg-carbon-850/80 border border-white/10 p-1 flex items-center justify-center font-mono text-[9px] text-slate-400">
                  ELECTORAL
                </div>
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-36 h-36 bg-accent-cyan/10 rounded-full blur-2xl pointer-events-none" />
          </div>
        );
      case 'mysignsetu':
        return (
          <div className="w-full h-44 sm:h-56 rounded-xl bg-gradient-to-br from-carbon-900 to-carbon-950 border border-white/10 p-5 flex flex-col justify-between relative overflow-hidden group">
            <div className="flex items-center justify-between z-10">
              <span className="font-mono text-[10px] text-accent-cyan tracking-widest uppercase">
                CRYPTOGRAPHIC_LAYER // SHA-256
              </span>
              <Shield className="w-4 h-4 text-accent-cyan" />
            </div>
            <div className="space-y-2 z-10">
              <div className="p-2.5 rounded bg-carbon-850/90 border border-white/10 font-mono text-[9px] text-emerald-400 flex items-center justify-between">
                <span>ASYMMETRIC SIGN: VERIFIED</span>
                <span>Ed25519</span>
              </div>
              <div className="h-1.5 w-full rounded bg-white/10 overflow-hidden">
                <div className="h-full bg-accent-cyan w-4/5" />
              </div>
            </div>
            <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
          </div>
        );
      case 'carverse':
        return (
          <div className="w-full h-44 sm:h-56 rounded-xl bg-gradient-to-br from-carbon-900 to-carbon-950 border border-white/10 p-5 flex flex-col justify-between relative overflow-hidden group">
            <div className="flex items-center justify-between z-10">
              <span className="font-mono text-[10px] text-accent-cyan tracking-widest uppercase">
                3D TELEMETRY STREAM // 60 FPS
              </span>
              <Cpu className="w-4 h-4 text-purple-400" />
            </div>
            <div className="flex items-center justify-center py-2 z-10">
              <div className="w-20 h-20 rounded-full border border-dashed border-accent-cyan/50 flex items-center justify-center animate-spin" style={{ animationDuration: '12s' }}>
                <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center font-mono text-[9px] text-white">
                  3D PBR
                </div>
              </div>
            </div>
            <div className="absolute -top-10 -right-10 w-36 h-36 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
          </div>
        );
      case 'vidyasanchar':
      default:
        return (
          <div className="w-full h-44 sm:h-56 rounded-xl bg-gradient-to-br from-carbon-900 to-carbon-950 border border-white/10 p-5 flex flex-col justify-between relative overflow-hidden group">
            <div className="flex items-center justify-between z-10">
              <span className="font-mono text-[10px] text-accent-cyan tracking-widest uppercase">
                CAMPUS_SYNC // 50K PROFILES
              </span>
              <Database className="w-4 h-4 text-blue-400" />
            </div>
            <div className="space-y-2 z-10">
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 rounded bg-carbon-850/80 border border-white/10 font-mono text-[9px]">
                  <span className="text-slate-400 block">FEE ARCHITECTURE</span>
                  <span className="text-white font-bold">100% RECONCILED</span>
                </div>
                <div className="p-2 rounded bg-carbon-850/80 border border-white/10 font-mono text-[9px]">
                  <span className="text-slate-400 block">ACADEMIC FABRIC</span>
                  <span className="text-accent-cyan font-bold">REAL-TIME</span>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-36 h-36 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
          </div>
        );
    }
  };

  return (
    <section id="gallery" className="relative py-28 bg-carbon-950 border-t border-white/[0.06] overflow-hidden">
      {/* Background glow & subtle depth lines */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[400px] bg-accent-cyan/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-white/[0.06]">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-accent-cyan tracking-widest uppercase mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>INTERACTIVE 3D PROJECT NAVIGATOR</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase">
              INFINITE PERSPECTIVE GALLERY
            </h2>
          </div>

          {/* Navigation Controls & Counter */}
          <div className="flex items-center gap-4">
            <div className="font-mono text-xs text-slate-400 tracking-widest">
              <span className="text-white font-bold">0{activeIndex + 1}</span> / 0{total}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prevProject}
                className="p-3 rounded-full bg-carbon-900 border border-white/10 text-white hover:border-accent-cyan hover:bg-carbon-800 transition-all cursor-pointer"
                title="Previous Project (Left Arrow)"
                aria-label="Previous project"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextProject}
                className="p-3 rounded-full bg-carbon-900 border border-white/10 text-white hover:border-accent-cyan hover:bg-carbon-800 transition-all cursor-pointer"
                title="Next Project (Right Arrow)"
                aria-label="Next project"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 3D Perspective Carousel Stage */}
        <div
          ref={containerRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative w-full h-[520px] sm:h-[580px] flex items-center justify-center [perspective:1400px] select-none"
        >
          {PROJECTS.map((project, idx) => {
            // Calculate relative offset around ring (-1, 0, 1, etc.)
            let offset = idx - activeIndex;
            if (offset < -1) offset += total;
            if (offset > 1) offset -= total;

            const isCurrent = offset === 0;
            const isLeft = offset === -1;
            const isRight = offset === 1;
            const isHidden = Math.abs(offset) > 1;

            if (isHidden && !isReducedMotion) return null;

            // Compute 3D transformation values
            let transformStyle = '';
            let opacity = 0;
            let zIndex = 10;

            if (isReducedMotion) {
              // Static accessible layout
              if (idx !== activeIndex) return null;
              transformStyle = 'none';
              opacity = 1;
              zIndex = 30;
            } else if (isCurrent) {
              transformStyle = 'translateX(0%) translateZ(40px) rotateY(0deg) scale(1)';
              opacity = 1;
              zIndex = 30;
            } else if (isLeft) {
              transformStyle = 'translateX(-70%) translateZ(-120px) rotateY(22deg) scale(0.88)';
              opacity = 0.55;
              zIndex = 20;
            } else if (isRight) {
              transformStyle = 'translateX(70%) translateZ(-120px) rotateY(-22deg) scale(0.88)';
              opacity = 0.55;
              zIndex = 20;
            }

            return (
              <div
                key={project.id}
                onClick={() => {
                  if (isCurrent) setSelectedCaseStudy(project);
                  else if (isLeft) prevProject();
                  else if (isRight) nextProject();
                }}
                className={`absolute w-full max-w-[360px] sm:max-w-[480px] md:max-w-[560px] rounded-2xl bg-carbon-900 border transition-all duration-700 ease-out cursor-pointer p-6 sm:p-8 flex flex-col justify-between shadow-2xl ${
                  isCurrent
                    ? 'border-accent-cyan/60 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_35px_rgba(34,211,238,0.2)]'
                    : 'border-white/10 hover:border-white/20'
                }`}
                style={{
                  transform: transformStyle,
                  opacity: opacity,
                  zIndex: zIndex,
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Visual Thumbnail */}
                <div className="mb-6">{renderProjectVisual(project)}</div>

                {/* Content */}
                <div>
                  <div className="flex items-center justify-between font-mono text-xs text-slate-400 mb-2">
                    <span className="text-accent-cyan tracking-wider uppercase font-semibold">
                      {project.category}
                    </span>
                    <span>{project.year}</span>
                  </div>

                  <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white uppercase tracking-tight mb-2">
                    {project.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed font-light mb-6">
                    {project.description}
                  </p>

                  {/* Metrics bar */}
                  <div className="grid grid-cols-3 gap-2 mb-6">
                    {project.metrics.map((m) => (
                      <div key={m.label} className="p-2 rounded bg-carbon-950/80 border border-white/[0.06] text-center">
                        <div className="font-display font-bold text-xs sm:text-sm text-white">{m.value}</div>
                        <div className="font-mono text-[8px] sm:text-[9px] text-slate-500 uppercase mt-0.5 truncate">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer link */}
                <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.04] text-slate-400 border border-white/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5 font-mono text-xs text-accent-cyan font-bold tracking-wider uppercase">
                    <span>EXPLORE CASE STUDY</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full Dedicated Case Study Page Modal */}
      {selectedCaseStudy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-carbon-950/90 backdrop-blur-xl animate-fade-in">
          <div className="relative w-full max-w-3xl rounded-2xl bg-carbon-900 border border-white/15 p-6 sm:p-10 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedCaseStudy(null)}
              className="absolute top-6 right-6 p-2.5 rounded-full bg-carbon-800 text-slate-400 hover:text-white hover:bg-carbon-700 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Case Study Metadata */}
            <div className="flex items-center gap-3 mb-2 font-mono text-xs text-accent-cyan tracking-widest uppercase">
              <span>CASE STUDY FILE // {selectedCaseStudy.id.toUpperCase()}</span>
              <span>•</span>
              <span>{selectedCaseStudy.year}</span>
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white uppercase tracking-tight mb-2">
              {selectedCaseStudy.title}
            </h2>
            <p className="font-mono text-sm text-slate-400 mb-8">{selectedCaseStudy.tagline}</p>

            {/* Visual representation */}
            <div className="mb-8">{renderProjectVisual(selectedCaseStudy)}</div>

            {/* Case Study In-depth Sections */}
            <div className="space-y-8 text-sm">
              <div>
                <h4 className="font-mono text-xs text-accent-cyan uppercase tracking-widest mb-2">
                  01 // The Problem & Operational Context
                </h4>
                <p className="font-sans text-slate-300 leading-relaxed font-light">
                  Prior to the implementation of {selectedCaseStudy.title}, workflows suffered from fragmented protocols, high manual overhead, and inadequate transparency. The objective was to engineer an uncompromising digital system delivering instant latency, high security, and universal user accessibility.
                </p>
              </div>

              <div>
                <h4 className="font-mono text-xs text-accent-cyan uppercase tracking-widest mb-2">
                  02 // Architecture & Technical Formulation
                </h4>
                <p className="font-sans text-slate-300 leading-relaxed font-light mb-4">
                  {selectedCaseStudy.description}
                </p>
                <div className="p-4 rounded-xl bg-carbon-950 border border-white/10 font-mono text-xs text-slate-300 space-y-2">
                  <div className="text-accent-cyan font-bold uppercase">// CORE SPECIFICATIONS:</div>
                  <div>• Sub-system latency: Engineered with distributed caching (Redis) and indexed database queries.</div>
                  <div>• Fault-tolerance: Microservice boundaries with circuit-breaker resilience.</div>
                  <div>• Sensory UI: Real-time telemetry streaming over WebSockets and WebGL canvas components.</div>
                </div>
              </div>

              <div>
                <h4 className="font-mono text-xs text-accent-cyan uppercase tracking-widest mb-2">
                  03 // Production Impact & Verifiable Metrics
                </h4>
                <div className="p-4 rounded-xl bg-accent-cyan/10 border border-accent-cyan/30 flex items-start gap-3 mb-4">
                  <CheckCircle2 className="w-5 h-5 text-accent-cyan shrink-0 mt-0.5" />
                  <p className="font-sans text-slate-200 leading-relaxed">{selectedCaseStudy.impact}</p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {selectedCaseStudy.metrics.map((m) => (
                    <div key={m.label} className="p-3 rounded-lg bg-carbon-950 border border-white/10 text-center">
                      <div className="font-display font-bold text-lg text-accent-cyan">{m.value}</div>
                      <div className="font-mono text-[10px] text-slate-400 uppercase mt-0.5">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-mono text-xs text-accent-cyan uppercase tracking-widest mb-2">
                  04 // Deployed Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCaseStudy.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded bg-carbon-800 border border-white/10 text-xs font-mono text-slate-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

