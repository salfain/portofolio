"use server";

import { signIn, signOut } from "@/lib/auth";
import { AuthError } from "next-auth";

export async function loginAction(_prev: unknown, formData: FormData) {
  try {
    await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      redirectTo: "/admin/dashboard",
    });
    return { success: true, error: null };
  } catch (err) {
    if (err instanceof AuthError) {
      return { success: false, error: "Email atau password salah." };
    }
    throw err; // redirect throws, re-throw it
  }
}

export async function logoutAction() {
  await signOut({ redirectTo: "/admin/login" });
}
