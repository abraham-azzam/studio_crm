import Link from 'next/link';
import { Locale, localeLabels } from '@/lib/i18n';

export function Header({ locale }: { locale: Locale }) {
  const otherLocale: Locale = locale === 'en' ? 'ar' : 'en';

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-background/80 backdrop-blur-xl">
      <div className="container-shell flex h-20 items-center justify-between">
        <Link href={`/${locale}`} className="text-lg font-semibold tracking-tight">
          Luminous Studio
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href={`/${locale}/services`}>Services</Link>
          <Link href={`/${locale}/projects`}>Projects</Link>
          <Link href={`/${locale}/blog`}>Blog</Link>
          <Link
            href={`/${otherLocale}`}
            className="rounded-site border border-primary/30 px-4 py-2 transition hover:border-primary"
          >
            {localeLabels[otherLocale]}
          </Link>
        </nav>
      </div>
    </header>
  );
}
