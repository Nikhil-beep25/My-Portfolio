import { DecodeLabel } from './components/ui/DecodeLabel';
import { useState, useEffect, useRef } from 'react';
import { Sun, Github, Linkedin, Instagram, Youtube } from 'lucide-react';
import { BootScreen, Tier } from './components/ui/BootScreen';
import { HeroSection } from './components/ui/HeroSection';
import { About, Projects, Contact, Journey } from './components/ui/Pages';
import { PhotoUploaderModal } from './components/ui/PhotoUploaderModal';
import { ResumeModal } from './components/ui/ResumeModal';
import { profile, socials } from './data/profile';
import { soundEngine } from './utils/audioSynthesizer';
import './studio.css';

const pages=['Home','About','Projects','Journey','Contact'] as const;
const modes=['Particles','CRT','Globe','Orbit'] as const;
const colors=['#eeeeee','#00dae3','#36ee8e','#ffe238','#ff3e65','#a18dff'];
const colorNames=['Silver','Cyan','Green','Yellow','Red','Violet'];
const icons=[Github,Linkedin,Instagram,Youtube];
function route(){
  const hash=location.hash.slice(1).toLowerCase();
  return pages.find(p=>p.toLowerCase()===hash) || (hash==='gallery'?'Projects':'Home');
}
export function App(){
  const [page,setPage]=useState(route),[ready,enter]=useState(()=>new URLSearchParams(location.search).has('skipBoot')),[menu,setMenu]=useState(false),[settings,setSettings]=useState(false);
  const [mode,setMode]=useState<typeof modes[number]>(location.hash==='#skills'?'Globe':'Particles');
  const [tier,setTier]=useState<Tier>('HIGH'),[audio,setAudio]=useState(true),[track,setTrack]=useState('Default'),[color,setColor]=useState(0);
  const [reduced,setReduced]=useState(()=>matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [upload,setUpload]=useState(false),[photo,setPhoto]=useState<string|null>(null),[now,setNow]=useState(new Date());
  const [resumeOpen,setResumeOpen]=useState(false);
  const musicPlayer=useRef<HTMLAudioElement>(null);
  const wavePath=useRef<SVGPathElement>(null);
  const shell=useRef<HTMLDivElement>(null),config=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const change=()=>{setPage(route());if(location.hash==='#skills')setMode('Globe');setMenu(false);setSettings(false);window.scrollTo({top:0,behavior:'instant'})};
    window.addEventListener('hashchange',change);
    const timer=setInterval(()=>setNow(new Date()),30000);
    return()=>{window.removeEventListener('hashchange',change);clearInterval(timer)};
  },[]);
  useEffect(()=>{
    if(!menu&&!settings)return;
    function close(e:PointerEvent){if(!shell.current?.contains(e.target as Node))setMenu(false);if(!config.current?.contains(e.target as Node))setSettings(false)}
    function key(e:KeyboardEvent){if(e.key==='Escape'){(menu?shell:config).current?.querySelector('button')?.focus();setMenu(false);setSettings(false)}}
    document.addEventListener('pointerdown',close);document.addEventListener('keydown',key);
    return()=>{document.removeEventListener('pointerdown',close);document.removeEventListener('keydown',key)};
  },[menu,settings]);
  useEffect(()=>{
    soundEngine.enabled=audio;
    const player=musicPlayer.current;
    if (!ready || !player) return;
    player.volume=.38;
    function sync(){
      if(audio && !document.hidden) void player!.play().catch(()=>setAudio(false));
      else player!.pause();
    }
    sync();
    document.addEventListener('visibilitychange',sync);
    return ()=>{document.removeEventListener('visibilitychange',sync);player.pause()};
  },[ready,audio,track]);
  useEffect(()=>{
    if(!ready || !audio || reduced) return;
    let frame=0;
    function draw(){
      const phase=(musicPlayer.current?.currentTime || 0)*(track==='Default'?7.8:10.4);
      let path='';
      for(let x=0;x<=40;x+=2){
        const envelope=Math.sin(Math.PI*x/40)**2;
        const y=12+envelope*(Math.sin(x*.48+phase)*7+Math.sin(x*.79-phase*.6)*3);
        path+=(x?'L':'M')+x+' '+y.toFixed(2);
      }
      wavePath.current?.setAttribute('d',path);
      frame=requestAnimationFrame(draw);
    }
    draw();return()=>cancelAnimationFrame(frame);
  },[ready,audio,reduced,track]);
  useEffect(()=>{
    if (!ready || reduced || !matchMedia('(pointer:fine)').matches) return;
    const guides=document.querySelector<HTMLElement>('.pointer-guides');
    if(!guides)return;
    const move=(e:PointerEvent)=>{
      guides.style.setProperty('--x',e.clientX+'px');
      guides.style.setProperty('--y',e.clientY+'px');
      guides.hidden=false;
    };
    const hide=()=>{guides.hidden=true};
    window.addEventListener('pointermove',move);
    document.documentElement.addEventListener('pointerleave',hide);
    return()=>{hide();window.removeEventListener('pointermove',move);document.documentElement.removeEventListener('pointerleave',hide)};
  },[ready,reduced]);
  const goHome=(m:typeof modes[number])=>{setMode(m);location.hash='home';setMenu(false)};
  if(!ready)return <BootScreen initialTier={tier} initialAudio={audio} onEnter={(t,a)=>{setTier(t);setAudio(a);enter(true)}}/>;
  return <div className={'experience '+(page==='Home'?'home':'interior')+' design-'+mode.toLowerCase()+(reduced?' reduced':'')} style={{'--ink':colors[color]} as React.CSSProperties}>
    <audio ref={musicPlayer} src={'/audio/'+(track==='Default'?'default':'digital-minimalism')+'.mp3'} preload="auto" loop />
    <div className="pointer-guides" hidden aria-hidden="true" />
    <a className="wordmark" href="#home">Nikhil</a>
    {page!=='Home'&&<><header className="page-title"><small><a href="#home">Home</a>　/　{page}</small><h1>{page}</h1></header><aside className="corner-contact">Wanna Say Hello?<a href={'mailto:'+profile.email}>{profile.email}</a>Local Time<strong>Noida {now.toLocaleTimeString('en-GB',{timeZone:'Asia/Kolkata',hour:'2-digit',minute:'2-digit'})}</strong></aside></>}
    {menu&&<div className="menu-backdrop" onClick={()=>setMenu(false)} aria-hidden="true"/>}
    {settings&&<div className="menu-backdrop" onClick={()=>setSettings(false)} aria-hidden="true"/>}
    <div className="dock" ref={shell}><button className="wave" onClick={()=>setAudio(!audio)} aria-label={audio?'Mute audio':'Enable audio'} aria-pressed={audio}><svg width="38" height="25" viewBox="0 0 40 25" aria-hidden="true"><path ref={wavePath} d={audio?"M0 12h8l4-5 5 14 5-18 5 13 5-4h8":"M0 12h40"} fill="none" stroke="currentColor" strokeWidth="1.5"/></svg></button>
      <div className="nav-box"><button className="nav-trigger" aria-expanded={menu} aria-label={menu?'Close navigation menu':'Open navigation menu'} onClick={()=>{setMenu(!menu);setSettings(false)}}><small>[{pages.indexOf(page)+1}]</small>{page}<i><em/></i></button>
      <div className={'menu-reveal'+(menu?' is-open':'')} aria-hidden={!menu} ref={node=>{if(node)node.inert=!menu}}><div className="menu-clip"><nav className="nav-panel" data-lenis-prevent><h2>Menu</h2><small>Navigation</small><div className="menu-links">{[...pages].reverse().filter(p=>p!=='Home').map(p=><a key={p} href={'#'+p.toLowerCase()} onClick={()=>setMenu(false)} aria-current={page===p?'page':undefined}><small>[{pages.indexOf(p)+1}]</small><DecodeLabel text={p} reduced={reduced}/><b>●</b></a>)}</div><small>Designs <b>04</b></small><div className="modes">{modes.map((m,i)=><button key={m} aria-pressed={m===mode&&page==='Home'} onClick={()=>goHome(m)}><small>0{i+1}</small> <DecodeLabel text={`Home ${m}`} reduced={reduced}/></button>)}</div><div style={{borderTop:'1px solid var(--rule)',marginTop:'14px',paddingTop:'12px'}}><button className="resume-btn" style={{width:'100%',justifyContent:'space-between'}} onClick={()=>{setMenu(false);setResumeOpen(true)}}><span>Curriculum Vitae</span><b>PDF ↗</b></button></div><div className="socials">{socials.map((s,i)=>{const Icon=icons[i];return <a key={s.label} aria-label={s.label} href={s.url} target="_blank" rel="noreferrer"><Icon size={17}/></a>})}</div></nav></div></div></div>
    </div>
    <main key={page}>{page==='Home'?<HeroSection key={mode} accent={colors[color]} mode={mode} tier={tier} isReducedMotion={reduced} customImageSrc={photo} onOpenResume={()=>setResumeOpen(true)}/>:page==='About'?<About onOpenResume={()=>setResumeOpen(true)}/>:page==='Projects'?<Projects reduced={reduced}/>:page==='Journey'?<Journey/>:<Contact/>}</main>
    <div ref={config} className="settings-host"><button className="settings-tab" aria-label="System settings" aria-expanded={settings} onClick={()=>{setSettings(!settings);setMenu(false)}}><Sun size={16}/></button>
    {settings&&<aside className="settings-panel"><header>System <small>Global config</small></header><small>[01] Core theme</small><div className="swatches">{colors.map((v,i)=><button key={v} aria-label={colorNames[i]} aria-pressed={color===i} style={{color:v}} onClick={()=>setColor(i)}>●</button>)}</div>
    <small>[02] Audio engine <button onClick={()=>setAudio(!audio)}>{audio?'On':'Off'}</button></small>{['Default','Digital Minimalism'].map((t,i)=><button key={t} className="track" aria-pressed={t===track&&audio} onClick={()=>{setTrack(t);setAudio(true)}}>{t}<small>{i?'Synthwave / Retro':'Ambient / Lo-fi'}</small></button>)}
    <small>[03] Performance tier</small><div className="tiers">{(['HIGH','MED','SAVER'] as const).map(t=><button key={t} aria-pressed={tier===t} onClick={()=>setTier(t)}>{t}</button>)}</div><div className="utilities"><button aria-pressed={reduced} onClick={()=>setReduced(!reduced)}>Reduced motion {reduced?'on':'off'}</button><button onClick={()=>{setSettings(false);setUpload(true)}}>Change portrait ↗</button></div></aside>}</div>
    <PhotoUploaderModal isOpen={upload} onClose={()=>setUpload(false)} onSelectPhoto={setPhoto} onResetDefault={()=>setPhoto(null)}/>
    <ResumeModal isOpen={resumeOpen} onClose={()=>setResumeOpen(false)}/>
  </div>;
}
export default App;
