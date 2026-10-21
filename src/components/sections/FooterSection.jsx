'use client';
import { useLanguage } from '@/hooks/useLanguage';
import content from '@/content/content';
import { HASHTAG } from '@/content/config';
import OrnamentalDivider from '@/components/ui/OrnamentalDivider';

export default function FooterSection({ onReplayIntro }) {
  const { lang, toggle } = useLanguage();
  const c = content[lang].footer;

  return (
    <footer
      className="py-16 relative text-center border-t border-gold/20 overflow-hidden"
      style={{ background: '#170305' }}
    >
      <div className="max-w-2xl mx-auto px-6 flex flex-col items-center">
        <OrnamentalDivider variant="simple" className="mb-6" />

        <h3
          className="text-2xl md:text-3xl text-gold mb-3 font-serif"
          style={{ fontFamily: lang === 'hi' ? 'var(--font-rozha)' : 'var(--font-great-vibes)' }}
        >
          {c.blessing}
        </h3>

        <p
          className="text-ivory/70 text-sm md:text-base italic max-w-md mx-auto mb-6 leading-relaxed"
          style={{ fontFamily: lang === 'hi' ? 'var(--font-hind)' : 'var(--font-lora)' }}
        >
          {c.tagline}
        </p>

        <span className="inline-block px-4 py-1.5 rounded-full border border-gold/40 text-gold text-xs tracking-widest font-mono mb-8 bg-gold/5">
          {HASHTAG}
        </span>

        <div className="flex items-center gap-4 text-xs text-gold/60">
          <button
            onClick={onReplayIntro}
            className="hover:text-gold transition-colors underline underline-offset-4 cursor-pointer"
          >
            {c.replayIntro}
          </button>
          <span>•</span>
          <button
            onClick={toggle}
            className="hover:text-gold transition-colors underline underline-offset-4 cursor-pointer"
          >
            {c.language}
          </button>
        </div>

        <p className="mt-8 text-[11px] text-ivory/40 tracking-wider uppercase font-sans">
          {c.madeWith}
        </p>
      </div>
    </footer>
  );
}
