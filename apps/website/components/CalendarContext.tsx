'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';

export type CalendarKind = 'jalali' | 'gregorian';

interface CalendarContextType {
  calendar: CalendarKind;
  toggleCalendar: () => void;
  setCalendar: (c: CalendarKind) => void;
}

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

export const CalendarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Persian site → Jalali by default. Matches the server-rendered default so the
  // first paint is consistent; a saved preference is applied after mount.
  const [calendar, setCalendar] = useState<CalendarKind>('jalali');

  useEffect(() => {
    const saved = localStorage.getItem('calendar') as CalendarKind | null;
    if (saved === 'jalali' || saved === 'gregorian') {
      setCalendar(saved);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('calendar', calendar);
  }, [calendar]);

  const toggleCalendar = () => {
    setCalendar((prev) => (prev === 'jalali' ? 'gregorian' : 'jalali'));
  };

  return (
    <CalendarContext.Provider value={{ calendar, toggleCalendar, setCalendar }}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
};

/** Human-readable label for each calendar, keyed by site locale. */
export const CALENDAR_LABELS: Record<CalendarKind, { fa: string; en: string }> = {
  jalali: { fa: 'شمسی', en: 'Jalali' },
  gregorian: { fa: 'میلادی', en: 'Gregorian' },
};
