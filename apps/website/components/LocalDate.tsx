'use client'

import React from 'react';
import { useCalendar, type CalendarKind } from './CalendarContext';

type DateValue = string | number | Date | null | undefined;

interface LocalDateProps {
  /** A Date, a timestamp, or an ISO date string. Free-text/relative strings are passed through unchanged. */
  value: DateValue;
  /** Shown when there is no usable value at all. */
  fallback?: React.ReactNode;
  className?: string;
  /** Intl formatting options. Defaults to a long date (e.g. ۲۰ خرداد ۱۴۰۵). */
  options?: Intl.DateTimeFormatOptions;
}

const DEFAULT_OPTIONS: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

// Only convert values we can confidently treat as real dates. Free-text Persian
// dates ("۱۴۰۳/۰۵/۱۲") and relative strings ("۱ ساعت پیش") are intentionally left
// alone — there is nothing to recompute for them.
function toDate(value: DateValue): Date | null {
  if (value == null) return null;
  if (value instanceof Date) return isNaN(value.getTime()) ? null : value;
  if (typeof value === 'number') {
    const d = new Date(value);
    return isNaN(d.getTime()) ? null : d;
  }
  const str = value.trim();
  // ISO date / datetime (YYYY-MM-DD[...]) or an all-digit epoch timestamp.
  if (/^\d{4}-\d{2}-\d{2}([T ].*)?$/.test(str) || /^\d{10,}$/.test(str)) {
    const d = new Date(/^\d{10,}$/.test(str) ? Number(str) : str);
    return isNaN(d.getTime()) ? null : d;
  }
  return null;
}

export function formatDate(
  value: DateValue,
  calendar: CalendarKind,
  options: Intl.DateTimeFormatOptions = DEFAULT_OPTIONS,
): string | null {
  const date = toDate(value);
  if (!date) return null;
  return new Intl.DateTimeFormat('fa-IR', {
    calendar: calendar === 'jalali' ? 'persian' : 'gregory',
    ...options,
  }).format(date);
}

/**
 * Renders a date in the calendar (Jalali / Gregorian) the user picked via the
 * header switcher. Non-date strings render as-is; empty values render `fallback`.
 */
const LocalDate: React.FC<LocalDateProps> = ({ value, fallback = null, className, options }) => {
  const { calendar } = useCalendar();
  const formatted = formatDate(value, calendar, options);

  if (formatted) {
    const date = toDate(value)!;
    return (
      // suppressHydrationWarning: a saved preference can flip the calendar after mount.
      <time dateTime={date.toISOString()} className={className} suppressHydrationWarning>
        {formatted}
      </time>
    );
  }

  // Not a real date — show the original text, or the fallback when empty.
  const passthrough = typeof value === 'string' && value.trim() ? value : fallback;
  if (passthrough == null) return null;
  return <span className={className}>{passthrough}</span>;
};

export default LocalDate;
