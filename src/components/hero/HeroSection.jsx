'use client';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useIsMobile } from '@/hooks/useIsMobile';
import content from '@/content/content';
import OrnamentalDivider from '@/components/ui/OrnamentalDivider';

/**
 * Section 2: Hero — couple cutout inside arched jaali frame,
 * parallax layers, gold shimmer names, guest greeting.
 */
export default function HeroSection({ guestName }) {
  const { lang } = useLanguage();
  const c = content[lang].hero;
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const sectionRef = useRef(null);

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  const frameX = useTransform(springX, [-1, 1], ['-8px', '8px']);
  const frameY = useTransform(springY, [-1, 1], ['-6px', '6px']);
  const coupleX = useTransform(springX, [-1, 1], ['-14px', '14px']);
  const coupleY = useTransform(springY, [-1, 1], ['-10px', '10px']);
  const petalsX = useTransform(springX, [-1, 1], ['12px', '-12px']);

  const [cutoutExists, setCutoutExists] = useState(true);

  useEffect(() => {
    // Probe for cutout
    fetch('/images/couple/couple-cutout.png', { method: 'HEAD' })
      .then((r) => setCutoutExists(r.ok))
      .catch(() => setCutoutExists(false));
  }, []);

  const handleMouseMove = (e) => {
    if (reduced || isMobile) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    mouseX.set(x);
    mouseY.set(y);
  };

  // Gyroscope on mobile
  useEffect(() => {
    if (!isMobile || reduced) return;
    const handler = (e) => {
      mouseX.set(Math.max(-1, Math.min(1, e.gamma / 15)));
      mouseY.set(Math.max(-1, Math.min(1, e.beta / 20)));
    };
    window.addEventListener('deviceorientation', handler);
    return () => window.removeEventListener('deviceorientation', handler);
  }, [isMobile, reduced, mouseX, mouseY]);

  const greeting = guestName
    ? c.guestGreeting(decodeURIComponent(guestName))
    : c.defaultGreeting;

  return (
    <section
      id="hero"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative dvh-screen flex flex-col items-center justify-center overflow-hidden bg-maroon-dark"
      style={{ background: 'linear-gradient(180deg, #2a0608 0%, #3d0a12 40%, #5A0F1B 100%)' }}
    >
      {/* Subtle radial glow behind couple */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 70% at 50% 55%, rgba(201,162,75,0.12) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Floating petal layer (parallax) */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ x: petalsX }}
        aria-hidden="true"
      >
        <FloatingPetals />
      </motion.div>

      {/* Main composition */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        {/* Guest greeting */}
        {guestName && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-gold/80 text-sm md:text-base tracking-widest mb-4 uppercase"
            style={{ fontFamily: lang === 'hi' ? 'var(--font-hind)' : 'var(--font-lora)' }}
          >
            {greeting}
          </motion.p>
        )}

        {/* Save the Date label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xs md:text-sm tracking-[0.35em] uppercase text-gold/60 mb-3"
          style={{ fontFamily: 'var(--font-cormorant)' }}
        >
          {c.saveTheDate}
        </motion.p>

        {/* Arched jaali frame + couple photo */}
        <motion.div
          style={{ x: frameX, y: frameY }}
          className="relative mx-auto mb-6"
        >
          {/* Jaali frame SVG (arched window) */}
          <JaaliArchFrame />

          {/* Couple image inside arch */}
          <motion.div
            style={{ x: coupleX, y: coupleY }}
            className="absolute inset-0 flex items-end justify-center"
          >
            <div className="relative w-[220px] h-[290px] md:w-[280px] md:h-[370px]">
              <Image
                src={cutoutExists ? '/images/couple/couple-cutout.png' : '/images/couple/couple-hero.jpg'}
                alt="Parul and Shubham"
                fill
                className={`object-contain object-bottom ${!cutoutExists ? 'rounded-t-full' : ''}`}
                priority
                sizes="(max-width:768px) 220px, 280px"
              />
            </div>
          </motion.div>

          {/* Gold glow ring */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              boxShadow: 'inset 0 0 60px rgba(201,162,75,0.15), 0 0 80px rgba(201,162,75,0.2)',
            }}
            aria-hidden="true"
          />
        </motion.div>

        {/* Names — large script */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 1 }}
          className="shimmer-text mb-2"
          style={{
            fontFamily: lang === 'hi' ? 'var(--font-kalam)' : 'var(--font-great-vibes)',
            fontSize: 'clamp(2.4rem, 9vw, 5rem)',
            lineHeight: 1.1,
          }}
        >
          {lang === 'hi' ? 'पारुल एवं शुभम' : 'Parul & Shubham'}
        </motion.h2>

        <OrnamentalDivider variant="simple" />

        {/* Date */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-ivory/70 text-sm md:text-base tracking-widest"
          style={{ fontFamily: lang === 'hi' ? 'var(--font-hind)' : 'var(--font-lora)' }}
        >
          {c.date}
        </motion.p>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-10 flex flex-col items-center"
          aria-hidden="true"
        >
          <div className="w-px h-12 bg-gradient-to-b from-gold/0 to-gold/60 animate-pulse" />
          <svg width="12" height="8" viewBox="0 0 12 8" className="mt-1" fill="none">
            <path d="M1 1L6 6L11 1" stroke="#C9A24B" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </motion.div>
      </div>
    </section>
  );
}

