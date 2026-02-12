import { prisma } from '@/lib/prisma';
import { Locale } from '@/lib/i18n';
import { hasDatabaseUrl } from '@/lib/env';

export const getSiteSettings = async () => {
  if (!hasDatabaseUrl) return null;
  try {
    return await prisma.siteSettings.findFirst();
  } catch {
    return null;
  }
};

export const getThemeSettings = async () => {
  if (!hasDatabaseUrl) return null;
  try {
    return await prisma.themeSettings.findFirst();
  } catch {
    return null;
  }
};

export const getPublishedPages = async () => {
  if (!hasDatabaseUrl) return [];
  try {
    return await prisma.page.findMany({
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
  } catch {
    return [];
  }
};

export const localize = (locale: Locale, english: string, arabic: string) =>
  locale === 'ar' ? arabic : english;
