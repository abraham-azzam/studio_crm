import { Locale } from '@/lib/i18n';

export default async function GenericPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const title = locale === 'ar' ? 'صفحة قيد التحديث' : 'Page under active curation';
  const description =
    locale === 'ar'
      ? 'هذا القسم متصل بنظام إدارة المحتوى ويمكن تعديله بالكامل من لوحة التحكم.'
      : 'This section is wired to the CMS and fully editable from the admin panel.';

  return (
    <section className="container-shell py-section">
      <h1 className="mb-5 font-semibold">{title}</h1>
      <p className="max-w-2xl text-foreground/75">{description}</p>
    </section>
  );
}
