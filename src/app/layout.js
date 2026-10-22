import {
  Cormorant_Garamond,
  Great_Vibes,
  Rozha_One,
  Kalam,
  Hind,
  Lora,
  Noto_Serif_Devanagari,
  Noto_Sans_Devanagari,
} from 'next/font/google';
import { LanguageProvider } from '@/hooks/useLanguage';
import { OG_IMAGE } from '@/content/config';
import './globals.css';

// ─── Fonts ────────────────────────────────────────────────────────────────────
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-great-vibes',
  display: 'swap',
});

const rozha = Rozha_One({
  subsets: ['latin', 'devanagari'],
  weight: ['400'],
  variable: '--font-rozha',
  display: 'swap',
});

const kalam = Kalam({
  subsets: ['latin', 'devanagari'],
  weight: ['300', '400', '700'],
  variable: '--font-kalam',
  display: 'swap',
});

const hind = Hind({
  subsets: ['latin', 'devanagari'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-hind',
  display: 'swap',
});

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-lora',
  display: 'swap',
});

const notoSerifDevanagari = Noto_Serif_Devanagari({
  subsets: ['devanagari'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-noto-serif-devanagari',
  display: 'swap',
});

const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-noto-sans-devanagari',
  display: 'swap',
});

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata = {
  title: 'Parul weds Shubham — 20 November 2026',
  description:
    'With the blessings of our families, we joyfully invite you to the wedding celebration of Parul Sharma & Shubham Sharma on 20 November 2026 at Swarnabhoomi, Aligarh.',
  openGraph: {
    title: 'Parul weds Shubham 💍 — 20 November 2026',
    description:
      'Join us for the wedding of Parul Sharma & Shubham Sharma. 20 November 2026 | Swarnabhoomi, Aligarh.',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Parul & Shubham Wedding',
      },
    ],
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Parul weds Shubham 💍',
    description: '20 November 2026 | Swarnabhoomi, Aligarh',
    images: [OG_IMAGE],
  },
};

export default function RootLayout({ children }) {
  const fontClasses = [
    cormorant.variable,
    greatVibes.variable,
    rozha.variable,
    kalam.variable,
    hind.variable,
    lora.variable,
    notoSerifDevanagari.variable,
    notoSansDevanagari.variable,
  ].join(' ');

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={fontClasses} suppressHydrationWarning>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
