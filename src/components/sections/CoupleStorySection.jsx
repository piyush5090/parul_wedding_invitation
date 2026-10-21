'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/hooks/useLanguage';
import content from '@/content/content';

export default function CoupleStorySection() {
  const { lang } = useLanguage();
  const c = content[lang].couple;

  return (
    <section id="our-story" className="py-32 md:py-48 relative px-6 border-t border-white/5 bg-[#121215] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Title */}
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
              {lang === 'hi' ? 'हमारा प्रेम प्रसंग' : 'Two Souls, One Journey'}
            </span>
            <span className="w-8 h-[1px] bg-gold-warm/60" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-serif text-ivory tracking-tight"
            style={{ fontFamily: lang === 'hi' ? 'var(--font-rozha)' : 'var(--font-cormorant)' }}
          >
            {lang === 'hi' ? 'मिलिए वर एवं वधू से' : 'Meet the Bride & Groom'}
          </motion.h2>
        </div>

        {/* Bride & Groom Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-stretch">
          
          {/* Bride Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-modern rounded-3xl p-8 sm:p-10 flex flex-col group transition-all duration-500 border border-white/10"
          >
            <div className="relative w-full h-80 sm:h-[400px] rounded-2xl overflow-hidden mb-8 border border-white/10">
              <Image
                src="/images/couple/couple-01.jpg"
                alt="Parul Sharma"
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 text-xs text-gold-warm tracking-widest uppercase">
                {lang === 'hi' ? 'वधू' : 'The Bride'}
              </div>
            </div>

            <h3
              className="text-3xl font-serif text-ivory mb-3"
              style={{ fontFamily: lang === 'hi' ? 'var(--font-rozha)' : 'var(--font-cormorant)' }}
            >
              {c.bride.name}
            </h3>
            <p
              className="text-ivory/70 text-sm md:text-base leading-relaxed font-light"
              style={{ fontFamily: lang === 'hi' ? 'var(--font-hind)' : 'var(--font-lora)' }}
            >
              {c.bride.bio}
            </p>
          </motion.div>

          {/* Groom Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="glass-modern rounded-3xl p-8 sm:p-10 flex flex-col group transition-all duration-500 border border-white/10"
          >
            <div className="relative w-full h-80 sm:h-[400px] rounded-2xl overflow-hidden mb-8 border border-white/10">
              <Image
                src="/images/couple/couple-10.jpg"
                alt="Shubham Sharma"
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 text-xs text-gold-warm tracking-widest uppercase">
                {lang === 'hi' ? 'वर' : 'The Groom'}
              </div>
            </div>

            <h3
              className="text-3xl font-serif text-ivory mb-3"
              style={{ fontFamily: lang === 'hi' ? 'var(--font-rozha)' : 'var(--font-cormorant)' }}
            >
              {c.groom.name}
            </h3>
            <p
              className="text-ivory/70 text-sm md:text-base leading-relaxed font-light"
              style={{ fontFamily: lang === 'hi' ? 'var(--font-hind)' : 'var(--font-lora)' }}
            >
              {c.groom.bio}
            </p>
          </motion.div>

        </div>

        {/* Candid Photo Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 glass-modern rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12 border border-white/10"
        >
          <div className="relative w-full md:w-64 h-56 rounded-2xl overflow-hidden flex-shrink-0 border border-white/10">
            <Image
              src="/images/couple/couple-08.jpg"
              alt="Candid moment"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-gold-warm font-serif block mb-2">
              {lang === 'hi' ? 'अनमोल स्मृतियाँ' : 'A Special Bond'}
            </span>
            <h4
              className="text-2xl md:text-3xl font-serif text-ivory mb-3"
              style={{ fontFamily: lang === 'hi' ? 'var(--font-rozha)' : 'var(--font-cormorant)' }}
            >
              {lang === 'hi' ? 'हँसी, आत्मीयता और विश्वास' : 'Laughter, Friendship & Forever'}
            </h4>
            <p
              className="text-ivory/70 text-sm md:text-base leading-relaxed font-light"
              style={{ fontFamily: lang === 'hi' ? 'var(--font-hind)' : 'var(--font-lora)' }}
            >
              {lang === 'hi'
                ? 'दो अलग जिंदगियाँ, एक साझा सपना। परिवार और बड़ों के आशीर्वाद से हम एक नया अध्याय शुरू कर रहे हैं।'
                : 'Every shared conversation and quiet smile has brought us to this milestone. We are overjoyed to celebrate our union in the presence of those who mean the most to us.'}
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
