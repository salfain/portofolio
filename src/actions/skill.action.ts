"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { skillSchema } from "@/lib/validations";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
}

export async function getSkillsGrouped() {
  return db.skillCategory.findMany({
    include: { skills: { orderBy: { sortOrder: "asc" } } },
    orderBy: { sortOrder: "asc" },
  });
}

export async function getSkillCategories() {
  return db.skillCategory.findMany({ orderBy: { sortOrder: "asc" } });
}

export async function getAllSkills() {
  return db.skill.findMany({
    include: { category: true },
    orderBy: { sortOrder: "asc" },
  });
}

export async function createSkill(_prev: unknown, formData: FormData) {
  await requireAdmin();
  const raw = {
    name: formData.get("name") as string,
    categoryId: formData.get("categoryId") as string,
    level: formData.get("level") as string,
    description: formData.get("description") as string,
    sortOrder: Number(formData.get("sortOrder") ?? 0),
  };
  const result = skillSchema.safeParse(raw);
  if (!result.success)
    return { success: false, errors: result.error.flatten().fieldErrors };

  await db.skill.create({ data: result.data });
  revalidatePath("/expertise");
  return { success: true, errors: {} };
}

export async function updateSkill(id: string, _prev: unknown, formData: FormData) {
  await requireAdmin();
  const raw = {
    name: formData.get("name") as string,
    categoryId: formData.get("categoryId") as string,
    level: formData.get("level") as string,
    description: formData.get("description") as string,
    sortOrder: Number(formData.get("sortOrder") ?? 0),
  };
  const result = skillSchema.safeParse(raw);
  if (!result.success)
    return { success: false, errors: result.error.flatten().fieldErrors };

  await db.skill.update({ where: { id }, data: result.data });
  revalidatePath("/expertise");
  return { success: true, errors: {} };
}

export async function deleteSkill(id: string) {
  await requireAdmin();
  await db.skill.delete({ where: { id } });
  revalidatePath("/expertise");
  return { success: true };
}
