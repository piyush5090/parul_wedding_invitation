'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { MUSIC_SRC } from '@/content/config';

/**
 * useAudio — wraps the native Audio API with:
 * - Graceful fallback when the file is missing (isAvailable = false)
 * - Fade in/out so it never blasts
 * - Auto-pause when the tab is hidden
 * - play/pause state memory
 *
 * @returns {{ isAvailable, isPlaying, toggle, start }}
 */
export function useAudio() {
  const audioRef = useRef(null);
  const [isAvailable, setIsAvailable] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const fadeRef = useRef(null);

  // Probe whether the audio file exists (HEAD request)
  useEffect(() => {
    fetch(MUSIC_SRC, { method: 'HEAD' })
      .then((r) => {
        if (r.ok) {
          const audio = new Audio(MUSIC_SRC);
          audio.loop = true;
          audio.volume = 0;
          audioRef.current = audio;
          setIsAvailable(true);
        }
      })
      .catch(() => setIsAvailable(false));
  }, []);

  // Pause when tab hidden
  useEffect(() => {
    const onVisibility = () => {
      if (!audioRef.current) return;
      if (document.hidden) {
        audioRef.current.pause();
      } else if (isPlaying) {
        audioRef.current.play().catch(() => {});
      }
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, [isPlaying]);

  const fadeTo = useCallback((targetVolume, duration = 1500) => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    const start = audio.volume;
    const diff = targetVolume - start;
    const startTime = performance.now();
    cancelAnimationFrame(fadeRef.current);

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      audio.volume = start + diff * progress;
      if (progress < 1) {
        fadeRef.current = requestAnimationFrame(step);
      } else if (targetVolume === 0) {
        audio.pause();
        setIsPlaying(false);
      }
    }
    fadeRef.current = requestAnimationFrame(step);
  }, []);

  /** Must be called from a user gesture (curtain tap). */
  const start = useCallback(() => {
    if (!audioRef.current || isPlaying) return;
    audioRef.current.volume = 0;
    audioRef.current.play().then(() => {
      fadeTo(0.6);
      setIsPlaying(true);
    }).catch(() => {});
  }, [isPlaying, fadeTo]);

  const toggle = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      fadeTo(0);
    } else {
      audioRef.current.volume = 0;
      audioRef.current.play().then(() => {
        fadeTo(0.6);
        setIsPlaying(true);
      }).catch(() => {});
    }
  }, [isPlaying, fadeTo]);

  return { isAvailable, isPlaying, toggle, start };
}
