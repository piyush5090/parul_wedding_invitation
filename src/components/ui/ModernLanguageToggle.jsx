'use client';
import { useLanguage } from '@/hooks/useLanguage';
import { motion, AnimatePresence } from 'framer-motion';

export default function ModernLanguageToggle() {
  const { lang, toggle } = useLanguage();

  return (
    <button
      onClick={toggle}
      aria-label={lang === 'en' ? 'Switch to Hindi' : 'Switch to English'}
      className="fixed top-6 right-6 z-[9000] flex items-center gap-2 rounded-full border border-white/10 bg-[#1A1A1E]/80 backdrop-blur-md px-4 py-2 text-xs font-medium text-ivory/80 hover:text-gold-warm hover:border-gold-warm/40 transition-all shadow-lg cursor-pointer"
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={lang}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.15 }}
          className="text-gold-warm font-semibold tracking-wider"
        >
          {lang === 'en' ? 'EN' : 'हिन्दी'}
        </motion.span>
      </AnimatePresence>
      <span className="text-white/20">|</span>
      <span className="text-ivory/40 hover:text-ivory transition-colors">
        {lang === 'en' ? 'हिं' : 'EN'}
      </span>
    </button>
  );
}
