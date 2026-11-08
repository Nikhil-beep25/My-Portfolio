import React, { useState, useEffect } from 'react';
import { ParticlePortrait } from '../canvas/ParticlePortrait';
import { profile, projects, skills } from '../../data/profile';
import { Globe } from './Globe';

interface HeroSectionProps {
  accent: string;
  mode: 'Particles' | 'CRT' | 'Globe' | 'Orbit';
  customImageSrc: string | null;
  isReducedMotion: boolean;
  tier?: 'HIGH' | 'MED' | 'SAVER';
  onOpenResume?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  customImageSrc, mode, accent,
  isReducedMotion,
  tier = 'HIGH',
  onOpenResume,
}) => {
  const [localTime, setLocalTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLocalTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className={`studio-hero mode-${mode.toLowerCase()}`}>
      <div className="portrait-stage">
        {mode === 'Globe' || mode === 'Orbit' ? <Globe orbit={mode === 'Orbit'} reduced={isReducedMotion} /> : mode === 'CRT' ? <div className="crt-photo"><img src={customImageSrc || '/assets/nikhil-enhanced.jpg'} alt="Nikhil Bhadauriya" /></div> : <ParticlePortrait accent={accent} customImageSrc={customImageSrc} isReducedMotion={isReducedMotion} tier={tier} />}
      </div>
      <div className="glass-half" aria-hidden="true" />
      <div className="hero-copy">
        <h1><span className="heading-mask"><em>Immersive</em></span>{' '}<span className="heading-mask solid"><em>Interfaces</em></span></h1>
        <div className="hero-tag">[ WebGL · Three.js · Motion ]</div>
        <p>I build hand-coded sites where motion, shaders and typography do the talking — and the page still loads fast.</p>
        <div className="hero-resume-action">
          <button onClick={onOpenResume} className="resume-pill" aria-label="Open Curriculum Vitae">
            <small>Doc</small>
            <span>Resume / CV</span>
            <b>↗</b>
          </button>
          <a href={profile.resumePdf} download="Nikhil_Bhadauriya_Resume.pdf" className="resume-pdf-pill" title="Download Official PDF">
            <span>PDF</span>
            <b>↓</b>
          </a>
        </div>
      </div>
      <aside className="hero-stats" aria-label="Developer stats">
        <header><strong>Developer stats</strong><span>● Active</span></header>
        <div className="hero-metrics">
          {['Selected projects', 'Skills mapped'].map((label, i) => (
            <div key={label}><small>0{i + 1}</small><b>{i === 0 ? projects.length : skills.length}</b><span>{label.replace(' ', '_')}</span><i /></div>
          ))}
        </div>
        <dl>{[['Role', 'Full-stack developer'], ['Stack', 'Python / MERN'], ['Focus', 'SaaS / AI'], ['Resume', 'PDF Dossier ↗'], ['Availability', 'Open for work'], ['Based in', 'Noida, India']].map(([key, value]) =>
          <div key={key}>
            <dt>{key}</dt>
            {key === 'Resume' ? (
              <dd><button onClick={onOpenResume} style={{ background:'none', border:'none', color:'inherit', font:'inherit', cursor:'pointer', padding:0, textDecoration:'underline' }}>{value}</button></dd>
            ) : (
              <dd>{value}</dd>
            )}
          </div>)}</dl>
      </aside>
      <div className="hero-ticker">
        <div className="ticker-track">{[0,1].map(copy=><div className="ticker-group" key={copy} aria-hidden={copy===1}><span>Availability</span><b>Open</b><i>◆</i><span>Curriculum Vitae</span><b>Verified Dossier</b><i>◆</i><span>Rendering</span><b>WebGL / Three.js</b><i>◆</i><span>Core_ID</span><b>Full-stack developer</b><i>◆</i></div>)}</div>
      </div>
      <div className="hero-contact"><div>Wanna Say Hello?<a href={`mailto:${profile.email}`}>{profile.email}</a></div><div>Local Time<strong>Noida {localTime}</strong></div></div>
    </section>
  );
};
