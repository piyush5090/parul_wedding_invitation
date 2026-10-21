'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/hooks/useLanguage';
import { useAudio } from '@/hooks/useAudio';
import content from '@/content/content';

export default function ModernIntro({ onComplete }) {
  const { lang } = useLanguage();
  const { start: startMusic } = useAudio();
  const c = content[lang].curtain;

  const [visible, setVisible] = useState(false);
  const [opening, setOpening] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem('wedding_intro_seen');
    if (seen) {
      setClosed(true);
      onComplete?.();
      return;
    }
    setVisible(true);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  const handleOpen = () => {
    if (opening) return;
    startMusic();
    setOpening(true);

    setTimeout(() => {
      sessionStorage.setItem('wedding_intro_seen', '1');
      document.body.style.overflow = '';
      setClosed(true);
      onComplete?.();
    }, 1200);
  };

  if (!visible || closed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: opening ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-[99999] bg-[#0E0E10] flex items-center justify-center overflow-hidden"
      >
        {/* Cinematic Background Image with dark luxury gradient */}
        <div className="absolute inset-0">
          <Image
            src="/images/couple/couple-hero.jpg"
            alt="Parul and Shubham"
            fill
            priority
            className="object-cover opacity-25 filter grayscale contrast-125 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E10] via-[#0E0E10]/85 to-[#0E0E10]/70" />
        </div>

        {/* Content Box */}
        <div className="relative z-10 max-w-xl mx-auto px-6 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <span className="w-8 h-[1px] bg-gold-warm/60" />
            <span
              className="text-[11px] tracking-[0.3em] uppercase text-gold-warm"
              style={{ fontFamily: 'var(--font-cormorant)' }}
            >
              {c.blessing}
            </span>
            <span className="w-8 h-[1px] bg-gold-warm/60" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-5xl md:text-7xl font-serif shimmer-gold mb-4 leading-tight tracking-tight"
            style={{ fontFamily: lang === 'hi' ? 'var(--font-rozha)' : 'var(--font-cormorant)' }}
          >
            {c.brideGroom}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-ivory/60 text-sm md:text-base tracking-[0.2em] uppercase mb-10 font-light"
          >
            {c.date}
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            onClick={handleOpen}
            className="group relative px-9 py-4 rounded-full border border-gold-warm/40 bg-white/[0.03] backdrop-blur-md hover:border-gold-warm hover:bg-gold-warm/15 text-ivory transition-all duration-500 shadow-lg cursor-pointer"
          >
            <span
              className="relative z-10 text-xs md:text-sm tracking-[0.25em] uppercase font-medium flex items-center gap-3 text-gold-warm group-hover:text-ivory transition-colors"
            >
              {c.cta}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="transform group-hover:translate-x-1 transition-transform"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
