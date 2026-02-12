import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('Admin@123', 10);

  await prisma.user.upsert({
    where: { email: 'admin@studio.com' },
    create: {
      name: 'Admin',
      email: 'admin@studio.com',
      passwordHash
    },
    update: { passwordHash }
  });

  await prisma.themeSettings.upsert({
    where: { id: 'theme-default' },
    create: {
      id: 'theme-default',
      primaryColor: '#5B7CFA',
      secondaryColor: '#8A54FF',
      accentColor: '#00C2A8',
      backgroundLight: '#f7f8fc',
      backgroundDark: '#090b16',
      textLight: '#111827',
      textDark: '#f9fafb',
      logoLight: '/uploads/logo-light.svg',
      logoDark: '/uploads/logo-dark.svg',
      favicon: '/uploads/favicon.ico'
    },
    update: {}
  });

  await prisma.siteSettings.upsert({
    where: { id: 'site-default' },
    create: {
      id: 'site-default',
      siteName: 'Luminous Studio',
      siteNameAr: 'لومينوس ستوديو',
      taglineEn: 'We design category-defining digital experiences.',
      taglineAr: 'نصمم تجارب رقمية تصنع الفارق في السوق.',
      contactEmail: 'hello@luminous.studio',
      footerTextEn: 'Crafted with precision and performance.',
      footerTextAr: 'مصمم بدقة وأداء فائق.'
    },
    update: {}
  });

  await prisma.page.createMany({
    data: [
      {
        slug: 'home',
        titleEn: 'Designing Tomorrow\'s Digital Leaders',
        titleAr: 'نصنع قادة العالم الرقمي في الغد',
        excerptEn: 'A premium product and brand studio for ambitious companies.',
        excerptAr: 'استوديو متكامل للمنتج والهوية للشركات الطموحة.',
        contentEn: 'We blend strategic clarity with cinematic interaction systems.',
        contentAr: 'نمـزج وضوح الاستراتيجية مع أنظمة تفاعل سينمائية.',
        published: true
      }
    ],
    skipDuplicates: true
  });
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
