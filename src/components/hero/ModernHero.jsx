'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/hooks/useLanguage';
import content from '@/content/content';

export default function ModernHero({ guestName }) {
  const { lang } = useLanguage();
  const c = content[lang].hero;

  const greeting = guestName
    ? c.guestGreeting(decodeURIComponent(guestName))
    : c.defaultGreeting;

  return (
    <section className="relative w-full min-h-[100svh] h-[100svh] overflow-hidden flex flex-col items-center justify-center pt-20 min-[380px]:pt-22 sm:pt-26 pb-4 sm:pb-6 bg-[#0D0C10] select-none">
      
      {/* ----------------------------------------------------
          1. BACKGROUND FILM STRIP (GRAYSCALE 1, BRIGHTNESS 0.6)
          ps_1, ps_3, ps_4, ps_6, ps_8, ps_2
          ---------------------------------------------------- */}
      <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 overflow-hidden pointer-events-none z-[1] h-[clamp(260px,50svh,460px)] sm:h-[clamp(340px,62svh,660px)]">
        <div className="flex h-full w-max items-center animate-[filmDrift_140s_linear_infinite] will-change-transform motion-reduce:animate-none">
          
          {/* SEQUENCE 1 */}
          <div className="flex h-full items-center gap-4 pr-4">
            {/* ps_1: Couple romantic dance */}
            <div className="relative h-full flex-shrink-0 border-[1.5px] border-white/80 rounded overflow-hidden bg-black shadow-2xl filter grayscale contrast-105 brightness-[0.6] aspect-[852/1280]">
              <Image
                src="/Images/ps_1.jpeg"
                alt=""
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover object-center"
              />
            </div>

            {/* ps_3: Backlit couple silhouette */}
            <div className="relative h-full flex-shrink-0 border-[1.5px] border-white/80 rounded overflow-hidden bg-black shadow-2xl filter grayscale contrast-105 brightness-[0.6] aspect-[854/1280]">
              <Image
                src="/Images/ps_3.jpeg"
                alt=""
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover object-center"
              />
            </div>

            {/* ps_4: Couple standing elegant portrait */}
            <div className="relative h-full flex-shrink-0 border-[1.5px] border-white/80 rounded overflow-hidden bg-black shadow-2xl filter grayscale contrast-105 brightness-[0.6] aspect-[720/1280]">
              <Image
                src="/Images/ps_4.jpeg"
                alt=""
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover object-top"
              />
            </div>

            {/* ps_6: Center stage floral ring (16:9 crop removes top/bottom blurred bars) */}
            <div className="relative h-full flex-shrink-0 border-[1.5px] border-white/80 rounded overflow-hidden bg-black shadow-2xl filter grayscale contrast-105 brightness-[0.6] aspect-[16/9]">
              <Image
                src="/Images/ps_6.jpeg"
                alt=""
                fill
                sizes="(max-width: 768px) 60vw, 45vw"
                className="object-cover object-center"
              />
            </div>

            {/* ps_8: Candid casual together (4:3 crop removes top/bottom solid bars) */}
            <div className="relative h-full flex-shrink-0 border-[1.5px] border-white/80 rounded overflow-hidden bg-black shadow-2xl filter grayscale contrast-105 brightness-[0.6] aspect-[4/3]">
              <Image
                src="/Images/ps_8.jpeg"
                alt=""
                fill
                sizes="(max-width: 768px) 60vw, 40vw"
                className="object-cover object-center"
              />
            </div>

            {/* ps_2: Ring proposal ceremony (0.65 portrait crop removes left/right blurred bars) */}
            <div className="relative h-full flex-shrink-0 border-[1.5px] border-white/80 rounded overflow-hidden bg-black shadow-2xl filter grayscale contrast-105 brightness-[0.6] aspect-[0.65]">
              <Image
                src="/Images/ps_2.jpeg"
                alt=""
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* SEQUENCE 2 (DUPLICATED FOR SEAMLESS 140s LOOP) */}
          <div className="flex h-full items-center gap-4 pr-4">
            <div className="relative h-full flex-shrink-0 border-[1.5px] border-white/80 rounded overflow-hidden bg-black shadow-2xl filter grayscale contrast-105 brightness-[0.6] aspect-[852/1280]">
              <Image src="/Images/ps_1.jpeg" alt="" fill sizes="33vw" className="object-cover object-center" />
            </div>
            <div className="relative h-full flex-shrink-0 border-[1.5px] border-white/80 rounded overflow-hidden bg-black shadow-2xl filter grayscale contrast-105 brightness-[0.6] aspect-[854/1280]">
              <Image src="/Images/ps_3.jpeg" alt="" fill sizes="33vw" className="object-cover object-center" />
            </div>
            <div className="relative h-full flex-shrink-0 border-[1.5px] border-white/80 rounded overflow-hidden bg-black shadow-2xl filter grayscale contrast-105 brightness-[0.6] aspect-[720/1280]">
              <Image src="/Images/ps_4.jpeg" alt="" fill sizes="33vw" className="object-cover object-top" />
            </div>
            <div className="relative h-full flex-shrink-0 border-[1.5px] border-white/80 rounded overflow-hidden bg-black shadow-2xl filter grayscale contrast-105 brightness-[0.6] aspect-[16/9]">
              <Image src="/Images/ps_6.jpeg" alt="" fill sizes="45vw" className="object-cover object-center" />
            </div>
            <div className="relative h-full flex-shrink-0 border-[1.5px] border-white/80 rounded overflow-hidden bg-black shadow-2xl filter grayscale contrast-105 brightness-[0.6] aspect-[4/3]">
              <Image src="/Images/ps_8.jpeg" alt="" fill sizes="40vw" className="object-cover object-center" />
            </div>
            <div className="relative h-full flex-shrink-0 border-[1.5px] border-white/80 rounded overflow-hidden bg-black shadow-2xl filter grayscale contrast-105 brightness-[0.6] aspect-[0.65]">
              <Image src="/Images/ps_2.jpeg" alt="" fill sizes="33vw" className="object-cover object-center" />
            </div>
          </div>

        </div>
      </div>

      {/* DARK VIGNETTE OVERLAY */}
      <div 
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(13, 12, 16, 0.4) 0%, rgba(13, 12, 16, 0.8) 65%, rgba(13, 12, 16, 0.96) 100%)',
          boxShadow: 'inset 0 0 120px 40px rgba(7, 7, 9, 0.85)'
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#0D0C10] to-transparent z-[3] pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#0D0C10] to-transparent z-[3] pointer-events-none" />

      {/* ----------------------------------------------------
          2. CENTRE PIECE: FULL COLOUR "ps_mid" PAPER CUTOUT
          Arch top, cream paper border, 1-2° rotated backing layer
          ---------------------------------------------------- */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.94, y: 25 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center justify-center h-[clamp(330px,56svh,500px)] sm:h-[clamp(420px,63svh,640px)] aspect-[0.65] max-w-[calc(100vw-32px)] my-auto"
      >
        <div className="relative w-full h-full flex items-center justify-center">
          
          {/* Second slightly rotated paper layer behind it (1.8 deg) */}
          <div 
            className="absolute inset-0 bg-[#F2EBDE] rounded-t-full rounded-b-xl transform rotate-[1.8deg] translate-x-1 translate-y-1 shadow-[0_25px_50px_-10px_rgba(0,0,0,0.65)] border border-[#E7DDCA] pointer-events-none z-[1]"
            aria-hidden="true"
          />

          {/* Main front paper cutout piece with arch top & cream paper border */}
          <article className="relative w-full h-full bg-[#FAF6EE] rounded-t-full rounded-b-xl p-2 min-[380px]:p-2.5 sm:p-3 pb-3 min-[380px]:pb-4 sm:pb-5 flex flex-col shadow-[0_30px_60px_-12px_rgba(0,0,0,0.8),0_15px_30px_-8px_rgba(0,0,0,0.5)] border border-[#EFE6D5] transform -rotate-[0.5deg] z-[2]">
            
            <div className="relative w-full h-full rounded-t-full rounded-b-lg overflow-hidden bg-neutral-900 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.15)] group">
              <Image
                src="/Images/ps_mid.jpeg"
                alt="Wedding portrait of bride Parul in a rose-pink lehenga holding a bouquet and groom Shubham in a tailored suit smiling together"
                fill
                priority
                sizes="(max-width: 768px) 85vw, 480px"
                className="object-cover object-[50%_25%] group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
              
              {/* Subtle inner photo edge glow */}
              <div className="absolute inset-0 rounded-inherit shadow-[inset_0_1px_3px_rgba(0,0,0,0.3)] pointer-events-none" />
            </div>

            {/* Elegant Typography Plaque at bottom of cutout */}
            <div className="absolute bottom-2.5 min-[380px]:bottom-3.5 sm:bottom-5 left-2.5 min-[380px]:left-3.5 sm:left-5 right-2.5 min-[380px]:right-3.5 sm:right-5 text-center bg-[#121016]/85 backdrop-blur-md border border-gold-warm/40 rounded-full py-1 min-[380px]:py-1.5 sm:py-2 px-2.5 min-[380px]:px-3.5 sm:px-4 shadow-[0_10px_25px_rgba(0,0,0,0.6)] z-[3]">
              {guestName && (
                <span className="block text-[8px] min-[360px]:text-[9px] sm:text-[10px] tracking-[0.22em] text-gold-warm uppercase mb-0.5">
                  {greeting}
                </span>
              )}
              <h1 
                className="text-sm min-[360px]:text-base sm:text-xl lg:text-2xl font-serif font-semibold tracking-wider text-[#FFFDF8] drop-shadow-md leading-tight"
                style={{ fontFamily: lang === 'hi' ? 'var(--font-rozha)' : 'var(--font-cormorant)' }}
              >
                {c.names}
              </h1>
              <p 
                className="text-[7.5px] min-[360px]:text-[8.5px] sm:text-[11px] font-sans tracking-[0.2em] sm:tracking-[0.28em] uppercase text-gold-warm mt-0.5 font-light"
                style={{ fontFamily: 'var(--font-montserrat, sans-serif)' }}
              >
                {c.date}
              </p>
            </div>

          </article>

        </div>
      </motion.div>

    </section>
  );
}
