'use client';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import content from '@/content/content';

const CARDS = [
  { src: '/images/invitation-card/card-front.jpg',  alt: 'Invitation Card Front' },
  { src: '/images/invitation-card/card-events.jpg', alt: 'Invitation Card Events' },
  { src: '/images/invitation-card/card-inner.jpg',  alt: 'Invitation Card Inner' },
];

export default function InvitationCardSection() {
  const { lang } = useLanguage();
  const c = content[lang].card;
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const cardRef = useRef(null);

  // 3D tilt
  const rotY = useMotionValue(0);
  const rotX = useMotionValue(0);
  const shadowX = useTransform(rotY, [-15, 15], ['-8px', '8px']);
  const shadowY = useTransform(rotX, [-15, 15], ['8px', '-8px']);

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
    const y = -((e.clientY - rect.top) / rect.height - 0.5) * 30;
    rotY.set(x);
    rotX.set(y);
  };
  const handleMouseLeave = () => { rotY.set(0); rotX.set(0); };

  const download = () => {
    const a = document.createElement('a');
    a.href = CARDS[active].src;
    a.download = `parul-shubham-invitation-${active + 1}.jpg`;
    a.click();
  };

  return (
    <section id="invitation-card" className="section py-20 md:py-28"
      style={{ background: 'linear-gradient(180deg, #5A0F1B 0%, #3d0a12 100%)' }}
    >
      <div className="max-w-2xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-3xl md:text-5xl text-ivory mb-2"
          style={{ fontFamily: lang === 'hi' ? 'var(--font-rozha)' : 'var(--font-cormorant)', fontWeight: 600 }}
        >
          {c.heading}
        </motion.h2>
        <p className="text-ivory/40 text-xs mb-10 tracking-widest"
          style={{ fontFamily: 'var(--font-cormorant)' }}>{c.pinchHint}</p>

        {/* 3D tilting card */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateY: rotY,
            rotateX: rotX,
            transformPerspective: 1200,
            boxShadow: `${shadowX.get()} ${shadowY.get()} 40px rgba(0,0,0,0.6)`,
          }}
          className="relative mx-auto cursor-pointer"
          onClick={() => setLightbox(active)}
          whileTap={{ scale: 0.97 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35 }}
              className="relative w-full aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden border border-gold/30"
              style={{ maxWidth: 420, margin: '0 auto' }}
            >
              <Image
                src={CARDS[active].src}
                alt={CARDS[active].alt}
                fill
                className="object-contain bg-ivory"
                sizes="(max-width:768px) 90vw, 420px"
                priority={active === 0}
              />
              {/* Gold foil shimmer overlay */}
              <div className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, transparent 40%, rgba(201,162,75,0.06) 50%, transparent 60%)',
                  backgroundSize: '200% 200%',
                  animation: 'shimmer 3s linear infinite',
                }}
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Thumbnails */}
        <div className="flex justify-center gap-3 mt-6 mb-8">
          {CARDS.map((card, i) => (
            <button
              key={i}
              aria-label={`View card ${i + 1}`}
              onClick={() => setActive(i)}
              className={`relative w-14 h-14 rounded-lg overflow-hidden border transition-all ${
                active === i ? 'border-gold shadow-gold scale-110' : 'border-gold/20 opacity-60 hover:opacity-80'
              }`}
            >
              <Image src={card.src} alt={card.alt} fill className="object-cover" sizes="56px"/>
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-4 flex-wrap">
          <button
            onClick={download}
            aria-label={c.download}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gold text-maroon-dark font-semibold text-sm hover:bg-gold-light transition-colors"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            <DownloadIcon />
            {c.download}
          </button>
          <button
            onClick={() => setLightbox(active)}
            aria-label="View fullscreen"
            className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-gold/40 text-gold text-sm hover:bg-gold/10 transition-colors"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            <ExpandIcon />
            {lang === 'hi' ? 'पूर्ण स्क्रीन' : 'Fullscreen'}
          </button>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Card fullscreen view"
          >
            <motion.div
              className="relative max-w-lg w-[90vw] max-h-[90vh]"
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={CARDS[lightbox].src}
                alt={CARDS[lightbox].alt}
                width={600}
                height={700}
                className="object-contain rounded-xl"
                style={{ width: '100%', height: 'auto', maxHeight: '85vh' }}
              />
              {/* Nav arrows */}
              {lightbox > 0 && (
                <button
                  onClick={() => setLightbox(lightbox - 1)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-2 text-white"
                  aria-label="Previous card"
                >‹</button>
              )}
              {lightbox < CARDS.length - 1 && (
                <button
                  onClick={() => setLightbox(lightbox + 1)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-2 text-white"
                  aria-label="Next card"
                >›</button>
              )}
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-4 -right-4 bg-maroon rounded-full w-9 h-9 flex items-center justify-center text-gold border border-gold/40 text-lg"
                aria-label="Close lightbox"
              >×</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7 1v8M4 7l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M1 11v1a1 1 0 001 1h10a1 1 0 001-1v-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M9 1h4v4M5 13H1V9M13 5l-4 4M1 9l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}
