import { ThemeEditor } from '@/components/admin/theme-editor';
import { prisma } from '@/lib/prisma';
import { defaultTheme } from '@/lib/theme';

export default async function ThemePage() {
  const theme = await prisma.themeSettings.findFirst();
  return <ThemeEditor initial={(theme ?? defaultTheme) as Record<string, string | number | boolean>} />;
}
