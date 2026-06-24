import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Format email tidak valid"),
  subject: z.string().min(3, "Subjek minimal 3 karakter"),
  message: z.string().min(10, "Pesan minimal 10 karakter"),
});

export const projectSchema = z.object({
  title: z.string().min(1, "Judul wajib diisi"),
  slug: z
    .string()
    .min(1, "Slug wajib diisi")
    .regex(/^[a-z0-9-]+$/, "Slug hanya boleh huruf kecil, angka, dan tanda -"),
  categoryId: z.string().min(1, "Kategori wajib dipilih"),
  shortDescription: z.string().min(1, "Deskripsi singkat wajib diisi"),
  problem: z.string().optional().default(""),
  solution: z.string().optional().default(""),
  content: z.string().optional().default(""),
  features: z.array(z.string()).optional().default([]),
  technologies: z.array(z.string()).optional().default([]),
  demoUrl: z.string().url("URL tidak valid").optional().or(z.literal("")),
  githubUrl: z.string().url("URL tidak valid").optional().or(z.literal("")),
  year: z.number().int().min(2000).max(2100),
  status: z.enum(["draft", "published"]),
  isFeatured: z.boolean().default(false),
});

export const skillSchema = z.object({
  name: z.string().min(1, "Nama skill wajib diisi"),
  categoryId: z.string().min(1, "Kategori wajib dipilih"),
  level: z.enum(["Fundamental", "Intermediate", "Advanced"]),
  description: z.string().optional().default(""),
  sortOrder: z.number().int().optional().default(0),
});

export const experienceSchema = z.object({
  title: z.string().min(1, "Posisi/peran wajib diisi"),
  organization: z.string().min(1, "Organisasi wajib diisi"),
  type: z.enum(["work", "freelance", "internship", "organization", "project"]),
  startDate: z.string().min(1, "Tanggal mulai wajib diisi"),
  endDate: z.string().optional(),
  isCurrent: z.boolean().default(false),
  description: z.string().optional().default(""),
});

export const certificateSchema = z.object({
  title: z.string().min(1, "Nama sertifikat wajib diisi"),
  issuer: z.string().min(1, "Penerbit wajib diisi"),
  issueDate: z.string().min(1, "Tanggal terbit wajib diisi"),
  credentialUrl: z
    .string()
    .url("URL tidak valid")
    .optional()
    .or(z.literal("")),
  description: z.string().optional().default(""),
});

export const educationSchema = z.object({
  schoolName: z.string().min(1, "Nama sekolah/kampus wajib diisi"),
  major: z.string().min(1, "Jurusan wajib diisi"),
  startYear: z.number().int().min(1950).max(2100),
  endYear: z.number().int().min(1950).max(2100).optional().nullable(),
  description: z.string().optional().default(""),
});

export const loginSchema = z.object({
  email: z.string().email("Format email tidak valid"),
  password: z.string().min(1, "Password wajib diisi"),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ProjectInput = z.infer<typeof projectSchema>;
export type SkillInput = z.infer<typeof skillSchema>;
export type ExperienceInput = z.infer<typeof experienceSchema>;
export type CertificateInput = z.infer<typeof certificateSchema>;
