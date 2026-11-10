import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Layers, CheckCircle2, X, ExternalLink, Github } from 'lucide-react';
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

  // Visual thumbnail mockup rendered using the generated project images
  const renderProjectVisual = (proj: Project) => {
    return (
      <div className="w-full h-44 sm:h-56 rounded-xl border border-white/10 relative overflow-hidden group bg-carbon-950">
        <img
          src={`/projects/${proj.id}.jpg`}
          alt={proj.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-carbon-950 via-carbon-950/20 to-transparent opacity-80" />
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
          <span className="px-2 py-0.5 rounded bg-carbon-950/80 border border-white/10 font-mono text-[9px] text-accent-cyan tracking-widest uppercase backdrop-blur-sm">
            {proj.category}
          </span>
          <span className="px-2 py-0.5 rounded bg-carbon-950/80 border border-white/10 font-mono text-[9px] text-white/70 backdrop-blur-sm">
            {proj.year}
          </span>
        </div>
      </div>
    );
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
                className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-carbon-900 border border-white/10 text-white hover:border-accent-cyan hover:bg-carbon-800 transition-all cursor-pointer"
                title="Previous Project (Left Arrow)"
                aria-label="Previous project"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextProject}
                className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-carbon-900 border border-white/10 text-white hover:border-accent-cyan hover:bg-carbon-800 transition-all cursor-pointer"
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
                className={`absolute w-full max-w-[calc(100vw-32px)] sm:max-w-[480px] md:max-w-[560px] rounded-2xl bg-carbon-900 border transition-all duration-700 ease-out cursor-pointer p-5 sm:p-8 flex flex-col justify-between shadow-2xl ${
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
                  <div className="flex items-center gap-2">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1 px-2.5 py-1 rounded bg-accent-cyan/10 hover:bg-accent-cyan/20 border border-accent-cyan/30 text-accent-cyan font-mono text-[10px] font-bold transition-colors"
                      >
                        <span>LIVE DEMO</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    {project.technologies.slice(0, 2).map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.04] text-slate-400 border border-white/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5 font-mono text-xs text-accent-cyan font-bold tracking-wider uppercase">
                    <span>CASE STUDY</span>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-carbon-950/90 backdrop-blur-xl animate-fade-in">
          <div className="relative w-full max-w-3xl rounded-2xl bg-carbon-900 border border-white/15 p-4 sm:p-6 md:p-10 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedCaseStudy(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-carbon-800 text-slate-400 hover:text-white hover:bg-carbon-700 transition-colors cursor-pointer"
              aria-label="Close modal"
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

              {/* Action Buttons in Modal */}
              <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-white/10">
                {selectedCaseStudy.link && (
                  <a
                    href={selectedCaseStudy.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent-cyan text-carbon-950 font-mono text-xs font-bold hover:bg-white transition-all shadow-lg shadow-accent-cyan/10"
                  >
                    <span>VISIT LIVE PLATFORM</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                {selectedCaseStudy.github && (
                  <a
                    href={selectedCaseStudy.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-carbon-800 text-white font-mono text-xs border border-white/15 hover:border-white/30 transition-all"
                  >
                    <Github className="w-4 h-4" />
                    <span>EXPLORE GITHUB REPO</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

