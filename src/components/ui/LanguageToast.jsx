'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';

export default function LanguageToast() {
  const { lang, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show toast upon opening if not already dismissed in this session
    const chosen = sessionStorage.getItem('wedding_lang_prompt_dismissed');
    if (!chosen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSelect = (selectedLang) => {
    setLanguage(selectedLang);
    sessionStorage.setItem('wedding_lang_prompt_dismissed', '1');
    setIsOpen(false);
  };

  const handleDismiss = () => {
    sessionStorage.setItem('wedding_lang_prompt_dismissed', '1');
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] w-[min(92vw,440px)]"
          role="dialog"
          aria-label="Language selection"
        >
          <div className="relative rounded-2xl p-4 sm:p-5 bg-[#141418]/95 backdrop-blur-xl border border-[#c5a059]/40 shadow-[0_16px_40px_rgba(0,0,0,0.8)] flex flex-col items-center text-center">
            {/* Top Sheen */}
            <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-[#c5a059]/70 to-transparent" />

            {/* Close Button */}
            <button
              type="button"
              onClick={handleDismiss}
              aria-label="Close"
              className="absolute top-2.5 right-2.5 w-7 h-7 flex items-center justify-center rounded-full text-white/40 hover:text-white/80 hover:bg-white/5 transition-colors cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Prompt Heading (in English & Hindi) */}
            <div className="mb-3.5 pr-4 pl-1">
              <span className="block text-xs uppercase tracking-[0.2em] text-[#c5a059] font-medium mb-1">
                Select your language
              </span>
              <span className="block text-xs text-white/80 font-serif" style={{ fontFamily: 'var(--font-rozha, serif)' }}>
                अपनी भाषा चुनें
              </span>
            </div>

            {/* Language Selection Buttons */}
            <div className="flex items-center justify-center gap-3 w-full">
              {/* English Button */}
              <button
                type="button"
                onClick={() => handleSelect('en')}
                className={`flex-1 py-2.5 px-4 rounded-full text-xs uppercase tracking-wider font-medium transition-all cursor-pointer ${
                  lang === 'en'
                    ? 'border border-[#c5a059] bg-[#c5a059]/25 text-[#f8f1de] shadow-[0_0_15px_rgba(197,160,89,0.3)]'
                    : 'border border-white/15 bg-white/[0.04] text-white/70 hover:border-[#c5a059]/60 hover:text-white'
                }`}
              >
                English
              </button>

              {/* Hindi Button */}
              <button
                type="button"
                onClick={() => handleSelect('hi')}
                className={`flex-1 py-2.5 px-4 rounded-full text-xs tracking-wider font-medium transition-all cursor-pointer font-serif ${
                  lang === 'hi'
                    ? 'border border-[#c5a059] bg-[#c5a059]/25 text-[#f8f1de] shadow-[0_0_15px_rgba(197,160,89,0.3)]'
                    : 'border border-white/15 bg-white/[0.04] text-white/70 hover:border-[#c5a059]/60 hover:text-white'
                }`}
              >
                हिन्दी (Hindi)
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
