'use client';
import { useEffect, useRef } from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';

/**
 * Custom marigold/diya cursor on desktop only.
 * Follows mouse with a smooth offset.
 */
export default function CustomCursor() {
  const cursorRef = useRef(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) return;
    document.body.classList.add('custom-cursor');

    let raf;
    let tx = 0, ty = 0;
    let cx = 0, cy = 0;

    const onMove = (e) => { tx = e.clientX; ty = e.clientY; };
    document.addEventListener('mousemove', onMove);

    const animate = () => {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cx - 14}px, ${cy - 14}px)`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      document.body.classList.remove('custom-cursor');
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <div ref={cursorRef} className="marigold-cursor" aria-hidden="true">
      {/* Marigold flower SVG cursor */}
      <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Petals */}
        {[0,45,90,135,180,225,270,315].map((deg, i) => (
          <ellipse
            key={i}
            cx="14" cy="14" rx="3" ry="6"
            fill="#F28C28"
            opacity="0.9"
            transform={`rotate(${deg} 14 14)`}
          />
        ))}
        {/* Center */}
        <circle cx="14" cy="14" r="4" fill="#C9A24B" />
        <circle cx="14" cy="14" r="2" fill="#F28C28" />
      </svg>
    </div>
  );
}
