import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin-guard';
import { pageSchema } from '@/lib/validators';

export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const items = await prisma.page.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json({ items });
}

export async function POST(request: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const parsed = pageSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  const body = parsed.data;
  const item = await prisma.page.create({
    data: {
      slug: body.slug,
      titleEn: body.titleEn,
      titleAr: body.titleAr,
      contentEn: body.contentEn,
      contentAr: body.contentAr,
      excerptEn: body.excerptEn || body.contentEn.slice(0, 160),
      excerptAr: body.excerptAr || body.contentAr.slice(0, 160),
      seoTitleEn: body.seoTitleEn,
      seoTitleAr: body.seoTitleAr,
      seoDescEn: body.seoDescEn,
      seoDescAr: body.seoDescAr,
      published: body.published
    }
  });

  return NextResponse.json({ item }, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const { id } = (await request.json()) as { id: string };
  await prisma.page.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
