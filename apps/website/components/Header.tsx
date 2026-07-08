'use client'

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, TrendingUp, ChevronDown, ChevronRight, Sun, Moon, CalendarDays, Languages, Settings2 } from 'lucide-react';
import { INSTITUTE_NAME } from '@/constants';
import { useTheme } from './ThemeContext';
import { useCalendar, CALENDAR_LABELS } from './CalendarContext';
import { useLanguage, LANGUAGE_LABELS } from './LanguageContext';
import { getRoute } from '@/lib/navigation';
import type { NavMenuItem } from '@/lib/payload';

const HEADER_TEXT = {
  fa: { login: 'ورود به پنل', loginMobile: 'ورود به پنل کاربری', preferences: 'زبان', calendar: 'تقویم', theme: 'تم', dark: 'تیره', light: 'روشن' },
  en: { login: 'Login', loginMobile: 'Login to Dashboard', preferences: 'Language', calendar: 'Calendar', theme: 'Theme', dark: 'Dark', light: 'Light' },
} as const;

const PreferencesMenu: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { calendar, toggleCalendar } = useCalendar();
  const { locale, toggleLanguage } = useLanguage();
  const t = HEADER_TEXT[locale];
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [open]);

  return (
    <div className="relative shrink-0" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-center p-2 rounded-full border border-border bg-surface/50 text-muted hover:text-primary-500 hover:bg-surface transition-all"
        aria-label="Preferences"
        aria-expanded={open ? 'true' : 'false'}
      >
        <Settings2 className="w-4 h-4" />
      </button>

      {open && (
        <div className="absolute top-full mt-2 end-0 w-52 bg-surface border border-border rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] overflow-hidden z-50">
          <button
            type="button"
            onClick={toggleLanguage}
            className="w-full flex items-center justify-between px-4 py-3 text-sm text-muted hover:bg-background hover:text-primary-500 transition-colors border-b border-border"
          >
            <span className="flex items-center gap-2"><Languages className="w-4 h-4" />{t.preferences}</span>
            <span suppressHydrationWarning className="font-medium text-foreground">{LANGUAGE_LABELS[locale]}</span>
          </button>
          <button
            type="button"
            onClick={toggleCalendar}
            className="w-full flex items-center justify-between px-4 py-3 text-sm text-muted hover:bg-background hover:text-primary-500 transition-colors border-b border-border"
          >
            <span className="flex items-center gap-2"><CalendarDays className="w-4 h-4" />{t.calendar}</span>
            <span suppressHydrationWarning className="font-medium text-foreground">{CALENDAR_LABELS[calendar][locale]}</span>
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            className="w-full flex items-center justify-between px-4 py-3 text-sm text-muted hover:bg-background hover:text-primary-500 transition-colors"
          >
            <span className="flex items-center gap-2">{theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}{t.theme}</span>
            <span className="font-medium text-foreground">{theme === 'dark' ? t.dark : t.light}</span>
          </button>
        </div>
      )}
    </div>
  );
};

