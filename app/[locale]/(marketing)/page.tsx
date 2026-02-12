import { GridCards } from '@/components/sections/grid-cards';
import { Hero } from '@/components/sections/hero';
import { Locale } from '@/lib/i18n';

const copy = {
  en: {
    title: 'Building magnetic brands and digital products with world-class craft.',
    subtitle:
      'From strategy to product execution, we orchestrate every detail for premium outcomes.',
    cards: [
      { title: 'Brand Strategy', text: 'Positioning frameworks that make your offer impossible to ignore.' },
      { title: 'Digital Product', text: 'Next-gen experiences engineered for conversion and speed.' },
      { title: 'Growth Systems', text: 'Data-informed optimization loops for sustained momentum.' }
    ]
  },
  ar: {
    title: 'نبني علامات تجارية ومنتجات رقمية بجودة عالمية.',
    subtitle: 'من الاستراتيجية وحتى التنفيذ، نصمم كل تفصيلة لنتائج استثنائية.',
    cards: [
      { title: 'استراتيجية العلامة', text: 'إطار تموضع يجعل عرضك واضحًا ولا يُنسى.' },
      { title: 'المنتج الرقمي', text: 'تجارب حديثة مبنية للأداء والتحويل.' },
      { title: 'أنظمة النمو', text: 'تحسين مستمر قائم على البيانات لنمو مستدام.' }
    ]
  }
};

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const content = copy[locale];

  return (
    <>
      <Hero title={content.title} subtitle={content.subtitle} />
      <GridCards items={content.cards} />
    </>
  );
}
