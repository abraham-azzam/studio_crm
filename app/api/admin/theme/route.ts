import { NextRequest, NextResponse } from 'next/server';
import { ThemeMode } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin-guard';
import { themeSchema } from '@/lib/validators';

export async function GET() {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const item = await prisma.themeSettings.findFirst();
  return NextResponse.json({ item });
}

export async function PUT(request: NextRequest) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const parsed = themeSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const payload = parsed.data;

  const item = await prisma.themeSettings.upsert({
    where: { id: 'theme-default' },
    create: {
      id: 'theme-default',
      ...payload,
      defaultMode: payload.defaultMode as ThemeMode
    },
    update: {
      ...payload,
      defaultMode: payload.defaultMode as ThemeMode
    }
  });

  return NextResponse.json({ item });
}
