'use client';

import { useCallback, useEffect, useState } from 'react';

type Field = { key: string; label: string; type?: 'text' | 'textarea' | 'checkbox' };

export function CrudTable({
  title,
  endpoint,
  fields
}: {
  title: string;
  endpoint: string;
  fields: Field[];
}) {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);

  const load = useCallback(async () => {
    const res = await fetch(endpoint);
    const data = await res.json();
    setItems(data.items ?? []);
  }, [endpoint]);

  useEffect(() => {
    void load();
  }, [load]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload: Record<string, unknown> = Object.fromEntries(formData.entries());

    fields.forEach((field) => {
      if (field.type === 'checkbox') {
        payload[field.key] = formData.get(field.key) === 'on';
      }
    });

    await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    e.currentTarget.reset();
    await load();
  };

  const remove = async (id: string) => {
    await fetch(endpoint, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    await load();
  };

  return (
    <div>
      <h1 className="mb-6 text-3xl font-semibold">{title}</h1>
      <form onSubmit={handleSubmit} className="mb-8 rounded-2xl border border-slate-700 bg-slate-900 p-6">
        <div className="grid gap-4 md:grid-cols-2">
          {fields.map((field) => (
            <label key={field.key} className="text-sm">
              <span className="mb-2 block text-slate-300">{field.label}</span>
              {field.type === 'textarea' ? (
                <textarea name={field.key} className="min-h-24 w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2" />
              ) : field.type === 'checkbox' ? (
                <input type="checkbox" name={field.key} className="h-4 w-4" />
              ) : (
                <input name={field.key} className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2" />
              )}
            </label>
          ))}
        </div>
        <button className="mt-5 rounded-lg bg-indigo-500 px-4 py-2 font-medium text-white">Create</button>
      </form>

      <div className="overflow-x-auto rounded-2xl border border-slate-700 bg-slate-900">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-slate-700 bg-slate-800/50 text-slate-300">
            <tr>
              {fields.map((field) => (
                <th key={field.key} className="px-4 py-3 font-medium">
                  {field.label}
                </th>
              ))}
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={String(item.id)} className="border-b border-slate-800">
                {fields.map((field) => (
                  <td key={field.key} className="max-w-48 truncate px-4 py-3 text-slate-200">
                    {String(item[field.key] ?? '')}
                  </td>
                ))}
                <td className="px-4 py-3">
                  <button
                    onClick={() => remove(String(item.id))}
                    className="rounded bg-rose-600 px-3 py-1 text-xs font-medium text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
