'use client';
import { useLanguage } from '@/hooks/useLanguage';
import content from '@/content/content';
import { motion } from 'framer-motion';
import { generateICS, EVENT_ISO } from '@/lib/ics';

const ICON_MAP = {
  diya:    DiyaIcon,
  marigold: MarigoldIcon,
  rings:   RingsIcon,
  horse:   HorseIcon,
  garland: GarlandIcon,
  lotus:   LotusIcon,
};

export default function EventsSection() {
  const { lang } = useLanguage();
  const c = content[lang].events;

  return (
    <section id="events" className="section py-20 md:py-28 relative"
      style={{ background: 'linear-gradient(180deg, #2a0608 0%, #3d0a12 100%)' }}
    >
      <div className="max-w-2xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="text-center mb-16"
        >
          <p className="text-gold/50 text-xs tracking-[0.35em] uppercase mb-3"
            style={{ fontFamily: 'var(--font-cormorant)' }}>
            {c.subheading}
          </p>
          <h2 className="text-3xl md:text-5xl text-ivory"
            style={{
              fontFamily: lang === 'hi' ? 'var(--font-rozha)' : 'var(--font-cormorant)',
              fontWeight: 600
            }}>
            {c.heading}
          </h2>
        </motion.div>

        {/* Vertical timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent" aria-hidden="true"/>

          <div className="space-y-12">
            {c.list.map((event, i) => {
              const Icon = ICON_MAP[event.icon] || DiyaIcon;
              const isEven = i % 2 === 0;

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.7, delay: i * 0.05 }}
                  className="relative pl-16"
                >
                  {/* Icon node on timeline */}
                  <div
                    className="absolute left-0 top-1 w-12 h-12 rounded-full flex items-center justify-center border border-gold/40"
                    style={{
                      background: 'linear-gradient(135deg, #3d0a12, #5A0F1B)',
                      boxShadow: '0 0 16px rgba(201,162,75,0.2)',
                    }}
                    aria-hidden="true"
                  >
                    <Icon />
                  </div>

                  {/* Event card */}
                  <div
                    className="p-5 rounded-xl border border-gold/20 hover:border-gold/40 transition-colors"
                    style={{
                      background: 'rgba(90,15,27,0.35)',
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div>
                        <h3 className="text-gold text-lg md:text-xl mb-0.5"
                          style={{
                            fontFamily: lang === 'hi' ? 'var(--font-rozha)' : 'var(--font-cormorant)',
                            fontWeight: 600
                          }}>
                          {event.name}
                        </h3>
                        {event.subtitle && (
                          <p className="text-ivory/50 text-xs tracking-wide mb-2"
                            style={{ fontFamily: 'var(--font-lora)' }}>
                            {event.subtitle}
                          </p>
                        )}
                        <p className="text-ivory/80 text-sm mb-1"
                          style={{ fontFamily: lang === 'hi' ? 'var(--font-hind)' : 'var(--font-lora)' }}>
                          {event.date}
                        </p>
                        <p className="text-saffron text-sm font-medium mb-2"
                          style={{ fontFamily: lang === 'hi' ? 'var(--font-hind)' : 'var(--font-lora)' }}>
                          {event.time}
                        </p>
                        <p className="text-ivory/70 text-sm"
                          style={{ fontFamily: lang === 'hi' ? 'var(--font-hind)' : 'var(--font-lora)' }}>
                          {event.venue}
                        </p>
                        <p className="text-ivory/40 text-xs mt-0.5"
                          style={{ fontFamily: lang === 'hi' ? 'var(--font-hind)' : 'var(--font-lora)' }}>
                          {event.address}
                        </p>
                      </div>

                      {/* Add to Calendar */}
                      {EVENT_ISO[event.id] && (
                        <button
                          aria-label={`Add ${event.name} to calendar`}
                          onClick={() => generateICS({
                            name: event.name,
                            dateISO: EVENT_ISO[event.id],
                            venue: event.venue,
                            address: event.address,
                          })}
                          className="flex-shrink-0 flex items-center gap-1.5 text-xs text-gold/70 border border-gold/30 rounded-full px-3 py-1.5 hover:bg-gold/10 hover:text-gold transition-all mt-1"
                        >
                          <CalIcon />
                          <span style={{ fontFamily: 'var(--font-cormorant)' }}>
                            {c.addToCalendar}
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SVG Event Icons ──────────────────────────────────────────────────────────

function DiyaIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <ellipse cx="11" cy="15" rx="7" ry="4" fill="none" stroke="#C9A24B" strokeWidth="1.2"/>
      <path d="M11,11 Q14,8 11,3 Q8,8 11,11Z" fill="#F28C28" opacity="0.9"/>
      <ellipse cx="11" cy="15" rx="4" ry="2.5" fill="#C9A24B" opacity="0.3"/>
    </svg>
  );
}

function MarigoldIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      {[0,45,90,135,180,225,270,315].map((deg) => (
        <ellipse key={deg} cx="11" cy="6" rx="2.5" ry="5" fill="#F28C28" opacity="0.8"
          transform={`rotate(${deg} 11 11)`}/>
      ))}
      <circle cx="11" cy="11" r="3.5" fill="#C9A24B"/>
    </svg>
  );
}

function RingsIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="8" cy="11" r="5" stroke="#C9A24B" strokeWidth="1.5" fill="none"/>
      <circle cx="14" cy="11" r="5" stroke="#F28C28" strokeWidth="1.5" fill="none"/>
    </svg>
  );
}

function HorseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M4,18 L4,12 Q4,6 9,5 L14,4 Q19,4 19,9 L19,12 Q19,14 17,15 L14,18"
        stroke="#C9A24B" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <circle cx="13" cy="7" r="2.5" fill="none" stroke="#C9A24B" strokeWidth="1"/>
      <path d="M16,5 L19,3" stroke="#C9A24B" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  );
}

function GarlandIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      {[3,7,11,15,19].map((x, i) => (
        <ellipse key={i} cx={x} cy={i%2===0 ? 8 : 12} rx="2" ry="3" fill="#F28C28" opacity="0.8"/>
      ))}
      <path d="M3,10 Q7,6 11,10 Q15,14 19,10" stroke="#C9A24B" strokeWidth="0.8" fill="none"/>
    </svg>
  );
}

function LotusIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <ellipse cx="11" cy="9" rx="3" ry="7" fill="none" stroke="#C9A24B" strokeWidth="1"/>
      <ellipse cx="11" cy="9" rx="3" ry="7" fill="none" stroke="#C9A24B" strokeWidth="1" transform="rotate(30 11 11)"/>
      <ellipse cx="11" cy="9" rx="3" ry="7" fill="none" stroke="#C9A24B" strokeWidth="1" transform="rotate(-30 11 11)"/>
      <circle cx="11" cy="13" r="3" fill="#C9A24B" opacity="0.5"/>
    </svg>
  );
}

function CalIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <rect x="1" y="2" width="10" height="9" rx="1.5" stroke="currentColor" strokeWidth="1"/>
      <line x1="4" y1="1" x2="4" y2="4" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      <line x1="8" y1="1" x2="8" y2="4" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      <line x1="1" y1="5" x2="11" y2="5" stroke="currentColor" strokeWidth="1"/>
    </svg>
  );
}
