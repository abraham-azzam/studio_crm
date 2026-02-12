import { ThemeSettings } from '@prisma/client';

export const defaultTheme: Omit<ThemeSettings, 'id' | 'createdAt' | 'updatedAt'> = {
  primaryColor: '#5B7CFA',
  secondaryColor: '#8A54FF',
  accentColor: '#00C2A8',
  backgroundLight: '#f7f8fc',
  backgroundDark: '#090b16',
  textLight: '#111827',
  textDark: '#F9FAFB',
  logoLight: '/uploads/logo-light.svg',
  logoDark: '/uploads/logo-dark.svg',
  favicon: '/uploads/favicon.ico',
  logoSize: 140,
  fontFamily: 'Inter',
  baseFontSize: 16,
  headingScale: 1.2,
  darkModeEnabled: true,
  defaultMode: 'system',
  systemMode: true,
  buttonRadius: 18,
  sectionSpacing: 120,
  containerWidth: 1200,
  shadowIntensity: 0.65,
  animationSpeed: 1
};

export const createThemeCssVariables = (theme: Omit<ThemeSettings, 'id' | 'createdAt' | 'updatedAt'>) => {
  return {
    '--primary': theme.primaryColor,
    '--secondary': theme.secondaryColor,
    '--accent': theme.accentColor,
    '--background-light': theme.backgroundLight,
    '--background-dark': theme.backgroundDark,
    '--foreground-light': theme.textLight,
    '--foreground-dark': theme.textDark,
    '--radius': `${theme.buttonRadius}px`,
    '--section-spacing': `${theme.sectionSpacing}px`,
    '--container-width': `${theme.containerWidth}px`,
    '--shadow-intensity': `${theme.shadowIntensity}`,
    '--font-size': `${theme.baseFontSize}px`,
    '--heading-scale': `${theme.headingScale}`,
    '--motion-speed': `${theme.animationSpeed}`
  } as React.CSSProperties;
};
