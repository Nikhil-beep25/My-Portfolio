import { useEffect, useRef, useState } from 'react';
import { skills } from '../../data/profile';

export function Globe({ orbit, reduced }: { orbit: boolean; reduced: boolean }) {
  const host = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  const [selected, select] = useState<number | null>(null);
  useEffect(() => {
    const region = host.current;
    if (!region) return;
    const labels = Array.from(region.querySelectorAll<HTMLButtonElement>('button'));
    let frame = 0, angle = 0, previous = 0;
    function draw(time: number) {
      if (!paused.current && !reduced) angle += Math.min(time - previous, 40) * .00012;
      previous = time;
      labels.forEach((el, i) => {
        const y = 1 - (2*i+1)/labels.length;
        const latitude = orbit ? Math.round(y*2)/2*.85 : y;
        const radius = Math.sqrt(1-latitude*latitude);
        const phase = i*2.39996+angle;
        const z = Math.sin(phase)*radius;
        el.style.left = (50+Math.cos(phase)*radius*40)+'%';
        el.style.top = (50+latitude*39+z*(orbit ? 12 : 6))+'%';
        el.style.opacity = String(.4+(z+1)*.3);
        el.style.transform = 'translate(-50%,-50%) scale('+(.8+(z+1)*.15)+')';
        el.style.zIndex = String(Math.round((z+1)*10));
      });
      if (!reduced) frame=requestAnimationFrame(draw);
    }
    draw(0);
    return () => cancelAnimationFrame(frame);
  }, [orbit,reduced]);
  return <div className="skill-space" onPointerEnter={()=>paused.current=true} onPointerLeave={()=>paused.current=false} onFocus={()=>paused.current=true} onBlur={()=>paused.current=false}>
    <div ref={host} className={'skill-sphere '+(orbit?'orbit':'')} aria-label="Skills globe">{skills.map((s,i)=><button key={s.name} aria-pressed={selected===i} onClick={()=>select(selected===i?null:i)}>{s.name}</button>)}</div>
    {selected!==null && <p className="skill-caption">{skills[selected].description}</p>}
  </div>;
}
