"use client";
import { useActionState } from "react";
import { createEducation } from "@/actions/education.action";
import { FormField, inputCls } from "@/components/admin/FormField";
import { Button } from "@/components/ui/Button";

type State = { success: boolean; errors: Record<string, string[] | undefined> };
const initial: State = { success: false, errors: {} };

export function NewEduForm() {
  const [state, action, pending] = useActionState(createEducation, initial);
  return (
    <form action={action} className="space-y-4">
      {state.success && (
        <p className="rounded-lg bg-success/10 px-3 py-2 text-sm text-success">
          Pendidikan ditambahkan!
        </p>
      )}
      <FormField label="Nama Sekolah / Kampus" required error={state.errors.schoolName?.[0]}>
        <input name="schoolName" placeholder="SMK Negeri 1 Teknologi" className={inputCls(!!state.errors.schoolName)} />
      </FormField>
      <FormField label="Jurusan" required error={state.errors.major?.[0]}>
        <input name="major" placeholder="Teknik Komputer dan Jaringan" className={inputCls(!!state.errors.major)} />
      </FormField>
      <div className="grid grid-cols-2 gap-3">
        <FormField label="Tahun Mulai" required error={state.errors.startYear?.[0]}>
          <input name="startYear" type="number" placeholder="2021" className={inputCls(!!state.errors.startYear)} />
        </FormField>
        <FormField label="Tahun Selesai" error={state.errors.endYear?.[0]}>
          <input name="endYear" type="number" placeholder="2024" className={inputCls(!!state.errors.endYear)} />
        </FormField>
      </div>
      <FormField label="Deskripsi" error={state.errors.description?.[0]}>
        <textarea name="description" rows={3} placeholder="Keterangan tambahan" className={inputCls()} />
      </FormField>
      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Menyimpan..." : "Tambah"}
      </Button>
    </form>
  );
}
