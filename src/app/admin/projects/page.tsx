import type { Metadata } from "next";
import Link from "next/link";
import { getProjects } from "@/actions/project.action";
import { Badge } from "@/components/ui/Badge";
import { Icons } from "@/components/ui/Icons";
import { ProjectRowActions } from "./ProjectRowActions";

export const metadata: Metadata = { title: "Projects" };
export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="mt-1 text-sm text-muted">{projects.length} project total</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-bg hover:bg-accent/90"
        >
          <Icons.arrowRight width={16} height={16} className="-rotate-90" />
          Tambah Project
        </Link>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-bg-soft text-left text-xs text-muted">
              <th className="px-4 py-3 font-medium">Judul</th>
              <th className="px-4 py-3 font-medium">Kategori</th>
              <th className="px-4 py-3 font-medium">Tahun</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Featured</th>
              <th className="px-4 py-3 font-medium">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {projects.map((p) => (
              <tr key={p.id} className="hover:bg-bg-soft/40 transition-colors">
                <td className="px-4 py-3 font-medium">{p.title}</td>
                <td className="px-4 py-3 text-muted">{p.category.name}</td>
                <td className="px-4 py-3 text-muted">{p.year}</td>
                <td className="px-4 py-3">
                  <Badge variant={p.status === "published" ? "success" : "default"}>
                    {p.status === "published" ? "Publik" : "Draft"}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  {p.isFeatured && <Badge variant="accent">Featured</Badge>}
                </td>
                <td className="px-4 py-3">
                  <ProjectRowActions id={p.id} slug={p.slug} status={p.status} />
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-muted">
                  Belum ada project
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
