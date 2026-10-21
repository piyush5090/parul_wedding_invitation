'use client';
import { useLanguage } from '@/hooks/useLanguage';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Floating bilingual language toggle button.
 * Fixed position, always visible.
 */
export default function LanguageToggle() {
  const { lang, toggle } = useLanguage();

  return (
    <button
      onClick={toggle}
      aria-label={lang === 'en' ? 'Switch to Hindi' : 'Switch to English'}
      className="fixed top-4 right-4 z-[9000] flex items-center gap-1 rounded-full border border-gold/50 bg-maroon/80 backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-gold hover:bg-maroon hover:border-gold transition-all shadow-gold"
      style={{ fontFamily: 'var(--font-hind), var(--font-cormorant)' }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={lang}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.2 }}
        >
          {lang === 'en' ? 'हिं' : 'EN'}
        </motion.span>
      </AnimatePresence>
      <span className="opacity-50">|</span>
      <span className="opacity-70">{lang === 'en' ? 'EN' : 'हिं'}</span>
    </button>
  );
}
