"use client";

import { useState } from "react";
import type { Project, ProjectCategory } from "@/types";
import { ProjectCard } from "@/components/public/ProjectCard";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { useLang } from "@/i18n/context";
import { cn } from "@/lib/utils";

export function PortfolioGrid({
  projects,
  categories,
  technologies,
}: {
  projects: Project[];
  categories: ("All" | ProjectCategory)[];
  technologies: string[];
}) {
  const { t } = useLang();
  const [activeCategory, setActiveCategory] = useState<"All" | ProjectCategory>("All");
  const [activeTech, setActiveTech] = useState<"All" | string>("All");

  const filtered = projects.filter((project) => {
    const categoryMatch =
      activeCategory === "All" || project.category === activeCategory;
    const techMatch =
      activeTech === "All" || project.technologies.includes(activeTech);
    return categoryMatch && techMatch;
  });

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              activeCategory === cat
                ? "bg-accent text-bg"
                : "border border-border text-muted hover:border-accent/50 hover:text-fg"
            )}
          >
            {cat === "All" ? t.portfolio.allCategories : cat}
          </button>
        ))}
      </div>

      {technologies.length > 0 && (
        <div className="mt-5">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted">
            {t.portfolio.technologyFilter}
          </p>
          <div className="flex flex-wrap gap-2">
            {["All", ...technologies].map((tech) => (
              <button
                key={tech}
                onClick={() => setActiveTech(tech)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                  activeTech === tech
                    ? "bg-card text-accent ring-1 ring-accent/40"
                    : "border border-border text-muted hover:border-accent/50 hover:text-fg"
                )}
              >
                {tech === "All" ? t.portfolio.allTechnologies : tech}
              </button>
            ))}
          </div>
        </div>
      )}

      {filtered.length > 0 ? (
        <StaggerGroup
          key={`${activeCategory}-${activeTech}`}
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          gap={0.06}
        >
          {filtered.map((project) => (
            <StaggerItem key={project.id}>
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      ) : (
        <p className="mt-16 text-center text-muted">{t.portfolio.empty}</p>
      )}
    </div>
  );
}
