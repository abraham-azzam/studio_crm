import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin-guard';

export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;
  const items = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json({ items });
}

export async function POST(request: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;
  const body = await request.json();
  const item = await prisma.project.create({
    data: {
      slug: String(body.slug),
      titleEn: String(body.titleEn),
      titleAr: String(body.titleAr),
      summaryEn: String(body.summaryEn),
      summaryAr: String(body.summaryAr),
      bodyEn: String(body.bodyEn),
      bodyAr: String(body.bodyAr),
      seoTitleEn: body.seoTitleEn ? String(body.seoTitleEn) : null,
      seoTitleAr: body.seoTitleAr ? String(body.seoTitleAr) : null,
      seoDescEn: body.seoDescEn ? String(body.seoDescEn) : null,
      seoDescAr: body.seoDescAr ? String(body.seoDescAr) : null,
      published: Boolean(body.published)
    }
  });
  return NextResponse.json({ item }, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;
  const { id } = (await request.json()) as { id: string };
  await prisma.project.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
