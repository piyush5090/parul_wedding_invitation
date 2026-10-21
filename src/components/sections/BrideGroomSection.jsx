'use client';
import Image from 'next/image';
import { useLanguage } from '@/hooks/useLanguage';
import content from '@/content/content';
import { COUPLE_PHOTOS } from '@/content/config';

/**
 * Outline person icon for portrait frame placeholder (muted gold #8a6f2e)
 */
function PersonPlaceholderIcon() {
  return (
    <svg
      width="48"
      height="58"
      viewBox="0 0 44 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-[#8a6f2e] opacity-85"
      aria-hidden="true"
    >
      <circle cx="22" cy="14" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M6 48C6 37.5 13.2 30.5 22 30.5C30.8 30.5 38 37.5 38 48"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Portrait Frame Component
 * Semicircle top arch: 180px x 240px desktop, 120px x 160px on mobile (<480px)
 * 1px gold border with 6px dark gap, fully visible inside card padding.
 */
function PortraitFrame({ photoSrc, altText }) {
  const hasPhoto = Boolean(photoSrc && photoSrc.trim() !== '');

  return (
    <div
      className="w-[120px] h-[160px] min-[480px]:w-[180px] min-[480px]:h-[240px] p-[6px] bg-[#0d0d0f] border border-[#8a6f2e]/60 shadow-[0_12px_30px_rgba(0,0,0,0.5)] shrink-0"
      style={{
        borderRadius: '9999px 9999px 0 0',
        marginBottom: '20px',
      }}
    >
      <div
        className="relative w-full h-full bg-[#17171a] flex items-center justify-center overflow-hidden"
        style={{ borderRadius: '9999px 9999px 0 0' }}
      >
        {hasPhoto ? (
          <Image
            src={photoSrc}
            alt={altText}
            fill
            sizes="(max-width: 480px) 120px, 180px"
            className="object-cover"
            style={{ objectPosition: 'center 20%' }}
          />
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full select-none bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.06)_0%,_transparent_75%)]">
            <PersonPlaceholderIcon />
          </div>
        )}
      </div>
    </div>
  );
}

