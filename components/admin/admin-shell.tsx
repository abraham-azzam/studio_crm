import Link from 'next/link';

const links = [
  ['Dashboard', '/admin'],
  ['Pages', '/admin/pages'],
  ['Services', '/admin/services'],
  ['Projects', '/admin/projects'],
  ['Blog', '/admin/posts'],
  ['Media', '/admin/media'],
  ['Theme', '/admin/theme'],
  ['Site', '/admin/settings']
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 p-8 md:grid-cols-[240px_1fr]">
        <aside className="rounded-2xl border border-slate-700 bg-slate-900/70 p-5">
          <p className="mb-6 font-semibold">CMS Control</p>
          <nav className="space-y-2 text-sm text-slate-300">
            {links.map(([label, href]) => (
              <Link key={href} href={href} className="block rounded-lg px-3 py-2 hover:bg-slate-800 hover:text-white">
                {label}
              </Link>
            ))}
          </nav>
        </aside>
        <section>{children}</section>
      </div>
    </div>
  );
}
