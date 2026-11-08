import React, { useState } from 'react';
import { Layers, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { PROJECTS, Project } from '../../data/portfolioData';

export const ProjectShowcase: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative py-28 bg-carbon-900 border-t border-white/[0.06] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent-cyan/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-white/[0.06]">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-accent-cyan tracking-widest uppercase mb-2">
              <Layers className="w-3.5 h-3.5" />
              <span>SELECTED ARCHITECTURE & PRODUCTION VENTURES</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase">
              FEATURED PROJECTS
            </h2>
          </div>
          <p className="font-sans text-sm text-slate-400 max-w-md font-light leading-relaxed">
            High-integrity digital solutions engineering civic accessibility, cryptographic verification, automotive telemetry, and institutional automation.
          </p>
        </div>

        {/* 3D Perspective Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((proj, idx) => (
            <div
              key={proj.id}
              id={proj.id}
              onClick={() => setSelectedProject(proj)}
              className="group relative rounded-2xl bg-carbon-950/80 border border-white/10 hover:border-accent-cyan/60 p-8 flex flex-col justify-between transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_30px_rgba(34,211,238,0.15)] cursor-pointer overflow-hidden transform hover:-translate-y-1.5"
            >
              {/* Card top bar */}
              <div>
                <div className="flex items-center justify-between font-mono text-xs text-slate-400 mb-6">
                  <span className="px-2.5 py-1 rounded bg-carbon-850 border border-white/10 text-white font-bold">
                    0{idx + 1} // {proj.year}
                  </span>
                  <span className="tracking-widest uppercase text-accent-cyan text-[11px]">
                    {proj.category}
                  </span>
                </div>

                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white group-hover:text-accent-cyan transition-colors mb-2">
                  {proj.title}
                </h3>
                <p className="font-mono text-xs text-slate-400 tracking-wider mb-4">
                  {proj.tagline}
                </p>
                <p className="font-sans text-sm text-slate-300 leading-relaxed font-light mb-6">
                  {proj.description}
                </p>
              </div>

              {/* Metrics & Tech Tags */}
              <div className="pt-6 border-t border-white/[0.06] space-y-4">
                {/* Metric pill row */}
                <div className="grid grid-cols-3 gap-2">
                  {proj.metrics.map((m) => (
                    <div key={m.label} className="bg-carbon-900/90 rounded-lg p-2.5 border border-white/[0.05]">
                      <div className="font-display font-bold text-sm text-white">{m.value}</div>
                      <div className="font-mono text-[9px] text-slate-500 uppercase tracking-wider">{m.label}</div>
                    </div>
                  ))}
                </div>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5">
                  {proj.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wider bg-white/[0.03] text-slate-400 border border-white/[0.08]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* View Case Study pill */}
                <div className="flex items-center justify-end pt-2 text-xs font-mono text-slate-400 group-hover:text-accent-cyan transition-colors">
                  <span className="tracking-widest uppercase">INSPECT CASE SPEC</span>
                  <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-carbon-950/90 backdrop-blur-md">
          <div className="relative w-full max-w-2xl rounded-2xl bg-carbon-900 border border-white/15 p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-carbon-800 text-slate-400 hover:text-white transition-colors"
            >
              ✕
            </button>

            <span className="font-mono text-xs text-accent-cyan tracking-widest uppercase">
              PROJECT SPECIFICATION // 0{selectedProject.id}
            </span>
            <h3 className="font-display font-extrabold text-3xl text-white mt-1 mb-2">
              {selectedProject.title}
            </h3>
            <p className="font-mono text-xs text-slate-400 mb-6">{selectedProject.tagline}</p>

            <div className="space-y-6 text-sm">
              <div>
                <h4 className="font-mono text-xs text-slate-400 uppercase tracking-widest mb-2">
                  System Architecture & Scope
                </h4>
                <p className="font-sans text-slate-300 leading-relaxed font-light">
                  {selectedProject.description}
                </p>
              </div>

              <div>
                <h4 className="font-mono text-xs text-slate-400 uppercase tracking-widest mb-2">
                  Production Impact & Measurable Outcome
                </h4>
                <div className="p-4 rounded-xl bg-carbon-950/70 border border-white/10 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent-cyan shrink-0 mt-0.5" />
                  <p className="font-sans text-slate-200 leading-relaxed">{selectedProject.impact}</p>
                </div>
              </div>

              <div>
                <h4 className="font-mono text-xs text-slate-400 uppercase tracking-widest mb-3">
                  Key Production Metrics
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  {selectedProject.metrics.map((m) => (
                    <div key={m.label} className="p-3 rounded-lg bg-carbon-950 border border-white/10 text-center">
                      <div className="font-display font-bold text-lg text-accent-cyan">{m.value}</div>
                      <div className="font-mono text-[10px] text-slate-400 uppercase mt-0.5">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-mono text-xs text-slate-400 uppercase tracking-widest mb-2">
                  Technologies Deployed
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((t) => (
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

