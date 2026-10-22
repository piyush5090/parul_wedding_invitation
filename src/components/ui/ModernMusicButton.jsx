'use client';
import { useAudio } from '@/hooks/useAudio';
import { useLanguage } from '@/hooks/useLanguage';
import content from '@/content/content';
import { motion, AnimatePresence } from 'framer-motion';

export default function ModernMusicButton() {
  const { isAvailable, isPlaying, toggle } = useAudio();
  const { lang } = useLanguage();
  const c = content[lang]?.music || { play: 'Play', pause: 'Pause' };

  if (!isAvailable) return null;

  return (
    <motion.button
      onClick={toggle}
      aria-label={isPlaying ? (c.pause || 'Pause') : (c.play || 'Play')}
      title={isPlaying ? (c.pause || 'Pause') : (c.play || 'Play')}
      className="fixed bottom-6 right-6 z-[9000] flex items-center gap-2.5 rounded-full border border-gold-warm/40 bg-[#1A1A1E]/80 backdrop-blur-md px-4 py-2.5 hover:border-gold-warm transition-all shadow-xl cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
    >
      <AnimatePresence mode="wait">
        {isPlaying ? (
          <motion.span
            key="playing"
            className="flex items-end gap-[3px] h-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <span className="eq-bar-1 inline-block w-[2.5px] rounded-full bg-gold-warm" />
            <span className="eq-bar-2 inline-block w-[2.5px] rounded-full bg-gold-warm" />
            <span className="eq-bar-3 inline-block w-[2.5px] rounded-full bg-gold-warm" />
          </motion.span>
        ) : (
          <motion.span
            key="paused"
            className="flex items-center h-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2.5 1.5L9.5 6L2.5 10.5V1.5Z" fill="#D4AF37" />
            </svg>
          </motion.span>
        )}
      </AnimatePresence>
      <span className="text-[11px] text-ivory/80 font-medium tracking-widest uppercase">
        {isPlaying ? 'SOUND ON' : 'PLAY'}
      </span>
    </motion.button>
  );
}
