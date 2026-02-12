'use client';

import { ThemeProvider } from 'next-themes';

export function ThemeShell({
  children,
  defaultTheme,
  enableSystem,
  darkModeEnabled
}: {
  children: React.ReactNode;
  defaultTheme: 'light' | 'dark' | 'system';
  enableSystem: boolean;
  darkModeEnabled: boolean;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme={darkModeEnabled ? defaultTheme : 'light'}
      enableSystem={darkModeEnabled && enableSystem}
      forcedTheme={darkModeEnabled ? undefined : 'light'}
      disableTransitionOnChange={false}
    >
      {children}
    </ThemeProvider>
  );
}
