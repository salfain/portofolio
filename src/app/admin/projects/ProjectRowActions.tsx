"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { toggleProjectStatus, deleteProject } from "@/actions/project.action";

export function ProjectRowActions({ id, slug, status }: { id: string; slug: string; status: string }) {
  const router = useRouter();
  return (
    <div className="flex items-center gap-2">
      <Link href={`/admin/projects/${slug}/edit`} className="rounded-lg px-3 py-1.5 text-xs font-medium text-accent hover:bg-accent/10 transition-colors">
        Edit
      </Link>
      <button
        onClick={async () => {
          await toggleProjectStatus(id, status);
          router.refresh();
        }}
        className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted hover:text-fg transition-colors"
      >
        {status === "published" ? "Draft" : "Publish"}
      </button>
      <DeleteButton onDelete={async () => { await deleteProject(id); router.refresh(); }} />
    </div>
  );
}
