import { useEffect, useState } from 'react';
import { soundEngine } from '../../utils/audioSynthesizer';
export type Tier = 'HIGH'|'MED'|'SAVER';
export function BootScreen({onEnter, initialTier, initialAudio}:{onEnter:(tier:Tier,audio:boolean)=>void; initialTier:Tier; initialAudio:boolean}) {
  const [tier,setTier]=useState(initialTier), [audio,setAudio]=useState(initialAudio), [progress,setProgress]=useState(0);
  useEffect(()=>{
    let frame=0, mounted=true, loaded=false;
    const portrait=new Image(); portrait.src='/assets/nikhil-bust.png';
    Promise.allSettled([document.fonts.ready,portrait.decode()]).then(()=>{loaded=true});
    const start=performance.now();
    function tick(t:number) {
      if(!mounted)return;
      const value=Math.min(loaded?100:95,Math.floor((t-start)/21));
      setProgress(value); if(value<100)frame=requestAnimationFrame(tick);
    }
    frame=requestAnimationFrame(tick);return()=>{mounted=false;cancelAnimationFrame(frame)};
  },[]);
  return <section className="boot">
    <header><b>NIKHIL</b><small>BOOTING</small></header>
    <div className="boot-number" style={{'--level':(100-progress)+'%'} as React.CSSProperties}><b>{String(progress).padStart(2,'0')}</b><sup>%</sup></div>
    <footer><div className="boot-controls"><div><small>Performance tier</small>{(['HIGH','MED','SAVER'] as const).map(t=><button key={t} aria-pressed={tier===t} onClick={()=>setTier(t)}>{t}</button>)}</div>
    {progress===100 && <button className="enter" onClick={()=>{soundEngine.enabled=audio;if(audio)soundEngine.playBootSweep();onEnter(tier,audio)}}>Enter portfolio ↗</button>}
    <div><small>Audio</small>{[true,false].map(v=><button key={String(v)} aria-pressed={v===audio} onClick={()=>setAudio(v)}>{v?'On':'Off'}</button>)}</div></div>
    <div className="boot-status"><span>● NB / PORTFOLIO</span><span>{progress===100?'READY':'LOADING'}</span></div><progress value={progress} max="100" /></footer>
  </section>;
}
