'use client';
import { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import content from '@/content/content';
import { openWhatsAppRSVP, callRSVP } from '@/lib/whatsapp';
import { MAP_LINK, RSVP_PHONE } from '@/content/config';
import OrnamentalDivider from '@/components/ui/OrnamentalDivider';
import { motion } from 'framer-motion';

export default function RsvpVenueSection() {
  const { lang } = useLanguage();
  const cRsvp = content[lang].rsvp;
  const cVenue = content[lang].venue;

  const [name, setName] = useState('');
  const [guests, setGuests] = useState('2');
  const [selectedEvents, setSelectedEvents] = useState([
    'Lagna & Sagaai',
    'Baraat Swagat',
    'Ashirwad Samaroh',
  ]);

  const eventOptions = [
    { id: 'mata-pujan', label: lang === 'hi' ? 'माता पूजन (15 नव.)' : 'Mata Pujan (15 Nov)' },
    { id: 'sneh-bhoj', label: lang === 'hi' ? 'स्नेह भोज (15 नव.)' : 'Sneh Bhoj (15 Nov)' },
    { id: 'lagna-sagaai', label: lang === 'hi' ? 'लग्न व सगाई (20 नव.)' : 'Lagna & Sagaai (20 Nov)' },
    { id: 'baraat', label: lang === 'hi' ? 'बारात स्वागत (20 नव.)' : 'Baraat Swagat (20 Nov)' },
    { id: 'ashirwad', label: lang === 'hi' ? 'आशीर्वाद समारोह (20 नव.)' : 'Ashirwad Samaroh (20 Nov)' },
    { id: 'vidai', label: lang === 'hi' ? 'विदाई (21 नव.)' : 'Vidai (21 Nov)' },
  ];

  const toggleEvent = (label) => {
    if (selectedEvents.includes(label)) {
      setSelectedEvents(selectedEvents.filter((e) => e !== label));
    } else {
      setSelectedEvents([...selectedEvents, label]);
    }
  };

  const handleWhatsApp = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    openWhatsAppRSVP({
      name: name.trim(),
      guests: guests || '1',
      events: selectedEvents.length > 0 ? selectedEvents : ['All Wedding Events'],
      messageBuilder: cRsvp.whatsappMessage,
    });
  };

  return (
    <section id="rsvp-venue" className="py-20 md:py-28 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #3d0a12 0%, #1f0406 100%)' }}
    >
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <p
            className="text-gold/60 text-xs tracking-[0.35em] uppercase mb-3"
            style={{ fontFamily: 'var(--font-cormorant)' }}
          >
            {cRsvp.subheading}
          </p>
          <h2
            className="text-3xl md:text-5xl text-ivory font-serif"
            style={{
              fontFamily: lang === 'hi' ? 'var(--font-rozha)' : 'var(--font-cormorant)',
              fontWeight: 600,
            }}
          >
            {cRsvp.heading} & {cVenue.heading}
          </h2>
          <OrnamentalDivider variant="lotus" className="mt-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          
          {/* Venue Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-card p-6 md:p-8 rounded-2xl border border-gold/30 flex flex-col justify-between h-full"
          >
            <div>
              <span className="text-gold text-xs tracking-[0.25em] uppercase block mb-2 font-medium">
                {lang === 'hi' ? 'शुभ विवाह स्थल' : 'Wedding Celebration Venue'}
              </span>
              <h3
                className="text-2xl md:text-3xl text-gold font-serif mb-2"
                style={{ fontFamily: lang === 'hi' ? 'var(--font-rozha)' : 'var(--font-cormorant)' }}
              >
                {cVenue.name}
              </h3>
              <p className="text-ivory/80 text-sm md:text-base leading-relaxed mb-6 font-sans">
                {cVenue.address}
              </p>

              {/* Venue Map Preview / Visual */}
              <div className="relative w-full h-48 rounded-xl overflow-hidden border border-gold/20 mb-6 bg-maroon/60 flex flex-col items-center justify-center p-4 text-center">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#C9A24B" strokeWidth="1.5" className="mb-2">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                  <circle cx="12" cy="9" r="2.5"/>
                </svg>
                <span className="text-ivory/90 text-sm font-medium">Swarnabhoomi, Khair Road</span>
                <span className="text-gold/60 text-xs">Aligarh, Uttar Pradesh</span>
              </div>
            </div>

            <a
              href={MAP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-full bg-gold/15 border border-gold text-gold font-medium text-sm hover:bg-gold hover:text-maroon transition-all shadow-gold"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              {cVenue.mapButton}
            </a>
          </motion.div>

          {/* RSVP Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-card p-6 md:p-8 rounded-2xl border border-gold/30"
          >
            <form onSubmit={handleWhatsApp} className="space-y-5">
              <div>
                <label className="block text-gold text-xs tracking-wider uppercase mb-2 font-medium">
                  {cRsvp.nameLabel} *
                </label>
                <input
                  type="text"
                  required
                  placeholder={cRsvp.placeholderName}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-black/40 border border-gold/30 text-ivory placeholder-ivory/30 focus:outline-none focus:border-gold transition-colors text-sm"
                />
              </div>

              <div>
                <label className="block text-gold text-xs tracking-wider uppercase mb-2 font-medium">
                  {cRsvp.guestLabel}
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-black/40 border border-gold/30 text-ivory focus:outline-none focus:border-gold transition-colors text-sm"
                />
              </div>

              <div>
                <label className="block text-gold text-xs tracking-wider uppercase mb-2 font-medium">
                  {cRsvp.eventsLabel}
                </label>
                <div className="grid grid-cols-2 gap-2 mt-1">
                  {eventOptions.map((ev) => {
                    const checked = selectedEvents.includes(ev.label);
                    return (
                      <button
                        type="button"
                        key={ev.id}
                        onClick={() => toggleEvent(ev.label)}
                        className={`text-xs px-3 py-2 rounded-md border text-left transition-all ${
                          checked
                            ? 'bg-gold/20 border-gold text-gold font-medium'
                            : 'bg-black/20 border-white/10 text-ivory/60 hover:border-gold/40'
                        }`}
                      >
                        {ev.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 rounded-full bg-gold text-maroon font-semibold text-sm hover:brightness-110 active:scale-95 transition-all shadow-gold flex items-center justify-center gap-2"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-5.46-4.45-9.92-9.91-9.92z"/>
                  </svg>
                  {cRsvp.whatsappBtn}
                </button>

                <button
                  type="button"
                  onClick={callRSVP}
                  className="py-3 px-5 rounded-full bg-white/5 border border-gold/40 text-gold text-sm font-medium hover:bg-gold/10 transition-colors flex items-center justify-center gap-2"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
