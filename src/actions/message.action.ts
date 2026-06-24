"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
}

export async function getMessages() {
  return db.contactMessage.findMany({ orderBy: { createdAt: "desc" } });
}

export async function markMessageRead(id: string) {
  await requireAdmin();
  await db.contactMessage.update({ where: { id }, data: { isRead: true } });
  revalidatePath("/admin/messages");
}

export async function deleteMessage(id: string) {
  await requireAdmin();
  await db.contactMessage.delete({ where: { id } });
  revalidatePath("/admin/messages");
}
