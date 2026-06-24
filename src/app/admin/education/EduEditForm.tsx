"use client";

import { useActionState } from "react";
import Link from "next/link";
import { FormField, inputCls } from "@/components/admin/FormField";
import { Button } from "@/components/ui/Button";

type State = { success: boolean; errors: Record<string, string[] | undefined> };
type EduDefaults = {
  schoolName: string;
  major: string;
  startYear: number;
  endYear: number | null;
  description: string;
};

const initial: State = { success: false, errors: {} };

export function EduEditForm({
  action,
  defaultValues,
}: {
  action: (prev: unknown, fd: FormData) => Promise<State>;
  defaultValues: EduDefaults;
}) {
  const [state, formAction, pending] = useActionState(action, initial);

  return (
    <form action={formAction} className="space-y-4">
      {state.success && (
        <p className="rounded-lg bg-success/10 px-3 py-2 text-sm text-success">
          Pendidikan berhasil diperbarui!
        </p>
      )}

      <FormField label="Nama Sekolah / Kampus" required error={state.errors.schoolName?.[0]}>
        <input
          name="schoolName"
          defaultValue={defaultValues.schoolName}
          className={inputCls(!!state.errors.schoolName)}
        />
      </FormField>

      <FormField label="Jurusan" required error={state.errors.major?.[0]}>
        <input
          name="major"
          defaultValue={defaultValues.major}
          className={inputCls(!!state.errors.major)}
        />
      </FormField>

      <div className="grid grid-cols-2 gap-3">
        <FormField label="Tahun Mulai" required error={state.errors.startYear?.[0]}>
          <input
            name="startYear"
            type="number"
            defaultValue={defaultValues.startYear}
            className={inputCls(!!state.errors.startYear)}
          />
        </FormField>
        <FormField label="Tahun Selesai" error={state.errors.endYear?.[0]}>
          <input
            name="endYear"
            type="number"
            defaultValue={defaultValues.endYear ?? ""}
            className={inputCls(!!state.errors.endYear)}
          />
        </FormField>
      </div>

      <FormField label="Deskripsi" error={state.errors.description?.[0]}>
        <textarea
          name="description"
          rows={3}
          defaultValue={defaultValues.description}
          className={inputCls()}
        />
      </FormField>

      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={pending}>
          {pending ? "Menyimpan..." : "Simpan Pendidikan"}
        </Button>
        <Link
          href="/admin/education"
          className="inline-flex items-center rounded-lg border border-border px-4 py-2.5 text-sm text-muted hover:text-fg transition-colors"
        >
          Batal
        </Link>
      </div>
    </form>
  );
}