export default function BrideGroomSection() {
  const { lang, toggle } = useLanguage();
  const c = content[lang].blessings;
  const isHindi = lang === 'hi';

  const familyFont = isHindi
    ? 'var(--font-noto-sans-devanagari), var(--font-hind), sans-serif'
    : 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

  const nameFont = isHindi
    ? 'var(--font-noto-serif-devanagari), var(--font-rozha), serif'
    : 'var(--font-cormorant), Georgia, serif';

  const closingFont = isHindi
    ? 'var(--font-noto-serif-devanagari), var(--font-lora), serif'
    : 'var(--font-cormorant), Georgia, serif';

  return (
    <section
      id="bride-and-groom"
      aria-label={isHindi ? 'वधू एवं वर परिचय' : 'The Bride & Groom'}
      className="relative w-full bg-[#0d0d0f] text-white selection:bg-[#8a6f2e]/40 selection:text-white border-t border-white/5 overflow-hidden"
      style={{
        paddingTop: '88px',
        paddingBottom: '80px',
      }}
    >
      {/* Soft dark radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_rgba(24,24,28,0.55)_0%,_rgba(13,13,15,1)_85%)]"
        aria-hidden="true"
      />

      {/* ─────────────────────────────────────────────────────────────
          1. Centred Container: width min(1100px, 100% - 48px), margin-inline: auto
          Everything is strictly centred on the page.
          ───────────────────────────────────────────────────────────── */}
      <div
        className="relative z-10 flex flex-col items-center"
        style={{
          width: 'min(1100px, calc(100% - 48px))',
          marginInline: 'auto',
        }}
      >
        {/* ─────────────────────────────────────────────────────────────
            2. Header block: eyebrow -> 12px -> title -> 20px -> toggle -> 44px
            ───────────────────────────────────────────────────────────── */}
        {/* Eyebrow */}
        <div
          className="flex items-center justify-center gap-3 text-center"
          style={{ marginBottom: '12px' }}
        >
          <span className="w-8 sm:w-12 h-[1px] bg-[#8a6f2e]/60 shrink-0" />
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-[#c5a059] font-medium leading-none">
            {c.sectionLabel || (isHindi ? 'सपरिवार सादर आमंत्रण' : 'WITH THE BLESSINGS OF OUR FAMILIES')}
          </span>
          <span className="w-8 sm:w-12 h-[1px] bg-[#8a6f2e]/60 shrink-0" />
        </div>

        {/* Title */}
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-white tracking-wide text-center"
          style={{
            fontFamily: nameFont,
            marginBottom: '20px',
          }}
        >
          {c.heading || (isHindi ? 'वधू एवं वर परिचय' : 'The Bride & Groom')}
        </h2>

        {/* EN | हिंदी Language Toggle */}
        <div style={{ marginBottom: '44px' }} className="flex justify-center">
          <button
            onClick={toggle}
            aria-label={isHindi ? 'Switch language to English' : 'भाषा हिन्दी में बदलें'}
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-[#8a6f2e]/40 hover:border-[#8a6f2e] bg-white/[0.03] text-xs text-white/70 hover:text-white tracking-wider transition-all cursor-pointer select-none"
          >
            <span className={!isHindi ? 'text-[#c5a059] font-medium' : 'text-white/50'}>EN</span>
            <span className="text-white/30">|</span>
            <span className={isHindi ? 'text-[#c5a059] font-medium' : 'text-white/50'}>हिंदी</span>
          </button>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            3. Two equal-height cards: grid-template-columns repeat(2, 1fr), gap 32px
            Under 800px: 1 column, gap 24px
            ───────────────────────────────────────────────────────────── */}
        <div
          className="w-full grid grid-cols-1 min-[800px]:grid-cols-2 gap-6 min-[800px]:gap-8 items-stretch"
          style={{ width: '100%' }}
        >
          {/* ────────────────────────────────────────────────────────
              BRIDE CARD (Left)
              Padding: 36px top, 28px sides, 32px bottom
              ──────────────────────────────────────────────────────── */}
          <article
            className="w-full flex flex-col items-center justify-between bg-white/[0.03] border border-[#8a6f2e]/60 rounded-[28px] shadow-[0_20px_50px_rgba(0,0,0,0.45)] transition-all duration-300 hover:border-[#8a6f2e]/90"
            style={{
              padding: '36px 28px 32px',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
          >
            {/* Top Identity Block */}
            <div className="w-full flex flex-col items-center text-center">
              {/* Photo Arch (gap to label: 20px) */}
              <PortraitFrame
                photoSrc={COUPLE_PHOTOS.bride}
                altText={c.bride.alt || c.bride.name}
              />

              {/* Label Pill (gap to name: 8px) */}
              <span
                className="inline-block text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#c5a059] bg-[#8a6f2e]/10 border border-[#8a6f2e]/60 text-center select-none"
                style={{
                  padding: '6px 18px',
                  lineHeight: '1.2',
                  overflow: 'visible',
                  borderRadius: '9999px',
                  marginBottom: '8px',
                }}
              >
                {c.bride.label}
              </span>

              {/* Name (gap to family block: 24px) */}
              <h3
                className="text-3xl sm:text-4xl max-[480px]:text-[26px] font-light text-white text-center tracking-wide leading-tight"
                style={{
                  fontFamily: nameFont,
                  marginBottom: '24px',
                }}
              >
                {c.bride.name}
              </h3>
            </div>

            {/* Family Details Block (stays completely inside card padding, 18px radius) */}
            <div
              className="w-full bg-[#121215]/85 border border-white/5 flex flex-col items-center text-center"
              style={{
                borderRadius: '18px',
                padding: '22px 20px',
              }}
            >
              {/* Relation Group 1: Grandparents */}
              <div className="w-full text-center">
                <span
                  className="block text-[11px] uppercase tracking-[0.22em] text-[#c5a059] font-medium"
                  style={{ marginBottom: '6px' }}
                >
                  {c.bride.grandparentsLabel}
                </span>
                <p
                  className="text-[15px] sm:text-base text-white/95 leading-relaxed font-light break-words"
                  style={{
                    fontFamily: familyFont,
                    lineHeight: isHindi ? '1.68' : '1.5',
                  }}
                >
                  {c.bride.grandparents}
                </p>
              </div>

              {/* Thin Divider separating the two groups with equal spacing */}
              <div
                className="w-16 h-[1px] bg-[#8a6f2e]/40 mx-auto"
                style={{ marginBlock: '16px' }}
              />

              {/* Relation Group 2: Parents */}
              <div className="w-full text-center">
                <span
                  className="block text-[11px] uppercase tracking-[0.22em] text-[#c5a059] font-medium"
                  style={{ marginBottom: '6px' }}
                >
                  {c.bride.parentsLabel}
                </span>
                <p
                  className="text-[15px] sm:text-base text-white/95 leading-relaxed font-light break-words"
                  style={{
                    fontFamily: familyFont,
                    lineHeight: isHindi ? '1.68' : '1.5',
                  }}
                >
                  {c.bride.parents}
                  {c.bride.city && (
                    <span
                      className="block text-white/70 text-xs sm:text-[13px] tracking-wide font-normal"
                      style={{ marginTop: '4px' }}
                    >
                      ({c.bride.city})
                    </span>
                  )}
                </p>
              </div>
            </div>
          </article>

          {/* ────────────────────────────────────────────────────────
              GROOM CARD (Right)
              Padding: 36px top, 28px sides, 32px bottom
              ──────────────────────────────────────────────────────── */}
          <article
            className="w-full flex flex-col items-center justify-between bg-white/[0.03] border border-[#8a6f2e]/60 rounded-[28px] shadow-[0_20px_50px_rgba(0,0,0,0.45)] transition-all duration-300 hover:border-[#8a6f2e]/90"
            style={{
              padding: '36px 28px 32px',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
          >
            {/* Top Identity Block */}
            <div className="w-full flex flex-col items-center text-center">
              {/* Photo Arch (gap to label: 20px) */}
              <PortraitFrame
                photoSrc={COUPLE_PHOTOS.groom}
                altText={c.groom.alt || c.groom.name}
              />

              {/* Label Pill (gap to name: 8px) */}
              <span
                className="inline-block text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#c5a059] bg-[#8a6f2e]/10 border border-[#8a6f2e]/60 text-center select-none"
                style={{
                  padding: '6px 18px',
                  lineHeight: '1.2',
                  overflow: 'visible',
                  borderRadius: '9999px',
                  marginBottom: '8px',
                }}
              >
                {c.groom.label}
              </span>

              {/* Name (gap to family block: 24px) */}
              <h3
                className="text-3xl sm:text-4xl max-[480px]:text-[26px] font-light text-white text-center tracking-wide leading-tight"
                style={{
                  fontFamily: nameFont,
                  marginBottom: '24px',
                }}
              >
                {c.groom.name}
              </h3>
            </div>

            {/* Family Details Block (stays completely inside card padding, 18px radius) */}
            <div
              className="w-full bg-[#121215]/85 border border-white/5 flex flex-col items-center text-center"
              style={{
                borderRadius: '18px',
                padding: '22px 20px',
              }}
            >
              {/* Relation Group 1: Grandparents */}
              <div className="w-full text-center">
                <span
                  className="block text-[11px] uppercase tracking-[0.22em] text-[#c5a059] font-medium"
                  style={{ marginBottom: '6px' }}
                >
                  {c.groom.grandparentsLabel}
                </span>
                <p
                  className="text-[15px] sm:text-base text-white/95 leading-relaxed font-light break-words"
                  style={{
                    fontFamily: familyFont,
                    lineHeight: isHindi ? '1.68' : '1.5',
                  }}
                >
                  {c.groom.grandparents}
                </p>
              </div>

              {/* Thin Divider separating the two groups with equal spacing */}
              <div
                className="w-16 h-[1px] bg-[#8a6f2e]/40 mx-auto"
                style={{ marginBlock: '16px' }}
              />

              {/* Relation Group 2: Parents */}
              <div className="w-full text-center">
                <span
                  className="block text-[11px] uppercase tracking-[0.22em] text-[#c5a059] font-medium"
                  style={{ marginBottom: '6px' }}
                >
                  {c.groom.parentsLabel}
                </span>
                <p
                  className="text-[15px] sm:text-base text-white/95 leading-relaxed font-light break-words"
                  style={{
                    fontFamily: familyFont,
                    lineHeight: isHindi ? '1.68' : '1.5',
                  }}
                >
                  {c.groom.parents}
                  {c.groom.city && (
                    <span
                      className="block text-white/70 text-xs sm:text-[13px] tracking-wide font-normal"
                      style={{ marginTop: '4px' }}
                    >
                      ({c.groom.city})
                    </span>
                  )}
                </p>
              </div>
            </div>
          </article>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            6. Closing line & ornament: centred, max-width 640px, margin-inline: auto
            ───────────────────────────────────────────────────────────── */}
        <div
          className="w-full text-center flex flex-col items-center"
          style={{
            maxWidth: '640px',
            marginInline: 'auto',
            marginTop: '48px',
          }}
        >
          {/* Centred Diamond Divider with lines on both sides */}
          <div
            className="flex items-center justify-center gap-3 text-center"
            style={{ marginBottom: '14px' }}
          >
            <span className="w-8 sm:w-12 h-[1px] bg-[#8a6f2e]/60 shrink-0" />
            <span className="text-[#c5a059] text-xs leading-none select-none">❖</span>
            <span className="w-8 sm:w-12 h-[1px] bg-[#8a6f2e]/60 shrink-0" />
          </div>

          {/* Centred Italic Closing Line */}
          <p
            className="text-white/75 italic text-base sm:text-lg md:text-xl leading-relaxed text-center"
            style={{
              fontFamily: closingFont,
              textAlign: 'center',
              marginInline: 'auto',
            }}
          >
            &ldquo;{c.closing}&rdquo;
          </p>
        </div>

      </div>
    </section>
  );
}
