import React from 'react';
import { X, Download, Printer, ExternalLink, GraduationCap, Briefcase, Award, Code, Terminal, CheckCircle2 } from 'lucide-react';
import { PERSONAL_INFO, EXPERIENCES, PROJECTS, EDUCATION_LIST, CERTIFICATIONS_LIST, SKILL_CATEGORIES } from '../../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-2xl overflow-y-auto animate-fade-in select-text">
      {/* Container matching Axevia technical dark aesthetic */}
      <div className="relative w-full max-w-4xl rounded-2xl bg-carbon-950 border border-white/15 p-6 sm:p-12 shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_40px_rgba(34,211,238,0.12)] my-auto max-h-[92vh] overflow-y-auto font-sans text-slate-200">
        
        {/* Sticky Action Controls Header */}
        <div className="sticky -top-6 -mt-6 sm:-top-12 sm:-mt-12 pt-6 sm:pt-12 pb-4 mb-6 bg-carbon-950/95 backdrop-blur-md border-b border-white/10 flex flex-wrap items-center justify-between gap-4 z-30">
          <div className="flex items-center gap-2 font-mono text-xs text-accent-cyan tracking-widest uppercase">
            <Terminal className="w-3.5 h-3.5" />
            <span>CURRICULUM VITAE // VERIFIED PROFILE</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Download PDF Button */}
            <a
              href={PERSONAL_INFO.resumePdfUrl}
              download="Nikhil_Bhadauriya_Resume.pdf"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-accent-cyan/40 bg-accent-cyan/10 text-accent-cyan font-mono text-[11px] tracking-wider uppercase hover:bg-accent-cyan/20 hover:border-accent-cyan transition-all cursor-pointer"
              title="Download Original PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span>DOWNLOAD PDF</span>
            </a>

            {/* Print / Save */}
            <button
              onClick={handlePrint}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/20 bg-carbon-900 text-slate-300 font-mono text-[11px] tracking-wider uppercase hover:text-white hover:border-white transition-all cursor-pointer"
              title="Print Resume"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>PRINT</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-full border border-white/20 bg-carbon-900 text-slate-400 hover:text-white hover:border-white transition-all cursor-pointer"
              title="Close (Esc)"
              aria-label="Close resume modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ================= RESUME DOSSIER BODY ================= */}
        <div className="space-y-10">
          
          {/* Header Block */}
          <div className="space-y-3 pb-8 border-b border-white/10">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <h1 className="font-condensed font-extrabold text-4xl sm:text-6xl text-white tracking-tight uppercase leading-none">
                {PERSONAL_INFO.name}
              </h1>
              <span className="font-mono text-xs sm:text-sm text-accent-cyan uppercase tracking-widest font-semibold">
                {PERSONAL_INFO.title}
              </span>
            </div>

            {/* Contact & Meta Row */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 font-mono text-xs text-slate-400 pt-1">
              <span>{PERSONAL_INFO.location}</span>
              <span className="text-white/20">•</span>
              <span className="text-slate-300">{PERSONAL_INFO.phone}</span>
              <span className="text-white/20">•</span>
              <a href={`mailto:${PERSONAL_INFO.email}`} className="text-white hover:text-accent-cyan underline underline-offset-2">
                {PERSONAL_INFO.email}
              </a>
            </div>

            {/* Links Row */}
            <div className="flex flex-wrap items-center gap-4 font-mono text-xs pt-1">
              <a
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-accent-cyan hover:underline"
              >
                <span>github.com/Nikhil-beep25</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <span className="text-white/20">•</span>
              <a
                href={PERSONAL_INFO.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-accent-cyan hover:underline"
              >
                <span>linkedin.com/in/nikhil-bhadauriya</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs text-accent-cyan uppercase tracking-widest font-bold">
              <span>01 // PROFESSIONAL SUMMARY</span>
            </div>
            <p className="font-sans text-sm sm:text-base text-slate-300 leading-relaxed font-light">
              {PERSONAL_INFO.bio}
            </p>
          </div>

          {/* Education */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <div className="flex items-center gap-2 font-mono text-xs text-accent-cyan uppercase tracking-widest font-bold">
              <GraduationCap className="w-4 h-4" />
              <span>02 // EDUCATION</span>
            </div>

            {EDUCATION_LIST.map((edu) => (
              <div key={edu.institution} className="p-5 rounded-xl bg-carbon-900/60 border border-white/10 space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="font-display font-bold text-base sm:text-lg text-white">
                    {edu.institution}
                  </h3>
                  <span className="font-mono text-xs text-accent-cyan font-bold">
                    {edu.period}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs font-mono text-slate-400">
                  <span className="text-slate-200">{edu.degree}</span>
                  <span>{edu.location}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Technical Skills */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <div className="flex items-center gap-2 font-mono text-xs text-accent-cyan uppercase tracking-widest font-bold">
              <Code className="w-4 h-4" />
              <span>03 // TECHNICAL SKILLS</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SKILL_CATEGORIES.map((cat) => (
                <div key={cat.category} className="p-4 rounded-xl bg-carbon-900/60 border border-white/10 space-y-2">
                  <span className="font-mono text-[11px] text-accent-cyan uppercase tracking-wider block font-semibold">
                    {cat.category}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.items.map((item) => (
                      <span
                        key={item}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-carbon-800 text-slate-200 border border-white/10"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Work Experience */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <div className="flex items-center gap-2 font-mono text-xs text-accent-cyan uppercase tracking-widest font-bold">
              <Briefcase className="w-4 h-4" />
              <span>04 // PROFESSIONAL EXPERIENCE</span>
            </div>

            <div className="space-y-4">
              {EXPERIENCES.map((exp) => (
                <div key={exp.company} className="p-6 rounded-xl bg-carbon-900/60 border border-white/10 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div>
                      <h3 className="font-display font-bold text-lg sm:text-xl text-white">
                        {exp.company}
                      </h3>
                      <p className="font-mono text-xs text-accent-cyan mt-0.5 font-medium">
                        {exp.role}
                      </p>
                    </div>
                    <div className="text-right font-mono text-xs text-slate-400">
                      <div>{exp.period}</div>
                      <div className="text-[10px] text-slate-500 uppercase">{exp.location}</div>
                    </div>
                  </div>

                  <ul className="space-y-2 pt-1 font-sans text-xs sm:text-sm text-slate-300 font-light">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5 leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent-cyan shrink-0 mt-1" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Projects from Resume */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <div className="flex items-center gap-2 font-mono text-xs text-accent-cyan uppercase tracking-widest font-bold">
              <Terminal className="w-4 h-4" />
              <span>05 // PRODUCTION PROJECTS</span>
            </div>

            <div className="space-y-4">
              {PROJECTS.slice(0, 3).map((proj) => (
                <div key={proj.id} className="p-5 rounded-xl bg-carbon-900/60 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <h3 className="font-display font-bold text-base sm:text-lg text-white">
                      {proj.title}
                    </h3>
                    <a
                      href={proj.github || PERSONAL_INFO.socials.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 text-accent-cyan hover:underline"
                    >
                      <span>GitHub</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                    {proj.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proj.technologies.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded text-[10px] font-mono bg-carbon-800 text-slate-300 border border-white/10">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <div className="flex items-center gap-2 font-mono text-xs text-accent-cyan uppercase tracking-widest font-bold">
              <Award className="w-4 h-4" />
              <span>06 // CERTIFICATIONS</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {CERTIFICATIONS_LIST.map((cert) => (
                <div key={cert.title} className="p-4 rounded-xl bg-carbon-900/60 border border-white/10 space-y-1">
                  <span className="font-mono text-[10px] text-accent-cyan uppercase tracking-wider block">
                    {cert.issuer}
                  </span>
                  <h4 className="font-display font-bold text-xs sm:text-sm text-white">
                    {cert.title}
                  </h4>
                  <p className="font-sans text-[11px] text-slate-400 leading-relaxed pt-1">
                    {cert.topics}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer with quick actions */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-slate-400">
          <span>DOCUMENT VERIFIED // CANDIDACY 2026</span>
          <div className="flex items-center gap-3">
            <a
              href={PERSONAL_INFO.resumePdfUrl}
              download="Nikhil_Bhadauriya_Resume.pdf"
              className="flex items-center gap-1.5 text-accent-cyan hover:underline font-bold"
            >
              <Download className="w-3.5 h-3.5" />
              <span>SAVE ORIGINAL PDF</span>
            </a>
            <span className="text-white/20">•</span>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white cursor-pointer"
            >
              CLOSE
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

