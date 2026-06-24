"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { inputCls } from "@/components/admin/FormField";
import {
  createProjectCategory,
  deleteProjectCategory,
  createSkillCategory,
  deleteSkillCategory,
} from "@/actions/category.action";

type Item = { id: string; name: string; count: number };
type State = { success: boolean; error: string | null };
const initial: State = { success: false, error: null };

export function CategorySection({
  title,
  type,
  items,
}: {
  title: string;
  type: "project" | "skill";
  items: Item[];
}) {
  const router = useRouter();
  const createAction = type === "project" ? createProjectCategory : createSkillCategory;
  const deleteAction = type === "project" ? deleteProjectCategory : deleteSkillCategory;

  const [state, action, pending] = useActionState(createAction, initial);

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h2 className="font-semibold">{title}</h2>

      <form action={action} className="mt-4 flex gap-2">
        <input
          name="name"
          placeholder="Nama kategori baru"
          className={inputCls()}
        />
        <Button type="submit" disabled={pending} className="shrink-0">
          {pending ? "..." : "Tambah"}
        </Button>
      </form>
      {state.error && (
        <p className="mt-2 text-xs text-red-400">{state.error}</p>
      )}

      <ul className="mt-5 divide-y divide-border">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between gap-3 py-3"
          >
            <div className="flex items-center gap-2">
              <span className="font-medium">{item.name}</span>
              <Badge variant="outline">{item.count}</Badge>
            </div>
            <DeleteButton
              onDelete={async () => {
                await deleteAction(item.id);
                router.refresh();
              }}
            />
          </li>
        ))}
        {items.length === 0 && (
          <li className="py-6 text-center text-sm text-muted">
            Belum ada kategori
          </li>
        )}
      </ul>
    </div>
  );
}
