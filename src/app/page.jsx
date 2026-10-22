'use client';
import { useState, useEffect } from 'react';
import ModernIntro from '@/components/intro/ModernIntro';
import ModernNavbar from '@/components/ui/ModernNavbar';
import ModernHero from '@/components/hero/ModernHero';
import BrideGroomSection from '@/components/sections/BrideGroomSection';
import MataPoojanSection from '@/components/sections/MataPoojanSection';
import WeddingCelebrations from '@/components/sections/WeddingCelebrations';
import VidaaiSection from '@/components/sections/VidaaiSection';
import ModernCountdown from '@/components/sections/ModernCountdown';
import ModernRsvpVenue from '@/components/sections/ModernRsvpVenue';
import ModernFooter from '@/components/sections/ModernFooter';
import ModernMusicButton from '@/components/ui/ModernMusicButton';
import LanguageToast from '@/components/ui/LanguageToast';

export default function WeddingPage() {
  const [guestName, setGuestName] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const guest = params.get('to') || params.get('guest') || params.get('name');
      if (guest) {
        setGuestName(guest);
      }
    }
  }, []);

  const handleReplayIntro = () => {
    sessionStorage.removeItem('wedding_intro_seen');
    window.location.reload();
  };

  return (
    <main className="relative min-h-screen bg-[#0E0E10] text-ivory selection:bg-gold-warm selection:text-black overflow-x-hidden">
      {/* Floating Modern Header */}
      <ModernNavbar />

      {/* Floating Sound Controller */}
      <ModernMusicButton />

      {/* Language Selection Toast on Open */}
      <LanguageToast />

      {/* Cinematic Modern Intro */}
      <ModernIntro />

      {/* 1. Hero Showcase */}
      <ModernHero guestName={guestName} />

      {/* 2. Bride & Groom Introduction */}
      <BrideGroomSection />

      {/* 2b. Mata Poojan & Snehbhoj at Bride's Home */}
      <MataPoojanSection />

      {/* 2c. The Wedding Celebrations */}
      <WeddingCelebrations />

      {/* 2d. Vidaai */}
      <VidaaiSection />

      {/* 3. Countdown to Forever */}
      <ModernCountdown />

      {/* 4. Destination & Blessings */}
      <ModernRsvpVenue />

      {/* 8. Modern Footer */}
      <ModernFooter onReplayIntro={handleReplayIntro} />
    </main>
  );
}
