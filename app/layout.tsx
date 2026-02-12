import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Luminous Studio',
  description: 'Premium digital studio website with enterprise-grade CMS.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}
