'use client';
import { useAudio } from '@/hooks/useAudio';
import { useLanguage } from '@/hooks/useLanguage';
import content from '@/content/content';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Floating music button with animated equalizer bars.
 * Hidden if audio file is not available.
 */
export default function MusicButton() {
  const { isAvailable, isPlaying, toggle } = useAudio();
  const { lang } = useLanguage();
  const c = content[lang].music;

  if (!isAvailable) return null;

  return (
    <motion.button
      onClick={toggle}
      aria-label={isPlaying ? c.pause : c.play}
      title={isPlaying ? c.pause : c.play}
      className="fixed bottom-6 right-4 z-[9000] flex items-end gap-[3px] rounded-full border border-gold/50 bg-maroon/80 backdrop-blur-sm px-3 py-2.5 hover:bg-maroon hover:border-gold transition-all shadow-gold"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2 }}
    >
      <AnimatePresence mode="wait">
        {isPlaying ? (
          <motion.span
            key="playing"
            className="flex items-end gap-[3px] h-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`eq-bar inline-block w-[3px] rounded-full bg-gold`}
                style={{ height: '4px' }}
              />
            ))}
          </motion.span>
        ) : (
          <motion.span
            key="paused"
            className="flex items-center h-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Play icon */}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 1.5L10 6L2 10.5V1.5Z" fill="#C9A24B"/>
            </svg>
          </motion.span>
        )}
      </AnimatePresence>
      <span className="ml-1 text-[10px] text-gold/70 font-medium tracking-wide">
        {isPlaying ? 'MUSIC' : 'MUSIC'}
      </span>
    </motion.button>
  );
}
