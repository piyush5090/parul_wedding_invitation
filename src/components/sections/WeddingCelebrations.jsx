'use client';

import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import content from '@/content/content';
import styles from './WeddingCelebrations.module.css';

/**
 * Icons matching the exact aesthetic of Mata Poojan Section
 */
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
      className="text-[#c5a059] shrink-0 mt-0.5"
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
      className="text-[#c5a059] shrink-0"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function ExternalMapIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
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
 * Static Gold Illustrations (Fallback / Stage Preview)
 */
function RingsIllustration() {
  return (
    <svg
      width="140"
      height="140"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-[0_8px_24px_rgba(212,175,55,0.4)]"
      aria-hidden="true"
    >
      {/* First Ring */}
      <circle cx="42" cy="52" r="24" stroke="url(#goldGrad)" strokeWidth="5.5" />
      {/* Second Interlocking Ring */}
      <circle cx="58" cy="48" r="24" stroke="url(#goldGradLight)" strokeWidth="5.5" />
      {/* Gem Solitaire on Right Ring */}
      <polygon points="68,20 74,27 68,34 62,27" fill="#ffffff" opacity="0.95" />
      <polygon points="68,22 72,27 68,32 64,27" fill="#e6ca65" opacity="0.8" />
      {/* Sparkles */}
      <circle cx="68" cy="27" r="1.5" fill="#fff" />
      <path d="M68 15L68 18M68 36L68 39M56 27L59 27M77 27L80 27" stroke="#e6ca65" strokeWidth="1.2" strokeLinecap="round" />
      <defs>
        <linearGradient id="goldGrad" x1="18" y1="28" x2="66" y2="76" gradientUnits="userSpaceOnUse">
          <stop stopColor="#c5a059" />
          <stop offset="0.5" stopColor="#fff4d4" />
          <stop offset="1" stopColor="#8a6f2e" />
        </linearGradient>
        <linearGradient id="goldGradLight" x1="34" y1="24" x2="82" y2="72" gradientUnits="userSpaceOnUse">
          <stop stopColor="#e6ca65" />
          <stop offset="0.5" stopColor="#ffffff" />
          <stop offset="1" stopColor="#c5a059" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function GarlandIllustration() {
  return (
    <svg
      width="150"
      height="130"
      viewBox="0 0 120 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-[0_8px_24px_rgba(230,150,50,0.35)]"
      aria-hidden="true"
    >
      <path
        d="M15 30 C 35 75, 85 75, 105 30"
        stroke="#8a6f2e"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      {[
        [20, 36], [28, 48], [39, 59], [51, 65], [60, 66], [69, 65], [81, 59], [92, 48], [100, 36]
      ].map(([x, y], idx) => (
        <g key={idx}>
          <circle cx={x} cy={y} r="6.5" fill={idx % 2 === 0 ? '#e58e26' : '#f6b93b'} />
          <circle cx={x} cy={y} r="4" fill="#fa983a" opacity="0.8" />
          <circle cx={x} cy={y} r="2" fill="#fff4d4" />
        </g>
      ))}
      <circle cx="60" cy="74" r="8" fill="#d4af37" />
      <circle cx="60" cy="74" r="5" fill="#f8c291" />
      <circle cx="60" cy="85" r="3.5" fill="#e58e26" />
    </svg>
  );
}

function KalashIllustration() {
  return (
    <svg
      width="130"
      height="140"
      viewBox="0 0 100 110"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-[0_8px_24px_rgba(212,175,55,0.45)]"
      aria-hidden="true"
    >
      <ellipse cx="50" cy="30" rx="14" ry="17" fill="#784e2d" />
      <path d="M48 13 L50 9 L52 13 Z" fill="#4d321c" />
      <path d="M36 40 C 22 28, 26 14, 38 24 Z" fill="#2d6a4f" opacity="0.9" />
      <path d="M64 40 C 78 28, 74 14, 62 24 Z" fill="#2d6a4f" opacity="0.9" />
      <path d="M43 38 C 36 20, 48 15, 47 26 Z" fill="#40916c" />
      <path d="M57 38 C 64 20, 52 15, 53 26 Z" fill="#40916c" />
      <path
        d="M34 44 H66 L72 52 C76 66, 74 82, 64 88 H36 C26 82, 24 66, 28 52 Z"
        fill="url(#kalashGold)"
        stroke="#8a6f2e"
        strokeWidth="1.5"
      />
      <path d="M46 64 H54 M50 60 V68 M46 60 H47 M53 68 H54 M54 60 V61 M46 68 V67" stroke="#b33939" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M35 88 H65 V93 H35 Z" fill="#8a6f2e" />
      <path d="M22 84 C22 80, 24 76, 24 76 C24 76, 26 80, 26 84 C26 86, 24 88, 24 88 C24 88, 22 86, 22 84 Z" fill="#ffb142" />
      <path d="M74 84 C74 80, 76 76, 76 76 C76 76, 78 80, 78 84 C78 86, 76 88, 76 88 C76 88, 74 86, 74 84 Z" fill="#ffb142" />
      <defs>
        <linearGradient id="kalashGold" x1="26" y1="44" x2="74" y2="88" gradientUnits="userSpaceOnUse">
          <stop stopColor="#e6ca65" />
          <stop offset="0.4" stopColor="#fff4d4" />
          <stop offset="0.8" stopColor="#c5a059" />
          <stop offset="1" stopColor="#8a6f2e" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function WeddingCelebrations() {
  const { language } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const [activeEventIndex, setActiveEventIndex] = useState(0);

  const t = content[language] || content.en;
  const c = t.weddingCelebrations;

  if (!c) {
    return null;
  }

  const isHindi = language === 'hi';
  const headingFont = isHindi
    ? 'var(--font-rozha), serif'
    : 'var(--font-cormorant), Georgia, serif';
  const bodyFont = isHindi
    ? 'var(--font-hind), sans-serif'
    : 'var(--font-lora), Georgia, serif';
  const dateFont = isHindi
    ? 'var(--font-noto-serif-devanagari), var(--font-hind), serif'
    : 'var(--font-cormorant), Georgia, serif';

  const motionFadeIn = (delay = 0, yOffset = 16) => {
    return {
      initial: { opacity: 0, y: yOffset },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.5, delay },
    };
  };

  return (
    <section
      id="wedding-celebrations"
      aria-label={isHindi ? 'विवाह समारोह' : 'The Wedding Celebrations'}
      className={`${styles.wcSection || ''} wc-section`}
    >
      {/* Background Subtle Vignette and Particle Glow */}
      <div
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_rgba(212,175,55,0.05)_0%,_rgba(13,13,15,0.85)_50%,_rgba(13,13,15,1)_100%)]"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[380px] bg-[#d4af37]/5 blur-[130px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className={`${styles.wcContainer || ''} wc-container`}>
        {/* ─── 1. Header Block ─── */}
        <motion.div
          {...motionFadeIn(0, 12)}
          className={`${styles.wcEyebrowRow || ''} wc-eyebrow-row`}
        >
          <span className={`${styles.wcEyebrowLine || ''} wc-eyebrow-line`} />
          <span className={`${styles.wcEyebrowText || ''} wc-eyebrow-text`}>{c.eyebrow}</span>
          <span className={`${styles.wcEyebrowLine || ''} wc-eyebrow-line`} />
        </motion.div>

        <motion.h2
          {...motionFadeIn(0.08, 14)}
          className={`${styles.wcTitle || ''} wc-title`}
          style={{ fontFamily: headingFont }}
        >
          {c.title}
        </motion.h2>

        <motion.div
          {...motionFadeIn(0.14, 12)}
          className={`${styles.wcDateRow || ''} wc-date-row`}
        >
          <span
            className={`${styles.wcDateText || ''} wc-date-text`}
            style={{
              fontFamily: dateFont,
              lineHeight: isHindi ? '1.7' : '1.5',
            }}
          >
            {c.dateBanner}
          </span>
        </motion.div>

        <motion.p
          {...motionFadeIn(0.2, 10)}
          className={`${styles.wcIntro || ''} wc-intro`}
          style={{
            fontFamily: bodyFont,
            lineHeight: isHindi ? '1.75' : '1.6',
          }}
        >
          {c.intro}
        </motion.p>

        {/* ─── 2. Main Two-Column Layout ─── */}
        <div className={`${styles.wcGrid || ''} wc-grid`}>
          {/* Left Column: 3D Stage Card (Sticky on desktop) */}
          <div className={`${styles.wcStageCol || ''} wc-stage-col`}>
            <div className={`${styles.wcStageCard || ''} wc-stage-card`}>
              <div className={`${styles.wcStageHeader || ''} wc-stage-header`}>
                <span className={`${styles.wcStageHeaderLine || ''} wc-stage-header-line`} />
                <span className={`${styles.wcStageHeaderLabel || ''} wc-stage-header-label`}>
                  {c.threeTitle}
                </span>
                <span className={`${styles.wcStageHeaderLine || ''} wc-stage-header-line`} />
              </div>

              {/* 3D Canvas / Fallback Illustration Area */}
              <div
                className={`${styles.wcStageCanvasArea || ''} wc-stage-canvas-area`}
                role="img"
                aria-label={c.threeAlt || '3D Ceremony Visualization'}
              >
                {activeEventIndex === 0 && <RingsIllustration />}
                {activeEventIndex === 1 && <GarlandIllustration />}
                {activeEventIndex === 2 && <KalashIllustration />}
              </div>

              {/* Stage Footer with Controls & Caption */}
              <div className={`${styles.wcStageFooter || ''} wc-stage-footer`}>
                <div
                  className={`${styles.wcStageDots || ''} wc-stage-dots`}
                  role="tablist"
                  aria-label={isHindi ? 'कार्यक्रम चयन' : 'Event stage selector'}
                >
                  {c.events.map((ev, idx) => {
                    const isDotActive = activeEventIndex === idx;
                    const dotClass = `${styles.wcDotBtn || 'wc-dot-btn'} ${
                      isDotActive ? (styles.wcDotBtnActive || 'wc-dot-btn-active') : ''
                    }`;
                    return (
                      <button
                        key={ev.id}
                        type="button"
                        role="tab"
                        aria-selected={isDotActive}
                        aria-label={c.dotLabels?.[idx] || ev.title}
                        className={dotClass}
                        onClick={() => setActiveEventIndex(idx)}
                      />
                    );
                  })}
                </div>
                <span className={`${styles.wcStageCaption || ''} wc-stage-caption`}>
                  {c.threeHint}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Timeline Cards */}
          <div className={`${styles.wcTimelineCol || ''} wc-timeline-col`}>
            {/* Continuous thin vertical line running along the timeline */}
            <div className={`${styles.wcTimelineTrack || ''} wc-timeline-track`} aria-hidden="true" />

            {c.events.map((event, index) => {
              const isActive = activeEventIndex === index;
              const diamondClass = `${styles.wcTimelineDiamond || 'wc-timeline-diamond'} ${
                isActive ? (styles.wcTimelineDiamondActive || 'wc-timeline-diamond-active') : ''
              }`;
              const cardClass = `${styles.wcEventCard || 'wc-event-card'} ${
                isActive ? (styles.wcEventCardActive || 'wc-event-card-active') : ''
              }`;

              return (
                <div
                  key={event.id}
                  className={`${styles.wcTimelineCardWrapper || ''} wc-timeline-card-wrapper`}
                  onMouseEnter={() => setActiveEventIndex(index)}
                  onFocus={() => setActiveEventIndex(index)}
                >
                  {/* Diamond Node on Timeline */}
                  <div className={diamondClass} aria-hidden="true" />

                  {/* Event Card */}
                  <motion.div
                    {...motionFadeIn(0.15 + index * 0.1, 16)}
                    tabIndex={0}
                    role="region"
                    aria-label={event.ariaLabel || event.title}
                    className={cardClass}
                    onClick={() => setActiveEventIndex(index)}
                  >
                    <div className={`${styles.wcCardTopSheen || ''} wc-card-top-sheen`} />

                    {/* Badge */}
                    <div className={`${styles.wcBadge || ''} wc-badge`}>
                      <span className={`${styles.wcBadgeDot || ''} wc-badge-dot`} />
                      <span>{event.badge}</span>
                    </div>

                    {/* Title */}
                    <h3
                      className={`${styles.wcCardTitle || ''} wc-card-title`}
                      style={{ fontFamily: headingFont }}
                    >
                      {event.title}
                    </h3>

                    {/* Gold Divider */}
                    <div className={`${styles.wcCardDivider || ''} wc-card-divider`} />

                    {/* Time Row with 24px icon column */}
                    <div className={`${styles.wcTimeRow || ''} wc-time-row`}>
                      <div className={`${styles.wcIconCol || ''} wc-icon-col`}>
                        <ClockIcon />
                      </div>
                      <span
                        className={`${styles.wcTimeText || ''} wc-time-text`}
                        style={{
                          fontFamily: bodyFont,
                          lineHeight: isHindi ? '1.7' : '1.5',
                        }}
                      >
                        {event.time}
                      </span>
                    </div>

                    {/* Note */}
                    <p
                      className={`${styles.wcNoteText || ''} wc-note-text`}
                      style={{
                        fontFamily: bodyFont,
                        lineHeight: isHindi ? '1.75' : '1.6',
                      }}
                    >
                      {event.note}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── 3. Full-Width Venue Card ─── */}
        <motion.div
          {...motionFadeIn(0.3, 16)}
          className={`${styles.wcVenueCard || ''} wc-venue-card`}
        >
          <div className={`${styles.wcCardTopSheen || ''} wc-card-top-sheen`} />

          <div className={`${styles.wcVenueCardContent || ''} wc-venue-card-content`}>
            <div className={`${styles.wcVenueInfo || ''} wc-venue-info`}>
              <span className={`${styles.wcVenueHeaderBadge || ''} wc-venue-header-badge`}>
                {c.venue.label}
              </span>
              <h3
                className={`${styles.wcVenueTitle || ''} wc-venue-title`}
                style={{ fontFamily: headingFont }}
              >
                {c.venue.name}
              </h3>
              <div className={`${styles.wcVenueLocationRow || ''} wc-venue-location-row`}>
                <div className={`${styles.wcIconCol || ''} wc-icon-col`}>
                  <PinIcon />
                </div>
                <span
                  className={`${styles.wcVenueAddressText || ''} wc-venue-address-text`}
                  style={{
                    fontFamily: bodyFont,
                    lineHeight: isHindi ? '1.7' : '1.5',
                  }}
                >
                  {c.venue.address}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className={`${styles.wcVenueActions || ''} wc-venue-actions`}>
              <button
                type="button"
                className={`${styles.wcPrimaryBtn || ''} wc-primary-btn`}
                aria-label={c.venue.calendarBtn}
              >
                <CalendarIcon />
                <span>{c.venue.calendarBtn}</span>
              </button>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  c.venue.mapQuery || c.venue.address
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.wcSecondaryBtn || ''} wc-secondary-btn`}
                aria-label={c.venue.mapsBtn}
              >
                <span>{c.venue.mapsBtn}</span>
                <ExternalMapIcon />
              </a>
            </div>
          </div>
        </motion.div>

        {/* ─── 4. Footer Line ─── */}
        <motion.div
          {...motionFadeIn(0.35, 12)}
          className={`${styles.wcFooterLineRow || ''} wc-footer-line-row`}
        >
          <span className={`${styles.wcFooterLineBar || ''} wc-footer-line-bar`} />
          <span
            className={`${styles.wcFooterLineText || ''} wc-footer-line-text`}
            style={{ fontFamily: headingFont }}
          >
            {c.footerLine}
          </span>
          <span className={`${styles.wcFooterLineBarRight || ''} wc-footer-line-bar-right`} />
        </motion.div>
      </div>
    </section>
  );
}
