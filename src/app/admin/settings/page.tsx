import type { Metadata } from "next";
import { getSettings } from "@/actions/settings.action";
import { SettingsForm } from "./SettingsForm";

export const metadata: Metadata = { title: "Settings" };
export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  let settings: Record<string, string> = {};
  try {
    settings = await getSettings();
  } catch {
    // DB belum terhubung
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="mt-1 text-sm text-muted">
          Kelola informasi dasar website portofolio
        </p>
      </div>
      <div className="rounded-xl border border-border bg-card p-6">
        <SettingsForm defaultValues={settings} />
      </div>
    </div>
  );
}
