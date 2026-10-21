'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import content from '@/content/content';

const PHOTOS = [
  { src: '/images/couple/couple-06.jpg', alt: 'The Proposal', title: 'Ring Ceremony Moment', tag: 'Special' },
  { src: '/images/couple/couple-01.jpg', alt: 'Together in warmth', title: 'Together', tag: 'Portrait' },
  { src: '/images/couple/couple-09.jpg', alt: 'Celebration bouquet', title: 'Love & Joy', tag: 'Candid' },
  { src: '/images/couple/couple-10.jpg', alt: 'Smiling together', title: 'In Sync', tag: 'Smiles' },
  { src: '/images/couple/couple-04.jpg', alt: 'Cherished memories', title: 'Forever', tag: 'Celebration' },
  { src: '/images/couple/couple-05.jpg', alt: 'Ceremony stage', title: 'The Stage', tag: 'Memories' },
  { src: '/images/couple/couple-08.jpg', alt: 'Candid conversation', title: 'Quiet Talks', tag: 'Candid' },
  { src: '/images/couple/couple-02.jpg', alt: 'Wedding vibes', title: 'Joyful Hearts', tag: 'Vibe' },
];

export default function ModernGallery() {
  const { lang } = useLanguage();
  const c = content[lang].gallery;
  const [activePhoto, setActivePhoto] = useState(null);

  return (
    <section id="gallery" className="py-32 md:py-48 relative px-6 bg-[#121215] border-t border-white/5">
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
              {lang === 'hi' ? 'स्मृतियों की गैलरी' : 'Visual Diary'}
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
            {c.heading}
          </motion.h2>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {PHOTOS.map((photo, i) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setActivePhoto(photo)}
              className={`group relative overflow-hidden rounded-3xl cursor-pointer border border-white/10 bg-[#18181C] shadow-lg ${
                i === 0 || i === 2 ? 'row-span-2 min-h-[420px]' : 'min-h-[240px]'
              }`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-between text-xs text-ivory">
                <span className="font-serif tracking-wide text-sm">{photo.title}</span>
                <span className="text-[10px] uppercase tracking-wider text-gold-warm bg-black/60 px-2.5 py-1 rounded-full border border-white/10">
                  {photo.tag}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePhoto(null)}
            className="fixed inset-0 z-[100000] bg-black/95 backdrop-blur-md flex items-center justify-center p-6 cursor-zoom-out"
          >
            <div className="relative max-w-4xl max-h-[90vh] w-full h-[80vh]">
              <Image
                src={activePhoto.src}
                alt={activePhoto.alt}
                fill
                className="object-contain"
              />
            </div>
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white p-3 text-2xl font-light cursor-pointer"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
