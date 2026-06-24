"use client";

import type { Experience, Certificate } from "@prisma/client";
import Image from "next/image";
import { SectionHeading } from "@/components/public/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Icons } from "@/components/ui/Icons";
import { formatDateRange } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Stagger";
import { useLang } from "@/i18n/context";
import type { Education } from "@/types";
import type { SiteProfile } from "@/lib/site";

export function AboutClient({
  site,
  education,
  experiences,
  certificates,
}: {
  site: SiteProfile;
  education: Education[];
  experiences: Experience[];
  certificates: Certificate[];
}) {
  const { t } = useLang();
  const a = t.about;

  return (
    <div className="container-page py-16">
      {/* Profile + bio */}
      <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:items-start">
        <div className="rounded-card border border-border bg-card p-8 text-center">
          {site.profileImageUrl ? (
            <div className="relative mx-auto h-28 w-28 overflow-hidden rounded-full border border-border">
              <Image
                src={site.profileImageUrl}
                alt={site.fullName}
                fill
                sizes="112px"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="mx-auto grid h-28 w-28 place-items-center rounded-full bg-accent/10 text-3xl font-bold text-accent">
              {getInitials(site.fullName)}
            </div>
          )}
          <h1 className="mt-5 text-2xl font-bold">{site.fullName}</h1>
          <p className="mt-1 text-sm text-muted">{site.shortRole}</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {site.isAvailable && (
              <Badge variant="success">{a.available}</Badge>
            )}
            <Badge variant="outline">
              <Icons.mapPin width={14} height={14} />
              {site.location}
            </Badge>
          </div>
        </div>
        <div>
          <SectionHeading eyebrow={a.eyebrow} title={a.title} />
          <p className="mt-4 leading-relaxed text-muted">{site.bio}</p>
          <p className="mt-4 leading-relaxed text-muted">{a.extraBio}</p>
        </div>
      </div>

      {/* Education */}
      <section className="mt-16">
        <Reveal>
        <h2 className="text-xl font-bold">{a.education}</h2>
        <div className="mt-5 space-y-4">
          {education.map((edu) => (
            <div key={edu.id} className="rounded-xl border border-border bg-card p-6">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold">{edu.schoolName}</h3>
                  <p className="text-sm text-accent">{edu.major}</p>
                </div>
                <span className="text-sm text-muted">
                  {edu.startYear} - {edu.endYear ?? a.present}
                </span>
              </div>
              <p className="mt-3 text-sm text-muted">{edu.description}</p>
            </div>
          ))}
        </div>
        </Reveal>
      </section>

      {/* Experience */}
      <section className="mt-16">
        <Reveal>
        <h2 className="text-xl font-bold">{a.experience}</h2>
        <StaggerGroup className="mt-5 space-y-4" gap={0.06}>
          {experiences.map((exp: Experience) => (
            <StaggerItem key={exp.id} className="rounded-xl border border-border bg-card p-6">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold">{exp.title}</h3>
                  <p className="text-sm text-accent">{exp.organization}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">
                    {a.expTypes[exp.type as keyof typeof a.expTypes] ?? exp.type}
                  </Badge>
                  <span className="flex items-center gap-1 text-sm text-muted">
                    <Icons.calendar width={14} height={14} />
                    {formatDateRange(
                      exp.startDate.toISOString().slice(0, 7),
                      exp.endDate?.toISOString().slice(0, 7) ?? null,
                      exp.isCurrent
                    )}
                  </span>
                </div>
              </div>
              <p className="mt-3 text-sm text-muted">{exp.description}</p>
            </StaggerItem>
          ))}
          {experiences.length === 0 && (
            <p className="py-8 text-center text-muted">{a.noExp}</p>
          )}
        </StaggerGroup>
        </Reveal>
      </section>

      {/* Certificates */}
      <section className="mt-16">
        <Reveal>
        <h2 className="text-xl font-bold">{a.certificates}</h2>
        <StaggerGroup className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" gap={0.06}>
          {certificates.map((cert: Certificate) => (
            <StaggerItem key={cert.id} className="overflow-hidden rounded-xl border border-border bg-card">
              {cert.certificateImageUrl ? (
                <div className="relative aspect-video bg-card-soft">
                  <Image
                    src={cert.certificateImageUrl}
                    alt={cert.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="p-6 pb-0">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-accent-purple/10 text-accent-purple">
                    <Icons.award width={20} height={20} />
                  </div>
                </div>
              )}
              <div className="p-6">
              <h3 className="mt-4 font-semibold">{cert.title}</h3>
              <p className="mt-1 text-sm text-accent">{cert.issuer}</p>
              <p className="mt-2 text-sm text-muted">{cert.description}</p>
              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
                >
                  {a.viewCredential} <Icons.external width={14} height={14} />
                </a>
              )}
              </div>
            </StaggerItem>
          ))}
          {certificates.length === 0 && (
            <p className="col-span-3 py-8 text-center text-muted">{a.noCert}</p>
          )}
        </StaggerGroup>
        </Reveal>
      </section>
    </div>
  );
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}
