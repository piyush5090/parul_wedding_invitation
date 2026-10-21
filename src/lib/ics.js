/**
 * Generates a downloadable .ics calendar file for a wedding event.
 * @param {Object} event - { id, name, date, time, venue, address }
 */
export function generateICS({ name, dateISO, durationMinutes = 120, venue, address, description }) {
  const start = new Date(dateISO);
  const end = new Date(start.getTime() + durationMinutes * 60000);

  const fmt = (d) =>
    d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  const uid = `${name.replace(/\s/g, '-').toLowerCase()}-parul-shubham-2026@wedding`;

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Parul Shubham Wedding//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `SUMMARY:${name} — Parul & Shubham Wedding`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `LOCATION:${[venue, address].filter(Boolean).join(', ')}`,
    `DESCRIPTION:${description || name + ' — Parul weds Shubham'}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${name.replace(/\s/g, '-').toLowerCase()}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}

/** ISO strings for each event for calendar generation */
export const EVENT_ISO = {
  'mata-pujan':    '2026-11-15T09:30:00+05:30',
  'sneh-bhoj':     '2026-11-15T12:30:00+05:30',
  'lagna-sagaai':  '2026-11-20T16:00:00+05:30',
  'baraat':        '2026-11-20T19:00:00+05:30',
  'ashirwad':      '2026-11-20T19:30:00+05:30',
  'vidai':         '2026-11-21T06:00:00+05:30',
};
