"use client";

import Link from "next/link";
import { Hero } from "@/components/public/Hero";
import { CTASection } from "@/components/public/CTASection";
import { SectionHeading } from "@/components/public/SectionHeading";
import { ProjectCard } from "@/components/public/ProjectCard";
import { ButtonLink } from "@/components/ui/Button";
import { Icons } from "@/components/ui/Icons";
import { capabilities } from "@/data/skills";
import { useLang } from "@/i18n/context";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import type { Project } from "@/types";
import type { SiteProfile } from "@/lib/site";

export function HomeClient({
  featured,
  site,
}: {
  featured: Project[];
  site: SiteProfile;
}) {
  const { t } = useLang();

  return (
    <>
      <Hero site={site} />

      {/* Recent Works */}
      <section className="container-page py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow={t.home.recentEyebrow}
            title={t.home.recentTitle}
            description={t.home.recentDesc}
          />
          <ButtonLink href="/portfolio" variant="secondary">
            {t.home.viewAll}
            <Icons.arrowRight width={16} height={16} />
          </ButtonLink>
        </div>

        <StaggerGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <StaggerItem key={project.id}>
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
          {featured.length === 0 && (
            <p className="col-span-3 py-10 text-center text-muted">
              {t.home.noProjects}
            </p>
          )}
        </StaggerGroup>
      </section>

      {/* Core Capabilities */}
      <section className="container-page py-16">
        <SectionHeading
          eyebrow={t.home.capEyebrow}
          title={t.home.capTitle}
          description={t.home.capDesc}
          align="center"
        />
        <StaggerGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((cap) => {
            const Icon = Icons[cap.icon as keyof typeof Icons];
            return (
              <StaggerItem
                key={cap.title}
                className="rounded-card border border-border bg-card p-6 transition-colors hover:border-accent/40"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent/10 text-accent">
                  {Icon && <Icon width={22} height={22} />}
                </div>
                <h3 className="mt-4 text-lg font-semibold">{cap.title}</h3>
                <p className="mt-2 text-sm text-muted">{cap.description}</p>
                <ul className="mt-4 space-y-1.5">
                  {cap.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-muted">
                      <Icons.check width={14} height={14} className="text-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </section>

      {/* Short About */}
      <section className="container-page py-16">
        <div className="rounded-card border border-border bg-card-soft/40 p-8 sm:p-12">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">
              {t.home.aboutEyebrow}
            </p>
            <p className="mt-4 text-lg leading-relaxed text-fg/90 sm:text-xl">
              {site.bio}
            </p>
            <div className="mt-6">
              <Link
                href="/about"
                className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
              >
                {t.home.learnMore}
                <Icons.arrowRight width={16} height={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection site={site} />
    </>
  );
}
