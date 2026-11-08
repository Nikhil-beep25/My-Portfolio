import React from 'react';
import { Cpu } from 'lucide-react';
import { SkillsGlobe } from '../canvas/SkillsGlobe';

interface SkillsSectionProps {
  isReducedMotion?: boolean;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ isReducedMotion = false }) => {
  return (
    <section id="skills" className="relative py-28 bg-carbon-900 border-t border-white/[0.06] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-accent-cyan/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-white/[0.06]">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-accent-cyan tracking-widest uppercase mb-2">
              <Cpu className="w-3.5 h-3.5" />
              <span>SPHERICAL TYPOGRAPHY & COMPETENCY MATRIX</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase">
              SKILLS & CAPABILITIES
            </h2>
          </div>
          <p className="font-sans text-sm text-slate-400 max-w-md font-light leading-relaxed">
            Rotational 3D coordinate sphere displaying validated competencies across distributed system design, WebGL shader math, cloud infra, and frontend craftsmanship.
          </p>
        </div>

        {/* 3D Typography Globe Component */}
        <SkillsGlobe isReducedMotion={isReducedMotion} />
      </div>
    </section>
  );
};

