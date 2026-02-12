import { CrudTable } from '@/components/admin/crud-table';

export default function AdminPages() {
  return (
    <CrudTable
      title="Pages CRUD"
      endpoint="/api/admin/pages"
      fields={[
        { key: 'slug', label: 'Slug' },
        { key: 'titleEn', label: 'Title EN' },
        { key: 'titleAr', label: 'Title AR' },
        { key: 'excerptEn', label: 'Excerpt EN' },
        { key: 'excerptAr', label: 'Excerpt AR' },
        { key: 'contentEn', label: 'Content EN', type: 'textarea' },
        { key: 'contentAr', label: 'Content AR', type: 'textarea' },
        { key: 'seoTitleEn', label: 'SEO Title EN' },
        { key: 'seoTitleAr', label: 'SEO Title AR' },
        { key: 'seoDescEn', label: 'SEO Desc EN' },
        { key: 'seoDescAr', label: 'SEO Desc AR' },
        { key: 'published', label: 'Published', type: 'checkbox' }
      ]}
    />
  );
}
