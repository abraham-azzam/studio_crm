import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { defaultTheme } from '@/lib/theme';

export async function GET() {
  const theme = (await prisma.themeSettings.findFirst()) ?? defaultTheme;
  return NextResponse.json({ theme });
}
