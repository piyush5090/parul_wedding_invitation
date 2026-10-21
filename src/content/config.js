/**
 * ─── GLOBAL CONFIGURATION ───────────────────────────────────────────────────
 * All site-wide settings live here. Change RSVP_PHONE, MUSIC_SRC, HASHTAG,
 * MAP_LINK, etc. without touching any component.
 */

// Audio — if the file is missing the music button is hidden gracefully
export const MUSIC_SRC = '/audio/kesariya.mp3';

// Bride & Groom individual portrait photos for the introduction section
// Leave empty string '' to show the elegant dark panel with outline person icon
export const COUPLE_PHOTOS = {
  bride: '', // e.g. '/images/bride.jpg'
  groom: '', // e.g. '/images/groom.jpg'
};

// RSVP WhatsApp (E.164 format, no spaces)
export const RSVP_PHONE = '919993476309';

// Wedding hashtag
export const HASHTAG = '#ParulWedShubham';

// Main wedding date-time (ISO, IST = UTC+5:30)
export const WEDDING_DATE = new Date('2026-11-20T16:00:00+05:30');

// Baraat arrival time string (used in baraat scene reveal)
export const BARAAT_TIME = '7:00 PM';

// Google Maps link for venue
export const MAP_LINK =
  'https://www.google.com/maps/search/Swarnabhoomi+Khair+Road+Aligarh+UP';

// OG / Social preview image (must be in /public)
export const OG_IMAGE = '/images/couple/couple-09.jpg';

// Feature flags
export const FEATURES = {
  music: true,         // show music button (auto-hides if file missing)
  cursor: true,        // custom marigold cursor on desktop
  threeJs: true,       // 3D petal layer
  baraat: true,        // animated baraat procession
  countdown: true,     // live countdown timer
  rsvp: true,          // RSVP WhatsApp section
  gallery: true,       // gallery section
  addToCalendar: true, // Add to Calendar buttons
};

// Venue overrides (empty string hides street address line)
export const venues = {
  mataPoojan: {
    address: '', // empty by default: shows only "Nij Niwas (Family Residence), Ujjain"
  },
};
