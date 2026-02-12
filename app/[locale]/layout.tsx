import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import { Header } from '@/components/layout/header';
import { ThemeShell } from '@/components/layout/theme-shell';
import { isRtl, Locale, locales } from '@/lib/i18n';
import { getThemeSettings } from '@/lib/cms';
import { createThemeCssVariables, defaultTheme } from '@/lib/theme';

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
