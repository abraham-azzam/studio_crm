import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin-guard';

export async function POST(request: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const form = await request.formData();
  const item = await prisma.siteSettings.upsert({
    where: { id: 'site-default' },
    create: {
      id: 'site-default',
      siteName: String(form.get('siteName') ?? ''),
      siteNameAr: String(form.get('siteNameAr') ?? ''),
      taglineEn: String(form.get('taglineEn') ?? ''),
      taglineAr: String(form.get('taglineAr') ?? ''),
      contactEmail: String(form.get('contactEmail') ?? ''),
      footerTextEn: 'Crafted with precision and performance.',
      footerTextAr: 'مصمم بدقة وأداء فائق.'
    },
    update: {
      siteName: String(form.get('siteName') ?? ''),
      siteNameAr: String(form.get('siteNameAr') ?? ''),
      taglineEn: String(form.get('taglineEn') ?? ''),
      taglineAr: String(form.get('taglineAr') ?? ''),
      contactEmail: String(form.get('contactEmail') ?? '')
    }
  });

  return NextResponse.json({ item });
}
