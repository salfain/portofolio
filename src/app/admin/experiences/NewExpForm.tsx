"use client";
import { useActionState } from "react";
import { createExperience } from "@/actions/experience.action";
import { FormField, inputCls } from "@/components/admin/FormField";
import { Button } from "@/components/ui/Button";

type State = { success: boolean; errors: Record<string, string[] | undefined> };
const initial: State = { success: false, errors: {} };

export function NewExpForm() {
  const [state, action, pending] = useActionState(createExperience, initial);
  return (
    <form action={action} className="space-y-4">
      {state.success && <p className="rounded-lg bg-success/10 px-3 py-2 text-sm text-success">Pengalaman ditambahkan!</p>}
      <FormField label="Posisi / Peran" required error={state.errors.title?.[0]}>
        <input name="title" placeholder="Freelance Web Developer" className={inputCls(!!state.errors.title)} />
      </FormField>
      <FormField label="Organisasi / Perusahaan" required error={state.errors.organization?.[0]}>
        <input name="organization" placeholder="PT Contoh" className={inputCls(!!state.errors.organization)} />
      </FormField>
      <FormField label="Tipe" required error={state.errors.type?.[0]}>
        <select name="type" className={inputCls()}>
          <option value="work">Kerja</option>
          <option value="freelance">Freelance</option>
          <option value="internship">Magang</option>
          <option value="organization">Organisasi</option>
          <option value="project">Project</option>
        </select>
      </FormField>
      <div className="grid grid-cols-2 gap-3">
        <FormField label="Tanggal Mulai" required error={state.errors.startDate?.[0]}>
          <input name="startDate" type="month" className={inputCls(!!state.errors.startDate)} />
        </FormField>
        <FormField label="Tanggal Selesai" error={undefined}>
          <input name="endDate" type="month" className={inputCls()} />
        </FormField>
      </div>
      <FormField label="Masih berjalan?" error={undefined}>
        <select name="isCurrent" className={inputCls()}>
          <option value="false">Tidak</option>
          <option value="true">Ya</option>
        </select>
      </FormField>
      <FormField label="Deskripsi" error={undefined}>
        <textarea name="description" rows={3} placeholder="Deskripsi singkat" className={inputCls()} />
      </FormField>
      <Button type="submit" disabled={pending} className="w-full">{pending ? "Menyimpan..." : "Tambah"}</Button>
    </form>
  );
}
