import { CrudTable } from '@/components/admin/crud-table';

export default function AdminServices() {
  return (
    <CrudTable
      title="Services CRUD"
      endpoint="/api/admin/services"
      fields={[
        { key: 'slug', label: 'Slug' },
        { key: 'titleEn', label: 'Title EN' },
        { key: 'titleAr', label: 'Title AR' },
        { key: 'bodyEn', label: 'Body EN', type: 'textarea' },
        { key: 'bodyAr', label: 'Body AR', type: 'textarea' },
        { key: 'published', label: 'Published', type: 'checkbox' }
      ]}
    />
  );
}
