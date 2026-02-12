import { CrudTable } from '@/components/admin/crud-table';

export default function AdminProjects() {
  return (
    <CrudTable
      title="Projects CRUD"
      endpoint="/api/admin/projects"
      fields={[
        { key: 'slug', label: 'Slug' },
        { key: 'titleEn', label: 'Title EN' },
        { key: 'titleAr', label: 'Title AR' },
        { key: 'summaryEn', label: 'Summary EN' },
        { key: 'summaryAr', label: 'Summary AR' },
        { key: 'bodyEn', label: 'Body EN', type: 'textarea' },
        { key: 'bodyAr', label: 'Body AR', type: 'textarea' },
        { key: 'published', label: 'Published', type: 'checkbox' }
      ]}
    />
  );
}
