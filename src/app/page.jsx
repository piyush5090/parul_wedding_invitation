'use client';
import { useState, useEffect } from 'react';
import ModernIntro from '@/components/intro/ModernIntro';
import ModernNavbar from '@/components/ui/ModernNavbar';
import ModernHero from '@/components/hero/ModernHero';
import BrideGroomSection from '@/components/sections/BrideGroomSection';
import MataPoojanSection from '@/components/sections/MataPoojanSection';
import CoupleStorySection from '@/components/sections/CoupleStorySection';
import ModernCountdown from '@/components/sections/ModernCountdown';
import ModernEvents from '@/components/sections/ModernEvents';
import ModernGallery from '@/components/sections/ModernGallery';
import ModernRsvpVenue from '@/components/sections/ModernRsvpVenue';
import ModernFooter from '@/components/sections/ModernFooter';
import ModernMusicButton from '@/components/ui/ModernMusicButton';

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

      {/* Cinematic Modern Intro */}
      <ModernIntro />

      {/* 1. Hero Showcase */}
      <ModernHero guestName={guestName} />

      {/* 2. Bride & Groom Introduction */}
      <BrideGroomSection />

      {/* 2b. Mata Poojan & Snehbhoj at Bride's Home */}
      <MataPoojanSection />

      {/* 3. Meet the Bride & Groom (Our Story) */}
      <CoupleStorySection />

      {/* 4. Countdown to Forever */}
      <ModernCountdown />

      {/* 5. Celebrations & Itinerary with Three.js 3D Animations */}
      <ModernEvents />

      {/* 6. Visual Diary (Couple Gallery with Lightbox) */}
      <ModernGallery />

      {/* 7. Destination & Instant WhatsApp RSVP */}
      <ModernRsvpVenue />

      {/* 8. Modern Footer */}
      <ModernFooter onReplayIntro={handleReplayIntro} />
    </main>
  );
}
