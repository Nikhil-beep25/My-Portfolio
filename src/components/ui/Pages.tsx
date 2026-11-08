import { useEffect, useRef, useState } from 'react';
import { useProjectReel } from './useProjectReel';
import { profile, projects, journey, socials, resumeEducation, resumeSkills, resumeExperience, resumeCertifications } from '../../data/profile';

const principles = [
  ['Build by hand','Start with a small working interface. Extract a component once a second screen needs it.'],
  ['Measure the work','Trace the slow request from the browser to the database before changing the query.'],
  ['Give motion a job','Use movement to show which project is in focus and where the next one begins.'],
  ['Design for a phone','Check controls, reading order, and load time on the screen a visitor actually uses.'],
  ['Leave a clear trail','Give functions plain names and keep the reason for each technical decision close to the code.']
];

export function About({ onOpenResume }: { onOpenResume?: () => void }) {
  return (
    <article className="inner about-page">
      <div className="intro-grid">
        <div>
          <small className="eyebrow">01　Introduction</small>
          <p className="kicker">Full-stack developer, based in Noida</p>
          <h2>I build the<br/>front of things</h2>
          <p className="prose">
            I’m Nikhil Bhadauriya. I build civic tools, SaaS products, and web applications with Python and the MERN stack. My work ranges from the citizen workflows in NagrikSetu to the database behind VidyaSanchar.
          </p>
          <div className="hero-resume-action" style={{ margin: '24px 0 0 0' }}>
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
        <figure>
          <img src="/assets/nikhil-enhanced.jpg" alt="Nikhil Bhadauriya" />
        </figure>
      </div>

      <dl className="fact-strip">
        {[
          ['Based', 'Noida · GMT+5:30'],
          ['Phone', profile.phone],
          ['Education', 'BCA · 2024–2027'],
          ['Focus', profile.currentFocus]
        ].map(([a,b]) => (
          <div key={a}>
            <dt>{a}</dt>
            <dd>{b}</dd>
          </div>
        ))}
      </dl>

      <small className="eyebrow">02　How I work</small>
      <div className="principles">
        {principles.map(([a,b], i) => (
          <article key={a}>
            <small>0{i+1}</small>
            <h3>{a}</h3>
            <p>{b}</p>
          </article>
        ))}
      </div>

      {/* 03 Curriculum Vitae / Resume Dossier */}
      <small className="eyebrow" style={{ marginTop: '8svh' }}>03　Curriculum Vitae</small>
      <div className="resume-dossier">
        <div className="resume-dossier-header">
          <div>
            <small className="eyebrow" style={{ border: 'none', padding: 0 }}>Verified Candidate Profile</small>
            <h3>Nikhil Bhadauriya</h3>
            <p className="kicker" style={{ margin: '6px 0 0', fontSize: '13px' }}>
              Full Stack Developer • Noida, Uttar Pradesh, India • {profile.phone}
            </p>
          </div>
          <div className="actions">
            <button onClick={onOpenResume} className="resume-btn" aria-label="Open full interactive resume">
              <span>Interactive Dossier</span>
              <b>↗</b>
            </button>
            <a href={profile.resumePdf} download="Nikhil_Bhadauriya_Resume.pdf" className="resume-btn" title="Download Official PDF">
              <span>Download PDF</span>
              <b>↓</b>
            </a>
          </div>
        </div>

        <div className="resume-grid">
          <div className="resume-summary-box">
            <p>{profile.bioShort}</p>
          </div>

          {/* Education Block */}
          <div className="resume-block">
            <h4>Education</h4>
            {resumeEducation.map(edu => (
              <div key={edu.institution} className="resume-card">
                <header>
                  <h5>{edu.institution}</h5>
                  <small>{edu.period}</small>
                </header>
                <div className="org">{edu.degree}</div>
                <div className="tags" style={{ margin: '6px 0 0' }}>
                  <span>{edu.location}</span>
                  <span>BCA CompSci</span>
                </div>
              </div>
            ))}
          </div>

          {/* Technical Skills Block */}
          <div className="resume-block">
            <h4>Technical Skills</h4>
            <div className="resume-card">
              {resumeSkills.map(cat => (
                <div key={cat.category} className="resume-skill-group">
                  <span>{cat.category}</span>
                  <div className="tags" style={{ margin: 0 }}>
                    {cat.items.map(item => <span key={item}>{item}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Professional Experience Block */}
          <div className="resume-block" style={{ gridColumn: '1 / -1' }}>
            <h4>Professional Experience</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
              {resumeExperience.map(exp => (
                <div key={exp.company} className="resume-card">
                  <header>
                    <h5>{exp.company}</h5>
                    <small>{exp.period}</small>
                  </header>
                  <div className="org">{exp.role} · {exp.location}</div>
                  <ul>
                    {exp.highlights.map((h, i) => <li key={i}>{h}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Block */}
          <div className="resume-block" style={{ gridColumn: '1 / -1' }}>
            <h4>Certifications & Verified Credentials</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
              {resumeCertifications.map(cert => (
                <div key={cert.title} className="resume-card">
                  <header>
                    <h5>{cert.title}</h5>
                    <small>{cert.issuer}</small>
                  </header>
                  <p style={{ margin: '6px 0 0', fontSize: '12px', color: '#999' }}>{cert.topics}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <a className="text-link" href="#journey">Explore my journey ↗</a>
    </article>
  );
}

export function Journey() {
  return <article className="inner journey-page"><small className="eyebrow">01　Education & experience</small><h2>My journey</h2><div className="timeline">{journey.map((j,i)=><section key={j.title}><div><small>0{i+1}　 /　{j.date}</small><h3>{j.title}</h3><b>{j.issuer}</b></div><div><p>{j.description}</p><div className="tags">{j.skillsGained.map(s=><span key={s}>{s}</span>)}</div></div></section>)}</div><a className="text-link" href={socials[3].url}>Developer tutorials on ItsNikhilTech ↗</a></article>;
}

export function Projects({reduced}:{reduced:boolean}) {
  const [detail,setDetail]=useState<number|null>(null);
  const dialog=useRef<HTMLDialogElement>(null);
  const {stage,rows,active,select}=useProjectReel(projects.length,reduced);
  useEffect(()=>{if(detail!==null)dialog.current?.showModal()},[detail]);
  const current=detail===null?null:projects[detail];
  return <article className="project-page"><nav className="project-index" aria-label="Project index"><small>Index</small>{projects.map((p,i)=><button key={p.id} aria-label={'Scroll to '+p.title} aria-current={active===i} onClick={()=>select(i)}>0{i+1}</button>)}</nav>
    <div className="reel-stage" ref={stage} role="region" aria-label="Swipe through projects or use the arrow keys" tabIndex={0}><div className="project-roll">{projects.map((p,i)=><article className="work-row" ref={el=>{rows.current[i]=el}} key={p.id}>
      {p.id==='mysignsetu'?<div className="sign-mark" aria-hidden="true">M<span>⌁</span></div>:<img src={'/projects/'+p.id+'.jpg'} alt={p.title+' interface'} />}
      <div><small>0{i+1}　 {p.categories.join(' · ')}</small><h3>{p.title}</h3><p>{p.desc}</p><div className="work-meta"><div className="tags">{p.tech.slice(0,2).map(t=><span key={t}>{t}</span>)}</div><button tabIndex={active===i?0:-1} onClick={()=>setDetail(i)}>View case ↗</button></div></div></article>)}</div></div>
    <aside className="project-counter"><strong>0{active+1}</strong> /0{projects.length}<hr/>{projects[active].title}</aside>
    <dialog ref={dialog} className="case-dialog" onClose={()=>setDetail(null)}>{current&&<><button onClick={()=>dialog.current?.close()} aria-label="Close case study">Close ×</button><small>Project case study</small><h2>{current.title}</h2><p>{current.longDesc}</p><ul>{current.features.map(f=><li key={f}>{f}</li>)}</ul><div className="tags">{current.tech.map(t=><span key={t}>{t}</span>)}</div>{current.demo&&<a href={current.demo} target="_blank" rel="noreferrer">Open project ↗</a>}{current.github&&<a href={current.github} target="_blank" rel="noreferrer">GitHub ↗</a>}</>}</dialog>
  </article>;
}

export function Contact() {
  const [draft,setDraft]=useState(false);
  return <article className="inner contact-page"><small className="eyebrow">[ Transmission_form ]</small><h2>Send a message</h2><p className="contact-lead">Tell me about your project — what you want to build, your timeline, and anything else I should know.</p>
    <form onChange={()=>setDraft(false)} onSubmit={e=>{
      e.preventDefault();const data=new FormData(e.currentTarget);
      const subject=encodeURIComponent(String(data.get('type')||'Project')+' inquiry from '+data.get('name'));
      const body=encodeURIComponent(data.get('message')+'\n\nBudget: '+(data.get('budget')||'Undecided')+'\nFrom: '+data.get('name')+' <'+data.get('email')+'>');
      setDraft(true);window.location.href='mailto:'+profile.email+'?subject='+subject+'&body='+body;
    }}>
      <div className="contact-pair"><label>01　Your name<input required name="name" autoComplete="name" placeholder="Jane Doe" /></label><label>02　Email address<input required type="email" name="email" autoComplete="email" placeholder="jane@company.com" /></label></div>
      {[['type','03　Project type',['Website','Web app','E-commerce','3D / WebGL','Other']],['budget','04　Budget',['Under ₹50k','₹50k–₹2L','₹2L+','Let’s discuss']]].map(([name,title,options])=><fieldset key={String(name)}><legend>{title}</legend>{(options as string[]).map((v,i)=><label className="choice" key={v}><input type="radio" name={String(name)} value={v}/><span><small>0x0{i} </small>{v}</span></label>)}</fieldset>)}
      <label>05　Your message<textarea required name="message" rows={4} placeholder="What are you working on?" /></label>
      <button className="send">Open email draft ↗</button><p className="draft-note" role="status">{draft?'Continue in your email app. You can also write directly to '+profile.email+'.':'Opens your email app with the details filled in.'}</p>
    </form></article>;
}
