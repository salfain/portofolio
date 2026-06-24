"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { generateKey, uploadToR2 } from "@/lib/r2";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
}

export async function getSettings(): Promise<Record<string, string>> {
  const rows = await db.siteSetting.findMany();
  return Object.fromEntries(rows.map((r) => [r.key, r.value]));
}

export async function upsertSetting(key: string, value: string) {
  await db.siteSetting.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });
}

export async function saveSettings(_prev: unknown, formData: FormData) {
  await requireAdmin();

  let cvUrl = (formData.get("cv_url") as string) ?? "";
  const cvFile = formData.get("cv_file") as File | null;
  if (cvFile && cvFile.size > 0) {
    const buffer = Buffer.from(await cvFile.arrayBuffer());
    const key = generateKey("cv", cvFile.name);
    cvUrl = await uploadToR2(
      key,
      buffer,
      cvFile.type || "application/pdf"
    );
  }

  const keys = [
    "site_name",
    "tagline",
    "bio",
    "email",
    "whatsapp",
    "github_url",
    "linkedin_url",
    "cv_url",
    "is_available",
  ];

  await Promise.all(
    keys.map((key) => {
      const value = key === "cv_url" ? cvUrl : (formData.get(key) as string) ?? "";
      return upsertSetting(key, value);
    })
  );

  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/contact");
  return { success: true };
}
