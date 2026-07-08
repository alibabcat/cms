import type { Locale } from './payload';

/** Category value -> display label, keyed by locale. Values match the `category`
 * select field options in apps/backend/src/collections/Courses.ts. */
export const COURSE_CATEGORY_LABELS: Record<string, { fa: string; en: string }> = {
  management: { fa: 'روانشناسی', en: 'Psychology' },
  programming: { fa: 'استراتژی پاندولیسم', en: 'Pendulism Strategy' },
  language: { fa: 'زبان تخصصی', en: 'Technical Language' },
};

export function courseCategoryLabel(category: string, locale: Locale): string | undefined {
  return COURSE_CATEGORY_LABELS[category]?.[locale];
}
