import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin-guard';

export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;
  const items = await prisma.media.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json({ items });
}

export async function DELETE(request: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;
  const { id } = await request.json();
  await prisma.media.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
