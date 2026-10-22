'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import content from '@/content/content';
import { venues } from '@/content/config';
import styles from './VidaaiSection.module.css';

/**
 * ClockIcon matching the exact aesthetic of Mata Poojan Section
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

/**
 * PinIcon matching Mata Poojan Section
 */
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

/**
 * CalendarIcon matching Mata Poojan Section
 */
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

/**
 * MapExternalIcon for venue map link
 */
function MapExternalIcon() {
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
 * Procedural Gold SVG Illustration: "Vidaai at Dawn with Golden Doli"
 * Serves as static layout illustration and accessible fallback.
 */
function VidaaiDawnIllustration() {
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full max-h-[300px] object-contain drop-shadow-[0_12px_32px_rgba(212,175,55,0.25)] select-none"
      aria-hidden="true"
    >
      <defs>
        {/* Sky Dawn Gradient */}
        <linearGradient id="vDawnSky" x1="200" y1="20" x2="200" y2="280" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#151221" />
          <stop offset="45%" stopColor="#2c1a24" />
          <stop offset="75%" stopColor="#4a2c26" />
          <stop offset="100%" stopColor="#1f1412" />
        </linearGradient>

        {/* Sun Glow */}
        <radialGradient id="vSunHalo" cx="200" cy="180" r="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffeaa7" stopOpacity="0.85" />
          <stop offset="35%" stopColor="#e17055" stopOpacity="0.4" />
          <stop offset="70%" stopColor="#d4af37" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#1a111a" stopOpacity="0" />
        </radialGradient>

        {/* Polished Gold Gradient */}
        <linearGradient id="vGoldSheen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c5a059" />
          <stop offset="35%" stopColor="#fff3d1" />
          <stop offset="70%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#8a6f2e" />
        </linearGradient>

        {/* Rich Velvet Maroon Gradient */}
        <linearGradient id="vMaroon" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7a1c28" />
          <stop offset="100%" stopColor="#3d0a12" />
        </linearGradient>

        <linearGradient id="vRayGrad" x1="200" y1="180" x2="200" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffeaa7" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#ffeaa7" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Atmospheric Dawn Halo */}
      <circle cx="200" cy="180" r="110" fill="url(#vSunHalo)" />

      {/* Fanning Dawn Light Rays */}
      <g opacity="0.45">
        <polygon points="200,180 130,30 150,25" fill="url(#vRayGrad)" />
        <polygon points="200,180 170,20 190,18" fill="url(#vRayGrad)" />
        <polygon points="200,180 210,18 230,20" fill="url(#vRayGrad)" />
        <polygon points="200,180 250,25 270,30" fill="url(#vRayGrad)" />
        <polygon points="200,180 80,60 100,50" fill="url(#vRayGrad)" />
        <polygon points="200,180 300,50 320,60" fill="url(#vRayGrad)" />
      </g>

      {/* Rising Sun Disc */}
      <circle cx="200" cy="180" r="28" fill="#fff9e6" opacity="0.9" />
      <circle cx="200" cy="180" r="32" stroke="#ffeaa7" strokeWidth="2" opacity="0.6" />

      {/* Horizon Line with Soft Ripples */}
      <line x1="40" y1="195" x2="360" y2="195" stroke="url(#vGoldSheen)" strokeWidth="1.2" opacity="0.7" />
      <line x1="80" y1="200" x2="320" y2="200" stroke="#c5a059" strokeWidth="0.8" opacity="0.35" />
      <line x1="120" y1="205" x2="280" y2="205" stroke="#c5a059" strokeWidth="0.5" opacity="0.2" />

      {/* ─── Auspicious Golden Doli (Palanquin) in Foreground ─── */}
      <g transform="translate(0, 5)">
        {/* Doli Carrying Poles (Front & Back Long Bamboo Poles with Gold Tips) */}
        <path d="M70 195 L330 195" stroke="url(#vGoldSheen)" strokeWidth="5" strokeLinecap="round" />
        <circle cx="70" cy="195" r="4.5" fill="#c5a059" />
        <circle cx="330" cy="195" r="4.5" fill="#c5a059" />

        {/* Doli Base Platform */}
        <path
          d="M135 202 L265 202 L260 214 L140 214 Z"
          fill="url(#vGoldSheen)"
          stroke="#8a6f2e"
          strokeWidth="1"
        />
        {/* Base Carving Lines */}
        <line x1="145" y1="208" x2="255" y2="208" stroke="#8a6f2e" strokeWidth="1" />

        {/* Sheer Velvet Curtains (Behind Pillars) */}
        <path
          d="M148 142 Q 142 165 146 198 L 175 198 Q 170 165 172 142 Z"
          fill="url(#vMaroon)"
          opacity="0.85"
        />
        <path
          d="M225 142 Q 228 165 224 198 L 252 198 Q 256 165 250 142 Z"
          fill="url(#vMaroon)"
          opacity="0.85"
        />
        {/* Center Sheer Drape with Fold Wave */}
        <path
          d="M172 142 Q 198 178 184 198 L 216 198 Q 202 178 225 142 Z"
          fill="#5a0f1d"
          opacity="0.65"
        />

        {/* Four Slim Gold Poles */}
        <rect x="144" y="140" width="4.5" height="62" rx="2" fill="url(#vGoldSheen)" />
        <rect x="166" y="140" width="3.5" height="62" rx="1.5" fill="url(#vGoldSheen)" opacity="0.85" />
        <rect x="230" y="140" width="3.5" height="62" rx="1.5" fill="url(#vGoldSheen)" opacity="0.85" />
        <rect x="251" y="140" width="4.5" height="62" rx="2" fill="url(#vGoldSheen)" />

        {/* Domed Canopy Roof */}
        <path
          d="M136 142 C 140 115, 170 102, 200 102 C 230 102, 260 115, 264 142 Z"
          fill="url(#vMaroon)"
          stroke="url(#vGoldSheen)"
          strokeWidth="2"
        />
        {/* Canopy Gold Crown Arcs */}
        <path
          d="M150 142 C 160 120, 180 110, 200 110 C 220 110, 240 120, 250 142"
          fill="none"
          stroke="url(#vGoldSheen)"
          strokeWidth="1.4"
        />

        {/* Domed Top Kalash / Gold Finial */}
        <ellipse cx="200" cy="100" rx="6" ry="4" fill="url(#vGoldSheen)" />
        <path d="M197 100 L200 90 L203 100 Z" fill="url(#vGoldSheen)" />
        <circle cx="200" cy="89" r="2.5" fill="#fff9e6" />

        {/* Hanging Marigold Garlands along Canopy Trim */}
        {[142, 154, 166, 178, 190, 202, 214, 226, 238, 250, 258].map((x, idx) => (
          <g key={idx}>
            <circle cx={x} cy={144} r="2.2" fill={idx % 2 === 0 ? '#f39c12' : '#e67e22'} />
            <circle cx={x} cy={148} r="1.8" fill={idx % 2 === 0 ? '#e67e22' : '#f1c40f'} />
            <circle cx={x} cy={151.5} r="1.3" fill="#d4af37" />
          </g>
        ))}

        {/* Doli Crest Ornament */}
        <circle cx="200" cy="126" r="5" fill="url(#vGoldSheen)" />
        <circle cx="200" cy="126" r="2.5" fill="#ffffff" />
      </g>

      {/* Drifting Auspicious Rice Grains & Rose Petals */}
      <g opacity="0.85">
        {/* White / Cream Rice Grains (Tiny Ellipses) */}
        <ellipse cx="120" cy="95" rx="3" ry="1.2" fill="#fffef0" transform="rotate(25 120 95)" />
        <ellipse cx="140" cy="65" rx="3" ry="1.2" fill="#fffef0" transform="rotate(-35 140 65)" />
        <ellipse cx="260" cy="70" rx="3.2" ry="1.3" fill="#fffef0" transform="rotate(40 260 70)" />
        <ellipse cx="285" cy="105" rx="2.8" ry="1.2" fill="#fffef0" transform="rotate(-20 285 105)" />
        <ellipse cx="180" cy="45" rx="3" ry="1.2" fill="#fffef0" transform="rotate(15 180 45)" />
        <ellipse cx="225" cy="55" rx="3" ry="1.2" fill="#fffef0" transform="rotate(-15 225 55)" />
        <ellipse cx="100" cy="150" rx="2.6" ry="1.1" fill="#fffef0" transform="rotate(30 100 150)" />
        <ellipse cx="300" cy="160" rx="2.7" ry="1.1" fill="#fffef0" transform="rotate(-25 300 160)" />

        {/* Rose & Marigold Petals */}
        <circle cx="110" cy="115" r="3" fill="#c0392b" opacity="0.8" />
        <circle cx="290" cy="85" r="3.2" fill="#d35400" opacity="0.85" />
        <circle cx="160" cy="80" r="2.6" fill="#e74c3c" opacity="0.75" />
        <circle cx="240" cy="90" r="2.8" fill="#f39c12" opacity="0.85" />
        <circle cx="215" cy="35" r="2.2" fill="#e67e22" opacity="0.7" />

        {/* Rising Golden Dust Sparkles */}
        <circle cx="130" cy="180" r="1.2" fill="#ffeaa7" opacity="0.9" />
        <circle cx="270" cy="175" r="1.5" fill="#ffeaa7" opacity="0.9" />
        <circle cx="190" cy="165" r="1" fill="#ffffff" opacity="0.95" />
        <circle cx="210" cy="170" r="1.3" fill="#ffeaa7" opacity="0.8" />
      </g>
    </svg>
  );
}

