import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { ThemeShell } from '@/components/layout/theme-shell';
import { isRtl, Locale, locales } from '@/lib/i18n';
import { getSiteSettings, getThemeSettings } from '@/lib/cms';
import { createThemeCssVariables, defaultTheme } from '@/lib/theme';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) {
    return {
      title: 'Luminous Studio',
      description: 'Premium digital studio'
    };
  }

  const typedLocale = locale as Locale;
  const settings = await getSiteSettings();
  const title = typedLocale === 'ar' ? settings?.siteNameAr : settings?.siteName;
  const description = typedLocale === 'ar' ? settings?.taglineAr : settings?.taglineEn;

  return {
    title: title ?? 'Luminous Studio',
    description: description ?? 'Premium digital studio',
    openGraph: {
      title: title ?? 'Luminous Studio',
      description: description ?? 'Premium digital studio',
      locale: typedLocale === 'ar' ? 'ar_SA' : 'en_US'
    }
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const typedLocale = locale as Locale;

  const theme = (await getThemeSettings()) ?? { ...defaultTheme };
  const vars = createThemeCssVariables(theme);

  return (
    <div style={vars} dir={isRtl(typedLocale) ? 'rtl' : 'ltr'}>
      <ThemeShell
        defaultTheme={theme.defaultMode as 'light' | 'dark' | 'system'}
        enableSystem={theme.systemMode}
        darkModeEnabled={theme.darkModeEnabled}
      >
        <Header locale={typedLocale} />
        <main>{children}</main>
      </ThemeShell>
    </div>
  );
}
