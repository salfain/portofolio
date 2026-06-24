"use client";
import { useActionState } from "react";
import { createCertificate } from "@/actions/certificate.action";
import { FormField, inputCls } from "@/components/admin/FormField";
import { Button } from "@/components/ui/Button";

type State = { success: boolean; errors: Record<string, string[] | undefined> };
const initial: State = { success: false, errors: {} };

export function NewCertForm() {
  const [state, action, pending] = useActionState(createCertificate, initial);
  return (
    <form action={action} className="space-y-4" encType="multipart/form-data">
      {state.success && <p className="rounded-lg bg-success/10 px-3 py-2 text-sm text-success">Sertifikat ditambahkan!</p>}
      <FormField label="Nama Sertifikat" required error={state.errors.title?.[0]}>
        <input name="title" placeholder="Nama sertifikat" className={inputCls(!!state.errors.title)} />
      </FormField>
      <FormField label="Penerbit" required error={state.errors.issuer?.[0]}>
        <input name="issuer" placeholder="Dicoding, Coursera, dll." className={inputCls(!!state.errors.issuer)} />
      </FormField>
      <FormField label="Tanggal Terbit" required error={state.errors.issueDate?.[0]}>
        <input name="issueDate" type="month" className={inputCls(!!state.errors.issueDate)} />
      </FormField>
      <FormField label="URL Validasi" error={state.errors.credentialUrl?.[0]}>
        <input name="credentialUrl" type="url" placeholder="https://..." className={inputCls(!!state.errors.credentialUrl)} />
      </FormField>
      <FormField label="Gambar Sertifikat" error={undefined}>
        <input name="image" type="file" accept="image/*" className="w-full rounded-lg border border-border bg-bg-soft px-3 py-2 text-sm text-muted file:mr-3 file:rounded file:border-0 file:bg-accent/10 file:px-3 file:py-1 file:text-xs file:font-medium file:text-accent" />
      </FormField>
      <FormField label="Deskripsi" error={undefined}>
        <input name="description" placeholder="Deskripsi singkat" className={inputCls()} />
      </FormField>
      <Button type="submit" disabled={pending} className="w-full">{pending ? "Menyimpan..." : "Tambah"}</Button>
    </form>
  );
}