export default function VidaaiSection() {
  const { lang, toggle } = useLanguage();
  const prefersReducedMotion = useReducedMotion();

  const isHindi = lang === 'hi';
  const t = content[lang] || content.en;
  const c = t.vidaai;

  if (!c) {
    return null;
  }

  const headingFont = isHindi
    ? 'var(--font-noto-serif-devanagari), var(--font-rozha), serif'
    : 'var(--font-cormorant), Georgia, serif';

  const dateFont = isHindi
    ? 'var(--font-noto-serif-devanagari), serif'
    : 'var(--font-cormorant), Georgia, serif';

  const bodyFont = isHindi
    ? 'var(--font-noto-sans-devanagari), var(--font-hind), sans-serif'
    : 'var(--font-lora), Georgia, serif';

  // Venue is optional: empty by default per invitation
  const vidaaiVenue = venues?.vidaai || {};
  const hasVenue = Boolean(vidaaiVenue.name && vidaaiVenue.name.trim());

  const motionFadeIn = (delay = 0, yOffset = 16) => {
    if (prefersReducedMotion) {
      return { initial: { opacity: 1, y: 0 } };
    }
    return {
      initial: { opacity: 0, y: yOffset },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.5, delay },
    };
  };

  return (
    <section
      id="vidaai"
      aria-label={isHindi ? 'विदाई' : 'Vidaai'}
      className={`${styles.vidaaiSection || ''} vidaai-section`}
    >
      {/* Background Subtle Radial Glow */}
      <div
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_rgba(212,175,55,0.05)_0%,_rgba(13,13,15,0.85)_50%,_rgba(13,13,15,1)_100%)]"
        aria-hidden="true"
      />

      <div className={`${styles.vidaaiContainer || ''} vidaai-container`}>
        {/* ─── 1. Centred Header Block ─── */}
        <div className={`${styles.vidaaiHeader || ''} vidaai-header`}>
          {/* Eyebrow */}
          <motion.div {...motionFadeIn(0, 10)} className={`${styles.vidaaiEyebrowRow || ''} vidaai-eyebrow-row`}>
            <span className={`${styles.vidaaiEyebrowLine || ''} vidaai-eyebrow-line`} aria-hidden="true" />
            <span className={`${styles.vidaaiEyebrowText || ''} vidaai-eyebrow-text`}>{c.eyebrow}</span>
            <span className={`${styles.vidaaiEyebrowLineRight || ''} vidaai-eyebrow-line-right`} aria-hidden="true" />
          </motion.div>

          {/* Title */}
          <motion.h2
            {...motionFadeIn(0.08, 12)}
            className={`${styles.vidaaiTitle || ''} vidaai-title`}
            style={{ fontFamily: headingFont }}
          >
            {c.title}
          </motion.h2>

          {/* Date (no stray underline, lining numerals) */}
          <motion.div {...motionFadeIn(0.14, 10)} className={`${styles.vidaaiDateRow || ''} vidaai-date-row`}>
            <span
              className={`${styles.vidaaiDateText || ''} vidaai-date-text`}
              style={{
                fontFamily: dateFont,
                lineHeight: isHindi ? '1.7' : '1.5',
              }}
            >
              {c.date}
            </span>
          </motion.div>

          {/* Optional Language Toggle Chip matching Bride & Groom section */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={toggle}
              aria-label={isHindi ? 'Switch language to English' : 'भाषा हिन्दी में बदलें'}
              className={`${styles.vidaaiLangToggle || ''} vidaai-lang-toggle`}
            >
              <span className={!isHindi ? 'text-[#c5a059] font-medium' : 'text-white/50'}>EN</span>
              <span className="text-white/30">|</span>
              <span className={isHindi ? 'text-[#c5a059] font-medium' : 'text-white/50'}>हिंदी</span>
            </button>
          </div>
        </div>

        {/* ─── 2. Main Two-Column Layout ─── */}
        <div className={`${styles.vidaaiGrid || ''} vidaai-grid`}>
          {/* Left Column: Info Card */}
          <motion.div {...motionFadeIn(0.2, 16)} className={`${styles.vidaaiInfoCard || ''} vidaai-info-card`}>
            {/* Top Sheen */}
            <div className={`${styles.vidaaiCardSheen || ''} vidaai-card-sheen`} aria-hidden="true" />

            {/* Badge */}
            <div className={`${styles.vidaaiBadge || ''} vidaai-badge`}>
              <span className={`${styles.vidaaiBadgeDot || ''} vidaai-badge-dot`} aria-hidden="true" />
              <span>{c.badge}</span>
            </div>

            {/* Thin Gold Divider */}
            <div className={`${styles.vidaaiDivider || ''} vidaai-divider`} aria-hidden="true" />

            {/* Time Row */}
            <div className={`${styles.vidaaiRow || ''} vidaai-row`}>
              <div className={`${styles.vidaaiIconCol || ''} vidaai-icon-col`} aria-hidden="true">
                <ClockIcon />
              </div>
              <div
                className={`${styles.vidaaiTimeText || ''} vidaai-time-text`}
                style={{ fontFamily: bodyFont }}
              >
                {c.time}
              </div>
            </div>

            {/* Venue Row (Rendered ONLY when venue is provided in config) */}
            {hasVenue && (
              <div className={`${styles.vidaaiRow || ''} vidaai-row`}>
                <div className={`${styles.vidaaiIconCol || ''} vidaai-icon-col`} aria-hidden="true">
                  <PinIcon />
                </div>
                <div>
                  <div
                    className={`${styles.vidaaiVenueName || ''} vidaai-venue-name`}
                    style={{ fontFamily: headingFont }}
                  >
                    {vidaaiVenue.name}
                  </div>
                  {vidaaiVenue.address && (
                    <div
                      className={`${styles.vidaaiVenueAddress || ''} vidaai-venue-address`}
                      style={{ fontFamily: bodyFont }}
                    >
                      {vidaaiVenue.address}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Description */}
            <p
              className={`${styles.vidaaiDesc || ''} vidaai-desc`}
              style={{
                fontFamily: bodyFont,
                lineHeight: isHindi ? '1.75' : '1.65',
              }}
            >
              {c.description}
            </p>

            {/* Pinned Bottom Actions */}
            <div className={`${styles.vidaaiActions || ''} vidaai-actions`}>
              {/* Diamond Divider */}
              <div className={`${styles.vidaaiOrnament || ''} vidaai-ornament`} aria-hidden="true">
                <span className={`${styles.vidaaiOrnamentLine || ''} vidaai-ornament-line`} />
                <span className={`${styles.vidaaiOrnamentDiamond || ''} vidaai-ornament-diamond`} />
                <span className={`${styles.vidaaiOrnamentLine || ''} vidaai-ornament-line`} />
              </div>

              {/* Add to Calendar Button */}
              <button
                type="button"
                className={`${styles.vidaaiBtnPrimary || ''} vidaai-btn-primary`}
                aria-label={c.calendarBtn}
              >
                <CalendarIcon />
                <span>{c.calendarBtn}</span>
              </button>

              {/* View Venue Map Button (ONLY shown when venue is filled) */}
              {hasVenue && (
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    vidaaiVenue.mapQuery || vidaaiVenue.name || ''
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.vidaaiBtnSecondary || ''} vidaai-btn-secondary`}
                  aria-label={c.mapsBtn}
                >
                  <span>{c.mapsBtn}</span>
                  <MapExternalIcon />
                </a>
              )}
            </div>
          </motion.div>

          {/* Right Column: 3D Stage Card */}
          <motion.div {...motionFadeIn(0.25, 16)} className={`${styles.vidaaiStageCard || ''} vidaai-stage-card`}>
            {/* Top Stage Header */}
            <div className={`${styles.vidaaiStageHeader || ''} vidaai-stage-header`}>
              <span className={`${styles.vidaaiStageHeaderLine || ''} vidaai-stage-header-line`} aria-hidden="true" />
              <span className={`${styles.vidaaiStageHeaderLabel || ''} vidaai-stage-header-label`}>
                {c.threeTitle}
              </span>
              <span className={`${styles.vidaaiStageHeaderLine || ''} vidaai-stage-header-line`} aria-hidden="true" />
            </div>

            {/* Canvas / Stage Illustration Area */}
            <div
              className={`${styles.vidaaiStageCanvasArea || ''} vidaai-stage-canvas-area`}
              role="img"
              aria-label={c.threeAlt}
            >
              <VidaaiDawnIllustration />
            </div>

            {/* Bottom Caption */}
            <div className={`${styles.vidaaiStageCaption || ''} vidaai-stage-caption`}>
              <span className={`${styles.vidaaiCaptionText || ''} vidaai-caption-text`}>
                {c.threeHint}
              </span>
            </div>
          </motion.div>
        </div>

        {/* ─── 3. Centred Footer Line ─── */}
        <motion.div {...motionFadeIn(0.3, 12)} className={`${styles.vidaaiFooter || ''} vidaai-footer`}>
          <div className={`${styles.vidaaiFooterInner || ''} vidaai-footer-inner`}>
            <span className={`${styles.vidaaiFooterLineLeft || ''} vidaai-footer-line-left`} aria-hidden="true" />
            <span
              className={`${styles.vidaaiFooterText || ''} vidaai-footer-text`}
              style={{ fontFamily: headingFont }}
            >
              {c.footerLine}
            </span>
            <span className={`${styles.vidaaiFooterLineRight || ''} vidaai-footer-line-right`} aria-hidden="true" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
