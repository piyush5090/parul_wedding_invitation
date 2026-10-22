'use client';
import { useState, useEffect, useCallback } from 'react';
import { MUSIC_SRC } from '@/content/config';

/**
 * Global audio singleton:
 * Ensures all components (ModernMusicButton, ModernIntro, etc.)
 * share the exact same audio element, state, and auto-play logic.
 */
let globalAudio = null;
let globalIsAvailable = false;
let globalIsPlaying = false;
let globalFadeRef = null;
let listeners = new Set();
let initialized = false;

function notifyListeners() {
  listeners.forEach((listener) => {
    listener({
      isAvailable: globalIsAvailable,
      isPlaying: globalIsPlaying,
    });
  });
}

function fadeTo(targetVolume, duration = 1500) {
  if (!globalAudio) return;
  const audio = globalAudio;
  const start = audio.volume;
  const diff = targetVolume - start;
  const startTime = performance.now();

  if (globalFadeRef) {
    cancelAnimationFrame(globalFadeRef);
    globalFadeRef = null;
  }

  function step(now) {
    const elapsed = Math.max(0, now - startTime);
    const progress = Math.min(elapsed / duration, 1);
    const nextVol = start + diff * progress;
    audio.volume = Math.max(0, Math.min(1, nextVol));

    if (progress < 1) {
      globalFadeRef = requestAnimationFrame(step);
    } else {
      globalFadeRef = null;
      if (targetVolume === 0) {
        audio.pause();
        audio.volume = 0;
        globalIsPlaying = false;
        notifyListeners();
      }
    }
  }

  globalFadeRef = requestAnimationFrame(step);
}

function playAudio() {
  if (!globalAudio) return Promise.reject(new Error('No audio element'));
  globalAudio.volume = 0;
  return globalAudio.play().then(() => {
    globalIsPlaying = true;
    notifyListeners();
    fadeTo(0.6, 1200);
  });
}

function initGlobalAudio() {
  if (initialized || typeof window === 'undefined') return;
  initialized = true;

  fetch(MUSIC_SRC, { method: 'HEAD' })
    .then((r) => {
      if (r.ok) {
        const audio = new Audio(MUSIC_SRC);
        audio.loop = true;
        audio.volume = 0;
        audio.preload = 'auto';
        globalAudio = audio;
        globalIsAvailable = true;
        notifyListeners();

        // 1. Try to autoplay immediately
        playAudio().catch(() => {
          // 2. If autoplay policy blocked it, start on the first user interaction
          const unlock = () => {
            if (globalAudio && !globalIsPlaying) {
              playAudio().catch(() => {});
            }
            cleanup();
          };

          const events = ['click', 'touchstart', 'pointerdown', 'scroll', 'keydown'];
          const cleanup = () => {
            events.forEach((ev) => window.removeEventListener(ev, unlock));
          };

          events.forEach((ev) =>
            window.addEventListener(ev, unlock, { once: true, passive: true })
          );
        });
      }
    })
    .catch(() => {
      globalIsAvailable = false;
      notifyListeners();
    });

  // Pause when browser tab is hidden
  const onVisibility = () => {
    if (!globalAudio) return;
    if (document.hidden) {
      if (globalIsPlaying) {
        globalAudio.pause();
      }
    } else if (globalIsPlaying) {
      globalAudio.play().catch(() => {});
    }
  };
  document.addEventListener('visibilitychange', onVisibility);
}

export function useAudio() {
  const [state, setState] = useState({
    isAvailable: globalIsAvailable,
    isPlaying: globalIsPlaying,
  });

  useEffect(() => {
    initGlobalAudio();

    const listener = (newState) => {
      setState(newState);
    };

    listeners.add(listener);
    // Sync current state immediately
    setState({
      isAvailable: globalIsAvailable,
      isPlaying: globalIsPlaying,
    });

    return () => {
      listeners.delete(listener);
    };
  }, []);

  const start = useCallback(() => {
    if (!globalAudio || globalIsPlaying) return;
    playAudio().catch(() => {});
  }, []);

  const toggle = useCallback(() => {
    if (!globalAudio) return;
    if (globalIsPlaying) {
      fadeTo(0, 800);
    } else {
      playAudio().catch(() => {});
    }
  }, []);

  return {
    isAvailable: state.isAvailable,
    isPlaying: state.isPlaying,
    toggle,
    start,
  };
}
