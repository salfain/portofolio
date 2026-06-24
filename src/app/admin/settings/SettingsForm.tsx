"use client";

import { useActionState } from "react";
import { saveSettings } from "@/actions/settings.action";
import { FormField, inputCls } from "@/components/admin/FormField";
import { Button } from "@/components/ui/Button";

type State = { success: boolean };
const initial: State = { success: false };

export function SettingsForm({
  defaultValues: dv,
}: {
  defaultValues: Record<string, string>;
}) {
  const [state, action, pending] = useActionState(saveSettings, initial);

  return (
    <form action={action} className="space-y-5" encType="multipart/form-data">
      {state.success && (
        <p className="rounded-lg bg-success/10 px-4 py-2.5 text-sm text-success">
          Settings berhasil disimpan!
        </p>
      )}

      <FormField label="Nama Pemilik" required>
        <input
          name="site_name"
          defaultValue={dv.site_name ?? "Muhammad Syaban Alfain"}
          placeholder="Nama lengkap"
          className={inputCls()}
        />
      </FormField>

      <FormField label="Tagline">
        <input
          name="tagline"
          defaultValue={dv.tagline ?? "General IT Portfolio"}
          placeholder="Tagline singkat"
          className={inputCls()}
        />
      </FormField>

      <FormField label="Bio / Deskripsi Diri">
        <textarea
          name="bio"
          rows={4}
          defaultValue={dv.bio ?? ""}
          placeholder="Deskripsi singkat tentang diri Anda"
          className={inputCls()}
        />
      </FormField>

      <FormField label="Foto Profil">
        {dv.profile_image_url && (
          <div className="mb-2 flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={dv.profile_image_url}
              alt="Foto profil saat ini"
              className="h-16 w-16 rounded-full border border-border object-cover"
            />
            <span className="text-xs text-muted">Foto profil saat ini</span>
          </div>
        )}
        <input
          name="profile_image_file"
          type="file"
          accept="image/*"
          className="w-full rounded-lg border border-border bg-bg-soft px-3 py-2 text-sm text-muted file:mr-3 file:rounded file:border-0 file:bg-accent/10 file:px-3 file:py-1 file:text-xs file:font-medium file:text-accent"
        />
        <input type="hidden" name="profile_image_url" value={dv.profile_image_url ?? ""} />
        <p className="mt-1 text-xs text-muted">
          Opsional. Format gambar (JPG/PNG). Disimpan di folder public.
        </p>
      </FormField>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Email">
          <input
            name="email"
            type="email"
            defaultValue={dv.email ?? ""}
            placeholder="email@contoh.com"
            className={inputCls()}
          />
        </FormField>

        <FormField label="Nomor WhatsApp">
          <input
            name="whatsapp"
            defaultValue={dv.whatsapp ?? ""}
            placeholder="6281234567890"
            className={inputCls()}
          />
        </FormField>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="URL GitHub">
          <input
            name="github_url"
            type="url"
            defaultValue={dv.github_url ?? ""}
            placeholder="https://github.com/..."
            className={inputCls()}
          />
        </FormField>

        <FormField label="URL LinkedIn">
          <input
            name="linkedin_url"
            type="url"
            defaultValue={dv.linkedin_url ?? ""}
            placeholder="https://linkedin.com/in/..."
            className={inputCls()}
          />
        </FormField>
      </div>

      <FormField label="Link File CV">
        <input
          name="cv_url"
          defaultValue={dv.cv_url ?? ""}
          placeholder="/cv-syaban-alfain.pdf atau URL R2"
          className={inputCls()}
        />
      </FormField>

      <FormField label="Upload File CV">
        <input
          name="cv_file"
          type="file"
          accept=".pdf,application/pdf"
          className="w-full rounded-lg border border-border bg-bg-soft px-3 py-2 text-sm text-muted file:mr-3 file:rounded file:border-0 file:bg-accent/10 file:px-3 file:py-1 file:text-xs file:font-medium file:text-accent"
        />
        <p className="mt-1 text-xs text-muted">
          Opsional. Jika diisi, file ini akan mengganti link CV di atas.
        </p>
      </FormField>

      <FormField label="Status Available for Work">
        <select
          name="is_available"
          defaultValue={dv.is_available ?? "true"}
          className={inputCls()}
        >
          <option value="true">Ya — Available for Work</option>
          <option value="false">Tidak — Tidak tersedia</option>
        </select>
      </FormField>

      <div className="pt-2">
        <Button type="submit" disabled={pending}>
          {pending ? "Menyimpan..." : "Simpan Settings"}
        </Button>
      </div>
    </form>
  );
}
