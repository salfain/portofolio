"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { saveUploadedFile } from "@/lib/storage";

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

  // CV: upload lokal jika ada file baru
  let cvUrl = (formData.get("cv_url") as string) ?? "";
  const savedCv = await saveUploadedFile("cv", formData.get("cv_file") as File | null);
  if (savedCv) cvUrl = savedCv;

  // Foto profil: upload lokal jika ada file baru
  const savedImage = await saveUploadedFile(
    "profile",
    formData.get("profile_image_file") as File | null
  );
  const profileImageUrl =
    savedImage ?? ((formData.get("profile_image_url") as string) || "");

  const keys = [
    "site_name",
    "tagline",
    "bio",
    "email",
    "whatsapp",
    "github_url",
    "linkedin_url",
    "cv_url",
    "profile_image_url",
    "is_available",
  ];

  await Promise.all(
    keys.map((key) => {
      if (key === "cv_url") return upsertSetting(key, cvUrl);
      if (key === "profile_image_url")
        return upsertSetting(key, profileImageUrl);
      return upsertSetting(key, (formData.get(key) as string) ?? "");
    })
  );

  // Sinkronkan ke tabel Profile (dipakai halaman About untuk foto)
  try {
    const existing = await db.profile.findFirst();
    if (existing) {
      await db.profile.update({
        where: { id: existing.id },
        data: { profileImageUrl: profileImageUrl || null },
      });
    }
  } catch {
    // tabel profile opsional — abaikan bila gagal
  }

  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/contact");
  return { success: true };
}
