"use client";

import { SectionHeading } from "@/components/public/SectionHeading";
import { PortfolioGrid } from "@/components/public/PortfolioGrid";
import { useLang } from "@/i18n/context";
import type { Project, ProjectCategory } from "@/types";

export function PortfolioPageClient({
  projects,
  categories,
  technologies,
}: {
  projects: Project[];
  categories: ("All" | ProjectCategory)[];
  technologies: string[];
}) {
  const { t } = useLang();
  return (
    <div className="container-page py-16">
      <SectionHeading
        eyebrow={t.portfolio.eyebrow}
        title={t.portfolio.title}
        description={t.portfolio.desc}
      />
      <div className="mt-12">
        <PortfolioGrid
          projects={projects}
          categories={categories}
          technologies={technologies}
        />
      </div>
    </div>
  );
}
