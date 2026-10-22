'use client';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('wedding_lang');
      if (saved === 'hi' || saved === 'en') {
        setLang(saved);
        if (typeof document !== 'undefined') document.documentElement.lang = saved;
      } else {
        // detect from browser
        const nav = navigator.language || '';
        const detected = nav.startsWith('hi') ? 'hi' : 'en';
        setLang(detected);
        if (typeof document !== 'undefined') document.documentElement.lang = detected;
      }
    } catch (_) {}
  }, []);

  const toggle = useCallback(() => {
    setLang((prev) => {
      const next = prev === 'en' ? 'hi' : 'en';
      try {
        localStorage.setItem('wedding_lang', next);
        if (typeof document !== 'undefined') document.documentElement.lang = next;
      } catch (_) {}
      return next;
    });
  }, []);

  const setLanguage = useCallback((selected) => {
    if (selected === 'en' || selected === 'hi') {
      setLang(selected);
      try {
        localStorage.setItem('wedding_lang', selected);
        if (typeof document !== 'undefined') document.documentElement.lang = selected;
      } catch (_) {}
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, language: lang, toggle, setLanguage, selectLanguage: setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

/** Returns { lang, toggle } */
export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be inside LanguageProvider');
  return ctx;
}

/** Returns the correct content object for current language */
export function useContent() {
  const { lang } = useLanguage();
  // lazy import to avoid circular deps — consumers import content directly
  return lang;
}
