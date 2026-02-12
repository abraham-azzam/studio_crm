import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
  const urls = ['en', 'ar'].flatMap((locale) => ['', 'services', 'projects', 'blog', 'contact'].map((p) => `/${locale}/${p}`.replace(/\/$/, '')));
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `<url><loc>${baseUrl}${url || '/'}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`
  )
  .join('\n')}
</urlset>`;

  return new NextResponse(xml, { headers: { 'Content-Type': 'application/xml' } });
}
