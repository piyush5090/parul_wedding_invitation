'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { useAudio } from '@/hooks/useAudio';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import content from '@/content/content';

/**
 * Section 1: Theatre Curtain Intro
 *
 * - Two velvet curtain panels with CSS fold shading + gold fringe SVG
 * - Bilingual text fades in with stagger
 * - "Open Invitation" CTA unlocks audio and lifts curtains
 * - Shown once per session (sessionStorage)
 * - Scroll is locked during intro
 */
export default function CurtainIntro({ onComplete }) {
  const { lang } = useLanguage();
  const { start: startMusic } = useAudio();
  const reduced = useReducedMotion();
  const c = content[lang].curtain;

  const [show, setShow] = useState(false);
  const [lifting, setLifting] = useState(false);
  const [done, setDone] = useState(false);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const seen = sessionStorage.getItem('curtain_seen');
    if (seen) {
      setDone(true);
      onComplete?.();
      return;
    }
    setShow(true);
    document.body.classList.add('scroll-locked');
    return () => document.body.classList.remove('scroll-locked');
  }, [onComplete]);

  const handleOpen = () => {
    if (lifting) return;
    startMusic();
    setLifting(true);
    // After animation completes, mark done
    setTimeout(() => {
      sessionStorage.setItem('curtain_seen', '1');
      document.body.classList.remove('scroll-locked');
      setDone(true);
      onComplete?.();
    }, reduced ? 100 : 2200);
  };

  if (!show || done) return null;

  const curtainVariants = {
    initial: { y: 0 },
    lift: {
      y: '-105%',
      transition: {
        duration: reduced ? 0.1 : 1.9,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.4 + 0.8, duration: 0.7 },
    }),
  };

  return (
    <AnimatePresence>
      {!done && (
        <div
          className="fixed inset-0 z-[99999] overflow-hidden"
          style={{ background: '#1a040a' }}
          role="dialog"
          aria-modal="true"
          aria-label="Wedding invitation curtain"
        >
          {/* Spotlight vignette */}
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 60% 80% at 50% 45%, transparent 20%, rgba(0,0,0,0.75) 100%)',
            }}
          />

          {/* Left curtain */}
          <motion.div
            ref={leftRef}
            variants={curtainVariants}
            initial="initial"
            animate={lifting ? 'lift' : 'initial'}
            className="curtain-panel curtain-left z-20"
          >
            {/* Vertical fold shading */}
            <div className="absolute inset-0 pointer-events-none"
              style={{
                background: 'repeating-linear-gradient(to right, rgba(0,0,0,0.18) 0px, transparent 12px, rgba(255,255,255,0.04) 24px, transparent 36px, rgba(0,0,0,0.12) 48px)'
              }}
            />
            {/* Gold fringe at bottom */}
            <FringeBottom side="left" />
          </motion.div>

          {/* Right curtain */}
          <motion.div
            ref={rightRef}
            variants={curtainVariants}
            initial="initial"
            animate={lifting ? 'lift' : 'initial'}
            className="curtain-panel curtain-right z-20"
            transition={{ delay: reduced ? 0 : 0.05 }}
          >
            <div className="absolute inset-0 pointer-events-none"
              style={{
                background: 'repeating-linear-gradient(to right, rgba(0,0,0,0.12) 0px, transparent 12px, rgba(255,255,255,0.04) 24px, transparent 36px, rgba(0,0,0,0.18) 48px)'
              }}
            />
            <FringeBottom side="right" />
          </motion.div>

          {/* Center content (on top of curtains slightly) */}
          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-6">
            {/* Ganesh invocation */}
            <motion.p
              custom={0}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="text-gold/70 text-sm tracking-[0.25em] uppercase mb-6"
              style={{ fontFamily: 'var(--font-hind)' }}
            >
              ॥ श्री गणेशाय नम: ॥
            </motion.p>

            <motion.p
              custom={1}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="text-ivory/80 text-base md:text-lg mb-2"
              style={{ fontFamily: lang === 'hi' ? 'var(--font-hind)' : 'var(--font-lora)' }}
            >
              {c.blessing}
            </motion.p>

            <motion.p
              custom={2}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="text-ivory/70 text-sm md:text-base mb-6"
              style={{ fontFamily: lang === 'hi' ? 'var(--font-hind)' : 'var(--font-lora)' }}
            >
              {c.invite}
            </motion.p>

            {/* Names — big gold script */}
            <motion.h1
              custom={3}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="shimmer-text mb-3"
              style={{
                fontFamily: 'var(--font-great-vibes)',
                fontSize: 'clamp(2.5rem, 10vw, 5.5rem)',
                lineHeight: 1.1,
              }}
            >
              {c.brideGroom}
            </motion.h1>

            {/* Ornamental rule */}
            <motion.div
              custom={3.5}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="my-4"
            >
              <svg width="180" height="16" viewBox="0 0 180 16" fill="none">
                <line x1="0" y1="8" x2="70" y2="8" stroke="#C9A24B" strokeOpacity="0.5" strokeWidth="0.8"/>
                <path d="M85,8 L90,2 L95,8 L90,14 Z" fill="#C9A24B" opacity="0.7"/>
                <circle cx="90" cy="8" r="2" fill="#F28C28"/>
                <line x1="110" y1="8" x2="180" y2="8" stroke="#C9A24B" strokeOpacity="0.5" strokeWidth="0.8"/>
              </svg>
            </motion.div>

            <motion.p
              custom={4}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              className="text-gold text-lg md:text-xl tracking-widest mb-10"
              style={{ fontFamily: 'var(--font-cormorant)' }}
            >
              {c.date}
            </motion.p>

            {/* CTA Button */}
            <motion.button
              custom={5}
              variants={textVariants}
              initial="hidden"
              animate="visible"
              onClick={handleOpen}
              id="curtain-open-btn"
              aria-label={c.cta}
              className="group relative px-8 py-4 border border-gold/60 rounded-full text-gold hover:bg-gold/10 transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
              whileHover={reduced ? {} : { scale: 1.05 }}
              whileTap={reduced ? {} : { scale: 0.97 }}
            >
              {/* Pulse ring */}
              {!reduced && (
                <span className="absolute inset-0 rounded-full border border-gold/30 animate-ping" style={{ animationDuration: '2s' }} />
              )}
              <span className="block text-base md:text-lg font-medium tracking-widest"
                style={{ fontFamily: 'var(--font-cormorant)' }}>
                {c.cta}
              </span>
              <span className="block text-xs opacity-60 mt-0.5 tracking-[0.2em]">
                {c.ctaSub}
              </span>
            </motion.button>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

/** Gold fringe SVG at bottom of curtain */
function FringeBottom({ side }) {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-10" aria-hidden="true">
      <svg viewBox="0 0 300 60" preserveAspectRatio="none" fill="none" style={{ width: '100%', height: '60px' }}>
        {/* Gold trim bar */}
        <rect x="0" y="0" width="300" height="8" fill="#C9A24B" opacity="0.8"/>
        {/* Tassel drops */}
        {Array.from({ length: 16 }).map((_, i) => (
          <g key={i} transform={`translate(${i * 19 + 9}, 8)`}>
            <line x1="0" y1="0" x2="0" y2="30" stroke="#C9A24B" strokeWidth="1.5" opacity="0.7"/>
            <ellipse cx="0" cy="35" rx="3.5" ry="6" fill="#C9A24B" opacity="0.85"/>
            <ellipse cx="0" cy="35" rx="2" ry="4" fill="#E0BC6B" opacity="0.6"/>
          </g>
        ))}
      </svg>
    </div>
  );
}
