import { NextRequest, NextResponse } from 'next/server';
import { ThemeMode } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin-guard';

export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;
  const item = await prisma.themeSettings.findFirst();
  return NextResponse.json({ item });
}

export async function PUT(request: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;
  const body = await request.json();

  const item = await prisma.themeSettings.upsert({
    where: { id: 'theme-default' },
    create: {
      id: 'theme-default',
      ...body,
      defaultMode: (body.defaultMode || 'system') as ThemeMode
    },
    update: {
      ...body,
      defaultMode: (body.defaultMode || 'system') as ThemeMode
    }
  });

  return NextResponse.json({ item });
}
