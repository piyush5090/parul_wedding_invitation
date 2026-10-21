'use client';
import { useEffect, useRef } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import content from '@/content/content';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Section 7: Animated Baraat Procession (scroll-driven).
 *
 * GSAP ScrollTrigger scrubs the entire procession horizontally.
 * Characters are original custom SVG illustrations.
 * Mobile: simplified, smaller scene.
 */
export default function BaraatSection() {
  const { lang } = useLanguage();
  const c = content[lang].baraat;
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();
  const sectionRef = useRef(null);
  const sceneRef = useRef(null);
  const revealRef = useRef(null);

  useEffect(() => {
    if (reduced) return;

    const ctx = gsap.context(() => {
      // Scroll-driven procession: moves the whole scene right-to-left
      const sceneWidth = sceneRef.current?.scrollWidth || 2400;
      const viewW = window.innerWidth;

      gsap.to(sceneRef.current, {
        x: -(sceneWidth - viewW + 60),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            // Reveal the bride's side when 85% through
            if (revealRef.current) {
              const show = self.progress > 0.82;
              revealRef.current.style.opacity = show
                ? Math.min(1, (self.progress - 0.82) * 6)
                : '0';
            }
          },
        },
      });

      // Idle animations: dhol players bobbing
      gsap.to('.dhol-player', {
        y: -4,
        duration: 0.35,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        stagger: 0.1,
      });

      // Horse trot
      gsap.to('.horse-body', {
        y: -5,
        rotation: 1,
        duration: 0.4,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });

      // Baraatis dancing sway
      gsap.to('.baraati', {
        rotation: 5,
        duration: 0.5,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        stagger: 0.15,
        transformOrigin: 'bottom center',
      });

      // Sparkler flicker
      gsap.to('.sparkler-glow', {
        opacity: 0.4,
        scale: 1.3,
        duration: 0.15,
        yoyo: true,
        repeat: -1,
        ease: 'none',
        stagger: 0.05,
      });

      // String lights twinkle
      gsap.to('.string-light', {
        opacity: 0.2,
        duration: 0.5,
        yoyo: true,
        repeat: -1,
        ease: 'none',
        stagger: 0.08,
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [reduced, isMobile]);

  return (
    <section
      ref={sectionRef}
      id="baraat"
      className="relative overflow-hidden"
      style={{ height: isMobile ? 'auto' : '350vh' }}
      aria-label="Animated Baraat procession"
    >
      {/* Section label — sticky above scene */}
      {!isMobile && (
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 text-center pointer-events-none">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gold/50 text-xs tracking-[0.35em] uppercase"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            {lang === 'hi' ? 'स्क्रोल करें' : 'scroll to witness'}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-3xl text-ivory mt-1"
            style={{ fontFamily: lang === 'hi' ? 'var(--font-rozha)' : 'var(--font-cormorant)', fontWeight: 600 }}
          >
            {c.heading}
          </motion.h2>
          <p className="text-ivory/50 text-sm mt-1"
            style={{ fontFamily: lang === 'hi' ? 'var(--font-hind)' : 'var(--font-lora)' }}>
            {c.subtext}
          </p>
        </div>
      )}

      {/* Sticky canvas wrapper */}
      <div
        className={isMobile ? 'relative' : 'sticky top-0 h-screen'}
        style={{ overflow: 'hidden' }}
      >
        {/* The full scene (wider than viewport) */}
        <div
          ref={sceneRef}
          className="relative flex-shrink-0"
          style={{
            width: isMobile ? '100%' : '2600px',
            height: isMobile ? 'auto' : '100vh',
          }}
        >
          <BaraatScene isMobile={isMobile} />

          {/* Bride's side reveal */}
          <div
            ref={revealRef}
            className="absolute right-0 top-0 h-full flex items-end pb-20 pr-16 transition-opacity"
            style={{ opacity: 0, minWidth: '200px' }}
            aria-live="polite"
          >
            <BridesSide lang={lang} c={c} />
          </div>
        </div>
      </div>

      {/* Mobile: static scene + text */}
      {isMobile && (
        <div className="py-10 text-center px-4 bg-gradient-to-b from-[#1a0508] to-[#2a0608]">
          <h2 className="text-2xl text-ivory mb-2"
            style={{ fontFamily: lang === 'hi' ? 'var(--font-rozha)' : 'var(--font-cormorant)', fontWeight: 600 }}>
            {c.heading}
          </h2>
          <p className="text-ivory/60 text-sm"
            style={{ fontFamily: lang === 'hi' ? 'var(--font-hind)' : 'var(--font-lora)' }}>
            {c.subtext}
          </p>
          <p className="text-gold text-lg mt-4"
            style={{ fontFamily: lang === 'hi' ? 'var(--font-rozha)' : 'var(--font-cormorant)' }}>
            {c.reveal}
          </p>
        </div>
      )}
    </section>
  );
}

/** The full illustrated baraat scene */
function BaraatScene({ isMobile }) {
  const W = isMobile ? 400 : 2600;
  const H = isMobile ? 260 : 480;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      fill="none"
      style={{ width: isMobile ? '100%' : `${W}px`, height: isMobile ? `${H}px` : '100%' }}
      preserveAspectRatio="xMidYMax meet"
      aria-hidden="true"
    >
      {/* ── Sky gradient ── */}
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0d0020"/>
          <stop offset="35%" stopColor="#6b1a00"/>
          <stop offset="65%" stopColor="#c94700"/>
          <stop offset="100%" stopColor="#f28c28"/>
        </linearGradient>
        <linearGradient id="street" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a1a08"/>
          <stop offset="100%" stopColor="#1a0d04"/>
        </linearGradient>
        <radialGradient id="sparkle" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fffde7" stopOpacity="1"/>
          <stop offset="100%" stopColor="#f28c28" stopOpacity="0"/>
        </radialGradient>
      </defs>

      {/* Sky */}
      <rect width={W} height={H * 0.72} fill="url(#sky)"/>

      {/* Stars */}
      {isMobile ? null : Array.from({ length: 40 }).map((_, i) => (
        <circle
          key={i}
          cx={Math.sin(i * 137.5) * W * 0.5 + W * 0.5}
          cy={Math.sin(i * 73.1) * H * 0.25 + H * 0.1}
          r={0.8 + (i % 3) * 0.5}
          fill="white"
          opacity={0.4 + (i % 4) * 0.15}
          className="string-light"
        />
      ))}

      {/* Moon */}
      <circle cx={isMobile ? 350 : 2450} cy={H * 0.12} r={isMobile ? 18 : 38} fill="#fdf4dc" opacity="0.9"/>
      <circle cx={isMobile ? 360 : 2462} cy={H * 0.10} r={isMobile ? 14 : 30} fill="#0d0020"/>

      {/* Palace / building silhouette */}
      <PalaceSilhouette W={W} H={H} isMobile={isMobile}/>

      {/* Ground / street */}
      <rect x={0} y={H * 0.72} width={W} height={H * 0.28} fill="url(#street)"/>
      {/* Street detail */}
      <line x1={0} y1={H * 0.73} x2={W} y2={H * 0.73} stroke="#3a2010" strokeWidth="2"/>

      {/* String lights (horizontal) */}
      {isMobile ? null : Array.from({ length: 18 }).map((_, i) => (
        <g key={i} transform={`translate(${i * 148}, 0)`}>
          {/* Wire */}
          <path d={`M0,${H*0.3} Q74,${H*0.35} 148,${H*0.3}`} stroke="#3a2010" strokeWidth="0.8" fill="none"/>
          {/* Bulb */}
          <circle cx="74" cy={H * 0.35} r="4" fill="#F28C28" className="string-light" opacity="0.9"/>
          <circle cx="74" cy={H * 0.35} r="7" fill="#F28C28" className="string-light" opacity="0.2"/>
        </g>
      ))}

      {/* ── Procession characters ── */}

      {/* 1. Lead dhol player */}
      {!isMobile && <DholPlayer cx={200} cy={H * 0.72} H={H} />}

      {/* 2. Groom on ghodi (horse) */}
      <GroomOnHorse cx={isMobile ? 120 : 520} cy={H * 0.72} H={H} isMobile={isMobile}/>

      {/* 3. Chhatri bearer */}
      {!isMobile && <ChhatrI cx={820} cy={H * 0.72} H={H}/>}

      {/* 4–5. Baraatis dancing */}
      {!isMobile && <Baraati cx={1080} cy={H * 0.72} H={H} variant={1}/>}
      {!isMobile && <Baraati cx={1240} cy={H * 0.72} H={H} variant={2}/>}
      {!isMobile && <Baraati cx={1400} cy={H * 0.72} H={H} variant={1}/>}

      {/* 6. Brass band */}
      {!isMobile && <BandPlayer cx={1640} cy={H * 0.72} H={H}/>}
      {!isMobile && <DholPlayer cx={1820} cy={H * 0.72} H={H}/>}

      {/* 7. Sparkler holders */}
      {!isMobile && <SparklerHolder cx={2040} cy={H * 0.72} H={H}/>}
      {!isMobile && <SparklerHolder cx={2160} cy={H * 0.72} H={H}/>}

      {/* Fireworks near end */}
      {!isMobile && <Fireworks cx={2350} cy={H * 0.2} />}
    </svg>
  );
}

// ── Character sub-components ─────────────────────────────────────────────────

function DholPlayer({ cx, cy, H }) {
  const h = H * 0.18;
  return (
    <g transform={`translate(${cx}, ${cy - h})`} className="dhol-player">
      {/* Body */}
      <ellipse cx="0" cy={h * 0.4} rx={h*0.15} ry={h*0.25} fill="#C9A24B" opacity="0.85"/>
      {/* Head */}
      <circle cx="0" cy={h*0.08} r={h*0.1} fill="#d4956b"/>
      {/* Dhol drum */}
      <ellipse cx="0" cy={h*0.42} rx={h*0.2} ry={h*0.1} fill="#8B4513" stroke="#C9A24B" strokeWidth="1"/>
      {/* Arms with sticks */}
      <line x1={-h*0.2} y1={h*0.3} x2={-h*0.35} y2={h*0.45} stroke="#d4956b" strokeWidth="2" strokeLinecap="round"/>
      <line x1={h*0.2} y1={h*0.3} x2={h*0.35} y2={h*0.45} stroke="#d4956b" strokeWidth="2" strokeLinecap="round"/>
      {/* Legs */}
      <line x1={-h*0.07} y1={h*0.65} x2={-h*0.1} y2={h} stroke="#C9A24B" strokeWidth="3" strokeLinecap="round"/>
      <line x1={h*0.07} y1={h*0.65} x2={h*0.1} y2={h} stroke="#C9A24B" strokeWidth="3" strokeLinecap="round"/>
      {/* Turban */}
      <ellipse cx="0" cy={h*0.02} rx={h*0.12} ry={h*0.06} fill="#F28C28"/>
    </g>
  );
}

function GroomOnHorse({ cx, cy, H, isMobile }) {
  const h = isMobile ? 90 : H * 0.28;
  return (
    <g transform={`translate(${cx}, ${cy - h})`}>
      {/* Horse body */}
      <g className="horse-body">
        <ellipse cx="0" cy={h*0.65} rx={h*0.28} ry={h*0.18} fill="#e8d5b7" stroke="#c4a882" strokeWidth="1.5"/>
        {/* Horse head */}
        <ellipse cx={h*0.22} cy={h*0.5} rx={h*0.1} ry={h*0.12} fill="#e8d5b7" stroke="#c4a882" strokeWidth="1.2"/>
        {/* Mane */}
        <path d={`M${h*0.18},${h*0.4} Q${h*0.25},${h*0.35} ${h*0.28},${h*0.45}`}
          stroke="#8B5E3C" strokeWidth="3" fill="none" strokeLinecap="round"/>
        {/* Legs */}
        <line x1={-h*0.15} y1={h*0.78} x2={-h*0.18} y2={h} stroke="#c4a882" strokeWidth={isMobile ? 3 : 5} strokeLinecap="round"/>
        <line x1={-h*0.05} y1={h*0.8} x2={-h*0.06} y2={h} stroke="#c4a882" strokeWidth={isMobile ? 3 : 5} strokeLinecap="round"/>
        <line x1={h*0.08} y1={h*0.8} x2={h*0.1} y2={h} stroke="#c4a882" strokeWidth={isMobile ? 3 : 5} strokeLinecap="round"/>
        <line x1={h*0.18} y1={h*0.78} x2={h*0.2} y2={h} stroke="#c4a882" strokeWidth={isMobile ? 3 : 5} strokeLinecap="round"/>
        {/* Floral decorations on horse */}
        {[0,1,2].map((i) => (
          <circle key={i} cx={-h*0.18 + i*h*0.12} cy={h*0.6} r={h*0.03} fill="#F28C28" opacity="0.8"/>
        ))}
      </g>

      {/* Groom (sehra, sherwani) */}
      <g transform={`translate(${-h*0.04}, ${h*0.3})`}>
        {/* Body - sherwani */}
        <rect x={-h*0.09} y={h*0.12} width={h*0.18} height={h*0.3}
          rx={h*0.04} fill="#5A0F1B"/>
        {/* Head */}
        <circle cx="0" cy={h*0.06} r={h*0.08} fill="#d4956b"/>
        {/* Safa / turban */}
        <ellipse cx="0" cy={h*0.02} rx={h*0.11} ry={h*0.05} fill="#C9A24B"/>
        {/* Sehra (flower veil) */}
        <path d={`M${-h*0.1},${h*0.04} Q${-h*0.12},${h*0.18} ${-h*0.08},${h*0.22}`}
          stroke="#F28C28" strokeWidth="1.5" fill="none"/>
        <path d={`M0,${h*0.04} Q0,${h*0.2} 0,${h*0.25}`}
          stroke="#F28C28" strokeWidth="1.5" fill="none"/>
        <path d={`M${h*0.1},${h*0.04} Q${h*0.12},${h*0.18} ${h*0.08},${h*0.22}`}
          stroke="#F28C28" strokeWidth="1.5" fill="none"/>
      </g>
    </g>
  );
}

function ChhatrI({ cx, cy, H }) {
  const h = H * 0.22;
  return (
    <g transform={`translate(${cx}, ${cy - h})`} className="baraati">
      {/* Person */}
      <circle cx="0" cy={h*0.08} r={h*0.1} fill="#d4956b"/>
      <rect x={-h*0.1} y={h*0.18} width={h*0.2} height={h*0.35} rx={h*0.03} fill="#F28C28"/>
      {/* Pole */}
      <line x1="0" y1={h*0.05} x2="0" y2={-h*0.4} stroke="#8B5E3C" strokeWidth="3"/>
      {/* Chhatri (umbrella) */}
      <path d={`M${-h*0.35},${-h*0.4} Q0,${-h*0.65} ${h*0.35},${-h*0.4}`}
        fill="#C9A24B" stroke="#A8832E" strokeWidth="1.5"/>
      {/* Fringe */}
      {[-3,-2,-1,0,1,2,3].map((i) => (
        <line key={i} x1={i*h*0.1} y1={-h*0.4} x2={i*h*0.1} y2={-h*0.28}
          stroke="#E0BC6B" strokeWidth="1" opacity="0.8"/>
      ))}
      {/* Legs */}
      <line x1={-h*0.05} y1={h*0.53} x2={-h*0.08} y2={h} stroke="#F28C28" strokeWidth="3" strokeLinecap="round"/>
      <line x1={h*0.05} y1={h*0.53} x2={h*0.08} y2={h} stroke="#F28C28" strokeWidth="3" strokeLinecap="round"/>
    </g>
  );
}

function Baraati({ cx, cy, H, variant }) {
  const h = H * 0.18;
  const color = variant === 1 ? '#B8475A' : '#F28C28';
  return (
    <g transform={`translate(${cx}, ${cy - h})`} className="baraati">
      <circle cx="0" cy={h*0.08} r={h*0.1} fill="#d4956b"/>
      <rect x={-h*0.1} y={h*0.18} width={h*0.2} height={h*0.35} rx={h*0.03} fill={color}/>
      {/* Arms raised */}
      <line x1={-h*0.1} y1={h*0.25} x2={-h*0.28} y2={h*0.12} stroke="#d4956b" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1={h*0.1} y1={h*0.25} x2={h*0.28} y2={h*0.12} stroke="#d4956b" strokeWidth="2.5" strokeLinecap="round"/>
      <line x1={-h*0.05} y1={h*0.53} x2={-h*0.08} y2={h} stroke={color} strokeWidth="3" strokeLinecap="round"/>
      <line x1={h*0.05} y1={h*0.53} x2={h*0.08} y2={h} stroke={color} strokeWidth="3" strokeLinecap="round"/>
    </g>
  );
}

function BandPlayer({ cx, cy, H }) {
  const h = H * 0.19;
  return (
    <g transform={`translate(${cx}, ${cy - h})`} className="dhol-player">
      <circle cx="0" cy={h*0.08} r={h*0.1} fill="#d4956b"/>
      <rect x={-h*0.11} y={h*0.18} width={h*0.22} height={h*0.35} rx={h*0.03} fill="#1a3a6b"/>
      {/* Trumpet */}
      <path d={`M${h*0.11},${h*0.28} L${h*0.35},${h*0.24} Q${h*0.44},${h*0.24} ${h*0.46},${h*0.28} Q${h*0.44},${h*0.32} ${h*0.35},${h*0.3} Z`}
        fill="#C9A24B"/>
      <line x1={-h*0.05} y1={h*0.53} x2={-h*0.08} y2={h} stroke="#1a3a6b" strokeWidth="3" strokeLinecap="round"/>
      <line x1={h*0.05} y1={h*0.53} x2={h*0.08} y2={h} stroke="#1a3a6b" strokeWidth="3" strokeLinecap="round"/>
    </g>
  );
}

function SparklerHolder({ cx, cy, H }) {
  const h = H * 0.18;
  return (
    <g transform={`translate(${cx}, ${cy - h})`}>
      <circle cx="0" cy={h*0.08} r={h*0.1} fill="#d4956b"/>
      <rect x={-h*0.1} y={h*0.18} width={h*0.2} height={h*0.35} rx={h*0.03} fill="#5A0F1B"/>
      {/* Sparkler stick */}
      <line x1={h*0.1} y1={h*0.22} x2={h*0.32} y2={-h*0.1} stroke="#888" strokeWidth="2"/>
      {/* Sparkle glow */}
      <circle cx={h*0.32} cy={-h*0.1} r={h*0.06} fill="url(#sparkle)" className="sparkler-glow" opacity="0.9"/>
      {/* Sparks */}
      {[0,60,120,180,240,300].map((deg) => (
        <line
          key={deg}
          x1={h*0.32 + Math.cos(deg*Math.PI/180)*h*0.06}
          y1={-h*0.1 + Math.sin(deg*Math.PI/180)*h*0.06}
          x2={h*0.32 + Math.cos(deg*Math.PI/180)*h*0.12}
          y2={-h*0.1 + Math.sin(deg*Math.PI/180)*h*0.12}
          stroke="#fffde7" strokeWidth="1" strokeLinecap="round"
          className="sparkler-glow" opacity="0.7"
        />
      ))}
      <line x1={-h*0.05} y1={h*0.53} x2={-h*0.08} y2={h} stroke="#5A0F1B" strokeWidth="3" strokeLinecap="round"/>
      <line x1={h*0.05} y1={h*0.53} x2={h*0.08} y2={h} stroke="#5A0F1B" strokeWidth="3" strokeLinecap="round"/>
    </g>
  );
}

function Fireworks({ cx, cy }) {
  const colors = ['#F28C28', '#C9A24B', '#B8475A', '#fffde7'];
  return (
    <g transform={`translate(${cx}, ${cy})`} className="sparkler-glow">
      {colors.map((c, i) =>
        Array.from({ length: 8 }).map((_, j) => {
          const angle = (j / 8) * 2 * Math.PI + i * 0.3;
          const len = 25 + i * 8;
          return (
            <line key={`${i}-${j}`}
              x1="0" y1="0"
              x2={Math.cos(angle) * len}
              y2={Math.sin(angle) * len}
              stroke={c}
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity={0.7 - i * 0.1}
            />
          );
        })
      )}
      <circle cx="0" cy="0" r="5" fill="#fffde7"/>
    </g>
  );
}

function PalaceSilhouette({ W, H, isMobile }) {
  const scale = isMobile ? 0.4 : 1;
  const baseY = H * 0.72;
  const sx = isMobile ? 60 : 1600;
  return (
    <g transform={`translate(${sx}, 0)`} opacity="0.35">
      {/* Main palace body */}
      <rect x={0} y={baseY - 180*scale} width={280*scale} height={180*scale} fill="#1a0508"/>
      {/* Center dome */}
      <path d={`M${90*scale},${baseY - 180*scale} Q${140*scale},${baseY - 280*scale} ${190*scale},${baseY - 180*scale}`}
        fill="#2a0a10"/>
      {/* Side towers */}
      <rect x={-20*scale} y={baseY - 140*scale} width={30*scale} height={140*scale} fill="#1a0508"/>
      <rect x={270*scale} y={baseY - 140*scale} width={30*scale} height={140*scale} fill="#1a0508"/>
      {/* Tower tops */}
      <path d={`M${-20*scale},${baseY - 140*scale} Q${-5*scale},${baseY - 180*scale} ${10*scale},${baseY - 140*scale}`} fill="#2a0a10"/>
      <path d={`M${270*scale},${baseY - 140*scale} Q${285*scale},${baseY - 180*scale} ${300*scale},${baseY - 140*scale}`} fill="#2a0a10"/>
      {/* Windows */}
      {[60,130,200].map((x) => (
        <g key={x}>
          <rect x={x*scale} y={baseY - 120*scale} width={25*scale} height={35*scale}
            rx={12*scale} fill="#3a1010" opacity="0.8"/>
          <rect x={x*scale+5*scale} y={baseY - 115*scale} width={15*scale} height={25*scale}
            rx={7*scale} fill="#C9A24B" opacity="0.15"/>
        </g>
      ))}
    </g>
  );
}

/** Bride's side floral mandap gate reveal */
function BridesSide({ lang, c }) {
  return (
    <div className="text-right">
      <svg width="120" height="160" viewBox="0 0 120 160" fill="none" aria-hidden="true">
        {/* Mandap gate */}
        <path d="M10,160 L10,60 Q10,10 60,10 Q110,10 110,60 L110,160"
          stroke="#C9A24B" strokeWidth="2" fill="rgba(90,15,27,0.5)"/>
        {/* Floral decoration */}
        {[30,60,90,120].map((y) => (
          <g key={y}>
            <circle cx="10" cy={y} r="4" fill="#F28C28" opacity="0.7"/>
            <circle cx="110" cy={y} r="4" fill="#F28C28" opacity="0.7"/>
          </g>
        ))}
        {/* Marigold garland */}
        <path d="M10,60 Q60,80 110,60" stroke="#F28C28" strokeWidth="1.5" fill="none" opacity="0.6"/>
        {/* Crown */}
        <circle cx="60" cy="10" r="8" fill="none" stroke="#C9A24B" strokeWidth="1.5"/>
        <circle cx="60" cy="10" r="4" fill="#C9A24B" opacity="0.7"/>

        {/* Bride figure */}
        <circle cx="55" cy="95" r="10" fill="#d4956b"/>
        <path d="M45,105 Q50,140 55,155 Q60,140 65,105 Z" fill="#B8475A"/>
        {/* Dupatta */}
        <path d="M45,107 Q35,115 32,130" stroke="#F28C28" strokeWidth="2" fill="none"/>
      </svg>
      <p className="text-gold text-sm md:text-base mt-2"
        style={{ fontFamily: lang === 'hi' ? 'var(--font-rozha)' : 'var(--font-cormorant)' }}>
        {c.reveal}
      </p>
    </div>
  );
}
