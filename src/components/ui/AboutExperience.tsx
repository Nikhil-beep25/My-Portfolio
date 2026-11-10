import React from 'react';
import { User, Briefcase, Award, Terminal, Code2 } from 'lucide-react';
import { EXPERIENCES } from '../../data/portfolioData';

export const AboutExperience: React.FC = () => {
  return (
    <section id="about" className="relative py-28 bg-carbon-900 border-t border-white/[0.06] overflow-hidden">
      {/* Background glow atmosphere */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-accent-cyan/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-white/[0.06]">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-accent-cyan tracking-widest uppercase mb-2">
              <User className="w-3.5 h-3.5" />
              <span>PROFILE & ARCHITECTURAL MANIFESTO</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase">
              ABOUT NIKHIL
            </h2>
          </div>
          <p className="font-sans text-sm text-slate-400 max-w-md font-light leading-relaxed">
            Bridging heavy-duty backend infrastructure with tactile, sensory 3D interfaces designed for high concurrency and uncompromising visual fidelity.
          </p>
        </div>

        {/* Narrative & Stats Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
          {/* Left Column: Architectural Manifesto */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-white leading-tight">
              Engineering systems that perform with mathematical precision and feel alive in the browser.
            </h3>
            <p className="font-sans text-base text-slate-300 leading-relaxed font-light">
              I am a Senior Full-Stack Architect and Creative Technologist based in India. My engineering work is grounded in two disciplines: building robust, fault-tolerant distributed cloud services, and pushing WebGL / GLSL shaders to deliver tactile digital experiences.
            </p>
            <p className="font-sans text-base text-slate-300 leading-relaxed font-light">
              Across flagship projects like <strong className="text-white font-semibold">CarVerse</strong>, <strong className="text-white font-semibold">NagrikSetu</strong>, and <strong className="text-white font-semibold">VidyaSanchar</strong>, I have focused on solving real-world friction—whether streaming high-throughput vehicle telemetry and rentals in real-time, providing citizens transparent cryptographic access to civic mechanisms, or unifying institutional academic lifecycles into a synchronized relational database.
            </p>

            {/* Key Architectural Tenets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-carbon-950/70 border border-white/10 space-y-1">
                <div className="flex items-center gap-2 font-mono text-xs text-accent-cyan uppercase tracking-wider">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Systems Before Syntax</span>
                </div>
                <p className="font-sans text-xs text-slate-400 leading-relaxed">
                  Clear domain boundaries, database indexing, and caching topologies take precedence over transient framework churn.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-carbon-950/70 border border-white/10 space-y-1">
                <div className="flex items-center gap-2 font-mono text-xs text-accent-cyan uppercase tracking-wider">
                  <Code2 className="w-3.5 h-3.5" />
                  <span>GPU-Conscious WebGL</span>
                </div>
                <p className="font-sans text-xs text-slate-400 leading-relaxed">
                  Mathematical shaders and vertex buffers engineered to sustain locked 60 FPS without overheating client hardware.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Key Statistics Matrix */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="p-5 sm:p-6 rounded-2xl bg-carbon-950/80 border border-white/10 text-center flex flex-col justify-center space-y-1">
              <div className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-tight">5+</div>
              <div className="font-mono text-[11px] text-accent-cyan uppercase tracking-wider">Years Architecture</div>
              <p className="font-sans text-[11px] text-slate-500 mt-1">Full-stack & systems engineering</p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-carbon-950/80 border border-white/10 text-center flex flex-col justify-center space-y-1">
              <div className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-tight">3</div>
              <div className="font-mono text-[11px] text-accent-cyan uppercase tracking-wider">Flagship Platforms</div>
              <p className="font-sans text-[11px] text-slate-500 mt-1">CarVerse, NagrikSetu, VidyaSanchar</p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-carbon-950/80 border border-white/10 text-center flex flex-col justify-center space-y-1">
              <div className="font-display font-extrabold text-4xl sm:text-5xl text-accent-cyan tracking-tight">99.9%</div>
              <div className="font-mono text-[11px] text-slate-300 uppercase tracking-wider">Service Reliability</div>
              <p className="font-sans text-[11px] text-slate-500 mt-1">Fault-tolerant distributed pipelines</p>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-carbon-950/80 border border-white/10 text-center flex flex-col justify-center space-y-1">
              <div className="font-display font-extrabold text-4xl sm:text-5xl text-emerald-400 tracking-tight">&lt;180ms</div>
              <div className="font-mono text-[11px] text-slate-300 uppercase tracking-wider">P99 Latency</div>
              <p className="font-sans text-[11px] text-slate-500 mt-1">Optimized query & caching layers</p>
            </div>
          </div>
        </div>

        {/* Experience Timeline */}
        <div className="pt-12 border-t border-white/[0.06]">
          <div className="flex items-center gap-2 font-mono text-xs text-accent-cyan tracking-widest uppercase mb-8">
            <Briefcase className="w-3.5 h-3.5" />
            <span>CHRONOLOGY OF PROFESSIONAL LEADERSHIP</span>
          </div>

          <div className="space-y-8">
            {EXPERIENCES.map((exp, idx) => (
              <div
                key={exp.role + idx}
                className="p-5 sm:p-8 rounded-2xl bg-carbon-950/60 border border-white/10 hover:border-white/20 transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="font-display font-bold text-xl sm:text-2xl text-white">
                      {exp.role}
                    </h4>
                    <p className="font-mono text-xs text-accent-cyan mt-0.5">
                      {exp.company} • {exp.location}
                    </p>
                  </div>
                  <span className="font-mono text-xs text-slate-400 px-3 py-1 rounded bg-carbon-900 border border-white/10 w-fit">
                    {exp.period}
                  </span>
                </div>

                <ul className="space-y-2 pt-2">
                  {exp.highlights.map((hl, hIdx) => (
                    <li key={hIdx} className="font-sans text-sm text-slate-300 flex items-start gap-2.5 font-light">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan shrink-0 mt-2" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Achievements / Technical Milestones */}
        <div className="mt-16 pt-12 border-t border-white/[0.06]">
          <div className="flex items-center gap-2 font-mono text-xs text-accent-cyan tracking-widest uppercase mb-6">
            <Award className="w-3.5 h-3.5" />
            <span>RECOGNITION & SYSTEM CERTIFICATIONS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-carbon-950/50 border border-white/10 space-y-2">
              <span className="font-mono text-xs text-accent-cyan uppercase tracking-wider block">MERN STACK ARCHITECTURE</span>
              <h5 className="font-display font-bold text-sm text-white">CarVerse Telemetry Pipeline</h5>
              <p className="font-sans text-xs text-slate-400 leading-relaxed">
                Engineered full-stack automotive reservation system with dynamic Razorpay payments, real-time fleet inventory tracking, and role-based access control.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-carbon-950/50 border border-white/10 space-y-2">
              <span className="font-mono text-xs text-accent-cyan uppercase tracking-wider block">CIVIC TECH INNOVATION</span>
              <h5 className="font-display font-bold text-sm text-white">NagrikSetu Architecture</h5>
              <p className="font-sans text-xs text-slate-400 leading-relaxed">
                Pioneered accessible public grievance resolution and RTI application pipelines with cryptographic SHA-256 audit integrity for citizen transparency.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-carbon-950/50 border border-white/10 space-y-2">
              <span className="font-mono text-xs text-accent-cyan uppercase tracking-wider block">RELATIONAL DATA FABRIC</span>
              <h5 className="font-display font-bold text-sm text-white">VidyaSanchar ERP Engine</h5>
              <p className="font-sans text-xs text-slate-400 leading-relaxed">
                Architected PostgreSQL relational schemas and automated attendance & grading computation engines handling 50,000+ student profiles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
