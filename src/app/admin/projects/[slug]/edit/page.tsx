import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { getProjectCategories, updateProject } from "@/actions/project.action";
import { db } from "@/lib/db";

type Params = { params: Promise<{ slug: string }> };
export const metadata: Metadata = { title: "Edit Project" };
export const dynamic = "force-dynamic";

export default async function EditProjectPage({ params }: Params) {
  const { slug } = await params;
  const [project, categories] = await Promise.all([
    db.project.findUnique({
      where: { slug },
      include: {
        images: true,
        technologies: { include: { technology: true } },
      },
    }),
    getProjectCategories(),
  ]);
  if (!project) notFound();

  const boundAction = updateProject.bind(null, project.id);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <Link href="/admin/projects" className="text-sm text-muted hover:text-accent">← Projects</Link>
        <h1 className="mt-2 text-2xl font-bold">Edit Project</h1>
      </div>
      <div className="rounded-xl border border-border bg-card p-6">
        <ProjectForm
          categories={categories}
          action={boundAction}
          defaultValues={{
            title: project.title,
            slug: project.slug,
            categoryId: project.categoryId,
            shortDescription: project.shortDescription,
            problem: project.problem,
            solution: project.solution,
            content: project.content,
            features: project.features,
            technologies: project.technologies.map((t) => t.technology.name),
            demoUrl: project.demoUrl ?? "",
            githubUrl: project.githubUrl ?? "",
            year: project.year,
            status: project.status,
            isFeatured: project.isFeatured,
            thumbnailUrl: project.thumbnailUrl ?? "",
            galleryCount: project.images.length,
          }}
        />
      </div>
    </div>
  );
}
