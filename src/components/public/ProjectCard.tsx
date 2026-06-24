"use client";

import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { Icons } from "@/components/ui/Icons";
import { useLang } from "@/i18n/context";

export function ProjectCard({ project }: { project: Project }) {
  const { t } = useLang();

  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-card border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5"
    >
      <div className="relative aspect-video overflow-hidden bg-card-soft">
        <Image
          src={project.thumbnailUrl}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3">
          <Badge variant="accent">{project.category}</Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-lg font-semibold transition-colors group-hover:text-accent">
            {project.title}
          </h3>
          <span className="text-xs text-muted">{project.year}</span>
        </div>
        <p className="mt-2 line-clamp-2 text-sm text-muted">
          {project.shortDescription}
        </p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((tech) => (
            <Badge key={tech} variant="outline">{tech}</Badge>
          ))}
        </div>
        <div className="mt-5 flex items-center gap-1 text-sm font-medium text-accent">
          {t.portfolio.viewDetail}
          <Icons.arrowRight
            width={16}
            height={16}
            className="transition-transform group-hover:translate-x-1"
          />
        </div>
      </div>
    </Link>
  );
}
