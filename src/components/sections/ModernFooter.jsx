'use client';
import { useLanguage } from '@/hooks/useLanguage';
import content from '@/content/content';
import { HASHTAG } from '@/content/config';

export default function ModernFooter({ onReplayIntro }) {
  const { lang, toggle } = useLanguage();
  const c = content[lang].footer;

  return (
    <footer className="py-20 relative text-center border-t border-white/5 bg-[#0E0E10] px-6">
      <div className="max-w-2xl mx-auto flex flex-col items-center">

        <h3
          className="text-3xl md:text-4xl shimmer-gold mb-3 font-serif"
          style={{ fontFamily: lang === 'hi' ? 'var(--font-rozha)' : 'var(--font-great-vibes)' }}
        >
          {c.blessing}
        </h3>

        <p
          className="text-ivory/60 text-sm md:text-base italic max-w-md mx-auto mb-8 font-light"
          style={{ fontFamily: lang === 'hi' ? 'var(--font-hind)' : 'var(--font-lora)' }}
        >
          {c.tagline}
        </p>

        <span className="inline-block px-5 py-2 rounded-full border border-gold-warm/30 text-gold-warm text-xs tracking-widest font-mono mb-8 bg-white/[0.02]">
          {HASHTAG}
        </span>

        <div className="flex items-center gap-6 text-xs text-ivory/50">
          <button
            onClick={onReplayIntro}
            className="hover:text-gold-warm transition-colors uppercase tracking-widest cursor-pointer"
          >
            {c.replayIntro}
          </button>
          <span>•</span>
          <button
            onClick={toggle}
            className="hover:text-gold-warm transition-colors uppercase tracking-widest cursor-pointer"
          >
            {c.language}
          </button>
        </div>

        <p className="mt-8 text-xs text-ivory/60 tracking-wider">
          Design and Developed by{' '}
          <a
            href="https://piyush-portfolio-25.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#c5a059] hover:text-[#dfc07a] underline decoration-[#c5a059]/40 underline-offset-4 font-medium transition-colors"
          >
            Piyush
          </a>{' '}

        </p>
      </div>
    </footer>
  );
}
