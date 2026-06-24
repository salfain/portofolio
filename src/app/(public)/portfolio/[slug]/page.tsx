import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublishedProjectBySlug, getPublishedProjects } from "@/actions/project.action";
import { toProjectView } from "@/lib/transforms";
import { ProjectDetailClient } from "./ProjectDetailClient";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  try {
    const projects = await getPublishedProjects();
    return projects.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  try {
    const raw = await getPublishedProjectBySlug(slug);
    if (!raw) return { title: "Project tidak ditemukan" };
    return {
      title: raw.title,
      description: raw.shortDescription,
      openGraph: { title: raw.title, description: raw.shortDescription },
    };
  } catch {
    return { title: "Project" };
  }
}

export default async function ProjectDetailPage({ params }: Params) {
  const { slug } = await params;

  let project: ReturnType<typeof toProjectView> | null = null;
  try {
    const raw = await getPublishedProjectBySlug(slug);
    if (raw) project = toProjectView(raw);
  } catch {
    // DB not configured
  }

  if (!project) notFound();

  return <ProjectDetailClient project={project} />;
}
