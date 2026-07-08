'use client'

import React, { createContext, useContext, useState } from 'react';
import { usePathname } from 'next/navigation';
import type { Locale } from '@/lib/payload';
import { switchLocalePath } from '@/lib/i18n';

interface LanguageContextType {
  locale: Locale;
  toggleLanguage: () => void;
  setLocale: (l: Locale) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LOCALE_COOKIE = 'locale';
const ONE_YEAR = 60 * 60 * 24 * 365;

export const LanguageProvider: React.FC<{
  /** Locale resolved from the cookie on the server, so first paint matches. */
  initialLocale: Locale;
  children: React.ReactNode;
}> = ({ initialLocale, children }) => {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const pathname = usePathname();

  const applyLocale = (next: Locale) => {
    if (next === locale) return;
    document.cookie = `${LOCALE_COOKIE}=${next};path=/;max-age=${ONE_YEAR};samesite=lax`;
    setLocaleState(next);
    // Full navigation (not router.push) so the root layout actually re-runs
    // on the server: nav items, footer text, and other data fetched up there
    // via headers() can be served stale from the client Router Cache after a
    // soft push, since only the segment that structurally changed is
    // guaranteed a fresh fetch.
    window.location.href = switchLocalePath(pathname, next);
  };

  const toggleLanguage = () => applyLocale(locale === 'fa' ? 'en' : 'fa');

  return (
    <LanguageContext.Provider value={{ locale, toggleLanguage, setLocale: applyLocale }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

/** Short label shown on the switcher button (the language you'd switch *to*). */
export const LANGUAGE_LABELS: Record<Locale, string> = {
  fa: 'فارسی',
  en: 'EN',
};
