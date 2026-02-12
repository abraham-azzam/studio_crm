import { writeFile } from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin-guard';

export async function POST(request: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const formData = await request.formData();
  const file = formData.get('file') as File | null;

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filePath = `/uploads/${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
  const outputPath = path.join(process.cwd(), 'public', filePath);
  await writeFile(outputPath, buffer);

  await prisma.media.create({
    data: {
      path: filePath,
      mimeType: file.type,
      size: file.size
    }
  });

  return NextResponse.redirect(new URL('/admin/media', request.url));
}
