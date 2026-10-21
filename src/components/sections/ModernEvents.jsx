'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import content from '@/content/content';
import { generateICS, EVENT_ISO } from '@/lib/ics';
import dynamic from 'next/dynamic';

// Dynamic import with SSR disabled for Three.js canvas to guarantee 0 hydration errors
const EventThreeCanvas = dynamic(
  () => import('@/components/three/EventThreeCanvas'),
  { ssr: false }
);

export default function ModernEvents() {
  const { lang } = useLanguage();
  const c = content[lang].events;
  const [selectedEventId, setSelectedEventId] = useState(c.list[2]?.id || 'lagna-sagaai');

  const activeEvent = c.list.find((e) => e.id === selectedEventId) || c.list[0];

  return (
    <section id="celebrations" className="py-32 md:py-48 relative px-6 bg-[#0E0E10] border-t border-white/5">
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
              {c.subheading}
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
          <p className="text-xs uppercase tracking-[0.25em] text-ivory/40 mt-3">
            {lang === 'hi' ? 'अनुभव करने के लिए किसी भी उत्सव का चयन करें' : 'Select an event to explore the 3D celebration'}
          </p>
        </div>

        {/* Interactive Event Showcase: Left Timeline Selector, Right 3D Visualizer & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Event Selector Buttons / Timeline */}
          <div className="lg:col-span-5 space-y-3">
            {c.list.map((event, i) => {
              const isSelected = event.id === selectedEventId;
              return (
                <motion.button
                  key={event.id}
                  onClick={() => setSelectedEventId(event.id)}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between cursor-pointer group ${
                    isSelected
                      ? 'bg-gradient-to-r from-gold-warm/20 via-gold-warm/10 to-transparent border-gold-warm/60 shadow-lg'
                      : 'bg-white/[0.02] border-white/5 hover:border-white/20 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono border transition-colors ${
                        isSelected
                          ? 'bg-gold-warm text-[#0E0E10] border-gold-warm font-semibold'
                          : 'border-white/20 text-ivory/50 group-hover:border-gold-warm/40 group-hover:text-gold-warm'
                      }`}
                    >
                      0{i + 1}
                    </span>
                    <div>
                      <h4
                        className={`text-lg md:text-xl font-serif transition-colors ${
                          isSelected ? 'text-gold-warm' : 'text-ivory group-hover:text-gold-warm'
                        }`}
                        style={{ fontFamily: lang === 'hi' ? 'var(--font-rozha)' : 'var(--font-cormorant)' }}
                      >
                        {event.name}
                      </h4>
                      <p className="text-xs text-ivory/50 tracking-wide font-light">
                        {event.date} • {event.time}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-xs uppercase tracking-widest transition-transform duration-300 ${
                      isSelected
                        ? 'text-gold-warm translate-x-1 font-medium'
                        : 'text-ivory/30 group-hover:text-ivory/70 group-hover:translate-x-1'
                    }`}
                  >
                    →
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Right Column: 3D Animation Stage & Event Detail Card */}
          <div className="lg:col-span-7">
            <div className="glass-modern rounded-3xl p-8 md:p-10 border border-gold-warm/20 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[500px]">
              
              {/* Subtle Ambient Background Halo */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-gold-warm/10 rounded-full filter blur-[90px] pointer-events-none" />

              {/* 3D Canvas Showcase */}
              <div className="relative w-full h-[260px] sm:h-[300px] flex items-center justify-center">
                <EventThreeCanvas activeEventId={selectedEventId} />
              </div>

              {/* Event Details Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeEvent.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                  className="pt-6 border-t border-white/10"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-gold-warm block mb-1">
                        {activeEvent.subtitle || 'Wedding Celebration'}
                      </span>
                      <h3
                        className="text-2xl sm:text-3xl font-serif text-ivory"
                        style={{ fontFamily: lang === 'hi' ? 'var(--font-rozha)' : 'var(--font-cormorant)' }}
                      >
                        {activeEvent.name}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs px-3 py-1.5 rounded-full bg-gold-warm/15 border border-gold-warm/30 text-gold-warm font-medium">
                        {activeEvent.time}
                      </span>
                      <span className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-ivory/70">
                        {activeEvent.date.split(',')[0]}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-ivory/80 font-medium mb-1">
                    📍 {activeEvent.venue}
                  </p>
                  <p className="text-xs text-ivory/50 leading-relaxed mb-6 font-light">
                    {activeEvent.address}
                  </p>

                  {/* Add to Calendar Button */}
                  {EVENT_ISO[activeEvent.id] && (
                    <button
                      onClick={() =>
                        generateICS({
                          name: activeEvent.name,
                          dateISO: EVENT_ISO[activeEvent.id],
                          venue: activeEvent.venue,
                          address: activeEvent.address,
                        })
                      }
                      className="py-3 px-6 rounded-full bg-gold-warm/20 hover:bg-gold-warm text-gold-warm hover:text-[#0E0E10] border border-gold-warm/40 text-xs tracking-widest uppercase font-medium flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                      </svg>
                      {c.addToCalendar}
                    </button>
                  )}
                </motion.div>
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
