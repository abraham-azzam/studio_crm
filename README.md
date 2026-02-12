# Luminous Studio CRM / Website

Premium, production-ready multilingual website + CMS with live theme controls.

## Stack
- Next.js App Router
- PostgreSQL + Prisma
- TailwindCSS + Framer Motion
- NextAuth credentials admin auth
- Custom CMS (no external CMS)

## Features
- EN/LTR and AR/RTL routes (`/en`, `/ar`) with locale middleware.
- Admin-only CMS for Pages, Services, Projects, Posts, Media, Theme, Site settings.
- Database-driven theme engine (colors, typography, spacing, radius, dark mode, logos).
- CSS variable updates applied instantly in UI and persisted in DB.
- SSR-friendly metadata + dynamic sitemap + robots.

## Folder Structure

```txt
app/
  [locale]/(marketing)/...      # public site pages
  admin/...                     # CMS dashboard
  api/admin/...                 # CRUD and settings APIs
  api/auth/[...nextauth]        # auth
  api/upload                    # media uploader
components/
  admin/                        # CMS UI
  layout/                       # header/theme shell
  sections/                     # public sections
lib/                            # auth, prisma, i18n, theme utilities
prisma/
  schema.prisma
  seed.ts
```

## Setup
1. Copy env:
   ```bash
   cp .env.example .env
   ```
2. Install packages:
   ```bash
   npm install
   ```
3. Generate Prisma client + migrate:
   ```bash
   npm run prisma:generate
   npx prisma migrate dev --name init
   ```
4. Seed DB:
   ```bash
   npm run prisma:seed
   ```
5. Run app:
   ```bash
   npm run dev
   ```

Default admin credentials after seed:
- Email: `admin@studio.com`
- Password: `Admin@123`

## Production / VPS (Hostinger compatible)
1. Provision Ubuntu VPS with Node 20+, PostgreSQL 15+, Nginx.
2. Clone repo and configure `.env` with production credentials.
3. Run `npm ci && npm run build`.
4. Run DB migrations: `npx prisma migrate deploy`.
5. Start app with PM2:
   ```bash
   pm2 start npm --name studio-crm -- start
   pm2 save
   ```
6. Configure Nginx reverse proxy to `127.0.0.1:3000` and enable TLS (Let's Encrypt).
7. Set backup jobs for Postgres and `/public/uploads`.

## Theme Controls Covered in CMS
- Colors: primary/secondary/accent/background/text for light/dark.
- Logo light/dark + favicon + logo size.
- Typography: font family, base size, heading scale.
- Dark mode controls: enabled/default/system.
- Advanced controls: button radius, section spacing, container width, shadow intensity, animation speed.

