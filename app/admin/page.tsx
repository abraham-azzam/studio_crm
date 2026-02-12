import { prisma } from '@/lib/prisma';

export default async function AdminDashboardPage() {
  const [pages, services, projects, posts, media] = await Promise.all([
    prisma.page.count(),
    prisma.service.count(),
    prisma.project.count(),
    prisma.post.count(),
    prisma.media.count()
  ]);

  const stats = [
    ['Pages', pages],
    ['Services', services],
    ['Projects', projects],
    ['Posts', posts],
    ['Media', media]
  ];

  return (
    <div>
      <h1 className="mb-6 text-3xl font-semibold">Dashboard Overview</h1>
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map(([label, count]) => (
          <article key={label} className="rounded-2xl border border-slate-700 bg-slate-900 p-5">
            <p className="text-sm text-slate-400">{label}</p>
            <p className="mt-2 text-3xl font-semibold">{count}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
