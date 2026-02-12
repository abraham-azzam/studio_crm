import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { AdminShell } from '@/components/admin/admin-shell';

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect('/admin/login');
  }

  return <AdminShell>{children}</AdminShell>;
}
