'use client';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import content from '@/content/content';
import { venues } from '@/content/config';
import { generateICS, EVENT_ISO } from '@/lib/ics';

// Client-only dynamic import of Three.js canvas to prevent hydration mismatch
const MataPoojanCanvas = dynamic(
  () => import('@/components/three/MataPoojanCanvas'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex flex-col items-center justify-center min-h-[280px]">
        <div className="w-9 h-9 rounded-full border-2 border-[#c5a059]/30 border-t-[#c5a059] animate-spin" />
        <span className="text-[11px] tracking-widest text-[#c5a059] uppercase mt-3">
          Loading Sacred Altar...
        </span>
      </div>
    ),
  }
);

/**
 * Icons
 */
function DiyaCeremonyIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-[#c5a059]"
      aria-hidden="true"
    >
      <path
        d="M12 2C12 2 15 5.5 15 7.5C15 9.15685 13.6569 10.5 12 10.5C10.3431 10.5 9 9.15685 9 7.5C9 5.5 12 2 12 2Z"
        fill="currentColor"
      />
      <path
        d="M3 13C3 17.5 7 20 12 20C17 20 21 17.5 21 13H3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M8 20V22H16V20"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function FeastCeremonyIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-[#c5a059]"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="5.5" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 2" />
      <circle cx="9" cy="10" r="1.5" fill="currentColor" />
      <circle cx="15" cy="10" r="1.5" fill="currentColor" />
      <circle cx="12" cy="15" r="1.5" fill="currentColor" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-[#c5a059]"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-[#c5a059]"
      aria-hidden="true"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0 text-[#c5a059]"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function MapExternalIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0 opacity-80"
      aria-hidden="true"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

/**
 * Subtle gold ornament divider anchored above the buttons
 */
function SubtleGoldOrnament() {
  return (
    <div className="w-full flex items-center justify-center gap-3 my-1 select-none" aria-hidden="true">
      <span className="w-8 h-[1px] bg-[#8a6f2e]/40" />
      <span className="w-1.5 h-1.5 rotate-45 border border-[#c5a059]/60 bg-[#c5a059]/30" />
      <span className="w-8 h-[1px] bg-[#8a6f2e]/40" />
    </div>
  );
}

export default function MataPoojanSection() {
  const { lang } = useLanguage();
  const c = content[lang].mataPoojan;
  const isHindi = lang === 'hi';

  const headingFont = isHindi
    ? 'var(--font-noto-serif-devanagari), var(--font-rozha), serif'
    : 'var(--font-cormorant), Georgia, serif';

  const dateFont = isHindi
    ? 'var(--font-noto-serif-devanagari), serif'
    : 'var(--font-cormorant), Georgia, serif';

  const bodyFont = isHindi
    ? 'var(--font-noto-sans-devanagari), var(--font-hind), sans-serif'
    : 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

  // Config override for Mata Poojan address: empty by default (shows only venue)
  const mataPoojanStreetAddress = venues?.mataPoojan?.address?.trim() || '';

  const handleDownloadCalendar = (event) => {
    const isoDate = EVENT_ISO[event.id] || '2026-11-15T09:30:00+05:30';
    const addressToUse =
      event.id === 'mata-pujan' ? mataPoojanStreetAddress : event.address;

    generateICS({
      name: event.name,
      dateISO: isoDate,
      durationMinutes: event.id === 'mata-pujan' ? 120 : 180,
      venue: event.venue,
      address: addressToUse,
      description: `${event.name} — Parul & Shubham Wedding Celebration (${event.timeLabel || event.time})`,
    });
  };

  const mataPujanEvent = c.events[0];
  const snehbhojEvent = c.events[1];

  return (
    <section
      id="mata-poojan"
      aria-label={isHindi ? 'माता पूजन एवं स्नेहभोज' : 'Mata Poojan & Snehbhoj'}
      className="relative w-full bg-[#0d0d0f] text-white selection:bg-[#8a6f2e]/40 selection:text-white border-t border-white/5 overflow-hidden"
      style={{
        paddingTop: '96px',
        paddingBottom: '96px',
      }}
    >
      {/* Soft dark radial vignette with warm amber center */}
      <div
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_rgba(212,175,55,0.05)_0%,_rgba(13,13,15,0.85)_50%,_rgba(13,13,15,1)_100%)]"
        aria-hidden="true"
      />

      {/* Ambient background particle glows */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[380px] bg-[#d4af37]/5 blur-[130px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      {/* ─────────────────────────────────────────────────────────────
          Centered Container: max-width 1200px, width min(1200px, calc(100% - 48px))
          ───────────────────────────────────────────────────────────── */}
      <div
        className="relative z-10 flex flex-col items-center"
        style={{
          width: 'min(1200px, calc(100% - 48px))',
          marginInline: 'auto',
        }}
      >
        {/* ─────────────────────────────────────────────────────────────
            HEADER BLOCK (Exact gaps: 14px -> 18px -> 16px -> 48px)
            ───────────────────────────────────────────────────────────── */}
        {/* 1. Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-3 text-center"
          style={{ marginBottom: '14px' }}
        >
          <span className="w-8 sm:w-12 h-[1px] bg-[#8a6f2e]/60 shrink-0" />
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-[#c5a059] font-medium leading-none">
            {c.eyebrow}
          </span>
          <span className="w-8 sm:w-12 h-[1px] bg-[#8a6f2e]/60 shrink-0" />
        </motion.div>

        {/* 2. Title */}
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-white tracking-wide text-center"
          style={{
            fontFamily: headingFont,
            marginBottom: '18px',
          }}
        >
          {c.title}
        </motion.h2>

        {/* 3. Date Line (No stray underline/border, bilingual, lining numerals) */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.14 }}
          className="flex items-center justify-center text-center select-none"
          style={{
            marginBottom: '16px',
            fontVariantNumeric: 'lining-nums',
          }}
        >
          <span
            className="text-base sm:text-lg md:text-xl text-[#f5ecd5] font-serif tracking-wider font-normal"
            style={{
              fontFamily: dateFont,
              fontVariantNumeric: 'lining-nums',
            }}
          >
            {c.dateBanner}
          </span>
        </motion.div>

        {/* 4. Description (max-width 640px, line-height 1.6, softer white 75%, 48px to cards) */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-sm sm:text-[15px] text-center font-light mx-auto"
          style={{
            maxWidth: '640px',
            lineHeight: 1.6,
            color: 'rgba(255, 255, 255, 0.75)',
            fontFamily: bodyFont,
            marginBottom: '48px',
          }}
        >
          {c.intro}
        </motion.p>

        {/* ─────────────────────────────────────────────────────────────
            RESPONSIVE CARDS CONTAINER
            - >1100px: 3 cards in a row (equal width & min-height 460px, gap 28px)
            - 700px - 1100px: 3D card on top (min-height 380px), 2 side cards in a row below
            - <700px: single column (3D card, Mata Poojan, Snehbhoj)
            ───────────────────────────────────────────────────────────── */}
        <div className="w-full flex flex-col min-[700px]:grid min-[700px]:grid-cols-2 min-[1100px]:grid-cols-3 gap-6 min-[1100px]:gap-[28px] items-stretch">
          
          {/* ──── 3D CARD (Order-first on <1100px; Middle column on >=1100px) ──── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mp-diya-card w-full min-[700px]:col-span-2 min-[1100px]:col-span-1 min-[1100px]:order-2"
          >
            {/* Top Label (Inside card with 24px top padding) */}
            <div className="diya-label select-none">
              <span className="w-6 h-[1px] bg-[#c5a059]/40 shrink-0" />
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-[#c5a059] font-medium whitespace-nowrap">
                {c.threeTitle}
              </span>
              <span className="w-6 h-[1px] bg-[#c5a059]/40 shrink-0" />
            </div>

            {/* Canvas fills card with same rounded corners, no seams */}
            <div className="relative w-full flex-1 flex items-center justify-center overflow-hidden">
              <MataPoojanCanvas />
            </div>

            {/* Bottom Caption (16px bottom padding, readable, doesn't touch edge) */}
            <div className="diya-caption select-none">
              <span className="text-[11px] sm:text-xs text-white/60 tracking-wide font-light">
                {c.threeHint}
              </span>
            </div>
          </motion.div>

          {/* ──── LEFT CARD: MATA POOJAN ──── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="event-card w-full min-[1100px]:order-1 group"
          >
            {/* Top decorative gradient sheen */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#c5a059]/60 to-transparent opacity-40 group-hover:opacity-100 transition-opacity" />

            {/* Top-Right Corner Icon Circle (44px, at 28px from top and right, inside card) */}
            <div className="corner-icon" aria-hidden="true">
              <DiyaCeremonyIcon />
            </div>

            {/* Badge Pill (inside padding, never on border) */}
            <div className="badge">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] animate-pulse" />
              <span>{mataPujanEvent.tag}</span>
            </div>

            {/* Title (margin: 0 0 20px, padding-right: 56px to clear corner icon) */}
            <h3
              className="title font-serif"
              style={{ fontFamily: headingFont }}
            >
              {mataPujanEvent.name}
            </h3>

            {/* Divider (stays inside padding) */}
            <div className="divider" />

            {/* Time Row (grid 24px 1fr, column-gap 12px) */}
            <div className="row">
              <div className="flex items-center">
                <ClockIcon />
              </div>
              <span
                className="text-sm font-medium text-[#f5e6c8]"
                style={{ fontFamily: bodyFont }}
              >
                {mataPujanEvent.timeLabel || mataPujanEvent.time}
              </span>
            </div>

            {/* Venue Block (map-pin icon aligned to first line, text column aligned) */}
            <div className="row">
              <div className="flex items-center pt-0.5">
                <PinIcon />
              </div>
              <div>
                <div
                  className="text-white text-base sm:text-[17px] font-normal leading-snug"
                  style={{ fontFamily: headingFont }}
                >
                  {mataPujanEvent.venue}
                </div>
                {mataPoojanStreetAddress ? (
                  <div
                    className="sub"
                    style={{ fontFamily: bodyFont }}
                  >
                    {mataPoojanStreetAddress}
                  </div>
                ) : null}
              </div>
            </div>

            {/* Description */}
            <p
              className="desc"
              style={{ fontFamily: bodyFont, lineHeight: isHindi ? '1.75' : '1.6' }}
            >
              {mataPujanEvent.desc}
            </p>

            {/* Bottom Actions (margin-top: auto, padding-top: 24px, 46px tall buttons) */}
            <div className="actions">
              <div className="ornament">
                <SubtleGoldOrnament />
              </div>

              {/* Add to Calendar: Primary (gold outline with faint gold fill) */}
              <button
                type="button"
                onClick={() => handleDownloadCalendar(mataPujanEvent)}
                className="border border-[#c5a059] bg-[#c5a059]/15 hover:bg-[#c5a059]/25 hover:border-[#dfc07a] text-[#f8f1de] transition-all focus-visible:ring-2 focus-visible:ring-[#c5a059] focus-visible:outline-none active:scale-[0.99]"
              >
                <CalendarIcon />
                <span>{c.calendarBtn}</span>
              </button>

              {/* View Venue Map: Secondary (ghost, thinner border) */}
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  mataPoojanStreetAddress || mataPujanEvent.mapQuery || 'Nij Niwas Ujjain'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/20 hover:border-white/40 bg-transparent hover:bg-white/[0.04] text-white/85 hover:text-white transition-all focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:outline-none"
              >
                <span>{c.mapsBtn}</span>
                <MapExternalIcon />
              </a>
            </div>
          </motion.div>

          {/* ──── RIGHT CARD: SNEHBHOJ ──── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.26 }}
            className="event-card w-full min-[1100px]:order-3 group"
          >
            {/* Top decorative gradient sheen */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#c5a059]/60 to-transparent opacity-40 group-hover:opacity-100 transition-opacity" />

            {/* Top-Right Corner Icon Circle (44px, at 28px from top and right, inside card) */}
            <div className="corner-icon" aria-hidden="true">
              <FeastCeremonyIcon />
            </div>

            {/* Badge Pill (inside padding, never on border) */}
            <div className="badge">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] animate-pulse" />
              <span>{snehbhojEvent.tag}</span>
            </div>

            {/* Title (margin: 0 0 20px, padding-right: 56px to clear corner icon) */}
            <h3
              className="title font-serif"
              style={{ fontFamily: headingFont }}
            >
              {snehbhojEvent.name}
            </h3>

            {/* Divider (stays inside padding) */}
            <div className="divider" />

            {/* Time Row (grid 24px 1fr, column-gap 12px) */}
            <div className="row">
              <div className="flex items-center">
                <ClockIcon />
              </div>
              <span
                className="text-sm font-medium text-[#f5e6c8]"
                style={{ fontFamily: bodyFont }}
              >
                {snehbhojEvent.timeLabel || snehbhojEvent.time}
              </span>
            </div>

            {/* Venue Block (map-pin icon aligned to first line, text column aligned) */}
            <div className="row">
              <div className="flex items-center pt-0.5">
                <PinIcon />
              </div>
              <div>
                <div
                  className="text-white text-base sm:text-[17px] font-normal leading-snug"
                  style={{ fontFamily: headingFont }}
                >
                  {snehbhojEvent.venue}
                </div>
                <div
                  className="sub"
                  style={{ fontFamily: bodyFont }}
                >
                  {snehbhojEvent.address}
                </div>
              </div>
            </div>

            {/* Description */}
            <p
              className="desc"
              style={{ fontFamily: bodyFont, lineHeight: isHindi ? '1.75' : '1.6' }}
            >
              {snehbhojEvent.desc}
            </p>

            {/* Bottom Actions (margin-top: auto, padding-top: 24px, 46px tall buttons) */}
            <div className="actions">
              <div className="ornament">
                <SubtleGoldOrnament />
              </div>

              {/* Add to Calendar: Primary (gold outline with faint gold fill) */}
              <button
                type="button"
                onClick={() => handleDownloadCalendar(snehbhojEvent)}
                className="border border-[#c5a059] bg-[#c5a059]/15 hover:bg-[#c5a059]/25 hover:border-[#dfc07a] text-[#f8f1de] transition-all focus-visible:ring-2 focus-visible:ring-[#c5a059] focus-visible:outline-none active:scale-[0.99]"
              >
                <CalendarIcon />
                <span>{c.calendarBtn}</span>
              </button>

              {/* View Venue Map: Secondary (ghost, thinner border) */}
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  snehbhojEvent.mapQuery ||
                    'Shri Riddhi-Siddhi Vinayak Parisar, Opp. Gayatri Shakti Peeth, Ankpat Marg, Ujjain'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/20 hover:border-white/40 bg-transparent hover:bg-white/[0.04] text-white/85 hover:text-white transition-all focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:outline-none"
              >
                <span>{c.mapsBtn}</span>
                <MapExternalIcon />
              </a>
            </div>
          </motion.div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            G. FOOTER LINE (32px space above, AA contrast #dfc07a, 14px, 0.2em tracking)
            ───────────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full text-center select-none"
          style={{ marginTop: '32px' }}
        >
          <div className="inline-flex items-center justify-center gap-4 max-w-full">
            <span className="w-10 sm:w-16 h-[1px] bg-gradient-to-r from-transparent to-[#8a6f2e]/60 shrink-0" />
            <span
              className="text-[14px] uppercase font-normal text-[#dfc07a] text-center"
              style={{
                letterSpacing: '0.2em',
                fontFamily: headingFont,
              }}
            >
              {c.footerLine}
            </span>
            <span className="w-10 sm:w-16 h-[1px] bg-gradient-to-l from-transparent to-[#8a6f2e]/60 shrink-0" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
