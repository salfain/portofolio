import type { Metadata } from "next";
import { getPublishedProjects, getProjectCategories } from "@/actions/project.action";
import { toProjectView } from "@/lib/transforms";
import type { ProjectCategory } from "@/types";
import { PortfolioPageClient } from "./PortfolioPageClient";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Daftar project IT, dokumentasi, dan karya teknologi informasi.",
};
export const revalidate = 60;

export default async function PortfolioPage() {
  let projects: ReturnType<typeof toProjectView>[] = [];
  let categories: ("All" | ProjectCategory)[] = ["All"];
  let technologies: string[] = [];

  try {
    const [raw, cats] = await Promise.all([
      getPublishedProjects(),
      getProjectCategories(),
    ]);
    projects = raw.map(toProjectView);
    categories = ["All", ...cats.map((c) => c.name as ProjectCategory)];
    technologies = Array.from(
      new Set(projects.flatMap((project) => project.technologies))
    ).sort((a, b) => a.localeCompare(b));
  } catch {
    // DB not configured yet
  }

  return (
    <PortfolioPageClient
      projects={projects}
      categories={categories}
      technologies={technologies}
    />
  );
}
