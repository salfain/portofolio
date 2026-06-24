"use client";

import { useActionState } from "react";
import { createSkill } from "@/actions/skill.action";
import { FormField, inputCls } from "@/components/admin/FormField";
import { Button } from "@/components/ui/Button";

type Category = { id: string; name: string };
type State = { success: boolean; errors: Record<string, string[] | undefined> };
const initial: State = { success: false, errors: {} };

export function NewSkillForm({ categories }: { categories: Category[] }) {
  const [state, action, pending] = useActionState(createSkill, initial);

  return (
    <form action={action} className="space-y-4">
      {state.success && <p className="rounded-lg bg-success/10 px-3 py-2 text-sm text-success">Skill ditambahkan!</p>}
      <FormField label="Nama Skill" required error={state.errors.name?.[0]}>
        <input name="name" placeholder="Nama skill" className={inputCls(!!state.errors.name)} />
      </FormField>
      <FormField label="Kategori" required error={state.errors.categoryId?.[0]}>
        <select name="categoryId" className={inputCls(!!state.errors.categoryId)}>
          <option value="">Pilih kategori...</option>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </FormField>
      <FormField label="Level" required error={state.errors.level?.[0]}>
        <select name="level" className={inputCls()}>
          <option>Fundamental</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>
      </FormField>
      <FormField label="Deskripsi" error={state.errors.description?.[0]}>
        <input name="description" placeholder="Deskripsi singkat" className={inputCls()} />
      </FormField>
      <input type="hidden" name="sortOrder" value="0" />
      <Button type="submit" disabled={pending} className="w-full">{pending ? "Menyimpan..." : "Tambah Skill"}</Button>
    </form>
  );
}
