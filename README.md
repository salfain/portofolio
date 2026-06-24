# Website Portofolio IT - Muhammad Syaban Alfain

General IT Portfolio berbasis **Next.js App Router**, **TypeScript**, **Tailwind CSS**, **Prisma/PostgreSQL**, **NextAuth**, dan storage S3-compatible/R2. Website ini menampilkan project, skill, pengalaman, sertifikat, kontak, serta admin panel untuk mengelola konten tanpa mengubah kode manual.

## Fitur Utama

- Public pages: Home, Portfolio, Project Detail, Expertise, About, Contact
- Portfolio: filter kategori dan teknologi, featured projects, gallery screenshot
- Contact form: validasi Zod dan penyimpanan pesan ke database
- Admin auth: login credentials dengan NextAuth + Prisma Adapter
- Admin dashboard: ringkasan project, skill, pengalaman, sertifikat, dan pesan
- CRUD admin: project, skill, pengalaman, sertifikat, pesan, settings
- Upload: thumbnail project, gallery project, sertifikat, dan file CV via R2/S3-compatible storage
- SEO dasar: metadata halaman, robots.txt, dan sitemap dari project published
- UI: responsive, dark/light mode, toggle bahasa Indonesia/Inggris

## Tech Stack

- Next.js App Router
- React 19
- TypeScript
- Tailwind CSS v4
- Prisma ORM
- PostgreSQL
- NextAuth v5
- Zod
- Cloudflare R2 atau storage S3-compatible

## Struktur Folder

```text
src/
  app/
    (public)/              Halaman publik
    admin/                 Admin panel
    api/auth/[...nextauth] NextAuth route
    sitemap.ts
    robots.ts
  actions/                 Server actions untuk CRUD dan upload
  components/
    admin/                 Komponen admin panel
    public/                Komponen halaman publik
    ui/                    Button, Badge, Icons, toggle
  data/                    Fallback data statis
  lib/                     Auth, DB, storage, validations, helpers
  types/                   Tipe tampilan
prisma/
  schema.prisma
  seed.ts
```

## Environment Variables

Buat `.env.local`:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
AUTH_SECRET="isi_secret_nextauth"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"

R2_ENDPOINT="https://ACCOUNT_ID.r2.cloudflarestorage.com"
R2_ACCESS_KEY_ID="isi_access_key"
R2_SECRET_ACCESS_KEY="isi_secret_key"
R2_BUCKET_NAME="nama_bucket"
NEXT_PUBLIC_R2_PUBLIC_URL="https://pub-xxxx.r2.dev"
```

## Menjalankan Project

```bash
npm install
npm run db:push
npm run db:seed
npm run dev
```

Buka `http://localhost:3000`.

Default admin dari seed:

```text
Email: admin@portofolio.local
Password: admin123
```

Segera ubah akun/password sebelum deployment publik.

## Script

```bash
npm run dev        # Jalankan development server
npm run build      # Build production
npm run start      # Jalankan hasil build
npm run db:push    # Sinkronkan Prisma schema ke database
npm run db:seed    # Isi data awal
npm run db:studio  # Buka Prisma Studio
```

## Catatan Implementasi

- PRD awal menyebut Supabase, tetapi implementasi folder saat ini memakai Prisma/PostgreSQL, NextAuth, dan R2-compatible storage.
- Halaman publik memakai data database jika tersedia, dengan fallback statis agar project tetap aman saat database belum dikonfigurasi.
- Admin route dilindungi middleware `/admin/*`.
- Project draft tidak ditampilkan di halaman publik dan detail publik hanya membaca project `published`.
