import { useEffect, useRef } from 'react';

const glyphs = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789/+#';

/** Keep the accessible name stable while the visible label resolves left to right. */
export function DecodeLabel({ text, reduced }: { text: string; reduced: boolean }) {
  const label = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = label.current;
    const control = el?.closest('a,button');
    if (!el || !control || reduced) return;
    let frame = 0;
    function play() {
      cancelAnimationFrame(frame);
      const start = performance.now();
      let previous = -1;
      function draw(now: number) {
        const step = Math.floor((now - start) / 34);
        if (step !== previous) {
          const settled = Math.max(0, step - 2);
          el!.textContent = [...text].map((ch, i) =>
            i < settled || ch === ' ' ? ch : glyphs[(i * 13 + step * 7) % glyphs.length]
          ).join('');
          previous = step;
        }
        if (step < text.length + 2) frame = requestAnimationFrame(draw);
      }
      frame = requestAnimationFrame(draw);
    }
    control.addEventListener('pointerenter', play);
    control.addEventListener('focus', play);
    return () => {
      cancelAnimationFrame(frame);
      el.textContent = text;
      control.removeEventListener('pointerenter', play);
      control.removeEventListener('focus', play);
    };
  }, [text, reduced]);
  return <span><span className="sr-only">{text}</span><span ref={label} aria-hidden="true">{text}</span></span>;
}
