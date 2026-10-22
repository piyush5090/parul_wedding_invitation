'use client';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import content from '@/content/content';
import { MAP_LINK, RSVP_PHONE } from '@/content/config';
import { callRSVP } from '@/lib/whatsapp';

// Dynamic client-only import of Three.js canvas to avoid hydration mismatch
const WelcomeThreeCanvas = dynamic(
  () => import('@/components/three/WelcomeThreeCanvas'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex flex-col items-center justify-center min-h-[340px] sm:min-h-[400px]">
        <div className="w-9 h-9 rounded-full border-2 border-[#c5a059]/30 border-t-[#c5a059] animate-spin" />
        <span className="text-[11px] tracking-widest text-[#c5a059] uppercase mt-3">
          Loading Sacred Kalash...
        </span>
      </div>
    ),
  }
);

export default function ModernRsvpVenue() {
  const { lang } = useLanguage();
  const cWelcome = content[lang].welcome;
  const isHindi = lang === 'hi';

  const headingFont = isHindi ? 'var(--font-rozha)' : 'var(--font-cormorant)';
  const bodyFont = isHindi ? 'var(--font-hind)' : 'var(--font-lora)';

  return (
    <section
      id="welcome"
      className="py-24 sm:py-32 md:py-44 relative px-4 sm:px-6 bg-[#0E0E10] border-t border-white/5 overflow-hidden"
    >
      {/* Background ambient radial glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-radial from-[#c5a059]/8 via-transparent to-transparent pointer-events-none blur-3xl"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* ─── 1. Section Header ─── */}
        <div className="text-center mb-14 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 mb-3"
          >
            <span className="w-6 sm:w-10 h-[1px] bg-gold-warm/60" />
            <span
              className="text-[11px] sm:text-xs uppercase tracking-[0.32em] text-gold-warm font-light"
              style={{ fontFamily: 'var(--font-cormorant)' }}
            >
              {cWelcome.eyebrow}
            </span>
            <span className="w-6 sm:w-10 h-[1px] bg-gold-warm/60" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-ivory tracking-tight mb-4"
            style={{ fontFamily: headingFont }}
          >
            {cWelcome.heading}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-ivory/70 text-sm sm:text-base italic max-w-xl mx-auto font-light"
            style={{ fontFamily: bodyFont }}
          >
            {cWelcome.subheading}
          </motion.p>
        </div>

        {/* ─── 2. Main Two-Column Layout ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">

          {/* ── Left Column: 3D Interactive Altar Card (5 cols on lg) ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 glass-modern rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-white/10 shadow-[0_12px_45px_rgba(0,0,0,0.6)] relative overflow-hidden group"
          >
            {/* Top Sheen */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#c5a059]/40 to-transparent" />

            {/* Card Header */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-2">
              <div className="inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#c5a059] animate-pulse" />
                <span
                  className="text-xs uppercase tracking-widest text-[#dfc07a] font-medium"
                  style={{ fontFamily: headingFont }}
                >
                  {cWelcome.threeTitle}
                </span>
              </div>
              <span className="text-[10px] uppercase tracking-wider text-ivory/40 font-mono">
                3D Interactive
              </span>
            </div>

            {/* 3D Canvas Container */}
            <div className="relative w-full h-[320px] sm:h-[380px] my-auto flex items-center justify-center">
              <WelcomeThreeCanvas />
            </div>

            {/* Card Footer Hint */}
            <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-ivory/50">
              <span className="flex items-center gap-2">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-[#c5a059]"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v8M8 12h8" />
                </svg>
                {cWelcome.threeHint}
              </span>
              <span className="text-gold-warm/80 font-serif text-xs">॥ श्रीः ॥</span>
            </div>
          </motion.div>

          {/* ── Right Column: Warm Hospitality & Venue Cards (7 cols on lg) ── */}
          <div className="lg:col-span-7 flex flex-col gap-6 sm:gap-8 justify-between">

            {/* Card 1: Warm Welcome Message & Hosts */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="glass-modern rounded-3xl p-6 sm:p-8 md:p-9 border border-white/10 shadow-[0_12px_45px_rgba(0,0,0,0.6)] relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#c5a059]/40 to-transparent" />

              {/* Sanskrit Quote */}
              <div className="mb-4 inline-block px-4 py-1.5 rounded-full bg-[#c5a059]/10 border border-[#c5a059]/30">
                <span
                  className="text-xs sm:text-sm text-[#dfc07a] font-serif tracking-wide italic"
                  style={{ fontFamily: headingFont }}
                >
                  {cWelcome.quote}
                </span>
              </div>

              {/* Heartfelt Message */}
              <p
                className="text-ivory/85 text-sm sm:text-base leading-relaxed font-light mb-6"
                style={{ fontFamily: bodyFont }}
              >
                {cWelcome.message}
              </p>

              {/* Decorative Divider */}
              <div className="flex items-center gap-3 my-5">
                <span className="h-[1px] flex-1 bg-white/10" />
                <span className="text-gold-warm text-xs">✦</span>
                <span className="h-[1px] flex-1 bg-white/10" />
              </div>

              {/* Welcoming Hosts / स्वागताकांक्षी */}
              <div>
                <span
                  className="text-xs uppercase tracking-[0.25em] text-gold-warm font-medium block mb-3.5"
                  style={{ fontFamily: headingFont }}
                >
                  {cWelcome.hostsTitle}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3.5">
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-[10px] uppercase tracking-wider text-gold-warm/80 font-mono block mb-1">
                      {cWelcome.hostsBrideLabel}
                    </span>
                    <p className="text-xs sm:text-sm text-ivory/90 font-light">
                      {cWelcome.hostsBride}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-[10px] uppercase tracking-wider text-gold-warm/80 font-mono block mb-1">
                      {cWelcome.hostsGroomLabel}
                    </span>
                    <p className="text-xs sm:text-sm text-ivory/90 font-light">
                      {cWelcome.hostsGroom}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-ivory/60 italic font-light">
                  ✦ {cWelcome.hostsAll}
                </p>
              </div>
            </motion.div>

            {/* Card 2: Destination Venue & Directions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="glass-modern rounded-3xl p-6 sm:p-8 border border-white/10 shadow-[0_12px_45px_rgba(0,0,0,0.6)] relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#c5a059]/40 to-transparent" />

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Photo thumbnail */}
                <div className="md:col-span-5 relative h-36 md:h-40 rounded-2xl overflow-hidden border border-white/10 shadow-md">
                  <Image
                    src="/images/couple/couple-05.jpg"
                    alt="Swarnabhoomi Venue"
                    fill
                    sizes="(max-width: 768px) 100vw, 30vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#dfc07a] block">
                      {cWelcome.venueTitle}
                    </span>
                    <span className="text-xs font-serif text-ivory font-medium">
                      {cWelcome.venueSubtitle}
                    </span>
                  </div>
                </div>

                {/* Venue Info & Buttons */}
                <div className="md:col-span-7 flex flex-col justify-between h-full">
                  <div>
                    <h3
                      className="text-xl sm:text-2xl font-serif text-ivory mb-1"
                      style={{ fontFamily: headingFont }}
                    >
                      {cWelcome.venueSubtitle}
                    </h3>
                    <p className="text-ivory/70 text-xs sm:text-sm leading-relaxed mb-4 font-light">
                      {cWelcome.venueAddress}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={MAP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 px-5 rounded-full bg-[#c5a059] hover:bg-[#dfc07a] text-[#0e0e10] font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg active:scale-[0.98]"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                      >
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                        <circle cx="12" cy="9" r="2.5" />
                      </svg>
                      {cWelcome.mapButton}
                    </a>

                    {RSVP_PHONE && (
                      <button
                        type="button"
                        onClick={callRSVP}
                        className="py-3 px-5 rounded-full border border-white/15 hover:border-gold-warm text-ivory/80 hover:text-gold-warm text-xs tracking-wider uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                        {cWelcome.callButton}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* ─── 3. Auspicious Bottom Divider ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 sm:mt-24 text-center flex items-center justify-center gap-3 text-gold-warm/60"
        >
          <span className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-transparent to-gold-warm/40" />
          <span
            className="text-xs sm:text-sm font-serif tracking-widest text-[#dfc07a] uppercase"
            style={{ fontFamily: headingFont }}
          >
            {isHindi ? '॥ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः ॥' : 'Warmly Welcoming You in Aligarh'}
          </span>
          <span className="w-12 sm:w-20 h-[1px] bg-gradient-to-l from-transparent to-gold-warm/40" />
        </motion.div>

      </div>
    </section>
  );
}
