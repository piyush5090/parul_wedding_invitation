'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import content from '@/content/content';

const PHOTOS = [
  { src: '/images/gallery/gallery-01.jpg', alt: 'Parul & Shubham together',   aspect: '3/4' },
  { src: '/images/gallery/gallery-02.jpg', alt: 'Ring exchange moment',        aspect: '3/4' },
  { src: '/images/gallery/gallery-03.jpg', alt: 'At the ceremony',             aspect: '16/9' },
  { src: '/images/gallery/gallery-04.jpg', alt: 'Ring ceremony kneeling',      aspect: '3/4' },
  { src: '/images/gallery/gallery-05.jpg', alt: 'Full portrait',               aspect: '3/4' },
  { src: '/images/gallery/gallery-06.jpg', alt: 'Laughing together',           aspect: '3/4' },
];

export default function GallerySection() {
  const { lang } = useLanguage();
  const c = content[lang].gallery;
  const [lightbox, setLightbox] = useState(null);

  return (
    <section id="gallery" className="section py-20 md:py-28"
      style={{ background: '#2a0608' }}
    >
      <div className="max-w-5xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-3xl md:text-5xl text-ivory text-center mb-12"
          style={{ fontFamily: lang === 'hi' ? 'var(--font-rozha)' : 'var(--font-cormorant)', fontWeight: 600 }}
        >
          {c.heading}
        </motion.h2>

        {/* Masonry grid */}
        <div className="columns-2 md:columns-3 gap-3 space-y-3">
          {PHOTOS.map((photo, i) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.07 }}
              className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-xl border border-gold/10 hover:border-gold/40 transition-all"
              onClick={() => setLightbox(i)}
              style={{ aspectRatio: photo.aspect }}
              whileHover={{ scale: 1.02 }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width:768px) 46vw, 31vw"
              />
              {/* Ken Burns shimmer overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-maroon/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {/* Expand icon */}
              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-8 h-8 rounded-full bg-black/50 flex items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M8 1h3v3M4 11H1V8M11 4l-4 4M1 8l4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
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
            aria-label="Gallery lightbox"
          >
            <motion.div
              className="relative max-w-2xl w-[92vw]"
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={PHOTOS[lightbox].src}
                alt={PHOTOS[lightbox].alt}
                width={800}
                height={900}
                className="object-contain rounded-xl"
                style={{ width: '100%', height: 'auto', maxHeight: '88vh' }}
              />
              {lightbox > 0 && (
                <button
                  onClick={() => setLightbox(lightbox - 1)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 rounded-full w-10 h-10 flex items-center justify-center text-white text-xl"
                  aria-label="Previous photo"
                >‹</button>
              )}
              {lightbox < PHOTOS.length - 1 && (
                <button
                  onClick={() => setLightbox(lightbox + 1)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 rounded-full w-10 h-10 flex items-center justify-center text-white text-xl"
                  aria-label="Next photo"
                >›</button>
              )}
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-4 -right-4 bg-maroon rounded-full w-9 h-9 flex items-center justify-center text-gold border border-gold/40 text-lg"
                aria-label="Close"
              >×</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
