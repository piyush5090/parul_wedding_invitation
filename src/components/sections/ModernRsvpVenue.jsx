'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import content from '@/content/content';
import { openWhatsAppRSVP, callRSVP } from '@/lib/whatsapp';
import { MAP_LINK } from '@/content/config';

export default function ModernRsvpVenue() {
  const { lang } = useLanguage();
  const cRsvp = content[lang].rsvp;
  const cVenue = content[lang].venue;

  const [name, setName] = useState('');
  const [blessing, setBlessing] = useState('');

  const handleWhatsApp = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    openWhatsAppRSVP({
      name: name.trim(),
      message: blessing.trim(),
      messageBuilder: cRsvp.whatsappMessage,
    });
  };

  return (
    <section id="rsvp" className="py-32 md:py-48 relative px-6 bg-[#0E0E10] border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-20 md:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 mb-3"
          >
            <span className="w-8 h-[1px] bg-gold-warm/60" />
            <span
              className="text-xs uppercase tracking-[0.35em] text-gold-warm font-light"
              style={{ fontFamily: 'var(--font-cormorant)' }}
            >
              {cRsvp.subheading}
            </span>
            <span className="w-8 h-[1px] bg-gold-warm/60" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl md:text-6xl font-serif text-ivory tracking-tight"
            style={{ fontFamily: lang === 'hi' ? 'var(--font-rozha)' : 'var(--font-cormorant)' }}
          >
            {cRsvp.heading} & {cVenue.heading}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
          
          {/* Venue & Couple Photo Banner */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 glass-modern rounded-3xl p-8 md:p-10 flex flex-col justify-between border border-white/10"
          >
            <div>
              <div className="relative w-full h-64 rounded-2xl overflow-hidden mb-8 border border-white/10">
                <Image
                  src="/images/couple/couple-05.jpg"
                  alt="Swarnabhoomi Venue"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="text-xs font-serif text-gold-warm tracking-wider uppercase block">
                    {lang === 'hi' ? 'विवाह स्थल' : 'The Destination'}
                  </span>
                  <span className="text-sm font-medium text-ivory">
                    Swarnabhoomi, Aligarh
                  </span>
                </div>
              </div>

              <h3
                className="text-2xl sm:text-3xl font-serif text-ivory mb-2"
                style={{ fontFamily: lang === 'hi' ? 'var(--font-rozha)' : 'var(--font-cormorant)' }}
              >
                {cVenue.name}
              </h3>
              <p className="text-ivory/70 text-sm leading-relaxed mb-8 font-light">
                {cVenue.address}
              </p>
            </div>

            <a
              href={MAP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 rounded-full border border-gold-warm/40 hover:border-gold-warm hover:bg-gold-warm/15 text-gold-warm font-medium text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                <circle cx="12" cy="9" r="2.5"/>
              </svg>
              {cVenue.mapButton}
            </a>
          </motion.div>

          {/* WhatsApp Blessings Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 glass-modern rounded-3xl p-8 md:p-10 border border-white/10 flex flex-col justify-between"
          >
            <form onSubmit={handleWhatsApp} className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-gold-warm mb-2.5 font-medium">
                  {cRsvp.nameLabel} *
                </label>
                <input
                  type="text"
                  required
                  placeholder={cRsvp.placeholderName}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-5 py-4 rounded-xl bg-white/[0.03] border border-white/10 text-ivory placeholder-ivory/30 focus:outline-none focus:border-gold-warm transition-colors text-sm"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-gold-warm mb-2.5 font-medium">
                  {cRsvp.messageLabel}
                </label>
                <textarea
                  rows={4}
                  placeholder={cRsvp.placeholderMessage}
                  value={blessing}
                  onChange={(e) => setBlessing(e.target.value)}
                  className="w-full px-5 py-4 rounded-xl bg-white/[0.03] border border-white/10 text-ivory placeholder-ivory/30 focus:outline-none focus:border-gold-warm transition-colors text-sm resize-none leading-relaxed"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  className="flex-1 py-4 px-6 rounded-full bg-[#c5a059] hover:bg-[#dfc07a] text-[#0e0e10] font-semibold text-xs tracking-widest uppercase active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-5.46-4.45-9.92-9.91-9.92z"/>
                  </svg>
                  {cRsvp.whatsappBtn}
                </button>

                <button
                  type="button"
                  onClick={callRSVP}
                  className="py-4 px-6 rounded-full border border-white/15 hover:border-gold-warm text-ivory/80 hover:text-gold-warm text-xs tracking-widest uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  {cRsvp.callBtn}
                </button>
              </div>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
