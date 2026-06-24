"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { experienceSchema } from "@/lib/validations";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
}

export async function getExperiences() {
  return db.experience.findMany({ orderBy: { startDate: "desc" } });
}

export async function createExperience(_prev: unknown, formData: FormData) {
  await requireAdmin();
  const isCurrent = formData.get("isCurrent") === "true";
  const raw = {
    title: formData.get("title") as string,
    organization: formData.get("organization") as string,
    type: formData.get("type") as string,
    startDate: formData.get("startDate") as string,
    endDate: isCurrent ? undefined : (formData.get("endDate") as string) || undefined,
    isCurrent,
    description: formData.get("description") as string,
  };
  const result = experienceSchema.safeParse(raw);
  if (!result.success)
    return { success: false, errors: result.error.flatten().fieldErrors };

  await db.experience.create({
    data: {
      ...result.data,
      startDate: new Date(result.data.startDate),
      endDate: result.data.endDate ? new Date(result.data.endDate) : null,
    },
  });
  revalidatePath("/about");
  return { success: true, errors: {} };
}

export async function updateExperience(id: string, _prev: unknown, formData: FormData) {
  await requireAdmin();
  const isCurrent = formData.get("isCurrent") === "true";
  const raw = {
    title: formData.get("title") as string,
    organization: formData.get("organization") as string,
    type: formData.get("type") as string,
    startDate: formData.get("startDate") as string,
    endDate: isCurrent ? undefined : (formData.get("endDate") as string) || undefined,
    isCurrent,
    description: formData.get("description") as string,
  };
  const result = experienceSchema.safeParse(raw);
  if (!result.success)
    return { success: false, errors: result.error.flatten().fieldErrors };

  await db.experience.update({
    where: { id },
    data: {
      ...result.data,
      startDate: new Date(result.data.startDate),
      endDate: result.data.endDate ? new Date(result.data.endDate) : null,
    },
  });
  revalidatePath("/about");
  return { success: true, errors: {} };
}

export async function deleteExperience(id: string) {
  await requireAdmin();
  await db.experience.delete({ where: { id } });
  revalidatePath("/about");
  return { success: true };
}
