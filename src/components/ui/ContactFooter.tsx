import React, { useState } from 'react';
import { Github, Linkedin, Check, Send } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

export const ContactFooter: React.FC = () => {
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => {
      setFormSent(false);
      setFormData({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <footer id="contact" className="relative bg-carbon-950 border-t border-white/[0.08] pt-24 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/[0.08]">
          {/* Left Column: Direct dialogue invitation */}
          <div className="lg:col-span-6 space-y-6">
            <span className="font-mono text-xs text-accent-cyan tracking-widest uppercase">
              // ARCHITECTURAL DIALOGUE
            </span>
            <h2 className="font-display font-extrabold text-4xl sm:text-6xl text-white tracking-tight uppercase leading-tight">
              LET’S BUILD <br />
              <span className="text-stroke hover:text-white transition-all duration-300">
                THE NEXT SYSTEM.
              </span>
            </h2>
            <p className="font-sans text-sm text-slate-400 max-w-md font-light leading-relaxed">
              Available for high-stakes software architecture, distributed system engineering, and bespoke 3D/WebGL experiences.
            </p>

            <div className="pt-4 flex flex-col space-y-3 font-mono text-xs text-slate-300">
              <div className="flex items-center gap-3">
                <span className="text-slate-500 uppercase tracking-widest">ELECTRONIC MAIL:</span>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="text-white hover:text-accent-cyan transition-colors underline underline-offset-4 decoration-accent-cyan/40"
                >
                  {PERSONAL_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-slate-500 uppercase tracking-widest">COORDINATES:</span>
                <span className="text-slate-300">{PERSONAL_INFO.coordinates}</span>
              </div>
            </div>

            {/* Social links */}
            <div className="pt-2 flex items-center gap-4">
              <a
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-lg bg-carbon-900 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:border-accent-cyan transition-colors"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-lg bg-carbon-900 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:border-accent-cyan transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Contact Transmission Form */}
          <div className="lg:col-span-6">
            <div className="p-8 rounded-2xl bg-carbon-900/60 border border-white/10 backdrop-blur-sm">
              <h3 className="font-display font-bold text-xl text-white mb-2">Transmit a Message</h3>
              <p className="font-sans text-xs text-slate-400 mb-6 font-light">
                Direct channel to Nikhil Bhadauriya. Inquiries reviewed promptly.
              </p>

              {formSent ? (
                <div className="p-6 rounded-xl bg-accent-cyan/10 border border-accent-cyan/30 text-center space-y-2">
                  <Check className="w-8 h-8 text-accent-cyan mx-auto" />
                  <p className="font-display font-bold text-sm text-white">Transmission Recorded</p>
                  <p className="font-sans text-xs text-slate-300">
                    Thank you for reaching out. I will respond to your transmission shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block font-mono text-[10px] text-slate-400 uppercase tracking-widest mb-1.5">
                      Your Name / Entity
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Elena Rostova"
                      className="w-full px-4 py-3 rounded-xl bg-carbon-950/80 border border-white/10 text-white font-sans text-sm focus:border-accent-cyan focus:outline-none focus:ring-1 focus:ring-accent-cyan transition-colors placeholder:text-slate-600"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] text-slate-400 uppercase tracking-widest mb-1.5">
                      Contact Email
                    </label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="elena@enterprise.com"
                      className="w-full px-4 py-3 rounded-xl bg-carbon-950/80 border border-white/10 text-white font-sans text-sm focus:border-accent-cyan focus:outline-none focus:ring-1 focus:ring-accent-cyan transition-colors placeholder:text-slate-600"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] text-slate-400 uppercase tracking-widest mb-1.5">
                      Message / Project Details
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Outline your project scope, technical requirements, or inquiry..."
                      className="w-full px-4 py-3 rounded-xl bg-carbon-950/80 border border-white/10 text-white font-sans text-sm focus:border-accent-cyan focus:outline-none focus:ring-1 focus:ring-accent-cyan transition-colors placeholder:text-slate-600 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-white text-carbon-950 font-display font-bold text-xs tracking-widest uppercase hover:bg-accent-cyan transition-colors flex items-center justify-center gap-2 mt-2 cursor-pointer shadow-glow"
                  >
                    <span>Transmit Inquiry</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-slate-500 uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} NIKHIL BHADAURIYA</span>
            <span>•</span>
            <span>ALL RIGHTS RESERVED</span>
          </div>

          <div className="flex items-center gap-4">
            <span>INSPIRED BY AXEVIA</span>
            <span>•</span>
            <span className="text-accent-cyan">POWERED BY THREE.JS & REACT</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

