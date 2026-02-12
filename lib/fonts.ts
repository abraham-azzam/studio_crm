import { Inter, Tajawal } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-primary',
  display: 'swap'
});

export const tajawal = Tajawal({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-arabic',
  display: 'swap'
});