/** Arched lattice/jaali frame drawn as SVG */
function JaaliArchFrame() {
  return (
    <div className="relative w-[260px] h-[340px] md:w-[340px] md:h-[440px]" aria-hidden="true">
      <svg viewBox="0 0 260 340" fill="none" className="absolute inset-0 w-full h-full">
        {/* Outer arch border */}
        <path
          d="M10,340 L10,130 Q10,10 130,10 Q250,10 250,130 L250,340 Z"
          stroke="#C9A24B"
          strokeWidth="2"
          fill="none"
          opacity="0.7"
        />
        {/* Inner arch */}
        <path
          d="M22,340 L22,134 Q22,26 130,26 Q238,26 238,134 L238,340 Z"
          stroke="#C9A24B"
          strokeWidth="0.8"
          fill="rgba(90,15,27,0.3)"
          opacity="0.5"
        />

        {/* Jaali lattice pattern in arch head */}
        {/* Horizontal lines */}
        {[60,80,100,115].map((y, i) => (
          <line key={`h${i}`} x1="25" y1={y} x2="235" y2={y}
            stroke="#C9A24B" strokeWidth="0.5" opacity="0.3"/>
        ))}
        {/* Diagonal lattice */}
        {[-5,15,35,55,75,95,115,135,155,175,195,215,235].map((x, i) => (
          <line key={`d1${i}`} x1={x} y1="30" x2={x+80} y2="120"
            stroke="#C9A24B" strokeWidth="0.4" opacity="0.2"/>
        ))}
        {[5,25,45,65,85,105,125,145,165,185,205,225,245].map((x, i) => (
          <line key={`d2${i}`} x1={x} y1="30" x2={x-80} y2="120"
            stroke="#C9A24B" strokeWidth="0.4" opacity="0.2"/>
        ))}

        {/* Corner ornaments */}
        <circle cx="10" cy="340" r="5" fill="none" stroke="#C9A24B" strokeWidth="1" opacity="0.6"/>
        <circle cx="250" cy="340" r="5" fill="none" stroke="#C9A24B" strokeWidth="1" opacity="0.6"/>

        {/* Arch crown ornament */}
        <g transform="translate(130, 10)">
          <circle cx="0" cy="0" r="8" fill="none" stroke="#C9A24B" strokeWidth="1" opacity="0.8"/>
          <circle cx="0" cy="0" r="4" fill="#C9A24B" opacity="0.5"/>
          <circle cx="0" cy="0" r="2" fill="#F28C28" opacity="0.8"/>
          {/* Rays */}
          {[0,45,90,135,180,225,270,315].map((deg) => (
            <line key={deg}
              x1={Math.cos(deg * Math.PI/180) * 9}
              y1={Math.sin(deg * Math.PI/180) * 9}
              x2={Math.cos(deg * Math.PI/180) * 14}
              y2={Math.sin(deg * Math.PI/180) * 14}
              stroke="#C9A24B" strokeWidth="0.8" opacity="0.6"
            />
          ))}
        </g>

        {/* Side ornaments */}
        {[140, 200, 260, 320].map((y) => (
          <g key={y}>
            <circle cx="10" cy={y} r="3" fill="#C9A24B" opacity="0.4"/>
            <circle cx="250" cy={y} r="3" fill="#C9A24B" opacity="0.4"/>
          </g>
        ))}
      </svg>
    </div>
  );
}

/** Animated floating marigold/rose petals */
function FloatingPetals() {
  const petals = [
    { x: '15%', delay: 0,   dur: 7,  size: 10, color: '#F28C28' },
    { x: '75%', delay: 1.5, dur: 9,  size: 8,  color: '#B8475A' },
    { x: '30%', delay: 3,   dur: 8,  size: 12, color: '#F28C28' },
    { x: '60%', delay: 0.8, dur: 11, size: 7,  color: '#C9A24B' },
    { x: '85%', delay: 2.5, dur: 10, size: 9,  color: '#B8475A' },
    { x: '5%',  delay: 4,   dur: 8,  size: 11, color: '#F28C28' },
    { x: '45%', delay: 1,   dur: 12, size: 8,  color: '#C9A24B' },
  ];

  return (
    <>
      {petals.map((p, i) => (
        <div
          key={i}
          className="petal"
          style={{
            left: p.x,
            top: '-20px',
            width: p.size,
            height: p.size * 1.3,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
          }}
          aria-hidden="true"
        >
          <svg viewBox="0 0 10 14" fill="none" style={{ width: '100%', height: '100%' }}>
            <ellipse cx="5" cy="7" rx="4" ry="6" fill={p.color} opacity="0.75"/>
          </svg>
        </div>
      ))}
    </>
  );
}
