"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { certificateSchema } from "@/lib/validations";
import { saveUploadedFile, deleteLocalFile } from "@/lib/storage";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
}

export async function getCertificates() {
  return db.certificate.findMany({ orderBy: { issueDate: "desc" } });
}

export async function createCertificate(_prev: unknown, formData: FormData) {
  await requireAdmin();
  const raw = {
    title: formData.get("title") as string,
    issuer: formData.get("issuer") as string,
    issueDate: formData.get("issueDate") as string,
    credentialUrl: (formData.get("credentialUrl") as string) || undefined,
    description: formData.get("description") as string,
  };
  const result = certificateSchema.safeParse(raw);
  if (!result.success)
    return { success: false, errors: result.error.flatten().fieldErrors };

  const imageUrl = (await saveUploadedFile("certificates", formData.get("image") as File | null)) ?? undefined;

  await db.certificate.create({
    data: {
      ...result.data,
      issueDate: new Date(result.data.issueDate),
      certificateImageUrl: imageUrl,
    },
  });
  revalidatePath("/about");
  return { success: true, errors: {} };
}

export async function updateCertificate(id: string, _prev: unknown, formData: FormData) {
  await requireAdmin();
  const raw = {
    title: formData.get("title") as string,
    issuer: formData.get("issuer") as string,
    issueDate: formData.get("issueDate") as string,
    credentialUrl: (formData.get("credentialUrl") as string) || undefined,
    description: formData.get("description") as string,
  };
  const result = certificateSchema.safeParse(raw);
  if (!result.success)
    return { success: false, errors: result.error.flatten().fieldErrors };

  const imageUrl = (await saveUploadedFile("certificates", formData.get("image") as File | null)) ?? undefined;

  await db.certificate.update({
    where: { id },
    data: {
      ...result.data,
      issueDate: new Date(result.data.issueDate),
      ...(imageUrl && { certificateImageUrl: imageUrl }),
    },
  });
  revalidatePath("/about");
  return { success: true, errors: {} };
}

export async function deleteCertificate(id: string) {
  await requireAdmin();
  await db.certificate.delete({ where: { id } });
  revalidatePath("/about");
  return { success: true };
}
