"use client";

import { useActionState } from "react";
import Link from "next/link";
import { FormField, inputCls } from "@/components/admin/FormField";
import { Button } from "@/components/ui/Button";

type Category = { id: string; name: string };
type State = { success: boolean; errors: Record<string, string[] | undefined> };
type SkillDefaults = {
  name: string;
  categoryId: string;
  level: string;
  description: string;
  sortOrder: number;
};

const initial: State = { success: false, errors: {} };

export function SkillEditForm({
  categories,
  action,
  defaultValues,
}: {
  categories: Category[];
  action: (prev: unknown, fd: FormData) => Promise<State>;
  defaultValues: SkillDefaults;
}) {
  const [state, formAction, pending] = useActionState(action, initial);

  return (
    <form action={formAction} className="space-y-4">
      {state.success && (
        <p className="rounded-lg bg-success/10 px-3 py-2 text-sm text-success">
          Skill berhasil diperbarui!
        </p>
      )}

      <FormField label="Nama Skill" required error={state.errors.name?.[0]}>
        <input
          name="name"
          defaultValue={defaultValues.name}
          placeholder="Nama skill"
          className={inputCls(!!state.errors.name)}
        />
      </FormField>

      <FormField label="Kategori" required error={state.errors.categoryId?.[0]}>
        <select
          name="categoryId"
          defaultValue={defaultValues.categoryId}
          className={inputCls(!!state.errors.categoryId)}
        >
          <option value="">Pilih kategori...</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </FormField>

      <FormField label="Level" required error={state.errors.level?.[0]}>
        <select
          name="level"
          defaultValue={defaultValues.level}
          className={inputCls(!!state.errors.level)}
        >
          <option>Fundamental</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>
      </FormField>

      <FormField label="Deskripsi" error={state.errors.description?.[0]}>
        <input
          name="description"
          defaultValue={defaultValues.description}
          placeholder="Deskripsi singkat"
          className={inputCls(!!state.errors.description)}
        />
      </FormField>

      <FormField label="Urutan Tampil" error={state.errors.sortOrder?.[0]}>
        <input
          name="sortOrder"
          type="number"
          defaultValue={defaultValues.sortOrder}
          className={inputCls(!!state.errors.sortOrder)}
        />
      </FormField>

      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={pending}>
          {pending ? "Menyimpan..." : "Simpan Skill"}
        </Button>
        <Link
          href="/admin/skills"
          className="inline-flex items-center rounded-lg border border-border px-4 py-2.5 text-sm text-muted hover:text-fg transition-colors"
        >
          Batal
        </Link>
      </div>
    </form>
  );
}
