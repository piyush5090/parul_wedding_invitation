import { RSVP_PHONE } from '@/content/config';

/**
 * Opens WhatsApp with a prefilled bilingual RSVP message.
 * @param {string} name - Guest name
 * @param {string} guests - Number of guests
 * @param {string[]} events - List of event names attending
 * @param {'en'|'hi'} lang - Language
 * @param {Function} messageBuilder - content.rsvp.whatsappMessage function
 */
export function openWhatsAppRSVP({ name, guests, events, messageBuilder }) {
  const eventsStr = Array.isArray(events) ? events.join(', ') : events;
  const message = messageBuilder(name, guests, eventsStr);
  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/${RSVP_PHONE}?text=${encoded}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

/** Opens phone dialler */
export function callRSVP() {
  window.location.href = `tel:+${RSVP_PHONE}`;
}