const Header: React.FC<{ navItems: NavMenuItem[] }> = ({ navItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMobileSub, setActiveMobileSub] = useState<string | null>(null);
  const { locale } = useLanguage();
  const pathname = usePathname();
  const t = HEADER_TEXT[locale];

  const handleNavClick = () => {
    setIsOpen(false);
  };

  const toggleMobileSub = (id: string) => {
    if (activeMobileSub === id) {
        setActiveMobileSub(null);
    } else {
        setActiveMobileSub(id);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full transition-colors duration-300">
      {/* Top Bar Background */}
      <div className="absolute inset-0 bg-background/95 backdrop-blur-md border-b border-border z-50 h-20 shadow-sm transition-colors duration-300"></div>

      <div className="relative z-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center gap-2">
          {/* Logo */}
          <Link href="/" onClick={handleNavClick} className="min-w-0 shrink">
            <div className="flex items-center cursor-pointer min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2 text-primary-500 min-w-0">
                <TrendingUp className="h-7 w-7 sm:h-8 sm:w-8 shrink-0" />
                <span className="font-extrabold text-lg sm:text-2xl tracking-tighter text-foreground truncate">
                  {INSTITUTE_NAME}<span className="text-primary-500">.CO</span>
                </span>
              </div>
            </div>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:gap-4 lg:gap-8">
            {navItems.map((item) => (
              <div key={item.id} className="relative group shrink-0">
                {item.subItems ? (
                  <span className="flex items-center gap-1 whitespace-nowrap text-muted hover:text-primary-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 cursor-pointer">
                    {item.label}
                    <ChevronDown className="w-4 h-4 mt-0.5" />
                  </span>
                ) : (
                  <Link href={getRoute(item.id, locale)} onClick={handleNavClick} className="flex items-center gap-1 whitespace-nowrap text-muted hover:text-primary-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                    {item.label}
                  </Link>
                )}
                
                {/* Dropdown */}
                {item.subItems && (
                    <div className="absolute top-full start-0 w-56 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <div className="bg-surface border border-border rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] overflow-hidden">
                            {item.subItems.map((sub) => (
                                <Link
                                    key={sub.id}
                                    href={getRoute(sub.id, locale)}
                                    onClick={handleNavClick}
                                    className="flex w-full items-center text-start px-4 py-3.5 text-sm text-muted hover:bg-background hover:text-primary-500 border-b border-border last:border-0 transition-colors"
                                >
                                    <ChevronRight className="w-3 h-3 me-2 text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity rtl:rotate-180" />
                                    {sub.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
              </div>
            ))}

            <PreferencesMenu />

            <button type="button" className="shrink-0 whitespace-nowrap bg-gradient-to-r from-primary-500 to-amber-400 text-black font-bold px-6 py-2.5 rounded-lg hover:from-primary-400 hover:to-amber-300 transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:shadow-[0_0_25px_rgba(245,158,11,0.5)] transform active:scale-95">
              {t.login}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-1 shrink-0 md:hidden">
            <PreferencesMenu />
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-muted hover:text-foreground hover:bg-surface focus:outline-none transition-colors"
            >
              {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
      </div>

      {/* Mobile Menu Panel */}
      <div 
        className={`fixed inset-0 z-40 bg-background transform transition-transform duration-300 ease-in-out md:hidden flex flex-col pt-20 h-screen ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-2">
            {navItems.map((item) => (
              <div key={item.id} className="border-b border-border last:border-0 pb-2 mb-2">
                  {item.subItems ? (
                      <div className="bg-surface/30 rounded-xl overflow-hidden">
                          <button
                            type="button"
                            onClick={() => toggleMobileSub(item.id)}
                            className={`w-full flex justify-between items-center text-start px-4 py-4 text-lg font-medium transition-colors ${activeMobileSub === item.id ? 'text-primary-500 bg-surface/50' : 'text-foreground hover:bg-surface/30'}`}
                          >
                            {item.label}
                            <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${activeMobileSub === item.id ? 'rotate-180' : ''}`} />
                          </button>
                          
                          {/* Submenu Animation */}
                          <div className={`transition-all duration-300 overflow-hidden ${activeMobileSub === item.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                              <div className="bg-black/5 dark:bg-black/20 py-2">
                                  {item.subItems.map(sub => (
                                      <Link
                                        key={sub.id}
                                        href={getRoute(sub.id, locale)}
                                        onClick={handleNavClick}
                                        className="flex items-center w-full text-start px-6 py-3 text-base text-muted hover:text-foreground hover:bg-surface/50 transition-colors border-s-2 border-transparent hover:border-primary-500"
                                      >
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary-500 me-3"></div>
                                        {sub.label}
                                      </Link>
                                  ))}
                              </div>
                          </div>
                      </div>
                  ) : (
                    <Link
                        href={getRoute(item.id, locale)}
                        onClick={handleNavClick}
                        className="block w-full text-start px-4 py-4 text-lg font-medium text-foreground hover:text-primary-500 hover:bg-surface/30 rounded-xl transition-all"
                    >
                        {item.label}
                    </Link>
                  )}
              </div>
            ))}
            
            <div className="pt-8 pb-12">
                <button type="button" className="w-full bg-gradient-to-r from-primary-500 to-amber-400 text-black font-bold text-lg px-5 py-4 rounded-xl hover:from-primary-400 hover:to-amber-300 shadow-lg shadow-primary-500/20 active:scale-95 transition-all flex items-center justify-center gap-2">
                    {t.loginMobile}
                    <ChevronRight className="w-5 h-5 rtl:rotate-180" />
                </button>
            </div>
          </div>
      </div>
    </nav>
  );
};

export default Header;