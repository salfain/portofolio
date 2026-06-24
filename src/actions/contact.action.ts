"use server";

import { db } from "@/lib/db";
import { contactSchema } from "@/lib/validations";

export async function submitContact(_prev: unknown, formData: FormData) {
  const raw = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    subject: formData.get("subject") as string,
    message: formData.get("message") as string,
  };

  const result = contactSchema.safeParse(raw);
  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  await db.contactMessage.create({ data: result.data });

  return { success: true, errors: {} };
}
