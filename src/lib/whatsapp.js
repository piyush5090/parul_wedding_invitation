import { RSVP_PHONE } from '@/content/config';

/**
 * Opens WhatsApp with a prefilled blessings or RSVP message.
 * @param {string} name - Guest name
 * @param {string} [message] - Blessing message
 * @param {Function} [messageBuilder] - content.rsvp.whatsappMessage function
 */
export function openWhatsAppRSVP({ name, message, guests, events, messageBuilder }) {
  let text = '';
  if (typeof messageBuilder === 'function') {
    text = messageBuilder(name, message, guests, events);
  } else if (message) {
    text = `Namaste 🙏\n${message}\n\n— *${name}*`;
  } else {
    text = `Namaste 🙏\nWith love and blessings from *${name}* for Parul & Shubham! 🌸`;
  }
  const encoded = encodeURIComponent(text);
  const url = `https://wa.me/${RSVP_PHONE}?text=${encoded}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

/** Opens phone dialler */
export function callRSVP() {
  window.location.href = `tel:+${RSVP_PHONE}`;
}

