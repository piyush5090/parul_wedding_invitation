'use client';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import content from '@/content/content';

export default function ModernBlessings() {
  const { lang } = useLanguage();
  const c = content[lang].blessings;

  return (
    <section id="blessings" className="py-32 md:py-48 relative px-6 border-t border-white/5 bg-[#0E0E10]">
      <div className="max-w-4xl mx-auto text-center">
        
        {/* Sacred Sanskrit Invocation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-gold-warm/60" />
            <p
              className="text-xs uppercase tracking-[0.35em] text-gold-warm font-medium"
              style={{ fontFamily: 'var(--font-hind)' }}
            >
              {c.ganesh}
            </p>
            <span className="w-8 h-[1px] bg-gold-warm/60" />
          </div>

          <p
            className="text-ivory/80 text-sm md:text-base leading-relaxed italic max-w-xl mx-auto whitespace-pre-line"
            style={{ fontFamily: lang === 'hi' ? 'var(--font-hind)' : 'var(--font-lora)' }}
          >
            {c.shlok}
          </p>
        </motion.div>

        {/* Invitation Message */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-ivory/90 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto mb-20"
          style={{ fontFamily: lang === 'hi' ? 'var(--font-hind)' : 'var(--font-lora)' }}
        >
          {c.invite}
        </motion.p>

        {/* Modern Lineage Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 text-left">
          
          {/* Bride's Family */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-modern rounded-3xl p-8 md:p-10 border border-white/10"
          >
            <span className="text-xs uppercase tracking-[0.25em] text-gold-warm block mb-2 font-medium">
              {c.bride.title}
            </span>
            <h3
              className="text-2xl md:text-3xl font-serif text-ivory mb-5"
              style={{ fontFamily: lang === 'hi' ? 'var(--font-rozha)' : 'var(--font-cormorant)' }}
            >
              {c.bride.name}
            </h3>
            <div className="space-y-4 text-xs md:text-sm text-ivory/70 font-light">
              <p>
                <span className="text-gold-warm/90 font-normal block mb-0.5">{c.bride.granddaughter}:</span>
                {c.bride.grandparents}
              </p>
              <p>
                <span className="text-gold-warm/90 font-normal block mb-0.5">{c.bride.daughter}:</span>
                {c.bride.parents}
              </p>
            </div>
          </motion.div>

          {/* Groom's Family */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-modern rounded-3xl p-8 md:p-10 border border-white/10"
          >
            <span className="text-xs uppercase tracking-[0.25em] text-gold-warm block mb-2 font-medium">
              {c.groom.title}
            </span>
            <h3
              className="text-2xl md:text-3xl font-serif text-ivory mb-5"
              style={{ fontFamily: lang === 'hi' ? 'var(--font-rozha)' : 'var(--font-cormorant)' }}
            >
              {c.groom.name}
            </h3>
            <div className="space-y-4 text-xs md:text-sm text-ivory/70 font-light">
              <p>
                <span className="text-gold-warm/90 font-normal block mb-0.5">{c.groom.grandson}:</span>
                {c.groom.grandparents}
              </p>
              <p>
                <span className="text-gold-warm/90 font-normal block mb-0.5">{c.groom.son}:</span>
                {c.groom.parents}
              </p>
            </div>
          </motion.div>

        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-ivory/50 text-xs md:text-sm mt-16 italic tracking-wide"
        >
          {c.closing}
        </motion.p>

      </div>
    </section>
  );
}
