import './globals.css';
import { inter, tajawal } from '@/lib/fonts';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Luminous Studio',
  description: 'Premium digital studio website with enterprise-grade CMS.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${tajawal.variable} antialiased`}>{children}</body>
    </html>
  );
}
