"use server";

import { auth } from "@/lib/auth";
import { uploadToR2, generateKey } from "@/lib/r2";

export async function uploadFile(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const file = formData.get("file") as File;
  const folder = (formData.get("folder") as string) || "misc";

  if (!file || file.size === 0) {
    return { success: false, url: null, error: "Tidak ada file" };
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const key = generateKey(folder, file.name);
  const url = await uploadToR2(key, buffer, file.type);

  return { success: true, url, error: null };
}
