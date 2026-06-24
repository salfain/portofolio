import type { Experience, Certificate } from "@/types";

export const experiences: Experience[] = [
  {
    id: "exp-1",
    title: "Freelance Web Developer",
    organization: "Mandiri",
    type: "freelance",
    startDate: "2025-01",
    endDate: null,
    isCurrent: true,
    description:
      "Membangun website company profile dan sistem informasi sederhana untuk UMKM dan sekolah menggunakan Next.js dan Supabase.",
  },
  {
    id: "exp-2",
    title: "IT Support (Praktik Kerja)",
    organization: "PT Teknologi Nusantara",
    type: "internship",
    startDate: "2023-07",
    endDate: "2023-12",
    isCurrent: false,
    description:
      "Menangani troubleshooting perangkat, instalasi software, pemeliharaan jaringan kantor, dan dokumentasi aset IT.",
  },
  {
    id: "exp-3",
    title: "Anggota Divisi Teknologi",
    organization: "Organisasi Siswa",
    type: "organization",
    startDate: "2022-08",
    endDate: "2023-08",
    isCurrent: false,
    description:
      "Mengelola perangkat acara, dokumentasi, dan dukungan teknis kegiatan sekolah.",
  },
];

export const certificates: Certificate[] = [
  {
    id: "cert-1",
    title: "Belajar Dasar Pemrograman Web",
    issuer: "Dicoding",
    issueDate: "2024-06",
    credentialUrl: "#",
    description: "Fundamental HTML, CSS, dan JavaScript untuk web.",
  },
  {
    id: "cert-2",
    title: "Jaringan Komputer Dasar",
    issuer: "Cisco Networking Academy",
    issueDate: "2023-11",
    credentialUrl: "#",
    description: "Konsep dasar jaringan, IP addressing, dan routing.",
  },
  {
    id: "cert-3",
    title: "Linux System Administration",
    issuer: "Coursera",
    issueDate: "2025-02",
    credentialUrl: "#",
    description: "Administrasi dasar sistem Linux dan layanan server.",
  },
];
