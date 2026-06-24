import type { Project as ViewProject } from "@/types";

type PrismaProject = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  problem: string;
  solution: string;
  content: string;
  features: string[];
  thumbnailUrl: string | null;
  demoUrl: string | null;
  githubUrl: string | null;
  year: number;
  status: string;
  isFeatured: boolean;
  category: { name: string };
  technologies: { technology: { name: string } }[];
  images: { imageUrl: string; caption: string }[];
};

export function toProjectView(p: PrismaProject): ViewProject {
  return {
    id: p.id,
    title: p.title,
    slug: p.slug,
    category: p.category.name as ViewProject["category"],
    shortDescription: p.shortDescription,
    problem: p.problem,
    solution: p.solution,
    content: p.content,
    features: p.features,
    thumbnailUrl:
      p.thumbnailUrl ??
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
    images: p.images.map((img) => ({
      url: img.imageUrl,
      caption: img.caption,
    })),
    technologies: p.technologies.map((t) => t.technology.name),
    year: p.year,
    demoUrl: p.demoUrl ?? undefined,
    githubUrl: p.githubUrl ?? undefined,
    isFeatured: p.isFeatured,
  };
}
