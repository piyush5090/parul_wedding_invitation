'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import content from '@/content/content';
import { WEDDING_DATE } from '@/content/config';

export default function ModernCountdown() {
  const { lang } = useLanguage();
  const c = content[lang].countdown;
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });

  useEffect(() => {
    setMounted(true);
    const calculateTime = () => {
      const diff = WEDDING_DATE - new Date();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
        isPast: false,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const units = [
    { label: c.days, value: timeLeft.days },
    { label: c.hours, value: timeLeft.hours },
    { label: c.minutes, value: timeLeft.minutes },
    { label: c.seconds, value: timeLeft.seconds },
  ];

  return (
    <section className="py-28 md:py-36 relative px-6 border-y border-white/5 bg-[#0A0A0C]">
      <div className="max-w-4xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-[0.35em] text-gold-warm mb-4"
          style={{ fontFamily: 'var(--font-cormorant)' }}
        >
          {lang === 'hi' ? 'विवाह तक का समय' : 'Counting Down To The Big Day'}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-serif text-ivory mb-14 tracking-tight"
          style={{ fontFamily: lang === 'hi' ? 'var(--font-rozha)' : 'var(--font-cormorant)' }}
        >
          {c.heading}
        </motion.h2>

        {!mounted ? (
          <div className="h-32 flex items-center justify-center text-ivory/40">...</div>
        ) : timeLeft.isPast ? (
          <p className="text-gold-warm text-2xl font-serif">{c.past}</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 max-w-3xl mx-auto">
            {units.map((unit, i) => (
              <motion.div
                key={unit.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-modern rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center border border-white/5"
              >
                <span
                  className="text-4xl sm:text-5xl md:text-6xl font-serif shimmer-gold font-light mb-2 tabular-nums"
                  style={{ fontFamily: 'var(--font-cormorant)' }}
                >
                  {String(unit.value).padStart(2, '0')}
                </span>
                <span
                  className="text-xs uppercase tracking-[0.2em] text-ivory/50"
                  style={{ fontFamily: lang === 'hi' ? 'var(--font-hind)' : 'var(--font-lora)' }}
                >
                  {unit.label}
                </span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
