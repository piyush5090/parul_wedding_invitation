'use client';
import { useLanguage } from '@/hooks/useLanguage';

export default function ModernNavbar() {
  const { lang, toggle } = useLanguage();

  return (
    <header className="absolute top-10 left-0 right-0 z-30 px-2 sm:px-6 pt-9 min-[380px]:pt-11 sm:pt-14 md:pt-16 pb-4 flex items-center justify-center bg-gradient-to-b from-[#0D0C10]/95 via-[#0D0C10]/65 to-transparent pointer-events-none select-none">

      {/* Sacred Invocation with Shree Ganeshaya Namah and 2-line mobile Shloka */}
      <div className="flex flex-col items-center justify-center gap-1 min-[380px]:gap-1.5 max-w-[98vw] pointer-events-auto text-center">
        {/* Line 1: Shree Ganeshaya Namah */}
        <div className="flex items-center justify-center gap-2">
          <span
            className="text-gold-warm text-xs sm:text-sm md:text-base drop-shadow-[0_0_8px_rgba(212,175,55,0.6)] leading-none select-none"
            aria-hidden="true"
          >
            卐
          </span>
          <span
            className="text-xs sm:text-sm md:text-base font-serif tracking-widest text-[#dfc07a] font-medium select-none"
            style={{ fontFamily: 'var(--font-rozha, serif)' }}
          >
            ॥ श्री गणेशाय नमः ॥
          </span>
          <span
            className="text-gold-warm text-xs sm:text-sm md:text-base drop-shadow-[0_0_8px_rgba(212,175,55,0.6)] leading-none select-none"
            aria-hidden="true"
          >
            卐
          </span>
        </div>

        {/* Line 2: Shloka (two lines on mobile, single or clean block on larger screens) */}
        <h2
          className="text-[10px] min-[360px]:text-[11px] sm:text-xs md:text-sm font-serif tracking-wide sm:tracking-wider shimmer-gold font-medium select-none text-center leading-relaxed"
          style={{ fontFamily: 'var(--font-rozha, serif)' }}
        >
          <span className="block sm:inline">वक्रतुण्ड महाकाय सूर्यकोटि समप्रभः ।</span>{' '}
          <span className="block sm:inline">निर्विघ्नं कुरुमेदेव सर्व कार्येषु सर्वदा ॥</span>
        </h2>
      </div>

      {/* Floating subtle language toggle in top corner */}
      <div className="absolute right-3 sm:right-6 top-4 sm:top-6 pointer-events-auto hidden md:block">
        <button
          onClick={toggle}
          aria-label="Toggle Language"
          className="px-3 py-1 rounded-full border border-white/10 hover:border-gold-warm/40 bg-white/[0.03] text-[11px] text-ivory/60 hover:text-gold-warm font-medium tracking-wider transition-all cursor-pointer"
        >
          {lang === 'en' ? 'हिन्दी' : 'English'}
        </button>
      </div>

    </header>
  );
}
