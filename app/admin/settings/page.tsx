import { prisma } from '@/lib/prisma';
import { hasDatabaseUrl } from '@/lib/env';

export default async function AdminSiteSettings() {
  const settings = hasDatabaseUrl ? await prisma.siteSettings.findFirst() : null;

  return (
    <div>
      <h1 className="mb-6 text-3xl font-semibold">Site Settings</h1>
      <form action="/api/admin/settings" method="post" className="grid gap-4 rounded-2xl border border-slate-700 bg-slate-900 p-6 md:grid-cols-2">
        <input name="siteName" defaultValue={settings?.siteName} placeholder="Site name EN" className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2" />
        <input name="siteNameAr" defaultValue={settings?.siteNameAr} placeholder="Site name AR" className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2" />
        <input name="taglineEn" defaultValue={settings?.taglineEn} placeholder="Tagline EN" className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2" />
        <input name="taglineAr" defaultValue={settings?.taglineAr} placeholder="Tagline AR" className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2" />
        <input name="contactEmail" defaultValue={settings?.contactEmail} placeholder="Email" className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2" />
        <button className="rounded-lg bg-indigo-500 px-4 py-2 font-medium">Save</button>
      </form>
    </div>
  );
}
