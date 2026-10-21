'use client';
import { useLanguage } from '@/hooks/useLanguage';
import content from '@/content/content';
import { motion } from 'framer-motion';
import OrnamentalDivider from '@/components/ui/OrnamentalDivider';

const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function BlessingsSection() {
  const { lang } = useLanguage();
  const c = content[lang].blessings;

  return (
    <section id="blessings" className="section py-20 md:py-28"
      style={{ background: 'linear-gradient(180deg, #5A0F1B 0%, #3d0a12 100%)' }}
    >
      <div className="max-w-3xl mx-auto px-6 text-center">

        {/* Ganesh invocation */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
        >
          <p className="text-gold text-lg md:text-xl tracking-widest mb-3"
            style={{ fontFamily: 'var(--font-hind)' }}>
            {c.ganesh}
          </p>

          {/* Ganesh SVG icon */}
          <div className="flex justify-center mb-6" aria-hidden="true">
            <GaneshIcon />
          </div>

          <p className="text-ivory/70 text-sm md:text-base leading-relaxed italic whitespace-pre-line"
            style={{ fontFamily: lang === 'hi' ? 'var(--font-hind)' : 'var(--font-lora)' }}>
            {c.shlok}
          </p>
        </motion.div>

        <OrnamentalDivider variant="lotus" className="my-8" />

        {/* Vishnu mangalam shlok */}
        <motion.p
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="text-ivory/60 text-sm leading-relaxed italic whitespace-pre-line mb-8"
          style={{ fontFamily: lang === 'hi' ? 'var(--font-hind)' : 'var(--font-lora)' }}
        >
          {c.vishnu}
        </motion.p>

        {/* Invite copy */}
        <motion.p
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="text-ivory/80 text-base md:text-lg leading-relaxed mb-12"
          style={{ fontFamily: lang === 'hi' ? 'var(--font-hind)' : 'var(--font-lora)', lineHeight: lang === 'hi' ? '1.8' : '1.7' }}
        >
          {c.invite}
        </motion.p>

        <OrnamentalDivider variant="simple" />

        {/* Bride block */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="mt-10 space-y-1"
        >
          <p className="text-gold/60 text-xs tracking-[0.3em] uppercase"
            style={{ fontFamily: 'var(--font-cormorant)' }}>{c.bride.title}</p>
          <p className="shimmer-text text-2xl md:text-3xl"
            style={{ fontFamily: lang === 'hi' ? 'var(--font-rozha)' : 'var(--font-cormorant)', fontWeight: 600 }}>
            {c.bride.name}
          </p>
          <p className="text-ivory/50 text-xs tracking-wide"
            style={{ fontFamily: lang === 'hi' ? 'var(--font-hind)' : 'var(--font-lora)' }}>
            {c.bride.granddaughter}: {c.bride.grandparents}
          </p>
          <p className="text-ivory/50 text-xs tracking-wide"
            style={{ fontFamily: lang === 'hi' ? 'var(--font-hind)' : 'var(--font-lora)' }}>
            {c.bride.daughter}: {c.bride.parents}
          </p>
        </motion.div>

        {/* Sang icon */}
        <div className="flex justify-center my-8" aria-hidden="true">
          <svg width="80" height="40" viewBox="0 0 80 40" fill="none">
            <path d="M20,20 Q30,5 40,20 Q50,35 60,20" stroke="#C9A24B" strokeWidth="1.5" fill="none"/>
            <circle cx="20" cy="20" r="4" fill="#C9A24B" opacity="0.7"/>
            <circle cx="60" cy="20" r="4" fill="#C9A24B" opacity="0.7"/>
            <path d="M38,14 L40,20 L42,14" stroke="#F28C28" strokeWidth="1" fill="none"/>
            <text x="40" y="38" textAnchor="middle" fontSize="9"
              fill="#C9A24B" opacity="0.7" style={{ fontFamily: 'serif' }}>संग</text>
          </svg>
        </div>

        {/* Groom block */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="space-y-1"
        >
          <p className="text-gold/60 text-xs tracking-[0.3em] uppercase"
            style={{ fontFamily: 'var(--font-cormorant)' }}>{c.groom.title}</p>
          <p className="shimmer-text text-2xl md:text-3xl"
            style={{ fontFamily: lang === 'hi' ? 'var(--font-rozha)' : 'var(--font-cormorant)', fontWeight: 600 }}>
            {c.groom.name}
          </p>
          <p className="text-ivory/50 text-xs tracking-wide"
            style={{ fontFamily: lang === 'hi' ? 'var(--font-hind)' : 'var(--font-lora)' }}>
            {c.groom.grandson}: {c.groom.grandparents}
          </p>
          <p className="text-ivory/50 text-xs tracking-wide"
            style={{ fontFamily: lang === 'hi' ? 'var(--font-hind)' : 'var(--font-lora)' }}>
            {c.groom.son}: {c.groom.parents}
          </p>
        </motion.div>

        <OrnamentalDivider variant="paisley" className="mt-10" />

        <motion.p
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="text-ivory/70 text-sm md:text-base mt-2"
          style={{ fontFamily: lang === 'hi' ? 'var(--font-hind)' : 'var(--font-lora)', lineHeight: lang === 'hi' ? '1.8' : '1.7' }}
        >
          {c.closing}
        </motion.p>
      </div>
    </section>
  );
}

function GaneshIcon() {
  return (
    <svg width="60" height="70" viewBox="0 0 60 70" fill="none" opacity="0.7">
      {/* Simple stylised Ganesha silhouette */}
      {/* Head */}
      <ellipse cx="30" cy="22" rx="16" ry="18" fill="none" stroke="#C9A24B" strokeWidth="1.2"/>
      {/* Trunk curling right */}
      <path d="M36,34 Q50,40 46,52 Q44,58 40,56" stroke="#C9A24B" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      {/* Left ear */}
      <ellipse cx="16" cy="22" rx="8" ry="11" fill="none" stroke="#C9A24B" strokeWidth="1"/>
      {/* Right ear */}
      <ellipse cx="44" cy="22" rx="8" ry="11" fill="none" stroke="#C9A24B" strokeWidth="1"/>
      {/* Eyes */}
      <circle cx="25" cy="18" r="2.5" fill="none" stroke="#C9A24B" strokeWidth="1"/>
      <circle cx="35" cy="18" r="2.5" fill="none" stroke="#C9A24B" strokeWidth="1"/>
      {/* Tilak */}
      <circle cx="30" cy="14" r="2" fill="#F28C28" opacity="0.8"/>
      {/* Body */}
      <ellipse cx="30" cy="54" rx="14" ry="12" fill="none" stroke="#C9A24B" strokeWidth="1"/>
      {/* Crown */}
      <path d="M20,8 L30,2 L40,8" stroke="#C9A24B" strokeWidth="1" fill="none"/>
      <circle cx="30" cy="2" r="2.5" fill="#C9A24B" opacity="0.7"/>
    </svg>
  );
}
