import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const db = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ─── Admin user ────────────────────────────────────────────────────────────
  const passwordHash = await bcrypt.hash("admin123", 12);
  await db.user.upsert({
    where: { email: "admin@portofolio.local" },
    update: {},
    create: {
      name: "Muhammad Syaban Alfain",
      email: "admin@portofolio.local",
      passwordHash,
      role: "admin",
    },
  });
  console.log("✅ Admin user created: admin@portofolio.local / admin123");

  // ─── Profile ───────────────────────────────────────────────────────────────
  await db.profile.upsert({
    where: { id: "main-profile" },
    update: {},
    create: {
      id: "main-profile",
      fullName: "Muhammad Syaban Alfain",
      headline: "General IT Portfolio",
      shortRole: "IT Support · Web Developer · Network & Server Enthusiast",
      bio: "Saya memiliki minat di bidang teknologi informasi secara umum, mulai dari IT Support, Web Development, Database, Jaringan, Server, hingga dokumentasi teknis. Saya terbiasa mempelajari masalah secara bertahap, membuat solusi, dan mendokumentasikan proses kerja agar mudah dipahami kembali.",
      tagline:
        "Membangun solusi digital, menangani troubleshooting, mengelola jaringan dasar, server, database, dan sistem informasi berbasis web.",
      location: "Indonesia",
      email: "syaban.alfain@example.com",
      phone: "+62 812-3456-7890",
      whatsapp: "6281234567890",
      githubUrl: "https://github.com/syabanalfain",
      linkedinUrl: "https://linkedin.com/in/syabanalfain",
      isAvailable: true,
    },
  });

  // ─── Project categories ────────────────────────────────────────────────────
  const categories = [
    { name: "Web Development", slug: "web-development", sortOrder: 1 },
    { name: "IT Support", slug: "it-support", sortOrder: 2 },
    { name: "Network", slug: "network", sortOrder: 3 },
    { name: "Server", slug: "server", sortOrder: 4 },
    { name: "Database", slug: "database", sortOrder: 5 },
    { name: "Documentation", slug: "documentation", sortOrder: 6 },
    { name: "Cybersecurity Basic", slug: "cybersecurity-basic", sortOrder: 7 },
  ];

  const catMap: Record<string, string> = {};
  for (const cat of categories) {
    const c = await db.projectCategory.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
    catMap[cat.slug] = c.id;
  }
  console.log("✅ Project categories created");

  // ─── Technologies ──────────────────────────────────────────────────────────
  const techNames = [
    "Next.js", "React", "Tailwind CSS", "TypeScript", "PostgreSQL",
    "Supabase", "Prisma", "Ubuntu Server", "Nginx", "Git", "GitHub",
    "Cisco Packet Tracer", "IP Address", "Subnetting", "SSH", "UFW",
    "pg_dump", "Cron", "Linux", "Windows", "Microsoft Office",
  ];
  const techMap: Record<string, string> = {};
  for (const name of techNames) {
    const t = await db.technology.upsert({
      where: { name },
      update: {},
      create: { name },
    });
    techMap[name] = t.id;
  }
  console.log("✅ Technologies created");

  // ─── Projects ──────────────────────────────────────────────────────────────
  const projectsData = [
    {
      categoryId: catMap["web-development"],
      title: "Website Portfolio IT",
      slug: "website-portfolio-it",
      shortDescription: "Website portofolio personal branding bidang IT dengan admin panel dinamis.",
      problem: "Dibutuhkan media profesional untuk menampilkan project, skill, dan pengalaman IT secara terpusat.",
      solution: "Membangun website dengan Next.js dan PostgreSQL yang memungkinkan konten dikelola lewat admin panel.",
      content: "Portofolio dinamis dengan halaman Home, Portfolio, Expertise, About, dan Contact.",
      features: ["Halaman publik responsive", "Admin panel CRUD project & skill", "Form kontak tersimpan ke database", "SEO metadata"],
      technologies: ["Next.js", "Tailwind CSS", "TypeScript", "PostgreSQL", "Prisma"],
      thumbnailUrl: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
      year: 2026, status: "published", isFeatured: true,
      githubUrl: "https://github.com/syabanalfain/portfolio",
    },
    {
      categoryId: catMap["web-development"],
      title: "Sistem CBT Sekolah",
      slug: "sistem-cbt-sekolah",
      shortDescription: "Aplikasi ujian online berbasis web untuk mengelola soal, peserta, dan hasil ujian.",
      problem: "Ujian manual berbasis kertas memakan waktu untuk koreksi dan rawan kesalahan rekap nilai.",
      solution: "Membangun sistem CBT yang mengotomatiskan distribusi soal, pengerjaan, dan penilaian secara real-time.",
      content: "Sistem ujian dengan bank soal, timer, randomisasi soal, dan rekap nilai otomatis.",
      features: ["Bank soal & randomisasi", "Timer ujian otomatis", "Penilaian otomatis", "Rekap nilai & ekspor"],
      technologies: ["Next.js", "PostgreSQL", "Tailwind CSS"],
      thumbnailUrl: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&q=80",
      year: 2025, status: "published", isFeatured: true,
      githubUrl: "https://github.com/syabanalfain/cbt",
    },
    {
      categoryId: catMap["it-support"],
      title: "Dokumentasi Troubleshooting Windows",
      slug: "dokumentasi-troubleshooting-windows",
      shortDescription: "Kumpulan SOP penanganan masalah Windows, driver, dan aplikasi kantor.",
      problem: "Masalah teknis berulang ditangani tanpa panduan baku sehingga waktu penyelesaian tidak konsisten.",
      solution: "Menyusun dokumentasi troubleshooting terstruktur agar penanganan masalah lebih cepat.",
      content: "Panduan langkah demi langkah untuk instalasi driver, perbaikan boot, masalah jaringan, dan konfigurasi Office.",
      features: ["SOP instalasi & driver", "Panduan perbaikan boot", "Checklist maintenance"],
      technologies: ["Windows", "Microsoft Office"],
      thumbnailUrl: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&q=80",
      year: 2025, status: "published", isFeatured: true,
    },
    {
      categoryId: catMap["network"],
      title: "Konfigurasi LAN Sederhana",
      slug: "konfigurasi-lan-sederhana",
      shortDescription: "Perancangan dan simulasi jaringan LAN dengan IP addressing dan subnetting.",
      problem: "Dibutuhkan topologi jaringan yang rapi untuk menghubungkan beberapa perangkat dengan alokasi IP yang efisien.",
      solution: "Merancang topologi LAN dan melakukan simulasi konfigurasi pada Cisco Packet Tracer.",
      content: "Perancangan topologi, alokasi IP address, subnetting, serta konfigurasi switch dan router dasar.",
      features: ["Topologi LAN", "IP addressing & subnetting", "Konfigurasi switch/router", "Uji konektivitas"],
      technologies: ["Cisco Packet Tracer", "IP Address", "Subnetting"],
      thumbnailUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
      year: 2024, status: "published", isFeatured: false,
    },
    {
      categoryId: catMap["server"],
      title: "Setup Ubuntu Server + Nginx",
      slug: "setup-ubuntu-server-nginx",
      shortDescription: "Instalasi dan konfigurasi Ubuntu Server dengan Nginx sebagai web server.",
      problem: "Aplikasi web membutuhkan environment server yang stabil dan aman untuk deployment.",
      solution: "Menyiapkan Ubuntu Server, mengamankan akses SSH, dan mengkonfigurasi Nginx sebagai reverse proxy.",
      content: "Instalasi OS, hardening SSH, konfigurasi firewall UFW, setup Nginx, dan SSL.",
      features: ["Hardening SSH", "Firewall UFW", "Nginx reverse proxy", "SSL"],
      technologies: ["Ubuntu Server", "SSH", "Nginx", "UFW"],
      thumbnailUrl: "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?w=800&q=80",
      year: 2025, status: "published", isFeatured: false,
    },
    {
      categoryId: catMap["database"],
      title: "Backup & Restore PostgreSQL di VPS",
      slug: "backup-restore-postgresql-vps",
      shortDescription: "Strategi backup otomatis dan restore database PostgreSQL pada VPS.",
      problem: "Risiko kehilangan data tinggi tanpa mekanisme backup yang terjadwal dan teruji.",
      solution: "Menerapkan backup otomatis dengan pg_dump dan cron, serta menguji prosedur restore secara berkala.",
      content: "Pembuatan skrip backup, penjadwalan dengan cron, penyimpanan backup, dan uji coba restore.",
      features: ["Backup otomatis pg_dump", "Penjadwalan cron", "Rotasi file backup", "Uji restore"],
      technologies: ["PostgreSQL", "pg_dump", "Cron", "Linux"],
      thumbnailUrl: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80",
      year: 2025, status: "published", isFeatured: false,
    },
  ];

  for (const p of projectsData) {
    const existing = await db.project.findUnique({ where: { slug: p.slug } });
    if (existing) continue;

    const { technologies, features, ...rest } = p;
    await db.project.create({
      data: {
        ...rest,
        features,
        technologies: {
          create: technologies
            .filter((t) => techMap[t])
            .map((t) => ({ technologyId: techMap[t] })),
        },
      },
    });
  }
  console.log("✅ Projects created");

  // ─── Skill categories ──────────────────────────────────────────────────────
  const skillCats = [
    { name: "Frontend Development", slug: "frontend", sortOrder: 1 },
    { name: "Backend & Database", slug: "backend-database", sortOrder: 2 },
    { name: "IT Support", slug: "it-support", sortOrder: 3 },
    { name: "Network & Server", slug: "network-server", sortOrder: 4 },
    { name: "Tools & Documentation", slug: "tools-documentation", sortOrder: 5 },
  ];
  const skillCatMap: Record<string, string> = {};
  for (const sc of skillCats) {
    const c = await db.skillCategory.upsert({
      where: { slug: sc.slug },
      update: {},
      create: sc,
    });
    skillCatMap[sc.slug] = c.id;
  }

  // ─── Skills ────────────────────────────────────────────────────────────────
  const skillsData = [
    { categoryId: skillCatMap["frontend"], name: "HTML & CSS", level: "Intermediate", description: "Struktur dan styling halaman web responsif.", sortOrder: 1 },
    { categoryId: skillCatMap["frontend"], name: "JavaScript", level: "Intermediate", description: "Logika interaktif di sisi klien.", sortOrder: 2 },
    { categoryId: skillCatMap["frontend"], name: "React", level: "Intermediate", description: "Membangun UI berbasis komponen.", sortOrder: 3 },
    { categoryId: skillCatMap["frontend"], name: "Next.js", level: "Intermediate", description: "App Router, Server Components, dan SSR.", sortOrder: 4 },
    { categoryId: skillCatMap["backend-database"], name: "Prisma", level: "Fundamental", description: "ORM untuk PostgreSQL.", sortOrder: 1 },
    { categoryId: skillCatMap["backend-database"], name: "PostgreSQL", level: "Fundamental", description: "Query, relasi, dan manajemen data.", sortOrder: 2 },
    { categoryId: skillCatMap["backend-database"], name: "API Route / Server Action", level: "Fundamental", description: "Endpoint dan mutasi data.", sortOrder: 3 },
    { categoryId: skillCatMap["it-support"], name: "Troubleshooting Windows", level: "Intermediate", description: "Diagnosa dan perbaikan masalah sistem.", sortOrder: 1 },
    { categoryId: skillCatMap["it-support"], name: "Instalasi Software & Driver", level: "Intermediate", description: "Setup perangkat dan aplikasi.", sortOrder: 2 },
    { categoryId: skillCatMap["it-support"], name: "Remote Support", level: "Intermediate", description: "Bantuan teknis jarak jauh.", sortOrder: 3 },
    { categoryId: skillCatMap["network-server"], name: "IP Addressing & Subnetting", level: "Intermediate", description: "Perencanaan alamat jaringan.", sortOrder: 1 },
    { categoryId: skillCatMap["network-server"], name: "DNS, DHCP, NAT", level: "Intermediate", description: "Layanan jaringan dasar.", sortOrder: 2 },
    { categoryId: skillCatMap["network-server"], name: "Mikrotik Basic", level: "Fundamental", description: "Konfigurasi router dasar.", sortOrder: 3 },
    { categoryId: skillCatMap["network-server"], name: "Ubuntu Server & Nginx", level: "Fundamental", description: "Administrasi server Linux.", sortOrder: 4 },
    { categoryId: skillCatMap["tools-documentation"], name: "Git & GitHub", level: "Intermediate", description: "Version control dan kolaborasi.", sortOrder: 1 },
    { categoryId: skillCatMap["tools-documentation"], name: "VS Code", level: "Intermediate", description: "Editor pengembangan.", sortOrder: 2 },
    { categoryId: skillCatMap["tools-documentation"], name: "Technical Documentation", level: "Intermediate", description: "SOP dan panduan teknis.", sortOrder: 3 },
  ];

  for (const s of skillsData) {
    const existing = await db.skill.findFirst({
      where: { name: s.name, categoryId: s.categoryId },
    });
    if (!existing) await db.skill.create({ data: s });
  }
  console.log("✅ Skills created");

  // ─── Experiences ───────────────────────────────────────────────────────────
  const expCount = await db.experience.count();
  if (expCount === 0) {
    await db.experience.createMany({
      data: [
        { title: "Freelance Web Developer", organization: "Mandiri", type: "freelance", startDate: new Date("2025-01-01"), isCurrent: true, description: "Membangun website company profile dan sistem informasi sederhana untuk UMKM dan sekolah menggunakan Next.js dan PostgreSQL." },
        { title: "IT Support (Praktik Kerja)", organization: "PT Teknologi Nusantara", type: "internship", startDate: new Date("2023-07-01"), endDate: new Date("2023-12-31"), isCurrent: false, description: "Menangani troubleshooting perangkat, instalasi software, pemeliharaan jaringan kantor, dan dokumentasi aset IT." },
        { title: "Anggota Divisi Teknologi", organization: "Organisasi Siswa", type: "organization", startDate: new Date("2022-08-01"), endDate: new Date("2023-08-31"), isCurrent: false, description: "Mengelola perangkat acara, dokumentasi, dan dukungan teknis kegiatan sekolah." },
      ],
    });
  }
  console.log("✅ Experiences created");

  // ─── Education ─────────────────────────────────────────────────────────────
  const eduCount = await db.education.count();
  if (eduCount === 0) {
    await db.education.create({
      data: { schoolName: "SMK Negeri 1 Teknologi", major: "Teknik Komputer dan Jaringan", startYear: 2021, endYear: 2024, description: "Mempelajari dasar jaringan komputer, perakitan, troubleshooting, dan administrasi sistem." },
    });
  }

  // ─── Certificates ──────────────────────────────────────────────────────────
  const certCount = await db.certificate.count();
  if (certCount === 0) {
    await db.certificate.createMany({
      data: [
        { title: "Belajar Dasar Pemrograman Web", issuer: "Dicoding", issueDate: new Date("2024-06-01"), credentialUrl: "#", description: "Fundamental HTML, CSS, dan JavaScript untuk web." },
        { title: "Jaringan Komputer Dasar", issuer: "Cisco Networking Academy", issueDate: new Date("2023-11-01"), credentialUrl: "#", description: "Konsep dasar jaringan, IP addressing, dan routing." },
        { title: "Linux System Administration", issuer: "Coursera", issueDate: new Date("2025-02-01"), credentialUrl: "#", description: "Administrasi dasar sistem Linux dan layanan server." },
      ],
    });
  }
  console.log("✅ Education & Certificates created");

  console.log("\n🎉 Seed selesai!");
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect());
