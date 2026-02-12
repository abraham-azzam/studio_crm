export const locales = ['en', 'ar'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const isRtl = (locale: Locale) => locale === 'ar';

export const localeLabels: Record<Locale, string> = {
  en: 'English',
  ar: 'العربية'
};
