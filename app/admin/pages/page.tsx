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
        { key: 'contentEn', label: 'Content EN', type: 'textarea' },
        { key: 'contentAr', label: 'Content AR', type: 'textarea' },
        { key: 'published', label: 'Published', type: 'checkbox' }
      ]}
    />
  );
}
