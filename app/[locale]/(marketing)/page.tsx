import { GridCards } from '@/components/sections/grid-cards';
import { Hero } from '@/components/sections/hero';
import { localize } from '@/lib/cms';
import { Locale } from '@/lib/i18n';
import { prisma } from '@/lib/prisma';

const fallback = {
  en: {
    title: 'Building magnetic brands and digital products with world-class craft.',
    subtitle: 'From strategy to product execution, we orchestrate every detail for premium outcomes.'
  },
  ar: {
    title: 'نبني علامات تجارية ومنتجات رقمية بجودة عالمية.',
    subtitle: 'من الاستراتيجية وحتى التنفيذ، نصمم كل تفصيلة لنتائج استثنائية.'
  }
};

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const [home, services] = await Promise.all([
    prisma.page.findUnique({ where: { slug: 'home' } }),
    prisma.service.findMany({ where: { published: true }, take: 3, orderBy: { createdAt: 'desc' } })
  ]);

  const title = home ? localize(locale, home.titleEn, home.titleAr) : fallback[locale].title;
  const subtitle = home
    ? localize(locale, home.excerptEn ?? home.contentEn, home.excerptAr ?? home.contentAr)
    : fallback[locale].subtitle;

  const cards =
    services.length > 0
      ? services.map((service) => ({
          title: localize(locale, service.titleEn, service.titleAr),
          text: localize(locale, service.excerptEn ?? service.bodyEn, service.excerptAr ?? service.bodyAr)
        }))
      : [
          { title: locale === 'ar' ? 'استراتيجية العلامة' : 'Brand Strategy', text: subtitle },
          { title: locale === 'ar' ? 'المنتج الرقمي' : 'Digital Product', text: subtitle },
          { title: locale === 'ar' ? 'أنظمة النمو' : 'Growth Systems', text: subtitle }
        ];

  return (
    <>
      <Hero title={title} subtitle={subtitle} />
      <GridCards items={cards} />
    </>
  );
}
