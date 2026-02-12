import { ThemeEditor } from '@/components/admin/theme-editor';
import { prisma } from '@/lib/prisma';
import { defaultTheme } from '@/lib/theme';
import { hasDatabaseUrl } from '@/lib/env';

export default async function ThemePage() {
  const theme = hasDatabaseUrl ? await prisma.themeSettings.findFirst() : null;
  return <ThemeEditor initial={(theme ?? defaultTheme) as Record<string, string | number | boolean>} />;
}
