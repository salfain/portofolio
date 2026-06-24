"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteEducation } from "@/actions/education.action";

export function EduActions({ id }: { id: string }) {
  const router = useRouter();
  return (
    <div className="flex items-center gap-2">
      <Link
        href={`/admin/education/${id}/edit`}
        className="rounded-lg px-3 py-1.5 text-xs font-medium text-accent hover:bg-accent/10 transition-colors"
      >
        Edit
      </Link>
      <DeleteButton onDelete={async () => { await deleteEducation(id); router.refresh(); }} />
    </div>
  );
}
