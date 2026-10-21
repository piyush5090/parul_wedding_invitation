'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import content from '@/content/content';
import { WEDDING_DATE } from '@/content/config';

const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function CountdownSection() {
  const { lang } = useLanguage();
  const c = content[lang].countdown;
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const calc = () => {
      const diff = WEDDING_DATE - new Date();
      if (diff <= 0) { setTimeLeft(null); return; }
      setTimeLeft({
        days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, []);

  const units = timeLeft
    ? [
        { label: c.days,    value: timeLeft.days },
        { label: c.hours,   value: timeLeft.hours },
        { label: c.minutes, value: timeLeft.minutes },
        { label: c.seconds, value: timeLeft.seconds },
      ]
    : [];

  return (
    <section id="countdown" className="section py-20 md:py-28 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #3d0a12 0%, #5A0F1B 100%)' }}
    >
      {/* Rangoli border top */}
      <RangoliBorder />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.p
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="text-gold/60 text-xs tracking-[0.35em] uppercase mb-4"
          style={{ fontFamily: 'var(--font-cormorant)' }}
        >
          {lang === 'hi' ? 'विवाह तक' : 'until the wedding'}
        </motion.p>

        <motion.h2
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="text-2xl md:text-4xl text-ivory mb-12"
          style={{ fontFamily: lang === 'hi' ? 'var(--font-rozha)' : 'var(--font-cormorant)', fontWeight: 600 }}
        >
          {c.heading}
        </motion.h2>

        {timeLeft === null ? (
          <motion.p
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-gold text-2xl"
            style={{ fontFamily: lang === 'hi' ? 'var(--font-rozha)' : 'var(--font-cormorant)' }}
          >
            {c.past}
          </motion.p>
        ) : (
          <div className="flex justify-center gap-4 md:gap-8 flex-wrap">
            {units.map((unit, i) => (
              <motion.div
                key={unit.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="flex flex-col items-center"
              >
                {/* Glowing numeral card */}
                <div
                  className="relative w-20 h-20 md:w-28 md:h-28 rounded-xl flex items-center justify-center mb-2"
                  style={{
                    background: 'linear-gradient(135deg, rgba(90,15,27,0.8), rgba(61,10,18,0.9))',
                    border: '1px solid rgba(201,162,75,0.35)',
                    boxShadow: '0 0 20px rgba(201,162,75,0.15), inset 0 1px 0 rgba(255,255,255,0.05)',
                  }}
                >
                  {/* Corner accents */}
                  {['top-1 left-1', 'top-1 right-1', 'bottom-1 left-1', 'bottom-1 right-1'].map((pos, j) => (
                    <span key={j} className={`absolute ${pos} w-2 h-2 border-gold/40 ${j < 2 ? 'border-t' : 'border-b'} ${j % 2 === 0 ? 'border-l' : 'border-r'}`}/>
                  ))}
                  <span
                    className="countdown-digit shimmer-text text-4xl md:text-5xl font-bold"
                    style={{ fontFamily: 'var(--font-cormorant)' }}
                  >
                    {String(unit.value).padStart(2, '0')}
                  </span>
                </div>
                <span
                  className="text-xs md:text-sm text-ivory/50 tracking-widest uppercase"
                  style={{ fontFamily: lang === 'hi' ? 'var(--font-hind)' : 'var(--font-lora)' }}
                >
                  {unit.label}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Rangoli border bottom (flipped) */}
      <RangoliBorder flip />
    </section>
  );
}

/** Decorative rangoli border SVG */
function RangoliBorder({ flip = false }) {
  return (
    <div
      className="w-full overflow-hidden pointer-events-none absolute left-0"
      style={{ top: flip ? 'auto' : 0, bottom: flip ? 0 : 'auto', transform: flip ? 'scaleY(-1)' : 'none' }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 1440 24" fill="none" preserveAspectRatio="none" style={{ width: '100%', height: '24px' }}>
        <path
          d="M0,12 Q90,0 180,12 Q270,24 360,12 Q450,0 540,12 Q630,24 720,12 Q810,0 900,12 Q990,24 1080,12 Q1170,0 1260,12 Q1350,24 1440,12"
          stroke="#C9A24B"
          strokeWidth="0.8"
          strokeOpacity="0.4"
          fill="none"
        />
        {[90,270,450,630,810,990,1170,1350].map((cx) => (
          <circle key={cx} cx={cx} cy="12" r="2" fill="#C9A24B" opacity="0.35"/>
        ))}
      </svg>
    </div>
  );
}
