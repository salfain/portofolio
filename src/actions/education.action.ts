"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { educationSchema } from "@/lib/validations";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
}

export async function getEducation() {
  return db.education.findMany({ orderBy: { startYear: "desc" } });
}

function parseForm(formData: FormData) {
  const endYearRaw = (formData.get("endYear") as string)?.trim();
  return {
    schoolName: formData.get("schoolName") as string,
    major: formData.get("major") as string,
    startYear: Number(formData.get("startYear")),
    endYear: endYearRaw ? Number(endYearRaw) : null,
    description: (formData.get("description") as string) ?? "",
  };
}

export async function createEducation(_prev: unknown, formData: FormData) {
  await requireAdmin();
  const result = educationSchema.safeParse(parseForm(formData));
  if (!result.success)
    return { success: false, errors: result.error.flatten().fieldErrors };

  await db.education.create({
    data: {
      ...result.data,
      description: result.data.description ?? "",
    },
  });
  revalidatePath("/about");
  return { success: true, errors: {} };
}

export async function updateEducation(id: string, _prev: unknown, formData: FormData) {
  await requireAdmin();
  const result = educationSchema.safeParse(parseForm(formData));
  if (!result.success)
    return { success: false, errors: result.error.flatten().fieldErrors };

  await db.education.update({
    where: { id },
    data: {
      ...result.data,
      description: result.data.description ?? "",
    },
  });
  revalidatePath("/about");
  return { success: true, errors: {} };
}

export async function deleteEducation(id: string) {
  await requireAdmin();
  await db.education.delete({ where: { id } });
  revalidatePath("/about");
  return { success: true };
}
