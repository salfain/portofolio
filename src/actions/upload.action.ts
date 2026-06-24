"use server";

import { auth } from "@/lib/auth";
import { saveUploadedFile } from "@/lib/storage";

export async function uploadFile(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const file = formData.get("file") as File;
  const folder = (formData.get("folder") as string) || "misc";

  if (!file || file.size === 0) {
    return { success: false, url: null, error: "Tidak ada file" };
  }

  const url = await saveUploadedFile(folder, file);
  return { success: true, url, error: null };
}
