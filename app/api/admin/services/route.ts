import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin-guard';

export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;
  const items = await prisma.service.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json({ items });
}

export async function POST(request: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;
  const body = await request.json();
  const item = await prisma.service.create({
    data: {
      slug: body.slug,
      titleEn: body.titleEn,
      titleAr: body.titleAr,
      bodyEn: body.bodyEn,
      bodyAr: body.bodyAr,
      excerptEn: body.bodyEn?.slice(0, 160),
      excerptAr: body.bodyAr?.slice(0, 160),
      published: body.published === 'true'
    }
  });
  return NextResponse.json({ item }, { status: 201 });
}
