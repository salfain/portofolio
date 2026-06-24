"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteSkill } from "@/actions/skill.action";

export function SkillActions({ id }: { id: string }) {
  const router = useRouter();
  return (
    <div className="flex items-center gap-2">
      <Link
        href={`/admin/skills/${id}/edit`}
        className="rounded-lg px-3 py-1.5 text-xs font-medium text-accent hover:bg-accent/10 transition-colors"
      >
        Edit
      </Link>
      <DeleteButton onDelete={async () => { await deleteSkill(id); router.refresh(); }} />
    </div>
  );
}
