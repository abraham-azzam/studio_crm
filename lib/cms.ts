import { prisma } from '@/lib/prisma';
import { Locale } from '@/lib/i18n';

export const getSiteSettings = async () => {
  const settings = await prisma.siteSettings.findFirst();
  return settings;
};

export const getThemeSettings = async () => {
  const theme = await prisma.themeSettings.findFirst();
  return theme;
};

export const getPublishedPages = async (locale: Locale) => {
  return prisma.page.findMany({
    where: { published: true },
    orderBy: { createdAt: 'asc' },
    select: {
      id: true,
      slug: true,
      titleEn: true,
      titleAr: true,
      excerptEn: true,
      excerptAr: true,
      contentEn: true,
      contentAr: true
    }
  });
};

export const localize = (locale: Locale, english: string, arabic: string) =>
  locale === 'ar' ? arabic : english;
