"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// ─── Project Categories ──────────────────────────────────────────────────────

export async function getProjectCategoriesWithCount() {
  return db.projectCategory.findMany({
    orderBy: { sortOrder: "asc" },
    include: { _count: { select: { projects: true } } },
  });
}

export async function createProjectCategory(_prev: unknown, formData: FormData) {
  await requireAdmin();
  const name = (formData.get("name") as string)?.trim();
  if (!name) return { success: false, error: "Nama kategori wajib diisi" };

  const slug = slugify(name);
  const existing = await db.projectCategory.findFirst({
    where: { OR: [{ name }, { slug }] },
  });
  if (existing) return { success: false, error: "Kategori sudah ada" };

  const count = await db.projectCategory.count();
  await db.projectCategory.create({
    data: { name, slug, sortOrder: count + 1 },
  });

  revalidatePath("/admin/categories");
  revalidatePath("/portfolio");
  return { success: true, error: null };
}

export async function deleteProjectCategory(id: string) {
  await requireAdmin();
  const inUse = await db.project.count({ where: { categoryId: id } });
  if (inUse > 0) {
    return { success: false, error: `Tidak bisa dihapus, dipakai ${inUse} project` };
  }
  await db.projectCategory.delete({ where: { id } });
  revalidatePath("/admin/categories");
  revalidatePath("/portfolio");
  return { success: true, error: null };
}

// ─── Skill Categories ────────────────────────────────────────────────────────

export async function getSkillCategoriesWithCount() {
  return db.skillCategory.findMany({
    orderBy: { sortOrder: "asc" },
    include: { _count: { select: { skills: true } } },
  });
}

export async function createSkillCategory(_prev: unknown, formData: FormData) {
  await requireAdmin();
  const name = (formData.get("name") as string)?.trim();
  if (!name) return { success: false, error: "Nama kategori wajib diisi" };

  const slug = slugify(name);
  const existing = await db.skillCategory.findFirst({
    where: { OR: [{ name }, { slug }] },
  });
  if (existing) return { success: false, error: "Kategori sudah ada" };

  const count = await db.skillCategory.count();
  await db.skillCategory.create({
    data: { name, slug, sortOrder: count + 1 },
  });

  revalidatePath("/admin/categories");
  revalidatePath("/expertise");
  return { success: true, error: null };
}

export async function deleteSkillCategory(id: string) {
  await requireAdmin();
  const inUse = await db.skill.count({ where: { categoryId: id } });
  if (inUse > 0) {
    return { success: false, error: `Tidak bisa dihapus, dipakai ${inUse} skill` };
  }
  await db.skillCategory.delete({ where: { id } });
  revalidatePath("/admin/categories");
  revalidatePath("/expertise");
  return { success: true, error: null };
}
