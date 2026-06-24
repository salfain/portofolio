import type { Metadata } from "next";
import Link from "next/link";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { getProjectCategories, createProject } from "@/actions/project.action";

export const metadata: Metadata = { title: "Tambah Project" };
export const dynamic = "force-dynamic";

export default async function NewProjectPage() {
  const categories = await getProjectCategories();
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <Link href="/admin/projects" className="text-sm text-muted hover:text-accent">← Projects</Link>
        <h1 className="mt-2 text-2xl font-bold">Tambah Project</h1>
      </div>
      <div className="rounded-xl border border-border bg-card p-6">
        <ProjectForm categories={categories} action={createProject} />
      </div>
    </div>
  );
}
