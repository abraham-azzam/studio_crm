import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { ThemeShell } from '@/components/layout/theme-shell';
import { isRtl, Locale, locales } from '@/lib/i18n';
import { getSiteSettings, getThemeSettings } from '@/lib/cms';
import { createThemeCssVariables, defaultTheme } from '@/lib/theme';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const settings = await getSiteSettings();
  const title = locale === 'ar' ? settings?.siteNameAr : settings?.siteName;
  const description = locale === 'ar' ? settings?.taglineAr : settings?.taglineEn;

  return {
    title: title ?? 'Luminous Studio',
    description: description ?? 'Premium digital studio',
    openGraph: {
      title: title ?? 'Luminous Studio',
      description: description ?? 'Premium digital studio',
      locale: locale === 'ar' ? 'ar_SA' : 'en_US'
    }
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale)) notFound();

  const theme = (await getThemeSettings()) ?? { ...defaultTheme };
  const vars = createThemeCssVariables(theme);

  return (
    <div style={vars} dir={isRtl(locale) ? 'rtl' : 'ltr'}>
      <ThemeShell
        defaultTheme={theme.defaultMode as 'light' | 'dark' | 'system'}
        enableSystem={theme.systemMode}
        darkModeEnabled={theme.darkModeEnabled}
      >
        <Header locale={locale} />
        <main>{children}</main>
      </ThemeShell>
    </div>
  );
}
