import React, { useState, useEffect } from 'react';
import { Sparkles, X } from 'lucide-react';

interface NavbarProps {
  isReducedMotion: boolean;
  setIsReducedMotion: (val: boolean) => void;
  onOpenPhotoModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isReducedMotion,
  setIsReducedMotion,
  onOpenPhotoModal,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<'HOME' | 'PROJECTS' | 'SKILLS' | 'ABOUT' | 'CONTACT'>('HOME');

  const navItems: { id: 'HOME' | 'PROJECTS' | 'SKILLS' | 'ABOUT' | 'CONTACT'; label: string; href: string }[] = [
    { id: 'HOME', label: '[1] HOME', href: '#hero' },
    { id: 'PROJECTS', label: '[2] PROJECTS', href: '#gallery' },
    { id: 'SKILLS', label: '[3] SKILLS', href: '#skills' },
    { id: 'ABOUT', label: '[4] ABOUT', href: '#about' },
    { id: 'CONTACT', label: '[5] CONTACT', href: '#contact' },
  ];

  // Scroll spy to update current section pill dynamically
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      const sections: { id: 'HOME' | 'PROJECTS' | 'SKILLS' | 'ABOUT' | 'CONTACT'; el: HTMLElement | null }[] = [
        { id: 'CONTACT', el: document.getElementById('contact') },
        { id: 'ABOUT', el: document.getElementById('about') },
        { id: 'SKILLS', el: document.getElementById('skills') },
        { id: 'PROJECTS', el: document.getElementById('gallery') },
        { id: 'HOME', el: document.getElementById('hero') },
      ];

      for (const section of sections) {
        if (section.el && section.el.offsetTop <= scrollPos) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className="studio-nav">
        <a className="studio-brand" href="#hero">Axevia</a>
        <div className="studio-controls">
          <svg aria-hidden="true" viewBox="0 0 42 30" width="38" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M1 16c4 0 3-5 6-5s3 2 5 1 3 17 5 17 3-25 6-23 4 4 5-1 3-3 4 5 2 16 5 8 4-4 5-4" /></svg>
          <button aria-label="Open navigation menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            <small>[{navItems.findIndex(n => n.id === activeSection) + 1}]</small> {activeSection}<i aria-hidden="true"><em /></i>
          </button>
        </div>
      </header>

      {/* Full-Screen Modern Navigation Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-8 sm:p-16 animate-fade-in text-white">
          <div className="flex items-center justify-between border-b border-white/10 pb-6">
            <span className="font-mono text-xs text-accent-cyan tracking-widest uppercase">
              INDEX NAVIGATION // SYSTEM 2026
            </span>
            <button
              aria-label="Close navigation menu" onClick={() => setMenuOpen(false)}
              className="p-3 rounded-full bg-carbon-900 border border-white/20 text-white hover:border-accent-cyan transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="my-auto space-y-4 sm:space-y-6">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => {
                  setActiveSection(item.id);
                  setMenuOpen(false);
                }}
                className="group flex items-baseline gap-4 sm:gap-8 font-condensed font-extrabold text-4xl sm:text-7xl uppercase tracking-tight text-slate-400 hover:text-white transition-all duration-300"
              >
                <span className="font-mono text-xs sm:text-base text-accent-cyan opacity-60 group-hover:opacity-100">
                  {item.label.split(' ')[0]}
                </span>
                <span className="group-hover:translate-x-3 transition-transform duration-300">
                  {item.label.split(' ')[1]}
                </span>
              </a>
            ))}
          </nav>

          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-slate-400">
            <button
              onClick={onOpenPhotoModal}
              className="flex items-center gap-2 text-accent-cyan hover:underline cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>CUSTOM PHOTO MESH LOADER</span>
            </button>

            <button
              onClick={() => setIsReducedMotion(!isReducedMotion)}
              className="text-slate-400 hover:text-white cursor-pointer"
            >
              {isReducedMotion ? 'ENABLE FULL 3D MOTION' : 'ENABLE REDUCED MOTION'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
