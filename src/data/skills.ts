import type { SkillGroup, Capability } from "@/types";

export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend Development",
    skills: [
      { name: "HTML & CSS", level: "Intermediate", description: "Struktur dan styling halaman web responsif." },
      { name: "JavaScript", level: "Intermediate", description: "Logika interaktif di sisi klien." },
      { name: "React", level: "Intermediate", description: "Membangun UI berbasis komponen." },
      { name: "Next.js", level: "Intermediate", description: "App Router, Server Components, dan SSR." },
    ],
  },
  {
    category: "Backend & Database",
    skills: [
      { name: "Supabase", level: "Fundamental", description: "Auth, database, dan storage." },
      { name: "PostgreSQL", level: "Fundamental", description: "Query, relasi, dan manajemen data." },
      { name: "API Route / Server Action", level: "Fundamental", description: "Endpoint dan mutasi data." },
    ],
  },
  {
    category: "IT Support",
    skills: [
      { name: "Troubleshooting Windows", level: "Intermediate", description: "Diagnosa dan perbaikan masalah sistem." },
      { name: "Instalasi Software & Driver", level: "Intermediate", description: "Setup perangkat dan aplikasi." },
      { name: "Remote Support", level: "Intermediate", description: "Bantuan teknis jarak jauh." },
    ],
  },
  {
    category: "Network & Server",
    skills: [
      { name: "IP Addressing & Subnetting", level: "Intermediate", description: "Perencanaan alamat jaringan." },
      { name: "DNS, DHCP, NAT", level: "Intermediate", description: "Layanan jaringan dasar." },
      { name: "Mikrotik Basic", level: "Fundamental", description: "Konfigurasi router dasar." },
      { name: "Ubuntu Server & Nginx", level: "Fundamental", description: "Administrasi server Linux." },
    ],
  },
  {
    category: "Tools & Documentation",
    skills: [
      { name: "Git & GitHub", level: "Intermediate", description: "Version control dan kolaborasi." },
      { name: "VS Code", level: "Intermediate", description: "Editor pengembangan." },
      { name: "Technical Documentation", level: "Intermediate", description: "SOP dan panduan teknis." },
    ],
  },
];

export const capabilities: Capability[] = [
  {
    title: "Web Development",
    description: "Membangun aplikasi web modern dengan Next.js dan React.",
    icon: "code",
    items: ["Next.js", "React", "REST API", "Dashboard admin"],
  },
  {
    title: "IT Support",
    description: "Troubleshooting, instalasi, dan dukungan teknis pengguna.",
    icon: "support",
    items: ["Windows/Linux", "Driver & software", "Remote support", "SOP"],
  },
  {
    title: "Network",
    description: "Konfigurasi jaringan dasar dan perencanaan IP.",
    icon: "network",
    items: ["LAN", "IP Addressing", "DNS/DHCP/NAT", "Mikrotik"],
  },
  {
    title: "Server & Deployment",
    description: "Setup dan pengelolaan server Linux untuk deployment.",
    icon: "server",
    items: ["Ubuntu Server", "Nginx", "VPS", "SSL"],
  },
];
