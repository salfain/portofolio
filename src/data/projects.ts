import type { Project, ProjectCategory } from "@/types";

export const projectCategories: ("All" | ProjectCategory)[] = [
  "All",
  "Web Development",
  "IT Support",
  "Network",
  "Server",
  "Database",
  "Documentation",
  "Cybersecurity Basic",
];

export const projects: Project[] = [
  {
    id: "p-1",
    title: "Website Portfolio IT",
    slug: "website-portfolio-it",
    category: "Web Development",
    shortDescription:
      "Website portofolio personal branding bidang IT dengan admin panel dinamis.",
    problem:
      "Dibutuhkan media profesional untuk menampilkan project, skill, dan pengalaman IT secara terpusat dan mudah diperbarui.",
    solution:
      "Membangun website dengan Next.js dan Supabase yang memungkinkan konten dikelola lewat admin panel tanpa mengubah kode.",
    content:
      "Portofolio dinamis dengan halaman Home, Portfolio, Expertise, About, dan Contact. Terintegrasi dengan database untuk project dan skill, serta storage untuk gambar dan CV.",
    features: [
      "Halaman publik responsive",
      "Admin panel CRUD project & skill",
      "Form kontak tersimpan ke database",
      "SEO metadata di setiap halaman",
    ],
    thumbnailUrl:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
    images: [
      {
        url: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&q=80",
        caption: "Tampilan halaman utama",
      },
    ],
    technologies: ["Next.js", "Supabase", "Tailwind CSS", "TypeScript"],
    year: 2026,
    demoUrl: "#",
    githubUrl: "https://github.com/syabanalfain/portfolio",
    isFeatured: true,
  },
  {
    id: "p-2",
    title: "Sistem CBT Sekolah",
    slug: "sistem-cbt-sekolah",
    category: "Web Development",
    shortDescription:
      "Aplikasi ujian online berbasis web untuk mengelola soal, peserta, dan hasil ujian.",
    problem:
      "Ujian manual berbasis kertas memakan waktu untuk koreksi dan rawan kesalahan rekap nilai.",
    solution:
      "Membangun sistem CBT yang mengotomatiskan distribusi soal, pengerjaan, dan penilaian secara real-time.",
    content:
      "Sistem ujian dengan bank soal, timer, randomisasi soal, dan rekap nilai otomatis untuk admin dan guru.",
    features: [
      "Bank soal & randomisasi",
      "Timer ujian otomatis",
      "Penilaian otomatis",
      "Rekap nilai & ekspor",
    ],
    thumbnailUrl:
      "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&q=80",
    images: [
      {
        url: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=1200&q=80",
        caption: "Dashboard ujian",
      },
    ],
    technologies: ["Next.js", "PostgreSQL", "Tailwind CSS"],
    year: 2025,
    githubUrl: "https://github.com/syabanalfain/cbt",
    isFeatured: true,
  },
  {
    id: "p-3",
    title: "Dokumentasi Troubleshooting Windows",
    slug: "dokumentasi-troubleshooting-windows",
    category: "IT Support",
    shortDescription:
      "Kumpulan SOP penanganan masalah Windows, driver, dan aplikasi kantor.",
    problem:
      "Masalah teknis berulang sering ditangani tanpa panduan baku sehingga waktu penyelesaian tidak konsisten.",
    solution:
      "Menyusun dokumentasi troubleshooting terstruktur agar penanganan masalah lebih cepat dan seragam.",
    content:
      "Panduan langkah demi langkah untuk instalasi driver, perbaikan boot, masalah jaringan, dan konfigurasi Office.",
    features: [
      "SOP instalasi & driver",
      "Panduan perbaikan boot",
      "Checklist maintenance",
      "Format mudah dibaca",
    ],
    thumbnailUrl:
      "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&q=80",
    images: [
      {
        url: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=1200&q=80",
        caption: "Dokumentasi SOP",
      },
    ],
    technologies: ["Windows", "Driver", "Microsoft Office"],
    year: 2025,
    isFeatured: true,
  },
  {
    id: "p-4",
    title: "Konfigurasi LAN Sederhana",
    slug: "konfigurasi-lan-sederhana",
    category: "Network",
    shortDescription:
      "Perancangan dan simulasi jaringan LAN dengan IP addressing dan subnetting.",
    problem:
      "Dibutuhkan topologi jaringan yang rapi untuk menghubungkan beberapa perangkat dengan alokasi IP yang efisien.",
    solution:
      "Merancang topologi LAN dan melakukan simulasi konfigurasi pada Cisco Packet Tracer.",
    content:
      "Perancangan topologi, alokasi IP address, subnetting, serta konfigurasi switch dan router dasar.",
    features: [
      "Topologi LAN",
      "IP addressing & subnetting",
      "Konfigurasi switch/router",
      "Uji konektivitas",
    ],
    thumbnailUrl:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
    images: [
      {
        url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80",
        caption: "Topologi jaringan",
      },
    ],
    technologies: ["Cisco Packet Tracer", "IP Address", "Subnetting"],
    year: 2024,
    isFeatured: false,
  },
  {
    id: "p-5",
    title: "Setup Ubuntu Server + Nginx",
    slug: "setup-ubuntu-server-nginx",
    category: "Server",
    shortDescription:
      "Instalasi dan konfigurasi Ubuntu Server dengan Nginx sebagai web server.",
    problem:
      "Aplikasi web membutuhkan environment server yang stabil dan aman untuk deployment.",
    solution:
      "Menyiapkan Ubuntu Server, mengamankan akses SSH, dan mengkonfigurasi Nginx sebagai reverse proxy.",
    content:
      "Instalasi OS, hardening SSH, konfigurasi firewall UFW, setup Nginx, dan SSL dengan Let's Encrypt.",
    features: [
      "Hardening SSH",
      "Firewall UFW",
      "Nginx reverse proxy",
      "SSL Let's Encrypt",
    ],
    thumbnailUrl:
      "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?w=800&q=80",
    images: [
      {
        url: "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?w=1200&q=80",
        caption: "Terminal konfigurasi server",
      },
    ],
    technologies: ["Ubuntu", "SSH", "Nginx", "UFW"],
    year: 2025,
    isFeatured: false,
  },
  {
    id: "p-6",
    title: "Backup & Restore PostgreSQL di VPS",
    slug: "backup-restore-postgresql-vps",
    category: "Database",
    shortDescription:
      "Strategi backup otomatis dan restore database PostgreSQL pada VPS.",
    problem:
      "Risiko kehilangan data tinggi tanpa mekanisme backup yang terjadwal dan teruji.",
    solution:
      "Menerapkan backup otomatis dengan pg_dump dan cron, serta menguji prosedur restore secara berkala.",
    content:
      "Pembuatan skrip backup, penjadwalan dengan cron, penyimpanan backup, dan uji coba restore.",
    features: [
      "Backup otomatis pg_dump",
      "Penjadwalan cron",
      "Rotasi file backup",
      "Uji restore",
    ],
    thumbnailUrl:
      "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80",
    images: [
      {
        url: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=1200&q=80",
        caption: "Proses backup database",
      },
    ],
    technologies: ["PostgreSQL", "pg_dump", "Cron", "Linux"],
    year: 2025,
    isFeatured: false,
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects() {
  return projects.filter((p) => p.isFeatured);
}
