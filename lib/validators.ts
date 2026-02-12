import { z } from 'zod';

export const themeSchema = z.object({
  primaryColor: z.string(),
  secondaryColor: z.string(),
  accentColor: z.string(),
  backgroundLight: z.string(),
  backgroundDark: z.string(),
  textLight: z.string(),
  textDark: z.string(),
  logoLight: z.string(),
  logoDark: z.string(),
  favicon: z.string(),
  logoSize: z.coerce.number().int().min(40).max(320),
  fontFamily: z.string().min(2),
  baseFontSize: z.coerce.number().int().min(12).max(22),
  headingScale: z.coerce.number().min(1).max(1.8),
  darkModeEnabled: z.coerce.boolean(),
  defaultMode: z.enum(['light', 'dark', 'system']).default('system'),
  systemMode: z.coerce.boolean(),
  buttonRadius: z.coerce.number().int().min(0).max(40),
  sectionSpacing: z.coerce.number().int().min(56).max(200),
  containerWidth: z.coerce.number().int().min(960).max(1600),
  shadowIntensity: z.coerce.number().min(0).max(1),
  animationSpeed: z.coerce.number().min(0.6).max(1.6)
});

export const pageSchema = z.object({
  slug: z.string().min(1),
  titleEn: z.string().min(1),
  titleAr: z.string().min(1),
  excerptEn: z.string().optional().default(''),
  excerptAr: z.string().optional().default(''),
  contentEn: z.string().min(1),
  contentAr: z.string().min(1),
  seoTitleEn: z.string().optional().default(''),
  seoTitleAr: z.string().optional().default(''),
  seoDescEn: z.string().optional().default(''),
  seoDescAr: z.string().optional().default(''),
  published: z.coerce.boolean().default(false)
});
