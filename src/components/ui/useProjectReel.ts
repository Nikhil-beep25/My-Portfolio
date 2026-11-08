import { useCallback, useEffect, useRef, useState } from 'react';

export function useProjectReel(count: number, reduced: boolean) {
  const stage = useRef<HTMLDivElement>(null);
  const rows = useRef<(HTMLElement | null)[]>([]);
  const position = useRef(0);
  const destination = useRef(0);
  const [active, setActive] = useState(0);
  const navigate = useRef<(index: number) => void>(() => {});
  const select = useCallback((index: number) => navigate.current(index), []);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    let frame = 0, last = 0, rowHeight = 1, dragging = false;
    let startY = 0, startPosition = 0, lastY = 0, lastMove = 0, velocity = 0;
    let snapTimer: ReturnType<typeof setTimeout>;
    const wrap = (n: number) => ((n % count) + count) % count;
    function paint() {
      const center = position.current;
      rows.current.forEach((row, i) => {
        if (!row) return;
        const distance = wrap(i - center + count / 2) - count / 2;
        row.style.setProperty('--offset', (distance * rowHeight).toFixed(2) + 'px');
        row.style.setProperty('--bend', (reduced ? 0 : -distance * 6).toFixed(2) + 'deg');
        row.style.setProperty('--depth', (reduced ? 0 : -Math.abs(distance)*16).toFixed(2)+'px');
        row.style.opacity = String(Math.max(.12, 1 - Math.abs(distance)*.43));
        row.style.visibility = Math.abs(distance) > 1.95 ? 'hidden' : 'visible';
      });
      setActive(wrap(Math.round(center)));
    }
    function tick(time: number) {
      const dt = Math.min(40, time - last || 16);
      last = time;
      const gap = destination.current - position.current;
      if (reduced || Math.abs(gap) < .001) position.current = destination.current;
      else position.current += gap * (1 - Math.exp(-dt / (dragging ? 34 : 100)));
      paint();
      frame = position.current === destination.current ? 0 : requestAnimationFrame(tick);
    }
    function wake() { if (!frame) {last=performance.now();frame=requestAnimationFrame(tick)} }
    function settle() {
      clearTimeout(snapTimer);
      destination.current=Math.round(destination.current);
      wake();
    }
    navigate.current = (index) => {
      clearTimeout(snapTimer);
      const current=position.current;
      destination.current=current+wrap(index-current+count/2)-count/2;
      wake();
    };
    function wheel(e: WheelEvent) {
      if(e.ctrlKey || !e.deltaY)return;
      e.preventDefault();
      const units=e.deltaMode===1?16:e.deltaMode===2?rowHeight:1;
      destination.current+=Math.max(-1.6,Math.min(1.6,e.deltaY*units/rowHeight));
      wake();clearTimeout(snapTimer);snapTimer=setTimeout(settle,150);
    }
    function down(e: PointerEvent) {
      if(e.button!==0 || (e.target as HTMLElement).closest('button,a'))return;
      clearTimeout(snapTimer);dragging=true;
      startY=lastY=e.clientY;startPosition=position.current;lastMove=e.timeStamp;velocity=0;
      el!.setPointerCapture(e.pointerId);
    }
    function move(e: PointerEvent) {
      if(!dragging)return;
      const elapsed=Math.max(10,e.timeStamp-lastMove);
      velocity=.4*velocity+.6*(lastY-e.clientY)/elapsed;
      lastY=e.clientY;lastMove=e.timeStamp;
      destination.current=startPosition+(startY-e.clientY)/rowHeight;wake();
    }
    function up(e: PointerEvent) {
      if(!dragging)return;
      dragging=false;
      if(e.timeStamp-lastMove<100 && !reduced)destination.current+=Math.max(-2,Math.min(2,velocity*160/rowHeight));
      settle();
    }
    function key(e: KeyboardEvent) {
      if(!['ArrowDown','ArrowUp','PageDown','PageUp','Home','End'].includes(e.key))return;
      e.preventDefault();
      const index=Math.round(destination.current);
      select(e.key==='Home'?0:e.key==='End'?count-1:index+(['ArrowDown','PageDown'].includes(e.key)?1:-1));
    }
    function resize(){rowHeight=rows.current[0]?.offsetHeight||1;paint()}
    const observer=new ResizeObserver(resize);
    observer.observe(el);resize();
    el.addEventListener('wheel',wheel,{passive:false});
    el.addEventListener('pointerdown',down);el.addEventListener('pointermove',move);
    el.addEventListener('pointerup',up);el.addEventListener('pointercancel',up);el.addEventListener('keydown',key);
    return ()=>{
      clearTimeout(snapTimer);cancelAnimationFrame(frame);observer.disconnect();
      el.removeEventListener('wheel',wheel);el.removeEventListener('pointerdown',down);
      el.removeEventListener('pointermove',move);el.removeEventListener('pointerup',up);
      el.removeEventListener('pointercancel',up);el.removeEventListener('keydown',key);
    };
  },[count,reduced,select]);
  return {stage,rows,active,select};
}
