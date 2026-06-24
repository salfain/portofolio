"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Icons } from "@/components/ui/Icons";
import { useLang } from "@/i18n/context";
import type { Project } from "@/types";

export function ProjectDetailClient({ project }: { project: Project }) {
  const { t } = useLang();
  const p = t.portfolio;

  return (
    <article className="container-page py-12">
      <Link
        href="/portfolio"
        className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-accent"
      >
        <Icons.arrowRight width={16} height={16} className="rotate-180" />
        {p.back}
      </Link>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Badge variant="accent">{project.category}</Badge>
        <span className="text-sm text-muted">{project.year}</span>
      </div>

      <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
        {project.title}
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">
        {project.shortDescription}
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        {project.demoUrl && (
          <ButtonLink href={project.demoUrl} external>
            <Icons.external width={18} height={18} /> {p.liveDemo}
          </ButtonLink>
        )}
        {project.githubUrl && (
          <ButtonLink href={project.githubUrl} variant="secondary" external>
            <Icons.github width={18} height={18} /> {p.repository}
          </ButtonLink>
        )}
      </div>

      <div className="relative mt-10 aspect-video overflow-hidden rounded-card border border-border bg-card-soft">
        <Image
          src={project.thumbnailUrl}
          alt={project.title}
          fill
          sizes="(max-width: 1024px) 100vw, 1024px"
          className="object-cover"
          priority
        />
      </div>

      <div className="mt-12 grid gap-12 lg:grid-cols-3">
        <div className="space-y-10 lg:col-span-2">
          {project.problem && (
            <Section title={p.problem}>
              <p>{project.problem}</p>
            </Section>
          )}
          {project.solution && (
            <Section title={p.solution}>
              <p>{project.solution}</p>
            </Section>
          )}
          {project.content && (
            <Section title={p.detail}>
              <p>{project.content}</p>
            </Section>
          )}
          {project.features.length > 0 && (
            <Section title={p.features}>
              <ul className="space-y-2">
                {project.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Icons.check
                      width={18}
                      height={18}
                      className="mt-0.5 shrink-0 text-accent"
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </Section>
          )}
          {project.images.length > 0 && (
            <Section title={p.docs}>
              <div className="grid gap-4 sm:grid-cols-2">
                {project.images.map((img) => (
                  <figure
                    key={img.url}
                    className="overflow-hidden rounded-xl border border-border bg-card-soft"
                  >
                    <div className="relative aspect-video">
                      <Image
                        src={img.url}
                        alt={img.caption}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                    <figcaption className="p-3 text-xs text-muted">
                      {img.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </Section>
          )}
        </div>

        <aside className="space-y-6">
          <div className="rounded-card border border-border bg-card p-6">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-accent">
              {p.tech}
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="outline">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
          <div className="rounded-card border border-border bg-card p-6">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-accent">
              {p.info}
            </h3>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted">{p.category}</dt>
                <dd className="font-medium">{project.category}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">{p.year}</dt>
                <dd className="font-medium">{project.year}</dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </article>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="mt-3 leading-relaxed text-muted">{children}</div>
    </section>
  );
}
