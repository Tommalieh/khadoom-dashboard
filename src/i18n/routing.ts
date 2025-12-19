export const locales = ['ar', 'en'] as const;
export type Locale = (typeof locales)[number];

export function isLocale(v: string): v is Locale {
  return (locales as readonly string[]).includes(v);
}

export function dirForLocale(locale: Locale) {
  return locale === 'ar' ? 'rtl' : 'ltr';
}
