import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC<{ isReducedMotion: boolean }> = ({ isReducedMotion }) => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });

      // Check if hovering interactive target
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.closest('a') ||
          target.closest('button') ||
          target.getAttribute('role') === 'button')
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  if (isTouch || isReducedMotion) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Outer subtle follower ring */}
      <div
        className={`fixed top-0 left-0 rounded-full border border-accent-cyan/50 -translate-x-1/2 -translate-y-1/2 transition-transform duration-150 ease-out ${
          hovered ? 'w-14 h-14 bg-accent-cyan/10 border-accent-cyan scale-110' : 'w-8 h-8 scale-100'
        }`}
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`,
        }}
      />
      {/* Inner pinpoint dot */}
      <div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-accent-cyan -translate-x-1/2 -translate-y-1/2"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`,
        }}
      />
    </div>
  );
};

