"use client";

import { useActionState } from "react";
import Link from "next/link";
import { FormField, inputCls } from "@/components/admin/FormField";
import { Button } from "@/components/ui/Button";

type State = { success: boolean; errors: Record<string, string[] | undefined> };
type CertificateDefaults = {
  title: string;
  issuer: string;
  issueDate: string;
  credentialUrl: string;
  description: string;
  hasImage: boolean;
};

const initial: State = { success: false, errors: {} };

export function CertEditForm({
  action,
  defaultValues,
}: {
  action: (prev: unknown, fd: FormData) => Promise<State>;
  defaultValues: CertificateDefaults;
}) {
  const [state, formAction, pending] = useActionState(action, initial);

  return (
    <form action={formAction} className="space-y-4" encType="multipart/form-data">
      {state.success && (
        <p className="rounded-lg bg-success/10 px-3 py-2 text-sm text-success">
          Sertifikat berhasil diperbarui!
        </p>
      )}

      <FormField label="Nama Sertifikat" required error={state.errors.title?.[0]}>
        <input
          name="title"
          defaultValue={defaultValues.title}
          placeholder="Nama sertifikat"
          className={inputCls(!!state.errors.title)}
        />
      </FormField>

      <FormField label="Penerbit" required error={state.errors.issuer?.[0]}>
        <input
          name="issuer"
          defaultValue={defaultValues.issuer}
          placeholder="Dicoding, Coursera, dll."
          className={inputCls(!!state.errors.issuer)}
        />
      </FormField>

      <FormField label="Tanggal Terbit" required error={state.errors.issueDate?.[0]}>
        <input
          name="issueDate"
          type="month"
          defaultValue={defaultValues.issueDate}
          className={inputCls(!!state.errors.issueDate)}
        />
      </FormField>

      <FormField label="URL Validasi" error={state.errors.credentialUrl?.[0]}>
        <input
          name="credentialUrl"
          type="url"
          defaultValue={defaultValues.credentialUrl}
          placeholder="https://..."
          className={inputCls(!!state.errors.credentialUrl)}
        />
      </FormField>

      <FormField label="Gambar Sertifikat" error={undefined}>
        <input
          name="image"
          type="file"
          accept="image/*"
          className="w-full rounded-lg border border-border bg-bg-soft px-3 py-2 text-sm text-muted file:mr-3 file:rounded file:border-0 file:bg-accent/10 file:px-3 file:py-1 file:text-xs file:font-medium file:text-accent"
        />
        {defaultValues.hasImage && (
          <p className="mt-1 text-xs text-muted">
            Gambar saat ini: sudah ada. Upload baru akan menggantikannya.
          </p>
        )}
      </FormField>

      <FormField label="Deskripsi" error={state.errors.description?.[0]}>
        <input
          name="description"
          defaultValue={defaultValues.description}
          placeholder="Deskripsi singkat"
          className={inputCls(!!state.errors.description)}
        />
      </FormField>

      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={pending}>
          {pending ? "Menyimpan..." : "Simpan Sertifikat"}
        </Button>
        <Link
          href="/admin/certificates"
          className="inline-flex items-center rounded-lg border border-border px-4 py-2.5 text-sm text-muted hover:text-fg transition-colors"
        >
          Batal
        </Link>
      </div>
    </form>
  );
}
