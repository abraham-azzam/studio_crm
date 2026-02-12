import { prisma } from '@/lib/prisma';
import { hasDatabaseUrl } from '@/lib/env';

export default async function AdminMediaPage() {
  const media = hasDatabaseUrl ? await prisma.media.findMany({ orderBy: { createdAt: 'desc' } }) : [];

  return (
    <div>
      <h1 className="mb-6 text-3xl font-semibold">Media Manager</h1>
      <form action="/api/upload" method="post" encType="multipart/form-data" className="mb-6 rounded-2xl border border-slate-700 bg-slate-900 p-5">
        <input type="file" name="file" className="text-sm" required />
        <button className="ml-4 rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium">Upload</button>
      </form>
      <div className="grid gap-3 md:grid-cols-3">
        {media.map((asset) => (
          <article key={asset.id} className="rounded-xl border border-slate-700 bg-slate-900 p-4 text-sm">
            <p className="truncate">{asset.path}</p>
            <p className="text-slate-400">{asset.mimeType}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
